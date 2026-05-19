<?php

namespace App\Traits;

trait HasStatistics
{
    /**
     * Get basic statistics for the model
     */
    public static function getBasicStats(): array
    {
        $stats = [
            'total' => static::count(),
            'active' => static::where('is_active', true)->count(),
            'inactive' => static::where('is_active', false)->count(),
        ];

        if (
            in_array('latitude', (new static)->getFillable()) ||
            in_array('latitude', array_keys((new static)->getCasts()))
        ) {
            $stats['with_coordinates'] = static::whereNotNull('latitude')
                ->whereNotNull('longitude')
                ->count();
            $stats['without_coordinates'] = static::whereNull('latitude')
                ->orWhereNull('longitude')
                ->count();
        }

        return $stats;
    }

    /**
     * Get statistics with filters applied
     */
    public static function getFilteredStats(array $filters): array
    {
        $query = static::query();

        if (!empty($filters['zone'])) {
            $query->where('zone', $filters['zone']);
        }

        if (!empty($filters['department'])) {
            $query->where('department', $filters['department']);
        }

        if (!empty($filters['status'])) {
            $isActive = $filters['status'] === 'active';
            $query->where('is_active', $isActive);
        }

        return [
            'filtered_total' => $query->count(),
            'filtered_active' => (clone $query)->where('is_active', true)->count(),
            'filtered_inactive' => (clone $query)->where('is_active', false)->count(),
        ];
    }
}
