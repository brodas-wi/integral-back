import { assetUrl } from "@/utils/url.js";

const CATEGORY = "Contenido";

const HEADING = {
    title: "Compromiso con la Inclusión Financiera",
    subtitle: "Trabajamos para que todos tengan acceso a servicios financieros de calidad",
};

const BENEFITS = [
    { title: "Red de Agencias", desc: "Presencia en todo el país" },
    { title: "Atención 24/7", desc: "Siempre disponibles para ti" },
    { title: "Inclusión Financiera", desc: "Acceso para todos" },
    { title: "Seguridad Total", desc: "Protección garantizada" },
];

const STYLES = `<style>
.pb-section{position:relative;width:100%;background-color:#E97300;border-top-left-radius:clamp(90px,12vw,200px);box-sizing:border-box;overflow:hidden;}
.pb-section.pb-radius-right{border-top-left-radius:0;border-top-right-radius:clamp(90px,12vw,200px);}
.pb-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(2.5rem,5vw,4rem);padding-bottom:clamp(2.5rem,5vw,4rem);padding-left:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);}
.pb-heading{text-align:center;}
.pb-title{margin:0;font-size:2.25rem;font-weight:700;line-height:1.2;color:#fff;}
.pb-subtitle{margin:0.5rem 0 0;font-size:1rem;line-height:1.5;color:#fff;}
.pb-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:2rem;margin-top:2.5rem;}
.pb-item{display:flex;flex-direction:column;align-items:center;text-align:center;}
.pb-badge{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:4rem;height:4rem;margin-bottom:0.75rem;border-radius:9999px;background-color:rgba(255,255,255,0.2);}
.pb-badge img{display:block;width:2.25rem;height:2.25rem;object-fit:contain;}
.pb-item-title{margin-bottom:0.15rem;font-size:1.125rem;font-weight:700;line-height:1.3;color:#fff;}
.pb-item-desc{font-size:1rem;line-height:1.4;color:#fff;}
@media(max-width:992px){
.pb-title{font-size:1.875rem;}
.pb-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem;}
}
@media(max-width:640px){
.pb-title{font-size:1.5rem;}
}
</style>`;

const icon = (path, extra = "") => `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <path d="${path}" fill="#E97300"/>
    ${extra}
    <circle cx="8" cy="20" r="3" fill="#ffffff" fill-opacity="0.3"/>
    <circle cx="16" cy="20" r="3" fill="#ffffff" fill-opacity="0.3"/>
    <circle cx="24" cy="20" r="3" fill="#ffffff" fill-opacity="0.3"/>
    <rect x="5" y="26" width="6" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.7"/>
    <rect x="13" y="26" width="6" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.7"/>
    <rect x="21" y="26" width="6" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.7"/>
</svg>`;

const ICON_LEFT = icon(
    "M0 8 Q0 0 8 0 L32 0 L32 32 L0 32 Z",
    '<rect x="6" y="4" width="18" height="3" rx="1.5" fill="#ffffff"/>',
);

const ICON_RIGHT = icon(
    "M32 8 Q32 0 24 0 L0 0 L0 32 L32 32 Z",
    '<rect x="8" y="4" width="18" height="3" rx="1.5" fill="#ffffff"/>',
);

const benefitItem = ({ title, desc }) => `
<div class="pb-item">
    <div class="pb-badge">
        <img src="${assetUrl("images/placeholder.svg")}" alt="" width="36" height="36" loading="lazy">
    </div>
    <span class="pb-item-title">${title}</span>
    <span class="pb-item-desc">${desc}</span>
</div>`;

const benefitsSection = (side) => `
<section class="pb-section${side === "right" ? " pb-radius-right" : ""}">
    <div class="pb-container">
        <div class="pb-heading">
            <h2 class="pb-title">${HEADING.title}</h2>
            <p class="pb-subtitle">${HEADING.subtitle}</p>
        </div>
        <div class="pb-grid">${BENEFITS.map(benefitItem).join("")}</div>
    </div>
</section>
${STYLES}`;

export const productBenefitsBlock = {
    id: "product-benefits-section",
    label: "Sección: beneficios + curva izquierda",
    category: CATEGORY,
    media: ICON_LEFT,
    content: benefitsSection("left"),
};

export const productBenefitsBlockRight = {
    id: "product-benefits-section-right",
    label: "Sección: beneficios + curva derecha",
    category: CATEGORY,
    media: ICON_RIGHT,
    content: benefitsSection("right"),
};