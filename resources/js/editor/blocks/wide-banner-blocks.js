import { COMPONENT_TYPE, DEFAULT_DATA, VERSION, VIDEO_TYPE, applyConfig, buildContent, readConfig } from "./wide-banner/core";
import { showWideBannerModal } from "./wide-banner/modal";

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
    <rect x="2" y="11" width="28" height="10" rx="1" fill="none" stroke="#E97300" stroke-width="1"/>
    <path d="M12 14.5 L19 16.5 L12 18.5 Z" fill="#E97300"/>
    <rect x="4" y="23.5" width="24" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.85"/>
</svg>`;

const PROPAGATED = ["editable", "selectable", "hoverable", "droppable", "highlightable", "stylable", "resizable"];

const matches = (type) => (el) => (el.getAttribute?.("data-gjs-type") === type ? { type } : false);

const initialAttributes = () => ({
    "data-gjs-type": COMPONENT_TYPE,
    "data-wide-banner-config": JSON.stringify(DEFAULT_DATA),
    "data-wide-banner-version": VERSION,
});

function registerTypes(editor) {
    editor.DomComponents.addType(VIDEO_TYPE, {
        isComponent: matches(VIDEO_TYPE),
        model: {
            defaults: {
                tagName: "video",
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                selectable: false,
                hoverable: false,
                editable: false,
                highlightable: false,
                traits: [],
            },
        },
    });

    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: matches(COMPONENT_TYPE),
        model: {
            defaults: {
                name: "Banner Ancho con Video",
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
                    { type: "button", label: false, text: "Administrar Banner", full: true, command: "open-wide-banner-config" },
                ],
            },

            init() {
                this.set("type", COMPONENT_TYPE);
                this.addAttributes({ "data-gjs-type": COMPONENT_TYPE });
            },
        },
    });

    editor.Commands.add("open-wide-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showWideBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("wide-banner-block", {
        label: "Banner Ancho con Video",
        category: "Banners",
        media: BLOCK_ICON,
        activate: true,
        content: { type: COMPONENT_TYPE, attributes: initialAttributes() },
    });
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE || component.__wbMigrating) return;
        if (component.getAttributes()["data-wide-banner-version"] === VERSION) return;

        const config = readConfig(component);
        if (!config) return;

        component.__wbMigrating = true;
        setTimeout(() => applyConfig(editor, component, config), 0);
    });

    editor.on("load", () => {
        const doc = editor.Canvas.getFrameEl()?.contentDocument;
        const styleId = `${COMPONENT_TYPE}-editor-css`;
        if (!doc?.head || doc.getElementById(styleId)) return;
        const style = doc.createElement("style");
        style.id = styleId;
        style.textContent = `[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;}[data-gjs-type="${COMPONENT_TYPE}"] video{display:none !important;}`;
        doc.head.appendChild(style);
    });
}

export function initializeWideBannerBlock(editor) {
    registerTypes(editor);
    setupEditorEvents(editor);
}