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
    <div class="card">
        @if ($navbars->isEmpty())
            <div class="text-center py-12 text-gray-500">
                <i class="ri-layout-top-line text-4xl mb-3 block"></i>
                <p class="mb-4">No hay navbars creados aún.</p>
                <a href="{{ route('navbars.create') }}" class="btn-primary btn-sm inline-flex">
                    <i class="ri-add-line mr-1"></i> Crear primer navbar
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
                    @foreach ($navbars as $navbar)
                        @php $pageCount = $navbar->pages->count(); @endphp
                        <tr class="table-row" id="navbar-row-{{ $navbar->id }}">
                            <td class="py-3 px-4 font-medium text-secondary">
                                {{ $navbar->name }}
                            </td>
                            <td class="py-3 px-4">
                                <span class="badge {{ $navbar->is_active ? 'badge-success' : 'badge-danger' }}"
                                    id="navbar-badge-{{ $navbar->id }}">
                                    {{ $navbar->is_active ? 'Activo' : 'Inactivo' }}
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
                                    <span class="text-xs text-gray-400">Sin páginas</span>
                                @endif
                            </td>
                            <td class="py-3 px-4 text-sm text-gray-500">
                                {{ $navbar->updated_at->format('d/m/Y H:i') }}
                            </td>
                            <td class="py-3 px-4">
                                <div class="flex justify-end gap-2 items-center">
                                    @canany(['navbars.view', 'navbars.manage'])
                                        <a href="{{ route('navbars.preview', $navbar->id) }}" target="_blank"
                                            class="btn-outline btn-sm">
                                            <i class="ri-eye-line mr-1"></i> Preview
                                        </a>
                                    @endcanany
                                    @canany(['navbars.edit', 'navbars.manage'])
                                        <a href="{{ route('navbars.edit', $navbar->id) }}" class="btn-outline btn-sm">
                                            <i class="ri-edit-line mr-1"></i> Editar
                                        </a>
                                    @endcanany
                                    @canany(['navbars.toggle', 'navbars.manage'])
                                        <button data-toggle-active data-navbar-id="{{ $navbar->id }}"
                                            data-active="{{ $navbar->is_active ? '1' : '0' }}"
                                            data-page-count="{{ $pageCount }}"
                                            title="{{ $navbar->is_active ? 'Desactivar' : 'Activar' }}"
                                            class="btn-sm w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                            <i
                                                class="{{ $navbar->is_active ? 'ri-toggle-fill text-green-500' : 'ri-toggle-line text-gray-400' }} text-2xl"></i>
                                        </button>
                                    @endcanany
                                    @canany(['navbars.delete', 'navbars.manage'])
                                        <button data-delete-navbar data-navbar-id="{{ $navbar->id }}"
                                            data-navbar-name="{{ addslashes($navbar->name) }}"
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
    @vite('resources/js/views/navbars/index.js')
@endpush
