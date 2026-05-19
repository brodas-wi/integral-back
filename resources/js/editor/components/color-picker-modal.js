const THEME_COLORS = [
    {
        label: "Primary",
        value: "#f0872a",
        textClass: "text-[#f0872a]",
        bgClass: "bg-[#f0872a]",
        borderClass: "border-[#f0872a]",
    },
    {
        label: "Secondary",
        value: "#0d3f6a",
        textClass: "text-[#0d3f6a]",
        bgClass: "bg-[#0d3f6a]",
        borderClass: "border-[#0d3f6a]",
    },
    {
        label: "Light",
        value: "#f4f4f4",
        textClass: "text-[#f4f4f4]",
        bgClass: "bg-[#f4f4f4]",
        borderClass: "border-[#f4f4f4]",
    },
    {
        label: "Blanco",
        value: "#ffffff",
        textClass: "text-white",
        bgClass: "bg-white",
        borderClass: "border-white",
    },
    {
        label: "Negro",
        value: "#000000",
        textClass: "text-black",
        bgClass: "bg-black",
        borderClass: "border-black",
    },
    {
        label: "Transparente",
        value: "transparent",
        textClass: "text-transparent",
        bgClass: "bg-transparent",
        borderClass: "border-transparent",
    },
];

const TAILWIND_SCALES = {
    slate: [
        "#f8fafc",
        "#f1f5f9",
        "#e2e8f0",
        "#cbd5e1",
        "#94a3b8",
        "#64748b",
        "#475569",
        "#334155",
        "#1e293b",
        "#0f172a",
        "#020617",
    ],
    red: [
        "#fff1f2",
        "#ffe4e6",
        "#fecdd3",
        "#fda4af",
        "#fb7185",
        "#f43f5e",
        "#e11d48",
        "#be123c",
        "#9f1239",
        "#881337",
        "#4c0519",
    ],
    orange: [
        "#fff7ed",
        "#ffedd5",
        "#fed7aa",
        "#fdba74",
        "#fb923c",
        "#f97316",
        "#ea580c",
        "#c2410c",
        "#9a3412",
        "#7c2d12",
        "#431407",
    ],
    amber: [
        "#fffbeb",
        "#fef3c7",
        "#fde68a",
        "#fcd34d",
        "#fbbf24",
        "#f59e0b",
        "#d97706",
        "#b45309",
        "#92400e",
        "#78350f",
        "#451a03",
    ],
    yellow: [
        "#fefce8",
        "#fef9c3",
        "#fef08a",
        "#fde047",
        "#facc15",
        "#eab308",
        "#ca8a04",
        "#a16207",
        "#854d0e",
        "#713f12",
        "#422006",
    ],
    lime: [
        "#f7fee7",
        "#ecfccb",
        "#d9f99d",
        "#bef264",
        "#a3e635",
        "#84cc16",
        "#65a30d",
        "#4d7c0f",
        "#3f6212",
        "#365314",
        "#1a2e05",
    ],
    green: [
        "#f0fdf4",
        "#dcfce7",
        "#bbf7d0",
        "#86efac",
        "#4ade80",
        "#22c55e",
        "#16a34a",
        "#15803d",
        "#166534",
        "#14532d",
        "#052e16",
    ],
    teal: [
        "#f0fdfa",
        "#ccfbf1",
        "#99f6e4",
        "#5eead4",
        "#2dd4bf",
        "#14b8a6",
        "#0d9488",
        "#0f766e",
        "#115e59",
        "#134e4a",
        "#042f2e",
    ],
    cyan: [
        "#ecfeff",
        "#cffafe",
        "#a5f3fc",
        "#67e8f9",
        "#22d3ee",
        "#06b6d4",
        "#0891b2",
        "#0e7490",
        "#155e75",
        "#164e63",
        "#083344",
    ],
    blue: [
        "#eff6ff",
        "#dbeafe",
        "#bfdbfe",
        "#93c5fd",
        "#60a5fa",
        "#3b82f6",
        "#2563eb",
        "#1d4ed8",
        "#1e40af",
        "#1e3a8a",
        "#172554",
    ],
    indigo: [
        "#eef2ff",
        "#e0e7ff",
        "#c7d2fe",
        "#a5b4fc",
        "#818cf8",
        "#6366f1",
        "#4f46e5",
        "#4338ca",
        "#3730a3",
        "#312e81",
        "#1e1b4b",
    ],
    violet: [
        "#f5f3ff",
        "#ede9fe",
        "#ddd6fe",
        "#c4b5fd",
        "#a78bfa",
        "#8b5cf6",
        "#7c3aed",
        "#6d28d9",
        "#5b21b6",
        "#4c1d95",
        "#2e1065",
    ],
    purple: [
        "#faf5ff",
        "#f3e8ff",
        "#e9d5ff",
        "#d8b4fe",
        "#c084fc",
        "#a855f7",
        "#9333ea",
        "#7e22ce",
        "#6b21a8",
        "#581c87",
        "#3b0764",
    ],
    pink: [
        "#fdf2f8",
        "#fce7f3",
        "#fbcfe8",
        "#f9a8d4",
        "#f472b6",
        "#ec4899",
        "#db2777",
        "#be185d",
        "#9d174d",
        "#831843",
        "#500724",
    ],
    rose: [
        "#fff1f2",
        "#ffe4e6",
        "#fecdd3",
        "#fda4af",
        "#fb7185",
        "#f43f5e",
        "#e11d48",
        "#be123c",
        "#9f1239",
        "#881337",
        "#4c0519",
    ],
};

