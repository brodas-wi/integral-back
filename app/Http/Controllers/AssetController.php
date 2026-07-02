<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use App\Models\AssetCategory;
use App\Http\Requests\StoreAssetRequest;
use App\Http\Requests\UpdateAssetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AssetController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $this->authorize('assets.view');

        $perPage = (int) $request->input('per_page', 10);
        $perPage = in_array($perPage, [10, 20, 30]) ? $perPage : 10;

        $query = Asset::with(['category', 'creator']);

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('category')) {
            $query->where('asset_category_id', $request->category);
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->status === 'active');
        }

        $assets = $query->latest()->paginate($perPage)->withQueryString();

        $stats = [
            'total'    => Asset::count(),
            'active'   => Asset::where('is_active', true)->count(),
            'inactive' => Asset::where('is_active', false)->count(),
        ];

        $categories = AssetCategory::orderBy('name')->get();

        return view('assets.index', compact('assets', 'stats', 'categories'));
    }

    public function trashed()
    {
        $this->authorize('assets.delete');

        $assets = Asset::onlyTrashed()->with('category')->latest()->paginate(10);

        return view('assets.trashed', compact('assets'));
    }

    public function create()
    {
        $this->authorize('assets.create');

        $categories = AssetCategory::orderBy('name')->pluck('name');

        return view('assets.create', compact('categories'));
    }

    public function store(StoreAssetRequest $request)
    {
        $this->authorize('assets.create');

        try {
            $category = AssetCategory::findOrCreateByName($request->category_name);

            Asset::create([
                'asset_category_id' => $category->id,
                'name'              => $request->name,
                'short_description' => $request->short_description,
                'image_url'         => $request->image_url,
                'link_url'          => $request->link_url,
                'link_is_external'  => $request->boolean('link_is_external'),
                'is_active'         => $request->boolean('is_active', true),
                'created_by'        => Auth::id(),
                'updated_by'        => Auth::id(),
            ]);

            return redirect()->route('assets.index')->with('success', 'Activo creado exitosamente.');
        } catch (\Exception $e) {
            Log::error('Error creating asset: ' . $e->getMessage());

            return back()->withInput()->with('error', 'Error al crear el activo: ' . $e->getMessage());
        }
    }

    public function edit(Asset $asset)
    {
        $this->authorize('assets.edit');

        $categories = AssetCategory::orderBy('name')->pluck('name');

        return view('assets.edit', compact('asset', 'categories'));
    }

    public function update(UpdateAssetRequest $request, Asset $asset)
    {
        $this->authorize('assets.edit');

        try {
            $category = AssetCategory::findOrCreateByName($request->category_name);

            $asset->update([
                'asset_category_id' => $category->id,
                'name'              => $request->name,
                'short_description' => $request->short_description,
                'image_url'         => $request->image_url,
                'link_url'          => $request->link_url,
                'link_is_external'  => $request->boolean('link_is_external'),
                'is_active'         => $request->boolean('is_active', $asset->is_active),
                'updated_by'        => Auth::id(),
            ]);

            return redirect()->route('assets.index')->with('success', 'Activo actualizado exitosamente.');
        } catch (\Exception $e) {
            Log::error('Error updating asset: ' . $e->getMessage(), ['asset_id' => $asset->id]);

            return back()->withInput()->with('error', 'Error al actualizar el activo: ' . $e->getMessage());
        }
    }

    public function toggleStatus(Asset $asset)
    {
        $this->authorize('assets.toggle');

        $asset->update([
            'is_active'  => !$asset->is_active,
            'updated_by' => Auth::id(),
        ]);

        $message = $asset->is_active ? 'Activo activado exitosamente.' : 'Activo desactivado exitosamente.';

        return response()->json([
            'success'   => true,
            'message'   => $message,
            'is_active' => $asset->is_active,
        ]);
    }

    public function destroy(Asset $asset)
    {
        $this->authorize('assets.delete');

        try {
            $name = $asset->name;
            $asset->delete();

            if (request()->expectsJson()) {
                return response()->json(['success' => true, 'message' => "'{$name}' eliminado exitosamente."]);
            }

            return redirect()->route('assets.index')->with('success', "'{$name}' eliminado exitosamente.");
        } catch (\Exception $e) {
            Log::error('Error deleting asset: ' . $e->getMessage(), ['asset_id' => $asset->id]);

            if (request()->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Error al eliminar el activo.'], 500);
            }

            return back()->with('error', 'Error al eliminar el activo.');
        }
    }

    public function restore($id)
    {
        $this->authorize('assets.delete');

        $asset = Asset::onlyTrashed()->findOrFail($id);
        $asset->restore();

        return back()->with('success', "'{$asset->name}' restaurado exitosamente.");
    }

    public function forceDelete($id)
    {
        $this->authorize('assets.delete');

        $asset = Asset::onlyTrashed()->findOrFail($id);
        $name = $asset->name;
        $asset->forceDelete();

        return back()->with('success', "'{$name}' eliminado permanentemente.");
    }

    public function apiActive(Request $request)
    {
        $query = Asset::active()->with('category')->latest();

        if ($request->filled('category')) {
            $query->category($request->category);
        }

        $assets = $query->get();

        return response()->json($assets->map(function ($asset) {
            return [
                'id'                => $asset->id,
                'name'              => $asset->name,
                'short_description' => $asset->short_description,
                'image_url'         => $asset->image_url,
                'link_url'          => $asset->link_url,
                'link_is_external'  => $asset->link_is_external,
                'category'          => $asset->category->name,
                'category_slug'     => $asset->category->slug,
            ];
        }));
    }

    public function apiCategorySuggestions(Request $request)
    {
        $q = $request->query('q', '');

        $categories = AssetCategory::where('name', 'like', "%{$q}%")
            ->orderBy('name')
            ->limit(8)
            ->get(['id', 'name']);

        return response()->json($categories);
    }
}
