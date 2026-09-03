import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

document.addEventListener("DOMContentLoaded", () => {
    initSelectAll();
    initSingleActions();
    initBulkActions();
});

function getSelectedIds() {
    return Array.from(document.querySelectorAll(".media-checkbox:checked")).map((cb) => cb.value);
}

function updateBulkBar() {
    const selected = getSelectedIds();
    const bar = document.getElementById("bulk-actions-bar");
    const countEl = document.getElementById("selected-count");
    if (!bar || !countEl) return;

    countEl.textContent = selected.length;
    bar.style.display = selected.length > 0 ? "block" : "none";
}

function initSelectAll() {
    const selectAll = document.getElementById("select-all");
    if (!selectAll) return;

    selectAll.addEventListener("change", () => {
        document.querySelectorAll(".media-checkbox").forEach((cb) => {
            cb.checked = selectAll.checked;
        });
        updateBulkBar();
    });

    document.querySelectorAll(".media-checkbox").forEach((cb) => {
        cb.addEventListener("change", updateBulkBar);
    });
}

function initSingleActions() {
    document.querySelectorAll("[data-restore-media]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.mediaId;
            const filename = btn.dataset.filename;
            confirmRestore([id], () => removeCardsFromDOM([id]), filename);
        });
    });

    document.querySelectorAll("[data-force-delete-media]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.mediaId;
            const filename = btn.dataset.filename;
            confirmForceDelete([id], () => removeCardsFromDOM([id]), filename);
        });
    });
}

function initBulkActions() {
    const restoreBtn = document.querySelector("[data-bulk-restore]");
    const forceDeleteBtn = document.querySelector("[data-bulk-force-delete]");

    if (restoreBtn) {
        restoreBtn.addEventListener("click", () => {
            const ids = getSelectedIds();
            if (ids.length === 0) return;
            confirmRestore(ids, () => removeCardsFromDOM(ids));
        });
    }

    if (forceDeleteBtn) {
        forceDeleteBtn.addEventListener("click", () => {
            const ids = getSelectedIds();
            if (ids.length === 0) return;
            confirmForceDelete(ids, () => removeCardsFromDOM(ids));
        });
    }
}

function removeCardsFromDOM(ids) {
    ids.forEach((id) => {
        const el = document.getElementById(`trashed-item-${id}`);
        if (el) {
            el.style.transition = "opacity 0.3s, transform 0.3s";
            el.style.opacity = "0";
            el.style.transform = "scale(0.9)";
            setTimeout(() => {
                el.remove();
                if (document.querySelectorAll('[id^="trashed-item-"]').length === 0) {
                    window.location.reload();
                }
            }, 300);
        }
    });
    updateBulkBar();
}

function confirmRestore(ids, onSuccess, filename = null) {
    const message = filename
        ? `¿Restaurar "${filename}"?`
        : `¿Restaurar ${ids.length} archivo(s) seleccionado(s)?`;

    showConfirmModal({
        title: "¿Restaurar archivo(s)?",
        message,
        confirmText: "Restaurar",
        cancelText: "Cancelar",
        type: "warning",
        onConfirm: () => {
            if (ids.length === 1) {
                singleRestore(ids[0], onSuccess);
            } else {
                bulkAction("bulk-restore", ids, onSuccess);
            }
        },
    });
}

function confirmForceDelete(ids, onSuccess, filename = null) {
    const message = filename
        ? `¿Eliminar "${filename}" de forma PERMANENTE? Esta acción no se puede deshacer.`
        : `¿Eliminar ${ids.length} archivo(s) de forma PERMANENTE? Esta acción no se puede deshacer.`;

    showConfirmModal({
        title: "¿Eliminar permanentemente?",
        message,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => {
            if (ids.length === 1) {
                singleForceDelete(ids[0], onSuccess);
            } else {
                bulkAction("bulk-force-delete", ids, onSuccess);
            }
        },
    });
}

function singleRestore(id, onSuccess) {
    fetch(buildUrl(`media/${id}/restore`), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
    })
        .then((res) => res.json())
        .then((data) => {
            showNotification(data.message, data.success ? "success" : "error");
            if (data.success) onSuccess();
        })
        .catch(() => showNotification("Error al restaurar", "error"));
}

function singleForceDelete(id, onSuccess) {
    fetch(buildUrl(`media/${id}/force-delete`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
    })
        .then((res) => res.json())
        .then((data) => {
            showNotification(data.message, data.success ? "success" : "error");
            if (data.success) onSuccess();
        })
        .catch(() => showNotification("Error al eliminar", "error"));
}

function bulkAction(endpoint, ids, onSuccess) {
    fetch(buildUrl(`media/${endpoint}`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
        body: JSON.stringify({ ids }),
    })
        .then((res) => res.json())
        .then((data) => {
            showNotification(data.message, data.success ? "success" : "error");
            if (data.success) onSuccess();
        })
        .catch(() => showNotification("Error al procesar la acción", "error"));
}