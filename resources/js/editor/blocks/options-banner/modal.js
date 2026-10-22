import { openMediaPicker } from "@/editor/media-picker";
import { MAX_CARDS, applyConfig, clone, esc, mergeData, readConfig } from "./core";

const CSS = `
.obm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);}
.obm-modal{display:flex;flex-direction:column;width:100%;max-width:720px;max-height:92vh;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.15);color:#1e293b;font-family:'Inter',sans-serif;}
.obm-modal *{box-sizing:border-box;}
.obm-modal,.obm-modal *{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
.obm-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;}
.obm-header h2{display:flex;align-items:center;gap:0.5rem;margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.obm-header h2 i{color:#3b82f6;}
.obm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-size:1.125rem;cursor:pointer;}
.obm-close:hover{background:#f1f5f9;color:#475569;}
.obm-tabs{display:flex;flex-wrap:wrap;gap:0.25rem;flex-shrink:0;padding:0.5rem 1rem;border-bottom:1px solid #e2e8f0;}
.obm-tab{display:flex;align-items:center;gap:0.375rem;padding:0.4375rem 0.75rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-family:inherit;font-size:0.8125rem;font-weight:500;cursor:pointer;}
.obm-tab:hover{background:#f1f5f9;}
.obm-tab.active{background:#e8f0f8;color:#003B71;}
.obm-body{flex:1;padding:1.25rem;overflow-y:auto;background:#f8fafc;}
.obm-panel{display:none;flex-direction:column;gap:1rem;}
.obm-panel.active{display:flex;}
.obm-card{display:flex;flex-direction:column;gap:0.75rem;padding:1rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;}
.obm-label{display:block;margin-bottom:0.375rem;font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;}
.obm-row{display:flex;align-items:center;gap:0.75rem;}
.obm-grow{flex:1;min-width:0;}
.obm-input{width:100%;min-width:0;padding:0.5rem 1rem;border:1px solid #e2e8f0;border-radius:9999px;background:#f8fafc;color:#1e293b;font-family:inherit;font-size:0.875rem;outline:none;}
.obm-input:focus{border-color:#003B71;}
.obm-preview{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:64px;height:64px;overflow:hidden;border:1px solid #e2e8f0;border-radius:0.5rem;background:#f1f5f9;color:#94a3b8;font-size:1.5rem;}
.obm-preview img{width:100%;height:100%;object-fit:cover;}
.obm-pick{display:flex;align-items:center;gap:0.25rem;flex-shrink:0;padding:0.4rem 1rem;border:0;border-radius:9999px;background:#003B71;color:#fff;font-family:inherit;font-size:0.75rem;font-weight:600;white-space:nowrap;cursor:pointer;}
.obm-pick:hover{background:#002a52;}
.obm-num{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;font-size:0.7rem;font-weight:700;color:#fff;}
.obm-icon-btn{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:1.75rem;height:1.75rem;padding:0;border:0;border-radius:9999px;background:transparent;color:#64748b;font-size:1.125rem;cursor:pointer;}
.obm-icon-btn:hover:not(:disabled){background:#e2e8f0;color:#1e293b;}
.obm-icon-btn:disabled{opacity:0.3;cursor:not-allowed;}
.obm-icon-btn.obm-danger{color:#ef4444;}
.obm-icon-btn.obm-danger:hover:not(:disabled){background:#fef2f2;}
.obm-add{align-self:flex-start;display:flex;align-items:center;gap:0.375rem;padding:0.5rem 1.25rem;border:0;border-radius:9999px;background:#003B71;color:#fff;font-family:inherit;font-size:0.8125rem;font-weight:600;cursor:pointer;}
.obm-add:hover:not(:disabled){background:#002a52;}
.obm-add:disabled{opacity:0.4;cursor:not-allowed;}
.obm-list{display:flex;flex-direction:column;gap:0.75rem;}
@keyframes obm-flash{0%{box-shadow:0 0 0 3px rgba(233,115,0,0.55);}100%{box-shadow:0 0 0 3px rgba(233,115,0,0);}}
.obm-flash{animation:obm-flash 1.2s ease-out;}
.obm-footer{display:flex;align-items:center;justify-content:flex-end;gap:0.75rem;flex-shrink:0;padding:1rem 1.25rem;background:#fff;border-top:1px solid #f1f5f9;}
.obm-group{display:flex;gap:0.5rem;margin-right:auto;}
.obm-cancel{padding:0.5rem 1.25rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;}
.obm-cancel:hover{background:#f8fafc;}
.obm-save{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1.25rem;border:0;border-radius:9999px;background:#E97300;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;}
.obm-save:hover{background:#c96200;}
.obm-backup,.obm-restore{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;border:2px solid #003B71;border-radius:9999px;background:#fff;color:#003B71;font-family:inherit;font-size:0.8125rem;font-weight:600;cursor:pointer;user-select:none;}
.obm-backup:hover{background:#003B71;color:#fff;}
.obm-restore{border-color:#0d9488;color:#0d9488;}
.obm-restore:hover{background:#0d9488;color:#fff;}
.obm-confirm{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.55);}
.obm-confirm-box{width:100%;max-width:420px;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;font-family:'Inter',sans-serif;}
.obm-confirm-box h3{margin:0;padding:1rem 1.25rem 0.5rem;font-size:0.9375rem;font-weight:700;color:#0f172a;}
.obm-confirm-box p{margin:0;padding:0 1.25rem 1rem;font-size:0.875rem;line-height:1.5;color:#475569;}
.obm-confirm-actions{display:flex;justify-content:flex-end;gap:0.625rem;padding:0.75rem 1.25rem 1rem;background:#f8fafc;border-top:1px solid #f1f5f9;}
.obm-confirm-actions button{padding:0.5rem 1.125rem;border:0;border-radius:9999px;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;}
`;

