export const COMPONENT_TYPE = "hero-video-component";
export const HERO_VIDEO_VERSION = "2";
export const MAX_TITLE = 160;
export const MAX_SUBTITLE = 200;
export const MAX_BUTTON = 60;

export const DEFAULT_DATA = {
    video_url: "",
    poster_url: "",
    title: "Haz crecer tu negocio",
    subtitle: "Empieza hoy",
    button_label: "Ver más",
    button_href: "#",
};

const text = (value, fallback, max) =>
    typeof value === "string" ? value.trim().slice(0, max) : fallback;

export function mergeData(input) {
    const source =
        input && typeof input === "object" && !Array.isArray(input) ? input : {};
    return {
        video_url: text(source.video_url, DEFAULT_DATA.video_url, 2000),
        poster_url: text(source.poster_url, DEFAULT_DATA.poster_url, 2000),
        title: text(source.title, DEFAULT_DATA.title, MAX_TITLE),
        subtitle: text(source.subtitle, DEFAULT_DATA.subtitle, MAX_SUBTITLE),
        button_label: text(source.button_label, DEFAULT_DATA.button_label, MAX_BUTTON),
        button_href: text(source.button_href, DEFAULT_DATA.button_href, 2000) || "#",
    };
}