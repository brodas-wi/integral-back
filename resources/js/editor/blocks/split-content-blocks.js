import { assetUrl } from "@/utils/url.js";

const THEMES = {
    light: {
        sectionClass: "sc-light",
        text: "text-[#003B71]",
        badge: "bg-[#003B71] text-white",
        titleMain: "text-[#003B71]",
        icon: {
            background: "#f8f9fa",
            imagePanel: "#e0e7ef",
            textPanel: "#003B71",
            textPanelOpacity: 0.15,
            title: "#003B71",
            titleOpacity: 0.7,
            line: "#003B71",
            lineOpacity: 0.4,
            accentLine: "#E97300",
            accentLineOpacity: 0.5,
        },
    },
    dark: {
        sectionClass: "sc-dark",
        text: "text-white",
        badge: "bg-white text-[#003B71]",
        titleMain: "text-white",
        icon: {
            background: "#003B71",
            imagePanel: "#ffffff",
            textPanel: "#ffffff",
            textPanelOpacity: 0.18,
            title: "#ffffff",
            titleOpacity: 0.8,
            line: "#ffffff",
            lineOpacity: 0.4,
            accentLine: "#ffffff",
            accentLineOpacity: 0.4,
        },
    },
};

const sectionIcon = (variant, imageRight) => {
    const c = THEMES[variant].icon;
    const imageX = imageRight ? 2 : 17;
    const panelX = imageRight ? 17 : 2;
    const x = panelX + 2;
    const imageOpacity = variant === "dark" ? 0.1 : 1;

    return `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="${c.background}" rx="2"/>
    <rect x="${imageX}" y="4" width="13" height="24" rx="2" fill="${c.imagePanel}" fill-opacity="${imageOpacity}"/>
    <rect x="${panelX}" y="4" width="13" height="24" rx="2" fill="${c.textPanel}" fill-opacity="${c.textPanelOpacity}"/>
    <rect x="${x}" y="8" width="9" height="2" rx="1" fill="${c.title}" fill-opacity="${c.titleOpacity}"/>
    <rect x="${x}" y="12" width="7" height="1.5" rx="0.75" fill="${c.line}" fill-opacity="${c.lineOpacity}"/>
    <rect x="${x}" y="15" width="8" height="1.5" rx="0.75" fill="${c.line}" fill-opacity="${c.lineOpacity}"/>
    <circle cx="${x + 1}" cy="20" r="1.5" fill="#E97300"/>
    <rect x="${x + 4}" y="19.2" width="7" height="1.5" rx="0.75" fill="${c.accentLine}" fill-opacity="${c.accentLineOpacity}"/>
    <circle cx="${x + 1}" cy="23" r="1.5" fill="#E97300"/>
    <rect x="${x + 4}" y="22.2" width="5" height="1.5" rx="0.75" fill="${c.accentLine}" fill-opacity="${c.accentLineOpacity}"/>
</svg>`;
};

const LIST_ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="7" cy="10" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="8.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <circle cx="7" cy="22" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="20.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
</svg>`;

const LIST_ITEM_COUNT = 4;

const listItem = (variant) => `
<div class="flex items-center gap-3 min-h-[44px]">
    <div class="bg-[#E97300] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
        <i class="ri-shield-check-line text-lg text-white"></i>
    </div>
    <p class="${THEMES[variant].text} text-base font-bold leading-snug m-0">Lorem ipsum dolor sit amet consectetur</p>
</div>`;

const contentCol = (variant) => {
    const theme = THEMES[variant];

    return `
<div class="sc-col flex flex-col gap-4">
    <h2 class="text-4xl font-bold leading-tight flex flex-wrap items-center gap-2 m-0">
        <span class="${theme.badge} text-3xl font-bold px-3 py-1 rounded-lg leading-tight">Mi</span>
        <span class="${theme.titleMain}">Banca</span>
        <span class="text-[#E97300]">Integral</span>
    </h2>
    <p class="${theme.text} text-base leading-relaxed text-justify m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-3">${listItem(variant).repeat(LIST_ITEM_COUNT)}</div>
</div>`;
};

const IMAGE_COL = `
<div class="sc-col">
    <div class="sc-img-wrap">
        <img src="${assetUrl("images/placeholder.svg")}" alt="Imagen de sección" class="sc-img">
    </div>
</div>`;

const SECTION_STYLES = `
<style>
.sc-section{width:100%;box-sizing:border-box;}
.sc-light{background-color:#fff;}
.sc-dark{background-color:#003B71;}
.sc-container{width:100%;max-width:1600px;margin:0 auto;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;}
.sc-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:3rem;align-items:center;}
.sc-col{min-width:0;}
.sc-img-wrap{width:100%;border-radius:1rem;overflow:hidden;}
.sc-img{display:block;width:100%;min-height:320px;max-height:480px;object-fit:cover;}
@media(max-width:992px){
.sc-grid{grid-template-columns:minmax(0,1fr);gap:2rem;}
}
</style>`;

const buildSection = (variant, imageRight) => {
    const cols = imageRight ? `${contentCol(variant)}${IMAGE_COL}` : `${IMAGE_COL}${contentCol(variant)}`;

    return `<section class="sc-section ${THEMES[variant].sectionClass}">
    <div class="sc-container sc-grid">${cols}</div>
</section>
${SECTION_STYLES}`;
};

const sectionBlock = ({ id, label, variant, imageRight }) => ({
    id,
    label,
    category: "Contenido",
    media: sectionIcon(variant, imageRight),
    content: buildSection(variant, imageRight),
});

const itemBlock = ({ id, label, content }) => ({
    id,
    label,
    category: "Contenido",
    media: LIST_ICON,
    content,
});

export const splitContentBlocks = [
    sectionBlock({
        id: "split-content-light-img-right",
        label: "Sección: claro + img. derecha",
        variant: "light",
        imageRight: true,
    }),
    sectionBlock({
        id: "split-content-light-img-left",
        label: "Sección: claro + img. izquierda",
        variant: "light",
        imageRight: false,
    }),
    sectionBlock({
        id: "split-content-dark-img-right",
        label: "Sección: azul + img. derecha",
        variant: "dark",
        imageRight: true,
    }),
    sectionBlock({
        id: "split-content-dark-img-left",
        label: "Sección: azul + img. izquierda",
        variant: "dark",
        imageRight: false,
    }),
    itemBlock({
        id: "split-list-item",
        label: "Ítem: lista con badge",
        content: listItem("light"),
    }),
    itemBlock({
        id: "split-list-group",
        label: "Ítem: grupo de listas",
        content: `<div class="flex flex-col gap-4">${listItem("light").repeat(3)}</div>`,
    }),
];