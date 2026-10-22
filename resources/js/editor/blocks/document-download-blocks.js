import { openMediaPicker } from "@/editor/media-picker";

const CATEGORY = "Documentos";
const BUTTON_TYPE = "doc-download-button";
const ACCORDION_TYPE = "doc-accordion-item";

const DEFAULT_NAME = "Nombre_del_documento.pdf";
const DEFAULT_SIZE = "0.00 MB";

const LOCKED = 'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"';
const EDITABLE_TEXT = 'contenteditable="true" data-gjs-type="text" data-gjs-editable="true"';

const SIDE = "max(clamp(1.5rem,4vw,3.5rem),calc((100% - 1600px) / 2 + clamp(1.5rem,4vw,3.5rem)))";

const STYLES = `<style>
.dd-section{width:100%;box-sizing:border-box;background-color:#fff;padding-top:clamp(2rem,4vw,3rem);padding-bottom:clamp(2rem,4vw,3rem);padding-left:${SIDE};padding-right:${SIDE};}
.dd-stripe{width:100%;height:3px;margin:1.25rem 0 1.5rem;background-color:#E97300;}
.dd-list,.dd-acc-list{display:flex;flex-direction:column;gap:1rem;}
.dd-btn{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;box-sizing:border-box;padding:1rem 1.5rem;border-radius:0.75rem;background-color:#fff;box-shadow:0 4px 16px rgba(0,59,113,0.1);text-decoration:none;transition:box-shadow 0.2s ease;}
.dd-btn:hover,.dd-btn:focus-visible{box-shadow:0 8px 26px rgba(0,59,113,0.18);}
.dd-btn:focus-visible{outline:2px solid #E97300;outline-offset:2px;}
.dd-btn-left{display:flex;align-items:baseline;gap:0.5rem;flex:1;min-width:0;}
.dd-btn-icon-file{align-self:center;flex-shrink:0;font-size:1.5rem;line-height:1;color:#E97300;}
.dd-btn-label{min-width:0;overflow:hidden;font-size:0.9375rem;font-weight:600;color:#E97300;white-space:nowrap;text-overflow:ellipsis;outline:none;}
.dd-btn-size{flex-shrink:0;font-size:0.9375rem;font-weight:400;color:#E97300;white-space:nowrap;outline:none;}
.dd-btn-size:empty{display:none;}
.dd-btn-download{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:2.5rem;height:2.5rem;border-radius:9999px;background-color:#E97300;color:#fff;transition:transform 0.2s ease,background-color 0.2s ease;}
.dd-btn-download i{font-size:1.375rem;line-height:1;}
.dd-btn:hover .dd-btn-download{background-color:#C96200;transform:translateY(2px);}
.dd-acc-item{width:100%;}
.dd-acc-header{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;box-sizing:border-box;cursor:pointer;}
.dd-acc-title{flex:1;min-width:0;overflow:hidden;font-size:1.125rem;font-weight:700;color:#003B71;white-space:nowrap;text-overflow:ellipsis;outline:none;}
.dd-acc-arrow{flex-shrink:0;font-size:1.5rem;color:#003B71;}
.dd-acc-stripe{width:100%;height:3px;margin-top:1rem;background-color:#E97300;}
.dd-acc-body{display:none;flex-direction:column;gap:1rem;padding-top:1rem;}
.dd-acc-item.dd-acc-open .dd-acc-body{display:flex;}
@media(max-width:992px){
.dd-btn{padding:0.875rem 1.125rem;}
.dd-acc-title{font-size:1rem;}
}
@media(max-width:640px){
.dd-btn-left{flex-wrap:wrap;row-gap:0.125rem;}
.dd-btn-label,.dd-acc-title{white-space:normal;}
}
@media(prefers-reduced-motion:reduce){.dd-btn,.dd-btn-download{transition:none;}.dd-btn:hover .dd-btn-download{transform:none;}}
</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

const ICONS = {
    section: svg(`
<rect x="2" y="4" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.7"/>
<rect x="2" y="9" width="28" height="1.5" rx="0.75" fill="#E97300"/>
<rect x="2" y="13" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
<rect x="4.5" y="15" width="3" height="4" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.7"/>
<rect x="9.5" y="15.5" width="10" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
<circle cx="27" cy="16" r="2" fill="#E97300"/>
<rect x="2" y="21" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
<rect x="4.5" y="23" width="3" height="4" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.7"/>
<rect x="9.5" y="23.5" width="10" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
<circle cx="27" cy="24" r="2" fill="#E97300"/>`),
    button: svg(`
