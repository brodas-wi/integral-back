import { registerRequestChannelsCore } from "./request-channels/core.js";

export function initializeRequestChannelsBlock(editor) {
    registerRequestChannelsCore(editor);
}