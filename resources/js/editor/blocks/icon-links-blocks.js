import { assetUrl } from "@/utils/url.js";

const iconLinksIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="6" cy="11" r="4" fill="#dce8f5"/>
    <circle cx="16" cy="11" r="4" fill="#dce8f5"/>
    <circle cx="26" cy="11" r="4" fill="#dce8f5"/>
    <rect x="4" y="10" width="4" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="14" y="10" width="4" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="24" y="10" width="4" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="3" y="18" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="13" y="18" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="23" y="18" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="21" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="21" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="24" y="21" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`;

const iconLinkItem = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#dce8f5"/>
    <rect x="13" y="10" width="6" height="4" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="10" y="21" width="12" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="11" y="24" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`;

const ICON_LINK_ITEM = `
<a href="#" class="il-item flex flex-col items-center text-center gap-4 no-underline">
    <div class="w-14 h-14 flex items-center justify-center">
        <img src="${assetUrl("images/placeholder.svg")}" alt="" class="w-full h-full object-contain">
    </div>
    <span class="il-item__label text-lg font-semibold leading-snug">Nombre del servicio</span>
</a>`;

const ICON_LINKS_STYLES = `
<style>
.il-section{width:100%;background:#ffffff;}
.il-grid{grid-template-columns:repeat(4,1fr);}
.il-item__label{color:#003B71;}
.il-item:hover .il-item__label{color:#F07C28;transition:color .2s ease;}
@media(max-width:992px){.il-grid{grid-template-columns:repeat(2,1fr);}}
</style>`;

export const iconLinksBlocks = [
    {
        id: "icon-links-strip",
        label: "Iconos con enlace",
        category: "Productos y Servicios",
        media: iconLinksIcon,
        content: `
<section class="il-section w-full px-16 py-14 bg-white">
    <div class="il-grid grid gap-8">
        ${ICON_LINK_ITEM}
        ${ICON_LINK_ITEM}
        ${ICON_LINK_ITEM}
        ${ICON_LINK_ITEM}
    </div>
</section>
${ICON_LINKS_STYLES}`,
    },
    {
        id: "icon-link-item",
        label: "Icono con enlace",
        category: "Productos y Servicios",
        media: iconLinkItem,
        content: `${ICON_LINK_ITEM}${ICON_LINKS_STYLES}`,
    },
];