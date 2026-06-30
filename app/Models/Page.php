<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Footer;
use App\Models\Navbar;
use Cviebrock\EloquentSluggable\Sluggable;

class Page extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = [
        'title',
        'slug',
        'footer_id',
        'navbar_id',
        'html_content',
        'css_content',
        'js_content',
        'components_json',
        'styles_json',
        'is_published',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Return the sluggable configuration array for this model
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'title',
                'onUpdate' => false,
                'separator' => '-',
                'unique' => true,
                'maxLength' => 255,
            ]
        ];
    }

    /**
     * Normalize a string to slug format: lowercase, without accents/ñ
     */
    public static function normalizeSlug(string $value): string
    {
        $value = mb_strtolower(trim($value));

        $replacements = [
            'á' => 'a',
            'à' => 'a',
            'ä' => 'a',
            'â' => 'a',
            'é' => 'e',
            'è' => 'e',
            'ë' => 'e',
            'ê' => 'e',
            'í' => 'i',
            'ì' => 'i',
            'ï' => 'i',
            'î' => 'i',
            'ó' => 'o',
            'ò' => 'o',
            'ö' => 'o',
            'ô' => 'o',
            'ú' => 'u',
            'ù' => 'u',
            'ü' => 'u',
            'û' => 'u',
            'ñ' => 'n',
            'ç' => 'c',
        ];
        $value = strtr($value, $replacements);

        $value = preg_replace('/[^a-z0-9\s-]/', '', $value);
        $value = preg_replace('/[\s-]+/', '-', $value);

        return trim($value, '-');
    }

    /**
     * Generate suggestions 
     */
    public static function generateSlugSuggestions(string $baseSlug, ?int $excludeId = null, int $count = 3): array
    {
        $suggestions = [];
        $attempt     = 2;

        while (count($suggestions) < $count && $attempt < 50) {
            $candidate = $baseSlug . '-' . $attempt;

            $exists = static::where('slug', $candidate)
                ->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))
                ->exists();

            if (!$exists) {
                $suggestions[] = $candidate;
            }

            $attempt++;
        }

        return $suggestions;
    }

    /**
     * Get the route key for the model
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Relationship: Creator
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Relationship: Last Editor
     */
    public function editor()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Scope: Only published pages
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope: Only draft pages
     */
    public function scopeDraft($query)
    {
        return $query->where('is_published', false);
    }

    public function footer()
    {
        return $this->belongsTo(Footer::class);
    }

    public function navbar()
    {
        return $this->belongsTo(Navbar::class);
    }
}
