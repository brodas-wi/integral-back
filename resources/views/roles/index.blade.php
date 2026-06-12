@extends('layouts.admin')

@section('title', 'Roles')
@section('page-title', 'Roles')

@section('header-actions')
    @canany(['roles.create', 'roles.manage'])
        <a href="{{ route('roles.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Nuevo Rol</span>
            <span class="btn-tooltip">Nuevo Rol</span>
        </a>
    @endcanany
@endsection

@section('content')
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @forelse($roles as $role)
            <div class="card hover:shadow-xl transition-shadow duration-200 flex flex-col h-full">
                <div class="flex items-start justify-between mb-4">
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-secondary mb-1">{{ $role->display_name ?? ucfirst($role->name) }}</h3>
                        <p class="text-sm text-gray-600">{{ $role->name }}</p>
                    </div>
                    <div class="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <i class="ri-shield-user-line text-2xl text-white"></i>
                    </div>
                </div>

                @if($role->description)
                    <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ $role->description }}</p>
                @endif

                <div class="space-y-3 mb-4 flex-grow">
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Permisos:</span>
                        <span class="font-semibold text-secondary">{{ $role->permissions_count }}</span>
                    </div>
                    <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-600">Usuarios:</span>
                        <span class="font-semibold text-secondary">{{ $role->users_count }}</span>
                    </div>
                </div>

                <div class="mt-auto">
                    @if(in_array($role->name, ['admin', 'editor', 'viewer']))
                        <div class="mb-4">
                            <span class="badge bg-secondary text-white">
                                <i class="ri-star-line mr-1"></i>
                                Rol del Sistema
                            </span>
                        </div>
                    @endif

                    <div class="flex items-center gap-2">
                        @canany(['roles.view', 'roles.manage'])
                            <a href="{{ route('roles.show', $role) }}"
                                class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                <i class="ri-eye-line"></i>
                                <span>Ver Detalles</span>
                            </a>
                        @endcanany

                        @php
                            $canEdit = ($role->name !== 'admin') && (auth()->user()->can('roles.edit') || auth()->user()->can('roles.manage'));
                            $canDelete = (!in_array($role->name, ['admin', 'editor', 'viewer']) && $role->users_count == 0) && (auth()->user()->can('roles.delete') || auth()->user()->can('roles.manage'));
                            $hasDropdownActions = $canEdit || $canDelete;
                        @endphp

                        @if($hasDropdownActions)
                            <div class="dropdown" data-dropdown>
                                <button type="button" class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                    onclick="toggleDropdown(this.closest('.dropdown'))">
                                    <i class="ri-more-2-fill text-lg"></i>
                                </button>
                                <div class="dropdown-menu">
                                    @if($canEdit)
                                        <a href="{{ route('roles.edit', $role) }}" class="dropdown-item">
                                            <i class="ri-edit-line"></i>
                                            <span>Editar</span>
                                        </a>
                                    @endif

                                    @if($canDelete)
                                        <button type="button"
                                            onclick="confirmDeleteRole({{ $role->id }}, '{{ addslashes($role->display_name ?? $role->name) }}')"
                                            class="dropdown-item-danger">
                                            <i class="ri-delete-bin-line"></i>
                                            <span>Eliminar</span>
                                        </button>
                                    @endif
                                </div>
                            </div>

                            @if($canDelete)
                                <form id="delete-role-form-{{ $role->id }}" action="{{ route('roles.destroy', $role) }}" method="POST"
                                    class="hidden">
                                    @csrf
                                    @method('DELETE')
                                </form>
                            @endif
                        @endif
                    </div>
                </div>
            </div>
        @empty
            <div class="col-span-full text-center py-12 card">
                <i class="ri-shield-user-line text-6xl text-gray-400 mb-4"></i>
                <p class="text-gray-600">No hay roles registrados</p>
            </div>
        @endforelse
    </div>

    <div class="mt-6">
        {{ $roles->links() }}
    </div>
@endsection
