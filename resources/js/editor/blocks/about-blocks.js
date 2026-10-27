import { assetUrl } from "@/utils/url.js";

const CATEGORY = "Institutional";

const PARAGRAPHS = [
    `Banco Integral nació en <span class="hs-highlight">1990</span> como un proyecto de créditos de la Fundación Salvadoreña de Apoyo Integral FUSAI, apoyado por naciones Unidas, evoluciono a través de los años hasta convertirse en Banco Integral, S.A.`,
    `Nuestra Institución está enfocada en acompañar el desarrollo de los empresarios de la micro y pequeña empresa de El Salvador con productos y servicios financieros especializados e innovadores adaptados a sus necesidades, teniendo al cliente como eje central de todas operaciones.`,
    `Contamos con <span class="hs-highlight">27</span> agencias y más de <span class="hs-highlight">1000</span> puntos de pago distribuidos en El Salvador, acompañando a miles de salvadoreños para impulsar el crecimiento de sus negocios por medio de productos y servicios financieros, que incluyen valores agregados como:`,
];

const BENEFITS = [
    "Educación financiera",
    "Programas de formación empresarial",
    "Asistencia técnica constructiva gratuita para créditos de mejora de viviendas",
    "Asimismo ofrecemos otros servicios como: Microseguros de salud, vida y pago de remesas.",
];

const HS_CSS = `
.hs-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;scroll-margin-top:140px;}
.hs-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.hs-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(2rem,5vw,4rem);align-items:center;}
.hs-content{display:flex;flex-direction:column;gap:1rem;min-width:0;}
.hs-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.875rem,3.5vw,2.25rem);line-height:1.2;}
.hs-text{margin:0;color:#003B71;font-weight:400;font-size:1rem;line-height:1.625;text-align:justify;}
.hs-highlight{color:#E97300;font-weight:700;}
.hs-list{margin:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:1.25rem;list-style-type:disc;list-style-position:outside;}
.hs-list-item{margin:0;color:#E97300;font-weight:600;font-size:1rem;line-height:1.5;}
.hs-list-item + .hs-list-item{margin-top:0.375rem;}
.hs-media{width:100%;min-width:0;border-radius:1rem;overflow:hidden;}
.hs-image{display:block;width:100%;height:auto;object-fit:cover;}
@media(max-width:992px){
.hs-section{scroll-margin-top:80px;}
.hs-grid{grid-template-columns:minmax(0,1fr);}
}
`;

const ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="6" width="12" height="2.6" rx="1.3" fill="#003B71" fill-opacity="0.8"/>
    <rect x="3" y="11" width="13" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.45"/>
    <rect x="3" y="14" width="13" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.45"/>
    <rect x="3" y="17" width="9" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.45"/>
    <circle cx="4.2" cy="21.4" r="0.9" fill="#E97300"/>
    <rect x="7" y="20.8" width="8" height="1.2" rx="0.6" fill="#E97300"/>
    <circle cx="4.2" cy="24.8" r="0.9" fill="#E97300"/>
    <rect x="7" y="24.2" width="6" height="1.2" rx="0.6" fill="#E97300"/>
    <rect x="18" y="6" width="12" height="20" rx="2.5" fill="#003B71" fill-opacity="0.15" stroke="#003B71" stroke-width="1"/>
    <circle cx="22" cy="12" r="1.8" fill="#003B71" fill-opacity="0.5"/>
    <path d="M18.5 22l4-4 3 3 2-2 2 3" stroke="#003B71" stroke-width="1" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
</svg>`;

const escapeAttr = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/"/g, "&quot;");

const paragraphs = () =>
    PARAGRAPHS.map((text) => `<p class="hs-text">${text}</p>`).join("");

const benefits = () =>
    BENEFITS.map((text) => `<li class="hs-list-item">${text}</li>`).join("");

function buildSection() {
    return `<section class="hs-section" data-gjs-name="Nuestra Historia"><div class="hs-container" data-gjs-name="Contenedor"><div class="hs-grid" data-gjs-name="Cuadrícula"><div class="hs-content" data-gjs-name="Contenido"><h2 class="hs-title">Nuestra Historia</h2>${paragraphs()}<ul class="hs-list">${benefits()}</ul></div><div class="hs-media" data-gjs-name="Imagen"><img class="hs-image" src="${escapeAttr(assetUrl("images/placeholder.svg"))}" alt="Imagen de sección"></div></div></div></section><style>${HS_CSS}</style>`;
}

export const aboutBlocks = [
    {
        id: "about-section",
        label: "Nuestra Historia",
        category: CATEGORY,
        media: ICON,
        content: buildSection(),
    },
];