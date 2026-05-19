<div id="media-picker-modal">
    <div class="media-picker-dialog">

        <div class="media-picker-header">
            <h3>Seleccionar imagen</h3>
            <button type="button" id="media-picker-close" class="media-picker-close-btn">
                <i class="ri-close-line text-xl"></i>
            </button>
        </div>

        <div class="media-picker-search-bar">
            <div class="media-picker-search-row">
                <input type="text" id="media-picker-search" placeholder="Buscar imagen..." class="input-field flex-1">
                <button type="button" id="media-picker-search-btn" class="btn-secondary whitespace-nowrap">
                    <i class="ri-search-line mr-2"></i>Buscar
                </button>
            </div>
            <p class="media-picker-search-hint">
                <i class="ri-information-line mr-1"></i>
                Se recomienda usar imágenes horizontales para mejor resultado como fondo de banner.
            </p>
        </div>

        <div class="media-picker-grid-wrapper">
            <div id="media-picker-grid">
                <div class="media-picker-empty">
                    <i class="ri-loader-4-line animate-spin text-3xl text-gray-400"></i>
                </div>
            </div>
        </div>

        <div id="media-picker-pagination" class="media-picker-pagination">
            <button type="button" id="media-picker-prev" class="btn-outline btn-sm">
                <i class="ri-arrow-left-s-line mr-1"></i>Anterior
            </button>
            <span id="media-picker-page-info" class="text-sm text-gray-500"></span>
            <button type="button" id="media-picker-next" class="btn-outline btn-sm">
                Siguiente<i class="ri-arrow-right-s-line ml-1"></i>
            </button>
        </div>

    </div>
</div>
