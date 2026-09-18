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
import Swiper from "swiper";
import swiperCssUrl from "swiper/css?url";

document.addEventListener("DOMContentLoaded", async () => {
    const editorService = new EditorService();
    const editorState = new EditorState();
    new EditorNavigation(editorService);

    const editor = initializeGrapesJS();

    const editorLoaded = new Promise((resolve) => {
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

            resolve();
        });
    });

    await Promise.all([editorLoaded, waitForCanvasFrame(editor)]);

    setupSwiperAutoInit(editor);

    if (editorState.isEditMode) {
        try {
            await editorService.loadPageContent(editor, editorState.loadUrl);
            showNotification("Contenido cargado correctamente", "success");
            offerBackupRecovery(editor, editorService, editorState);
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

function offerBackupRecovery(editor, editorService, editorState) {
    const backup = editorService.constructor.getBackup(editorState.storeUrl);
    if (!backup) return;

    const minutesAgo = Math.round((Date.now() - backup.timestamp) / 60000);

    showConfirmModal({
        title: "Se encontró un borrador sin guardar",
        description: `Hay cambios de hace ${minutesAgo} min que no llegaron a guardarse (posiblemente por sesión expirada). ¿Quieres recuperarlos?`,
        icon: "ri-history-line",
        iconBg: "#dbeafe",
        iconColor: "#2563eb",
        confirmLabel: "Recuperar",
        cancelLabel: "Descartar",
        onConfirm: () => {
            if (backup.payload.components_json) {
                editor.loadProjectData(JSON.parse(backup.payload.components_json));
            }
            editorService.clearBackup(editorState.storeUrl);
            showNotification("Borrador recuperado", "success");
        },
        onCancel: () => {
            editorService.clearBackup(editorState.storeUrl);
        },
    });
}

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

function waitForCanvasFrame(editor) {
    return new Promise((resolve) => {
        const frameEl = editor.Canvas.getFrameEl();
        const isFrameReady =
            frameEl?.contentDocument?.readyState === "complete" &&
            frameEl.contentDocument.head?.childElementCount > 0;

        if (isFrameReady) {
            resolve();
            return;
        }

        const onFrameLoad = () => {
            editor.off("canvas:frame:load", onFrameLoad);
            resolve();
        };

        editor.on("canvas:frame:load", onFrameLoad);

        setTimeout(() => {
            editor.off("canvas:frame:load", onFrameLoad);
            resolve();
        }, 3000);
    });
}

function setupSwiperAutoInit(editor) {
    const injectSwiperCss = (doc) => {
        if (doc.head.querySelector("#swiper-canvas-css")) return;
        const link = doc.createElement("link");
        link.id = "swiper-canvas-css";
        link.rel = "stylesheet";
        link.href = swiperCssUrl;
        doc.head.appendChild(link);
    };

    const initSwipersInFrame = () => {
        const iframe = editor.Canvas.getFrameEl();
        const doc = iframe?.contentDocument;
        if (!doc) return;

        injectSwiperCss(doc);

        doc.querySelectorAll(".swiper").forEach((el) => {
            if (el.swiper) {
                el.swiper.destroy(true, true);
            }
            const scope = el.closest("[class*='-carousel']") || el.parentElement;
            const shouldFill = el.hasAttribute("data-swiper-fill");
            const minSlideWidth =
                parseInt(el.dataset.swiperMinSlideWidth, 10) || 260;
            const gap = 24;

            const computeSlidesPerView = () => {
                if (!shouldFill) return "auto";
                const width = el.clientWidth || 1;
                const fit = Math.floor((width + gap) / (minSlideWidth + gap));
                return Math.max(1, fit);
            };

            new Swiper(el, {
                slidesPerView: computeSlidesPerView(),
                spaceBetween: gap,
                navigation: {
                    nextEl: scope?.querySelector("[data-swiper-next]"),
                    prevEl: scope?.querySelector("[data-swiper-prev]"),
                    disabledClass: "swiper-nav-disabled-state",
                },
                pagination: {
                    el: scope?.querySelector("[data-swiper-pagination]"),
                    bulletActiveClass: "active",
                    clickable: true,
                },
                watchOverflow: true,
                on: shouldFill
                    ? {
                        resize(swiper) {
                            swiper.params.slidesPerView = computeSlidesPerView();
                            swiper.update();
                        },
                    }
                    : {},
            });
        });
    };

    editor.on("component:add component:update storage:end:load", () => {
        setTimeout(initSwipersInFrame, 150);
    });

    setTimeout(initSwipersInFrame, 300);
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
