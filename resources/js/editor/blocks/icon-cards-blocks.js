import { assetUrl } from "@/utils/url.js";

const iconIconCards = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="28" height="8" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="7" cy="7" r="2.6" fill="#E97300"/>
    <rect x="12" y="5.2" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
    <rect x="12" y="8" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.35"/>
    <rect x="2" y="12" width="28" height="8" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="7" cy="16" r="2.6" fill="#E97300"/>
    <rect x="12" y="14.2" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
    <rect x="12" y="17" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.35"/>
    <rect x="2" y="21" width="28" height="8" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="7" cy="25" r="2.6" fill="#E97300"/>
    <rect x="12" y="23.2" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
    <rect x="12" y="26" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.35"/>
</svg>`;

const ICON_CARDS_STYLES = `
<style>
.ic-section{width:100%;display:flex;flex-direction:column;gap:1.5rem;padding:3rem 4rem;background:#ffffff;}
.ic-card{display:flex;align-items:center;gap:1.75rem;background:#ffffff;border-radius:1rem;box-shadow:0 4px 20px rgba(15,23,42,0.08);padding:2rem;}
.ic-badge{width:90px;height:90px;min-width:90px;min-height:90px;border-radius:50%;background:#E97300;display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;}
.ic-badge-icon{width:50%;height:50%;object-fit:contain;display:block;}
.ic-content{display:flex;flex-direction:column;gap:0.5rem;}
.ic-title{font-size:1.5rem;font-weight:600;color:#003B71;margin:0;line-height:1.3;}
.ic-text{font-size:1rem;color:#003B71;line-height:1.6;margin:0;}
@media(max-width:768px){
.ic-section{padding:2.5rem 1.5rem;}
.ic-card{gap:1.25rem;padding:1.5rem;}
.ic-badge{width:70px;height:70px;min-width:70px;min-height:70px;}
.ic-title{font-size:1.25rem;}
}
@media(max-width:480px){
.ic-card{flex-direction:column;align-items:flex-start;}
.ic-badge{width:64px;height:64px;min-width:64px;min-height:64px;}
}
</style>`;

const buildCard = (title, text) => `
<div class="ic-card">
    <div class="ic-badge">
        <img src="${assetUrl("images/placeholder.svg")}" alt="Icono" class="ic-badge-icon">
    </div>
    <div class="ic-content">
        <h3 class="ic-title">${title}</h3>
        <p class="ic-text">${text}</p>
    </div>
</div>`;

const buildIconCards = () => `
<section class="ic-section">
    ${buildCard(
        "Título de la sección",
        "Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.",
    )}
    ${buildCard(
        "Título de la sección",
        "Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.",
    )}
    ${buildCard(
        "Título de la sección",
        "Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.",
    )}
</section>
${ICON_CARDS_STYLES}`;

export const iconCardsBlocks = [
    {
        id: "icon-cards-block",
        label: "Tarjetas con ícono",
        category: "Contenido",
        media: iconIconCards,
        content: buildIconCards(),
    },
];
