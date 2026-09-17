import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

function buildVideoBannerHTML(data, uid) {
    uid = uid || "vb" + Math.random().toString(36).slice(2, 7);
    const videoUrl = data.video_url || "";
    const posterUrl = data.poster_url || assetUrl("images/placeholder.svg");
    const hasGradient = Boolean(data.show_gradient);
    const hasRadius = data.show_radius !== false;

    const radius = hasRadius ? `clamp(28px,3vw,40px)` : `0px`;

    const sectionStyle = `width:100%;max-width:1600px;margin:0 auto;padding:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;`;

    const wrapperStyle = `position:relative;width:100%;aspect-ratio:20/9;min-height:260px;box-sizing:border-box;background:#0a0a0a;border-radius:${radius};overflow:hidden;`;

    const innerStyle = `position:absolute;inset:-1px;width:calc(100% + 2px);height:calc(100% + 2px);`;

    const videoStyle = `width:100%;height:100%;object-fit:cover;display:block;`;

    const gradientStyle = `position:absolute;inset:0;background:linear-gradient(90deg,rgba(233,115,0,0.92) 0%,rgba(233,115,0,0.55) 35%,rgba(233,115,0,0) 65%);`;

    const gradientHtml = hasGradient
        ? `<div style="${gradientStyle}"></div>`
        : "";

    const videoHtml = videoUrl
        ? `<div style="${innerStyle}"><video id="vb-video-${uid}" src="${videoUrl}" poster="${posterUrl}" autoplay muted loop playsinline disablepictureinpicture disableremoteplayback tabindex="-1" data-gjs-type="vb-video-media" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false" style="${videoStyle}"></video></div>`
        : `<div style="${innerStyle}"><img src="${posterUrl}" alt="Banner video" style="${videoStyle}"></div>`;

    return `<section id="vb-root-${uid}" style="${sectionStyle}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div style="${wrapperStyle}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">${videoHtml}${gradientHtml}</div></section>`;
}

const DEFAULT_DATA = {
    video_url: "",
    poster_url: assetUrl("images/placeholder.svg"),
    show_gradient: false,
    show_radius: true,
};

