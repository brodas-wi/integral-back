import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-category-delete-form]").forEach((form) => {
        form.addEventListener("submit", (e) => {
            const count = parseInt(form.dataset.count, 10) || 0;
            if (count > 0) {
                e.preventDefault();
                showNotification(
                    "No puedes eliminar una categoría con activos asociados.",
                    "error",
                );
                return;
            }

            e.preventDefault();
            showConfirmModal({
                title: "¿Eliminar categoría?",
                message: "Esta acción no se puede deshacer.",
                confirmText: "Eliminar",
                cancelText: "Cancelar",
                type: "danger",
                onConfirm: () => form.submit(),
            });
        });
    });
});
