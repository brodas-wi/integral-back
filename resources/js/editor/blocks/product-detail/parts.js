import { assetUrl } from "@/utils/url.js";

export const PLACEHOLDER_IMAGE = assetUrl("images/placeholder.svg");

export const LOREM = "Lorem ipsum dolor sit amet consectetur adipiscing elit.";
export const LOREM_LONG =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const repeat = (count, render) => Array.from({ length: count }, (_, index) => render(index)).join("");

const TEXT_CLASSES = {
    lead: "text-lg font-bold pd-text-primary leading-snug",
    leadPlain: "text-lg pd-text-primary leading-snug",
    body: "text-base pd-text-primary leading-relaxed",
    bodyStrong: "text-base font-semibold pd-text-primary leading-relaxed",
    heading: "text-base font-bold pd-text-primary",
    accent: "text-base font-bold pd-text-orange",
    accentLead: "text-base font-bold pd-text-orange leading-snug",
};

export const text = (variant, content = LOREM_LONG) =>
    `<p class="${TEXT_CLASSES[variant]} m-0">${content}</p>`;

export const highlight = (content) => `<span class="pd-text-orange font-semibold">${content}</span>`;

const bulletItem = () => `
<li class="flex items-start gap-2 text-base pd-text-primary">
    <span class="mt-2 w-1.5 h-1.5 rounded-full pd-dot-primary shrink-0"></span>
    <span>${LOREM}</span>
</li>`;

export const bulletList = (count = 3, label = null) => `
<div class="flex flex-col gap-3">
    ${label ? `<span class="text-base font-bold pd-text-orange tracking-wide">${label}</span>` : ""}
    <ul class="list-none p-0 m-0 flex flex-col gap-3">${repeat(count, bulletItem)}</ul>
</div>`;

const footnote = () =>
    `<p class="text-sm pd-text-muted leading-relaxed text-justify m-0">${LOREM_LONG}</p>`;

export const footnoteGroup = (count = 1) =>
    count ? `<div class="w-full flex flex-col gap-2">${repeat(count, footnote)}</div>` : "";

export const priceBox = () => `
<div class="w-full rounded-xl border-2 pd-box-border px-6 py-4 flex flex-col items-center justify-center gap-1 text-center">
    <span class="text-2xl font-bold pd-text-primary tracking-wide">Invierte desde:</span>
    <span class="text-2xl font-black pd-text-orange">$00.00</span>
</div>`;

const priceBoxRow = () => `
<div class="flex flex-col items-center justify-center gap-1 py-4 px-6">
    <span class="text-lg font-bold pd-text-primary tracking-wide leading-snug">Invierte desde:</span>
    <span class="text-lg font-bold pd-text-primary">Hasta: <span class="pd-text-orange">$00.00</span></span>
</div>`;

export const priceBoxDouble = () => `
<div class="w-full rounded-xl border-2 pd-box-border flex flex-col">
    ${priceBoxRow()}
    <div class="px-6"><div class="w-full h-0.5 pd-box-divider"></div></div>
    ${priceBoxRow()}
</div>`;

export const iconCard = (title = "Lorem ipsum", items = 3) => `
<div class="pd-card items-center">
    <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${PLACEHOLDER_IMAGE}" alt="" class="w-6 h-6 object-contain">
    </div>
    <span class="text-base font-bold pd-text-orange tracking-wide leading-snug w-full">${title}</span>
    <ul class="list-none p-0 m-0 flex flex-col gap-2 w-full">${repeat(items, bulletItem)}</ul>
</div>`;

export const iconCardSimple = (title = "Lorem ipsum") => `
<div class="pd-card-simple">
    <div class="w-14 h-14 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${PLACEHOLDER_IMAGE}" alt="" class="w-7 h-7 object-contain">
    </div>
    <span class="text-base font-bold pd-text-primary tracking-wide">${title}</span>
    <p class="text-base pd-text-primary leading-snug m-0">${LOREM}</p>
</div>`;

export const iconCardRow = (count = 4) =>
    `<div class="pd-cards-row">${repeat(count, () => iconCardSimple())}</div>`;

export const ctaButton = (label = "Adquiere tu servicio") =>
    `<a href="#" class="pd-cta inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center tracking-wide max-w-full transition-colors no-underline">${label}</a>`;

export const productTitle = (title = "Nombre del Producto") =>
    `<h2 class="text-4xl font-black pd-text-orange break-words leading-tight text-center w-full">${title}</h2>`;

export const twoLineTitle = (line1 = "Línea uno", line2 = "Línea dos") => `
<h2 class="text-4xl font-black leading-tight break-words m-0">
    <span class="block pd-text-primary">${line1}</span>
    <span class="block pd-text-orange">${line2}</span>
</h2>`;

export const coverageTable = (theme) =>
    `<div data-gjs-type="table-component" data-table-theme="${theme}" data-coverage-table-init="1"></div>`;

const emptyCell = (align) => ({
    text: "",
    align,
    isHeader: false,
    colspan: 1,
    rowspan: 1,
    image: null,
});

export const COVERAGE_TABLE_DATA = {
    title: "Coberturas",
    cols: 3,
    headers: [
        { text: "Coberturas", align: "left" },
        { text: "Cantidad", align: "center" },
        { text: "Límite (US$)", align: "center" },
    ],
    rows: Array.from({ length: 5 }, () => ["left", "center", "center"].map(emptyCell)),
};