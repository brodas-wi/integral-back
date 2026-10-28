export const HERO_VIDEO_STYLES = `<style>
.hv-section{width:100%;box-sizing:border-box;background-color:#fff;font-family:'Poppins',sans-serif;}
.hv-frame{position:relative;display:flex;align-items:flex-end;justify-content:center;width:100%;max-width:1600px;min-height:clamp(380px,38vw,540px);margin:0 auto;box-sizing:border-box;overflow:hidden;background-color:#0a0a0a;}
.hv-poster,.hv-video{position:absolute;top:0;right:0;bottom:0;left:0;display:block;width:100%;height:100%;object-fit:cover;object-position:center;}
.hv-poster{z-index:0;}
.hv-video{z-index:1;}
.hv-shade{position:absolute;top:0;right:0;bottom:0;left:0;z-index:2;background-image:linear-gradient(180deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.15) 55%,rgba(0,0,0,0.65) 100%);}
.hv-video::-webkit-media-controls{display:none !important;}
.hv-video::-webkit-media-controls-panel{display:none !important;opacity:0 !important;}
.hv-video::-webkit-media-controls-start-playback-button{display:none !important;}
.hv-content{position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.75rem;width:100%;box-sizing:border-box;text-align:center;padding-top:clamp(2rem,4vw,3rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(2rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.hv-title{margin:0;color:#fff;font-size:clamp(1.5rem,3.2vw,2.5rem);font-weight:800;line-height:1.2;}
.hv-subtitle{margin:0;color:#fff;font-size:clamp(1rem,1.8vw,1.25rem);font-weight:500;line-height:1.4;}
.hv-btn{display:inline-flex;align-items:center;justify-content:center;margin-top:0.5rem;box-sizing:border-box;border-radius:9999px;background-color:#E97300;color:#fff;font-size:clamp(0.8125rem,1.6vw,0.9375rem);font-weight:700;line-height:1.2;text-decoration:none;white-space:nowrap;padding-top:0.625rem;padding-right:2rem;padding-bottom:0.625rem;padding-left:2rem;transition:background-color 0.2s ease;}
.hv-btn:hover{background-color:#C96200;}
.hv-btn:focus-visible{outline:2px solid #fff;outline-offset:3px;}
.hv-mute{position:absolute;top:clamp(0.75rem,2vw,1.25rem);right:clamp(0.75rem,2vw,1.25rem);z-index:15;display:flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;margin:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;border:1.5px solid rgba(255,255,255,0.6);border-radius:9999px;background-color:rgba(0,0,0,0.45);color:#fff;font-size:1.0625rem;cursor:pointer;transition:background-color 0.2s ease,border-color 0.2s ease;}
.hv-mute:hover{background-color:rgba(0,0,0,0.65);border-color:#fff;}
.hv-mute:focus-visible{outline:2px solid #fff;outline-offset:2px;}
@media(max-width:640px){
.hv-mute{width:2.125rem;height:2.125rem;font-size:0.9375rem;}
}
@media(prefers-reduced-motion:reduce){
.hv-btn,.hv-mute{transition:none;}
}
</style>`;