<?php

namespace App\Http\Requests;

use App\Models\Page;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePageTitleSlugRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $page = $this->route('page');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug'  => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('pages', 'slug')->ignore($page->id),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'slug.regex'  => 'El slug solo puede contener letras minúsculas, números y guiones (sin espacios ni caracteres especiales).',
            'slug.unique' => 'Este slug ya está en uso por otra página.',
        ];
    }
}
