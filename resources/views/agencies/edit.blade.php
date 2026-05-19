@extends('layouts.admin')

@section('title', 'Editar Agencia')
@section('page-title', 'Editar Agencia')

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
    <form action="{{ route('agencies.update', $agency) }}" method="POST" id="agencyForm">
      @csrf
      @method('PUT')

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="md:col-span-2">
          <label for="name" class="block text-sm font-medium text-secondary mb-2">
            Nombre de la Agencia <span class="text-red-500">*</span>
          </label>
          <input type="text" id="name" name="name" value="{{ old('name', $agency->name) }}" required
            class="input-field @error('name') border-red-500 @enderror" placeholder="Ej: Agencia Centro">
          @error('name')
          <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
          @enderror
        </div>

        <div>
          <label for="zone" class="block text-sm font-medium text-secondary mb-2">
            Zona <span class="text-red-500">*</span>
          </label>
          <select id="zone" name="zone" required class="input-field @error('zone') border-red-500 @enderror"
            onchange="filterDepartmentsByZone()">
            <option value="">Seleccionar zona</option>
            @foreach($zones as $zone)
            <option value="{{ $zone }}" {{ old('zone', $agency->zone) == $zone ? 'selected' : '' }}>{{ $zone
              }}</option>
            @endforeach
          </select>
          @error('zone')
          <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
          @enderror
        </div>

        <div>
          <label for="department" class="block text-sm font-medium text-secondary mb-2">
            Departamento <span class="text-red-500">*</span>
          </label>
          <select id="department" name="department" required
            class="input-field @error('department') border-red-500 @enderror" onchange="loadMunicipalities()"
            data-saved-value="{{ old('department', $agency->department) }}">
            <option value="">Seleccionar departamento</option>
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
            data-saved-value="{{ old('municipality', $agency->municipality) }}">
            <option value="">Seleccionar municipio</option>
          </select>
          @error('municipality')
          <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
          @enderror
        </div>

        <div class="md:col-span-2">
          <label for="address" class="block text-sm font-medium text-secondary mb-2">
            Dirección <span class="text-red-500">*</span>
          </label>
          <textarea id="address" name="address" rows="2" required
            class="input-field @error('address') border-red-500 @enderror"
            placeholder="Dirección completa de la agencia">{{ old('address', $agency->address) }}</textarea>
          @error('address')
          <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
          @enderror
        </div>

        <div class="md:col-span-2">
          <label for="schedule" class="block text-sm font-medium text-secondary mb-2">
            Horario de Atención
          </label>
          <input type="text" id="schedule" name="schedule" value="{{ old('schedule', $agency->schedule) }}"
            class="input-field @error('schedule') border-red-500 @enderror"
            placeholder="Ej: Lunes a Viernes 8:00 AM - 5:00 PM">
          @error('schedule')
          <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
          @enderror
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-secondary mb-2">
            Teléfonos
          </label>
          <div id="phones-container">
            @if($agency->phones->count() > 0)
            @foreach($agency->phones as $phone)
            <div class="flex gap-2 mb-2">
              <input type="text" name="phones[]" value="{{ $phone->phone }}" class="input-field flex-1"
                placeholder="Ej: 2222-2222">
              <button type="button" onclick="removePhone(this)" class="btn-danger">
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
            @endforeach
            @else
            <div class="flex gap-2 mb-2">
              <input type="text" name="phones[]" class="input-field flex-1" placeholder="Ej: 2222-2222">
              <button type="button" onclick="addPhone()" class="btn-outline">
                <i class="ri-add-line"></i>
              </button>
            </div>
            @endif
          </div>
          <button type="button" onclick="addPhone()" class="text-sm text-primary hover:underline mt-2">
            <i class="ri-add-line mr-1"></i>
            Agregar teléfono
          </button>
        </div>

        <div class="md:col-span-2">
          <div class="flex items-center justify-between mb-2">
            <label class="block text-sm font-medium text-secondary">
              Coordenadas (Opcional)
            </label>
            <button type="button" onclick="geocodeAddress()" class="text-sm text-primary hover:underline"
              id="geocode-btn">
              <i class="ri-map-pin-line mr-1"></i>
              Obtener Coordenadas
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <input type="text" id="latitude" name="latitude" value="{{ old('latitude', $agency->latitude) }}"
                class="input-field @error('latitude') border-red-500 @enderror" placeholder="Latitud">
              @error('latitude')
              <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
              @enderror
            </div>
            <div>
              <input type="text" id="longitude" name="longitude" value="{{ old('longitude', $agency->longitude) }}"
                class="input-field @error('longitude') border-red-500 @enderror" placeholder="Longitud">
              @error('longitude')
              <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
              @enderror
            </div>
          </div>
          <p class="text-xs text-gray-600 mt-1">Haz clic en el mapa o arrastra el marcador para ajustar la ubicación</p>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-secondary mb-2">
            Vista Previa
          </label>
          <div class="bg-gray-100 rounded-lg overflow-hidden border border-gray-300" style="height: 400px;">
            <div id="agency-form-map" style="width: 100%; height: 100%;"></div>
          </div>
          <p class="text-xs text-gray-600 mt-1">
            <i class="ri-information-line"></i>
            Haz clic en el mapa para colocar un marcador o arrástralo para ajustar la ubicación exacta.
          </p>
        </div>

        <div class="md:col-span-2">
          <input type="hidden" name="is_active" value="0">
          <label class="flex items-center">
            <input type="checkbox" name="is_active" value="1" {{ old('is_active', $agency->is_active ? '1' :
            '0') == '1' ? 'checked' : '' }} class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary">
            <span class="ml-2 text-sm text-secondary">Agencia activa</span>
          </label>
        </div>
      </div>

      <div class="flex justify-between items-center gap-4">
        <a href="{{ route('agencies.index', $agency) }}" class="btn-outline">
          <i class="ri-arrow-left-line mr-2"></i>
          Cancelar
        </a>
        <button type="submit" class="btn-secondary">
          <i class="ri-save-line mr-2"></i>
          Actualizar
        </button>
      </div>
    </form>
  </div>
</div>
@endsection