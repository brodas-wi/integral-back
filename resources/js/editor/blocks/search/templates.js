export const VERSION = 1;
export const SECTION_TYPE = "srch-section";

export const DEFAULTS = {
    title: "¿En qué podemos ayudarte?",
    placeholder: "Buscar",
    limit: "6",
    endpoint: "/api/search",
};

const FIXED =
    'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false" data-gjs-droppable="false"';
const HIDDEN = 'data-gjs-selectable="false" data-gjs-hoverable="false"';

export const CSS = `
.srch-section{width:100%;box-sizing:border-box;background-color:#fff;font-family:'Poppins',sans-serif;}
.srch-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;gap:clamp(1.25rem,2.5vw,2rem);padding-top:clamp(2rem,5vw,4rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(2rem,5vw,4rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.srch-title{margin:0;text-align:center;color:#003B71;font-weight:700;font-size:clamp(1.5rem,3vw,2.25rem);line-height:1.2;}
.srch-form{display:flex;align-items:center;width:100%;max-width:36rem;box-sizing:border-box;background-color:#fff;border-radius:9999px;box-shadow:0 4px 20px 0 rgba(0,59,113,0.14);transition:box-shadow 0.2s;}
.srch-form:focus-within{box-shadow:0 4px 20px 0 rgba(0,59,113,0.14),0 0 0 2px #E97300;}
.srch-input{flex:1;min-width:0;height:3.5rem;box-sizing:border-box;border:none;outline:none;background-color:transparent;border-radius:9999px;color:#14243D;font-family:inherit;font-size:1rem;padding-top:0;padding-right:0.5rem;padding-bottom:0;padding-left:1.5rem;}
.srch-input::placeholder{color:#6B7280;}
.srch-submit{flex-shrink:0;display:flex;align-items:center;justify-content:center;width:2.75rem;height:2.75rem;margin:0 0.375rem 0 0;border:none;border-radius:9999px;background-color:#E97300;color:#fff;cursor:pointer;transition:background-color 0.2s;}
.srch-submit:hover{background-color:#C96200;}
.srch-submit svg{display:block;width:1.25rem;height:1.25rem;}
.srch-panel{width:100%;box-sizing:border-box;background-color:#F4F6F9;}
.srch-inner{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;display:flex;flex-direction:column;gap:1rem;padding-top:clamp(1.5rem,3vw,2.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,3vw,2.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.srch-heading{margin:0;color:#14243D;font-weight:600;font-size:clamp(1.125rem,2vw,1.5rem);line-height:1.3;overflow-wrap:anywhere;}
.srch-status{margin:0;color:#14243D;font-size:0.9375rem;line-height:1.6;}
.srch-list{list-style:none;margin:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.75rem 2rem;}
.srch-item{min-width:0;margin:0;}
.srch-link{display:flex;flex-direction:column;gap:0.25rem;height:100%;box-sizing:border-box;text-decoration:none;overflow-wrap:anywhere;background-color:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.06);padding-top:0.875rem;padding-right:1.125rem;padding-bottom:0.875rem;padding-left:1.125rem;transition:box-shadow 0.2s,transform 0.2s;}
.srch-link:hover{box-shadow:0 6px 20px 0 rgba(0,59,113,0.14);transform:translateY(-2px);}
.srch-link:focus-visible{outline:2px solid #E97300;outline-offset:2px;}
.srch-link-title{color:#003B71;font-weight:600;font-size:0.9375rem;line-height:1.4;}
.srch-link:hover .srch-link-title{color:#E97300;}
.srch-link-excerpt{color:#6B7280;font-size:0.8125rem;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
.srch-more{align-self:flex-start;margin-top:0.5rem;box-sizing:border-box;cursor:pointer;font-family:inherit;font-size:0.875rem;font-weight:600;line-height:1;color:#E97300;background-color:transparent;border:2px solid #E97300;border-radius:9999px;padding-top:0.625rem;padding-right:1.5rem;padding-bottom:0.625rem;padding-left:1.5rem;transition:background-color 0.2s,color 0.2s;}
.srch-more:hover{background-color:#E97300;color:#fff;}
@media(max-width:640px){.srch-list{grid-template-columns:1fr;}.srch-input{height:3.25rem;font-size:0.9375rem;}}
`;

export const STYLES = `<style>${CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

export const ICONS = {
    section: svg(`
<rect x="8" y="4" width="16" height="2.2" rx="1.1" fill="#003B71" fill-opacity="0.75"/>
<rect x="5" y="9" width="22" height="6" rx="3" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
<rect x="8" y="11.2" width="8" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.35"/>
<circle cx="23" cy="12" r="2.2" fill="#E97300"/>
<rect x="3" y="18" width="26" height="11" rx="1.5" fill="#F4F6F9"/>
<rect x="6" y="20.4" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
<rect x="17" y="20.4" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
<rect x="6" y="24.4" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.4"/>
<rect x="17" y="24.4" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.4"/>`),
};

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function buildInner({
    title = DEFAULTS.title,
    titleHtml,
    placeholder = DEFAULTS.placeholder,
} = {}) {
    const heading = titleHtml ?? escapeHtml(title);

    return `<div class="srch-container" ${FIXED} ${HIDDEN}><h2 class="srch-title" data-gjs-type="text" ${FIXED}>${heading}</h2><form class="srch-form" role="search" action="#" ${FIXED} ${HIDDEN}><input class="srch-input" type="text" name="q" maxlength="100" autocomplete="off" enterkeyhint="search" aria-label="Buscar en el sitio" placeholder="${escapeHtml(placeholder)}" ${FIXED} ${HIDDEN}><button class="srch-submit" type="submit" aria-label="Buscar" ${FIXED} ${HIDDEN}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button></form></div><div class="srch-panel" aria-live="polite" hidden ${FIXED} ${HIDDEN}><div class="srch-inner" ${FIXED} ${HIDDEN}><h3 class="srch-heading" ${FIXED} ${HIDDEN}></h3><p class="srch-status" hidden ${FIXED} ${HIDDEN}></p><ul class="srch-list" role="list" ${FIXED} ${HIDDEN}></ul></div></div>`;
}

export function buildSection(config = {}) {
    const {
        placeholder = DEFAULTS.placeholder,
        limit = DEFAULTS.limit,
        endpoint = DEFAULTS.endpoint,
    } = config;

    return `<section class="srch-section" data-srch-version="${VERSION}" data-srch-endpoint="${escapeHtml(endpoint)}" data-srch-limit="${escapeHtml(limit)}" data-srch-placeholder="${escapeHtml(placeholder)}">${buildInner(config)}</section>`;
}