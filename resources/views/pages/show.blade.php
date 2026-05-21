@extends('layouts.admin')

@section('title', 'Detalles de Página')
@section('page-title', 'Detalles de la Página')

@push('head')
    <meta name="pages-index-url" content="{{ route('pages.index') }}">
@endpush

@section('header-actions')
    <div class="flex items-center gap-2">
        <a href="{{ route('pages.index') }}" class="btn-outline btn-sm btn-header-action">
            <i class="ri-arrow-left-line sm:mr-2"></i>
            <span class="btn-text">Volver</span>
            <span class="btn-tooltip">Volver</span>
        </a>
    </div>
@endsection

@section('content')
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
            <div class="card">
                <div class="flex items-start justify-between mb-6">
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold text-secondary mb-2">{{ $page->title }}</h2>
                        <p class="text-sm text-gray-600 font-mono">{{ $page->slug }}</p>
                    </div>
                    <span class="badge {{ $page->is_published ? 'badge-success' : 'badge-warning' }} text-base">
                        <i class="ri-{{ $page->is_published ? 'eye' : 'eye-off' }}-line mr-1"></i>
                        {{ $page->is_published ? 'Publicada' : 'Borrador' }}
                    </span>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">URL Pública</label>
                        <div class="flex items-center gap-2">
                            <input type="text" value="{{ route('page.preview', $page->slug) }}" readonly
                                class="input-field flex-1 bg-gray-50">
                            <a href="{{ route('page.preview', $page->slug) }}" target="_blank"
                                class="btn-secondary whitespace-nowrap">
                                <i class="ri-external-link-line mr-1"></i>
                                Abrir
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3 class="text-lg font-bold text-secondary mb-4">Estadísticas de Contenido</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-xs text-gray-600 mb-1">HTML</div>
                        <div class="text-lg font-bold text-secondary">
                            {{ $page->html_content ? number_format(strlen($page->html_content)) : '0' }}
                            <span class="text-xs font-normal text-gray-600">caracteres</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-xs text-gray-600 mb-1">CSS</div>
                        <div class="text-lg font-bold text-secondary">
                            {{ $page->css_content ? number_format(strlen($page->css_content)) : '0' }}
                            <span class="text-xs font-normal text-gray-600">caracteres</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-xs text-gray-600 mb-1">JavaScript</div>
                        <div class="text-lg font-bold text-secondary">
                            {{ $page->js_content ? number_format(strlen($page->js_content)) : '0' }}
                            <span class="text-xs font-normal text-gray-600">caracteres</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div class="card">
                    <h3 class="text-lg font-bold text-secondary mb-4">Navbar</h3>
                    <div class="space-y-3">
                        <p class="text-sm text-gray-600">Navbar que se mostrará en esta página.</p>
                        <select id="navbar-select" class="input-field">
                            <option value="">— Sin navbar —</option>
                            @foreach (\App\Models\Navbar::orderBy('name')->get() as $navbar)
                                <option value="{{ $navbar->id }}"
                                    {{ $page->navbar_id == $navbar->id ? 'selected' : '' }}>
                                    {{ $navbar->name }}{{ !$navbar->is_active ? ' (inactivo)' : '' }}
                                </option>
                            @endforeach
                        </select>
                        <button id="save-navbar-relation" class="btn-primary btn-sm w-full">
                            <i class="ri-save-line mr-2"></i>Guardar navbar
                        </button>
                    </div>
                </div>

                <div class="card">
                    <h3 class="text-lg font-bold text-secondary mb-4">Footer</h3>
                    <div class="space-y-3">
                        <p class="text-sm text-gray-600">Footer que se mostrará en esta página.</p>
                        <select id="footer-select" class="input-field">
                            <option value="">— Sin footer —</option>
                            @foreach (\App\Models\Footer::orderBy('name')->get() as $footer)
                                <option value="{{ $footer->id }}"
                                    {{ $page->footer_id == $footer->id ? 'selected' : '' }}>
                                    {{ $footer->name }}{{ !$footer->is_active ? ' (inactivo)' : '' }}
                                </option>
                            @endforeach
                        </select>
                        <button id="save-footer-relation" class="btn-primary btn-sm w-full">
                            <i class="ri-save-line mr-2"></i>Guardar footer
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="space-y-6">
            <div class="card">
                <h3 class="text-lg font-bold text-secondary mb-4">Información</h3>
                <div class="space-y-3">
                    <div>
                        <div class="text-xs font-medium text-gray-600 mb-1">Creado por</div>
                        <div class="text-sm font-semibold text-secondary">
                            {{ $page->creator->name ?? 'N/A' }}
                        </div>
                    </div>
                    <div>
                        <div class="text-xs font-medium text-gray-600 mb-1">Fecha de creación</div>
                        <div class="text-sm font-semibold text-secondary">
                            {{ $page->created_at->format('d/m/Y H:i') }}
                        </div>
                    </div>
                    @if ($page->editor)
                        <div>
                            <div class="text-xs font-medium text-gray-600 mb-1">Última edición por</div>
                            <div class="text-sm font-semibold text-secondary">
                                {{ $page->editor->name }}
                            </div>
                        </div>
                    @endif
                    <div>
                        <div class="text-xs font-medium text-gray-600 mb-1">Última actualización</div>
                        <div class="text-sm font-semibold text-secondary">
                            {{ $page->updated_at->format('d/m/Y H:i') }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3 class="text-lg font-bold text-secondary mb-4">Acciones</h3>
                <div class="space-y-2">
                    @canany(['pages.edit', 'pages.manage'])
                        <a href="{{ route('pages.edit', $page->slug) }}" class="btn-secondary btn-sm w-full">
                            <i class="ri-edit-line mr-2"></i>
                            Editar
                        </a>
                    @endcanany

                    @canany(['pages.publish', 'pages.manage'])
                        <button type="button" data-toggle-publish data-slug="{{ $page->slug }}"
                            data-published="{{ $page->is_published ? '1' : '0' }}" class="btn-primary btn-sm w-full">
                            <i class="ri-{{ $page->is_published ? 'eye-off' : 'eye' }}-line mr-2"></i>
                            {{ $page->is_published ? 'Despublicar' : 'Publicar' }}
                        </button>
                    @endcanany

                    @canany(['pages.delete', 'pages.manage'])
                        <button type="button" data-delete-page data-slug="{{ $page->slug }}"
                            data-page-title="{{ addslashes($page->title) }}" class="btn-danger btn-sm w-full">
                            <i class="ri-delete-bin-line mr-2"></i>
                            Eliminar
                        </button>
                    @endcanany
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/pages/show.js')
@endpush
