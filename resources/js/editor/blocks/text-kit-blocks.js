import { registerTextKitCore } from "./text-kit/core.js";

export function initializeTextKitBlock(editor) {
    registerTextKitCore(editor);
}