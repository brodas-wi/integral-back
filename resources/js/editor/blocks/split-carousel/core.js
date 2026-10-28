import { assetUrl } from "@/utils/url.js";

export const COMPONENT_TYPE = "split-carousel-component";
export const VERSION = 3;
export const CONFIG_ATTR = "data-split-carousel-config";
export const VERSION_ATTR = "data-split-carousel-version";

const CSS_PREFIX = ".sc-";
const CANVAS_STYLE_ID = "sc-canvas-lock";
const CANVAS_CSS = `[data-gjs-type="${COMPONENT_TYPE}"] *{pointer-events:none !important;}`;

export const DEFAULT_DATA = {
    heading: "Ahorros y Depósitos",
    subheading: "Ahorra con propósito para lograr tus sueños",
    cards: [
        { image: "", video: "", title: "Depósito a Plazo Fijo", desc: "Haz crecer tu inversión." },
        { image: "", video: "", title: "Cuenta de Ahorro", desc: "El primer paso para hacer crecer tu negocio." },
        { image: "", video: "", title: "Ahorro Programado", desc: "Tus metas hechas realidad." },
    ],
};

const SC_CSS = `
.sc-section{width:100%;box-sizing:border-box;}
.sc-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.sc-layout{display:flex;flex-wrap:wrap;gap:clamp(1.5rem,3vw,2.5rem);}
.sc-text-col{flex:1 1 260px;min-width:220px;max-width:100%;display:flex;flex-direction:column;justify-content:center;gap:0.75rem;box-sizing:border-box;}
.sc-heading{margin:0;color:#E97300;font-weight:900;font-size:clamp(1.5rem,3vw,2.25rem);line-height:1.15;}
.sc-subheading{margin:0;color:#003B71;font-weight:500;font-size:clamp(1rem,1.8vw,1.375rem);line-height:1.5;}
.sc-carousel-col{flex:2 1 500px;min-width:280px;max-width:100%;box-sizing:border-box;}
.sc-carousel{width:100%;}
.sc-swiper{overflow:hidden;width:100%;}
.sc-swiper .swiper-wrapper{align-items:stretch;}
.sc-swiper .swiper-slide{height:auto;display:flex;justify-content:center;}
.sc-card{position:relative;display:block;width:100%;max-width:260px;aspect-ratio:13/18;border-radius:24px;overflow:hidden;margin:0 auto;}
.sc-card-link{color:inherit;text-decoration:none;cursor:pointer;}
.sc-card-link:focus-visible{outline:3px solid #E97300;outline-offset:3px;}
.sc-card-media{position:absolute;inset:0;width:100%;height:100%;}
.sc-card-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.sc-card-video-wrap{position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 0.25s ease;overflow:hidden;border-radius:24px;}
.sc-card:hover .sc-card-video-wrap{opacity:1;}
.sc-card-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.sc-card-overlay{position:absolute;left:0.75rem;right:0.75rem;bottom:0.75rem;z-index:5;background:rgba(0,0,0,0.5);border-radius:12px;padding-top:0.75rem;padding-right:0.875rem;padding-bottom:0.75rem;padding-left:0.875rem;}
.sc-card-title{margin:0 0 0.25rem;font-size:1rem;font-weight:800;line-height:1.2;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.35);}
.sc-card-desc{margin:0;font-size:0.8125rem;font-weight:500;color:#fff;line-height:1.4;text-shadow:0 1px 3px rgba(0,0,0,0.3);}
.sc-nav-row{position:relative;display:flex;align-items:center;justify-content:center;gap:1.25rem;margin-top:1.5rem;}
.sc-nav{width:2.5rem;height:2.5rem;flex-shrink:0;border-radius:9999px;background:#E97300;border:none;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.125rem;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:background 0.2s ease,color 0.2s ease,opacity 0.2s ease;}
.sc-nav:hover{background:#c96200;}
.sc-nav.sc-nav-disabled{opacity:0.35;cursor:not-allowed;pointer-events:none;}
@media(max-width:640px){
.sc-text-col{text-align:center;align-items:center;}
}
`;

const ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="8" width="9" height="16" rx="1" fill="#003B71" fill-opacity="0.15" stroke="#003B71" stroke-width="0.8"/>
    <rect x="14" y="6" width="6" height="20" rx="1.5" fill="#E97300" fill-opacity="0.3" stroke="#E97300" stroke-width="0.8"/>
    <rect x="22" y="6" width="6" height="20" rx="1.5" fill="#E97300" fill-opacity="0.2" stroke="#E97300" stroke-width="0.8"/>
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

