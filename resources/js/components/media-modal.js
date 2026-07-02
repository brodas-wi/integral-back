import { MediaService } from "../services/media-service";

/**
 * MediaModal - Reusable modal component for media selection
 */
export class MediaModal {
    constructor() {
        this.mediaService = new MediaService();
        this.modal = null;
        this.isOpen = false;
        this.selectedMedia = null;
        this.onSelectCallback = null;
        this.currentFilters = {
            type: "image", // Default to images for now
            search: "",
            page: 1,
        };
    }

    async open(onSelect, options = {}) {
        if (this.isOpen) return;

        this.onSelectCallback = onSelect;
        this.currentFilters = {
            type: "image",
            search: "",
            page: 1,
            ...options.filters,
        };

        if (!this.modal) {
            this.createModal();
        }

        const typeFilterContainer = this.modal.querySelector(
            "#type-filter-container",
        );
        const typeFilter = this.modal.querySelector("#media-type-filter");

        const typeLabel = {
            image: "imagen",
            document: "documento",
        };

        const header = this.modal.querySelector(".media-modal-header h2");
        const subheader = this.modal.querySelector(".media-modal-header p");

        if (options.filters && options.filters.type) {
            typeFilterContainer.classList.add("hidden");
            typeFilter.value = options.filters.type;
            const label = typeLabel[options.filters.type] ?? "archivo";
            if (header) header.textContent = `Seleccionar ${label}`;
            if (subheader)
                subheader.textContent = `Elige un ${label} de tu biblioteca de medios`;
        } else {
            typeFilterContainer.classList.remove("hidden");
            if (header) header.textContent = "Seleccionar archivo";
            if (subheader)
                subheader.textContent =
                    "Elige un archivo de tu biblioteca de medios";
        }

        this.isOpen = true;
        this.modal.classList.add("modal-open");
        document.body.style.overflow = "hidden";

        const confirmBtn = this.modal.querySelector("#confirm-select");
        if (confirmBtn) confirmBtn.disabled = true;

        const selectedInfo = this.modal.querySelector("#selected-info");
        if (selectedInfo) selectedInfo.textContent = "";

        this.modal.querySelectorAll("[data-media-id]").forEach((el) => {
            el.classList.remove("selected");
        });

        await this.loadMedia();
    }

