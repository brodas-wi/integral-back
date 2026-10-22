<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormSubmission;
use App\Services\Forms\FormSubmissionExporter;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\View\View;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FormSubmissionController extends Controller
{
    public function index(Request $request, Form $form): View
    {
        $filters = $this->filters($request);

        $submissions = $form->submissions()
            ->filter($filters)
            ->latest('created_at')
            ->paginate((int) ($filters['per_page'] ?? 20))
            ->withQueryString();

        return view('forms.submissions.index', [
            'form' => $form,
            'submissions' => $submissions,
            'hasFilters' => collect($filters)->except('per_page')->filter()->isNotEmpty(),
        ]);
    }

    public function show(Form $form, FormSubmission $submission): View
    {
        $this->ensureBelongs($form, $submission);

        $submission->load('version:id,form_id,version');

        return view('forms.submissions.show', compact('form', 'submission'));
    }

    public function export(Request $request, Form $form, FormSubmissionExporter $exporter): StreamedResponse
    {
        $filters = $this->filters($request);
        $query = $form->submissions()->filter($filters);

        $name = Str::limit($form->slug, 60, '') . '-respuestas-' . now()->format('Ymd-His') . '.csv';

        return response()->streamDownload(
            fn() => $exporter->write($form, $query),
            $name,
            ['Content-Type' => 'text/csv; charset=UTF-8'],
        );
    }

    private function filters(Request $request): array
    {
        return $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date'],
            'per_page' => ['nullable', 'in:10,20,50'],
        ]);
    }

    private function ensureBelongs(Form $form, FormSubmission $submission): void
    {
        abort_unless($submission->form_id === $form->id, 404);
    }
}
