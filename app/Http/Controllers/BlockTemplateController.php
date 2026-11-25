<?php

namespace App\Http\Controllers;

use App\Http\Requests\BlockTemplateRequest;
use App\Models\BlockTemplate;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\View\View;

class BlockTemplateController extends Controller
{
    public function index(Request $request): View
    {
        $search = trim((string) $request->query('search', ''));

        $templates = BlockTemplate::query()
            ->when($search !== '', fn ($query) => $query->where('name', 'like', "%{$search}%"))
            ->orderBy('category')
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return view('block-templates.index', compact('templates', 'search'));
    }

    public function create(): View
    {
        $template = new BlockTemplate([
            'mode' => 'static',
            'category' => 'Personalizados',
            'is_active' => true,
        ]);

        return view('block-templates.form', compact('template'));
    }

    public function store(BlockTemplateRequest $request): RedirectResponse
    {
        $template = BlockTemplate::create($this->payload($request));

        return redirect()
            ->route('block-templates.edit', $template)
            ->with('success', 'Plantilla creada correctamente.');
    }

    public function edit(BlockTemplate $blockTemplate): View
    {
        return view('block-templates.form', ['template' => $blockTemplate]);
    }

    public function update(BlockTemplateRequest $request, BlockTemplate $blockTemplate): RedirectResponse
    {
        $blockTemplate->update($this->payload($request, $blockTemplate));

        return redirect()
            ->route('block-templates.edit', $blockTemplate)
            ->with('success', 'Plantilla actualizada correctamente.');
    }

    public function toggleStatus(BlockTemplate $blockTemplate): RedirectResponse
    {
        $blockTemplate->update(['is_active' => ! $blockTemplate->is_active]);

        return back()->with('success', 'Estado actualizado.');
    }

    public function destroy(BlockTemplate $blockTemplate): RedirectResponse
    {
        $blockTemplate->delete();

        return redirect()
            ->route('block-templates.index')
            ->with('success', 'Plantilla eliminada.');
    }

    public function apiActive(): JsonResponse
    {
        $templates = BlockTemplate::active()
            ->orderBy('category')
            ->orderBy('name')
            ->get(['slug', 'name', 'category', 'description', 'mode', 'html', 'css', 'js', 'schema', 'icon_svg', 'version']);

        return response()->json($templates);
    }

    private function payload(BlockTemplateRequest $request, ?BlockTemplate $template = null): array
    {
        $data = $request->validated();
        $managed = $data['mode'] === 'managed';
        $canScripts = $request->user()->can('block_templates.scripts');

        return array_merge(
            Arr::only($data, ['name', 'category', 'description', 'mode', 'html', 'css', 'icon_svg']),
            [
                'schema' => $managed && filled($data['schema'] ?? null) ? json_decode($data['schema'], true) : null,
                'js' => $managed ? ($canScripts ? ($data['js'] ?? null) : $template?->js) : null,
                'is_active' => $request->boolean('is_active'),
            ]
        );
    }
}