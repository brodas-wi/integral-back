export const SECTION_TYPE = "lp-section";
export const ITEM_TYPE = "lp-item";
export const NOTE_TYPE = "lp-note";

const ITEMS = [
    "Nombre del titular o representante legal.",
    "Dirección de domicilio y medio para recibir notificaciones de su gestión.",
    "Copia de documento de identidad.",
    "Descripción clara de los datos personales sobre los que busca ejercer algún derecho.",
    "La descripción del derecho ARCO-POL que pretende ejercer.",
    "Cualquier otro elemento o documento que facilite el proceso de gestión.",
];

const TITLE = "Las peticiones deberán complementarse con la siguiente información:";

const NOTE_HTML =
    "La resolución de solicitudes se realizará en los plazos definidos en la <strong>“Ley de Protección de Datos Personales”</strong>.";

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const HIDDEN = 'data-gjs-selectable="false" data-gjs-hoverable="false"';
const CONTAINER = `${FIXED} data-gjs-droppable=".lp-note" ${HIDDEN}`;
const PANEL = `${FIXED} data-gjs-droppable=".lp-title,.lp-list" ${HIDDEN}`;
const LIST = `${FIXED} data-gjs-droppable=".lp-item" ${HIDDEN}`;
const IN_PANEL = 'data-gjs-draggable=".lp-panel"';
const IN_CONTAINER = 'data-gjs-draggable=".lp-container"';

const LP_CSS = `
.lp-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.lp-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1rem,2vw,1.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.lp-panel{display:flex;flex-direction:column;gap:0.875rem;box-sizing:border-box;padding-top:clamp(1.25rem,2.5vw,1.75rem);padding-right:clamp(1.25rem,2.5vw,1.75rem);padding-bottom:clamp(1.25rem,2.5vw,1.75rem);padding-left:clamp(1.25rem,2.5vw,1.75rem);border-radius:1.25rem;background-color:#F4F6F9;}
.lp-title{margin:0;color:#003B71;font-weight:600;font-size:clamp(0.9375rem,1.4vw,1rem);line-height:1.4;}
.lp-list{margin:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:1.25rem;list-style-type:disc;list-style-position:outside;display:flex;flex-direction:column;gap:0.25rem;min-height:1.5rem;}
.lp-item{margin:0;color:#003B71;font-weight:400;font-size:0.8125rem;line-height:1.6;}
.lp-item::marker{font-size:0.8em;}
.lp-note{margin:clamp(1.25rem,2.5vw,1.75rem) 0 0;color:#003B71;font-weight:400;font-size:0.8125rem;line-height:1.6;}
.lp-note strong{font-weight:700;}
`;

export const STYLES = `<style>${LP_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

const bullet = (y, width) => `
<circle cx="8" cy="${y}" r="0.7" fill="#003B71" fill-opacity="0.7"/>
<rect x="10.5" y="${y - 0.6}" width="${width}" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.45"/>`;

export const ICONS = {
    section: svg(`
<rect x="3" y="4" width="26" height="18" rx="3" fill="#F4F6F9" stroke="#cbd5e1" stroke-width="0.6"/>
<rect x="6" y="7" width="14" height="1.8" rx="0.9" fill="#003B71" fill-opacity="0.75"/>
${bullet(12.2, 14)}${bullet(15.4, 12)}${bullet(18.6, 15)}
<rect x="3" y="25" width="20" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.45"/>
<rect x="3" y="28" width="12" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.45"/>`),
    item: svg(`
<circle cx="9" cy="16" r="1.4" fill="#003B71" fill-opacity="0.75"/>
<rect x="13" y="14.7" width="14" height="2.6" rx="1.3" fill="#003B71" fill-opacity="0.5"/>`),
    note: svg(`
<rect x="4" y="12" width="24" height="1.8" rx="0.9" fill="#003B71" fill-opacity="0.5"/>
<rect x="4" y="16.2" width="14" height="1.8" rx="0.9" fill="#003B71" fill-opacity="0.8"/>`),
};

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function buildItem(text = "Escribe aquí el texto.") {
    return `<li class="lp-item" data-gjs-type="${ITEM_TYPE}">${escapeHtml(text)}</li>`;
}

export function buildNote() {
    return `<p class="lp-note" data-gjs-type="${NOTE_TYPE}">${NOTE_HTML}</p>`;
}

export function buildSection() {
    const items = ITEMS.map((text) => buildItem(text)).join("");

    return `<section class="lp-section" data-gjs-type="${SECTION_TYPE}"><div class="lp-container" ${CONTAINER}><div class="lp-panel" ${PANEL}><h3 class="lp-title" data-gjs-type="text" ${IN_PANEL}>${escapeHtml(TITLE)}</h3><ul class="lp-list" role="list" ${LIST}>${items}</ul></div><p class="lp-note" data-gjs-type="${NOTE_TYPE}">${NOTE_HTML}</p></div></section>`;
}