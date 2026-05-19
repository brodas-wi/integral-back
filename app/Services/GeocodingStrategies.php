<?php

namespace App\Services;

class GeocodingStrategies
{
    public static function buildSearchQueries(string $address, string $department, string $municipality): array
    {
        $queries = [];

        $cleanAddress = self::cleanAddress($address);
        $landmarks = self::extractLandmarks($cleanAddress);
        $streetInfo = self::extractStreetInfo($cleanAddress);

        if (!empty($landmarks)) {
            foreach ($landmarks as $landmark) {
                $queries[] = [
                    'query' => "{$landmark}, {$municipality}, {$department}, El Salvador",
                    'type' => 'landmark',
                    'priority' => 1,
                ];
            }
        }

        if (!empty($streetInfo['street'])) {
            $queries[] = [
                'query' => "{$streetInfo['street']}, {$municipality}, {$department}, El Salvador",
                'type' => 'street',
                'priority' => 2,
            ];
        }

        $coloniaBarrio = self::extractColoniaBarrio($cleanAddress);
        if ($coloniaBarrio) {
            $queries[] = [
                'query' => "{$coloniaBarrio}, {$municipality}, {$department}, El Salvador",
                'type' => 'neighborhood',
                'priority' => 3,
            ];
        }

        $queries[] = [
            'query' => "{$cleanAddress}, {$municipality}, {$department}, El Salvador",
            'type' => 'full_address',
            'priority' => 4,
        ];

        $queries[] = [
            'query' => "{$municipality}, {$department}, El Salvador",
            'type' => 'municipality',
            'priority' => 5,
        ];

        $queries[] = [
            'query' => "{$department}, El Salvador",
            'type' => 'department',
            'priority' => 6,
        ];

        usort($queries, fn($a, $b) => $a['priority'] <=> $b['priority']);

        return $queries;
    }

    protected static function cleanAddress(string $address): string
    {
        $address = trim($address);
        $address = preg_replace('/\s+/', ' ', $address);
        return $address;
    }

    protected static function extractLandmarks(string $address): array
    {
        $landmarks = [];
        $commonLandmarks = [
            'hospital',
            'clinica',
            'centro de salud',
            'unidad de salud',
            'iglesia',
            'catedral',
            'parroquia',
            'mercado',
            'supermercado',
            'super',
            'despensa',
            'parque',
            'plaza',
            'estadio',
            'polideportivo',
            'alcaldia',
            'municipalidad',
            'gobernacion',
            'escuela',
            'colegio',
            'instituto',
            'universidad',
            'centro comercial',
            'mall',
            'metrocentro',
            'galerías',
            'banco',
            'cajero',
            'cooperativa',
            'gasolinera',
            'bomba',
            'puma',
            'texaco',
            'shell',
            'esso',
            'terminal',
            'parada de buses',
            'redondel',
            'rotonda',
            'glorieta',
        ];

        $addressLower = mb_strtolower($address);

        foreach ($commonLandmarks as $landmark) {
            if (stripos($addressLower, $landmark) !== false) {
                preg_match('/(.{0,30}' . preg_quote($landmark, '/') . '.{0,30})/i', $address, $matches);
                if (!empty($matches[1])) {
                    $landmarks[] = trim($matches[1]);
                }
            }
        }

        return array_unique($landmarks);
    }

    protected static function extractStreetInfo(string $address): array
    {
        $streetPatterns = [
            '/(?:calle|cl\.?)\s+([^,\n]+)/i',
            '/(?:avenida|av\.?|avda\.?)\s+([^,\n]+)/i',
            '/(?:boulevard|blvd\.?|bulevar)\s+([^,\n]+)/i',
            '/(?:pasaje|pje\.?)\s+([^,\n]+)/i',
            '/(?:carretera|carr\.?)\s+([^,\n]+)/i',
            '/(?:alameda|ala\.?)\s+([^,\n]+)/i',
        ];

        foreach ($streetPatterns as $pattern) {
            if (preg_match($pattern, $address, $matches)) {
                return [
                    'street' => trim($matches[0]),
                    'name' => trim($matches[1]),
                ];
            }
        }

        return ['street' => null, 'name' => null];
    }

    protected static function extractColoniaBarrio(string $address): ?string
    {
        $patterns = [
            '/(?:colonia|col\.?)\s+([^,\n]+)/i',
            '/(?:barrio|bo\.?|bro\.?)\s+([^,\n]+)/i',
            '/(?:residencial|res\.?)\s+([^,\n]+)/i',
            '/(?:urbanización|urb\.?)\s+([^,\n]+)/i',
            '/(?:cantón|canton|cant\.?)\s+([^,\n]+)/i',
            '/(?:caserío|caserio|cas\.?)\s+([^,\n]+)/i',
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $address, $matches)) {
                return trim($matches[0]);
            }
        }

        return null;
    }

    public static function analyzeResult(array $result, string $queryType): array
    {
        $confidence = 'low';
        $accuracy = 'country';

        switch ($queryType) {
            case 'landmark':
                $confidence = 'high';
                $accuracy = 'exact';
                break;
            case 'street':
                $confidence = 'high';
                $accuracy = 'street';
                break;
            case 'neighborhood':
                $confidence = 'medium';
                $accuracy = 'neighborhood';
                break;
            case 'full_address':
                $confidence = 'medium';
                $accuracy = 'address';
                break;
            case 'municipality':
                $confidence = 'low';
                $accuracy = 'municipality';
                break;
            case 'department':
                $confidence = 'very_low';
                $accuracy = 'department';
                break;
        }

        return array_merge($result, [
            'confidence' => $confidence,
            'accuracy' => $accuracy,
            'query_type' => $queryType,
        ]);
    }
}
