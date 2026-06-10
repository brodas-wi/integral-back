import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { oneDark } from "@codemirror/theme-one-dark";

// ── Security patterns that are blocked by CSP ──────────────────────────────
const BLOCKED_PATTERNS = [
    { regex: /\bon\w+\s*=/i, label: "Atributos de eventos inline (onclick, onload, etc.)" },
    { regex: /javascript\s*:/i, label: "URLs con protocolo javascript:" },
    { regex: /document\.write\s*\(/i, label: "document.write() no permitido" },
    { regex: /<[^>]+\sstyle\s*=/i, label: "Atributos style inline en HTML" },
];

let jsEditor = null;
let cssEditor = null;
let currentType = "js";

document.addEventListener("DOMContentLoaded", function () {
    // Determine initial type from checked radio
    const checkedType = document.querySelector('.script-type-radio:checked');
    currentType = checkedType ? checkedType.value : "js";

    initEditors();
    initTypeSwitch();
    initScopeSwitch();
    initFormatButton();
    initHelpModal();
    initFormSubmit();
    initRadioCardStyles();
});

// ── Initialize CodeMirror editors ─────────────────────────────────────────
function initEditors() {
    const jsWrapper = document.getElementById("js-editor-wrapper");
    const cssWrapper = document.getElementById("css-editor-wrapper");
    const jsEditorEl = document.getElementById("js-editor");
    const cssEditorEl = document.getElementById("css-editor");

    if (jsEditorEl) {
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
                    ".cm-scroller": { overflow: "auto", fontFamily: "'Fira Code', 'Cascadia Code', monospace", fontSize: "13px" },
                }),
            ],
            parent: jsEditorEl,
        });

        // Initial security check
        checkSecurityWarnings(initialContent);
    }

    if (cssEditorEl) {
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
                    "&": { height: "380px" },
                    ".cm-scroller": { overflow: "auto", fontFamily: "'Fira Code', 'Cascadia Code', monospace", fontSize: "13px" },
                }),
            ],
            parent: cssEditorEl,
        });
    }
}

// ── Type switch (JS / CSS) ─────────────────────────────────────────────────
function initTypeSwitch() {
    document.querySelectorAll(".script-type-radio").forEach((radio) => {
        radio.addEventListener("change", function () {
            currentType = this.value;
            updateEditorVisibility();
            updateEditorTypeLabel();
        });
    });
}

function updateEditorVisibility() {
    const jsWrapper = document.getElementById("js-editor-wrapper");
    const cssWrapper = document.getElementById("css-editor-wrapper");

    if (currentType === "js") {
        jsWrapper?.classList.remove("hidden");
        cssWrapper?.classList.add("hidden");
        // Re-check security on switch
        const content = jsEditor?.state.doc.toString() || "";
        checkSecurityWarnings(content);
    } else {
        jsWrapper?.classList.add("hidden");
        cssWrapper?.classList.remove("hidden");
        // Hide security warning for CSS
        document.getElementById("security-warning")?.classList.add("hidden");
    }
}

function updateEditorTypeLabel() {
    const label = document.getElementById("editor-type-label");
    if (label) {
        label.textContent = currentType === "js" ? "JavaScript" : "CSS";
    }
}

// ── Scope switch (global / per_page) ──────────────────────────────────────
function initScopeSwitch() {
    document.querySelectorAll(".script-scope-radio").forEach((radio) => {
        radio.addEventListener("change", function () {
            const pageSelector = document.getElementById("page-selector");
            if (pageSelector) {
                if (this.value === "per_page") {
                    pageSelector.classList.remove("hidden");
                } else {
                    pageSelector.classList.add("hidden");
                }
            }
        });
    });
}

// ── Radio card visual styles ───────────────────────────────────────────────
function initRadioCardStyles() {
    // Type radios
    document.querySelectorAll(".script-type-radio").forEach((radio) => {
        radio.addEventListener("change", function () {
            document.querySelectorAll(".script-type-radio").forEach((r) => {
                const card = r.closest("label");
                if (card) {
                    card.classList.remove("border-primary", "bg-primary", "bg-opacity-5");
                    card.classList.add("border-gray-200");
                }
            });
            const card = this.closest("label");
            if (card) {
                card.classList.remove("border-gray-200");
                card.classList.add("border-primary", "bg-primary", "bg-opacity-5");
            }
        });
    });

    // Scope radios
    document.querySelectorAll(".script-scope-radio").forEach((radio) => {
        radio.addEventListener("change", function () {
            document.querySelectorAll(".script-scope-radio").forEach((r) => {
                const card = r.closest("label");
                if (card) {
                    card.classList.remove("border-primary", "bg-primary", "bg-opacity-5");
                    card.classList.add("border-gray-200");
                }
            });
            const card = this.closest("label");
            if (card) {
                card.classList.remove("border-gray-200");
                card.classList.add("border-primary", "bg-primary", "bg-opacity-5");
            }
        });
    });
}

