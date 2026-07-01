const BANNER_BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <circle cx="23" cy="14" r="5" fill="#E97300"/>
    <circle cx="23" cy="14" r="4" fill="#f8e7d8"/>
</svg>`;

const BANNER_RUNTIME_STYLES = `.banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;display:grid;}.banner-slide-container:active{cursor:grabbing;}.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}.banner-bg{position:absolute;inset:0;z-index:0;}.banner-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.banner-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.banner-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.banner-btn--fill-blue{background:#003B71;color:#ffffff;border:2px solid #003B71;}.banner-btn--fill-blue:hover{background:#002a52;border-color:#002a52;color:#ffffff;}.banner-btn--outline-blue{background:transparent;color:#003B71;border:2px solid #003B71;}.banner-btn--outline-blue:hover{background:#003B71;border-color:#003B71;color:#ffffff;}.banner-btn--fill-orange{background:#E97300;color:#ffffff;border:2px solid #E97300;}.banner-btn--fill-orange:hover{background:#c96200;border-color:#c96200;color:#ffffff;}.banner-btn--outline-orange{background:transparent;color:#E97300;border:2px solid #E97300;}.banner-btn--outline-orange:hover{background:#E97300;border-color:#E97300;color:#ffffff;}.banner-btn--fill-white{background:#ffffff;color:#003B71;border:2px solid #ffffff;}.banner-btn--fill-white:hover{background:#dce8f5;border-color:#dce8f5;color:#003B71;}.banner-btn--outline-white{background:transparent;color:#ffffff;border:2px solid #ffffff;}.banner-btn--outline-white:hover{background:#ffffff;border-color:#ffffff;color:#003B71;}.banner-dots-wrapper{display:none;}.banner-stripe{position:relative;width:100%;height:48px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}.banner-dots{display:flex;gap:8px;align-items:center;}.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}.banner-dot--active{width:28px;background:#ffffff;}.banner-empty{display:flex;align-items:center;justify-content:center;min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;}@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}`;

const BANNER_SKELETON_STYLES = `@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title--short{width:60%;}.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-line--short{width:55%;}.bsk-buttons{display:flex;gap:16px;margin-top:36px;}.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}@media(max-width:768px){.bsk-buttons{flex-direction:column;}}`;

const VALID_BUTTON_STYLES = ["fill-blue", "outline-blue", "fill-orange", "outline-orange", "fill-white", "outline-white"];

function ensureGlobalStyle(doc, id, css) {
    if (doc.getElementById(id)) return;
    const s = doc.createElement("style");
    s.id = id;
    s.textContent = css;
    doc.head.appendChild(s);
}

function resolveButtonStyleClass(style) {
    if (VALID_BUTTON_STYLES.includes(style)) return style;
    if (style === "outline-blue" || style === "outline-orange") return "outline-white";
    return "fill-white";
}

function buildBannerButton(text, url, style, external) {
    const styleClass = resolveButtonStyleClass(style);
    const tag = url ? "a" : "span";
    const attrs = url ? `href="${url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}` : "";
    return `<${tag} ${attrs} class="banner-btn banner-btn--${styleClass}">${text}</${tag}>`;
}

function createBannerScript() {
    return function () {
        const section = this;
        const doc = section.ownerDocument ?? document;
        const apiEndpoint = doc.querySelector('meta[name="api-banners-url"]')?.content ?? "/api/banners/active";

        ensureGlobalStyle(doc, "banner-hero-styles", BANNER_RUNTIME_STYLES);
        ensureGlobalStyle(doc, "banner-skeleton-styles", BANNER_SKELETON_STYLES);

        let banners = [];
        let currentIndex = 0;
        let autoplayTimer = null;
        let isDragging = false;
        let dragStartX = 0;
        let dragDelta = 0;
        const SWIPE_THRESHOLD = 50;

        const autoplay = section.dataset.autoplay !== "false";
        const category = section.dataset.category ?? "";
        const container = section.querySelector(".banner-slide-container");
        const stripe = section.querySelector(".banner-stripe");

        if (!container || !stripe) return;

        async function loadBanners() {
            if (section.__bannerLoading) return;
            section.__bannerLoading = true;
            showSkeleton();
            try {
                const res = await fetch(apiEndpoint, { headers: { Accept: "application/json" } });
                if (!res.ok) {
                    showEmpty();
                    return;
                }
                const all = await res.json();
                banners = Array.isArray(all) ? (category ? all.filter((b) => b.category === category) : all) : [];
                if (banners.length === 0) {
                    showEmpty();
                    return;
                }
                renderSlides();
                renderDots();
                goTo(0, false);
                if (autoplay) startAutoplay();
            } catch {
                showEmpty();
            } finally {
                section.__bannerLoading = false;
            }
        }

        function showSkeleton() {
            container.innerHTML = `
                <div class="banner-slide banner-slide--active">
                    <div class="banner-slide-inner">
                        <div class="banner-bg bsk-bg-img"></div>
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            <div class="bsk-badge"></div>
                            <div class="bsk-title"></div>
                            <div class="bsk-title bsk-title--short"></div>
                            <div class="bsk-line"></div>
                            <div class="bsk-line"></div>
                            <div class="bsk-line bsk-line--short"></div>
                            <div class="bsk-buttons">
                                <div class="bsk-btn"></div>
                                <div class="bsk-btn"></div>
                            </div>
                        </div>
                    </div>
                </div>`;
            stripe.innerHTML = "";
        }

        function renderSlides() {
            container.innerHTML = banners
                .map(
                    (banner, i) => `
                <div class="banner-slide" data-index="${i}">
                    <div class="banner-slide-inner">
                        <div class="banner-bg">
                            <img src="${banner.image_url}"
                                 alt="${banner.image_alt ?? banner.title}"
                                 loading="${i === 0 ? "eager" : "lazy"}"
                                 decoding="async"
                                 fetchpriority="${i === 0 ? "high" : "low"}"
                                 draggable="false">
                        </div>
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            ${banner.category ? `<span class="banner-category-badge">${banner.category}</span>` : ""}
                            <h2 class="banner-title">${banner.title}</h2>
                            <p class="banner-description">${banner.description}</p>
                            ${
                                banner.btn_primary_text || banner.btn_secondary_text
                                    ? `<div class="banner-buttons">
                                    ${banner.btn_primary_text ? buildBannerButton(banner.btn_primary_text, banner.btn_primary_url, banner.btn_primary_style, banner.btn_primary_external) : ""}
                                    ${banner.btn_secondary_text ? buildBannerButton(banner.btn_secondary_text, banner.btn_secondary_url, banner.btn_secondary_style, banner.btn_secondary_external) : ""}
                                </div>`
                                    : ""
                            }
                        </div>
                    </div>
                </div>`,
                )
                .join("");

            attachSwipe();
            preloadImages();
        }

        function attachSwipe() {
            container.addEventListener("mousedown", onDragStart);
            container.addEventListener("touchstart", onDragStart, { passive: true });
            container.addEventListener("mousemove", onDragMove);
            container.addEventListener("touchmove", onDragMove, { passive: true });
            container.addEventListener("mouseup", onDragEnd);
            container.addEventListener("touchend", onDragEnd);
            container.addEventListener("mouseleave", onDragEnd);
        }

        function preloadImages() {
            banners.forEach((banner) => {
                const img = new Image();
                img.src = banner.image_url;
            });
        }

        function onDragStart(e) {
            isDragging = true;
            dragStartX = e.touches ? e.touches[0].clientX : e.clientX;
            dragDelta = 0;
        }

        function onDragMove(e) {
            if (!isDragging) return;
            dragDelta = (e.touches ? e.touches[0].clientX : e.clientX) - dragStartX;
        }

        function onDragEnd() {
            if (!isDragging) return;
            isDragging = false;
            if (Math.abs(dragDelta) >= SWIPE_THRESHOLD) {
                goTo(dragDelta < 0 ? (currentIndex + 1) % banners.length : (currentIndex - 1 + banners.length) % banners.length);
                resetAutoplay();
            }
            dragDelta = 0;
        }

        function renderDots() {
            if (banners.length <= 1) {
                stripe.innerHTML = "";
                return;
            }

            const dotsContainer = doc.createElement("div");
            dotsContainer.className = "banner-dots";

            banners.forEach((_, i) => {
                const dot = doc.createElement("button");
                dot.className = "banner-dot";
                dot.type = "button";
                dot.dataset.index = String(i);
                dot.setAttribute("aria-label", `Banner ${i + 1}`);
                dot.addEventListener("click", () => {
                    goTo(i);
                    resetAutoplay();
                });
                dotsContainer.appendChild(dot);
            });

            stripe.innerHTML = "";
            stripe.appendChild(dotsContainer);
        }

        function goTo(index, animate = true) {
            const slides = container.querySelectorAll(".banner-slide");
            const dots = section.querySelectorAll(".banner-dot");

            slides.forEach((slide, i) => {
                const active = i === index;
                if (!animate) slide.style.transition = "none";
                slide.classList.toggle("banner-slide--active", active);
                if (!animate)
                    requestAnimationFrame(() => {
                        slide.style.transition = "";
                    });
            });

            dots.forEach((dot, i) => dot.classList.toggle("banner-dot--active", i === index));

            currentIndex = index;
        }

        function startAutoplay() {
            if (banners.length <= 1 || !autoplay) return;
            autoplayTimer = setInterval(() => goTo((currentIndex + 1) % banners.length), 5000);
        }

        function resetAutoplay() {
            if (!autoplay) return;
            clearInterval(autoplayTimer);
            startAutoplay();
        }

        function showEmpty() {
            clearInterval(autoplayTimer);
            container.innerHTML = `
                <div class="banner-slide banner-slide--active">
                    <div class="banner-empty">Sin contenido.</div>
                </div>`;
            stripe.innerHTML = "";
        }

        if (doc.readyState === "loading") {
            doc.addEventListener("DOMContentLoaded", loadBanners);
        } else {
            loadBanners();
        }
    };
}

function showBannerConfigModal(editor, component) {
    const existing = document.getElementById("banner-hero-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("bnr-modal-styles")) {
        const style = document.createElement("style");
        style.id = "bnr-modal-styles";
        style.textContent = `
            .bnr-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .bnr-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:480px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .bnr-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .bnr-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .bnr-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .bnr-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .bnr-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .bnr-modal-close:hover{background:#f1f5f9;color:#475569;}
            .bnr-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .bnr-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .bnr-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .bnr-row{display:flex;gap:0.75rem;align-items:center;justify-content:space-between;}
            .bnr-select{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;box-sizing:border-box;}
            .bnr-select:focus{border-color:#3b82f6;}
            .bnr-switch{position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;}
            .bnr-switch input{opacity:0;width:0;height:0;}
            .bnr-switch-slider{position:absolute;inset:0;background:#cbd5e1;border-radius:9999px;transition:background 0.2s;cursor:pointer;}
            .bnr-switch-knob{position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:left 0.2s;pointer-events:none;}
            .bnr-hint{font-size:0.75rem;color:#94a3b8;margin:0;}
            .bnr-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .bnr-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .bnr-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .bnr-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .bnr-btn-save:hover{background:#d97821;}
        `;
        document.head.appendChild(style);
    }

    const attrs = component.getAttributes();
    const currentAutoplay = attrs["data-autoplay"] !== "false";
    const currentCategory = attrs["data-category"] || "";

    const overlay = document.createElement("div");
    overlay.id = "banner-hero-config-modal";
    overlay.className = "bnr-overlay";

    const modal = document.createElement("div");
    modal.className = "bnr-modal";
    modal.innerHTML = `
        <div class="bnr-modal-header">
            <div class="bnr-modal-header-left"><i class="ri-slideshow-line"></i><h2>Configurar Banner Slider</h2></div>
            <button id="bnr-modal-close" class="bnr-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="bnr-modal-body">
            <div class="bnr-card">
                <div class="bnr-row">
                    <label class="bnr-label" style="margin:0;">Avance automático</label>
                    <label class="bnr-switch">
                        <input type="checkbox" id="bnr-autoplay" ${currentAutoplay ? "checked" : ""}>
                        <span class="bnr-switch-slider" id="bnr-autoplay-slider"></span>
                        <span class="bnr-switch-knob" id="bnr-autoplay-knob"></span>
                    </label>
                </div>
            </div>
            <div class="bnr-card">
                <label class="bnr-label">Filtrar por categoría</label>
                <select id="bnr-category" class="bnr-select">
                    <option value="">Todas las categorías</option>
                </select>
                <p class="bnr-hint" style="margin-top:0.5rem;">Solo se mostrarán banners activos que pertenezcan a la categoría seleccionada.</p>
            </div>
        </div>
        <div class="bnr-modal-footer">
            <button id="bnr-modal-cancel" class="bnr-btn-cancel">Cancelar</button>
            <button id="bnr-modal-save" class="bnr-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const autoplayCheckbox = modal.querySelector("#bnr-autoplay");
    const autoplaySlider = modal.querySelector("#bnr-autoplay-slider");
    const autoplayKnob = modal.querySelector("#bnr-autoplay-knob");
    const paintSwitch = () => {
        autoplaySlider.style.background = autoplayCheckbox.checked ? "#003B71" : "#cbd5e1";
        autoplayKnob.style.left = autoplayCheckbox.checked ? "21px" : "3px";
    };
    paintSwitch();
    autoplayCheckbox.addEventListener("change", paintSwitch);

    const categorySelect = modal.querySelector("#bnr-category");
    (async () => {
        try {
            const apiUrl = document.querySelector('meta[name="api-banners-url"]')?.content ?? "/api/banners/active";
            const res = await fetch(apiUrl, { headers: { Accept: "application/json" } });
            if (!res.ok) return;
            const all = await res.json();
            if (!Array.isArray(all)) return;
            const categories = [...new Set(all.map((b) => b.category).filter(Boolean))].sort();
            categories.forEach((c) => {
                const opt = document.createElement("option");
                opt.value = c;
                opt.textContent = c;
                categorySelect.appendChild(opt);
            });
            categorySelect.value = currentCategory;
        } catch {}
    })();

    const close = () => overlay.remove();
    modal.querySelector("#bnr-modal-close").onclick = close;
    modal.querySelector("#bnr-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#bnr-modal-save").onclick = () => {
        component.addAttributes({
            "data-autoplay": autoplayCheckbox.checked ? "true" : "false",
            "data-category": categorySelect.value || "",
        });
        close();
    };
}

export const bannerBlocks = [
    {
        id: "banner-hero",
        label: "Banner Slider",
        category: "Banners",
        media: BANNER_BLOCK_ICON,
        content: { type: "banner-hero-component" },
    },
];

export function initializeBannerBlocks(editor) {
    const componentType = "banner-hero-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) => (el.getAttribute?.("data-gjs-type") === componentType ? { type: componentType } : false),

        model: {
            defaults: {
                name: "Banner Slider",
                tagName: "section",
                draggable: true,
                droppable: false,
                editable: false,
                stylable: false,
                resizable: false,
                selectable: true,
                hoverable: true,
                layerable: true,
                highlightable: false,
                copyable: false,
                removable: true,
                attributes: {
                    "data-gjs-type": componentType,
                    "data-autoplay": "true",
                    "data-category": "",
                },
                components: `
                    <div class="banner-wrapper"
                         data-gjs-editable="false" data-gjs-selectable="false"
                         data-gjs-hoverable="false" data-gjs-droppable="false"
                         data-gjs-highlightable="false">
                        <div class="banner-slide-container"
                             data-gjs-editable="false" data-gjs-selectable="false"
                             data-gjs-hoverable="false" data-gjs-droppable="false"
                             data-gjs-highlightable="false">
                        </div>
                        <div class="banner-dots-wrapper"
                             data-gjs-editable="false" data-gjs-selectable="false"
                             data-gjs-hoverable="false" data-gjs-droppable="false"
                             data-gjs-highlightable="false">
                            <div class="banner-dots"></div>
                        </div>
                        <div class="banner-stripe"
                             data-gjs-editable="false" data-gjs-selectable="false"
                             data-gjs-hoverable="false" data-gjs-droppable="false"
                             data-gjs-highlightable="false">
                        </div>
                    </div>
                `,
                script: createBannerScript(),
                toolbar: [],
                traits: [
                    {
                        type: "button",
                        label: "Banner Slider",
                        text: "Administrar Banner Slider",
                        full: true,
                        command: "open-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
                this.on("change:attributes", () => {
                    const el = this.getEl();
                    if (!el) return;
                    const script = this.get("script");
                    if (script && typeof script === "function") {
                        setTimeout(() => script.call(el), 100);
                    }
                });
            },
        },
    });

    editor.Commands.add("open-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showBannerConfigModal(ed, selected);
        },
    });

    setupBannerEditorEvents(editor, componentType);
    injectBannerEditorStyles(editor, componentType);
}

function setupBannerEditorEvents(editor, componentType) {
    editor.on("storage:end:load", () => {
        setTimeout(() => reinitializeBannerComponents(editor, componentType), 1000);
    });

    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (el?.getAttribute?.("data-gjs-type") === componentType) {
            component.set("type", componentType);
            setTimeout(() => {
                const script = component.get("script");
                if (script && typeof script === "function") script.call(el);
            }, 500);
        }
    });

    editor.on("component:clone", (component) => {
        if (component.get("type") === componentType) {
            const el = component.getEl();
            if (el) {
                setTimeout(() => {
                    const script = component.get("script");
                    if (script && typeof script === "function") script.call(el);
                }, 500);
            }
        }
    });

    editor.on("canvas:render", () => {
        setTimeout(() => reinitializeBannerComponents(editor, componentType), 800);
    });

    editor.on("storage:start:store", () => {
        editor
            .getWrapper()
            .find(`[data-gjs-type="${componentType}"]`)
            .forEach((comp) => {
                comp.set("type", componentType);
                comp.addAttributes({ "data-gjs-type": componentType });
            });
    });
}

function reinitializeBannerComponents(editor, componentType) {
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

function injectBannerEditorStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const head = iframe.contentDocument?.head;
        if (!head) return;

        ensureGlobalStyle(iframe.contentDocument, "banner-hero-styles", BANNER_RUNTIME_STYLES);
        ensureGlobalStyle(iframe.contentDocument, "banner-skeleton-styles", BANNER_SKELETON_STYLES);

        if (!head.querySelector(`#${componentType}-editor-css`)) {
            const s = document.createElement("style");
            s.id = `${componentType}-editor-css`;
            s.textContent = `[data-gjs-type="${componentType}"] * { pointer-events: none !important; } [data-gjs-type="${componentType}"].gjs-selected, [data-gjs-type="${componentType}"].gjs-hovered { outline: 2px dashed rgba(240,135,42,0.6) !important; outline-offset: 2px; }`;
            head.appendChild(s);
        }
    });
}