<rect x="2" y="12" width="28" height="8" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.7"/>
<rect x="5" y="14.5" width="3.5" height="4.5" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.8"/>
<rect x="11" y="15" width="12" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.75"/>
<circle cx="26.5" cy="16" r="2.2" fill="#E97300"/>`),
    accordionSection: svg(`
<rect x="2" y="4" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.7"/>
<rect x="2" y="9" width="28" height="1.5" rx="0.75" fill="#E97300"/>
<rect x="2" y="13" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.7"/>
<rect x="4.5" y="14.7" width="3" height="3.6" rx="0.4" fill="none" stroke="#003B71" stroke-width="0.7"/>
<rect x="9.5" y="15.4" width="12" height="1" rx="0.5" fill="#003B71" fill-opacity="0.7"/>
<path d="M26 15l1.5 1.5L26 18" fill="none" stroke="#003B71" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
<rect x="2" y="21" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.7"/>
<rect x="4.5" y="22.7" width="3" height="3.6" rx="0.4" fill="none" stroke="#003B71" stroke-width="0.7"/>
<rect x="9.5" y="23.4" width="12" height="1" rx="0.5" fill="#003B71" fill-opacity="0.7"/>
<path d="M25.2 22.7l1.6 1.3-1.6 1.3" fill="none" stroke="#003B71" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>`),
    accordionItem: svg(`
<rect x="2" y="12" width="28" height="8" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.8"/>
<rect x="5" y="14.3" width="3.5" height="4.4" rx="0.5" fill="none" stroke="#003B71" stroke-width="0.8"/>
<rect x="11" y="15.2" width="13" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.8"/>
<path d="M25 15l1.8 1.8L25 18.6" fill="none" stroke="#003B71" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>`),
};

const buttonInner = (name = DEFAULT_NAME, size = DEFAULT_SIZE) => `
<span class="dd-btn-left" ${LOCKED}>
    <i class="ri-article-line dd-btn-icon-file" ${LOCKED}></i>
    <span class="dd-btn-label" ${EDITABLE_TEXT}>${name}</span>
    <span class="dd-btn-size" ${EDITABLE_TEXT}>${size}</span>
</span>
<span class="dd-btn-download" ${LOCKED}><i class="ri-arrow-down-line"></i></span>`;

const docButton = () => `<a href="#" class="dd-btn" data-gjs-type="${BUTTON_TYPE}">${buttonInner()}</a>`;

const accordionInner = (title, open) => `
<div class="dd-acc-header" role="button" tabindex="0" aria-expanded="${open}" ${LOCKED}>
    <span class="dd-acc-title" ${EDITABLE_TEXT}>${title}</span>
    <i class="${open ? "ri-arrow-down-s-line" : "ri-arrow-right-s-line"} dd-acc-arrow" ${LOCKED}></i>
