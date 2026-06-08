@extends('layouts.admin')

@section('title', 'Ver Agencia')
@section('page-title', 'Detalles de la Agencia')

@section('content')
    <div class="max-w-6xl">
        <div class="mb-6">
            <a href="{{ route('agencies.index') }}" class="btn-outline inline-flex items-center">
                <i class="ri-arrow-left-line mr-2"></i>
                Volver
            </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2">
                <div class="card mb-6">
                    <div class="flex items-start justify-between mb-4">
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold text-secondary mb-2">{{ $agency->name }}</h2>
                            <div class="flex items-center gap-2 mt-3">
                                <span class="badge {{ $agency->is_active ? 'badge-success' : 'badge-danger' }}">
                                    {{ $agency->is_active ? 'Activa' : 'Inactiva' }}
                                </span>
                                @if ($agency->coordinates)
                                    <span class="badge badge-info">
                                        <i class="ri-map-pin-line mr-1"></i>
                                        Geolocalizada
                                    </span>
                                @endif
                            </div>
                        </div>
                    </div>

                    <div class="space-y-0">
                        <div class="bg-gray-50 rounded-lg p-4">
                            <h3 class="font-semibold text-secondary mb-3 flex items-center">
                                <i class="ri-map-pin-2-line text-primary mr-2"></i>
                                Ubicación
                            </h3>
                            <div class="space-y-2">
                                <div class="flex items-start gap-2">
                                    <span class="text-sm text-gray-600 w-24 shrink-0">Dirección:</span>
                                    <span class="text-sm text-secondary flex-1">{{ $agency->address }}</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-sm text-gray-600 w-24 shrink-0">Departamento:</span>
                                    <span class="text-sm text-secondary flex-1">{{ $agency->department }}</span>
                                </div>
                                <div class="flex items-start gap-2">
                                    <span class="text-sm text-gray-600 w-24 shrink-0">Municipio:</span>
                                    <span class="text-sm text-secondary flex-1">{{ $agency->municipality }}</span>
                                </div>
                            </div>
                        </div>

                        @if ($agency->phones->count() > 0)
                            <div class="bg-gray-50 rounded-lg p-4">
                                <h3 class="font-semibold text-secondary mb-3 flex items-center">
                                    <i class="ri-phone-line text-primary mr-2"></i>
                                    Teléfonos de Contacto
                                </h3>
                                <div class="space-y-2">
                                    @foreach ($agency->phones as $phone)
                                        <div class="flex items-center gap-2">
                                            <a href="tel:{{ $phone->phone }}" class="text-sm text-primary hover:underline">
                                                {{ $phone->phone }}
                                            </a>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        @endif

                        @if ($agency->schedule)
                            <div class="bg-gray-50 rounded-lg p-4">
                                <h3 class="font-semibold text-secondary mb-3 flex items-center">
                                    <i class="ri-time-line text-primary mr-2"></i>
                                    Horario de Atención
                                </h3>
                                <p class="text-sm text-secondary">{{ $agency->schedule }}</p>
                            </div>
                        @endif
                    </div>
                </div>

                @if ($agency->coordinates)
                    <div class="card">
                        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                            <div class="flex-1">
                                <h3 class="font-semibold text-secondary flex items-center mb-2">
                                    <i class="ri-map-line text-primary mr-2"></i>
                                    Mapa de Ubicación
                                </h3>
                                <div class="flex flex-row gap-6 items-center text-xs text-gray-600">
                                    <div>
                                        <span class="font-medium">Lat:</span> {{ number_format($agency->latitude, 6) }}
                                    </div>
                                    <div>
                                        <span class="font-medium">Lng:</span> {{ number_format($agency->longitude, 6) }}
                                    </div>
                                </div>
                            </div>
                            <a href="{{ $agency->google_maps_link }}" target="_blank"
                                class="btn-outline btn-sm inline-flex items-center whitespace-nowrap shrink-0">
                                <i class="ri-map-pin-line mr-2"></i>
                                Google Maps
                            </a>
                        </div>
                        <div class="bg-gray-100 rounded-lg overflow-hidden agency-map-container">
                            <div id="agency-map" data-latitude="{{ $agency->latitude }}"
                                data-longitude="{{ $agency->longitude }}" data-name="{{ $agency->name }}"
                                data-municipality="{{ $agency->municipality }}"
                                data-department="{{ $agency->department }}">
                            </div>
                        </div>
                    </div>
                @endif
            </div>

            <div class="lg:col-span-1">
                <div class="card">
                    <h3 class="font-semibold text-secondary mb-4">Acciones</h3>
                    <div class="space-y-2">
                        @canany(['agencies.edit', 'agencies.manage'])
                            <a href="{{ route('agencies.edit', $agency) }}" class="btn-secondary w-full btn-sm">
                                <i class="ri-edit-line mr-2"></i>
                                Editar
                            </a>
                        @endcanany

                        @canany(['agencies.delete', 'agencies.manage'])
                            <form id="delete-form" action="{{ route('agencies.destroy', $agency) }}" method="POST"
                                data-agency-name="{{ $agency->name }}">
                                @csrf
                                @method('DELETE')
                                <button type="button" id="delete-agency-btn" class="btn-danger w-full btn-sm">
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
                            <p class="text-sm text-secondary">{{ $agency->creator->name }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-600 mb-1">Fecha de creación</p>
                            <p class="text-sm text-secondary">{{ $agency->created_at->format('d/m/Y H:i') }}</p>
                        </div>
                        @if ($agency->updated_by)
                            <div>
                                <p class="text-xs text-gray-600 mb-1">Actualizado por</p>
                                <p class="text-sm text-secondary">{{ $agency->updater->name }}</p>
                            </div>
                        @endif
                        <div>
                            <p class="text-xs text-gray-600 mb-1">Última actualización</p>
                            <p class="text-sm text-secondary">{{ $agency->updated_at->format('d/m/Y H:i') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('styles')
    @vite('resources/css/views/agencies/agencies.css')
@endpush

@push('scripts')
    @vite('resources/js/views/agencies/show.js')
@endpush
