<?php

namespace App\Helpers;

class PermissionHelper
{
  // Translate permission name to Spanish
  public static function translatePermission(string $permission): string
  {
    $translations = [
      'users.view' => 'Ver usuarios',
      'users.create' => 'Crear usuarios',
      'users.edit' => 'Editar usuarios',
      'users.delete' => 'Eliminar usuarios',
      'users.manage' => 'Gestionar usuarios',
      'users.activate' => 'Activar/Desactivar usuarios',

      'roles.view' => 'Ver roles',
      'roles.create' => 'Crear roles',
      'roles.edit' => 'Editar roles',
      'roles.delete' => 'Eliminar roles',
      'roles.manage' => 'Gestionar roles',

      'permissions.view' => 'Ver permisos',
      'permissions.manage' => 'Gestionar permisos',

      'content.view' => 'Ver contenido',
      'content.create' => 'Crear contenido',
      'content.edit' => 'Editar contenido',
      'content.delete' => 'Eliminar contenido',
      'content.manage' => 'Gestionar contenido',

      'pages.view' => 'Ver páginas',
      'pages.create' => 'Crear páginas',
      'pages.edit' => 'Editar páginas',
      'pages.delete' => 'Eliminar páginas',
      'pages.manage' => 'Gestionar páginas',

      'media.view' => 'Ver media',
      'media.upload' => 'Subir media',
      'media.download' => 'Descargar media',
      'media.edit' => 'Editar media',
      'media.delete' => 'Eliminar media',
      'media.manage' => 'Gestionar media',

      'agencies.view' => 'Ver agencias',
      'agencies.create' => 'Crear agencias',
      'agencies.edit' => 'Editar agencias',
      'agencies.delete' => 'Eliminar agencias',
      'agencies.import' => 'Importar agencias',
      'agencies.manage' => 'Gestionar agencias',

      'navbars.view' => 'Ver navbars',
      'navbars.create' => 'Crear navbars',
      'navbars.edit' => 'Editar navbars',
      'navbars.delete' => 'Eliminar navbars',
      'navbars.manage' => 'Gestionar navbars',
      'navbars.toggle' => 'Activar/Desactivar navbars',
      'navbars.restore' => 'Restaurar navbars',
    ];

    return $translations[$permission] ?? $permission;
  }

  // Translate module name to Spanish
  public static function translateModule(string $module): string
  {
    $translations = [
      'users' => 'Usuarios',
      'roles' => 'Roles',
      'permissions' => 'Permisos',
      'content' => 'Contenido',
      'pages' => 'Páginas',
      'media' => 'Media',
      'agencies' => 'Agencias',
    ];

    return $translations[$module] ?? ucfirst($module);
  }

  // Get icon for a module
  public static function getModuleIcon(string $module): string
  {
    $icons = [
      'users' => 'ri-user-line',
      'roles' => 'ri-shield-user-line',
      'permissions' => 'ri-lock-line',
      'content' => 'ri-file-text-line',
      'pages' => 'ri-pages-line',
      'media' => 'ri-image-line',
      'agencies' => 'ri-map-pin-line',
    ];

    return $icons[$module] ?? 'ri-folder-line';
  }

  // Check if permission is a manage permission
  public static function isManagePermission(string $permission): bool
  {
    return str_ends_with($permission, '.manage');
  }

  // Extract module name from permission string
  public static function getModuleFromPermission(string $permission): string
  {
    return explode('.', $permission)[0];
  }

  // Check if user has any of the given permissions (OR logic)
  public static function hasAnyPermission($user, array $permissions): bool
  {
    foreach ($permissions as $permission) {
      if ($user->can($permission)) {
        return true;
      }
    }
    return false;
  }

  // Check if user has all of the given permissions (AND logic)
  public static function hasAllPermissions($user, array $permissions): bool
  {
    foreach ($permissions as $permission) {
      if (!$user->can($permission)) {
        return false;
      }
    }
    return true;
  }

  // Check if user can access a module (has view or manage permission)
  public static function canAccessModule($user, string $module): bool
  {
    return $user->can("{$module}.view") || $user->can("{$module}.manage");
  }
}
