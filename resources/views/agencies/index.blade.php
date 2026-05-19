@extends('layouts.admin')

@section('title', 'Agencias')
@section('page-title')
<x-page-title-with-stats title="Agencias" :count="$stats['total']" />
@endsection

@section('header-actions')
<div class="flex gap-2">
  @canany(['agencies.export', 'agencies.manage'])
  <a href="{{ route('agencies.export', request()->query()) }}" class="btn-outline btn-header-action">
    <i class="ri-download-line sm:mr-2"></i>
    <span class="btn-text">Exportar</span>
    <span class="btn-tooltip">Exportar</span>
  </a>
  @endcanany

  @canany(['agencies.import', 'agencies.manage'])
  <a href="{{ route('agencies.import') }}" class="btn-outline-secondary btn-header-action">
    <i class="ri-upload-line sm:mr-2"></i>
    <span class="btn-text">Importar</span>
    <span class="btn-tooltip">Importar</span>
  </a>
  @endcanany

  @canany(['agencies.create', 'agencies.manage'])
  <a href="{{ route('agencies.create') }}" class="btn-primary btn-header-action">
    <i class="ri-add-line sm:mr-2"></i>
    <span class="btn-text">Crear</span>
    <span class="btn-tooltip">Crear</span>
  </a>
  @endcanany
</div>
@endsection

@section('content')
<div class="card mb-6">
  <form method="GET" action="{{ route('agencies.index') }}" class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <input type="text" name="search" value="{{ request('search') }}"
        placeholder="Buscar por nombre, dirección o municipio..." class="input-field">

      <select name="status" class="input-field">
        <option value="">Todos los estados</option>
        <option value="active" {{ request('status')==='active' ? 'selected' : '' }}>Activos</option>
        <option value="inactive" {{ request('status')==='inactive' ? 'selected' : '' }}>Inactivos</option>
      </select>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <select name="zone" class="input-field">
        <option value="">Todas las zonas</option>
        @foreach($zones as $zone)
        <option value="{{ $zone }}" {{ request('zone')===$zone ? 'selected' : '' }}>{{ $zone }}</option>
        @endforeach
      </select>

      <select name="department" class="input-field">
        <option value="">Todos los departamentos</option>
        @foreach($departments as $dept)
        <option value="{{ $dept }}" {{ request('department')===$dept ? 'selected' : '' }}>{{ $dept }}</option>
        @endforeach
      </select>
    </div>

    <div class="flex items-end gap-2">
      <button type="submit" class="btn-secondary whitespace-nowrap">
        <i class="ri-search-line mr-2"></i>
        Filtrar
      </button>
      @if(request('search') || request('zone') || request('department') || request('status'))
      <a href="{{ route('agencies.index') }}" class="btn-outline whitespace-nowrap">
        <i class="ri-close-line mr-2"></i>
        Limpiar
      </a>
      @endif
    </div>
  </form>
</div>

<div id="bulk-actions-bar" class="card mb-6 bg-primary bg-opacity-10 border-primary hidden transition-all duration-300">
  <div class="flex items-center justify-between flex-wrap gap-4">
    <div class="flex items-center gap-3">
      <span class="text-sm font-medium text-secondary">
        <span id="selected-count">0</span> seleccionados
      </span>
      <button type="button" onclick="selectAllVisible()" class="text-sm text-primary hover:underline">
        Seleccionar página
      </button>
      <button type="button" onclick="deselectAll()" class="text-sm text-gray-600 hover:underline">
        Deseleccionar todos
      </button>
    </div>
    <div class="flex items-center gap-2">
      <button type="button" onclick="geocodeSelected()" id="geocode-selected-btn" class="btn-secondary btn-sm">
        <i class="ri-map-pin-line mr-2"></i>
        Obtener Coordenadas
      </button>
    </div>
  </div>
</div>

<div id="geocoding-progress" class="card mb-6 bg-blue-50 border border-blue-200 hidden">
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-blue-900">Geocodificando agencias seleccionadas...</span>
      <span class="text-sm font-medium text-blue-900" id="geocoding-progress-text">0%</span>
    </div>
    <div class="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
      <div id="geocoding-progress-bar" class="bg-primary h-3 rounded-full transition-all duration-300"
        style="width: 0%"></div>
    </div>
    <div class="text-xs text-blue-700" id="geocoding-details">Preparando...</div>
  </div>
