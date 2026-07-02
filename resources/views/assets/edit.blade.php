@extends('layouts.admin')

@section('title', 'Editar Activo')
@section('page-title', 'Editar Activo')

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
        <form id="assetForm" method="POST" action="{{ route('assets.update', $asset) }}" class="space-y-6">
            @csrf
            @method('PUT')

            <div class="card space-y-4">
                <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                        Nombre <span class="text-red-500">*</span>
                    </label>
                    <input type="text" name="name" value="{{ old('name', $asset->name) }}" required
                        class="input-field @error('name') border-red-500 @enderror">
                    @error('name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-secondary mb-2">Descripción corta</label>
                    <textarea name="short_description" rows="2" maxlength="500"
                        class="input-field @error('short_description') border-red-500 @enderror">{{ old('short_description', $asset->short_description) }}</textarea>
                    @error('short_description')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                        Categoría <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="category_name" name="category_name"
                        value="{{ old('category_name', $asset->category->name) }}" required autocomplete="off"
                        class="input-field @error('category_name') border-red-500 @enderror">
                    <p class="text-xs text-gray-500 mt-1">Si la categoría no existe, se creará automáticamente.</p>
                    @error('category_name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                        Imagen <span class="text-red-500">*</span>
                    </label>
                    <div class="flex items-start gap-3 flex-wrap">
                        <div id="asset-image-preview-wrap">
                            <img id="asset-image-preview" src="{{ old('image_url', $asset->image_url) }}"
                                alt="Vista previa" class="w-40 h-24 object-cover rounded-lg border border-gray-200">
                        </div>
                        <button type="button" id="asset-image-pick" class="btn-secondary">
                            <i class="ri-image-line mr-2"></i>Cambiar imagen
                        </button>
                    </div>
                    <input type="hidden" id="image_url" name="image_url"
                        value="{{ old('image_url', $asset->image_url) }}">
                    @error('image_url')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-secondary mb-2">
                        Enlace <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="link_url" name="link_url" value="{{ old('link_url', $asset->link_url) }}"
                        required autocomplete="off" class="input-field @error('link_url') border-red-500 @enderror">
                    @error('link_url')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <label class="flex items-center gap-2 cursor-pointer w-fit">
                    <input type="checkbox" name="link_is_external" value="1"
                        {{ old('link_is_external', $asset->link_is_external) ? 'checked' : '' }}
                        class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                    <span class="text-sm text-gray-700">Es un enlace externo (abrir en nueva pestaña)</span>
                </label>

                <label class="flex items-center gap-2 cursor-pointer w-fit">
                    <input type="checkbox" name="is_active" value="1"
                        {{ old('is_active', $asset->is_active) ? 'checked' : '' }}
                        class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                    <span class="text-sm text-gray-700">Activo (visible en el sitio público)</span>
                </label>
            </div>

            <div class="flex justify-end gap-4">
                <a href="{{ route('assets.index') }}" class="btn-outline">
                    <i class="ri-close-line mr-2"></i>Cancelar
                </a>
                <button type="submit" class="btn-primary">
                    <i class="ri-save-line mr-2"></i>Guardar Cambios
                </button>
            </div>
        </form>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/assets/form.js')
@endpush
