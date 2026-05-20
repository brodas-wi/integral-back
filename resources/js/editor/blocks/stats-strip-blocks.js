const iconStatsOrangeLeft = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="0" y="6" width="10" height="22" fill="white"/>
    <path d="M10 6 Q10 6 16 6 L16 28 Q10 28 10 22 Z" fill="#E97300"/>
    <circle cx="22" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="22" cy="14" r="1.5" fill="white"/>
    <rect x="18" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`;

const iconStatsOrangeRight = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="22" y="6" width="10" height="22" fill="white"/>
    <path d="M22 6 Q16 6 16 6 L16 28 Q22 28 22 22 Z" fill="#E97300"/>
    <circle cx="10" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="10" cy="14" r="1.5" fill="white"/>
    <rect x="6" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="7" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`;

const STAT_ITEM = `
<div class="flex flex-col items-center gap-3 text-center">
    <div class="w-14 h-14 rounded-full flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-1">
        <p class="text-lg font-bold text-white">Lorem ipsum</p>
        <p class="text-base text-white">Lorem ipsum dolor sit amet</p>
    </div>
</div>`;

const STATS_STYLES = `
<style>
.ss-section{position:relative;width:100%;background:#ffffff;}
.ss-curve-left{background:#E97300;border-radius:200px 0 0 0;}
.ss-curve-right{background:#E97300;border-radius:0 200px 0 0;}
.ss-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
@media(max-width:900px){
    .ss-curve-left{border-radius:110px 0 0 0;}
    .ss-curve-right{border-radius:0 110px 0 0;}
    .ss-grid{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:480px){.ss-grid{grid-template-columns:1fr;}}
</style>`;

const buildStatsSection = (curveLeft) => `
<div class="ss-section">
    <div class="ss-curve-${curveLeft ? "left" : "right"}">
        <div class="max-w-6xl mx-auto px-8 py-16">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-white mb-3 leading-tight">Lorem ipsum dolor sit amet</h2>
                <p class="text-base text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div class="ss-grid">
                ${STAT_ITEM}
                ${STAT_ITEM}
                ${STAT_ITEM}
                ${STAT_ITEM}
            </div>
        </div>
    </div>
</div>
${STATS_STYLES}`;

export const statsStripBlocks = [
    {
        id: "stats-strip-left",
        label: "Franja estadísticas - izquierda",
        category: "Heroes",
        media: iconStatsOrangeLeft,
        content: buildStatsSection(true),
    },
    {
        id: "stats-strip-right",
        label: "Franja estadísticas - derecha",
        category: "Heroes",
        media: iconStatsOrangeRight,
        content: buildStatsSection(false),
    },
];
