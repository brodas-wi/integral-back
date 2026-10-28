import { MAP_VERSION, mergeData } from "./defaults";
import { MAP_SCRIPT } from "./script";
import { MAP_STYLES } from "./styles";
import { esc } from "./utils";

const LOCKED =
    'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false"';

const filterHtml = (index, label, options) =>
    `<div class="mp-filter" data-filter-index="${index}"><button type="button" class="mp-filter-btn" data-filter-toggle="${index}" aria-haspopup="listbox" aria-expanded="false"><span class="mp-filter-label" data-filter-label="${index}">${label}</span><span class="mp-filter-arrow" aria-hidden="true"></span></button><div class="mp-filter-dropdown">${options}</div></div>`;

const TYPE_OPTIONS =
    '<button type="button" class="mp-filter-option mp-selected" data-type="">Todos</button><button type="button" class="mp-filter-option" data-type="agency">Agencias</button><button type="button" class="mp-filter-option" data-type="payment_point">Puntos de pago</button>';

const LOADING_OPTION =
    '<button type="button" class="mp-filter-option" disabled>Cargando...</button>';

export function buildMapFilterHTML(input) {
    const data = mergeData(input);

    const stats = data.statsText
        ? `<p class="mp-stats" data-mp-stats data-mp-template="${esc(data.statsText)}" ${LOCKED}>Cargando disponibilidad de agencias y puntos de pago...</p>`
        : "";
    const title = data.title
        ? `<h2 class="mp-title" ${LOCKED}>${esc(data.title)}</h2>`
        : "";

    return `<div class="mp-container" ${LOCKED}>${stats}${title}<div class="mp-filters" data-mp-filters ${LOCKED}>${filterHtml(0, "Agencias / Puntos de pago", TYPE_OPTIONS)}${filterHtml(1, "Departamento", LOADING_OPTION)}${filterHtml(2, "Seleccione una ubicación", LOADING_OPTION)}</div><div class="mp-map-wrapper" ${LOCKED}><div class="mp-map" data-mp-map></div><div class="mp-map-overlay" data-mp-overlay></div></div></div>`;
}

export const buildMapFilterContent = (input) => buildMapFilterHTML(input) + MAP_STYLES;

export function readMapConfig(component) {
    const raw = component.getAttributes()["data-map-config"];
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

function purgeMapRules(editor) {
    const rules = editor.Css.getAll();
    rules
        .filter((rule) => rule.selectorsToString().includes(".mp-"))
        .forEach((rule) => rules.remove(rule));
}

export function runScript(component) {
    setTimeout(() => {
        const el = component.getEl();
        const win = el?.ownerDocument?.defaultView;
        if (!el || !win) return;
        try {
            new win.Function(component.getScriptString()).call(el);
        } catch (error) {
            console.warn("[MapFilter] No se pudo iniciar el mapa:", error);
        }
    }, 0);
}

export function applyMapConfig(editor, component, rawData) {
    const data = mergeData(rawData);

    purgeMapRules(editor);
    component.set("script", MAP_SCRIPT);
    component.addAttributes({
        "data-map-config": JSON.stringify(data),
        "data-map-version": MAP_VERSION,
    });
    component.components(buildMapFilterContent(data));
    lockTree(component);
    runScript(component);

    return data;
}