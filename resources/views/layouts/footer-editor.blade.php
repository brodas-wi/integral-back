<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="app-url" content="{{ rtrim(config('app.url'), '/') }}">
    <meta name="asset-url" content="{{ rtrim(config('app.asset_url', config('app.url')), '/') }}">
    <meta name="media-api-url" content="{{ route('media.api') }}">
    <meta name="editor-type" content="footer">

    <title>{{ isset($footer) ? 'Editar Footer: ' . $footer->name : 'Nuevo Footer' }}</title>

    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link href="{{ Vite::asset('node_modules/remixicon/fonts/remixicon.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ Vite::asset('node_modules/grapesjs/dist/css/grapes.min.css') }}">

    @vite(['resources/css/editor.css', 'resources/css/notifications.css', 'resources/js/app.js', 'resources/js/footer-editor.js'])
</head>

<body>
    <nav id="editor-navbar">
        <div id="editor-navbar-left">
            <a href="{{ route('footers.index') }}" class="btn-editor btn-editor-outline">
                <i class="ri-arrow-left-line"></i>
                <span>Volver</span>
            </a>
            <h1 id="editor-title">
                {{ isset($footer) ? 'Editando Footer: ' . $footer->name : 'Nuevo Footer' }}
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

    <input type="hidden" id="footer-id" value="{{ $footer->id ?? '' }}">
    <input type="hidden" id="footer-name" value="{{ $footer->name ?? '' }}">
    <input type="hidden" id="footer-load-url" value="{{ isset($footer) ? route('footers.load', $footer->id) : '' }}">
    <input type="hidden" id="footer-store-url"
        value="{{ isset($footer) ? route('footers.update', $footer->id) : route('footers.store') }}">
    <input type="hidden" id="footer-is-active" value="{{ isset($footer) ? ($footer->is_active ? '1' : '0') : '0' }}">
</body>

</html>
