const contactInfoLeftIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <circle cx="8" cy="11" r="3.5" fill="#F07C28"/>
    <rect x="14" y="9" width="12" height="2" fill="#003B71" rx="1"/>
    <rect x="14" y="12.5" width="8" height="1.2" fill="#F07C28" rx="1"/>
    <circle cx="8" cy="23" r="3.5" fill="#F07C28"/>
    <rect x="14" y="21" width="12" height="2" fill="#003B71" rx="1"/>
    <rect x="14" y="24.5" width="8" height="1.2" fill="#F07C28" rx="1"/>
</svg>`;

const contactInfoRightIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <circle cx="24" cy="11" r="3.5" fill="#F07C28"/>
    <rect x="6" y="9" width="12" height="2" fill="#003B71" rx="1"/>
    <rect x="10" y="12.5" width="8" height="1.2" fill="#F07C28" rx="1"/>
    <circle cx="24" cy="23" r="3.5" fill="#F07C28"/>
    <rect x="6" y="21" width="12" height="2" fill="#003B71" rx="1"/>
    <rect x="10" y="24.5" width="8" height="1.2" fill="#F07C28" rx="1"/>
</svg>`;

const contactInfoItemIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <circle cx="8" cy="16" r="3.5" fill="#F07C28"/>
    <rect x="14" y="14" width="12" height="2" fill="#003B71" rx="1"/>
    <rect x="14" y="17.5" width="8" height="1.2" fill="#F07C28" rx="1"/>
</svg>`;

const CONTACT_ITEM = (remixIcon, label, value, href, right = false) => `
<div class="ci-item${right ? " ci-item--right" : ""}">
    <div class="ci-item__icon w-14 h-14 shrink-0 flex items-center justify-center">
        <i class="${remixIcon} ci-item__icon-i"></i>
    </div>
    <div class="flex flex-col gap-1">
        <span class="ci-item__label text-base font-bold uppercase tracking-wide">${label}</span>
        <a href="${href}" class="ci-item__value text-base no-underline transition-opacity duration-200 hover:opacity-75">${value}</a>
    </div>
</div>`;

const CONTACT_INFO_STYLES = `
<style>
.ci-section{width:100%;padding:3rem 4rem;background:#ffffff;box-sizing:border-box;}
.ci-list{display:flex;flex-direction:column;gap:1.5rem;}
.ci-list--right{align-items:flex-end;text-align:right;}
.ci-item{display:flex;align-items:center;gap:1.25rem;}
.ci-item--right{flex-direction:row-reverse;}
.ci-item__label{color:#003B71;}
.ci-item__value{color:#F07C28;}
.ci-item__icon-i{font-size:2.5rem;color:#F07C28;}
@media(max-width:1280px){.ci-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.ci-section{padding:2.5rem 1.5rem;}}
</style>`;

export const contactInfoBlocks = [
    {
        id: "contact-info-left",
        label: "Info de contacto (izquierda)",
        category: "Contacto",
        media: contactInfoLeftIcon,
        content: `
<section class="ci-section">
    <div class="ci-list">
        ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090")}
        ${CONTACT_ITEM("ri-mail-fill", "Correo", "servicio.cliente@bancointegral.com", "mailto:servicio.cliente@bancointegral.com")}
    </div>
</section>
${CONTACT_INFO_STYLES}`,
    },
    {
        id: "contact-info-right",
        label: "Info de contacto (derecha)",
        category: "Contacto",
        media: contactInfoRightIcon,
        content: `
<section class="ci-section">
    <div class="ci-list ci-list--right">
        ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090", true)}
        ${CONTACT_ITEM("ri-mail-fill", "Correo", "servicio.cliente@bancointegral.com", "mailto:servicio.cliente@bancointegral.com", true)}
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
    <div class="ci-list">
        ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090")}
    </div>
</section>
${CONTACT_INFO_STYLES}`,
    },
];
