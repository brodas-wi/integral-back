const ASSETS_BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="9" width="28" height="1.5" rx="0.75" fill="#E97300"/>
    <rect x="2" y="13" width="8" height="7" rx="1" fill="#003B71" fill-opacity="0.25"/>
    <rect x="12" y="13" width="8" height="7" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="22" y="13" width="8" height="7" rx="1" fill="#003B71" fill-opacity="0.25"/>
    <rect x="2" y="22" width="8" height="7" rx="1" fill="#003B71" fill-opacity="0.25"/>
    <rect x="12" y="22" width="8" height="7" rx="1" fill="#003B71" fill-opacity="0.25"/>
</svg>`;

const ASSETS_RUNTIME_STYLES = `.ast-section{width:100%;background:#ffffff;padding:3rem 4rem;font-family:'Poppins',sans-serif;}.ast-header{font-size:1.125rem;font-weight:700;color:#003B71;margin:0 0 1.25rem;}.ast-stripe{width:100%;height:3px;background:#E97300;margin-bottom:1.5rem;}.ast-tabs{display:flex;flex-wrap:wrap;border-bottom:2px solid #E97300;margin-bottom:1.25rem;}.ast-tab{padding:1rem 1.5rem;background:#ffffff;border:none;font-size:1.0625rem;font-weight:700;color:#003B71;cursor:pointer;font-family:inherit;transition:background 0.15s,color 0.15s;}.ast-tab--active{background:#E97300;color:#ffffff;}.ast-subtitle{font-size:1.0625rem;font-weight:700;color:#003B71;margin:0 0 0.5rem;}.ast-subtitle-stripe{width:120px;height:2px;background:#E97300;margin-bottom:1.5rem;}.ast-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;}.ast-card{display:block;background:#ffffff;border-radius:0.5rem;box-shadow:0 4px 16px rgba(0,0,0,0.1);overflow:hidden;text-decoration:none;transition:box-shadow 0.2s ease;}.ast-card:hover{box-shadow:0 8px 26px rgba(0,0,0,0.16);}.ast-card-img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;}.ast-card-body{padding:0.75rem 0.875rem;}.ast-card-name{font-size:0.8125rem;font-weight:700;color:#003B71;line-height:1.4;margin:0 0 0.25rem;}.ast-card-desc{font-size:0.75rem;color:#003B71;line-height:1.4;margin:0;}.ast-empty{padding:3rem 1rem;text-align:center;color:#94a3b8;font-size:0.875rem;}@media(max-width:1280px){.ast-section{padding:3rem 2.5rem;}}@media(max-width:992px){.ast-section{padding:2.5rem 1.5rem;}.ast-tab{padding:0.75rem 1.125rem;font-size:0.9375rem;}}`;

function createAssetsScript() {
    return function () {
        const section = this;
        const doc = section.ownerDocument ?? document;
        const TEMP_API_BASE_PREFIX = "/adminintegral";
        const origin = (doc.defaultView ?? window).location.origin;
        const apiEndpoint =
            doc.querySelector('meta[name="api-assets-url"]')?.content ||
            `${origin}${TEMP_API_BASE_PREFIX}/api/assets/active`;

        if (!doc.getElementById("assets-block-styles")) {
            const s = doc.createElement("style");
            s.id = "assets-block-styles";
            s.textContent = `.ast-section{width:100%;background:#ffffff;padding:3rem 4rem;font-family:'Poppins',sans-serif;}.ast-header{font-size:1.125rem;font-weight:700;color:#003B71;margin:0 0 1.25rem;}.ast-stripe{width:100%;height:3px;background:#E97300;margin-bottom:1.5rem;}.ast-tabs{display:flex;flex-wrap:wrap;border-bottom:2px solid #E97300;margin-bottom:1.25rem;}.ast-tab{padding:1rem 1.5rem;background:#ffffff;border:none;font-size:1.0625rem;font-weight:700;color:#003B71;cursor:pointer;font-family:inherit;transition:background 0.15s,color 0.15s;}.ast-tab--active{background:#E97300;color:#ffffff;}.ast-subtitle{font-size:1.0625rem;font-weight:700;color:#003B71;margin:0 0 0.5rem;}.ast-subtitle-stripe{width:120px;height:2px;background:#E97300;margin-bottom:1.5rem;}.ast-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;}.ast-card{display:block;background:#ffffff;border-radius:0.5rem;box-shadow:0 4px 16px rgba(0,0,0,0.1);overflow:hidden;text-decoration:none;transition:box-shadow 0.2s ease;}.ast-card:hover{box-shadow:0 8px 26px rgba(0,0,0,0.16);}.ast-card-img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;}.ast-card-body{padding:0.75rem 0.875rem;}.ast-card-name{font-size:0.8125rem;font-weight:700;color:#003B71;line-height:1.4;margin:0 0 0.25rem;}.ast-card-desc{font-size:0.75rem;color:#003B71;line-height:1.4;margin:0;}.ast-empty{padding:3rem 1rem;text-align:center;color:#94a3b8;font-size:0.875rem;}@media(max-width:1280px){.ast-section{padding:3rem 2.5rem;}}@media(max-width:992px){.ast-section{padding:2.5rem 1.5rem;}.ast-tab{padding:0.75rem 1.125rem;font-size:0.9375rem;}}`;
            doc.head.appendChild(s);
        }

        const tabsWrap = section.querySelector("[data-ast-tabs]");
        const subtitleEl = section.querySelector("[data-ast-subtitle]");
        const gridEl = section.querySelector("[data-ast-grid]");
        if (!tabsWrap || !gridEl) return;

        const defaultCategory = section.dataset.defaultCategory || "";
        let allAssets = [];
        let activeSlug = "";

        function buildCard(asset) {
            const target = asset.link_is_external
                ? ' target="_blank" rel="noopener noreferrer"'
                : "";
            return `<a href="${asset.link_url}"${target} class="ast-card">
                <img src="${asset.image_url}" alt="${asset.name}" class="ast-card-img" loading="lazy">
                <div class="ast-card-body">
                    <p class="ast-card-name">${asset.name}</p>
                    ${asset.short_description ? `<p class="ast-card-desc">${asset.short_description}</p>` : ""}
                </div>
            </a>`;
        }

        function renderGrid() {
            const filtered = activeSlug
                ? allAssets.filter((a) => a.category_slug === activeSlug)
                : allAssets;

            if (subtitleEl) {
                const label = activeSlug
                    ? filtered[0]?.category || ""
                    : "Todos";
                subtitleEl.innerHTML = `<p class="ast-subtitle">${label}</p><div class="ast-subtitle-stripe"></div>`;
            }

            if (filtered.length === 0) {
                gridEl.innerHTML = `<div class="ast-empty">No hay activos disponibles en esta categoría.</div>`;
                return;
            }

            gridEl.innerHTML = filtered.map(buildCard).join("");
        }

        function renderTabs() {
            const categories = [];
            const seen = new Set();
            allAssets.forEach((a) => {
                if (!seen.has(a.category_slug)) {
                    seen.add(a.category_slug);
                    categories.push({
                        slug: a.category_slug,
                        name: a.category,
                    });
                }
            });

            const tabsHtml = [
                `<button type="button" class="ast-tab ast-tab--active" data-tab-slug="">Todos</button>`,
                ...categories.map(
                    (c) =>
                        `<button type="button" class="ast-tab" data-tab-slug="${c.slug}">${c.name}</button>`,
                ),
            ].join("");

            tabsWrap.innerHTML = tabsHtml;

            tabsWrap.querySelectorAll("[data-tab-slug]").forEach((btn) => {
                btn.addEventListener("click", () => {
                    tabsWrap
                        .querySelectorAll(".ast-tab")
                        .forEach((t) => t.classList.remove("ast-tab--active"));
                    btn.classList.add("ast-tab--active");
                    activeSlug = btn.dataset.tabSlug;
                    renderGrid();
                });
            });

            if (defaultCategory) {
                const match = tabsWrap.querySelector(
                    `[data-tab-slug="${defaultCategory}"]`,
                );
                if (match) match.click();
            }
        }

        async function loadAssets() {
            gridEl.innerHTML = `<div class="ast-empty">Cargando activos...</div>`;
            try {
                const res = await fetch(apiEndpoint, {
                    headers: { Accept: "application/json" },
                });
                if (!res.ok) {
                    gridEl.innerHTML = `<div class="ast-empty">No se pudieron cargar los activos.</div>`;
                    return;
                }
                allAssets = await res.json();
                if (!Array.isArray(allAssets) || allAssets.length === 0) {
                    tabsWrap.innerHTML = `<button type="button" class="ast-tab ast-tab--active">Todos</button>`;
                    gridEl.innerHTML = `<div class="ast-empty">No hay activos disponibles.</div>`;
                    return;
                }
                renderTabs();
                renderGrid();
            } catch {
                gridEl.innerHTML = `<div class="ast-empty">No se pudieron cargar los activos.</div>`;
            }
        }

        if (doc.readyState === "loading") {
            doc.addEventListener("DOMContentLoaded", loadAssets);
        } else {
            loadAssets();
        }
    };
}

export const assetsBlocks = [
    {
        id: "assets-catalog",
        label: "Catálogo de Activos",
        category: "Interactivos",
        media: ASSETS_BLOCK_ICON,
        content: { type: "assets-catalog-component" },
    },
];

export function initializeAssetsBlocks(editor) {
    const componentType = "assets-catalog-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Catálogo de Activos",
                tagName: "section",
                draggable: true,
                droppable: false,
                editable: false,
                stylable: false,
                resizable: false,
                selectable: true,
                hoverable: true,
                layerable: true,
                highlightable: false,
                copyable: false,
                removable: true,
                attributes: {
                    "data-gjs-type": componentType,
                    "data-default-category": "",
                    class: "ast-section",
                },
                components: `
                    <p class="ast-header" contenteditable="true" data-gjs-type="text" data-gjs-editable="true" data-gjs-selectable="false" data-gjs-hoverable="false">Mayor información a: 0000-0000</p>
                    <div class="ast-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div class="ast-tabs" data-ast-tabs data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div data-ast-subtitle data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div class="ast-grid" data-ast-grid data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                `,
                script: createAssetsScript(),
                toolbar: [],
                traits: [
                    {
                        type: "text",
                        name: "data-default-category",
                        label: "Categoría inicial (slug)",
                        placeholder: "Déjalo vacío para mostrar 'Todos'",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
                this.on("change:attributes", () => {
                    const el = this.getEl();
                    if (!el) return;
                    const script = this.get("script");
                    if (script && typeof script === "function") {
                        setTimeout(() => script.call(el), 100);
                    }
                });
            },
        },
    });

    setupAssetsEditorEvents(editor, componentType);
}

function setupAssetsEditorEvents(editor, componentType) {
    editor.on("storage:end:load", () => {
        setTimeout(
            () => reinitializeAssetsComponents(editor, componentType),
            1000,
        );
    });

    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (el?.getAttribute?.("data-gjs-type") === componentType) {
            component.set("type", componentType);
            setTimeout(() => {
                const script = component.get("script");
                if (script && typeof script === "function") script.call(el);
            }, 500);
        }
    });

    editor.on("canvas:render", () => {
        setTimeout(
            () => reinitializeAssetsComponents(editor, componentType),
            800,
        );
    });

    editor.on("storage:start:store", () => {
        editor
            .getWrapper()
            .find(`[data-gjs-type="${componentType}"]`)
            .forEach((comp) => {
                comp.set("type", componentType);
                comp.addAttributes({ "data-gjs-type": componentType });
            });
    });
}

function reinitializeAssetsComponents(editor, componentType) {
    editor
        .getWrapper()
        .find(`[data-gjs-type="${componentType}"]`)
        .forEach((comp) => {
            comp.set("type", componentType);
            const el = comp.getEl();
            if (el?.isConnected) {
                const script = comp.get("script");
                if (script && typeof script === "function") script.call(el);
            }
        });
}
