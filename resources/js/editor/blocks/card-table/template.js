import { CARD_TABLE_VERSION, mergeData } from "./defaults";
import { CARD_TABLE_STYLES } from "./styles";
import { clone, esc } from "./utils";

const CHECK_ICON =
    '<svg class="ct-check" viewBox="0 0 24 24" role="img" aria-label="Incluido"><path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const formatText = (text) =>
    esc(text)
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\r?\n/g, "<br>");

const gridClass = (data) => {
    const cols = data.columns.length;
    const first = cols > 1 && data.firstColumnWidth > 1 ? ` ct-first-${data.firstColumnWidth}` : "";
    return `ct-cols-${cols}${first}`;
};

const cellContent = (cell) => {
    if (cell.kind === "check") return CHECK_ICON;
    if (cell.kind === "badge") return `<span class="ct-badge">${formatText(cell.text)}</span>`;
    return `<span class="ct-value">${formatText(cell.text)}</span>`;
};

export function buildCardTableHTML(input) {
    const data = mergeData(input);
    const grid = gridClass(data);

    const title =
        data.showTitle && data.title ? `<h3 class="ct-title">${esc(data.title)}</h3>` : "";

    const head = data.columns
        .map(
            (column) =>
                `<div class="ct-head ct-${column.color} ct-align-${column.headAlign}">${esc(column.text)}</div>`,
        )
        .join("");

    const rows = data.rows
        .map((row) => {
            const cells = row
                .map((cell, index) => {
                    const column = data.columns[index];
                    return `<div class="ct-cell ct-${column.color} ct-align-${column.cellAlign}" data-label="${esc(column.text)}">${cellContent(cell)}</div>`;
                })
                .join("");
            return `<div class="ct-card ${grid}">${cells}</div>`;
        })
        .join("");

    return `<div class="ct-wrap">${title}<div class="ct-head-row ${grid}">${head}</div>${rows}</div>`;
}

export const buildCardTableContent = (input) =>
    buildCardTableHTML(input) + CARD_TABLE_STYLES;

export function readCardTableConfig(component) {
    const raw = component.getAttributes()["data-card-table-config"];
    if (raw) {
        try {
            return JSON.parse(raw);
        } catch {
            return component.get("cardTableData") || null;
        }
    }
    return component.get("cardTableData") || null;
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

function purgeCardTableRules(editor) {
    const rules = editor.Css.getAll();
    rules
        .filter((rule) => rule.selectorsToString().includes(".ct-"))
        .forEach((rule) => rules.remove(rule));
}

export function applyCardTableConfig(editor, component, rawData) {
    const data = mergeData(rawData);

    purgeCardTableRules(editor);
    component.set("cardTableData", clone(data));
    component.addAttributes({
        "data-card-table-config": JSON.stringify(data),
        "data-card-table-version": CARD_TABLE_VERSION,
    });
    component.components(buildCardTableContent(data));
    lockTree(component);

    return data;
}