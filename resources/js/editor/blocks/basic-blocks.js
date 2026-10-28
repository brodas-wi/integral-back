import { assetUrl } from "@/utils/url.js";
const TEXT_CLASSES = "text-base text-[#003B71] leading-relaxed";

const listContent = (tag, kind, count = 3) =>
    `<${tag} class="${kind} pl-6 m-0 space-y-2 ${TEXT_CLASSES}">${Array.from({ length: count }, () => "<li>Elemento de lista</li>").join("")}</${tag}>`;

const CATEGORY = "Básico";
const BLUE = "#003B71";
const ORANGE = "#E97300";

const svg = (body, background = "#f8f9fa") =>
    `<svg viewBox="0 0 32 32" width="32" height="32"><rect width="32" height="32" fill="${background}" rx="2"/>${body}</svg>`;

const lines = (rows) =>
    rows
        .map(
            ([y, width, opacity]) =>
                `<rect x="4" y="${y}" width="${width}" height="2" rx="1" fill="${BLUE}" fill-opacity="${opacity}"/>`,
        )
        .join("");

const bullet = (y, marker) =>
    `${marker}<rect x="12" y="${y - 1}" width="14" height="2" rx="1" fill="${BLUE}" fill-opacity="0.6"/>`;

const HEADINGS = [
    { id: "heading1", label: "Título H1", tag: "h1", text: "Título Principal", size: 18, classes: "text-4xl font-bold leading-tight" },
    { id: "heading2", label: "Título H2", tag: "h2", text: "Subtítulo", size: 16, classes: "text-3xl font-bold leading-snug" },
    { id: "heading3", label: "Título H3", tag: "h3", text: "Título de Sección", size: 14, classes: "text-2xl font-bold leading-snug" },
    { id: "heading4", label: "Título H4", tag: "h4", text: "Título de Subsección", size: 12, classes: "text-xl font-bold leading-snug" },
];

const DIVIDERS = [
    { id: "divider-blue", label: "Divisor azul", color: BLUE, bg: "bg-[#003B71]", background: "#f8f9fa" },
    { id: "divider-orange", label: "Divisor naranja", color: ORANGE, bg: "bg-[#E97300]", background: "#f8f9fa" },
    { id: "divider-white", label: "Divisor blanco", color: "#ffffff", bg: "bg-white", background: BLUE },
];

const headingBlock = ({ id, label, tag, text, size, classes }) => ({
    id,
    label,
    category: CATEGORY,
    media: svg(
        `<text x="16" y="22" text-anchor="middle" font-size="${size}" font-weight="700" fill="${BLUE}">${tag.toUpperCase()}</text>`,
    ),
    content: `<${tag} class="${classes} text-[#003B71]">${text}</${tag}>`,
});

const dividerBlock = ({ id, label, color, bg, background }) => ({
    id,
    label,
    category: CATEGORY,
    media: svg(`<rect x="4" y="15" width="24" height="2" rx="1" fill="${color}"/>`, background),
    content: `<hr class="border-none h-0.5 ${bg} my-8">`,
});

export const basicBlocks = [
    ...HEADINGS.map(headingBlock),
    {
        id: "paragraph",
        label: "Párrafo",
        category: CATEGORY,
        media: svg(lines([[8, 24, 1], [13, 24, 0.5], [18, 18, 0.5]])),
        content: `<p class="${TEXT_CLASSES} m-0">Este es un párrafo de ejemplo. Puedes editar este texto y agregar tu propio contenido aquí.</p>`,
    },
    {
        id: "link",
        label: "Enlace",
        category: CATEGORY,
        media: svg(
            `<path fill="${ORANGE}" d="M13 10H10a6 6 0 000 12h3v-2h-3a4 4 0 010-8h3v-2zm6 0h-3v2h3a4 4 0 010 8h-3v2h3a6 6 0 000-12zm-8 7h6v-2h-6v2z"/>`,
        ),
        content: `<a href="#" class="text-base font-semibold text-[#E97300] underline hover:text-[#C96200]">Texto del enlace</a>`,
    },
    {
        id: "image",
        label: "Imagen",
        category: CATEGORY,
        media: svg(`
            <rect x="3" y="6" width="26" height="20" rx="2" fill="${BLUE}" fill-opacity="0.15" stroke="${BLUE}" stroke-width="1.5"/>
            <circle cx="10" cy="13" r="2.5" fill="${BLUE}" fill-opacity="0.5"/>
            <path d="M3 22l7-7 5 5 3-3 9 9" stroke="${BLUE}" stroke-width="1.5" fill="none" stroke-linejoin="round"/>`),
        content: {
            type: "image",
            attributes: {
                src: assetUrl("images/placeholder.svg"),
                alt: "Imagen",
            },
            classes: ["max-w-full", "h-auto", "block"],
            activeOnRender: 1,
        },
    },
    {
        id: "unordered-list",
        label: "Lista no ordenada",
        category: CATEGORY,
        media: svg(
            [10, 17, 24]
                .map((y) => bullet(y, `<circle cx="7" cy="${y}" r="2" fill="${BLUE}"/>`))
                .join(""),
        ),
        content: listContent("ul", "list-disc"),
    },
    {
        id: "ordered-list",
        label: "Lista ordenada",
        category: CATEGORY,
        media: svg(
            [12, 19, 26]
                .map((y, index) =>
                    bullet(
                        y - 3,
                        `<text x="5" y="${y}" font-size="7" font-weight="700" fill="${BLUE}">${index + 1}.</text>`,
                    ),
                )
                .join(""),
        ),
        content: listContent("ol", "list-decimal"),
    },
    {
        id: "list-item",
        label: "Ítem de lista",
        category: CATEGORY,
        media: svg(`
            <circle cx="8" cy="16" r="1.6" fill="${BLUE}"/>
            <rect x="12" y="14.8" width="15" height="2.4" rx="1.2" fill="${BLUE}" fill-opacity="0.5"/>`),
        content: `<li class="${TEXT_CLASSES}" data-gjs-draggable="ul,ol">Elemento de lista</li>`,
    },
    ...DIVIDERS.map(dividerBlock),
    {
        id: "spacer",
        label: "Espaciado",
        category: CATEGORY,
        media: svg(`
            <rect x="14" y="4" width="4" height="24" rx="2" fill="${BLUE}" fill-opacity="0.2"/>
            <rect x="4" y="4" width="24" height="2" rx="1" fill="${BLUE}" fill-opacity="0.4"/>
            <rect x="4" y="26" width="24" height="2" rx="1" fill="${BLUE}" fill-opacity="0.4"/>`),
        content: `<div class="h-12 w-full"></div>`,
    },
];