import {
    BADGE_TYPE,
    ICONS,
    SECTION_TYPE,
    STEP_TYPE,
    STYLES,
    buildBadge,
    buildSection,
    buildStep,
} from "./templates.js";

const CATEGORY = "Institucional";

function registerSection(editor) {
    editor.DomComponents.addType(SECTION_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === SECTION_TYPE ? { type: SECTION_TYPE } : false,
        model: {
            defaults: {
                name: "Paneles de Información",
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
}

function registerTextType(editor, type, defaults) {
    editor.DomComponents.addType(type, {
        extend: "text",
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === type ? { type } : false,
        model: {
            defaults: { ...defaults, attributes: { "data-gjs-type": type } },
        },
    });
}

function registerBlocks(editor) {
    const blocks = [
        {
            id: "info-panels-block",
            label: "Paneles de Información",
            media: ICONS.section,
            content: `${buildSection()}${STYLES}`,
        },
        {
            id: "info-panels-badge-block",
            label: "Badge de Información",
            media: ICONS.badge,
            content: buildBadge(),
        },
        {
            id: "info-panels-step-block",
            label: "Ítem Numerado",
            media: ICONS.step,
            content: buildStep(),
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerInfoPanelsCore(editor) {
    registerSection(editor);
    registerTextType(editor, BADGE_TYPE, { name: "Badge", tagName: "span", draggable: ".ip-badges" });
    registerTextType(editor, STEP_TYPE, { name: "Ítem Numerado", tagName: "li", draggable: ".ip-steps" });
    registerBlocks(editor);
}