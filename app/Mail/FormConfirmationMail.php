<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class FormConfirmationMail extends Mailable
{
    public function __construct(public string $mailSubject, public string $messageBody, public ?array $custom = null)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(subject: $this->mailSubject);
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
            view: 'emails.forms.confirmation',
            with: ['messageBody' => $this->messageBody],
        );
    }
}