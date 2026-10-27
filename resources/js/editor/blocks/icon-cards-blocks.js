import { assetUrl } from "@/utils/url.js";

const CATEGORY = "Contenido";
const BLUE = "#003B71";
const ORANGE = "#E97300";

const DEFAULT_TITLE = "Título de la sección";
const DEFAULT_TEXT =
    "Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.";

const CARD_COUNT = 3;

const IK_CSS = `
.ik-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;scroll-margin-top:140px;}
.ik-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.ik-list{display:flex;flex-direction:column;gap:clamp(1rem,2vw,1.5rem);min-height:3rem;}
.ik-card{display:flex;align-items:center;gap:clamp(1rem,2.5vw,1.75rem);box-sizing:border-box;padding-top:clamp(1.25rem,3vw,2rem);padding-right:clamp(1.25rem,3vw,2rem);padding-bottom:clamp(1.25rem,3vw,2rem);padding-left:clamp(1.25rem,3vw,2rem);border-radius:1rem;background-color:#fff;box-shadow:0 6px 24px rgba(0,59,113,0.1);}
.ik-icon{display:block;flex-shrink:0;width:clamp(4rem,8vw,6rem);height:clamp(4rem,8vw,6rem);object-fit:contain;}
.ik-body{display:flex;flex-direction:column;gap:0.5rem;flex:1;min-width:0;}
.ik-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.25rem,2.2vw,1.5rem);line-height:1.3;}
.ik-text{margin:0;color:#003B71;font-weight:400;font-size:1rem;line-height:1.625;}
@media(max-width:992px){
.ik-section{scroll-margin-top:80px;}
}
`;

const STYLES = `<style>${IK_CSS}</style>`;

function icon() {
    const rows = Array.from({ length: CARD_COUNT }, (_, index) => {
        const y = 3 + index * 9.5;
        return `
    <rect x="2" y="${y}" width="28" height="8" rx="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
    <circle cx="7" cy="${y + 4}" r="2.6" fill="${ORANGE}"/>
    <rect x="12" y="${y + 2.2}" width="14" height="1.6" rx="0.8" fill="${BLUE}" fill-opacity="0.7"/>
    <rect x="12" y="${y + 5}" width="10" height="1.2" rx="0.6" fill="${BLUE}" fill-opacity="0.4"/>`;
    }).join("");

    return `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${rows}</svg>`;
}

const escapeAttr = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");

function buildCard() {
    return `<div class="ik-card" data-gjs-name="Tarjeta"><img class="ik-icon" src="${escapeAttr(assetUrl("images/placeholder.svg"))}" alt="Icono"><div class="ik-body" data-gjs-name="Contenido"><h3 class="ik-title">${DEFAULT_TITLE}</h3><p class="ik-text">${DEFAULT_TEXT}</p></div></div>`;
}

function buildSection() {
    const cards = Array.from({ length: CARD_COUNT }, buildCard).join("");
    return `<section class="ik-section" data-gjs-name="Tarjetas con ícono"><div class="ik-container" data-gjs-name="Contenedor"><div class="ik-list" data-gjs-name="Lista">${cards}</div></div></section>${STYLES}`;
}

export const iconCardsBlocks = [
    {
        id: "icon-cards-block",
        label: "Tarjetas con ícono",
        category: CATEGORY,
        media: icon(),
        content: buildSection(),
    },
];