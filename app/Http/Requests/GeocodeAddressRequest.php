<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GeocodeAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request
     */
    public function authorize(): bool
    {
        return $this->user()->can('agencies.create')
            || $this->user()->can('agencies.edit')
            || $this->user()->can('agencies.manage');
    }

    /**
     * Get the validation rules that apply to the request
     */
    public function rules(): array
    {
        return [
            'address' => ['required', 'string', 'max:500'],
            'department' => ['required', 'string', 'max:100'],
            'municipality' => ['required', 'string', 'max:100'],
        ];
    }

    /**
     * Get custom validation messages
     */
    public function messages(): array
    {
        return [
            'address.required' => 'La dirección es obligatoria para la geocodificación.',
            'department.required' => 'El departamento es obligatorio.',
            'municipality.required' => 'El municipio es obligatorio.',
        ];
    }
}
