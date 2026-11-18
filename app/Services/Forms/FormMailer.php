<?php

namespace App\Services\Forms;

use App\Mail\FormMessageMail;
use App\Models\FormSubmission;
use Illuminate\Support\Facades\Mail;
use RuntimeException;

class FormMailer
{
    public function sendNotify(FormSubmission $submission): void
    {
        $settings = $submission->version->settings['emails']['notify'] ?? [];
        $recipients = $settings['recipients'] ?? [];

        if ($recipients === []) {
            throw new RuntimeException('El formulario no tiene destinatarios para el aviso interno.');
        }

        $subject = $this->subject($settings['subject'] ?? 'Nueva solicitud: {{form_title}}', $submission);

        $body = $this->render(
            $settings['body'] ?? FormSchemaNormalizer::DEFAULT_NOTIFY_BODY,
            $submission,
            $this->extras($submission, true),
        );

        Mail::to($recipients)->send(new FormMessageMail($subject, $body, $submission->email));
    }

    public function sendConfirmation(FormSubmission $submission): void
    {
        if (blank($submission->email)) {
            throw new RuntimeException('La respuesta no tiene correo del usuario.');
        }

        $settings = $submission->version->settings['emails']['confirmation'] ?? [];

        Mail::to($submission->email)->send(new FormMessageMail(
            $this->subject($settings['subject'] ?? 'Hemos recibido tu solicitud', $submission),
            $this->render($settings['body'] ?? '', $submission, $this->extras($submission, false)),
        ));
    }

    private function extras(FormSubmission $submission, bool $notify): array
    {
        $extras = [
            'answers' => collect($submission->answers)
                ->map(fn (array $answer) => $answer['label'] . ': ' . (($answer['display'] ?? '') !== '' ? $answer['display'] : '—'))
                ->implode("\n"),
        ];

        if ($notify) {
            $extras['admin_url'] = route('forms.submissions.show', [$submission->form, $submission]);
        }

        return $extras;
    }

    private function subject(string $template, FormSubmission $submission): string
    {
        return trim(preg_replace('/\s+/', ' ', $this->render($template, $submission)) ?? '');
    }

    private function render(string $template, FormSubmission $submission, array $extra = []): string
    {
        $variables = $this->variables($submission) + $extra;

        return preg_replace_callback(
            '/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/',
            fn (array $match) => $variables[$match[1]] ?? '',
            $template,
        ) ?? $template;
    }

    private function variables(FormSubmission $submission): array
    {
        $variables = [
            'form_title' => (string) $submission->version->title,
            'submission_id' => (string) $submission->id,
            'date' => $submission->created_at->format('d/m/Y H:i'),
            'correlative' => (string) ($submission->correlative ?? ''),
        ];

        foreach ($submission->answers ?? [] as $answer) {
            $variables[$answer['key']] = (string) ($answer['display'] ?? '');
        }

        return $variables;
    }
}