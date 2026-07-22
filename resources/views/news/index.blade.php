@extends('layouts.admin')

@section('title', 'Noticias')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Noticias</span>
        @if ($tab === 'noticias')
            <span class="badge bg-primary text-white text-sm">{{ $news->total() }}
                {{ $news->total() === 1 ? 'noticia' : 'noticias' }}</span>
        @else
            <span class="badge bg-primary text-white text-sm">{{ $categoriesList->total() }}
                {{ $categoriesList->total() === 1 ? 'categoría' : 'categorías' }}</span>
        @endif
    </div>
@endsection

@section('header-actions')
    @if ($tab === 'noticias')
        @canany(['news.create', 'news.manage'])
            <a href="{{ route('news.create') }}" class="btn-primary btn-sm btn-header-action">
                <i class="ri-add-line sm:mr-2"></i>
                <span class="btn-text">Nueva Noticia</span>
                <span class="btn-tooltip">Nueva Noticia</span>
            </a>
        @endcanany
    @else
        @canany(['news_categories.manage'])
            <a href="{{ route('news-categories.create') }}" class="btn-primary btn-sm btn-header-action">
                <i class="ri-add-line sm:mr-2"></i>
                <span class="btn-text">Nueva Categoría</span>
                <span class="btn-tooltip">Nueva Categoría</span>
            </a>
        @endcanany
    @endif
@endsection

@push('styles')
    @vite('resources/css/views/news/index.css')
@endpush

