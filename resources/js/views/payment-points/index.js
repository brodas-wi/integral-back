import { showNotification } from "@/utils/notifications.js";
// import { initBulkGeocode } from "@/modules/payment-point-bulk-geocode.js";

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;
const BASE_URL = document.querySelector('meta[name="payment-points-base-url"]')?.content?.replace(/\/$/, "");

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

let busy = false;

const checkboxes = () => [...document.querySelectorAll(".point-checkbox")];
const itemOf = (id) => document.getElementById(`payment-point-item-${id}`);

const selectedItems = () =>
    checkboxes()
        .filter((box) => box.checked)
        .map((box) => itemOf(box.dataset.pointId))
        .filter(Boolean);

function targetsFor(action) {
    const items = selectedItems();
    if (action === "activate") return items.filter((item) => item.dataset.active === "0");
    if (action === "deactivate") return items.filter((item) => item.dataset.active === "1");
    return items;
}

function refreshBulkBar() {
    const bar = document.getElementById("bulk-actions-bar");
    if (!bar) return;

    const total = selectedItems().length;
    bar.classList.toggle("hidden", total === 0);

    const counter = document.getElementById("selected-count");
    if (counter) counter.textContent = total;

    document.querySelectorAll("[data-bulk]").forEach((button) => {
        const count = targetsFor(button.dataset.bulk).length;
        const label = button.querySelector("[data-bulk-count]");
        if (label) label.textContent = count;
        button.disabled = busy || count === 0;
    });
}

function setBusy(value) {
    busy = value;
    refreshBulkBar();
}

function clearSelection() {
    checkboxes().forEach((box) => {
        box.checked = false;
    });
    refreshBulkBar();
}

async function request(url, method, body) {
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF,
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
        body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        if (response.status === 419) throw new Error("Tu sesión expiró. Recarga la página.");
        throw new Error(data.message || `Error del servidor: ${response.status}`);
    }
    return data;
}

function paintStatus(item, active) {
    item.dataset.active = active ? "1" : "0";
    const badge = item.querySelector("[data-point-status]");
    if (!badge) return;
    badge.textContent = active ? "Activo" : "Inactivo";
    badge.classList.toggle("badge-success", active);
    badge.classList.toggle("badge-danger", !active);
}

const BULK_TEXT = {
    activate: {
        title: "¿Activar puntos de pago?",
        text: (n, noun) => `Se activarán ${n} ${noun}.`,
        ok: "Activar",
        type: "success",
    },
    deactivate: {
        title: "¿Desactivar puntos de pago?",
        text: (n, noun) => `Se desactivarán ${n} ${noun}.`,
        ok: "Desactivar",
        type: "warning",
    },
    delete: {
        title: "¿Eliminar puntos de pago?",
        text: (n, noun) => `Se eliminarán ${n} ${noun}. Esta acción no se puede deshacer.`,
        ok: "Eliminar",
        type: "danger",
    },
};

function runBulk(action) {
    if (busy) return;
    const items = targetsFor(action);
    if (!items.length) return;

    const ids = items.map((item) => Number(item.dataset.pointId));
    const noun = ids.length === 1 ? "punto de pago" : "puntos de pago";
    const config = BULK_TEXT[action];

    const execute = async () => {
        setBusy(true);
        try {
            if (action === "delete") {
                const data = await request(`${BASE_URL}/bulk-delete`, "POST", { ids });
                showNotification(data.message || "Puntos de pago eliminados", "success");
                setTimeout(() => window.location.reload(), 700);
                return;
            }

            const active = action === "activate";
            const data = await request(`${BASE_URL}/bulk-status`, "POST", { ids, active });
            (data.updated_ids || []).forEach((id) => {
                const item = itemOf(id);
                if (item) paintStatus(item, active);
            });
            showNotification(data.message, data.updated_ids?.length ? "success" : "info");
            clearSelection();
        } catch (error) {
            showNotification(error.message || "No se pudo completar la acción", "error");
        } finally {
            setBusy(false);
        }
    };

    if (typeof window.showConfirmModal !== "function") {
        if (confirm(config.text(ids.length, noun))) execute();
        return;
    }

    window.showConfirmModal({
        title: config.title,
        message: config.text(ids.length, noun),
        confirmText: config.ok,
        cancelText: "Cancelar",
        type: config.type,
        onConfirm: execute,
    });
}

function confirmDeletePaymentPoint(pointId, pointName) {
    if (typeof window.showConfirmModal !== "function") {
        if (confirm(`¿Eliminar "${pointName}"? Esta acción no se puede deshacer.`)) {
            deletePaymentPoint(pointId);
        }
        return;
    }

    window.showConfirmModal({
        title: "¿Eliminar punto de pago?",
        message: `¿Estás seguro de que deseas eliminar "<strong>${escapeHtml(pointName)}</strong>"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deletePaymentPoint(pointId),
    });
}

async function deletePaymentPoint(pointId) {
    if (busy) return;
    setBusy(true);
    showNotification("Eliminando punto de pago...", "info");

    try {
        const data = await request(`${BASE_URL}/${pointId}`, "DELETE");
        if (data.success === false) throw new Error(data.message || "Error al eliminar");

        showNotification(data.message || "Punto de pago eliminado exitosamente", "success");

        const item = itemOf(pointId);
        if (!item) {
            setTimeout(() => (window.location.href = BASE_URL), 1200);
            return;
        }

        item.classList.add("announcement-removing");
        setTimeout(() => {
            item.remove();
            if (document.querySelectorAll(".payment-point-item").length === 0) {
                window.location.reload();
            } else {
                refreshBulkBar();
            }
        }, 300);
    } catch (error) {
        console.error("Error deleting payment point:", error);
        showNotification("Error al eliminar el punto de pago. " + error.message, "error");
    } finally {
        setBusy(false);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // if (document.getElementById("bulk-actions-bar")) initBulkGeocode();

    document.addEventListener("change", (event) => {
        if (event.target.matches(".point-checkbox")) refreshBulkBar();
    });

    document.getElementById("select-all-btn")?.addEventListener("click", () => {
        checkboxes().forEach((box) => {
            box.checked = true;
        });
        refreshBulkBar();
    });

    document.getElementById("deselect-all-btn")?.addEventListener("click", clearSelection);

    document.querySelectorAll("[data-bulk]").forEach((button) => {
        button.addEventListener("click", () => runBulk(button.dataset.bulk));
    });

    document.querySelectorAll(".dropdown-trigger").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            if (typeof window.toggleDropdown === "function") {
                window.toggleDropdown(btn.closest(".dropdown"));
            }
        });
    });

    document.querySelectorAll(".delete-payment-point-btn").forEach((btn) => {
        btn.addEventListener("click", () =>
            confirmDeletePaymentPoint(btn.dataset.pointId, btn.dataset.pointName),
        );
    });

    refreshBulkBar();
});