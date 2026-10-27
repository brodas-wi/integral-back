export const COMPONENT_TYPE = "bar-chart-component";
export const VERSION = 1;
export const CONFIG_ATTR = "data-bar-chart-config";
export const VERSION_ATTR = "data-bar-chart-version";
export const MAX_BARS = 6;

export const COLOR_PRESETS = [
    { label: "Azul", value: "#003B71" },
    { label: "Naranja", value: "#E97300" },
    { label: "Azul claro", value: "#5C88B3" },
    { label: "Naranja claro", value: "#F2A566" },
    { label: "Azul marino", value: "#14243D" },
];

export const FORMATS = ["percent", "integer", "decimal", "none"];
export const TITLE_STYLES = ["text", "badge", "none"];
export const LAYOUTS = ["section", "inline"];
export const HEIGHTS = ["s", "m", "l"];
export const LEGENDS = ["none", "text", "dot"];

const CATEGORY = "Gráficos";
const CSS_PREFIX = ".bc-";
const CANVAS_STYLE_ID = "bc-canvas-lock";
const CANVAS_CSS = `[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;}`;

const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const RGB = /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/i;

export const DEFAULT_DATA = {
    layout: "section",
    title: "Título del gráfico",
    titleStyle: "text",
    height: "m",
    max: 100,
    format: "percent",
    decimals: 1,
    prefix: "",
    suffix: "",
    showInfo: false,
    legend: "dot",
    bars: [
        { label: "Lorem ipsum", value: 42, color: "#003B71", subtitle: "Subtítulo", text: "Descripción breve." },
        { label: "Lorem ipsum", value: 68, color: "#5C88B3", subtitle: "Subtítulo", text: "Descripción breve." },
        { label: "Lorem ipsum", value: 91, color: "#E97300", subtitle: "Subtítulo", text: "Descripción breve." },
    ],
};

const COLS_CSS = Array.from(
    { length: MAX_BARS },
    (_, index) => `.bc-cols-${index + 1}{grid-template-columns:repeat(${index + 1},minmax(0,1fr));}`,
).join("\n");

const BC_CSS = `
.bc-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;scroll-margin-top:140px;}
.bc-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.bc-wrap{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.bc-chart{width:100%;box-sizing:border-box;}
.bc-head{display:flex;justify-content:center;margin-bottom:clamp(1.5rem,3vw,2.25rem);}
.bc-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.125rem,2vw,1.375rem);line-height:1.3;text-align:center;}
.bc-badge{display:inline-block;max-width:100%;margin:0;box-sizing:border-box;padding-top:0.5rem;padding-right:1.5rem;padding-bottom:0.5rem;padding-left:1.5rem;border-radius:9999px;background-color:#003B71;color:#fff;font-weight:700;font-size:clamp(0.9375rem,1.6vw,1.0625rem);line-height:1.3;text-align:center;}
.bc-cols{display:grid;column-gap:0;row-gap:0;}
${COLS_CSS}
.bc-info{display:flex;flex-direction:column;align-items:center;gap:0.5rem;box-sizing:border-box;min-width:0;padding-top:0;padding-right:clamp(0.5rem,1.5vw,1rem);padding-bottom:2rem;padding-left:clamp(0.5rem,1.5vw,1rem);text-align:center;}
.bc-sub{margin:0;color:#003B71;font-weight:700;font-size:0.875rem;line-height:1.4;}
.bc-text{margin:0;color:#003B71;font-weight:400;font-size:0.875rem;line-height:1.5;}
.bc-zone{display:flex;flex-direction:column;justify-content:flex-end;align-items:center;box-sizing:border-box;min-width:0;height:17.5rem;border-bottom:2px solid #003B71;}
.bc-h-s .bc-zone{height:12.5rem;}
.bc-h-l .bc-zone{height:22.5rem;}
.bc-value{flex-shrink:0;margin-bottom:0.375rem;color:#003B71;font-weight:500;font-size:0.875rem;line-height:1.2;white-space:nowrap;}
.bc-bar{flex-shrink:0;width:60%;max-width:3.5rem;min-height:2px;border-top-left-radius:0.25rem;border-top-right-radius:0.25rem;}
.bc-caption{display:flex;align-items:center;justify-content:center;gap:0.5rem;box-sizing:border-box;min-width:0;padding-top:0.75rem;padding-right:clamp(0.25rem,1vw,0.75rem);padding-bottom:0;padding-left:clamp(0.25rem,1vw,0.75rem);color:#003B71;font-weight:400;font-size:0.875rem;line-height:1.4;text-align:center;overflow-wrap:anywhere;}
.bc-dot{flex-shrink:0;width:0.75rem;height:0.75rem;border-radius:9999px;}
@media(max-width:992px){
.bc-section{scroll-margin-top:80px;}
}
@media(max-width:640px){
.bc-zone{height:14rem;}
.bc-h-s .bc-zone{height:10rem;}
.bc-h-l .bc-zone{height:17rem;}
.bc-sub,.bc-text,.bc-value,.bc-caption{font-size:0.75rem;}
}
`;

