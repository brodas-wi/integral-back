export const COMPONENT_TYPE = "card-table-component";
export const CARD_TABLE_VERSION = "2";
export const MAX_COLS = 8;
export const MAX_ROWS = 30;
export const CELL_KINDS = ["text", "badge", "check"];
export const COLORS = ["blue", "orange"];
export const ALIGNS = ["left", "center", "right"];
export const FIRST_WIDTHS = [1, 2, 3];

const pick = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const createColumn = (index) => ({
    text: `Columna ${index + 1}`,
    color: index % 2 === 0 ? "blue" : "orange",
    headAlign: "center",
    cellAlign: "center",
});

export const createCell = () => ({ text: "", kind: "text" });

export function createDefaultData(cols = 3, rows = 5) {
    return {
        title: "Título de la tabla",
        showTitle: true,
        firstColumnWidth: 2,
        columns: Array.from({ length: cols }, (_, index) => createColumn(index)),
        rows: Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => createCell()),
        ),
    };
}

function normalizeColumn(column, index) {
    const source = column && typeof column === "object" ? column : {};
    const fallback = createColumn(index);
    return {
        text: typeof source.text === "string" ? source.text : fallback.text,
        color: pick(source.color, COLORS, fallback.color),
        headAlign: pick(source.headAlign ?? source.align, ALIGNS, "center"),
        cellAlign: pick(source.cellAlign ?? source.align, ALIGNS, "center"),
    };
}

function normalizeCell(cell) {
    const source = cell && typeof cell === "object" ? cell : {};
    const kind = CELL_KINDS.includes(source.kind)
        ? source.kind
        : source.isBadge
            ? "badge"
            : "text";
    return { text: typeof source.text === "string" ? source.text : "", kind };
}

export function mergeData(input) {
    if (!input || typeof input !== "object") return createDefaultData();

    const rawColumns = Array.isArray(input.columns) ? input.columns : [];
    const requested = Number.parseInt(input.cols, 10);
    const cols = clamp(rawColumns.length || requested || 3, 1, MAX_COLS);
    const columns = Array.from({ length: cols }, (_, index) =>
        normalizeColumn(rawColumns[index], index),
    );

    const rawRows =
        Array.isArray(input.rows) && input.rows.length
            ? input.rows
            : createDefaultData(cols).rows;
    const rows = rawRows
        .slice(0, MAX_ROWS)
        .map((row) =>
            Array.from({ length: cols }, (_, index) =>
                normalizeCell(Array.isArray(row) ? row[index] : undefined),
            ),
        );

    return {
        title: typeof input.title === "string" ? input.title : "",
        showTitle: input.showTitle !== false,
        firstColumnWidth: pick(Number(input.firstColumnWidth), FIRST_WIDTHS, 1),
        columns,
        rows,
    };
}