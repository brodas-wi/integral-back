import { openMediaPicker } from "@/editor/media-picker";
import { IconPickerModal } from "@/editor/components/icon-picker-modal";

export const NAVBAR_RUNTIME_SCRIPT = `(function(){
function initNavbar(root){
    if(!root||root.__nbInit)return;
    root.__nbInit=true;
    var id=root.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");
    if(!id)return;
    function pad(){document.body.style.paddingTop=root.offsetHeight+"px";}
    pad();
    window.addEventListener("resize",function(){
        pad();
        if(window.innerWidth>992){
            var mob=document.getElementById("nb-mobile-"+id);
            if(mob&&mob.classList.contains("nb-open"))mob.classList.remove("nb-open");
            root.querySelectorAll(".nb-mobile-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
        }
    });
    var toggle=document.getElementById("nb-toggle-"+id);
    var mobile=document.getElementById("nb-mobile-"+id);
    if(toggle&&mobile){
        toggle.addEventListener("click",function(){mobile.classList.toggle("nb-open");pad();});
    }
    root.querySelectorAll(".nb-nav-trigger").forEach(function(btn){
        btn.addEventListener("click",function(e){
            e.stopPropagation();
            var item=btn.closest(".nb-nav-item");
            var open=item.classList.contains("nb-open");
            root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
            if(!open)item.classList.add("nb-open");
            pad();
        });
    });
    root.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(btn){
        btn.addEventListener("click",function(){
            btn.closest(".nb-mobile-item").classList.toggle("nb-open");
            pad();
        });
    });
    document.addEventListener("click",function(e){
        if(!root.contains(e.target)){
            root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
        }
    });
}
document.querySelectorAll("nav[data-gjs-type='navbar-component'], nav.nb-wrapper").forEach(function(el){initNavbar(el);});
if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",function(){
        document.querySelectorAll("nav[data-gjs-type='navbar-component'], nav.nb-wrapper").forEach(function(el){initNavbar(el);});
    });
}
})();`;
const NAVBAR_STYLES = `
<style>
.nb-icon-btn{display:inline-flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem;border-radius:9999px;background:#ffffff;color:#E97300;border:none;cursor:pointer;text-decoration:none;flex-shrink:0;transition:box-shadow 0.2s;align-self:center;}
.nb-icon-btn:hover{box-shadow:0 4px 14px rgba(0,0,0,0.15);}
.nb-icon-btn i{font-size:1.25rem;color:#E97300;line-height:1;}
.nb-icon-btn-gap{width:0.75rem;flex-shrink:0;}
.nb-wrapper{background:#fff;width:100%;box-shadow:0 2px 8px rgba(0,0,0,0.08);position:fixed;top:0;left:0;right:0;z-index:1000;font-family:'Poppins',sans-serif;}
.nb-top{display:flex;align-items:center;justify-content:space-between;padding:0.75rem 4rem;gap:1.5rem;position:relative;}
.nb-top::after{content:'';position:absolute;bottom:0;left:calc(4rem + 60px);right:calc(4rem + 180px);height:1px;background:#E97300;}
.nb-logo-link{display:flex;align-items:center;text-decoration:none;flex-shrink:0;}
.nb-logo-link img{height:40px;width:auto;display:block;}
.nb-logo-text{font-size:1.125rem;font-weight:800;color:#003B71;}
.nb-top-actions{display:flex;align-items:center;gap:1.5rem;flex:1;justify-content:center;}
.nb-top-action{display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:#003B71;font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;transition:color 0.15s;white-space:nowrap;}
.nb-top-action i{font-size:1.5rem;color:#E97300;}
.nb-top-action:hover{color:#E97300;}
.nb-banking-btn{display:inline-flex;align-items:center;justify-content:center;padding:0.625rem 1.5rem;border-radius:9999px;font-size:0.9375rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;transition:opacity 0.15s;white-space:nowrap;font-family:inherit;flex-shrink:0;}
.nb-banking-btn:hover{opacity:0.88;}
.nb-banking-blue{background:#003B71;color:#fff;}
.nb-banking-orange{background:#E97300;color:#fff;}
.nb-bottom{display:flex;align-items:stretch;padding:0 4rem;gap:0;position:relative;border-bottom:3px solid #E97300;}
.nb-nav-list{display:flex;align-items:center;justify-content:space-between;gap:0;list-style:none;margin:0;padding:0;flex:1;}
.nb-nav-item{position:static;}
.nb-nav-link{display:inline-flex;align-items:center;gap:0.375rem;padding:0.875rem 1.125rem;color:#E97300;text-decoration:none;font-size:0.9375rem;font-weight:600;transition:color 0.15s;white-space:nowrap;cursor:pointer;background:none;border:none;font-family:inherit;}
.nb-nav-link:hover,.nb-nav-item.nb-open>.nb-nav-link{color:#003B71;}
.nb-mega{display:none;position:absolute;top:100%;left:0;right:0;background:#fff;border-top:2px solid #E97300;border-bottom:2px solid #E97300;box-shadow:0 8px 32px rgba(0,0,0,0.1);z-index:200;padding:1rem 4rem;}
.nb-nav-item.nb-open>.nb-mega{display:block;}
.nb-mega-grid{display:grid;gap:2rem;grid-template-columns:1fr 1fr 1fr minmax(200px,260px);}
.nb-mega-col{display:flex;flex-direction:column;gap:0.5rem;min-width:0;border-right:2px solid #E97300;padding-right:1.5rem;}
.nb-mega-col:last-of-type{border-right:2px solid #E97300;}
.nb-mega-badge{display:inline-flex;align-items:center;justify-content:center;padding:0.5rem 1.25rem;border-radius:9999px;font-size:0.875rem;font-weight:700;text-align:center;margin-bottom:0;cursor:default;}
.nb-badge-blue{background:#003B71;color:#fff;}
.nb-badge-orange{background:#E97300;color:#fff;}
.nb-mega-item{display:flex;flex-direction:column;gap:0.125rem;text-decoration:none;padding:0.375rem 0;border-bottom:1px solid transparent;transition:border-color 0.15s;}
.nb-mega-item:hover{border-bottom-color:#e2e8f0;}
.nb-mega-item-title{font-size:0.8125rem;font-weight:700;color:#003B71;text-transform:uppercase;letter-spacing:0.03em;line-height:1.3;}
.nb-mega-item-desc{font-size:0.8125rem;font-weight:400;color:#E97300;line-height:1.4;}
.nb-mega-cta-col{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.25rem;padding:1rem;}
.nb-mega-cta-text{font-size:1.125rem;font-weight:800;text-align:center;line-height:1.3;text-transform:uppercase;}
.nb-mega-cta-buttons{display:flex;flex-direction:column;gap:0.625rem;width:100%;align-items:center;}
.nb-mega-cta-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.375rem;padding:0.625rem 1.75rem;border-radius:9999px;font-size:0.875rem;font-weight:700;text-decoration:none;cursor:pointer;border:none;font-family:inherit;transition:opacity 0.15s;}
.nb-mega-cta-btn:hover{opacity:0.88;}
.nb-mega-cta-btn i{font-size:1rem;line-height:1;}
.nb-bottom-cta{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;padding:0.5rem 1.25rem;border-radius:9999px;font-size:0.8125rem;font-weight:700;text-decoration:none;cursor:pointer;border:none;font-family:inherit;transition:opacity 0.15s;text-align:center;word-break:break-word;white-space:normal;min-width:120px;max-width:180px;line-height:1.25;margin-left:1.25rem;flex-shrink:0;align-self:center;margin-top:0.375rem;margin-bottom:0.375rem;}
.nb-bottom-cta:hover{opacity:0.88;}
.nb-bottom-cta-line1{letter-spacing:0.04em;}
.nb-bottom-cta-line2{font-size:0.6875rem;font-weight:500;letter-spacing:0.06em;opacity:0.85;}
.nb-cta-blue{background:#003B71;color:#fff;}
.nb-cta-orange{background:#E97300;color:#fff;}
.nb-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:0.5rem;border-radius:0.375rem;transition:background 0.15s;flex-shrink:0;}
.nb-hamburger:hover{background:rgba(0,59,113,0.06);}
.nb-hamburger span{display:block;width:24px;height:2px;background:#003B71;border-radius:2px;transition:all 0.25s;}
.nb-mobile-bar{display:none;align-items:center;justify-content:space-between;padding:0.625rem 1.25rem;border-bottom:3px solid #E97300;}
.nb-mobile-menu{display:none;flex-direction:column;background:#fff;border-top:1px solid #f1f5f9;border-bottom:2px solid #E97300;padding:0.75rem 1.25rem;gap:0;max-height:calc(100vh - 64px);overflow-y:auto;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
.nb-mobile-menu::-webkit-scrollbar{width:4px;}
.nb-mobile-menu::-webkit-scrollbar-track{background:transparent;}
.nb-mobile-menu::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
.nb-mobile-menu::-webkit-scrollbar-thumb:hover{background:#94a3b8;}
.nb-mobile-menu.nb-open{display:flex;}
.nb-mobile-top-actions{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;gap:0.25rem 1rem;border-bottom:1px solid #f1f5f9;padding:0.25rem 0.75rem;}
.nb-mobile-top-action{display:flex;align-items:center;gap:0.5rem;padding:0.375rem 0.5rem;color:#003B71;text-decoration:none;font-size:0.8125rem;font-weight:600;white-space:nowrap;text-transform:uppercase;letter-spacing:0.04em;transition:color 0.15s;}
.nb-mobile-top-action:hover{color:#E97300;}
.nb-mobile-top-action i{font-size:1.125rem;color:#E97300;flex-shrink:0;}
.nb-mobile-banking{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center;gap:0.625rem;padding:0.625rem 0.5rem;border-bottom:1px solid #f1f5f9;}
.nb-mobile-banking .nb-banking-btn{width:auto;justify-content:center;}
.nb-mobile-banking .nb-bottom-cta{margin-left:0;margin-top:0;margin-bottom:0;align-self:auto;}
.nb-mobile-link{display:flex;align-items:center;justify-content:space-between;padding:0.75rem 0.5rem;color:#E97300;text-decoration:none;font-size:0.9375rem;font-weight:600;border-bottom:1px solid #f1f5f9;cursor:pointer;background:none;border-left:none;border-right:none;border-top:none;width:100%;text-align:left;font-family:inherit;transition:color 0.15s;}
.nb-mobile-link:hover,.nb-mobile-item.nb-open>.nb-mobile-link{color:#003B71;}
.nb-mobile-link i{color:#94a3b8;font-size:0.875rem;transition:transform 0.2s;}
.nb-mobile-item.nb-open>.nb-mobile-link i{transform:rotate(180deg);}
.nb-mobile-link-content{display:flex;align-items:center;gap:0.5rem;}
.nb-mobile-link-content i{color:#E97300;font-size:1rem;transition:none;}
.nb-mobile-submenu{display:none;flex-direction:row;flex-wrap:wrap;padding:0.5rem 0 0.75rem 0;gap:0.75rem;border-bottom:1px solid #f1f5f9;}
.nb-mobile-item.nb-open>.nb-mobile-submenu{display:flex;}
.nb-mobile-sub-col{display:flex;flex-direction:column;gap:0.25rem;flex:1 1 140px;min-width:200px;}
.nb-mobile-sub-badge{display:inline-flex;align-items:center;justify-content:center;padding:0.3rem 0.875rem;border-radius:9999px;font-size:0.75rem;font-weight:700;margin-bottom:0.25rem;cursor:default;white-space:normal;}
.nb-mobile-sub-link{display:flex;flex-direction:column;gap:0.125rem;padding:0.375rem 0.25rem;text-decoration:none;border-radius:0.375rem;transition:background 0.15s;}
.nb-mobile-sub-link:hover{background:rgba(0,59,113,0.04);}
.nb-mobile-sub-title{font-size:0.8rem;font-weight:700;color:#003B71;text-transform:uppercase;line-height:1.3;}
.nb-mobile-sub-desc{font-size:0.7rem;color:#E97300;line-height:1.3;}
@media(max-width:1280px){
    .nb-top{padding:0.75rem 2.5rem;}
    .nb-bottom{padding:0 2.5rem;}
    .nb-mega{padding:2rem 2.5rem;}
}
@media(max-width:992px){
    .nb-top{display:none;}
    .nb-bottom{display:none;}
    .nb-mobile-bar{display:flex;}
    .nb-hamburger{display:flex;}
}
</style>`;
function buildAlternatingText(text) {
    if (!text) return "";
    return text
        .split(" ")
        .filter((w) => w.length > 0)
        .map((word, i) => {
            const color = i % 2 === 0 ? "#E97300" : "#003B71";
            return `<span style="color:${color};">${word}</span>`;
        })
        .join(" ");
}
function normalizeCtaColumn(ctaColumn) {
    if (!ctaColumn) return { text: "", buttons: [] };
    if (Array.isArray(ctaColumn.buttons)) {
        return {
            text: ctaColumn.text || "",
            buttons: ctaColumn.buttons.slice(0, 2).map((btn) => ({
                label: btn.label || "",
                href: btn.href || "#",
                color: btn.color === "blue" ? "blue" : "orange",
                icon: btn.icon || "",
            })),
        };
    }
    if (ctaColumn.btn_label || ctaColumn.btn_href || ctaColumn.btn_color) {
        return {
            text: ctaColumn.text || "",
            buttons: [
                {
                    label: ctaColumn.btn_label || "",
                    href: ctaColumn.btn_href || "#",
                    color: ctaColumn.btn_color === "blue" ? "blue" : "orange",
                    icon: "",
                },
            ],
        };
    }
    return { text: ctaColumn.text || "", buttons: [] };
}

