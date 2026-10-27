@extends('layouts.admin')

@section('title', 'Medios')

@push('styles')
    @vite(['resources/css/views/media/usages-modal.css'])
@endpush

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Medios</span>
        <span class="badge badge-info">{{ $stats['total'] }} {{ $stats['total'] === 1 ? 'archivo' : 'archivos' }}</span>
    </div>
@endsection

@section('header-actions')
    <div class="flex items-center gap-2">
        @canany(['media.delete', 'media.manage'])
            <a href="{{ route('media.trashed') }}" class="btn-outline btn-sm btn-header-action">
                <i class="ri-delete-bin-line sm:mr-2"></i>
                <span class="btn-text">Papelera</span>
                <span class="btn-tooltip">Papelera</span>
            </a>
        @endcanany
        @canany(['media.upload', 'media.manage'])
            <a href="{{ route('media.create') }}" class="btn-primary btn-sm btn-header-action">
                <i class="ri-upload-2-line sm:mr-2"></i>
                <span class="btn-text">Subir Archivos</span>
                <span class="btn-tooltip">Subir Archivos</span>
            </a>
        @endcanany
    </div>
@endsection

@section('content')
    @php
        $usageCounts = $media->pluck('id')->mapWithKeys(fn($id) => [$id => 1])->all();
        $user = auth()->user();
        $canEdit = $user->can('media.view') || $user->can('media.manage');
        $canDownload = $user->can('media.download') || $user->can('media.manage');
        $canDelete = $user->can('media.delete') || $user->can('media.manage');
        $hasDropdownActions = $canEdit || $canDownload || $canDelete;
        $hasFilters = request('search') || request('type') || request('date_from') || request('date_to');
    @endphp

    <div class="card mb-6">
        <form method="GET" action="{{ route('media.index') }}" class="space-y-4">
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                    <input type="text" name="search" value="{{ request('search') }}"
                        placeholder="Buscar por nombre o texto alternativo..." class="input-field">
                </div>
                <select name="type" class="input-field sm:w-48">
                    <option value="">Todos los tipos</option>
                    <option value="image" @selected(request('type') === 'image')>Imágenes</option>
                    <option value="video" @selected(request('type') === 'video')>Videos</option>
                    <option value="document" @selected(request('type') === 'document')>Archivos Excel</option>
                    <option value="pdf" @selected(request('type') === 'pdf')>PDFs</option>
                </select>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                    <label class="block text-xs font-medium text-gray-700 mb-1">Desde</label>
                    <input type="date" name="date_from" value="{{ request('date_from') }}" class="input-field">
                </div>
                <div class="flex-1">
                    <label class="block text-xs font-medium text-gray-700 mb-1">Hasta</label>
                    <input type="date" name="date_to" value="{{ request('date_to') }}" class="input-field">
                </div>
                <div class="flex-1">
                    <label class="block text-xs font-medium text-gray-700 mb-1">Por página</label>
                    <select name="per_page" class="input-field" onchange="this.form.submit()">
                        @foreach ([10, 20, 30] as $size)
                            <option value="{{ $size }}" @selected((int) request('per_page', 10) === $size)>{{ $size }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="flex items-end gap-2">
                    <button type="submit" class="btn-secondary whitespace-nowrap">
                        <i class="ri-search-line mr-2"></i>
                        Buscar
                    </button>
                    @if ($hasFilters)
                        <a href="{{ route('media.index') }}" class="btn-outline whitespace-nowrap">
                            <i class="ri-close-line mr-2"></i>
                            Limpiar
                        </a>
                    @endif
                </div>
            </div>
        </form>
    </div>

    @if ($media->count() > 0)
        <div id="media-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            @foreach ($media as $item)
                @php
                    $ext = strtoupper(pathinfo($item->filename, PATHINFO_EXTENSION));
                    $usageCount = $usageCounts[$item->id] ?? 0;
                    $badgeClass = match (true) {
                        $item->isImage() => 'bg-black bg-opacity-70 text-white font-medium',
                        $item->isVideo() => 'bg-purple-100 text-purple-700 font-bold',
                        $item->isPdf() => 'bg-red-100 text-red-700 font-bold',
                        default => 'bg-green-100 text-green-700 font-bold',
                    };
                @endphp

                <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full p-4"
                    id="media-item-{{ $item->id }}">
                    <div class="relative mb-3">
                        <a href="{{ route('media.show', $item) }}" class="block">
                            <div
                                class="w-full h-36 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative group-hover:opacity-90 transition-opacity">
                                @if ($item->isImage())
                                    <img src="{{ $item->url }}" alt="{{ $item->alt ?? $item->filename }}"
                                        class="w-full h-full object-cover" loading="lazy" decoding="async">
                                @elseif ($item->isVideo())
                                    <video src="{{ $item->url }}" muted preload="none"
                                        class="w-full h-full object-cover"></video>
                                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <i class="ri-play-circle-fill text-4xl text-white text-opacity-80"></i>
                                    </div>
                                @elseif ($item->isPdf())
                                    <i class="ri-file-pdf-line text-7xl text-red-500"></i>
                                @else
                                    <i class="ri-file-excel-line text-7xl text-green-500"></i>
                                @endif
                            </div>
                        </a>

                        <div class="media-badges">
                            @if ($usageCount > 0)
                                <button type="button" data-check-usages data-media-id="{{ $item->id }}"
                                    title="En uso en {{ $usageCount }} {{ $usageCount === 1 ? 'lugar' : 'lugares' }}"
                                    aria-label="Ver dónde se usa" class="media-usage-badge">
                                    <i class="ri-links-line"></i>
                                </button>
                            @endif
                            <span class="px-2 py-1 rounded text-xs {{ $badgeClass }}">{{ $ext }}</span>
                        </div>
                    </div>

                    <div class="flex-1 flex flex-col">
                        <h4 class="font-semibold text-sm text-secondary truncate mb-2" title="{{ $item->filename }}">
                            {{ $item->filename }}
                        </h4>

                        <div class="space-y-1 flex-1 text-xs text-gray-600 font-medium">
                            <div class="flex items-center justify-between">
                                <span>{{ $item->human_size }}</span>
                                @if ($item->isImage() && $item->width)
                                    <span class="text-gray-500">{{ $item->width }}×{{ $item->height }}px</span>
                                @endif
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="truncate flex-1 mr-2">{{ $item->uploader?->name ?? '—' }}</span>
                                <span class="text-gray-500 flex-shrink-0">{{ $item->created_at->format('d/m/Y') }}</span>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 mt-1 pt-3 border-t border-gray-100">
                            @canany(['media.view', 'media.manage'])
                                <a href="{{ route('media.show', $item) }}"
                                    class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                    <i class="ri-eye-line"></i>
                                    <span>Ver</span>
                                </a>
                            @endcanany

                            @if ($hasDropdownActions)
                                <div class="dropdown" data-dropdown>
                                    <button type="button"
                                        class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                        onclick="toggleDropdown(this.closest('.dropdown'))">
                                        <i class="ri-more-2-fill text-lg"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        @if ($canEdit)
                                            <a href="{{ route('media.edit', $item) }}" class="dropdown-item">
                                                <i class="ri-edit-line"></i>
                                                <span>Editar</span>
                                            </a>
                                        @endif

                                        @if ($canDownload)
                                            <a href="{{ route('media.download', $item) }}" class="dropdown-item">
                                                <i class="ri-download-line"></i>
                                                <span>Descargar</span>
                                            </a>
                                        @endif

                                        @if ($item->isImage() || $item->isPdf() || $item->isVideo())
                                            <a href="{{ $item->url }}" target="_blank" rel="noopener"
                                                class="dropdown-item">
                                                <i class="ri-external-link-line"></i>
                                                <span>Abrir</span>
                                            </a>
                                        @endif

                                        @if ($canEdit)
                                            <button type="button" data-check-usages data-media-id="{{ $item->id }}"
                                                class="dropdown-item">
                                                <i class="ri-links-line"></i>
                                                <span>Ver dónde se usa</span>
                                            </button>
                                        @endif

                                        @if ($canDelete)
                                            <button type="button" data-delete-media data-media-id="{{ $item->id }}"
                                                data-filename="{{ $item->filename }}" class="dropdown-item-danger">
                                                <i class="ri-delete-bin-line"></i>
                                                <span>Eliminar</span>
                                            </button>
                                        @endif
                                    </div>
                                </div>
                            @endif
                        </div>
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
            <i class="ri-folder-open-line text-6xl text-gray-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">No hay archivos</h3>
            <p class="text-gray-600 mb-6">
                @if ($hasFilters)
                    No se encontraron archivos que coincidan con tu búsqueda
                @else
                    Comienza subiendo tu primera imagen, video o documento
                @endif
            </p>
            @if ($hasFilters)
                <a href="{{ route('media.index') }}" class="btn-outline inline-flex items-center">
                    <i class="ri-close-line mr-2"></i>
                    Limpiar búsqueda
                </a>
            @else
                @canany(['media.upload', 'media.manage'])
                    <a href="{{ route('media.create') }}" class="btn-primary inline-flex items-center">
                        <i class="ri-upload-2-line mr-2"></i>
                        Subir Primer Archivo
                    </a>
                @endcanany
            @endif
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/media/index.js')
@endpush
