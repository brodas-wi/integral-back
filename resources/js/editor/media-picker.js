/**
 * MediaPicker — modal reutilizable para seleccionar archivos del media library.
 * Uso:
 *   import { openMediaPicker } from '@/editor/media-picker';
 *   openMediaPicker({ type: 'image', onSelect: (url) => console.log(url) });
 */

const MEDIA_PICKER_ID = "gjs-media-picker-modal";

function injectStyles() {
    if (document.getElementById("gjs-media-picker-styles")) return;
    const style = document.createElement("style");
    style.id = "gjs-media-picker-styles";
    style.textContent = `
        .mp-overlay {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 9999999;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: rgba(15, 23, 42, 0.45);
            backdrop-filter: blur(3px);
        }
        .mp-overlay.open { display: flex; }

        .mp-modal {
            background: #ffffff;
            border-radius: 0.75rem;
            width: 100%;
            max-width: 780px;
            max-height: 88vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
            box-shadow: 0 20px 60px rgba(15,23,42,0.18), 0 4px 16px rgba(15,23,42,0.08);
            border: 1px solid #e2e8f0;
        }

        .mp-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.25rem;
            border-bottom: 1px solid #f1f5f9;
            background: #ffffff;
            flex-shrink: 0;
        }
        .mp-header-left {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #0f172a;
            font-size: 0.9375rem;
            font-weight: 600;
        }
        .mp-header-left i { font-size: 1.125rem; color: #3b82f6; }

        .mp-close {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 2rem;
            height: 2rem;
            border-radius: 0.375rem;
            border: none;
            background: transparent;
            color: #94a3b8;
            cursor: pointer;
            transition: background 0.15s, color 0.15s;
        }
        .mp-close:hover { background: #f1f5f9; color: #475569; }
        .mp-close i { font-size: 1.125rem; }

        .mp-search {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            padding: 0.75rem 1.25rem;
            border-bottom: 1px solid #f1f5f9;
            background: #f8fafc;
            flex-shrink: 0;
        }
        .mp-search i { color: #94a3b8; font-size: 1rem; flex-shrink: 0; }
        .mp-search input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #1e293b;
            font-size: 0.875rem;
            font-family: inherit;
        }
        .mp-search input::placeholder { color: #b0bec5; }

        .mp-grid-wrap {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            background: #f8fafc;
            scrollbar-width: thin;
            scrollbar-color: #e2e8f0 transparent;
        }
        .mp-grid-wrap::-webkit-scrollbar { width: 5px; }
        .mp-grid-wrap::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 3px; }

        .mp-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 0.75rem;
        }

        .mp-card {
            cursor: pointer;
            border-radius: 0.5rem;
            border: 2px solid #e2e8f0;
            overflow: hidden;
            background: #ffffff;
            transition: border-color 0.15s, box-shadow 0.15s;
        }
        .mp-card:hover { border-color: #94a3b8; }
        .mp-card.selected {
            border-color: #003B71;
            box-shadow: 0 0 0 3px rgba(0,59,113,0.15);
        }
        .mp-card img {
            width: 100%;
            aspect-ratio: 16/10;
            object-fit: cover;
            display: block;
        }
        .mp-card-icon-thumb {
            width: 100%;
            aspect-ratio: 16/10;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .mp-card-icon-thumb i {
            font-size: 2.25rem;
        }
        .mp-card p {
            font-size: 0.65rem;
            padding: 4px 6px;
            color: #374151;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0;
        }

        .mp-loading {
            grid-column: 1 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem 1rem;
            gap: 1rem;
            color: #6b7280;
            font-size: 0.875rem;
        }
        .mp-spinner {
            width: 2rem;
            height: 2rem;
            border: 3px solid #e5e7eb;
            border-top-color: #003B71;
            border-radius: 50%;
            animation: mp-spin 0.8s linear infinite;
        }
        @keyframes mp-spin { to { transform: rotate(360deg); } }

        .mp-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.25rem;
            border-top: 1px solid #f1f5f9;
            background: #ffffff;
            flex-shrink: 0;
        }
        .mp-footer-info { font-size: 0.8rem; color: #6b7280; }

        .mp-btn {
            padding: 0.5rem 1.25rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            font-family: inherit;
            transition: opacity 0.15s, background 0.15s;
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
        }
        .mp-btn:hover { opacity: 0.88; }
        .mp-btn-cancel {
            background: #ffffff;
            border: 2px solid #e2e8f0;
            color: #475569;
        }
        .mp-btn-confirm {
            background: #003B71;
            border: 2px solid #003B71;
            color: #ffffff;
        }
        .mp-btn-confirm:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
}

function getFileIconMeta(filename) {
    const ext = (filename.split(".").pop() || "").toLowerCase();

    const map = {
        pdf: { icon: "ri-file-pdf-2-fill", color: "#dc2626", bg: "#fef2f2" },
        xls: { icon: "ri-file-excel-2-fill", color: "#16a34a", bg: "#f0fdf4" },
        xlsx: { icon: "ri-file-excel-2-fill", color: "#16a34a", bg: "#f0fdf4" },
        doc: { icon: "ri-file-word-2-fill", color: "#2563eb", bg: "#eff6ff" },
        docx: { icon: "ri-file-word-2-fill", color: "#2563eb", bg: "#eff6ff" },
    };

    return map[ext] || { icon: "ri-file-text-fill", color: "#6b7280", bg: "#f3f4f6" };
}

function createModal() {
    if (document.getElementById(MEDIA_PICKER_ID)) return;

    injectStyles();

    const el = document.createElement("div");
    el.id = MEDIA_PICKER_ID;
    el.className = "mp-overlay";
    el.innerHTML = `
        <div class="mp-modal">
            <div class="mp-header">
                <div class="mp-header-left">
                    <i class="ri-image-line"></i>
                    <span id="mp-title">Seleccionar imagen</span>
                </div>
                <button class="mp-close" id="mp-close">
                    <i class="ri-close-line"></i>
                </button>
            </div>
            <div class="mp-search">
                <i class="ri-search-line"></i>
                <input type="text" id="mp-search-input" placeholder="Buscar por nombre...">
            </div>
            <div class="mp-grid-wrap">
                <div class="mp-grid" id="mp-grid"></div>
            </div>
            <div class="mp-footer">
                <span class="mp-footer-info" id="mp-footer-info">Ningún archivo seleccionado</span>
                <div style="display:flex;gap:0.5rem;">
                    <button class="mp-btn mp-btn-cancel" id="mp-cancel">Cancelar</button>
                    <button class="mp-btn mp-btn-confirm" id="mp-confirm" disabled>
                        <i class="ri-check-line"></i> Usar archivo
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(el);

    // Estado interno
    let selectedUrl = null;
    let onSelectCb = null;
    let searchTimer = null;

    const grid = () => document.getElementById("mp-grid");
    const confirmBtn = () => document.getElementById("mp-confirm");
    const footerInfo = () => document.getElementById("mp-footer-info");
    const searchInput = () => document.getElementById("mp-search-input");

    async function load(search = "", type = "image") {
        grid().innerHTML = `
            <div class="mp-loading">
                <div class="mp-spinner"></div>
                <span>Cargando...</span>
            </div>`;

        try {
            const apiUrl =
                document.querySelector('meta[name="media-api-url"]')?.content ??
                "/media/api";
            const params = new URLSearchParams({ per_page: 60 });
            if (type) params.append("type", type);
            if (search) params.append("search", search);

            const res = await fetch(`${apiUrl}?${params}`, {
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Accept: "application/json",
                },
            });
            const data = await res.json();
            const items = data.items || [];

            if (!items.length) {
                grid().innerHTML = `
                    <div class="mp-loading">
                        <i class="ri-image-line" style="font-size:2rem;color:#cbd5e1;"></i>
                        <span>No se encontraron archivos</span>
                    </div>`;
                return;
            }

            grid().innerHTML = "";
            items.forEach((item) => {
                const card = document.createElement("div");
                card.className = "mp-card";

                const isImage = item.type === "image";
                const thumbHtml = isImage
                    ? `<img src="${item.url}" alt="${item.filename}" loading="lazy">`
                    : (() => {
                          const iconMeta = getFileIconMeta(item.filename);
                          return `<div class="mp-card-icon-thumb" style="background:${iconMeta.bg};">
                                <i class="${iconMeta.icon}" style="color:${iconMeta.color};"></i>
                            </div>`;
                      })();

                card.innerHTML = `
                    ${thumbHtml}
                    <p title="${item.filename}">${item.filename}</p>
                `;
                card.addEventListener("click", () => {
                    grid()
                        .querySelectorAll(".mp-card")
                        .forEach((c) => c.classList.remove("selected"));
                    card.classList.add("selected");
                    selectedUrl = item.url;
                    footerInfo().textContent = `Seleccionado: ${item.filename}`;
                    confirmBtn().disabled = false;
                });
                grid().appendChild(card);
            });
        } catch {
            grid().innerHTML = `
                <div class="mp-loading">
                    <i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i>
                    <span style="color:#dc2626;">Error al cargar archivos</span>
                </div>`;
        }
    }

    function close() {
        el.classList.remove("open");
        selectedUrl = null;
        onSelectCb = null;
        document.body.style.overflow = "";
    }

    // Eventos fijos
    document.getElementById("mp-close").addEventListener("click", close);
    document.getElementById("mp-cancel").addEventListener("click", close);
    document.getElementById("mp-confirm").addEventListener("click", () => {
        if (selectedUrl && onSelectCb) onSelectCb(selectedUrl);
        close();
    });
    el.addEventListener("click", (e) => {
        if (e.target === el) close();
    });
    document
        .getElementById("mp-search-input")
        .addEventListener("input", (e) => {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(() => {
                el._currentType && load(e.target.value, el._currentType);
            }, 300);
        });

    // API pública en el elemento
    el._open = ({ type = "image", title, onSelect }) => {
        onSelectCb = onSelect;
        selectedUrl = null;
        el._currentType = type;

        document.getElementById("mp-title").textContent =
            title ||
            (type === "image" ? "Seleccionar imagen" : "Seleccionar archivo");

        const headerIcon = document.querySelector("#gjs-media-picker-modal .mp-header-left i");
        if (headerIcon) {
            headerIcon.className = type === "image" ? "ri-image-line" : "ri-file-line";
        }

        searchInput().value = "";
        footerInfo().textContent = "Ningún archivo seleccionado";
        confirmBtn().disabled = true;

        el.classList.add("open");
        document.body.style.overflow = "hidden";
        load("", type);
    };
}

/**
 * Abre el media picker.
 * @param {object} options
 * @param {string}   [options.type="image"]  — filtro de tipo: "image", "video", "document", etc.
 * @param {string}   [options.title]         — título del modal
 * @param {function} options.onSelect        — callback(url: string)
 */
export function openMediaPicker({ type = "image", title, onSelect } = {}) {
    createModal();
    const el = document.getElementById(MEDIA_PICKER_ID);
    el._open({ type, title, onSelect });
}
