import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

function responsiveStyleInjectorScript() {
    const el = this;
    const cssContent = el.getAttribute("data-css-content");
    if (!cssContent) return;
    const doc = el.ownerDocument;
    const styleId = "ob-responsive-" + el.id;
    if (doc.getElementById(styleId)) return;
    const styleTag = doc.createElement("style");
    styleTag.id = styleId;
    styleTag.textContent = cssContent;
    doc.head.appendChild(styleTag);
}

function buildOptionsBannerHTML(data, uid) {
    uid = uid || "ob" + Math.random().toString(36).slice(2, 7);

    const sectionStyle = `width:100%;max-width:1600px;margin:0 auto;padding:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;`;
    const wrapperStyle = `position:relative;width:100%;background:#E97300;border-radius:clamp(28px,4vw,40px);padding:clamp(1.5rem,3.5vw,2.75rem);box-sizing:border-box;`;

    const headerStyle = `display:flex;align-items:flex-start;justify-content:space-between;gap:1.5rem;margin-bottom:clamp(1.5rem,3vw,2.25rem);flex-wrap:wrap;`;
    const headerTextWrapStyle = `display:flex;flex-direction:column;gap:0.75rem;flex:1;min-width:240px;`;
    const titleStyle = `margin:0;color:#fff;font-weight:800;font-size:clamp(1.25rem,2.6vw,1.875rem);line-height:1.1;`;
    const subtitleStyle = `margin:0;color:#fff;font-weight:500;font-size:clamp(1rem,1.8vw,1.25rem);line-height:1.35;`;

    const btnStyle = `display:inline-flex;align-items:center;justify-content:center;align-self:flex-start;padding:clamp(0.5rem,1.5vw,0.75rem) clamp(1.125rem,3vw,1.75rem);border-radius:9999px;background:#14243D;color:#fff;font-weight:600;font-size:clamp(0.75rem,1.6vw,0.9375rem);text-decoration:none;transition:background 0.2s ease,color 0.2s ease;white-space:nowrap;width:fit-content;`;

    const iconStyle = `width:clamp(48px,6vw,72px);height:clamp(48px,6vw,72px);object-fit:contain;flex-shrink:0;`;

    const buttonHtml = data.button_label
        ? `<a href="${data.button_href || "#"}" id="ob-btn-${uid}" style="${btnStyle}">${data.button_label}</a>`
        : "";

    const iconHtml = data.icon_url
        ? `<img src="${data.icon_url}" alt="" style="${iconStyle}">`
        : "";

    const headerHtml = `<div class="ob-header-${uid}" style="${headerStyle}">
        <div class="ob-header-text-${uid}" style="${headerTextWrapStyle}">
            <h2 style="${titleStyle}">${data.title || "Título"}</h2>
            <p style="${subtitleStyle}">${data.subtitle || "Subtítulo"}</p>
            ${buttonHtml}
        </div>
        ${iconHtml}
    </div>`;

    const cards = data.cards || [];
    const gridStyle = `display:grid;grid-template-columns:repeat(auto-fit,minmax(440px,1fr));max-width:920px;gap:clamp(1rem,2vw,1.5rem);`;

    const cardsHtml = cards
        .map((card) => buildOptionCardHTML(card, uid))
        .join("");

    const gridHtml = `<div style="${gridStyle}">${cardsHtml}</div>`;

    const cardPaddingMobile = `0.875rem`;

    const responsiveCss = `@media(max-width:640px){#ob-root-${uid} .ob-header-${uid}{justify-content:center;}#ob-root-${uid} .ob-header-text-${uid}{align-items:center;text-align:center;}#ob-root-${uid} .ob-header-text-${uid} a{width:100%;}#ob-root-${uid} .ob-card-${uid}{grid-template-columns:1fr !important;justify-items:center;text-align:center;}#ob-root-${uid} .ob-card-img-col-${uid}{justify-content:center;}#ob-root-${uid} .ob-card-body-${uid}{align-items:center;padding-left:0 !important;padding-top:${cardPaddingMobile};}}`;

    return `<section id="ob-root-${uid}" style="${sectionStyle}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div style="${wrapperStyle}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">${headerHtml}${gridHtml}</div><div data-gjs-type="ob-responsive-style" data-css-content="${responsiveCss.replace(/"/g, "&quot;")}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div></section>`;
}

