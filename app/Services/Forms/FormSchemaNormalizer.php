<?php

namespace App\Services\Forms;

use App\Enums\FormFieldType;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class FormSchemaNormalizer
{
    public const MAX_FIELDS = 40;
    public const MAX_OPTIONS = 50;
    public const MAX_RECIPIENTS = 10;
    public const RESERVED_VARIABLES = ['form_title', 'submission_id', 'date'];

    private array $errors = [];

    public function normalize(array $payload, array $history = []): array
    {
        $this->errors = [];

        $title = $this->string($payload['title'] ?? null, 'title', 200, true, 'El título');
        $description = $this->string($payload['description'] ?? null, 'description', 1000, false, 'La descripción');
        $submitLabel = $this->string($payload['submit_label'] ?? null, 'submit_label', 80, true, 'El texto del botón');
        $fields = $this->normalizeFields($payload['fields'] ?? null, $history);
        $settings = $this->normalizeSettings($payload['settings'] ?? [], $fields);

        if ($this->errors !== []) {
            throw ValidationException::withMessages($this->errors);
        }

        return [
            'title' => $title,
            'description' => $description !== '' ? $description : null,
            'submit_label' => $submitLabel,
            'fields' => $fields,
            'settings' => $settings,
        ];
    }

    private function normalizeFields(mixed $input, array $history): array
    {
        if (!is_array($input) || $input === []) {
            $this->fail('fields', 'Agrega al menos un campo.');
            return [];
        }

        if (count($input) > self::MAX_FIELDS) {
            $this->fail('fields', 'Un formulario admite como máximo ' . self::MAX_FIELDS . ' campos.');
            return [];
        }

        $fields = [];
        $used = [];

        foreach (array_values($input) as $index => $raw) {
            $path = "fields.{$index}";

            if (!is_array($raw)) {
                $this->fail($path, 'El campo no es válido.');
                continue;
            }

            $type = FormFieldType::tryFrom((string) ($raw['type'] ?? ''));

            if (!$type) {
                $this->fail("{$path}.type", 'El tipo de campo no es válido.');
                continue;
            }

            $field = $this->baseField($raw, $type, $path, $history, $used);
            $field += $this->typeSettings($raw, $type, $path);

            $used[] = $field['key'];
            $fields[] = $field;
        }

        return $fields;
    }

    private function baseField(array $raw, FormFieldType $type, string $path, array $history, array $used): array
    {
        $isConsent = $type === FormFieldType::Consent;
        $label = $this->string($raw['label'] ?? null, "{$path}.label", 200, !$isConsent, 'La etiqueta');

        if ($isConsent && $label === '') {
            $label = 'Consentimiento';
        }

        $width = ($raw['width'] ?? 'full') === 'half' ? 'half' : 'full';

        return [
            'key' => $this->resolveKey($raw['key'] ?? null, $type, $label, $history, $used, "{$path}.key"),
            'type' => $type->value,
            'label' => $label,
            'required' => $isConsent ? true : filter_var($raw['required'] ?? false, FILTER_VALIDATE_BOOLEAN),
            'width' => $type->forcesFullWidth() ? 'full' : $width,
            'placeholder' => $this->nullable($raw['placeholder'] ?? null, "{$path}.placeholder", 150, 'El texto de ejemplo'),
            'help' => $this->nullable($raw['help'] ?? null, "{$path}.help", 200, 'El texto de ayuda'),
        ];
    }

    private function resolveKey(mixed $requested, FormFieldType $type, string $label, array $history, array $used, string $path): string
    {
        $requested = is_string($requested) ? trim($requested) : '';

        if ($requested !== '') {
            if (!preg_match('/^[a-z][a-z0-9_]{1,39}$/', $requested)) {
                $this->fail($path, "La clave «{$requested}» debe empezar con una letra minúscula y usar solo minúsculas, números y guion bajo (2 a 40 caracteres).");
            } elseif (in_array($requested, self::RESERVED_VARIABLES, true)) {
                $this->fail($path, "La clave «{$requested}» está reservada.");
            } elseif (in_array($requested, $used, true)) {
                $this->fail($path, "La clave «{$requested}» está repetida en este formulario.");
            } elseif (isset($history[$requested]) && $history[$requested] !== $type->value) {
                $this->fail($path, "La clave «{$requested}» ya se usó antes con otro tipo de campo. Elige otra para no mezclar respuestas.");
            }

            return $requested;
        }

        $base = rtrim(Str::limit(Str::slug($label, '_'), 40, ''), '_');

        if ($base === '') {
            $base = $type->value;
        }

        do {
            $key = $base . '_' . Str::lower(Str::random(4));
        } while (isset($history[$key]) || in_array($key, $used, true));

        return $key;
    }

    private function typeSettings(array $raw, FormFieldType $type, string $path): array
    {
        return match ($type) {
            FormFieldType::Text => [
                'max_length' => $this->intOption($raw['max_length'] ?? null, 255, 1, 500, "{$path}.max_length", 'El máximo de caracteres'),
            ],
            FormFieldType::ProperName => [
                'max_length' => $this->intOption($raw['max_length'] ?? null, 150, 1, 300, "{$path}.max_length", 'El máximo de caracteres'),
            ],
            FormFieldType::Textarea => [
                'max_length' => $this->intOption($raw['max_length'] ?? null, 1000, 1, 5000, "{$path}.max_length", 'El máximo de caracteres'),
            ],
            FormFieldType::Dui => [
                'verify_check_digit' => filter_var($raw['verify_check_digit'] ?? false, FILTER_VALIDATE_BOOLEAN),
            ],
            FormFieldType::Integer => $this->rangeSettings($raw, $path, false),
            FormFieldType::Decimal => [
                'decimals' => $this->intOption($raw['decimals'] ?? null, 2, 1, 6, "{$path}.decimals", 'Los decimales'),
            ] + $this->rangeSettings($raw, $path, true),
            FormFieldType::Select, FormFieldType::CheckboxGroup => [
                'options' => $this->normalizeOptions($raw['options'] ?? null, $path),
            ],
            FormFieldType::Consent => [
                'text' => $this->string($raw['text'] ?? null, "{$path}.text", 1000, true, 'El texto de consentimiento'),
            ],
            FormFieldType::Location => [
                'department_label' => $this->string($raw['department_label'] ?? null, "{$path}.department_label", 60, false, 'La etiqueta de departamento') ?: 'Departamento',
                'municipality_label' => $this->string($raw['municipality_label'] ?? null, "{$path}.municipality_label", 60, false, 'La etiqueta de municipio') ?: 'Municipio',
            ],
            default => [],
        };
    }

    private function rangeSettings(array $raw, string $path, bool $decimal): array
    {
        $min = $this->numberOption($raw['min'] ?? null, "{$path}.min", 'El mínimo', $decimal);
        $max = $this->numberOption($raw['max'] ?? null, "{$path}.max", 'El máximo', $decimal);

        if ($min !== null && $max !== null && $min > $max) {
            $this->fail("{$path}.max", 'El máximo no puede ser menor que el mínimo.');
        }

        return ['min' => $min, 'max' => $max];
    }

    private function normalizeOptions(mixed $input, string $path): array
    {
        if (!is_array($input) || $input === []) {
            $this->fail("{$path}.options", 'Agrega al menos una opción.');
            return [];
        }

        if (count($input) > self::MAX_OPTIONS) {
            $this->fail("{$path}.options", 'Se admiten como máximo ' . self::MAX_OPTIONS . ' opciones.');
            return [];
        }

        $options = [];
        $values = [];

        foreach (array_values($input) as $index => $raw) {
            $optionPath = "{$path}.options.{$index}";

            if (!is_array($raw)) {
                $this->fail($optionPath, 'La opción no es válida.');
                continue;
            }

            $label = $this->string($raw['label'] ?? null, "{$optionPath}.label", 150, true, 'El texto de la opción');
            $value = trim((string) ($raw['value'] ?? ''));

            if (!preg_match('/^[a-z0-9_-]{1,60}$/', $value) || in_array($value, $values, true)) {
                $base = substr(Str::slug($label, '_'), 0, 50) ?: 'opcion';
                $value = $base;
                $suffix = 2;

                while (in_array($value, $values, true)) {
                    $value = $base . '_' . $suffix++;
                }
            }

            $values[] = $value;
            $options[] = ['value' => $value, 'label' => $label];
        }

        return $options;
    }

    private function normalizeSettings(mixed $input, array $fields): array
    {
        $input = is_array($input) ? $input : [];
        $thanks = is_array($input['thanks'] ?? null) ? $input['thanks'] : [];
        $emails = is_array($input['emails'] ?? null) ? $input['emails'] : [];

        $allowedVariables = array_merge(self::RESERVED_VARIABLES, array_column($fields, 'key'));
        $emailKeys = array_column(array_filter($fields, fn($f) => $f['type'] === FormFieldType::Email->value), 'key');

        return [
            'thanks' => [
                'title' => $this->string($thanks['title'] ?? null, 'settings.thanks.title', 120, false, 'El título de agradecimiento') ?: '¡Gracias!',
                'subtitle' => $this->string($thanks['subtitle'] ?? null, 'settings.thanks.subtitle', 300, false, 'El subtítulo de agradecimiento') ?: 'Hemos recibido tu registro. Te contactaremos pronto.',
                'seconds' => $this->intOption($thanks['seconds'] ?? null, 6, 1, 60, 'settings.thanks.seconds', 'Los segundos en pantalla'),
                'redirect_url' => $this->redirectUrl($thanks['redirect_url'] ?? null),
            ],
            'emails' => [
                'notify' => $this->normalizeNotify($emails['notify'] ?? [], $allowedVariables),
                'confirmation' => $this->normalizeConfirmation($emails['confirmation'] ?? [], $emailKeys, $allowedVariables),
            ],
        ];
    }

    private function normalizeNotify(mixed $input, array $allowedVariables): array
    {
        $input = is_array($input) ? $input : [];
        $enabled = filter_var($input['enabled'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $recipients = [];

        foreach ((array) ($input['recipients'] ?? []) as $index => $address) {
            $address = Str::lower(trim((string) $address));

            if ($address === '') {
                continue;
            }

            if (!filter_var($address, FILTER_VALIDATE_EMAIL) || mb_strlen($address) > 190) {
                $this->fail("settings.emails.notify.recipients.{$index}", "«{$address}» no es un correo válido.");
                continue;
            }

            $recipients[$address] = $address;
        }

        $recipients = array_values($recipients);

        if (count($recipients) > self::MAX_RECIPIENTS) {
            $this->fail('settings.emails.notify.recipients', 'Se admiten como máximo ' . self::MAX_RECIPIENTS . ' destinatarios.');
        }

        if ($enabled && $recipients === []) {
            $this->fail('settings.emails.notify.recipients', 'Agrega al menos un destinatario para el aviso interno.');
        }

        $subject = $this->string($input['subject'] ?? null, 'settings.emails.notify.subject', 200, false, 'El asunto')
            ?: 'Nueva solicitud: {{form_title}}';

        $this->checkVariables($subject, $allowedVariables, 'settings.emails.notify.subject');

        return [
            'enabled' => $enabled,
            'recipients' => $recipients,
            'subject' => $subject,
        ];
    }

    private function normalizeConfirmation(mixed $input, array $emailKeys, array $allowedVariables): array
    {
        $input = is_array($input) ? $input : [];
        $enabled = filter_var($input['enabled'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $fieldKey = trim((string) ($input['field_key'] ?? ''));

        if ($fieldKey === '' && count($emailKeys) === 1) {
            $fieldKey = $emailKeys[0];
        }

        if ($enabled) {
            if ($emailKeys === []) {
                $this->fail('settings.emails.confirmation.field_key', 'Agrega un campo de correo para enviar la confirmación al usuario.');
            } elseif (!in_array($fieldKey, $emailKeys, true)) {
                $this->fail('settings.emails.confirmation.field_key', 'Elige el campo de correo del usuario.');
            }
        }

        $subject = $this->string($input['subject'] ?? null, 'settings.emails.confirmation.subject', 200, false, 'El asunto')
            ?: 'Hemos recibido tu solicitud';
        $body = $this->string($input['body'] ?? null, 'settings.emails.confirmation.body', 5000, false, 'El mensaje')
            ?: 'Gracias por escribirnos. Hemos recibido tu información y nos pondremos en contacto contigo pronto.';

        $this->checkVariables($subject, $allowedVariables, 'settings.emails.confirmation.subject');
        $this->checkVariables($body, $allowedVariables, 'settings.emails.confirmation.body');

        return [
            'enabled' => $enabled,
            'field_key' => in_array($fieldKey, $emailKeys, true) ? $fieldKey : null,
            'subject' => $subject,
            'body' => $body,
        ];
    }

    private function checkVariables(string $template, array $allowed, string $path): void
    {
        preg_match_all('/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/', $template, $matches);

        foreach (array_unique($matches[1]) as $name) {
            if (!in_array($name, $allowed, true)) {
                $this->fail($path, 'La variable {{' . $name . '}} no existe en este formulario.');
            }
        }
    }

    private function redirectUrl(mixed $value): ?string
    {
        $value = is_scalar($value) ? trim((string) $value) : '';

        if ($value === '') {
            return null;
        }

        $isRelative = str_starts_with($value, '/') && !str_starts_with($value, '//');
        $isAbsolute = filter_var($value, FILTER_VALIDATE_URL) && preg_match('/^https?:\/\//i', $value);

        if (mb_strlen($value) > 2048 || (!$isRelative && !$isAbsolute)) {
            $this->fail('settings.thanks.redirect_url', 'La URL de redirección debe empezar con / o con http(s)://.');
            return null;
        }

        return $value;
    }

    private function string(mixed $value, string $path, int $max, bool $required, string $name): string
    {
        $value = is_scalar($value) ? trim((string) $value) : '';
        $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $value) ?? '';

        if ($required && $value === '') {
            $this->fail($path, "{$name} es obligatorio.");
        }

        if (mb_strlen($value) > $max) {
            $this->fail($path, "{$name} no puede superar {$max} caracteres.");
        }

        return $value;
    }

    private function nullable(mixed $value, string $path, int $max, string $name): ?string
    {
        $value = $this->string($value, $path, $max, false, $name);

        return $value === '' ? null : $value;
    }

    private function intOption(mixed $value, int $default, int $min, int $max, string $path, string $name): int
    {
        if ($value === null || $value === '') {
            return $default;
        }

        if (filter_var($value, FILTER_VALIDATE_INT) === false) {
            $this->fail($path, "{$name} debe ser un número entero.");
            return $default;
        }

        $int = (int) $value;

        if ($int < $min || $int > $max) {
            $this->fail($path, "{$name} debe estar entre {$min} y {$max}.");
            return $default;
        }

        return $int;
    }

    private function numberOption(mixed $value, string $path, string $name, bool $decimal): int|float|null
    {
        if ($value === null || $value === '') {
            return null;
        }

        if ($decimal) {
            if (!is_numeric($value) || abs((float) $value) > 1e12) {
                $this->fail($path, "{$name} debe ser un número válido.");
                return null;
            }

            return (float) $value;
        }

        if (filter_var($value, FILTER_VALIDATE_INT) === false || abs((int) $value) > 2147483647) {
            $this->fail($path, "{$name} debe ser un número entero.");
            return null;
        }

        return (int) $value;
    }

    private function fail(string $path, string $message): void
    {
        $this->errors[$path][] = $message;
    }
}
