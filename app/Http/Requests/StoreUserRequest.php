<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request
     */
    public function authorize(): bool
    {
        return $this->user()->can('users.create')
            || $this->user()->can('users.manage');
    }

    /**
     * Get the validation rules that apply to the request
     */
    public function rules(): array
    {
        return [
            'username' => [
                'required',
                'string',
                'max:255',
                'unique:users,username',
                'regex:/^[a-zA-Z0-9_-]+$/',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/',
            ],
            'password' => [
                'required',
                'string',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols(),
            ],
            'role' => [
                'required',
                'exists:roles,name',
            ],
            'is_active' => [
                'nullable',
                'boolean',
            ],
        ];
    }

    /**
     * Get custom validation messages
     */
    public function messages(): array
    {
        return [
            'username.required' => 'El campo usuario es obligatorio.',
            'username.unique' => 'Este nombre de usuario ya está en uso.',
            'username.regex' => 'El usuario solo puede contener letras, números, guiones y guiones bajos.',
            'username.max' => 'El usuario no puede superar 255 caracteres.',
            'name.required' => 'El campo nombre es obligatorio.',
            'name.regex' => 'El nombre solo puede contener letras, espacios y acentos.',
            'name.max' => 'El nombre no puede superar 255 caracteres.',
            'password.required' => 'El campo contraseña es obligatorio.',
            'role.required' => 'Debe seleccionar un rol.',
            'role.exists' => 'El rol seleccionado no es válido.',
        ];
    }

    /**
     * Get custom attribute names
     */
    public function attributes(): array
    {
        return [
            'username' => 'usuario',
            'name' => 'nombre',
            'password' => 'contraseña',
            'role' => 'rol',
            'is_active' => 'estado',
        ];
    }

    /**
     * Prepare the data for validation
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active', false),
        ]);
    }
}
