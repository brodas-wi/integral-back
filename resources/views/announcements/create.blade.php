@extends('layouts.admin')

@section('title', 'Crear Aviso')
@section('page-title', 'Crear Nuevo Aviso')

@section('content')
<div class="max-w-4xl">
    <div class="mb-6">
        <a href="{{ route('announcements.index') }}" class="btn-outline inline-flex items-center">
            <i class="ri-arrow-left-line mr-2"></i>
            Volver
        </a>
    </div>

    <form id="announcementForm" method="POST" action="{{ route('announcements.store') }}" class="space-y-6">
        @csrf

        <div class="card">
            <h3 class="text-lg font-semibold text-secondary mb-4">Modo de Visualización</h3>

            <div class="space-y-2">
                <label
                    class="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="display_mode" value="full" {{ old('display_mode', 'full' )==='full'
                        ? 'checked' : '' }}
                        class="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary display-mode-radio">
                    <div class="ml-3">
                        <p class="font-medium text-secondary">Completo</p>
                        <p class="text-sm text-gray-600">Muestra imagen, título, descripción y botón de acción</p>
                    </div>
                </label>

                <label
                    class="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <input type="radio" name="display_mode" value="image_only" {{ old('display_mode')==='image_only'
                        ? 'checked' : '' }}
                        class="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary display-mode-radio">
                    <div class="ml-3">
                        <p class="font-medium text-secondary">Solo Imagen</p>
                        <p class="text-sm text-gray-600">Muestra únicamente la imagen en el modal</p>
                    </div>
                </label>
            </div>
        </div>

        <div class="card" id="content-fields">
            <h3 class="text-lg font-semibold text-secondary mb-4">Información General</h3>

            <div class="space-y-4">
                <div>
                    <label for="title" class="block text-sm font-medium text-secondary mb-2">
                        Título <span class="text-red-500 title-required">*</span>
                        <span class="text-xs text-gray-500 font-normal title-note">(siempre requerido para
                            identificación interna)</span>
                    </label>
                    <input type="text" id="title" name="title" value="{{ old('title') }}" required
                        class="input-field @error('title') border-red-500 @enderror"
                        placeholder="Ej: Promoción especial de tarjetas">
                    @error('title')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="description" class="block text-sm font-medium text-secondary mb-2">
                        Descripción
                    </label>
                    <textarea id="description" name="description" rows="3"
                        class="input-field @error('description') border-red-500 @enderror"
                        placeholder="Descripción breve del aviso (máximo 1000 caracteres)">{{ old('description') }}</textarea>
                    @error('description')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                    <p class="text-xs text-gray-500 mt-1">Máximo 1000 caracteres</p>
                </div>
            </div>
        </div>

        <div class="card">
            <h3 class="text-lg font-semibold text-secondary mb-4">Imagen del Aviso</h3>

            <div class="space-y-4">
                <div>
                    <input type="hidden" id="media_id" name="media_id" value="{{ old('media_id') }}">

                    <div id="selected-image-preview" class="hidden mb-4">
                        <div class="relative inline-block">
                            <img id="preview-img" src="" alt=""
                                class="w-64 h-64 object-cover rounded-lg border-2 border-gray-200">
                            <button type="button" id="remove-image"
                                class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 flex items-center justify-center">
                                <i class="ri-close-line"></i>
                            </button>
                        </div>
                    </div>

                    <button type="button" id="select-image-btn" class="btn-secondary">
                        <i class="ri-image-add-line mr-2"></i>
                        Seleccionar Imagen
                    </button>
                    @error('media_id')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                    <p class="text-xs text-gray-500 mt-1">Selecciona una imagen de la biblioteca de medios</p>
                </div>
            </div>
        </div>

        <div class="card" id="cta-fields">
            <h3 class="text-lg font-semibold text-secondary mb-4">Llamado a la Acción (CTA)</h3>

            <div class="space-y-4">
                <div>
                    <label for="cta_text" class="block text-sm font-medium text-secondary mb-2">
                        Texto del Botón
                    </label>
                    <input type="text" id="cta_text" name="cta_text" value="{{ old('cta_text') }}"
                        class="input-field @error('cta_text') border-red-500 @enderror"
                        placeholder="Ej: Ver más, Solicitar ahora, Conocer más">
                    @error('cta_text')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="cta_url" class="block text-sm font-medium text-secondary mb-2">
                        URL del Botón
                    </label>
                    <input type="url" id="cta_url" name="cta_url" value="{{ old('cta_url') }}"
                        class="input-field @error('cta_url') border-red-500 @enderror"
                        placeholder="https://ejemplo.com/promocion">
                    @error('cta_url')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex items-center">
                    <input type="checkbox" id="cta_new_tab" name="cta_new_tab" value="1" {{ old('cta_new_tab', true)
                        ? 'checked' : '' }} class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                    <label for="cta_new_tab" class="ml-2 text-sm text-gray-700">
                        Abrir en nueva pestaña
                    </label>
                </div>
            </div>
        </div>

        <div class="card">
            <h3 class="text-lg font-semibold text-secondary mb-4">Configuración de Visualización</h3>

            <div class="space-y-4">
                <div>
                    <label for="display_type" class="block text-sm font-medium text-secondary mb-2">
                        Mostrar en <span class="text-red-500">*</span>
                    </label>
                    <select id="display_type" name="display_type" required
                        class="input-field @error('display_type') border-red-500 @enderror">
                        <option value="">Seleccionar tipo</option>
                        <option value="global" {{ old('display_type')==='global' ? 'selected' : '' }}>
                            Todas las páginas
                        </option>
                        <option value="homepage" {{ old('display_type')==='homepage' ? 'selected' : '' }}>
                            Solo página de inicio
                        </option>
                        <option value="specific_pages" {{ old('display_type')==='specific_pages' ? 'selected' : '' }}>
                            Páginas específicas
                        </option>
                    </select>
                    @error('display_type')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div id="page-selector" class="hidden">
                    <label class="block text-sm font-medium text-secondary mb-2">
                        Seleccionar Páginas
                    </label>
                    <div class="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 space-y-2">
                        @foreach($pages as $page)
                        <div class="flex items-center">
                            <input type="checkbox" id="page_{{ $page->id }}" name="page_slugs[]"
                                value="{{ $page->slug }}" {{ is_array(old('page_slugs')) && in_array($page->slug,
                            old('page_slugs')) ? 'checked' : '' }}
                            class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                            <label for="page_{{ $page->id }}" class="ml-2 text-sm text-gray-700">
                                {{ $page->title }}
                            </label>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <h3 class="text-lg font-semibold text-secondary mb-4">Programación</h3>

            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-secondary mb-3">
                        Tipo de Activación <span class="text-red-500">*</span>
                    </label>
                    <div class="space-y-2">
                        <label
                            class="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                            <input type="radio" name="schedule_type" value="manual" {{ old('schedule_type', 'manual'
                                )==='manual' ? 'checked' : '' }}
                                class="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary">
                            <div class="ml-3">
                                <p class="font-medium text-secondary">Manual</p>
                                <p class="text-sm text-gray-600">El aviso se activa/desactiva manualmente con el
                                    interruptor</p>
                            </div>
                        </label>

                        <label
                            class="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                            <input type="radio" name="schedule_type" value="scheduled" {{
                                old('schedule_type')==='scheduled' ? 'checked' : '' }}
                                class="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary">
                            <div class="ml-3">
                                <p class="font-medium text-secondary">Programado</p>
                                <p class="text-sm text-gray-600">El aviso se activa y desactiva automáticamente según
                                    fechas</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div id="schedule-dates" class="grid grid-cols-1 md:grid-cols-2 gap-4 hidden">
                    <div>
                        <label for="starts_at" class="block text-sm font-medium text-secondary mb-2">
                            Fecha de Inicio <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="starts_at" name="starts_at" value="{{ old('starts_at') }}"
                            class="input-field flatpickr-datetime @error('starts_at') border-red-500 @enderror"
                            placeholder="Seleccionar fecha y hora">
                        @error('starts_at')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="ends_at" class="block text-sm font-medium text-secondary mb-2">
                            Fecha de Fin
                        </label>
                        <input type="text" id="ends_at" name="ends_at" value="{{ old('ends_at') }}"
                            class="input-field flatpickr-datetime @error('ends_at') border-red-500 @enderror"
                            placeholder="Seleccionar fecha y hora (opcional)">
                        @error('ends_at')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                        <p class="text-xs text-gray-500 mt-1">Opcional: sin fin permanece activo</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="flex items-center justify-between">
                <div>
                    <h3 class="text-lg font-semibold text-secondary">Estado</h3>
                    <p class="text-sm text-gray-600 mt-1">Activa el aviso para que se muestre en el sitio</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" id="is_active" name="is_active" value="1" {{ old('is_active') ? 'checked'
                        : '' }} class="sr-only peer">
                    <div
                        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary">
                    </div>
                </label>
            </div>
        </div>

        <div class="flex justify-between gap-4">
            <a href="{{ route('announcements.index') }}" class="btn-outline">
                <i class="ri-close-line mr-2"></i>
                Cancelar
            </a>
            <button type="submit" class="btn-primary">
                <i class="ri-save-line mr-2"></i>
                Crear Aviso
            </button>
        </div>
    </form>
</div>

<div id="media-library-modal"
    class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden">
        <div class="flex items-center justify-between p-6 border-b">
            <h3 class="text-xl font-semibold text-secondary">Biblioteca de Medios</h3>
            <button type="button" id="close-media-modal" class="text-gray-400 hover:text-gray-600">
                <i class="ri-close-line text-2xl"></i>
            </button>
        </div>
        <div id="media-library-content" class="p-6 overflow-y-auto" style="max-height: calc(90vh - 140px);">
            <p class="text-center text-gray-500">Cargando...</p>
        </div>
    </div>
</div>
@endsection

@push('scripts')
@vite('resources/js/modules/announcement-form.js')
@endpush