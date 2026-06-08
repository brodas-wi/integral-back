/**
 * Payment Points Import View
 *
 * Handles:
 *  - Drag-and-drop / click file selection
 *  - File validation (type & size)
 *  - Progress bar during import
 *  - AJAX form submission
 *
 * No inline onclick / onchange attributes are used in the blade template.
 * The import form action URL is read directly from the <form action="..."> attribute.
 */

import { showNotification } from "@/utils/notifications.js";

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

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

    // ── Drop zone click ─────────────────────────────────────────────────────
    dropZone?.addEventListener("click", () => fileInput?.click());

    // ── Drag over / leave ───────────────────────────────────────────────────
    dropZone?.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("border-primary", "bg-blue-50");
    });

    dropZone?.addEventListener("dragleave", () => {
        dropZone.classList.remove("border-primary", "bg-blue-50");
    });

    // ── Drop ────────────────────────────────────────────────────────────────
    dropZone?.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-primary", "bg-blue-50");
        const files = e.dataTransfer.files;
        if (files.length > 0) handleFile(files[0]);
    });

    // ── File input change ───────────────────────────────────────────────────
    fileInput?.addEventListener("change", (e) => {
        if (e.target.files.length > 0) handleFile(e.target.files[0]);
    });

    // ── Remove file ─────────────────────────────────────────────────────────
    removeFileBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        if (fileInput) fileInput.value = "";
        dropZoneContent?.classList.remove("hidden");
        filePreview?.classList.add("hidden");
        if (importBtn) importBtn.disabled = true;
    });

    // ── Form submit ─────────────────────────────────────────────────────────
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
                updateProgress(100, data.message);
                showNotification(data.message || "Importación completada", "success");
                setTimeout(() => {
                    window.location.href = data.redirect || "/payment-points";
                }, 2000);
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

    // ── Helpers ─────────────────────────────────────────────────────────────

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
