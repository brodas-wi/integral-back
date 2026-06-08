@extends('layouts.admin')

@section('title', 'Puntos de Pago')
@section('page-title')
    <x-page-title-with-stats title="Puntos de Pago" :count="$stats['total']" />
@endsection

@section('header-actions')
    <div class="flex gap-2">
        @canany(['payment_points.export', 'payment_points.manage'])
            <a href="{{ route('payment-points.export', request()->query()) }}" class="btn-outline btn-sm btn-header-action">
                <i class="ri-download-line mr-2"></i>
                <span class="btn-text">Exportar</span>
                <span class="btn-tooltip">Exportar</span>
            </a>
        @endcanany

        @canany(['payment_points.import', 'payment_points.manage'])
            <a href="{{ route('payment-points.import') }}" class="btn-outline-secondary btn-sm btn-header-action">
                <i class="ri-upload-line mr-2"></i>
                <span class="btn-text">Importar</span>
                <span class="btn-tooltip">Importar</span>
            </a>
        @endcanany

        @canany(['payment_points.create', 'payment_points.manage'])
            <a href="{{ route('payment-points.create') }}" class="btn-primary btn-sm btn-header-action">
                <i class="ri-add-line mr-2"></i>
                <span class="btn-text">Crear</span>
                <span class="btn-tooltip">Crear</span>
            </a>
        @endcanany
    </div>
@endsection

