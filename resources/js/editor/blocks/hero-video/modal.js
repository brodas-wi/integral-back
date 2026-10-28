import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";
import { MAX_BUTTON, MAX_SUBTITLE, MAX_TITLE, mergeData } from "./defaults";
import { ensureModalStyles } from "./modal-styles";
import { applyHeroVideoConfig, readHeroVideoConfig } from "./template";
import { esc, safeSrc } from "./utils";

const TABS = [
    { id: "video", icon: "ri-video-line", label: "Video" },
    { id: "content", icon: "ri-text", label: "Contenido" },
    { id: "button", icon: "ri-cursor-line", label: "Botón" },
];

const mediaCard = (label, hint, preview, bind, placeholder, action, buttonLabel, icon) =>
    `<div class="hvm-card"><label class="hvm-label">${label}</label>${hint ? `<p class="hvm-hint">${hint}</p>` : ""}${preview}<div class="hvm-row"><input type="text" class="hvm-input hvm-grow" data-bind="${bind}" placeholder="${placeholder}"><button type="button" class="hvm-pick" data-action="${action}"><i class="${icon}"></i> ${buttonLabel}</button></div></div>`;

const buildPanels = () => ({
    video:
        mediaCard(
            "Video de fondo",
            "Se reproduce en bucle y siempre inicia sin audio, como exigen los navegadores. El visitante puede activar el sonido con el botón de la esquina.",
            '<video class="hvm-video-preview" data-video-preview muted></video>',
            "video_url",
            "URL del video (mp4 o webm)",
            "pick-video",
            "Seleccionar",
            "ri-video-line",
        ) +
        mediaCard(
            "Imagen de portada",
            "Se muestra mientras el video carga y en el editor, en lugar del video, para mejor rendimiento.",
            '<img class="hvm-image-preview" data-poster-preview alt="">',
            "poster_url",
            "URL de la imagen",
            "pick-poster",
            "Seleccionar",
            "ri-image-line",
        ),
    content: `<div class="hvm-card"><label class="hvm-label">Título (opcional)</label><input type="text" class="hvm-input" maxlength="${MAX_TITLE}" data-bind="title" placeholder="Título del banner"></div><div class="hvm-card"><label class="hvm-label">Subtítulo (opcional)</label><input type="text" class="hvm-input" maxlength="${MAX_SUBTITLE}" data-bind="subtitle" placeholder="Subtítulo del banner"></div>`,
    button: `<div class="hvm-card"><label class="hvm-label">Botón (opcional)</label><input type="text" class="hvm-input" maxlength="${MAX_BUTTON}" data-bind="button_label" placeholder="Texto del botón (vacío para ocultarlo)"><input type="text" class="hvm-input" data-bind="button_href" placeholder="URL o #"></div>`,
});

