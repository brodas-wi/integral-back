const NEWS_GRID_STYLES = `
<style>
.ng-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.ng-section-heading{font-size:2.25rem;font-weight:800;color:#003B71;text-align:center;margin:0 0 2rem;}
.ng-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));gap:1.5rem;}
.ng-card{background:#ffffff;border-radius:1rem;padding:1.75rem;display:flex;flex-direction:column;gap:1rem;box-shadow:0 2px 12px rgba(0,59,113,0.08);transition:background 0.25s,box-shadow 0.25s;align-items:stretch;}
.ng-card:hover{background:#003B71;box-shadow:0 4px 24px rgba(0,59,113,0.22);}
.ng-card-image{width:100%;height:160px;border-radius:0.75rem;overflow:hidden;background:#f1f5f9;display:flex;align-items:center;justify-content:center;}
.ng-card-image img{width:100%;height:100%;object-fit:cover;display:block;}
.ng-card-body{display:flex;flex-direction:column;gap:0.5rem;flex:1;}
.ng-card-category{font-size:0.75rem;font-weight:700;color:#E97300;text-transform:uppercase;letter-spacing:0.03em;transition:color 0.25s;}
.ng-card:hover .ng-card-category{color:#ffffff;}
.ng-card-title{font-size:1rem;font-weight:700;color:#003B71;line-height:1.4;margin:0;transition:color 0.25s;}
.ng-card-desc{font-size:0.875rem;color:#003B71;line-height:1.6;margin:0;transition:color 0.25s;text-align:justify;}
.ng-card:hover .ng-card-title{color:#ffffff;}
.ng-card:hover .ng-card-desc{color:rgba(255,255,255,0.85);}
.ng-more-wrap{display:flex;justify-content:center;margin-top:2rem;}
.ng-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:9999px;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background 0.2s;}
.ng-more-btn:hover{background:#c96200;}
.ng-empty,.ng-loading,.ng-error{text-align:center;padding:2.5rem 1rem;color:#003B71;font-size:0.95rem;}
.ng-error{color:#dc2626;}
.ng-filters-row{display:flex;justify-content:center;margin-bottom:2rem;}
.ng-filter-select{padding:0.6rem 1.25rem;border-radius:0.5rem;border:1px solid #cbd5e1;font-size:0.9rem;color:#003B71;background:#fff;min-width:220px;}
.ng-pagination{display:flex;justify-content:center;align-items:center;gap:0.4rem;margin-top:2.5rem;flex-wrap:wrap;}
.ng-page-btn{min-width:2.25rem;height:2.25rem;padding:0 0.6rem;border-radius:0.5rem;border:1px solid #cbd5e1;background:#fff;color:#003B71;font-size:0.85rem;font-weight:600;cursor:pointer;transition:background 0.15s,color 0.15s;}
.ng-page-btn:hover:not(:disabled){background:#f0f4f8;}
.ng-page-btn.ng-page-active{background:#003B71;color:#fff;border-color:#003B71;}
.ng-page-btn:disabled{opacity:0.4;cursor:not-allowed;}
@media(max-width:1280px){.ng-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.ng-section{padding:2.5rem 1.5rem;}.ng-grid{grid-template-columns:1fr;}}
@media(max-width:480px){.ng-grid{grid-template-columns:1fr;}}
</style>`;

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    }[char]));
}

function buildNewsCard(item) {
    const image = item.featured_image
        ? `<img src="${escapeHtml(item.featured_image)}" alt="${escapeHtml(item.title)}">`
        : `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:#94a3b8;font-size:2rem;"><i class="ri-image-line"></i></div>`;

    return `
<div class="ng-card">
    <div class="ng-card-image">${image}</div>
    <div class="ng-card-body">
        ${item.category ? `<span class="ng-card-category">${escapeHtml(item.category)}</span>` : ""}
        <h3 class="ng-card-title">${escapeHtml(item.title)}</h3>
        <p class="ng-card-desc">${escapeHtml(item.description)}</p>
    </div>
</div>`;
}

function getNewsApiUrl() {
    return document.querySelector('meta[name="api-news-url"]')?.content ?? null;
}

function getNewsCategoriesApiUrl() {
    return document.querySelector('meta[name="api-news-categories-url"]')?.content ?? null;
}

