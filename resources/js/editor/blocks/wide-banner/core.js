import { assetUrl } from "@/utils/url.js";

export const COMPONENT_TYPE = "wide-banner-component";
export const VIDEO_TYPE = "wb-video-media";
export const VERSION = "2";
export const PLACEHOLDER = assetUrl("images/placeholder.svg");

export const DEFAULT_DATA = { video_url: "", poster_url: PLACEHOLDER, line1: "", line2: "" };

const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ESCAPES[char]);
const text = (value) => (typeof value === "string" ? value.trim() : "");

export function mergeData(input) {
    const source = input && typeof input === "object" && !Array.isArray(input) ? input : {};
    return {
        video_url: text(source.video_url),
        poster_url: text(source.poster_url) || PLACEHOLDER,
        line1: text(source.line1),
        line2: text(source.line2),
    };
}

export const STYLES = `<style>
.wb-section{position:relative;display:flex;align-items:center;justify-content:center;width:100%;max-width:1600px;margin:0 auto;aspect-ratio:7 / 1;overflow:hidden;box-sizing:border-box;background-color:#0f1b33;}
.wb-media{position:absolute;top:0;left:0;display:block;width:100%;height:100%;object-fit:cover;object-position:center;}
.wb-shade{position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(180deg,rgba(15,27,51,0.35) 0%,rgba(15,27,51,0.55) 100%);}
.wb-content{position:relative;z-index:5;max-width:900px;box-sizing:border-box;padding-top:1rem;padding-bottom:1rem;padding-left:clamp(1rem,3vw,2rem);padding-right:clamp(1rem,3vw,2rem);text-align:center;}
.wb-line1{margin:0 0 0.25rem;font-size:clamp(1.0625rem,2.2vw,1.5rem);font-weight:500;line-height:1.3;color:#fff;}
.wb-line2{margin:0;font-size:clamp(1.375rem,3.5vw,2.25rem);font-weight:800;line-height:1.25;color:#fff;}
@media(max-width:1100px){.wb-section{aspect-ratio:3 / 1;}}
@media(max-width:640px){.wb-section{aspect-ratio:16 / 9;}}
</style>`;

const LOCKED = 'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false"';

export function buildHTML(input) {
    const data = mergeData(input);
    const hasText = Boolean(data.line1 || data.line2);
    const poster = `<img src="${esc(data.poster_url)}" alt="" class="wb-media" ${LOCKED}>`;
    const video = data.video_url
        ? `<video src="${esc(data.video_url)}" class="wb-media" autoplay muted loop playsinline disablepictureinpicture disableremoteplayback tabindex="-1" aria-hidden="true" data-gjs-type="${VIDEO_TYPE}" ${LOCKED}></video>`
        : "";
    const shade = hasText ? `<div class="wb-shade" ${LOCKED}></div>` : "";
    const content = hasText
        ? `<div class="wb-content" ${LOCKED}>${data.line1 ? `<p class="wb-line1">${esc(data.line1)}</p>` : ""}${data.line2 ? `<p class="wb-line2">${esc(data.line2)}</p>` : ""}</div>`
        : "";

    return `<section class="wb-section" ${LOCKED}>${poster}${video}${shade}${content}</section>`;
}

export const buildContent = (input) => buildHTML(input) + STYLES;

export function readConfig(component) {
    const raw = component.getAttributes()["data-wide-banner-config"];
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function applyConfig(editor, component, rawData) {
    const data = mergeData(rawData);
    const rules = editor.Css.getAll();
    rules.filter((rule) => rule.selectorsToString().includes(".wb-")).forEach((rule) => rules.remove(rule));

    component.addAttributes({
        "data-wide-banner-config": JSON.stringify(data),
        "data-wide-banner-version": VERSION,
    });
    component.components(buildContent(data));
    return data;
}