</div>

@if($agencies->count() > 0)
<div class="card mb-6">
  <div class="space-y-4">
    @foreach($agencies as $agency)
    <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors agency-item"
      id="agency-item-{{ $agency->id }}" data-agency-id="{{ $agency->id }}" data-address="{{ $agency->address }}"
      data-municipality="{{ $agency->municipality }}" data-department="{{ $agency->department }}"
      data-name="{{ $agency->name }}" data-has-coordinates="{{ $agency->has_coordinates ? 'true' : 'false' }}">
      <div class="flex items-start gap-4">
        <div class="flex items-start pt-1">
          <input type="checkbox"
            class="agency-checkbox w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary cursor-pointer"
            data-agency-id="{{ $agency->id }}" onchange="updateBulkActions()">
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-2">
            <span class="badge {{ $agency->is_active ? 'badge-success' : 'badge-danger' }}">
              {{ $agency->is_active ? 'Activa' : 'Inactiva' }}
            </span>
            @if($agency->coordinates)
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
            <span class="badge badge-info">{{ $agency->zone }}</span>
          </div>

          <h3 class="font-bold text-secondary text-lg mb-1">{{ $agency->name }}</h3>

          <div class="space-y-2 text-sm">
            <div class="flex items-start gap-2">
              <i class="ri-map-pin-2-line text-primary mt-0.5 flex-shrink-0"></i>
              <div class="flex-1">
                <p class="text-gray-700">{{ $agency->address }}</p>
                <p class="text-gray-600 text-xs">{{ $agency->municipality }}, {{ $agency->department }}</p>
              </div>
            </div>

            <div class="flex items-start gap-2">
              <i class="ri-time-line text-primary mt-0.5 flex-shrink-0"></i>
              <div class="flex-1">
                <p class="text-gray-700">Actualizado: {{ $agency->updated_at->format('d/m/Y H:i') }}</p>
                <p class="text-gray-600 text-xs">Por {{ $agency->updater->name }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="dropdown" data-dropdown>
          <button type="button" class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
            onclick="toggleDropdown(this.closest('.dropdown'))">
            <i class="ri-more-2-fill text-xl"></i>
          </button>
          <div class="dropdown-menu">
            @canany(['agencies.view', 'agencies.manage'])
            <a href="{{ route('agencies.show', $agency) }}" class="dropdown-item">
              <i class="ri-eye-line"></i>
              <span>Ver detalles</span>
            </a>
            @endcanany
            @canany(['agencies.edit', 'agencies.manage'])
            <a href="{{ route('agencies.edit', $agency) }}" class="dropdown-item">
              <i class="ri-edit-line"></i>
              <span>Editar</span>
            </a>
            @endcanany
            @canany(['agencies.delete', 'agencies.manage'])
            <button type="button" onclick="confirmDelete({{ $agency->id }}, '{{ addslashes($agency->name) }}')"
              class="dropdown-item-danger">
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
</div>

<div class="mt-6">
  {{ $agencies->links() }}
</div>
@else
<div class="card text-center py-12">
  <i class="ri-map-pin-line text-6xl text-gray-400 mb-4"></i>
  <h3 class="text-xl font-semibold text-secondary mb-2">No hay agencias</h3>
  <p class="text-gray-600 mb-6">
    @if(request('search') || request('zone') || request('department') || request('status'))
    No se encontraron agencias que coincidan con tu búsqueda
    @else
    Comienza agregando tu primera agencia
    @endif
  </p>
  @if(request('search') || request('zone') || request('department') || request('status'))
  <a href="{{ route('agencies.index') }}" class="btn-outline inline-flex items-center">
    <i class="ri-close-line mr-2"></i>
    Limpiar búsqueda
  </a>
  @else
  @canany(['agencies.create', 'agencies.manage'])
  <a href="{{ route('agencies.create') }}" class="btn-primary inline-flex items-center">
    <i class="ri-add-line mr-2"></i>
    Crear Primera Agencia
  </a>
  @endcanany
  @endif
</div>
@endif
@endsection