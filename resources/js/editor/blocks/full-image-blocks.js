import { assetUrl } from "@/utils/url.js";

function buildFullImageHTML(uid) {
    uid = uid || "fi" + Math.random().toString(36).slice(2, 7);
    const imageUrl = assetUrl("images/placeholder.svg");

    const sectionStyle = `width:100%;padding:clamp(1.5rem,4vw,3rem);box-sizing:border-box;display:flex;justify-content:center;`;

    const wrapperStyle = `width:100%;max-width:900px;box-sizing:border-box;`;

    const imgStyle = `display:block;width:100%;height:auto;max-height:80vh;object-fit:contain;border-radius:clamp(8px,1.5vw,16px);margin:0 auto;`;

    return `<section id="fi-root-${uid}" style="${sectionStyle}"><div style="${wrapperStyle}"><img src="${imageUrl}" alt="Imagen" style="${imgStyle}"></div></section>`;
}

const iconFullImage = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
    <rect x="6" y="6" width="20" height="20" rx="1.5" fill="none" stroke="#E97300" stroke-width="1"/>
    <circle cx="11" cy="11" r="1.8" fill="#E97300"/>
    <path d="M8 22 L14 15 L18 19 L21 16 L24 22 Z" fill="#E97300" fill-opacity="0.6"/>
</svg>`;

export function initializeFullImageBlock(editor) {
    editor.BlockManager.add("full-image-block", {
        label: "Imagen Completa",
        category: "Contenido",
        media: iconFullImage,
        activate: true,
        content: buildFullImageHTML(),
    });
}