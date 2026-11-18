<?php

namespace App\Services\Forms;

use App\Mail\FormConfirmationMail;
use App\Mail\FormNotifyMail;
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

        Mail::to($recipients)->send(new FormNotifyMail(
            $submission,
            $subject,
            $this->custom($settings['body_html'] ?? null, $submission, true),
        ));
    }

    public function sendConfirmation(FormSubmission $submission): void
    {
        if (blank($submission->email)) {
            throw new RuntimeException('La respuesta no tiene correo del usuario.');
        }

        $settings = $submission->version->settings['emails']['confirmation'] ?? [];

        Mail::to($submission->email)->send(new FormConfirmationMail(
            $this->subject($settings['subject'] ?? 'Hemos recibido tu solicitud', $submission),
            $this->render($settings['body'] ?? '', $submission),
            $this->custom($settings['body_html'] ?? null, $submission, false),
        ));
    }

    private function custom(?string $template, FormSubmission $submission, bool $notify): ?array
    {
        if (blank($template)) {
            return null;
        }

        $url = $notify ? route('forms.submissions.show', [$submission->form, $submission]) : '';
        $values = $this->variables($submission);

        $html = $this->replace($template, array_map('e', $values) + [
            'answers' => view('emails.forms.answers', ['submission' => $submission])->render(),
            'admin_url' => e($url),
        ]);

        $text = $this->replace($this->toText($template), $values + [
            'answers' => $this->answersText($submission),
            'admin_url' => $url,
        ]);

        return ['html' => $html, 'text' => $text];
    }

    private function replace(string $template, array $variables): string
    {
        return preg_replace_callback(
            '/\{\{\s*([A-Za-z0-9_]+)\s*\}\}/',
            fn (array $match) => $variables[$match[1]] ?? '',
            $template,
        ) ?? $template;
    }

    private function toText(string $html): string
    {
        $text = preg_replace('/<a\s[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/is', '$2 ($1)', $html) ?? $html;
        $text = preg_replace('/<\s*br\s*\/?>/i', "\n", $text) ?? $text;
        $text = preg_replace('/<\/(p|div|h[1-6]|li|tr|table)>/i', "\n", $text) ?? $text;
        $text = html_entity_decode(strip_tags($text), ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = preg_replace('/^[ \t]+/m', '', $text) ?? $text;

        return trim(preg_replace("/\n{3,}/", "\n\n", $text) ?? $text);
    }

    private function answersText(FormSubmission $submission): string
    {
        return collect($submission->answers)
            ->map(fn (array $answer) => $answer['label'] . ': ' . (($answer['display'] ?? '') !== '' ? $answer['display'] : '—'))
            ->implode("\n");
    }

    private function subject(string $template, FormSubmission $submission): string
    {
        return trim(preg_replace('/\s+/', ' ', $this->render($template, $submission)) ?? '');
    }

    private function render(string $template, FormSubmission $submission): string
    {
        $variables = $this->variables($submission);

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