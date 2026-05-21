<?php

namespace App\Http\Controllers;

use App\Models\Footer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class FooterController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $footers = Footer::with(['creator', 'editor'])->latest()->get();
        return view('footers.index', compact('footers'));
    }

    public function create()
    {
        return view('layouts.footer-editor');
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);

        try {
            $footer = Footer::create([
                'name'            => $request->name,
                'html_content'    => $this->sanitizeContent($request->html_content),
                'css_content'     => $this->sanitizeContent($request->css_content),
                'js_content'      => $this->sanitizeContent($request->js_content),
                'components_json' => $request->components_json,
                'styles_json'     => $request->styles_json,
                'is_active'       => $request->boolean('is_active', false),
                'created_by'      => Auth::id(),
                'updated_by'      => Auth::id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Footer creado exitosamente.',
                'footer'  => ['id' => $footer->id, 'name' => $footer->name],
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating footer: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 422);
        }
    }

    public function edit(Footer $footer)
    {
        return view('layouts.footer-editor', compact('footer'));
    }

    public function update(Request $request, Footer $footer)
    {
        try {
            $data = [
                'html_content'    => $this->sanitizeContent($request->html_content),
                'css_content'     => $this->sanitizeContent($request->css_content),
                'js_content'      => $this->sanitizeContent($request->js_content),
                'components_json' => $request->components_json,
                'styles_json'     => $request->styles_json,
                'is_active'       => $request->boolean('is_active', $footer->is_active),
                'updated_by'      => Auth::id(),
            ];

            if ($request->filled('name')) {
                $data['name'] = $request->name;
            }

            $footer->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Footer actualizado exitosamente.',
                'footer'  => ['id' => $footer->id, 'name' => $footer->name],
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating footer: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 422);
        }
    }

    public function destroy(Footer $footer)
    {
        try {
            $footer->delete();
            return response()->json(['success' => true, 'message' => 'Footer eliminado.']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function load(Footer $footer)
    {
        return response()->json([
            'html'            => $footer->html_content    ?? '',
            'css'             => $footer->css_content     ?? '',
            'js'              => $footer->js_content      ?? '',
            'components_json' => $footer->components_json ?? null,
            'styles_json'     => $footer->styles_json     ?? null,
        ]);
    }

    public function toggleActive(Footer $footer)
    {
        $footer->update([
            'is_active'  => !$footer->is_active,
            'updated_by' => Auth::id(),
        ]);

        return response()->json([
            'success'   => true,
            'is_active' => $footer->is_active,
            'message'   => $footer->is_active ? 'Footer activado.' : 'Footer desactivado.',
        ]);
    }

    public function preview(Footer $footer)
    {
        return view('footers.preview', compact('footer'));
    }

    public function apiActive()
    {
        $footer = Footer::active()->latest()->first();
        if (!$footer) return response()->json(null);

        return response()->json([
            'html' => $footer->html_content ?? '',
            'css'  => $footer->css_content  ?? '',
            'js'   => $footer->js_content   ?? '',
        ]);
    }

    private function sanitizeContent(?string $content): ?string
    {
        if (empty($content)) return $content;

        $appUrl     = rtrim(config('app.url'), '/');
        $storageUrl = rtrim(config('app.storage_url', $appUrl . '/storage'), '/');

        $content = str_replace($storageUrl . '/', '/storage/', $content);

        $host = parse_url($appUrl, PHP_URL_HOST);
        if ($host) {
            $content = preg_replace(
                '/https?:\/\/' . preg_quote($host, '/') . '\/storage\//i',
                '/storage/',
                $content
            );
        }

        return $content;
    }
}
