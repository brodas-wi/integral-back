export const SECTION_TYPE = "ex-section";
export const CARD_TYPE = "ex-card";
export const TEXT_TYPE = "ex-text";
export const LINK_TYPE = "ex-link";
export const ICON_TYPE = "ex-icon";

const DEFAULT_ICON = "ri-information-line";

export const ICON_OPTIONS = [
    { value: "ri-mail-line", label: "Correo" },
    { value: "ri-map-pin-line", label: "Ubicación" },
    { value: "ri-phone-line", label: "Teléfono" },
    { value: "ri-whatsapp-line", label: "WhatsApp" },
    { value: "ri-smartphone-line", label: "Celular" },
    { value: "ri-customer-service-2-line", label: "Servicio al cliente" },
    { value: "ri-global-line", label: "Sitio web" },
    { value: "ri-computer-line", label: "Computadora" },
    { value: "ri-chat-4-line", label: "Mensaje" },
    { value: "ri-file-text-line", label: "Documento" },
    { value: "ri-printer-line", label: "Impresión" },
    { value: "ri-building-line", label: "Oficina" },
    { value: "ri-bank-line", label: "Banco / Agencia" },
    { value: "ri-user-line", label: "Persona" },
    { value: "ri-time-line", label: "Horario" },
    { value: "ri-information-line", label: "Información" },
];

export const DEFAULT_DATA = {
    title: "¿Cómo ejercer tus derechos?",
    description:
        "El Banco ha nombrado a un delegado de protección de datos personales, responsable de gestionar las solicitudes para el ejercicio de los derechos ARCO-POL, los cuales se entenderán de la siguiente manera:",
    cards: [
        {
            icon: "ri-mail-line",
            title: "1. Correo electrónico",
            items: [
                { kind: "link", text: "servicio.cliente@integral.com.sv", href: "mailto:servicio.cliente@integral.com.sv" },
            ],
        },
        {
            icon: "ri-map-pin-line",
            title: "2. Solicitudes impresas",
            items: [
                {
                    kind: "text",
                    text: "Oficinas Administrativas ubicadas en Alameda Roosevelt y 47 Avenida Sur. Colonia Flor Blanca, San Salvador, El Salvador.",
                },
            ],
        },
    ],
};

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const HIDDEN = 'data-gjs-selectable="false" data-gjs-hoverable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" ${HIDDEN}`;
const HEAD = `${FIXED} data-gjs-droppable=".ex-title,.ex-desc,.ex-sep" ${HIDDEN}`;
const GRID = `${FIXED} data-gjs-droppable=".ex-card" ${HIDDEN}`;
const BODY = `${FIXED} data-gjs-droppable=".ex-card-title,.ex-text,.ex-link" ${HIDDEN}`;
const IN_HEAD = 'data-gjs-draggable=".ex-head"';
const IN_BODY = 'data-gjs-draggable=".ex-body"';

const EX_CSS = `
.ex-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.ex-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.ex-head{margin-bottom:clamp(1.25rem,2.5vw,1.75rem);}
.ex-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.25rem,2.2vw,1.5rem);line-height:1.3;}
.ex-desc{margin:0.5rem 0 0;color:#003B71;font-weight:400;font-size:clamp(0.875rem,1.3vw,0.9375rem);line-height:1.6;}
.ex-sep{height:1rem;margin-top:0.5rem;background-image:linear-gradient(#E97300,#E97300);background-repeat:no-repeat;background-position:center;background-size:100% 2px;}
.ex-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(1rem,2vw,1.5rem);align-items:start;min-height:3rem;}
.ex-card{display:flex;align-items:flex-start;gap:0.875rem;box-sizing:border-box;padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;border-radius:1rem;background-color:#fff;box-shadow:0 6px 24px rgba(0,59,113,0.1);}
.ex-card-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:2.75rem;height:2.75rem;border-radius:0.75rem;background-color:#FCEAD9;}
.ex-card-glyph{display:block;color:#E97300;font-size:1.375rem;line-height:1;}
.ex-body{display:flex;flex-direction:column;gap:0.125rem;flex:1;min-width:0;min-height:1.5rem;}
.ex-card-title{margin:0 0 0.25rem;color:#003B71;font-weight:700;font-size:0.8125rem;line-height:1.4;}
.ex-text{margin:0;color:#003B71;font-weight:400;font-size:0.75rem;line-height:1.55;overflow-wrap:anywhere;}
.ex-link{display:block;align-self:flex-start;color:#E97300;font-weight:400;font-size:0.75rem;line-height:1.55;text-decoration:none;overflow-wrap:anywhere;transition:color 0.2s ease;}
.ex-link:hover{color:#C96200;text-decoration:underline;}
.ex-link:focus-visible{outline:2px solid #E97300;outline-offset:2px;border-radius:0.125rem;}
@media(max-width:768px){
.ex-grid{grid-template-columns:minmax(0,1fr);}
}
@media(prefers-reduced-motion:reduce){
.ex-link{transition:none;}
}
`;

