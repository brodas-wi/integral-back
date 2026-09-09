import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

const HERO_VIDEO_STYLES = `
<style>
.hv-section{position:relative;width:100%;min-height:500px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden;font-family:'Poppins',sans-serif;background:#0a0a0a;}
.hv-bg{position:absolute;inset:0;z-index:0;}
.hv-bg video,.hv-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.hv-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.15) 55%,rgba(0,0,0,0.65) 100%);}
.hv-content{position:relative;z-index:10;width:100%;padding:2.5rem 2rem 3.5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:0.75rem;}
.hv-title{margin:0;font-size:1.75rem;line-height:1.25;font-weight:800;color:#fff;}
.hv-subtitle{margin:0;font-size:1.0625rem;font-weight:500;color:#fff;line-height:1.4;}
.hv-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;margin-top:0.5rem;padding:0.625rem 2rem;border-radius:9999px;font-size:0.9375rem;font-weight:700;text-decoration:none;cursor:pointer;border:1.5px solid transparent;font-family:inherit;transition:background 0.15s,border-color 0.15s,color 0.15s;white-space:nowrap;background:#E97300;color:#fff;}
.hv-btn:hover{background:#c96200;}
@media(max-width:640px){
.hv-title{font-size:1.375rem;}
.hv-subtitle{font-size:0.9375rem;}
.hv-content{padding:2rem 1.25rem 2.25rem;}
.hv-mute-btn{width:2.125rem;height:2.125rem;font-size:0.9375rem;top:1rem;right:1rem;}
}
</style>`;

function buildHeroVideoHTML(data, uid) {
    uid = uid || "hv" + Math.random().toString(36).slice(2, 7);
    const videoUrl = data.video_url || "";
    const posterUrl = data.poster_url || assetUrl("images/placeholder.svg");

    const titleHtml = data.title
        ? `<h2 class="hv-title">${data.title}</h2>`
        : "";
    const subtitleHtml = data.subtitle
        ? `<p class="hv-subtitle">${data.subtitle}</p>`
        : "";
    const buttonHtml = data.button_label
        ? `<a href="${data.button_href || "#"}" class="hv-btn">${data.button_label}</a>`
        : "";

    const bgMedia = `<video id="hv-video-${uid}" src="${videoUrl}" poster="${posterUrl}" autoplay muted loop playsinline data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false"></video>`;

    return `<section id="hv-root-${uid}" class="hv-section" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="hv-bg" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            ${bgMedia}
        </div>
        <div class="hv-content">
            ${titleHtml}
            ${subtitleHtml}
            ${buttonHtml}
        </div>
    </section>`;
}

const DEFAULT_DATA = {
    video_url: "",
    poster_url: assetUrl("images/placeholder.svg"),
    title: "Haz crecer tu negocio",
    subtitle: "Empieza hoy",
    button_label: "Ver más",
    button_href: "#",
};

