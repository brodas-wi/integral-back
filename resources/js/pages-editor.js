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
            showConfirmModal(
                "Limpiar canvas",
                "¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",
                "ri-delete-bin-line",
                "#fef2f2",
                "#dc2626",
                "Limpiar todo",
                "#dc2626",
                () => {
                    ed.DomComponents.clear();
                    ed.CssComposer.clear();
                },
            );
        },
    });
}

function showConfirmModal(
    title,
    description,
    icon,
    iconBg,
    iconColor,
    confirmLabel,
    confirmColor,
    onConfirm,
) {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position:fixed;inset:0;z-index:9999;
        display:flex;align-items:center;justify-content:center;
        padding:1rem;background:rgba(0,0,0,0.5);
    `;

    const box = document.createElement("div");
    box.style.cssText = `
        background:#ffffff;border-radius:0.75rem;
        box-shadow:0 20px 60px rgba(0,0,0,0.3);
        max-width:28rem;width:100%;overflow:hidden;
        font-family:'Inter',sans-serif;
    `;

    const header = document.createElement("div");
    header.style.cssText = "padding:1.5rem 1.5rem 0;";
    header.innerHTML = `
        <div style="display:flex;align-items:flex-start;gap:1rem;">
            <div style="flex-shrink:0;width:3rem;height:3rem;border-radius:50%;
                        background:${iconBg};color:${iconColor};
                        display:flex;align-items:center;justify-content:center;">
                <i class="${icon}" style="font-size:1.5rem;"></i>
            </div>
            <div style="flex:1;">
                <h3 style="font-size:1.125rem;font-weight:700;color:#111827;margin:0 0 0.5rem;">${title}</h3>
                <p style="font-size:0.875rem;color:#6b7280;margin:0;line-height:1.5;">${description}</p>
            </div>
        </div>
    `;

    const footer = document.createElement("div");
    footer.style.cssText = `
        padding:1rem 1.5rem;background:#f9fafb;
        display:flex;gap:0.75rem;justify-content:flex-end;margin-top:1.5rem;
    `;

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancelar";
    cancelBtn.style.cssText = `
        padding:0.5rem 1rem;border-radius:0.5rem;font-weight:500;
        font-size:0.875rem;cursor:pointer;background:#ffffff;
        color:#374151;border:2px solid #d1d5db;font-family:inherit;
    `;

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = confirmLabel;
    confirmBtn.style.cssText = `
        padding:0.5rem 1rem;border-radius:0.5rem;font-weight:500;
        font-size:0.875rem;cursor:pointer;background:${confirmColor};
        color:#ffffff;border:2px solid ${confirmColor};font-family:inherit;
    `;

    [cancelBtn, confirmBtn].forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
            btn.style.opacity = "0.85";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.opacity = "1";
        });
    });

    const close = () => overlay.remove();
    cancelBtn.addEventListener("click", close);
    confirmBtn.addEventListener("click", () => {
        close();
        onConfirm();
    });
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    footer.appendChild(cancelBtn);
    footer.appendChild(confirmBtn);
    box.appendChild(header);
    box.appendChild(footer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
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
