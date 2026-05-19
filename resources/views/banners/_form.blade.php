<div id="banner-form" novalidate>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div class="lg:col-span-2 space-y-6">

            <div>
                <h3
                    class="text-sm font-semibold text-secondary uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">
                    Contenido principal
                </h3>
                <div class="space-y-4">

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Título <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="field-title" name="title" value="{{ old('title', $banner?->title) }}"
                            class="input-field" placeholder="Título del banner" maxlength="255">
                        <p class="field-error hidden text-xs text-red-500 mt-1" data-field="title"></p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Descripción <span class="text-red-500">*</span>
                        </label>
                        <textarea id="field-description" name="description" rows="3" class="input-field resize-none"
                            placeholder="Descripción o subtítulo del banner">{{ old('description', $banner?->description) }}</textarea>
                        <p class="field-error hidden text-xs text-red-500 mt-1" data-field="description"></p>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                        <input type="text" id="field-category" name="category"
                            value="{{ old('category', $banner?->category) }}" class="input-field"
                            placeholder="Ej: Promoción, Novedad..." maxlength="100">
                        <p class="text-xs text-gray-400 mt-1">Aparece como badge encima del título.</p>
                    </div>

                </div>
            </div>

            <div>
                <h3
                    class="text-sm font-semibold text-secondary uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">
                    Botón primario
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
                        <input type="text" id="field-btn-primary-text" name="btn_primary_text"
                            value="{{ old('btn_primary_text', $banner?->btn_primary_text) }}" class="input-field"
                            placeholder="Ej: Ver más" maxlength="100">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">URL</label>
                        <input type="text" id="field-btn-primary-url" name="btn_primary_url"
                            value="{{ old('btn_primary_url', $banner?->btn_primary_url) }}" class="input-field"
                            placeholder="/pagina o https://...">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Estilo</label>
                        <select id="field-btn-primary-style" name="btn_primary_style" class="input-field">
                            @foreach (['fill-blue' => 'Fill Azul', 'outline-blue' => 'Outline Azul', 'fill-orange' => 'Fill Naranja', 'outline-orange' => 'Outline Naranja', 'fill-white' => 'Fill Blanco', 'outline-white' => 'Outline Blanco'] as $val => $label)
                                <option value="{{ $val }}"
                                    {{ old('btn_primary_style', $banner?->btn_primary_style ?? 'fill-blue') === $val ? 'selected' : '' }}>
                                    {{ $label }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="flex items-center gap-3 pt-6">
                        <input type="hidden" name="btn_primary_external" value="0">
                        <input type="checkbox" id="field-btn-primary-external" name="btn_primary_external"
                            value="1" class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            {{ old('btn_primary_external', $banner?->btn_primary_external) ? 'checked' : '' }}>
                        <label for="field-btn-primary-external" class="text-sm text-gray-700">Abrir en nueva
                            pestaña</label>
                    </div>
                </div>
                <div class="mt-4">
                    <label class="block text-xs font-medium text-gray-500 mb-2">Vista previa</label>
                    <div id="btn-primary-preview"></div>
                </div>
            </div>

            <div>
                <h3
                    class="text-sm font-semibold text-secondary uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">
                    Botón secundario
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Texto del botón</label>
                        <input type="text" id="field-btn-secondary-text" name="btn_secondary_text"
                            value="{{ old('btn_secondary_text', $banner?->btn_secondary_text) }}" class="input-field"
                            placeholder="Ej: Contactar" maxlength="100">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">URL</label>
                        <input type="text" id="field-btn-secondary-url" name="btn_secondary_url"
                            value="{{ old('btn_secondary_url', $banner?->btn_secondary_url) }}" class="input-field"
                            placeholder="/pagina o https://...">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Estilo</label>
                        <select id="field-btn-secondary-style" name="btn_secondary_style" class="input-field">
                            @foreach (['fill-blue' => 'Fill Azul', 'outline-blue' => 'Outline Azul', 'fill-orange' => 'Fill Naranja', 'outline-orange' => 'Outline Naranja', 'fill-white' => 'Fill Blanco', 'outline-white' => 'Outline Blanco'] as $val => $label)
                                <option value="{{ $val }}"
                                    {{ old('btn_secondary_style', $banner?->btn_secondary_style ?? 'outline-blue') === $val ? 'selected' : '' }}>
                                    {{ $label }}
                                </option>
                            @endforeach
                        </select>
                    </div>
                    <div class="flex items-center gap-3 pt-6">
                        <input type="hidden" name="btn_secondary_external" value="0">
                        <input type="checkbox" id="field-btn-secondary-external" name="btn_secondary_external"
                            value="1" class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                            {{ old('btn_secondary_external', $banner?->btn_secondary_external) ? 'checked' : '' }}>
                        <label for="field-btn-secondary-external" class="text-sm text-gray-700">Abrir en nueva
                            pestaña</label>
                    </div>
                </div>
                <div class="mt-4">
                    <label class="block text-xs font-medium text-gray-500 mb-2">Vista previa</label>
                    <div id="btn-secondary-preview"></div>
                </div>
            </div>

        </div>

        <div class="space-y-6">

            <div>
                <h3
                    class="text-sm font-semibold text-secondary uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">
                    Imagen <span class="text-red-500">*</span>
                </h3>

                <div id="image-dropzone"
                    class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary transition-colors overflow-hidden"
                    data-media-picker>
                    <div id="image-placeholder"
                        class="{{ $banner?->image_url ? 'hidden' : '' }} flex flex-col items-center justify-center py-2">
                        <i class="ri-image-add-line text-4xl text-gray-400 mb-2"></i>
                        <p class="text-sm text-gray-500">Haz clic para seleccionar una imagen</p>
                        <p class="text-xs text-gray-400 mt-1">Se recomienda imagen horizontal. Se usará como fondo del banner.</p>
                    </div>
                    <div id="image-selected" class="{{ $banner?->image_url ? '' : 'hidden' }}">
                        <img id="image-preview" src="{{ $banner?->image_url ?? '' }}" alt="Vista previa"
                            class="w-full h-48 object-cover rounded-lg">
                        <p class="text-xs text-gray-500 mt-2">Haz clic para cambiar la imagen</p>
                    </div>
                </div>

                <input type="hidden" id="field-image-id" name="media_id" value="{{ old('media_id', '') }}">
                <p class="field-error hidden text-xs text-red-500 mt-1" data-field="media_id"></p>

                <div class="mt-3">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Texto alternativo (alt)</label>
                    <input type="text" id="field-image-alt" name="image_alt"
                        value="{{ old('image_alt', $banner?->image_alt) }}" class="input-field"
                        placeholder="Descripción de la imagen">
                </div>
            </div>

            <div>
                <h3
                    class="text-sm font-semibold text-secondary uppercase tracking-wide mb-4 pb-2 border-b border-gray-100">
                    Configuración
                </h3>
                <div class="space-y-4">

                    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                            <p class="text-sm font-medium text-gray-700">Estado</p>
                            <p class="text-xs text-gray-400">Visible en el sitio</p>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="hidden" name="is_active" value="0">
                            <input type="checkbox" id="field-is-active" name="is_active" value="1"
                                class="sr-only peer"
                                {{ old('is_active', $banner?->is_active ?? true) ? 'checked' : '' }}>
                            <div
                                class="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary rounded-full peer
                peer-checked:bg-primary transition-colors">
                            </div>
                            <div
                                class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow
                transition-transform peer-checked:translate-x-5">
                            </div>
                        </label>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Orden</label>
                        <input type="number" id="field-order" name="order"
                            value="{{ old('order', $banner?->order ?? 0) }}" class="input-field" min="0"
                            placeholder="0">
                        <p class="text-xs text-gray-400 mt-1">Menor número = aparece primero.</p>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <div class="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
        <a href="{{ route('banners.index') }}" class="btn-outline">Cancelar</a>
        <button type="button" id="btn-submit" class="btn-primary">
            <i class="ri-save-line mr-2"></i>
            {{ $banner ? 'Actualizar Banner' : 'Crear Banner' }}
        </button>
    </div>

    <x-media-picker-modal />

</div>
