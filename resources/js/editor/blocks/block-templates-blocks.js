import {
    COMPONENT_TYPE,
    applyConfig,
    decorate,
    esc,
    iconMedia,
    normalizeDefinition,
    readConfig,
    scriptOf,
} from "./block-templates/core";
import { showBlockTemplateModal } from "./block-templates/modal";

const DEFINITIONS_URL =
    document.querySelector('meta[name="block-templates-url"]')?.content || "/api/block-templates/active";
const registry = new Map();

const matchesType = (el) => (el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE ? { type: COMPONENT_TYPE } : false);

function registerType(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: matchesType,
        model: {
            defaults: {
                name: "Plantilla personalizada",
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
                attributes: { "data-gjs-type": COMPONENT_TYPE },
                traits: [
                    "id",
                    {
                        type: "button",
                        label: false,
                        text: "Administrar plantilla",
                        full: true,
                        command: "open-block-template-config",
                    },
                ],
            },
        },
    });

    editor.Commands.add("open-block-template-config", {
        run(ed) {
            const selected = ed.getSelected();
            const def = selected && registry.get(selected.getAttributes()["data-bt"]);
            if (def) showBlockTemplateModal(ed, selected, def);
            else window.alert("Esta plantilla ya no está disponible o está desactivada.");
        },
    });
}

function registerBlock(editor, def) {
    const id = `bt-${def.slug}`;
    const blocks = editor.BlockManager;
    const managed = def.mode === "managed";

    if (blocks.get(id)) blocks.remove(id);

    blocks.add(id, {
        label: esc(def.name),
        category: { id: def.category, label: esc(def.category) },
        media: iconMedia(def.icon_svg),
        activate: managed,
        content: managed
            ? {
                  type: COMPONENT_TYPE,
                  attributes: { "data-gjs-type": COMPONENT_TYPE, "data-bt": def.slug },
                  script: scriptOf(def),
              }
            : `${def.html}${def.css ? `<style>${def.css}</style>` : ""}`,
    });
}

function syncComponent(editor, component) {
    if (component.__btBusy) return;
    const attrs = component.getAttributes();
    const def = registry.get(attrs["data-bt"]);
    if (!def) return;

    component.__btBusy = true;
    try {
        const outdated = !attrs["data-bt-uid"] || attrs["data-bt-version"] !== String(def.version);
        if (outdated) applyConfig(editor, component, def, readConfig(component));
        else decorate(component, def);
    } finally {
        component.__btBusy = false;
    }
}

async function loadDefinitions(editor) {
    try {
        const response = await fetch(DEFINITIONS_URL, {
            headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
            credentials: "same-origin",
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const payload = await response.json();
        registry.clear();

        (Array.isArray(payload) ? payload : []).forEach((raw) => {
            const def = normalizeDefinition(raw);
            if (!def) return;
            registry.set(def.slug, def);
            registerBlock(editor, def);
        });

        editor.DomComponents.getWrapper()
            ?.findType(COMPONENT_TYPE)
            .forEach((component) => syncComponent(editor, component));
    } catch (error) {
        console.error("[BlockTemplates] No se pudieron cargar las plantillas:", error);
    }
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE) return;
        setTimeout(() => syncComponent(editor, component), 0);
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

export function initializeBlockTemplatesBlock(editor) {
    registerType(editor);
    setupEditorEvents(editor);
    loadDefinitions(editor);
}