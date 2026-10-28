import { COMPONENT_TYPE, DEFAULT_DATA, HERO_VIDEO_VERSION } from "./defaults";
import { showHeroVideoModal } from "./modal";
import { HERO_VIDEO_SCRIPT } from "./script";
import {
    applyHeroVideoConfig,
    buildHeroVideoContent,
    lockTree,
    pauseCanvasVideo,
    readHeroVideoConfig,
} from "./template";

const BLOCK_NAME = "Banner con Video de Fondo";

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#E97300" rx="2"/>
    <path d="M13 12 L13 19 L19.5 15.5 Z" fill="#ffffff"/>
    <rect x="4" y="23" width="14" height="2" rx="1" fill="#ffffff"/>
    <rect x="4" y="27" width="8" height="1.5" rx="0.75" fill="#ffffff" fill-opacity="0.75"/>
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
    class: "hv-section",
    "data-hero-video-config": JSON.stringify(data),
    "data-hero-video-version": HERO_VIDEO_VERSION,
});

function registerType(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE
                ? { type: COMPONENT_TYPE }
                : false,

        model: {
            defaults: {
                name: BLOCK_NAME,
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
                script: HERO_VIDEO_SCRIPT,
                attributes: initialAttributes(DEFAULT_DATA),
                components: buildHeroVideoContent(DEFAULT_DATA),
                traits: [
                    "id",
                    {
                        type: "button",
                        label: false,
                        text: "Administrar Banner",
                        full: true,
                        command: "open-hero-video-config",
                    },
                ],
            },
        },
    });

    editor.Commands.add("open-hero-video-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showHeroVideoModal(ed, selected);
        },
    });

    editor.BlockManager.add("hero-video-block", {
        label: BLOCK_NAME,
        category: "Heroes",
        media: BLOCK_ICON,
        activate: true,
        content: { type: COMPONENT_TYPE },
    });
}

function pauseAll(editor) {
    editor
        .getWrapper()
        ?.find(`[data-gjs-type="${COMPONENT_TYPE}"]`)
        .forEach(pauseCanvasVideo);
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE) return;

        if (component.getAttributes()["data-hero-video-version"] === HERO_VIDEO_VERSION) {
            lockTree(component);
            setTimeout(() => pauseCanvasVideo(component), 50);
            return;
        }
        if (component.__hvMigrating) return;

        component.__hvMigrating = true;
        const config = readHeroVideoConfig(component);
        setTimeout(() => applyHeroVideoConfig(editor, component, config), 0);
    });

    const injectCanvasStyles = () => {
        const doc = editor.Canvas.getFrameEl()?.contentDocument;
        const styleId = `${COMPONENT_TYPE}-editor-css`;
        if (!doc?.head || doc.getElementById(styleId)) return;
        const style = doc.createElement("style");
        style.id = styleId;
        style.textContent = `[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;user-select:none !important;}[data-gjs-type="${COMPONENT_TYPE}"] .hv-video{display:none !important;}`;
        doc.head.appendChild(style);
    };

    editor.on("load", () => {
        injectCanvasStyles();
        setTimeout(() => pauseAll(editor), 100);
    });
    editor.on("canvas:frame:load", () => {
        injectCanvasStyles();
        setTimeout(() => pauseAll(editor), 100);
    });
    editor.on("storage:end:load", () => setTimeout(() => pauseAll(editor), 400));
}

export function initializeHeroVideoBlock(editor) {
    registerType(editor);
    setupEditorEvents(editor);
}