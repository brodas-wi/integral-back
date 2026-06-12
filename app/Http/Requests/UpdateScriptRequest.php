<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateScriptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'name'              => ['required', 'string', 'max:255'],
            'description'       => ['nullable', 'string', 'max:1000'],
            'scope'             => ['required', 'in:global,per_page'],
            'page_slugs'        => ['nullable', 'array'],
            'page_slugs.*'      => ['string', 'exists:pages,slug'],
            'js_content'        => ['required', 'string'],
            'css_content'       => ['nullable', 'string'],
            'submit_for_review' => ['nullable', 'boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'       => 'El nombre del script es obligatorio.',
            'name.max'            => 'El nombre no puede superar los 255 caracteres.',
            'scope.required'      => 'El alcance del script es obligatorio.',
            'scope.in'            => 'El alcance debe ser global o por página.',
            'page_slugs.array'    => 'Las páginas deben ser un arreglo válido.',
            'page_slugs.*.exists' => 'Una o más páginas seleccionadas no existen.',
            'js_content.required' => 'El contenido JavaScript es obligatorio.',
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            // Require page_slugs when scope is per_page
            if ($this->scope === 'per_page' && empty($this->page_slugs)) {
                $validator->errors()->add('page_slugs', 'Debes seleccionar al menos una página cuando el alcance es "Por página".');
            }

            // Require js_content (always mandatory)
            if (empty(trim($this->js_content ?? ''))) {
                $validator->errors()->add('js_content', 'El contenido JavaScript es obligatorio.');
            }
        });
    }
}
