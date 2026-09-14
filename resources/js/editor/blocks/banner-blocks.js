import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

function buildImageTitleBannerHTML(data, uid) {
    uid = uid || "it" + Math.random().toString(36).slice(2, 7);
    const imageUrl = data.image_url || assetUrl("images/placeholder.svg");

    const radius = `clamp(20px,3vw,32px)`;
    const notchSize = `clamp(28px,3.5vw,40px)`;

    const sectionStyle = `width:100%;max-width:1600px;margin:0 auto;padding:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;`;

    const wrapperStyle = `position:relative;width:100%;aspect-ratio:16/7;min-height:260px;border-radius:${radius};overflow:hidden;box-sizing:border-box;`;

    const imgStyle = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;`;

    const gradientStyle = `position:absolute;inset:0;background:linear-gradient(90deg,rgba(233,115,0,0.92) 0%,rgba(233,115,0,0.55) 35%,rgba(233,115,0,0) 65%);`;

    const boxStyle = `position:absolute;top:0;left:0;background:#fff;padding:clamp(2rem,4vw,3rem) clamp(1.5rem,3vw,2.5rem);border-radius:0 0 ${notchSize} 0;max-width:min(85%,420px);box-sizing:border-box;display:flex;align-items:center;justify-content:flex-start;`;

    const notchStyle = `position:absolute;bottom:calc(-1 * ${notchSize});left:0;width:${notchSize};height:${notchSize};background:radial-gradient(circle at bottom right,transparent ${notchSize},#fff 0);`;

    const topNotchStyle = `position:absolute;top:0;right:calc(-1 * ${notchSize});width:${notchSize};height:${notchSize};background:radial-gradient(circle at top right,transparent ${notchSize},#fff 0);`;

    const titleStyle = `margin:0;color:#003B71;font-weight:800;font-size:clamp(1.375rem,3vw,2.25rem);line-height:1.25;`;

    return `<section id="it-root-${uid}" style="${sectionStyle}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div style="${wrapperStyle}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><img src="${imageUrl}" alt="${data.title || "Banner"}" style="${imgStyle}"><div style="${gradientStyle}"></div><div style="${boxStyle}"><h2 style="${titleStyle}">${data.title || "Título"}</h2><div style="${notchStyle}"></div><div style="${topNotchStyle}"></div></div></div></section>`;
}

const DEFAULT_DATA = {
    image_url: "",
    title: "Capital de trabajo",
};

function showImageTitleBannerModal(editor, component) {
    const existing = document.getElementById("it-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("it-modal-styles")) {
        const style = document.createElement("style");
        style.id = "it-modal-styles";
        style.textContent = `
            .it-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .it-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:640px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .it-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .it-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .it-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .it-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .it-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .it-modal-close:hover{background:#f1f5f9;color:#475569;}
            .it-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .it-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .it-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .it-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .it-input:focus{border-color:#3b82f6;}
            .it-row{display:flex;gap:0.75rem;align-items:center;}
            .it-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .it-pick-btn:hover{background:#002a52;}
            .it-img-preview{width:100%;height:110px;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;background:#f1f5f9;}
            .it-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .it-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .it-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .it-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .it-btn-save:hover{background:#d97821;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-image-title-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const imageUrl = currentData.image_url ?? DEFAULT_DATA.image_url;
    const title = currentData.title ?? DEFAULT_DATA.title;

    const overlay = document.createElement("div");
    overlay.id = "it-config-modal";
    overlay.className = "it-overlay";

    const modal = document.createElement("div");
    modal.className = "it-modal";
    modal.innerHTML = `
        <div class="it-modal-header">
            <div class="it-modal-header-left"><i class="ri-image-2-line"></i><h2>Configurar Banner con Título</h2></div>
            <button id="it-modal-close" class="it-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="it-modal-body">
            <div class="it-card">
                <label class="it-label">Imagen de fondo</label>
                <div style="display:flex;flex-direction:column;gap:0.5rem;">
                    <img id="it-image-preview" class="it-img-preview" src="${imageUrl || assetUrl("images/placeholder.svg")}" alt="">
                    <div class="it-row">
                        <input id="it-image-url" type="text" placeholder="URL de la imagen" value="${imageUrl}" class="it-input">
                        <button id="it-image-pick" class="it-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
            </div>
            <div class="it-card">
                <label class="it-label">Título</label>
                <input id="it-title" type="text" placeholder="Capital de trabajo" value="${title}" class="it-input">
            </div>
        </div>
        <div class="it-modal-footer">
            <button id="it-modal-cancel" class="it-btn-cancel">Cancelar</button>
            <button id="it-modal-save" class="it-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector("#it-image-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar imagen de fondo",
            onSelect: (url) => {
                modal.querySelector("#it-image-url").value = url;
                modal.querySelector("#it-image-preview").src = url;
            },
        });
    });

    modal.querySelector("#it-image-url").addEventListener("input", (e) => {
        modal.querySelector("#it-image-preview").src = e.target.value;
    });

    const close = () => overlay.remove();
    modal.querySelector("#it-modal-close").onclick = close;
    modal.querySelector("#it-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#it-modal-save").onclick = () => {
        const newData = {
            image_url: modal.querySelector("#it-image-url").value.trim(),
            title: modal.querySelector("#it-title").value.trim(),
        };

        if (!newData.image_url) {
            if (typeof window.showNotification === "function") {
                window.showNotification(
                    "Debes seleccionar una imagen de fondo",
                    "error",
                );
            }
            return;
        }

        const existingInner = component
            .getEl()
            ?.querySelector("[id^='it-root-']");
        const uid =
            existingInner?.id?.replace("it-root-", "") ||
            "it" + Math.random().toString(36).slice(2, 7);

        component.addAttributes({
            "data-image-title-config": JSON.stringify(newData),
        });
        component.components(buildImageTitleBannerHTML(newData, uid));
        close();
    };
}

const iconImageTitleBanner = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
    <rect x="2" y="6" width="28" height="20" rx="2" fill="none" stroke="#E97300" stroke-width="1"/>
    <path d="M2 8 Q2 6 4 6 L14 6 Q16 6 16 8 L16 14 Q16 16 14 16 L4 16 Q2 16 2 14 Z" fill="#ffffff"/>
    <rect x="4.5" y="9" width="8" height="2" rx="1" fill="#E97300"/>
</svg>`;

export function initializeBannerBlocks(editor) {
    const componentType = "image-title-banner-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Banner con Título e Imagen",
                tagName: "div",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                stylable: false,
                resizable: false,
                layerable: true,
                propagate: [
                    "editable",
                    "selectable",
                    "hoverable",
                    "droppable",
                    "highlightable",
                    "stylable",
                    "resizable",
                ],
                attributes: {
                    "data-gjs-type": componentType,
                    "data-image-title-config": JSON.stringify(DEFAULT_DATA),
                },
                components: buildImageTitleBannerHTML(DEFAULT_DATA),
                traits: [
                    {
                        type: "button",
                        label: "Banner con Título",
                        text: "Administrar Banner",
                        full: true,
                        command: "open-image-title-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-image-title-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showImageTitleBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("image-title-banner-block", {
        label: "Banner con Título e Imagen",
        category: "Banners",
        media: iconImageTitleBanner,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        const head = iframe?.contentDocument?.head;
        if (!head || head.querySelector(`#${componentType}-editor-css`)) return;
        const style = iframe.contentDocument.createElement("style");
        style.id = `${componentType}-editor-css`;
        style.textContent = `
            [data-gjs-type="${componentType}"] * { pointer-events: none !important; }
        `;
        head.appendChild(style);
    });
}