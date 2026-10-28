import { COMPONENT_TYPE, DEFAULT_DATA, MAP_VERSION } from "./defaults";
import { showMapFilterModal } from "./modal";
import { MAP_SCRIPT } from "./script";
import {
    applyMapConfig,
    buildMapFilterContent,
    lockTree,
    readMapConfig,
} from "./template";

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <path d="M16 4c-4.4 0-8 3.6-8 8 0 6 8 16 8 16s8-10 8-16c0-4.4-3.6-8-8-8z" fill="#E97300"/>
    <circle cx="16" cy="12" r="3.2" fill="#ffffff"/>
    <rect x="3" y="26" width="26" height="2" rx="1" fill="#003B71" fill-opacity="0.3"/>
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
    "data-map-config": JSON.stringify(data),
    "data-map-version": MAP_VERSION,
});

export const mapFilterBlocks = [
    {
        id: "map-filter-block",
        label: "Mapa con Filtros",
        category: "Interactivos",
        media: BLOCK_ICON,
        content: { type: COMPONENT_TYPE },
    },
];

function registerType(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE
                ? { type: COMPONENT_TYPE }
                : false,

        model: {
            defaults: {
                name: "Mapa con Filtros",
                tagName: "section",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                stylable: false,
                resizable: false,
                layerable: true,
                highlightable: false,
                propagate: PROPAGATED,
                script: MAP_SCRIPT,
                attributes: initialAttributes(DEFAULT_DATA),
                components: buildMapFilterContent(DEFAULT_DATA),
                traits: [
                    "id",
                    {
                        type: "button",
                        label: false,
                        text: "Administrar Mapa",
                        full: true,
                        command: "open-map-filter-config",
                    },
                ],
            },
        },
    });

    editor.Commands.add("open-map-filter-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showMapFilterModal(ed, selected);
        },
    });
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE) return;
        if (component.getAttributes()["data-map-version"] === MAP_VERSION) {
            lockTree(component);
            return;
        }
        if (component.__mpMigrating) return;

        component.__mpMigrating = true;
        const config = readMapConfig(component);
        setTimeout(() => applyMapConfig(editor, component, config), 0);
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

export function initializeMapFilterBlocks(editor) {
    registerType(editor);
    setupEditorEvents(editor);
}