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