import "grapesjs/dist/css/grapes.min.css";
import "../css/views/editor/media-modal.css";
import "../css/views/editor/icon-picker-modal.css";
import "../css/views/editor/color-picker-modal.css";

import { EditorService } from "./services/editor-service";
import { EditorState } from "./services/editor-state";
import { EditorNavigation } from "./editor/components/editor-navigation";
import { initializeGrapesJS } from "./editor/grapes-config";
import { addCustomBlocks } from "./editor/custom-blocks";
import { setupEditorEvents } from "./editor/editor-events";
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
    addIconToolbarButton,
    addColorToolbarButton,
} from "./editor/editor-commands";
import { showConfirmModal } from "./editor/utils/modals";

document.addEventListener("DOMContentLoaded", async () => {
    const editorService = new EditorService();
    const editorState = new EditorState();
    new EditorNavigation(editorService);

    const editor = initializeGrapesJS();

    editor.on("load", () => {
        addCustomBlocks(editor);
        translateDynamicUI(editor);
        applyCustomStyles(editor);
        fixButtonTooltips(editor);
        injectCanvasStyles(editor);
        setupEditorCommands(editor);
        setupImageDoubleClick(editor);
        addImageToolbarButton(editor);
        addIconToolbarButton(editor);
        addColorToolbarButton(editor);
        registerDeviceCommands(editor);
        registerCanvasClearCommand(editor);
        injectCanvasFix(editor);

        setTimeout(() => {
            editor.runCommand("sw-visibility");
            editor.Panels.getButton("options", "sw-visibility")?.set(
                "active",
                true,
            );
        }, 100);
    });

    if (editorState.isEditMode) {
        try {
            await editorService.loadPageContent(editor, editorState.loadUrl);
            showNotification("Contenido cargado correctamente", "success");
        } catch (error) {
            showNotification("Error al cargar el contenido", "error");
            console.error(error);
        }
    }

    setupEditorEvents(editor, editorService, editorState);
});

function registerDeviceCommands(editor) {
    const devices = [
        { cmd: "set-device-desktop", device: "Desktop" },
        { cmd: "set-device-tablet", device: "Tablet" },
        { cmd: "set-device-mobile", device: "Mobile" },
    ];

    devices.forEach(({ cmd, device }) => {
        editor.Commands.add(cmd, {
            run: (ed) => {
                ed.setDevice(device);
                devices.forEach(({ cmd: c }) => {
                    ed.Panels.getButton("devices-c", c)?.set(
                        "active",
                        c === cmd,
                    );
                });
            },
        });
    });
}

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

function injectCanvasFix(editor) {
    const iframe = editor.Canvas.getFrameEl();
    if (!iframe?.contentDocument?.head) return;
    const style = iframe.contentDocument.createElement("style");
    style.id = "gjs-dashed-fix";
    style.textContent = `body,body.gjs-dashed{margin:0!important;padding:0 0 160px 0!important;}`;
    iframe.contentDocument.head.appendChild(style);
}

function showNotification(message, type = "info") {
    if (typeof window.showNotification === "function") {
        window.showNotification(message, type);
    }
}
