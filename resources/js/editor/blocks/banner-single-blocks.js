const bannerSingleBlockIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="17" y="8" width="12" height="14" fill="#E97300" rx="2"/>
    <rect x="19" y="10" width="8" height="10" fill="#f8e7d8" rx="1"/>
</svg>`;

const BANNER_SINGLE_STYLES = `
.bsingle-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}
.bsingle-inner{position:relative;width:100%;min-height:480px;display:flex;align-items:center;}
.bsingle-bg{position:absolute;inset:0;z-index:0;}
.bsingle-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.bsingle-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}
.bsingle-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}
.bsingle-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}
.bsingle-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}
.bsingle-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}
.bsingle-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}
.bsingle-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}
.bsingle-stripe{position:relative;width:100%;height:40px;background:#E97300;z-index:20;}
@media(max-width:768px){
    .bsingle-inner{min-height:340px;}
    .bsingle-bg img{object-position:right center;}
    .bsingle-content{max-width:100%;width:100%;padding:32px 24px 80px;}
    .bsingle-buttons{flex-wrap:wrap;gap:12px;}
    .bsingle-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}
}
@media(max-width:480px){
    .bsingle-btn{flex:1 1 100%;min-width:0;}
}`;

function createBannerSingleScript() {
    return function () {
        const section = this;
        const apiEndpoint = document.querySelector('meta[name="api-banners-url"]')?.content ?? '/api/banners/active';

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

        const INLINE_STYLES = `.bsingle-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.bsingle-inner{position:relative;width:100%;min-height:480px;display:flex;align-items:center;}.bsingle-bg{position:absolute;inset:0;z-index:0;}.bsingle-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.bsingle-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.bsingle-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.bsingle-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.bsingle-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.bsingle-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.bsingle-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.bsingle-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.bsingle-stripe{position:relative;width:100%;height:40px;background:#E97300;z-index:20;}@media(max-width:768px){.bsingle-inner{min-height:340px;}.bsingle-bg img{object-position:right center;}.bsingle-content{max-width:100%;width:100%;padding:32px 24px 80px;}.bsingle-buttons{flex-wrap:wrap;gap:12px;}.bsingle-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.bsingle-btn{flex:1 1 100%;min-width:0;}}`;

        (function ensureStyles() {
            const doc = section.ownerDocument ?? document;
            if (!doc.getElementById("banner-single-styles")) {
                const s = doc.createElement("style");
                s.id = "banner-single-styles";
                s.textContent = INLINE_STYLES;
                doc.head.appendChild(s);
            }
        })();

        const bannerId = section.dataset.bannerId ?? "";

        const container = section.querySelector(".bsingle-content-wrapper");

        async function loadBanner() {
            showSkeleton();
            try {
                const res = await fetch(apiEndpoint);
                const all = await res.json();
                if (!Array.isArray(all) || all.length === 0) {
                    showEmpty();
                    return;
                }

                const banner = bannerId
                    ? all.find((b) => String(b.id) === String(bannerId))
                    : all[0];

                if (!banner) {
                    showEmpty();
                    return;
                }
                renderBanner(banner);
            } catch {
                showEmpty();
            }
        }

        function showSkeleton() {
            container.innerHTML = `
                <div class="bsingle-inner">
                    <div class="bsingle-bg bsk-bg-img"></div>
                    <div class="bsingle-overlay"></div>
                    <div class="bsingle-content">
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
                </div>`;

            const doc = section.ownerDocument ?? document;
            if (!doc.getElementById("banner-skeleton-styles")) {
                const s = doc.createElement("style");
                s.id = "banner-skeleton-styles";
                s.textContent = `@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title--short{width:60%;}.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-line--short{width:55%;}.bsk-buttons{display:flex;gap:16px;margin-top:36px;}.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}@media(max-width:768px){.bsk-buttons{flex-direction:column;}}`;
                doc.head.appendChild(s);
            }
        }

        function resolveButtonStyle(style) {
            return BUTTON_STYLES[style] ?? BUTTON_STYLES["fill-white"];
        }

        function buildButton(text, url, style, external) {
            const s = resolveButtonStyle(style);
            const tag = url ? "a" : "span";
            const attrs = url
                ? `href="${url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}`
                : "";
            return `<${tag} ${attrs}
                class="bsingle-btn"
                data-bg="${s.bg}"
                data-color="${s.color}"
                data-border="${s.border}"
                data-hover-bg="${s.hoverBg}"
                data-hover-color="${s.hoverColor}"
                style="background:${s.bg};color:${s.color};border:2px solid ${s.border};">
                ${text}
            </${tag}>`;
        }

        function renderBanner(banner) {
            container.innerHTML = `
                <div class="bsingle-inner">
                    <div class="bsingle-bg">
                        <img src="${banner.image_url}"
                             alt="${banner.image_alt ?? banner.title}"
                             loading="eager"
                             decoding="async"
                             fetchpriority="high"
                             draggable="false">
                    </div>
                    <div class="bsingle-overlay"></div>
                    <div class="bsingle-content">
                        ${banner.category ? `<span class="bsingle-category-badge">${banner.category}</span>` : ""}
                        <h2 class="bsingle-title">${banner.title}</h2>
                        <p class="bsingle-description">${banner.description}</p>
                        ${banner.btn_primary_text || banner.btn_secondary_text ? `
                            <div class="bsingle-buttons">
                                ${banner.btn_primary_text ? buildButton(banner.btn_primary_text, banner.btn_primary_url, banner.btn_primary_style, banner.btn_primary_external) : ""}
                                ${banner.btn_secondary_text ? buildButton(banner.btn_secondary_text, banner.btn_secondary_url, banner.btn_secondary_style, banner.btn_secondary_external) : ""}
                            </div>` : ""}
                    </div>
                </div>`;

            attachButtonHover();
        }

        function attachButtonHover() {
            section.querySelectorAll(".bsingle-btn").forEach((btn) => {
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

        function showEmpty() {
            container.innerHTML = `
                <div style="display:flex;align-items:center;justify-content:center;
                            min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;">
                    No hay banner seleccionado o no está activo.
                </div>`;
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", loadBanner);
        } else {
            loadBanner();
        }
    };
}

export const bannerSingleBlocks = [
    {
        id: "banner-single",
        label: "Banner Individual",
        category: "Banners",
        media: bannerSingleBlockIcon,
        content: { type: "banner-single-component" },
    },
];

export function initializeBannerSingleBlocks(editor) {
    const componentType = "banner-single-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) => {
            if (el.getAttribute?.("data-gjs-type") === componentType) {
                return { type: componentType };
            }
            return false;
        },

        model: {
            defaults: {
                name: "Banner Individual",
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
                    "data-banner-id": "",
                },
                components: `
                    <div class="bsingle-wrapper"
                         data-gjs-editable="false" data-gjs-selectable="false"
                         data-gjs-hoverable="false" data-gjs-droppable="false"
                         data-gjs-highlightable="false">
                        <div class="bsingle-content-wrapper"
                             data-gjs-editable="false" data-gjs-selectable="false"
                             data-gjs-hoverable="false" data-gjs-droppable="false"
                             data-gjs-highlightable="false">
                        </div>
                        <div class="bsingle-stripe"
                             data-gjs-editable="false" data-gjs-selectable="false"
                             data-gjs-hoverable="false" data-gjs-droppable="false"
                             data-gjs-highlightable="false">
                        </div>
                    </div>
                `,
                script: createBannerSingleScript(),
                traits: [
                    {
                        type: "select",
                        name: "data-banner-id",
                        label: "Banner a mostrar",
                        options: [{ id: "", name: "Cargando banners..." }],
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

    setupSingleEditorEvents(editor, componentType);
    injectSingleEditorStyles(editor, componentType);
    loadBannerOptions(editor, componentType);
}

async function loadBannerOptions(editor, componentType) {
    try {
        const apiUrl = document.querySelector('meta[name="api-banners-url"]')?.content ?? '/api/banners/active';
        const res = await fetch(apiUrl);
        const all = await res.json();
        if (!Array.isArray(all) || all.length === 0) return;

        const type = editor.DomComponents.getType(componentType);
        if (!type) return;

        const traits = type.model.prototype.defaults.traits;
        const bannerTrait = traits.find((t) => t.name === "data-banner-id");
        if (!bannerTrait) return;

        bannerTrait.options = [
            { id: "", name: "— Seleccionar banner —" },
            ...all.map((b) => ({
                id: String(b.id),
                name: b.category ? `[${b.category}] ${b.title}` : b.title,
            })),
        ];
    } catch {}
}

function setupSingleEditorEvents(editor, componentType) {
    editor.on("storage:end:load", () => {
        setTimeout(
            () => reinitializeSingleComponents(editor, componentType),
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
            () => reinitializeSingleComponents(editor, componentType),
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

function reinitializeSingleComponents(editor, componentType) {
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

function injectSingleEditorStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const head = iframe.contentDocument?.head;
        if (!head) return;

        if (!head.querySelector("#banner-single-styles")) {
            const s = document.createElement("style");
            s.id = "banner-single-styles";
            s.textContent = BANNER_SINGLE_STYLES;
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
