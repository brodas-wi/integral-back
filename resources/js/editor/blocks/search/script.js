export const SEARCH_SCRIPT = `
var root = this;
var form = root.querySelector(".srch-form");
var input = root.querySelector(".srch-input");
var panel = root.querySelector(".srch-panel");
var inner = root.querySelector(".srch-inner");
var heading = root.querySelector(".srch-heading");
var status = root.querySelector(".srch-status");
var list = root.querySelector(".srch-list");
if (!form || !input || !panel || !inner || !heading || !status || !list) return;

var endpoint = root.getAttribute("data-srch-endpoint") || "/api/search";
var step = parseInt(root.getAttribute("data-srch-limit"), 10) || 6;
var timer = null;
var token = 0;
var items = [];
var shown = 0;
var moreBtn = null;

function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
}

function safeUrl(url) {
    if (typeof url !== "string") return "#";
    if (url.charAt(0) === "/" && url.charAt(1) !== "/") return url;
    if (url.indexOf("https://") === 0 || url.indexOf("http://") === 0) return url;
    return "#";
}

function setStatus(text) {
    status.textContent = text;
    status.hidden = !text;
}

function removeMore() {
    if (moreBtn && moreBtn.parentNode) moreBtn.parentNode.removeChild(moreBtn);
    moreBtn = null;
}

function renderMore() {
    removeMore();
    if (shown >= items.length) return;
    moreBtn = document.createElement("button");
    moreBtn.type = "button";
    moreBtn.className = "srch-more";
    moreBtn.textContent = "Ver más resultados";
    moreBtn.addEventListener("click", appendItems);
    inner.appendChild(moreBtn);
}

function appendItems() {
    var end = Math.min(shown + step, items.length);
    for (var i = shown; i < end; i++) {
        var data = items[i];
        var li = document.createElement("li");
        li.className = "srch-item";
        var link = document.createElement("a");
        link.className = "srch-link";
        link.href = safeUrl(data.url);
        var title = document.createElement("span");
        title.className = "srch-link-title";
        title.textContent = data.title || "Sin título";
        link.appendChild(title);
        if (data.excerpt) {
            var excerpt = document.createElement("span");
            excerpt.className = "srch-link-excerpt";
            excerpt.textContent = data.excerpt;
            link.appendChild(excerpt);
        }
        li.appendChild(link);
        list.appendChild(li);
    }
    shown = end;
    renderMore();
}

function render(query, results) {
    heading.textContent = "Resultados para “" + query + "”";
    clear(list);
    removeMore();
    items = results;
    shown = 0;
    panel.hidden = false;
    if (!results.length) {
        setStatus("No se encontraron resultados");
        return;
    }
    setStatus(results.length + (results.length === 1 ? " resultado" : " resultados"));
    appendItems();
}

function search() {
    window.clearTimeout(timer);
    var query = input.value.trim();
    if (query.length < 2) {
        token++;
        panel.hidden = true;
        clear(list);
        removeMore();
        return;
    }
    var current = ++token;
    if (panel.hidden) {
        heading.textContent = "Resultados para “" + query + "”";
        setStatus("Buscando…");
        panel.hidden = false;
    }
    var url = endpoint + (endpoint.indexOf("?") === -1 ? "?" : "&") + "q=" + encodeURIComponent(query);
    fetch(url, { headers: { Accept: "application/json" }, credentials: "same-origin" })
        .then(function (response) {
            if (!response.ok) throw new Error("search failed");
            return response.json();
        })
        .then(function (data) {
            if (current !== token) return;
            render(query, Array.isArray(data.results) ? data.results : []);
        })
        .catch(function () {
            if (current !== token) return;
            clear(list);
            removeMore();
            heading.textContent = "Resultados para “" + query + "”";
            setStatus("No fue posible realizar la búsqueda. Intenta de nuevo.");
            panel.hidden = false;
        });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    search();
});

input.addEventListener("input", function () {
    window.clearTimeout(timer);
    timer = window.setTimeout(search, 350);
});
`;