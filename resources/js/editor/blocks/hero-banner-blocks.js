import { assetUrl } from "@/utils/url.js";
import { openMediaPicker } from "@/editor/media-picker";

const THEME_COLORS = {
    blue: { bg: "#003B71", text: "#ffffff" },
    orange: { bg: "#E97300", text: "#ffffff" },
    white: { bg: "#ffffff", text: "#003B71" },
};

const HERO_BANNER_STYLES = `
<style>
.hb-section{position:relative;width:100%;min-height:460px;display:flex;align-items:center;overflow:hidden;font-family:'Poppins',sans-serif;background:#0a0a0a;}
.hb-bg{position:absolute;inset:0;z-index:0;}
.hb-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.hb-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.15) 55%,rgba(0,0,0,0) 100%);}
.hb-content{position:relative;z-index:10;padding:3.5rem 4rem;max-width:600px;}
.hb-box{position:relative;border-radius:1.5rem;padding:1.5rem 2rem;}
.hb-box::before{content:"";position:absolute;inset:0;border-radius:1.5rem;border:2px solid #E97300;-webkit-mask-image:linear-gradient(90deg,#000 0%,#000 45%,transparent 90%);mask-image:linear-gradient(90deg,#000 0%,#000 45%,transparent 90%);pointer-events:none;}
.hb-box-inner{position:relative;z-index:2;display:flex;flex-direction:column;gap:0.25rem;}
.hb-badge{display:inline-block;align-self:flex-start;padding:0.75rem 1.75rem;border-radius:1.5rem;font-size:1.75rem;line-height:1.25;font-weight:800;margin-bottom:0.75rem;margin-left:-3.5rem;background:#E97300;color:#ffffff;}
.hb-subtitle{margin:0;font-size:1.0625rem;font-weight:500;color:#fff;line-height:1.4;background:transparent;}
.hb-curve{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:auto;line-height:0;z-index:5;pointer-events:none;}
.hb-curve svg{display:block;width:100%;height:150px;}
@media(max-width:992px){
.hb-content{padding:3rem 2.5rem;max-width:100%;}
.hb-badge{font-size:1.5rem;}
}
@media(max-width:640px){
.hb-content{padding:3rem 1.5rem;}
.hb-box{padding:1.125rem 1.25rem;}
.hb-badge{font-size:1.25rem;padding:0.6rem 1.35rem;margin-left:-2.25rem;border-radius:1.125rem;}
.hb-subtitle{font-size:0.9375rem;}
.hb-curve svg{height:85px;}
}
</style>`;

function buildHeroBannerHTML(data, uid) {
    uid = uid || "hb" + Math.random().toString(36).slice(2, 7);
    const bgImage = data.bg_image || assetUrl("images/placeholder.svg");
    const theme = THEME_COLORS[data.theme] ? data.theme : "blue";
    const themeColors = THEME_COLORS[theme];

    const subtitleHtml = data.subtitle
        ? `<p class="hb-subtitle">${data.subtitle}</p>`
        : "";

    return `<section id="hb-root-${uid}" class="hb-section" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="hb-bg" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <img src="${bgImage}" alt="${data.title || "Banner"}" loading="eager" decoding="async" fetchpriority="high" draggable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false">
        </div>
        <div class="hb-content">
            <div class="hb-box">
                <div class="hb-box-inner">
                    <span class="hb-badge">${data.title || "Título del banner"}</span>
                    ${subtitleHtml}
                </div>
            </div>
        </div>
        <div class="hb-curve" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <svg viewBox="0 0 1366 230" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="${themeColors.bg}" d="M1366 0C1073.5 102.496 725.5 165.891 0 165.891V230H1366V0Z"></path>
            </svg>
        </div>
    </section>`;
}

const DEFAULT_DATA = {
    bg_image: assetUrl("images/placeholder.svg"),
    theme: "blue",
    title: "Cuenta de Ahorro Electrónico",
    subtitle:
        "Recupera el control de tus finanzas. Fácil de usar, práctica para tu día a día y disponible cuando la necesites.",
};

