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
                const htmlComponents = (data.html || "").match(
                    /<section|<div class="ss-section/g,
                );
                const jsonComponents =
                    projectData?.pages?.[0]?.frames?.[0]?.component?.components;

                if (
                    jsonComponents &&
                    htmlComponents &&
                    jsonComponents.length >= htmlComponents.length
                ) {
                    editor.loadProjectData(projectData);
                    return data;
                }
            } catch { }
        }

        const html = data.html || "";
        const cleanHtml = html
            .replace(/<body[^>]*>/gi, "")
            .replace(/<\/body>/gi, "")
            .replace(/<html[^>]*>/gi, "")
            .replace(/<\/html>/gi, "")
            .trim();

        await new Promise((resolve) => setTimeout(resolve, 50));
        editor.setComponents(cleanHtml);
        editor.setStyle(data.css || "");

        return data;
    }

    async savePage(editor, payload, storeUrl, method = "POST") {
        this.backupLocally(payload, storeUrl);

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
                const sessionError = new Error("SESSION_EXPIRED");
                sessionError.isSessionExpired = true;
                throw sessionError;
            }
            throw new Error(`Error al guardar (${response.status})`);
        }

        if (!isJson) {
            throw new Error("Respuesta inesperada del servidor");
        }

        this.clearBackup(storeUrl);
        return await response.json();
    }

    backupLocally(payload, storeUrl) {
        try {
            localStorage.setItem(
                `editor_backup_${storeUrl}`,
                JSON.stringify({ payload, timestamp: Date.now() }),
            );
        } catch (e) {
            console.warn("No se pudo crear backup local:", e);
        }
    }

    clearBackup(storeUrl) {
        try {
            localStorage.removeItem(`editor_backup_${storeUrl}`);
        } catch { }
    }

    static getBackup(storeUrl) {
        try {
            const raw = localStorage.getItem(`editor_backup_${storeUrl}`);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
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

        const extractedScripts = [];
        const htmlWithoutScripts = cleanHtml.replace(
            /<script[^>]*>([\s\S]*?)<\/script>/gi,
            (_, content) => {
                if (content.trim()) extractedScripts.push(content.trim());
                return "";
            },
        );

        const editorJs = editor.getJs() || "";
        const combinedJs = [editorJs, ...extractedScripts]
            .filter(Boolean)
            .join("\n");

        return {
            html_content: htmlWithoutScripts,
            css_content: editor.getCss(),
            js_content: combinedJs,
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
