@extends('layouts.admin')

@section('title', 'Vista previa: ' . $news->title)

@section('page-title', 'Vista Previa de Noticia')

@section('header-actions')
    @canany(['news.edit', 'news.manage'])
        <a href="{{ route('news.edit', $news) }}" class="btn-primary btn-sm">
            <i class="ri-edit-line mr-2"></i> Editar
        </a>
    @endcanany
@endsection

@push('styles')
    @vite('resources/css/views/news/show.css')
@endpush

@section('content')
    <div class="max-w-3xl mx-auto">
        <div class="mb-4 flex items-center gap-2">
            <span class="badge {{ $news->statusBadgeClass() }} text-xs">{{ $news->statusLabel() }}</span>
            @if ($news->category)
                <span class="badge bg-secondary text-white text-xs">{{ $news->category->name }}</span>
            @endif
            @if ($news->status === 'scheduled' && $news->scheduled_at)
                <span class="text-xs text-gray-500">
                    <i class="ri-time-line"></i> Se publicará el {{ $news->scheduled_at->format('d/m/Y H:i') }}
                </span>
            @elseif($news->published_at)
                <span class="text-xs text-gray-500">
                    Publicado el {{ $news->published_at->format('d/m/Y H:i') }}
                </span>
            @endif
        </div>

        <article class="news-article">
            @if ($news->featured_image)
                <div class="news-article-image">
                    <img src="{{ $news->featured_image }}" alt="{{ $news->title }}">
                </div>
            @endif

            <div class="news-article-body">
                <h1 class="news-article-title">{{ $news->title }}</h1>

                @if ($news->description)
                    <p class="news-article-description">{{ $news->description }}</p>
                @endif

                <div class="news-article-meta">
                    <i class="ri-user-line"></i>
                    <span>{{ $news->creator?->name ?? 'Sistema' }}</span>
                    <span class="news-article-meta-dot">•</span>
                    <span>{{ $news->created_at->format('d/m/Y') }}</span>
                </div>

                <div class="news-article-content">
                    {!! $news->content !!}
                </div>
            </div>
        </article>
    </div>
@endsection