const TAILWIND_SHADE_LABELS = [
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
];

const TAB_CONFIG = {
    text: { label: "Texto", prefix: "text-", prop: "textClass", type: "color" },
    bg: { label: "Fondo", prefix: "bg-", prop: "bgClass", type: "color" },
    border: {
        label: "Borde",
        prefix: "border-",
        prop: "borderClass",
        type: "color",
    },
    radius: { label: "Radio", prefix: "rounded-", type: "radius" },
    typo: { label: "Texto", prefix: "", type: "typo" },
};

const RADIUS_OPTIONS = [
    { label: "Ninguno", cls: "rounded-none", preview: "0px" },
    { label: "XS", cls: "rounded-sm", preview: "2px" },
    { label: "SM", cls: "rounded", preview: "4px" },
    { label: "MD", cls: "rounded-md", preview: "6px" },
    { label: "LG", cls: "rounded-lg", preview: "8px" },
    { label: "XL", cls: "rounded-xl", preview: "12px" },
    { label: "2XL", cls: "rounded-2xl", preview: "16px" },
    { label: "3XL", cls: "rounded-3xl", preview: "24px" },
    { label: "Completo", cls: "rounded-full", preview: "9999px" },
];

const FONT_SIZES = [
    { label: "XS", cls: "text-xs", size: "12px" },
    { label: "SM", cls: "text-sm", size: "14px" },
    { label: "Base", cls: "text-base", size: "16px" },
    { label: "LG", cls: "text-lg", size: "18px" },
    { label: "XL", cls: "text-xl", size: "20px" },
    { label: "2XL", cls: "text-2xl", size: "24px" },
    { label: "3XL", cls: "text-3xl", size: "30px" },
    { label: "4XL", cls: "text-4xl", size: "36px" },
    { label: "5XL", cls: "text-5xl", size: "48px" },
    { label: "6XL", cls: "text-6xl", size: "60px" },
    { label: "7XL", cls: "text-7xl", size: "72px" },
    { label: "8XL", cls: "text-8xl", size: "96px" },
    { label: "9XL", cls: "text-9xl", size: "128px" },
];

