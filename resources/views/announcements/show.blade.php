@extends('layouts.admin')

@section('title', 'Detalles del Aviso')
@section('page-title', 'Detalles del Aviso')

@section('content')
<div class="max-w-4xl">
    <div class="mb-6 flex items-center justify-between">
        <a href="{{ route('announcements.index') }}" class="btn-outline inline-flex items-center">
            <i class="ri-arrow-left-line mr-2"></i>
            Volver
        </a>

        <div class="flex gap-2">
            @canany(['announcements.edit', 'announcements.manage'])
            <a href="{{ route('announcements.edit', $announcement) }}" class="btn-secondary">
                <i class="ri-edit-line mr-2"></i>
                Editar
            </a>
            @endcanany

            @canany(['announcements.delete', 'announcements.manage'])
            <button type="button"
                onclick="confirmDelete({{ $announcement->id }}, '{{ addslashes($announcement->title) }}')"
                class="btn-danger">
                <i class="ri-delete-bin-line mr-2"></i>
                Eliminar
            </button>
            @endcanany
        </div>
    </div>

    <div class="card mb-6">
        <div class="flex items-start gap-4 mb-6">
            <div class="flex-1">
                <h2 class="text-2xl font-bold text-secondary mb-2">{{ $announcement->title }}</h2>
                <div class="flex flex-wrap gap-2">
                    <span class="badge {{ $announcement->isCurrentlyActive() ? 'badge-success' : 'badge-danger' }}">
                        {{ $announcement->status }}
                    </span>
                    <span class="badge badge-info">
                        {{ $announcement->display_type_name }}
                    </span>
                    @if($announcement->priority > 0)
                    <span class="badge badge-warning">
                        <i class="ri-star-line mr-1"></i>
                        Prioridad: {{ $announcement->priority }}
                    </span>
                    @endif
                </div>
            </div>
        </div>

        @if($announcement->description)
        <div class="mb-6">
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Descripción</h3>
            <p class="text-gray-600">{{ $announcement->description }}</p>
        </div>
        @endif

        @if($announcement->media)
        <div class="mb-6">
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Imagen</h3>
            <img src="{{ $announcement->media->url }}" alt="{{ $announcement->media->alt ?? $announcement->title }}"
                class="w-full max-w-2xl rounded-lg shadow-md">
            <p class="text-xs text-gray-500 mt-2">
                Dimensiones: {{ $announcement->media->dimensions ?? 'N/A' }} |
                Tamaño: {{ $announcement->media->human_size }}
            </p>
        </div>
        @endif

        @if($announcement->cta_text || $announcement->cta_url)
        <div class="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">Llamado a la Acción</h3>
            <div class="space-y-2">
                @if($announcement->cta_text)
                <p class="text-sm">
                    <span class="font-medium text-gray-700">Texto del botón:</span>
                    <span class="text-gray-600">{{ $announcement->cta_text }}</span>
                </p>
                @endif
                @if($announcement->cta_url)
                <p class="text-sm">
                    <span class="font-medium text-gray-700">URL:</span>
                    <a href="{{ $announcement->cta_url }}" target="_blank" class="text-primary hover:underline">
                        {{ $announcement->cta_url }}
                        <i class="ri-external-link-line text-xs"></i>
                    </a>
                </p>
                <p class="text-sm">
                    <span class="font-medium text-gray-700">Abrir en:</span>
                    <span class="text-gray-600">{{ $announcement->cta_new_tab ? 'Nueva pestaña' : 'Misma pestaña'
                        }}</span>
                </p>
                @endif
            </div>
        </div>
        @endif

        @if($announcement->display_type === 'specific_pages' && $announcement->page_slugs)
        <div class="mb-6">
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Páginas Seleccionadas</h3>
            <div class="flex flex-wrap gap-2">
                @foreach($announcement->page_slugs as $slug)
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {{ $slug }}
                </span>
                @endforeach
            </div>
        </div>
        @endif

        @if($announcement->starts_at || $announcement->ends_at)
        <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            @if($announcement->starts_at)
            <div class="p-4 bg-green-50 rounded-lg">
                <p class="text-sm font-semibold text-green-700 mb-1">Fecha de Inicio</p>
                <p class="text-gray-700">{{ $announcement->starts_at->format('d/m/Y H:i') }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ $announcement->starts_at->diffForHumans() }}</p>
            </div>
            @endif

            @if($announcement->ends_at)
            <div class="p-4 bg-red-50 rounded-lg">
                <p class="text-sm font-semibold text-red-700 mb-1">Fecha de Fin</p>
                <p class="text-gray-700">{{ $announcement->ends_at->format('d/m/Y H:i') }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ $announcement->ends_at->diffForHumans() }}</p>
            </div>
            @endif
        </div>
        @endif
    </div>

    <div class="card">
        <h3 class="text-lg font-semibold text-secondary mb-4">Información del Sistema</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
                <p class="text-gray-600 mb-1">Creado por</p>
                <p class="font-medium text-secondary">{{ $announcement->creator->name }}</p>
                <p class="text-xs text-gray-500">{{ $announcement->created_at->format('d/m/Y H:i') }}</p>
            </div>

            @if($announcement->updated_at != $announcement->created_at)
            <div>
                <p class="text-gray-600 mb-1">Última actualización</p>
                <p class="font-medium text-secondary">{{ $announcement->updater->name }}</p>
                <p class="text-xs text-gray-500">{{ $announcement->updated_at->format('d/m/Y H:i') }}</p>
            </div>
            @endif
        </div>
    </div>
</div>
@endsection

@push('scripts')
@vite('resources/js/modules/announcements.js')
@endpush