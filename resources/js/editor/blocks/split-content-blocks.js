const iconRight = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="13" height="24" rx="2" fill="#e0e7ef"/>
    <rect x="17" y="4" width="13" height="24" rx="2" fill="#003B71" fill-opacity="0.15"/>
    <rect x="19" y="8" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="19" y="12" width="7" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.4"/>
    <rect x="19" y="15" width="8" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="20" cy="20" r="1.5" fill="#E97300"/>
    <rect x="23" y="19.2" width="7" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <circle cx="20" cy="23" r="1.5" fill="#E97300"/>
    <rect x="23" y="22.2" width="5" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
</svg>`;

const iconLeft = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="17" y="4" width="13" height="24" rx="2" fill="#e0e7ef"/>
    <rect x="2" y="4" width="13" height="24" rx="2" fill="#003B71" fill-opacity="0.15"/>
    <rect x="4" y="8" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="12" width="7" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="15" width="8" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="5" cy="20" r="1.5" fill="#E97300"/>
    <rect x="8" y="19.2" width="7" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <circle cx="5" cy="23" r="1.5" fill="#E97300"/>
    <rect x="8" y="22.2" width="5" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
</svg>`;

const iconRightBlue = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="4" width="13" height="24" rx="2" fill="rgba(255,255,255,0.1)"/>
    <rect x="17" y="4" width="13" height="24" rx="2" fill="rgba(255,255,255,0.18)"/>
    <rect x="19" y="8" width="9" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="12" width="7" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <rect x="19" y="15" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <circle cx="20" cy="20" r="1.5" fill="#E97300"/>
    <rect x="23" y="19.2" width="7" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <circle cx="20" cy="23" r="1.5" fill="#E97300"/>
    <rect x="23" y="22.2" width="5" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
</svg>`;

const iconLeftBlue = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="17" y="4" width="13" height="24" rx="2" fill="rgba(255,255,255,0.1)"/>
    <rect x="2" y="4" width="13" height="24" rx="2" fill="rgba(255,255,255,0.18)"/>
    <rect x="4" y="8" width="9" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="4" y="12" width="7" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <rect x="4" y="15" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <circle cx="5" cy="20" r="1.5" fill="#E97300"/>
    <rect x="8" y="19.2" width="7" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <circle cx="5" cy="23" r="1.5" fill="#E97300"/>
    <rect x="8" y="22.2" width="5" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
</svg>`;

const iconListItem = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="7" cy="10" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="8.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <circle cx="7" cy="22" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="20.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
</svg>`;

const LIST_ITEM = (variant) => {
    const isLight = variant === "light";
    const iconColor = isLight ? "text-[#003B71]" : "text-white";
    const textColor = isLight ? "text-[#003B71]" : "text-white";
    return `
<div class="sc-list-item flex items-center gap-4">
    <div class="bg-[#E97300] w-11 h-11 rounded-full flex items-center justify-center shrink-0">
        <i class="ri-shield-check-line text-xl ${iconColor}"></i>
    </div>
    <p class="${textColor} text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`;
};

const CONTENT_COL = (variant) => {
    const isLight = variant === "light";
    const titleColor = isLight ? "text-[#003B71]" : "text-white";
    const textColor = isLight ? "text-[#003B71]" : "text-white";
    return `
<div class="flex flex-col gap-4">
    <h2 class="${titleColor} text-4xl font-bold leading-tight">Lorem ipsum dolor sit amet</h2>
    <p class="${textColor} text-base leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-4">
        ${LIST_ITEM(variant)}
        ${LIST_ITEM(variant)}
        ${LIST_ITEM(variant)}
        ${LIST_ITEM(variant)}
    </div>
</div>`;
};

const IMAGE_COL = () => `
<div class="sc-img-col w-full rounded-2xl overflow-hidden">
    <img src="/images/placeholder.svg"
         alt="Imagen de sección"
         class="w-full h-full object-cover block"
         style="min-height:320px;">
</div>`;

const SPLIT_STYLES = `
<style>
.sc-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.sc-list-item{min-height:44px;}
@media(max-width:768px){
    .sc-grid{grid-template-columns:1fr;gap:2rem;}
    .sc-img-first{order:-1;}
}
</style>`;

const buildSection = (imgRight, variant) => {
    const content = CONTENT_COL(variant);
    const image = IMAGE_COL();
    const bgClass = variant === "dark" ? "bg-[#003B71]" : "bg-white";
    return `
<section class="w-full ${bgClass} py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="sc-grid">
            ${
                imgRight
                    ? `<div>${content}</div><div class="sc-img-first">${image}</div>`
                    : `<div class="sc-img-first">${image}</div><div>${content}</div>`
            }
        </div>
    </div>
</section>
${SPLIT_STYLES}`;
};

export const splitContentBlocks = [
    {
        id: "split-content-light-img-right",
        label: "Contenido claro - imagen derecha",
        category: "Contenido",
        media: iconRight,
        content: buildSection(true, "light"),
    },
    {
        id: "split-content-light-img-left",
        label: "Contenido claro - imagen izquierda",
        category: "Contenido",
        media: iconLeft,
        content: buildSection(false, "light"),
    },
    {
        id: "split-content-dark-img-right",
        label: "Contenido azul - imagen derecha",
        category: "Contenido",
        media: iconRightBlue,
        content: buildSection(true, "dark"),
    },
    {
        id: "split-content-dark-img-left",
        label: "Contenido azul - imagen izquierda",
        category: "Contenido",
        media: iconLeftBlue,
        content: buildSection(false, "dark"),
    },
    {
        id: "split-list-item",
        label: "Item de lista con badge",
        category: "Contenido",
        media: iconListItem,
        content: `${LIST_ITEM("light")}${SPLIT_STYLES}`,
    },
    {
        id: "split-list-group",
        label: "Lista con badges",
        category: "Contenido",
        media: iconListItem,
        content: `
<div class="flex flex-col gap-4">
    ${LIST_ITEM("light")}
    ${LIST_ITEM("light")}
    ${LIST_ITEM("light")}
</div>
${SPLIT_STYLES}`,
    },
];