</div>
<div class="dd-acc-stripe" ${LOCKED}></div>
<div class="dd-acc-body" data-gjs-droppable="true">${docButton()}</div>`;

const accordionItem = (title, open) =>
    `<div class="dd-acc-item${open ? " dd-acc-open" : ""}" data-gjs-type="${ACCORDION_TYPE}">${accordionInner(title, open)}</div>`;

const heading = () =>
    `<h2 class="text-4xl font-extrabold text-[#003B71]" ${EDITABLE_TEXT}>Titulo principal</h2><div class="dd-stripe" ${LOCKED}></div>`;

const section = (listClass, items) =>
    `<section class="dd-section">${heading()}<div class="${listClass}" data-gjs-droppable="true">${items}</div></section>\n${STYLES}`;

export const documentDownloadBlocks = [
    {
        id: "document-download-section",
        label: "Sección de Documentos Descargables",
        category: CATEGORY,
        media: ICONS.section,
        content: section("dd-list", docButton() + docButton()),
    },
    {
        id: "document-download-button",
        label: "Botón de Documento",
        category: CATEGORY,
        media: ICONS.button,
        content: `${docButton()}\n${STYLES}`,
    },
    {
        id: "document-accordion-section",
        label: "Sección de Documentos con Acordeón",
        category: CATEGORY,
        media: ICONS.accordionSection,
        content: section(
            "dd-acc-list",
            accordionItem("Nombre de la sección", true) + accordionItem("Nombre de la sección", false),
        ),
    },
    {
        id: "document-accordion-item",
        label: "Ítem de Acordeón",
        category: CATEGORY,
        media: ICONS.accordionItem,
        content: `${accordionItem("Nombre de la sección", false)}\n${STYLES}`,
    },
];

/*
 * Se serializa con toString() y se ejecuta en la página pública:
 * debe ser autónomo, sin variables ni funciones externas.
 */
function createAccordionScript() {
    return function () {
        const root = this;
        if (root.__ddAccBound) return;
        root.__ddAccBound = true;

        const header = root.querySelector(".dd-acc-header");
        const arrow = root.querySelector(".dd-acc-arrow");
        if (!header || !arrow) return;

        const toggle = () => {
            const open = root.classList.toggle("dd-acc-open");
            arrow.classList.toggle("ri-arrow-down-s-line", open);
            arrow.classList.toggle("ri-arrow-right-s-line", !open);
            header.setAttribute("aria-expanded", String(open));
        };

        header.addEventListener("click", (event) => {
            if (!event.target.closest("a")) toggle();
        });

        header.addEventListener("keydown", (event) => {
            if (event.target !== header) return;
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggle();
            }
        });
    };
}

function formatSize(size) {
    if (typeof size === "number" && size > 0) {
        return size >= 1048576
            ? `${(size / 1048576).toFixed(2)} MB`
            : `${Math.max(1, Math.round(size / 1024))} KB`;
    }
    return typeof size === "string" ? size.trim() : "";
}

function runScript(component) {
    const el = component.getEl();
    const script = component.get("script");
    if (el?.isConnected && typeof script === "function") script.call(el);
}

function runAll(editor) {
    editor
        .getWrapper()
        .find(`[data-gjs-type="${ACCORDION_TYPE}"]`)
        .forEach((component) => {
            component.set("type", ACCORDION_TYPE);
            runScript(component);
        });
}

function registerButton(editor) {
    editor.DomComponents.addType(BUTTON_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === BUTTON_TYPE ? { type: BUTTON_TYPE } : false,

        model: {
            defaults: {
                name: "Botón de Documento",
                tagName: "a",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: { "data-gjs-type": BUTTON_TYPE, class: "dd-btn", href: "#" },
                components: buttonInner(),
                traits: [
                    { type: "text", name: "href", label: "Enlace (URL)" },
                    {
                        type: "checkbox",
                        name: "target",
                        label: "Abrir en nueva pestaña",
                        valueTrue: "_blank",
                        valueFalse: "",
                    },
                    {
                        type: "button",
                        label: "Documento",
                        text: "Seleccionar documento",
                        full: true,
                        command: "select-doc-download-file",
                    },
                ],
            },

            init() {
                this.set("type", BUTTON_TYPE);
                this.addAttributes({ "data-gjs-type": BUTTON_TYPE });
            },
        },
    });

    editor.Commands.add("select-doc-download-file", {
        run(ed) {
            const selected = ed.getSelected();
            if (!selected || selected.get("type") !== BUTTON_TYPE) return;

            openMediaPicker({
                type: "document",
                title: "Seleccionar documento",
                fullMedia: true,
                onSelect: (media) => {
                    selected.addAttributes({ href: media.url });
                    const name = media.filename || media.name || media.url.split("/").pop();
                    selected.find(".dd-btn-label")[0]?.components(name);
                    selected.find(".dd-btn-size")[0]?.components(formatSize(media.size));
                },
            });
        },
    });
}

function registerAccordion(editor) {
    editor.DomComponents.addType(ACCORDION_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === ACCORDION_TYPE ? { type: ACCORDION_TYPE } : false,

        model: {
            defaults: {
                name: "Ítem de Acordeón",
                tagName: "div",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: { "data-gjs-type": ACCORDION_TYPE, class: "dd-acc-item" },
                components: accordionInner("Nombre de la sección", false),
                script: createAccordionScript(),
            },

            init() {
                this.set("type", ACCORDION_TYPE);
                this.addAttributes({ "data-gjs-type": ACCORDION_TYPE });
            },
        },
    });
}

function setupEditorEvents(editor) {
    editor.on("storage:end:load", () => setTimeout(() => runAll(editor), 800));
    editor.on("canvas:render", () => setTimeout(() => runAll(editor), 600));

    editor.on("component:mount", (component) => {
        if (component.getEl()?.getAttribute?.("data-gjs-type") !== ACCORDION_TYPE) return;
        component.set("type", ACCORDION_TYPE);
        setTimeout(() => runScript(component), 400);
    });

    editor.on("component:clone", (component) => {
        if (component.get("type") !== ACCORDION_TYPE) return;
        const el = component.getEl();
        if (!el) return;
        delete el.__ddAccBound;
        setTimeout(() => runScript(component), 400);
    });
}

export function initializeDocumentDownloadBlocks(editor) {
    registerButton(editor);
    registerAccordion(editor);
    setupEditorEvents(editor);
}