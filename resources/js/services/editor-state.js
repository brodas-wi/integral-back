export class EditorState {
    constructor() {
        this.pageId = this.getElementValue("page-id");
        this.pageSlug = this.getElementValue("page-slug");
        this.pageTitle = this.getPageTitle();
        this.loadUrl = this.getElementValue("page-load-url");
        this.storeUrl = this.getElementValue("page-store-url");
        this.isPublished = this.getElementValue("page-is-published") === "1";
        this.isEditMode = Boolean(this.pageId);
        this.appUrl = (document.querySelector('meta[name="app-url"]')?.content ?? "").replace(/\/$/, "");
    }

    getElementValue(id, defaultValue = "") {
        const element = document.getElementById(id);
        return element ? element.value.trim() : defaultValue;
    }

    getPageTitle() {
        const titleElement = document.getElementById("editor-title");
        if (!titleElement) return "";

        const text = titleElement.textContent;
        const match = text.match(/(?:Editando:|Nueva Página)\s*(.+)?/);
        return match && match[1] ? match[1].trim() : "";
    }

    updatePageInfo(data) {
        if (data.page) {
            this.pageId = data.page.id;
            this.pageSlug = data.page.slug;
            this.pageTitle = data.page.title;
            this.isEditMode = true;

            document.getElementById("page-id").value = this.pageId;
            document.getElementById("page-slug").value = this.pageSlug;

            // Use server-provided URLs when available, otherwise build from appUrl
            if (data.page.update_url) {
                this.storeUrl = data.page.update_url;
            } else {
                this.storeUrl = `${this.appUrl}/pages/${this.pageSlug}`;
            }
            document.getElementById("page-store-url").value = this.storeUrl;

            if (data.page.load_url) {
                this.loadUrl = data.page.load_url;
            } else {
                this.loadUrl = `${this.appUrl}/pages/${this.pageSlug}/load`;
            }
            document.getElementById("page-load-url").value = this.loadUrl;

            if (data.page.edit_url) {
                window.history.replaceState(null, "", data.page.edit_url);
            } else {
                try {
                    const url = new URL(window.location.href);
                    url.pathname = url.pathname.replace(/\/pages\/create\/?$/, `/pages/${this.pageSlug}/edit`);
                    window.history.replaceState(null, "", url.toString());
                } catch (e) {
                    console.error("Error updating browser URL:", e);
                }
            }
        }
    }

    updateTitle(title) {
        this.pageTitle = title;
        const titleElement = document.getElementById("editor-title");
        if (titleElement) {
            titleElement.textContent = `Editando: ${title}`;
        }
        document.title = `Editar: ${title} - Editor`;
    }

    getHttpMethod() {
        return this.isEditMode ? "PUT" : "POST";
    }

    needsTitle() {
        return !this.isEditMode;
    }
}
