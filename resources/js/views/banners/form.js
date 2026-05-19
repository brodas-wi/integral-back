import { showNotification } from "@/utils/notifications.js";
import { initMediaPicker } from "@/utils/media-picker.js";

const wrapper = document.getElementById("banner-form-wrapper");
const storeUrl = wrapper?.dataset.storeUrl;
const method = wrapper?.dataset.method ?? "POST";
const indexUrl = wrapper?.dataset.indexUrl;
const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

const BUTTON_STYLES = {
    "fill-blue": {
        bg: "#003B71",
        color: "#ffffff",
        border: "#003B71",
        hoverBg: "#002a52",
        hoverColor: "#ffffff",
    },
    "outline-blue": {
        bg: "transparent",
        color: "#003B71",
        border: "#003B71",
        hoverBg: "#003B71",
        hoverColor: "#ffffff",
    },
    "fill-orange": {
        bg: "#E97300",
        color: "#ffffff",
        border: "#E97300",
        hoverBg: "#c96200",
        hoverColor: "#ffffff",
    },
    "outline-orange": {
        bg: "transparent",
        color: "#E97300",
        border: "#E97300",
        hoverBg: "#E97300",
        hoverColor: "#ffffff",
    },
    "fill-white": {
        bg: "#ffffff",
        color: "#003B71",
        border: "#ffffff",
        hoverBg: "#f0f0f0",
        hoverColor: "#003B71",
    },
    "outline-white": {
        bg: "transparent",
        color: "#ffffff",
        border: "#ffffff",
        hoverBg: "#ffffff",
        hoverColor: "#003B71",
    },
};

function renderButtonPreview(container, text, style) {
    if (!container) return;
    if (!text) {
        container.innerHTML = "";
        return;
    }

    const s = BUTTON_STYLES[style] ?? BUTTON_STYLES["fill-blue"];
    const isOutline = style.startsWith("outline-");
    const hoverColor = isOutline ? "#ffffff" : s.color;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "banner-btn-preview";
    btn.textContent = text;
    btn.dataset.bg = s.bg;
    btn.dataset.color = s.color;
    btn.dataset.border = s.border;
    btn.dataset.hoverBg = s.hoverBg;
    btn.dataset.hoverColor = hoverColor;

    btn.style.cssText = `background:${s.bg};color:${s.color};border:2px solid ${s.border};
        padding:10px 28px;border-radius:999px;font-size:14px;
        font-weight:600;cursor:pointer;transition:background .2s,color .2s;`;

    btn.addEventListener("mouseenter", () => {
        btn.style.background = btn.dataset.hoverBg;
        btn.style.color = btn.dataset.hoverColor;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.background = btn.dataset.bg;
        btn.style.color = btn.dataset.color;
    });

    container.innerHTML = "";
    container.appendChild(btn);
}

function initButtonPreviews() {
    const primaryText = document.getElementById("field-btn-primary-text");
    const primaryStyle = document.getElementById("field-btn-primary-style");
    const primaryPrev = document.getElementById("btn-primary-preview");
    const secondaryText = document.getElementById("field-btn-secondary-text");
    const secondaryStyle = document.getElementById("field-btn-secondary-style");
    const secondaryPrev = document.getElementById("btn-secondary-preview");

    const updatePrimary = () =>
        renderButtonPreview(
            primaryPrev,
            primaryText?.value,
            primaryStyle?.value,
        );
    const updateSecondary = () =>
        renderButtonPreview(
            secondaryPrev,
            secondaryText?.value,
            secondaryStyle?.value,
        );

    primaryText?.addEventListener("input", updatePrimary);
    primaryStyle?.addEventListener("change", updatePrimary);
    secondaryText?.addEventListener("input", updateSecondary);
    secondaryStyle?.addEventListener("change", updateSecondary);

    updatePrimary();
    updateSecondary();
}

initMediaPicker({
    dropzoneId: "image-dropzone",
    hiddenInputId: "field-image-id",
    previewId: "image-preview",
    placeholderId: "image-placeholder",
    selectedId: "image-selected",
    altFieldId: "field-image-alt",
});

