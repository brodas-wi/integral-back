import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

const WB_CSS = `
.wb-section{position:relative;display:flex;align-items:center;justify-content:center;width:100%;aspect-ratio:25/5;min-height:220px;overflow:hidden;background:#0f1b33;box-sizing:border-box;}
.wb-bg{position:absolute;inset:0;width:100%;height:100%;z-index:0;}
.wb-bg img,.wb-bg video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.wb-section.wb-has-text .wb-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,27,51,0.35) 0%,rgba(15,27,51,0.55) 100%);}
.wb-content{position:relative;z-index:5;text-align:center;padding:1.5rem 2rem;max-width:900px;}
.wb-line1{margin:0 0 0.25rem;font-size:1.5rem;font-weight:500;color:#fff;line-height:1.3;}
.wb-line2{margin:0;font-size:2.25rem;font-weight:800;color:#fff;line-height:1.25;}
@media(max-width:992px){.wb-line1{font-size:1.25rem;}.wb-line2{font-size:1.75rem;}}
@media(max-width:640px){.wb-section{aspect-ratio:16/9;min-height:220px;}.wb-line1{font-size:1.0625rem;}.wb-line2{font-size:1.375rem;}.wb-content{padding:1.25rem 1.25rem;}}
`;

function buildWideBannerHTML(data, uid) {
    uid = uid || "wb" + Math.random().toString(36).slice(2, 7);
    const videoUrl = data.video_url || "";
    const posterUrl = data.poster_url || assetUrl("images/placeholder.svg");

    const bgMedia = `<video id="wb-video-${uid}" src="${videoUrl}" poster="${posterUrl}" autoplay muted loop playsinline disablepictureinpicture disableremoteplayback tabindex="-1" data-gjs-type="wb-video-media" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false"></video>`;

    const line1Html = data.line1
        ? `<p class="wb-line1">${data.line1}</p>`
        : "";
    const line2Html = data.line2
        ? `<p class="wb-line2">${data.line2}</p>`
        : "";

    const hasText = Boolean(data.line1 || data.line2);
    const sectionClass = hasText ? "wb-section wb-has-text" : "wb-section";

    return `<section id="wb-root-${uid}" class="${sectionClass}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="wb-bg" style="background-image:url('${posterUrl}');background-size:cover;background-position:center;" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            ${bgMedia}
        </div>
        <div class="wb-content">
            ${line1Html}
            ${line2Html}
        </div>
    </section>`;
}

const DEFAULT_DATA = {
    video_url: "",
    poster_url: assetUrl("images/placeholder.svg"),
    line1: "",
    line2: "",
};