const FONT_WEIGHTS = [
    { label: "Thin", cls: "font-thin", weight: "100" },
    { label: "ExtraLight", cls: "font-extralight", weight: "200" },
    { label: "Light", cls: "font-light", weight: "300" },
    { label: "Normal", cls: "font-normal", weight: "400" },
    { label: "Medium", cls: "font-medium", weight: "500" },
    { label: "SemiBold", cls: "font-semibold", weight: "600" },
    { label: "Bold", cls: "font-bold", weight: "700" },
    { label: "ExtraBold", cls: "font-extrabold", weight: "800" },
    { label: "Black", cls: "font-black", weight: "900" },
];

const EXCLUDED_TYPES = [
    "map-component",
    "banner-component",
    "banner-single-component",
];

export class ColorPickerModal {
    constructor() {
        this._overlay = null;
        this._onConfirm = null;
        this._activeTab = "bg";
        this._pending = {};
        this._bound = {
            onOverlayClick: this._onOverlayClick.bind(this),
            onKeyDown: this._onKeyDown.bind(this),
        };
    }

    get isOpen() {
        return !!this._overlay;
    }

    open(component, onConfirm) {
        if (this._overlay) this.close();
        this._onConfirm = onConfirm;
        this._pending = {};
        this._component = component;
        this._render();
        document.addEventListener("keydown", this._bound.onKeyDown);
    }

    close() {
        if (!this._overlay) return;
        this._overlay.remove();
        this._overlay = null;
        this._onConfirm = null;
        this._component = null;
        document.removeEventListener("keydown", this._bound.onKeyDown);
    }

    destroy() {
        this.close();
    }

    _onOverlayClick(e) {
        if (e.target === this._overlay) this.close();
    }
    _onKeyDown(e) {
        if (e.key === "Escape") this.close();
    }

    _render() {
        this._overlay = document.createElement("div");
        this._overlay.className = "cp-overlay";
        this._overlay.addEventListener("click", this._bound.onOverlayClick);

        const modal = document.createElement("div");
        modal.className = "cp-modal";
        modal.innerHTML = this._getTemplate();

        this._overlay.appendChild(modal);
        document.body.appendChild(this._overlay);
        this._bindEvents(modal);
    }

    _getTemplate() {
        const tabs = Object.entries(TAB_CONFIG)
            .map(
                ([key, cfg]) =>
                    `<button class="cp-tab${key === this._activeTab ? " active" : ""}" data-tab="${key}">${cfg.label}</button>`,
            )
            .join("");

        const type = TAB_CONFIG[this._activeTab].type;

        return `
            <div class="cp-header">
                <div class="cp-title"><i class="ri-brush-line"></i><span>Estilos</span></div>
                <div class="cp-tabs">${tabs}</div>
                <button class="cp-close" data-action="close"><i class="ri-close-line"></i></button>
            </div>
            <div class="cp-body">
                ${this._renderBody()}
            </div>
            <div class="cp-footer">
                ${type !== "typo" && type !== "radius" ? `<button class="cp-btn-remove" data-action="remove"><i class="ri-eraser-line"></i> Quitar</button>` : `<div></div>`}
                <div class="cp-footer-right">
                    <button class="cp-btn-confirm" data-action="confirm">
                        <i class="ri-check-line"></i> Aplicar
                    </button>
                </div>
            </div>
        `;
    }

    _renderBody() {
        const type = TAB_CONFIG[this._activeTab].type;
        if (type === "color")
            return (
                this._getSectionTheme() +
                this._getSectionScale() +
                this._getSectionCustom()
            );
        if (type === "radius") return this._getSectionRadius();
        if (type === "typo") return this._getSectionTypo();
        return "";
    }

