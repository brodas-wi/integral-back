@extends('layouts.admin')

@section('title', 'Papelera de Banners')

@section('page-title')
    <div class="flex items-center gap-3">
        <a href="{{ route('banners.index') }}" class="text-gray-400 hover:text-secondary transition-colors">
            <i class="ri-arrow-left-line text-xl"></i>
        </a>
        <span>Papelera de Banners</span>
        <span class="badge badge-danger">{{ $banners->total() }}
            {{ $banners->total() === 1 ? 'elemento' : 'elementos' }}</span>
    </div>
@endsection

@push('styles')
    @vite('resources/css/views/banners/banners.css')
@endpush

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('banners.trashed') }}" class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <input type="text" name="search" value="{{ request('search') }}"
                    placeholder="Buscar por título o categoría..." class="input-field">
            </div>
            <div class="flex items-center gap-2">
                <button type="submit" class="btn-secondary whitespace-nowrap">
                    <i class="ri-search-line mr-2"></i>Buscar
                </button>
                @if (request('search'))
                    <a href="{{ route('banners.trashed') }}" class="btn-outline whitespace-nowrap">
                        <i class="ri-close-line mr-2"></i>Limpiar
                    </a>
                @endif
            </div>
        </form>
    </div>

    @if ($banners->count() > 0)
        <div class="card">
            <div class="space-y-4">
                @foreach ($banners as $banner)
                    <div class="border border-gray-200 rounded-lg p-4 bg-gray-50" id="trashed-item-{{ $banner->id }}">
                        <div class="flex items-start gap-4">

                            <div class="w-32 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 opacity-60">
                                <img src="{{ $banner->image_url }}" alt="{{ $banner->image_alt ?? $banner->title }}"
                                    class="w-full h-full object-cover">
                            </div>

                            <div class="flex-1 min-w-0 opacity-75">
                                <div class="flex items-center gap-2 mb-1 flex-wrap">
                                    <span class="badge badge-danger">Eliminado</span>
                                    @if ($banner->category)
                                        <span class="badge badge-info">{{ $banner->category }}</span>
                                    @endif
                                    <span class="text-xs text-gray-400">
                                        Eliminado {{ $banner->deleted_at->diffForHumans() }}
                                    </span>
                                </div>
                                <h3 class="font-bold text-secondary text-base mb-1 truncate">{{ $banner->title }}</h3>
                                <p class="text-sm text-gray-500 line-clamp-2">{{ $banner->description }}</p>
                                <p class="text-xs text-gray-400 mt-1">
                                    Eliminado por {{ $banner->updater?->name ?? 'N/A' }}
                                </p>
                            </div>

                            <div class="flex items-center gap-2 flex-shrink-0">
                                <button type="button"
                                    class="btn-sm px-3 h-10 flex items-center gap-2 rounded-lg border border-green-300 text-green-700 hover:bg-green-50 transition-colors restore-btn"
                                    data-id="{{ $banner->id }}" data-name="{{ addslashes($banner->title) }}">
                                    <i class="ri-restart-line"></i>
                                    <span class="hidden sm:inline">Restaurar</span>
                                </button>

                                <button type="button"
                                    class="btn-sm px-3 h-10 flex items-center gap-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition-colors force-delete-btn"
                                    data-id="{{ $banner->id }}" data-name="{{ addslashes($banner->title) }}">
                                    <i class="ri-delete-bin-2-line"></i>
                                    <span class="hidden sm:inline">Eliminar definitivo</span>
                                </button>
                            </div>

                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        @if ($banners->hasPages())
            <div class="mt-6">
                {{ $banners->appends(request()->query())->links() }}
            </div>
        @endif
    @else
        <div class="card text-center py-12">
            <i class="ri-delete-bin-line text-6xl text-gray-300 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">La papelera está vacía</h3>
            <p class="text-gray-500 mb-6">No hay banners eliminados.</p>
            <a href="{{ route('banners.index') }}" class="btn-outline inline-flex items-center">
                <i class="ri-arrow-left-line mr-2"></i>Volver a Banners
            </a>
        </div>
    @endif

    <meta name="banners-restore-url" content="{{ url('banners') }}">
    <meta name="banners-force-delete-url" content="{{ url('banners') }}">
@endsection

@push('scripts')
    @vite('resources/js/views/banners/trashed.js')
@endpush
