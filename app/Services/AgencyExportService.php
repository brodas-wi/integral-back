<?php

namespace App\Services;

use App\Models\Agency;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class AgencyExportService
{
    /**
     * Export agencies to Excel file
     */
    public function export(?array $filters = null): string
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $headers = ['N°', 'Nombre', 'Departamento', 'Municipio', 'Dirección', 'Horario', 'Teléfonos'];

        $column = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($column . '1', $header);
            $column++;
        }

        $headerStyle = [
            'font' => [
                'bold' => true,
                'color' => ['rgb' => 'FFFFFF'],
                'size' => 12,
            ],
            'fill' => [
                'fillType' => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'f0872a'],
            ],
            'alignment' => [
                'horizontal' => Alignment::HORIZONTAL_CENTER,
                'vertical' => Alignment::VERTICAL_CENTER,
            ],
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => '000000'],
                ],
            ],
        ];

        $sheet->getStyle('A1:G1')->applyFromArray($headerStyle);

        foreach (range('A', 'G') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $query = Agency::with('phones')->orderBy('department')->orderBy('municipality')->orderBy('name');

        if ($filters) {
            if (!empty($filters['zone'])) {
                $query->where('zone', $filters['zone']);
            }
            if (!empty($filters['department'])) {
                $query->where('department', $filters['department']);
            }
            if (!empty($filters['municipality'])) {
                $query->where('municipality', $filters['municipality']);
            }
            if (isset($filters['status'])) {
                $isActive = $filters['status'] === 'active';
                $query->where('is_active', $isActive);
            }
        }

        $agencies = $query->get();

        $row = 2;
        $counter = 1;
        foreach ($agencies as $agency) {
            $phones = $agency->phones->pluck('phone')->implode(', ');

            $sheet->setCellValue('A' . $row, $counter);
            $sheet->setCellValue('B' . $row, $agency->name);
            $sheet->setCellValue('C' . $row, $agency->department);
            $sheet->setCellValue('D' . $row, $agency->municipality);
            $sheet->setCellValue('E' . $row, $agency->address);
            $sheet->setCellValue('F' . $row, $agency->schedule ?? 'No especificado');
            $sheet->setCellValue('G' . $row, $phones ?: 'Sin teléfonos');

            if ($row % 2 == 0) {
                $sheet->getStyle('A' . $row . ':G' . $row)->applyFromArray([
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'F5F5F5'],
                    ],
                ]);
            }

            $row++;
            $counter++;
        }

        $dataRange = 'A2:G' . ($row - 1);
        $sheet->getStyle($dataRange)->applyFromArray([
            'borders' => [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_THIN,
                    'color' => ['rgb' => 'CCCCCC'],
                ],
            ],
        ]);

        $fileName = 'agencias_' . date('Y-m-d_His') . '.xlsx';
        $tempPath = storage_path('app/temp/' . $fileName);

        if (!file_exists(dirname($tempPath))) {
            mkdir(dirname($tempPath), 0755, true);
        }

        $writer = new Xlsx($spreadsheet);
        $writer->save($tempPath);

        return $tempPath;
    }
}
