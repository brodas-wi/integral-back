import { assetUrl } from "@/utils/url.js";

const CATEGORY = "Institucional";

const SECTIONS = [
    {
        title: "Misión",
        text: "\"Proveemos la mejor experiencia a los empresarios de la micro y pequeña empresa, sus familiares y sus empleados, acompañándolos en su desarrollo con productos y servicios financieros especializados e innovadores adaptados a sus necesidades\".",
    },
    {
        title: "Visión",
        text: "\"Ser el banco pionero de la revolución financiera digital para los empresarios de la micro y pequeña empresa; y que mejor comprende y sirve sus necesidades de desarrollo a través de un ecosistema de productos y servicios integrales e innovadores.\".",
    },
];

const VALUES_INTRO =
    "\"Cada día la cultura Integral se está fortaleciendo, todos los que pertenecemos a esta organización compartimos y vivimos los valores\"";

const VALUES = ["Responsabilidad", "Compromiso social", "Integridad", "Excelencia"];

const STYLES = `<style>
.mv-section{width:100%;background-color:#fff;box-sizing:border-box;}
.mv-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);}
.mv-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:2rem;align-items:start;}
.mv-block{display:flex;flex-direction:column;gap:0.5rem;}
.mv-title{margin:0;font-size:2.25rem;font-weight:800;line-height:1.2;color:#003B71;}
.mv-text{margin:0;font-size:1rem;line-height:1.625;text-align:justify;color:#003B71;}
.mv-values{display:flex;flex-direction:column;gap:0.5rem;margin:0.5rem 0 0;padding:0;list-style:none;}
.mv-value{display:flex;align-items:flex-start;gap:0.5rem;font-size:1rem;font-weight:700;line-height:1.625;color:#E97300;}
.mv-dot{flex-shrink:0;width:0.375rem;height:0.375rem;margin-top:0.5rem;border-radius:9999px;background-color:#E97300;}
.mv-media{display:flex;align-items:stretch;width:100%;}
.mv-media img{display:block;width:100%;height:100%;object-fit:cover;border-radius:0.75rem;}
@media(max-width:992px){
.mv-grid{grid-template-columns:minmax(0,1fr);gap:1.5rem;}
.mv-media img{height:auto;}
}
</style>`;

const ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="14" height="4" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="9" width="14" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="2" y="11" width="12" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="2" y="15" width="14" height="4" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="21" width="14" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="2" y="23" width="11" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="3.5" cy="27.5" r="1" fill="#E97300" fill-opacity="0.8"/>
    <rect x="6" y="27" width="9" height="1" rx="0.5" fill="#E97300" fill-opacity="0.6"/>
    <rect x="19" y="3" width="11" height="22" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="20.5" y="4.5" width="8" height="8" rx="1" fill="#E97300" fill-opacity="0.6"/>
    <circle cx="24.5" cy="8.5" r="2" fill="#f8e7d8"/>
</svg>`;

const block = (title, content) => `
<div class="mv-block">
    <h2 class="mv-title">${title}</h2>
    ${content}
</div>`;

const paragraph = (text) => `<p class="mv-text">${text}</p>`;

const valueItem = (label) => `
<li class="mv-value"><span class="mv-dot"></span><span>${label}</span></li>`;

const valuesBlock = () =>
    block(
        "Valores",
        `${paragraph(VALUES_INTRO)}<ul class="mv-values">${VALUES.map(valueItem).join("")}</ul>`,
    );

const missionVisionSection = () => `
<section class="mv-section">
    <div class="mv-container">
        <div class="mv-grid">
            <div class="flex flex-col gap-4">
                ${SECTIONS.map(({ title, text }) => block(title, paragraph(text))).join("")}
                ${valuesBlock()}
            </div>
            <div class="mv-media">
                <img src="${assetUrl("images/placeholder.svg")}" alt="Misión, Visión y Valores" loading="lazy">
            </div>
        </div>
    </div>
</section>
${STYLES}`;

export const missionVisionBlocks = [
    {
        id: "mission-vision-values",
        label: "Misión, Visión y Valores",
        category: CATEGORY,
        media: ICON,
        content: missionVisionSection(),
    },
];