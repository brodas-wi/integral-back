export class EditorService {
    constructor() {
        this.hasUnsavedChanges = false;
        this.isNavigating = false;
    }

    async loadPageContent(editor, loadUrl) {
        if (!loadUrl) {
            throw new Error("URL de carga no proporcionada");
        }

        const response = await fetch(loadUrl, {
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al cargar el contenido");
        }

        const data = await response.json();

        if (data.components_json) {
            try {
                const projectData = JSON.parse(data.components_json);
                editor.loadProjectData(projectData);
                return data;
            } catch {}
        }

        const html = data.html || "";
        const cleanHtml = html
            .replace(/<body[^>]*>/gi, "")
            .replace(/<\/body>/gi, "")
            .replace(/<html[^>]*>/gi, "")
            .replace(/<\/html>/gi, "")
            .trim();

        editor.setComponents(cleanHtml);
        editor.setStyle(data.css || "");

        return data;
    }

    async savePage(editor, payload, storeUrl, method = "POST") {
        const response = await fetch(storeUrl, {
            method,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]',
                ).content,
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });

        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");

        if (!response.ok) {
            if (isJson) {
                const error = await response.json();
                throw new Error(error.message || "Error al guardar");
            }
            if (response.status === 401 || response.status === 419) {
                throw new Error("Tu sesión ha expirado. Recarga la página.");
            }
            throw new Error(`Error al guardar (${response.status})`);
        }

        if (!isJson) {
            throw new Error("Respuesta inesperada del servidor");
        }

        return await response.json();
    }

    getEditorContent(editor) {
        const projectData = editor.getProjectData();
        const html = editor.getHtml();

        const cleanHtml = html
            .replace(/<body[^>]*>/gi, "")
            .replace(/<\/body>/gi, "")
            .replace(/<html[^>]*>/gi, "")
            .replace(/<\/html>/gi, "")
            .trim();

        return {
            html_content: cleanHtml,
            css_content: editor.getCss(),
            js_content: editor.getJs() || "",
            components_json: JSON.stringify(projectData),
            styles_json: JSON.stringify(projectData.styles ?? []),
        };
    }

    markAsClean() {
        this.hasUnsavedChanges = false;
    }

    markAsDirty() {
        this.hasUnsavedChanges = true;
    }

    startNavigation() {
        this.isNavigating = true;
    }

    shouldPreventUnload() {
        return this.hasUnsavedChanges && !this.isNavigating;
    }
}
