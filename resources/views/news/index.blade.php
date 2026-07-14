@extends('layouts.admin')

@section('title', 'Noticias')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Noticias</span>
        <span class="badge bg-primary text-white text-sm">{{ $news->total() }}
            {{ $news->total() === 1 ? 'noticia' : 'noticias' }}</span>
    </div>
@endsection

@section('header-actions')
    @canany(['news.create', 'news.manage'])
        <a href="{{ route('news.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Nueva Noticia</span>
            <span class="btn-tooltip">Nueva Noticia</span>
        </a>
    @endcanany
@endsection

@push('styles')
    @vite('resources/css/views/news/index.css')
@endpush

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('news.index') }}" class="news-filters-grid">
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
                    @foreach ($categories as $cat)
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
                    <option value="published" {{ request('status') == 'published' ? 'selected' : '' }}>Publicado</option>
                    <option value="scheduled" {{ request('status') == 'scheduled' ? 'selected' : '' }}>Programado</option>
                </select>
            </div>
            <div class="news-filter-actions">
                <a href="{{ route('news.index') }}" class="btn-outline">
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
                                        onclick="toggleDropdown(this.closest('.dropdown'))">
                                        <i class="ri-more-2-fill text-lg"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        @canany(['news.edit', 'news.manage'])
                                            <button type="button" data-news-toggle="{{ $item->id }}"
                                                data-toggle-url="{{ route('news.toggle-status', $item) }}"
                                                class="dropdown-item {{ $item->is_active ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50' }}">
                                                <i
                                                    class="{{ $item->is_active ? 'ri-close-circle-line' : 'ri-checkbox-circle-line' }}"></i>
                                                <span>{{ $item->is_active ? 'Desactivar' : 'Activar' }}</span>
                                            </button>
                                        @endcanany
                                        @canany(['news.delete', 'news.manage'])
                                            <button type="button" data-news-delete="{{ $item->id }}"
                                                data-news-title="{{ addslashes($item->title) }}" class="dropdown-item-danger">
                                                <i class="ri-delete-bin-line"></i>
                                                <span>Eliminar</span>
                                            </button>
                                        @endcanany
                                    </div>
                                </div>
                            @endcanany
                        </div>

                        @canany(['news.delete', 'news.manage'])
                            <form id="delete-form-{{ $item->id }}" action="{{ route('news.destroy', $item) }}"
                                method="POST" class="hidden">
                                @csrf
                                @method('DELETE')
                            </form>
                        @endcanany
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
            {{ $news->links() }}
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/news/index.js')
@endpush
