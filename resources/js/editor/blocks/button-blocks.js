import { MediaModal } from "../../components/media-modal";

const btnDownloadFullBlueIcon = `<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#003B71"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#003B71"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#003B71" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const btnDownloadFullOrangeIcon = `<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#E97300"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#E97300"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#E97300" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const btnDownloadSimpleBlueIcon = `<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#003B71"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const btnDownloadSimpleOrangeIcon = `<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#E97300"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const btnFillBlueIcon = `<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#003B71"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`;

const btnFillOrangeIcon = `<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#E97300"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`;

const btnOutlineBlueIcon = `<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`;

const btnOutlineOrangeIcon = `<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`;

const btnFillWhiteIcon = `<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#ffffff"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.5"/>
</svg>`;

const btnOutlineWhiteIcon = `<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`;

const DOWNLOAD_FULL_HTML = (color) => {
    const variant = color === "#003B71" ? "blue" : "orange";
    return `
<div class="dld-full-wrap-${variant}" style="display:inline-block;max-width:480px;width:100%;">
<style>
.dld-full-${variant}{display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:12px;border:2px solid ${color};background:transparent;text-decoration:none;cursor:pointer;box-sizing:border-box;width:100%;transition:background 0.2s,border-color 0.2s;}
.dld-full-${variant}:hover{background:${color} !important;border-color:${color} !important;}
.dld-full-${variant}:hover .dld-full-${variant}-filename,
.dld-full-${variant}:hover .dld-full-${variant}-label,
.dld-full-${variant}:hover .dld-full-${variant}-arrow{color:#ffffff !important;opacity:1 !important;}
.dld-full-${variant}:hover .dld-full-${variant}-icon{background:rgba(255,255,255,0.2) !important;}
.dld-full-${variant}:hover .dld-full-${variant}-icon i{color:#ffffff !important;}
</style>
<a href="#"
   target="_self"
   class="dld-full-${variant}">
    <div class="dld-full-${variant}-icon"
         style="width:48px;height:48px;border-radius:12px;background:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s;">
        <i class="ri-file-line" style="font-size:1.5rem;color:#ffffff;transition:color 0.2s;"></i>
    </div>
    <div style="display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;">
        <span class="dld-full-${variant}-filename" style="font-size:1rem;font-weight:700;color:${color};line-height:1.3;transition:color 0.2s;">Nombre del archivo</span>
        <span class="dld-full-${variant}-label" style="font-size:0.875rem;font-weight:400;color:${color};opacity:0.7;transition:color 0.2s;">Haz clic para descargar</span>
    </div>
    <i class="dld-full-${variant}-arrow ri-download-2-line" style="font-size:1.25rem;color:${color};flex-shrink:0;margin-left:8px;transition:color 0.2s;"></i>
</a>
</div>`;
};

const DOWNLOAD_SIMPLE_HTML = (color) => {
    const variant = color === "#003B71" ? "blue" : "orange";
    return `
<div class="dld-simple-wrap-${variant}" style="display:inline-block;max-width:480px;width:100%;">
<style>
.dld-simple-${variant}{display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:12px;border:2px solid ${color};background:transparent;text-decoration:none;cursor:pointer;box-sizing:border-box;width:100%;transition:background 0.2s,border-color 0.2s;}
.dld-simple-${variant}:hover{background:${color} !important;border-color:${color} !important;}
.dld-simple-${variant}:hover .dld-simple-${variant}-filename,
.dld-simple-${variant}:hover .dld-simple-${variant}-arrow{color:#ffffff !important;}
</style>
<a href="#"
   target="_self"
   class="dld-simple-${variant}">
    <span class="dld-simple-${variant}-filename" style="font-size:1rem;font-weight:700;color:${color};flex:1;transition:color 0.2s;">Nombre del archivo</span>
    <i class="dld-simple-${variant}-arrow ri-download-2-line" style="font-size:1.25rem;color:${color};flex-shrink:0;transition:color 0.2s;"></i>
</a>
</div>`;
};

const BUTTON_VARIANTS = {
    "button-fill-blue": `inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-[#003B71] text-white transition-all duration-200 hover:bg-[#002a52] hover:border-[#002a52]`,
    "button-fill-orange": `inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-[#E97300] text-white transition-all duration-200 hover:bg-[#c96200] hover:border-[#c96200]`,
    "button-outline-blue": `inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-transparent text-[#003B71] transition-all duration-200 hover:bg-[#003B71] hover:text-white`,
    "button-outline-orange": `inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-transparent text-[#E97300] transition-all duration-200 hover:bg-[#E97300] hover:text-white`,
    "button-fill-white": `inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-white text-[#003B71] transition-all duration-200 hover:bg-[#dce8f5] hover:border-[#dce8f5]`,
    "button-outline-white": `inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-transparent text-white transition-all duration-200 hover:bg-white hover:text-[#003B71]`,
};

