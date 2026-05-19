import { showNotification } from "@/utils/notifications.js";

const BASE = document.querySelector(
    'meta[name="announcements-base-url"]',
)?.content;
const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

window.confirmDelete = function (announcementId, title) {
    if (typeof window.showConfirmModal !== "function") {
        if (
            confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)
        ) {
            deleteAnnouncement(announcementId);
        }
        return;
    }

    window.showConfirmModal({
        title: "¿Eliminar aviso?",
        message: `¿Estás seguro de que deseas eliminar "<strong>${title}</strong>"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deleteAnnouncement(announcementId),
    });
};

async function deleteAnnouncement(announcementId) {
    try {
        const response = await fetch(`${BASE}/${announcementId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": CSRF,
                Accept: "application/json",
            },
        });

        const data = await response.json();

        if (data.success) {
            showNotification(data.message, "success");
            setTimeout(() => {
                window.location.href = BASE;
            }, 1500);
        } else {
            showNotification(
                data.message || "Error al eliminar el aviso",
                "error",
            );
        }
    } catch (error) {
        console.error("Error deleting announcement:", error);
        showNotification("Error al eliminar el aviso", "error");
    }
}
