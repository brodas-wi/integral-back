import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

const POSITION_STYLES = {
    "top-left": "top:2rem;left:2rem;",
    "top-right": "top:2rem;right:2rem;",
    "bottom-left": "bottom:2rem;left:2rem;",
    "bottom-right": "bottom:2rem;right:2rem;",
};

function buildFixedBannerHTML(data, uid) {
    uid = uid || "fb" + Math.random().toString(36).slice(2, 7);
    const imageUrl = data.image_url || assetUrl("images/placeholder.svg");
    const position = POSITION_STYLES[data.box_position]
        ? data.box_position
        : "bottom-right";
    const positionStyle = POSITION_STYLES[position];

    const sectionStyle = `width:100%;max-width:1600px;margin:0 auto;padding:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;`;

    const responsivePaddingCss = `<style>@media(max-width:991px){#fb-root-${uid}{padding:1.5rem !important;}}</style>`;

    const wrapperStyle = `position:relative;width:100%;aspect-ratio:16/7;min-height:220px;border-radius:clamp(12px,2vw,24px);overflow:hidden;box-sizing:border-box;`;

    const imgStyle = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;`;

    const boxStyle = `position:absolute;${positionStyle}z-index:5;width:min(90%,420px);background:#E97300;border-radius:clamp(10px,1.5vw,16px);padding:clamp(0.875rem,2.2vw,1.5rem) clamp(1rem,2.5vw,1.75rem);display:flex;flex-direction:column;gap:clamp(0.625rem,1.8vw,1.25rem);box-sizing:border-box;`;

    const textStyle = `margin:0;color:#fff;font-weight:500;font-size:clamp(0.9375rem,2.4vw,1.875rem);line-height:1.3;`;

    const btnStyle = `display:inline-flex;align-items:center;justify-content:center;align-self:flex-start;padding:clamp(0.5rem,1.5vw,0.75rem) clamp(1.125rem,3vw,1.75rem);border-radius:9999px;background:#14243D;color:#fff;font-weight:600;font-size:clamp(0.75rem,1.6vw,0.9375rem);text-decoration:none;transition:background 0.2s ease,color 0.2s ease;white-space:nowrap;`;

    const textHtml = data.text
        ? `<p style="${textStyle}">${data.text}</p>`
        : "";
    const buttonHtml = data.button_label
        ? `<a href="${data.button_href || "#"}" id="fb-btn-${uid}" style="${btnStyle}">${data.button_label}</a>`
        : "";

    return `<section id="fb-root-${uid}" style="${sectionStyle}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div style="${wrapperStyle}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><img src="${imageUrl}" alt="${data.text || "Banner"}" style="${imgStyle}"><div style="${boxStyle}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">${textHtml}${buttonHtml}</div></div><style>#fb-btn-${uid}:hover{background:#0d1930;}</style>${responsivePaddingCss}</section>`;
}

const DEFAULT_DATA = {
    image_url: "",
    text: "Recibe tus remesas fácil y seguro.",
    button_label: "Solicitar información",
    button_href: "#",
    box_position: "bottom-right",
};