@section('content')
    <div class="flex border-b border-gray-200 mb-6">
        <a href="{{ route('news.index', ['tab' => 'noticias']) }}"
            class="news-tab-link {{ $tab === 'noticias' ? 'news-tab-active' : 'news-tab-inactive' }}">
            <i class="ri-newspaper-line mr-1"></i> Noticias
        </a>
        <a href="{{ route('news.index', ['tab' => 'categorias']) }}"
            class="news-tab-link {{ $tab === 'categorias' ? 'news-tab-active' : 'news-tab-inactive' }}">
            <i class="ri-folder-line mr-1"></i> Categorías
        </a>
    </div>

    @if ($tab === 'noticias')
        <div class="card mb-6">
            <form method="GET" action="{{ route('news.index') }}" class="news-filters-grid" id="news-filters-form">
                <input type="hidden" name="tab" value="noticias">
                <div class="news-filter-field">
                    <label for="search" class="block text-sm font-medium text-secondary mb-2">Buscar</label>
                    <div class="relative">
                        <input type="text" id="search" name="search" value="{{ request('search') }}"
                            placeholder="Título..." class="input-field pl-10">
                        <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>
                <div class="news-filter-field">
                    <label for="category" class="block text-sm font-medium text-secondary mb-2">Categoría</label>
                    <select id="category" name="category" class="input-field">
                        <option value="">Todas</option>
                        @foreach ($categoriesFilter as $cat)
                            <option value="{{ $cat->id }}" {{ request('category') == $cat->id ? 'selected' : '' }}>
                                {{ $cat->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="news-filter-field">
                    <label for="status" class="block text-sm font-medium text-secondary mb-2">Estado</label>
                    <select id="status" name="status" class="input-field">
                        <option value="">Todos</option>
                        <option value="draft" {{ request('status') == 'draft' ? 'selected' : '' }}>Borrador</option>
                        <option value="published" {{ request('status') == 'published' ? 'selected' : '' }}>Publicado
                        </option>
                        <option value="scheduled" {{ request('status') == 'scheduled' ? 'selected' : '' }}>Programado
                        </option>
                    </select>
                </div>
                <div class="news-filter-actions">
                    <a href="{{ route('news.index', ['tab' => 'noticias']) }}" class="btn-outline">
                        <i class="ri-close-line mr-2"></i> Limpiar
                    </a>
                    <button type="submit" class="btn-secondary">
                        <i class="ri-filter-3-line mr-2"></i> Filtrar
                    </button>
                </div>
            </form>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @forelse($news as $item)
                <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full overflow-hidden p-0">
                    <div class="h-36 bg-gray-100 overflow-hidden">
                        @if ($item->featured_image)
                            <img src="{{ $item->featured_image }}" alt="{{ $item->title }}"
                                class="w-full h-full object-cover">
                        @else
                            <div class="w-full h-full flex items-center justify-center text-gray-400">
                                <i class="ri-image-line text-4xl"></i>
                            </div>
                        @endif
                    </div>

                    <div class="p-4 flex flex-col flex-1">
                        <div class="flex items-center gap-1.5 mb-2 flex-wrap">
                            <span class="badge {{ $item->statusBadgeClass() }} text-xs">{{ $item->statusLabel() }}</span>
                            @if ($item->category)
                                <span class="badge bg-secondary text-white text-xs">{{ $item->category->name }}</span>
                            @endif
                        </div>

                        <h3 class="text-base font-bold text-secondary mb-1 line-clamp-2">{{ $item->title }}</h3>
                        <p class="text-sm text-gray-500 line-clamp-2 mb-3">{{ $item->description }}</p>

                        <div class="mt-auto pt-3 border-t border-gray-100">
                            <div class="flex items-center gap-2">
                                @canany(['news.edit', 'news.manage'])
                                    <a href="{{ route('news.edit', $item) }}"
                                        class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                        <i class="ri-edit-line"></i>
                                        <span>Editar</span>
                                    </a>
                                @endcanany

                                <a href="{{ route('news.show', $item) }}"
                                    class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                    title="Vista previa">
                                    <i class="ri-eye-line text-lg"></i>
                                </a>

                                @canany(['news.edit', 'news.delete', 'news.manage'])
                                    <div class="dropdown" data-dropdown>
                                        <button type="button"
                                            class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                            data-dropdown-toggle>
                                            <i class="ri-more-2-fill text-lg"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                            @canany(['news.edit', 'news.manage'])
                                                <button type="button" data-news-toggle data-news-id="{{ $item->id }}"
                                                    class="dropdown-item {{ $item->is_active ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50' }}">
                                                    <i
                                                        class="{{ $item->is_active ? 'ri-close-circle-line' : 'ri-checkbox-circle-line' }}"></i>
                                                    <span>{{ $item->is_active ? 'Desactivar' : 'Activar' }}</span>
                                                </button>
                                            @endcanany
                                            @canany(['news.delete', 'news.manage'])
                                                <button type="button" data-news-delete data-news-id="{{ $item->id }}"
                                                    data-news-title="{{ addslashes($item->title) }}" class="dropdown-item-danger">
                                                    <i class="ri-delete-bin-line"></i>
                                                    <span>Eliminar</span>
                                                </button>
                                            @endcanany
                                        </div>
                                    </div>
                                @endcanany
                            </div>
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-span-full card text-center py-12">
                    <i class="ri-newspaper-line text-6xl text-gray-400 mb-4"></i>
                    <h3 class="text-xl font-semibold text-secondary mb-2">No hay noticias</h3>
                    <p class="text-gray-600">
                        @if (request()->hasAny(['search', 'category', 'status']))
                            No se encontraron noticias con los filtros aplicados
                        @else
                            No hay noticias registradas
                        @endif
                    </p>
                </div>
            @endforelse
        </div>

        @if ($news->hasPages())
            <div class="mt-6">
                {{ $news->appends(['tab' => 'noticias'])->links() }}
            </div>
        @endif
    @else
        <div class="card mb-6">
            <form method="GET" action="{{ route('news.index') }}" class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="hidden" name="tab" value="categorias">
                <div>
                    <label for="cat-search" class="block text-sm font-medium text-secondary mb-2">Buscar</label>
                    <div class="relative">
                        <input type="text" id="cat-search" name="search" value="{{ request('search') }}"
                            placeholder="Nombre de la categoría..." class="input-field pl-10">
                        <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                    </div>
                </div>
                <div>
                    <label for="cat-status" class="block text-sm font-medium text-secondary mb-2">Estado</label>
                    <select id="cat-status" name="status" class="input-field">
                        <option value="">Todos</option>
                        <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Activas</option>
                        <option value="inactive" {{ request('status') == 'inactive' ? 'selected' : '' }}>Inactivas
                        </option>
                    </select>
                </div>
                <div class="flex items-end gap-3">
                    <a href="{{ route('news.index', ['tab' => 'categorias']) }}" class="btn-outline">
                        <i class="ri-close-line mr-2"></i> Limpiar
                    </a>
                    <button type="submit" class="btn-secondary">
                        <i class="ri-filter-3-line mr-2"></i> Filtrar
                    </button>
                </div>
            </form>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            @forelse($categoriesList as $category)
                <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full p-4">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1 min-w-0">
                            <h3 class="text-base font-bold text-secondary truncate">{{ $category->name }}</h3>
                            <p class="text-[11px] text-gray-500 font-mono truncate mb-2">/{{ $category->slug }}</p>
                            <span class="badge {{ $category->is_active ? 'badge-success' : 'badge-danger' }} text-xs">
                                <i
                                    class="ri-{{ $category->is_active ? 'checkbox-circle' : 'close-circle' }}-line mr-1"></i>
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
                                        data-dropdown-toggle>
                                        <i class="ri-more-2-fill text-lg"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <button type="button" data-category-toggle data-category-id="{{ $category->id }}"
                                            class="dropdown-item {{ $category->is_active ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50' }}">
                                            <i
                                                class="{{ $category->is_active ? 'ri-close-circle-line' : 'ri-checkbox-circle-line' }}"></i>
                                            <span>{{ $category->is_active ? 'Desactivar' : 'Activar' }}</span>
                                        </button>
                                        <button type="button" data-category-delete data-category-id="{{ $category->id }}"
                                            data-category-name="{{ addslashes($category->name) }}"
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

        @if ($categoriesList->hasPages())
            <div class="mt-6">
                {{ $categoriesList->appends(['tab' => 'categorias'])->links() }}
            </div>
        @endif
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/news/index.js')
@endpush
