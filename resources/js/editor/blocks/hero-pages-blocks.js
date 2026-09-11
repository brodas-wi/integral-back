import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

const HP_CSS = `
.hp-section{width:100%;background:#ffffff;padding:3rem 4rem;box-sizing:border-box;}
.hp-heading{font-size:2.25rem;font-weight:800;color:#E97300;margin:0;text-align:center;line-height:1.2;}
.hp-subheading{font-size:2.25rem;font-weight:500;color:#003B71;margin:0 0 2rem;text-align:center;line-height:1.5;}
.hp-carousel{position:relative;width:100%;}
.hp-swiper{overflow:hidden;width:100%;}
.hp-swiper .swiper-wrapper{align-items:stretch;}
.hp-swiper .swiper-slide{height:auto;}
.hp-card{position:relative;width:100%;height:100%;max-width:280px;max-height:350px;aspect-ratio:4/5;border-radius:32px;overflow:hidden;background:#0a0a0a;margin:0 auto;}
.hp-card-media{position:absolute;inset:0;width:100%;height:100%;border-radius:32px;overflow:hidden;}
.hp-card-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.hp-card-title{position:absolute;top:1rem;left:1rem;right:1rem;z-index:5;margin:0;font-size:1.3rem;font-weight:800;color:#fff;line-height:1.25;text-shadow:0 2px 6px rgba(0,0,0,0.55),0 1px 2px rgba(0,0,0,0.4);}
.hp-card-badge-box{position:absolute;left:0.75rem;right:0.75rem;bottom:0.75rem;z-index:5;display:flex;align-items:center;gap:0.625rem;background:rgba(0,0,0,0.5);border-radius:12px;padding:0.625rem 0.75rem;}
.hp-card-badge{flex-shrink:0;width:2rem;height:2rem;border-radius:9999px;background:#fff;display:flex;align-items:center;justify-content:center;color:#003B71;font-size:1rem;}
.hp-card-desc{margin:0;font-size:0.8125rem;font-weight:500;color:#fff;line-height:1.4;}
.hp-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:10;width:2.75rem;height:2.75rem;border-radius:9999px;background:#fff;border:none;display:flex;align-items:center;justify-content:center;color:#E97300;font-size:1.25rem;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:background 0.2s ease,color 0.2s ease;}
.hp-nav:hover{background:#E97300;color:#fff;}
.hp-nav:disabled{opacity:0.35;cursor:not-allowed;}
.hp-nav-prev{left:-1.375rem;}
.hp-nav-next{right:-1.375rem;}
.hp-dots{display:flex !important;justify-content:center;align-items:center;gap:0.75rem;margin-top:1.75rem;position:static;width:100%;}
.hp-dots .hp-dot{width:0.875rem !important;height:0.875rem !important;border-radius:9999px !important;border:none !important;background:#cbd5e1 !important;cursor:pointer;padding:0 !important;margin:0 !important;transition:background 0.2s ease,transform 0.2s ease;opacity:1 !important;}
.hp-dots .hp-dot.active{background:#003B71 !important;transform:scale(1.1);}
@media(max-width:1280px){.hp-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.hp-section{padding:2.5rem 1.5rem;}.hp-heading,.hp-subheading{font-size:1.875rem;}}
@media(max-width:640px){.hp-nav-prev{left:0.25rem;}.hp-nav-next{right:0.25rem;}.hp-heading,.hp-subheading{font-size:1.5rem;}.hp-card{max-width:none;max-height:400px;}}
`;

function buildPageCardHTML(card) {
    const image = card.image || assetUrl("images/placeholder.svg");
    const title = card.title || "Título de la tarjeta";
    const desc = card.desc || "Descripción breve.";
    const icon = card.icon || "ri-shield-check-line";

    return `<div class="swiper-slide"><div class="hp-card">
        <div class="hp-card-media">
            <img src="${image}" alt="${title}">
        </div>
        <h3 class="hp-card-title">${title}</h3>
        <div class="hp-card-badge-box">
            <span class="hp-card-badge"><i class="${icon}"></i></span>
            <p class="hp-card-desc">${desc}</p>
        </div>
    </div></div>`;
}

