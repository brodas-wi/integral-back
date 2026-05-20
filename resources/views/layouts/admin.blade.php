<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="app-url" content="{{ rtrim(config('app.url'), '/') }}">
    <meta name="asset-url" content="{{ rtrim(config('app.asset_url', config('app.url')), '/') }}">
    <meta name="media-api-url" content="{{ route('media.api') }}">
    <title>@yield('title', 'Dashboard') - CMS Integral</title>
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    @vite(['resources/css/app.css', 'resources/css/notifications.css', 'resources/js/app.js', 'resources/js/layouts/admin-layout.js'])
    @stack('styles')
    @stack('head')
</head>

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

                <nav class="flex-1 overflow-y-auto p-4">
                    <a href="{{ route('dashboard') }}"
                        class="sidebar-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                        <i class="ri-home-line text-xl"></i>
                        <span>Inicio</span>
                    </a>

                    @canany(['users.view', 'users.manage'])
                    <a href="{{ route('users.index') }}"
                        class="sidebar-link {{ request()->routeIs('users.*') ? 'active' : '' }}">
                        <i class="ri-user-line text-xl"></i>
                        <span>Usuarios</span>
                    </a>
                    @endcanany

                    @canany(['roles.view', 'roles.manage'])
                    <a href="{{ route('roles.index') }}"
                        class="sidebar-link {{ request()->routeIs('roles.*') ? 'active' : '' }}">
                        <i class="ri-shield-user-line text-xl"></i>
                        <span>Roles</span>
                    </a>
                    @endcanany

                    @canany(['pages.view', 'pages.manage'])
                    <a href="{{ route('pages.index') }}"
                        class="sidebar-link {{ request()->routeIs('pages.*') ? 'active' : '' }}">
                        <i class="ri-pages-line text-xl"></i>
                        <span>Páginas</span>
                    </a>
                    @endcanany

                    @canany(['media.view', 'media.manage'])
                    <a href="{{ route('media.index') }}"
                        class="sidebar-link {{ request()->routeIs('media.*') ? 'active' : '' }}">
                        <i class="ri-image-line text-xl"></i>
                        <span>Medios</span>
                    </a>
                    @endcanany

                    @canany(['agencies.view', 'agencies.manage'])
                    <a href="{{ route('agencies.index') }}"
                        class="sidebar-link {{ request()->routeIs('agencies.*') ? 'active' : '' }}">
                        <i class="ri-building-line text-xl"></i>
                        <span>Agencias</span>
                    </a>
                    @endcanany

                    @canany(['payment_points.view', 'payment_points.manage'])
                    <a href="{{ route('payment-points.index') }}"
                        class="sidebar-link {{ request()->routeIs('payment-points.*') ? 'active' : '' }}">
                        <i class="ri-store-line text-xl"></i>
                        <span>Puntos de Pago</span>
                    </a>
                    @endcanany

                    @canany(['announcements.view', 'announcements.manage'])
                    <a href="{{ route('announcements.index') }}"
                        class="sidebar-link {{ request()->routeIs('announcements.*') ? 'active' : '' }}">
                        <i class="ri-notification-line text-xl"></i>
                        <span>Avisos</span>
                    </a>
                    @endcanany

                    @canany(['banners.view', 'banners.manage'])
                    <a href="{{ route('banners.index') }}"
                        class="sidebar-link {{ request()->routeIs('banners.*') ? 'active' : '' }}">
                        <i class="ri-image-2-line text-xl"></i>
                        <span>Banners</span>
                    </a>
                    @endcanany
                </nav>

                @auth
                <div class="p-4 border-t border-gray-200">
                    <a href="{{ route('profile.edit') }}"
                        class="flex items-center gap-3 p-2 rounded-lg transition-all hover:bg-gray-100 {{ request()->routeIs('profile.*') ? 'bg-primary bg-opacity-10' : '' }}">
                        <div
                            class="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                            {{ strtoupper(substr(Auth::user()->name, 0, 1)) }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-medium text-secondary truncate">{{ Auth::user()->name }}</p>
                        </div>
                        <i
                            class="ri-arrow-right-s-line text-gray-400 {{ request()->routeIs('profile.*') ? 'text-primary' : '' }}"></i>
                    </a>
                    <form method="POST" action="{{ route('logout') }}">
                        @csrf
                        <button type="submit"
                            class="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium">
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
        window.__sessionMessages = {
            @if(session('success'))
                success: @json(session('success')),
            @endif
        @if(session('error'))
            error: @json(session('error')),
        @endif
            @if(session('warning'))
                warning: @json(session('warning')),
            @endif
            @if(session('info'))
                info: @json(session('info')),
            @endif
        };
    </script>

    @stack('scripts')
</body>

</html>
