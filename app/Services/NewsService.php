<?php

namespace App\Services;

use App\Models\News;
use App\Models\NewsCategory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class NewsService
{
    public function buildFilteredQuery(array $filters)
    {
        $query = News::with(['category', 'creator']);

        if (!empty($filters['search'])) {
            $query->where('title', 'like', "%{$filters['search']}%");
        }

        if (!empty($filters['category'])) {
            $query->where('news_category_id', $filters['category']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        return $query->latest();
    }

    public function getStatistics(): array
    {
        return [
            'total' => News::count(),
            'published' => News::where('status', News::STATUS_PUBLISHED)->count(),
            'draft' => News::where('status', News::STATUS_DRAFT)->count(),
            'scheduled' => News::where('status', News::STATUS_SCHEDULED)->count(),
        ];
    }

    public function create(array $data): News
    {
        $data['slug'] = $this->generateUniqueSlug($data['title']);
        $data = $this->resolvePublicationState($data);
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        return News::create($data);
    }

    public function update(News $news, array $data): News
    {
        $data = $this->resolvePublicationState($data, $news);
        $data['updated_by'] = Auth::id();

        $news->update($data);

        return $news;
    }

    public function toggleStatus(News $news): News
    {
        $news->update([
            'is_active' => !$news->is_active,
            'updated_by' => Auth::id(),
        ]);

        return $news;
    }

    public function delete(News $news): void
    {
        $news->update(['is_active' => false, 'updated_by' => Auth::id()]);
        $news->delete();
    }

    protected function generateUniqueSlug(string $title): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $count = 1;

        while (News::where('slug', $slug)->exists()) {
            $slug = "{$original}-{$count}";
            $count++;
        }

        return $slug;
    }

    protected function resolvePublicationState(array $data, ?News $existing = null): array
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