function buildHeroPagesHTML(data) {
    const cards = data.cards || [];
    const cardsHtml = cards.map(buildPageCardHTML).join("");

    return `<section class="hp-section">
        <h2 class="hp-heading">${data.heading || "Título"}</h2>
        <p class="hp-subheading">${data.subheading || "Subtítulo"}</p>
        <div class="hp-carousel">
            <button type="button" class="hp-nav hp-nav-prev" aria-label="Anterior"><i class="ri-arrow-left-s-line"></i></button>
            <div class="hp-swiper swiper">
                <div class="swiper-wrapper">${cardsHtml}</div>
            </div>
            <button type="button" class="hp-nav hp-nav-next" aria-label="Siguiente"><i class="ri-arrow-right-s-line"></i></button>
            <div class="hp-dots swiper-pagination"></div>
        </div>
    </section>`;
}

const DEFAULT_DATA = {
    heading: "Título",
    subheading: "Subtítulo descriptivo",
    cards: [
        {
            image: "",
            title: "Capital de trabajo",
            desc: "Respaldo financiero para tu negocio.",
            icon: "ri-briefcase-line",
        },
        {
            image: "",
            title: "Inversión",
            desc: "La oportunidad que tu negocio necesita para crecer.",
            icon: "ri-line-chart-line",
        },
        {
            image: "",
            title: "Vivienda",
            desc: "Realiza tu sueño de comprar o remodelar tu casa.",
            icon: "ri-home-4-line",
        },
        {
            image: "",
            title: "Ahorros",
            desc: "Haz crecer tu dinero con seguridad.",
            icon: "ri-safe-2-line",
        },
        {
            image: "",
            title: "Seguros",
            desc: "Protección para ti y tu familia.",
            icon: "ri-shield-check-line",
        },
        {
            image: "",
            title: "Remesas",
            desc: "Recibe dinero con confianza.",
            icon: "ri-exchange-dollar-line",
        },
    ],
};

