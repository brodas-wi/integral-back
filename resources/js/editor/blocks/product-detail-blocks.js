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

const PRODUCT_DETAIL_ICONS_CTA_STYLES = `
<style>
.pd-icons-cta-grid{display:grid;grid-template-columns:3fr 2fr;gap:2rem;align-items:center;}
@media(max-width:992px){.pd-icons-cta-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`;

const PRODUCT_DETAIL_CARDS_GRID_STYLES = `
<style>
.pd-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
.pd-card{background:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;gap:0.75rem;}
@media(max-width:640px){.pd-cards-grid{grid-template-columns:1fr;}}
</style>`;

const PRODUCT_DETAIL_CARDS_ROW_STYLES = `
<style>
.pd-cards-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;}
.pd-card-simple{background:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;align-items:center;gap:0.75rem;text-align:center;}
@media(max-width:640px){.pd-cards-row{grid-template-columns:1fr 1fr;}}
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

const PRODUCT_DETAIL_TABLE_STYLES = `
<style>
.pd-coverage-table{width:100%;border-collapse:collapse;border-radius:0.5rem;overflow:hidden;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);}
.pd-coverage-table thead th{background-color:#E97300;color:#fff;text-align:left;padding:0.75rem 1rem;font-size:0.95rem;letter-spacing:0.02em;}
.pd-coverage-table thead th:not(:first-child){text-align:center;}
.pd-coverage-table tbody td{padding:0.65rem 1rem;font-size:0.9rem;color:#003B71;border-bottom:1px solid #e5e7eb;}
.pd-coverage-table tbody td:not(:first-child){text-align:center;font-weight:700;}
.pd-coverage-table tbody tr:last-child td{border-bottom:none;}
.pd-coverage-table tbody td:first-child{font-weight:700;}
@media(max-width:640px){.pd-coverage-table{font-size:0.8rem;}.pd-coverage-table thead th,.pd-coverage-table tbody td{padding:0.5rem 0.6rem;}}
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

const bulletItem = () => `
<li class="flex items-start gap-2 text-base text-[#003B71]">
    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#003B71] shrink-0"></span>
    <span>Lorem ipsum dolor sit amet consectetur adipiscing elit.</span>
</li>`;

const bulletList = (n = 3, label = null) => `
<div class="flex flex-col gap-3">
    ${label ? `<span class="text-base font-bold text-[#E97300] tracking-wide">${label}</span>` : ""}
    <ul class="list-none p-0 m-0 flex flex-col gap-3">
        ${Array.from({ length: n }, bulletItem).join("")}
    </ul>
</div>`;

const footnote = () => `
<p class="text-base pd-text-muted leading-relaxed text-justify m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`;

const footnoteGroup = (n = 1) => `
<div class="w-full flex flex-col gap-2">
    ${Array.from({ length: n }, footnote).join("")}
</div>`;

const priceBox = () => `
<div class="w-full rounded-xl border-2 pd-box-border px-6 py-4 flex flex-col items-center justify-center gap-1 text-center">
    <span class="text-2xl font-bold pd-text-primary tracking-wide">Invierte desde:</span>
    <span class="text-2xl font-black pd-text-orange">$00.00</span>
</div>`;

const priceBoxRow = () => `
<div class="flex flex-col items-center justify-center gap-1 py-4 px-6">
    <span class="text-lg font-bold pd-text-primary tracking-wide leading-snug">Invierte desde:</span>
    <span class="text-lg font-bold pd-text-primary">Hasta: <span class="pd-text-orange">$00.00</span></span>
</div>`;

const priceBoxDouble = () => `
<div class="w-full rounded-xl border-2 pd-box-border flex flex-col">
    ${priceBoxRow()}
    <div class="px-6">
        <div class="w-full h-0.5 pd-box-divider"></div>
    </div>
    ${priceBoxRow()}
</div>`;

const iconCard = (title = "Lorem ipsum", n = 3) => `
<div class="pd-card items-center">
    <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${assetUrl("images/placeholder.svg")}" alt="" class="w-6 h-6 object-contain">
    </div>
    <span class="text-base font-bold text-[#E97300] tracking-wide leading-snug w-full">${title}</span>
    <ul class="list-none p-0 m-0 flex flex-col gap-2 w-full">
        ${Array.from({ length: n }, bulletItem).join("")}
    </ul>
</div>`;

const iconCardSimple = (title = "Lorem ipsum") => `
<div class="pd-card-simple">
    <div class="w-14 h-14 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${assetUrl("images/placeholder.svg")}" alt="" class="w-7 h-7 object-contain">
    </div>
    <span class="text-base font-bold text-[#003B71] tracking-wide">${title}</span>
    <p class="text-base text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
</div>`;

const iconCardRow = (n = 4) => `
<div class="pd-cards-row">
    ${Array.from({ length: n }, () => iconCardSimple()).join("")}
</div>`;

const ctaButton = (label = "Adquiere tu servicio") => `
<a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center tracking-wide max-w-full transition-colors no-underline">${label}</a>`;

const productTitle = (title = "Nombre del Producto") => `
<h2 class="text-4xl font-black text-[#E97300] break-words leading-tight text-center w-full">${title}</h2>`;

const coverageRow = () => `
<tr>
    <td>Lorem ipsum dolor sit amet</td>
    <td>1</td>
    <td>$00.00</td>
</tr>`;

const coverageTable = (n = 5) => `
<table class="pd-coverage-table">
    <thead>
        <tr>
            <th>Coberturas</th>
            <th>Cantidad</th>
            <th>Límite (US$)</th>
        </tr>
    </thead>
    <tbody>
        ${Array.from({ length: n }, coverageRow).join("")}
    </tbody>
</table>`;

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

const iconProductDetailCardsGrid = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="13" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="5" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="9" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="12" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="18" y="2" width="12" height="3" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="18" y="7" width="12" height="2" rx="1" fill="#E97300" fill-opacity="0.4"/>
    <rect x="18" y="12" width="12" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.85"/>
</svg>`;

const iconProductDetailCardsRow = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="5" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="9" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="12" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="16" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="19" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="23" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="26" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="2" y="4" width="27" height="2" rx="1" fill="#003B71" fill-opacity="0.4"/>
</svg>`;

const iconProductDetailThreeCol = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="4" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
    <rect x="12" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="14" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
    <rect x="22" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="23" y="11" width="6" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
</svg>`;

const iconProductDetailHeaderGrid = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="13" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="24" y="2" width="6" height="6" rx="1" fill="none" stroke="#E97300" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="24" y="11" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`;

const iconProductDetailIconsCta = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="5" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="13" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="21" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <rect x="24" y="17" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`;

const iconProductDetailTable = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="20" height="4" fill="#E97300" fill-opacity="0.8" rx="1"/>
    <rect x="2" y="10" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
    <rect x="2" y="14" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
    <rect x="2" y="18" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
    <rect x="24" y="4" width="6" height="4" rx="1" fill="none" stroke="#E97300" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="24" y="11" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
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
</svg>`;

const iconCta = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="6" y="13" width="20" height="7" rx="3.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`;

const iconProductTitle = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="12" width="24" height="5" rx="1" fill="#E97300" fill-opacity="0.8"/>
    <rect x="8" y="19" width="16" height="2" rx="1" fill="#E97300" fill-opacity="0.4"/>
</svg>`;

const CATEGORY = "Detalle de Producto";

export const productDetailBlocks = [
    {
        id: "product-detail-section",
        label: "Sección: 2 columnas (texto + acción)",
        category: CATEGORY,
        media: iconProductDetail,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            ${bulletList(5, "Ventajas:")}
        </div>
        <div class="flex flex-col items-center gap-4">
            ${productTitle("Nombre del Producto")}
            ${ctaButton("Adquiere tu servicio")}
            ${footnoteGroup(3)}
        </div>
    </div>
</section>
${PRODUCT_DETAIL_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-box",
        label: "Sección: 2 columnas + cuadro de precio",
        category: CATEGORY,
        media: iconProductDetailBox,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            ${bulletList(4, "Ventajas:")}
        </div>
        <div class="flex flex-col items-center gap-4">
            ${productTitle("Nombre del Producto")}
            ${ctaButton("Adquiere tu servicio")}
            ${priceBox()}
            ${footnoteGroup(3)}
        </div>
    </div>
</section>
${PRODUCT_DETAIL_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-box-double",
        label: "Sección: 2 columnas + cuadro de precio doble",
        category: CATEGORY,
        media: iconProductDetailBox,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p class="text-base font-bold text-[#E97300] leading-snug">Lorem ipsum dolor sit amet, subtítulo destacado de la sección.</p>
            ${bulletList(6, "Ventajas")}
        </div>
        <div class="flex flex-col items-center gap-4">
            ${productTitle("Nombre del Producto")}
            ${ctaButton("Solicita tu crédito")}
            ${priceBoxDouble()}
            ${footnoteGroup(2)}
        </div>
    </div>
</section>
${PRODUCT_DETAIL_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-three-col",
        label: "Sección: 3 columnas (2 listas + acción)",
        category: CATEGORY,
        media: iconProductDetailThreeCol,
        content: `
<section class="w-full bg-white px-16 py-12 flex flex-col gap-6">
    <p class="text-lg font-bold text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <div class="pd-three-col-grid">
        ${bulletList(3, "Ventajas:")}
        ${bulletList(3, "Beneficios:")}
        <div class="flex flex-col items-center gap-4">
            ${productTitle("Nombre del Producto")}
            ${ctaButton("Adquiere tu servicio")}
            ${footnoteGroup(3)}
        </div>
    </div>
</section>
${PRODUCT_DETAIL_THREE_COL_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-header-grid",
        label: "Sección: encabezado + 2 listas + acción",
        category: CATEGORY,
        media: iconProductDetailHeaderGrid,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-header-grid">
        <div class="pd-hg-intro">
            <p class="text-lg font-bold text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="pd-hg-col1">
            ${bulletList(4, "Ventajas")}
        </div>
        <div class="pd-hg-col2">
            ${bulletList(2, "Requisitos")}
        </div>
        <div class="pd-hg-action flex flex-col items-center gap-4">
            ${productTitle("Nombre del Producto")}
            ${ctaButton("Adquiere tu servicio")}
            ${footnoteGroup(3)}
        </div>
    </div>
</section>
${PRODUCT_DETAIL_HEADER_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-cards-grid",
        label: "Sección: tarjetas con lista + acción",
        category: CATEGORY,
        media: iconProductDetailCardsGrid,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            <div class="pd-cards-grid">
                ${iconCard("Lorem ipsum uno", 3)}
                ${iconCard("Lorem ipsum dos", 3)}
                ${iconCard("Lorem ipsum tres", 3)}
                ${iconCard("Lorem ipsum cuatro", 3)}
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            ${productTitle("Nombre del Producto")}
            ${ctaButton("Adquiere tu servicio")}
            ${footnoteGroup(2)}
            ${bulletList(4, "Ventajas:")}
            ${bulletList(2, "Condiciones:")}
        </div>
    </div>
</section>
${PRODUCT_DETAIL_GRID_STYLES}
${PRODUCT_DETAIL_CARDS_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-cards-row",
        label: "Sección: fila de tarjetas simples (sin acción lateral)",
        category: CATEGORY,
        media: iconProductDetailCardsRow,
        content: `
<section class="w-full bg-white px-16 py-12 flex flex-col gap-5">
    <p class="text-base font-bold text-[#E97300] m-0">Subtítulo destacado</p>
    <p class="text-base font-semibold text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    ${iconCardRow(4)}
</section>
${PRODUCT_DETAIL_CARDS_ROW_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-repeat-blocks",
        label: "Sección: bloques título+párrafo repetidos + acción",
        category: CATEGORY,
        media: iconProductDetail,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-1">
                <p class="text-base font-bold text-[#003B71] m-0">Lorem ipsum dolor sit amet</p>
                <p class="text-base font-normal text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet, estamos listos para ayudarte con <span class="text-[#E97300] font-semibold">soluciones rápidas y efectivas</span>.</p>
            </div>
            <div class="flex flex-col gap-1">
                <p class="text-base font-bold text-[#003B71] m-0">Lorem ipsum dolor sit amet</p>
                <p class="text-base font-normal text-[#003B71] leading-relaxed m-0">Porque lo importante es <span class="text-[#E97300] font-semibold">nuestra prioridad</span>, recuerda que cuentas con <span class="text-[#E97300] font-semibold">servicios listos</span> para ayudarte en cualquier momento.</p>
            </div>
            <div class="flex flex-col gap-1">
                <p class="text-base font-bold text-[#003B71] m-0">Lorem ipsum dolor sit amet</p>
                <p class="text-base font-normal text-[#003B71] leading-relaxed m-0">No importa si es de día o de noche, tienes <span class="text-[#E97300] font-semibold">apoyo para seguir tu camino</span> sin preocupaciones.</p>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            ${productTitle("Nombre del Producto")}
            ${ctaButton("Adquiere tu servicio")}
            ${priceBox()}
            ${footnoteGroup(2)}
        </div>
    </div>
</section>
${PRODUCT_DETAIL_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-icons-cta",
        label: "Sección: imagen/íconos + acción",
        category: CATEGORY,
        media: iconProductDetailIconsCta,
        content: `
<section class="w-full bg-white px-16 py-12 flex flex-col gap-8">
    <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
    <div class="pd-icons-cta-grid">
        <div class="w-full">
            <img src="${assetUrl("images/placeholder.svg")}" alt="Servicios disponibles" class="w-full h-auto object-contain">
        </div>
        <div class="flex flex-col items-center gap-4">
            ${productTitle("Nombre del Producto")}
            ${ctaButton("Adquiere tu servicio")}
        </div>
    </div>
    <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet, texto adicional de cierre de la sección.</p>
</section>
${PRODUCT_DETAIL_ICONS_CTA_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-table",
        label: "Sección: tabla de coberturas + acción",
        category: CATEGORY,
        media: iconProductDetailTable,
        content: `
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            ${coverageTable(5)}
            <div class="flex flex-col gap-2">
                <p class="text-base font-bold text-[#003B71] m-0">Subtítulo de la sección</p>
                <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.</p>
                <p class="text-base font-bold text-[#E97300] m-0">Qué puede incluir:</p>
                ${bulletList(4)}
            </div>
            <div class="flex flex-col gap-2">
                <p class="text-base font-bold text-[#003B71] m-0">Subtítulo secundario</p>
                <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            ${productTitle("Nombre del Producto")}
            ${ctaButton("Adquiere tu servicio")}
            ${priceBox()}
            ${footnoteGroup(2)}
        </div>
    </div>
</section>
${PRODUCT_DETAIL_GRID_STYLES}
${PRODUCT_DETAIL_TABLE_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-bullet-item",
        label: "Ítem: bullet individual",
        category: CATEGORY,
        media: iconBulletItem,
        content: `
<ul class="list-none p-0 m-0 flex flex-col gap-3">
    ${bulletItem()}
</ul>
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-bullet-list",
        label: "Ítem: lista de ventajas (con título)",
        category: CATEGORY,
        media: iconBulletItem,
        content: `
${bulletList(4, "Ventajas:")}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-footnote",
        label: "Ítem: nota al pie",
        category: CATEGORY,
        media: iconFootnote,
        content: `
${footnoteGroup(1)}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-cta-button",
        label: "Ítem: botón CTA",
        category: CATEGORY,
        media: iconCta,
        content: `
${ctaButton("Adquiere tu servicio")}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-title",
        label: "Ítem: título de producto",
        category: CATEGORY,
        media: iconProductTitle,
        content: `
${productTitle("Nombre del Producto")}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-price-box",
        label: "Ítem: cuadro de precio simple",
        category: CATEGORY,
        media: iconProductDetailBox,
        content: `
${priceBox()}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-price-box-double",
        label: "Ítem: cuadro de precio doble",
        category: CATEGORY,
        media: iconProductDetailBox,
        content: `
${priceBoxDouble()}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-icon-card",
        label: "Ítem: tarjeta con ícono + lista",
        category: CATEGORY,
        media: iconProductDetailCardsGrid,
        content: `
<div class="pd-cards-grid" style="grid-template-columns:1fr;max-width:320px;">
    ${iconCard("Lorem ipsum", 3)}
</div>
${PRODUCT_DETAIL_CARDS_GRID_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-icon-card-simple",
        label: "Ítem: tarjeta simple (ícono + texto)",
        category: CATEGORY,
        media: iconProductDetailCardsRow,
        content: `
<div class="pd-cards-row" style="grid-template-columns:1fr;max-width:260px;">
    ${iconCardSimple("Lorem ipsum")}
</div>
${PRODUCT_DETAIL_CARDS_ROW_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },

    {
        id: "product-detail-coverage-table",
        label: "Ítem: tabla de coberturas",
        category: CATEGORY,
        media: iconProductDetailTable,
        content: `
${coverageTable(4)}
${PRODUCT_DETAIL_TABLE_STYLES}
${PRODUCT_DETAIL_COLOR_STYLES}`,
    },
];
