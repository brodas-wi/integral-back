@extends('layouts.admin')

@section('title', 'Página No Encontrada')
@section('page-title', 'Error 404')

@section('content')
<div class="flex flex-col items-center justify-center py-20">
  <div class="text-center max-w-2xl">
    <div class="w-32 h-32 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
      <i class="ri-error-warning-line text-6xl text-primary"></i>
    </div>

    <h2 class="text-4xl font-bold text-secondary mb-4">Página No Encontrada</h2>

    <p class="text-gray text-lg mb-2">
      La página que buscas no existe o ha sido movida.
    </p>

    <p class="text-gray-600 text-sm mb-8">
      Verifica la URL o regresa al inicio para continuar navegando.
    </p>

    <div class="flex gap-4 justify-center">
      <a href="{{ route('dashboard') }}" class="btn-primary">
        <i class="ri-home-line mr-2"></i>
        Volver al Inicio
      </a>
    </div>

    @if(config('app.debug'))
    <div class="mt-8 p-4 bg-gray-100 rounded-lg text-left">
      <p class="text-xs text-gray-600 font-mono">
        <strong>Debug info:</strong><br>
        URL solicitada: {{ request()->url() }}<br>
        Método: {{ request()->method() }}
      </p>
    </div>
    @endif
  </div>
</div>
@endsection