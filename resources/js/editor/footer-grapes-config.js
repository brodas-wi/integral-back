import { initializeGrapesJS } from "./grapes-config";

export function initializeFooterGrapesJS() {
    // Reutilizar exactamente la misma configuración del editor de páginas
    return initializeGrapesJS();
}
