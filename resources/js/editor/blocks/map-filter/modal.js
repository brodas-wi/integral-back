import { MAX_STATS, MAX_TITLE, mergeData } from "./defaults";
import { ensureModalStyles } from "./modal-styles";
import { applyMapConfig, readMapConfig } from "./template";

const TOKENS = [
    ["{agencias}", "Agencias"],
    ["{puntos}", "Puntos de pago"],
    ["{total}", "Total"],
];

const buildShell = () => `
<div class="mpm-header">
    <div class="mpm-header-left"><i class="ri-map-2-line"></i><h2>Configurar Mapa y Filtros</h2></div>
    <button type="button" class="mpm-close" data-action="close"><i class="ri-close-line"></i></button>
</div>
<div class="mpm-body">
    <div class="mpm-card">
        <label class="mpm-label">Texto de estadísticas</label>
        <textarea class="mpm-textarea" rows="3" maxlength="${MAX_STATS}" data-bind="statsText"></textarea>
        <div class="mpm-tokens">${TOKENS.map(([token, label]) => `<button type="button" class="mpm-token" data-action="insert" data-token="${token}"><i class="ri-add-line"></i> ${label}</button>`).join("")}</div>
        <p class="mpm-hint">Inserta cada cantidad donde quieras mostrarla; se resaltan en color. Déjalo vacío para ocultar el texto.</p>
    </div>
    <div class="mpm-card">
        <label class="mpm-label">Título</label>
        <input type="text" class="mpm-input" maxlength="${MAX_TITLE}" data-bind="title" placeholder="Texto del título">
        <p class="mpm-hint">Déjalo vacío para ocultar el título.</p>
    </div>
    <p class="mpm-hint">Los filtros y las ubicaciones del mapa se generan automáticamente a partir de las agencias y puntos de pago activos con coordenadas.</p>
</div>
<div class="mpm-footer">
    <button type="button" class="mpm-btn-cancel" data-action="close">Cancelar</button>
    <button type="button" class="mpm-btn-save" data-action="save"><i class="ri-check-line"></i> Aplicar cambios</button>
</div>`;

export function showMapFilterModal(editor, component) {
    ensureModalStyles();
    document.getElementById("map-filter-config-modal")?.remove();

    const state = mergeData(readMapConfig(component));

    const overlay = document.createElement("div");
    overlay.id = "map-filter-config-modal";
    overlay.className = "mpm-overlay";
    const modal = document.createElement("div");
    modal.className = "mpm-modal";
    modal.innerHTML = buildShell();
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const hydrate = () => {
        modal.querySelectorAll("[data-bind]").forEach((input) => {
            const value = state[input.dataset.bind] ?? "";
            if (input.value !== value) input.value = value;
        });
    };

    const onKeydown = (event) => {
        if (event.key === "Escape") close();
    };

    const close = () => {
        document.removeEventListener("keydown", onKeydown);
        overlay.remove();
    };

    const actions = {
        close,
        save: () => {
            applyMapConfig(editor, component, state);
            close();
        },
        insert: (el) => {
            const area = modal.querySelector('[data-bind="statsText"]');
            const start = area.selectionStart ?? area.value.length;
            const end = area.selectionEnd ?? start;
            const next = area.value.slice(0, start) + el.dataset.token + area.value.slice(end);
            state.statsText = next.slice(0, MAX_STATS);
            hydrate();
            area.focus();
            const caret = Math.min(start + el.dataset.token.length, state.statsText.length);
            area.setSelectionRange(caret, caret);
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
        if (key) state[key] = event.target.value;
    });

    overlay.addEventListener("mousedown", (event) => {
        if (event.target === overlay) close();
    });
    document.addEventListener("keydown", onKeydown);

    hydrate();
}