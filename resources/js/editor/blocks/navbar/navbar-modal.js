import { openMediaPicker } from "@/editor/media-picker";
import { IconPickerModal } from "@/editor/components/icon-picker-modal";
import { MAX_BOTTOM_BUTTONS, MAX_CTA_BUTTONS, MAX_SUBMENU_COLUMNS, mergeNavbarData } from "./navbar-defaults";
import { applyNavbarConfig, readNavbarConfig } from "./navbar-template";
import { attachUrlAutocomplete } from "./navbar-url-autocomplete";
import { ensureModalStyles } from "./navbar-modal-styles";
import { clone, escapeHtml, getByPath, setByPath } from "./navbar-utils";

const TABS = [
    { id: "logo", icon: "ri-image-line", label: "Logo" },
    { id: "top-actions", icon: "ri-links-line", label: "Acciones superiores" },
    { id: "top-button", icon: "ri-cursor-line", label: "Botón superior" },
    { id: "nav", icon: "ri-menu-line", label: "Navegación" },
    { id: "bottom-buttons", icon: "ri-bank-card-line", label: "Botones inferiores" },
    { id: "icon-btn", icon: "ri-search-line", label: "Botón icono" },
];

const newItem = () => ({ label: "Nuevo item", desc: "", href: "#" });
const newColumn = () => ({ badge: "Nueva columna", badge_color: "blue", items: [newItem()] });
const newSubmenu = () => ({
    type: "submenu",
    label: "Nuevo menú",
    columns: [newColumn()],
    cta_column: { text: "", buttons: [] },
});

const card = (content) => `<div class="nb-card">${content}</div>`;

const field = (label, content) =>
    `<div class="nb-field"><label class="nb-label">${label}</label>${content}</div>`;

const textInput = (bind, placeholder = "") =>
    `<input type="text" class="nb-input" data-bind="${bind}" placeholder="${escapeHtml(placeholder)}">`;

const smallInput = (bind, placeholder = "", className = "") =>
    `<input type="text" class="nb-input-sm ${className}" data-bind="${bind}" placeholder="${escapeHtml(placeholder)}">`;

const urlInput = (bind, placeholder = "URL o buscar página...", small = false) =>
    `<input type="text" class="${small ? "nb-input-sm" : "nb-input"} nb-url-input" data-bind="${bind}" placeholder="${escapeHtml(placeholder)}">`;

const removeBtn = (list, index) =>
    `<button type="button" class="nb-btn-remove" data-action="remove" data-list="${list}" data-index="${index}"><i class="ri-delete-bin-line"></i></button>`;

const addBtn = (action, label, className, attrs = "") =>
    `<button type="button" class="nb-btn-add ${className}" data-action="${action}" ${attrs}><i class="ri-add-line"></i> ${label}</button>`;

const COLOR_LABELS = { blue: "Azul", white: "Blanco", orange: "Naranja" };
const BUTTON_COLORS = ["blue", "white", "orange"];

const colorToggle = (bind, fallback, small = false, options = ["blue", "orange"]) =>
    `<div class="nb-color-toggle${small ? " nb-small" : ""}" data-color-group data-default="${fallback}">${options
        .map(
            (value) =>
                `<button type="button" class="nb-color-opt nb-color-opt-${value}" data-action="set-color" data-path="${bind}" data-value="${value}">${COLOR_LABELS[value]}</button>`,
        )
        .join("")}</div>`;

const iconRow = (bind) =>
    `<div class="nb-row"><div class="nb-icon-preview"><i data-icon-preview="${bind}"></i></div><input type="text" class="nb-input-sm nb-grow" data-bind="${bind}" placeholder="Sin icono (opcional)"><button type="button" class="nb-pick-btn" data-action="pick-icon" data-path="${bind}"><i class="ri-emotion-happy-line"></i> Icono</button></div>`;

const mediaField = (bind, title, placeholder) =>
    `<div class="nb-row"><div class="nb-img-preview" data-img-preview="${bind}"></div>${textInput(bind, placeholder)}<button type="button" class="nb-pick-btn" data-action="pick-media" data-path="${bind}" data-title="${escapeHtml(title)}"><i class="ri-image-line"></i> Seleccionar</button></div>`;

