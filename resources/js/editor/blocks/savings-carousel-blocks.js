import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

const SAVINGS_CAROUSEL_SCRIPT = function () {
    (function () {
        function initCarousel(section) {
            if (!section || section.__savInit) return;
            section.__savInit = true;
            var wrap = section.querySelector(".sav-carousel-wrap");
            if (!wrap) return;

            wrap.scrollLeft = 0;

            var isDragging = false;
            var startX = 0;
            var startScrollLeft = 0;
            var moved = false;
            var velX = 0;
            var lastX = 0;
            var lastT = 0;
            var rafId = null;

            wrap.querySelectorAll("img").forEach(function (img) {
                img.setAttribute("draggable", "false");
            });

            setTimeout(function () {
                var hint = wrap.scrollWidth - wrap.clientWidth;
                if (hint <= 0) return;
                var peak = Math.min(80, hint);
                var start = null;
                function animateHint(ts) {
                    if (!start) start = ts;
                    var p = (ts - start) / 900;
                    if (p < 0.5) {
                        wrap.scrollLeft = peak * (p * 2);
                    } else if (p < 1) {
                        wrap.scrollLeft = peak * (1 - (p - 0.5) * 2);
                    } else {
                        wrap.scrollLeft = 0;
                        return;
                    }
                    requestAnimationFrame(animateHint);
                }
                requestAnimationFrame(animateHint);
            }, 600);

            function maxScroll() {
                return wrap.scrollWidth - wrap.clientWidth;
            }

            function clamp(val) {
                return Math.max(0, Math.min(val, maxScroll()));
            }

            function applyMomentum() {
                if (Math.abs(velX) < 0.5) return;
                velX *= 0.92;
                wrap.scrollLeft = clamp(wrap.scrollLeft + velX);
                rafId = requestAnimationFrame(applyMomentum);
            }

            wrap.addEventListener("mousedown", function (e) {
                if (e.button !== 0) return;
                if (rafId) {
                    cancelAnimationFrame(rafId);
                    rafId = null;
                }
                isDragging = true;
                moved = false;
                velX = 0;
                startX = e.clientX;
                lastX = e.clientX;
                lastT = Date.now();
                startScrollLeft = wrap.scrollLeft;
                wrap.style.cursor = "grabbing";
                e.preventDefault();
            });

            document.addEventListener("mousemove", function (e) {
                if (!isDragging) return;
                var delta = startX - e.clientX;
                if (Math.abs(delta) > 3) moved = true;
                var now = Date.now();
                var dt = now - lastT || 1;
                velX = ((e.clientX - lastX) / dt) * 16 * -1;
                lastX = e.clientX;
                lastT = now;
                wrap.scrollLeft = clamp(startScrollLeft + delta);
            });

            document.addEventListener("mouseup", function (e) {
                if (!isDragging) return;
                isDragging = false;
                wrap.style.cursor = "grab";
                if (moved) {
                    e.stopPropagation();
                    rafId = requestAnimationFrame(applyMomentum);
                }
            });

            wrap.addEventListener(
                "click",
                function (e) {
                    if (moved) {
                        e.preventDefault();
                        e.stopPropagation();
                        moved = false;
                    }
                },
                true,
            );

            var touchStartX = 0;
            var touchStartScroll = 0;
            var touchLastX = 0;
            var touchLastT = 0;
            var touchVelX = 0;

            wrap.addEventListener(
                "touchstart",
                function (e) {
                    if (rafId) {
                        cancelAnimationFrame(rafId);
                        rafId = null;
                    }
                    touchStartX = e.touches[0].clientX;
                    touchLastX = e.touches[0].clientX;
                    touchLastT = Date.now();
                    touchStartScroll = wrap.scrollLeft;
                    touchVelX = 0;
                },
                { passive: true },
            );

            wrap.addEventListener(
                "touchmove",
                function (e) {
                    var now = Date.now();
                    var dt = now - touchLastT || 1;
                    var cx = e.touches[0].clientX;
                    touchVelX = ((cx - touchLastX) / dt) * 16 * -1;
                    touchLastX = cx;
                    touchLastT = now;
                    var delta = touchStartX - cx;
                    wrap.scrollLeft = clamp(touchStartScroll + delta);
                },
                { passive: true },
            );

            wrap.addEventListener(
                "touchend",
                function () {
                    rafId = requestAnimationFrame(function momentum() {
                        if (Math.abs(touchVelX) < 0.5) return;
                        touchVelX *= 0.92;
                        wrap.scrollLeft = clamp(wrap.scrollLeft + touchVelX);
                        rafId = requestAnimationFrame(momentum);
                    });
                },
                { passive: true },
            );
        }

        function init() {
            document.querySelectorAll(".sav-section").forEach(function (s) {
                delete s.__savInit;
                initCarousel(s);
            });
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", init);
        } else {
            init();
        }
    })();
};
const SAVINGS_RUNTIME_SCRIPT = `(${SAVINGS_CAROUSEL_SCRIPT.toString()})();`;

