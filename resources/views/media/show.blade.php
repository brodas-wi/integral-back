@extends('layouts.admin')

@section('title', 'Ver Archivo')
@section('page-title', 'Detalles del Archivo')

@section('content')
    <div class="max-w-6xl mx-auto">
        <div class="mb-6">
            <a href="{{ route('media.index') }}" class="btn-outline inline-flex items-center">
                <i class="ri-arrow-left-line mr-2"></i>
                Volver a Media
            </a>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2">
                <div class="card">
                    <h3 class="text-xl font-bold text-secondary mb-4">Vista Previa</h3>

                    @if ($media->isImage())
                        <div class="media-preview-container">
                            <img src="{{ $media->url }}" alt="{{ $media->alt ?? $media->filename }}"
                                class="media-preview-image">
                        </div>
                    @elseif($media->isPdf())
                        <div class="media-preview-pdf">
                            <iframe src="{{ $media->url }}" frameborder="0" title="{{ $media->filename }}">
                            </iframe>
                        </div>
                    @else
                        <div class="media-preview-document">
                            <div class="text-center">
                                <i class="ri-file-excel-line text-8xl text-green-500 mb-4"></i>
                                <p class="text-lg font-medium text-secondary">Documento Excel</p>
                                <p class="text-sm text-gray-600 mt-2">{{ $media->filename }}</p>
                            </div>
                        </div>
                    @endif
                </div>
            </div>

            <div class="lg:col-span-1">
                <div class="card">
                    <div
                        class="flex items-center justify-center w-16 h-16 bg-primary bg-opacity-10 rounded-full mx-auto mb-4">
                        @if ($media->isImage())
                            <i class="ri-image-line text-3xl text-primary"></i>
                        @elseif($media->isPdf())
                            <i class="ri-file-pdf-line text-3xl text-red-500"></i>
                        @else
                            <i class="ri-file-excel-line text-3xl text-green-500"></i>
                        @endif
                    </div>

                    <h2 class="text-lg font-bold text-secondary text-center mb-4 break-words px-2">
                        {{ $media->filename }}
                    </h2>

                    <div class="space-y-1.5">
                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Tipo:</span>
                            <span class="font-semibold text-secondary">
                                @if ($media->isImage())
                                    Imagen
                                @elseif($media->isPdf())
                                    PDF
                                @else
                                    Excel
                                @endif
                            </span>
                        </div>

                        @if ($media->alt)
                            <div class="flex items-start justify-between text-sm text-gray-600 gap-2">
                                <span class="flex-shrink-0">ALT:</span>
                                <span class="font-semibold text-secondary text-right break-words">{{ $media->alt }}</span>
                            </div>
                        @endif

                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Tamaño:</span>
                            <span class="font-semibold text-secondary">{{ $media->human_size }}</span>
                        </div>

                        @if ($media->isImage() && $media->width)
                            <div class="flex items-center justify-between text-sm text-gray-600">
                                <span>Dimensiones:</span>
                                <span
                                    class="font-semibold text-secondary">{{ $media->width }}×{{ $media->height }}px</span>
                            </div>
                        @endif

                        <div class="flex items-start justify-between text-sm text-gray-600 gap-2">
                            <span class="flex-shrink-0">MIME:</span>
                            <span
                                class="font-semibold text-secondary text-right text-xs break-all">{{ $media->mime_type }}</span>
                        </div>

                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Subido por:</span>
                            <span class="font-semibold text-secondary truncate ml-2">{{ $media->uploader->name }}</span>
                        </div>

                        <div class="flex items-center justify-between text-sm text-gray-600">
                            <span>Fecha:</span>
                            <span class="font-semibold text-secondary">{{ $media->created_at->format('d/m/Y H:i') }}</span>
                        </div>
                    </div>

                    <div class="mt-4 pt-4 border-t border-gray-100">
                        <p class="text-xs font-medium text-gray-700 mb-2">URL del Archivo</p>
                        <div class="flex items-center gap-2">
                            <input type="text" value="{{ $media->url }}" id="file-url" readonly
                                class="flex-1 text-xs p-2 bg-gray-50 border border-gray-200 rounded">
                            <button onclick="copyMediaUrl()"
                                class="btn-secondary btn-sm w-[38px] p-0 flex items-center justify-center"
                                title="Copiar URL">
                                <i class="ri-file-copy-line text-lg"></i>
                            </button>
                        </div>
                    </div>

                    <div class="mt-4 space-y-2">
                        @canany(['media.view', 'media.manage'])
                            <a href="{{ route('media.edit', $media) }}" class="btn-secondary w-full">
                                <i class="ri-edit-line mr-2"></i>
                                Editar
                            </a>
                        @endcanany

                        @canany(['media.download', 'media.manage'])
                            <a href="{{ route('media.download', $media) }}" class="btn-outline w-full">
                                <i class="ri-download-line mr-2"></i>
                                Descargar
                            </a>
                        @endcanany

                        @if ($media->isImage() || $media->isPdf())
                            <a href="{{ $media->url }}" target="_blank" class="btn-outline w-full">
                                <i class="ri-external-link-line mr-2"></i>
                                Abrir en
                            </a>
                        @endif

                        @canany(['media.delete', 'media.manage'])
                            <form id="delete-form" action="{{ route('media.destroy', $media) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="button" onclick="confirmDeleteMediaShow()" class="btn-danger w-full">
                                    <i class="ri-delete-bin-line mr-2"></i>
                                    Eliminar
                                </button>
                            </form>
                        @endcanany
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
