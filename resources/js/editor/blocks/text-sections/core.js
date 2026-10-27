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
    });

    registerTextType(editor, PARA_TYPE, {
        name: "Párrafo de Sección",
        tagName: "p",
    });

    registerBase(editor, LIST_TYPE, {
        name: "Lista de Sección",
        tagName: "ul",
        droppable: true,
    });

    registerTextType(editor, ITEM_TYPE, {
        name: "Ítem de Lista",
        tagName: "li",
    });
}

const LEGACY_CLASS = /^ts-(section|container|groups|group|title-col|title|line|body|para|list|item)$/;
const DROP_CLASS = /^ts-(container|groups|title-col|body|list)$/;
const FREE = {
    draggable: true,
    removable: true,
    copyable: true,
    selectable: true,
    hoverable: true,
    layerable: true,
};

function releaseLegacy(component) {
    const classes = (component.getClasses?.() ?? []).map(String);
    if (!classes.some((name) => LEGACY_CLASS.test(name))) return;
    const droppable = classes.some((name) => DROP_CLASS.test(name));
    component.set(droppable ? { ...FREE, droppable: true } : FREE, { silent: true });
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
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerTextSectionsCore(editor) {
    registerTypes(editor);
    registerBlocks(editor);
    editor.on("component:mount", releaseLegacy);
}