const SAVINGS_CSS = `
.sav-section{width:100%;background:#ffffff;padding:3rem 4rem;display:flex;flex-direction:column;gap:2rem;}
.sav-heading{font-size:2.25rem;font-weight:800;color:#003B71;margin:0;text-align:center;}
.sav-subheading{font-size:1rem;color:#003B71;margin:0;text-align:center;}
.sav-blue-box{background:#003B71;border-radius:1.5rem;padding:2rem;position:relative;overflow:hidden;display:flex;flex-direction:column;gap:1.5rem;}
.sav-watermark{position:absolute;bottom:-32px;right:-32px;width:280px;height:280px;opacity:0.07;pointer-events:none;user-select:none;}
.sav-watermark img{width:100%;height:100%;object-fit:contain;}
.sav-carousel-wrap{overflow-x:scroll;width:100%;cursor:grab;scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;position:relative;z-index:1;}
.sav-carousel-wrap::-webkit-scrollbar{display:none;}
.sav-track{display:flex;gap:1.5rem;user-select:none;}
.sav-card{flex:0 0 240px;display:flex;flex-direction:column;align-items:center;gap:1rem;background:transparent;border:2px solid #ffffff;border-radius:1rem;padding:1.25rem;box-sizing:border-box;}
.sav-card-img-wrap{width:100%;aspect-ratio:1/1;border-radius:0.75rem;overflow:hidden;background:rgba(255,255,255,0.15);}
.sav-card-img{width:100%;height:100%;object-fit:cover;display:block;}
.sav-card-title{font-size:0.95rem;font-weight:700;color:#ffffff;text-transform:uppercase;text-align:center;}
.sav-card-desc{font-size:0.85rem;color:rgba(255,255,255,0.85);text-align:center;line-height:1.5;margin:0;}
.sav-btn{display:block;width:100%;padding:0.5rem 1rem;border-radius:9999px;background:#ffffff;color:#003B71;font-size:0.95rem;font-weight:600;text-align:center;text-decoration:none;transition:background .2s;margin-top:auto;}
.sav-btn:hover{background:#dce8f5;}
.sav-more-wrap{display:flex;justify-content:center;position:relative;z-index:1;}
.sav-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:9999px;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background .2s;}
.sav-more-btn:hover{background:#c96200;}
@media(max-width:1280px){.sav-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.sav-section{padding:2.5rem 1.5rem;}.sav-card{flex:0 0 200px;}.sav-blue-box{padding:1.5rem;}}
@media(max-width:480px){.sav-card{flex:0 0 75vw;}}`;

function buildSavingsCardHTML(card) {
    const img = card.img || assetUrl("images/placeholder.svg");
    const title = card.title || "TÍTULO DEL PRODUCTO";
    const desc = card.desc ? `<p class="sav-card-desc">${card.desc}</p>` : "";
    const href = card.href || "#";
    const btnLabel = card.btn_label || "Solicitar";
    return `<div class="sav-card"><div class="sav-card-img-wrap"><img src="${img}" alt="${title}" class="sav-card-img"></div><h3 class="sav-card-title">${title}</h3>${desc}<a href="${href}" class="sav-btn">${btnLabel}</a></div>`;
}

function buildSavingsSectionHTML(data) {
    const heading = data.heading || "Depósitos y Cuentas de Ahorro";
    const subheading =
        data.subheading ||
        "Productos diseñados para hacer crecer tu dinero de forma segura.";
    const moreHref = data.more_href || "#";
    const moreLabel = data.more_label || "Ver más";
    const cards = data.cards || [];
    const cardsHTML = cards.map(buildSavingsCardHTML).join("");
    const watermark = assetUrl("images/brand-watermark.png");
    return `<section class="sav-section"><style>${SAVINGS_CSS}</style><div style="display:flex;flex-direction:column;gap:0.5rem;text-align:center;"><h2 class="sav-heading">${heading}</h2><p class="sav-subheading">${subheading}</p></div><div class="sav-blue-box"><div class="sav-watermark"><img src="${watermark}" alt=""></div><div class="sav-carousel-wrap"><div class="sav-track">${cardsHTML}</div></div><div class="sav-more-wrap"><a href="${moreHref}" class="sav-more-btn">${moreLabel}</a></div></div></section>`;
}

