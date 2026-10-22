<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class FormSubmission extends Model
{
    use SoftDeletes;

    public const STATUS_NEW = 'new';
    public const STATUS_REVIEWED = 'reviewed';
    public const STATUS_ARCHIVED = 'archived';

    public const STATUSES = [
        self::STATUS_NEW,
        self::STATUS_REVIEWED,
        self::STATUS_ARCHIVED,
    ];

    protected $fillable = [
        'uuid',
        'form_id',
        'form_version_id',
        'answers',
        'email',
        'search_text',
        'status',
        'notes',
        'source_url',
        'ip_address',
        'user_agent',
        'notify_status',
        'confirmation_status',
        'mail_error',
        'reviewed_by',
        'reviewed_at',
    ];

    protected $casts = [
        'answers' => 'array',
        'reviewed_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (FormSubmission $submission) {
            if (blank($submission->uuid)) {
                $submission->uuid = (string) Str::uuid();
            }
        });
    }

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class)->withTrashed();
    }

    public function version(): BelongsTo
    {
        return $this->belongsTo(FormVersion::class, 'form_version_id');
    }

    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }
}
