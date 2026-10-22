const COMPONENT_TYPE = "assets-catalog-component";
const CATEGORY = "Interactivos";

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2.5" width="28" height="1" fill="#E97300"/>
    <path d="M2 11V8.5Q2 7 3.5 7H9.5Q11 7 11 8.5V11Z" fill="#E97300"/>
    <path d="M12 11V8.5Q12 7 13.5 7H18.5Q20 7 20 8.5V11Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.5"/>
    <path d="M21 11V8.5Q21 7 22.5 7H28.5Q30 7 30 8.5V11Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.5"/>
    <rect x="2" y="11" width="28" height="1" fill="#E97300"/>
    <rect x="2" y="14" width="9" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.75"/>
    <rect x="2" y="17" width="28" height="0.8" fill="#E97300"/>
    <rect x="2" y="20" width="8" height="10" rx="1" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.5"/>
    <rect x="2" y="20" width="8" height="5.5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="3.5" y="27" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
    <rect x="12" y="20" width="8" height="10" rx="1" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.5"/>
    <rect x="12" y="20" width="8" height="5.5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="13.5" y="27" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
    <rect x="22" y="20" width="8" height="10" rx="1" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.5"/>
    <rect x="22" y="20" width="8" height="5.5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23.5" y="27" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
</svg>`;

const PROPAGATED = [
    "editable",
    "selectable",
    "hoverable",
    "droppable",
    "highlightable",
    "stylable",
    "resizable",
];

const LOCKED = 'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"';

const INITIAL_CONTENT = `
<p class="ast-header" contenteditable="true" data-gjs-type="text" data-gjs-editable="true" data-gjs-selectable="false" data-gjs-hoverable="false">Mayor información a: 0000-0000</p>
<div class="ast-stripe" ${LOCKED}></div>
<div class="ast-tabs" role="tablist" data-ast-tabs ${LOCKED}></div>
<div data-ast-content ${LOCKED}></div>`;

/*
 * Este script se serializa con toString() y se ejecuta en la página pública,
 * así que debe ser autónomo: no puede usar variables ni funciones externas.
 */
function createAssetsScript() {
    return function () {
        const section = this;
        const doc = section.ownerDocument ?? document;
        const appBase = doc.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/, "") ?? "";
        const apiEndpoint =
            doc.querySelector('meta[name="api-assets-url"]')?.content ||
            (appBase ? `${appBase}/api/assets/active` : "");

        const GUTTER = "clamp(1.5rem,4vw,3.5rem)";
        const SIDE = `max(${GUTTER},calc((100% - 1600px) / 2 + ${GUTTER}))`;

        const STYLES = `
