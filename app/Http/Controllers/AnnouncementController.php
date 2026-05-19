<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Requests\UpdateAnnouncementRequest;
use App\Models\Announcement;
use App\Models\Page;
use App\Services\AnnouncementService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;

class AnnouncementController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        protected AnnouncementService $announcementService
    ) {}

    /**
     * Display a listing of announcements
     */
    public function index(Request $request): View
    {
        $filters = $request->only(['search', 'status', 'display_type']);

        $announcements = $this->announcementService
            ->buildFilteredQuery($filters)
            ->paginate(20)
            ->withQueryString();

        $stats = $this->announcementService->getStatistics();

        return view('announcements.index', compact('announcements', 'stats'));
    }

    /**
     * Show the form for creating a new announcement
     */
    public function create(): View
    {
        $pages = Page::where('is_published', true)
            ->orderBy('title')
            ->get(['id', 'title', 'slug']);

        return view('announcements.create', compact('pages'));
    }

    /**
     * Store a newly created announcement
     */
    public function store(StoreAnnouncementRequest $request): RedirectResponse
    {
        try {
            $announcement = $this->announcementService->create($request->validated());

            return redirect()
                ->route('announcements.index')
                ->with('success', 'Aviso creado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error creating announcement', [
                'error' => $e->getMessage(),
                'data' => $request->validated(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al crear el aviso: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified announcement
     */
    public function show(Announcement $announcement): View
    {
        $announcement->load(['media', 'creator', 'updater']);

        return view('announcements.show', compact('announcement'));
    }

    /**
     * Show the form for editing the specified announcement
     */
    public function edit(Announcement $announcement): View
    {
        $announcement->load('media');

        $pages = Page::where('is_published', true)
            ->orderBy('title')
            ->get(['id', 'title', 'slug']);

        return view('announcements.edit', compact('announcement', 'pages'));
    }

    /**
     * Update the specified announcement
     */
    public function update(UpdateAnnouncementRequest $request, Announcement $announcement): RedirectResponse
    {
        try {
            $this->announcementService->update($announcement, $request->validated());

            return redirect()
                ->route('announcements.index')
                ->with('success', 'Aviso actualizado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error updating announcement', [
                'error' => $e->getMessage(),
                'announcement_id' => $announcement->id,
                'data' => $request->validated(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al actualizar el aviso: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified announcement
     */
    public function destroy(Announcement $announcement): JsonResponse|RedirectResponse
    {
        $this->authorize('announcements.delete', 'announcements.manage');

        try {
            $title = $announcement->title;
            $this->announcementService->delete($announcement);

            if ($this->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => "Aviso '{$title}' eliminado exitosamente",
                ]);
            }

            return redirect()
                ->route('announcements.index')
                ->with('success', "Aviso '{$title}' eliminado exitosamente");
        } catch (\Exception $e) {
            Log::error('Error deleting announcement', [
                'error' => $e->getMessage(),
                'announcement_id' => $announcement->id,
            ]);

            if ($this->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al eliminar el aviso',
                ], 500);
            }

            return redirect()
                ->route('announcements.index')
                ->with('error', 'Error al eliminar el aviso');
        }
    }

    /**
     * Toggle announcement active status
     */
    public function toggleStatus(Announcement $announcement): JsonResponse
    {
        try {
            $announcement->update([
                'is_active' => !$announcement->is_active,
                'updated_by' => auth()->id(),
            ]);

            $status = $announcement->is_active ? 'activado' : 'desactivado';

            return response()->json([
                'success' => true,
                'message' => "Aviso {$status} exitosamente",
                'is_active' => $announcement->is_active,
            ]);
        } catch (\Exception $e) {
            Log::error('Error toggling announcement status', [
                'error' => $e->getMessage(),
                'announcement_id' => $announcement->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al cambiar el estado',
            ], 500);
        }
    }

    /**
     * API endpoint to get announcement for a specific page
     */
    public function getForPage(Request $request): JsonResponse
    {
        $pageSlug = $request->input('page', 'home');

        $announcements = $this->announcementService->getAnnouncementsForPage($pageSlug);

        if ($announcements->isEmpty()) {
            return response()->json([
                'success' => false,
                'announcements' => [],
            ]);
        }

        return response()->json([
            'success' => true,
            'announcements' => $announcements->map(function ($announcement) {
                return [
                    'id' => $announcement->id,
                    'title' => $announcement->title,
                    'description' => $announcement->description,
                    'image_url' => $announcement->media?->url,
                    'image_alt' => $announcement->media?->alt ?? $announcement->title,
                    'image_width' => $announcement->media?->width,
                    'image_height' => $announcement->media?->height,
                    'cta_text' => $announcement->cta_text,
                    'cta_url' => $announcement->cta_url,
                    'cta_new_tab' => $announcement->cta_new_tab,
                    'display_mode' => $announcement->display_mode,
                ];
            })->values()->all(),
        ]);
    }

    /**
     * Check if request expects JSON
     */
    protected function expectsJson(): bool
    {
        return request()->expectsJson() || request()->ajax();
    }
}
