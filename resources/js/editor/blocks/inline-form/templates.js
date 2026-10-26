export const SECTION_TYPE = "inf-section";
export const FORM_TYPE = "inf-form";

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" data-gjs-selectable="false" data-gjs-hoverable="false"`;
const LOCKED = `${FIXED} data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-editable="false"`;
const TEXT = `${FIXED} data-gjs-type="text"`;

const INF_CSS = `
.inf-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.inf-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;display:grid;grid-template-columns:minmax(16rem,22rem) minmax(0,1fr);column-gap:clamp(1.5rem,4vw,3rem);row-gap:2rem;align-items:start;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.inf-container-solo{display:block;}
.inf-container-solo .inf-main{max-width:56rem;margin:0 auto;}
.inf-aside{display:flex;flex-direction:column;gap:1rem;}
.inf-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.5rem,3vw,2rem);line-height:1.2;}
.inf-desc{margin:0;color:#003B71;font-weight:400;font-size:0.9375rem;line-height:1.6;}
.inf-line{width:5rem;height:2px;background-color:#E97300;}
.inf-info{display:flex;flex-direction:column;gap:0.75rem;box-sizing:border-box;padding-top:1.25rem;padding-right:1.25rem;padding-bottom:1.25rem;padding-left:1.25rem;border-radius:1rem;background-color:#F1F5F9;}
.inf-info-title{margin:0;color:#003B71;font-weight:700;font-size:0.9375rem;line-height:1.3;}
.inf-info-list{margin:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:0.625rem;}
.inf-info-item{display:flex;align-items:center;gap:0.625rem;}
.inf-info-icon{flex-shrink:0;color:#E97300;font-size:1.125rem;line-height:1;}
.inf-info-text{color:#003B71;font-size:0.8125rem;line-height:1.4;overflow-wrap:anywhere;}
.inf-main{min-width:0;}
.inf-card{box-sizing:border-box;padding-top:clamp(1.25rem,3vw,2rem);padding-right:clamp(1.25rem,3vw,2rem);padding-bottom:clamp(1.25rem,3vw,2rem);padding-left:clamp(1.25rem,3vw,2rem);border-radius:1.5rem;background-color:#fff;box-shadow:0 10px 40px rgba(0,59,113,0.1);}
.inf-form{position:relative;min-width:0;min-height:8rem;}
.inf-form .fo-form{margin:0;}
.inf-form .fo-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:1.25rem;row-gap:1.125rem;}
.inf-form .fo-field{display:flex;flex-direction:column;gap:0.375rem;width:auto;max-width:none;min-width:0;margin:0;}
.inf-form .fo-w-full{grid-column:1 / -1;}
.inf-form .fo-w-half{grid-column:auto;}
.inf-form .fo-label{display:flex;gap:0.25rem;margin:0;color:#003B71;font-size:0.8125rem;font-weight:500;line-height:1.3;}
.inf-form .fo-req{order:-1;color:#E97300;}
.inf-form .fo-input,.inf-form .fo-textarea,.inf-form .fo-select select{width:100%;box-sizing:border-box;padding-top:0.625rem;padding-right:0.875rem;padding-bottom:0.625rem;padding-left:0.875rem;border:1px solid #D5DBE3;border-radius:0.5rem;background-color:#fff;color:#003B71;font-family:inherit;font-size:0.8125rem;line-height:1.4;outline:none;transition:border-color 0.2s ease,box-shadow 0.2s ease;}
.inf-form .fo-input::placeholder,.inf-form .fo-textarea::placeholder{color:#94A3B8;}
.inf-form .fo-input:focus,.inf-form .fo-textarea:focus,.inf-form .fo-select select:focus{border-color:#003B71;box-shadow:0 0 0 3px rgba(0,59,113,0.12);}
.inf-form .fo-invalid .fo-input,.inf-form .fo-invalid .fo-textarea,.inf-form .fo-invalid .fo-select select{border-color:#DC2626;}
.inf-form .fo-textarea{min-height:7rem;resize:vertical;}
.inf-form .fo-select{position:relative;display:block;background-image:none;}
.inf-form .fo-select::before,.inf-form .fo-select::after{content:none;}
.inf-form .fo-select select{padding-right:2.5rem;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23E97300' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 0.875rem center;background-size:1rem;cursor:pointer;}
.inf-form .fo-select select:disabled{opacity:0.6;cursor:not-allowed;}
.inf-form .fo-error{margin:0;color:#DC2626;font-size:0.75rem;line-height:1.3;}
.inf-form .fo-error:empty{display:none;}
.inf-form .fo-help{margin:0;color:#64748B;font-size:0.75rem;line-height:1.4;}
.inf-form .fo-note{margin:0;color:#E97300;font-size:0.75rem;line-height:1.4;}
.inf-form .fo-consent{display:flex;align-items:flex-start;gap:0.5rem;color:#003B71;font-size:0.75rem;line-height:1.4;cursor:pointer;}
.inf-form .fo-consent input,.inf-form .fo-check input{flex-shrink:0;width:1rem;height:1rem;margin:0;accent-color:#E97300;cursor:pointer;}
.inf-form .fo-options{display:flex;flex-wrap:wrap;column-gap:1.25rem;row-gap:0.625rem;}
.inf-form .fo-check{display:flex;align-items:center;gap:0.5rem;color:#003B71;font-size:0.8125rem;cursor:pointer;}
.inf-form .fo-location{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:1.25rem;row-gap:0.75rem;}
.inf-form .fo-location > div{display:flex;flex-direction:column;gap:0.375rem;}
.inf-form .fo-alert{margin:1rem 0 0;box-sizing:border-box;padding-top:0.625rem;padding-right:0.875rem;padding-bottom:0.625rem;padding-left:0.875rem;border-radius:0.5rem;background-color:#FEF2F2;color:#B91C1C;font-size:0.8125rem;line-height:1.4;}
.inf-form .fo-alert[hidden]{display:none;}
.inf-form .fo-actions{display:flex;justify-content:flex-end;margin-top:1.25rem;}
.inf-form .fo-submit{display:inline-flex;align-items:center;justify-content:center;padding-top:0.75rem;padding-right:2.25rem;padding-bottom:0.75rem;padding-left:2.25rem;border:none;border-radius:9999px;background-color:#E97300;color:#fff;font-family:inherit;font-size:0.8125rem;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;cursor:pointer;transition:background-color 0.2s ease;}
.inf-form .fo-submit:hover{background-color:#C96200;}
.inf-form .fo-submit:focus-visible{outline:2px solid #14243D;outline-offset:2px;}
.inf-form .fo-submit:disabled{opacity:0.6;cursor:not-allowed;}
.inf-form .fo-hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none;}
.inf-form .fo-state{display:flex;flex-direction:column;align-items:center;gap:0.75rem;padding-top:2rem;padding-bottom:2rem;color:#003B71;font-size:0.875rem;text-align:center;}
.inf-form .fo-state p{margin:0;}
.inf-form .fo-spinner{display:none;}
.inf-thanks{display:flex;flex-direction:column;align-items:center;gap:0.5rem;padding-top:2.5rem;padding-right:1rem;padding-bottom:2.5rem;padding-left:1rem;text-align:center;}
.inf-thanks-title{margin:0;color:#003B71;font-weight:700;font-size:1.25rem;line-height:1.3;}
.inf-thanks-sub{margin:0;color:#003B71;font-size:0.9375rem;line-height:1.5;}
@media(max-width:992px){
.inf-container{grid-template-columns:minmax(0,1fr);}
}
@media(max-width:640px){
.inf-form .fo-grid,.inf-form .fo-location{grid-template-columns:minmax(0,1fr);}
.inf-form .fo-submit{width:100%;}
}
@media(prefers-reduced-motion:reduce){
.inf-form .fo-input,.inf-form .fo-textarea,.inf-form .fo-select select,.inf-form .fo-submit{transition:none;}
}
`;

