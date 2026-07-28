import { showInputModal, showConfirmModal } from "./utils/modals";

function showSessionExpiredModal() {
    const reload = () => window.location.reload();

    showConfirmModal({
        title: "Tu sesión ha expirado",
        description:
            "No se pudo guardar porque tu sesión terminó. Tu contenido se respaldó en este navegador; al recargar e iniciar sesión de nuevo se te ofrecerá recuperarlo.",
        icon: "ri-time-line",
        iconBg: "#fef3c7",
        iconColor: "#d97706",
        confirmLabel: "Recargar página",
        confirmColor: "#d97706",
        cancelLabel: "Recargar página",
        onConfirm: reload,
        onCancel: reload,
    });
}

export function setupEditorEvents(editor, editorService, editorState) {
    editor.on("component:add", () => editorService.markAsDirty());
    editor.on("component:remove", () => editorService.markAsDirty());
    editor.on("component:update", () => editorService.markAsDirty());
    editor.on("style:update", () => editorService.markAsDirty());

    const saveButton = document.getElementById("save-button");
    if (saveButton) {
        saveButton.addEventListener("click", async () => {
            await handleSave(editor, editorService, editorState, saveButton);
        });
    }

    document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
            e.preventDefault();
            if (saveButton && !saveButton.disabled) saveButton.click();
        }
    });
}

async function handleSave(editor, editorService, editorState, saveButton) {
    saveButton.disabled = true;
    saveButton.innerHTML =
        '<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';

    try {
        if (editorState.needsTitle()) {
            await showTitleModalAndSave(editor, editorService, editorState);
        } else {
            await savePageContent(editor, editorService, editorState);
        }
    } catch (error) {
        if (error.isSessionExpired) {
            showSessionExpiredModal();
        } else {
            showNotification(error.message, "error");
        }
    } finally {
        saveButton.disabled = false;
        saveButton.innerHTML =
            '<i class="ri-save-line"></i><span>Guardar</span>';
    }
}

async function showTitleModalAndSave(editor, editorService, editorState) {
    return new Promise((resolve, reject) => {
        showInputModal({
            title: "Título de la Página",
            description: "Ingresa un título descriptivo para identificar esta página",
            placeholder: "Ej: Acerca de Nosotros",
            icon: "ri-file-text-line",
            iconBg: "#dbeafe",
            iconColor: "#2563eb",
            confirmLabel: "Guardar",
            onConfirm: async (title) => {
                if (!title?.trim()) {
                    reject(new Error("El título es obligatorio"));
                    return;
                }
                try {
                    await savePageContent(
                        editor,
                        editorService,
                        editorState,
                        title,
                    );
                    resolve();
                } catch (error) {
                    reject(error);
                }
            },
            onCancel: () => {
                reject(new Error("Guardado cancelado"));
            }
        });
    });
}

async function savePageContent(
    editor,
    editorService,
    editorState,
    title = null,
) {
    const content = editorService.getEditorContent(editor);
    const payload = { ...content, is_published: editorState.isPublished };
    if (title) payload.title = title;

    const data = await editorService.savePage(
        editor,
        payload,
        editorState.storeUrl,
        editorState.getHttpMethod(),
    );

    if (data.success) {
        editorService.markAsClean();
        showNotification(data.message, "success");
        if (!editorState.isEditMode && data.page) {
            editorState.updatePageInfo(data);
            editorState.updateTitle(data.page.title);
        } else if (title) {
            editorState.updateTitle(title);
        }
    }
}



function showNotification(message, type) {
    if (typeof window.showNotification === "function") {
        window.showNotification(message, type);
    }
}
