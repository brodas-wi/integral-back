const iconServiceCards = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="8" width="8" height="16" fill="white" rx="2"/>
    <rect x="12" y="8" width="8" height="16" fill="white" rx="2"/>
    <rect x="22" y="8" width="8" height="16" fill="white" rx="2"/>
    <rect x="3" y="10" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.5"/>
    <rect x="3" y="13" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="3" y="15" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="3" y="19" width="6" height="2.5" rx="1" fill="#003B71" fill-opacity="0.4"/>
    <rect x="13" y="10" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.5"/>
    <rect x="13" y="13" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="13" y="15" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="13" y="19" width="6" height="2.5" rx="1" fill="#003B71" fill-opacity="0.4"/>
    <rect x="23" y="10" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.5"/>
    <rect x="23" y="13" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="15" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="19" width="6" height="2.5" rx="1" fill="#003B71" fill-opacity="0.4"/>
</svg>`;

const iconServiceCard = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="white" rx="2"/>
    <rect x="8" y="9" width="16" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
    <rect x="8" y="13" width="14" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="8" y="15.5" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="8" y="20" width="16" height="4" rx="1.5" fill="#003B71" fill-opacity="0.5"/>
</svg>`;

const SERVICE_CARD = `
<div class="flex flex-col gap-4 bg-white rounded-2xl p-6 text-center">
    <h3 class="text-lg font-bold text-[#003B71]">Lorem ipsum dolor</h3>
    <p class="text-base text-[#003B71] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.</p>
    <a href="#" class="srv-btn block w-full py-2 px-4 rounded-lg bg-[#003B71] text-white text-base font-semibold text-center mt-auto transition-colors duration-200 hover:bg-[#002a52]">Lorem ipsum</a>
</div>`;

const SERVICE_CARDS_STYLES = `
<style>
.srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
@media(max-width:768px){.srv-grid{grid-template-columns:1fr;}}
</style>`;

export const serviceCardsBlocks = [
    {
        id: "service-cards-section",
        label: "Sección de servicios",
        category: "Productos y Servicios",
        media: iconServiceCards,
        content: `
<section class="w-full bg-[#003B71] py-12 px-16">
    <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-white mb-3">Lorem ipsum dolor sit amet</h2>
        <p class="text-base text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="srv-grid">
        ${SERVICE_CARD}
        ${SERVICE_CARD}
        ${SERVICE_CARD}
    </div>
</section>
${SERVICE_CARDS_STYLES}`,
    },
    {
        id: "service-card",
        label: "Tarjeta de servicio",
        category: "Productos y Servicios",
        media: iconServiceCard,
        content: `${SERVICE_CARD}${SERVICE_CARDS_STYLES}`,
    },
];
