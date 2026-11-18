<div class="space-y-2">
    <label class="block text-xs font-medium text-gray-700">Contenido del correo en HTML (opcional)</label>
    <div id="{{ $prefix }}-html"></div>
    <p id="{{ $prefix }}-html-status" class="text-xs"></p>

    <div class="rounded-2xl bg-gray-50 border border-gray-200 p-4">
        <p class="text-xs font-semibold text-secondary mb-2">Variables disponibles (haz clic para insertarlas)</p>
        <div id="{{ $prefix }}-html-vars" class="flex flex-wrap gap-2"></div>
    </div>

    <div class="flex flex-wrap items-center gap-2">
        <button type="button" data-html-action="preview" data-html-target="{{ $key }}" class="btn-outline btn-sm">
            <i class="ri-eye-line mr-2"></i>
            Vista previa
        </button>
        <button type="button" data-html-action="example" data-html-target="{{ $key }}" class="btn-outline btn-sm">
            <i class="ri-file-code-line mr-2"></i>
            Cargar ejemplo
        </button>
        <button type="button" data-html-action="clear" data-html-target="{{ $key }}" class="btn-outline btn-sm">
            <i class="ri-eraser-line mr-2"></i>
            Vaciar
        </button>
    </div>

    <iframe id="{{ $prefix }}-html-preview" sandbox title="Vista previa"
        class="hidden w-full h-96 rounded-2xl border border-gray-200 bg-white"></iframe>

    <p class="text-xs text-gray-500">Si lo dejas vacío se usa el contenido por defecto. El marco del correo (fondo y
        tarjeta blanca) lo agrega el sistema: aquí escribes solo lo de adentro.</p>
</div>