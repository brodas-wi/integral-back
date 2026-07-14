const tableBlockIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="6" rx="1" fill="#003B71"/>
    <rect x="2" y="10" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="17" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <rect x="2" y="24" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <line x1="11" y1="2" x2="11" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
    <line x1="21" y1="2" x2="21" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
</svg>`;

const THEMES = {
    blue: {
        headerBg: "bg-[#003B71]",
        headerText: "text-white",
        subheaderBg: "bg-[#003B71]",
        subheaderText: "text-white",
        borderColor: "#003B71",
        rowText: "text-[#003B71]",
        labelText: "text-[#003B71]",
    },
    orange: {
        headerBg: "bg-[#E97300]",
        headerText: "text-white",
        subheaderBg: "bg-[#E97300]",
        subheaderText: "text-white",
        borderColor: "#E97300",
        rowText: "text-[#003B71]",
        labelText: "text-[#003B71]",
    },
};

function buildTableHTML(data, theme) {
    const t = THEMES[theme] || THEMES.blue;
    const showTitleRow = data.showTitleRow !== false && !!data.title;
    const showHeaderRow = data.showHeaderRow !== false;

    let html = `<table class="w-full border-collapse font-[Poppins,sans-serif] table-fixed">`;

    if (showTitleRow || showHeaderRow) {
        html += `<thead>`;

        if (showTitleRow) {
            html += `<tr>
                <th colspan="${data.cols}" class="p-3 align-middle text-center text-base font-bold ${t.headerBg} ${t.headerText}">
                    ${data.title}
                </th>
            </tr>`;
        }

        if (showHeaderRow && data.headers?.length) {
            const rowBg = showTitleRow ? t.subheaderBg : t.headerBg;
            const rowText = showTitleRow ? t.subheaderText : t.headerText;
            html += `<tr>`;
            data.headers.forEach((h, hi) => {
                const borderR =
                    hi < data.headers.length - 1
                        ? `border-r border-[${t.borderColor}]`
                        : "";
                html += `<th class="p-3 align-middle text-sm font-semibold ${rowBg} ${rowText} ${borderR} border-b border-[${t.borderColor}] text-${h.align || "center"}">${h.text || ""}</th>`;
            });
            html += `</tr>`;
        }

        html += `</thead>`;
    }

    html += `<tbody>`;
    const totalRows = data.rows.length;
    const skip = {};

    data.rows.forEach((row, ri) => {
        html += `<tr>`;
        let ci = 0;
        row.forEach((cell) => {
            while (skip[`${ri}-${ci}`]) ci++;
            const cs = cell.colspan || 1;
            const rs = cell.rowspan || 1;
            for (let r = ri; r < ri + rs; r++) {
                for (let c = ci; c < ci + cs; c++) {
                    if (r !== ri || c !== ci) skip[`${r}-${c}`] = true;
                }
            }
            const csAttr = cs > 1 ? `colspan="${cs}"` : "";
            const rsAttr = rs > 1 ? `rowspan="${rs}"` : "";
            const bg = cell.isHeader
                ? `tbl-cell-highlight-${theme}`
                : `tbl-cell-normal-${theme}`;
            const fw = "font-semibold";
            const color = cell.isHeader ? t.labelText : t.rowText;
            const align = `text-${cell.align || "center"}`;
            const isLastRow = ri + rs >= totalRows;
            const isLastCol = ci + cs >= data.cols;
            const borderR = isLastCol
                ? ""
                : `border-r border-[${t.borderColor}]`;
            const borderB = isLastRow
                ? ""
                : `border-b border-[${t.borderColor}]`;
            const cellClass = `${borderR} ${borderB} p-3 align-middle text-sm ${bg} ${fw} ${color} ${align}`;

            if (cell.image) {
                html += `<td ${csAttr} ${rsAttr} class="${cellClass}">
                    <img src="${cell.image}" alt="${cell.text || ""}" class="max-w-full max-h-20 h-auto object-contain block mx-auto">
                    ${cell.text ? `<span class="block mt-1 text-xs ${color}">${cell.text}</span>` : ""}
                </td>`;
            } else {
                html += `<td ${csAttr} ${rsAttr} class="${cellClass}">${cell.text || ""}</td>`;
            }
            ci += cs;
        });
        html += `</tr>`;
    });
    html += `</tbody></table>`;
    return html;
}

function defaultTableData(cols, rows) {
    return {
        title: "Título de la tabla",
        showTitleRow: true,
        showHeaderRow: true,
        cols,
        headers: Array.from({ length: cols }, (_, i) => ({
            text: `Columna ${i + 1}`,
            align: "center",
        })),
        rows: Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => ({
                text: "",
                align: "center",
                isHeader: false,
                colspan: 1,
                rowspan: 1,
                image: null,
            })),
        ),
    };
}

function buildTableCellStyles(theme) {
    return `<style>
