<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\NavbarController;
use App\Http\Controllers\FooterController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\PaymentPointController;
use App\Http\Controllers\MapLocationController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\ScriptController;
use App\Http\Controllers\ExtraordinaryAssetController;
use App\Http\Controllers\ExtraordinaryAssetCategoryController;
use App\Models\Page;
use Illuminate\Support\Facades\Route;

// Redirect root to login
Route::get('/', function () {
    return redirect()->route('login');
});

// Authentication routes
require __DIR__ . '/auth.php';

// Protected routes - require authentication
Route::middleware(['auth'])->group(function () {
    // ==========================================
    // PROFILE ROUTES
    // ==========================================
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // ==========================================
    // DASHBOARD ROUTES
    // ==========================================
    // Dashboard - accessible to all authenticated users
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // ==========================================
    // USER MANAGEMENT ROUTES
    // ==========================================
    Route::prefix('users')->name('users.')->group(function () {
        // View users list and details
        Route::get('/', [UserController::class, 'index'])
            ->name('index')
            ->middleware('can:users.view,users.manage');

        // Create new user
        Route::get('/create', [UserController::class, 'create'])
            ->name('create')
            ->middleware('can:users.create,users.manage');

        Route::post('/', [UserController::class, 'store'])
            ->name('store')
            ->middleware('can:users.create,users.manage');

        // Edit existing user
        Route::get('/{user}/edit', [UserController::class, 'edit'])
            ->name('edit')
            ->middleware('can:users.edit,users.manage');

        Route::put('/{user}', [UserController::class, 'update'])
            ->name('update')
            ->middleware('can:users.edit,users.manage');

        // Toggle user status
        Route::patch('/{user}/toggle-status', [UserController::class, 'toggleStatus'])
            ->name('toggle-status')
            ->middleware('can:users.activate,users.manage');

        // Show user
        Route::get('/{user}', [UserController::class, 'show'])
            ->name('show')
            ->middleware('can:users.view,users.manage');

        // Delete user
        Route::delete('/{user}', [UserController::class, 'destroy'])
            ->name('destroy')
            ->middleware('can:users.delete,users.manage');
    });

    // ==========================================
    // ROLE MANAGEMENT ROUTES
    // ==========================================
    Route::prefix('roles')->name('roles.')->group(function () {
        // View roles list and details
        Route::get('/', [RoleController::class, 'index'])
            ->name('index')
            ->middleware('can:roles.view,roles.manage');

        // Create role
        Route::get('/create', [RoleController::class, 'create'])
            ->name('create')
            ->middleware('can:roles.create,roles.manage');

        Route::post('/', [RoleController::class, 'store'])
            ->name('store')
            ->middleware('can:roles.create,roles.manage');

        // Edit role
        Route::get('/{role}/edit', [RoleController::class, 'edit'])
            ->name('edit')
            ->middleware('can:roles.edit,roles.manage');

        Route::put('/{role}', [RoleController::class, 'update'])
            ->name('update')
            ->middleware('can:roles.edit,roles.manage');

        // Show role
        Route::get('/{role}', [RoleController::class, 'show'])
            ->name('show')
            ->middleware('can:roles.view,roles.manage');

        // Delete role
        Route::delete('/{role}', [RoleController::class, 'destroy'])
            ->name('destroy')
            ->middleware('can:roles.delete,roles.manage');
    });

    // ==========================================
    // PAGE MANAGEMENT ROUTES
    // ==========================================
    Route::prefix('pages')->name('pages.')->group(function () {
        // View pages list and details
        Route::get('/', [PageController::class, 'index'])
            ->name('index')
            ->middleware('can:pages.view,pages.manage');

        // Create new page
        Route::get('/create', [PageController::class, 'create'])
            ->name('create')
            ->middleware('can:pages.create,pages.manage');

        Route::post('/', [PageController::class, 'store'])
            ->name('store')
            ->middleware('can:pages.create,pages.manage');

        // Edit existing page
        Route::get('/{page}/edit', [PageController::class, 'edit'])
            ->name('edit')
            ->middleware('can:pages.edit,pages.manage');

        Route::put('/{page}', [PageController::class, 'update'])
            ->name('update')
            ->middleware('can:pages.edit,pages.manage');

        // Toggle publish status
        Route::patch('/{page}/toggle-publish', [PageController::class, 'togglePublish'])
            ->name('toggle-publish')
            ->middleware('can:pages.publish,pages.manage');

        // Update footer relation
        Route::patch('/{page}/footer', [PageController::class, 'updateFooter'])
            ->name('update-footer')
            ->middleware('can:pages.edit,pages.manage');

        // Update navbar relation
        Route::patch('/{page}/navbar', [PageController::class, 'updateNavbar'])
            ->name('update-navbar')
            ->middleware('can:pages.edit,pages.manage');

        // Check slug availability (live, while typing)
        Route::get('/slug-check', [PageController::class, 'checkSlug'])
            ->name('slug-check')
            ->middleware('can:pages.edit,pages.manage');

        // Duplicate page
        Route::post('/{page}/duplicate', [PageController::class, 'duplicate'])
            ->name('duplicate')
            ->middleware('can:pages.create,pages.manage');

        // Update title and slug
        Route::patch('/{page}/title-slug', [PageController::class, 'updateTitleSlug'])
            ->name('update-title-slug')
            ->middleware('can:pages.edit,pages.manage');

        // Load page data for editor
        Route::get('/{page}/load', [PageController::class, 'load'])
            ->name('load')
            ->middleware('can:pages.edit,pages.manage');

        // Show page details (admin view)
        Route::get('/{page}', [PageController::class, 'show'])
            ->name('show')
            ->middleware('can:pages.view,pages.manage');

        // Delete page
        Route::delete('/{page}', [PageController::class, 'destroy'])
            ->name('destroy')
            ->middleware('can:pages.delete,pages.manage');
    });

    // ==========================================
    // NAVBAR MANAGEMENT ROUTES
    // ==========================================
    Route::prefix('navbars')->name('navbars.')->group(function () {
        Route::get('/', [NavbarController::class, 'index'])
            ->name('index')
            ->middleware('can:navbars.view,navbars.manage');

        Route::get('/trashed', [NavbarController::class, 'trashed'])
            ->name('trashed')
            ->middleware('can:navbars.restore,navbars.manage');

        Route::get('/create', [NavbarController::class, 'create'])
            ->name('create')
            ->middleware('can:navbars.create,navbars.manage');

        Route::post('/', [NavbarController::class, 'store'])
            ->name('store')
            ->middleware('can:navbars.create,navbars.manage');

        Route::get('/{navbar}/preview', [NavbarController::class, 'preview'])
            ->name('preview')
            ->middleware('can:navbars.view,navbars.manage');

        Route::get('/{navbar}/edit', [NavbarController::class, 'edit'])
            ->name('edit')
            ->middleware('can:navbars.edit,navbars.manage');

        Route::put('/{navbar}', [NavbarController::class, 'update'])
            ->name('update')
            ->middleware('can:navbars.edit,navbars.manage');

        Route::get('/{navbar}/load', [NavbarController::class, 'load'])
            ->name('load')
            ->middleware('can:navbars.edit,navbars.manage');

        Route::patch('/{navbar}/toggle-active', [NavbarController::class, 'toggleActive'])
            ->name('toggle-active')
            ->middleware('can:navbars.toggle,navbars.manage');

        Route::delete('/{navbar}', [NavbarController::class, 'destroy'])
            ->name('destroy')
            ->middleware('can:navbars.delete,navbars.manage');

        Route::patch('/{id}/restore', [NavbarController::class, 'restore'])
            ->name('restore')
            ->middleware('can:navbars.restore,navbars.manage');

        Route::delete('/{id}/force-delete', [NavbarController::class, 'forceDelete'])
            ->name('force-delete')
            ->middleware('can:navbars.delete,navbars.manage');
    });

    Route::get('/api/pages/search', function (\Illuminate\Http\Request $request) {
        $q = $request->query('q', '');
        $pages = \App\Models\Page::published()
            ->where(function ($query) use ($q) {
                $query->where('title', 'like', "%{$q}%")
                    ->orWhere('slug', 'like', "%{$q}%");
            })
            ->select('id', 'title', 'slug')
            ->limit(8)
            ->get();
        return response()->json($pages);
    })->name('api.pages.search');

    Route::get('/api/navbars/active', [NavbarController::class, 'apiActive'])
        ->name('api.navbars.active');

    // ==========================================
    // FOOTER MANAGEMENT ROUTES
    // ==========================================
    Route::prefix('footers')->name('footers.')->group(function () {
        Route::get('/', [FooterController::class, 'index'])
            ->name('index')
            ->middleware('can:footers.view,footers.manage');

        Route::get('/trashed', [FooterController::class, 'trashed'])
            ->name('trashed')
            ->middleware('can:footers.restore,footers.manage');

        Route::get('/create', [FooterController::class, 'create'])
            ->name('create')
            ->middleware('can:footers.create,footers.manage');

        Route::post('/', [FooterController::class, 'store'])
            ->name('store')
            ->middleware('can:footers.create,footers.manage');

        Route::get('/{footer}/preview', [FooterController::class, 'preview'])
            ->name('preview')
            ->middleware('can:footers.view,footers.manage');

        Route::get('/{footer}/edit', [FooterController::class, 'edit'])
            ->name('edit')
            ->middleware('can:footers.edit,footers.manage');

        Route::put('/{footer}', [FooterController::class, 'update'])
            ->name('update')
            ->middleware('can:footers.edit,footers.manage');

        Route::get('/{footer}/load', [FooterController::class, 'load'])
            ->name('load')
            ->middleware('can:footers.edit,footers.manage');

        Route::patch('/{footer}/toggle-active', [FooterController::class, 'toggleActive'])
            ->name('toggle-active')
            ->middleware('can:footers.toggle,footers.manage');

        Route::delete('/{footer}', [FooterController::class, 'destroy'])
            ->name('destroy')
            ->middleware('can:footers.delete,footers.manage');

        Route::patch('/{id}/restore', [FooterController::class, 'restore'])
            ->name('restore')
            ->middleware('can:footers.restore,footers.manage');

        Route::delete('/{id}/force-delete', [FooterController::class, 'forceDelete'])
            ->name('force-delete')
            ->middleware('can:footers.delete,footers.manage');
    });

    Route::get('/api/footers/active', [FooterController::class, 'apiActive'])
        ->name('api.footers.active');

    // ==========================================
    // MEDIA MANAGEMENT ROUTES
    // ==========================================
    Route::prefix('media')->name('media.')->group(function () {
        Route::get('/api', [MediaController::class, 'apiIndex'])
            ->name('api')
            ->middleware('can:media.view,media.manage');

        // View media library
        Route::get('/', [MediaController::class, 'index'])
            ->name('index')
            ->middleware('can:media.view,media.manage');

        // Upload new media
        Route::get('/create', [MediaController::class, 'create'])
            ->name('create')
            ->middleware('can:media.upload,media.manage');

        Route::post('/', [MediaController::class, 'store'])
            ->name('store')
            ->middleware('can:media.upload,media.manage');

        // Download media file (specific route before {media} parameter)
        Route::get('/{media}/download', [MediaController::class, 'download'])
            ->name('download')
            ->middleware('can:media.view,media.manage');

        // Edit media metadata
        Route::get('/{media}/edit', [MediaController::class, 'edit'])
            ->name('edit')
            ->middleware('can:media.view,media.manage');

        Route::put('/{media}', [MediaController::class, 'update'])
            ->name('update')
            ->middleware('can:media.view,media.manage');

        // View media details
        Route::get('/{media}', [MediaController::class, 'show'])
            ->name('show')
            ->middleware('can:media.view,media.manage');

        // Delete media (authorization also checked in controller for better error handling)
        Route::delete('/{media}', [MediaController::class, 'destroy'])
            ->name('destroy');
    });

    // ==========================================
    // AGENCY MANAGEMENT ROUTES
    // ==========================================
    Route::prefix('agencies')->name('agencies.')->group(function () {
        Route::get('/', [AgencyController::class, 'index'])
            ->name('index')
            ->middleware('can:agencies.view,agencies.manage');

        Route::get('/create', [AgencyController::class, 'create'])
            ->name('create')
            ->middleware('can:agencies.create,agencies.manage');

        Route::post('/', [AgencyController::class, 'store'])
            ->name('store')
            ->middleware('can:agencies.create,agencies.manage');

        Route::get('/import', [AgencyController::class, 'importForm'])
            ->name('import')
            ->middleware('can:agencies.import,agencies.manage');

        Route::post('/import', [AgencyController::class, 'import'])
            ->name('import.process')
            ->middleware('can:agencies.import,agencies.manage');

        Route::get('/export', [AgencyController::class, 'export'])
            ->name('export')
            ->middleware('can:agencies.export,agencies.manage');

        Route::post('/geocode', [AgencyController::class, 'geocode'])
            ->name('geocode')
            ->middleware('can:agencies.create,agencies.edit,agencies.manage');

        Route::get('/municipalities', [AgencyController::class, 'getMunicipalities'])
            ->name('municipalities');

        Route::get('/{agency}/edit', [AgencyController::class, 'edit'])
            ->name('edit')
            ->middleware('can:agencies.edit,agencies.manage');

        Route::put('/{agency}', [AgencyController::class, 'update'])
            ->name('update')
            ->middleware('can:agencies.edit,agencies.manage');

        Route::get('/{agency}', [AgencyController::class, 'show'])
            ->name('show')
            ->middleware('can:agencies.view,agencies.manage');

        Route::patch('/{agency}/update-coordinates', [AgencyController::class, 'updateCoordinates'])
            ->name('update-coordinates')
            ->middleware('can:agencies.edit,agencies.manage');

        Route::delete('/{agency}', [AgencyController::class, 'destroy'])
            ->name('destroy');
    });

    // API Routes for Agencies
    Route::prefix('api/agencies')->name('api.agencies.')->group(function () {
        Route::get('/active', [AgencyController::class, 'apiIndex'])->name('active');
    });

    // ==========================================
    // PAYMENT POINTS ROUTES
    // ==========================================
    Route::prefix('payment-points')->name('payment-points.')->group(function () {
        Route::get('/', [PaymentPointController::class, 'index'])
            ->name('index')
            ->middleware('can:payment_points.view,payment_points.manage');

        Route::get('/create', [PaymentPointController::class, 'create'])
            ->name('create')
            ->middleware('can:payment_points.create,payment_points.manage');

        Route::post('/', [PaymentPointController::class, 'store'])
            ->name('store')
            ->middleware('can:payment_points.create,payment_points.manage');

        Route::get('/import', [PaymentPointController::class, 'importForm'])
            ->name('import')
            ->middleware('can:payment_points.import,payment_points.manage');

        Route::post('/import', [PaymentPointController::class, 'import'])
            ->name('import.process')
            ->middleware('can:payment_points.import,payment_points.manage');

        Route::get('/export', [PaymentPointController::class, 'export'])
            ->name('export')
            ->middleware('can:payment_points.export,payment_points.manage');

        Route::post('/geocode', [PaymentPointController::class, 'geocode'])
            ->name('geocode')
            ->middleware('can:payment_points.create,payment_points.edit,payment_points.manage');

        Route::get('/municipalities', [PaymentPointController::class, 'getMunicipalities'])
            ->name('municipalities');

        Route::get('/{paymentPoint}/edit', [PaymentPointController::class, 'edit'])
            ->name('edit')
            ->middleware('can:payment_points.edit,payment_points.manage');

        Route::put('/{paymentPoint}', [PaymentPointController::class, 'update'])
            ->name('update')
            ->middleware('can:payment_points.edit,payment_points.manage');

        Route::get('/{paymentPoint}', [PaymentPointController::class, 'show'])
            ->name('show')
            ->middleware('can:payment_points.view,payment_points.manage');
        Route::patch('/{paymentPoint}/update-coordinates', [PaymentPointController::class, 'updateCoordinates'])
            ->name('update-coordinates')
            ->middleware('can:payment_points.edit,payment_points.manage');

        Route::delete('/{paymentPoint}', [PaymentPointController::class, 'destroy'])
            ->name('destroy');
    });

    Route::prefix('api/payment-points')->name('api.payment-points.')->group(function () {
        Route::get('/active', [PaymentPointController::class, 'apiIndex'])->name('active');
    });

    // ==========================================
    // MAP BLOCK DATA (GrapesJS - Mapa con Filtros)
    // ==========================================
    Route::get('/api/map-locations', [MapLocationController::class, 'index'])
        ->name('api.map-locations');

    // ==========================================
    // ANNOUNCEMENTS ROUTES
    // ==========================================
    Route::prefix('announcements')->name('announcements.')->group(function () {
        Route::get('/', [AnnouncementController::class, 'index'])
            ->name('index')
            ->middleware('can:announcements.view,announcements.manage');

        Route::get('/create', [AnnouncementController::class, 'create'])
            ->name('create')
            ->middleware('can:announcements.create,announcements.manage');

        Route::post('/', [AnnouncementController::class, 'store'])
            ->name('store')
            ->middleware('can:announcements.create,announcements.manage');

        Route::get('/{announcement}/edit', [AnnouncementController::class, 'edit'])
            ->name('edit')
            ->middleware('can:announcements.edit,announcements.manage');

        Route::put('/{announcement}', [AnnouncementController::class, 'update'])
            ->name('update')
            ->middleware('can:announcements.edit,announcements.manage');

        Route::get('/{announcement}', [AnnouncementController::class, 'show'])
            ->name('show')
            ->middleware('can:announcements.view,announcements.manage');

        Route::patch('/{announcement}/toggle-status', [AnnouncementController::class, 'toggleStatus'])
            ->name('toggle-status')
            ->middleware('can:announcements.edit,announcements.manage');

        Route::delete('/{announcement}', [AnnouncementController::class, 'destroy'])
            ->name('destroy');
    });

    // API endpoint for public access
    Route::get('/api/announcements/for-page', [AnnouncementController::class, 'getForPage'])
        ->name('api.announcements.for-page');

    // ==========================================
    // BANNER MANAGEMENT ROUTES
    // ==========================================
    Route::prefix('banners')->name('banners.')->group(function () {
        Route::get('/', [BannerController::class, 'index'])
            ->name('index')
            ->middleware('can:banners.view,banners.manage');

        Route::get('/create', [BannerController::class, 'create'])
            ->name('create')
            ->middleware('can:banners.create,banners.manage');

        Route::get('/trashed', [BannerController::class, 'trashed'])
            ->name('trashed')
            ->middleware('can:banners.delete,banners.manage');

        Route::post('/', [BannerController::class, 'store'])
            ->name('store')
            ->middleware('can:banners.create,banners.manage');

        Route::get('/{banner}/edit', [BannerController::class, 'edit'])
            ->name('edit')
            ->middleware('can:banners.edit,banners.manage');

        Route::put('/{banner}', [BannerController::class, 'update'])
            ->name('update')
            ->middleware('can:banners.edit,banners.manage');

        Route::patch('/{banner}/toggle-status', [BannerController::class, 'toggleStatus'])
            ->name('toggle-status')
            ->middleware('can:banners.edit,banners.manage');

        Route::patch('/{id}/restore', [BannerController::class, 'restore'])
            ->name('restore')
            ->middleware('can:banners.delete,banners.manage');

        Route::delete('/{id}/force-delete', [BannerController::class, 'forceDelete'])
            ->name('force-delete')
            ->middleware('can:banners.delete,banners.manage');

        Route::get('/{banner}', [BannerController::class, 'show'])
            ->name('show')
            ->middleware('can:banners.view,banners.manage');

        Route::delete('/{banner}', [BannerController::class, 'destroy'])
            ->name('destroy')
            ->middleware('can:banners.delete,banners.manage');
    });

    // API pública para el bloque GrapesJS
    Route::get('/api/banners/active', [BannerController::class, 'apiIndex'])
        ->name('api.banners.active');

    // ==========================================
    // SCRIPTS MODULE ROUTES
    // ==========================================
    Route::prefix('scripts')->name('scripts.')->group(function () {
        Route::get('/', [ScriptController::class, 'index'])
            ->name('index')
            ->middleware('can:scripts.view,scripts.manage');

        Route::get('/create', [ScriptController::class, 'create'])
            ->name('create')
            ->middleware('can:scripts.create,scripts.manage');

        Route::post('/', [ScriptController::class, 'store'])
            ->name('store')
            ->middleware('can:scripts.create,scripts.manage');

        Route::get('/{script}/edit', [ScriptController::class, 'edit'])
            ->name('edit')
            ->middleware('can:scripts.edit,scripts.manage');

        Route::put('/{script}', [ScriptController::class, 'update'])
            ->name('update')
            ->middleware('can:scripts.edit,scripts.manage');

        Route::get('/{script}', [ScriptController::class, 'show'])
            ->name('show')
            ->middleware('can:scripts.view,scripts.manage');

        Route::patch('/{script}/toggle-active', [ScriptController::class, 'toggleActive'])
            ->name('toggle-active')
            ->middleware('can:scripts.activate,scripts.manage');

        Route::patch('/{script}/approve', [ScriptController::class, 'approve'])
            ->name('approve')
            ->middleware('can:scripts.approve,scripts.manage');

        Route::patch('/{script}/reject', [ScriptController::class, 'reject'])
            ->name('reject')
            ->middleware('can:scripts.approve,scripts.manage');

        Route::delete('/{script}', [ScriptController::class, 'destroy'])
            ->name('destroy')
            ->middleware('can:scripts.delete,scripts.manage');
    });

    // ==========================================
    // ASSETS MODULE ROUTES
    // ==========================================
    Route::prefix('assets')->name('assets.')->group(function () {
        Route::get('/', [ExtraordinaryAssetController::class, 'index'])
            ->name('index')
            ->middleware('can:assets.view,assets.manage');

        Route::get('/trashed', [ExtraordinaryAssetController::class, 'trashed'])
            ->name('trashed')
            ->middleware('can:assets.delete,assets.manage');

        Route::get('/create', [ExtraordinaryAssetController::class, 'create'])
            ->name('create')
            ->middleware('can:assets.create,assets.manage');

        Route::post('/', [ExtraordinaryAssetController::class, 'store'])
            ->name('store')
            ->middleware('can:assets.create,assets.manage');

        Route::get('/{asset}/edit', [ExtraordinaryAssetController::class, 'edit'])
            ->name('edit')
            ->middleware('can:assets.edit,assets.manage');

        Route::put('/{asset}', [ExtraordinaryAssetController::class, 'update'])
            ->name('update')
            ->middleware('can:assets.edit,assets.manage');

        Route::patch('/{asset}/toggle-status', [ExtraordinaryAssetController::class, 'toggleStatus'])
            ->name('toggle-status')
            ->middleware('can:assets.toggle,assets.manage');

        Route::patch('/{id}/restore', [ExtraordinaryAssetController::class, 'restore'])
            ->name('restore')
            ->middleware('can:assets.delete,assets.manage');

        Route::delete('/{id}/force-delete', [ExtraordinaryAssetController::class, 'forceDelete'])
            ->name('force-delete')
            ->middleware('can:assets.delete,assets.manage');

        Route::delete('/{asset}', [ExtraordinaryAssetController::class, 'destroy'])
            ->name('destroy')
            ->middleware('can:assets.delete,assets.manage');
    });

    Route::prefix('asset-categories')->name('asset-categories.')->group(function () {
        Route::get('/', [ExtraordinaryAssetCategoryController::class, 'index'])
            ->name('index')
            ->middleware('can:assets.manage');

        Route::put('/{assetCategory}', [ExtraordinaryAssetCategoryController::class, 'update'])
            ->name('update')
            ->middleware('can:assets.manage');

        Route::delete('/{assetCategory}', [ExtraordinaryAssetCategoryController::class, 'destroy'])
            ->name('destroy')
            ->middleware('can:assets.manage');
    });

    Route::get('/api/assets/active', [ExtraordinaryAssetController::class, 'apiActive'])
        ->name('api.assets.active');

    Route::get('/api/asset-categories/search', [ExtraordinaryAssetController::class, 'apiCategorySuggestions'])
        ->name('api.asset-categories.search')
        ->middleware('can:assets.create,assets.edit,assets.manage');

    Route::get('/api/asset-categories/all', [ExtraordinaryAssetController::class, 'apiCategoryList'])
        ->name('api.asset-categories.all')
        ->middleware('can:assets.create,assets.edit,assets.manage');

    // API endpoint for scripts (shared DB - public frontend consumes this)
    Route::get('/api/scripts/active', [ScriptController::class, 'apiActive'])
        ->name('api.scripts.active');

    // ==========================================
    // ROUTES (Coming Soon)
    // ==========================================
    // Route::prefix('media')->name('media.')->group(function () {
    //     Route::get('/', function () {
    //         return view('coming-soon', ['module' => 'Medios']);
    //     })->name('index')->middleware('can:media.view,media.manage');
    // });
});

// ==========================================
// PUBLIC PAGE VIEWING (Outside auth middleware)
// ==========================================
Route::get('/p/{slug}/styles.css', function ($slug) {
    $page = Page::where('slug', $slug)->firstOrFail();
    return response($page->css_content ?? '', 200)
        ->header('Content-Type', 'text/css')
        ->header('Cache-Control', 'public, max-age=300');
})->name('pages.styles');

Route::get('/p/{page}', [PageController::class, 'preview'])->name('page.preview');
