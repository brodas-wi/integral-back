@extends('layouts.admin')

@section('title', 'Importar Agencias')
@section('page-title', 'Importar Agencias')

@section('content')
    <div class="max-w-4xl">
        <div class="mb-6">
            <a href="{{ route('agencies.index') }}" class="btn-outline inline-flex items-center">
                <i class="ri-arrow-left-line mr-2"></i>
                Volver
            </a>
        </div>

        <div class="card mb-6">
            <div class="flex items-start gap-3 mb-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <i class="ri-information-line text-2xl text-blue-600"></i>
                </div>
                <div class="flex-1">
                    <h3 class="font-semibold text-secondary mb-2">Instrucciones de Importación</h3>
                    <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>El archivo debe ser Excel (.xlsx, .xls) o CSV</li>
                        <li>La primera fila debe contener los encabezados de las columnas</li>
                        <li>Los registros duplicados serán omitidos automáticamente</li>
                        <li>El sistema detecta duplicados por: Nombre + Departamento + Municipio</li>
                        <li>La importación es rápida y procesará todos los registros en segundos</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="card mb-6">
            <h3 class="font-semibold text-secondary mb-4">Formato del Archivo</h3>

            <div class="mb-4">
                <p class="text-sm text-gray-600 mb-2">El archivo debe contener las siguientes columnas en este orden:</p>
                <div class="overflow-x-auto">
                    <table class="w-full border border-gray-200">
                        <thead>
                            <tr class="bg-gray-50">
                                @foreach ($expectedHeaders as $header)
                                    <th class="px-4 py-2 text-left text-xs font-semibold text-gray-700 border-b">
                                        {{ $header }}
                                    </th>
                                @endforeach
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($sampleData as $row)
                                <tr class="border-b">
                                    @foreach ($row as $cell)
                                        <td class="px-4 py-2 text-sm text-gray-600">{{ $cell }}</td>
                                    @endforeach
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div class="flex items-start gap-2">
                    <i class="ri-alert-line text-yellow-600 text-xl mt-0.5"></i>
                    <div class="flex-1">
                        <p class="font-semibold text-yellow-800 mb-1">Importante</p>
                        <ul class="list-disc list-inside text-sm text-yellow-700 space-y-1">
                            <li>Las columnas obligatorias son: Nombre, Departamento, Municipio, Dirección</li>
                            <li>Horario y Teléfonos son opcionales</li>
                            <li>Los teléfonos deben separarse con comas (ejemplo: 2250-6000, 2250-6019)</li>
                            <li>Los departamentos deben coincidir con los nombres oficiales</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="card mb-6">
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div class="flex items-start gap-3">
                    <i class="ri-information-line text-blue-600 text-xl mt-0.5"></i>
                    <div class="flex-1">
                        <p class="font-semibold text-blue-900 mb-2">Sobre las coordenadas geográficas</p>
                        <p class="text-sm text-blue-800">
                            Las coordenadas <strong>no se importan automáticamente</strong>. Puedes agregarlas manualmente
                            después de la importación:
                        </p>
                        <ul class="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
                            <li>Edita cada agencia individualmente</li>
                            <li>Usa el botón "Obtener Coordenadas" para geolocalizar automáticamente</li>
                            <li>O ajusta la ubicación manualmente en el mapa interactivo</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <h3 class="font-semibold text-secondary mb-4">Cargar Archivo</h3>

            @if ($errors->any())
                <div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                    <div class="flex items-start gap-2">
                        <i class="ri-error-warning-line text-xl mt-0.5"></i>
                        <div class="flex-1">
                            <p class="font-semibold mb-2">Error en el archivo:</p>
                            <ul class="list-disc list-inside space-y-1">
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            @endif

            <form id="import-form" action="{{ route('agencies.import.process') }}" method="POST"
                enctype="multipart/form-data">
                @csrf

                <div class="mb-6">
                    <div id="drop-zone-import"
                        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <input type="file" id="file-input" name="file" accept=".xlsx,.xls,.csv" class="hidden">

                        <div id="drop-zone-content">
                            <i class="ri-upload-cloud-line text-6xl text-gray-400 mb-4"></i>
                            <p class="text-lg font-medium text-secondary mb-2">Arrastra tu archivo aquí</p>
                            <p class="text-sm text-gray-600 mb-4">o haz clic para seleccionar</p>
                            <p class="text-xs text-gray-500">Excel (.xlsx, .xls) o CSV (máximo 10MB)</p>
                        </div>

                        <div id="file-preview" class="hidden">
                            <div class="flex items-center justify-center gap-3">
                                <i class="ri-file-excel-line text-4xl text-green-600"></i>
                                <div class="text-left">
                                    <p class="font-medium text-secondary" id="file-name"></p>
                                    <p class="text-sm text-gray-600" id="file-size"></p>
                                </div>
                                <button type="button" id="remove-file"
                                    class="ml-4 text-red-600 hover:text-red-700 transition-colors">
                                    <i class="ri-close-circle-line text-2xl"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="progress-container" class="hidden mb-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-sm font-medium text-blue-900">Importando agencias...</span>
                            <span class="text-sm font-medium text-blue-900" id="progress-text">0%</span>
                        </div>
                        <div class="w-full bg-blue-200 rounded-full h-3 overflow-hidden">
                            <div id="progress-bar"
                                class="progress-bar bg-primary h-3 rounded-full transition-all duration-300 ease-out"></div>
                        </div>
                        <p class="text-xs text-blue-700 mt-2" id="progress-details"></p>
                    </div>
                </div>

                <div class="flex justify-between gap-4">
                    <a href="{{ route('agencies.index') }}" class="btn-outline">
                        <i class="ri-arrow-left-line mr-2"></i>
                        Cancelar
                    </a>
                    <button type="submit" id="import-btn" class="btn-secondary" disabled>
                        <i class="ri-upload-line mr-2"></i>
                        Importar Agencias
                    </button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/agencies/import.js')
@endpush
