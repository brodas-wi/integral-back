<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class RoleController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('roles.view');

        $roles = Role::withCount('permissions', 'users')->paginate(10);

        return view('roles.index', compact('roles'));
    }

    public function create()
    {
        $this->authorize('roles.create');

        $permissions = Permission::all()->groupBy(function ($permission) {
            return explode('.', $permission->name)[0];
        });

        return view('roles.create', compact('permissions'));
    }

    public function store(Request $request)
    {
        $this->authorize('roles.create');

        $validated = $request->validate([
            'name' => ['required', 'string', 'unique:roles', 'max:255', 'regex:/^[a-z_]+$/'],
            'display_name' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ], [
            'name.required' => 'El nombre del rol es obligatorio',
            'name.unique' => 'Este nombre de rol ya existe',
            'name.regex' => 'El nombre del rol solo puede contener letras minúsculas y guiones bajos',
            'display_name.required' => 'El nombre para mostrar es obligatorio',
        ]);

        $role = Role::create([
            'name' => $validated['name'],
            'display_name' => $validated['display_name'],
            'description' => $validated['description'],
            'guard_name' => 'web',
        ]);

        if (!empty($validated['permissions'])) {
            // Filter permissions before assigning
            $filteredPermissions = $this->filterManagePermissions($validated['permissions']);
            $role->givePermissionTo($filteredPermissions);
        }

        return redirect()->route('roles.index')->with('success', 'Rol creado exitosamente');
    }

    public function show(Role $role)
    {
        $this->authorize('roles.view');

        $role->load('permissions', 'users');

        $permissionsByGroup = $role->permissions->groupBy(function ($permission) {
            return explode('.', $permission->name)[0];
        });

        return view('roles.show', compact('role', 'permissionsByGroup'));
    }

    public function edit(Role $role)
    {
        $this->authorize('roles.edit');

        // Protect admin role from being edited
        if ($role->name === 'admin') {
            return redirect()->route('roles.index')->with('error', 'El rol de Administrador no puede ser editado ya que es un rol del sistema con control total');
        }

        $permissions = Permission::all()->groupBy(function ($permission) {
            return explode('.', $permission->name)[0];
        });

        $rolePermissions = $role->permissions->pluck('name')->toArray();

        return view('roles.edit', compact('role', 'permissions', 'rolePermissions'));
    }

    public function update(Request $request, Role $role)
    {
        $this->authorize('roles.edit');

        // Protect admin role from being updated
        if ($role->name === 'admin') {
            return redirect()->route('roles.index')->with('error', 'El rol de Administrador no puede ser modificado ya que es un rol del sistema con control total');
        }

        if (in_array($role->name, ['editor', 'viewer'])) {
            $validated = $request->validate([
                'display_name' => 'required|string|max:255',
                'description' => 'nullable|string|max:500',
                'permissions' => 'array',
                'permissions.*' => 'exists:permissions,name',
            ], [
                'display_name.required' => 'El nombre para mostrar es obligatorio',
            ]);

            $role->update([
                'display_name' => $validated['display_name'],
                'description' => $validated['description'],
            ]);
        } else {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255', 'unique:roles,name,' . $role->id, 'regex:/^[a-z_]+$/'],
                'display_name' => 'required|string|max:255',
                'description' => 'nullable|string|max:500',
                'permissions' => 'array',
                'permissions.*' => 'exists:permissions,name',
            ], [
                'name.required' => 'El nombre del rol es obligatorio',
                'name.unique' => 'Este nombre de rol ya existe',
                'name.regex' => 'El nombre del rol solo puede contener letras minúsculas y guiones bajos',
                'display_name.required' => 'El nombre para mostrar es obligatorio',
            ]);

            $role->update([
                'name' => $validated['name'],
                'display_name' => $validated['display_name'],
                'description' => $validated['description'],
            ]);
        }

        // Filter permissions before syncing
        $filteredPermissions = $this->filterManagePermissions($validated['permissions'] ?? []);
        $role->syncPermissions($filteredPermissions);

        return redirect()->route('roles.index')->with('success', 'Rol actualizado exitosamente');
    }

    public function destroy(Role $role)
    {
        $this->authorize('roles.delete');

        if ($role->users()->count() > 0) {
            return redirect()->route('roles.index')->with('error', 'No se puede eliminar un rol que tiene usuarios asignados');
        }

        if (in_array($role->name, ['admin', 'editor', 'viewer'])) {
            return redirect()->route('roles.index')->with('error', 'No se pueden eliminar los roles del sistema');
        }

        $role->delete();

        return redirect()->route('roles.index')->with('success', 'Rol eliminado exitosamente');
    }

    // Filter permissions by module
    private function filterManagePermissions(array $permissions): array
    {
        $filtered = [];
        $modules = [];

        // Group permissions by module
        foreach ($permissions as $permission) {
            $parts = explode('.', $permission);
            $module = $parts[0];
            $action = $parts[1];

            if (!isset($modules[$module])) {
                $modules[$module] = [];
            }
            $modules[$module][] = $action;
        }

        // Filter: if .manage exists, only keep .manage
        foreach ($modules as $module => $actions) {
            if (in_array('manage', $actions)) {
                $filtered[] = $module . '.manage';
            } else {
                foreach ($actions as $action) {
                    $filtered[] = $module . '.' . $action;
                }
            }
        }

        return $filtered;
    }
}
