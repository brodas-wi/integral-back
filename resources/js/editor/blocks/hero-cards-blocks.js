import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

const HC_SCRIPT = function () {
    (function () {
        function resolveHref(raw) {
            if (!raw) return "#";
            return raw;
        }

        function initCard(card) {
            if (!card || card.__hcInit) return;
            card.__hcInit = true;

            var video = card.querySelector(".hc-card-video");
            var shield = card.querySelector(".hc-card-video-shield");
            if (!video) return;

            video.muted = true;
            video.volume = 0;

            var isTouch = window.matchMedia("(hover: none)").matches;
            var hoverTarget = shield || card;

            if (!isTouch) {
                hoverTarget.addEventListener("mouseenter", function () {
                    video.currentTime = 0;
                    video.play().catch(function () { });
                });
                hoverTarget.addEventListener("mouseleave", function () {
                    video.pause();
                    video.currentTime = 0;
                });
            } else {
                card.addEventListener("click", function (e) {
                    if (e.target.closest(".hc-card-btn")) return;
                    if (video.paused) {
                        video.currentTime = 0;
                        video.play().catch(function () { });
                    } else {
                        video.pause();
                        video.currentTime = 0;
                    }
                });
            }
        }

        function initCarousel(wrap) {
            if (!wrap || wrap.__hcCarouselInit) return;
            wrap.__hcCarouselInit = true;

            var track = wrap.querySelector(".hc-track");
            var prevBtn = wrap.querySelector(".hc-nav-prev");
            var nextBtn = wrap.querySelector(".hc-nav-next");
            var dotsWrap = wrap.querySelector(".hc-dots");
            if (!track) return;

            var cards = Array.prototype.slice.call(track.children);
            var currentIndex = 0;

            function cardsPerView() {
                var cardWidth = cards[0]?.offsetWidth || 1;
                var gap = 24;
                return Math.max(1, Math.floor((track.parentElement.offsetWidth + gap) / (cardWidth + gap)));
            }

            function maxIndex() {
                return Math.max(0, cards.length - cardsPerView());
            }

            function renderDots() {
                if (!dotsWrap) return;
                var totalDots = maxIndex() + 1;
                dotsWrap.innerHTML = "";
                if (totalDots <= 1) {
                    dotsWrap.style.display = "none";
                    return;
                }
                dotsWrap.style.display = "flex";
                for (var i = 0; i < totalDots; i++) {
                    var dot = document.createElement("button");
                    dot.type = "button";
                    dot.className = "hc-dot" + (i === currentIndex ? " active" : "");
                    dot.addEventListener("click", function (idx) {
                        return function () {
                            goTo(idx);
                        };
                    }(i));
                    dotsWrap.appendChild(dot);
                }
            }

            function updateNavState() {
                if (prevBtn) prevBtn.style.display = maxIndex() <= 0 ? "none" : "flex";
                if (nextBtn) nextBtn.style.display = maxIndex() <= 0 ? "none" : "flex";
                if (prevBtn) prevBtn.disabled = currentIndex <= 0;
                if (nextBtn) nextBtn.disabled = currentIndex >= maxIndex();
                if (dotsWrap) {
                    dotsWrap.querySelectorAll(".hc-dot").forEach(function (d, i) {
                        d.classList.toggle("active", i === currentIndex);
                    });
                }
            }

            function goTo(index) {
                var mi = maxIndex();
                currentIndex = Math.max(0, Math.min(index, mi));
                var cardWidth = cards[0]?.offsetWidth || 0;
                var gap = 24;
                var offset = currentIndex * (cardWidth + gap);
                track.style.transform = "translateX(-" + offset + "px)";
                updateNavState();
            }

            if (prevBtn) {
                prevBtn.addEventListener("click", function () {
                    goTo(currentIndex - 1);
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener("click", function () {
                    goTo(currentIndex + 1);
                });
            }

            function refresh() {
                renderDots();
                goTo(Math.min(currentIndex, maxIndex()));
            }

            refresh();
            window.addEventListener("resize", refresh);
        }

        function init() {
            document.querySelectorAll(".hc-carousel").forEach(function (w) {
                initCarousel(w);
            });
            document.querySelectorAll(".hc-card").forEach(function (c) {
                initCard(c);
            });
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", init);
        } else {
            init();
        }
    })();
};
const HC_RUNTIME_SCRIPT = `(${HC_SCRIPT.toString()})();`;

const HC_CSS = `
.hc-section{width:100%;background:#ffffff;padding:3rem 4rem;box-sizing:border-box;}
.hc-heading{font-size:2.25rem;font-weight:800;color:#E97300;margin:0;text-align:center;line-height:1.2;}
.hc-subheading{font-size:2.25rem;font-weight:500;color:#003B71;margin:0 0 2rem;text-align:center;line-height:1.2;}
.hc-carousel{position:relative;width:100%;}
.hc-track-wrap{overflow:hidden;width:100%;}
.hc-track{display:flex;gap:1.5rem;transition:transform 0.4s ease;will-change:transform;justify-content:center;}
.hc-card{position:relative;flex:0 0 calc(25% - 1.125rem);max-width:280px;aspect-ratio:9/14;border-radius:32px;overflow:hidden;cursor:pointer;background:#0a0a0a;}
.hc-card-media{position:absolute;inset:0;width:100%;height:100%;border-radius:32px;overflow:hidden;isolation:isolate;}
.hc-card-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.hc-card-video-wrap{position:absolute;inset:0;width:100%;height:100%;opacity:0;transition:opacity 0.25s ease;overflow:hidden;border-radius:32px;}
.hc-card:hover .hc-card-video-wrap{opacity:1;}
.hc-card-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;}
.hc-card-video-shield{position:absolute;inset:0;width:100%;height:100%;z-index:10;background:transparent;pointer-events:auto;}
.hc-card-video{pointer-events:none !important;}
.hc-card-overlay{position:absolute;left:0.75rem;right:0.75rem;bottom:3.5rem;z-index:5;background:rgba(0,0,0,0.5);border-radius:12px;padding:0.875rem 1rem;pointer-events:none;}
.hc-card-title{margin:0 0 0.25rem;font-size:1.0625rem;font-weight:900;line-height:1.2;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.35);}
.hc-card-desc{margin:0;font-size:0.8125rem;font-weight:500;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,0.35);line-height:1.4;}
.hc-card-btn{position:absolute;right:0.75rem;bottom:0.75rem;z-index:20;width:2.25rem;height:2.25rem;border-radius:9999px;background:#fff;display:flex;align-items:center;justify-content:center;color:#E97300;font-size:1.125rem;text-decoration:none;transition:background 0.2s ease,color 0.2s ease;pointer-events:auto;}
.hc-card-btn:hover{background:#E97300;color:#fff;}
.hc-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:10;width:2.75rem;height:2.75rem;border-radius:9999px;background:#fff;border:none;display:flex;align-items:center;justify-content:center;color:#E97300;font-size:1.25rem;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);transition:background 0.2s ease,color 0.2s ease;}
.hc-nav:hover{background:#E97300;color:#fff;}
.hc-nav:disabled{opacity:0.35;cursor:not-allowed;}
.hc-nav-prev{left:-1.375rem;}
.hc-nav-next{right:-1.375rem;}
.hc-dots{display:flex;justify-content:center;gap:0.625rem;margin-top:1.5rem;}
.hc-dot{width:0.75rem;height:0.75rem;border-radius:9999px;border:none;background:#cbd5e1;cursor:pointer;padding:0;transition:background 0.2s ease;}
.hc-dot.active{background:#003B71;}
@media(max-width:1280px){.hc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.hc-section{padding:2.5rem 1.5rem;}.hc-heading,.hc-subheading{font-size:1.875rem;}}
@media(max-width:992px){.hc-card{flex:0 0 calc(33.333% - 1rem);}}
@media(max-width:640px){.hc-card{flex:0 0 78vw;max-width:none;}.hc-nav-prev{left:0.25rem;}.hc-nav-next{right:0.25rem;}.hc-heading,.hc-subheading{font-size:1.5rem;}}
`;

function buildCardHTML(card, uid, idx) {
    const image = card.image || assetUrl("images/placeholder.svg");
    const video = card.video || "";
    const title = card.title || "Título de la tarjeta";
    const desc = card.desc || "Descripción breve de la tarjeta.";
    const href = card.href || "#";

    const videoHtml = video
        ? `<div class="hc-card-video-wrap" data-gjs-type="hc-video-media"><video class="hc-card-video" src="${video}" muted loop playsinline autoplay preload="auto" disablepictureinpicture disableremoteplayback tabindex="-1" data-gjs-type="hc-video-media"></video></div>`
        : "";

    return `<div class="hc-card" id="hc-card-${uid}-${idx}">
        <div class="hc-card-media">
            <img src="${image}" alt="${title}">
            ${videoHtml}
        </div>
        <div class="hc-card-overlay">
            <h3 class="hc-card-title">${title}</h3>
            <p class="hc-card-desc">${desc}</p>
        </div>
        <a href="${href}" class="hc-card-btn"><i class="ri-arrow-down-s-line"></i></a>
    </div>`;
}

function buildHeroCardsHTML(data, uid) {
    uid = uid || "hc" + Math.random().toString(36).slice(2, 7);
    const cards = data.cards || [];
    const cardsHtml = cards
        .map((card, idx) => buildCardHTML(card, uid, idx))
        .join("");

    return `<section class="hc-section" id="hc-root-${uid}">
        <h2 class="hc-heading">${data.heading || "Título"}</h2>
        <p class="hc-subheading">${data.subheading || "Subtítulo"}</p>
        <div class="hc-carousel">
            <button type="button" class="hc-nav hc-nav-prev" aria-label="Anterior"><i class="ri-arrow-left-s-line"></i></button>
            <div class="hc-track-wrap">
                <div class="hc-track">${cardsHtml}</div>
            </div>
            <button type="button" class="hc-nav hc-nav-next" aria-label="Siguiente"><i class="ri-arrow-right-s-line"></i></button>
        </div>
        <div class="hc-dots"></div>
    </section>`;
}

const DEFAULT_DATA = {
    heading: "Título",
    subheading: "Subtítulo descriptivo",
    cards: [
        {
            image: "",
            video: "",
            title: "Capital de trabajo",
            desc: "Respaldo financiero para tu negocio.",
            href: "#",
        },
        {
            image: "",
            video: "",
            title: "Inversión",
            desc: "La oportunidad que tu negocio necesita para crecer.",
            href: "#",
        },
        {
            image: "",
            video: "",
            title: "Vivienda",
            desc: "Realiza tu sueño de comprar o remodelar tu casa.",
            href: "#",
        },
    ],
};

function showHeroCardsModal(editor, component) {
    const existing = document.getElementById("hc-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("hc-modal-styles")) {
        const style = document.createElement("style");
        style.id = "hc-modal-styles";
        style.textContent = `
            .hc-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .hc-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .hc-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .hc-modal-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
            .hc-modal-header h2 i{color:#003B71;}
            .hc-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
            .hc-modal-close:hover{background:#f1f5f9;color:#475569;}
            .hc-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
            .hc-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
            .hc-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .hc-tab-btn i{font-size:1rem;}
            .hc-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .hc-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .hc-tab-panel.active{display:flex;}
            .hc-config-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .hc-card-config-header{display:flex;align-items:center;gap:0.5rem;}
            .hc-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
            .hc-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .hc-input:focus{border-color:#003B71;}
            .hc-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;box-sizing:border-box;width:100%;}
            .hc-row{display:flex;gap:0.75rem;align-items:flex-start;}
            .hc-img-preview{width:64px;height:64px;border-radius:0.5rem;object-fit:cover;border:1px solid #e2e8f0;background:#f1f5f9;flex-shrink:0;}
            .hc-img-placeholder{width:64px;height:64px;border-radius:0.5rem;background:#f1f5f9;border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
            .hc-img-placeholder i{font-size:1.5rem;color:#94a3b8;}
            .hc-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:9999px;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .hc-pick-btn:hover{background:#002a52;}
            .hc-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.375rem;display:flex;align-items:center;justify-content:center;border-radius:9999px;transition:background 0.15s;}
            .hc-btn-remove:hover{background:#fef2f2;}
            .hc-btn-add{padding:0.5rem 1.25rem;border:none;border-radius:9999px;color:#fff;font-size:0.8125rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;background:#003B71;}
            .hc-btn-add:hover{background:#002a52;}
            .hc-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .hc-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;}
            .hc-btn-cancel:hover{background:#f8fafc;}
                        .hc-btn-save{padding:0.5rem 1.25rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hc-btn-save:hover{background:#c96200;}
            .hc-card-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
            .hc-btn-backup{padding:0.5rem 1rem;background:#fff;border:2px solid #003B71;border-radius:9999px;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;}
            .hc-btn-backup:hover{background:#003B71;color:#fff;}
            .hc-btn-restore{padding:0.5rem 1rem;background:#fff;border:2px solid #0d9488;border-radius:9999px;color:#0d9488;font-size:0.8125rem;font-weight:600;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;user-select:none;}
            .hc-btn-restore:hover{background:#0d9488;color:#fff;}
            .hc-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
            .hc-confirm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
            .hc-confirm-header{padding:1rem 1.25rem 0.75rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
            .hc-confirm-header i{font-size:1.25rem;color:#E97300;}
            .hc-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
            .hc-confirm-body{padding:1rem 1.25rem;}
            .hc-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
            .hc-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;background:#f1f5f9;border-radius:0.375rem;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
            .hc-confirm-footer{padding:0.75rem 1.25rem 1rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
            .hc-confirm-cancel{padding:0.5rem 1.125rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hc-confirm-cancel:hover{background:#f1f5f9;}
            .hc-confirm-ok{padding:0.5rem 1.125rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hc-confirm-ok:hover{background:#d97821;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-hero-cards-config"] || "{}",
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
    overlay.id = "hc-config-modal";
    overlay.className = "hc-overlay";

    const modal = document.createElement("div");
    modal.className = "hc-modal";
    modal.innerHTML = `
        <div class="hc-modal-header">
            <h2><i class="ri-gallery-line"></i> Configurar Tarjetas Hero</h2>
            <button id="hc-modal-close" class="hc-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="hc-modal-tabs">
            <button class="hc-tab-btn active" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
            <button class="hc-tab-btn" data-tab="cards"><i class="ri-layout-grid-line"></i> Tarjetas</button>
        </div>
        <div class="hc-modal-body">
            <div class="hc-tab-panel active" id="hc-panel-general">
                <div class="hc-config-card">
                    <div>
                        <label class="hc-label">Título principal</label>
                        <input id="hc-heading" type="text" class="hc-input" value="${data.heading}">
                    </div>
                    <div>
                        <label class="hc-label">Subtítulo</label>
                        <input id="hc-subheading" type="text" class="hc-input" value="${data.subheading}">
                    </div>
                </div>
            </div>
            <div class="hc-tab-panel" id="hc-panel-cards">
                <div id="hc-cards-list" style="display:flex;flex-direction:column;gap:0.75rem;"></div>
                <button id="hc-add-card" class="hc-btn-add" style="align-self:flex-start;margin-top:0.25rem;">
                    <i class="ri-add-line"></i> Agregar tarjeta
                </button>
            </div>
        </div>
        <div class="hc-modal-footer">
            <button id="hc-modal-cancel" class="hc-btn-cancel">Cancelar</button>
            <div style="display:flex;gap:0.5rem;margin-right:auto;">
                <button id="hc-modal-backup" class="hc-btn-backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <label id="hc-modal-restore-label" class="hc-btn-restore" title="Restaurar configuración desde JSON" style="cursor:pointer;"><i class="ri-upload-2-line"></i> Restaurar<input id="hc-modal-restore-input" type="file" accept=".json,application/json" style="display:none;"></label>
            </div>
            <button id="hc-modal-save" class="hc-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelectorAll(".hc-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".hc-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".hc-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#hc-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    function renderCards() {
        const list = modal.querySelector("#hc-cards-list");
        list.innerHTML = "";
        data.cards.forEach((card, idx) => {
            const div = document.createElement("div");
            div.className = "hc-config-card";
            const imgHtml = card.image
                ? `<img class="hc-img-preview" src="${card.image}" alt="">`
                : `<div class="hc-img-placeholder"><i class="ri-image-line"></i></div>`;
            const videoLabel = card.video
                ? card.video.split("/").pop()
                : "Sin video seleccionado";
            div.innerHTML = `
                <div class="hc-card-config-header">
                    <span class="hc-card-num">${idx + 1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${idx + 1}</span>
                    <button class="hc-btn-remove hc-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="hc-row">
                    <div id="hc-img-wrap-${idx}">${imgHtml}</div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                        <label class="hc-label">Imagen de fondo</label>
                        <input class="hc-input-sm" placeholder="URL de la imagen" value="${card.image || ""}" data-field="image">
                        <button class="hc-pick-btn hc-pick-img"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="hc-label">Video en hover</label>
                    <div style="display:flex;flex-direction:column;gap:0.5rem;">
                        <input class="hc-input-sm" placeholder="URL del video (mp4 o webm)" value="${card.video || ""}" data-field="video">
                        <button class="hc-pick-btn hc-pick-video"><i class="ri-video-line"></i> Seleccionar video</button>
                    </div>
                </div>
                <div>
                    <label class="hc-label">Título</label>
                    <input class="hc-input" placeholder="Título de la tarjeta" value="${card.title || ""}" data-field="title">
                </div>
                <div>
                    <label class="hc-label">Descripción</label>
                    <input class="hc-input" placeholder="Descripción breve" value="${card.desc || ""}" data-field="desc">
                </div>
                <div>
                    <label class="hc-label">Enlace del botón (slug, URL o #id)</label>
                    <input class="hc-input" placeholder="/pagina, https://..., o #seccion" value="${card.href || "#"}" data-field="href">
                </div>`;

            div.querySelectorAll("[data-field]").forEach((input) => {
                input.addEventListener("input", () => {
                    card[input.dataset.field] = input.value;
                    if (input.dataset.field === "image") {
                        const wrap = div.querySelector(`#hc-img-wrap-${idx}`);
                        wrap.innerHTML = input.value
                            ? `<img class="hc-img-preview" src="${input.value}" alt="">`
                            : `<div class="hc-img-placeholder"><i class="ri-image-line"></i></div>`;
                    }
                });
            });

            div.querySelector(".hc-pick-img").addEventListener("click", () => {
                openMediaPicker({
                    type: "image",
                    title: "Seleccionar imagen de tarjeta",
                    onSelect: (url) => {
                        card.image = url;
                        div.querySelector("[data-field='image']").value = url;
                        div.querySelector(`#hc-img-wrap-${idx}`).innerHTML =
                            `<img class="hc-img-preview" src="${url}" alt="">`;
                    },
                });
            });

            div.querySelector(".hc-pick-video").addEventListener("click", () => {
                openMediaPicker({
                    type: "video",
                    title: "Seleccionar video de tarjeta",
                    onSelect: (url) => {
                        card.video = url;
                        div.querySelector("[data-field='video']").value = url;
                    },
                });
            });

            div.querySelector(".hc-remove-card").addEventListener(
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

    modal.querySelector("#hc-add-card").addEventListener("click", () => {
        data.cards.push({
            image: "",
            video: "",
            title: "Nueva tarjeta",
            desc: "Descripción de la tarjeta.",
            href: "#",
        });
        renderCards();
        modal.querySelector("#hc-cards-list").lastElementChild?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    });

    modal.querySelector("#hc-modal-backup").addEventListener("click", () => {
        const snapshot = {
            heading:
                modal.querySelector("#hc-heading").value.trim() ||
                DEFAULT_DATA.heading,
            subheading:
                modal.querySelector("#hc-subheading").value.trim() ||
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
        a.download = `hero-cards-backup-${ts}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });

    modal.querySelector("#hc-modal-restore-input").addEventListener(
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
                    errOverlay.className = "hc-confirm-overlay";
                    errOverlay.innerHTML = `<div class="hc-confirm-modal"><div class="hc-confirm-header"><i class="ri-error-warning-line" style="color:#ef4444;"></i><h3>Archivo inválido</h3></div><div class="hc-confirm-body"><p>El archivo seleccionado no es un JSON válido.</p></div><div class="hc-confirm-footer"><button class="hc-confirm-ok" style="background:#ef4444;">Cerrar</button></div></div>`;
                    document.body.appendChild(errOverlay);
                    errOverlay.querySelector(".hc-confirm-ok").onclick = () =>
                        errOverlay.remove();
                    e.target.value = "";
                    return;
                }
                const confirmOverlay = document.createElement("div");
                confirmOverlay.className = "hc-confirm-overlay";
                confirmOverlay.innerHTML = `
                    <div class="hc-confirm-modal">
                        <div class="hc-confirm-header">
                            <i class="ri-refresh-line"></i>
                            <h3>Restaurar configuración</h3>
                        </div>
                        <div class="hc-confirm-body">
                            <p>¿Deseas restaurar la configuración de esta sección desde el archivo de respaldo?</p>
                            <p>Esta acción reemplazará la configuración actual del formulario.</p>
                            <span class="hc-confirm-filename"><i class="ri-file-code-line"></i>${file.name}</span>
                        </div>
                        <div class="hc-confirm-footer">
                            <button class="hc-confirm-cancel">Cancelar</button>
                            <button class="hc-confirm-ok"><i class="ri-check-line"></i> Sí, restaurar</button>
                        </div>
                    </div>`;
                document.body.appendChild(confirmOverlay);
                confirmOverlay.querySelector(".hc-confirm-cancel").onclick = () => {
                    confirmOverlay.remove();
                    e.target.value = "";
                };
                confirmOverlay.querySelector(".hc-confirm-ok").onclick = () => {
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
                        "data-hero-cards-config": JSON.stringify(restored),
                    });
                    component.components(buildHeroCardsHTML(restored));
                    overlay.remove();
                    showHeroCardsModal(editor, component);
                };
            };
            reader.readAsText(file);
        },
    );

    const close = () => overlay.remove();
    modal.querySelector("#hc-modal-close").addEventListener("click", close);
    modal.querySelector("#hc-modal-cancel").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    modal.querySelector("#hc-modal-save").addEventListener("click", () => {
        data.heading =
            modal.querySelector("#hc-heading").value.trim() ||
            DEFAULT_DATA.heading;
        data.subheading =
            modal.querySelector("#hc-subheading").value.trim() ||
            DEFAULT_DATA.subheading;

        const existingInner = component
            .getEl()
            ?.querySelector("[id^='hc-root-']");
        const uid =
            existingInner?.id?.replace("hc-root-", "") ||
            "hc" + Math.random().toString(36).slice(2, 7);

        component.addAttributes({
            "data-hero-cards-config": JSON.stringify(data),
        });
        component.components(buildHeroCardsHTML(data, uid));
        close();
    });
}

const iconHeroCards = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="6" width="7" height="20" rx="1.5" fill="#003B71" fill-opacity="0.15" stroke="#003B71" stroke-width="0.8"/>
    <rect x="11.5" y="6" width="7" height="20" rx="1.5" fill="#003B71" fill-opacity="0.25" stroke="#003B71" stroke-width="0.8"/>
    <rect x="21" y="6" width="7" height="20" rx="1.5" fill="#E97300" fill-opacity="0.3" stroke="#E97300" stroke-width="0.8"/>
    <circle cx="24.5" cy="22.5" r="1.6" fill="#E97300"/>
</svg>`;

export function initializeHeroCardsBlock(editor) {
    const componentType = "hero-cards-component";

    editor.DomComponents.addType("hc-video-media", {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === "hc-video-media"
                ? { type: "hc-video-media" }
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
        view: {
            onRender() {
                const el = this.el;
                if (!el) return;
                el.removeAttribute("autoplay");
                el.removeAttribute("src");
                el.muted = true;
                el.pause();
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
                name: "Tarjetas Hero",
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
                    "data-hero-cards-config": JSON.stringify(DEFAULT_DATA),
                },
                components: buildHeroCardsHTML(DEFAULT_DATA) + `<style>${HC_CSS}</style>`,
                script: HC_SCRIPT,
                "script-props": ["data-hero-cards-config"],
                traits: [
                    {
                        type: "button",
                        label: "Tarjetas Hero",
                        text: "Administrar Tarjetas",
                        full: true,
                        command: "open-hero-cards-config",
                    },
                ],
            },
            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });

                const attrs = this.getAttributes();
                let config;
                try {
                    config = JSON.parse(attrs["data-hero-cards-config"] || "{}");
                } catch {
                    config = null;
                }

                if (config && config.cards) {
                    const existingInner = this.getEl()?.querySelector("[id^='hc-root-']");
                    const uid = existingInner?.id?.replace("hc-root-", "");
                    this.components(buildHeroCardsHTML(config, uid) + `<style>${HC_CSS}</style>`);
                }
            },
        },
    });

    editor.Commands.add("open-hero-cards-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showHeroCardsModal(ed, selected);
        },
    });

    editor.on("component:add component:update", (component) => {
        if (component.get("type") !== componentType) return;
        const el = component.getEl();
        if (!el) return;
        el.querySelectorAll("video").forEach((video) => {
            video.removeAttribute("autoplay");
            video.removeAttribute("src");
            video.muted = true;
            video.pause();
        });
    });

    editor.BlockManager.add("hero-cards-block", {
        label: "Tarjetas Hero",
        category: "Productos y Servicios",
        media: iconHeroCards,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    editor.on("component:selected", (selected) => {
        if (!selected) return;
        const el = selected.getEl?.();
        if (!el) return;
        if (el.getAttribute?.("data-gjs-type") === componentType) return;
        if (el.getAttribute?.("data-gjs-type") === "hc-video-media") return;
        const rootEl = el.closest(`[data-gjs-type="${componentType}"]`);
        if (!rootEl) return;
        const rootModel = editor
            .getWrapper()
            .find(`[data-gjs-type="${componentType}"]`)
            .find((c) => c.getEl() === rootEl);
        if (rootModel && rootModel !== selected) {
            editor.select(rootModel);
        }
    });

    injectHeroCardsEditorStyles(editor, componentType);
}

function injectHeroCardsEditorStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        const head = iframe?.contentDocument?.head;
        if (!head || head.querySelector(`#${componentType}-editor-css`)) return;
        const style = iframe.contentDocument.createElement("style");
        style.id = `${componentType}-editor-css`;
        style.textContent = `
            [data-gjs-type="${componentType}"] * { pointer-events: none !important; }
        `;
        head.appendChild(style);
    });
}