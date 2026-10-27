import {
    COLOR_PRESETS,
    COMPONENT_TYPE,
    MAX_BARS,
    applyConfig,
    escapeHtml as esc,
    normalizeConfig,
    parseNumber,
    readConfig,
} from "./core.js";

const MODAL_ID = "bcm-modal";
const STYLE_ID = "bcm-styles";

const OPTIONS = {
    titleStyle: [
        ["text", "Texto azul"],
        ["badge", "Badge azul (píldora)"],
        ["none", "Sin título"],
    ],
    layout: [
        ["section", "Sección (ancho máximo de página)"],
        ["inline", "Individual (ancho disponible)"],
    ],
    height: [
        ["s", "Bajo"],
        ["m", "Medio"],
        ["l", "Alto"],
    ],
    format: [
        ["percent", "Porcentaje (12,5 %)"],
        ["integer", "Número entero (1250)"],
        ["decimal", "Número decimal (12,5)"],
        ["none", "No mostrar valor"],
    ],
    decimals: [
        ["0", "0"],
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
    ],
    legend: [
        ["none", "Sin leyenda"],
        ["text", "Texto bajo la línea"],
        ["dot", "Texto con punto de color"],
    ],
};

const MODAL_CSS = `
.bcm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
.bcm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
.bcm-modal [hidden]{display:none !important;}
.bcm-header{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
.bcm-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
.bcm-header h2 i{color:#003B71;}
.bcm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:9999px;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
.bcm-close:hover{background:#f1f5f9;color:#475569;}
.bcm-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
.bcm-tab{padding-top:0.75rem;padding-right:1rem;padding-bottom:0.75rem;padding-left:1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
.bcm-tab.active{color:#003B71;border-bottom-color:#003B71;}
.bcm-tab i{font-size:1rem;}
.bcm-body{flex:1;overflow-y:auto;padding-top:1.25rem;padding-right:1.25rem;padding-bottom:1.25rem;padding-left:1.25rem;display:flex;flex-direction:column;gap:0.75rem;background:#f8fafc;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
.bcm-body::-webkit-scrollbar{width:6px;}
.bcm-body::-webkit-scrollbar-track{background:transparent;}
.bcm-body::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
.bcm-panel{display:none;flex-direction:column;gap:0.75rem;}
.bcm-panel.active{display:flex;}
.bcm-list{display:flex;flex-direction:column;gap:0.75rem;}
.bcm-block{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding-top:1rem;padding-right:1rem;padding-bottom:1rem;padding-left:1rem;display:flex;flex-direction:column;gap:0.75rem;transition:box-shadow 0.2s ease,border-color 0.2s ease;}
.bcm-item{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding-top:1rem;padding-right:1rem;padding-bottom:1rem;padding-left:1rem;display:flex;flex-direction:column;gap:0.75rem;transition:box-shadow 0.2s ease,border-color 0.2s ease;}
.bcm-flash{border-color:#E97300;box-shadow:0 0 0 3px rgba(233,115,0,0.35);}
.bcm-head{display:flex;align-items:center;gap:0.5rem;}
.bcm-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
.bcm-name{font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;}
.bcm-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
.bcm-input{width:100%;padding-top:0.5rem;padding-right:0.75rem;padding-bottom:0.5rem;padding-left:0.75rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
.bcm-input:focus{border-color:#003B71;}
.bcm-textarea{min-height:3.5rem;resize:vertical;line-height:1.5;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
.bcm-row{display:flex;gap:0.75rem;align-items:flex-start;}
.bcm-grow{flex:1;min-width:0;}
.bcm-hint{margin:0;font-size:0.75rem;color:#94a3b8;line-height:1.4;}
.bcm-error{margin:0.25rem 0 0;font-size:0.75rem;color:#dc2626;line-height:1.3;}
.bcm-error:empty{display:none;}
.bcm-check{display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:#475569;cursor:pointer;}
.bcm-check input{width:1rem;height:1rem;margin:0;accent-color:#003B71;cursor:pointer;}
.bcm-colors{display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;}
.bcm-swatch{width:1.75rem;height:1.75rem;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;border:2px solid #fff;border-radius:9999px;box-shadow:0 0 0 1px #cbd5e1;cursor:pointer;transition:box-shadow 0.15s;}
.bcm-swatch:hover{box-shadow:0 0 0 2px #94a3b8;}
.bcm-swatch-on{box-shadow:0 0 0 2px #003B71;}
.bcm-color-input{width:2.25rem;height:1.75rem;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;border:1px solid #e2e8f0;border-radius:0.5rem;background:#fff;cursor:pointer;}
.bcm-pill{display:inline-flex;align-items:center;justify-content:center;gap:0.375rem;padding-top:0.4rem;padding-right:0.875rem;padding-bottom:0.4rem;padding-left:0.875rem;border:2px solid transparent;border-radius:9999px;font-size:0.75rem;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;transition:background 0.15s,color 0.15s,opacity 0.15s;align-self:flex-start;}
.bcm-pill:disabled{opacity:0.4;cursor:not-allowed;}
.bcm-pill-primary{background:#003B71;color:#fff;}
.bcm-pill-primary:hover:not(:disabled){background:#002a52;}
.bcm-pill-outline{background:#fff;border-color:#003B71;color:#003B71;}
.bcm-pill-outline:hover{background:#003B71;color:#fff;}
.bcm-pill-teal{background:#fff;border-color:#0d9488;color:#0d9488;}
.bcm-pill-teal:hover{background:#0d9488;color:#fff;}
.bcm-pill-ghost{background:#fff;border-color:#e2e8f0;color:#475569;font-size:0.875rem;font-weight:500;}
.bcm-pill-ghost:hover{background:#f8fafc;}
.bcm-pill-save{background:#E97300;color:#fff;font-size:0.875rem;}
.bcm-pill-save:hover{background:#c96200;}
.bcm-pill-danger{background:#ef4444;color:#fff;font-size:0.875rem;}
.bcm-pill-danger:hover{background:#dc2626;}
.bcm-pill-lg{padding-top:0.5rem;padding-right:1.25rem;padding-bottom:0.5rem;padding-left:1.25rem;font-size:0.8125rem;}
.bcm-icon-btn{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:none;border-radius:9999px;background:transparent;color:#64748b;cursor:pointer;transition:background 0.15s,color 0.15s,opacity 0.15s;}
.bcm-icon-btn:hover{background:#e2e8f0;color:#003B71;}
.bcm-icon-btn:disabled{opacity:0.3;cursor:not-allowed;pointer-events:none;}
.bcm-icon-btn.bcm-danger{color:#ef4444;}
.bcm-icon-btn.bcm-danger:hover{background:#fef2f2;color:#ef4444;}
.bcm-footer{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;align-items:center;background:#fff;flex-shrink:0;flex-wrap:wrap;}
.bcm-footer-tools{display:flex;gap:0.5rem;margin-right:auto;}
.bcm-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
.bcm-confirm{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
.bcm-confirm-head{padding-top:1rem;padding-right:1.25rem;padding-bottom:0.75rem;padding-left:1.25rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
.bcm-confirm-head i{font-size:1.25rem;}
.bcm-confirm-head h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
.bcm-confirm-body{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;}
.bcm-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
.bcm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding-top:0.375rem;padding-right:0.75rem;padding-bottom:0.375rem;padding-left:0.75rem;background:#f1f5f9;border-radius:9999px;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
.bcm-confirm-foot{padding-top:0.75rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
`;

