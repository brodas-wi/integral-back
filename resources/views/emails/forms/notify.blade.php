<!DOCTYPE html>
<html lang="es">

<body style="margin:0;padding:24px;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;padding:28px;">
        <h2 style="margin:0 0 4px;color:#0d3f6a;font-size:20px;">Nueva respuesta recibida</h2>
        <p style="margin:0 0 20px;color:#6b7280;font-size:13px;">
            {{ $form->name }} · {{ $submission->created_at->format('d/m/Y H:i') }}
        </p>

        @if ($submission->correlative)
            <p style="margin:0 0 16px;font-size:14px;">Correlativo: <strong>{{ $submission->correlative }}</strong></p>
        @endif

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
            style="border-collapse:collapse;font-size:14px;">
            @foreach ($submission->answers as $answer)
                <tr>
                    <td style="padding:10px 12px 10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;width:40%;vertical-align:top;">
                        {{ $answer['label'] }}
                    </td>
                    <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;font-weight:bold;color:#0d3f6a;vertical-align:top;">
                        @if (($answer['display'] ?? '') !== '')
                            {!! nl2br(e($answer['display'])) !!}
                        @else
                            —
                        @endif
                    </td>
                </tr>
            @endforeach
        </table>

        <p style="margin:24px 0 0;">
            <a href="{{ $url }}"
                style="display:inline-block;background:#f0872a;color:#ffffff;text-decoration:none;padding:10px 22px;border-radius:9999px;font-size:14px;font-weight:bold;">
                Ver respuesta en el CMS
            </a>
        </p>
    </div>
</body>

</html>