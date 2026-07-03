<?php

namespace App\Http\Controllers;

use App\Models\ExtraordinaryAsset;
use App\Models\ExtraordinaryAssetCategory;
use App\Http\Requests\StoreExtraordinaryAssetRequest;
use App\Http\Requests\UpdateExtraordinaryAssetRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ExtraordinaryAssetController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $this->authorize('assets.view');

        $perPage = (int) $request->input('per_page', 10);
        $perPage = in_array($perPage, [10, 20, 30]) ? $perPage : 10;

        $query = ExtraordinaryAsset::with(['category', 'creator']);

        if ($request->filled('search')) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->filled('category')) {
            $query->where('extraordinary_asset_category_id', $request->category);
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->status === 'active');
        }

        $assets = $query->latest()->paginate($perPage)->withQueryString();

        $stats = [
            'total'    => ExtraordinaryAsset::count(),
            'active'   => ExtraordinaryAsset::where('is_active', true)->count(),
            'inactive' => ExtraordinaryAsset::where('is_active', false)->count(),
        ];

        $categories = ExtraordinaryAssetCategory::orderBy('name')->get();

        return view('assets.index', compact('assets', 'stats', 'categories'));
    }

    public function trashed()
    {
        $this->authorize('assets.delete');

        $assets = ExtraordinaryAsset::onlyTrashed()->with('category')->latest()->paginate(10);

        return view('assets.trashed', compact('assets'));
    }

    public function create()
    {
        $this->authorize('assets.create');

        $categories = ExtraordinaryAssetCategory::orderBy('name')->pluck('name');

        return view('assets.create', compact('categories'));
    }

    public function store(StoreExtraordinaryAssetRequest $request)
    {
        $this->authorize('assets.create');

        try {
            $category = ExtraordinaryAssetCategory::findOrCreateByName($request->category_name);

            ExtraordinaryAsset::create([
                'extraordinary_asset_category_id' => $category->id,
                'name'              => $request->name,
                'short_description' => $request->short_description,
                'image_url'         => $request->image_url,
                'link_url'          => $request->link_url,
                'link_is_external'  => $request->boolean('link_is_external'),
                'is_active'         => $request->boolean('is_active', true),
                'created_by'        => Auth::id(),
                'updated_by'        => Auth::id(),
            ]);

            return redirect()->route('assets.index')->with('success', 'Activo extraordinario creado exitosamente.');
        } catch (\Exception $e) {
            Log::error('Error creating extraordinary asset: ' . $e->getMessage());

            return back()->withInput()->with('error', 'Error al crear el activo extraordinario: ' . $e->getMessage());
        }
    }

    public function edit(ExtraordinaryAsset $asset)
    {
        $this->authorize('assets.edit');

        $categories = ExtraordinaryAssetCategory::orderBy('name')->pluck('name');

        return view('assets.edit', compact('asset', 'categories'));
    }

    public function update(UpdateExtraordinaryAssetRequest $request, ExtraordinaryAsset $asset)
    {
        $this->authorize('assets.edit');

        try {
            $category = ExtraordinaryAssetCategory::findOrCreateByName($request->category_name);

            $asset->update([
                'extraordinary_asset_category_id' => $category->id,
                'name'              => $request->name,
                'short_description' => $request->short_description,
                'image_url'         => $request->image_url,
                'link_url'          => $request->link_url,
                'link_is_external'  => $request->boolean('link_is_external'),
                'is_active'         => $request->boolean('is_active', $asset->is_active),
                'updated_by'        => Auth::id(),
            ]);

            return redirect()->route('assets.index')->with('success', 'Activo extraordinario actualizado exitosamente.');
        } catch (\Exception $e) {
            Log::error('Error updating extraordinary asset: ' . $e->getMessage(), ['asset_id' => $asset->id]);

            return back()->withInput()->with('error', 'Error al actualizar el activo extraordinario: ' . $e->getMessage());
        }
    }

    public function toggleStatus(ExtraordinaryAsset $asset)
    {
        $this->authorize('assets.toggle');

        $asset->update([
            'is_active'  => !$asset->is_active,
            'updated_by' => Auth::id(),
        ]);

        $message = $asset->is_active ? 'Activo extraordinario activado exitosamente.' : 'Activo extraordinario desactivado exitosamente.';

        return response()->json([
            'success'   => true,
            'message'   => $message,
            'is_active' => $asset->is_active,
        ]);
    }

    public function destroy(ExtraordinaryAsset $asset)
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
            Log::error('Error deleting extraordinary asset: ' . $e->getMessage(), ['asset_id' => $asset->id]);

            if (request()->expectsJson()) {
                return response()->json(['success' => false, 'message' => 'Error al eliminar el activo extraordinario.'], 500);
            }

            return back()->with('error', 'Error al eliminar el activo extraordinario.');
        }
    }

    public function restore($id)
    {
        $this->authorize('assets.delete');

        $asset = ExtraordinaryAsset::onlyTrashed()->findOrFail($id);
        $asset->restore();

        return back()->with('success', "'{$asset->name}' restaurado exitosamente.");
    }

    public function forceDelete($id)
    {
        $this->authorize('assets.delete');

        $asset = ExtraordinaryAsset::onlyTrashed()->findOrFail($id);
        $name = $asset->name;
        $asset->forceDelete();

        return back()->with('success', "'{$name}' eliminado permanentemente.");
    }

    public function apiActive(Request $request)
    {
        $query = ExtraordinaryAsset::active()->with('category')->latest();

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

    public function apiCategoryList()
    {
        $categories = ExtraordinaryAssetCategory::orderBy('name')->get(['id', 'name', 'slug']);

        return response()->json($categories);
    }

    public function apiCategorySuggestions(Request $request)
    {
        $q = $request->query('q', '');

        $categories = ExtraordinaryAssetCategory::where('name', 'like', "%{$q}%")
            ->orderBy('name')
            ->limit(8)
            ->get(['id', 'name']);

        return response()->json($categories);
    }
}
