export const FULL_BLEED_STYLES = `<style>
.fb-section{width:100%;box-sizing:border-box;background-color:#fff;font-family:'Poppins',sans-serif;}
.fb-frame{position:relative;width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;aspect-ratio:21/8;min-height:280px;overflow:hidden;}
.fb-image{position:absolute;top:0;right:0;bottom:0;left:0;display:block;width:100%;height:100%;object-fit:cover;}
.fb-content{position:absolute;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center;gap:1.25rem;box-sizing:border-box;max-width:min(90%,720px);padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.fb-align-left .fb-content{left:0;align-items:flex-start;text-align:left;}
.fb-align-right .fb-content{right:0;align-items:flex-end;text-align:right;}
.fb-title{margin:0;color:#fff;font-size:clamp(1.5rem,3.6vw,2.75rem);font-weight:800;line-height:1.15;text-shadow:0 2px 8px rgba(0,0,0,0.5),0 1px 3px rgba(0,0,0,0.4);}
.fb-btn{display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;border-radius:9999px;background-color:#E97300;color:#fff;font-size:clamp(0.8125rem,1.6vw,0.9375rem);font-weight:600;line-height:1.2;text-decoration:none;white-space:nowrap;padding-top:clamp(0.5rem,1.5vw,0.75rem);padding-right:clamp(1.125rem,3vw,1.75rem);padding-bottom:clamp(0.5rem,1.5vw,0.75rem);padding-left:clamp(1.125rem,3vw,1.75rem);transition:background-color 0.2s ease;}
.fb-btn:hover{background-color:#C96200;}
.fb-btn:focus-visible{outline:2px solid #fff;outline-offset:3px;}
@media(max-width:768px){
.fb-frame{aspect-ratio:4/5;min-height:420px;}
.fb-content,.fb-align-left .fb-content,.fb-align-right .fb-content{top:auto;right:0;bottom:0;left:0;align-items:center;justify-content:flex-end;max-width:100%;text-align:center;padding-top:1.5rem;padding-right:clamp(1.25rem,5vw,1.75rem);padding-bottom:2rem;padding-left:clamp(1.25rem,5vw,1.75rem);}
}
@media(prefers-reduced-motion:reduce){
.fb-btn{transition:none;}
}
</style>`;