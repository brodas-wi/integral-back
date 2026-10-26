export const COMPONENT_TYPE = "downloads-component";
export const VERSION = 1;
export const CONFIG_ATTR = "data-downloads-config";
export const VERSION_ATTR = "data-downloads-version";
export const LAYOUTS = ["list", "accordion"];

const CSS_PREFIX = ".dl-";
const CANVAS_STYLE_ID = "dl-canvas-lock";
const CANVAS_CSS = `[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;}`;

export const DEFAULT_FILE = {
    name: "Nombre_del_documento.pdf",
    size: "0.00 MB",
    url: "",
    newTab: true,
};

export const DEFAULT_DATA = {
    title: "Documentos de interés",
    layout: "list",
    groups: [
        {
            title: "Directorio Oficinas de Gestión de Cobros",
            open: true,
            files: [
                {
                    name: "Directorio_Oficinas_de_Gestion_de_Cobros_Banco_Integral.pdf",
                    size: "0.12 MB",
                    url: "",
                    newTab: true,
                },
            ],
        },
        {
            title: "Principios de defensa del consumidor y prácticas de transparencia",
            open: true,
            files: [
                {
                    name: "2.2_Principios_de_defensa_del_consumidor_y_prácticas_de_transparencia_(2).pdf",
                    size: "1.56 MB",
                    url: "",
                    newTab: true,
                },
            ],
        },
    ],
};

const DL_CSS = `
.dl-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.dl-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.dl-head{margin-bottom:1.5rem;}
.dl-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.5rem,3vw,2rem);line-height:1.2;}
.dl-line{height:2px;margin-top:1rem;background-color:#E97300;}
.dl-groups{display:flex;flex-direction:column;gap:clamp(1.25rem,2.5vw,1.75rem);}
.dl-group{display:flex;flex-direction:column;gap:0.875rem;}
.dl-subtitle{margin:0;color:#003B71;font-weight:600;font-size:clamp(0.9375rem,1.4vw,1.0625rem);line-height:1.4;}
.dl-files{display:flex;flex-direction:column;gap:1rem;}
.dl-file{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;box-sizing:border-box;padding-top:1rem;padding-right:1.5rem;padding-bottom:1rem;padding-left:1.5rem;border-radius:0.75rem;background-color:#fff;box-shadow:0 4px 16px rgba(0,59,113,0.1);text-decoration:none;transition:box-shadow 0.2s ease;}
.dl-file:hover,.dl-file:focus-visible{box-shadow:0 8px 26px rgba(0,59,113,0.18);}
.dl-file:focus-visible{outline:2px solid #E97300;outline-offset:2px;}
.dl-file-info{display:flex;align-items:baseline;gap:0.5rem;flex:1;min-width:0;}
.dl-file-icon{align-self:center;flex-shrink:0;margin-right:0.75rem;font-size:1.5rem;line-height:1;color:#E97300;}
.dl-file-name{min-width:0;overflow:hidden;font-size:0.9375rem;font-weight:400;color:#E97300;white-space:nowrap;text-overflow:ellipsis;}
.dl-file-size{flex-shrink:0;font-size:0.9375rem;font-weight:400;color:#E97300;white-space:nowrap;}
.dl-file-badge{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:2.5rem;height:2.5rem;border-radius:9999px;background-color:#E97300;color:#fff;transition:transform 0.2s ease,background-color 0.2s ease;}
.dl-file-badge i{font-size:1.375rem;line-height:1;}
.dl-file:hover .dl-file-badge{background-color:#C96200;transform:translateY(2px);}
.dl-acc{display:block;}
.dl-summary{display:flex;align-items:center;justify-content:space-between;gap:1rem;cursor:pointer;list-style:none;padding-bottom:1rem;border-bottom:2px solid #E97300;}
.dl-summary::-webkit-details-marker{display:none;}
.dl-summary:focus-visible{outline:2px solid #E97300;outline-offset:4px;}
.dl-acc .dl-subtitle{font-size:clamp(1rem,1.6vw,1.125rem);font-weight:700;}
.dl-arrow{flex-shrink:0;color:#003B71;font-size:1.5rem;line-height:1;transition:transform 0.2s ease;}
.dl-acc[open] .dl-arrow{transform:rotate(90deg);}
.dl-acc .dl-files{padding-top:1rem;}
@media(max-width:640px){
.dl-file{padding-top:0.875rem;padding-right:1rem;padding-bottom:0.875rem;padding-left:1rem;}
.dl-file-info{align-items:center;}
.dl-file-icon{margin-right:0.25rem;}
.dl-file-name{white-space:normal;overflow-wrap:anywhere;}
}
@media(prefers-reduced-motion:reduce){
.dl-file,.dl-file-badge,.dl-arrow{transition:none;}
.dl-file:hover .dl-file-badge{transform:none;}
}
`;

const ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="18" height="3" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="8" width="28" height="1.5" rx="0.75" fill="#E97300"/>
    <rect x="2" y="12" width="14" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2" y="15" width="28" height="5" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
    <rect x="4.5" y="16.2" width="2.4" height="2.6" rx="0.4" fill="none" stroke="#E97300" stroke-width="0.7"/>
    <rect x="9" y="17.2" width="10" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="26.8" cy="17.5" r="1.7" fill="#E97300"/>
    <rect x="2" y="22" width="14" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2" y="25" width="28" height="5" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
    <rect x="4.5" y="26.2" width="2.4" height="2.6" rx="0.4" fill="none" stroke="#E97300" stroke-width="0.7"/>
    <rect x="9" y="27.2" width="10" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="26.8" cy="27.5" r="1.7" fill="#E97300"/>
</svg>`;

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function safeUrl(value) {
    const url = String(value ?? "").trim();
    if (/^[a-z][a-z0-9+.-]*:/i.test(url) && !/^https?:/i.test(url)) return "";
    return escapeHtml(url);
}

export function normalizeConfig(raw) {
    const src = raw && typeof raw === "object" ? raw : {};
    const text = (value) => (typeof value === "string" ? value : "");
    const sourceGroups = Array.isArray(src.groups) ? src.groups : DEFAULT_DATA.groups;
    return {
        title: typeof src.title === "string" ? src.title : DEFAULT_DATA.title,
        layout: LAYOUTS.includes(src.layout) ? src.layout : DEFAULT_DATA.layout,
        groups: sourceGroups.map((group) => ({
            title: text(group?.title),
            open: Boolean(group?.open),
            files: (Array.isArray(group?.files) ? group.files : []).map((file) => ({
                name: text(file?.name),
                size: text(file?.size),
                url: text(file?.url),
                newTab: Boolean(file?.newTab),
            })),
        })),
    };
}

export function readConfig(component) {
    try {
        return normalizeConfig(JSON.parse(component.getAttributes()[CONFIG_ATTR] || "{}"));
    } catch {
        return normalizeConfig({});
    }
}

function buildFileHTML(file) {
    const name = escapeHtml(file.name || DEFAULT_FILE.name);
    const size = escapeHtml(file.size);
    const url = safeUrl(file.url) || "#";
    const target = file.newTab ? ` target="_blank" rel="noopener noreferrer"` : "";
    const sizeHtml = size ? `<span class="dl-file-size">${size}</span>` : "";
    return `<a class="dl-file" href="${url}"${target}><span class="dl-file-info"><i class="ri-file-text-line dl-file-icon"></i><span class="dl-file-name">${name}</span>${sizeHtml}</span><span class="dl-file-badge"><i class="ri-download-line"></i></span></a>`;
}

function buildGroupHTML(group, layout) {
    const title = escapeHtml(group.title);
    const files = `<div class="dl-files">${group.files.map(buildFileHTML).join("")}</div>`;
    if (layout === "accordion") {
        return `<details class="dl-acc"${group.open ? " open" : ""}><summary class="dl-summary"><span class="dl-subtitle">${title || "Grupo"}</span><i class="ri-arrow-right-s-line dl-arrow"></i></summary>${files}</details>`;
    }
    const subtitle = title ? `<h3 class="dl-subtitle">${title}</h3>` : "";
    return `<div class="dl-group">${subtitle}${files}</div>`;
}

function buildHTML(data) {
    const head = data.title
        ? `<div class="dl-head"><h2 class="dl-title">${escapeHtml(data.title)}</h2><div class="dl-line"></div></div>`
        : "";
    const groups = data.groups.map((group) => buildGroupHTML(group, data.layout)).join("");
    return `<section class="dl-section"><div class="dl-container">${head}<div class="dl-groups">${groups}</div></div></section><style>${DL_CSS}</style>`;
}

function removeRulesByPrefix(editor) {
    const rules = editor.Css.getAll();
    const stale = rules.models.filter((rule) =>
        (rule.selectorsToString?.() || "")
            .split(",")
            .some((selector) => selector.trim().startsWith(CSS_PREFIX)),
    );
    stale.forEach((rule) => rules.remove(rule));
}

function lockChildren(component) {
    component.components().forEach((child) => {
        child.set({
            selectable: false,
            hoverable: false,
            layerable: false,
            draggable: false,
            droppable: false,
            removable: false,
            copyable: false,
            editable: false,
            highlightable: false,
        });
        lockChildren(child);
    });
}

function needsMigration(component) {
    return Number(component.getAttributes()[VERSION_ATTR] || 0) < VERSION;
}

export function applyConfig(editor, component, config) {
    const data = normalizeConfig(config);
    removeRulesByPrefix(editor);
    component.addAttributes({
        [CONFIG_ATTR]: JSON.stringify(data),
        [VERSION_ATTR]: String(VERSION),
    });
    component.components(buildHTML(data));
    lockChildren(component);
    return data;
}

function injectCanvasLock(doc) {
    if (!doc || doc.getElementById(CANVAS_STYLE_ID)) return;
    const style = doc.createElement("style");
    style.id = CANVAS_STYLE_ID;
    style.textContent = CANVAS_CSS;
    doc.head.appendChild(style);
}

export function registerDownloadsCore(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE
                ? { type: COMPONENT_TYPE }
                : false,
        model: {
            defaults: {
                name: "Descargas de Documentos",
                tagName: "div",
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
                propagate: ["editable", "droppable", "highlightable", "stylable", "resizable"],
                attributes: {
                    "data-gjs-type": COMPONENT_TYPE,
                    [CONFIG_ATTR]: JSON.stringify(DEFAULT_DATA),
                    [VERSION_ATTR]: String(VERSION),
                },
                components: buildHTML(DEFAULT_DATA),
                traits: [
                    "id",
                    {
                        type: "button",
                        label: false,
                        text: "Administrar Documentos",
                        full: true,
                        command: "open-downloads-config",
                    },
                ],
            },
        },
    });

    editor.BlockManager.add("downloads-block", {
        label: "Descargas de Documentos",
        category: "Documentos",
        media: ICON,
        activate: true,
        content: { type: COMPONENT_TYPE },
    });

    editor.on("component:mount", (model) => {
        if (model.get("type") !== COMPONENT_TYPE) return;
        setTimeout(() => {
            if (needsMigration(model)) applyConfig(editor, model, readConfig(model));
            else lockChildren(model);
        }, 0);
    });

    editor.on("component:selected", (selected) => {
        const root = selected?.closestType?.(COMPONENT_TYPE);
        if (root) editor.select(root);
    });

    editor.on("canvas:frame:load", ({ window: frameWindow }) =>
        injectCanvasLock(frameWindow?.document),
    );
    editor.on("load", () => injectCanvasLock(editor.Canvas.getDocument()));
}