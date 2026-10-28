import { MAX_COLS, MAX_ROWS, mergeData } from "./defaults";
import { ensureModalStyles } from "./modal-styles";
import {
    addColumn,
    addRow,
    duplicateRow,
    moveColumn,
    moveRow,
    removeColumn,
    removeRow,
} from "./state";
import {
    applyCardTableConfig,
    buildCardTableContent,
    readCardTableConfig,
} from "./template";
import { esc, getByPath, setByPath } from "./utils";

const TABS = [
    { id: "general", icon: "ri-settings-3-line", label: "General" },
    { id: "columns", icon: "ri-layout-column-line", label: "Columnas" },
    { id: "rows", icon: "ri-table-line", label: "Filas y celdas" },
    { id: "preview", icon: "ri-eye-line", label: "Vista previa" },
];

const COLOR_OPTIONS = [
    ["blue", "Azul"],
    ["orange", "Naranja", "ctm-seg-orange"],
];
const ALIGN_OPTIONS = [
    ["left", "Izquierda"],
    ["center", "Centro"],
    ["right", "Derecha"],
];
const KIND_OPTIONS = [
    ["text", "Texto"],
    ["badge", "Badge"],
    ["check", "Check"],
];
const WIDTH_OPTIONS = [
    [1, "Igual"],
    [2, "Ancha (2×)"],
    [3, "Muy ancha (3×)"],
];

const segmented = (path, options, type = "string") =>
    `<div class="ctm-seg">${options
        .map(
            ([value, label, className = ""]) =>
                `<button type="button" class="ctm-seg-btn ${className}" data-action="set" data-path="${path}" data-value="${value}" data-type="${type}">${label}</button>`,
        )
        .join("")}</div>`;

const field = (label, content) =>
    `<div class="ctm-field"><label class="ctm-label">${label}</label>${content}</div>`;

const iconButton = ({ action, index, offset = "", icon, title, disabled = false, danger = false }) =>
    `<button type="button" class="ctm-icon-btn${danger ? " ctm-danger" : ""}" data-action="${action}" data-index="${index}" data-offset="${offset}" title="${title}" ${disabled ? "disabled" : ""}><i class="${icon}"></i></button>`;

const columnCard = (column, index, total) => `
<div class="ctm-item">
    <div class="ctm-item-head">
        <span class="ctm-num">Columna ${index + 1}</span>
        <input type="text" class="ctm-input ctm-grow" data-bind="columns.${index}.text" placeholder="Nombre de la columna">
        ${iconButton({ action: "move-column", index, offset: -1, icon: "ri-arrow-left-s-line", title: "Mover a la izquierda", disabled: index === 0 })}
        ${iconButton({ action: "move-column", index, offset: 1, icon: "ri-arrow-right-s-line", title: "Mover a la derecha", disabled: index === total - 1 })}
        ${iconButton({ action: "remove-column", index, icon: "ri-delete-bin-line", title: "Eliminar columna", disabled: total <= 1, danger: true })}
    </div>
    <div class="ctm-opts">
        ${field("Color", segmented(`columns.${index}.color`, COLOR_OPTIONS))}
        ${field("Alinear título", segmented(`columns.${index}.headAlign`, ALIGN_OPTIONS))}
        ${field("Alinear datos", segmented(`columns.${index}.cellAlign`, ALIGN_OPTIONS))}
    </div>
</div>`;

const cellEditor = (rowIndex, colIndex) => {
    const path = `rows.${rowIndex}.${colIndex}`;
    return `
<div class="ctm-cell" data-cell="${rowIndex}.${colIndex}">
    <span class="ctm-cell-label" data-col-label></span>
    ${segmented(`${path}.kind`, KIND_OPTIONS)}
    <textarea class="ctm-textarea" data-bind="${path}.text" rows="2" placeholder="Texto..."></textarea>
    <div class="ctm-check-preview"><i class="ri-check-line"></i> Muestra un check</div>
</div>`;
};

const rowCard = (row, index, columns, total) => `
<div class="ctm-item">
    <div class="ctm-item-head">
        <span class="ctm-num">Fila ${index + 1}</span>
        <span class="ctm-grow"></span>
        ${iconButton({ action: "move-row", index, offset: -1, icon: "ri-arrow-up-s-line", title: "Subir fila", disabled: index === 0 })}
        ${iconButton({ action: "move-row", index, offset: 1, icon: "ri-arrow-down-s-line", title: "Bajar fila", disabled: index === total - 1 })}
        ${iconButton({ action: "duplicate-row", index, icon: "ri-file-copy-line", title: "Duplicar fila" })}
        ${iconButton({ action: "remove-row", index, icon: "ri-delete-bin-line", title: "Eliminar fila", disabled: total <= 1, danger: true })}
    </div>
    <div class="ctm-cells" style="grid-template-columns:repeat(${columns.length},minmax(170px,1fr));">
        ${row.map((_, colIndex) => cellEditor(index, colIndex)).join("")}
    </div>
</div>`;

