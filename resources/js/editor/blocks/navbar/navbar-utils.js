export const clone = (value) => JSON.parse(JSON.stringify(value));

const HTML_ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
};

export const escapeHtml = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

export const createUid = () => "nb" + Math.random().toString(36).slice(2, 7);

export const getByPath = (source, path) =>
    path
        .split(".")
        .reduce((node, key) => (node == null ? undefined : node[key]), source);

export const setByPath = (source, path, value) => {
    const keys = path.split(".");
    const last = keys.pop();
    const target = keys.reduce((node, key) => node[key], source);
    target[last] = value;
};