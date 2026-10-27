export const SECTION_TYPE = "dl-section";
export const ITEM_TYPE = "dl-item";
export const FILE_TYPE = "dl-file";

export const DEFAULT_FILE = {
    name: "Nombre_del_documento.pdf",
    size: "0.00 MB",
};

export const DEFAULT_SECTION = {
    title: "Documentos de interés",
    items: [
        {
            subtitle: "Directorio Oficinas de Gestión de Cobros",
            files: [
                {
                    name: "Directorio_Oficinas_de_Gestion_de_Cobros_Banco_Integral.pdf",
                    size: "0.12 MB",
                },
            ],
        },
        {
            subtitle: "Principios de defensa del consumidor y prácticas de transparencia",
            files: [
                {
                    name: "2.2_Principios_de_defensa_del_consumidor_y_prácticas_de_transparencia_(2).pdf",
                    size: "1.56 MB",
                },
            ],
        },
    ],
};

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false"`;
const ZONE = `${FIXED} data-gjs-droppable="true"`;
const LOCKED = `${FIXED} data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-editable="false"`;
const TEXT = `${FIXED} data-gjs-type="text"`;
const TEXT_REMOVABLE = 'data-gjs-type="text" data-gjs-draggable="false" data-gjs-copyable="false"';

const DL_CSS = `
.dl-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.dl-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.dl-head{margin-bottom:1.5rem;}
.dl-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.5rem,3vw,2rem);line-height:1.2;}
.dl-line{height:2px;margin-top:1rem;background-color:#E97300;}
.dl-groups{display:flex;flex-direction:column;gap:clamp(1.25rem,2.5vw,1.75rem);}
.dl-item{display:flex;flex-direction:column;gap:0.875rem;}
.dl-subtitle{margin:0;color:#003B71;font-weight:600;font-size:clamp(0.9375rem,1.4vw,1.0625rem);line-height:1.4;}
.dl-files{display:flex;flex-direction:column;gap:1rem;}
.dl-file{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;box-sizing:border-box;padding-top:1rem;padding-right:1.5rem;padding-bottom:1rem;padding-left:1.5rem;border-radius:0.75rem;background-color:#fff;box-shadow:0 4px 16px rgba(0,59,113,0.1);text-decoration:none;transition:box-shadow 0.2s ease;}
.dl-file:hover,.dl-file:focus-visible{box-shadow:0 8px 26px rgba(0,59,113,0.18);}
.dl-file:focus-visible{outline:2px solid #E97300;outline-offset:2px;}
.dl-file-info{display:flex;align-items:baseline;gap:0.5rem;flex:1;min-width:0;}
.dl-file-icon{align-self:center;flex-shrink:0;margin-right:0.75rem;font-size:1.5rem;line-height:1;color:#E97300;}
.dl-file-name{min-width:0;overflow:hidden;font-size:0.9375rem;font-weight:400;color:#E97300;white-space:nowrap;text-overflow:ellipsis;}
.dl-file-size{flex-shrink:0;font-size:0.9375rem;font-weight:400;color:#E97300;white-space:nowrap;}
.dl-file-badge{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:2.5rem;height:2.5rem;border-radius:9999px;background-color:#E97300;color:#fff;transition:transform 0.2s ease,background-color 0.2s ease;}
.dl-file-badge i{font-size:1.375rem;line-height:1;}
.dl-file:hover .dl-file-badge{background-color:#C96200;transform:translateY(2px);}
@media(max-width:640px){
.dl-file{padding-top:0.875rem;padding-right:1rem;padding-bottom:0.875rem;padding-left:1rem;}
.dl-file-info{align-items:center;}
.dl-file-icon{margin-right:0.25rem;}
.dl-file-name{white-space:normal;overflow-wrap:anywhere;}
}
@media(prefers-reduced-motion:reduce){
.dl-file,.dl-file-badge{transition:none;}
.dl-file:hover .dl-file-badge{transform:none;}
}
`;

export const STYLES = `<style>${DL_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

export const ICONS = {
    section: svg(`
<rect x="2" y="3" width="18" height="3" rx="1" fill="#003B71" fill-opacity="0.7"/>
<rect x="2" y="8" width="28" height="1.5" rx="0.75" fill="#E97300"/>
<rect x="2" y="12" width="14" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.5"/>
<rect x="2" y="15" width="28" height="5" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
<rect x="4.5" y="16.2" width="2.4" height="2.6" rx="0.4" fill="none" stroke="#E97300" stroke-width="0.7"/>
<rect x="9" y="17.2" width="10" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
<circle cx="26.8" cy="17.5" r="1.7" fill="#E97300"/>
<rect x="2" y="22" width="14" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.5"/>
<rect x="2" y="25" width="28" height="5" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
<rect x="4.5" y="26.2" width="2.4" height="2.6" rx="0.4" fill="none" stroke="#E97300" stroke-width="0.7"/>
<rect x="9" y="27.2" width="10" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
<circle cx="26.8" cy="27.5" r="1.7" fill="#E97300"/>`),
    item: svg(`
<rect x="2" y="9" width="16" height="1.8" rx="0.9" fill="#003B71" fill-opacity="0.6"/>
<rect x="2" y="13" width="28" height="7" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
<rect x="4.5" y="14.8" width="2.6" height="3.4" rx="0.4" fill="none" stroke="#E97300" stroke-width="0.7"/>
<rect x="9" y="16" width="11" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
<circle cx="26.5" cy="16.5" r="2" fill="#E97300"/>`),
    file: svg(`
<rect x="2" y="12" width="28" height="8" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.7"/>
<rect x="5" y="14.5" width="3.5" height="4.5" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.8"/>
<rect x="11" y="15" width="12" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.75"/>
<circle cx="26.5" cy="16" r="2.2" fill="#E97300"/>`),
};

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function buildFile(file = DEFAULT_FILE) {
    return `<a class="dl-file" href="#" target="_blank" rel="noopener noreferrer" data-gjs-type="${FILE_TYPE}"><span class="dl-file-info" ${LOCKED}><i class="ri-file-text-line dl-file-icon" ${LOCKED}></i><span class="dl-file-name" ${TEXT}>${escapeHtml(file.name)}</span><span class="dl-file-size" ${TEXT}>${escapeHtml(file.size)}</span></span><span class="dl-file-badge" ${LOCKED}><i class="ri-download-line" ${LOCKED}></i></span></a>`;
}

export function buildItem(item = { subtitle: "Nombre del subtítulo", files: [DEFAULT_FILE] }) {
    return `<div class="dl-item" data-gjs-type="${ITEM_TYPE}"><h3 class="dl-subtitle" ${TEXT_REMOVABLE}>${escapeHtml(item.subtitle)}</h3><div class="dl-files" ${ZONE}>${item.files.map((file) => buildFile(file)).join("")}</div></div>`;
}

export function buildSection(data = DEFAULT_SECTION) {
    return `<section class="dl-section" data-gjs-type="${SECTION_TYPE}"><div class="dl-container" ${SHELL}><div class="dl-head" ${SHELL}><h2 class="dl-title" ${TEXT}>${escapeHtml(data.title)}</h2><div class="dl-line" ${LOCKED}></div></div><div class="dl-groups" ${ZONE}>${data.items.map((item) => buildItem(item)).join("")}</div></div></section>`;
}