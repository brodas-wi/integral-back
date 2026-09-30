import { assetUrl } from "@/utils/url.js";

const iconLinksIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect y="4" width="32" height="24" fill="white"/>
    <circle cx="5.1" cy="13" r="3.3" fill="#E97300"/>
    <circle cx="12.4" cy="13" r="3.3" fill="#E97300"/>
    <circle cx="19.6" cy="13" r="3.3" fill="#E97300"/>
    <circle cx="26.9" cy="13" r="3.3" fill="#E97300"/>
    <rect x="3.4" y="11.8" width="3.4" height="2.4" rx="0.6" fill="white" fill-opacity="0.9"/>
    <rect x="10.7" y="11.8" width="3.4" height="2.4" rx="0.6" fill="white" fill-opacity="0.9"/>
    <rect x="17.9" y="11.8" width="3.4" height="2.4" rx="0.6" fill="white" fill-opacity="0.9"/>
    <rect x="25.2" y="11.8" width="3.4" height="2.4" rx="0.6" fill="white" fill-opacity="0.9"/>
    <rect x="2.4" y="19.5" width="5.4" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.75"/>
    <rect x="9.7" y="19.5" width="5.4" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.75"/>
    <rect x="16.9" y="19.5" width="5.4" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.75"/>
    <rect x="24.2" y="19.5" width="5.4" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.75"/>
</svg>`;

const iconLinkItem = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12.5" r="9" fill="#E97300"/>
    <rect x="12" y="10" width="8" height="5.5" rx="1.5" fill="white" fill-opacity="0.9"/>
    <rect x="7" y="24" width="18" height="2.4" rx="1.2" fill="#003B71" fill-opacity="0.75"/>
</svg>`;

const ICON_LINK_ITEM = `
<a href="#" class="group flex flex-col items-center gap-4 text-center no-underline focus-visible:outline-none">
    <img src="${assetUrl("images/placeholder.svg")}" alt="" class="h-16 w-16 object-contain transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-110 group-focus-visible:scale-110 motion-reduce:transition-none md:h-20 md:w-20">
    <span class="text-base font-semibold leading-snug text-[#003B71] transition-colors duration-200 group-hover:text-[#E97300] group-focus-visible:text-[#E97300]">Nombre del servicio</span>
</a>`;

export const iconLinksBlocks = [
    {
        id: "icon-links-strip",
        label: "Iconos con enlace",
        category: "Accesos rápidos",
        media: iconLinksIcon,
        content: `
<section class="w-full bg-white px-6 py-10 lg:px-10 lg:py-12 xl:px-16 xl:py-14">
    <div class="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
        ${ICON_LINK_ITEM}
        ${ICON_LINK_ITEM}
        ${ICON_LINK_ITEM}
        ${ICON_LINK_ITEM}
    </div>
</section>`,
    },
    {
        id: "icon-link-item",
        label: "Icono con enlace",
        category: "Interactivos",
        media: iconLinkItem,
        content: ICON_LINK_ITEM,
    },
];