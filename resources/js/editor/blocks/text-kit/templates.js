export const PARA_TYPE = "tx-para";
export const UL_TYPE = "tx-ul";
export const OL_TYPE = "tx-ol";
export const ITEM_TYPE = "tx-item";
export const LINK_TYPE = "tx-link";

const TX_CSS = `
.tx-para{margin:0;color:#003B71;font-family:'Poppins',sans-serif;font-weight:400;font-size:0.875rem;line-height:1.6;}
.tx-list{margin:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:1.25rem;list-style-position:outside;}
ul.tx-list{list-style-type:disc;}
ol.tx-list{list-style-type:decimal;}
.tx-item{margin:0 0 0.125rem;color:#003B71;font-family:'Poppins',sans-serif;font-weight:400;font-size:0.875rem;line-height:1.6;}
.tx-item::marker{font-size:0.85em;}
.tx-link{display:inline-block;align-self:flex-start;color:#E97300;font-family:'Poppins',sans-serif;font-weight:400;font-size:0.875rem;line-height:1.6;text-decoration:none;overflow-wrap:anywhere;transition:color 0.2s ease;}
.tx-link:hover{color:#C96200;text-decoration:underline;}
.tx-link:focus-visible{outline:2px solid #E97300;outline-offset:2px;border-radius:0.125rem;}
.tx-para a,.tx-item a{color:#E97300;text-decoration:none;overflow-wrap:anywhere;}
.tx-para a:hover,.tx-item a:hover{color:#C96200;text-decoration:underline;}
@media(prefers-reduced-motion:reduce){
.tx-link{transition:none;}
}
`;

export const STYLES = `<style>${TX_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

export const ICONS = {
    para: svg(`
<rect x="5" y="10" width="22" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
<rect x="5" y="14" width="22" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
<rect x="5" y="18" width="22" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
<rect x="5" y="22" width="13" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>`),
    ul: svg(`
<circle cx="7" cy="10" r="1" fill="#003B71" fill-opacity="0.75"/>
<rect x="11" y="9.2" width="16" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.5"/>
<circle cx="7" cy="16" r="1" fill="#003B71" fill-opacity="0.75"/>
<rect x="11" y="15.2" width="16" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.5"/>
<circle cx="7" cy="22" r="1" fill="#003B71" fill-opacity="0.75"/>
<rect x="11" y="21.2" width="11" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.5"/>`),
    ol: svg(`
<rect x="5.6" y="9" width="2" height="2" rx="0.5" fill="#003B71" fill-opacity="0.75"/>
<rect x="11" y="9.2" width="16" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.5"/>
<rect x="5.6" y="15" width="2" height="2" rx="0.5" fill="#003B71" fill-opacity="0.75"/>
<rect x="11" y="15.2" width="16" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.5"/>
<rect x="5.6" y="21" width="2" height="2" rx="0.5" fill="#003B71" fill-opacity="0.75"/>
<rect x="11" y="21.2" width="11" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.5"/>`),
    item: svg(`
<circle cx="8" cy="16" r="1.4" fill="#003B71" fill-opacity="0.75"/>
<rect x="12" y="14.8" width="15" height="2.4" rx="1.2" fill="#003B71" fill-opacity="0.5"/>`),
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

export function buildPara(text = "Escribe aquí el texto.") {
    return `<p class="tx-para" data-gjs-type="${PARA_TYPE}">${escapeHtml(text)}</p>`;
}

export function buildItem(text = "Escribe aquí el texto.") {
    return `<li class="tx-item" data-gjs-type="${ITEM_TYPE}">${escapeHtml(text)}</li>`;
}

export function buildList(ordered = false, items = ["Primer ítem.", "Segundo ítem.", "Tercer ítem."]) {
    const tag = ordered ? "ol" : "ul";
    const type = ordered ? OL_TYPE : UL_TYPE;
    return `<${tag} class="tx-list" data-gjs-type="${type}">${items.map((text) => buildItem(text)).join("")}</${tag}>`;
}

export function buildLink({ text = "Enlace", href = "#", newTab = false } = {}) {
    const target = newTab ? ` target="_blank" rel="noopener noreferrer"` : "";
    return `<a class="tx-link" href="${escapeHtml(href)}"${target} data-gjs-type="${LINK_TYPE}">${escapeHtml(text)}</a>`;
}