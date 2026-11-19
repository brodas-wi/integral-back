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
        @set_time_limit(0);

        $base = $query->toBase();
        $out = fopen('php://output', 'w');

        fwrite($out, "\xEF\xBB\xBF");
        $this->flushOutput();

        $columns = $this->usedColumns($form, $base);
        $withCorrelative = (clone $base)->whereNotNull('correlative')->exists();
        $versions = FormVersion::where('form_id', $form->id)->pluck('version', 'id');

        $this->put($out, array_merge(
            ['Fecha'],
            $withCorrelative ? ['Correlativo'] : [],
            ['ID', 'Versión'],
            array_values($columns),
            ['Enviada desde'],
        ));

        $keys = array_keys($columns);
        $written = 0;

        (clone $base)
            ->select(['id', 'uuid', 'correlative', 'form_version_id', 'answers', 'source_url', 'created_at'])
            ->lazyByIdDesc(500)
            ->each(function ($submission) use ($out, $keys, $withCorrelative, $versions, &$written) {
                $answers = collect($this->decode($submission->answers))->keyBy('key');

                $row = array_merge(
                    [$submission->created_at],
                    $withCorrelative ? [$submission->correlative] : [],
                    [$submission->uuid, $versions[$submission->form_version_id] ?? ''],
                );

                foreach ($keys as $key) {
                    $row[] = $answers->get($key)['display'] ?? '';
                }

                $row[] = $submission->source_url;

                $this->put($out, $row);

                if (++$written % 500 === 0) {
                    $this->flushOutput();
                }
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
                    if ($field['type'] === 'note') {
                        continue;
                    }

                    $columns[$field['key']] = $field['type'] === 'consent'
                        ? ($field['text'] ?? $field['label'])
                        : $field['label'];
                }
            });

        return $columns;
    }

    private function usedColumns(Form $form, $base): array
    {
        $all = $this->columns($form);
        $used = [];
        $hasRows = false;

        (clone $base)->select(['id', 'answers'])->lazyByIdDesc(1000)->each(function ($submission) use (&$used, &$hasRows) {
            $hasRows = true;

            foreach ($this->decode($submission->answers) as $answer) {
                if (isset($answer['key']) && ($answer['display'] ?? '') !== '') {
                    $used[$answer['key']] = true;
                }
            }
        });

        if (!$hasRows) {
            $current = collect($form->currentVersion?->fields ?? [])->pluck('key')->all();

            return array_filter($all, fn ($label, $key) => in_array($key, $current, true), ARRAY_FILTER_USE_BOTH);
        }

        return array_filter($all, fn ($label, $key) => isset($used[$key]), ARRAY_FILTER_USE_BOTH);
    }

    private function decode(mixed $json): array
    {
        $data = is_string($json) ? json_decode($json, true) : $json;

        return is_array($data) ? $data : [];
    }

    private function flushOutput(): void
    {
        if (ob_get_level() > 0) {
            ob_flush();
        }

        flush();
    }

    private function put($handle, array $row): void
    {
        fputcsv($handle, array_map(fn($value) => $this->safe($value), $row), self::DELIMITER, '"', '');
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