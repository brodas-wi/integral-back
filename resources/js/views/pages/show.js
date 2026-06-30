import { showNotification } from "@/utils/notifications.js";
import { showConfirmModal } from "@/utils/modals.js";
import { buildUrl } from "@/utils/url.js";

const CSRF = document.querySelector('meta[name="csrf-token"]');
const PAGES_INDEX_URL = document.querySelector(
    'meta[name="pages-index-url"]',
)?.content;

document.addEventListener("DOMContentLoaded", () => {
    initTogglePublish();
    initDeletePage();
    initFooterRelation();
    initNavbarRelation();
    initTitleSlugEditor();
});

function initTogglePublish() {
    document.querySelectorAll("[data-toggle-publish]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const slug = btn.dataset.slug;
            const isPublished = btn.dataset.published === "1";
            confirmTogglePublish(slug, isPublished);
        });
    });
}

function initDeletePage() {
    document.querySelectorAll("[data-delete-page]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const slug = btn.dataset.slug;
            const pageTitle = btn.dataset.pageTitle;
            confirmDeletePage(slug, pageTitle);
        });
    });
}

function confirmTogglePublish(slug, isPublished) {
    showConfirmModal({
        title: isPublished ? "¿Despublicar página?" : "¿Publicar página?",
        message: isPublished
            ? "La página dejará de ser visible públicamente."
            : "La página será visible públicamente.",
        confirmText: isPublished ? "Despublicar" : "Publicar",
        cancelText: "Cancelar",
        type: "warning",
        onConfirm: () => submitTogglePublish(slug),
    });
}

async function submitTogglePublish(slug) {
    if (!CSRF) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    try {
        const response = await fetch(buildUrl(`pages/${slug}/toggle-publish`), {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
        });

        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");

        if (!response.ok) {
            if (response.status === 401 || response.status === 419) {
                throw new Error("Tu sesión ha expirado. Recarga la página.");
            }
            if (isJson) {
                const error = await response.json();
                throw new Error(
                    error.message || `Error del servidor: ${response.status}`,
                );
            }
            throw new Error(`Error del servidor: ${response.status}`);
        }

        if (!isJson) {
            throw new Error("Respuesta inesperada del servidor");
        }

        const data = await response.json();

        if (data.success) {
            showNotification(data.message, "success");
            setTimeout(() => window.location.reload(), 1000);
        } else {
            throw new Error(data.message || "Error al cambiar el estado");
        }
    } catch (error) {
        console.error("Error:", error);
        showNotification(
            error.message || "Ocurrió un error al cambiar el estado",
            "error",
        );
    }
}

