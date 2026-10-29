<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="app-url" content="{{ rtrim(config('app.url'), '/') }}">
    <meta name="asset-url" content="{{ rtrim(config('app.asset_url', config('app.url')), '/') }}">
    <meta name="media-api-url" content="{{ route('media.api') }}">
    <meta name="api-assets-url" content="{{ route('api.assets.active') }}">
    <meta name="map-locations-url" content="{{ route('api.map-locations') }}">
    <title>@yield('title', 'Dashboard') - CMS Integral</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <link href="{{ Vite::asset('node_modules/remixicon/fonts/remixicon.css') }}" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/css/notifications.css', 'resources/js/app.js', 'resources/js/layouts/admin-layout.js'])
    @stack('styles')
    @stack('head')
</head>

@php
    $gate = app(\Illuminate\Contracts\Auth\Access\Gate::class);

    $sidebarGroups = [
        [
            'key' => 'administrar',
            'label' => 'Administrar',
            'icon' => 'ri-settings-3-line',
            'items' => [
                ['label' => 'Usuarios', 'route' => 'users.index', 'icon' => 'ri-user-line', 'active' => ['users.*'], 'can' => ['users.view', 'users.manage']],
                ['label' => 'Roles', 'route' => 'roles.index', 'icon' => 'ri-shield-user-line', 'active' => ['roles.*'], 'can' => ['roles.view', 'roles.manage']],
            ],
        ],
        [
            'key' => 'contenido',
            'label' => 'Contenido',
            'icon' => 'ri-layout-line',
            'items' => [
                ['label' => 'Páginas', 'route' => 'pages.index', 'icon' => 'ri-pages-line', 'active' => ['pages.*'], 'can' => ['pages.view', 'pages.manage']],
                ['label' => 'Medios', 'route' => 'media.index', 'icon' => 'ri-image-line', 'active' => ['media.*'], 'can' => ['media.view', 'media.manage']],
                ['label' => 'Banners', 'route' => 'banners.index', 'icon' => 'ri-image-2-line', 'active' => ['banners.*'], 'can' => ['banners.view', 'banners.manage']],
                ['label' => 'Avisos', 'route' => 'announcements.index', 'icon' => 'ri-notification-line', 'active' => ['announcements.*'], 'can' => ['announcements.view', 'announcements.manage']],
                ['label' => 'Activos Extraordinarios', 'route' => 'assets.index', 'icon' => 'ri-building-4-line', 'active' => ['assets.*', 'asset-categories.*'], 'can' => ['assets.view', 'assets.manage']],
                ['label' => 'Noticias', 'route' => 'news.index', 'icon' => 'ri-newspaper-line', 'active' => ['news.*', 'news-categories.*'], 'can' => ['news.view', 'news.manage', 'news_categories.view', 'news_categories.manage'], 'feature' => 'news'],
            ],
        ],
        [
            'key' => 'componentes',
            'label' => 'Componentes',
            'icon' => 'ri-apps-2-line',
            'items' => [
                ['label' => 'Navbars', 'route' => 'navbars.index', 'icon' => 'ri-layout-top-line', 'active' => ['navbars.*'], 'can' => ['navbars.view', 'navbars.manage']],
                ['label' => 'Footers', 'route' => 'footers.index', 'icon' => 'ri-layout-bottom-line', 'active' => ['footers.*'], 'can' => ['footers.view', 'footers.manage']],
                ['label' => 'Formularios', 'route' => 'forms.index', 'icon' => 'ri-survey-line', 'active' => ['forms.*'], 'can' => ['forms.view', 'forms.manage']],
                ['label' => 'Scripts', 'route' => 'scripts.index', 'icon' => 'ri-code-s-slash-line', 'active' => ['scripts.*'], 'can' => ['scripts.view', 'scripts.manage']],
            ],
        ],
        [
            'key' => 'servicios',
            'label' => 'Servicios',
            'icon' => 'ri-map-pin-line',
            'items' => [
                ['label' => 'Agencias', 'route' => 'agencies.index', 'icon' => 'ri-building-line', 'active' => ['agencies.*'], 'can' => ['agencies.view', 'agencies.manage']],
                ['label' => 'Puntos de Pago', 'route' => 'payment-points.index', 'icon' => 'ri-store-line', 'active' => ['payment-points.*'], 'can' => ['payment_points.view', 'payment_points.manage']],
            ],
        ],
    ];

    $sidebarGroups = collect($sidebarGroups)
        ->map(function ($group) use ($gate) {
            $group['items'] = collect($group['items'])
                ->filter(fn($item) => (!isset($item['feature']) || config("features.{$item['feature']}")) && $gate->any($item['can']))
                ->map(function ($item) {
                    $item['is_active'] = request()->routeIs(...$item['active']);
                    return $item;
                })
                ->values();
            $group['is_open'] = $group['items']->contains('is_active', true);
            return $group;
        })
        ->filter(fn($group) => $group['items']->isNotEmpty())
        ->values();

    $sessionMessages = (object) collect(['success', 'error', 'warning', 'info'])
        ->mapWithKeys(fn($type) => [$type => session($type)])
        ->filter()
        ->all();
