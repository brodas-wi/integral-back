@extends('layouts.admin')

@section('title', 'Error del Servidor')
@section('page-title', 'Error 500')

@section('content')
<div class="flex flex-col items-center justify-center py-20">
  <div class="text-center max-w-2xl">
    <div class="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <i class="ri-bug-line text-6xl text-red-500"></i>
    </div>

    <h2 class="text-4xl font-bold text-secondary mb-4">Error del Servidor</h2>

    <p class="text-gray text-lg mb-2">
      Algo salió mal en el servidor. Estamos trabajando para solucionarlo.
    </p>

    <p class="text-gray-600 text-sm mb-8">
      Por favor, intenta de nuevo más tarde o contacta con el administrador si el problema persiste.
    </p>

    <div class="flex gap-4 justify-center">
      <a href="{{ route('dashboard') }}" class="btn-primary">
        <i class="ri-home-line mr-2"></i>
        Volver al Inicio
      </a>

      <button onclick="window.location.reload()" class="btn-outline">
        <i class="ri-refresh-line mr-2"></i>
        Recargar Página
      </button>
    </div>

    @if(config('app.debug') && isset($exception))
    <div class="mt-8 p-4 bg-gray-100 rounded-lg text-left">
      <p class="text-xs text-gray-600 font-mono break-all">
        <strong>Debug info:</strong><br>
        {{ $exception->getMessage() }}<br>
        <strong>File:</strong> {{ $exception->getFile() }}:{{ $exception->getLine() }}
      </p>
    </div>
    @endif
  </div>
</div>
@endsection