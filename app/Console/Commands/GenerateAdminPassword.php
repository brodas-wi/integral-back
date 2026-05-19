<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class GenerateAdminPassword extends Command
{
    protected $signature = 'admin:generate-password';
    protected $description = 'Generate a secure password for the admin user';

    // Generate and display a secure password for admin user
    public function handle()
    {
        $password = $this->generateSecurePassword();

        $this->info('Generated secure admin password:');
        $this->line('');
        $this->warn($password);
        $this->line('');
        $this->info('Add this to your .env file:');
        $this->line("ADMIN_PASSWORD={$password}");
        $this->line('');
        $this->comment('Then run: php artisan config:clear && php artisan migrate:fresh --seed');

        return 0;
    }

    // Generate a secure random password with requirements
    private function generateSecurePassword(): string
    {
        $uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $lowercase = 'abcdefghijklmnopqrstuvwxyz';
        $numbers = '0123456789';
        $special = '@$!%*?&';
        $all = $uppercase . $lowercase . $numbers . $special;

        $password = '';
        $password .= $uppercase[random_int(0, strlen($uppercase) - 1)];
        $password .= $lowercase[random_int(0, strlen($lowercase) - 1)];
        $password .= $numbers[random_int(0, strlen($numbers) - 1)];
        $password .= $special[random_int(0, strlen($special) - 1)];

        for ($i = strlen($password); $i < 16; $i++) {
            $password .= $all[random_int(0, strlen($all) - 1)];
        }

        return str_shuffle($password);
    }
}