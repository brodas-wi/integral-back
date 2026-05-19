import { showNotification } from "@/utils/notifications.js";

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;
const RESTORE_BASE = document.querySelector(
    'meta[name="banners-restore-url"]',
)?.content;
const DELETE_BASE = document.querySelector(
    'meta[name="banners-force-delete-url"]',
)?.content;

document.querySelectorAll(".restore-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const name = btn.dataset.name;

        window.showConfirmModal({
            title: "Restaurar banner",
            message: `¿Restaurar <strong>"${name}"</strong>? Volverá a estar disponible pero inactivo.`,
            confirmText: "Restaurar",
            cancelText: "Cancelar",
            type: "success",
            onConfirm: () => restoreBanner(id),
        });
    });
});

document.querySelectorAll(".force-delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const name = btn.dataset.name;

        window.showConfirmModal({
            title: "Eliminar permanentemente",
            message: `¿Eliminar <strong>"${name}"</strong> de forma permanente? Esta acción no se puede deshacer.`,
            confirmText: "Eliminar definitivo",
            cancelText: "Cancelar",
            type: "danger",
            onConfirm: () => forceDeleteBanner(id),
        });
    });
});

function restoreBanner(id) {
    fetch(`${RESTORE_BASE}/${id}/restore`, {
        method: "PATCH",
        headers: { "X-CSRF-TOKEN": CSRF, Accept: "application/json" },
    })
        .then((r) => r.json())
        .then((data) => {
            if (data.success) {
                document.getElementById(`trashed-item-${id}`)?.remove();
                showNotification(data.message, "success");
            }
        })
        .catch(() => showNotification("Error al restaurar.", "error"));
}

function forceDeleteBanner(id) {
    fetch(`${DELETE_BASE}/${id}/force-delete`, {
        method: "DELETE",
        headers: { "X-CSRF-TOKEN": CSRF, Accept: "application/json" },
    })
        .then((r) => r.json())
        .then((data) => {
            if (data.success) {
                document.getElementById(`trashed-item-${id}`)?.remove();
                showNotification(data.message, "success");
            }
        })
        .catch(() => showNotification("Error al eliminar.", "error"));
}
