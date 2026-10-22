@extends('layouts.admin')

@section('title', 'Respuestas')

@section('page-title')
    <div class="flex items-center gap-3">
        <span>Respuestas</span>
        <span class="badge badge-info">{{ $submissions->total() }}</span>
    </div>
@endsection

@section('header-actions')
    @canany(['form_submissions.export', 'form_submissions.manage'])
        <a href="{{ route('forms.submissions.export', array_merge(['form' => $form], request()->only(['search', 'date_from', 'date_to']))) }}"
            class="btn-primary btn-sm">
            <i class="ri-download-2-line mr-2"></i>
            Exportar CSV
        </a>
    @endcanany
    <a href="{{ route('forms.index') }}" class="btn-outline btn-sm">
        <i class="ri-arrow-left-line mr-2"></i>
        Volver
    </a>
@endsection

@php
    $mailLabels = ['pending' => 'Pendiente', 'sent' => 'Enviado', 'failed' => 'Falló', 'not_applicable' => 'N/A'];
    $mailBadges = ['pending' => 'badge-warning', 'sent' => 'badge-success', 'failed' => 'badge-danger', 'not_applicable' => 'badge-gray'];
@endphp

@section('content')
    <div class="mb-4">
        <h3 class="text-lg font-bold text-secondary">{{ $form->name }}</h3>
        @if ($form->trashed())
            <p class="text-xs text-amber-600">Este formulario está archivado. Sus respuestas se conservan.</p>
        @endif
    </div>

    <div class="card mb-6">
        <form method="GET" action="{{ route('forms.submissions.index', $form) }}" class="space-y-4">
            <div class="flex flex-col sm:flex-row gap-4">
                <input type="text" name="search" value="{{ request('search') }}"
                    placeholder="Buscar por correo o contenido..." class="input-field flex-1">
            </div>
            <div class="flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                    <label class="block text-xs font-medium text-gray-700 mb-1">Desde</label>
                    <input type="date" name="date_from" value="{{ request('date_from') }}" class="input-field">
                </div>
                <div class="flex-1">
                    <label class="block text-xs font-medium text-gray-700 mb-1">Hasta</label>
                    <input type="date" name="date_to" value="{{ request('date_to') }}" class="input-field">
                </div>
                <div class="flex-1">
                    <label class="block text-xs font-medium text-gray-700 mb-1">Por página</label>
                    <select name="per_page" class="input-field" onchange="this.form.submit()">
                        @foreach ([10, 20, 50] as $size)
                            <option value="{{ $size }}" {{ (int) request('per_page', 20) === $size ? 'selected' : '' }}>
                                {{ $size }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="flex items-end gap-2">
                    <button type="submit" class="btn-secondary whitespace-nowrap">
                        <i class="ri-search-line mr-2"></i>
                        Buscar
                    </button>
                    @if ($hasFilters)
                        <a href="{{ route('forms.submissions.index', $form) }}" class="btn-outline whitespace-nowrap">
                            <i class="ri-close-line mr-2"></i>
                            Limpiar
                        </a>
                    @endif
                </div>
            </div>
        </form>
    </div>

    @if ($submissions->count() > 0)
        <div class="card p-0 overflow-hidden">
            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead>
                        <tr class="table-header">
                            <th class="table-header">Fecha</th>
                            <th class="table-header">Resumen</th>
                            <th class="table-header">Correos</th>
                            <th class="table-header text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($submissions as $submission)
                            @php
                                $summary = collect($submission->answers)
                                    ->pluck('display')
                                    ->filter()
                                    ->take(3)
                                    ->implode(' · ');
                            @endphp
                            <tr class="table-row">
                                <td class="py-3 px-4 whitespace-nowrap">
                                    <span class="font-semibold text-secondary">{{ $submission->created_at->format('d/m/Y') }}</span>
                                    <span class="block text-xs text-gray-500">{{ $submission->created_at->format('H:i') }}</span>
                                </td>
                                <td class="py-3 px-4 max-w-md">
                                    <span class="block truncate text-gray-800">{{ $summary ?: '—' }}</span>
                                    @if ($submission->email)
                                        <span class="block truncate text-xs text-gray-500">{{ $submission->email }}</span>
                                    @endif
                                </td>
                                <td class="py-3 px-4">
                                    <div class="flex flex-col gap-1 items-start">
                                        <span class="badge {{ $mailBadges[$submission->notify_status] ?? 'badge-gray' }}"
                                            title="Aviso interno">Aviso: {{ $mailLabels[$submission->notify_status] ?? $submission->notify_status }}</span>
                                        <span class="badge {{ $mailBadges[$submission->confirmation_status] ?? 'badge-gray' }}"
                                            title="Confirmación al usuario">Usuario: {{ $mailLabels[$submission->confirmation_status] ?? $submission->confirmation_status }}</span>
                                    </div>
                                </td>
                                <td class="py-3 px-4 text-right">
                                    <a href="{{ route('forms.submissions.show', [$form, $submission]) }}"
                                        class="btn-outline btn-sm inline-flex">
                                        <i class="ri-eye-line mr-2"></i>
                                        Ver
                                    </a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>

        @if ($submissions->hasPages())
            <div class="mt-6">
                {{ $submissions->links() }}
            </div>
        @endif
    @else
        <div class="card text-center py-12">
            <i class="ri-inbox-line text-6xl text-gray-400 mb-4"></i>
            <h3 class="text-xl font-semibold text-secondary mb-2">No hay respuestas</h3>
            <p class="text-gray-600">
                {{ $hasFilters ? 'No se encontraron respuestas con esos filtros.' : 'Aún no se ha recibido ninguna respuesta.' }}
            </p>
        </div>
    @endif
@endsection