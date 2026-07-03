const ASSETS_BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="10" width="12" height="19" fill="none" stroke="#003B71" stroke-width="1" rx="1"/>
    <rect x="5.5" y="13" width="2.5" height="2.5" fill="#003B71" fill-opacity="0.5"/>
    <rect x="10" y="13" width="2.5" height="2.5" fill="#003B71" fill-opacity="0.5"/>
    <rect x="5.5" y="17.5" width="2.5" height="2.5" fill="#003B71" fill-opacity="0.5"/>
    <rect x="10" y="17.5" width="2.5" height="2.5" fill="#003B71" fill-opacity="0.5"/>
    <rect x="7" y="23" width="4" height="6" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="26" width="28" height="1.5" rx="0.75" fill="#E97300"/>
    <path d="M17 24c0-1.5 1-2.5 2.5-2.5h6c1.5 0 2.5 1 2.5 2.5v1.5h-11V24z" fill="#E97300" fill-opacity="0.85"/>
    <rect x="16.5" y="25" width="12" height="2.5" rx="1" fill="#E97300"/>
    <circle cx="19" cy="27.8" r="1.3" fill="#003B71"/>
    <circle cx="26" cy="27.8" r="1.3" fill="#003B71"/>
</svg>`;

const ASSETS_RUNTIME_STYLES = `
.ast-section {
    width: 100%;
    background: #ffffff;
    padding: 3rem 4rem;
    font-family: 'Poppins', sans-serif;
}

.ast-header {
    font-size: 1.125rem;
    font-weight: 700;
    color: #003B71;
    margin: 0 0 1.25rem;
}

.ast-stripe {
    width: 100%;
    height: 3px;
    background: #E97300;
    margin-bottom: 1.5rem;
}

.ast-tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 2px solid #E97300;
    margin-bottom: 1.25rem;
}

.ast-tab {
    padding: 1rem 1.5rem;
    background: #ffffff;
    border: none;
    font-size: 1.0625rem;
    font-weight: 700;
    color: #003B71;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, color 0.15s;
}

.ast-tab--active {
    background: #E97300;
    color: #ffffff;
}

.ast-group {
    margin-bottom: 2.5rem;
}

.ast-group:last-child {
    margin-bottom: 0;
}

.ast-subtitle {
    font-size: 1.0625rem;
    font-weight: 700;
    color: #003B71;
    margin: 0 0 0.5rem;
}

.ast-subtitle-stripe {
    width: 120px;
    height: 2px;
    background: #E97300;
    margin-bottom: 1.5rem;
}

.ast-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

.ast-card {
    display: block;
    background: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-decoration: none;
    transition: box-shadow 0.2s ease;
}

.ast-card:hover {
    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.16);
}

.ast-card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.ast-card-body {
    padding: 0.75rem 0.875rem;
}

.ast-card-name {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #003B71;
    line-height: 1.4;
    margin: 0 0 0.25rem;
}

.ast-card-desc {
    font-size: 0.75rem;
    color: #003B71;
    line-height: 1.4;
    margin: 0;
}

.ast-empty {
    padding: 3rem 1rem;
    text-align: center;
    color: #94a3b8;
    font-size: 0.875rem;
}

@media (max-width: 1280px) {
    .ast-section {
        padding: 3rem 2.5rem;
    }
    .ast-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 992px) {
    .ast-section {
        padding: 2.5rem 1.5rem;
    }
    .ast-tab {
        padding: 0.75rem 1.125rem;
        font-size: 0.9375rem;
    }
    .ast-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .ast-grid {
        grid-template-columns: 1fr;
    }
}
`;

function createAssetsScript() {
    return function () {
        const section = this;
        const doc = section.ownerDocument ?? document;
        const apiEndpoint = doc.querySelector('meta[name="api-assets-url"]')?.content;

        if (!apiEndpoint) return;

        const RUNTIME_STYLES = `
.ast-section {
    width: 100%;
    background: #ffffff;
    padding: 3rem 4rem;
    font-family: 'Poppins', sans-serif;
}

