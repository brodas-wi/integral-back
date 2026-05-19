<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'username',
        'name',
        'password',
        'is_active',
        'is_root',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'is_active' => 'boolean',
            'is_root' => 'boolean',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
        ];
    }

    /**
     * Check if user is root administrator
     */
    public function isRootAdmin(): bool
    {
        return $this->is_root === true;
    }

    /**
     * Check if user can be deleted
     */
    public function isDeletable(): bool
    {
        return !$this->isRootAdmin() && $this->id !== auth()->id();
    }

    /**
     * Check if user can be edited by current user
     */
    public function isEditableBy(User $authenticatedUser): bool
    {
        if (!$this->isRootAdmin()) {
            return true;
        }

        return $this->id === $authenticatedUser->id;
    }

    /**
     * Check if user can be deactivated
     */
    public function canBeDeactivated(): bool
    {
        return !$this->isRootAdmin();
    }

    /**
     * Relationship with uploaded media
     */
    public function uploadedMedia(): HasMany
    {
        return $this->hasMany(Media::class, 'uploaded_by');
    }

    /**
     * Relationship with created agencies
     */
    public function agencies(): HasMany
    {
        return $this->hasMany(Agency::class, 'created_by');
    }

    /**
     * Relationship with created pages
     */
    public function createdPages(): HasMany
    {
        return $this->hasMany(Page::class, 'created_by');
    }

    /**
     * Relationship with updated pages
     */
    public function updatedPages(): HasMany
    {
        return $this->hasMany(Page::class, 'updated_by');
    }

    /**
     * Scope: Filter active users
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: Filter inactive users
     */
    public function scopeInactive(Builder $query): Builder
    {
        return $query->where('is_active', false);
    }

    /**
     * Scope: Exclude root admin
     */
    public function scopeNonRoot(Builder $query): Builder
    {
        return $query->where('is_root', false);
    }

    /**
     * Scope: Search by username or name
     */
    public function scopeSearch(Builder $query, string $search): Builder
    {
        return $query->where(function ($q) use ($search) {
            $q->where('username', 'like', "%{$search}%")
                ->orWhere('name', 'like', "%{$search}%");
        });
    }

    /**
     * Scope: Filter by role
     */
    public function scopeWithRole(Builder $query, string $roleName): Builder
    {
        return $query->whereHas('roles', function ($q) use ($roleName) {
            $q->where('name', $roleName);
        });
    }

    /**
     * Get user's primary role name
     */
    public function getPrimaryRoleAttribute(): ?string
    {
        return $this->roles->first()?->name;
    }

    /**
     * Get formatted status
     */
    public function getStatusLabelAttribute(): string
    {
        return $this->is_active ? 'Activo' : 'Inactivo';
    }
}