    _getSectionTheme() {
        const prop = TAB_CONFIG[this._activeTab].prop;
        const pending = this._pending[this._activeTab];
        const swatches = THEME_COLORS.map((c) => {
            const isTransparent = c.value === "transparent";
            const isSelected = pending && pending.cls === c[prop];
            const style = isTransparent
                ? `background:repeating-conic-gradient(#ccc 0% 25%,#fff 0% 50%) 0 0/10px 10px;`
                : `background:${c.value};border-color:${c.value === "#ffffff" ? "#e2e8f0" : c.value};`;
            return `<button class="cp-swatch${isSelected ? " selected" : ""}" style="${style}" title="${c.label}" data-class="${c[prop]}" data-value="${c.value}"></button>`;
        }).join("");
        return `
            <div class="cp-section">
                <span class="cp-section-label">Tema</span>
                <div class="cp-swatches">${swatches}</div>
            </div>
        `;
    }

    _getSectionScale() {
        const pending = this._pending[this._activeTab];
        const rows = Object.keys(TAILWIND_SCALES)
            .map((name) => {
                const cells = TAILWIND_SCALES[name]
                    .map((hex, i) => {
                        const shade = TAILWIND_SHADE_LABELS[i];
                        const isSelected = pending && pending.value === hex;
                        return `<button class="cp-scale-cell${isSelected ? " selected" : ""}" style="background:${hex};" title="${name}-${shade} ${hex}" data-value="${hex}"></button>`;
                    })
                    .join("");
                return `<div class="cp-scale-row"><span class="cp-scale-name">${name}</span><div class="cp-scale-cells">${cells}</div></div>`;
            })
            .join("");
        return `
            <div class="cp-section">
                <span class="cp-section-label">Escala Tailwind</span>
                <div class="cp-scale">${rows}</div>
            </div>
        `;
    }

    _getSectionRadius() {
        const pending = this._pending["radius"];
        const items = RADIUS_OPTIONS.map((opt) => {
            const isSelected = pending && pending.cls === opt.cls;
            return `
                <button class="cp-radius-item${isSelected ? " selected" : ""}" data-cls="${opt.cls}" data-prefix="rounded-" title="${opt.cls}">
                    <span class="cp-radius-preview" style="border-radius:${opt.preview};"></span>
                    <span class="cp-radius-label">${opt.label}</span>
                </button>
            `;
        }).join("");
        return `
            <div class="cp-section">
                <span class="cp-section-label">Border Radius</span>
                <div class="cp-radius-grid">${items}</div>
            </div>
        `;
    }

    _getSectionTypo() {
        const pendingSize = this._pending["typo-size"];
        const pendingWeight = this._pending["typo-weight"];

        const sizeItems = FONT_SIZES.map((opt) => {
            const isSelected = pendingSize && pendingSize.cls === opt.cls;
            return `
                <button class="cp-typo-size-item${isSelected ? " selected" : ""}" data-cls="${opt.cls}" data-prefix="text-size" title="${opt.size}">
                    <span style="font-size:${Math.min(parseInt(opt.size), 22)}px;line-height:1;">${opt.label}</span>
                </button>
            `;
        }).join("");

        const weightItems = FONT_WEIGHTS.map((opt) => {
            const isSelected = pendingWeight && pendingWeight.cls === opt.cls;
            return `
                <button class="cp-typo-weight-item${isSelected ? " selected" : ""}" data-cls="${opt.cls}" data-prefix="font-" title="font-weight: ${opt.weight}">
                    <span style="font-weight:${opt.weight};">${opt.label}</span>
                </button>
            `;
        }).join("");

        return `
            <div class="cp-section">
                <span class="cp-section-label">Tamaño de fuente</span>
                <div class="cp-typo-size-grid">${sizeItems}</div>
            </div>
            <div class="cp-section">
                <span class="cp-section-label">Peso de fuente</span>
                <div class="cp-typo-weight-grid">${weightItems}</div>
            </div>
        `;
    }

    _getSectionCustom() {
        const prefix = TAB_CONFIG[this._activeTab].prefix;
        return `
            <div class="cp-section">
                <span class="cp-section-label">Personalizado</span>
                <div class="cp-custom-row">
                    <input type="color" class="cp-color-input" id="cp-hex-picker" value="#000000">
                    <input type="text" class="cp-hex-input" placeholder="#000000" maxlength="7" spellcheck="false">
                    <button class="cp-btn-apply" data-action="apply-custom">Seleccionar</button>
                </div>
                <p class="cp-custom-hint">Genera clase <code>${prefix}[#hex]</code> con estilo inline como respaldo.</p>
            </div>
        `;
    }

