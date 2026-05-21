import { EditorService } from "./services/editor-service";
import { initializeNavbarGrapesJS } from "./editor/navbar-grapes-config";
import { initializeNavbarBlock, NAVBAR_RUNTIME_SCRIPT } from "./editor/blocks/navbar-block";
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

    let navbarId = document.getElementById("navbar-id")?.value || "";
    let navbarName = document.getElementById("navbar-name")?.value || "";
    let loadUrl = document.getElementById("navbar-load-url")?.value || "";
    let storeUrl = document.getElementById("navbar-store-url")?.value || "";
    const isActive = document.getElementById("navbar-is-active")?.value === "1";
    let isEditMode = Boolean(navbarId);

    const editor = initializeNavbarGrapesJS();

    initializeNavbarBlock(editor);

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
            showNotification("Navbar cargado correctamente", "success");
        } catch (e) {
            showNotification("Error al cargar el navbar", "error");
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
                if (!isEditMode && !navbarName) {
                    showInputModal({
                        title: "Nombre del Navbar",
                        description:
                            "Ingresa un nombre descriptivo para identificar este navbar.",
                        placeholder: "Ej: Navbar Principal",
                        icon: "ri-file-text-line",
                        iconBg: "#dbeafe",
                        iconColor: "#2563eb",
                        confirmLabel: "Guardar",
                        onConfirm: async (name) => {
                            if (!name?.trim()) {
                                showNotification(
                                    "El nombre es obligatorio",
                                    "error",
                                );
                                btn.disabled = false;
                                btn.innerHTML =
                                    '<i class="ri-save-line"></i><span>Guardar</span>';
                                return;
                            }
                            try {
                                await performSave(name);
                            } catch (e) {
                                showNotification(e.message, "error");
                            } finally {
                                btn.disabled = false;
                                btn.innerHTML =
                                    '<i class="ri-save-line"></i><span>Guardar</span>';
                            }
                        },
                        onCancel: () => {
                            btn.disabled = false;
                            btn.innerHTML =
                                '<i class="ri-save-line"></i><span>Guardar</span>';
                        },
                    });
                } else {
                    await performSave(navbarName);
                    btn.disabled = false;
                    btn.innerHTML =
                        '<i class="ri-save-line"></i><span>Guardar</span>';
                }
            } catch (e) {
                showNotification(e.message, "error");
                btn.disabled = false;
                btn.innerHTML =
                    '<i class="ri-save-line"></i><span>Guardar</span>';
            }
        });

    async function performSave(name) {
        const method = isEditMode ? "PUT" : "POST";
        const content = editorService.getEditorContent(editor);
        if (!content.js_content || content.js_content.trim() === "") {
            content.js_content = NAVBAR_RUNTIME_SCRIPT;
        }
        const data = await editorService.savePage(
            editor,
            { ...content, name, is_active: isActive },
            storeUrl,
            method,
        );

        if (data.success) {
            editorService.markAsClean();
            showNotification(data.message, "success");

            if (!isEditMode && data.navbar) {
                navbarId = data.navbar.id;
                navbarName = data.navbar.name;
                isEditMode = true;

                const idEl = document.getElementById("navbar-id");
                if (idEl) idEl.value = navbarId;

                const nameEl = document.getElementById("navbar-name");
                if (nameEl) nameEl.value = navbarName;

                // Transición del URL
                const appUrlMeta = document.querySelector(
                    'meta[name="app-url"]',
                );
                const baseUrl = appUrlMeta ? appUrlMeta.content : "";

                // Si storeUrl no termina con el id, actualizar
                const newStoreUrl = storeUrl.endsWith("/navbars")
                    ? `${storeUrl}/${navbarId}`
                    : `${storeUrl.replace(/\/navbars\/?$/, "")}/navbars/${navbarId}`;
                storeUrl = newStoreUrl;

                const storeUrlEl = document.getElementById("navbar-store-url");
                if (storeUrlEl) storeUrlEl.value = storeUrl;

                loadUrl = `${storeUrl}/load`;
                const loadUrlEl = document.getElementById("navbar-load-url");
                if (loadUrlEl) loadUrlEl.value = loadUrl;

                // Actualizar el título de la página
                const titleEl = document.getElementById("editor-title");
                if (titleEl) {
                    titleEl.textContent = `Editando Navbar: ${navbarName}`;
                }

                // Cambiar la URL de la ventana sin recargar
                const editPath = `/navbars/edit/${navbarId}/edit`;
                const newUrl = baseUrl ? `${baseUrl}${editPath}` : editPath;
                window.history.replaceState({ path: newUrl }, "", newUrl);
            } else if (name) {
                navbarName = name;
                const nameEl = document.getElementById("navbar-name");
                if (nameEl) nameEl.value = navbarName;

                const titleEl = document.getElementById("editor-title");
                if (titleEl) {
                    titleEl.textContent = `Editando Navbar: ${navbarName}`;
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
                description:
                    "¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",
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
