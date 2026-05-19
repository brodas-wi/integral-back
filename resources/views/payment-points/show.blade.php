@extends('layouts.admin')

@section('title', 'Detalles del Punto de Pago')
@section('page-title', 'Detalles del Punto de Pago')

@section('content')
    <div class="max-w-6xl">
        <div class="mb-6">
            <a href="{{ route('payment-points.index') }}" class="btn-outline inline-flex items-center">
                <i class="ri-arrow-left-line mr-2"></i>
                Volver
            </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2">
                <div class="card mb-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold text-secondary mb-2">{{ $paymentPoint->affiliate }}</h2>
                            <p class="text-lg text-gray-600 mb-2">{{ $paymentPoint->branch }}</p>
                            <div class="flex items-center gap-2 mt-3">
                                <span class="badge badge-info">
                                    {{ $paymentPoint->correspondent }}
                                </span>
                                <span class="badge {{ $paymentPoint->is_active ? 'badge-success' : 'badge-danger' }}">
                                    {{ $paymentPoint->is_active ? 'Activo' : 'Inactivo' }}
                                </span>
                                @if ($paymentPoint->coordinates)
                                    <span class="badge badge-info">
                                        <i class="ri-map-pin-line mr-1"></i>
                                        Geolocalizado
                                    </span>
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold text-secondary mb-3 flex items-center">
                                <i class="ri-map-pin-2-line text-primary mr-2"></i>
                                Ubicación
                            </h3>
                            <div class="space-y-2">
                                <div class="flex items-start gap-2">
                                    <span class="text-sm text-gray-600 w-24 flex-shrink-0">Dirección:</span>
                                    <span class="text-sm text-secondary flex-1">{{ $paymentPoint->address }}</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-sm text-gray-600 w-24 flex-shrink-0">Municipio:</span>
                                    <span class="text-sm text-secondary flex-1">{{ $paymentPoint->municipality }}</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-sm text-gray-600 w-24 flex-shrink-0">Distrito:</span>
                                    <span class="text-sm text-secondary flex-1">{{ $paymentPoint->department }}</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-sm text-gray-600 w-24 flex-shrink-0">Zona:</span>
                                    <span class="text-sm text-secondary flex-1">{{ $paymentPoint->zone }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                @if ($paymentPoint->coordinates)
                    <div class="card">
                        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                            <div class="flex-1">
                                <h3 class="font-semibold text-secondary flex items-center mb-2">
                                    <i class="ri-map-line text-primary mr-2"></i>
                                    Mapa de Ubicación
                                </h3>
                                <div class="text-xs text-gray-600 flex gap-6 flex-row">
                                    <div>
                                        <span class="font-medium">Lat:</span>
                                        {{ number_format($paymentPoint->latitude, 6) }}
                                    </div>
                                    <div>
                                        <span class="font-medium">Lng:</span>
                                        {{ number_format($paymentPoint->longitude, 6) }}
                                    </div>
                                </div>
                            </div>
                            <a href="{{ $paymentPoint->google_maps_link }}" target="_blank"
                                class="btn-outline btn-sm inline-flex items-center whitespace-nowrap flex-shrink-0">
                                <i class="ri-map-pin-line mr-2"></i>
                                Google Maps
                            </a>
                        </div>
                        <div class="bg-gray-100 rounded-lg overflow-hidden" style="height: 450px;">
                            <div id="agency-map" data-latitude="{{ $paymentPoint->latitude }}"
                                data-longitude="{{ $paymentPoint->longitude }}"
                                data-name="{{ $paymentPoint->affiliate }} - {{ $paymentPoint->branch }}"
                                data-municipality="{{ $paymentPoint->municipality }}"
                                data-department="{{ $paymentPoint->department }}" style="width: 100%; height: 100%;">
                            </div>
                        </div>
                    </div>
                @endif
            </div>

            <div class="lg:col-span-1">
                <div class="card">
                    <h3 class="font-semibold text-secondary mb-4">Acciones</h3>
                    <div class="space-y-2">
                        @canany(['payment_points.edit', 'payment_points.manage'])
                            <a href="{{ route('payment-points.edit', $paymentPoint) }}" class="btn-secondary w-full btn-sm">
                                <i class="ri-edit-line mr-2"></i>
                                Editar
                            </a>
                        @endcanany

                        @canany(['payment_points.delete', 'payment_points.manage'])
                            <form id="delete-form" action="{{ route('payment-points.destroy', $paymentPoint) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="button"
                                    onclick="confirmDelete({{ $paymentPoint->id }}, '{{ addslashes($paymentPoint->affiliate) }} - {{ addslashes($paymentPoint->branch) }}')"
                                    class="btn-danger w-full btn-sm">
                                    <i class="ri-delete-bin-line mr-2"></i>
                                    Eliminar
                                </button>
                            </form>
                        @endcanany
                    </div>
                </div>

                <div class="card mt-6">
                    <h3 class="font-semibold text-secondary mb-4">Información del Sistema</h3>
                    <div class="space-y-3">
                        <div>
                            <p class="text-xs text-gray-600 mb-1">Creado por</p>
                            <p class="text-sm text-secondary">{{ $paymentPoint->creator->name }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-600 mb-1">Fecha de creación</p>
                            <p class="text-sm text-secondary">{{ $paymentPoint->created_at->format('d/m/Y H:i') }}</p>
                        </div>
                        @if ($paymentPoint->updated_by)
                            <div>
                                <p class="text-xs text-gray-600 mb-1">Actualizado por</p>
                                <p class="text-sm text-secondary">{{ $paymentPoint->updater->name }}</p>
                            </div>
                        @endif
                        <div>
                            <p class="text-xs text-gray-600 mb-1">Última actualización</p>
                            <p class="text-sm text-secondary">{{ $paymentPoint->updated_at->format('d/m/Y H:i') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection