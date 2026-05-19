function togglePasswordVisibility(inputId, iconElement) {
    const input = document.getElementById(inputId);
    const icon = iconElement.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("ri-eye-line");
        icon.classList.add("ri-eye-off-line");
    } else {
        input.type = "password";
        icon.classList.remove("ri-eye-off-line");
        icon.classList.add("ri-eye-line");
    }
}

function generateSecurePassword(inputId) {
    const length = 12;
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "@$!%*?&";
    const all = uppercase + lowercase + numbers + special;

    let password = "";
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    for (let i = password.length; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }

    password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    const input = document.getElementById(inputId);
    input.type = "text";
    input.value = password;

    showNotification("Contraseña generada exitosamente", "success");
}

function validateUsername(input) {
    const regex = /^[a-zA-Z0-9_-]+$/;
    const value = input.value;

    if (value && !regex.test(value)) {
        showFieldError(
            input,
            "Solo se permiten letras, números, guiones y guiones bajos"
        );
        return false;
    }

    clearFieldError(input);
    return true;
}

function validateName(input) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    const value = input.value;

    if (value && !regex.test(value)) {
        showFieldError(input, "Solo se permiten letras, espacios y acentos");
        return false;
    }

    clearFieldError(input);
    return true;
}

function validatePassword(input) {
    const value = input.value;

    if (!value) {
        clearFieldError(input);
        return true;
    }

    const requirements = [];

    if (value.length < 8) {
        requirements.push("al menos 8 caracteres");
    }
    if (!/[a-z]/.test(value)) {
        requirements.push("una letra minúscula");
    }
    if (!/[A-Z]/.test(value)) {
        requirements.push("una letra mayúscula");
    }
    if (!/\d/.test(value)) {
        requirements.push("un número");
    }
    if (!/[@$!%*?&]/.test(value)) {
        requirements.push("un carácter especial (@$!%*?&)");
    }

    if (requirements.length > 0) {
        showFieldError(
            input,
            "La contraseña debe contener " + requirements.join(", ")
        );
        return false;
    }

    clearFieldError(input);
    return true;
}

function showFieldError(input, message) {
    clearFieldError(input);

    input.classList.add("border-red-500");

    const wrapper = input.closest(".input-wrapper") || input.parentElement;

    const error = document.createElement("p");
    error.className = "text-red-500 text-sm mt-1 field-error";
    error.textContent = message;

    wrapper.appendChild(error);
}

function clearFieldError(input) {
    input.classList.remove("border-red-500");

    const wrapper = input.closest(".input-wrapper") || input.parentElement;
    const existingError = wrapper.querySelector(".field-error");
    if (existingError) {
        existingError.remove();
    }
}

function showNotification(message, type = "info") {
    let container = document.getElementById("notification-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "notification-container";
        container.className = "fixed top-4 right-4 z-50 space-y-2 max-w-md";
        document.body.appendChild(container);
    }

    const notification = document.createElement("div");
    notification.className = `notification-toast animate-slide-in-right ${getNotificationClasses(
        type
    )}`;

    notification.innerHTML = `
        <div class="flex items-center gap-3 flex-1">
            <i class="${getNotificationIcon(type)} text-xl flex-shrink-0"></i>
            <span class="flex-1">${message}</span>
        </div>
        <button onclick="this.parentElement.remove()" class="hover:opacity-80 flex-shrink-0">
            <i class="ri-close-line text-xl"></i>
        </button>
    `;

    container.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("animate-slide-out-right");
        setTimeout(() => {
            notification.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    }, 5000);
}

function getNotificationClasses(type) {
    const classes = {
        success: "bg-green-100 border border-green-400 text-green-700",
        error: "bg-red-100 border border-red-400 text-red-700",
        warning: "bg-yellow-100 border border-yellow-400 text-yellow-700",
        info: "bg-blue-100 border border-blue-400 text-blue-700",
    };
    return classes[type] || classes.info;
}

function getNotificationIcon(type) {
    const icons = {
        success: "ri-checkbox-circle-line",
        error: "ri-error-warning-line",
        warning: "ri-alert-line",
        info: "ri-information-line",
    };
    return icons[type] || icons.info;
}

window.togglePasswordVisibility = togglePasswordVisibility;
window.generateSecurePassword = generateSecurePassword;
window.validateUsername = validateUsername;
window.validateName = validateName;
window.validatePassword = validatePassword;
window.showNotification = showNotification;

function showConfirmModal(options) {
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
            <div class="p-6">
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

function closeConfirmModal() {
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

function confirmModalAction() {
    if (window.currentModalAction) {
        window.currentModalAction();
    }
    closeConfirmModal();
}

function getConfirmIconClass(type) {
    const icons = {
        warning: "ri-alert-line",
        danger: "ri-error-warning-line",
        info: "ri-information-line",
        success: "ri-checkbox-circle-line",
    };
    return icons[type] || icons.warning;
}

function getConfirmIconColor(type) {
    const colors = {
        warning: "bg-yellow-100 text-yellow-600",
        danger: "bg-red-100 text-red-600",
        info: "bg-blue-100 text-blue-600",
        success: "bg-green-100 text-green-600",
    };
    return colors[type] || colors.warning;
}

window.showConfirmModal = showConfirmModal;
window.closeConfirmModal = closeConfirmModal;
window.confirmModalAction = confirmModalAction;
window.showNotification = showNotification;
