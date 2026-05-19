<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    // Create two root admin users from environment variables
    public function run(): void
    {
        $this->createRootAdmin(
            env('ADMIN_USERNAME', 'admin'),
            env('ADMIN_NAME', 'Administrador'),
            env('ADMIN_PASSWORD'),
            'Main admin user for client team'
        );

        $this->createRootAdmin(
            env('ADMINWEB_USERNAME', 'adminweb'),
            env('ADMINWEB_NAME', 'Administrador Web'),
            env('ADMINWEB_PASSWORD'),
            'Web admin user for development team'
        );
    }

    // Create a single root admin user
    private function createRootAdmin(string $username, string $name, ?string $password, string $description): void
    {
        if (empty($password)) {
            $this->command->error("{$username} password is not set in .env file!");
            $this->command->warn('Run: php artisan admin:generate-password');
            throw new \Exception("{$username} password environment variable is required");
        }

        $admin = User::create([
            'username' => $username,
            'name' => $name,
            'password' => Hash::make($password),
            'is_active' => true,
            'is_root' => true,
        ]);

        $admin->assignRole('admin');

        $this->command->info("Root admin user created: {$username} - {$description}");
    }
}