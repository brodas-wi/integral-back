import {
    CARD_TYPE,
    ICONS,
    SECTION_TYPE,
    STYLES,
    buildCard,
    buildSection,
} from "./templates.js";

const CATEGORY = "Contacto";

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
        name: "Tarjetas de Contacto",
        tagName: "section",
    });

    registerType(editor, CARD_TYPE, {
        name: "Tarjeta de Contacto",
        tagName: "div",
        draggable: ".cc-grid",
    });
}

function registerBlocks(editor) {
    const blocks = [
        {
            id: "contact-cards-section-block",
            label: "Tarjetas de Contacto",
            media: ICONS.section,
            content: `${buildSection()}${STYLES}`,
        },
        {
            id: "contact-cards-card-block",
            label: "Tarjeta de Contacto",
            media: ICONS.card,
            content: buildCard(),
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerContactCardsCore(editor) {
    registerTypes(editor);
    registerBlocks(editor);
}