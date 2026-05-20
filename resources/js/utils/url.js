const _base = (() => {
    const meta = document.querySelector('meta[name="app-url"]');
    if (meta) return meta.content.replace(/\/$/, "");
    return window.location.origin;
})();

const _assetBase = (() => {
    const meta = document.querySelector('meta[name="asset-url"]');
    if (meta) return meta.content.replace(/\/$/, "");
    return _base;
})();

export function buildUrl(path) {
    return _base + "/" + path.replace(/^\//, "");
}

export function assetUrl(path) {
    return _assetBase + "/" + path.replace(/^\//, "");
}