function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}

function toHex(color) {
    const value = String(color ?? "").trim();
    if (/^#[0-9a-f]{6}$/i.test(value)) return value;
    if (/^#[0-9a-f]{3}$/i.test(value)) return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
    return "#003B71";
}

function selectHTML(path, key, value) {
    const options = OPTIONS[key]
        .map(([optionValue, label]) => `<option value="${optionValue}" ${String(value) === optionValue ? "selected" : ""}>${esc(label)}</option>`)
        .join("");
    return `<select class="bcm-input" data-bind="${path}">${options}</select>`;
}

function generalInner(state) {
    return `
    <div class="bcm-block">
        <div>
            <label class="bcm-label">Título</label>
            <input class="bcm-input" maxlength="80" data-bind="title" value="${esc(state.title)}">
        </div>
        <div>
            <label class="bcm-label">Estilo del título</label>
            ${selectHTML("titleStyle", "titleStyle", state.titleStyle)}
        </div>
        <p class="bcm-hint">El título es opcional y va centrado sobre el gráfico. Si lo dejas vacío, no se muestra.</p>
    </div>
    <div class="bcm-block">
        <div>
            <label class="bcm-label">Distribución</label>
            ${selectHTML("layout", "layout", state.layout)}
        </div>
        <div>
            <label class="bcm-label">Alto del gráfico</label>
            ${selectHTML("height", "height", state.height)}
        </div>
        <p class="bcm-hint">«Sección» respeta el ancho máximo de la página. «Individual» usa el ancho disponible, para ponerlo dentro de una columna.</p>
    </div>`;
}

function valuesInner(state) {
    return `
    <div class="bcm-block">
        <div>
            <label class="bcm-label">Valor máximo</label>
            <input class="bcm-input" inputmode="decimal" data-bind="max" value="${esc(state.max)}">
            <p class="bcm-hint">Es el valor que llena el alto completo del gráfico. Ninguna barra puede superarlo.</p>
            <p class="bcm-error" data-error="max"></p>
        </div>
        <div>
            <label class="bcm-label">Valor sobre cada barra</label>
            ${selectHTML("format", "format", state.format)}
        </div>
        <div class="bcm-row" data-when="percent decimal">
            <div class="bcm-grow">
                <label class="bcm-label">Decimales</label>
                ${selectHTML("decimals", "decimals", state.decimals)}
            </div>
        </div>
        <div class="bcm-row" data-when="integer decimal">
            <div class="bcm-grow">
                <label class="bcm-label">Prefijo</label>
                <input class="bcm-input" maxlength="8" placeholder="$" data-bind="prefix" value="${esc(state.prefix)}">
            </div>
            <div class="bcm-grow">
                <label class="bcm-label">Sufijo</label>
                <input class="bcm-input" maxlength="20" placeholder=" clientes" data-bind="suffix" value="${esc(state.suffix)}">
            </div>
        </div>
    </div>
    <div class="bcm-block">
        <label class="bcm-check"><input type="checkbox" data-bind="showInfo" ${state.showInfo ? "checked" : ""}> Mostrar subtítulo y párrafo sobre cada barra</label>
        <div>
            <label class="bcm-label">Leyenda bajo la línea</label>
            ${selectHTML("legend", "legend", state.legend)}
        </div>
        <p class="bcm-hint">La leyenda muestra la «Leyenda» de cada barra debajo de la línea base.</p>
    </div>`;
}

function moveButtons(idx, total) {
    return `
            <button type="button" class="bcm-icon-btn" data-action="bar-up" title="Subir" ${idx === 0 ? "disabled" : ""}><i class="ri-arrow-up-line"></i></button>
            <button type="button" class="bcm-icon-btn" data-action="bar-down" title="Bajar" ${idx === total - 1 ? "disabled" : ""}><i class="ri-arrow-down-line"></i></button>
            <button type="button" class="bcm-icon-btn bcm-danger" data-action="bar-remove" title="Eliminar" ${total <= 1 ? "disabled" : ""}><i class="ri-delete-bin-line"></i></button>`;
}

function barHTML(bar, idx, total) {
    const base = `bars.${idx}`;
    const current = String(bar.color).toLowerCase();
    const swatches = COLOR_PRESETS.map(
        (preset) =>
            `<button type="button" class="bcm-swatch${preset.value.toLowerCase() === current ? " bcm-swatch-on" : ""}" style="background-color:${preset.value};" title="${esc(preset.label)}" data-action="bar-color" data-color="${preset.value}"></button>`,
    ).join("");

    return `
    <div class="bcm-item" data-bar="${idx}">
        <div class="bcm-head">
            <span class="bcm-num">${idx + 1}</span>
            <span class="bcm-name">Barra ${idx + 1}</span>${moveButtons(idx, total)}
        </div>
        <div class="bcm-row">
            <div class="bcm-grow">
                <label class="bcm-label">Valor</label>
                <input class="bcm-input" inputmode="decimal" data-bind="${base}.value" value="${esc(bar.value)}">
                <p class="bcm-error" data-error="${base}.value"></p>
            </div>
            <div class="bcm-grow">
                <label class="bcm-label">Leyenda</label>
                <input class="bcm-input" maxlength="60" data-bind="${base}.label" value="${esc(bar.label)}">
            </div>
        </div>
        <div>
            <label class="bcm-label">Subtítulo (sobre la barra)</label>
            <input class="bcm-input" maxlength="80" data-bind="${base}.subtitle" value="${esc(bar.subtitle)}">
        </div>
        <div>
            <label class="bcm-label">Párrafo (sobre la barra)</label>
            <textarea class="bcm-input bcm-textarea" maxlength="240" data-bind="${base}.text">${esc(bar.text)}</textarea>
        </div>
        <div>
            <label class="bcm-label">Color</label>
            <div class="bcm-colors">${swatches}<input type="color" class="bcm-color-input" data-bind="${base}.color" value="${toHex(bar.color)}"></div>
        </div>
    </div>`;
}

function shellHTML() {
    return `
    <div class="bcm-modal">
        <div class="bcm-header">
            <h2><i class="ri-bar-chart-2-line"></i> Configurar Gráfico de Barras</h2>
            <button type="button" class="bcm-close" data-action="close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="bcm-tabs">
            <button type="button" class="bcm-tab active" data-action="tab" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
            <button type="button" class="bcm-tab" data-action="tab" data-tab="values"><i class="ri-hashtag"></i> Valores</button>
            <button type="button" class="bcm-tab" data-action="tab" data-tab="bars"><i class="ri-bar-chart-2-line"></i> Barras</button>
        </div>
        <div class="bcm-body">
            <div class="bcm-panel active" data-panel="general"></div>
            <div class="bcm-panel" data-panel="values"></div>
            <div class="bcm-panel" data-panel="bars">
                <p class="bcm-hint">Máximo ${MAX_BARS} barras. El subtítulo y el párrafo solo se muestran si activas la opción en la pestaña Valores.</p>
                <div class="bcm-list" data-bars></div>
                <button type="button" class="bcm-pill bcm-pill-primary bcm-pill-lg" data-action="bar-add"><i class="ri-add-line"></i> Agregar barra</button>
            </div>
        </div>
        <div class="bcm-footer">
            <button type="button" class="bcm-pill bcm-pill-ghost bcm-pill-lg" data-action="close">Cancelar</button>
            <div class="bcm-footer-tools">
                <button type="button" class="bcm-pill bcm-pill-outline bcm-pill-lg" data-action="backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <button type="button" class="bcm-pill bcm-pill-teal bcm-pill-lg" data-action="restore" title="Restaurar configuración desde JSON"><i class="ri-upload-2-line"></i> Restaurar</button>
                <input type="file" accept=".json,application/json" data-file="restore" style="display:none;">
            </div>
            <button type="button" class="bcm-pill bcm-pill-save bcm-pill-lg" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>
    </div>`;
}

function showDialog({ icon, color, title, body, filename, confirmText, danger, onConfirm }) {
    const dialog = document.createElement("div");
    dialog.className = "bcm-confirm-overlay";
    dialog.innerHTML = `
    <div class="bcm-confirm">
        <div class="bcm-confirm-head"><i class="${icon}" style="color:${color};"></i><h3>${esc(title)}</h3></div>
        <div class="bcm-confirm-body">
            ${body.map((line) => `<p>${esc(line)}</p>`).join("")}
            ${filename ? `<span class="bcm-filename"><i class="ri-file-code-line"></i>${esc(filename)}</span>` : ""}
        </div>
        <div class="bcm-confirm-foot">
            ${onConfirm ? `<button type="button" class="bcm-pill bcm-pill-ghost bcm-pill-lg" data-dialog="cancel">Cancelar</button>` : ""}
            <button type="button" class="bcm-pill ${danger ? "bcm-pill-danger" : "bcm-pill-save"} bcm-pill-lg" data-dialog="ok">${esc(confirmText)}</button>
        </div>
    </div>`;
    document.body.appendChild(dialog);
    dialog.addEventListener("click", (event) => {
        const action = event.target.closest("[data-dialog]")?.dataset.dialog;
        if (!action) return;
        dialog.remove();
        if (action === "ok") onConfirm?.();
    });
}

function setPath(target, path, value) {
    const keys = path.split(".");
    const last = keys.pop();
    const holder = keys.reduce((node, key) => node?.[key], target);
    if (holder && typeof holder === "object") holder[last] = value;
}

function swap(list, idx, direction) {
    const target = idx + direction;
    if (target < 0 || target >= list.length) return -1;
    [list[idx], list[target]] = [list[target], list[idx]];
    return target;
}

function validate(state) {
    const errors = {};
    const max = parseNumber(state.max);

    if (!(max > 0)) errors.max = "El máximo debe ser un número mayor que 0.";

    state.bars.forEach((bar, idx) => {
        const value = parseNumber(bar.value);
        const key = `bars.${idx}.value`;
        if (!Number.isFinite(value) || value < 0) errors[key] = "Escribe un número de 0 en adelante.";
        else if (max > 0 && value > max) errors[key] = `No puede superar el máximo (${max}).`;
    });

    return errors;
}

function showBarChartModal(editor, component) {
    document.getElementById(MODAL_ID)?.remove();
    ensureStyles();

    const state = readConfig(component);

    const overlay = document.createElement("div");
    overlay.id = MODAL_ID;
    overlay.className = "bcm-overlay";
    overlay.innerHTML = shellHTML();
    document.body.appendChild(overlay);

    const list = overlay.querySelector("[data-bars]");
    const fileInput = overlay.querySelector("[data-file='restore']");
    const panel = (name) => overlay.querySelector(`[data-panel="${name}"]`);
    const barOf = (el) => Number(el.closest("[data-bar]").dataset.bar);

    const renderFields = () => {
        panel("general").innerHTML = generalInner(state);
        panel("values").innerHTML = valuesInner(state);
    };

    const renderBars = () => {
        list.innerHTML = state.bars.map((bar, idx) => barHTML(bar, idx, state.bars.length)).join("");
        overlay.querySelector("[data-action='bar-add']").disabled = state.bars.length >= MAX_BARS;
    };

    const showErrors = (errors) => {
        overlay.querySelectorAll("[data-error]").forEach((el) => {
            el.textContent = errors[el.dataset.error] ?? "";
        });
    };

    const syncVisibility = () => {
        overlay.querySelectorAll("[data-when]").forEach((el) => {
            el.hidden = !el.dataset.when.split(" ").includes(state.format);
        });
    };

    const syncColor = (idx) => {
        const el = list.querySelector(`[data-bar="${idx}"]`);
        if (!el) return;
        const color = String(state.bars[idx].color);
        el.querySelector("input[type='color']").value = toHex(color);
        el.querySelectorAll("[data-color]").forEach((btn) =>
            btn.classList.toggle("bcm-swatch-on", btn.dataset.color.toLowerCase() === color.toLowerCase()),
        );
    };

    const showTab = (name) => {
        overlay.querySelectorAll("[data-tab]").forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === name));
        overlay.querySelectorAll("[data-panel]").forEach((el) => el.classList.toggle("active", el.dataset.panel === name));
    };

    const flash = (el) => {
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("bcm-flash");
        setTimeout(() => el.classList.remove("bcm-flash"), 1000);
    };

    const flashBar = (idx) => flash(list.querySelector(`[data-bar="${idx}"]`));

    const focusError = (key) => {
        const errorEl = overlay.querySelector(`[data-error="${key}"]`);
        if (!errorEl) return;
        showTab(errorEl.closest("[data-panel]").dataset.panel);
        flash(errorEl.closest(".bcm-item, .bcm-block"));
        errorEl.parentElement.querySelector("input")?.focus();
    };

    const close = () => overlay.remove();

    const moveBar = (el, direction) => {
        const target = swap(state.bars, barOf(el), direction);
        if (target < 0) return;
        renderBars();
        showErrors(validate(state));
        flashBar(target);
    };

    const download = () => {
        const blob = new Blob([JSON.stringify(normalizeConfig(state), null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        const link = document.createElement("a");
        link.href = url;
        link.download = `bar-chart-backup-${stamp}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const actions = {
        close,
        save() {
            const errors = validate(state);
            showErrors(errors);
            const first = Object.keys(errors)[0];
            if (first) return focusError(first);
            applyConfig(editor, component, normalizeConfig(state));
            close();
        },
        tab: (el) => showTab(el.dataset.tab),
        "bar-add"() {
            const max = parseNumber(state.max);
            const half = max > 0 ? Math.round((max / 2) * 100) / 100 : 50;
            state.bars.push({
                label: "Lorem ipsum",
                value: half,
                color: COLOR_PRESETS[state.bars.length % COLOR_PRESETS.length].value,
                subtitle: "Subtítulo",
                text: "Descripción breve.",
            });
            renderBars();
            showErrors(validate(state));
            flashBar(state.bars.length - 1);
        },
        "bar-remove"(el) {
            state.bars.splice(barOf(el), 1);
            renderBars();
            showErrors(validate(state));
        },
        "bar-up": (el) => moveBar(el, -1),
        "bar-down": (el) => moveBar(el, 1),
        "bar-color"(el) {
            const idx = barOf(el);
            state.bars[idx].color = el.dataset.color;
            syncColor(idx);
        },
        backup: download,
        restore: () => fileInput.click(),
    };

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) return close();
        const el = event.target.closest("[data-action]");
        if (!el || el.disabled) return;
        actions[el.dataset.action]?.(el);
    });

    overlay.addEventListener("input", (event) => {
        const target = event.target;
        const path = target.dataset?.bind;
        if (!path) return;
        setPath(state, path, target.type === "checkbox" ? target.checked : target.value);
        if (path === "max" || path.endsWith(".value")) showErrors(validate(state));
        if (path === "format") syncVisibility();
        if (path.endsWith(".color")) syncColor(barOf(target));
    });

    fileInput.addEventListener("change", () => {
        const file = fileInput.files?.[0];
        fileInput.value = "";
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            let parsed;
            try {
                parsed = JSON.parse(reader.result);
            } catch {
                showDialog({
                    icon: "ri-error-warning-line",
                    color: "#ef4444",
                    title: "Archivo inválido",
                    body: ["El archivo seleccionado no es un JSON válido."],
                    confirmText: "Cerrar",
                    danger: true,
                });
                return;
            }
            showDialog({
                icon: "ri-refresh-line",
                color: "#E97300",
                title: "Restaurar configuración",
                body: [
                    "¿Deseas restaurar la configuración de este gráfico desde el archivo de respaldo?",
                    "Esta acción reemplazará la configuración actual del formulario.",
                ],
                filename: file.name,
                confirmText: "Sí, restaurar",
                onConfirm() {
                    Object.assign(state, normalizeConfig(parsed));
                    renderFields();
                    renderBars();
                    syncVisibility();
                    showErrors(validate(state));
                },
            });
        };
        reader.readAsText(file);
    });

    renderFields();
    renderBars();
    syncVisibility();
    showErrors(validate(state));
}

export function registerBarChartModal(editor) {
    editor.Commands.add("open-bar-chart-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected?.get("type") === COMPONENT_TYPE) showBarChartModal(ed, selected);
        },
    });
}