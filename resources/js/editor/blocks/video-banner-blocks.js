import {
    BANNER_VERSION,
    COMPONENT_TYPE,
    DEFAULT_DATA,
    VIDEO_TYPE,
} from "./video-banner/defaults";
import { BANNER_STYLES } from "./video-banner/styles";
import {
    applyVideoBannerConfig,
    buildVideoBannerHTML,
    readVideoBannerConfig,
} from "./video-banner/template";
import { showVideoBannerModal } from "./video-banner/modal";

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#ffffff" rx="2"/>
    <rect x="3" y="3" width="26" height="26" rx="3" fill="#E97300"/>
    <path d="M13 11 L13 21 L22 16 Z" fill="#ffffff"/>
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

const matchesType = (type) => (el) =>
    el.getAttribute?.("data-gjs-type") === type ? { type } : false;

const initialAttributes = () => ({
    "data-gjs-type": COMPONENT_TYPE,
    "data-video-banner-config": JSON.stringify(DEFAULT_DATA),
    "data-video-banner-version": BANNER_VERSION,
});

function registerTypes(editor) {
    editor.DomComponents.addType(VIDEO_TYPE, {
        isComponent: matchesType(VIDEO_TYPE),
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
        isComponent: matchesType(COMPONENT_TYPE),
        model: {
            defaults: {
                name: "Banner con Video",
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
                components: buildVideoBannerHTML(DEFAULT_DATA) + BANNER_STYLES,
                traits: [
                    "id",
                    {
                        type: "button",
                        label: false,
                        text: "Administrar Banner",
                        full: true,
                        command: "open-video-banner-config",
                    },
                ],
            },
        },
    });
}

function registerCommandAndBlock(editor) {
    editor.Commands.add("open-video-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showVideoBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("video-banner-block", {
        label: "Hero Video",
        category: "Heroes",
        media: BLOCK_ICON,
        activate: true,
        content: { type: COMPONENT_TYPE, attributes: initialAttributes() },
    });
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE || component.__vbMigrating) return;
        if (component.getAttributes()["data-video-banner-version"] === BANNER_VERSION) return;

        const config = readVideoBannerConfig(component);
        if (!config) return;

        component.__vbMigrating = true;
        setTimeout(() => applyVideoBannerConfig(editor, component, config), 0);
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

export function initializeVideoBannerBlock(editor) {
    registerTypes(editor);
    registerCommandAndBlock(editor);
    setupEditorEvents(editor);
}