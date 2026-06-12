<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Script extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'scope',
        'page_slugs',
        'js_content',
        'css_content',
        'status',
        'is_active',
        'rejection_reason',
        'reviewed_by',
        'reviewed_at',
        'approved_by',
        'approved_at',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'page_slugs'  => 'array',
        'is_active'   => 'boolean',
        'reviewed_at' => 'datetime',
        'approved_at' => 'datetime',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
    ];

    // ── Relationships ──────────────────────────────────────────────────────

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by')->withDefault([
            'name' => 'Usuario eliminado',
        ]);
    }

    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by')->withDefault([
            'name' => 'Sistema',
        ]);
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by')->withDefault([
            'name' => 'Sin revisor',
        ]);
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by')->withDefault([
            'name' => 'Sin aprobador',
        ]);
    }

    // ── Scopes ─────────────────────────────────────────────────────────────

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'approved')->where('is_active', true);
    }

    public function scopePendingReview(Builder $query): Builder
    {
        return $query->where('status', 'pending_review');
    }

    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'approved');
    }

    public function scopeGlobal(Builder $query): Builder
    {
        return $query->where('scope', 'global');
    }

    public function scopeForPage(Builder $query, string $pageSlug): Builder
    {
        return $query->where(function ($q) use ($pageSlug) {
            $q->where('scope', 'global')
                ->orWhere(function ($sq) use ($pageSlug) {
                    $sq->where('scope', 'per_page')
                        ->where('page_slugs', 'like', '%"' . $pageSlug . '"%');
                });
        });
    }

    /**
     * Scope: scripts that have CSS content.
     */
    public function scopeWithCss(Builder $query): Builder
    {
        return $query->whereNotNull('css_content')->where('css_content', '!=', '');
    }

    // ── Computed Attributes ────────────────────────────────────────────────

    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'draft'          => 'Borrador',
            'pending_review' => 'Pendiente de revisión',
            'approved'       => 'Aprobado',
            'rejected'       => 'Rechazado',
            default          => 'Desconocido',
        };
    }

    public function getStatusColorAttribute(): string
    {
        return match ($this->status) {
            'draft'          => 'gray',
            'pending_review' => 'yellow',
            'approved'       => 'green',
            'rejected'       => 'red',
            default          => 'gray',
        };
    }

    public function getScopeLabelAttribute(): string
    {
        return match ($this->scope) {
            'global'   => 'Global (todas las páginas)',
            'per_page' => 'Páginas específicas',
            default    => 'Desconocido',
        };
    }

    /**
     * Returns the JS content (always the primary content).
     */
    public function getContentAttribute(): ?string
    {
        return $this->js_content;
    }

    // ── State Helpers ──────────────────────────────────────────────────────

    public function isDraft(): bool
    {
        return $this->status === 'draft';
    }

    public function isPendingReview(): bool
    {
        return $this->status === 'pending_review';
    }

    public function isApproved(): bool
    {
        return $this->status === 'approved';
    }

    public function isRejected(): bool
    {
        return $this->status === 'rejected';
    }

    public function isCurrentlyActive(): bool
    {
        return $this->isApproved() && $this->is_active;
    }

    public function canBeActivated(): bool
    {
        return $this->isApproved();
    }

    /**
     * Whether this script has optional CSS styles.
     */
    public function hasCss(): bool
    {
        return !empty($this->css_content);
    }
}
