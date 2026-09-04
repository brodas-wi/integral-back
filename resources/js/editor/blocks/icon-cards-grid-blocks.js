import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

const IC_ANIMATION_CSS = `
<style>
.ic-card{opacity:0;animation:ic-fade-in 0.5s ease forwards;}
.ic-card:nth-child(1){animation-delay:0.05s;}
.ic-card:nth-child(2){animation-delay:0.15s;}
.ic-card:nth-child(3){animation-delay:0.25s;}
.ic-card:nth-child(4){animation-delay:0.35s;}
.ic-card:nth-child(n+5){animation-delay:0.45s;}
@keyframes ic-fade-in{from{opacity:0;}to{opacity:1;}}
</style>`;

function buildCardHTML(card) {
    const img = card.img || assetUrl("images/placeholder.svg");
    const title = card.title || "Título de la tarjeta";
    return `<div class="ic-card min-w-[240px] rounded-2xl overflow-hidden bg-white shadow-sm" data-gjs-name="Tarjeta">
        <div class="ic-card-img-wrap aspect-square w-full overflow-hidden bg-[#dce8f5]" data-gjs-name="Imagen">
            <img src="${img}" alt="${title}" class="w-full h-full object-cover block" data-gjs-type="image">
        </div>
        <div class="bg-[#003B71] px-4 py-4" data-gjs-name="Texto">
            <p class="text-white font-extrabold text-[20px] leading-snug text-center" data-gjs-type="text">${title}</p>
        </div>
    </div>`;
}

function buildIconCardsGridHTML(data) {
    const heading = data.heading || "¿Cómo podemos ayudarte?";
    const subheading = data.subheading || "";
    const cards = data.cards || [];
    const cardsHTML = cards.map(buildCardHTML).join("");
    const subheadingHTML = subheading
        ? `<p class="text-base text-[#003B71] text-center mt-2" data-gjs-type="text">${subheading}</p>`
        : "";

    return `<section class="w-full bg-white px-16 py-12">
        <div class="text-center mb-8">
            <h2 class="text-4xl font-extrabold text-[#003B71]" data-gjs-type="text">${heading}</h2>
            ${subheadingHTML}
        </div>
        <div class="ic-grid grid gap-6" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">${cardsHTML}</div>
    </section>${IC_ANIMATION_CSS}`;
}

const DEFAULT_DATA = {
    heading: "¿Cómo podemos ayudarte?",
    subheading: "",
    cards: [
        { img: "", title: "Créditos para capital de trabajo" },
        { img: "", title: "Créditos para vivienda" },
        { img: "", title: "Ahorros y depósito a plazo fijo" },
        { img: "", title: "Microseguros" },
    ],
};

const iconCardsGridIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="6" height="8" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.2"/>
    <rect x="2.8" y="4.8" width="4.4" height="4" fill="#003B71" fill-opacity="0.15" rx="0.6"/>
    <rect x="2.8" y="9.4" width="4.4" height="2" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="4" width="6" height="8" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.2"/>
    <rect x="10.8" y="4.8" width="4.4" height="4" fill="#003B71" fill-opacity="0.15" rx="0.6"/>
    <rect x="10.8" y="9.4" width="4.4" height="2" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
    <rect x="18" y="4" width="6" height="8" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.2"/>
    <rect x="18.8" y="4.8" width="4.4" height="4" fill="#003B71" fill-opacity="0.15" rx="0.6"/>
    <rect x="18.8" y="9.4" width="4.4" height="2" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
    <rect x="26" y="4" width="4" height="8" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.2"/>
    <rect x="26.8" y="4.8" width="2.4" height="4" fill="#003B71" fill-opacity="0.15" rx="0.6"/>
    <rect x="26.8" y="9.4" width="2.4" height="2" rx="0.5" fill="#003B71" fill-opacity="0.6"/>
</svg>`;

export function initializeIconCardsGridBlock(editor) {
    const componentType = "icon-cards-grid-component";
    const cardType = "icon-cards-grid-card";

    editor.DomComponents.addType(cardType, {
        isComponent: (el) =>
            el.classList?.contains("ic-card") ? { type: cardType } : false,
        model: {
            defaults: {
                name: "Tarjeta",
                draggable: ".ic-grid",
                droppable: false,
                removable: true,
                copyable: true,
            },
        },
    });

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Tarjetas con Imagen",
                tagName: "div",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: true,
                selectable: true,
                hoverable: true,
                attributes: {
                    "data-gjs-type": componentType,
                },
                components: buildIconCardsGridHTML(DEFAULT_DATA),
            },
            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.BlockManager.add("icon-cards-grid-block", {
        label: "Tarjetas con imagen",
        category: "Productos y Servicios",
        media: iconCardsGridIcon,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    editor.on("component:dblclick", (component) => {
        const el = component.getEl();
        if (el?.tagName === "IMG" && el.closest(".ic-card-img-wrap")) {
            openMediaPicker({
                type: "image",
                title: "Seleccionar imagen de tarjeta",
                onSelect: (url) => {
                    component.set("src", url);
                    component.addAttributes({ src: url });
                },
            });
        }
    });
}