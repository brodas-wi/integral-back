import { openMediaPicker } from "@/editor/media-picker";
import { IconPickerModal } from "@/editor/components/icon-picker-modal";
import { MAX_SECTIONS, mergeData } from "./defaults";
import { ensureModalStyles } from "./modal-styles";
import { applyFooterConfig, readFooterConfig } from "./template";
import { attachUrlAutocomplete } from "./url-autocomplete";
import { esc, getByPath, setByPath } from "./utils";

const TABS = [
    { id: "logo", icon: "ri-image-line", label: "Logo" },
    { id: "sections", icon: "ri-layout-column-line", label: "Secciones" },
];

const card = (content) => `<div class="ftm-card">${content}</div>`;

const textInput = (bind, placeholder = "") =>
    `<input type="text" class="ftm-input ftm-grow" data-bind="${bind}" placeholder="${esc(placeholder)}">`;

const smallInput = (bind, placeholder = "", className = "") =>
    `<input type="text" class="ftm-input-sm ${className}" data-bind="${bind}" placeholder="${esc(placeholder)}">`;

const removeBtn = (list, index, title) =>
    `<button type="button" class="ftm-icon-btn ftm-danger" data-action="remove" data-list="${list}" data-index="${index}" title="${title}"><i class="ri-delete-bin-line"></i></button>`;

const moveBtn = (list, index, offset, total) => {
    const up = offset < 0;
    const disabled = up ? index === 0 : index === total - 1;
    return `<button type="button" class="ftm-icon-btn" data-action="move" data-list="${list}" data-index="${index}" data-offset="${offset}" title="${up ? "Subir" : "Bajar"}" ${disabled ? "disabled" : ""}><i class="${up ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"}"></i></button>`;
};

const moveGroup = (list, index, total) => moveBtn(list, index, -1, total) + moveBtn(list, index, 1, total);

const linkRow = (_, index, listPath, total) => {
    const path = `${listPath}.${index}`;
    return `<div class="ftm-link" data-item="${path}">
<div class="ftm-row">${smallInput(`${path}.label`, "Texto del enlace", "ftm-grow")}${moveGroup(listPath, index, total)}${removeBtn(listPath, index, "Eliminar enlace")}</div>
<div class="ftm-row"><div class="ftm-icon-preview"><i data-icon-preview="${path}.icon"></i></div>${smallInput(`${path}.icon`, "Icono (opcional)", "ftm-grow")}<button type="button" class="ftm-pick" data-action="pick-icon" data-path="${path}.icon"><i class="ri-emotion-happy-line"></i> Icono</button></div>
<div class="ftm-row"><input type="text" class="ftm-input-sm ftm-grow ftm-url" data-bind="${path}.href" data-href-for="${path}" placeholder="URL o buscar página..."><label class="ftm-check"><input type="checkbox" data-bind="${path}.isText"> Solo texto</label></div>
</div>`;
};

const sectionCard = (section, index, all) => {
    const listPath = `sections.${index}.links`;
    return `<div class="ftm-section" data-item="sections.${index}">
<div class="ftm-section-head">${smallInput(`sections.${index}.title`, "Título de la sección", "ftm-grow")}${moveGroup("sections", index, all.length)}${removeBtn("sections", index, "Eliminar sección")}</div>
<div class="ftm-section-body">
<div class="ftm-links" data-links="${listPath}">${section.links.map((link, i) => linkRow(link, i, listPath, section.links.length)).join("")}</div>
<button type="button" class="ftm-btn-add" data-action="add-link" data-index="${index}"><i class="ri-add-line"></i> Agregar enlace</button>
</div>
</div>`;
};

const buildPanels = () => ({
    logo:
        card(
            `<label class="ftm-label">Imagen del logo</label><div class="ftm-row"><div class="ftm-img-preview" data-img-preview="logo_url"></div>${textInput("logo_url", "URL del logo")}<button type="button" class="ftm-pick" data-action="pick-media" data-path="logo_url" data-title="Seleccionar logo"><i class="ri-image-line"></i> Seleccionar</button></div>`,
        ) +
        card(
            `<label class="ftm-label">Texto alternativo / logo de texto</label>${textInput("logo_alt", "Texto alternativo")}<p class="ftm-hint">Se muestra como texto cuando no hay imagen de logo.</p>`,
        ),
    sections: `<p class="ftm-hint ftm-hint-top">Máximo ${MAX_SECTIONS} secciones. Usa las flechas para cambiar el orden de secciones y enlaces.</p><div class="ftm-list" data-list="sections"></div><button type="button" class="ftm-btn-add" data-action="add-section"><i class="ri-add-line"></i> Agregar sección</button>`,
});

