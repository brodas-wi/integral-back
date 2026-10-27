import { assetUrl } from "@/utils/url.js";

export const SECTION_TYPE = "ib-section";
export const GRID_TYPE = "ib-grid";
export const ITEM_TYPE = "ib-item";

const CATEGORY = "Detalle de Producto";
const PLACEHOLDER = assetUrl("images/placeholder.svg");
const DEFAULT_LABELS = ["Teléfono", "Luz", "Cable e Internet", "Agua", "Recargas", "Otros"];

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" data-gjs-selectable="false" data-gjs-hoverable="false"`;
const TEXT = `${FIXED} data-gjs-type="text"`;
const IMAGE = `${FIXED} data-gjs-type="image"`;
const GRID = `${FIXED} data-gjs-selectable="false" data-gjs-hoverable="false"`;

const IB_CSS = `
.ib-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;scroll-margin-top:140px;}
.ib-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;display:flex;flex-direction:column;gap:1.25rem;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.ib-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.125rem,2vw,1.375rem);line-height:1.3;}
.ib-divider{width:100%;height:2px;background-color:#E97300;}
.ib-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));column-gap:1.5rem;row-gap:2rem;align-items:start;padding-top:0.75rem;}
.ib-item{display:flex;flex-direction:column;align-items:center;gap:0.75rem;min-width:0;text-align:center;}
.ib-circle{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:4.25rem;height:4.25rem;border-radius:9999px;background-color:#E97300;}
.ib-img{display:block;width:2rem;height:2rem;object-fit:contain;}
.ib-label{max-width:100%;color:#003B71;font-size:0.875rem;font-weight:700;line-height:1.3;overflow-wrap:anywhere;}
@media(max-width:992px){
.ib-section{scroll-margin-top:80px;}
.ib-grid{grid-template-columns:repeat(3,minmax(0,1fr));}
}
@media(max-width:640px){
.ib-grid{grid-template-columns:repeat(2,minmax(0,1fr));row-gap:1.5rem;column-gap:1rem;}
.ib-circle{width:3.75rem;height:3.75rem;}
.ib-img{width:1.75rem;height:1.75rem;}
}
`;

const SECTION_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="4" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.75"/>
    <rect x="3" y="9" width="26" height="0.9" rx="0.45" fill="#E97300"/>
    <circle cx="7" cy="17" r="3.2" fill="#E97300"/>
    <circle cx="16" cy="17" r="3.2" fill="#E97300"/>
    <circle cx="25" cy="17" r="3.2" fill="#E97300"/>
    <circle cx="7" cy="17" r="1.1" fill="#ffffff" fill-opacity="0.9"/>
    <circle cx="16" cy="17" r="1.1" fill="#ffffff" fill-opacity="0.9"/>
    <circle cx="25" cy="17" r="1.1" fill="#ffffff" fill-opacity="0.9"/>
    <rect x="4.5" y="23" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
    <rect x="13.5" y="23" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
    <rect x="22.5" y="23" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
</svg>`;

const ITEM_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="13" r="6" fill="#E97300"/>
    <circle cx="16" cy="13" r="2" fill="#ffffff" fill-opacity="0.9"/>
    <rect x="10" y="23" width="12" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.7"/>
</svg>`;

function buildItem(label) {
    return `<div class="ib-item" data-gjs-type="${ITEM_TYPE}"><div class="ib-circle" ${SHELL}><img class="ib-img" src="${PLACEHOLDER}" alt="" ${IMAGE}></div><span class="ib-label" ${TEXT}>${label}</span></div>`;
}

function buildSection() {
    const items = DEFAULT_LABELS.map(buildItem).join("");
    return `<section class="ib-section" data-gjs-type="${SECTION_TYPE}"><div class="ib-container" ${SHELL}><h2 class="ib-title" ${TEXT}>¿Qué servicios puedes pagar?</h2><div class="ib-divider" ${SHELL}></div><div class="ib-grid" data-gjs-type="${GRID_TYPE}" ${GRID}>${items}</div></div></section><style>${IB_CSS}</style>`;
}

function registerTypes(editor) {
    editor.DomComponents.addType(SECTION_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === SECTION_TYPE ? { type: SECTION_TYPE } : false,
        model: {
            defaults: {
                name: "Íconos con Título",
                tagName: "section",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
            },
        },
    });

    editor.DomComponents.addType(GRID_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === GRID_TYPE ? { type: GRID_TYPE } : false,
        model: {
            defaults: {
                name: "Cuadrícula de íconos",
                tagName: "div",
                draggable: false,
                droppable: ".ib-item",
                removable: false,
                copyable: false,
                selectable: false,
                hoverable: false,
                editable: false,
                highlightable: false,
            },
        },
    });

    editor.DomComponents.addType(ITEM_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === ITEM_TYPE ? { type: ITEM_TYPE } : false,
        model: {
            defaults: {
                name: "Ícono con texto",
                tagName: "div",
                draggable: ".ib-grid",
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
            },
        },
    });
}

export function registerIconBadgeCore(editor) {
    registerTypes(editor);

    editor.BlockManager.add("icon-badge-section-block", {
        label: "Sección: Íconos con Título",
        category: CATEGORY,
        media: SECTION_ICON,
        activate: true,
        content: buildSection(),
    });

    editor.BlockManager.add("icon-badge-item-block", {
        label: "Ícono circular + texto",
        category: CATEGORY,
        media: ITEM_ICON,
        activate: true,
        content: buildItem("Lorem ipsum"),
    });
}