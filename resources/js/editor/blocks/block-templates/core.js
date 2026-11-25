export const COMPONENT_TYPE = "block-template-component";
export const FIELD_TYPES = ["text", "textarea", "url", "image", "video", "color", "number", "select", "toggle"];

export const DEFAULT_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
    <rect x="6" y="6" width="20" height="20" rx="3" fill="none" stroke="#E97300" stroke-width="1.5"/>
    <path d="M16 11v10M11 16h10" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

const KEY_PATTERN = /^[a-z][a-z0-9_]{0,39}$/;
const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
const SELECTOR_SPLIT = /,(?![^()]*\))/;

export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);
export const createUid = () => "bt" + Math.random().toString(36).slice(2, 8);

const safeUrl = (value) => {
    const url = String(value ?? "").trim();
    return /^(https?:\/\/|mailto:|tel:|\/|#|\.{1,2}\/|\?)/i.test(url) || /^[\w\-./%]+$/.test(url) ? url : "";
};

const coerce = (field, value) => {
    switch (field.type) {
        case "toggle":
            return value === true || value === "true" || value === 1;
        case "number": {
            const number = Number(value);
            return Number.isFinite(number) ? number : Number(field.default) || 0;
        }
        case "select":
            return field.options.includes(value) ? value : (field.options[0] ?? "");
        case "color":
            return /^#[0-9a-f]{3,8}$/i.test(value) ? value : String(field.default ?? "");
        case "url":
        case "image":
        case "video":
            return safeUrl(value);
        default:
            return String(value ?? "").slice(0, 5000);
    }
};

export function normalizeSchema(raw) {
    if (!Array.isArray(raw)) return [];
    const seen = new Set();
    return raw.reduce((fields, item) => {
        const key = String(item?.key ?? "");
        if (!KEY_PATTERN.test(key) || key === "uid" || seen.has(key) || !FIELD_TYPES.includes(item.type)) return fields;
        seen.add(key);
        fields.push({
            key,
            type: item.type,
            label: String(item.label || key).slice(0, 80),
            hint: String(item.hint || "").slice(0, 200),
            options: Array.isArray(item.options) ? item.options.map(String) : [],
            default: item.default,
        });
        return fields;
    }, []);
}

export function normalizeDefinition(raw) {
    if (!raw || !/^[a-z0-9-]+$/.test(raw.slug ?? "")) return null;
    return {
        slug: raw.slug,
        name: String(raw.name || raw.slug),
        category: String(raw.category || "Personalizados"),
        description: String(raw.description || ""),
        mode: raw.mode === "managed" ? "managed" : "static",
        html: String(raw.html ?? ""),
        css: String(raw.css ?? ""),
        js: String(raw.js ?? ""),
        schema: normalizeSchema(raw.schema),
        icon_svg: typeof raw.icon_svg === "string" ? raw.icon_svg : "",
        version: Number(raw.version) || 1,
    };
}

export function mergeData(schema, input) {
    const source = input && typeof input === "object" ? input : {};
    return schema.reduce((data, field) => {
        data[field.key] = coerce(field, source[field.key] ?? field.default);
        return data;
    }, {});
}

export function renderTemplate(source, data, uid) {
    const conditioned = source.replace(
        /\{\{\s*#if\s+([a-z][a-z0-9_]*)\s*\}\}([\s\S]*?)\{\{\s*\/if\s*\}\}/g,
        (_, key, body) => (data[key] ? body : "")
    );
    return conditioned.replace(/\{\{\s*([a-z][a-z0-9_]*)\s*\}\}/g, (_, key) => (key === "uid" ? uid : esc(data[key])));
}

function scopeRules(rules, prefix) {
    Array.from(rules).forEach((rule) => {
        if (rule instanceof CSSStyleRule) {
            rule.selectorText = rule.selectorText
                .split(SELECTOR_SPLIT)
                .map((selector) => `${prefix} ${selector.trim()}`)
                .join(", ");
        } else if (rule.cssRules) {
            scopeRules(rule.cssRules, prefix);
        }
    });
}

export function scopeCss(source, slug) {
    if (!source) return "";
    try {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(source);
        scopeRules(sheet.cssRules, `[data-bt="${slug}"]`);
        return Array.from(sheet.cssRules).map((rule) => rule.cssText).join("\n");
    } catch {
        return source;
    }
}

export function iconMedia(svg) {
    const source = typeof svg === "string" && svg.trim().startsWith("<svg") ? svg.trim() : DEFAULT_ICON;
    return `<img src="data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}" width="32" height="32" alt="">`;
}

export const scriptOf = (def) =>
    def.mode === "managed" && def.js ? `try{${def.js}\n}catch(error){console.error("[BlockTemplate]",error);}` : "";

export function readConfig(component) {
    const raw = component.getAttributes()["data-bt-config"];
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function lockChildren(component) {
    component.components().forEach((child) => {
        child.set({
            selectable: false,
            hoverable: false,
            editable: false,
            highlightable: false,
            draggable: false,
            removable: false,
            copyable: false,
            droppable: false,
            layerable: false,
        });
        lockChildren(child);
    });
}

function purgeRules(editor, slug) {
    const rules = editor.Css.getAll();
    const marker = `[data-bt="${slug}"]`;
    rules.filter((rule) => rule.selectorsToString().includes(marker)).forEach((rule) => rules.remove(rule));
}

function buildInner(def, data, uid) {
    const style = def.css ? `<style>${scopeCss(def.css, def.slug)}</style>` : "";
    return `${renderTemplate(def.html, data, uid)}${style}`;
}

export function decorate(component, def) {
    lockChildren(component);
    component.set({ name: def.name, script: scriptOf(def) });
}

export function applyConfig(editor, component, def, rawData) {
    const data = mergeData(def.schema, rawData);
    const uid = component.getAttributes()["data-bt-uid"] || createUid();

    purgeRules(editor, def.slug);
    component.addAttributes({
        "data-bt": def.slug,
        "data-bt-uid": uid,
        "data-bt-config": JSON.stringify(data),
        "data-bt-version": String(def.version),
    });
    component.components(buildInner(def, data, uid));
    decorate(component, def);

    return data;
}