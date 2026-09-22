const cardTableBlockIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="10" height="2" rx="1" fill="#003B71"/>
    <rect x="14" y="3" width="8" height="2" rx="1" fill="#003B71"/>
    <rect x="24" y="3" width="6" height="2" rx="1" fill="#E97300"/>
    <rect x="2" y="9" width="28" height="6" rx="2" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.6"/>
    <line x1="13" y1="10" x2="13" y2="14" stroke="#003B71" stroke-width="0.8"/>
    <line x1="23" y1="10" x2="23" y2="14" stroke="#E97300" stroke-width="0.8"/>
    <rect x="2" y="17" width="28" height="6" rx="2" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.6"/>
    <line x1="13" y1="18" x2="13" y2="22" stroke="#003B71" stroke-width="0.8"/>
    <line x1="23" y1="18" x2="23" y2="22" stroke="#E97300" stroke-width="0.8"/>
</svg>`;

const CT_COLORS = {
    blue: {
        text: "#003B71",
        line: "#003B71",
        badgeBg: "#003B71",
        badgeText: "#ffffff",
    },
    orange: {
        text: "#E97300",
        line: "#E97300",
        badgeBg: "#E97300",
        badgeText: "#ffffff",
    },
};

function ctDefaultColumn(i) {
    return {
        text: `Columna ${i + 1}`,
        headAlign: "center",
        cellAlign: "center",
        color: i === 0 ? "blue" : i % 2 === 0 ? "blue" : "orange",
    };
}

function ctDefaultCell() {
    return { text: "", isBadge: false };
}

function defaultCardTableData(cols = 3, rows = 5) {
    return {
        title: "Título de la tabla",
        showTitle: true,
        cols,
        columns: Array.from({ length: cols }, (_, i) => ctDefaultColumn(i)),
        rows: Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ctDefaultCell()),
        ),
    };
}

function buildCardTableHTML(data) {
    const cols = data.cols;
    const columns = data.columns;

    let html = "";

    if (data.showTitle && data.title) {
        html += `<h3 class="ct-title">${data.title}</h3>`;
    }

    html += `<div class="ct-headrow" style="grid-template-columns:repeat(${cols},1fr);">`;
    columns.forEach((col) => {
        const c = CT_COLORS[col.color] || CT_COLORS.blue;
        const headAlign = col.headAlign || col.align || "center";
        html += `<div class="ct-head" style="color:${c.text};text-align:${headAlign};">${col.text || ""}</div>`;
    });
    html += `</div>`;

    data.rows.forEach((row) => {
        html += `<div class="ct-card" style="grid-template-columns:repeat(${cols},1fr);">`;
        row.forEach((cell, ci) => {
            const col = columns[ci] || ctDefaultColumn(ci);
            const c = CT_COLORS[col.color] || CT_COLORS.blue;
            const hasLine = ci > 0;
            const cellStyle = hasLine
                ? `border-left:2px solid ${c.line};`
                : "";
            const align = col.cellAlign || col.align || "center";
            const inner = cell.isBadge
                ? `<span class="ct-badge" style="background:${c.badgeBg};color:${c.badgeText};">${cell.text || ""}</span>`
                : `<span style="color:${c.text};font-weight:700;">${cell.text || ""}</span>`;
            html += `<div class="ct-cell" style="justify-content:${align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center"};text-align:${align};${cellStyle}">${inner}</div>`;
        });
        html += `</div>`;
    });

    return html;
}

const CT_STATIC_STYLES = `
<style>
.ct-wrap{width:100%;display:flex;flex-direction:column;gap:0.75rem;font-family:'Poppins',sans-serif;}
.ct-title{margin:0 0 0.5rem;font-size:1.6rem;font-weight:800;color:#E97300;text-align:center;}
.ct-headrow{display:grid;gap:0.75rem;padding:0 1.25rem;}
.ct-head{font-size:0.95rem;font-weight:700;letter-spacing:0.01em;}
.ct-card{display:grid;gap:0.75rem;background:#ffffff;border-radius:1rem;box-shadow:0 2px 10px 0 rgba(15,23,42,0.08);padding:1rem 1.25rem;align-items:center;}
.ct-cell{display:flex;align-items:center;font-size:0.95rem;min-height:1.5rem;padding-left:0.75rem;}
.ct-cell:first-child{padding-left:0;}
.ct-badge{display:inline-block;padding:0.3rem 0.9rem;border-radius:9999px;font-size:0.85rem;font-weight:700;white-space:nowrap;}
@media(max-width:640px){
    .ct-headrow{display:none;}
    .ct-card{grid-template-columns:1fr !important;gap:0.4rem;}
    .ct-cell{padding-left:0;border-left:none !important;justify-content:space-between !important;}
}
</style>`;

