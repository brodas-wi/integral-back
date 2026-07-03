<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExtraordinaryAssetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'              => ['required', 'string', 'max:255'],
            'short_description' => ['nullable', 'string', 'max:500'],
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
            'name.required'          => 'El nombre del activo es obligatorio.',
            'image_url.required'     => 'Debes seleccionar una imagen.',
            'link_url.required'      => 'El enlace es obligatorio.',
            'category_name.required' => 'La categoría es obligatoria.',
        ];
    }
}