function buildOptionCardHTML(card, uid) {
    const image = card.image || assetUrl("images/placeholder.svg");
    const badge = card.badge || "Etiqueta";
    const desc = card.desc || "Descripción breve.";

    const cardPadding = `clamp(0.875rem,2vw,1.25rem)`;
    const cardStyle = `background:#fff;border-radius:16px;box-shadow:0 8px 28px rgba(0,0,0,0.22);overflow:hidden;display:grid;grid-template-columns:clamp(90px,25%,140px) 1fr;gap:0;padding:${cardPadding};box-sizing:border-box;`;
    const imgColStyle = `display:flex;align-items:center;`;
    const imgWrapStyle = `position:relative;width:100%;aspect-ratio:1/1;border-radius:12px;overflow:hidden;`;
    const imgStyle = `position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;`;
    const bodyStyle = `padding-left:${cardPadding};display:flex;flex-direction:column;justify-content:center;gap:0.625rem;min-width:0;`;
    const badgeStyle = `display:inline-flex;align-items:center;padding:0.375rem 0.875rem;border-radius:9999px;background:#14243D;color:#fff;font-weight:600;font-size:0.75rem;width:fit-content;`;
    const descStyle = `margin:0;color:#1e293b;font-size:0.8125rem;line-height:1.45;`;

    return `<div class="ob-card-${uid}" style="${cardStyle}">
        <div class="ob-card-img-col-${uid}" style="${imgColStyle}">
            <div style="${imgWrapStyle}">
                <img src="${image}" alt="${badge}" style="${imgStyle}">
            </div>
        </div>
        <div class="ob-card-body-${uid}" style="${bodyStyle}">
            <span style="${badgeStyle}">${badge}</span>
            <p style="${descStyle}">${desc}</p>
        </div>
    </div>`;
}

const DEFAULT_DATA = {
    title: "Protege lo que más importa.",
    subtitle: "Conoce tus opciones",
    button_label: "Solicitar información",
    button_href: "#",
    icon_url: "",
    cards: [
        {
            image: "",
            badge: "Seguro de Salud",
            desc: "Una opción con tu crédito para cuidar de tu salud.",
        },
        {
            image: "",
            badge: "Seguro de Vida",
            desc: "Tu esfuerzo, tus sueños y el bienestar de quienes más quieres merecen un respaldo.",
        },
        {
            image: "",
            badge: "Multiasistencias",
            desc: "Médica, hogar y vial carro o moto.",
        },
    ],
};

