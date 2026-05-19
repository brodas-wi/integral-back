<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Media extends Model
{
    use HasFactory;

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

    // Get human readable file size
    public function getHumanSizeAttribute(): string
    {
        $bytes = $this->size;
        $units = ['B', 'KB', 'MB', 'GB'];

        for ($i = 0; $bytes > 1024; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, 2) . ' ' . $units[$i];
    }

    // Get full URL of the file
    public function getUrlAttribute(): string
    {
        return Storage::disk($this->disk)->url($this->path);
    }

    // Get dimensions string (e.g., "1920 × 1080")
    public function getDimensionsAttribute(): ?string
    {
        if (!$this->isImage() || !$this->width || !$this->height) {
            return null;
        }

        return "{$this->width} × {$this->height}";
    }

    // Check if media is an image
    public function isImage(): bool
    {
        return $this->type === 'image';
    }

    // Check if media is a PDF
    public function isPdf(): bool
    {
        return $this->type === 'pdf';
    }

    // Check if media is a document
    public function isDocument(): bool
    {
        return $this->type === 'document';
    }

    // Relationship with user who uploaded
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    // Delete file from storage when model is deleted
    protected static function booted()
    {
        static::deleting(function ($media) {
            try {
                // Check if file exists and delete it
                if (Storage::disk($media->disk)->exists($media->path)) {
                    $deleted = Storage::disk($media->disk)->delete($media->path);

                    if ($deleted) {
                        \Log::info('File deleted successfully', [
                            'path' => $media->path,
                            'disk' => $media->disk,
                            'filename' => $media->filename
                        ]);
                    } else {
                        \Log::warning('File could not be deleted', [
                            'path' => $media->path,
                            'disk' => $media->disk
                        ]);
                    }
                } else {
                    \Log::warning('File not found when attempting to delete', [
                        'path' => $media->path,
                        'disk' => $media->disk,
                        'full_path' => Storage::disk($media->disk)->path($media->path)
                    ]);
                }
            } catch (\Exception $e) {
                \Log::error('Error deleting file from storage', [
                    'media_id' => $media->id,
                    'path' => $media->path,
                    'error' => $e->getMessage()
                ]);
            }
        });
    }
}
