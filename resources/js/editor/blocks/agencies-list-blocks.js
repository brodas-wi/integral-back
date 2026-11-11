import {
    AGENCIES_LIST_VERSION,
    BLOCK_ICON,
    COMPONENT_TYPE,
    INITIAL_CONTENT,
    PROPAGATED,
    ZONE_OPTIONS,
    createAgenciesScript,
} from "./agencies-list/core";

const initialAttributes = () => ({
    "data-gjs-type": COMPONENT_TYPE,
    "data-zone": "",
    "data-agencies-version": AGENCIES_LIST_VERSION,
    class: "ag-section",
});

function runScript(component) {
    const el = component.getEl();
    const script = component.get("script");
    if (el?.isConnected && typeof script === "function") script.call(el);
}

function scheduleRun(component, delay) {
    clearTimeout(component.__agTimer);
    component.__agTimer = setTimeout(() => runScript(component), delay);
}

function runAll(editor) {
    editor
        .getWrapper()
        .find(`[data-gjs-type="${COMPONENT_TYPE}"]`)
        .forEach((component) => scheduleRun(component, 0));
}

function setupEditorEvents(editor) {
    editor.on("component:mount", (component) => {
        if (component.get("type") !== COMPONENT_TYPE) return;

        const outdated =
            component.getAttributes()["data-agencies-version"] !== AGENCIES_LIST_VERSION;
        if (outdated && !component.__agMigrating) {
            component.__agMigrating = true;
            setTimeout(() => {
                component.addAttributes({ "data-agencies-version": AGENCIES_LIST_VERSION });
                component.components(INITIAL_CONTENT);
                scheduleRun(component, 100);
            }, 0);
            return;
        }

        scheduleRun(component, 500);
    });

    editor.on("load", () => {
        const doc = editor.Canvas.getFrameEl()?.contentDocument;
        const styleId = `${COMPONENT_TYPE}-editor-css`;
        if (doc?.head && !doc.getElementById(styleId)) {
            const style = doc.createElement("style");
            style.id = styleId;
            style.textContent = `[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;}[data-gjs-type="${COMPONENT_TYPE}"].gjs-selected,[data-gjs-type="${COMPONENT_TYPE}"].gjs-hovered{outline:2px dashed rgba(240,135,42,0.6) !important;outline-offset:2px;}`;
            doc.head.appendChild(style);
        }
        setTimeout(() => runAll(editor), 800);
    });
}

export function initializeAgenciesListBlock(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE ? { type: COMPONENT_TYPE } : false,

        model: {
            defaults: {
                name: "Listado de Agencias",
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
                attributes: initialAttributes(),
                components: INITIAL_CONTENT,
                script: createAgenciesScript(),
                traits: [
                    "id",
                    {
                        type: "select",
                        name: "data-zone",
                        label: "Zona a mostrar",
                        options: ZONE_OPTIONS,
                        changeProp: false,
                    },
                ],
            },

            init() {
                this.on("change:attributes", () => scheduleRun(this, 100));
            },
        },
    });

    editor.BlockManager.add("agencies-list-block", {
        label: "Listado de Agencias",
        category: "Interactivos",
        media: BLOCK_ICON,
        content: { type: COMPONENT_TYPE },
    });

    setupEditorEvents(editor);
}