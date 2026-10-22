<?php

namespace App\Enums;

enum FormFieldType: string
{
    case Text = 'text';
    case ProperName = 'proper_name';
    case Dui = 'dui';
    case Nit = 'nit';
    case PhoneSv = 'phone_sv';
    case PhoneIntl = 'phone_intl';
    case Email = 'email';
    case Integer = 'integer';
    case Decimal = 'decimal';
    case Textarea = 'textarea';
    case Select = 'select';
    case CheckboxGroup = 'checkbox_group';
    case Consent = 'consent';
    case Location = 'location';

    public function label(): string
    {
        return match ($this) {
            self::Text => 'Texto libre',
            self::ProperName => 'Nombre propio',
            self::Dui => 'DUI',
            self::Nit => 'NIT',
            self::PhoneSv => 'Teléfono nacional',
            self::PhoneIntl => 'Teléfono internacional',
            self::Email => 'Correo electrónico',
            self::Integer => 'Número entero',
            self::Decimal => 'Número decimal',
            self::Textarea => 'Área de texto',
            self::Select => 'Lista desplegable',
            self::CheckboxGroup => 'Casillas de selección',
            self::Consent => 'Consentimiento',
            self::Location => 'Departamento y municipio',
        };
    }

    public function hasOptions(): bool
    {
        return in_array($this, [self::Select, self::CheckboxGroup], true);
    }

    public function forcesFullWidth(): bool
    {
        return in_array($this, [self::Textarea, self::CheckboxGroup, self::Consent, self::Location], true);
    }
}