function buildCardTableWrapper(data) {
    return `<div class="ct-wrap">${CT_STATIC_STYLES}${buildCardTableHTML(data)}</div>`;
}

function ctRebuildComponentHTML(component) {
    const data = component.get("cardTableData");
    if (!data) return;
    component.addAttributes({
        "data-card-table-config": JSON.stringify(data),
    });
    component.components(buildCardTableWrapper(data));
    lockComponentTree(component);
}

function lockComponentTree(component) {
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
        lockComponentTree(child);
    });
}

const CT_MODAL_STYLES = `
.ctam-overlay{position:fixed;inset:0;z-index:999999;display:none;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
.ctam-overlay.open{display:flex;}
.ctam-modal{background:#ffffff;border-radius:0.75rem;width:100%;max-width:1080px;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
.ctam-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#ffffff;flex-shrink:0;}
.ctam-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
.ctam-modal-header-left i{font-size:1.125rem;color:#003B71;}
.ctam-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.ctam-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:9999px;border:none;background:#f1f5f9;color:#94a3b8;cursor:pointer;transition:background 0.15s,color 0.15s;}
.ctam-modal-close:hover{background:#f1f5f9;color:#475569;}
.ctam-modal-close i{font-size:1.125rem;}
.ctam-toolbar{display:flex;flex-wrap:wrap;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;background:#f8fafc;flex-shrink:0;align-items:flex-end;}
.ctam-toolbar-group{display:flex;flex-direction:column;gap:0.375rem;}
.ctam-toolbar-label{font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;}
.ctam-modal-input,.ctam-modal-select{padding:0.5rem 1rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:9999px;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;appearance:none;-webkit-appearance:none;-moz-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2394a3b8'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 0.65rem center;background-size:1rem;}
.ctam-modal-input{background-image:none;}
.ctam-modal-input:focus,.ctam-modal-select:focus{border-color:#003B71;}
.ctam-toolbar-checkbox{display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;font-weight:500;color:#334155;cursor:pointer;user-select:none;padding:0.5rem 1rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:9999px;}
.ctam-toolbar-checkbox input{accent-color:#003B71;cursor:pointer;width:1rem;height:1rem;}
.ctam-btn-rebuild{padding:0.5rem 1.1rem;background:#ffffff;border:2px solid #003B71;border-radius:9999px;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s,color 0.15s;}
.ctam-btn-rebuild:hover{background:#003B71;color:#fff;}
.ctam-body{flex:1;overflow-y:auto;padding:1.25rem;background:#f8fafc;}
.ctam-body::-webkit-scrollbar{width:5px;}
.ctam-body::-webkit-scrollbar-track{background:transparent;}
.ctam-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
.ctam-table-wrap{overflow-x:auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
.ctam-table{width:100%;border-collapse:collapse;font-size:0.8rem;table-layout:fixed;}
.ctam-table th,.ctam-table td{border:1.5px solid #e2e8f0;padding:0.5rem;vertical-align:top;min-width:130px;}
.ctam-table th{background:#f8fafc;font-weight:600;color:#334155;text-align:center;}
.ctam-cell-input{width:100%;border:none;outline:none;font-size:0.8rem;background:transparent;resize:vertical;min-height:36px;font-family:inherit;color:#1e293b;box-sizing:border-box;}
.ctam-col-input{width:100%;border:none;outline:none;font-size:0.8rem;font-weight:600;background:transparent;font-family:inherit;color:#1e293b;box-sizing:border-box;text-align:center;margin-bottom:4px;}
.ctam-cell-actions{display:flex;gap:4px;margin-top:6px;flex-wrap:wrap;align-items:center;}
.ctam-cell-btn{padding:3px 10px;border-radius:9999px;font-size:0.65rem;font-weight:600;cursor:pointer;border:1.5px solid;transition:all 0.15s;line-height:1.4;font-family:inherit;}
.ctam-cell-btn:hover{opacity:0.8;}
.ctam-cell-btn-badge{background:transparent;color:#003B71;border-color:#003B71;}
.ctam-cell-btn-badge.active{background:#003B71;color:#fff;border-color:#003B71;}
.ctam-cell.has-badge{background:#fef9ee !important;}
.ctam-color-select,.ctam-head-align-select,.ctam-cell-align-select{width:100%;font-size:0.7rem;padding:0.35rem 1.6rem 0.35rem 0.7rem;margin-top:4px;border:1px solid #e2e8f0;border-radius:9999px;background:#ffffff;color:#1e293b;font-family:inherit;outline:none;appearance:none;-webkit-appearance:none;-moz-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2394a3b8'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 0.5rem center;background-size:0.85rem;cursor:pointer;transition:border-color 0.15s;}
.ctam-color-select:focus,.ctam-head-align-select:focus,.ctam-cell-align-select:focus{border-color:#003B71;}
.ctam-align-label{display:block;font-size:0.6rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.03em;margin-top:6px;}
.ctam-color-swatch{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:4px;vertical-align:middle;}
.ctam-modal-footer{display:flex;align-items:center;justify-content:flex-end;padding:1rem 1.25rem;border-top:1px solid #f1f5f9;background:#ffffff;flex-shrink:0;gap:0.75rem;}
.ctam-btn{padding:0.5rem 1.25rem;border-radius:9999px;font-size:0.875rem;font-weight:600;cursor:pointer;border:2px solid transparent;transition:opacity 0.15s,background 0.15s,border-color 0.15s;display:inline-flex;align-items:center;gap:0.375rem;font-family:inherit;}
.ctam-btn-cancel{background:#ffffff;border-color:#e2e8f0;color:#475569;}
.ctam-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
.ctam-btn-primary{background:#003B71;color:#fff;border-color:#003B71;}
.ctam-btn-primary:hover{background:#002a52;}`;

