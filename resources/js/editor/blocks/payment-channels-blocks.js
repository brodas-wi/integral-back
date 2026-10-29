import { assetUrl } from "@/utils/url.js";

const CATEGORY = "Contenido";

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

const cellIcon = (x, y, width) => `
<rect x="${x}" y="${y}" width="${width}" height="9" rx="1.5" fill="#fff" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.5"/>
<rect x="${x + 2}" y="${y + 6}" width="${width - 4}" height="1.6" rx="0.8" fill="#E97300"/>`;

const ICONS = {
    section: svg(`
<rect x="3" y="3" width="18" height="2.4" rx="1.2" fill="#E97300"/>
${cellIcon(3, 8, 8.5)}${cellIcon(12.75, 8, 8.5)}${cellIcon(22.5, 8, 6.5)}
${cellIcon(3, 19, 8.5)}${cellIcon(12.75, 19, 8.5)}${cellIcon(22.5, 19, 6.5)}`),
    card: svg(`
<rect x="3" y="7" width="26" height="18" rx="2.5" fill="#fff" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.5"/>
<circle cx="10" cy="16" r="3.4" fill="#E97300"/>
<rect x="16" y="11.5" width="10" height="1.8" rx="0.9" fill="#003B71" fill-opacity="0.6"/>
<rect x="16" y="16" width="10" height="3.6" rx="1.8" fill="#E97300"/>`),
};

const STYLES = `<style>
.pc-section{width:100%;box-sizing:border-box;background-color:#fff;font-family:'Poppins',sans-serif;}
.pc-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;display:flex;flex-direction:column;gap:clamp(1.25rem,2.5vw,2rem);padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.pc-heading{margin:0;color:#E97300;font-size:clamp(1rem,1.6vw,1.125rem);font-weight:700;line-height:1.4;}
.pc-grid{--pc-gap:clamp(1rem,2vw,1.5rem);display:grid;grid-template-columns:repeat(auto-fit,minmax(max(min(100%,300px),calc((100% - 3 * var(--pc-gap)) / 4)),1fr));gap:var(--pc-gap);}
.pc-card{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center;gap:1rem;min-width:0;box-sizing:border-box;background-color:#fff;border-radius:1rem;box-shadow:0 2px 12px 0 rgba(0,59,113,0.12);padding-top:clamp(1.25rem,2vw,1.5rem);padding-right:clamp(1.25rem,2vw,1.5rem);padding-bottom:clamp(1.25rem,2vw,1.5rem);padding-left:clamp(1.25rem,2vw,1.5rem);}
.pc-icon{display:block;flex-shrink:0;width:clamp(4rem,6vw,5rem);height:clamp(4rem,6vw,5rem);object-fit:contain;}
.pc-body{display:flex;flex-direction:column;align-items:flex-start;gap:0.75rem;flex:1;min-width:140px;}
.pc-title{margin:0;color:#003B71;font-size:clamp(0.875rem,1.2vw,1rem);font-weight:700;line-height:1.35;overflow-wrap:anywhere;}
.pc-btn{display:inline-flex;align-items:center;justify-content:center;width:100%;max-width:180px;box-sizing:border-box;border-radius:9999px;background-color:#E97300;color:#fff;font-size:0.875rem;font-weight:700;line-height:1.4;text-decoration:none;padding-top:0.375rem;padding-right:1.5rem;padding-bottom:0.375rem;padding-left:1.5rem;transition:background-color 0.2s ease;}
.pc-btn:hover{background-color:#C96200;}
.pc-btn:focus-visible{outline:2px solid #003B71;outline-offset:2px;}
@media(prefers-reduced-motion:reduce){
.pc-btn{transition:none;}
}
</style>`;

const CARD_TITLES = [
    "Mi Banca Empresarial",
    "Mi Banca Integral",
    "Corresponsales Financieros",
    "Akí pago",
    "Punto Express",
    "WhatsApp",
];

const buildCard = (title) =>
    `<div class="pc-card" data-gjs-draggable=".pc-grid"><img class="pc-icon" src="${assetUrl("images/placeholder.svg")}" alt="Icono"><div class="pc-body"><h3 class="pc-title">${title}</h3><a class="pc-btn" href="#">Ver más</a></div></div>`;

const buildSection = () =>
    `<section class="pc-section"><div class="pc-container"><p class="pc-heading">Puedes pagar tu crédito en los corresponsales financieros autorizados:</p><div class="pc-grid">${CARD_TITLES.map(buildCard).join("")}</div></div></section>${STYLES}`;

export const paymentChannelsBlocks = [
    {
        id: "payment-channels-block",
        label: "Canales de pago",
        category: CATEGORY,
        media: ICONS.section,
        content: buildSection(),
    },
    {
        id: "payment-channel-item-block",
        label: "Canal de pago (tarjeta)",
        category: CATEGORY,
        media: ICONS.card,
        content: `${buildCard("Nuevo canal de pago")}${STYLES}`,
    },
];