const topActionCard = (action, index) => {
    const path = `top_actions.${index}`;
    return `<div class="nb-action-card" data-drag-idx="${index}">
<div class="nb-row"><span class="nb-drag-handle"><i class="ri-draggable"></i></span>${smallInput(`${path}.label`, "Texto del botón", "nb-grow")}${removeBtn("top_actions", index)}</div>
${urlInput(`${path}.href`, undefined, true)}
${iconRow(`${path}.icon`)}
<label class="nb-check"><input type="checkbox" data-bind="${path}.show_icon"> Mostrar icono en el botón</label>
</div>`;
};

const bottomButtonCard = (button, index) => {
    const path = `bottom_buttons.${index}`;
    return `<div class="nb-action-card" data-drag-idx="${index}">
<div class="nb-row"><span class="nb-drag-handle"><i class="ri-draggable"></i></span>${smallInput(`${path}.label`, "Texto del botón", "nb-grow")}${removeBtn("bottom_buttons", index)}</div>
${urlInput(`${path}.href`, undefined, true)}
<div class="nb-row"><span class="nb-col-title">Estilo</span>${colorToggle(`${path}.color`, "orange", false, BUTTON_COLORS)}</div>
</div>`;
};

const columnCard = (column, columnIndex, itemPath) => {
    const path = `${itemPath}.columns.${columnIndex}`;
    const items = (column.items || [])
        .map((item, itemIndex) => {
            const itemBind = `${path}.items.${itemIndex}`;
            return `<div class="nb-col-item"><div class="nb-row">${smallInput(`${itemBind}.label`, "Título del item", "nb-grow")}${removeBtn(`${path}.items`, itemIndex)}</div>${smallInput(`${itemBind}.desc`, "Descripción (opcional)")}${urlInput(`${itemBind}.href`, "URL", true)}</div>`;
        })
        .join("");
    return `<div class="nb-col-card">
<div class="nb-row"><span class="nb-col-title">Columna ${columnIndex + 1}</span>${smallInput(`${path}.badge`, "Badge (ej: Tus ahorros)", "nb-grow")}${colorToggle(`${path}.badge_color`, "blue", true)}${removeBtn(`${itemPath}.columns`, columnIndex)}</div>
<div class="nb-col-items">${items}</div>
<div class="nb-add-row">${addBtn("add-item", "Agregar item", "nb-btn-add-item", `data-list="${path}.items"`)}</div>
</div>`;
};

const ctaButtonCard = (button, buttonIndex, itemPath) => {
    const path = `${itemPath}.cta_column.buttons.${buttonIndex}`;
    return `<div class="nb-action-card">
<div class="nb-row"><span class="nb-col-title nb-cta-title">Botón ${buttonIndex + 1}</span>${smallInput(`${path}.label`, "Texto del botón", "nb-grow")}${removeBtn(`${itemPath}.cta_column.buttons`, buttonIndex)}</div>
${urlInput(`${path}.href`, "URL del botón", true)}
${iconRow(`${path}.icon`)}
<div class="nb-row"><span class="nb-col-title nb-cta-title">Color</span>${colorToggle(`${path}.color`, "orange")}</div>
</div>`;
};

const submenuBody = (item, path) => {
    const columns = (item.columns || []).map((column, index) => columnCard(column, index, path)).join("");
    const buttons = item.cta_column.buttons.map((button, index) => ctaButtonCard(button, index, path)).join("");
    const columnsFull = (item.columns || []).length >= MAX_SUBMENU_COLUMNS;
    const buttonsFull = item.cta_column.buttons.length >= MAX_CTA_BUTTONS;
    return `<div class="nb-link-card-body">
<div class="nb-section-title">Columnas del mega-menú (máx. ${MAX_SUBMENU_COLUMNS})</div>
<div class="nb-stack">${columns}</div>
<div class="nb-add-row">${addBtn("add-column", "Agregar columna", "nb-btn-add-col", `data-path="${path}" ${columnsFull ? "disabled" : ""}`)}</div>
<div class="nb-section-title">Columna CTA (opcional)</div>
<div class="nb-cta-section">
<div class="nb-row"><span class="nb-col-title nb-cta-title">Texto CTA</span>${smallInput(`${path}.cta_column.text`, "Texto alternado naranja/azul", "nb-grow")}</div>
<div class="nb-stack">${buttons}</div>
<div class="nb-add-row">${addBtn("add-cta-button", "Agregar botón", "nb-btn-add-action", `data-path="${path}" ${buttonsFull ? "disabled" : ""}`)}</div>
</div>
</div>`;
};

