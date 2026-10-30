@extends('layouts.admin')

@section('title', 'Navbars')
@section('page-title', 'Navbars')

@push('head')
    <meta name="navbars-base-url" content="{{ route('navbars.index') }}">
    @vite('resources/css/views/navbars/index.css')
@endpush

@php
    $user = auth()->user();
    $canPreview = $user->canAny(['navbars.view', 'navbars.manage']);
    $canEdit = $user->canAny(['navbars.edit', 'navbars.manage']);
    $canToggle = $user->canAny(['navbars.toggle', 'navbars.manage']);
    $canDelete = $user->canAny(['navbars.delete', 'navbars.manage']);
    $hasMenu = $canPreview || $canToggle || $canDelete;
@endphp

@section('header-actions')
    @canany(['navbars.restore', 'navbars.manage'])
        <a href="{{ route('navbars.trashed') }}" class="btn-outline btn-sm btn-header-action">
            <i class="ri-delete-bin-line sm:mr-2"></i>
            <span class="btn-text">Papelera</span>
            <span class="btn-tooltip">Papelera</span>
        </a>
    @endcanany
    @canany(['navbars.create', 'navbars.manage'])
        <a href="{{ route('navbars.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Nuevo Navbar</span>
            <span class="btn-tooltip">Nuevo</span>
        </a>
    @endcanany
@endsection

@section('content')
    @if ($navbars->isEmpty())
        <div class="card nv-empty">
            <span class="nv-empty-icon"><i class="ri-layout-top-line"></i></span>
            <h3 class="nv-empty-title">No hay navbars creados aún</h3>
            <p class="nv-empty-text">Crea tu primer navbar para mostrar el menú de navegación en el sitio.</p>
            @canany(['navbars.create', 'navbars.manage'])
                <a href="{{ route('navbars.create') }}" class="btn-primary btn-sm inline-flex items-center">
                    <i class="ri-add-line mr-1"></i> Crear primer navbar
                </a>
            @endcanany
        </div>
    @else
        <div class="grid gap-4 nv-grid">
            @foreach ($navbars as $navbar)
                @php
                    $pageCount = $navbar->pages->count();
                    $pagesList = $navbar->pages
                        ->map(
                            fn($page) => [
                                'title' => $page->title,
                                'url' => route('pages.show', $page->slug),
                                'published' => (bool) $page->is_published,
                            ],
                        )
                        ->values();
                @endphp
                <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full p-4"
                    id="navbar-row-{{ $navbar->id }}" data-navbar-row>
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div class="flex-1 min-w-0">
                            <h3 class="text-base font-bold text-secondary mb-1 line-clamp-2 break-words">
                                {{ $navbar->name }}</h3>
                            <span class="text-[11px] text-gray-500 font-mono">ID {{ $navbar->id }}</span>
                        </div>
                        <span id="navbar-badge-{{ $navbar->id }}"
                            class="badge {{ $navbar->is_active ? 'badge-success' : 'badge-danger' }} flex-shrink-0 whitespace-nowrap">
                            {{ $navbar->is_active ? 'Activo' : 'Inactivo' }}
                        </span>
                    </div>

                    <div class="space-y-1.5 flex-1">
                        <div class="flex items-center justify-between gap-2 text-sm text-gray-600">
                            <span>Páginas:</span>
                            @if ($pageCount > 0)
                                <button type="button" class="nv-pages-btn" data-pages-modal
                                    data-navbar-name="{{ $navbar->name }}" data-pages="{{ json_encode($pagesList) }}"
                                    title="Ver páginas vinculadas">
                                    {{ $pageCount }} {{ $pageCount === 1 ? 'página' : 'páginas' }}
                                </button>
                            @else
                                <span class="font-semibold text-gray-400">Ninguna</span>
                            @endif
                        </div>

                        <div class="flex items-center justify-between gap-2 text-sm text-gray-600"
                            title="{{ $navbar->created_at->format('d/m/Y H:i:s') }}">
                            <span>Creado:</span>
                            <span
                                class="font-semibold text-secondary">{{ $navbar->created_at->format('d/m/Y H:i') }}</span>
                        </div>

                        <div class="flex items-center justify-between gap-2 text-sm text-gray-600"
                            title="{{ $navbar->updated_at->format('d/m/Y H:i:s') }}">
                            <span>Actualizado:</span>
                            <span
                                class="font-semibold text-secondary">{{ $navbar->updated_at->format('d/m/Y H:i') }}</span>
                        </div>

                        <div class="flex items-center justify-between gap-2 text-sm text-gray-600">
                            <span class="shrink-0">Hace:</span>
                            <span class="font-semibold text-secondary">{{ $navbar->updated_at->diffForHumans() }}</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 mt-1 pt-3 border-t border-gray-100">
                        @if ($canEdit)
                            <a href="{{ route('navbars.edit', $navbar->id) }}"
                                class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                <i class="ri-edit-line"></i>
                                <span>Editar</span>
                            </a>
                        @endif

                        @if ($hasMenu)
                            <div class="dropdown nv-more" data-dropdown>
                                <button type="button"
                                    class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                    aria-label="Más acciones" title="Más acciones"
                                    onclick="toggleDropdown(this.closest('.dropdown'))">
                                    <i class="ri-more-2-fill text-lg"></i>
                                </button>
                                <div class="dropdown-menu nv-menu">
                                    @if ($canPreview)
                                        <a href="{{ route('navbars.preview', $navbar->id) }}" target="_blank"
                                            rel="noopener" class="dropdown-item">
                                            <i class="ri-eye-line"></i>
                                            <span>Previsualizar</span>
                                        </a>
                                    @endif
                                    @if ($canToggle)
                                        <button type="button" data-toggle-active data-navbar-id="{{ $navbar->id }}"
                                            data-active="{{ $navbar->is_active ? '1' : '0' }}"
                                            data-page-count="{{ $pageCount }}" class="dropdown-item">
                                            <i class="{{ $navbar->is_active ? 'ri-toggle-fill' : 'ri-toggle-line' }}"></i>
                                            <span
                                                data-toggle-label>{{ $navbar->is_active ? 'Desactivar' : 'Activar' }}</span>
                                        </button>
                                    @endif
                                    @if ($canDelete)
                                        <button type="button" data-delete-navbar data-navbar-id="{{ $navbar->id }}"
                                            data-navbar-name="{{ $navbar->name }}" data-page-count="{{ $pageCount }}"
                                            class="dropdown-item-danger {{ $pageCount > 0 ? 'nv-locked' : '' }}"
                                            title="{{ $pageCount > 0 ? 'No se puede eliminar: tiene páginas vinculadas' : 'Mover a la papelera' }}">
                                            <i class="ri-delete-bin-line"></i>
                                            <span>Eliminar</span>
                                            @if ($pageCount > 0)
                                                <small class="nv-locked-tag">En uso</small>
                                            @endif
                                        </button>
                                    @endif
                                </div>
                            </div>
                        @endif
                    </div>
                </div>
            @endforeach
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/navbars/index.js')
@endpush
