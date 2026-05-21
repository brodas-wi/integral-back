import { assetUrl } from "@/utils/url.js";

const iconCta = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="white" rx="2" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="8" y="7" width="16" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="11" width="12" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="11" y="13.5" width="10" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="6" y="18" width="9" height="5" rx="1.5" fill="#E97300"/>
    <rect x="17" y="18" width="9" height="5" rx="1.5" fill="white" stroke="#e5e7eb" stroke-width="0.8"/>
</svg>`;

const CTA_STYLES = `
<style>
.cta-watermark-left{position:absolute;bottom:-16px;left:-16px;width:220px;height:220px;opacity:0.2;pointer-events:none;user-select:none;transform:scaleX(-1);}
.cta-watermark-right{position:absolute;bottom:-16px;right:-16px;width:220px;height:220px;opacity:0.2;pointer-events:none;user-select:none;}
.cta-watermark-left img,.cta-watermark-right img{width:100%;height:100%;object-fit:contain;}
.cta-btn-primary{display:inline-block;padding:0.625rem 2rem;border-radius:0.5rem;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background .2s;}
.cta-btn-primary:hover{background:#c96200;}
.cta-btn-secondary{display:inline-block;padding:0.625rem 2rem;border-radius:0.5rem;background:#ffffff;color:#E97300;font-size:1rem;font-weight:600;text-decoration:none;box-shadow:0 2px 12px rgba(0,0,0,0.12);transition:background .2s,color .2s;}
.cta-btn-secondary:hover{background:#E97300;color:#ffffff;}
@media(max-width:992px){
    .cta-watermark-left,.cta-watermark-right{width:140px;height:140px;}
}
@media(max-width:580px){
    .cta-watermark-left,.cta-watermark-right{width:90px;height:90px;}
    .cta-btn-primary,.cta-btn-secondary{width:100%;text-align:center;}
}
</style>`;

export const ctaBlocks = [
    {
        id: "cta-section",
        label: "Llamada a la acción",
        category: "Contenido",
        media: iconCta,
        content: `
<section class="relative overflow-hidden w-full bg-white py-16 px-16">
    <div class="cta-watermark-left">
        <img src="${assetUrl("images/brand-logo.png")}" alt="">
    </div>
    <div class="cta-watermark-right">
        <img src="${assetUrl("images/brand-logo.png")}" alt="">
    </div>
    <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
        <h2 class="text-4xl font-bold text-[#E97300] leading-tight">Lorem ipsum dolor sit amet consectetur</h2>
        <p class="text-base text-[#E97300]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Descubre cómo podemos ayudarte a alcanzar tus metas.</p>
        <div class="flex flex-wrap gap-4 justify-center">
            <a href="#" class="cta-btn-primary">Lorem ipsum</a>
            <a href="#" class="cta-btn-secondary">Lorem ipsum</a>
        </div>
    </div>
</section>
${CTA_STYLES}`,
    },
];
