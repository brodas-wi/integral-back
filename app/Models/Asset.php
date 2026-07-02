<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Asset extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'asset_category_id',
        'name',
        'short_description',
        'image_url',
        'link_url',
        'link_is_external',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'link_is_external' => 'boolean',
        'is_active'         => 'boolean',
        'created_at'        => 'datetime',
        'updated_at'        => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(AssetCategory::class, 'asset_category_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by')->withDefault(['name' => 'Usuario eliminado']);
    }

    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by')->withDefault(['name' => 'Sistema']);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeCategory($query, string $categorySlug)
    {
        return $query->whereHas('category', fn($q) => $q->where('slug', $categorySlug));
    }
}
