const CATEGORY = "Columnas";
const BLUE = "#003B71";

const LAYOUTS = [
    { id: "columns-1", label: "1 Columna", variant: "1", ratios: [1] },
    { id: "columns-2", label: "2 Columnas", variant: "2", ratios: [1, 1] },
    { id: "columns-3", label: "3 Columnas", variant: "3", ratios: [1, 1, 1] },
    { id: "columns-4", label: "4 Columnas", variant: "4", ratios: [1, 1, 1, 1] },
    { id: "columns-1-3", label: "1/3 — 2/3", variant: "1-2", ratios: [1, 2] },
    { id: "columns-3-1", label: "2/3 — 1/3", variant: "2-1", ratios: [2, 1] },
    { id: "columns-1-2", label: "1/4 — 1/4 — 1/2", variant: "1-1-2", ratios: [1, 1, 2] },
    { id: "columns-2-1", label: "1/2 — 1/4 — 1/4", variant: "2-1-1", ratios: [2, 1, 1] },
];

const CL_CSS = `
.cl-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;scroll-margin-top:140px;}
.cl-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.cl-grid{display:grid;gap:clamp(1rem,2vw,1.5rem);}
.cl-grid--1{grid-template-columns:minmax(0,1fr);}
.cl-grid--2{grid-template-columns:repeat(2,minmax(0,1fr));}
.cl-grid--3{grid-template-columns:repeat(3,minmax(0,1fr));}
.cl-grid--4{grid-template-columns:repeat(4,minmax(0,1fr));}
.cl-grid--1-2{grid-template-columns:minmax(0,1fr) minmax(0,2fr);}
.cl-grid--2-1{grid-template-columns:minmax(0,2fr) minmax(0,1fr);}
.cl-grid--1-1-2{grid-template-columns:minmax(0,1fr) minmax(0,1fr) minmax(0,2fr);}
.cl-grid--2-1-1{grid-template-columns:minmax(0,2fr) minmax(0,1fr) minmax(0,1fr);}
.cl-cell{display:flex;flex-direction:column;gap:1rem;min-width:0;min-height:3.75rem;}
@media(max-width:992px){
.cl-section{scroll-margin-top:80px;}
.cl-grid--4{grid-template-columns:repeat(2,minmax(0,1fr));}
.cl-grid--2,.cl-grid--3,.cl-grid--1-2,.cl-grid--2-1,.cl-grid--1-1-2,.cl-grid--2-1-1{grid-template-columns:minmax(0,1fr);}
}
@media(max-width:575px){
.cl-grid--4{grid-template-columns:minmax(0,1fr);}
}
`;

const STYLES = `<style>${CL_CSS}</style>`;

function icon(ratios) {
    const gap = 2;
    const unit = (28 - gap * (ratios.length - 1)) / ratios.reduce((sum, ratio) => sum + ratio, 0);
    let x = 2;

    const columns = ratios
        .map((ratio) => {
            const width = ratio * unit;
            const rect = `<rect x="${x.toFixed(2)}" y="5" width="${width.toFixed(2)}" height="22" rx="2" fill="${BLUE}" fill-opacity="0.15" stroke="${BLUE}" stroke-width="1"/>`;
            x += width + gap;
            return rect;
        })
        .join("");

    return `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${columns}</svg>`;
}

const CELL = `<div class="cl-cell" data-gjs-name="Columna"></div>`;

function build(variant, count) {
    return `<section class="cl-section" data-gjs-name="Sección de columnas"><div class="cl-container" data-gjs-name="Contenedor"><div class="cl-grid cl-grid--${variant}" data-gjs-name="Cuadrícula">${CELL.repeat(count)}</div></div></section>${STYLES}`;
}

export const columnBlocks = LAYOUTS.map(({ id, label, variant, ratios }) => ({
    id,
    label,
    category: CATEGORY,
    media: icon(ratios),
    content: build(variant, ratios.length),
}));