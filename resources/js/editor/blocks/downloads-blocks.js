import { registerDownloadsCore } from "./downloads/core.js";
import { registerDownloadsModal } from "./downloads/modal.js";

export function initializeDownloadsBlock(editor) {
    registerDownloadsCore(editor);
    registerDownloadsModal(editor);
}