function showVideoBannerModal(editor, component) {
    const existing = document.getElementById("vb-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("vb-modal-styles")) {
        const style = document.createElement("style");
        style.id = "vb-modal-styles";
        style.textContent = `
            .vb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .vb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:640px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .vb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .vb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .vb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .vb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .vb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .vb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .vb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .vb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .vb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .vb-hint{font-size:0.75rem;color:#94a3b8;margin:0 0 0.75rem;}
            .vb-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .vb-input:focus{border-color:#3b82f6;}
            .vb-row{display:flex;gap:0.75rem;align-items:center;}
            .vb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .vb-pick-btn:hover{background:#002a52;}
            .vb-video-preview{width:100%;height:110px;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;background:#0a0a0a;}
            .vb-toggle-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;}
            .vb-toggle-text{display:flex;flex-direction:column;gap:0.125rem;}
            .vb-toggle-title{font-size:0.875rem;font-weight:600;color:#1e293b;}
            .vb-toggle-desc{font-size:0.75rem;color:#94a3b8;}
            .vb-switch{position:relative;width:44px;height:24px;flex-shrink:0;}
            .vb-switch input{opacity:0;width:0;height:0;}
            .vb-switch-track{position:absolute;inset:0;background:#cbd5e1;border-radius:9999px;cursor:pointer;transition:background 0.2s ease;}
            .vb-switch-track::before{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;background:#fff;border-radius:50%;transition:transform 0.2s ease;box-shadow:0 1px 3px rgba(0,0,0,0.2);}
            .vb-switch input:checked + .vb-switch-track{background:#E97300;}
            .vb-switch input:checked + .vb-switch-track::before{transform:translateX(20px);}
            .vb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .vb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .vb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .vb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .vb-btn-save:hover{background:#d97821;}
            .vb-proportions-box{background:#eff6ff;border:1px solid #bfdbfe;border-radius:0.5rem;padding:0.75rem 1rem;display:flex;gap:0.625rem;align-items:flex-start;}
            .vb-proportions-box i{color:#3b82f6;font-size:1.125rem;flex-shrink:0;margin-top:0.125rem;}
            .vb-proportions-box p{margin:0;font-size:0.8125rem;color:#1e40af;line-height:1.5;}
            .vb-proportions-box strong{font-weight:700;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-video-banner-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const videoUrl = currentData.video_url ?? DEFAULT_DATA.video_url;
    const posterUrl = currentData.poster_url || DEFAULT_DATA.poster_url;
    const showGradient = currentData.show_gradient ?? DEFAULT_DATA.show_gradient;
    const showRadius = currentData.show_radius ?? DEFAULT_DATA.show_radius;

    const overlay = document.createElement("div");
    overlay.id = "vb-config-modal";
    overlay.className = "vb-overlay";

    const modal = document.createElement("div");
    modal.className = "vb-modal";
    modal.innerHTML = `
        <div class="vb-modal-header">
            <div class="vb-modal-header-left"><i class="ri-movie-line"></i><h2>Configurar Banner de Video</h2></div>
            <button id="vb-modal-close" class="vb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="vb-modal-body">
            <div class="vb-proportions-box">
                <i class="ri-information-line"></i>
                <p>Este banner usa proporción <strong>20:9</strong> (aprox. 2.2:1). Para que el video se vea nítido y sin recortes, sube un archivo con una resolución cercana a <strong>1280×576px</strong> o <strong>1920×864px</strong>.</p>
            </div>
            <div class="vb-card">
                <label class="vb-label">Video de fondo</label>
                <p class="vb-hint">El video se reproduce en loop automáticamente y siempre inicia sin audio (requisito de los navegadores).</p>
                <div style="display:flex;flex-direction:column;gap:0.5rem;">
                    <video id="vb-video-preview" class="vb-video-preview" src="${videoUrl}" muted></video>
                    <div class="vb-row">
                        <input id="vb-video-url" type="text" placeholder="URL del video (mp4 o webm)" value="${videoUrl}" class="vb-input">
                        <button id="vb-video-pick" class="vb-pick-btn"><i class="ri-video-line"></i> Seleccionar</button>
                    </div>
                </div>
            </div>
            <div class="vb-card">
                <label class="vb-label">Imagen de portada (poster)</label>
                <p class="vb-hint">Se muestra en el editor en lugar del video, y como imagen de carga en público.</p>
                <div style="display:flex;flex-direction:column;gap:0.5rem;">
                    <img id="vb-poster-preview" src="${posterUrl}" style="height:80px;width:100%;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;">
                    <div class="vb-row">
                        <input id="vb-poster-url" type="text" placeholder="URL de la imagen" value="${posterUrl}" class="vb-input">
                        <button id="vb-poster-pick" class="vb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
            </div>
                        <div class="vb-card">
                <div class="vb-toggle-row">
                    <div class="vb-toggle-text">
                        <span class="vb-toggle-title">Gradiente naranja</span>
                        <span class="vb-toggle-desc">Superpone un degradado sobre el video</span>
                    </div>
                    <label class="vb-switch">
                        <input id="vb-show-gradient" type="checkbox" ${showGradient ? "checked" : ""}>
                        <span class="vb-switch-track"></span>
                    </label>
                </div>
            </div>
            <div class="vb-card">
                <div class="vb-toggle-row">
                    <div class="vb-toggle-text">
                        <span class="vb-toggle-title">Bordes redondeados</span>
                        <span class="vb-toggle-desc">Desactiva si el video ya tiene esquinas redondeadas</span>
                    </div>
                    <label class="vb-switch">
                        <input id="vb-show-radius" type="checkbox" ${showRadius ? "checked" : ""}>
                        <span class="vb-switch-track"></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="vb-modal-footer">
            <button id="vb-modal-cancel" class="vb-btn-cancel">Cancelar</button>
            <button id="vb-modal-save" class="vb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelector("#vb-video-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "video",
            title: "Seleccionar video de fondo",
            onSelect: (url) => {
                modal.querySelector("#vb-video-url").value = url;
                modal.querySelector("#vb-video-preview").src = url;
            },
        });
    });

    modal.querySelector("#vb-video-url").addEventListener("input", (e) => {
        modal.querySelector("#vb-video-preview").src = e.target.value;
    });

    modal.querySelector("#vb-poster-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar imagen de portada",
            onSelect: (url) => {
                modal.querySelector("#vb-poster-url").value = url;
                modal.querySelector("#vb-poster-preview").src = url;
            },
        });
    });

    modal.querySelector("#vb-poster-url").addEventListener("input", (e) => {
        modal.querySelector("#vb-poster-preview").src = e.target.value;
    });

    const close = () => overlay.remove();
    modal.querySelector("#vb-modal-close").onclick = close;
    modal.querySelector("#vb-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#vb-modal-save").onclick = () => {
        const newData = {
            video_url: modal.querySelector("#vb-video-url").value.trim(),
            poster_url:
                modal.querySelector("#vb-poster-url").value.trim() ||
                DEFAULT_DATA.poster_url,
            show_gradient: modal.querySelector("#vb-show-gradient").checked,
            show_radius: modal.querySelector("#vb-show-radius").checked,
        };

        if (!newData.video_url) {
            if (typeof window.showNotification === "function") {
                window.showNotification(
                    "Debes seleccionar un video de fondo",
                    "error",
                );
            }
            return;
        }

        const existingInner = component
            .getEl()
            ?.querySelector("[id^='vb-root-']");
        const uid =
            existingInner?.id?.replace("vb-root-", "") ||
            "vb" + Math.random().toString(36).slice(2, 7);

        component.addAttributes({
            "data-video-banner-config": JSON.stringify(newData),
        });
        component.components(buildVideoBannerHTML(newData, uid));
        close();
    };
}

const iconVideoBanner = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
    <rect x="2" y="8" width="28" height="16" rx="2" fill="none" stroke="#E97300" stroke-width="1"/>
    <path d="M13 13.5 L20 16 L13 18.5 Z" fill="#E97300"/>
</svg>`;

export function initializeVideoBannerBlock(editor) {
    const componentType = "video-banner-component";

    editor.DomComponents.addType("vb-video-media", {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === "vb-video-media"
                ? { type: "vb-video-media" }
                : false,
        model: {
            defaults: {
                tagName: "video",
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                selectable: false,
                hoverable: false,
                editable: false,
                highlightable: false,
                traits: [],
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
                name: "Banner con Video",
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
                    "data-video-banner-config": JSON.stringify(DEFAULT_DATA),
                },
                components: buildVideoBannerHTML(DEFAULT_DATA),
                traits: [
                    {
                        type: "button",
                        label: "Banner con Video",
                        text: "Administrar Banner",
                        full: true,
                        command: "open-video-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-video-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showVideoBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("video-banner-block", {
        label: "Banner con Video",
        category: "Heroes",
        media: iconVideoBanner,
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
            [data-gjs-type="${componentType}"] video { display: none !important; }
        `;
        head.appendChild(style);
    });
}