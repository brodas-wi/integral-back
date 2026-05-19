<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AgencyPhone extends Model
{
    use HasFactory;

    protected $fillable = [
        'agency_id',
        'phone',
        'type',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public $timestamps = true;

    /**
     * Relationship with agency
     */
    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }

    /**
     * Get formatted phone number
     */
    public function getFormattedAttribute(): string
    {
        return $this->formatPhone($this->phone);
    }

    /**
     * Format phone number
     */
    protected function formatPhone(string $phone): string
    {
        // Remove all non-numeric characters
        $cleaned = preg_replace('/[^0-9]/', '', $phone);

        // Format based on length (El Salvador format)
        if (strlen($cleaned) === 8) {
            return substr($cleaned, 0, 4) . '-' . substr($cleaned, 4);
        }

        return $phone;
    }
}
