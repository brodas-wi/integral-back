<?php

namespace App\Services;

use App\Data\ElSalvadorGeography;
use App\Models\Agency;
use App\Models\AgencyPhone;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\DB;

class AgencyService
{
    /**
     * Create a new agency with phones
     */
    public function create(array $data): Agency
    {
        return DB::transaction(function () use ($data) {
            $agency = Agency::create([
                'name' => $data['name'],
                'zone' => ElSalvadorGeography::zoneByDepartment($data['department']),
                'department' => $data['department'],
                'municipality' => $data['municipality'],
                'address' => $data['address'],
                'schedule' => $data['schedule'] ?? null,
                'latitude' => $data['latitude'] ?? null,
                'longitude' => $data['longitude'] ?? null,
                'is_active' => $data['is_active'] ?? false,
                'created_by' => auth()->id(),
            ]);

            if (!empty($data['phones'])) {
                $this->syncPhones($agency, $data['phones']);
            }

            return $agency->load('phones');
        });
    }

    /**
     * Update an existing agency
     */
    public function update(Agency $agency, array $data): Agency
    {
        return DB::transaction(function () use ($agency, $data) {
            $agency->update([
                'name' => $data['name'],
                'zone' => ElSalvadorGeography::zoneByDepartment($data['department']),
                'department' => $data['department'],
                'municipality' => $data['municipality'],
                'address' => $data['address'],
                'schedule' => $data['schedule'] ?? null,
                'latitude' => $data['latitude'] ?? null,
                'longitude' => $data['longitude'] ?? null,
                'is_active' => $data['is_active'] ?? false,
                'updated_by' => $data['updated_by'] ?? null,
            ]);

            if (isset($data['phones'])) {
                $this->syncPhones($agency, $data['phones']);
            }

            return $agency->fresh(['phones', 'updater']);
        });
    }

    /**
     * Delete an agency
     */
    public function delete(Agency $agency): bool
    {
        return DB::transaction(function () use ($agency) {
            $agency->phones()->delete();
            return $agency->delete();
        });
    }

    /**
     * Sync phone numbers for an agency
     */
    protected function syncPhones(Agency $agency, array $phones): void
    {
        // Delete existing phones
        $agency->phones()->delete();

        // Create new phones
        $filteredPhones = array_filter($phones, fn($phone) => !empty($phone));

        foreach ($filteredPhones as $phone) {
            AgencyPhone::create([
                'agency_id' => $agency->id,
                'phone' => $phone,
                'type' => 'main',
            ]);
        }
    }

    /**
     * Get statistics for agencies
     */
    public function getStatistics(): array
    {
        return [
            'total' => Agency::count(),
            'active' => Agency::active()->count(),
            'inactive' => Agency::inactive()->count(),
            'with_coordinates' => Agency::withCoordinates()->count(),
        ];
    }

    /**
     * Get distinct departments from existing agencies
     */
    public function getExistingDepartments(): SupportCollection
    {
        return Agency::select('department')
            ->distinct()
            ->orderBy('department')
            ->pluck('department');
    }

    /**
     * Get distinct municipalities from existing agencies
     */
    public function getExistingMunicipalities(): SupportCollection
    {
        return Agency::select('municipality')
            ->distinct()
            ->orderBy('municipality')
            ->pluck('municipality');
    }

    /**
     * Build filtered query for agencies
     */
    public function buildFilteredQuery(array $filters)
    {
        $query = Agency::with(['creator', 'updater'])->latest();

        if (!empty($filters['search'])) {
            $query->search($filters['search']);
        }

        if (!empty($filters['zone'])) {
            $query->byZone($filters['zone']);
        }

        if (!empty($filters['department'])) {
            $query->byDepartment($filters['department']);
        }

        if (!empty($filters['municipality'])) {
            $query->byMunicipality($filters['municipality']);
        }

        if (isset($filters['status'])) {
            $isActive = $filters['status'] === 'active';
            $query->where('is_active', $isActive);
        }

        return $query;
    }
}
