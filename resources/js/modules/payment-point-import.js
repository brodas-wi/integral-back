export function initPaymentPointImport() {
    const importForm = document.getElementById("import-form");
    if (!importForm) return;

    const dropZone = document.getElementById("drop-zone-import");
    const fileInput = document.getElementById("file-input");
    const dropZoneContent = document.getElementById("drop-zone-content");
    const filePreview = document.getElementById("file-preview");
    const fileName = document.getElementById("file-name");
    const fileSize = document.getElementById("file-size");
    const removeFileBtn = document.getElementById("remove-file");
    const importBtn = document.getElementById("import-btn");
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");
    const progressDetails = document.getElementById("progress-details");

    dropZone.addEventListener("click", () => fileInput.click());

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("border-primary", "bg-blue-50");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("border-primary", "bg-blue-50");
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-primary", "bg-blue-50");
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });

    fileInput.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });

    removeFileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        fileInput.value = "";
        dropZoneContent.classList.remove("hidden");
        filePreview.classList.add("hidden");
        importBtn.disabled = true;
    });

    function handleFile(file) {
        const validTypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-excel",
            "text/csv",
        ];

        if (!validTypes.includes(file.type)) {
            alert("Por favor selecciona un archivo Excel (.xlsx, .xls) o CSV");
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            alert("El archivo no puede superar 10MB");
            return;
        }

        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);

        dropZoneContent.classList.add("hidden");
        filePreview.classList.remove("hidden");
        importBtn.disabled = false;
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return (
            Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
        );
    }

    importForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (!fileInput.files[0]) {
            alert("Por favor selecciona un archivo");
            return;
        }

        const formData = new FormData();
        formData.append("file", fileInput.files[0]);

        importBtn.disabled = true;
        importBtn.innerHTML =
            '<i class="ri-loader-4-line mr-2 animate-spin"></i> Importando...';
        progressContainer.classList.remove("hidden");
        updateProgress(10, "Iniciando importación...");

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            updateProgress(30, "Leyendo archivo...");

            const response = await fetch(importForm.action, {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    Accept: "application/json",
                },
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                updateProgress(100, data.message);

                setTimeout(() => {
                    window.location.href = data.redirect || "/payment-points";
                }, 2000);
            } else {
                throw new Error(data.message || "Error al importar");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al importar: " + error.message);
            importBtn.disabled = false;
            importBtn.innerHTML =
                '<i class="ri-upload-line mr-2"></i> Importar Puntos de Pago';
            progressContainer.classList.add("hidden");
        }
    });

    function updateProgress(percent, details) {
        progressBar.style.setProperty("--progress", percent + "%");
        progressText.textContent = Math.round(percent) + "%";
        progressDetails.textContent = details;
    }
}