const buildPanels = () => ({
    general: `
<div class="ctm-card">
    <label class="ctm-label">Título de la tabla</label>
    <div class="ctm-row">
        <input type="text" class="ctm-input ctm-grow" data-bind="title" placeholder="Texto del título">
        <label class="ctm-row">
            <span class="ctm-switch"><input type="checkbox" data-bind="showTitle"><span class="ctm-switch-track"></span></span>
            <span class="ctm-switch-label">Mostrar</span>
        </label>
    </div>
</div>
<div class="ctm-card">
    <label class="ctm-label">Ancho de la primera columna</label>
    <div class="ctm-stack" style="display:flex;flex-direction:column;gap:0.625rem;">
        ${segmented("firstColumnWidth", WIDTH_OPTIONS, "number")}
        <p class="ctm-hint">Úsala ancha cuando la primera columna lleva descripciones largas y el resto solo valores cortos.</p>
    </div>
</div>`,
    columns: `
<p class="ctm-hint">Máximo ${MAX_COLS} columnas. Cada columna define su color, el nombre del encabezado y la alineación de título y datos.</p>
<div class="ctm-list" data-list="columns"></div>
<button type="button" class="ctm-btn-add" data-action="add-column"><i class="ri-add-line"></i> Agregar columna</button>`,
    rows: `
<p class="ctm-hint">Máximo ${MAX_ROWS} filas. Cada celda puede ser texto, badge o check. Usa <code>**texto**</code> para negrita y Enter para un salto de línea.</p>
<div class="ctm-list" data-list="rows"></div>
<button type="button" class="ctm-btn-add" data-action="add-row"><i class="ri-add-line"></i> Agregar fila</button>`,
    preview: `<div class="ctm-preview" data-preview></div>`,
});

