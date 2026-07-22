import { buildUrl } from "@/utils/url.js";
import { showNotification } from "@/utils/notifications.js";
import { showPromptModal } from "@/utils/modals.js";
import { initMediaPicker } from "@/utils/media-picker.js";
import tinymce from "tinymce/tinymce";
import "tinymce/models/dom/model";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/plugins/link";
import "tinymce/plugins/lists";
import "tinymce/plugins/image";
import "tinymce/plugins/table";
import "tinymce/plugins/code";

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

async function initTinyMce(container) {
    const target = document.getElementById("news-content");
    if (!target) return;

    const skinCss = container.dataset.tinymceSkinCss;
    const contentCss = [
        container.dataset.tinymceContentCss,
        container.dataset.tinymceDefaultContentCss,
    ]
        .filter(Boolean)
        .join(",");

    const editors = await tinymce.init({
        target,
        height: 400,
        menubar: false,
        plugins: "link lists image table code",
        toolbar:
            "undo redo | blocks | bold italic | bullist numlist | link image table | code",
        skin: false,
        skin_url: skinCss ? skinCss.replace(/\/skin\.min\.css$/, "") : undefined,
        content_css: contentCss || false,
        license_key: "gpl",
    });

    tinyEditor = editors[0];
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

async function createCategoryRequest(name) {
    const response = await axios.post(buildUrl("news-categories"), {
        name: name.trim(),
        is_active: true,
    });
    return response.data;
}

function handleCreateCategory(select) {
    showPromptModal({
        title: "Nueva categoría",
        message: "Ingresa el nombre de la nueva categoría de noticias.",
        label: "Nombre",
        placeholder: "Ej: Comunicados",
        confirmText: "Crear",
        cancelText: "Cancelar",
        type: "info",
        onCancel: () => resetCategorySelection(select),
        onConfirm: async (value) => {
            if (!value || !value.trim()) {
                resetCategorySelection(select);
                return;
            }

            try {
                const data = await createCategoryRequest(value);

                if (data.success) {
                    const createOption = select.querySelector(
                        'option[value="__create__"]',
                    );
                    const newOption = document.createElement("option");
                    newOption.value = data.id;
                    newOption.textContent = value.trim();
                    select.insertBefore(newOption, createOption);
                    select.value = data.id;
                    showNotification("Categoría creada exitosamente", "success");
                }
            } catch (error) {
                if (error.response?.status === 422) {
                    const errors = error.response.data.errors;
                    const message =
                        errors?.name?.[0] || "No se pudo crear la categoría";
                    showNotification(message, "error");
                } else {
                    showNotification("No se pudo crear la categoría", "error");
                }
                resetCategorySelection(select);
            }
        },
    });
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
    const container = document.getElementById("news-form-container");
    initStatusToggle();
    if (container) initTinyMce(container);
    initFeaturedImagePicker();
    initCategoryCreation();
    initSubmit();
});