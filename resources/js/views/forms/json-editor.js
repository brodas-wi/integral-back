import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter, lintGutter } from "@codemirror/lint";

const theme = EditorView.theme({
    "&": {
        maxHeight: "32rem",
        minHeight: "12rem",
        fontSize: "12px",
        border: "1px solid #e5e7eb",
        borderRadius: "1rem",
        overflow: "hidden",
        backgroundColor: "#fff",
    },
    "&.cm-focused": { outline: "2px solid rgba(240, 135, 42, 0.45)" },
    ".cm-scroller": {
        overflow: "auto",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        lineHeight: "1.6",
    },
    ".cm-gutters": {
        backgroundColor: "#f9fafb",
        borderRight: "1px solid #e5e7eb",
        color: "#9ca3af",
    },
});

export function createJsonEditor(parent, { value = "", onChange } = {}) {
    const view = new EditorView({
        parent,
        state: EditorState.create({
            doc: value,
            extensions: [
                basicSetup,
                json(),
                linter(jsonParseLinter()),
                lintGutter(),
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
        refresh: () => view.requestMeasure(),
    };
}