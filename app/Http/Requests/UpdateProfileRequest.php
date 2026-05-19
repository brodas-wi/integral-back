<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'current_password' => ['required', 'string'],
            'username' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($this->user()->id),
                'regex:/^[a-zA-Z0-9_-]+$/'
            ],
            'name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/'
            ],
            'new_password' => [
                'nullable',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/'
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'current_password.required' => 'Debes ingresar tu contraseña actual para confirmar los cambios',
            'username.required' => 'El campo usuario es obligatorio',
            'username.unique' => 'Este nombre de usuario ya está en uso',
            'username.regex' => 'El usuario solo puede contener letras, números, guiones y guiones bajos',
            'name.required' => 'El campo nombre es obligatorio',
            'name.regex' => 'El nombre solo puede contener letras, espacios y acentos',
            'new_password.min' => 'La contraseña debe tener al menos 8 caracteres',
            'new_password.regex' => 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial',
        ];
    }
}
