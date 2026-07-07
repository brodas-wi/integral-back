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
.ic-title{color:#003B71;}
.ic-text{color:#003B71;}
</style>`;

const buildCard = (title, text) => `
<div class="ic-card flex items-center gap-4 sm:gap-5 md:gap-7 bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8">
    <img src="${assetUrl("images/placeholder.svg")}" alt="Icono" class="ic-icon w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 object-contain">
    <div class="flex flex-col gap-1.5 md:gap-2">
        <h3 class="ic-title text-2xl font-bold leading-snug">${title}</h3>
        <p class="ic-text text-base leading-relaxed">${text}</p>
    </div>
</div>`;

const buildIconCards = () => `
<section class="ic-section w-full bg-white flex flex-col gap-4 md:gap-6 p-6 sm:p-8 md:p-12 lg:px-16">
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
