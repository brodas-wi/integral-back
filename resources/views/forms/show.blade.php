@extends('layouts.admin')

@section('title', 'Detalles del formulario')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>{{ $form->name }}</span>
        <span class="badge {{ $form->trashed() ? 'badge-gray' : ($form->is_active ? 'badge-success' : 'badge-warning') }}">
            {{ $form->trashed() ? 'Archivado' : ($form->is_active ? 'Activo' : 'Inactivo') }}</span>
    </div>
@endsection

@section('header-actions')
    <a href="{{ route('forms.index') }}" class="btn-outline btn-sm">
        <i class="ri-arrow-left-line mr-2"></i>
        Volver
    </a>
    @canany(['form_submissions.view', 'form_submissions.manage'])
        <a href="{{ route('forms.submissions.index', $form) }}" class="btn-outline btn-sm">
            <i class="ri-inbox-line mr-2"></i>
            Respuestas ({{ $submissionsCount }})
        </a>
    @endcanany
    @canany(['forms.edit', 'forms.manage'])
        @unless ($form->trashed())
            <a href="{{ route('forms.edit', $form) }}" class="btn-primary btn-sm">
                <i class="ri-edit-line mr-2"></i>
                Editar
            </a>
        @endunless
    @endcanany
@endsection

@php
    $fields = $version?->fields ?? [];
    $settings = $version?->settings ?? [];
    $notify = $settings['emails']['notify'] ?? [];
    $confirmation = $settings['emails']['confirmation'] ?? [];
    $thanks = $settings['thanks'] ?? [];
    $select = collect($fields)->first(fn($f) => $f['type'] === 'select' && !empty($f['options']));
    $exampleKey = $select['key'] ?? 'campo';
    $exampleValue = $select['options'][0]['value'] ?? 'valor';

    $snippets = [
        ['Botón con atributo', 'data-open-form="' . $form->slug . '"'],
        ['Enlace (sirve en el campo de URL de los bloques)', 'href="#form:' . $form->slug . '"'],
        [
            'Con un campo preseleccionado',
            'data-open-form="' .
            $form->slug .
            '" data-form-prefill=\'{"' .
            $exampleKey .
            '":"' .
            $exampleValue .
            '"}\'',
        ],
        ['Desde la URL de cualquier página', '?form=' . $form->slug . '&' . $exampleKey . '=' . $exampleValue],
    ];
@endphp

