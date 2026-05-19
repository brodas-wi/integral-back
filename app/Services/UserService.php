<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserService
{
    /**
     * Create a new user with role
     */
    public function create(array $data): User
    {
        return DB::transaction(function () use ($data) {
            $user = User::create([
                'username' => $data['username'],
                'name' => $data['name'],
                'password' => Hash::make($data['password']),
                'is_active' => $data['is_active'] ?? false,
            ]);

            if (!empty($data['role'])) {
                $user->assignRole($data['role']);
            }

            Log::info('User created', [
                'user_id' => $user->id,
                'username' => $user->username,
                'role' => $data['role'],
            ]);

            return $user->load('roles');
        });
    }

    /**
     * Update an existing user
     */
    public function update(User $user, array $data): User
    {
        return DB::transaction(function () use ($user, $data) {
            $updateData = [
                'username' => $data['username'],
                'name' => $data['name'],
                'is_active' => $data['is_active'] ?? false,
            ];

            // Only update password if provided
            if (!empty($data['password'])) {
                $updateData['password'] = Hash::make($data['password']);
            }

            $user->update($updateData);

            // Sync roles
            if (!empty($data['role'])) {
                $user->syncRoles([$data['role']]);
            }

            Log::info('User updated', [
                'user_id' => $user->id,
                'username' => $user->username,
                'role' => $data['role'] ?? null,
            ]);

            return $user->fresh(['roles']);
        });
    }

    /**
     * Delete a user and reassign their content
     */
    public function delete(User $user): array
    {
        if (!$user->isDeletable()) {
            throw new \Exception('Este usuario no puede ser eliminado.');
        }

        return DB::transaction(function () use ($user) {
            $mediaCount = $user->uploadedMedia()->count();

            // Reassign media to null
            if ($mediaCount > 0) {
                $user->uploadedMedia()->update(['uploaded_by' => null]);
            }

            $username = $user->username;
            $user->delete();

            Log::info('User deleted', [
                'user_id' => $user->id,
                'username' => $username,
                'media_reassigned' => $mediaCount,
            ]);

            return [
                'media_count' => $mediaCount,
                'username' => $username,
            ];
        });
    }

    /**
     * Toggle user active status
     */
    public function toggleStatus(User $user): User
    {
        if (!$user->canBeDeactivated()) {
            throw new \Exception('No se puede desactivar el usuario administrador root.');
        }

        $user->update(['is_active' => !$user->is_active]);

        Log::info('User status toggled', [
            'user_id' => $user->id,
            'username' => $user->username,
            'new_status' => $user->is_active,
        ]);

        return $user->fresh();
    }

    /**
     * Get statistics for users
     */
    public function getStatistics(): array
    {
        return [
            'total' => User::count(),
            'active' => User::active()->count(),
            'inactive' => User::inactive()->count(),
            'with_media' => User::has('uploadedMedia')->count(),
        ];
    }

    /**
     * Build filtered query for users
     */
    public function buildFilteredQuery(array $filters)
    {
        $query = User::with('roles')->latest();

        if (!empty($filters['search'])) {
            $query->search($filters['search']);
        }

        if (!empty($filters['role'])) {
            $query->withRole($filters['role']);
        }

        if (isset($filters['status'])) {
            $isActive = $filters['status'] === 'active';
            $query->where('is_active', $isActive);
        }

        return $query;
    }
}
