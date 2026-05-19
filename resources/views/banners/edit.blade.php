@extends('layouts.admin')

@section('title', 'Editar Banner')

@section('page-title')
    <div class="flex items-center gap-2">
        <a href="{{ route('banners.index') }}" class="text-gray-400 hover:text-secondary transition-colors">
            <i class="ri-arrow-left-line text-xl"></i>
        </a>
        <span>Editar Banner</span>
    </div>
@endsection

@push('styles')
    @vite('resources/css/views/banners/banners.css')
@endpush

@section('content')
    <div class="max-w-4xl mx-auto">
        <div class="card">
            <div id="banner-form-wrapper" data-store-url="{{ route('banners.update', $banner) }}" data-method="PUT"
                data-index-url="{{ route('banners.index') }}"
                data-banner="{{ json_encode([
                    'title' => $banner->title,
                    'description' => $banner->description,
                    'image_url' => $banner->image_url,
                    'image_alt' => $banner->image_alt,
                    'category' => $banner->category,
                    'btn_primary_text' => $banner->btn_primary_text,
                    'btn_primary_url' => $banner->btn_primary_url,
                    'btn_primary_style' => $banner->btn_primary_style,
                    'btn_primary_external' => $banner->btn_primary_external,
                    'btn_secondary_text' => $banner->btn_secondary_text,
                    'btn_secondary_url' => $banner->btn_secondary_url,
                    'btn_secondary_style' => $banner->btn_secondary_style,
                    'btn_secondary_external' => $banner->btn_secondary_external,
                    'is_active' => $banner->is_active,
                    'order' => $banner->order,
                ]) }}">
                @include('banners._form', ['banner' => $banner])
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/banners/form.js')
@endpush
