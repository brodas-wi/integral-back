@extends('layouts.admin')

@section('title', $script->name)
@section('page-title', 'Detalle de Script')

@section('header-actions')
    @canany(['scripts.edit', 'scripts.manage'])
        @if(!($script->isApproved() && $script->is_active))
            <a href="{{ route('scripts.edit', $script) }}" class="btn-secondary btn-sm btn-header-action">
                <i class="ri-edit-line sm:mr-2"></i>
                <span class="btn-text">Editar</span>
                <span class="btn-tooltip">Editar</span>
            </a>
        @endif
    @endcanany
@endsection

@section('content')
<div class="max-w-5xl space-y-6">

    <div class="mb-2">
        <a href="{{ route('scripts.index') }}" class="btn-outline inline-flex items-center">
            <i class="ri-arrow-left-line mr-2"></i>
            Volver a Scripts
        </a>
    </div>

    <div class="card">
        <div class="flex items-start gap-4">
            <div class="shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-yellow-100 text-yellow-700">
                <i class="ri-javascript-line text-3xl"></i>
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2 mb-2">
                    @php
                        $statusClasses = [
                            'draft'          => 'badge-gray',
                            'pending_review' => 'badge-warning',
                            'approved'       => 'badge-success',
                            'rejected'       => 'badge-danger',
                        ];
                    @endphp
                    <span class="badge {{ $statusClasses[$script->status] ?? 'badge-gray' }} text-sm px-3 py-1">
                        {{ $script->status_label }}
                    </span>
                    <span class="badge badge-gray">
                        <i class="{{ $script->scope === 'global' ? 'ri-global-line' : 'ri-pages-line' }} mr-1"></i>
                        {{ $script->scope_label }}
                    </span>
                    @if($script->css_content)
                        <span class="badge badge-info">
                            <i class="ri-css3-line mr-1"></i>CSS incluido
                        </span>
                    @endif
                    @if($script->is_active)
                        <span class="badge badge-success">
                            <i class="ri-checkbox-circle-line mr-1"></i>Activo
                        </span>
                    @endif
                </div>
                <h2 class="text-xl font-bold text-secondary">{{ $script->name }}</h2>
                @if($script->description)
                    <p class="text-gray-500 mt-1">{{ $script->description }}</p>
                @endif
            </div>

            @canany(['scripts.activate', 'scripts.manage'])
                @if($script->isApproved())
                    <div class="shrink-0 flex flex-col items-center gap-1">
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" id="show-script-toggle"
                                data-script-id="{{ $script->id }}"
                                {{ $script->is_active ? 'checked' : '' }}>
                            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer-focus:ring-opacity-20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                        <span class="text-xs text-gray-500" id="toggle-label">
                            {{ $script->is_active ? 'Activo' : 'Inactivo' }}
                        </span>
                    </div>
                @endif
            @endcanany
        </div>

        @if($script->isRejected() && $script->rejection_reason)
            <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p class="text-sm font-medium text-red-700 mb-1">
                    <i class="ri-close-circle-line mr-1"></i>Motivo del rechazo:
                </p>
                <p class="text-sm text-red-600">{{ $script->rejection_reason }}</p>
            </div>
        @endif

        @canany(['scripts.approve', 'scripts.manage'])
            @if($script->isPendingReview())
                <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p class="text-sm font-medium text-yellow-700 mb-3">
                        <i class="ri-time-line mr-1"></i>Este script está pendiente de revisión.
                    </p>
                    <div class="flex gap-3">
                        <button type="button" onclick="approveScriptShow({{ $script->id }})"
                            class="btn-success btn-sm">
                            <i class="ri-shield-check-line mr-2"></i>Aprobar Script
                        </button>
                        <button type="button" onclick="openRejectModalShow({{ $script->id }}, '{{ addslashes($script->name) }}')"
                            class="btn-danger btn-sm">
                            <i class="ri-close-circle-line mr-2"></i>Rechazar Script
                        </button>
                    </div>
                </div>
            @endif
        @endcanany
    </div>

    @if($script->scope === 'per_page' && $script->page_slugs)
        <div class="card">
            <h3 class="text-base font-semibold text-secondary mb-3">
                <i class="ri-pages-line mr-2 text-purple-500"></i>Páginas Asignadas
            </h3>
            <div class="flex flex-wrap gap-2">
                @foreach($script->page_slugs as $slug)
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
                        <i class="ri-file-line mr-1"></i>/{{ $slug }}
                    </span>
                @endforeach
            </div>
        </div>
    @endif

    {{-- Código JavaScript (siempre presente) --}}
    <div class="card">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-semibold text-secondary flex items-center gap-2">
                <i class="ri-javascript-line text-yellow-500"></i>
                Código JavaScript
                <span class="text-xs font-normal text-white bg-secondary px-2 py-0.5 rounded-full">Requerido</span>
            </h3>
            <button type="button" id="btn-copy-js" class="btn-ghost btn-sm" title="Copiar JavaScript">
                <i class="ri-file-copy-line mr-1"></i>Copiar JS
            </button>
        </div>
        <div class="script-code-viewer">
            <pre id="show-js-content" class="script-code-pre">{{ $script->js_content ?? '' }}</pre>
        </div>
    </div>

    {{-- Estilos CSS (opcional, solo si existe) --}}
    @if($script->css_content)
        <div class="card">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-base font-semibold text-secondary flex items-center gap-2">
                    <i class="ri-css3-line text-blue-500"></i>
                    Estilos CSS
                    <span class="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Opcional</span>
                </h3>
                <button type="button" id="btn-copy-css" class="btn-ghost btn-sm" title="Copiar CSS">
                    <i class="ri-file-copy-line mr-1"></i>Copiar CSS
                </button>
            </div>
            <div class="script-code-viewer">
                <pre id="show-css-content" class="script-code-pre">{{ $script->css_content }}</pre>
            </div>
        </div>
    @endif

    {{-- Vista Previa Sandbox --}}
    <div class="card">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-semibold text-secondary">
                <i class="ri-eye-line mr-2 text-primary"></i>Vista Previa (Sandbox)
            </h3>
            <div class="flex items-center gap-2">
                <span class="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    <i class="ri-shield-line mr-1"></i>Entorno aislado
                </span>
                <button type="button" id="btn-run-preview" class="btn-primary btn-sm">
                    <i class="ri-play-line mr-1"></i>Ejecutar
                </button>
                <button type="button" id="btn-reset-preview" class="btn-outline btn-sm">
                    <i class="ri-refresh-line mr-1"></i>Limpiar
                </button>
            </div>
        </div>

        <div class="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4 text-xs text-yellow-700">
            <i class="ri-information-line mr-1"></i>
            La vista previa se ejecuta en un iframe aislado (sandbox). El comportamiento puede diferir ligeramente del sitio real.
        </div>

        <div class="border border-gray-200 rounded-lg overflow-hidden bg-white preview-container">
            <iframe id="preview-iframe"
                sandbox="allow-scripts allow-same-origin"
                class="w-full h-full border-0"
                title="Vista previa del script"></iframe>
        </div>
    </div>

    <div class="card">
        <h3 class="text-base font-semibold text-secondary mb-4">
            <i class="ri-history-line mr-2"></i>Historial
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div class="space-y-3">
                <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center shrink-0">
                        <i class="ri-user-add-line text-primary text-sm"></i>
                    </div>
                    <div>
                        <p class="text-xs text-gray-400">Creado por</p>
                        <p class="font-medium text-secondary">{{ $script->creator->name }}</p>
                        <p class="text-xs text-gray-400">{{ $script->created_at->format('d/m/Y H:i') }}</p>
                    </div>
                </div>
                @if($script->updated_at != $script->created_at)
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                            <i class="ri-edit-line text-gray-500 text-sm"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-400">Última edición</p>
                            <p class="font-medium text-secondary">{{ $script->updater->name }}</p>
                            <p class="text-xs text-gray-400">{{ $script->updated_at->format('d/m/Y H:i') }}</p>
                        </div>
                    </div>
                @endif
            </div>
            <div class="space-y-3">
                @if($script->isApproved() && $script->approver)
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                            <i class="ri-shield-check-line text-green-600 text-sm"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-400">Aprobado por</p>
                            <p class="font-medium text-secondary">{{ $script->approver->name }}</p>
                            <p class="text-xs text-gray-400">{{ $script->approved_at?->format('d/m/Y H:i') }}</p>
                        </div>
                    </div>
                @endif
                @if($script->isRejected() && $script->reviewer)
                    <div class="flex items-start gap-3">
                        <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                            <i class="ri-close-circle-line text-red-500 text-sm"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-400">Rechazado por</p>
                            <p class="font-medium text-secondary">{{ $script->reviewer->name }}</p>
                            <p class="text-xs text-gray-400">{{ $script->reviewed_at?->format('d/m/Y H:i') }}</p>
                        </div>
                    </div>
                @endif
            </div>
        </div>
    </div>

    @canany(['scripts.delete', 'scripts.manage'])
        @if(!$script->is_active)
            <div class="card border border-red-200">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-600">Eliminar este script permanentemente.</p>
                        <p class="text-xs text-gray-400 mt-1">Esta acción no se puede deshacer.</p>
                    </div>
                    <button type="button"
                        onclick="confirmDeleteScript({{ $script->id }}, '{{ addslashes($script->name) }}')"
                        class="btn-danger btn-sm">
                        <i class="ri-delete-bin-line mr-2"></i>Eliminar
                    </button>
                </div>
            </div>
        @endif
    @endcanany

