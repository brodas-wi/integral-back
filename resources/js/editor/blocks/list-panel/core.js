import {
    ICONS,
    ITEM_TYPE,
    NOTE_TYPE,
    SECTION_TYPE,
    STYLES,
    buildItem,
    buildNote,
    buildSection,
} from "./templates.js";

const CATEGORY = "Institucional";

function registerSection(editor) {
    editor.DomComponents.addType(SECTION_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === SECTION_TYPE ? { type: SECTION_TYPE } : false,
        model: {
            defaults: {
                name: "Lista en Panel",
                tagName: "section",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: { "data-gjs-type": SECTION_TYPE },
            },
        },
    });
}

function registerTextType(editor, type, defaults) {
    editor.DomComponents.addType(type, {
        extend: "text",
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === type ? { type } : false,
        model: {
            defaults: { ...defaults, attributes: { "data-gjs-type": type } },
        },
    });
}

function registerBlocks(editor) {
    const blocks = [
        {
            id: "list-panel-block",
            label: "Lista en Panel",
            media: ICONS.section,
            content: `${buildSection()}${STYLES}`,
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerListPanelCore(editor) {
    registerSection(editor);
    registerTextType(editor, ITEM_TYPE, { name: "Ítem de Lista", tagName: "li", draggable: ".lp-list" });
    registerTextType(editor, NOTE_TYPE, { name: "Párrafo de Cierre", tagName: "p", draggable: ".lp-container" });
    registerBlocks(editor);
}