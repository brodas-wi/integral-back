import { assetUrl } from "@/utils/url.js";

export const COMPONENT_TYPE = "video-banner-component";
export const VIDEO_TYPE = "vb-video-media";
export const BANNER_VERSION = "2";
export const PLACEHOLDER = assetUrl("images/placeholder.svg");

export const DEFAULT_DATA = {
    video_url: "",
    poster_url: PLACEHOLDER,
    show_gradient: false,
    show_radius: true,
};

export function mergeData(input) {
    const source = input && typeof input === "object" ? input : {};
    return {
        video_url: String(source.video_url ?? DEFAULT_DATA.video_url).trim(),
        poster_url: String(source.poster_url || "").trim() || PLACEHOLDER,
        show_gradient: Boolean(source.show_gradient ?? DEFAULT_DATA.show_gradient),
        show_radius: source.show_radius !== false,
    };
}