@section('content')
    <div class="space-y-6 max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="card space-y-2 text-sm">
                <h3 class="text-base font-bold text-secondary mb-2">General</h3>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Slug</span>
                    <span class="font-mono text-xs break-all text-right">{{ $form->slug }}</span>
                </div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Versión actual</span>
                    <span class="font-semibold">v{{ $version?->version ?? '-' }}</span>
                </div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Campos</span>
                    <span class="font-semibold">{{ count($fields) }}</span>
                </div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Respuestas</span>
                    <span class="font-semibold">{{ $submissionsCount }}</span>
                </div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Creado</span>
                    <span>{{ $form->created_at->format('d/m/Y H:i') }}</span>
                </div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Actualizado</span>
                    <span>{{ $form->updated_at->format('d/m/Y H:i') }}</span>
                </div>
            </div>

            <div class="lg:col-span-2 card space-y-3">
                <h3 class="text-base font-bold text-secondary">Cómo abrir este formulario</h3>
                <p class="text-xs text-gray-600">Copia cualquiera de estas formas en un botón, enlace o URL de la página
                    pública.</p>
                @foreach ($snippets as [$label, $code])
                    <div>
                        <p class="text-xs text-gray-500 mb-1">{{ $label }}</p>
                        <div class="flex items-center gap-2">
                            <code
                                class="flex-1 min-w-0 truncate text-xs bg-gray-50 border border-gray-200 rounded-full px-3 py-2">{{ $code }}</code>
                            <button type="button" data-copy="{{ $code }}" class="btn-outline btn-sm"
                                title="Copiar">
                                <i class="ri-file-copy-line"></i>
                            </button>
                        </div>
                    </div>
                @endforeach
                <p class="text-xs text-gray-500">El valor preseleccionado usa la clave de un campo y el valor de una de
                    sus opciones, como se ve en la tabla de campos.</p>
            </div>
        </div>

        <div class="card p-0 overflow-hidden">
            <div class="p-4 border-b border-gray-100">
                <h3 class="text-base font-bold text-secondary">Estructura ({{ $version?->title }})</h3>
                @if ($version?->description)
                    <p class="text-xs text-gray-500 mt-1">{{ $version->description }}</p>
                @endif
                <p class="text-xs text-gray-500 mt-1">Botón de envío: «{{ $version?->submit_label }}»</p>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="table-header">
                            <th class="table-header">#</th>
                            <th class="table-header">Etiqueta</th>
                            <th class="table-header">Clave</th>
                            <th class="table-header">Tipo</th>
                            <th class="table-header">Requerido</th>
                            <th class="table-header">Ancho</th>
                            <th class="table-header">Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($fields as $i => $field)
                            <tr class="table-row align-top">
                                <td class="py-3 px-4 text-gray-500">{{ $i + 1 }}</td>
                                <td class="py-3 px-4 font-semibold text-secondary">{{ $field['label'] }}</td>
                                <td class="py-3 px-4">
                                    <button type="button" data-copy="{{ $field['key'] }}" title="Copiar clave"
                                        class="font-mono text-xs bg-gray-50 border border-gray-200 rounded-full px-2 py-1 hover:border-primary">{{ $field['key'] }}</button>
                                </td>
                                <td class="py-3 px-4">{{ $typeLabels[$field['type']] ?? $field['type'] }}</td>
                                <td class="py-3 px-4">{{ $field['required'] ?? false ? 'Sí' : 'No' }}</td>
                                <td class="py-3 px-4">
                                    {{ ($field['width'] ?? 'full') === 'half' ? 'Media fila' : 'Fila completa' }}</td>
                                <td class="py-3 px-4 text-xs text-gray-600 space-y-1">
                                    @foreach ($field['options'] ?? [] as $option)
                                        <div><code
                                                class="bg-gray-50 border border-gray-200 rounded px-1">{{ $option['value'] }}</code>
                                            {{ $option['label'] }}</div>
                                    @endforeach
                                    @isset($field['max_length'])
                                        <div>Máx. {{ $field['max_length'] }} caracteres</div>
                                    @endisset
                                    @isset($field['decimals'])
                                        <div>Hasta {{ $field['decimals'] }} decimales</div>
                                    @endisset
                                    @if (isset($field['min']) || isset($field['max']))
                                        <div>Rango: {{ $field['min'] ?? '—' }} a {{ $field['max'] ?? '—' }}</div>
                                    @endif
                                    @if (!empty($field['verify_check_digit']))
                                        <div>Verifica dígito del DUI</div>
                                    @endif
                                    @if (!empty($field['text']))
                                        <div>{{ preg_replace('/\[([^\]]*)\]\([^)]*\)/u', '$1', $field['text']) }}</div>
                                    @endif
                                    @if ($field['type'] === 'agency')
                                        <div>Opciones: agencias activas (automático)</div>
                                    @endif
                                    @if (!empty($field['help']))
                                        <div>Ayuda: {{ $field['help'] }}</div>
                                    @endif
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div class="card space-y-2 text-sm">
                <h3 class="text-base font-bold text-secondary mb-2">Agradecimiento</h3>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Título</span>
                    <span>{{ $thanks['title'] ?? '—' }}</span>
                </div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Subtítulo</span>
                    <span class="text-right">{{ $thanks['subtitle'] ?? '—' }}</span>
                </div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Segundos</span>
                    <span>{{ $thanks['seconds'] ?? '—' }}</span>
                </div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Redirección</span>
                    <span class="break-all text-right">{{ $thanks['redirect_url'] ?? 'Ninguna (cierra y limpia)' }}</span>
                </div>
            </div>

            <div class="card space-y-2 text-sm">
                <h3 class="text-base font-bold text-secondary mb-2">Correos</h3>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Aviso interno</span>
                    <span>{{ $notify['enabled'] ?? false ? 'Activo' : 'Desactivado' }}</span>
                </div>
                @if (!empty($notify['recipients']))
                    <div class="text-xs text-gray-600 break-all">{{ implode(', ', $notify['recipients']) }}</div>
                @endif
                <div class="flex justify-between gap-3"><span class="text-gray-600">Confirmación al usuario</span>
                    <span>{{ $confirmation['enabled'] ?? false ? 'Activa' : 'Desactivada' }}</span>
                </div>
                @if (!empty($confirmation['field_key']))
                    <div class="text-xs text-gray-600">Campo de correo: <code>{{ $confirmation['field_key'] }}</code></div>
                @endif
            </div>
        </div>

        <div class="card p-0 overflow-hidden">
            <div class="p-4 border-b border-gray-100">
                <h3 class="text-base font-bold text-secondary">Historial de versiones</h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="table-header">
                            <th class="table-header">Versión</th>
                            <th class="table-header">Fecha</th>
                            <th class="table-header">Por</th>
                            <th class="table-header">Respuestas</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($versions as $item)
                            <tr class="table-row">
                                <td class="py-3 px-4 font-mono">
                                    v{{ $item->version }}
                                    @if ($item->id === $form->current_version_id)
                                        <span class="badge badge-success ml-2">Actual</span>
                                    @endif
                                </td>
                                <td class="py-3 px-4">{{ $item->created_at->format('d/m/Y H:i') }}</td>
                                <td class="py-3 px-4">{{ $item->creator?->name ?? '—' }}</td>
                                <td class="py-3 px-4">{{ $item->submissions_count }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/forms/show.js')
@endpush
