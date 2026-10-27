import {
    CARD_TYPE,
    ICONS,
    LINK_TYPE,
    NOTICE_TYPE,
    SECTION_TYPE,
    STYLES,
    TEXT_TYPE,
    buildCard,
    buildLink,
    buildNotice,
    buildSection,
    buildText,
} from "./templates.js";

const CATEGORY = "Institucional";
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?:|mailto:|tel:)/i;

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
        name: "Canales Oficiales",
        tagName: "section",
    });

    registerBase(editor, CARD_TYPE, {
        name: "Canal Oficial",
        tagName: "div",
        draggable: ".oc-grid",
    });

    registerBase(editor, NOTICE_TYPE, {
        name: "Aviso Destacado",
        tagName: "div",
        draggable: ".oc-container",
    });

    registerInline(editor, TEXT_TYPE, "text", {
        name: "Texto de Canal",
        tagName: "p",
        draggable: ".oc-body",
    });

    registerInline(
        editor,
        LINK_TYPE,
        "link",
        {
            name: "Enlace de Canal",
            tagName: "a",
            draggable: ".oc-body",
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

function registerBlocks(editor) {
    const blocks = [
        {
            id: "official-channels-block",
            label: "Canales Oficiales",
            media: ICONS.section,
            content: `${buildSection()}${STYLES}`,
        },
        {
            id: "official-channels-card-block",
            label: "Canal Oficial",
            media: ICONS.card,
            content: buildCard(),
        },
        {
            id: "official-channels-text-block",
            label: "Texto de Canal",
            media: ICONS.text,
            content: buildText(),
        },
        {
            id: "official-channels-link-block",
            label: "Enlace de Canal",
            media: ICONS.link,
            content: buildLink(),
        },
        {
            id: "official-channels-notice-block",
            label: "Aviso Destacado",
            media: ICONS.notice,
            content: buildNotice(),
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerOfficialChannelsCore(editor) {
    registerTypes(editor);
    registerBlocks(editor);
}