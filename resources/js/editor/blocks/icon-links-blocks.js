import { assetUrl } from "@/utils/url.js";

const iconLinksIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="8" cy="12" r="4" fill="none" stroke="#F07C28" stroke-width="1.5"/>
    <circle cx="16" cy="12" r="4" fill="none" stroke="#F07C28" stroke-width="1.5"/>
    <circle cx="24" cy="12" r="4" fill="none" stroke="#F07C28" stroke-width="1.5"/>
    <rect x="4" y="19" width="8" height="1.5" fill="rgba(255,255,255,0.7)" rx="0.75"/>
    <rect x="12" y="19" width="8" height="1.5" fill="rgba(255,255,255,0.7)" rx="0.75"/>
    <rect x="20" y="19" width="8" height="1.5" fill="rgba(255,255,255,0.7)" rx="0.75"/>
    <rect x="5" y="22" width="6" height="1" fill="rgba(255,255,255,0.4)" rx="0.5"/>
    <rect x="13" y="22" width="6" height="1" fill="rgba(255,255,255,0.4)" rx="0.5"/>
    <rect x="21" y="22" width="6" height="1" fill="rgba(255,255,255,0.4)" rx="0.5"/>
</svg>`;

const ICON_LINK_ITEM = `
<a href="#" class="il-item flex flex-col items-center text-center gap-4 no-underline">
    <div class="w-14 h-14 flex items-center justify-center">
        <img src="${assetUrl("images/placeholder.svg")}" alt="" class="w-full h-full object-contain">
    </div>
    <span class="il-item__label text-sm font-semibold leading-snug" style="color:#003B71;">Nombre del servicio</span>
</a>`;

const ICON_LINKS_STYLES = `
<style>
.il-section{position:relative;overflow:hidden;}
.il-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:flex-end;pointer-events:none;user-select:none;}
.il-bg img{height:100%;width:auto;object-fit:contain;opacity:0.06;}
.il-grid{grid-template-columns:repeat(4,1fr);}
.il-item:hover .il-item__label{color:#F07C28;transition:color .2s ease;}
@media(max-width:992px){.il-grid{grid-template-columns:repeat(2,1fr);}}
</style>`;

export const iconLinksBlocks = [
    {
        id: "icon-links-strip",
        label: "Tira de iconos con enlace",
        category: "Productos y Servicios",
        media: iconLinksIcon,
        content: `
<section class="il-section w-full px-16 py-14 bg-white">
    <div class="il-bg">
        <img src="${assetUrl("images/brand-logo.png")}" alt="">
    </div>
    <div class="il-grid relative z-10 grid gap-8">
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
        label: "Ítem icono con enlace",
        category: "Productos y Servicios",
        media: iconLinksIcon,
        content: `${ICON_LINK_ITEM}${ICON_LINKS_STYLES}`,
    },
];