function showOptionsBannerModal(editor, component) {
    const existing = document.getElementById("ob-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("ob-modal-styles")) {
        const style = document.createElement("style");
        style.id = "ob-modal-styles";
        style.textContent = `
            .ob-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .ob-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:720px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .ob-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .ob-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .ob-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .ob-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .ob-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .ob-modal-close:hover{background:#f1f5f9;color:#475569;}
            .ob-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
            .ob-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
            .ob-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .ob-tab-btn i{font-size:1rem;}
            .ob-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .ob-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .ob-tab-panel.active{display:flex;}
            .ob-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .ob-card-config-header{display:flex;align-items:center;gap:0.5rem;}
            .ob-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
            .ob-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .ob-input:focus{border-color:#003B71;}
            .ob-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;box-sizing:border-box;width:100%;}
            .ob-row{display:flex;gap:0.75rem;align-items:flex-start;}
            .ob-img-preview{width:64px;height:64px;border-radius:0.5rem;object-fit:cover;border:1px solid #e2e8f0;background:#f1f5f9;flex-shrink:0;}
            .ob-img-placeholder{width:64px;height:64px;border-radius:0.5rem;background:#f1f5f9;border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
            .ob-img-placeholder i{font-size:1.5rem;color:#94a3b8;}
            .ob-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:9999px;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .ob-pick-btn:hover{background:#002a52;}
            .ob-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.375rem;display:flex;align-items:center;justify-content:center;border-radius:9999px;transition:background 0.15s;}
            .ob-btn-remove:hover{background:#fef2f2;}
            .ob-btn-add{padding:0.5rem 1.25rem;border:none;border-radius:9999px;color:#fff;font-size:0.8125rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;background:#003B71;}
            .ob-btn-add:hover{background:#002a52;}
            .ob-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .ob-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;}
            .ob-btn-cancel:hover{background:#f8fafc;}
            .ob-btn-save{padding:0.5rem 1.25rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .ob-btn-save:hover{background:#c96200;}
            .ob-card-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
            .ob-btn-backup{padding:0.5rem 1rem;background:#fff;border:2px solid #003B71;border-radius:9999px;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;}
            .ob-btn-backup:hover{background:#003B71;color:#fff;}
            .ob-btn-restore{padding:0.5rem 1rem;background:#fff;border:2px solid #0d9488;border-radius:9999px;color:#0d9488;font-size:0.8125rem;font-weight:600;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;user-select:none;cursor:pointer;}
            .ob-btn-restore:hover{background:#0d9488;color:#fff;}
            .ob-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
            .ob-confirm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
            .ob-confirm-header{padding:1rem 1.25rem 0.75rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
            .ob-confirm-header i{font-size:1.25rem;color:#E97300;}
            .ob-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
            .ob-confirm-body{padding:1rem 1.25rem;}
            .ob-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
            .ob-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;background:#f1f5f9;border-radius:0.375rem;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
            .ob-confirm-footer{padding:0.75rem 1.25rem 1rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
            .ob-confirm-cancel{padding:0.5rem 1.125rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .ob-confirm-cancel:hover{background:#f1f5f9;}
            .ob-confirm-ok{padding:0.5rem 1.125rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .ob-confirm-ok:hover{background:#d97821;}
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-options-banner-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const data = {
        title: currentData.title ?? DEFAULT_DATA.title,
        subtitle: currentData.subtitle ?? DEFAULT_DATA.subtitle,
        button_label: currentData.button_label ?? DEFAULT_DATA.button_label,
        button_href: currentData.button_href ?? DEFAULT_DATA.button_href,
        icon_url: currentData.icon_url ?? DEFAULT_DATA.icon_url,
        cards: JSON.parse(
            JSON.stringify(currentData.cards ?? DEFAULT_DATA.cards),
        ),
    };

    const overlay = document.createElement("div");
    overlay.id = "ob-config-modal";
    overlay.className = "ob-overlay";

    const modal = document.createElement("div");
    modal.className = "ob-modal";
    modal.innerHTML = `
        <div class="ob-modal-header">
            <div class="ob-modal-header-left"><i class="ri-shield-check-line"></i><h2>Configurar Banner de Opciones</h2></div>
            <button id="ob-modal-close" class="ob-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="ob-modal-tabs">
            <button class="ob-tab-btn active" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
            <button class="ob-tab-btn" data-tab="cards"><i class="ri-layout-grid-line"></i> Tarjetas</button>
        </div>
        <div class="ob-modal-body">
            <div class="ob-tab-panel active" id="ob-panel-general">
                <div class="ob-card">
                    <label class="ob-label">Título</label>
                    <input id="ob-title" type="text" class="ob-input" value="${data.title}">
                </div>
                <div class="ob-card">
                    <label class="ob-label">Subtítulo</label>
                    <input id="ob-subtitle" type="text" class="ob-input" value="${data.subtitle}">
                </div>
                <div class="ob-card">
                    <label class="ob-label">Botón CTA</label>
                    <div style="display:flex;flex-direction:column;gap:0.625rem;">
                        <input id="ob-button-label" type="text" placeholder="Solicitar información" value="${data.button_label}" class="ob-input">
                        <input id="ob-button-href" type="text" placeholder="URL o #" value="${data.button_href}" class="ob-input">
                    </div>
                </div>
                <div class="ob-card">
                    <label class="ob-label">Ícono/imagen esquina superior derecha (opcional)</label>
                    <div class="ob-row">
                        <div id="ob-icon-wrap">${data.icon_url ? `<img class="ob-img-preview" src="${data.icon_url}" alt="">` : `<div class="ob-img-placeholder"><i class="ri-image-line"></i></div>`}</div>
                        <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                            <input id="ob-icon-url" class="ob-input-sm" placeholder="URL de la imagen" value="${data.icon_url}">
                            <button id="ob-icon-pick" class="ob-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ob-tab-panel" id="ob-panel-cards">
                <div id="ob-cards-list" style="display:flex;flex-direction:column;gap:0.75rem;"></div>
                <button id="ob-add-card" class="ob-btn-add" style="align-self:flex-start;">
                    <i class="ri-add-line"></i> Agregar tarjeta
                </button>
            </div>
        </div>
        <div class="ob-modal-footer">
            <button id="ob-modal-cancel" class="ob-btn-cancel">Cancelar</button>
            <div style="display:flex;gap:0.5rem;margin-right:auto;">
                <button id="ob-modal-backup" class="ob-btn-backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <label id="ob-modal-restore-label" class="ob-btn-restore" title="Restaurar configuración desde JSON"><i class="ri-upload-2-line"></i> Restaurar<input id="ob-modal-restore-input" type="file" accept=".json,application/json" style="display:none;"></label>
            </div>
            <button id="ob-modal-save" class="ob-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelectorAll(".ob-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".ob-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".ob-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#ob-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    modal.querySelector("#ob-icon-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar ícono",
            onSelect: (url) => {
                modal.querySelector("#ob-icon-url").value = url;
                modal.querySelector("#ob-icon-wrap").innerHTML =
                    `<img class="ob-img-preview" src="${url}" alt="">`;
            },
        });
    });

    modal.querySelector("#ob-icon-url").addEventListener("input", (e) => {
        modal.querySelector("#ob-icon-wrap").innerHTML = e.target.value
            ? `<img class="ob-img-preview" src="${e.target.value}" alt="">`
            : `<div class="ob-img-placeholder"><i class="ri-image-line"></i></div>`;
    });

    function renderCards() {
        const list = modal.querySelector("#ob-cards-list");
        list.innerHTML = "";
        data.cards.forEach((card, idx) => {
            const div = document.createElement("div");
            div.className = "ob-card";
            const imgHtml = card.image
                ? `<img class="ob-img-preview" src="${card.image}" alt="">`
                : `<div class="ob-img-placeholder"><i class="ri-image-line"></i></div>`;
            div.innerHTML = `
                <div class="ob-card-config-header">
                    <span class="ob-card-num">${idx + 1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${idx + 1}</span>
                    <button class="ob-btn-remove ob-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="ob-row">
                    <div id="ob-img-wrap-${idx}">${imgHtml}</div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                        <label class="ob-label">Imagen</label>
                        <input class="ob-input-sm" placeholder="URL de la imagen" value="${card.image || ""}" data-field="image">
                        <button class="ob-pick-btn ob-pick-img"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="ob-label">Etiqueta (badge)</label>
                    <input class="ob-input" placeholder="Seguro de Salud" value="${card.badge || ""}" data-field="badge">
                </div>
                <div>
                    <label class="ob-label">Descripción</label>
                    <input class="ob-input" placeholder="Descripción breve" value="${card.desc || ""}" data-field="desc">
                </div>`;

            div.querySelectorAll("[data-field]").forEach((input) => {
                input.addEventListener("input", () => {
                    card[input.dataset.field] = input.value;
                    if (input.dataset.field === "image") {
                        const wrap = div.querySelector(`#ob-img-wrap-${idx}`);
                        wrap.innerHTML = input.value
                            ? `<img class="ob-img-preview" src="${input.value}" alt="">`
                            : `<div class="ob-img-placeholder"><i class="ri-image-line"></i></div>`;
                    }
                });
            });

            div.querySelector(".ob-pick-img").addEventListener("click", () => {
                openMediaPicker({
                    type: "image",
                    title: "Seleccionar imagen de tarjeta",
                    onSelect: (url) => {
                        card.image = url;
                        div.querySelector("[data-field='image']").value = url;
                        div.querySelector(`#ob-img-wrap-${idx}`).innerHTML =
                            `<img class="ob-img-preview" src="${url}" alt="">`;
                    },
                });
            });

            div.querySelector(".ob-remove-card").addEventListener(
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

    modal.querySelector("#ob-add-card").addEventListener("click", () => {
        data.cards.push({
            image: "",
            badge: "Nueva opción",
            desc: "Descripción breve.",
        });
        renderCards();
        modal.querySelector("#ob-cards-list").lastElementChild?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    });

    modal.querySelector("#ob-modal-backup").addEventListener("click", () => {
        const snapshot = {
            title:
                modal.querySelector("#ob-title").value.trim() ||
                DEFAULT_DATA.title,
            subtitle:
                modal.querySelector("#ob-subtitle").value.trim() ||
                DEFAULT_DATA.subtitle,
            button_label: modal.querySelector("#ob-button-label").value.trim(),
            button_href:
                modal.querySelector("#ob-button-href").value.trim() || "#",
            icon_url: modal.querySelector("#ob-icon-url").value.trim(),
            cards: JSON.parse(JSON.stringify(data.cards)),
        };
        const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        const a = document.createElement("a");
        a.href = url;
        a.download = `options-banner-backup-${ts}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });

    modal.querySelector("#ob-modal-restore-input").addEventListener(
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
                    errOverlay.className = "ob-confirm-overlay";
                    errOverlay.innerHTML = `<div class="ob-confirm-modal"><div class="ob-confirm-header"><i class="ri-error-warning-line" style="color:#ef4444;"></i><h3>Archivo inválido</h3></div><div class="ob-confirm-body"><p>El archivo seleccionado no es un JSON válido.</p></div><div class="ob-confirm-footer"><button class="ob-confirm-ok" style="background:#ef4444;">Cerrar</button></div></div>`;
                    document.body.appendChild(errOverlay);
                    errOverlay.querySelector(".ob-confirm-ok").onclick = () =>
                        errOverlay.remove();
                    e.target.value = "";
                    return;
                }
                const confirmOverlay = document.createElement("div");
                confirmOverlay.className = "ob-confirm-overlay";
                confirmOverlay.innerHTML = `
                    <div class="ob-confirm-modal">
                        <div class="ob-confirm-header">
                            <i class="ri-refresh-line"></i>
                            <h3>Restaurar configuración</h3>
                        </div>
                        <div class="ob-confirm-body">
                            <p>¿Deseas restaurar la configuración de esta sección desde el archivo de respaldo?</p>
                            <p>Esta acción reemplazará la configuración actual del formulario.</p>
                            <span class="ob-confirm-filename"><i class="ri-file-code-line"></i>${file.name}</span>
                        </div>
                        <div class="ob-confirm-footer">
                            <button class="ob-confirm-cancel">Cancelar</button>
                            <button class="ob-confirm-ok"><i class="ri-check-line"></i> Sí, restaurar</button>
                        </div>
                    </div>`;
                document.body.appendChild(confirmOverlay);
                confirmOverlay.querySelector(".ob-confirm-cancel").onclick = () => {
                    confirmOverlay.remove();
                    e.target.value = "";
                };
                confirmOverlay.querySelector(".ob-confirm-ok").onclick = () => {
                    confirmOverlay.remove();
                    e.target.value = "";
                    const restored = {
                        title: parsed.title ?? DEFAULT_DATA.title,
                        subtitle: parsed.subtitle ?? DEFAULT_DATA.subtitle,
                        button_label:
                            parsed.button_label ?? DEFAULT_DATA.button_label,
                        button_href: parsed.button_href ?? DEFAULT_DATA.button_href,
                        icon_url: parsed.icon_url ?? DEFAULT_DATA.icon_url,
                        cards: JSON.parse(
                            JSON.stringify(parsed.cards ?? DEFAULT_DATA.cards),
                        ),
                    };
                    component.addAttributes({
                        "data-options-banner-config": JSON.stringify(restored),
                    });
                    component.components(buildOptionsBannerHTML(restored));
                    overlay.remove();
                    showOptionsBannerModal(editor, component);
                };
            };
            reader.readAsText(file);
        },
    );

    const close = () => overlay.remove();
    modal.querySelector("#ob-modal-close").onclick = close;
    modal.querySelector("#ob-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#ob-modal-save").onclick = () => {
        data.title =
            modal.querySelector("#ob-title").value.trim() || DEFAULT_DATA.title;
        data.subtitle =
            modal.querySelector("#ob-subtitle").value.trim() ||
            DEFAULT_DATA.subtitle;
        data.button_label = modal.querySelector("#ob-button-label").value.trim();
        data.button_href =
            modal.querySelector("#ob-button-href").value.trim() || "#";
        data.icon_url = modal.querySelector("#ob-icon-url").value.trim();

        const existingInner = component
            .getEl()
            ?.querySelector("[id^='ob-root-']");
        const uid =
            existingInner?.id?.replace("ob-root-", "") ||
            "ob" + Math.random().toString(36).slice(2, 7);

        component.addAttributes({
            "data-options-banner-config": JSON.stringify(data),
        });
        component.components(buildOptionsBannerHTML(data, uid));
        close();
    };
}

const iconOptionsBanner = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#E97300" rx="2"/>
    <rect x="3" y="4" width="12" height="8" rx="1.5" fill="#fff"/>
    <rect x="17" y="4" width="12" height="8" rx="1.5" fill="#fff" fill-opacity="0.7"/>
    <rect x="3" y="14" width="12" height="8" rx="1.5" fill="#fff" fill-opacity="0.7"/>
    <rect x="17" y="14" width="12" height="8" rx="1.5" fill="#fff" fill-opacity="0.4"/>
</svg>`;

export function initializeOptionsBannerBlock(editor) {
    const componentType = "options-banner-component";

    editor.DomComponents.addType("ob-responsive-style", {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === "ob-responsive-style"
                ? { type: "ob-responsive-style" }
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

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Banner de Opciones",
                tagName: "div",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: false,
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
                    "data-options-banner-config": JSON.stringify(DEFAULT_DATA),
                },
                components: buildOptionsBannerHTML(DEFAULT_DATA),
                traits: [
                    {
                        type: "button",
                        label: "Banner de Opciones",
                        text: "Administrar Banner",
                        full: true,
                        command: "open-options-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-options-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showOptionsBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("options-banner-block", {
        label: "Banner de Opciones",
        category: "Banners",
        media: iconOptionsBanner,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

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