function confirmDeletePage(slug, pageTitle) {
    showConfirmModal({
        title: "¿Eliminar página?",
        message: `¿Estás seguro de que deseas eliminar "${pageTitle}"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deletePage(slug),
    });
}

async function deletePage(slug) {
    if (!CSRF) {
        showNotification("Error de configuración. Recarga la página.", "error");
        return;
    }

    try {
        const response = await fetch(buildUrl(`pages/${slug}`), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
        });

        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");

        if (!response.ok) {
            if (response.status === 401 || response.status === 419) {
                throw new Error("Tu sesión ha expirado. Recarga la página.");
            }
            if (isJson) {
                const error = await response.json();
                throw new Error(
                    error.message || `Error del servidor: ${response.status}`,
                );
            }
            throw new Error(`Error del servidor: ${response.status}`);
        }

        if (!isJson) {
            throw new Error("Respuesta inesperada del servidor");
        }

        const data = await response.json();

        if (data.success) {
            showNotification(data.message, "success");
            setTimeout(() => {
                window.location.href = PAGES_INDEX_URL || buildUrl("pages");
            }, 1000);
        } else {
            throw new Error(data.message || "Error desconocido");
        }
    } catch (error) {
        console.error("Error:", error);
        showNotification(error.message || "Error al eliminar", "error");
    }
}

function initFooterRelation() {
    const btn = document.getElementById("save-footer-relation");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        const select = document.getElementById("footer-select");
        const footerId = select?.value || null;
        const slug =
            document.querySelector("[data-toggle-publish]")?.dataset.slug ||
            window.location.pathname.split("/").filter(Boolean).pop();

        try {
            const res = await fetch(buildUrl(`pages/${slug}/footer`), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                    Accept: "application/json",
                },
                body: JSON.stringify({ footer_id: footerId }),
            });
            const data = await res.json();
            if (data.success) {
                showNotification(data.message, "success");
            } else {
                showNotification(data.message || "Error al guardar", "error");
            }
        } catch (e) {
            showNotification("Error al guardar el footer", "error");
        }
    });
}

function initNavbarRelation() {
    const btn = document.getElementById("save-navbar-relation");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        const select = document.getElementById("navbar-select");
        const navbarId = select?.value || null;
        const slug =
            document.querySelector("[data-toggle-publish]")?.dataset.slug ||
            window.location.pathname.split("/").filter(Boolean).pop();

        try {
            const res = await fetch(buildUrl(`pages/${slug}/navbar`), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                    Accept: "application/json",
                },
                body: JSON.stringify({ navbar_id: navbarId }),
            });
            const data = await res.json();
            if (data.success) {
                showNotification(data.message, "success");
            } else {
                showNotification(data.message || "Error al guardar", "error");
            }
        } catch (e) {
            showNotification("Error al guardar el navbar", "error");
        }
    });
}

function normalizeSlugClient(value) {
    const replacements = {
        á: "a", à: "a", ä: "a", â: "a",
        é: "e", è: "e", ë: "e", ê: "e",
        í: "i", ì: "i", ï: "i", î: "i",
        ó: "o", ò: "o", ö: "o", ô: "o",
        ú: "u", ù: "u", ü: "u", û: "u",
        ñ: "n", ç: "c",
    };

    return value
        .toLowerCase()
        .replace(/[áàäâéèëêíìïîóòöôúùüûñç]/g, (char) => replacements[char] || char)
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/[\s-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

function initTitleSlugEditor() {
    const formContainer = document.getElementById("page-title-slug-form");
    if (!formContainer) return;

    const pageId = formContainer.dataset.pageId;
    const currentSlug =
        document.querySelector("[data-toggle-publish]")?.dataset.slug ||
        window.location.pathname.split("/").filter(Boolean).pop();

    const titleInput = document.getElementById("page-title-input");
    const slugInput = document.getElementById("page-slug-input");
    const toggleLinkBtn = document.getElementById("toggle-slug-link");
    const saveBtn = document.getElementById("save-title-slug");
    const statusMessage = document.getElementById("slug-status-message");
    const suggestionsContainer = document.getElementById("slug-suggestions");

    const originalTitle = titleInput.value;
    const originalSlug = slugInput.value;

    let slugLinkedToTitle = true;
    let currentSlugValid = true;

    function setStatusMessage(message, type) {
        if (!message) {
            statusMessage.classList.add("hidden");
            statusMessage.textContent = "";
            return;
        }

        statusMessage.textContent = message;
        statusMessage.classList.remove("hidden", "text-red-600", "text-green-600", "text-gray-500");
        statusMessage.classList.add(
            type === "error" ? "text-red-600" : type === "success" ? "text-green-600" : "text-gray-500"
        );
    }

    function renderSuggestions(suggestions) {
        suggestionsContainer.innerHTML = "";

        if (!suggestions || suggestions.length === 0) {
            suggestionsContainer.classList.add("hidden");
            return;
        }

        suggestions.forEach((suggestion) => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "text-xs font-mono px-2 py-1 rounded border border-gray-300 hover:bg-gray-50";
            btn.textContent = suggestion;
            btn.addEventListener("click", () => {
                slugInput.value = suggestion;
                checkSlugAvailability(suggestion);
            });
            suggestionsContainer.appendChild(btn);
        });

        suggestionsContainer.classList.remove("hidden");
    }

    function updateSaveButtonState() {
        const titleChanged = titleInput.value.trim() !== originalTitle;
        const slugChanged = slugInput.value.trim() !== originalSlug;
        saveBtn.disabled = !(titleChanged || slugChanged) || !currentSlugValid;
    }

    async function checkSlugAvailability(slugValue) {
        if (!slugValue) return;

        try {
            const params = new URLSearchParams({ slug: slugValue, exclude: pageId });
            const response = await fetch(buildUrl(`pages/slug-check?${params.toString()}`), {
                headers: {
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "same-origin",
            });

            const data = await response.json();

            if (data.normalized && data.normalized !== slugInput.value) {
                slugInput.value = data.normalized;
            }

            if (data.available) {
                currentSlugValid = true;
                setStatusMessage("Slug disponible.", "success");
                renderSuggestions([]);
            } else {
                currentSlugValid = false;
                setStatusMessage(data.message || "Este slug ya está en uso.", "error");
                renderSuggestions(data.suggestions);
            }

            updateSaveButtonState();
        } catch (error) {
            console.error("Error:", error);
            setStatusMessage("No se pudo verificar el slug. Intenta de nuevo.", "error");
        }
    }

    const debouncedCheck = debounce((value) => checkSlugAvailability(value), 400);

    titleInput.addEventListener("input", () => {
        if (slugLinkedToTitle) {
            const generated = normalizeSlugClient(titleInput.value);
            slugInput.value = generated;
            if (generated) {
                debouncedCheck(generated);
            }
        }
        updateSaveButtonState();
    });

    slugInput.addEventListener("input", () => {
        if (!slugLinkedToTitle) {
            const normalized = normalizeSlugClient(slugInput.value);
            if (normalized !== slugInput.value) {
                slugInput.value = normalized;
            }
            debouncedCheck(normalized);
        }
        updateSaveButtonState();
    });

    toggleLinkBtn.addEventListener("click", () => {
        slugLinkedToTitle = !slugLinkedToTitle;
        slugInput.readOnly = slugLinkedToTitle;

        if (slugLinkedToTitle) {
            toggleLinkBtn.innerHTML = '<i class="ri-link-unlink-m mr-1"></i>Editar manualmente';
            const generated = normalizeSlugClient(titleInput.value);
            slugInput.value = generated;
            checkSlugAvailability(generated);
        } else {
            toggleLinkBtn.innerHTML = '<i class="ri-link-m mr-1"></i>Generar desde título';
            slugInput.focus();
        }

        updateSaveButtonState();
    });

    saveBtn.addEventListener("click", () => submitTitleSlug());

    async function submitTitleSlug() {
        if (!CSRF) {
            showNotification("Error de configuración. Recarga la página.", "error");
            return;
        }

        if (!currentSlugValid) {
            showNotification("Corrige el slug antes de guardar.", "error");
            return;
        }

        try {
            const response = await fetch(buildUrl(`pages/${currentSlug}/title-slug`), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": CSRF.getAttribute("content"),
                    Accept: "application/json",
                    "X-Requested-With": "XMLHttpRequest",
                },
                credentials: "same-origin",
                body: JSON.stringify({
                    title: titleInput.value.trim(),
                    slug: slugInput.value.trim(),
                }),
            });

            const contentType = response.headers.get("content-type") || "";
            const isJson = contentType.includes("application/json");
            const data = isJson ? await response.json() : null;

            if (!response.ok) {
                if (response.status === 401 || response.status === 419) {
                    throw new Error("Tu sesión ha expirado. Recarga la página.");
                }
                if (response.status === 422 && data?.suggestions) {
                    setStatusMessage(data.message, "error");
                    renderSuggestions(data.suggestions);
                    currentSlugValid = false;
                    updateSaveButtonState();
                    throw new Error(data.message);
                }
                throw new Error(data?.message || `Error del servidor: ${response.status}`);
            }

            if (!data || !data.success) {
                throw new Error(data?.message || "Error al guardar");
            }

            document.querySelector("#page-title-display h2").textContent = data.page.title;
            document.getElementById("page-slug-display").textContent = data.page.slug;
            document.getElementById("page-preview-url").value = data.page.preview_url;
            document.getElementById("page-preview-link").href = data.page.preview_url;

            document.querySelectorAll("[data-toggle-publish]").forEach((btn) => {
                btn.dataset.slug = data.page.slug;
            });
            document.querySelectorAll("[data-delete-page]").forEach((btn) => {
                btn.dataset.slug = data.page.slug;
                btn.dataset.pageTitle = data.page.title;
            });

            showNotification(data.message, "success");
            saveBtn.disabled = true;
            window.history.replaceState({}, "", data.page.show_url);
        } catch (error) {
            console.error("Error:", error);
            showNotification(error.message || "Error al guardar el título y slug", "error");
        }
    }
}