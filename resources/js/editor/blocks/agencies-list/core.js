export const COMPONENT_TYPE = "agencies-list-component";
export const AGENCIES_LIST_VERSION = "1";

export const ZONE_OPTIONS = [
    { id: "", name: "Todas las zonas" },
    { id: "Central", name: "Central" },
    { id: "Paracentral", name: "Paracentral" },
    { id: "Occidental", name: "Occidental" },
    { id: "Oriental", name: "Oriental" },
];

export const PROPAGATED = [
    "editable",
    "selectable",
    "hoverable",
    "droppable",
    "highlightable",
    "stylable",
    "resizable",
];

export const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="28" height="1.2" fill="#E97300"/>
    <rect x="2" y="6" width="12" height="2" rx="1" fill="#E97300"/>
    <rect x="2" y="10" width="6" height="1.4" rx="0.7" fill="#003B71"/>
    <rect x="2" y="12.5" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
    <rect x="2" y="14.5" width="4" height="1" rx="0.5" fill="#E97300"/>
    <rect x="10" y="10" width="6" height="1.4" rx="0.7" fill="#003B71"/>
    <rect x="10" y="12.5" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="14.5" width="4" height="1" rx="0.5" fill="#E97300"/>
    <rect x="18" y="10" width="6" height="1.4" rx="0.7" fill="#003B71"/>
    <rect x="18" y="12.5" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
    <rect x="18" y="14.5" width="4" height="1" rx="0.5" fill="#E97300"/>
    <rect x="2" y="19" width="28" height="1.2" fill="#E97300"/>
    <rect x="2" y="22" width="12" height="2" rx="1" fill="#E97300"/>
    <rect x="2" y="26" width="6" height="1.4" rx="0.7" fill="#003B71"/>
    <rect x="10" y="26" width="6" height="1.4" rx="0.7" fill="#003B71"/>
    <rect x="18" y="26" width="6" height="1.4" rx="0.7" fill="#003B71"/>
</svg>`;

const LOCKED = 'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"';

export const INITIAL_CONTENT = `<div class="ag-container" ${LOCKED}><div data-ag-content ${LOCKED}></div></div>`;

export function createAgenciesScript() {
    return function () {
        const section = this;
        const doc = section.ownerDocument || document;
        const win = doc.defaultView || window;
        const content = section.querySelector("[data-ag-content]");
        if (!content) return;

        const readMeta = (name) => {
            const find = (target) => target.querySelector(`meta[name="${name}"]`)?.content || "";
            let value = find(doc);
            if (!value) {
                try {
                    value = find(win.parent.document);
                } catch {
                    value = "";
                }
            }
            return value;
        };

        const appBase = readMeta("app-url").replace(/\/$/, "");
        const endpoint =
            readMeta("api-agencies-url") || (appBase ? `${appBase}/api/agencies/list` : "");

        const STYLES = `
