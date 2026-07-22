<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Models\News;
use App\Models\NewsCategory;
use App\Services\NewsService;
use App\Services\NewsCategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NewsController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        protected NewsService $newsService,
        protected NewsCategoryService $newsCategoryService
    ) {}

    public function index(Request $request): View
    {
        $tab = $request->input('tab', 'noticias');
        $tab = in_array($tab, ['noticias', 'categorias']) ? $tab : 'noticias';

        $categoriesFilter = NewsCategory::active()->orderBy('name')->get();

        $news = null;
        $categoriesList = null;

        if ($tab === 'noticias') {
            $news = $this->newsService
                ->buildFilteredQuery($request->only(['search', 'category', 'status']))
                ->paginate(12)
                ->withQueryString();
        } else {
            $categoriesList = $this->newsCategoryService
                ->buildFilteredQuery($request->only(['search', 'status']))
                ->paginate(12)
                ->withQueryString();
        }

        return view('news.index', compact('tab', 'news', 'categoriesFilter', 'categoriesList'));
    }

    public function create(): View
    {
        $categories = NewsCategory::active()->orderBy('name')->get();

        return view('news.create', compact('categories'));
    }

    public function store(StoreNewsRequest $request): JsonResponse
    {
        try {
            $news = $this->newsService->create($request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Noticia creada exitosamente',
                'redirect' => route('news.index', ['tab' => 'noticias']),
                'id' => $news->id,
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error creating news', [
                'error' => $e->getMessage(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al crear la noticia',
            ], 500);
        }
    }

    public function edit(News $news): View
    {
        $categories = NewsCategory::active()->orderBy('name')->get();

        return view('news.edit', compact('news', 'categories'));
    }

    public function update(UpdateNewsRequest $request, News $news): JsonResponse
    {
        try {
            $this->newsService->update($news, $request->validated());

            return response()->json([
                'success' => true,
                'message' => 'Noticia actualizada exitosamente',
                'redirect' => route('news.index', ['tab' => 'noticias']),
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating news', [
                'error' => $e->getMessage(),
                'news_id' => $news->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar la noticia',
            ], 500);
        }
    }

    public function show(News $news): View
    {
        $news->load(['category', 'creator']);

        return view('news.show', compact('news'));
    }

    public function toggleStatus(News $news): JsonResponse
    {
        $this->authorize('news.edit', 'news.manage');

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

    public function apiActive(Request $request): JsonResponse
    {
        $perPage = (int) $request->input('per_page', 6);
        $perPage = $perPage > 0 && $perPage <= 50 ? $perPage : 6;

        $query = News::published()->with('category')->latest('published_at');

        if ($request->filled('category')) {
            $query->where('news_category_id', $request->category);
        }

        $news = $query->paginate($perPage)->withQueryString();

        return response()->json([
            'data' => $news->getCollection()->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'description' => $item->description,
                    'featured_image' => $item->featured_image,
                    'category' => $item->category?->name,
                    'category_slug' => $item->category?->slug,
                    'published_at' => optional($item->published_at)->toIso8601String(),
                ];
            }),
            'current_page' => $news->currentPage(),
            'last_page' => $news->lastPage(),
            'total' => $news->total(),
            'per_page' => $news->perPage(),
        ]);
    }

    public function apiCategoryList(): JsonResponse
    {
        $categories = NewsCategory::active()->orderBy('name')->get(['id', 'name', 'slug']);

        return response()->json($categories);
    }
}
