import { initializeGrapesJS } from "./grapes-config";

export function initializeNavbarGrapesJS() {
    // Reutiliza exactamente el mismo config incluyendo canvas styles
    const editor = initializeGrapesJS();
    return editor;
}