.tbl-cell-normal-${theme}{background-color:#ffffff;}
.tbl-cell-highlight-${theme}{background-color:#e2e8f0;}
</style>`;
}

function buildWrapper(html, theme) {
    const t = THEMES[theme] || THEMES.blue;
    return `<div class="w-full overflow-x-auto rounded-2xl border-2 border-[${t.borderColor}]">${buildTableCellStyles(theme)}${html}</div>`;
}

function computeSkipMap(rows, cols) {
    const skip = {};
    rows.forEach((row, ri) => {
        let ci = 0;
        row.forEach((cell) => {
            while (skip[`${ri}-${ci}`]) ci++;
            const cs = Math.min(cell.colspan || 1, cols - ci);
            const rs = cell.rowspan || 1;
            for (let r = ri; r < ri + rs; r++) {
                for (let c = ci; c < ci + cs; c++) {
                    if (r !== ri || c !== ci) skip[`${r}-${c}`] = `${ri}-${ci}`;
                }
            }
            ci += cs;
        });
    });
    return skip;
}

const TABLE_MODAL_STYLES = `
.tam-overlay{position:fixed;inset:0;z-index:999999;display:none;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
.tam-overlay.open{display:flex;}
.tam-modal{background:#ffffff;border-radius:0.75rem;width:100%;max-width:1040px;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
.tam-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#ffffff;flex-shrink:0;}
.tam-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
.tam-modal-header-left i{font-size:1.125rem;color:#003B71;}
.tam-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.tam-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s,color 0.15s;}
.tam-modal-close:hover{background:#f1f5f9;color:#475569;}
.tam-modal-close i{font-size:1.125rem;}
.tam-toolbar{display:flex;flex-wrap:wrap;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;background:#f8fafc;flex-shrink:0;align-items:flex-end;}
.tam-toolbar-group{display:flex;flex-direction:column;gap:0.375rem;}
.tam-toolbar-label{font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;}
.tam-modal-input,.tam-modal-select{padding:0.5rem 0.75rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;}
.tam-modal-input:focus,.tam-modal-select:focus{border-color:#003B71;}
.tam-toolbar-checkbox{display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;font-weight:500;color:#334155;cursor:pointer;user-select:none;padding:0.5rem 0.75rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:0.5rem;}
.tam-toolbar-checkbox input{accent-color:#003B71;cursor:pointer;width:1rem;height:1rem;}
.tam-btn-rebuild{padding:0.5rem 1rem;background:#ffffff;border:2px solid #003B71;border-radius:0.5rem;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s,color 0.15s;}
.tam-btn-rebuild:hover{background:#003B71;color:#fff;}
.tam-rebuild-notice{background:#fef9c3;border:1.5px solid #ca8a04;border-radius:0.5rem;padding:0.625rem 1rem;font-size:0.8125rem;color:#92400e;display:flex;align-items:center;gap:0.5rem;margin:0 1.25rem;flex-shrink:0;}
.tam-body{flex:1;overflow-y:auto;padding:1.25rem;background:#f8fafc;}
.tam-body::-webkit-scrollbar{width:5px;}
.tam-body::-webkit-scrollbar-track{background:transparent;}
.tam-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
.tam-table-wrap{overflow-x:auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
.tam-table{width:100%;border-collapse:collapse;font-size:0.8rem;table-layout:fixed;}
.tam-table th,.tam-table td{border:1.5px solid #e2e8f0;padding:0.5rem;vertical-align:top;min-width:80px;}
.tam-table th{background:#f8fafc;font-weight:600;color:#334155;text-align:center;}
.tam-cell-input{width:100%;border:none;outline:none;font-size:0.8rem;background:transparent;resize:vertical;min-height:36px;font-family:inherit;color:#1e293b;box-sizing:border-box;}
.tam-cell-actions{display:flex;gap:4px;margin-top:6px;flex-wrap:wrap;align-items:center;}
.tam-cell-btn{padding:3px 8px;border-radius:0.375rem;font-size:0.65rem;font-weight:600;cursor:pointer;border:1.5px solid;transition:all 0.15s;line-height:1.4;font-family:inherit;}
.tam-cell-btn:hover{opacity:0.8;}
.tam-cell-btn-header{background:transparent;color:#003B71;border-color:#003B71;}
.tam-cell-btn-header.active{background:#003B71;color:#fff;border-color:#003B71;}
.tam-cell-btn-img{background:#E97300;color:#fff;border-color:#E97300;}
.tam-cell-btn-clear{background:#fff;color:#ef4444;border-color:#ef4444;}
.tam-cell{position:relative;}
.tam-cell.is-header-cell{background:#e2e8f0 !important;}
.tam-cell.has-image{background:#fef9ee !important;}
.tam-cell.is-spanned{background:#f1f5f9 !important;pointer-events:none;opacity:0.5;}
.tam-cell.has-span{background:#f0fdf4 !important;outline:1.5px dashed #16a34a;}
.tam-cell-img-preview{width:70px;height:44px;object-fit:contain;border-radius:0.375rem;margin-bottom:4px;border:1px solid #e2e8f0;}
.tam-cell-span-group{display:flex;gap:4px;align-items:center;}
.tam-cell-span-group label{font-size:0.6rem;color:#64748b;font-weight:600;}
.tam-cell-span-input{width:40px;font-size:0.7rem;padding:2px 4px;border:1.5px solid #e2e8f0;border-radius:0.375rem;text-align:center;}
.tam-spanned-label{font-size:0.6rem;color:#94a3b8;text-align:center;padding-top:4px;font-style:italic;}
.tam-modal-footer{display:flex;align-items:center;justify-content:flex-end;padding:1rem 1.25rem;border-top:1px solid #f1f5f9;background:#ffffff;flex-shrink:0;gap:0.75rem;}
.tam-btn{padding:0.5rem 1.25rem;border-radius:0.5rem;font-size:0.875rem;font-weight:600;cursor:pointer;border:2px solid transparent;transition:opacity 0.15s,background 0.15s,border-color 0.15s;display:inline-flex;align-items:center;gap:0.375rem;font-family:inherit;}
.tam-btn-cancel{background:#ffffff;border-color:#e2e8f0;color:#475569;}
.tam-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
.tam-btn-primary{background:#003B71;color:#fff;border-color:#003B71;}
.tam-btn-primary:hover{background:#002a52;}
.tam-img-overlay{position:fixed;inset:0;z-index:9999999;display:none;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);}
.tam-img-overlay.open{display:flex;}
.tam-img-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;font-family:'Inter',sans-serif;box-shadow:0 20px 60px rgba(15,23,42,0.18);border:1px solid #e2e8f0;}
.tam-img-header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;flex-shrink:0;}
.tam-img-header h3{font-size:0.9375rem;font-weight:700;color:#0f172a;margin:0;display:flex;align-items:center;gap:0.5rem;}
.tam-img-search{padding:0.75rem 1.25rem;border-bottom:1px solid #f1f5f9;flex-shrink:0;}
.tam-img-search input{width:100%;padding:0.5rem 0.75rem;border:1px solid #e2e8f0;border-radius:0.5rem;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit;}
.tam-img-search input:focus{border-color:#003B71;}
.tam-img-grid{flex:1;overflow-y:auto;padding:1rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:0.75rem;}
.tam-img-card{cursor:pointer;border-radius:0.5rem;border:2px solid #e2e8f0;overflow:hidden;background:#fff;transition:border-color 0.15s;}
.tam-img-card:hover{border-color:#94a3b8;}
.tam-img-card.selected{border-color:#003B71;box-shadow:0 0 0 3px rgba(0,59,113,0.15);}
.tam-img-card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;}
.tam-img-card p{font-size:0.65rem;padding:4px 6px;color:#334155;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;}
.tam-img-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem;gap:1rem;color:#64748b;font-size:0.875rem;}
.tam-img-spinner{width:2rem;height:2rem;border:3px solid #e2e8f0;border-top-color:#003B71;border-radius:50%;animation:tam-spin 0.8s linear infinite;}
@keyframes tam-spin{to{transform:rotate(360deg);}}
.tam-img-footer{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-top:1px solid #f1f5f9;background:#f8fafc;flex-shrink:0;}
.tam-img-selected-info{font-size:0.8125rem;color:#64748b;}`;

function createImagePickerModal() {
    if (document.getElementById("tam-img-modal")) return;
    const el = document.createElement("div");
    el.id = "tam-img-modal";
    el.className = "tam-img-overlay";
    el.innerHTML = `
        <div class="tam-img-modal">
            <div class="tam-img-header">
                <h3><i class="ri-image-line"></i>Seleccionar imagen</h3>
                <button class="tam-modal-close" id="tam-img-close"><i class="ri-close-line"></i></button>
            </div>
            <div class="tam-img-search">
                <input type="text" id="tam-img-search-input" placeholder="Buscar imagen por nombre...">
            </div>
            <div class="tam-img-grid" id="tam-img-grid"></div>
            <div class="tam-img-footer">
                <span class="tam-img-selected-info" id="tam-img-selected-info">Ninguna imagen seleccionada</span>
                <div style="display:flex;gap:0.5rem;">
                    <button class="tam-btn tam-btn-cancel" id="tam-img-cancel">Cancelar</button>
                    <button class="tam-btn tam-btn-primary" id="tam-img-confirm" disabled><i class="ri-check-line"></i> Usar imagen</button>
                </div>
            </div>
        </div>`;
    document.body.appendChild(el);

    let selectedUrl = null;
    let onConfirmCallback = null;

    async function loadImages(search = "") {
        const grid = document.getElementById("tam-img-grid");
        grid.innerHTML = `<div class="tam-img-loading"><div class="tam-img-spinner"></div><span>Cargando...</span></div>`;
        try {
            const params = new URLSearchParams({ type: "image", per_page: 50 });
            if (search) params.append("search", search);
            const mediaApiUrl =
                document.querySelector('meta[name="media-api-url"]')?.content ??
                "/media/api";
            const res = await fetch(`${mediaApiUrl}?${params}`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
            });
            const data = await res.json();
            const images = data.items || [];
            if (!images.length) {
                grid.innerHTML = `<div class="tam-img-loading"><i class="ri-image-line" style="font-size:2rem;"></i><span>No se encontraron imágenes</span></div>`;
                return;
            }
            grid.innerHTML = "";
            images.forEach((img) => {
                const card = document.createElement("div");
                card.className = "tam-img-card";
                card.innerHTML = `<img src="${img.url}" alt="${img.filename}"><p title="${img.filename}">${img.filename}</p>`;
                card.addEventListener("click", () => {
                    grid.querySelectorAll(".tam-img-card").forEach((c) =>
                        c.classList.remove("selected"),
                    );
                    card.classList.add("selected");
                    selectedUrl = img.url;
                    document.getElementById(
                        "tam-img-selected-info",
                    ).textContent = `Seleccionada: ${img.filename}`;
                    document.getElementById("tam-img-confirm").disabled = false;
                });
                grid.appendChild(card);
            });
        } catch {
            grid.innerHTML = `<div class="tam-img-loading"><i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i><span style="color:#dc2626;">Error al cargar imágenes</span></div>`;
        }
    }

    function openPicker(callback) {
        onConfirmCallback = callback;
        selectedUrl = null;
        document.getElementById("tam-img-selected-info").textContent =
            "Ninguna imagen seleccionada";
        document.getElementById("tam-img-confirm").disabled = true;
        document.getElementById("tam-img-search-input").value = "";
        el.classList.add("open");
        loadImages();
    }

    function closePicker() {
        el.classList.remove("open");
        selectedUrl = null;
        onConfirmCallback = null;
    }

    document
        .getElementById("tam-img-close")
        .addEventListener("click", closePicker);
    document
        .getElementById("tam-img-cancel")
        .addEventListener("click", closePicker);
    document.getElementById("tam-img-confirm").addEventListener("click", () => {
        if (selectedUrl && onConfirmCallback) {
            onConfirmCallback(selectedUrl);
            closePicker();
        }
    });

    let searchTimeout;
    document
        .getElementById("tam-img-search-input")
        .addEventListener("input", (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => loadImages(e.target.value), 300);
        });

    el.addEventListener("click", (e) => {
        if (e.target === el) closePicker();
    });
    window.__openTableImagePicker = openPicker;
}

function createTableAdminModal(editor, componentType) {
    if (document.getElementById("table-admin-modal")) return;

    const styleEl = document.createElement("style");
    styleEl.id = "table-admin-modal-styles";
    styleEl.textContent = TABLE_MODAL_STYLES;
    document.head.appendChild(styleEl);

    createImagePickerModal();

    const el = document.createElement("div");
    el.id = "table-admin-modal";
    el.className = "tam-overlay";
    el.innerHTML = `
        <div class="tam-modal">
            <div class="tam-modal-header">
                <div class="tam-modal-header-left">
                    <i class="ri-table-line"></i>
                    <h2>Administrar tabla</h2>
                </div>
                <button class="tam-modal-close" id="tam-close"><i class="ri-close-line"></i></button>
            </div>
            <div class="tam-toolbar">
                <div class="tam-toolbar-group">
                    <label class="tam-toolbar-label">Título de tabla</label>
                    <input type="text" id="tam-title" placeholder="Texto del título" class="tam-modal-input" style="width:220px;">
                </div>
                <div class="tam-toolbar-group">
                    <label class="tam-toolbar-label">Color</label>
                    <select id="tam-theme" class="tam-modal-select">
                        <option value="blue">Azul</option>
                        <option value="orange">Naranja</option>
                    </select>
                </div>
                <div class="tam-toolbar-group">
                    <label class="tam-toolbar-label">Columnas</label>
                    <input type="number" id="tam-cols" min="1" max="10" value="3" class="tam-modal-input" style="width:70px;">
                </div>
                <div class="tam-toolbar-group">
                    <label class="tam-toolbar-label">Filas</label>
                    <input type="number" id="tam-rows" min="1" max="30" value="3" class="tam-modal-input" style="width:70px;">
                </div>
                <label class="tam-toolbar-checkbox">
                    <input type="checkbox" id="tam-show-title-row" checked>
                    Mostrar fila de título
                </label>
                <label class="tam-toolbar-checkbox">
                    <input type="checkbox" id="tam-show-header-row" checked>
                    Mostrar fila de encabezados
                </label>
                <button class="tam-btn-rebuild" id="tam-rebuild">
                    <i class="ri-refresh-line"></i> Reconstruir
                </button>
            </div>
            <div class="tam-body">
                <div class="tam-table-wrap">
                    <table class="tam-table"><thead id="tam-thead"></thead><tbody id="tam-tbody"></tbody></table>
                </div>
            </div>
            <div class="tam-modal-footer">
                <button class="tam-btn tam-btn-cancel" id="tam-cancel">Cancelar</button>
                <button class="tam-btn tam-btn-primary" id="tam-apply"><i class="ri-check-line"></i> Aplicar cambios</button>
            </div>
        </div>`;
    document.body.appendChild(el);

    let currentComponent = null;
    let tableData = null;

    function syncTitleRowState() {
        const showTitleRow =
            document.getElementById("tam-show-title-row").checked;
        const titleInput = document.getElementById("tam-title");
        titleInput.disabled = !showTitleRow;
        titleInput.style.opacity = showTitleRow ? "1" : "0.5";
    }

    function openModal(component) {
        currentComponent = component;
        const raw = component.get("tableData");
        tableData = raw
            ? JSON.parse(JSON.stringify(raw))
            : defaultTableData(3, 3);
        const cols = tableData.cols || 3;
        tableData.rows = tableData.rows.map((row) => {
            return Array.from({ length: cols }, (_, ci) => {
                return (
                    row[ci] || {
                        text: "",
                        align: "center",
                        isHeader: false,
                        colspan: 1,
                        rowspan: 1,
                        image: null,
                    }
                );
            });
        });
        document.getElementById("tam-title").value = tableData.title || "";
        document.getElementById("tam-theme").value =
            component.get("tableTheme") || "blue";
        document.getElementById("tam-cols").value = tableData.cols || 3;
        document.getElementById("tam-rows").value = tableData.rows.length || 3;
        document.getElementById("tam-show-title-row").checked =
            tableData.showTitleRow !== false;
        document.getElementById("tam-show-header-row").checked =
            tableData.showHeaderRow !== false;
        syncTitleRowState();
        hideRebuildNotice();
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
        tableData.title = document.getElementById("tam-title").value.trim();
        tableData.showTitleRow =
            document.getElementById("tam-show-title-row").checked;
        tableData.showHeaderRow = document.getElementById(
            "tam-show-header-row",
        ).checked;
        tableData.cols =
            parseInt(document.getElementById("tam-cols").value) || 3;
        tableData.headers = Array.from(
            document.querySelectorAll(".tam-header-input"),
        ).map((inp) => ({
            text: inp.value,
            align:
                inp.closest("th")?.querySelector(".tam-align-select")?.value ||
                "center",
        }));

        document
            .querySelectorAll("#tam-tbody td.tam-cell:not(.is-spanned)")
            .forEach((td) => {
                const ri = parseInt(td.dataset.row);
                const ci = parseInt(td.dataset.col);
                if (tableData.rows[ri]?.[ci]) {
                    tableData.rows[ri][ci].text =
                        td.querySelector(".tam-cell-input")?.value || "";
                    tableData.rows[ri][ci].align =
                        td.querySelector(".tam-align-select")?.value ||
                        "center";
                    tableData.rows[ri][ci].isHeader =
                        td.dataset.isheader === "1";
                    tableData.rows[ri][ci].image = td.dataset.image || null;
                }
            });

        const skipMap = computeSkipMap(tableData.rows, tableData.cols);
        tableData.rows = tableData.rows.map((row, ri) =>
            row.filter((_, ci) => !skipMap[`${ri}-${ci}`]),
        );
    }

    function showRebuildNotice() {
        const existing = el.querySelector("#tam-rebuild-notice");
        if (existing) return;
        const notice = document.createElement("div");
        notice.id = "tam-rebuild-notice";
        notice.className = "tam-rebuild-notice";
        notice.style.margin = "1rem 1.25rem 0";
        notice.innerHTML = `<i class="ri-error-warning-line"></i> Has modificado el colspan/rowspan. Haz clic en <strong style="margin:0 4px;">Reconstruir</strong> para aplicar los cambios de fusión.`;
        const toolbar = el.querySelector(".tam-toolbar");
        toolbar.after(notice);
    }

    function hideRebuildNotice() {
        el.querySelector("#tam-rebuild-notice")?.remove();
    }

    function renderEditorTable() {
        const thead = document.getElementById("tam-thead");
        const tbody = document.getElementById("tam-tbody");
        const totalCols = tableData.cols;
        const totalRows = tableData.rows.length;

        const skipMap = computeSkipMap(tableData.rows, totalCols);

        thead.innerHTML = `<tr>${tableData.headers
            .map(
                (h, i) => `
            <th>
                <input class="tam-cell-input tam-header-input" value="${h.text || ""}" placeholder="Col ${i + 1}" style="font-weight:600;">
                <select class="tam-align-select" style="margin-top:4px;width:100%;font-size:0.7rem;padding:2px;">
                    <option value="left" ${h.align === "left" ? "selected" : ""}>Izquierda</option>
                    <option value="center" ${h.align === "center" ? "selected" : ""}>Centro</option>
                    <option value="right" ${h.align === "right" ? "selected" : ""}>Derecha</option>
                </select>
            </th>`,
            )
            .join("")}</tr>`;

        tbody.innerHTML = tableData.rows
            .map((row, ri) => {
                const cells = Array.from({ length: totalCols }, (_, ci) => {
                    const spannedBy = skipMap[`${ri}-${ci}`];

                    if (spannedBy) {
                        return `<td class="tam-cell is-spanned" data-row="${ri}" data-col="${ci}">
                        <div class="tam-spanned-label">Combinada con [${spannedBy}]</div>
                    </td>`;
                    }

                    const cell = row[ci] || {
                        text: "",
                        align: "center",
                        isHeader: false,
                        colspan: 1,
                        rowspan: 1,
                        image: null,
                    };
                    const cs = cell.colspan || 1;
                    const rs = cell.rowspan || 1;
                    const hasSpan = cs > 1 || rs > 1;

                    return `<td class="tam-cell ${cell.isHeader ? "is-header-cell" : ""} ${cell.image ? "has-image" : ""} ${hasSpan ? "has-span" : ""}"
                    data-row="${ri}" data-col="${ci}"
                    data-isheader="${cell.isHeader ? "1" : "0"}"
                    data-colspan="${cs}"
                    data-rowspan="${rs}"
                    data-image="${cell.image || ""}">
                    ${cell.image ? `<img class="tam-cell-img-preview" src="${cell.image}" alt="">` : ""}
                    <textarea class="tam-cell-input" placeholder="Texto...">${cell.text || ""}</textarea>
                    <select class="tam-align-select" style="width:100%;font-size:0.7rem;padding:2px;margin-top:4px;">
                        <option value="left" ${cell.align === "left" ? "selected" : ""}>Izquierda</option>
                        <option value="center" ${cell.align === "center" ? "selected" : ""}>Centro</option>
                        <option value="right" ${cell.align === "right" ? "selected" : ""}>Derecha</option>
                    </select>
                    <div class="tam-cell-actions">
                        <button type="button" class="tam-cell-btn tam-cell-btn-header ${cell.isHeader ? "active" : ""}"
                            data-action="header" data-row="${ri}" data-col="${ci}">
                            ${cell.isHeader ? "✓ Resaltar" : "Resaltar"}
                        </button>
                        <button type="button" class="tam-cell-btn tam-cell-btn-img"
                            data-action="image" data-row="${ri}" data-col="${ci}">
                            <i class="ri-image-line"></i> ${cell.image ? "Cambiar" : "Imagen"}
                        </button>
                        ${cell.image ? `<button type="button" class="tam-cell-btn tam-cell-btn-clear" data-action="clear-image" data-row="${ri}" data-col="${ci}">✕ Quitar</button>` : ""}
                        <div class="tam-cell-span-group">
                            <label title="Columnas que ocupa">CS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${totalCols - ci}"
                                value="${cs}" data-action="colspan" data-row="${ri}" data-col="${ci}">
                            <label title="Filas que ocupa">RS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${totalRows - ri}"
                                value="${rs}" data-action="rowspan" data-row="${ri}" data-col="${ci}">
                        </div>
                    </div>
                </td>`;
                }).join("");
                return `<tr>${cells}</tr>`;
            })
            .join("");

        tbody
            .querySelectorAll(
                "input[data-action=colspan], input[data-action=rowspan]",
            )
            .forEach((input) => {
                input.addEventListener("change", () => {
                    const ri = parseInt(input.dataset.row);
                    const ci = parseInt(input.dataset.col);
                    const val = Math.max(1, parseInt(input.value) || 1);
                    if (!tableData.rows[ri]?.[ci]) return;
                    if (input.dataset.action === "colspan") {
                        tableData.rows[ri][ci].colspan = Math.min(
                            val,
                            totalCols - ci,
                        );
                    } else {
                        tableData.rows[ri][ci].rowspan = Math.min(
                            val,
                            totalRows - ri,
                        );
                    }
                    showRebuildNotice();
                });
            });

        tbody.querySelectorAll("button[data-action]").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const action = btn.dataset.action;
                const ri = parseInt(btn.dataset.row);
                const ci = parseInt(btn.dataset.col);
                if (isNaN(ri) || isNaN(ci) || !tableData.rows[ri]?.[ci]) return;

                if (action === "header") {
                    tableData.rows[ri][ci].isHeader =
                        !tableData.rows[ri][ci].isHeader;
                    const td = tbody.querySelector(
                        `td[data-row="${ri}"][data-col="${ci}"]`,
                    );
                    if (td) {
                        td.dataset.isheader = tableData.rows[ri][ci].isHeader
                            ? "1"
                            : "0";
                        td.classList.toggle(
                            "is-header-cell",
                            tableData.rows[ri][ci].isHeader,
                        );
                    }
                    btn.classList.toggle(
                        "active",
                        tableData.rows[ri][ci].isHeader,
                    );
                    btn.textContent = tableData.rows[ri][ci].isHeader
                        ? "✓ Resaltar"
                        : "Resaltar";
                    return;
                }

                if (action === "image") {
                    if (window.__openTableImagePicker) {
                        window.__openTableImagePicker((url) => {
                            tableData.rows[ri][ci].image = url;
                            const td = tbody.querySelector(
                                `td[data-row="${ri}"][data-col="${ci}"]`,
                            );
                            if (td) {
                                td.dataset.image = url;
                                td.classList.add("has-image");
                                let preview = td.querySelector(
                                    ".tam-cell-img-preview",
                                );
                                if (!preview) {
                                    preview = document.createElement("img");
                                    preview.className = "tam-cell-img-preview";
                                    td.insertBefore(preview, td.firstChild);
                                }
                                preview.src = url;
                                const imgBtn = td.querySelector(
                                    "[data-action=image]",
                                );
                                if (imgBtn)
                                    imgBtn.innerHTML = `<i class="ri-image-line"></i> Cambiar`;
                                if (
                                    !td.querySelector(
                                        "[data-action=clear-image]",
                                    )
                                ) {
                                    const clearBtn =
                                        document.createElement("button");
                                    clearBtn.type = "button";
                                    clearBtn.className =
                                        "tam-cell-btn tam-cell-btn-clear";
                                    clearBtn.dataset.action = "clear-image";
                                    clearBtn.dataset.row = ri;
                                    clearBtn.dataset.col = ci;
                                    clearBtn.textContent = "✕ Quitar";
                                    clearBtn.addEventListener("click", (ev) => {
                                        ev.preventDefault();
                                        ev.stopPropagation();
                                        tableData.rows[ri][ci].image = null;
                                        td.dataset.image = "";
                                        td.classList.remove("has-image");
                                        preview.remove();
                                        clearBtn.remove();
                                        const ib = td.querySelector(
                                            "[data-action=image]",
                                        );
                                        if (ib)
                                            ib.innerHTML = `<i class="ri-image-line"></i> Imagen`;
                                    });
                                    td.querySelector(
                                        ".tam-cell-actions",
                                    ).appendChild(clearBtn);
                                }
                            }
                        });
                    }
                    return;
                }

                if (action === "clear-image") {
                    tableData.rows[ri][ci].image = null;
                    renderEditorTable();
                }
            });
        });
    }

    document.getElementById("tam-close").addEventListener("click", closeModal);
    document.getElementById("tam-cancel").addEventListener("click", closeModal);
    el.addEventListener("click", (e) => {
        if (e.target === el) closeModal();
    });

    document
        .getElementById("tam-show-title-row")
        .addEventListener("change", syncTitleRowState);

    document.getElementById("tam-rebuild").addEventListener("click", () => {
        const cols = parseInt(document.getElementById("tam-cols").value) || 3;
        const rows = parseInt(document.getElementById("tam-rows").value) || 3;
        hideRebuildNotice();
        collectEditorData();
        while (tableData.headers.length < cols)
            tableData.headers.push({
                text: `Col ${tableData.headers.length + 1}`,
                align: "center",
            });
        tableData.headers = tableData.headers.slice(0, cols);
        tableData.cols = cols;
        while (tableData.rows.length < rows) {
            tableData.rows.push(
                Array.from({ length: cols }, () => ({
                    text: "",
                    align: "center",
                    isHeader: false,
                    colspan: 1,
                    rowspan: 1,
                    image: null,
                })),
            );
        }
        tableData.rows = tableData.rows.slice(0, rows).map((row) => {
            while (row.length < cols)
                row.push({
                    text: "",
                    align: "center",
                    isHeader: false,
                    colspan: 1,
                    rowspan: 1,
                    image: null,
                });
            return row.slice(0, cols);
        });
        renderEditorTable();
    });

    document.getElementById("tam-apply").addEventListener("click", () => {
        collectEditorData();
        const theme = document.getElementById("tam-theme").value;
        if (currentComponent) {
            currentComponent.set(
                "tableData",
                JSON.parse(JSON.stringify(tableData)),
            );
            currentComponent.set("tableTheme", theme);
            currentComponent.addAttributes({ "data-table-theme": theme });
            rebuildComponentHTML(currentComponent);
        }
        closeModal();
    });

    window.__openTableAdminModal = openModal;
}

function rebuildComponentHTML(component) {
    const data = component.get("tableData");
    const theme = component.get("tableTheme") || "blue";
    if (!data) return;
    component.components(buildWrapper(buildTableHTML(data, theme), theme));
}

function createTableScript() {
    return function () {};
}

export const tableBlocks = [
    {
        id: "table-blue",
        label: "Tabla azul",
        category: "Interactivos",
        media: tableBlockIcon,
        content: {
            type: "table-component",
            attributes: { "data-table-theme": "blue" },
        },
    },
    {
        id: "table-orange",
        label: "Tabla naranja",
        category: "Interactivos",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="6" rx="1" fill="#E97300"/>
            <rect x="2" y="10" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.3"/>
            <rect x="2" y="17" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
            <rect x="2" y="24" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
        </svg>`,
        content: {
            type: "table-component",
            attributes: { "data-table-theme": "orange" },
        },
    },
];

export function initializeTableBlocks(editor) {
    const componentType = "table-component";
    createTableAdminModal(editor, componentType);

    editor.DomComponents.addType(componentType, {
        isComponent: (el) => {
            if (el.getAttribute?.("data-gjs-type") === componentType) {
                return { type: componentType };
            }
            return false;
        },

        model: {
            defaults: {
                name: "Tabla",
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
                ],
                tableData: null,
                tableTheme: "blue",
                attributes: {
                    "data-gjs-type": componentType,
                    "data-table-theme": "blue",
                },
                components: buildWrapper(
                    buildTableHTML(defaultTableData(3, 3), "blue"),
                    "blue",
                ),
                script: createTableScript(),
                traits: [
                    {
                        type: "button",
                        name: "edit-table",
                        label: "Editar tabla",
                        text: "Abrir editor de tabla",
                        command(editor) {
                            const selected = editor.getSelected();
                            if (selected && window.__openTableAdminModal) {
                                if (!selected.get("tableData")) {
                                    selected.set(
                                        "tableData",
                                        defaultTableData(3, 3),
                                    );
                                }
                                window.__openTableAdminModal(selected);
                            }
                        },
                    },
                    {
                        type: "select",
                        name: "data-table-theme",
                        label: "Color del tema",
                        options: [
                            { id: "blue", name: "Azul" },
                            { id: "orange", name: "Naranja" },
                        ],
                        changeProp: false,
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
                const theme =
                    this.getAttributes()["data-table-theme"] || "blue";
                this.set("tableTheme", theme);
                if (!this.get("tableData")) {
                    this.set("tableData", defaultTableData(3, 3));
                    rebuildComponentHTML(this);
                }
                this.on("change:attributes", (model, attrs) => {
                    const newTheme = attrs["data-table-theme"];
                    if (newTheme && newTheme !== this.get("tableTheme")) {
                        this.set("tableTheme", newTheme);
                        rebuildComponentHTML(this);
                    }
                });
            },
        },
    });

    setupTableEditorEvents(editor, componentType);
    injectTableEditorStyles(editor, componentType);
}

function setupTableEditorEvents(editor, componentType) {
    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (el?.getAttribute?.("data-gjs-type") === componentType) {
            component.set("type", componentType);
            const theme = el.getAttribute("data-table-theme") || "blue";
            component.set("tableTheme", theme);
            if (!component.get("tableData")) {
                component.set("tableData", defaultTableData(3, 3));
            }
        }
    });

    editor.on("storage:end:load", () => {
        setTimeout(() => {
            editor
                .getWrapper()
                .find(`[data-gjs-type="${componentType}"]`)
                .forEach((comp) => {
                    comp.set("type", componentType);
                    const theme =
                        comp.getAttributes()["data-table-theme"] || "blue";
                    comp.set("tableTheme", theme);
                    if (!comp.get("tableData")) {
                        comp.set("tableData", defaultTableData(3, 3));
                    }
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

function injectTableEditorStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const head = iframe.contentDocument?.head;
        if (!head) return;
        if (!head.querySelector(`#${componentType}-editor-css`)) {
            const s = document.createElement("style");
            s.id = `${componentType}-editor-css`;
            s.textContent = `
                [data-gjs-type="${componentType}"] * { pointer-events: none !important; }
                [data-gjs-type="${componentType}"].gjs-selected,
                [data-gjs-type="${componentType}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `;
            head.appendChild(s);
        }
    });
}
