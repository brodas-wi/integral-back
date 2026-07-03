<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExtraordinaryAssetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'              => ['nullable', 'required_without:short_description', 'string', 'max:255'],
            'short_description' => ['nullable', 'required_without:name', 'string', 'max:500'],
            'image_url'         => ['required', 'string', 'max:2048'],
            'link_url'          => ['required', 'string', 'max:2048'],
            'link_is_external'  => ['sometimes', 'boolean'],
            'category_name'     => ['required', 'string', 'max:255'],
            'is_active'         => ['sometimes', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required_without'              => 'Debes indicar al menos el nombre o la descripción.',
            'short_description.required_without'  => 'Debes indicar al menos el nombre o la descripción.',
            'image_url.required'     => 'Debes seleccionar una imagen.',
            'link_url.required'      => 'El enlace es obligatorio.',
            'category_name.required' => 'La categoría es obligatoria.',
        ];
    }
}
