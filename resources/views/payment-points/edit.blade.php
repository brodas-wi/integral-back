@extends('layouts.admin')

@section('title', 'Editar Punto de Pago')
@section('page-title', 'Editar Punto de Pago')

@section('content')
    <div class="max-w-4xl">
        @if ($errors->any())
            <div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <div class="flex items-start gap-2">
                    <i class="ri-error-warning-line text-xl mt-0.5"></i>
                    <div class="flex-1">
                        <p class="font-semibold mb-2">Por favor corrige los siguientes errores:</p>
                        <ul class="list-disc list-inside space-y-1">
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        @endif

        <div class="card">
            <form action="{{ route('payment-points.update', $paymentPoint) }}" method="POST" id="paymentPointForm">
                @csrf
                @method('PUT')

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div class="md:col-span-2">
                        <label for="correspondent" class="block text-sm font-medium text-secondary mb-2">
                            Corresponsal <span class="text-red-500">*</span>
                        </label>
                        <select id="correspondent" name="correspondent" required
                            class="input-field @error('correspondent') border-red-500 @enderror">
                            <option value="">Seleccionar corresponsal</option>
                            @foreach ($correspondents as $key => $name)
                                <option value="{{ $key }}" {{ old('correspondent', $paymentPoint->correspondent) == $key ? 'selected' : '' }}>
                                    {{ $name }}
                                </option>
                            @endforeach
                        </select>
                        @error('correspondent')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="zone" class="block text-sm font-medium text-secondary mb-2">
                            Zona <span class="text-red-500">*</span>
                        </label>
                        <select id="zone" name="zone" required
                            class="input-field @error('zone') border-red-500 @enderror">
                            <option value="">Seleccionar zona</option>
                            @foreach ($zones as $zone)
                                <option value="{{ $zone }}" {{ old('zone', $paymentPoint->zone) == $zone ? 'selected' : '' }}>
                                    {{ $zone }}
                                </option>
                            @endforeach
                        </select>
                        @error('zone')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div>
                        <label for="department" class="block text-sm font-medium text-secondary mb-2">
                            Distrito <span class="text-red-500">*</span>
                        </label>
                        <select id="department" name="department" required
                            class="input-field @error('department') border-red-500 @enderror"
                            data-saved-value="{{ old('department', $paymentPoint->department) }}"
                            disabled>
                            <option value="">Seleccionar distrito</option>
                        </select>
                        @error('department')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="md:col-span-2">
                        <label for="municipality" class="block text-sm font-medium text-secondary mb-2">
                            Municipio <span class="text-red-500">*</span>
                        </label>
                        <select id="municipality" name="municipality" required
                            class="input-field @error('municipality') border-red-500 @enderror"
                            data-saved-value="{{ old('municipality', $paymentPoint->municipality) }}"
                            disabled>
                            <option value="">Seleccionar municipio</option>
                        </select>
                        @error('municipality')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="md:col-span-2">
                        <label for="affiliate" class="block text-sm font-medium text-secondary mb-2">
                            Afiliado <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="affiliate" name="affiliate"
                            value="{{ old('affiliate', $paymentPoint->affiliate) }}" required
                            class="input-field @error('affiliate') border-red-500 @enderror"
                            placeholder="Ej: SUPER SELECTOS">
                        @error('affiliate')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="md:col-span-2">
                        <label for="branch" class="block text-sm font-medium text-secondary mb-2">
                            Sucursal <span class="text-red-500">*</span>
                        </label>
                        <input type="text" id="branch" name="branch" value="{{ old('branch', $paymentPoint->branch) }}"
                            required class="input-field @error('branch') border-red-500 @enderror"
                            placeholder="Ej: SELECTOS AHUACHAPAN">
                        @error('branch')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="md:col-span-2">
                        <label for="address" class="block text-sm font-medium text-secondary mb-2">
                            Dirección <span class="text-red-500">*</span>
                        </label>
                        <textarea id="address" name="address" rows="2" required
                            class="input-field @error('address') border-red-500 @enderror"
                            placeholder="Dirección completa del punto de pago">{{ old('address', $paymentPoint->address) }}</textarea>
                        @error('address')
                            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="md:col-span-2">
                        <div class="flex items-center justify-between mb-2">
                            <label class="block text-sm font-medium text-secondary">
                                Coordenadas (Opcional)
                            </label>
                            <button type="button" id="geocode-btn"
                                class="text-sm text-primary hover:underline">
                                <i class="ri-map-pin-line mr-1"></i>
                                Obtener Coordenadas
                            </button>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <input type="text" id="latitude" name="latitude"
                                    value="{{ old('latitude', $paymentPoint->latitude) }}"
                                    class="input-field @error('latitude') border-red-500 @enderror" placeholder="Latitud">
                                @error('latitude')
                                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                @enderror
                            </div>
                            <div>
                                <input type="text" id="longitude" name="longitude"
                                    value="{{ old('longitude', $paymentPoint->longitude) }}"
                                    class="input-field @error('longitude') border-red-500 @enderror" placeholder="Longitud">
                                @error('longitude')
                                    <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
                                @enderror
                            </div>
                        </div>
                        <p class="text-xs text-gray-600 mt-1">Haz clic en el mapa o arrastra el marcador para ajustar la
                            ubicación</p>
                    </div>

                    <div class="md:col-span-2">
                        <label class="block text-sm font-medium text-secondary mb-2">
                            Vista Previa de Ubicación
                        </label>
                        <div class="bg-gray-100 rounded-lg overflow-hidden border border-gray-300 payment-point-form-map-container">
                            <div id="agency-form-map"></div>
                        </div>
                        <p class="text-xs text-gray-600 mt-1">
                            <i class="ri-information-line"></i>
                            Haz clic en el mapa para colocar un marcador o arrástralo para ajustar la ubicación exacta.
                        </p>
                    </div>

                    <div class="md:col-span-2">
                        <input type="hidden" name="is_active" value="0">
                        <label class="flex items-center">
                            <input type="checkbox" name="is_active" value="1"
                                {{ old('is_active', $paymentPoint->is_active ? '1' : '0') == '1' ? 'checked' : '' }}
                                class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
                            <span class="ml-2 text-sm text-secondary">Punto de pago activo</span>
                        </label>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button type="submit" class="btn-secondary">
                        <i class="ri-save-line mr-2"></i>
                        Actualizar
                    </button>
                    <a href="{{ route('payment-points.index') }}" class="btn-outline">
                        <i class="ri-arrow-left-line mr-2"></i>
                        Cancelar
                    </a>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('head')
    <meta name="payment-points-geocode-url" content="{{ route('payment-points.geocode') }}">
    <meta name="payment-points-municipalities-url" content="{{ route('payment-points.municipalities') }}">
@endpush

@push('styles')
    @vite('resources/css/views/payment-points/payment-points.css')
@endpush

@push('scripts')
    @vite('resources/js/views/payment-points/form.js')
@endpush
