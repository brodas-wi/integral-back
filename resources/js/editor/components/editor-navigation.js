export class EditorNavigation {
    constructor(editorService) {
        this.editorService = editorService;
        this.setupBackButton();
        this.setupBeforeUnload();
    }

    setupBackButton() {
        const backButton = document.querySelector("#editor-navbar a[href]");
        if (backButton) {
            backButton.addEventListener("click", (e) => {
                if (this.editorService.shouldPreventUnload()) {
                    e.preventDefault();
                    this.showUnsavedChangesModal(() => {
                        this.editorService.startNavigation();
                        window.location.href = backButton.href;
                    });
                }
            });
        }
    }

    setupBeforeUnload() {
        window.addEventListener("beforeunload", (e) => {
            if (this.editorService.shouldPreventUnload()) {
                e.preventDefault();
                e.returnValue =
                    "Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?";
                return e.returnValue;
            }
        });
    }

    showUnsavedChangesModal(onConfirm) {
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

        const header = document.createElement("div");
        header.style.cssText = "padding: 1.5rem 1.5rem 0;";
        header.innerHTML = `
            <div style="display:flex;align-items:flex-start;gap:1rem;">
                <div style="flex-shrink:0;width:3rem;height:3rem;border-radius:50%;background:#fef3c7;color:#d97706;display:flex;align-items:center;justify-content:center;">
                    <i class="ri-alert-line" style="font-size:1.5rem;"></i>
                </div>
                <div style="flex:1;">
                    <h3 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 0.5rem;">Cambios sin guardar</h3>
                    <p style="font-size:0.875rem;color:#6b7280;margin:0;">Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin guardar?</p>
                </div>
            </div>
        `;

        const footer = document.createElement("div");
        footer.style.cssText = `
            padding: 1rem 1.5rem;
            background: #f9fafb;
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
            margin-top: 1.5rem;
        `;

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancelar";
        cancelBtn.style.cssText = `
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            background: #ffffff;
            color: #374151;
            border: 2px solid #d1d5db;
            font-family: inherit;
        `;

        const confirmBtn = document.createElement("button");
        confirmBtn.textContent = "Salir sin guardar";
        confirmBtn.style.cssText = `
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            background: #dc2626;
            color: #ffffff;
            border: 2px solid #dc2626;
            font-family: inherit;
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
}
