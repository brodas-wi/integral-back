@extends('layouts.admin')

@section('title', 'Plantillas de bloques')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Plantillas de bloques</span>
        <span class="badge badge-info">{{ $templates->total() }} {{ $templates->total() === 1 ? 'plantilla' : 'plantillas' }}</span>
    </div>
@endsection

@section('header-actions')
    <button type="button" class="btn-secondary btn-sm btn-header-action" onclick="document.getElementById('bt-help').showModal()">
        <i class="ri-question-line sm:mr-2"></i>
        <span class="btn-text">Ayuda</span>
        <span class="btn-tooltip">Ayuda</span>
    </button>
    @canany(['block_templates.create', 'block_templates.manage'])
        <a href="{{ route('block-templates.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Crear</span>
            <span class="btn-tooltip">Crear</span>
        </a>
    @endcanany
@endsection

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('block-templates.index') }}" class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <input type="text" name="search" value="{{ $search }}" placeholder="Buscar por nombre..." class="input-field">
            </div>
            <div class="flex items-end gap-2">
                <button type="submit" class="btn-secondary whitespace-nowrap">
                    <i class="ri-search-line mr-2"></i>
                    Buscar
                </button>
                @if ($search !== '')
                    <a href="{{ route('block-templates.index') }}" class="btn-outline whitespace-nowrap">
                        <i class="ri-close-line mr-2"></i>
                        Limpiar
                    </a>
                @endif
            </div>
        </form>
    </div>

    @if ($templates->count() > 0)
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            @foreach ($templates as $template)
                <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full p-4">
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div class="flex-1 min-w-0">
                            <h3 class="text-base font-bold text-secondary mb-1 line-clamp-2">{{ $template->name }}</h3>
                            <span class="text-[11px] text-gray-500 font-mono truncate block">{{ $template->slug }}</span>
                        </div>
                        <span class="badge {{ $template->is_active ? 'badge-success' : 'badge-warning' }} flex-shrink-0 whitespace-nowrap">
                            <i class="ri-{{ $template->is_active ? 'eye' : 'eye-off' }}-line mr-1"></i>
                            {{ $template->is_active ? 'Activa' : 'Inactiva' }}
                        </span>
                    </div>

                    <div class="space-y-1.5 flex-1">
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Tipo:</span>
                            <span class="font-semibold text-secondary">{{ $template->mode === 'managed' ? 'Administrable' : 'Estática' }}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Categoría:</span>
                            <span class="font-semibold text-secondary truncate ml-2">{{ $template->category }}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Versión:</span>
                            <span class="font-semibold text-secondary font-mono">v{{ $template->version }}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Actualizado:</span>
                            <span class="font-semibold text-secondary">{{ $template->updated_at->format('d/m/Y H:i') }}</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 mt-1 pt-3 border-t border-gray-100">
                        @canany(['block_templates.edit', 'block_templates.manage'])
                            <a href="{{ route('block-templates.edit', $template) }}"
                                class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                <i class="ri-edit-line"></i>
                                <span>Editar</span>
                            </a>
                        @endcanany

                        <div class="dropdown" data-dropdown>
                            <button type="button" class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                onclick="toggleDropdown(this.closest('.dropdown'))">
                                <i class="ri-more-2-fill text-lg"></i>
                            </button>
                            <div class="dropdown-menu">
                                @canany(['block_templates.toggle', 'block_templates.manage'])
                                    <form method="POST" action="{{ route('block-templates.toggle-status', $template) }}"
                                        data-bt-action="toggle">
                                        @csrf
                                        @method('PATCH')
                                        <button type="submit" class="dropdown-item w-full">
                                            <i class="ri-{{ $template->is_active ? 'eye-off' : 'eye' }}-line"></i>
                                            <span>{{ $template->is_active ? 'Desactivar' : 'Activar' }}</span>
                                        </button>
                                    </form>
                                @endcanany

                                @canany(['block_templates.delete', 'block_templates.manage'])
                                    <form method="POST" action="{{ route('block-templates.destroy', $template) }}"
                                        data-bt-action="delete" data-name="{{ $template->name }}">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="dropdown-item-danger w-full">
                                            <i class="ri-delete-bin-line"></i>
                                            <span>Eliminar</span>
                                        </button>
                                    </form>
                                @endcanany
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        @if ($templates->hasPages())
            <div class="mt-6">
                {{ $templates->links() }}
            </div>
        @endif
    @else
        <div class="card text-center py-12">
            <i class="ri-layout-masonry-line text-6xl text-gray-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">No hay plantillas</h3>
            <p class="text-gray-600 mb-6">
                {{ $search !== '' ? 'No se encontraron plantillas que coincidan con tu búsqueda' : 'Crea tu primera plantilla de bloque para el editor' }}
            </p>
            @if ($search === '')
                @canany(['block_templates.create', 'block_templates.manage'])
                    <a href="{{ route('block-templates.create') }}" class="btn-primary inline-flex items-center">
                        <i class="ri-add-line mr-2"></i>
                        Crear Primera Plantilla
                    </a>
                @endcanany
            @endif
        </div>
    @endif

    @include('block-templates._help')
@endsection

@push('scripts')
    @vite('resources/js/views/block-templates/index.js')
@endpush