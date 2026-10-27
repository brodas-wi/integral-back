import { registerOfficialChannelsCore } from "./official-channels/core.js";

export function initializeOfficialChannelsBlock(editor) {
    registerOfficialChannelsCore(editor);
}