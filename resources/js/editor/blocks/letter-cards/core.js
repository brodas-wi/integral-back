import {
    CARD_TYPE,
    ICONS,
    SECTION_TYPE,
    STYLES,
    buildCard,
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

function registerType(editor, type, defaults) {
    editor.DomComponents.addType(type, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === type ? { type } : false,
        model: {
            defaults: { ...BASE_DEFAULTS, ...defaults },
        },
    });
}

function registerTypes(editor) {
    registerType(editor, SECTION_TYPE, {
        name: "Tarjetas con Letra",
        tagName: "section",
    });

    registerType(editor, CARD_TYPE, {
        name: "Tarjeta con Letra",
        tagName: "div",
        draggable: ".lc-grid",
        droppable: ".lc-card-head,.lc-card-desc",
    });
}

function registerBlocks(editor) {
    const blocks = [
        {
            id: "letter-cards-block",
            label: "Tarjetas con Letra",
            media: ICONS.section,
            content: `${buildSection()}${STYLES}`,
        },
        {
            id: "letter-cards-card-block",
            label: "Tarjeta con Letra",
            media: ICONS.card,
            content: buildCard(),
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerLetterCardsCore(editor) {
    registerTypes(editor);
    registerBlocks(editor);
}