    _rebuildBody(modal) {
        modal.querySelector(".cp-body").innerHTML = this._renderBody();
        modal.querySelector(".cp-footer").innerHTML = this._renderFooter();
        this._bindFooterEvents(modal);
        this._bindBodyEvents(modal);
    }

    _renderFooter() {
        const type = TAB_CONFIG[this._activeTab].type;
        const removeBtn =
            type !== "typo" && type !== "radius"
                ? `<button class="cp-btn-remove" data-action="remove"><i class="ri-eraser-line"></i> Quitar</button>`
                : `<div></div>`;
        return `
            ${removeBtn}
            <div class="cp-footer-right">
                <button class="cp-btn-confirm" data-action="confirm">
                    <i class="ri-check-line"></i> Aplicar
                </button>
            </div>
        `;
    }

    _bindEvents(modal) {
        modal
            .querySelector("[data-action='close']")
            .addEventListener("click", () => this.close());

        modal.querySelectorAll(".cp-tab").forEach((tab) => {
            tab.addEventListener("click", () => {
                this._activeTab = tab.dataset.tab;
                modal
                    .querySelectorAll(".cp-tab")
                    .forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");
                this._rebuildBody(modal);
            });
        });

        this._bindFooterEvents(modal);

        this._bindBodyEvents(modal);
    }

    _bindFooterEvents(modal) {
        modal
            .querySelector("[data-action='remove']")
            ?.addEventListener("click", () => {
                const prefix = TAB_CONFIG[this._activeTab].prefix;
                this._pending[this._activeTab] = { action: "remove", prefix };
                this._rebuildBody(modal);
            });

        modal
            .querySelector("[data-action='confirm']")
            .addEventListener("click", () => {
                const changes = Object.values(this._pending);
                const cb = this._onConfirm;
                this.close();
                if (cb && changes.length > 0) cb(changes);
            });
    }

    _bindBodyEvents(modal) {
        modal.querySelectorAll(".cp-swatch").forEach((btn) => {
            btn.addEventListener("click", () => {
                const cls = btn.dataset.class;
                const value = btn.dataset.value;
                const prefix = TAB_CONFIG[this._activeTab].prefix;
                this._pending[this._activeTab] = {
                    action: "apply",
                    cls,
                    value,
                    prefix,
                };
                this._rebuildBody(modal);
            });
        });

        modal.querySelectorAll(".cp-scale-cell").forEach((btn) => {
            btn.addEventListener("click", () => {
                const value = btn.dataset.value;
                const prefix = TAB_CONFIG[this._activeTab].prefix;
                this._pending[this._activeTab] = {
                    action: "apply-custom",
                    cls: `${prefix}[${value}]`,
                    value,
                    prefix,
                };
                this._rebuildBody(modal);
            });
        });

        const colorInput = modal.querySelector("#cp-hex-picker");
        const hexInput = modal.querySelector(".cp-hex-input");

        colorInput?.addEventListener("input", () => {
            hexInput.value = colorInput.value;
        });

        hexInput?.addEventListener("input", () => {
            if (/^#[0-9a-fA-F]{6}$/.test(hexInput.value)) {
                colorInput.value = hexInput.value;
            }
        });

        modal
            .querySelector("[data-action='apply-custom']")
            ?.addEventListener("click", () => {
                const hex = colorInput?.value || "#000000";
                const prefix = TAB_CONFIG[this._activeTab].prefix;
                this._pending[this._activeTab] = {
                    action: "apply-custom",
                    cls: `${prefix}[${hex}]`,
                    value: hex,
                    prefix,
                };
                this._rebuildBody(modal);
            });

        modal.querySelectorAll(".cp-radius-item").forEach((btn) => {
            btn.addEventListener("click", () => {
                this._pending["radius"] = {
                    action: "apply",
                    cls: btn.dataset.cls,
                    prefix: "rounded-",
                };
                this._rebuildBody(modal);
            });
        });

        modal.querySelectorAll(".cp-typo-size-item").forEach((btn) => {
            btn.addEventListener("click", () => {
                this._pending["typo-size"] = {
                    action: "apply",
                    cls: btn.dataset.cls,
                    prefix: "text-size",
                };
                this._rebuildBody(modal);
            });
        });

        modal.querySelectorAll(".cp-typo-weight-item").forEach((btn) => {
            btn.addEventListener("click", () => {
                this._pending["typo-weight"] = {
                    action: "apply",
                    cls: btn.dataset.cls,
                    prefix: "font-",
                };
                this._rebuildBody(modal);
            });
        });
    }
}

