const PB_STYLES = `
<style>
.pb-section{position:relative;width:100%;background:#E97300;border-top-left-radius:clamp(90px,12vw,200px);padding:clamp(2.5rem,5vw,4rem) clamp(1.5rem,4vw,4rem);box-sizing:border-box;overflow:hidden;}
.pb-section.pb-radius-right{border-top-left-radius:0;border-top-right-radius:clamp(90px,12vw,200px);}
.pb-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:2rem;margin-top:2.5rem;}
.pb-item{display:flex;flex-direction:column;align-items:center;text-align:center;}
.pb-badge{margin-bottom:0.75rem;}
.pb-item span:first-of-type{margin-bottom:0.15rem;}
.pb-badge{width:4rem;height:4rem;border-radius:9999px;background:rgba(255,255,255,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-bottom:0.75rem;}
.pb-item span:first-of-type{margin-bottom:0.15rem;}
@media(max-width:640px){.pb-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem;}}
</style>`;

function benefitItem(icon, title, desc) {
    return `<div class="pb-item">
        <div class="pb-badge">
            <i class="${icon} text-2xl text-white"></i>
        </div>
        <span class="text-lg font-bold text-white">${title}</span>
        <span class="text-base text-white">${desc}</span>
    </div>`;
}

function buildProductBenefitsHTML(radiusSide = "left") {
    const sideClass = radiusSide === "right" ? " pb-radius-right" : "";
    return `<section class="pb-section${sideClass}">
        <div class="w-full text-center">
            <h2 class="text-4xl font-bold text-white">Compromiso con la Inclusión Financiera</h2>
            <p class="text-base text-white mt-2">Trabajamos para que todos tengan acceso a servicios financieros de calidad</p>
        </div>
        <div class="pb-grid">
            ${benefitItem("ri-map-pin-line", "Red de Agencias", "Presencia en todo el país")}
            ${benefitItem("ri-time-line", "Atención 24/7", "Siempre disponibles para ti")}
            ${benefitItem("ri-hand-coin-line", "Inclusión Financiera", "Acceso para todos")}
            ${benefitItem("ri-shield-line", "Seguridad Total", "Protección garantizada")}
        </div>
    </section>${PB_STYLES}`;
}

const iconProductBenefits = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8 Q0 0 8 0 L32 0 L32 32 L0 32 Z" fill="#E97300"/>
    <rect x="6" y="4" width="18" height="3" rx="1.5" fill="#ffffff"/>
    <circle cx="8" cy="20" r="3" fill="#ffffff" fill-opacity="0.3"/>
    <circle cx="16" cy="20" r="3" fill="#ffffff" fill-opacity="0.3"/>
    <circle cx="24" cy="20" r="3" fill="#ffffff" fill-opacity="0.3"/>
    <rect x="5" y="26" width="6" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.7"/>
    <rect x="13" y="26" width="6" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.7"/>
    <rect x="21" y="26" width="6" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.7"/>
</svg>`;

const iconProductBenefitsRight = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 8 Q32 0 24 0 L0 0 L0 32 L32 32 Z" fill="#E97300"/>
    <rect x="8" y="4" width="18" height="3" rx="1.5" fill="#ffffff"/>
    <circle cx="8" cy="20" r="3" fill="#ffffff" fill-opacity="0.3"/>
    <circle cx="16" cy="20" r="3" fill="#ffffff" fill-opacity="0.3"/>
    <circle cx="24" cy="20" r="3" fill="#ffffff" fill-opacity="0.3"/>
    <rect x="5" y="26" width="6" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.7"/>
    <rect x="13" y="26" width="6" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.7"/>
    <rect x="21" y="26" width="6" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.7"/>
</svg>`;

export const productBenefitsBlock = {
    id: "product-benefits-section",
    label: "Sección: beneficios con íconos (radio izquierda)",
    category: "Banners",
    media: iconProductBenefits,
    content: buildProductBenefitsHTML("left"),
};

export const productBenefitsBlockRight = {
    id: "product-benefits-section-right",
    label: "Sección: beneficios con íconos (radio derecha)",
    category: "Banners",
    media: iconProductBenefitsRight,
    content: buildProductBenefitsHTML("right"),
};