function populateEdit() {
    const raw = wrapper?.dataset.banner;
    if (!raw) return;

    try {
        const data = JSON.parse(raw);
        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val ?? "";
        };

        set("field-title", data.title);
        set("field-description", data.description);
        set("field-category", data.category);
        set("field-image-alt", data.image_alt);
        set("field-btn-primary-text", data.btn_primary_text);
        set("field-btn-primary-url", data.btn_primary_url);
        set("field-btn-primary-style", data.btn_primary_style);
        set("field-btn-secondary-text", data.btn_secondary_text);
        set("field-btn-secondary-url", data.btn_secondary_url);
        set("field-btn-secondary-style", data.btn_secondary_style);
        set("field-order", data.order);

        const setCheck = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.checked = !!val;
        };
        setCheck("field-btn-primary-external", data.btn_primary_external);
        setCheck("field-btn-secondary-external", data.btn_secondary_external);
        setCheck("field-is-active", data.is_active);
    } catch {}
}

function clearErrors() {
    document.querySelectorAll(".field-error").forEach((el) => {
        el.textContent = "";
        el.classList.add("hidden");
    });
    document
        .querySelectorAll(".input-field")
        .forEach((el) => el.classList.remove("border-red-400"));
}

function showErrors(errors) {
    Object.entries(errors).forEach(([field, messages]) => {
        const key = field.replace(/_/g, "-");
        const errorEl = document.querySelector(
            `.field-error[data-field="${field}"]`,
        );
        const inputEl = document.getElementById(`field-${key}`);
        if (errorEl) {
            errorEl.textContent = messages[0];
            errorEl.classList.remove("hidden");
        }
        inputEl?.classList.add("border-red-400");
    });
}

async function handleSubmit() {
    clearErrors();
    const form = new FormData();

    const append = (name, id) => {
        const el = document.getElementById(id);
        if (el) form.append(name, el.value);
    };

    append("title", "field-title");
    append("description", "field-description");
    append("category", "field-category");
    append("image_alt", "field-image-alt");
    append("btn_primary_text", "field-btn-primary-text");
    append("btn_primary_url", "field-btn-primary-url");
    append("btn_primary_style", "field-btn-primary-style");
    append("btn_secondary_text", "field-btn-secondary-text");
    append("btn_secondary_url", "field-btn-secondary-url");
    append("btn_secondary_style", "field-btn-secondary-style");
    append("order", "field-order");

    const mediaId = document.getElementById("field-image-id")?.value;
    if (mediaId) form.append("media_id", mediaId);

    const boolField = (name, id) => {
        const el = document.getElementById(id);
        form.append(name, el?.checked ? "1" : "0");
    };
    boolField("btn_primary_external", "field-btn-primary-external");
    boolField("btn_secondary_external", "field-btn-secondary-external");
    boolField("is_active", "field-is-active");

    if (method === "PUT") form.append("_method", "PUT");
    form.append("_token", CSRF);

    const btn = document.getElementById("btn-submit");
    btn.disabled = true;
    btn.innerHTML =
        '<i class="ri-loader-4-line animate-spin mr-2"></i>Guardando...';

    try {
        const res = await fetch(storeUrl, { method: "POST", body: form });
        const data = await res.json();

        if (res.ok && data.success) {
            showNotification(data.message ?? "Banner guardado.", "success");
            setTimeout(() => {
                window.location.href = indexUrl;
            }, 800);
            return;
        }

        if (res.status === 422 && data.errors) {
            showErrors(data.errors);
            showNotification("Revisa los campos marcados.", "error");
        } else {
            showNotification(data.message ?? "Error al guardar.", "error");
        }
    } catch {
        showNotification("Error de conexión.", "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<i class="ri-save-line mr-2"></i>Guardar Banner';
    }
}

document.getElementById("btn-submit")?.addEventListener("click", handleSubmit);
initButtonPreviews();
populateEdit();
