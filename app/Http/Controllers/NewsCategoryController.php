<?php

namespace App\Http\Controllers;

use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsCategoryController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('news_categories.view');

        $query = NewsCategory::withCount('news');

        if ($search = $request->get('search')) {
            $query->where('name', 'like', "%{$search}%");
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->get('status') === 'active');
        }

        $categories = $query->orderBy('name')->paginate(12)->withQueryString();

        return view('news-categories.index', compact('categories'));
    }

    public function create()
    {
        $this->authorize('news_categories.manage');

        return view('news-categories.create');
    }

    public function store(Request $request)
    {
        $this->authorize('news_categories.manage');

        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'is_active' => 'boolean',
        ]);

        $validated['created_by'] = Auth::id();
        $validated['updated_by'] = Auth::id();

        $category = NewsCategory::create($validated);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'category' => $category]);
        }

        return redirect()->route('news-categories.index')
            ->with('success', 'Categoría creada correctamente.');
    }

    public function edit(NewsCategory $newsCategory)
    {
        $this->authorize('news_categories.manage');

        return view('news-categories.edit', ['category' => $newsCategory]);
    }

    public function update(Request $request, NewsCategory $newsCategory)
    {
        $this->authorize('news_categories.manage');

        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'is_active' => 'boolean',
        ]);

        $validated['updated_by'] = Auth::id();

        $newsCategory->update($validated);

        if ($request->wantsJson()) {
            return response()->json(['success' => true, 'category' => $newsCategory]);
        }

        return redirect()->route('news-categories.index')
            ->with('success', 'Categoría actualizada correctamente.');
    }

    public function toggleStatus(NewsCategory $newsCategory)
    {
        $this->authorize('news_categories.manage');

        $newsCategory->update([
            'is_active' => !$newsCategory->is_active,
            'updated_by' => Auth::id(),
        ]);

        return response()->json([
            'success' => true,
            'is_active' => $newsCategory->is_active,
        ]);
    }

    public function destroy(NewsCategory $newsCategory)
    {
        $this->authorize('news_categories.manage');

        if ($newsCategory->news()->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede eliminar: existen noticias asociadas a esta categoría.',
            ], 422);
        }

        $newsCategory->update(['is_active' => false, 'updated_by' => Auth::id()]);
        $newsCategory->delete();

        return response()->json(['success' => true]);
    }
}
