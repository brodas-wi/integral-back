/**
 * Payment Points Show View
 *
 * Handles:
 *  - Delete confirmation from the show page
 *  - Leaflet map initialization (read-only, shows payment point location)
 *
 * Data passed from blade via data-* attributes:
 *  - #delete-form[data-point-name]   → point name for confirm dialog
 *  - #agency-map[data-latitude]      → latitude
 *  - #agency-map[data-longitude]     → longitude
 *  - #agency-map[data-name]          → point name
 *  - #agency-map[data-municipality]  → municipality
 *  - #agency-map[data-department]    → department
 */

import { initAgencyMap } from "@/modules/agency-map.js";

document.addEventListener("DOMContentLoaded", function () {
    // ── Map ─────────────────────────────────────────────────────────────────
    if (document.getElementById("agency-map")) {
        initAgencyMap();
    }

    // ── Delete button ───────────────────────────────────────────────────────
    const deleteBtn  = document.getElementById("delete-payment-point-btn");
    const deleteForm = document.getElementById("delete-form");

    if (deleteBtn && deleteForm) {
        deleteBtn.addEventListener("click", () => {
            const pointName = deleteForm.dataset.pointName || "este punto de pago";
            confirmDelete(pointName, deleteForm);
        });
    }
});

// ── Delete helpers ──────────────────────────────────────────────────────────

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
