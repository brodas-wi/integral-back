import { assetUrl } from "@/utils/url.js";

const PRODUCT_DETAIL_GRID_STYLES = `
<style>
.pd-asymmetric-grid{display:grid;grid-template-columns:3fr 2fr;gap:2rem;align-items:start;}
@media(max-width:992px){.pd-asymmetric-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`;

const PRODUCT_DETAIL_THREE_COL_STYLES = `
<style>
.pd-three-col-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem;align-items:start;}
.pd-three-col-grid>div:last-child:nth-child(3n+1){grid-column:1/-1;max-width:33%;margin:0 auto;}
@media(max-width:992px){.pd-three-col-grid{gap:1.5rem;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:50%;}}
@media(max-width:640px){.pd-three-col-grid{grid-template-columns:1fr;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:none;}}
</style>`;

const PRODUCT_DETAIL_COLOR_STYLES = `
<style>
.pd-text-muted{color:#6b7280;}
.pd-dot-muted{background-color:#6b7280;}
.pd-btn-orange{background-color:#E97300;}
.pd-btn-orange:hover{background-color:#c96200;}
.pd-box-border{border-color:#003B71;}
.pd-text-primary{color:#003B71;}
.pd-text-orange{color:#E97300;}
.pd-box-divider{background-color:#E97300;}
</style>`;

const PRODUCT_DETAIL_CARDS_GRID_STYLES = `
<style>
.pd-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
.pd-card{background:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;gap:0.75rem;}
@media(max-width:640px){.pd-cards-grid{grid-template-columns:1fr;}}
</style>`;

const PRODUCT_DETAIL_HEADER_GRID_STYLES = `
<style>
.pd-header-grid{
    display:grid;
    grid-template-columns:1fr 1fr minmax(220px,0.8fr);
    grid-template-areas:"intro intro action" "col1 col2 action";
    gap:2rem 3rem;
    align-items:start;
}
.pd-header-grid>.pd-hg-intro{grid-area:intro;}
.pd-header-grid>.pd-hg-col1{grid-area:col1;}
.pd-header-grid>.pd-hg-col2{grid-area:col2;}
.pd-header-grid>.pd-hg-action{grid-area:action;}
@media(max-width:992px){
    .pd-header-grid{
        grid-template-columns:1fr 1fr;
        grid-template-areas:"intro intro" "col1 col2" "action action";
        gap:2rem;
    }
}
@media(max-width:640px){
    .pd-header-grid{
        grid-template-columns:1fr;
        grid-template-areas:"intro" "col1" "col2" "action";
        gap:1.5rem;
    }
}
</style>`;

const iconProductDetailCardsGrid = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="13" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="5" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="3" y="14" width="4" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="3" y="15.5" width="3" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="9" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="12" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="10" y="14" width="4" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="10" y="15.5" width="3" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="20" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="5" cy="22.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="3" y="25" width="4" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="3" y="26.5" width="3" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="9" y="20" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="12" cy="22.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="10" y="25" width="4" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="10" y="26.5" width="3" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="18" y="2" width="12" height="3" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="18" y="7" width="12" height="2" rx="1" fill="#E97300" fill-opacity="0.4"/>
    <rect x="18" y="12" width="12" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.85"/>
    <rect x="18" y="17" width="12" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="18" y="19" width="10" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="18" y="22" width="12" height="1" rx="0.5" fill="#E97300" fill-opacity="0.6"/>
    <circle cx="19.5" cy="25.5" r="0.8" fill="#003B71" fill-opacity="0.4"/>
    <rect x="21" y="25" width="8" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <circle cx="19.5" cy="27.5" r="0.8" fill="#003B71" fill-opacity="0.4"/>
    <rect x="21" y="27" width="6" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
</svg>`;

const iconProductDetailHeaderGrid = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2" y="6.5" width="14" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="3.5" cy="16" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="5.5" y="15.3" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="3.5" cy="19" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="5.5" y="18.3" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="13" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="14.5" cy="16" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="16.5" y="15.3" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="14.5" cy="19" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="16.5" y="18.3" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="24" y="2" width="6" height="6" rx="1" fill="none" stroke="#E97300" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="24" y="11" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
    <rect x="24" y="17" width="6" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="24" y="19" width="6" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
</svg>`;

const iconProductDetailThreeCol = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="4" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
    <rect x="3" y="11" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="3" y="13" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="12" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="14" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
    <rect x="13" y="11" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="13" y="13" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="22" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="23" y="6" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.5"/>
    <rect x="23" y="11" width="6" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="23" y="16" width="6" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="23" y="18" width="5" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
</svg>`;

const iconProductDetailBox = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="14" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="4" y="5" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="9" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="11" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="13" width="9" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="16" width="3" height="1" rx="0.5" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="5" cy="20" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="7" y="19.3" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="18" y="3" width="12" height="13" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="20" y="6" width="8" height="3" rx="1" fill="#E97300" fill-opacity="0.3"/>
    <rect x="20" y="11" width="8" height="3" rx="1.5" fill="#E97300" fill-opacity="0.8"/>
    <rect x="18" y="18" width="12" height="11" fill="none" stroke="#003B71" stroke-width="1" rx="1.5"/>
    <rect x="20" y="20.5" width="8" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.7"/>
    <rect x="20" y="23.5" width="8" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.8"/>
</svg>`;

