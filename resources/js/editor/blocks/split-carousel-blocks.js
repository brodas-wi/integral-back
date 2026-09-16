import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

function responsiveStyleInjectorScript() {
    const el = this;
    const cssContent = el.getAttribute("data-css-content");
    if (!cssContent) return;
    const doc = el.ownerDocument;
    const styleId = "sc-responsive-" + el.id;
    if (doc.getElementById(styleId)) return;
    const styleTag = doc.createElement("style");
    styleTag.id = styleId;
    styleTag.textContent = cssContent;
    doc.head.appendChild(styleTag);
}

const SC_CSS = `
.sc-section{width:100%;max-width:1600px;margin:0 auto;padding:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;overflow:visible;}
.sc-layout{display:flex;flex-wrap:wrap;gap:clamp(1.5rem,3vw,2.5rem);align-items:center;width:100%;}
.sc-text-col{flex:1 1 280px;min-width:220px;max-width:100%;display:flex;flex-direction:column;justify-content:center;gap:0.75rem;box-sizing:border-box;}
.sc-heading{margin:0;color:#E97300;font-weight:900;font-size:clamp(1.5rem,3vw,2.25rem);line-height:1.15;}
.sc-subheading{margin:0;color:#003B71;font-weight:500;font-size:clamp(1rem,1.8vw,1.375rem);line-height:1.5;}
.sc-carousel-col{flex:2 1 480px;min-width:260px;width:100%;position:relative;box-sizing:border-box;}
.sc-swiper{overflow:hidden;width:100%;min-height:1px;}
.sc-swiper .swiper-wrapper{align-items:stretch;}
.sc-swiper .swiper-slide{height:auto;display:flex;justify-content:center;}
.sc-card{position:relative;width:100%;max-width:260px;aspect-ratio:13/18;border-radius:24px;overflow:hidden;background:#0a0a0a;margin:0 auto;}
.sc-card-media{position:absolute;inset:0;width:100%;height:100%;}
.sc-card-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.sc-card-video-wrap{position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 0.25s ease;overflow:hidden;border-radius:24px;}
.sc-card:hover .sc-card-video-wrap{opacity:1;}
.sc-card-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.sc-card-overlay{position:absolute;left:0.75rem;right:0.75rem;bottom:0.75rem;z-index:5;background:rgba(0,0,0,0.5);border-radius:12px;padding:0.75rem 0.875rem;}
.sc-card-title{margin:0 0 0.25rem;font-size:1rem;font-weight:800;line-height:1.2;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.35);}
.sc-card-desc{margin:0;font-size:0.8125rem;font-weight:500;color:#fff;line-height:1.4;text-shadow:0 1px 3px rgba(0,0,0,0.3);}
.sc-dots{position:relative !important;display:flex !important;justify-content:center;align-items:center;gap:0.625rem;margin-top:1.25rem;height:0.75rem;width:100%;}
.sc-dots .sc-dot{position:relative !important;width:0.75rem !important;height:0.75rem !important;border-radius:9999px !important;border:none !important;background:#cbd5e1 !important;cursor:pointer;padding:0 !important;margin:0 !important;transition:background 0.2s ease,transform 0.2s ease;opacity:1 !important;}
.sc-dots .sc-dot.active{background:#003B71 !important;transform:scale(1.1);}
.sc-nav-row{position:relative !important;display:flex;align-items:center;justify-content:center;gap:1.25rem;margin-top:1.5rem;}
.sc-nav{width:2.5rem;height:2.5rem;flex-shrink:0;border-radius:9999px;background:#E97300;border:none;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.125rem;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:background 0.2s ease,color 0.2s ease,opacity 0.2s ease;}
.sc-nav:hover{background:#c96200;}
.sc-nav.sc-nav-disabled{opacity:0.35;cursor:not-allowed;pointer-events:none;}
`;