const TABS = [
    { id: "general", icon: "ri-settings-3-line", label: "General" },
    { id: "cards", icon: "ri-layout-grid-line", label: "Tarjetas" },
];

const getByPath = (source, path) =>
    path.split(".").reduce((node, key) => (node == null ? undefined : node[key]), source);

const setByPath = (source, path, value) => {
    const keys = path.split(".");
    const last = keys.pop();
    keys.reduce((node, key) => node[key], source)[last] = value;
};

const input = (bind, placeholder = "", className = "") =>
    `<input type="text" class="obm-input ${className}" data-bind="${bind}" placeholder="${esc(placeholder)}">`;

const field = (label, content) => `<div><label class="obm-label">${label}</label>${content}</div>`;

const mediaRow = (bind, title) =>
    `<div class="obm-row"><div class="obm-preview" data-img-preview="${bind}"><i class="ri-image-line"></i></div>${input(bind, "URL de la imagen", "obm-grow")}<button type="button" class="obm-pick" data-action="pick" data-path="${bind}" data-title="${esc(title)}"><i class="ri-image-line"></i> Seleccionar</button></div>`;

const iconButton = (action, index, offset, icon, title, disabled, danger = false) =>
    `<button type="button" class="obm-icon-btn${danger ? " obm-danger" : ""}" data-action="${action}" data-index="${index}" data-offset="${offset}" title="${title}" ${disabled ? "disabled" : ""}><i class="${icon}"></i></button>`;

const cardItem = (_, index, all) => `
<div class="obm-card" data-item="cards.${index}">
    <div class="obm-row">
        <span class="obm-num">${index + 1}</span>
        <span class="obm-grow" style="font-size:0.875rem;font-weight:600;">Tarjeta ${index + 1}</span>
        ${iconButton("move", index, -1, "ri-arrow-up-s-line", "Subir", index === 0)}
        ${iconButton("move", index, 1, "ri-arrow-down-s-line", "Bajar", index === all.length - 1)}
        ${iconButton("remove", index, 0, "ri-delete-bin-line", "Eliminar", all.length <= 1, true)}
    </div>
    ${field("Imagen", mediaRow(`cards.${index}.image`, "Seleccionar imagen de tarjeta"))}
    ${field("Etiqueta (badge)", input(`cards.${index}.badge`, "Seguro de Salud"))}
    ${field("Descripción", input(`cards.${index}.desc`, "Descripción breve"))}
</div>`;

