import { assetUrl } from "@/utils/url.js";

const FULL_IMAGE_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
    <rect x="6" y="6" width="20" height="20" rx="1.5" fill="none" stroke="#E97300" stroke-width="1"/>
    <circle cx="11" cy="11" r="1.8" fill="#E97300"/>
    <path d="M8 22L14 15L18 19L21 16L24 22Z" fill="#E97300" fill-opacity="0.6"/>
</svg>`;

const FULL_IMAGE_STYLES = `
<style>
.fi-section{width:100%;box-sizing:border-box;}
.fi-container{width:100%;max-width:1600px;margin:0 auto;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;display:flex;justify-content:center;}
.fi-wrap{width:100%;max-width:900px;min-width:0;box-sizing:border-box;}
.fi-img{display:block;width:100%;height:auto;max-height:80vh;margin:0 auto;object-fit:contain;border-radius:clamp(8px,1.5vw,16px);}
</style>`;

const buildFullImage = () => `<section class="fi-section">
    <div class="fi-container">
        <div class="fi-wrap">
            <img src="${assetUrl("images/placeholder.svg")}" alt="Imagen" class="fi-img">
        </div>
    </div>
</section>
${FULL_IMAGE_STYLES}`;

export function initializeFullImageBlock(editor) {
    editor.BlockManager.add("full-image-block", {
        label: "Sección: imagen completa",
        category: "Banners",
        media: FULL_IMAGE_ICON,
        activate: true,
        content: buildFullImage(),
    });
}