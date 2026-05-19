<?php

namespace App\Services;

use App\Data\ElSalvadorGeography;
use App\Models\PaymentPoint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;

class PaymentPointImportService
{
    protected array $errors = [];
    protected array $duplicates = [];
    protected int $imported = 0;
    protected int $skipped = 0;

    public function import(string $filePath): array
    {
        try {
            $spreadsheet = IOFactory::load($filePath);
            $worksheet = $spreadsheet->getActiveSheet();
            $rows = $worksheet->toArray();

            if (empty($rows)) {
                return [
                    'success' => false,
                    'message' => 'El archivo está vacío',
                ];
            }

            array_shift($rows);

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

    protected function isEmptyRow(array $row): bool
    {
        return empty(array_filter($row, fn($cell) => !is_null($cell) && trim($cell) !== ''));
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

            if (empty($correspondent) || empty($department) || empty($affiliate) || empty($branch)) {
                $this->errors[] = "Fila {$rowNumber}: Datos incompletos";
                $this->skipped++;
                return;
            }

            $correspondentNormalized = $this->normalizeCorrespondent($correspondent);
            if (!$correspondentNormalized) {
                $this->errors[] = "Fila {$rowNumber}: Corresponsal no válido '{$correspondent}'";
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

            PaymentPoint::create([
                'correspondent' => $correspondentNormalized,
                'zone' => ElSalvadorGeography::zoneByDepartment($department),
                'department' => $department,
                'municipality' => $municipality ?: $department,
                'affiliate' => $affiliate,
                'branch' => $branch,
                'address' => $address,
                'latitude' => null,
                'longitude' => null,
                'is_active' => true,
                'created_by' => auth()->id(),
            ]);

            $this->imported++;
        } catch (\Exception $e) {
            $this->errors[] = "Fila {$rowNumber}: {$e->getMessage()}";
            $this->skipped++;
            Log::error('Error processing row', [
                'row' => $rowNumber,
                'error' => $e->getMessage(),
            ]);
        }
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
        return ['N°', 'Corresponsal', 'Municipio', 'Distrito', 'Afiliado', 'Sucursal', 'Dirección'];
    }

    public function getSampleData(): array
    {
        return [
            ['1', 'PuntoXpress', 'AHUACHAPAN CENTRO', 'AHUACHAPAN', 'SUPER SELECTOS', 'SELECTOS AHUACHAPAN', 'CARRETERA AHUACHAPAN DESVIA A SONSONATE'],
            ['2', 'AKI Pago', 'SAN SALVADOR CENTRO', 'SAN SALVADOR', 'FARMACIA SANTA ELENA', 'FARMACIA SANTA ELENA III', '4 CALLE PONIENTE Y 2A AVENIDA NORTE NO. 1-120'],
        ];
    }
}
