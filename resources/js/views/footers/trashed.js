import { showNotification } from "@/utils/notifications.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

document.addEventListener("DOMContentLoaded", () => {
    initRestore();
    initForceDelete();
});

function initRestore() {
    document.querySelectorAll("[data-restore-footer]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.footerId;
            const name = btn.dataset.footerName;

            window.showConfirmModal({
                title: "Restaurar footer",
                message: `¿Restaurar <strong>"${name}"</strong>? Volverá a estar disponible en el listado.`,
                confirmText: "Restaurar",
                cancelText: "Cancelar",
                type: "success",
                onConfirm: () => doRestore(id),
            });
        });
    });
}

async function doRestore(id) {
    try {
        const res = await fetch(buildUrl(`footers/${id}/restore`), {
            method: "PATCH",
            headers: {
                "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
        });
        const data = await res.json();
        if (data.success) {
            document.getElementById(`trashed-footer-row-${id}`)?.remove();
            showNotification(data.message, "success");
        } else {
            throw new Error(data.message);
        }
    } catch (e) {
        showNotification(e.message || "Error al restaurar", "error");
    }
}

function initForceDelete() {
    document.querySelectorAll("[data-force-delete-footer]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.footerId;
            const name = btn.dataset.footerName;

            window.showConfirmModal({
                title: "Eliminar permanentemente",
                message: `¿Eliminar <strong>"${name}"</strong> de forma permanente? Esta acción no se puede deshacer.`,
                confirmText: "Eliminar permanentemente",
                cancelText: "Cancelar",
                type: "danger",
                onConfirm: () => doForceDelete(id),
            });
        });
    });
}

async function doForceDelete(id) {
    try {
        const res = await fetch(buildUrl(`footers/${id}/force-delete`), {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
        });
        const data = await res.json();
        if (data.success) {
            document.getElementById(`trashed-footer-row-${id}`)?.remove();
            showNotification(data.message, "success");
        } else {
            throw new Error(data.message);
        }
    } catch (e) {
        showNotification(e.message || "Error al eliminar", "error");
    }
}
