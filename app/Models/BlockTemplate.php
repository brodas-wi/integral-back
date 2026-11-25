<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class BlockTemplate extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'category',
        'description',
        'mode',
        'html',
        'css',
        'js',
        'schema',
        'icon_svg',
        'is_active',
    ];

    protected $casts = [
        'schema' => 'array',
        'is_active' => 'boolean',
        'version' => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $template) {
            $template->slug = static::uniqueSlug($template->name);
            $template->created_by = auth()->id();
            $template->updated_by = auth()->id();
        });

        static::updating(function (self $template) {
            $template->updated_by = auth()->id();

            if ($template->isDirty(['html', 'css', 'js', 'schema', 'mode'])) {
                $template->version = $template->version + 1;
            }
        });
    }

    protected static function uniqueSlug(string $name): string
    {
        $base = Str::slug($name) ?: 'bloque';
        $slug = $base;
        $counter = 2;

        while (static::withTrashed()->where('slug', $slug)->exists()) {
            $slug = "{$base}-{$counter}";
            $counter++;
        }

        return $slug;
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }
}