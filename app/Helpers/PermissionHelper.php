<?php

namespace App\Helpers;

class PermissionHelper
{
  public static function translatePermission(string $permission): string
  {
    $translations = [
      'users.view' => 'Ver usuarios',
      'users.create' => 'Crear usuarios',
      'users.edit' => 'Editar usuarios',
      'users.delete' => 'Eliminar usuarios',
      'users.activate' => 'Activar/Desactivar usuarios',
      'users.manage' => 'Gestionar usuarios',

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
      'pages.publish' => 'Publicar/Despublicar páginas',
      'pages.manage' => 'Gestionar páginas',

      'navbars.view' => 'Ver navbars',
      'navbars.create' => 'Crear navbars',
      'navbars.edit' => 'Editar navbars',
      'navbars.delete' => 'Eliminar navbars',
      'navbars.toggle' => 'Activar/Desactivar navbars',
      'navbars.restore' => 'Restaurar navbars',
      'navbars.manage' => 'Gestionar navbars',

      'footers.view' => 'Ver footers',
      'footers.create' => 'Crear footers',
      'footers.edit' => 'Editar footers',
      'footers.delete' => 'Eliminar footers',
      'footers.toggle' => 'Activar/Desactivar footers',
      'footers.restore' => 'Restaurar footers',
      'footers.manage' => 'Gestionar footers',

      'media.view' => 'Ver medios',
      'media.upload' => 'Subir medios',
      'media.download' => 'Descargar medios',
      'media.edit' => 'Editar medios',
      'media.delete' => 'Eliminar medios',
      'media.manage' => 'Gestionar medios',

      'banners.view' => 'Ver banners',
      'banners.create' => 'Crear banners',
      'banners.edit' => 'Editar banners',
      'banners.delete' => 'Eliminar banners',
      'banners.manage' => 'Gestionar banners',

      'announcements.view' => 'Ver anuncios',
      'announcements.create' => 'Crear anuncios',
      'announcements.edit' => 'Editar anuncios',
      'announcements.delete' => 'Eliminar anuncios',
      'announcements.manage' => 'Gestionar anuncios',

      'agencies.view' => 'Ver agencias',
      'agencies.create' => 'Crear agencias',
      'agencies.edit' => 'Editar agencias',
      'agencies.delete' => 'Eliminar agencias',
      'agencies.import' => 'Importar agencias',
      'agencies.export' => 'Exportar agencias',
      'agencies.manage' => 'Gestionar agencias',

      'payment_points.view' => 'Ver puntos de pago',
      'payment_points.create' => 'Crear puntos de pago',
      'payment_points.edit' => 'Editar puntos de pago',
      'payment_points.delete' => 'Eliminar puntos de pago',
      'payment_points.import' => 'Importar puntos de pago',
      'payment_points.export' => 'Exportar puntos de pago',
      'payment_points.manage' => 'Gestionar puntos de pago',

      'assets.view' => 'Ver activos extraordinarios',
      'assets.create' => 'Crear activos extraordinarios',
      'assets.edit' => 'Editar activos extraordinarios',
      'assets.delete' => 'Eliminar activos extraordinarios',
      'assets.toggle' => 'Activar/Desactivar activos extraordinarios',
      'assets.manage' => 'Gestionar activos extraordinarios',

      'scripts.view' => 'Ver scripts',
      'scripts.create' => 'Crear scripts',
      'scripts.edit' => 'Editar scripts',
      'scripts.delete' => 'Eliminar scripts',
      'scripts.activate' => 'Activar/Desactivar scripts',
      'scripts.approve' => 'Aprobar/Rechazar scripts',
      'scripts.auto_approve' => 'Aprobación automática de scripts',
      'scripts.manage' => 'Gestionar scripts',

      'forms.view' => 'Ver formularios',
      'forms.create' => 'Crear formularios',
      'forms.edit' => 'Editar formularios',
      'forms.delete' => 'Eliminar formularios',
      'forms.manage' => 'Gestionar formularios',

      'form_submissions.view' => 'Ver respuestas de formularios',
      'form_submissions.export' => 'Exportar respuestas de formularios',
      'form_submissions.delete' => 'Eliminar respuestas de formularios',
      'form_submissions.manage' => 'Gestionar respuestas de formularios',

      'news.view' => 'Ver noticias',
      'news.create' => 'Crear noticias',
      'news.edit' => 'Editar noticias',
      'news.delete' => 'Eliminar noticias',
      'news.manage' => 'Gestionar noticias',

      'news_categories.view' => 'Ver categorías de noticias',
      'news_categories.create' => 'Crear categorías de noticias',
      'news_categories.edit' => 'Editar categorías de noticias',
      'news_categories.delete' => 'Eliminar categorías de noticias',
      'news_categories.manage' => 'Gestionar categorías de noticias',

      'block_templates.view' => 'Ver plantillas de bloques',
      'block_templates.create' => 'Crear plantillas de bloques',
      'block_templates.edit' => 'Editar plantillas de bloques',
      'block_templates.delete' => 'Eliminar plantillas de bloques',
      'block_templates.toggle' => 'Activar/Desactivar plantillas de bloques',
      'block_templates.scripts' => 'Escribir JavaScript en plantillas de bloques',
      'block_templates.manage' => 'Gestionar plantillas de bloques',
    ];

    return $translations[$permission] ?? ucfirst(str_replace(['.', '_'], ' ', $permission));
  }

