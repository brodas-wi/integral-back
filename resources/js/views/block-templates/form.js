import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
import { css as cssLanguage } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter, lintGutter } from "@codemirror/lint";
import { DEFAULT_ICON, mergeData, normalizeSchema, renderTemplate, scopeCss } from "@/editor/blocks/block-templates/core";

const LANGUAGES = {
    html: [],
    css: [cssLanguage()],
    js: [javascript()],
    json: [json(), linter(jsonParseLinter()), lintGutter()],
};

const THEME = EditorView.theme({
    "&": { maxHeight: "420px", fontSize: "13px" },
    ".cm-scroller": { overflow: "auto", minHeight: "160px" },
});

const FIELD_PATTERN = /\{\{\s*(?:#if\s+)?([a-z][a-z0-9_]*)\s*\}\}/g;
const IF_PATTERN = /\{\{\s*#if\s+([a-z][a-z0-9_]*)\s*\}\}/g;

const form = document.getElementById("bt-form");
const frame = document.getElementById("bt-preview-frame");
const iconInput = document.getElementById("bt-icon");
const iconFile = document.getElementById("bt-icon-file");
const iconPreview = document.getElementById("bt-icon-preview");
const views = {};
let previewTimer = null;

function mountEditor(textarea) {
    const host = document.createElement("div");
    host.className = "overflow-hidden rounded-lg border border-slate-200";
    textarea.after(host);
    textarea.hidden = true;
    const locked = textarea.readOnly;

    return new EditorView({
        parent: host,
        state: EditorState.create({
            doc: textarea.value,
            extensions: [
                basicSetup,
                oneDark,
                THEME,
                ...(LANGUAGES[textarea.dataset.cm] ?? []),
                EditorState.readOnly.of(locked),
                EditorView.editable.of(!locked),
                EditorView.updateListener.of((update) => {
                    if (!update.docChanged) return;
                    textarea.value = update.state.doc.toString();
                    schedulePreview();
                }),
            ],
        }),
    });
}

const getValue = (name) => views[name]?.state.doc.toString() ?? "";

function setValue(name, text) {
    const view = views[name];
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
}

const currentMode = () => form.querySelector('[name="mode"]:checked')?.value ?? "static";

function applyMode() {
    const managed = currentMode() === "managed";
    form.querySelectorAll("[data-managed-only]").forEach((element) => {
        element.hidden = !managed;
    });
    schedulePreview();
}

const guessType = (key, isToggle) => {
    if (isToggle || /^(show|has|is|use|enable)_/.test(key)) return "toggle";
    if (/(image|img|poster|photo|foto|imagen)/.test(key)) return "image";
    if (/video/.test(key)) return "video";
    if (/(url|link|href|enlace)/.test(key)) return "url";
    if (/(description|content|body|descripcion|contenido)/.test(key)) return "textarea";
    if (/color/.test(key)) return "color";
    return "text";
};

const labelOf = (key) => key.replace(/_/g, " ").replace(/^./, (char) => char.toUpperCase());

function detectFields() {
    const source = getValue("html");
    const toggles = new Set([...source.matchAll(IF_PATTERN)].map((match) => match[1]));
    const keys = [...new Set([...source.matchAll(FIELD_PATTERN)].map((match) => match[1]))].filter((key) => key !== "uid");

    let current = [];
    try {
        const parsed = JSON.parse(getValue("schema") || "[]");
        current = Array.isArray(parsed) ? parsed : [];
    } catch {
        current = [];
    }

    const known = new Map(current.map((field) => [field.key, field]));
    const fields = keys.map((key) => {
        if (known.has(key)) return known.get(key);
        const type = guessType(key, toggles.has(key));
        return { key, label: labelOf(key), type, default: type === "toggle" ? false : "" };
    });

    setValue("schema", JSON.stringify(fields, null, 2));
}

function buildPreview() {
    const html = getValue("html");
    const cssText = getValue("css");
    let body = html;
    let styles = cssText;
    let script = "";

    if (currentMode() === "managed") {
        let raw = [];
        try {
            raw = JSON.parse(getValue("schema") || "[]");
        } catch {
            raw = [];
        }
        const data = mergeData(normalizeSchema(raw), {});
        const js = getValue("js").replace(/<\/script/gi, "<\\/script");
        body = `<div id="bt-preview" data-bt="preview">${renderTemplate(html, data, "preview")}</div>`;
        styles = scopeCss(cssText, "preview");
        script = js
            ? `<script>try{(function(){${js}\n}).call(document.getElementById("bt-preview"))}catch(error){console.error(error)}</script>`
            : "";
    }

    return `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;font-family:Inter,system-ui,sans-serif}${styles}</style></head><body>${body}${script}</body></html>`;
}

function renderPreview() {
    frame.srcdoc = buildPreview();
}

function schedulePreview() {
    clearTimeout(previewTimer);
    previewTimer = setTimeout(renderPreview, 400);
}

function updateIcon() {
    const svg = iconInput.value.trim();
    const source = svg.startsWith("<svg") ? svg : DEFAULT_ICON;
    iconPreview.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
}

function init() {
    form.querySelectorAll("textarea[data-cm]").forEach((textarea) => {
        views[textarea.name] = mountEditor(textarea);
    });

    form.querySelectorAll('[name="mode"]').forEach((radio) => radio.addEventListener("change", applyMode));
    document.getElementById("bt-detect")?.addEventListener("click", detectFields);
    document.getElementById("bt-refresh")?.addEventListener("click", renderPreview);

    iconInput.addEventListener("input", updateIcon);
    iconFile.addEventListener("change", () => {
        const file = iconFile.files?.[0];
        if (!file) return;

        const isSvg = file.type === "image/svg+xml" || /\.svg$/i.test(file.name);
        if (!isSvg || file.size > 20000) {
            window.alert("Selecciona un archivo .svg de máximo 20 KB.");
            iconFile.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            const svg = String(reader.result ?? "")
                .replace(/<\?xml[\s\S]*?\?>/gi, "")
                .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
                .replace(/<!--[\s\S]*?-->/g, "")
                .trim();

            if (!svg.startsWith("<svg")) {
                window.alert("El archivo no contiene un SVG válido.");
                iconFile.value = "";
                return;
            }

            iconInput.value = svg;
            updateIcon();
        };
        reader.readAsText(file);
    });

    updateIcon();
    applyMode();
    renderPreview();
}

if (form) init();