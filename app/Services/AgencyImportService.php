<?php

namespace App\Services;

use App\Data\ElSalvadorGeography;
use App\Models\Agency;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpSpreadsheet\IOFactory;

class AgencyImportService
{
    protected array $errors = [];
    protected array $duplicates = [];
    protected int $imported = 0;
    protected int $skipped = 0;

    /**
     * Import agencies from uploaded file
     */
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
            Log::error('Agency import error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return [
                'success' => false,
                'message' => 'Error al importar: ' . $e->getMessage(),
            ];
        }
    }

    /**
     * Check if row is empty
     */
    protected function isEmptyRow(array $row): bool
    {
        return empty(array_filter($row, fn($cell) => !is_null($cell) && trim($cell) !== ''));
    }

    /**
     * Process a single row from the spreadsheet
     */
    protected function processRow(array $row, int $rowNumber): void
    {
        try {
            $name = trim($row[1] ?? '');
            $department = trim($row[2] ?? '');
            $municipality = trim($row[3] ?? '');
            $address = trim($row[4] ?? '');
            $schedule = trim($row[5] ?? '');
            $phonesString = trim($row[6] ?? '');

            if (empty($name) || empty($department) || empty($municipality) || empty($address)) {
                $this->errors[] = "Fila {$rowNumber}: Datos incompletos (nombre, departamento, municipio o dirección faltantes)";
                $this->skipped++;
                return;
            }

            $existing = Agency::where('name', $name)
                ->where('department', $department)
                ->where('municipality', $municipality)
                ->first();

            if ($existing) {
                $this->duplicates[] = "Fila {$rowNumber}: Duplicado - {$name} en {$municipality}, {$department}";
                $this->skipped++;
                return;
            }

            $agency = Agency::create([
                'name' => $name,
                'department' => $department,
                'municipality' => $municipality,
                'zone' => ElSalvadorGeography::zoneByDepartment($department),
                'address' => $address,
                'schedule' => !empty($schedule) ? $schedule : null,
                'latitude' => null,
                'longitude' => null,
                'is_active' => true,
                'created_by' => auth()->id(),
            ]);

            if (!empty($phonesString)) {
                $phones = array_map('trim', explode(',', $phonesString));
                foreach ($phones as $phone) {
                    if (!empty($phone)) {
                        $agency->phones()->create([
                            'phone' => $phone,
                        ]);
                    }
                }
            }

            $this->imported++;
        } catch (\Exception $e) {
            $this->errors[] = "Fila {$rowNumber}: {$e->getMessage()}";
            $this->skipped++;
            Log::error('Error processing agency row', [
                'row' => $rowNumber,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Get expected column headers
     */
    public function getExpectedHeaders(): array
    {
        return ['N°', 'Nombre', 'Departamento', 'Municipio', 'Dirección', 'Horario', 'Teléfonos'];
    }

    /**
     * Generate sample data for template
     */
    public function getSampleData(): array
    {
        return [
            ['1', 'Agencia Centro', 'San Salvador', 'San Salvador', 'Calle Principal #123', 'Lunes - Viernes 8:30 a.m. - 4:30 p.m.', '2250-6000, 2250-6019'],
            ['2', 'Agencia Oriente', 'San Miguel', 'San Miguel', 'Avenida Roosevelt Norte #456', 'Lunes - Viernes 8:30 a.m. - 4:30 p.m. Sábado 8:30 a.m. - 12:00 m.', '2660-4117, 2660-3604'],
        ];
    }
}
