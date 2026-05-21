import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');
const PAGES_INDEX_URL = document.querySelector(
    'meta[name="pages-index-url"]',
)?.content;

document.addEventListener("DOMContentLoaded", () => {
    initTogglePublish();
    initDeletePage();
    initFooterRelation();
    initNavbarRelation();
});

function initTogglePublish() {
    document.querySelectorAll("[data-toggle-publish]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const slug = btn.dataset.slug;
            const isPublished = btn.dataset.published === "1";
            confirmTogglePublish(slug, isPublished);
        });
    });
}

function initDeletePage() {
    document.querySelectorAll("[data-delete-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const slug = btn.dataset.slug;
            const pageTitle = btn.dataset.pageTitle;
            confirmDeletePage(slug, pageTitle);
        });
    });
}

function confirmTogglePublish(slug, isPublished) {
    showConfirmModal({
        title: isPublished ? "¿Despublicar página?" : "¿Publicar página?",
        message: isPublished
            ? "La página dejará de ser visible públicamente."
            : "La página será visible públicamente.",
        confirmText: isPublished ? "Despublicar" : "Publicar",
        cancelText: "Cancelar",
        type: "warning",
        onConfirm: () => submitTogglePublish(slug),
    });
}

async function submitTogglePublish(slug) {
    if (!CSRF) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    try {
        const response = await fetch(buildUrl(`pages/${slug}/toggle-publish`), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
        });

        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");

        if (!response.ok) {
            if (response.status === 401 || response.status === 419) {
                throw new Error("Tu sesión ha expirado. Recarga la página.");
            }
            if (isJson) {
                const error = await response.json();
                throw new Error(
                    error.message || `Error del servidor: ${response.status}`,
                );
            }
            throw new Error(`Error del servidor: ${response.status}`);
        }

        if (!isJson) {
            throw new Error("Respuesta inesperada del servidor");
        }

        const data = await response.json();

        if (data.success) {
            showNotification(data.message, "success");
            setTimeout(() => window.location.reload(), 1000);
        } else {
            throw new Error(data.message || "Error al cambiar el estado");
        }
    } catch (error) {
        console.error("Error:", error);
        showNotification(
            error.message || "Ocurrió un error al cambiar el estado",
            "error",
        );
    }
}

function confirmDeletePage(slug, pageTitle) {
    showConfirmModal({
        title: "¿Eliminar página?",
        message: `¿Estás seguro de que deseas eliminar "${pageTitle}"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deletePage(slug),
    });
}

async function deletePage(slug) {
    if (!CSRF) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    try {
        const response = await fetch(buildUrl(`pages/${slug}`), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
        });

        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");

        if (!response.ok) {
            if (response.status === 401 || response.status === 419) {
                throw new Error("Tu sesión ha expirado. Recarga la página.");
            }
            if (isJson) {
                const error = await response.json();
                throw new Error(
                    error.message || `Error del servidor: ${response.status}`,
                );
            }
            throw new Error(`Error del servidor: ${response.status}`);
        }

        if (!isJson) {
            throw new Error("Respuesta inesperada del servidor");
        }

        const data = await response.json();

        if (data.success) {
            showNotification(data.message, "success");
            setTimeout(() => {
                window.location.href = PAGES_INDEX_URL || buildUrl("pages");
            }, 1000);
        } else {
            throw new Error(data.message || "Error desconocido");
        }
    } catch (error) {
        console.error("Error:", error);
        showNotification(error.message || "Error al eliminar", "error");
    }
}

function initFooterRelation() {
    const btn = document.getElementById("save-footer-relation");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        const select = document.getElementById("footer-select");
        const footerId = select?.value || null;
        const slug =
            document.querySelector("[data-toggle-publish]")?.dataset.slug ||
            window.location.pathname.split("/").filter(Boolean).pop();

        try {
            const res = await fetch(buildUrl(`pages/${slug}/footer`), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                    Accept: "application/json",
                },
                body: JSON.stringify({ footer_id: footerId }),
            });
            const data = await res.json();
            if (data.success) {
                showNotification(data.message, "success");
            } else {
                showNotification(data.message || "Error al guardar", "error");
            }
        } catch (e) {
            showNotification("Error al guardar el footer", "error");
        }
    });
}

function initNavbarRelation() {
    const btn = document.getElementById("save-navbar-relation");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        const select = document.getElementById("navbar-select");
        const navbarId = select?.value || null;
        const slug =
            document.querySelector("[data-toggle-publish]")?.dataset.slug ||
            window.location.pathname.split("/").filter(Boolean).pop();

        try {
            const res = await fetch(buildUrl(`pages/${slug}/navbar`), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                    Accept: "application/json",
                },
                body: JSON.stringify({ navbar_id: navbarId }),
            });
            const data = await res.json();
            if (data.success) {
                showNotification(data.message, "success");
            } else {
                showNotification(data.message || "Error al guardar", "error");
            }
        } catch (e) {
            showNotification("Error al guardar el navbar", "error");
        }
    });
}
