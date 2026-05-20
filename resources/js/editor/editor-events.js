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
        showNotification(error.message, "error");
    } finally {
        saveButton.disabled = false;
        saveButton.innerHTML =
            '<i class="ri-save-line"></i><span>Guardar</span>';
    }
}

async function showTitleModalAndSave(editor, editorService, editorState) {
    return new Promise((resolve, reject) => {
        showTitleModal(async (title) => {
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

function createModalOverlay() {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.5);
    `;
    return overlay;
}

function createModalBox() {
    const box = document.createElement("div");
    box.style.cssText = `
        background: #ffffff;
        border-radius: 0.75rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 28rem;
        width: 100%;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
    `;
    return box;
}

function createModalHeader(iconBg, iconColor, iconClass, title, description) {
    const header = document.createElement("div");
    header.style.cssText = "padding: 1.5rem 1.5rem 0;";
    header.innerHTML = `
        <div style="display:flex;align-items:flex-start;gap:1rem;">
            <div style="flex-shrink:0;width:3rem;height:3rem;border-radius:50%;background:${iconBg};color:${iconColor};display:flex;align-items:center;justify-content:center;">
                <i class="${iconClass}" style="font-size:1.5rem;"></i>
            </div>
            <div style="flex:1;">
                <h3 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 0.5rem;">${title}</h3>
                <p style="font-size:0.875rem;color:#6b7280;margin:0;">${description}</p>
            </div>
        </div>
    `;
    return header;
}

function createModalFooter(buttons) {
    const footer = document.createElement("div");
    footer.style.cssText = `
        padding: 1rem 1.5rem;
        background: #f9fafb;
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        margin-top: 1.5rem;
    `;
    buttons.forEach(({ label, style, id }) => {
        const btn = document.createElement("button");
        btn.id = id;
        btn.style.cssText = `
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            transition: opacity 0.2s;
            ${style}
        `;
        btn.textContent = label;
        btn.addEventListener("mouseenter", () => {
            btn.style.opacity = "0.85";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.opacity = "1";
        });
        footer.appendChild(btn);
    });
    return footer;
}

function showTitleModal(onConfirm) {
    const overlay = createModalOverlay();
    const box = createModalBox();

    const header = createModalHeader(
        "#dbeafe",
        "#2563eb",
        "ri-file-text-line",
        "Título de la Página",
        "Ingresa un título descriptivo para identificar esta página",
    );

    const inputWrapper = document.createElement("div");
    inputWrapper.style.cssText = "padding: 1rem 1.5rem 0;";
    const input = document.createElement("input");
    input.type = "text";
    input.id = "page-title-input";
    input.placeholder = "Ej: Acerca de Nosotros";
    input.style.cssText = `
        width: 100%;
        padding: 0.5rem 1rem;
        border: 2px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
        font-family: inherit;
    `;
    input.addEventListener("focus", () => {
        input.style.borderColor = "#f0872a";
    });
    input.addEventListener("blur", () => {
        input.style.borderColor = "#d1d5db";
    });
    inputWrapper.appendChild(input);

    const footer = createModalFooter([
        {
            id: "modal-cancel",
            label: "Cancelar",
            style: "background:#ffffff;color:#374151;border:2px solid #d1d5db;",
        },
        {
            id: "modal-confirm",
            label: "Guardar",
            style: "background:#f0872a;color:#ffffff;border:2px solid #f0872a;",
        },
    ]);

    box.appendChild(header);
    box.appendChild(inputWrapper);
    box.appendChild(footer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    const close = () => overlay.remove();

    footer.querySelector("#modal-cancel").addEventListener("click", close);
    footer.querySelector("#modal-confirm").addEventListener("click", () => {
        const title = input.value.trim();
        close();
        onConfirm(title);
    });
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });
    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") footer.querySelector("#modal-confirm").click();
    });

    setTimeout(() => input.focus(), 100);
}

function showNotification(message, type) {
    if (typeof window.showNotification === "function") {
        window.showNotification(message, type);
    }
}
