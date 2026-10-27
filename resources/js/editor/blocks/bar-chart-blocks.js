import { registerBarChartCore } from "./bar-chart/core.js";
import { registerBarChartModal } from "./bar-chart/modal.js";

const registered = new WeakSet();

function setup(editor) {
    if (registered.has(editor)) return;
    registered.add(editor);
    registerBarChartCore(editor);
    registerBarChartModal(editor);
}

export function initializeBarChartSectionBlock(editor) {
    setup(editor);
}

export function initializeBarChartBlock(editor) {
    setup(editor);
}