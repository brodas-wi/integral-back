<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Media;
use App\Models\Page;
use App\Models\Agency;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  // Display dashboard with comprehensive statistics
  public function index()
  {
    $stats = [
      'users' => User::count(),
      'roles' => Role::count(),
      'pages' => Page::count(),
      'media' => Media::count(),
      'agencies' => Agency::count(),
    ];

    return view('dashboard', compact('stats'));
  }
}
