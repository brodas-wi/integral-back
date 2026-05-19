<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Authorization handled in controller
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'html_content' => ['nullable', 'string'],
            'css_content' => ['nullable', 'string'],
            'js_content' => ['nullable', 'string'],
            'is_published' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título de la página es obligatorio.',
            'title.max' => 'El título no puede exceder los 255 caracteres.',
        ];
    }
}
