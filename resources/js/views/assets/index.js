import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

let busy = false;

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-toggle-asset]").forEach((btn) => {
        btn.addEventListener("click", () => toggleAsset(btn.dataset.id, btn));
    });

    document.querySelectorAll("[data-delete-asset]").forEach((btn) => {
        btn.addEventListener("click", () => {
            showConfirmModal({
                title: "¿Eliminar activo extraordinario?",
                message: `¿Estás seguro de que deseas eliminar "${escapeHtml(btn.dataset.name)}"? Esta acción no se puede deshacer.`,
                confirmText: "Eliminar",
                cancelText: "Cancelar",
                type: "danger",
                onConfirm: () => deleteAsset(btn.dataset.id),
            });
        });
    });
});

async function request(path, method) {
    if (!CSRF) throw new Error("Error de configuración. Recarga la página.");

    const response = await fetch(buildUrl(path), {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        if (response.status === 419) throw new Error("Tu sesión expiró. Recarga la página.");
        throw new Error(data.message || `Error del servidor: ${response.status}`);
    }
    if (data.success === false) throw new Error(data.message || "No se pudo completar la acción");
    return data;
}

function paintStatus(id, btn, active) {
    btn.dataset.active = active ? "1" : "0";

    const icon = btn.querySelector("i");
    if (icon) icon.className = `ri-${active ? "eye-off" : "eye"}-line`;
    const label = btn.querySelector("[data-toggle-label]");
    if (label) label.textContent = active ? "Desactivar" : "Activar";

    const card = document.getElementById(`asset-item-${id}`);
    const badge = card?.querySelector("[data-asset-status]");
    if (!badge) return;

    badge.classList.toggle("badge-success", active);
    badge.classList.toggle("badge-warning", !active);
    const badgeIcon = badge.querySelector("i");
    if (badgeIcon) badgeIcon.className = `ri-${active ? "eye" : "eye-off"}-line mr-1`;
    const text = badge.querySelector("[data-asset-status-text]");
    if (text) text.textContent = active ? "Activo" : "Inactivo";
}

async function toggleAsset(id, btn) {
    if (busy) return;
    busy = true;

    try {
        const data = await request(`assets/${id}/toggle-status`, "PATCH");
        paintStatus(id, btn, Boolean(data.is_active));
        showNotification(data.message, "success");
    } catch (error) {
        showNotification(error.message || "Ocurrió un error", "error");
    } finally {
        busy = false;
    }
}

async function deleteAsset(id) {
    if (busy) return;
    busy = true;

    try {
        const data = await request(`assets/${id}`, "DELETE");
        showNotification(data.message, "success");

        const item = document.getElementById(`asset-item-${id}`);
        if (!item) {
            window.location.reload();
            return;
        }

        item.style.transition = "opacity 0.3s, transform 0.3s";
        item.style.opacity = "0";
        item.style.transform = "scale(0.9)";

        setTimeout(() => {
            item.remove();
            if (document.querySelectorAll('[id^="asset-item-"]').length > 0) return;

            const url = new URL(window.location.href);
            const page = parseInt(url.searchParams.get("page") || "1", 10);
            if (page > 1) {
                url.searchParams.set("page", page - 1);
                window.location.href = url.toString();
            } else {
                window.location.reload();
            }
        }, 300);
    } catch (error) {
        showNotification(error.message || "Error al eliminar", "error");
    } finally {
        busy = false;
    }
}