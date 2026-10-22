export const FOOTER_STYLES = `<style>
.ft-wrapper{width:100%;background-color:#003B71;font-family:'Poppins',sans-serif;box-sizing:border-box;}
.ft-inner{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:2.5rem 2rem;align-items:start;width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(2rem,4vw,3rem);padding-bottom:clamp(1.5rem,3vw,2rem);padding-left:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);}
.ft-logo-col{min-width:0;}
.ft-logo-col img{display:block;width:100%;max-width:160px;height:auto;}
.ft-logo-text{font-size:1.25rem;font-weight:800;color:#fff;}
.ft-section{min-width:0;}
.ft-section-title{margin:0 0 0.875rem;padding:0;font-size:0.9375rem;font-weight:700;color:#fff;}
.ft-links{display:flex;flex-direction:column;gap:0.5rem;margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:1.125rem;list-style:disc;}
.ft-links li::marker{color:#fff;}
.ft-links li:hover::marker{color:#E97300;}
.ft-link,.ft-text{display:flex;align-items:center;gap:0.5rem;font-size:0.875rem;line-height:1.4;color:#fff;text-decoration:none;overflow-wrap:anywhere;}
.ft-link{transition:color 0.2s ease;}
.ft-link i,.ft-text i{flex-shrink:0;font-size:1rem;color:#fff;transition:color 0.2s ease;}
.ft-link:hover,.ft-link:focus-visible{color:#E97300;}
.ft-link:hover i,.ft-link:focus-visible i{color:#E97300;}
.ft-link:focus-visible{outline:2px solid #E97300;outline-offset:3px;border-radius:2px;}
.ft-stripe{width:100%;height:40px;background-color:#E97300;}
@media(max-width:992px){
.ft-inner{grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:2rem 1.5rem;}
}
@media(max-width:480px){
.ft-inner{grid-template-columns:1fr 1fr;gap:1.75rem 1.25rem;}
.ft-logo-col{grid-column:1 / -1;}
}
@media(max-width:320px){
.ft-inner{grid-template-columns:1fr;}
.ft-logo-col{grid-column:auto;}
}
@media(prefers-reduced-motion:reduce){
.ft-link,.ft-link i{transition:none;}
}
</style>`;