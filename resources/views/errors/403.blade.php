@extends('layouts.admin')

@section('title', 'Acceso Denegado')
@section('page-title', 'Acceso No Autorizado')

@section('content')
<div class="flex flex-col items-center justify-center py-20">
  <div class="text-center max-w-2xl">
    <div class="w-32 h-32 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <i class="ri-lock-line text-6xl text-red-500"></i>
    </div>

    <h2 class="text-4xl font-bold text-secondary mb-4">Acceso Denegado</h2>

    <p class="text-gray text-lg mb-2">
      No tienes permisos suficientes para acceder a esta sección.
    </p>

    <p class="text-gray-600 text-sm mb-8">
      Si crees que deberías tener acceso, contacta con el administrador del sistema.
    </p>

    <div class="flex gap-4 justify-center flex-wrap">
      <a href="{{ route('dashboard') }}" class="btn-primary">
        <i class="ri-home-line mr-2"></i>
        Volver al Inicio
      </a>

      <button onclick="window.history.back()" class="btn-outline">
        <i class="ri-arrow-left-line mr-2"></i>
        Volver Atrás
      </button>
    </div>

    @auth
    @if(config('app.debug'))
    <div class="mt-8 p-4 bg-gray-100 rounded-lg text-left">
      <p class="text-xs text-gray-600 font-mono">
        <strong>Debug info:</strong><br>
        Usuario: {{ auth()->user()->username ?? 'No autenticado' }}<br>
        Roles: {{ auth()->user()->roles->pluck('name')->join(', ') ?? 'Ninguno' }}<br>
        Permisos: {{ auth()->user()->getAllPermissions()->pluck('name')->join(', ') ?? 'Ninguno' }}<br>
        URL solicitada: {{ request()->url() }}<br>
        Método: {{ request()->method() }}
      </p>
    </div>
    @endif
    @else
    <div class="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p class="text-sm text-yellow-800">
        <i class="ri-information-line mr-2"></i>
        No has iniciado sesión. Por favor, <a href="{{ route('login') }}" class="font-semibold underline">inicia sesión</a> para continuar.
      </p>
    </div>
    @endauth
  </div>
</div>
@endsection