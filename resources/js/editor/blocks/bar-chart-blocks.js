import { assetUrl } from "@/utils/url.js";

const BAR_CHART_MAX_BARS = 5;

const BAR_CHART_COLOR_PRESETS = [
    { label: "Azul", value: "#003B71" },
    { label: "Azul claro", value: "#5C88B3" },
    { label: "Naranja", value: "#E97300" },
    { label: "Naranja claro", value: "#F2A566" },
    { label: "Azul transparente", value: "rgba(0,59,113,0.55)" },
];

const BAR_CHART_STYLES = `
<style>
.bc-section{width:100%;font-family:'Poppins',sans-serif;}
.bc-title{font-size:1.25rem;font-weight:700;color:#003B71;margin:0 0 1.5rem;}
.bc-plot{position:relative;width:100%;height:280px;display:flex;align-items:flex-end;justify-content:space-around;gap:1.5rem;padding:0 0.5rem;box-sizing:border-box;border-bottom:2px solid rgba(0,59,113,0.25);}
.bc-bar-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;flex:1;max-width:120px;}
.bc-bar-value{font-size:0.85rem;font-weight:600;color:#003B71;margin-bottom:0.4rem;white-space:nowrap;}
.bc-bar{width:100%;max-width:56px;transition:height 0.3s ease;}
.bc-legend{display:flex;flex-wrap:wrap;gap:1rem 1.5rem;justify-content:center;padding-top:1.25rem;}
.bc-legend-item{display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:#003B71;}
.bc-legend-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;}
@media(max-width:640px){
.bc-plot{height:220px;gap:0.75rem;}
}
</style>`;

function clampPercentValue(rawValue) {
    const parsed = parseFloat(rawValue);
    if (Number.isNaN(parsed)) return 0;
    const clamped = Math.min(100, Math.max(0, parsed));
    return Math.round(clamped * 100) / 100;
}

function formatPercentLabel(value) {
    return `${clampPercentValue(value).toFixed(2)}%`;
}

function sanitizeChartData(data) {
    const source = data && typeof data === "object" ? data : {};
    const bars = Array.isArray(source.bars) && source.bars.length
        ? source.bars
        : BAR_CHART_DEFAULT_DATA.bars;

    return {
        title: typeof source.title === "string" && source.title.trim()
            ? source.title
            : BAR_CHART_DEFAULT_DATA.title,
        showLegend: source.showLegend !== false,
        bars: bars.slice(0, BAR_CHART_MAX_BARS).map((bar, index) => ({
            label: typeof bar?.label === "string" && bar.label.trim()
                ? bar.label
                : `Lorem ipsum ${index + 1}`,
            value: clampPercentValue(bar?.value),
            color: typeof bar?.color === "string" && bar.color.trim()
                ? bar.color
                : BAR_CHART_COLOR_PRESETS[index % BAR_CHART_COLOR_PRESETS.length].value,
        })),
    };
}

const BAR_CHART_DEFAULT_DATA = {
    title: "Título del gráfico",
    showLegend: true,
    bars: [
        { label: "Lorem ipsum", value: 0, color: "#003B71" },
        { label: "Lorem ipsum", value: 0, color: "#5C88B3" },
        { label: "Lorem ipsum", value: 0, color: "#E97300" },
    ],
};

function buildBarChartHTML(rawData) {
    const data = sanitizeChartData(rawData);

    const barsHtml = data.bars.map((bar) => `
        <div class="bc-bar-col">
            <span class="bc-bar-value">${formatPercentLabel(bar.value)}</span>
            <div class="bc-bar" style="height:${clampPercentValue(bar.value)}%;background-color:${bar.color};"></div>
        </div>`).join("");

    const legendHtml = data.showLegend
        ? `<div class="bc-legend">${data.bars.map((bar) => `
            <div class="bc-legend-item">
                <span class="bc-legend-dot" style="background-color:${bar.color};"></span>
                <span>${bar.label}</span>
            </div>`).join("")}</div>`
        : "";

    return `<h3 class="bc-title">${data.title}</h3>
        <div class="bc-plot">${barsHtml}</div>
        ${legendHtml}`;
}

