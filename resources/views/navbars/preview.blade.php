<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview: {{ $navbar->name }}</title>
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

        {!! $navbar->css_content !!}
    </style>
</head>

<body>
    <div class="preview-bar">
        <a href="{{ route('navbars.index') }}">
            <i class="ri-arrow-left-line"></i>
            Volver a Navbars
        </a>
        <span style="margin-left:auto;">
            Previsualizando: <strong style="color:#fff;">{{ $navbar->name }}</strong>
        </span>
        <a href="{{ route('navbars.edit', $navbar->id) }}">
            <i class="ri-edit-line"></i>
            Editar
        </a>
    </div>

    {!! $navbar->html_content !!}

    @if ($navbar->js_content)
        <script>
            {!! $navbar->js_content !!}
        </script>
    @endif
</body>

</html>
