<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:255'],
            'html_content' => ['nullable', 'string'],
            'css_content' => ['nullable', 'string'],
            'js_content' => ['nullable', 'string'],
            'is_published' => ['boolean'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.max' => 'El título no puede exceder los 255 caracteres.',
        ];
    }
}
