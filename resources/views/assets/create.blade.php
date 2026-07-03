@extends('layouts.admin')

@section('title', 'Crear Activo')
@section('page-title', 'Crear Nuevo Activo')

@push('head')
    <meta name="asset-categories-search-url" content="{{ route('api.asset-categories.search') }}">
    <meta name="pages-search-url" content="{{ route('api.pages.search') }}">
@endpush

@section('header-actions')
    <a href="{{ route('assets.index') }}" class="btn-outline inline-flex items-center">
        <i class="ri-arrow-left-line mr-2"></i>Volver
    </a>
@endsection

@section('content')
    <div class="max-w-3xl">
        <form id="assetForm" method="POST" action="{{ route('assets.store') }}" class="space-y-6">
            @csrf

            <div class="card space-y-4">
                <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                        Nombre <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="name" value="{{ old('name') }}" required
                        class="input-field @error('name') border-red-500 @enderror"
                        placeholder="Ej: Terreno rural en San Antonio">
                    @error('name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-secondary mb-2">Descripción corta</label>
                    <textarea name="short_description" rows="2" maxlength="500"
                        class="input-field @error('short_description') border-red-500 @enderror"
                        placeholder="Descripción breve del activo...">{{ old('short_description') }}</textarea>
                    @error('short_description')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                        Categoría <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="text" id="category_name" name="category_name" value="{{ old('category_name') }}"
                            required autocomplete="off" class="input-field @error('category_name') border-red-500 @enderror"
                            placeholder="Escribe o selecciona una categoría existente">
                    </div>
                    <p class="text-xs text-gray-500 mt-1">Si la categoría no existe, se creará automáticamente.</p>
                    @error('category_name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                        Imagen <span class="text-red-500">*</span>
                    </label>
                    <div id="asset-image-dropzone" class="flex items-start gap-3 flex-wrap cursor-pointer">
                        <div id="asset-image-selected" class="{{ old('image_url') ? '' : 'hidden' }}">
                            <img id="asset-image-preview" src="{{ old('image_url') }}" alt="Vista previa"
                                class="w-40 h-24 object-cover rounded-lg border border-gray-200">
                        </div>
                        <div id="asset-image-placeholder" class="btn-secondary {{ old('image_url') ? 'hidden' : '' }}">
                            <i class="ri-image-line mr-2"></i>Seleccionar imagen
                        </div>
                    </div>
                    <input type="hidden" id="asset-image-media-id" name="asset_image_media_id">
                    <input type="hidden" id="image_url" name="image_url" value="{{ old('image_url') }}">
                    @error('image_url')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                        Enlace <span class="text-red-500">*</span>
                    </label>
                    <div class="relative">
                        <input type="text" id="link_url" name="link_url" value="{{ old('link_url') }}" required
                            autocomplete="off" class="input-field @error('link_url') border-red-500 @enderror"
                            placeholder="URL o buscar página interna...">
                    </div>
                    @error('link_url')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <label class="flex items-center gap-2 cursor-pointer w-fit">
                    <input type="checkbox" name="link_is_external" value="1"
                        {{ old('link_is_external') ? 'checked' : '' }}
                        class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                    <span class="text-sm text-gray-700">Es un enlace externo (abrir en nueva pestaña)</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer w-fit">
                    <input type="checkbox" name="is_active" value="1" {{ old('is_active', true) ? 'checked' : '' }}
                        class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                    <span class="text-sm text-gray-700">Activo (visible en el sitio público)</span>
                </label>
            </div>

            <div class="flex justify-end gap-4">
                <a href="{{ route('assets.index') }}" class="btn-outline">
                    <i class="ri-close-line mr-2"></i>Cancelar
                </a>
                <button type="submit" class="btn-primary">
                    <i class="ri-save-line mr-2"></i>Guardar Activo
                </button>
            </div>
        </form>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/assets/form.js')
@endpush