function showHeroBannerModal(editor, component) {
    const existing = document.getElementById("hero-banner-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("hb-modal-styles")) {
        const style = document.createElement("style");
        style.id = "hb-modal-styles";
        style.textContent = `
            .hb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .hb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .hb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .hb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .hb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .hb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .hb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .hb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .hb-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;overflow-x:auto;}
            .hb-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
            .hb-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .hb-tab-btn i{font-size:1rem;}
            .hb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .hb-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .hb-tab-panel.active{display:flex;}
            .hb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .hb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .hb-row{display:flex;gap:0.75rem;align-items:center;}
            .hb-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .hb-input:focus{border-color:#3b82f6;}
            textarea.hb-input{resize:vertical;min-height:80px;font-family:inherit;}
            .hb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .hb-pick-btn:hover{background:#002a52;}
            .hb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .hb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .hb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hb-btn-save:hover{background:#d97821;}
            .hb-theme-toggle{display:flex;gap:0.5rem;}
            .hb-theme-opt{flex:1;padding:0.625rem 0.5rem;border-radius:0.5rem;font-size:0.8125rem;font-weight:700;cursor:pointer;border:2px solid #e2e8f0;transition:all 0.15s;font-family:inherit;text-align:center;}
            .hb-theme-opt-blue{background:#003B71;color:#fff;}
            .hb-theme-opt-orange{background:#E97300;color:#fff;}
            .hb-theme-opt-white{background:#ffffff;color:#003B71;border-color:#cbd5e1;}
            .hb-theme-opt.hb-theme-inactive{opacity:0.35;}
            .hb-theme-opt.hb-theme-inactive:hover{opacity:0.65;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-hero-banner-config"] || "{}",
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
    overlay.id = "hero-banner-config-modal";
    overlay.className = "hb-overlay";

    const modal = document.createElement("div");
    modal.className = "hb-modal";
    modal.innerHTML = `
        <div class="hb-modal-header">
            <div class="hb-modal-header-left"><i class="ri-image-2-line"></i><h2>Configurar Banner</h2></div>
            <button id="hb-modal-close" class="hb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="hb-modal-tabs">
            <button class="hb-tab-btn active" data-tab="bg"><i class="ri-image-line"></i> Fondo</button>
            <button class="hb-tab-btn" data-tab="content"><i class="ri-text"></i> Contenido</button>
            <button class="hb-tab-btn" data-tab="theme"><i class="ri-palette-line"></i> Tema</button>
        </div>
        <div class="hb-modal-body">
            <div class="hb-tab-panel active" id="hb-panel-bg">
                <div class="hb-card">
                    <label class="hb-label">Imagen de fondo</label>
                    <div class="hb-row" style="align-items:flex-start;flex-wrap:wrap;gap:0.75rem;">
                        <div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:0.5rem;">
                            <img id="hb-bg-preview" src="${bgImage}" style="height:90px;width:100%;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;">
                            <input id="hb-bg-url" type="text" placeholder="URL de la imagen" value="${bgImage}" class="hb-input">
                        </div>
                        <button id="hb-bg-pick" class="hb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
            </div>
            <div class="hb-tab-panel" id="hb-panel-content">
                <div class="hb-card">
                    <label class="hb-label">Título (requerido)</label>
                    <input id="hb-title" type="text" placeholder="Título del banner" value="${title}" class="hb-input">
                </div>
                <div class="hb-card">
                    <label class="hb-label">Subtítulo (opcional)</label>
                    <textarea id="hb-subtitle" placeholder="Déjalo vacío si no quieres subtítulo" class="hb-input">${subtitle}</textarea>
                </div>
            </div>
            <div class="hb-tab-panel" id="hb-panel-theme">
                <div class="hb-card">
                    <label class="hb-label">Color de tema (aplica únicamente a la curva inferior)</label>
                    <div class="hb-theme-toggle" id="hb-theme-colors">
                        <button type="button" class="hb-theme-opt hb-theme-opt-blue" data-theme="blue">Azul</button>
                        <button type="button" class="hb-theme-opt hb-theme-opt-orange" data-theme="orange">Naranja</button>
                        <button type="button" class="hb-theme-opt hb-theme-opt-white" data-theme="white">Blanco</button>
                    </div>
                    <p style="font-size:0.75rem;color:#94a3b8;margin:0.75rem 0 0;">El badge del título y el marco de borde siempre son naranja, independientemente del tema elegido.</p>
                </div>
            </div>
        </div>
        <div class="hb-modal-footer">
            <button id="hb-modal-cancel" class="hb-btn-cancel">Cancelar</button>
            <button id="hb-modal-save" class="hb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    let selectedTheme = THEME_COLORS[theme] ? theme : "blue";

    function setupThemeToggle() {
        const wrap = modal.querySelector("#hb-theme-colors");
        wrap.querySelectorAll("[data-theme]").forEach((btn) => {
            btn.classList.toggle(
                "hb-theme-inactive",
                btn.dataset.theme !== selectedTheme,
            );
            btn.addEventListener("click", () => {
                selectedTheme = btn.dataset.theme;
                wrap.querySelectorAll("[data-theme]").forEach((b) =>
                    b.classList.toggle(
                        "hb-theme-inactive",
                        b.dataset.theme !== selectedTheme,
                    ),
                );
            });
        });
    }
    setupThemeToggle();

    modal.querySelectorAll(".hb-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".hb-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".hb-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#hb-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    modal.querySelector("#hb-bg-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar imagen de fondo",
            onSelect: (url) => {
                modal.querySelector("#hb-bg-url").value = url;
                modal.querySelector("#hb-bg-preview").src = url;
            },
        });
    });

    modal.querySelector("#hb-bg-url").addEventListener("input", (e) => {
        modal.querySelector("#hb-bg-preview").src = e.target.value;
    });

    const close = () => overlay.remove();
    modal.querySelector("#hb-modal-close").onclick = close;
    modal.querySelector("#hb-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#hb-modal-save").onclick = () => {
        const data = {
            bg_image:
                modal.querySelector("#hb-bg-url").value.trim() ||
                DEFAULT_DATA.bg_image,
            theme: selectedTheme,
            title: modal.querySelector("#hb-title").value.trim(),
            subtitle: modal.querySelector("#hb-subtitle").value.trim(),
        };

        const existingInner = component
            .getEl()
            ?.querySelector("[id^='hb-root-']");
        const uid =
            existingInner?.id?.replace("hb-root-", "") ||
            "hb" + Math.random().toString(36).slice(2, 7);
        component.addAttributes({
            "data-hero-banner-config": JSON.stringify(data),
        });
        component.components(
            buildHeroBannerHTML(data, uid) + HERO_BANNER_STYLES,
        );
        close();
    };
}

export function initializeHeroBannerBlock(editor) {
    const componentType = "hero-banner-component";

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
                    "data-hero-banner-config": JSON.stringify(DEFAULT_DATA),
                },
                components:
                    buildHeroBannerHTML(DEFAULT_DATA) + HERO_BANNER_STYLES,
                traits: [
                    {
                        type: "button",
                        label: "Banner",
                        text: "Administrar Banner",
                        full: true,
                        command: "open-hero-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-hero-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showHeroBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("hero-banner-block", {
        label: "Banner",
        category: "Banners",
        media: `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
            <path d="M4 8 h16 v11 h-16 z" fill="none" stroke="#E97300" stroke-width="1"/>
            <rect x="5.5" y="10.5" width="9" height="4" rx="1" fill="#E97300"/>
            <rect x="5.5" y="16" width="11" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.85"/>
            <path d="M2 24 C10 20 22 28 30 22 L30 30 L2 30 Z" fill="#003B71"/>
        </svg>`,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });
}
