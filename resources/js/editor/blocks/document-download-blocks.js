import { openMediaPicker } from "@/editor/media-picker";

const DOC_DOWNLOAD_STYLES = `
<style>
.dd-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.dd-stripe{width:100%;height:3px;background:#E97300;margin:1.25rem 0 1.5rem;}
.dd-list{display:flex;flex-direction:column;gap:1rem;}
.dd-btn{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;background:#ffffff;border-radius:0.75rem;box-shadow:0 4px 16px rgba(0,0,0,0.08);padding:1rem 1.5rem;text-decoration:none;box-sizing:border-box;transition:box-shadow 0.2s ease;}
.dd-btn:hover{box-shadow:0 6px 22px rgba(0,0,0,0.14);}
.dd-btn-left{display:flex;align-items:center;gap:0.75rem;min-width:0;flex:1;}
.dd-btn-icon-file{font-size:1.5rem;color:#E97300;flex-shrink:0;}
.dd-btn-label{font-size:0.9375rem;font-weight:600;color:#E97300;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;outline:none;}
.dd-btn-download{display:flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border-radius:9999px;background:#E97300;color:#ffffff;flex-shrink:0;}
.dd-btn-download i{font-size:1.25rem;}
.dd-acc-list{display:flex;flex-direction:column;gap:1rem;}
.dd-acc-item{width:100%;}
.dd-acc-header{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;cursor:pointer;box-sizing:border-box;}
.dd-acc-title{font-size:1.125rem;font-weight:700;color:#003B71;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;outline:none;flex:1;min-width:0;}
.dd-acc-arrow{font-size:1.5rem;color:#003B71;flex-shrink:0;}
.dd-acc-stripe{width:100%;height:3px;background:#E97300;margin-top:1rem;}
.dd-acc-body{display:none;flex-direction:column;gap:1rem;padding-top:1rem;}
.dd-acc-item.dd-acc-open .dd-acc-body{display:flex;}
@media(max-width:1280px){.dd-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.dd-section{padding:2.5rem 1.5rem;}.dd-btn{padding:0.875rem 1.125rem;}.dd-acc-title{font-size:1rem;}}
@media(max-width:640px){.dd-btn-label{white-space:normal;}.dd-acc-title{white-space:normal;}}
</style>`;

const iconDocDownloadSection = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="9" width="28" height="1.5" rx="0.75" fill="#E97300"/>
    <rect x="2" y="13" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
    <rect x="4.5" y="15" width="3" height="4" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.7"/>
    <rect x="9.5" y="15.5" width="10" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="27" cy="16" r="2" fill="#E97300"/>
    <rect x="2" y="21" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
    <rect x="4.5" y="23" width="3" height="4" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.7"/>
    <rect x="9.5" y="23.5" width="10" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="27" cy="24" r="2" fill="#E97300"/>
</svg>`;

const iconDocDownloadButton = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="12" width="28" height="8" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.7"/>
    <rect x="5" y="14.5" width="3.5" height="4.5" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.8"/>
    <rect x="11" y="15" width="12" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.75"/>
    <circle cx="26.5" cy="16" r="2.2" fill="#E97300"/>
</svg>`;

const iconDocAccordionSection = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="9" width="28" height="1.5" rx="0.75" fill="#E97300"/>
    <rect x="2" y="13" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.7"/>
    <rect x="4.5" y="14.7" width="3" height="3.6" rx="0.4" fill="none" stroke="#003B71" stroke-width="0.7"/>
    <rect x="9.5" y="15.4" width="12" height="1" rx="0.5" fill="#003B71" fill-opacity="0.7"/>
    <path d="M26 15l1.5 1.5L26 18" fill="none" stroke="#003B71" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="2" y="21" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.7"/>
    <rect x="4.5" y="22.7" width="3" height="3.6" rx="0.4" fill="none" stroke="#003B71" stroke-width="0.7"/>
    <rect x="9.5" y="23.4" width="12" height="1" rx="0.5" fill="#003B71" fill-opacity="0.7"/>
    <path d="M25.2 22.7l1.6 1.3-1.6 1.3" fill="none" stroke="#003B71" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const iconDocAccordionItem = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="12" width="28" height="8" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.8"/>
    <rect x="5" y="14.3" width="3.5" height="4.4" rx="0.5" fill="none" stroke="#003B71" stroke-width="0.8"/>
    <rect x="11" y="15.2" width="13" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.8"/>
    <path d="M25 15l1.8 1.8L25 18.6" fill="none" stroke="#003B71" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

