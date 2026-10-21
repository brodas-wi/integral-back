import { openMediaPicker } from "@/editor/media-picker";
import { mergeData } from "./defaults";
import { ensureModalStyles } from "./modal-styles";
import { applyVideoBannerConfig, readVideoBannerConfig } from "./template";

const toggleCard = (bind, title, description) => `
<div class="vb-card">
    <div class="vb-toggle-row">
        <div class="vb-toggle-text">
            <span class="vb-toggle-title">${title}</span>
            <span class="vb-toggle-desc">${description}</span>
        </div>
        <label class="vb-switch">
            <input type="checkbox" data-bind="${bind}">
            <span class="vb-switch-track"></span>
        </label>
    </div>
</div>`;

const mediaCard = ({ label, hint, preview, bind, placeholder, type, title, icon }) => `
<div class="vb-card">
    <label class="vb-label">${label}</label>
    <p class="vb-hint">${hint}</p>
    <div class="vb-stack">
        ${preview}
        <div class="vb-row">
            <input type="text" class="vb-input" data-bind="${bind}" placeholder="${placeholder}">
            <button type="button" class="vb-pick" data-action="pick" data-path="${bind}" data-type="${type}" data-title="${title}"><i class="${icon}"></i> Seleccionar</button>
        </div>
    </div>
</div>`;

const buildShell = () => `
<div class="vb-header">
    <div class="vb-header-left"><i class="ri-movie-line"></i><h2>Configurar Banner</h2></div>
    <button type="button" class="vb-close" data-action="close"><i class="ri-close-line"></i></button>
</div>
<div class="vb-body">
    <div class="vb-info">
        <i class="ri-information-line"></i>
        <p>Este banner mantiene proporción <strong>20:9</strong> y se escala sin recortes en cualquier ancho de pantalla. Para que el video llene todo el marco, sube un archivo cercano a <strong>1280×576px</strong> o <strong>1920×864px</strong>.</p>
    </div>
    ${mediaCard({
    label: "Video de fondo",
    hint: "Opcional. Si no seleccionas un video, se mostrará la imagen de portada como banner estático. El video se reproduce en loop automáticamente.",
    preview: '<video class="vb-preview" data-preview="video_url" muted preload="metadata"></video>',
    bind: "video_url",
    placeholder: "URL del video (mp4 o webm)",
    type: "video",
    title: "Seleccionar video de fondo",
    icon: "ri-video-line",
})}
    ${mediaCard({
    label: "Imagen de portada (poster)",
    hint: "Se muestra en el editor en lugar del video, y como imagen de carga en público.",
    preview: '<img class="vb-preview" data-preview="poster_url" alt="">',
    bind: "poster_url",
    placeholder: "URL de la imagen",
    type: "image",
    title: "Seleccionar imagen de portada",
    icon: "ri-image-line",
})}
    ${toggleCard("show_gradient", "Gradiente naranja", "Superpone un degradado sobre el video")}
    ${toggleCard("show_radius", "Bordes redondeados", "Desactiva si el video ya tiene esquinas redondeadas")}
</div>
<div class="vb-footer">
    <button type="button" class="vb-btn-cancel" data-action="close">Cancelar</button>
    <button type="button" class="vb-btn-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;

export function showVideoBannerModal(editor, component) {
    ensureModalStyles();
    document.getElementById("vb-config-modal")?.remove();

    const state = mergeData(readVideoBannerConfig(component));

    const overlay = document.createElement("div");
    overlay.id = "vb-config-modal";
    overlay.className = "vb-overlay";
    const modal = document.createElement("div");
    modal.className = "vb-modal";
    modal.innerHTML = buildShell();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const syncPreview = (selector, url) => {
        const element = modal.querySelector(selector);
        element.style.display = url ? "block" : "none";
        if (!url) {
            element.removeAttribute("src");
        } else if (element.getAttribute("src") !== url) {
            element.src = url;
        }
    };

    const syncPreviews = () => {
        syncPreview('[data-preview="video_url"]', state.video_url);
        syncPreview('[data-preview="poster_url"]', state.poster_url);
    };

    const hydrate = () => {
        modal.querySelectorAll("[data-bind]").forEach((input) => {
            const value = state[input.dataset.bind];
            if (input.type === "checkbox") input.checked = Boolean(value);
            else input.value = value ?? "";
        });
        syncPreviews();
    };

    const update = (path, value) => {
        state[path] = value;
        const input = modal.querySelector(`[data-bind="${path}"]`);
        if (input && input.type !== "checkbox") input.value = value;
        syncPreviews();
    };

    const pickMedia = (path, type, title) => {
        try {
            openMediaPicker({ type, title, onSelect: (url) => update(path, url) });
        } catch (error) {
            console.error("[VideoBanner] No se pudo abrir el selector de medios:", error);
            return;
        }
        const picker = document.getElementById("media-modal");
        if (picker) picker.style.setProperty("z-index", "1000001", "important");
    };

    const close = () => overlay.remove();

    const actions = {
        close,
        save: () => {
            applyVideoBannerConfig(editor, component, state);
            close();
        },
        pick: (el) => pickMedia(el.dataset.path, el.dataset.type, el.dataset.title),
    };

    modal.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-action]");
        if (!trigger) return;
        const handler = actions[trigger.dataset.action];
        if (handler) handler(trigger);
    });

    const syncBound = (event) => {
        const path = event.target.dataset ? event.target.dataset.bind : null;
        if (!path) return;
        state[path] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        syncPreviews();
    };

    modal.addEventListener("input", syncBound);
    modal.addEventListener("change", syncBound);

    overlay.addEventListener("mousedown", (event) => {
        if (event.target === overlay) close();
    });

    hydrate();
}