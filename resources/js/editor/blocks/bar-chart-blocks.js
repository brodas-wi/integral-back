import { assetUrl } from "@/utils/url.js";

const BAR_CHART_COMPONENT_TYPE = "bar-chart";
const BAR_CHART_MAX_BARS = 5;

const BAR_CHART_DEFAULT_COLORS = [
    "#003B71",
    "#5C88B3",
    "#E97300",
    "#8FA9C4",
    "#F2A566",
];

const BAR_CHART_DEFAULT_DATA = {
    title: "Título del gráfico",
    showLegend: true,
    bars: [
        { label: "Lorem ipsum", value: 0, color: BAR_CHART_DEFAULT_COLORS[0] },
        { label: "Lorem ipsum", value: 0, color: BAR_CHART_DEFAULT_COLORS[1] },
        { label: "Lorem ipsum", value: 0, color: BAR_CHART_DEFAULT_COLORS[2] },
    ],
};

const BAR_CHART_STYLES = `
<style>
.bc-wrapper{width:100%;display:flex;flex-direction:column;gap:1.5rem;font-family:inherit;}
.bc-title{font-size:1.25rem;font-weight:700;color:#003B71;margin:0;}
.bc-plot{position:relative;width:100%;height:280px;display:flex;align-items:flex-end;justify-content:space-around;gap:1.5rem;padding:0 0.5rem;box-sizing:border-box;}
.bc-bar-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;flex:1;max-width:120px;}
.bc-bar-value{font-size:0.85rem;font-weight:600;color:#003B71;margin-bottom:0.4rem;white-space:nowrap;}
.bc-bar{width:100%;max-width:56px;border-radius:6px 6px 0 0;transition:height 0.3s ease;}
.bc-baseline{width:100%;height:2px;background-color:#003B71;opacity:0.25;}
.bc-legend{display:flex;flex-wrap:wrap;gap:1rem 1.5rem;justify-content:center;padding-top:0.5rem;border-top:1px solid #e5e7eb;}
.bc-legend-item{display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:#003B71;}
.bc-legend-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;}
.bc-manage-btn{display:inline-flex;align-items:center;gap:0.4rem;align-self:flex-start;padding:0.5rem 1rem;border-radius:9999px;border:1px solid #003B71;background:#fff;color:#003B71;font-size:0.85rem;font-weight:600;cursor:pointer;transition:background 0.15s ease;}
.bc-manage-btn:hover{background:#f0f4f8;}

.bc-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:9999;}
.bc-modal{background:#fff;border-radius:0.75rem;width:min(560px,92vw);max-height:88vh;overflow-y:auto;padding:1.5rem;box-sizing:border-box;display:flex;flex-direction:column;gap:1.25rem;}
.bc-modal-header{display:flex;align-items:center;justify-content:space-between;gap:1rem;}
.bc-modal-title{font-size:1.1rem;font-weight:700;color:#003B71;margin:0;}
.bc-modal-close{background:none;border:none;cursor:pointer;font-size:1.25rem;line-height:1;color:#6b7280;}
.bc-field-group{display:flex;flex-direction:column;gap:0.35rem;}
.bc-field-label{font-size:0.8rem;font-weight:600;color:#374151;}
.bc-field-input{border:1px solid #d1d5db;border-radius:0.4rem;padding:0.5rem 0.65rem;font-size:0.9rem;color:#111827;width:100%;box-sizing:border-box;}
.bc-field-input:focus{outline:none;border-color:#003B71;}
.bc-field-error{font-size:0.75rem;color:#dc2626;min-height:1em;}
.bc-toggle-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:0.5rem 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;}
.bc-bar-row{border:1px solid #e5e7eb;border-radius:0.5rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;position:relative;}
.bc-bar-row-header{display:flex;align-items:center;justify-content:space-between;}
.bc-bar-row-title{font-size:0.85rem;font-weight:700;color:#003B71;}
.bc-remove-bar{background:none;border:none;color:#dc2626;font-size:0.8rem;font-weight:600;cursor:pointer;padding:0.2rem 0.5rem;}
.bc-bar-fields{display:grid;grid-template-columns:2fr 1fr 1fr;gap:0.75rem;}
.bc-color-input{border:1px solid #d1d5db;border-radius:0.4rem;padding:0.15rem;width:100%;height:2.3rem;box-sizing:border-box;cursor:pointer;}
.bc-add-bar-btn{align-self:flex-start;padding:0.5rem 1rem;border-radius:0.4rem;border:1px dashed #003B71;background:#fff;color:#003B71;font-size:0.85rem;font-weight:600;cursor:pointer;}
.bc-add-bar-btn:disabled{opacity:0.4;cursor:not-allowed;}
.bc-modal-footer{display:flex;justify-content:flex-end;gap:0.75rem;}
.bc-btn{padding:0.55rem 1.25rem;border-radius:0.4rem;font-size:0.9rem;font-weight:600;cursor:pointer;border:none;}
.bc-btn-cancel{background:#f3f4f6;color:#374151;}
.bc-btn-save{background:#E97300;color:#fff;}
.bc-btn-save:hover{background:#c96200;}

@media(max-width:640px){
    .bc-plot{height:220px;gap:0.75rem;}
    .bc-bar-fields{grid-template-columns:1fr;}
}
</style>`;

