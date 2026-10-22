<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormSubmission;
use Illuminate\Http\Request;
use Illuminate\View\View;

class FormSubmissionController extends Controller
{
    public function index(Request $request, Form $form): View
    {
        $filters = $request->validate([
            'search' => ['nullable', 'string', 'max:100'],
            'date_from' => ['nullable', 'date'],
            'date_to' => ['nullable', 'date'],
            'per_page' => ['nullable', 'in:10,20,50'],
        ]);

        $submissions = $form->submissions()
            ->when($filters['search'] ?? null, function ($query, $search) {
                $term = '%' . addcslashes(trim($search), '%_\\') . '%';
                $query->where(fn ($w) => $w->where('email', 'like', $term)->orWhere('search_text', 'like', $term));
            })
            ->when($filters['date_from'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '>=', $date))
            ->when($filters['date_to'] ?? null, fn ($query, $date) => $query->whereDate('created_at', '<=', $date))
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

    private function ensureBelongs(Form $form, FormSubmission $submission): void
    {
        abort_unless($submission->form_id === $form->id, 404);
    }
}