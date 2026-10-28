import { openMediaPicker } from "@/editor/media-picker";
import {
    COMPONENT_TYPE,
    applyConfig,
    escapeHtml as esc,
    normalizeConfig,
    readConfig,
    safeUrl,
} from "./core.js";

const MODAL_ID = "scm-modal";
const STYLE_ID = "scm-styles";

const MODAL_CSS = `
.scm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
.scm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
.scm-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
.scm-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
.scm-header h2 i{color:#003B71;}
.scm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:9999px;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
.scm-close:hover{background:#f1f5f9;color:#475569;}
.scm-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
.scm-tab{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
.scm-tab.active{color:#003B71;border-bottom-color:#003B71;}
.scm-tab i{font-size:1rem;}
.scm-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem;background:#f8fafc;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
.scm-body::-webkit-scrollbar{width:6px;}
.scm-body::-webkit-scrollbar-track{background:transparent;}
.scm-body::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
.scm-panel{display:none;flex-direction:column;gap:0.75rem;}
.scm-panel.active{display:flex;}
.scm-cards{display:flex;flex-direction:column;gap:0.75rem;}
.scm-block{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding-top:1rem;padding-right:1rem;padding-bottom:1rem;padding-left:1rem;display:flex;flex-direction:column;gap:0.75rem;transition:box-shadow 0.2s ease,border-color 0.2s ease;}
.scm-block.scm-flash{border-color:#E97300;box-shadow:0 0 0 3px rgba(233,115,0,0.35);}
.scm-card-head{display:flex;align-items:center;gap:0.5rem;}
.scm-card-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
.scm-card-name{font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;}
.scm-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
.scm-input{width:100%;padding-top:0.5rem;padding-right:0.75rem;padding-bottom:0.5rem;padding-left:0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
.scm-input:focus{border-color:#003B71;}
.scm-input-sm{width:100%;padding-top:0.375rem;padding-right:0.625rem;padding-bottom:0.375rem;padding-left:0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;box-sizing:border-box;transition:border-color 0.15s;}
.scm-input-sm:focus{border-color:#003B71;}
.scm-row{display:flex;gap:0.75rem;align-items:flex-start;}
.scm-col{flex:1;display:flex;flex-direction:column;gap:0.5rem;}
.scm-img-preview{width:64px;height:64px;border-radius:0.5rem;object-fit:cover;border:1px solid #e2e8f0;background:#f1f5f9;flex-shrink:0;display:block;}
.scm-img-placeholder{width:64px;height:64px;border-radius:0.5rem;background:#f1f5f9;border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.scm-img-placeholder i{font-size:1.5rem;color:#94a3b8;}
.scm-pill{display:inline-flex;align-items:center;justify-content:center;gap:0.375rem;padding-top:0.4rem;padding-right:0.875rem;padding-bottom:0.4rem;padding-left:0.875rem;border:2px solid transparent;border-radius:9999px;font-size:0.75rem;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;transition:background 0.15s,color 0.15s,opacity 0.15s;align-self:flex-start;}
.scm-pill-primary{background:#003B71;color:#fff;}
.scm-pill-primary:hover{background:#002a52;}
.scm-pill-outline{background:#fff;border-color:#003B71;color:#003B71;}
.scm-pill-outline:hover{background:#003B71;color:#fff;}
.scm-pill-teal{background:#fff;border-color:#0d9488;color:#0d9488;}
.scm-pill-teal:hover{background:#0d9488;color:#fff;}
.scm-pill-ghost{background:#fff;border-color:#e2e8f0;color:#475569;font-size:0.875rem;font-weight:500;}
.scm-pill-ghost:hover{background:#f8fafc;}
.scm-pill-save{background:#E97300;color:#fff;font-size:0.875rem;}
.scm-pill-save:hover{background:#c96200;}
.scm-pill-danger{background:#ef4444;color:#fff;font-size:0.875rem;}
.scm-pill-danger:hover{background:#dc2626;}
.scm-pill-lg{padding-top:0.5rem;padding-right:1.25rem;padding-bottom:0.5rem;padding-left:1.25rem;font-size:0.8125rem;}
.scm-icon-btn{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:none;border-radius:9999px;background:transparent;color:#64748b;cursor:pointer;transition:background 0.15s,color 0.15s,opacity 0.15s;}
.scm-icon-btn:hover{background:#f1f5f9;color:#003B71;}
.scm-icon-btn:disabled{opacity:0.3;cursor:not-allowed;pointer-events:none;}
.scm-icon-btn.scm-danger{color:#ef4444;}
.scm-icon-btn.scm-danger:hover{background:#fef2f2;color:#ef4444;}
.scm-footer{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;align-items:center;background:#fff;flex-shrink:0;flex-wrap:wrap;}
.scm-footer-tools{display:flex;gap:0.5rem;margin-right:auto;}
.scm-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
.scm-confirm{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
.scm-confirm-head{padding-top:1rem;padding-right:1.25rem;padding-bottom:0.75rem;padding-left:1.25rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
.scm-confirm-head i{font-size:1.25rem;}
.scm-confirm-head h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
.scm-confirm-body{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;}
.scm-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
.scm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding-top:0.375rem;padding-right:0.75rem;padding-bottom:0.375rem;padding-left:0.75rem;background:#f1f5f9;border-radius:9999px;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
.scm-confirm-foot{padding-top:0.75rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
`;

function ensureStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}

function previewHTML(image) {
    const src = safeUrl(image);
    return src
        ? `<img class="scm-img-preview" src="${src}" alt="">`
        : `<div class="scm-img-placeholder"><i class="ri-image-line"></i></div>`;
}

function cardHTML(card, idx, total) {
    return `
    <div class="scm-block" data-card="${idx}">
        <div class="scm-card-head">
            <span class="scm-card-num">${idx + 1}</span>
            <span class="scm-card-name">Tarjeta ${idx + 1}</span>
            <button type="button" class="scm-icon-btn" data-action="move-up" title="Subir" ${idx === 0 ? "disabled" : ""}><i class="ri-arrow-up-line"></i></button>
            <button type="button" class="scm-icon-btn" data-action="move-down" title="Bajar" ${idx === total - 1 ? "disabled" : ""}><i class="ri-arrow-down-line"></i></button>
            <button type="button" class="scm-icon-btn scm-danger" data-action="remove-card" title="Eliminar"><i class="ri-delete-bin-line"></i></button>
        </div>
        <div class="scm-row">
            <div data-preview>${previewHTML(card.image)}</div>
            <div class="scm-col">
                <label class="scm-label">Imagen de fondo</label>
                <input class="scm-input-sm" placeholder="URL de la imagen" value="${esc(card.image)}" data-bind="cards.${idx}.image">
                <button type="button" class="scm-pill scm-pill-primary" data-action="pick-image"><i class="ri-image-line"></i> Seleccionar imagen</button>
            </div>
        </div>
        <div>
            <label class="scm-label">Video en hover (opcional)</label>
            <div class="scm-col">
                <input class="scm-input-sm" placeholder="URL del video (mp4 o webm)" value="${esc(card.video)}" data-bind="cards.${idx}.video">
                <button type="button" class="scm-pill scm-pill-primary" data-action="pick-video"><i class="ri-video-line"></i> Seleccionar video</button>
            </div>
        </div>
        <div>
            <label class="scm-label">Título</label>
            <input class="scm-input" placeholder="Título de la tarjeta" value="${esc(card.title)}" data-bind="cards.${idx}.title">
        </div>
        <div>
            <label class="scm-label">Descripción</label>
            <input class="scm-input" placeholder="Descripción breve" value="${esc(card.desc)}" data-bind="cards.${idx}.desc">
        </div>
        <div>
            <label class="scm-label">Enlace (opcional)</label>
            <input class="scm-input" placeholder="/pagina, https://... o déjalo vacío" value="${esc(card.href)}" data-bind="cards.${idx}.href">
        </div>
    </div>`;
}

function shellHTML(state) {
    return `
    <div class="scm-modal">
        <div class="scm-header">
            <h2><i class="ri-gallery-line"></i> Configurar Sección con Carrusel</h2>
            <button type="button" class="scm-close" data-action="close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="scm-tabs">
            <button type="button" class="scm-tab active" data-action="tab" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
            <button type="button" class="scm-tab" data-action="tab" data-tab="cards"><i class="ri-layout-grid-line"></i> Tarjetas</button>
        </div>
        <div class="scm-body">
            <div class="scm-panel active" data-panel="general">
                <div class="scm-block">
                    <div>
                        <label class="scm-label">Título</label>
                        <input class="scm-input" value="${esc(state.heading)}" data-bind="heading">
                    </div>
                    <div>
                        <label class="scm-label">Subtítulo</label>
                        <input class="scm-input" value="${esc(state.subheading)}" data-bind="subheading">
                    </div>
                </div>
            </div>
            <div class="scm-panel" data-panel="cards">
                <div class="scm-cards" data-cards></div>
                <button type="button" class="scm-pill scm-pill-primary scm-pill-lg" data-action="add-card"><i class="ri-add-line"></i> Agregar tarjeta</button>
            </div>
        </div>
        <div class="scm-footer">
            <button type="button" class="scm-pill scm-pill-ghost scm-pill-lg" data-action="close">Cancelar</button>
            <div class="scm-footer-tools">
                <button type="button" class="scm-pill scm-pill-outline scm-pill-lg" data-action="backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <button type="button" class="scm-pill scm-pill-teal scm-pill-lg" data-action="restore" title="Restaurar configuración desde JSON"><i class="ri-upload-2-line"></i> Restaurar</button>
                <input type="file" accept=".json,application/json" data-file="restore" style="display:none;">
            </div>
            <button type="button" class="scm-pill scm-pill-save scm-pill-lg" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>
    </div>`;
}

