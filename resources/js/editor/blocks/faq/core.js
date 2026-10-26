export const COMPONENT_TYPE = "faq-component";
export const VERSION = 2;
export const CONFIG_ATTR = "data-faq-config";
export const VERSION_ATTR = "data-faq-version";
export const LINE_STYLES = ["text", "short", "full"];

const CSS_PREFIX = ".fq-";
const CANVAS_STYLE_ID = "fq-canvas-lock";
const CANVAS_CSS = `[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;}`;

export const DEFAULT_DATA = {
    lineStyle: "text",
    sections: [
        {
            title: "Sobre Banco Integral",
            items: [
                { question: "¿A qué tipo de clientes atiende Banco Integral?", answer: "Escribe aquí la respuesta." },
            ],
        },
        {
            title: "Créditos",
            items: [
                { question: "¿Cuáles son los requisitos básicos para obtener un crédito?", answer: "Escribe aquí la respuesta." },
                { question: "¿Qué tipos de crédito puedo obtener con Banco Integral?", answer: "Escribe aquí la respuesta." },
                { question: "¿Cuál es el monto mínimo para un crédito?", answer: "Escribe aquí la respuesta." },
                { question: "¿Cuál es la forma de pago del crédito?", answer: "Escribe aquí la respuesta." },
                { question: "¿Cómo puedo solicitar mi crédito?", answer: "Escribe aquí la respuesta." },
                { question: "¿Dónde puedo realizar los pagos o abonos a mi crédito?", answer: "Escribe aquí la respuesta." },
                { question: "¿Qué características debe tener el fiador?", answer: "Escribe aquí la respuesta." },
            ],
        },
    ],
};

const FQ_CSS = `
.fq-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.fq-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.fq-groups{display:flex;flex-direction:column;}
.fq-group{display:flex;flex-wrap:wrap;align-items:flex-start;row-gap:0.5rem;column-gap:clamp(1.5rem,4vw,3rem);padding-top:clamp(0.75rem,2vw,1.5rem);padding-bottom:clamp(0.75rem,2vw,1.5rem);}
.fq-title-col{flex:0 0 28%;max-width:28%;box-sizing:border-box;padding-top:1.25rem;}
.fq-title-box{display:inline-block;max-width:100%;}
.fq-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1rem,1.5vw,1.125rem);line-height:1.3;}
.fq-line{height:2px;margin-top:0.5rem;background-color:#E97300;}
.fq-line-short .fq-line{width:2.25rem;}
.fq-line-full .fq-title-box{display:block;}
.fq-items{flex:1 1 0;min-width:0;display:flex;flex-direction:column;}
.fq-item{border-bottom:2px solid #E97300;}
.fq-item-last{border-bottom:none;}
.fq-summary{display:flex;align-items:center;justify-content:space-between;gap:1rem;cursor:pointer;list-style:none;padding-top:1.25rem;padding-bottom:1.25rem;}
.fq-summary::-webkit-details-marker{display:none;}
.fq-question{color:#003B71;font-weight:700;font-size:clamp(0.875rem,1.2vw,1rem);line-height:1.4;}
.fq-arrow{flex-shrink:0;color:#14243D;font-size:1.5rem;line-height:1;transition:transform 0.2s ease;}
.fq-item[open] .fq-arrow{transform:rotate(90deg);}
.fq-answer{padding-bottom:1.25rem;padding-right:2.5rem;color:#14243D;font-size:0.9375rem;line-height:1.6;}
.fq-answer p{margin:0 0 0.75rem;}
.fq-answer > :last-child{margin-bottom:0;}
.fq-list{margin:0 0 0.75rem;padding-left:1.5rem;}
.fq-list li{margin-bottom:0.25rem;}
.fq-list .fq-list{margin-top:0.25rem;margin-bottom:0;}
ul.fq-list{list-style-type:disc;}
ul.fq-list ul.fq-list{list-style-type:circle;}
ol.fq-list{list-style-type:decimal;}
.fq-divider{width:100%;height:2px;background-color:#E97300;}
@media(max-width:768px){
.fq-title-col{flex:0 0 100%;max-width:100%;padding-top:0;}
.fq-items{flex:0 0 100%;}
.fq-answer{padding-right:0;}
}
`;

const ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="8" width="8" height="2" rx="1" fill="#003B71"/>
    <rect x="3" y="12" width="5" height="1.5" fill="#E97300"/>
    <rect x="14" y="7" width="15" height="4" rx="1" fill="#003B71" fill-opacity="0.15" stroke="#003B71" stroke-width="0.6"/>
    <rect x="14" y="12" width="15" height="1.5" fill="#E97300"/>
    <rect x="14" y="16" width="15" height="4" rx="1" fill="#003B71" fill-opacity="0.15" stroke="#003B71" stroke-width="0.6"/>
    <rect x="14" y="21" width="15" height="1.5" fill="#E97300"/>
</svg>`;

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const LIST_LINE = /^(\s*)([-*•–]|\d+[.)])\s+(.+)$/;

function renderList(items) {
    let html = "";
    const stack = [];
    items.forEach((item) => {
        const tag = item.ordered ? "ol" : "ul";
        while (stack.length && item.indent < stack[stack.length - 1].indent) {
            html += `</li></${stack.pop().tag}>`;
        }
        let top = stack[stack.length - 1];
        if (top && item.indent === top.indent && top.tag !== tag) {
            html += `</li></${stack.pop().tag}>`;
            top = stack[stack.length - 1];
        }
        if (top && item.indent === top.indent) {
            html += `</li><li>${item.text}`;
        } else {
            html += `<${tag} class="fq-list"><li>${item.text}`;
            stack.push({ indent: item.indent, tag });
        }
    });
    while (stack.length) html += `</li></${stack.pop().tag}>`;
    return html;
}

export function renderAnswer(raw) {
    const lines = String(raw ?? "").replace(/\r\n?/g, "\n").replace(/\t/g, "  ").split("\n");
    let html = "";
    let paragraph = [];
    let list = [];
    const flushParagraph = () => {
        if (paragraph.length) html += `<p>${paragraph.join("<br>")}</p>`;
        paragraph = [];
    };
    const flushList = () => {
        if (list.length) html += renderList(list);
        list = [];
    };
    lines.forEach((line) => {
        if (!line.trim()) return flushParagraph();
        const match = line.match(LIST_LINE);
        if (match) {
            flushParagraph();
            list.push({
                indent: match[1].length,
                ordered: /\d/.test(match[2]),
                text: escapeHtml(match[3].trim()),
            });
        } else {
            flushList();
            paragraph.push(escapeHtml(line.trim()));
        }
    });
    flushParagraph();
    flushList();
    return html;
}

export function normalizeConfig(raw) {
    const src = raw && typeof raw === "object" ? raw : {};
    const text = (value) => (typeof value === "string" ? value : "");
    const sourceSections = Array.isArray(src.sections) ? src.sections : DEFAULT_DATA.sections;
    return {
        lineStyle: LINE_STYLES.includes(src.lineStyle) ? src.lineStyle : DEFAULT_DATA.lineStyle,
        sections: sourceSections.map((section) => ({
            title: text(section?.title),
            items: (Array.isArray(section?.items) ? section.items : []).map((item) => ({
                question: text(item?.question),
                answer: text(item?.answer),
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

function buildItemHTML(item, isLast) {
    const question = escapeHtml(item.question || "Pregunta");
    const answer = renderAnswer(item.answer || "Respuesta.");
    return `<details class="fq-item${isLast ? " fq-item-last" : ""}"><summary class="fq-summary"><span class="fq-question">${question}</span><i class="ri-arrow-right-s-line fq-arrow"></i></summary><div class="fq-answer">${answer}</div></details>`;
}

function buildSectionHTML(section) {
    const last = section.items.length - 1;
    const titleHtml = section.title
        ? `<div class="fq-title-box"><h3 class="fq-title">${escapeHtml(section.title)}</h3><div class="fq-line"></div></div>`
        : "";
    return `<div class="fq-group"><div class="fq-title-col">${titleHtml}</div><div class="fq-items">${section.items
        .map((item, idx) => buildItemHTML(item, idx === last))
        .join("")}</div></div>`;
}

function buildHTML(data) {
    const sectionsHtml = data.sections.map(buildSectionHTML).join(`<div class="fq-divider"></div>`);
    return `<section class="fq-section fq-line-${data.lineStyle}"><div class="fq-container"><div class="fq-groups">${sectionsHtml}</div></div></section><style>${FQ_CSS}</style>`;
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

export function registerFaqCore(editor) {
    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE
                ? { type: COMPONENT_TYPE }
                : false,
        model: {
            defaults: {
                name: "Preguntas Frecuentes",
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
                        text: "Administrar Preguntas",
                        full: true,
                        command: "open-faq-config",
                    },
                ],
            },
        },
    });

    editor.BlockManager.add("faq-block", {
        label: "Preguntas Frecuentes",
        category: "Contenido",
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