function showBarChartModal(editor, component) {
    const existing = document.getElementById("bar-chart-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("bc-modal-styles")) {
        const style = document.createElement("style");
        style.id = "bc-modal-styles";
        style.textContent = `
            .bc-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .bc-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:640px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .bc-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .bc-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .bc-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .bc-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .bc-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .bc-modal-close:hover{background:#f1f5f9;color:#475569;}
            .bc-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .bc-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .bc-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .bc-row{display:flex;gap:0.75rem;align-items:center;}
            .bc-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .bc-input:focus{border-color:#3b82f6;}
            .bc-error-text{font-size:0.7rem;color:#dc2626;margin-top:0.375rem;min-height:1em;}
            .bc-toggle-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;}
            .bc-bar-row{border:1px solid #e2e8f0;border-radius:0.625rem;padding:0.875rem;display:flex;flex-direction:column;gap:0.625rem;background:#f8fafc;}
            .bc-bar-row-header{display:flex;align-items:center;justify-content:space-between;}
            .bc-bar-row-title{font-size:0.8125rem;font-weight:700;color:#003B71;}
            .bc-remove-bar{background:none;border:none;color:#dc2626;font-size:0.75rem;font-weight:600;cursor:pointer;padding:0.2rem 0.5rem;font-family:inherit;}
            .bc-remove-bar:disabled{opacity:0.35;cursor:not-allowed;}
            .bc-bar-fields{display:grid;grid-template-columns:2fr 1fr 1fr;gap:0.625rem;}
            .bc-color-input{border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.15rem;width:100%;height:2.25rem;box-sizing:border-box;cursor:pointer;background:#fff;}
            .bc-add-bar-btn{align-self:flex-start;padding:0.5rem 0.9rem;border-radius:0.5rem;border:1px dashed #003B71;background:#fff;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .bc-add-bar-btn:hover{background:#f0f4f8;}
            .bc-add-bar-btn:disabled{opacity:0.4;cursor:not-allowed;}
            .bc-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .bc-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .bc-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .bc-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .bc-btn-save:hover{background:#d97821;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(component.getAttributes()["data-bar-chart-config"] || "{}");
        } catch {
            return {};
        }
    })();

    const data = sanitizeChartData(currentData);
    let workingBars = data.bars.map((bar) => ({ ...bar }));

    const overlay = document.createElement("div");
    overlay.id = "bar-chart-config-modal";
    overlay.className = "bc-overlay";

    const renderBarRow = (bar, index) => `
        <div class="bc-bar-row" data-bar-row="${index}">
            <div class="bc-bar-row-header">
                <span class="bc-bar-row-title">Barra ${index + 1}</span>
                <button type="button" class="bc-remove-bar" data-remove-bar="${index}" ${workingBars.length <= 1 ? "disabled" : ""}>Eliminar</button>
            </div>
            <div class="bc-bar-fields">
                <div>
                    <label class="bc-label">Nombre</label>
                    <input type="text" class="bc-input" data-bar-field="label" data-bar-index="${index}" value="${bar.label}" maxlength="60">
                </div>
                <div>
                    <label class="bc-label">Valor (0-100)</label>
                    <input type="number" class="bc-input" data-bar-field="value" data-bar-index="${index}" value="${bar.value}" min="0" max="100" step="0.01">
                </div>
                <div>
                    <label class="bc-label">Color</label>
                    <input type="color" class="bc-color-input" data-bar-field="color" data-bar-index="${index}" value="${/^#[0-9a-fA-F]{6}$/.test(bar.color) ? bar.color : "#003B71"}">
                </div>
            </div>
            <div class="bc-error-text" data-bar-error="${index}"></div>
        </div>`;

    const render = () => {
        overlay.innerHTML = `
            <div class="bc-modal">
                <div class="bc-modal-header">
                    <div class="bc-modal-header-left"><i class="ri-bar-chart-2-line"></i><h2>Configurar Gráfico de Barras</h2></div>
                    <button id="bc-modal-close" class="bc-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
                </div>
                <div class="bc-modal-body">
                    <div class="bc-card">
                        <label class="bc-label">Título del gráfico</label>
                        <input id="bc-title" type="text" class="bc-input" value="${data.title}" maxlength="80">
                    </div>
                    <div class="bc-card">
                        <div class="bc-toggle-row">
                            <label class="bc-label" style="margin-bottom:0;">Mostrar leyenda</label>
                            <input id="bc-show-legend" type="checkbox" ${data.showLegend ? "checked" : ""}>
                        </div>
                    </div>
                    <div class="bc-card">
                        <label class="bc-label">Barras (máx. ${BAR_CHART_MAX_BARS})</label>
                        <div id="bc-bars-list" style="display:flex;flex-direction:column;gap:0.75rem;">
                            ${workingBars.map(renderBarRow).join("")}
                        </div>
                        <button type="button" id="bc-add-bar" class="bc-add-bar-btn" style="margin-top:0.75rem;" ${workingBars.length >= BAR_CHART_MAX_BARS ? "disabled" : ""}>
                            <i class="ri-add-line"></i> Agregar barra
                        </button>
                    </div>
                </div>
                <div class="bc-modal-footer">
                    <button id="bc-modal-cancel" class="bc-btn-cancel">Cancelar</button>
                    <button id="bc-modal-save" class="bc-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
                </div>
            </div>`;

        overlay.querySelector("#bc-modal-close").onclick = close;
        overlay.querySelector("#bc-modal-cancel").onclick = close;

        overlay.querySelector("#bc-add-bar").onclick = () => {
            if (workingBars.length >= BAR_CHART_MAX_BARS) return;
            workingBars.push({
                label: `Lorem ipsum ${workingBars.length + 1}`,
                value: 0,
                color: BAR_CHART_COLOR_PRESETS[workingBars.length % BAR_CHART_COLOR_PRESETS.length].value,
            });
            data.title = overlay.querySelector("#bc-title").value;
            data.showLegend = overlay.querySelector("#bc-show-legend").checked;
            render();
        };

        overlay.querySelectorAll("[data-remove-bar]").forEach((btn) => {
            btn.onclick = () => {
                if (workingBars.length <= 1) return;
                const index = parseInt(btn.dataset.removeBar, 10);
                workingBars.splice(index, 1);
                data.title = overlay.querySelector("#bc-title").value;
                data.showLegend = overlay.querySelector("#bc-show-legend").checked;
                render();
            };
        });

        overlay.querySelectorAll("[data-bar-field]").forEach((input) => {
            input.addEventListener("input", () => {
                const index = parseInt(input.dataset.barIndex, 10);
                const field = input.dataset.barField;

                if (field === "value") {
                    const errorEl = overlay.querySelector(`[data-bar-error="${index}"]`);
                    const raw = input.value;
                    const parsed = parseFloat(raw);

                    if (raw === "" || Number.isNaN(parsed) || parsed < 0 || parsed > 100) {
                        errorEl.textContent = "Ingresa un valor entre 0 y 100";
                        return;
                    }
                    errorEl.textContent = "";
                    workingBars[index].value = clampPercentValue(parsed);
                } else {
                    workingBars[index][field] = input.value;
                }
            });
        });
    };

    const close = () => overlay.remove();
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    overlay.appendChild(document.createElement("div"));
    render();

    overlay.addEventListener("click", (e) => {
        if (e.target.id === "bc-modal-save") {
            const hasError = overlay.querySelector(".bc-error-text:not(:empty)");
            if (hasError) return;

            const finalData = sanitizeChartData({
                title: overlay.querySelector("#bc-title").value.trim(),
                showLegend: overlay.querySelector("#bc-show-legend").checked,
                bars: workingBars,
            });

            component.addAttributes({
                "data-bar-chart-config": JSON.stringify(finalData),
            });
            component.components(buildBarChartHTML(finalData) + BAR_CHART_STYLES);
            close();
        }
    });

    document.body.appendChild(overlay);
}

export function initializeBarChartSectionBlock(editor) {
    const componentType = "bar-chart-component";

    editor.BlockManager.add("bar-chart-section-block", {
        label: "Sección: Gráfico de Barras",
        category: "Gráficos",
        media: `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="none" stroke="#003B71" stroke-width="0.6" stroke-opacity="0.3" rx="1"/>
            <rect x="5" y="6" width="15" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
            <rect x="7" y="19" width="3.5" height="6" fill="#003B71"/>
            <rect x="13" y="15" width="3.5" height="10" fill="#5C88B3"/>
            <rect x="19" y="11" width="3.5" height="14" fill="#E97300"/>
            <rect x="5" y="25" width="17" height="1.2" fill="#003B71" fill-opacity="0.4"/>
        </svg>`,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
            classes: ["bc-section", "w-full", "bg-white", "px-16", "py-12"],
        },
    });
}

export function initializeBarChartBlock(editor) {
    const componentType = "bar-chart-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Gráfico de Barras",
                tagName: "div",
                classes: ["bc-section"],
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: {
                    "data-gjs-type": componentType,
                    "data-bar-chart-config": JSON.stringify(BAR_CHART_DEFAULT_DATA),
                },
                components: buildBarChartHTML(BAR_CHART_DEFAULT_DATA) + BAR_CHART_STYLES,
                traits: [
                    {
                        type: "button",
                        label: "Gráfico",
                        text: "Administrar Barras",
                        full: true,
                        command: "open-bar-chart-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-bar-chart-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showBarChartModal(ed, selected);
        },
    });

    editor.BlockManager.add("bar-chart-block", {
        label: "Gráfico de Barras",
        category: "Gráficos",
        media: `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="3" y="4" width="15" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
            <rect x="5" y="20" width="4" height="7" fill="#003B71"/>
            <rect x="11" y="15" width="4" height="12" fill="#5C88B3"/>
            <rect x="17" y="10" width="4" height="17" fill="#E97300"/>
            <rect x="3" y="27" width="20" height="1.5" fill="#003B71" fill-opacity="0.4"/>
            <circle cx="25" cy="6" r="1.5" fill="#003B71"/>
            <rect x="27.5" y="5.3" width="3" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.4"/>
            <circle cx="25" cy="10" r="1.5" fill="#5C88B3"/>
            <rect x="27.5" y="9.3" width="3" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.4"/>
            <circle cx="25" cy="14" r="1.5" fill="#E97300"/>
            <rect x="27.5" y="13.3" width="3" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.4"/>
        </svg>`,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });
}