const iconProductDetail = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="14" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="4" y="5" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="9" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="11" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="13" width="9" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="16" width="3" height="1" rx="0.5" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="5" cy="20" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="7" y="19.3" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="5" cy="23" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="7" y="22.3" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="18" y="3" width="12" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="20" y="6" width="8" height="4" rx="1" fill="#E97300" fill-opacity="0.3"/>
    <rect x="20" y="13" width="8" height="4" rx="2" fill="#E97300" fill-opacity="0.8"/>
    <rect x="20" y="20" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.2"/>
    <rect x="20" y="22" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.2"/>
    <rect x="20" y="24" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.2"/>
</svg>`;

const iconBulletItem = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="6" cy="10" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="9" width="18" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <circle cx="6" cy="17" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="16" width="16" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <circle cx="6" cy="24" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="23" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`;

const iconFootnote = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="5" width="26" height="1.5" rx="0.75" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="3" y="9" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="11.5" width="20" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="16" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="18.5" width="22" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="23" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="25.5" width="18" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
</svg>`;

const BULLET_ITEM = `
<li class="flex items-start gap-2 text-base text-[#003B71]">
    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#003B71] shrink-0"></span>
    <span>Lorem ipsum dolor sit amet consectetur adipiscing elit.</span>
</li>`;

const FOOTNOTE = `
<p class="text-sm pd-text-muted leading-relaxed text-justify m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`;

const PRICE_BOX = `
<div class="w-full rounded-xl border-2 pd-box-border px-6 py-4 flex flex-col items-start gap-1 text-center">
    <span class="text-2xl font-bold pd-text-primary uppercase tracking-wide">Invierte desde:</span>
    <span class="text-2xl font-black pd-text-orange">$150.00</span>
</div>`;

const PRICE_BOX_ROW = `
<div class="flex flex-col items-start gap-1 py-4 px-6">
    <span class="text-lg font-bold pd-text-primary uppercase tracking-wide leading-snug">Lorem ipsum:</span>
    <span class="text-lg font-bold pd-text-primary">Hasta: <span class="pd-text-orange">$0.00</span></span>
</div>`;

const PRICE_BOX_DOUBLE = `
<div class="w-full rounded-xl border-2 pd-box-border flex flex-col">
    ${PRICE_BOX_ROW}
    <div class="px-6">
        <div class="w-full h-0.5 pd-box-divider"></div>
    </div>
    ${PRICE_BOX_ROW}
</div>`;

const DETAIL_CARD = (title) => `
<div class="pd-card items-center">
    <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${assetUrl("images/placeholder.svg")}" alt="" class="w-6 h-6 object-contain">
    </div>
    <span class="text-sm font-bold text-[#E97300] uppercase tracking-wide leading-snug w-full">  ${title}</span>
    <ul class="list-none p-0 m-0 flex flex-col gap-2 w-full">
        ${BULLET_ITEM}
        ${BULLET_ITEM}
        ${BULLET_ITEM}
    </ul>
</div>`;

