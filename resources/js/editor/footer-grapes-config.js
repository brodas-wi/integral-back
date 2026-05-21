import grapesjs from "grapesjs";

export function initializeFooterGrapesJS() {
    return grapesjs.init({
        container: "#gjs",
        fromElement: false,
        height: "calc(100vh - 50px)",
        width: "auto",
        storageManager: false,

        canvas: {
            styles: [],
            scripts: [],
        },

        deviceManager: {
            devices: [
                { id: "desktop", name: "Desktop", width: "", widthMedia: "" },
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
                            active: true,
                            togglable: false,
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21 2H3a2 2 0 00-2 2v12a2 2 0 002 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 002-2V4a2 2 0 00-2-2zm0 14H3V4h18v12z"/></svg>`,
                            attributes: { title: "Escritorio" },
                        },
                        {
                            id: "set-device-mobile",
                            command: "set-device-mobile",
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
                    ],
                },
                {
                    id: "views",
                    buttons: [
                        {
                            id: "open-layers",
                            command: "open-layers",
                            togglable: false,
                            label: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg>`,
                            attributes: { title: "Capas" },
                        },
                    ],
                },
            ],
        },

        plugins: [],
        pluginsOpts: {},
    });
}
