@extends('layouts.admin')

@section('title', 'Activos Extraordinarios')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Activos Extraordinarios</span>
        <span class="badge badge-info">{{ $stats['total'] }} {{ $stats['total'] === 1 ? 'activo' : 'activos' }}</span>
    </div>
@endsection

@section('header-actions')
    <div class="flex items-center gap-2">
        @canany(['assets.manage'])
            <a href="{{ route('asset-categories.index') }}" class="btn-outline btn-sm btn-header-action">
                <i class="ri-price-tag-3-line sm:mr-2"></i>
                <span class="btn-text">Categorías</span>
                <span class="btn-tooltip">Categorías</span>
            </a>
        @endcanany
        @canany(['assets.create', 'assets.manage'])
            <a href="{{ route('assets.create') }}" class="btn-primary btn-sm btn-header-action">
                <i class="ri-add-line sm:mr-2"></i>
                <span class="btn-text">Crear</span>
                <span class="btn-tooltip">Crear</span>
            </a>
        @endcanany
    </div>
@endsection

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('assets.index') }}" class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <input type="text" name="search" value="{{ request('search') }}"
                    placeholder="Buscar por nombre..." class="input-field">
            </div>
            <select name="category" class="input-field sm:w-56">
                <option value="">Todas las categorías</option>
                @foreach ($categories as $category)
                    <option value="{{ $category->id }}" {{ request('category') == $category->id ? 'selected' : '' }}>
                        {{ $category->name }}
                    </option>
                @endforeach
            </select>
            <select name="status" class="input-field sm:w-48">
                <option value="">Todos los estados</option>
                <option value="active" {{ request('status') === 'active' ? 'selected' : '' }}>Activos</option>
                <option value="inactive" {{ request('status') === 'inactive' ? 'selected' : '' }}>Inactivos</option>
            </select>
            <button type="submit" class="btn-secondary whitespace-nowrap">
                <i class="ri-search-line mr-2"></i>Buscar
            </button>
            @if (request('search') || request('category') || request('status'))
                <a href="{{ route('assets.index') }}" class="btn-outline whitespace-nowrap">
                    <i class="ri-close-line mr-2"></i>Limpiar
                </a>
            @endif
        </form>
    </div>

    @if ($assets->count() > 0)
        <div class="grid gap-4 assets-grid">
            @foreach ($assets as $asset)
                <div class="card group flex flex-col h-full p-4" id="asset-item-{{ $asset->id }}">
                    <div class="w-full h-40 rounded-lg overflow-hidden bg-gray-100 mb-3">
                        <img src="{{ $asset->image_url }}" alt="{{ $asset->name ?: Str::limit($asset->short_description, 60) }}" class="w-full h-full object-cover">
                    </div>

                    <div class="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 class="text-base font-bold text-secondary flex-1 min-w-0 line-clamp-2">{{ $asset->name ?: Str::limit($asset->short_description, 60) }}</h3>
                        <span class="badge {{ $asset->is_active ? 'badge-success' : 'badge-warning' }} flex-shrink-0 whitespace-nowrap">
                            <i class="ri-{{ $asset->is_active ? 'eye' : 'eye-off' }}-line mr-1"></i>
                            {{ $asset->is_active ? 'Activo' : 'Inactivo' }}
                        </span>
                    </div>

                    <span class="badge badge-info self-start mb-2">{{ $asset->category->name }}</span>

                    @if ($asset->short_description)
                        <p class="text-sm text-gray-600 line-clamp-2 mb-3">{{ $asset->short_description }}</p>
                    @endif

                    <div class="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
                        @canany(['assets.edit', 'assets.manage'])
                            <a href="{{ route('assets.edit', $asset) }}"
                                class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                <i class="ri-edit-line"></i>
                                <span>Editar</span>
                            </a>
                        @endcanany

                        @canany(['assets.toggle', 'assets.manage'])
                            <button type="button" data-toggle-asset data-id="{{ $asset->id }}"
                                data-active="{{ $asset->is_active ? '1' : '0' }}"
                                class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                title="{{ $asset->is_active ? 'Desactivar' : 'Activar' }}">
                                <i class="ri-{{ $asset->is_active ? 'eye-off' : 'eye' }}-line"></i>
                            </button>
                        @endcanany

                        @canany(['assets.delete', 'assets.manage'])
                            <button type="button" data-delete-asset data-id="{{ $asset->id }}"
                                data-name="{{ addslashes($asset->name) }}"
                                class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center text-red-600"
                                title="Eliminar">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        @endcanany
                    </div>
                </div>
            @endforeach
        </div>

        @if ($assets->hasPages())
            <div class="mt-6">{{ $assets->appends(request()->query())->links() }}</div>
        @endif
    @else
        <div class="card text-center py-12">
            <i class="ri-building-4-line text-6xl text-gray-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">No hay activos</h3>
            <p class="text-gray-600 mb-6">
                @if (request('search') || request('category') || request('status'))
                    No se encontraron activos que coincidan con tu búsqueda
                @else
                    Comienza creando tu primer activo
                @endif
            </p>
            @canany(['assets.create', 'assets.manage'])
                <a href="{{ route('assets.create') }}" class="btn-primary inline-flex items-center">
                    <i class="ri-add-line mr-2"></i>Crear Primer Activo
                </a>
            @endcanany
        </div>
    @endif
@endsection

@push('styles')
    @vite('resources/css/views/assets/assets.css')
@endpush

@push('scripts')
    @vite('resources/js/views/assets/index.js')
@endpush