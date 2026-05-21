import { initializeGrapesJS } from "./grapes-config";

export function initializeFooterGrapesJS() {
    // Reutiliza exactamente el mismo config incluyendo canvas styles
    const editor = initializeGrapesJS();
    return editor;
}
