const NOTIFICATION_STYLES = {
    success: {
        bg: "#f0fdf4",
        border: "#86efac",
        color: "#166534",
        icon: "ri-checkbox-circle-line",
    },
    error: {
        bg: "#fef2f2",
        border: "#fca5a5",
        color: "#991b1b",
        icon: "ri-error-warning-line",
    },
    warning: {
        bg: "#fffbeb",
        border: "#fcd34d",
        color: "#92400e",
        icon: "ri-alert-line",
    },
    info: {
        bg: "#eff6ff",
        border: "#93c5fd",
        color: "#1e40af",
        icon: "ri-information-line",
    },
};

function ensureContainer() {
    let container = document.getElementById("notification-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "notification-container";
        container.style.cssText = `
            position: fixed;
            bottom: 1rem;
            right: 1rem;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            max-width: 28rem;
            width: calc(100% - 2rem);
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }
    return container;
}

export function showNotification(message, type = "info") {
    const config    = NOTIFICATION_STYLES[type] ?? NOTIFICATION_STYLES.info;
    const container = ensureContainer();

    const toast = document.createElement("div");
    toast.style.cssText = `
        background-color: ${config.bg};
        border: 1px solid ${config.border};
        color: ${config.color};
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        min-width: 280px;
        pointer-events: auto;
        word-wrap: break-word;
        font-size: 0.875rem;
        font-family: inherit;
        animation: notifSlideIn 0.3s ease-out;
    `;

    toast.innerHTML = `
        <div style="display:flex;align-items:center;gap:0.75rem;flex:1;">
            <i class="${config.icon}" style="font-size:1.25rem;flex-shrink:0;"></i>
            <span style="flex:1;line-height:1.4;font-weight:500;">${message}</span>
        </div>
        <button style="background:none;border:none;cursor:pointer;padding:0;opacity:0.6;flex-shrink:0;color:inherit;display:flex;align-items:center;align-self:center;" class="notif-close">
            <i class="ri-close-line" style="font-size:1.1rem;line-height:1;display:block;"></i>
        </button>
    `;

    const closeBtn = toast.querySelector(".notif-close");
    closeBtn.addEventListener("mouseenter", () => { closeBtn.style.opacity = "1"; });
    closeBtn.addEventListener("mouseleave", () => { closeBtn.style.opacity = "0.6"; });
    closeBtn.addEventListener("click", () => removeToast(toast, container));

    container.appendChild(toast);
    ensureKeyframes();

    setTimeout(() => removeToast(toast, container), 5000);
}

function removeToast(toast, container) {
    toast.style.animation = "notifSlideOut 0.3s ease-in forwards";
    setTimeout(() => {
        toast.remove();
        if (container.children.length === 0) container.remove();
    }, 300);
}

function ensureKeyframes() {
    if (document.getElementById("notif-keyframes")) return;
    const style = document.createElement("style");
    style.id    = "notif-keyframes";
    style.textContent = `
        @keyframes notifSlideIn {
            from { transform: translateX(100%); opacity: 0; }
            to   { transform: translateX(0);   opacity: 1; }
        }
        @keyframes notifSlideOut {
            from { transform: translateX(0);   opacity: 1; }
            to   { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}