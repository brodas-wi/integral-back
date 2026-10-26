import { registerContactCore } from "./contact/core.js";

export function initializeContactBlock(editor) {
    registerContactCore(editor);
}