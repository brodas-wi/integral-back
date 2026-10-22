import {
    CARD_TABLE_VERSION,
    COMPONENT_TYPE,
    createDefaultData,
} from "./card-table/defaults";
import { showCardTableModal } from "./card-table/modal";
import {
    applyCardTableConfig,
    buildCardTableContent,
    lockTree,
    readCardTableConfig,
} from "./card-table/template";

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="10" height="2" rx="1" fill="#003B71"/>
    <rect x="14" y="3" width="8" height="2" rx="1" fill="#003B71"/>
    <rect x="24" y="3" width="6" height="2" rx="1" fill="#E97300"/>
    <rect x="2" y="9" width="28" height="6" rx="2" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.6"/>
    <line x1="13" y1="10" x2="13" y2="14" stroke="#003B71" stroke-width="0.8"/>
    <line x1="23" y1="10" x2="23" y2="14" stroke="#E97300" stroke-width="0.8"/>
    <rect x="2" y="17" width="28" height="6" rx="2" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.6"/>
    <line x1="13" y1="18" x2="13" y2="22" stroke="#003B71" stroke-width="0.8"/>
    <line x1="23" y1="18" x2="23" y2="22" stroke="#E97300" stroke-width="0.8"/>
</svg>`;

const PROPAGATED = [
    "editable",
    "selectable",
    "hoverable",
    "droppable",
    "highlightable",
    "stylable",
    "resizable",
];

const initialAttributes = (data) => ({
    "data-gjs-type": COMPONENT_TYPE,
    "data-card-table-config": JSON.stringify(data),
    "data-card-table-version": CARD_TABLE_VERSION,
});

export const cardTableBlocks = [
    {
        id: "card-table",
        label: "Tabla de tarjetas",
        category: "Interactivos",
        media: BLOCK_ICON,
        content: { type: COMPONENT_TYPE },
    },
];

function registerType(editor) {
    const defaults = createDefaultData(3, 5);

    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE
                ? { type: COMPONENT_TYPE }
                : false,

        model: {
            defaults: {
                name: "Tabla de tarjetas",
                tagName: "section",
                draggable: true,
                droppable: false,
                editable: false,
                stylable: false,
                resizable: false,
                selectable: true,
                hoverable: true,
                layerable: true,
                highlightable: false,
                copyable: true,
                removable: true,
                propagate: PROPAGATED,
                attributes: initialAttributes(defaults),
                components: buildCardTableContent(defaults),
                traits: [
                    {
                        type: "button",
                        label: false,
                        text: "Editar tabla",
                        full: true,
                        command: "open-card-table-config",
                    },
                ],
            },
        },
    });

    editor.Commands.add("open-card-table-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showCardTableModal(ed, selected);
        },
    });
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE) return;
        if (component.getAttributes()["data-card-table-version"] === CARD_TABLE_VERSION) {
            lockTree(component);
            return;
        }
        if (component.__ctMigrating) return;

        component.__ctMigrating = true;
        const config = readCardTableConfig(component);
        setTimeout(() => applyCardTableConfig(editor, component, config), 0);
    });

    const injectCanvasStyles = () => {
        const doc = editor.Canvas.getFrameEl()?.contentDocument;
        const styleId = `${COMPONENT_TYPE}-editor-css`;
        if (!doc?.head || doc.getElementById(styleId)) return;
        const style = doc.createElement("style");
        style.id = styleId;
        style.textContent = `[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;user-select:none !important;}`;
        doc.head.appendChild(style);
    };

    editor.on("load", injectCanvasStyles);
    editor.on("canvas:frame:load", injectCanvasStyles);
}

export function initializeCardTableBlocks(editor) {
    registerType(editor);
    setupEditorEvents(editor);
}