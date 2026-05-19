<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        protected UserService $userService
    ) {}

    /**
     * Display a listing of users
     */
    public function index(Request $request): View
    {
        $this->authorize('users.view');

        $filters = $request->only(['search', 'role', 'status']);

        $users = $this->userService
            ->buildFilteredQuery($filters)
            ->paginate(10)
            ->withQueryString();

        return view('users.index', [
            'users' => $users,
            'roles' => Role::all(),
            'stats' => $this->userService->getStatistics(),
        ]);
    }

    /**
     * Show the form for creating a new user
     */
    public function create(): View
    {
        $this->authorize('users.create');

        return view('users.create', [
            'roles' => Role::all(),
        ]);
    }

    /**
     * Store a newly created user
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        try {
            $this->userService->create($request->validated());

            return redirect()
                ->route('users.index')
                ->with('success', 'Usuario creado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error creating user', [
                'error' => $e->getMessage(),
                'data' => $request->validated(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al crear el usuario: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified user
     */
    public function show(User $user): View
    {
        $this->authorize('users.view');

        $user->load(['roles', 'uploadedMedia', 'agencies']);

        return view('users.show', compact('user'));
    }

    /**
     * Show the form for editing the specified user
     */
    public function edit(User $user): View
    {
        $this->authorize('users.edit');

        if (!$user->isEditableBy(auth()->user())) {
            abort(403, 'Solo el administrador root puede editar su propia cuenta');
        }

        return view('users.edit', [
            'user' => $user,
            'roles' => Role::all(),
        ]);
    }

    /**
     * Update the specified user
     */
    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        try {
            $this->userService->update($user, $request->validated());

            return redirect()
                ->route('users.index')
                ->with('success', 'Usuario actualizado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error updating user', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
                'data' => $request->validated(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al actualizar el usuario: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified user
     */
    public function destroy(User $user): RedirectResponse
    {
        $this->authorize('users.delete');

        try {
            $result = $this->userService->delete($user);

            $message = $result['media_count'] > 0
                ? "Usuario eliminado exitosamente. {$result['media_count']} archivo(s) han sido marcados como sin usuario."
                : 'Usuario eliminado exitosamente';

            return redirect()
                ->route('users.index')
                ->with('success', $message);
        } catch (\Exception $e) {
            Log::error('Error deleting user', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
            ]);

            return redirect()
                ->route('users.index')
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Toggle user active status
     */
    public function toggleStatus(User $user): RedirectResponse
    {
        $this->authorize('users.activate');

        try {
            $updatedUser = $this->userService->toggleStatus($user);

            $status = $updatedUser->is_active ? 'activado' : 'desactivado';

            return redirect()
                ->route('users.index')
                ->with('success', "Usuario {$status} exitosamente");
        } catch (\Exception $e) {
            Log::error('Error toggling user status', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
            ]);

            return redirect()
                ->route('users.index')
                ->with('error', $e->getMessage());
        }
    }
}
