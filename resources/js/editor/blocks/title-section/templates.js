export const SECTION_TYPE = "th-section";

export const DEFAULT_DATA = {
    title: "Política de privacidad y uso de datos del cliente",
    description:
        "El Banco recopila información de los usuarios que se contactan con la institución por medio de los servicios de correo electrónico, formulario en sitio web y servicios de mensajería instantánea para obtener información relacionada a los productos y servicios ofrecidos por la institución.",
};

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const SHELL = `${FIXED} data-gjs-droppable="true" data-gjs-selectable="false" data-gjs-hoverable="false"`;
const MOVABLE = 'data-gjs-draggable=".th-container"';
const TEXT = `data-gjs-type="text" ${MOVABLE}`;

const TH_CSS = `
.th-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.th-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1rem,2vw,1.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.th-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.125rem,2vw,1.25rem);line-height:1.3;}
.th-desc{margin:0.75rem 0 0;color:#003B71;font-weight:400;font-size:clamp(0.875rem,1.3vw,0.9375rem);line-height:1.6;}
.th-line{height:1rem;margin-top:0.5rem;background-image:linear-gradient(#E97300,#E97300);background-repeat:no-repeat;background-position:center;background-size:100% 2px;}
`;

export const STYLES = `<style>${TH_CSS}</style>`;

export const ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="8" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.75"/>
    <rect x="3" y="13" width="26" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.4"/>
    <rect x="3" y="16.5" width="22" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.4"/>
    <rect x="3" y="21" width="26" height="1.5" rx="0.75" fill="#E97300"/>
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
    return `<section class="th-section" data-gjs-type="${SECTION_TYPE}"><div class="th-container" ${SHELL}><h2 class="th-title" ${TEXT}>${escapeHtml(data.title)}</h2><p class="th-desc" ${TEXT}>${escapeHtml(data.description)}</p><div class="th-line" ${MOVABLE}></div></div></section>`;
}