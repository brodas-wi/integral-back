<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug'];

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

    public static function findOrCreateByName(string $name): self
    {
        $name = trim($name);
        $slug = static::normalizeSlug($name);

        $category = static::where('slug', $slug)->first();
        if ($category) {
            return $category;
        }

        return static::create(['name' => $name, 'slug' => $slug]);
    }

    public function assets()
    {
        return $this->hasMany(Asset::class);
    }
}
