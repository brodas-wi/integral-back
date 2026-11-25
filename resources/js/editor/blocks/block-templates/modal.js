import { openMediaPicker } from "@/editor/media-picker";
import { ensureModalStyles } from "../video-banner/modal-styles";
import { applyConfig, esc, mergeData, readConfig } from "./core";

const MEDIA_TITLES = { image: "Seleccionar imagen", video: "Seleccionar video" };

const card = (field, inner) => `
<div class="vb-card">
    <label class="vb-label">${esc(field.label)}</label>
    ${field.hint ? `<p class="vb-hint">${esc(field.hint)}</p>` : ""}
    ${inner}
</div>`;

const input = (field, attrs = "") => `<input class="vb-input" data-bind="${esc(field.key)}" ${attrs}>`;

const mediaControl = (field) => {
    const key = esc(field.key);
    const preview =
        field.type === "video"
            ? `<video class="vb-preview" data-preview="${key}" muted preload="metadata"></video>`
            : `<img class="vb-preview" data-preview="${key}" alt="">`;
    const icon = field.type === "video" ? "ri-video-line" : "ri-image-line";
    return `
<div class="vb-stack">
    ${preview}
    <div class="vb-row">
        ${input(field, 'type="text" placeholder="URL"')}
        <button type="button" class="vb-pick" data-action="pick" data-path="${key}" data-type="${field.type}"><i class="${icon}"></i> Seleccionar</button>
    </div>
</div>`;
};

const toggleField = (field) => `
<div class="vb-card">
    <div class="vb-toggle-row">
        <div class="vb-toggle-text">
            <span class="vb-toggle-title">${esc(field.label)}</span>
            ${field.hint ? `<span class="vb-toggle-desc">${esc(field.hint)}</span>` : ""}
        </div>
        <label class="vb-switch">
            <input type="checkbox" data-bind="${esc(field.key)}">
            <span class="vb-switch-track"></span>
        </label>
    </div>
</div>`;

const CONTROLS = {
    text: (field) => input(field, 'type="text"'),
    url: (field) => input(field, 'type="text" placeholder="https://"'),
    number: (field) => input(field, 'type="number"'),
    color: (field) => input(field, 'type="color" style="max-width:6rem;height:2.25rem;padding:0.125rem"'),
    textarea: (field) =>
        `<textarea class="vb-input" rows="4" style="border-radius:0.5rem;resize:vertical" data-bind="${esc(field.key)}"></textarea>`,
    select: (field) =>
        `<select class="vb-input" data-bind="${esc(field.key)}">${field.options
            .map((option) => `<option value="${esc(option)}">${esc(option)}</option>`)
            .join("")}</select>`,
    image: mediaControl,
    video: mediaControl,
};

const fieldMarkup = (field) => (field.type === "toggle" ? toggleField(field) : card(field, CONTROLS[field.type](field)));

const notice = (text) => `<div class="vb-info"><i class="ri-information-line"></i><p>${esc(text)}</p></div>`;

const buildShell = (def) => `
<div class="vb-header">
    <div class="vb-header-left"><i class="ri-settings-3-line"></i><h2>${esc(def.name)}</h2></div>
    <button type="button" class="vb-close" data-action="close"><i class="ri-close-line"></i></button>
</div>
<div class="vb-body">
    ${def.description ? notice(def.description) : ""}
    ${def.schema.length ? def.schema.map(fieldMarkup).join("") : notice("Esta plantilla no tiene campos configurables.")}
</div>
<div class="vb-footer">
    <button type="button" class="vb-btn-cancel" data-action="close">Cancelar</button>
    <button type="button" class="vb-btn-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;

export function showBlockTemplateModal(editor, component, def) {
    ensureModalStyles();
    document.getElementById("bt-config-modal")?.remove();

    const state = mergeData(def.schema, readConfig(component));

    const overlay = document.createElement("div");
    overlay.id = "bt-config-modal";
    overlay.className = "vb-overlay";
    const modal = document.createElement("div");
    modal.className = "vb-modal";
    modal.innerHTML = buildShell(def);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const syncPreviews = () => {
        modal.querySelectorAll("[data-preview]").forEach((element) => {
            const url = state[element.dataset.preview];
            element.style.display = url ? "block" : "none";
            if (!url) element.removeAttribute("src");
            else if (element.getAttribute("src") !== url) element.src = url;
        });
    };

    const hydrate = () => {
        modal.querySelectorAll("[data-bind]").forEach((control) => {
            const value = state[control.dataset.bind];
            if (control.type === "checkbox") control.checked = Boolean(value);
            else control.value = value ?? "";
        });
        syncPreviews();
    };

    const update = (path, value) => {
        state[path] = value;
        const control = modal.querySelector(`[data-bind="${path}"]`);
        if (control) control.value = value;
        syncPreviews();
    };

    const pickMedia = (path, type) => {
        try {
            openMediaPicker({ type, title: MEDIA_TITLES[type], onSelect: (url) => update(path, url) });
        } catch (error) {
            console.error("[BlockTemplates] No se pudo abrir el selector de medios:", error);
            return;
        }
        const picker = document.getElementById("media-modal");
        if (picker) picker.style.setProperty("z-index", "1000001", "important");
    };

    const close = () => overlay.remove();

    const actions = {
        close,
        save: () => {
            applyConfig(editor, component, def, state);
            close();
        },
        pick: (element) => pickMedia(element.dataset.path, element.dataset.type),
    };

    modal.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-action]");
        if (!trigger) return;
        actions[trigger.dataset.action]?.(trigger);
    });

    const syncBound = (event) => {
        const path = event.target.dataset?.bind;
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