<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class FormPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        collect([
            'forms.view',
            'forms.create',
            'forms.edit',
            'forms.delete',
            'forms.manage',
            'form_submissions.view',
            'form_submissions.export',
            'form_submissions.delete',
            'form_submissions.manage',
        ])->each(fn(string $name) => Permission::findOrCreate($name, 'web'));
    }
}
