@extends('layouts.admin')

@section('title', 'Footers')
@section('page-title', 'Footers')

@section('header-actions')
    <a href="{{ route('footers.create') }}" class="btn-primary">
        <i class="ri-add-line mr-2"></i>
        Nuevo Footer
    </a>
@endsection

@section('content')
    <div class="card">
        @if ($footers->isEmpty())
            <div class="text-center py-12 text-gray-500">
                <i class="ri-layout-bottom-line text-4xl mb-3 block"></i>
                <p>No hay footers creados aún.</p>
                <a href="{{ route('footers.create') }}" class="btn-primary mt-4 inline-flex">
                    <i class="ri-add-line mr-2"></i> Crear primer footer
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
                            <td class="py-3 px-4 font-medium text-secondary">{{ $footer->name }}</td>
                            <td class="py-3 px-4">
                                <span class="badge {{ $footer->is_active ? 'badge-success' : 'badge-danger' }}">
                                    {{ $footer->is_active ? 'Activo' : 'Inactivo' }}
                                </span>
                            </td>
                            <td class="py-3 px-4 text-sm text-gray-500">
                                {{ $footer->updated_at->format('d/m/Y H:i') }}
                            </td>
                            <td class="py-3 px-4 text-right">
                                <div class="flex justify-end gap-2">
                                    <a href="{{ route('footers.preview', $footer->id) }}" target="_blank"
                                        class="btn-outline btn-sm">
                                        <i class="ri-eye-line mr-1"></i> Preview
                                    </a>
                                    <a href="{{ route('footers.edit', $footer->id) }}" class="btn-outline btn-sm">
                                        <i class="ri-edit-line mr-1"></i> Editar
                                    </a>
                                    <button onclick="toggleActive({{ $footer->id }}, this)"
                                        class="btn-outline btn-sm {{ $footer->is_active ? 'btn-danger' : 'btn-success' }}">
                                        {{ $footer->is_active ? 'Desactivar' : 'Activar' }}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </div>

    <script>
        async function toggleActive(id, btn) {
            try {
                const res = await fetch(`/footers/${id}/toggle-active`, {
                    method: 'PATCH',
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                        'Accept': 'application/json'
                    }
                });
                const data = await res.json();
                if (data.success) window.location.reload();
            } catch (e) {
                console.error(e);
            }
        }
    </script>
@endsection
