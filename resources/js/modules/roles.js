import { showConfirmModal } from "../utils/modals.js";

// Confirm delete role action
export function confirmDeleteRole(roleId, roleName, formId = null) {
    const actualFormId = formId || `delete-role-form-${roleId}`;

    if (typeof window.showConfirmModal !== "function") {
        if (
            confirm(
                `¿Eliminar "${roleName}"? Esta acción no se puede deshacer.`,
            )
        ) {
            document.getElementById(actualFormId).submit();
        }
        return;
    }

    showConfirmModal({
        title: "¿Eliminar rol?",
        message: `¿Estás seguro de que deseas eliminar el rol "${roleName}"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => {
            document.getElementById(actualFormId).submit();
        },
    });
}

// Select all manage permissions
export function selectAllManagePermissions() {
    document.querySelectorAll(".permission-checkbox").forEach((checkbox) => {
        if (checkbox.dataset.isManage === "true") {
            checkbox.checked = true;
            handleManagePermission(checkbox);
        }
    });
}

// Deselect all permissions
export function deselectAllPermissions() {
    document.querySelectorAll(".permission-checkbox").forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.disabled = false;
        checkbox
            .closest("label")
            .classList.remove(
                "opacity-50",
                "cursor-not-allowed",
                "pointer-events-none",
            );
    });
}

// Handle manage permission logic
function handleManagePermission(checkbox) {
    const value = checkbox.value;
    const parts = value.split(".");
    const isManage = parts[1] === "manage";

    if (isManage) {
        const module = parts[0];
        const groupCheckboxes = document.querySelectorAll(
            `[data-group="${module}"]`,
        );

        groupCheckboxes.forEach((cb) => {
            if (cb.value !== value) {
                if (checkbox.checked) {
                    cb.checked = false;
                    cb.disabled = true;
                    cb.closest("label").classList.add(
                        "opacity-50",
                        "cursor-not-allowed",
                        "pointer-events-none",
                    );
                } else {
                    cb.disabled = false;
                    cb.closest("label").classList.remove(
                        "opacity-50",
                        "cursor-not-allowed",
                        "pointer-events-none",
                    );
                }
            }
        });
    } else {
        const module = parts[0];
        const manageCheckbox = document.querySelector(
            `input[value="${module}.manage"]`,
        );

        if (manageCheckbox && checkbox.checked) {
            manageCheckbox.checked = false;
            const groupCheckboxes = document.querySelectorAll(
                `[data-group="${module}"]`,
            );
            groupCheckboxes.forEach((cb) => {
                if (cb.value !== manageCheckbox.value) {
                    cb.disabled = false;
                    cb.closest("label").classList.remove(
                        "opacity-50",
                        "cursor-not-allowed",
                        "pointer-events-none",
                    );
                }
            });
        }
    }
}

// Initialize permission checkboxes
export function initPermissionCheckboxes() {
    document.querySelectorAll(".permission-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            handleManagePermission(this);
        });

        if (checkbox.checked) {
            handleManagePermission(checkbox);
        }
    });
}
