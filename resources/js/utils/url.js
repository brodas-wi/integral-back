const _base = (() => {
    const meta = document.querySelector('meta[name="app-url"]');
    if (meta) return meta.content.replace(/\/$/, "");
    return window.location.origin;
})();

export function buildUrl(path) {
    return _base + "/" + path.replace(/^\//, "");
}
