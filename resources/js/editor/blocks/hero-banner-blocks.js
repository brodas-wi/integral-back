import { assetUrl } from "@/utils/url.js";
import { openMediaPicker } from "@/editor/media-picker";

const HERO_BANNER_STYLES = `
<style>
.hb-section{position:relative;width:100%;background-size:cover;background-position:center;background-repeat:no-repeat;padding:5rem 4rem;display:flex;align-items:center;min-height:420px;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.hb-content{max-width:560px;display:flex;flex-direction:column;gap:0.75rem;}
.hb-title{font-size:2.75rem;font-weight:800;color:#fff;line-height:1.15;margin:0;}
.hb-subtitle{font-size:1.125rem;font-weight:700;color:#fff;margin:0;}
.hb-buttons{display:flex;gap:1rem;margin-top:1.25rem;flex-wrap:wrap;}
.hb-btn{display:inline-flex;align-items:center;justify-content:center;padding:0.75rem 1.75rem;border-radius:9999px;font-size:0.9375rem;font-weight:700;text-decoration:none;cursor:pointer;border:2px solid #fff;font-family:inherit;transition:opacity 0.15s,background 0.15s,color 0.15s;white-space:nowrap;}
.hb-btn-primary{background:#fff;color:#003B71;}
.hb-btn-primary:hover{opacity:0.88;}
.hb-btn-secondary{background:transparent;color:#fff;}
.hb-btn-secondary:hover{background:rgba(255,255,255,0.15);}
@media(max-width:992px){
.hb-section{padding:3.5rem 2.5rem;}
.hb-content{max-width:100%;}
.hb-title{font-size:2.125rem;}
}
@media(max-width:640px){
.hb-section{padding:2.5rem 1.5rem;min-height:360px;}
.hb-title{font-size:1.75rem;}
.hb-subtitle{font-size:1rem;}
.hb-buttons{flex-direction:column;align-items:flex-start;}
.hb-btn{width:100%;text-align:center;}
}
</style>`;

function buildHeroBannerHTML(data, uid) {
    uid = uid || "hb" + Math.random().toString(36).slice(2, 7);
    const bgImage = data.bg_image || assetUrl("images/placeholder.svg");
    const btnPrimary = data.btn_primary || {};
    const btnSecondary = data.btn_secondary || {};

    const btnPrimaryHtml =
        btnPrimary.enabled !== false
            ? `<a href="${btnPrimary.href || "#"}" class="hb-btn hb-btn-primary">${btnPrimary.label || "Conoce más"}</a>`
            : "";
    const btnSecondaryHtml =
        btnSecondary.enabled !== false
            ? `<a href="${btnSecondary.href || "#"}" class="hb-btn hb-btn-secondary">${btnSecondary.label || "Solicitar"}</a>`
            : "";

    return `<section id="hb-root-${uid}" class="hb-section" style="background-image:url('${bgImage}');" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="hb-content">
            <h2 class="hb-title">${data.title || "Título del banner"}</h2>
            <p class="hb-subtitle">${data.subtitle || "Subtítulo del banner"}</p>
            <div class="hb-buttons">${btnPrimaryHtml}${btnSecondaryHtml}</div>
        </div>
    </section>`;
}

const DEFAULT_DATA = {
    bg_image: assetUrl("images/placeholder.svg"),
    title: "Cuenta de Ahorro Electrónica",
    subtitle: "Dale un giro digital a tus ahorros",
    btn_primary: { enabled: true, label: "Abre tu cuenta", href: "#" },
    btn_secondary: { enabled: true, label: "Conoce más", href: "#" },
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
            .hb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .hb-pick-btn:hover{background:#002a52;}
            .hb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .hb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .hb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hb-btn-save:hover{background:#d97821;}
            .hb-section-title{font-size:0.75rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0;border-bottom:1px solid #e2e8f0;margin-bottom:0.25rem;}
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
    const title = currentData.title || DEFAULT_DATA.title;
    const subtitle = currentData.subtitle || DEFAULT_DATA.subtitle;
    const btnPrimary = JSON.parse(
        JSON.stringify(currentData.btn_primary || DEFAULT_DATA.btn_primary),
    );
    const btnSecondary = JSON.parse(
        JSON.stringify(currentData.btn_secondary || DEFAULT_DATA.btn_secondary),
    );

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
            <button class="hb-tab-btn" data-tab="buttons"><i class="ri-cursor-line"></i> Botones</button>
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
                    <label class="hb-label">Título</label>
                    <input id="hb-title" type="text" placeholder="Título del banner" value="${title}" class="hb-input">
                </div>
                <div class="hb-card">
                    <label class="hb-label">Subtítulo</label>
                    <input id="hb-subtitle" type="text" placeholder="Subtítulo del banner" value="${subtitle}" class="hb-input">
                </div>
            </div>
            <div class="hb-tab-panel" id="hb-panel-buttons">
                <div class="hb-card">
                    <div class="hb-section-title">Botón primario</div>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="hb-label" style="margin-bottom:0.375rem;">Texto</label>
                            <input id="hb-btn1-label" type="text" placeholder="Abre tu cuenta" value="${btnPrimary.label || ""}" class="hb-input">
                        </div>
                        <div>
                            <label class="hb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="hb-btn1-href" type="text" placeholder="#" value="${btnPrimary.href || "#"}" class="hb-input">
                        </div>
                    </div>
                </div>
                <div class="hb-card">
                    <div class="hb-section-title">Botón secundario</div>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="hb-label" style="margin-bottom:0.375rem;">Texto</label>
                            <input id="hb-btn2-label" type="text" placeholder="Conoce más" value="${btnSecondary.label || ""}" class="hb-input">
                        </div>
                        <div>
                            <label class="hb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="hb-btn2-href" type="text" placeholder="#" value="${btnSecondary.href || "#"}" class="hb-input">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hb-modal-footer">
            <button id="hb-modal-cancel" class="hb-btn-cancel">Cancelar</button>
            <button id="hb-modal-save" class="hb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

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
            title: modal.querySelector("#hb-title").value.trim(),
            subtitle: modal.querySelector("#hb-subtitle").value.trim(),
            btn_primary: {
                enabled: true,
                label: modal.querySelector("#hb-btn1-label").value.trim(),
                href: modal.querySelector("#hb-btn1-href").value.trim() || "#",
            },
            btn_secondary: {
                enabled: true,
                label: modal.querySelector("#hb-btn2-label").value.trim(),
                href: modal.querySelector("#hb-btn2-href").value.trim() || "#",
            },
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
                toolbar: [],
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
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#E97300" rx="2"/>
            <rect x="2" y="6" width="16" height="3" rx="1.5" fill="#fff" fill-opacity="0.9"/>
            <rect x="2" y="11" width="12" height="2" rx="1" fill="#fff" fill-opacity="0.7"/>
            <rect x="2" y="16" width="9" height="4" rx="2" fill="#fff"/>
            <rect x="13" y="16" width="9" height="4" rx="2" fill="none" stroke="#fff" stroke-width="1"/>
        </svg>`,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });
}
