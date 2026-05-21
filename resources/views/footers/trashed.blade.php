@extends('layouts.admin')

@section('title', 'Papelera — Footers')
@section('page-title', 'Papelera de Footers')

@push('head')
    <meta name="footers-base-url" content="{{ route('footers.index') }}">
@endpush

@section('header-actions')
    <a href="{{ route('footers.index') }}" class="btn-outline btn-sm btn-header-action">
        <i class="ri-arrow-left-line sm:mr-2"></i>
        <span class="btn-text">Volver</span>
        <span class="btn-tooltip">Volver</span>
    </a>
@endsection

@section('content')
    <div class="card">
        @if ($footers->isEmpty())
            <div class="text-center py-12 text-gray-500">
                <i class="ri-delete-bin-line text-4xl mb-3 block"></i>
                <p>La papelera está vacía.</p>
            </div>
        @else
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="table-header rounded-tl-lg">Nombre</th>
                        <th class="table-header">Eliminado</th>
                        <th class="table-header rounded-tr-lg text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($footers as $footer)
                        <tr class="table-row" id="trashed-footer-row-{{ $footer->id }}">
                            <td class="py-3 px-4 font-medium text-secondary">
                                {{ $footer->name }}
                                <span class="badge badge-danger ml-2" style="font-size:0.65rem;">Eliminado</span>
                            </td>
                            <td class="py-3 px-4 text-sm text-gray-500">
                                {{ $footer->deleted_at->format('d/m/Y H:i') }}
                            </td>
                            <td class="py-3 px-4">
                                <div class="flex justify-end gap-2">
                                    <button data-restore-footer data-footer-id="{{ $footer->id }}"
                                        data-footer-name="{{ addslashes($footer->name) }}" class="btn-outline btn-sm">
                                        <i class="ri-arrow-go-back-line mr-1"></i> Restaurar
                                    </button>
                                    <button data-force-delete-footer data-footer-id="{{ $footer->id }}"
                                        data-footer-name="{{ addslashes($footer->name) }}" class="btn-danger btn-sm">
                                        <i class="ri-delete-bin-2-line mr-1"></i> Eliminar definitivamente
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/footers/trashed.js')
@endpush
