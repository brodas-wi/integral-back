<?php

namespace App\Http\Controllers;

use App\Models\Navbar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class NavbarController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('navbars.view');

        $navbars = Navbar::with(['creator', 'editor', 'pages'])->latest()->get();
        return view('navbars.index', compact('navbars'));
    }

    public function create()
    {
        $this->authorize('navbars.create');
        return view('layouts.navbar-editor');
    }

    public function store(Request $request)
    {
        $this->authorize('navbars.create');

        $request->validate(['name' => 'required|string|max:255']);

        try {
            $navbar = Navbar::create([
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
                'message' => 'Navbar creado exitosamente.',
                'navbar'  => ['id' => $navbar->id, 'name' => $navbar->name],
            ]);
        } catch (\Exception $e) {
            Log::error('Error creating navbar: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 422);
        }
    }

    public function edit(Navbar $navbar)
    {
        $this->authorize('navbars.edit');
        return view('layouts.navbar-editor', compact('navbar'));
    }

    public function update(Request $request, Navbar $navbar)
    {
        $this->authorize('navbars.edit');
        try {
            $data = [
                'html_content'    => $this->sanitizeContent($request->html_content),
                'css_content'     => $this->sanitizeContent($request->css_content),
                'js_content'      => $this->sanitizeContent($request->js_content),
                'components_json' => $request->components_json,
                'styles_json'     => $request->styles_json,
                'is_active'       => $request->boolean('is_active', $navbar->is_active),
                'updated_by'      => Auth::id(),
            ];

            if ($request->filled('name')) {
                $data['name'] = $request->name;
            }

            $navbar->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Navbar actualizado exitosamente.',
                'navbar'  => ['id' => $navbar->id, 'name' => $navbar->name],
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating navbar: ' . $e->getMessage());
            return response()->json(['success' => false, 'message' => $e->getMessage()], 422);
        }
    }

    public function destroy(Navbar $navbar)
    {
        $this->authorize('navbars.delete');
        try {
            if ($navbar->pages()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'No se puede eliminar: este navbar está siendo usado por ' . $navbar->pages()->count() . ' página(s).',
                ], 422);
            }

            $navbar->update(['is_active' => false, 'updated_by' => Auth::id()]);
            $navbar->delete();

            return response()->json(['success' => true, 'message' => 'Navbar movido a la papelera.']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function trashed()
    {
        $this->authorize('navbars.restore');
        $navbars = Navbar::onlyTrashed()->with(['creator'])->latest('deleted_at')->get();
        return view('navbars.trashed', compact('navbars'));
    }

    public function restore(int $id)
    {
        $this->authorize('navbars.restore');
        try {
            $navbar = Navbar::onlyTrashed()->findOrFail($id);
            $navbar->restore();
            return response()->json(['success' => true, 'message' => 'Navbar restaurado correctamente.']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function forceDelete(int $id)
    {
        $this->authorize('navbars.delete');
        try {
            $navbar = Navbar::onlyTrashed()->findOrFail($id);
            $navbar->forceDelete();
            return response()->json(['success' => true, 'message' => 'Navbar eliminado permanentemente.']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function load(Navbar $navbar)
    {
        $this->authorize('navbars.edit');

        return response()->json([
            'html'            => $navbar->html_content    ?? '',
            'css'             => $navbar->css_content     ?? '',
            'js'              => $navbar->js_content      ?? '',
            'components_json' => $navbar->components_json ?? null,
            'styles_json'     => $navbar->styles_json     ?? null,
        ]);
    }

    public function toggleActive(Navbar $navbar)
    {
        $this->authorize('navbars.toggle');

        if ($navbar->is_active && $navbar->pages()->count() > 0) {
            return response()->json([
                'success' => false,
                'message' => 'No se puede desactivar: este navbar está siendo usado por ' . $navbar->pages()->count() . ' página(s).',
            ], 422);
        }

        $navbar->update([
            'is_active'  => !$navbar->is_active,
            'updated_by' => Auth::id(),
        ]);

        return response()->json([
            'success'   => true,
            'is_active' => $navbar->is_active,
            'message'   => $navbar->is_active ? 'Navbar activado.' : 'Navbar desactivado.',
        ]);
    }

    public function preview(Navbar $navbar)
    {
        $this->authorize('navbars.view');
        return view('navbars.preview', compact('navbar'));
    }

    public function apiActive()
    {
        $navbar = Navbar::active()->latest()->first();
        if (!$navbar) return response()->json(null);

        return response()->json([
            'html' => $navbar->html_content ?? '',
            'css'  => $navbar->css_content  ?? '',
            'js'   => $navbar->js_content   ?? '',
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