    close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        this.selectedMedia = null;
        setTimeout(() => {
            this.modal.classList.remove("modal-open");
            document.body.style.overflow = "";
        }, 150);
    }

    createModal() {
        const modalHTML = `
            <div id="media-modal">
                <div class="media-modal-backdrop" data-modal-close></div>
                <div class="media-modal-container">
                    <div class="media-modal-header">
                        <div>
                            <h2>Seleccionar archivo</h2>
                            <p>Elige un archivo de tu biblioteca de medios</p>
                        </div>
                        <button type="button" class="media-modal-close" data-modal-close>
                            <i class="ri-close-line"></i>
                        </button>
                    </div>

                    <div class="media-modal-filters">
                        <div class="media-modal-search-wrap">
                            <i class="ri-search-line"></i>
                            <input type="text" id="media-search" placeholder="Buscar por nombre...">
                        </div>
                        <div id="type-filter-container">
                            <select id="media-type-filter">
                                <option value="">Todos</option>
                                <option value="image" selected>Imágenes</option>
                                <option value="document">Documentos</option>
                            </select>
                        </div>
                        <button type="button" id="clear-filters" class="mm-btn mm-btn-outline">
                            <i class="ri-filter-off-line"></i> Limpiar
                        </button>
                    </div>

                    <div id="media-stats" class="media-modal-stats"></div>

                    <div class="media-modal-body">
                        <div id="media-grid" class="media-modal-grid"></div>
                        <div id="media-loading" class="media-modal-state">
                            <div class="mm-spinner"></div>
                            <p>Cargando archivos...</p>
                        </div>
                        <div id="media-empty" class="media-modal-state">
                            <i class="ri-folder-open-line"></i>
                            <p>No se encontraron archivos</p>
                            <p style="font-size:0.8rem;">Intenta ajustar los filtros o sube nuevos archivos</p>
                        </div>
                        <div id="media-error" class="media-modal-state">
                            <i class="ri-error-warning-line" style="color:#f87171;"></i>
                            <p style="color:#dc2626;">Error al cargar las imágenes</p>
                            <button type="button" id="retry-load" class="mm-btn mm-btn-primary">Reintentar</button>
                        </div>
                    </div>

                    <div id="media-pagination" class="media-modal-pagination">
                        <button type="button" id="prev-page" class="mm-btn mm-btn-outline" disabled>
                            <i class="ri-arrow-left-line"></i> Anterior
                        </button>
                        <span id="pagination-info" style="font-size:0.875rem;color:#6b7280;">
                            Página <strong id="current-page">1</strong> de <strong id="total-pages">1</strong>
                        </span>
                        <button type="button" id="next-page" class="mm-btn mm-btn-outline" disabled>
                            Siguiente <i class="ri-arrow-right-line"></i>
                        </button>
                    </div>

                    <div class="media-modal-footer">
                        <span class="media-modal-footer-info" id="selected-info"></span>
                        <div class="media-modal-footer-actions">
                            <button type="button" class="mm-btn mm-btn-ghost" data-modal-close>Cancelar</button>
                            <button type="button" id="confirm-select" class="mm-btn mm-btn-primary" disabled>
                                <i class="ri-check-line"></i> Seleccionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;

        document.body.insertAdjacentHTML("beforeend", modalHTML);
        this.modal = document.getElementById("media-modal");
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Close modal
        this.modal.querySelectorAll("[data-modal-close]").forEach((btn) => {
            btn.addEventListener("click", () => this.close());
        });

        // Search
        const searchInput = this.modal.querySelector("#media-search");
        let searchTimeout;
        searchInput.addEventListener("input", (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.currentFilters.search = e.target.value;
                this.currentFilters.page = 1;
                this.loadMedia();
            }, 300);
        });

        // Type filter
        const typeFilter = this.modal.querySelector("#media-type-filter");
        typeFilter.addEventListener("change", (e) => {
            this.currentFilters.type = e.target.value;
            this.currentFilters.page = 1;
            this.loadMedia();
        });

        // Clear filters
        this.modal
            .querySelector("#clear-filters")
            .addEventListener("click", () => {
                this.currentFilters = { type: "image", search: "", page: 1 };
                this.modal.querySelector("#media-search").value = "";
                this.modal.querySelector("#media-type-filter").value = "image";
                this.loadMedia();
            });

        // Pagination
        this.modal.querySelector("#prev-page").addEventListener("click", () => {
            if (this.currentFilters.page > 1) {
                this.currentFilters.page--;
                this.loadMedia();
            }
        });

        this.modal.querySelector("#next-page").addEventListener("click", () => {
            this.currentFilters.page++;
            this.loadMedia();
        });

        // Retry load
        this.modal
            .querySelector("#retry-load")
            .addEventListener("click", () => {
                this.loadMedia();
            });

        // Confirm selection
        this.modal
            .querySelector("#confirm-select")
            .addEventListener("click", () => {
                if (this.selectedMedia && this.onSelectCallback) {
                    this.onSelectCallback(this.selectedMedia);
                    this.close();
                }
            });

        // Close on escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isOpen) {
                this.close();
            }
        });
    }

    /**
     * Load media from API
     */
    async loadMedia() {
        const grid = this.modal.querySelector("#media-grid");
        const loading = this.modal.querySelector("#media-loading");
        const empty = this.modal.querySelector("#media-empty");
        const error = this.modal.querySelector("#media-error");

        // Show loading
        grid.classList.add("hidden");
        empty.classList.remove("visible");
        error.classList.remove("visible");
        loading.classList.add("visible");

        try {
            const data = await this.mediaService.fetchMedia(
                this.currentFilters,
            );

            // Update stats
            this.updateStats(data.stats);

            // Update pagination
            this.updatePagination(data.pagination);

            // Render media items
            if (data.items.length === 0) {
                loading.classList.remove("visible");
                empty.classList.add("visible");
            } else {
                this.renderMediaItems(data.items);
                loading.classList.remove("visible");
                grid.classList.remove("hidden");
            }
        } catch (err) {
            console.error("Error loading media:", err);
            loading.classList.remove("visible");
            error.classList.add("visible");
        }
    }

    /**
     * Update statistics display
     */
    updateStats(stats) {
        const statsContainer = this.modal.querySelector("#media-stats");
        if (!statsContainer) return;

        const type = this.currentFilters.type;
        let label = "archivos";
        if (type === "image") label = "imágenes";
        else if (type === "pdf") label = "PDFs";
        else if (type === "document") label = "documentos";

        const count =
            type === "image"
                ? stats.images
                : type === "document"
                  ? (stats.documents ?? stats.total)
                  : stats.total;

        statsContainer.innerHTML = `
            <div class="flex items-center gap-6 text-sm">
                <span class="text-gray-700">
                    <i class="ri-file-line mr-1"></i>
                    Total de ${label}: <strong>${count ?? 0}</strong>
                </span>
            </div>
        `;
    }

    /**
     * Update pagination controls
     */
    updatePagination(pagination) {
        const paginationEl = this.modal.querySelector("#media-pagination");
        const prevBtn = this.modal.querySelector("#prev-page");
        const nextBtn = this.modal.querySelector("#next-page");

        this.modal.querySelector("#current-page").textContent =
            pagination.current;
        this.modal.querySelector("#total-pages").textContent = pagination.total;

        prevBtn.disabled = pagination.current === 1;
        nextBtn.disabled = !pagination.hasMore;

        if (pagination.total > 1) {
            paginationEl.classList.add("visible");
        } else {
            paginationEl.classList.remove("visible");
        }
    }

    /**
     * Render media items in grid
     */
    renderMediaItems(items) {
        const grid = this.modal.querySelector("#media-grid");
        grid.innerHTML = "";

        items.forEach((item) => {
            const card = this.createMediaCard(item);
            grid.appendChild(card);
        });
    }

    getFileIconMeta(filename) {
        const ext = (filename.split(".").pop() || "").toLowerCase();

        const map = {
            pdf: { icon: "ri-file-pdf-2-fill", color: "#dc2626", bg: "#fef2f2" },
            xls: { icon: "ri-file-excel-2-fill", color: "#16a34a", bg: "#f0fdf4" },
            xlsx: { icon: "ri-file-excel-2-fill", color: "#16a34a", bg: "#f0fdf4" },
            doc: { icon: "ri-file-word-2-fill", color: "#2563eb", bg: "#eff6ff" },
            docx: { icon: "ri-file-word-2-fill", color: "#2563eb", bg: "#eff6ff" },
        };

        return map[ext] || { icon: "ri-file-text-fill", color: "#6b7280", bg: "#f3f4f6" };
    }

    /**
     * Create media card element
     */
    createMediaCard(media) {
        const card = document.createElement("div");
        card.className = "media-modal-card";
        card.dataset.mediaId = media.id;

        const isImage = media.type === "image";
        const extension = media.filename.split(".").pop().toUpperCase();

        let thumbContent;
        if (isImage) {
            thumbContent = `<img src="${media.url}" alt="${media.alt || media.filename}">`;
        } else {
            const iconMeta = this.getFileIconMeta(media.filename);
            thumbContent = `
                <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:${iconMeta.bg};">
                    <i class="${iconMeta.icon}" style="font-size:2.25rem;color:${iconMeta.color};"></i>
                </div>`;
        }

        card.innerHTML = `
            <div class="media-modal-card-thumb">
                ${thumbContent}
            </div>
            <div class="media-modal-card-info">
                <p title="${media.filename}">${media.filename}</p>
                <div class="media-modal-card-meta">
                    <span>${media.dimensions || media.size || ""}</span>
                    <span>${extension}</span>
                </div>
            </div>`;

        card.addEventListener("click", () => this.selectMedia(media, card));

        return card;
    }

    /**
     * Select a media item
     */
    selectMedia(media, cardElement) {
        this.modal.querySelectorAll("[data-media-id]").forEach((el) => {
            el.classList.remove("selected");
        });
        cardElement.classList.add("selected");

        this.selectedMedia = media;

        const selectedInfo = this.modal.querySelector("#selected-info");
        selectedInfo.textContent = `Seleccionado: ${media.filename}`;

        this.modal.querySelector("#confirm-select").disabled = false;
    }

    /**
     * Destroy modal and cleanup
     */
    destroy() {
        if (this.modal) {
            this.modal.remove();
            this.modal = null;
        }
        this.isOpen = false;
        this.selectedMedia = null;
        this.onSelectCallback = null;
    }
}
