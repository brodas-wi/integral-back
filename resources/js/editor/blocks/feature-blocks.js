import { assetUrl } from "@/utils/url.js";

const iconFeatureOrangeRight = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="8" width="32" height="24" fill="#E97300" rx="0"/>
    <rect x="0" y="8" width="32" height="24" fill="#E97300"/>
    <path d="M0 8 Q0 2 8 2 L32 2 L32 8 Z" fill="#E97300"/>
    <rect x="2" y="10" width="12" height="18" fill="#003B71" fill-opacity="0.55" rx="1"/>
    <circle cx="8" cy="17" r="3" fill="#003B71" fill-opacity="0.8"/>
    <path d="M2 26 L6 21 L9 24 L11 22 L14 26 Z" fill="#003B71" fill-opacity="0.65"/>
    <rect x="16" y="10" width="14" height="3" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="16" y="15" width="14" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <rect x="16" y="17.5" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <circle cx="17.5" cy="22" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="20" y="21.3" width="8" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
    <circle cx="17.5" cy="25" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="20" y="24.3" width="6" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
</svg>`;

const iconFeatureOrangeLeft = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="8" width="32" height="24" fill="#E97300"/>
    <path d="M0 8 L24 8 Q32 8 32 2 L32 2 L0 2 Z" fill="#E97300"/>
    <rect x="18" y="10" width="12" height="18" fill="#003B71" fill-opacity="0.55" rx="1"/>
    <circle cx="24" cy="17" r="3" fill="#003B71" fill-opacity="0.8"/>
    <path d="M18 26 L22 21 L25 24 L27 22 L30 26 Z" fill="#003B71" fill-opacity="0.65"/>
    <rect x="2" y="10" width="14" height="3" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="2" y="15" width="14" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <rect x="2" y="17.5" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <circle cx="3.5" cy="22" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="6" y="21.3" width="8" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
    <circle cx="3.5" cy="25" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="6" y="24.3" width="6" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
</svg>`;

const LIST_ITEM = `
<div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white">
        <i class="ri-shield-check-line text-lg text-[#E97300]"></i>
    </div>
    <p class="text-white text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`;

const CONTENT_COL = `
<div class="flex flex-col gap-4">
    <h2 class="text-4xl font-bold leading-tight flex flex-wrap items-center gap-2">
        <span class="bg-[#003B71] text-white text-3xl font-bold px-3 py-1 rounded-lg leading-tight">Mi</span>
        <span class="text-[#003B71]">Banca</span>
        <span class="text-white font-bold">Integral</span>
    </h2>
    <p class="text-white text-base leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-3">
        ${LIST_ITEM}
        ${LIST_ITEM}
        ${LIST_ITEM}
        ${LIST_ITEM}
    </div>
</div>`;

const IMAGE_COL = `
<div class="fb-col-image">
    <div class="fb-img-wrap">
        <img src="${assetUrl("images/placeholder.svg")}" alt="Imagen" class="fb-img">
    </div>
</div>`;

const FEATURE_STYLES = `
<style>
.fb-section-right{width:100%;background:#E97300;padding:3rem 4rem 3rem 4rem;border-radius:200px 0 0 0;}
.fb-section-left{width:100%;background:#E97300;padding:3rem 4rem 3rem 4rem;border-radius:0 200px 0 0;}
.fb-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.fb-img-wrap{width:100%;max-height:480px;border-radius:0.75rem;overflow:hidden;aspect-ratio:4/3;}
.fb-img{width:100%;height:100%;object-fit:cover;display:block;}
@media(max-width:992px){
    .fb-section-right{padding:2.5rem 1.5rem;border-radius:110px 0 0 0;}
    .fb-section-left{padding:2.5rem 1.5rem;border-radius:0 110px 0 0;}
    .fb-grid{grid-template-columns:1fr;gap:2rem;}
    .fb-col-image{order:-1;}
    .fb-img-wrap{max-width:600px;max-height:320px;aspect-ratio:16/9;margin:0 auto;}
}
@media(max-width:580px){
    .fb-section-right{padding:2rem 1rem;border-radius:60px 0 0 0;}
    .fb-section-left{padding:2rem 1rem;border-radius:0 60px 0 0;}
    .fb-img-wrap{max-height:220px;}
}
</style>`;

const buildFeature = (imgRight) => {
    const sectionClass = imgRight ? "fb-section-right" : "fb-section-left";
    const cols = imgRight
        ? `<div class="fb-col-content">${CONTENT_COL}</div>${IMAGE_COL}`
        : `${IMAGE_COL}<div class="fb-col-content">${CONTENT_COL}</div>`;
    return `
<section class="${sectionClass}">
    <div class="fb-grid">
        ${cols}
    </div>
</section>
${FEATURE_STYLES}`;
};

export const featureBlocks = [
    {
        id: "feature-orange-img-right",
        label: "Sección naranja - imagen derecha",
        category: "Banners",
        media: iconFeatureOrangeRight,
        content: buildFeature(true),
    },
    {
        id: "feature-orange-img-left",
        label: "Sección naranja - imagen izquierda",
        category: "Banners",
        media: iconFeatureOrangeLeft,
        content: buildFeature(false),
    },
];
