export function initMediaPicker({
    dropzoneId = "image-dropzone",
    hiddenInputId = "field-image-id",
    previewId = "image-preview",
    placeholderId = "image-placeholder",
    selectedId = "image-selected",
    altFieldId = "field-image-alt",
    onSelect = null,
} = {}) {
    const dropzone = document.getElementById(dropzoneId);
    const modal = document.getElementById("media-picker-modal");
    const closeBtn = document.getElementById("media-picker-close");
    const searchInput = document.getElementById("media-picker-search");
    const searchBtn = document.getElementById("media-picker-search-btn");
    const grid = document.getElementById("media-picker-grid");
    const pagination = document.getElementById("media-picker-pagination");
    const prevBtn = document.getElementById("media-picker-prev");
    const nextBtn = document.getElementById("media-picker-next");
    const pageInfo = document.getElementById("media-picker-page-info");
    const hiddenId = document.getElementById(hiddenInputId);
    const preview = document.getElementById(previewId);
    const placeholder = document.getElementById(placeholderId);
    const selected = document.getElementById(selectedId);
    const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;

    if (!dropzone || !modal) return;

    let currentPage = 1;
    let currentSearch = "";

    async function loadMedia(page = 1, search = "") {
        grid.innerHTML = `<div class="media-picker-empty">
            <i class="ri-loader-4-line animate-spin text-3xl text-gray-400"></i>
        </div>`;
        pagination.classList.add("hidden");

        const params = new URLSearchParams({
            type: "image",
            page,
            per_page: 20,
        });
        if (search) params.set("search", search);

        try {
            const mediaApiUrl =
                document.querySelector('meta[name="media-api-url"]')?.content ??
                "/media/api";
            const res = await fetch(`${mediaApiUrl}?${params}`, {
                headers: { Accept: "application/json", "X-CSRF-TOKEN": CSRF },
            });
            const data = await res.json();
            renderGrid(data.items ?? []);
            renderPagination(data.pagination ?? {});
        } catch {
            grid.innerHTML = `<p class="media-picker-empty">Error al cargar imágenes.</p>`;
        }
    }

    function renderGrid(items) {
        if (!items.length) {
            grid.innerHTML = `<p class="col-span-full text-center text-sm text-gray-400 py-8">No se encontraron imágenes.</p>`;
            return;
        }

        grid.innerHTML = items
            .map(
                (item) => `
            <button type="button"
                class="media-picker-item"
                data-id="${item.id}"
                data-url="${item.url}"
                data-alt="${item.alt ?? ""}"
                data-filename="${item.filename}">
                <img src="${item.url}" alt="${item.alt ?? item.filename}">
                <span class="media-picker-item-label">${item.filename}</span>
            </button>
        `,
            )
            .join("");

        grid.querySelectorAll(".media-picker-item").forEach((btn) => {
            btn.addEventListener("click", () => selectMedia(btn));
        });
    }

    function renderPagination(pag) {
        if (!pag.total || pag.total <= 1) {
            pagination.classList.remove("visible");
            return;
        }
        pagination.classList.add("visible");
        pageInfo.textContent = `Página ${pag.current} de ${pag.total}`;
        prevBtn.disabled = pag.current <= 1;
        nextBtn.disabled = !pag.hasMore;
    }

    function selectMedia(btn) {
        const { id, url, alt } = btn.dataset;

        if (hiddenId) hiddenId.value = id;
        if (preview) {
            preview.src = url;
            preview.alt = alt;
        }
        if (placeholder) placeholder.classList.add("hidden");
        if (selected) selected.classList.remove("hidden");

        const altField = document.getElementById(altFieldId);
        if (altField && !altField.value && alt) altField.value = alt;

        if (typeof onSelect === "function") onSelect({ id, url, alt });

        closeModal();
    }

    function openModal() {
        modal.classList.add("open");
        if (!grid.querySelector(".media-picker-item")) loadMedia(1, "");
    }

    function closeModal() {
        modal.classList.remove("open");
    }

    dropzone.addEventListener("click", openModal);
    closeBtn?.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    searchBtn?.addEventListener("click", () => {
        currentSearch = searchInput.value.trim();
        currentPage = 1;
        loadMedia(currentPage, currentSearch);
    });

    searchInput?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            searchBtn.click();
        }
    });

    prevBtn?.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            loadMedia(currentPage, currentSearch);
        }
    });
    nextBtn?.addEventListener("click", () => {
        currentPage++;
        loadMedia(currentPage, currentSearch);
    });
}
