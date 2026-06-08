import { showNotification } from "@/utils/notifications.js";
import { initBulkGeocode } from "@/modules/payment-point-bulk-geocode.js";

const CSRF     = document.querySelector('meta[name="csrf-token"]')?.content;
const BASE_URL = document.querySelector('meta[name="payment-points-base-url"]')?.content;

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("bulk-actions-bar")) {
        initBulkGeocode();
    }

    document.querySelectorAll(".point-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            if (typeof window.updateBulkActions === "function") {
                window.updateBulkActions();
            }
        });
    });

    const selectAllBtn      = document.getElementById("select-all-btn");
    const deselectAllBtn    = document.getElementById("deselect-all-btn");
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

    document.querySelectorAll(".dropdown-trigger").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (typeof window.toggleDropdown === "function") {
                window.toggleDropdown(btn.closest(".dropdown"));
            }
        });
    });

    document.querySelectorAll(".delete-payment-point-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id   = btn.dataset.pointId;
            const name = btn.dataset.pointName;
            confirmDeletePaymentPoint(id, name);
        });
    });
});

function confirmDeletePaymentPoint(pointId, pointName) {
    if (typeof window.showConfirmModal !== "function") {
        if (confirm(`¿Eliminar "${pointName}"? Esta acción no se puede deshacer.`)) {
            deletePaymentPoint(pointId);
        }
        return;
    }

    window.showConfirmModal({
        title: "¿Eliminar punto de pago?",
        message: `¿Estás seguro de que deseas eliminar "<strong>${pointName}</strong>"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deletePaymentPoint(pointId),
    });
}

async function deletePaymentPoint(pointId) {
    showNotification("Eliminando punto de pago...", "info");

    try {
        const response = await fetch(`${BASE_URL}/${pointId}`, {
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
            showNotification(data.message || "Punto de pago eliminado exitosamente", "success");

            const pointItem = document.getElementById(`payment-point-item-${pointId}`);
            if (pointItem) {
                pointItem.classList.add("announcement-removing");
                setTimeout(() => {
                    pointItem.remove();
                    if (document.querySelectorAll('[id^="payment-point-item-"]').length === 0) {
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
        console.error("Error deleting payment point:", error);
        showNotification("Error al eliminar el punto de pago. " + error.message, "error");
    }
}
