import { showNotification } from "@/utils/notifications.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

document.addEventListener("DOMContentLoaded", () => {
    initToggleActive();
});

function initToggleActive() {
    document.querySelectorAll("[data-toggle-active]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.footerId;
            const isActive = btn.dataset.active === "1";

            window.showConfirmModal({
                title: isActive ? "Desactivar footer" : "Activar footer",
                message: isActive
                    ? "El footer dejará de mostrarse en el sitio."
                    : "El footer volverá a mostrarse en el sitio.",
                confirmText: isActive ? "Desactivar" : "Activar",
                cancelText: "Cancelar",
                type: isActive ? "warning" : "success",
                onConfirm: () => doToggle(id, btn),
            });
        });
    });
}

async function doToggle(id, btn) {
    try {
        const res = await fetch(buildUrl(`footers/${id}/toggle-active`), {
            method: "PATCH",
            headers: {
                "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
        });

        const contentType = res.headers.get("content-type") || "";
        if (!res.ok) {
            if (res.status === 401 || res.status === 419) {
                throw new Error("Tu sesión ha expirado. Recarga la página.");
            }
            if (contentType.includes("application/json")) {
                const err = await res.json();
                throw new Error(err.message || `Error ${res.status}`);
            }
            throw new Error(`Error del servidor: ${res.status}`);
        }

        if (!contentType.includes("application/json")) {
            throw new Error("Respuesta inesperada del servidor");
        }

        const data = await res.json();

        if (data.success) {
            const nowActive = data.is_active;
            const icon = btn.querySelector("i");

            if (icon) {
                icon.className = nowActive
                    ? "ri-toggle-fill text-green-500 text-2xl"
                    : "ri-toggle-line text-gray-400 text-2xl";
            }

            btn.dataset.active = nowActive ? "1" : "0";
            btn.title = nowActive ? "Desactivar" : "Activar";

            const badge = document.getElementById(`footer-badge-${id}`);
            if (badge) {
                badge.textContent = nowActive ? "Activo" : "Inactivo";
                badge.className = `badge ${nowActive ? "badge-success" : "badge-danger"}`;
            }

            showNotification(data.message, "success");
        } else {
            throw new Error(data.message || "Error desconocido");
        }
    } catch (e) {
        showNotification(e.message || "Error al cambiar estado", "error");
        console.error(e);
    }
}
