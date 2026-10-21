import { COMPONENT_TYPE, DEFAULT_DATA, NAVBAR_VERSION } from "./navbar-defaults";
import { NAVBAR_STYLES } from "./navbar-styles";
import { applyNavbarConfig, buildNavbarHTML, readNavbarConfig } from "./navbar-template";
import { NAVBAR_COMPONENT_SCRIPT, NAVBAR_RUNTIME_SCRIPT } from "./navbar-runtime";
import { showNavbarModal } from "./navbar-modal";

export { NAVBAR_RUNTIME_SCRIPT };

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
<rect width="32" height="32" fill="#003B71" rx="2"/>
<rect x="2" y="4" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
<rect x="12" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
<rect x="17" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
<rect x="22" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
<rect x="24" y="3" width="6" height="5" rx="2.5" fill="#E97300"/>
<rect x="2" y="15" width="4" height="1.5" rx="0.75" fill="#E97300"/>
<rect x="8" y="15" width="4" height="1.5" rx="0.75" fill="#E97300"/>
<rect x="14" y="15" width="5" height="1.5" rx="0.75" fill="#E97300"/>
<rect x="21" y="15" width="5" height="1.5" rx="0.75" fill="#E97300"/>
<rect x="24" y="13" width="6" height="5" rx="2.5" fill="#E97300"/>
</svg>`;

function ensureRuntimeInCanvas(editor) {
    const doc = editor.Canvas.getFrameEl()?.contentDocument;
    if (!doc || !doc.head) return;
    const script = doc.createElement("script");
    script.textContent = NAVBAR_RUNTIME_SCRIPT;
    doc.head.appendChild(script);
    script.remove();
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE) return;

        setTimeout(() => ensureRuntimeInCanvas(editor), 400);

        if (component.__nbMigrating) return;
        if (component.getAttributes()["data-navbar-version"] === NAVBAR_VERSION) return;

        const config = readNavbarConfig(component);
        if (!config) return;

        component.__nbMigrating = true;
        setTimeout(() => applyNavbarConfig(editor, component, config), 0);
    });

    editor.on("load", () => {
        const doc = editor.Canvas.getFrameEl()?.contentDocument;
        if (!doc || !doc.head) return;
        doc.documentElement.setAttribute("data-gjs-canvas", "true");
        if (doc.getElementById("navbar-component-css")) return;
        const style = doc.createElement("style");
        style.id = "navbar-component-css";
        style.textContent = `[data-gjs-type="${COMPONENT_TYPE}"]{position:relative !important;top:auto !important;}[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;}body{padding-top:0 !important;}`;
        doc.head.appendChild(style);
    });
}

export function initializeNavbarBlock(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE ? { type: COMPONENT_TYPE } : false,

        model: {
            defaults: {
                name: "Navbar",
                tagName: "nav",
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
                propagate: [
                    "editable",
                    "selectable",
                    "hoverable",
                    "droppable",
                    "highlightable",
                    "stylable",
                    "resizable",
                ],
                attributes: {
                    "data-gjs-type": COMPONENT_TYPE,
                    class: "nb-wrapper",
                    "data-navbar-config": JSON.stringify(DEFAULT_DATA),
                    "data-navbar-version": NAVBAR_VERSION,
                },
                components: buildNavbarHTML(DEFAULT_DATA) + NAVBAR_STYLES,
                script: NAVBAR_COMPONENT_SCRIPT,
                traits: [
                    {
                        type: "button",
                        label: false,
                        text: "Administrar Navbar",
                        full: true,
                        command: "open-navbar-config",
                    },
                ],
            },
        },
    });

    editor.Commands.add("open-navbar-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showNavbarModal(ed, selected);
        },
    });

    editor.BlockManager.add("navbar-block", {
        label: "Navbar",
        category: "Navbar",
        media: BLOCK_ICON,
        activate: true,
        content: {
            type: COMPONENT_TYPE,
            attributes: { "data-gjs-type": COMPONENT_TYPE },
        },
    });

    setupEditorEvents(editor);
}