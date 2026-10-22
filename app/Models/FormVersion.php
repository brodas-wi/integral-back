<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use LogicException;

class FormVersion extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = [
        'form_id',
        'version',
        'title',
        'description',
        'submit_label',
        'fields',
        'settings',
        'content_hash',
        'created_by',
    ];

    protected $casts = [
        'version' => 'integer',
        'fields' => 'array',
        'settings' => 'array',
    ];

    protected static function booted(): void
    {
        static::updating(fn() => throw new LogicException('Las versiones de formulario son inmutables.'));
        static::deleting(fn() => throw new LogicException('Las versiones de formulario no se pueden eliminar.'));
    }

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class)->withTrashed();
    }

    public function submissions(): HasMany
    {
        return $this->hasMany(FormSubmission::class);
    }

    public function fieldMap(): array
    {
        return collect($this->fields ?? [])->keyBy('key')->all();
    }

    public function publicPayload(): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'submit_label' => $this->submit_label,
            'fields' => $this->fields,
            'thanks' => $this->settings['thanks'] ?? [],
        ];
    }
}
