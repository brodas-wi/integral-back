import { showNotification } from "@/utils/notifications.js";

document.addEventListener("DOMContentLoaded", () => {
    initMediaUpload();
});

function initMediaUpload() {
    const dropZone = document.getElementById("drop-zone");
    const fileInput = document.getElementById("file-input");
    const fileList = document.getElementById("file-list");
    const fileItems = document.getElementById("file-items");
    const submitBtn = document.getElementById("submit-btn");
    const uploadForm = document.getElementById("upload-form");
    const uploadProgress = document.getElementById("upload-progress");
    const progressBar = document.getElementById("progress-bar");
    const progressText = document.getElementById("progress-text");

    if (!dropZone || !fileInput) return;

    dropZone.addEventListener("click", () => {
        fileInput.click();
    });

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("border-primary", "bg-orange-50");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("border-primary", "bg-orange-50");
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-primary", "bg-orange-50");

        const files = Array.from(e.dataTransfer.files);

        if (files.length > 10) {
            showNotification("No puedes subir más de 10 archivos a la vez", "error");
            return;
        }
        if (files.length === 0) {
            showNotification("Debes seleccionar al menos un archivo", "error");
            return;
        }

        const dt = new DataTransfer();
        files.forEach((file) => dt.items.add(file));
        fileInput.files = dt.files;

        displayFiles(fileInput, fileList, fileItems, submitBtn);
    });

    fileInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 10) {
            showNotification("No puedes subir más de 10 archivos a la vez", "error");
            fileInput.value = "";
            return;
        }
        if (files.length === 0) {
            fileList.classList.add("hidden");
            submitBtn.disabled = true;
            return;
        }

        displayFiles(fileInput, fileList, fileItems, submitBtn);
    });

    uploadForm.addEventListener("submit", function (e) {
        if (fileInput.files.length === 0) {
            e.preventDefault();
            showNotification("Debes seleccionar al menos un archivo", "error");
            return false;
        }
        submitBtn.disabled = true;
        uploadProgress.classList.remove("hidden");
        simulateProgress(progressBar, progressText);
    });

    // Delegación de eventos para el botón de quitar archivo (data-remove-file),
    // ya que los elementos se generan dinámicamente en displayFiles().
    fileItems.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-remove-file]");
        if (!btn) return;
        const index = parseInt(btn.dataset.removeFile, 10);
        removeMediaFile(index, fileInput, fileList, fileItems, submitBtn);
    });
}

function displayFiles(fileInput, fileList, fileItems, submitBtn) {
    const files = Array.from(fileInput.files);

    if (files.length === 0) {
        fileList.classList.add("hidden");
        submitBtn.disabled = true;
        return;
    }

    fileList.classList.remove("hidden");
    fileItems.innerHTML = "";
    submitBtn.disabled = false;

    files.forEach((file, index) => {
        const fileItem = document.createElement("div");
        fileItem.className = "bg-gray-50 rounded-lg p-4 border border-gray-200";

        const isImage = file.type.startsWith("image/");

        if (isImage) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgPreview = fileItem.querySelector(".image-preview");
                if (imgPreview) {
                    imgPreview.innerHTML = `<img src="${e.target.result}" alt="${file.name}" class="w-full h-full object-cover rounded">`;
                }
            };
            reader.readAsDataURL(file);
        }

        fileItem.innerHTML = `
            <div class="flex items-start gap-4">
                <div class="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center image-preview">
                    ${isImage ? '<div class="animate-pulse bg-gray-300 w-full h-full"></div>' : `<i class="${getFileIcon(file.type)} text-4xl"></i>`}
                </div>
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex-1 min-w-0 pr-4">
                            <p class="font-medium text-secondary truncate">${file.name}</p>
                            <p class="text-xs text-gray-600 mt-1">${formatFileSize(file.size)}</p>
                        </div>
                        <button
                            type="button"
                            data-remove-file="${index}"
                            class="flex-shrink-0 text-red-500 hover:text-red-700 p-2">
                            <i class="ri-close-line text-xl"></i>
                        </button>
                    </div>
                    ${isImage
                ? `
                    <div>
                        <label class="block text-xs font-medium text-gray-700 mb-1">
                            Texto Alternativo (ALT) <span class="text-gray-500">(Opcional)</span>
                        </label>
                        <input
                            type="text"
                            name="alts[]"
                            placeholder="Describe esta imagen para accesibilidad..."
                            class="input-field text-sm"
                            maxlength="255">
                    </div>
                    `
                : `<input type="hidden" name="alts[]" value="">`
            }
                </div>
            </div>
        `;

        fileItems.appendChild(fileItem);
    });
}

function removeMediaFile(index, fileInput, fileList, fileItems, submitBtn) {
    const files = Array.from(fileInput.files);
    files.splice(index, 1);

    const dt = new DataTransfer();
    files.forEach((file) => dt.items.add(file));
    fileInput.files = dt.files;

    displayFiles(fileInput, fileList, fileItems, submitBtn);

    if (files.length === 0) {
        submitBtn.disabled = true;
        fileList.classList.add("hidden");
    }
}

function getFileIcon(type) {
    if (type.startsWith("image/")) return "ri-image-line text-blue-500";
    if (type === "application/pdf") return "ri-file-pdf-line text-red-500";
    return "ri-file-excel-line text-green-500";
}

function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

function simulateProgress(progressBar, progressText) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        progressBar.style.width = progress + "%";
        progressText.textContent = Math.round(progress) + "%";

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 200);
}