function showWideBannerModal(editor, component) {
    const existing = document.getElementById("wb-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("wb-modal-styles")) {
        const style = document.createElement("style");
        style.id = "wb-modal-styles";
        style.textContent = `
            .wb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .wb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .wb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .wb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .wb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .wb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .wb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .wb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .wb-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;overflow-x:auto;}
            .wb-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
            .wb-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .wb-tab-btn i{font-size:1rem;}
            .wb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .wb-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .wb-tab-panel.active{display:flex;}
            .wb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .wb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .wb-hint{font-size:0.75rem;color:#94a3b8;margin:0 0 0.75rem;}
            .wb-row{display:flex;gap:0.75rem;align-items:center;}
            .wb-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .wb-input:focus{border-color:#3b82f6;}
            .wb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .wb-pick-btn:hover{background:#002a52;}
            .wb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .wb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .wb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .wb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .wb-btn-save:hover{background:#d97821;}
            .wb-video-preview{width:100%;height:110px;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;background:#0f1b33;}
            .wb-proportions-box{background:#eff6ff;border:1px solid #bfdbfe;border-radius:0.5rem;padding:0.75rem 1rem;display:flex;gap:0.625rem;align-items:flex-start;}
            .wb-proportions-box i{color:#3b82f6;font-size:1.125rem;flex-shrink:0;margin-top:0.125rem;}
            .wb-proportions-box p{margin:0;font-size:0.8125rem;color:#1e40af;line-height:1.5;}
            .wb-proportions-box strong{font-weight:700;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-wide-banner-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const videoUrl = currentData.video_url ?? DEFAULT_DATA.video_url;
    const posterUrl = currentData.poster_url || DEFAULT_DATA.poster_url;
    const line1 = currentData.line1 ?? DEFAULT_DATA.line1;
    const line2 = currentData.line2 ?? DEFAULT_DATA.line2;

    const overlay = document.createElement("div");
    overlay.id = "wb-config-modal";
    overlay.className = "wb-overlay";

    const modal = document.createElement("div");
    modal.className = "wb-modal";
    modal.innerHTML = `
        <div class="wb-modal-header">
            <div class="wb-modal-header-left"><i class="ri-movie-line"></i><h2>Configurar Banner Ancho</h2></div>
            <button id="wb-modal-close" class="wb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="wb-modal-tabs">
            <button class="wb-tab-btn active" data-tab="video"><i class="ri-video-line"></i> Video</button>
            <button class="wb-tab-btn" data-tab="content"><i class="ri-text"></i> Texto</button>
        </div>
        <div class="wb-modal-body">
            <div class="wb-tab-panel active" id="wb-panel-video">
                <div class="wb-proportions-box">
                    <i class="ri-information-line"></i>
                    <p>Este banner es panorámico (proporción <strong>25:5</strong>, equivalente a 5:1). Para que el video se vea nítido y bien encuadrado en pantallas anchas, sube un archivo con una resolución cercana a <strong>1920×384px</strong> (o cualquier proporción similar horizontal). Evita videos verticales o cuadrados.</p>
                </div>
                <div class="wb-card">
                    <label class="wb-label">Video de fondo</label>
                    <p class="wb-hint">El video se reproduce en loop automáticamente y siempre inicia sin audio (requisito de los navegadores).</p>
                    <div style="display:flex;flex-direction:column;gap:0.5rem;">
                        <video id="wb-video-preview" class="wb-video-preview" src="${videoUrl}" muted></video>
                        <div class="wb-row">
                            <input id="wb-video-url" type="text" placeholder="URL del video (mp4 o webm)" value="${videoUrl}" class="wb-input">
                            <button id="wb-video-pick" class="wb-pick-btn"><i class="ri-video-line"></i> Seleccionar</button>
                        </div>
                    </div>
                </div>
                <div class="wb-card">
                    <label class="wb-label">Imagen de portada (poster)</label>
                    <p class="wb-hint">Se muestra en el editor en lugar del video, y como imagen de carga en público.</p>
                    <div style="display:flex;flex-direction:column;gap:0.5rem;">
                        <img id="wb-poster-preview" src="${posterUrl}" style="height:80px;width:100%;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;">
                        <div class="wb-row">
                            <input id="wb-poster-url" type="text" placeholder="URL de la imagen" value="${posterUrl}" class="wb-input">
                            <button id="wb-poster-pick" class="wb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="wb-tab-panel" id="wb-panel-content">
                <div class="wb-card">
                    <label class="wb-label">Línea 1 (superior) — opcional</label>
                    <p class="wb-hint">Si dejas ambas líneas vacías, el banner se mostrará solo con el video, sin oscurecimiento sobre él.</p>
                    <input id="wb-line1" type="text" placeholder="Donde hay propósito, hay camino" value="${line1}" class="wb-input">
                </div>
                <div class="wb-card">
                    <label class="wb-label">Línea 2 (inferior) — opcional</label>
                    <input id="wb-line2" type="text" placeholder="Y nosotros lo financiamos" value="${line2}" class="wb-input">
                </div>
            </div>
        </div>
        <div class="wb-modal-footer">
            <button id="wb-modal-cancel" class="wb-btn-cancel">Cancelar</button>
            <button id="wb-modal-save" class="wb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelectorAll(".wb-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".wb-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".wb-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#wb-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    modal.querySelector("#wb-video-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "video",
            title: "Seleccionar video de fondo",
            onSelect: (url) => {
                modal.querySelector("#wb-video-url").value = url;
                modal.querySelector("#wb-video-preview").src = url;
            },
        });
    });

    modal.querySelector("#wb-video-url").addEventListener("input", (e) => {
        modal.querySelector("#wb-video-preview").src = e.target.value;
    });

    modal.querySelector("#wb-poster-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar imagen de portada",
            onSelect: (url) => {
                modal.querySelector("#wb-poster-url").value = url;
                modal.querySelector("#wb-poster-preview").src = url;
            },
        });
    });

    modal.querySelector("#wb-poster-url").addEventListener("input", (e) => {
        modal.querySelector("#wb-poster-preview").src = e.target.value;
    });

    const close = () => overlay.remove();
    modal.querySelector("#wb-modal-close").onclick = close;
    modal.querySelector("#wb-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#wb-modal-save").onclick = () => {
        const data = {
            video_url: modal.querySelector("#wb-video-url").value.trim(),
            poster_url:
                modal.querySelector("#wb-poster-url").value.trim() ||
                DEFAULT_DATA.poster_url,
            line1: modal.querySelector("#wb-line1").value.trim(),
            line2: modal.querySelector("#wb-line2").value.trim(),
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
            ?.querySelector("[id^='wb-root-']");
        const uid =
            existingInner?.id?.replace("wb-root-", "") ||
            "wb" + Math.random().toString(36).slice(2, 7);

        component.addAttributes({
            "data-wide-banner-config": JSON.stringify(data),
        });

        const el = component.getEl();
        if (el) {
            el.querySelectorAll("style").forEach((styleTag) => styleTag.remove());
        }

        purgeWideBannerCssRules(editor);

        component.components(
            buildWideBannerHTML(data, uid) + `<style>${WB_CSS}</style>`,
        );
        close();
    };
}

