@extends('layouts.admin')

@section('title', 'Inicio')
@section('page-title', 'Inicio')

@section('header-actions')
    <span class="text-sm text-gray-600">{{ now()->format('d/m/Y') }}</span>
@endsection

@section('content')
    <div class="card mb-8">
        <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <i class="ri-information-line text-2xl text-primary"></i>
            </div>
            <div class="flex-1">
                <h3 class="text-xl font-bold text-secondary mb-2">
                    ¡Bienvenido, {{ Auth::user()->name }}!
                </h3>
                <p class="text-gray-600 mb-3">
                    Has iniciado sesión con el rol de
                    <strong class="text-primary">{{ Auth::user()->roles()->first()->display_name }}</strong>
                </p>
                <p class="text-gray-600 text-sm">
                    Utiliza el menú lateral para navegar por las diferentes secciones del CMS o accede rápidamente desde las
                    tarjetas de abajo.
                </p>
            </div>
        </div>
    </div>

    @canany(['users.view', 'users.manage', 'roles.view', 'roles.manage'])
        <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="ri-settings-3-line"></i> Administración
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                @canany(['users.view', 'users.manage'])
                    <div class="card bg-blue-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Usuarios</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['users'] }}</h3>
                                <p class="text-xs opacity-75">Usuarios registrados en el sistema</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-user-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('users.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                            @canany(['users.create', 'users.manage'])
                                <a href="{{ route('users.create') }}"
                                    class="flex-1 bg-white text-blue-600 hover:opacity-90 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                    <i class="ri-add-line mr-2"></i>
                                    Crear Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['roles.view', 'roles.manage'])
                    <div class="card bg-purple-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Roles</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['roles'] }}</h3>
                                <p class="text-xs opacity-75">Roles de permisos configurados</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-shield-user-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('roles.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                            @canany(['roles.create', 'roles.manage'])
                                <a href="{{ route('roles.create') }}"
                                    class="flex-1 bg-white text-purple-600 hover:opacity-90 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                    <i class="ri-add-line mr-2"></i>
                                    Crear Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

            </div>
        </div>
    @endcanany

    @canany(['pages.view', 'pages.manage', 'navbars.view', 'navbars.manage', 'footers.view', 'footers.manage', 'media.view', 'media.manage', 'banners.view', 'banners.manage', 'announcements.view', 'announcements.manage', 'scripts.view', 'scripts.manage'])
        <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="ri-layout-line"></i> Contenido
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                @canany(['pages.view', 'pages.manage'])
                    <div class="card bg-green-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Páginas</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['pages'] }}</h3>
                                <p class="text-xs opacity-75">Páginas publicadas y borradores</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-pages-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('pages.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                            @canany(['pages.create', 'pages.manage'])
                                <a href="{{ route('pages.create') }}"
                                    class="flex-1 bg-white text-green-600 hover:opacity-90 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                    <i class="ri-add-line mr-2"></i>
                                    Crear Nueva
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['navbars.view', 'navbars.manage'])
                    <div class="card bg-teal-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Navbars</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['navbars'] }}</h3>
                                <p class="text-xs opacity-75">Menús de navegación configurados</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-layout-top-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('navbars.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                        </div>
                    </div>
                @endcanany

                @canany(['footers.view', 'footers.manage'])
                    <div class="card bg-cyan-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Footers</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['footers'] }}</h3>
                                <p class="text-xs opacity-75">Pies de página configurados</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-layout-bottom-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('footers.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                        </div>
                    </div>
                @endcanany

                @canany(['media.view', 'media.manage'])
                    <div class="card bg-orange-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Archivos</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['media'] }}</h3>
                                <p class="text-xs opacity-75">Imágenes y documentos subidos</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-folder-image-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('media.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                            @canany(['media.upload', 'media.manage'])
                                <a href="{{ route('media.create') }}"
                                    class="flex-1 bg-white text-orange-600 hover:opacity-90 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                    <i class="ri-upload-2-line mr-2"></i>
                                    Subir Archivos
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['banners.view', 'banners.manage'])
                    <div class="card bg-yellow-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Banners</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['banners'] }}</h3>
                                <p class="text-xs opacity-75">Banners activos e inactivos</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-image-2-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('banners.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                            @canany(['banners.create', 'banners.manage'])
                                <a href="{{ route('banners.create') }}"
                                    class="flex-1 bg-white text-yellow-600 hover:opacity-90 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                    <i class="ri-add-line mr-2"></i>
                                    Crear Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['announcements.view', 'announcements.manage'])
                    <div class="card bg-pink-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Avisos</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['announcements'] }}</h3>
                                <p class="text-xs opacity-75">Avisos y notificaciones publicados</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-notification-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('announcements.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                            @canany(['announcements.create', 'announcements.manage'])
                                <a href="{{ route('announcements.create') }}"
                                    class="flex-1 bg-white text-pink-600 hover:opacity-90 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                    <i class="ri-add-line mr-2"></i>
                                    Crear Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['scripts.view', 'scripts.manage'])
                    <div class="card bg-slate-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Scripts</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['scripts'] }}</h3>
                                <p class="text-xs opacity-75">Scripts y fragmentos de código</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-code-s-slash-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('scripts.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                            @canany(['scripts.create', 'scripts.manage'])
                                <a href="{{ route('scripts.create') }}"
                                    class="flex-1 bg-white text-slate-600 hover:opacity-90 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                    <i class="ri-add-line mr-2"></i>
                                    Crear Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

            </div>
        </div>
    @endcanany

    @canany(['agencies.view', 'agencies.manage', 'payment_points.view', 'payment_points.manage'])
        <div class="mb-6">
            <h4 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <i class="ri-map-pin-line"></i> Red de Servicios
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                @canany(['agencies.view', 'agencies.manage'])
                    <div class="card bg-red-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Agencias</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['agencies'] }}</h3>
                                <p class="text-xs opacity-75">Ubicaciones registradas</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-building-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('agencies.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                            @canany(['agencies.create', 'agencies.manage'])
                                <a href="{{ route('agencies.create') }}"
                                    class="flex-1 bg-white text-red-600 hover:opacity-90 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                    <i class="ri-add-line mr-2"></i>
                                    Agregar Nueva
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['payment_points.view', 'payment_points.manage'])
                    <div class="card bg-indigo-600 text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm opacity-90 mb-1">Total Puntos de Pago</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['payment_points'] }}</h3>
                                <p class="text-xs opacity-75">Puntos de pago registrados</p>
                            </div>
                            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                                <i class="ri-store-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t border-white/20">
                            <a href="{{ route('payment-points.index') }}"
                                class="flex-1 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i>
                                Ver Lista
                            </a>
                            @canany(['payment_points.create', 'payment_points.manage'])
                                <a href="{{ route('payment-points.create') }}"
                                    class="flex-1 bg-white text-indigo-600 hover:opacity-90 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm">
                                    <i class="ri-add-line mr-2"></i>
                                    Agregar Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

            </div>
        </div>
    @endcanany

@endsection