export const STYLES = `<style>${INF_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

const fieldIcon = (x, y, w) =>
    `<rect x="${x}" y="${y}" width="${w}" height="2.6" rx="1" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>`;

export const ICONS = {
    contact: svg(`
<rect x="2.5" y="4" width="7" height="2.2" rx="1.1" fill="#003B71" fill-opacity="0.75"/>
<rect x="2.5" y="8" width="7.5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
<rect x="2.5" y="10.5" width="5.5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
<rect x="2.5" y="14" width="7.5" height="9" rx="1.5" fill="#e2e8f0"/>
<rect x="12" y="3" width="17.5" height="26" rx="2.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
${fieldIcon(14, 6, 13.5)}${fieldIcon(14, 11, 6.4)}${fieldIcon(21.1, 11, 6.4)}${fieldIcon(14, 16, 6.4)}${fieldIcon(21.1, 16, 6.4)}
<rect x="14" y="21" width="13.5" height="3" rx="1" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
<rect x="21" y="25.5" width="6.5" height="2.2" rx="1.1" fill="#E97300"/>`),
    form: svg(`
<rect x="5" y="3" width="22" height="26" rx="2.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
${fieldIcon(8, 6.5, 16)}${fieldIcon(8, 11.5, 7.6)}${fieldIcon(16.4, 11.5, 7.6)}${fieldIcon(8, 16.5, 7.6)}${fieldIcon(16.4, 16.5, 7.6)}
<rect x="8" y="21" width="16" height="3" rx="1" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.6"/>
<rect x="16" y="25.2" width="8" height="2.2" rx="1.1" fill="#E97300"/>`),
};

const infoItem = (icon, text) =>
    `<li class="inf-info-item" ${SHELL}><i class="${icon} inf-info-icon" ${LOCKED}></i><span class="inf-info-text" ${TEXT}>${text}</span></li>`;

const aside = () =>
    `<div class="inf-aside" ${SHELL}><h2 class="inf-title" ${TEXT}>Contáctanos</h2><p class="inf-desc" ${TEXT}>Favor completa el formulario con la información en los campos correspondientes y con gusto nos contactaremos contigo.</p><div class="inf-line" ${LOCKED}></div><div class="inf-info" ${SHELL}><h3 class="inf-info-title" ${TEXT}>También puedes escribirnos</h3><ul class="inf-info-list" ${SHELL}>${infoItem("ri-phone-line", "Call Center: 2250-6090")}${infoItem("ri-whatsapp-line", "WhatsApp: 2250-6090")}${infoItem("ri-mail-line", "servicio.cliente@bancointegral.com")}</ul></div></div>`;

const formSlot = () =>
    `<div class="inf-main" ${SHELL}><div class="inf-card" ${SHELL}><div class="inf-form" data-inline-form="" data-gjs-type="${FORM_TYPE}" ${FIXED} data-gjs-droppable="false"></div></div></div>`;

export function buildContactSection() {
    return `<section class="inf-section" data-gjs-type="${SECTION_TYPE}"><div class="inf-container" ${SHELL}>${aside()}${formSlot()}</div></section>`;
}

export function buildFormSection() {
    return `<section class="inf-section" data-gjs-type="${SECTION_TYPE}"><div class="inf-container inf-container-solo" ${SHELL}>${formSlot()}</div></section>`;
}