const navCard = (item, index) => {
    const path = `nav_links.${index}`;
    const submenu = item.type === "submenu";
    const badge = `<span class="nb-type-badge ${submenu ? "nb-type-submenu" : "nb-type-link"}" data-action="toggle-type" data-index="${index}" title="Clic para cambiar tipo">${submenu ? "Submenú" : "Link"} ↕</span>`;
    const header = `<div class="nb-link-card-header"><span class="nb-drag-handle"><i class="ri-draggable"></i></span>${badge}${smallInput(`${path}.label`, submenu ? "Título del menú" : "Texto del enlace", "nb-grow")}${removeBtn("nav_links", index)}</div>`;
    const body = submenu
        ? submenuBody(item, path)
        : `<div class="nb-link-card-body">${urlInput(`${path}.href`, undefined, true)}${iconRow(`${path}.icon`)}</div>`;
    return `<div class="nb-link-card" data-drag-idx="${index}">${header}${body}</div>`;
};

const buildPanels = () => ({
    logo:
        card(`<label class="nb-label">Imagen del logo</label>${mediaField("logo_url", "Seleccionar logo", "URL del logo")}`) +
        card(`<label class="nb-label">Enlace del logo</label>${urlInput("logo_href", "Ej: / o https://...")}`) +
        card(`<label class="nb-label">Texto alternativo / Logo de texto</label><div class="nb-row">${textInput("logo_alt", "Texto alternativo")}${textInput("logo_text", "Texto si no hay imagen")}</div>`),
    "top-actions": card(
        `<p class="nb-hint">Botones de la barra superior (Contáctanos, Agencias, etc.). Puedes reordenarlos arrastrando.</p><div class="nb-list" data-list-root="top_actions"></div><div class="nb-add-row">${addBtn("add-top-action", "Agregar acción", "nb-btn-add-action")}</div>`,
    ),
    "bottom-buttons": card(
        `<p class="nb-hint">Botones a la derecha de la barra inferior (Mi Banca Integral, etc.). Máximo ${MAX_BOTTOM_BUTTONS}. Puedes reordenarlos arrastrando.</p><div class="nb-list" data-list-root="bottom_buttons"></div><div class="nb-add-row">${addBtn("add-bottom-button", "Agregar botón", "nb-btn-add-action")}</div>`,
    ),
    nav: card(
        `<p class="nb-hint">Links de la barra inferior. Los submenús generan mega-menús con columnas.</p><div class="nb-list" data-list-root="nav_links"></div><div class="nb-add-row">${addBtn("add-link", "Agregar link", "nb-btn-add-link")}${addBtn("add-submenu", "Agregar submenú", "nb-btn-add-submenu")}</div>`,
    ),
    "top-button": card(
        `<label class="nb-label">Botón superior (Programa Surge)</label><div class="nb-stack">${field("Texto principal", textInput("top_button.label", "Programa Surge"))}${field("Subtexto (opcional)", textInput("top_button.sublabel", "Formación Empresarial"))}${field("URL", urlInput("top_button.href"))}${field("Estilo", colorToggle("top_button.color", "white", false, BUTTON_COLORS))}</div>`,
    ),
    "icon-btn":
        card(
            `<label class="nb-label">Botón de acción con icono</label><div class="nb-stack"><div class="nb-toggle-row"><div class="nb-toggle-text"><span class="nb-toggle-title">Mostrar botón de búsqueda</span><span class="nb-toggle-desc">Aparece en la barra superior y en la barra móvil</span></div><label class="nb-switch"><input type="checkbox" data-bind="icon_btn.enabled"><span class="nb-switch-track"></span></label></div>${field("Imagen del botón", mediaField("icon_btn.image_url", "Seleccionar imagen del botón de búsqueda", "URL de la imagen"))}${field("Icono (se usa si no hay imagen)", iconRow("icon_btn.icon"))}${field("Etiqueta (tooltip)", textInput("icon_btn.label", "Buscar"))}${field("URL", urlInput("icon_btn.href"))}</div>`,
        ) +
        card(
            `<label class="nb-label">Botón de menú (hamburguesa, solo móvil)</label><div class="nb-stack">${field("Imagen del botón", mediaField("menu_btn.image_url", "Seleccionar imagen del botón de menú", "URL de la imagen"))}${field("Icono (se usa si no hay imagen)", iconRow("menu_btn.icon"))}</div>`,
        ),
});

