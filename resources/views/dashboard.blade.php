@extends('layouts.admin')

@section('title', 'Inicio')
@section('page-title', 'Inicio')

@section('header-actions')
    <span class="text-sm text-gray-600">{{ now()->format('d/m/Y') }}</span>
@endsection

@php
    $gate = app(\Illuminate\Contracts\Auth\Access\Gate::class);

    $palettes = [
        'blue' => ['card' => 'bg-blue-600', 'soft' => 'text-blue-100', 'hint' => 'text-blue-200', 'circle' => 'bg-blue-500', 'line' => 'border-blue-500', 'view' => 'bg-blue-500 hover:bg-blue-400', 'create' => 'bg-white text-blue-600 hover:bg-blue-50'],
        'purple' => ['card' => 'bg-purple-600', 'soft' => 'text-purple-100', 'hint' => 'text-purple-200', 'circle' => 'bg-purple-500', 'line' => 'border-purple-500', 'view' => 'bg-purple-500 hover:bg-purple-400', 'create' => 'bg-white text-purple-600 hover:bg-purple-50'],
        'green' => ['card' => 'bg-green-600', 'soft' => 'text-green-100', 'hint' => 'text-green-200', 'circle' => 'bg-green-500', 'line' => 'border-green-500', 'view' => 'bg-green-500 hover:bg-green-400', 'create' => 'bg-white text-green-600 hover:bg-green-50'],
        'orange' => ['card' => 'bg-orange-600', 'soft' => 'text-orange-100', 'hint' => 'text-orange-200', 'circle' => 'bg-orange-500', 'line' => 'border-orange-500', 'view' => 'bg-orange-500 hover:bg-orange-400', 'create' => 'bg-white text-orange-600 hover:bg-orange-50'],
        'yellow' => ['card' => 'bg-yellow-600', 'soft' => 'text-yellow-100', 'hint' => 'text-yellow-200', 'circle' => 'bg-yellow-500', 'line' => 'border-yellow-500', 'view' => 'bg-yellow-500 hover:bg-yellow-400', 'create' => 'bg-white text-yellow-600 hover:bg-yellow-50'],
        'pink' => ['card' => 'bg-pink-600', 'soft' => 'text-pink-100', 'hint' => 'text-pink-200', 'circle' => 'bg-pink-500', 'line' => 'border-pink-500', 'view' => 'bg-pink-500 hover:bg-pink-400', 'create' => 'bg-white text-pink-600 hover:bg-pink-50'],
        'lime' => ['card' => 'bg-lime-600', 'soft' => 'text-lime-100', 'hint' => 'text-lime-200', 'circle' => 'bg-lime-500', 'line' => 'border-lime-500', 'view' => 'bg-lime-500 hover:bg-lime-400', 'create' => 'bg-white text-lime-600 hover:bg-lime-50'],
        'sky' => ['card' => 'bg-sky-600', 'soft' => 'text-sky-100', 'hint' => 'text-sky-200', 'circle' => 'bg-sky-500', 'line' => 'border-sky-500', 'view' => 'bg-sky-500 hover:bg-sky-400', 'create' => 'bg-white text-sky-600 hover:bg-sky-50'],
        'teal' => ['card' => 'bg-teal-600', 'soft' => 'text-teal-100', 'hint' => 'text-teal-200', 'circle' => 'bg-teal-500', 'line' => 'border-teal-500', 'view' => 'bg-teal-500 hover:bg-teal-400', 'create' => 'bg-white text-teal-600 hover:bg-teal-50'],
        'cyan' => ['card' => 'bg-cyan-600', 'soft' => 'text-cyan-100', 'hint' => 'text-cyan-200', 'circle' => 'bg-cyan-500', 'line' => 'border-cyan-500', 'view' => 'bg-cyan-500 hover:bg-cyan-400', 'create' => 'bg-white text-cyan-600 hover:bg-cyan-50'],
        'fuchsia' => ['card' => 'bg-fuchsia-600', 'soft' => 'text-fuchsia-100', 'hint' => 'text-fuchsia-200', 'circle' => 'bg-fuchsia-500', 'line' => 'border-fuchsia-500', 'view' => 'bg-fuchsia-500 hover:bg-fuchsia-400', 'create' => 'bg-white text-fuchsia-600 hover:bg-fuchsia-50'],
        'slate' => ['card' => 'bg-slate-600', 'soft' => 'text-slate-200', 'hint' => 'text-slate-300', 'circle' => 'bg-slate-500', 'line' => 'border-slate-500', 'view' => 'bg-slate-500 hover:bg-slate-400', 'create' => 'bg-white text-slate-600 hover:bg-slate-50'],
        'red' => ['card' => 'bg-red-600', 'soft' => 'text-red-100', 'hint' => 'text-red-200', 'circle' => 'bg-red-500', 'line' => 'border-red-500', 'view' => 'bg-red-500 hover:bg-red-400', 'create' => 'bg-white text-red-600 hover:bg-red-50'],
        'indigo' => ['card' => 'bg-indigo-600', 'soft' => 'text-indigo-100', 'hint' => 'text-indigo-200', 'circle' => 'bg-indigo-500', 'line' => 'border-indigo-500', 'view' => 'bg-indigo-500 hover:bg-indigo-400', 'create' => 'bg-white text-indigo-600 hover:bg-indigo-50'],
    ];

    $dashboardGroups = [
        [
            'label' => 'Administrar',
            'icon' => 'ri-settings-3-line',
            'items' => [
                ['label' => 'Total Usuarios', 'hint' => 'Usuarios registrados en el sistema', 'stat' => 'users', 'icon' => 'ri-user-line', 'color' => 'blue', 'route' => 'users', 'perm' => 'users'],
                ['label' => 'Total Roles', 'hint' => 'Roles de permisos configurados', 'stat' => 'roles', 'icon' => 'ri-shield-user-line', 'color' => 'purple', 'route' => 'roles', 'perm' => 'roles'],
            ],
        ],
        [
            'label' => 'Contenido',
            'icon' => 'ri-layout-line',
            'items' => [
                ['label' => 'Total Páginas', 'hint' => 'Páginas publicadas y borradores', 'stat' => 'pages', 'icon' => 'ri-pages-line', 'color' => 'green', 'route' => 'pages', 'perm' => 'pages'],
                ['label' => 'Total Archivos', 'hint' => 'Imágenes, videos y documentos subidos', 'stat' => 'media', 'icon' => 'ri-folder-image-line', 'color' => 'orange', 'route' => 'media', 'perm' => 'media', 'create_perm' => 'media.upload', 'create_label' => 'Subir', 'create_icon' => 'ri-upload-2-line'],
                ['label' => 'Total Banners', 'hint' => 'Banners activos e inactivos', 'stat' => 'banners', 'icon' => 'ri-image-2-line', 'color' => 'yellow', 'route' => 'banners', 'perm' => 'banners'],
                ['label' => 'Total Avisos', 'hint' => 'Avisos y notificaciones publicados', 'stat' => 'announcements', 'icon' => 'ri-notification-line', 'color' => 'pink', 'route' => 'announcements', 'perm' => 'announcements'],
                ['label' => 'Total Activos', 'hint' => 'Activos extraordinarios registrados', 'stat' => 'assets', 'icon' => 'ri-building-4-line', 'color' => 'lime', 'route' => 'assets', 'perm' => 'assets'],
                ['label' => 'Total Noticias', 'hint' => 'Noticias publicadas y borradores', 'stat' => 'news', 'icon' => 'ri-newspaper-line', 'color' => 'sky', 'route' => 'news', 'perm' => 'news', 'feature' => 'news'],
            ],
        ],
        [
            'label' => 'Componentes',
            'icon' => 'ri-apps-2-line',
            'items' => [
                ['label' => 'Total Navbars', 'hint' => 'Menús de navegación configurados', 'stat' => 'navbars', 'icon' => 'ri-layout-top-line', 'color' => 'teal', 'route' => 'navbars', 'perm' => 'navbars'],
                ['label' => 'Total Footers', 'hint' => 'Pies de página configurados', 'stat' => 'footers', 'icon' => 'ri-layout-bottom-line', 'color' => 'cyan', 'route' => 'footers', 'perm' => 'footers'],
                ['label' => 'Total Formularios', 'hint' => 'Formularios configurados', 'stat' => 'forms', 'icon' => 'ri-survey-line', 'color' => 'fuchsia', 'route' => 'forms', 'perm' => 'forms'],
                ['label' => 'Total Scripts', 'hint' => 'Scripts y fragmentos de código', 'stat' => 'scripts', 'icon' => 'ri-code-s-slash-line', 'color' => 'slate', 'route' => 'scripts', 'perm' => 'scripts'],
            ],
        ],
        [
            'label' => 'Servicios',
            'icon' => 'ri-map-pin-line',
            'items' => [
                ['label' => 'Total Agencias', 'hint' => 'Ubicaciones registradas', 'stat' => 'agencies', 'icon' => 'ri-building-line', 'color' => 'red', 'route' => 'agencies', 'perm' => 'agencies'],
                ['label' => 'Total Puntos de Pago', 'hint' => 'Puntos de pago registrados', 'stat' => 'payment_points', 'icon' => 'ri-store-line', 'color' => 'indigo', 'route' => 'payment-points', 'perm' => 'payment_points'],
            ],
        ],
    ];

    $dashboardGroups = collect($dashboardGroups)
        ->map(function ($group) use ($gate, $palettes) {
            $group['items'] = collect($group['items'])
                ->filter(fn($item) => (!isset($item['feature']) || config("features.{$item['feature']}")) && $gate->any(["{$item['perm']}.view", "{$item['perm']}.manage"]))
                ->map(function ($item) use ($gate, $palettes) {
                    $item['p'] = $palettes[$item['color']];
                    $item['can_create'] = $gate->any([$item['create_perm'] ?? "{$item['perm']}.create", "{$item['perm']}.manage"]);
                    $item['create_label'] = $item['create_label'] ?? 'Crear';
                    $item['create_icon'] = $item['create_icon'] ?? 'ri-add-line';
                    return $item;
                })
                ->values();
            return $group;
        })
        ->filter(fn($group) => $group['items']->isNotEmpty())
        ->values();

    $roleName = Auth::user()->roles->first()?->display_name;
