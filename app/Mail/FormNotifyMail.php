<?php

namespace App\Mail;

use App\Models\FormSubmission;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class FormNotifyMail extends Mailable
{
    public function __construct(public FormSubmission $submission, public string $mailSubject, public ?array $custom = null)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->mailSubject,
            replyTo: $this->submission->email ? [new Address($this->submission->email)] : [],
        );
    }

    public function content(): Content
    {
        if ($this->custom) {
            return new Content(
                view: 'emails.forms.custom',
                text: 'emails.forms.custom-text',
                with: ['html' => $this->custom['html'], 'text' => $this->custom['text']],
            );
        }

        return new Content(
            view: 'emails.forms.notify',
            with: [
                'submission' => $this->submission,
                'form' => $this->submission->form,
                'url' => route('forms.submissions.show', [$this->submission->form, $this->submission]),
            ],
        );
    }
}