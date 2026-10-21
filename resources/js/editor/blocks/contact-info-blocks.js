const CATEGORY = "Contacto";

const CONTACT = {
    whatsapp: {
        icon: "ri-whatsapp-line",
        iconFill: "ri-whatsapp-fill",
        label: "Contáctenos",
        value: "(503)-2250-6090",
        href: "https://wa.me/50322506090",
    },
    email: {
        icon: "ri-mail-line",
        iconFill: "ri-mail-fill",
        label: "Correo",
        value: "servicio.cliente@bancointegral.com",
        href: "mailto:servicio.cliente@bancointegral.com",
    },
};

const STYLES = `<style>
.ci-section{width:100%;background-color:#fff;box-sizing:border-box;display:flex;justify-content:center;padding-top:clamp(1.5rem,3vw,2rem);padding-bottom:clamp(1.5rem,3vw,2rem);padding-left:max(clamp(1.5rem,4vw,3.5rem),calc((100% - 1600px) / 2 + clamp(1.5rem,4vw,3.5rem)));padding-right:max(clamp(1.5rem,4vw,3.5rem),calc((100% - 1600px) / 2 + clamp(1.5rem,4vw,3.5rem)));}
.ci-pill-row,.ci-pill-col{display:inline-flex;max-width:100%;box-sizing:border-box;background-color:#fff;border:1px solid #f1f5f9;box-shadow:0 2px 20px rgba(0,59,113,0.12);}
.ci-pill-row{flex-direction:row;align-items:center;gap:2rem;padding:1rem 2rem;border-radius:9999px;}
.ci-pill-col{flex-direction:column;gap:1.5rem;padding:1.5rem 2rem;border-radius:2rem;}
.ci-item{display:flex;flex-direction:row;align-items:center;gap:1rem;min-width:0;}
.ci-icon{font-size:2.75rem;line-height:1;color:#E97300;flex-shrink:0;}
.ci-text{display:flex;flex-direction:column;gap:0.125rem;min-width:0;}
.ci-label{font-size:1.0625rem;font-weight:700;letter-spacing:0.03em;text-transform:uppercase;color:#003B71;}
.ci-link{font-size:0.9375rem;font-weight:600;color:#E97300;text-decoration:none;overflow-wrap:anywhere;transition:color 0.2s ease;}
.ci-link:hover,.ci-link:focus-visible{color:#C96200;text-decoration:underline;text-underline-offset:3px;}
.ci-divider{width:3px;align-self:stretch;flex-shrink:0;background-color:#E97300;}
.ci-divider-h{width:100%;height:3px;flex-shrink:0;border-radius:9999px;background-color:#E97300;}
@media(max-width:992px){
.ci-pill-row{flex-direction:column;align-items:flex-start;gap:1.25rem;padding:1.5rem 2rem;border-radius:2rem;}
.ci-divider{width:100%;height:2px;align-self:auto;}
}
@media(max-width:480px){
.ci-pill-row,.ci-pill-col{width:100%;padding:1.25rem 1.5rem;}
.ci-icon{font-size:2.5rem;}
}
@media(prefers-reduced-motion:reduce){
.ci-link{transition:none;}
}
</style>`;

const ICONS = {
    row: `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="9" width="30" height="14" fill="white" rx="7" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="4" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="13" width="6" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="10" y="16" width="5" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="17.5" y="12" width="0.8" height="8" rx="0.4" fill="#e5e7eb"/>
    <rect x="20" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
</svg>`,
    col: `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="2" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="5.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="5.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="8.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="3" y="18" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="21.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="21.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="24.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
</svg>`,
    item: `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="9" width="30" height="14" fill="white" rx="7" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="5" y="12" width="5" height="8" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="13" y="12" width="12" height="2.5" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="13" y="16" width="9" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.8"/>
</svg>`,
};

const contactItem = ({ icon, label, value, href }) => `
<div class="ci-item">
    <i class="${icon} ci-icon"></i>
    <div class="ci-text">
        <span class="ci-label">${label}</span>
        <a href="${href}" class="ci-link">${value}</a>
    </div>
</div>`;

const rowItem = (key) => contactItem({ ...CONTACT[key], icon: CONTACT[key].icon });
const colItem = (key) => contactItem({ ...CONTACT[key], icon: CONTACT[key].iconFill });

const contactSection = (inner) => `
<section class="ci-section">
    ${inner}
</section>
${STYLES}`;

export const contactInfoBlocks = [
    {
        id: "contact-info-row",
        label: "Contacto en fila",
        category: CATEGORY,
        media: ICONS.row,
        content: contactSection(`<div class="ci-pill-row">
        ${rowItem("whatsapp")}
        <div class="ci-divider"></div>
        ${rowItem("email")}
    </div>`),
    },
    {
        id: "contact-info-col",
        label: "Contacto en columna",
        category: CATEGORY,
        media: ICONS.col,
        content: contactSection(`<div class="ci-pill-col">
        ${colItem("whatsapp")}
        <div class="ci-divider-h"></div>
        ${colItem("email")}
    </div>`),
    },
    {
        id: "contact-info-item",
        label: "Ítem de contacto",
        category: CATEGORY,
        media: ICONS.item,
        content: contactSection(`<div class="ci-pill-row">
        ${colItem("whatsapp")}
    </div>`),
    },
];