function buildDocButtonHTML(label) {
    return `<a href="#" class="dd-btn" data-gjs-type="doc-download-button">
        <span class="dd-btn-left" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <i class="ri-article-line dd-btn-icon-file" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
            <span class="dd-btn-label" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">${label}</span>
        </span>
        <span class="dd-btn-download" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <i class="ri-download-fill"></i>
        </span>
    </a>`;
}

function buildAccordionItemHTML(title, open) {
    const openClass = open ? " dd-acc-open" : "";
    return `<div class="dd-acc-item${openClass}" data-gjs-type="doc-accordion-item">
        <div class="dd-acc-header" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <span class="dd-acc-title" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">${title}</span>
            <i class="${open ? "ri-arrow-down-s-line" : "ri-arrow-right-s-line"} dd-acc-arrow" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
        </div>
        <div class="dd-acc-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
        <div class="dd-acc-body" data-gjs-droppable="true">
            ${buildDocButtonHTML("Nombre_del_documento.pdf")}
        </div>
    </div>`;
}

function createAccordionItemScript() {
    return function () {
        const root = this;
        if (root.__ddAccBound) return;
        root.__ddAccBound = true;

        const header = root.querySelector(".dd-acc-header");
        const arrow = root.querySelector(".dd-acc-arrow");
        if (!header || !arrow) return;

        header.addEventListener("click", (e) => {
            if (e.target.closest("a")) return;
            const isOpen = root.classList.toggle("dd-acc-open");
            arrow.classList.toggle("ri-arrow-down-s-line", isOpen);
            arrow.classList.toggle("ri-arrow-right-s-line", !isOpen);
        });
    };
}

export const documentDownloadBlocks = [
    {
        id: "document-download-section",
        label: "Sección de Documentos Descargables",
        category: "Documentos",
        media: iconDocDownloadSection,
        content: `
<section class="dd-section">
    <h2 class="text-4xl font-extrabold text-[#003B71]" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Consulta listado de cuentas a prescribir</h2>
    <div class="dd-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
    <div class="dd-list" data-gjs-droppable="true">
        ${buildDocButtonHTML("Nombre_del_documento.pdf")}
        ${buildDocButtonHTML("Nombre_del_documento.pdf")}
    </div>
</section>
${DOC_DOWNLOAD_STYLES}`,
    },
    {
        id: "document-download-button",
        label: "Botón de Documento",
        category: "Documentos",
        media: iconDocDownloadButton,
        content: `${buildDocButtonHTML("Nombre_del_documento.pdf")}${DOC_DOWNLOAD_STYLES}`,
    },
    {
        id: "document-accordion-section",
        label: "Sección de Documentos con Acordeón",
        category: "Documentos",
        media: iconDocAccordionSection,
        content: `
<section class="dd-section">
    <h2 class="text-4xl font-extrabold text-[#003B71]" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Consulta listado de cuentas a prescribir</h2>
    <div class="dd-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
    <div class="dd-acc-list" data-gjs-droppable="true">
        ${buildAccordionItemHTML("Nombre de la sección", true)}
        ${buildAccordionItemHTML("Nombre de la sección", false)}
    </div>
</section>
${DOC_DOWNLOAD_STYLES}`,
    },
    {
        id: "document-accordion-item",
        label: "Ítem de Acordeón",
        category: "Documentos",
        media: iconDocAccordionItem,
        content: `${buildAccordionItemHTML("Nombre de la sección", false)}${DOC_DOWNLOAD_STYLES}`,
    },
];

