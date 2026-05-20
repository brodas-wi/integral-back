@extends('layouts.admin')

@section('title', 'Banners')

@push('head')
    <meta name="banners-delete-url" content="{{ route('banners.index') }}">
@endpush

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Banners</span>
        <span class="badge badge-info">{{ $banners->total() }} {{ $banners->total() === 1 ? 'banner' : 'banners' }}</span>
    </div>
@endsection

@section('header-actions')
    @canany(['banners.delete', 'banners.manage'])
        <a href="{{ route('banners.trashed') }}" class="btn-outline btn-sm btn-header-action">
            <i class="ri-delete-bin-line sm:mr-2"></i>
            <span class="btn-text">Papelera</span>
            <span class="btn-tooltip">Papelera</span>
        </a>
    @endcanany
    @canany(['banners.create', 'banners.manage'])
        <a href="{{ route('banners.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Crear Banner</span>
            <span class="btn-tooltip">Crear</span>
        </a>
    @endcanany
@endsection

@push('styles')
    @vite('resources/css/views/banners/banners.css')
@endpush

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('banners.index') }}" class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <input type="text" name="search" value="{{ request('search') }}"
                    placeholder="Buscar por título o categoría..." class="input-field">
            </div>
            <select name="status" class="input-field sm:w-48">
                <option value="">Todos los estados</option>
                <option value="active" {{ request('status') === 'active' ? 'selected' : '' }}>Activos</option>
                <option value="inactive" {{ request('status') === 'inactive' ? 'selected' : '' }}>Inactivos</option>
            </select>
            <div class="flex items-center gap-2">
                <button type="submit" class="btn-secondary whitespace-nowrap">
                    <i class="ri-search-line mr-2"></i>Buscar
                </button>
                @if (request('search') || request('status'))
                    <a href="{{ route('banners.index') }}" class="btn-outline whitespace-nowrap">
                        <i class="ri-close-line mr-2"></i>Limpiar
                    </a>
                @endif
            </div>
        </form>
    </div>

    @if ($banners->count() > 0)
        <div class="card">
            <div class="space-y-4">
                @foreach ($banners as $banner)
                    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                        id="banner-item-{{ $banner->id }}">
                        <div class="flex items-start gap-4">

                            <div class="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                <img src="{{ $banner->image_url }}" alt="{{ $banner->image_alt ?? $banner->title }}"
                                    class="w-full h-full object-cover">
                            </div>

                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-1 flex-wrap">
                                    <span class="badge {{ $banner->is_active ? 'badge-success' : 'badge-danger' }}">
                                        {{ $banner->is_active ? 'Activo' : 'Inactivo' }}
                                    </span>
                                    @if ($banner->category)
                                        <span class="badge badge-info">{{ $banner->category }}</span>
                                    @endif
                                    <span class="text-xs text-gray-400">Orden: {{ $banner->order }}</span>
                                </div>

                                <h3 class="font-bold text-secondary text-base mb-1 truncate">{{ $banner->title }}</h3>
                                <p class="text-sm text-gray-600 line-clamp-2">{{ $banner->description }}</p>

                                <div class="flex gap-2 mt-2 flex-wrap">
                                    @if ($banner->btn_primary_text)
                                        <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                            Btn 1: {{ $banner->btn_primary_text }} ({{ $banner->btn_primary_style }})
                                        </span>
                                    @endif
                                    @if ($banner->btn_secondary_text)
                                        <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                                            Btn 2: {{ $banner->btn_secondary_text }} ({{ $banner->btn_secondary_style }})
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="flex items-center gap-2 flex-shrink-0">
                                @canany(['banners.edit', 'banners.manage'])
                                    <button type="button"
                                        class="btn-sm w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors toggle-status-btn"
                                        data-id="{{ $banner->id }}" data-active="{{ $banner->is_active ? '1' : '0' }}"
                                        title="{{ $banner->is_active ? 'Desactivar' : 'Activar' }}">
                                        <i
                                            class="ri-{{ $banner->is_active ? 'toggle-fill text-green-500' : 'toggle-line text-gray-400' }} text-2xl"></i>
                                    </button>
                                @endcanany

                                <div class="dropdown" data-dropdown>
                                    <button type="button"
                                        class="btn-secondary btn-sm w-10 h-10 p-0 flex items-center justify-center dropdown-trigger">
                                        <i class="ri-more-2-fill text-xl"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        @canany(['banners.view', 'banners.manage'])
                                            <a href="{{ route('banners.show', $banner) }}" class="dropdown-item">
                                                <i class="ri-eye-line"></i><span>Ver detalles</span>
                                            </a>
                                        @endcanany
                                        @canany(['banners.edit', 'banners.manage'])
                                            <a href="{{ route('banners.edit', $banner) }}" class="dropdown-item">
                                                <i class="ri-edit-line"></i><span>Editar</span>
                                            </a>
                                        @endcanany
                                        @canany(['banners.delete', 'banners.manage'])
                                            <button type="button" class="dropdown-item-danger delete-btn"
                                                data-id="{{ $banner->id }}" data-name="{{ addslashes($banner->title) }}">
                                                <i class="ri-delete-bin-line"></i><span>Eliminar</span>
                                            </button>
                                        @endcanany
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        @if ($banners->hasPages())
            <div class="mt-6">
                {{ $banners->appends(request()->query())->links() }}
            </div>
        @endif
    @else
        <div class="card text-center py-12">
            <i class="ri-image-line text-6xl text-gray-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">No hay banners</h3>
            <p class="text-gray-600 mb-6">
                @if (request('search') || request('status'))
                    No se encontraron banners con esos filtros
                @else
                    Crea tu primer banner para comenzar
                @endif
            </p>
            @canany(['banners.create', 'banners.manage'])
                <a href="{{ route('banners.create') }}" class="btn-primary inline-flex items-center">
                    <i class="ri-add-line mr-2"></i>Crear Primer Banner
                </a>
            @endcanany
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/banners/index.js')
@endpush
