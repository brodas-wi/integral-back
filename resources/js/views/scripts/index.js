import axios from "axios";
import { showNotification } from "@/utils/notifications.js";

const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".script-toggle").forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const scriptId = this.dataset.scriptId;
            const checked = this.checked;
            const item = document.getElementById(`script-item-${scriptId}`);

            toggleScriptActive(scriptId, checked, item, this);
        });
    });

    const showToggle = document.getElementById("show-script-toggle");
    if (showToggle) {
        showToggle.addEventListener("change", function () {
            const scriptId = this.dataset.scriptId;
            const checked = this.checked;
            toggleScriptActive(scriptId, checked, null, this);
        });
    }
    const copyJsBtn = document.getElementById("btn-copy-js");
    if (copyJsBtn) {
        copyJsBtn.addEventListener("click", function () {
            const codeEl = document.getElementById("show-js-content");
            if (codeEl) {
                navigator.clipboard
                    .writeText(codeEl.textContent)
                    .then(() => {
                        copyJsBtn.innerHTML = '<i class="ri-check-line mr-1"></i>Copiado';
                        setTimeout(() => {
                            copyJsBtn.innerHTML = '<i class="ri-file-copy-line mr-1"></i>Copiar JS';
                        }, 2000);
                    })
                    .catch(() => {
                        showNotification("No se pudo copiar el código.", "error");
                    });
            }
        });
    }
    const copyCssBtn = document.getElementById("btn-copy-css");
    if (copyCssBtn) {
        copyCssBtn.addEventListener("click", function () {
            const codeEl = document.getElementById("show-css-content");
            if (codeEl) {
                navigator.clipboard
                    .writeText(codeEl.textContent)
                    .then(() => {
                        copyCssBtn.innerHTML = '<i class="ri-check-line mr-1"></i>Copiado';
                        setTimeout(() => {
                            copyCssBtn.innerHTML = '<i class="ri-file-copy-line mr-1"></i>Copiar CSS';
                        }, 2000);
                    })
                    .catch(() => {
                        showNotification("No se pudo copiar el código.", "error");
                    });
            }
        });
    }

    initSandboxPreview();
    initRejectModalShow();
});

function toggleScriptActive(scriptId, checked, itemEl, checkbox) {
    const baseUrl = document.querySelector('meta[name="scripts-base-url"]')?.content || "/scripts";
    const url = `${baseUrl}/${scriptId}/toggle-active`;

    axios
        .patch(url, {}, { headers: { "X-CSRF-TOKEN": csrfToken } })
        .then((res) => {
            if (res.data.success) {
                showNotification(res.data.message, "success");

                const toggleLabel = document.getElementById("toggle-label");
                if (toggleLabel) {
                    toggleLabel.textContent = res.data.is_active
                        ? "Activo"
                        : "Inactivo";
                }

                updateActiveBadge(res.data.is_active);
            } else {
                checkbox.checked = !checked;
                showNotification(res.data.message, "error");
            }
        })
        .catch((err) => {
            checkbox.checked = !checked;
            const msg =
                err.response?.data?.message ||
                "Error al cambiar el estado del script.";
            showNotification(msg, "error");
        });
}

function updateActiveBadge(isActive) {
    const badgeContainer = document.querySelector(".flex.flex-wrap.items-center.gap-2.mb-2");
    if (!badgeContainer) return;

    const existingBadge = badgeContainer.querySelector(".badge-active-indicator");
    if (isActive && !existingBadge) {
        const badge = document.createElement("span");
        badge.className = "badge badge-success badge-active-indicator";
        badge.innerHTML = '<i class="ri-checkbox-circle-line mr-1"></i>Activo';
        badgeContainer.appendChild(badge);
    } else if (!isActive && existingBadge) {
        existingBadge.remove();
    }
}

