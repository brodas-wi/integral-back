<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Media;
use App\Models\Page;
use App\Models\Agency;
use App\Models\Navbar;
use App\Models\Footer;
use App\Models\Banner;
use App\Models\Announcement;
use App\Models\Script;
use App\Models\PaymentPoint;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  // Display dashboard with comprehensive statistics
  public function index()
  {
    $stats = [
      'users'          => User::count(),
      'roles'          => Role::count(),
      'pages'          => Page::count(),
      'media'          => Media::count(),
      'agencies'       => Agency::count(),
      'navbars'        => Navbar::count(),
      'footers'        => Footer::count(),
      'banners'        => Banner::count(),
      'announcements'  => Announcement::count(),
      'scripts'        => Script::count(),
      'payment_points' => PaymentPoint::count(),
    ];

    return view('dashboard', compact('stats'));
  }
}
