<?php

namespace App\Models;

use App\Traits\HasStatistics;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;

class Announcement extends Model
{
    use HasFactory, HasStatistics;

    protected $fillable = [
        'title',
        'description',
        'media_id',
        'cta_text',
        'cta_url',
        'cta_new_tab',
        'display_type',
        'display_mode',
        'page_slugs',
        'priority',
        'is_active',
        'schedule_type',
        'starts_at',
        'ends_at',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'page_slugs' => 'array',
        'is_active' => 'boolean',
        'cta_new_tab' => 'boolean',
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'priority' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($announcement) {
            if (is_null($announcement->priority)) {
                $maxPriority = static::max('priority') ?? 0;
                $announcement->priority = $maxPriority + 1;
            }
        });
    }

    public function media(): BelongsTo
    {
        return $this->belongsTo(Media::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by')->withDefault([
            'name' => 'Usuario eliminado',
        ]);
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by')->withDefault([
            'name' => 'Sistema',
        ]);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('starts_at')
                    ->orWhere('starts_at', '<=', now());
            })
            ->where(function ($q) {
                $q->whereNull('ends_at')
                    ->orWhere('ends_at', '>=', now());
            });
    }

    public function scopeForPage(Builder $query, string $pageSlug): Builder
    {
        return $query->where(function ($q) use ($pageSlug) {
            $q->where('display_type', 'global')
                ->orWhere(function ($sq) {
                    $sq->where('display_type', 'homepage')
                        ->where(function ($homeQuery) {
                            $homeQuery->where('page_slugs', 'like', '%"home"%')
                                ->orWhereNull('page_slugs');
                        });
                })
                ->orWhere(function ($sq) use ($pageSlug) {
                    $sq->where('display_type', 'specific_pages')
                        ->where('page_slugs', 'like', '%"' . $pageSlug . '"%');
                });
        });
    }

    public function scopeByPriority(Builder $query): Builder
    {
        return $query->orderBy('priority', 'desc')->orderBy('created_at', 'desc');
    }

    public function isScheduled(): bool
    {
        return !is_null($this->starts_at) || !is_null($this->ends_at);
    }

    public function isCurrentlyActive(): bool
    {
        if (!$this->is_active) {
            return false;
        }

        $now = now();

        if ($this->starts_at && $now->lt($this->starts_at)) {
            return false;
        }

        if ($this->ends_at && $now->gt($this->ends_at)) {
            return false;
        }

        return true;
    }

    public function getStatusAttribute(): string
    {
        if (!$this->is_active) {
            return 'Inactivo';
        }

        if ($this->starts_at && now()->lt($this->starts_at)) {
            return 'Programado';
        }

        if ($this->ends_at && now()->gt($this->ends_at)) {
            return 'Expirado';
        }

        return 'Activo';
    }

    public function getDisplayTypeNameAttribute(): string
    {
        return match ($this->display_type) {
            'global' => 'Todas las páginas',
            'homepage' => 'Solo página de inicio',
            'specific_pages' => 'Páginas específicas',
            default => 'Desconocido',
        };
    }
}