@endphp

@section('content')
    <div class="card mb-8">
        <div class="flex items-start gap-4">
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <i class="ri-information-line text-2xl text-orange-500"></i>
            </div>
            <div class="flex-1">
                <h3 class="text-xl font-bold text-secondary mb-2">
                    ¡Bienvenido, {{ Auth::user()->name }}!
                </h3>
                @if ($roleName)
                    <p class="text-gray-600 mb-3">
                        Has iniciado sesión con el rol de
                        <strong class="text-orange-500">{{ $roleName }}</strong>
                    </p>
                @endif
                <p class="text-gray-500 text-sm">
                    Utiliza el menú lateral para navegar por las diferentes secciones del CMS o accede rápidamente desde las
                    tarjetas de abajo.
                </p>
            </div>
        </div>
    </div>

    @foreach ($dashboardGroups as $group)
        <div class="mb-8">
            <h4 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <i class="{{ $group['icon'] }} text-base"></i> {{ $group['label'] }}
            </h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                @foreach ($group['items'] as $item)
                    @php $p = $item['p']; @endphp
                    <div class="card {{ $p['card'] }} text-white hover:shadow-xl transition-shadow">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <p class="text-sm {{ $p['soft'] }} mb-1">{{ $item['label'] }}</p>
                                <h3 class="text-4xl font-bold mb-1">{{ $stats[$item['stat']] ?? 0 }}</h3>
                                <p class="text-xs {{ $p['hint'] }}">{{ $item['hint'] }}</p>
                            </div>
                            <div class="w-16 h-16 {{ $p['circle'] }} rounded-full flex items-center justify-center shrink-0">
                                <i class="{{ $item['icon'] }} text-3xl"></i>
                            </div>
                        </div>
                        <div class="flex gap-2 pt-4 border-t {{ $p['line'] }}">
                            <a href="{{ route($item['route'] . '.index') }}"
                                class="flex-1 {{ $p['view'] }} text-white font-medium py-2 px-4 rounded-full transition-all duration-200 inline-flex items-center justify-center text-sm">
                                <i class="ri-list-check mr-2"></i> Ver
                            </a>
                            @if ($item['can_create'])
                                <a href="{{ route($item['route'] . '.create') }}"
                                    class="flex-1 {{ $p['create'] }} font-medium py-2 px-4 rounded-full transition-all duration-200 inline-flex items-center justify-center text-sm">
                                    <i class="{{ $item['create_icon'] }} mr-2"></i> {{ $item['create_label'] }}
                                </a>
                            @endif
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    @endforeach
@endsection