@extends('layouts.admin')

@section('title', 'Formularios')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Formularios</span>
        <span class="badge badge-info">{{ $stats['total'] }}
            {{ $stats['total'] === 1 ? 'formulario' : 'formularios' }}</span>
    </div>
@endsection

@section('header-actions')
    @canany(['forms.create', 'forms.manage'])
        <a href="{{ route('forms.create') }}" class="btn-primary btn-sm btn-header-action">
            <i class="ri-add-line sm:mr-2"></i>
            <span class="btn-text">Crear</span>
            <span class="btn-tooltip">Crear</span>
        </a>
    @endcanany
@endsection

@section('content')
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="card flex items-center justify-between">
            <span class="text-sm text-gray-600">Formularios activos</span>
            <span class="text-2xl font-bold text-secondary">{{ $stats['active'] }}</span>
        </div>
        <div class="card flex items-center justify-between">
            <span class="text-sm text-gray-600">Total de formularios</span>
            <span class="text-2xl font-bold text-secondary">{{ $stats['total'] }}</span>
        </div>
        <div class="card flex items-center justify-between">
            <span class="text-sm text-gray-600">Respuestas recibidas</span>
            <span class="text-2xl font-bold text-secondary">{{ $stats['submissions'] }}</span>
        </div>
    </div>

    <div class="card mb-6">
        <form method="GET" action="{{ route('forms.index') }}" class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
                <input type="text" name="search" value="{{ request('search') }}"
                    placeholder="Buscar por nombre o slug..." class="input-field">
            </div>
            <select name="status" class="input-field sm:w-48">
                <option value="">Todos los estados</option>
                <option value="active" {{ request('status') === 'active' ? 'selected' : '' }}>Activos</option>
                <option value="inactive" {{ request('status') === 'inactive' ? 'selected' : '' }}>Inactivos</option>
            </select>
            <select name="per_page" class="input-field sm:w-28" onchange="this.form.submit()">
                @foreach ([10, 20, 30] as $size)
                    <option value="{{ $size }}" {{ (int) request('per_page', 10) === $size ? 'selected' : '' }}>
                        {{ $size }}</option>
                @endforeach
            </select>
            <div class="flex items-center gap-2">
                <button type="submit" class="btn-secondary whitespace-nowrap">
                    <i class="ri-search-line mr-2"></i>
                    Buscar
                </button>
                @if (request('search') || request('status'))
                    <a href="{{ route('forms.index') }}" class="btn-outline whitespace-nowrap">
                        <i class="ri-close-line mr-2"></i>
                        Limpiar
                    </a>
                @endif
            </div>
        </form>
    </div>

    @if ($forms->count() > 0)
        <div class="grid gap-4 pages-grid">
            @foreach ($forms as $form)
                <div class="card group hover:shadow-lg transition-shadow flex flex-col h-full p-4"
                    id="form-item-{{ $form->id }}">
                    <div class="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div class="flex-1 min-w-0">
                            <h3 class="text-base font-bold text-secondary mb-1 line-clamp-2">{{ $form->name }}</h3>
                            <button type="button" data-copy-slug data-slug="{{ $form->slug }}"
                                class="text-[11px] text-gray-500 font-mono truncate max-w-full inline-flex items-center gap-1 hover:text-primary transition-colors cursor-pointer bg-transparent border-none p-0">
                                <i class="ri-file-copy-line text-[11px]"></i>
                                <span class="truncate">{{ $form->slug }}</span>
                            </button>
                        </div>
                        <span
                            class="badge {{ $form->is_active ? 'badge-success' : 'badge-warning' }} flex-shrink-0 whitespace-nowrap">
                            <i class="ri-{{ $form->is_active ? 'eye' : 'eye-off' }}-line mr-1"></i>
                            {{ $form->is_active ? 'Activo' : 'Inactivo' }}
                        </span>
                    </div>

                    <div class="space-y-1.5 flex-1">
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Versión:</span>
                            <span
                                class="font-semibold text-secondary font-mono">v{{ $form->currentVersion?->version ?? '-' }}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Campos:</span>
                            <span
                                class="font-semibold text-secondary">{{ count($form->currentVersion?->fields ?? []) }}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Respuestas:</span>
                            <span class="font-semibold text-secondary">{{ $form->submissions_count }}</span>
                        </div>
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Actualizado:</span>
                            <span class="font-semibold text-secondary">{{ $form->updated_at->format('d/m/Y H:i') }}</span>
                        </div>
                        @if ($form->editor ?? $form->creator)
                            <div class="flex items-center justify-between text-sm text-gray-600">
                                <span>Por:</span>
                                <span
                                    class="font-semibold text-secondary truncate ml-2">{{ ($form->editor ?? $form->creator)->name }}</span>
                            </div>
                        @endif
                    </div>

                    <div class="flex items-center gap-2 mt-1 pt-3 border-t border-gray-100">
                        @canany(['forms.edit', 'forms.manage'])
                            <a href="{{ route('forms.edit', $form) }}"
                                class="btn-outline btn-sm flex-1 flex items-center justify-center gap-2">
                                <i class="ri-edit-line"></i>
                                <span>Editar</span>
                            </a>
                        @endcanany

                        @canany(['forms.edit', 'forms.delete', 'forms.manage'])
                            <div class="dropdown" data-dropdown>
                                <button type="button"
                                    class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                    onclick="toggleDropdown(this.closest('.dropdown'))">
                                    <i class="ri-more-2-fill text-lg"></i>
                                </button>
                                <div class="dropdown-menu">
                                    @canany(['forms.edit', 'forms.manage'])
                                        <button type="button" data-toggle-form data-form-id="{{ $form->id }}"
                                            data-active="{{ $form->is_active ? '1' : '0' }}" class="dropdown-item">
                                            <i class="ri-{{ $form->is_active ? 'eye-off' : 'eye' }}-line"></i>
                                            <span>{{ $form->is_active ? 'Desactivar' : 'Activar' }}</span>
                                        </button>
                                    @endcanany

                                    @canany(['forms.delete', 'forms.manage'])
                                        <button type="button" data-delete-form data-form-id="{{ $form->id }}"
                                            data-form-name="{{ $form->name }}" class="dropdown-item-danger">
                                            <i class="ri-archive-line"></i>
                                            <span>Archivar</span>
                                        </button>
                                    @endcanany
                                </div>
                            </div>
                        @endcanany
                    </div>
                </div>
            @endforeach
        </div>

        @if ($forms->hasPages())
            <div class="mt-6">
                {{ $forms->appends(request()->query())->links() }}
            </div>
        @endif
    @else
        <div class="card text-center py-12">
            <i class="ri-survey-line text-6xl text-gray-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">No hay formularios</h3>
            <p class="text-gray-600 mb-6">
                @if (request('search') || request('status'))
                    No se encontraron formularios que coincidan con tu búsqueda
                @else
                    Comienza creando tu primer formulario
                @endif
            </p>
            @if (request('search') || request('status'))
                <a href="{{ route('forms.index') }}" class="btn-outline inline-flex items-center">
                    <i class="ri-close-line mr-2"></i>
                    Limpiar búsqueda
                </a>
            @else
                @canany(['forms.create', 'forms.manage'])
                    <a href="{{ route('forms.create') }}" class="btn-primary inline-flex items-center">
                        <i class="ri-add-line mr-2"></i>
                        Crear primer formulario
                    </a>
                @endcanany
            @endif
        </div>
    @endif
@endsection

@push('scripts')
    @vite('resources/js/views/forms/index.js')
@endpush
