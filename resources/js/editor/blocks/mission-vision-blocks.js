import { assetUrl } from "@/utils/url.js";

const MISSION_VISION_STYLES = `
<style>
.mv-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-items:start;}
@media(max-width:992px){.mv-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`;

const MISSION_VISION_BULLET = `
<li class="flex items-start gap-2 text-base font-bold text-[#E97300] leading-relaxed">
    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#E97300] shrink-0"></span>
    <span>Responsabilidad</span>
</li>`;

const iconMissionVision = `<svg viewBox="0 0 32 32" width="32" height="32">
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

export const missionVisionBlocks = [
    {
        id: "mission-vision-values",
        label: "Misión, Visión y Valores",
        category: "Institucional",
        media: iconMissionVision,
        content: `
<section class="w-full bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-12">
    <div class="mv-grid">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <h2 class="text-4xl font-extrabold text-[#003B71]">Misión</h2>
                <p class="text-base text-[#003B71] leading-relaxed text-justify">"Proveemos la mejor experiencia a los empresarios de la micro y pequeña empresa, sus familiares y sus empleados, acompañándolos en su desarrollo con productos y servicios financieros especializados e innovadores adaptados a sus necesidades".</p>
            </div>
            <div class="flex flex-col gap-2">
                <h2 class="text-4xl font-extrabold text-[#003B71]">Visión</h2>
                <p class="text-base text-[#003B71] leading-relaxed text-justify">"Ser el banco pionero de la revolución financiera digital para los empresarios de la micro y pequeña empresa; y que mejor comprende y sirve sus necesidades de desarrollo a través de un ecosistema de productos y servicios integrales e innovadores.".</p>
            </div>
            <div class="flex flex-col gap-2">
                <h2 class="text-4xl font-extrabold text-[#003B71]">Valores</h2>
                <p class="text-base text-[#003B71] leading-relaxed text-justify">"Cada día la cultura Integral se está fortaleciendo, todos los que pertenecemos a esta organización compartimos y vivimos los valores"</p>
                <ul class="list-none p-0 mt-2 flex flex-col gap-2">
                    ${MISSION_VISION_BULLET}
                    <li class="flex items-start gap-2 text-base font-bold text-[#E97300] leading-relaxed">
                        <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#E97300] shrink-0"></span>
                        <span>Compromiso social</span>
                    </li>
                    <li class="flex items-start gap-2 text-base font-bold text-[#E97300] leading-relaxed">
                        <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#E97300] shrink-0"></span>
                        <span>Integridad</span>
                    </li>
                    <li class="flex items-start gap-2 text-base font-bold text-[#E97300] leading-relaxed">
                        <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#E97300] shrink-0"></span>
                        <span>Excelencia</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-full h-full flex items-stretch">
            <img src="${assetUrl("images/placeholder.svg")}" alt="Misión, Visión y Valores" class="w-full h-full object-cover rounded-xl">
        </div>
    </div>
</section>
${MISSION_VISION_STYLES}`,
    },
];