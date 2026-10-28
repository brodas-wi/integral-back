import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";
import { showUsagesModal } from "@/components/usages-modal.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

const selectedIds = new Set();

document.addEventListener("DOMContentLoaded", () => {
    initDeleteMedia();
    initCheckUsages();
    initBulkDelete();
});

function initDeleteMedia() {
    document.querySelectorAll("[data-delete-media]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const mediaId = btn.dataset.mediaId;
            const filename = btn.dataset.filename;
            confirmDeleteMedia(mediaId, filename);
        });
    });
}

function confirmDeleteMedia(mediaId, filename) {
    showConfirmModal({
        title: "¿Mover a la papelera?",
        message: `¿Estás seguro de que deseas mover "${filename}" a la papelera?`,
        confirmText: "Mover a papelera",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deleteMedia(mediaId, filename),
    });
}

function deleteMedia(mediaId) {
    if (!CSRF) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    fetch(buildUrl(`media/${mediaId}`), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
    })
        .then((response) => response.json().then((data) => ({ status: response.status, data })))
        .then(({ status, data }) => {
            if (status === 422 && data.usages) {
                showUsagesModal(data.usages, data.message);
                return;
            }

            if (status === 409 && data.requires_thumbnail_confirmation) {
                confirmThumbnailDeletion(mediaId, data.thumbnail_filename);
                return;
            }

            if (data.success) {
                showNotification(data.message || "Movido a la papelera", "success");
                removeMediaItemFromGrid(mediaId);
            } else {
                showNotification(data.message || "Error desconocido", "error");
            }
        })
        .catch(() => showNotification("Error al eliminar. Verifica tu conexión.", "error"));
}

function confirmThumbnailDeletion(mediaId, thumbnailFilename) {
    showConfirmModal({
        title: "Miniatura asociada",
        message: `Este video tiene una miniatura asociada ("${thumbnailFilename}"). Puedes eliminarla también o conservarla.`,
        confirmText: "Eliminar ambos",
        cancelText: "Conservar miniatura",
        type: "warning",
        onConfirm: () => deleteMediaWithThumbnail(mediaId, true),
        onCancel: () => deleteMediaWithThumbnail(mediaId, false),
    });
}

function deleteMediaWithThumbnail(mediaId, deleteThumbnail) {
    fetch(buildUrl(`media/${mediaId}/destroy-with-thumbnail`), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
        body: JSON.stringify({ delete_thumbnail: deleteThumbnail }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                showNotification(data.message || "Movido a la papelera", "success");
                removeMediaItemFromGrid(mediaId);
            } else {
                showNotification(data.message || "Error desconocido", "error");
            }
        })
        .catch(() => showNotification("Error al eliminar. Verifica tu conexión.", "error"));
}

function removeMediaItemFromGrid(mediaId) {
    const mediaItem = document.getElementById(`media-item-${mediaId}`);
    if (!mediaItem) {
        refreshMediaGrid();
        return;
    }

    mediaItem.style.transition = "opacity 0.3s, transform 0.3s";
    mediaItem.style.opacity = "0";
    mediaItem.style.transform = "scale(0.9)";
    setTimeout(() => {
        mediaItem.remove();
        refreshMediaGrid();
    }, 300);
}

async function refreshMediaGrid() {
    try {
        const response = await fetch(window.location.href, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
            credentials: "same-origin",
        });
        const html = await response.text();
        const doc = new DOMParser().parseFromString(html, "text/html");

        const newGrid = doc.getElementById("media-grid");
        if (!newGrid) {
            const url = new URL(window.location.href);
            const page = parseInt(url.searchParams.get("page") || "1", 10);
            if (page > 1) {
                url.searchParams.set("page", page - 1);
                window.location.href = url.toString();
            } else {
                window.location.reload();
            }
            return;
        }

        document.getElementById("media-grid").innerHTML = newGrid.innerHTML;

        const pagination = document.getElementById("media-pagination");
        const newPagination = doc.getElementById("media-pagination");
        if (pagination && newPagination) {
            pagination.innerHTML = newPagination.innerHTML;
        }

        const counter = document.querySelector("[data-media-count]");
        const newCounter = doc.querySelector("[data-media-count]");
        if (counter && newCounter) {
            counter.textContent = newCounter.textContent;
        }

        initDeleteMedia();
        initCheckUsages();
        syncSelection();
    } catch {
        window.location.reload();
    }
}

