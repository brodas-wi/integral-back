@extends('layouts.admin')

@section('title', 'Avisos')
@section('page-title')
    <x-page-title-with-stats title="Avisos" :count="$stats['total']" />
@endsection

@section('header-actions')
    @canany(['announcements.create', 'announcements.manage'])
        <a href="{{ route('announcements.create') }}" class="btn-primary btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Nuevo Aviso</span>
            <span class="btn-tooltip">Crear</span>
        </a>
    @endcanany
@endsection

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('announcements.index') }}" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input type="text" name="search" value="{{ request('search') }}"
                    placeholder="Buscar por título o descripción..." class="input-field">

                <select name="status" class="input-field">
                    <option value="">Todos los estados</option>
                    <option value="active" {{ request('status') === 'active' ? 'selected' : '' }}>Activos</option>
                    <option value="inactive" {{ request('status') === 'inactive' ? 'selected' : '' }}>Inactivos</option>
                    <option value="scheduled" {{ request('status') === 'scheduled' ? 'selected' : '' }}>Programados</option>
                    <option value="expired" {{ request('status') === 'expired' ? 'selected' : '' }}>Expirados</option>
                </select>

                <select name="display_type" class="input-field">
                    <option value="">Todos los tipos</option>
                    <option value="global" {{ request('display_type') === 'global' ? 'selected' : '' }}>Todas las páginas
                    </option>
                    <option value="homepage" {{ request('display_type') === 'homepage' ? 'selected' : '' }}>Solo inicio
                    </option>
                    <option value="specific_pages" {{ request('display_type') === 'specific_pages' ? 'selected' : '' }}>
                        Páginas específicas</option>
                </select>
            </div>

            <div class="flex items-end gap-2">
                <button type="submit" class="btn-secondary whitespace-nowrap">
                    <i class="ri-search-line mr-2"></i>
                    Filtrar
                </button>
                @if(request('search') || request('status') || request('display_type'))
                    <a href="{{ route('announcements.index') }}" class="btn-outline whitespace-nowrap">
                        <i class="ri-close-line mr-2"></i>
                        Limpiar
                    </a>
                @endif
            </div>
        </form>
    </div>

    @if($announcements->count() > 0)
        <div class="card mb-6">
            <div class="space-y-4">
                @foreach($announcements as $announcement)
                    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors announcement-item"
                        id="announcement-item-{{ $announcement->id }}">
                        <div class="flex items-start gap-4">
                            @if($announcement->media)
                                <div class="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                    <img src="{{ $announcement->media->url }}"
                                        alt="{{ $announcement->media->alt ?? $announcement->title }}"
                                        class="w-full h-full object-cover">
                                </div>
                            @endif

                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="badge {{ $announcement->isCurrentlyActive() ? 'badge-success' : 'badge-danger' }}">
                                        {{ $announcement->status }}
                                    </span>
                                    <span class="badge badge-info">
                                        {{ $announcement->display_type_name }}
                                    </span>
                                    @if($announcement->schedule_type === 'scheduled')
                                        <span class="badge badge-warning">
                                            <i class="ri-calendar-line mr-1"></i>
                                            Programado
                                        </span>
                                    @endif
                                </div>

                                <h3 class="font-semibold text-secondary text-lg mb-1">{{ $announcement->title }}</h3>

                                @if($announcement->description)
                                    <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ $announcement->description }}</p>
                                @endif

                                <div class="flex flex-wrap gap-4 text-sm text-gray-600">
                                    @if($announcement->schedule_type === 'scheduled')
                                        @if($announcement->starts_at)
                                            <div class="flex items-center gap-1">
                                                <i class="ri-calendar-line text-primary"></i>
                                                <span>Inicia: {{ $announcement->starts_at->format('d/m/Y H:i') }}</span>
                                            </div>
                                        @endif

                                        @if($announcement->ends_at)
                                            <div class="flex items-center gap-1">
                                                <i class="ri-calendar-check-line text-primary"></i>
                                                <span>Termina: {{ $announcement->ends_at->format('d/m/Y H:i') }}</span>
                                            </div>
                                        @endif
                                    @else
                                        <div class="flex items-center gap-1">
                                            <i class="ri-hand-coin-line text-primary"></i>
                                            <span>Activación manual</span>
                                        </div>
                                    @endif

                                    @if($announcement->cta_url)
                                        <div class="flex items-center gap-1">
                                            <i class="ri-link text-primary"></i>
                                            <span>{{ $announcement->cta_text ?? 'Ver más' }}</span>
                                        </div>
                                    @endif
                                </div>
                            </div>

                            <div class="flex items-center gap-2">
                                @canany(['announcements.edit', 'announcements.manage'])
                                    <label class="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" class="sr-only peer announcement-toggle"
                                            data-announcement-id="{{ $announcement->id }}" {{ $announcement->is_active ? 'checked' : ''
                                        }}>
                                        <div
                                            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary">
                                        </div>
                                    </label>
                                @endcanany

                                <div class="dropdown" data-dropdown>
                                    <button type="button" class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                        onclick="toggleDropdown(this.closest('.dropdown'))">
                                        <i class="ri-more-2-fill text-xl"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        @canany(['announcements.view', 'announcements.manage'])
                                            <a href="{{ route('announcements.show', $announcement) }}" class="dropdown-item">
                                                <i class="ri-eye-line"></i>
                                                <span>Ver detalles</span>
                                            </a>
                                        @endcanany
                                        @canany(['announcements.edit', 'announcements.manage'])
                                            <a href="{{ route('announcements.edit', $announcement) }}" class="dropdown-item">
                                                <i class="ri-edit-line"></i>
                                                <span>Editar</span>
                                            </a>
                                        @endcanany
                                        @canany(['announcements.delete', 'announcements.manage'])
                                            <button type="button"
                                                onclick="confirmDelete({{ $announcement->id }}, '{{ addslashes($announcement->title) }}')"
                                                class="dropdown-item-danger">
                                                <i class="ri-delete-bin-line"></i>
                                                <span>Eliminar</span>
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

        <div class="mt-6">
            {{ $announcements->links() }}
        </div>
    @else
        <div class="card text-center py-12">
            <i class="ri-notification-line text-6xl text-gray-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">No hay avisos</h3>
            <p class="text-gray-600 mb-6">
                @if(request('search') || request('status') || request('display_type'))
                    No se encontraron avisos que coincidan con tu búsqueda
                @else
                    Comienza creando tu primer aviso
                @endif
            </p>
            @if(request('search') || request('status') || request('display_type'))
                <a href="{{ route('announcements.index') }}" class="btn-outline inline-flex items-center">
                    <i class="ri-close-line mr-2"></i>
                    Limpiar búsqueda
                </a>
            @else
                @canany(['announcements.create', 'announcements.manage'])
                    <a href="{{ route('announcements.create') }}" class="btn-primary inline-flex items-center">
                        <i class="ri-add-line mr-2"></i>
                        Crear Primer Aviso
                    </a>
                @endcanany
            @endif
        </div>
    @endif
@endsection

<meta name="announcements-base-url" content="{{ route('announcements.index') }}">

@push('scripts')
    @vite('resources/js/views/announcements/index.js')
@endpush
