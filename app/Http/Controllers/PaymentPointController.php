<?php

namespace App\Http\Controllers;

use App\Data\ElSalvadorGeography;
use App\Http\Requests\GeocodeAddressRequest;
use App\Http\Requests\ImportPaymentPointsRequest;
use App\Http\Requests\StorePaymentPointRequest;
use App\Http\Requests\UpdatePaymentPointRequest;
use App\Models\PaymentPoint;
use App\Services\GeolocationService;
use App\Services\PaymentPointService;
use App\Services\PaymentPointImportService;
use App\Services\PaymentPointExportService;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;

class PaymentPointController extends Controller
{
    use AuthorizesRequests;

    public function __construct(
        protected PaymentPointService $paymentPointService,
        protected GeolocationService $geolocationService,
        protected PaymentPointImportService $importService,
        protected PaymentPointExportService $exportService
    ) {}

    public function index(Request $request): View
    {
        $filters = $request->only(['search', 'correspondent', 'zone', 'department', 'municipality', 'status']);

        $paymentPoints = $this->paymentPointService
            ->buildFilteredQuery($filters)
            ->paginate(20)
            ->withQueryString();

        $stats = PaymentPoint::getBasicStats();

        return view('payment-points.index', [
            'paymentPoints' => $paymentPoints,
            'correspondents' => PaymentPoint::getCorrespondents(),
            'zones' => ElSalvadorGeography::zones(),
            'departments' => $this->paymentPointService->getExistingDepartments(),
            'municipalities' => $this->paymentPointService->getExistingMunicipalities(),
            'stats' => $stats,
        ]);
    }

    public function create(): View
    {
        return view('payment-points.create', [
            'correspondents' => PaymentPoint::getCorrespondents(),
            'departments' => ElSalvadorGeography::departments(),
            'zones' => ElSalvadorGeography::zones(),
        ]);
    }

