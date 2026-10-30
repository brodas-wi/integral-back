import { DYNAMIC_CSS } from "./styles";

export const MAP_SCRIPT = `
var root = this;
var doc = root.ownerDocument;
var win = doc.defaultView || window;
var filters = root.querySelector("[data-mp-filters]");
var overlay = root.querySelector("[data-mp-overlay]");
var mapEl = root.querySelector("[data-mp-map]");
var statsEl = root.querySelector("[data-mp-stats]");
if (!filters || !mapEl || mapEl.__mpInit) return;
if (typeof root.__mpCleanup === "function") root.__mpCleanup();
mapEl.__mpInit = true;

if (!doc.getElementById("mp-runtime-style")) {
    var styleEl = doc.createElement("style");
    styleEl.id = "mp-runtime-style";
    styleEl.textContent = ${JSON.stringify(DYNAMIC_CSS)};
    doc.head.appendChild(styleEl);
}

var CENTER = [13.7942, -88.8965];
var ZOOM = 8;
var POINT_ZOOM = 17;
var switching = false;
var DEFAULT_TEMPLATE = "{agencias} agencias y {puntos} puntos de pago activos distribuidos en todo el país.";
var state = { departments: [], agencies: [], paymentPoints: [], type: null, department: null, pointKey: null };
var L = null;
var map = null;
var markers = null;
var observer = null;

function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
}

function setOpen(filterEl, open) {
    filterEl.classList.toggle("mp-filter-open", open);
    var toggle = filterEl.querySelector("[data-filter-toggle]");
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (overlay) overlay.classList.toggle("mp-overlay-active", open);
}

function closeFilters() {
    var open = filters.querySelectorAll(".mp-filter-open");
    for (var i = 0; i < open.length; i++) setOpen(open[i], false);
    if (overlay) overlay.classList.remove("mp-overlay-active");
}

function markSelected(option) {
    var siblings = option.parentNode.querySelectorAll(".mp-filter-option");
    for (var i = 0; i < siblings.length; i++) siblings[i].classList.remove("mp-selected");
    option.classList.add("mp-selected");
}

function renderStats(ok) {
    if (!statsEl) return;
    if (!ok) {
        statsEl.textContent = "No fue posible cargar la disponibilidad de agencias y puntos de pago.";
        return;
    }
    var template = statsEl.getAttribute("data-mp-template") || DEFAULT_TEMPLATE;
    var counts = {
        agencias: state.agencies.length,
        puntos: state.paymentPoints.length,
        total: state.agencies.length + state.paymentPoints.length
    };
    statsEl.innerHTML = esc(template).replace(/[{](agencias|puntos|total)[}]/g, function (_, key) {
        return '<span class="mp-num">' + counts[key] + "</span>";
    });
}

function validPoint(item) {
    return item && isFinite(parseFloat(item.lat)) && isFinite(parseFloat(item.lng));
}

function allPoints() {
    return state.agencies.concat(state.paymentPoints);
}

function filteredPoints() {
    return allPoints().filter(function (p) {
        if (state.type && p.type !== state.type) return false;
        if (state.department && p.department !== state.department) return false;
        return true;
    });
}

function pinSvg(color) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 42" width="30" height="42"><path d="M15 0C6.7 0 0 6.7 0 15c0 11.3 15 27 15 27s15-15.7 15-27C30 6.7 23.3 0 15 0z" fill="' + color + '"/><circle cx="15" cy="14" r="5.5" fill="#ffffff"/></svg>';
}

function popupHtml(item) {
    var html = '<div class="mp-popup"><p class="mp-popup-name">' + esc(item.name) + "</p>";
    if (item.address) html += '<p class="mp-popup-line"><i class="ri-map-pin-2-line"></i> ' + esc(item.address) + "</p>";
    if (item.type === "agency" && item.schedule) html += '<p class="mp-popup-line"><i class="ri-time-line"></i> ' + esc(item.schedule) + "</p>";
    if (item.type === "payment_point" && item.correspondent) html += '<p class="mp-popup-line"><i class="ri-store-2-line"></i> ' + esc(item.correspondent) + "</p>";
    return html + "</div>";
}

function renderMarkers() {
    if (!markers || !L) return;
    markers.clearLayers();
    filteredPoints().forEach(function (item) {
        var icon = L.divIcon({
            className: "mp-pin",
            html: pinSvg(item.type === "agency" ? "#E97300" : "#003B71"),
            iconSize: [30, 42],
            iconAnchor: [15, 42],
            popupAnchor: [0, -38]
        });
        var marker = L.marker([parseFloat(item.lat), parseFloat(item.lng)], { icon: icon });
        marker.bindPopup(popupHtml(item));
        marker.__mpKey = item.type + "-" + item.id;
        marker.on("click", function () {
            switching = true;
            map.flyTo(marker.getLatLng(), POINT_ZOOM);
        });
        markers.addLayer(marker);
    });
}

function resetView() {
    if (!map) return;
    if (state.department) {
        var dep = state.departments.filter(function (d) { return d.name === state.department; })[0];
        if (dep && dep.lat && dep.lng) {
            map.flyTo([dep.lat, dep.lng], dep.zoom || 11);
            return;
        }
    }
    map.flyTo(CENTER, ZOOM);
}

function applyMapState() {
    if (!map) return;
    renderMarkers();
    if (state.pointKey) {
        var found = null;
        markers.eachLayer(function (marker) {
            if (marker.__mpKey === state.pointKey) found = marker;
        });
        if (found) {
            map.flyTo(found.getLatLng(), POINT_ZOOM);
            setTimeout(function () { found.openPopup(); }, 350);
            return;
        }
    }
    resetView();
}

function buildDepartmentOptions() {
    var dropdown = filters.querySelector('[data-filter-index="1"] .mp-filter-dropdown');
    if (!dropdown) return;
    var html = '<button type="button" class="mp-filter-option mp-selected" data-dept="">Todos los departamentos</button>';
    state.departments.forEach(function (d) {
        html += '<button type="button" class="mp-filter-option" data-dept="' + esc(d.name) + '">' + esc(d.name) + "</button>";
    });
    dropdown.innerHTML = html;
}

function buildLocationOptions() {
    var filter = filters.querySelector('[data-filter-index="2"]');
    if (!filter) return;
    var dropdown = filter.querySelector(".mp-filter-dropdown");
    var toggle = filter.querySelector("[data-filter-toggle]");
    var label = filter.querySelector("[data-filter-label]");
    var points = filteredPoints();
    state.pointKey = null;
    setOpen(filter, false);
    toggle.disabled = points.length === 0;
    if (!points.length) {
        label.textContent = "Sin ubicaciones en esta área";
        dropdown.innerHTML = "";
        return;
    }
    label.textContent = "Seleccione una ubicación";
    var html = '<button type="button" class="mp-filter-option mp-selected" data-point-key="">Todas</button>';
    points.forEach(function (p) {
        html += '<button type="button" class="mp-filter-option" data-point-key="' + esc(p.type + "-" + p.id) + '">' + esc(p.name) + "</button>";
    });
    dropdown.innerHTML = html;
}

function onFiltersClick(event) {
    var toggle = event.target.closest("[data-filter-toggle]");
    if (toggle) {
        if (toggle.disabled) return;
        var filterEl = toggle.closest(".mp-filter");
        var wasOpen = filterEl.classList.contains("mp-filter-open");
        closeFilters();
        if (!wasOpen) setOpen(filterEl, true);
        return;
    }
    var option = event.target.closest(".mp-filter-option");
    if (!option || option.disabled) return;
    var parent = option.closest(".mp-filter");
    var index = parent.getAttribute("data-filter-index");
    var label = parent.querySelector("[data-filter-label]");
    if (label) label.textContent = option.textContent;
    markSelected(option);
    closeFilters();
    if (index === "0") {
        state.type = option.getAttribute("data-type") || null;
        buildLocationOptions();
    } else if (index === "1") {
        state.department = option.getAttribute("data-dept") || null;
        buildLocationOptions();
    } else if (index === "2") {
        state.pointKey = option.getAttribute("data-point-key") || null;
    }
    applyMapState();
}

function onDocClick(event) {
    if (!filters.contains(event.target)) closeFilters();
}

function onKeydown(event) {
    if (event.key === "Escape") closeFilters();
}

function resolveUrl() {
    var own = doc.querySelector('meta[name="map-locations-url"]');
    if (own && own.content) return own.content;
    try {
        var top = win.top && win.top.document.querySelector('meta[name="map-locations-url"]');
        if (top && top.content) return top.content;
    } catch (error) {}
    return "/api/map-locations";
}

function fetchData() {
    return fetch(resolveUrl(), { headers: { Accept: "application/json" }, credentials: "same-origin" })
        .then(function (response) {
            if (!response.ok) throw new Error("map data");
            return response.json();
        })
        .then(function (data) {
            state.departments = data.departments || [];
            state.agencies = (data.agencies || []).filter(validPoint);
            state.paymentPoints = (data.payment_points || []).filter(validPoint);
            return true;
        })
        .catch(function () {
            return false;
        });
}

function loadLeaflet() {
    if (win.L && win.L.map) return Promise.resolve(win.L);
    if (win.__mpLeaflet) return win.__mpLeaflet;
    if (!doc.getElementById("leaflet-css")) {
        var link = doc.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        doc.head.appendChild(link);
    }
    win.__mpLeaflet = new Promise(function (resolve, reject) {
        var script = doc.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.onload = function () { resolve(win.L); };
        script.onerror = function () {
            win.__mpLeaflet = null;
            reject(new Error("leaflet"));
        };
        doc.head.appendChild(script);
    });
    return win.__mpLeaflet;
}

function createMap(leaflet) {
    L = leaflet;
    if (!mapEl.isConnected) return;
    map = L.map(mapEl, { zoomControl: true, scrollWheelZoom: false }).setView(CENTER, ZOOM);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    markers = L.layerGroup().addTo(map);
    map.on("click", function () { map.scrollWheelZoom.enable(); });
    map.on("popupopen", function () { switching = false; });
    map.on("popupclose", function () {
        setTimeout(function () {
            if (switching || !map) return;
            var open = false;
            markers.eachLayer(function (marker) {
                if (marker.isPopupOpen()) open = true;
            });
            if (!open) resetView();
        }, 50);
    });
    map.on("mouseout", function () { map.scrollWheelZoom.disable(); });
    if (win.ResizeObserver) {
        observer = new win.ResizeObserver(function () {
            if (map) map.invalidateSize();
        });
        observer.observe(mapEl);
    }
    applyMapState();
}

filters.addEventListener("click", onFiltersClick);
doc.addEventListener("click", onDocClick);
doc.addEventListener("keydown", onKeydown);

root.__mpCleanup = function () {
    doc.removeEventListener("click", onDocClick);
    doc.removeEventListener("keydown", onKeydown);
    if (observer) observer.disconnect();
    if (map) {
        map.remove();
        map = null;
    }
};

fetchData()
    .then(function (ok) {
        renderStats(ok);
        buildDepartmentOptions();
        buildLocationOptions();
        return loadLeaflet();
    })
    .then(createMap)
    .catch(function (error) {
        console.warn("[MapFilter]", error);
    });
`;