function initCheckUsages() {
    document.querySelectorAll("[data-check-usages]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const mediaId = btn.dataset.mediaId;
            fetch(buildUrl(`media/${mediaId}/usages`), {
                headers: { Accept: "application/json" },
            })
                .then((res) => res.json())
                .then((data) => showUsagesModal(data.usages))
                .catch(() => showNotification("Error al consultar el uso del archivo", "error"));
        });
    });
}

function initBulkDelete() {
    document.addEventListener("change", (e) => {
        const target = e.target;

        if (target.matches("[data-media-select]")) {
            setSelected(target.value, target.checked);
            updateBulkBar();
        } else if (target.matches("[data-select-all]")) {
            document.querySelectorAll("[data-media-select]:not(:disabled)").forEach((checkbox) => {
                checkbox.checked = target.checked;
                setSelected(checkbox.value, target.checked);
            });
            updateBulkBar();
        }
    });

    document.addEventListener("click", (e) => {
        if (e.target.closest("[data-bulk-clear]")) {
            clearSelection();
        } else if (e.target.closest("[data-bulk-delete]")) {
            confirmBulkDelete();
        }
    });
}

function setSelected(id, selected) {
    if (selected) {
        selectedIds.add(id);
    } else {
        selectedIds.delete(id);
    }
    const card = document.getElementById(`media-item-${id}`);
    if (card) card.classList.toggle("mu-selected", selected);
}

function updateBulkBar() {
    const countEl = document.querySelector("[data-bulk-count]");
    const actions = document.querySelector("[data-bulk-actions]");
    const selectAll = document.querySelector("[data-select-all]");
    if (!countEl || !actions || !selectAll) return;

    const count = selectedIds.size;
    countEl.hidden = count === 0;
    actions.hidden = count === 0;
    countEl.textContent = `${count} ${count === 1 ? "seleccionado" : "seleccionados"}`;

    const selectable = document.querySelectorAll("[data-media-select]:not(:disabled)").length;
    const checked = document.querySelectorAll("[data-media-select]:checked").length;
    selectAll.checked = selectable > 0 && checked === selectable;
    selectAll.indeterminate = checked > 0 && checked < selectable;
}

function clearSelection() {
    selectedIds.clear();
    document.querySelectorAll("[data-media-select]").forEach((checkbox) => {
        checkbox.checked = false;
    });
    document.querySelectorAll(".mu-selected").forEach((card) => card.classList.remove("mu-selected"));
    updateBulkBar();
}

function syncSelection() {
    const present = new Set();

    document.querySelectorAll("[data-media-select]").forEach((checkbox) => {
        present.add(checkbox.value);
        if (selectedIds.has(checkbox.value)) {
            checkbox.checked = true;
            checkbox.closest(".card")?.classList.add("mu-selected");
        }
    });

    [...selectedIds].forEach((id) => {
        if (!present.has(id)) selectedIds.delete(id);
    });

    updateBulkBar();
}

function confirmBulkDelete() {
    const count = selectedIds.size;
    if (count === 0) return;

    showConfirmModal({
        title: "¿Mover a la papelera?",
        message: `¿Estás seguro de que deseas mover ${count} ${count === 1 ? "archivo" : "archivos"} a la papelera?`,
        confirmText: "Mover a papelera",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: bulkDeleteMedia,
    });
}

function bulkDeleteMedia() {
    if (!CSRF) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    fetch(buildUrl("media/bulk-delete"), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
        body: JSON.stringify({ ids: [...selectedIds] }),
    })
        .then((response) => response.json())
        .then((data) => {
            const type = data.success ? (data.blocked && data.blocked.length ? "warning" : "success") : "error";
            showNotification(data.message || "Error desconocido", type);
            selectedIds.clear();
            refreshMediaGrid();
        })
        .catch(() => showNotification("Error al eliminar. Verifica tu conexión.", "error"));
}