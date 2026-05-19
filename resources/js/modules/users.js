import { showConfirmModal } from "../utils/modals.js";

// Confirm toggle user status
export function confirmToggleStatus(
    userId,
    userName,
    isActive,
    isMobile = false,
) {
    const action = isActive ? "desactivar" : "activar";
    const formId = isMobile
        ? `toggle-form-mobile-${userId}`
        : `toggle-form-${userId}`;

    if (typeof window.showConfirmModal !== "function") {
        if (
            confirm(
                `¿${action.charAt(0).toUpperCase() + action.slice(1)} al usuario "${userName}"?`,
            )
        ) {
            document.getElementById(formId).submit();
        }
        return;
    }

    showConfirmModal({
        title: `¿${action.charAt(0).toUpperCase() + action.slice(1)} usuario?`,
        message: `¿Estás seguro de que deseas ${action} al usuario "${userName}"?`,
        confirmText: action.charAt(0).toUpperCase() + action.slice(1),
        cancelText: "Cancelar",
        type: "warning",
        onConfirm: () => {
            document.getElementById(formId).submit();
        },
    });
}

// Confirm delete user
export function confirmDeleteUser(userId, userName, isMobile = false) {
    const formId = isMobile
        ? `delete-form-mobile-${userId}`
        : `delete-form-${userId}`;

    if (typeof window.showConfirmModal !== "function") {
        if (
            confirm(
                `¿Eliminar al usuario "${userName}"? Esta acción no se puede deshacer.`,
            )
        ) {
            document.getElementById(formId).submit();
        }
        return;
    }

    showConfirmModal({
        title: "¿Eliminar usuario?",
        message: `¿Estás seguro de que deseas eliminar al usuario "${userName}"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => {
            document.getElementById(formId).submit();
        },
    });
}
