/**
 * Register utility functions globally for inline usage in Blade templates
 */
import { showNotification } from "./notifications.js";
import {
    showConfirmModal,
    closeConfirmModal,
    confirmModalAction,
} from "./modals.js";
import {
    togglePasswordVisibility,
    generateSecurePassword,
    validateUsername,
    validateName,
    validatePassword,
    showFieldError,
    clearFieldError,
} from "./forms.js";

export function registerGlobalFunctions() {
    // Notifications
    window.showNotification = showNotification;
    window.showToast = showNotification; // Alias

    // Modals
    window.showConfirmModal = showConfirmModal;
    window.closeConfirmModal = closeConfirmModal;
    window.confirmModalAction = confirmModalAction;

    // Forms
    window.togglePasswordVisibility = togglePasswordVisibility;
    window.generateSecurePassword = generateSecurePassword;
    window.validateUsername = validateUsername;
    window.validateName = validateName;
    window.validatePassword = validatePassword;
    window.showFieldError = showFieldError;
    window.clearFieldError = clearFieldError;
}
