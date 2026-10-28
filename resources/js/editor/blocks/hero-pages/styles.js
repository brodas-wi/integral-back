export const HERO_PAGES_STYLES = `<style>
.hp-section{width:100%;box-sizing:border-box;background-color:#fff;font-family:'Poppins',sans-serif;}
.hp-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(2rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(2rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.hp-heading{margin:0;color:#E97300;font-size:clamp(1.5rem,3.2vw,2.25rem);font-weight:800;line-height:1.2;text-align:center;}
.hp-subheading{margin:0 0 2rem;color:#003B71;font-size:clamp(1.5rem,3.2vw,2.25rem);font-weight:500;line-height:1.4;text-align:center;}
.hp-carousel{position:relative;width:100%;}
.hp-swiper{overflow:hidden;width:100%;}
.hp-swiper .swiper-wrapper{align-items:stretch;}
.hp-swiper .swiper-slide{display:flex;justify-content:center;flex-shrink:0;width:280px;height:auto;}
.hp-card{position:relative;display:block;width:280px;height:350px;overflow:hidden;border-radius:32px;}
.hp-card-link{color:inherit;text-decoration:none;cursor:pointer;}
.hp-card-link:focus-visible{outline:3px solid #E97300;outline-offset:3px;}
.hp-card-media{position:absolute;top:0;right:0;bottom:0;left:0;overflow:hidden;border-radius:32px;}
.hp-card-media img{position:absolute;top:0;right:0;bottom:0;left:0;display:block;width:100%;height:100%;object-fit:cover;}
.hp-card-title{position:absolute;top:1rem;right:1rem;left:1rem;z-index:5;margin:0;color:#fff;font-size:1.3rem;font-weight:800;line-height:1.25;text-shadow:0 2px 6px rgba(0,0,0,0.55),0 1px 2px rgba(0,0,0,0.4);}
.hp-card-badge-box{position:absolute;right:0.75rem;bottom:0.75rem;left:0.75rem;z-index:5;display:flex;align-items:center;gap:0.625rem;box-sizing:border-box;border-radius:12px;background-color:rgba(0,0,0,0.5);padding-top:0.625rem;padding-right:0.75rem;padding-bottom:0.625rem;padding-left:0.75rem;}
.hp-card-badge{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:2rem;height:2rem;border-radius:9999px;background-color:#fff;color:#003B71;font-size:1rem;}
.hp-card-desc{margin:0;color:#fff;font-size:0.8125rem;font-weight:500;line-height:1.4;}
.hp-nav{position:absolute;top:50%;z-index:10;display:flex;align-items:center;justify-content:center;width:2.75rem;height:2.75rem;margin:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;border:0;border-radius:9999px;background-color:#fff;color:#E97300;font-size:1.25rem;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,0.15);transform:translateY(-50%);transition:background-color 0.2s ease,color 0.2s ease,opacity 0.2s ease;}
.hp-nav:hover{background-color:#E97300;color:#fff;}
.hp-nav:focus-visible{outline:2px solid #003B71;outline-offset:2px;}
.hp-nav.swiper-nav-disabled-state,.hp-nav.hp-nav-disabled{opacity:0.35;cursor:not-allowed;pointer-events:none;}
.hp-nav-prev{left:-1.375rem;}
.hp-nav-next{right:-1.375rem;}
.hp-dots{position:static;display:flex !important;align-items:center;justify-content:center;gap:0.75rem;width:100%;margin-top:1.75rem;}
.hp-dots:empty{display:none !important;margin-top:0;}
.hp-dots .swiper-pagination-bullet,.hp-dots .hp-dot{width:0.875rem !important;height:0.875rem !important;margin:0 !important;padding:0 !important;border:0 !important;border-radius:9999px !important;background-color:#cbd5e1 !important;opacity:1 !important;cursor:pointer;transition:background-color 0.2s ease,transform 0.2s ease;}
.hp-dots .active{background-color:#003B71 !important;transform:scale(1.1);}
@media(max-width:640px){
.hp-nav-prev{left:0.25rem;}
.hp-nav-next{right:0.25rem;}
.hp-swiper .swiper-slide{width:260px;}
.hp-card{width:260px;height:325px;}
}
@media(prefers-reduced-motion:reduce){
.hp-nav,.hp-dots .swiper-pagination-bullet,.hp-dots .hp-dot{transition:none;}
}
</style>`;