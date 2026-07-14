<?php

namespace App\Services;

use App\Models\NewsCategory;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class NewsCategoryService
{
    public function buildFilteredQuery(array $filters)
    {
        $query = NewsCategory::withCount('news');

        if (!empty($filters['search'])) {
            $query->where('name', 'like', "%{$filters['search']}%");
        }

        if (!empty($filters['status'])) {
            $query->where('is_active', $filters['status'] === 'active');
        }

        return $query->orderBy('name');
    }

    public function create(array $data): NewsCategory
    {
        $data['slug'] = $this->generateUniqueSlug($data['name']);
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        return NewsCategory::create($data);
    }

    public function update(NewsCategory $category, array $data): NewsCategory
    {
        $data['updated_by'] = Auth::id();

        $category->update($data);

        return $category;
    }

    public function toggleStatus(NewsCategory $category): NewsCategory
    {
        $category->update([
            'is_active' => !$category->is_active,
            'updated_by' => Auth::id(),
        ]);

        return $category;
    }

    public function delete(NewsCategory $category): void
    {
        $category->update(['is_active' => false, 'updated_by' => Auth::id()]);
        $category->delete();
    }

    protected function generateUniqueSlug(string $name): string
    {
        $slug = Str::slug($name);
        $original = $slug;
        $count = 1;

        while (NewsCategory::where('slug', $slug)->exists()) {
            $slug = "{$original}-{$count}";
            $count++;
        }

        return $slug;
    }
}
