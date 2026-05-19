import { showNotification } from "../utils/notifications.js";
import { showConfirmModal } from "../utils/modals.js";

// Confirm delete media file
export function confirmDeleteMedia(mediaId, filename) {
    if (typeof window.showConfirmModal !== "function") {
        if (
            confirm(
                `¿Eliminar "${filename}"? Esta acción no se puede deshacer.`,
            )
        ) {
            deleteMedia(mediaId, filename);
        }
        return;
    }

    showConfirmModal({
        title: "¿Eliminar archivo?",
        message: `¿Estás seguro de que deseas eliminar "${filename}"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => {
            deleteMedia(mediaId, filename);
        },
    });
}

// Delete media file via AJAX
export function deleteMedia(mediaId, filename) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]');

    if (!csrfToken) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    const url = `/media/${mediaId}`;

    showNotification("Eliminando archivo...", "info");

    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
    })
        .then((response) => {
            if (
                !response.headers
                    .get("content-type")
                    ?.includes("application/json")
            ) {
                throw new Error("Respuesta inválida del servidor");
            }

            if (response.status === 403) {
                return response.json().then((data) => {
                    throw new Error(data.message || "Sin permisos");
                });
            }

            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }

            return response.json();
        })
        .then((data) => {
            if (data.success) {
                showNotification(
                    data.message || "Archivo eliminado",
                    "success",
                );

                const mediaItem = document.getElementById(
                    `media-item-${mediaId}`,
                );
                if (mediaItem) {
                    mediaItem.style.transition = "opacity 0.3s, transform 0.3s";
                    mediaItem.style.opacity = "0";
                    mediaItem.style.transform = "scale(0.9)";

                    setTimeout(() => {
                        mediaItem.remove();
                        if (
                            document.querySelectorAll('[id^="media-item-"]')
                                .length === 0
                        ) {
                            window.location.reload();
                        }
                    }, 300);
                }
            } else {
                throw new Error(data.message || "Error desconocido");
            }
        })
        .catch((error) => {
            let errorMessage = "Error al eliminar. ";

            if (error.message.includes("permisos")) {
                errorMessage += "Contacta al administrador.";
            } else if (error.message.includes("Failed to fetch")) {
                errorMessage += "Verifica tu conexión.";
            } else {
                errorMessage += error.message;
            }

            showNotification(errorMessage, "error");
        });
}

// Initialize file upload functionality
export function initMediaUpload() {
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

    // Click to select files
    dropZone.addEventListener("click", () => {
        fileInput.click();
    });

    // Handle drag over
    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("border-primary", "bg-orange-50");
    });

    // Handle drag leave
    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("border-primary", "bg-orange-50");
    });

    // Handle file drop
    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("border-primary", "bg-orange-50");

        const files = Array.from(e.dataTransfer.files);

        if (files.length > 10) {
            showNotification(
                "No puedes subir más de 10 archivos a la vez",
                "error",
            );
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

    // Handle file input change
    fileInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 10) {
            showNotification(
                "No puedes subir más de 10 archivos a la vez",
                "error",
            );
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

    // Handle form submission
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
}

// Display selected files with preview
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
                            onclick="removeMediaFile(${index})"
                            class="flex-shrink-0 text-red-500 hover:text-red-700 p-2">
                            <i class="ri-close-line text-xl"></i>
                        </button>
                    </div>
                    ${
                        isImage
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
                            : `
                    <input type="hidden" name="alts[]" value="">
                    `
                    }
                </div>
            </div>
        `;

        fileItems.appendChild(fileItem);
    });
}

// Remove file from selection
export function removeMediaFile(index) {
    const fileInput = document.getElementById("file-input");
    const fileList = document.getElementById("file-list");
    const fileItems = document.getElementById("file-items");
    const submitBtn = document.getElementById("submit-btn");

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

// Get icon based on file type
function getFileIcon(type) {
    if (type.startsWith("image/")) return "ri-image-line text-blue-500";
    if (type === "application/pdf") return "ri-file-pdf-line text-red-500";
    return "ri-file-excel-line text-green-500";
}

// Format file size to human readable
function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

// Simulate upload progress animation
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

// Copy media URL to clipboard
export function copyMediaUrl() {
    const urlInput = document.getElementById('file-url');
    if (!urlInput) return;

    urlInput.select();
    urlInput.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(urlInput.value)
        .then(() => {
            showNotification('URL copiada al portapapeles', 'success');
        })
        .catch(() => {
            document.execCommand('copy');
            showNotification('URL copiada al portapapeles', 'success');
        });
}

// Confirm delete media from show page
export function confirmDeleteMediaShow() {
    if (typeof window.showConfirmModal !== 'function') {
        if (confirm('¿Eliminar este archivo? Esta acción no se puede deshacer.')) {
            document.getElementById('delete-form').submit();
        }
        return;
    }

    showConfirmModal({
        title: '¿Eliminar archivo?',
        message: '¿Estás seguro de que deseas eliminar este archivo? Esta acción no se puede deshacer.',
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        type: 'danger',
        onConfirm: () => {
            document.getElementById('delete-form').submit();
        }
    });
}