export const SECTION_TYPE = "lc-section";
export const CARD_TYPE = "lc-card";

export const DEFAULT_DATA = {
    title: "Tus derechos ARCO-POL",
    description:
        "De conformidad con la normativa vigente en materia de protección de datos personales, los usuarios del sitio web se encuentran facultados para ejercer sus derechos ARCO-POL, los cuales se definen de la siguiente manera:",
    cards: [
        {
            letter: "A",
            title: "Acceso",
            desc: "Para conocer qué datos personales son tratados por el Banco, su origen, finalidad y uso.",
        },
        {
            letter: "R",
            title: "Rectificación",
            desc: "Para solicitar la corrección de datos inexactos, incompletos o desactualizados.",
        },
        {
            letter: "C",
            title: "Cancelación",
            desc: "Para requerir la eliminación de los datos personales cuando su tratamiento no sea necesario, sea excesivo o haya concluido la finalidad que motivó su recopilación.",
        },
        {
            letter: "O",
            title: "Oposición",
            desc: "Para oponerse al tratamiento de sus datos personales en los casos permitidos por la ley.",
        },
        {
            letter: "P",
            title: "Portabilidad",
            desc: "Para recibir sus datos personales en un formato estructurado, de uso común y lectura mecánica, o solicitar su transferencia a otro responsable.",
        },
        {
            letter: "L",
            title: "Limitación del tratamiento",
            desc: "Para restringir temporalmente el uso de sus datos personales en determinadas circunstancias legales.",
        },
    ],
};

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const HIDDEN = 'data-gjs-selectable="false" data-gjs-hoverable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" ${HIDDEN}`;
const HEAD = `${FIXED} data-gjs-droppable=".lc-title,.lc-desc,.lc-sep" ${HIDDEN}`;
const GRID = `${FIXED} data-gjs-droppable=".lc-card" ${HIDDEN}`;
const CARD_HEAD = `${FIXED} data-gjs-droppable=".lc-letter,.lc-card-title" ${HIDDEN}`;
const IN_HEAD = 'data-gjs-draggable=".lc-head"';
const IN_CARD_HEAD = 'data-gjs-draggable=".lc-card-head"';
const IN_CARD = 'data-gjs-draggable=".lc-card"';

const LC_CSS = `
.lc-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.lc-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.lc-head{margin-bottom:clamp(1.25rem,2.5vw,1.75rem);}
.lc-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.25rem,2.2vw,1.5rem);line-height:1.3;}
.lc-desc{margin:0.5rem 0 0;color:#003B71;font-weight:400;font-size:clamp(0.875rem,1.3vw,0.9375rem);line-height:1.6;}
.lc-sep{height:1rem;margin-top:0.5rem;background-image:linear-gradient(#E97300,#E97300);background-repeat:no-repeat;background-position:center;background-size:100% 2px;}
.lc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1rem,2vw,1.5rem);align-items:stretch;min-height:3rem;}
.lc-card{display:flex;flex-direction:column;gap:0.875rem;box-sizing:border-box;padding-top:clamp(1.25rem,2.5vw,1.5rem);padding-right:clamp(1.25rem,2.5vw,1.5rem);padding-bottom:clamp(1.25rem,2.5vw,1.5rem);padding-left:clamp(1.25rem,2.5vw,1.5rem);border-radius:1.25rem;background-color:#fff;box-shadow:0 6px 24px rgba(0,59,113,0.1);}
.lc-card-head{display:flex;align-items:center;gap:0.75rem;min-width:0;}
.lc-letter{display:flex;align-items:center;justify-content:center;flex-shrink:0;box-sizing:border-box;width:2.25rem;height:2.25rem;border-radius:9999px;background-color:#E97300;color:#fff;font-weight:700;font-size:0.9375rem;line-height:1;text-transform:uppercase;}
.lc-card-title{margin:0;min-width:0;color:#003B71;font-weight:600;font-size:clamp(0.9375rem,1.3vw,1rem);line-height:1.3;}
.lc-card-desc{margin:0;color:#003B71;font-weight:400;font-size:0.75rem;line-height:1.65;}
@media(max-width:992px){
.lc-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
}
@media(max-width:640px){
.lc-grid{grid-template-columns:minmax(0,1fr);}
}
`;

export const STYLES = `<style>${LC_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

const miniCard = (x, y) => `
<rect x="${x}" y="${y}" width="8.5" height="8" rx="1.5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.6"/>
<circle cx="${x + 2.2}" cy="${y + 2.4}" r="1.4" fill="#E97300"/>
<rect x="${x + 4.4}" y="${y + 1.9}" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.7"/>
<rect x="${x + 1.2}" y="${y + 5}" width="6" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.4"/>`;

export const ICONS = {
    section: svg(`
<rect x="3" y="3" width="14" height="2.2" rx="1.1" fill="#003B71" fill-opacity="0.75"/>
<rect x="3" y="6.5" width="26" height="1.2" rx="0.6" fill="#E97300"/>
${miniCard(3, 10)}${miniCard(11.75, 10)}${miniCard(20.5, 10)}
${miniCard(3, 20)}${miniCard(11.75, 20)}${miniCard(20.5, 20)}`),
    card: svg(`
<rect x="4" y="6" width="24" height="20" rx="3" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
<circle cx="10.5" cy="12.5" r="3" fill="#E97300"/>
<rect x="15.5" y="11.6" width="9" height="1.8" rx="0.9" fill="#003B71" fill-opacity="0.75"/>
<rect x="8" y="18" width="16" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.4"/>
<rect x="8" y="21" width="11" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.4"/>`),
};

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function buildCard(card = { letter: "N", title: "Nuevo derecho", desc: "Escribe aquí la descripción." }) {
    return `<div class="lc-card" data-gjs-type="${CARD_TYPE}"><div class="lc-card-head" ${CARD_HEAD}><span class="lc-letter" data-gjs-type="text" ${IN_CARD_HEAD}>${escapeHtml(card.letter)}</span><h3 class="lc-card-title" data-gjs-type="text" ${IN_CARD_HEAD}>${escapeHtml(card.title)}</h3></div><p class="lc-card-desc" data-gjs-type="text" ${IN_CARD}>${escapeHtml(card.desc)}</p></div>`;
}

export function buildSection(data = DEFAULT_DATA) {
    return `<section class="lc-section" data-gjs-type="${SECTION_TYPE}"><div class="lc-container" ${SHELL}><div class="lc-head" ${HEAD}><h2 class="lc-title" data-gjs-type="text" ${IN_HEAD}>${escapeHtml(data.title)}</h2><p class="lc-desc" data-gjs-type="text" ${IN_HEAD}>${escapeHtml(data.description)}</p><div class="lc-sep" ${IN_HEAD}></div></div><div class="lc-grid" ${GRID}>${data.cards.map((card) => buildCard(card)).join("")}</div></div></section>`;
}