export function safeHref(value) {
    const url = String(value ?? "").trim();
    if (!url) return "";
    if (url.startsWith("#")) return url;
    if (url.startsWith("/") && !url.startsWith("//")) return url;
    if (/^(https?:|mailto:|tel:)/i.test(url)) return url;
    return "";
}

export function normalizeConfig(raw) {
    const src = raw && typeof raw === "object" ? raw : {};
    const text = (value) => (typeof value === "string" ? value : "");
    const sourceCards = Array.isArray(src.cards) ? src.cards : DEFAULT_DATA.cards;
    return {
        heading: text(src.heading).trim() || DEFAULT_DATA.heading,
        subheading: text(src.subheading).trim() || DEFAULT_DATA.subheading,
        cards: sourceCards.map((card) => ({
            image: text(card?.image),
            video: text(card?.video),
            href: text(card?.href).trim(),
            title: text(card?.title),
            desc: text(card?.desc),
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

function buildCardHTML(card) {
    const image = card.image ? safeUrl(card.image) : escapeHtml(assetUrl("images/placeholder.svg"));
    const video = safeUrl(card.video);
    const title = escapeHtml(card.title || "Título de la tarjeta");
    const desc = escapeHtml(card.desc || "Descripción breve.");

    const videoHtml = video
        ? `<div class="sc-card-video-wrap"><video class="sc-card-video" src="${video}" muted loop playsinline autoplay preload="auto" disablepictureinpicture disableremoteplayback tabindex="-1" data-gjs-type="sc-video-media" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></video></div>`
        : "";

    const href = safeHref(card.href);
    const open = href
        ? `<a class="sc-card sc-card-link" href="${escapeHtml(href)}">`
        : `<div class="sc-card">`;
    const close = href ? "</a>" : "</div>";

    return `<div class="swiper-slide">${open}
        <div class="sc-card-media">
            <img src="${image}" alt="${title}">
            ${videoHtml}
        </div>
        <div class="sc-card-overlay">
            <h3 class="sc-card-title">${title}</h3>
            <p class="sc-card-desc">${desc}</p>
        </div>
    ${close}</div>`;
}

function buildHTML(data) {
    return `<section class="sc-section"><div class="sc-container">
        <div class="sc-layout">
            <div class="sc-text-col">
                <h2 class="sc-heading">${escapeHtml(data.heading)}</h2>
                <p class="sc-subheading">${escapeHtml(data.subheading)}</p>
            </div>
            <div class="sc-carousel-col">
                <div class="sc-carousel">
                    <div class="sc-swiper swiper" data-swiper-fill data-swiper-min-slide-width="260">
                        <div class="swiper-wrapper">${data.cards.map(buildCardHTML).join("")}</div>
                    </div>
                    <div class="sc-nav-row">
                        <button type="button" class="sc-nav sc-nav-prev" data-swiper-prev aria-label="Anterior"><i class="ri-arrow-left-s-line"></i></button>
                        <button type="button" class="sc-nav sc-nav-next" data-swiper-next aria-label="Siguiente"><i class="ri-arrow-right-s-line"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div></section><style>${SC_CSS}</style>`;
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

export function registerSplitCarouselCore(editor) {
    editor.DomComponents.addType("sc-video-media", {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === "sc-video-media"
                ? { type: "sc-video-media" }
                : false,
        model: {
            defaults: {
                tagName: "video",
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                selectable: false,
                hoverable: false,
                editable: false,
                highlightable: false,
                traits: [],
            },
        },
    });

    editor.DomComponents.addType(COMPONENT_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === COMPONENT_TYPE
                ? { type: COMPONENT_TYPE }
                : false,
        model: {
            defaults: {
                name: "Sección con Carrusel",
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
                        text: "Administrar Sección",
                        full: true,
                        command: "open-split-carousel-config",
                    },
                ],
            },
        },
    });

    editor.BlockManager.add("split-carousel-block", {
        label: "Sección con Carrusel",
        category: "Productos y Servicios",
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

    editor.on("canvas:frame:load", ({ window: frameWindow }) =>
        injectCanvasLock(frameWindow?.document),
    );
    editor.on("load", () => injectCanvasLock(editor.Canvas.getDocument()));
}