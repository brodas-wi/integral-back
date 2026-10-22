import { assetUrl } from "@/utils/url.js";

export const COMPONENT_TYPE = "options-banner-component";
export const VERSION = "2";
export const MAX_CARDS = 12;

export const DEFAULT_DATA = {
    title: "Protege lo que más importa.",
    subtitle: "Conoce tus opciones",
    button_label: "Solicitar información",
    button_href: "#",
    icon_url: "",
    cards: [
        { image: "", badge: "Seguro de Salud", desc: "Una opción con tu crédito para cuidar de tu salud." },
        { image: "", badge: "Seguro de Vida", desc: "Tu esfuerzo, tus sueños y el bienestar de quienes más quieres merecen un respaldo." },
        { image: "", badge: "Multiasistencias", desc: "Médica, hogar y vial carro o moto." },
    ],
};

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ESCAPES[char]);
export const clone = (value) => JSON.parse(JSON.stringify(value));

const safeHref = (url) => (/^(https?:|\/|#|mailto:|tel:)/i.test(String(url ?? "").trim()) ? String(url).trim() : "#");
const safeSrc = (url) => (/^(https?:\/\/|\/)/i.test(String(url ?? "").trim()) ? String(url).trim() : "");
const text = (value, fallback) => (typeof value === "string" ? value.trim() : fallback);

export function mergeData(input) {
    const source = input && typeof input === "object" && !Array.isArray(input) ? input : {};
    const cards = Array.isArray(source.cards) ? source.cards : clone(DEFAULT_DATA.cards);

    return {
        title: text(source.title, DEFAULT_DATA.title),
        subtitle: text(source.subtitle, DEFAULT_DATA.subtitle),
        button_label: text(source.button_label, DEFAULT_DATA.button_label),
        button_href: text(source.button_href, "#") || "#",
        icon_url: text(source.icon_url, ""),
        cards: cards.slice(0, MAX_CARDS).map((card) => ({
            image: text(card?.image, ""),
            badge: text(card?.badge, ""),
            desc: text(card?.desc, ""),
        })),
    };
}

export const STYLES = `<style>
.ob-section{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);}
.ob-panel{position:relative;width:100%;box-sizing:border-box;border-radius:clamp(28px,4vw,40px);background-color:#E97300;padding-top:clamp(1.5rem,3.5vw,2.75rem);padding-bottom:clamp(1.5rem,3.5vw,2.75rem);padding-left:clamp(1.5rem,3.5vw,2.75rem);padding-right:clamp(1.5rem,3.5vw,2.75rem);}
.ob-header{display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:1.5rem;margin-bottom:clamp(1.5rem,3vw,2.25rem);}
.ob-header-text{display:flex;flex:1;flex-direction:column;gap:0.75rem;min-width:240px;}
.ob-title{margin:0;font-size:clamp(1.25rem,2.6vw,1.875rem);font-weight:800;line-height:1.1;color:#fff;}
.ob-subtitle{margin:0;font-size:clamp(1rem,1.8vw,1.25rem);font-weight:500;line-height:1.35;color:#fff;}
.ob-btn{display:inline-flex;align-items:center;justify-content:center;align-self:flex-start;width:fit-content;padding:clamp(0.5rem,1.5vw,0.75rem) clamp(1.125rem,3vw,1.75rem);border-radius:9999px;background-color:#14243D;font-size:clamp(0.75rem,1.6vw,0.9375rem);font-weight:600;color:#fff;text-decoration:none;white-space:nowrap;transition:background-color 0.2s ease;}
.ob-btn:hover,.ob-btn:focus-visible{background-color:#0b1627;}
.ob-btn:focus-visible{outline:2px solid #fff;outline-offset:2px;}
.ob-icon{display:block;flex-shrink:0;width:clamp(48px,6vw,72px);height:clamp(48px,6vw,72px);object-fit:contain;}
.ob-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(1rem,2vw,1.5rem);width:100%;}
.ob-card{display:grid;grid-template-columns:clamp(80px,28%,140px) minmax(0,1fr);align-items:center;column-gap:clamp(0.875rem,2vw,1.25rem);height:100%;box-sizing:border-box;padding-top:clamp(0.875rem,2vw,1.25rem);padding-bottom:clamp(0.875rem,2vw,1.25rem);padding-left:clamp(0.875rem,2vw,1.25rem);padding-right:clamp(0.875rem,2vw,1.25rem);border-radius:16px;background-color:#fff;box-shadow:0 8px 28px rgba(0,0,0,0.22);overflow-wrap:anywhere;}
.ob-card:last-child:nth-child(odd){grid-column:1 / -1;}
.ob-card-media{position:relative;width:100%;aspect-ratio:1 / 1;overflow:hidden;border-radius:12px;}
.ob-card-media img{position:absolute;top:0;left:0;display:block;width:100%;height:100%;object-fit:cover;}
.ob-card-body{display:flex;flex-direction:column;justify-content:center;gap:0.625rem;min-width:0;}
.ob-badge{display:inline-flex;align-items:center;width:fit-content;max-width:100%;padding:0.375rem 0.875rem;border-radius:9999px;background-color:#14243D;font-size:0.75rem;font-weight:600;color:#fff;}
.ob-desc{margin:0;font-size:0.8125rem;line-height:1.45;color:#1e293b;}
@media(max-width:720px){
.ob-grid{grid-template-columns:minmax(0,1fr);}
}
@media(max-width:640px){
.ob-header{justify-content:center;}
.ob-header-text{align-items:center;text-align:center;}
.ob-btn{align-self:center;width:100%;}
}
@media(max-width:480px){
.ob-card{grid-template-columns:minmax(0,1fr);justify-items:center;row-gap:0.75rem;text-align:center;}
.ob-card-media{width:min(100%,140px);}
.ob-card-body{align-items:center;}
}
@media(prefers-reduced-motion:reduce){.ob-btn{transition:none;}}
</style>`;

const LOCKED = 'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false"';

const cardHtml = (card) => {
    const image = safeSrc(card.image) || assetUrl("images/placeholder.svg");
    const badge = card.badge || "Etiqueta";

    return `<div class="ob-card"><div class="ob-card-media"><img src="${esc(image)}" alt="${esc(badge)}" loading="lazy"></div><div class="ob-card-body"><span class="ob-badge">${esc(badge)}</span><p class="ob-desc">${esc(card.desc || "Descripción breve.")}</p></div></div>`;
};

export function buildHTML(input) {
    const data = mergeData(input);
    const button = data.button_label
        ? `<a href="${esc(safeHref(data.button_href))}" class="ob-btn">${esc(data.button_label)}</a>`
        : "";
    const icon = data.icon_url ? `<img src="${esc(safeSrc(data.icon_url))}" alt="" class="ob-icon">` : "";

    return `<section class="ob-section" ${LOCKED}><div class="ob-panel" ${LOCKED}><div class="ob-header"><div class="ob-header-text"><h2 class="ob-title">${esc(data.title || "Título")}</h2><p class="ob-subtitle">${esc(data.subtitle || "Subtítulo")}</p>${button}</div>${icon}</div><div class="ob-grid">${data.cards.map(cardHtml).join("")}</div></div></section>`;
}

export const buildContent = (input) => buildHTML(input) + STYLES;

export function readConfig(component) {
    const raw = component.getAttributes()["data-options-banner-config"];
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function purgeRules(editor) {
    const rules = editor.Css.getAll();
    rules.filter((rule) => rule.selectorsToString().includes(".ob-")).forEach((rule) => rules.remove(rule));
}

export function applyConfig(editor, component, rawData) {
    const data = mergeData(rawData);

    purgeRules(editor);
    component.addAttributes({
        "data-options-banner-config": JSON.stringify(data),
        "data-options-banner-version": VERSION,
    });
    component.components(buildContent(data));

    return data;
}