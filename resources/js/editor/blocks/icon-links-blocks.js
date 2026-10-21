import { assetUrl } from "@/utils/url.js";

const PLACEHOLDER_IMAGE = assetUrl("images/placeholder.svg");

const DEFAULT_LABELS = [
    "Créditos",
    "Cuenta de ahorro",
    "Servicios y seguro",
    "Transacciones y remesas",
];

const STYLES = `<style>
.il-section{width:100%;background-color:#fff;box-sizing:border-box;padding-top:clamp(1.5rem,3vw,2.5rem);padding-bottom:clamp(1.5rem,3vw,2.5rem);padding-left:max(clamp(1.5rem,4vw,3.5rem),calc((100% - 1600px) / 2 + clamp(1.5rem,4vw,3.5rem)));padding-right:max(clamp(1.5rem,4vw,3.5rem),calc((100% - 1600px) / 2 + clamp(1.5rem,4vw,3.5rem)));}
.il-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1.5rem;}
.il-item{display:flex;flex-direction:column;align-items:center;gap:1rem;padding:0.5rem 0.25rem;text-align:center;text-decoration:none;-webkit-tap-highlight-color:transparent;}
.il-icon{display:block;width:4rem;height:4rem;object-fit:contain;transition:filter 0.3s ease;}
.il-label{padding-bottom:0.3rem;font-size:1rem;font-weight:700;line-height:1.35;color:#003B71;background-image:linear-gradient(#E97300,#E97300);background-repeat:no-repeat;background-position:center bottom;background-size:0% 2px;transition:color 0.25s ease,background-size 0.3s ease;}
@media(hover:hover){
.il-item:hover .il-label{color:#E97300;background-size:100% 2px;}
.il-item:hover .il-icon{filter:drop-shadow(0 4px 8px rgba(233,115,0,0.35));}
}
.il-item:focus-visible{outline:none;}
.il-item:focus-visible .il-label{color:#E97300;background-size:100% 2px;}
.il-item:focus-visible .il-icon{filter:drop-shadow(0 4px 8px rgba(233,115,0,0.35));}
@media(max-width:992px){
.il-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;}
.il-icon{width:3.5rem;height:3.5rem;}
}
@media(prefers-reduced-motion:reduce){
.il-icon,.il-label{transition:none;}
}
</style>`;

const ICONS = {
    strip: `<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,
    item: `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12.5" r="9" fill="#E97300"/>
    <rect x="12" y="10" width="8" height="5.5" rx="1.5" fill="white" fill-opacity="0.9"/>
    <rect x="7" y="24" width="18" height="2.4" rx="1.2" fill="#003B71" fill-opacity="0.75"/>
</svg>`,
};

const iconLinkItem = (label = "Nombre del servicio") => `
<a href="#" class="il-item">
    <img src="${PLACEHOLDER_IMAGE}" alt="" width="64" height="64" class="il-icon">
    <span class="il-label">${label}</span>
</a>`;

const iconLinksStrip = (labels) => `
<section class="il-section">
    <div class="il-grid">${labels.map(iconLinkItem).join("")}</div>
</section>
${STYLES}`;

const CATEGORY = "Interactivos";

export const iconLinksBlocks = [
    {
        id: "icon-links-strip",
        label: "Iconos con enlace",
        category: CATEGORY,
        media: ICONS.strip,
        content: iconLinksStrip(DEFAULT_LABELS),
    },
    {
        id: "icon-link-item",
        label: "Icono con enlace",
        category: CATEGORY,
        media: ICONS.item,
        content: `${iconLinkItem()}\n${STYLES}`,
    },
];