@extends('layouts.admin')

@section('title', 'Mi Perfil')
@section('page-title', 'Mi Perfil')

@section('content')
    <div class="max-w-4xl">
        @if ($errors->any())
            <div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <div class="flex items-start gap-2">
                    <i class="ri-error-warning-line text-xl mt-0.5"></i>
                    <div class="flex-1">
                        <p class="font-semibold mb-2">Por favor corrige los siguientes errores:</p>
                        <ul class="list-disc list-inside space-y-1">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        @endif

        <div class="card">
            <div class="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
                <div class="flex items-center gap-4">
                    <div
                        class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {{ strtoupper(substr($user->name, 0, 1)) }}
                    </div>
                    <div>
                        <h3 class="text-xl font-bold text-secondary">{{ $user->name }}</h3>
                        <p class="text-sm text-gray-600">{{ $user->roles()->first()->display_name }}</p>
                    </div>
                </div>
                <button type="button" id="toggleEditMode" class="btn-outline">
                    <i class="ri-edit-line mr-2"></i>
                    <span id="editModeText">Editar Perfil</span>
                </button>
            </div>

            <form action="{{ route('profile.update') }}" method="POST" id="profileForm">
                @csrf
                @method('PUT')

                <div class="space-y-6">
                    <div>
                        <label for="username" class="block text-sm font-medium text-secondary mb-2">
                            Usuario <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="username" name="username" value="{{ old('username', $user->username) }}"
                            required class="input-field @error('username') border-red-500 @enderror"
                            placeholder="nombre.usuario" oninput="validateUsername(this)" disabled>
                        <p class="text-xs text-gray-600 mt-1">Solo letras, números, guiones (-) y guiones bajos (_)</p>
                        @error('username')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="name" class="block text-sm font-medium text-secondary mb-2">
                            Nombre Completo <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="name" name="name" value="{{ old('name', $user->name) }}" required
                            class="input-field @error('name') border-red-500 @enderror" placeholder="Nombre y Apellido"
                            oninput="validateName(this)" disabled>
                        <p class="text-xs text-gray-600 mt-1">Solo letras, espacios y acentos</p>
                        @error('name')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div id="passwordSection" style="display: none;">
                        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <h4 class="font-semibold text-secondary mb-4 flex items-center gap-2">
                                <i class="ri-lock-password-line"></i>
                                Cambiar Contraseña
                            </h4>

                            <div class="space-y-4">
                                <div>
                                    <label for="new_password" class="block text-sm font-medium text-secondary mb-2">
                                        Nueva Contraseña
                                    </label>
                                    <div class="relative">
                                        <input type="password" id="new_password" name="new_password"
                                            class="input-field pr-24 @error('new_password') border-red-500 @enderror"
                                            placeholder="Dejar en blanco para mantener actual"
                                            oninput="validatePassword(this)" disabled>
                                        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                            <button type="button" onclick="togglePasswordVisibility('new_password', this)"
                                                class="p-1.5 text-gray-600 hover:text-primary transition-colors flex items-center justify-center"
                                                title="Mostrar/Ocultar contraseña">
                                                <i class="ri-eye-line text-lg"></i>
                                            </button>
                                            <button type="button" onclick="generateSecurePassword('new_password')"
                                                class="p-1.5 text-gray-600 hover:text-primary transition-colors flex items-center justify-center"
                                                title="Generar contraseña segura">
                                                <i class="ri-refresh-line text-lg"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p class="text-xs text-gray-600 mt-1">Debe contener al menos 8 caracteres, una
                                        mayúscula, una minúscula, un número y un carácter especial (@$!%*?&)</p>
                                    @error('new_password')
                                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                    @enderror
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="confirmSection" style="display: none;">
                        <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                            <h4 class="font-semibold text-secondary mb-2 flex items-center gap-2">
                                <i class="ri-shield-check-line"></i>
                                Confirmar Cambios
                            </h4>
                            <p class="text-sm text-gray-700 mb-4">Por seguridad, ingresa tu contraseña actual para confirmar
                                los cambios</p>

                            <div>
                                <label for="current_password" class="block text-sm font-medium text-secondary mb-2">
                                    Contraseña Actual <span class="text-red-500">*</span>
                                </label>
                                <div class="relative">
                                    <input type="password" id="current_password" name="current_password"
                                        class="input-field pr-10 @error('current_password') border-red-500 @enderror"
                                        placeholder="Tu contraseña actual" disabled>
                                    <button type="button" onclick="togglePasswordVisibility('current_password', this)"
                                        class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-600 hover:text-primary transition-colors"
                                        title="Mostrar/Ocultar contraseña">
                                        <i class="ri-eye-line text-lg"></i>
                                    </button>
                                </div>
                                @error('current_password')
                                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>
                    </div>

                    <div id="actionButtons" class="flex justify-between gap-4" style="display: none;">
                        <button type="button" id="cancelEdit" class="btn-outline">
                            <i class="ri-close-line mr-2"></i>
                            Cancelar
                        </button>
                        <button type="submit" class="btn-secondary">
                            <i class="ri-save-line mr-2"></i>
                            Guardar Cambios
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div class="card mt-6">
            <h3 class="text-lg font-bold text-secondary mb-4">Información de la Cuenta</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p class="text-sm text-gray-600">Fecha de Creación</p>
                    <p class="font-medium text-secondary">{{ $user->created_at->format('d/m/Y H:i') }}</p>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Última Actualización</p>
                    <p class="font-medium text-secondary">{{ $user->updated_at->format('d/m/Y H:i') }}</p>
                </div>
            </div>
        </div>
    </div>
@endsection