const NEWS_GRID_PREVIEW_SCRIPT = function () {
    const root = this;
    const gridEl = root.querySelector("[data-ng-grid]");
    const moreWrap = root.querySelector("[data-ng-more-wrap]");
    const moreLink = root.querySelector("[data-ng-more-link]");

    async function load() {
        const apiUrl = window.__getNewsApiUrl ? window.__getNewsApiUrl() : null;
        if (!apiUrl || !gridEl) return;

        gridEl.innerHTML = `<div class="ng-loading">Cargando noticias...</div>`;

        try {
            const response = await fetch(`${apiUrl}?per_page=6`);
            if (!response.ok) throw new Error("Error al cargar noticias");
            const payload = await response.json();
            const items = payload.data || [];

            if (!items.length) {
                gridEl.innerHTML = `<div class="ng-empty">No hay noticias disponibles por el momento.</div>`;
                return;
            }

            gridEl.innerHTML = items.map((item) => window.__buildNewsCard(item)).join("");

            const moreUrl = root.getAttribute("data-ng-more-url");
            if (moreWrap) moreWrap.style.display = moreUrl ? "flex" : "none";
            if (moreLink && moreUrl) moreLink.setAttribute("href", moreUrl);
        } catch (error) {
            gridEl.innerHTML = `<div class="ng-error">No se pudieron cargar las noticias.</div>`;
        }
    }

    load();
};

const NEWS_GRID_FULL_SCRIPT = function () {
    const root = this;
    const gridEl = root.querySelector("[data-ng-grid]");
    const filterEl = root.querySelector("[data-ng-category-filter]");
    const paginationEl = root.querySelector("[data-ng-pagination]");

    let currentPage = 1;
    let currentCategory = "";

    async function loadCategories() {
        const apiUrl = window.__getNewsCategoriesApiUrl ? window.__getNewsCategoriesApiUrl() : null;
        if (!apiUrl || !filterEl) return;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) return;
            const categories = await response.json();

            filterEl.innerHTML = `<option value="">Todas las categorías</option>` +
                categories.map((cat) => `<option value="${cat.id}">${cat.name}</option>`).join("");
        } catch (error) {
            /* silencioso: si falla el filtro, el grid sigue funcionando sin él */
        }
    }

    function renderPagination(currentPageNum, lastPage) {
        if (!paginationEl) return;
        if (lastPage <= 1) {
            paginationEl.innerHTML = "";
            return;
        }

        const buttons = [];
        buttons.push(`<button type="button" class="ng-page-btn" data-ng-page="${currentPageNum - 1}" ${currentPageNum <= 1 ? "disabled" : ""}>&laquo;</button>`);

        for (let page = 1; page <= lastPage; page += 1) {
            buttons.push(`<button type="button" class="ng-page-btn ${page === currentPageNum ? "ng-page-active" : ""}" data-ng-page="${page}">${page}</button>`);
        }

        buttons.push(`<button type="button" class="ng-page-btn" data-ng-page="${currentPageNum + 1}" ${currentPageNum >= lastPage ? "disabled" : ""}>&raquo;</button>`);

        paginationEl.innerHTML = buttons.join("");

        paginationEl.querySelectorAll("[data-ng-page]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const targetPage = parseInt(btn.dataset.ngPage, 10);
                if (Number.isNaN(targetPage) || targetPage < 1 || targetPage > lastPage) return;
                currentPage = targetPage;
                load();
            });
        });
    }

    async function load() {
        const apiUrl = window.__getNewsApiUrl ? window.__getNewsApiUrl() : null;
        if (!apiUrl || !gridEl) return;

        gridEl.innerHTML = `<div class="ng-loading">Cargando noticias...</div>`;
        if (paginationEl) paginationEl.innerHTML = "";

        const params = new URLSearchParams({ per_page: 12, page: currentPage });
        if (currentCategory) params.set("category", currentCategory);

        try {
            const response = await fetch(`${apiUrl}?${params.toString()}`);
            if (!response.ok) throw new Error("Error al cargar noticias");
            const payload = await response.json();
            const items = payload.data || [];

            if (!items.length) {
                gridEl.innerHTML = `<div class="ng-empty">No hay noticias disponibles con los filtros seleccionados.</div>`;
                return;
            }

            gridEl.innerHTML = items.map((item) => window.__buildNewsCard(item)).join("");
            renderPagination(payload.current_page || 1, payload.last_page || 1);
        } catch (error) {
            gridEl.innerHTML = `<div class="ng-error">No se pudieron cargar las noticias.</div>`;
        }
    }

    if (filterEl) {
        filterEl.addEventListener("change", () => {
            currentCategory = filterEl.value;
            currentPage = 1;
            load();
        });
    }

    loadCategories();
    load();
};