.ast-header {
    font-size: 1.125rem;
    font-weight: 700;
    color: #003B71;
    margin: 0 0 1.25rem;
}

.ast-stripe {
    width: 100%;
    height: 3px;
    background: #E97300;
    margin-bottom: 1.5rem;
}

.ast-tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 2px solid #E97300;
    margin-bottom: 1.25rem;
}

.ast-tab {
    padding: 1rem 1.5rem;
    background: #ffffff;
    border: none;
    font-size: 1.0625rem;
    font-weight: 700;
    color: #003B71;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, color 0.15s;
}

.ast-tab--active {
    background: #E97300;
    color: #ffffff;
}

.ast-group {
    margin-bottom: 2.5rem;
}

.ast-group:last-child {
    margin-bottom: 0;
}

.ast-subtitle {
    font-size: 1.0625rem;
    font-weight: 700;
    color: #003B71;
    margin: 0 0 0.5rem;
}

.ast-subtitle-stripe {
    width: 120px;
    height: 2px;
    background: #E97300;
    margin-bottom: 1.5rem;
}

.ast-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

.ast-card {
    display: block;
    background: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-decoration: none;
    transition: box-shadow 0.2s ease;
}

.ast-card:hover {
    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.16);
}

.ast-card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.ast-card-body {
    padding: 0.75rem 0.875rem;
}

.ast-card-name {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #003B71;
    line-height: 1.4;
    margin: 0 0 0.25rem;
}

.ast-card-desc {
    font-size: 0.75rem;
    color: #003B71;
    line-height: 1.4;
    margin: 0;
}

.ast-empty {
    padding: 3rem 1rem;
    text-align: center;
    color: #94a3b8;
    font-size: 0.875rem;
}

