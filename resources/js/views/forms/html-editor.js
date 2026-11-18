import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { html } from "@codemirror/lang-html";
import { theme } from "./json-editor.js";

export function createHtmlEditor(parent, { value = "", onChange } = {}) {
    const view = new EditorView({
        parent,
        state: EditorState.create({
            doc: value,
            extensions: [
                basicSetup,
                html(),
                EditorView.lineWrapping,
                theme,
                EditorView.updateListener.of((update) => {
                    if (update.docChanged) onChange?.();
                }),
            ],
        }),
    });

    return {
        getValue: () => view.state.doc.toString(),
        setValue: (text) =>
            view.dispatch({
                changes: { from: 0, to: view.state.doc.length, insert: text },
            }),
        insert: (text) => {
            const range = view.state.selection.main;
            view.dispatch({
                changes: { from: range.from, to: range.to, insert: text },
                selection: { anchor: range.from + text.length },
            });
            view.focus();
        },
        refresh: () => view.requestMeasure(),
    };
}