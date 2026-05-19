<?php

namespace App\Services;

use App\Models\Announcement;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class AnnouncementService
{
    /**
     * Create a new announcement
     */
    public function create(array $data): Announcement
    {
        return DB::transaction(function () use ($data) {
            return Announcement::create([
                'title' => $data['title'],
                'description' => $data['display_mode'] === 'full' ? ($data['description'] ?? null) : null,
                'media_id' => $data['media_id'],
                'cta_text' => $data['display_mode'] === 'full' ? ($data['cta_text'] ?? null) : null,
                'cta_url' => $data['display_mode'] === 'full' ? ($data['cta_url'] ?? null) : null,
                'cta_new_tab' => $data['cta_new_tab'] ?? true,
                'display_type' => $data['display_type'],
                'display_mode' => $data['display_mode'],
                'page_slugs' => $data['page_slugs'] ?? null,
                'is_active' => $data['is_active'] ?? false,
                'schedule_type' => $data['schedule_type'] ?? 'manual',
                'starts_at' => $data['schedule_type'] === 'scheduled' ? $data['starts_at'] : null,
                'ends_at' => $data['schedule_type'] === 'scheduled' ? $data['ends_at'] : null,
                'created_by' => auth()->id(),
            ]);
        });
    }

    /**
     * Update announcement
     */
    public function update(Announcement $announcement, array $data): Announcement
    {
        return DB::transaction(function () use ($announcement, $data) {
            $announcement->update([
                'title' => $data['title'],
                'description' => $data['display_mode'] === 'full' ? ($data['description'] ?? null) : null,
                'media_id' => $data['media_id'],
                'cta_text' => $data['display_mode'] === 'full' ? ($data['cta_text'] ?? null) : null,
                'cta_url' => $data['display_mode'] === 'full' ? ($data['cta_url'] ?? null) : null,
                'cta_new_tab' => $data['cta_new_tab'] ?? true,
                'display_type' => $data['display_type'],
                'display_mode' => $data['display_mode'],
                'page_slugs' => $data['page_slugs'] ?? null,
                'is_active' => $data['is_active'] ?? false,
                'schedule_type' => $data['schedule_type'] ?? 'manual',
                'starts_at' => $data['schedule_type'] === 'scheduled' ? $data['starts_at'] : null,
                'ends_at' => $data['schedule_type'] === 'scheduled' ? $data['ends_at'] : null,
                'updated_by' => $data['updated_by'] ?? auth()->id(),
            ]);

            return $announcement->fresh(['media', 'creator', 'updater']);
        });
    }

    /**
     * Delete announcement
     */
    public function delete(Announcement $announcement): bool
    {
        return DB::transaction(function () use ($announcement) {
            return $announcement->delete();
        });
    }

    /**
     * Get statistics
     */
    public function getStatistics(): array
    {
        return [
            'total' => Announcement::count(),
            'active' => Announcement::where('is_active', true)->count(),
            'inactive' => Announcement::where('is_active', false)->count(),
        ];
    }

    /**
     * Build filtered query
     */
    public function buildFilteredQuery(array $filters)
    {
        $query = Announcement::with(['media', 'creator', 'updater'])->latest();

        if (!empty($filters['search'])) {
            $query->where(function ($q) use ($filters) {
                $q->where('title', 'like', "%{$filters['search']}%")
                    ->orWhere('description', 'like', "%{$filters['search']}%");
            });
        }

        if (isset($filters['status'])) {
            if ($filters['status'] === 'active') {
                $query->active();
            } elseif ($filters['status'] === 'inactive') {
                $query->where('is_active', false);
            } elseif ($filters['status'] === 'scheduled') {
                $query->where('is_active', true)
                    ->where('starts_at', '>', now());
            } elseif ($filters['status'] === 'expired') {
                $query->where('is_active', true)
                    ->where('ends_at', '<', now());
            }
        }

        if (!empty($filters['display_type'])) {
            $query->where('display_type', $filters['display_type']);
        }

        return $query;
    }

    /**
     * Get active announcement for a specific page
     */
    public function getAnnouncementForPage(string $pageSlug): ?Announcement
    {
        return Announcement::with('media')
            ->active()
            ->forPage($pageSlug)
            ->byPriority()
            ->first();
    }

    /**
     * Get all active announcements for a page
     */
    public function getAnnouncementsForPage(string $pageSlug): Collection
    {
        return Announcement::with('media')
            ->active()
            ->forPage($pageSlug)
            ->byPriority()
            ->get();
    }
}