function createCardTableAdminModal(editor, componentType) {
    if (document.getElementById("card-table-admin-modal")) return;

    const styleEl = document.createElement("style");
    styleEl.id = "card-table-admin-modal-styles";
    styleEl.textContent = CT_MODAL_STYLES;
    document.head.appendChild(styleEl);

    const el = document.createElement("div");
    el.id = "card-table-admin-modal";
    el.className = "ctam-overlay";
    el.innerHTML = `
        <div class="ctam-modal">
            <div class="ctam-modal-header">
                <div class="ctam-modal-header-left">
                    <i class="ri-layout-grid-line"></i>
                    <h2>Administrar tabla de tarjetas</h2>
                </div>
                <button class="ctam-modal-close" id="ctam-close"><i class="ri-close-line"></i></button>
            </div>
            <div class="ctam-toolbar">
                <div class="ctam-toolbar-group">
                    <label class="ctam-toolbar-label">Título de tabla</label>
                    <input type="text" id="ctam-title" placeholder="Texto del título" class="ctam-modal-input" style="width:220px;">
                </div>
                <label class="ctam-toolbar-checkbox">
                    <input type="checkbox" id="ctam-show-title" checked>
                    Mostrar título
                </label>
                <div class="ctam-toolbar-group">
                    <label class="ctam-toolbar-label">Columnas</label>
                    <input type="number" id="ctam-cols" min="1" max="8" value="3" class="ctam-modal-input" style="width:70px;">
                </div>
                <div class="ctam-toolbar-group">
                    <label class="ctam-toolbar-label">Filas</label>
                    <input type="number" id="ctam-rows" min="1" max="30" value="5" class="ctam-modal-input" style="width:70px;">
                </div>
                <button class="ctam-btn-rebuild" id="ctam-rebuild">
                    <i class="ri-refresh-line"></i> Reconstruir
                </button>
            </div>
            <div class="ctam-body">
                <div class="ctam-table-wrap">
                    <table class="ctam-table"><thead id="ctam-thead"></thead><tbody id="ctam-tbody"></tbody></table>
                </div>
            </div>
            <div class="ctam-modal-footer">
                <button class="ctam-btn ctam-btn-cancel" id="ctam-cancel">Cancelar</button>
                <button class="ctam-btn ctam-btn-primary" id="ctam-apply"><i class="ri-check-line"></i> Aplicar cambios</button>
            </div>
        </div>`;
    document.body.appendChild(el);

    let currentComponent = null;
    let tableData = null;

    function syncTitleState() {
        const show = document.getElementById("ctam-show-title").checked;
        const titleInput = document.getElementById("ctam-title");
        titleInput.disabled = !show;
        titleInput.style.opacity = show ? "1" : "0.5";
    }

    function openModal(component) {
        currentComponent = component;
        const raw = component.get("cardTableData");
        tableData = raw
            ? JSON.parse(JSON.stringify(raw))
            : defaultCardTableData(3, 5);

        const cols = tableData.cols || 3;
        tableData.columns = Array.from({ length: cols }, (_, i) => {
            const col = tableData.columns[i] || ctDefaultColumn(i);
            return {
                text: col.text,
                headAlign: col.headAlign || col.align || "center",
                cellAlign: col.cellAlign || col.align || "center",
                color: col.color,
            };
        });
        tableData.rows = tableData.rows.map((row) =>
            Array.from({ length: cols }, (_, ci) => row[ci] || ctDefaultCell()),
        );

        document.getElementById("ctam-title").value = tableData.title || "";
        document.getElementById("ctam-show-title").checked =
            tableData.showTitle !== false;
        document.getElementById("ctam-cols").value = cols;
        document.getElementById("ctam-rows").value = tableData.rows.length;
        syncTitleState();
        renderEditorTable();
        el.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        el.classList.remove("open");
        document.body.style.overflow = "";
        currentComponent = null;
    }

    function collectEditorData() {
        tableData.title = document.getElementById("ctam-title").value.trim();
        tableData.showTitle = document.getElementById("ctam-show-title").checked;
        tableData.cols = parseInt(document.getElementById("ctam-cols").value) || 3;

        tableData.columns = Array.from(
            document.querySelectorAll(".ctam-col-block"),
        ).map((block) => ({
            text: block.querySelector(".ctam-col-input").value,
            headAlign: block.querySelector(".ctam-head-align-select").value,
            cellAlign: block.querySelector(".ctam-cell-align-select").value,
            color: block.querySelector(".ctam-color-select").value,
        }));

        document.querySelectorAll("#ctam-tbody td.ctam-cell").forEach((td) => {
            const ri = parseInt(td.dataset.row);
            const ci = parseInt(td.dataset.col);
            if (tableData.rows[ri]?.[ci]) {
                tableData.rows[ri][ci].text =
                    td.querySelector(".ctam-cell-input")?.value || "";
                tableData.rows[ri][ci].isBadge = td.dataset.isbadge === "1";
            }
        });
    }

    function colorOption(value, label, selected) {
        return `<option value="${value}" ${selected === value ? "selected" : ""}>${label}</option>`;
    }

    function renderEditorTable() {
        const thead = document.getElementById("ctam-thead");
        const tbody = document.getElementById("ctam-tbody");
        const totalCols = tableData.cols;

        thead.innerHTML = `<tr>${tableData.columns
            .map(
                (col, i) => `
            <th>
                <div class="ctam-col-block">
                    <input class="ctam-col-input" value="${col.text || ""}" placeholder="Col ${i + 1}">
                    <label class="ctam-align-label">Alinear título</label>
                    <select class="ctam-head-align-select">
                        <option value="left" ${col.headAlign === "left" ? "selected" : ""}>Izquierda</option>
                        <option value="center" ${col.headAlign === "center" ? "selected" : ""}>Centro</option>
                        <option value="right" ${col.headAlign === "right" ? "selected" : ""}>Derecha</option>
                    </select>
                    <label class="ctam-align-label">Alinear datos</label>
                    <select class="ctam-cell-align-select">
                        <option value="left" ${col.cellAlign === "left" ? "selected" : ""}>Izquierda</option>
                        <option value="center" ${col.cellAlign === "center" ? "selected" : ""}>Centro</option>
                        <option value="right" ${col.cellAlign === "right" ? "selected" : ""}>Derecha</option>
                    </select>
                    <select class="ctam-color-select">
                        ${colorOption("blue", "Azul", col.color)}
                        ${colorOption("orange", "Naranja", col.color)}
                    </select>
                </div>
            </th>`,
            )
            .join("")}</tr>`;

        tbody.innerHTML = tableData.rows
            .map((row, ri) => {
                const cells = Array.from({ length: totalCols }, (_, ci) => {
                    const cell = row[ci] || ctDefaultCell();
                    return `<td class="ctam-cell ${cell.isBadge ? "has-badge" : ""}"
                    data-row="${ri}" data-col="${ci}"
                    data-isbadge="${cell.isBadge ? "1" : "0"}">
                    <textarea class="ctam-cell-input" placeholder="Texto...">${cell.text || ""}</textarea>
                    <div class="ctam-cell-actions">
                        <button type="button" class="ctam-cell-btn ctam-cell-btn-badge ${cell.isBadge ? "active" : ""}"
                            data-action="badge" data-row="${ri}" data-col="${ci}">
                            ${cell.isBadge ? "✓ Badge" : "Badge"}
                        </button>
                    </div>
                </td>`;
                }).join("");
                return `<tr>${cells}</tr>`;
            })
            .join("");

        tbody.querySelectorAll("button[data-action=badge]").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const ri = parseInt(btn.dataset.row);
                const ci = parseInt(btn.dataset.col);
                if (!tableData.rows[ri]?.[ci]) return;
                tableData.rows[ri][ci].isBadge = !tableData.rows[ri][ci].isBadge;
                const td = tbody.querySelector(
                    `td[data-row="${ri}"][data-col="${ci}"]`,
                );
                const isBadge = tableData.rows[ri][ci].isBadge;
                td.dataset.isbadge = isBadge ? "1" : "0";
                td.classList.toggle("has-badge", isBadge);
                btn.classList.toggle("active", isBadge);
                btn.textContent = isBadge ? "✓ Badge" : "Badge";
            });
        });
    }

    document.getElementById("ctam-close").addEventListener("click", closeModal);
    document.getElementById("ctam-cancel").addEventListener("click", closeModal);
    el.addEventListener("click", (e) => {
        if (e.target === el) closeModal();
    });

    document
        .getElementById("ctam-show-title")
        .addEventListener("change", syncTitleState);

    document.getElementById("ctam-rebuild").addEventListener("click", () => {
        const cols = parseInt(document.getElementById("ctam-cols").value) || 3;
        const rows = parseInt(document.getElementById("ctam-rows").value) || 5;
        collectEditorData();

        tableData.columns = Array.from(
            { length: cols },
            (_, i) => tableData.columns[i] || ctDefaultColumn(i),
        );
        tableData.cols = cols;

        while (tableData.rows.length < rows) {
            tableData.rows.push(
                Array.from({ length: cols }, () => ctDefaultCell()),
            );
        }
        tableData.rows = tableData.rows.slice(0, rows).map((row) =>
            Array.from({ length: cols }, (_, ci) => row[ci] || ctDefaultCell()),
        );

        renderEditorTable();
    });

    document.getElementById("ctam-apply").addEventListener("click", () => {
        collectEditorData();
        if (currentComponent) {
            currentComponent.set(
                "cardTableData",
                JSON.parse(JSON.stringify(tableData)),
            );
            ctRebuildComponentHTML(currentComponent);
        }
        closeModal();
    });

    window.__openCardTableAdminModal = openModal;
}

