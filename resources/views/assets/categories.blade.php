@extends('layouts.admin')

@section('title', 'Categorías de Activos')
@section('page-title', 'Categorías de Activos')

@section('header-actions')
    <a href="{{ route('assets.index') }}" class="btn-outline inline-flex items-center">
        <i class="ri-arrow-left-line mr-2"></i>Volver a Activos
    </a>
@endsection

@section('content')
    <div class="max-w-3xl">
        <div class="card">
            <p class="text-sm text-gray-600 mb-4">
                Las categorías se crean automáticamente al registrar un activo. Aquí puedes renombrarlas o eliminarlas
                (solo si no tienen activos asociados).
            </p>

            @if ($categories->count() > 0)
                <div class="divide-y divide-gray-100">
                    @foreach ($categories as $category)
                        <div class="py-3 flex items-center gap-3" data-category-row="{{ $category->id }}">
                            <form method="POST" action="{{ route('asset-categories.update', $category) }}"
                                class="flex-1 flex items-center gap-2" data-category-form>
                                @csrf
                                @method('PUT')
                                <input type="text" name="name" value="{{ $category->name }}"
                                    class="input-field flex-1">
                                <button type="submit" class="btn-outline btn-sm whitespace-nowrap">
                                    <i class="ri-save-line mr-1"></i>Guardar
                                </button>
                            </form>

                            <span class="badge badge-info whitespace-nowrap">{{ $category->assets_count }} activo(s)</span>

                            <form method="POST" action="{{ route('asset-categories.destroy', $category) }}"
                                data-category-delete-form data-count="{{ $category->assets_count }}">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn-secondary btn-sm text-red-600" title="Eliminar categoría">
                                    <i class="ri-delete-bin-line"></i>
                                </button>
                            </form>
                        </div>
                    @endforeach
                </div>

                @if ($categories->hasPages())
                    <div class="mt-6">{{ $categories->links() }}</div>
                @endif
            @else
                <p class="text-gray-500 text-center py-8">Aún no hay categorías creadas.</p>
            @endif
        </div>
    </div>
@endsection

@push('scripts')
    @vite('resources/js/views/assets/categories.js')
@endpush
