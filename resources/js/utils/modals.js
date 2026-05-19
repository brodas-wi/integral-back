// Show confirmation modal with custom options
export function showConfirmModal(options) {
    const defaults = {
        title: "¿Estás seguro?",
        message: "¿Deseas continuar con esta acción?",
        confirmText: "Confirmar",
        cancelText: "Cancelar",
        type: "warning",
        onConfirm: () => {},
        onCancel: () => {},
    };

    const config = { ...defaults, ...options };

    const existingModal = document.getElementById("confirm-modal");
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement("div");
    modal.id = "confirm-modal";
    modal.className =
        "fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in";

    const iconClass = getConfirmIconClass(config.type);
    const iconColor = getConfirmIconColor(config.type);

    modal.innerHTML = `
        <div class="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onclick="closeConfirmModal()"></div>
        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full relative z-10 animate-scale-in">
            <div class="pb-0 pt-6 px-6">
                <div class="flex items-start gap-4">
                    <div class="flex-shrink-0 w-12 h-12 rounded-full ${iconColor} flex items-center justify-center">
                        <i class="${iconClass} text-2xl"></i>
                    </div>
                    <div class="flex-1">
                        <h3 class="text-xl font-bold text-secondary mb-2">${config.title}</h3>
                        <p class="text-gray-600">${config.message}</p>
                    </div>
                </div>
            </div>
            <div class="px-6 py-4 bg-gray-50 rounded-b-xl flex gap-3 justify-end">
                <button 
                    onclick="closeConfirmModal()" 
                    class="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all font-medium"
                >
                    ${config.cancelText}
                </button>
                <button 
                    onclick="confirmModalAction()" 
                    class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
                >
                    ${config.confirmText}
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    window.currentModalAction = config.onConfirm;
    window.currentModalCancel = config.onCancel;

    document.body.style.overflow = "hidden";
}

// Close confirmation modal
export function closeConfirmModal() {
    const modal = document.getElementById("confirm-modal");
    if (modal) {
        modal.classList.add("animate-fade-out");
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = "";
            if (window.currentModalCancel) {
                window.currentModalCancel();
            }
        }, 200);
    }
}

// Execute modal confirmation action
export function confirmModalAction() {
    if (window.currentModalAction) {
        window.currentModalAction();
    }
    closeConfirmModal();
}

// Get icon class based on modal type
function getConfirmIconClass(type) {
    const icons = {
        warning: "ri-alert-line",
        danger: "ri-error-warning-line",
        info: "ri-information-line",
        success: "ri-checkbox-circle-line",
    };
    return icons[type] || icons.warning;
}

// Get icon color based on modal type
function getConfirmIconColor(type) {
    const colors = {
        warning: "bg-yellow-100 text-yellow-600",
        danger: "bg-red-100 text-red-600",
        info: "bg-blue-100 text-blue-600",
        success: "bg-green-100 text-green-600",
    };
    return colors[type] || colors.warning;
}
