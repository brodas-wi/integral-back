import { assetUrl } from "@/utils/url.js";

const promoCtaIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="6" width="14" height="2" fill="rgba(255,255,255,0.5)" rx="1"/>
    <rect x="2" y="10" width="14" height="1.5" fill="rgba(255,255,255,0.3)" rx="1"/>
    <rect x="2" y="13" width="14" height="1.5" fill="rgba(255,255,255,0.3)" rx="1"/>
    <rect x="2" y="16" width="14" height="1.5" fill="rgba(255,255,255,0.3)" rx="1"/>
    <rect x="2" y="19" width="10" height="1.5" fill="rgba(255,255,255,0.3)" rx="1"/>
    <rect x="18" y="6" width="12" height="2" fill="#F07C28" rx="1"/>
    <rect x="18" y="10" width="12" height="4" fill="rgba(255,255,255,0.8)" rx="1"/>
    <rect x="18" y="16" width="12" height="6" fill="#F07C28" rx="1"/>
    <rect x="18" y="24" width="12" height="4" fill="#F07C28" rx="1"/>
</svg>`;

const PROMO_CTA_STYLES = `
<style>
.pc-section{width:100%;padding:4rem;background:#ffffff;box-sizing:border-box;}
.pc-inner{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.pc-description{font-size:1rem;color:#003B71;line-height:1.75;}
.pc-right{display:flex;flex-direction:column;align-items:center;text-align:center;gap:1rem;}
.pc-eyebrow{font-size:0.95rem;font-weight:700;color:#F07C28;text-transform:uppercase;letter-spacing:0.05em;}
.pc-title{font-size:2.25rem;font-weight:700;color:#003B71;line-height:1.2;}
.pc-price{font-size:5rem;font-weight:800;color:#F07C28;line-height:1;margin:0.25rem 0;}
.pc-btn{display:inline-block;padding:1rem 2.5rem;background:#F07C28;color:#ffffff;font-size:0.95rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;text-decoration:none;border-radius:0.5rem;transition:background .2s ease;}
.pc-btn:hover{background:#d96a1a;}
@media(max-width:1280px){.pc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.pc-section{padding:2.5rem 1.5rem;}.pc-inner{grid-template-columns:1fr;gap:2.5rem;}.pc-right{align-items:flex-start;text-align:left;}.pc-price{font-size:4rem;}}
@media(max-width:480px){.pc-price{font-size:3rem;}.pc-title{font-size:1.75rem;}}
</style>`;

export const promoCtaBlocks = [
    {
        id: "promo-cta",
        label: "Promo con CTA y precio",
        category: "Llamadas a la acción",
        media: promoCtaIcon,
        content: `
<section class="pc-section">
    <div class="pc-inner">
        <p class="pc-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt nisi eu pellentesque fringilla. Proin tincidunt, dolor vitae pellentesque scelerisque, sapien augue lobortis orci, quis blandit magna enim a magna. Duis feugiat eros magna, at fermentum velit interdum non. Vestibulum rhoncus sagittis lorem, eu placerat sem pellentesque et. Phasellus ac mauris pulvinar, fringilla neque quis, mollis sapien.</p>
        <div class="pc-right">
            <span class="pc-eyebrow">¡Invierte con propósito!</span>
            <h2 class="pc-title">Invierte desde</h2>
            <span class="pc-price">$150.00</span>
            <a href="#" class="pc-btn">Adquiere tu cuenta</a>
        </div>
    </div>
</section>
${PROMO_CTA_STYLES}`,
    },
];
