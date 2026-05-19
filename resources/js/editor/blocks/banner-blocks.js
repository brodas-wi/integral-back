const bannerBlockIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <circle cx="23" cy="14" r="5" fill="#E97300"/>
    <circle cx="23" cy="14" r="4" fill="#f8e7d8"/>
</svg>`;

const BANNER_STYLES = `
.banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}
.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;}
.banner-slide-container:active{cursor:grabbing;}
.banner-slide-container{display:grid;}
.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}
.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}
.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}
.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;flex:1;padding:64px 64px 96px;max-width:54%;}
.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}
.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}
.banner-description{color:rgba(255,255,255,0.82);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:480px;}
.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}
.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}
.banner-image-col{position:relative;width:46%;display:flex;align-items:center;justify-content:center;padding:48px 48px 96px 0;flex-shrink:0;}
.banner-image-glow{position:absolute;inset:-24px;border-radius:50%;background:radial-gradient(circle,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.2) 55%,transparent 75%);filter:blur(16px);z-index:0;}
.banner-image{position:relative;z-index:1;max-height:380px;max-width:100%;width:auto;object-fit:contain;filter:drop-shadow(0 12px 40px rgba(0,0,0,0.4));}
.banner-dots-wrapper{display:none;}
.banner-stripe{position:relative;width:100%;height:48px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}
.banner-dots{display:flex;gap:8px;align-items:center;}
.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}
.banner-dot--active{width:28px;background:#ffffff;}
@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}
@media(max-width:480px){
    .banner-btn{flex:1 1 100%;min-width:0;}
}`;

function createBannerScript() {
    return function () {
        const section = this;
        const apiEndpoint = "/api/banners/active";

        const BUTTON_STYLES = {
            "fill-blue": {
                bg: "#003B71",
                color: "#ffffff",
                border: "#003B71",
                hoverBg: "#002a52",
                hoverColor: "#ffffff",
            },
            "outline-blue": {
                bg: "transparent",
                color: "#003B71",
                border: "#003B71",
                hoverBg: "#003B71",
                hoverColor: "#ffffff",
            },
            "fill-orange": {
                bg: "#E97300",
                color: "#ffffff",
                border: "#E97300",
                hoverBg: "#c96200",
                hoverColor: "#ffffff",
            },
            "outline-orange": {
                bg: "transparent",
                color: "#E97300",
                border: "#E97300",
                hoverBg: "#E97300",
                hoverColor: "#ffffff",
            },
            "fill-white": {
                bg: "#ffffff",
                color: "#003B71",
                border: "#ffffff",
                hoverBg: "#dce8f5",
                hoverColor: "#003B71",
            },
            "outline-white": {
                bg: "transparent",
                color: "#ffffff",
                border: "#ffffff",
                hoverBg: "#ffffff",
                hoverColor: "#003B71",
            },
        };

        const INLINE_STYLES = `.banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;}.banner-slide-container:active{cursor:grabbing;}.banner-slide-container{display:grid;}.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}.banner-bg{position:absolute;inset:0;z-index:0;}.banner-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.banner-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.banner-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.banner-dots-wrapper{display:none;}.banner-stripe{position:relative;width:100%;height:48px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}.banner-dots{display:flex;gap:8px;align-items:center;}.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}.banner-dot--active{width:28px;background:#ffffff;}@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}`;

        (function ensureStyles() {
            const doc = section.ownerDocument ?? document;
            if (!doc.getElementById("banner-hero-styles")) {
                const s = doc.createElement("style");
                s.id = "banner-hero-styles";
                s.textContent = INLINE_STYLES;
                doc.head.appendChild(s);
            }
        })();

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
        const dotsWrapper = section.querySelector(".banner-dots");

        async function loadBanners() {
            showSkeleton();
            try {
                const res = await fetch(apiEndpoint);
                const all = await res.json();
                banners = Array.isArray(all)
                    ? category
                        ? all.filter((b) => b.category === category)
                        : all
                    : [];
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
                </div>
            `;

            const doc = section.ownerDocument ?? document;
            if (!doc.getElementById("banner-skeleton-styles")) {
                const s = doc.createElement("style");
                s.id = "banner-skeleton-styles";
                s.textContent = `
                    @keyframes bsk-shimmer {
                        0%   { background-position: -600px 0; }
                        100% { background-position:  600px 0; }
                    }
                    .bsk-base {
                        background: linear-gradient(90deg,
                            rgba(255,255,255,0.06) 25%,
                            rgba(255,255,255,0.14) 50%,
                            rgba(255,255,255,0.06) 75%);
                        background-size: 600px 100%;
                        animation: bsk-shimmer 1.6s infinite linear;
                        border-radius: 8px;
                    }
                    .bsk-badge{
                        width:120px;height:32px;margin-bottom:20px;border-radius:999px;
                        background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);
                        background-size:600px 100%;
                        animation:bsk-shimmer 1.6s infinite linear;
                    }
                    .bsk-title{
                        height:40px;margin-bottom:12px;border-radius:8px;
                        background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);
                        background-size:600px 100%;
                        animation:bsk-shimmer 1.6s infinite linear;
                    }
                    .bsk-title--short{width:60%;height:40px;}
                    .bsk-line{
                        height:16px;margin-bottom:10px;border-radius:6px;
                        background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);
                        background-size:600px 100%;
                        animation:bsk-shimmer 1.6s infinite linear;
                    }
                    .bsk-line--short{width:55%;}
                    .bsk-buttons{display:flex;gap:16px;margin-top:36px;}
                    .bsk-btn{
                        height:48px;flex:1;border-radius:999px;
                        background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);
                        background-size:600px 100%;
                        animation:bsk-shimmer 1.6s infinite linear;
                    }
                    .bsk-bg-img{
                        background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);
                        background-size:600px 100%;
                        animation:bsk-shimmer 1.6s infinite linear;
                    }
                    @media(max-width:768px){
                        .bsk-buttons{flex-direction:column;}
                    }
                `;
                doc.head.appendChild(s);
            }
        }

        function resolveButtonStyle(style) {
            if (BUTTON_STYLES[style]) return BUTTON_STYLES[style];
            if (style === "outline-blue" || style === "outline-orange") {
                return BUTTON_STYLES["outline-white"];
            }
            return BUTTON_STYLES["fill-white"];
        }

        function buildButton(text, url, style, external) {
            const s = resolveButtonStyle(style);
            const tag = url ? "a" : "span";
            const attrs = url
                ? `href="${url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}`
                : "";
            return `<${tag} ${attrs}
                class="banner-btn"
                data-bg="${s.bg}"
                data-color="${s.color}"
                data-hover-bg="${s.hoverBg}"
                data-hover-color="${s.hoverColor}"
                style="background:${s.bg};color:${s.color};border:2px solid ${s.border};">
                ${text}
            </${tag}>`;
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
                            ${banner.btn_primary_text || banner.btn_secondary_text ? `
                                <div class="banner-buttons">
                                    ${banner.btn_primary_text ? buildButton(banner.btn_primary_text, banner.btn_primary_url, banner.btn_primary_style, banner.btn_primary_external) : ""}
                                    ${banner.btn_secondary_text ? buildButton(banner.btn_secondary_text, banner.btn_secondary_url, banner.btn_secondary_style, banner.btn_secondary_external) : ""}
                                </div>` : ""}
                        </div>
                    </div>
                </div>
            `,
                )
                .join("");

            attachButtonHover();
            attachSwipe();
            preloadImages();
        }

        function attachButtonHover() {
            section.querySelectorAll(".banner-btn").forEach((btn) => {
                const originalBorder = btn.style.borderColor;
                btn.addEventListener("mouseenter", () => {
                    btn.style.background = btn.dataset.hoverBg;
                    btn.style.color = btn.dataset.hoverColor;
                    btn.style.borderColor = btn.dataset.hoverBg;
                });
                btn.addEventListener("mouseleave", () => {
                    btn.style.background = btn.dataset.bg;
                    btn.style.color = btn.dataset.color;
                    btn.style.borderColor = originalBorder;
                });
            });
        }

        function attachSwipe() {
            container.addEventListener("mousedown", onDragStart);
            container.addEventListener("touchstart", onDragStart, {
                passive: true,
            });
            container.addEventListener("mousemove", onDragMove);
            container.addEventListener("touchmove", onDragMove, {
                passive: true,
            });
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
            dragDelta =
                (e.touches ? e.touches[0].clientX : e.clientX) - dragStartX;
        }

        function onDragEnd() {
            if (!isDragging) return;
            isDragging = false;
            if (Math.abs(dragDelta) >= SWIPE_THRESHOLD) {
                goTo(
                    dragDelta < 0
                        ? (currentIndex + 1) % banners.length
                        : (currentIndex - 1 + banners.length) % banners.length,
                );
                resetAutoplay();
            }
            dragDelta = 0;
        }

        function renderDots() {
            const stripe = section.querySelector(".banner-stripe");
            if (!stripe) return;

            if (banners.length <= 1) return;

            const dotsContainer = document.createElement("div");
            dotsContainer.className = "banner-dots";

            banners.forEach((_, i) => {
                const dot = document.createElement("button");
                dot.className = "banner-dot";
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

            dots.forEach((dot, i) => {
                dot.classList.toggle("banner-dot--active", i === index);
            });

            currentIndex = index;
        }

        function startAutoplay() {
            if (banners.length <= 1 || !autoplay) return;
            autoplayTimer = setInterval(() => {
                goTo((currentIndex + 1) % banners.length);
            }, 5000);
        }

        function resetAutoplay() {
            if (!autoplay) return;
            clearInterval(autoplayTimer);
            startAutoplay();
        }

        function showEmpty() {
            const wrapper = section.querySelector(".banner-wrapper");
            if (wrapper) {
                wrapper.innerHTML = `
                    <div style="display:flex;align-items:center;justify-content:center;
                                min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;">
                        Sin contenido.
                    </div>`;
            }
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", loadBanners);
        } else {
            loadBanners();
        }
    };
}

export const bannerBlocks = [
    {
        id: "banner-hero",
        label: "Banner Slider",
        category: "Banners",
        media: bannerBlockIcon,
        content: { type: "banner-hero-component" },
    },
];

export function initializeBannerBlocks(editor) {
    const componentType = "banner-hero-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) => {
            if (el.getAttribute?.("data-gjs-type") === componentType) {
                return { type: componentType };
            }
            return false;
        },

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
                traits: [
                    {
                        type: "select",
                        name: "data-autoplay",
                        label: "Avance automático",
                        options: [
                            { id: "true", name: "Activado" },
                            { id: "false", name: "Desactivado" },
                        ],
                        changeProp: false,
                    },
                    {
                        type: "select",
                        name: "data-category",
                        label: "Filtrar por categoría",
                        options: [{ id: "", name: "Todas las categorías" }],
                        changeProp: false,
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

    setupBannerEditorEvents(editor, componentType);
    injectEditorStyles(editor, componentType);
    loadCategoryOptions(editor, componentType);
}

async function loadCategoryOptions(editor, componentType) {
    try {
        const res = await fetch("/api/banners/active");
        const all = await res.json();
        if (!Array.isArray(all)) return;

        const categories = [
            ...new Set(all.map((b) => b.category).filter(Boolean)),
        ].sort();
        if (categories.length === 0) return;

        const type = editor.DomComponents.getType(componentType);
        if (!type) return;

        const traits = type.model.prototype.defaults.traits;
        const categoryTrait = traits.find((t) => t.name === "data-category");
        if (!categoryTrait) return;

        categoryTrait.options = [
            { id: "", name: "Todas las categorías" },
            ...categories.map((c) => ({ id: c, name: c })),
        ];
    } catch {}
}

function setupBannerEditorEvents(editor, componentType) {
    editor.on("storage:end:load", () => {
        setTimeout(
            () => reinitializeBannerComponents(editor, componentType),
            1000,
        );
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
        setTimeout(
            () => reinitializeBannerComponents(editor, componentType),
            800,
        );
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

function injectEditorStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const head = iframe.contentDocument?.head;
        if (!head) return;

        if (!head.querySelector("#banner-hero-styles")) {
            const s = document.createElement("style");
            s.id = "banner-hero-styles";
            s.textContent = BANNER_STYLES;
            head.appendChild(s);
        }

        if (!head.querySelector(`#${componentType}-editor-css`)) {
            const s = document.createElement("style");
            s.id = `${componentType}-editor-css`;
            s.textContent = `
                [data-gjs-type="${componentType}"] * { pointer-events: none !important; }
                [data-gjs-type="${componentType}"].gjs-selected,
                [data-gjs-type="${componentType}"].gjs-hovered {
                    outline: 2px dashed rgba(240,135,42,0.6) !important;
                    outline-offset: 2px;
                }
            `;
            head.appendChild(s);
        }
    });
}
