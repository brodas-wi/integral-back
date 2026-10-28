@extends('layouts.admin')

@section('title', 'Navbars')
@section('page-title', 'Navbars')

@push('head')
    <meta name="navbars-base-url" content="{{ route('navbars.index') }}">
    @vite('resources/css/views/navbars/index.css')
@endpush

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
                @php $pageCount = $navbar->pages->count(); @endphp
                <article class="nv-item" id="navbar-row-{{ $navbar->id }}" data-navbar-row>
                    <div class="nv-main">
                        <span class="nv-icon"><i class="ri-layout-top-line"></i></span>
                        <div class="nv-main-text">
                            <h3 class="nv-name">{{ $navbar->name }}</h3>
                            <span class="badge nv-status {{ $navbar->is_active ? 'badge-success' : 'badge-danger' }}"
                                id="navbar-badge-{{ $navbar->id }}">
                                {{ $navbar->is_active ? 'Activo' : 'Inactivo' }}
                            </span>
                        </div>
                    </div>

                    <dl class="nv-meta">
                        <div class="nv-meta-item">
                            <dt>Páginas</dt>
                            <dd>
                                @if ($pageCount > 0)
                                    <div class="relative inline-block" data-dropdown>
                                        <button type="button"
                                            class="badge badge-info flex items-center gap-1 cursor-pointer dropdown-trigger"
                                            title="Ver páginas vinculadas">
                                            <i class="ri-pages-line"></i>
                                            {{ $pageCount }} {{ $pageCount === 1 ? 'página' : 'páginas' }}
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-bottom navbar-pages-dropdown">
                                            @foreach ($navbar->pages as $page)
                                                <a href="{{ route('pages.show', $page->slug) }}" class="dropdown-item">
                                                    <i class="ri-file-line"></i>
                                                    <span>{{ $page->title }}</span>
                                                    @if ($page->is_published)
                                                        <span class="ml-auto badge badge-success badge-xs">Pub.</span>
                                                    @endif
                                                </a>
                                            @endforeach
                                        </div>
                                    </div>
                                @else
                                    <span class="nv-muted">Sin páginas</span>
                                @endif
                            </dd>
                        </div>
                        <div class="nv-meta-item" title="{{ $navbar->created_at->format('d/m/Y H:i:s') }}">
                            <dt>Creado</dt>
                            <dd>
                                <span class="nv-date-main">{{ $navbar->created_at->format('d/m/Y') }}</span>
                                <span class="nv-date-sub">{{ $navbar->created_at->format('H:i') }}</span>
                            </dd>
                        </div>
                        <div class="nv-meta-item" title="{{ $navbar->updated_at->format('d/m/Y H:i:s') }}">
                            <dt>Actualizado</dt>
                            <dd>
                                <span class="nv-date-main">{{ $navbar->updated_at->format('d/m/Y') }}</span>
                                <span class="nv-date-sub">{{ $navbar->updated_at->diffForHumans() }}</span>
                            </dd>
                        </div>
                    </dl>

                    <div class="nv-actions">
                        @canany(['navbars.view', 'navbars.manage'])
                            <a href="{{ route('navbars.preview', $navbar->id) }}" target="_blank" rel="noopener"
                                class="nv-action" title="Previsualizar">
                                <i class="ri-eye-line"></i>
                            </a>
                        @endcanany
                        @canany(['navbars.edit', 'navbars.manage'])
                            <a href="{{ route('navbars.edit', $navbar->id) }}" class="nv-action" title="Editar">
                                <i class="ri-edit-line"></i>
                            </a>
                        @endcanany
                        @canany(['navbars.toggle', 'navbars.manage'])
                            <button type="button" data-toggle-active data-navbar-id="{{ $navbar->id }}"
                                data-active="{{ $navbar->is_active ? '1' : '0' }}"
                                data-page-count="{{ $pageCount }}"
                                title="{{ $navbar->is_active ? 'Desactivar' : 'Activar' }}" class="nv-action">
                                <i
                                    class="{{ $navbar->is_active ? 'ri-toggle-fill text-green-500' : 'ri-toggle-line text-gray-400' }} text-2xl"></i>
                            </button>
                        @endcanany
                        @canany(['navbars.delete', 'navbars.manage'])
                            <button type="button" data-delete-navbar data-navbar-id="{{ $navbar->id }}"
                                data-navbar-name="{{ $navbar->name }}" data-page-count="{{ $pageCount }}"
                                title="{{ $pageCount > 0 ? 'No se puede eliminar: tiene páginas vinculadas' : 'Eliminar' }}"
                                class="nv-action nv-action-danger {{ $pageCount > 0 ? 'nv-action-locked' : '' }}">
                                <i class="ri-delete-bin-line"></i>
                            </button>
                        @endcanany
                    </div>
                </article>
            @endforeach
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/navbars/index.js')
@endpush