const STYLES = `<style>${BC_CSS}</style>`;

function icon(kind) {
    const bar = (x, height, color) => `<rect x="${x}" y="${25 - height}" width="4" height="${height}" fill="${color}"/>`;
    const tick = (x, height) =>
        `<rect x="${x - 0.5}" y="${25 - height - 3}" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>`;
    const framed = kind === "section";
    const frame = framed
        ? `<rect x="2.5" y="2.5" width="27" height="27" rx="2" fill="none" stroke="#003B71" stroke-width="0.6" stroke-opacity="0.3"/>`
        : "";
    const head = framed ? `<rect x="9" y="5" width="14" height="3" rx="1.5" fill="#003B71" fill-opacity="0.75"/>` : "";
    const heights = framed ? [7, 11, 15] : [8, 13, 18];
    const ticks = framed ? "" : heights.map((height, index) => tick(8 + index * 6, height)).join("");

    return `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${frame}${head}${bar(8, heights[0], "#003B71")}${bar(14, heights[1], "#5C88B3")}${bar(20, heights[2], "#E97300")}${ticks}<rect x="5" y="25" width="22" height="1.4" fill="#003B71"/></svg>`;
}

const ICONS = { section: icon("section"), inline: icon("inline") };

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export function parseNumber(value) {
    if (typeof value === "number") return Number.isFinite(value) ? value : NaN;
    const raw = String(value ?? "").trim().replace(",", ".");
    return /^-?(\d+\.?\d*|\.\d+)$/.test(raw) ? Number(raw) : NaN;
}

export function normalizeConfig(raw) {
    const src = raw && typeof raw === "object" ? raw : {};
    const pick = (value, list, fallback) => (list.includes(value) ? value : fallback);
    const text = (value, fallback = "") => (typeof value === "string" ? value : fallback);

    const parsedMax = parseNumber(src.max);
    const max = parsedMax > 0 ? parsedMax : DEFAULT_DATA.max;

    const parsedDecimals = parseNumber(src.decimals);
    const decimals = Number.isInteger(parsedDecimals)
        ? Math.min(3, Math.max(0, parsedDecimals))
        : DEFAULT_DATA.decimals;

    const sourceBars = Array.isArray(src.bars) && src.bars.length ? src.bars : DEFAULT_DATA.bars;
    const legendFallback = src.showLegend === false ? "none" : DEFAULT_DATA.legend;

    return {
        layout: pick(src.layout, LAYOUTS, DEFAULT_DATA.layout),
        title: text(src.title, DEFAULT_DATA.title).trim(),
        titleStyle: pick(src.titleStyle, TITLE_STYLES, DEFAULT_DATA.titleStyle),
        height: pick(src.height, HEIGHTS, DEFAULT_DATA.height),
        max,
        format: pick(src.format, FORMATS, DEFAULT_DATA.format),
        decimals,
        prefix: text(src.prefix).slice(0, 8),
        suffix: text(src.suffix).slice(0, 20),
        showInfo: Boolean(src.showInfo),
        legend: pick(src.legend, LEGENDS, legendFallback),
        bars: sourceBars.slice(0, MAX_BARS).map((bar, index) => {
            const value = parseNumber(bar?.value);
            const color = text(bar?.color).trim();
            return {
                label: text(bar?.label),
                value: Number.isFinite(value) ? Math.round(Math.min(max, Math.max(0, value)) * 1000) / 1000 : 0,
                color: HEX.test(color) || RGB.test(color) ? color : COLOR_PRESETS[index % COLOR_PRESETS.length].value,
                subtitle: text(bar?.subtitle),
                text: text(bar?.text),
            };
        }),
    };
}

export function readConfig(component) {
    try {
        return normalizeConfig(JSON.parse(component.getAttributes()[CONFIG_ATTR] || "{}"));
    } catch {
        return normalizeConfig({});
    }
}

