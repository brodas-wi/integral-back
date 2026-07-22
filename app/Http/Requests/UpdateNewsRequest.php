<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateNewsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('news.edit') || $this->user()?->can('news.manage');
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'featured_image' => ['nullable', 'string', 'max:2048'],
            'news_category_id' => ['required', 'exists:news_categories,id'],
            'status' => ['required', 'in:draft,published,scheduled'],
            'scheduled_at' => ['required_if:status,scheduled', 'nullable', 'date'],
            'content' => ['nullable', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio.',
            'news_category_id.required' => 'Debe seleccionar una categoría.',
            'news_category_id.exists' => 'La categoría seleccionada no es válida.',
            'status.required' => 'Debe seleccionar un estado.',
            'status.in' => 'El estado seleccionado no es válido.',
            'scheduled_at.required_if' => 'Debe indicar la fecha de publicación programada.',
        ];
    }

    protected function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'errors' => $validator->errors(),
        ], 422));
    }
}
