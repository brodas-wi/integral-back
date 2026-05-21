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
    height: 6px;
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
<footer class="ft-wrapper"
    data-gjs-editable="false"
    data-gjs-selectable="false"
    data-gjs-hoverable="false"
    data-gjs-droppable="false">
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
        data-gjs-selectable="false"></div>
</footer>`;
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

    // Leer datos actuales del componente
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
    overlay.style.cssText = `
        position:fixed;inset:0;z-index:99999;
        display:flex;align-items:center;justify-content:center;
        background:rgba(0,0,0,0.6);padding:1rem;
    `;

    const modal = document.createElement("div");
    modal.style.cssText = `
        background:#1e293b;border-radius:0.75rem;
        width:100%;max-width:700px;max-height:90vh;
        overflow:hidden;display:flex;flex-direction:column;
        box-shadow:0 25px 60px rgba(0,0,0,0.5);
        font-family:'Inter',sans-serif;color:#e2e8f0;
    `;

    modal.innerHTML = `
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid #334155;display:flex;align-items:center;justify-content:space-between;">
            <div style="display:flex;align-items:center;gap:0.75rem;">
                <div style="width:2.25rem;height:2.25rem;border-radius:0.5rem;background:#0d3f6a;display:flex;align-items:center;justify-content:center;">
                    <i class="ri-layout-bottom-line" style="font-size:1.125rem;color:#f0872a;"></i>
                </div>
                <h2 style="margin:0;font-size:1rem;font-weight:700;color:#f8fafc;">Configurar Footer</h2>
            </div>
            <button id="ft-modal-close" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:1.25rem;padding:0.25rem;">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <div style="flex:1;overflow-y:auto;padding:1.5rem;display:flex;flex-direction:column;gap:1.5rem;">
            <!-- Logo -->
            <div>
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.5rem;">Logo</label>
                <div style="display:flex;gap:0.75rem;">
                    <input id="ft-logo-url" type="text" placeholder="URL del logo" value="${logoUrl}"
                        style="flex:1;padding:0.5rem 0.75rem;background:#0f172a;border:1px solid #334155;border-radius:0.5rem;color:#e2e8f0;font-size:0.875rem;outline:none;">
                    <input id="ft-logo-alt" type="text" placeholder="Texto alternativo" value="${logoAlt}"
                        style="flex:1;padding:0.5rem 0.75rem;background:#0f172a;border:1px solid #334155;border-radius:0.5rem;color:#e2e8f0;font-size:0.875rem;outline:none;">
                </div>
            </div>

            <!-- Secciones -->
            <div>
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
                    <label style="font-size:0.75rem;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Secciones</label>
                    <button id="ft-add-section" style="padding:0.375rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;">
                        <i class="ri-add-line"></i> Agregar sección
                    </button>
                </div>
                <div id="ft-sections-container" style="display:flex;flex-direction:column;gap:1rem;"></div>
            </div>
        </div>

        <div style="padding:1rem 1.5rem;border-top:1px solid #334155;display:flex;gap:0.75rem;justify-content:flex-end;">
            <button id="ft-modal-cancel" style="padding:0.5rem 1.25rem;background:#334155;border:none;border-radius:0.5rem;color:#e2e8f0;font-size:0.875rem;font-weight:500;cursor:pointer;">
                Cancelar
            </button>
            <button id="ft-modal-save" style="padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;">
                Aplicar cambios
            </button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const sectionsContainer = modal.querySelector("#ft-sections-container");

    function renderSection(sec, index) {
        const div = document.createElement("div");
        div.style.cssText =
            "background:#0f172a;border:1px solid #334155;border-radius:0.625rem;overflow:hidden;";
        div.dataset.sectionIndex = index;

        const linksHtml = (sec.links || [])
            .map(
                (link, li) => `
            <div class="ft-link-row" data-link-index="${li}" style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;">
                <input class="ft-link-icon" type="text" placeholder="ri-phone-line (opcional)" value="${link.icon || ""}"
                    style="width:160px;flex-shrink:0;padding:0.375rem 0.625rem;background:#1e293b;border:1px solid #334155;border-radius:0.375rem;color:#e2e8f0;font-size:0.8rem;outline:none;">
                <input class="ft-link-label" type="text" placeholder="Texto del enlace" value="${link.label || ""}"
                    style="flex:1;padding:0.375rem 0.625rem;background:#1e293b;border:1px solid #334155;border-radius:0.375rem;color:#e2e8f0;font-size:0.8rem;outline:none;">
                <input class="ft-link-href" type="text" placeholder="URL o tel:0000-0000" value="${link.href || ""}"
                    style="flex:1;padding:0.375rem 0.625rem;background:#1e293b;border:1px solid #334155;border-radius:0.375rem;color:#e2e8f0;font-size:0.8rem;outline:none;">
                <button class="ft-remove-link" style="background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;flex-shrink:0;">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `,
            )
            .join("");

        div.innerHTML = `
            <div style="padding:0.75rem 1rem;display:flex;align-items:center;gap:0.75rem;border-bottom:1px solid #1e293b;">
                <input class="ft-section-title-input" type="text" placeholder="Título de la sección" value="${sec.title || ""}"
                    style="flex:1;padding:0.375rem 0.625rem;background:#1e293b;border:1px solid #334155;border-radius:0.375rem;color:#e2e8f0;font-size:0.875rem;font-weight:600;outline:none;">
                <button class="ft-remove-section" style="background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;" title="Eliminar sección">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div style="padding:0.75rem 1rem;">
                <div class="ft-links-container">${linksHtml}</div>
                <button class="ft-add-link" style="margin-top:0.5rem;padding:0.375rem 0.75rem;background:#0d3f6a;border:none;border-radius:0.375rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;">
                    <i class="ri-add-line"></i> Agregar enlace
                </button>
            </div>
        `;

        div.querySelector(".ft-remove-section").onclick = () => {
            sections.splice(index, 1);
            renderAllSections();
        };

        div.querySelector(".ft-add-link").onclick = () => {
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
        sections.forEach((sec, i) => {
            sectionsContainer.appendChild(renderSection(sec, i));
        });
    }

    renderAllSections();

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
            .forEach((secEl, i) => {
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

        const html = buildFooterHTML(data);
        component.components(html + FOOTER_STYLES);

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
                tagName: "div",
                draggable: false,
                droppable: false,
                removable: true,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: {
                    "data-gjs-type": componentType,
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
                toolbar: [
                    {
                        attributes: {
                            class: "gjs-toolbar-item",
                            title: "Configurar Footer",
                        },
                        label: '<i class="ri-settings-3-line"></i>',
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
        content: { type: componentType },
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
