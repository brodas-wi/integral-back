import { initAgencyMap } from "@/modules/agency-map.js";

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("agency-map")) {
        initAgencyMap();
    }

    const deleteBtn  = document.getElementById("delete-payment-point-btn");
    const deleteForm = document.getElementById("delete-form");

    if (deleteBtn && deleteForm) {
        deleteBtn.addEventListener("click", () => {
            const pointName = deleteForm.dataset.pointName || "este punto de pago";
            confirmDelete(pointName, deleteForm);
        });
    }
});

function confirmDelete(pointName, deleteForm) {
    if (typeof window.showConfirmModal !== "function") {
        if (confirm(`¿Eliminar "${pointName}"? Esta acción no se puede deshacer.`)) {
            deleteForm.submit();
        }
        return;
    }

    window.showConfirmModal({
        title: "¿Eliminar punto de pago?",
        message: `¿Estás seguro de que deseas eliminar "<strong>${pointName}</strong>"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deleteForm.submit(),
    });
}
