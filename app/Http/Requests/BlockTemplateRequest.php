<?php

namespace App\Http\Requests;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BlockTemplateRequest extends FormRequest
{
    private const FIELD_TYPES = ['text', 'textarea', 'url', 'image', 'video', 'color', 'number', 'select', 'toggle'];

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => [$this->isMethod('POST') ? 'required' : 'sometimes', 'string', 'max:120'],
            'category' => ['required', 'string', 'max:60'],
            'description' => ['nullable', 'string', 'max:500'],
            'mode' => ['required', Rule::in(['static', 'managed'])],
            'html' => ['required', 'string', 'max:200000', $this->markupRule()],
            'css' => ['nullable', 'string', 'max:200000', $this->styleRule()],
            'js' => ['nullable', 'string', 'max:100000', $this->scriptRule()],
            'schema' => ['nullable', 'string', 'max:50000', $this->schemaRule()],
            'icon_svg' => ['nullable', 'string', 'max:20000', $this->iconRule()],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    private function markupRule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            $unsafe = preg_match('/<\s*script\b/i', $value)
                || preg_match('/[\s"\'\/]on[a-z]{3,}\s*=/i', $value)
                || preg_match('/javascript\s*:/i', $value);

            if ($unsafe) {
                $fail('El HTML no puede contener scripts, eventos en línea (onclick, onload...) ni enlaces javascript:. Usa el campo JS.');
            }
        };
    }

    private function styleRule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            $unsafe = preg_match('/<\s*\/?\s*(style|script)/i', $value)
                || preg_match('/@import|expression\s*\(|javascript\s*:|behavior\s*:/i', $value);

            if ($unsafe) {
                $fail('El CSS contiene instrucciones no permitidas (@import, etiquetas, javascript:).');
            }
        };
    }

    private function scriptRule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            if (preg_match('/<\s*\/\s*script|<!--/i', $value)) {
                $fail('El JS no puede contener etiquetas de cierre </script> ni comentarios HTML.');
            }
        };
    }

    private function schemaRule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            $fields = json_decode($value, true);

            if (! is_array($fields) || ! array_is_list($fields) || count($fields) > 40) {
                $fail('El esquema debe ser una lista JSON de hasta 40 campos.');
                return;
            }

            $keys = [];

            foreach ($fields as $field) {
                $key = is_array($field) ? ($field['key'] ?? null) : null;
                $type = is_array($field) ? ($field['type'] ?? null) : null;

                if (! is_string($key) || ! preg_match('/^[a-z][a-z0-9_]{0,39}$/', $key) || $key === 'uid' || in_array($key, $keys, true)) {
                    $fail('Clave de campo inválida o repetida: ' . (is_string($key) ? $key : '(vacía)') . '.');
                    return;
                }

                if (! in_array($type, self::FIELD_TYPES, true)) {
                    $fail("Tipo de campo inválido en \"{$key}\".");
                    return;
                }

                if ($type === 'select' && (! is_array($field['options'] ?? null) || $field['options'] === [])) {
                    $fail("El campo \"{$key}\" de tipo select necesita options.");
                    return;
                }

                $keys[] = $key;
            }
        };
    }

    private function iconRule(): Closure
    {
        return function (string $attribute, mixed $value, Closure $fail): void {
            $unsafe = ! str_starts_with(ltrim($value), '<svg')
                || preg_match('/<\s*(script|foreignObject|iframe|object|embed|style|image|use)\b|\son[a-z]+\s*=|javascript\s*:|href\s*=\s*["\'](?!#)/i', $value);

            if ($unsafe) {
                $fail('El SVG debe iniciar con <svg> y no puede contener scripts, eventos ni referencias externas.');
            }
        };
    }
}