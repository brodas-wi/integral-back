import { openMediaPicker } from "@/editor/media-picker";

const FOOTER_STYLES = `
<style>
.ft-wrapper {
    background-color: #003B71;
    width: 100%;
    font-family: 'Poppins', sans-serif;
}
.ft-inner {
    padding: 3rem 4rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 2.5rem 2rem;
    align-items: flex-start;
}
.ft-logo-col {
    min-width: 0;
}
.ft-logo-col img {
    max-width: 160px;
    width: 100%;
    height: auto;
    display: block;
}
.ft-logo-col .ft-logo-text {
    color: #ffffff;
    font-weight: 800;
    font-size: 1.25rem;
}
.ft-section {
    min-width: 0;
}
.ft-section-title {
    color: #ffffff;
    font-weight: 700;
    font-size: 0.9375rem;
    margin: 0 0 0.875rem;
    padding: 0;
}
.ft-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.ft-links li a {
    color: #ffffff;
    text-decoration: none;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s;
}
.ft-links li a:hover {
    color: #E97300;
}
.ft-links li span.ft-text {
    color: #ffffff;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.ft-links li a i,
.ft-links li span.ft-text i {
    font-size: 1rem;
    flex-shrink: 0;
    color: #ffffff;
    transition: color 0.2s;
}
.ft-links li a:hover i {
    color: #E97300;
}
.ft-stripe {
    width: 100%;
    height: 40px;
    background: #E97300;
}
@media (max-width: 1280px) {
    .ft-inner { padding: 3rem 2.5rem 2rem; }
}
@media (max-width: 992px) {
    .ft-inner {
        padding: 2.5rem 1.5rem 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 2rem 1.5rem;
    }
}
@media (max-width: 480px) {
    .ft-inner {
        grid-template-columns: 1fr 1fr;
        gap: 1.75rem 1.25rem;
    }
    .ft-logo-col {
        grid-column: 1 / -1;
    }
}
@media (max-width: 320px) {
    .ft-inner { grid-template-columns: 1fr; }
    .ft-logo-col { grid-column: auto; }
}
</style>`;

function buildFooterHTML(data) {
    const logoHtml = data.logo_url
        ? `<img src="${data.logo_url}" alt="${data.logo_alt || "Logo"}">`
        : `<span class="ft-logo-text">Logo</span>`;

    const sectionsHtml = (data.sections || [])
        .map((sec, i) => {
            const linksHtml = (sec.links || [])
                .map((link) => {
                    const icon = link.icon
                        ? `<i class="${link.icon}"></i>`
                        : "";
                    if (link.isText) {
                        return `<li><span class="ft-text">${icon}${link.label}</span></li>`;
                    }
                    return `<li><a href="${link.href || "#"}">${icon}${link.label}</a></li>`;
                })
                .join("");
            return `<div class="ft-section" data-section-index="${i}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><p class="ft-section-title">${sec.title}</p><ul class="ft-links">${linksHtml}</ul></div>`;
        })
        .join("");

    return `<div class="ft-inner" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div class="ft-logo-col" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">${logoHtml}</div>${sectionsHtml}</div><div class="ft-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>`;
}

function createFooterScript() {
    return function () {};
}

