@extends('layouts.admin')

@section('title', 'Editar Noticia')

@section('page-title', 'Editar Noticia')

@section('header-actions')
    <div class="flex items-center gap-2">
        @canany(['news.edit', 'news.manage'])
            <button type="button" data-news-toggle data-news-id="{{ $news->id }}"
                class="btn-outline btn-sm {{ $news->is_active ? 'text-orange-600' : 'text-green-600' }}">
                <i class="{{ $news->is_active ? 'ri-close-circle-line' : 'ri-checkbox-circle-line' }} mr-2"></i>
                {{ $news->is_active ? 'Desactivar' : 'Activar' }}
            </button>
        @endcanany
        @canany(['news.delete', 'news.manage'])
            <button type="button" data-news-delete data-news-id="{{ $news->id }}"
                data-news-title="{{ addslashes($news->title) }}" data-news-redirect class="btn-outline btn-sm text-red-600">
                <i class="ri-delete-bin-line mr-2"></i> Eliminar
            </button>
        @endcanany
    </div>
@endsection

@push('styles')
    @vite('resources/css/views/news/form.css')
@endpush

@section('content')
    <div class="max-w-4xl" id="news-page-data" data-news-id="{{ $news->id }}"
        data-redirect-url="{{ route('news.index', ['tab' => 'noticias']) }}">
        <div class="card space-y-6" id="news-form-container" data-mode="edit" data-news-id="{{ $news->id }}"
            data-tinymce-skin-css="{{ Vite::asset('node_modules/tinymce/skins/ui/oxide/skin.min.css') }}"
            data-tinymce-content-css="{{ Vite::asset('node_modules/tinymce/skins/ui/oxide/content.min.css') }}"
            data-tinymce-default-content-css="{{ Vite::asset('node_modules/tinymce/skins/content/default/content.min.css') }}">
            <div>
                <label for="title" class="block text-sm font-medium text-secondary mb-2">Título *</label>
                <input type="text" id="title" name="title" value="{{ $news->title }}" class="input-field">
                <p class="text-sm text-red-600 mt-1 hidden" data-error-for="title"></p>
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-secondary mb-2">Descripción
                    corta</label>
                <textarea id="description" name="description" rows="3" class="input-field">{{ $news->description }}</textarea>
                <p class="text-sm text-red-600 mt-1 hidden" data-error-for="description"></p>
            </div>

            <div>
                <label class="block text-sm font-medium text-secondary mb-2">Imagen destacada</label>
                <div id="news-featured-image-dropzone" data-media-picker
                    class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors overflow-hidden">
                    <div id="news-featured-image-placeholder"
                        class="{{ $news->featured_image ? 'hidden' : '' }} flex flex-col items-center justify-center py-2">
                        <i class="ri-image-add-line text-4xl text-gray-400 mb-2"></i>
                        <p class="text-sm text-gray-500">Haz clic para seleccionar una imagen</p>
                    </div>
                    <div id="news-featured-image-selected" class="{{ $news->featured_image ? '' : 'hidden' }}">
                        <img id="news-featured-image-preview" src="{{ $news->featured_image }}" alt="Vista previa"
                            class="w-full h-48 object-cover rounded-lg">
                        <p class="text-xs text-gray-500 mt-2">Haz clic para cambiar la imagen</p>
                    </div>
                </div>
                <input type="hidden" id="news-featured-image-input" name="featured_image"
                    value="{{ $news->featured_image }}">
                <p class="text-sm text-red-600 mt-1 hidden" data-error-for="featured_image"></p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="news_category_id" class="block text-sm font-medium text-secondary mb-2">Categoría
                        *</label>
                    <select id="news_category_id" name="news_category_id" class="input-field">
                        <option value="">Selecciona una categoría</option>
                        @foreach ($categories as $cat)
                            <option value="{{ $cat->id }}"
                                {{ $news->news_category_id == $cat->id ? 'selected' : '' }}>
                                {{ $cat->name }}
                            </option>
                        @endforeach
                        <option value="__create__">+ Crear nueva categoría...</option>
                    </select>
                    <p class="text-sm text-red-600 mt-1 hidden" data-error-for="news_category_id"></p>
                </div>

                <div>
                    <label for="news-status" class="block text-sm font-medium text-secondary mb-2">Estado *</label>
                    <select id="news-status" name="status" class="input-field">
                        <option value="draft" {{ $news->status == 'draft' ? 'selected' : '' }}>Borrador</option>
                        <option value="published" {{ $news->status == 'published' ? 'selected' : '' }}>Publicado
                        </option>
                        <option value="scheduled" {{ $news->status == 'scheduled' ? 'selected' : '' }}>Programado
                        </option>
                    </select>
                    <p class="text-sm text-red-600 mt-1 hidden" data-error-for="status"></p>
                </div>
            </div>

            <div id="news-scheduled-at-wrapper" class="{{ $news->status == 'scheduled' ? '' : 'hidden' }}">
                <label for="scheduled_at" class="block text-sm font-medium text-secondary mb-2">Fecha de publicación
                    programada *</label>
                <input type="datetime-local" id="scheduled_at" name="scheduled_at"
                    value="{{ $news->scheduled_at?->format('Y-m-d\TH:i') }}" class="input-field">
                <p class="text-sm text-red-600 mt-1 hidden" data-error-for="scheduled_at"></p>
            </div>

            <div>
                <label for="news-content" class="block text-sm font-medium text-secondary mb-2">Contenido</label>
                <textarea id="news-content" name="content">{{ $news->content }}</textarea>
                <p class="text-sm text-red-600 mt-1 hidden" data-error-for="content"></p>
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <a href="{{ route('news.index', ['tab' => 'noticias']) }}" class="btn-outline">Cancelar</a>
                <button type="button" id="news-form-submit" class="btn-primary">
                    <i class="ri-save-line mr-2"></i> Actualizar Noticia
                </button>
            </div>
        </div>

        <x-media-picker-modal />
    </div>
@endsection

@push('scripts')
    @vite(['resources/js/views/news/form.js', 'resources/js/views/news/index.js'])
@endpush
