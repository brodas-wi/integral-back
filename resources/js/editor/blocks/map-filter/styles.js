export const STATIC_CSS = `
.mp-section{width:100%;box-sizing:border-box;background-color:#fff;font-family:'Poppins',sans-serif;}
.mp-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(2rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(2rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.mp-stats{margin:0 0 1.75rem;font-size:clamp(1rem,1.6vw,1.125rem);font-weight:700;line-height:1.5;color:#003B71;}
.mp-title{margin:0 0 1.5rem;font-size:clamp(1.375rem,2.4vw,1.75rem);font-weight:800;line-height:1.25;color:#E97300;}
.mp-filters{position:relative;z-index:30;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.5rem clamp(1.5rem,3vw,2.5rem);margin:0 0 2rem;}
.mp-filter{position:relative;min-width:0;}
.mp-filter-btn{display:flex;align-items:center;justify-content:space-between;width:100%;box-sizing:border-box;margin:0;border:0;border-bottom:2px solid #E97300;background-color:transparent;padding-top:0.5rem;padding-right:0.25rem;padding-bottom:0.625rem;padding-left:0.25rem;font-family:inherit;cursor:pointer;}
.mp-filter-btn:focus-visible{outline:2px solid #E97300;outline-offset:2px;}
.mp-filter-btn:disabled{opacity:0.5;cursor:default;}
.mp-filter-label{min-width:0;overflow:hidden;text-align:left;text-overflow:ellipsis;white-space:nowrap;font-size:0.9375rem;font-weight:700;color:#003B71;}
.mp-filter-arrow{flex-shrink:0;width:0;height:0;margin-left:0.75rem;border-left:0.4375rem solid transparent;border-right:0.4375rem solid transparent;border-top:0.5625rem solid #003B71;transition:transform 0.2s ease;}
.mp-filter.mp-filter-open .mp-filter-arrow{transform:rotate(180deg);}
.mp-filter-dropdown{display:none;position:absolute;top:calc(100% + 0.625rem);left:0;right:0;z-index:40;box-sizing:border-box;max-height:260px;overflow-y:auto;background-color:#fff;border-radius:0.5rem;box-shadow:0 14px 36px rgba(0,0,0,0.2);}
.mp-filter.mp-filter-open .mp-filter-dropdown{display:block;}
.mp-map-wrapper{position:relative;z-index:0;isolation:isolate;width:100%;height:clamp(320px,42vw,520px);overflow:hidden;border-radius:0.75rem;}
.mp-map{width:100%;height:100%;}
.mp-map-overlay{position:absolute;top:0;right:0;bottom:0;left:0;z-index:20;background-color:rgba(0,59,113,0.4);opacity:0;pointer-events:none;transition:opacity 0.2s ease;}
.mp-map-overlay.mp-overlay-active{opacity:1;}
@media(max-width:992px){
.mp-filters{grid-template-columns:minmax(0,1fr);gap:1.25rem;}
}
@media(prefers-reduced-motion:reduce){
.mp-filter-arrow,.mp-map-overlay{transition:none;}
}
`;

export const DYNAMIC_CSS =
    ".mp-num{color:#E97300;}" +
    ".mp-filter-option{display:block;width:100%;box-sizing:border-box;margin:0;border:0;border-bottom:2px solid #E97300;background-color:transparent;padding-top:0.75rem;padding-right:1rem;padding-bottom:0.75rem;padding-left:1rem;text-align:center;font-family:'Poppins',sans-serif;font-size:0.875rem;font-weight:700;color:#003B71;cursor:pointer;transition:background-color 0.15s;}" +
    ".mp-filter-option:last-child{border-bottom-width:0;}" +
    ".mp-filter-option:hover,.mp-filter-option.mp-selected{background-color:#F4F6F9;}" +
    ".mp-filter-option:disabled{opacity:0.5;cursor:default;pointer-events:none;}" +
    ".mp-pin{background-color:transparent !important;border-width:0 !important;}" +
    ".mp-popup{min-width:180px;font-family:'Poppins',sans-serif;}" +
    ".mp-popup-name{margin:0 0 0.375rem;font-size:0.875rem;font-weight:700;color:#003B71;}" +
    ".mp-popup-line{display:flex;align-items:flex-start;gap:0.375rem;margin:0 0 0.25rem;font-size:0.8125rem;line-height:1.4;color:#475569;}" +
    ".mp-popup-line:last-child{margin-bottom:0;}" +
    ".mp-popup-line i{margin-top:0.125rem;color:#E97300;}";

export const MAP_STYLES = `<style>${STATIC_CSS}</style>`;