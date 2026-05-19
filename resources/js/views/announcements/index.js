import { showNotification } from "@/utils/notifications.js";

const BASE = document.querySelector(
    'meta[name="announcements-base-url"]',
)?.content;
const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

document.addEventListener("DOMContentLoaded", function () {
    initAnnouncementToggles();
    initAnnouncementDelete();
});

function initAnnouncementToggles() {
    document.querySelectorAll(".announcement-toggle").forEach((toggle) => {
        toggle.addEventListener("change", async function () {
            const announcementId = this.dataset.announcementId;
            const isActive = this.checked;

            try {
                const response = await fetch(
                    `${BASE}/${announcementId}/toggle-status`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN": CSRF,
                            Accept: "application/json",
                        },
                    },
                );

                const data = await response.json();

                if (data.success) {
                    showNotification(data.message, "success");
                    updateAnnouncementBadge(announcementId, data.is_active);
                } else {
                    this.checked = !isActive;
                    showNotification(
                        data.message || "Error al cambiar el estado",
                        "error",
                    );
                }
            } catch (error) {
                console.error("Error toggling announcement:", error);
                this.checked = !isActive;
                showNotification("Error al cambiar el estado", "error");
            }
        });
    });
}

function updateAnnouncementBadge(announcementId, isActive) {
    const item = document.getElementById(`announcement-item-${announcementId}`);
    if (!item) return;

    const badge = item.querySelector(".badge");
    if (!badge) return;

    badge.classList.remove("badge-success", "badge-danger");
    badge.classList.add(isActive ? "badge-success" : "badge-danger");
    badge.textContent = isActive ? "Activo" : "Inactivo";
}

function initAnnouncementDelete() {
    window.confirmDelete = function (announcementId, title) {
        if (typeof window.showConfirmModal !== "function") {
            if (
                confirm(
                    `¿Eliminar "${title}"? Esta acción no se puede deshacer.`,
                )
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
}

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

            const item = document.getElementById(
                `announcement-item-${announcementId}`,
            );
            if (item) {
                item.classList.add("announcement-removing");
                setTimeout(() => {
                    item.remove();
                    if (
                        document.querySelectorAll('[id^="announcement-item-"]')
                            .length === 0
                    ) {
                        window.location.reload();
                    }
                }, 300);
            } else {
                setTimeout(() => {
                    window.location.href = BASE;
                }, 1500);
            }
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
