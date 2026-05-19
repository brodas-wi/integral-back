<?php

namespace App\Services;

use App\Data\ElSalvadorGeography;
use App\Models\PaymentPoint;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\DB;

class PaymentPointService
{
    public function create(array $data): PaymentPoint
    {
        return DB::transaction(function () use ($data) {
            $paymentPoint = PaymentPoint::create([
                'correspondent' => $data['correspondent'],
                'zone' => ElSalvadorGeography::zoneByDepartment($data['department']),
                'department' => $data['department'],
                'municipality' => $data['municipality'],
                'affiliate' => $data['affiliate'],
                'branch' => $data['branch'],
                'address' => $data['address'],
                'latitude' => $data['latitude'] ?? null,
                'longitude' => $data['longitude'] ?? null,
                'is_active' => $data['is_active'] ?? false,
                'created_by' => auth()->id(),
            ]);

            return $paymentPoint;
        });
    }

    public function update(PaymentPoint $paymentPoint, array $data): PaymentPoint
    {
        return DB::transaction(function () use ($paymentPoint, $data) {
            $paymentPoint->update([
                'correspondent' => $data['correspondent'],
                'zone' => ElSalvadorGeography::zoneByDepartment($data['department']),
                'department' => $data['department'],
                'municipality' => $data['municipality'],
                'affiliate' => $data['affiliate'],
                'branch' => $data['branch'],
                'address' => $data['address'],
                'latitude' => $data['latitude'] ?? null,
                'longitude' => $data['longitude'] ?? null,
                'is_active' => $data['is_active'] ?? false,
                'updated_by' => $data['updated_by'] ?? null,
            ]);

            return $paymentPoint->fresh(['creator', 'updater']);
        });
    }

    public function delete(PaymentPoint $paymentPoint): bool
    {
        return DB::transaction(function () use ($paymentPoint) {
            return $paymentPoint->delete();
        });
    }

    public function getStatistics(): array
    {
        return [
            'total' => PaymentPoint::count(),
            'active' => PaymentPoint::active()->count(),
            'inactive' => PaymentPoint::inactive()->count(),
            'with_coordinates' => PaymentPoint::withCoordinates()->count(),
            'by_correspondent' => PaymentPoint::select('correspondent', DB::raw('count(*) as count'))
                ->groupBy('correspondent')
                ->pluck('count', 'correspondent')
                ->toArray(),
        ];
    }

    public function getExistingDepartments(): SupportCollection
    {
        return PaymentPoint::select('department')
            ->distinct()
            ->orderBy('department')
            ->pluck('department');
    }

    public function getExistingMunicipalities(): SupportCollection
    {
        return PaymentPoint::select('municipality')
            ->distinct()
            ->orderBy('municipality')
            ->pluck('municipality');
    }

    public function buildFilteredQuery(array $filters)
    {
        $query = PaymentPoint::with(['creator', 'updater'])->latest();

        if (!empty($filters['search'])) {
            $query->search($filters['search']);
        }

        if (!empty($filters['correspondent'])) {
            $query->byCorrespondent($filters['correspondent']);
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