@endphp

<body class="bg-light">
    <div class="flex h-screen overflow-hidden">
        <aside id="sidebar"
            class="fixed lg:static inset-y-0 left-0 z-50 w-60 bg-white shadow-lg transform -translate-x-full lg:translate-x-0 transition-transform duration-300">
            <div class="flex flex-col h-full">
                <div class="flex items-center justify-between p-4 bg-secondary">
                    <h1 class="text-2xl font-bold text-white">CMS Admin</h1>
                    <button id="closeSidebar" class="lg:hidden text-white">
                        <i class="ri-close-line text-2xl"></i>
                    </button>
                </div>

                <nav class="flex-1 overflow-y-auto p-4 space-y-1">
                    <a href="{{ route('dashboard') }}"
                        class="sidebar-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                        <i class="ri-home-line text-xl"></i>
                        <span>Inicio</span>
                    </a>

                    @foreach ($sidebarGroups as $group)
                        <div class="sidebar-group" data-group="{{ $group['key'] }}"
                            data-open="{{ $group['is_open'] ? 'true' : 'false' }}">
                            <button type="button" class="sidebar-group-btn">
                                <div class="flex items-center gap-3">
                                    <i class="{{ $group['icon'] }} text-xl"></i>
                                    <span>{{ $group['label'] }}</span>
                                </div>
                                <i class="ri-arrow-down-s-line sidebar-group-arrow text-lg"></i>
                            </button>
                            <div class="sidebar-group-content">
                                @foreach ($group['items'] as $item)
                                    <a href="{{ route($item['route']) }}"
                                        class="sidebar-child-link {{ $item['is_active'] ? 'active' : '' }}">
                                        <i class="{{ $item['icon'] }} text-lg"></i>
                                        <span>{{ $item['label'] }}</span>
                                    </a>
                                @endforeach
                            </div>
                        </div>
                    @endforeach
                </nav>

                @auth
                    @php $isProfile = request()->routeIs('profile.*'); @endphp
                    <div class="p-4 border-t border-gray-200">
                        <a href="{{ route('profile.edit') }}"
                            class="flex items-center gap-3 p-2 rounded-full transition-all hover:bg-gray-100 {{ $isProfile ? 'bg-primary bg-opacity-10' : '' }}">
                            <div
                                class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                                {{ strtoupper(substr(Auth::user()->name, 0, 1)) }}
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-medium text-secondary truncate">{{ Auth::user()->name }}</p>
                            </div>
                            <i class="ri-arrow-right-s-line text-gray-400 {{ $isProfile ? 'text-primary' : '' }}"></i>
                        </a>
                        <form method="POST" action="{{ route('logout') }}">
                            @csrf
                            <button type="submit"
                                class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-full transition-all font-medium">
                                <i class="ri-logout-box-line text-xl"></i>
                                <span>Cerrar Sesión</span>
                            </button>
                        </form>
                    </div>
                @endauth
            </div>
        </aside>

        <div class="flex-1 flex flex-col overflow-hidden">
            <header class="bg-white shadow-sm z-10">
                <div class="flex items-center justify-between px-6 py-4">
                    <div class="flex items-center gap-4">
                        <button id="openSidebar" class="lg:hidden text-secondary">
                            <i class="ri-menu-line text-2xl"></i>
                        </button>
                        <h2 class="text-2xl font-bold text-secondary">@yield('page-title', 'Dashboard')</h2>
                    </div>

                    <div class="flex items-center gap-4">
                        @yield('header-actions')
                    </div>
                </div>
            </header>

            <main class="flex-1 overflow-y-auto p-6">
                @yield('content')
            </main>
        </div>
    </div>

    <div id="sidebarOverlay" class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden hidden"></div>

    <script>
        window.__sessionMessages = @json($sessionMessages);
    </script>

    @stack('scripts')
</body>

</html>