export function isExcludedFromColorPicker(component) {
    return EXCLUDED_TYPES.includes(component.get("type"));
}

const NAMED_THEME = new Set([
    "white",
    "black",
    "transparent",
    "inherit",
    "current",
]);
const VALID_SHADES = new Set([
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
]);
const RADIUS_CLASSES = new Set([
    "rounded-none",
    "rounded-sm",
    "rounded",
    "rounded-md",
    "rounded-lg",
    "rounded-xl",
    "rounded-2xl",
    "rounded-3xl",
    "rounded-full",
]);
const FONT_SIZE_CLASSES = new Set([
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "text-7xl",
    "text-8xl",
    "text-9xl",
]);
const FONT_WEIGHT_CLASSES = new Set([
    "font-thin",
    "font-extralight",
    "font-light",
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
    "font-extrabold",
    "font-black",
]);

const CSS_PROP_MAP = {
    "text-": "color",
    "bg-": "background-color",
    "border-": "border-color",
};

export function applyColorToComponent(editor, component, changes) {
    if (!component || !changes || changes.length === 0) return;

    let classes = component.getClasses();
    const style = Object.assign({}, component.getStyle() || {});

    changes.forEach(({ action, cls, value, prefix }) => {
        if (prefix === "rounded-") {
            classes = classes.filter((c) => !RADIUS_CLASSES.has(c));
            if (action !== "remove") classes.push(cls);
            return;
        }

        if (prefix === "text-size") {
            classes = classes.filter((c) => !FONT_SIZE_CLASSES.has(c));
            if (action !== "remove") classes.push(cls);
            return;
        }

        if (prefix === "font-") {
            classes = classes.filter((c) => !FONT_WEIGHT_CLASSES.has(c));
            if (action !== "remove") classes.push(cls);
            return;
        }

        const cssProp = CSS_PROP_MAP[prefix];
        classes = _stripColorClasses(classes, prefix);

        if (prefix === "border-") {
            classes = classes.filter((c) => c !== "border");
        }

        if (action === "remove") {
            delete style[cssProp];
            return;
        }

        if (action === "apply-custom") {
            style[cssProp] = value;
            classes.push(cls);
        } else {
            delete style[cssProp];
            classes.push(cls);
        }

        if (prefix === "border-") {
            classes.unshift("border");
        }
    });

    component.setClass(classes);
    component.setStyle(style);

    _notify("Estilos aplicados correctamente", "success");
}

function _stripColorClasses(classes, prefix) {
    return classes.filter((c) => {
        if (!c.startsWith(prefix)) return true;
        const rest = c.slice(prefix.length);
        if (rest.startsWith("[")) return false;
        if (NAMED_THEME.has(rest)) return false;
        const parts = rest.split("-");
        if (VALID_SHADES.has(parts[parts.length - 1])) return false;
        return true;
    });
}

function _notify(msg, type) {
    if (typeof window.showNotification === "function") {
        window.showNotification(msg, type);
    }
}
