import { ICON, SECTION_TYPE, STYLES, buildSection } from "./templates.js";

const CATEGORY = "Institucional";

export function registerTitleSectionCore(editor) {
    editor.DomComponents.addType(SECTION_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === SECTION_TYPE ? { type: SECTION_TYPE } : false,
        model: {
            defaults: {
                name: "Título con Párrafo y Línea",
                tagName: "section",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: { "data-gjs-type": SECTION_TYPE },
            },
        },
    });

    editor.BlockManager.add("title-section-block", {
        label: "Título con Párrafo y Línea",
        category: CATEGORY,
        media: ICON,
        activate: true,
        content: `${buildSection()}${STYLES}`,
    });
}