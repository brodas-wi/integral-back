const iconProductCards = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="2.5" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="2.5" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2.5" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2.5" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="9.5" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="11" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="11" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="11" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="11" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="18" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="19.5" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="19.5" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="19.5" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="19.5" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="26.5" y="6" width="4.5" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="27.5" y="8" width="2.5" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="27.5" y="20" width="2.5" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`;

const iconProductCard = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="2"/>
    <rect x="6" y="6" width="7" height="7" fill="#003B71" fill-opacity="0.12" rx="1.5"/>
    <rect x="6" y="16" width="14" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.6"/>
    <rect x="6" y="19" width="11" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="6" y="22" width="20" height="4" rx="1.5" fill="#003B71" fill-opacity="0.5"/>
</svg>`;

const PRODUCT_CARD = `
<div class="flex flex-col gap-4 bg-white border border-gray-200 rounded-2xl p-5">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#dce8f5]">
        <i class="ri-bank-card-line text-2xl text-[#003B71]"></i>
    </div>
    <div class="flex flex-col gap-2 flex-1">
        <h3 class="text-base font-bold text-[#003B71]">Título del producto</h3>
        <p class="text-base text-[#003B71] leading-relaxed">Descripción breve del producto financiero disponible para ti.</p>
    </div>
    <a href="#" class="pc-btn w-full py-2 px-4 rounded-lg bg-[#003B71] text-white text-base font-semibold text-center">Solicitar</a>
</div>`;

const PRODUCT_CARDS_STYLES = `
<style>
.pc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;}
.pc-btn{display:block;transition:background .2s,color .2s;}
.pc-btn:hover{background:#002a52!important;}
@media(max-width:900px){.pc-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.pc-grid{grid-template-columns:1fr;}}
</style>`;

export const productCardsBlocks = [
    {
        id: "product-cards-section",
        label: "Sección de productos",
        category: "Productos y Servicios",
        media: iconProductCards,
        content: `
<section class="w-full bg-white py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-[#003B71] mb-3">Créditos</h2>
            <p class="text-base text-[#003B71]">Opciones de financiamiento diseñadas para hacer realidad tus proyectos.</p>
        </div>
        <div class="pc-grid">
            ${PRODUCT_CARD}
            ${PRODUCT_CARD}
            ${PRODUCT_CARD}
            ${PRODUCT_CARD}
        </div>
    </div>
</section>
${PRODUCT_CARDS_STYLES}`,
    },
    {
        id: "product-card",
        label: "Tarjeta de producto",
        category: "Productos y Servicios",
        media: iconProductCard,
        content: `${PRODUCT_CARD}${PRODUCT_CARDS_STYLES}`,
    },
];
