import { openMediaPicker } from "@/editor/media-picker";

const TEMP_INTERNAL_URL_PREFIX = "/bancaintegral";

document.addEventListener("DOMContentLoaded", () => {
    initImagePicker();
    initCategoryAutocomplete();
    initLinkAutocomplete();
});

function initImagePicker() {
    const pickBtn = document.getElementById("asset-image-pick");
    const hiddenInput = document.getElementById("image_url");
    const previewWrap = document.getElementById("asset-image-preview-wrap");
    const preview = document.getElementById("asset-image-preview");
    if (!pickBtn || !hiddenInput) return;

    pickBtn.addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar imagen del activo",
            onSelect: (url) => {
                hiddenInput.value = url;
                if (preview) preview.src = url;
                if (previewWrap) previewWrap.classList.remove("hidden");
            },
        });
    });
}

function attachAutocomplete(
    input,
    searchUrl,
    { onSelect, formatOption, prefix = "" } = {},
) {
    if (!input || input.dataset.autocompleteAttached) return;
    input.dataset.autocompleteAttached = "true";

    const parent = input.parentNode;
    if (!parent.style.position || parent.style.position === "static") {
        parent.style.position = "relative";
    }

    const dropdown = document.createElement("ul");
    dropdown.style.cssText = `position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:9999;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;max-height:220px;overflow-y:auto;display:none;`;
    parent.appendChild(dropdown);

    let debounceTimer = null;

    async function search(q) {
        if (q.length < 1) {
            dropdown.style.display = "none";
            return;
        }
        try {
            const res = await fetch(`${searchUrl}?q=${encodeURIComponent(q)}`, {
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
            });
            const items = await res.json();
            renderDropdown(items, q);
        } catch {
            dropdown.style.display = "none";
        }
    }

    function highlight(text, q) {
        if (!q) return text;
        return text.replace(
            new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"),
            '<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>',
        );
    }

    function renderDropdown(items, q) {
        dropdown.innerHTML = "";
        if (!items.length) {
            dropdown.style.display = "none";
            return;
        }
        items.forEach((item) => {
            const li = document.createElement("li");
            li.style.cssText =
                "padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;";
            li.innerHTML = formatOption(item, q, highlight);
            li.addEventListener(
                "mouseenter",
                () => (li.style.background = "#f1f5f9"),
            );
            li.addEventListener("mouseleave", () => (li.style.background = ""));
            li.addEventListener("mousedown", (e) => {
                e.preventDefault();
                onSelect(item, input, prefix);
                dropdown.style.display = "none";
            });
            dropdown.appendChild(li);
        });
        dropdown.style.display = "block";
    }

    input.addEventListener("input", () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => search(input.value.trim()), 220);
    });
    input.addEventListener("focus", () => {
        if (input.value.trim()) search(input.value.trim());
    });
    input.addEventListener("blur", () => {
        setTimeout(() => (dropdown.style.display = "none"), 150);
    });
}

function initCategoryAutocomplete() {
    const input = document.getElementById("category_name");
    const searchUrl = document.querySelector(
        'meta[name="asset-categories-search-url"]',
    )?.content;
    if (!input || !searchUrl) return;

    attachAutocomplete(input, searchUrl, {
        formatOption: (item, q, highlight) =>
            `<span style="font-size:0.85rem;color:#1e293b;">${highlight(item.name, q)}</span>`,
        onSelect: (item, inputEl) => {
            inputEl.value = item.name;
        },
    });
}

function initLinkAutocomplete() {
    const input = document.getElementById("link_url");
    const searchUrl = document.querySelector(
        'meta[name="pages-search-url"]',
    )?.content;
    if (!input || !searchUrl) return;

    attachAutocomplete(input, searchUrl, {
        prefix: TEMP_INTERNAL_URL_PREFIX,
        formatOption: (page, q, highlight) => `
            <span style="font-size:0.8rem;font-weight:600;color:#1e293b;display:block;">${highlight(page.title, q)}</span>
            <span style="font-size:0.7rem;color:#64748b;">/${page.slug}</span>`,
        onSelect: (page, inputEl, prefix) => {
            inputEl.value = `${prefix}/${page.slug}`;
        },
    });
}
