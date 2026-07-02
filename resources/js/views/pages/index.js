import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

document.addEventListener("DOMContentLoaded", () => {
    initTogglePublish();
    initDeletePage();
    initCopySlug();
});

function initCopySlug() {
    document.querySelectorAll("[data-copy-slug]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const slug = btn.dataset.slug;
            copySlugToClipboard(slug);
        });
    });
}

async function copySlugToClipboard(slug) {
    if (!slug) return;

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(slug);
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = slug;
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.execCommand("copy");
            textarea.remove();
        }
        showNotification("Slug copiado al portapapeles", "success");
    } catch (error) {
        console.error("Error al copiar:", error);
        showNotification("No se pudo copiar el slug", "error");
    }
}

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
            const pageId = btn.dataset.pageId;
            const pageTitle = btn.dataset.pageTitle;
            confirmDeletePage(pageId, pageTitle);
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
                throw new Error(error.message || `Error del servidor: ${response.status}`);
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
        showNotification(error.message || "Ocurrió un error al cambiar el estado", "error");
    }
}

function confirmDeletePage(pageId, pageTitle) {
    showConfirmModal({
        title: "¿Eliminar página?",
        message: `¿Estás seguro de que deseas eliminar "${pageTitle}"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deletePage(pageId),
    });
}

function deletePage(pageId) {
    if (!CSRF) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    const pageItem = document.getElementById(`page-item-${pageId}`);
    const slug = pageItem?.querySelector(".font-mono")?.textContent?.trim();

    if (!slug) {
        showNotification("Error al identificar la página.", "error");
        return;
    }

    showNotification("Eliminando página...", "info");

    fetch(buildUrl(`pages/${slug}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
    })
        .then((response) => {
            const contentType = response.headers.get("content-type") || "";
            if (!contentType.includes("application/json")) {
                throw new Error("Respuesta inválida del servidor");
            }
            if (response.status === 403) {
                return response.json().then((data) => {
                    throw new Error(data.message || "Sin permisos");
                });
            }
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                showNotification(data.message || "Página eliminada", "success");
                if (pageItem) {
                    pageItem.style.transition = "opacity 0.3s, transform 0.3s";
                    pageItem.style.opacity = "0";
                    pageItem.style.transform = "scale(0.9)";
                    setTimeout(() => {
                        pageItem.remove();
                        if (document.querySelectorAll('[id^="page-item-"]').length === 0) {
                            window.location.reload();
                        }
                    }, 300);
                }
            } else {
                throw new Error(data.message || "Error desconocido");
            }
        })
        .catch((error) => {
            let msg = "Error al eliminar. ";
            if (error.message.includes("permisos")) {
                msg += "Contacta al administrador.";
            } else if (error.message.includes("Failed to fetch")) {
                msg += "Verifica tu conexión.";
            } else {
                msg += error.message;
            }
            showNotification(msg, "error");
        });
}
