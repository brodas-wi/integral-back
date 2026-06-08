/**
 * Agencies Show View
 *
 * Handles:
 *  - Delete confirmation from the show page
 *  - Leaflet map initialization (read-only, shows agency location)
 *
 * Data passed from blade via data-* attributes:
 *  - #delete-form[data-agency-name]  → agency name for confirm dialog
 *  - #agency-map[data-latitude]      → latitude
 *  - #agency-map[data-longitude]     → longitude
 *  - #agency-map[data-name]          → agency name
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
    const deleteBtn  = document.getElementById("delete-agency-btn");
    const deleteForm = document.getElementById("delete-form");

    if (deleteBtn && deleteForm) {
        deleteBtn.addEventListener("click", () => {
            const agencyName = deleteForm.dataset.agencyName || "esta agencia";
            confirmDelete(agencyName, deleteForm);
        });
    }
});

// ── Delete helpers ──────────────────────────────────────────────────────────

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
