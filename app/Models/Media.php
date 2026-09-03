<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'media';

    protected $fillable = [
        'filename',
        'alt',
        'stored_filename',
        'mime_type',
        'type',
        'size',
        'path',
        'disk',
        'width',
        'height',
        'uploaded_by',
    ];

    protected $casts = [
        'size' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
    ];

    public function getHumanSizeAttribute(): string
    {
        $bytes = $this->size;
        $units = ['B', 'KB', 'MB', 'GB'];

        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }

    public function getUrlAttribute(): string
    {
        return '/storage/' . $this->path;
    }

    public function getDimensionsAttribute(): ?string
    {
        if (!$this->isImage() || !$this->width || !$this->height) {
            return null;
        }

        return "{$this->width} × {$this->height}";
    }

    public function isImage(): bool
    {
        return $this->type === 'image';
    }

    public function isPdf(): bool
    {
        return $this->type === 'pdf';
    }

    public function isDocument(): bool
    {
        return $this->type === 'document';
    }

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function findUsages(): array
    {
        $relativeUrl = '/storage/' . $this->path;
        $bannerPath = $this->path;
        $usages = [];

        foreach (Page::all() as $page) {
            if (str_contains($page->html_content ?? '', $relativeUrl) || str_contains($page->components_json ?? '', $relativeUrl)) {
                $usages[] = ['type' => 'page', 'label' => $page->title, 'url' => route('pages.edit', $page->slug)];
            }
        }

        foreach (Navbar::all() as $navbar) {
            if (str_contains($navbar->html_content ?? '', $relativeUrl) || str_contains($navbar->components_json ?? '', $relativeUrl)) {
                $usages[] = ['type' => 'navbar', 'label' => $navbar->name, 'url' => route('navbars.edit', $navbar)];
            }
        }

        foreach (Footer::all() as $footer) {
            if (str_contains($footer->html_content ?? '', $relativeUrl) || str_contains($footer->components_json ?? '', $relativeUrl)) {
                $usages[] = ['type' => 'footer', 'label' => $footer->name, 'url' => route('footers.edit', $footer)];
            }
        }

        foreach (Banner::all() as $banner) {
            if ($banner->image_path === $bannerPath) {
                $usages[] = ['type' => 'banner', 'label' => $banner->title, 'url' => route('banners.edit', $banner)];
            }
        }

        foreach (ExtraordinaryAsset::all() as $asset) {
            if ($asset->image_url === $relativeUrl) {
                $usages[] = ['type' => 'asset', 'label' => $asset->name, 'url' => route('assets.edit', $asset)];
            }
        }

        foreach (News::all() as $news) {
            if ($news->featured_image === $relativeUrl) {
                $usages[] = ['type' => 'news', 'label' => $news->title, 'url' => route('news.edit', $news)];
            }
        }

        return $usages;
    }

    protected static function booted()
    {
        static::deleted(function ($media) {
            if ($media->isForceDeleting()) {
                try {
                    if (Storage::disk($media->disk)->exists($media->path)) {
                        Storage::disk($media->disk)->delete($media->path);
                    }
                } catch (\Exception $e) {
                    \Log::error('Error deleting file from storage', [
                        'media_id' => $media->id,
                        'path' => $media->path,
                        'error' => $e->getMessage()
                    ]);
                }
            }
        });
    }
}
