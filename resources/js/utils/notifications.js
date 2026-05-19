const NOTIFICATION_TYPES = {
    success: { cls: "notif-success", icon: "ri-checkbox-circle-line" },
    error: { cls: "notif-error", icon: "ri-error-warning-line" },
    warning: { cls: "notif-warning", icon: "ri-alert-line" },
    info: { cls: "notif-info", icon: "ri-information-line" },
};

function ensureContainer() {
    let container = document.getElementById("notification-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "notification-container";
        container.className = "notif-container";
        document.body.appendChild(container);
    }
    return container;
}

export function showNotification(message, type = "info") {
    const config = NOTIFICATION_TYPES[type] ?? NOTIFICATION_TYPES.info;
    const container = ensureContainer();

    const toast = document.createElement("div");
    toast.className = `notif-toast ${config.cls}`;

    toast.innerHTML = `
        <div class="notif-body">
            <i class="${config.icon} notif-icon"></i>
            <span class="notif-message">${message}</span>
        </div>
        <button class="notif-close" aria-label="Cerrar">
            <i class="ri-close-line"></i>
        </button>
    `;

    toast
        .querySelector(".notif-close")
        .addEventListener("click", () => removeToast(toast, container));
    container.appendChild(toast);
    setTimeout(() => removeToast(toast, container), 5000);
}

function removeToast(toast, container) {
    toast.classList.add("notif-exit");
    setTimeout(() => {
        toast.remove();
        if (container.children.length === 0) container.remove();
    }, 300);
}
