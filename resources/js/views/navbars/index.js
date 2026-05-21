import { showNotification } from "@/utils/notifications.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

document.addEventListener("DOMContentLoaded", () => {
    initToggleActive();
    initDelete();
    initDropdowns();
});

function initDropdowns() {
    document
        .querySelectorAll("[data-dropdown] .dropdown-trigger")
        .forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                if (typeof window.toggleDropdown === "function") {
                    window.toggleDropdown(btn.closest("[data-dropdown]"));
                }
            });
        });
}

function initToggleActive() {
    document.querySelectorAll("[data-toggle-active]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.navbarId;
            const isActive = btn.dataset.active === "1";
            const pageCount = parseInt(btn.dataset.pageCount || "0");

            if (isActive && pageCount > 0) {
                window.showConfirmModal({
                    title: "Desactivar navbar en uso",
                    message: `Este navbar está vinculado a <strong>${pageCount} página(s)</strong>. ¿Seguro que deseas desactivarlo?`,
                    confirmText: "Desactivar",
                    cancelText: "Cancelar",
                    type: "warning",
                    onConfirm: () => doToggle(id, btn),
                });
                return;
            }

            window.showConfirmModal({
                title: isActive ? "Desactivar navbar" : "Activar navbar",
                message: isActive
                    ? "El navbar dejará de mostrarse en el sitio."
                    : "El navbar volverá a mostrarse en el sitio.",
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
        const res = await fetch(buildUrl(`navbars/${id}/toggle-active`), {
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
            if (res.status === 401 || res.status === 419)
                throw new Error("Sesión expirada.");
            if (contentType.includes("application/json")) {
                const err = await res.json();
                throw new Error(err.message || `Error ${res.status}`);
            }
            throw new Error(`Error ${res.status}`);
        }

        if (!contentType.includes("application/json"))
            throw new Error("Respuesta inesperada");

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

            const badge = document.getElementById(`navbar-badge-${id}`);
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
    }
}

function initDelete() {
    document.querySelectorAll("[data-delete-navbar]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.navbarId;
            const name = btn.dataset.navbarName;
            const pageCount = parseInt(btn.dataset.pageCount || "0");

            if (pageCount > 0) {
                showNotification(
                    `No se puede eliminar: este navbar está vinculado a ${pageCount} página(s). Desvincula las páginas primero.`,
                    "error",
                );
                return;
            }

            window.showConfirmModal({
                title: "Mover a papelera",
                message: `¿Mover <strong>"${name}"</strong> a la papelera? Podrás recuperarlo después.`,
                confirmText: "Mover a papelera",
                cancelText: "Cancelar",
                type: "warning",
                onConfirm: () => doDelete(id, btn),
            });
        });
    });
}

async function doDelete(id, btn) {
    try {
        const res = await fetch(buildUrl(`navbars/${id}`), {
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
            document.getElementById(`navbar-row-${id}`)?.remove();
            showNotification(data.message, "success");
        } else {
            throw new Error(data.message);
        }
    } catch (e) {
        showNotification(e.message || "Error al eliminar", "error");
    }
}
