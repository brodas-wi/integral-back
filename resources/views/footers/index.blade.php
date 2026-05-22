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
    <div class="card">
        @if ($footers->isEmpty())
            <div class="text-center py-12 text-gray-500">
                <i class="ri-layout-bottom-line text-4xl mb-3 block"></i>
                <p class="mb-4">No hay footers creados aún.</p>
                <a href="{{ route('footers.create') }}" class="btn-primary btn-sm inline-flex">
                    <i class="ri-add-line mr-1"></i> Crear primer footer
                </a>
            </div>
        @else
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="table-header rounded-tl-lg">Nombre</th>
                        <th class="table-header">Estado</th>
                        <th class="table-header">Páginas</th>
                        <th class="table-header">Actualizado</th>
                        <th class="table-header rounded-tr-lg text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($footers as $footer)
                        @php $pageCount = $footer->pages->count(); @endphp
                        <tr class="table-row" id="footer-row-{{ $footer->id }}">
                            <td class="py-3 px-4 font-medium text-secondary">
                                {{ $footer->name }}
                            </td>
                            <td class="py-3 px-4">
                                <span class="badge {{ $footer->is_active ? 'badge-success' : 'badge-danger' }}"
                                    id="footer-badge-{{ $footer->id }}">
                                    {{ $footer->is_active ? 'Activo' : 'Inactivo' }}
                                </span>
                            </td>
                            <td class="py-3 px-4">
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
                                    <span class="text-xs text-gray-400">Sin páginas</span>
                                @endif
                            </td>
                            <td class="py-3 px-4 text-sm text-gray-500">
                                {{ $footer->updated_at->format('d/m/Y H:i') }}
                            </td>
                            <td class="py-3 px-4">
                                <div class="flex justify-end gap-2 items-center">
                                    @canany(['footers.view', 'footers.manage'])
                                        <a href="{{ route('footers.preview', $footer->id) }}" target="_blank"
                                            class="btn-outline btn-sm">
                                            <i class="ri-eye-line mr-1"></i> Previsualizar
                                        </a>
                                    @endcanany
                                    @canany(['footers.edit', 'footers.manage'])
                                        <a href="{{ route('footers.edit', $footer->id) }}" class="btn-outline btn-sm">
                                            <i class="ri-edit-line mr-1"></i> Editar
                                        </a>
                                    @endcanany
                                    @canany(['footers.toggle', 'footers.manage'])
                                        <button data-toggle-active data-footer-id="{{ $footer->id }}"
                                            data-active="{{ $footer->is_active ? '1' : '0' }}"
                                            data-page-count="{{ $pageCount }}"
                                            title="{{ $footer->is_active ? 'Desactivar' : 'Activar' }}"
                                            class="btn-sm w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                            <i
                                                class="{{ $footer->is_active ? 'ri-toggle-fill text-green-500' : 'ri-toggle-line text-gray-400' }} text-2xl"></i>
                                        </button>
                                    @endcanany
                                    @canany(['footers.delete', 'footers.manage'])
                                        <button data-delete-footer data-footer-id="{{ $footer->id }}"
                                            data-footer-name="{{ addslashes($footer->name) }}"
                                            data-page-count="{{ $pageCount }}" title="Eliminar"
                                            class="btn-sm w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-red-50 hover:border-red-200 transition-colors text-gray-400 hover:text-red-500">
                                            <i class="ri-delete-bin-line text-lg"></i>
                                        </button>
                                    @endcanany
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/footers/index.js')
@endpush
