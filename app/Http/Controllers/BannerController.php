<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Media;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    /* List all banners with optional filters */
    public function index(Request $request)
    {
        $query = Banner::with(['creator', 'updater']);

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->status === 'active');
        }

        $banners = $query->orderBy('order')
            ->orderByDesc('created_at')
            ->paginate($request->get('per_page', 10))
            ->withQueryString();

        return view('banners.index', compact('banners'));
    }

    /* Show create form */
    public function create()
    {
        return view('banners.create');
    }

    /* Store a new banner */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'                  => 'required|string|max:255',
            'description'            => 'required|string',
            'media_id'               => 'required|exists:media,id',
            'image_alt'              => 'nullable|string|max:255',
            'category'               => 'nullable|string|max:100',
            'btn_primary_text'       => 'nullable|string|max:100',
            'btn_primary_url'        => 'nullable|string|max:500',
            'btn_primary_style'      => 'nullable|in:fill-blue,outline-blue,fill-orange,outline-orange,fill-white,outline-white',
            'btn_primary_external'   => 'nullable|boolean',
            'btn_secondary_text'     => 'nullable|string|max:100',
            'btn_secondary_url'      => 'nullable|string|max:500',
            'btn_secondary_style'    => 'nullable|in:fill-blue,outline-blue,fill-orange,outline-orange,fill-white,outline-white',
            'btn_secondary_external' => 'nullable|boolean',
            'is_active'              => 'nullable|boolean',
            'order'                  => 'nullable|integer|min:0',
        ]);

        /* Resolve image path from media library */
        $media = Media::findOrFail($validated['media_id']);
        $validated['image_path'] = $media->path;
        unset($validated['media_id']);

        $validated['created_by'] = auth()->id();
        $validated['updated_by'] = auth()->id();
        $validated['is_active']  = $request->boolean('is_active', true);

        Banner::create($validated);

        return response()->json(['success' => true, 'message' => 'Banner creado correctamente.']);
    }

    /* Show banner details */
    public function show(Banner $banner)
    {
        return view('banners.show', compact('banner'));
    }

    /* Show edit form */
    public function edit(Banner $banner)
    {
        return view('banners.edit', compact('banner'));
    }

    /* Update an existing banner */
    public function update(Request $request, Banner $banner)
    {
        $validated = $request->validate([
            'title'                  => 'required|string|max:255',
            'description'            => 'required|string',
            'media_id'               => 'nullable|exists:media,id',
            'image_alt'              => 'nullable|string|max:255',
            'category'               => 'nullable|string|max:100',
            'btn_primary_text'       => 'nullable|string|max:100',
            'btn_primary_url'        => 'nullable|string|max:500',
            'btn_primary_style'      => 'nullable|in:fill-blue,outline-blue,fill-orange,outline-orange,fill-white,outline-white',
            'btn_primary_external'   => 'nullable|boolean',
            'btn_secondary_text'     => 'nullable|string|max:100',
            'btn_secondary_url'      => 'nullable|string|max:500',
            'btn_secondary_style'    => 'nullable|in:fill-blue,outline-blue,fill-orange,outline-orange,fill-white,outline-white',
            'btn_secondary_external' => 'nullable|boolean',
            'is_active'              => 'nullable|boolean',
            'order'                  => 'nullable|integer|min:0',
        ]);

        /* Update image path only if a new media item was selected */
        if (!empty($validated['media_id'])) {
            $media = Media::findOrFail($validated['media_id']);
            $validated['image_path'] = $media->path;
        }
        unset($validated['media_id']);

        $validated['updated_by'] = auth()->id();
        $validated['is_active']  = $request->boolean('is_active', $banner->is_active);

        $banner->update($validated);

        return response()->json(['success' => true, 'message' => 'Banner actualizado correctamente.']);
    }

    /* Delete a banner */
    public function destroy(Banner $banner)
    {
        $banner->update([
            'is_active'  => false,
            'updated_by' => auth()->id(),
        ]);

        $banner->delete();

        return response()->json(['success' => true, 'message' => 'Banner eliminado correctamente.']);
    }

    /* Show trashed banners */
    public function trashed(Request $request)
    {
        $query = Banner::onlyTrashed()->with(['creator', 'updater']);

        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            });
        }

        $banners = $query->orderByDesc('deleted_at')
            ->paginate($request->get('per_page', 10))
            ->withQueryString();

        return view('banners.trashed', compact('banners'));
    }

    /* Restore a soft-deleted banner */
    public function restore(int $id)
    {
        $banner = Banner::onlyTrashed()->findOrFail($id);
        $banner->restore();
        $banner->update(['updated_by' => auth()->id()]);

        return response()->json(['success' => true, 'message' => 'Banner restaurado correctamente.']);
    }

    /* Permanently delete a banner */
    public function forceDelete(int $id)
    {
        $banner = Banner::onlyTrashed()->findOrFail($id);
        $banner->forceDelete();

        return response()->json(['success' => true, 'message' => 'Banner eliminado permanentemente.']);
    }

    /* Toggle active status */
    public function toggleStatus(Banner $banner)
    {
        $banner->update([
            'is_active'  => !$banner->is_active,
            'updated_by' => auth()->id(),
        ]);

        return response()->json([
            'success'   => true,
            'is_active' => $banner->is_active,
            'message'   => $banner->is_active ? 'Banner activado.' : 'Banner desactivado.',
        ]);
    }

    /* Public API endpoint consumed by GrapesJS block */
    public function apiIndex()
    {
        $banners = Banner::with('media')
            ->where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(fn($b) => [
                'id'                     => $b->id,
                'title'                  => $b->title,
                'description'            => $b->description,
                'image_url'              => $b->image_url,
                'image_width'            => $b->media?->width,
                'image_height'           => $b->media?->height,
                'image_alt'              => $b->image_alt,
                'category'               => $b->category,
                'btn_primary_text'       => $b->btn_primary_text,
                'btn_primary_url'        => $b->btn_primary_url,
                'btn_primary_style'      => $b->btn_primary_style,
                'btn_primary_external'   => $b->btn_primary_external,
                'btn_secondary_text'     => $b->btn_secondary_text,
                'btn_secondary_url'      => $b->btn_secondary_url,
                'btn_secondary_style'    => $b->btn_secondary_style,
                'btn_secondary_external' => $b->btn_secondary_external,
            ]);

        $response = response()->json($banners);

        if ($banners->isNotEmpty() && $banners->first()['image_url']) {
            $response->header('Link', '<' . $banners->first()['image_url'] . '>; rel=preload; as=image');
        }

        return $response;
    }
}