@media (max-width: 1280px) {
    .ast-section {
        padding: 3rem 2.5rem;
    }
    .ast-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 992px) {
    .ast-section {
        padding: 2.5rem 1.5rem;
    }
    .ast-tab {
        padding: 0.75rem 1.125rem;
        font-size: 0.9375rem;
    }
    .ast-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .ast-grid {
        grid-template-columns: 1fr;
    }
}
`;

        if (!doc.getElementById("assets-block-styles")) {
            const s = doc.createElement("style");
            s.id = "assets-block-styles";
            s.textContent = RUNTIME_STYLES;
            doc.head.appendChild(s);
        }

        const tabsWrap = section.querySelector("[data-ast-tabs]");
        const contentEl = section.querySelector("[data-ast-content]");
        if (!tabsWrap || !contentEl) return;

        const defaultCategory = section.dataset.defaultCategory || "";
        let allAssets = [];
        let activeSlug = "";

        function truncateText(text, maxLength) {
            if (!text) return "";
            return text.length > maxLength
                ? `${text.slice(0, maxLength).trim()}...`
                : text;
        }

        function buildCard(asset) {
            const target = asset.link_is_external
                ? ' target="_blank" rel="noopener noreferrer"'
                : "";
            const displayName =
                asset.name || truncateText(asset.short_description, 60);
            const altText =
                asset.name ||
                asset.short_description ||
                "Activo extraordinario";

            return `<a href="${asset.link_url}"${target} class="ast-card">
                <img src="${asset.image_url}" alt="${altText}" class="ast-card-img" loading="lazy">
                <div class="ast-card-body">
                    <p class="ast-card-name">${displayName}</p>
                    ${asset.name && asset.short_description ? `<p class="ast-card-desc">${asset.short_description}</p>` : ""}
                </div>
            </a>`;
        }

        function getOrderedCategories() {
            const categories = [];
            const seen = new Set();
            allAssets.forEach((a) => {
                if (!seen.has(a.category_slug)) {
                    seen.add(a.category_slug);
                    categories.push({ slug: a.category_slug, name: a.category });
                }
            });
            return categories.sort((a, b) => a.name.localeCompare(b, "es", { sensitivity: "base" }));
        }

        function buildGroupHtml(name, items) {
            const cardsHtml = items.length
                ? items.map(buildCard).join("")
                : `<div class="ast-empty">No hay activos extraordinarios disponibles en esta categoría.</div>`;

            return `<div class="ast-group">
                <p class="ast-subtitle">${name}</p>
                <div class="ast-subtitle-stripe"></div>
                <div class="ast-grid">${cardsHtml}</div>
            </div>`;
        }

        function renderContent() {
            if (activeSlug) {
                const filtered = allAssets.filter(
                    (a) => a.category_slug === activeSlug,
                );
                const label =
                    filtered[0]?.category ||
                    getOrderedCategories().find((c) => c.slug === activeSlug)
                        ?.name ||
                    "";
                contentEl.innerHTML = buildGroupHtml(label, filtered);
                return;
            }

            const categories = getOrderedCategories();
            contentEl.innerHTML = categories
                .map((cat) =>
                    buildGroupHtml(
                        cat.name,
                        allAssets.filter((a) => a.category_slug === cat.slug),
                    ),
                )
                .join("");
        }

        function renderTabs() {
            const categories = getOrderedCategories();

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
                    renderContent();
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
            contentEl.innerHTML = `<div class="ast-empty">Cargando activos extraordinarios...</div>`;
            try {
                const res = await fetch(apiEndpoint, {
                    headers: { Accept: "application/json" },
                });
                if (!res.ok) {
                    contentEl.innerHTML = `<div class="ast-empty">No se pudieron cargar los activos extraordinarios.</div>`;
                    return;
                }
                allAssets = await res.json();
                if (!Array.isArray(allAssets) || allAssets.length === 0) {
                    tabsWrap.innerHTML = `<button type="button" class="ast-tab ast-tab--active">Todos</button>`;
                    contentEl.innerHTML = `<div class="ast-empty">No hay activos extraordinarios disponibles.</div>`;
                    return;
                }
                renderTabs();
                renderContent();
            } catch {
                contentEl.innerHTML = `<div class="ast-empty">No se pudieron cargar los activos extraordinarios.</div>`;
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
        label: "Catálogo de Activos Extraordinarios",
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
                name: "Catálogo de Activos Extraordinarios",
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
                    <div data-ast-content data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                `,
                script: createAssetsScript(),
                toolbar: [],
                traits: [
                    {
                        type: "select",
                        name: "data-default-category",
                        label: "Categoría inicial",
                        options: [{ id: "", name: "Todas (mostrar 'Todos')" }],
                        changeProp: false,
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
    injectAssetsEditorStyles(editor, componentType);
    loadAssetCategoryOptions(editor, componentType);
}

async function loadAssetCategoryOptions(editor, componentType) {
    try {
        const appBase = document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/, "") ?? "";
        const res = await fetch(`${appBase}/api/asset-categories/all`, {
            headers: { Accept: "application/json" },
        });
        if (!res.ok) return;

        const categories = await res.json();
        if (!Array.isArray(categories) || categories.length === 0) return;

        const type = editor.DomComponents.getType(componentType);
        if (!type) return;

        const traits = type.model.prototype.defaults.traits;
        const trait = traits.find((t) => t.name === "data-default-category");
        if (!trait) return;

        trait.options = [
            { id: "", name: "Todas (mostrar 'Todos')" },
            ...categories.map((c) => ({ id: c.slug, name: c.name })),
        ];
    } catch {}
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

function injectAssetsEditorStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const head = iframe.contentDocument?.head;
        if (!head) return;

        if (!head.querySelector("#assets-block-styles")) {
            const s = document.createElement("style");
            s.id = "assets-block-styles";
            s.textContent = ASSETS_RUNTIME_STYLES;
            head.appendChild(s);
        }

        if (!head.querySelector(`#${componentType}-editor-css`)) {
            const s = document.createElement("style");
            s.id = `${componentType}-editor-css`;
            s.textContent = `[data-gjs-type="${componentType}"] * { pointer-events: none !important; } [data-gjs-type="${componentType}"].gjs-selected, [data-gjs-type="${componentType}"].gjs-hovered { outline: 2px dashed rgba(240,135,42,0.6) !important; outline-offset: 2px; }`;
            head.appendChild(s);
        }
    });
}
