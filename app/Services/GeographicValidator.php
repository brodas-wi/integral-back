<?php

namespace App\Services;

class GeographicValidator
{
    protected const EL_SALVADOR_BOUNDS = [
        'min_lat' => 13.0,
        'max_lat' => 14.5,
        'min_lng' => -90.2,
        'max_lng' => -87.7,
    ];

    protected const DEPARTMENT_CENTERS = [
        'Ahuachapán' => ['lat' => 13.9213, 'lng' => -89.8450],
        'Cabañas' => ['lat' => 13.8667, 'lng' => -88.7500],
        'Chalatenango' => ['lat' => 14.0333, 'lng' => -88.9333],
        'Cuscatlán' => ['lat' => 13.8667, 'lng' => -89.0500],
        'La Libertad' => ['lat' => 13.6833, 'lng' => -89.3167],
        'La Paz' => ['lat' => 13.5000, 'lng' => -88.9500],
        'La Unión' => ['lat' => 13.3333, 'lng' => -87.8333],
        'Morazán' => ['lat' => 13.7667, 'lng' => -88.1333],
        'San Miguel' => ['lat' => 13.4833, 'lng' => -88.1833],
        'San Salvador' => ['lat' => 13.7000, 'lng' => -89.2000],
        'San Vicente' => ['lat' => 13.6333, 'lng' => -88.7833],
        'Santa Ana' => ['lat' => 13.9942, 'lng' => -89.5597],
        'Sonsonate' => ['lat' => 13.7189, 'lng' => -89.7239],
        'Usulután' => ['lat' => 13.3500, 'lng' => -88.4333],
    ];

    public function isWithinElSalvador(float $latitude, float $longitude): bool
    {
        return $latitude >= self::EL_SALVADOR_BOUNDS['min_lat']
            && $latitude <= self::EL_SALVADOR_BOUNDS['max_lat']
            && $longitude >= self::EL_SALVADOR_BOUNDS['min_lng']
            && $longitude <= self::EL_SALVADOR_BOUNDS['max_lng'];
    }

    public function isReasonablyClose(float $latitude, float $longitude, string $department, float $maxDistanceKm = 50): bool
    {
        if (!isset(self::DEPARTMENT_CENTERS[$department])) {
            return true;
        }

        $deptCenter = self::DEPARTMENT_CENTERS[$department];
        $distance = $this->calculateDistance(
            $latitude,
            $longitude,
            $deptCenter['lat'],
            $deptCenter['lng']
        );

        return $distance <= $maxDistanceKm;
    }

    public function getDepartmentCenter(string $department): ?array
    {
        return self::DEPARTMENT_CENTERS[$department] ?? null;
    }

    public function calculateDistance(float $lat1, float $lng1, float $lat2, float $lng2): float
    {
        $earthRadius = 6371;

        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);

        $a = sin($dLat / 2) * sin($dLat / 2) +
            cos(deg2rad($lat1)) * cos(deg2rad($lat2)) *
            sin($dLng / 2) * sin($dLng / 2);

        $c = 2 * atan2(sqrt($a), sqrt(1 - $a));

        return $earthRadius * $c;
    }

    public function scoreResult(array $result, string $department): int
    {
        $score = 0;

        if (!$this->isWithinElSalvador($result['latitude'], $result['longitude'])) {
            return 0;
        }

        $score += 30;

        if ($this->isReasonablyClose($result['latitude'], $result['longitude'], $department, 30)) {
            $score += 40;
        } elseif ($this->isReasonablyClose($result['latitude'], $result['longitude'], $department, 50)) {
            $score += 20;
        }

        if (isset($result['display_name'])) {
            $displayLower = mb_strtolower($result['display_name']);
            if (stripos($displayLower, mb_strtolower($department)) !== false) {
                $score += 20;
            }
        }

        if (isset($result['query_type'])) {
            $typeScores = [
                'landmark' => 10,
                'street' => 8,
                'neighborhood' => 6,
                'full_address' => 4,
                'municipality' => 2,
                'department' => 1,
            ];
            $score += $typeScores[$result['query_type']] ?? 0;
        }

        return $score;
    }
}
