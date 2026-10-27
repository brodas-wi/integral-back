import { ICON, SECTION_TYPE, STYLES, buildSection } from "./templates.js";

const CATEGORY = "Institucional";

export function registerHighlightBoxCore(editor) {
    editor.DomComponents.addType(SECTION_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === SECTION_TYPE ? { type: SECTION_TYPE } : false,
        model: {
            defaults: {
                name: "Destacado con Texto",
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

    editor.BlockManager.add("highlight-box-block", {
        label: "Destacado con Texto",
        category: CATEGORY,
        media: ICON,
        activate: true,
        content: `${buildSection()}${STYLES}`,
    });
}