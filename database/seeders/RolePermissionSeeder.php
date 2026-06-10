<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    // Create all permissions and default roles with their assignments
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $permissions = [
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',
            'users.manage',
            'users.activate',
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',
            'roles.manage',
            'permissions.view',
            'permissions.manage',
            'content.view',
            'content.create',
            'content.edit',
            'content.delete',
            'content.manage',
            'pages.view',
            'pages.create',
            'pages.edit',
            'pages.delete',
            'pages.publish',
            'pages.manage',
            'media.view',
            'media.upload',
            'media.download',
            'media.edit',
            'media.delete',
            'media.manage',
            'agencies.view',
            'agencies.create',
            'agencies.edit',
            'agencies.delete',
            'agencies.import',
            'agencies.export',
            'agencies.manage',
            'payment_points.view',
            'payment_points.create',
            'payment_points.edit',
            'payment_points.delete',
            'payment_points.manage',
            'payment_points.import',
            'payment_points.export',
            'announcements.view',
            'announcements.create',
            'announcements.edit',
            'announcements.delete',
            'announcements.manage',
            'banners.view',
            'banners.create',
            'banners.edit',
            'banners.delete',
            'banners.manage',
            'navbars.view',
            'navbars.create',
            'navbars.edit',
            'navbars.delete',
            'navbars.manage',
            'navbars.toggle',
            'navbars.restore',
            'footers.view',
            'footers.create',
            'footers.edit',
            'footers.delete',
            'footers.manage',
            'footers.toggle',
            'footers.restore',
            'scripts.view',
            'scripts.create',
            'scripts.edit',
            'scripts.delete',
            'scripts.activate',
            'scripts.approve',
            'scripts.auto_approve',
            'scripts.manage',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Admin role - Only use .manage permissions for complete control
        $adminRole = Role::firstOrCreate(['name' => 'admin'], [
            'display_name' => 'Administrador',
            'description' => 'Acceso completo al sistema con todos los permisos. Puede gestionar usuarios, roles, contenido y configuraciones.',
        ]);
        $adminRole->givePermissionTo([
            'users.manage',
            'roles.manage',
            'permissions.manage',
            'content.manage',
            'pages.manage',
            'media.manage',
            'agencies.manage',
            'payment_points.manage',
            'navbars.manage',
            'footers.manage',
        ]);

        // Editor role - Individual permissions for content management
        $editorRole = Role::firstOrCreate(['name' => 'editor'], [
            'display_name' => 'Editor',
            'description' => 'Puede crear y editar contenido, páginas y gestionar archivos multimedia. Sin acceso a usuarios y configuraciones del sistema.',
        ]);
        $editorRole->givePermissionTo([
            'content.view',
            'content.create',
            'content.edit',
            'pages.view',
            'pages.create',
            'pages.edit',
            'media.view',
            'media.upload',
            'navbars.view',
            'navbars.edit',
            'footers.view',
            'footers.edit',
        ]);

        // Viewer role - Only view permissions
        $viewerRole = Role::firstOrCreate(['name' => 'viewer'], [
            'display_name' => 'Espectador',
            'description' => 'Solo puede visualizar contenido, páginas y archivos multimedia. Sin permisos para crear, editar o eliminar.',
        ]);
        $viewerRole->givePermissionTo([
            'content.view',
            'pages.view',
            'media.view',
        ]);
    }
}
