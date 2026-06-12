<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión</title>
    <link href="{{ Vite::asset('node_modules/remixicon/fonts/remixicon.css') }}" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="min-h-screen flex items-center justify-center bg-secondary">
    <div class="w-full max-w-md">
        <div class="bg-white rounded-2xl shadow-2xl p-8">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-secondary mb-2">CMS Integral</h1>
                <p class="text-gray">Inicia sesión para continuar</p>
            </div>

            <form method="POST" action="{{ route('login') }}">
                @csrf

                <div class="mb-6">
                    <label for="username" class="block text-sm font-medium text-secondary mb-2">
                        Usuario
                    </label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray">
                            <i class="ri-user-line text-xl"></i>
                        </span>
                        <input 
                            id="username" 
                            type="text" 
                            name="username" 
                            value="{{ old('username') }}" 
                            required 
                            autofocus
                            class="input-field pl-12"
                            placeholder="Ingresa tu usuario"
                        >
                    </div>
                    @error('username')
                        <p class="text-red-500 text-sm mt-2">{{ $message }}</p>
                    @enderror
                </div>

                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-secondary mb-2">
                        Contraseña
                    </label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray">
                            <i class="ri-lock-line text-xl"></i>
                        </span>
                        <input 
                            id="password" 
                            type="password" 
                            name="password" 
                            required
                            class="input-field pl-12"
                            placeholder="Ingresa tu contraseña"
                        >
                    </div>
                    @error('password')
                        <p class="text-red-500 text-sm mt-2">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex items-center justify-between mb-6">
                    <label class="flex items-center">
                        <input 
                            type="checkbox" 
                            name="remember" 
                            class="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        >
                        <span class="ml-2 text-sm text-gray">Recordarme</span>
                    </label>
                </div>

                <button type="submit" class="w-full btn-primary text-lg py-3">
                    <i class="ri-login-box-line mr-2"></i>
                    Iniciar Sesión
                </button>
            </form>
        </div>

        <div class="text-center mt-6">
            <p class="text-light text-sm">
                © 2025 INTEGRAL CMS. Todos los derechos reservados.
            </p>
        </div>
    </div>
</body>
</html>