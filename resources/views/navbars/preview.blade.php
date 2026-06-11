<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview: {{ $navbar->name }}</title>
    <link href="{{ Vite::asset('node_modules/remixicon/fonts/remixicon.css') }}" rel="stylesheet">
    <style>
        *, *::before, *::after {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            background: #f1f5f9;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            padding-bottom: 72px;
            color: #1e293b;
        }
        #navbar-preview-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #0d3f6a 0%, #0a2f4d 100%);
            color: white;
            padding: 0 1.5rem;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.5rem;
            box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.2);
            z-index: 99999;
            border-top: 3px solid #f0872a;
        }

        #navbar-preview-bar .npb-info {
            display: flex;
            align-items: center;
            gap: 0.875rem;
            flex: 1;
            min-width: 0;
        }

        #navbar-preview-bar .npb-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
            padding: 0.25rem 0.625rem;
            background: rgba(240, 135, 42, 0.2);
            border: 1px solid #f0872a;
            border-radius: 9999px;
            font-size: 0.6875rem;
            font-weight: 600;
            color: #fff;
            white-space: nowrap;
            flex-shrink: 0;
        }

        #navbar-preview-bar .npb-name {
            font-size: 0.9375rem;
            font-weight: 700;
            color: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        #navbar-preview-bar .npb-actions {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            flex-shrink: 0;
        }

        #navbar-preview-bar .npb-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.4rem 0.875rem;
            border-radius: 0.5rem;
            font-weight: 600;
            font-size: 0.8125rem;
            text-decoration: none;
            border: 2px solid;
            transition: all 0.2s;
            white-space: nowrap;
            cursor: pointer;
        }

        #navbar-preview-bar .npb-btn-outline {
            background: transparent;
            color: #fff;
            border-color: rgba(255, 255, 255, 0.35);
        }

        #navbar-preview-bar .npb-btn-outline:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.6);
        }

        #navbar-preview-bar .npb-btn-primary {
            background: #f0872a;
            color: #fff;
            border-color: #f0872a;
        }

        #navbar-preview-bar .npb-btn-primary:hover {
            background: #d97821;
            border-color: #d97821;
        }
        .ps-page {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .ps-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }
        .ps-hero {
            background: linear-gradient(135deg, #0d3f6a 0%, #1a5c96 50%, #0a2f4d 100%);
            padding: 5rem 0 4rem;
            position: relative;
            overflow: hidden;
        }

        .ps-hero::before {
            content: '';
            position: absolute;
            top: -80px;
            right: -80px;
            width: 400px;
            height: 400px;
            background: rgba(240, 135, 42, 0.08);
            border-radius: 50%;
        }

        .ps-hero::after {
            content: '';
            position: absolute;
            bottom: -60px;
            left: -60px;
            width: 300px;
            height: 300px;
            background: rgba(255, 255, 255, 0.04);
            border-radius: 50%;
        }

        .ps-hero__inner {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
            position: relative;
            z-index: 1;
        }

        .ps-hero__badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(240, 135, 42, 0.15);
            border: 1px solid rgba(240, 135, 42, 0.4);
            color: #f0a855;
            padding: 0.375rem 0.875rem;
            border-radius: 9999px;
            font-size: 0.8125rem;
            font-weight: 600;
            margin-bottom: 1.25rem;
        }

        .ps-hero__title {
            font-size: 3rem;
            font-weight: 800;
            color: #fff;
            line-height: 1.15;
            margin-bottom: 1.25rem;
            letter-spacing: -0.02em;
        }

        .ps-hero__title span {
            color: #f0872a;
        }

        .ps-hero__subtitle {
            font-size: 1.0625rem;
            color: rgba(255, 255, 255, 0.75);
            line-height: 1.7;
            margin-bottom: 2rem;
        }

        .ps-hero__cta {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .ps-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border-radius: 0.625rem;
            font-weight: 600;
            font-size: 0.9375rem;
            text-decoration: none;
            transition: all 0.2s;
            cursor: pointer;
            border: 2px solid transparent;
        }

        .ps-btn--primary {
            background: #f0872a;
            color: #fff;
            border-color: #f0872a;
        }

        .ps-btn--primary:hover {
            background: #d97821;
            border-color: #d97821;
            transform: translateY(-1px);
        }

        .ps-btn--ghost {
            background: transparent;
            color: #fff;
            border-color: rgba(255, 255, 255, 0.35);
        }

        .ps-btn--ghost:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.6);
        }

        .ps-btn--outline {
            background: transparent;
            color: #0d3f6a;
            border-color: #0d3f6a;
        }

        .ps-btn--outline:hover {
            background: #0d3f6a;
            color: #fff;
        }

        .ps-hero__stats {
            display: flex;
            gap: 2rem;
            margin-top: 2.5rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .ps-hero__stat-number {
            display: block;
            font-size: 1.5rem;
            font-weight: 800;
            color: #fff;
        }

        .ps-hero__stat-label {
            display: block;
            font-size: 0.8125rem;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 0.125rem;
        }

        .ps-hero__image-box {
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 1.25rem;
            aspect-ratio: 4/3;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.875rem;
            backdrop-filter: blur(4px);
        }

        .ps-hero__image-box i {
            font-size: 3rem;
            color: rgba(255, 255, 255, 0.2);
        }
        .ps-features {
            padding: 5rem 0;
            background: #fff;
        }

        .ps-section-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .ps-section-tag {
            display: inline-block;
            background: rgba(13, 63, 106, 0.08);
            color: #0d3f6a;
            padding: 0.3rem 0.875rem;
            border-radius: 9999px;
            font-size: 0.8125rem;
            font-weight: 600;
            margin-bottom: 0.875rem;
        }

        .ps-section-title {
            font-size: 2rem;
            font-weight: 800;
            color: #0d3f6a;
            margin-bottom: 0.75rem;
            letter-spacing: -0.02em;
        }

        .ps-section-subtitle {
            font-size: 1rem;
            color: #64748b;
            max-width: 560px;
            margin: 0 auto;
            line-height: 1.7;
        }

        .ps-cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
        }

        .ps-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 1rem;
            padding: 2rem 1.5rem;
            transition: all 0.25s;
            position: relative;
        }

        .ps-card:hover {
            box-shadow: 0 8px 24px rgba(13, 63, 106, 0.1);
            transform: translateY(-3px);
            border-color: #cbd5e1;
        }

        .ps-card--featured {
            background: linear-gradient(135deg, #0d3f6a 0%, #1a5c96 100%);
            border-color: transparent;
            color: #fff;
        }

        .ps-card--featured:hover {
            box-shadow: 0 12px 32px rgba(13, 63, 106, 0.3);
        }

        .ps-card__badge {
            position: absolute;
            top: -0.75rem;
            right: 1.25rem;
            background: #f0872a;
            color: #fff;
            font-size: 0.6875rem;
            font-weight: 700;
            padding: 0.2rem 0.625rem;
            border-radius: 9999px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .ps-card__icon {
            width: 52px;
            height: 52px;
            border-radius: 0.875rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 1.25rem;
        }

        .ps-card__icon--blue { background: rgba(13, 63, 106, 0.1); color: #0d3f6a; }
        .ps-card__icon--orange { background: rgba(240, 135, 42, 0.15); color: #f0872a; }
        .ps-card__icon--green { background: rgba(16, 185, 129, 0.1); color: #059669; }
        .ps-card--featured .ps-card__icon--orange { background: rgba(240, 135, 42, 0.25); }

        .ps-card__title {
            font-size: 1.0625rem;
            font-weight: 700;
            margin-bottom: 0.625rem;
            color: #0d3f6a;
        }

        .ps-card--featured .ps-card__title { color: #fff; }

        .ps-card__text {
            font-size: 0.9rem;
            color: #64748b;
            line-height: 1.65;
            margin-bottom: 1.25rem;
        }

        .ps-card--featured .ps-card__text { color: rgba(255, 255, 255, 0.75); }

        .ps-card__link {
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
            font-size: 0.875rem;
            font-weight: 600;
            color: #0d3f6a;
            text-decoration: none;
        }

        .ps-card--featured .ps-card__link { color: #f0a855; }

        .ps-card__link:hover { gap: 0.625rem; }
        .ps-about {
            padding: 5rem 0;
            background: #f8fafc;
        }

        .ps-about__grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }

        .ps-about__image-box {
            background: #e2e8f0;
            border-radius: 1.25rem;
            aspect-ratio: 4/3;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            color: #94a3b8;
            font-size: 0.875rem;
            position: relative;
        }

        .ps-about__image-box i {
            font-size: 3rem;
            color: #cbd5e1;
        }

        .ps-about__image-accent {
            position: absolute;
            bottom: -1rem;
            right: -1rem;
            width: 80px;
            height: 80px;
            background: #f0872a;
            border-radius: 1rem;
            opacity: 0.15;
        }

        .ps-about__text {
            font-size: 0.9375rem;
            color: #475569;
            line-height: 1.75;
            margin-bottom: 1rem;
        }

        .ps-about__features {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.625rem;
            margin: 1.5rem 0 2rem;
        }

        .ps-about__feature {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            color: #334155;
            font-weight: 500;
        }

        .ps-about__feature i {
            color: #059669;
            font-size: 1rem;
            flex-shrink: 0;
        }
        .ps-cta {
            padding: 5rem 0;
            background: linear-gradient(135deg, #f0872a 0%, #d97821 100%);
            text-align: center;
        }

        .ps-cta__title {
            font-size: 2.25rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 0.875rem;
            letter-spacing: -0.02em;
        }

        .ps-cta__subtitle {
            font-size: 1.0625rem;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 2rem;
            max-width: 480px;
            margin-left: auto;
            margin-right: auto;
            line-height: 1.65;
        }

        .ps-cta__actions {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
        }

        .ps-btn--white {
            background: #fff;
            color: #d97821;
            border-color: #fff;
        }

        .ps-btn--white:hover {
            background: #f8fafc;
            transform: translateY(-1px);
        }

        .ps-btn--ghost-white {
            background: transparent;
            color: #fff;
            border-color: rgba(255, 255, 255, 0.5);
        }

        .ps-btn--ghost-white:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.8);
        }
        @media (max-width: 900px) {
            .ps-hero__inner,
            .ps-about__grid {
                grid-template-columns: 1fr;
            }

            .ps-hero__image-box {
                display: none;
            }

            .ps-cards {
                grid-template-columns: 1fr;
            }

            .ps-hero__title {
                font-size: 2.25rem;
            }
        }

        @media (max-width: 640px) {
            .ps-hero {
                padding: 3rem 0 2.5rem;
            }

            .ps-hero__title {
                font-size: 1.75rem;
            }

            .ps-hero__stats {
                gap: 1.25rem;
            }

            .ps-about__features {
                grid-template-columns: 1fr;
            }

            #navbar-preview-bar {
                padding: 0 1rem;
                gap: 0.75rem;
            }

            #navbar-preview-bar .npb-name {
                font-size: 0.8125rem;
                max-width: 120px;
            }

            #navbar-preview-bar .npb-btn span {
                display: none;
            }

            #navbar-preview-bar .npb-badge span {
                display: none;
            }
        }
        {!! $navbar->css_content !!}
    </style>
</head>

<body>

    {!! $navbar->html_content !!}
    <div class="ps-page">
        <section class="ps-hero">
            <div class="ps-container">
                <div class="ps-hero__inner">
                    <div class="ps-hero__content">
                        <span class="ps-hero__badge">
                            <i class="ri-sparkling-line"></i>
                            Bienvenido a nuestra plataforma
                        </span>
                        <h1 class="ps-hero__title">
                            Soluciones digitales<br>
                            <span>para tu negocio</span>
                        </h1>
                        <p class="ps-hero__subtitle">
                            Creamos experiencias digitales únicas que conectan con tu audiencia y potencian el crecimiento de tu empresa. Descubre todo lo que podemos hacer por ti.
                        </p>
                        <div class="ps-hero__cta">
                            <a href="#" class="ps-btn ps-btn--primary">
                                <i class="ri-rocket-line"></i>
                                Comenzar ahora
                            </a>
                            <a href="#" class="ps-btn ps-btn--ghost">
                                <i class="ri-play-circle-line"></i>
                                Ver demo
                            </a>
                        </div>
                        <div class="ps-hero__stats">
                            <div>
                                <span class="ps-hero__stat-number">+2,500</span>
                                <span class="ps-hero__stat-label">Clientes activos</span>
                            </div>
                            <div>
                                <span class="ps-hero__stat-number">98%</span>
                                <span class="ps-hero__stat-label">Satisfacción</span>
                            </div>
                            <div>
                                <span class="ps-hero__stat-number">+10 años</span>
                                <span class="ps-hero__stat-label">De experiencia</span>
                            </div>
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
                    <span class="ps-section-tag">Nuestros servicios</span>
                    <h2 class="ps-section-title">¿Por qué elegirnos?</h2>
                    <p class="ps-section-subtitle">
                        Ofrecemos soluciones completas adaptadas a las necesidades de cada cliente, con tecnología de vanguardia y un equipo de expertos.
                    </p>
                </div>
                <div class="ps-cards">
                    <div class="ps-card">
                        <div class="ps-card__icon ps-card__icon--blue">
                            <i class="ri-shield-check-line"></i>
                        </div>
                        <h3 class="ps-card__title">Seguridad garantizada</h3>
                        <p class="ps-card__text">
                            Protegemos tus datos con los más altos estándares de seguridad y cifrado de nivel empresarial.
                        </p>
                        <a href="#" class="ps-card__link">
                            Saber más <i class="ri-arrow-right-line"></i>
                        </a>
                    </div>
                    <div class="ps-card ps-card--featured">
                        <div class="ps-card__badge">Popular</div>
                        <div class="ps-card__icon ps-card__icon--orange">
                            <i class="ri-speed-up-line"></i>
                        </div>
                        <h3 class="ps-card__title">Alto rendimiento</h3>
                        <p class="ps-card__text">
                            Infraestructura optimizada para garantizar la máxima velocidad y disponibilidad en todo momento.
                        </p>
                        <a href="#" class="ps-card__link">
                            Saber más <i class="ri-arrow-right-line"></i>
                        </a>
                    </div>
                    <div class="ps-card">
                        <div class="ps-card__icon ps-card__icon--green">
                            <i class="ri-customer-service-2-line"></i>
                        </div>
                        <h3 class="ps-card__title">Soporte 24/7</h3>
                        <p class="ps-card__text">
                            Nuestro equipo de soporte está disponible las 24 horas para ayudarte cuando más lo necesites.
                        </p>
                        <a href="#" class="ps-card__link">
                            Saber más <i class="ri-arrow-right-line"></i>
                        </a>
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
                        <div class="ps-about__image-accent"></div>
                    </div>
                    <div>
                        <span class="ps-section-tag">Sobre nosotros</span>
                        <h2 class="ps-section-title" style="text-align:left; margin-top:0.75rem;">
                            Más de una década construyendo el futuro digital
                        </h2>
                        <p class="ps-about__text">
                            Somos un equipo apasionado de desarrolladores, diseñadores y estrategas digitales comprometidos con la excelencia. Desde 2014, hemos ayudado a cientos de empresas a transformar su presencia digital.
                        </p>
                        <p class="ps-about__text">
                            Nuestra metodología ágil y enfoque centrado en el usuario nos permite entregar proyectos de alta calidad en tiempo y forma, superando siempre las expectativas de nuestros clientes.
                        </p>
                        <div class="ps-about__features">
                            <div class="ps-about__feature">
                                <i class="ri-check-double-line"></i>
                                <span>Diseño responsivo y moderno</span>
                            </div>
                            <div class="ps-about__feature">
                                <i class="ri-check-double-line"></i>
                                <span>Optimización SEO incluida</span>
                            </div>
                            <div class="ps-about__feature">
                                <i class="ri-check-double-line"></i>
                                <span>Integración con sistemas</span>
                            </div>
                            <div class="ps-about__feature">
                                <i class="ri-check-double-line"></i>
                                <span>Mantenimiento continuo</span>
                            </div>
                        </div>
                        <a href="#" class="ps-btn ps-btn--outline">
                            Conocer el equipo <i class="ri-arrow-right-line"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section class="ps-cta">
            <div class="ps-container">
                <h2 class="ps-cta__title">¿Listo para comenzar?</h2>
                <p class="ps-cta__subtitle">
                    Únete a miles de empresas que ya confían en nosotros para impulsar su crecimiento digital.
                </p>
                <div class="ps-cta__actions">
                    <a href="#" class="ps-btn ps-btn--white">
                        <i class="ri-rocket-line"></i>
                        Empezar gratis
                    </a>
                    <a href="#" class="ps-btn ps-btn--ghost-white">
                        Hablar con ventas
                    </a>
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
