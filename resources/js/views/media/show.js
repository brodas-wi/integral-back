import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";

document.addEventListener("DOMContentLoaded", () => {
    initCopyMediaUrl();
    initDeleteMediaShow();
});

function initCopyMediaUrl() {
    const btn = document.querySelector("[data-copy-media-url]");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const urlInput = document.getElementById("file-url");
        if (!urlInput) return;

        urlInput.select();
        urlInput.setSelectionRange(0, 99999);

        navigator.clipboard
            .writeText(urlInput.value)
            .then(() => {
                showNotification("URL copiada al portapapeles", "success");
            })
            .catch(() => {
                document.execCommand("copy");
                showNotification("URL copiada al portapapeles", "success");
            });
    });
}

function initDeleteMediaShow() {
    const btn = document.querySelector("[data-delete-media-show]");
    if (!btn) return;

    btn.addEventListener("click", () => {
        showConfirmModal({
            title: "¿Eliminar archivo?",
            message: "¿Estás seguro de que deseas eliminar este archivo? Esta acción no se puede deshacer.",
            confirmText: "Eliminar",
            cancelText: "Cancelar",
            type: "danger",
            onConfirm: () => {
                document.getElementById("delete-form").submit();
            },
        });
    });
}