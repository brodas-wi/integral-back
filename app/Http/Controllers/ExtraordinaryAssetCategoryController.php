<?php

namespace App\Http\Controllers;

use App\Models\ExtraordinaryAssetCategory;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ExtraordinaryAssetCategoryController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('assets.manage');

        $categories = ExtraordinaryAssetCategory::withCount('extraordinaryAssets')->orderBy('name')->paginate(15);

        return view('assets.categories', compact('categories'));
    }

    public function update(Request $request, ExtraordinaryAssetCategory $assetCategory)
    {
        $this->authorize('assets.manage');

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $slug = ExtraordinaryAssetCategory::normalizeSlug($request->name);

        $exists = ExtraordinaryAssetCategory::where('slug', $slug)->where('id', '!=', $assetCategory->id)->exists();
        if ($exists) {
            return back()->with('error', 'Ya existe una categoría con ese nombre.');
        }

        $assetCategory->update(['name' => $request->name, 'slug' => $slug]);

        return back()->with('success', 'Categoría actualizada exitosamente.');
    }

    public function destroy(ExtraordinaryAssetCategory $assetCategory)
    {
        $this->authorize('assets.manage');

        if ($assetCategory->extraordinaryAssets()->withTrashed()->exists()) {
            return back()->with('error', 'No puedes eliminar esta categoría porque tiene activos extraordinarios asociados. Reasigna o elimina esos activos primero.');
        }

        $assetCategory->delete();

        return back()->with('success', 'Categoría eliminada exitosamente.');
    }
}
