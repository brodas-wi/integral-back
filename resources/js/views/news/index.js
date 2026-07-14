function initDeleteConfirmations() {
    document.querySelectorAll("[data-news-delete]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.newsDelete;
            const title = btn.dataset.newsTitle;
            const form = document.getElementById(`delete-form-${id}`);

            window.showConfirmModal({
                title: "Eliminar noticia",
                message: `¿Estás seguro de eliminar la noticia "${title}"? Esta acción no se puede deshacer.`,
                confirmText: "Eliminar",
                confirmClass: "btn-danger",
                onConfirm: () => {
                    if (form) {
                        form.submit();
                    } else {
                        window.location.href = window.newsIndexUrl;
                    }
                },
            });
        });
    });
}

function initToggleStatus() {
    document.querySelectorAll("[data-news-toggle]").forEach((btn) => {
        btn.addEventListener("click", async () => {
            const id = btn.dataset.newsToggle;
            const url = btn.dataset.toggleUrl;

            try {
                const response = await axios.patch(url);
                if (response.data.success) {
                    window.showNotification(
                        response.data.is_active
                            ? "Noticia activada"
                            : "Noticia desactivada",
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
