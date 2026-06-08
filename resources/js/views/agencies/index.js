/**
 * Agencies Index View
 *
 * Handles:
 *  - Bulk selection & geocoding progress
 *  - Delete confirmation (index list)
 *  - Dropdown toggles
 *
 * All interactions are wired via data-* attributes and event listeners.
 * No inline onclick / onchange attributes are used in the blade template.
 */

import { showNotification } from "@/utils/notifications.js";
import { initAgencyBulkGeocode } from "@/modules/agency-bulk-geocode.js";

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;
const BASE_URL = document.querySelector('meta[name="agencies-base-url"]')?.content;

document.addEventListener("DOMContentLoaded", function () {
    // ── Bulk geocode ────────────────────────────────────────────────────────
    if (document.getElementById("bulk-actions-bar")) {
        initAgencyBulkGeocode();
    }

    // ── Checkbox change → update bulk-actions bar ───────────────────────────
    document.querySelectorAll(".agency-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            if (typeof window.updateBulkActions === "function") {
                window.updateBulkActions();
            }
        });
    });

    // ── Bulk action buttons ─────────────────────────────────────────────────
    const selectAllBtn = document.getElementById("select-all-btn");
    const deselectAllBtn = document.getElementById("deselect-all-btn");
    const geocodeSelectedBtn = document.getElementById("geocode-selected-btn");

    selectAllBtn?.addEventListener("click", () => {
        if (typeof window.selectAllVisible === "function") {
            window.selectAllVisible();
        }
    });

    deselectAllBtn?.addEventListener("click", () => {
        if (typeof window.deselectAll === "function") {
            window.deselectAll();
        }
    });

    geocodeSelectedBtn?.addEventListener("click", () => {
        if (typeof window.geocodeSelected === "function") {
            window.geocodeSelected();
        }
    });

    // ── Dropdown triggers ───────────────────────────────────────────────────
    document.querySelectorAll(".dropdown-trigger").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (typeof window.toggleDropdown === "function") {
                window.toggleDropdown(btn.closest(".dropdown"));
            }
        });
    });

    // ── Delete buttons ──────────────────────────────────────────────────────
    document.querySelectorAll(".delete-agency-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id   = btn.dataset.agencyId;
            const name = btn.dataset.agencyName;
            confirmDeleteAgency(id, name);
        });
    });
});

// ── Delete helpers ──────────────────────────────────────────────────────────

function confirmDeleteAgency(agencyId, agencyName) {
    if (typeof window.showConfirmModal !== "function") {
        if (confirm(`¿Eliminar "${agencyName}"? Esta acción no se puede deshacer.`)) {
            deleteAgency(agencyId);
        }
        return;
    }

    window.showConfirmModal({
        title: "¿Eliminar agencia?",
        message: `¿Estás seguro de que deseas eliminar "<strong>${agencyName}</strong>"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deleteAgency(agencyId),
    });
}

async function deleteAgency(agencyId) {
    showNotification("Eliminando agencia...", "info");

    try {
        const response = await fetch(`${BASE_URL}/${agencyId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": CSRF,
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
        });

        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
            showNotification(data.message || "Agencia eliminada exitosamente", "success");

            const agencyItem = document.getElementById(`agency-item-${agencyId}`);
            if (agencyItem) {
                agencyItem.classList.add("announcement-removing"); // reuse existing CSS transition
                setTimeout(() => {
                    agencyItem.remove();
                    if (document.querySelectorAll('[id^="agency-item-"]').length === 0) {
                        window.location.reload();
                    }
                }, 300);
            } else {
                setTimeout(() => {
                    window.location.href = BASE_URL;
                }, 1500);
            }
        } else {
            throw new Error(data.message || "Error al eliminar");
        }
    } catch (error) {
        console.error("Error deleting agency:", error);
        showNotification("Error al eliminar la agencia. " + error.message, "error");
    }
}