function showHeroPagesModal(editor, component) {
    const existing = document.getElementById("hp-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("hp-modal-styles")) {
        const style = document.createElement("style");
        style.id = "hp-modal-styles";
        style.textContent = `
            .hp-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .hp-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .hp-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .hp-modal-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
            .hp-modal-header h2 i{color:#003B71;}
            .hp-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
            .hp-modal-close:hover{background:#f1f5f9;color:#475569;}
            .hp-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem;background:#f8fafc;}
            .hp-config-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .hp-card-config-header{display:flex;align-items:center;gap:0.5rem;}
            .hp-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
            .hp-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .hp-input:focus{border-color:#003B71;}
            .hp-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;box-sizing:border-box;width:100%;}
            .hp-row{display:flex;gap:0.75rem;align-items:flex-start;}
            .hp-img-preview{width:64px;height:64px;border-radius:0.5rem;object-fit:cover;border:1px solid #e2e8f0;background:#f1f5f9;flex-shrink:0;}
            .hp-img-placeholder{width:64px;height:64px;border-radius:0.5rem;background:#f1f5f9;border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
            .hp-img-placeholder i{font-size:1.5rem;color:#94a3b8;}
            .hp-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:9999px;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .hp-pick-btn:hover{background:#002a52;}
            .hp-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.375rem;display:flex;align-items:center;justify-content:center;border-radius:9999px;transition:background 0.15s;}
            .hp-btn-remove:hover{background:#fef2f2;}
            .hp-btn-add{padding:0.5rem 1.25rem;border:none;border-radius:9999px;color:#fff;font-size:0.8125rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;background:#003B71;}
            .hp-btn-add:hover{background:#002a52;}
            .hp-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .hp-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;}
            .hp-btn-cancel:hover{background:#f8fafc;}
            .hp-btn-save{padding:0.5rem 1.25rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hp-btn-save:hover{background:#c96200;}
            .hp-card-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
            .hp-btn-backup{padding:0.5rem 1rem;background:#fff;border:2px solid #003B71;border-radius:9999px;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;}
            .hp-btn-backup:hover{background:#003B71;color:#fff;}
            .hp-btn-restore{padding:0.5rem 1rem;background:#fff;border:2px solid #0d9488;border-radius:9999px;color:#0d9488;font-size:0.8125rem;font-weight:600;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;user-select:none;}
            .hp-btn-restore:hover{background:#0d9488;color:#fff;}
            .hp-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
            .hp-confirm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
            .hp-confirm-header{padding:1rem 1.25rem 0.75rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
            .hp-confirm-header i{font-size:1.25rem;color:#E97300;}
            .hp-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
            .hp-confirm-body{padding:1rem 1.25rem;}
            .hp-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
            .hp-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;background:#f1f5f9;border-radius:0.375rem;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
            .hp-confirm-footer{padding:0.75rem 1.25rem 1rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
            .hp-confirm-cancel{padding:0.5rem 1.125rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hp-confirm-cancel:hover{background:#f1f5f9;}
            .hp-confirm-ok{padding:0.5rem 1.125rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hp-confirm-ok:hover{background:#d97821;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-hero-pages-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const data = {
        heading: currentData.heading ?? DEFAULT_DATA.heading,
        subheading: currentData.subheading ?? DEFAULT_DATA.subheading,
        cards: JSON.parse(
            JSON.stringify(currentData.cards ?? DEFAULT_DATA.cards),
        ),
    };

    const overlay = document.createElement("div");
    overlay.id = "hp-config-modal";
    overlay.className = "hp-overlay";

    const modal = document.createElement("div");
    modal.className = "hp-modal";
    modal.innerHTML = `
        <div class="hp-modal-header">
            <h2><i class="ri-gallery-line"></i> Configurar Tarjetas por Páginas</h2>
            <button id="hp-modal-close" class="hp-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="hp-modal-body">
            <div class="hp-config-card">
                <div>
                    <label class="hp-label">Título principal</label>
                    <input id="hp-heading" type="text" class="hp-input" value="${data.heading}">
                </div>
                <div>
                    <label class="hp-label">Subtítulo</label>
                    <input id="hp-subheading" type="text" class="hp-input" value="${data.subheading}">
                </div>
            </div>
            <div id="hp-cards-list" style="display:flex;flex-direction:column;gap:0.75rem;"></div>
            <button id="hp-add-card" class="hp-btn-add" style="align-self:flex-start;">
                <i class="ri-add-line"></i> Agregar tarjeta
            </button>
        </div>
        <div class="hp-modal-footer">
            <button id="hp-modal-cancel" class="hp-btn-cancel">Cancelar</button>
            <div style="display:flex;gap:0.5rem;margin-right:auto;">
                <button id="hp-modal-backup" class="hp-btn-backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <label id="hp-modal-restore-label" class="hp-btn-restore" title="Restaurar configuración desde JSON" style="cursor:pointer;"><i class="ri-upload-2-line"></i> Restaurar<input id="hp-modal-restore-input" type="file" accept=".json,application/json" style="display:none;"></label>
            </div>
            <button id="hp-modal-save" class="hp-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    function renderCards() {
        const list = modal.querySelector("#hp-cards-list");
        list.innerHTML = "";
        data.cards.forEach((card, idx) => {
            const div = document.createElement("div");
            div.className = "hp-config-card";
            const imgHtml = card.image
                ? `<img class="hp-img-preview" src="${card.image}" alt="">`
                : `<div class="hp-img-placeholder"><i class="ri-image-line"></i></div>`;
            div.innerHTML = `
                <div class="hp-card-config-header">
                    <span class="hp-card-num">${idx + 1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${idx + 1}</span>
                    <button class="hp-btn-remove hp-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="hp-row">
                    <div id="hp-img-wrap-${idx}">${imgHtml}</div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                        <label class="hp-label">Imagen de fondo</label>
                        <input class="hp-input-sm" placeholder="URL de la imagen" value="${card.image || ""}" data-field="image">
                        <button class="hp-pick-btn hp-pick-img"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="hp-label">Título (esquina superior)</label>
                    <input class="hp-input" placeholder="Título de la tarjeta" value="${card.title || ""}" data-field="title">
                </div>
                <div class="hp-row">
                    <div style="width:140px;flex-shrink:0;">
                        <label class="hp-label">Ícono (RemixIcon)</label>
                        <input class="hp-input-sm" placeholder="ri-shield-check-line" value="${card.icon || ""}" data-field="icon">
                    </div>
                    <div style="flex:1;">
                        <label class="hp-label">Descripción</label>
                        <input class="hp-input" placeholder="Descripción breve" value="${card.desc || ""}" data-field="desc">
                    </div>
                </div>`;

            div.querySelectorAll("[data-field]").forEach((input) => {
                input.addEventListener("input", () => {
                    card[input.dataset.field] = input.value;
                    if (input.dataset.field === "image") {
                        const wrap = div.querySelector(`#hp-img-wrap-${idx}`);
                        wrap.innerHTML = input.value
                            ? `<img class="hp-img-preview" src="${input.value}" alt="">`
                            : `<div class="hp-img-placeholder"><i class="ri-image-line"></i></div>`;
                    }
                });
            });

            div.querySelector(".hp-pick-img").addEventListener("click", () => {
                openMediaPicker({
                    type: "image",
                    title: "Seleccionar imagen de tarjeta",
                    onSelect: (url) => {
                        card.image = url;
                        div.querySelector("[data-field='image']").value = url;
                        div.querySelector(`#hp-img-wrap-${idx}`).innerHTML =
                            `<img class="hp-img-preview" src="${url}" alt="">`;
                    },
                });
            });

            div.querySelector(".hp-remove-card").addEventListener(
                "click",
                () => {
                    data.cards.splice(idx, 1);
                    renderCards();
                },
            );

            list.appendChild(div);
        });
    }

    renderCards();

    modal.querySelector("#hp-add-card").addEventListener("click", () => {
        data.cards.push({
            image: "",
            title: "Nueva tarjeta",
            desc: "Descripción de la tarjeta.",
            icon: "ri-shield-check-line",
        });
        renderCards();
        modal.querySelector("#hp-cards-list").lastElementChild?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    });

    modal.querySelector("#hp-modal-backup").addEventListener("click", () => {
        const snapshot = {
            heading:
                modal.querySelector("#hp-heading").value.trim() ||
                DEFAULT_DATA.heading,
            subheading:
                modal.querySelector("#hp-subheading").value.trim() ||
                DEFAULT_DATA.subheading,
            cards: JSON.parse(JSON.stringify(data.cards)),
        };
        const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        const a = document.createElement("a");
        a.href = url;
        a.download = `hero-pages-backup-${ts}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });

    modal.querySelector("#hp-modal-restore-input").addEventListener(
        "change",
        (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                let parsed;
                try {
                    parsed = JSON.parse(ev.target.result);
                } catch {
                    const errOverlay = document.createElement("div");
                    errOverlay.className = "hp-confirm-overlay";
                    errOverlay.innerHTML = `<div class="hp-confirm-modal"><div class="hp-confirm-header"><i class="ri-error-warning-line" style="color:#ef4444;"></i><h3>Archivo inválido</h3></div><div class="hp-confirm-body"><p>El archivo seleccionado no es un JSON válido.</p></div><div class="hp-confirm-footer"><button class="hp-confirm-ok" style="background:#ef4444;">Cerrar</button></div></div>`;
                    document.body.appendChild(errOverlay);
                    errOverlay.querySelector(".hp-confirm-ok").onclick = () =>
                        errOverlay.remove();
                    e.target.value = "";
                    return;
                }
                const confirmOverlay = document.createElement("div");
                confirmOverlay.className = "hp-confirm-overlay";
                confirmOverlay.innerHTML = `
                    <div class="hp-confirm-modal">
                        <div class="hp-confirm-header">
                            <i class="ri-refresh-line"></i>
                            <h3>Restaurar configuración</h3>
                        </div>
                        <div class="hp-confirm-body">
                            <p>¿Deseas restaurar la configuración de esta sección desde el archivo de respaldo?</p>
                            <p>Esta acción reemplazará la configuración actual del formulario.</p>
                            <span class="hp-confirm-filename"><i class="ri-file-code-line"></i>${file.name}</span>
                        </div>
                        <div class="hp-confirm-footer">
                            <button class="hp-confirm-cancel">Cancelar</button>
                            <button class="hp-confirm-ok"><i class="ri-check-line"></i> Sí, restaurar</button>
                        </div>
                    </div>`;
                document.body.appendChild(confirmOverlay);
                confirmOverlay.querySelector(".hp-confirm-cancel").onclick = () => {
                    confirmOverlay.remove();
                    e.target.value = "";
                };
                confirmOverlay.querySelector(".hp-confirm-ok").onclick = () => {
                    confirmOverlay.remove();
                    e.target.value = "";
                    const restored = {
                        heading: parsed.heading ?? DEFAULT_DATA.heading,
                        subheading: parsed.subheading ?? DEFAULT_DATA.subheading,
                        cards: JSON.parse(
                            JSON.stringify(parsed.cards ?? DEFAULT_DATA.cards),
                        ),
                    };
                    component.addAttributes({
                        "data-hero-pages-config": JSON.stringify(restored),
                    });
                    component.components(buildHeroPagesHTML(restored));
                    overlay.remove();
                    showHeroPagesModal(editor, component);
                };
            };
            reader.readAsText(file);
        },
    );

    const close = () => overlay.remove();
    modal.querySelector("#hp-modal-close").addEventListener("click", close);
    modal.querySelector("#hp-modal-cancel").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    modal.querySelector("#hp-modal-save").addEventListener("click", () => {
        data.heading =
            modal.querySelector("#hp-heading").value.trim() ||
            DEFAULT_DATA.heading;
        data.subheading =
            modal.querySelector("#hp-subheading").value.trim() ||
            DEFAULT_DATA.subheading;

        component.addAttributes({
            "data-hero-pages-config": JSON.stringify(data),
        });
        component.components(buildHeroPagesHTML(data));
        close();
    });
}

const iconHeroPages = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="6" width="9" height="20" rx="1.5" fill="#003B71" fill-opacity="0.2" stroke="#003B71" stroke-width="0.8"/>
    <rect x="12.5" y="6" width="9" height="20" rx="1.5" fill="#003B71" fill-opacity="0.3" stroke="#003B71" stroke-width="0.8"/>
    <rect x="23" y="6" width="7" height="20" rx="1.5" fill="#E97300" fill-opacity="0.35" stroke="#E97300" stroke-width="0.8"/>
    <circle cx="12" cy="29.5" r="1.2" fill="#003B71"/>
    <circle cx="16" cy="29.5" r="1.2" fill="#cbd5e1"/>
    <circle cx="20" cy="29.5" r="1.2" fill="#cbd5e1"/>
</svg>`;

export function initializeHeroPagesBlock(editor) {
    const componentType = "hero-pages-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Tarjetas por Páginas",
                tagName: "div",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                stylable: false,
                resizable: false,
                layerable: true,
                propagate: [
                    "editable",
                    "selectable",
                    "hoverable",
                    "droppable",
                    "highlightable",
                    "stylable",
                    "resizable",
                ],
                attributes: {
                    "data-gjs-type": componentType,
                    "data-hero-pages-config": JSON.stringify(DEFAULT_DATA),
                },
                components:
                    buildHeroPagesHTML(DEFAULT_DATA) + `<style>${HP_CSS}</style>`,
                traits: [
                    {
                        type: "button",
                        label: "Tarjetas por Páginas",
                        text: "Administrar Tarjetas",
                        full: true,
                        command: "open-hero-pages-config",
                    },
                ],
            },
            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-hero-pages-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showHeroPagesModal(ed, selected);
        },
    });

    editor.BlockManager.add("hero-pages-block", {
        label: "Tarjetas por Páginas",
        category: "Productos y Servicios",
        media: iconHeroPages,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    injectHeroPagesEditorStyles(editor, componentType);

    editor.on("component:selected", (selected) => {
        if (!selected || selected.__hpRedirecting) return;
        const el = selected.getEl?.();
        if (!el) return;
        if (el.getAttribute?.("data-gjs-type") === componentType) return;
        const rootEl = el.closest(`[data-gjs-type="${componentType}"]`);
        if (!rootEl) return;
        const rootModel = editor
            .getWrapper()
            .find(`[data-gjs-type="${componentType}"]`)
            .find((c) => c.getEl() === rootEl);
        if (rootModel && rootModel !== selected) {
            rootModel.__hpRedirecting = true;
            editor.select(rootModel);
            setTimeout(() => {
                delete rootModel.__hpRedirecting;
            }, 0);
        }
    });
}

function injectHeroPagesEditorStyles(editor, componentType) {
    const inject = () => {
        const iframe = editor.Canvas.getFrameEl();
        const head = iframe?.contentDocument?.head;
        if (!head || head.querySelector(`#${componentType}-editor-css`)) return;
        const style = iframe.contentDocument.createElement("style");
        style.id = `${componentType}-editor-css`;
        style.textContent = `
            [data-gjs-type="${componentType}"] .swiper-wrapper{display:flex !important;gap:1.5rem;overflow:hidden;flex-wrap:nowrap;}
            [data-gjs-type="${componentType}"] .swiper-slide{flex:0 0 calc(33.333% - 1rem);max-width:calc(33.333% - 1rem);}
            [data-gjs-type="${componentType}"] .hp-dots{display:none;}
        `;
        head.appendChild(style);
    };

    editor.on("load", () => setTimeout(inject, 100));
    editor.on("storage:end:load", () => setTimeout(inject, 400));
    editor.on("canvas:frame:load", () => setTimeout(inject, 100));
}