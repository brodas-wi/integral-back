@extends('layouts.admin')

@section('title', 'Respuesta')

@section('page-title')
    <span>Detalle de respuesta</span>
@endsection

@section('header-actions')
    <a href="{{ route('forms.submissions.index', $form) }}" class="btn-outline btn-sm">
        <i class="ri-arrow-left-line mr-2"></i>
        Volver
    </a>
@endsection

@php
    $statusLabels = ['new' => 'Nueva', 'reviewed' => 'Revisada', 'archived' => 'Archivada'];
    $mailLabels = ['pending' => 'Pendiente', 'sent' => 'Enviado', 'failed' => 'Falló', 'not_applicable' => 'No aplica'];
@endphp

@section('content')
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
        <div class="lg:col-span-2 card space-y-4">
            <div>
                <h3 class="text-base font-bold text-secondary">{{ $form->name }}</h3>
                <p class="text-xs text-gray-500">
                    Recibida el {{ $submission->created_at->format('d/m/Y H:i') }}
                    @if ($submission->version)
                        · Versión {{ $submission->version->version }} del formulario
                    @endif
                </p>
            </div>

            <dl class="divide-y divide-gray-100">
                @foreach ($submission->answers as $answer)
                    <div class="py-3 grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4">
                        <dt class="text-sm text-gray-600">{{ $answer['label'] }}</dt>
                        <dd class="sm:col-span-2 text-sm font-semibold text-secondary break-words">
                            @if (($answer['display'] ?? '') !== '')
                                {!! nl2br(e($answer['display'])) !!}
                            @else
                                <span class="font-normal text-gray-400">Sin respuesta</span>
                            @endif
                        </dd>
                    </div>
                @endforeach
            </dl>
        </div>

        <div class="space-y-6">
            <form method="POST" action="{{ route('forms.submissions.update', [$form, $submission]) }}"
                class="card space-y-4">
                @csrf
                @method('PATCH')
                <h3 class="text-base font-bold text-secondary">Gestión</h3>

                @error('status')
                    <p class="text-xs text-red-600">{{ $message }}</p>
                @enderror

                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="status">Estado</label>
                    <select id="status" name="status" class="input-field">
                        @foreach ($statusLabels as $key => $label)
                            <option value="{{ $key }}"
                                {{ old('status', $submission->status) === $key ? 'selected' : '' }}>{{ $label }}
                            </option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="notes">Notas internas</label>
                    <textarea id="notes" name="notes" rows="4" maxlength="5000" class="input-field !rounded-2xl">{{ old('notes', $submission->notes) }}</textarea>
                    @error('notes')
                        <p class="text-xs text-red-600 mt-1">{{ $message }}</p>
                    @enderror
                </div>

                @canany(['form_submissions.manage'])
                    <button type="submit" class="btn-primary w-full">
                        <i class="ri-save-line mr-2"></i>
                        Guardar
                    </button>
                @else
                    <p class="text-xs text-gray-500">No tienes permiso para modificar respuestas.</p>
                @endcanany

                @if ($submission->reviewer)
                    <p class="text-xs text-gray-500">
                        Revisada por {{ $submission->reviewer->name }}
                        el {{ $submission->reviewed_at?->format('d/m/Y H:i') }}
                    </p>
                @endif
            </form>

            <div class="card space-y-2 text-sm">
                <h3 class="text-base font-bold text-secondary mb-2">Información</h3>
                <div class="flex justify-between gap-3"><span class="text-gray-600">ID</span>
                    <span class="font-mono text-xs break-all text-right">{{ $submission->uuid }}</span></div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Correo</span>
                    <span class="text-right break-all">{{ $submission->email ?: '—' }}</span></div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">IP</span>
                    <span>{{ $submission->ip_address ?: '—' }}</span></div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Aviso interno</span>
                    <span>{{ $mailLabels[$submission->notify_status] ?? $submission->notify_status }}</span></div>
                <div class="flex justify-between gap-3"><span class="text-gray-600">Confirmación</span>
                    <span>{{ $mailLabels[$submission->confirmation_status] ?? $submission->confirmation_status }}</span></div>
                @if ($submission->mail_error)
                    <p class="text-xs text-red-600 break-words">{{ $submission->mail_error }}</p>
                @endif
                @if ($submission->source_url)
                    <div class="pt-2">
                        <span class="text-gray-600">Enviada desde</span>
                        <a href="{{ $submission->source_url }}" target="_blank" rel="noopener noreferrer"
                            class="block text-xs text-primary break-all hover:underline">{{ $submission->source_url }}</a>
                    </div>
                @endif
            </div>
        </div>
    </div>
@endsection