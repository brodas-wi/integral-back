const FINANCING_GRID_STYLES = `
<style>
.fc-cards-grid{display:flex;flex-wrap:wrap;gap:1.5rem;}
.fc-card{flex:1 1 220px;min-width:220px;}
</style>`;

const iconFinancingCard = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#E97300" fill-opacity="0.8"/>
    <path d="M13 12a3 3 0 1 1 4 2.8V16h-2v-1.2a3 3 0 0 1-2-2.8z" fill="#ffffff"/>
    <rect x="14.5" y="17" width="3" height="1" fill="#ffffff"/>
    <rect x="6" y="22" width="20" height="4" rx="1" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="8" y="23.5" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
</svg>`;

const iconFinancingSection = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="6" cy="6" r="1.5" fill="#E97300"/>
    <rect x="9" y="5" width="18" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="3" y="10" width="22" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="3" y="16" width="8" height="10" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="12" y="16" width="8" height="10" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="21" y="16" width="8" height="10" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <circle cx="7" cy="20" r="2" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="16" cy="20" r="2" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="25" cy="20" r="2" fill="#E97300" fill-opacity="0.7"/>
</svg>`;

const financingCard = (icon, text) => `
<div class="fc-card flex flex-col items-center gap-4 bg-white rounded-xl shadow-lg p-6">
    <div class="w-16 h-16 rounded-full bg-[#E97300] flex items-center justify-center shrink-0 overflow-hidden">
        <img src="/images/blocks/financiamiento/${icon}" alt="icono" class="w-10 h-10 object-contain" />
    </div>
    <p class="text-base text-[#003B71] text-center leading-relaxed m-0">${text}</p>
</div>`;

export const financingBlocks = [
    {
        id: "financing-section",
        label: "Sección de financiamiento",
        category: "Productos y Servicios",
        media: iconFinancingSection,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#E97300] shrink-0"></span>
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Subtitulo</span>
        </div>
        <p class="text-lg text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div class="fc-cards-grid">
            ${financingCard("bombillo.png", "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${financingCard("electricidad.png", "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${financingCard("engranajes.png", "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${financingCard("intercambio.png", "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
        </div>
    </div>
</section>
${FINANCING_GRID_STYLES}`,
    },
    {
        id: "financing-card",
        label: "Tarjeta de financiamiento",
        category: "Productos y Servicios",
        media: iconFinancingCard,
        content: `
<div class="fc-cards-grid">
    ${FINANCING_CARD}
</div>
${FINANCING_GRID_STYLES}`,
    },
];
