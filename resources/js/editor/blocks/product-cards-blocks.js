import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

const PC_CAROUSEL_SCRIPT = function () {
    (function () {
        var SWIPE_THRESHOLD = 60;

        function isEditorContext() {
            return (
                !!window.__gjseditor ||
                document.documentElement.hasAttribute("data-gjs-canvas")
            );
        }

        function getPages(section) {
            return Array.prototype.slice.call(
                section.querySelectorAll(".pc-page"),
            );
        }

        function getActiveIndex(pages) {
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].classList.contains("pc-page-active")) return i;
            }
            return 0;
        }

        function updateDots(section, index) {
            var dotsWrap = section.querySelector(".pc-dots");
            if (!dotsWrap) return;
            dotsWrap.querySelectorAll(".pc-dot").forEach(function (dot, i) {
                dot.classList.toggle("pc-dot-active", i === index);
            });
        }

        function goToPage(section, index) {
            var pages = getPages(section);
            var max = pages.length - 1;
            index = Math.max(0, Math.min(index, max));
            var current = getActiveIndex(pages);
            if (index === current) return;
            var wrap = section.querySelector(".pc-carousel-wrap");
            var track = section.querySelector(".pc-carousel-track");
            if (wrap && track) {
                wrap.style.minHeight = track.getBoundingClientRect().height + "px";
            }
            pages[current].classList.remove("pc-page-active");
            pages[index].classList.add("pc-page-active");
            updateDots(section, index);
            setTimeout(function () {
                if (wrap) wrap.style.minHeight = "";
            }, 380);
        }

        function initCarousel(section) {
            if (!section || section.__pcInit) return;
            section.__pcInit = true;
            var wrap = section.querySelector(".pc-carousel-wrap");
            if (!wrap) return;

            if (isEditorContext()) return;

            wrap.querySelectorAll("img").forEach(function (img) {
                img.setAttribute("draggable", "false");
            });

            section.querySelectorAll(".pc-dot").forEach(function (dot, i) {
                dot.addEventListener("click", function () {
                    goToPage(section, i);
                });
            });

            var isDragging = false;
            var startX = 0;
            var moved = false;

            wrap.addEventListener("mousedown", function (e) {
                if (e.button !== 0) return;
                isDragging = true;
                moved = false;
                startX = e.clientX;
                wrap.style.cursor = "grabbing";
            });

            document.addEventListener("mousemove", function (e) {
                if (!isDragging) return;
                if (Math.abs(startX - e.clientX) > 5) moved = true;
            });

            document.addEventListener("mouseup", function (e) {
                if (!isDragging) return;
                isDragging = false;
                wrap.style.cursor = "grab";
                if (moved) {
                    e.stopPropagation();
                    var delta = startX - e.clientX;
                    var pages = getPages(section);
                    var current = getActiveIndex(pages);
                    if (delta > SWIPE_THRESHOLD) {
                        goToPage(section, current + 1);
                    } else if (delta < -SWIPE_THRESHOLD) {
                        goToPage(section, current - 1);
                    }
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
            var touchMoved = false;

            wrap.addEventListener(
                "touchstart",
                function (e) {
                    touchStartX = e.touches[0].clientX;
                    touchMoved = false;
                },
                { passive: true },
            );

            wrap.addEventListener(
                "touchmove",
                function (e) {
                    if (Math.abs(touchStartX - e.touches[0].clientX) > 5) {
                        touchMoved = true;
                    }
                },
                { passive: true },
            );

            wrap.addEventListener(
                "touchend",
                function (e) {
                    if (!touchMoved) return;
                    var endX = e.changedTouches[0].clientX;
                    var delta = touchStartX - endX;
                    var pages = getPages(section);
                    var current = getActiveIndex(pages);
                    if (delta > SWIPE_THRESHOLD) {
                        goToPage(section, current + 1);
                    } else if (delta < -SWIPE_THRESHOLD) {
                        goToPage(section, current - 1);
                    }
                },
                { passive: true },
            );

            updateDots(section, getActiveIndex(getPages(section)));
        }

        function init() {
            document.querySelectorAll(".pc-section").forEach(function (s) {
                delete s.__pcInit;
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
const PRODUCT_CARDS_RUNTIME_SCRIPT = `(${PC_CAROUSEL_SCRIPT.toString()})();`;

const PRODUCT_CARDS_CSS = `
.pc-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.pc-carousel-wrap{position:relative;width:100%;cursor:grab;overflow:hidden;}
.pc-carousel-track{position:relative;width:100%;}
.pc-page{grid-template-columns:repeat(4,minmax(240px,1fr));gap:1.5rem;width:100%;box-sizing:border-box;display:grid;opacity:0;visibility:hidden;position:absolute;top:0;left:0;transition:opacity .35s ease;pointer-events:none;}
.pc-page.pc-page-active{opacity:1;visibility:visible;position:relative;pointer-events:auto;}
.pc-card{display:flex;flex-direction:column;align-items:center;gap:1rem;background:#ffffff;border:2px solid #003B71;border-radius:1rem;padding:1.25rem;box-sizing:border-box;min-width:0;user-select:none;}
.pc-card-img-wrap{width:100%;max-width:200px;margin:0 auto;aspect-ratio:1/1;border-radius:0.75rem;overflow:hidden;background:#dce8f5;}
.pc-card-img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none;}
.pc-card-body{display:flex;flex-direction:column;align-items:center;gap:0.4rem;text-align:center;flex:1;}
.pc-card-title{font-size:0.95rem;font-weight:700;color:#003B71;text-transform:uppercase;}
.pc-card-desc{font-size:0.9rem;color:#003B71;line-height:1.5;text-align:center;}
.pc-btn{display:block;width:100%;padding:0.5rem 1rem;border-radius:9999px;background:#003B71;color:#ffffff;font-size:0.95rem;font-weight:600;text-align:center;text-decoration:none;transition:background .2s;}
.pc-btn:hover{background:#002a52;}
.pc-nav-row{display:flex;align-items:center;justify-content:center;gap:1.25rem;margin-top:1.5rem;}
.pc-dots{display:flex;align-items:center;gap:0.5rem;}
.pc-dot{width:0.5rem;height:0.5rem;border-radius:9999px;background:#dce8f5;border:none;cursor:pointer;padding:0;transition:background .2s,width .2s;}
.pc-dot-active{background:#003B71;width:1.5rem;}
.pc-more-wrap{display:flex;justify-content:center;margin-top:2rem;}
.pc-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:9999px;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background .2s;}
.pc-more-btn:hover{background:#c96200;}
.pc-section-heading{font-size:2.25rem;font-weight:800;color:#003B71;margin:0 0 0.75rem;text-align:center;}
.pc-section-subheading{font-size:1rem;color:#003B71;margin:0;text-align:center;}
@media(max-width:1280px){.pc-section{padding:3rem 2.5rem;}.pc-page{grid-template-columns:repeat(3,minmax(220px,1fr));}}
@media(max-width:992px){.pc-section{padding:2.5rem 1.5rem;}.pc-page{grid-template-columns:repeat(2,minmax(200px,1fr));}}
@media(max-width:640px){.pc-page{grid-template-columns:minmax(240px,1fr);}}
.pc-carousel-wrap{min-height:1px;}`;

function buildCardHTML(card) {
    const img = card.img || assetUrl("images/placeholder.svg");
    const title = card.title || "TÍTULO DEL PRODUCTO";
    const desc = card.desc || "Descripción breve del producto financiero.";
    const href = card.href || "#";
    const btnLabel = card.btn_label || "Solicitar";
    return `<div class="pc-card"><div class="pc-card-img-wrap"><img src="${img}" alt="${title}" class="pc-card-img"></div><div class="pc-card-body"><h3 class="pc-card-title">${title}</h3><p class="pc-card-desc">${desc}</p></div><a href="${href}" class="pc-btn">${btnLabel}</a></div>`;
}

function chunk(arr, size) {
    const out = [];
    for (let i = 0; i < arr.length; i += size) {
        out.push(arr.slice(i, i + size));
    }
    return out.length ? out : [[]];
}

function buildProductCardsHTML(data) {
    const heading = data.heading || "Créditos";
    const subheading =
        data.subheading ||
        "Opciones de financiamiento diseñadas para hacer realidad tus proyectos.";
    const moreHref = data.more_href || "#";
    const moreLabel = data.more_label || "Ver más";
    const showMore = data.show_more !== false;
    const cards = data.cards || [];
    const pages = chunk(cards, 4);
    const pagesHTML = pages
        .map(
            (pageCards, i) =>
                `<div class="pc-page${i === 0 ? " pc-page-active" : ""}">${pageCards.map(buildCardHTML).join("")}</div>`,
        )
        .join("");
    const dotsHTML = pages
        .map(
            (_, i) =>
                `<button type="button" class="pc-dot${i === 0 ? " pc-dot-active" : ""}" aria-label="Ir a la página ${i + 1}"></button>`,
        )
        .join("");
    const navHTML =
        pages.length > 1
            ? `<div class="pc-nav-row"><div class="pc-dots">${dotsHTML}</div></div>`
            : "";
    const moreBtnHTML = showMore
        ? `<div class="pc-more-wrap"><a href="${moreHref}" class="pc-more-btn">${moreLabel}</a></div>`
        : "";
    return `<section class="pc-section"><style>${PRODUCT_CARDS_CSS}</style><div style="text-align:center;margin-bottom:2rem;"><h2 class="pc-section-heading">${heading}</h2><p class="pc-section-subheading">${subheading}</p></div><div class="pc-carousel-wrap"><div class="pc-carousel-track">${pagesHTML}</div></div>${navHTML}${moreBtnHTML}</section>`;
}
const DEFAULT_DATA = {
    heading: "Créditos",
    subheading:
        "Opciones de financiamiento diseñadas para hacer realidad tus proyectos.",
    more_href: "#",
    more_label: "Ver más",
    cards: [
        {
            img: "",
            title: "CREDINVIERTE",
            desc: "Adquiere activos fijos",
            href: "#",
            btn_label: "Solicitar",
        },
        {
            img: "",
            title: "SOLUCIONES INTEGRALES",
            desc: "Financiamiento PYME",
            href: "#",
            btn_label: "Solicitar",
        },
        {
            img: "",
            title: "CREDI-CONFIAMOS",
            desc: "Rápido y sin fiador",
            href: "#",
            btn_label: "Solicitar",
        },
        {
            img: "",
            title: "CREDILÍNEA",
            desc: "Línea rotativa",
            href: "#",
            btn_label: "Solicitar",
        },
    ],
};

function showProductCardsModal(editor, component) {
    const existing = document.getElementById("pc-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("pc-modal-styles")) {
        const style = document.createElement("style");
        style.id = "pc-modal-styles";
        style.textContent = `
            .pc-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .pc-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .pc-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .pc-modal-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
            .pc-modal-header h2 i{color:#003B71;}
            .pc-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
            .pc-modal-close:hover{background:#f1f5f9;color:#475569;}
            .pc-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
            .pc-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
            .pc-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .pc-tab-btn i{font-size:1rem;}
            .pc-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .pc-modal-body::-webkit-scrollbar{width:5px;}
            .pc-modal-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
            .pc-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .pc-tab-panel.active{display:flex;}
            .pc-card-config{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .pc-card-config-header{display:flex;align-items:center;gap:0.5rem;}
            .pc-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
            .pc-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .pc-input:focus{border-color:#003B71;}
            .pc-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;box-sizing:border-box;width:100%;}
            .pc-row{display:flex;gap:0.75rem;align-items:flex-start;}
            .pc-img-preview{width:64px;height:64px;border-radius:0.5rem;object-fit:cover;border:1px solid #e2e8f0;background:#f1f5f9;flex-shrink:0;}
            .pc-img-placeholder{width:64px;height:64px;border-radius:0.5rem;background:#f1f5f9;border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
            .pc-img-placeholder i{font-size:1.5rem;color:#94a3b8;}
            .pc-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:9999px;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .pc-pick-btn:hover{background:#002a52;}
            .pc-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;display:flex;align-items:center;border-radius:0.25rem;transition:background 0.15s;}
            .pc-btn-remove:hover{background:#fef2f2;}
            .pc-btn-add{padding:0.5rem 1.25rem;border:none;border-radius:9999px;color:#fff;font-size:0.8125rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;background:#003B71;}
            .pc-btn-add:hover{background:#002a52;}
            .pc-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .pc-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;}
            .pc-btn-cancel:hover{background:#f8fafc;}
            .pc-btn-save{padding:0.5rem 1.25rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .pc-btn-save:hover{background:#c96200;}
            .pc-toggle-wrap{display:flex;align-items:center;gap:0.75rem;}
            .pc-toggle{position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;}
            .pc-toggle input{opacity:0;width:0;height:0;}
            .pc-toggle-slider{position:absolute;inset:0;background:#cbd5e1;border-radius:9999px;transition:background 0.2s;cursor:pointer;}
            .pc-toggle-slider:before{content:'';position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:transform 0.2s;}
            .pc-toggle input:checked+.pc-toggle-slider{background:#003B71;}
            .pc-toggle input:checked+.pc-toggle-slider:before{transform:translateX(18px);}
            .pc-section-title{font-size:0.75rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0;border-bottom:1px solid #e2e8f0;margin-bottom:0.75rem;}
            .pc-card-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
            .pc-config-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .pc-btn-backup{padding:0.5rem 1rem;background:#fff;border:2px solid #003B71;border-radius:0.5rem;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;}
            .pc-btn-backup:hover{background:#003B71;color:#fff;}
            .pc-btn-restore{padding:0.5rem 1rem;background:#fff;border:2px solid #0d9488;border-radius:0.5rem;color:#0d9488;font-size:0.8125rem;font-weight:600;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;user-select:none;}
            .pc-btn-restore:hover{background:#0d9488;color:#fff;}
            .pc-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
            .pc-confirm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
            .pc-confirm-header{padding:1rem 1.25rem 0.75rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
            .pc-confirm-header i{font-size:1.25rem;color:#E97300;}
            .pc-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
            .pc-confirm-body{padding:1rem 1.25rem;}
            .pc-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
            .pc-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;background:#f1f5f9;border-radius:0.375rem;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
            .pc-confirm-footer{padding:0.75rem 1.25rem 1rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
            .pc-confirm-cancel{padding:0.5rem 1.125rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .pc-confirm-cancel:hover{background:#f1f5f9;}
            .pc-confirm-ok{padding:0.5rem 1.125rem;background:#E97300;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .pc-confirm-ok:hover{background:#d97821;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-product-cards-config"] || "{}",
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
        show_more: currentData.show_more ?? true,
        cards: JSON.parse(
            JSON.stringify(currentData.cards ?? DEFAULT_DATA.cards),
        ),
    };

    const overlay = document.createElement("div");
    overlay.id = "pc-config-modal";
    overlay.className = "pc-overlay";

    const modal = document.createElement("div");
    modal.className = "pc-modal";
    modal.innerHTML = `
        <div class="pc-modal-header">
            <h2><i class="ri-layout-grid-line"></i> Configurar Sección de Productos</h2>
            <button id="pc-modal-close" class="pc-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="pc-modal-tabs">
            <button class="pc-tab-btn active" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
            <button class="pc-tab-btn" data-tab="cards"><i class="ri-bank-card-line"></i> Tarjetas</button>
        </div>
        <div class="pc-modal-body">
            <div class="pc-tab-panel active" id="pc-panel-general">
                <div class="pc-config-card">
                    <div class="pc-section-title">Encabezado</div>
                    <div>
                        <label class="pc-label">Título principal</label>
                        <input id="pc-heading" type="text" class="pc-input" value="${data.heading}">
                    </div>
                    <div>
                        <label class="pc-label">Subtítulo</label>
                        <input id="pc-subheading" type="text" class="pc-input" value="${data.subheading}">
                    </div>
                </div>
                <div class="pc-config-card">
                    <div class="pc-section-title">Botón Ver más</div>
                    <div class="pc-toggle-wrap">
                        <label class="pc-toggle">
                            <input type="checkbox" id="pc-show-more" ${data.show_more ? "checked" : ""}>
                            <span class="pc-toggle-slider"></span>
                        </label>
                        <span style="font-size:0.875rem;color:#475569;">Mostrar botón Ver más</span>
                    </div>
                    <div id="pc-more-fields" style="${data.show_more ? "" : "display:none;"}display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="pc-label">Texto del botón</label>
                            <input id="pc-more-label" type="text" class="pc-input" value="${data.more_label}">
                        </div>
                        <div>
                            <label class="pc-label">URL</label>
                            <input id="pc-more-href" type="text" class="pc-input" value="${data.more_href}">
                        </div>
                    </div>
                </div>
            </div>
            <div class="pc-tab-panel" id="pc-panel-cards">
                <div id="pc-cards-list" style="display:flex;flex-direction:column;gap:0.75rem;"></div>
                <button id="pc-add-card" class="pc-btn-add" style="align-self:flex-start;margin-top:0.25rem;">
                    <i class="ri-add-line"></i> Agregar tarjeta
                </button>
            </div>
        </div>
        <div class="pc-modal-footer">
            <button id="pc-modal-cancel" class="pc-btn-cancel">Cancelar</button>
            <div style="display:flex;gap:0.5rem;margin-right:auto;">
                <button id="pc-modal-backup" class="pc-btn-backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <label id="pc-modal-restore-label" class="pc-btn-restore" title="Restaurar configuración desde JSON" style="cursor:pointer;"><i class="ri-upload-2-line"></i> Restaurar<input id="pc-modal-restore-input" type="file" accept=".json,application/json" style="display:none;"></label>
            </div>
            <button id="pc-modal-save" class="pc-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelectorAll(".pc-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".pc-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".pc-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#pc-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    modal
        .querySelector("#pc-show-more")
        .addEventListener("change", function () {
            data.show_more = this.checked;
            modal.querySelector("#pc-more-fields").style.display = this.checked
                ? "flex"
                : "none";
        });

    function renderCards() {
        const list = modal.querySelector("#pc-cards-list");
        list.innerHTML = "";
        data.cards.forEach((card, idx) => {
            const div = document.createElement("div");
            div.className = "pc-card-config";
            const imgHtml = card.img
                ? `<img class="pc-img-preview" src="${card.img}" alt="">`
                : `<div class="pc-img-placeholder"><i class="ri-image-line"></i></div>`;
            div.innerHTML = `
                <div class="pc-card-config-header">
                    <span class="pc-card-num">${idx + 1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${idx + 1}</span>
                    <button class="pc-btn-remove pc-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="pc-row">
                    <div id="pc-img-wrap-${idx}">${imgHtml}</div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                        <input class="pc-input-sm" placeholder="URL de la imagen" value="${card.img || ""}" data-field="img">
                        <button class="pc-pick-btn pc-pick-img"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="pc-label">Título</label>
                    <input class="pc-input" placeholder="TÍTULO DEL PRODUCTO" value="${card.title || ""}" data-field="title">
                </div>
                <div>
                    <label class="pc-label">Descripción</label>
                    <input class="pc-input" placeholder="Descripción breve" value="${card.desc || ""}" data-field="desc">
                </div>
                <div class="pc-row">
                    <div style="flex:1;">
                        <label class="pc-label">URL del botón</label>
                        <input class="pc-input" placeholder="#" value="${card.href || "#"}" data-field="href">
                    </div>
                    <div style="flex:1;">
                        <label class="pc-label">Texto del botón</label>
                        <input class="pc-input" placeholder="Solicitar" value="${card.btn_label || "Solicitar"}" data-field="btn_label">
                    </div>
                </div>`;

            div.querySelectorAll("[data-field]").forEach((input) => {
                input.addEventListener("input", () => {
                    card[input.dataset.field] = input.value;
                    if (input.dataset.field === "img") {
                        const wrap = div.querySelector(`#pc-img-wrap-${idx}`);
                        wrap.innerHTML = input.value
                            ? `<img class="pc-img-preview" src="${input.value}" alt="">`
                            : `<div class="pc-img-placeholder"><i class="ri-image-line"></i></div>`;
                    }
                });
            });

            div.querySelector(".pc-pick-img").addEventListener("click", () => {
                openMediaPicker({
                    type: "image",
                    title: "Seleccionar imagen de tarjeta",
                    onSelect: (url) => {
                        card.img = url;
                        div.querySelector("[data-field='img']").value = url;
                        div.querySelector(`#pc-img-wrap-${idx}`).innerHTML =
                            `<img class="pc-img-preview" src="${url}" alt="">`;
                    },
                });
            });

            div.querySelector(".pc-remove-card").addEventListener(
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

    modal.querySelector("#pc-add-card").addEventListener("click", () => {
        data.cards.push({
            img: "",
            title: "NUEVO PRODUCTO",
            desc: "Descripción del producto.",
            href: "#",
            btn_label: "Solicitar",
        });
        renderCards();
        modal.querySelector("#pc-cards-list").lastElementChild?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    });

    modal.querySelector("#pc-modal-backup").addEventListener("click", () => {
        const snapshot = {
            heading: modal.querySelector("#pc-heading").value.trim(),
            subheading: modal.querySelector("#pc-subheading").value.trim(),
            show_more: modal.querySelector("#pc-show-more").checked,
            more_label: modal.querySelector("#pc-more-label").value.trim(),
            more_href: modal.querySelector("#pc-more-href").value.trim() || "#",
            cards: JSON.parse(JSON.stringify(data.cards)),
        };
        const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        const a = document.createElement("a");
        a.href = url;
        a.download = `product-cards-backup-${ts}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });

    modal.querySelector("#pc-modal-restore-input").addEventListener(
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
                    errOverlay.className = "pc-confirm-overlay";
                    errOverlay.innerHTML = `<div class="pc-confirm-modal"><div class="pc-confirm-header"><i class="ri-error-warning-line" style="color:#ef4444;"></i><h3>Archivo inválido</h3></div><div class="pc-confirm-body"><p>El archivo seleccionado no es un JSON válido.</p></div><div class="pc-confirm-footer"><button class="pc-confirm-ok" style="background:#ef4444;">Cerrar</button></div></div>`;
                    document.body.appendChild(errOverlay);
                    errOverlay.querySelector(".pc-confirm-ok").onclick = () =>
                        errOverlay.remove();
                    e.target.value = "";
                    return;
                }
                const confirmOverlay = document.createElement("div");
                confirmOverlay.className = "pc-confirm-overlay";
                confirmOverlay.innerHTML = `
                    <div class="pc-confirm-modal">
                        <div class="pc-confirm-header">
                            <i class="ri-refresh-line"></i>
                            <h3>Restaurar configuración</h3>
                        </div>
                        <div class="pc-confirm-body">
                            <p>¿Deseas restaurar la configuración de esta sección desde el archivo de respaldo?</p>
                            <p>Esta acción reemplazará la configuración actual del formulario.</p>
                            <span class="pc-confirm-filename"><i class="ri-file-code-line"></i>${file.name}</span>
                        </div>
                        <div class="pc-confirm-footer">
                            <button class="pc-confirm-cancel">Cancelar</button>
                            <button class="pc-confirm-ok"><i class="ri-check-line"></i> Sí, restaurar</button>
                        </div>
                    </div>`;
                document.body.appendChild(confirmOverlay);
                confirmOverlay.querySelector(".pc-confirm-cancel").onclick = () => {
                    confirmOverlay.remove();
                    e.target.value = "";
                };
                confirmOverlay.querySelector(".pc-confirm-ok").onclick = () => {
                    confirmOverlay.remove();
                    e.target.value = "";
                    const restored = {
                        heading: parsed.heading ?? DEFAULT_DATA.heading,
                        subheading: parsed.subheading ?? DEFAULT_DATA.subheading,
                        more_href: parsed.more_href ?? DEFAULT_DATA.more_href,
                        more_label: parsed.more_label ?? DEFAULT_DATA.more_label,
                        show_more: parsed.show_more ?? true,
                        cards: JSON.parse(
                            JSON.stringify(parsed.cards ?? DEFAULT_DATA.cards),
                        ),
                    };
                    component.addAttributes({
                        "data-product-cards-config": JSON.stringify(restored),
                    });
                    component.components(buildProductCardsHTML(restored));
                    setTimeout(() => reinitCarouselInCanvas(editor), 300);
                    overlay.remove();
                    showProductCardsModal(editor, component);
                };
            };
            reader.readAsText(file);
        },
    );

    const close = () => overlay.remove();
    modal.querySelector("#pc-modal-close").addEventListener("click", close);
    modal.querySelector("#pc-modal-cancel").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    modal.querySelector("#pc-modal-save").addEventListener("click", () => {
        data.heading =
            modal.querySelector("#pc-heading").value.trim() ||
            DEFAULT_DATA.heading;
        data.subheading =
            modal.querySelector("#pc-subheading").value.trim() ||
            DEFAULT_DATA.subheading;
        data.show_more = modal.querySelector("#pc-show-more").checked;
        data.more_label =
            modal.querySelector("#pc-more-label").value.trim() ||
            DEFAULT_DATA.more_label;
        data.more_href =
            modal.querySelector("#pc-more-href").value.trim() || "#";

        component.addAttributes({
            "data-product-cards-config": JSON.stringify(data),
        });
        component.components(buildProductCardsHTML(data));
        setTimeout(() => reinitCarouselInCanvas(editor), 300);
        close();
    });
}

function reinitCarouselInCanvas(editor) {
    try {
        const iframeDoc = editor.Canvas.getFrameEl()?.contentDocument;
        if (!iframeDoc) return;
        const existing = iframeDoc.getElementById("pc-runtime-script");
        if (existing) existing.remove();
        iframeDoc.querySelectorAll(".pc-section").forEach((s) => {
            delete s.__pcInit;
        });
        const scriptEl = iframeDoc.createElement("script");
        scriptEl.id = "pc-runtime-script";
        scriptEl.textContent = PRODUCT_CARDS_RUNTIME_SCRIPT;
        iframeDoc.head.appendChild(scriptEl);
    } catch (e) {
        console.warn("[ProductCards] Error reiniciando carrusel:", e);
    }
}

const iconProductCards = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="2.5" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="2.5" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2.5" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2.5" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="9.5" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="11" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="11" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="11" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="11" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="18" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="19.5" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="19.5" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="19.5" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="19.5" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="26.5" y="6" width="4.5" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="27.5" y="8" width="2.5" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="27.5" y="20" width="2.5" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`;

export function initializeProductCardsBlock(editor) {
    const componentType = "product-cards-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Sección de Productos",
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
                    "data-product-cards-config": JSON.stringify(DEFAULT_DATA),
                },
                components: buildProductCardsHTML(DEFAULT_DATA),
                script: PC_CAROUSEL_SCRIPT,
                "script-props": ["data-product-cards-config"],
                traits: [
                    {
                        type: "button",
                        label: "Productos",
                        text: "Administrar Sección",
                        full: true,
                        command: "open-product-cards-config",
                    },
                ],
            },
            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-product-cards-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showProductCardsModal(ed, selected);
        },
    });

    editor.BlockManager.add("product-cards-block", {
        label: "Sección de productos",
        category: "Productos y Servicios",
        media: iconProductCards,
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
            setTimeout(() => reinitCarouselInCanvas(editor), 400);
        }
    });

    editor.on("canvas:render", () => {
        setTimeout(() => reinitCarouselInCanvas(editor), 600);
    });

    editor.on("storage:end:load", () => {
        setTimeout(() => reinitCarouselInCanvas(editor), 800);
    });

    injectProductCardsEditorStyles(editor, componentType);
}

function injectProductCardsEditorStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        const head = iframe?.contentDocument?.head;
        if (!head || head.querySelector(`#${componentType}-editor-css`)) return;
        const style = document.createElement("style");
        style.id = `${componentType}-editor-css`;
        style.textContent = `
            [data-gjs-type="${componentType}"] * { pointer-events: none !important; }
        `;
        head.appendChild(style);
    });
}