<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use App\Models\Announcement;
use App\Models\ExtraordinaryAsset;
use App\Models\Banner;
use App\Models\Footer;
use App\Models\Form;
use App\Models\Media;
use App\Models\Navbar;
use App\Models\News;
use App\Models\Page;
use App\Models\PaymentPoint;
use App\Models\Script;
use App\Models\User;
use Spatie\Permission\Models\Role;

class DashboardController extends Controller
{
    private const COUNTERS = [
        'users' => [User::class, 'users'],
        'roles' => [Role::class, 'roles'],
        'pages' => [Page::class, 'pages'],
        'media' => [Media::class, 'media'],
        'banners' => [Banner::class, 'banners'],
        'announcements' => [Announcement::class, 'announcements'],
        'assets' => [ExtraordinaryAsset::class, 'assets'],
        'news' => [News::class, 'news'],
        'navbars' => [Navbar::class, 'navbars'],
        'footers' => [Footer::class, 'footers'],
        'forms' => [Form::class, 'forms'],
        'scripts' => [Script::class, 'scripts'],
        'agencies' => [Agency::class, 'agencies'],
        'payment_points' => [PaymentPoint::class, 'payment_points'],
    ];

    public function index()
    {
        $user = auth()->user();

        $stats = collect(self::COUNTERS)
            ->reject(fn ($config, $key) => $key === 'news' && !config('features.news'))
            ->map(fn ($config) => $user->canAny(["{$config[1]}.view", "{$config[1]}.manage"])
                ? $config[0]::count()
                : 0)
            ->all();

        return view('dashboard', compact('stats'));
    }
}