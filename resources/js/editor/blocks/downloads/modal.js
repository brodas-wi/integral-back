import { openMediaPicker } from "@/editor/media-picker";
import {
    COMPONENT_TYPE,
    DEFAULT_FILE,
    LAYOUTS,
    applyConfig,
    escapeHtml as esc,
    normalizeConfig,
    readConfig,
} from "./core.js";

const MODAL_ID = "dlm-modal";
const STYLE_ID = "dlm-styles";

const LAYOUT_LABELS = {
    list: "Lista (subtítulos siempre visibles)",
    accordion: "Acordeón (grupos desplegables)",
};

const MODAL_CSS = `
.dlm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
.dlm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
.dlm-header{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
.dlm-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
.dlm-header h2 i{color:#003B71;}
.dlm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:9999px;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
.dlm-close:hover{background:#f1f5f9;color:#475569;}
.dlm-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
.dlm-tab{padding-top:0.75rem;padding-right:1rem;padding-bottom:0.75rem;padding-left:1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
.dlm-tab.active{color:#003B71;border-bottom-color:#003B71;}
.dlm-tab i{font-size:1rem;}
.dlm-body{flex:1;overflow-y:auto;padding-top:1.25rem;padding-right:1.25rem;padding-bottom:1.25rem;padding-left:1.25rem;display:flex;flex-direction:column;gap:0.75rem;background:#f8fafc;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
.dlm-body::-webkit-scrollbar{width:6px;}
.dlm-body::-webkit-scrollbar-track{background:transparent;}
.dlm-body::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
.dlm-panel{display:none;flex-direction:column;gap:0.75rem;}
.dlm-panel.active{display:flex;}
.dlm-list{display:flex;flex-direction:column;gap:0.75rem;}
.dlm-block{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding-top:1rem;padding-right:1rem;padding-bottom:1rem;padding-left:1rem;display:flex;flex-direction:column;gap:0.75rem;transition:box-shadow 0.2s ease,border-color 0.2s ease;}
.dlm-item{background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding-top:0.75rem;padding-right:0.75rem;padding-bottom:0.75rem;padding-left:0.75rem;display:flex;flex-direction:column;gap:0.625rem;transition:box-shadow 0.2s ease,border-color 0.2s ease;}
.dlm-items{display:flex;flex-direction:column;gap:0.625rem;}
.dlm-flash{border-color:#E97300;box-shadow:0 0 0 3px rgba(233,115,0,0.35);}
.dlm-head{display:flex;align-items:center;gap:0.5rem;}
.dlm-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
.dlm-name{font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;}
.dlm-item .dlm-name{font-size:0.8125rem;color:#475569;}
.dlm-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
.dlm-input{width:100%;padding-top:0.5rem;padding-right:0.75rem;padding-bottom:0.5rem;padding-left:0.75rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
.dlm-input:focus{border-color:#003B71;}
.dlm-row{display:flex;gap:0.75rem;align-items:flex-start;}
.dlm-grow{flex:1;min-width:0;}
.dlm-size{flex:0 0 7rem;min-width:0;}
.dlm-check{display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:#475569;cursor:pointer;}
.dlm-check input{width:1rem;height:1rem;margin:0;accent-color:#003B71;cursor:pointer;}
.dlm-hint{margin:0;font-size:0.75rem;color:#94a3b8;line-height:1.4;}
.dlm-tools{display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;margin-top:0.5rem;}
.dlm-pill{display:inline-flex;align-items:center;justify-content:center;gap:0.375rem;padding-top:0.4rem;padding-right:0.875rem;padding-bottom:0.4rem;padding-left:0.875rem;border:2px solid transparent;border-radius:9999px;font-size:0.75rem;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;transition:background 0.15s,color 0.15s,opacity 0.15s;align-self:flex-start;}
.dlm-pill-primary{background:#003B71;color:#fff;}
.dlm-pill-primary:hover{background:#002a52;}
.dlm-pill-outline{background:#fff;border-color:#003B71;color:#003B71;}
.dlm-pill-outline:hover{background:#003B71;color:#fff;}
.dlm-pill-soft{background:#fff;border-color:#003B71;color:#003B71;}
.dlm-pill-soft:hover{background:#003B71;color:#fff;}
.dlm-pill-teal{background:#fff;border-color:#0d9488;color:#0d9488;}
.dlm-pill-teal:hover{background:#0d9488;color:#fff;}
.dlm-pill-ghost{background:#fff;border-color:#e2e8f0;color:#475569;font-size:0.875rem;font-weight:500;}
.dlm-pill-ghost:hover{background:#f8fafc;}
.dlm-pill-save{background:#E97300;color:#fff;font-size:0.875rem;}
.dlm-pill-save:hover{background:#c96200;}
.dlm-pill-danger{background:#ef4444;color:#fff;font-size:0.875rem;}
.dlm-pill-danger:hover{background:#dc2626;}
.dlm-pill-lg{padding-top:0.5rem;padding-right:1.25rem;padding-bottom:0.5rem;padding-left:1.25rem;font-size:0.8125rem;}
.dlm-icon-btn{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:none;border-radius:9999px;background:transparent;color:#64748b;cursor:pointer;transition:background 0.15s,color 0.15s,opacity 0.15s;}
.dlm-icon-btn:hover{background:#e2e8f0;color:#003B71;}
.dlm-icon-btn:disabled{opacity:0.3;cursor:not-allowed;pointer-events:none;}
.dlm-icon-btn.dlm-danger{color:#ef4444;}
.dlm-icon-btn.dlm-danger:hover{background:#fef2f2;color:#ef4444;}
.dlm-footer{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;align-items:center;background:#fff;flex-shrink:0;flex-wrap:wrap;}
.dlm-footer-tools{display:flex;gap:0.5rem;margin-right:auto;}
.dlm-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
.dlm-confirm{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
.dlm-confirm-head{padding-top:1rem;padding-right:1.25rem;padding-bottom:0.75rem;padding-left:1.25rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
.dlm-confirm-head i{font-size:1.25rem;}
.dlm-confirm-head h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
.dlm-confirm-body{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;}
.dlm-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
.dlm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding-top:0.375rem;padding-right:0.75rem;padding-bottom:0.375rem;padding-left:0.75rem;background:#f1f5f9;border-radius:9999px;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
.dlm-confirm-foot{padding-top:0.75rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
`;

