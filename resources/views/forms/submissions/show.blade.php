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

        <div class="card space-y-2 text-sm self-start">
            <h3 class="text-base font-bold text-secondary mb-2">Información</h3>
            <div class="flex justify-between gap-3"><span class="text-gray-600">Correo</span>
                <span class="text-right break-all">{{ $submission->email ?: '—' }}</span></div>
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
@endsection