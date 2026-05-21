@extends('layouts.admin')

@section('title', 'Footers')
@section('page-title', 'Footers')

@push('head')
    <meta name="footers-index-url" content="{{ route('footers.index') }}">
@endpush

@section('header-actions')
    <a href="{{ route('footers.create') }}" class="btn-primary btn-sm">
        <i class="ri-add-line mr-1"></i>
        Nuevo Footer
    </a>
@endsection

@section('content')
    <div class="card">
        @if ($footers->isEmpty())
            <div class="text-center py-12 text-gray-500">
                <i class="ri-layout-bottom-line text-4xl mb-3 block"></i>
                <p class="mb-4">No hay footers creados aún.</p>
                <a href="{{ route('footers.create') }}" class="btn-primary btn-sm inline-flex">
                    <i class="ri-add-line mr-1"></i> Crear primer footer
                </a>
            </div>
        @else
            <table class="w-full">
                <thead>
                    <tr>
                        <th class="table-header rounded-tl-lg">Nombre</th>
                        <th class="table-header">Estado</th>
                        <th class="table-header">Actualizado</th>
                        <th class="table-header rounded-tr-lg text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($footers as $footer)
                        <tr class="table-row">
                            <td class="py-3 px-4 font-medium text-secondary">
                                {{ $footer->name }}
                            </td>
                            <td class="py-3 px-4">
                                <span class="badge {{ $footer->is_active ? 'badge-success' : 'badge-danger' }}"
                                    id="footer-badge-{{ $footer->id }}">
                                    {{ $footer->is_active ? 'Activo' : 'Inactivo' }}
                                </span>
                            </td>
                            <td class="py-3 px-4 text-sm text-gray-500">
                                {{ $footer->updated_at->format('d/m/Y H:i') }}
                            </td>
                            <td class="py-3 px-4">
                                <div class="flex justify-end gap-2">
                                    <a href="{{ route('footers.preview', $footer->id) }}" target="_blank"
                                        class="btn-outline btn-sm">
                                        <i class="ri-eye-line mr-1"></i> Preview
                                    </a>
                                    <a href="{{ route('footers.edit', $footer->id) }}" class="btn-outline btn-sm">
                                        <i class="ri-edit-line mr-1"></i> Editar
                                    </a>
                                    <button data-toggle-active data-footer-id="{{ $footer->id }}"
                                        data-active="{{ $footer->is_active ? '1' : '0' }}"
                                        title="{{ $footer->is_active ? 'Desactivar' : 'Activar' }}"
                                        class="btn-sm w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                                        <i
                                            class="{{ $footer->is_active ? 'ri-toggle-fill text-green-500' : 'ri-toggle-line text-gray-400' }} text-2xl"></i>
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
    @vite('resources/js/views/footers/index.js')
@endpush
