@props(['count', 'label' => 'registros', 'singularLabel' => 'registro'])

<span {{ $attributes->merge(['class' => 'badge badge-info']) }}>
    {{ $count }} {{ $count === 1 ? $singularLabel : $label }}
</span>