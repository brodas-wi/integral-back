<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class PageController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $this->authorize('pages.view');

        $perPage = (int) $request->input('per_page', 10);
        $perPage = in_array($perPage, [10, 20, 30]) ? $perPage : 10;

        $query = Page::with(['creator', 'editor']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('is_published', $request->status === 'published');
        }

        if ($request->filled('date_from')) {
            $query->whereDate('created_at', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('created_at', '<=', $request->date_to);
        }

        $pages = $query->latest()->paginate($perPage);

        $stats = [
            'total'     => Page::count(),
            'published' => Page::where('is_published', true)->count(),
            'draft'     => Page::where('is_published', false)->count(),
        ];

        return view('pages.index', compact('pages', 'stats'));
    }

    public function create()
    {
        $this->authorize('pages.create');
        return view('layouts.editor');
    }

    public function store(StorePageRequest $request)
    {
        $this->authorize('pages.create');

        try {
            $page = Page::create([
                'title'           => $request->title,
                'html_content'    => $this->sanitizeContent($request->html_content),
                'css_content'     => $this->sanitizeContent($request->css_content),
                'js_content'      => $this->sanitizeContent($request->js_content),
                'components_json' => $request->components_json,
                'styles_json'     => $request->styles_json,
                'is_published'    => $request->boolean('is_published', false),
                'created_by'      => Auth::id(),
                'updated_by'      => Auth::id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Página creada exitosamente.',
                'page'    => [
                    'id'    => $page->id,
                    'slug'  => $page->slug,
                    'title' => $page->title,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating page: ' . $e->getMessage());

            return response()->json([
                'success' => false,
                'message' => 'Error al crear la página: ' . $e->getMessage(),
            ], 422);
        }
    }

    public function show(Page $page)
    {
        $this->authorize('pages.edit');
        return view('pages.show', compact('page'));
    }

    public function preview(Page $page)
    {
        if (!$page->is_published && !auth()->check()) {
            abort(404);
        }
        return view('pages.preview', compact('page'));
    }

    public function edit(Page $page)
    {
        $this->authorize('pages.edit');
        return view('layouts.editor', compact('page'));
    }

    public function update(UpdatePageRequest $request, Page $page)
    {
        $this->authorize('pages.edit');

        try {
            $updateData = [
                'html_content'    => $this->sanitizeContent($request->html_content),
                'css_content'     => $this->sanitizeContent($request->css_content),
                'js_content'      => $this->sanitizeContent($request->js_content),
                'components_json' => $request->components_json,
                'styles_json'     => $request->styles_json,
                'is_published'    => $request->boolean('is_published', $page->is_published),
                'updated_by'      => Auth::id(),
            ];

            if ($request->filled('title')) {
                $updateData['title'] = $request->title;
            }

            $page->update($updateData);

            return response()->json([
                'success' => true,
                'message' => 'Página actualizada exitosamente.',
                'page'    => [
                    'id'    => $page->id,
                    'slug'  => $page->slug,
                    'title' => $page->title,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating page: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'page_id' => $page->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar la página: ' . $e->getMessage(),
            ], 422);
        }
    }

    public function destroy(Page $page)
    {
        $this->authorize('pages.delete');

        try {
            $title = $page->title;
            $page->delete();

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => "'{$title}' eliminada exitosamente.",
                ]);
            }

            return redirect()
                ->route('pages.index')
                ->with('success', "'{$title}' eliminada exitosamente.");
        } catch (\Exception $e) {
            Log::error('Error deleting page: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'page_id' => $page->id,
            ]);

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al eliminar la página.',
                ], 500);
            }

            return redirect()
                ->route('pages.index')
                ->with('error', 'Error al eliminar la página.');
        }
    }

    public function togglePublish(Page $page)
    {
        $this->authorize('pages.publish');

        try {
            $page->update([
                'is_published' => !$page->is_published,
                'updated_by'   => Auth::id(),
            ]);

            $message = $page->is_published
                ? 'Página publicada exitosamente.'
                : 'Página despublicada exitosamente.';

            if (request()->expectsJson()) {
                return response()->json([
                    'success'      => true,
                    'message'      => $message,
                    'is_published' => $page->is_published,
                ]);
            }

            return redirect()
                ->route('pages.index')
                ->with('success', $message);
        } catch (\Exception $e) {
            Log::error('Error toggling publish status: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'page_id' => $page->id,
            ]);

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al cambiar el estado de publicación.',
                ], 500);
            }

            return redirect()
                ->route('pages.index')
                ->with('error', 'Error al cambiar el estado de publicación.');
        }
    }

    public function load(Page $page)
    {
        $this->authorize('pages.edit');

        try {
            return response()->json([
                'html'            => $page->html_content    ?? '',
                'css'             => $page->css_content     ?? '',
                'js'              => $page->js_content      ?? '',
                'components_json' => $page->components_json ?? null,
                'styles_json'     => $page->styles_json     ?? null,
            ]);
        } catch (\Exception $e) {
            Log::error('Error loading page content: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
                'page_id' => $page->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al cargar el contenido de la página.',
            ], 500);
        }
    }

    private function sanitizeContent(?string $content): ?string
    {
        if (empty($content)) {
            return $content;
        }

        $appUrl     = rtrim(config('app.url'), '/');
        $assetUrl   = rtrim(config('app.asset_url', $appUrl), '/');
        $storageUrl = rtrim(config('app.storage_url', $appUrl . '/storage'), '/');

        $urls = array_unique(array_filter([
            $storageUrl,
            $assetUrl . '/storage',
            $appUrl . '/storage',
        ]));

        foreach ($urls as $url) {
            $content = str_replace($url . '/', '/storage/', $content);
        }

        $host = parse_url($appUrl, PHP_URL_HOST);
        if ($host) {
            $content = preg_replace(
                '/https?:\/\/' . preg_quote($host, '/') . '\/storage\//i',
                '/storage/',
                $content
            );
        }

        return $content;
    }
}
