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

document.addEventListener("DOMContentLoaded", async () => {
    const editorService = new EditorService();

    const footerId = document.getElementById("footer-id")?.value || "";
    const footerName = document.getElementById("footer-name")?.value || "";
    const loadUrl = document.getElementById("footer-load-url")?.value || "";
    const storeUrl = document.getElementById("footer-store-url")?.value || "";
    const isActive = document.getElementById("footer-is-active")?.value === "1";
    const isEditMode = Boolean(footerId);

    const editor = initializeFooterGrapesJS();

    editor.on("load", () => {
        initializeFooterBlock(editor);
        translateDynamicUI(editor);
        applyCustomStyles(editor);
        fixButtonTooltips(editor);
        injectCanvasStyles(editor);
        setupEditorCommands(editor);
        setupImageDoubleClick(editor);
        addImageToolbarButton(editor);

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
    } else {
        // Insertar bloque footer por defecto en canvas nuevo
        editor.on("load", () => {
            setTimeout(() => {
                editor.runCommand("insert-default-footer");
            }, 300);
        });
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
                    const name = await promptFooterName();
                    if (!name) {
                        btn.disabled = false;
                        btn.innerHTML =
                            '<i class="ri-save-line"></i><span>Guardar</span>';
                        return;
                    }
                    await saveFooter(
                        editor,
                        editorService,
                        storeUrl,
                        "POST",
                        name,
                        isActive,
                    );
                } else {
                    await saveFooter(
                        editor,
                        editorService,
                        storeUrl,
                        isEditMode ? "PUT" : "POST",
                        footerName,
                        isActive,
                    );
                }
            } catch (e) {
                showNotification(e.message, "error");
            } finally {
                btn.disabled = false;
                btn.innerHTML =
                    '<i class="ri-save-line"></i><span>Guardar</span>';
            }
        });
});

async function saveFooter(
    editor,
    editorService,
    storeUrl,
    method,
    name,
    isActive,
) {
    const content = editorService.getEditorContent(editor);
    const data = await editorService.savePage(
        editor,
        { ...content, name, is_active: isActive },
        storeUrl,
        method,
    );
    if (data.success) {
        showNotification(data.message, "success");
    }
}

function promptFooterName() {
    return new Promise((resolve) => {
        const overlay = document.createElement("div");
        overlay.style.cssText =
            "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);";
        const box = document.createElement("div");
        box.style.cssText =
            "background:#fff;border-radius:0.75rem;padding:1.5rem;max-width:24rem;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);";
        box.innerHTML = `
            <h3 style="margin:0 0 1rem;font-size:1.1rem;font-weight:700;color:#111827;">Nombre del Footer</h3>
            <input id="footer-name-input" type="text" placeholder="Ej: Footer Principal"
                style="width:100%;padding:0.5rem 1rem;border:2px solid #d1d5db;border-radius:0.5rem;font-size:0.875rem;box-sizing:border-box;outline:none;">
            <div style="display:flex;gap:0.75rem;justify-content:flex-end;margin-top:1rem;">
                <button id="fn-cancel" style="padding:0.5rem 1rem;border-radius:0.5rem;border:2px solid #d1d5db;background:#fff;cursor:pointer;font-weight:500;">Cancelar</button>
                <button id="fn-confirm" style="padding:0.5rem 1rem;border-radius:0.5rem;border:none;background:#f0872a;color:#fff;cursor:pointer;font-weight:500;">Guardar</button>
            </div>
        `;
        overlay.appendChild(box);
        document.body.appendChild(overlay);
        setTimeout(() => box.querySelector("#footer-name-input").focus(), 100);
        box.querySelector("#fn-cancel").onclick = () => {
            overlay.remove();
            resolve(null);
        };
        box.querySelector("#fn-confirm").onclick = () => {
            const v = box.querySelector("#footer-name-input").value.trim();
            overlay.remove();
            resolve(v || null);
        };
        box.querySelector("#footer-name-input").onkeypress = (e) => {
            if (e.key === "Enter") box.querySelector("#fn-confirm").click();
        };
    });
}

function showNotification(message, type = "info") {
    if (typeof window.showNotification === "function")
        window.showNotification(message, type);
}
