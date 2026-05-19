@extends('layouts.admin')

@section('title', 'Ver Rol')
@section('page-title', 'Detalles del Rol')

@section('header-actions')
    <a href="{{ route('roles.index') }}" class="btn-outline btn-header-action">
        <i class="ri-arrow-left-line sm:mr-2"></i>
        <span class="btn-text">Volver</span>
        <span class="btn-tooltip">Volver</span>
    </a>
@endsection

@section('content')
<div class="max-w-4xl">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-1">
            <div class="card">
                <div
                    class="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="ri-shield-user-line text-4xl text-primary"></i>
                </div>

                <h2 class="text-2xl font-bold text-secondary text-center mb-2">
                    {{ $role->display_name ?? ucfirst($role->name) }}
                </h2>

                <p class="text-sm text-gray-600 text-center mb-4">{{ $role->name }}</p>

                @if($role->description)
                    <p class="text-sm text-gray-700 text-center mb-4 px-2">{{ $role->description }}</p>
                @endif

                @if(in_array($role->name, ['admin', 'editor', 'viewer']))
                    <div class="flex justify-center mb-6">
                        <span class="badge badge-info">
                            <i class="ri-star-line mr-1"></i>
                            Rol del Sistema
                        </span>
                    </div>
                @endif

                <div class="space-y-1">
                    <div class="flex items-center justify-between bg-gray-50 rounded-lg">
                        <span class="text-sm text-gray-600">Permisos totales:</span>
                        <span class="font-bold text-secondary">{{ $role->permissions->count() }}</span>
                    </div>
                    <div class="flex items-center justify-between bg-gray-50 rounded-lg">
                        <span class="text-sm text-gray-600">Usuarios asignados:</span>
                        <span class="font-bold text-secondary">{{ $role->users->count() }}</span>
                    </div>
                </div>

                <div class="mt-4 flex flex-col gap-2">
                    @canany(['roles.edit', 'roles.manage'])
                        @if($role->name !== 'admin')
                            <a href="{{ route('roles.edit', $role) }}" class="btn-secondary w-full">
                                <i class="ri-edit-line mr-2"></i>
                                Editar
                            </a>
                        @endif
                    @endcanany

                    @canany(['roles.delete', 'roles.manage'])
                        @if(!in_array($role->name, ['admin', 'editor', 'viewer']) && $role->users->count() == 0)
                            <form id="delete-role-form" action="{{ route('roles.destroy', $role) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="button"
                                    onclick="confirmDeleteRole({{ $role->id }}, '{{ addslashes($role->display_name ?? $role->name) }}', 'delete-role-form')"
                                    class="btn-danger w-full">
                                    <i class="ri-delete-bin-line mr-2"></i>
                                    Eliminar
                                </button>
                            </form>
                        @endif
                    @endcanany
                </div>
            </div>
        </div>

        <div class="lg:col-span-2">
            <div class="card">
                <h3 class="text-xl font-bold text-secondary mb-4 flex items-center">
                    <i class="ri-lock-line mr-2"></i>
                    Permisos Asignados
                </h3>

                @if($permissionsByGroup->count() > 0)
                    <div class="space-y-4">
                        @foreach($permissionsByGroup as $group => $groupPermissions)
                            <div class="card bg-gray-50">
                                <h4 class="font-semibold text-secondary flex items-center mb-3">
                                    <i class="{{ App\Helpers\PermissionHelper::getModuleIcon($group) }} mr-2"></i>
                                    {{ App\Helpers\PermissionHelper::translateModule($group) }}
                                    <span
                                        class="ml-2 text-sm font-normal text-gray-600">({{ $groupPermissions->count() }})</span>
                                </h4>
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    @foreach($groupPermissions as $permission)
                                        <div class="flex items-center p-2 bg-white rounded-lg">
                                            <i class="ri-checkbox-circle-fill text-green-500 mr-2"></i>
                                            <span
                                                class="text-sm text-gray-700">{{ App\Helpers\PermissionHelper::translatePermission($permission->name) }}</span>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endforeach
                    </div>
                @else
                    <div class="text-center py-8">
                        <i class="ri-lock-line text-4xl text-gray-400 mb-2"></i>
                        <p class="text-gray-600">No hay permisos asignados a este rol</p>
                    </div>
                @endif
            </div>

            @if($role->users->count() > 0)
            <div class="card mt-6">
                <h3 class="text-xl font-bold text-secondary mb-4 flex items-center">
                    <i class="ri-user-line mr-2"></i>
                    Usuarios con este Rol
                </h3>
                <div class="space-y-2">
                    @foreach($role->users as $user)
                    <div
                        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div class="flex items-center gap-3">
                            <div
                                class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                {{ strtoupper(substr($user->name, 0, 1)) }}
                            </div>
                            <div>
                                <p class="font-medium text-secondary">{{ $user->name }}</p>
                                <p class="text-sm text-gray-600">{{ $user->username }}</p>
                            </div>
                        </div>
                        @canany(['users.view', 'users.manage'])
                        <a href="{{ route('users.edit', $user) }}" class="text-primary hover:text-orange-600">
                            <i class="ri-arrow-right-line text-xl"></i>
                        </a>
                        @endcan
                    </div>
                    @endforeach
                </div>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection

@push('scripts')
    <script>
        function confirmDeleteRole(roleName) {
            showConfirmModal({
                title: '¿Eliminar rol?',
                message: `¿Estás seguro de que deseas eliminar el rol "${roleName}"? Esta acción no se puede deshacer.`,
                confirmText: 'Eliminar',
                cancelText: 'Cancelar',
                type: 'danger',
                onConfirm: () => {
                    document.getElementById('delete-role-form').submit();
                }
            });
        }
    </script>
@endpush