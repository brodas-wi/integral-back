<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:150'],
            'is_active' => ['nullable', 'boolean'],
            'base_version' => ['nullable', 'integer'],
            'title' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'submit_label' => ['nullable', 'string'],
            'fields' => ['required', 'array'],
            'settings' => ['nullable', 'array'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.max' => 'El nombre interno no puede superar 150 caracteres.',
            'fields.required' => 'Agrega al menos un campo.',
            'fields.array' => 'Los campos no tienen un formato válido.',
            'settings.array' => 'La configuración no tiene un formato válido.',
        ];
    }
}