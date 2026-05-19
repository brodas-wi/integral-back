export class EditorState {
    constructor() {
        this.pageId = this.getElementValue("page-id");
        this.pageSlug = this.getElementValue("page-slug");
        this.pageTitle = this.getPageTitle();
        this.loadUrl = this.getElementValue("page-load-url");
        this.storeUrl = this.getElementValue("page-store-url");
        this.isEditMode = Boolean(this.pageId);
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

            const newEditUrl = this.storeUrl.replace(
                "/pages",
                `/pages/${this.pageSlug}`,
            );
            this.storeUrl = newEditUrl;
            document.getElementById("page-store-url").value = newEditUrl;

            this.loadUrl = `/pages/${this.pageSlug}/load`;
            document.getElementById("page-load-url").value = this.loadUrl;
        }
    }

    updateTitle(title) {
        this.pageTitle = title;
        const titleElement = document.getElementById("editor-title");
        if (titleElement) {
            titleElement.textContent = `Editando: ${title}`;
        }
    }

    getHttpMethod() {
        return this.isEditMode ? "PUT" : "POST";
    }

    needsTitle() {
        return !this.isEditMode;
    }
}
