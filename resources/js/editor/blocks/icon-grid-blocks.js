const iconGridIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="2" width="13" height="13" fill="rgba(255,255,255,0.15)" rx="2"/>
    <rect x="17" y="2" width="13" height="13" fill="rgba(255,255,255,0.15)" rx="2"/>
    <rect x="2" y="17" width="13" height="13" fill="rgba(255,255,255,0.15)" rx="2"/>
    <rect x="17" y="17" width="13" height="13" fill="rgba(255,255,255,0.15)" rx="2"/>
    <rect x="4" y="4" width="4" height="4" fill="white" rx="1"/>
    <rect x="19" y="4" width="4" height="4" fill="white" rx="1"/>
    <rect x="4" y="19" width="4" height="4" fill="white" rx="1"/>
    <rect x="19" y="19" width="4" height="4" fill="white" rx="1"/>
    <rect x="4" y="10" width="9" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="19" y="10" width="9" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="4" y="25" width="9" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="19" y="25" width="9" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
</svg>`;

const iconCardIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="0.8" rx="2"/>
    <rect x="7" y="7" width="6" height="6" fill="white" rx="1.2"/>
    <rect x="7" y="15" width="14" height="1.2" fill="rgba(255,255,255,0.7)" rx="0.5"/>
    <rect x="7" y="17.5" width="10" height="1.2" fill="rgba(255,255,255,0.5)" rx="0.5"/>
    <rect x="7" y="22" width="18" height="3" fill="white" rx="1"/>
</svg>`;

const ICON_CARD = `
<div class="flex flex-col gap-3 border-2 border-white rounded-2xl p-6">
    <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
        <i class="ri-safe-line text-2xl text-[#003B71]"></i>
    </div>
    <h3 class="text-base font-bold text-white">Título del producto</h3>
    <p class="text-base text-white leading-relaxed">Descripción breve del producto o servicio financiero disponible para ti.</p>
    <a href="#" class="ig-card-btn mt-auto w-full text-center py-2 px-4 rounded-lg bg-white text-[#003B71] text-base font-semibold">Más información</a>
</div>`;

const ICON_GRID_STYLES = `
<style>
.ig-watermark{position:absolute;bottom:-32px;right:-32px;width:320px;height:320px;opacity:0.07;pointer-events:none;user-select:none;}
.ig-watermark img{width:100%;height:100%;object-fit:contain;}
.ig-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.ig-card-btn{transition:background .2s,color .2s;}
.ig-card-btn:hover{background:#dce8f5!important;color:#003B71!important;}
@media(max-width:900px){.ig-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.ig-grid{grid-template-columns:1fr;}}
</style>`;

export const iconGridBlocks = [
    {
        id: "icon-grid-hero",
        label: "Sección de características",
        category: "Productos y Servicios",
        media: iconGridIcon,
        content: `
<section class="relative overflow-hidden w-full bg-[#003B71] py-12 px-6">
    <div class="ig-watermark">
        <img src="/images/brand-watermark.png" alt="">
    </div>
    <div class="relative z-10 max-w-6xl mx-auto flex flex-col gap-12">
        <div class="flex flex-col items-center text-center gap-3">
            <h2 class="text-4xl font-bold text-white">Depósitos y Cuentas de Ahorro</h2>
            <p class="text-base text-white">Productos diseñados para hacer crecer tu dinero de forma segura.</p>
        </div>
        <div class="ig-grid">
            ${ICON_CARD}
            ${ICON_CARD}
            ${ICON_CARD}
            ${ICON_CARD}
            ${ICON_CARD}
            ${ICON_CARD}
        </div>
    </div>
</section>
${ICON_GRID_STYLES}`,
    },
    {
        id: "icon-card",
        label: "Tarjeta con icono",
        category: "Productos y Servicios",
        media: iconCardIcon,
        content: `${ICON_CARD}`,
    },
];