export const STYLES = `<style>${EX_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

const miniCard = (x) => `
<rect x="${x}" y="14" width="12.5" height="9" rx="2" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.6"/>
<rect x="${x + 1.5}" y="16" width="3.4" height="3.4" rx="1" fill="#FCEAD9"/>
<rect x="${x + 6}" y="16.2" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.75"/>
<rect x="${x + 6}" y="18.6" width="4" height="0.9" rx="0.45" fill="#E97300" fill-opacity="0.8"/>`;

export const ICONS = {
    section: svg(`
<rect x="3" y="4" width="15" height="2.4" rx="1.2" fill="#003B71" fill-opacity="0.75"/>
<rect x="3" y="8.5" width="26" height="1.2" rx="0.6" fill="#E97300"/>
${miniCard(3)}${miniCard(16.5)}`),
    card: svg(`
<rect x="3" y="9" width="26" height="14" rx="3" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
<rect x="6" y="12" width="6" height="6" rx="1.5" fill="#FCEAD9"/>
<rect x="14.5" y="13" width="10" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.75"/>
<rect x="14.5" y="16.5" width="8" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>`),
    text: svg(`
<rect x="6" y="13" width="20" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
<rect x="6" y="17" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.4"/>`),
    link: svg(`
<rect x="6" y="14.2" width="18" height="1.8" rx="0.9" fill="#E97300"/>
<rect x="6" y="17.6" width="18" height="0.8" rx="0.4" fill="#E97300" fill-opacity="0.6"/>`),
};

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const glyph = (icon) => {
    const name = escapeHtml(icon || DEFAULT_ICON);
    return `<i class="ex-card-glyph ${name}" data-gjs-type="${ICON_TYPE}" data-ex-icon="${name}" ${FIXED}></i>`;
};

export function buildText(text = "Escribe aquí el texto.") {
    return `<p class="ex-text" data-gjs-type="${TEXT_TYPE}" ${IN_BODY}>${escapeHtml(text)}</p>`;
}

export function buildLink({ text = "Enlace", href = "#", newTab = false } = {}) {
    const target = newTab ? ` target="_blank" rel="noopener noreferrer"` : "";
    return `<a class="ex-link" href="${escapeHtml(href)}"${target} data-gjs-type="${LINK_TYPE}" ${IN_BODY}>${escapeHtml(text)}</a>`;
}

const buildItem = (item) => (item.kind === "link" ? buildLink(item) : buildText(item.text));

export function buildCard(
    card = { icon: "ri-information-line", title: "Nuevo medio", items: [{ kind: "text", text: "Escribe aquí el texto." }] },
) {
    return `<div class="ex-card" data-gjs-type="${CARD_TYPE}"><div class="ex-card-icon" ${SHELL}>${glyph(card.icon)}</div><div class="ex-body" ${BODY}><h3 class="ex-card-title" data-gjs-type="text" ${IN_BODY}>${escapeHtml(card.title)}</h3>${card.items.map(buildItem).join("")}</div></div>`;
}

export function buildSection(data = DEFAULT_DATA) {
    return `<section class="ex-section" data-gjs-type="${SECTION_TYPE}"><div class="ex-container" ${SHELL}><div class="ex-head" ${HEAD}><h2 class="ex-title" data-gjs-type="text" ${IN_HEAD}>${escapeHtml(data.title)}</h2><p class="ex-desc" data-gjs-type="text" ${IN_HEAD}>${escapeHtml(data.description)}</p><div class="ex-sep" ${IN_HEAD}></div></div><div class="ex-grid" ${GRID}>${data.cards.map((card) => buildCard(card)).join("")}</div></div></section>`;
}