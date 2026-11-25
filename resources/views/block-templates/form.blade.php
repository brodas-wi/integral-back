@extends('layouts.admin')

@section('title', $template->exists ? 'Editar plantilla' : 'Nueva plantilla')

@section('page-title', $template->exists ? 'Editar plantilla' : 'Nueva plantilla')

@section('header-actions')
    <button type="button" class="btn-secondary btn-sm btn-header-action" onclick="document.getElementById('bt-help').showModal()">
        <i class="ri-question-line sm:mr-2"></i>
        <span class="btn-text">Ayuda</span>
        <span class="btn-tooltip">Ayuda</span>
    </button>
    <a href="{{ route('block-templates.index') }}" class="btn-outline btn-sm btn-header-action">
        <i class="ri-arrow-left-line sm:mr-2"></i>
        <span class="btn-text">Volver</span>
        <span class="btn-tooltip">Volver</span>
    </a>
@endsection

@section('content')
    @php
        $canScripts = auth()->user()->can('block_templates.scripts');
        $mode = old('mode', $template->mode);
        $label = 'block text-xs font-medium text-gray-700 mb-1';
        $starterHtml = '<section class="demo"><h2>Título de ejemplo</h2><p>Texto de ejemplo para tu bloque.</p></section>';
        $starterCss = '.demo{padding:2rem;text-align:center}';
        $schemaText = old('schema', $template->schema ? json_encode($template->schema, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : '');
    @endphp

    <form id="bt-form" method="POST"
        action="{{ $template->exists ? route('block-templates.update', $template) : route('block-templates.store') }}"
        class="space-y-6">
        @csrf
        @if ($template->exists)
            @method('PUT')
        @endif

        @if ($errors->any())
            <div class="card border border-red-200 bg-red-50 text-sm text-red-700">
                <ul class="list-disc space-y-1 pl-5">
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif

        <section class="card space-y-4">
            <div class="grid gap-4 md:grid-cols-2">
                <div>
                    <label class="{{ $label }}" for="bt-name">Nombre</label>
                    <input id="bt-name" type="text" name="name" maxlength="120" value="{{ old('name', $template->name) }}" class="input-field">
                </div>
                <div class="relative" data-category-field data-categories="{{ json_encode($categories) }}">
                    <label class="{{ $label }}" for="bt-category">Categoría en el editor</label>
                    <input id="bt-category" type="text" name="category" maxlength="60" autocomplete="off" value="{{ old('category', $template->category) }}" class="input-field">
                    <div data-category-list hidden class="absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"></div>
                    <p data-category-hint hidden class="mt-1 text-xs text-amber-600"></p>
                </div>
            </div>

            <div>
                <label class="{{ $label }}" for="bt-description">Descripción</label>
                <textarea id="bt-description" name="description" rows="2" maxlength="500" class="input-field !rounded-lg">{{ old('description', $template->description) }}</textarea>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
                <div>
                    <span class="{{ $label }}">Tipo</span>
                    <div class="flex flex-wrap gap-4 text-sm text-gray-700">
                        <label class="inline-flex items-center gap-2">
                            <input type="radio" name="mode" value="static" @checked($mode === 'static')> Estática
                        </label>
                        <label class="inline-flex items-center gap-2">
                            <input type="radio" name="mode" value="managed" @checked($mode === 'managed')> Administrable
                        </label>
                    </div>
                </div>
                <div>
                    <span class="{{ $label }}">Estado</span>
                    <input type="hidden" name="is_active" value="0">
                    <label class="inline-flex cursor-pointer items-center gap-3">
                        <input type="checkbox" name="is_active" value="1" class="peer sr-only" @checked(old('is_active', $template->is_active))>
                        <span class="relative h-6 w-11 flex-shrink-0 rounded-full bg-gray-300 transition-colors after:absolute after:left-[3px] after:top-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-white after:shadow after:transition-transform after:content-[''] peer-checked:bg-secondary peer-checked:after:translate-x-5"></span>
                        <span class="text-sm text-gray-700 peer-checked:hidden">Inactiva</span>
                        <span class="hidden text-sm text-gray-700 peer-checked:inline">Activa</span>
                    </label>
                </div>
            </div>
        </section>

        <section class="card space-y-4">
            <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                    <img id="bt-icon-preview" alt="" class="h-10 w-10 rounded">
                </div>
                <div class="min-w-0 flex-1">
                    <span class="{{ $label }}">Icono SVG del bloque (opcional)</span>
                    <div class="flex flex-wrap items-center gap-2">
                        <button type="button" id="bt-icon-pick" class="btn-secondary btn-sm">
                            <i class="ri-upload-2-line mr-1"></i> Subir SVG
                        </button>
                        <button type="button" id="bt-icon-clear" class="btn-outline btn-sm hidden">
                            <i class="ri-close-line mr-1"></i> Quitar
                        </button>
                        <span id="bt-icon-name" class="truncate text-xs text-gray-500">Se usa el icono por defecto</span>
                    </div>
                    <input id="bt-icon-file" type="file" accept=".svg,image/svg+xml" class="hidden">
                </div>
            </div>
            <textarea id="bt-icon" name="icon_svg" rows="3" class="input-field !rounded-lg font-mono text-xs" placeholder="&lt;svg viewBox=&quot;0 0 32 32&quot;&gt;...&lt;/svg&gt;">{{ old('icon_svg', $template->icon_svg) }}</textarea>
        </section>

        <section class="card space-y-2">
            <div class="flex items-center justify-between gap-3">
                <label class="{{ $label }} mb-0">HTML</label>
                <button type="button" class="btn-outline btn-sm" data-format="html">
                    <i class="ri-code-line mr-1"></i> Formatear
                </button>
            </div>
            <textarea name="html" data-cm="html" rows="10" class="input-field">{{ old('html', $template->html ?: ($template->exists ? '' : $starterHtml)) }}</textarea>
        </section>

        <section class="card space-y-2">
            <div class="flex items-center justify-between gap-3">
                <label class="{{ $label }} mb-0">CSS</label>
                <button type="button" class="btn-outline btn-sm" data-format="css">
                    <i class="ri-code-line mr-1"></i> Formatear
                </button>
            </div>
            <textarea name="css" data-cm="css" rows="8" class="input-field">{{ old('css', $template->css ?: ($template->exists ? '' : $starterCss)) }}</textarea>
        </section>

        <section class="card space-y-2" data-managed-only>
            <div class="flex items-center justify-between gap-3">
                <label class="{{ $label }} mb-0">Campos administrables (JSON)</label>
                <button type="button" id="bt-detect" class="btn-secondary btn-sm">
                    <i class="ri-magic-line mr-1"></i> Detectar campos HTML
                </button>
            </div>
            <textarea name="schema" data-cm="json" rows="8" class="input-field">{{ $schemaText }}</textarea>
        </section>

        <section class="card space-y-2" data-managed-only>
            <label class="{{ $label }}">JavaScript</label>
            @unless ($canScripts)
                <p class="text-xs text-amber-600">No tienes permiso para modificar el JS. Se conservará el actual.</p>
            @endunless
            <textarea name="js" data-cm="js" rows="8" class="input-field" @unless ($canScripts) readonly @endunless>{{ old('js', $template->js) }}</textarea>
        </section>

        <section class="card space-y-2">
            <div class="flex items-center justify-between gap-3">
                <span class="{{ $label }} mb-0">Vista previa</span>
                <button type="button" id="bt-refresh" class="btn-outline btn-sm">
                    <i class="ri-refresh-line mr-1"></i> Actualizar
                </button>
            </div>
            <iframe id="bt-preview-frame" sandbox="allow-scripts" class="h-80 w-full rounded-lg border border-gray-200 bg-white"></iframe>
        </section>

        <div class="flex justify-end gap-3">
            <a href="{{ route('block-templates.index') }}" class="btn-outline">Cancelar</a>
            <button type="submit" class="btn-primary">
                <i class="ri-check-line mr-2"></i> Guardar
            </button>
        </div>
    </form>

    @include('block-templates._help')
@endsection

@push('scripts')
    @vite('resources/js/views/block-templates/form.js')
@endpush