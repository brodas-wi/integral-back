<?php

namespace App\Http\Requests;

use App\Models\PaymentPoint;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePaymentPointRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('payment_points.edit')
            || $this->user()->can('payment_points.manage');
    }

    public function rules(): array
    {
        return [
            'correspondent' => ['required', Rule::in(array_keys(PaymentPoint::CORRESPONDENTS))],
            'department' => ['required', 'string', 'max:100'],
            'municipality' => ['required', 'string', 'max:100'],
            'affiliate' => ['required', 'string', 'max:255'],
            'branch' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:500'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'correspondent.required' => 'El corresponsal es obligatorio.',
            'correspondent.in' => 'El corresponsal seleccionado no es válido.',
            'department.required' => 'El distrito es obligatorio.',
            'municipality.required' => 'El municipio es obligatorio.',
            'affiliate.required' => 'El afiliado es obligatorio.',
            'branch.required' => 'La sucursal es obligatoria.',
            'address.required' => 'La dirección es obligatoria.',
            'address.max' => 'La dirección no puede superar 500 caracteres.',
            'latitude.between' => 'La latitud debe estar entre -90 y 90.',
            'longitude.between' => 'La longitud debe estar entre -180 y 180.',
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active', false),
        ]);
    }

    public function validated($key = null, $default = null)
    {
        $validated = parent::validated($key, $default);
        $validated['updated_by'] = $this->user()->id;
        return $validated;
    }
}