function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}

function formatSize(size) {
    if (typeof size === "number" && size > 0) {
        return size >= 1048576
            ? `${(size / 1048576).toFixed(2)} MB`
            : `${Math.max(1, Math.round(size / 1024))} KB`;
    }
    return typeof size === "string" ? size.trim() : "";
}

function mediaName(media) {
    const direct = media.filename || media.name;
    if (direct) return direct;
    const last = String(media.url || "").split("?")[0].split("/").pop();
    try {
        return decodeURIComponent(last);
    } catch {
        return last;
    }
}

function raiseMediaModal(attempts = 5) {
    const media = document.getElementById("media-modal");
    if (media) media.style.zIndex = "1000001";
    else if (attempts > 0) setTimeout(() => raiseMediaModal(attempts - 1), 50);
}

function moveButtons(prefix, idx, total) {
    return `
            <button type="button" class="dlm-icon-btn" data-action="${prefix}-up" title="Subir" ${idx === 0 ? "disabled" : ""}><i class="ri-arrow-up-line"></i></button>
            <button type="button" class="dlm-icon-btn" data-action="${prefix}-down" title="Bajar" ${idx === total - 1 ? "disabled" : ""}><i class="ri-arrow-down-line"></i></button>
            <button type="button" class="dlm-icon-btn dlm-danger" data-action="${prefix}-remove" title="Eliminar"><i class="ri-delete-bin-line"></i></button>`;
}

