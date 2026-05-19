<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
  protected $policies = [];

  public function boot(): void
  {
    // Override permission check to include .manage permissions
    Gate::before(function ($user, $ability) {
      // If user has the exact permission, allow
      if ($user->hasPermissionTo($ability)) {
        return true;
      }

      // Check if user has the .manage permission for the module
      $parts = explode('.', $ability);
      if (count($parts) === 2) {
        $module = $parts[0];
        $managePermission = $module . '.manage';

        if ($user->hasPermissionTo($managePermission)) {
          return true;
        }
      }

      // If user is admin role, allow everything
      if ($user->hasRole('admin')) {
        return true;
      }

      // Continue with default authorization
      return null;
    });
  }
}
