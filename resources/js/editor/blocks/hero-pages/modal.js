import { openMediaPicker } from "@/editor/media-picker";
import { IconPickerModal } from "@/editor/components/icon-picker-modal";
import { MAX_CARDS, MAX_DESC, MAX_HEADING, MAX_TITLE, createCard, mergeData } from "./defaults";
import { ensureModalStyles } from "./modal-styles";
import { applyHeroPagesConfig, readHeroPagesConfig } from "./template";
import { esc, getByPath, safeIcon, safeSrc, setByPath } from "./utils";

const removeBtn = (index, disabled) =>
    `<button type="button" class="hpm-icon-btn hpm-danger" data-action="remove" data-index="${index}" title="Eliminar tarjeta" ${disabled ? "disabled" : ""}><i class="ri-delete-bin-line"></i></button>`;

const moveBtn = (index, offset, total) => {
    const up = offset < 0;
    const disabled = up ? index === 0 : index === total - 1;
    return `<button type="button" class="hpm-icon-btn" data-action="move" data-index="${index}" data-offset="${offset}" title="${up ? "Subir" : "Bajar"}" ${disabled ? "disabled" : ""}><i class="${up ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}"></i></button>`;
};

const cardHtml = (index, total) => {
    const path = `cards.${index}`;
    return `<div class="hpm-card" data-item="${index}">
<div class="hpm-card-head"><span class="hpm-num">${index + 1}</span><span class="hpm-card-name">Tarjeta ${index + 1}</span>${moveBtn(index, -1, total)}${moveBtn(index, 1, total)}${removeBtn(index, total <= 1)}</div>
<div class="hpm-row hpm-row-top"><img class="hpm-preview" data-preview="${path}.image" alt=""><div class="hpm-col"><label class="hpm-label">Imagen de fondo</label><input type="text" class="hpm-input-sm" data-bind="${path}.image" placeholder="URL de la imagen"><button type="button" class="hpm-pick" data-action="pick-image" data-path="${path}.image"><i class="ri-image-line"></i> Seleccionar imagen</button></div></div>
<div><label class="hpm-label">Título (esquina superior)</label><input type="text" class="hpm-input" maxlength="${MAX_TITLE}" data-bind="${path}.title" placeholder="Título de la tarjeta"></div>
<div><label class="hpm-label">Descripción</label><input type="text" class="hpm-input" maxlength="${MAX_DESC}" data-bind="${path}.desc" placeholder="Descripción breve"></div>
<div><label class="hpm-label">Ícono</label><div class="hpm-row"><div class="hpm-icon-preview"><i data-icon-preview="${path}.icon"></i></div><input type="text" class="hpm-input-sm hpm-grow" data-bind="${path}.icon" placeholder="ri-shield-check-line"><button type="button" class="hpm-pick" data-action="pick-icon" data-path="${path}.icon"><i class="ri-emotion-happy-line"></i> Ícono</button></div></div>
<div><label class="hpm-label">Enlace (opcional)</label><input type="text" class="hpm-input" data-bind="${path}.href" placeholder="/pagina, https://... o déjalo vacío"></div>
</div>`;
};

