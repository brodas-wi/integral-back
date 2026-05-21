<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview: {{ $footer->name }}</title>
    <link href="{{ Vite::asset('node_modules/remixicon/fonts/remixicon.css') }}" rel="stylesheet">
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background: #f1f5f9;
            font-family: 'Inter', sans-serif;
        }

        .preview-bar {
            background: #1e293b;
            color: #94a3b8;
            padding: 0.75rem 1.5rem;
            display: flex;
            align-items: center;
            justify-content: between;
            gap: 1rem;
            font-size: 0.875rem;
        }

        .preview-bar a {
            color: #f0872a;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.375rem;
        }

        .preview-bar a:hover {
            color: #fff;
        }

        {!! $footer->css_content !!}
    </style>
</head>

<body>
    <div class="preview-bar">
        <a href="{{ route('footers.index') }}">
            <i class="ri-arrow-left-line"></i>
            Volver a Footers
        </a>
        <span style="margin-left:auto;">
            Previsualizando: <strong style="color:#fff;">{{ $footer->name }}</strong>
        </span>
        <a href="{{ route('footers.edit', $footer->id) }}">
            <i class="ri-edit-line"></i>
            Editar
        </a>
    </div>

    {!! $footer->html_content !!}

    @if ($footer->js_content)
        <script>
            {!! $footer->js_content !!}
        </script>
    @endif
</body>

</html>