export function initializeDocumentDownloadBlocks(editor) {
    const buttonComponentType = "doc-download-button";
    const accordionComponentType = "doc-accordion-item";

    editor.DomComponents.addType(buttonComponentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === buttonComponentType
                ? { type: buttonComponentType }
                : false,

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
                attributes: {
                    "data-gjs-type": buttonComponentType,
                    class: "dd-btn",
                    href: "#",
                },
                components: `
                    <span class="dd-btn-left" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                        <i class="ri-article-line dd-btn-icon-file" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
                        <span class="dd-btn-label" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Nombre_del_documento.pdf</span>
                    </span>
                    <span class="dd-btn-download" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                        <i class="ri-download-fill"></i>
                    </span>
                `,
                traits: [
                    {
                        type: "text",
                        name: "href",
                        label: "Enlace (URL)",
                    },
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
                this.set("type", buttonComponentType);
                this.addAttributes({ "data-gjs-type": buttonComponentType });
            },
        },
    });

    editor.DomComponents.addType(accordionComponentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === accordionComponentType
                ? { type: accordionComponentType }
                : false,

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
                attributes: {
                    "data-gjs-type": accordionComponentType,
                    class: "dd-acc-item",
                },
                components: `
                    <div class="dd-acc-header" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                        <span class="dd-acc-title" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Nombre de la sección</span>
                        <i class="ri-arrow-right-s-line dd-acc-arrow" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
                    </div>
                    <div class="dd-acc-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div class="dd-acc-body" data-gjs-droppable="true">
                        <a href="#" class="dd-btn" data-gjs-type="doc-download-button">
                            <span class="dd-btn-left" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                                <i class="ri-article-line dd-btn-icon-file" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
                                <span class="dd-btn-label" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Nombre_del_documento.pdf</span>
                            </span>
                            <span class="dd-btn-download" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                                <i class="ri-download-fill"></i>
                            </span>
                        </a>
                    </div>
                `,
                script: createAccordionItemScript(),
            },

            init() {
                this.set("type", accordionComponentType);
                this.addAttributes({ "data-gjs-type": accordionComponentType });
            },
        },
    });

    editor.Commands.add("select-doc-download-file", {
        run(ed) {
            const selected = ed.getSelected();
            if (!selected || selected.get("type") !== buttonComponentType)
                return;

            openMediaPicker({
                type: "document",
                title: "Seleccionar documento",
                onSelect: (fileUrl, fileMeta) => {
                    selected.addAttributes({ href: fileUrl });
                    const labelComp = selected.find(".dd-btn-label")[0];
                    const name = fileMeta?.name || fileUrl.split("/").pop();
                    if (labelComp) {
                        labelComp.components(name);
                    }
                },
            });
        },
    });

    setupAccordionEditorEvents(editor, accordionComponentType);
}

function setupAccordionEditorEvents(editor, componentType) {
    editor.on("storage:end:load", () => {
        setTimeout(
            () => reinitializeAccordionComponents(editor, componentType),
            800,
        );
    });

    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (el?.getAttribute?.("data-gjs-type") === componentType) {
            component.set("type", componentType);
            setTimeout(() => {
                const script = component.get("script");
                if (script && typeof script === "function") script.call(el);
            }, 400);
        }
    });

    editor.on("component:clone", (component) => {
        if (component.get("type") === componentType) {
            const el = component.getEl();
            if (el) {
                delete el.__ddAccBound;
                setTimeout(() => {
                    const script = component.get("script");
                    if (script && typeof script === "function") script.call(el);
                }, 400);
            }
        }
    });

    editor.on("canvas:render", () => {
        setTimeout(
            () => reinitializeAccordionComponents(editor, componentType),
            600,
        );
    });
}

function reinitializeAccordionComponents(editor, componentType) {
    editor
        .getWrapper()
        .find(`[data-gjs-type="${componentType}"]`)
        .forEach((comp) => {
            comp.set("type", componentType);
            const el = comp.getEl();
            if (el?.isConnected) {
                const script = comp.get("script");
                if (script && typeof script === "function") script.call(el);
            }
        });
}
