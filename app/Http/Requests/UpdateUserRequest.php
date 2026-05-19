<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request
     */
    public function authorize(): bool
    {
        $user = $this->route('user');

        // Check if user can edit this specific user
        if ($user->isRootAdmin() && $user->id !== $this->user()->id) {
            return false;
        }

        return $this->user()->can('users.edit')
            || $this->user()->can('users.manage');
    }

    /**
     * Get the validation rules that apply to the request
     */
    public function rules(): array
    {
        $userId = $this->route('user')->id;

        return [
            'username' => [
                'required',
                'string',
                'max:255',
                'unique:users,username,' . $userId,
                'regex:/^[a-zA-Z0-9_-]+$/',
            ],
            'name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/',
            ],
            'password' => [
                'nullable',
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
