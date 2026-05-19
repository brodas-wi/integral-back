<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAgencyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request
     */
    public function authorize(): bool
    {
        return $this->user()->can('agencies.create')
            || $this->user()->can('agencies.manage');
    }

    /**
     * Get the validation rules that apply to the request
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'department' => ['required', 'string', 'max:100'],
            'municipality' => ['required', 'string', 'max:100'],
            'address' => ['required', 'string', 'max:500'],
            'schedule' => ['nullable', 'string', 'max:255'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'is_active' => ['nullable', 'boolean'],
            'phones' => ['nullable', 'array', 'max:5'],
            'phones.*' => ['nullable', 'string', 'max:20', 'regex:/^[0-9\-\+\(\)\s]+$/'],
        ];
    }

    /**
     * Get custom validation messages
     */
    public function messages(): array
    {
        return [
            'name.required' => 'El nombre de la agencia es obligatorio.',
            'name.max' => 'El nombre no puede superar 255 caracteres.',
            'department.required' => 'El departamento es obligatorio.',
            'municipality.required' => 'El municipio es obligatorio.',
            'address.required' => 'La dirección es obligatoria.',
            'address.max' => 'La dirección no puede superar 500 caracteres.',
            'latitude.between' => 'La latitud debe estar entre -90 y 90.',
            'longitude.between' => 'La longitud debe estar entre -180 y 180.',
            'phones.max' => 'No puedes agregar más de 5 números telefónicos.',
            'phones.*.regex' => 'El formato del teléfono no es válido.',
        ];
    }

    /**
     * Get custom attribute names
     */
    public function attributes(): array
    {
        return [
            'name' => 'nombre',
            'department' => 'departamento',
            'municipality' => 'municipio',
            'address' => 'dirección',
            'schedule' => 'horario',
            'latitude' => 'latitud',
            'longitude' => 'longitud',
            'phones' => 'teléfonos',
        ];
    }

    /**
     * Prepare the data for validation
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active', false),
        ]);
    }
}
