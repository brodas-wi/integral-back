import {
    FORM_TYPE,
    ICONS,
    LINK_TYPE,
    SECTION_TYPE,
    STYLES,
    buildContactSection,
    buildFormSection,
} from "./templates.js";

const CATEGORY = "Formularios";
const SLUG_ATTR = "data-inline-form";
const CANVAS_STYLE_ID = "inf-canvas-placeholder";
const CANVAS_CSS = `
[data-inline-form]:empty{display:flex;align-items:center;justify-content:center;min-height:14rem;box-sizing:border-box;padding:1rem;border:2px dashed #cbd5e1;border-radius:1rem;color:#64748b;font:500 0.875rem 'Inter',sans-serif;text-align:center;}
[data-inline-form]:empty::before{content:"Formulario: " attr(data-inline-form);}
[data-inline-form=""]:empty::before{content:"Selecciona un formulario en los ajustes";}
`;

const BASE_DEFAULTS = {
    draggable: true,
    droppable: false,
    removable: true,
    copyable: true,
    selectable: true,
    hoverable: true,
    editable: false,
    highlightable: false,
};

function normalizeSlug(value) {
    return String(value ?? "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
}

function injectCanvasStyle(doc) {
    if (!doc || doc.getElementById(CANVAS_STYLE_ID)) return;
    const style = doc.createElement("style");
    style.id = CANVAS_STYLE_ID;
    style.textContent = CANVAS_CSS;
    doc.head.appendChild(style);
}

const SLUG_TRAIT = "data-form-slug";

function registerTypes(editor) {
    editor.DomComponents.addType(SECTION_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === SECTION_TYPE ? { type: SECTION_TYPE } : false,
        model: {
            defaults: {
                ...BASE_DEFAULTS,
                name: "Sección con Formulario",
                tagName: "section",
                traits: [
                    "id",
                    {
                        type: "text",
                        name: SLUG_TRAIT,
                        label: "Formulario (slug)",
                        placeholder: "contacto",
                    },
                ],
            },
            init() {
                this.on(`change:attributes:${SLUG_TRAIT}`, this.syncSlug);
            },
            syncSlug() {
                const current = this.getAttributes()[SLUG_TRAIT] ?? "";
                const slug = normalizeSlug(current);
                if (slug !== current) this.addAttributes({ [SLUG_TRAIT]: slug });
                this.findType(FORM_TYPE)[0]?.addAttributes({ [SLUG_ATTR]: slug });
            },
        },
    });

    editor.DomComponents.addType(FORM_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === FORM_TYPE ? { type: FORM_TYPE } : false,
        model: {
            defaults: {
                ...BASE_DEFAULTS,
                name: "Formulario",
                tagName: "div",
                draggable: false,
                removable: false,
                copyable: false,
                selectable: false,
                hoverable: false,
            },
        },
    });
}

const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?:|mailto:|tel:)/i;

function isSafeHref(value) {
    const url = String(value ?? "").trim();
    return !SCHEME.test(url) || SAFE_SCHEME.test(url);
}

function registerLinkType(editor) {
    editor.DomComponents.addType(LINK_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === LINK_TYPE ? { type: LINK_TYPE } : false,
        model: {
            defaults: {
                ...BASE_DEFAULTS,
                name: "Enlace de Contacto",
                tagName: "a",
                draggable: false,
                removable: false,
                copyable: false,
                traits: [
                    "id",
                    {
                        type: "text",
                        name: "href",
                        label: "Enlace (URL)",
                        placeholder: "tel:+503..., mailto:..., https://...",
                    },
                    {
                        type: "checkbox",
                        name: "target",
                        label: "Abrir en nueva pestaña",
                        valueTrue: "_blank",
                        valueFalse: "",
                    },
                ],
            },
            init() {
                this.on("change:attributes:href", this.sanitizeHref);
                this.on("change:attributes:target", this.syncRel);
            },
            sanitizeHref() {
                if (!isSafeHref(this.getAttributes().href)) this.addAttributes({ href: "#" });
            },
            syncRel() {
                if (this.getAttributes().target === "_blank") {
                    this.addAttributes({ rel: "noopener noreferrer" });
                } else {
                    this.removeAttributes("rel");
                }
            },
        },
    });
}

function registerBlocks(editor) {
    const blocks = [
        {
            id: "inline-form-contact-block",
            label: "Formulario con Contacto",
            media: ICONS.contact,
            content: `${buildContactSection()}${STYLES}`,
        },
        {
            id: "inline-form-block",
            label: "Formulario",
            media: ICONS.form,
            content: `${buildFormSection()}${STYLES}`,
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerInlineFormCore(editor) {
    registerTypes(editor);
    registerLinkType(editor);
    registerBlocks(editor);

    editor.on("canvas:frame:load", ({ window: frameWindow }) =>
        injectCanvasStyle(frameWindow?.document),
    );
    editor.on("load", () => injectCanvasStyle(editor.Canvas.getDocument()));
}