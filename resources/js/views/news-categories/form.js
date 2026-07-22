import { buildUrl } from "@/utils/url.js";
import { showNotification } from "@/utils/notifications.js";

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
    return {
        name: container.querySelector("#name").value,
        is_active: container.querySelector("#is_active").checked,
    };
}

function initSubmit() {
    const container = document.getElementById("news-category-form-container");
    const submitBtn = document.getElementById("news-category-form-submit");
    if (!container || !submitBtn) return;

    const mode = container.dataset.mode;
    const categoryId = container.dataset.categoryId;

    submitBtn.addEventListener("click", async () => {
        clearErrors(container);
        submitBtn.disabled = true;

        const payload = buildPayload(container);
        const url =
            mode === "edit"
                ? buildUrl(`news-categories/${categoryId}`)
                : buildUrl("news-categories");

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
                    "Ocurrió un error al guardar la categoría",
                    "error",
                );
            }
        } finally {
            submitBtn.disabled = false;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initSubmit();
});