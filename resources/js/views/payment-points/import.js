import { showNotification } from "@/utils/notifications.js";

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

const TONES = {
    red: "bg-red-50 border-red-200 text-red-800",
    yellow: "bg-yellow-50 border-yellow-200 text-yellow-800",
    blue: "bg-blue-50 border-blue-200 text-blue-800",
};

document.addEventListener("DOMContentLoaded", function () {
    const importForm = document.getElementById("import-form");
    if (!importForm) return;

    const dropZone        = document.getElementById("drop-zone-import");
    const fileInput       = document.getElementById("file-input");
    const dropZoneContent = document.getElementById("drop-zone-content");
    const filePreview     = document.getElementById("file-preview");
    const fileNameEl      = document.getElementById("file-name");
    const fileSizeEl      = document.getElementById("file-size");
    const removeFileBtn   = document.getElementById("remove-file");
    const importBtn       = document.getElementById("import-btn");
    const progressContainer = document.getElementById("progress-container");
    const progressBar     = document.getElementById("progress-bar");
    const progressText    = document.getElementById("progress-text");
    const progressDetails = document.getElementById("progress-details");
    const resultsContainer = document.getElementById("import-results");

    dropZone?.addEventListener("click", () => fileInput?.click());

    dropZone?.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("border-primary", "bg-blue-50");
    });

    dropZone?.addEventListener("dragleave", () => {
        dropZone.classList.remove("border-primary", "bg-blue-50");
    });

    dropZone?.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-primary", "bg-blue-50");
        const files = e.dataTransfer.files;
        if (files.length > 0) handleFile(files[0]);
    });

    fileInput?.addEventListener("change", (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });
    removeFileBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        if (fileInput) fileInput.value = "";
        dropZoneContent?.classList.remove("hidden");
        filePreview?.classList.add("hidden");
        if (importBtn) importBtn.disabled = true;
    });

    importForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!fileInput?.files[0]) {
            showNotification("Por favor selecciona un archivo", "warning");
            return;
        }

        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        if (importBtn) {
            importBtn.disabled = true;
            importBtn.innerHTML = '<i class="ri-loader-4-line mr-2 animate-spin"></i> Importando...';
        }
        resultsContainer?.classList.add("hidden");
        progressContainer?.classList.remove("hidden");
        updateProgress(10, "Iniciando importación...");

        try {
            updateProgress(30, "Leyendo archivo...");

            const response = await fetch(importForm.action, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": CSRF,
                    Accept: "application/json",
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                const result = data.data || {};
                const groups = collectIssues(result);
                updateProgress(100, data.message);

                if (groups.length === 0 && result.imported > 0) {
                    showNotification(data.message || "Importación completada", "success");
                    setTimeout(() => {
                        window.location.href = data.redirect || "/payment-points";
                    }, 2000);
                } else {
                    showNotification(data.message, result.imported > 0 ? "warning" : "error");
                    renderResults(data, groups);
                    resetButton();
                }
            } else {
                throw new Error(data.message || "Error al importar");
            }
        } catch (error) {
            console.error("Import error:", error);
            showNotification("Error al importar: " + error.message, "error");

            if (importBtn) {
                importBtn.disabled = false;
                importBtn.innerHTML = '<i class="ri-upload-line mr-2"></i> Importar Puntos';
            }
            progressContainer?.classList.add("hidden");
        }
    });

    function handleFile(file) {
        const validTypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
            "text/csv",
        ];

        if (!validTypes.includes(file.type)) {
            showNotification("Por favor selecciona un archivo Excel (.xlsx, .xls) o CSV", "error");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            showNotification("El archivo no puede superar 10MB", "error");
            return;
        }

        if (fileNameEl) fileNameEl.textContent = file.name;
        if (fileSizeEl) fileSizeEl.textContent  = formatFileSize(file.size);

        dropZoneContent?.classList.add("hidden");
        filePreview?.classList.remove("hidden");
        if (importBtn) importBtn.disabled = false;
    }

    function collectIssues(result) {
        return [
            { title: "Errores", tone: "red", items: result.errors || [] },
            { title: "Duplicados omitidos", tone: "yellow", items: result.duplicates || [] },
            { title: "Avisos de coordenadas", tone: "blue", items: result.warnings || [] },
        ].filter((group) => group.items.length > 0);
    }

    function renderResults(data, groups) {
        if (!resultsContainer) return;

        const result = data.data || {};
        const summary = `<p class="text-sm font-semibold text-secondary">${escapeHtml(data.message)}</p>`;

        const sections = groups
            .map(
                (group) => `
            <div class="border rounded-lg p-4 ${TONES[group.tone]}">
                <p class="font-semibold mb-2">${group.title} (${group.items.length})</p>
                <ul class="list-disc list-inside text-sm space-y-1 max-h-64 overflow-y-auto">
                    ${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                </ul>
            </div>`,
            )
            .join("");

        const link =
            result.imported > 0
                ? `<a href="${escapeHtml(data.redirect || "/payment-points")}" class="btn-outline inline-flex items-center"><i class="ri-list-check mr-2"></i> Ver puntos de pago</a>`
                : "";

        resultsContainer.innerHTML = summary + sections + link;
        resultsContainer.classList.remove("hidden");
        resultsContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function resetButton() {
        if (importBtn) {
            importBtn.disabled = false;
            importBtn.innerHTML = '<i class="ri-upload-line mr-2"></i> Importar Puntos';
        }
        progressContainer?.classList.add("hidden");
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return "0 Bytes";
        const k     = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i     = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
    }

    function updateProgress(percent, details) {
        if (progressBar)     progressBar.style.setProperty("--progress", percent + "%");
        if (progressText)    progressText.textContent    = Math.round(percent) + "%";
        if (progressDetails) progressDetails.textContent = details;
    }
});
