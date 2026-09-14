import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

function responsiveStyleInjectorScript() {
    const el = this;
    const cssContent = el.getAttribute("data-css-content");
    if (!cssContent) return;
    const doc = el.ownerDocument;
    const styleId = "fb-responsive-" + el.id;
    if (doc.getElementById(styleId)) return;
    const styleTag = doc.createElement("style");
    styleTag.id = styleId;
    styleTag.textContent = cssContent;
    doc.head.appendChild(styleTag);
}

function buildFullBleedBannerHTML(data, uid) {
    uid = uid || "fu" + Math.random().toString(36).slice(2, 7);
    const imageUrl = data.image_url || assetUrl("images/placeholder.svg");
    const align = data.align === "right" ? "right" : "left";

    const sectionStyle = `position:relative;width:100%;aspect-ratio:16/7;min-height:300px;overflow:hidden;box-sizing:border-box;`;

    const imgStyle = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;`;

    const contentStyle = `position:absolute;top:0;bottom:0;${align}:0;display:flex;flex-direction:column;justify-content:center;align-items:${align === "left" ? "flex-start" : "flex-end"};gap:1.25rem;padding:clamp(1.5rem,4vw,4rem);max-width:min(90%,640px);box-sizing:border-box;text-align:${align};`;

    const titleStyle = `margin:0;color:#fff;font-weight:900;font-size:clamp(1.5rem,4vw,2.75rem);line-height:1.2;text-shadow:0 2px 8px rgba(0,0,0,0.5),0 1px 3px rgba(0,0,0,0.4);`;

    const btnStyle = `display:inline-flex;align-items:center;justify-content:center;padding:clamp(0.5rem,1.5vw,0.75rem) clamp(1.125rem,3vw,1.75rem);border-radius:9999px;background:#E97300;color:#fff;font-weight:600;font-size:clamp(0.75rem,1.6vw,0.9375rem);text-decoration:none;transition:background 0.2s ease,color 0.2s ease;white-space:nowrap;`;

    const titleHtml = data.title
        ? `<h2 style="${titleStyle}">${data.title}</h2>`
        : "";
    const buttonHtml = data.button_label
        ? `<a href="${data.button_href || "#"}" id="fu-btn-${uid}" style="${btnStyle}">${data.button_label}</a>`
        : "";

    const responsiveCss = `@media(max-width:768px){#fu-root-${uid}{aspect-ratio:4/5;min-height:420px;}#fu-root-${uid} .fu-content-${uid}{left:0;right:0;top:auto;bottom:0;align-items:center;text-align:center;padding:1.5rem 1.25rem 2rem;max-width:100%;}}`;

    return `<section id="fu-root-${uid}" style="${sectionStyle}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><img src="${imageUrl}" alt="${data.title || "Banner"}" style="${imgStyle}"><div class="fu-content-${uid}" style="${contentStyle}"><style>#fu-btn-${uid}:hover{background:#c96200;}</style>${titleHtml}${buttonHtml}</div><div data-gjs-type="fu-responsive-style" data-css-content="${responsiveCss.replace(/"/g, "&quot;")}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div></section>`;
}

const DEFAULT_DATA = {
    image_url: "",
    title: "El banco que impulsa tus ideas y acompaña tu crecimiento.",
    button_label: "Solicitar información",
    button_href: "#",
    align: "left",
};

