import { assetUrl } from "@/utils/url.js";

const featureIcon = (imageRight) => {
    const imageX = imageRight ? 18 : 2;
    const textX = imageRight ? 2 : 16;
    const body = imageRight
        ? "M0 32V10Q0 2 8 2H32V32Z"
        : "M0 2H24Q32 2 32 10V32H0Z";

    return `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <path d="${body}" fill="#E97300"/>
    <rect x="${imageX}" y="10" width="12" height="18" fill="#003B71" fill-opacity="0.55" rx="1"/>
    <circle cx="${imageX + 6}" cy="17" r="3" fill="#003B71" fill-opacity="0.8"/>
    <path d="M${imageX} 26L${imageX + 4} 21L${imageX + 7} 24L${imageX + 9} 22L${imageX + 12} 26Z" fill="#003B71" fill-opacity="0.65"/>
    <rect x="${textX}" y="10" width="14" height="3" rx="1" fill="#fff" fill-opacity="0.9"/>
    <rect x="${textX}" y="15" width="14" height="1.2" rx="0.6" fill="#fff" fill-opacity="0.5"/>
    <rect x="${textX}" y="17.5" width="10" height="1.2" rx="0.6" fill="#fff" fill-opacity="0.5"/>
    <circle cx="${textX + 1.5}" cy="22" r="1.2" fill="#fff" fill-opacity="0.9"/>
    <rect x="${textX + 4}" y="21.3" width="8" height="1" rx="0.5" fill="#fff" fill-opacity="0.7"/>
    <circle cx="${textX + 1.5}" cy="25" r="1.2" fill="#fff" fill-opacity="0.9"/>
    <rect x="${textX + 4}" y="24.3" width="6" height="1" rx="0.5" fill="#fff" fill-opacity="0.7"/>
</svg>`;
};

const LIST_ITEM_COUNT = 4;

const LIST_ITEM = `
<div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white">
        <i class="ri-shield-check-line text-lg text-[#E97300]"></i>
    </div>
    <p class="text-white text-base font-bold leading-snug m-0">Lorem ipsum dolor sit amet consectetur</p>
</div>`;

const CONTENT_COL = `
<div class="fb-col-content flex flex-col gap-4">
    <h2 class="fb-title text-4xl font-bold leading-tight flex flex-wrap items-center gap-2 m-0">
        <span class="bg-[#003B71] text-white text-3xl font-bold px-3 py-1 rounded-lg leading-tight">Mi</span>
        <span class="text-[#003B71]">Banca</span>
        <span class="text-white font-bold">Integral</span>
    </h2>
    <p class="fb-text text-white text-base leading-relaxed m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="fb-list-wrap flex flex-col gap-3">${LIST_ITEM.repeat(LIST_ITEM_COUNT)}</div>
</div>`;

const IMAGE_COL = `
<div class="fb-col-image">
    <div class="fb-img-wrap">
        <img src="${assetUrl("images/placeholder.svg")}" alt="Imagen" class="fb-img">
    </div>
</div>`;

const FEATURE_STYLES = `
<style>
.fb-section{width:100%;background-color:#E97300;box-sizing:border-box;}
.fb-round-right{border-top-left-radius:clamp(60px,12.5vw,200px);}
.fb-round-left{border-top-right-radius:clamp(60px,12.5vw,200px);}
.fb-container{width:100%;max-width:1600px;margin:0 auto;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;}
.fb-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:3rem;align-items:center;}
.fb-col-image,.fb-col-content{min-width:0;}
.fb-text{text-align:justify;}
.fb-img-wrap{width:100%;height:400px;border-radius:0.75rem;overflow:hidden;}
.fb-img{display:block;width:100%;height:100%;object-fit:cover;object-position:center center;}
@media(max-width:992px){
.fb-grid{grid-template-columns:minmax(0,1fr);gap:2rem;}
.fb-col-image{order:-1;}
.fb-img-wrap{max-width:600px;height:280px;margin:0 auto;}
.fb-col-content{align-items:center;text-align:center;}
.fb-title{justify-content:center;}
.fb-text{text-align:center;}
.fb-list-wrap{align-items:center;}
}
@media(max-width:640px){
.fb-grid{gap:1.5rem;}
.fb-img-wrap{height:220px;}
}
</style>`;

const buildFeature = (imageRight) => {
    const roundClass = imageRight ? "fb-round-right" : "fb-round-left";
    const cols = imageRight ? `${CONTENT_COL}${IMAGE_COL}` : `${IMAGE_COL}${CONTENT_COL}`;

    return `<section class="fb-section ${roundClass}">
    <div class="fb-container fb-grid">${cols}</div>
</section>
${FEATURE_STYLES}`;
};

const featureBlock = ({ id, label, imageRight }) => ({
    id,
    label,
    category: "Contenido",
    media: featureIcon(imageRight),
    content: buildFeature(imageRight),
});

export const featureBlocks = [
    featureBlock({
        id: "feature-orange-img-right",
        label: "Sección: naranja + img. derecha",
        imageRight: true,
    }),
    featureBlock({
        id: "feature-orange-img-left",
        label: "Sección: naranja + img. izquierda",
        imageRight: false,
    }),
];