const shell = () => `
<div class="obm-header"><h2><i class="ri-shield-check-line"></i> Configurar Banner de Opciones</h2><button type="button" class="obm-close" data-action="close"><i class="ri-close-line"></i></button></div>
<div class="obm-tabs">${TABS.map((tab, i) => `<button type="button" class="obm-tab${i === 0 ? " active" : ""}" data-action="tab" data-tab="${tab.id}"><i class="${tab.icon}"></i> ${tab.label}</button>`).join("")}</div>
<div class="obm-body">
    <div class="obm-panel active" data-panel="general">
        <div class="obm-card">${field("Título", input("title"))}</div>
        <div class="obm-card">${field("Subtítulo", input("subtitle"))}</div>
        <div class="obm-card"><label class="obm-label">Botón CTA</label>${input("button_label", "Solicitar información")}${input("button_href", "URL o #")}</div>
        <div class="obm-card">${field("Ícono o imagen, esquina superior derecha (opcional)", mediaRow("icon_url", "Seleccionar ícono"))}</div>
    </div>
    <div class="obm-panel" data-panel="cards">
        <div class="obm-list" data-list></div>
        <button type="button" class="obm-add" data-action="add"><i class="ri-add-line"></i> Agregar tarjeta</button>
    </div>
</div>
<div class="obm-footer">
    <div class="obm-group">
        <button type="button" class="obm-backup" data-action="backup"><i class="ri-download-2-line"></i> Respaldar</button>
        <label class="obm-restore"><i class="ri-upload-2-line"></i> Restaurar<input type="file" accept=".json,application/json" data-restore hidden></label>
    </div>
    <button type="button" class="obm-cancel" data-action="close">Cancelar</button>
    <button type="button" class="obm-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;

function ensureStyles() {
    if (document.getElementById("obm-styles")) return;
    const style = document.createElement("style");
    style.id = "obm-styles";
    style.textContent = CSS;
    document.head.appendChild(style);
}

function confirmDialog(title, message, confirmLabel, showCancel = true) {
    return new Promise((resolve) => {
        const el = document.createElement("div");
        el.className = "obm-confirm";
        el.innerHTML = `<div class="obm-confirm-box"><h3>${esc(title)}</h3><p>${esc(message)}</p><div class="obm-confirm-actions">${showCancel ? '<button type="button" data-no style="background:#fff;border:2px solid #e2e8f0;color:#475569;">Cancelar</button>' : ""}<button type="button" data-yes style="background:#E97300;color:#fff;">${esc(confirmLabel)}</button></div></div>`;
        const done = (value) => {
            el.remove();
            resolve(value);
        };
        el.querySelector("[data-yes]").onclick = () => done(true);
        const no = el.querySelector("[data-no]");
        if (no) no.onclick = () => done(false);
        document.body.appendChild(el);
    });
}

export function showOptionsBannerModal(editor, component) {
    ensureStyles();
    document.getElementById("ob-config-modal")?.remove();

    let state = mergeData(readConfig(component));

    const overlay = document.createElement("div");
    overlay.id = "ob-config-modal";
    overlay.className = "obm-overlay";
    const modal = document.createElement("div");
    modal.className = "obm-modal";
    modal.innerHTML = shell();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const list = modal.querySelector("[data-list]");

    const syncPreviews = () =>
        modal.querySelectorAll("[data-img-preview]").forEach((el) => {
            const url = getByPath(state, el.dataset.imgPreview);
            el.innerHTML = url ? `<img src="${esc(url)}" alt="">` : '<i class="ri-image-line"></i>';
        });

    const hydrate = () => {
        modal.querySelectorAll("[data-bind]").forEach((el) => {
            const value = getByPath(state, el.dataset.bind) ?? "";
            if (el.value !== String(value)) el.value = value;
        });
        modal.querySelector('[data-action="add"]').disabled = state.cards.length >= MAX_CARDS;
        syncPreviews();
    };

    const render = () => {
        list.innerHTML = state.cards.map(cardItem).join("");
        hydrate();
    };

    const reveal = (path) =>
        requestAnimationFrame(() => {
            const target = modal.querySelector(`[data-item="${path}"]`);
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth", block: "center" });
            target.classList.remove("obm-flash");
            void target.offsetWidth;
            target.classList.add("obm-flash");
        });

    const pick = (path, title) => {
        try {
            openMediaPicker({
                type: "image",
                title,
                onSelect: (url) => {
                    setByPath(state, path, url);
                    hydrate();
                },
            });
        } catch (error) {
            console.error("[OptionsBanner] No se pudo abrir el selector de medios:", error);
            return;
        }
        document.getElementById("media-modal")?.style.setProperty("z-index", "1000001", "important");
    };

    const restore = async (fileInput) => {
        const file = fileInput.files?.[0];
        fileInput.value = "";
        if (!file) return;

        let parsed = null;
        try {
            parsed = JSON.parse(await file.text());
        } catch {
            parsed = null;
        }

        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            await confirmDialog("Archivo inválido", "El archivo seleccionado no es un JSON válido.", "Cerrar", false);
            return;
        }

        const ok = await confirmDialog(
            "Restaurar configuración",
            `Se reemplazará la configuración del formulario con la de «${file.name}». Los cambios se aplican al banner cuando pulses «Aplicar cambios».`,
            "Sí, restaurar",
        );
        if (!ok) return;

        state = mergeData(parsed);
        render();
    };

    const close = () => overlay.remove();

    const actions = {
        close,
        save: () => {
            applyConfig(editor, component, state);
            close();
        },
        tab: (el) => {
            modal.querySelectorAll(".obm-tab").forEach((tab) => tab.classList.toggle("active", tab === el));
            modal
                .querySelectorAll(".obm-panel")
                .forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === el.dataset.tab));
        },
        pick: (el) => pick(el.dataset.path, el.dataset.title),
        add: () => {
            if (state.cards.length >= MAX_CARDS) return;
            state.cards.push({ image: "", badge: "Nueva opción", desc: "Descripción breve." });
            render();
            reveal(`cards.${state.cards.length - 1}`);
        },
        remove: (el) => {
            state.cards.splice(Number(el.dataset.index), 1);
            render();
        },
        move: (el) => {
            const from = Number(el.dataset.index);
            const to = from + Number(el.dataset.offset);
            if (to < 0 || to >= state.cards.length) return;
            state.cards.splice(to, 0, state.cards.splice(from, 1)[0]);
            render();
            reveal(`cards.${to}`);
        },
        backup: () => {
            const blob = new Blob([JSON.stringify(clone(state), null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
            const link = document.createElement("a");
            link.href = url;
            link.download = `options-banner-backup-${stamp}.json`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        },
    };

    modal.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-action]");
        if (!trigger || trigger.disabled) return;
        actions[trigger.dataset.action]?.(trigger);
    });

    const sync = (event) => {
        const path = event.target.dataset?.bind;
        if (!path) return;
        setByPath(state, path, event.target.value);
        syncPreviews();
    };

    modal.addEventListener("input", sync);
    modal.addEventListener("change", (event) => {
        if (event.target.matches("[data-restore]")) restore(event.target);
        else sync(event);
    });

    overlay.addEventListener("mousedown", (event) => {
        if (event.target === overlay) close();
    });

    render();
}