const buildShell = () => {
    const panels = buildPanels();
    const tabs = TABS.map(
        (tab, index) =>
            `<button type="button" class="hvm-tab${index === 0 ? " active" : ""}" data-action="tab" data-tab="${tab.id}"><i class="${tab.icon}"></i> ${tab.label}</button>`,
    ).join("");
    const bodies = TABS.map(
        (tab, index) =>
            `<div class="hvm-panel${index === 0 ? " active" : ""}" data-panel="${tab.id}">${panels[tab.id]}</div>`,
    ).join("");

    return `<div class="hvm-header"><div class="hvm-header-left"><i class="ri-movie-line"></i><h2>Configurar Banner con Video de Fondo</h2></div><button type="button" class="hvm-close" data-action="close"><i class="ri-close-line"></i></button></div>
<div class="hvm-tabs">${tabs}</div>
<div class="hvm-body">${bodies}</div>
<div class="hvm-footer">
<div class="hvm-footer-group"><button type="button" class="hvm-btn-backup" data-action="backup"><i class="ri-download-2-line"></i> Respaldar</button><label class="hvm-btn-restore"><i class="ri-upload-2-line"></i> Restaurar<input type="file" accept=".json,application/json" data-restore hidden></label></div>
<button type="button" class="hvm-btn-cancel" data-action="close">Cancelar</button>
<button type="button" class="hvm-btn-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;
};

function downloadBackup(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const link = document.createElement("a");
    link.href = url;
    link.download = `banner-video-backup-${stamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function confirmDialog({ icon, iconColor, title, message, detail, confirmLabel, confirmColor, showCancel = true }) {
    return new Promise((resolve) => {
        const element = document.createElement("div");
        element.className = "hvm-confirm-overlay";
        element.innerHTML = `<div class="hvm-confirm-modal"><div class="hvm-confirm-header"><i class="${icon}" style="color:${iconColor};"></i><h3>${esc(title)}</h3></div><div class="hvm-confirm-body"><p>${esc(message)}</p>${detail ? `<span class="hvm-confirm-filename"><i class="ri-file-code-line"></i>${esc(detail)}</span>` : ""}</div><div class="hvm-confirm-footer">${showCancel ? '<button type="button" class="hvm-confirm-cancel">Cancelar</button>' : ""}<button type="button" class="hvm-confirm-ok" style="background:${confirmColor};">${esc(confirmLabel)}</button></div></div>`;
        const finish = (value) => {
            element.remove();
            resolve(value);
        };
        element.querySelector(".hvm-confirm-ok").onclick = () => finish(true);
        const cancel = element.querySelector(".hvm-confirm-cancel");
        if (cancel) cancel.onclick = () => finish(false);
        document.body.appendChild(element);
    });
}

const notify = (message, type) => {
    if (typeof window.showNotification === "function") window.showNotification(message, type);
};

export function showHeroVideoModal(editor, component) {
    ensureModalStyles();
    document.getElementById("hero-video-config-modal")?.remove();

    let state = mergeData(readHeroVideoConfig(component));

    const overlay = document.createElement("div");
    overlay.id = "hero-video-config-modal";
    overlay.className = "hvm-overlay";
    const modal = document.createElement("div");
    modal.className = "hvm-modal";
    modal.innerHTML = buildShell();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const hydrate = () => {
        modal.querySelectorAll("[data-bind]").forEach((input) => {
            const value = state[input.dataset.bind] ?? "";
            if (input.value !== value) input.value = value;
        });

        const video = modal.querySelector("[data-video-preview]");
        const videoSrc = safeSrc(state.video_url);
        if ((video.getAttribute("src") || "") !== videoSrc) {
            if (videoSrc) video.setAttribute("src", videoSrc);
            else video.removeAttribute("src");
        }

        modal.querySelector("[data-poster-preview]").src =
            safeSrc(state.poster_url) || assetUrl("images/placeholder.svg");
    };

    const onKeydown = (event) => {
        if (event.key === "Escape" && !document.querySelector(".hvm-confirm-overlay")) close();
    };

    const close = () => {
        document.removeEventListener("keydown", onKeydown);
        overlay.remove();
    };

    const pickMedia = (type, title, key) => {
        try {
            openMediaPicker({
                type,
                title,
                onSelect: (url) => {
                    state[key] = url;
                    hydrate();
                },
            });
        } catch (error) {
            console.error("[HeroVideo] No se pudo abrir el selector de medios:", error);
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
        tab: (el) => {
            modal
                .querySelectorAll(".hvm-tab")
                .forEach((button) => button.classList.toggle("active", button === el));
            modal
                .querySelectorAll(".hvm-panel")
                .forEach((panel) =>
                    panel.classList.toggle("active", panel.dataset.panel === el.dataset.tab),
                );
        },
        "pick-video": () => pickMedia("video", "Seleccionar video de fondo", "video_url"),
        "pick-poster": () => pickMedia("image", "Seleccionar imagen de portada", "poster_url"),
        backup: () => downloadBackup(mergeData(state)),
        save: () => {
            if (!safeSrc(state.video_url)) {
                notify("Debes seleccionar un video de fondo", "error");
                return;
            }
            applyHeroVideoConfig(editor, component, state);
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
        if (key === "video_url" || key === "poster_url") hydrate();
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