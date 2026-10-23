import { registerSplitCarouselCore } from "./split-carousel/core.js";
import { registerSplitCarouselModal } from "./split-carousel/modal.js";

export function initializeSplitCarouselBlock(editor) {
    registerSplitCarouselCore(editor);
    registerSplitCarouselModal(editor);
}