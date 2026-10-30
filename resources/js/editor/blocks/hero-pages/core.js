import { COMPONENT_TYPE, DEFAULT_DATA, HERO_PAGES_VERSION } from "./defaults";
import { showHeroPagesModal } from "./modal";
import {
    applyHeroPagesConfig,
    buildHeroPagesContent,
    lockTree,
    readHeroPagesConfig,
} from "./template";

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="11" y="3" width="10" height="2.4" rx="1.2" fill="#E97300"/>
    <rect x="8" y="7" width="16" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.5"/>
    ${[5.75, 13.25, 20.75]
        .map(
            (x) => `<rect x="${x}" y="11" width="5.5" height="18" rx="1.5" fill="#e0e7ef"/>
    <rect x="${x + 0.75}" y="12.5" width="3.5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="${x + 0.75}" y="22.5" width="4" height="4.5" rx="0.8" fill="#003B71" fill-opacity="0.75"/>`,
        )
        .join("\n    ")}
    <circle cx="2.5" cy="20" r="2" fill="#E97300"/>
    <circle cx="29.5" cy="20" r="2" fill="#E97300"/>
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
    class: "hp-section",
    "data-hero-pages-config": JSON.stringify(data),
    "data-hero-pages-version": HERO_PAGES_VERSION,
});

function registerType(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE
                ? { type: COMPONENT_TYPE }
                : false,

        model: {
            defaults: {
                name: "Sección: carrusel de tarjetas",
                tagName: "section",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                stylable: false,
                resizable: false,
                layerable: true,
                propagate: PROPAGATED,
                attributes: initialAttributes(DEFAULT_DATA),
                components: buildHeroPagesContent(DEFAULT_DATA),
                traits: [
                    "id",
                    {
                        type: "button",
                        label: false,
                        text: "Administrar Tarjetas",
                        full: true,
                        command: "open-hero-pages-config",
                    },
                ],
            },
        },
    });

    editor.Commands.add("open-hero-pages-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showHeroPagesModal(ed, selected);
        },
    });

    editor.BlockManager.add("hero-pages-block", {
        label: "Sección: carrusel de tarjetas",
        category: "Productos y Servicios",
        media: BLOCK_ICON,
        activate: true,
        content: { type: COMPONENT_TYPE },
    });
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE) return;

        if (component.getAttributes()["data-hero-pages-version"] === HERO_PAGES_VERSION) {
            lockTree(component);
            return;
        }
        if (component.__hpMigrating) return;

        component.__hpMigrating = true;
        const config = readHeroPagesConfig(component);
        setTimeout(() => applyHeroPagesConfig(editor, component, config), 0);
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

export function initializeHeroPagesBlock(editor) {
    registerType(editor);
    setupEditorEvents(editor);
}