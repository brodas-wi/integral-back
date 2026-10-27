import {
    TAB_CONFIG,
    DEFAULT_TAB,
    THEME_COLORS,
    TAILWIND_SCALES,
    TAILWIND_SHADE_LABELS,
    RADIUS_OPTIONS,
    FONT_SIZES,
    FONT_WEIGHTS,
} from "./constants";

const pickAttrs = (key, prefix, cls, value) =>
    `data-action="pick" data-key="${key}" data-prefix="${prefix}" data-cls="${cls}" data-value="${value}"`;

export class ColorPickerModal {
    constructor() {
        this._overlay = null;
        this._modal = null;
        this._component = null;
        this._onConfirm = null;
        this._activeTab = DEFAULT_TAB;
        this._pending = {};
        this._customHex = "#000000";
        this._handleKeyDown = (e) => {
            if (e.key === "Escape") this.close();
        };
        this._handleClick = this._handleClick.bind(this);
        this._handleInput = this._handleInput.bind(this);
    }

    get isOpen() {
        return !!this._overlay;
    }

    open(component, onConfirm) {
        if (this._overlay) this.close();
        this._component = component;
        this._onConfirm = onConfirm;
        this._pending = {};
        this._activeTab = DEFAULT_TAB;
        this._render();
        document.addEventListener("keydown", this._handleKeyDown);
    }

    close() {
        if (!this._overlay) return;
        this._overlay.removeEventListener("click", this._handleClick);
        this._overlay.removeEventListener("input", this._handleInput);
        this._overlay.remove();
        this._overlay = null;
        this._modal = null;
        this._component = null;
        this._onConfirm = null;
        document.removeEventListener("keydown", this._handleKeyDown);
    }

    destroy() {
        this.close();
    }

    _render() {
        this._overlay = document.createElement("div");
        this._overlay.className = "cp-overlay";

        this._modal = document.createElement("div");
        this._modal.className = "cp-modal";
        this._modal.innerHTML = this._template();

        this._overlay.appendChild(this._modal);
        document.body.appendChild(this._overlay);
        this._overlay.addEventListener("click", this._handleClick);
        this._overlay.addEventListener("input", this._handleInput);
    }

    _refresh({ keepScroll = true } = {}) {
        const body = this._modal.querySelector(".cp-body");
        const top = keepScroll ? body.scrollTop : 0;
        this._modal.querySelectorAll(".cp-tab").forEach((tab) => {
            tab.classList.toggle("active", tab.dataset.tab === this._activeTab);
        });
        body.innerHTML = this._body();
        this._modal.querySelector(".cp-footer").innerHTML = this._footer();
        body.scrollTop = top;
    }

    _handleClick(e) {
        if (e.target === this._overlay) {
            this.close();
            return;
        }
        const el = e.target.closest("[data-action]");
        if (!el || !this._modal.contains(el)) return;
        const d = el.dataset;

        switch (d.action) {
            case "close":
                this.close();
                break;
            case "tab":
                this._activeTab = d.tab;
                this._refresh({ keepScroll: false });
                break;
            case "pick":
                this._pending[d.key] = {
                    action: "apply",
                    cls: d.cls || null,
                    value: d.value,
                    prefix: d.prefix,
                };
                this._refresh();
                break;
            case "apply-custom": {
                const picker = this._modal.querySelector("#cp-hex-picker");
                this._customHex = picker?.value || "#000000";
                this._pending[this._activeTab] = {
                    action: "apply",
                    cls: null,
                    value: this._customHex,
                    prefix: TAB_CONFIG[this._activeTab].prefix,
                };
                this._refresh();
                break;
            }
            case "remove":
                this._pending[this._activeTab] = {
                    action: "remove",
                    prefix: TAB_CONFIG[this._activeTab].prefix,
                };
                this._refresh();
                break;
            case "confirm": {
                const changes = Object.values(this._pending);
                const cb = this._onConfirm;
                this.close();
                if (cb && changes.length > 0) cb(changes);
                break;
            }
        }
    }

    _handleInput(e) {
        const picker = this._modal?.querySelector("#cp-hex-picker");
        const hex = this._modal?.querySelector(".cp-hex-input");
        if (!picker || !hex) return;
        if (e.target === picker) {
            hex.value = picker.value;
            this._customHex = picker.value;
        } else if (
            e.target === hex &&
            /^#[0-9a-fA-F]{6}$/.test(hex.value)
        ) {
            picker.value = hex.value;
            this._customHex = hex.value;
        }
    }

