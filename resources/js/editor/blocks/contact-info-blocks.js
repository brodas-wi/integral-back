const contactInfoRowIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="11" width="28" height="10" fill="white" rx="5" stroke="#e5e7eb" stroke-width="0.8"/>
    <circle cx="9" cy="16" r="3" fill="#E97300" fill-opacity="0.15"/>
    <rect x="7.5" y="14.5" width="3" height="3" rx="0.5" fill="#E97300" fill-opacity="0.8"/>
    <rect x="13" y="14.5" width="5" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="13" y="17" width="4" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="19.5" y="15.5" width="0.8" height="1" rx="0.4" fill="#e5e7eb"/>
    <circle cx="23" cy="16" r="3" fill="#E97300" fill-opacity="0.15"/>
    <rect x="21.5" y="14.5" width="3" height="3" rx="0.5" fill="#E97300" fill-opacity="0.8"/>
</svg>`;

const contactInfoColIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="2" width="24" height="12" fill="white" rx="5" stroke="#e5e7eb" stroke-width="0.8"/>
    <circle cx="11" cy="8" r="3" fill="#E97300" fill-opacity="0.15"/>
    <rect x="9.5" y="6.5" width="3" height="3" rx="0.5" fill="#E97300" fill-opacity="0.8"/>
    <rect x="14" y="6.5" width="8" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="14" y="9" width="6" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="4" y="18" width="24" height="12" fill="white" rx="5" stroke="#e5e7eb" stroke-width="0.8"/>
    <circle cx="11" cy="24" r="3" fill="#E97300" fill-opacity="0.15"/>
    <rect x="9.5" y="22.5" width="3" height="3" rx="0.5" fill="#E97300" fill-opacity="0.8"/>
    <rect x="14" y="22.5" width="8" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="14" y="25" width="6" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
</svg>`;

const contactInfoItemIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="10" width="28" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <circle cx="10" cy="16" r="3.5" fill="#E97300" fill-opacity="0.15"/>
    <rect x="8.5" y="14.5" width="3" height="3" rx="0.5" fill="#E97300" fill-opacity="0.9"/>
    <rect x="15" y="14" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="15" y="17" width="8" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
</svg>`;

const CONTACT_ITEM = (remixIcon, label, value, href) => `
<div class="ci-pill">
    <div class="ci-pill-icon">
        <i class="${remixIcon}"></i>
    </div>
    <div class="flex flex-col gap-0.5">
        <span class="text-sm font-bold uppercase tracking-wide text-[#003B71]">${label}</span>
        <a href="${href}" class="text-sm font-medium text-[#E97300] no-underline hover:opacity-75 transition-opacity">${value}</a>
    </div>
</div>`;

const CONTACT_INFO_STYLES = `
<style>
.ci-section{width:100%;padding:2rem 4rem;background:#ffffff;box-sizing:border-box;}
.ci-pill{display:inline-flex;align-items:center;gap:1rem;background:#ffffff;border-radius:9999px;padding:0.875rem 1.75rem;box-shadow:0 2px 16px rgba(0,59,113,0.1);border:1px solid #f1f5f9;}
.ci-pill-icon{width:2.5rem;height:2.5rem;border-radius:50%;background:rgba(233,115,0,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ci-pill-icon i{font-size:1.25rem;color:#E97300;}
.ci-row{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:1rem;flex-wrap:wrap;}
.ci-col{display:flex;flex-direction:column;align-items:flex-start;gap:1rem;}
.ci-divider{width:1px;height:2.5rem;background:#e5e7eb;flex-shrink:0;}
@media(max-width:1280px){.ci-section{padding:2rem 2.5rem;}}
@media(max-width:992px){.ci-section{padding:2rem 1.5rem;}.ci-row{flex-direction:column;}.ci-divider{display:none;}}
@media(max-width:480px){.ci-pill{width:100%;box-sizing:border-box;}}
</style>`;

export const contactInfoBlocks = [
    {
        id: "contact-info-row",
        label: "Contacto en fila",
        category: "Contacto",
        media: contactInfoRowIcon,
        content: `
<section class="ci-section">
    <div class="ci-row">
        ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090")}
        <div class="ci-divider"></div>
        ${CONTACT_ITEM("ri-mail-fill", "Correo", "servicio.cliente@bancointegral.com", "mailto:servicio.cliente@bancointegral.com")}
    </div>
</section>
${CONTACT_INFO_STYLES}`,
    },
    {
        id: "contact-info-col",
        label: "Contacto en columna",
        category: "Contacto",
        media: contactInfoColIcon,
        content: `
<section class="ci-section">
    <div class="ci-col">
        ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090")}
        ${CONTACT_ITEM("ri-mail-fill", "Correo", "servicio.cliente@bancointegral.com", "mailto:servicio.cliente@bancointegral.com")}
    </div>
</section>
${CONTACT_INFO_STYLES}`,
    },
    {
        id: "contact-info-item",
        label: "Ítem de contacto",
        category: "Contacto",
        media: contactInfoItemIcon,
        content: `
<section class="ci-section">
    <div class="ci-col">
        ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090")}
    </div>
</section>
${CONTACT_INFO_STYLES}`,
    },
];