</div>

<div id="reject-modal-show" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-semibold text-secondary mb-2">Rechazar Script</h3>
        <p class="text-sm text-gray-600 mb-4">
            Indica el motivo del rechazo para <strong id="reject-script-name-show"></strong>.
        </p>
        <textarea id="rejection-reason-show" rows="4"
            class="input-field w-full mb-4"
            placeholder="Describe el motivo del rechazo..."></textarea>
        <div class="flex justify-end gap-3">
            <button type="button" onclick="closeRejectModalShow()" class="btn-outline">Cancelar</button>
            <button type="button" onclick="submitRejectShow()" class="btn-danger">
                <i class="ri-close-circle-line mr-2"></i>Rechazar
            </button>
        </div>
    </div>
</div>

@endsection

@push('head')
    <meta name="script-id" content="{{ $script->id }}">
    <meta name="script-js-content" content="{{ base64_encode($script->js_content ?? '') }}">
    <meta name="script-css-content" content="{{ base64_encode($script->css_content ?? '') }}">
    <meta name="toggle-active-url" content="{{ route('scripts.toggle-active', $script) }}">
    <meta name="approve-url" content="{{ route('scripts.approve', $script) }}">
    <meta name="reject-url" content="{{ route('scripts.reject', $script) }}">
    <meta name="delete-url" content="{{ route('scripts.destroy', $script) }}">
    <meta name="scripts-index-url" content="{{ route('scripts.index') }}">
@endpush

@push('styles')
    @vite('resources/css/views/scripts/scripts.css')
@endpush

@push('scripts')
    @vite('resources/js/views/scripts/index.js')
@endpush
