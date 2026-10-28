import { assetUrl } from "@/utils/url.js";
import { FULL_BLEED_VERSION, mergeData } from "./defaults";
import { FULL_BLEED_STYLES } from "./styles";
import { esc, safeHref, safeSrc } from "./utils";

const LOCKED =
    'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false"';

export function buildFullBleedHTML(input) {
    const data = mergeData(input);
    const src = safeSrc(data.image_url) || assetUrl("images/placeholder.svg");
    const title = data.title ? `<h2 class="fb-title" ${LOCKED}>${esc(data.title)}</h2>` : "";
    const button = data.button_label
        ? `<a class="fb-btn" href="${esc(safeHref(data.button_href))}" ${LOCKED}>${esc(data.button_label)}</a>`
        : "";

    return `<div class="fb-frame fb-align-${data.align}" ${LOCKED}><img class="fb-image" src="${esc(src)}" alt="${esc(data.title || "Banner")}" ${LOCKED}><div class="fb-content" ${LOCKED}>${title}${button}</div></div>`;
}

export const buildFullBleedContent = (input) => buildFullBleedHTML(input) + FULL_BLEED_STYLES;

export function readFullBleedConfig(component) {
    const raw = component.getAttributes()["data-full-bleed-config"];
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
        .filter((rule) => {
            const selector = rule.selectorsToString();
            return selector.includes(".fb-") || selector.includes("fu-");
        })
        .forEach((rule) => rules.remove(rule));
}

export function applyFullBleedConfig(editor, component, rawData) {
    const data = mergeData(rawData);

    purgeRules(editor);
    component.addAttributes({
        "data-full-bleed-config": JSON.stringify(data),
        "data-full-bleed-version": FULL_BLEED_VERSION,
    });
    component.components(buildFullBleedContent(data));
    lockTree(component);

    return data;
}