function fileHTML(file, gIdx, fIdx, total) {
    const base = `groups.${gIdx}.files.${fIdx}`;
    return `
    <div class="dlm-item" data-file="${fIdx}">
        <div class="dlm-head">
            <span class="dlm-name">Archivo ${fIdx + 1}</span>${moveButtons("file", fIdx, total)}
        </div>
        <div>
            <label class="dlm-label">Documento (URL)</label>
            <input class="dlm-input" placeholder="URL del documento" value="${esc(file.url)}" data-bind="${base}.url">
            <div class="dlm-tools">
                <button type="button" class="dlm-pill dlm-pill-primary" data-action="file-pick"><i class="ri-file-search-line"></i> Seleccionar documento</button>
            </div>
        </div>
        <div class="dlm-row">
            <div class="dlm-grow">
                <label class="dlm-label">Nombre del archivo</label>
                <input class="dlm-input" placeholder="Nombre_del_documento.pdf" value="${esc(file.name)}" data-bind="${base}.name">
            </div>
            <div class="dlm-size">
                <label class="dlm-label">Peso</label>
                <input class="dlm-input" placeholder="0.00 MB" value="${esc(file.size)}" data-bind="${base}.size">
            </div>
        </div>
        <label class="dlm-check"><input type="checkbox" ${file.newTab ? "checked" : ""} data-bind="${base}.newTab"> Abrir en nueva pestaña</label>
    </div>`;
}

function groupHTML(group, gIdx, total) {
    return `
    <div class="dlm-block" data-group="${gIdx}">
        <div class="dlm-head">
            <span class="dlm-num">${gIdx + 1}</span>
            <span class="dlm-name">Grupo ${gIdx + 1}</span>${moveButtons("group", gIdx, total)}
        </div>
        <div>
            <label class="dlm-label">Subtítulo del grupo</label>
            <input class="dlm-input" placeholder="Subtítulo del grupo" value="${esc(group.title)}" data-bind="groups.${gIdx}.title">
        </div>
        <label class="dlm-check"><input type="checkbox" ${group.open ? "checked" : ""} data-bind="groups.${gIdx}.open"> Abierto al cargar (solo en modo acordeón)</label>
        <div class="dlm-items">${group.files.map((file, fIdx) => fileHTML(file, gIdx, fIdx, group.files.length)).join("")}</div>
        <button type="button" class="dlm-pill dlm-pill-soft" data-action="file-add"><i class="ri-add-line"></i> Agregar archivo</button>
    </div>`;
}

function shellHTML(state) {
    const options = LAYOUTS.map(
        (value) => `<option value="${value}" ${value === state.layout ? "selected" : ""}>${LAYOUT_LABELS[value]}</option>`,
    ).join("");
    return `
    <div class="dlm-modal">
        <div class="dlm-header">
            <h2><i class="ri-download-cloud-2-line"></i> Configurar Descargas de Documentos</h2>
            <button type="button" class="dlm-close" data-action="close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="dlm-tabs">
            <button type="button" class="dlm-tab active" data-action="tab" data-tab="groups"><i class="ri-folder-open-line"></i> Documentos</button>
            <button type="button" class="dlm-tab" data-action="tab" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
        </div>
        <div class="dlm-body">
            <div class="dlm-panel active" data-panel="groups">
                <div class="dlm-list" data-groups></div>
                <button type="button" class="dlm-pill dlm-pill-primary dlm-pill-lg" data-action="group-add"><i class="ri-add-line"></i> Agregar grupo</button>
            </div>
            <div class="dlm-panel" data-panel="general">
                <div class="dlm-block">
                    <div>
                        <label class="dlm-label">Título de la sección</label>
                        <input class="dlm-input" value="${esc(state.title)}" data-bind="title">
                    </div>
                    <p class="dlm-hint">Si lo dejas vacío, se oculta el título y la línea naranja.</p>
                    <div>
                        <label class="dlm-label">Distribución de los grupos</label>
                        <select class="dlm-input" data-bind="layout">${options}</select>
                    </div>
                </div>
            </div>
        </div>
        <div class="dlm-footer">
            <button type="button" class="dlm-pill dlm-pill-ghost dlm-pill-lg" data-action="close">Cancelar</button>
            <div class="dlm-footer-tools">
                <button type="button" class="dlm-pill dlm-pill-outline dlm-pill-lg" data-action="backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <button type="button" class="dlm-pill dlm-pill-teal dlm-pill-lg" data-action="restore" title="Restaurar configuración desde JSON"><i class="ri-upload-2-line"></i> Restaurar</button>
                <input type="file" accept=".json,application/json" data-file-input="restore" style="display:none;">
            </div>
            <button type="button" class="dlm-pill dlm-pill-save dlm-pill-lg" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>
    </div>`;
}

