@extends('layouts.admin')

@section('title', 'Detalle de Banner')

@section('page-title')
    <div class="flex items-center gap-2">
        <a href="{{ route('banners.index') }}" class="text-gray-400 hover:text-secondary transition-colors">
            <i class="ri-arrow-left-line text-xl"></i>
        </a>
        <span>Detalle de Banner</span>
    </div>
@endsection

@section('header-actions')
    @canany(['banners.edit', 'banners.manage'])
        <a href="{{ route('banners.edit', $banner) }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-edit-line sm:mr-2"></i>
            <span class="btn-text">Editar</span>
            <span class="btn-tooltip">Editar</span>
        </a>
    @endcanany
@endsection

@push('styles')
    @vite('resources/css/views/banners/banners.css')
@endpush

@section('content')
    <div class="max-w-5xl mx-auto space-y-6">

        <div class="banner-preview">
            <div class="banner-preview-inner">
                <div class="banner-preview-bg">
                    <img src="{{ $banner->image_url }}" alt="{{ $banner->image_alt ?? $banner->title }}">
                </div>
                <div class="banner-preview-overlay"></div>
                <div class="banner-preview-content">
                    @if ($banner->category)
                        <span class="banner-preview-badge">{{ $banner->category }}</span>
                    @endif
                    <h2 class="banner-preview-title">{{ $banner->title }}</h2>
                    <p class="banner-preview-description">{{ $banner->description }}</p>
                    @if ($banner->btn_primary_text || $banner->btn_secondary_text)
                        <div id="show-btn-primary" class="banner-preview-buttons"
                            data-primary-text="{{ $banner->btn_primary_text }}"
                            data-primary-style="{{ $banner->btn_primary_style }}"
                            data-secondary-text="{{ $banner->btn_secondary_text }}"
                            data-secondary-style="{{ $banner->btn_secondary_style }}">
                        </div>
                    @endif
                </div>
            </div>
            <div class="banner-preview-stripe"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="card space-y-3">
                <h3 class="text-xs font-semibold text-secondary uppercase tracking-wide pb-2 border-b border-gray-100">
                    Información general
                </h3>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">Visibilidad</span>
                    <span class="badge {{ $banner->is_active ? 'badge-success' : 'badge-danger' }}">
                        {{ $banner->is_active ? 'Activo' : 'Inactivo' }}
                    </span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">Orden</span>
                    <span class="text-sm font-semibold text-secondary">{{ $banner->order }}</span>
                </div>
                @if ($banner->category)
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">Categoría</span>
                        <span class="badge badge-info">{{ $banner->category }}</span>
                    </div>
                @endif
                @if ($banner->image_alt)
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">Alt de imagen</span>
                        <span class="text-sm font-medium text-gray-700 text-right ml-2 truncate max-w-[200px]">
                            {{ $banner->image_alt }}
                        </span>
                    </div>
                @endif
                @if ($banner->media?->width)
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">Dimensiones</span>
                        <span class="text-sm font-medium text-gray-700">
                            {{ $banner->media->width }} × {{ $banner->media->height }}px
                        </span>
                    </div>
                @endif
                @if ($banner->media)
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">Archivo</span>
                        <span class="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                            {{ $banner->media->filename }}
                        </span>
                    </div>
                @endif
            </div>

            <div class="card space-y-3">
                <h3 class="text-xs font-semibold text-secondary uppercase tracking-wide pb-2 border-b border-gray-100">
                    Historial de cambios
                </h3>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">Creado por</span>
                    <span class="text-sm font-medium text-gray-700">{{ $banner->creator?->name ?? '—' }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">Fecha de creación</span>
                    <span class="text-sm font-medium text-gray-700">{{ $banner->created_at->format('d/m/Y H:i') }}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-sm text-gray-500">Última actualización</span>
                    <span class="text-sm font-medium text-gray-700">{{ $banner->updated_at->format('d/m/Y H:i') }}</span>
                </div>
                @if ($banner->updater && $banner->updater->id !== $banner->creator?->id)
                    <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-500">Actualizado por</span>
                        <span class="text-sm font-medium text-gray-700">{{ $banner->updater->name }}</span>
                    </div>
                @endif
            </div>
        </div>

        @if ($banner->btn_primary_text || $banner->btn_secondary_text)
            <div class="card">
                <h3 class="text-xs font-semibold text-secondary uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">
                    Botones
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    @if ($banner->btn_primary_text)
                        <div class="bg-gray-50 rounded-xl p-4 space-y-2">
                            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Botón primario</p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">Texto</span>
                                <span class="text-sm font-semibold text-secondary">{{ $banner->btn_primary_text }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">URL</span>
                                <span
                                    class="text-sm text-gray-700 truncate ml-2 max-w-[180px]">{{ $banner->btn_primary_url ?? '—' }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">Estilo</span>
                                <span class="badge badge-info">{{ $banner->btn_primary_style }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">Nueva pestaña</span>
                                <span
                                    class="text-sm text-gray-700">{{ $banner->btn_primary_external ? 'Sí' : 'No' }}</span>
                            </div>
                        </div>
                    @endif
                    @if ($banner->btn_secondary_text)
                        <div class="bg-gray-50 rounded-xl p-4 space-y-2">
                            <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide">Botón secundario</p>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">Texto</span>
                                <span class="text-sm font-semibold text-secondary">{{ $banner->btn_secondary_text }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">URL</span>
                                <span
                                    class="text-sm text-gray-700 truncate ml-2 max-w-[180px]">{{ $banner->btn_secondary_url ?? '—' }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">Estilo</span>
                                <span class="badge badge-info">{{ $banner->btn_secondary_style }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-gray-500">Nueva pestaña</span>
                                <span
                                    class="text-sm text-gray-700">{{ $banner->btn_secondary_external ? 'Sí' : 'No' }}</span>
                            </div>
                        </div>
                    @endif
                </div>
            </div>
        @endif

    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/banners/show.js')
@endpush