export const productDetailBlocks = [
    {
        id: "product-detail-section",
        label: "Detalle de producto",
        category: "Productos y Servicios",
        media: iconProductDetail,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Diseñado para empresarios que desean maximizar la rentabilidad de sus ahorros. Tasa de interés preferencial, con intereses capitalizados mensualmente.</p>
            <div class="flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-3">
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                </ul>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] uppercase leading-tight text-center w-full">Ahorro Rentable</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            <div class="w-full flex flex-col gap-2 pt-3">
                ${FOOTNOTE}
                ${FOOTNOTE}
                ${FOOTNOTE}
            </div>
        </div>
    </div>
</section>
${PRODUCT_DETAIL_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },
    {
        id: "product-detail-cards-grid",
        label: "Detalle de producto con tarjetas",
        category: "Productos y Servicios",
        media: iconProductDetailCardsGrid,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg text-[#003B71] leading-snug m-0">Nos interesa la salud y bienestar de nuestros clientes, por eso te ofrecemos este servicio, disponible y exclusivo al contratar y mantener al día tu crédito.</p>
            <div class="pd-cards-grid">
                ${DETAIL_CARD("Cobertura para accidente")}
                ${DETAIL_CARD("Exámenes de laboratorio")}
                ${DETAIL_CARD("Medicamentos")}
                ${DETAIL_CARD("Consultas médicas")}
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] uppercase leading-tight text-center w-full">Microseguro de Salud</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu servicio</a>
            <div class="w-full flex flex-col gap-2 pt-1">
                ${FOOTNOTE}
                ${FOOTNOTE}
            </div>
            <div class="w-full flex flex-col gap-3 pt-2">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-2">
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                </ul>
            </div>
            <div class="w-full flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Condiciones:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-2">
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                </ul>
            </div>
        </div>
    </div>
</section>
${PRODUCT_DETAIL_GRID_STYLES}
${PRODUCT_DETAIL_CARDS_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },
    {
        id: "product-detail-box",
        label: "Detalle de producto con cuadro de precio",
        category: "Productos y Servicios",
        media: iconProductDetailBox,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Diseñado para empresarios que desean maximizar la rentabilidad de sus ahorros. Tasa de interés preferencial, con intereses capitalizados mensualmente.</p>
            <div class="flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-3">
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                </ul>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] uppercase leading-tight text-center w-full">Ahorro Rentable</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            ${PRICE_BOX}
            <div class="w-full flex flex-col gap-2 pt-3">
                ${FOOTNOTE}
                ${FOOTNOTE}
                ${FOOTNOTE}
            </div>
        </div>
    </div>
</section>
${PRODUCT_DETAIL_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },
    {
        id: "product-detail-three-col",
        label: "Detalle de producto (3 columnas)",
        category: "Productos y Servicios",
        media: iconProductDetailThreeCol,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-three-col-grid">
        <div class="flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${BULLET_ITEM}
                ${BULLET_ITEM}
                ${BULLET_ITEM}
            </ul>
        </div>
        <div class="flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Beneficios:</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${BULLET_ITEM}
                ${BULLET_ITEM}
                ${BULLET_ITEM}
            </ul>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] uppercase leading-tight text-center w-full">Ahorro Rentable</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            <div class="w-full flex flex-col gap-2 pt-3">
                ${FOOTNOTE}
                ${FOOTNOTE}
                ${FOOTNOTE}
            </div>
        </div>
    </div>
</section>
${PRODUCT_DETAIL_THREE_COL_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },
    {
        id: "product-detail-header-grid",
        label: "Detalle de producto (encabezado + 2 columnas)",
        category: "Productos y Servicios",
        media: iconProductDetailHeaderGrid,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-header-grid">
        <div class="pd-hg-intro">
            <p class="text-lg font-bold text-[#003B71] leading-snug m-0">Invierte en el futuro de tu negocio con financiamiento flexible, atención personalizada y el respaldo necesario para seguir creciendo.</p>
        </div>
        <div class="pd-hg-col1 flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${BULLET_ITEM}
                ${BULLET_ITEM}
                ${BULLET_ITEM}
                ${BULLET_ITEM}
            </ul>
        </div>
        <div class="pd-hg-col2 flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Requisitos</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${BULLET_ITEM}
                ${BULLET_ITEM}
            </ul>
        </div>
        <div class="pd-hg-action flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] uppercase leading-tight text-center w-full">Credinvierte</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            <div class="w-full flex flex-col gap-2 pt-3">
                ${FOOTNOTE}
                ${FOOTNOTE}
                ${FOOTNOTE}
            </div>
        </div>
    </div>
</section>
${PRODUCT_DETAIL_HEADER_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },
    {
        id: "product-detail-box-double",
        label: "Detalle de producto con cuadro de precio doble",
        category: "Productos y Servicios",
        media: iconProductDetailBox,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Impulsa tu negocio con financiamiento ágil y flexible, diseñado para ayudarte a crecer, invertir y aprovechar nuevas oportunidades.</p>
            <p class="text-base font-bold text-[#E97300] uppercase leading-snug">Créditos para tu negocio, créditos sin garantía, crédito para cliente nuevo o recurrente; con experiencia crediticia.</p>
            <div class="flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-3">
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                    ${BULLET_ITEM}
                </ul>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] uppercase leading-tight text-center w-full">Soluciones Integrales</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Solicita tu crédito</a>
            ${PRICE_BOX_DOUBLE}
            <div class="w-full flex flex-col gap-2 pt-3">
                ${FOOTNOTE}
                ${FOOTNOTE}
            </div>
        </div>
    </div>
</section>
${PRODUCT_DETAIL_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },
    {
        id: "product-detail-bullet",
        label: "Ítem de ventaja",
        category: "Productos y Servicios",
        media: iconBulletItem,
        content: `
<ul class="list-none p-0 m-0 flex flex-col gap-3">
    ${BULLET_ITEM}
</ul>`,
    },
    {
        id: "product-detail-footnote",
        label: "Nota al pie",
        category: "Productos y Servicios",
        media: iconFootnote,
        content: `
<div class="w-full flex flex-col gap-2">
    ${FOOTNOTE}
</div>
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },
    {
        id: "product-detail-price-box",
        label: "Cuadro de precio",
        category: "Productos y Servicios",
        media: iconProductDetailBox,
        content: `
${PRICE_BOX}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },
    {
        id: "product-detail-price-box-double",
        label: "Cuadro de precio doble",
        category: "Productos y Servicios",
        media: iconProductDetailBox,
        content: `
${PRICE_BOX_DOUBLE}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },
];