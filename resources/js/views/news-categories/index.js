import { buildUrl } from "@/utils/url.js";
import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";

function getRedirectUrl() {
    const pageData = document.getElementById("news-category-page-data");
    return pageData ? pageData.dataset.redirectUrl : null;
}

function initDropdowns() {
    document.querySelectorAll("[data-dropdown-toggle]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const dropdown = btn.closest("[data-dropdown]");
            if (dropdown) {
                window.toggleDropdown(dropdown);
            }
        });
    });
}

function initToggleStatus() {
    document.querySelectorAll("[data-category-toggle]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.categoryId;
            const url = buildUrl(`news-categories/${id}/toggle-status`);

            try {
                const response = await axios.patch(url);
                if (response.data.success) {
                    showNotification(
                        response.data.is_active
                            ? "Categoría activada"
                            : "Categoría desactivada",
                        "success",
                    );
                    setTimeout(() => window.location.reload(), 700);
                }
            } catch (error) {
                showNotification("No se pudo actualizar el estado", "error");
            }
        });
    });
}

function initDeleteConfirmations() {
    document.querySelectorAll("[data-category-delete]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.categoryId;
            const name = btn.dataset.categoryName;
            const shouldRedirect = "categoryRedirect" in btn.dataset;
            const url = buildUrl(`news-categories/${id}`);

            showConfirmModal({
                title: "Eliminar categoría",
                message: `¿Estás seguro de eliminar la categoría "${name}"?`,
                confirmText: "Eliminar",
                confirmClass: "btn-danger",
                onConfirm: async () => {
                    try {
                        const response = await axios.delete(url);
                        if (response.data.success) {
                            showNotification(
                                "Categoría eliminada correctamente",
                                "success",
                            );
                            setTimeout(() => {
                                const redirectUrl = getRedirectUrl();
                                if (shouldRedirect && redirectUrl) {
                                    window.location.href = redirectUrl;
                                } else {
                                    window.location.reload();
                                }
                            }, 700);
                        }
                    } catch (error) {
                        showNotification(
                            error.response?.data?.message ||
                            "No se pudo eliminar la categoría",
                            "error",
                        );
                    }
                },
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initDropdowns();
    initDeleteConfirmations();
    initToggleStatus();
});