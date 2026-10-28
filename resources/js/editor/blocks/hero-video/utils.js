const HTML_ESCAPES = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
};

export const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (char) => HTML_ESCAPES[char]);

export const safeHref = (value) => {
    const url = String(value ?? "").trim();
    if (!url) return "#";
    if (url.startsWith("#")) return url;
    if (url.startsWith("/") && !url.startsWith("//")) return url;
    if (/^(https?:|mailto:|tel:)/i.test(url)) return url;
    return "#";
};

export const safeSrc = (value) => {
    const url = String(value ?? "").trim();
    if (!url) return "";
    if (url.startsWith("/") && !url.startsWith("//")) return url;
    if (/^https?:\/\//i.test(url)) return url;
    return "";
};