function normalizeNavLinks(navLinks) {
    return (navLinks || []).map((item) => {
        if (item.type === "submenu" && item.cta_column) {
            return { ...item, cta_column: normalizeCtaColumn(item.cta_column) };
        }
        return item;
    });
}

function buildNavbarHTML(data, uid) {
    uid = uid || "nb" + Math.random().toString(36).slice(2, 7);
    const logoHref = data.logo_href || "/";
    const logoInner = data.logo_url
        ? `<img src="${data.logo_url}" alt="${data.logo_alt || "Logo"}">`
        : `<span class="nb-logo-text">${data.logo_text || "Logo"}</span>`;
    const logoHtml = `<a href="${logoHref}" class="nb-logo-link">${logoInner}</a>`;
    const topActionsHtml = (data.top_actions || [])
        .map((a) => {
            const icon = a.icon ? `<i class="${a.icon}"></i>` : "";
            return `<a href="${a.href || "#"}" class="nb-top-action">${icon}${a.label || ""}</a>`;
        })
        .join("");
    const bankingBtn = data.banking_btn || {};
    const bankingColorClass =
        bankingBtn.color === "orange" ? "nb-banking-orange" : "nb-banking-blue";
    const bankingHtml = `<a href="${bankingBtn.href || "#"}" class="nb-banking-btn ${bankingColorClass}">${bankingBtn.label || "Banca en Línea"}</a>`;
    const navLinksHtml = (data.nav_links || [])
        .map((item) => {
            if (item.type === "submenu" && item.columns?.length) {
                const normalizedCta = item.cta_column
                    ? normalizeCtaColumn(item.cta_column)
                    : null;
                const hasCta = !!(
                    normalizedCta &&
                    (normalizedCta.text || normalizedCta.buttons.length)
                );
                const contentCols = item.columns.slice(0, 3);
                const colsHtml = contentCols
                    .map((col) => {
                        const badgeColor =
                            col.badge_color === "orange"
                                ? "nb-badge-orange"
                                : "nb-badge-blue";
                        const badgeHtml = col.badge
                            ? `<span class="nb-mega-badge ${badgeColor}">${col.badge}</span>`
                            : "";
                        const itemsHtml = (col.items || [])
                            .map((it) => {
                                const desc = it.desc
                                    ? `<span class="nb-mega-item-desc">${it.desc}</span>`
                                    : "";
                                return `<a href="${it.href || "#"}" class="nb-mega-item"><span class="nb-mega-item-title">${it.label || ""}</span>${desc}</a>`;
                            })
                            .join("");
                        return `<div class="nb-mega-col">${badgeHtml}${itemsHtml}</div>`;
                    })
                    .join("");
                let ctaColHtml = "";
                if (hasCta) {
                    const altText = buildAlternatingText(
                        normalizedCta.text || "",
                    );
                    const buttonsHtml = normalizedCta.buttons
                        .slice(0, 2)
                        .map((btn) => {
                            const btnColorClass =
                                btn.color === "blue"
                                    ? "nb-badge-blue"
                                    : "nb-badge-orange";
                            const iconHtml = btn.icon
                                ? `<i class="${btn.icon}"></i>`
                                : "";
                            return `<a href="${btn.href || "#"}" class="nb-mega-cta-btn ${btnColorClass}">${iconHtml}${btn.label || "Ver más"}</a>`;
                        })
                        .join("");
                    ctaColHtml = `<div class="nb-mega-cta-col">
                        <p class="nb-mega-cta-text">${altText}</p>
                        <div class="nb-mega-cta-buttons">${buttonsHtml}</div>
                    </div>`;
                }
                const gridStyle = hasCta
                    ? `grid-template-columns:1fr 1fr 1fr minmax(200px,260px);`
                    : `grid-template-columns:repeat(${contentCols.length},minmax(0,280px));justify-content:start;`;

                return `<li class="nb-nav-item nb-has-submenu">
                    <button class="nb-nav-link nb-nav-trigger" type="button">${item.label || "Menú"}</button>
                    <div class="nb-mega"><div class="nb-mega-grid" style="${gridStyle}">${colsHtml}${ctaColHtml}</div></div>
                </li>`;
            }
            const linkIconHtml = item.icon
                ? `<i class="${item.icon}"></i>`
                : "";
            return `<li class="nb-nav-item"><a href="${item.href || "#"}" class="nb-nav-link">${linkIconHtml}${item.label || ""}</a></li>`;
        })
        .join("");
    const bottomCta = data.bottom_cta || {};
    const bottomCtaColorClass =
        bottomCta.color === "blue" ? "nb-cta-blue" : "nb-cta-orange";
    const bottomCtaLine2 = bottomCta.sublabel
        ? `<span class="nb-bottom-cta-line2">${bottomCta.sublabel}</span>`
        : "";
    const bottomCtaHtml = bottomCta.label
        ? `<a href="${bottomCta.href || "#"}" class="nb-bottom-cta ${bottomCtaColorClass}"><span class="nb-bottom-cta-line1">${bottomCta.label}</span>${bottomCtaLine2}</a>`
        : "";

    const iconBtn = data.icon_btn || {};
    const iconBtnHtml = iconBtn.enabled
        ? `<a href="${iconBtn.href || "#"}" class="nb-icon-btn" title="${iconBtn.label || ""}"><i class="${iconBtn.icon || "ri-search-line"}"></i></a>`
        : "";
    const mobileTopActionsHtml = (data.top_actions || [])
        .map((a) => {
            const icon = a.icon ? `<i class="${a.icon}"></i>` : "";
            return `<a href="${a.href || "#"}" class="nb-mobile-top-action">${icon}${a.label || ""}</a>`;
        })
        .join("");
    const mobileLinksHtml = (data.nav_links || [])
        .map((item) => {
            if (item.type === "submenu" && item.columns?.length) {
                const colsHtml = item.columns
                    .slice(0, 3)
                    .map((col) => {
                        const badgeColor =
                            col.badge_color === "orange"
                                ? "nb-badge-orange"
                                : "nb-badge-blue";
                        const badgeHtml = col.badge
                            ? `<span class="nb-mobile-sub-badge ${badgeColor}">${col.badge}</span>`
                            : "";
                        const itemsHtml = (col.items || [])
                            .map((it) => {
                                const desc = it.desc
                                    ? `<span class="nb-mobile-sub-desc">${it.desc}</span>`
                                    : "";
                                return `<a href="${it.href || "#"}" class="nb-mobile-sub-link"><span class="nb-mobile-sub-title">${it.label || ""}</span>${desc}</a>`;
                            })
                            .join("");
                        return `<div class="nb-mobile-sub-col">${badgeHtml}${itemsHtml}</div>`;
                    })
                    .join("");
                return `<div class="nb-mobile-item">
                    <button class="nb-mobile-link" type="button">${item.label || "Menú"}<i class="ri-arrow-down-s-line"></i></button>
                    <div class="nb-mobile-submenu">${colsHtml}</div>
                </div>`;
            }
            const mobileLinkIconHtml = item.icon
                ? `<i class="${item.icon}"></i>`
                : "";
            return `<a href="${item.href || "#"}" class="nb-mobile-link"><span class="nb-mobile-link-content">${mobileLinkIconHtml}${item.label || ""}</span></a>`;
        })
        .join("");
    const mobileBankingHtml = [
        bankingHtml,
        bottomCta.label
            ? `<a href="${bottomCta.href || "#"}" class="nb-bottom-cta ${bottomCtaColorClass}"><span class="nb-bottom-cta-line1">${bottomCta.label}</span>${bottomCtaLine2}</a>`
            : "",
    ]
        .filter(Boolean)
        .join("");

    return `<div id="nb-root-${uid}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="nb-top">
            <div class="nb-logo">${logoHtml}</div>
            <div class="nb-top-actions">${topActionsHtml}</div>
            ${bankingHtml}
        </div>
        <div class="nb-bottom">
            <ul class="nb-nav-list">${navLinksHtml}</ul>
            ${bottomCtaHtml}
            <div class="nb-icon-btn-gap"></div>
            ${iconBtnHtml}
        </div>
        <div class="nb-mobile-bar">
            ${logoHtml}
            <div style="display:flex;align-items:center;gap:0.5rem;">
                ${iconBtnHtml}
                <button class="nb-hamburger" type="button" id="nb-toggle-${uid}" aria-label="Menú"><span></span><span></span><span></span></button>
            </div>
        </div>
        <div class="nb-mobile-menu" id="nb-mobile-${uid}">
            <div class="nb-mobile-top-actions">${mobileTopActionsHtml}</div>
            <div class="nb-mobile-banking">${mobileBankingHtml}</div>
            ${mobileLinksHtml}
        </div>
    </div>`;
}
const DEFAULT_DATA = {
    icon_btn: {
        enabled: false,
        icon: "ri-search-line",
        href: "#",
        label: "Buscar",
    },
    logo_url: "",
    logo_alt: "Logo",
    logo_text: "Logo",
    logo_href: "/",
    top_actions: [
        { label: "Contáctanos", href: "#", icon: "ri-phone-line" },
        { label: "Sucursales", href: "#", icon: "ri-building-line" },
        {
            label: "Preguntas Frecuentes",
            href: "#",
            icon: "ri-question-answer-line",
        },
    ],
    banking_btn: { label: "Mi Banca Integral", href: "#", color: "blue" },
    nav_links: [
        { type: "link", label: "Inicio", href: "/" },
        {
            type: "submenu",
            label: "Créditos",
            columns: [
                {
                    badge: "Tus créditos",
                    badge_color: "blue",
                    items: [
                        {
                            label: "Microcrédito",
                            desc: "Financiamiento para tu negocio",
                            href: "#",
                        },
                        {
                            label: "Crédito Personal",
                            desc: "Para tus necesidades personales",
                            href: "#",
                        },
                    ],
                },
            ],
            cta_column: {
                text: "Solicita tu Crédito Online",
                buttons: [
                    {
                        label: "Solicitar",
                        href: "#",
                        color: "orange",
                        icon: "",
                    },
                ],
            },
        },
        { type: "link", label: "Ahorros e Inversión", href: "#" },
        { type: "link", label: "Servicios y seguro", href: "#" },
    ],
    bottom_cta: {
        label: "Programa Surge",
        sublabel: "Formación Empresarial",
        href: "#",
        color: "orange",
    },
};
function showNavbarModal(editor, component) {
    const existing = document.getElementById("navbar-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("nb-modal-styles")) {
        const style = document.createElement("style");
        style.id = "nb-modal-styles";
        style.textContent = `
            .nb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .nb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:860px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .nb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .nb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .nb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .nb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .nb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .nb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .nb-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;overflow-x:auto;}
            .nb-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
            .nb-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .nb-tab-btn i{font-size:1rem;}
            .nb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .nb-modal-body::-webkit-scrollbar{width:5px;}
            .nb-modal-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
            .nb-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .nb-tab-panel.active{display:flex;}
            .nb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .nb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .nb-row{display:flex;gap:0.75rem;align-items:center;}
            .nb-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .nb-input:focus{border-color:#3b82f6;}
            .nb-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .nb-input-sm:focus{border-color:#3b82f6;}
            .nb-select{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;}
            .nb-list{display:flex;flex-direction:column;gap:0.625rem;}
            .nb-action-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-action-card.nb-dragging{opacity:0.4;}
            .nb-action-card.nb-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
            .nb-link-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;overflow:visible;}
            .nb-link-card.nb-dragging{opacity:0.4;}
            .nb-link-card.nb-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
            .nb-link-card-header{padding:0.625rem 0.875rem;background:#f8fafc;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:0.5rem;border-radius:0.5rem 0.5rem 0 0;}
            .nb-link-card-body{padding:0.75rem 0.875rem;display:flex;flex-direction:column;gap:0.75rem;}
            .nb-drag-handle{cursor:grab;color:#94a3b8;display:flex;align-items:center;padding:0 0.125rem;flex-shrink:0;}
            .nb-drag-handle:hover{color:#475569;}
            .nb-drag-handle:active{cursor:grabbing;}
            .nb-type-badge{font-size:0.65rem;font-weight:700;padding:2px 6px;border-radius:4px;text-transform:uppercase;letter-spacing:0.05em;cursor:pointer;transition:opacity 0.15s;user-select:none;}
            .nb-type-badge:hover{opacity:0.75;}
            .nb-type-link{background:#dbeafe;color:#1d4ed8;}
            .nb-type-submenu{background:#fef3c7;color:#b45309;}
            .nb-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:0.25rem;transition:background 0.15s;}
            .nb-btn-remove:hover{background:#fef2f2;}
            .nb-btn-sm-add{padding:0.25rem 0.625rem;background:#e8f0f8;border:none;border-radius:0.375rem;color:#003B71;font-size:0.7rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;}
            .nb-btn-sm-add:hover{background:#d1e3f5;}
            .nb-add-row{display:flex;gap:0.5rem;padding-top:0.25rem;flex-wrap:wrap;}
            .nb-btn-add{padding:0.375rem 0.75rem;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;}
            .nb-btn-add-link{background:#003B71;}
            .nb-btn-add-link:hover{background:#002a52;}
            .nb-btn-add-submenu{background:#b45309;}
            .nb-btn-add-submenu:hover{background:#92400e;}
            .nb-btn-add-action{background:#003B71;}
            .nb-btn-add-action:hover{background:#002a52;}
            .nb-btn-add-col{background:#0d9488;}
            .nb-btn-add-col:hover{background:#0f766e;}
            .nb-btn-add-item{background:#64748b;}
            .nb-btn-add-item:hover{background:#475569;}
            .nb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .nb-pick-btn:hover{background:#002a52;}
            .nb-icon-preview{display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;background:#f1f5f9;border-radius:0.375rem;flex-shrink:0;}
            .nb-icon-preview i{font-size:1.125rem;color:#003B71;}
            .nb-col-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-col-card-header{display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;}
            .nb-col-items{display:flex;flex-direction:column;gap:0.375rem;padding-left:0.5rem;border-left:2px solid #e2e8f0;}
            .nb-col-item{display:flex;flex-direction:column;gap:0.25rem;padding:0.375rem;background:#fff;border:1px solid #f1f5f9;border-radius:0.375rem;}
            .nb-col-item-row{display:flex;gap:0.375rem;align-items:center;}
            .nb-section-title{font-size:0.75rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0;border-bottom:1px solid #e2e8f0;margin-bottom:0.25rem;}
            .nb-cta-section{background:#fff3e0;border:1px solid #fed7aa;border-radius:0.5rem;padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .nb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .nb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-btn-save:hover{background:#d97821;}
            .nb-color-toggle{display:flex;gap:0.375rem;}
            .nb-color-opt{padding:0.375rem 0.875rem;border-radius:9999px;font-size:0.75rem;font-weight:700;cursor:pointer;border:2px solid transparent;transition:all 0.15s;font-family:inherit;}
            .nb-color-opt-blue{background:#003B71;color:#fff;}
            .nb-color-opt-orange{background:#E97300;color:#fff;}
            .nb-color-opt.nb-color-inactive{opacity:0.35;border-color:#e2e8f0;}
            .nb-color-opt.nb-color-inactive:hover{opacity:0.6;}
            .nb-btn-backup{padding:0.5rem 1rem;background:#fff;border:2px solid #003B71;border-radius:0.5rem;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;}
            .nb-btn-backup:hover{background:#003B71;color:#fff;}
            .nb-btn-restore{padding:0.5rem 1rem;background:#fff;border:2px solid #0d9488;border-radius:0.5rem;color:#0d9488;font-size:0.8125rem;font-weight:600;font-family:inherit;display:inline-flex;align-items:center;gap:0.375rem;transition:background 0.15s,color 0.15s;user-select:none;}
            .nb-btn-restore:hover{background:#0d9488;color:#fff;}
            .nb-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);padding:1rem;}
            .nb-confirm-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;overflow:hidden;border:1px solid #e2e8f0;}
            .nb-confirm-header{padding:1rem 1.25rem 0.75rem;display:flex;align-items:center;gap:0.625rem;border-bottom:1px solid #f1f5f9;}
            .nb-confirm-header i{font-size:1.25rem;color:#E97300;}
            .nb-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
            .nb-confirm-body{padding:1rem 1.25rem;}
            .nb-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;color:#475569;line-height:1.5;}
            .nb-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;background:#f1f5f9;border-radius:0.375rem;font-size:0.8rem;font-weight:600;color:#003B71;margin-top:0.25rem;}
            .nb-confirm-footer{padding:0.75rem 1.25rem 1rem;display:flex;gap:0.625rem;justify-content:flex-end;background:#f8fafc;border-top:1px solid #f1f5f9;}
            .nb-confirm-cancel{padding:0.5rem 1.125rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-confirm-cancel:hover{background:#f1f5f9;}
            .nb-confirm-ok{padding:0.5rem 1.125rem;background:#E97300;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-confirm-ok:hover{background:#d97821;}
            .icon-picker-overlay{z-index:1000000 !important;}
        `;
        document.head.appendChild(style);
    }
    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-navbar-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const logoUrl = currentData.logo_url || "";
    const logoAlt = currentData.logo_alt || "";
    const logoText = currentData.logo_text || "Logo";
    const logoHref = currentData.logo_href || "/";

    const topActions = JSON.parse(
        JSON.stringify(currentData.top_actions || DEFAULT_DATA.top_actions),
    );
    const bankingBtn = JSON.parse(
        JSON.stringify(currentData.banking_btn || DEFAULT_DATA.banking_btn),
    );
    const navLinks = normalizeNavLinks(
        JSON.parse(
            JSON.stringify(currentData.nav_links || DEFAULT_DATA.nav_links),
        ),
    );
    const bottomCta = JSON.parse(
        JSON.stringify(currentData.bottom_cta || DEFAULT_DATA.bottom_cta),
    );
    const overlay = document.createElement("div");
    overlay.id = "navbar-config-modal";
    overlay.className = "nb-overlay";

    const modal = document.createElement("div");
    modal.className = "nb-modal";
    modal.innerHTML = `
        <div class="nb-modal-header">
            <div class="nb-modal-header-left"><i class="ri-layout-top-line"></i><h2>Configurar Navbar</h2></div>
            <button id="nb-modal-close" class="nb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="nb-modal-tabs">
            <button class="nb-tab-btn active" data-tab="logo"><i class="ri-image-line"></i> Logo</button>
            <button class="nb-tab-btn" data-tab="top-actions"><i class="ri-links-line"></i> Acciones superiores</button>
            <button class="nb-tab-btn" data-tab="banking"><i class="ri-bank-card-line"></i> Banca en línea</button>
            <button class="nb-tab-btn" data-tab="nav"><i class="ri-menu-line"></i> Navegación</button>
            <button class="nb-tab-btn" data-tab="bottom-cta"><i class="ri-cursor-line"></i> CTA inferior</button>
            <button class="nb-tab-btn" data-tab="icon-btn"><i class="ri-search-line"></i> Botón icono</button>
        </div>
        <div class="nb-modal-body">
            <div class="nb-tab-panel active" id="nb-panel-logo">
                <div class="nb-card">
                    <label class="nb-label">Imagen del logo</label>
                    <div class="nb-row" style="align-items:flex-start;flex-wrap:wrap;gap:0.75rem;">
                        <div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:0.5rem;">
                            ${logoUrl ? `<img id="nb-logo-preview" src="${logoUrl}" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;">` : `<div id="nb-logo-preview" style="display:none;"></div>`}
                            <input id="nb-logo-url" type="text" placeholder="URL del logo" value="${logoUrl}" class="nb-input">
                        </div>
                        <button id="nb-logo-pick" class="nb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Enlace del logo</label>
                    <div style="position:relative;">
                        <input id="nb-logo-href" type="text" placeholder="Ej: / o https://..." value="${logoHref}" class="nb-input">
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Texto alternativo / Logo de texto</label>
                    <div class="nb-row">
                        <input id="nb-logo-alt"  type="text" placeholder="Texto alternativo"      value="${logoAlt}"  class="nb-input">
                        <input id="nb-logo-text" type="text" placeholder="Texto si no hay imagen" value="${logoText}" class="nb-input">
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-top-actions">
                <div class="nb-card" style="padding:0.75rem;">
                    <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem;">Botones de acción de la barra superior (Contáctanos, Sucursales, etc.). Puedes reordenarlos arrastrando.</p>
                    <div id="nb-top-actions-list" class="nb-list"></div>
                    <div class="nb-add-row" style="margin-top:0.75rem;">
                        <button id="nb-add-top-action" class="nb-btn-add nb-btn-add-action"><i class="ri-add-line"></i> Agregar acción</button>
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-banking">
                <div class="nb-card">
                    <label class="nb-label">Botón de Banca en Línea</label>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Texto del botón</label>
                            <input id="nb-banking-label" type="text" placeholder="Mi Banca Integral" value="${bankingBtn.label || ""}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-banking-href" type="text" placeholder="URL o buscar página..." value="${bankingBtn.href || "#"}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="nb-color-toggle">
                                <button class="nb-color-opt nb-color-opt-blue ${bankingBtn.color !== "orange" ? "" : "nb-color-inactive"}" data-color="blue" id="nb-banking-blue">Azul</button>
                                <button class="nb-color-opt nb-color-opt-orange ${bankingBtn.color === "orange" ? "" : "nb-color-inactive"}" data-color="orange" id="nb-banking-orange">Naranja</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-nav">
                <div class="nb-card" style="padding:0.75rem;">
                    <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem;">Links de la barra inferior. Los submenús generan mega-menús con columnas.</p>
                    <div id="nb-nav-list" class="nb-list"></div>
                    <div class="nb-add-row" style="margin-top:0.75rem;">
                        <button id="nb-add-nav-link"    class="nb-btn-add nb-btn-add-link"><i class="ri-link"></i> Agregar link</button>
                        <button id="nb-add-nav-submenu" class="nb-btn-add nb-btn-add-submenu"><i class="ri-layout-grid-line"></i> Agregar submenú</button>
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-bottom-cta">
                <div class="nb-card">
                    <label class="nb-label">Botón CTA de la barra inferior</label>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Texto principal</label>
                            <input id="nb-bcta-label" type="text" placeholder="Programa Surge" value="${bottomCta.label || ""}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Subtexto (opcional)</label>
                            <input id="nb-bcta-sublabel" type="text" placeholder="Formación Empresarial" value="${bottomCta.sublabel || ""}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-bcta-href" type="text" placeholder="URL o buscar página..." value="${bottomCta.href || "#"}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="nb-color-toggle">
                                <button class="nb-color-opt nb-color-opt-blue ${bottomCta.color === "blue" ? "" : "nb-color-inactive"}" data-color="blue" id="nb-bcta-blue">Azul</button>
                                <button class="nb-color-opt nb-color-opt-orange ${bottomCta.color !== "blue" ? "" : "nb-color-inactive"}" data-color="orange" id="nb-bcta-orange">Naranja</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="nb-tab-panel" id="nb-panel-icon-btn">
                <div class="nb-card">
                    <label class="nb-label">Botón de acción con icono</label>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Activar botón</label>
                            <div class="nb-color-toggle" id="nb-iconbtn-toggle-wrap"></div>
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Clase del icono</label>
                            <div class="nb-row">
                                <div class="nb-icon-preview"><i id="nb-iconbtn-preview" class="${currentData.icon_btn?.icon || "ri-search-line"}"></i></div>
                                <input id="nb-iconbtn-icon" type="text" placeholder="ri-search-line" value="${currentData.icon_btn?.icon || "ri-search-line"}" class="nb-input" readonly>
                                <button class="nb-pick-btn" id="nb-iconbtn-pick"><i class="ri-emotion-happy-line"></i> Icono</button>
                            </div>
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Etiqueta (tooltip)</label>
                            <input id="nb-iconbtn-label" type="text" placeholder="Buscar" value="${currentData.icon_btn?.label || "Buscar"}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-iconbtn-href" type="text" placeholder="URL o buscar página..." value="${currentData.icon_btn?.href || "#"}" class="nb-input">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nb-modal-footer">
            <button id="nb-modal-cancel" class="nb-btn-cancel">Cancelar</button>
            <div style="display:flex;gap:0.5rem;margin-right:auto;">
                <button id="nb-modal-backup" class="nb-btn-backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <label id="nb-modal-restore-label" class="nb-btn-restore" title="Restaurar configuración desde JSON" style="cursor:pointer;"><i class="ri-upload-2-line"></i> Restaurar<input id="nb-modal-restore-input" type="file" accept=".json,application/json" style="display:none;"></label>
            </div>
            <button id="nb-modal-save"   class="nb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.addEventListener("focusin", (e) => {
        const el = e.target;
        if (
            el.tagName === "INPUT" &&
            el.type === "text" &&
            !el.readOnly &&
            !el.classList.contains("nb-url-input")
        ) {
            el.select();
        }
    });

    const iconPicker = new IconPickerModal();

    modal.querySelectorAll(".nb-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".nb-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".nb-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#nb-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });
    modal.querySelector("#nb-logo-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar logo",
            onSelect: (url) => {
                modal.querySelector("#nb-logo-url").value = url;
                let preview = modal.querySelector("#nb-logo-preview");
                if (!preview || preview.tagName === "DIV") {
                    const img = document.createElement("img");
                    img.id = "nb-logo-preview";
                    img.style.cssText =
                        "height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;";
                    preview?.replaceWith(img) ??
                        modal.querySelector("#nb-logo-url").before(img);
                    preview = img;
                }
                preview.src = url;
                preview.style.display = "block";
            },
        });
    });
    const appBase =
        document
            .querySelector('meta[name="app-url"]')
            ?.content?.replace(/\/$/, "") ?? "";
    const searchUrl = `${appBase}/api/pages/search`;

    function attachUrlAutocomplete(input) {
        if (input.dataset.autocompleteAttached) return;
        input.dataset.autocompleteAttached = "true";
        const parent = input.parentNode;
        if (!parent.style.position || parent.style.position === "static")
            parent.style.position = "relative";
        const dropdown = document.createElement("ul");
        dropdown.style.cssText = `position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;max-height:200px;overflow-y:auto;display:none;`;
        parent.appendChild(dropdown);
        let debounceTimer = null;

        async function search(q) {
            if (q.length < 1) {
                dropdown.style.display = "none";
                return;
            }
            try {
                const res = await fetch(
                    `${searchUrl}?q=${encodeURIComponent(q)}`,
                    {
                        headers: {
                            Accept: "application/json",
                            "X-Requested-With": "XMLHttpRequest",
                        },
                    },
                );
                const pages = await res.json();
                renderDropdown(pages, q);
            } catch {
                dropdown.style.display = "none";
            }
        }

        function highlight(text, q) {
            if (!q) return text;
            return text.replace(
                new RegExp(
                    `(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                    "gi",
                ),
                '<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>',
            );
        }

        function renderDropdown(pages, q) {
            dropdown.innerHTML = "";
            if (!pages.length) {
                dropdown.style.display = "none";
                return;
            }
            pages.forEach((page) => {
                const li = document.createElement("li");
                li.style.cssText =
                    "padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;";
                li.innerHTML = `<span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${highlight(page.title, q)}</span><span style="font-size:0.7rem;color:#64748b;">/${page.slug}</span>`;
                li.addEventListener(
                    "mouseenter",
                    () => (li.style.background = "#f1f5f9"),
                );
                li.addEventListener(
                    "mouseleave",
                    () => (li.style.background = ""),
                );
                li.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    input.value = `/${page.slug}`;
                    input.dispatchEvent(new Event("input"));
                    dropdown.style.display = "none";
                });
                dropdown.appendChild(li);
            });
            dropdown.style.display = "block";
        }

        input.addEventListener("input", () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => search(input.value.trim()), 220);
        });
        input.addEventListener("focus", () => {
            input.select();
            if (input.value.trim()) search(input.value.trim());
        });
        input.addEventListener("blur", () => {
            setTimeout(() => {
                dropdown.style.display = "none";
            }, 150);
        });
        input.addEventListener("keydown", (e) => {
            if (dropdown.style.display === "none") return;
            const items = dropdown.querySelectorAll("li");
            const active = dropdown.querySelector("li.nb-ac-active");
            let idx = Array.from(items).indexOf(active);
            if (e.key === "ArrowDown") {
                e.preventDefault();
                active?.classList.remove("nb-ac-active");
                const next = items[idx + 1] || items[0];
                next?.classList.add("nb-ac-active");
                if (next) next.style.background = "#f1f5f9";
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                active?.classList.remove("nb-ac-active");
                const prev = items[idx - 1] || items[items.length - 1];
                prev?.classList.add("nb-ac-active");
                if (prev) prev.style.background = "#f1f5f9";
            } else if (e.key === "Enter" && active) {
                e.preventDefault();
                active.dispatchEvent(new MouseEvent("mousedown"));
            } else if (e.key === "Escape") {
                dropdown.style.display = "none";
            }
        });
    }
    function makeDraggable(container, arr, renderFn) {
        let dragIdx = null;
        const cards = Array.from(container.querySelectorAll("[data-drag-idx]"));

        const disableAllDrag = () => {
            cards.forEach((c) => {
                c.draggable = false;
            });
        };
        document.addEventListener("mouseup", disableAllDrag, { once: true });

        cards.forEach((card) => {
            card.draggable = false;

            const handle = card.querySelector(".nb-drag-handle");
            if (handle) {
                handle.addEventListener("mousedown", () => {
                    card.draggable = true;
                });
            }

            card.addEventListener("dragstart", (e) => {
                dragIdx = parseInt(card.dataset.dragIdx);
                setTimeout(() => card.classList.add("nb-dragging"), 0);
                e.dataTransfer.effectAllowed = "move";
            });
            card.addEventListener("dragend", () => {
                card.classList.remove("nb-dragging");
                container
                    .querySelectorAll(".nb-drag-over")
                    .forEach((el) => el.classList.remove("nb-drag-over"));
                card.draggable = false;
            });
            card.addEventListener("dragover", (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (parseInt(card.dataset.dragIdx) !== dragIdx)
                    card.classList.add("nb-drag-over");
            });
            card.addEventListener("dragleave", () =>
                card.classList.remove("nb-drag-over"),
            );
            card.addEventListener("drop", (e) => {
                e.preventDefault();
                const overIdx = parseInt(card.dataset.dragIdx);
                if (dragIdx !== null && overIdx !== dragIdx) {
                    const [moved] = arr.splice(dragIdx, 1);
                    arr.splice(overIdx, 0, moved);
                    renderFn();
                }
                dragIdx = null;
            });
        });
    }
    function renderTopActions() {
        const list = modal.querySelector("#nb-top-actions-list");
        list.innerHTML = "";
        topActions.forEach((action, idx) => {
            const card = document.createElement("div");
            card.className = "nb-action-card";
            card.dataset.dragIdx = idx;

            const iconClass = action.icon || "";
            card.innerHTML = `
                <div class="nb-row">
                    <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                    <div class="nb-icon-preview"><i class="${iconClass || "ri-star-line"}"></i></div>
                    <input class="nb-input-sm" style="width:130px;flex-shrink:0;" placeholder="Clase del icono" value="${iconClass}" data-field="icon" readonly>
                    <button class="nb-pick-btn nb-pick-icon-btn" type="button"><i class="ri-emotion-happy-line"></i> Icono</button>
                    <button class="nb-btn-remove nb-remove-action"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="nb-row">
                    <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${action.label || ""}" data-field="label">
                </div>
                <div style="position:relative;">
                    <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${action.href || "#"}" data-field="href">
                </div>`;
            card.querySelector(".nb-pick-icon-btn").addEventListener(
                "click",
                () => {
                    iconPicker.open((selected) => {
                        action.icon = selected;
                        card.querySelector("[data-field='icon']").value =
                            selected;
                        card.querySelector(".nb-icon-preview i").className =
                            selected;
                    });
                },
            );

            card.querySelector(".nb-remove-action").onclick = () => {
                topActions.splice(idx, 1);
                renderTopActions();
            };

            card.querySelectorAll("[data-field]").forEach((input) => {
                input.addEventListener("input", () => {
                    action[input.dataset.field] = input.value;
                });
            });

            const urlInput = card.querySelector(".nb-url-input");
            if (urlInput) {
                const wrapper = document.createElement("div");
                wrapper.style.position = "relative";
                urlInput.parentNode.insertBefore(wrapper, urlInput);
                wrapper.appendChild(urlInput);
                attachUrlAutocomplete(urlInput);
            }

            list.appendChild(card);
        });
        makeDraggable(list, topActions, renderTopActions);
    }
    function renderNavLinks() {
        const list = modal.querySelector("#nb-nav-list");
        list.innerHTML = "";
        navLinks.forEach((item, idx) => {
            const card = document.createElement("div");
            card.className = "nb-link-card";
            card.dataset.dragIdx = idx;

            const typeBadge = `<span class="nb-type-badge ${item.type === "submenu" ? "nb-type-submenu" : "nb-type-link"}" data-toggle-type title="Clic para cambiar tipo">${item.type === "submenu" ? "Submenú" : "Link"} ↕</span>`;

            if (item.type === "submenu") {
                item.cta_column = normalizeCtaColumn(item.cta_column);
                card.innerHTML = `
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${typeBadge}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Título del menú" value="${item.label || ""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-section-title">Columnas del mega-menú (máx. 3)</div>
                        <div class="nb-columns-list" style="display:flex;flex-direction:column;gap:0.625rem;"></div>
                        <div class="nb-add-row">
                            <button class="nb-btn-add nb-btn-add-col nb-add-col-btn" ${(item.columns || []).length >= 3 ? "disabled style='opacity:0.4;cursor:not-allowed;'" : ""}><i class="ri-add-line"></i> Agregar columna</button>
                        </div>
                        <div class="nb-section-title" style="margin-top:0.5rem;">Columna CTA (opcional)</div>
                        <div class="nb-cta-section">
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;width:80px;">Texto CTA</label>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Texto alternado naranja/azul" value="${item.cta_column.text || ""}" data-cta-field="text">
                            </div>
                            <div class="nb-cta-buttons-list" style="display:flex;flex-direction:column;gap:0.625rem;"></div>
                            <div class="nb-add-row">
                                <button type="button" class="nb-btn-add nb-btn-add-action nb-add-cta-btn"><i class="ri-add-line"></i> Agregar botón</button>
                            </div>
                        </div>`;
                card.querySelector("[data-toggle-type]").onclick = () => {
                    item.type = "link";
                    item.href = "#";
                    delete item.columns;
                    delete item.cta_column;
                    renderNavLinks();
                };
                card.querySelector(".nb-remove-link").onclick = () => {
                    navLinks.splice(idx, 1);
                    renderNavLinks();
                };
                card.querySelector("[data-field='label']").addEventListener(
                    "input",
                    (e) => {
                        item.label = e.target.value;
                    },
                );
                card.querySelector("[data-cta-field='text']").addEventListener(
                    "input",
                    (e) => {
                        item.cta_column.text = e.target.value;
                    },
                );

                const ctaButtonsList = card.querySelector(
                    ".nb-cta-buttons-list",
                );
                const addCtaBtn = card.querySelector(".nb-add-cta-btn");

                function renderCtaButtons() {
                    ctaButtonsList.innerHTML = "";
                    item.cta_column.buttons.forEach((btn, bi) => {
                        const btnCard = document.createElement("div");
                        btnCard.className = "nb-action-card";
                        btnCard.innerHTML = `
                            <div class="nb-row">
                                <span style="font-size:0.7rem;font-weight:700;color:#92400e;flex-shrink:0;">Botón ${bi + 1}</span>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${btn.label || ""}" data-btn-field="label">
                                <button type="button" class="nb-btn-remove nb-remove-cta-btn"><i class="ri-delete-bin-line"></i></button>
                            </div>
                            <div style="position:relative;">
                                <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL del botón" value="${btn.href || "#"}" data-btn-field="href">
                            </div>
                            <div class="nb-row">
                                <div class="nb-icon-preview"><i class="${btn.icon || "ri-star-line"}"></i></div>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Sin icono (opcional)" value="${btn.icon || ""}" data-btn-field="icon">
                                <button type="button" class="nb-pick-btn nb-pick-cta-icon"><i class="ri-emotion-happy-line"></i> Icono</button>
                            </div>
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;">Color</label>
                                <div class="nb-color-toggle">
                                    <button type="button" class="nb-color-opt nb-color-opt-blue ${btn.color === "blue" ? "" : "nb-color-inactive"}" data-btn-color="blue">Azul</button>
                                    <button type="button" class="nb-color-opt nb-color-opt-orange ${btn.color !== "blue" ? "" : "nb-color-inactive"}" data-btn-color="orange">Naranja</button>
                                </div>
                            </div>`;

                        btnCard
                            .querySelectorAll("[data-btn-field]")
                            .forEach((input) => {
                                input.addEventListener("input", () => {
                                    btn[input.dataset.btnField] = input.value;
                                    if (input.dataset.btnField === "icon") {
                                        const preview =
                                            btnCard.querySelector(
                                                ".nb-icon-preview i",
                                            );
                                        if (preview)
                                            preview.className =
                                                input.value.trim() ||
                                                "ri-star-line";
                                    }
                                });
                            });

                        const btnUrlInput =
                            btnCard.querySelector(".nb-url-input");
                        if (btnUrlInput) attachUrlAutocomplete(btnUrlInput);

                        btnCard
                            .querySelectorAll("[data-btn-color]")
                            .forEach((colorBtn) => {
                                colorBtn.addEventListener("click", () => {
                                    btn.color = colorBtn.dataset.btnColor;
                                    btnCard
                                        .querySelectorAll("[data-btn-color]")
                                        .forEach((b) => {
                                            b.classList.toggle(
                                                "nb-color-inactive",
                                                b.dataset.btnColor !==
                                                colorBtn.dataset.btnColor,
                                            );
                                        });
                                });
                            });

                        btnCard
                            .querySelector(".nb-pick-cta-icon")
                            .addEventListener("click", () => {
                                iconPicker.open((selected) => {
                                    btn.icon = selected;
                                    renderCtaButtons();
                                });
                            });

                        btnCard
                            .querySelector(".nb-remove-cta-btn")
                            .addEventListener("click", () => {
                                item.cta_column.buttons.splice(bi, 1);
                                renderCtaButtons();
                            });

                        ctaButtonsList.appendChild(btnCard);
                    });

                    const atLimit = item.cta_column.buttons.length >= 2;
                    addCtaBtn.disabled = atLimit;
                    addCtaBtn.style.opacity = atLimit ? "0.4" : "";
                    addCtaBtn.style.cursor = atLimit ? "not-allowed" : "";
                }
                renderCtaButtons();

                addCtaBtn.addEventListener("click", () => {
                    if (item.cta_column.buttons.length >= 2) return;
                    item.cta_column.buttons.push({
                        label: "Nuevo botón",
                        href: "#",
                        color: "orange",
                        icon: "",
                    });
                    renderCtaButtons();
                });

                const colsList = card.querySelector(".nb-columns-list");
                function renderColumns() {
                    colsList.innerHTML = "";
                    (item.columns || []).forEach((col, ci) => {
                        const colCard = document.createElement("div");
                        colCard.className = "nb-col-card";
                        const itemsHtml = (col.items || [])
                            .map(
                                (it, ii) => `
                            <div class="nb-col-item" data-item-idx="${ii}">
                                <div class="nb-col-item-row">
                                    <input class="nb-input-sm" style="flex:1;" placeholder="Título del item" value="${it.label || ""}" data-item-field="label">
                                    <button class="nb-btn-remove nb-remove-item" style="padding:0.2rem;"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                <input class="nb-input-sm" style="width:100%;box-sizing:border-box;" placeholder="Descripción (opcional)" value="${it.desc || ""}" data-item-field="desc">
                                <div style="position:relative;">
                                    <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL" value="${it.href || "#"}" data-item-field="href">
                                </div>
                            </div>`,
                            )
                            .join("");

                        colCard.innerHTML = `
                            <div class="nb-col-card-header">
                                <span style="font-size:0.75rem;font-weight:700;color:#475569;">Columna ${ci + 1}</span>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Badge (ej: Tus ahorros)" value="${col.badge || ""}" data-col-field="badge">
                                <div class="nb-color-toggle" style="gap:0.25rem;">
                                    <button class="nb-color-opt nb-color-opt-blue ${(col.badge_color || "blue") === "blue" ? "" : "nb-color-inactive"}" data-col-color="blue" style="padding:0.2rem 0.5rem;font-size:0.65rem;">Azul</button>
                                    <button class="nb-color-opt nb-color-opt-orange ${(col.badge_color || "blue") === "orange" ? "" : "nb-color-inactive"}" data-col-color="orange" style="padding:0.2rem 0.5rem;font-size:0.65rem;">Naranja</button>
                                </div>
                                <button class="nb-btn-remove nb-remove-col"><i class="ri-delete-bin-line"></i></button>
                            </div>
                            <div class="nb-col-items">${itemsHtml}</div>
                            <div class="nb-add-row" style="margin-top:0.375rem;">
                                <button class="nb-btn-add nb-btn-add-item nb-add-item-btn" style="font-size:0.7rem;padding:0.25rem 0.5rem;"><i class="ri-add-line"></i> Agregar item</button>
                            </div>`;
                        colCard
                            .querySelector("[data-col-field='badge']")
                            .addEventListener("input", (e) => {
                                col.badge = e.target.value;
                            });
                        colCard
                            .querySelectorAll("[data-col-color]")
                            .forEach((btn) => {
                                btn.addEventListener("click", () => {
                                    col.badge_color = btn.dataset.colColor;
                                    colCard
                                        .querySelectorAll("[data-col-color]")
                                        .forEach((b) => {
                                            b.classList.toggle(
                                                "nb-color-inactive",
                                                b.dataset.colColor !==
                                                btn.dataset.colColor,
                                            );
                                        });
                                });
                            });
                        colCard.querySelector(".nb-remove-col").onclick =
                            () => {
                                item.columns.splice(ci, 1);
                                renderColumns();
                                const addColBtn =
                                    card.querySelector(".nb-add-col-btn");
                                if (addColBtn) {
                                    addColBtn.disabled = false;
                                    addColBtn.style.opacity = "";
                                    addColBtn.style.cursor = "";
                                }
                            };
                        colCard
                            .querySelectorAll("[data-item-field]")
                            .forEach((input) => {
                                const ii = parseInt(
                                    input.closest("[data-item-idx]").dataset
                                        .itemIdx,
                                );
                                input.addEventListener("input", () => {
                                    col.items[ii][input.dataset.itemField] =
                                        input.value;
                                });
                            });
                        colCard
                            .querySelectorAll(".nb-url-input")
                            .forEach((urlInput) => {
                                const wrapper = document.createElement("div");
                                wrapper.style.position = "relative";
                                urlInput.parentNode.insertBefore(
                                    wrapper,
                                    urlInput,
                                );
                                wrapper.appendChild(urlInput);
                                attachUrlAutocomplete(urlInput);
                            });
                        colCard
                            .querySelectorAll(".nb-remove-item")
                            .forEach((btn) => {
                                btn.onclick = () => {
                                    const ii = parseInt(
                                        btn.closest("[data-item-idx]").dataset
                                            .itemIdx,
                                    );
                                    col.items.splice(ii, 1);
                                    renderColumns();
                                };
                            });
                        colCard.querySelector(".nb-add-item-btn").onclick =
                            () => {
                                col.items = col.items || [];
                                col.items.push({
                                    label: "Nuevo item",
                                    desc: "",
                                    href: "#",
                                });
                                renderColumns();
                            };

                        colsList.appendChild(colCard);
                    });
                }
                renderColumns();
                card.querySelector(".nb-add-col-btn").onclick = () => {
                    if ((item.columns || []).length >= 3) return;
                    item.columns = item.columns || [];
                    item.columns.push({
                        badge: "Nueva columna",
                        badge_color: "blue",
                        items: [{ label: "Nuevo item", desc: "", href: "#" }],
                    });
                    renderColumns();
                    if (item.columns.length >= 3) {
                        const btn = card.querySelector(".nb-add-col-btn");
                        btn.disabled = true;
                        btn.style.opacity = "0.4";
                        btn.style.cursor = "not-allowed";
                    }
                };
            } else {
                card.innerHTML = `
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${typeBadge}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${item.label || ""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div style="position:relative;">
                            <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${item.href || ""}" data-field="href">
                        </div>
                        <div class="nb-row">
                            <div class="nb-icon-preview"><i class="${item.icon || "ri-star-line"}"></i></div>
                            <input class="nb-input-sm" style="flex:1;" placeholder="Sin icono (opcional)" value="${item.icon || ""}" data-field="icon">
                            <button type="button" class="nb-pick-btn nb-pick-link-icon"><i class="ri-emotion-happy-line"></i> Icono</button>
                        </div>
                    </div>`;

                card.querySelector("[data-toggle-type]").onclick = () => {
                    item.type = "submenu";
                    item.columns = [
                        {
                            badge: "Columna 1",
                            badge_color: "blue",
                            items: [{ label: "Enlace", desc: "", href: "#" }],
                        },
                    ];
                    item.cta_column = { text: "", buttons: [] };
                    delete item.href;
                    renderNavLinks();
                };
                card.querySelector(".nb-remove-link").onclick = () => {
                    navLinks.splice(idx, 1);
                    renderNavLinks();
                };
                card.querySelectorAll("[data-field]").forEach((input) => {
                    input.addEventListener("input", () => {
                        item[input.dataset.field] = input.value;
                    });
                });

                const linkIconInput = card.querySelector("[data-field='icon']");
                if (linkIconInput) {
                    linkIconInput.addEventListener("input", () => {
                        const preview =
                            card.querySelector(".nb-icon-preview i");
                        if (preview)
                            preview.className =
                                linkIconInput.value.trim() || "ri-star-line";
                    });
                }

                card.querySelector(".nb-pick-link-icon").addEventListener(
                    "click",
                    () => {
                        iconPicker.open((selected) => {
                            item.icon = selected;
                            if (linkIconInput) linkIconInput.value = selected;
                            const preview =
                                card.querySelector(".nb-icon-preview i");
                            if (preview) preview.className = selected;
                        });
                    },
                );

                const urlInput = card.querySelector(".nb-url-input");
                if (urlInput) {
                    const wrapper = document.createElement("div");
                    wrapper.style.position = "relative";
                    urlInput.parentNode.insertBefore(wrapper, urlInput);
                    wrapper.appendChild(urlInput);
                    attachUrlAutocomplete(urlInput);
                }
            }

            list.appendChild(card);
        });
        makeDraggable(list, navLinks, renderNavLinks);
    }
    modal
        .querySelectorAll("#nb-banking-blue, #nb-banking-orange")
        .forEach((btn) => {
            btn.addEventListener("click", () => {
                bankingBtn.color = btn.dataset.color;
                modal
                    .querySelector("#nb-banking-blue")
                    .classList.toggle(
                        "nb-color-inactive",
                        bankingBtn.color !== "blue",
                    );
                modal
                    .querySelector("#nb-banking-orange")
                    .classList.toggle(
                        "nb-color-inactive",
                        bankingBtn.color !== "orange",
                    );
            });
        });
    modal.querySelectorAll("#nb-bcta-blue, #nb-bcta-orange").forEach((btn) => {
        btn.addEventListener("click", () => {
            bottomCta.color = btn.dataset.color;
            modal
                .querySelector("#nb-bcta-blue")
                .classList.toggle(
                    "nb-color-inactive",
                    bottomCta.color !== "blue",
                );
            modal
                .querySelector("#nb-bcta-orange")
                .classList.toggle(
                    "nb-color-inactive",
                    bottomCta.color !== "orange",
                );
        });
    });
    const bankingHrefInput = modal.querySelector("#nb-banking-href");
    if (bankingHrefInput) {
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        bankingHrefInput.parentNode.insertBefore(wrapper, bankingHrefInput);
        wrapper.appendChild(bankingHrefInput);
        attachUrlAutocomplete(bankingHrefInput);
    }
    const bctaHrefInput = modal.querySelector("#nb-bcta-href");
    if (bctaHrefInput) {
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        bctaHrefInput.parentNode.insertBefore(wrapper, bctaHrefInput);
        wrapper.appendChild(bctaHrefInput);
        attachUrlAutocomplete(bctaHrefInput);
    }
    const logoHrefInput = modal.querySelector("#nb-logo-href");
    if (logoHrefInput) {
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        logoHrefInput.parentNode.insertBefore(wrapper, logoHrefInput);
        wrapper.appendChild(logoHrefInput);
        attachUrlAutocomplete(logoHrefInput);
    }
    modal.querySelector("#nb-add-top-action").onclick = () => {
        topActions.push({
            label: "Nueva acción",
            href: "#",
            icon: "ri-star-line",
        });
        renderTopActions();
        modal
            .querySelector("#nb-top-actions-list")
            .lastElementChild?.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
    };
    modal.querySelector("#nb-add-nav-link").onclick = () => {
        navLinks.push({ type: "link", label: "Nuevo enlace", href: "#" });
        renderNavLinks();
        modal.querySelector("#nb-nav-list").lastElementChild?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    };
    modal.querySelector("#nb-add-nav-submenu").onclick = () => {
        navLinks.push({
            type: "submenu",
            label: "Nuevo menú",
            columns: [
                {
                    badge: "Columna 1",
                    badge_color: "blue",
                    items: [{ label: "Enlace", desc: "", href: "#" }],
                },
            ],
            cta_column: { text: "", buttons: [] },
        });
        renderNavLinks();
        modal.querySelector("#nb-nav-list").lastElementChild?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    };
    renderTopActions();
    renderNavLinks();

    const iconBtnData = JSON.parse(
        JSON.stringify(currentData.icon_btn || DEFAULT_DATA.icon_btn),
    );

    const iconBtnToggleWrap = modal.querySelector("#nb-iconbtn-toggle-wrap");
    const iconBtnSwitchId =
        "nb-iconbtn-switch-" + Math.random().toString(36).slice(2, 6);
    iconBtnToggleWrap.innerHTML = `
        <label style="position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;">
            <input type="checkbox" id="${iconBtnSwitchId}" ${iconBtnData.enabled !== false ? "checked" : ""} style="opacity:0;width:0;height:0;">
            <span style="position:absolute;inset:0;background:${iconBtnData.enabled !== false ? "#003B71" : "#cbd5e1"};border-radius:9999px;transition:background 0.2s;cursor:pointer;"></span>
            <span style="position:absolute;width:16px;height:16px;left:${iconBtnData.enabled !== false ? "21px" : "3px"};top:3px;background:#fff;border-radius:50%;transition:left 0.2s;pointer-events:none;"></span>
        </label>
        <span style="font-size:0.875rem;color:#475569;">${iconBtnData.enabled !== false ? "Botón activo" : "Botón desactivado"}</span>`;

    const iconBtnSwitch = iconBtnToggleWrap.querySelector(
        `#${iconBtnSwitchId}`,
    );
    iconBtnSwitch.addEventListener("change", function () {
        iconBtnData.enabled = this.checked;
        const slider = iconBtnToggleWrap.querySelector("span:nth-child(2)");
        const knob = iconBtnToggleWrap.querySelector("span:nth-child(3)");
        const label = iconBtnToggleWrap.querySelector("span:last-child");
        if (slider)
            slider.style.background = this.checked ? "#003B71" : "#cbd5e1";
        if (knob) knob.style.left = this.checked ? "21px" : "3px";
        if (label)
            label.textContent = this.checked
                ? "Botón activo"
                : "Botón desactivado";
    });

    modal.querySelector("#nb-iconbtn-icon").value =
        iconBtnData.icon || "ri-search-line";
    modal.querySelector("#nb-iconbtn-preview").className =
        iconBtnData.icon || "ri-search-line";
    modal.querySelector("#nb-iconbtn-label").value =
        iconBtnData.label || "Buscar";
    modal.querySelector("#nb-iconbtn-href").value = iconBtnData.href || "#";

    modal.querySelector("#nb-iconbtn-icon").addEventListener("input", (e) => {
        iconBtnData.icon = e.target.value;
        modal.querySelector("#nb-iconbtn-preview").className = e.target.value;
    });
    modal.querySelector("#nb-iconbtn-label").addEventListener("input", (e) => {
        iconBtnData.label = e.target.value;
    });

    modal.querySelector("#nb-iconbtn-pick").addEventListener("click", () => {
        const picker = new IconPickerModal();
        picker.open((selected) => {
            iconBtnData.icon = selected;
            modal.querySelector("#nb-iconbtn-icon").value = selected;
            modal.querySelector("#nb-iconbtn-preview").className = selected;
        });
    });

    const iconBtnHrefInput = modal.querySelector("#nb-iconbtn-href");
    if (iconBtnHrefInput) {
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        iconBtnHrefInput.parentNode.insertBefore(wrapper, iconBtnHrefInput);
        wrapper.appendChild(iconBtnHrefInput);
        attachUrlAutocomplete(iconBtnHrefInput);
    }
    modal.querySelector("#nb-modal-backup").onclick = () => {
        const snapshot = {
            icon_btn: {
                enabled: iconBtnData.enabled !== false,
                icon:
                    modal.querySelector("#nb-iconbtn-icon").value.trim() ||
                    "ri-search-line",
                label:
                    modal.querySelector("#nb-iconbtn-label").value.trim() ||
                    "Buscar",
                href:
                    modal.querySelector("#nb-iconbtn-href").value.trim() || "#",
            },
            logo_url: modal.querySelector("#nb-logo-url").value.trim(),
            logo_alt: modal.querySelector("#nb-logo-alt").value.trim(),
            logo_text: modal.querySelector("#nb-logo-text").value.trim(),
            logo_href: modal.querySelector("#nb-logo-href").value.trim() || "/",
            top_actions: JSON.parse(JSON.stringify(topActions)),
            banking_btn: {
                label: modal.querySelector("#nb-banking-label").value.trim(),
                href:
                    modal.querySelector("#nb-banking-href").value.trim() || "#",
                color: bankingBtn.color || "blue",
            },
            nav_links: JSON.parse(JSON.stringify(navLinks)),
            bottom_cta: {
                label: modal.querySelector("#nb-bcta-label").value.trim(),
                sublabel: modal.querySelector("#nb-bcta-sublabel").value.trim(),
                href: modal.querySelector("#nb-bcta-href").value.trim() || "#",
                color: bottomCta.color || "orange",
            },
        };
        const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        const a = document.createElement("a");
        a.href = url;
        a.download = `navbar-backup-${ts}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    };
    modal.querySelector("#nb-modal-restore-input").onchange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            let parsed;
            try {
                parsed = JSON.parse(ev.target.result);
            } catch {
                const errOverlay = document.createElement("div");
                errOverlay.className = "nb-confirm-overlay";
                errOverlay.innerHTML = `<div class="nb-confirm-modal"><div class="nb-confirm-header"><i class="ri-error-warning-line" style="color:#ef4444;"></i><h3>Archivo inválido</h3></div><div class="nb-confirm-body"><p>El archivo seleccionado no es un JSON válido.</p></div><div class="nb-confirm-footer"><button class="nb-confirm-ok" style="background:#ef4444;">Cerrar</button></div></div>`;
                document.body.appendChild(errOverlay);
                errOverlay.querySelector(".nb-confirm-ok").onclick = () =>
                    errOverlay.remove();
                e.target.value = "";
                return;
            }
            const confirmOverlay = document.createElement("div");
            confirmOverlay.className = "nb-confirm-overlay";
            confirmOverlay.innerHTML = `
                <div class="nb-confirm-modal">
                    <div class="nb-confirm-header">
                        <i class="ri-refresh-line"></i>
                        <h3>Restaurar configuración</h3>
                    </div>
                    <div class="nb-confirm-body">
                        <p>¿Deseas restaurar la configuración del navbar desde el archivo de respaldo?</p>
                        <p>Esta acción reemplazará la configuración actual del formulario.</p>
                        <span class="nb-confirm-filename"><i class="ri-file-code-line"></i>${file.name}</span>
                    </div>
                    <div class="nb-confirm-footer">
                        <button class="nb-confirm-cancel">Cancelar</button>
                        <button class="nb-confirm-ok"><i class="ri-check-line"></i> Sí, restaurar</button>
                    </div>
                </div>`;
            document.body.appendChild(confirmOverlay);
            confirmOverlay.querySelector(".nb-confirm-cancel").onclick = () => {
                confirmOverlay.remove();
                e.target.value = "";
            };
            confirmOverlay.querySelector(".nb-confirm-ok").onclick = () => {
                confirmOverlay.remove();
                e.target.value = "";
                const existingInner = component
                    .getEl()
                    ?.querySelector("[id^='nb-root-']");
                const uid =
                    existingInner?.id?.replace("nb-root-", "") ||
                    "nb" + Math.random().toString(36).slice(2, 7);
                component.addAttributes({
                    "data-navbar-config": JSON.stringify(parsed),
                });
                component.components(
                    buildNavbarHTML(parsed, uid) + NAVBAR_STYLES,
                );
                close();
                showNavbarModal(editor, component);
            };
        };
        reader.readAsText(file);
    };

    const close = () => {
        iconPicker.close();
        overlay.remove();
    };
    modal.querySelector("#nb-modal-close").onclick = close;
    modal.querySelector("#nb-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };
    modal.querySelector("#nb-modal-save").onclick = () => {
        const data = {
            icon_btn: {
                enabled: iconBtnData.enabled !== false,
                icon:
                    modal.querySelector("#nb-iconbtn-icon").value.trim() ||
                    "ri-search-line",
                label:
                    modal.querySelector("#nb-iconbtn-label").value.trim() ||
                    "Buscar",
                href:
                    modal.querySelector("#nb-iconbtn-href").value.trim() || "#",
            },
            logo_url: modal.querySelector("#nb-logo-url").value.trim(),
            logo_alt: modal.querySelector("#nb-logo-alt").value.trim(),
            logo_text: modal.querySelector("#nb-logo-text").value.trim(),
            logo_href: modal.querySelector("#nb-logo-href").value.trim() || "/",
            top_actions: topActions,
            banking_btn: {
                label: modal.querySelector("#nb-banking-label").value.trim(),
                href:
                    modal.querySelector("#nb-banking-href").value.trim() || "#",
                color: bankingBtn.color || "blue",
            },
            nav_links: navLinks,
            bottom_cta: {
                label: modal.querySelector("#nb-bcta-label").value.trim(),
                sublabel: modal.querySelector("#nb-bcta-sublabel").value.trim(),
                href: modal.querySelector("#nb-bcta-href").value.trim() || "#",
                color: bottomCta.color || "orange",
            },
        };

        const existingInner = component
            .getEl()
            ?.querySelector("[id^='nb-root-']");
        const uid =
            existingInner?.id?.replace("nb-root-", "") ||
            "nb" + Math.random().toString(36).slice(2, 7);
        component.addAttributes({ "data-navbar-config": JSON.stringify(data) });
        component.components(buildNavbarHTML(data, uid) + NAVBAR_STYLES);
        close();
    };
}
export function initializeNavbarBlock(editor) {
    const componentType = "navbar-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Navbar",
                tagName: "nav",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: {
                    "data-gjs-type": componentType,
                    class: "nb-wrapper",
                    "data-navbar-config": JSON.stringify(DEFAULT_DATA),
                },
                components: buildNavbarHTML(DEFAULT_DATA) + NAVBAR_STYLES,
                script: function () {
                    (function (root) {
                        if (!root || typeof root.querySelector !== "function")
                            return;
                        if (root.__nbInit) return;
                        root.__nbInit = true;
                        var id = root
                            .querySelector("[id^='nb-root-']")
                            ?.id?.replace("nb-root-", "");
                        if (!id) return;
                        var inEditor =
                            !!window.__gjseditor ||
                            document.documentElement.hasAttribute(
                                "data-gjs-canvas",
                            );
                        function pad() {
                            if (!inEditor)
                                document.body.style.paddingTop =
                                    root.offsetHeight + "px";
                        }
                        pad();
                        window.addEventListener("resize", function () {
                            pad();
                            if (window.innerWidth > 992) {
                                var mob = document.getElementById(
                                    "nb-mobile-" + id,
                                );
                                if (mob && mob.classList.contains("nb-open"))
                                    mob.classList.remove("nb-open");
                                root.querySelectorAll(
                                    ".nb-mobile-item.nb-open",
                                ).forEach(function (el) {
                                    el.classList.remove("nb-open");
                                });
                            }
                        });
                        var toggle = document.getElementById("nb-toggle-" + id);
                        var mobile = document.getElementById("nb-mobile-" + id);
                        if (toggle && mobile) {
                            toggle.addEventListener("click", function () {
                                mobile.classList.toggle("nb-open");
                                pad();
                            });
                        }
                        root.querySelectorAll(".nb-nav-trigger").forEach(
                            function (btn) {
                                btn.addEventListener("click", function (e) {
                                    e.stopPropagation();
                                    var item = btn.closest(".nb-nav-item");
                                    var open =
                                        item.classList.contains("nb-open");
                                    root.querySelectorAll(
                                        ".nb-nav-item.nb-open",
                                    ).forEach(function (el) {
                                        el.classList.remove("nb-open");
                                    });
                                    if (!open) item.classList.add("nb-open");
                                    pad();
                                });
                            },
                        );
                        root.querySelectorAll(
                            ".nb-mobile-item>.nb-mobile-link",
                        ).forEach(function (btn) {
                            btn.addEventListener("click", function () {
                                btn.closest(".nb-mobile-item").classList.toggle(
                                    "nb-open",
                                );
                                pad();
                            });
                        });
                        document.addEventListener("click", function (e) {
                            if (!root.contains(e.target)) {
                                root.querySelectorAll(
                                    ".nb-nav-item.nb-open",
                                ).forEach(function (el) {
                                    el.classList.remove("nb-open");
                                });
                            }
                        });
                    })(this);
                },
                "script-props": [],
                traits: [
                    {
                        type: "button",
                        label: "Navbar",
                        text: "Administrar Navbar",
                        full: true,
                        command: "open-navbar-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-navbar-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showNavbarModal(ed, selected);
        },
    });

    editor.BlockManager.add("navbar-block", {
        label: "Navbar",
        category: "Navbar",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="4" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
            <rect x="17" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
            <rect x="22" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
            <rect x="24" y="3" width="6" height="5" rx="2.5" fill="#E97300"/>
            <rect x="2" y="15" width="4" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="8" y="15" width="4" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="14" y="15" width="5" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="21" y="15" width="5" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="24" y="13" width="6" height="5" rx="2.5" fill="#E97300"/>
        </svg>`,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    setupNavbarEditorEvents(editor, componentType);
    injectNavbarCanvasStyles(editor);
}
function setupNavbarEditorEvents(editor, componentType) {
    editor.on("storage:end:load", () => {
        setTimeout(() => reinitNavbar(editor, componentType), 800);
    });

    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (el?.getAttribute?.("data-gjs-type") === componentType) {
            component.set("type", componentType);
            setTimeout(() => runNavbarScriptInCanvas(editor, el), 400);
        }
    });

    editor.on("canvas:render", () => {
        setTimeout(() => reinitNavbar(editor, componentType), 600);
    });
}

function runNavbarScriptInCanvas(editor, el) {
    if (!el?.isConnected) return;
    try {
        const iframeDoc = editor.Canvas.getFrameEl()?.contentDocument;
        if (!iframeDoc) return;
        if (el.__nbInit) delete el.__nbInit;
        const scriptEl = iframeDoc.createElement("script");
        scriptEl.textContent = `(function(){
            function initNavbar(root){
                if(!root||root.__nbInit)return;
                root.__nbInit=true;
                var id=root.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");
                if(!id)return;
                function pad(){document.body.style.paddingTop=root.offsetHeight+"px";}
                pad();
                window.addEventListener("resize",function(){pad();});
                var toggle=document.getElementById("nb-toggle-"+id);
                var mobile=document.getElementById("nb-mobile-"+id);
                if(toggle&&mobile){toggle.addEventListener("click",function(){mobile.classList.toggle("nb-open");pad();});}
                root.querySelectorAll(".nb-nav-trigger").forEach(function(btn){
                    btn.addEventListener("click",function(e){
                        e.stopPropagation();
                        var item=btn.closest(".nb-nav-item");
                        var open=item.classList.contains("nb-open");
                        root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
                        if(!open)item.classList.add("nb-open");
                        pad();
                    });
                });
                root.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(btn){
                    btn.addEventListener("click",function(){btn.closest(".nb-mobile-item").classList.toggle("nb-open");pad();});
                });
                document.addEventListener("click",function(e){
                    if(!root.contains(e.target)){root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});}
                });
            }
            document.querySelectorAll("nav[data-gjs-type='navbar-component']").forEach(function(nav){initNavbar(nav);});
        })();`;
        iframeDoc.head.appendChild(scriptEl);
        scriptEl.remove();
    } catch (e) {
        console.warn("[Navbar] Error inyectando script en canvas:", e);
    }
}

function reinitNavbar(editor, componentType) {
    editor
        .getWrapper()
        .find(`[data-gjs-type="${componentType}"]`)
        .forEach((comp) => {
            comp.set("type", componentType);
            const el = comp.getEl();
            if (el?.isConnected) runNavbarScriptInCanvas(editor, el);
        });
}

function injectNavbarCanvasStyles(editor) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const iframeDoc = iframe.contentDocument;
        const head = iframeDoc?.head;
        if (!head) return;
        iframeDoc.documentElement?.setAttribute("data-gjs-canvas", "true");
        if (!head.querySelector("#navbar-component-css")) {
            const style = document.createElement("style");
            style.id = "navbar-component-css";
            style.textContent = `
                [data-gjs-type="navbar-component"] {
                    position: relative !important;
                    top: auto !important;
                }
                body { padding-top: 0 !important; }
            `;
            head.appendChild(style);
        }
    });
}