function buildSplitCardHTML(card) {
    const image = card.image || assetUrl("images/placeholder.svg");
    const video = card.video || "";
    const title = card.title || "Título de la tarjeta";
    const desc = card.desc || "Descripción breve.";

    const videoHtml = video
        ? `<div class="sc-card-video-wrap"><video class="sc-card-video" src="${video}" muted loop playsinline autoplay preload="auto" disablepictureinpicture disableremoteplayback tabindex="-1" data-gjs-type="sc-video-media" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></video></div>`
        : "";

    return `<div class="swiper-slide"><div class="sc-card">
        <div class="sc-card-media">
            <img src="${image}" alt="${title}">
            ${videoHtml}
        </div>
        <div class="sc-card-overlay">
            <h3 class="sc-card-title">${title}</h3>
            <p class="sc-card-desc">${desc}</p>
        </div>
    </div></div>`;
}

function buildSplitCarouselHTML(data, uid) {
    uid = uid || "sc" + Math.random().toString(36).slice(2, 7);
    const cards = data.cards || [];
    const cardsHtml = cards.map(buildSplitCardHTML).join("");

    const responsiveCss = `@media(max-width:768px){#sc-root-${uid} .sc-text-col{align-items:center;text-align:center;}}`;

    return `<section id="sc-root-${uid}" class="sc-section">
        <div class="sc-layout">
            <div class="sc-text-col">
                <h2 class="sc-heading">${data.heading || "Título"}</h2>
                <p class="sc-subheading">${data.subheading || "Subtítulo descriptivo"}</p>
            </div>
            <div class="sc-carousel-col">
                <div class="sc-carousel">
                    <div class="sc-swiper swiper">
                        <div class="swiper-wrapper">${cardsHtml}</div>
                    </div>
                    <div class="sc-dots swiper-pagination"></div>
                    <div class="sc-nav-row">
                        <button type="button" class="sc-nav sc-nav-prev" aria-label="Anterior"><i class="ri-arrow-left-s-line"></i></button>
                        <button type="button" class="sc-nav sc-nav-next" aria-label="Siguiente"><i class="ri-arrow-right-s-line"></i></button>
                    </div>
                </div>
            </div>
        </div>
        <div data-gjs-type="sc-responsive-style" data-css-content="${responsiveCss.replace(/"/g, "&quot;")}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
    </section>`;
}

const DEFAULT_DATA = {
    heading: "Ahorros y Depósitos",
    subheading: "Ahorra con propósito para lograr tus sueños",
    cards: [
        {
            image: "",
            video: "",
            title: "Depósito a Plazo Fijo",
            desc: "Haz crecer tu inversión.",
        },
        {
            image: "",
            video: "",
            title: "Cuenta de Ahorro",
            desc: "El primer paso para hacer crecer tu negocio.",
        },
        {
            image: "",
            video: "",
            title: "Ahorro Programado",
            desc: "Tus metas hechas realidad.",
        },
    ],
};

