<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="app-url" content="{{ rtrim(config('app.url'), '/') }}">
    <meta name="asset-url" content="{{ rtrim(config('app.asset_url', config('app.url')), '/') }}">

    {{-- Mismos meta tags de canvas que el editor de páginas --}}
    <meta name="canvas-css-url" content="{{ Vite::asset('resources/css/editor-canvas.css') }}">
    <meta name="canvas-app-css-url" content="{{ Vite::asset('resources/css/app.css') }}">
    <meta name="canvas-poppins-url" content="{{ Vite::asset('resources/css/fonts/poppins.css') }}">
    <meta name="canvas-remixicons-url" content="{{ Vite::asset('node_modules/remixicon/fonts/remixicon.css') }}">

    <meta name="media-api-url" content="{{ route('media.api') }}">
    <meta name="editor-type" content="navbar">

    <title>{{ isset($navbar) ? 'Editar Navbar: ' . $navbar->name : 'Nuevo Navbar' }}</title>

    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link href="{{ Vite::asset('node_modules/remixicon/fonts/remixicon.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ Vite::asset('node_modules/grapesjs/dist/css/grapes.min.css') }}">

    @vite(['resources/css/editor.css', 'resources/css/notifications.css', 'resources/js/app.js', 'resources/js/navbar-editor.js'])
</head>

<body>
    <nav id="editor-navbar">
        <div id="editor-navbar-left">
            <a href="{{ route('navbars.index') }}" class="btn-editor btn-editor-outline">
                <i class="ri-arrow-left-line"></i>
                <span>Volver</span>
            </a>
            <h1 id="editor-title">
                {{ isset($navbar) ? 'Editando Navbar: ' . $navbar->name : 'Nuevo Navbar' }}
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

    <input type="hidden" id="navbar-id" value="{{ $navbar->id ?? '' }}">
    <input type="hidden" id="navbar-name" value="{{ $navbar->name ?? '' }}">
    <input type="hidden" id="navbar-load-url"
        value="{{ isset($navbar) ? route('navbars.load', $navbar->id) : '' }}">
    <input type="hidden" id="navbar-store-url"
        value="{{ isset($navbar) ? route('navbars.update', $navbar->id) : route('navbars.store') }}">
    <input type="hidden" id="navbar-is-active" value="{{ isset($navbar) ? ($navbar->is_active ? '1' : '0') : '0' }}">
</body>

</html>
