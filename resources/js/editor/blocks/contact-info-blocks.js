const contactInfoIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="10" y="7" width="14" height="10" fill="#F07C28" rx="2"/>
    <rect x="4" y="18" width="14" height="10" fill="#F07C28" rx="2"/>
    <rect x="4" y="7" width="4" height="4" fill="rgba(255,255,255,0.5)" rx="1"/>
    <rect x="14" y="22" width="8" height="1.5" fill="rgba(255,255,255,0.7)" rx="1"/>
    <rect x="14" y="25" width="5" height="1.5" fill="rgba(255,255,255,0.5)" rx="1"/>
    <rect x="10" y="10" width="8" height="1.5" fill="rgba(255,255,255,0.7)" rx="1"/>
    <rect x="10" y="13" width="5" height="1.5" fill="rgba(255,255,255,0.5)" rx="1"/>
</svg>`;

const CONTACT_ITEM = (remixIcon, label, value, href) => `
<div class="flex items-center gap-5">
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
.ci-item__label{color:#003B71;}
.ci-item__value{color:#F07C28;}
.ci-item__icon-i{font-size:2.5rem;color:#F07C28;}
@media(max-width:1280px){.ci-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.ci-section{padding:2.5rem 1.5rem;}}
</style>`;

export const contactInfoBlocks = [
    {
        id: "contact-info-left",
        label: "Información de contacto (izquierda)",
        category: "Contacto",
        media: contactInfoIcon,
        content: `
<section class="ci-section">
    <div class="flex flex-col gap-6">
        ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090")}
        ${CONTACT_ITEM("ri-mail-fill", "Correo", "servicio.cliente@bancointegral.com", "mailto:servicio.cliente@bancointegral.com")}
    </div>
</section>
${CONTACT_INFO_STYLES}`,
    },
    {
        id: "contact-info",
        label: "Información de contacto",
        category: "Contacto",
        media: contactInfoIcon,
        content: `
<section class="ci-section">
    <div class="flex flex-col gap-6">
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
        media: contactInfoIcon,
        content: `
<section class="ci-section">
    <div class="flex flex-col gap-6">
        ${CONTACT_ITEM("ri-phone-fill", "Contáctenos", "(503)-2250-6090", "tel:+50322506090")}
    </div>
</section>
${CONTACT_INFO_STYLES}`,
    },
];
