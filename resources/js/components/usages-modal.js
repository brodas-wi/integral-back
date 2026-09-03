const TYPE_LABELS = {
    page: "Página",
    navbar: "Navbar",
    footer: "Footer",
    banner: "Banner",
    asset: "Activo Extraordinario",
    news: "Noticia",
};

export function showUsagesModal(usages, customMessage = null) {
    const existing = document.getElementById("media-usages-modal");
    if (existing) existing.remove();

    const overlay = document.createElement("div");
    overlay.id = "media-usages-modal";
    overlay.className = "mu-overlay";

    const modal = document.createElement("div");
    modal.className = "mu-modal";

    const header = document.createElement("div");
    header.className = "mu-header";

    const title = document.createElement("h2");
    title.className = "mu-title";
    title.textContent = "Dónde se usa este archivo";

    const closeBtn = document.createElement("button");
    closeBtn.className = "mu-close";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Cerrar");
    closeBtn.textContent = "×";

    header.appendChild(title);
    header.appendChild(closeBtn);
    modal.appendChild(header);

    if (customMessage) {
        const messageEl = document.createElement("div");
        messageEl.className = "mu-message";
        messageEl.textContent = customMessage;
        modal.appendChild(messageEl);
    }

    const list = document.createElement("ul");
    list.className = "mu-list";

    if (usages.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "mu-empty";
        emptyItem.textContent = "Este archivo no está en uso actualmente.";
        list.appendChild(emptyItem);
    } else {
        usages.forEach((usage) => {
            const item = document.createElement("li");
            item.className = "mu-list-item";

            const link = document.createElement("a");
            link.className = "mu-list-link";
            link.href = usage.url;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = usage.label;

            const typeLabel = document.createElement("span");
            typeLabel.className = "mu-list-type";
            typeLabel.textContent = `(${TYPE_LABELS[usage.type] || usage.type})`;

            item.appendChild(link);
            item.appendChild(typeLabel);
            list.appendChild(item);
        });
    }

    modal.appendChild(list);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    closeBtn.addEventListener("click", () => overlay.remove());
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.remove();
    });
}