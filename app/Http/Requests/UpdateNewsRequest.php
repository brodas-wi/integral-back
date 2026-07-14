<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNewsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:200',
            'description' => 'nullable|string|max:500',
            'featured_image' => 'nullable|string|max:2048',
            'content' => 'nullable|string',
            'news_category_id' => 'required|exists:news_categories,id',
            'status' => 'required|in:draft,published,scheduled',
            'scheduled_at' => 'required_if:status,scheduled|nullable|date|after:now',
        ];
    }
}
