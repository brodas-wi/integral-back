import { openMediaPicker } from "@/editor/media-picker";
import {
    FILE_TYPE,
    ICONS,
    ITEM_TYPE,
    SECTION_TYPE,
    STYLES,
    buildFile,
    buildItem,
    buildSection,
    escapeHtml,
} from "./templates.js";

const CATEGORY = "Documentos";
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;

const BASE_DEFAULTS = {
    draggable: true,
    droppable: false,
    removable: true,
    copyable: true,
    selectable: true,
    hoverable: true,
    editable: false,
    highlightable: false,
};

function isSafeHref(value) {
    const url = String(value ?? "").trim();
    return !SCHEME.test(url) || /^https?:/i.test(url);
}

function formatSize(size) {
    if (typeof size === "number" && size > 0) {
        return size >= 1048576
            ? `${(size / 1048576).toFixed(2)} MB`
            : `${Math.max(1, Math.round(size / 1024))} KB`;
    }
    return typeof size === "string" ? size.trim() : "";
}

function mediaName(media) {
    const direct = media.filename || media.name;
    if (direct) return direct;
    const last = String(media.url || "").split("?")[0].split("/").pop();
    try {
        return decodeURIComponent(last);
    } catch {
        return last;
    }
}

function registerType(editor, type, defaults, methods = {}) {
    editor.DomComponents.addType(type, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === type ? { type } : false,
        model: {
            defaults: { ...BASE_DEFAULTS, ...defaults },
            ...methods,
        },
    });
}

function registerTypes(editor) {
    registerType(editor, SECTION_TYPE, {
        name: "Descargas de Documentos",
        tagName: "section",
    });

    registerType(editor, ITEM_TYPE, {
        name: "Ítem de Descargas",
        tagName: "div",
        draggable: ".dl-groups",
    });

    registerType(
        editor,
        FILE_TYPE,
        {
            name: "Botón de Descarga",
            tagName: "a",
            draggable: ".dl-files",
            traits: [
                "id",
                { type: "text", name: "href", label: "Enlace (URL)" },
                {
                    type: "checkbox",
                    name: "target",
                    label: "Abrir en nueva pestaña",
                    valueTrue: "_blank",
                    valueFalse: "",
                },
                {
                    type: "button",
                    label: "Documento",
                    text: "Seleccionar documento",
                    full: true,
                    command: "select-dl-document",
                },
            ],
        },
        {
            init() {
                this.on("change:attributes:href", this.sanitizeHref);
                this.on("change:attributes:target", this.syncRel);
            },
            sanitizeHref() {
                if (!isSafeHref(this.getAttributes().href)) this.addAttributes({ href: "#" });
            },
            syncRel() {
                if (this.getAttributes().target === "_blank") {
                    this.addAttributes({ rel: "noopener noreferrer" });
                } else {
                    this.removeAttributes("rel");
                }
            },
        },
    );
}

function registerCommand(editor) {
    editor.Commands.add("select-dl-document", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected?.get("type") !== FILE_TYPE) return;

            openMediaPicker({
                type: "document",
                title: "Seleccionar documento",
                fullMedia: true,
                onSelect: (media) => {
                    if (!isSafeHref(media.url)) return;
                    selected.addAttributes({ href: media.url });
                    selected.find(".dl-file-name")[0]?.components(escapeHtml(mediaName(media)));
                    selected.find(".dl-file-size")[0]?.components(escapeHtml(formatSize(media.size)));
                },
            });
        },
    });
}

function registerBlocks(editor) {
    const blocks = [
        {
            id: "downloads-section-block",
            label: "Descargas de Documentos",
            media: ICONS.section,
            content: `${buildSection()}${STYLES}`,
        },
        {
            id: "downloads-item-block",
            label: "Ítem de Descargas",
            media: ICONS.item,
            content: buildItem(),
        },
        {
            id: "downloads-file-block",
            label: "Botón de Descarga",
            media: ICONS.file,
            content: buildFile(),
        },
    ];

    blocks.forEach(({ id, ...block }) =>
        editor.BlockManager.add(id, { ...block, category: CATEGORY, activate: true }),
    );
}

export function registerDownloadsCore(editor) {
    registerTypes(editor);
    registerCommand(editor);
    registerBlocks(editor);
}