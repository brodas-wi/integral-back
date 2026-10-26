import { registerFaqCore } from "./faq/core.js";
import { registerFaqModal } from "./faq/modal.js";

export function initializeFaqBlock(editor) {
    registerFaqCore(editor);
    registerFaqModal(editor);
}