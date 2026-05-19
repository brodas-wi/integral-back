<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Banner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title', 'description', 'image_path', 'image_alt', 'category',
        'btn_primary_text', 'btn_primary_url', 'btn_primary_style', 'btn_primary_external',
        'btn_secondary_text', 'btn_secondary_url', 'btn_secondary_style', 'btn_secondary_external',
        'is_active', 'order', 'created_by', 'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'btn_primary_external' => 'boolean',
        'btn_secondary_external' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the user who created the banner
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user who updated the banner
     */
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function media()
    {
        return $this->belongsTo(\App\Models\Media::class, 'media_id');
    }

    /**
     * Get the full URL of the image
     */
    public function getImageUrlAttribute(): string
    {
        return asset('storage/' . $this->image_path);
    }
}
