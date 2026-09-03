@extends('layouts.admin')

@section('title', 'Papelera de Medios')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Papelera de Medios</span>
        <span class="badge badge-warning">{{ $media->total() }} {{ $media->total() === 1 ? 'archivo' : 'archivos' }}</span>
    </div>
@endsection

@section('header-actions')
    <a href="{{ route('media.index') }}" class="btn-outline btn-sm btn-header-action">
        <i class="ri-arrow-left-line sm:mr-2"></i>
        <span class="btn-text">Volver a Medios</span>
        <span class="btn-tooltip">Volver a Medios</span>
    </a>
@endsection

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('media.trashed') }}" class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <input type="text" name="search" value="{{ request('search') }}"
                    placeholder="Buscar por nombre o texto alternativo..." class="input-field">
            </div>
            <button type="submit" class="btn-secondary whitespace-nowrap">
                <i class="ri-search-line mr-2"></i>
                Buscar
            </button>
            @if (request('search'))
                <a href="{{ route('media.trashed') }}" class="btn-outline whitespace-nowrap">
                    <i class="ri-close-line mr-2"></i>
                    Limpiar
                </a>
            @endif
        </form>
    </div>

    @if ($media->count() > 0)
        <div class="card mb-4" id="bulk-actions-bar" style="display:none;">
            <div class="flex items-center justify-between flex-wrap gap-3">
                <span class="text-sm font-medium text-secondary">
                    <span id="selected-count">0</span> archivo(s) seleccionado(s)
                </span>
                <div class="flex items-center gap-2">
                    <button type="button" data-bulk-restore class="btn-secondary btn-sm">
                        <i class="ri-refresh-line mr-2"></i>
                        Restaurar seleccionados
                    </button>
                    <button type="button" data-bulk-force-delete class="btn-danger btn-sm">
                        <i class="ri-delete-bin-7-line mr-2"></i>
                        Eliminar permanentemente
                    </button>
                </div>
            </div>
        </div>

        <div class="card mb-4">
            <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" id="select-all" class="w-4 h-4">
                <span class="text-sm font-medium text-secondary">Seleccionar todos</span>
            </label>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            @foreach ($media as $item)
                <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full p-4"
                    id="trashed-item-{{ $item->id }}">
                    <div class="flex items-start justify-between mb-2">
                        <input type="checkbox" class="media-checkbox w-4 h-4 mt-1" value="{{ $item->id }}">
                        <span class="badge badge-warning text-xs">
                            Eliminado {{ $item->deleted_at->diffForHumans() }}
                        </span>
                    </div>

                    <div
                        class="w-full h-36 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative mb-3">
                        @if ($item->isImage())
                            <img src="{{ $item->url }}" alt="{{ $item->alt ?? $item->filename }}"
                                class="w-full h-full object-cover opacity-60">
                        @elseif($item->isPdf())
                            <i class="ri-file-pdf-line text-7xl text-red-300"></i>
                        @else
                            <i class="ri-file-excel-line text-7xl text-green-300"></i>
                        @endif
                    </div>

                    <h4 class="font-semibold text-sm text-secondary truncate mb-2" title="{{ $item->filename }}">
                        {{ $item->filename }}
                    </h4>

                    <div class="text-xs text-gray-600 font-medium mb-3">
                        <span>{{ $item->human_size }}</span>
                    </div>

                    <div class="flex items-center gap-2 mt-auto pt-3 border-t border-gray-100">
                        <button type="button" data-restore-media data-media-id="{{ $item->id }}"
                            data-filename="{{ addslashes($item->filename) }}"
                            class="btn-secondary btn-sm flex-1 flex items-center justify-center gap-2">
                            <i class="ri-refresh-line"></i>
                            <span>Restaurar</span>
                        </button>
                        <button type="button" data-force-delete-media data-media-id="{{ $item->id }}"
                            data-filename="{{ addslashes($item->filename) }}"
                            class="btn-danger btn-sm flex-1 flex items-center justify-center gap-2">
                            <i class="ri-delete-bin-7-line"></i>
                            <span>Eliminar</span>
                        </button>
                    </div>
                </div>
            @endforeach
        </div>

        @if ($media->hasPages())
            <div class="mt-6">
                {{ $media->appends(request()->query())->links() }}
            </div>
        @endif
    @else
        <div class="card text-center py-12">
            <i class="ri-delete-bin-line text-6xl text-gray-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">Papelera vacía</h3>
            <p class="text-gray-600">No hay archivos eliminados actualmente.</p>
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/media/trashed.js')
@endpush
