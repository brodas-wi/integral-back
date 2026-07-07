import { assetUrl } from "@/utils/url.js";

const iconAssistanceCards = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="12" height="2" rx="1" fill="#E97300"/>
    <rect x="1" y="9" width="6" height="18" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="4" cy="14" r="2" fill="#E97300"/>
    <rect x="1.5" y="19" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="1.5" y="21.2" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="9" y="9" width="6" height="18" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="12" cy="14" r="2" fill="#E97300"/>
    <rect x="9.5" y="19" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="9.5" y="21.2" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="17" y="9" width="6" height="18" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="20" cy="14" r="2" fill="#E97300"/>
    <rect x="17.5" y="19" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="17.5" y="21.2" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="25" y="9" width="6" height="18" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="28" cy="14" r="2" fill="#E97300"/>
    <rect x="25.5" y="19" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="25.5" y="21.2" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`;

const ASSISTANCE_CARDS_STYLES = `
<style>
.asc-heading{color:#E97300;}
.asc-badge{background:#E97300;}
.asc-title{color:#003B71;}
.asc-text{color:#003B71;}
</style>`;

const buildAssistanceCard = (title, text) => `
<div class="asc-card flex flex-col items-center text-center gap-3 bg-white rounded-2xl shadow-md p-6">
    <div class="asc-badge w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
        <img src="${assetUrl("images/placeholder.svg")}" alt="Icono" class="asc-icon w-8 h-8 object-contain">
    </div>
    <h3 class="asc-title text-base font-bold leading-snug">${title}</h3>
    <p class="asc-text text-base leading-relaxed">${text}</p>
</div>`;

const buildAssistanceCards = () => `
<section class="asc-section w-full bg-white flex flex-col gap-6 p-6 sm:p-8 md:p-12 lg:px-16">
    <p class="asc-heading text-base font-bold">Cuentas con asistencias de:</p>
    <div class="asc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        ${buildAssistanceCard(
            "Título de la asistencia",
            "Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.",
        )}
        ${buildAssistanceCard(
            "Título de la asistencia",
            "Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.",
        )}
        ${buildAssistanceCard(
            "Título de la asistencia",
            "Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.",
        )}
        ${buildAssistanceCard(
            "Título de la asistencia",
            "Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.",
        )}
        ${buildAssistanceCard(
            "Título de la asistencia",
            "Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.",
        )}
    </div>
</section>
${ASSISTANCE_CARDS_STYLES}`;

export const assistanceCardsBlocks = [
    {
        id: "assistance-cards-block",
        label: "Tarjetas de asistencias",
        category: "Contenido",
        media: iconAssistanceCards,
        content: buildAssistanceCards(),
    },
];
