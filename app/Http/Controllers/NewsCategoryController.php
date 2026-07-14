<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNewsCategoryRequest;
use App\Http\Requests\UpdateNewsCategoryRequest;
use App\Models\NewsCategory;
use App\Services\NewsCategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NewsCategoryController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        protected NewsCategoryService $categoryService
    ) {}

    public function index(Request $request): View
    {
        $filters = $request->only(['search', 'status']);

        $categories = $this->categoryService
            ->buildFilteredQuery($filters)
            ->paginate(12)
            ->withQueryString();

        return view('news-categories.index', compact('categories'));
    }

    public function create(): View
    {
        return view('news-categories.create');
    }

    public function store(StoreNewsCategoryRequest $request): RedirectResponse
    {
        try {
            $this->categoryService->create($request->validated());

            return redirect()
                ->route('news-categories.index')
                ->with('success', 'Categoría creada exitosamente');
        } catch (\Exception $e) {
            Log::error('Error creating news category', [
                'error' => $e->getMessage(),
                'data' => $request->validated(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al crear la categoría: ' . $e->getMessage());
        }
    }

    public function edit(NewsCategory $newsCategory): View
    {
        return view('news-categories.edit', ['category' => $newsCategory]);
    }

    public function update(UpdateNewsCategoryRequest $request, NewsCategory $newsCategory): RedirectResponse
    {
        try {
            $this->categoryService->update($newsCategory, $request->validated());

            return redirect()
                ->route('news-categories.index')
                ->with('success', 'Categoría actualizada exitosamente');
        } catch (\Exception $e) {
            Log::error('Error updating news category', [
                'error' => $e->getMessage(),
                'category_id' => $newsCategory->id,
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al actualizar la categoría: ' . $e->getMessage());
        }
    }

    public function toggleStatus(NewsCategory $newsCategory): JsonResponse
    {
        try {
            $this->categoryService->toggleStatus($newsCategory);

            return response()->json([
                'success' => true,
                'is_active' => $newsCategory->is_active,
            ]);
        } catch (\Exception $e) {
            Log::error('Error toggling news category status', [
                'error' => $e->getMessage(),
                'category_id' => $newsCategory->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el estado',
            ], 500);
        }
    }

    public function destroy(NewsCategory $newsCategory): JsonResponse
    {
        $this->authorize('news_categories.manage');

        if ($newsCategory->news()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede eliminar: existen noticias asociadas a esta categoría.',
            ], 422);
        }

        try {
            $this->categoryService->delete($newsCategory);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            Log::error('Error deleting news category', [
                'error' => $e->getMessage(),
                'category_id' => $newsCategory->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar la categoría',
            ], 500);
        }
    }
}
