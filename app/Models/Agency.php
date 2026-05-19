<?php

namespace App\Models;

use App\Traits\HasStatistics;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Agency extends Model
{
    use HasFactory, HasStatistics;

    protected $fillable = [
        'name',
        'schedule',
        'zone',
        'department',
        'municipality',
        'address',
        'latitude',
        'longitude',
        'is_active',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'latitude' => 'decimal:7',
        'longitude' => 'decimal:7',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected $appends = [
        'coordinates',
        'google_maps_link',
        'has_coordinates',
    ];

    /**
     * Relationship with phones
     */
    public function phones(): HasMany
    {
        return $this->hasMany(AgencyPhone::class);
    }

    /**
     * Relationship with creator user
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by')->withDefault([
            'name' => 'Usuario eliminado',
            'username' => 'deleted_user',
        ]);
    }

    /**
     * Relationship with updater user
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by')->withDefault([
            'name' => 'Sistema',
            'username' => 'system',
        ]);
    }

    /**
     * Get formatted coordinates string
     */
    public function getCoordinatesAttribute(): ?string
    {
        return $this->hasCoordinates()
            ? "{$this->latitude}, {$this->longitude}"
            : null;
    }

    /**
     * Get Google Maps link
     */
    public function getGoogleMapsLinkAttribute(): ?string
    {
        return $this->hasCoordinates()
            ? "https://www.google.com/maps?q={$this->latitude},{$this->longitude}"
            : null;
    }

    /**
     * Check if agency has valid coordinates
     */
    public function getHasCoordinatesAttribute(): bool
    {
        return $this->hasCoordinates();
    }

    /**
     * Check if coordinates are present
     */
    public function hasCoordinates(): bool
    {
        return !is_null($this->latitude) && !is_null($this->longitude);
    }

    /**
     * Scope: Filter active agencies
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: Filter inactive agencies
     */
    public function scopeInactive(Builder $query): Builder
    {
        return $query->where('is_active', false);
    }

    /**
     * Scope: Filter with coordinates
     */
    public function scopeWithCoordinates(Builder $query): Builder
    {
        return $query->whereNotNull('latitude')->whereNotNull('longitude');
    }

    /**
     * Scope: Filter by zone
     */
    public function scopeByZone(Builder $query, string $zone): Builder
    {
        return $query->where('zone', $zone);
    }

    /**
     * Scope: Filter by department
     */
    public function scopeByDepartment(Builder $query, string $department): Builder
    {
        return $query->where('department', $department);
    }

    /**
     * Scope: Filter by municipality
     */
    public function scopeByMunicipality(Builder $query, string $municipality): Builder
    {
        return $query->where('municipality', $municipality);
    }

    /**
     * Scope: Search by text
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('address', 'like', "%{$search}%")
                ->orWhere('municipality', 'like', "%{$search}%");
        });
    }

    /**
     * Get formatted phone numbers
     */
    public function getFormattedPhonesAttribute(): array
    {
        return $this->phones->pluck('phone')->toArray();
    }
}
