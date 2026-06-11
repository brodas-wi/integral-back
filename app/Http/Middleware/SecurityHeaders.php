<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    private array $defaultCsp = [
        "default-src"               => ["'self'"],
        "script-src"                => ["'self'", "'unsafe-inline'"],
        "style-src"                 => ["'self'"],
        "img-src"                   => ["'self'", "data:", "blob:", "https:"],
        "font-src"                  => ["'self'", "data:"],
        "connect-src"               => ["'self'"],
        "media-src"                 => ["'self'"],
        "object-src"                => ["'none'"],
        "frame-src"                 => ["'self'"],
        "frame-ancestors"           => ["'self'"],
        "base-uri"                  => ["'self'"],
        "form-action"               => ["'self'"],
        "worker-src"                => ["'self'", "blob:"],
        "manifest-src"              => ["'self'"],
        "upgrade-insecure-requests" => [],
    ];

    private array $editorCsp = [
        "default-src"               => ["'self'"],
        "script-src"                => ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://unpkg.com"],
        "style-src"                 => ["'self'", "'unsafe-inline'", "https://unpkg.com", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
        "img-src"                   => ["'self'", "data:", "blob:", "https:"],
        "font-src"                  => ["'self'", "data:", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
        "connect-src"               => ["'self'", "https://app.grapesjs.com"],
        "media-src"                 => ["'self'"],
        "object-src"                => ["'none'"],
        "frame-src"                 => ["'self'"],
        "frame-ancestors"           => ["'self'"],
        "base-uri"                  => ["'self'"],
        "form-action"               => ["'self'"],
        "worker-src"                => ["'self'", "blob:"],
        "manifest-src"              => ["'self'"],
        "upgrade-insecure-requests" => [],
    ];

    private array $scriptsCsp = [
        "default-src"               => ["'self'"],
        "script-src"                => ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        "style-src"                 => ["'self'", "'unsafe-inline'"],
        "img-src"                   => ["'self'", "data:", "blob:", "https:"],
        "font-src"                  => ["'self'", "data:"],
        "connect-src"               => ["'self'"],
        "media-src"                 => ["'self'"],
        "object-src"                => ["'none'"],
        "frame-src"                 => ["'self'", "blob:"],
        "frame-ancestors"           => ["'self'"],
        "base-uri"                  => ["'self'"],
        "form-action"               => ["'self'"],
        "worker-src"                => ["'self'", "blob:"],
        "manifest-src"              => ["'self'"],
        "upgrade-insecure-requests" => [],
    ];

    private array $editorRouteNames = [
        'pages.create',
        'pages.edit',
        'navbars.create',
        'navbars.edit',
        'navbars.preview',
        'footers.create',
        'footers.edit',
        'footers.preview',
    ];

    private array $scriptsRouteNames = [
        'scripts.create',
        'scripts.edit',
        'scripts.show',
    ];

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $assetUrl = config('app.asset_url', config('app.url'));
        $this->defaultCsp['frame-src'][] = $assetUrl;
        $this->editorCsp['frame-src'][] = $assetUrl;
        $this->scriptsCsp['frame-src'][] = $assetUrl;

        $viteSources = $this->getViteDevSources();

        if (!empty($viteSources)) {
            foreach (['script-src', 'connect-src', 'font-src', 'img-src'] as $directive) {
                $this->defaultCsp[$directive] = array_merge(
                    $this->defaultCsp[$directive] ?? [],
                    $viteSources
                );
                $this->editorCsp[$directive] = array_merge(
                    $this->editorCsp[$directive] ?? [],
                    $viteSources
                );
                $this->scriptsCsp[$directive] = array_merge(
                    $this->scriptsCsp[$directive] ?? [],
                    $viteSources
                );
            }

            $viteStyleSources = array_merge($viteSources, ["'unsafe-inline'"]);
            $this->defaultCsp['style-src'] = array_merge(
                $this->defaultCsp['style-src'] ?? [],
                $viteStyleSources
            );
            $this->editorCsp['style-src'] = array_merge(
                $this->editorCsp['style-src'] ?? [],
                $viteStyleSources
            );
            $this->scriptsCsp['style-src'] = array_merge(
                $this->scriptsCsp['style-src'] ?? [],
                $viteStyleSources
            );
        }

        if ($this->isScriptsEditorRoute($request)) {
            $csp = $this->buildCsp($this->scriptsCsp);
        } elseif ($this->isEditorRoute($request)) {
            $csp = $this->buildCsp($this->editorCsp);
        } else {
            $csp = $this->buildCsp($this->defaultCsp);
        }

        $response->headers->set('Content-Security-Policy', $csp);
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');
        $response->headers->set('X-XSS-Protection', '1; mode=block');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self), payment=()');
        $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        $response->headers->remove('X-Powered-By');
        $response->headers->remove('Server');

        return $response;
    }

    private function isEditorRoute(Request $request): bool
    {
        foreach ($this->editorRouteNames as $routeName) {
            if ($request->routeIs($routeName)) {
                return true;
            }
        }
        return false;
    }

    private function isScriptsEditorRoute(Request $request): bool
    {
        foreach ($this->scriptsRouteNames as $routeName) {
            if ($request->routeIs($routeName)) {
                return true;
            }
        }
        return false;
    }

    private function getViteDevSources(): array
    {
        if (!app()->environment('local')) {
            return [];
        }

        $port = config('vite.dev_server_port', 5173);

        return [
            "http://127.0.0.1:{$port}",
            "ws://127.0.0.1:{$port}",
        ];
    }

    private function buildCsp(array $directives): string
    {
        $parts = [];

        foreach ($directives as $directive => $sources) {
            $parts[] = empty($sources)
                ? $directive
                : $directive . ' ' . implode(' ', $sources);
        }

        return implode('; ', $parts);
    }
}
