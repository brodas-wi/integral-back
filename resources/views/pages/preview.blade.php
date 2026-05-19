<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $page->title }} - Vista Previa</title>

    @vite(['resources/css/app.css', 'resources/css/preview.css', 'resources/css/fonts/poppins.css', 'resources/js/app.js'])
    <link rel="stylesheet" href="{{ route('pages.styles', $page->slug) }}">
</head>

<body class="page-preview">
    {!! $page->html_content !!}

    <nav id="preview-navbar">
        <div class="container">
            <div class="info">
                <div class="page-title">
                    <span>{{ $page->title }}</span>
                </div>
                <div class="page-meta">
                    <span class="badge-preview">
                        <i class="ri-layout-line"></i>
                        <span>Vista Previa</span>
                    </span>
                    <span class="meta-item">
                        <i class="ri-calendar-line"></i>
                        <span>{{ $page->updated_at->format('d/m/Y H:i') }}</span>
                    </span>
                    @if($page->is_published)
                        <span class="meta-item">
                            <i class="ri-global-line"></i>
                            <span>Publicada</span>
                        </span>
                    @else
                        <span class="meta-item">
                            <i class="ri-draft-line"></i>
                            <span>Borrador</span>
                        </span>
                    @endif
                </div>
            </div>

            @auth
                <div class="actions">
                    <a href="{{ route('pages.index') }}" class="btn-preview btn-preview-outline">
                        <i class="ri-arrow-left-line"></i>
                        <span>Volver</span>
                    </a>

                    @canany(['pages.edit', 'pages.manage'])
                        <a href="{{ route('pages.edit', $page->slug) }}" class="btn-preview btn-preview-primary">
                            <i class="ri-edit-line"></i>
                            <span>Editar</span>
                        </a>
                    @endcanany
                </div>
            @endauth
        </div>
    </nav>

    @if($page->js_content)
        <script type="module">
            {!! $page->js_content !!}
        </script>
    @endif
</body>

</html>