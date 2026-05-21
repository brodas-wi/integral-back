import { EditorService } from "./services/editor-service";
import { initializeFooterGrapesJS } from "./editor/footer-grapes-config";
import { initializeFooterBlock } from "./editor/blocks/footer-block";
import {
    applyCustomStyles,
    translateDynamicUI,
    fixButtonTooltips,
    injectCanvasStyles,
} from "./editor/ui-customization";
import {
    setupEditorCommands,
    setupImageDoubleClick,
    addImageToolbarButton,
} from "./editor/editor-commands";
import { showConfirmModal, showInputModal } from "./editor/utils/modals";

document.addEventListener("DOMContentLoaded", async () => {
    const editorService = new EditorService();

    let footerId = document.getElementById("footer-id")?.value || "";
    let footerName = document.getElementById("footer-name")?.value || "";
    let loadUrl = document.getElementById("footer-load-url")?.value || "";
    let storeUrl = document.getElementById("footer-store-url")?.value || "";
    const isActive = document.getElementById("footer-is-active")?.value === "1";
    let isEditMode = Boolean(footerId);

    const editor = initializeFooterGrapesJS();

    initializeFooterBlock(editor);

    editor.on("load", () => {
        translateDynamicUI(editor);
        applyCustomStyles(editor);
        fixButtonTooltips(editor);
        injectCanvasStyles(editor);
        setupEditorCommands(editor);
        setupImageDoubleClick(editor);
        addImageToolbarButton(editor);
        registerCanvasClearCommand(editor);

        setTimeout(() => {
            editor.runCommand("sw-visibility");
            editor.Panels.getButton("options", "sw-visibility")?.set(
                "active",
                true,
            );
        }, 100);
    });

    if (isEditMode && loadUrl) {
        try {
            await editorService.loadPageContent(editor, loadUrl);
            showNotification("Footer cargado correctamente", "success");
        } catch (e) {
            showNotification("Error al cargar el footer", "error");
        }
    }

    // Guardar
    document
        .getElementById("save-button")
        ?.addEventListener("click", async () => {
            const btn = document.getElementById("save-button");
            btn.disabled = true;
            btn.innerHTML =
                '<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';

            try {
                if (!isEditMode && !footerName) {
                    showInputModal({
                        title: "Nombre del Footer",
                        description: "Ingresa un nombre descriptivo para identificar este footer.",
                        placeholder: "Ej: Footer Principal",
                        icon: "ri-file-text-line",
                        iconBg: "#dbeafe",
                        iconColor: "#2563eb",
                        confirmLabel: "Guardar",
                        onConfirm: async (name) => {
                            if (!name?.trim()) {
                                showNotification("El nombre es obligatorio", "error");
                                btn.disabled = false;
                                btn.innerHTML = '<i class="ri-save-line"></i><span>Guardar</span>';
                                return;
                            }
                            try {
                                await performSave(name);
                            } catch (e) {
                                showNotification(e.message, "error");
                            } finally {
                                btn.disabled = false;
                                btn.innerHTML = '<i class="ri-save-line"></i><span>Guardar</span>';
                            }
                        },
                        onCancel: () => {
                            btn.disabled = false;
                            btn.innerHTML = '<i class="ri-save-line"></i><span>Guardar</span>';
                        }
                    });
                } else {
                    await performSave(footerName);
                    btn.disabled = false;
                    btn.innerHTML = '<i class="ri-save-line"></i><span>Guardar</span>';
                }
            } catch (e) {
                showNotification(e.message, "error");
                btn.disabled = false;
                btn.innerHTML = '<i class="ri-save-line"></i><span>Guardar</span>';
            }
        });

    async function performSave(name) {
        const method = isEditMode ? "PUT" : "POST";
        const content = editorService.getEditorContent(editor);
        const data = await editorService.savePage(
            editor,
            { ...content, name, is_active: isActive },
            storeUrl,
            method,
        );

        if (data.success) {
            editorService.markAsClean();
            showNotification(data.message, "success");

            if (!isEditMode && data.footer) {
                footerId = data.footer.id;
                footerName = data.footer.name;
                isEditMode = true;

                const idEl = document.getElementById("footer-id");
                if (idEl) idEl.value = footerId;

                const nameEl = document.getElementById("footer-name");
                if (nameEl) nameEl.value = footerName;

                // Transición del URL
                const appUrlMeta = document.querySelector('meta[name="app-url"]');
                const baseUrl = appUrlMeta ? appUrlMeta.content : "";
                
                // Si storeUrl no termina con el id, actualizar
                const newStoreUrl = storeUrl.endsWith("/footers") ? `${storeUrl}/${footerId}` : `${storeUrl.replace(/\/footers\/?$/, "")}/footers/${footerId}`;
                storeUrl = newStoreUrl;
                
                const storeUrlEl = document.getElementById("footer-store-url");
                if (storeUrlEl) storeUrlEl.value = storeUrl;

                loadUrl = `${storeUrl}/load`;
                const loadUrlEl = document.getElementById("footer-load-url");
                if (loadUrlEl) loadUrlEl.value = loadUrl;

                // Actualizar el título de la página
                const titleEl = document.getElementById("editor-title");
                if (titleEl) {
                    titleEl.textContent = `Editando Footer: ${footerName}`;
                }

                // Cambiar la URL de la ventana sin recargar
                const editPath = `/footers/${footerId}/edit`;
                const newUrl = baseUrl ? `${baseUrl}${editPath}` : editPath;
                window.history.replaceState({ path: newUrl }, "", newUrl);
            } else if (name) {
                footerName = name;
                const nameEl = document.getElementById("footer-name");
                if (nameEl) nameEl.value = footerName;

                const titleEl = document.getElementById("editor-title");
                if (titleEl) {
                    titleEl.textContent = `Editando Footer: ${footerName}`;
                }
            }
        }
    }
});

function registerCanvasClearCommand(editor) {
    editor.Commands.add("canvas-clear", {
        run: (ed) => {
            showConfirmModal({
                title: "Limpiar canvas",
                description: "¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",
                icon: "ri-delete-bin-line",
                iconBg: "#fef2f2",
                iconColor: "#dc2626",
                confirmLabel: "Limpiar todo",
                confirmColor: "#dc2626",
                onConfirm: () => {
                    ed.DomComponents.clear();
                    ed.CssComposer.clear();
                },
            });
        },
    });
}

function showNotification(message, type = "info") {
    if (typeof window.showNotification === "function")
        window.showNotification(message, type);
}