function createCardTableScript() {
    return function () { };
}

export const cardTableBlocks = [
    {
        id: "card-table",
        label: "Tabla de tarjetas",
        category: "Interactivos",
        media: cardTableBlockIcon,
        content: {
            type: "card-table-component",
        },
    },
];

export function initializeCardTableBlocks(editor) {
    const componentType = "card-table-component";
    createCardTableAdminModal(editor, componentType);

    editor.DomComponents.addType(componentType, {
        isComponent: (el) => {
            if (el.getAttribute?.("data-gjs-type") === componentType) {
                const raw = el.getAttribute("data-card-table-config");
                let cardTableData = null;
                if (raw) {
                    try {
                        cardTableData = JSON.parse(raw);
                    } catch {
                        cardTableData = null;
                    }
                }
                return cardTableData
                    ? { type: componentType, cardTableData }
                    : { type: componentType };
            }
            return false;
        },

        model: {
            defaults: {
                name: "Tabla de tarjetas",
                tagName: "section",
                draggable: true,
                droppable: false,
                editable: false,
                stylable: false,
                resizable: false,
                selectable: true,
                hoverable: true,
                layerable: true,
                highlightable: false,
                copyable: true,
                removable: true,
                propagate: [
                    "editable",
                    "selectable",
                    "hoverable",
                    "droppable",
                    "highlightable",
                    "stylable",
                    "resizable",
                ],
                cardTableData: null,
                attributes: {
                    "data-gjs-type": componentType,
                },
                components: buildCardTableWrapper(defaultCardTableData(3, 5)),
                script: createCardTableScript(),
                traits: [
                    {
                        type: "button",
                        name: "edit-card-table",
                        label: false,
                        text: "Editar tabla",
                        full: true,
                        command(editor) {
                            const selected = editor.getSelected();
                            if (selected && window.__openCardTableAdminModal) {
                                if (!selected.get("cardTableData")) {
                                    selected.set(
                                        "cardTableData",
                                        defaultCardTableData(3, 5),
                                    );
                                }
                                window.__openCardTableAdminModal(selected);
                            }
                        },
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
                if (!this.get("cardTableData")) {
                    const raw = this.getAttributes()["data-card-table-config"];
                    if (raw) {
                        try {
                            this.set("cardTableData", JSON.parse(raw));
                        } catch {
                            this.set("cardTableData", defaultCardTableData(3, 5));
                        }
                    } else {
                        this.set("cardTableData", defaultCardTableData(3, 5));
                    }
                }
                lockComponentTree(this);
            },
        },
    });

    setupCardTableEditorEvents(editor, componentType);
    injectCardTableEditorStyles(editor, componentType);
}

function setupCardTableEditorEvents(editor, componentType) {
    const restoreCardTableData = (comp) => {
        comp.set("type", componentType);
        if (comp.get("cardTableData")) return;
        const raw = comp.getAttributes()["data-card-table-config"];
        if (raw) {
            try {
                comp.set("cardTableData", JSON.parse(raw));
                return;
            } catch {
                // falls through to default
            }
        }
        comp.set("cardTableData", defaultCardTableData(3, 5));
    };

    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (el?.getAttribute?.("data-gjs-type") === componentType) {
            restoreCardTableData(component);
            lockComponentTree(component);
        }
    });

    editor.on("storage:end:load", () => {
        setTimeout(() => {
            editor
                .getWrapper()
                .find(`[data-gjs-type="${componentType}"]`)
                .forEach((comp) => {
                    restoreCardTableData(comp);
                    lockComponentTree(comp);
                });
        }, 800);
    });

    editor.on("storage:start:store", () => {
        editor
            .getWrapper()
            .find(`[data-gjs-type="${componentType}"]`)
            .forEach((comp) => {
                comp.set("type", componentType);
                comp.addAttributes({ "data-gjs-type": componentType });
            });
    });
}

function injectCardTableEditorStyles(editor, componentType) {
    const inject = () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const head = iframe.contentDocument?.head;
        if (!head) return;
        if (head.querySelector(`#${componentType}-editor-css`)) return;
        const s = document.createElement("style");
        s.id = `${componentType}-editor-css`;
        s.textContent = `
            [data-gjs-type="${componentType}"] * { pointer-events: none !important; user-select: none !important; }
        `;
        head.appendChild(s);
    };
    editor.on("load", inject);
    editor.on("canvas:frame:load", inject);
    inject();
}