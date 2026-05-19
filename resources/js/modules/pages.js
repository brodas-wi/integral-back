import { showNotification } from "../utils/notifications.js";
import { showConfirmModal } from "../utils/modals.js";

// Toggle publish status of page
export function togglePublishStatus(slug, currentStatus) {
    if (typeof window.showConfirmModal !== "function") {
        if (
            confirm(
                currentStatus ? "¿Despublicar página?" : "¿Publicar página?",
            )
        ) {
            submitTogglePublish(slug, currentStatus);
        }
        return;
    }

    showConfirmModal({
        title: currentStatus ? "¿Despublicar página?" : "¿Publicar página?",
        message: currentStatus
            ? "La página dejará de ser visible públicamente."
            : "La página será visible públicamente.",
        confirmText: currentStatus ? "Despublicar" : "Publicar",
        cancelText: "Cancelar",
        type: "warning",
        onConfirm: () => submitTogglePublish(slug, currentStatus),
    });
}

// Submit toggle publish request via AJAX
async function submitTogglePublish(slug, currentStatus) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]');

    if (!csrfToken) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    try {
        const response = await fetch(`/pages/${slug}/toggle-publish`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken.getAttribute("content"),
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
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

// Confirm delete page action
export function confirmDeletePage(pageId, pageTitle) {
    if (typeof window.showConfirmModal !== "function") {
        if (
            confirm(
                `¿Eliminar "${pageTitle}"? Esta acción no se puede deshacer.`,
            )
        ) {
            deletePage(pageId, pageTitle);
        }
        return;
    }

    showConfirmModal({
        title: "¿Eliminar página?",
        message: `¿Estás seguro de que deseas eliminar "${pageTitle}"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deletePage(pageId, pageTitle),
    });
}

// Delete page via AJAX
export function deletePage(pageId, pageTitle) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]');

    if (!csrfToken) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    const pageItem = document.getElementById(`page-item-${pageId}`);
    const slug = pageItem
        ? pageItem.querySelector(".font-mono").textContent
        : null;

    if (!slug) {
        showNotification("Error al identificar la página.", "error");
        return;
    }

    showNotification("Eliminando página...", "info");

    fetch(`/pages/${slug}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
    })
        .then((response) => {
            if (
                !response.headers
                    .get("content-type")
                    ?.includes("application/json")
            ) {
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
                        if (
                            document.querySelectorAll('[id^="page-item-"]')
                                .length === 0
                        ) {
                            window.location.reload();
                        }
                    }, 300);
                }
            } else {
                throw new Error(data.message || "Error desconocido");
            }
        })
        .catch((error) => {
            let errorMessage = "Error al eliminar. ";

            if (error.message.includes("permisos")) {
                errorMessage += "Contacta al administrador.";
            } else if (error.message.includes("Failed to fetch")) {
                errorMessage += "Verifica tu conexión.";
            } else {
                errorMessage += error.message;
            }

            showNotification(errorMessage, "error");
        });
}
