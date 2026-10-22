import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";
import { copyText } from "@/utils/clipboard.js";

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

async function send(method, path, body = null) {
    if (!CSRF) throw new Error("Error de configuración. Recarga la página.");

    const response = await fetch(buildUrl(path), {
        method,
        headers: {
            "X-CSRF-TOKEN": CSRF,
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...(body ? { "Content-Type": "application/json" } : {}),
        },
        credentials: "same-origin",
        body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401 || response.status === 419) {
        throw new Error("Tu sesión ha expirado. Recarga la página.");
    }

    const data = await response.json().catch(() => ({}));

    if (!response.ok || !data.success) {
        const first = data.errors ? Object.values(data.errors)[0]?.[0] : null;
        throw new Error(first || data.message || `Error del servidor: ${response.status}`);
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

function askDuplicateName(defaultName) {
    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.className = "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4";
        overlay.innerHTML = `
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4" role="dialog" aria-modal="true">
                <div>
                    <h3 class="text-lg font-bold text-secondary">Duplicar formulario</h3>
                    <p class="text-sm text-gray-600 mt-1">Se copia solo la estructura. Las respuestas no se copian y la copia queda inactiva.</p>
                </div>
                <div>
                    <label class="block text-xs font-medium text-gray-700 mb-1" for="dup-name">Nombre de la copia</label>
                    <input type="text" id="dup-name" maxlength="150" class="input-field">
                    <p id="dup-error" class="text-xs text-red-600 mt-1 hidden"></p>
                </div>
                <div class="flex justify-end gap-2">
                    <button type="button" data-cancel class="btn-outline btn-sm">Cancelar</button>
                    <button type="button" data-accept class="btn-primary btn-sm">Duplicar</button>
                </div>
            </div>`;
        document.body.append(overlay);

        const input = overlay.querySelector("#dup-name");
        const error = overlay.querySelector("#dup-error");
        input.value = `${defaultName} (copia)`.slice(0, 150);
        input.focus();
        input.select();

        const finish = (value) => {
            document.removeEventListener("keydown", onKey, true);
            overlay.remove();
            resolve(value);
        };
        const accept = () => {
            const value = input.value.trim();
            if (!value) {
                error.textContent = "Escribe un nombre para la copia.";
                error.classList.remove("hidden");
                return;
            }
            finish(value);
        };
        const onKey = (event) => {
            if (event.key === "Escape") finish(null);
            if (event.key === "Enter") {
                event.preventDefault();
                accept();
            }
        };

        document.addEventListener("keydown", onKey, true);
        overlay.querySelector("[data-cancel]").addEventListener("click", () => finish(null));
        overlay.querySelector("[data-accept]").addEventListener("click", accept);
        overlay.addEventListener("mousedown", (event) => {
            if (event.target === overlay) finish(null);
        });
    });
}

async function duplicateForm(id, name) {
    const newName = await askDuplicateName(name);
    if (!newName) return;

    try {
        const data = await send("POST", `forms/${id}/duplicate`, { name: newName });
        window.location.href = data.redirect;
    } catch (error) {
        showNotification(error.message || "No se pudo duplicar el formulario", "error");
    }
}

function confirmRestore(id, name) {
    showConfirmModal({
        title: "¿Restaurar formulario?",
        message: `"${name}" volverá al listado, inactivo. Podrás activarlo cuando quieras.`,
        confirmText: "Restaurar",
        cancelText: "Cancelar",
        type: "warning",
        onConfirm: () => run("PATCH", `forms/${id}/restore`),
    });
}

function confirmForceDelete(id, name) {
    showConfirmModal({
        title: "¿Eliminar formulario?",
        message: `"${name}" se eliminará definitivamente junto con sus versiones. Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => run("DELETE", `forms/${id}/permanent`),
    });
}

document.addEventListener("click", async (event) => {
    const restore = event.target.closest("[data-restore-form]");
    if (restore) {
        confirmRestore(restore.dataset.formId, restore.dataset.formName);
        return;
    }

    const duplicate = event.target.closest("[data-duplicate-form]");
    if (duplicate) {
        duplicateForm(duplicate.dataset.formId, duplicate.dataset.formName);
        return;
    }

    const forceDelete = event.target.closest("[data-force-delete]");
    if (forceDelete) {
        confirmForceDelete(forceDelete.dataset.formId, forceDelete.dataset.formName);
        return;
    }
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