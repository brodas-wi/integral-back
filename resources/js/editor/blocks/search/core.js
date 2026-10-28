import { SEARCH_SCRIPT } from "./script.js";
import { CSS, ICONS, SECTION_TYPE, STYLES, VERSION, buildInner, buildSection } from "./templates.js";

const CATEGORY = "Interactivos";
const CANVAS_STYLE_ID = "srch-canvas-style";
const CANVAS_CSS =
    ".srch-container,.srch-panel{pointer-events:none;}.srch-title{pointer-events:auto;}";
const LIMIT_OPTIONS = ["4", "6", "8", "12"].map((value) => ({ id: value, value, name: value }));

function registerSection(editor) {
    editor.DomComponents.addType(SECTION_TYPE, {
        isComponent: (el) =>
            el.classList?.contains("srch-section") ? { type: SECTION_TYPE } : false,
        model: {
            defaults: {
                name: "Buscador",
                tagName: "section",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                script: SEARCH_SCRIPT,
                traits: [
                    "id",
                    { type: "text", name: "data-srch-placeholder", label: "Texto del buscador" },
                    {
                        type: "select",
                        name: "data-srch-limit",
                        label: "Resultados por tanda",
                        options: LIMIT_OPTIONS,
                    },
                    { type: "text", name: "data-srch-endpoint", label: "Ruta de búsqueda" },
                ],
            },
            init() {
                this.on("change:attributes:data-srch-placeholder", this.syncPlaceholder);
            },
            syncPlaceholder() {
                const value = this.getAttributes()["data-srch-placeholder"] || "";
                const input = this.find(".srch-input")[0];
                if (input) input.addAttributes({ placeholder: value });
            },
        },
    });
}

function registerBlock(editor) {
    editor.BlockManager.add("search-block", {
        label: "Buscador",
        media: ICONS.section,
        category: CATEGORY,
        activate: true,
        content: `${buildSection()}${STYLES}`,
    });
}

function removeRules(editor) {
    const rules = editor.Css.getAll().filter((rule) => rule.selectorsToString().includes(".srch-"));
    editor.Css.remove(rules);
}

function applyConfig(editor, component) {
    const attrs = component.getAttributes();
    const title = component.find(".srch-title")[0];

    const config = {
        titleHtml: title ? title.getInnerHTML() : undefined,
        placeholder: attrs["data-srch-placeholder"],
        limit: attrs["data-srch-limit"],
        endpoint: attrs["data-srch-endpoint"],
    };

    component.addAttributes({ "data-srch-version": String(VERSION) });
    component.components(buildInner(config));
}

function migrate(editor) {
    const outdated = editor
        .getWrapper()
        .find(".srch-section")
        .filter((component) => component.getAttributes()["data-srch-version"] !== String(VERSION));

    if (!outdated.length) return;

    removeRules(editor);
    editor.Css.addRules(CSS);
    outdated.forEach((component) => applyConfig(editor, component));
}

function injectCanvasStyle(editor) {
    const doc = editor.Canvas.getDocument();
    if (!doc || doc.getElementById(CANVAS_STYLE_ID)) return;
    const style = doc.createElement("style");
    style.id = CANVAS_STYLE_ID;
    style.textContent = CANVAS_CSS;
    doc.head.appendChild(style);
}

export function registerSearchCore(editor) {
    registerSection(editor);
    registerBlock(editor);

    editor.on("load", () => {
        injectCanvasStyle(editor);
        migrate(editor);
    });
    editor.on("canvas:frame:load", () => injectCanvasStyle(editor));
}