@section('content')
    <div class="card mb-6">
        <form method="GET" action="{{ route('payment-points.index') }}" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="search" value="{{ request('search') }}"
                    placeholder="Buscar por afiliado, sucursal o dirección..." class="input-field">

                <select name="status" class="input-field">
                    <option value="">Todos los estados</option>
                    <option value="active" {{ request('status') == 'active' ? 'selected' : '' }}>Activos</option>
                    <option value="inactive" {{ request('status') == 'inactive' ? 'selected' : '' }}>Inactivos</option>
                </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select name="correspondent" class="input-field">
                    <option value="">Todos los corresponsales</option>
                    @foreach ($correspondents as $key => $name)
                        <option value="{{ $key }}" {{ request('correspondent') == $key ? 'selected' : '' }}>
                            {{ $name }}
                        </option>
                    @endforeach
                </select>

                <select name="department" class="input-field">
                    <option value="">Todos los distritos</option>
                    @foreach ($departments as $department)
                        <option value="{{ $department }}" {{ request('department') == $department ? 'selected' : '' }}>
                            {{ $department }}
                        </option>
                    @endforeach
                </select>
            </div>

            <div class="flex items-end gap-2">
                <button type="submit" class="btn-secondary whitespace-nowrap">
                    <i class="ri-search-line mr-2"></i>
                    Filtrar
                </button>
                @if (request('search') || request('correspondent') || request('department') || request('status'))
                    <a href="{{ route('payment-points.index') }}" class="btn-outline whitespace-nowrap">
                        <i class="ri-close-line mr-2"></i>
                        Limpiar
                    </a>
                @endif
            </div>
        </form>
    </div>

    @if (session('info'))
        <div class="card mb-6 bg-blue-50 border border-blue-200">
            <div class="flex items-start gap-2">
                <i class="ri-information-line text-blue-600 text-xl mt-0.5"></i>
                <div class="flex-1">
                    <p class="font-medium text-blue-900">{{ session('info') }}</p>
                    <p class="text-sm text-blue-700 mt-1">
                        Puedes agregar coordenadas editando cada punto y usando el botón "Obtener Coordenadas" o ajustando
                        manualmente en el mapa.
                    </p>
                </div>
            </div>
        </div>
    @endif

    @if (session('import_duplicates') && count(session('import_duplicates')) > 0)
        <div class="card mb-6 bg-yellow-50 border border-yellow-200">
            <div class="flex items-start gap-2">
                <i class="ri-information-line text-yellow-600 text-xl mt-0.5"></i>
                <div class="flex-1">
                    <p class="font-semibold text-yellow-800 mb-2">Duplicados omitidos durante la importación:</p>
                    <ul class="list-disc list-inside text-sm text-yellow-700 max-h-40 overflow-y-auto">
                        @foreach (session('import_duplicates') as $duplicate)
                            <li>{{ $duplicate }}</li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    @endif

    @if (session('import_errors') && count(session('import_errors')) > 0)
        <div class="card mb-6 bg-red-50 border border-red-200">
            <div class="flex items-start gap-2">
                <i class="ri-error-warning-line text-red-600 text-xl mt-0.5"></i>
                <div class="flex-1">
                    <p class="font-semibold text-red-800 mb-2">Errores durante la importación:</p>
                    <ul class="list-disc list-inside text-sm text-red-700 max-h-40 overflow-y-auto">
                        @foreach (session('import_errors') as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div>
    @endif

    <div id="bulk-actions-bar" class="card mb-6 bg-primary bg-opacity-10 border-primary hidden transition-all duration-300">
        <div class="flex items-center justify-between flex-wrap gap-4">
            <div class="flex items-center gap-3">
                <span class="text-sm font-medium text-secondary">
                    <span id="selected-count">0</span> seleccionados
                </span>
                <button type="button" id="select-all-btn" class="text-sm text-primary hover:underline">
                    Seleccionar página
                </button>
                <button type="button" id="deselect-all-btn" class="text-sm text-gray-600 hover:underline">
                    Deseleccionar todos
                </button>
            </div>
            <div class="flex items-center gap-2">
                <button type="button" id="geocode-selected-btn" class="btn-secondary btn-sm">
                    <i class="ri-map-pin-line mr-2"></i>
                    Obtener Coordenadas
                </button>
            </div>
        </div>
    </div>

    <div id="geocoding-progress" class="card mb-6 bg-blue-50 border border-blue-200 hidden">
        <div class="space-y-3">
            <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-blue-900">Geocodificando puntos seleccionados...</span>
                <span class="text-sm font-medium text-blue-900" id="geocoding-progress-text">0%</span>
            </div>
            <div class="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                <div id="geocoding-progress-bar"
                    class="progress-bar bg-primary h-3 rounded-full transition-all duration-300"></div>
            </div>
            <div class="text-xs text-blue-700" id="geocoding-details">Preparando...</div>
        </div>
    </div>

    <div class="card">
        @if ($paymentPoints->count() > 0)
            <div class="space-y-4">
                @foreach ($paymentPoints as $point)
                    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors payment-point-item"
                        id="payment-point-item-{{ $point->id }}" data-point-id="{{ $point->id }}"
                        data-address="{{ $point->address }}" data-municipality="{{ $point->municipality }}"
                        data-department="{{ $point->department }}" data-affiliate="{{ $point->affiliate }}"
                        data-branch="{{ $point->branch }}"
                        data-has-coordinates="{{ $point->has_coordinates ? 'true' : 'false' }}">
                        <div class="flex items-start gap-4">
                            <div class="flex items-start pt-1">
                                <input type="checkbox"
                                    class="point-checkbox w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
                                    data-point-id="{{ $point->id }}">
                            </div>

                            <div class="flex-1 min-w-0">
                                <div class="flex items-center gap-2 mb-2">
                                    <span class="badge badge-info">{{ $point->correspondent }}</span>
                                    <span class="badge {{ $point->is_active ? 'badge-success' : 'badge-danger' }}">
                                        {{ $point->is_active ? 'Activo' : 'Inactivo' }}
                                    </span>
                                    @if ($point->has_coordinates)
                                        <span class="badge badge-success" title="Tiene coordenadas">
                                            <i class="ri-map-pin-line mr-1"></i>
                                            Con ubicación
                                        </span>
                                    @else
                                        <span class="badge badge-warning" title="Sin coordenadas">
                                            <i class="ri-map-pin-line mr-1"></i>
                                            Sin ubicación
                                        </span>
                                    @endif
                                </div>

                                <h3 class="font-semibold text-secondary text-lg mb-1">{{ $point->affiliate }}</h3>
                                <p class="text-sm text-gray-600 mb-3">{{ $point->branch }}</p>

                                <div class="flex items-start gap-2 text-sm text-gray-600">
                                    <i class="ri-map-pin-2-line text-primary mt-0.5 shrink-0"></i>
                                    <span class="flex-1">{{ $point->address }}, {{ $point->municipality }},
                                        {{ $point->department }}</span>
                                </div>
                            </div>

                            <div class="dropdown" data-dropdown>
                                <button type="button"
                                    class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center dropdown-trigger">
                                    <i class="ri-more-2-fill text-xl"></i>
                                </button>
                                <div class="dropdown-menu">
                                    @canany(['payment_points.view', 'payment_points.manage'])
                                        <a href="{{ route('payment-points.show', $point) }}" class="dropdown-item">
                                            <i class="ri-eye-line"></i>
                                            <span>Ver detalles</span>
                                        </a>
                                    @endcanany
                                    @canany(['payment_points.edit', 'payment_points.manage'])
                                        <a href="{{ route('payment-points.edit', $point) }}" class="dropdown-item">
                                            <i class="ri-edit-line"></i>
                                            <span>Editar</span>
                                        </a>
                                    @endcanany
                                    @canany(['payment_points.delete', 'payment_points.manage'])
                                        <button type="button" class="dropdown-item-danger delete-payment-point-btn"
                                            data-point-id="{{ $point->id }}"
                                            data-point-name="{{ addslashes($point->affiliate) }} - {{ addslashes($point->branch) }}">
                                            <i class="ri-delete-bin-line"></i>
                                            <span>Eliminar</span>
                                        </button>
                                    @endcanany
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="mt-6">
                {{ $paymentPoints->links() }}
            </div>
        @else
            <div class="text-center py-12">
                <i class="ri-store-line text-6xl text-gray-300 mb-4"></i>
                <p class="text-gray-500 mb-4">No se encontraron puntos de pago</p>
                @canany(['payment_points.create', 'payment_points.manage'])
                    <a href="{{ route('payment-points.create') }}" class="btn-primary inline-flex items-center">
                        <i class="ri-add-line mr-2"></i>
                        Crear primer punto
                    </a>
                @endcanany
            </div>
        @endif
    </div>
@endsection

@push('head')
    <meta name="payment-points-base-url" content="{{ route('payment-points.index') }}">
@endpush

@push('styles')
    @vite('resources/css/views/payment-points/payment-points.css')
@endpush

@push('scripts')
    @vite('resources/js/views/payment-points/index.js')
@endpush
