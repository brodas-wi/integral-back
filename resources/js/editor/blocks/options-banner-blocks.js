import { COMPONENT_TYPE, DEFAULT_DATA, VERSION, applyConfig, buildContent, readConfig } from "./options-banner/core";
import { showOptionsBannerModal } from "./options-banner/modal";

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#E97300" rx="2"/>
    <rect x="3" y="4" width="12" height="8" rx="1.5" fill="#fff"/>
    <rect x="17" y="4" width="12" height="8" rx="1.5" fill="#fff" fill-opacity="0.7"/>
    <rect x="3" y="14" width="12" height="8" rx="1.5" fill="#fff" fill-opacity="0.7"/>
    <rect x="17" y="14" width="12" height="8" rx="1.5" fill="#fff" fill-opacity="0.4"/>
</svg>`;

const PROPAGATED = ["editable", "selectable", "hoverable", "droppable", "highlightable", "stylable", "resizable"];

const initialAttributes = () => ({
    "data-gjs-type": COMPONENT_TYPE,
    "data-options-banner-config": JSON.stringify(DEFAULT_DATA),
    "data-options-banner-version": VERSION,
});

function registerType(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE ? { type: COMPONENT_TYPE } : false,

        model: {
            defaults: {
                name: "Banner de Opciones",
                tagName: "div",
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
                components: buildContent(DEFAULT_DATA),
                traits: [
                    "id",
                    {
                        type: "button",
                        label: false,
                        text: "Administrar Banner",
                        full: true,
                        command: "open-options-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", COMPONENT_TYPE);
                this.addAttributes({ "data-gjs-type": COMPONENT_TYPE });
            },
        },
    });

    editor.Commands.add("open-options-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showOptionsBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("options-banner-block", {
        label: "Banner de Opciones",
        category: "Banners",
        media: BLOCK_ICON,
        activate: true,
        content: { type: COMPONENT_TYPE, attributes: initialAttributes() },
    });
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE || component.__obMigrating) return;
        if (component.getAttributes()["data-options-banner-version"] === VERSION) return;

        const config = readConfig(component);
        if (!config) return;

        component.__obMigrating = true;
        setTimeout(() => applyConfig(editor, component, config), 0);
    });

    editor.on("load", () => {
        const doc = editor.Canvas.getFrameEl()?.contentDocument;
        const styleId = `${COMPONENT_TYPE}-editor-css`;
        if (!doc?.head || doc.getElementById(styleId)) return;
        const style = doc.createElement("style");
        style.id = styleId;
        style.textContent = `[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;}`;
        doc.head.appendChild(style);
    });
}

export function initializeOptionsBannerBlock(editor) {
    registerType(editor);
    setupEditorEvents(editor);
}