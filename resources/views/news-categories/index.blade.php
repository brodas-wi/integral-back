@extends('layouts.admin')

@section('title', 'Categorías de Noticias')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Categorías de Noticias</span>
        <span class="badge bg-primary text-white text-sm">{{ $categories->total() }}
            {{ $categories->total() === 1 ? 'categoría' : 'categorías' }}</span>
    </div>
@endsection

@section('header-actions')
    @canany(['news_categories.manage'])
        <a href="{{ route('news-categories.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Nueva Categoría</span>
            <span class="btn-tooltip">Nueva Categoría</span>
        </a>
    @endcanany
@endsection

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('news-categories.index') }}" class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label for="search" class="block text-sm font-medium text-secondary mb-2">Buscar</label>
                <div class="relative">
                    <input type="text" id="search" name="search" value="{{ request('search') }}"
                        placeholder="Nombre de la categoría..." class="input-field pl-10">
                    <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>
            <div>
                <label for="status" class="block text-sm font-medium text-secondary mb-2">Estado</label>
                <select id="status" name="status" class="input-field">
                    <option value="">Todos</option>
                    <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Activas</option>
                    <option value="inactive" {{ request('status') == 'inactive' ? 'selected' : '' }}>Inactivas</option>
                </select>
            </div>
            <div class="flex items-end gap-3">
                <a href="{{ route('news-categories.index') }}" class="btn-outline">
                    <i class="ri-close-line mr-2"></i> Limpiar
                </a>
                <button type="submit" class="btn-secondary">
                    <i class="ri-filter-3-line mr-2"></i> Filtrar
                </button>
            </div>
        </form>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        @forelse($categories as $category)
            <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full p-4">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex-1 min-w-0">
                        <h3 class="text-base font-bold text-secondary truncate">{{ $category->name }}</h3>
                        <p class="text-[11px] text-gray-500 font-mono truncate mb-2">/{{ $category->slug }}</p>
                        <span class="badge {{ $category->is_active ? 'badge-success' : 'badge-danger' }} text-xs">
                            <i class="ri-{{ $category->is_active ? 'checkbox-circle' : 'close-circle' }}-line mr-1"></i>
                            {{ $category->is_active ? 'Activa' : 'Inactiva' }}
                        </span>
                    </div>
                    <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded flex-shrink-0 ml-2">
                        {{ $category->news_count }} {{ $category->news_count === 1 ? 'noticia' : 'noticias' }}
                    </span>
                </div>

                <div class="mt-auto pt-3 border-t border-gray-100">
                    @canany(['news_categories.manage'])
                        <div class="flex items-center gap-2">
                            <a href="{{ route('news-categories.edit', $category) }}"
                                class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                <i class="ri-edit-line"></i>
                                <span>Editar</span>
                            </a>

                            <div class="dropdown" data-dropdown>
                                <button type="button"
                                    class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                    onclick="toggleDropdown(this.closest('.dropdown'))">
                                    <i class="ri-more-2-fill text-lg"></i>
                                </button>
                                <div class="dropdown-menu">
                                    <button type="button" data-category-toggle="{{ $category->id }}"
                                        data-toggle-url="{{ route('news-categories.toggle-status', $category) }}"
                                        class="dropdown-item {{ $category->is_active ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50' }}">
                                        <i
                                            class="{{ $category->is_active ? 'ri-close-circle-line' : 'ri-checkbox-circle-line' }}"></i>
                                        <span>{{ $category->is_active ? 'Desactivar' : 'Activar' }}</span>
                                    </button>
                                    <button type="button" data-category-delete="{{ $category->id }}"
                                        data-category-name="{{ addslashes($category->name) }}"
                                        data-delete-url="{{ route('news-categories.destroy', $category) }}"
                                        class="dropdown-item-danger">
                                        <i class="ri-delete-bin-line"></i>
                                        <span>Eliminar</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    @endcanany
                </div>
            </div>
        @empty
            <div class="col-span-full card text-center py-12">
                <i class="ri-folder-line text-6xl text-gray-400 mb-4"></i>
                <h3 class="text-xl font-semibold text-secondary mb-2">No hay categorías</h3>
                <p class="text-gray-600">
                    @if (request()->hasAny(['search', 'status']))
                        No se encontraron categorías con los filtros aplicados
                    @else
                        No hay categorías registradas
                    @endif
                </p>
            </div>
        @endforelse
    </div>

    @if ($categories->hasPages())
        <div class="mt-6">
            {{ $categories->links() }}
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/news-categories/index.js')
@endpush
