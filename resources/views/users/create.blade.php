@extends('layouts.admin')

@section('title', 'Crear Usuario')
@section('page-title', 'Crear Nuevo Usuario')

@section('content')
    <div class="max-w-2xl">
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
            <form action="{{ route('users.store') }}" method="POST" id="userForm">
                @csrf

                <div class="mb-6">
                    <label for="username" class="block text-sm font-medium text-secondary mb-2">
                        Usuario <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="username" name="username" value="{{ old('username') }}" required
                        class="input-field @error('username') border-red-500 @enderror" placeholder="nombre.usuario"
                        oninput="validateUsername(this)">
                    <p class="text-xs text-gray-600 mt-1">Solo letras, números, guiones (-) y guiones bajos (_)</p>
                    @error('username')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-6">
                    <label for="name" class="block text-sm font-medium text-secondary mb-2">
                        Nombre Completo <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="name" name="name" value="{{ old('name') }}" required
                        class="input-field @error('name') border-red-500 @enderror" placeholder="Nombre y Apellido"
                        oninput="validateName(this)">
                    <p class="text-xs text-gray-600 mt-1">Solo letras, espacios y acentos</p>
                    @error('name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-secondary mb-2">
                        Contraseña <span class="text-red-500">*</span>
                    </label>
                    <div class="input-wrapper">
                        <div class="relative">
                            <input type="password" id="password" name="password" required
                                class="input-field pr-24 @error('password') border-red-500 @enderror"
                                placeholder="Mínimo 8 caracteres" oninput="validatePassword(this)">
                            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                                <button type="button" onclick="togglePasswordVisibility('password', this)"
                                    class="p-1.5 text-gray-600 hover:text-primary transition-colors flex items-center justify-center"
                                    title="Mostrar/Ocultar contraseña">
                                    <i class="ri-eye-line text-lg"></i>
                                </button>
                                <button type="button" onclick="generateSecurePassword('password')"
                                    class="p-1.5 text-gray-600 hover:text-primary transition-colors flex items-center justify-center"
                                    title="Generar contraseña segura">
                                    <i class="ri-refresh-line text-lg"></i>
                                </button>
                            </div>
                        </div>
                        <p class="text-xs text-gray-600 mt-1">Debe contener al menos 8 caracteres, una mayúscula, una
                            minúscula, un número y un carácter especial (@$!%*?&)</p>
                        @error('password')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <div class="mb-6">
                    <label for="role" class="block text-sm font-medium text-secondary mb-2">
                        Rol <span class="text-red-500">*</span>
                    </label>
                    <select id="role" name="role" required class="input-field @error('role') border-red-500 @enderror">
                        <option value="">Seleccionar rol</option>
                        @foreach($roles as $role)
                            <option value="{{ $role->name }}" {{ old('role') == $role->name ? 'selected' : '' }}>
                                {{ ucfirst($role->name) }}
                            </option>
                        @endforeach
                    </select>
                    @error('role')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-6">
                    <label class="flex items-center">
                        <input type="checkbox" name="is_active" {{ old('is_active', true) ? 'checked' : '' }}
                            class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                        <span class="ml-2 text-sm text-secondary">Usuario activo</span>
                    </label>
                </div>

                <div class="flex justify-between gap-4">
                    <a href="{{ route('users.index') }}" class="btn-outline">
                        <i class="ri-arrow-left-line mr-2"></i>
                        Cancelar
                    </a>
                    <button type="submit" class="btn-secondary">
                        <i class="ri-save-line mr-2"></i>
                        Crear Usuario
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection