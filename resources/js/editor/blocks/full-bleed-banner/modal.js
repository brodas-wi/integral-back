import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";
import { MAX_BUTTON, MAX_TITLE, mergeData } from "./defaults";
import { ensureModalStyles } from "./modal-styles";
import { applyFullBleedConfig, readFullBleedConfig } from "./template";
import { esc, safeSrc } from "./utils";

const ALIGN_OPTIONS = [
    ["left", "Izquierda"],
    ["right", "Derecha"],
];

const buildShell = () => `
<div class="fbm-header">
    <div class="fbm-header-left"><i class="ri-image-2-line"></i><h2>Configurar Banner Completo</h2></div>
    <button type="button" class="fbm-close" data-action="close"><i class="ri-close-line"></i></button>
</div>
<div class="fbm-body">
    <div class="fbm-card">
        <label class="fbm-label">Imagen de fondo</label>
        <img class="fbm-preview" data-preview alt="">
        <div class="fbm-row">
            <input type="text" class="fbm-input fbm-grow" data-bind="image_url" placeholder="URL de la imagen">
            <button type="button" class="fbm-pick" data-action="pick-media"><i class="ri-image-line"></i> Seleccionar</button>
        </div>
    </div>
    <div class="fbm-card">
        <label class="fbm-label">Título</label>
        <input type="text" class="fbm-input" maxlength="${MAX_TITLE}" data-bind="title" placeholder="Título del banner">
    </div>
    <div class="fbm-card">
        <label class="fbm-label">Botón</label>
        <input type="text" class="fbm-input" maxlength="${MAX_BUTTON}" data-bind="button_label" placeholder="Texto del botón (vacío para ocultarlo)">
        <input type="text" class="fbm-input" data-bind="button_href" placeholder="URL o #">
    </div>
    <div class="fbm-card">
        <label class="fbm-label">Alineación del contenido</label>
        <div class="fbm-seg">${ALIGN_OPTIONS.map(([value, label]) => `<button type="button" class="fbm-seg-btn" data-action="align" data-value="${value}">${label}</button>`).join("")}</div>
    </div>
</div>
<div class="fbm-footer">
    <div class="fbm-footer-group">
        <button type="button" class="fbm-btn-backup" data-action="backup"><i class="ri-download-2-line"></i> Respaldar</button>
        <label class="fbm-btn-restore"><i class="ri-upload-2-line"></i> Restaurar<input type="file" accept=".json,application/json" data-restore hidden></label>
    </div>
    <button type="button" class="fbm-btn-cancel" data-action="close">Cancelar</button>
    <button type="button" class="fbm-btn-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;

function downloadBackup(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const link = document.createElement("a");
    link.href = url;
    link.download = `full-bleed-banner-backup-${stamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function confirmDialog({ icon, iconColor, title, message, detail, confirmLabel, confirmColor, showCancel = true }) {
    return new Promise((resolve) => {
        const element = document.createElement("div");
        element.className = "fbm-confirm-overlay";
        element.innerHTML = `<div class="fbm-confirm-modal"><div class="fbm-confirm-header"><i class="${icon}" style="color:${iconColor};"></i><h3>${esc(title)}</h3></div><div class="fbm-confirm-body"><p>${esc(message)}</p>${detail ? `<span class="fbm-confirm-filename"><i class="ri-file-code-line"></i>${esc(detail)}</span>` : ""}</div><div class="fbm-confirm-footer">${showCancel ? '<button type="button" class="fbm-confirm-cancel">Cancelar</button>' : ""}<button type="button" class="fbm-confirm-ok" style="background:${confirmColor};">${esc(confirmLabel)}</button></div></div>`;
        const finish = (value) => {
            element.remove();
            resolve(value);
        };
        element.querySelector(".fbm-confirm-ok").onclick = () => finish(true);
        const cancel = element.querySelector(".fbm-confirm-cancel");
        if (cancel) cancel.onclick = () => finish(false);
        document.body.appendChild(element);
    });
}

const notify = (message, type) => {
    if (typeof window.showNotification === "function") window.showNotification(message, type);
};

export function showFullBleedModal(editor, component) {
    ensureModalStyles();
    document.getElementById("full-bleed-config-modal")?.remove();

    let state = mergeData(readFullBleedConfig(component));

    const overlay = document.createElement("div");
    overlay.id = "full-bleed-config-modal";
    overlay.className = "fbm-overlay";
    const modal = document.createElement("div");
    modal.className = "fbm-modal";
    modal.innerHTML = buildShell();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const hydrate = () => {
        modal.querySelectorAll("[data-bind]").forEach((input) => {
            const value = state[input.dataset.bind] ?? "";
            if (input.value !== value) input.value = value;
        });
        modal.querySelectorAll('[data-action="align"]').forEach((button) => {
            button.classList.toggle("active", button.dataset.value === state.align);
        });
        modal.querySelector("[data-preview]").src =
            safeSrc(state.image_url) || assetUrl("images/placeholder.svg");
    };

    const onKeydown = (event) => {
        if (event.key === "Escape" && !document.querySelector(".fbm-confirm-overlay")) close();
    };

    const close = () => {
        document.removeEventListener("keydown", onKeydown);
        overlay.remove();
    };

    const pickMedia = () => {
        try {
            openMediaPicker({
                type: "image",
                title: "Seleccionar imagen de fondo",
                onSelect: (url) => {
                    state.image_url = url;
                    hydrate();
                },
            });
        } catch (error) {
            console.error("[FullBleed] No se pudo abrir el selector de medios:", error);
            return;
        }
        const picker = document.getElementById("media-modal");
        if (picker) picker.style.setProperty("z-index", "1000001", "important");
    };

    const restoreFrom = async (input) => {
        const file = input.files && input.files[0];
        input.value = "";
        if (!file) return;

        let parsed = null;
        try {
            parsed = JSON.parse(await file.text());
        } catch {
            parsed = null;
        }

        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            await confirmDialog({
                icon: "ri-error-warning-line",
                iconColor: "#ef4444",
                title: "Archivo inválido",
                message: "El archivo seleccionado no es un JSON válido.",
                confirmLabel: "Cerrar",
                confirmColor: "#ef4444",
                showCancel: false,
            });
            return;
        }

        const accepted = await confirmDialog({
            icon: "ri-refresh-line",
            iconColor: "#E97300",
            title: "Restaurar configuración",
            message: "Se reemplazará la configuración actual del formulario con la del respaldo. Los cambios se aplican al banner cuando pulses «Aplicar cambios».",
            detail: file.name,
            confirmLabel: "Sí, restaurar",
            confirmColor: "#E97300",
        });
        if (!accepted) return;

        state = mergeData(parsed);
        hydrate();
    };

    const actions = {
        close,
        "pick-media": pickMedia,
        align: (el) => {
            state.align = el.dataset.value;
            hydrate();
        },
        backup: () => downloadBackup(mergeData(state)),
        save: () => {
            if (!safeSrc(state.image_url)) {
                notify("Debes seleccionar una imagen de fondo", "error");
                return;
            }
            applyFullBleedConfig(editor, component, state);
            close();
        },
    };

    modal.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-action]");
        if (!trigger) return;
        const handler = actions[trigger.dataset.action];
        if (handler) handler(trigger);
    });

    modal.addEventListener("input", (event) => {
        const key = event.target.dataset ? event.target.dataset.bind : null;
        if (!key) return;
        state[key] = event.target.value;
        if (key === "image_url") hydrate();
    });

    modal.addEventListener("change", (event) => {
        if (event.target.matches("[data-restore]")) restoreFrom(event.target);
    });

    overlay.addEventListener("mousedown", (event) => {
        if (event.target === overlay) close();
    });
    document.addEventListener("keydown", onKeydown);

    hydrate();
}