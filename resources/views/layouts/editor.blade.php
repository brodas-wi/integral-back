<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="app-url" content="{{ rtrim(config('app.url'), '/') }}">
    <meta name="asset-url" content="{{ rtrim(config('app.asset_url', config('app.url')), '/') }}">

    <meta name="canvas-css-url" content="{{ Vite::asset('resources/css/editor-canvas.css') }}">
    <meta name="canvas-app-css-url" content="{{ Vite::asset('resources/css/app.css') }}">
    <meta name="canvas-poppins-url" content="{{ Vite::asset('resources/css/fonts/poppins.css') }}">
    <meta name="canvas-remixicons-url" content="{{ Vite::asset('node_modules/remixicon/fonts/remixicon.css') }}">

    <meta name="api-banners-url" content="{{ route('api.banners.active') }}">
    <meta name="api-announcements-url" content="{{ route('api.announcements.for-page') }}">
    <meta name="media-api-url" content="{{ route('media.api') }}">
    <meta name="api-assets-url" content="{{ route('api.assets.active') }}">
    <meta name="map-locations-url" content="{{ route('api.map-locations') }}">
    <meta name="api-news-url" content="{{ route('api.news.active') }}">
    <meta name="api-news-categories-url" content="{{ route('api.news-categories.active') }}">

    <title>{{ isset($page) ? 'Editar: ' . $page->title : 'Nueva Página' }} - Editor</title>

    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link href="{{ Vite::asset('node_modules/remixicon/fonts/remixicon.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ Vite::asset('node_modules/grapesjs/dist/css/grapes.min.css') }}">

    @vite(['resources/css/editor.css', 'resources/css/notifications.css', 'resources/js/app.js', 'resources/js/pages-editor.js'])
</head>

<body>
    <nav id="editor-navbar">
        <div id="editor-navbar-left">
            <a href="{{ route('pages.index') }}" class="btn-editor btn-editor-outline">
                <i class="ri-arrow-left-line"></i>
                <span>Volver</span>
            </a>
            <h1 id="editor-title">
                @if (isset($page))
                    Editando: {{ $page->title }}
                @else
                    Nueva Página
                @endif
            </h1>
        </div>
        <div id="editor-navbar-right">
            <button id="save-button" class="btn-editor btn-editor-primary">
                <i class="ri-save-line"></i>
                <span>Guardar</span>
            </button>
        </div>
    </nav>

    <div id="gjs"></div>

    <input type="hidden" id="page-id" value="{{ $page->id ?? '' }}">
    <input type="hidden" id="page-slug" value="{{ $page->slug ?? '' }}">
    <input type="hidden" id="page-is-published" value="{{ isset($page) ? ($page->is_published ? '1' : '0') : '0' }}">
    <input type="hidden" id="page-load-url" value="{{ isset($page) ? route('pages.load', $page->slug) : '' }}">
    <input type="hidden" id="page-store-url"
        value="{{ isset($page) ? route('pages.update', $page->slug) : route('pages.store') }}">
</body>

</html>