const buildShell = () => `<div class="hpm-header"><div class="hpm-header-left"><i class="ri-gallery-line"></i><h2>Configurar Tarjetas por Páginas</h2></div><button type="button" class="hpm-close" data-action="close"><i class="ri-close-line"></i></button></div>
<div class="hpm-body">
<div class="hpm-card"><div><label class="hpm-label">Título principal</label><input type="text" class="hpm-input" maxlength="${MAX_HEADING}" data-bind="heading" placeholder="Título"></div><div><label class="hpm-label">Subtítulo</label><input type="text" class="hpm-input" maxlength="${MAX_HEADING}" data-bind="subheading" placeholder="Subtítulo"></div></div>
<div class="hpm-body-list" data-list style="display:flex;flex-direction:column;gap:0.75rem;"></div>
<button type="button" class="hpm-pick" data-action="add"><i class="ri-add-line"></i> Agregar tarjeta</button>
</div>
<div class="hpm-footer">
<div class="hpm-footer-group"><button type="button" class="hpm-btn-backup" data-action="backup"><i class="ri-download-2-line"></i> Respaldar</button><label class="hpm-btn-restore"><i class="ri-upload-2-line"></i> Restaurar<input type="file" accept=".json,application/json" data-restore hidden></label></div>
<button type="button" class="hpm-btn-cancel" data-action="close">Cancelar</button>
<button type="button" class="hpm-btn-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;

function downloadBackup(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const link = document.createElement("a");
    link.href = url;
    link.download = `tarjetas-paginas-backup-${stamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function confirmDialog({ icon, iconColor, title, message, detail, confirmLabel, confirmColor, showCancel = true }) {
    return new Promise((resolve) => {
        const element = document.createElement("div");
        element.className = "hpm-confirm-overlay";
        element.innerHTML = `<div class="hpm-confirm-modal"><div class="hpm-confirm-header"><i class="${icon}" style="color:${iconColor};"></i><h3>${esc(title)}</h3></div><div class="hpm-confirm-body"><p>${esc(message)}</p>${detail ? `<span class="hpm-confirm-filename"><i class="ri-file-code-line"></i>${esc(detail)}</span>` : ""}</div><div class="hpm-confirm-footer">${showCancel ? '<button type="button" class="hpm-confirm-cancel">Cancelar</button>' : ""}<button type="button" class="hpm-confirm-ok" style="background:${confirmColor};">${esc(confirmLabel)}</button></div></div>`;
        const finish = (value) => {
            element.remove();
            resolve(value);
        };
        element.querySelector(".hpm-confirm-ok").onclick = () => finish(true);
        const cancel = element.querySelector(".hpm-confirm-cancel");
        if (cancel) cancel.onclick = () => finish(false);
        document.body.appendChild(element);
    });
}

export function showHeroPagesModal(editor, component) {
    ensureModalStyles();
    document.getElementById("hero-pages-config-modal")?.remove();

    let state = mergeData(readHeroPagesConfig(component));
    const iconPicker = new IconPickerModal();

    const overlay = document.createElement("div");
    overlay.id = "hero-pages-config-modal";
    overlay.className = "hpm-overlay";
    const modal = document.createElement("div");
    modal.className = "hpm-modal";
    modal.innerHTML = buildShell();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const list = modal.querySelector("[data-list]");

    const syncPreviews = () => {
        modal.querySelectorAll("[data-preview]").forEach((img) => {
            img.src = safeSrc(getByPath(state, img.dataset.preview)) || "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        });
        modal.querySelectorAll("[data-icon-preview]").forEach((el) => {
            el.className = safeIcon(getByPath(state, el.dataset.iconPreview));
        });
    };

    const hydrate = () => {
        modal.querySelectorAll("[data-bind]").forEach((input) => {
            const value = getByPath(state, input.dataset.bind) ?? "";
            if (input.value !== String(value)) input.value = value;
        });
        modal.querySelector('[data-action="add"]').disabled = state.cards.length >= MAX_CARDS;
        syncPreviews();
    };

    const render = () => {
        list.innerHTML = state.cards.map((_, index) => cardHtml(index, state.cards.length)).join("");
        hydrate();
    };

    const reveal = (index) => {
        requestAnimationFrame(() => {
            const target = list.querySelector(`[data-item="${index}"]`);
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth", block: "center" });
            target.classList.remove("hpm-flash");
            void target.offsetWidth;
            target.classList.add("hpm-flash");
        });
    };

    const onKeydown = (event) => {
        if (event.key === "Escape" && !document.querySelector(".hpm-confirm-overlay")) close();
    };

    const close = () => {
        document.removeEventListener("keydown", onKeydown);
        iconPicker.close();
        overlay.remove();
    };

    const pickImage = (path) => {
        try {
            openMediaPicker({
                type: "image",
                title: "Seleccionar imagen de tarjeta",
                onSelect: (url) => {
                    setByPath(state, path, url);
                    hydrate();
                },
            });
        } catch (error) {
            console.error("[HeroPages] No se pudo abrir el selector de medios:", error);
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
            message: "Se reemplazará la configuración actual del formulario con la del respaldo. Los cambios se aplican a la sección cuando pulses «Aplicar cambios».",
            detail: file.name,
            confirmLabel: "Sí, restaurar",
            confirmColor: "#E97300",
        });
        if (!accepted) return;

        state = mergeData(parsed);
        render();
    };

    const indexOf = (el) => Number(el.dataset.index);

    const actions = {
        close,
        save: () => {
            applyHeroPagesConfig(editor, component, state);
            close();
        },
        add: () => {
            if (state.cards.length >= MAX_CARDS) return;
            state.cards.push(createCard());
            render();
            reveal(state.cards.length - 1);
        },
        remove: (el) => {
            if (state.cards.length <= 1) return;
            state.cards.splice(indexOf(el), 1);
            render();
        },
        move: (el) => {
            const from = indexOf(el);
            const to = from + Number(el.dataset.offset);
            if (to < 0 || to >= state.cards.length) return;
            state.cards.splice(to, 0, state.cards.splice(from, 1)[0]);
            render();
            reveal(to);
        },
        "pick-image": (el) => pickImage(el.dataset.path),
        "pick-icon": (el) =>
            iconPicker.open((selected) => {
                setByPath(state, el.dataset.path, selected);
                hydrate();
            }),
        backup: () => downloadBackup(mergeData(state)),
    };

    modal.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-action]");
        if (!trigger || trigger.disabled) return;
        const handler = actions[trigger.dataset.action];
        if (handler) handler(trigger);
    });

    modal.addEventListener("input", (event) => {
        const path = event.target.dataset ? event.target.dataset.bind : null;
        if (!path) return;
        setByPath(state, path, event.target.value);
        syncPreviews();
    });

    modal.addEventListener("change", (event) => {
        if (event.target.matches("[data-restore]")) restoreFrom(event.target);
    });

    overlay.addEventListener("mousedown", (event) => {
        if (event.target === overlay) close();
    });
    document.addEventListener("keydown", onKeydown);

    render();
}