function showDialog({ icon, color, title, body, filename, confirmText, danger, onConfirm }) {
    const dialog = document.createElement("div");
    dialog.className = "dlm-confirm-overlay";
    dialog.innerHTML = `
    <div class="dlm-confirm">
        <div class="dlm-confirm-head"><i class="${icon}" style="color:${color};"></i><h3>${esc(title)}</h3></div>
        <div class="dlm-confirm-body">
            ${body.map((line) => `<p>${esc(line)}</p>`).join("")}
            ${filename ? `<span class="dlm-filename"><i class="ri-file-code-line"></i>${esc(filename)}</span>` : ""}
        </div>
        <div class="dlm-confirm-foot">
            ${onConfirm ? `<button type="button" class="dlm-pill dlm-pill-ghost dlm-pill-lg" data-dialog="cancel">Cancelar</button>` : ""}
            <button type="button" class="dlm-pill ${danger ? "dlm-pill-danger" : "dlm-pill-save"} dlm-pill-lg" data-dialog="ok">${esc(confirmText)}</button>
        </div>
    </div>`;
    document.body.appendChild(dialog);
    dialog.addEventListener("click", (event) => {
        const action = event.target.closest("[data-dialog]")?.dataset.dialog;
        if (!action) return;
        dialog.remove();
        if (action === "ok") onConfirm?.();
    });
}

function setPath(target, path, value) {
    const keys = path.split(".");
    const last = keys.pop();
    const holder = keys.reduce((node, key) => node?.[key], target);
    if (holder && typeof holder === "object") holder[last] = value;
}

function swap(list, idx, direction) {
    const target = idx + direction;
    if (target < 0 || target >= list.length) return -1;
    [list[idx], list[target]] = [list[target], list[idx]];
    return target;
}

