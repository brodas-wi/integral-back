<?php

namespace App\Services\Forms;

use App\Models\Form;
use App\Models\FormVersion;
use Illuminate\Database\Eloquent\Builder;

class FormSubmissionExporter
{
    private const DELIMITER = ',';

    public function write(Form $form, Builder|\Illuminate\Database\Eloquent\Relations\Relation $query): void
    {
        $columns = $this->columns($form);
        $out = fopen('php://output', 'w');

        fwrite($out, "\xEF\xBB\xBF");
        $this->put($out, array_merge(['Fecha', 'ID', 'Versión'], array_values($columns), ['Enviada desde']));

        $query->with('version:id,version')->lazyByIdDesc(500)->each(function ($submission) use ($out, $columns) {
            $answers = collect($submission->answers)->keyBy('key');

            $row = [
                $submission->created_at->format('Y-m-d H:i:s'),
                $submission->uuid,
                $submission->version?->version,
            ];

            foreach (array_keys($columns) as $key) {
                $row[] = $answers->get($key)['display'] ?? '';
            }

            $row[] = $submission->source_url;

            $this->put($out, $row);
        });

        fclose($out);
    }

    private function columns(Form $form): array
    {
        $columns = [];

        FormVersion::where('form_id', $form->id)
            ->orderBy('version')
            ->get(['fields'])
            ->each(function (FormVersion $version) use (&$columns) {
                foreach ($version->fields as $field) {
                    $columns[$field['key']] = $field['type'] === 'consent'
                        ? ($field['text'] ?? $field['label'])
                        : $field['label'];
                }
            });

        return $columns;
    }

    private function put($handle, array $row): void
    {
        fputcsv($handle, array_map(fn ($value) => $this->safe($value), $row), self::DELIMITER, '"', '');
    }

    private function safe(mixed $value): string
    {
        $text = (string) ($value ?? '');

        if ($text !== '' && preg_match('/^[=+\-@\t\r]/', $text) && !preg_match('/^[+-]?\d[\d.,]*$/', $text)) {
            return "'" . $text;
        }

        return $text;
    }
}