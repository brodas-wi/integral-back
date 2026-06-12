import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";
import { showNotification } from "@/utils/notifications.js";
const BLOCKED_PATTERNS = [
    { regex: /\bon\w+\s*=/i,          label: "Atributos de eventos inline (onclick, onload, etc.)" },
    { regex: /javascript\s*:/i,       label: "URLs con protocolo javascript:" },
    { regex: /document\.write\s*\(/i, label: "document.write() no permitido" },
    { regex: /<[^>]+\sstyle\s*=/i,    label: "Atributos style inline en HTML" },
];

let jsEditor  = null;
let cssEditor = null;
let cssEditorInitialized = false;

document.addEventListener("DOMContentLoaded", function () {
    initJsEditor();
    initCssToggle();
    initScopeSwitch();
    initOptionCardStyles();
    initFormatButtons();
    initHelpModal();
    initFormSubmit();
    const cssSection = document.getElementById("css-editor-section");
    if (cssSection && !cssSection.classList.contains("hidden")) {
        initCssEditor();
    }
});
function initJsEditor() {
    const jsEditorEl = document.getElementById("js-editor");
    if (!jsEditorEl) return;

    const initialContent =
        jsEditorEl.dataset.content ||
        document.getElementById("js_content")?.value ||
        "";

    jsEditor = new EditorView({
        doc: initialContent,
        extensions: [
            basicSetup,
            javascript(),
            oneDark,
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    const content = update.state.doc.toString();
                    const textarea = document.getElementById("js_content");
                    if (textarea) textarea.value = content;
                    checkSecurityWarnings(content);
                }
            }),
            EditorView.theme({
                "&": { height: "380px" },
                ".cm-scroller": {
                    overflow: "auto",
                    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                    fontSize: "13px",
                },
            }),
        ],
        parent: jsEditorEl,
    });
    checkSecurityWarnings(initialContent);
}
function initCssEditor() {
    if (cssEditorInitialized) return;

    const cssEditorEl = document.getElementById("css-editor");
    if (!cssEditorEl) return;

    const initialContent =
        cssEditorEl.dataset.content ||
        document.getElementById("css_content")?.value ||
        "";

    cssEditor = new EditorView({
        doc: initialContent,
        extensions: [
            basicSetup,
            css(),
            oneDark,
            EditorView.updateListener.of((update) => {
                if (update.docChanged) {
                    const content = update.state.doc.toString();
                    const textarea = document.getElementById("css_content");
                    if (textarea) textarea.value = content;
                }
            }),
            EditorView.theme({
                "&": { height: "320px" },
                ".cm-scroller": {
                    overflow: "auto",
                    fontFamily: "'Fira Code', 'Cascadia Code', monospace",
                    fontSize: "13px",
                },
            }),
        ],
        parent: cssEditorEl,
    });

    cssEditorInitialized = true;
}
function initCssToggle() {
    const btn       = document.getElementById("btn-toggle-css");
    const section   = document.getElementById("css-editor-section");
    const icon      = document.getElementById("css-toggle-icon");
    const label     = document.getElementById("css-toggle-label");
    const cssTA     = document.getElementById("css_content");

    if (!btn || !section) return;

    btn.addEventListener("click", function () {
        const isHidden = section.classList.contains("hidden");

        if (isHidden) {
            section.classList.remove("hidden");
            if (icon)  { icon.className  = "ri-subtract-line"; }
            if (label) { label.textContent = "Quitar CSS"; }
            initCssEditor();
        } else {
            section.classList.add("hidden");
            if (icon)  { icon.className  = "ri-add-line"; }
            if (label) { label.textContent = "Agregar CSS"; }
            if (cssTA) cssTA.value = "";
            if (cssEditor) {
                cssEditor.dispatch({
                    changes: { from: 0, to: cssEditor.state.doc.length, insert: "" },
                });
            }
        }
    });
}
function initScopeSwitch() {
    document.querySelectorAll(".script-scope-radio").forEach((radio) => {
        radio.addEventListener("change", function () {
            const pageSelector = document.getElementById("page-selector");
            if (pageSelector) {
                pageSelector.classList.toggle("hidden", this.value !== "per_page");
            }
        });
    });
}
function initOptionCardStyles() {
    document.querySelectorAll(".script-scope-radio").forEach((radio) => {
        radio.addEventListener("change", function () {
            document.querySelectorAll(".script-scope-radio").forEach((r) => {
                r.closest("label")?.classList.remove("script-option-selected");
            });
            this.closest("label")?.classList.add("script-option-selected");
        });
    });
    const reviewCheckbox = document.getElementById("submit_for_review");
    if (reviewCheckbox) {
        reviewCheckbox.addEventListener("change", function () {
            const card = this.closest("label");
            if (card) {
                card.classList.toggle("script-option-selected", this.checked);
            }
        });
    }
}
function checkSecurityWarnings(content) {
    const warningEl = document.getElementById("security-warning");
    const detailEl  = document.getElementById("security-warning-detail");
    if (!warningEl || !detailEl) return;

    const found = BLOCKED_PATTERNS.filter((p) => p.regex.test(content));

    if (found.length > 0) {
        detailEl.textContent = found.map((p) => `• ${p.label}`).join(" | ");
        warningEl.classList.remove("hidden");
    } else {
        warningEl.classList.add("hidden");
    }
}
function initFormatButtons() {
    const btnJs = document.getElementById("btn-format-js");
    if (btnJs) {
        btnJs.addEventListener("click", function () {
            if (!jsEditor) return;
            try {
                const formatted = basicJsFormat(jsEditor.state.doc.toString());
                jsEditor.dispatch({
                    changes: { from: 0, to: jsEditor.state.doc.length, insert: formatted },
                });
                const ta = document.getElementById("js_content");
                if (ta) ta.value = formatted;
                showFormatFeedback(btnJs);
            } catch (e) {
                showNotification("No se pudo formatear el JavaScript.", "warning");
            }
        });
    }
    const btnCss = document.getElementById("btn-format-css");
    if (btnCss) {
        btnCss.addEventListener("click", function () {
            if (!cssEditor) return;
            try {
                const formatted = basicCssFormat(cssEditor.state.doc.toString());
                cssEditor.dispatch({
                    changes: { from: 0, to: cssEditor.state.doc.length, insert: formatted },
                });
                const ta = document.getElementById("css_content");
                if (ta) ta.value = formatted;
                showFormatFeedback(btnCss);
            } catch (e) {
                showNotification("No se pudo formatear el CSS.", "warning");
            }
        });
    }
}

