import grapesjs from "grapesjs";
import gjsPresetWebpage from "grapesjs-preset-webpage";

export function initializeGrapesJS() {
    const getScriptUrl = (pattern) => {
        const scripts = document.querySelectorAll("script[src]");
        for (const script of scripts) {
            if (script.src.includes(pattern)) return script.src;
        }
        return null;
    };

    const canvasCss =
        document.querySelector('meta[name="canvas-css-url"]')?.content ?? null;
    const canvasAppCss =
        document.querySelector('meta[name="canvas-app-css-url"]')?.content ??
        null;
    const canvasPoppins =
        document.querySelector('meta[name="canvas-poppins-url"]')?.content ??
        null;
    const canvasRemixicons =
        document.querySelector('meta[name="canvas-remixicons-url"]')?.content ??
        null;
    const leafletCss = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    const mapLoaderJs = getScriptUrl("map-loader");

    const canvasStyles = [
        canvasPoppins,
        canvasRemixicons,
        canvasCss,
        canvasAppCss,
        leafletCss,
    ].filter(Boolean);
    const canvasScripts = [mapLoaderJs].filter(Boolean);

    const editor = grapesjs.init({
        container: "#gjs",
        fromElement: false,
        height: "calc(100vh - 50px)",
        width: "auto",
        storageManager: false,

        canvas: {
            styles: canvasStyles,
            scripts: canvasScripts,
        },

        deviceManager: {
            devices: [
                {
                    id: "desktop",
                    name: "Desktop",
                    width: "",
                    widthMedia: "",
                },
                {
                    id: "tablet",
                    name: "Tablet",
                    width: "768px",
                    widthMedia: "992px",
                },
                {
                    id: "mobile",
                    name: "Mobile",
                    width: "375px",
                    widthMedia: "575px",
                },
            ],
        },

        panels: {
            defaults: [
                {
                    id: "devices-c",
                    buttons: [
                        {
                            id: "set-device-desktop",
                            command: "set-device-desktop",
                            className: "fa fa-desktop",
                            active: true,
                            togglable: false,
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21 2H3a2 2 0 00-2 2v12a2 2 0 002 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 002-2V4a2 2 0 00-2-2zm0 14H3V4h18v12z"/></svg>`,
                            attributes: { title: "Escritorio" },
                        },
                        {
                            id: "set-device-tablet",
                            command: "set-device-tablet",
                            className: "fa fa-tablet",
                            togglable: false,
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.5 0h-14C3.1 0 2 1.1 2 2.5v19C2 22.9 3.1 24 4.5 24h14c1.4 0 2.5-1.1 2.5-2.5v-19C21 1.1 19.9 0 18.5 0zm-7 23c-.8 0-1.5-.7-1.5-1.5S10.7 20 11.5 20s1.5.7 1.5 1.5S12.3 23 11.5 23zm7.5-4H4V3h15v16z"/></svg>`,
                            attributes: { title: "Tablet" },
                        },
                        {
                            id: "set-device-mobile",
                            command: "set-device-mobile",
                            className: "fa fa-mobile",
                            togglable: false,
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M15.5 1h-8C6.1 1 5 2.1 5 3.5v17C5 21.9 6.1 23 7.5 23h8c1.4 0 2.5-1.1 2.5-2.5v-17C18 2.1 16.9 1 15.5 1zm-4 21c-.8 0-1.5-.7-1.5-1.5S10.7 19 11.5 19s1.5.7 1.5 1.5S12.3 22 11.5 22zm4.5-4H7V4h9v15z"/></svg>`,
                            attributes: { title: "Móvil" },
                        },
                    ],
                },
                {
                    id: "options",
                    buttons: [
                        {
                            id: "sw-visibility",
                            command: "sw-visibility",
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>`,
                            context: "sw-visibility",
                            attributes: { title: "Contornos" },
                        },
                        {
                            id: "preview",
                            command: "preview",
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`,
                            context: "preview",
                            attributes: { title: "Vista previa" },
                        },
                        {
                            id: "fullscreen",
                            command: "fullscreen",
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`,
                            context: "fullscreen",
                            attributes: { title: "Pantalla completa" },
                        },
                        {
                            id: "export-template",
                            command: "export-template",
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>`,
                            context: "export-template",
                            attributes: { title: "Ver código" },
                        },
                        {
                            id: "undo",
                            command: "core:undo",
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>`,
                            attributes: { title: "Deshacer" },
                        },
                        {
                            id: "redo",
                            command: "core:redo",
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>`,
                            attributes: { title: "Rehacer" },
                        },
                        {
                            id: "gjs-open-import-webpage",
                            command: "gjs-open-import-webpage",
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`,
                            attributes: { title: "Importar" },
                        },
                        {
                            id: "canvas-clear",
                            command: "canvas-clear",
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`,
                            attributes: { title: "Limpiar canvas" },
                        },
                    ],
                },
                {
                    id: "views",
                    buttons: [
                        {
                            id: "open-sm",
                            command: "open-sm",
                            active: false,
                            togglable: false,
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.5 4v3h5V4h-5zm6.5 0v3h6V4H9zm7 0v3h5.5V4H16zM2.5 10.5v3h5v-3h-5zm6.5 0v3h6v-3H9zm7 0v3h5.5v-3H16zM2.5 17v3h5v-3h-5zm6.5 0v3h6v-3H9zm7 0v3h5.5v-3H16z"/></svg>`,
                            attributes: { title: "Panel de Estilos" },
                        },
                        {
                            id: "open-tm",
                            command: "open-tm",
                            togglable: false,
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`,
                            attributes: { title: "Configuraciones" },
                        },
                        {
                            id: "open-layers",
                            command: "open-layers",
                            togglable: false,
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg>`,
                            attributes: { title: "Panel de Capas" },
                        },
                        {
                            id: "open-blocks",
                            command: "open-blocks",
                            togglable: false,
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>`,
                            attributes: { title: "Panel de Bloques" },
                        },
                    ],
                },
            ],
        },

        styleManager: {
            sectors: [
                {
                    name: "Dimensiones",
                    open: false,
                    buildProps: [
                        "width",
                        "height",
                        "max-width",
                        "min-height",
                        "margin",
                        "padding",
                    ],
                },
                {
                    name: "Tipografía",
                    open: false,
                    buildProps: [
                        "font-family",
                        "font-size",
                        "font-weight",
                        "color",
                        "text-align",
                        "line-height",
                    ],
                },
                {
                    name: "Decoración",
                    open: false,
                    buildProps: [
                        "background-color",
                        "border",
                        "border-radius",
                        "box-shadow",
                    ],
                },
                {
                    name: "Extra",
                    open: false,
                    buildProps: [
                        "opacity",
                        "transition",
                        "transform",
                        "cursor",
                    ],
                },
            ],
        },

        i18n: {
            locale: "es",
            detectLocale: false,
            messages: {
                es: {
                    styleManager: {
                        properties: "Propiedades",
                        empty: "Selecciona un elemento para usar el Panel de Estilos",
                    },
                    traitManager: {
                        empty: "Selecciona un elemento para editarlo",
                        label: "Configuraciones del componente",
                    },
                    deviceManager: {
                        device: "Dispositivo",
                        devices: {
                            desktop: "Escritorio",
                            tablet: "Tablet",
                            mobile: "Móvil",
                        },
                    },
                },
            },
        },

        plugins: [gjsPresetWebpage],
        pluginsOpts: {
            [gjsPresetWebpage]: {
                blocks: [],
                modalImportTitle: "Importar",
                modalImportLabel: "",
                modalImportContent: "",
            },
        },
    });

    editor.on("component:selected", () => {
        [0, 50, 100, 200].forEach((delay) =>
            setTimeout(() => repositionToolbar(editor), delay),
        );
    });

    editor.on("component:deselected", () => {
        setTimeout(() => repositionToolbar(editor), 0);
    });

    editor.on("run:preview:before", () => {
        const toolbar = editor.Canvas.getFrameEl()
            ?.closest(".gjs-cv-canvas")
            ?.querySelector(".gjs-toolbar");
        if (toolbar) toolbar.style.display = "none";
    });

    return editor;
}

function repositionToolbar(editor) {
    const canvasEl = editor.Canvas.getFrameEl()?.closest(".gjs-cv-canvas");
    if (!canvasEl) return;

    const toolbar = canvasEl.querySelector(".gjs-toolbar");
    if (!toolbar || toolbar.style.display === "none") return;

    toolbar.style.minWidth = "max-content";
    void toolbar.offsetWidth;

    const canvasRect = canvasEl.getBoundingClientRect();
    const toolbarRect = toolbar.getBoundingClientRect();

    if (toolbarRect.width === 0) return;

    let top = parseFloat(toolbar.style.top) || 0;
    let left = parseFloat(toolbar.style.left) || 0;

    const margin = 6;
    const minTop = margin;
    const maxTop = canvasRect.height - toolbarRect.height - margin;
    const minLeft = margin;
    const maxLeft = canvasRect.width - toolbarRect.width - margin;

    if (top < minTop) top = minTop;
    if (top > maxTop) top = Math.max(minTop, maxTop);
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = Math.max(minLeft, maxLeft);

    toolbar.style.top = `${top}px`;
    toolbar.style.left = `${left}px`;
}
