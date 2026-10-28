import { registerSearchCore } from "./search/core.js";

export function initializeSearchBlock(editor) {
    registerSearchCore(editor);
}