    _template() {
        const tabs = Object.entries(TAB_CONFIG)
            .map(
                ([key, cfg]) =>
                    `<button class="cp-tab${key === this._activeTab ? " active" : ""}" data-action="tab" data-tab="${key}">${cfg.label}</button>`,
            )
            .join("");

        return `
            <div class="cp-header">
                <div class="cp-title"><i class="ri-brush-line"></i><span>Estilos</span></div>
                <div class="cp-tabs">${tabs}</div>
                <button class="cp-close" data-action="close"><i class="ri-close-line"></i></button>
            </div>
            <div class="cp-body">${this._body()}</div>
            <div class="cp-footer">${this._footer()}</div>
        `;
    }

    _footer() {
        const removable = TAB_CONFIG[this._activeTab].type === "color";
        return `
            ${removable ? `<button class="cp-btn-remove" data-action="remove"><i class="ri-eraser-line"></i> Quitar</button>` : `<div></div>`}
            <div class="cp-footer-right">
                <button class="cp-btn-confirm" data-action="confirm">
                    <i class="ri-check-line"></i> Aplicar
                </button>
            </div>
        `;
    }

    _body() {
        const { type } = TAB_CONFIG[this._activeTab];
        if (type === "color") {
            return (
                this._themeSection() +
                this._scaleSection() +
                this._customSection()
            );
        }
        if (type === "radius") return this._radiusSection();
        return this._typoSection();
    }

    _themeSection() {
        const tab = this._activeTab;
        const { prop, prefix } = TAB_CONFIG[tab];
        const pending = this._pending[tab];
        const swatches = THEME_COLORS.map((c) => {
            const isTransparent = c.value === "transparent";
            const isSelected = pending && pending.cls === c[prop];
            const style = isTransparent
                ? `background:repeating-conic-gradient(#ccc 0% 25%,#fff 0% 50%) 0 0/10px 10px;`
                : `background:${c.value};border-color:${c.value === "#ffffff" ? "#e2e8f0" : c.value};`;
            return `<button class="cp-swatch${isSelected ? " selected" : ""}" style="${style}" title="${c.label}" ${pickAttrs(tab, prefix, c[prop], c.value)}></button>`;
        }).join("");
        return `
            <div class="cp-section">
                <span class="cp-section-label">Tema</span>
                <div class="cp-swatches">${swatches}</div>
            </div>
        `;
    }

    _scaleSection() {
        const tab = this._activeTab;
        const { prefix } = TAB_CONFIG[tab];
        const pending = this._pending[tab];
        const rows = Object.keys(TAILWIND_SCALES)
            .map((name) => {
                const cells = TAILWIND_SCALES[name]
                    .map((hex, i) => {
                        const isSelected =
                            pending && !pending.cls && pending.value === hex;
                        return `<button class="cp-scale-cell${isSelected ? " selected" : ""}" style="background:${hex};" title="${name}-${TAILWIND_SHADE_LABELS[i]} ${hex}" ${pickAttrs(tab, prefix, "", hex)}></button>`;
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

    _customSection() {
        return `
            <div class="cp-section">
                <span class="cp-section-label">Personalizado</span>
                <div class="cp-custom-row">
                    <input type="color" class="cp-color-input" id="cp-hex-picker" value="${this._customHex}">
                    <input type="text" class="cp-hex-input" placeholder="#000000" maxlength="7" spellcheck="false" value="${this._customHex}">
                    <button class="cp-btn-apply" data-action="apply-custom">Seleccionar</button>
                </div>
                <p class="cp-custom-hint">Se aplica como estilo directo del elemento y tiene prioridad sobre las clases heredadas.</p>
            </div>
        `;
    }

    _radiusSection() {
        const pending = this._pending.radius;
        const items = RADIUS_OPTIONS.map((opt) => {
            const isSelected = pending && pending.cls === opt.cls;
            return `
                <button class="cp-radius-item${isSelected ? " selected" : ""}" title="${opt.cls}" ${pickAttrs("radius", "rounded-", opt.cls, opt.preview)}>
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

    _typoSection() {
        const pendingSize = this._pending["typo-size"];
        const pendingWeight = this._pending["typo-weight"];

        const sizeItems = FONT_SIZES.map((opt) => {
            const isSelected = pendingSize && pendingSize.cls === opt.cls;
            return `
                <button class="cp-typo-size-item${isSelected ? " selected" : ""}" title="${opt.size}" ${pickAttrs("typo-size", "text-size", opt.cls, opt.size)}>
                    <span style="font-size:${Math.min(parseInt(opt.size), 22)}px;line-height:1;">${opt.label}</span>
                </button>
            `;
        }).join("");

        const weightItems = FONT_WEIGHTS.map((opt) => {
            const isSelected = pendingWeight && pendingWeight.cls === opt.cls;
            return `
                <button class="cp-typo-weight-item${isSelected ? " selected" : ""}" title="font-weight: ${opt.weight}" ${pickAttrs("typo-weight", "font-", opt.cls, opt.weight)}>
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
}