function showDialog({ icon, color, title, body, filename, confirmText, danger, onConfirm }) {
    const dialog = document.createElement("div");
    dialog.className = "scm-confirm-overlay";
    dialog.innerHTML = `
    <div class="scm-confirm">
        <div class="scm-confirm-head"><i class="${icon}" style="color:${color};"></i><h3>${esc(title)}</h3></div>
        <div class="scm-confirm-body">
            ${body.map((line) => `<p>${esc(line)}</p>`).join("")}
            ${filename ? `<span class="scm-filename"><i class="ri-file-code-line"></i>${esc(filename)}</span>` : ""}
        </div>
        <div class="scm-confirm-foot">
            ${onConfirm ? `<button type="button" class="scm-pill scm-pill-ghost scm-pill-lg" data-dialog="cancel">Cancelar</button>` : ""}
            <button type="button" class="scm-pill ${danger ? "scm-pill-danger" : "scm-pill-save"} scm-pill-lg" data-dialog="ok">${esc(confirmText)}</button>
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

function raiseMediaModal() {
    const apply = () => {
        const media = document.getElementById("media-modal");
        if (media) media.style.zIndex = "1000001";
        return Boolean(media);
    };
    if (!apply()) setTimeout(apply, 50);
}

function showSplitCarouselModal(editor, component) {
    document.getElementById(MODAL_ID)?.remove();
    ensureStyles();

    const state = readConfig(component);

    const overlay = document.createElement("div");
    overlay.id = MODAL_ID;
    overlay.className = "scm-overlay";
    overlay.innerHTML = shellHTML(state);
    document.body.appendChild(overlay);

    const list = overlay.querySelector("[data-cards]");
    const fileInput = overlay.querySelector("[data-file='restore']");

    const cardEl = (idx) => list.querySelector(`[data-card="${idx}"]`);
    const indexOf = (el) => Number(el.closest("[data-card]").dataset.card);

    const renderCards = () => {
        list.innerHTML = state.cards
            .map((card, idx) => cardHTML(card, idx, state.cards.length))
            .join("");
    };

    const syncGeneral = () => {
        overlay.querySelector("[data-bind='heading']").value = state.heading;
        overlay.querySelector("[data-bind='subheading']").value = state.subheading;
    };

    const syncMedia = (idx, field) => {
        const el = cardEl(idx);
        if (!el) return;
        el.querySelector(`[data-bind="cards.${idx}.${field}"]`).value = state.cards[idx][field];
        if (field === "image") el.querySelector("[data-preview]").innerHTML = previewHTML(state.cards[idx].image);
    };

    const flashCard = (idx) => {
        const el = cardEl(idx);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("scm-flash");
        setTimeout(() => el.classList.remove("scm-flash"), 1000);
    };

    const close = () => overlay.remove();

    const pickMedia = (idx, type, field, title) => {
        openMediaPicker({
            type,
            title,
            onSelect: (url) => {
                state.cards[idx][field] = url;
                syncMedia(idx, field);
            },
        });
        raiseMediaModal();
    };

    const moveCard = (idx, direction) => {
        const target = idx + direction;
        if (target < 0 || target >= state.cards.length) return;
        [state.cards[idx], state.cards[target]] = [state.cards[target], state.cards[idx]];
        renderCards();
        flashCard(target);
    };

    const download = () => {
        const blob = new Blob([JSON.stringify(normalizeConfig(state), null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        const link = document.createElement("a");
        link.href = url;
        link.download = `split-carousel-backup-${stamp}.json`;
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
        "add-card"() {
            state.cards.push({ image: "", video: "", href: "", title: "Nueva tarjeta", desc: "Descripción de la tarjeta." });
            renderCards();
            flashCard(state.cards.length - 1);
        },
        "remove-card"(el) {
            state.cards.splice(indexOf(el), 1);
            renderCards();
        },
        "move-up": (el) => moveCard(indexOf(el), -1),
        "move-down": (el) => moveCard(indexOf(el), 1),
        "pick-image": (el) => pickMedia(indexOf(el), "image", "image", "Seleccionar imagen de tarjeta"),
        "pick-video": (el) => pickMedia(indexOf(el), "video", "video", "Seleccionar video de tarjeta"),
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
        if (!path) return;
        setPath(state, path, event.target.value);
        if (path.endsWith(".image")) {
            const idx = indexOf(event.target);
            cardEl(idx).querySelector("[data-preview]").innerHTML = previewHTML(state.cards[idx].image);
        }
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
                    syncGeneral();
                    renderCards();
                },
            });
        };
        reader.readAsText(file);
    });

    renderCards();
}

export function registerSplitCarouselModal(editor) {
    editor.Commands.add("open-split-carousel-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected?.get("type") === COMPONENT_TYPE) showSplitCarouselModal(ed, selected);
        },
    });
}