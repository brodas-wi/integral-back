import { assetUrl } from "@/utils/url.js";

const ASSISTANCE_ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="12" height="2" rx="1" fill="#E97300"/>
    ${[1, 9, 17, 25]
        .map(
            (x) => `<rect x="${x}" y="9" width="6" height="18" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="${x + 3}" cy="14" r="2" fill="#E97300"/>
    <rect x="${x + 0.5}" y="19" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="${x + 0.5}" y="21.2" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>`,
        )
        .join("\n    ")}
</svg>`;

const CARD_COUNT = 5;
const CARD_TITLE = "Título de la asistencia";
const CARD_TEXT = "Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.";

const assistanceCard = () => `
<div class="asc-card">
    <div class="asc-badge">
        <img src="${assetUrl("images/placeholder.svg")}" alt="Icono" class="asc-icon">
    </div>
    <h3 class="asc-title text-base font-bold leading-snug m-0">${CARD_TITLE}</h3>
    <p class="asc-text text-base leading-relaxed m-0">${CARD_TEXT}</p>
</div>`;

const ASSISTANCE_STYLES = `
<style>
.asc-section{width:100%;background-color:#fff;box-sizing:border-box;}
.asc-container{width:100%;max-width:1600px;margin:0 auto;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;display:flex;flex-direction:column;gap:1.5rem;}
.asc-heading{color:#E97300;}
.asc-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:1.5rem;}
.asc-card{display:flex;flex-direction:column;align-items:center;gap:0.75rem;min-width:0;box-sizing:border-box;background-color:#fff;border-radius:1rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem;text-align:center;overflow-wrap:anywhere;}
.asc-badge{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:4rem;height:4rem;border-radius:9999px;background-color:#E97300;}
.asc-icon{display:block;width:2rem;height:2rem;object-fit:contain;}
.asc-title,.asc-text{color:#003B71;}
@media(max-width:1200px){.asc-grid{grid-template-columns:repeat(3,minmax(0,1fr));}.asc-card:last-child:nth-child(3n+1){grid-column:2;}.asc-card:last-child:nth-child(3n+2){grid-column:auto;}}
@media(max-width:992px){.asc-grid{grid-template-columns:repeat(2,minmax(0,1fr));}.asc-card:last-child:nth-child(3n+1){grid-column:auto;}.asc-card:last-child:nth-child(odd){grid-column:1/-1;width:calc(50% - 0.75rem);justify-self:center;}}
@media(max-width:640px){.asc-grid{grid-template-columns:minmax(0,1fr);}.asc-card:last-child:nth-child(odd){width:auto;}}
</style>`;

const buildAssistanceCards = () => `<section class="asc-section">
    <div class="asc-container">
        <p class="asc-heading text-base font-bold m-0">Cuentas con asistencias de:</p>
        <div class="asc-grid">${assistanceCard().repeat(CARD_COUNT)}</div>
    </div>
</section>
${ASSISTANCE_STYLES}`;

export const assistanceCardsBlocks = [
    {
        id: "assistance-cards-block",
        label: "Sección: tarjetas de asistencias",
        category: "Productos y Servicios",
        media: ASSISTANCE_ICON,
        content: buildAssistanceCards(),
    },
];