@extends('layouts.admin')

@section('title', 'Crear Script')
@section('page-title', 'Crear Nuevo Script')

@section('content')
<div class="max-w-5xl">
    <div class="mb-6">
        <a href="{{ route('scripts.index') }}" class="btn-outline inline-flex items-center">
            <i class="ri-arrow-left-line mr-2"></i>
            Volver
        </a>
    </div>

    @php $canAutoApprove = auth()->user()->can('scripts.auto_approve') || auth()->user()->can('scripts.manage'); @endphp

    <form id="scriptForm" method="POST" action="{{ route('scripts.store') }}" class="space-y-6">
        @csrf

        <div class="card">
            <h3 class="text-lg font-semibold text-secondary mb-4">Información General</h3>
            <div class="space-y-4">
                <div>
                    <label for="name" class="block text-sm font-medium text-secondary mb-2">
                        Nombre <span class="text-red-500">*</span>
                    </label>
                    <input type="text" id="name" name="name" value="{{ old('name') }}" required
                        class="input-field @error('name') border-red-500 @enderror"
                        placeholder="Ej: Google Analytics, Botón flotante WhatsApp, Chat en vivo">
                    @error('name')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label for="description" class="block text-sm font-medium text-secondary mb-2">
                        Descripción
                    </label>
                    <textarea id="description" name="description" rows="2"
                        class="input-field @error('description') border-red-500 @enderror"
                        placeholder="Describe brevemente el propósito de este script...">{{ old('description') }}</textarea>
                    @error('description')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>
            </div>
        </div>

        <div class="card">
            <h3 class="text-lg font-semibold text-secondary mb-4">Tipo y Alcance</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium text-secondary mb-3">
                        Tipo de Script <span class="text-red-500">*</span>
                    </label>
                    <div class="space-y-2">
                        <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors
                            {{ old('type', 'js') === 'js' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-primary' }}">
                            <input type="radio" name="type" value="js" {{ old('type', 'js') === 'js' ? 'checked' : '' }}
                                class="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary script-type-radio">
                            <div class="ml-3">
                                <div class="flex items-center gap-2">
                                    <i class="ri-javascript-line text-yellow-500 text-lg"></i>
                                    <p class="font-medium text-secondary">JavaScript</p>
                                </div>
                                <p class="text-sm text-gray-500 mt-1">Analytics, widgets, botones flotantes, chat, etc.</p>
                            </div>
                        </label>
                        <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors
                            {{ old('type') === 'css' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-primary' }}">
                            <input type="radio" name="type" value="css" {{ old('type') === 'css' ? 'checked' : '' }}
                                class="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary script-type-radio">
                            <div class="ml-3">
                                <div class="flex items-center gap-2">
                                    <i class="ri-css3-line text-blue-500 text-lg"></i>
                                    <p class="font-medium text-secondary">CSS</p>
                                </div>
                                <p class="text-sm text-gray-500 mt-1">Estilos adicionales, personalizaciones visuales, etc.</p>
                            </div>
                        </label>
                    </div>
                    @error('type')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <div>
                    <label class="block text-sm font-medium text-secondary mb-3">
                        Alcance <span class="text-red-500">*</span>
                    </label>
                    <div class="space-y-2">
                        <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors
                            {{ old('scope', 'global') === 'global' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-primary' }}">
                            <input type="radio" name="scope" value="global" {{ old('scope', 'global') === 'global' ? 'checked' : '' }}
                                class="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary script-scope-radio">
                            <div class="ml-3">
                                <div class="flex items-center gap-2">
                                    <i class="ri-global-line text-green-500 text-lg"></i>
                                    <p class="font-medium text-secondary">Global</p>
                                </div>
                                <p class="text-sm text-gray-500 mt-1">Se aplica en todas las páginas del sitio.</p>
                            </div>
                        </label>
                        <label class="flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors
                            {{ old('scope') === 'per_page' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-primary' }}">
                            <input type="radio" name="scope" value="per_page" {{ old('scope') === 'per_page' ? 'checked' : '' }}
                                class="mt-1 w-4 h-4 text-primary border-gray-300 focus:ring-primary script-scope-radio">
                            <div class="ml-3">
                                <div class="flex items-center gap-2">
                                    <i class="ri-pages-line text-purple-500 text-lg"></i>
                                    <p class="font-medium text-secondary">Por página</p>
                                </div>
                                <p class="text-sm text-gray-500 mt-1">Solo en las páginas que selecciones.</p>
                            </div>
                        </label>
                    </div>
                    @error('scope')
                        <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                    @enderror
                </div>
            </div>
            <div id="page-selector" class="{{ old('scope') === 'per_page' ? '' : 'hidden' }} mt-4">
                <label class="block text-sm font-medium text-secondary mb-2">
                    Seleccionar Páginas <span class="text-red-500">*</span>
                </label>
                @if($pages->count() > 0)
                    <div class="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50">
                        @foreach($pages as $page)
                            <div class="flex items-center">
                                <input type="checkbox" id="page_{{ $page->id }}" name="page_slugs[]"
                                    value="{{ $page->slug }}"
                                    {{ is_array(old('page_slugs')) && in_array($page->slug, old('page_slugs')) ? 'checked' : '' }}
                                    class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                                <label for="page_{{ $page->id }}" class="ml-2 text-sm text-gray-700 cursor-pointer">
                                    {{ $page->title }}
                                    <span class="text-gray-400 text-xs">/{{ $page->slug }}</span>
                                </label>
                            </div>
                        @endforeach
                    </div>
                @else
                    <p class="text-sm text-gray-500 italic">No hay páginas publicadas disponibles.</p>
                @endif
                @error('page_slugs')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
        </div>

        <div class="card">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-secondary">
                    Código
                    <span id="editor-type-label" class="text-sm font-normal text-gray-500 ml-2">JavaScript</span>
                </h3>
                <div class="flex items-center gap-2">
                    <button type="button" id="btn-format" class="btn-outline btn-sm" title="Formatear código">
                        <i class="ri-magic-line mr-1"></i>
                        Formatear
                    </button>
                    <button type="button" id="btn-help" class="btn-ghost btn-sm" title="Ayuda y recomendaciones">
                        <i class="ri-question-line mr-1"></i>
                        Ayuda
                    </button>
                </div>
            </div>

            <div id="security-warning" class="hidden mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div class="flex items-start gap-2">
                    <i class="ri-error-warning-line text-red-500 text-lg flex-shrink-0 mt-0.5"></i>
                    <div>
                        <p class="text-sm font-medium text-red-700">Patrones no permitidos detectados</p>
                        <p id="security-warning-detail" class="text-xs text-red-600 mt-1"></p>
                    </div>
                </div>
            </div>

            <div id="js-editor-wrapper" class="script-editor-wrapper">
                <div id="js-editor" class="script-codemirror-editor"></div>
                <textarea id="js_content" name="js_content" class="hidden">{{ old('js_content') }}</textarea>
                @error('js_content')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>

            <div id="css-editor-wrapper" class="script-editor-wrapper hidden">
                <div id="css-editor" class="script-codemirror-editor"></div>
                <textarea id="css_content" name="css_content" class="hidden">{{ old('css_content') }}</textarea>
                @error('css_content')
                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                @enderror
            </div>
        </div>

        <div class="card">
            <h3 class="text-lg font-semibold text-secondary mb-3">Publicación</h3>

            @if($canAutoApprove)
                <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div class="flex items-center gap-2">
                        <i class="ri-shield-check-line text-green-600 text-lg"></i>
                        <p class="text-sm text-green-700 font-medium">Tienes permiso de auto-aprobación.</p>
                    </div>
                    <p class="text-xs text-green-600 mt-1">El script será aprobado automáticamente al guardarlo. Podrás activarlo desde la vista de detalles.</p>
                </div>
            @else
                <div class="space-y-3">
                    <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                        <p class="text-sm text-gray-600">
                            <i class="ri-information-line mr-1 text-primary"></i>
                            Los scripts deben ser revisados antes de activarse en el sitio público.
                        </p>
                    </div>
                    <label class="flex items-start p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary transition-colors">
                        <input type="checkbox" name="submit_for_review" value="1"
                            {{ old('submit_for_review') ? 'checked' : '' }}
                            id="submit_for_review"
                            class="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                        <div class="ml-3">
                            <p class="font-medium text-secondary">Enviar a revisión</p>
                            <p class="text-sm text-gray-500 mt-1">
                                Marca esta opción para enviar el script al revisor. Si no la marcas, se guardará como borrador.
                            </p>
                        </div>
                    </label>
                </div>
            @endif
        </div>

        <div class="flex justify-between gap-4">
            <a href="{{ route('scripts.index') }}" class="btn-outline">
                <i class="ri-close-line mr-2"></i>
                Cancelar
            </a>
            <button type="submit" id="btn-submit" class="btn-primary">
                <i class="ri-save-line mr-2"></i>
                {{ $canAutoApprove ? 'Guardar y Aprobar' : 'Guardar Script' }}
            </button>
        </div>
    </form>
</div>

<div id="help-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div class="flex items-center justify-between p-6 border-b shrink-0">
            <h3 class="text-xl font-semibold text-secondary flex items-center gap-2">
                <i class="ri-question-line text-primary"></i>
                Guía de Scripts
            </h3>
            <button type="button" id="close-help-modal" class="text-gray-400 hover:text-gray-600">
                <i class="ri-close-line text-2xl"></i>
            </button>
        </div>
        <div class="p-6 overflow-y-auto space-y-6">

            <div class="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 class="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <i class="ri-shield-cross-line"></i>
                    ⚠️ Restricciones de Seguridad (CSP)
                </h4>
                <p class="text-sm text-red-600 mb-2">Los siguientes patrones están <strong>bloqueados</strong> por los headers de seguridad del sitio:</p>
                <ul class="text-sm text-red-600 space-y-1 list-disc list-inside">
                    <li>Atributos de eventos inline: <code class="bg-red-100 px-1 rounded">onclick</code>, <code class="bg-red-100 px-1 rounded">onload</code>, <code class="bg-red-100 px-1 rounded">onerror</code>, etc.</li>
                    <li>URLs con protocolo JavaScript: <code class="bg-red-100 px-1 rounded">javascript:</code></li>
                    <li>Estilos inline en HTML: <code class="bg-red-100 px-1 rounded">style="..."</code></li>
                    <li>Funciones peligrosas: <code class="bg-red-100 px-1 rounded">document.write()</code></li>
                </ul>
            </div>

            <div>
                <h4 class="font-semibold text-secondary mb-3 flex items-center gap-2">
                    <i class="ri-javascript-line text-yellow-500"></i>
                    Ejemplo: Botón Flotante con Link
                </h4>
                <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto"><code>(function() {
  // Crear el botón
  var btn = document.createElement('a');
  btn.href = 'https://wa.me/50212345678';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';

  // Crear ícono (usar clase CSS, no inline style)
  var icon = document.createElement('span');
  icon.className = 'floating-btn-icon';
  icon.textContent = '💬';

  btn.appendChild(icon);
  btn.className = 'floating-whatsapp-btn';
  document.body.appendChild(btn);
})();</code></pre>
                <p class="text-xs text-gray-500 mt-2">💡 Usa clases CSS en lugar de estilos inline. Define los estilos en un script de tipo CSS.</p>
            </div>

            <div>
                <h4 class="font-semibold text-secondary mb-3 flex items-center gap-2">
                    <i class="ri-css3-line text-blue-500"></i>
                    Ejemplo: Estilos para Botón Flotante (CSS)
                </h4>
                <pre class="bg-gray-900 text-blue-300 p-4 rounded-lg text-xs overflow-x-auto"><code>.floating-whatsapp-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  background: #25D366;
  color: white;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: transform 0.2s;
}
.floating-whatsapp-btn:hover {
  transform: scale(1.1);
}</code></pre>
            </div>

            <div>
                <h4 class="font-semibold text-secondary mb-3 flex items-center gap-2">
                    <i class="ri-bar-chart-line text-orange-500"></i>
                    Ejemplo: Google Analytics (GA4)
                </h4>
                <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto"><code>// Cargar GA4 dinámicamente (compatible con CSP)
(function() {
  var script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
})();</code></pre>
                <p class="text-xs text-gray-500 mt-2">⚠️ Recuerda agregar <code class="bg-gray-100 px-1 rounded">https://www.googletagmanager.com</code> a los headers CSP del sitio público.</p>
            </div>

            <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 class="font-semibold text-blue-700 mb-2">💡 Buenas Prácticas</h4>
                <ul class="text-sm text-blue-600 space-y-1 list-disc list-inside">
                    <li>Envuelve tu código JS en una IIFE: <code class="bg-blue-100 px-1 rounded">(function() {{ '{}' }})();</code></li>
                    <li>Usa <code class="bg-blue-100 px-1 rounded">document.addEventListener('DOMContentLoaded', ...)</code> para esperar el DOM</li>
                    <li>Evita variables globales que puedan colisionar con otros scripts</li>
                    <li>Para CSS, usa clases específicas para evitar conflictos con los estilos del sitio</li>
                    <li>Prueba siempre en la vista previa antes de activar</li>
                </ul>
            </div>
        </div>
    </div>
</div>

@endsection

@push('styles')
    @vite('resources/css/views/scripts/scripts.css')
@endpush

@push('scripts')
    @vite('resources/js/views/scripts/form.js')
@endpush
