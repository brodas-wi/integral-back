<?php

namespace App\Http\Controllers;

use App\Data\ElSalvadorGeography;
use App\Http\Requests\GeocodeAddressRequest;
use App\Http\Requests\ImportAgenciesRequest;
use App\Http\Requests\StoreAgencyRequest;
use App\Http\Requests\UpdateAgencyRequest;
use App\Models\Agency;
use App\Services\AgencyImportService;
use App\Services\AgencyExportService;
use App\Services\AgencyService;
use App\Services\GeolocationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class AgencyController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        protected AgencyService $agencyService,
        protected GeolocationService $geolocationService,
        protected AgencyImportService $importService,
        protected AgencyExportService $exportService
    ) {}

    /**
     * Display a listing of agencies
     */
    public function index(Request $request): View
    {
        $filters = $request->only(['search', 'zone', 'department', 'municipality', 'status']);

        $agencies = $this->agencyService
            ->buildFilteredQuery($filters)
            ->paginate(20)
            ->withQueryString();

        return view('agencies.index', [
            'agencies' => $agencies,
            'zones' => ElSalvadorGeography::zones(),
            'departments' => $this->agencyService->getExistingDepartments(),
            'municipalities' => $this->agencyService->getExistingMunicipalities(),
            'stats' => $this->agencyService->getStatistics(),
        ]);
    }

    /**
     * Show the form for creating a new agency
     */
    public function create(): View
    {
        return view('agencies.create', [
            'departments' => ElSalvadorGeography::departments(),
            'zones' => ElSalvadorGeography::zones(),
        ]);
    }

    /**
     * Store a newly created agency
     */
    public function store(StoreAgencyRequest $request): RedirectResponse
    {
        try {
            $agency = $this->agencyService->create($request->validated());

            return redirect()
                ->route('agencies.index')
                ->with('success', 'Agencia creada exitosamente');
        } catch (\Exception $e) {
            Log::error('Error creating agency', [
                'error' => $e->getMessage(),
                'data' => $request->validated(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al crear la agencia: ' . $e->getMessage());
        }
    }

    /**
     * Display the specified agency
     */
    public function show(Agency $agency): View
    {
        $agency->load(['phones', 'creator']);

        return view('agencies.show', compact('agency'));
    }

    /**
     * Show the form for editing the specified agency
     */
    public function edit(Agency $agency): View
    {
        $agency->load('phones');

        return view('agencies.edit', [
            'agency' => $agency,
            'departments' => ElSalvadorGeography::departments(),
            'zones' => ElSalvadorGeography::zones(),
        ]);
    }

    /**
     * Update the specified agency
     */
    public function update(UpdateAgencyRequest $request, Agency $agency): RedirectResponse
    {
        try {
            $this->agencyService->update($agency, $request->validated());

            return redirect()
                ->route('agencies.index')
                ->with('success', 'Agencia actualizada exitosamente');
        } catch (\Exception $e) {
            Log::error('Error updating agency', [
                'error' => $e->getMessage(),
                'agency_id' => $agency->id,
                'data' => $request->validated(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al actualizar la agencia: ' . $e->getMessage());
        }
    }

    /**
     * Remove the specified agency
     */
    public function destroy(Agency $agency): JsonResponse|RedirectResponse
    {
        $this->authorize('agencies.delete', 'agencies.manage');

        try {
            $name = $agency->name;
            $this->agencyService->delete($agency);

            if ($this->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => "Agencia '{$name}' eliminada exitosamente",
                ]);
            }

            return redirect()
                ->route('agencies.index')
                ->with('success', "Agencia '{$name}' eliminada exitosamente");
        } catch (\Exception $e) {
            Log::error('Error deleting agency', [
                'error' => $e->getMessage(),
                'agency_id' => $agency->id,
            ]);

            if ($this->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al eliminar la agencia',
                ], 500);
            }

            return redirect()
                ->route('agencies.index')
                ->with('error', 'Error al eliminar la agencia');
        }
    }

    /**
     * Update agency coordinates
     */
    public function updateCoordinates(Request $request, Agency $agency): JsonResponse
    {
        $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
        ]);

        try {
            $agency->update([
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'updated_by' => auth()->id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Coordenadas actualizadas',
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating agency coordinates', [
                'error' => $e->getMessage(),
                'agency_id' => $agency->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar coordenadas',
            ], 500);
        }
    }

    /**
     * Show the import form
     */
    public function importForm(): View
    {
        return view('agencies.import', [
            'expectedHeaders' => $this->importService->getExpectedHeaders(),
            'sampleData' => $this->importService->getSampleData(),
        ]);
    }

    /**
     * Process the import file
     */
    public function import(ImportAgenciesRequest $request): JsonResponse|RedirectResponse
    {
        try {
            $file = $request->file('file');

            $result = $this->importService->import($file->getRealPath());

            if (!$result['success']) {
                if ($request->expectsJson()) {
                    return response()->json($result, 400);
                }
                return back()->with('error', $result['message']);
            }

            $message = "Se importaron {$result['imported']} agencias exitosamente.";

            $details = [];
            if ($result['skipped'] > 0) {
                $details[] = "{$result['skipped']} registros omitidos";
            }
            if (count($result['duplicates']) > 0) {
                $details[] = count($result['duplicates']) . " duplicados encontrados";
            }
            if (count($result['errors']) > 0) {
                $details[] = count($result['errors']) . " errores encontrados";
            }

            if (!empty($details)) {
                $message .= " (" . implode(', ', $details) . ")";
            }

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => $message,
                    'data' => $result,
                    'redirect' => route('agencies.index'),
                ]);
            }

            return redirect()
                ->route('agencies.index')
                ->with('success', $message);
        } catch (\Exception $e) {
            Log::error('Agency import error', [
                'error' => $e->getMessage(),
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al procesar el archivo: ' . $e->getMessage(),
                ], 500);
            }

            return back()->with('error', 'Error al procesar el archivo');
        }
    }

    /**
     * Export agencies to Excel
     */
    public function export(Request $request)
    {
        try {
            $filters = $request->only(['zone', 'department', 'municipality', 'status']);

            $filePath = $this->exportService->export($filters);

            return response()->download($filePath)->deleteFileAfterSend(true);
        } catch (\Exception $e) {
            Log::error('Error exporting agencies', [
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Error al exportar las agencias');
        }
    }

    /**
     * Geocode an address
     */
    public function geocode(GeocodeAddressRequest $request): JsonResponse
    {
        try {
            $result = $this->geolocationService->geocode(
                $request->input('address'),
                $request->input('department'),
                $request->input('municipality')
            );

            if (!$result['success']) {
                return response()->json($result, 404);
            }

            return response()->json($result);
        } catch (\Exception $e) {
            Log::error('Geocoding error', [
                'error' => $e->getMessage(),
                'address' => $request->input('address'),
                'department' => $request->input('department'),
                'municipality' => $request->input('municipality'),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al conectar con el servicio de geocodificación. Por favor intenta nuevamente.',
            ], 500);
        }
    }

    /**
     * Get municipalities by department
     */
    public function getMunicipalities(Request $request): JsonResponse
    {
        $department = $request->input('department');
        $municipalities = ElSalvadorGeography::municipalities($department);

        return response()->json([
            'success' => true,
            'municipalities' => $municipalities,
        ]);
    }

    /**
     * Get list of departments
     */
    public function getDepartmentsList(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'departments' => ElSalvadorGeography::departments(),
        ]);
    }

    /**
     * Get agencies for API (public or filtered)
     */
    public function apiIndex(Request $request): JsonResponse
    {
        $filters = array_merge(
            $request->only(['search', 'zone', 'department']),
            ['status' => 'active'] // Only active agencies for API
        );

        $agencies = $this->agencyService
            ->buildFilteredQuery($filters)
            ->withCoordinates()
            ->get()
            ->map(fn($agency) => [
                'id' => $agency->id,
                'name' => $agency->name,
                'address' => $agency->address,
                'municipality' => $agency->municipality,
                'department' => $agency->department,
                'zone' => $agency->zone,
                'schedule' => $agency->schedule,
                'latitude' => (float) $agency->latitude,
                'longitude' => (float) $agency->longitude,
                'phones' => $agency->formatted_phones,
            ]);

        return response()->json([
            'success' => true,
            'agencies' => $agencies,
        ]);
    }

    /**
     * Check if request expects JSON
     */
    protected function expectsJson(): bool
    {
        return request()->expectsJson() || request()->ajax();
    }
}