function showHeroVideoModal(editor, component) {
    const existing = document.getElementById("hero-video-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("hv-modal-styles")) {
        const style = document.createElement("style");
        style.id = "hv-modal-styles";
        style.textContent = `
            .hv-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .hv-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .hv-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .hv-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .hv-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .hv-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .hv-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .hv-modal-close:hover{background:#f1f5f9;color:#475569;}
            .hv-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;overflow-x:auto;}
            .hv-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
            .hv-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .hv-tab-btn i{font-size:1rem;}
            .hv-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .hv-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .hv-tab-panel.active{display:flex;}
            .hv-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .hv-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .hv-row{display:flex;gap:0.75rem;align-items:center;}
            .hv-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .hv-input:focus{border-color:#3b82f6;}
            textarea.hv-input{resize:vertical;min-height:80px;font-family:inherit;}
            .hv-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .hv-pick-btn:hover{background:#002a52;}
            .hv-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .hv-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hv-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .hv-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hv-btn-save:hover{background:#d97821;}
            .hv-video-preview{width:100%;height:140px;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;background:#0a0a0a;}
            .hv-hint{font-size:0.75rem;color:#94a3b8;margin:0 0 0.75rem;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-hero-video-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const videoUrl = currentData.video_url ?? DEFAULT_DATA.video_url;
    const posterUrl = currentData.poster_url || DEFAULT_DATA.poster_url;
    const title = currentData.title ?? DEFAULT_DATA.title;
    const subtitle = currentData.subtitle ?? DEFAULT_DATA.subtitle;
    const buttonLabel = currentData.button_label ?? DEFAULT_DATA.button_label;
    const buttonHref = currentData.button_href || DEFAULT_DATA.button_href;

    const overlay = document.createElement("div");
    overlay.id = "hero-video-config-modal";
    overlay.className = "hv-overlay";

    const modal = document.createElement("div");
    modal.className = "hv-modal";
    modal.innerHTML = `
        <div class="hv-modal-header">
            <div class="hv-modal-header-left"><i class="ri-movie-line"></i><h2>Configurar Hero Video</h2></div>
            <button id="hv-modal-close" class="hv-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="hv-modal-tabs">
            <button class="hv-tab-btn active" data-tab="video"><i class="ri-video-line"></i> Video</button>
            <button class="hv-tab-btn" data-tab="content"><i class="ri-text"></i> Contenido</button>
            <button class="hv-tab-btn" data-tab="button"><i class="ri-cursor-line"></i> Botón</button>
        </div>
        <div class="hv-modal-body">
            <div class="hv-tab-panel active" id="hv-panel-video">
                <div class="hv-card">
                    <label class="hv-label">Video de fondo</label>
                    <p class="hv-hint">El video se reproduce en loop automáticamente y siempre inicia sin audio (requisito de los navegadores). El usuario final puede activar el sonido con el botón de mute.</p>
                    <div style="display:flex;flex-direction:column;gap:0.5rem;">
                        <video id="hv-video-preview" class="hv-video-preview" src="${videoUrl}" muted></video>
                        <div class="hv-row">
                            <input id="hv-video-url" type="text" placeholder="URL del video (mp4 o webm)" value="${videoUrl}" class="hv-input">
                            <button id="hv-video-pick" class="hv-pick-btn"><i class="ri-video-line"></i> Seleccionar</button>
                        </div>
                    </div>
                </div>
                <div class="hv-card">
                    <label class="hv-label">Imagen de portada (poster)</label>
                    <p class="hv-hint">Se muestra mientras el video carga, y en el editor en lugar del video para mejor rendimiento.</p>
                    <div style="display:flex;flex-direction:column;gap:0.5rem;">
                        <img id="hv-poster-preview" src="${posterUrl}" style="height:90px;width:100%;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;">
                        <div class="hv-row">
                            <input id="hv-poster-url" type="text" placeholder="URL de la imagen" value="${posterUrl}" class="hv-input">
                            <button id="hv-poster-pick" class="hv-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hv-tab-panel" id="hv-panel-content">
                <div class="hv-card">
                    <label class="hv-label">Título (opcional)</label>
                    <input id="hv-title" type="text" placeholder="Título del hero" value="${title}" class="hv-input">
                </div>
                <div class="hv-card">
                    <label class="hv-label">Subtítulo (opcional)</label>
                    <input id="hv-subtitle" type="text" placeholder="Subtítulo del hero" value="${subtitle}" class="hv-input">
                </div>
            </div>
            <div class="hv-tab-panel" id="hv-panel-button">
                <div class="hv-card">
                    <label class="hv-label">Botón CTA (opcional)</label>
                    <div style="display:flex;flex-direction:column;gap:0.625rem;">
                        <input id="hv-button-label" type="text" placeholder="Ej: Ver más" value="${buttonLabel}" class="hv-input">
                        <input id="hv-button-href" type="text" placeholder="URL o #" value="${buttonHref}" class="hv-input">
                    </div>
                </div>
            </div>
        </div>
        <div class="hv-modal-footer">
            <button id="hv-modal-cancel" class="hv-btn-cancel">Cancelar</button>
            <button id="hv-modal-save" class="hv-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelectorAll(".hv-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".hv-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".hv-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#hv-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    modal.querySelector("#hv-video-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "video",
            title: "Seleccionar video de fondo",
            onSelect: (url) => {
                modal.querySelector("#hv-video-url").value = url;
                modal.querySelector("#hv-video-preview").src = url;
            },
        });
    });

    modal.querySelector("#hv-video-url").addEventListener("input", (e) => {
        modal.querySelector("#hv-video-preview").src = e.target.value;
    });

    modal.querySelector("#hv-poster-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar imagen de portada",
            onSelect: (url) => {
                modal.querySelector("#hv-poster-url").value = url;
                modal.querySelector("#hv-poster-preview").src = url;
            },
        });
    });

    modal.querySelector("#hv-poster-url").addEventListener("input", (e) => {
        modal.querySelector("#hv-poster-preview").src = e.target.value;
    });

    const close = () => overlay.remove();
    modal.querySelector("#hv-modal-close").onclick = close;
    modal.querySelector("#hv-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#hv-modal-save").onclick = () => {
        const data = {
            video_url: modal.querySelector("#hv-video-url").value.trim(),
            poster_url:
                modal.querySelector("#hv-poster-url").value.trim() ||
                DEFAULT_DATA.poster_url,
            title: modal.querySelector("#hv-title").value.trim(),
            subtitle: modal.querySelector("#hv-subtitle").value.trim(),
            button_label: modal.querySelector("#hv-button-label").value.trim(),
            button_href:
                modal.querySelector("#hv-button-href").value.trim() || "#",
        };

        if (!data.video_url) {
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
            ?.querySelector("[id^='hv-root-']");
        const uid =
            existingInner?.id?.replace("hv-root-", "") ||
            "hv" + Math.random().toString(36).slice(2, 7);

        component.addAttributes({
            "data-hero-video-config": JSON.stringify(data),
        });
        purgeHeroVideoCssRules(editor);
        component.components(
            buildHeroVideoHTML(data, uid) + HERO_VIDEO_STYLES,
        );
        setTimeout(() => applyCanvasPosterBackground(editor, component), 50);
        close();
    };
}

