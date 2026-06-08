import { initAgencyMap } from "@/modules/agency-map.js";

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("agency-map")) {
        initAgencyMap();
    }

    const deleteBtn  = document.getElementById("delete-agency-btn");
    const deleteForm = document.getElementById("delete-form");

    if (deleteBtn && deleteForm) {
        deleteBtn.addEventListener("click", () => {
            const agencyName = deleteForm.dataset.agencyName || "esta agencia";
            confirmDelete(agencyName, deleteForm);
        });
    }
});

function confirmDelete(agencyName, deleteForm) {
    if (typeof window.showConfirmModal !== "function") {
        if (confirm(`¿Eliminar "${agencyName}"? Esta acción no se puede deshacer.`)) {
            deleteForm.submit();
        }
        return;
    }

    window.showConfirmModal({
        title: "¿Eliminar agencia?",
        message: `¿Estás seguro de que deseas eliminar "<strong>${agencyName}</strong>"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deleteForm.submit(),
    });
}
