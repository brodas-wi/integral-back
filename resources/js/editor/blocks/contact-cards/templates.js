export const SECTION_TYPE = "cc-section";
export const CARD_TYPE = "cc-card";
export const ICON_TYPE = "cc-icon";

export const DEFAULT_CARD = {
    title: "Título de la tarjeta",
    desc: "Descripción breve.",
};

export const DEFAULT_SECTION = {
    title: "Comunícate con nosotros",
    subtitle: "Comunícate y exprésate en cualquiera de nuestros Medios de Atención, Solución de Quejas y Reclamos.",
    cards: [
        { title: "Asesor de crédito", desc: "Atención personalizada en tu negocio" },
        { title: "Atención al cliente", desc: "En toda nuestra Red de Agencias" },
        { title: "Call Center y WhatsApp", desc: "2250-6090" },
        { title: "Buzón de sugerencias", desc: "Envíanos tu sugerencia en línea" },
        { title: "Correo electrónico", desc: "servicio.cliente@bancointegral.com" },
        { title: "Sitio web", desc: "www.bancointegral.com" },
    ],
};

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" data-gjs-selectable="false" data-gjs-hoverable="false"`;
const LOCKED = `${FIXED} data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-editable="false"`;
const ZONE = `${FIXED} data-gjs-droppable="true"`;
const TEXT = `${FIXED} data-gjs-type="text"`;

const PLACEHOLDER_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.6"/><path d="M4 18l5-5 4 4 3-3 4 4"/></svg>';

export const PLACEHOLDER = `data:image/svg+xml,${encodeURIComponent(PLACEHOLDER_SVG)}`;

const CC_CSS = `
.cc-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.cc-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.cc-head{margin-bottom:1.5rem;}
.cc-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.25rem,2.4vw,1.625rem);line-height:1.25;}
.cc-subtitle{margin:0.5rem 0 0;color:#003B71;font-weight:400;font-size:clamp(0.875rem,1.3vw,1rem);line-height:1.6;}
.cc-line{height:2px;margin-top:1rem;background-color:#E97300;}
.cc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1rem,2vw,1.5rem);}
.cc-card{display:flex;flex-direction:column;align-items:center;gap:0.75rem;box-sizing:border-box;padding-top:2rem;padding-right:1.25rem;padding-bottom:2rem;padding-left:1.25rem;border-radius:1.25rem;background-color:#fff;box-shadow:0 6px 24px rgba(0,59,113,0.1);text-align:center;}
.cc-card-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:4.5rem;height:4.5rem;margin-bottom:0.5rem;border-radius:9999px;background-color:#E97300;}
.cc-card-img{display:block;width:2.25rem;height:2.25rem;object-fit:contain;}
.cc-card-title{margin:0;color:#003B71;font-weight:600;font-size:clamp(1rem,1.4vw,1.125rem);line-height:1.3;}
.cc-card-desc{margin:0;color:#E97300;font-weight:400;font-size:0.8125rem;line-height:1.5;overflow-wrap:anywhere;}
@media(max-width:992px){
.cc-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
}
@media(max-width:640px){
.cc-grid{grid-template-columns:minmax(0,1fr);}
}
`;

export const STYLES = `<style>${CC_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

const miniCard = (x, y) => `
<rect x="${x}" y="${y}" width="8.5" height="9" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
<circle cx="${x + 4.25}" cy="${y + 3.2}" r="1.8" fill="#E97300"/>
<rect x="${x + 1.5}" y="${y + 6}" width="5.5" height="0.9" rx="0.45" fill="#003B71" fill-opacity="0.6"/>`;

export const ICONS = {
    section: svg(`
<rect x="3" y="3" width="16" height="2.4" rx="1.2" fill="#003B71" fill-opacity="0.75"/>
<rect x="3" y="7" width="26" height="1.2" rx="0.6" fill="#E97300"/>
${miniCard(3, 11)}${miniCard(11.75, 11)}${miniCard(20.5, 11)}
${miniCard(3, 21)}${miniCard(11.75, 21)}${miniCard(20.5, 21)}`),
    card: svg(`
<rect x="7" y="4" width="18" height="24" rx="3" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.7"/>
<circle cx="16" cy="12" r="4.5" fill="#E97300"/>
<rect x="10" y="19.5" width="12" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.65"/>
<rect x="11.5" y="23" width="9" height="1.1" rx="0.55" fill="#E97300" fill-opacity="0.7"/>`),
};

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function buildCard(card = DEFAULT_CARD) {
    return `<div class="cc-card" data-gjs-type="${CARD_TYPE}"><div class="cc-card-icon" ${SHELL}><img class="cc-card-img" src="${PLACEHOLDER}" alt="" data-gjs-type="${ICON_TYPE}" ${FIXED}></div><h3 class="cc-card-title" ${TEXT}>${escapeHtml(card.title)}</h3><p class="cc-card-desc" ${TEXT}>${escapeHtml(card.desc)}</p></div>`;
}

export function buildSection(data = DEFAULT_SECTION) {
    return `<section class="cc-section" data-gjs-type="${SECTION_TYPE}"><div class="cc-container" ${SHELL}><div class="cc-head" ${SHELL}><h2 class="cc-title" ${TEXT}>${escapeHtml(data.title)}</h2><p class="cc-subtitle" ${TEXT}>${escapeHtml(data.subtitle)}</p><div class="cc-line" ${LOCKED}></div></div><div class="cc-grid" ${ZONE}>${data.cards.map((card) => buildCard(card)).join("")}</div></div></section>`;
}