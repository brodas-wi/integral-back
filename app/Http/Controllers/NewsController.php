<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Models\News;
use App\Models\NewsCategory;
use App\Services\NewsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NewsController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        protected NewsService $newsService
    ) {}

    public function index(Request $request): View
    {
        $filters = $request->only(['search', 'category', 'status']);

        $news = $this->newsService
            ->buildFilteredQuery($filters)
            ->paginate(12)
            ->withQueryString();

        $categories = NewsCategory::active()->orderBy('name')->get();

        return view('news.index', compact('news', 'categories'));
    }

    public function create(): View
    {
        $categories = NewsCategory::active()->orderBy('name')->get();

        return view('news.create', compact('categories'));
    }

    public function store(StoreNewsRequest $request): RedirectResponse
    {
        try {
            $this->newsService->create($request->validated());

            return redirect()
                ->route('news.index')
                ->with('success', 'Noticia creada exitosamente');
        } catch (\Exception $e) {
            Log::error('Error creating news', [
                'error' => $e->getMessage(),
                'data' => $request->validated(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al crear la noticia: ' . $e->getMessage());
        }
    }

    public function edit(News $news): View
    {
        $categories = NewsCategory::active()->orderBy('name')->get();

        return view('news.edit', compact('news', 'categories'));
    }

    public function update(UpdateNewsRequest $request, News $news): RedirectResponse
    {
        try {
            $this->newsService->update($news, $request->validated());

            return redirect()
                ->route('news.index')
                ->with('success', 'Noticia actualizada exitosamente');
        } catch (\Exception $e) {
            Log::error('Error updating news', [
                'error' => $e->getMessage(),
                'news_id' => $news->id,
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al actualizar la noticia: ' . $e->getMessage());
        }
    }

    public function show(News $news): View
    {
        $news->load(['category', 'creator']);

        return view('news.show', compact('news'));
    }

    public function toggleStatus(News $news): JsonResponse
    {
        try {
            $this->newsService->toggleStatus($news);

            return response()->json([
                'success' => true,
                'is_active' => $news->is_active,
            ]);
        } catch (\Exception $e) {
            Log::error('Error toggling news status', [
                'error' => $e->getMessage(),
                'news_id' => $news->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el estado',
            ], 500);
        }
    }

    public function destroy(News $news): JsonResponse
    {
        $this->authorize('news.delete', 'news.manage');

        try {
            $this->newsService->delete($news);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error deleting news', [
                'error' => $e->getMessage(),
                'news_id' => $news->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar la noticia',
            ], 500);
        }
    }
}
