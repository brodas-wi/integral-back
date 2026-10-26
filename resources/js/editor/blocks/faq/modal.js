import {
    COMPONENT_TYPE,
    LINE_STYLES,
    applyConfig,
    escapeHtml as esc,
    normalizeConfig,
    readConfig,
} from "./core.js";

const MODAL_ID = "fqm-modal";
const STYLE_ID = "fqm-styles";

const LINE_LABELS = {
    text: "Ancho del texto",
    short: "Corta",
    full: "Ancho de la columna",
};

const MODAL_CSS = `
.fqm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
.fqm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
.fqm-header{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
.fqm-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
.fqm-header h2 i{color:#003B71;}
.fqm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:9999px;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
.fqm-close:hover{background:#f1f5f9;color:#475569;}
.fqm-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
.fqm-tab{padding-top:0.75rem;padding-right:1rem;padding-bottom:0.75rem;padding-left:1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
.fqm-tab.active{color:#003B71;border-bottom-color:#003B71;}
.fqm-tab i{font-size:1rem;}
.fqm-body{flex:1;overflow-y:auto;padding-top:1.25rem;padding-right:1.25rem;padding-bottom:1.25rem;padding-left:1.25rem;display:flex;flex-direction:column;gap:0.75rem;background:#f8fafc;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
.fqm-body::-webkit-scrollbar{width:6px;}
.fqm-body::-webkit-scrollbar-track{background:transparent;}
.fqm-body::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
.fqm-panel{display:none;flex-direction:column;gap:0.75rem;}
.fqm-panel.active{display:flex;}
.fqm-list{display:flex;flex-direction:column;gap:0.75rem;}
.fqm-block{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding-top:1rem;padding-right:1rem;padding-bottom:1rem;padding-left:1rem;display:flex;flex-direction:column;gap:0.75rem;transition:box-shadow 0.2s ease,border-color 0.2s ease;}
.fqm-item{background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding-top:0.75rem;padding-right:0.75rem;padding-bottom:0.75rem;padding-left:0.75rem;display:flex;flex-direction:column;gap:0.625rem;transition:box-shadow 0.2s ease,border-color 0.2s ease;}
.fqm-items{display:flex;flex-direction:column;gap:0.625rem;}
.fqm-flash{border-color:#E97300;box-shadow:0 0 0 3px rgba(233,115,0,0.35);}
.fqm-head{display:flex;align-items:center;gap:0.5rem;}
.fqm-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
.fqm-name{font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;}
.fqm-item .fqm-name{font-size:0.8125rem;color:#475569;}
.fqm-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
.fqm-input{width:100%;padding-top:0.5rem;padding-right:0.75rem;padding-bottom:0.5rem;padding-left:0.75rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
.fqm-input:focus{border-color:#003B71;}
.fqm-textarea{min-height:4.5rem;resize:vertical;line-height:1.5;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
.fqm-hint{margin:0;font-size:0.75rem;color:#94a3b8;line-height:1.4;}
.fqm-tools{display:flex;flex-wrap:wrap;align-items:center;gap:0.5rem;margin-top:0.5rem;}
.fqm-pill{display:inline-flex;align-items:center;justify-content:center;gap:0.375rem;padding-top:0.4rem;padding-right:0.875rem;padding-bottom:0.4rem;padding-left:0.875rem;border:2px solid transparent;border-radius:9999px;font-size:0.75rem;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;transition:background 0.15s,color 0.15s,opacity 0.15s;align-self:flex-start;}
.fqm-pill-primary{background:#003B71;color:#fff;}
.fqm-pill-primary:hover{background:#002a52;}
.fqm-pill-outline{background:#fff;border-color:#003B71;color:#003B71;}
.fqm-pill-outline:hover{background:#003B71;color:#fff;}
.fqm-pill-soft{background:#fff;border-color:#003B71;color:#003B71;}
.fqm-pill-soft:hover{background:#003B71;color:#fff;}
.fqm-pill-teal{background:#fff;border-color:#0d9488;color:#0d9488;}
.fqm-pill-teal:hover{background:#0d9488;color:#fff;}
.fqm-pill-ghost{background:#fff;border-color:#e2e8f0;color:#475569;font-size:0.875rem;font-weight:500;}
.fqm-pill-ghost:hover{background:#f8fafc;}
.fqm-pill-save{background:#E97300;color:#fff;font-size:0.875rem;}
.fqm-pill-save:hover{background:#c96200;}
.fqm-pill-danger{background:#ef4444;color:#fff;font-size:0.875rem;}
.fqm-pill-danger:hover{background:#dc2626;}
.fqm-pill-lg{padding-top:0.5rem;padding-right:1.25rem;padding-bottom:0.5rem;padding-left:1.25rem;font-size:0.8125rem;}
.fqm-icon-btn{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:none;border-radius:9999px;background:transparent;color:#64748b;cursor:pointer;transition:background 0.15s,color 0.15s,opacity 0.15s;}
.fqm-icon-btn:hover{background:#e2e8f0;color:#003B71;}
.fqm-icon-btn:disabled{opacity:0.3;cursor:not-allowed;pointer-events:none;}
.fqm-icon-btn.fqm-danger{color:#ef4444;}
.fqm-icon-btn.fqm-danger:hover{background:#fef2f2;color:#ef4444;}
.fqm-footer{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;align-items:center;background:#fff;flex-shrink:0;flex-wrap:wrap;}
.fqm-footer-tools{display:flex;gap:0.5rem;margin-right:auto;}
.fqm-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
.fqm-confirm{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
.fqm-confirm-head{padding-top:1rem;padding-right:1.25rem;padding-bottom:0.75rem;padding-left:1.25rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
.fqm-confirm-head i{font-size:1.25rem;}
.fqm-confirm-head h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
.fqm-confirm-body{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;}
.fqm-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
.fqm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding-top:0.375rem;padding-right:0.75rem;padding-bottom:0.375rem;padding-left:0.75rem;background:#f1f5f9;border-radius:9999px;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
.fqm-confirm-foot{padding-top:0.75rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
`;