const buildShell = () => {
    const panels = buildPanels();
    const tabs = TABS.map(
        (tab, index) =>
            `<button type="button" class="ftm-tab${index === 0 ? " active" : ""}" data-action="tab" data-tab="${tab.id}"><i class="${tab.icon}"></i> ${tab.label}</button>`,
    ).join("");
    const bodies = TABS.map(
        (tab, index) =>
            `<div class="ftm-panel${index === 0 ? " active" : ""}" data-panel="${tab.id}">${panels[tab.id]}</div>`,
    ).join("");

    return `<div class="ftm-header"><div class="ftm-header-left"><i class="ri-layout-bottom-line"></i><h2>Configurar Footer</h2></div><button type="button" class="ftm-close" data-action="close"><i class="ri-close-line"></i></button></div>
<div class="ftm-tabs">${tabs}</div>
<div class="ftm-body">${bodies}</div>
<div class="ftm-footer">
<div class="ftm-footer-group"><button type="button" class="ftm-btn-backup" data-action="backup"><i class="ri-download-2-line"></i> Respaldar</button><label class="ftm-btn-restore"><i class="ri-upload-2-line"></i> Restaurar<input type="file" accept=".json,application/json" data-restore hidden></label></div>
<button type="button" class="ftm-btn-cancel" data-action="close">Cancelar</button>
<button type="button" class="ftm-btn-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;
};

function downloadBackup(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const link = document.createElement("a");
    link.href = url;
    link.download = `footer-backup-${stamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function confirmDialog({ icon, iconColor, title, message, detail, confirmLabel, confirmColor, showCancel = true }) {
    return new Promise((resolve) => {
        const element = document.createElement("div");
        element.className = "ftm-confirm-overlay";
        element.innerHTML = `<div class="ftm-confirm-modal"><div class="ftm-confirm-header"><i class="${icon}" style="color:${iconColor};"></i><h3>${esc(title)}</h3></div><div class="ftm-confirm-body"><p>${esc(message)}</p>${detail ? `<span class="ftm-confirm-filename"><i class="ri-file-code-line"></i>${esc(detail)}</span>` : ""}</div><div class="ftm-confirm-footer">${showCancel ? '<button type="button" class="ftm-confirm-cancel">Cancelar</button>' : ""}<button type="button" class="ftm-confirm-ok" style="background:${confirmColor};">${esc(confirmLabel)}</button></div></div>`;
        const finish = (value) => {
            element.remove();
            resolve(value);
        };
        element.querySelector(".ftm-confirm-ok").onclick = () => finish(true);
        const cancel = element.querySelector(".ftm-confirm-cancel");
        if (cancel) cancel.onclick = () => finish(false);
        document.body.appendChild(element);
    });
}

function enableSorting(list, { item, handle }, getItems, rerender) {
    let from = null;
    const clearMarks = () =>
        list.querySelectorAll(".ftm-drag-over").forEach((el) => el.classList.remove("ftm-drag-over"));
    const cardOf = (event) =>
        event.target instanceof Element ? event.target.closest(item) : null;

    list.addEventListener("mousedown", (event) => {
        if (!(event.target instanceof Element) || !event.target.closest(handle)) return;
        const card = cardOf(event);
        if (card) card.draggable = true;
    });

    list.addEventListener("dragstart", (event) => {
        const card = cardOf(event);
        if (!card || !card.draggable) return;
        from = Number(card.dataset.sortIdx);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(from));
        requestAnimationFrame(() => card.classList.add("ftm-dragging"));
    });

    list.addEventListener("dragover", (event) => {
        if (from === null) return;
        const card = cardOf(event);
        if (!card) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        clearMarks();
        if (Number(card.dataset.sortIdx) !== from) card.classList.add("ftm-drag-over");
    });

    list.addEventListener("drop", (event) => {
        if (from === null) return;
        const card = cardOf(event);
        if (!card) return;
        event.preventDefault();
        const source = from;
        const target = Number(card.dataset.sortIdx);
        from = null;
        clearMarks();
        if (source === target) return;
        const items = getItems();
        items.splice(target, 0, items.splice(source, 1)[0]);
        rerender();
    });

    list.addEventListener("dragend", () => {
        from = null;
        clearMarks();
        list.querySelectorAll(".ftm-dragging").forEach((el) => {
            el.classList.remove("ftm-dragging");
            el.draggable = false;
        });
    });
}

export function showFooterModal(editor, component) {
    ensureModalStyles();
    document.getElementById("footer-config-modal")?.remove();

    let state = mergeData(readFooterConfig(component));
    const iconPicker = new IconPickerModal();
    const cleanups = [];

    const overlay = document.createElement("div");
    overlay.id = "footer-config-modal";
    overlay.className = "ftm-overlay";
    const modal = document.createElement("div");
    modal.className = "ftm-modal";
    modal.innerHTML = buildShell();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const list = modal.querySelector('[data-list="sections"]');

    const syncPreviews = () => {
        modal.querySelectorAll("[data-img-preview]").forEach((el) => {
            const url = getByPath(state, el.dataset.imgPreview);
            el.innerHTML = url ? `<img src="${esc(url)}" alt="">` : '<i class="ri-image-line"></i>';
        });
        modal.querySelectorAll("[data-icon-preview]").forEach((el) => {
            const icon = String(getByPath(state, el.dataset.iconPreview) ?? "").trim();
            el.className = icon || "ri-star-line";
        });
    };

    const hydrate = () => {
        modal.querySelectorAll("[data-bind]").forEach((input) => {
            const value = getByPath(state, input.dataset.bind);
            if (input.type === "checkbox") {
                input.checked = Boolean(value);
            } else if (input.value !== String(value ?? "")) {
                input.value = value ?? "";
            }
        });
        modal.querySelectorAll("[data-href-for]").forEach((input) => {
            const link = getByPath(state, input.dataset.hrefFor);
            input.disabled = Boolean(link && link.isText);
        });
        modal.querySelectorAll(".ftm-url").forEach((input) => attachUrlAutocomplete(input));
        modal.querySelector('[data-action="add-section"]').disabled =
            state.sections.length >= MAX_SECTIONS;
        syncPreviews();
    };

    const render = () => {
        list.innerHTML = state.sections.map(sectionCard).join("");
        hydrate();
    };

    const revealItem = (path) => {
        requestAnimationFrame(() => {
            const target = modal.querySelector(`[data-item="${path}"]`);
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth", block: "center" });
            target.classList.remove("ftm-flash");
            void target.offsetWidth;
            target.classList.add("ftm-flash");
        });
    };

    const updateField = (path, value) => {
        setByPath(state, path, value);
        hydrate();
    };

    const pickMedia = (path, title) => {
        try {
            openMediaPicker({ type: "image", title, onSelect: (url) => updateField(path, url) });
        } catch (error) {
            console.error("[Footer] No se pudo abrir el selector de medios:", error);
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
            message: "Se reemplazará la configuración actual del formulario con la del respaldo. Los cambios se aplican al footer cuando pulses «Aplicar cambios».",
            detail: file.name,
            confirmLabel: "Sí, restaurar",
            confirmColor: "#E97300",
        });
        if (!accepted) return;

        state = mergeData(parsed);
        render();
    };

    const close = () => {
        cleanups.forEach((fn) => fn());
        iconPicker.close();
        overlay.remove();
    };

    const actions = {
        close,
        save: () => {
            applyFooterConfig(editor, component, state);
            close();
        },
        backup: () => downloadBackup(mergeData(state)),
        tab: (el) => {
            modal
                .querySelectorAll(".ftm-tab")
                .forEach((button) => button.classList.toggle("active", button === el));
            modal
                .querySelectorAll(".ftm-panel")
                .forEach((panel) =>
                    panel.classList.toggle("active", panel.dataset.panel === el.dataset.tab),
                );
        },
        "pick-media": (el) => pickMedia(el.dataset.path, el.dataset.title),
        "pick-icon": (el) => iconPicker.open((selected) => updateField(el.dataset.path, selected)),
        move: (el) => {
            const listPath = el.dataset.list;
            const items = getByPath(state, listPath);
            const from = Number(el.dataset.index);
            const to = from + Number(el.dataset.offset);
            if (to < 0 || to >= items.length) return;
            items.splice(to, 0, items.splice(from, 1)[0]);
            render();
            revealItem(`${listPath}.${to}`);
        },
        remove: (el) => {
            getByPath(state, el.dataset.list).splice(Number(el.dataset.index), 1);
            render();
        },
        "add-section": () => {
            if (state.sections.length >= MAX_SECTIONS) return;
            state.sections.push({ title: "Nueva sección", links: [] });
            render();
            const last = list.lastElementChild;
            if (last) last.scrollIntoView({ behavior: "smooth", block: "nearest" });
        },
        "add-link": (el) => {
            state.sections[Number(el.dataset.index)].links.push({
                label: "Nuevo enlace",
                href: "#",
                icon: "",
                isText: false,
            });
            render();
        },
    };

    const syncBound = (event) => {
        const path = event.target.dataset ? event.target.dataset.bind : null;
        if (!path) return;
        setByPath(
            state,
            path,
            event.target.type === "checkbox" ? event.target.checked : event.target.value,
        );
        hydrate();
    };

    modal.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-action]");
        if (!trigger || trigger.disabled) return;
        const handler = actions[trigger.dataset.action];
        if (handler) handler(trigger);
    });

    modal.addEventListener("input", syncBound);

    modal.addEventListener("change", (event) => {
        if (event.target.matches("[data-restore]")) restoreFrom(event.target);
        else syncBound(event);
    });

    overlay.addEventListener("mousedown", (event) => {
        if (event.target === overlay) close();
    });

    render();
}