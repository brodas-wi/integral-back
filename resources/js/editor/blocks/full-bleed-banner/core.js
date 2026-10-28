import { COMPONENT_TYPE, DEFAULT_DATA, FULL_BLEED_VERSION } from "./defaults";
import { showFullBleedModal } from "./modal";
import {
    applyFullBleedConfig,
    buildFullBleedContent,
    lockTree,
    readFullBleedConfig,
} from "./template";

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
    <rect x="2" y="8" width="28" height="16" fill="none" stroke="#E97300" stroke-width="1"/>
    <rect x="5" y="17" width="12" height="2" rx="1" fill="#ffffff"/>
    <rect x="5" y="20.5" width="8" height="2" rx="1" fill="#E97300"/>
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
    class: "fb-section",
    "data-full-bleed-config": JSON.stringify(data),
    "data-full-bleed-version": FULL_BLEED_VERSION,
});

function registerType(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE
                ? { type: COMPONENT_TYPE }
                : false,

        model: {
            defaults: {
                name: "Banner Completo",
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
                components: buildFullBleedContent(DEFAULT_DATA),
                traits: [
                    "id",
                    {
                        type: "button",
                        label: false,
                        text: "Administrar Banner",
                        full: true,
                        command: "open-full-bleed-banner-config",
                    },
                ],
            },
        },
    });

    editor.Commands.add("open-full-bleed-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showFullBleedModal(ed, selected);
        },
    });

    editor.BlockManager.add("full-bleed-banner-block", {
        label: "Banner Completo",
        category: "Banners",
        media: BLOCK_ICON,
        activate: true,
        content: { type: COMPONENT_TYPE },
    });
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE) return;
        if (component.getAttributes()["data-full-bleed-version"] === FULL_BLEED_VERSION) {
            lockTree(component);
            return;
        }
        if (component.__fbMigrating) return;

        component.__fbMigrating = true;
        const config = readFullBleedConfig(component);
        setTimeout(() => applyFullBleedConfig(editor, component, config), 0);
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

export function initializeFullBleedBannerBlock(editor) {
    registerType(editor);
    setupEditorEvents(editor);
}