import {
    ICONS,
    ICON_OPTIONS,
    ICON_TYPE,
    ITEM_TYPE,
    LIST_TYPE,
    NOTICE_TYPE,
    PARA_TYPE,
    SECTION_TYPE,
    STYLES,
    buildItem,
    buildList,
    buildNotice,
    buildPara,
    buildSection,
} from "./templates.js";

const CATEGORY = "Institucional";
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

function registerBase(editor, type, defaults) {
    editor.DomComponents.addType(type, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === type ? { type } : false,
        model: {
            defaults: { ...BASE_DEFAULTS, ...defaults },
        },
    });
}

function registerTextType(editor, type, defaults) {
    editor.DomComponents.addType(type, {
        extend: "text",
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === type ? { type } : false,
        model: {
            defaults: {
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                highlightable: false,
                ...defaults,
            },
        },
    });
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
                        name: "data-sa-icon",
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
                this.on("change:attributes:data-sa-icon", this.syncIcon);
            },
            syncIcon() {
                const icon = this.getAttributes()["data-sa-icon"];
                if (!ICON_CLASSES.includes(icon)) return;
                this.removeClass(ICON_CLASSES);
                this.addClass(icon);
            },
        },
    });
}

function registerTypes(editor) {
    registerBase(editor, SECTION_TYPE, {
        name: "Texto con Lista y Aviso",
        tagName: "section",
    });

    registerBase(editor, LIST_TYPE, {
        name: "Lista Numerada",
        tagName: "ol",
        draggable: ".sa-container",
        droppable: ".sa-item",
    });

    registerBase(editor, NOTICE_TYPE, {
        name: "Aviso con Ícono",
        tagName: "div",
        draggable: ".sa-container",
    });

    registerTextType(editor, PARA_TYPE, {
        name: "Párrafo de Contenido",
        tagName: "p",
        draggable: ".sa-container",
    });

    registerTextType(editor, ITEM_TYPE, {
        name: "Ítem de Lista Numerada",
        tagName: "li",
        draggable: ".sa-list",
    });
}

function registerBlocks(editor) {
    const blocks = [
        {
            id: "notice-section-block",
            label: "Texto con Lista y Aviso",
            media: ICONS.section,
            content: `${buildSection()}${STYLES}`,
        },
        {
            id: "notice-section-para-block",
            label: "Párrafo de Contenido",
            media: ICONS.para,
            content: buildPara(),
        },
        {
            id: "notice-section-list-block",
            label: "Lista Numerada",
            media: ICONS.list,
            content: buildList(),
        },
        {
            id: "notice-section-item-block",
            label: "Ítem de Lista Numerada",
            media: ICONS.item,
            content: buildItem(),
        },
        {
            id: "notice-section-notice-block",
            label: "Aviso con Ícono",
            media: ICONS.notice,
            content: buildNotice(),
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerNoticeSectionCore(editor) {
    registerTypes(editor);
    registerIconType(editor);
    registerBlocks(editor);
}