function basicJsFormat(code) {
    let result = "";
    let indent = 0;
    for (let line of code.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed) { result += "\n"; continue; }
        if (trimmed.startsWith("}") || trimmed.startsWith(")") || trimmed.startsWith("]")) {
            indent = Math.max(0, indent - 1);
        }
        result += "  ".repeat(indent) + trimmed + "\n";
        const opens  = (trimmed.match(/[{([]/g) || []).length;
        const closes = (trimmed.match(/[})\]]/g) || []).length;
        indent = Math.max(0, indent + opens - closes);
    }
    return result.trim();
}

function basicCssFormat(code) {
    return code
        .replace(/\s*{\s*/g, " {\n  ")
        .replace(/;\s*/g, ";\n  ")
        .replace(/\s*}\s*/g, "\n}\n")
        .replace(/,\s*([^}])/g, ",\n$1")
        .replace(/\n\s*\n\s*\n/g, "\n\n")
        .trim();
}

function showFormatFeedback(btn) {
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="ri-check-line mr-1"></i>Formateado';
    setTimeout(() => { btn.innerHTML = original; }, 2000);
}
function initHelpModal() {
    const openBtn  = document.getElementById("btn-help");
    const closeBtn = document.getElementById("close-help-modal");
    const modal    = document.getElementById("help-modal");

    openBtn?.addEventListener("click",  () => modal?.classList.remove("hidden"));
    closeBtn?.addEventListener("click", () => modal?.classList.add("hidden"));
    modal?.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
    });
}
function initFormSubmit() {
    const form = document.getElementById("scriptForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        if (jsEditor) {
            const ta = document.getElementById("js_content");
            if (ta) ta.value = jsEditor.state.doc.toString();
        }
        const cssSection = document.getElementById("css-editor-section");
        if (cssEditor && cssSection && !cssSection.classList.contains("hidden")) {
            const ta = document.getElementById("css_content");
            if (ta) ta.value = cssEditor.state.doc.toString();
        }
        if (jsEditor) {
            const content = jsEditor.state.doc.toString();
            const found = BLOCKED_PATTERNS.filter((p) => p.regex.test(content));
            if (found.length > 0) {
                const proceed = confirm(
                    "⚠️ Se detectaron patrones que pueden ser bloqueados por los headers de seguridad:\n\n" +
                    found.map((p) => `• ${p.label}`).join("\n") +
                    "\n\n¿Deseas guardar de todas formas?"
                );
                if (!proceed) {
                    e.preventDefault();
                    return;
                }
            }
        }
    });
}