const buildShell = () => {
    const panels = buildPanels();
    const tabs = TABS.map(
        (tab, index) =>
            `<button type="button" class="nb-tab-btn${index === 0 ? " active" : ""}" data-action="tab" data-tab="${tab.id}"><i class="${tab.icon}"></i> ${tab.label}</button>`,
    ).join("");
    const bodies = TABS.map(
        (tab, index) =>
            `<div class="nb-tab-panel${index === 0 ? " active" : ""}" id="nb-panel-${tab.id}">${panels[tab.id]}</div>`,
    ).join("");

    return `<div class="nb-modal-header"><div class="nb-modal-header-left"><i class="ri-layout-top-line"></i><h2>Configurar Navbar</h2></div><button type="button" class="nb-modal-close" data-action="close"><i class="ri-close-line"></i></button></div>
<div class="nb-modal-tabs">${tabs}</div>
<div class="nb-modal-body">${bodies}</div>
<div class="nb-modal-footer">
<div class="nb-footer-group"><button type="button" class="nb-btn-backup" data-action="backup"><i class="ri-download-2-line"></i> Respaldar</button><label class="nb-btn-restore"><i class="ri-upload-2-line"></i> Restaurar<input type="file" accept=".json,application/json" data-restore hidden></label></div>
<button type="button" class="nb-btn-cancel" data-action="close">Cancelar</button>
<button type="button" class="nb-btn-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;
};

const trim = (value) => String(value ?? "").trim();

function buildPayload(state) {
    const data = clone(state);
    ["logo_url", "logo_alt", "logo_text"].forEach((key) => {
        data[key] = trim(data[key]);
    });
    data.logo_href = trim(data.logo_href) || "/";
    data.bottom_buttons = data.bottom_buttons.map((button) => ({
        label: trim(button.label),
        href: trim(button.href) || "#",
        color: BUTTON_COLORS.includes(button.color) ? button.color : "orange",
    }));
    data.top_button = {
        label: trim(data.top_button.label),
        sublabel: trim(data.top_button.sublabel),
        href: trim(data.top_button.href) || "#",
        color: BUTTON_COLORS.includes(data.top_button.color) ? data.top_button.color : "white",
    };
    data.icon_btn = {
        enabled: Boolean(data.icon_btn.enabled),
        icon: data.icon_btn.icon || "ri-search-line",
        image_url: trim(data.icon_btn.image_url),
        label: trim(data.icon_btn.label) || "Buscar",
        href: trim(data.icon_btn.href) || "#",
    };
    data.menu_btn = { image_url: trim(data.menu_btn.image_url), icon: trim(data.menu_btn.icon) };
    return data;
}

function downloadBackup(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
    const link = document.createElement("a");
    link.href = url;
    link.download = `navbar-backup-${stamp}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function confirmDialog({ icon, iconColor, title, message, detail, confirmLabel, confirmColor, showCancel = true }) {
    return new Promise((resolve) => {
        const element = document.createElement("div");
        element.className = "nb-confirm-overlay";
        element.innerHTML = `<div class="nb-confirm-modal"><div class="nb-confirm-header"><i class="${icon}" style="color:${iconColor};"></i><h3>${escapeHtml(title)}</h3></div><div class="nb-confirm-body"><p>${escapeHtml(message)}</p>${detail ? `<span class="nb-confirm-filename"><i class="ri-file-code-line"></i>${escapeHtml(detail)}</span>` : ""}</div><div class="nb-confirm-footer">${showCancel ? '<button type="button" class="nb-confirm-cancel">Cancelar</button>' : ""}<button type="button" class="nb-confirm-ok" style="background:${confirmColor};">${escapeHtml(confirmLabel)}</button></div></div>`;
        const finish = (value) => {
            element.remove();
            resolve(value);
        };
        element.querySelector(".nb-confirm-ok").onclick = () => finish(true);
        const cancel = element.querySelector(".nb-confirm-cancel");
        if (cancel) cancel.onclick = () => finish(false);
        document.body.appendChild(element);
    });
}

function enableSorting(list, getItems, rerender) {
    let from = null;
    const clearMarks = () =>
        list.querySelectorAll(".nb-drag-over").forEach((el) => el.classList.remove("nb-drag-over"));
    const cardOf = (event) =>
        event.target instanceof Element ? event.target.closest("[data-drag-idx]") : null;

    list.addEventListener("mousedown", (event) => {
        if (!(event.target instanceof Element) || !event.target.closest(".nb-drag-handle")) return;
        const card = cardOf(event);
        if (card) card.draggable = true;
    });

    list.addEventListener("dragstart", (event) => {
        const card = cardOf(event);
        if (!card || !card.draggable) return;
        from = Number(card.dataset.dragIdx);
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", String(from));
        requestAnimationFrame(() => card.classList.add("nb-dragging"));
    });

    list.addEventListener("dragover", (event) => {
        if (from === null) return;
        const card = cardOf(event);
        if (!card) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        clearMarks();
        if (Number(card.dataset.dragIdx) !== from) card.classList.add("nb-drag-over");
    });

    list.addEventListener("drop", (event) => {
        if (from === null) return;
        const card = cardOf(event);
        if (!card) return;
        event.preventDefault();
        const source = from;
        const target = Number(card.dataset.dragIdx);
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
        list.querySelectorAll(".nb-dragging").forEach((el) => {
            el.classList.remove("nb-dragging");
            el.draggable = false;
        });
    });
}

export function showNavbarModal(editor, component) {
    ensureModalStyles();
    const previous = document.getElementById("navbar-config-modal");
    if (previous) previous.remove();

    let state = mergeNavbarData(readNavbarConfig(component) || {});
    const iconPicker = new IconPickerModal();
    const cleanups = [];

    const overlay = document.createElement("div");
    overlay.id = "navbar-config-modal";
    overlay.className = "nb-overlay";
    const modal = document.createElement("div");
    modal.className = "nb-modal";
    modal.innerHTML = buildShell();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const lists = {
        top_actions: modal.querySelector('[data-list-root="top_actions"]'),
        nav_links: modal.querySelector('[data-list-root="nav_links"]'),
        bottom_buttons: modal.querySelector('[data-list-root="bottom_buttons"]'),
    };
    const renderers = {
        top_actions: topActionCard,
        nav_links: navCard,
        bottom_buttons: bottomButtonCard,
    };

    function syncPreviews() {
        modal.querySelectorAll("[data-img-preview]").forEach((el) => {
            const url = getByPath(state, el.dataset.imgPreview);
            el.innerHTML = url
                ? `<img src="${escapeHtml(url)}" alt="">`
                : '<i class="ri-image-line"></i>';
        });
        modal.querySelectorAll("[data-icon-preview]").forEach((el) => {
            el.className = trim(getByPath(state, el.dataset.iconPreview)) || "ri-star-line";
        });
    }

    function hydrate(scope) {
        scope.querySelectorAll("[data-bind]").forEach((input) => {
            const value = getByPath(state, input.dataset.bind);
            if (input.type === "checkbox") input.checked = Boolean(value);
            else input.value = value ?? "";
        });
        scope.querySelectorAll(".nb-url-input").forEach((input) => attachUrlAutocomplete(input));
        scope.querySelectorAll("[data-action='set-color']").forEach((button) => {
            const group = button.closest("[data-color-group]");
            const current = getByPath(state, button.dataset.path) || group.dataset.default;
            button.classList.toggle("nb-color-inactive", current !== button.dataset.value);
        });
        syncPreviews();
    }

    function renderList(name) {
        lists[name].innerHTML = state[name].map(renderers[name]).join("");
        hydrate(lists[name]);
        if (name === "bottom_buttons") {
            const add = modal.querySelector('[data-action="add-bottom-button"]');
            if (add) add.disabled = state.bottom_buttons.length >= MAX_BOTTOM_BUTTONS;
        }
    }

    function scrollToLast(name) {
        const last = lists[name].lastElementChild;
        if (last) last.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function updateField(path, value) {
        setByPath(state, path, value);
        const input = modal.querySelector(`[data-bind="${path}"]`);
        if (input) input.value = value;
        syncPreviews();
    }

    function pickMedia(path, title) {
        try {
            openMediaPicker({
                type: "image",
                title,
                onSelect: (url) => updateField(path, url),
            });
        } catch (error) {
            console.error("[Navbar] No se pudo abrir el selector de medios:", error);
            return;
        }

        const picker = document.getElementById("media-modal");
        if (picker) picker.style.setProperty("z-index", "1000001", "important");
    }

    async function restoreFrom(input) {
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
            message: "Se reemplazará la configuración actual del formulario con la del archivo de respaldo. Los cambios se aplican al navbar cuando pulses «Aplicar cambios».",
            detail: file.name,
            confirmLabel: "Sí, restaurar",
            confirmColor: "#E97300",
        });
        if (!accepted) return;

        state = mergeNavbarData(parsed);
        ["top_actions", "nav_links", "bottom_buttons"].forEach((name) => renderList(name));
        hydrate(modal);
    }

    const close = () => {
        cleanups.forEach((fn) => fn());
        iconPicker.close();
        overlay.remove();
    };

    const actions = {
        close,
        save: () => {
            applyNavbarConfig(editor, component, buildPayload(state));
            close();
        },
        backup: () => downloadBackup(buildPayload(state)),
        tab: (el) => {
            modal.querySelectorAll(".nb-tab-btn").forEach((button) => button.classList.toggle("active", button === el));
            modal
                .querySelectorAll(".nb-tab-panel")
                .forEach((panel) => panel.classList.toggle("active", panel.id === `nb-panel-${el.dataset.tab}`));
        },
        "pick-media": (el) => pickMedia(el.dataset.path, el.dataset.title),
        "pick-icon": (el) => iconPicker.open((selected) => updateField(el.dataset.path, selected)),
        "set-color": (el) => {
            setByPath(state, el.dataset.path, el.dataset.value);
            el.parentElement
                .querySelectorAll("[data-action='set-color']")
                .forEach((button) => button.classList.toggle("nb-color-inactive", button !== el));
        },
        remove: (el) => {
            getByPath(state, el.dataset.list).splice(Number(el.dataset.index), 1);
            renderList(el.dataset.list.split(".")[0]);
        },
        "add-top-action": () => {
            state.top_actions.push({ label: "Nueva acción", href: "#", icon: "ri-star-line", show_icon: false });
            renderList("top_actions");
            scrollToLast("top_actions");
        },
        "add-bottom-button": () => {
            if (state.bottom_buttons.length >= MAX_BOTTOM_BUTTONS) return;
            state.bottom_buttons.push({ label: "Nuevo botón", href: "#", color: "orange" });
            renderList("bottom_buttons");
            scrollToLast("bottom_buttons");
        },
        "add-link": () => {
            state.nav_links.push({ type: "link", label: "Nuevo enlace", href: "#", icon: "" });
            renderList("nav_links");
            scrollToLast("nav_links");
        },
        "add-submenu": () => {
            state.nav_links.push(newSubmenu());
            renderList("nav_links");
            scrollToLast("nav_links");
        },
        "toggle-type": (el) => {
            const item = state.nav_links[Number(el.dataset.index)];
            if (item.type === "submenu") {
                Object.assign(item, { type: "link", href: "#", icon: "" });
                delete item.columns;
                delete item.cta_column;
            } else {
                Object.assign(item, { type: "submenu", columns: [newColumn()], cta_column: { text: "", buttons: [] } });
                delete item.href;
                delete item.icon;
            }
            renderList("nav_links");
        },
        "add-column": (el) => {
            const item = getByPath(state, el.dataset.path);
            if (item.columns.length < MAX_SUBMENU_COLUMNS) item.columns.push(newColumn());
            renderList("nav_links");
        },
        "add-item": (el) => {
            getByPath(state, el.dataset.list).push(newItem());
            renderList("nav_links");
        },
        "add-cta-button": (el) => {
            const buttons = getByPath(state, `${el.dataset.path}.cta_column.buttons`);
            if (buttons.length < MAX_CTA_BUTTONS) {
                buttons.push({ label: "Nuevo botón", href: "#", color: "orange", icon: "" });
            }
            renderList("nav_links");
        },
    };

    const syncBound = (event) => {
        const path = event.target.dataset ? event.target.dataset.bind : null;
        if (!path) return;
        setByPath(state, path, event.target.type === "checkbox" ? event.target.checked : event.target.value);
        syncPreviews();
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

    modal.addEventListener("focusin", (event) => {
        const el = event.target;
        if (el.tagName === "INPUT" && el.type === "text" && !el.readOnly && !el.classList.contains("nb-url-input")) {
            el.select();
        }
    });

    overlay.addEventListener("mousedown", (event) => {
        if (event.target === overlay) close();
    });

    const resetDraggable = () =>
        modal.querySelectorAll("[draggable='true']").forEach((el) => {
            el.draggable = false;
        });
    document.addEventListener("mouseup", resetDraggable);
    cleanups.push(() => document.removeEventListener("mouseup", resetDraggable));

    enableSorting(lists.top_actions, () => state.top_actions, () => renderList("top_actions"));
    enableSorting(lists.nav_links, () => state.nav_links, () => renderList("nav_links"));
    enableSorting(lists.bottom_buttons, () => state.bottom_buttons, () => renderList("bottom_buttons"));

    ["top_actions", "nav_links", "bottom_buttons"].forEach((name) => renderList(name));
    hydrate(modal);
}