function clampPercentValue(rawValue) {
    const parsed = parseFloat(rawValue);
    if (Number.isNaN(parsed)) return 0;
    const clamped = Math.min(100, Math.max(0, parsed));
    return Math.round(clamped * 100) / 100;
}

function formatPercentLabel(value) {
    return `${clampPercentValue(value).toFixed(2).replace(/\.00$/, ",00")}%`;
}

function sanitizeChartData(data) {
    const source = data && typeof data === "object" ? data : {};
    const bars = Array.isArray(source.bars) ? source.bars : BAR_CHART_DEFAULT_DATA.bars;

    return {
        title: typeof source.title === "string" && source.title.trim() ? source.title : BAR_CHART_DEFAULT_DATA.title,
        showLegend: source.showLegend !== false,
        bars: bars.slice(0, BAR_CHART_MAX_BARS).map((bar, index) => ({
            label: typeof bar?.label === "string" && bar.label.trim() ? bar.label : `Lorem ipsum ${index + 1}`,
            value: clampPercentValue(bar?.value),
            color: typeof bar?.color === "string" && /^#[0-9a-fA-F]{6}$/.test(bar.color)
                ? bar.color
                : BAR_CHART_DEFAULT_COLORS[index % BAR_CHART_DEFAULT_COLORS.length],
        })),
    };
}

function renderChartMarkup(rawData) {
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

    return `
<div class="bc-wrapper" data-chart='${JSON.stringify(data).replace(/'/g, "&#39;")}'>
    <h3 class="bc-title">${data.title}</h3>
    <button type="button" class="bc-manage-btn" data-bc-manage>
        <i class="ri-settings-3-line"></i>
        <span>Administrar barras</span>
    </button>
    <div class="bc-plot">
        ${barsHtml}
    </div>
    <div class="bc-baseline"></div>
    ${legendHtml}
</div>`;
}

function buildBarRowMarkup(bar, index) {
    return `
<div class="bc-bar-row" data-bar-row="${index}">
    <div class="bc-bar-row-header">
        <span class="bc-bar-row-title">Barra ${index + 1}</span>
        <button type="button" class="bc-remove-bar" data-bc-remove-bar="${index}">Eliminar</button>
    </div>
    <div class="bc-bar-fields">
        <div class="bc-field-group">
            <label class="bc-field-label">Nombre</label>
            <input type="text" class="bc-field-input" data-bc-field="label" data-bar-index="${index}" value="${bar.label}" maxlength="60">
        </div>
        <div class="bc-field-group">
            <label class="bc-field-label">Valor (0-100)</label>
            <input type="number" class="bc-field-input" data-bc-field="value" data-bar-index="${index}" value="${bar.value}" min="0" max="100" step="0.01">
            <span class="bc-field-error" data-bc-error="${index}"></span>
        </div>
        <div class="bc-field-group">
            <label class="bc-field-label">Color</label>
            <input type="color" class="bc-color-input" data-bc-field="color" data-bar-index="${index}" value="${bar.color}">
        </div>
    </div>
</div>`;
}

