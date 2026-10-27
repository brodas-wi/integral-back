export const SECTION_TYPE = "hl-section";

export const DEFAULT_DATA = {
    stat: "15 años",
    caption: "Plazo general de conservación",
    text: "Los datos personales se conservarán de acuerdo con lo establecido en leyes y normativa interna para dar respuesta a las consultas y solicitudes, hasta la finalización de la relación contractual y posteriormente, durante los plazos legalmente exigidos acorde a cada caso. Como norma general, el plazo de conservación de datos será de 15 años desde la finalización de la relación contractual.",
};

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const HIDDEN = 'data-gjs-selectable="false" data-gjs-hoverable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" ${HIDDEN}`;
const ZONE = `${FIXED} data-gjs-droppable="true" ${HIDDEN}`;
const STAT_TEXT = 'data-gjs-type="text" data-gjs-draggable=".hl-stat-col"';
const BODY_TEXT = 'data-gjs-type="text" data-gjs-draggable=".hl-text-col"';

const HL_CSS = `
.hl-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.hl-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.hl-box{display:grid;grid-template-columns:minmax(12rem,22rem) minmax(0,1fr);column-gap:clamp(1.5rem,4vw,3rem);row-gap:1.25rem;align-items:center;box-sizing:border-box;padding-top:clamp(1.5rem,3vw,2.5rem);padding-right:clamp(1.5rem,3vw,2.5rem);padding-bottom:clamp(1.5rem,3vw,2.5rem);padding-left:clamp(1.5rem,3vw,2.5rem);border-radius:1.5rem;background-color:#003B71;}
.hl-stat-col{display:flex;flex-direction:column;justify-content:center;min-width:0;}
.hl-text-col{display:flex;flex-direction:column;justify-content:center;min-width:0;}
.hl-stat{margin:0;color:#E97300;font-weight:800;font-size:clamp(2rem,4.5vw,2.75rem);line-height:1.1;}
.hl-caption{margin:0.375rem 0 0;color:#fff;font-weight:500;font-size:0.75rem;line-height:1.4;}
.hl-text{margin:0;color:#fff;font-weight:400;font-size:clamp(0.8125rem,1.2vw,0.875rem);line-height:1.65;text-align:justify;}
@media(max-width:768px){
.hl-box{grid-template-columns:minmax(0,1fr);}
}
`;

export const STYLES = `<style>${HL_CSS}</style>`;

export const ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="7" width="28" height="18" rx="4" fill="#003B71"/>
    <rect x="5" y="12" width="8" height="3.2" rx="1.2" fill="#E97300"/>
    <rect x="5" y="17" width="9" height="1.2" rx="0.6" fill="#ffffff" fill-opacity="0.8"/>
    <rect x="17" y="11" width="10" height="1.2" rx="0.6" fill="#ffffff" fill-opacity="0.75"/>
    <rect x="17" y="14.2" width="10" height="1.2" rx="0.6" fill="#ffffff" fill-opacity="0.75"/>
    <rect x="17" y="17.4" width="7" height="1.2" rx="0.6" fill="#ffffff" fill-opacity="0.75"/>
</svg>`;

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function buildSection(data = DEFAULT_DATA) {
    return `<section class="hl-section" data-gjs-type="${SECTION_TYPE}"><div class="hl-container" ${SHELL}><div class="hl-box" ${SHELL}><div class="hl-stat-col" ${ZONE}><p class="hl-stat" ${STAT_TEXT}>${escapeHtml(data.stat)}</p><p class="hl-caption" ${STAT_TEXT}>${escapeHtml(data.caption)}</p></div><div class="hl-text-col" ${ZONE}><p class="hl-text" ${BODY_TEXT}>${escapeHtml(data.text)}</p></div></div></div></section>`;
}