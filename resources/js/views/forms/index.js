import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";
import { copyText } from "@/utils/clipboard.js";

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

async function send(method, path) {
    if (!CSRF) throw new Error("Error de configuración. Recarga la página.");

    const response = await fetch(buildUrl(path), {
        method,
        headers: {
            "X-CSRF-TOKEN": CSRF,
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
    });

    if (response.status === 401 || response.status === 419) {
        throw new Error("Tu sesión ha expirado. Recarga la página.");
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
        throw new Error(data.message || `Error del servidor: ${response.status}`);
    }

    return data;
}

async function run(method, path) {
    try {
        const data = await send(method, path);
        showNotification(data.message, "success");
        setTimeout(() => window.location.reload(), 900);
    } catch (error) {
        showNotification(error.message || "Ocurrió un error", "error");
    }
}

function confirmToggle(id, isActive) {
    showConfirmModal({
        title: isActive ? "¿Desactivar formulario?" : "¿Activar formulario?",
        message: isActive
            ? "El formulario dejará de abrirse en la página pública."
            : "El formulario volverá a abrirse en la página pública.",
        confirmText: isActive ? "Desactivar" : "Activar",
        cancelText: "Cancelar",
        type: "warning",
        onConfirm: () => run("PATCH", `forms/${id}/toggle-active`),
    });
}

function confirmArchive(id, name) {
    showConfirmModal({
        title: "¿Archivar formulario?",
        message: `"${name}" dejará de mostrarse. Sus respuestas y versiones se conservan.`,
        confirmText: "Archivar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => run("DELETE", `forms/${id}`),
    });
}

document.addEventListener("click", async (event) => {
    const copy = event.target.closest("[data-copy-slug]");
    if (copy) {
        const copied = await copyText(copy.dataset.slug);
        showNotification(
            copied ? "Slug copiado al portapapeles" : "No se pudo copiar el slug",
            copied ? "success" : "error",
        );
        return;
    }

    const toggle = event.target.closest("[data-toggle-form]");
    if (toggle) {
        confirmToggle(toggle.dataset.formId, toggle.dataset.active === "1");
        return;
    }

    const archive = event.target.closest("[data-delete-form]");
    if (archive) {
        confirmArchive(archive.dataset.formId, archive.dataset.formName);
    }
});