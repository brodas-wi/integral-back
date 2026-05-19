export function applyCustomStyles(editor) {
    const styleEl = document.createElement("style");
    styleEl.innerHTML = `
        .gjs-btn, .gjs-btn-prim, .gjs-pn-btn {
            font-weight: 600 !important;
        }
        
        .gjs-block {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 10px !important;
            min-height: 90px !important;
        }
        
        .gjs-block-label {
            font-weight: 500 !important;
            text-align: center !important;
            color: #ddd !important;
            margin-top: 8px !important;
            width: 100% !important;
            font-size: 11px !important;
            line-height: 1.3 !important;
        }
        
        .gjs-block svg {
            display: block !important;
            margin: 0 auto !important;
            max-width: 40px !important;
            max-height: 40px !important;
        }
        
        .gjs-block__media {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
        }
        
        .gjs-block-category .gjs-title {
            background-color: #0d3f6a !important;
            color: white !important;
            font-weight: 600 !important;
            padding: 8px 12px !important;
            cursor: pointer !important;
        }
        
        .gjs-layer-name, .gjs-layer-title, .gjs-layer-title-inn,
        .gjs-clm-header-label, .gjs-clm-label-sel, .gjs-clm-sel-cmp,
        .gjs-clm-sel-id, .gjs-sm-sector-label, .gjs-sm-property .gjs-label,
        .gjs-trt-trait .gjs-label, .gjs-traits-label, .gjs-mdl-title,
        .gjs-trt-header, .gjs-sm-header {
            color: #ddd !important;
        }
        
        .gjs-layer-caret svg, .gjs-sm-sector-caret svg {
            fill: #ddd !important;
        }
        
        .gjs-field select, 
        .gjs-field input, 
        .gjs-field textarea,
        .gjs-input-unit {
            color: #ddd !important;
            background-color: transparent !important;
            border: none !important;
            border-radius: 0 !important;
            padding: 5px !important;
            font-size: 11px !important;
            height: auto !important;
            min-height: auto !important;
            box-shadow: none !important;
        }
        
        .gjs-field select:focus,
        .gjs-field input:focus,
        .gjs-field textarea:focus {
            outline: none !important;
            border: none !important;
            box-shadow: none !important;
        }
        
        .gjs-block:before {
            color: #ddd !important;
        }
        
        .gjs-mdl-btn-close {
            color: #ddd !important;
        }
        
        .gjs-one-bg, .gjs-two-bg, .gjs-three-bg, .gjs-four-bg {
            color: #ddd !important;
        }
        
        .gjs-four-color, .gjs-four-color-h:hover {
            color: #ddd !important;
        }
        
        .gjs-sm-property, .gjs-clm-tags {
            color: #999 !important;
        }
    `;
    document.head.appendChild(styleEl);
}

export function translateDynamicUI(editor) {
    const translations = {
        "Component settings": "Configuraciones",
        Title: "Título",
        Target: "Destino",
        Href: "Enlace",
        Alt: "Texto alternativo",
        ID: "ID",
    };

    const categoryTranslations = {
        Basic: "Básico",
        Layout: "Diseño",
        Buttons: "Botones",
        Maps: "Mapas",
        Mapas: "Mapas",
    };

    const translateUI = () => {
        document
            .querySelectorAll(".gjs-traits-label, .gjs-label")
            .forEach((el) => {
                const text = el.textContent.trim();
                if (translations[text]) {
                    el.textContent = translations[text];
                }
            });

        document.querySelectorAll("select option").forEach((option) => {
            const optionTranslations = {
                "This window": "Misma ventana",
                "New window": "Nueva ventana",
            };

            if (optionTranslations[option.textContent]) {
                option.textContent = optionTranslations[option.textContent];
            }
        });

        const categories = editor.BlockManager.getCategories();
        categories.each((category) => {
            const id = category.get("id");
            const label = category.get("label");
            if (categoryTranslations[id] || categoryTranslations[label]) {
                category.set(
                    "label",
                    categoryTranslations[id] || categoryTranslations[label],
                );
            }
        });
    };

    setTimeout(translateUI, 500);

    const observer = new MutationObserver(translateUI);
    const gjsContainer = document.querySelector("#gjs");
    if (gjsContainer) {
        observer.observe(gjsContainer, {
            childList: true,
            subtree: true,
        });
    }

    editor.on("component:selected", () => {
        setTimeout(translateUI, 100);
    });

    editor.on("block:drag:start", () => {
        setTimeout(translateUI, 100);
    });
}

export function fixButtonTooltips(editor) {
    setTimeout(() => {
        const mappings = [
            { selector: '[title="View components"]', newTitle: "Contornos" },
            {
                selector: '[title="Open Style Manager"]',
                newTitle: "Panel de Estilos",
            },
            {
                selector: '[title="Open Layer Manager"]',
                newTitle: "Panel de Capas",
            },
            { selector: '[title="Open Blocks"]', newTitle: "Panel de Bloques" },
            { selector: '[title="Settings"]', newTitle: "Configuraciones" },
        ];

        mappings.forEach(({ selector, newTitle }) => {
            const button = document.querySelector(selector);
            if (button) button.setAttribute("title", newTitle);
        });
    }, 1000);
}

export function injectCanvasStyles(editor) {
    const inject = () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe?.contentDocument?.head) return;

        const doc  = iframe.contentDocument;
        const head = doc.head;

        const remixIconsLink = document.querySelector('link[href*="remixicon"]');
        if (remixIconsLink && !doc.querySelector('link[href*="remixicon"]')) {
            const link = doc.createElement("link");
            link.rel   = "stylesheet";
            link.href  = remixIconsLink.href;
            head.appendChild(link);
        }
    };

    editor.on("load",              () => setTimeout(inject, 100));
    editor.on("canvas:frame:load", () => setTimeout(inject, 100));
}
