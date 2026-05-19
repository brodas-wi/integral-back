import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Spanish } from "flatpickr/dist/l10n/es.js";

const mediaApiUrl = document.querySelector(
    'meta[name="media-api-url"]',
)?.content;
const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

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

    flatpickr(".flatpickr-datetime", {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true,
        locale: Spanish,
        minDate: "today",
    });

    displayModeRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
            toggleContentFields(this.value);
        });
    });
    const checkedMode = document.querySelector(
        'input[name="display_mode"]:checked',
    );
    if (checkedMode) toggleContentFields(checkedMode.value);

    function toggleContentFields(mode) {
        const descriptionInput = document.getElementById("description");
        const ctaTextInput = document.getElementById("cta_text");
        const ctaUrlInput = document.getElementById("cta_url");
        const ctaFields = document.getElementById("cta-fields");
        const titleNote = document.querySelector(".title-note");

        const isImageOnly = mode === "image_only";

        ctaFields?.classList.toggle("opacity-50", isImageOnly);

        if (descriptionInput) {
            descriptionInput.classList.toggle("bg-gray-100", isImageOnly);
            descriptionInput.classList.toggle(
                "cursor-not-allowed",
                isImageOnly,
            );
            descriptionInput.classList.toggle("opacity-50", isImageOnly);
            descriptionInput.disabled = isImageOnly;
            if (isImageOnly) descriptionInput.value = "";
        }
        if (ctaTextInput) {
            ctaTextInput.disabled = isImageOnly;
            if (isImageOnly) ctaTextInput.value = "";
        }
        if (ctaUrlInput) {
            ctaUrlInput.disabled = isImageOnly;
            if (isImageOnly) ctaUrlInput.value = "";
        }
        if (titleNote) {
            titleNote.textContent = isImageOnly
                ? "(requerido para identificación interna - no se muestra al público)"
                : "(siempre requerido para identificación interna)";
        }
    }

    scheduleRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
            scheduleDates?.classList.toggle(
                "hidden",
                this.value !== "scheduled",
            );
        });
    });
    const checkedSchedule = document.querySelector(
        'input[name="schedule_type"]:checked',
    );
    if (checkedSchedule?.value === "scheduled")
        scheduleDates?.classList.remove("hidden");

    displayTypeSelect?.addEventListener("change", function () {
        pageSelector?.classList.toggle(
            "hidden",
            this.value !== "specific_pages",
        );
    });

    selectImageBtn?.addEventListener("click", openMediaLibrary);
    closeMediaModal?.addEventListener("click", () =>
        mediaModal.classList.add("hidden"),
    );
    mediaModal?.addEventListener("click", (e) => {
        if (e.target === mediaModal) mediaModal.classList.add("hidden");
    });

    removeImageBtn?.addEventListener("click", function () {
        mediaIdInput.value = "";
        previewContainer.classList.add("hidden");
        previewImg.src = "";
        selectImageBtn.innerHTML =
            '<i class="ri-image-add-line mr-2"></i>Seleccionar Imagen';
    });

    async function openMediaLibrary() {
        mediaModal.classList.remove("hidden");
        mediaLibraryContent.innerHTML =
            '<p class="text-center text-gray-500">Cargando imágenes...</p>';

        try {
            const response = await fetch(
                `${mediaApiUrl}?type=image&per_page=30`,
                {
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": CSRF,
                    },
                },
            );
            const data = await response.json();

            if (data.items?.length > 0) {
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
                <div class="media-card-overlay">
                    <button type="button" class="media-card-btn">Seleccionar</button>
                </div>
                <div class="p-2 bg-white">
                    <p class="text-xs text-gray-600 truncate">${item.filename}</p>
                    ${item.dimensions ? `<p class="text-xs text-gray-400">${item.dimensions}</p>` : ""}
                </div>
            `;
            card.addEventListener("click", () => selectImage(item));
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
