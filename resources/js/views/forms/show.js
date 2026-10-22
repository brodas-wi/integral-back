import { showNotification } from "@/utils/notifications.js";
import { copyText } from "@/utils/clipboard.js";

document.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;

    const copied = await copyText(button.dataset.copy);
    showNotification(copied ? "Copiado al portapapeles" : "No se pudo copiar", copied ? "success" : "error");
});