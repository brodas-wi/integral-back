<?php

namespace App\Services;

use App\Data\ElSalvadorGeography;
use App\Models\PaymentPoint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;

class PaymentPointImportService
{
    protected const LAT_HEADERS = ['latitud', 'latitude', 'lat'];
    protected const LNG_HEADERS = ['longitud', 'longitude', 'lon', 'lng'];
    protected const SV_LAT = [13.1, 14.5];
    protected const SV_LNG = [-90.2, -87.6];

    protected array $errors = [];
    protected array $duplicates = [];
    protected array $warnings = [];
    protected int $imported = 0;
    protected int $skipped = 0;
    protected int $withCoordinates = 0;
    protected ?int $latColumn = null;
    protected ?int $lngColumn = null;

    public function import(string $filePath): array
    {
        try {
            $spreadsheet = IOFactory::load($filePath);
            $worksheet = $spreadsheet->getActiveSheet();
            $rows = $worksheet->toArray(null, true, false, false);

            if (empty($rows)) {
                return [
                    'success' => false,
                    'message' => 'El archivo está vacío',
                ];
            }

            $header = array_shift($rows);
            $this->detectCoordinateColumns($header);

            DB::beginTransaction();

            foreach ($rows as $index => $row) {
                $rowNumber = $index + 2;

                if ($this->isEmptyRow($row)) {
                    continue;
                }

                $this->processRow($row, $rowNumber);
            }

            DB::commit();

            return [
                'success' => true,
                'imported' => $this->imported,
                'skipped' => $this->skipped,
                'duplicates' => $this->duplicates,
                'errors' => $this->errors,
                'warnings' => $this->warnings,
                'has_coordinate_columns' => $this->hasCoordinateColumns(),
                'with_coordinates' => $this->withCoordinates,
                'without_coordinates' => $this->imported - $this->withCoordinates,
            ];
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Payment point import error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'success' => false,
                'message' => 'Error al importar: ' . $e->getMessage(),
            ];
        }
    }

    protected function detectCoordinateColumns(array $header): void
    {
        $this->latColumn = null;
        $this->lngColumn = null;

        foreach ($header as $index => $title) {
            $name = Str::lower(Str::ascii(trim((string) $title)));

            if (in_array($name, self::LAT_HEADERS, true)) {
                $this->latColumn = $index;
            } elseif (in_array($name, self::LNG_HEADERS, true)) {
                $this->lngColumn = $index;
            }
        }

        if (($this->latColumn === null) !== ($this->lngColumn === null)) {
            $this->warnings[] = 'Solo se encontró una de las columnas Latitud y Longitud; se ignoraron las coordenadas.';
            $this->latColumn = null;
            $this->lngColumn = null;
        }
    }

    protected function hasCoordinateColumns(): bool
    {
        return $this->latColumn !== null && $this->lngColumn !== null;
    }

    protected function rowLabel(string $affiliate, string $branch): string
    {
        $label = trim("{$affiliate} / {$branch}", ' /');

        return $label !== '' ? " ({$label})" : '';
    }

    protected function isEmptyRow(array $row): bool
    {
        return empty(array_filter($row, fn($cell) => !is_null($cell) && trim((string) $cell) !== ''));
    }

    protected function processRow(array $row, int $rowNumber): void
    {
        try {
            $correspondent = trim($row[1] ?? '');
            $municipality = trim($row[2] ?? '');
            $department = trim($row[3] ?? '');
            $affiliate = trim($row[4] ?? '');
            $branch = trim($row[5] ?? '');
            $address = trim($row[6] ?? '');

            $missing = array_keys(array_filter([
                'Corresponsal' => $correspondent === '',
                'Distrito' => $department === '',
                'Afiliado' => $affiliate === '',
                'Sucursal' => $branch === '',
            ]));

            if ($missing) {
                $this->errors[] = "Fila {$rowNumber}: falta " . implode(', ', $missing) . $this->rowLabel($affiliate, $branch);
                $this->skipped++;
                return;
            }

            $correspondentNormalized = $this->normalizeCorrespondent($correspondent);
            if (!$correspondentNormalized) {
                $this->errors[] = "Fila {$rowNumber}: corresponsal no válido '{$correspondent}'" . $this->rowLabel($affiliate, $branch);
                $this->skipped++;
                return;
            }

            $existing = PaymentPoint::where('correspondent', $correspondentNormalized)
                ->where('affiliate', $affiliate)
                ->where('branch', $branch)
                ->first();

            if ($existing) {
                $this->duplicates[] = "Fila {$rowNumber}: Duplicado - {$affiliate} / {$branch}";
                $this->skipped++;
                return;
            }

            [$latitude, $longitude] = $this->extractCoordinates($row, $rowNumber);

            PaymentPoint::create([
                'correspondent' => $correspondentNormalized,
                'zone' => ElSalvadorGeography::zoneByDepartment($department),
                'department' => $department,
                'municipality' => $municipality ?: $department,
                'affiliate' => $affiliate,
                'branch' => $branch,
                'address' => $address,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'is_active' => true,
                'created_by' => auth()->id(),
            ]);

            $this->imported++;

            if ($latitude !== null) {
                $this->withCoordinates++;
            }
        } catch (\Exception $e) {
            $this->errors[] = "Fila {$rowNumber}: " . Str::limit(strtok($e->getMessage(), "\n"), 180);
            $this->skipped++;
            Log::error('Error processing row', [
                'row' => $rowNumber,
                'error' => $e->getMessage(),
            ]);
        }
    }

    protected function extractCoordinates(array $row, int $rowNumber): array
    {
        if (!$this->hasCoordinateColumns()) {
            return [null, null];
        }

        $rawLat = trim((string) ($row[$this->latColumn] ?? ''));
        $rawLng = trim((string) ($row[$this->lngColumn] ?? ''));

        if ($rawLat === '' && $rawLng === '') {
            return [null, null];
        }

        $lat = $this->parseDecimal($rawLat);
        $lng = $this->parseDecimal($rawLng);

        if ($lat === null || $lng === null) {
            $this->warnings[] = "Fila {$rowNumber}: coordenadas incompletas o no numéricas, se importó sin coordenadas";
            return [null, null];
        }

        if (!$this->isWithinElSalvador($lat, $lng)) {
            $this->warnings[] = "Fila {$rowNumber}: coordenadas fuera de El Salvador (¿latitud y longitud invertidas?), se importó sin coordenadas";
            return [null, null];
        }

        return [round($lat, 7), round($lng, 7)];
    }

    protected function parseDecimal(string $value): ?float
    {
        $value = str_replace(',', '.', trim($value));

        return is_numeric($value) ? (float) $value : null;
    }

    protected function isWithinElSalvador(float $lat, float $lng): bool
    {
        return $lat >= self::SV_LAT[0] && $lat <= self::SV_LAT[1]
            && $lng >= self::SV_LNG[0] && $lng <= self::SV_LNG[1];
    }

    protected function normalizeCorrespondent(string $correspondent): ?string
    {
        $normalized = [
            'puntoxpress' => 'PuntoXpress',
            'punto xpress' => 'PuntoXpress',
            'punto-xpress' => 'PuntoXpress',
            'aki pago' => 'AKI Pago',
            'akipago' => 'AKI Pago',
            'aki-pago' => 'AKI Pago',
        ];

        $lower = strtolower(trim($correspondent));

        if (isset($normalized[$lower])) {
            return $normalized[$lower];
        }

        if (stripos($lower, 'punto') !== false || stripos($lower, 'xpress') !== false) {
            return 'PuntoXpress';
        }

        if (stripos($lower, 'aki') !== false || stripos($lower, 'pago') !== false) {
            return 'AKI Pago';
        }

        return 'Otro';
    }

    public function getExpectedHeaders(): array
    {
        return ['N°', 'Corresponsal', 'Municipio', 'Distrito', 'Afiliado', 'Sucursal', 'Dirección', 'Latitud', 'Longitud'];
    }

    public function getSampleData(): array
    {
        return [
            ['1', 'PuntoXpress', 'AHUACHAPAN CENTRO', 'AHUACHAPAN', 'SUPER SELECTOS', 'SELECTOS AHUACHAPAN', 'CARRETERA AHUACHAPAN DESVIA A SONSONATE', '13.9214', '-89.8450'],
            ['2', 'AKI Pago', 'SAN SALVADOR CENTRO', 'SAN SALVADOR', 'FARMACIA SANTA ELENA', 'FARMACIA SANTA ELENA III', '4 CALLE PONIENTE Y 2A AVENIDA NORTE NO. 1-120', '', ''],
        ];
    }
}
