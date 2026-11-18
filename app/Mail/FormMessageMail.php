<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;

class FormMessageMail extends Mailable
{
    public function __construct(
        public string $mailSubject,
        public string $messageBody,
        public ?string $replyToAddress = null,
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: $this->mailSubject,
            replyTo: $this->replyToAddress ? [new Address($this->replyToAddress)] : [],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.forms.message',
            text: 'emails.forms.message-text',
            with: ['messageBody' => $this->messageBody],
        );
    }
}