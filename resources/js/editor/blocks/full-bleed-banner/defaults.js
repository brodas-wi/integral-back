export const COMPONENT_TYPE = "full-bleed-banner-component";
export const FULL_BLEED_VERSION = "2";
export const MAX_TITLE = 160;
export const MAX_BUTTON = 60;
export const ALIGNS = ["left", "right"];

export const DEFAULT_DATA = {
    image_url: "",
    title: "El banco que impulsa tus ideas y acompaña tu crecimiento.",
    button_label: "Solicitar información",
    button_href: "#",
    align: "left",
};

const text = (value, fallback, max) =>
    typeof value === "string" ? value.trim().slice(0, max) : fallback;

export function mergeData(input) {
    const source =
        input && typeof input === "object" && !Array.isArray(input) ? input : {};
    return {
        image_url: text(source.image_url, DEFAULT_DATA.image_url, 2000),
        title: text(source.title, DEFAULT_DATA.title, MAX_TITLE),
        button_label: text(source.button_label, DEFAULT_DATA.button_label, MAX_BUTTON),
        button_href: text(source.button_href, DEFAULT_DATA.button_href, 2000) || "#",
        align: ALIGNS.includes(source.align) ? source.align : DEFAULT_DATA.align,
    };
}