function showFooterModal(editor, component) {
    const existing = document.getElementById("footer-config-modal");
    if (existing) existing.remove();

    // Inyectar estilos del modal si no existen
    if (!document.getElementById("ft-modal-styles")) {
        const style = document.createElement("style");
        style.id = "ft-modal-styles";
        style.textContent = `
            .ft-overlay {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(15, 23, 42, 0.45);
                backdrop-filter: blur(3px);
                padding: 1rem;
            }
            .ft-modal {
                background: #ffffff;
                border-radius: 0.75rem;
                width: 100%;
                max-width: 700px;
                max-height: 90vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                box-shadow: 0 20px 60px rgba(15,23,42,0.15), 0 4px 16px rgba(15,23,42,0.08);
                font-family: 'Inter', sans-serif;
                color: #1e293b;
                border: 1px solid #e2e8f0;
            }
            .ft-modal-header {
                padding: 1rem 1.25rem;
                border-bottom: 1px solid #f1f5f9;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #ffffff;
                flex-shrink: 0;
            }
            .ft-modal-header-left {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .ft-modal-header-left i {
                font-size: 1.125rem;
                color: #3b82f6;
            }
            .ft-modal-header-left h2 {
                margin: 0;
                font-size: 0.9375rem;
                font-weight: 600;
                color: #0f172a;
            }
            .ft-modal-close {
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
            .ft-modal-close:hover {
                background: #f1f5f9;
                color: #475569;
            }
            .ft-modal-close i {
                font-size: 1.125rem;
            }
            .ft-modal-body {
                flex: 1;
                overflow-y: auto;
                padding: 1.25rem;
                display: flex;
                flex-direction: column;
                gap: 1.25rem;
                background: #f8fafc;
            }
            .ft-modal-body::-webkit-scrollbar { width: 5px; }
            .ft-modal-body::-webkit-scrollbar-track { background: transparent; }
            .ft-modal-body::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 3px; }
            .ft-modal-section-box {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 0.625rem;
                padding: 1rem;
            }
            .ft-modal-label {
                display: block;
                font-size: 0.75rem;
                font-weight: 600;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 0.625rem;
            }
            .ft-modal-row {
                display: flex;
                gap: 0.75rem;
            }
            .ft-modal-sections-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.75rem;
            }
            .ft-modal-input {
                flex: 1;
                padding: 0.5rem 0.75rem;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 0.5rem;
                color: #1e293b;
                font-size: 0.875rem;
                outline: none;
                font-family: inherit;
                transition: border-color 0.15s;
            }
            .ft-modal-input:focus {
                border-color: #3b82f6;
            }
            .ft-modal-input-sm {
                padding: 0.375rem 0.625rem;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 0.375rem;
                color: #1e293b;
                font-size: 0.8rem;
                outline: none;
                font-family: inherit;
                transition: border-color 0.15s;
            }
            .ft-modal-input-sm:focus {
                border-color: #3b82f6;
            }
            .ft-drag-handle{cursor:grab;color:#94a3b8;display:flex;align-items:center;padding:0 0.125rem;flex-shrink:0;}
            .ft-drag-handle:hover{color:#475569;}
            .ft-drag-handle:active{cursor:grabbing;}
            .ft-section-card.ft-dragging{opacity:0.4;}
            .ft-section-card.ft-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
            .ft-btn-add-section {
                padding: 0.375rem 0.75rem;
                background: #003B71;
                border: none;
                border-radius: 0.5rem;
                color: #fff;
                font-size: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.375rem;
                font-family: inherit;
                transition: background 0.15s;
            }
            .ft-btn-add-section:hover { background: #002a52; }
            .ft-sections-container {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            .ft-section-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 0.625rem;
                overflow: visible;
            }
            .ft-section-card-header {
                padding: 0.75rem 1rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                border-bottom: 1px solid #f1f5f9;
                background: #f8fafc;
                border-radius: 0.625rem 0.625rem 0 0;
            }
            .ft-section-title-input {
                flex: 1;
                padding: 0.375rem 0.625rem;
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 0.375rem;
                color: #1e293b;
                font-size: 0.875rem;
                font-weight: 600;
                outline: none;
                font-family: inherit;
                transition: border-color 0.15s;
            }
            .ft-section-title-input:focus { border-color: #3b82f6; }
            .ft-section-card-body { padding: 0.75rem 1rem; }
            .ft-link-row {
                display: flex;
                gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            .ft-link-icon-input {
                width: 150px;
                flex-shrink: 0;
            }
            .ft-btn-remove {
                background: none;
                border: none;
                cursor: pointer;
                color: #ef4444;
                padding: 0.25rem;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 0.25rem;
                transition: background 0.15s;
            }
            .ft-btn-remove:hover { background: #fef2f2; }
            .ft-btn-add-link {
                margin-top: 0.5rem;
                padding: 0.375rem 0.75rem;
                background: #0d3f6a;
                border: none;
                border-radius: 0.375rem;
                color: #fff;
                font-size: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.375rem;
                font-family: inherit;
                transition: background 0.15s;
            }
            .ft-btn-add-link:hover { background: #003B71; }
            .ft-modal-footer {
                padding: 1rem 1.25rem;
                border-top: 1px solid #f1f5f9;
                display: flex;
                gap: 0.75rem;
                justify-content: flex-end;
                background: #ffffff;
                flex-shrink: 0;
            }
            .ft-btn-cancel {
                padding: 0.5rem 1.25rem;
                background: #ffffff;
                border: 2px solid #e2e8f0;
                border-radius: 0.5rem;
                color: #475569;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                font-family: inherit;
                transition: background 0.15s, border-color 0.15s;
            }
            .ft-btn-cancel:hover { background: #f8fafc; border-color: #cbd5e1; }
            .ft-btn-save {
                padding: 0.5rem 1.25rem;
                background: #f0872a;
                border: none;
                border-radius: 0.5rem;
                color: #fff;
                font-size: 0.875rem;
                font-weight: 600;
                cursor: pointer;
                font-family: inherit;
                transition: background 0.15s;
            }
            .ft-btn-save:hover { background: #d97821; }
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-footer-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const sections = currentData.sections || [
        { title: "Sección", links: [{ label: "Enlace", href: "#", icon: "" }] },
    ];
    const logoUrl = currentData.logo_url || "";
    const logoAlt = currentData.logo_alt || "";

    const overlay = document.createElement("div");
    overlay.id = "footer-config-modal";
    overlay.className = "ft-overlay";

    const modal = document.createElement("div");
    modal.className = "ft-modal";

    modal.innerHTML = `
        <div class="ft-modal-header">
            <div class="ft-modal-header-left">
                <i class="ri-layout-bottom-line"></i>
                <h2>Configurar Footer</h2>
            </div>
            <button id="ft-modal-close" class="ft-modal-close">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <div class="ft-modal-body">
            <div class="ft-modal-section-box">
                <label class="ft-modal-label">Logo</label>
                <div class="ft-modal-row" style="align-items:center;">
                    <div style="flex:1;position:relative;">
                        ${logoUrl ? `<img id="ft-logo-preview" src="${logoUrl}" alt="Logo preview" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;">` : `<div id="ft-logo-preview" style="display:none;"></div>`}
                        <input id="ft-logo-url" type="text" placeholder="URL del logo" value="${logoUrl}" class="ft-modal-input" style="width:100%;">
                    </div>
                    <button id="ft-logo-pick" type="button" style="flex-shrink:0;padding:0.5rem 0.875rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.8rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;">
                        <i class="ri-image-line"></i> Seleccionar
                    </button>
                    <input id="ft-logo-alt" type="text" placeholder="Texto alternativo" value="${logoAlt}" class="ft-modal-input">
                </div>
            </div>

            <div>
                <label class="ft-modal-label">Secciones</label>
                <div id="ft-sections-container" class="ft-sections-container"></div>
                <div style="padding-top:0.5rem;">
                    <button id="ft-add-section" class="ft-btn-add-section">
                        <i class="ri-add-line"></i> Agregar sección
                    </button>
                </div>
            </div>
        </div>

        <div class="ft-modal-footer">
            <button id="ft-modal-cancel" class="ft-btn-cancel">Cancelar</button>
            <button id="ft-modal-save" class="ft-btn-save">Aplicar cambios</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const sectionsContainer = modal.querySelector("#ft-sections-container");

    const appBase =
        document
            .querySelector('meta[name="app-url"]')
            ?.content?.replace(/\/$/, "") ?? "";
    const searchUrl = `${appBase}/api/pages/search`;

    function attachUrlAutocomplete(input) {
        if (input.dataset.autocompleteAttached) return;
        input.dataset.autocompleteAttached = "true";

        const parent = input.parentNode;
        const prevPosition = parent.style.position;
        if (!prevPosition || prevPosition === "static") {
            parent.style.position = "relative";
        }

        const dropdown = document.createElement("ul");
        dropdown.style.cssText = `
            position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;
            background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;
            box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;
            max-height:200px;overflow-y:auto;display:none;
        `;
        parent.appendChild(dropdown);

        let debounceTimer = null;
        let currentQuery = "";

        async function search(q) {
            if (q.length < 1) {
                dropdown.style.display = "none";
                return;
            }
            try {
                const res = await fetch(
                    `${searchUrl}?q=${encodeURIComponent(q)}`,
                    {
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                        },
                    },
                );
                const pages = await res.json();
                renderDropdown(pages, q);
            } catch {
                dropdown.style.display = "none";
            }
        }

        function renderDropdown(pages, q) {
            dropdown.innerHTML = "";
            if (!pages.length) {
                dropdown.style.display = "none";
                return;
            }
            pages.forEach((page) => {
                const li = document.createElement("li");
                li.style.cssText =
                    "padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;";
                li.innerHTML = `
                    <span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${highlight(page.title, q)}</span>
                    <span style="font-size:0.7rem;color:#64748b;">/${page.slug}</span>`;
                li.addEventListener(
                    "mouseenter",
                    () => (li.style.background = "#f1f5f9"),
                );
                li.addEventListener(
                    "mouseleave",
                    () => (li.style.background = ""),
                );
                li.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    input.value = "/" + page.slug;
                    input.dispatchEvent(new Event("input"));
                    dropdown.style.display = "none";
                });
                dropdown.appendChild(li);
            });
            dropdown.style.display = "block";
        }

        function highlight(text, q) {
            if (!q) return text;
            return text.replace(
                new RegExp(
                    `(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                    "gi",
                ),
                '<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>',
            );
        }

        input.addEventListener("input", () => {
            clearTimeout(debounceTimer);
            currentQuery = input.value.trim();
            debounceTimer = setTimeout(() => search(currentQuery), 220);
        });

        input.addEventListener("focus", () => {
            input.select();
            currentQuery = input.value.trim();
            if (currentQuery) search(currentQuery);
        });

        input.addEventListener("blur", () => {
            setTimeout(() => {
                dropdown.style.display = "none";
            }, 150);
        });

        input.addEventListener("keydown", (e) => {
            if (dropdown.style.display === "none") return;
            const items = dropdown.querySelectorAll("li");
            const active = dropdown.querySelector("li.ft-ac-active");
            let idx = Array.from(items).indexOf(active);
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (active) active.classList.remove("ft-ac-active");
                const next = items[idx + 1] || items[0];
                next?.classList.add("ft-ac-active");
                if (next) next.style.background = "#f1f5f9";
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (active) active.classList.remove("ft-ac-active");
                const prev = items[idx - 1] || items[items.length - 1];
                prev?.classList.add("ft-ac-active");
                if (prev) prev.style.background = "#f1f5f9";
            } else if (e.key === "Enter" && active) {
                e.preventDefault();
                active.dispatchEvent(new MouseEvent("mousedown"));
            } else if (e.key === "Escape") {
                dropdown.style.display = "none";
            }
        });
    }

    function makeDraggable(container, arr, renderFn) {
        let dragIdx = null;
        container.querySelectorAll("[data-drag-idx]").forEach((card) => {
            card.setAttribute("draggable", "true");
            card.addEventListener("dragstart", (e) => {
                dragIdx = parseInt(card.dataset.dragIdx);
                setTimeout(() => card.classList.add("ft-dragging"), 0);
                e.dataTransfer.effectAllowed = "move";
            });
            card.addEventListener("dragend", () => {
                card.classList.remove("ft-dragging");
                container.querySelectorAll(".ft-drag-over").forEach(el => el.classList.remove("ft-drag-over"));
            });
            card.addEventListener("dragover", (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (parseInt(card.dataset.dragIdx) !== dragIdx) card.classList.add("ft-drag-over");
            });
            card.addEventListener("dragleave", () => card.classList.remove("ft-drag-over"));
            card.addEventListener("drop", (e) => {
                e.preventDefault();
                const overIdx = parseInt(card.dataset.dragIdx);
                if (dragIdx !== null && overIdx !== dragIdx) {
                    const [moved] = arr.splice(dragIdx, 1);
                    arr.splice(overIdx, 0, moved);
                    renderFn();
                }
                dragIdx = null;
            });
        });
    }

    function renderSection(sec, index) {
        const div = document.createElement("div");
        div.className = "ft-section-card";
        div.dataset.sectionIndex = index;
        div.dataset.dragIdx = index;

        const linksHtml = (sec.links || [])
            .map(
                (link, li) => `
            <div class="ft-link-row" data-link-index="${li}" style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;">
                <input class="ft-modal-input-sm ft-link-icon-input ft-link-icon" type="text"
                    placeholder="ri-phone-line (opcional)" value="${link.icon || ""}">
                <input class="ft-modal-input-sm ft-link-label" type="text"
                    placeholder="Texto" value="${link.label || ""}">
                <div style="flex:1;position:relative;">
                    <input class="ft-modal-input-sm ft-link-href" type="text"
                        placeholder="URL o buscar página..." value="${link.href || ""}"
                        style="width:100%;box-sizing:border-box;${link.isText ? "opacity:0.4;pointer-events:none;" : ""}">
                </div>
                <label style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:#64748b;white-space:nowrap;cursor:pointer;">
                    <input type="checkbox" class="ft-link-istext" ${link.isText ? "checked" : ""}
                        style="accent-color:#003B71;cursor:pointer;">
                    Solo texto
                </label>
                <button class="ft-btn-remove ft-remove-link">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `,
            )
            .join("");

        div.innerHTML = `
            <div class="ft-section-card-header">
                <span class="ft-drag-handle"><i class="ri-draggable"></i></span>
                <input class="ft-section-title-input" type="text"
                    placeholder="Título de la sección" value="${sec.title || ""}">
                <button class="ft-btn-remove ft-remove-section" title="Eliminar sección">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="ft-section-card-body">
                <div class="ft-links-container">${linksHtml}</div>
                <button class="ft-btn-add-link">
                    <i class="ri-add-line"></i> Agregar enlace
                </button>
            </div>
        `;

        div.querySelector(".ft-remove-section").onclick = () => {
            sections.splice(index, 1);
            renderAllSections();
        };

        div.querySelector(".ft-btn-add-link").onclick = () => {
            sec.links = sec.links || [];
            sec.links.push({ label: "Nuevo enlace", href: "#", icon: "" });
            renderAllSections();
        };

        div.querySelectorAll(".ft-remove-link").forEach((btn) => {
            btn.onclick = () => {
                const li = parseInt(
                    btn.closest(".ft-link-row").dataset.linkIndex,
                );
                sec.links.splice(li, 1);
                renderAllSections();
            };
        });

        div.querySelectorAll(".ft-link-href").forEach((input) => {
            if (!input.closest("[style*='pointer-events:none']")) {
                attachUrlAutocomplete(input);
            }
        });

        div.querySelectorAll(".ft-link-istext").forEach((chk) => {
            chk.addEventListener("change", () => {
                const hrefInput = chk
                    .closest(".ft-link-row")
                    .querySelector(".ft-link-href");
                if (chk.checked) {
                    hrefInput.style.opacity = "0.4";
                    hrefInput.style.pointerEvents = "none";
                    hrefInput.value = "";
                } else {
                    hrefInput.style.opacity = "1";
                    hrefInput.style.pointerEvents = "auto";
                }
            });
        });

        return div;
    }

    function renderAllSections() {
        sectionsContainer.innerHTML = "";
        sections.forEach((sec, i) =>
            sectionsContainer.appendChild(renderSection(sec, i)),
        );
        makeDraggable(sectionsContainer, sections, renderAllSections);
    }

    renderAllSections();

    modal.querySelector("#ft-logo-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar logo",
            onSelect: (url) => {
                modal.querySelector("#ft-logo-url").value = url;
                let preview = modal.querySelector("#ft-logo-preview");
                if (!preview || preview.tagName === "DIV") {
                    const img = document.createElement("img");
                    img.id = "ft-logo-preview";
                    img.style.cssText =
                        "height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;";
                    preview?.replaceWith(img) ??
                        modal.querySelector("#ft-logo-url").before(img);
                    preview = img;
                }
                preview.src = url;
                preview.style.display = "block";
            },
        });
    });

    modal.querySelector("#ft-add-section").onclick = () => {
        sections.push({ title: "Nueva Sección", links: [] });
        renderAllSections();
        sectionsContainer.lastElementChild?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };

    function collectData() {
        const logoUrl = modal.querySelector("#ft-logo-url").value.trim();
        const logoAlt = modal.querySelector("#ft-logo-alt").value.trim();
        const updatedSections = [];

        sectionsContainer
            .querySelectorAll("[data-section-index]")
            .forEach((secEl) => {
                const title = secEl
                    .querySelector(".ft-section-title-input")
                    .value.trim();
                const links = [];
                secEl.querySelectorAll(".ft-link-row").forEach((row) => {
                    const isText =
                        row.querySelector(".ft-link-istext")?.checked ?? false;
                    links.push({
                        icon: row.querySelector(".ft-link-icon").value.trim(),
                        label: row.querySelector(".ft-link-label").value.trim(),
                        href: isText
                            ? ""
                            : row.querySelector(".ft-link-href").value.trim(),
                        isText,
                    });
                });
                updatedSections.push({ title, links });
            });

        return {
            logo_url: logoUrl,
            logo_alt: logoAlt,
            sections: updatedSections,
        };
    }

    const close = () => overlay.remove();
    modal.querySelector("#ft-modal-close").onclick = close;
    modal.querySelector("#ft-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#ft-modal-save").onclick = () => {
        const data = collectData();
        component.addAttributes({ "data-footer-config": JSON.stringify(data) });
        component.components(buildFooterHTML(data) + FOOTER_STYLES);
        close();
    };
}

export function initializeFooterBlock(editor) {
    const componentType = "footer-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Footer",
                tagName: "footer",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: {
                    "data-gjs-type": componentType,
                    class: "ft-wrapper",
                    "data-footer-config": JSON.stringify({
                        logo_url: "",
                        logo_alt: "Logo",
                        sections: [
                            {
                                title: "Productos",
                                links: [
                                    { label: "Créditos", href: "#", icon: "" },
                                    { label: "Depósitos", href: "#", icon: "" },
                                    {
                                        label: "Otros Servicios",
                                        href: "#",
                                        icon: "",
                                    },
                                ],
                            },
                            {
                                title: "Sobre Nosotros",
                                links: [
                                    { label: "Historial", href: "#", icon: "" },
                                    {
                                        label: "Misión y Visión",
                                        href: "#",
                                        icon: "",
                                    },
                                    {
                                        label: "Red de Agencias",
                                        href: "#",
                                        icon: "",
                                    },
                                ],
                            },
                            {
                                title: "Contáctanos",
                                links: [
                                    {
                                        label: "0000 - 0000",
                                        href: "tel:0000-0000",
                                        icon: "ri-phone-line",
                                    },
                                    {
                                        label: "Correo",
                                        href: "mailto:info@banco.com",
                                        icon: "ri-mail-line",
                                    },
                                    {
                                        label: "Dirección",
                                        href: "#",
                                        icon: "ri-map-pin-line",
                                    },
                                ],
                            },
                        ],
                    }),
                },
                components:
                    buildFooterHTML({
                        logo_url: "",
                        logo_alt: "Logo",
                        sections: [
                            {
                                title: "Productos",
                                links: [
                                    { label: "Créditos", href: "#", icon: "" },
                                    { label: "Depósitos", href: "#", icon: "" },
                                ],
                            },
                            {
                                title: "Sobre Nosotros",
                                links: [
                                    { label: "Historial", href: "#", icon: "" },
                                    {
                                        label: "Misión y Visión",
                                        href: "#",
                                        icon: "",
                                    },
                                ],
                            },
                            {
                                title: "Contáctanos",
                                links: [
                                    {
                                        label: "0000-0000",
                                        href: "tel:0000",
                                        icon: "ri-phone-line",
                                    },
                                    {
                                        label: "Correo",
                                        href: "mailto:",
                                        icon: "ri-mail-line",
                                    },
                                ],
                            },
                        ],
                    }) + FOOTER_STYLES,
                script: createFooterScript(),
                toolbar: [],
                traits: [
                    {
                        type: "button",
                        label: "Footer",
                        text: "Administrar Footer",
                        full: true,
                        command: "open-footer-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-footer-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showFooterModal(ed, selected);
        },
    });

    editor.Commands.add("insert-default-footer", {
        run(ed) {
            ed.DomComponents.clear();
            ed.addComponents({ type: componentType });
        },
    });

    editor.BlockManager.add("footer-block", {
        label: "Footer",
        category: "Footer",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="6" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="12" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="12" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="19" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="0" y="26" width="32" height="6" fill="#E97300"/>
        </svg>`,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    setupFooterEditorEvents(editor, componentType);
    injectFooterCanvasStyles(editor);
}

function setupFooterEditorEvents(editor, componentType) {
    editor.on("storage:end:load", () => {
        setTimeout(() => reinitFooter(editor, componentType), 800);
    });

    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (el?.getAttribute?.("data-gjs-type") === componentType) {
            component.set("type", componentType);
            setTimeout(() => {
                const script = component.get("script");
                if (script && typeof script === "function") script.call(el);
            }, 400);
        }
    });

    editor.on("canvas:render", () => {
        setTimeout(() => reinitFooter(editor, componentType), 600);
    });
}

function reinitFooter(editor, componentType) {
    editor
        .getWrapper()
        .find(`[data-gjs-type="${componentType}"]`)
        .forEach((comp) => {
            comp.set("type", componentType);
            const el = comp.getEl();
            if (el?.isConnected) {
                const script = comp.get("script");
                if (script && typeof script === "function") script.call(el);
            }
        });
}

function injectFooterCanvasStyles(editor) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const head = iframe.contentDocument?.head;
        if (!head) return;

        if (!head.querySelector("#footer-component-css")) {
            const style = document.createElement("style");
            style.id = "footer-component-css";
            style.textContent = `
                [data-gjs-type="footer-component"] {
                    outline: 2px dashed rgba(240,135,42,0.4);
                    outline-offset: 2px;
                }
                .ft-links {
                    display: flex !important;
                    padding: 0 !important;
                }
                .ft-section-toggle {
                    display: none !important;
                }
                .ft-section-title {
                    display: block !important;
                }
            `;
            head.appendChild(style);
        }
    });
}
