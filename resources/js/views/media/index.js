import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

document.addEventListener("DOMContentLoaded", () => {
    initDeleteMedia();
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
        title: "¿Eliminar archivo?",
        message: `¿Estás seguro de que deseas eliminar "${filename}"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
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

    showNotification("Eliminando archivo...", "info");

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
        .then((response) => {
            const contentType = response.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                throw new Error("Respuesta inválida del servidor");
            }
            if (response.status === 403) {
                return response.json().then((data) => {
                    throw new Error(data.message || "Sin permisos");
                });
            }
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                showNotification(data.message || "Archivo eliminado", "success");
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
                throw new Error(data.message || "Error desconocido");
            }
        })
        .catch((error) => {
            let errorMessage = "Error al eliminar. ";
            if (error.message.includes("permisos")) {
                errorMessage += "Contacta al administrador.";
            } else if (error.message.includes("Failed to fetch")) {
                errorMessage += "Verifica tu conexión.";
            } else {
                errorMessage += error.message;
            }
            showNotification(errorMessage, "error");
        });
}