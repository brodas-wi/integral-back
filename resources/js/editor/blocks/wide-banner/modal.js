import { openMediaPicker } from "@/editor/media-picker";
import { applyConfig, esc, mergeData, readConfig } from "./core";

const CSS = `
.wbm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);}
.wbm-modal{display:flex;flex-direction:column;width:100%;max-width:680px;max-height:92vh;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.15);color:#1e293b;font-family:'Inter',sans-serif;}
.wbm-modal *{box-sizing:border-box;}
.wbm-modal,.wbm-modal *{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
.wbm-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;}
.wbm-header h2{display:flex;align-items:center;gap:0.5rem;margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.wbm-header h2 i{color:#3b82f6;}
.wbm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-size:1.125rem;cursor:pointer;}
.wbm-close:hover{background:#f1f5f9;color:#475569;}
.wbm-tabs{display:flex;flex-wrap:wrap;gap:0.25rem;flex-shrink:0;padding:0.5rem 1rem;border-bottom:1px solid #e2e8f0;}
.wbm-tab{display:flex;align-items:center;gap:0.375rem;padding:0.4375rem 0.75rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-family:inherit;font-size:0.8125rem;font-weight:500;cursor:pointer;}
.wbm-tab:hover{background:#f1f5f9;}
.wbm-tab.active{background:#e8f0f8;color:#003B71;}
.wbm-body{flex:1;padding:1.25rem;overflow-y:auto;background:#f8fafc;}
.wbm-panel{display:none;flex-direction:column;gap:1rem;}
.wbm-panel.active{display:flex;}
.wbm-card{padding:1rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;}
.wbm-label{display:block;margin-bottom:0.5rem;font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;}
.wbm-hint{margin:0 0 0.75rem;font-size:0.75rem;color:#94a3b8;}
.wbm-stack{display:flex;flex-direction:column;gap:0.5rem;}
.wbm-row{display:flex;align-items:center;gap:0.75rem;}
.wbm-input{flex:1;width:100%;min-width:0;padding:0.5rem 1rem;border:1px solid #e2e8f0;border-radius:9999px;background:#f8fafc;color:#1e293b;font-family:inherit;font-size:0.875rem;outline:none;}
.wbm-input:focus{border-color:#003B71;}
.wbm-pick{display:flex;align-items:center;gap:0.25rem;flex-shrink:0;padding:0.5rem 1rem;border:0;border-radius:9999px;background:#003B71;color:#fff;font-family:inherit;font-size:0.75rem;font-weight:600;white-space:nowrap;cursor:pointer;}
.wbm-pick:hover{background:#002a52;}
.wbm-preview{display:block;width:100%;height:100px;object-fit:cover;background:#0f1b33;border:1px solid #e2e8f0;border-radius:0.375rem;}
.wbm-info{display:flex;align-items:flex-start;gap:0.625rem;padding:0.75rem 1rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:0.5rem;}
.wbm-info i{flex-shrink:0;margin-top:0.125rem;font-size:1.125rem;color:#3b82f6;}
.wbm-info p{margin:0;font-size:0.8125rem;line-height:1.5;color:#1e40af;}
.wbm-footer{display:flex;justify-content:flex-end;gap:0.75rem;flex-shrink:0;padding:1rem 1.25rem;background:#fff;border-top:1px solid #f1f5f9;}
.wbm-cancel{padding:0.5rem 1.25rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;}
.wbm-cancel:hover{background:#f8fafc;}
.wbm-save{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1.25rem;border:0;border-radius:9999px;background:#f0872a;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;}
.wbm-save:hover{background:#d97821;}
`;

const input = (bind, placeholder) => `<input type="text" class="wbm-input" data-bind="${bind}" placeholder="${esc(placeholder)}">`;

const mediaCard = ({ label, hint, preview, bind, placeholder, type, title, icon }) => `
<div class="wbm-card">
    <label class="wbm-label">${label}</label>
    <p class="wbm-hint">${hint}</p>
    <div class="wbm-stack">${preview}<div class="wbm-row">${input(bind, placeholder)}<button type="button" class="wbm-pick" data-action="pick" data-path="${bind}" data-type="${type}" data-title="${title}"><i class="${icon}"></i> Seleccionar</button></div></div>
</div>`;

const shell = () => `
<div class="wbm-header"><h2><i class="ri-movie-line"></i> Configurar Banner Ancho</h2><button type="button" class="wbm-close" data-action="close"><i class="ri-close-line"></i></button></div>
<div class="wbm-tabs">
    <button type="button" class="wbm-tab active" data-action="tab" data-tab="video"><i class="ri-video-line"></i> Video</button>
    <button type="button" class="wbm-tab" data-action="tab" data-tab="text"><i class="ri-text"></i> Texto</button>
</div>
<div class="wbm-body">
    <div class="wbm-panel active" data-panel="video">
        <div class="wbm-info"><i class="ri-information-line"></i><p>El banner ocupa todo el ancho (máximo 1600px) y mantiene el video <strong>sin recortes laterales</strong>: solo se recorta arriba y abajo, con el centro como foco. Sube un video horizontal (por ejemplo 16:9, 1920×1080px) con lo importante en el centro.</p></div>
        ${mediaCard({ label: "Video de fondo", hint: "Se reproduce en bucle y sin audio. Si no hay video, se muestra la portada.", preview: '<video class="wbm-preview" data-preview="video_url" muted preload="metadata"></video>', bind: "video_url", placeholder: "URL del video (mp4 o webm)", type: "video", title: "Seleccionar video de fondo", icon: "ri-video-line" })}
        ${mediaCard({ label: "Imagen de portada (poster)", hint: "Se muestra en el editor y mientras carga el video.", preview: '<img class="wbm-preview" data-preview="poster_url" alt="">', bind: "poster_url", placeholder: "URL de la imagen", type: "image", title: "Seleccionar imagen de portada", icon: "ri-image-line" })}
    </div>
    <div class="wbm-panel" data-panel="text">
        <div class="wbm-card"><label class="wbm-label">Línea 1 (superior, opcional)</label><p class="wbm-hint">Si dejas ambas líneas vacías, el banner muestra solo el video, sin oscurecer.</p>${input("line1", "Donde hay propósito, hay camino")}</div>
        <div class="wbm-card"><label class="wbm-label">Línea 2 (inferior, opcional)</label>${input("line2", "Y nosotros lo financiamos")}</div>
    </div>
</div>
<div class="wbm-footer">
    <button type="button" class="wbm-cancel" data-action="close">Cancelar</button>
    <button type="button" class="wbm-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;

export function showWideBannerModal(editor, component) {
    if (!document.getElementById("wbm-styles")) {
        const style = document.createElement("style");
        style.id = "wbm-styles";
        style.textContent = CSS;
        document.head.appendChild(style);
    }
    document.getElementById("wb-config-modal")?.remove();

    const state = mergeData(readConfig(component));

    const overlay = document.createElement("div");
    overlay.id = "wb-config-modal";
    overlay.className = "wbm-overlay";
    const modal = document.createElement("div");
    modal.className = "wbm-modal";
    modal.innerHTML = shell();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const syncPreview = (key, url) => {
        const el = modal.querySelector(`[data-preview="${key}"]`);
        el.style.display = url ? "block" : "none";
        if (!url) el.removeAttribute("src");
        else if (el.getAttribute("src") !== url) el.src = url;
    };

    const hydrate = () => {
        modal.querySelectorAll("[data-bind]").forEach((el) => {
            if (el.value !== state[el.dataset.bind]) el.value = state[el.dataset.bind] ?? "";
        });
        syncPreview("video_url", state.video_url);
        syncPreview("poster_url", state.poster_url);
    };

    const close = () => overlay.remove();

    const actions = {
        close,
        save: () => {
            applyConfig(editor, component, state);
            close();
        },
        tab: (el) => {
            modal.querySelectorAll(".wbm-tab").forEach((tab) => tab.classList.toggle("active", tab === el));
            modal.querySelectorAll(".wbm-panel").forEach((p) => p.classList.toggle("active", p.dataset.panel === el.dataset.tab));
        },
        pick: (el) => {
            try {
                openMediaPicker({
                    type: el.dataset.type,
                    title: el.dataset.title,
                    onSelect: (url) => {
                        state[el.dataset.path] = url;
                        hydrate();
                    },
                });
            } catch (error) {
                console.error("[WideBanner] No se pudo abrir el selector de medios:", error);
                return;
            }
            document.getElementById("media-modal")?.style.setProperty("z-index", "1000001", "important");
        },
    };

    modal.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-action]");
        if (trigger) actions[trigger.dataset.action]?.(trigger);
    });

    modal.addEventListener("input", (event) => {
        const key = event.target.dataset?.bind;
        if (!key) return;
        state[key] = event.target.value;
        hydrate();
    });

    overlay.addEventListener("mousedown", (event) => {
        if (event.target === overlay) close();
    });

    hydrate();
}