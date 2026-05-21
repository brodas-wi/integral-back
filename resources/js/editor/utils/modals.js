export function showConfirmModal({
    title,
    description,
    icon = "ri-alert-line",
    iconBg = "#fee2e2",
    iconColor = "#dc2626",
    confirmLabel = "Confirmar",
    confirmColor = "#dc2626",
    cancelLabel = "Cancelar",
    onConfirm,
    onCancel,
}) {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        padding: 1rem; background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        transition: opacity 0.25s ease-out;
        opacity: 0;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
        background: #ffffff; border-radius: 0.75rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 28rem; width: 100%; overflow: hidden;
        font-family: 'Inter', sans-serif;
        transform: translateY(20px);
        transition: transform 0.25s ease-out;
    `;

    const header = document.createElement("div");
    header.style.cssText = "padding: 1.5rem 1.5rem 0;";
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
        padding: 1rem 1.5rem; background: #f9fafb;
        display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem;
    `;

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = cancelLabel;
    cancelBtn.style.cssText = `
        padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500;
        font-size: 0.875rem; cursor: pointer; background: #ffffff;
        color: #374151; border: 2px solid #d1d5db; font-family: inherit;
        transition: all 0.2s; outline: none;
    `;

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = confirmLabel;
    confirmBtn.style.cssText = `
        padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500;
        font-size: 0.875rem; cursor: pointer; background: ${confirmColor};
        color: #ffffff; border: 2px solid ${confirmColor}; font-family: inherit;
        transition: all 0.2s; outline: none;
    `;

    [cancelBtn, confirmBtn].forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
            btn.style.opacity = "0.85";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.opacity = "1";
        });
    });

    const close = () => {
        overlay.style.opacity = "0";
        box.style.transform = "translateY(20px)";
        setTimeout(() => overlay.remove(), 250);
    };

    cancelBtn.addEventListener("click", () => {
        close();
        if (onCancel) onCancel();
    });

    confirmBtn.addEventListener("click", () => {
        close();
        if (onConfirm) onConfirm();
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            close();
            if (onCancel) onCancel();
        }
    });

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            cancelBtn.click();
            document.removeEventListener("keydown", handleKeyDown);
        }
    };
    document.addEventListener("keydown", handleKeyDown);

    footer.appendChild(cancelBtn);
    footer.appendChild(confirmBtn);
    box.appendChild(header);
    box.appendChild(footer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        box.style.transform = "translateY(0)";
    });
}

export function showInputModal({
    title,
    description,
    placeholder = "Escribe aquí...",
    defaultValue = "",
    icon = "ri-edit-line",
    iconBg = "#dbeafe",
    iconColor = "#2563eb",
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
    onConfirm,
    onCancel,
}) {
    const overlay = document.createElement("div");
    overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        padding: 1rem; background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(2px);
        transition: opacity 0.25s ease-out;
        opacity: 0;
    `;

    const box = document.createElement("div");
    box.style.cssText = `
        background: #ffffff; border-radius: 0.75rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 28rem; width: 100%; overflow: hidden;
        font-family: 'Inter', sans-serif;
        transform: translateY(20px);
        transition: transform 0.25s ease-out;
    `;

    const header = document.createElement("div");
    header.style.cssText = "padding: 1.5rem 1.5rem 0;";
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

    const inputWrapper = document.createElement("div");
    inputWrapper.style.cssText = "padding: 1rem 1.5rem 0;";
    
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.value = defaultValue;
    input.style.cssText = `
        width: 100%; padding: 0.5rem 1rem;
        border: 2px solid #d1d5db; border-radius: 0.5rem;
        font-size: 0.875rem; outline: none;
        transition: border-color 0.2s; box-sizing: border-box;
        font-family: inherit;
    `;
    input.addEventListener("focus", () => {
        input.style.borderColor = "#f0872a";
    });
    input.addEventListener("blur", () => {
        input.style.borderColor = "#d1d5db";
    });
    inputWrapper.appendChild(input);

    const footer = document.createElement("div");
    footer.style.cssText = `
        padding: 1rem 1.5rem; background: #f9fafb;
        display: flex; gap: 0.75rem; justify-content: flex-end; margin-top: 1.5rem;
    `;

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = cancelLabel;
    cancelBtn.style.cssText = `
        padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500;
        font-size: 0.875rem; cursor: pointer; background: #ffffff;
        color: #374151; border: 2px solid #d1d5db; font-family: inherit;
        transition: all 0.2s; outline: none;
    `;

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = confirmLabel;
    confirmBtn.style.cssText = `
        padding: 0.5rem 1rem; border-radius: 0.5rem; font-weight: 500;
        font-size: 0.875rem; cursor: pointer; background: #f0872a;
        color: #ffffff; border: 2px solid #f0872a; font-family: inherit;
        transition: all 0.2s; outline: none;
    `;

    [cancelBtn, confirmBtn].forEach((btn) => {
        btn.addEventListener("mouseenter", () => {
            btn.style.opacity = "0.85";
        });
        btn.addEventListener("mouseleave", () => {
            btn.style.opacity = "1";
        });
    });

    const close = () => {
        overlay.style.opacity = "0";
        box.style.transform = "translateY(20px)";
        setTimeout(() => overlay.remove(), 250);
    };

    cancelBtn.addEventListener("click", () => {
        close();
        if (onCancel) onCancel();
    });

    confirmBtn.addEventListener("click", () => {
        const val = input.value.trim();
        close();
        if (onConfirm) onConfirm(val);
    });

    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            close();
            if (onCancel) onCancel();
        }
    });

    input.addEventListener("keypress", (e) => {
        if (e.key === "Enter") confirmBtn.click();
    });

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            cancelBtn.click();
            document.removeEventListener("keydown", handleKeyDown);
        }
    };
    document.addEventListener("keydown", handleKeyDown);

    footer.appendChild(cancelBtn);
    footer.appendChild(confirmBtn);
    box.appendChild(header);
    box.appendChild(inputWrapper);
    box.appendChild(footer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        overlay.style.opacity = "1";
        box.style.transform = "translateY(0)";
    });

    setTimeout(() => input.focus(), 100);
}
