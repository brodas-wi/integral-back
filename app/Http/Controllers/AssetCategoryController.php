<?php

namespace App\Http\Controllers;

use App\Models\AssetCategory;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AssetCategoryController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('assets.manage');

        $categories = AssetCategory::withCount('assets')->orderBy('name')->paginate(15);

        return view('assets.categories', compact('categories'));
    }

    public function update(Request $request, AssetCategory $assetCategory)
    {
        $this->authorize('assets.manage');

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $slug = AssetCategory::normalizeSlug($request->name);

        $exists = AssetCategory::where('slug', $slug)->where('id', '!=', $assetCategory->id)->exists();
        if ($exists) {
            return back()->with('error', 'Ya existe una categoría con ese nombre.');
        }

        $assetCategory->update(['name' => $request->name, 'slug' => $slug]);

        return back()->with('success', 'Categoría actualizada exitosamente.');
    }

    public function destroy(AssetCategory $assetCategory)
    {
        $this->authorize('assets.manage');

        if ($assetCategory->assets()->withTrashed()->exists()) {
            return back()->with('error', 'No puedes eliminar esta categoría porque tiene activos asociados. Reasigna o elimina esos activos primero.');
        }

        $assetCategory->delete();

        return back()->with('success', 'Categoría eliminada exitosamente.');
    }
}
