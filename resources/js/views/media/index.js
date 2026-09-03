import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');

document.addEventListener("DOMContentLoaded", () => {
    initDeleteMedia();
    initCheckUsages();
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

            if (data.success) {
                showNotification(data.message || "Movido a la papelera", "success");
                const mediaItem = document.getElementById(`media-item-${mediaId}`);
                if (mediaItem) {
                    mediaItem.style.transition = "opacity 0.3s, transform 0.3s";
                    mediaItem.style.opacity = "0";
                    mediaItem.style.transform = "scale(0.9)";
                    setTimeout(() => {
                        mediaItem.remove();
                        if (document.querySelectorAll('[id^="media-item-"]').length === 0) {
                            window.location.reload();
                        }
                    }, 300);
                }
            } else {
                showNotification(data.message || "Error desconocido", "error");
            }
        })
        .catch(() => showNotification("Error al eliminar. Verifica tu conexión.", "error"));
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

function showUsagesModal(usages, customMessage = null) {
    const existing = document.getElementById("media-usages-modal");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "media-usages-modal";
    overlay.style.cssText =
        "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);padding:1rem;";

    const listHtml = usages.length
        ? usages
            .map(
                (u) =>
                    `<li style="padding:0.5rem 0.75rem;border-bottom:1px solid #f1f5f9;"><a href="${u.url}" target="_blank" style="color:#003B71;font-weight:600;text-decoration:none;">${u.label}</a> <span style="color:#94a3b8;font-size:0.75rem;text-transform:uppercase;">(${u.type})</span></li>`,
            )
            .join("")
        : '<li style="padding:0.75rem;color:#64748b;">Este archivo no está en uso actualmente.</li>';

    overlay.innerHTML = `
        <div style="background:#fff;border-radius:0.75rem;width:100%;max-width:480px;max-height:80vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);">
            <div style="padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;">
                <h2 style="margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;">Dónde se usa este archivo</h2>
                <button id="usages-modal-close" style="background:none;border:none;cursor:pointer;font-size:1.25rem;color:#94a3b8;">×</button>
            </div>
            ${customMessage ? `<div style="padding:0.75rem 1.25rem;background:#fef2f2;color:#b91c1c;font-size:0.8125rem;">${customMessage}</div>` : ""}
            <ul style="list-style:none;margin:0;padding:0;overflow-y:auto;">${listHtml}</ul>
        </div>`;

    document.body.appendChild(overlay);
    overlay.querySelector("#usages-modal-close").onclick = () => overlay.remove();
    overlay.onclick = (e) => {
        if (e.target === overlay) overlay.remove();
    };
}