.ag-section{width:100%;box-sizing:border-box;background-color:#fff;font-family:'Poppins',sans-serif;padding-top:clamp(2rem,4vw,3rem);padding-bottom:clamp(2rem,4vw,3rem);}
.ag-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-left:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);}
.ag-zone{margin-bottom:2.5rem;}
.ag-zone:last-child{margin-bottom:0;}
.ag-zone-line{width:100%;height:3px;margin-bottom:1rem;background-color:#E97300;}
.ag-zone-title{margin:0 0 1.25rem;font-size:1.75rem;font-weight:600;line-height:1.2;text-transform:uppercase;color:#E97300;}
.ag-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:2rem 1.5rem;}
.ag-card{display:flex;flex-direction:column;gap:0.125rem;min-width:0;font-size:0.8125rem;line-height:1.5;color:#003B71;overflow-wrap:break-word;}
.ag-name{margin:0;font-weight:700;}
.ag-address{margin:0;}
.ag-map{align-self:flex-start;font-weight:700;color:#E97300;text-decoration:underline;}
.ag-map:hover{color:#C96200;}
.ag-map:focus-visible{outline:2px solid #E97300;outline-offset:2px;}
.ag-phones{margin:0;}
.ag-schedule-title{margin:0;font-weight:700;}
.ag-schedule-line{margin:0;}
.ag-empty{padding:3rem 1rem;text-align:center;font-size:0.875rem;color:#94a3b8;}
.ag-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;padding:4rem 1rem;font-size:0.875rem;color:#94a3b8;}
.ag-spinner{width:2.25rem;height:2.25rem;border:3px solid #e5e7eb;border-top-color:#E97300;border-radius:50%;animation:ag-spin 0.8s linear infinite;}
@keyframes ag-spin{to{transform:rotate(360deg);}}
@media(max-width:1100px){.ag-grid{grid-template-columns:repeat(3,minmax(0,1fr));}}
@media(max-width:820px){.ag-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.ag-zone-title{font-size:1.5rem;}}
@media(max-width:560px){.ag-grid{grid-template-columns:minmax(0,1fr);}}
@media(prefers-reduced-motion:reduce){.ag-spinner{animation-duration:2.4s;}}
`;

        let style = doc.getElementById("agencies-list-styles");
        if (!style) {
            style = doc.createElement("style");
            style.id = "agencies-list-styles";
            doc.head.appendChild(style);
        }
        if (style.textContent !== STYLES) style.textContent = STYLES;

        const ORDER = ["central", "paracentral", "occidental", "oriental"];
        const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
        const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ESCAPES[char]);
        const text = (value) => String(value ?? "").trim();
        const key = (value) => text(value).toLowerCase();

        const state = section.__ag || (section.__ag = { data: null, request: 0 });
        const requestId = ++state.request;

        const mapUrl = (agency) => {
            if (agency.latitude == null || agency.longitude == null) return "";
            if (agency.latitude === "" || agency.longitude === "") return "";
            const lat = Number(agency.latitude);
            const lng = Number(agency.longitude);
            if (!Number.isFinite(lat) || !Number.isFinite(lng)) return "";
            if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return "";
            return `https://www.google.com/maps?q=${lat},${lng}`;
        };

        const card = (agency) => {
            const address = text(agency.address);
            const url = mapUrl(agency);
            const phones = (Array.isArray(agency.phones) ? agency.phones : []).map(text).filter(Boolean);
            const lines = text(agency.schedule).split(/\r?\n/).map(text).filter(Boolean);

            const addressHtml = address ? `<p class="ag-address">${esc(address)}</p>` : "";
            const mapHtml = url
                ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="ag-map">Ver ubicación</a>`
                : "";
            const phonesHtml = phones.length
                ? `<p class="ag-phones">${phones.length > 1 ? "Tels" : "Tel"}: ${esc(phones.join(", "))}</p>`
                : "";
            const scheduleHtml = lines.length
                ? `<p class="ag-schedule-title">Horario de atención:</p>${lines.map((line) => `<p class="ag-schedule-line">${esc(line)}</p>`).join("")}`
                : "";

            return `<article class="ag-card"><p class="ag-name">${esc(agency.name)}</p>${addressHtml}${mapHtml}${phonesHtml}${scheduleHtml}</article>`;
        };

        const zoneBlock = (zone) =>
            `<section class="ag-zone"><div class="ag-zone-line"></div><h3 class="ag-zone-title">Zona ${esc(zone.name)}</h3><div class="ag-grid">${zone.items.map(card).join("")}</div></section>`;

        const render = () => {
            const selected = key(section.dataset.zone || "");
            const zones = new Map();

            state.data.forEach((agency) => {
                const zoneName = text(agency.zone) || "Sin zona";
                const zoneKey = key(zoneName);
                if (selected && zoneKey !== selected) return;
                if (!zones.has(zoneKey)) zones.set(zoneKey, { key: zoneKey, name: zoneName, items: [] });
                zones.get(zoneKey).items.push(agency);
            });

            const list = Array.from(zones.values());
            list.forEach((zone) =>
                zone.items.sort((a, b) =>
                    text(a.name).localeCompare(text(b.name), "es", { sensitivity: "base" }),
                ),
            );
            list.sort((a, b) => {
                const first = ORDER.indexOf(a.key) === -1 ? ORDER.length : ORDER.indexOf(a.key);
                const second = ORDER.indexOf(b.key) === -1 ? ORDER.length : ORDER.indexOf(b.key);
                return first - second || a.name.localeCompare(b.name, "es", { sensitivity: "base" });
            });

            content.innerHTML = list.length
                ? list.map(zoneBlock).join("")
                : '<div class="ag-empty">No hay agencias disponibles.</div>';
        };

        const fetchAgencies = () => {
            const cache = (win.__agCache = win.__agCache || {});
            const hit = cache[endpoint];
            if (hit && Date.now() - hit.time < 30000) return hit.promise;

            const promise = fetch(endpoint, { headers: { Accept: "application/json" } }).then((response) => {
                if (!response.ok) throw new Error(String(response.status));
                return response.json();
            });
            cache[endpoint] = { time: Date.now(), promise };
            promise.catch(() => {
                if (cache[endpoint] && cache[endpoint].promise === promise) delete cache[endpoint];
            });
            return promise;
        };

        const load = async () => {
            if (!endpoint) {
                content.innerHTML =
                    '<div class="ag-empty">Vista previa del listado de agencias (los datos reales se cargan en el sitio publicado).</div>';
                return;
            }

            if (state.data) {
                render();
                return;
            }

            content.innerHTML =
                '<div class="ag-loading"><div class="ag-spinner"></div><span>Cargando agencias...</span></div>';

            try {
                const data = await fetchAgencies();
                if (requestId !== state.request) return;
                const list = Array.isArray(data) ? data : data && Array.isArray(data.agencies) ? data.agencies : [];
                state.data = list;
                render();
            } catch {
                if (requestId === state.request) {
                    content.innerHTML = '<div class="ag-empty">No se pudieron cargar las agencias.</div>';
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