@extends('layouts.admin')

@section('title', 'Footers')
@section('page-title', 'Footers')

@push('head')
    <meta name="footers-base-url" content="{{ route('footers.index') }}">
    @vite('resources/css/views/footers/index.css')
@endpush

@php
    $user = auth()->user();
    $canPreview = $user->canAny(['footers.view', 'footers.manage']);
    $canEdit = $user->canAny(['footers.edit', 'footers.manage']);
    $canToggle = $user->canAny(['footers.toggle', 'footers.manage']);
    $canDelete = $user->canAny(['footers.delete', 'footers.manage']);
    $hasMenu = $canPreview || $canToggle || $canDelete;
@endphp

@section('header-actions')
    @canany(['footers.restore', 'footers.manage'])
        <a href="{{ route('footers.trashed') }}" class="btn-outline btn-sm btn-header-action">
            <i class="ri-delete-bin-line sm:mr-2"></i>
            <span class="btn-text">Papelera</span>
            <span class="btn-tooltip">Papelera</span>
        </a>
    @endcanany
    @canany(['footers.create', 'footers.manage'])
        <a href="{{ route('footers.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Nuevo Footer</span>
            <span class="btn-tooltip">Nuevo</span>
        </a>
    @endcanany
@endsection

@section('content')
    @if ($footers->isEmpty())
        <div class="card fl-empty">
            <span class="fl-empty-icon"><i class="ri-layout-bottom-line"></i></span>
            <h3 class="fl-empty-title">No hay footers creados aún</h3>
            <p class="fl-empty-text">Crea tu primer footer para mostrar los enlaces y datos de contacto al final de las páginas.</p>
            @canany(['footers.create', 'footers.manage'])
                <a href="{{ route('footers.create') }}" class="btn-primary btn-sm inline-flex items-center">
                    <i class="ri-add-line mr-1"></i> Crear primer footer
                </a>
            @endcanany
        </div>
    @else
        <div class="grid gap-5 fl-grid">
            @foreach ($footers as $footer)
                @php
                    $pageCount = $footer->pages->count();
                    $pagesList = $footer->pages
                        ->map(
                            fn($page) => [
                                'title' => $page->title,
                                'url' => route('pages.show', $page->slug),
                                'published' => (bool) $page->is_published,
                            ],
                        )
                        ->values();
                @endphp
                <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full p-6"
                    id="footer-row-{{ $footer->id }}" data-footer-row>
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div class="flex-1 min-w-0">
                            <h3 class="text-lg font-bold text-secondary mb-1 line-clamp-2 break-words">
                                {{ $footer->name }}</h3>
                            <span class="text-[11px] text-gray-500 font-mono">ID {{ $footer->id }}</span>
                        </div>
                        <span id="footer-badge-{{ $footer->id }}"
                            class="badge {{ $footer->is_active ? 'badge-success' : 'badge-danger' }} flex-shrink-0 whitespace-nowrap">
                            {{ $footer->is_active ? 'Activo' : 'Inactivo' }}
                        </span>
                    </div>

                    <div class="space-y-2.5 flex-1 text-[0.9375rem]">
                        <div class="flex items-center justify-between gap-2 text-gray-600">
                            <span>Páginas:</span>
                            @if ($pageCount > 0)
                                <button type="button" class="fl-pages-btn" data-pages-modal
                                    data-footer-name="{{ $footer->name }}"
                                    data-pages="{{ json_encode($pagesList) }}" title="Ver páginas vinculadas">
                                    {{ $pageCount }} {{ $pageCount === 1 ? 'página' : 'páginas' }}
                                </button>
                            @else
                                <span class="font-semibold text-gray-400">Ninguna</span>
                            @endif
                        </div>

                        <div class="pt-2.5 border-t border-gray-100 space-y-1"
                            title="{{ $footer->created_at->format('d/m/Y H:i:s') }}">
                            <div class="flex items-center justify-between gap-2 text-gray-600">
                                <span>Creado:</span>
                                <span
                                    class="font-semibold text-secondary">{{ $footer->created_at->format('d/m/Y H:i') }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-2 text-gray-600">
                                <span>Por:</span>
                                <span
                                    class="font-semibold text-secondary truncate ml-2">{{ $footer->creator?->name ?? 'Sistema' }}</span>
                            </div>
                        </div>

                        <div class="pt-2.5 border-t border-gray-100 space-y-1"
                            title="{{ $footer->updated_at->format('d/m/Y H:i:s') }}">
                            <div class="flex items-center justify-between gap-2 text-gray-600">
                                <span>Actualizado:</span>
                                <span
                                    class="font-semibold text-secondary">{{ $footer->updated_at->format('d/m/Y H:i') }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-2 text-gray-600">
                                <span>Por:</span>
                                <span
                                    class="font-semibold text-secondary truncate ml-2">{{ $footer->editor?->name ?? 'Sistema' }}</span>
                            </div>
                            <div class="flex items-center justify-between gap-2 text-gray-600">
                                <span>Hace:</span>
                                <span
                                    class="font-semibold text-secondary">{{ $footer->updated_at->diffForHumans() }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                        @if ($canEdit)
                            <a href="{{ route('footers.edit', $footer->id) }}"
                                class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                <i class="ri-edit-line"></i>
                                <span>Editar</span>
                            </a>
                        @endif

                        @if ($hasMenu)
                            <div class="dropdown fl-more" data-dropdown>
                                <button type="button"
                                    class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                    aria-label="Más acciones" title="Más acciones"
                                    onclick="toggleDropdown(this.closest('.dropdown'))">
                                    <i class="ri-more-2-fill text-lg"></i>
                                </button>
                                <div class="dropdown-menu fl-menu">
                                    @if ($canPreview)
                                        <a href="{{ route('footers.preview', $footer->id) }}" target="_blank"
                                            rel="noopener" class="dropdown-item">
                                            <i class="ri-eye-line"></i>
                                            <span>Previsualizar</span>
                                        </a>
                                    @endif
                                    @if ($canToggle)
                                        <button type="button" data-toggle-active
                                            data-footer-id="{{ $footer->id }}"
                                            data-active="{{ $footer->is_active ? '1' : '0' }}"
                                            data-page-count="{{ $pageCount }}" class="dropdown-item">
                                            <i
                                                class="{{ $footer->is_active ? 'ri-toggle-fill' : 'ri-toggle-line' }}"></i>
                                            <span
                                                data-toggle-label>{{ $footer->is_active ? 'Desactivar' : 'Activar' }}</span>
                                        </button>
                                    @endif
                                    @if ($canDelete)
                                        <button type="button" data-delete-footer
                                            data-footer-id="{{ $footer->id }}"
                                            data-footer-name="{{ $footer->name }}"
                                            data-page-count="{{ $pageCount }}"
                                            class="dropdown-item-danger {{ $pageCount > 0 ? 'fl-locked' : '' }}"
                                            title="{{ $pageCount > 0 ? 'No se puede eliminar: tiene páginas vinculadas' : 'Mover a la papelera' }}">
                                            <i class="ri-delete-bin-line"></i>
                                            <span>Eliminar</span>
                                            @if ($pageCount > 0)
                                                <small class="fl-locked-tag">En uso</small>
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
    @vite('resources/js/views/footers/index.js')
@endpush