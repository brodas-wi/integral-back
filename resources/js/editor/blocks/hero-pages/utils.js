import { DEFAULT_ICON } from "./defaults";

const HTML_ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
};

export const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

export const clone = (value) => JSON.parse(JSON.stringify(value));

export const getByPath = (source, path) =>
    path
        .split(".")
        .reduce((node, key) => (node == null ? undefined : node[key]), source);

export const setByPath = (source, path, value) => {
    const keys = path.split(".");
    const last = keys.pop();
    const target = keys.reduce((node, key) => node?.[key], source);
    if (target && typeof target === "object") target[last] = value;
};

export const safeHref = (value) => {
    const url = String(value ?? "").trim();
    if (!url) return "";
    if (url.startsWith("#")) return url;
    if (url.startsWith("/") && !url.startsWith("//")) return url;
    if (/^(https?:|mailto:|tel:)/i.test(url)) return url;
    return "";
};

export const safeSrc = (value) => {
    const url = String(value ?? "").trim();
    if (!url) return "";
    if (url.startsWith("/") && !url.startsWith("//")) return url;
    if (/^https?:\/\//i.test(url)) return url;
    return "";
};

export const safeIcon = (value) => {
    const icon = String(value ?? "").trim();
    return /^ri-[a-z0-9-]+$/.test(icon) ? icon : DEFAULT_ICON;
};