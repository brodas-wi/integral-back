<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\AgencyController;
use App\Http\Controllers\PaymentPointController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\BannerController;
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
    $page = \App\Models\Page::where('slug', $slug)->firstOrFail();
    return response($page->css_content ?? '', 200)
        ->header('Content-Type', 'text/css')
        ->header('Cache-Control', 'public, max-age=300');
})->name('pages.styles');

Route::get('/p/{page}', [PageController::class, 'preview'])->name('page.preview');