function ensureGlobalHelpers() {
    if (typeof window === "undefined") return;
    if (!window.__getNewsApiUrl) window.__getNewsApiUrl = getNewsApiUrl;
    if (!window.__getNewsCategoriesApiUrl) window.__getNewsCategoriesApiUrl = getNewsCategoriesApiUrl;
    if (!window.__buildNewsCard) window.__buildNewsCard = buildNewsCard;
}

const iconNewsGridPreview = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="13" height="13" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="17" y="2" width="13" height="13" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="2" y="17" width="13" height="9" fill="#003B71" fill-opacity="0.15" rx="1.5"/>
    <rect x="17" y="17" width="13" height="9" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="4" y="5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="4" y="10" width="8" height="2.5" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="19" y="5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="19" y="10" width="8" height="2.5" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="10" y="28" width="12" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.85"/>
</svg>`;

const iconNewsGridFull = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="3" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="8" width="8" height="8" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.4" rx="1"/>
    <rect x="12" y="8" width="8" height="8" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.4" rx="1"/>
    <rect x="22" y="8" width="8" height="8" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.4" rx="1"/>
    <rect x="4" y="11" width="4" height="1.4" rx="0.7" fill="#E97300" fill-opacity="0.7"/>
    <rect x="14" y="11" width="4" height="1.4" rx="0.7" fill="#E97300" fill-opacity="0.7"/>
    <rect x="24" y="11" width="4" height="1.4" rx="0.7" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="12" cy="26" r="2" fill="#003B71" fill-opacity="0.7"/>
    <circle cx="17" cy="26" r="2" fill="#E97300"/>
    <circle cx="22" cy="26" r="2" fill="#003B71" fill-opacity="0.7"/>
</svg>`;

export function initializeNewsGridBlocks(editor) {
    ensureGlobalHelpers();

    const previewType = "news-grid-preview-component";
    const fullType = "news-grid-full-component";

    editor.DomComponents.addType(previewType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === previewType ? { type: previewType } : false,
        model: {
            defaults: {
                name: "Noticias Recientes",
                tagName: "section",
                classes: ["ng-section"],
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: {
                    "data-gjs-type": previewType,
                    "data-ng-more-url": "#",
                },
                components: `
                    <h2 class="ng-section-heading">Noticias y Publicaciones</h2>
                    <div class="ng-grid" data-ng-grid></div>
                    <div class="ng-more-wrap" data-ng-more-wrap>
                        <a href="#" class="ng-more-btn" data-ng-more-link>Ver más</a>
                    </div>
                    ${NEWS_GRID_STYLES}
                `,
                script: NEWS_GRID_PREVIEW_SCRIPT,
                traits: [
                    {
                        type: "text",
                        label: "URL de 'Ver más'",
                        name: "data-ng-more-url",
                        changeProp: false,
                    },
                ],
            },
            init() {
                this.set("type", previewType);
                this.addAttributes({ "data-gjs-type": previewType });
            },
        },
    });

    editor.DomComponents.addType(fullType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === fullType ? { type: fullType } : false,
        model: {
            defaults: {
                name: "Noticias (Listado Completo)",
                tagName: "section",
                classes: ["ng-section"],
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: {
                    "data-gjs-type": fullType,
                },
                components: `
                    <h2 class="ng-section-heading">Noticias y Publicaciones</h2>
                    <div class="ng-filters-row">
                        <select class="ng-filter-select" data-ng-category-filter></select>
                    </div>
                    <div class="ng-grid" data-ng-grid></div>
                    <div class="ng-pagination" data-ng-pagination></div>
                    ${NEWS_GRID_STYLES}
                `,
                script: NEWS_GRID_FULL_SCRIPT,
                traits: [],
            },
            init() {
                this.set("type", fullType);
                this.addAttributes({ "data-gjs-type": fullType });
            },
        },
    });

    editor.BlockManager.add("news-grid-preview-block", {
        label: "Noticias Recientes",
        category: "Contenido",
        media: iconNewsGridPreview,
        activate: true,
        content: {
            type: previewType,
            attributes: { "data-gjs-type": previewType },
        },
    });

    editor.BlockManager.add("news-grid-full-block", {
        label: "Noticias (Listado Completo)",
        category: "Contenido",
        media: iconNewsGridFull,
        activate: true,
        content: {
            type: fullType,
            attributes: { "data-gjs-type": fullType },
        },
    });
}