function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}

function moveButtons(prefix, idx, total) {
    return `
            <button type="button" class="fqm-icon-btn" data-action="${prefix}-up" title="Subir" ${idx === 0 ? "disabled" : ""}><i class="ri-arrow-up-line"></i></button>
            <button type="button" class="fqm-icon-btn" data-action="${prefix}-down" title="Bajar" ${idx === total - 1 ? "disabled" : ""}><i class="ri-arrow-down-line"></i></button>
            <button type="button" class="fqm-icon-btn fqm-danger" data-action="${prefix}-remove" title="Eliminar"><i class="ri-delete-bin-line"></i></button>`;
}

function itemHTML(item, sIdx, iIdx, total) {
    const base = `sections.${sIdx}.items.${iIdx}`;
    return `
    <div class="fqm-item" data-item="${iIdx}">
        <div class="fqm-head">
            <span class="fqm-name">Pregunta ${iIdx + 1}</span>${moveButtons("item", iIdx, total)}
        </div>
        <div>
            <label class="fqm-label">Pregunta</label>
            <input class="fqm-input" placeholder="Escribe la pregunta" value="${esc(item.question)}" data-bind="${base}.question">
        </div>
        <div>
            <label class="fqm-label">Respuesta</label>
            <textarea class="fqm-input fqm-textarea" placeholder="Escribe la respuesta" data-bind="${base}.answer">${esc(item.answer)}</textarea>
            <div class="fqm-tools">
                <button type="button" class="fqm-pill fqm-pill-soft" data-action="fmt-ul" title="Convertir las líneas seleccionadas en viñetas"><i class="ri-list-unordered"></i> Viñetas</button>
                <button type="button" class="fqm-pill fqm-pill-soft" data-action="fmt-ol" title="Convertir las líneas seleccionadas en lista numerada"><i class="ri-list-ordered"></i> Numerada</button>
            </div>
            <p class="fqm-hint">Separa los párrafos con una línea en blanco. Para una sublista, deja dos espacios antes de la viñeta o el número.</p>
        </div>
    </div>`;
}

