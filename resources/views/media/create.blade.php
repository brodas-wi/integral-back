@extends('layouts.admin')

@section('title', 'Subir Archivos')
@section('page-title', 'Subir Archivos')

@section('content')
<div class="max-w-5xl">
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
    <div class="mb-6">
      <h3 class="text-xl font-bold text-secondary mb-2">Instrucciones de Carga</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div class="p-4 bg-blue-50 rounded-lg">
          <div class="flex items-center gap-2 mb-2">
            <i class="ri-image-line text-2xl text-blue-600"></i>
            <h4 class="font-semibold text-blue-900">Imágenes</h4>
          </div>
          <p class="text-sm text-blue-800">PNG, JPG, JPEG, WEBP, SVG</p>
          <p class="text-sm text-blue-600 font-medium mt-1">Máximo: 5 MB</p>
        </div>

        <div class="p-4 bg-red-50 rounded-lg">
          <div class="flex items-center gap-2 mb-2">
            <i class="ri-file-pdf-line text-2xl text-red-600"></i>
            <h4 class="font-semibold text-red-900">Documentos PDF</h4>
          </div>
          <p class="text-sm text-red-800">Archivos PDF</p>
          <p class="text-sm text-red-600 font-medium mt-1">Máximo: 40 MB</p>
        </div>

        <div class="p-4 bg-green-50 rounded-lg">
          <div class="flex items-center gap-2 mb-2">
            <i class="ri-file-excel-line text-2xl text-green-600"></i>
            <h4 class="font-semibold text-green-900">Excel</h4>
          </div>
          <p class="text-sm text-green-800">XLS, XLSX, XLSM</p>
          <p class="text-sm text-green-600 font-medium mt-1">Máximo: 20 MB</p>
        </div>
      </div>

      <div class="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex items-start gap-2">
          <i class="ri-information-line text-xl text-yellow-700 mt-0.5"></i>
          <div class="text-sm text-yellow-800">
            <p class="font-semibold mb-1">Nota importante:</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Puedes subir hasta 10 archivos a la vez</li>
              <li>Las imágenes serán optimizadas automáticamente</li>
              <li>Las imágenes grandes se redimensionarán a un máximo de 2000px de ancho</li>
              <li>Puedes agregar texto alternativo (ALT) para cada archivo después de seleccionarlo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <form action="{{ route('media.store') }}" method="POST" enctype="multipart/form-data" id="upload-form">
      @csrf

      <div class="mb-6">
        <label class="block text-sm font-medium text-secondary mb-2">
          Seleccionar Archivos <span class="text-red-500">*</span>
        </label>

        <div
          id="drop-zone"
          class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
          <i class="ri-upload-cloud-2-line text-6xl text-gray-400 mb-4"></i>
          <p class="text-lg font-medium text-secondary mb-2">Arrastra archivos aquí o haz clic para seleccionar</p>
          <p class="text-sm text-gray-600">Máximo 10 archivos por carga</p>

          <input
            type="file"
            name="files[]"
            id="file-input"
            multiple
            accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml,application/pdf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            class="hidden">
        </div>

        <div id="file-list" class="mt-6 space-y-4 hidden">
          <h4 class="font-semibold text-secondary text-lg">Archivos seleccionados:</h4>
          <div id="file-items" class="space-y-3"></div>
        </div>

        @error('files')
        <p class="text-red-500 text-sm mt-2">{{ $message }}</p>
        @enderror
      </div>

      <div id="upload-progress" class="hidden mb-6">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-secondary">Subiendo archivos...</span>
          <span id="progress-text" class="text-sm text-gray-600">0%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div id="progress-bar" class="bg-primary h-2.5 rounded-full transition-all duration-300" style="width: 0%"></div>
        </div>
      </div>

      <div class="flex justify-between gap-4">
        <a href="{{ route('media.index') }}" class="btn-outline">
          <i class="ri-arrow-left-line mr-2"></i>
          Cancelar
        </a>
        <button type="submit" id="submit-btn" class="btn-secondary" disabled>
          <i class="ri-upload-2-line mr-2"></i>
          Subir Archivos
        </button>
      </div>
    </form>
  </div>
</div>
@endsection