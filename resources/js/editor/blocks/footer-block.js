import { openMediaPicker } from "@/editor/media-picker";

const FOOTER_STYLES = `
<style>
.ft-wrapper {
    background-color: #003B71;
    width: 100%;
}
.ft-inner {
    max-width: 1152px;
    margin: 0 auto;
    padding: 3rem 1.5rem 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem;
    align-items: flex-start;
}
.ft-logo-col {
    flex: 0 0 auto;
    min-width: 140px;
    max-width: 200px;
}
.ft-logo-col img {
    max-width: 100%;
    height: auto;
    display: block;
}
.ft-sections {
    flex: 1 1 0;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: flex-end;
}
.ft-section {
    min-width: 120px;
    max-width: 200px;
    flex: 1 1 120px;
}
.ft-section-title {
    color: #ffffff;
    font-weight: 700;
    font-size: 0.9375rem;
    margin: 0 0 0.875rem;
    padding: 0;
}
.ft-section-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
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
.ft-links li a,
.ft-links li span {
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s;
}
.ft-links li a:hover {
    color: #ffffff;
    text-decoration: none;
}
.ft-links li a i,
.ft-links li span i {
    font-size: 1rem;
    flex-shrink: 0;
    color: #E97300;
}
.ft-stripe {
    width: 100%;
    height: 20px;
    background: #E97300;
}
@media (max-width: 768px) {
    .ft-inner {
        flex-direction: column;
        gap: 1.5rem;
    }
    .ft-logo-col {
        max-width: 160px;
    }
    .ft-sections {
        flex-direction: column;
        gap: 0;
        width: 100%;
        justify-content: flex-start;
    }
    .ft-section {
        max-width: 100%;
        width: 100%;
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 0.75rem;
    }
    .ft-section-title {
        display: none;
    }
    .ft-section-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ffffff;
        font-weight: 700;
        font-size: 0.9375rem;
        margin-bottom: 0;
    }
    .ft-section-toggle i {
        color: rgba(255,255,255,0.6);
        transition: transform 0.2s;
    }
    .ft-section.ft-open .ft-section-toggle i {
        transform: rotate(180deg);
    }
    .ft-links {
        display: none;
        padding: 0.75rem 0;
    }
    .ft-section.ft-open .ft-links {
        display: flex;
    }
}
</style>`;

function buildFooterHTML(data) {
    const logoHtml = data.logo_url
        ? `<img src="${data.logo_url}" alt="${data.logo_alt || "Logo"}">`
        : `<div style="color:#fff;font-weight:800;font-size:1.25rem;">Logo</div>`;

    const sectionsHtml = (data.sections || [])
        .map((sec, i) => {
            const linksHtml = (sec.links || [])
                .map((link) => {
                    const icon = link.icon
                        ? `<i class="${link.icon}"></i>`
                        : "";
                    const href = link.href || "#";
                    return `<li><a href="${href}">${icon}${link.label}</a></li>`;
                })
                .join("");

            return `
<div class="ft-section" data-section-index="${i}">
    <p class="ft-section-title">${sec.title}</p>
    <button class="ft-section-toggle" type="button" aria-expanded="false">
        <span>${sec.title}</span>
        <i class="ri-arrow-down-s-line"></i>
    </button>
    <ul class="ft-links">${linksHtml}</ul>
</div>`;
        })
        .join("");

    return `
<div class="ft-inner"
    data-gjs-editable="false"
    data-gjs-selectable="false"
    data-gjs-hoverable="false">
    <div class="ft-logo-col"
        data-gjs-editable="false"
        data-gjs-selectable="false">${logoHtml}</div>
    <div class="ft-sections"
        data-gjs-editable="false"
        data-gjs-selectable="false">${sectionsHtml}</div>
</div>
<div class="ft-stripe"
    data-gjs-editable="false"
    data-gjs-selectable="false"></div>`;
}

function createFooterScript() {
    return function () {
        const footer = this;

        // Toggle mobile sections
        footer.querySelectorAll(".ft-section-toggle").forEach((btn) => {
            btn.addEventListener("click", () => {
                const section = btn.closest(".ft-section");
                section.classList.toggle("ft-open");
                btn.setAttribute(
                    "aria-expanded",
                    section.classList.contains("ft-open"),
                );
            });
        });
    };
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
                overflow: hidden;
            }
            .ft-section-card-header {
                padding: 0.75rem 1rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                border-bottom: 1px solid #f1f5f9;
                background: #f8fafc;
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
                <div class="ft-modal-sections-header">
                    <label class="ft-modal-label" style="margin-bottom:0;">Secciones</label>
                    <button id="ft-add-section" class="ft-btn-add-section">
                        <i class="ri-add-line"></i> Agregar sección
                    </button>
                </div>
                <div id="ft-sections-container" class="ft-sections-container"></div>
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

    function renderSection(sec, index) {
        const div = document.createElement("div");
        div.className = "ft-section-card";
        div.dataset.sectionIndex = index;

        const linksHtml = (sec.links || [])
            .map(
                (link, li) => `
            <div class="ft-link-row" data-link-index="${li}">
                <input class="ft-modal-input-sm ft-link-icon-input ft-link-icon" type="text"
                    placeholder="ri-phone-line (opcional)" value="${link.icon || ""}">
                <input class="ft-modal-input-sm ft-link-label" type="text"
                    placeholder="Texto del enlace" value="${link.label || ""}">
                <input class="ft-modal-input-sm ft-link-href" type="text"
                    placeholder="URL o tel:0000-0000" value="${link.href || ""}">
                <button class="ft-btn-remove ft-remove-link">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `,
            )
            .join("");

        div.innerHTML = `
            <div class="ft-section-card-header">
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

        return div;
    }

    function renderAllSections() {
        sectionsContainer.innerHTML = "";
        sections.forEach((sec, i) =>
            sectionsContainer.appendChild(renderSection(sec, i)),
        );
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
                    links.push({
                        icon: row.querySelector(".ft-link-icon").value.trim(),
                        label: row.querySelector(".ft-link-label").value.trim(),
                        href: row.querySelector(".ft-link-href").value.trim(),
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
            `;
            head.appendChild(style);
        }
    });
}
