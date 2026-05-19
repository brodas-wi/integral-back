@extends('layouts.admin')

@section('title', 'Crear Banner')

@section('page-title')
    <div class="flex items-center gap-2">
        <a href="{{ route('banners.index') }}" class="text-gray-400 hover:text-secondary transition-colors">
            <i class="ri-arrow-left-line text-xl"></i>
        </a>
        <span>Crear Banner</span>
    </div>
@endsection

@push('styles')
    @vite('resources/css/views/banners/banners.css')
@endpush

@section('content')
    <div class="max-w-4xl mx-auto">
        <div class="card">
            <div id="banner-form-wrapper" data-store-url="{{ route('banners.store') }}"
                data-index-url="{{ route('banners.index') }}">
                @include('banners._form', ['banner' => null])
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/banners/form.js')
@endpush