function showSplitCarouselModal(editor, component) {
    const existing = document.getElementById("sc-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("sc-modal-styles")) {
        const style = document.createElement("style");
        style.id = "sc-modal-styles";
        style.textContent = `
            .sc-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .sc-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .sc-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .sc-modal-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
            .sc-modal-header h2 i{color:#003B71;}
            .sc-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
            .sc-modal-close:hover{background:#f1f5f9;color:#475569;}
            .sc-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
            .sc-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
            .sc-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .sc-tab-btn i{font-size:1rem;}
            .sc-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:0.75rem;background:#f8fafc;}
            .sc-tab-panel{display:none;flex-direction:column;gap:0.75rem;}
            .sc-tab-panel.active{display:flex;}
            .sc-config-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .sc-card-config-header{display:flex;align-items:center;gap:0.5rem;}
            .sc-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
            .sc-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .sc-input:focus{border-color:#003B71;}
            .sc-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;box-sizing:border-box;width:100%;}
            .sc-row{display:flex;gap:0.75rem;align-items:flex-start;}
            .sc-img-preview{width:64px;height:64px;border-radius:0.5rem;object-fit:cover;border:1px solid #e2e8f0;background:#f1f5f9;flex-shrink:0;}
            .sc-img-placeholder{width:64px;height:64px;border-radius:0.5rem;background:#f1f5f9;border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
            .sc-img-placeholder i{font-size:1.5rem;color:#94a3b8;}
            .sc-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:9999px;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .sc-pick-btn:hover{background:#002a52;}
            .sc-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.375rem;display:flex;align-items:center;justify-content:center;border-radius:9999px;transition:background 0.15s;}
            .sc-btn-remove:hover{background:#fef2f2;}
            .sc-btn-add{padding:0.5rem 1.25rem;border:none;border-radius:9999px;color:#fff;font-size:0.8125rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;background:#003B71;}
            .sc-btn-add:hover{background:#002a52;}
            .sc-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .sc-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;}
            .sc-btn-cancel:hover{background:#f8fafc;}
            .sc-btn-save{padding:0.5rem 1.25rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .sc-btn-save:hover{background:#c96200;}
            .sc-card-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
            .sc-btn-backup{padding:0.5rem 1rem;background:#fff;border:2px solid #003B71;border-radius:9999px;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;}
            .sc-btn-backup:hover{background:#003B71;color:#fff;}
            .sc-btn-restore{padding:0.5rem 1rem;background:#fff;border:2px solid #0d9488;border-radius:9999px;color:#0d9488;font-size:0.8125rem;font-weight:600;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;user-select:none;cursor:pointer;}
            .sc-btn-restore:hover{background:#0d9488;color:#fff;}
            .sc-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
            .sc-confirm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
            .sc-confirm-header{padding:1rem 1.25rem 0.75rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
            .sc-confirm-header i{font-size:1.25rem;color:#E97300;}
            .sc-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
            .sc-confirm-body{padding:1rem 1.25rem;}
            .sc-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
            .sc-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;background:#f1f5f9;border-radius:0.375rem;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
            .sc-confirm-footer{padding:0.75rem 1.25rem 1rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
            .sc-confirm-cancel{padding:0.5rem 1.125rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .sc-confirm-cancel:hover{background:#f1f5f9;}
            .sc-confirm-ok{padding:0.5rem 1.125rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .sc-confirm-ok:hover{background:#d97821;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-split-carousel-config"] || "{}",
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
    overlay.id = "sc-config-modal";
    overlay.className = "sc-overlay";

    const modal = document.createElement("div");
    modal.className = "sc-modal";
    modal.innerHTML = `
        <div class="sc-modal-header">
            <h2><i class="ri-gallery-line"></i> Configurar Sección con Carrusel</h2>
            <button id="sc-modal-close" class="sc-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="sc-modal-tabs">
            <button class="sc-tab-btn active" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
            <button class="sc-tab-btn" data-tab="cards"><i class="ri-layout-grid-line"></i> Tarjetas</button>
        </div>
        <div class="sc-modal-body">
            <div class="sc-tab-panel active" id="sc-panel-general">
                <div class="sc-config-card">
                    <div>
                        <label class="sc-label">Título</label>
                        <input id="sc-heading" type="text" class="sc-input" value="${data.heading}">
                    </div>
                    <div>
                        <label class="sc-label">Subtítulo</label>
                        <input id="sc-subheading" type="text" class="sc-input" value="${data.subheading}">
                    </div>
                </div>
            </div>
            <div class="sc-tab-panel" id="sc-panel-cards">
                <div id="sc-cards-list" style="display:flex;flex-direction:column;gap:0.75rem;"></div>
                <button id="sc-add-card" class="sc-btn-add" style="align-self:flex-start;">
                    <i class="ri-add-line"></i> Agregar tarjeta
                </button>
            </div>
        </div>
        <div class="sc-modal-footer">
            <button id="sc-modal-cancel" class="sc-btn-cancel">Cancelar</button>
            <div style="display:flex;gap:0.5rem;margin-right:auto;">
                <button id="sc-modal-backup" class="sc-btn-backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <label id="sc-modal-restore-label" class="sc-btn-restore" title="Restaurar configuración desde JSON"><i class="ri-upload-2-line"></i> Restaurar<input id="sc-modal-restore-input" type="file" accept=".json,application/json" style="display:none;"></label>
            </div>
            <button id="sc-modal-save" class="sc-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelectorAll(".sc-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".sc-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".sc-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#sc-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    function renderCards() {
        const list = modal.querySelector("#sc-cards-list");
        list.innerHTML = "";
        data.cards.forEach((card, idx) => {
            const div = document.createElement("div");
            div.className = "sc-config-card";
            const imgHtml = card.image
                ? `<img class="sc-img-preview" src="${card.image}" alt="">`
                : `<div class="sc-img-placeholder"><i class="ri-image-line"></i></div>`;
            div.innerHTML = `
                <div class="sc-card-config-header">
                    <span class="sc-card-num">${idx + 1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${idx + 1}</span>
                    <button class="sc-btn-remove sc-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="sc-row">
                    <div id="sc-img-wrap-${idx}">${imgHtml}</div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                        <label class="sc-label">Imagen de fondo</label>
                        <input class="sc-input-sm" placeholder="URL de la imagen" value="${card.image || ""}" data-field="image">
                        <button class="sc-pick-btn sc-pick-img"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="sc-label">Video en hover (opcional)</label>
                    <div style="display:flex;flex-direction:column;gap:0.5rem;">
                        <input class="sc-input-sm" placeholder="URL del video (mp4 o webm)" value="${card.video || ""}" data-field="video">
                        <button class="sc-pick-btn sc-pick-video"><i class="ri-video-line"></i> Seleccionar video</button>
                    </div>
                </div>
                <div>
                    <label class="sc-label">Título</label>
                    <input class="sc-input" placeholder="Título de la tarjeta" value="${card.title || ""}" data-field="title">
                </div>
                <div>
                    <label class="sc-label">Descripción</label>
                    <input class="sc-input" placeholder="Descripción breve" value="${card.desc || ""}" data-field="desc">
                </div>`;

            div.querySelectorAll("[data-field]").forEach((input) => {
                input.addEventListener("input", () => {
                    card[input.dataset.field] = input.value;
                    if (input.dataset.field === "image") {
                        const wrap = div.querySelector(`#sc-img-wrap-${idx}`);
                        wrap.innerHTML = input.value
                            ? `<img class="sc-img-preview" src="${input.value}" alt="">`
                            : `<div class="sc-img-placeholder"><i class="ri-image-line"></i></div>`;
                    }
                });
            });

            div.querySelector(".sc-pick-img").addEventListener("click", () => {
                openMediaPicker({
                    type: "image",
                    title: "Seleccionar imagen de tarjeta",
                    onSelect: (url) => {
                        card.image = url;
                        div.querySelector("[data-field='image']").value = url;
                        div.querySelector(`#sc-img-wrap-${idx}`).innerHTML =
                            `<img class="sc-img-preview" src="${url}" alt="">`;
                    },
                });
            });

            div.querySelector(".sc-pick-video").addEventListener("click", () => {
                openMediaPicker({
                    type: "video",
                    title: "Seleccionar video de tarjeta",
                    onSelect: (url) => {
                        card.video = url;
                        div.querySelector("[data-field='video']").value = url;
                    },
                });
            });

            div.querySelector(".sc-remove-card").addEventListener(
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

    modal.querySelector("#sc-add-card").addEventListener("click", () => {
        data.cards.push({
            image: "",
            video: "",
            title: "Nueva tarjeta",
            desc: "Descripción de la tarjeta.",
        });
        renderCards();
        modal.querySelector("#sc-cards-list").lastElementChild?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    });

    modal.querySelector("#sc-modal-backup").addEventListener("click", () => {
        const snapshot = {
            heading:
                modal.querySelector("#sc-heading").value.trim() ||
                DEFAULT_DATA.heading,
            subheading:
                modal.querySelector("#sc-subheading").value.trim() ||
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
        a.download = `split-carousel-backup-${ts}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });

    modal.querySelector("#sc-modal-restore-input").addEventListener(
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
                    errOverlay.className = "sc-confirm-overlay";
                    errOverlay.innerHTML = `<div class="sc-confirm-modal"><div class="sc-confirm-header"><i class="ri-error-warning-line" style="color:#ef4444;"></i><h3>Archivo inválido</h3></div><div class="sc-confirm-body"><p>El archivo seleccionado no es un JSON válido.</p></div><div class="sc-confirm-footer"><button class="sc-confirm-ok" style="background:#ef4444;">Cerrar</button></div></div>`;
                    document.body.appendChild(errOverlay);
                    errOverlay.querySelector(".sc-confirm-ok").onclick = () =>
                        errOverlay.remove();
                    e.target.value = "";
                    return;
                }
                const confirmOverlay = document.createElement("div");
                confirmOverlay.className = "sc-confirm-overlay";
                confirmOverlay.innerHTML = `
                    <div class="sc-confirm-modal">
                        <div class="sc-confirm-header">
                            <i class="ri-refresh-line"></i>
                            <h3>Restaurar configuración</h3>
                        </div>
                        <div class="sc-confirm-body">
                            <p>¿Deseas restaurar la configuración de esta sección desde el archivo de respaldo?</p>
                            <p>Esta acción reemplazará la configuración actual del formulario.</p>
                            <span class="sc-confirm-filename"><i class="ri-file-code-line"></i>${file.name}</span>
                        </div>
                        <div class="sc-confirm-footer">
                            <button class="sc-confirm-cancel">Cancelar</button>
                            <button class="sc-confirm-ok"><i class="ri-check-line"></i> Sí, restaurar</button>
                        </div>
                    </div>`;
                document.body.appendChild(confirmOverlay);
                confirmOverlay.querySelector(".sc-confirm-cancel").onclick = () => {
                    confirmOverlay.remove();
                    e.target.value = "";
                };
                confirmOverlay.querySelector(".sc-confirm-ok").onclick = () => {
                    confirmOverlay.remove();
                    e.target.value = "";
                    const restored = {
                        heading: parsed.heading ?? DEFAULT_DATA.heading,
                        subheading: parsed.subheading ?? DEFAULT_DATA.subheading,
                        cards: JSON.parse(
                            JSON.stringify(parsed.cards ?? DEFAULT_DATA.cards),
                        ),
                    };
                    const existingInner = component
                        .getEl()
                        ?.querySelector("[id^='sc-root-']");
                    const uid =
                        existingInner?.id?.replace("sc-root-", "") ||
                        "sc" + Math.random().toString(36).slice(2, 7);
                    component.addAttributes({
                        "data-split-carousel-config": JSON.stringify(restored),
                    });
                    component.components(
                        buildSplitCarouselHTML(restored, uid) +
                        `<style>${SC_CSS}</style>`,
                    );
                    overlay.remove();
                    showSplitCarouselModal(editor, component);
                };
            };
            reader.readAsText(file);
        },
    );

    const close = () => overlay.remove();
    modal.querySelector("#sc-modal-close").addEventListener("click", close);
    modal.querySelector("#sc-modal-cancel").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    modal.querySelector("#sc-modal-save").addEventListener("click", () => {
        data.heading =
            modal.querySelector("#sc-heading").value.trim() ||
            DEFAULT_DATA.heading;
        data.subheading =
            modal.querySelector("#sc-subheading").value.trim() ||
            DEFAULT_DATA.subheading;

        const existingInner = component
            .getEl()
            ?.querySelector("[id^='sc-root-']");
        const uid =
            existingInner?.id?.replace("sc-root-", "") ||
            "sc" + Math.random().toString(36).slice(2, 7);

        const el = component.getEl();
        if (el) {
            el.querySelectorAll("style").forEach((s) => s.remove());
            const oldStyleId = existingInner
                ? "sc-responsive-" + existingInner.id
                : null;
            if (oldStyleId) {
                const doc = el.ownerDocument;
                const oldTag = doc.getElementById(oldStyleId);
                if (oldTag) oldTag.remove();
            }
        }

        component.addAttributes({
            "data-split-carousel-config": JSON.stringify(data),
        });
        component.components(
            buildSplitCarouselHTML(data, uid) + `<style>${SC_CSS}</style>`,
        );
        close();
    });
}

const iconSplitCarousel = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="8" width="9" height="16" rx="1" fill="#003B71" fill-opacity="0.15" stroke="#003B71" stroke-width="0.8"/>
    <rect x="14" y="6" width="6" height="20" rx="1.5" fill="#E97300" fill-opacity="0.3" stroke="#E97300" stroke-width="0.8"/>
    <rect x="22" y="6" width="6" height="20" rx="1.5" fill="#E97300" fill-opacity="0.2" stroke="#E97300" stroke-width="0.8"/>
</svg>`;

export function initializeSplitCarouselBlock(editor) {
    const componentType = "split-carousel-component";

    editor.DomComponents.addType("sc-responsive-style", {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === "sc-responsive-style"
                ? { type: "sc-responsive-style" }
                : false,
        model: {
            defaults: {
                tagName: "div",
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                selectable: false,
                hoverable: false,
                editable: false,
                highlightable: false,
                traits: [],
                script: responsiveStyleInjectorScript,
            },
        },
    });

    editor.DomComponents.addType("sc-video-media", {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === "sc-video-media"
                ? { type: "sc-video-media" }
                : false,
        model: {
            defaults: {
                tagName: "video",
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                selectable: false,
                hoverable: false,
                editable: false,
                highlightable: false,
                traits: [],
            },
        },
    });

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Sección con Carrusel",
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
                    "data-split-carousel-config": JSON.stringify(DEFAULT_DATA),
                },
                components:
                    buildSplitCarouselHTML(DEFAULT_DATA, "default") +
                    `<style>${SC_CSS}</style>`,
                traits: [
                    {
                        type: "button",
                        label: "Sección con Carrusel",
                        text: "Administrar Sección",
                        full: true,
                        command: "open-split-carousel-config",
                    },
                ],
            },
            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-split-carousel-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showSplitCarouselModal(ed, selected);
        },
    });

    editor.BlockManager.add("split-carousel-block", {
        label: "Sección con Carrusel",
        category: "Productos y Servicios",
        media: iconSplitCarousel,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    editor.on("component:selected", (selected) => {
        if (!selected || selected.__scRedirecting) return;
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
            rootModel.__scRedirecting = true;
            editor.select(rootModel);
            setTimeout(() => {
                delete rootModel.__scRedirecting;
            }, 0);
        }
    });

    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        const head = iframe?.contentDocument?.head;
        if (!head || head.querySelector(`#${componentType}-editor-css`)) return;
        const style = iframe.contentDocument.createElement("style");
        style.id = `${componentType}-editor-css`;
        style.textContent = `
            [data-gjs-type="${componentType}"] .sc-layout{align-items:flex-start !important;}
            [data-gjs-type="${componentType}"] .sc-carousel-col{flex-basis:100% !important;}
            [data-gjs-type="${componentType}"] .sc-swiper .swiper-wrapper{display:flex !important;flex-wrap:nowrap !important;gap:1rem;overflow-x:auto;}
            [data-gjs-type="${componentType}"] .sc-swiper .swiper-slide{flex:0 0 180px !important;width:180px !important;}
            [data-gjs-type="${componentType}"] .sc-card{width:180px !important;max-width:180px !important;height:250px !important;}
            [data-gjs-type="${componentType}"] .sc-dots{display:none !important;}
            [data-gjs-type="${componentType}"] video{display:none !important;}
        `;
        head.appendChild(style);
    });
}