export const buttonBlocks = [
    {
        id: "button-fill-blue",
        label: "Botón azul sólido",
        category: "Botones",
        media: btnFillBlueIcon,
        content: {
            type: "integral-button",
            attributes: { "data-btn-variant": "button-fill-blue" },
        },
    },
    {
        id: "button-fill-orange",
        label: "Botón naranja sólido",
        category: "Botones",
        media: btnFillOrangeIcon,
        content: {
            type: "integral-button",
            attributes: { "data-btn-variant": "button-fill-orange" },
        },
    },
    {
        id: "button-outline-blue",
        label: "Botón azul outline",
        category: "Botones",
        media: btnOutlineBlueIcon,
        content: {
            type: "integral-button",
            attributes: { "data-btn-variant": "button-outline-blue" },
        },
    },
    {
        id: "button-outline-orange",
        label: "Botón naranja outline",
        category: "Botones",
        media: btnOutlineOrangeIcon,
        content: {
            type: "integral-button",
            attributes: { "data-btn-variant": "button-outline-orange" },
        },
    },
    {
        id: "button-fill-white",
        label: "Botón blanco sólido",
        category: "Botones",
        media: btnFillWhiteIcon,
        content: {
            type: "integral-button",
            attributes: { "data-btn-variant": "button-fill-white" },
        },
    },
    {
        id: "button-outline-white",
        label: "Botón blanco outline",
        category: "Botones",
        media: btnOutlineWhiteIcon,
        content: {
            type: "integral-button",
            attributes: { "data-btn-variant": "button-outline-white" },
        },
    },
    {
        id: "button-download-full-blue",
        label: "Descarga completa azul",
        category: "Botones",
        media: btnDownloadFullBlueIcon,
        content: DOWNLOAD_FULL_HTML("#003B71"),
    },
    {
        id: "button-download-full-orange",
        label: "Descarga completa naranja",
        category: "Botones",
        media: btnDownloadFullOrangeIcon,
        content: DOWNLOAD_FULL_HTML("#E97300"),
    },
    {
        id: "button-download-simple-blue",
        label: "Descarga simple azul",
        category: "Botones",
        media: btnDownloadSimpleBlueIcon,
        content: DOWNLOAD_SIMPLE_HTML("#003B71"),
    },
    {
        id: "button-download-simple-orange",
        label: "Descarga simple naranja",
        category: "Botones",
        media: btnDownloadSimpleOrangeIcon,
        content: DOWNLOAD_SIMPLE_HTML("#E97300"),
    },
];

export function initializeButtonBlocks(editor) {
    const linkTraits = [
        {
            type: "button",
            label: "Documento",
            name: "select-document",
            text: "Seleccionar documento",
            full: true,
            command: "open-document-picker",
        },
        {
            type: "text",
            name: "href",
            label: "URL / Enlace",
            placeholder: "https://...",
        },
        {
            type: "select",
            name: "target",
            label: "Abrir en",
            options: [
                { id: "_self", name: "Misma ventana" },
                { id: "_blank", name: "Nueva ventana" },
            ],
        },
    ];

    editor.DomComponents.addType("link", {
        model: {
            defaults: {
                traits: linkTraits,
            },
        },
    });

    editor.DomComponents.addType("integral-button", {
        isComponent: (el) =>
            el.tagName === "A" && el.hasAttribute("data-btn-variant"),

        model: {
            defaults: {
                tagName: "a",
                draggable: true,
                droppable: false,
                editable: true,
                attributes: {
                    href: "#",
                    target: "_self",
                    "data-btn-variant": "button-fill-blue",
                },
                components: "Texto del botón",
                traits: linkTraits,
            },

            init() {
                const variant =
                    this.getAttributes()["data-btn-variant"] ??
                    "button-fill-blue";
                const cls =
                    BUTTON_VARIANTS[variant] ??
                    BUTTON_VARIANTS["button-fill-blue"];
                this.setClass(cls.split(" "));
            },
        },
    });

    function findComponentBySelector(component, selector) {
        const el = component.getEl();
        if (el?.matches?.(selector)) return component;

        let found = null;
        const children = component.components?.();
        if (!children) return null;

        children.each((child) => {
            if (found) return;
            found = findComponentBySelector(child, selector);
        });
        return found;
    }

    function updateIconComponent(component, ext) {
        const iconMap = {
            pdf: "ri-file-pdf-line",
            xlsx: "ri-file-excel-line",
            xls: "ri-file-excel-line",
            doc: "ri-file-word-line",
            docx: "ri-file-word-line",
        };
        const newClass = iconMap[ext] ?? "ri-file-line";

        function findIcon(comp) {
            const el = comp.getEl?.();
            if (el?.tagName === "I") {
                const parent = el.parentElement;
                if (
                    parent &&
                    [...parent.classList].some((c) => c.includes("-icon"))
                ) {
                    return comp;
                }
            }
            let found = null;
            const children = comp.components?.();
            if (!children) return null;
            children.each((child) => {
                if (found) return;
                found = findIcon(child);
            });
            return found;
        }

        const iconComponent = findIcon(component);
        if (iconComponent) {
            const riClass = iconComponent
                .getClasses()
                .find((c) => c.startsWith("ri-"));
            if (riClass) iconComponent.removeClass(riClass);
            iconComponent.addClass(newClass);
        } else {
            // Fallback DOM
            const el = component.getEl();
            const iconEl = el?.querySelector("[class*='-icon'] i");
            if (iconEl) {
                const kept = [...iconEl.classList].filter(
                    (c) => !c.startsWith("ri-"),
                );
                iconEl.className = [...kept, newClass].join(" ");
            }
        }
    }

    editor.Commands.add("open-document-picker", {
        run(ed) {
            const selected = ed.getSelected();
            if (!selected) return;

            if (ed._documentPicker) {
                try {
                    ed._documentPicker.destroy();
                } catch (_) {}
            }
            ed._documentPicker = new MediaModal();

            ed._documentPicker.open(
                (media) => {
                    const ext = media.filename.split(".").pop().toLowerCase();

                    selected.addAttributes({ href: media.url });
                    const traitHref = selected.getTrait("href");
                    if (traitHref) traitHref.set("value", media.url);

                    const filenameComponent = findComponentBySelector(
                        selected,
                        "[class*='-filename']",
                    );
                    if (filenameComponent) {
                        filenameComponent.components(media.filename);
                    }

                    updateIconComponent(selected, ext);
                },
                { filters: { type: "document" } },
            );
        },
    });
}
