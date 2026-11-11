import { MAX_COLS } from "./defaults";

const gridRules = Array.from({ length: MAX_COLS }, (_, index) => {
    const cols = index + 1;
    let css = `.ct-cols-${cols}{grid-template-columns:repeat(${cols},minmax(0,1fr));}`;
    if (cols > 1) {
        [2, 3].forEach((width) => {
            css += `.ct-cols-${cols}.ct-first-${width}{grid-template-columns:minmax(0,${width}fr) repeat(${cols - 1},minmax(0,1fr));}`;
        });
    }
    return css;
}).join("\n");

export const CARD_TABLE_STYLES = `<style>
.ct-wrap{width:100%;max-width:1600px;margin:0 auto;display:flex;flex-direction:column;gap:0.75rem;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.ct-title{margin:0 0 0.5rem;font-size:1.6rem;font-weight:800;line-height:1.25;text-align:center;color:#E97300;}
.ct-head-row,.ct-card{display:grid;gap:0.75rem;}
.ct-head-row{padding:0 1.25rem;}
.ct-head{font-size:0.95rem;font-weight:700;letter-spacing:0.01em;}
.ct-card{align-items:stretch;padding:1rem 1.25rem;background-color:#fff;border-radius:1rem;box-shadow:0 2px 10px 0 rgba(15,23,42,0.08);transition:box-shadow 0.25s ease;}
.ct-cell{display:flex;align-items:center;min-height:1.5rem;font-size:0.95rem;font-weight:700;line-height:1.35;overflow-wrap:anywhere;}
.ct-cell+.ct-cell{padding-left:0.75rem;border-left-width:2px;border-left-style:solid;}
.ct-blue{color:#003B71;}
.ct-orange{color:#E97300;}
.ct-cell.ct-blue{border-left-color:#003B71;}
.ct-cell.ct-orange{border-left-color:#E97300;}
.ct-align-left{justify-content:flex-start;text-align:left;}
.ct-align-center{justify-content:center;text-align:center;}
.ct-align-right{justify-content:flex-end;text-align:right;}
.ct-badge{display:inline-block;padding:0.3rem 0.9rem;border-radius:9999px;font-size:0.85rem;font-weight:700;white-space:nowrap;color:#fff;}
.ct-blue .ct-badge{background-color:#003B71;}
.ct-orange .ct-badge{background-color:#E97300;}
.ct-check{display:block;flex-shrink:0;width:1.75rem;height:1.75rem;}
.ct-media{display:block;position:relative;flex:1 1 auto;align-self:stretch;min-width:0;min-height:3rem;}
.ct-media.ct-h-64{align-self:center;height:64px;min-height:0;}
.ct-media.ct-h-96{align-self:center;height:96px;min-height:0;}
.ct-media.ct-h-128{align-self:center;height:128px;min-height:0;}
.ct-media.ct-h-160{align-self:center;height:160px;min-height:0;}
.ct-image{position:absolute;inset:0;display:block;width:100%;height:100%;max-width:100%;border-radius:0.5rem;}
.ct-fit-contain{object-fit:contain;}
.ct-fit-cover{object-fit:cover;}
.ct-align-left .ct-image{object-position:left center;}
.ct-align-center .ct-image{object-position:center;}
.ct-align-right .ct-image{object-position:right center;}
${gridRules}
@media(hover:hover){
.ct-card:hover{box-shadow:0 6px 18px 0 rgba(15,23,42,0.14);}
}
@media(max-width:640px){
.ct-head-row{display:none;}
.ct-wrap .ct-card{grid-template-columns:minmax(0,1fr);gap:0.5rem;}
.ct-wrap .ct-cell{justify-content:space-between;text-align:right;}
.ct-wrap .ct-cell+.ct-cell{padding-left:0;border-left-width:0;}
.ct-cell::before{content:attr(data-label);padding-right:1rem;font-size:0.8rem;font-weight:600;text-align:left;color:#64748b;}
.ct-wrap .ct-cell:first-child{justify-content:flex-start;text-align:left;}
.ct-wrap .ct-cell:first-child::before{display:none;}
.ct-wrap .ct-media{flex:0 0 auto;width:min(60%,12rem);align-self:center;}
.ct-wrap .ct-media:not([class*="ct-h-"]){height:4rem;}
}
@media(prefers-reduced-motion:reduce){
.ct-card{transition:none;}
}
</style>`;