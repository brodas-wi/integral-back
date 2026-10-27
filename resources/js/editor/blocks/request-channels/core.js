import {
    CARD_TYPE,
    ICONS,
    ICON_OPTIONS,
    ICON_TYPE,
    LINK_TYPE,
    SECTION_TYPE,
    STYLES,
    TEXT_TYPE,
    buildCard,
    buildLink,
    buildSection,
    buildText,
} from "./templates.js";

const CATEGORY = "Institucional";
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?:|mailto:|tel:)/i;
const ICON_CLASSES = ICON_OPTIONS.map((option) => option.value);

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

const INLINE_DEFAULTS = {
    droppable: false,
    removable: true,
    copyable: true,
    selectable: true,
    hoverable: true,
    highlightable: false,
};

function isSafeHref(value) {
    const url = String(value ?? "").trim();
    return !SCHEME.test(url) || SAFE_SCHEME.test(url);
}

function registerBase(editor, type, defaults) {
    editor.DomComponents.addType(type, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === type ? { type } : false,
        model: {
            defaults: { ...BASE_DEFAULTS, ...defaults },
        },
    });
}

function registerInline(editor, type, extend, defaults, methods = {}) {
    editor.DomComponents.addType(type, {
        extend,
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === type ? { type } : false,
        model: {
            defaults: { ...INLINE_DEFAULTS, ...defaults },
            ...methods,
        },
    });
}

function registerTypes(editor) {
    registerBase(editor, SECTION_TYPE, {
        name: "Medios de Solicitud",
        tagName: "section",
    });

    registerBase(editor, CARD_TYPE, {
        name: "Medio de Solicitud",
        tagName: "div",
        draggable: ".ex-grid",
    });

    registerInline(editor, TEXT_TYPE, "text", {
        name: "Texto de Medio",
        tagName: "p",
        draggable: ".ex-body",
    });

    registerInline(
        editor,
        LINK_TYPE,
        "link",
        {
            name: "Enlace de Medio",
            tagName: "a",
            draggable: ".ex-body",
            traits: [
                "id",
                {
                    type: "text",
                    name: "href",
                    label: "Enlace (URL)",
                    placeholder: "mailto:, tel:, /pagina o https://...",
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
        {
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
    );
}

function registerIconType(editor) {
    editor.DomComponents.addType(ICON_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === ICON_TYPE ? { type: ICON_TYPE } : false,
        model: {
            defaults: {
                name: "Icono",
                tagName: "i",
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                traits: [
                    "id",
                    {
                        type: "select",
                        name: "data-ex-icon",
                        label: "Icono",
                        options: ICON_OPTIONS.map(({ value, label }) => ({
                            id: value,
                            value,
                            label,
                            name: label,
                        })),
                    },
                ],
            },
            init() {
                this.on("change:attributes:data-ex-icon", this.syncIcon);
            },
            syncIcon() {
                const icon = this.getAttributes()["data-ex-icon"];
                if (!ICON_CLASSES.includes(icon)) return;
                this.removeClass(ICON_CLASSES);
                this.addClass(icon);
            },
        },
    });
}

function registerBlocks(editor) {
    const blocks = [
        {
            id: "request-channels-block",
            label: "Medios de Solicitud",
            media: ICONS.section,
            content: `${buildSection()}${STYLES}`,
        },
        {
            id: "request-channels-card-block",
            label: "Medio de Solicitud",
            media: ICONS.card,
            content: buildCard(),
        },
        {
            id: "request-channels-text-block",
            label: "Texto de Medio",
            media: ICONS.text,
            content: buildText(),
        },
        {
            id: "request-channels-link-block",
            label: "Enlace de Medio",
            media: ICONS.link,
            content: buildLink(),
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerRequestChannelsCore(editor) {
    registerTypes(editor);
    registerIconType(editor);
    registerBlocks(editor);
}