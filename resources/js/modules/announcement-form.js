import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";

document.addEventListener("DOMContentLoaded", function () {
    const displayTypeSelect = document.getElementById("display_type");
    const pageSelector = document.getElementById("page-selector");
    const selectImageBtn = document.getElementById("select-image-btn");
    const mediaModal = document.getElementById("media-library-modal");
    const closeMediaModal = document.getElementById("close-media-modal");
    const mediaLibraryContent = document.getElementById(
        "media-library-content",
    );
    const mediaIdInput = document.getElementById("media_id");
    const previewContainer = document.getElementById("selected-image-preview");
    const previewImg = document.getElementById("preview-img");
    const removeImageBtn = document.getElementById("remove-image");
    const scheduleRadios = document.querySelectorAll(
        'input[name="schedule_type"]',
    );
    const scheduleDates = document.getElementById("schedule-dates");
    const displayModeRadios = document.querySelectorAll(".display-mode-radio");
    const contentFields = document.getElementById("content-fields");
    const ctaFields = document.getElementById("cta-fields");
    const titleRequired = document.querySelector(".title-required");

    // Initialize Flatpickr
    flatpickr(".flatpickr-datetime", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true,
        locale: Spanish,
        minDate: "today",
    });

    // Handle display mode toggle
    if (displayModeRadios.length > 0) {
        displayModeRadios.forEach((radio) => {
            radio.addEventListener("change", function () {
                toggleContentFields(this.value);
            });
        });

        // Check initial state
        const checkedRadio = document.querySelector(
            'input[name="display_mode"]:checked',
        );
        if (checkedRadio) {
            toggleContentFields(checkedRadio.value);
        }
    }

    function toggleContentFields(mode) {
        const descriptionInput = document.getElementById("description");
        const ctaTextInput = document.getElementById("cta_text");
        const ctaUrlInput = document.getElementById("cta_url");
        const titleNote = document.querySelector(".title-note");

        if (mode === "image_only") {
            ctaFields?.classList.add("opacity-50");

            if (descriptionInput) {
                descriptionInput.classList.add(
                    "bg-gray-100",
                    "cursor-not-allowed",
                    "opacity-50",
                );
                descriptionInput.disabled = true;
                descriptionInput.value = "";
            }
            if (ctaTextInput) {
                ctaTextInput.disabled = true;
                ctaTextInput.value = "";
            }
            if (ctaUrlInput) {
                ctaUrlInput.disabled = true;
                ctaUrlInput.value = "";
            }

            if (titleNote) {
                titleNote.textContent =
                    "(requerido para identificación interna - no se muestra al público)";
            }
        } else {
            ctaFields?.classList.remove("opacity-50");

            if (descriptionInput) {
                descriptionInput.classList.remove(
                    "bg-gray-100",
                    "cursor-not-allowed",
                    "opacity-50",
                );
                descriptionInput.disabled = false;
            }
            if (ctaTextInput) {
                ctaTextInput.disabled = false;
            }
            if (ctaUrlInput) {
                ctaUrlInput.disabled = false;
            }

            if (titleNote) {
                titleNote.textContent =
                    "(siempre requerido para identificación interna)";
            }
        }
    }

    // Handle schedule type toggle
    if (scheduleRadios.length > 0 && scheduleDates) {
        scheduleRadios.forEach((radio) => {
            radio.addEventListener("change", function () {
                if (this.value === "scheduled") {
                    scheduleDates.classList.remove("hidden");
                } else {
                    scheduleDates.classList.add("hidden");
                }
            });
        });

        // Check initial state
        const checkedRadio = document.querySelector(
            'input[name="schedule_type"]:checked',
        );
        if (checkedRadio && checkedRadio.value === "scheduled") {
            scheduleDates.classList.remove("hidden");
        }
    }

    // Handle display type toggle for page selector
    if (displayTypeSelect && pageSelector) {
        displayTypeSelect.addEventListener("change", function () {
            if (this.value === "specific_pages") {
                pageSelector.classList.remove("hidden");
            } else {
                pageSelector.classList.add("hidden");
            }
        });
    }

    // Media library handlers
    if (selectImageBtn) {
        selectImageBtn.addEventListener("click", function () {
            openMediaLibrary();
        });
    }

    if (closeMediaModal) {
        closeMediaModal.addEventListener("click", function () {
            mediaModal.classList.add("hidden");
        });
    }

    if (removeImageBtn) {
        removeImageBtn.addEventListener("click", function () {
            mediaIdInput.value = "";
            previewContainer.classList.add("hidden");
            previewImg.src = "";
            selectImageBtn.innerHTML =
                '<i class="ri-image-add-line mr-2"></i>Seleccionar Imagen';
        });
    }

    mediaModal?.addEventListener("click", function (e) {
        if (e.target === mediaModal) {
            mediaModal.classList.add("hidden");
        }
    });

    async function openMediaLibrary() {
        mediaModal.classList.remove("hidden");
        mediaLibraryContent.innerHTML =
            '<p class="text-center text-gray-500">Cargando imágenes...</p>';

        try {
            const response = await fetch("/media/api?type=image&per_page=30");
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                renderMediaLibrary(data.items);
            } else {
                mediaLibraryContent.innerHTML =
                    '<p class="text-center text-gray-500">No hay imágenes disponibles</p>';
            }
        } catch (error) {
            console.error("Error loading media:", error);
            mediaLibraryContent.innerHTML =
                '<p class="text-center text-red-500">Error al cargar las imágenes</p>';
        }
    }

    function renderMediaLibrary(items) {
        const grid = document.createElement("div");
        grid.className = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";

        items.forEach((item) => {
            const card = document.createElement("div");
            card.className =
                "relative group cursor-pointer border-2 border-transparent hover:border-primary rounded-lg overflow-hidden transition-all";
            card.innerHTML = `
                <img src="${item.url}" alt="${item.alt || item.filename}" class="w-full h-48 object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
                    <button type="button" class="opacity-0 group-hover:opacity-100 bg-primary text-white px-4 py-2 rounded-lg transition-all">
                        Seleccionar
                    </button>
                </div>
                <div class="p-2 bg-white">
                    <p class="text-xs text-gray-600 truncate">${item.filename}</p>
                    ${item.dimensions ? `<p class="text-xs text-gray-400">${item.dimensions}</p>` : ""}
                </div>
            `;

            card.addEventListener("click", function () {
                selectImage(item);
            });

            grid.appendChild(card);
        });

        mediaLibraryContent.innerHTML = "";
        mediaLibraryContent.appendChild(grid);
    }

    function selectImage(item) {
        mediaIdInput.value = item.id;
        previewImg.src = item.url;
        previewImg.alt = item.alt || item.filename;
        previewContainer.classList.remove("hidden");
        mediaModal.classList.add("hidden");
        selectImageBtn.innerHTML =
            '<i class="ri-image-edit-line mr-2"></i>Cambiar Imagen';
    }
});
