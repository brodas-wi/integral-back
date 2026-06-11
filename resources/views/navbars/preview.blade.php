<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview: {{ $navbar->name }}</title>
    <link href="{{ Vite::asset('node_modules/remixicon/fonts/remixicon.css') }}" rel="stylesheet">
    @vite([
        'resources/css/views/navbars/preview.css',
        'resources/js/views/navbars/preview.js',
    ])
    <style>
        {!! $navbar->css_content !!}
    </style>
</head>

<body class="navbar-preview-body">

    {!! $navbar->html_content !!}

    <div class="ps-page">
        <section class="ps-hero">
            <div class="ps-container">
                <div class="ps-hero__inner">
                    <div>
                        <h1 class="ps-hero__title">
                            Lorem ipsum dolor<br>
                            <span>sit amet consectetur</span>
                        </h1>
                        <p class="ps-hero__subtitle">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                        </p>
                        <div class="ps-hero__cta">
                            <a href="#" class="ps-btn ps-btn--primary">
                                <i class="ri-rocket-line"></i>
                                Comenzar ahora
                            </a>
                            <a href="#" class="ps-btn ps-btn--ghost">
                                Ver demo
                            </a>
                        </div>
                    </div>
                    <div class="ps-hero__image-box">
                        <i class="ri-image-line"></i>
                        <span>Imagen principal</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="ps-features">
            <div class="ps-container">
                <div class="ps-section-header">
                    <span class="ps-section-tag">Servicios</span>
                    <h2 class="ps-section-title">¿Por qué elegirnos?</h2>
                    <p class="ps-section-subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation.
                    </p>
                </div>
                <div class="ps-cards">
                    <div class="ps-card">
                        <div class="ps-card__icon ps-card__icon--blue">
                            <i class="ri-shield-check-line"></i>
                        </div>
                        <h3 class="ps-card__title">Seguridad</h3>
                        <p class="ps-card__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                    </div>
                    <div class="ps-card">
                        <div class="ps-card__icon ps-card__icon--orange">
                            <i class="ri-speed-up-line"></i>
                        </div>
                        <h3 class="ps-card__title">Rendimiento</h3>
                        <p class="ps-card__text">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.</p>
                    </div>
                    <div class="ps-card">
                        <div class="ps-card__icon ps-card__icon--gray">
                            <i class="ri-customer-service-2-line"></i>
                        </div>
                        <h3 class="ps-card__title">Soporte</h3>
                        <p class="ps-card__text">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="ps-about">
            <div class="ps-container">
                <div class="ps-about__grid">
                    <div class="ps-about__image-box">
                        <i class="ri-image-2-line"></i>
                        <span>Imagen de sección</span>
                    </div>
                    <div>
                        <span class="ps-section-tag">Nosotros</span>
                        <h2 class="ps-section-title" style="text-align:left; margin-top:0.625rem;">
                            Lorem ipsum dolor sit amet consectetur
                        </h2>
                        <p class="ps-about__text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                        </p>
                        <p class="ps-about__text">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                        </p>
                        <ul class="ps-about__list">
                            <li><i class="ri-check-line"></i> Lorem ipsum dolor sit amet</li>
                            <li><i class="ri-check-line"></i> Consectetur adipiscing elit</li>
                            <li><i class="ri-check-line"></i> Sed do eiusmod tempor</li>
                        </ul>
                        <a href="#" class="ps-btn ps-btn--outline">
                            Conocer más <i class="ri-arrow-right-line"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

    </div>

    <nav id="navbar-preview-bar">
        <div class="npb-info">
            <span class="npb-badge">
                <i class="ri-layout-line"></i>
                <span>Vista Previa</span>
            </span>
            <span class="npb-name">{{ $navbar->name }}</span>
        </div>
        <div class="npb-actions">
            <a href="{{ route('navbars.index') }}" class="npb-btn npb-btn-outline">
                <i class="ri-arrow-left-line"></i>
                <span>Volver</span>
            </a>
            <a href="{{ route('navbars.edit', $navbar->id) }}" class="npb-btn npb-btn-primary">
                <i class="ri-edit-line"></i>
                <span>Editar</span>
            </a>
        </div>
    </nav>

    @if ($navbar->js_content)
        <script>
            {!! $navbar->js_content !!}
        </script>
    @endif

</body>

</html>
