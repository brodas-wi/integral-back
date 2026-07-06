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
.mp-filter-option:disabled{opacity:0.5;cursor:default;pointer-events:none;}
.mp-map-wrapper{position:relative;width:100%;height:440px;border-radius:0.5rem;overflow:hidden;}
.mp-map{width:100%;height:100%;z-index:1;}
.mp-map-overlay{position:absolute;inset:0;background:rgba(0,59,113,0.4);opacity:0;pointer-events:none;transition:opacity 0.2s ease;z-index:20;}
.mp-map-overlay.mp-overlay-active{opacity:1;}
.mp-pin{background:transparent!important;border:none!important;}
.mp-popup{font-family:'Poppins',sans-serif;min-width:180px;}
.mp-popup-name{margin:0 0 0.375rem;font-size:0.875rem;font-weight:700;color:#003B71;}
.mp-popup-line{margin:0 0 0.25rem;font-size:0.8125rem;color:#475569;display:flex;align-items:flex-start;gap:0.375rem;line-height:1.4;}
.mp-popup-line i{color:#E97300;margin-top:0.125rem;}
.mp-popup-line:last-child{margin-bottom:0;}
@media(max-width:1280px){.mp-section{padding:3rem 2.5rem;}}
@media(max-width:992px){
.mp-section{padding:2.5rem 1.5rem;}
.mp-filters{grid-template-columns:1fr;gap:1.25rem;}
.mp-map-wrapper{height:320px;}
}`;

function mapFilterEscapeHtml(text) {
    return String(text ?? "").replace(
        /[&<>"']/g,
        (c) =>
            ({
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;",
            })[c],
    );
}

function mapFilterHighlightStats(text) {
    return mapFilterEscapeHtml(text).replace(
        /\*\*(.+?)\*\*/g,
        '<span class="mp-num">$1</span>',
    );
}

function buildMapFilterHTML(data, uid) {
    uid = uid || "mp" + Math.random().toString(36).slice(2, 7);

    return `<section id="mp-root-${uid}" class="mp-section" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <p class="mp-stats">${mapFilterHighlightStats(data.stats_text)}</p>
        <h2 class="mp-title">${mapFilterEscapeHtml(data.title || "Horarios y Agencias:")}</h2>
        <div class="mp-filters" data-mp-filters>
            <div class="mp-filter" data-filter-index="0">
                <button type="button" class="mp-filter-btn" data-filter-toggle="0">
                    <span class="mp-filter-label" data-filter-label="0">Agencias / Puntos de pago</span>
                    <i class="ri-arrow-down-s-line mp-filter-arrow"></i>
                </button>
                <div class="mp-filter-dropdown">
                    <button type="button" class="mp-filter-option" data-type="">Todos</button>
                    <button type="button" class="mp-filter-option" data-type="agency">Agencias</button>
                    <button type="button" class="mp-filter-option" data-type="payment_point">Puntos de pago</button>
                </div>
            </div>
            <div class="mp-filter" data-filter-index="1">
                <button type="button" class="mp-filter-btn" data-filter-toggle="1">
                    <span class="mp-filter-label" data-filter-label="1">Departamento</span>
                    <i class="ri-arrow-down-s-line mp-filter-arrow"></i>
                </button>
                <div class="mp-filter-dropdown">
                    <button type="button" class="mp-filter-option" disabled>Cargando...</button>
                </div>
            </div>
            <div class="mp-filter" data-filter-index="2">
                <button type="button" class="mp-filter-btn" data-filter-toggle="2">
                    <span class="mp-filter-label" data-filter-label="2">Seleccione una ubicación</span>
                    <i class="ri-arrow-down-s-line mp-filter-arrow"></i>
                </button>
                <div class="mp-filter-dropdown">
                    <button type="button" class="mp-filter-option" disabled>Cargando...</button>
                </div>
            </div>
        </div>
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
};

function createMapFilterScript() {
    return function () {
        const root = this;
        const doc = root.ownerDocument ?? document;

        const RUNTIME_STYLES = `.mp-section{width:100%;background:#ffffff;padding:3.5rem 4rem;font-family:'Poppins',sans-serif;}.mp-stats{font-size:1.125rem;font-weight:700;color:#003B71;margin:0 0 1.75rem;line-height:1.5;}.mp-stats .mp-num{color:#E97300;}.mp-title{font-size:1.75rem;font-weight:800;color:#E97300;margin:0 0 1.5rem;}.mp-filters{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;margin-bottom:2rem;position:relative;z-index:30;}.mp-filter{position:relative;}.mp-filter-btn{display:flex;align-items:center;justify-content:space-between;width:100%;background:none;border:none;border-bottom:2px solid #E97300;padding:0.5rem 0.25rem 0.625rem;cursor:pointer;font-family:inherit;}.mp-filter-label{font-size:0.9375rem;font-weight:700;color:#003B71;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.mp-filter-arrow{color:#003B71;font-size:0.75rem;transition:transform 0.2s ease;flex-shrink:0;margin-left:0.75rem;}.mp-filter.mp-filter-open .mp-filter-arrow{transform:rotate(180deg);}.mp-filter-dropdown{display:none;position:absolute;top:calc(100% + 0.625rem);left:0;right:0;background:#ffffff;border-radius:0.5rem;box-shadow:0 14px 36px rgba(0,0,0,0.2);overflow:hidden;max-height:260px;overflow-y:auto;}.mp-filter.mp-filter-open .mp-filter-dropdown{display:block;}.mp-filter-option{display:block;width:100%;text-align:center;padding:0.75rem 1rem;background:none;border:none;border-bottom:2px solid #E97300;font-size:0.875rem;font-weight:700;color:#003B71;cursor:pointer;font-family:inherit;transition:background 0.15s;}.mp-filter-option:last-child{border-bottom:none;}.mp-filter-option:hover{background:#f8fafc;}.mp-filter-option:disabled{opacity:0.5;cursor:default;pointer-events:none;}.mp-map-wrapper{position:relative;width:100%;height:440px;border-radius:0.5rem;overflow:hidden;}.mp-map{width:100%;height:100%;z-index:1;}.mp-map-overlay{position:absolute;inset:0;background:rgba(0,59,113,0.4);opacity:0;pointer-events:none;transition:opacity 0.2s ease;z-index:20;}.mp-map-overlay.mp-overlay-active{opacity:1;}.mp-pin{background:transparent!important;border:none!important;}.mp-popup{font-family:'Poppins',sans-serif;min-width:180px;}.mp-popup-name{margin:0 0 0.375rem;font-size:0.875rem;font-weight:700;color:#003B71;}.mp-popup-line{margin:0 0 0.25rem;font-size:0.8125rem;color:#475569;display:flex;align-items:flex-start;gap:0.375rem;line-height:1.4;}.mp-popup-line i{color:#E97300;margin-top:0.125rem;}.mp-popup-line:last-child{margin-bottom:0;}@media(max-width:1280px){.mp-section{padding:3rem 2.5rem;}}@media(max-width:992px){.mp-section{padding:2.5rem 1.5rem;}.mp-filters{grid-template-columns:1fr;gap:1.25rem;}.mp-map-wrapper{height:320px;}}`;

        if (!doc.getElementById("mp-filter-styles")) {
            const s = doc.createElement("style");
            s.id = "mp-filter-styles";
            s.textContent = RUNTIME_STYLES;
            doc.head.appendChild(s);
        }

        const filtersWrap = root.querySelector("[data-mp-filters]");
        const overlay = root.querySelector("[data-mp-overlay]");
        const mapEl = root.querySelector("[data-mp-map]");
        if (!filtersWrap || !mapEl) return;

        const DEFAULT_CENTER = [13.7942, -88.8965];
        const DEFAULT_ZOOM = 8;

        const state = {
            departments: [],
            agencies: [],
            paymentPoints: [],
            type: null,
            department: null,
            pointKey: null,
        };

        let map = null;
        let markersLayer = null;
        let L = null;

        function closeAllFilters() {
            filtersWrap
                .querySelectorAll(".mp-filter.mp-filter-open")
                .forEach((el) => el.classList.remove("mp-filter-open"));
            if (overlay) overlay.classList.remove("mp-overlay-active");
        }

        function escapeHtml(text) {
            return String(text ?? "").replace(
                /[&<>"']/g,
                (c) =>
                    ({
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&#39;",
                    })[c],
            );
        }

        function pinIconSvg(color) {
            return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 42" width="30" height="42"><path d="M15 0C6.7 0 0 6.7 0 15c0 11.3 15 27 15 27s15-15.7 15-27C30 6.7 23.3 0 15 0z" fill="${color}"/><circle cx="15" cy="14" r="5.5" fill="#ffffff"/></svg>`;
        }

        function buildIcon(color) {
            return L.divIcon({
                className: "mp-pin",
                html: pinIconSvg(color),
                iconSize: [30, 42],
                iconAnchor: [15, 42],
                popupAnchor: [0, -38],
            });
        }

        function buildPopupHtml(item) {
            const parts = [
                `<div class="mp-popup"><p class="mp-popup-name">${escapeHtml(item.name)}</p>`,
            ];
            if (item.address) {
                parts.push(
                    `<p class="mp-popup-line"><i class="ri-map-pin-2-line"></i> ${escapeHtml(item.address)}</p>`,
                );
            }
            if (item.type === "agency" && item.schedule) {
                parts.push(
                    `<p class="mp-popup-line"><i class="ri-time-line"></i> ${escapeHtml(item.schedule)}</p>`,
                );
            }
            if (item.type === "payment_point" && item.correspondent) {
                parts.push(
                    `<p class="mp-popup-line"><i class="ri-store-2-line"></i> ${escapeHtml(item.correspondent)}</p>`,
                );
            }
            parts.push("</div>");
            return parts.join("");
        }

        function allPoints() {
            return [...state.agencies, ...state.paymentPoints];
        }

        function filteredPoints() {
            return allPoints().filter((p) => {
                if (state.type && p.type !== state.type) return false;
                if (state.department && p.department !== state.department)
                    return false;
                return true;
            });
        }

        function renderMarkers() {
            if (!markersLayer || !L) return;
            markersLayer.clearLayers();
            filteredPoints().forEach((item) => {
                const color = item.type === "agency" ? "#E97300" : "#003B71";
                const marker = L.marker([item.lat, item.lng], {
                    icon: buildIcon(color),
                });
                marker.bindPopup(buildPopupHtml(item));
                marker.__mpKey = `${item.type}-${item.id}`;
                markersLayer.addLayer(marker);
            });
        }

        function focusDefault() {
            if (map) map.flyTo(DEFAULT_CENTER, DEFAULT_ZOOM);
        }

        function focusDepartment() {
            const dep = state.departments.find(
                (d) => d.name === state.department,
            );
            if (map && dep && dep.lat && dep.lng) {
                map.flyTo([dep.lat, dep.lng], dep.zoom || 11);
            }
        }

        function focusPoint() {
            if (!map || !markersLayer) return;
            let found = null;
            markersLayer.eachLayer((marker) => {
                if (marker.__mpKey === state.pointKey) found = marker;
            });
            if (found) {
                map.flyTo(found.getLatLng(), 17);
                setTimeout(() => found.openPopup(), 350);
            }
        }

        function applyMapState() {
            renderMarkers();
            if (state.pointKey) {
                focusPoint();
            } else if (state.department) {
                focusDepartment();
            } else {
                focusDefault();
            }
        }

        function rebuildLocationFilterOptions() {
            const dropdown = filtersWrap.querySelector(
                '[data-filter-index="2"] .mp-filter-dropdown',
            );
            const label = filtersWrap.querySelector('[data-filter-label="2"]');
            if (!dropdown) return;

            const points = filteredPoints();
            const optionsHtml = [
                `<button type="button" class="mp-filter-option" data-point-key="">Todas</button>`,
            ]
                .concat(
                    points.map(
                        (p) =>
                            `<button type="button" class="mp-filter-option" data-point-key="${p.type}-${p.id}">${escapeHtml(p.name)}</button>`,
                    ),
                )
                .join("");
            dropdown.innerHTML = optionsHtml;

            state.pointKey = null;
            if (label) label.textContent = "Seleccione una ubicación";

            dropdown.querySelectorAll(".mp-filter-option").forEach((opt) => {
                opt.addEventListener("click", () => {
                    const key = opt.dataset.pointKey || "";
                    state.pointKey = key || null;
                    if (label) label.textContent = opt.textContent;
                    closeAllFilters();
                    applyMapState();
                });
            });
        }

        function rebuildDepartmentOptions() {
            const dropdown = filtersWrap.querySelector(
                '[data-filter-index="1"] .mp-filter-dropdown',
            );
            if (!dropdown) return;

            const optionsHtml = [
                `<button type="button" class="mp-filter-option" data-dept="">Todos los departamentos</button>`,
            ]
                .concat(
                    state.departments.map(
                        (d) =>
                            `<button type="button" class="mp-filter-option" data-dept="${escapeHtml(d.name)}">${escapeHtml(d.name)}</button>`,
                    ),
                )
                .join("");
            dropdown.innerHTML = optionsHtml;

            dropdown.querySelectorAll(".mp-filter-option").forEach((opt) => {
                opt.addEventListener("click", () => {
                    state.department = opt.dataset.dept || null;
                    const label = filtersWrap.querySelector(
                        '[data-filter-label="1"]',
                    );
                    if (label) label.textContent = opt.textContent;
                    closeAllFilters();
                    rebuildLocationFilterOptions();
                    applyMapState();
                });
            });
        }

        function bindTypeOptionEvents() {
            const dropdown = filtersWrap.querySelector(
                '[data-filter-index="0"] .mp-filter-dropdown',
            );
            if (!dropdown) return;
            dropdown.querySelectorAll(".mp-filter-option").forEach((opt) => {
                opt.addEventListener("click", () => {
                    state.type = opt.dataset.type || null;
                    const label = filtersWrap.querySelector(
                        '[data-filter-label="0"]',
                    );
                    if (label) label.textContent = opt.textContent;
                    closeAllFilters();
                    rebuildLocationFilterOptions();
                    applyMapState();
                });
            });
        }

        if (!filtersWrap.__mpBound) {
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

        async function fetchMapData() {
            try {
                const res = await fetch("/api/map-locations", {
                    headers: { Accept: "application/json" },
                });
                if (!res.ok)
                    throw new Error(
                        "No se pudo cargar la información del mapa",
                    );
                const data = await res.json();
                state.departments = data.departments || [];
                state.agencies = data.agencies || [];
                state.paymentPoints = data.payment_points || [];
            } catch (err) {
                console.warn("[MapFilter] Error al cargar datos:", err);
            }
        }

        async function initMap() {
            if (!mapEl || mapEl.__mpMapInit) return;
            try {
                L = await loadMapLibrary();
                if (!L || mapEl.__mpMapInit) return;
                mapEl.__mpMapInit = true;

                map = L.map(mapEl, { zoomControl: true }).setView(
                    DEFAULT_CENTER,
                    DEFAULT_ZOOM,
                );
                mapEl._map = map;

                L.tileLayer(
                    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                    {
                        attribution:
                            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    },
                ).addTo(map);

                markersLayer = L.layerGroup().addTo(map);

                map.whenReady(function () {
                    setTimeout(() => {
                        if (map && map.invalidateSize) map.invalidateSize();
                    }, 300);
                });

                await fetchMapData();
                bindTypeOptionEvents();
                rebuildDepartmentOptions();
                rebuildLocationFilterOptions();
                applyMapState();
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
            .mp-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:600px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .mp-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .mp-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .mp-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .mp-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .mp-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .mp-modal-close:hover{background:#f1f5f9;color:#475569;}
            .mp-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .mp-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .mp-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .mp-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .mp-input:focus{border-color:#3b82f6;}
            .mp-textarea{width:100%;box-sizing:border-box;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.8125rem;outline:none;font-family:inherit;resize:vertical;min-height:80px;}
            .mp-textarea:focus{border-color:#3b82f6;}
            .mp-hint{font-size:0.75rem;color:#94a3b8;margin:0.375rem 0 0;}
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
        <div class="mp-modal-body">
            <div class="mp-card">
                <label class="mp-label">Título</label>
                <input id="mp-title" type="text" value="${title}" class="mp-input">
            </div>
            <div class="mp-card">
                <label class="mp-label">Texto de estadísticas</label>
                <textarea id="mp-stats" class="mp-textarea">${statsText}</textarea>
                <p class="mp-hint">Envuelve los números o palabras que quieras en naranja con doble asterisco, ej: **27** agencias.</p>
            </div>
            <p class="mp-hint">Los filtros y ubicaciones del mapa se generan automáticamente a partir de las agencias y puntos de pago activos con coordenadas registrados en el sistema.</p>
        </div>
        <div class="mp-modal-footer">
            <button id="mp-modal-cancel" class="mp-btn-cancel">Cancelar</button>
            <button id="mp-modal-save" class="mp-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

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
