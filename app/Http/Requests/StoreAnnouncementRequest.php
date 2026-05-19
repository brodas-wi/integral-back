<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnnouncementRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request
     */
    public function authorize(): bool
    {
        return $this->user()->can('announcements.create')
            || $this->user()->can('announcements.manage');
    }

    /**
     * Get the validation rules that apply to the request
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'media_id' => ['required', 'exists:media,id'],
            'cta_text' => ['nullable', 'string', 'max:100'],
            'cta_url' => ['nullable', 'url', 'max:500'],
            'cta_new_tab' => ['nullable', 'boolean'],
            'display_type' => ['required', 'in:global,homepage,specific_pages'],
            'display_mode' => ['required', 'in:full,image_only'],
            'page_slugs' => ['nullable', 'array'],
            'page_slugs.*' => ['string', 'exists:pages,slug'],
            'is_active' => ['nullable', 'boolean'],
            'schedule_type' => ['required', 'in:manual,scheduled'],
            'starts_at' => ['nullable', 'date', 'required_if:schedule_type,scheduled'],
            'ends_at' => ['nullable', 'date', 'after:starts_at'],
        ];
    }

    /**
     * Get custom validation messages
     */
    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio (uso interno)',
            'media_id.required' => 'Debes seleccionar una imagen',
            'media_id.exists' => 'La imagen seleccionada no existe',
            'display_type.required' => 'El tipo de visualización es obligatorio',
            'display_mode.required' => 'El modo de visualización es obligatorio',
            'schedule_type.required' => 'Debes seleccionar el tipo de programación',
            'starts_at.required_if' => 'La fecha de inicio es obligatoria para avisos programados',
            'ends_at.after' => 'La fecha de fin debe ser posterior a la fecha de inicio',
        ];
    }

    /**
     * Get custom attribute names
     */
    public function attributes(): array
    {
        return [
            'title' => 'título',
            'description' => 'descripción',
            'media_id' => 'imagen',
            'cta_text' => 'texto del botón',
            'cta_url' => 'URL del botón',
            'display_type' => 'tipo de visualización',
            'display_mode' => 'modo de visualización',
            'schedule_type' => 'tipo de programación',
            'starts_at' => 'fecha de inicio',
            'ends_at' => 'fecha de fin',
        ];
    }

    /**
     * Prepare the data for validation
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active', false),
            'cta_new_tab' => $this->boolean('cta_new_tab', true),
            'schedule_type' => $this->input('schedule_type', 'manual'),
            'display_mode' => $this->input('display_mode', 'full'),
        ]);
    }
}