function initSandboxPreview() {
    const runBtn = document.getElementById("btn-run-preview");
    const resetBtn = document.getElementById("btn-reset-preview");
    const iframe = document.getElementById("preview-iframe");

    if (!runBtn || !iframe) return;

    const encodedJs = document.querySelector('meta[name="script-js-content"]')?.content;
    const encodedCss = document.querySelector('meta[name="script-css-content"]')?.content;

    if (!encodedJs) return;

    const jsContent = atob(encodedJs);
    const cssContent = encodedCss ? atob(encodedCss) : "";

    runBtn.addEventListener("click", function () {
        const cssBlock = cssContent.trim()
            ? `<style>\n  body { font-family: sans-serif; padding: 20px; background: #f8fafc; color: #333; }\n  .preview-notice { background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 13px; color: #0369a1; }\n  ${cssContent}\n</style>`
            : `<style>\n  body { font-family: sans-serif; padding: 20px; background: #f8fafc; color: #333; }\n  .preview-notice { background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 8px; padding: 12px 16px; margin-bottom: 16px; font-size: 13px; color: #0369a1; }\n</style>`;

        const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vista Previa</title>
  ${cssBlock}
</head>
<body>
  <div class="preview-notice">
    <strong>Sandbox activo</strong> — El script se ejecuta en un entorno aislado.${cssContent.trim() ? ' <span style="color:#0369a1;">CSS incluido.</span>' : ''}
  </div>
  <div id="app">
    <p>Contenido de ejemplo de la página pública.</p>
    <p>El script puede interactuar con este contenido.</p>
  </div>
  <script>
    try {
      ${jsContent}
    } catch(e) {
      document.body.innerHTML += '<div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:8px;padding:12px;margin-top:16px;color:#dc2626;font-size:13px;"><strong>Error en el script:</strong> ' + e.message + '</div>';
    }
  <\/script>
</body>
</html>`;

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        iframe.src = url;

        runBtn.innerHTML = '<i class="ri-refresh-line mr-1"></i>Re-ejecutar';
    });

    resetBtn.addEventListener("click", function () {
        iframe.src = "about:blank";
        runBtn.innerHTML = '<i class="ri-play-line mr-1"></i>Ejecutar';
    });
}

window.approveScriptShow = function (scriptId) {
    const url = document.querySelector('meta[name="approve-url"]')?.content;
    if (!url) return;

    if (!confirm("¿Confirmas que deseas aprobar este script?")) return;

    axios
        .patch(url, {}, { headers: { "X-CSRF-TOKEN": csrfToken } })
        .then((res) => {
            if (res.data.success) {
                showNotification(res.data.message, "success");
                setTimeout(() => window.location.reload(), 1200);
            } else {
                showNotification(res.data.message, "error");
            }
        })
        .catch((err) => {
            showNotification(
                err.response?.data?.message || "Error al aprobar el script.",
                "error"
            );
        });
};

let rejectScriptIdShow = null;

function initRejectModalShow() {
}

window.openRejectModalShow = function (scriptId, scriptName) {
    rejectScriptIdShow = scriptId;
    const modal = document.getElementById("reject-modal-show");
    const nameEl = document.getElementById("reject-script-name-show");
    const reasonEl = document.getElementById("rejection-reason-show");
    if (modal) {
        if (nameEl) nameEl.textContent = scriptName;
        if (reasonEl) reasonEl.value = "";
        modal.classList.remove("hidden");
    }
};

window.closeRejectModalShow = function () {
    const modal = document.getElementById("reject-modal-show");
    if (modal) modal.classList.add("hidden");
    rejectScriptIdShow = null;
};

window.submitRejectShow = function () {
    const url = document.querySelector('meta[name="reject-url"]')?.content;
    const reason = document
        .getElementById("rejection-reason-show")
        ?.value.trim();

    if (!reason) {
        showNotification("Debes indicar el motivo del rechazo.", "warning");
        return;
    }

    axios
        .patch(url, { rejection_reason: reason }, { headers: { "X-CSRF-TOKEN": csrfToken } })
        .then((res) => {
            if (res.data.success) {
                window.closeRejectModalShow();
                showNotification(res.data.message, "success");
                setTimeout(() => window.location.reload(), 1200);
            } else {
                showNotification(res.data.message, "error");
            }
        })
        .catch((err) => {
            showNotification(
                err.response?.data?.message || "Error al rechazar el script.",
                "error"
            );
        });
};

window.approveScript = function (scriptId, scriptName) {
    const baseUrl = document.querySelector('meta[name="scripts-base-url"]')?.content || "/scripts";

    if (!confirm(`¿Confirmas que deseas aprobar "${scriptName}"?`)) return;

    axios
        .patch(`${baseUrl}/${scriptId}/approve`, {}, { headers: { "X-CSRF-TOKEN": csrfToken } })
        .then((res) => {
            if (res.data.success) {
                showNotification(res.data.message, "success");
                setTimeout(() => window.location.reload(), 1200);
            } else {
                showNotification(res.data.message, "error");
            }
        })
        .catch((err) => {
            showNotification(
                err.response?.data?.message || "Error al aprobar el script.",
                "error"
            );
        });
};

let rejectScriptId = null;

window.openRejectModal = function (scriptId, scriptName) {
    rejectScriptId = scriptId;
    const modal = document.getElementById("reject-modal");
    const nameEl = document.getElementById("reject-script-name");
    const reasonEl = document.getElementById("rejection-reason");
    if (modal) {
        if (nameEl) nameEl.textContent = scriptName;
        if (reasonEl) reasonEl.value = "";
        modal.classList.remove("hidden");
    }
};

window.closeRejectModal = function () {
    const modal = document.getElementById("reject-modal");
    if (modal) modal.classList.add("hidden");
    rejectScriptId = null;
};

window.submitReject = function () {
    if (!rejectScriptId) return;
    const baseUrl = document.querySelector('meta[name="scripts-base-url"]')?.content || "/scripts";
    const reason = document.getElementById("rejection-reason")?.value.trim();

    if (!reason) {
        showNotification("Debes indicar el motivo del rechazo.", "warning");
        return;
    }

    axios
        .patch(
            `${baseUrl}/${rejectScriptId}/reject`,
            { rejection_reason: reason },
            { headers: { "X-CSRF-TOKEN": csrfToken } }
        )
        .then((res) => {
            if (res.data.success) {
                window.closeRejectModal();
                showNotification(res.data.message, "success");
                setTimeout(() => window.location.reload(), 1200);
            } else {
                showNotification(res.data.message, "error");
            }
        })
        .catch((err) => {
            showNotification(
                err.response?.data?.message || "Error al rechazar el script.",
                "error"
            );
        });
};

window.confirmDeleteScript = function (scriptId, scriptName) {
    if (
        !confirm(
            `¿Estás seguro de que deseas eliminar "${scriptName}"?\nEsta acción no se puede deshacer.`
        )
    )
        return;

    const deleteUrl =
        document.querySelector('meta[name="delete-url"]')?.content ||
        `${document.querySelector('meta[name="scripts-base-url"]')?.content || "/scripts"}/${scriptId}`;
    const indexUrl =
        document.querySelector('meta[name="scripts-index-url"]')?.content ||
        document.querySelector('meta[name="scripts-base-url"]')?.content ||
        "/scripts";

    axios
        .delete(deleteUrl, { headers: { "X-CSRF-TOKEN": csrfToken } })
        .then((res) => {
            if (res.data.success) {
                showNotification(res.data.message, "success");
                setTimeout(() => {
                    window.location.href = indexUrl;
                }, 1200);
            } else {
                showNotification(res.data.message, "error");
            }
        })
        .catch((err) => {
            showNotification(
                err.response?.data?.message || "Error al eliminar el script.",
                "error"
            );
        });
};
