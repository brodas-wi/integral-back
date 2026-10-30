export const COMPONENT_TYPE = "map-filter-component";
export const MAP_VERSION = "3";
export const MAX_TITLE = 120;
export const MAX_STATS = 300;

export const DEFAULT_DATA = {
    title: "Horarios y Agencias:",
    statsText:
        "{agencias} agencias y {puntos} puntos de pago activos distribuidos en todo el país.",
};

const text = (value, fallback, max) =>
    typeof value === "string" ? value.trim().slice(0, max) : fallback;

export function mergeData(input) {
    const source =
        input && typeof input === "object" && !Array.isArray(input) ? input : {};
    return {
        title: text(source.title, DEFAULT_DATA.title, MAX_TITLE),
        statsText: text(source.statsText, DEFAULT_DATA.statsText, MAX_STATS),
    };
}