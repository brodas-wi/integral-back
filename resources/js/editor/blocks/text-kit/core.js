import {
    ICONS,
    ITEM_TYPE,
    LINK_TYPE,
    OL_TYPE,
    PARA_TYPE,
    STYLES,
    UL_TYPE,
    buildItem,
    buildLink,
    buildList,
    buildPara,
} from "./templates.js";

const CATEGORY = "Texto";
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?:|mailto:|tel:)/i;
const BLOCK_PREFIX = /^(th|ip|hl|oc|lc|ex|lp|ts|sa|dl)-/;

const PIECE_DEFAULTS = {
    draggable: true,
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

function isSelector(value) {
    return typeof value === "string" && value.trim().startsWith(".");
}

function releaseRestrictions(component) {
    const classes = (component.getClasses?.() ?? []).map(String);
    if (!classes.some((name) => BLOCK_PREFIX.test(name))) return;

    const patch = {};
    if (isSelector(component.get("draggable"))) patch.draggable = true;
    if (isSelector(component.get("droppable"))) patch.droppable = true;

    if (Object.keys(patch).length) component.set(patch, { silent: true });
}

function registerTextType(editor, type, defaults) {
    editor.DomComponents.addType(type, {
        extend: "text",
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === type ? { type } : false,
        model: {
            defaults: { ...PIECE_DEFAULTS, ...defaults },
        },
    });
}

function registerListType(editor, type, name, tagName) {
    editor.DomComponents.addType(type, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === type ? { type } : false,
        model: {
            defaults: {
                ...PIECE_DEFAULTS,
                name,
                tagName,
                droppable: true,
                editable: false,
            },
        },
    });
}

function registerLinkType(editor) {
    editor.DomComponents.addType(LINK_TYPE, {
        extend: "link",
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === LINK_TYPE ? { type: LINK_TYPE } : false,
        model: {
            defaults: {
                ...PIECE_DEFAULTS,
                name: "Enlace",
                tagName: "a",
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
            id: "text-kit-para-block",
            label: "Párrafo",
            media: ICONS.para,
            content: `${buildPara()}${STYLES}`,
        },
        {
            id: "text-kit-ul-block",
            label: "Lista con viñetas",
            media: ICONS.ul,
            content: `${buildList(false)}${STYLES}`,
        },
        {
            id: "text-kit-ol-block",
            label: "Lista numerada",
            media: ICONS.ol,
            content: `${buildList(true)}${STYLES}`,
        },
        {
            id: "text-kit-item-block",
            label: "Ítem de lista",
            media: ICONS.item,
            content: `${buildItem()}${STYLES}`,
        },
        {
            id: "text-kit-link-block",
            label: "Enlace",
            media: ICONS.link,
            content: `${buildLink()}${STYLES}`,
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerTextKitCore(editor) {
    registerTextType(editor, PARA_TYPE, { name: "Párrafo", tagName: "p" });
    registerTextType(editor, ITEM_TYPE, { name: "Ítem de lista", tagName: "li" });
    registerListType(editor, UL_TYPE, "Lista con viñetas", "ul");
    registerListType(editor, OL_TYPE, "Lista numerada", "ol");
    registerLinkType(editor);
    registerBlocks(editor);

    editor.on("component:add component:mount", releaseRestrictions);
}