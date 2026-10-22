import { COMPONENT_TYPE, DEFAULT_DATA, FOOTER_VERSION } from "./defaults";
import { applyFooterConfig, buildFooterContent, readFooterConfig } from "./template";
import { showFooterModal } from "./modal";

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="6" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
    <rect x="12" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
    <rect x="12" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="12" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="19" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
    <rect x="19" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="19" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
    <rect x="0" y="26" width="32" height="6" fill="#E97300"/>
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

const initialAttributes = () => ({
    "data-gjs-type": COMPONENT_TYPE,
    class: "ft-wrapper",
    "data-footer-config": JSON.stringify(DEFAULT_DATA),
    "data-footer-version": FOOTER_VERSION,
});

function registerType(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE
                ? { type: COMPONENT_TYPE }
                : false,

        model: {
            defaults: {
                name: "Footer",
                tagName: "footer",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                stylable: false,
                resizable: false,
                layerable: true,
                propagate: PROPAGATED,
                attributes: initialAttributes(),
                components: buildFooterContent(DEFAULT_DATA),
                traits: [
                    {
                        type: "button",
                        label: false,
                        text: "Administrar Footer",
                        full: true,
                        command: "open-footer-config",
                    },
                ],
            },
        },
    });
}

function registerCommandsAndBlock(editor) {
    editor.Commands.add("open-footer-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showFooterModal(ed, selected);
        },
    });

    editor.Commands.add("insert-default-footer", {
        run(ed) {
            ed.DomComponents.clear();
            ed.addComponents({ type: COMPONENT_TYPE });
        },
    });

    editor.BlockManager.add("footer-block", {
        label: "Footer",
        category: "Footer",
        media: BLOCK_ICON,
        activate: true,
        content: { type: COMPONENT_TYPE, attributes: initialAttributes() },
    });
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE || component.__ftMigrating) return;
        if (component.getAttributes()["data-footer-version"] === FOOTER_VERSION) return;

        const config = readFooterConfig(component);
        if (!config) return;

        component.__ftMigrating = true;
        setTimeout(() => applyFooterConfig(editor, component, config), 0);
    });

    editor.on("load", () => {
        const doc = editor.Canvas.getFrameEl()?.contentDocument;
        const styleId = `${COMPONENT_TYPE}-editor-css`;
        if (!doc?.head || doc.getElementById(styleId)) return;
        const style = doc.createElement("style");
        style.id = styleId;
        style.textContent = `[data-gjs-type="${COMPONENT_TYPE}"]{outline:2px dashed rgba(240,135,42,0.4);outline-offset:2px;}[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;}`;
        doc.head.appendChild(style);
    });
}

export function initializeFooterBlock(editor) {
    registerType(editor);
    registerCommandsAndBlock(editor);
    setupEditorEvents(editor);
}