function showFullBleedBannerModal(editor, component) {
    const existing = document.getElementById("fu-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("fu-modal-styles")) {
        const style = document.createElement("style");
        style.id = "fu-modal-styles";
        style.textContent = `
            .fu-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .fu-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:640px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .fu-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .fu-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .fu-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .fu-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .fu-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .fu-modal-close:hover{background:#f1f5f9;color:#475569;}
            .fu-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .fu-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .fu-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .fu-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .fu-input:focus{border-color:#3b82f6;}
            .fu-row{display:flex;gap:0.75rem;align-items:center;}
            .fu-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .fu-pick-btn:hover{background:#002a52;}
            .fu-img-preview{width:100%;height:130px;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;background:#f1f5f9;}
            .fu-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .fu-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .fu-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .fu-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .fu-btn-save:hover{background:#d97821;}
            .fu-align-grid{display:grid;grid-template-columns:1fr 1fr;gap:0.625rem;}
            .fu-align-option{border:2px solid #e2e8f0;border-radius:0.5rem;padding:0.75rem;cursor:pointer;display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;font-weight:500;color:#475569;transition:border-color 0.15s,background 0.15s;}
            .fu-align-option:hover{border-color:#cbd5e1;}
            .fu-align-option.active{border-color:#E97300;background:#fff7ed;color:#c2410c;}
            .fu-align-option input{accent-color:#E97300;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-full-bleed-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const data = {
        image_url: currentData.image_url ?? DEFAULT_DATA.image_url,
        title: currentData.title ?? DEFAULT_DATA.title,
        button_label: currentData.button_label ?? DEFAULT_DATA.button_label,
        button_href: currentData.button_href ?? DEFAULT_DATA.button_href,
        align: currentData.align ?? DEFAULT_DATA.align,
    };

    const overlay = document.createElement("div");
    overlay.id = "fu-config-modal";
    overlay.className = "fu-overlay";

    const alignLabels = { left: "Izquierda", right: "Derecha" };
    const alignOptionsHtml = Object.entries(alignLabels)
        .map(
            ([value, label]) => `
        <label class="fu-align-option ${data.align === value ? "active" : ""}" data-align-option="${value}">
            <input type="radio" name="fu-align" value="${value}" ${data.align === value ? "checked" : ""}>
            ${label}
        </label>`,
        )
        .join("");

    const modal = document.createElement("div");
    modal.className = "fu-modal";
    modal.innerHTML = `
        <div class="fu-modal-header">
            <div class="fu-modal-header-left"><i class="ri-image-2-line"></i><h2>Configurar Banner Completo</h2></div>
            <button id="fu-modal-close" class="fu-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="fu-modal-body">
            <div class="fu-card">
                <label class="fu-label">Imagen de fondo</label>
                <div style="display:flex;flex-direction:column;gap:0.5rem;">
                    <img id="fu-image-preview" class="fu-img-preview" src="${data.image_url || assetUrl("images/placeholder.svg")}" alt="">
                    <div class="fu-row">
                        <input id="fu-image-url" type="text" placeholder="URL de la imagen" value="${data.image_url}" class="fu-input">
                        <button id="fu-image-pick" class="fu-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
            </div>
            <div class="fu-card">
                <label class="fu-label">Título</label>
                <input id="fu-title" type="text" placeholder="Título del banner" value="${data.title}" class="fu-input">
            </div>
            <div class="fu-card">
                <label class="fu-label">Botón CTA</label>
                <div style="display:flex;flex-direction:column;gap:0.625rem;">
                    <input id="fu-button-label" type="text" placeholder="Solicitar información" value="${data.button_label}" class="fu-input">
                    <input id="fu-button-href" type="text" placeholder="URL o #" value="${data.button_href}" class="fu-input">
                </div>
            </div>
            <div class="fu-card">
                <label class="fu-label">Alineación del contenido</label>
                <div class="fu-align-grid" id="fu-align-grid">
                    ${alignOptionsHtml}
                </div>
            </div>
        </div>
        <div class="fu-modal-footer">
            <button id="fu-modal-cancel" class="fu-btn-cancel">Cancelar</button>
            <button id="fu-modal-save" class="fu-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector("#fu-image-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar imagen de fondo",
            onSelect: (url) => {
                modal.querySelector("#fu-image-url").value = url;
                modal.querySelector("#fu-image-preview").src = url;
            },
        });
    });

    modal.querySelector("#fu-image-url").addEventListener("input", (e) => {
        modal.querySelector("#fu-image-preview").src = e.target.value;
    });

    modal.querySelectorAll("[data-align-option]").forEach((label) => {
        label.addEventListener("click", () => {
            modal
                .querySelectorAll("[data-align-option]")
                .forEach((l) => l.classList.remove("active"));
            label.classList.add("active");
        });
    });

    const close = () => overlay.remove();
    modal.querySelector("#fu-modal-close").onclick = close;
    modal.querySelector("#fu-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#fu-modal-save").onclick = () => {
        const selectedAlign =
            modal.querySelector('input[name="fu-align"]:checked')?.value ||
            "left";

        const newData = {
            image_url: modal.querySelector("#fu-image-url").value.trim(),
            title: modal.querySelector("#fu-title").value.trim(),
            button_label: modal.querySelector("#fu-button-label").value.trim(),
            button_href:
                modal.querySelector("#fu-button-href").value.trim() || "#",
            align: selectedAlign,
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
            ?.querySelector("[id^='fu-root-']");
        const uid =
            existingInner?.id?.replace("fu-root-", "") ||
            "fu" + Math.random().toString(36).slice(2, 7);

        component.addAttributes({
            "data-full-bleed-config": JSON.stringify(newData),
        });
        component.components(buildFullBleedBannerHTML(newData, uid));
        close();
    };
}

const iconFullBleedBanner = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
    <rect x="2" y="8" width="28" height="16" fill="none" stroke="#E97300" stroke-width="1"/>
    <rect x="5" y="17" width="12" height="2" rx="1" fill="#ffffff"/>
    <rect x="5" y="20.5" width="8" height="2" rx="1" fill="#E97300"/>
</svg>`;

export function initializeFullBleedBannerBlock(editor) {
    const componentType = "full-bleed-banner-component";

    editor.DomComponents.addType("fu-responsive-style", {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === "fu-responsive-style"
                ? { type: "fu-responsive-style" }
                : false,
        model: {
            defaults: {
                tagName: "div",
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                selectable: false,
                hoverable: false,
                editable: false,
                highlightable: false,
                traits: [],
                script: responsiveStyleInjectorScript,
            },
        },
    });

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Banner Completo",
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
                    "data-full-bleed-config": JSON.stringify(DEFAULT_DATA),
                },
                components: buildFullBleedBannerHTML(DEFAULT_DATA),
                traits: [
                    {
                        type: "button",
                        label: "Banner Completo",
                        text: "Administrar Banner",
                        full: true,
                        command: "open-full-bleed-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-full-bleed-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showFullBleedBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("full-bleed-banner-block", {
        label: "Banner Completo",
        category: "Banners",
        media: iconFullBleedBanner,
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