.ast-section{width:100%;box-sizing:border-box;background-color:#fff;font-family:'Poppins',sans-serif;padding-top:clamp(2rem,4vw,3rem);padding-bottom:clamp(2rem,4vw,3rem);padding-left:${SIDE};padding-right:${SIDE};}
.ast-header{margin:0 0 1.25rem;font-size:1.125rem;font-weight:700;color:#003B71;}
.ast-stripe{width:100%;height:3px;margin-bottom:1.5rem;background-color:#E97300;}
.ast-tabs{display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.25rem;padding-top:0.25rem;border-bottom:2px solid #E97300;}
.ast-tab{flex:1 1 0;min-width:8rem;padding:1rem 1.5rem;border:0;border-radius:0.75rem 0.75rem 0 0;background-color:#fff;box-shadow:0 4px 14px rgba(0,59,113,0.12);font-family:inherit;font-size:1.3125rem;font-weight:700;line-height:1.25;color:#003B71;cursor:pointer;transition:background-color 0.15s ease,color 0.15s ease;}
.ast-tab:hover{background-color:#fff4e8;}
.ast-tab:focus-visible{outline:2px solid #E97300;outline-offset:-2px;}
.ast-tab--active,.ast-tab--active:hover{background-color:#E97300;color:#fff;}
.ast-group{margin-bottom:2.5rem;}
.ast-group:last-child{margin-bottom:0;}
.ast-subtitle{margin:0 0 0.5rem;font-size:1.0625rem;font-weight:700;color:#003B71;}
.ast-subtitle-stripe{width:100%;height:2px;margin-bottom:1.5rem;background-color:#E97300;}
.ast-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.5rem;}
.ast-card{display:block;overflow:hidden;border-radius:0.5rem;background-color:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.1);text-decoration:none;transition:box-shadow 0.2s ease;}
.ast-card:hover,.ast-card:focus-visible{box-shadow:0 8px 26px rgba(0,0,0,0.16);}
.ast-card:focus-visible{outline:2px solid #E97300;outline-offset:2px;}
.ast-card-img{display:block;width:100%;height:200px;object-fit:cover;}
.ast-card-body{padding:0.75rem 0.875rem;}
.ast-card-name{margin:0 0 0.25rem;font-size:0.8125rem;font-weight:700;line-height:1.4;color:#003B71;}
.ast-card-desc{margin:0;font-size:0.75rem;line-height:1.4;color:#003B71;}
.ast-empty{padding:3rem 1rem;text-align:center;font-size:0.875rem;color:#94a3b8;}
.ast-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:4rem 1rem;font-size:0.875rem;color:#94a3b8;}
.ast-spinner{width:2.25rem;height:2.25rem;border:3px solid #e5e7eb;border-top-color:#E97300;border-radius:50%;animation:ast-spin 0.8s linear infinite;}
@keyframes ast-spin{to{transform:rotate(360deg);}}
@media(max-width:1280px){.ast-grid{grid-template-columns:repeat(3,minmax(0,1fr));}}
@media(max-width:992px){
.ast-tab{padding:0.875rem 1.125rem;font-size:1.125rem;}
.ast-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
}
@media(max-width:640px){
.ast-tab{flex:1 1 100%;font-size:1rem;}
.ast-grid{grid-template-columns:minmax(0,1fr);}
}
@media(prefers-reduced-motion:reduce){.ast-tab,.ast-card,.ast-spinner{transition:none;animation-duration:2.4s;}}
`;

        let style = doc.getElementById("assets-block-styles");
        if (!style) {
            style = doc.createElement("style");
            style.id = "assets-block-styles";
            doc.head.appendChild(style);
        }
        if (style.textContent !== STYLES) style.textContent = STYLES;

        const tabsWrap = section.querySelector("[data-ast-tabs]");
        const contentEl = section.querySelector("[data-ast-content]");
        if (!tabsWrap || !contentEl) return;

        const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
        const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ESCAPES[char]);
        const safeUrl = (url) => (/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(String(url ?? "")) ? url : "#");
        const safeImage = (url) => (/^(https?:\/\/|\/)/i.test(String(url ?? "")) ? url : "");
        const truncate = (text, max) =>
            text && text.length > max ? `${text.slice(0, max).trim()}...` : text || "";

        const defaultCategory = section.dataset.defaultCategory || "";
        const requestId = (section.__astRequest = (section.__astRequest || 0) + 1);
        let assets = [];
        let activeSlug = "";

        const categories = () => {
            const seen = new Set();
            const list = [];
            assets.forEach((asset) => {
                if (seen.has(asset.category_slug)) return;
                seen.add(asset.category_slug);
                list.push({ slug: asset.category_slug, name: asset.category });
            });
            return list.sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
        };

        const card = (asset) => {
            const external = asset.link_is_external ? ' target="_blank" rel="noopener noreferrer"' : "";
            const title = asset.name || truncate(asset.short_description, 60);
            const alt = asset.name || asset.short_description || "Activo extraordinario";
            const description =
                asset.name && asset.short_description
                    ? `<p class="ast-card-desc">${esc(asset.short_description)}</p>`
                    : "";

            return `<a href="${esc(safeUrl(asset.link_url))}"${external} class="ast-card"><img src="${esc(safeImage(asset.image_url))}" alt="${esc(alt)}" class="ast-card-img" loading="lazy"><div class="ast-card-body"><p class="ast-card-name">${esc(title)}</p>${description}</div></a>`;
        };

        const group = (name, items) => {
            const cards = items.length
                ? items.map(card).join("")
                : '<div class="ast-empty">No hay activos extraordinarios disponibles en esta categoría.</div>';

            return `<div class="ast-group"><p class="ast-subtitle">${esc(name)}</p><div class="ast-subtitle-stripe"></div><div class="ast-grid">${cards}</div></div>`;
        };

        const renderContent = () => {
            if (activeSlug) {
                const filtered = assets.filter((asset) => asset.category_slug === activeSlug);
                const label = filtered[0]?.category || categories().find((c) => c.slug === activeSlug)?.name || "";
                contentEl.innerHTML = group(label, filtered);
                return;
            }

            contentEl.innerHTML = categories()
                .map((category) =>
                    group(category.name, assets.filter((asset) => asset.category_slug === category.slug)),
                )
                .join("");
        };

        const renderTabs = () => {
            const tab = (slug, label) => {
                const active = slug === activeSlug;
                return `<button type="button" role="tab" aria-selected="${active}" class="ast-tab${active ? " ast-tab--active" : ""}" data-tab-slug="${esc(slug)}">${esc(label)}</button>`;
            };

            tabsWrap.innerHTML = [tab("", "Todos"), ...categories().map((c) => tab(c.slug, c.name))].join("");
        };

        if (!tabsWrap.__astBound) {
            tabsWrap.__astBound = true;
            tabsWrap.addEventListener("click", (event) => {
                const button = event.target.closest("[data-tab-slug]");
                if (!button) return;
                activeSlug = button.dataset.tabSlug;
                tabsWrap.querySelectorAll(".ast-tab").forEach((item) => {
                    const active = item === button;
                    item.classList.toggle("ast-tab--active", active);
                    item.setAttribute("aria-selected", String(active));
                });
                renderContent();
            });
        }

        const showMessage = (message) => {
            tabsWrap.innerHTML =
                '<button type="button" role="tab" aria-selected="true" class="ast-tab ast-tab--active" data-tab-slug="">Todos</button>';
            contentEl.innerHTML = `<div class="ast-empty">${message}</div>`;
        };

        const load = async () => {
            if (!apiEndpoint) {
                showMessage("Vista previa del catálogo (los datos reales se cargan en el sitio publicado).");
                return;
            }

            contentEl.innerHTML =
                '<div class="ast-loading"><div class="ast-spinner"></div><span>Cargando activos extraordinarios...</span></div>';

            try {
                const response = await fetch(apiEndpoint, { headers: { Accept: "application/json" } });
                if (requestId !== section.__astRequest) return;

                if (!response.ok) {
                    showMessage("No se pudieron cargar los activos extraordinarios.");
                    return;
                }

                const data = await response.json();
                if (requestId !== section.__astRequest) return;

                if (!Array.isArray(data) || !data.length) {
                    showMessage("No hay activos extraordinarios disponibles.");
                    return;
                }

                assets = data;
                activeSlug = categories().some((c) => c.slug === defaultCategory) ? defaultCategory : "";
                renderTabs();
                renderContent();
            } catch {
                if (requestId === section.__astRequest) {
                    showMessage("No se pudieron cargar los activos extraordinarios.");
                }
            }
        };

        if (doc.readyState === "loading") {
            doc.addEventListener("DOMContentLoaded", load, { once: true });
        } else {
            load();
        }
    };
}

export const assetsBlocks = [
    {
        id: "assets-catalog",
        label: "Catálogo de Activos Extraordinarios",
        category: CATEGORY,
        media: BLOCK_ICON,
        content: { type: COMPONENT_TYPE },
    },
];

const DEFAULT_CATEGORY_OPTION = { id: "", name: "Todas (mostrar 'Todos')" };

function runScript(component) {
    const el = component.getEl();
    const script = component.get("script");
    if (el?.isConnected && typeof script === "function") script.call(el);
}

function runAll(editor) {
    editor
        .getWrapper()
        .find(`[data-gjs-type="${COMPONENT_TYPE}"]`)
        .forEach((component) => {
            component.set("type", COMPONENT_TYPE);
            runScript(component);
        });
}

async function loadCategoryOptions(editor) {
    try {
        const base = document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/, "") ?? "";
        const response = await fetch(`${base}/api/asset-categories/all`, {
            headers: { Accept: "application/json" },
        });
        if (!response.ok) return;

        const categories = await response.json();
        if (!Array.isArray(categories) || !categories.length) return;

        const trait = editor.DomComponents.getType(COMPONENT_TYPE)
            ?.model.prototype.defaults.traits.find((item) => item.name === "data-default-category");
        if (!trait) return;

        trait.options = [DEFAULT_CATEGORY_OPTION, ...categories.map((c) => ({ id: c.slug, name: c.name }))];
    } catch {
        /* sin categorías: el selector queda con la opción "Todas" */
    }
}

function setupEditorEvents(editor) {
    editor.on("storage:end:load", () => setTimeout(() => runAll(editor), 1000));
    editor.on("canvas:render", () => setTimeout(() => runAll(editor), 800));

    editor.on("component:mount", (component) => {
        if (component.getEl()?.getAttribute?.("data-gjs-type") !== COMPONENT_TYPE) return;
        component.set("type", COMPONENT_TYPE);
        setTimeout(() => runScript(component), 500);
    });

    editor.on("storage:start:store", () => {
        editor
            .getWrapper()
            .find(`[data-gjs-type="${COMPONENT_TYPE}"]`)
            .forEach((component) => {
                component.set("type", COMPONENT_TYPE);
                component.addAttributes({ "data-gjs-type": COMPONENT_TYPE });
            });
    });

    editor.on("load", () => {
        const doc = editor.Canvas.getFrameEl()?.contentDocument;
        const styleId = `${COMPONENT_TYPE}-editor-css`;
        if (!doc?.head || doc.getElementById(styleId)) return;

        const style = doc.createElement("style");
        style.id = styleId;
        style.textContent = `[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;}[data-gjs-type="${COMPONENT_TYPE}"].gjs-selected,[data-gjs-type="${COMPONENT_TYPE}"].gjs-hovered{outline:2px dashed rgba(240,135,42,0.6) !important;outline-offset:2px;}`;
        doc.head.appendChild(style);
    });
}

export function initializeAssetsBlocks(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE ? { type: COMPONENT_TYPE } : false,

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
                    "data-gjs-type": COMPONENT_TYPE,
                    "data-default-category": "",
                    class: "ast-section",
                },
                components: INITIAL_CONTENT,
                script: createAssetsScript(),
                traits: [
                    {
                        type: "select",
                        name: "data-default-category",
                        label: "Categoría inicial",
                        options: [DEFAULT_CATEGORY_OPTION],
                        changeProp: false,
                    },
                ],
            },

            init() {
                this.set("type", COMPONENT_TYPE);
                this.addAttributes({ "data-gjs-type": COMPONENT_TYPE });
                this.on("change:attributes", () => setTimeout(() => runScript(this), 100));
            },
        },
    });

    setupEditorEvents(editor);
    loadCategoryOptions(editor);
}