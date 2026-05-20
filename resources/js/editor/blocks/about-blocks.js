import { assetUrl } from "@/utils/url.js";

const iconAbout = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="14" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1.5"/>
    <rect x="4" y="5" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="9" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="4" y="11" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="4" y="13" width="9" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="4" y="17" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="21" width="3" height="5" rx="1" fill="#E97300"/>
    <rect x="8" y="21" width="3" height="5" rx="1" fill="#E97300"/>
    <rect x="12" y="21" width="3" height="5" rx="1" fill="#E97300"/>
    <rect x="18" y="3" width="12" height="26" fill="#E97300" fill-opacity="0.15" rx="2"/>
    <rect x="20" y="5" width="8" height="22" fill="#E97300" fill-opacity="0.3" rx="1.5"/>
</svg>`;

const iconMvvCard = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#E97300" rx="2"/>
    <rect x="8" y="9" width="16" height="2" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="8" y="14" width="14" height="1.2" rx="0.6" fill="white" fill-opacity="0.6"/>
    <rect x="8" y="17" width="12" height="1.2" rx="0.6" fill="white" fill-opacity="0.6"/>
</svg>`;

const MVV_CARD = `
<div class="flex flex-col gap-3 rounded-2xl p-5 text-center bg-[#E97300]">
    <h3 class="text-base font-bold text-white">Lorem ipsum</h3>
    <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</div>`;

const ABOUT_STYLES = `
<style>
.ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.ab-mvv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1.5rem;}
.ab-image{width:100%;border-radius:1.5rem;overflow:hidden;}
.ab-image img{width:100%;height:100%;object-fit:cover;display:block;}
@media(max-width:768px){
    .ab-grid{grid-template-columns:1fr;gap:2rem;}
    .ab-content-col{order:1;}
    .ab-image-col{order:2;}
    .ab-mvv-grid{grid-template-columns:1fr;}
}
</style>`;

export const aboutBlocks = [
    {
        id: "about-section",
        label: "Sección Nosotros",
        category: "Contenido",
        media: iconAbout,
        content: `
<section class="w-full bg-white py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="ab-grid">
            <div class="ab-content-col flex flex-col gap-4">
                <h2 class="text-4xl font-bold text-[#003B71]">Lorem ipsum dolor sit amet</h2>
                <p class="text-base text-[#003B71] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <h2 class="text-2xl font-bold text-[#003B71] mt-4">Lorem ipsum dolor</h2>
                <div class="ab-mvv-grid">
                    <div class="flex flex-col gap-3 rounded-2xl p-5 text-center bg-[#E97300]">
                        <h3 class="text-base font-bold text-white">Lorem ipsum</h3>
                        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                    <div class="flex flex-col gap-3 rounded-2xl p-5 text-center bg-[#E97300]">
                        <h3 class="text-base font-bold text-white">Lorem ipsum</h3>
                        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                    <div class="flex flex-col gap-3 rounded-2xl p-5 text-center bg-[#E97300]">
                        <h3 class="text-base font-bold text-white">Lorem ipsum</h3>
                        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                </div>
            </div>
            <div class="ab-image-col">
                <div class="ab-image">
                    <img src="${assetUrl("images/placeholder.svg")}" alt="Imagen de sección">
                </div>
            </div>
        </div>
    </div>
</section>
${ABOUT_STYLES}`,
    },
    {
        id: "about-mvv-card",
        label: "Tarjeta Misión/Visión/Valores",
        category: "Contenido",
        media: iconMvvCard,
        content: `${MVV_CARD}${ABOUT_STYLES}`,
    },
];
