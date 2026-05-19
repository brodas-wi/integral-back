<?php

namespace App\Models;

use App\Traits\HasStatistics;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class PaymentPoint extends Model
{
    use HasFactory, HasStatistics;

    const CORRESPONDENTS = [
        'PuntoXpress' => 'PuntoXpress',
        'AKI Pago' => 'AKI Pago',
        'Otro' => 'Otro',
    ];

    protected $fillable = [
        'correspondent',
        'department',
        'municipality',
        'affiliate',
        'branch',
        'address',
        'zone',
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

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by')->withDefault([
            'name' => 'Usuario eliminado',
            'username' => 'deleted_user',
        ]);
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by')->withDefault([
            'name' => 'Sistema',
            'username' => 'system',
        ]);
    }

    public function getCoordinatesAttribute(): ?string
    {
        return $this->hasCoordinates()
            ? "{$this->latitude}, {$this->longitude}"
            : null;
    }

    public function getGoogleMapsLinkAttribute(): ?string
    {
        return $this->hasCoordinates()
            ? "https://www.google.com/maps?q={$this->latitude},{$this->longitude}"
            : null;
    }

    public function getHasCoordinatesAttribute(): bool
    {
        return $this->hasCoordinates();
    }

    public function hasCoordinates(): bool
    {
        return !is_null($this->latitude) && !is_null($this->longitude);
    }

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeInactive(Builder $query): Builder
    {
        return $query->where('is_active', false);
    }

    public function scopeWithCoordinates(Builder $query): Builder
    {
        return $query->whereNotNull('latitude')->whereNotNull('longitude');
    }

    public function scopeByCorrespondent(Builder $query, string $correspondent): Builder
    {
        return $query->where('correspondent', $correspondent);
    }

    public function scopeByZone(Builder $query, string $zone): Builder
    {
        return $query->where('zone', $zone);
    }

    public function scopeByDepartment(Builder $query, string $department): Builder
    {
        return $query->where('department', $department);
    }

    public function scopeByMunicipality(Builder $query, string $municipality): Builder
    {
        return $query->where('municipality', $municipality);
    }

    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('affiliate', 'like', "%{$search}%")
                ->orWhere('branch', 'like', "%{$search}%")
                ->orWhere('address', 'like', "%{$search}%")
                ->orWhere('municipality', 'like', "%{$search}%");
        });
    }

    public static function getCorrespondents(): array
    {
        return self::CORRESPONDENTS;
    }
}
