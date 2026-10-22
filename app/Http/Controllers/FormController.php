<?php

namespace App\Http\Controllers;

use App\Enums\FormFieldType;
use App\Http\Requests\SaveFormRequest;
use App\Models\Form;
use App\Models\FormVersion;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use App\Services\Forms\FormService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class FormController extends Controller
{
    public function __construct(protected FormService $formService)
    {
    }

    public function index(Request $request): View
    {
        $perPage = in_array((int) $request->input('per_page', 10), [10, 20, 30], true)
            ? (int) $request->input('per_page', 10)
            : 10;

        $forms = Form::query()
            ->with(['currentVersion:id,form_id,version,fields', 'creator:id,name', 'editor:id,name'])
            ->withCount('submissions')
            ->when($request->filled('search'), function ($query) use ($request) {
                $term = '%' . addcslashes(trim($request->input('search')), '%_\\') . '%';
                $query->where(fn ($w) => $w->where('name', 'like', $term)->orWhere('slug', 'like', $term));
            })
            ->when($request->input('status') === 'active', fn ($query) => $query->where('is_active', true))
            ->when($request->input('status') === 'inactive', fn ($query) => $query->where('is_active', false))
            ->latest('updated_at')
            ->paginate($perPage)
            ->withQueryString();

        return view('forms.index', [
            'forms' => $forms,
        ]);
    }

    public function create(): View
    {
        return view('forms.form', [
            'form' => null,
            'initial' => $this->defaults(),
            'fieldTypes' => $this->fieldTypes(),
        ]);
    }

    public function store(SaveFormRequest $request): JsonResponse
    {
        $form = $this->formService->create($request->validated());

        session()->flash('success', 'Formulario creado exitosamente');

        return response()->json([
            'success' => true,
            'message' => 'Formulario creado exitosamente',
            'redirect' => route('forms.edit', $form),
        ], 201);
    }

    public function edit(Form $form): View
    {
        $form->load('currentVersion');

        return view('forms.form', [
            'form' => $form,
            'initial' => $this->initialFor($form),
            'fieldTypes' => $this->fieldTypes(),
        ]);
    }

    public function update(SaveFormRequest $request, Form $form): JsonResponse
    {
        $previousVersionId = $form->current_version_id;

        $updated = $this->formService->update(
            $form,
            $request->validated(),
            $request->integer('base_version') ?: null,
        );
        $updated->load('currentVersion');
        $version = $updated->currentVersion;
        $changed = $updated->current_version_id !== $previousVersionId;

        return response()->json([
            'success' => true,
            'message' => $changed
                ? "Formulario actualizado. Se creó la versión {$version->version}."
                : 'Formulario guardado. El contenido no cambió, no se creó una versión nueva.',
            'version' => $version->version,
            'initial' => $this->initialFor($updated),
        ]);
    }

    public function toggleActive(Form $form): JsonResponse
    {
        $this->formService->setActive($form, !$form->is_active);

        return response()->json([
            'success' => true,
            'message' => $form->is_active ? 'Formulario activado' : 'Formulario desactivado',
            'is_active' => $form->is_active,
        ]);
    }

    public function show(Form $form): View
    {
        $form->load('currentVersion');

        return view('forms.show', [
            'form' => $form,
            'version' => $form->currentVersion,
            'versions' => $form->versions()
                ->withCount('submissions')
                ->with('creator:id,name')
                ->orderByDesc('version')
                ->get(),
            'submissionsCount' => $form->submissions()->count(),
            'typeLabels' => collect(FormFieldType::cases())->mapWithKeys(fn (FormFieldType $type) => [$type->value => $type->label()])->all(),
        ]);
    }

    public function duplicate(Request $request, Form $form): JsonResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:150'],
        ], [
            'name.required' => 'Escribe un nombre para la copia.',
            'name.max' => 'El nombre no puede superar 150 caracteres.',
        ]);

        $copy = $this->formService->duplicate($form->load('currentVersion'), trim($data['name']));

        session()->flash('success', 'Formulario duplicado. Revisa su contenido y actívalo cuando esté listo.');

        return response()->json([
            'success' => true,
            'message' => 'Formulario duplicado',
            'redirect' => route('forms.edit', $copy),
        ], 201);
    }

    public function forceDestroy(Form $form): JsonResponse
    {
        $blocked = response()->json([
            'success' => false,
            'message' => 'Este formulario ya tiene respuestas, no se puede eliminar. Puedes archivarlo.',
        ], 409);

        try {
            $deleted = DB::transaction(function () use ($form) {
                $locked = Form::query()->whereKey($form->id)->lockForUpdate()->firstOrFail();

                if ($locked->submissions()->withTrashed()->exists()) {
                    return false;
                }

                $locked->forceFill(['current_version_id' => null])->save();
                FormVersion::query()->where('form_id', $locked->id)->delete();
                $locked->forceDelete();

                return true;
            });
        } catch (QueryException) {
            return $blocked;
        }

        if (!$deleted) {
            return $blocked;
        }

        return response()->json([
            'success' => true,
            'message' => 'Formulario eliminado definitivamente.',
        ]);
    }

    public function destroy(Form $form): JsonResponse
    {
        $form->update(['is_active' => false, 'updated_by' => auth()->id()]);
        $form->delete();

        return response()->json([
            'success' => true,
            'message' => 'Formulario archivado. Sus respuestas y versiones se conservan.',
        ]);
    }

    private function fieldTypes(): array
    {
        return collect(FormFieldType::cases())
            ->map(fn (FormFieldType $type) => ['value' => $type->value, 'label' => $type->label()])
            ->all();
    }

    private function initialFor(Form $form): array
    {
        $version = $form->currentVersion;

        if (!$version) {
            return $this->defaults() + ['name' => $form->name, 'is_active' => $form->is_active];
        }

        return [
            'name' => $form->name,
            'is_active' => $form->is_active,
            'title' => $version->title,
            'description' => $version->description,
            'submit_label' => $version->submit_label,
            'fields' => $version->fields,
            'settings' => $version->settings,
        ];
    }

    private function defaults(): array
    {
        return [
            'name' => '',
            'is_active' => true,
            'title' => '',
            'description' => '',
            'submit_label' => 'Enviar',
            'fields' => [
                ['type' => 'proper_name', 'label' => 'Escribe tu nombre completo', 'required' => true, 'width' => 'full'],
            ],
            'settings' => [
                'thanks' => [
                    'title' => '¡Gracias!',
                    'subtitle' => 'Hemos recibido tu registro. Te contactaremos pronto.',
                    'seconds' => 6,
                    'redirect_url' => '',
                ],
                'emails' => [
                    'notify' => [
                        'enabled' => false,
                        'recipients' => [],
                        'subject' => 'Nueva solicitud: {{form_title}}',
                    ],
                    'confirmation' => [
                        'enabled' => false,
                        'field_key' => null,
                        'subject' => 'Hemos recibido tu solicitud',
                        'body' => 'Gracias por escribirnos. Hemos recibido tu información y nos pondremos en contacto contigo pronto.',
                    ],
                ],
            ],
        ];
    }
}