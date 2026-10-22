<?php

namespace App\Services\Forms;

use App\Models\Form;
use App\Models\FormVersion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class FormService
{
    public function __construct(private FormSchemaNormalizer $normalizer) {}

    public function create(array $payload): Form
    {
        $content = $this->normalizer->normalize($payload);

        return DB::transaction(function () use ($payload, $content) {
            $form = Form::create([
                'name' => $this->name($payload, $content),
                'is_active' => (bool) ($payload['is_active'] ?? true),
                'created_by' => auth()->id(),
                'updated_by' => auth()->id(),
            ]);

            $this->publishVersion($form, $content);

            return $form->refresh();
        });
    }

    public function update(Form $form, array $payload, ?int $baseVersion = null): Form
    {
        return DB::transaction(function () use ($form, $payload, $baseVersion) {
            $form = Form::query()->whereKey($form->id)->lockForUpdate()->firstOrFail();
            $currentVersion = $form->currentVersion?->version;

            if ($baseVersion !== null && $currentVersion !== null && $currentVersion !== $baseVersion) {
                abort(409, "Este formulario cambió mientras lo editabas (ahora está en la versión {$currentVersion}). Recarga la página para ver los cambios más recientes.");
            }
            $content = $this->normalizer->normalize($payload, $this->keyHistory($form));

            $form->fill([
                'name' => $this->name($payload, $content),
                'is_active' => (bool) ($payload['is_active'] ?? $form->is_active),
                'updated_by' => auth()->id(),
            ])->save();

            $this->publishVersion($form, $content);

            return $form->refresh();
        });
    }

    public function setActive(Form $form, bool $active): Form
    {
        $form->update(['is_active' => $active, 'updated_by' => auth()->id()]);

        return $form;
    }

    private function publishVersion(Form $form, array $content): FormVersion
    {
        $hash = hash('sha256', json_encode($content, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR));
        $current = $form->currentVersion;

        if ($current && $current->content_hash === $hash) {
            return $current;
        }

        $version = $form->versions()->create([
            'version' => (int) $form->versions()->max('version') + 1,
            'title' => $content['title'],
            'description' => $content['description'],
            'submit_label' => $content['submit_label'],
            'fields' => $content['fields'],
            'settings' => $content['settings'],
            'content_hash' => $hash,
            'created_by' => auth()->id(),
        ]);

        $form->forceFill(['current_version_id' => $version->id])->save();

        return $version;
    }

    private function keyHistory(Form $form): array
    {
        $history = [];

        foreach ($form->versions()->orderBy('version')->get() as $version) {
            foreach ($version->fields as $field) {
                $history[$field['key']] = $field['type'];
            }
        }

        return $history;
    }

    private function name(array $payload, array $content): string
    {
        $name = trim((string) ($payload['name'] ?? ''));

        return Str::limit($name !== '' ? $name : $content['title'], 150, '');
    }
}
