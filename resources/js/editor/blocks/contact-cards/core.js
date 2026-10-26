import { openMediaPicker } from "@/editor/media-picker";
import {
    CARD_TYPE,
    ICONS,
    ICON_TYPE,
    SECTION_TYPE,
    STYLES,
    buildCard,
    buildSection,
} from "./templates.js";

const CATEGORY = "Contenido";
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;

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

function isSafeUrl(value) {
    const url = String(value ?? "").trim();
    return Boolean(url) && (!SCHEME.test(url) || /^https?:/i.test(url));
}

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

    registerType(editor, ICON_TYPE, {
        name: "Icono de Tarjeta",
        tagName: "img",
        void: true,
        draggable: false,
        removable: false,
        copyable: false,
        traits: [
            "id",
            { type: "text", name: "alt", label: "Texto alternativo" },
            {
                type: "button",
                label: "Imagen",
                text: "Seleccionar icono",
                full: true,
                command: "select-cc-icon",
            },
        ],
    });
}

function registerCommand(editor) {
    editor.Commands.add("select-cc-icon", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected?.get("type") !== ICON_TYPE) return;

            openMediaPicker({
                type: "image",
                title: "Seleccionar icono de tarjeta",
                onSelect: (url) => {
                    if (isSafeUrl(url)) selected.addAttributes({ src: url });
                },
            });
        },
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
    registerCommand(editor);
    registerBlocks(editor);
}