function openBarChartModal(currentData, onSave) {
    const data = sanitizeChartData(currentData);
    let workingBars = data.bars.map((bar) => ({ ...bar }));

    const overlay = document.createElement("div");
    overlay.className = "bc-modal-overlay";

    const render = () => {
        overlay.innerHTML = `
<div class="bc-modal">
    <div class="bc-modal-header">
        <h4 class="bc-modal-title">Administrar gráfico de barras</h4>
        <button type="button" class="bc-modal-close" data-bc-close>&times;</button>
    </div>
    <div class="bc-field-group">
        <label class="bc-field-label">Título del gráfico</label>
        <input type="text" class="bc-field-input" data-bc-title value="${data.title}" maxlength="80">
    </div>
    <div class="bc-toggle-row">
        <span class="bc-field-label">Mostrar leyenda</span>
        <input type="checkbox" data-bc-legend ${data.showLegend ? "checked" : ""}>
    </div>
    <div class="bc-bars-list">
        ${workingBars.map((bar, index) => buildBarRowMarkup(bar, index)).join("")}
    </div>
    <button type="button" class="bc-add-bar-btn" data-bc-add-bar ${workingBars.length >= BAR_CHART_MAX_BARS ? "disabled" : ""}>
        + Agregar barra
    </button>
    <div class="bc-modal-footer">
        <button type="button" class="bc-btn bc-btn-cancel" data-bc-cancel>Cancelar</button>
        <button type="button" class="bc-btn bc-btn-save" data-bc-save>Guardar</button>
    </div>
</div>`;

        overlay.querySelector("[data-bc-close]").addEventListener("click", closeModal);
        overlay.querySelector("[data-bc-cancel]").addEventListener("click", closeModal);

        overlay.querySelector("[data-bc-add-bar]").addEventListener("click", () => {
            if (workingBars.length >= BAR_CHART_MAX_BARS) return;
            workingBars.push({
                label: `Lorem ipsum ${workingBars.length + 1}`,
                value: 0,
                color: BAR_CHART_DEFAULT_COLORS[workingBars.length % BAR_CHART_DEFAULT_COLORS.length],
            });
            render();
        });

        overlay.querySelectorAll("[data-bc-remove-bar]").forEach((btn) => {
            btn.addEventListener("click", () => {
                const index = parseInt(btn.dataset.bcRemoveBar, 10);
                if (workingBars.length <= 1) return;
                workingBars.splice(index, 1);
                render();
            });
        });

        overlay.querySelectorAll("[data-bc-field]").forEach((input) => {
            input.addEventListener("input", () => {
                const index = parseInt(input.dataset.barIndex, 10);
                const field = input.dataset.bcField;

                if (field === "value") {
                    const errorEl = overlay.querySelector(`[data-bc-error="${index}"]`);
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

        overlay.querySelector("[data-bc-save]").addEventListener("click", () => {
            const invalidField = overlay.querySelector(".bc-field-error:not(:empty)");
            if (invalidField) return;

            const title = overlay.querySelector("[data-bc-title]").value.trim();
            const showLegend = overlay.querySelector("[data-bc-legend]").checked;

            const finalData = sanitizeChartData({
                title,
                showLegend,
                bars: workingBars,
            });

            onSave(finalData);
            closeModal();
        });
    };

    const closeModal = () => {
        document.removeEventListener("keydown", onKeydown);
        overlay.remove();
    };

    const onKeydown = (event) => {
        if (event.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKeydown);

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeModal();
    });

    render();
    document.body.appendChild(overlay);
}

const BAR_CHART_SCRIPT = function () {
    const wrapper = this;

    function getChartData() {
        try {
            return JSON.parse(wrapper.getAttribute("data-chart") || "{}");
        } catch (error) {
            return {};
        }
    }

    function applyChartData(data) {
        wrapper.setAttribute("data-chart", JSON.stringify(data));

        const titleEl = wrapper.querySelector(".bc-title");
        if (titleEl) titleEl.textContent = data.title;

        const plotEl = wrapper.querySelector(".bc-plot");
        if (plotEl) {
            plotEl.innerHTML = data.bars.map((bar) => `
                <div class="bc-bar-col">
                    <span class="bc-bar-value">${bar.value.toFixed(2).replace(/\.00$/, ",00")}%</span>
                    <div class="bc-bar" style="height:${bar.value}%;background-color:${bar.color};"></div>
                </div>`).join("");
        }

        let legendEl = wrapper.querySelector(".bc-legend");
        if (data.showLegend) {
            const legendHtml = data.bars.map((bar) => `
                <div class="bc-legend-item">
                    <span class="bc-legend-dot" style="background-color:${bar.color};"></span>
                    <span>${bar.label}</span>
                </div>`).join("");

            if (legendEl) {
                legendEl.innerHTML = legendHtml;
            } else {
                legendEl = document.createElement("div");
                legendEl.className = "bc-legend";
                legendEl.innerHTML = legendHtml;
                wrapper.appendChild(legendEl);
            }
        } else if (legendEl) {
            legendEl.remove();
        }
    }

    const manageBtn = wrapper.querySelector("[data-bc-manage]");
    if (manageBtn && !manageBtn.dataset.bcBound) {
        manageBtn.dataset.bcBound = "true";
        manageBtn.addEventListener("click", () => {
            window.__openBarChartModal(getChartData(), applyChartData);
        });
    }
};

export function initializeBarChartBlocks(editor) {
    if (typeof window !== "undefined" && !window.__openBarChartModal) {
        window.__openBarChartModal = openBarChartModal;
    }

    editor.DomComponents.addType(BAR_CHART_COMPONENT_TYPE, {
        isComponent: (el) => el?.classList?.contains?.("bc-wrapper"),
        model: {
            defaults: {
                tagName: "div",
                classes: ["bc-wrapper"],
                editable: false,
                droppable: false,
                highlightable: false,
                draggable: true,
                removable: true,
                copyable: true,
                script: BAR_CHART_SCRIPT,
                traits: [],
                attributes: {
                    "data-chart": JSON.stringify(BAR_CHART_DEFAULT_DATA),
                },
            },
        },
    });
}

const iconBarChart = `<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;

export const barChartBlocks = [
    {
        id: "bar-chart-section",
        label: "Gráfico de barras",
        category: "Gráficos",
        media: iconBarChart,
        content: `
${renderChartMarkup(BAR_CHART_DEFAULT_DATA)}
${BAR_CHART_STYLES}`,
    },
];

export function initBarChartBlocks(editor) {
    registerBarChartComponent(editor);
}