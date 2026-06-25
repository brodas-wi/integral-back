const contactInfoRowIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="9" width="30" height="14" fill="white" rx="7" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="4" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="13" width="6" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="10" y="16" width="5" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="17.5" y="12" width="0.8" height="8" rx="0.4" fill="#e5e7eb"/>
    <rect x="20" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="25.5" y="13" width="0" height="0" rx="0"/>
</svg>`;

const contactInfoColIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="2" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="5.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="5.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="8.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="3" y="18" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="21.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="21.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="24.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
</svg>`;

const contactInfoItemIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="9" width="30" height="14" fill="white" rx="7" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="5" y="12" width="5" height="8" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="13" y="12" width="12" height="2.5" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="13" y="16" width="9" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.8"/>
</svg>`;

const CONTACT_ITEM = (remixIcon, label, value, href) => `
<div class="ci-item">
    <i class="${remixIcon} ci-icon"></i>
    <div class="flex flex-col gap-0.5">
        <span class="text-sm font-bold uppercase tracking-wide text-[#003B71]">${label}</span>
        <a href="${href}" class="text-sm font-semibold text-[#E97300] no-underline hover:opacity-75 transition-opacity">${value}</a>
    </div>
</div>`;

const CONTACT_INFO_STYLES = `
<style>
.ci-section{width:100%;padding:2rem 4rem;background:#ffffff;box-sizing:border-box;}
.ci-pill-row{display:inline-flex;flex-direction:row;align-items:center;background:#ffffff;border-radius:9999px;padding:1rem 2rem;box-shadow:0 2px 20px rgba(0,59,113,0.12);border:1px solid #f1f5f9;gap:2rem;}
.ci-pill-col{display:inline-flex;flex-direction:column;background:#ffffff;border-radius:2rem;padding:1.5rem 2rem;box-shadow:0 2px 20px rgba(0,59,113,0.12);border:1px solid #f1f5f9;gap:1.5rem;}
.ci-item{display:flex;flex-direction:row;align-items:center;gap:1rem;}
.ci-icon{font-size:2rem;color:#E97300;flex-shrink:0;}
.ci-divider{width:3px;align-self:stretch;background:#e5e7eb;flex-shrink:0;}
.ci-row-wrap{display:flex;justify-content:center;}
.ci-col-wrap{display:flex;justify-content:flex-start;}
@media(max-width:1280px){.ci-section{padding:2rem 2.5rem;}}
@media(max-width:992px){
    .ci-section{padding:2rem 1.5rem;}
    .ci-pill-row{flex-direction:column;border-radius:2rem;padding:1.5rem 2rem;gap:1.25rem;}
    .ci-divider{width:100%;height:1px;align-self:auto;}
}
@media(max-width:480px){
    .ci-pill-row,.ci-pill-col{width:100%;box-sizing:border-box;}
}
</style>`;

export const contactInfoBlocks = [
    {
        id: "contact-info-row",
        label: "Contacto en fila",
        category: "Contacto",
        media: contactInfoRowIcon,
        content: `
<section class="ci-section">
    <div class="ci-row-wrap">
        <div class="ci-pill-row">
            ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090")}
            <div class="ci-divider"></div>
            ${CONTACT_ITEM("ri-mail-fill", "Correo", "servicio.cliente@bancointegral.com", "mailto:servicio.cliente@bancointegral.com")}
        </div>
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
    <div class="ci-col-wrap">
        <div class="ci-pill-col">
            ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090")}
            <div class="ci-divider"></div>
            ${CONTACT_ITEM("ri-mail-fill", "Correo", "servicio.cliente@bancointegral.com", "mailto:servicio.cliente@bancointegral.com")}
        </div>
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
    <div class="ci-row-wrap">
        <div class="ci-pill-row">
            ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090")}
        </div>
    </div>
</section>
${CONTACT_INFO_STYLES}`,
    },
];
