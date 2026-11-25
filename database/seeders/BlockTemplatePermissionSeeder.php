<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class BlockTemplatePermissionSeeder extends Seeder
{
    public function run(): void
    {
        collect(['view', 'create', 'edit', 'delete', 'toggle', 'scripts', 'manage'])
            ->each(fn (string $action) => Permission::findOrCreate("block_templates.{$action}", 'web'));

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}