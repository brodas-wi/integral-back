<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Models\NewsCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        $this->authorize('news.view');

        $query = News::with(['category', 'creator']);

        if ($search = $request->get('search')) {
            $query->where('title', 'like', "%{$search}%");
        }

        if ($request->filled('category')) {
            $query->where('news_category_id', $request->get('category'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }

        $news = $query->latest()->paginate(12)->withQueryString();
        $categories = NewsCategory::active()->orderBy('name')->get();

        $stats = [
            'total' => News::count(),
            'published' => News::where('status', News::STATUS_PUBLISHED)->count(),
            'draft' => News::where('status', News::STATUS_DRAFT)->count(),
            'scheduled' => News::where('status', News::STATUS_SCHEDULED)->count(),
        ];

        return view('news.index', compact('news', 'categories', 'stats'));
    }

    public function create()
    {
        $this->authorize('news.create');

        $categories = NewsCategory::active()->orderBy('name')->get();

        return view('news.create', compact('categories'));
    }

    public function store(Request $request)
    {
        $this->authorize('news.create');

        $validated = $this->validateNews($request);
        $validated = $this->resolvePublicationState($validated);

        $validated['created_by'] = Auth::id();
        $validated['updated_by'] = Auth::id();

        News::create($validated);

        return redirect()->route('news.index')
            ->with('success', 'Noticia creada correctamente.');
    }

    public function edit(News $news)
    {
        $this->authorize('news.edit');

        $categories = NewsCategory::active()->orderBy('name')->get();

        return view('news.edit', compact('news', 'categories'));
    }

    public function update(Request $request, News $news)
    {
        $this->authorize('news.edit');

        $validated = $this->validateNews($request);
        $validated = $this->resolvePublicationState($validated, $news);

        $validated['updated_by'] = Auth::id();

        $news->update($validated);

        return redirect()->route('news.index')
            ->with('success', 'Noticia actualizada correctamente.');
    }

    public function show(News $news)
    {
        $this->authorize('news.view');

        $news->load(['category', 'creator']);

        return view('news.show', compact('news'));
    }

    public function toggleStatus(News $news)
    {
        $this->authorize('news.edit');

        $news->update([
            'is_active' => !$news->is_active,
            'updated_by' => Auth::id(),
        ]);

        return response()->json([
            'success' => true,
            'is_active' => $news->is_active,
        ]);
    }

    public function destroy(News $news)
    {
        $this->authorize('news.delete');

        $news->update(['is_active' => false, 'updated_by' => Auth::id()]);
        $news->delete();

        return response()->json(['success' => true]);
    }

    private function validateNews(Request $request): array
    {
        return $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string|max:500',
            'featured_image' => 'nullable|string|max:2048',
            'content' => 'nullable|string',
            'news_category_id' => 'required|exists:news_categories,id',
            'status' => 'required|in:draft,published,scheduled',
            'scheduled_at' => 'required_if:status,scheduled|nullable|date|after:now',
        ]);
    }

    private function resolvePublicationState(array $data, ?News $existing = null): array
    {
        if ($data['status'] === News::STATUS_PUBLISHED) {
            $data['published_at'] = $existing?->published_at ?? Carbon::now();
            $data['scheduled_at'] = null;
        } elseif ($data['status'] === News::STATUS_SCHEDULED) {
            $data['published_at'] = null;
        } else {
            $data['published_at'] = null;
            $data['scheduled_at'] = null;
        }

        return $data;
    }
}
