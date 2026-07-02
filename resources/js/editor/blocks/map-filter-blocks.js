const mapFilterBlockIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <path d="M16 4c-4.4 0-8 3.6-8 8 0 6 8 16 8 16s8-10 8-16c0-4.4-3.6-8-8-8z" fill="#E97300"/>
    <circle cx="16" cy="12" r="3.2" fill="#ffffff"/>
    <rect x="3" y="26" width="26" height="2" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`;

const MAP_FILTER_STYLES = `
.mp-section{width:100%;background:#ffffff;padding:3.5rem 4rem;font-family:'Poppins',sans-serif;}
.mp-stats{font-size:1.125rem;font-weight:700;color:#003B71;margin:0 0 1.75rem;line-height:1.5;}
.mp-stats .mp-num{color:#E97300;}
.mp-title{font-size:1.75rem;font-weight:800;color:#E97300;margin:0 0 1.5rem;}
.mp-filters{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;margin-bottom:2rem;position:relative;z-index:30;}
.mp-filter{position:relative;}
.mp-filter-btn{display:flex;align-items:center;justify-content:space-between;width:100%;background:none;border:none;border-bottom:2px solid #E97300;padding:0.5rem 0.25rem 0.625rem;cursor:pointer;font-family:inherit;}
.mp-filter-label{font-size:0.9375rem;font-weight:700;color:#003B71;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.mp-filter-arrow{color:#003B71;font-size:0.75rem;transition:transform 0.2s ease;flex-shrink:0;margin-left:0.75rem;}
.mp-filter.mp-filter-open .mp-filter-arrow{transform:rotate(180deg);}
.mp-filter-dropdown{display:none;position:absolute;top:calc(100% + 0.625rem);left:0;right:0;background:#ffffff;border-radius:0.5rem;box-shadow:0 14px 36px rgba(0,0,0,0.2);overflow:hidden;max-height:260px;overflow-y:auto;}
.mp-filter.mp-filter-open .mp-filter-dropdown{display:block;}
.mp-filter-option{display:block;width:100%;text-align:center;padding:0.75rem 1rem;background:none;border:none;border-bottom:2px solid #E97300;font-size:0.875rem;font-weight:700;color:#003B71;cursor:pointer;font-family:inherit;transition:background 0.15s;}
.mp-filter-option:last-child{border-bottom:none;}
.mp-filter-option:hover{background:#f8fafc;}
.mp-map-wrapper{position:relative;width:100%;height:440px;border-radius:0.5rem;overflow:hidden;}
.mp-map{width:100%;height:100%;z-index:1;}
.mp-map-overlay{position:absolute;inset:0;background:rgba(0,59,113,0.4);opacity:0;pointer-events:none;transition:opacity 0.2s ease;z-index:20;}
.mp-map-overlay.mp-overlay-active{opacity:1;}
@media(max-width:1280px){.mp-section{padding:3rem 2.5rem;}}
@media(max-width:992px){
.mp-section{padding:2.5rem 1.5rem;}
.mp-filters{grid-template-columns:1fr;gap:1.25rem;}
.mp-map-wrapper{height:320px;}
}`;

function mapFilterHighlightStats(text) {
    return String(text ?? "")
        .replace(
            /[&<>"']/g,
            (c) =>
                ({
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;",
                })[c],
        )
        .replace(/\*\*(.+?)\*\*/g, '<span class="mp-num">$1</span>');
}

function buildMapFilterHTML(data, uid) {
    uid = uid || "mp" + Math.random().toString(36).slice(2, 7);

    const filtersHtml = (data.filters || [])
        .map((filter, i) => {
            const optionsHtml = (filter.options || [])
                .map(
                    (op) =>
                        `<button type="button" class="mp-filter-option" data-filter-index="${i}">${op}</button>`,
                )
                .join("");
            return `<div class="mp-filter" data-filter-index="${i}">
                <button type="button" class="mp-filter-btn" data-filter-toggle="${i}">
                    <span class="mp-filter-label" data-filter-label="${i}">${filter.label || "Filtro"}</span>
                    <i class="ri-arrow-down-s-line mp-filter-arrow"></i>
                </button>
                <div class="mp-filter-dropdown">${optionsHtml}</div>
            </div>`;
        })
        .join("");

    return `<section id="mp-root-${uid}" class="mp-section" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <p class="mp-stats">${mapFilterHighlightStats(data.stats_text)}</p>
        <h2 class="mp-title">${data.title || "Horarios y Agencias:"}</h2>
        <div class="mp-filters" data-mp-filters>${filtersHtml}</div>
        <div class="mp-map-wrapper" data-mp-map-wrapper>
            <div class="mp-map" data-mp-map></div>
            <div class="mp-map-overlay" data-mp-overlay></div>
        </div>
    </section>`;
}

const DEFAULT_MAP_FILTER_DATA = {
    title: "Horarios y Agencias:",
    stats_text:
        "**27** agencias y más de **1000** puntos de pago distribuidos en todo el país.",
    filters: [
        {
            label: "Agencias / Puntos de pago",
            options: ["Agencias", "Puntos de pago"],
        },
        {
            label: "Departamento",
            options: ["San Salvador", "Santa Ana", "San Miguel", "La Libertad"],
        },
        {
            label: "Seleccione una ubicación",
            options: [
                "Todas",
                "Zona Central",
                "Zona Occidental",
                "Zona Oriental",
            ],
        },
    ],
};

function createMapFilterScript() {
    return function () {
        const root = this;
        const doc = root.ownerDocument ?? document;

        const RUNTIME_STYLES = `.mp-section{width:100%;background:#ffffff;padding:3.5rem 4rem;font-family:'Poppins',sans-serif;}.mp-stats{font-size:1.125rem;font-weight:700;color:#003B71;margin:0 0 1.75rem;line-height:1.5;}.mp-stats .mp-num{color:#E97300;}.mp-title{font-size:1.75rem;font-weight:800;color:#E97300;margin:0 0 1.5rem;}.mp-filters{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;margin-bottom:2rem;position:relative;z-index:30;}.mp-filter{position:relative;}.mp-filter-btn{display:flex;align-items:center;justify-content:space-between;width:100%;background:none;border:none;border-bottom:2px solid #E97300;padding:0.5rem 0.25rem 0.625rem;cursor:pointer;font-family:inherit;}.mp-filter-label{font-size:0.9375rem;font-weight:700;color:#003B71;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.mp-filter-arrow{color:#003B71;font-size:0.75rem;transition:transform 0.2s ease;flex-shrink:0;margin-left:0.75rem;}.mp-filter.mp-filter-open .mp-filter-arrow{transform:rotate(180deg);}.mp-filter-dropdown{display:none;position:absolute;top:calc(100% + 0.625rem);left:0;right:0;background:#ffffff;border-radius:0.5rem;box-shadow:0 14px 36px rgba(0,0,0,0.2);overflow:hidden;max-height:260px;overflow-y:auto;}.mp-filter.mp-filter-open .mp-filter-dropdown{display:block;}.mp-filter-option{display:block;width:100%;text-align:center;padding:0.75rem 1rem;background:none;border:none;border-bottom:2px solid #E97300;font-size:0.875rem;font-weight:700;color:#003B71;cursor:pointer;font-family:inherit;transition:background 0.15s;}.mp-filter-option:last-child{border-bottom:none;}.mp-filter-option:hover{background:#f8fafc;}.mp-map-wrapper{position:relative;width:100%;height:440px;border-radius:0.5rem;overflow:hidden;}.mp-map{width:100%;height:100%;z-index:1;}.mp-map-overlay{position:absolute;inset:0;background:rgba(0,59,113,0.4);opacity:0;pointer-events:none;transition:opacity 0.2s ease;z-index:20;}.mp-map-overlay.mp-overlay-active{opacity:1;}@media(max-width:1280px){.mp-section{padding:3rem 2.5rem;}}@media(max-width:992px){.mp-section{padding:2.5rem 1.5rem;}.mp-filters{grid-template-columns:1fr;gap:1.25rem;}.mp-map-wrapper{height:320px;}}`;

        if (!doc.getElementById("mp-filter-styles")) {
            const s = doc.createElement("style");
            s.id = "mp-filter-styles";
            s.textContent = RUNTIME_STYLES;
            doc.head.appendChild(s);
        }

        const filtersWrap = root.querySelector("[data-mp-filters]");
        const overlay = root.querySelector("[data-mp-overlay]");
        const mapEl = root.querySelector("[data-mp-map]");

        function closeAllFilters() {
            if (!filtersWrap) return;
            filtersWrap
                .querySelectorAll(".mp-filter.mp-filter-open")
                .forEach((el) => el.classList.remove("mp-filter-open"));
            if (overlay) overlay.classList.remove("mp-overlay-active");
        }

        if (filtersWrap && !filtersWrap.__mpBound) {
            filtersWrap.__mpBound = true;

            filtersWrap
                .querySelectorAll("[data-filter-toggle]")
                .forEach((btn) => {
                    btn.addEventListener("click", (e) => {
                        e.stopPropagation();
                        const filterEl = btn.closest(".mp-filter");
                        const wasOpen =
                            filterEl.classList.contains("mp-filter-open");
                        closeAllFilters();
                        if (!wasOpen) {
                            filterEl.classList.add("mp-filter-open");
                            if (overlay)
                                overlay.classList.add("mp-overlay-active");
                        }
                    });
                });

            filtersWrap.querySelectorAll(".mp-filter-option").forEach((opt) => {
                opt.addEventListener("click", () => {
                    const idx = opt.dataset.filterIndex;
                    const label = filtersWrap.querySelector(
                        `[data-filter-label="${idx}"]`,
                    );
                    if (label) label.textContent = opt.textContent;
                    closeAllFilters();
                });
            });

            doc.addEventListener("click", (e) => {
                if (!root.contains(e.target)) return;
                if (!e.target.closest(".mp-filter")) closeAllFilters();
            });
        }

        async function loadMapLibrary() {
            if (!doc.getElementById("leaflet-css")) {
                const link = doc.createElement("link");
                link.id = "leaflet-css";
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                doc.head.appendChild(link);
            }
            const win = doc.defaultView ?? window;
            if (typeof win.L === "undefined") {
                await new Promise((resolve, reject) => {
                    const script = doc.createElement("script");
                    script.src =
                        "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                    script.onload = resolve;
                    script.onerror = reject;
                    doc.head.appendChild(script);
                });
            }
            return win.L;
        }

        async function initMap() {
            if (!mapEl || mapEl.__mpMapInit) return;
            try {
                const L = await loadMapLibrary();
                if (!L || mapEl.__mpMapInit) return;
                mapEl.__mpMapInit = true;

                const map = L.map(mapEl, { zoomControl: true }).setView(
                    [13.7942, -88.8965],
                    8,
                );
                mapEl._map = map;

                L.tileLayer(
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    {
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    },
                ).addTo(map);

                map.whenReady(function () {
                    setTimeout(() => {
                        if (map && map.invalidateSize) map.invalidateSize();
                    }, 300);
                });
            } catch (error) {
                console.warn("No se pudo inicializar el mapa:", error);
            }
        }

        initMap();
    };
}

function showMapFilterModal(editor, component) {
    const existing = document.getElementById("map-filter-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("mp-modal-styles")) {
        const style = document.createElement("style");
        style.id = "mp-modal-styles";
        style.textContent = `
            .mp-overlay-modal{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .mp-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .mp-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .mp-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .mp-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .mp-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .mp-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .mp-modal-close:hover{background:#f1f5f9;color:#475569;}
            .mp-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;overflow-x:auto;}
            .mp-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
            .mp-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .mp-tab-btn i{font-size:1rem;}
            .mp-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .mp-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .mp-tab-panel.active{display:flex;}
            .mp-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .mp-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .mp-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .mp-input:focus{border-color:#3b82f6;}
            .mp-textarea{width:100%;box-sizing:border-box;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.8125rem;outline:none;font-family:inherit;resize:vertical;min-height:80px;}
            .mp-textarea:focus{border-color:#3b82f6;}
            .mp-hint{font-size:0.75rem;color:#94a3b8;margin:0.375rem 0 0;}
            .mp-filter-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.875rem;display:flex;flex-direction:column;gap:0.625rem;}
            .mp-filter-card-header{display:flex;align-items:center;justify-content:space-between;gap:0.5rem;}
            .mp-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:0.25rem;transition:background 0.15s;}
            .mp-btn-remove:hover{background:#fef2f2;}
            .mp-btn-add{padding:0.5rem 1rem;border:none;border-radius:0.5rem;color:#fff;font-size:0.8125rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;background:#003B71;transition:background 0.15s;align-self:flex-start;}
            .mp-btn-add:hover{background:#002a52;}
            .mp-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .mp-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .mp-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .mp-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .mp-btn-save:hover{background:#d97821;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-map-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const title = currentData.title || DEFAULT_MAP_FILTER_DATA.title;
    const statsText =
        currentData.stats_text || DEFAULT_MAP_FILTER_DATA.stats_text;
    const filters = JSON.parse(
        JSON.stringify(currentData.filters || DEFAULT_MAP_FILTER_DATA.filters),
    );

    const overlay = document.createElement("div");
    overlay.id = "map-filter-config-modal";
    overlay.className = "mp-overlay-modal";

    const modal = document.createElement("div");
    modal.className = "mp-modal";
    modal.innerHTML = `
        <div class="mp-modal-header">
            <div class="mp-modal-header-left"><i class="ri-map-2-line"></i><h2>Configurar Mapa y Filtros</h2></div>
            <button id="mp-modal-close" class="mp-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="mp-modal-tabs">
            <button class="mp-tab-btn active" data-tab="content"><i class="ri-text"></i> Contenido</button>
            <button class="mp-tab-btn" data-tab="filters"><i class="ri-filter-3-line"></i> Filtros</button>
        </div>
        <div class="mp-modal-body">
            <div class="mp-tab-panel active" id="mp-panel-content">
                <div class="mp-card">
                    <label class="mp-label">Título</label>
                    <input id="mp-title" type="text" value="${title}" class="mp-input">
                </div>
                <div class="mp-card">
                    <label class="mp-label">Texto de estadísticas</label>
                    <textarea id="mp-stats" class="mp-textarea">${statsText}</textarea>
                    <p class="mp-hint">Envuelve los números o palabras que quieras en naranja con doble asterisco, ej: **27** agencias.</p>
                </div>
            </div>
            <div class="mp-tab-panel" id="mp-panel-filters">
                <div id="mp-filters-list" style="display:flex;flex-direction:column;gap:0.875rem;"></div>
                <button type="button" id="mp-add-filter" class="mp-btn-add"><i class="ri-add-line"></i> Agregar filtro</button>
            </div>
        </div>
        <div class="mp-modal-footer">
            <button id="mp-modal-cancel" class="mp-btn-cancel">Cancelar</button>
            <button id="mp-modal-save" class="mp-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelectorAll(".mp-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".mp-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".mp-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#mp-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    const filtersList = modal.querySelector("#mp-filters-list");

    function renderFilters() {
        filtersList.innerHTML = "";
        filters.forEach((filter, idx) => {
            const card = document.createElement("div");
            card.className = "mp-filter-card";
            card.innerHTML = `
                <div class="mp-filter-card-header">
                    <input class="mp-input" style="flex:1;" placeholder="Etiqueta del filtro" value="${filter.label || ""}" data-filter-field="label">
                    <button type="button" class="mp-btn-remove" data-remove-filter><i class="ri-delete-bin-line"></i></button>
                </div>
                <textarea class="mp-textarea" placeholder="Una opción por línea" style="min-height:70px;" data-filter-field="options">${(filter.options || []).join("\n")}</textarea>
            `;
            card.querySelector("[data-filter-field='label']").addEventListener(
                "input",
                (e) => {
                    filter.label = e.target.value;
                },
            );
            card.querySelector(
                "[data-filter-field='options']",
            ).addEventListener("input", (e) => {
                filter.options = e.target.value
                    .split("\n")
                    .map((v) => v.trim())
                    .filter(Boolean);
            });
            card.querySelector("[data-remove-filter]").addEventListener(
                "click",
                () => {
                    filters.splice(idx, 1);
                    renderFilters();
                },
            );
            filtersList.appendChild(card);
        });
    }
    renderFilters();

    modal.querySelector("#mp-add-filter").addEventListener("click", () => {
        filters.push({
            label: "Nuevo filtro",
            options: ["Opción 1", "Opción 2"],
        });
        renderFilters();
    });

    const close = () => overlay.remove();
    modal.querySelector("#mp-modal-close").onclick = close;
    modal.querySelector("#mp-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#mp-modal-save").onclick = () => {
        const data = {
            title: modal.querySelector("#mp-title").value.trim(),
            stats_text: modal.querySelector("#mp-stats").value.trim(),
            filters: filters.filter((f) => f.label),
        };

        const existingInner = component
            .getEl()
            ?.querySelector("[id^='mp-root-']");
        const uid =
            existingInner?.id?.replace("mp-root-", "") ||
            "mp" + Math.random().toString(36).slice(2, 7);
        component.addAttributes({ "data-map-config": JSON.stringify(data) });
        component.components(
            buildMapFilterHTML(data, uid) +
                `<style>${MAP_FILTER_STYLES}</style>`,
        );
        close();
    };
}

export const mapFilterBlocks = [
    {
        id: "map-filter-block",
        label: "Mapa con Filtros",
        category: "Interactivos",
        media: mapFilterBlockIcon,
        content: { type: "map-filter-component" },
    },
];

export function initializeMapFilterBlocks(editor) {
    const componentType = "map-filter-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Mapa con Filtros",
                tagName: "div",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: {
                    "data-gjs-type": componentType,
                    "data-map-config": JSON.stringify(DEFAULT_MAP_FILTER_DATA),
                },
                components:
                    buildMapFilterHTML(DEFAULT_MAP_FILTER_DATA) +
                    `<style>${MAP_FILTER_STYLES}</style>`,
                script: createMapFilterScript(),
                toolbar: [],
                traits: [
                    {
                        type: "button",
                        label: "Mapa con Filtros",
                        text: "Administrar Mapa y Filtros",
                        full: true,
                        command: "open-map-filter-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-map-filter-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showMapFilterModal(ed, selected);
        },
    });

    setupMapFilterEditorEvents(editor, componentType);
    injectMapFilterEditorStyles(editor, componentType);
}

function setupMapFilterEditorEvents(editor, componentType) {
    editor.on("storage:end:load", () => {
        setTimeout(
            () => reinitializeMapFilterComponents(editor, componentType),
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

    editor.on("component:clone", (component) => {
        if (component.get("type") === componentType) {
            const el = component.getEl();
            if (el) {
                const mapEl = el.querySelector("[data-mp-map]");
                if (mapEl && mapEl._map) {
                    mapEl._map.remove();
                    delete mapEl._map;
                    delete mapEl.__mpMapInit;
                }
                setTimeout(() => {
                    const script = component.get("script");
                    if (script && typeof script === "function") script.call(el);
                }, 500);
            }
        }
    });

    editor.on("canvas:render", () => {
        setTimeout(
            () => reinitializeMapFilterComponents(editor, componentType),
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

function reinitializeMapFilterComponents(editor, componentType) {
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

function injectMapFilterEditorStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const head = iframe.contentDocument?.head;
        if (!head) return;

        if (!head.querySelector("#leaflet-css")) {
            const leafletCSS = document.createElement("link");
            leafletCSS.id = "leaflet-css";
            leafletCSS.rel = "stylesheet";
            leafletCSS.href =
                "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            head.appendChild(leafletCSS);
        }

        if (!head.querySelector("#mp-filter-styles")) {
            const s = document.createElement("style");
            s.id = "mp-filter-styles";
            s.textContent = MAP_FILTER_STYLES;
            head.appendChild(s);
        }

        if (!head.querySelector(`#${componentType}-editor-css`)) {
            const s = document.createElement("style");
            s.id = `${componentType}-editor-css`;
            s.textContent = `.leaflet-container{height:100%;width:100%;border-radius:inherit;z-index:0;}`;
            head.appendChild(s);
        }
    });
}
