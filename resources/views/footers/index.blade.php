@extends('layouts.admin')

@section('title', 'Footers')
@section('page-title', 'Footers')

@push('head')
    <meta name="footers-base-url" content="{{ route('footers.index') }}">
    @vite('resources/css/views/footers/index.css')
@endpush

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
        <div class="card fl-card">
            <table class="fl-table w-full">
                <thead>
                    <tr>
                        <th class="table-header rounded-tl-lg">Footer</th>
                        <th class="table-header">Estado</th>
                        <th class="table-header">Páginas</th>
                        <th class="table-header">Creado</th>
                        <th class="table-header">Actualizado</th>
                        <th class="table-header rounded-tr-lg text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($footers as $footer)
                        @php $pageCount = $footer->pages->count(); @endphp
                        <tr class="table-row" id="footer-row-{{ $footer->id }}" data-footer-row>
                            <td class="py-3 px-4 fl-cell-name">
                                <div class="fl-name">
                                    <span class="fl-name-icon"><i class="ri-layout-bottom-line"></i></span>
                                    <span class="fl-name-text">{{ $footer->name }}</span>
                                </div>
                            </td>
                            <td class="py-3 px-4 fl-cell-nowrap" data-label="Estado">
                                <span
                                    class="badge fl-status {{ $footer->is_active ? 'badge-success' : 'badge-danger' }}"
                                    id="footer-badge-{{ $footer->id }}">
                                    {{ $footer->is_active ? 'Activo' : 'Inactivo' }}
                                </span>
                            </td>
                            <td class="py-3 px-4 fl-cell-nowrap" data-label="Páginas">
                                @if ($pageCount > 0)
                                    <div class="relative inline-block" data-dropdown>
                                        <button type="button"
                                            class="badge badge-info flex items-center gap-1 cursor-pointer dropdown-trigger"
                                            title="Ver páginas vinculadas">
                                            <i class="ri-pages-line"></i>
                                            {{ $pageCount }} {{ $pageCount === 1 ? 'página' : 'páginas' }}
                                        </button>
                                        <div class="dropdown-menu dropdown-menu-bottom footer-pages-dropdown">
                                            @foreach ($footer->pages as $page)
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
                                    <span class="fl-muted">Sin páginas</span>
                                @endif
                            </td>
                            <td class="py-3 px-4 fl-cell-nowrap" data-label="Creado">
                                <div class="fl-date" title="{{ $footer->created_at->format('d/m/Y H:i:s') }}">
                                    <span class="fl-date-main">{{ $footer->created_at->format('d/m/Y') }}</span>
                                    <span class="fl-date-sub">{{ $footer->created_at->format('H:i') }}</span>
                                </div>
                            </td>
                            <td class="py-3 px-4 fl-cell-nowrap" data-label="Actualizado">
                                <div class="fl-date" title="{{ $footer->updated_at->format('d/m/Y H:i:s') }}">
                                    <span class="fl-date-main">{{ $footer->updated_at->format('d/m/Y') }}</span>
                                    <span class="fl-date-sub">{{ $footer->updated_at->diffForHumans() }}</span>
                                </div>
                            </td>
                            <td class="py-3 px-4 fl-cell-actions">
                                <div class="fl-actions">
                                    @canany(['footers.view', 'footers.manage'])
                                        <a href="{{ route('footers.preview', $footer->id) }}" target="_blank"
                                            rel="noopener" class="fl-action" title="Previsualizar">
                                            <i class="ri-eye-line"></i>
                                        </a>
                                    @endcanany
                                    @canany(['footers.edit', 'footers.manage'])
                                        <a href="{{ route('footers.edit', $footer->id) }}" class="fl-action"
                                            title="Editar">
                                            <i class="ri-edit-line"></i>
                                        </a>
                                    @endcanany
                                    @canany(['footers.toggle', 'footers.manage'])
                                        <button type="button" data-toggle-active data-footer-id="{{ $footer->id }}"
                                            data-active="{{ $footer->is_active ? '1' : '0' }}"
                                            data-page-count="{{ $pageCount }}"
                                            title="{{ $footer->is_active ? 'Desactivar' : 'Activar' }}"
                                            class="fl-action">
                                            <i
                                                class="{{ $footer->is_active ? 'ri-toggle-fill text-green-500' : 'ri-toggle-line text-gray-400' }} text-2xl"></i>
                                        </button>
                                    @endcanany
                                    @canany(['footers.delete', 'footers.manage'])
                                        <button type="button" data-delete-footer data-footer-id="{{ $footer->id }}"
                                            data-footer-name="{{ $footer->name }}"
                                            data-page-count="{{ $pageCount }}"
                                            title="{{ $pageCount > 0 ? 'No se puede eliminar: tiene páginas vinculadas' : 'Eliminar' }}"
                                            class="fl-action fl-action-danger {{ $pageCount > 0 ? 'fl-action-locked' : '' }}">
                                            <i class="ri-delete-bin-line"></i>
                                        </button>
                                    @endcanany
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/footers/index.js')
@endpush