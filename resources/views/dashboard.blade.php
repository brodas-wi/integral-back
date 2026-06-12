@extends('layouts.admin')

@section('title', 'Inicio')
@section('page-title', 'Inicio')

@section('header-actions')
    <span class="text-sm text-gray-600">{{ now()->format('d/m/Y') }}</span>
@endsection

@section('content')
    <div class="card mb-8">
        <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                style="background-color: color-mix(in srgb, var(--color-primary) 15%, transparent)">
                <i class="ri-information-line text-2xl" style="color: var(--color-primary)"></i>
            </div>
            <div class="flex-1">
                <h3 class="text-xl font-bold mb-2" style="color: var(--color-secondary)">
                    ¡Bienvenido, {{ Auth::user()->name }}!
                </h3>
                <p class="text-gray-600 mb-3">
                    Has iniciado sesión con el rol de
                    <strong style="color: var(--color-primary)">{{ Auth::user()->roles()->first()->display_name }}</strong>
                </p>
                <p class="text-gray-500 text-sm">
                    Utiliza el menú lateral para navegar por las diferentes secciones del CMS o accede rápidamente desde las
                    tarjetas de abajo.
                </p>
            </div>
        </div>
    </div>

    @canany(['pages.view', 'pages.manage', 'navbars.view', 'navbars.manage', 'footers.view', 'footers.manage', 'media.view',
        'media.manage', 'banners.view', 'banners.manage', 'announcements.view', 'announcements.manage', 'scripts.view',
        'scripts.manage'])
        <div class="mb-8">
            <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <i class="ri-layout-line text-base"></i> Contenido
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                @canany(['pages.view', 'pages.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #16a34a; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Páginas</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['pages'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Páginas publicadas y borradores</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-pages-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('pages.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                            @canany(['pages.create', 'pages.manage'])
                                <a href="{{ route('pages.create') }}"
                                    class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                    style="background-color: white; color: #16a34a;">
                                    <i class="ri-add-line mr-2"></i> Crear Nueva
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['navbars.view', 'navbars.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #0d9488; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Navbars</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['navbars'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Menús de navegación configurados</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-layout-top-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('navbars.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                        </div>
                    </div>
                @endcanany

                @canany(['footers.view', 'footers.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #0891b2; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Footers</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['footers'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Pies de página configurados</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-layout-bottom-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('footers.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                        </div>
                    </div>
                @endcanany

                @canany(['media.view', 'media.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #ea580c; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Archivos</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['media'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Imágenes y documentos subidos</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-folder-image-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('media.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                            @canany(['media.upload', 'media.manage'])
                                <a href="{{ route('media.create') }}"
                                    class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                    style="background-color: white; color: #ea580c;">
                                    <i class="ri-upload-2-line mr-2"></i> Subir Archivos
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['banners.view', 'banners.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #ca8a04; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Banners</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['banners'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Banners activos e inactivos</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-image-2-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('banners.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                            @canany(['banners.create', 'banners.manage'])
                                <a href="{{ route('banners.create') }}"
                                    class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                    style="background-color: white; color: #ca8a04;">
                                    <i class="ri-add-line mr-2"></i> Crear Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['announcements.view', 'announcements.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #db2777; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Avisos</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['announcements'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Avisos y notificaciones publicados</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-notification-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('announcements.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                            @canany(['announcements.create', 'announcements.manage'])
                                <a href="{{ route('announcements.create') }}"
                                    class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                    style="background-color: white; color: #db2777;">
                                    <i class="ri-add-line mr-2"></i> Crear Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['scripts.view', 'scripts.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #475569; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Scripts</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['scripts'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Scripts y fragmentos de código</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-code-s-slash-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('scripts.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                            @canany(['scripts.create', 'scripts.manage'])
                                <a href="{{ route('scripts.create') }}"
                                    class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                    style="background-color: white; color: #475569;">
                                    <i class="ri-add-line mr-2"></i> Crear Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

            </div>
        </div>
    @endcanany

    @canany(['agencies.view', 'agencies.manage', 'payment_points.view', 'payment_points.manage'])
        <div class="mb-8">
            <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <i class="ri-map-pin-line text-base"></i> Red de Servicios
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                @canany(['agencies.view', 'agencies.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #dc2626; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Agencias</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['agencies'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Ubicaciones registradas</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-building-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('agencies.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                            @canany(['agencies.create', 'agencies.manage'])
                                <a href="{{ route('agencies.create') }}"
                                    class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                    style="background-color: white; color: #dc2626;">
                                    <i class="ri-add-line mr-2"></i> Agregar Nueva
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['payment_points.view', 'payment_points.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #4f46e5; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Puntos de Pago</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['payment_points'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Puntos de pago registrados</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-store-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('payment-points.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                            @canany(['payment_points.create', 'payment_points.manage'])
                                <a href="{{ route('payment-points.create') }}"
                                    class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                    style="background-color: white; color: #4f46e5;">
                                    <i class="ri-add-line mr-2"></i> Agregar Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

            </div>
        </div>
    @endcanany

    @canany(['users.view', 'users.manage', 'roles.view', 'roles.manage'])
        <div class="mb-8">
            <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <i class="ri-settings-3-line text-base"></i> Administración
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                @canany(['users.view', 'users.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #2563eb; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Usuarios</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['users'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Usuarios registrados en el sistema</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-user-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('users.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                            @canany(['users.create', 'users.manage'])
                                <a href="{{ route('users.create') }}"
                                    class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                    style="background-color: white; color: #2563eb;">
                                    <i class="ri-add-line mr-2"></i> Crear Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

                @canany(['roles.view', 'roles.manage'])
                    <div class="card hover:shadow-xl transition-shadow" style="background-color: #7c3aed; color: white;">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm mb-1" style="opacity: 0.85">Total Roles</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats['roles'] }}</h3>
                                <p class="text-xs" style="opacity: 0.7">Roles de permisos configurados</p>
                            </div>
                            <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0"
                                style="background-color: rgba(255,255,255,0.2)">
                                <i class="ri-shield-user-line text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4" style="border-top: 1px solid rgba(255,255,255,0.2)">
                            <a href="{{ route('roles.index') }}"
                                class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                style="background-color: rgba(255,255,255,0.2); color: white;">
                                <i class="ri-list-check mr-2"></i> Ver Lista
                            </a>
                            @canany(['roles.create', 'roles.manage'])
                                <a href="{{ route('roles.create') }}"
                                    class="flex-1 font-medium py-2 px-4 rounded-lg transition-all duration-200 inline-flex items-center justify-center text-sm"
                                    style="background-color: white; color: #7c3aed;">
                                    <i class="ri-add-line mr-2"></i> Crear Nuevo
                                </a>
                            @endcanany
                        </div>
                    </div>
                @endcanany

            </div>
        </div>
    @endcanany

@endsection
