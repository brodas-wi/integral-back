<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class GeolocationService
{
    protected const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
    protected const USER_AGENT = 'AgencyCMS/1.0';
    protected const TIMEOUT = 10;
    protected const DELAY_BETWEEN_REQUESTS = 1;
    protected const CACHE_TTL = 86400 * 7;

    protected GeographicValidator $validator;

    public function __construct(GeographicValidator $validator)
    {
        $this->validator = $validator;
    }

    public function geocode(string $address, string $department, string $municipality): array
    {
        $cacheKey = $this->getCacheKey($address, $department, $municipality);

        $cached = Cache::get($cacheKey);
        if ($cached) {
            Log::info('Geocoding cache hit', ['address' => $address]);
            return $cached;
        }

        $queries = GeocodingStrategies::buildSearchQueries($address, $department, $municipality);

        $results = [];
        foreach ($queries as $queryData) {
            $result = $this->queryNominatim($queryData['query']);

            if ($result['success']) {
                $analyzed = GeocodingStrategies::analyzeResult($result, $queryData['type']);
                $analyzed['score'] = $this->validator->scoreResult($analyzed, $department);

                if ($analyzed['score'] > 0) {
                    $results[] = $analyzed;

                    if ($queryData['type'] === 'landmark' || $queryData['type'] === 'street') {
                        Log::info('High confidence result found, stopping search', [
                            'type' => $queryData['type'],
                            'score' => $analyzed['score'],
                        ]);
                        break;
                    }
                }
            }

            if (count($results) < count($queries)) {
                sleep(self::DELAY_BETWEEN_REQUESTS);
            }
        }

        if (empty($results)) {
            $fallback = $this->getFallbackCoordinates($department, $municipality);
            Cache::put($cacheKey, $fallback, self::CACHE_TTL);
            return $fallback;
        }

        usort($results, fn($a, $b) => $b['score'] <=> $a['score']);

        $bestResult = $results[0];

        Log::info('Geocoding completed', [
            'address' => $address,
            'results_found' => count($results),
            'best_score' => $bestResult['score'],
            'accuracy' => $bestResult['accuracy'],
            'query_type' => $bestResult['query_type'],
        ]);

        Cache::put($cacheKey, $bestResult, self::CACHE_TTL);

        return $bestResult;
    }

    protected function queryNominatim(string $query): array
    {
        try {
            $response = Http::timeout(self::TIMEOUT)
                ->withHeaders(['User-Agent' => self::USER_AGENT])
                ->get(self::NOMINATIM_URL, [
                    'q' => $query,
                    'format' => 'json',
                    'limit' => 3,
                    'countrycodes' => 'sv',
                    'addressdetails' => 1,
                ]);

            if (!$response->successful()) {
                return ['success' => false];
            }

            $data = $response->json();

            if (empty($data)) {
                return ['success' => false];
            }

            $result = $data[0];

            return [
                'success' => true,
                'latitude' => (float) $result['lat'],
                'longitude' => (float) $result['lon'],
                'display_name' => $result['display_name'] ?? null,
                'type' => $result['type'] ?? null,
                'class' => $result['class'] ?? null,
            ];
        } catch (\Exception $e) {
            Log::error('Nominatim geocoding error', [
                'error' => $e->getMessage(),
                'query' => $query,
            ]);

            return ['success' => false];
        }
    }

    protected function getFallbackCoordinates(string $department, string $municipality): array
    {
        $deptCenter = $this->validator->getDepartmentCenter($department);

        if ($deptCenter) {
            return [
                'success' => true,
                'latitude' => $deptCenter['lat'],
                'longitude' => $deptCenter['lng'],
                'accuracy' => 'department',
                'confidence' => 'very_low',
                'query_type' => 'fallback',
                'score' => 10,
                'message' => 'Se usaron las coordenadas del centro del departamento',
            ];
        }

        return [
            'success' => false,
            'message' => 'No se pudo determinar la ubicación',
        ];
    }

    protected function getCacheKey(string $address, string $department, string $municipality): string
    {
        return 'geocode:' . md5(
            mb_strtolower(trim($address)) .
                mb_strtolower(trim($department)) .
                mb_strtolower(trim($municipality))
        );
    }
}