function sectionHTML(section, sIdx, total) {
    return `
    <div class="fqm-block" data-section="${sIdx}">
        <div class="fqm-head">
            <span class="fqm-num">${sIdx + 1}</span>
            <span class="fqm-name">Sección ${sIdx + 1}</span>${moveButtons("section", sIdx, total)}
        </div>
        <div>
            <label class="fqm-label">Título de la sección</label>
            <input class="fqm-input" placeholder="Título de la sección" value="${esc(section.title)}" data-bind="sections.${sIdx}.title">
        </div>
        <div class="fqm-items">${section.items.map((item, iIdx) => itemHTML(item, sIdx, iIdx, section.items.length)).join("")}</div>
        <button type="button" class="fqm-pill fqm-pill-soft" data-action="item-add"><i class="ri-add-line"></i> Agregar pregunta</button>
    </div>`;
}

function shellHTML(state) {
    const options = LINE_STYLES.map(
        (value) => `<option value="${value}" ${value === state.lineStyle ? "selected" : ""}>${LINE_LABELS[value]}</option>`,
    ).join("");
    return `
    <div class="fqm-modal">
        <div class="fqm-header">
            <h2><i class="ri-question-answer-line"></i> Configurar Preguntas Frecuentes</h2>
            <button type="button" class="fqm-close" data-action="close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="fqm-tabs">
            <button type="button" class="fqm-tab active" data-action="tab" data-tab="sections"><i class="ri-layout-grid-line"></i> Secciones</button>
            <button type="button" class="fqm-tab" data-action="tab" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
        </div>
        <div class="fqm-body">
            <div class="fqm-panel active" data-panel="sections">
                <div class="fqm-list" data-sections></div>
                <button type="button" class="fqm-pill fqm-pill-primary fqm-pill-lg" data-action="section-add"><i class="ri-add-line"></i> Agregar sección</button>
            </div>
            <div class="fqm-panel" data-panel="general">
                <div class="fqm-block">
                    <div>
                        <label class="fqm-label">Línea bajo el título de la sección</label>
                        <select class="fqm-input" data-bind="lineStyle">${options}</select>
                    </div>
                    <p class="fqm-hint">Define el ancho de la línea naranja que acompaña al título de cada sección.</p>
                </div>
            </div>
        </div>
        <div class="fqm-footer">
            <button type="button" class="fqm-pill fqm-pill-ghost fqm-pill-lg" data-action="close">Cancelar</button>
            <div class="fqm-footer-tools">
                <button type="button" class="fqm-pill fqm-pill-outline fqm-pill-lg" data-action="backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <button type="button" class="fqm-pill fqm-pill-teal fqm-pill-lg" data-action="restore" title="Restaurar configuración desde JSON"><i class="ri-upload-2-line"></i> Restaurar</button>
                <input type="file" accept=".json,application/json" data-file="restore" style="display:none;">
            </div>
            <button type="button" class="fqm-pill fqm-pill-save fqm-pill-lg" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>
    </div>`;
}

