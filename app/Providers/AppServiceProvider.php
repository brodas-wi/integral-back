<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Helpers\PermissionHelper;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Make PermissionHelper available globally in Blade views
        view()->composer('*', function ($view) {
            $view->with('permissionHelper', new PermissionHelper());
        });
    }
}
