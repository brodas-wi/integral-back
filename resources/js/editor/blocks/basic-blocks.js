import { assetUrl } from "@/utils/url.js";

export const basicBlocks = [
    {
        id: "heading1",
        label: "Título H1",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <text x="16" y="22" text-anchor="middle" font-size="18" font-weight="800" fill="#003B71">H1</text>
        </svg>`,
        content: `<h1 class="text-4xl font-bold leading-tight text-[#003B71]">Título Principal</h1>`,
    },
    {
        id: "heading2",
        label: "Título H2",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <text x="16" y="22" text-anchor="middle" font-size="16" font-weight="700" fill="#003B71">H2</text>
        </svg>`,
        content: `<h2 class="text-3xl font-bold leading-snug text-[#003B71]">Subtítulo</h2>`,
    },
    {
        id: "heading3",
        label: "Título H3",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <text x="16" y="22" text-anchor="middle" font-size="14" font-weight="700" fill="#003B71">H3</text>
        </svg>`,
        content: `<h3 class="text-2xl font-bold leading-snug text-[#003B71]">Título de Sección</h3>`,
    },
    {
        id: "heading4",
        label: "Título H4",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <text x="16" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#003B71">H4</text>
        </svg>`,
        content: `<h4 class="text-xl font-bold leading-snug text-[#003B71]">Título de Subsección</h4>`,
    },
    {
        id: "paragraph",
        label: "Párrafo",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="4" y="8" width="24" height="2" rx="1" fill="#003B71"/>
            <rect x="4" y="13" width="24" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
            <rect x="4" y="18" width="18" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
        </svg>`,
        content: `<p class="text-base font-normal leading-relaxed text-gray-800">Este es un párrafo de ejemplo. Puedes editar este texto y agregar tu propio contenido aquí.</p>`,
    },
    {
        id: "link",
        label: "Enlace",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <path fill="#003B71" d="M13 10H10a6 6 0 000 12h3v-2h-3a4 4 0 010-8h3v-2zm6 0h-3v2h3a4 4 0 010 8h-3v2h3a6 6 0 000-12zm-8 7h6v-2h-6v2z"/>
        </svg>`,
        content: `<a href="#" class="text-base font-medium underline text-[#003B71]">Texto del enlace</a>`,
    },
    {
        id: "image",
        label: "Imagen",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="3" y="6" width="26" height="20" rx="2" fill="#003B71" fill-opacity="0.15" stroke="#003B71" stroke-width="1.5"/>
            <circle cx="10" cy="13" r="2.5" fill="#003B71" fill-opacity="0.5"/>
            <path d="M3 22l7-7 5 5 3-3 9 9" stroke="#003B71" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
        </svg>`,
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
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <circle cx="7" cy="10" r="2" fill="#003B71"/>
            <rect x="12" y="9" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
            <circle cx="7" cy="17" r="2" fill="#003B71"/>
            <rect x="12" y="16" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
            <circle cx="7" cy="24" r="2" fill="#003B71"/>
            <rect x="12" y="23" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
        </svg>`,
        content: `<ul class="list-disc list-inside flex flex-col gap-1 text-base font-normal leading-relaxed text-gray-800">
            <li>Elemento de lista</li>
            <li>Elemento de lista</li>
            <li>Elemento de lista</li>
        </ul>`,
    },
    {
        id: "ordered-list",
        label: "Lista ordenada",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <text x="5" y="12" font-size="7" font-weight="700" fill="#003B71">1.</text>
            <rect x="12" y="9" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
            <text x="5" y="19" font-size="7" font-weight="700" fill="#003B71">2.</text>
            <rect x="12" y="16" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
            <text x="5" y="26" font-size="7" font-weight="700" fill="#003B71">3.</text>
            <rect x="12" y="23" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
        </svg>`,
        content: `<ol class="list-decimal list-inside flex flex-col gap-1 text-base font-normal leading-relaxed text-gray-800">
            <li>Elemento de lista</li>
            <li>Elemento de lista</li>
            <li>Elemento de lista</li>
        </ol>`,
    },
    {
        id: "divider-blue",
        label: "Divisor azul",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="4" y="15" width="24" height="2" rx="1" fill="#003B71"/>
        </svg>`,
        content: `<hr class="border-none h-0.5 bg-[#003B71] my-8">`,
    },
    {
        id: "divider-orange",
        label: "Divisor naranja",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="4" y="15" width="24" height="2" rx="1" fill="#E97300"/>
        </svg>`,
        content: `<hr class="border-none h-0.5 bg-[#E97300] my-8">`,
    },
    {
        id: "divider-white",
        label: "Divisor blanco",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="4" y="15" width="24" height="2" rx="1" fill="#ffffff"/>
        </svg>`,
        content: `<hr class="border-none h-0.5 bg-white my-8">`,
    },
    {
        id: "spacer",
        label: "Espaciado",
        category: "Básico",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="14" y="4" width="4" height="24" rx="2" fill="#003B71" fill-opacity="0.2"/>
            <rect x="4" y="4" width="24" height="2" rx="1" fill="#003B71" fill-opacity="0.4"/>
            <rect x="4" y="26" width="24" height="2" rx="1" fill="#003B71" fill-opacity="0.4"/>
        </svg>`,
        content: `<div class="h-12 w-full"></div>`,
    },
];