    public function store(StorePaymentPointRequest $request): RedirectResponse
    {
        try {
            $paymentPoint = $this->paymentPointService->create($request->validated());

            return redirect()
                ->route('payment-points.index')
                ->with('success', 'Punto de pago creado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error creating payment point', [
                'error' => $e->getMessage(),
                'data' => $request->validated(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al crear el punto de pago: ' . $e->getMessage());
        }
    }

    public function show(PaymentPoint $paymentPoint): View
    {
        $paymentPoint->load(['creator', 'updater']);

        return view('payment-points.show', compact('paymentPoint'));
    }

    public function edit(PaymentPoint $paymentPoint): View
    {
        return view('payment-points.edit', [
            'paymentPoint' => $paymentPoint,
            'correspondents' => PaymentPoint::getCorrespondents(),
            'departments' => ElSalvadorGeography::departments(),
            'zones' => ElSalvadorGeography::zones(),
        ]);
    }

    public function update(UpdatePaymentPointRequest $request, PaymentPoint $paymentPoint): RedirectResponse
    {
        try {
            $this->paymentPointService->update($paymentPoint, $request->validated());

            return redirect()
                ->route('payment-points.index')
                ->with('success', 'Punto de pago actualizado exitosamente');
        } catch (\Exception $e) {
            Log::error('Error updating payment point', [
                'error' => $e->getMessage(),
                'payment_point_id' => $paymentPoint->id,
                'data' => $request->validated(),
            ]);

            return back()
                ->withInput()
                ->with('error', 'Error al actualizar el punto de pago: ' . $e->getMessage());
        }
    }

    public function destroy(PaymentPoint $paymentPoint): JsonResponse|RedirectResponse
    {
        $this->authorize('payment_points.delete', 'payment_points.manage');

        try {
            $identifier = "{$paymentPoint->affiliate} - {$paymentPoint->branch}";
            $this->paymentPointService->delete($paymentPoint);

            if ($this->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => "Punto de pago '{$identifier}' eliminado exitosamente",
                ]);
            }

            return redirect()
                ->route('payment-points.index')
                ->with('success', "Punto de pago '{$identifier}' eliminado exitosamente");
        } catch (\Exception $e) {
            Log::error('Error deleting payment point', [
                'error' => $e->getMessage(),
                'payment_point_id' => $paymentPoint->id,
            ]);

            if ($this->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Error al eliminar el punto de pago',
                ], 500);
            }

            return redirect()
                ->route('payment-points.index')
                ->with('error', 'Error al eliminar el punto de pago');
        }
    }

    public function importForm(): View
    {
        return view('payment-points.import', [
            'expectedHeaders' => $this->importService->getExpectedHeaders(),
            'sampleData' => $this->importService->getSampleData(),
        ]);
    }

    public function import(ImportPaymentPointsRequest $request): JsonResponse|RedirectResponse
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

            $message = "Se importaron {$result['imported']} puntos de pago exitosamente.";

            if ($result['skipped'] > 0) {
                $message .= " Se omitieron {$result['skipped']} registros.";
            }

            if (count($result['duplicates']) > 0) {
                $message .= " Se encontraron " . count($result['duplicates']) . " duplicados.";
            }

            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => $message,
                    'data' => $result,
                    'redirect' => route('payment-points.index'),
                ]);
            }

            return redirect()
                ->route('payment-points.index')
                ->with('success', $message)
                ->with('info', 'Las coordenadas pueden agregarse editando cada punto individualmente.')
                ->with('import_errors', $result['errors'])
                ->with('import_duplicates', $result['duplicates']);
        } catch (\Exception $e) {
            Log::error('Payment point import error', [
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

    public function export(Request $request)
    {
        try {
            $filters = $request->only(['correspondent', 'department', 'municipality', 'status']);

            $filePath = $this->exportService->export($filters);

            return response()->download($filePath)->deleteFileAfterSend(true);
        } catch (\Exception $e) {
            Log::error('Error exporting payment points', [
                'error' => $e->getMessage(),
            ]);

            return back()->with('error', 'Error al exportar los puntos de pago');
        }
    }

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

    public function updateCoordinates(Request $request, PaymentPoint $paymentPoint): JsonResponse
    {
        $request->validate([
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
        ]);

        try {
            $paymentPoint->update([
                'latitude' => $request->input('latitude'),
                'longitude' => $request->input('longitude'),
                'updated_by' => auth()->id(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Coordenadas actualizadas',
            ]);
        } catch (\Exception $e) {
            Log::error('Error updating coordinates', [
                'error' => $e->getMessage(),
                'payment_point_id' => $paymentPoint->id,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar coordenadas',
            ], 500);
        }
    }

    public function getMunicipalities(Request $request): JsonResponse
    {
        $department = $request->input('department');
        $municipalities = ElSalvadorGeography::municipalities($department);

        return response()->json([
            'success' => true,
            'municipalities' => $municipalities,
        ]);
    }

    public function apiIndex(Request $request): JsonResponse
    {
        $filters = array_merge(
            $request->only(['search', 'correspondent', 'department']),
            ['status' => 'active']
        );

        $paymentPoints = $this->paymentPointService
            ->buildFilteredQuery($filters)
            ->withCoordinates()
            ->get()
            ->map(fn($point) => [
                'id' => $point->id,
                'correspondent' => $point->correspondent,
                'affiliate' => $point->affiliate,
                'branch' => $point->branch,
                'address' => $point->address,
                'municipality' => $point->municipality,
                'department' => $point->department,
                'zone' => $point->zone,
                'latitude' => (float) $point->latitude,
                'longitude' => (float) $point->longitude,
            ]);

        return response()->json([
            'success' => true,
            'payment_points' => $paymentPoints,
        ]);
    }

    protected function expectsJson(): bool
    {
        return request()->expectsJson() || request()->ajax();
    }
}
