import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
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
    "&": { maxHeight: "420px", fontSize: "13px", backgroundColor: "#ffffff" },
    "&.cm-focused": { outline: "none" },
    ".cm-scroller": {
        overflow: "auto",
        minHeight: "160px",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
    },
    ".cm-gutters": { backgroundColor: "#f8fafc", color: "#94a3b8", borderRight: "1px solid #e2e8f0" },
});

const FIELD_PATTERN = /\{\{\s*(?:#if\s+)?([a-z][a-z0-9_]*)\s*\}\}/g;
const IF_PATTERN = /\{\{\s*#if\s+([a-z][a-z0-9_]*)\s*\}\}/g;

const form = document.getElementById("bt-form");
const frame = document.getElementById("bt-preview-frame");
const iconInput = document.getElementById("bt-icon");
const iconFile = document.getElementById("bt-icon-file");
const iconPreview = document.getElementById("bt-icon-preview");
const iconPick = document.getElementById("bt-icon-pick");
const iconClear = document.getElementById("bt-icon-clear");
const iconName = document.getElementById("bt-icon-name");
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
    const valid = svg.startsWith("<svg");

    iconPreview.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(valid ? svg : DEFAULT_ICON)}`;
    iconClear.classList.toggle("hidden", !valid);

    if (!valid) {
        delete iconName.dataset.file;
        iconName.textContent = "Se usa el icono por defecto";
    } else if (!iconName.dataset.file) {
        iconName.textContent = "Icono personalizado";
    }
}

async function formatEditor(name, button) {
    const source = getValue(name);
    if (!source.trim()) return;

    button.disabled = true;
    try {
        const [prettier, plugin] = await Promise.all([
            import("prettier/standalone"),
            name === "html" ? import("prettier/plugins/html") : import("prettier/plugins/postcss"),
        ]);
        const formatted = await prettier.format(source, {
            parser: name,
            plugins: [plugin],
            printWidth: 100,
            tabWidth: 4,
        });
        setValue(name, formatted.trimEnd());
    } catch (error) {
        console.error("[BlockTemplates] Error al formatear:", error);
        window.alert("No se pudo formatear. Revisa que el código no tenga errores de sintaxis.");
    } finally {
        button.disabled = false;
    }
}

const normalize = (text) =>
    text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, " ");

function distance(a, b) {
    const row = Array.from({ length: b.length + 1 }, (_, index) => index);
    for (let i = 1; i <= a.length; i++) {
        let previous = row[0];
        row[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const current = row[j];
            row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
            previous = current;
        }
    }
    return row[b.length];
}

function initCategory() {
    const field = form.querySelector("[data-category-field]");
    if (!field) return;

    const input = field.querySelector("input");
    const list = field.querySelector("[data-category-list]");
    const hint = field.querySelector("[data-category-hint]");
    let categories = [];
    let matches = [];
    let active = -1;

    try {
        categories = JSON.parse(field.dataset.categories || "[]");
    } catch {
        categories = [];
    }

    const render = () => {
        list.replaceChildren(
            ...matches.map((category, index) => {
                const item = document.createElement("div");
                item.dataset.index = String(index);
                item.className =
                    "cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" + (index === active ? " bg-gray-100" : "");
                item.textContent = category;
                return item;
            })
        );
        list.hidden = matches.length === 0;
    };

    const open = () => {
        const query = normalize(input.value);
        matches = categories.filter((category) => category !== input.value.trim() && normalize(category).includes(query));
        active = -1;
        render();
    };

    const hide = () => {
        list.hidden = true;
        active = -1;
    };

    const select = (category) => {
        input.value = category;
        hint.hidden = true;
        hide();
    };

    const checkSimilar = () => {
        const value = input.value.trim();
        const current = normalize(value);
        hint.hidden = true;
        if (!value || categories.includes(value)) return;

        const similar = categories.find((category) => {
            const candidate = normalize(category);
            return candidate === current || (current.length >= 4 && distance(candidate, current) <= 2);
        });
        if (!similar) return;

        const use = document.createElement("button");
        use.type = "button";
        use.className = "font-semibold underline";
        use.textContent = `usar «${similar}»`;
        use.addEventListener("click", () => select(similar));

        hint.replaceChildren("Ya existe una categoría parecida: ", use, ". Puedes mantener la tuya si es distinta.");
        hint.hidden = false;
    };

    list.addEventListener("mousedown", (event) => {
        const item = event.target.closest("[data-index]");
        if (!item) return;
        event.preventDefault();
        select(matches[Number(item.dataset.index)]);
    });

    input.addEventListener("focus", open);
    input.addEventListener("input", open);
    input.addEventListener("blur", hide);
    input.addEventListener("change", checkSimilar);
    input.addEventListener("keydown", (event) => {
        if (list.hidden) return;
        if (event.key === "ArrowDown") {
            event.preventDefault();
            active = (active + 1) % matches.length;
            render();
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            active = (active - 1 + matches.length) % matches.length;
            render();
        } else if (event.key === "Enter" && active >= 0) {
            event.preventDefault();
            select(matches[active]);
        } else if (event.key === "Escape") {
            hide();
        }
    });
}

function init() {
    form.querySelectorAll("textarea[data-cm]").forEach((textarea) => {
        views[textarea.name] = mountEditor(textarea);
    });

    form.querySelectorAll('[name="mode"]').forEach((radio) => radio.addEventListener("change", applyMode));
    form.querySelectorAll("[data-format]").forEach((button) => {
        button.addEventListener("click", () => formatEditor(button.dataset.format, button));
    });
    initCategory();
    document.getElementById("bt-detect")?.addEventListener("click", detectFields);
    document.getElementById("bt-refresh")?.addEventListener("click", renderPreview);

    iconInput.addEventListener("input", () => {
        delete iconName.dataset.file;
        updateIcon();
    });
    iconPick.addEventListener("click", () => iconFile.click());
    iconClear.addEventListener("click", () => {
        iconInput.value = "";
        iconFile.value = "";
        updateIcon();
    });
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
            iconName.dataset.file = file.name;
            iconName.textContent = file.name;
            updateIcon();
        };
        reader.readAsText(file);
    });

    updateIcon();
    applyMode();
    renderPreview();
}

if (form) init();