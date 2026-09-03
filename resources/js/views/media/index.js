import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";
import { showUsagesModal } from "@/components/usages-modal.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

document.addEventListener("DOMContentLoaded", () => {
    initDeleteMedia();
    initCheckUsages();
});

function initDeleteMedia() {
    document.querySelectorAll("[data-delete-media]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const mediaId = btn.dataset.mediaId;
            const filename = btn.dataset.filename;
            confirmDeleteMedia(mediaId, filename);
        });
    });
}

function confirmDeleteMedia(mediaId, filename) {
    showConfirmModal({
        title: "¿Mover a la papelera?",
        message: `¿Estás seguro de que deseas mover "${filename}" a la papelera?`,
        confirmText: "Mover a papelera",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deleteMedia(mediaId, filename),
    });
}

function deleteMedia(mediaId) {
    if (!CSRF) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    fetch(buildUrl(`media/${mediaId}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
    })
        .then((response) => response.json().then((data) => ({ status: response.status, data })))
        .then(({ status, data }) => {
            if (status === 422 && data.usages) {
                showUsagesModal(data.usages, data.message);
                return;
            }

            if (data.success) {
                showNotification(data.message || "Movido a la papelera", "success");
                const mediaItem = document.getElementById(`media-item-${mediaId}`);
                if (mediaItem) {
                    mediaItem.style.transition = "opacity 0.3s, transform 0.3s";
                    mediaItem.style.opacity = "0";
                    mediaItem.style.transform = "scale(0.9)";
                    setTimeout(() => {
                        mediaItem.remove();
                        if (document.querySelectorAll('[id^="media-item-"]').length === 0) {
                            window.location.reload();
                        }
                    }, 300);
                }
            } else {
                showNotification(data.message || "Error desconocido", "error");
            }
        })
        .catch(() => showNotification("Error al eliminar. Verifica tu conexión.", "error"));
}

function initCheckUsages() {
    document.querySelectorAll("[data-check-usages]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const mediaId = btn.dataset.mediaId;
            fetch(buildUrl(`media/${mediaId}/usages`), {
                headers: { Accept: "application/json" },
            })
                .then((res) => res.json())
                .then((data) => showUsagesModal(data.usages))
                .catch(() => showNotification("Error al consultar el uso del archivo", "error"));
        });
    });
}