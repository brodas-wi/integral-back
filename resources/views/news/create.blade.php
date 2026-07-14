@extends('layouts.admin')

@section('title', 'Nueva Noticia')

@section('page-title', 'Nueva Noticia')

@section('content')
    <div class="max-w-4xl">
        <form method="POST" action="{{ route('news.store') }}" class="card space-y-6">
            @csrf

            <div>
                <label for="title" class="block text-sm font-medium text-secondary mb-2">Título *</label>
                <input type="text" id="title" name="title" value="{{ old('title') }}" required
                    class="input-field @error('title') border-red-500 @enderror">
                @error('title')
                    <p class="text-sm text-red-600 mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="description" class="block text-sm font-medium text-secondary mb-2">Descripción corta</label>
                <textarea id="description" name="description" rows="3"
                    class="input-field @error('description') border-red-500 @enderror">{{ old('description') }}</textarea>
                @error('description')
                    <p class="text-sm text-red-600 mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label class="block text-sm font-medium text-secondary mb-2">Imagen destacada</label>
                <div class="flex items-start gap-4">
                    <div
                        class="w-40 h-28 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                        <img id="news-featured-image-preview" src="" alt="Vista previa"
                            class="w-full h-full object-cover hidden">
                        <i id="news-featured-image-placeholder" class="ri-image-line text-4xl text-gray-400"></i>
                    </div>
                    <div class="flex-1">
                        <input type="hidden" id="news-featured-image-input" name="featured_image"
                            value="{{ old('featured_image') }}">
                        <button type="button" id="news-featured-image-pick" class="btn-secondary btn-sm">
                            <i class="ri-image-2-line mr-2"></i> Seleccionar imagen
                        </button>
                        @error('featured_image')
                            <p class="text-sm text-red-600 mt-2">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="news_category_id" class="block text-sm font-medium text-secondary mb-2">Categoría *</label>
                    <select id="news_category_id" name="news_category_id" required
                        class="input-field @error('news_category_id') border-red-500 @enderror">
                        <option value="">Selecciona una categoría</option>
                        @foreach ($categories as $cat)
                            <option value="{{ $cat->id }}" {{ old('news_category_id') == $cat->id ? 'selected' : '' }}>
                                {{ $cat->name }}
                            </option>
                        @endforeach
                    </select>
                    @error('news_category_id')
                        <p class="text-sm text-red-600 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="news-status" class="block text-sm font-medium text-secondary mb-2">Estado *</label>
                    <select id="news-status" name="status" required
                        class="input-field @error('status') border-red-500 @enderror">
                        <option value="draft" {{ old('status', 'draft') == 'draft' ? 'selected' : '' }}>Borrador</option>
                        <option value="published" {{ old('status') == 'published' ? 'selected' : '' }}>Publicado</option>
                        <option value="scheduled" {{ old('status') == 'scheduled' ? 'selected' : '' }}>Programado</option>
                    </select>
                    @error('status')
                        <p class="text-sm text-red-600 mt-1">{{ $message }}</p>
                    @enderror
                </div>
            </div>

            <div id="news-scheduled-at-wrapper" class="{{ old('status') == 'scheduled' ? '' : 'hidden' }}">
                <label for="scheduled_at" class="block text-sm font-medium text-secondary mb-2">Fecha de publicación
                    programada *</label>
                <input type="datetime-local" id="scheduled_at" name="scheduled_at" value="{{ old('scheduled_at') }}"
                    class="input-field @error('scheduled_at') border-red-500 @enderror">
                @error('scheduled_at')
                    <p class="text-sm text-red-600 mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div>
                <label for="news-content" class="block text-sm font-medium text-secondary mb-2">Contenido</label>
                <textarea id="news-content" name="content">{{ old('content') }}</textarea>
                @error('content')
                    <p class="text-sm text-red-600 mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <a href="{{ route('news.index') }}" class="btn-outline">Cancelar</a>
                <button type="submit" class="btn-primary">
                    <i class="ri-save-line mr-2"></i> Guardar Noticia
                </button>
            </div>
        </form>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/news/form.js')
@endpush
