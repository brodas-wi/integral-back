const TOKENS = {
    "--nb-blue": "#003B71",
    "--nb-navy": "#14243D",
    "--nb-orange": "#E97300",
    "--nb-orange-dark": "#C96200",
    "--nb-max": "1600px",
    "--nb-gutter": "clamp(1.25rem,5vw,4rem)",
    "--nb-logo-pad": "clamp(1rem,2vw,1.5rem)",
    "--nb-logo-col": "200px",
    "--nb-mobile-gutter": "1.25rem",
};

const resolveTokens = (css) =>
    css.replace(/var\((--nb-[a-z-]+)\)/g, (match, name) => TOKENS[name] ?? match);

export const NAVBAR_STYLES = resolveTokens(`<style>
.nb-wrapper{--nb-blue:#003B71;--nb-navy:#14243D;--nb-orange:#E97300;--nb-orange-dark:#C96200;--nb-max:1600px;--nb-gutter:clamp(1.25rem,5vw,4rem);--nb-logo-pad:clamp(1rem,2vw,1.5rem);--nb-logo-col:200px;--nb-mobile-gutter:1.25rem;--nb-offset:64px;position:fixed;top:0;left:0;right:0;z-index:1000;width:100%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,0.08);font-family:'Poppins',sans-serif;}
.nb-wrapper *,.nb-wrapper *::before,.nb-wrapper *::after{box-sizing:border-box;}
.nb-top-inner,.nb-bottom-inner,.nb-mobile-bar-inner{width:100%;max-width:var(--nb-max);margin:0 auto;}
.nb-top{position:relative;background:#fff;}
.nb-top::before{content:"";position:absolute;inset:0 0 0 calc(max(0px,(100% - var(--nb-max))/2) + var(--nb-logo-col));background:var(--nb-blue);border-radius:0 0 0 16px;}
.nb-top-inner{position:relative;display:flex;align-items:stretch;}
.nb-top-left{display:flex;align-items:center;flex:0 0 var(--nb-logo-col);padding:0.75rem 1rem 0.75rem var(--nb-logo-pad);}
.nb-top-right{display:flex;align-items:center;justify-content:space-between;gap:1rem;flex:1;min-width:0;padding:0.75rem var(--nb-gutter) 0.75rem 2rem;}
.nb-top-actions{display:flex;align-items:center;flex-wrap:wrap;gap:0.75rem;}
.nb-top-extra{display:flex;align-items:center;gap:0.75rem;flex-shrink:0;}
.nb-logo-link{display:flex;align-items:center;text-decoration:none;}
.nb-logo-link img{display:block;height:40px;width:auto;max-width:100%;}
.nb-logo-text{font-size:1.125rem;font-weight:800;color:var(--nb-blue);}
.nb-top-action{display:inline-flex;align-items:center;gap:0.5rem;padding:0.3rem 1rem;border:1.5px solid #fff;border-radius:9999px;background:transparent;color:#fff;font-size:0.75rem;font-weight:600;text-decoration:none;white-space:nowrap;transition:background 0.15s,color 0.15s;}
.nb-top-action:hover{background:#fff;color:var(--nb-blue);}
.nb-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.375rem;flex-shrink:0;padding:0.5rem 1.5rem;border:1.5px solid transparent;border-radius:9999px;font-family:inherit;font-size:0.875rem;font-weight:700;line-height:1.25;text-align:center;text-decoration:none;white-space:nowrap;cursor:pointer;transition:background 0.15s,color 0.15s,border-color 0.15s,opacity 0.15s;}
.nb-btn-orange{background:var(--nb-orange);border-color:var(--nb-orange);color:#fff;}
.nb-btn-orange:hover{background:var(--nb-orange-dark);border-color:var(--nb-orange-dark);}
.nb-btn-blue{background:var(--nb-blue);border-color:var(--nb-blue);color:#fff;}
.nb-btn-blue:hover{opacity:0.88;}
.nb-btn-white{background:#fff;border-color:#fff;color:var(--nb-blue);}
.nb-btn-white:hover{background:#f0f4f8;border-color:#f0f4f8;}
.nb-bottom .nb-btn-white,.nb-bottom .nb-btn-white:hover{border-color:var(--nb-blue);}
.nb-top .nb-btn-blue,.nb-mobile-actions .nb-btn-blue{border-color:#fff;}
.nb-bottom-buttons{display:flex;align-items:center;gap:0.75rem;flex-shrink:0;}
.nb-cta{flex-direction:column;gap:0;white-space:normal;}
.nb-cta-line2{font-size:0.6875rem;font-weight:500;opacity:0.9;}
.nb-icon-btn{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:2.25rem;height:2.25rem;border:1.5px solid transparent;border-radius:9999px;background:#fff;color:var(--nb-orange);text-decoration:none;transition:border-color 0.15s;}
.nb-icon-btn:hover{border-color:var(--nb-orange);}
.nb-icon-btn i{font-size:1.25rem;line-height:1;}
.nb-icon-btn img{display:block;width:1.25rem;height:1.25rem;object-fit:contain;pointer-events:none;}
.nb-bottom{background:#fff;}
.nb-bottom-inner{display:flex;align-items:center;justify-content:flex-end;gap:1.5rem;padding:0.625rem var(--nb-gutter) 0.625rem var(--nb-logo-pad);}
.nb-nav-list{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:0.25rem;min-width:0;margin:0 0 0 auto;padding:0;list-style:none;}
.nb-nav-item{position:static;}
.nb-nav-link{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1.125rem;border:0;background:none;color:var(--nb-navy);font-family:inherit;font-size:0.9375rem;font-weight:600;text-decoration:none;white-space:nowrap;cursor:pointer;transition:color 0.15s;}
.nb-nav-link:hover,.nb-nav-item.nb-open>.nb-nav-link{color:var(--nb-orange);}
.nb-mega{display:none;position:absolute;top:100%;left:0;right:0;z-index:200;padding:1rem 0;background:#fff;border-top:2px solid var(--nb-orange);border-bottom:2px solid var(--nb-orange);box-shadow:0 8px 32px rgba(0,0,0,0.1);}
.nb-nav-item.nb-open>.nb-mega{display:block;}
.nb-mega-grid{display:grid;gap:2rem;max-width:var(--nb-max);margin:0 auto;padding:0 var(--nb-gutter);}
.nb-mega-col{display:flex;flex-direction:column;gap:0.5rem;min-width:0;padding-right:1.5rem;border-right:2px solid var(--nb-orange);}
.nb-badge{display:inline-flex;align-items:center;justify-content:center;padding:0.5rem 1.25rem;border-radius:9999px;font-size:0.875rem;font-weight:700;text-align:center;cursor:default;}
.nb-badge-blue{background:var(--nb-blue);color:#fff;}
.nb-badge-orange{background:var(--nb-orange);color:#fff;}
.nb-mega-item{display:flex;flex-direction:column;gap:0.125rem;padding:0.375rem 0;border-bottom:1px solid transparent;text-decoration:none;transition:border-color 0.15s;}
.nb-mega-item:hover{border-bottom-color:#e2e8f0;}
.nb-mega-item-title{font-size:0.8125rem;font-weight:700;line-height:1.3;color:var(--nb-blue);}
.nb-mega-item-desc{font-size:0.8125rem;font-weight:400;line-height:1.4;color:var(--nb-orange);}
.nb-mega-cta-col{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.25rem;padding:1rem;}
.nb-mega-cta-text{margin:0;font-size:1.125rem;font-weight:800;line-height:1.3;text-align:center;text-transform:uppercase;}
.nb-mega-cta-buttons{display:flex;flex-direction:column;align-items:center;gap:0.625rem;width:100%;}
.nb-mobile-bar{display:none;background:#fff;}
.nb-mobile-bar-inner{display:flex;align-items:center;justify-content:space-between;padding:0.75rem var(--nb-mobile-gutter);}
.nb-mobile-bar .nb-logo-link img{height:36px;}
.nb-mobile-bar .nb-icon-btn{box-shadow:0 2px 8px rgba(0,59,113,0.18);}
.nb-mobile-bar-actions{display:flex;align-items:center;gap:0.75rem;}
.nb-hamburger{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;flex-shrink:0;width:2.5rem;height:2.5rem;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none;cursor:pointer;}
.nb-hamburger span{display:block;width:22px;height:2px;border-radius:2px;background:#003B71;}
.nb-hamburger i{font-size:1.75rem;line-height:1;color:#003B71;pointer-events:none;}
.nb-hamburger img{display:block;width:1.75rem;height:1.75rem;object-fit:contain;pointer-events:none;}
.nb-mobile-menu{display:none;position:absolute;top:100%;left:0;right:0;flex-direction:column;height:calc(100dvh - var(--nb-offset));padding:0.5rem var(--nb-mobile-gutter) 2rem;overflow-y:auto;background:var(--nb-navy);color:#fff;-webkit-overflow-scrolling:touch;scrollbar-width:thin;scrollbar-color:rgba(255,255,255,0.3) transparent;}
.nb-mobile-link{display:flex;align-items:center;justify-content:space-between;gap:0.5rem;width:100%;padding:1rem 0.25rem;border:0;border-bottom:1px solid rgba(255,255,255,0.15);background:none;color:#fff;font-family:inherit;font-size:1rem;font-weight:600;text-align:left;text-decoration:none;cursor:pointer;transition:color 0.15s;}
.nb-mobile-link:hover,.nb-mobile-item.nb-open>.nb-mobile-link{color:var(--nb-orange);}
.nb-mobile-link i{color:var(--nb-orange);font-size:1.25rem;transition:transform 0.2s;}
.nb-mobile-item.nb-open>.nb-mobile-link i{transform:rotate(180deg);}
.nb-mobile-link-content{display:flex;align-items:center;gap:0.5rem;}
.nb-mobile-link-content i{font-size:1.125rem;transform:none;}
.nb-mobile-submenu{display:none;flex-direction:column;gap:1.25rem;margin:0.75rem 0.25rem 1rem 0.5rem;padding:0.25rem 0.5rem 0.25rem 0.5rem;}
.nb-mobile-item.nb-open>.nb-mobile-submenu{display:flex;}
.nb-mobile-sub-col{display:flex;flex-direction:column;gap:0.75rem;}
.nb-mobile-sub-badge{font-size:0.8125rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:var(--nb-orange);}
.nb-mobile-sub-link{display:flex;flex-direction:column;gap:0.125rem;margin:0 -0.5rem;padding:0.375rem 0.5rem;border-radius:0.5rem;text-decoration:none;transition:background 0.15s;}
.nb-mobile-sub-link:hover,.nb-mobile-sub-link:focus-visible{background:rgba(255,255,255,0.08);}
.nb-mobile-sub-link:hover .nb-mobile-sub-title,.nb-mobile-sub-link:focus-visible .nb-mobile-sub-title{color:var(--nb-orange);}
.nb-mobile-sub-title{font-size:0.8125rem;font-weight:700;line-height:1.3;color:#fff;transition:color 0.15s;}
.nb-mobile-sub-desc{font-size:0.8125rem;line-height:1.4;color:rgba(255,255,255,0.75);}
.nb-mobile-actions{display:flex;flex-direction:column;gap:0.75rem;padding:1.5rem 0 1rem;}
.nb-mobile-actions .nb-btn{width:100%;padding:0.75rem 1.5rem;}
.nb-mobile-contact{display:flex;flex-direction:column;gap:0.875rem;padding:0.5rem 0.25rem;}
.nb-mobile-contact-link{display:inline-flex;align-items:center;gap:0.5rem;color:rgba(255,255,255,0.8);font-size:0.875rem;font-weight:600;text-decoration:none;transition:color 0.15s;}
.nb-mobile-contact-link:hover{color:#fff;}
@media(max-width:1200px){
.nb-nav-link{padding:0.5rem 0.75rem;font-size:0.875rem;}
.nb-top-action{padding:0.3rem 0.75rem;}
}
@media(max-width:992px){
.nb-top,.nb-bottom{display:none;}
.nb-mobile-bar{display:block;}
.nb-mobile-menu.nb-open{display:flex;}
}
</style>`);