function purgeWideBannerCssRules(editor) {
    const css = editor.Css;
    if (!css) return;
    const allRules = css.getAll();
    const toRemove = allRules.filter((rule) => {
        const selectors = rule.getSelectorsString?.() || "";
        return /(^|[\s.#>+~])wb-[a-z-]+/.test(selectors);
    });
    toRemove.forEach((rule) => css.remove(rule));
}

const iconWideBanner = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
    <rect x="2" y="11" width="28" height="10" rx="1" fill="none" stroke="#E97300" stroke-width="1"/>
    <path d="M12 14.5 L19 16.5 L12 18.5 Z" fill="#E97300"/>
    <rect x="4" y="23.5" width="24" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.85"/>
</svg>`;

export function initializeWideBannerBlock(editor) {
    const componentType = "wide-banner-component";

    editor.DomComponents.addType("wb-video-media", {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === "wb-video-media"
                ? { type: "wb-video-media" }
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
        view: {
            onRender() {
                const el = this.el;
                if (!el) return;
                el.removeAttribute("autoplay");
                el.removeAttribute("src");
                el.muted = true;
                el.pause();
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
                name: "Banner Ancho con Video",
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
                    "data-wide-banner-config": JSON.stringify(DEFAULT_DATA),
                },
                components:
                    buildWideBannerHTML(DEFAULT_DATA) + `<style>${WB_CSS}</style>`,
                traits: [
                    {
                        type: "button",
                        label: "Banner Ancho",
                        text: "Administrar Banner",
                        full: true,
                        command: "open-wide-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-wide-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showWideBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("wide-banner-block", {
        label: "Banner Ancho con Video",
        category: "Banners",
        media: iconWideBanner,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    editor.on("block:drag:stop", (component) => {
        if (!component || component.get("type") !== componentType) return;
        purgeWideBannerCssRules(editor);
    });

    injectWideBannerEditorStyles(editor, componentType);
}

function injectWideBannerEditorStyles(editor, componentType) {
    const inject = () => {
        const iframe = editor.Canvas.getFrameEl();
        const head = iframe?.contentDocument?.head;
        if (!head || head.querySelector(`#${componentType}-editor-css`)) return;
        const style = iframe.contentDocument.createElement("style");
        style.id = `${componentType}-editor-css`;
        style.textContent = `
            [data-gjs-type="${componentType}"] * { pointer-events: none !important; }
            [data-gjs-type="${componentType}"] .wb-bg video { display: none !important; }
            [data-gjs-type="${componentType}"] .wb-bg { background-size: cover; background-position: center; background-repeat: no-repeat; }
        `;
        head.appendChild(style);

        editor
            .getWrapper()
            ?.find(`[data-gjs-type="${componentType}"]`)
            ?.forEach((component) => applyCanvasPosterBackground(component));
    };

    editor.on("load", () => setTimeout(inject, 100));
    editor.on("storage:end:load", () => setTimeout(inject, 400));
    editor.on("canvas:frame:load", () => setTimeout(inject, 100));

    editor.on("component:add component:update", (component) => {
        if (component.get("type") !== componentType) return;
        setTimeout(() => applyCanvasPosterBackground(component), 50);
    });
}

function applyCanvasPosterBackground(component) {
    const el = component.getEl();
    if (!el) return;
    const bgEl = el.querySelector(".wb-bg");
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
            component.getAttributes()["data-wide-banner-config"] || "{}",
        );
        posterUrl = config.poster_url || "";
    } catch {
        posterUrl = "";
    }

    if (posterUrl) {
        bgEl.style.backgroundImage = `url("${posterUrl}")`;
    }
}