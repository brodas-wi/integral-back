function initDeleteConfirmations() {
    document.querySelectorAll("[data-category-delete]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.categoryDelete;
            const name = btn.dataset.categoryName;
            const url = btn.dataset.deleteUrl;
            const isEditView =
                document.getElementById(`delete-form-${id}`) === null;

            window.showConfirmModal({
                title: "Eliminar categoría",
                message: `¿Estás seguro de eliminar la categoría "${name}"?`,
                confirmText: "Eliminar",
                confirmClass: "btn-danger",
                onConfirm: async () => {
                    try {
                        const response = await axios.delete(url);
                        if (response.data.success) {
                            window.showNotification(
                                "Categoría eliminada correctamente",
                                "success",
                            );
                            const redirectTarget = isEditView
                                ? window.newsCategoriesIndexUrl
                                : null;
                            setTimeout(() => {
                                if (redirectTarget) {
                                    window.location.href = redirectTarget;
                                } else {
                                    window.location.reload();
                                }
                            }, 700);
                        }
                    } catch (error) {
                        window.showNotification(
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

function initToggleStatus() {
    document.querySelectorAll("[data-category-toggle]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const url = btn.dataset.toggleUrl;

            try {
                const response = await axios.patch(url);
                if (response.data.success) {
                    window.showNotification(
                        response.data.is_active
                            ? "Categoría activada"
                            : "Categoría desactivada",
                        "success",
                    );
                    setTimeout(() => window.location.reload(), 700);
                }
            } catch (error) {
                window.showNotification(
                    "No se pudo actualizar el estado",
                    "error",
                );
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initDeleteConfirmations();
    initToggleStatus();
});
