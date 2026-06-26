const iconProductDetail = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="14" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="4" y="5" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="9" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="11" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="13" width="9" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="16" width="3" height="1" rx="0.5" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="5" cy="20" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="7" y="19.3" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="5" cy="23" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="7" y="22.3" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="18" y="3" width="12" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="20" y="6" width="8" height="4" rx="1" fill="#E97300" fill-opacity="0.3"/>
    <rect x="20" y="13" width="8" height="4" rx="2" fill="#E97300" fill-opacity="0.8"/>
    <rect x="20" y="20" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.2"/>
    <rect x="20" y="22" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.2"/>
    <rect x="20" y="24" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.2"/>
</svg>`;

const BULLET_ITEM = `
<li class="flex items-start gap-2 text-base text-[#003B71]">
    <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#003B71] shrink-0"></span>
    <span>Lorem ipsum dolor sit amet consectetur adipiscing elit.</span>
</li>`;

const FOOTNOTE = `<p class="text-sm text-[#6b7280] leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`;

const PRODUCT_DETAIL_STYLES = `
<style>
.pd-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.pd-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;}
.pd-bullet-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.75rem;}
.pd-footnotes{display:flex;flex-direction:column;gap:0.75rem;margin-top:1rem;padding-top:1rem;border-top:1px solid #e5e7eb;}
@media(max-width:1280px){.pd-section{padding:3rem 2.5rem;}.pd-grid{gap:2.5rem;}}
@media(max-width:992px){.pd-section{padding:2.5rem 1.5rem;}.pd-grid{grid-template-columns:1fr;gap:2rem;}}
@media(max-width:580px){.pd-section{padding:2rem 1rem;}}
</style>`;

export const productDetailBlocks = [
    {
        id: "product-detail-section",
        label: "Detalle de producto",
        category: "Productos y Servicios",
        media: iconProductDetail,
        content: `
<section class="pd-section">
    <div class="pd-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Diseñado para empresarios que desean maximizar la rentabilidad de sus ahorros. Tasa de interés preferencial, con intereses capitalizados mensualmente.</p>
            <div class="flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
                <ul class="pd-bullet-list">
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                </ul>
            </div>
        </div>
        <div class="flex flex-col gap-5">
            <h2 class="text-4xl font-black text-[#E97300] uppercase leading-tight">Ahorro Rentable</h2>
            <a href="#" class="block w-full py-3 px-6 rounded-full bg-[#E97300] text-white text-base font-bold text-center uppercase tracking-wide hover:bg-[#c96200] transition-colors">Adquiere tu cuenta</a>
            <div class="pd-footnotes">
                ${FOOTNOTE}
                ${FOOTNOTE}
                ${FOOTNOTE}
            </div>
        </div>
    </div>
</section>
${PRODUCT_DETAIL_STYLES}`,
    },
    {
        id: "product-detail-bullet",
        label: "Ítem de ventaja",
        category: "Productos y Servicios",
        media: iconProductDetail,
        content: `<ul class="pd-bullet-list" style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.75rem;">${BULLET_ITEM}</ul>${PRODUCT_DETAIL_STYLES}`,
    },
    {
        id: "product-detail-footnote",
        label: "Nota al pie",
        category: "Productos y Servicios",
        media: iconProductDetail,
        content: `${FOOTNOTE}${PRODUCT_DETAIL_STYLES}`,
    },
];
