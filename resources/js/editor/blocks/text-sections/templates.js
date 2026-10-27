export const SECTION_TYPE = "ts-section";
export const GROUP_TYPE = "ts-group";
export const PARA_TYPE = "ts-para";

export const DEFAULT_DATA = {
    groups: [
        {
            title: "Condiciones generales",
            paras: [
                "Por el acceso a esta dirección electrónica y a cualquiera de sus páginas (en adelante, la “Web”), el usuario adquiere la condición de usuario y se presume que acepta plenamente las presentes Condiciones Generales de Uso.",
                "El acceso a determinadas secciones de la Web puede encontrarse limitado por leyes y disposiciones vigentes en distintas jurisdicciones. En caso de encontrarse sujeto a dichas restricciones, el usuario no deberá acceder a parte o a la totalidad de la Web de Banco Integral (en adelante, el “Banco”).",
                "La información contenida en esta Web, incluidos ciertos productos y servicios, está destinada a su distribución o uso por personas naturales o jurídicas y, otras entidades legalmente reconocidas (en adelante, las “Personas”).",
                "Cualquier modalidad de utilización de los contenidos del sitio web de Banco Integral, incluyendo reproducción, distribución, comunicación pública, enlaces informáticos o cualquier otro uso total o parcial, solo podrá realizarse con autorización previa y por escrito de Banco Integral.",
            ],
        },
        {
            title: "Responsabilidad y garantías de Banco Integral",
            paras: [
                "Banco Integral obtiene la información y materiales contenidos en su Web de fuentes que considera confiables y adopta medidas razonables para procurar que dicha información sea veraz y actualizada. No obstante, Banco Integral no garantiza la exactitud, integridad o actualidad de los contenidos.",
            ],
        },
    ],
};

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const HIDDEN = 'data-gjs-selectable="false" data-gjs-hoverable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" ${HIDDEN}`;
const GROUPS = `${FIXED} data-gjs-droppable=".ts-group" ${HIDDEN}`;
const TITLE_COL = `${FIXED} data-gjs-droppable=".ts-title,.ts-line" ${HIDDEN}`;
const BODY = `${FIXED} data-gjs-droppable=".ts-para" ${HIDDEN}`;
const IN_TITLE_COL = 'data-gjs-draggable=".ts-title-col"';
const IN_BODY = 'data-gjs-draggable=".ts-body"';

const TS_CSS = `
.ts-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.ts-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1rem,3vw,2.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1rem,3vw,2.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.ts-groups{display:flex;flex-direction:column;min-height:3rem;}
.ts-group{display:grid;grid-template-columns:minmax(12rem,28%) minmax(0,1fr);column-gap:clamp(1.5rem,4vw,3rem);row-gap:1rem;align-items:start;box-sizing:border-box;padding-top:clamp(1.5rem,3vw,2.5rem);padding-bottom:clamp(1.5rem,3vw,2.5rem);}
.ts-group + .ts-group{border-top:1px solid #E97300;}
.ts-title-col{min-width:0;min-height:1.5rem;}
.ts-title{margin:0;color:#E97300;font-weight:600;font-size:clamp(1.125rem,1.8vw,1.25rem);line-height:1.3;}
.ts-line{width:2.5rem;height:1rem;margin-top:0.25rem;background-image:linear-gradient(#E97300,#E97300);background-repeat:no-repeat;background-position:left center;background-size:100% 2px;}
.ts-body{display:flex;flex-direction:column;gap:0.75rem;min-width:0;min-height:1.5rem;}
.ts-para{margin:0;color:#003B71;font-weight:400;font-size:0.875rem;line-height:1.6;}
@media(max-width:768px){
.ts-group{grid-template-columns:minmax(0,1fr);}
}
`;

export const STYLES = `<style>${TS_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

const lines = (y) => `
<rect x="13" y="${y}" width="16" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
<rect x="13" y="${y + 3}" width="14" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
<rect x="13" y="${y + 6}" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>`;

export const ICONS = {
    section: svg(`
<rect x="3" y="5" width="7" height="2" rx="1" fill="#E97300"/>
<rect x="3" y="8.5" width="3" height="1" rx="0.5" fill="#E97300"/>
${lines(5)}
<rect x="3" y="15.5" width="26" height="0.8" fill="#E97300"/>
<rect x="3" y="20" width="8" height="2" rx="1" fill="#E97300"/>
<rect x="3" y="23.5" width="3" height="1" rx="0.5" fill="#E97300"/>
${lines(20)}`),
    group: svg(`
<rect x="3" y="9" width="8" height="2.2" rx="1.1" fill="#E97300"/>
<rect x="3" y="12.8" width="3.4" height="1.1" rx="0.55" fill="#E97300"/>
${lines(9)}`),
    para: svg(`
<rect x="5" y="11" width="22" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.55"/>
<rect x="5" y="15" width="22" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.55"/>
<rect x="5" y="19" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.55"/>`),
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
    return `<p class="ts-para" data-gjs-type="${PARA_TYPE}">${escapeHtml(text)}</p>`;
}

export function buildGroup(group = { title: "Nuevo título", paras: ["Escribe aquí el texto."] }) {
    return `<div class="ts-group" data-gjs-type="${GROUP_TYPE}"><div class="ts-title-col" ${TITLE_COL}><h3 class="ts-title" data-gjs-type="text" ${IN_TITLE_COL}>${escapeHtml(group.title)}</h3><div class="ts-line" ${IN_TITLE_COL}></div></div><div class="ts-body" ${BODY}>${group.paras.map((text) => buildPara(text)).join("")}</div></div>`;
}

export function buildSection(data = DEFAULT_DATA) {
    return `<section class="ts-section" data-gjs-type="${SECTION_TYPE}"><div class="ts-container" ${SHELL}><div class="ts-groups" ${GROUPS}>${data.groups.map((group) => buildGroup(group)).join("")}</div></div></section>`;
}