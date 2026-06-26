import { assetUrl } from "@/utils/url.js";

const iconFeatureOrangeRight = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#E97300" rx="2"/>
    <rect x="2" y="3" width="13" height="26" fill="rgba(255,255,255,0.12)" rx="1.5"/>
    <rect x="3" y="4" width="11" height="24" fill="rgba(255,255,255,0.1)" rx="1"/>
    <circle cx="9" cy="13" r="3" fill="rgba(255,255,255,0.25)"/>
    <path d="M3 23 L7 17 L10 20 L12 18 L14 23 Z" fill="rgba(255,255,255,0.2)"/>
    <rect x="17" y="3" width="13" height="26" fill="rgba(255,255,255,0.15)" rx="1.5"/>
    <rect x="19" y="7" width="9" height="2" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="19" y="11" width="9" height="1" rx="0.5" fill="white" fill-opacity="0.5"/>
    <rect x="19" y="13" width="7" height="1" rx="0.5" fill="white" fill-opacity="0.5"/>
    <circle cx="20" cy="18" r="1" fill="white" fill-opacity="0.8"/>
    <rect x="22" y="17.3" width="6" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <circle cx="20" cy="21" r="1" fill="white" fill-opacity="0.8"/>
    <rect x="22" y="20.3" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
</svg>`;

const iconFeatureOrangeLeft = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#E97300" rx="2"/>
    <rect x="17" y="3" width="13" height="26" fill="rgba(255,255,255,0.12)" rx="1.5"/>
    <rect x="18" y="4" width="11" height="24" fill="rgba(255,255,255,0.1)" rx="1"/>
    <circle cx="23" cy="13" r="3" fill="rgba(255,255,255,0.25)"/>
    <path d="M18 23 L22 17 L25 20 L27 18 L29 23 Z" fill="rgba(255,255,255,0.2)"/>
    <rect x="2" y="3" width="13" height="26" fill="rgba(255,255,255,0.15)" rx="1.5"/>
    <rect x="4" y="7" width="9" height="2" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="4" y="11" width="9" height="1" rx="0.5" fill="white" fill-opacity="0.5"/>
    <rect x="4" y="13" width="7" height="1" rx="0.5" fill="white" fill-opacity="0.5"/>
    <circle cx="5" cy="18" r="1" fill="white" fill-opacity="0.8"/>
    <rect x="7" y="17.3" width="6" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <circle cx="5" cy="21" r="1" fill="white" fill-opacity="0.8"/>
    <rect x="7" y="20.3" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
</svg>`;

const LIST_ITEM = `
<div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#E97300]">
        <i class="ri-shield-check-line text-lg text-white"></i>
    </div>
    <p class="text-white text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`;

const CONTENT_COL = `
<div class="flex flex-col gap-4">
    <h2 class="text-4xl font-bold text-white leading-tight">Lorem ipsum dolor sit amet</h2>
    <p class="text-white text-base leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-3">
        ${LIST_ITEM}
        ${LIST_ITEM}
        ${LIST_ITEM}
        ${LIST_ITEM}
    </div>
</div>`;

const IMAGE_COL = `
<div class="fb-img-wrap">
    <img src="${assetUrl("images/placeholder.svg")}" alt="Imagen" class="fb-img">
</div>`;

const FEATURE_STYLES = `
<style>
.fb-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.fb-box{background:#E97300;border-radius:1rem;padding:3rem;}
.fb-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.fb-img-wrap{width:100%;border-radius:0.75rem;overflow:hidden;}
.fb-img{width:100%;height:100%;object-fit:cover;display:block;min-height:320px;max-height:480px;}
@media(max-width:1280px){.fb-section{padding:3rem 2.5rem;}.fb-box{padding:2.5rem;}}
@media(max-width:992px){
    .fb-section{padding:2.5rem 1.5rem;}
    .fb-box{padding:2rem;}
    .fb-grid{grid-template-columns:1fr;gap:2rem;}
}
@media(max-width:580px){.fb-section{padding:2rem 1rem;}}
</style>`;

const buildFeature = (imgRight) => {
    const cols = imgRight
        ? `<div>${CONTENT_COL}</div><div>${IMAGE_COL}</div>`
        : `<div>${IMAGE_COL}</div><div>${CONTENT_COL}</div>`;
    return `
<section class="fb-section">
    <div class="fb-box">
        <div class="fb-grid">
            ${cols}
        </div>
    </div>
</section>
${FEATURE_STYLES}`;
};

export const featureBlocks = [
    {
        id: "feature-orange-img-right",
        label: "Sección naranja · imagen derecha",
        category: "Banners",
        media: iconFeatureOrangeRight,
        content: buildFeature(true),
    },
    {
        id: "feature-orange-img-left",
        label: "Sección naranja · imagen izquierda",
        category: "Banners",
        media: iconFeatureOrangeLeft,
        content: buildFeature(false),
    },
];
