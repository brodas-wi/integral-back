import { assetUrl } from "@/utils/url.js";

const iconAbout = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="14" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1.5"/>
    <rect x="4" y="5" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="9" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="4" y="11" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="4" y="13" width="9" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="4" y="17" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="21" width="3" height="5" rx="1" fill="#E97300"/>
    <rect x="8" y="21" width="3" height="5" rx="1" fill="#E97300"/>
    <rect x="12" y="21" width="3" height="5" rx="1" fill="#E97300"/>
    <rect x="18" y="3" width="12" height="26" fill="#E97300" fill-opacity="0.15" rx="2"/>
    <rect x="20" y="5" width="8" height="22" fill="#E97300" fill-opacity="0.3" rx="1.5"/>
</svg>`;

const ABOUT_STYLES = `
<style>
.ab-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.ab-image-wrap{width:100%;border-radius:1rem;overflow:hidden;background:#E97300;}
.ab-image-wrap img{width:100%;height:100%;object-fit:cover;display:block;border-radius:1rem;}
.ab-bullet-list{list-style:none;padding:0;margin:0.75rem 0 0 0;display:flex;flex-direction:column;gap:0.4rem;}
.ab-bullet-list li{position:relative;padding-left:1.25rem;color:#E97300;font-weight:600;font-size:0.95rem;line-height:1.5;}
.ab-bullet-list li::before{content:"•";position:absolute;left:0;color:#E97300;font-size:1.1rem;line-height:1.4;}
.ab-highlight{color:#E97300;}
@media(max-width:1280px){.ab-section{padding:3rem 2.5rem;}}
@media(max-width:992px){
    .ab-section{padding:2.5rem 1.5rem;}
    .ab-grid{grid-template-columns:1fr;gap:2rem;}
}
@media(max-width:580px){.ab-section{padding:2rem 1rem;}}
</style>`;

export const aboutBlocks = [
    {
        id: "about-section",
        label: "Sección Nosotros",
        category: "Contenido",
        media: iconAbout,
        content: `
<section class="ab-section">
    <div class="ab-grid">
        <div class="ab-content-col flex flex-col gap-4">
            <h2 class="text-4xl font-bold text-[#003B71]">Nuestra Historia</h2>
            <p class="text-base text-[#003B71] leading-relaxed text-justify">Banco Integral nació en <span class="ab-highlight font-bold">1990</span> como un proyecto de créditos de la Fundación Salvadoreña de Apoyo Integral FUSAI, apoyado por naciones Unidas, evoluciono a través de los años hasta convertirse en Banco Integral, S.A.</p>
            <p class="text-base text-[#003B71] leading-relaxed text-justify">Nuestra Institución está enfocada en acompañar el desarrollo de los empresarios de la micro y pequeña empresa de El Salvador con productos y servicios financieros especializados e innovadores adaptados a sus necesidades, teniendo al cliente como eje central de todas operaciones.</p>
            <p class="text-base text-[#003B71] leading-relaxed text-justify">Contamos con <span class="ab-highlight font-bold">27</span> agencias y más de <span class="ab-highlight font-bold">1000</span> puntos de pago distribuidos en El Salvador, acompañando a miles de salvadoreños para impulsar el crecimiento de sus negocios por medio de productos y servicios financieros, que incluyen valores agregados como:</p>
            <ul class="ab-bullet-list">
                <li>Educación financiera</li>
                <li>Programas de formación empresarial</li>
                <li>Asistencia técnica constructiva gratuita para créditos de mejora de viviendas</li>
                <li>Asimismo ofrecemos otros servicios como: Microseguros de salud, vida y pago de remesas.</li>
            </ul>
        </div>
        <div class="ab-image-col">
            <div class="ab-image-wrap">
                <img src="${assetUrl("images/placeholder.svg")}" alt="Imagen de sección">
            </div>
        </div>
    </div>
</section>
${ABOUT_STYLES}`,
    },
];
