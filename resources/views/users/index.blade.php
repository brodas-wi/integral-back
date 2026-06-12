@extends('layouts.admin')

@section('title', 'Usuarios')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Usuarios</span>
        <span class="badge bg-primary text-white text-sm">{{ $users->total() }} {{ $users->total() === 1 ? 'usuario' : 'usuarios' }}</span>
    </div>
@endsection

@section('header-actions')
    @canany(['users.create', 'users.manage'])
        <a href="{{ route('users.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Nuevo Usuario</span>
            <span class="btn-tooltip">Nuevo Usuario</span>
        </a>
    @endcanany
@endsection

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('users.index') }}" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label for="search" class="block text-sm font-medium text-secondary mb-2">
                    Buscar
                </label>
                <div class="relative">
                    <input type="text" id="search" name="search" value="{{ request('search') }}"
                        placeholder="Nombre o usuario..." class="input-field pl-10">
                    <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>
            <div>
                <label for="role" class="block text-sm font-medium text-secondary mb-2">
                    Rol
                </label>
                <select id="role" name="role" class="input-field">
                    <option value="">Todos los roles</option>
                    @foreach($roles as $role)
                        <option value="{{ $role->name }}" {{ request('role') == $role->name ? 'selected' : '' }}>
                            {{ $role->display_name ?? ucfirst($role->name) }}
                        </option>
                    @endforeach
                </select>
            </div>
            <div>
                <label for="status" class="block text-sm font-medium text-secondary mb-2">
                    Estado
                </label>
                <select id="status" name="status" class="input-field">
                    <option value="">Todos</option>
                    <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Activos</option>
                    <option value="inactive" {{ request('status') == 'inactive' ? 'selected' : '' }}>Inactivos</option>
                </select>
            </div>
            <div class="md:col-span-3 flex gap-3 justify-end">
                <a href="{{ route('users.index') }}" class="btn-outline">
                    <i class="ri-close-line mr-2"></i>
                    Limpiar
                </a>
                <button type="submit" class="btn-secondary">
                    <i class="ri-filter-3-line mr-2"></i>
                    Filtrar
                </button>
            </div>
        </form>
    </div>
    @if(isset($stats))
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div class="card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Total</p>
                        <p class="text-2xl font-bold text-secondary">{{ $stats['total'] }}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i class="ri-user-line text-2xl text-blue-600"></i>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Activos</p>
                        <p class="text-2xl font-bold text-green-600">{{ $stats['active'] }}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <i class="ri-checkbox-circle-line text-2xl text-green-600"></i>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Inactivos</p>
                        <p class="text-2xl font-bold text-red-600">{{ $stats['inactive'] }}</p>
                    </div>
                    <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <i class="ri-close-circle-line text-2xl text-red-600"></i>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Con Medios</p>
                        <p class="text-2xl font-bold text-primary">{{ $stats['with_media'] }}</p>
                    </div>
                    <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <i class="ri-image-line text-2xl text-primary"></i>
                    </div>
                </div>
            </div>
        </div>
    @endif
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @forelse($users as $user)
            <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full p-4">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2 mb-1">
                            <h3 class="text-base font-bold text-secondary truncate">{{ $user->name }}</h3>
                            @if($user->isRootAdmin())
                                <span
                                    class="inline-flex items-center justify-center w-6 h-6 bg-primary rounded-full text-white flex-shrink-0"
                                    title="Root Admin">
                                    <i class="ri-shield-user-fill text-sm"></i>
                                </span>
                            @endif
                        </div>
                        <p class="text-[11px] text-gray-500 font-mono truncate mb-2">{{ $user->username }}</p>
                        <div class="flex flex-wrap items-center gap-1.5">
                            <span class="badge bg-secondary text-white text-xs">
                                {{ $user->roles->first()->display_name ?? $user->getRoleNames()->first() }}
                            </span>
                            <span class="badge {{ $user->is_active ? 'badge-success' : 'badge-danger' }} text-xs">
                                <i class="ri-{{ $user->is_active ? 'checkbox-circle' : 'close-circle' }}-line mr-1"></i>
                                {{ $user->is_active ? 'Activo' : 'Inactivo' }}
                            </span>
                        </div>
                    </div>
                    <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex-shrink-0 ml-2">ID:
                        {{ $user->id }}</span>
                </div>

                <div class="space-y-1.5 flex-1">
                    <div class="flex items-center justify-between text-sm text-gray-600">
                        <span>Creado:</span>
                        <span class="font-semibold text-secondary">{{ $user->created_at->format('d/m/Y') }}</span>
                    </div>
                    @if($user->updated_at->ne($user->created_at))
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Actualizado:</span>
                            <span class="font-semibold text-secondary">{{ $user->updated_at->format('d/m/Y') }}</span>
                        </div>
                    @endif
                </div>

                <div class="mt-1 pt-3 border-t border-gray-100">
                    @if($user->isRootAdmin())
                        @if($user->id === auth()->id())
                            @canany(['users.edit', 'users.manage'])
                                <div class="flex items-center gap-2">
                                    <a href="{{ route('users.edit', $user) }}"
                                        class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                        <i class="ri-edit-line"></i>
                                        <span>Editar Perfil</span>
                                    </a>
                                </div>
                            @endcanany
                        @else
                            <div class="text-center text-sm text-gray-500 py-2">
                                <i class="ri-lock-line mr-1"></i>
                                Usuario protegido
                            </div>
                        @endif
                    @else
                        @php
                            $canEdit = auth()->user()->can('users.edit') || auth()->user()->can('users.manage');
                            $canToggle = auth()->user()->can('users.activate') || auth()->user()->can('users.manage');
                            $canDelete = ($user->id !== auth()->id()) && (auth()->user()->can('users.delete') || auth()->user()->can('users.manage'));
                            $hasDropdownActions = $canEdit || $canToggle || $canDelete;
                        @endphp

                        @if($hasDropdownActions)
                            <div class="flex items-center gap-2">
                                @if($canEdit)
                                    <a href="{{ route('users.edit', $user) }}"
                                        class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                        <i class="ri-edit-line"></i>
                                        <span>Editar</span>
                                    </a>
                                @endif

                                <div class="dropdown" data-dropdown>
                                    <button type="button" class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                        onclick="toggleDropdown(this.closest('.dropdown'))">
                                        <i class="ri-more-2-fill text-lg"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        @if(!$canEdit)
                                            <a href="{{ route('users.edit', $user) }}" class="dropdown-item">
                                                <i class="ri-edit-line"></i>
                                                <span>Editar</span>
                                            </a>
                                        @endif

                                        @if($canToggle)
                                            <button type="button"
                                                onclick="confirmToggleStatus({{ $user->id }}, '{{ addslashes($user->name) }}', {{ $user->is_active ? 'true' : 'false' }})"
                                                class="dropdown-item {{ $user->is_active ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50' }}">
                                                <i class="{{ $user->is_active ? 'ri-close-circle-line' : 'ri-checkbox-circle-line' }}"></i>
                                                <span>{{ $user->is_active ? 'Desactivar' : 'Activar' }}</span>
                                            </button>
                                        @endif

                                        @if($canDelete)
                                            <button type="button"
                                                onclick="confirmDeleteUser({{ $user->id }}, '{{ addslashes($user->name) }}')"
                                                class="dropdown-item-danger">
                                                <i class="ri-delete-bin-line"></i>
                                                <span>Eliminar</span>
                                            </button>
                                        @endif
                                    </div>
                                </div>

                                @if($canToggle)
                                    <form id="toggle-form-{{ $user->id }}" action="{{ route('users.toggle-status', $user) }}" method="POST"
                                        class="hidden">
                                        @csrf
                                        @method('PATCH')
                                    </form>
                                @endif

                                @if($canDelete)
                                    <form id="delete-form-{{ $user->id }}" action="{{ route('users.destroy', $user) }}" method="POST"
                                        class="hidden">
                                        @csrf
                                        @method('DELETE')
                                    </form>
                                @endif
                            </div>
                        @else
                            <div class="text-center text-sm text-gray-500 py-2">
                                Sin acciones disponibles
                            </div>
                        @endif
                    @endif
                </div>
            </div>
        @empty
            <div class="col-span-full card text-center py-12">
                <i class="ri-user-line text-6xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-secondary mb-2">No hay usuarios</h3>
                <p class="text-gray-600">
                    @if(request()->hasAny(['search', 'role', 'status']))
                        No se encontraron usuarios con los filtros aplicados
                    @else
                        No hay usuarios registrados en el sistema
                    @endif
                </p>
            </div>
        @endforelse
    </div>

    @if($users->hasPages())
        <div class="mt-6">
            {{ $users->links() }}
        </div>
    @endif
@endsection
