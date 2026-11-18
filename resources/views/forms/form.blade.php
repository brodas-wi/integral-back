@extends('layouts.admin')

@section('title', $form ? 'Editar formulario' : 'Nuevo formulario')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>{{ $form ? 'Editar formulario' : 'Nuevo formulario' }}</span>
        @if ($form)
            <span id="version-badge" class="badge badge-info">v{{ $form->currentVersion?->version ?? '-' }}</span>
        @endif
    </div>
@endsection

@section('header-actions')
    <a href="{{ route('forms.index') }}" class="btn-outline btn-sm">
        <i class="ri-arrow-left-line mr-2"></i>
        Volver
    </a>
    <button type="button" id="save-form" class="btn-primary btn-sm">
        <i class="ri-save-line mr-2"></i>
        <span>Guardar</span>
    </button>
@endsection

@section('content')
    <div id="form-editor" class="space-y-6 max-w-4xl"
        data-submit-url="{{ $form ? route('forms.update', $form) : route('forms.store') }}"
        data-method="{{ $form ? 'PUT' : 'POST' }}" data-base-version="{{ $form?->currentVersion?->version }}"
        data-field-types="{{ json_encode($fieldTypes) }}" data-pages-search-url="{{ route('api.pages.search') }}">

        <script type="application/json" id="form-initial">{!! json_encode($initial, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE) !!}</script>

        <div id="form-errors" class="hidden rounded-2xl border border-red-200 bg-red-50 p-4">
            <p class="text-sm font-semibold text-red-700 mb-2">Revisa lo siguiente antes de guardar:</p>
            <ul id="form-errors-list" class="list-disc pl-5 text-sm text-red-700 space-y-1"></ul>
        </div>

        <div class="card space-y-4">
            <h3 class="text-base font-bold text-secondary">General</h3>

            <div>
                <label class="block text-xs font-medium text-gray-700 mb-1" for="f-name">Nombre interno</label>
                <input type="text" id="f-name" class="input-field" maxlength="150"
                    placeholder="Ej: Inscripción a programas">
                <p class="text-xs text-gray-500 mt-1">Solo lo ves tú. Si lo dejas vacío se usa el título del formulario.</p>
            </div>

            <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" id="f-active" class="w-4 h-4 accent-primary">
                Formulario activo (visible en la página pública)
            </label>

            @if ($form)
                <div class="rounded-2xl bg-gray-50 border border-gray-200 p-4 space-y-3">
                    <p class="text-sm font-semibold text-secondary">Cómo abrir este formulario</p>
                    <p class="text-xs text-gray-600">Usa cualquiera de estas dos formas en un botón o enlace de la página
                        pública. El slug no cambia aunque edites el nombre.</p>
                    @php
                        $snippets = ['data-open-form="' . $form->slug . '"', 'href="#form:' . $form->slug . '"'];
                    @endphp
                    @foreach ($snippets as $snippet)
                        <div class="flex items-center gap-2">
                            <code
                                class="flex-1 min-w-0 truncate text-xs bg-white border border-gray-200 rounded-full px-3 py-2">{{ $snippet }}</code>
                            <button type="button" data-copy="{{ $snippet }}" class="btn-outline btn-sm"
                                title="Copiar">
                                <i class="ri-file-copy-line"></i>
                            </button>
                        </div>
                    @endforeach
                </div>
            @endif
        </div>

        <div class="card space-y-4">
            <h3 class="text-base font-bold text-secondary">Contenido</h3>

            <div>
                <label class="block text-xs font-medium text-gray-700 mb-1" for="f-title">Título</label>
                <input type="text" id="f-title" class="input-field" maxlength="200"
                    placeholder="Inscríbete a nuestros programas">
            </div>

            <div>
                <label class="block text-xs font-medium text-gray-700 mb-1" for="f-description">Descripción
                    (opcional)</label>
                <textarea id="f-description" rows="2" maxlength="1000" class="input-field !rounded-2xl"
                    placeholder="Completa este formulario para inscribirte. Es fácil y rápido"></textarea>
            </div>

            <div>
                <label class="block text-xs font-medium text-gray-700 mb-1" for="f-submit-label">Texto del botón de
                    envío</label>
                <input type="text" id="f-submit-label" class="input-field" maxlength="80"
                    placeholder="Guardar y enviar mi registro">
            </div>
        </div>

        <div class="card space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="text-base font-bold text-secondary">Campos</h3>
                <div class="flex items-center gap-2">
                    <button type="button" data-fields-mode="simple" class="btn-primary btn-sm">
                        <i class="ri-list-settings-line mr-2"></i>
                        Sencillo
                    </button>
                    <button type="button" data-fields-mode="json" class="btn-outline btn-sm">
                        <i class="ri-braces-line mr-2"></i>
                        JSON
                    </button>
                </div>
            </div>

            <div id="fields-simple">
                <div id="fields-builder" class="space-y-4"></div>
            </div>

            <div id="fields-json" class="hidden space-y-3">
                <div class="flex flex-wrap items-center gap-2">
                    <button type="button" id="format-json" class="btn-outline btn-sm">
                        <i class="ri-code-line mr-2"></i>
                        Formatear
                    </button>
                    <button type="button" id="copy-json" class="btn-outline btn-sm">
                        <i class="ri-file-copy-line mr-2"></i>
                        Copiar JSON
                    </button>
                </div>
                <div id="f-fields-json"></div>
            </div>

            <details class="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700">
                <summary class="cursor-pointer font-semibold text-secondary">Guía rápida de campos</summary>
                <div class="mt-3 space-y-3">
                    <p>Cada campo es un objeto con estas propiedades:</p>
                    <ul class="list-disc pl-5 space-y-1 text-xs">
                        <li><code>type</code>: tipo del campo (lista abajo).</li>
                        <li><code>label</code>: etiqueta que ve el usuario.</li>
                        <li><code>required</code>: <code>true</code> o <code>false</code>. El consentimiento siempre es
                            requerido.</li>
                        <li><code>width</code>: <code>"full"</code> (fila completa) o <code>"half"</code> (media fila, dos
                            campos juntos).</li>
                        <li><code>placeholder</code> y <code>help</code>: texto de ejemplo y de ayuda, opcionales.</li>
                        <li><code>key</code>: identificador estable. Lo genera el sistema al guardar. <strong>No lo cambies
                                ni lo borres</strong>, así las respuestas anteriores siguen asociadas al campo.</li>
                        <li><code>max_length</code>: en texto, nombre propio y área de texto.</li>
                        <li><code>min</code> y <code>max</code>: en entero y decimal. <code>decimals</code>: máximo de
                            decimales.</li>
                        <li><code>verify_check_digit</code>: en DUI, verifica el dígito verificador.</li>
                        <li><code>options</code>: en lista y casillas, un arreglo de <code>{"label": "Texto"}</code>.</li>
                        <li><code>text</code>: en consentimiento, el texto que se acepta. En nota informativa, el texto gris
                            que se muestra (no captura datos, no requiere etiqueta).</li>
                        <li><code>department_label</code> y <code>municipality_label</code>: en ubicación.</li>
                        <li>Enlaces en el consentimiento: escribe <code>[texto](/ruta)</code> dentro de <code>text</code>,
                            por ejemplo <code>[Política de Privacidad](/politica-de-privacidad)</code>. Se abre en una
                            pestaña nueva. Máximo 5 enlaces, con ruta que empiece con <code>/</code> o <code>https://</code>.</li>
                        <li>Lista de agencias (<code>agency</code>): no lleva <code>options</code>. Muestra las agencias
                            activas y se actualiza sola.</li>
                    </ul>
                    <p class="text-xs font-semibold">Tipos disponibles:</p>
                    <div class="flex flex-wrap gap-2">
                        @foreach ($fieldTypes as $type)
                            <span
                                class="badge badge-gray"><code>{{ $type['value'] }}</code>&nbsp;{{ $type['label'] }}</span>
                        @endforeach
                    </div>
                </div>
            </details>
        </div>

        <div class="card space-y-4">
            <h3 class="text-base font-bold text-secondary">Mensaje de agradecimiento</h3>
            <p class="text-xs text-gray-500">Se muestra sobre el formulario después de enviarlo.</p>

            <div>
                <label class="block text-xs font-medium text-gray-700 mb-1" for="t-title">Título</label>
                <input type="text" id="t-title" class="input-field" maxlength="120" placeholder="¡Gracias!">
            </div>

            <div>
                <label class="block text-xs font-medium text-gray-700 mb-1" for="t-subtitle">Subtítulo</label>
                <textarea id="t-subtitle" rows="2" maxlength="300" class="input-field !rounded-2xl"></textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="t-seconds">Segundos en pantalla
                        (1 a 60)</label>
                    <input type="number" id="t-seconds" class="input-field" min="1" max="60">
                    <p class="text-xs text-gray-500 mt-1">Al terminar, el formulario se cierra y se limpia.</p>
                </div>
                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="t-redirect">Redirigir a
                        (opcional)</label>
                    <input type="text" id="t-redirect" class="input-field" placeholder="/gracias o https://...">
                    <p class="text-xs text-gray-500 mt-1">Si lo completas, en lugar de cerrarse va a esta página.</p>
                </div>
            </div>
        </div>

        <div class="card space-y-4">
            <h3 class="text-base font-bold text-secondary">Correlativo</h3>
            <p class="text-xs text-gray-500">Un código único para cada respuesta recibida. Por ahora solo se ve en la
                sección de respuestas y en el CSV.</p>

            <label class="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                <input type="checkbox" id="k-enabled" class="w-4 h-4 accent-primary">
                Generar un correlativo para cada respuesta
            </label>

            <div id="k-options" class="hidden space-y-4">
                <div class="flex flex-wrap items-center gap-6 text-sm text-gray-700">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="k-mode" value="default" class="w-4 h-4 accent-primary">
                        Por defecto
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="k-mode" value="custom" class="w-4 h-4 accent-primary">
                        Personalizado
                    </label>
                </div>

                <div id="k-default" class="space-y-1">
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="k-prefix">Prefijo</label>
                    <input type="text" id="k-prefix" class="input-field uppercase" maxlength="10" placeholder="SOL">
                    <p class="text-xs text-gray-500">Formato: prefijo, año y mes, y un consecutivo. El consecutivo se
                        reinicia cada año y se comparte entre los formularios que usen el mismo prefijo.</p>
                </div>

                <div id="k-custom" class="hidden space-y-2">
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="k-pattern">Plantilla</label>
                    <input type="text" id="k-pattern" class="input-field font-mono" maxlength="80"
                        placeholder="INT-{YY}{MM}-{N:4}">
                    <div class="flex flex-wrap gap-2">
                        <button type="button" data-k-token="{YYYY}" class="badge badge-gray cursor-pointer">{YYYY} año</button>
                        <button type="button" data-k-token="{YY}" class="badge badge-gray cursor-pointer">{YY} año corto</button>
                        <button type="button" data-k-token="{MM}" class="badge badge-gray cursor-pointer">{MM} mes</button>
                        <button type="button" data-k-token="{DD}" class="badge badge-gray cursor-pointer">{DD} día</button>
                        <button type="button" data-k-token="{N:5}" class="badge badge-gray cursor-pointer">{N:5} consecutivo</button>
                    </div>
                    <p class="text-xs text-gray-500">Debe incluir una pieza {N} o {N:5}. El consecutivo es solo de este
                        formulario, sigue corrido y no se reinicia.</p>
                </div>

                <div class="rounded-2xl bg-gray-50 border border-gray-200 p-4">
                    <p class="text-xs font-semibold text-secondary mb-2">Vista previa (primera respuesta)</p>
                    <code id="k-preview" class="text-sm"></code>
                </div>
            </div>
        </div>

        <div class="card space-y-6">
            <h3 class="text-base font-bold text-secondary">Correos</h3>

            <div class="rounded-2xl bg-gray-50 border border-gray-200 p-4 space-y-2">
                <p class="text-xs font-semibold text-secondary">Variables disponibles en asuntos y mensajes</p>
                <div id="variables-hint" class="flex flex-wrap gap-2"></div>
                <p class="text-xs text-gray-500"><code>{{ '{{answers}}' }}</code> imprime todas las preguntas con sus
                    respuestas. <code>{{ '{{admin_url}}' }}</code> es el enlace a la respuesta en el CMS y solo funciona
                    en el aviso interno. Ambas solo se usan en el mensaje, no en el asunto.</p>
            </div>

            <div class="space-y-4">
                <label class="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input type="checkbox" id="n-enabled" class="w-4 h-4 accent-primary">
                    Avisar internamente cuando llegue una nueva solicitud
                </label>

                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="n-recipients">Destinatarios (uno por
                        línea, máximo 10)</label>
                    <textarea id="n-recipients" rows="3" class="input-field !rounded-2xl" placeholder="equipo@empresa.com"></textarea>
                </div>

                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="n-subject">Asunto</label>
                    <input type="text" id="n-subject" class="input-field" maxlength="200">
                </div>

                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="n-body">Mensaje</label>
                    <textarea id="n-body" rows="7" maxlength="5000" class="input-field !rounded-2xl"></textarea>
                    <p class="text-xs text-gray-500 mt-1">Es el contenido del aviso. Obligatorio mientras el aviso esté
                        activo.</p>
                </div>
            </div>

            <hr class="border-gray-100">

            <div class="space-y-4">
                <label class="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
                    <input type="checkbox" id="c-enabled" class="w-4 h-4 accent-primary">
                    Enviar una confirmación al correo del usuario
                </label>

                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="c-field">Campo de correo del
                        usuario</label>
                    <select id="c-field" class="input-field"></select>
                    <p class="text-xs text-gray-500 mt-1">Aparecen los campos de tipo correo que ya tienen clave. Si
                        agregaste uno nuevo, guarda primero.</p>
                </div>

                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="c-subject">Asunto</label>
                    <input type="text" id="c-subject" class="input-field" maxlength="200">
                </div>

                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="c-body">Mensaje</label>
                    <textarea id="c-body" rows="5" maxlength="5000" class="input-field !rounded-2xl"></textarea>
                    <p class="text-xs text-gray-500 mt-1">Es el contenido de la confirmación. Obligatorio mientras esté
                        activa.</p>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/forms/form.js')
@endpush