function showDialog({ icon, color, title, body, filename, confirmText, danger, onConfirm }) {
    const dialog = document.createElement("div");
    dialog.className = "fqm-confirm-overlay";
    dialog.innerHTML = `
    <div class="fqm-confirm">
        <div class="fqm-confirm-head"><i class="${icon}" style="color:${color};"></i><h3>${esc(title)}</h3></div>
        <div class="fqm-confirm-body">
            ${body.map((line) => `<p>${esc(line)}</p>`).join("")}
            ${filename ? `<span class="fqm-filename"><i class="ri-file-code-line"></i>${esc(filename)}</span>` : ""}
        </div>
        <div class="fqm-confirm-foot">
            ${onConfirm ? `<button type="button" class="fqm-pill fqm-pill-ghost fqm-pill-lg" data-dialog="cancel">Cancelar</button>` : ""}
            <button type="button" class="fqm-pill ${danger ? "fqm-pill-danger" : "fqm-pill-save"} fqm-pill-lg" data-dialog="ok">${esc(confirmText)}</button>
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

function formatLines(textarea, ordered) {
    const { value, selectionStart, selectionEnd } = textarea;
    const start = selectionStart === 0 ? 0 : value.lastIndexOf("\n", selectionStart - 1) + 1;
    const nextBreak = value.indexOf("\n", selectionEnd);
    const end = nextBreak === -1 ? value.length : nextBreak;
    let count = 0;
    const lines = value
        .slice(start, end)
        .split("\n")
        .map((line) => {
            if (!line.trim()) return line;
            count += 1;
            const clean = line.replace(/^(\s*)([-*•–]|\d+[.)])\s+/, "$1");
            const indent = clean.match(/^\s*/)[0];
            return `${indent}${ordered ? `${count}.` : "-"} ${clean.slice(indent.length)}`;
        });
    textarea.value = value.slice(0, start) + lines.join("\n") + value.slice(end);
    textarea.dispatchEvent(new Event("input", { bubbles: true }));
    textarea.focus();
}

function showFaqModal(editor, component) {
    document.getElementById(MODAL_ID)?.remove();
    ensureStyles();

    const state = readConfig(component);

    const overlay = document.createElement("div");
    overlay.id = MODAL_ID;
    overlay.className = "fqm-overlay";
    overlay.innerHTML = shellHTML(state);
    document.body.appendChild(overlay);

    const list = overlay.querySelector("[data-sections]");
    const fileInput = overlay.querySelector("[data-file='restore']");

    const sectionOf = (el) => Number(el.closest("[data-section]").dataset.section);
    const itemOf = (el) => Number(el.closest("[data-item]").dataset.item);

    const renderSections = () => {
        list.innerHTML = state.sections
            .map((section, idx) => sectionHTML(section, idx, state.sections.length))
            .join("");
    };

    const flash = (sIdx, iIdx) => {
        const section = list.querySelector(`[data-section="${sIdx}"]`);
        const el = iIdx === undefined ? section : section?.querySelector(`[data-item="${iIdx}"]`);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("fqm-flash");
        setTimeout(() => el.classList.remove("fqm-flash"), 1000);
    };

    const close = () => overlay.remove();

    const download = () => {
        const blob = new Blob([JSON.stringify(normalizeConfig(state), null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        const link = document.createElement("a");
        link.href = url;
        link.download = `faq-backup-${stamp}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const moveSection = (el, direction) => {
        const target = swap(state.sections, sectionOf(el), direction);
        if (target < 0) return;
        renderSections();
        flash(target);
    };

    const moveItem = (el, direction) => {
        const sIdx = sectionOf(el);
        const target = swap(state.sections[sIdx].items, itemOf(el), direction);
        if (target < 0) return;
        renderSections();
        flash(sIdx, target);
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
        "section-add"() {
            state.sections.push({
                title: "Nueva sección",
                items: [{ question: "Nueva pregunta", answer: "Escribe aquí la respuesta." }],
            });
            renderSections();
            flash(state.sections.length - 1);
        },
        "section-remove"(el) {
            state.sections.splice(sectionOf(el), 1);
            renderSections();
        },
        "section-up": (el) => moveSection(el, -1),
        "section-down": (el) => moveSection(el, 1),
        "item-add"(el) {
            const sIdx = sectionOf(el);
            state.sections[sIdx].items.push({ question: "Nueva pregunta", answer: "Escribe aquí la respuesta." });
            renderSections();
            flash(sIdx, state.sections[sIdx].items.length - 1);
        },
        "item-remove"(el) {
            state.sections[sectionOf(el)].items.splice(itemOf(el), 1);
            renderSections();
        },
        "item-up": (el) => moveItem(el, -1),
        "item-down": (el) => moveItem(el, 1),
        "fmt-ul": (el) => formatLines(el.closest("[data-item]").querySelector("textarea"), false),
        "fmt-ol": (el) => formatLines(el.closest("[data-item]").querySelector("textarea"), true),
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
        const path = event.target.dataset?.bind;
        if (path) setPath(state, path, event.target.value);
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
                    overlay.querySelector("[data-bind='lineStyle']").value = state.lineStyle;
                    renderSections();
                },
            });
        };
        reader.readAsText(file);
    });

    renderSections();
}

export function registerFaqModal(editor) {
    editor.Commands.add("open-faq-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected?.get("type") === COMPONENT_TYPE) showFaqModal(ed, selected);
        },
    });
}