const buildShell = () => {
    const panels = buildPanels();
    const tabs = TABS.map(
        (tab, index) =>
            `<button type="button" class="ctm-tab${index === 0 ? " active" : ""}" data-action="tab" data-tab="${tab.id}"><i class="${tab.icon}"></i> ${tab.label}</button>`,
    ).join("");
    const bodies = TABS.map(
        (tab, index) =>
            `<div class="ctm-panel${index === 0 ? " active" : ""}" data-panel="${tab.id}">${panels[tab.id]}</div>`,
    ).join("");

    return `
<div class="ctm-header">
    <div class="ctm-header-left"><i class="ri-layout-grid-line"></i><h2>Administrar tabla de tarjetas</h2></div>
    <button type="button" class="ctm-close" data-action="close"><i class="ri-close-line"></i></button>
</div>
<div class="ctm-tabs">${tabs}</div>
<div class="ctm-body">${bodies}</div>
<div class="ctm-footer">
    <div class="ctm-footer-group">
        <button type="button" class="ctm-btn-backup" data-action="backup"><i class="ri-download-2-line"></i> Respaldar</button>
        <label class="ctm-btn-restore"><i class="ri-upload-2-line"></i> Restaurar<input type="file" accept=".json,application/json" data-restore hidden></label>
    </div>
    <button type="button" class="ctm-btn-cancel" data-action="close">Cancelar</button>
    <button type="button" class="ctm-btn-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;
};

function downloadBackup(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tabla-tarjetas-backup-${stamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function confirmDialog({ icon, iconColor, title, message, detail, confirmLabel, confirmColor, showCancel = true }) {
    return new Promise((resolve) => {
        const element = document.createElement("div");
        element.className = "ctm-confirm-overlay";
        element.innerHTML = `<div class="ctm-confirm-modal"><div class="ctm-confirm-header"><i class="${icon}" style="color:${iconColor};"></i><h3>${esc(title)}</h3></div><div class="ctm-confirm-body"><p>${esc(message)}</p>${detail ? `<span class="ctm-confirm-filename"><i class="ri-file-code-line"></i>${esc(detail)}</span>` : ""}</div><div class="ctm-confirm-footer">${showCancel ? '<button type="button" class="ctm-confirm-cancel">Cancelar</button>' : ""}<button type="button" class="ctm-confirm-ok" style="background:${confirmColor};">${esc(confirmLabel)}</button></div></div>`;
        const finish = (value) => {
            element.remove();
            resolve(value);
        };
        element.querySelector(".ctm-confirm-ok").onclick = () => finish(true);
        const cancel = element.querySelector(".ctm-confirm-cancel");
        if (cancel) cancel.onclick = () => finish(false);
        document.body.appendChild(element);
    });
}

export function showCardTableModal(editor, component) {
    ensureModalStyles();
    document.getElementById("card-table-config-modal")?.remove();

    let state = mergeData(readCardTableConfig(component));

    const overlay = document.createElement("div");
    overlay.id = "card-table-config-modal";
    overlay.className = "ctm-overlay";
    const modal = document.createElement("div");
    modal.className = "ctm-modal";
    modal.innerHTML = buildShell();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const lists = {
        columns: modal.querySelector('[data-list="columns"]'),
        rows: modal.querySelector('[data-list="rows"]'),
    };

    const hydrate = () => {
        modal.querySelectorAll("[data-bind]").forEach((input) => {
            const value = getByPath(state, input.dataset.bind);
            if (input.type === "checkbox") {
                input.checked = Boolean(value);
            } else if (input.value !== String(value ?? "")) {
                input.value = value ?? "";
            }
        });

        modal.querySelectorAll("[data-action='set']").forEach((button) => {
            const current = getByPath(state, button.dataset.path);
            button.classList.toggle("active", String(current) === button.dataset.value);
        });

        modal.querySelectorAll("[data-cell]").forEach((cell) => {
            const [rowIndex, colIndex] = cell.dataset.cell.split(".").map(Number);
            const entry = state.rows[rowIndex]?.[colIndex];
            const column = state.columns[colIndex];
            if (!entry || !column) return;
            cell.classList.toggle("ctm-cell-check", entry.kind === "check");
            cell.dataset.color = column.color;
            cell.querySelector("[data-col-label]").textContent =
                column.text || `Columna ${colIndex + 1}`;
        });

        modal.querySelector('[data-action="add-column"]').disabled =
            state.columns.length >= MAX_COLS;
        modal.querySelector('[data-action="add-row"]').disabled =
            state.rows.length >= MAX_ROWS;
    };

    const renderAll = () => {
        lists.columns.innerHTML = state.columns
            .map((column, index) => columnCard(column, index, state.columns.length))
            .join("");
        lists.rows.innerHTML = state.rows
            .map((row, index) => rowCard(row, index, state.columns, state.rows.length))
            .join("");
        hydrate();
    };

    const renderPreview = () => {
        modal.querySelector("[data-preview]").innerHTML = buildCardTableContent(state);
    };

    const onKeydown = (event) => {
        if (event.key === "Escape" && !document.querySelector(".ctm-confirm-overlay")) close();
    };

    const restoreFrom = async (input) => {
        const file = input.files && input.files[0];
        input.value = "";
        if (!file) return;

        let parsed = null;
        try {
            parsed = JSON.parse(await file.text());
        } catch {
            parsed = null;
        }

        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            await confirmDialog({
                icon: "ri-error-warning-line",
                iconColor: "#ef4444",
                title: "Archivo inválido",
                message: "El archivo seleccionado no es un JSON válido.",
                confirmLabel: "Cerrar",
                confirmColor: "#ef4444",
                showCancel: false,
            });
            return;
        }

        const accepted = await confirmDialog({
            icon: "ri-refresh-line",
            iconColor: "#E97300",
            title: "Restaurar configuración",
            message: "Se reemplazará la configuración actual de la tabla con la del respaldo. Los cambios se aplican a la tabla cuando pulses «Aplicar cambios».",
            detail: file.name,
            confirmLabel: "Sí, restaurar",
            confirmColor: "#E97300",
        });
        if (!accepted) return;

        state = mergeData(parsed);
        renderAll();
        renderPreview();
    };

    const close = () => {
        document.removeEventListener("keydown", onKeydown);
        overlay.remove();
    };

    const run = (operation) => {
        if (operation()) renderAll();
    };

    const index = (el) => Number(el.dataset.index);
    const offset = (el) => Number(el.dataset.offset);

    const actions = {
        close,
        save: () => {
            applyCardTableConfig(editor, component, state);
            close();
        },
        backup: () => downloadBackup(mergeData(state)),
        tab: (el) => {
            modal
                .querySelectorAll(".ctm-tab")
                .forEach((button) => button.classList.toggle("active", button === el));
            modal
                .querySelectorAll(".ctm-panel")
                .forEach((panel) =>
                    panel.classList.toggle("active", panel.dataset.panel === el.dataset.tab),
                );
            if (el.dataset.tab === "preview") renderPreview();
        },
        set: (el) => {
            const value = el.dataset.type === "number" ? Number(el.dataset.value) : el.dataset.value;
            setByPath(state, el.dataset.path, value);
            hydrate();
        },
        "add-column": () => run(() => addColumn(state)),
        "remove-column": (el) => run(() => removeColumn(state, index(el))),
        "move-column": (el) => run(() => moveColumn(state, index(el), offset(el))),
        "add-row": () => run(() => addRow(state)),
        "remove-row": (el) => run(() => removeRow(state, index(el))),
        "duplicate-row": (el) => run(() => duplicateRow(state, index(el))),
        "move-row": (el) => run(() => moveRow(state, index(el), offset(el))),
    };

    modal.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-action]");
        if (!trigger || trigger.disabled) return;
        const handler = actions[trigger.dataset.action];
        if (handler) handler(trigger);
    });

    const syncBound = (event) => {
        const path = event.target.dataset ? event.target.dataset.bind : null;
        if (!path) return;
        setByPath(
            state,
            path,
            event.target.type === "checkbox" ? event.target.checked : event.target.value,
        );
        hydrate();
    };

    modal.addEventListener("input", syncBound);
    modal.addEventListener("change", (event) => {
        if (event.target.matches("[data-restore]")) restoreFrom(event.target);
        else syncBound(event);
    });

    overlay.addEventListener("mousedown", (event) => {
        if (event.target === overlay) close();
    });
    document.addEventListener("keydown", onKeydown);

    renderAll();
}