  public static function translateModule(string $module): string
  {
    $translations = [
      'users' => 'Usuarios',
      'roles' => 'Roles',
      'permissions' => 'Permisos',
      'content' => 'Contenido',
      'pages' => 'Páginas',
      'navbars' => 'Navbars',
      'footers' => 'Footers',
      'media' => 'Medios',
      'banners' => 'Banners',
      'announcements' => 'Anuncios',
      'agencies' => 'Agencias',
      'payment_points' => 'Puntos de pago',
      'assets' => 'Activos extraordinarios',
      'scripts' => 'Scripts',
      'forms' => 'Formularios',
      'form_submissions' => 'Respuestas de formularios',
      'news' => 'Noticias',
      'news_categories' => 'Categorías de noticias',
      'block_templates' => 'Plantillas de bloques',
    ];

    return $translations[$module] ?? ucfirst(str_replace('_', ' ', $module));
  }

  public static function getModuleIcon(string $module): string
  {
    $icons = [
      'users' => 'ri-user-line',
      'roles' => 'ri-shield-user-line',
      'permissions' => 'ri-lock-line',
      'content' => 'ri-file-text-line',
      'pages' => 'ri-pages-line',
      'navbars' => 'ri-menu-line',
      'footers' => 'ri-layout-bottom-line',
      'media' => 'ri-image-line',
      'banners' => 'ri-advertisement-line',
      'announcements' => 'ri-megaphone-line',
      'agencies' => 'ri-map-pin-line',
      'payment_points' => 'ri-bank-card-line',
      'assets' => 'ri-building-line',
      'scripts' => 'ri-code-s-slash-line',
      'forms' => 'ri-survey-line',
      'form_submissions' => 'ri-inbox-line',
      'news' => 'ri-newspaper-line',
      'news_categories' => 'ri-price-tag-3-line',
      'block_templates' => 'ri-layout-masonry-line',
    ];

    return $icons[$module] ?? 'ri-folder-line';
  }

  public static function isManagePermission(string $permission): bool
  {
    return str_ends_with($permission, '.manage');
  }

  public static function getModuleFromPermission(string $permission): string
  {
    return explode('.', $permission)[0];
  }

  public static function hasAnyPermission($user, array $permissions): bool
  {
    foreach ($permissions as $permission) {
      if ($user->can($permission)) {
        return true;
      }
    }
    return false;
  }

  public static function hasAllPermissions($user, array $permissions): bool
  {
    foreach ($permissions as $permission) {
      if (!$user->can($permission)) {
        return false;
      }
    }
    return true;
  }

  public static function canAccessModule($user, string $module): bool
  {
    return $user->can("{$module}.view") || $user->can("{$module}.manage");
  }
}