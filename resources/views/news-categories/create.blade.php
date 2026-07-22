@extends('layouts.admin')

@section('title', 'Nueva Categoría de Noticias')

@section('page-title', 'Nueva Categoría de Noticias')

@section('content')
    <div class="max-w-2xl">
        <div class="card space-y-5" id="news-category-form-container" data-mode="create">
            <div>
                <label for="name" class="block text-sm font-medium text-secondary mb-2">Nombre *</label>
                <input type="text" id="name" name="name" class="input-field">
                <p class="text-sm text-red-600 mt-1 hidden" data-error-for="name"></p>
            </div>

            <div class="flex items-center gap-3">
                <input type="checkbox" id="is_active" name="is_active" value="1" checked
                    class="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary">
                <label for="is_active" class="text-sm font-medium text-secondary">Categoría activa</label>
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <a href="{{ route('news.index', ['tab' => 'categorias']) }}" class="btn-outline">Cancelar</a>
                <button type="button" id="news-category-form-submit" class="btn-primary">
                    <i class="ri-save-line mr-2"></i> Guardar Categoría
                </button>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/news-categories/form.js')
@endpush
