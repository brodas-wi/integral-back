import { assetUrl } from "@/utils/url.js";
import { openMediaPicker } from "@/editor/media-picker";

const THEME_COLORS = {
    blue: { bg: "#003B71", text: "#ffffff" },
    orange: { bg: "#E97300", text: "#ffffff" },
    white: { bg: "#ffffff", text: "#003B71" },
};

const BANNER_STYLES = `
<style>
.pb-section{position:relative;width:100%;min-height:460px;display:flex;align-items:center;overflow:hidden;font-family:'Poppins',sans-serif;background:#0a0a0a;}
.pb-bg{position:absolute;inset:0;z-index:0;}
.pb-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.pb-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.15) 55%,rgba(0,0,0,0) 100%);}
.pb-content{position:relative;z-index:10;padding:3.5rem 4rem;max-width:600px;}
.pb-box{position:relative;border-radius:1rem;padding:1.5rem 2rem;}
.pb-box::before,.pb-box::after{content:"";position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,#E97300 0%,#E97300 30%,rgba(233,115,0,0) 85%);}
.pb-box::before{top:0;border-top-left-radius:1rem;}
.pb-box::after{bottom:0;border-bottom-left-radius:1rem;}
.pb-box-left{position:absolute;top:0;left:0;bottom:0;width:2px;background:#E97300;border-top-left-radius:1rem;border-bottom-left-radius:1rem;}
.pb-box-inner{position:relative;z-index:2;display:flex;flex-direction:column;gap:0.75rem;}
.pb-badge{display:inline-block;align-self:flex-start;padding:0.6rem 1.25rem;border-radius:0.5rem;font-size:1.375rem;line-height:1.25;font-weight:800;background:var(--pb-theme-bg,#003B71);color:var(--pb-theme-text,#fff);margin-bottom:0.5rem;}
.pb-subtitle{margin:0;font-size:1.0625rem;font-weight:500;color:#fff;line-height:1.4;background:transparent;}
.pb-curve{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:auto;line-height:0;z-index:5;pointer-events:none;}
.pb-curve svg{display:block;width:100%;height:110px;}
.pb-curve path{fill:var(--pb-theme-bg,#003B71);}
@media(max-width:992px){
.pb-content{padding:3rem 2.5rem;max-width:100%;}
.pb-badge{font-size:1.1875rem;}
}
@media(max-width:640px){
.pb-content{padding:3rem 1.5rem;}
.pb-box{padding:1.125rem 1.25rem;}
.pb-badge{font-size:1.0625rem;padding:0.5rem 1rem;}
.pb-subtitle{font-size:0.9375rem;}
.pb-curve svg{height:60px;}
}
</style>`;

function buildBannerHTML(data, uid) {
    uid = uid || "pb" + Math.random().toString(36).slice(2, 7);
    const bgImage = data.bg_image || assetUrl("images/placeholder.svg");
    const theme = THEME_COLORS[data.theme] ? data.theme : "blue";
    const themeColors = THEME_COLORS[theme];

    const subtitleHtml = data.subtitle
        ? `<p class="pb-subtitle">${data.subtitle}</p>`
        : "";

    return `<section id="pb-root-${uid}" class="pb-section" style="--pb-theme-bg:${themeColors.bg};--pb-theme-text:${themeColors.text};" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="pb-bg" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <img src="${bgImage}" alt="${data.title || "Banner"}" loading="eager" decoding="async" fetchpriority="high" draggable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false">
        </div>
        <div class="pb-content">
            <div class="pb-box">
                <div class="pb-box-left"></div>
                <div class="pb-box-inner">
                    <span class="pb-badge">${data.title || "Título del banner"}</span>
                    ${subtitleHtml}
                </div>
            </div>
        </div>
        <div class="pb-curve" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <svg viewBox="0 0 1200 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,110 L0,75 C250,15 550,95 850,55 C1000,35 1100,20 1200,0 L1200,110 Z"></path>
            </svg>
        </div>
    </section>`;
}

