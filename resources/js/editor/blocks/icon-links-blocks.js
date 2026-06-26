import { assetUrl } from "@/utils/url.js";

const iconLinksIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="6" cy="11" r="4" fill="#E97300" fill-opacity="0.85"/>
    <circle cx="16" cy="11" r="4" fill="#E97300" fill-opacity="0.85"/>
    <circle cx="26" cy="11" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="4" y="10" width="4" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="14" y="10" width="4" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="24" y="10" width="4" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="3" y="18" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="13" y="18" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="23" y="18" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="21" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="21" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="24" y="21" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`;

const iconLinkItem = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#E97300" fill-opacity="0.85"/>
    <rect x="13" y="10" width="6" height="4" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="10" y="21" width="12" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="11" y="24" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`;

const ICON_LINK_ITEM = `
<a href="#" class="flex flex-col items-center text-center gap-4 no-underline group">
    <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-[#E97300]">
        <img src="${assetUrl("images/placeholder.svg")}" alt="" class="w-8 h-8 object-contain">
    </div>
    <span class="text-base font-semibold leading-snug text-[#003B71] group-hover:text-[#E97300] transition-colors duration-200">Nombre del servicio</span>
</a>`;

const ICON_LINKS_STYLES = `
<style>
.il-section{width:100%;background:#ffffff;padding:3.5rem 4rem;}
.il-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
@media(max-width:1280px){.il-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.il-section{padding:2.5rem 1.5rem;}.il-grid{grid-template-columns:repeat(2,1fr);gap:2rem;}}
@media(max-width:480px){.il-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem;}}
</style>`;

export const iconLinksBlocks = [
    {
        id: "icon-links-strip",
        label: "Iconos con enlace",
        category: "Productos y Servicios",
        media: iconLinksIcon,
        content: `
<section class="il-section">
    <div class="il-grid">
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
