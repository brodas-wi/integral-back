@extends('layouts.admin')

@section('title', 'Scripts')
@section('page-title')
    <x-page-title-with-stats title="Scripts" :count="$stats['total']" />
@endsection

@section('header-actions')
    @canany(['scripts.create', 'scripts.manage'])
        <a href="{{ route('scripts.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Nuevo Script</span>
            <span class="btn-tooltip">Crear</span>
        </a>
    @endcanany
@endsection

@section('content')

    <div class="card mb-6">
        <form method="GET" action="{{ route('scripts.index') }}" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <input type="text" name="search" value="{{ request('search') }}"
                    placeholder="Buscar por nombre o descripción..." class="input-field">

                <select name="status" class="input-field">
                    <option value="">Todos los estados</option>
                    <option value="draft" {{ request('status') === 'draft' ? 'selected' : '' }}>Borrador</option>
                    <option value="pending_review" {{ request('status') === 'pending_review' ? 'selected' : '' }}>Pendiente de revisión</option>
                    <option value="approved" {{ request('status') === 'approved' ? 'selected' : '' }}>Aprobado</option>
                    <option value="rejected" {{ request('status') === 'rejected' ? 'selected' : '' }}>Rechazado</option>
                </select>

                <select name="scope" class="input-field">
                    <option value="">Todos los alcances</option>
                    <option value="global" {{ request('scope') === 'global' ? 'selected' : '' }}>Global</option>
                    <option value="per_page" {{ request('scope') === 'per_page' ? 'selected' : '' }}>Por página</option>
                </select>
            </div>

            <div class="flex items-center gap-2">
                <button type="submit" class="btn-secondary whitespace-nowrap">
                    <i class="ri-search-line mr-2"></i>
                    Filtrar
                </button>
                @if(request('search') || request('status') || request('scope'))
                    <a href="{{ route('scripts.index') }}" class="btn-outline whitespace-nowrap">
                        <i class="ri-close-line mr-2"></i>
                        Limpiar
                    </a>
                @endif
            </div>
        </form>
    </div>

    @if($scripts->count() > 0)
        <div class="card mb-6">
            <div class="space-y-3">
                @foreach($scripts as $script)
                    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors script-item"
                        id="script-item-{{ $script->id }}">
                        <div class="flex items-start gap-4">
                            <div class="flex-1 min-w-0">
                                <div class="flex flex-wrap items-center gap-2 mb-1">
                                    @php
                                        $statusClasses = [
                                            'draft'          => 'badge-gray',
                                            'pending_review' => 'badge-warning',
                                            'approved'       => 'badge-success',
                                            'rejected'       => 'badge-danger',
                                        ];
                                    @endphp
                                    <span class="badge {{ $statusClasses[$script->status] ?? 'badge-gray' }}">
                                        {{ $script->status_label }}
                                    </span>

                                    <span class="badge badge-gray">
                                        <i class="{{ $script->scope === 'global' ? 'ri-global-line' : 'ri-pages-line' }} mr-1"></i>
                                        {{ $script->scope === 'global' ? 'Global' : 'Por página' }}
                                    </span>

                                    @if($script->is_active)
                                        <span class="badge badge-success">
                                            <i class="ri-checkbox-circle-line mr-1"></i>
                                            Activo
                                        </span>
                                    @endif
                                </div>

                                <h3 class="font-semibold text-secondary text-base">{{ $script->name }}</h3>

                                @if($script->description)
                                    <p class="text-sm text-gray-500 mt-1 line-clamp-1">{{ $script->description }}</p>
                                @endif

                                <div class="flex flex-wrap gap-4 text-xs text-gray-400 mt-2">
                                    <span>
                                        <i class="ri-user-line mr-1"></i>
                                        {{ $script->creator->name }}
                                    </span>
                                    <span>
                                        <i class="ri-calendar-line mr-1"></i>
                                        {{ $script->created_at->format('d/m/Y') }}
                                    </span>
                                    @if($script->isApproved() && $script->approver)
                                        <span>
                                            <i class="ri-shield-check-line mr-1 text-green-500"></i>
                                            Aprobado por {{ $script->approver->name }}
                                        </span>
                                    @endif
                                    @if($script->isRejected() && $script->reviewer)
                                        <span class="text-red-400">
                                            <i class="ri-close-circle-line mr-1"></i>
                                            Rechazado por {{ $script->reviewer->name }}
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="flex items-center gap-2 shrink-0">

                                @canany(['scripts.activate', 'scripts.manage'])
                                    @if($script->isApproved())
                                        <label class="relative inline-flex items-center cursor-pointer" title="{{ $script->is_active ? 'Desactivar' : 'Activar' }}">
                                            <input type="checkbox" class="sr-only peer script-toggle"
                                                data-script-id="{{ $script->id }}"
                                                {{ $script->is_active ? 'checked' : '' }}>
                                            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                        </label>
                                    @endif
                                @endcanany

                                <div class="dropdown" data-dropdown>
                                    <button type="button"
                                        class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                        onclick="toggleDropdown(this.closest('.dropdown'))">
                                        <i class="ri-more-2-fill text-xl"></i>
                                    </button>
                                    <div class="dropdown-menu dropdown-menu-bottom">
                                        @canany(['scripts.view', 'scripts.manage'])
                                            <a href="{{ route('scripts.show', $script) }}" class="dropdown-item">
                                                <i class="ri-eye-line"></i>
                                                <span>Ver detalles</span>
                                            </a>
                                        @endcanany

                                        @canany(['scripts.edit', 'scripts.manage'])
                                            @if(!($script->isApproved() && $script->is_active))
                                                <a href="{{ route('scripts.edit', $script) }}" class="dropdown-item">
                                                    <i class="ri-edit-line"></i>
                                                    <span>Editar</span>
                                                </a>
                                            @endif
                                        @endcanany

                                        @canany(['scripts.approve', 'scripts.manage'])
                                            @if($script->isPendingReview())
                                                <button type="button"
                                                    onclick="approveScript({{ $script->id }}, '{{ addslashes($script->name) }}')"
                                                    class="dropdown-item text-green-600 hover:bg-green-50">
                                                    <i class="ri-shield-check-line"></i>
                                                    <span>Aprobar</span>
                                                </button>
                                                <button type="button"
                                                    onclick="openRejectModal({{ $script->id }}, '{{ addslashes($script->name) }}')"
                                                    class="dropdown-item text-red-600 hover:bg-red-50">
                                                    <i class="ri-close-circle-line"></i>
                                                    <span>Rechazar</span>
                                                </button>
                                            @endif
                                        @endcanany

                                        @canany(['scripts.delete', 'scripts.manage'])
                                            @if(!$script->is_active)
                                                <button type="button"
                                                    onclick="confirmDeleteScript({{ $script->id }}, '{{ addslashes($script->name) }}')"
                                                    class="dropdown-item-danger">
                                                    <i class="ri-delete-bin-line"></i>
                                                    <span>Eliminar</span>
                                                </button>
                                            @endif
                                        @endcanany
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="mt-6">
            {{ $scripts->links() }}
        </div>
    @else
        <div class="card text-center py-12">
            <i class="ri-code-s-slash-line text-6xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">No hay scripts</h3>
            <p class="text-gray-500 mb-6">
                @if(request('search') || request('status') || request('scope'))
                    No se encontraron scripts que coincidan con los filtros aplicados.
                @else
                    Comienza creando tu primer script para el sitio público.
                @endif
            </p>
            @if(request('search') || request('status') || request('scope'))
                <a href="{{ route('scripts.index') }}" class="btn-outline inline-flex items-center">
                    <i class="ri-close-line mr-2"></i>
                    Limpiar filtros
                </a>
            @else
                @canany(['scripts.create', 'scripts.manage'])
                    <a href="{{ route('scripts.create') }}" class="btn-primary inline-flex items-center">
                        <i class="ri-add-line mr-2"></i>
                        Crear Primer Script
                    </a>
                @endcanany
            @endif
        </div>
    @endif

    <div id="reject-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg max-w-md w-full p-6">
            <h3 class="text-lg font-semibold text-secondary mb-2">Rechazar Script</h3>
            <p class="text-sm text-gray-600 mb-4">
                Indica el motivo del rechazo para <strong id="reject-script-name"></strong>.
                El autor podrá corregirlo y enviarlo nuevamente.
            </p>
            <textarea id="rejection-reason" rows="4"
                class="input-field w-full mb-4"
                placeholder="Describe el motivo del rechazo..."></textarea>
            <div class="flex justify-end gap-3">
                <button type="button" onclick="closeRejectModal()" class="btn-outline">
                    Cancelar
                </button>
                <button type="button" onclick="submitReject()" class="btn-danger">
                    <i class="ri-close-circle-line mr-2"></i>
                    Rechazar Script
                </button>
            </div>
        </div>
    </div>

@endsection

@push('head')
    <meta name="scripts-base-url" content="{{ route('scripts.index') }}">
@endpush

@push('scripts')
    @vite('resources/js/views/scripts/index.js')
@endpush