const DEFAULT_DATA = {
    bg_image: assetUrl("images/placeholder.svg"),
    theme: "blue",
    title: "Cuenta de Ahorro Electrónico",
    subtitle: "Recupera el control de tus finanzas. Fácil de usar, práctica para tu día a día y disponible cuando la necesites.",
};

function showBannerModal(editor, component) {
    const existing = document.getElementById("banner-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("pb-modal-styles")) {
        const style = document.createElement("style");
        style.id = "pb-modal-styles";
        style.textContent = `
            .pb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .pb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .pb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .pb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .pb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .pb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .pb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .pb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .pb-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;overflow-x:auto;}
            .pb-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
            .pb-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .pb-tab-btn i{font-size:1rem;}
            .pb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .pb-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .pb-tab-panel.active{display:flex;}
            .pb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .pb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .pb-row{display:flex;gap:0.75rem;align-items:center;}
            .pb-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .pb-input:focus{border-color:#3b82f6;}
            textarea.pb-input{resize:vertical;min-height:80px;font-family:inherit;}
            .pb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .pb-pick-btn:hover{background:#002a52;}
            .pb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .pb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .pb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .pb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .pb-btn-save:hover{background:#d97821;}
            .pb-theme-toggle{display:flex;gap:0.5rem;}
            .pb-theme-opt{flex:1;padding:0.625rem 0.5rem;border-radius:0.5rem;font-size:0.8125rem;font-weight:700;cursor:pointer;border:2px solid #e2e8f0;transition:all 0.15s;font-family:inherit;text-align:center;}
            .pb-theme-opt-blue{background:#003B71;color:#fff;}
            .pb-theme-opt-orange{background:#E97300;color:#fff;}
            .pb-theme-opt-white{background:#ffffff;color:#003B71;border-color:#cbd5e1;}
            .pb-theme-opt.pb-theme-inactive{opacity:0.35;}
            .pb-theme-opt.pb-theme-inactive:hover{opacity:0.65;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-banner-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const bgImage = currentData.bg_image || DEFAULT_DATA.bg_image;
    const theme = currentData.theme || DEFAULT_DATA.theme;
    const title = currentData.title || DEFAULT_DATA.title;
    const subtitle = currentData.subtitle ?? DEFAULT_DATA.subtitle;

    const overlay = document.createElement("div");
    overlay.id = "banner-config-modal";
    overlay.className = "pb-overlay";

    const modal = document.createElement("div");
    modal.className = "pb-modal";
    modal.innerHTML = `
        <div class="pb-modal-header">
            <div class="pb-modal-header-left"><i class="ri-image-2-line"></i><h2>Configurar Banner</h2></div>
            <button id="pb-modal-close" class="pb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="pb-modal-tabs">
            <button class="pb-tab-btn active" data-tab="bg"><i class="ri-image-line"></i> Fondo</button>
            <button class="pb-tab-btn" data-tab="content"><i class="ri-text"></i> Contenido</button>
            <button class="pb-tab-btn" data-tab="theme"><i class="ri-palette-line"></i> Tema</button>
        </div>
        <div class="pb-modal-body">
            <div class="pb-tab-panel active" id="pb-panel-bg">
                <div class="pb-card">
                    <label class="pb-label">Imagen de fondo</label>
                    <div class="pb-row" style="align-items:flex-start;flex-wrap:wrap;gap:0.75rem;">
                        <div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:0.5rem;">
                            <img id="pb-bg-preview" src="${bgImage}" style="height:90px;width:100%;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;">
                            <input id="pb-bg-url" type="text" placeholder="URL de la imagen" value="${bgImage}" class="pb-input">
                        </div>
                        <button id="pb-bg-pick" class="pb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
            </div>
            <div class="pb-tab-panel" id="pb-panel-content">
                <div class="pb-card">
                    <label class="pb-label">Título (requerido)</label>
                    <input id="pb-title" type="text" placeholder="Título del banner" value="${title}" class="pb-input">
                </div>
                <div class="pb-card">
                    <label class="pb-label">Subtítulo (opcional)</label>
                    <textarea id="pb-subtitle" placeholder="Déjalo vacío si no quieres subtítulo" class="pb-input">${subtitle}</textarea>
                </div>
            </div>
            <div class="pb-tab-panel" id="pb-panel-theme">
                <div class="pb-card">
                    <label class="pb-label">Color de tema (aplica al título y a la curva)</label>
                    <div class="pb-theme-toggle" id="pb-theme-colors">
                        <button type="button" class="pb-theme-opt pb-theme-opt-blue" data-theme="blue">Azul</button>
                        <button type="button" class="pb-theme-opt pb-theme-opt-orange" data-theme="orange">Naranja</button>
                        <button type="button" class="pb-theme-opt pb-theme-opt-white" data-theme="white">Blanco</button>
                    </div>
                    <p style="font-size:0.75rem;color:#94a3b8;margin:0.75rem 0 0;">El marco lateral izquierdo y las líneas superior/inferior siempre son naranja, independientemente del tema elegido.</p>
                </div>
            </div>
        </div>
        <div class="pb-modal-footer">
            <button id="pb-modal-cancel" class="pb-btn-cancel">Cancelar</button>
            <button id="pb-modal-save" class="pb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    let selectedTheme = THEME_COLORS[theme] ? theme : "blue";

    function setupThemeToggle() {
        const wrap = modal.querySelector("#pb-theme-colors");
        wrap.querySelectorAll("[data-theme]").forEach((btn) => {
            btn.classList.toggle(
                "pb-theme-inactive",
                btn.dataset.theme !== selectedTheme,
            );
            btn.addEventListener("click", () => {
                selectedTheme = btn.dataset.theme;
                wrap.querySelectorAll("[data-theme]").forEach((b) =>
                    b.classList.toggle(
                        "pb-theme-inactive",
                        b.dataset.theme !== selectedTheme,
                    ),
                );
            });
        });
    }
    setupThemeToggle();

    modal.querySelectorAll(".pb-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".pb-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".pb-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#pb-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    modal.querySelector("#pb-bg-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar imagen de fondo",
            onSelect: (url) => {
                modal.querySelector("#pb-bg-url").value = url;
                modal.querySelector("#pb-bg-preview").src = url;
            },
        });
    });

    modal.querySelector("#pb-bg-url").addEventListener("input", (e) => {
        modal.querySelector("#pb-bg-preview").src = e.target.value;
    });

    const close = () => overlay.remove();
    modal.querySelector("#pb-modal-close").onclick = close;
    modal.querySelector("#pb-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#pb-modal-save").onclick = () => {
        const data = {
            bg_image:
                modal.querySelector("#pb-bg-url").value.trim() ||
                DEFAULT_DATA.bg_image,
            theme: selectedTheme,
            title: modal.querySelector("#pb-title").value.trim(),
            subtitle: modal.querySelector("#pb-subtitle").value.trim(),
        };

        const existingInner = component
            .getEl()
            ?.querySelector("[id^='pb-root-']");
        const uid =
            existingInner?.id?.replace("pb-root-", "") ||
            "pb" + Math.random().toString(36).slice(2, 7);
        component.addAttributes({
            "data-banner-config": JSON.stringify(data),
        });
        component.components(
            buildBannerHTML(data, uid) + BANNER_STYLES,
        );
        close();
    };
}

export function initializeHeroBannerBlock(editor) {
    const componentType = "banner-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Banner",
                tagName: "div",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: {
                    "data-gjs-type": componentType,
                    "data-banner-config": JSON.stringify(DEFAULT_DATA),
                },
                components:
                    buildBannerHTML(DEFAULT_DATA) + BANNER_STYLES,
                traits: [
                    {
                        type: "button",
                        label: "Banner",
                        text: "Administrar Banner",
                        full: true,
                        command: "open-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("banner-block", {
        label: "Banner",
        category: "Banners",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="4" y="6" width="18" height="8" rx="1" fill="none" stroke="#E97300" stroke-width="1"/>
            <rect x="6" y="8" width="10" height="4" rx="1" fill="#E97300"/>
            <path d="M2 26 C10 18 22 30 30 22 L30 30 L2 30 Z" fill="#003B71"/>
        </svg>`,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });
}