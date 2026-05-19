@extends('layouts.admin')

@section('title', $module)
@section('page-title', $module)

@section('content')
  <div class="flex flex-col items-center justify-center py-20">
    <div class="text-center">
      <i class="ri-tools-line text-8xl text-primary mb-6"></i>
      <h2 class="text-3xl font-bold text-secondary mb-4">Módulo en Construcción</h2>
      <p class="text-gray text-lg mb-8">El módulo de <strong>{{ $module }}</strong> estará disponible próximamente.</p>
      <a href="{{ route('dashboard') }}" class="btn-primary">
        <i class="ri-home-line mr-2"></i>
        Volver al Inicio
      </a>
    </div>
  </div>
@endsection