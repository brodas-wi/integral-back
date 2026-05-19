<?php

namespace App\Services;

use App\Models\PaymentPoint;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class PaymentPointExportService
{
    public function export(?array $filters = null): string
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $headers = ['N°', 'Corresponsal', 'Municipio', 'Distrito', 'Afiliado', 'Sucursal', 'Dirección'];

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

        $query = PaymentPoint::query()->orderBy('correspondent')->orderBy('affiliate')->orderBy('branch');

        if ($filters) {
            if (!empty($filters['correspondent'])) {
                $query->where('correspondent', $filters['correspondent']);
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

        $paymentPoints = $query->get();

        $row = 2;
        $counter = 1;
        foreach ($paymentPoints as $point) {
            $sheet->setCellValue('A' . $row, $counter);
            $sheet->setCellValue('B' . $row, $point->correspondent);
            $sheet->setCellValue('C' . $row, $point->municipality);
            $sheet->setCellValue('D' . $row, $point->department);
            $sheet->setCellValue('E' . $row, $point->affiliate);
            $sheet->setCellValue('F' . $row, $point->branch);
            $sheet->setCellValue('G' . $row, $point->address);

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

        $fileName = 'puntos_de_pago_' . date('Y-m-d_His') . '.xlsx';
        $tempPath = storage_path('app/temp/' . $fileName);

        if (!file_exists(dirname($tempPath))) {
            mkdir(dirname($tempPath), 0755, true);
        }

        $writer = new Xlsx($spreadsheet);
        $writer->save($tempPath);

        return $tempPath;
    }
}
