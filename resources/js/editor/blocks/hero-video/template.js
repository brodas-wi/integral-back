import { assetUrl } from "@/utils/url.js";
import { HERO_VIDEO_VERSION, mergeData } from "./defaults";
import { HERO_VIDEO_STYLES } from "./styles";
import { esc, safeHref, safeSrc } from "./utils";

const LOCKED =
    'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false"';

export function buildHeroVideoHTML(input) {
    const data = mergeData(input);
    const video = safeSrc(data.video_url);
    const poster = safeSrc(data.poster_url) || assetUrl("images/placeholder.svg");

    const title = data.title ? `<h2 class="hv-title" ${LOCKED}>${esc(data.title)}</h2>` : "";
    const subtitle = data.subtitle ? `<p class="hv-subtitle" ${LOCKED}>${esc(data.subtitle)}</p>` : "";
    const button = data.button_label
        ? `<a class="hv-btn" href="${esc(safeHref(data.button_href))}" ${LOCKED}>${esc(data.button_label)}</a>`
        : "";

    const media = video
        ? `<video class="hv-video" src="${esc(video)}" poster="${esc(poster)}" autoplay muted loop playsinline preload="metadata" ${LOCKED}></video>`
        : "";
    const mute = video
        ? `<button type="button" class="hv-mute" data-hv-mute aria-label="Activar sonido" ${LOCKED}><i class="ri-volume-mute-line"></i></button>`
        : "";

    return `<div class="hv-frame" ${LOCKED}><img class="hv-poster" src="${esc(poster)}" alt="" ${LOCKED}>${media}<div class="hv-shade" ${LOCKED}></div>${mute}<div class="hv-content" ${LOCKED}>${title}${subtitle}${button}</div></div>`;
}

export const buildHeroVideoContent = (input) => buildHeroVideoHTML(input) + HERO_VIDEO_STYLES;

export function readHeroVideoConfig(component) {
    const raw = component.getAttributes()["data-hero-video-config"];
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

export function pauseCanvasVideo(component) {
    const video = component.getEl()?.querySelector("video");
    if (!video || video.dataset.hvPaused) return;
    video.dataset.hvPaused = "1";
    video.pause();
    video.removeAttribute("src");
    video.load();
}

function purgeRules(editor) {
    const rules = editor.Css.getAll();
    rules
        .filter((rule) => rule.selectorsToString().includes("hv-"))
        .forEach((rule) => rules.remove(rule));
}

export function applyHeroVideoConfig(editor, component, rawData) {
    const data = mergeData(rawData);

    purgeRules(editor);
    component.addAttributes({
        "data-hero-video-config": JSON.stringify(data),
        "data-hero-video-version": HERO_VIDEO_VERSION,
    });
    component.components(buildHeroVideoContent(data));
    lockTree(component);
    setTimeout(() => pauseCanvasVideo(component), 50);

    return data;
}