function showFixedBannerModal(editor, component) {
    const existing = document.getElementById("fb-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("fb-modal-styles")) {
        const style = document.createElement("style");
        style.id = "fb-modal-styles";
        style.textContent = `
            .fb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .fb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .fb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .fb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .fb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .fb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .fb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .fb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .fb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .fb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .fb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .fb-row{display:flex;gap:0.75rem;align-items:center;}
            .fb-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .fb-input:focus{border-color:#3b82f6;}
            .fb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .fb-pick-btn:hover{background:#002a52;}
            .fb-img-preview{width:100%;height:110px;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;background:#f1f5f9;}
            .fb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .fb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .fb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .fb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .fb-btn-save:hover{background:#d97821;}
            .fb-position-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.625rem;}
            .fb-position-option{border:2px solid #e2e8f0;border-radius:0.5rem;padding:0.75rem;cursor:pointer;display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;font-weight:500;color:#475569;transition:border-color 0.15s,background 0.15s;}
            .fb-position-option:hover{border-color:#cbd5e1;}
            .fb-position-option.active{border-color:#E97300;background:#fff7ed;color:#c2410c;}
            .fb-position-option input{accent-color:#E97300;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-fixed-banner-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const data = {
        image_url: currentData.image_url ?? DEFAULT_DATA.image_url,
        text: currentData.text ?? DEFAULT_DATA.text,
        button_label: currentData.button_label ?? DEFAULT_DATA.button_label,
        button_href: currentData.button_href ?? DEFAULT_DATA.button_href,
        box_position: currentData.box_position ?? DEFAULT_DATA.box_position,
    };

    const overlay = document.createElement("div");
    overlay.id = "fb-config-modal";
    overlay.className = "fb-overlay";

    const positionLabels = {
        "top-left": "Arriba izquierda",
        "top-right": "Arriba derecha",
        "bottom-left": "Abajo izquierda",
        "bottom-right": "Abajo derecha",
    };

    const positionOptionsHtml = Object.entries(positionLabels)
        .map(
            ([value, label]) => `
        <label class="fb-position-option ${data.box_position === value ? "active" : ""}" data-position-option="${value}">
            <input type="radio" name="fb-box-position" value="${value}" ${data.box_position === value ? "checked" : ""}>
            ${label}
        </label>`,
        )
        .join("");

    const modal = document.createElement("div");
    modal.className = "fb-modal";
    modal.innerHTML = `
        <div class="fb-modal-header">
            <div class="fb-modal-header-left"><i class="ri-image-2-line"></i><h2>Configurar Banner con Imagen</h2></div>
            <button id="fb-modal-close" class="fb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="fb-modal-body">
            <div class="fb-card">
                <label class="fb-label">Imagen de fondo</label>
                <div style="display:flex;flex-direction:column;gap:0.5rem;">
                    <img id="fb-image-preview" class="fb-img-preview" src="${data.image_url || assetUrl("images/placeholder.svg")}" alt="">
                    <div class="fb-row">
                        <input id="fb-image-url" type="text" placeholder="URL de la imagen" value="${data.image_url}" class="fb-input">
                        <button id="fb-image-pick" class="fb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
            </div>
            <div class="fb-card">
                <label class="fb-label">Texto del cuadro</label>
                <input id="fb-text" type="text" placeholder="Recibe tus remesas fácil y seguro." value="${data.text}" class="fb-input">
            </div>
            <div class="fb-card">
                <label class="fb-label">Botón</label>
                <div style="display:flex;flex-direction:column;gap:0.625rem;">
                    <input id="fb-button-label" type="text" placeholder="Solicitar información" value="${data.button_label}" class="fb-input">
                    <input id="fb-button-href" type="text" placeholder="URL o #" value="${data.button_href}" class="fb-input">
                </div>
            </div>
            <div class="fb-card">
                <label class="fb-label">Posición del cuadro</label>
                <div class="fb-position-grid" id="fb-position-grid">
                    ${positionOptionsHtml}
                </div>
            </div>
        </div>
        <div class="fb-modal-footer">
            <button id="fb-modal-cancel" class="fb-btn-cancel">Cancelar</button>
            <button id="fb-modal-save" class="fb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector("#fb-image-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar imagen de fondo",
            onSelect: (url) => {
                modal.querySelector("#fb-image-url").value = url;
                modal.querySelector("#fb-image-preview").src = url;
            },
        });
    });

    modal.querySelector("#fb-image-url").addEventListener("input", (e) => {
        modal.querySelector("#fb-image-preview").src = e.target.value;
    });

    modal.querySelectorAll("[data-position-option]").forEach((label) => {
        label.addEventListener("click", () => {
            modal
                .querySelectorAll("[data-position-option]")
                .forEach((l) => l.classList.remove("active"));
            label.classList.add("active");
        });
    });

    const close = () => overlay.remove();
    modal.querySelector("#fb-modal-close").onclick = close;
    modal.querySelector("#fb-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#fb-modal-save").onclick = () => {
        const selectedPosition =
            modal.querySelector('input[name="fb-box-position"]:checked')
                ?.value || "bottom-right";

        const newData = {
            image_url: modal.querySelector("#fb-image-url").value.trim(),
            text: modal.querySelector("#fb-text").value.trim(),
            button_label: modal.querySelector("#fb-button-label").value.trim(),
            button_href:
                modal.querySelector("#fb-button-href").value.trim() || "#",
            box_position: selectedPosition,
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
            ?.querySelector("[id^='fb-root-']");
        const uid =
            existingInner?.id?.replace("fb-root-", "") ||
            "fb" + Math.random().toString(36).slice(2, 7);

        component.addAttributes({
            "data-fixed-banner-config": JSON.stringify(newData),
        });
        component.components(buildFixedBannerHTML(newData, uid));
        close();
    };
}

const iconFixedBanner = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
    <rect x="2" y="4" width="28" height="18" rx="1" fill="none" stroke="#E97300" stroke-width="1"/>
    <rect x="17" y="13.5" width="11" height="6.5" rx="1" fill="#E97300"/>
    <rect x="19" y="26" width="18" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0" />
</svg>`;

export function initializeFixedBannerBlock(editor) {
    const componentType = "fixed-banner-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Banner con Imagen Fija",
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
                    "data-fixed-banner-config": JSON.stringify(DEFAULT_DATA),
                },
                components: buildFixedBannerHTML(DEFAULT_DATA),
                traits: [
                    {
                        type: "button",
                        label: "Banner con Imagen",
                        text: "Administrar Banner",
                        full: true,
                        command: "open-fixed-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-fixed-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showFixedBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("fixed-banner-block", {
        label: "Banner con Imagen",
        category: "Banners",
        media: iconFixedBanner,
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