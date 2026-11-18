<?php

namespace App\Console\Commands;

use App\Models\FormSubmission;
use App\Services\Forms\FormMailer;
use Illuminate\Console\Command;
use Illuminate\Support\Str;
use Throwable;

class SendPendingFormMails extends Command
{
    protected $signature = 'forms:send-pending-mails {--limit=50} {--retry-failed}';

    protected $description = 'Envía los correos pendientes de las respuestas de formularios';

    private const CHANNELS = [
        'notify' => 'sendNotify',
        'confirmation' => 'sendConfirmation',
    ];

    public function handle(FormMailer $mailer): int
    {
        if ($this->option('retry-failed')) {
            foreach (array_keys(self::CHANNELS) as $channel) {
                FormSubmission::where("{$channel}_status", 'failed')->update(["{$channel}_status" => 'pending']);
            }
        }

        $sent = 0;
        $failed = 0;

        FormSubmission::query()
            ->with(['form', 'version'])
            ->where(fn ($query) => $query->where('notify_status', 'pending')->orWhere('confirmation_status', 'pending'))
            ->orderBy('id')
            ->limit((int) $this->option('limit'))
            ->get()
            ->each(function (FormSubmission $submission) use ($mailer, &$sent, &$failed) {
                foreach (self::CHANNELS as $channel => $method) {
                    $column = "{$channel}_status";

                    if ($submission->{$column} !== 'pending') {
                        continue;
                    }

                    try {
                        $mailer->{$method}($submission);
                        $submission->{$column} = 'sent';
                        $sent++;
                    } catch (Throwable $exception) {
                        $submission->{$column} = 'failed';
                        $submission->mail_error = Str::limit(
                            trim(($submission->mail_error ? $submission->mail_error . "\n" : '') . "{$channel}: " . $exception->getMessage()),
                            1000,
                            '',
                        );
                        $failed++;
                    }

                    $submission->save();
                }
            });

        $this->info("Enviados: {$sent}. Fallidos: {$failed}.");

        return self::SUCCESS;
    }
}