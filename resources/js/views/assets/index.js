import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

document.addEventListener("DOMContentLoaded", () => {
    initToggleAsset();
    initDeleteAsset();
});

function initToggleAsset() {
    document.querySelectorAll("[data-toggle-asset]").forEach((btn) => {
        btn.addEventListener("click", () => toggleAsset(btn.dataset.id, btn));
    });
}

function initDeleteAsset() {
    document.querySelectorAll("[data-delete-asset]").forEach((btn) => {
        btn.addEventListener("click", () => {
            showConfirmModal({
                title: "¿Eliminar activo extraordinario?",
                message: `¿Estás seguro de que deseas eliminar "${btn.dataset.name}"? Esta acción no se puede deshacer.`,
                confirmText: "Eliminar",
                cancelText: "Cancelar",
                type: "danger",
                onConfirm: () => deleteAsset(btn.dataset.id),
            });
        });
    });
}

async function toggleAsset(id, btn) {
    if (!CSRF) return;

    try {
        const response = await fetch(buildUrl(`assets/${id}/toggle-status`), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
        });

        if (!response.ok)
            throw new Error(`Error del servidor: ${response.status}`);

        const data = await response.json();
        if (data.success) {
            showNotification(data.message, "success");
            setTimeout(() => window.location.reload(), 800);
        } else {
            throw new Error(data.message || "Error al cambiar el estado");
        }
    } catch (error) {
        showNotification(error.message || "Ocurrió un error", "error");
    }
}

function deleteAsset(id) {
    if (!CSRF) return;

    fetch(buildUrl(`assets/${id}`), {
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
            if (data.success) {
                showNotification(data.message, "success");
                const item = document.getElementById(`asset-item-${id}`);
                if (item) {
                    item.style.transition = "opacity 0.3s, transform 0.3s";
                    item.style.opacity = "0";
                    item.style.transform = "scale(0.9)";
                    setTimeout(() => item.remove(), 300);
                }
            } else {
                throw new Error(data.message || "Error desconocido");
            }
        })
        .catch((error) =>
            showNotification(error.message || "Error al eliminar", "error"),
        );
}
