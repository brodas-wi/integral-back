@extends('layouts.admin')

@section('title', 'Editar Archivo')
@section('page-title', 'Editar Información del Archivo')

@section('content')
<div class="max-w-4xl">
  <div class="mb-6">
    <a href="{{ route('media.show', $media) }}" class="btn-outline inline-flex items-center">
      <i class="ri-arrow-left-line mr-2"></i>
      Volver a Detalles
    </a>
  </div>

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

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Preview Section -->
    <div class="lg:col-span-1">
      <div class="card">
        <h3 class="text-lg font-bold text-secondary mb-4">Vista Previa</h3>
        <div class="bg-gray-100 rounded-lg p-6 flex items-center justify-center min-h-[250px]">
          @if($media->isImage())
          <img
            src="{{ $media->url }}"
            alt="{{ $media->alt ?? $media->filename }}"
            class="max-w-full max-h-[250px] object-contain rounded-lg">
          @elseif($media->isPdf())
          <i class="ri-file-pdf-line text-6xl text-red-500"></i>
          @else
          <i class="ri-file-excel-line text-6xl text-green-500"></i>
          @endif
        </div>
        <div class="mt-4 text-center">
          <p class="text-sm font-medium text-secondary truncate">{{ $media->filename }}</p>
          <p class="text-xs text-gray-600 mt-1">{{ $media->human_size }}</p>
        </div>
      </div>
    </div>

    <!-- Form Section -->
    <div class="lg:col-span-2">
      <div class="card">
        <h3 class="text-xl font-bold text-secondary mb-6">Editar Información</h3>

        <form action="{{ route('media.update', $media) }}" method="POST">
          @csrf
          @method('PUT')

          <div class="mb-6">
            <label for="filename" class="block text-sm font-medium text-secondary mb-2">
              Nombre del Archivo <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="filename"
              id="filename"
              value="{{ old('filename', $media->filename) }}"
              class="input-field"
              required
              maxlength="255">
            @error('filename')
            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
            <p class="text-xs text-gray-600 mt-1">
              Este es el nombre que se mostrará en la biblioteca de media
            </p>
          </div>

          <div class="mb-6">
            <label for="alt" class="block text-sm font-medium text-secondary mb-2">
              Texto Alternativo (ALT)
              @if($media->isImage())
              <span class="text-red-500">*</span>
              @else
              <span class="text-gray-500">(Opcional)</span>
              @endif
            </label>
            <textarea
              name="alt"
              id="alt"
              rows="3"
              class="input-field"
              maxlength="255"
              placeholder="Describe el contenido del archivo para mejorar la accesibilidad..."
              @if($media->isImage()) required @endif>{{ old('alt', $media->alt) }}</textarea>
            @error('alt')
            <p class="text-red-500 text-sm mt-1">{{ $message }}</p>
            @enderror
            <p class="text-xs text-gray-600 mt-1">
              @if($media->isImage())
              El texto alternativo es importante para la accesibilidad y SEO. Describe brevemente qué muestra la imagen.
              @else
              Agrega una descripción opcional para identificar mejor este archivo.
              @endif
            </p>
          </div>

          <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
            <div class="flex items-start gap-2">
              <i class="ri-information-line text-xl text-blue-600 mt-0.5"></i>
              <div class="text-sm text-blue-800">
                <p class="font-semibold mb-1">Información del archivo:</p>
                <ul class="space-y-1">
                  <li><strong>Tipo:</strong> {{ strtoupper(pathinfo($media->filename, PATHINFO_EXTENSION)) }}</li>
                  <li><strong>Tamaño:</strong> {{ $media->human_size }}</li>
                  @if($media->isImage() && $media->width)
                  <li><strong>Dimensiones:</strong> {{ $media->width }} × {{ $media->height }} px</li>
                  @endif
                  <li><strong>Subido:</strong> {{ $media->created_at->format('d/m/Y H:i') }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="flex gap-4">
            <button type="submit" class="btn-secondary">
              <i class="ri-save-line mr-2"></i>
              Guardar Cambios
            </button>
            <a href="{{ route('media.show', $media) }}" class="btn-outline">
              <i class="ri-close-line mr-2"></i>
              Cancelar
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
@endsection