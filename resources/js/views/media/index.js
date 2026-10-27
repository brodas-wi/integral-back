import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";
import { showUsagesModal } from "@/components/usages-modal.js";

const GRID_ID = "media-grid";
const ITEM_PREFIX = "media-item-";
const REMOVE_DELAY = 300;

const csrfToken = () => document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

function request(path, { method = "GET", body } = {}) {
    const headers = { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" };

    if (method !== "GET") {
        const token = csrfToken();
        if (!token) return Promise.reject(new Error("csrf"));
        headers["Content-Type"] = "application/json";
        headers["X-CSRF-TOKEN"] = token;
    }

    return fetch(buildUrl(path), {
        method,
        headers,
        credentials: "same-origin",
        body: body ? JSON.stringify(body) : undefined,
    }).then((response) => response.json().then((data) => ({ status: response.status, data })));
}

function failDelete(error) {
    const message =
        error?.message === "csrf"
            ? "Error de configuración. Recarga la página."
            : "Error al eliminar. Verifica tu conexión.";
    showNotification(message, "error");
}

function finishDelete(mediaId, data) {
    if (!data.success) {
        showNotification(data.message || "Error desconocido", "error");
        return;
    }
    showNotification(data.message || "Movido a la papelera", "success");
    removeFromGrid(mediaId);
}

function removeFromGrid(mediaId) {
    const item = document.getElementById(`${ITEM_PREFIX}${mediaId}`);
    if (!item) return;

    item.style.transition = `opacity ${REMOVE_DELAY}ms, transform ${REMOVE_DELAY}ms`;
    item.style.opacity = "0";
    item.style.transform = "scale(0.9)";

    setTimeout(() => {
        item.remove();
        if (!document.querySelector(`[id^="${ITEM_PREFIX}"]`)) window.location.reload();
    }, REMOVE_DELAY);
}

function confirmDeleteMedia(mediaId, filename) {
    showConfirmModal({
        title: "¿Mover a la papelera?",
        message: `¿Estás seguro de que deseas mover "${filename}" a la papelera?`,
        confirmText: "Mover a papelera",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deleteMedia(mediaId),
    });
}

function deleteMedia(mediaId) {
    request(`media/${mediaId}`, { method: "DELETE" })
        .then(({ status, data }) => {
            if (status === 422 && data.usages) {
                showUsagesModal(data.usages, data.message);
                return;
            }
            if (status === 409 && data.requires_thumbnail_confirmation) {
                confirmThumbnailDeletion(mediaId, data.thumbnail_filename);
                return;
            }
            finishDelete(mediaId, data);
        })
        .catch(failDelete);
}

function confirmThumbnailDeletion(mediaId, thumbnailFilename) {
    showConfirmModal({
        title: "Miniatura asociada",
        message: `Este video tiene una miniatura asociada ("${thumbnailFilename}"). Puedes eliminarla también o conservarla.`,
        confirmText: "Eliminar ambos",
        cancelText: "Conservar miniatura",
        type: "warning",
        onConfirm: () => deleteWithThumbnail(mediaId, true),
        onCancel: () => deleteWithThumbnail(mediaId, false),
    });
}

function deleteWithThumbnail(mediaId, deleteThumbnail) {
    request(`media/${mediaId}/destroy-with-thumbnail`, {
        method: "POST",
        body: { delete_thumbnail: deleteThumbnail },
    })
        .then(({ data }) => finishDelete(mediaId, data))
        .catch(failDelete);
}

function checkUsages(mediaId) {
    request(`media/${mediaId}/usages`)
        .then(({ data }) => showUsagesModal(data.usages))
        .catch(() => showNotification("Error al consultar el uso del archivo", "error"));
}

function handleClick(event) {
    const deleteBtn = event.target.closest("[data-delete-media]");
    if (deleteBtn) {
        confirmDeleteMedia(deleteBtn.dataset.mediaId, deleteBtn.dataset.filename);
        return;
    }

    const usagesBtn = event.target.closest("[data-check-usages]");
    if (usagesBtn) checkUsages(usagesBtn.dataset.mediaId);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById(GRID_ID)?.addEventListener("click", handleClick);
});