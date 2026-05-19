@extends('layouts.admin')

@section('title', 'Crear Rol')
@section('page-title', 'Crear Nuevo Rol')

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
            <form action="{{ route('roles.store') }}" method="POST">
                @csrf

                <div class="mb-6">
                    <label for="name" class="block text-sm font-medium text-secondary mb-2">
                        Nombre del Rol <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="name" name="name" value="{{ old('name') }}" required
                        class="input-field @error('name') border-red-500 @enderror" placeholder="admin, editor, moderator">
                    <p class="text-xs text-gray-600 mt-1">Solo letras minúsculas y guiones bajos (_)</p>
                    @error('name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-6">
                    <label for="display_name" class="block text-sm font-medium text-secondary mb-2">
                        Nombre para Mostrar <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="display_name" name="display_name" value="{{ old('display_name') }}" required
                        class="input-field @error('display_name') border-red-500 @enderror"
                        placeholder="Administrador, Editor, Moderador">
                    @error('display_name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-6">
                    <label for="description" class="block text-sm font-medium text-secondary mb-2">
                        Descripción
                    </label>
                    <textarea id="description" name="description" rows="3"
                        class="input-field @error('description') border-red-500 @enderror"
                        placeholder="Descripción del rol y sus responsabilidades">{{ old('description') }}</textarea>
                    @error('description')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <label class="block text-sm font-medium text-secondary">
                            Permisos
                        </label>
                        <div class="flex gap-2">
                            <button type="button" onclick="selectAllManagePermissions()"
                                class="text-sm text-primary hover:underline font-medium">
                                Acceso Total (Solo Manage)
                            </button>
                            <span class="text-gray-400">|</span>
                            <button type="button" onclick="deselectAllPermissions()"
                                class="text-sm text-gray-600 hover:underline">
                                Limpiar Todos
                            </button>
                        </div>
                    </div>

                    <div class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div class="flex items-start gap-2">
                            <i class="ri-information-line text-xl text-blue-600 mt-0.5"></i>
                            <div class="text-sm text-blue-800">
                                <p class="font-semibold mb-1">¿Cómo funcionan los permisos?</p>
                                <ul class="space-y-1">
                                    <li><strong class="text-primary">• Gestionar (Manage):</strong> Da acceso completo al
                                        módulo (ver, crear, editar, eliminar). Al seleccionarlo, los demás permisos se
                                        desactivan automáticamente.</li>
                                    <li><strong class="text-secondary">• Permisos Individuales:</strong> Permiten acceso
                                        específico (solo ver, solo editar, etc.). Útil para roles con acceso limitado.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        @foreach($permissions as $group => $groupPermissions)
                            <div class="card bg-gray-50">
                                <div class="flex items-center justify-between mb-3">
                                    <h4 class="font-semibold text-secondary flex items-center">
                                        <i class="{{ App\Helpers\PermissionHelper::getModuleIcon($group) }} mr-2"></i>
                                        {{ App\Helpers\PermissionHelper::translateModule($group) }}
                                        <span class="ml-2 text-sm font-normal text-gray-600">({{ $groupPermissions->count() }}
                                            permisos)</span>
                                    </h4>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    @foreach($groupPermissions as $permission)
                                        @php
                                            $isManage = str_ends_with($permission->name, '.manage');
                                        @endphp
                                        <label
                                            class="flex items-center p-3 rounded-lg cursor-pointer transition-colors border-2 {{ $isManage ? 'bg-primary bg-opacity-5 border-primary hover:bg-primary hover:bg-opacity-10' : 'bg-white border-gray-200 hover:border-secondary' }}">
                                            <input type="checkbox" name="permissions[]" value="{{ $permission->name }}"
                                                data-group="{{ $group }}" data-is-manage="{{ $isManage ? 'true' : 'false' }}"
                                                class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary permission-checkbox"
                                                {{ in_array($permission->name, old('permissions', [])) ? 'checked' : '' }}>
                                            <span
                                                class="ml-3 text-sm {{ $isManage ? 'font-semibold text-primary' : 'text-gray-700' }}">
                                                @if($isManage)
                                                    <i class="ri-shield-star-line mr-1"></i>
                                                @endif
                                                {{ App\Helpers\PermissionHelper::translatePermission($permission->name) }}
                                            </span>
                                        </label>
                                    @endforeach
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>

                <div class="flex justify-between gap-4">
                    <a href="{{ route('roles.index') }}" class="btn-outline">
                        <i class="ri-arrow-left-line mr-2"></i>
                        Cancelar
                    </a>
                    <button type="submit" class="btn-secondary">
                        <i class="ri-save-line mr-2"></i>
                        Crear Rol
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection