<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Carbon\Carbon;

class News extends Model
{
    use SoftDeletes, HasSlug;

    const STATUS_DRAFT = 'draft';
    const STATUS_PUBLISHED = 'published';
    const STATUS_SCHEDULED = 'scheduled';

    protected $table = 'news';

    protected $fillable = [
        'title',
        'slug',
        'description',
        'featured_image',
        'content',
        'news_category_id',
        'status',
        'scheduled_at',
        'published_at',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'scheduled_at' => 'datetime',
        'published_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnUpdate();
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(NewsCategory::class, 'news_category_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopePublished($query)
    {
        return $query->where('status', self::STATUS_PUBLISHED)
            ->where('is_active', true);
    }

    public function scopeDueForPublishing($query)
    {
        return $query->where('status', self::STATUS_SCHEDULED)
            ->whereNotNull('scheduled_at')
            ->where('scheduled_at', '<=', Carbon::now());
    }

    public function statusLabel(): string
    {
        return match ($this->status) {
            self::STATUS_DRAFT => 'Borrador',
            self::STATUS_PUBLISHED => 'Publicado',
            self::STATUS_SCHEDULED => 'Programado',
            default => $this->status,
        };
    }

    public function statusBadgeClass(): string
    {
        return match ($this->status) {
            self::STATUS_DRAFT => 'badge-secondary',
            self::STATUS_PUBLISHED => 'badge-success',
            self::STATUS_SCHEDULED => 'badge-warning',
            default => 'badge-secondary',
        };
    }
}
