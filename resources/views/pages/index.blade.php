@extends('layouts.admin')

@section('title', 'Páginas')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Páginas</span>
        <span class="badge badge-info">{{ $stats['total'] }} {{ $stats['total'] === 1 ? 'página' : 'páginas' }}</span>
    </div>
@endsection

@section('header-actions')
    @canany(['pages.create', 'pages.manage'])
        <a href="{{ route('pages.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Crear</span>
            <span class="btn-tooltip">Crear</span>
        </a>
    @endcanany
@endsection

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('pages.index') }}" class="space-y-4">
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                    <input type="text" name="search" value="{{ request('search') }}"
                        placeholder="Buscar por título o slug..." class="input-field">
                </div>
                <select name="status" class="input-field sm:w-48">
                    <option value="">Todos los estados</option>
                    <option value="published" {{ request('status') === 'published' ? 'selected' : '' }}>Publicadas</option>
                    <option value="draft" {{ request('status') === 'draft' ? 'selected' : '' }}>Borradores</option>
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
                        <option value="10" {{ request('per_page', 10) == 10 ? 'selected' : '' }}>10</option>
                        <option value="20" {{ request('per_page', 10) == 20 ? 'selected' : '' }}>20</option>
                        <option value="30" {{ request('per_page', 10) == 30 ? 'selected' : '' }}>30</option>
                    </select>
                </div>
                <div class="flex items-end gap-2">
                    <button type="submit" class="btn-secondary whitespace-nowrap">
                        <i class="ri-search-line mr-2"></i>
                        Buscar
                    </button>
                    @if(request('search') || request('status') || request('date_from') || request('date_to'))
                        <a href="{{ route('pages.index') }}" class="btn-outline whitespace-nowrap">
                            <i class="ri-close-line mr-2"></i>
                            Limpiar
                        </a>
                    @endif
                </div>
            </div>
        </form>
    </div>

    @if($pages->count() > 0)
        <div class="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(330px,1fr))]">
            @foreach($pages as $page)
                <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full p-4" id="page-item-{{ $page->id }}">
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div class="flex-1 min-w-0">
                            <h3 class="text-base font-bold text-secondary mb-1 line-clamp-2">{{ $page->title }}</h3>
                            <button type="button"
                                data-copy-slug
                                data-slug="{{ $page->slug }}"
                                class="text-[11px] text-gray-500 font-mono truncate max-w-full inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0">
                                <i class="ri-file-copy-line text-[11px]"></i>
                                <span class="truncate">{{ $page->slug }}</span>
                            </button>
                        </div>
                        <span class="badge {{ $page->is_published ? 'badge-success' : 'badge-warning' }} flex-shrink-0 whitespace-nowrap">
                            <i class="ri-{{ $page->is_published ? 'eye' : 'eye-off' }}-line mr-1"></i>
                            {{ $page->is_published ? 'Publicada' : 'Borrador' }}
                        </span>
                    </div>

                    <div class="space-y-1.5 flex-1">
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>ID:</span>
                            <span class="font-semibold text-secondary font-mono">{{ $page->id }}</span>
                        </div>

                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Creado:</span>
                            <span class="font-semibold text-secondary">{{ $page->created_at->format('d/m/Y H:i') }}</span>
                        </div>

                        @if($page->creator)
                            <div class="flex items-center justify-between text-sm text-gray-600">
                                <span>Por:</span>
                                <span class="font-semibold text-secondary truncate ml-2">{{ $page->creator->name }}</span>
                            </div>
                        @endif

                        @if($page->updated_at->ne($page->created_at))
                            <div class="flex items-center justify-between text-sm text-gray-600">
                                <span>Actualizado:</span>
                                <span class="font-semibold text-secondary">{{ $page->updated_at->format('d/m/Y H:i') }}</span>
                            </div>

                            @if($page->editor)
                                <div class="flex items-center justify-between text-sm text-gray-600">
                                    <span>Por:</span>
                                    <span class="font-semibold text-secondary truncate ml-2">{{ $page->editor->name }}</span>
                                </div>
                            @endif
                        @endif
                    </div>

                    <div class="flex items-center gap-2 mt-1 pt-3 border-t border-gray-100">
                        @canany(['pages.edit', 'pages.manage'])
                            <a href="{{ route('pages.edit', $page->slug) }}"
                                class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                <i class="ri-edit-line"></i>
                                <span>Editar</span>
                            </a>
                        @endcanany

                        <div class="dropdown" data-dropdown>
                            <button type="button" class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                onclick="toggleDropdown(this.closest('.dropdown'))">
                                <i class="ri-more-2-fill text-lg"></i>
                            </button>
                            <div class="dropdown-menu">
                                @canany(['pages.view', 'pages.manage'])
                                    <a href="{{ route('pages.show', $page->slug) }}" class="dropdown-item">
                                        <i class="ri-information-line"></i>
                                        <span>Ver Detalles</span>
                                    </a>
                                @endcanany

                                <a href="{{ route('page.preview', $page->slug) }}" target="_blank" class="dropdown-item">
                                    <i class="ri-external-link-line"></i>
                                    <span>Ver Página</span>
                                </a>

                                @canany(['pages.publish', 'pages.manage'])
                                    <button type="button"
                                        data-toggle-publish
                                        data-slug="{{ $page->slug }}"
                                        data-published="{{ $page->is_published ? '1' : '0' }}"
                                        class="dropdown-item">
                                        <i class="ri-{{ $page->is_published ? 'eye-off' : 'eye' }}-line"></i>
                                        <span>{{ $page->is_published ? 'Despublicar' : 'Publicar' }}</span>
                                    </button>
                                @endcanany

                                @canany(['pages.delete', 'pages.manage'])
                                    <button type="button"
                                        data-delete-page
                                        data-page-id="{{ $page->id }}"
                                        data-page-title="{{ addslashes($page->title) }}"
                                        class="dropdown-item-danger">
                                        <i class="ri-delete-bin-line"></i>
                                        <span>Eliminar</span>
                                    </button>
                                @endcanany
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>

        @if($pages->hasPages())
            <div class="mt-6">
                {{ $pages->appends(request()->query())->links() }}
            </div>
        @endif
    @else
        <div class="card text-center py-12">
            <i class="ri-file-text-line text-6xl text-gray-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">No hay páginas</h3>
            <p class="text-gray-600 mb-6">
                @if(request('search') || request('status') || request('date_from') || request('date_to'))
                    No se encontraron páginas que coincidan con tu búsqueda
                @else
                    Comienza creando tu primera página
                @endif
            </p>
            @if(request('search') || request('status') || request('date_from') || request('date_to'))
                <a href="{{ route('pages.index') }}" class="btn-outline inline-flex items-center">
                    <i class="ri-close-line mr-2"></i>
                    Limpiar búsqueda
                </a>
            @else
                @canany(['pages.create', 'pages.manage'])
                    <a href="{{ route('pages.create') }}" class="btn-primary inline-flex items-center">
                        <i class="ri-add-line mr-2"></i>
                        Crear Primera Página
                    </a>
                @endcanany
            @endif
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/pages/index.js')
@endpush