// ── Security warnings ──────────────────────────────────────────────────────
function checkSecurityWarnings(content) {
    if (currentType !== "js") return;

    const warningEl = document.getElementById("security-warning");
    const detailEl = document.getElementById("security-warning-detail");
    if (!warningEl || !detailEl) return;

    const found = BLOCKED_PATTERNS.filter((p) => p.regex.test(content));

    if (found.length > 0) {
        detailEl.textContent = found.map((p) => `• ${p.label}`).join(" | ");
        warningEl.classList.remove("hidden");
    } else {
        warningEl.classList.add("hidden");
    }
}

// ── Format button ──────────────────────────────────────────────────────────
function initFormatButton() {
    const btn = document.getElementById("btn-format");
    if (!btn) return;

    btn.addEventListener("click", function () {
        if (currentType === "js" && jsEditor) {
            formatJsCode();
        } else if (currentType === "css" && cssEditor) {
            formatCssCode();
        }
    });
}

function formatJsCode() {
    if (!jsEditor) return;
    const content = jsEditor.state.doc.toString();

    try {
        // Basic JS formatting using indentation normalization
        const formatted = basicJsFormat(content);
        jsEditor.dispatch({
            changes: { from: 0, to: jsEditor.state.doc.length, insert: formatted },
        });
        const textarea = document.getElementById("js_content");
        if (textarea) textarea.value = formatted;
        showFormattedFeedback();
    } catch (e) {
        showNotification("No se pudo formatear el código.", "warning");
    }
}

function formatCssCode() {
    if (!cssEditor) return;
    const content = cssEditor.state.doc.toString();

    try {
        const formatted = basicCssFormat(content);
        cssEditor.dispatch({
            changes: { from: 0, to: cssEditor.state.doc.length, insert: formatted },
        });
        const textarea = document.getElementById("css_content");
        if (textarea) textarea.value = formatted;
        showFormattedFeedback();
    } catch (e) {
        showNotification("No se pudo formatear el código.", "warning");
    }
}

function basicJsFormat(code) {
    // Simple indentation-based formatter
    let result = "";
    let indent = 0;
    const lines = code.split("\n");

    for (let line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
            result += "\n";
            continue;
        }

        // Decrease indent before closing braces
        if (trimmed.startsWith("}") || trimmed.startsWith(")") || trimmed.startsWith("]")) {
            indent = Math.max(0, indent - 1);
        }

        result += "  ".repeat(indent) + trimmed + "\n";

        // Increase indent after opening braces
        const opens = (trimmed.match(/[{([]/g) || []).length;
        const closes = (trimmed.match(/[})\]]/g) || []).length;
        indent = Math.max(0, indent + opens - closes);
    }

    return result.trim();
}

function basicCssFormat(code) {
    // Simple CSS formatter
    return code
        .replace(/\s*{\s*/g, " {\n  ")
        .replace(/;\s*/g, ";\n  ")
        .replace(/\s*}\s*/g, "\n}\n")
        .replace(/,\s*([^}])/g, ",\n$1")
        .replace(/\n\s*\n\s*\n/g, "\n\n")
        .trim();
}

function showFormattedFeedback() {
    const btn = document.getElementById("btn-format");
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="ri-check-line mr-1"></i>Formateado';
    setTimeout(() => {
        btn.innerHTML = original;
    }, 2000);
}

// ── Help Modal ─────────────────────────────────────────────────────────────
function initHelpModal() {
    const openBtn = document.getElementById("btn-help");
    const closeBtn = document.getElementById("close-help-modal");
    const modal = document.getElementById("help-modal");

    if (openBtn && modal) {
        openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
    }
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
    }
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.add("hidden");
        });
    }
}

// ── Form submit: sync editors to textareas ─────────────────────────────────
function initFormSubmit() {
    const form = document.getElementById("scriptForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        // Sync CodeMirror content to hidden textareas
        if (jsEditor) {
            const ta = document.getElementById("js_content");
            if (ta) ta.value = jsEditor.state.doc.toString();
        }
        if (cssEditor) {
            const ta = document.getElementById("css_content");
            if (ta) ta.value = cssEditor.state.doc.toString();
        }

        // Warn if security issues detected
        if (currentType === "js" && jsEditor) {
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

// ── Notification helper ────────────────────────────────────────────────────
function showNotification(message, type = "info") {
    if (window.__notify) {
        window.__notify(message, type);
        return;
    }
    const colors = {
        success: "#16a34a",
        error: "#dc2626",
        warning: "#d97706",
        info: "#2563eb",
    };
    const toast = document.createElement("div");
    toast.style.cssText = `position:fixed;top:20px;right:20px;z-index:9999;background:${colors[type] || colors.info};color:white;padding:12px 20px;border-radius:8px;font-size:14px;box-shadow:0 4px 12px rgba(0,0,0,0.15);max-width:360px;`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}
