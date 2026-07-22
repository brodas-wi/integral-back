import { buildUrl } from "@/utils/url.js";
import { showNotification } from "@/utils/notifications.js";
import { initMediaPicker } from "@/utils/media-picker.js";

let tinyEditor = null;

function clearErrors(container) {
    container.querySelectorAll("[data-error-for]").forEach((el) => {
        el.textContent = "";
        el.classList.add("hidden");
    });
    container.querySelectorAll(".input-field").forEach((el) => {
        el.classList.remove("border-red-500");
    });
}

function renderErrors(container, errors) {
    Object.keys(errors).forEach((field) => {
        const errorEl = container.querySelector(`[data-error-for="${field}"]`);
        const inputEl = container.querySelector(`[name="${field}"]`);
        if (errorEl) {
            errorEl.textContent = errors[field][0];
            errorEl.classList.remove("hidden");
        }
        if (inputEl) {
            inputEl.classList.add("border-red-500");
        }
    });
}

function buildPayload(container) {
    const status = container.querySelector("#news-status").value;

    return {
        title: container.querySelector("#title").value,
        description: container.querySelector("#description").value,
        featured_image: container.querySelector(
            "#news-featured-image-input",
        ).value,
        news_category_id: container.querySelector("#news_category_id").value,
        status,
        scheduled_at:
            status === "scheduled"
                ? container.querySelector("#scheduled_at").value
                : null,
        content: tinyEditor ? tinyEditor.getContent() : "",
    };
}

function initStatusToggle() {
    const statusSelect = document.getElementById("news-status");
    const scheduledWrapper = document.getElementById(
        "news-scheduled-at-wrapper",
    );
    if (!statusSelect || !scheduledWrapper) return;

    statusSelect.addEventListener("change", () => {
        scheduledWrapper.classList.toggle(
            "hidden",
            statusSelect.value !== "scheduled",
        );
    });
}

function initTinyMce() {
    if (typeof tinymce === "undefined") return;

    tinymce.init({
        selector: "#news-content",
        height: 400,
        menubar: false,
        plugins: "link lists image table code",
        toolbar:
            "undo redo | blocks | bold italic | bullist numlist | link image table | code",
        setup(editor) {
            editor.on("init", () => {
                tinyEditor = editor;
            });
        },
    });
}

function initFeaturedImagePicker() {
    const dropzone = document.getElementById("news-featured-image-dropzone");
    if (!dropzone) return;

    initMediaPicker({
        dropzoneId: "news-featured-image-dropzone",
        hiddenInputId: "news-featured-image-input",
        previewId: "news-featured-image-preview",
        placeholderId: "news-featured-image-placeholder",
        selectedId: "news-featured-image-selected",
    });
}

function resetCategorySelection(select) {
    select.value = "";
}

async function handleCreateCategory(select) {
    const name = window.prompt("Nombre de la nueva categoría:");

    if (!name || !name.trim()) {
        resetCategorySelection(select);
        return;
    }

    try {
        const response = await axios.post(buildUrl("news-categories"), {
            name: name.trim(),
            is_active: true,
        });

        if (response.data.success) {
            const createOption = select.querySelector(
                'option[value="__create__"]',
            );
            const newOption = document.createElement("option");
            newOption.value = response.data.id;
            newOption.textContent = name.trim();
            select.insertBefore(newOption, createOption);
            select.value = response.data.id;
            showNotification("Categoría creada exitosamente", "success");
        }
    } catch (error) {
        if (error.response?.status === 422) {
            const errors = error.response.data.errors;
            const message = errors?.name?.[0] || "No se pudo crear la categoría";
            showNotification(message, "error");
        } else {
            showNotification("No se pudo crear la categoría", "error");
        }
        resetCategorySelection(select);
    }
}

function initCategoryCreation() {
    const select = document.getElementById("news_category_id");
    if (!select) return;

    select.addEventListener("change", () => {
        if (select.value === "__create__") {
            handleCreateCategory(select);
        }
    });
}

function initSubmit() {
    const container = document.getElementById("news-form-container");
    const submitBtn = document.getElementById("news-form-submit");
    if (!container || !submitBtn) return;

    const mode = container.dataset.mode;
    const newsId = container.dataset.newsId;

    submitBtn.addEventListener("click", async () => {
        clearErrors(container);
        submitBtn.disabled = true;

        const payload = buildPayload(container);
        const url =
            mode === "edit" ? buildUrl(`news/${newsId}`) : buildUrl("news");

        try {
            const response =
                mode === "edit"
                    ? await axios.put(url, payload)
                    : await axios.post(url, payload);

            if (response.data.success) {
                showNotification(response.data.message, "success");
                setTimeout(() => {
                    window.location.href = response.data.redirect;
                }, 700);
            }
        } catch (error) {
            if (error.response?.status === 422) {
                renderErrors(container, error.response.data.errors);
            } else {
                showNotification(
                    error.response?.data?.message ||
                    "Ocurrió un error al guardar la noticia",
                    "error",
                );
            }
        } finally {
            submitBtn.disabled = false;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initStatusToggle();
    initTinyMce();
    initFeaturedImagePicker();
    initCategoryCreation();
    initSubmit();
});