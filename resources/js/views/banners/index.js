import { showNotification } from "@/utils/notifications.js";

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;
const BASE = document.querySelector('meta[name="banners-delete-url"]')?.content;

document.querySelectorAll(".toggle-status-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const isActive = btn.dataset.active === "1";

        window.showConfirmModal({
            title: isActive ? "Desactivar banner" : "Activar banner",
            message: isActive
                ? "El banner dejará de mostrarse en el sitio."
                : "El banner volverá a mostrarse en el sitio.",
            confirmText: isActive ? "Desactivar" : "Activar",
            cancelText: "Cancelar",
            type: isActive ? "warning" : "success",
            onConfirm: () => toggleStatus(id, btn),
        });
    });
});

async function toggleStatus(id, btn) {
    try {
        const toggleUrl = `${BASE}/${id}/toggle-status`;
        const res = await fetch(toggleUrl, {
            method: "PATCH",
            headers: { "X-CSRF-TOKEN": CSRF, Accept: "application/json" },
        });
        const data = await res.json();
        if (data.success) {
            const icon = btn.querySelector("i");
            const isActive = data.is_active;
            icon.className = isActive
                ? "ri-toggle-fill text-green-500 text-2xl"
                : "ri-toggle-line text-gray-400 text-2xl";
            btn.dataset.active = isActive ? "1" : "0";
            btn.title = isActive ? "Desactivar" : "Activar";

            const item = btn.closest('[id^="banner-item-"]');
            const badge = item?.querySelector(".badge:first-child");
            if (badge) {
                badge.textContent = isActive ? "Activo" : "Inactivo";
                badge.className = `badge ${isActive ? "badge-success" : "badge-danger"}`;
            }
            showNotification(data.message, "success");
        }
    } catch {
        showNotification("Error al cambiar el estado.", "error");
    }
}

document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const name = btn.dataset.name;

        window.showConfirmModal({
            title: `Eliminar banner`,
            message: `¿Estás seguro de que quieres eliminar <strong>"${name}"</strong>? Esta acción no se puede deshacer.`,
            confirmText: "Eliminar",
            cancelText: "Cancelar",
            type: "danger",
            onConfirm: () => deleteBanner(id),
        });
    });
});

document.querySelectorAll(".dropdown-trigger").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        window.toggleDropdown(btn.closest(".dropdown"));
    });
});

function deleteBanner(id) {
    fetch(`${BASE}/${id}`, {
        method: "DELETE",
        headers: { "X-CSRF-TOKEN": CSRF, Accept: "application/json" },
    })
        .then((r) => r.json())
        .then((data) => {
            if (data.success ?? true) {
                document.getElementById(`banner-item-${id}`)?.remove();
                showNotification("Banner eliminado.", "success");
            }
        })
        .catch(() => showNotification("Error al eliminar.", "error"));
}