const DEFAULT_DATA = {
    heading: "Depósitos y Cuentas de Ahorro",
    subheading:
        "Productos diseñados para hacer crecer tu dinero de forma segura.",
    more_href: "#",
    more_label: "Ver más",
    cards: [
        {
            img: "",
            title: "CUENTA DE AHORRO ESTÁNDAR",
            href: "#",
            btn_label: "Solicitar",
        },
        {
            img: "",
            title: "AHORRO RENTABLE",
            href: "#",
            btn_label: "Solicitar",
        },
        {
            img: "",
            title: "CUENTA DE AHORRO MÁS",
            href: "#",
            btn_label: "Solicitar",
        },
        {
            img: "",
            title: "DEPÓSITO DE PLAZO FIJO",
            href: "#",
            btn_label: "Solicitar",
        },
    ],
};

function showSavingsModal(editor, component) {
    const existing = document.getElementById("sav-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("sav-modal-styles")) {
        const style = document.createElement("style");
        style.id = "sav-modal-styles";
        style.textContent = `
            .sav-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .sav-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .sav-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .sav-modal-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
            .sav-modal-header h2 i{color:#003B71;}
            .sav-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
            .sav-modal-close:hover{background:#f1f5f9;color:#475569;}
            .sav-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
            .sav-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
            .sav-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .sav-tab-btn i{font-size:1rem;}
            .sav-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .sav-modal-body::-webkit-scrollbar{width:5px;}
            .sav-modal-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
            .sav-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .sav-tab-panel.active{display:flex;}
            .sav-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
            .sav-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .sav-input:focus{border-color:#003B71;}
            .sav-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;box-sizing:border-box;width:100%;}
            .sav-row{display:flex;gap:0.75rem;align-items:flex-start;}
            .sav-img-preview{width:64px;height:64px;border-radius:0.5rem;object-fit:cover;border:1px solid #e2e8f0;background:#f1f5f9;flex-shrink:0;}
            .sav-img-placeholder{width:64px;height:64px;border-radius:0.5rem;background:#f1f5f9;border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
            .sav-img-placeholder i{font-size:1.5rem;color:#94a3b8;}
            .sav-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:9999px;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .sav-pick-btn:hover{background:#002a52;}
            .sav-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;display:flex;align-items:center;border-radius:0.25rem;transition:background 0.15s;}
            .sav-btn-remove:hover{background:#fef2f2;}
            .sav-btn-add{padding:0.5rem 1.25rem;border:none;border-radius:9999px;color:#fff;font-size:0.8125rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;background:#003B71;}
            .sav-btn-add:hover{background:#002a52;}
            .sav-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .sav-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;}
            .sav-btn-cancel:hover{background:#f8fafc;}
            .sav-btn-save{padding:0.5rem 1.25rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .sav-btn-save:hover{background:#c96200;}
            .sav-section-title{font-size:0.75rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0;border-bottom:1px solid #e2e8f0;margin-bottom:0.75rem;}
            .sav-card-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
            .sav-config-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .sav-card-config{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .sav-card-config-header{display:flex;align-items:center;gap:0.5rem;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-savings-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const data = {
        heading: currentData.heading ?? DEFAULT_DATA.heading,
        subheading: currentData.subheading ?? DEFAULT_DATA.subheading,
        more_href: currentData.more_href ?? DEFAULT_DATA.more_href,
        more_label: currentData.more_label ?? DEFAULT_DATA.more_label,
        cards: JSON.parse(
            JSON.stringify(currentData.cards ?? DEFAULT_DATA.cards),
        ),
    };

    const overlay = document.createElement("div");
    overlay.id = "sav-config-modal";
    overlay.className = "sav-overlay";

    const modal = document.createElement("div");
    modal.className = "sav-modal";
    modal.innerHTML = `
        <div class="sav-modal-header">
            <h2><i class="ri-bank-line"></i> Configurar Sección de Productos</h2>
            <button id="sav-modal-close" class="sav-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="sav-modal-tabs">
            <button class="sav-tab-btn active" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
            <button class="sav-tab-btn" data-tab="cards"><i class="ri-bank-card-line"></i> Tarjetas</button>
        </div>
        <div class="sav-modal-body">
            <div class="sav-tab-panel active" id="sav-panel-general">
                <div class="sav-config-card">
                    <div class="sav-section-title">Encabezado</div>
                    <div>
                        <label class="sav-label">Título principal</label>
                        <input id="sav-heading" type="text" class="sav-input" value="${data.heading}">
                    </div>
                    <div>
                        <label class="sav-label">Subtítulo</label>
                        <input id="sav-subheading" type="text" class="sav-input" value="${data.subheading}">
                    </div>
                </div>
                <div class="sav-config-card">
                    <div class="sav-section-title">Botón Ver más</div>
                    <div>
                        <label class="sav-label">Texto del botón</label>
                        <input id="sav-more-label" type="text" class="sav-input" value="${data.more_label}">
                    </div>
                    <div>
                        <label class="sav-label">URL</label>
                        <input id="sav-more-href" type="text" class="sav-input" value="${data.more_href}">
                    </div>
                </div>
            </div>
            <div class="sav-tab-panel" id="sav-panel-cards">
                <div id="sav-cards-list" style="display:flex;flex-direction:column;gap:0.75rem;"></div>
                <button id="sav-add-card" class="sav-btn-add" style="align-self:flex-start;margin-top:0.25rem;">
                    <i class="ri-add-line"></i> Agregar tarjeta
                </button>
            </div>
        </div>
        <div class="sav-modal-footer">
            <button id="sav-modal-cancel" class="sav-btn-cancel">Cancelar</button>
            <button id="sav-modal-save" class="sav-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelectorAll(".sav-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".sav-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".sav-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#sav-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    function renderCards() {
        const list = modal.querySelector("#sav-cards-list");
        list.innerHTML = "";
        data.cards.forEach((card, idx) => {
            const div = document.createElement("div");
            div.className = "sav-card-config";
            const imgHtml = card.img
                ? `<img class="sav-img-preview" src="${card.img}" alt="">`
                : `<div class="sav-img-placeholder"><i class="ri-image-line"></i></div>`;
            div.innerHTML = `
                <div class="sav-card-config-header">
                    <span class="sav-card-num">${idx + 1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${idx + 1}</span>
                    <button class="sav-btn-remove sav-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="sav-row">
                    <div id="sav-img-wrap-${idx}">${imgHtml}</div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                        <input class="sav-input-sm" placeholder="URL de la imagen" value="${card.img || ""}" data-field="img">
                        <button class="sav-pick-btn sav-pick-img"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="sav-label">Título</label>
                    <input class="sav-input" placeholder="TÍTULO DEL PRODUCTO" value="${card.title || ""}" data-field="title">
                </div>
                <div>
                    <label class="sav-label">Descripción <span style="font-weight:400;text-transform:none;color:#94a3b8;">(opcional)</span></label>
                    <input class="sav-input" placeholder="Descripción breve del producto" value="${card.desc || ""}" data-field="desc">
                </div>
                <div class="sav-row">
                    <div style="flex:1;">
                        <label class="sav-label">URL del botón</label>
                        <input class="sav-input" placeholder="#" value="${card.href || "#"}" data-field="href">
                    </div>
                    <div style="flex:1;">
                        <label class="sav-label">Texto del botón</label>
                        <input class="sav-input" placeholder="Solicitar" value="${card.btn_label || "Solicitar"}" data-field="btn_label">
                    </div>
                </div>`;

            div.querySelectorAll("[data-field]").forEach((input) => {
                input.addEventListener("input", () => {
                    card[input.dataset.field] = input.value;
                    if (input.dataset.field === "img") {
                        const wrap = div.querySelector(`#sav-img-wrap-${idx}`);
                        wrap.innerHTML = input.value
                            ? `<img class="sav-img-preview" src="${input.value}" alt="">`
                            : `<div class="sav-img-placeholder"><i class="ri-image-line"></i></div>`;
                    }
                });
            });

            div.querySelector(".sav-pick-img").addEventListener("click", () => {
                openMediaPicker({
                    type: "image",
                    title: "Seleccionar imagen de tarjeta",
                    onSelect: (url) => {
                        card.img = url;
                        div.querySelector("[data-field='img']").value = url;
                        div.querySelector(`#sav-img-wrap-${idx}`).innerHTML =
                            `<img class="sav-img-preview" src="${url}" alt="">`;
                    },
                });
            });

            div.querySelector(".sav-remove-card").addEventListener(
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

    modal.querySelector("#sav-add-card").addEventListener("click", () => {
        data.cards.push({
            img: "",
            title: "NUEVO PRODUCTO",
            desc: "",
            href: "#",
            btn_label: "Solicitar",
        });
        renderCards();
        modal
            .querySelector("#sav-cards-list")
            .lastElementChild?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
    });

    const close = () => overlay.remove();
    modal.querySelector("#sav-modal-close").addEventListener("click", close);
    modal.querySelector("#sav-modal-cancel").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    modal.querySelector("#sav-modal-save").addEventListener("click", () => {
        data.heading =
            modal.querySelector("#sav-heading").value.trim() ||
            DEFAULT_DATA.heading;
        data.subheading =
            modal.querySelector("#sav-subheading").value.trim() ||
            DEFAULT_DATA.subheading;
        data.more_label =
            modal.querySelector("#sav-more-label").value.trim() ||
            DEFAULT_DATA.more_label;
        data.more_href =
            modal.querySelector("#sav-more-href").value.trim() || "#";
        component.addAttributes({
            "data-savings-config": JSON.stringify(data),
        });
        component.components(buildSavingsSectionHTML(data));
        setTimeout(() => reinitInCanvas(editor), 300);
        close();
    });
}

function reinitInCanvas(editor) {
    try {
        const iframeDoc = editor.Canvas.getFrameEl()?.contentDocument;
        if (!iframeDoc) return;
        const existing = iframeDoc.getElementById("sav-runtime-script");
        if (existing) existing.remove();
        iframeDoc.querySelectorAll(".sav-section").forEach((s) => {
            delete s.__savInit;
        });
        const scriptEl = iframeDoc.createElement("script");
        scriptEl.id = "sav-runtime-script";
        scriptEl.textContent = SAVINGS_RUNTIME_SCRIPT;
        iframeDoc.head.appendChild(scriptEl);
    } catch (e) {
        console.warn("[Savings] Error reiniciando carrusel:", e);
    }
}

const iconSavingsSection = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="5" width="28" height="22" fill="rgba(255,255,255,0.08)" rx="2"/>
    <rect x="4" y="8" width="6" height="6" fill="rgba(255,255,255,0.25)" rx="1"/>
    <rect x="12" y="8" width="6" height="6" fill="rgba(255,255,255,0.25)" rx="1"/>
    <rect x="20" y="8" width="6" height="6" fill="rgba(255,255,255,0.25)" rx="1"/>
    <rect x="4" y="16" width="6" height="1.5" fill="white" rx="0.75"/>
    <rect x="12" y="16" width="6" height="1.5" fill="white" rx="0.75"/>
    <rect x="20" y="16" width="6" height="1.5" fill="white" rx="0.75"/>
    <rect x="4" y="19" width="6" height="4" fill="#E97300" rx="1"/>
    <rect x="12" y="19" width="6" height="4" fill="#E97300" rx="1"/>
    <rect x="20" y="19" width="6" height="4" fill="#E97300" rx="1"/>
</svg>`;

export function initializeSavingsSectionBlock(editor) {
    const componentType = "savings-section-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,
        model: {
            defaults: {
                name: "Sección Fondo Azul",
                tagName: "div",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: {
                    "data-gjs-type": componentType,
                    "data-savings-config": JSON.stringify(DEFAULT_DATA),
                },
                components: buildSavingsSectionHTML(DEFAULT_DATA),
                script: SAVINGS_CAROUSEL_SCRIPT,
                "script-props": ["data-savings-config"],
                traits: [
                    {
                        type: "button",
                        label: "Sección",
                        text: "Administrar Sección",
                        full: true,
                        command: "open-savings-config",
                    },
                ],
                toolbar: [],
            },
            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-savings-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showSavingsModal(ed, selected);
        },
    });

    editor.BlockManager.add("savings-section-block", {
        label: "Sección Fondo Azul",
        category: "Productos y Servicios",
        media: iconSavingsSection,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    editor.on("component:mount", (comp) => {
        const el = comp.getEl();
        if (el?.getAttribute?.("data-gjs-type") === componentType) {
            comp.set("type", componentType);
            setTimeout(() => reinitInCanvas(editor), 400);
        }
    });

    editor.on("component:selected", (comp) => {
        const el = comp.getEl();
        if (!el) return;
        const root = el.closest(`[data-gjs-type="${componentType}"]`);
        if (root && !el.hasAttribute("data-gjs-type")) {
            const rootComp = editor
                .getWrapper()
                .find(`[data-gjs-type="${componentType}"]`)
                .find((c) => c.getEl() === root);
            if (rootComp) setTimeout(() => editor.select(rootComp), 0);
        }
    });

    editor.on("canvas:render", () =>
        setTimeout(() => reinitInCanvas(editor), 600),
    );
    editor.on("storage:end:load", () =>
        setTimeout(() => reinitInCanvas(editor), 800),
    );
}