function formatNumber(value, decimals) {
    return value.toLocaleString("es", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function formatValue(value, config) {
    switch (config.format) {
        case "percent":
            return `${formatNumber(value, config.decimals)}\u00A0%`;
        case "integer":
            return `${config.prefix}${formatNumber(Math.round(value), 0)}${config.suffix}`;
        case "decimal":
            return `${config.prefix}${formatNumber(value, config.decimals)}${config.suffix}`;
        default:
            return "";
    }
}

function heightPercent(bar, max) {
    const ratio = max > 0 ? bar.value / max : 0;
    return Math.round(Math.min(1, Math.max(0, ratio)) * 10000) / 100;
}

function buildHead(config) {
    if (config.titleStyle === "none" || !config.title) return "";
    const tag = config.titleStyle === "badge" ? "bc-badge" : "bc-title";
    return `<div class="bc-head"><h3 class="${tag}">${escapeHtml(config.title)}</h3></div>`;
}

function buildInfo(bar) {
    const subtitle = bar.subtitle ? `<h4 class="bc-sub">${escapeHtml(bar.subtitle)}</h4>` : "";
    const body = bar.text ? `<p class="bc-text">${escapeHtml(bar.text)}</p>` : "";
    return `<div class="bc-info">${subtitle}${body}</div>`;
}

function buildZone(bar, config) {
    const label =
        config.format === "none" ? "" : `<span class="bc-value">${escapeHtml(formatValue(bar.value, config))}</span>`;
    const percent = heightPercent(bar, config.max);
    return `<div class="bc-zone">${label}<div class="bc-bar" style="height:${percent}%;background-color:${escapeHtml(bar.color)};"></div></div>`;
}

function buildCaption(bar, config) {
    const dot =
        config.legend === "dot"
            ? `<span class="bc-dot" style="background-color:${escapeHtml(bar.color)};"></span>`
            : "";
    return `<div class="bc-caption">${dot}<span>${escapeHtml(bar.label)}</span></div>`;
}

function buildChart(config) {
    const infos = config.showInfo ? config.bars.map(buildInfo).join("") : "";
    const zones = config.bars.map((bar) => buildZone(bar, config)).join("");
    const captions = config.legend === "none" ? "" : config.bars.map((bar) => buildCaption(bar, config)).join("");
    const label = escapeHtml(config.title || "Gráfico de barras");

    return `<div class="bc-chart bc-h-${config.height}" role="group" aria-label="${label}">${buildHead(config)}<div class="bc-cols bc-cols-${config.bars.length}">${infos}${zones}${captions}</div></div>`;
}

export function buildHTML(config) {
    const chart = buildChart(config);
    const body =
        config.layout === "inline"
            ? `<div class="bc-wrap">${chart}</div>`
            : `<section class="bc-section"><div class="bc-container">${chart}</div></section>`;
    return `${body}${STYLES}`;
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
            stylable: false,
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
    component.setClass([]);
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

function registerType(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE ? { type: COMPONENT_TYPE } : false,
        model: {
            defaults: {
                name: "Gráfico de Barras",
                tagName: "div",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                stylable: ["background-color"],
                resizable: false,
                layerable: true,
                propagate: ["editable", "droppable", "highlightable", "resizable"],
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
                        text: "Administrar Gráfico",
                        full: true,
                        command: "open-bar-chart-config",
                    },
                ],
            },
        },
    });
}

function registerBlocks(editor) {
    const inline = normalizeConfig({ ...DEFAULT_DATA, layout: "inline" });

    editor.BlockManager.add("bar-chart-section-block", {
        label: "Sección: Gráfico de Barras",
        category: CATEGORY,
        media: ICONS.section,
        activate: true,
        content: { type: COMPONENT_TYPE },
    });

    editor.BlockManager.add("bar-chart-block", {
        label: "Gráfico de Barras",
        category: CATEGORY,
        media: ICONS.inline,
        activate: true,
        content: {
            type: COMPONENT_TYPE,
            attributes: {
                "data-gjs-type": COMPONENT_TYPE,
                [CONFIG_ATTR]: JSON.stringify(inline),
                [VERSION_ATTR]: String(VERSION),
            },
            components: buildHTML(inline),
        },
    });
}

export function registerBarChartCore(editor) {
    registerType(editor);
    registerBlocks(editor);

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