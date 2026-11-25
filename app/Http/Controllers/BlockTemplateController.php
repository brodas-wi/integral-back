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
        $status = in_array($request->query('status'), ['active', 'inactive'], true) ? $request->query('status') : '';
        $mode = in_array($request->query('mode'), ['static', 'managed'], true) ? $request->query('mode') : '';
        $category = trim((string) $request->query('category', ''));
        $sort = $request->query('sort') === 'recent' ? 'recent' : 'name';
        $perPage = in_array((int) $request->query('per_page'), [10, 20, 30], true) ? (int) $request->query('per_page') : 10;

        $like = '%' . addcslashes($search, '%_\\') . '%';

        $templates = BlockTemplate::query()
            ->when($search !== '', fn ($query) => $query->where(function ($inner) use ($like) {
                $inner->where('name', 'like', $like)
                    ->orWhere('description', 'like', $like)
                    ->orWhere('category', 'like', $like);
            }))
            ->when($status !== '', fn ($query) => $query->where('is_active', $status === 'active'))
            ->when($mode !== '', fn ($query) => $query->where('mode', $mode))
            ->when($category !== '', fn ($query) => $query->where('category', $category))
            ->when(
                $sort === 'recent',
                fn ($query) => $query->orderByDesc('updated_at'),
                fn ($query) => $query->orderBy('category')->orderBy('name')
            )
            ->paginate($perPage)
            ->withQueryString();

        $filters = compact('search', 'status', 'mode', 'category', 'sort', 'perPage');
        $hasFilters = $search !== '' || $status !== '' || $mode !== '' || $category !== '';
        $categories = BlockTemplate::query()->distinct()->orderBy('category')->pluck('category');

        return view('block-templates.index', compact('templates', 'filters', 'hasFilters', 'categories'));
    }

    public function create(): View
    {
        $template = new BlockTemplate([
            'mode' => 'static',
            'category' => 'Personalizados',
            'is_active' => true,
        ]);

        return view('block-templates.form', ['template' => $template, 'categories' => $this->categories()]);
    }

    public function store(BlockTemplateRequest $request): RedirectResponse
    {
        $template = BlockTemplate::create($this->payload($request));

        return redirect()
            ->route('block-templates.index')
            ->with('success', 'Plantilla creada correctamente.');
    }

    public function edit(BlockTemplate $blockTemplate): View
    {
        return view('block-templates.form', ['template' => $blockTemplate, 'categories' => $this->categories()]);
    }

    public function update(BlockTemplateRequest $request, BlockTemplate $blockTemplate): RedirectResponse
    {
        $blockTemplate->update($this->payload($request, $blockTemplate));

        return redirect()
            ->route('block-templates.index')
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

    private function categories(): array
    {
        return BlockTemplate::query()
            ->distinct()
            ->orderBy('category')
            ->pluck('category')
            ->push('Personalizados')
            ->unique()
            ->sort()
            ->values()
            ->all();
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