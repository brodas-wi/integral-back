@props(['title', 'count'])

<div class="flex items-center gap-3">
    <span>{{ $title }}</span>
    <x-stats-badge :count="$count" />
</div>