function purgeHeroVideoCssRules(editor) {
    const css = editor.Css;
    if (!css) return;
    const allRules = css.getAll();
    const toRemove = allRules.filter((rule) => {
        const selectors = rule.getSelectorsString?.() || "";
        return /(^|[\s.#>+~])hv-[a-z-]+/.test(selectors);
    });
    toRemove.forEach((rule) => css.remove(rule));
}

export function initializeHeroVideoBlock(editor) {
    const componentType = "hero-video-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Hero Video",
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
                    "data-hero-video-config": JSON.stringify(DEFAULT_DATA),
                },
                components:
                    buildHeroVideoHTML(DEFAULT_DATA) + HERO_VIDEO_STYLES,
                traits: [
                    {
                        type: "button",
                        label: "Hero Video",
                        text: "Administrar Hero Video",
                        full: true,
                        command: "open-hero-video-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
                this.on("change:attributes component:update", () => {
                    setTimeout(() => applyCanvasPosterBackground(editor, this), 50);
                });
            },
        },
    });

    editor.Commands.add("open-hero-video-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showHeroVideoModal(ed, selected);
        },
    });

    editor.BlockManager.add("hero-video-block", {
        label: "Hero Video",
        category: "Banners",
        media: `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
            <rect x="4" y="6" width="24" height="15" rx="1" fill="none" stroke="#E97300" stroke-width="1"/>
            <path d="M13 10.5 L20 13.5 L13 16.5 Z" fill="#E97300"/>
            <rect x="5.5" y="24" width="21" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.85"/>
            <rect x="2" y="27" width="28" height="3" fill="#E97300"/>
        </svg>`,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    injectHeroVideoEditorStyles(editor, componentType);
}

function injectHeroVideoEditorStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        const head = iframe?.contentDocument?.head;
        if (!head || head.querySelector(`#${componentType}-editor-css`)) return;
        const style = iframe.contentDocument.createElement("style");
        style.id = `${componentType}-editor-css`;
        style.textContent = `
            [data-gjs-type="${componentType}"] * { pointer-events: none !important; }
            [data-gjs-type="${componentType}"] .hv-bg { background-size: cover; background-position: center; background-repeat: no-repeat; }
        `;
        head.appendChild(style);
    });

    editor.on("component:add component:update", (component) => {
        if (component.get("type") !== componentType) return;
        applyCanvasPosterBackground(editor, component);
    });

    editor.on("load", () => {
        editor
            .getWrapper()
            ?.find(`[data-gjs-type="${componentType}"]`)
            ?.forEach((component) =>
                applyCanvasPosterBackground(editor, component),
            );
    });
}

function applyCanvasPosterBackground(editor, component) {
    const el = component.getEl();
    if (!el) return;
    const bgEl = el.querySelector(".hv-bg");
    if (!bgEl) return;

    const videoEl = bgEl.querySelector("video");
    if (videoEl) {
        videoEl.pause();
        videoEl.removeAttribute("src");
        videoEl.load();
        videoEl.style.display = "none";
    }

    let posterUrl = "";
    try {
        const config = JSON.parse(
            component.getAttributes()["data-hero-video-config"] || "{}",
        );
        posterUrl = config.poster_url || "";
    } catch {
        posterUrl = "";
    }

    if (posterUrl) {
        bgEl.style.backgroundImage = `url("${posterUrl}")`;
    }
}