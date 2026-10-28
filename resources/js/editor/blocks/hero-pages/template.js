import { assetUrl } from "@/utils/url.js";
import { HERO_PAGES_VERSION, mergeData } from "./defaults";
import { HERO_PAGES_STYLES } from "./styles";
import { esc, safeHref, safeIcon, safeSrc } from "./utils";

const LOCKED =
    'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false"';

function cardHtml(card) {
    const image = safeSrc(card.image) || assetUrl("images/placeholder.svg");
    const title = card.title || "Título de la tarjeta";
    const desc = card.desc || "Descripción breve.";
    const href = safeHref(card.href);

    const open = href
        ? `<a class="hp-card hp-card-link" href="${esc(href)}" ${LOCKED}>`
        : `<div class="hp-card" ${LOCKED}>`;
    const close = href ? "</a>" : "</div>";

    return `<div class="swiper-slide" ${LOCKED}>${open}<div class="hp-card-media" ${LOCKED}><img src="${esc(image)}" alt="${esc(title)}" ${LOCKED}></div><h3 class="hp-card-title" ${LOCKED}>${esc(title)}</h3><div class="hp-card-badge-box" ${LOCKED}><span class="hp-card-badge" ${LOCKED}><i class="${esc(safeIcon(card.icon))}"></i></span><p class="hp-card-desc" ${LOCKED}>${esc(desc)}</p></div>${close}</div>`;
}

export function buildHeroPagesHTML(input) {
    const data = mergeData(input);
    const heading = data.heading ? `<h2 class="hp-heading" ${LOCKED}>${esc(data.heading)}</h2>` : "";
    const subheading = data.subheading
        ? `<p class="hp-subheading" ${LOCKED}>${esc(data.subheading)}</p>`
        : "";

    return `<div class="hp-container" ${LOCKED}>${heading}${subheading}<div class="hp-carousel" ${LOCKED}><button type="button" class="hp-nav hp-nav-prev" data-swiper-prev aria-label="Anterior" ${LOCKED}><i class="ri-arrow-left-s-line"></i></button><div class="hp-swiper swiper" ${LOCKED}><div class="swiper-wrapper" ${LOCKED}>${data.cards.map(cardHtml).join("")}</div></div><button type="button" class="hp-nav hp-nav-next" data-swiper-next aria-label="Siguiente" ${LOCKED}><i class="ri-arrow-right-s-line"></i></button><div class="hp-dots swiper-pagination" data-swiper-pagination ${LOCKED}></div></div></div>`;
}

export const buildHeroPagesContent = (input) => buildHeroPagesHTML(input) + HERO_PAGES_STYLES;

export function readHeroPagesConfig(component) {
    const raw = component.getAttributes()["data-hero-pages-config"];
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function lockTree(component) {
    component.components().forEach((child) => {
        child.set({
            editable: false,
            selectable: false,
            hoverable: false,
            highlightable: false,
            draggable: false,
            droppable: false,
            removable: false,
            copyable: false,
            layerable: false,
        });
        lockTree(child);
    });
}

function purgeRules(editor) {
    const rules = editor.Css.getAll();
    rules
        .filter((rule) => rule.selectorsToString().includes(".hp-"))
        .forEach((rule) => rules.remove(rule));
}

export function applyHeroPagesConfig(editor, component, rawData) {
    const data = mergeData(rawData);

    purgeRules(editor);
    component.addAttributes({
        "data-hero-pages-config": JSON.stringify(data),
        "data-hero-pages-version": HERO_PAGES_VERSION,
    });
    component.components(buildHeroPagesContent(data));
    lockTree(component);

    return data;
}