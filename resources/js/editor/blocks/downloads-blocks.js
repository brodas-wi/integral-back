import { registerDownloadsCore } from "./downloads/core.js";

export function initializeDownloadsBlock(editor) {
    registerDownloadsCore(editor);
}