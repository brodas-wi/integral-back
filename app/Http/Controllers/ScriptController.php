<?php

namespace App\Http\Controllers;

use App\Models\Script;
use App\Models\Page;
use App\Http\Requests\StoreScriptRequest;
use App\Http\Requests\UpdateScriptRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ScriptController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $this->authorize('scripts.view');

        $perPage = (int) $request->input('per_page', 10);
        $perPage = in_array($perPage, [10, 20, 30]) ? $perPage : 10;

        $query = Script::with(['creator', 'updater', 'reviewer', 'approver']);

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('scope')) {
            $query->where('scope', $request->scope);
        }

        $scripts = $query->latest()->paginate($perPage)->withQueryString();

        $stats = [
            'total' => Script::count(),
        ];

        return view('scripts.index', compact('scripts', 'stats'));
    }

    public function create()
    {
        $this->authorize('scripts.create');

        $pages = Page::where('is_published', true)->orderBy('title')->get(['id', 'title', 'slug']);

        return view('scripts.create', compact('pages'));
    }

    public function store(StoreScriptRequest $request)
    {
        $this->authorize('scripts.create');

        try {
            $canAutoApprove = Auth::user()->can('scripts.auto_approve') || Auth::user()->can('scripts.manage');
            $submitForReview = $request->boolean('submit_for_review', false);
            if ($canAutoApprove) {
                $status = 'approved';
                $approvedBy = Auth::id();
                $approvedAt = now();
            } elseif ($submitForReview) {
                $status = 'pending_review';
                $approvedBy = null;
                $approvedAt = null;
            } else {
                $status = 'draft';
                $approvedBy = null;
                $approvedAt = null;
            }

            $script = Script::create([
                'name'        => $request->name,
                'description' => $request->description,
                'type'        => $request->type,
                'scope'       => $request->scope,
                'page_slugs'  => $request->scope === 'per_page' ? $request->page_slugs : null,
                'js_content'  => $request->type === 'js' ? $request->js_content : null,
                'css_content' => $request->type === 'css' ? $request->css_content : null,
                'status'      => $status,
                'is_active'   => false,
                'approved_by' => $approvedBy,
                'approved_at' => $approvedAt,
                'created_by'  => Auth::id(),
                'updated_by'  => Auth::id(),
            ]);

            $message = match ($status) {
                'approved'       => 'Script creado y aprobado exitosamente.',
                'pending_review' => 'Script creado y enviado a revisión.',
                default          => 'Script guardado como borrador.',
            };

            return redirect()
                ->route('scripts.show', $script)
                ->with('success', $message);
        } catch (\Exception $e) {
            Log::error('Error creating script: ' . $e->getMessage(), [
                'user_id' => Auth::id(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al crear el script: ' . $e->getMessage());
        }
    }

    public function show(Script $script)
    {
        $this->authorize('scripts.view');

        $script->load(['creator', 'updater', 'reviewer', 'approver']);

        return view('scripts.show', compact('script'));
    }

    public function edit(Script $script)
    {
        $this->authorize('scripts.edit');
        if ($script->isApproved() && $script->is_active) {
            return redirect()
                ->route('scripts.show', $script)
                ->with('error', 'No puedes editar un script activo. Desactívalo primero.');
        }

        $pages = Page::where('is_published', true)->orderBy('title')->get(['id', 'title', 'slug']);

        return view('scripts.edit', compact('script', 'pages'));
    }

    public function update(UpdateScriptRequest $request, Script $script)
    {
        $this->authorize('scripts.edit');
        if ($script->isApproved() && $script->is_active) {
            return back()->with('error', 'No puedes editar un script activo. Desactívalo primero.');
        }

        try {
            $canAutoApprove = Auth::user()->can('scripts.auto_approve') || Auth::user()->can('scripts.manage');
            $submitForReview = $request->boolean('submit_for_review', false);
            if ($canAutoApprove) {
                $status = 'approved';
                $approvedBy = Auth::id();
                $approvedAt = now();
                $reviewedBy = $script->reviewed_by;
                $reviewedAt = $script->reviewed_at;
            } elseif ($submitForReview) {
                $status = 'pending_review';
                $approvedBy = null;
                $approvedAt = null;
                $reviewedBy = null;
                $reviewedAt = null;
            } else {
                $status = 'draft';
                $approvedBy = null;
                $approvedAt = null;
                $reviewedBy = null;
                $reviewedAt = null;
            }

            $script->update([
                'name'        => $request->name,
                'description' => $request->description,
                'type'        => $request->type,
                'scope'       => $request->scope,
                'page_slugs'  => $request->scope === 'per_page' ? $request->page_slugs : null,
                'js_content'  => $request->type === 'js' ? $request->js_content : null,
                'css_content' => $request->type === 'css' ? $request->css_content : null,
                'status'      => $status,
                'is_active'   => $canAutoApprove ? $script->is_active : false,
                'rejection_reason' => null,
                'approved_by' => $approvedBy,
                'approved_at' => $approvedAt,
                'reviewed_by' => $reviewedBy,
                'reviewed_at' => $reviewedAt,
                'updated_by'  => Auth::id(),
            ]);

            $message = match ($status) {
                'approved'       => 'Script actualizado y aprobado exitosamente.',
                'pending_review' => 'Script actualizado y enviado a revisión.',
                default          => 'Script guardado como borrador.',
            };

            return redirect()
                ->route('scripts.show', $script)
                ->with('success', $message);
        } catch (\Exception $e) {
            Log::error('Error updating script: ' . $e->getMessage(), [
                'user_id'   => Auth::id(),
                'script_id' => $script->id,
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al actualizar el script: ' . $e->getMessage());
        }
    }

    public function destroy(Script $script)
    {
        $this->authorize('scripts.delete');

        try {
            $name = $script->name;
            if ($script->is_active) {
                if (request()->expectsJson()) {
                    return response()->json([
                        'success' => false,
                        'message' => 'No puedes eliminar un script activo. Desactívalo primero.',
                    ], 422);
                }
                return back()->with('error', 'No puedes eliminar un script activo. Desactívalo primero.');
            }

            $script->delete();

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => "Script \"{$name}\" eliminado exitosamente.",
                ]);
            }

            return redirect()
                ->route('scripts.index')
                ->with('success', "Script \"{$name}\" eliminado exitosamente.");
        } catch (\Exception $e) {
            Log::error('Error deleting script: ' . $e->getMessage(), [
                'user_id'   => Auth::id(),
                'script_id' => $script->id,
            ]);

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al eliminar el script.',
                ], 500);
            }

            return back()->with('error', 'Error al eliminar el script.');
        }
    }

    public function toggleActive(Script $script)
    {
        $this->authorize('scripts.activate');

        try {
            if (!$script->isApproved()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Solo se pueden activar scripts aprobados.',
                ], 422);
            }

            $script->update([
                'is_active'  => !$script->is_active,
                'updated_by' => Auth::id(),
            ]);

            $message = $script->is_active
                ? 'Script activado exitosamente.'
                : 'Script desactivado exitosamente.';

            return response()->json([
                'success'   => true,
                'message'   => $message,
                'is_active' => $script->is_active,
            ]);
        } catch (\Exception $e) {
            Log::error('Error toggling script active status: ' . $e->getMessage(), [
                'user_id'   => Auth::id(),
                'script_id' => $script->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al cambiar el estado del script.',
            ], 500);
        }
    }

    public function approve(Script $script)
    {
        $this->authorize('scripts.approve');

        try {
            if (!$script->isPendingReview()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Solo se pueden aprobar scripts en estado "Pendiente de revisión".',
                ], 422);
            }

            $script->update([
                'status'      => 'approved',
                'reviewed_by' => Auth::id(),
                'reviewed_at' => now(),
                'approved_by' => Auth::id(),
                'approved_at' => now(),
                'rejection_reason' => null,
                'updated_by'  => Auth::id(),
            ]);

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Script aprobado exitosamente. Ya puede ser activado.',
                    'status'  => 'approved',
                ]);
            }

            return redirect()
                ->route('scripts.show', $script)
                ->with('success', 'Script aprobado exitosamente. Ya puede ser activado.');
        } catch (\Exception $e) {
            Log::error('Error approving script: ' . $e->getMessage(), [
                'user_id'   => Auth::id(),
                'script_id' => $script->id,
            ]);

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al aprobar el script.',
                ], 500);
            }

            return back()->with('error', 'Error al aprobar el script.');
        }
    }

    public function reject(Request $request, Script $script)
    {
        $this->authorize('scripts.approve');

        $request->validate([
            'rejection_reason' => ['required', 'string', 'max:1000'],
        ], [
            'rejection_reason.required' => 'Debes indicar el motivo del rechazo.',
            'rejection_reason.max'      => 'El motivo no puede superar los 1000 caracteres.',
        ]);

        try {
            if (!$script->isPendingReview()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Solo se pueden rechazar scripts en estado "Pendiente de revisión".',
                ], 422);
            }

            $script->update([
                'status'           => 'rejected',
                'is_active'        => false,
                'rejection_reason' => $request->rejection_reason,
                'reviewed_by'      => Auth::id(),
                'reviewed_at'      => now(),
                'approved_by'      => null,
                'approved_at'      => null,
                'updated_by'       => Auth::id(),
            ]);

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Script rechazado. El autor podrá corregirlo y enviarlo nuevamente.',
                    'status'  => 'rejected',
                ]);
            }

            return redirect()
                ->route('scripts.show', $script)
                ->with('success', 'Script rechazado. El autor podrá corregirlo y enviarlo nuevamente.');
        } catch (\Exception $e) {
            Log::error('Error rejecting script: ' . $e->getMessage(), [
                'user_id'   => Auth::id(),
                'script_id' => $script->id,
            ]);

            if (request()->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al rechazar el script.',
                ], 500);
            }

            return back()->with('error', 'Error al rechazar el script.');
        }
    }

    /**
     * Serve approved+active JS script as external file (for public frontend consumption).
     */
    public function serveJs(Script $script)
    {
        if (!$script->isCurrentlyActive() || $script->type !== 'js') {
            abort(404);
        }

        return response($script->js_content ?? '', 200)
            ->header('Content-Type', 'application/javascript')
            ->header('Cache-Control', 'public, max-age=300');
    }

    /**
     * Serve approved+active CSS script as external file (for public frontend consumption).
     */
    public function serveCss(Script $script)
    {
        if (!$script->isCurrentlyActive() || $script->type !== 'css') {
            abort(404);
        }

        return response($script->css_content ?? '', 200)
            ->header('Content-Type', 'text/css')
            ->header('Cache-Control', 'public, max-age=300');
    }

    /**
     * API endpoint: return all active scripts (for public frontend).
     */
    public function apiActive(Request $request)
    {
        $query = Script::active()->with([]);

        if ($request->filled('page_slug')) {
            $query->forPage($request->page_slug);
        }

        if ($request->filled('type')) {
            $query->byType($request->type);
        }

        $scripts = $query->get(['id', 'name', 'type', 'scope', 'page_slugs']);

        return response()->json($scripts);
    }
}
