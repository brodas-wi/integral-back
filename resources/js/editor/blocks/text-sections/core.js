import {
    GROUP_TYPE,
    ICONS,
    ITEM_TYPE,
    LIST_TYPE,
    PARA_TYPE,
    SECTION_TYPE,
    STYLES,
    buildGroup,
    buildItem,
    buildList,
    buildPara,
    buildSection,
} from "./templates.js";

const CATEGORY = "Institucional";

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

function registerTypes(editor) {
    registerBase(editor, SECTION_TYPE, {
        name: "Secciones de Texto",
        tagName: "section",
    });

    registerBase(editor, GROUP_TYPE, {
        name: "Sección de Texto",
        tagName: "div",
        draggable: ".ts-groups",
    });

    registerTextType(editor, PARA_TYPE, {
        name: "Párrafo de Sección",
        tagName: "p",
        draggable: ".ts-body",
    });

    registerBase(editor, LIST_TYPE, {
        name: "Lista de Sección",
        tagName: "ul",
        draggable: ".ts-body",
        droppable: ".ts-item",
    });

    registerTextType(editor, ITEM_TYPE, {
        name: "Ítem de Lista",
        tagName: "li",
        draggable: ".ts-list",
    });
}

function registerBlocks(editor) {
    const blocks = [
        {
            id: "text-sections-block",
            label: "Secciones de Texto",
            media: ICONS.section,
            content: `${buildSection()}${STYLES}`,
        },
        {
            id: "text-sections-group-block",
            label: "Sección de Texto",
            media: ICONS.group,
            content: buildGroup(),
        },
        {
            id: "text-sections-para-block",
            label: "Párrafo de Sección",
            media: ICONS.para,
            content: buildPara(),
        },
        {
            id: "text-sections-bullets-block",
            label: "Lista con Viñetas",
            media: ICONS.bullets,
            content: buildList(false),
        },
        {
            id: "text-sections-numbered-block",
            label: "Lista Numerada",
            media: ICONS.numbered,
            content: buildList(true),
        },
        {
            id: "text-sections-item-block",
            label: "Ítem de Lista",
            media: ICONS.item,
            content: buildItem(),
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerTextSectionsCore(editor) {
    registerTypes(editor);
    registerBlocks(editor);
}