function showDownloadsModal(editor, component) {
    document.getElementById(MODAL_ID)?.remove();
    ensureStyles();

    const state = readConfig(component);

    const overlay = document.createElement("div");
    overlay.id = MODAL_ID;
    overlay.className = "dlm-overlay";
    overlay.innerHTML = shellHTML(state);
    document.body.appendChild(overlay);

    const list = overlay.querySelector("[data-groups]");
    const fileInput = overlay.querySelector("[data-file-input='restore']");

    const groupOf = (el) => Number(el.closest("[data-group]").dataset.group);
    const fileOf = (el) => Number(el.closest("[data-file]").dataset.file);

    const renderGroups = () => {
        list.innerHTML = state.groups
            .map((group, idx) => groupHTML(group, idx, state.groups.length))
            .join("");
    };

    const flash = (gIdx, fIdx) => {
        const group = list.querySelector(`[data-group="${gIdx}"]`);
        const el = fIdx === undefined ? group : group?.querySelector(`[data-file="${fIdx}"]`);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("dlm-flash");
        setTimeout(() => el.classList.remove("dlm-flash"), 1000);
    };

    const syncFile = (gIdx, fIdx) => {
        const el = list.querySelector(`[data-group="${gIdx}"] [data-file="${fIdx}"]`);
        if (!el) return;
        const file = state.groups[gIdx].files[fIdx];
        ["url", "name", "size"].forEach((field) => {
            el.querySelector(`[data-bind$=".${field}"]`).value = file[field];
        });
    };

    const close = () => overlay.remove();

    const pickDocument = (el) => {
        const gIdx = groupOf(el);
        const fIdx = fileOf(el);
        const file = state.groups[gIdx].files[fIdx];
        openMediaPicker({
            type: "document",
            title: "Seleccionar documento",
            fullMedia: true,
            onSelect: (media) => {
                file.url = media.url;
                file.name = mediaName(media);
                file.size = formatSize(media.size);
                syncFile(gIdx, fIdx);
            },
        });
        raiseMediaModal();
    };

    const moveGroup = (el, direction) => {
        const target = swap(state.groups, groupOf(el), direction);
        if (target < 0) return;
        renderGroups();
        flash(target);
    };

    const moveFile = (el, direction) => {
        const gIdx = groupOf(el);
        const target = swap(state.groups[gIdx].files, fileOf(el), direction);
        if (target < 0) return;
        renderGroups();
        flash(gIdx, target);
    };

    const download = () => {
        const blob = new Blob([JSON.stringify(normalizeConfig(state), null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        const link = document.createElement("a");
        link.href = url;
        link.download = `downloads-backup-${stamp}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const actions = {
        close,
        save() {
            applyConfig(editor, component, normalizeConfig(state));
            close();
        },
        tab(el) {
            overlay.querySelectorAll("[data-tab]").forEach((btn) => btn.classList.toggle("active", btn === el));
            overlay.querySelectorAll("[data-panel]").forEach((panel) =>
                panel.classList.toggle("active", panel.dataset.panel === el.dataset.tab),
            );
        },
        "group-add"() {
            state.groups.push({ title: "Nuevo grupo", open: false, files: [{ ...DEFAULT_FILE }] });
            renderGroups();
            flash(state.groups.length - 1);
        },
        "group-remove"(el) {
            state.groups.splice(groupOf(el), 1);
            renderGroups();
        },
        "group-up": (el) => moveGroup(el, -1),
        "group-down": (el) => moveGroup(el, 1),
        "file-add"(el) {
            const gIdx = groupOf(el);
            state.groups[gIdx].files.push({ ...DEFAULT_FILE });
            renderGroups();
            flash(gIdx, state.groups[gIdx].files.length - 1);
        },
        "file-remove"(el) {
            state.groups[groupOf(el)].files.splice(fileOf(el), 1);
            renderGroups();
        },
        "file-up": (el) => moveFile(el, -1),
        "file-down": (el) => moveFile(el, 1),
        "file-pick": pickDocument,
        backup: download,
        restore: () => fileInput.click(),
    };

    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) return close();
        const el = event.target.closest("[data-action]");
        if (!el || el.disabled) return;
        actions[el.dataset.action]?.(el);
    });

    overlay.addEventListener("input", (event) => {
        const target = event.target;
        const path = target.dataset?.bind;
        if (!path) return;
        setPath(state, path, target.type === "checkbox" ? target.checked : target.value);
    });

    fileInput.addEventListener("change", () => {
        const file = fileInput.files?.[0];
        fileInput.value = "";
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            let parsed;
            try {
                parsed = JSON.parse(reader.result);
            } catch {
                showDialog({
                    icon: "ri-error-warning-line",
                    color: "#ef4444",
                    title: "Archivo inválido",
                    body: ["El archivo seleccionado no es un JSON válido."],
                    confirmText: "Cerrar",
                    danger: true,
                });
                return;
            }
            showDialog({
                icon: "ri-refresh-line",
                color: "#E97300",
                title: "Restaurar configuración",
                body: [
                    "¿Deseas restaurar la configuración de esta sección desde el archivo de respaldo?",
                    "Esta acción reemplazará la configuración actual del formulario.",
                ],
                filename: file.name,
                confirmText: "Sí, restaurar",
                onConfirm() {
                    Object.assign(state, normalizeConfig(parsed));
                    overlay.querySelector("[data-bind='title']").value = state.title;
                    overlay.querySelector("[data-bind='layout']").value = state.layout;
                    renderGroups();
                },
            });
        };
        reader.readAsText(file);
    });

    renderGroups();
}

export function registerDownloadsModal(editor) {
    editor.Commands.add("open-downloads-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected?.get("type") === COMPONENT_TYPE) showDownloadsModal(ed, selected);
        },
    });
}