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
        <div class="nv-list">
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
                <article class="nv-item" id="navbar-row-{{ $navbar->id }}" data-navbar-row>
                    <header class="nv-head">
                        <div class="nv-id">
                            <span class="nv-icon"><i class="ri-layout-top-line"></i></span>
                            <div class="nv-id-text">
                                <h3 class="nv-name">{{ $navbar->name }}</h3>
                                <span
                                    class="badge nv-status {{ $navbar->is_active ? 'badge-success' : 'badge-danger' }}"
                                    id="navbar-badge-{{ $navbar->id }}">
                                    {{ $navbar->is_active ? 'Activo' : 'Inactivo' }}
                                </span>
                            </div>
                        </div>

                        <div class="nv-actions">
                            @if ($canEdit)
                                <a href="{{ route('navbars.edit', $navbar->id) }}" class="nv-edit">
                                    <i class="ri-edit-line"></i>
                                    <span>Editar</span>
                                </a>
                            @endif

                            @if ($hasMenu)
                                <div class="dropdown nv-more" data-dropdown>
                                    <button type="button" class="nv-more-btn" aria-label="Más acciones"
                                        title="Más acciones"
                                        onclick="toggleDropdown(this.closest('.dropdown'))">
                                        <i class="ri-more-2-fill"></i>
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
                                            <button type="button" data-toggle-active
                                                data-navbar-id="{{ $navbar->id }}"
                                                data-active="{{ $navbar->is_active ? '1' : '0' }}"
                                                data-page-count="{{ $pageCount }}" class="dropdown-item">
                                                <i
                                                    class="{{ $navbar->is_active ? 'ri-toggle-fill' : 'ri-toggle-line' }}"></i>
                                                <span
                                                    data-toggle-label>{{ $navbar->is_active ? 'Desactivar' : 'Activar' }}</span>
                                            </button>
                                        @endif
                                        @if ($canDelete)
                                            <button type="button" data-delete-navbar
                                                data-navbar-id="{{ $navbar->id }}"
                                                data-navbar-name="{{ $navbar->name }}"
                                                data-page-count="{{ $pageCount }}"
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
                    </header>

                    <div class="nv-info">
                        <div class="nv-info-item">
                            <span class="nv-info-icon"><i class="ri-pages-line"></i></span>
                            <div class="nv-info-body">
                                <span class="nv-info-label">Páginas vinculadas</span>
                                @if ($pageCount > 0)
                                    <button type="button" class="nv-pages-btn" data-pages-modal
                                        data-navbar-name="{{ $navbar->name }}"
                                        data-pages="{{ json_encode($pagesList) }}" title="Ver páginas vinculadas">
                                        {{ $pageCount }} {{ $pageCount === 1 ? 'página' : 'páginas' }}
                                    </button>
                                @else
                                    <span class="nv-info-value nv-muted">Ninguna</span>
                                @endif
                            </div>
                        </div>

                        <div class="nv-info-item" title="{{ $navbar->created_at->format('d/m/Y H:i:s') }}">
                            <span class="nv-info-icon"><i class="ri-calendar-line"></i></span>
                            <div class="nv-info-body">
                                <span class="nv-info-label">Creado</span>
                                <span class="nv-info-value">{{ $navbar->created_at->format('d/m/Y') }}</span>
                                <span class="nv-info-sub">{{ $navbar->created_at->format('H:i') }}</span>
                            </div>
                        </div>

                        <div class="nv-info-item" title="{{ $navbar->updated_at->format('d/m/Y H:i:s') }}">
                            <span class="nv-info-icon"><i class="ri-history-line"></i></span>
                            <div class="nv-info-body">
                                <span class="nv-info-label">Última actualización</span>
                                <span class="nv-info-value">{{ $navbar->updated_at->format('d/m/Y') }}</span>
                                <span class="nv-info-sub">{{ $navbar->updated_at->diffForHumans() }}</span>
                            </div>
                        </div>
                    </div>
                </article>
            @endforeach
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/navbars/index.js')
@endpush