import { BANNER_VERSION, VIDEO_TYPE, mergeData } from "./defaults";
import { BANNER_STYLES } from "./styles";

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
const createUid = () => "vb" + Math.random().toString(36).slice(2, 7);

const LOCKED =
    'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false"';

export function buildVideoBannerHTML(input, uid = createUid()) {
    const data = mergeData(input);
    const poster = `<img src="${esc(data.poster_url)}" alt="" class="vb-media" ${LOCKED}>`;
    const video = data.video_url
        ? `<video src="${esc(data.video_url)}" class="vb-media" autoplay muted loop playsinline disablepictureinpicture disableremoteplayback tabindex="-1" aria-hidden="true" data-gjs-type="${VIDEO_TYPE}" ${LOCKED}></video>`
        : "";
    const gradient = data.show_gradient ? `<div class="vb-gradient" ${LOCKED}></div>` : "";
    const frameClass = data.show_radius ? "vb-frame vb-rounded" : "vb-frame";

    return `<section id="vb-root-${uid}" class="vb-section" ${LOCKED}><div class="${frameClass}" ${LOCKED}>${poster}${video}${gradient}</div></section>`;
}

export function readVideoBannerConfig(component) {
    const raw = component.getAttributes()["data-video-banner-config"];
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function purgeBannerRules(editor) {
    const rules = editor.Css.getAll();
    rules
        .filter((rule) => rule.selectorsToString().includes(".vb-"))
        .forEach((rule) => rules.remove(rule));
}

export function applyVideoBannerConfig(editor, component, rawData) {
    const data = mergeData(rawData);
    const existing = component.getEl()?.querySelector("[id^='vb-root-']");
    const uid = existing?.id.replace("vb-root-", "") || createUid();

    purgeBannerRules(editor);
    component.addAttributes({
        "data-video-banner-config": JSON.stringify(data),
        "data-video-banner-version": BANNER_VERSION,
    });
    component.components(buildVideoBannerHTML(data, uid) + BANNER_STYLES);

    return data;
}