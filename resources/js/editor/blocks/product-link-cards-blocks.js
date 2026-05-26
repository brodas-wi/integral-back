import { assetUrl } from "@/utils/url.js";

const productLinkCardsIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="2" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="2" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="2" y="12" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="17" y="12" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="2" y="22" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="22" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
</svg>`;

const PRODUCT_LINK_CARD_ORANGE = `
<a href="#" class="plc-card plc-card--orange">
    <span class="plc-card__title">NOMBRE DEL PRODUCTO</span>
    <div class="plc-card__watermark">
        <img src="${assetUrl("images/brand-watermark.png")}" alt="">
    </div>
</a>`;

const PRODUCT_LINK_CARD_BLUE = `
<a href="#" class="plc-card plc-card--blue">
    <span class="plc-card__title">NOMBRE DEL PRODUCTO</span>
    <div class="plc-card__watermark">
        <img src="${assetUrl("images/brand-watermark.png")}" alt="">
    </div>
</a>`;

const PRODUCT_LINK_CARDS_STYLES = `
<style>
.plc-section{width:100%;padding:3rem 4rem;background:#ffffff;}
.plc-header{display:flex;flex-direction:column;align-items:center;text-align:center;gap:0.75rem;margin-bottom:2.5rem;}
.plc-header__title{font-size:2.25rem;font-weight:700;color:#003B71;line-height:1.2;}
.plc-header__subtitle{font-size:1rem;color:#4b5563;}
.plc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;}
.plc-card{position:relative;display:flex;align-items:flex-end;padding:1.5rem;border-radius:1rem;overflow:hidden;min-height:140px;text-decoration:none;transition:transform .2s,box-shadow .2s;}
.plc-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.15);}
.plc-card--orange{background:#F07C28;}
.plc-card--blue{background:#003B71;}
.plc-card__title{position:relative;z-index:2;font-size:1rem;font-weight:800;color:#ffffff;text-transform:uppercase;line-height:1.3;max-width:70%;}
.plc-card__watermark{position:absolute;bottom:-12px;right:-12px;width:110px;height:110px;opacity:0.25;pointer-events:none;user-select:none;}
.plc-card__watermark img{width:100%;height:100%;object-fit:contain;}
@media(max-width:1280px){.plc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.plc-section{padding:2.5rem 1.5rem;}.plc-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.plc-grid{grid-template-columns:1fr;}.plc-header__title{font-size:1.75rem;}}
</style>`;

export const productLinkCardsBlocks = [
    {
        id: "product-link-cards",
        label: "Tarjetas de productos con enlace",
        category: "Productos y Servicios",
        media: productLinkCardsIcon,
        content: `
<section class="plc-section">
    <div class="plc-header">
        <h2 class="plc-header__title">Nuestros Productos</h2>
        <p class="plc-header__subtitle">Encuentra el producto financiero ideal para ti.</p>
    </div>
    <div class="plc-grid">
        ${PRODUCT_LINK_CARD_ORANGE}
        ${PRODUCT_LINK_CARD_BLUE}
        ${PRODUCT_LINK_CARD_ORANGE}
        ${PRODUCT_LINK_CARD_BLUE}
        ${PRODUCT_LINK_CARD_BLUE}
        ${PRODUCT_LINK_CARD_ORANGE}
        ${PRODUCT_LINK_CARD_BLUE}
        ${PRODUCT_LINK_CARD_ORANGE}
    </div>
</section>
${PRODUCT_LINK_CARDS_STYLES}`,
    },
    {
        id: "product-link-card-orange",
        label: "Tarjeta producto naranja",
        category: "Productos y Servicios",
        media: productLinkCardsIcon,
        content: `${PRODUCT_LINK_CARD_ORANGE}${PRODUCT_LINK_CARDS_STYLES}`,
    },
    {
        id: "product-link-card-blue",
        label: "Tarjeta producto azul",
        category: "Productos y Servicios",
        media: productLinkCardsIcon,
        content: `${PRODUCT_LINK_CARD_BLUE}${PRODUCT_LINK_CARDS_STYLES}`,
    },
];
