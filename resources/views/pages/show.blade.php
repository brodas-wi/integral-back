@extends('layouts.admin')

@section('title', 'Detalles de Página')
@section('page-title', 'Detalles de la Página')

@section('header-actions')
    <div class="flex items-center gap-2">
        <a href="{{ route('pages.index') }}" class="btn-outline btn-header-action">
            <i class="ri-arrow-left-line sm:mr-2"></i>
            <span class="btn-text">Volver</span>
            <span class="btn-tooltip">Volver</span>
        </a>
    </div>
@endsection

@section('content')
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 space-y-6">
            <div class="card">
                <div class="flex items-start justify-between mb-6">
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold text-secondary mb-2">{{ $page->title }}</h2>
                        <p class="text-sm text-gray-600 font-mono">{{ $page->slug }}</p>
                    </div>
                    <span class="badge {{ $page->is_published ? 'badge-success' : 'badge-warning' }} text-base">
                        <i class="ri-{{ $page->is_published ? 'eye' : 'eye-off' }}-line mr-1"></i>
                        {{ $page->is_published ? 'Publicada' : 'Borrador' }}
                    </span>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">URL Pública</label>
                        <div class="flex items-center gap-2">
                            <input type="text" value="{{ route('page.preview', $page->slug) }}" readonly
                                class="input-field flex-1 bg-gray-50">
                            <a href="{{ route('page.preview', $page->slug) }}" target="_blank"
                                class="btn-secondary whitespace-nowrap">
                                <i class="ri-external-link-line mr-1"></i>
                                Abrir
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3 class="text-lg font-bold text-secondary mb-4">Estadísticas de Contenido</h3>
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-xs text-gray-600 mb-1">HTML</div>
                        <div class="text-lg font-bold text-secondary">
                            {{ $page->html_content ? number_format(strlen($page->html_content)) : '0' }}
                            <span class="text-xs font-normal text-gray-600">caracteres</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-xs text-gray-600 mb-1">CSS</div>
                        <div class="text-lg font-bold text-secondary">
                            {{ $page->css_content ? number_format(strlen($page->css_content)) : '0' }}
                            <span class="text-xs font-normal text-gray-600">caracteres</span>
                        </div>
                    </div>
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="text-xs text-gray-600 mb-1">JavaScript</div>
                        <div class="text-lg font-bold text-secondary">
                            {{ $page->js_content ? number_format(strlen($page->js_content)) : '0' }}
                            <span class="text-xs font-normal text-gray-600">caracteres</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="space-y-6">
            <div class="card">
                <h3 class="text-lg font-bold text-secondary mb-4">Información</h3>
                <div class="space-y-3">
                    <div>
                        <div class="text-xs font-medium text-gray-600 mb-1">Creado por</div>
                        <div class="text-sm font-semibold text-secondary">
                            {{ $page->creator->name ?? 'N/A' }}
                        </div>
                    </div>
                    <div>
                        <div class="text-xs font-medium text-gray-600 mb-1">Fecha de creación</div>
                        <div class="text-sm font-semibold text-secondary">
                            {{ $page->created_at->format('d/m/Y H:i') }}
                        </div>
                    </div>
                    @if($page->editor)
                        <div>
                            <div class="text-xs font-medium text-gray-600 mb-1">Última edición por</div>
                            <div class="text-sm font-semibold text-secondary">
                                {{ $page->editor->name }}
                            </div>
                        </div>
                    @endif
                    <div>
                        <div class="text-xs font-medium text-gray-600 mb-1">Última actualización</div>
                        <div class="text-sm font-semibold text-secondary">
                            {{ $page->updated_at->format('d/m/Y H:i') }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <h3 class="text-lg font-bold text-secondary mb-4">Acciones</h3>
                <div class="space-y-2">
                    @canany(['pages.edit', 'pages.manage'])
                        <a href="{{ route('pages.edit', $page->slug) }}" class="btn-secondary btn-sm w-full">
                            <i class="ri-edit-line mr-2"></i>
                            Editar
                        </a>
                    @endcanany

                    @canany(['pages.publish', 'pages.manage'])
                        <button type="button"
                            onclick="togglePublishStatus('{{ $page->slug }}', {{ $page->is_published ? 'true' : 'false' }})"
                            class="btn-primary btn-sm w-full">
                            <i class="ri-{{ $page->is_published ? 'eye-off' : 'eye' }}-line mr-2"></i>
                            {{ $page->is_published ? 'Despublicar' : 'Publicar' }}
                        </button>
                    @endcanany

                    @canany(['pages.delete', 'pages.manage'])
                        <button type="button" onclick="confirmDeletePage('{{ $page->slug }}', '{{ addslashes($page->title) }}')"
                            class="btn-danger btn-sm w-full">
                            <i class="ri-delete-bin-line mr-2"></i>
                            Eliminar
                        </button>
                    @endcanany
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        // Toggle publish status
        function togglePublishStatus(slug, currentStatus) {
            if (typeof window.showConfirmModal !== 'function') {
                if (confirm(currentStatus ? '¿Despublicar página?' : '¿Publicar página?')) {
                    submitTogglePublish(slug);
                }
                return;
            }

            window.showConfirmModal({
                title: currentStatus ? '¿Despublicar página?' : '¿Publicar página?',
                message: currentStatus ?
                    'La página dejará de ser visible públicamente.' :
                    'La página será visible públicamente.',
                confirmText: currentStatus ? 'Despublicar' : 'Publicar',
                cancelText: 'Cancelar',
                type: 'warning',
                onConfirm: () => submitTogglePublish(slug)
            });
        }

        // Submit toggle publish
        async function submitTogglePublish(slug) {
            const csrfToken = document.querySelector('meta[name="csrf-token"]');

            try {
                const response = await fetch(`/pages/${slug}/toggle-publish`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken.getAttribute('content'),
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });

                const data = await response.json();

                if (data.success) {
                    if (typeof window.showNotification === 'function') {
                        window.showNotification(data.message, 'success');
                    }
                    setTimeout(() => window.location.reload(), 1000);
                }
            } catch (error) {
                if (typeof window.showNotification === 'function') {
                    window.showNotification('Error al cambiar el estado', 'error');
                }
            }
        }

        // Confirm delete
        function confirmDeletePage(slug, pageTitle) {
            if (typeof window.showConfirmModal !== 'function') {
                if (confirm(`¿Eliminar "${pageTitle}"?`)) {
                    deletePage(slug);
                }
                return;
            }

            window.showConfirmModal({
                title: '¿Eliminar página?',
                message: `¿Estás seguro de que deseas eliminar "${pageTitle}"? Esta acción no se puede deshacer.`,
                confirmText: 'Eliminar',
                cancelText: 'Cancelar',
                type: 'danger',
                onConfirm: () => deletePage(slug)
            });
        }

        // Delete page
        async function deletePage(slug) {
            const csrfToken = document.querySelector('meta[name="csrf-token"]');

            try {
                const response = await fetch(`/pages/${slug}`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRF-TOKEN': csrfToken.getAttribute('content'),
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json();

                if (data.success) {
                    if (typeof window.showNotification === 'function') {
                        window.showNotification(data.message, 'success');
                    }
                    setTimeout(() => window.location.href = '{{ route('pages.index') }}', 1000);
                }
            } catch (error) {
                if (typeof window.showNotification === 'function') {
                    window.showNotification('Error al eliminar', 'error');
                }
            }
        }

        window.togglePublishStatus = togglePublishStatus;
        window.confirmDeletePage = confirmDeletePage;
    </script>
@endpush