export const SECTION_TYPE = "ip-section";
export const BADGE_TYPE = "ip-badge";
export const STEP_TYPE = "ip-step";

const BADGES = [
    "Nombre completo",
    "Correo electrónico",
    "Teléfono",
    "Número de documento de identidad",
];

const STEPS = [
    "La atención de consultas y solicitudes de información realizadas por los usuarios a través de los medios oficiales del Banco.",
    "Identificar los mejores productos y servicios financieros para satisfacer las necesidades de los clientes y usuarios.",
    "Para dar cumplimiento a las diferentes leyes y normativas a las que El Banco es sujeto obligado y supervisado.",
];

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const HIDDEN = 'data-gjs-selectable="false" data-gjs-hoverable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" ${HIDDEN}`;
const PANEL = `${FIXED} data-gjs-droppable="true" ${HIDDEN}`;
const BADGES_ZONE = `${FIXED} data-gjs-droppable=".ip-badge" ${HIDDEN}`;
const STEPS_ZONE = `${FIXED} data-gjs-droppable=".ip-step" ${HIDDEN}`;
const TEXT = 'data-gjs-type="text" data-gjs-draggable=".ip-panel"';

const IP_CSS = `
.ip-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.ip-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1rem,2vw,1.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.ip-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(1rem,2vw,1.5rem);align-items:stretch;}
.ip-panel{display:flex;flex-direction:column;gap:0.875rem;box-sizing:border-box;padding-top:clamp(1.25rem,2.5vw,1.75rem);padding-right:clamp(1.25rem,2.5vw,1.75rem);padding-bottom:clamp(1.25rem,2.5vw,1.75rem);padding-left:clamp(1.25rem,2.5vw,1.75rem);border-radius:1.25rem;background-color:#F4F6F9;}
.ip-title{margin:0;color:#003B71;font-weight:600;font-size:clamp(1rem,1.5vw,1.0625rem);line-height:1.3;}
.ip-desc{margin:0;color:#003B71;font-weight:400;font-size:0.8125rem;line-height:1.6;}
.ip-badges{display:flex;flex-wrap:wrap;gap:0.625rem;min-height:2rem;}
.ip-badge{display:inline-flex;align-items:center;box-sizing:border-box;padding-top:0.5rem;padding-right:0.875rem;padding-bottom:0.5rem;padding-left:0.875rem;border:1px solid #E2E8F0;border-radius:9999px;background-color:#fff;color:#003B71;font-size:0.75rem;font-weight:500;line-height:1.3;}
.ip-steps{margin:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:0.875rem;min-height:1.5rem;counter-reset:ip-step;}
.ip-step{position:relative;margin:0;padding-left:2.25rem;color:#003B71;font-size:0.8125rem;line-height:1.6;counter-increment:ip-step;}
.ip-step::before{content:counter(ip-step);position:absolute;left:0;top:-0.1rem;display:flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:9999px;background-color:#E97300;color:#fff;font-size:0.6875rem;font-weight:700;line-height:1;}
@media(max-width:768px){
.ip-grid{grid-template-columns:minmax(0,1fr);}
}
`;

export const STYLES = `<style>${IP_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

export const ICONS = {
    section: svg(`
<rect x="2" y="5" width="13" height="22" rx="2.5" fill="#F4F6F9" stroke="#cbd5e1" stroke-width="0.6"/>
<rect x="4.5" y="8" width="7" height="1.8" rx="0.9" fill="#003B71" fill-opacity="0.75"/>
<rect x="4.5" y="14" width="5" height="3" rx="1.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.5"/>
<rect x="10.5" y="14" width="3" height="3" rx="1.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.5"/>
<rect x="4.5" y="18.5" width="7" height="3" rx="1.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.5"/>
<rect x="17" y="5" width="13" height="22" rx="2.5" fill="#F4F6F9" stroke="#cbd5e1" stroke-width="0.6"/>
<rect x="19.5" y="8" width="7" height="1.8" rx="0.9" fill="#003B71" fill-opacity="0.75"/>
<circle cx="20.2" cy="14.5" r="1.3" fill="#E97300"/>
<rect x="22.8" y="13.9" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
<circle cx="20.2" cy="19" r="1.3" fill="#E97300"/>
<rect x="22.8" y="18.4" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
<circle cx="20.2" cy="23.5" r="1.3" fill="#E97300"/>
<rect x="22.8" y="22.9" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>`),
    badge: svg(`
<rect x="5" y="11.5" width="22" height="9" rx="4.5" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
<rect x="9.5" y="15.4" width="13" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.6"/>`),
    step: svg(`
<circle cx="8" cy="16" r="3.6" fill="#E97300"/>
<rect x="14" y="13.2" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.55"/>
<rect x="14" y="17.2" width="10" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.35"/>`),
};

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function buildBadge(text = "Nuevo dato") {
    return `<span class="ip-badge" data-gjs-type="${BADGE_TYPE}">${escapeHtml(text)}</span>`;
}

export function buildStep(text = "Escribe aquí la finalidad.") {
    return `<li class="ip-step" data-gjs-type="${STEP_TYPE}">${escapeHtml(text)}</li>`;
}

export function buildSection() {
    const badges = BADGES.map((text) => buildBadge(text)).join("");
    const steps = STEPS.map((text) => buildStep(text)).join("");

    return `<section class="ip-section" data-gjs-type="${SECTION_TYPE}"><div class="ip-container" ${SHELL}><div class="ip-grid" ${SHELL}><div class="ip-panel" ${PANEL}><h3 class="ip-title" ${TEXT}>Datos que podemos solicitar</h3><p class="ip-desc" ${TEXT}>Para fines de contactabilidad, el Banco podrá solicitar los siguientes datos personales:</p><div class="ip-badges" ${BADGES_ZONE}>${badges}</div></div><div class="ip-panel" ${PANEL}><h3 class="ip-title" ${TEXT}>¿Para qué usamos tus datos?</h3><p class="ip-desc" ${TEXT}>Los datos personales recabados únicamente se utilizan en estricto cumplimiento de las siguientes finalidades:</p><ol class="ip-steps" role="list" ${STEPS_ZONE}>${steps}</ol></div></div></div></section>`;
}