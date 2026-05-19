const agenciesMapIcon = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="9" height="28" fill="#e9ecef" rx="1"/>
    <rect x="3" y="3" width="7" height="3" fill="#dee2e6" rx="0.5"/>
    <rect x="13" y="2" width="17" height="28" fill="#a8dadc" rx="1"/>
    <rect x="14" y="3" width="15" height="26" fill="#ebf4fa" rx="1"/>
    <circle cx="18" cy="12" r="2.5" fill="#f8e7d8" stroke="#f0872a" stroke-width="0.7"/>
    <circle cx="23" cy="18" r="2.5" fill="#f8e7d8" stroke="#f0872a" stroke-width="0.7"/>
    <circle cx="26" cy="8" r="2" fill="#f8e7d8" stroke="#f0872a" stroke-width="0.5"/>
    <circle cx="18" cy="12" r="0.7" fill="#f0872a"/>
    <circle cx="23" cy="18" r="0.7" fill="#f0872a"/>
    <circle cx="26" cy="8" r="0.5" fill="#f0872a"/>
    <line x1="3" y1="9" x2="10" y2="9" stroke="#0d3f6a" stroke-width="0.8"/>
    <line x1="3" y1="13" x2="10" y2="13" stroke="#0d3f6a" stroke-width="0.8"/>
    <line x1="3" y1="17" x2="10" y2="17" stroke="#0d3f6a" stroke-width="0.8"/>
    <line x1="3" y1="21" x2="10" y2="21" stroke="#0d3f6a" stroke-width="0.8"/>
    <rect x="3" y="25" width="7" height="2.5" fill="#dee2e6" rx="0.5"/>
</svg>`;

function createAgenciesMapScript() {
    return function () {
        const section = this;
        const componentType = "agencies-map-component";
        const apiEndpoint = "/api/agencies/active";
        const dataKey = "agencies";

        let items = [];
        let filteredItems = [];
        let filters = {};
        let map = null;
        let markers = [];
        let isLoading = true;

        const initMap = async () => {
            try {
                showLoadingState();
                await loadItems();
                await loadMapLibrary();
                renderMap();
                renderItemsList();
                initializeFilters();
                updateTexts();
                hideLoadingState();
            } catch (error) {
                console.error("Error initializing map:", error);
                showError("Error al cargar las agencias");
                hideLoadingState();
            }
        };

        function showLoadingState() {
            const listContainer = section.querySelector(
                `.${componentType}-list`,
            );
            if (listContainer) {
                listContainer.innerHTML = `
                    <div class="flex flex-col items-center justify-center p-12 space-y-4">
                        <div class="relative w-16 h-16">
                            <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                            <div class="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                        </div>
                        <p class="text-white font-medium">Cargando agencias...</p>
                    </div>
                `;
            }

            const mapContainer = section.querySelector(
                `.${componentType}-map-container`,
            );
            if (mapContainer) {
                mapContainer.style.opacity = "0.5";
            }
        }

        function hideLoadingState() {
            const mapContainer = section.querySelector(
                `.${componentType}-map-container`,
            );
            if (mapContainer) {
                mapContainer.style.transition = "opacity 0.3s ease";
                mapContainer.style.opacity = "1";
            }
            isLoading = false;
        }

        async function loadItems() {
            try {
                const response = await fetch(apiEndpoint);
                const data = await response.json();

                const itemsData = dataKey ? data[dataKey] : data;

                if (Array.isArray(itemsData)) {
                    items = itemsData.filter(
                        (item) =>
                            item.latitude &&
                            item.longitude &&
                            !isNaN(item.latitude) &&
                            !isNaN(item.longitude),
                    );
                    filteredItems = [...items];
                    extractFiltersData();
                } else {
                    items = [];
                    filteredItems = [];
                }
            } catch (error) {
                console.error("Error loading items:", error);
                items = [];
                filteredItems = [];
            }
        }

        function extractFiltersData() {
            const zones = [
                ...new Set(items.map((i) => i.zone).filter(Boolean)),
            ].sort();
            const departments = [
                ...new Set(items.map((i) => i.department).filter(Boolean)),
            ].sort();

            filters = { zone: zones, department: departments };

            setTimeout(() => {
                const filtersContainer = section.querySelector(
                    `.${componentType}-filters-container`,
                );
                if (filtersContainer && !filtersContainer.hasChildNodes()) {
                    filtersContainer.innerHTML = `
                        <select class="${componentType}-zone-filter flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                            <option value="">Todas las Zonas</option>
                        </select>
                        <select class="${componentType}-department-filter flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                            <option value="">Todos los Departamentos</option>
                        </select>
                    `;
                    populateFilters();
                }
            }, 100);
        }

        function populateFilters() {
            const zoneSelect = section.querySelector(
                `.${componentType}-zone-filter`,
            );
            const deptSelect = section.querySelector(
                `.${componentType}-department-filter`,
            );

            if (zoneSelect && filters.zone) {
                filters.zone.forEach((zone) => {
                    const option = document.createElement("option");
                    option.value = zone;
                    option.textContent = zone;
                    zoneSelect.appendChild(option);
                });
            }

            if (deptSelect && filters.department) {
                filters.department.forEach((dept) => {
                    const option = document.createElement("option");
                    option.value = dept;
                    option.textContent = dept;
                    deptSelect.appendChild(option);
                });
            }
        }

        async function loadMapLibrary() {
            if (!document.getElementById("leaflet-css")) {
                const link = document.createElement("link");
                link.id = "leaflet-css";
                link.rel = "stylesheet";
                link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
                document.head.appendChild(link);
            }

            if (typeof window.L === "undefined") {
                await new Promise((resolve, reject) => {
                    const script = document.createElement("script");
                    script.src =
                        "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            if (
                typeof window.L !== "undefined" &&
                window.L.Icon &&
                window.L.Icon.Default
            ) {
                const orangeIcon = window.L.icon({
                    iconUrl:
                        "data:image/svg+xml;base64," +
                        btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
                            <path fill="#f0872a" d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z"/>
                            <circle cx="12" cy="8" r="3" fill="#fff"/>
                        </svg>
                    `),
                    iconSize: [30, 45],
                    iconAnchor: [15, 45],
                    popupAnchor: [0, -45],
                });

                window.customOrangeIcon = orangeIcon;
            }
        }

        function renderMap() {
            const mapContainer = section.querySelector(`.${componentType}-map`);
            if (!mapContainer || !window.L) return;

            if (mapContainer._leaflet_id && mapContainer._map) {
                mapContainer._map.remove();
                delete mapContainer._map;
            }

            const centerLat = 13.7942;
            const centerLng = -88.8965;
            const initialZoom = 8;

            map = window.L.map(mapContainer).setView(
                [centerLat, centerLng],
                initialZoom,
            );

            window.L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    attribution:
                        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                },
            ).addTo(map);

            mapContainer._map = map;

            map.whenReady(function () {
                updateMapMarkers();
                setTimeout(() => {
                    if (map && map.invalidateSize) {
                        map.invalidateSize();
                    }
                }, 300);
            });
        }

        function updateMapMarkers() {
            clearExistingMarkers();
            addNewMarkers();
            adjustMapBounds();
        }

        function clearExistingMarkers() {
            markers.forEach((markerObj) => {
                if (markerObj.marker) {
                    map.removeLayer(markerObj.marker);
                }
            });
            markers = [];
        }

        function addNewMarkers() {
            filteredItems.forEach((item, index) => {
                if (item.latitude && item.longitude) {
                    const popupContent = createPopupContent(item);
                    const marker = window.L.marker(
                        [item.latitude, item.longitude],
                        {
                            icon:
                                window.customOrangeIcon ||
                                new window.L.Icon.Default(),
                        },
                    )
                        .addTo(map)
                        .bindPopup(popupContent);

                    markers.push({ marker, item, index });
                }
            });
        }

        function createPopupContent(agency) {
            let content = `<div style="min-width: 200px;"><h4 style="font-weight: 700; margin-bottom: 12px; color: #0d3f6a; font-size: 16px; border-bottom: 2px solid #f0872a; padding-bottom: 8px;">${agency.name}</h4>`;

            if (agency.address) {
                content += `<p style="margin: 8px 0 0 0; font-size: 14px; display: flex; align-items: start; gap: 8px;"><i class="ri-map-pin-line" style="color: #f0872a; font-size: 16px; margin-top: 2px;"></i><span style="color: #4b5563;">${agency.address}</span></p>`;
            }

            if (agency.municipality || agency.department) {
                const location = [agency.municipality, agency.department]
                    .filter(Boolean)
                    .join(", ");
                content += `<p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280; padding-left: 24px;">${location}</p>`;
            }

            if (agency.schedule) {
                content += `<p style="margin: 8px 0; font-size: 14px; display: flex; align-items: start; gap: 8px;"><i class="ri-time-line" style="color: #f0872a; font-size: 16px; margin-top: 2px;"></i><span style="color: #4b5563;">${agency.schedule}</span></p>`;
            }

            content += `</div>`;
            return content;
        }

        function adjustMapBounds() {
            if (filteredItems.length > 0) {
                const bounds = filteredItems
                    .filter((i) => i.latitude && i.longitude)
                    .map((i) => [i.latitude, i.longitude]);

                if (bounds.length > 1) {
                    map.once("moveend", function () {
                        setTimeout(() => {
                            try {
                                if (
                                    map &&
                                    map._loaded &&
                                    typeof map.fitBounds === "function"
                                ) {
                                    map.fitBounds(bounds, {
                                        padding: [50, 50],
                                        maxZoom: 12,
                                        animate: false,
                                    });
                                }
                            } catch (error) {
                                console.warn("Error fitting bounds:", error);
                            }
                        }, 100);
                    });
                } else if (bounds.length === 1) {
                    map.setView(bounds[0], 14);
                }
            }
        }

        function renderItemsList() {
            const itemsList = section.querySelector(`.${componentType}-list`);
            if (!itemsList) return;

            if (filteredItems.length === 0) {
                showEmptyState(itemsList);
                return;
            }

            const itemsHtml = filteredItems
                .map((item, index) => generateItemHTML(item, index))
                .join("");
            itemsList.innerHTML = itemsHtml;
            attachItemClickListeners();
        }

        function generateItemHTML(agency, index) {
            const phonesHtml =
                agency.phones && agency.phones.length > 0
                    ? agency.phones
                          .map(
                              (phone) => `
                        <p class="text-gray-200 flex items-center gap-2 mt-2">
                            <i class="ri-phone-line text-primary text-lg"></i>
                            <a href="tel:${phone.replace(/\s+/g, "")}" class="agency-phone-link text-white font-medium hover:underline">${phone}</a>
                        </p>
                    `,
                          )
                          .join("")
                    : "";

            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${agency.latitude},${agency.longitude}`;

            return `
                <div class="${componentType}-item p-5 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl cursor-pointer transition-all duration-200" data-item-index="${index}">
                    <h3 class="agency-title text-lg font-bold text-white mb-3">${agency.name}</h3>
                    ${agency.address ? `<p class="text-gray-200 flex items-start gap-2 mt-2"><i class="ri-map-pin-line text-primary text-lg mt-0.5"></i><span class="flex-1">${agency.address}</span></p>` : ""}
                    ${agency.municipality || agency.department ? `<p class="text-sm text-gray-300 mt-1 ml-6">${[agency.municipality, agency.department].filter(Boolean).join(", ")}</p>` : ""}
                    ${agency.schedule ? `<p class="text-gray-200 flex items-start gap-2 mt-2"><i class="ri-time-line text-primary text-lg mt-0.5"></i><span class="flex-1">${agency.schedule}</span></p>` : ""}
                    ${phonesHtml}
                    <div class="mt-3">
                        <a href="${googleMapsUrl}" target="_blank" rel="noopener noreferrer" class="agency-maps-btn block w-full text-center px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-200" onclick="event.stopPropagation();">
                            Ver ubicación
                        </a>
                    </div>
                </div>
            `;
        }

        function showEmptyState(container) {
            container.innerHTML = `
                <div class="flex flex-col items-center justify-center p-12 text-center">
                    <div class="w-20 h-20 mb-4 rounded-full bg-white bg-opacity-10 flex items-center justify-center">
                        <i class="ri-map-pin-line text-4xl text-white"></i>
                    </div>
                    <p class="text-white font-medium text-lg">No hay agencias disponibles</p>
                    <p class="text-gray-300 text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
                </div>
            `;
        }

        function attachItemClickListeners() {
            const itemElements = section.querySelectorAll(
                `.${componentType}-item`,
            );

            itemElements.forEach((itemEl) => {
                itemEl.addEventListener("click", (e) => {
                    if (e.target.closest(".agency-maps-btn")) {
                        return;
                    }

                    e.preventDefault();
                    const itemIndex = parseInt(itemEl.dataset.itemIndex);
                    const item = filteredItems[itemIndex];

                    if (!item) return;

                    itemElements.forEach((el) => {
                        el.classList.remove(
                            "bg-white",
                            "border-secondary",
                            "selected-agency",
                        );
                        el.classList.add(
                            "bg-white",
                            "bg-opacity-10",
                            "border-white",
                            "border-opacity-20",
                        );

                        const title = el.querySelector(".agency-title");
                        const icons = el.querySelectorAll("i");
                        const phoneLinks =
                            el.querySelectorAll(".agency-phone-link");
                        const otherTexts = el.querySelectorAll(
                            "p:not(:has(.agency-phone-link))",
                        );
                        const mapsBtn = el.querySelector(".agency-maps-btn");

                        if (title) {
                            title.classList.remove("text-secondary");
                            title.classList.add("text-white");
                        }

                        icons.forEach((icon) => {
                            icon.classList.remove(
                                "text-secondary",
                                "text-gray-300",
                                "text-white",
                            );
                            icon.classList.add("text-primary");
                        });

                        phoneLinks.forEach((link) => {
                            link.classList.remove("text-secondary");
                            link.classList.add("text-white");
                        });

                        otherTexts.forEach((text) => {
                            text.classList.remove("text-secondary");
                            text.classList.add("text-gray-200");
                        });

                        if (mapsBtn) {
                            mapsBtn.classList.remove("bg-secondary");
                            mapsBtn.classList.add("bg-primary");
                        }
                    });

                    itemEl.classList.remove(
                        "bg-white",
                        "bg-opacity-10",
                        "border-white",
                        "border-opacity-20",
                    );
                    itemEl.classList.add(
                        "bg-white",
                        "border-secondary",
                        "selected-agency",
                    );

                    const title = itemEl.querySelector(".agency-title");
                    const icons = itemEl.querySelectorAll("i");
                    const phoneLinks =
                        itemEl.querySelectorAll(".agency-phone-link");
                    const otherTexts = itemEl.querySelectorAll(
                        "p:not(:has(.agency-phone-link))",
                    );
                    const mapsBtn = itemEl.querySelector(".agency-maps-btn");

                    if (title) {
                        title.classList.remove("text-white");
                        title.classList.add("text-secondary");
                    }

                    icons.forEach((icon) => {
                        icon.classList.remove(
                            "text-secondary",
                            "text-gray-300",
                            "text-white",
                        );
                        icon.classList.add("text-primary");
                    });

                    phoneLinks.forEach((link) => {
                        link.classList.remove("text-white");
                        link.classList.add("text-secondary");
                    });

                    otherTexts.forEach((text) => {
                        text.classList.remove("text-gray-200");
                        text.classList.add("text-secondary");
                    });

                    if (mapsBtn) {
                        mapsBtn.classList.remove("bg-primary");
                        mapsBtn.classList.add("bg-secondary");
                    }

                    if (map && item && map._loaded) {
                        try {
                            map.flyTo([item.latitude, item.longitude], 14, {
                                animate: true,
                                duration: 1,
                            });

                            const marker = markers.find(
                                (m) => m.item.id === item.id,
                            );
                            if (marker && marker.marker) {
                                marker.marker.openPopup();
                            }
                        } catch (error) {
                            console.warn("Error updating map view:", error);
                        }
                    }
                });
            });
        }

        function initializeFilters() {
            const searchInput = section.querySelector(
                `.${componentType}-search-input`,
            );
            const zoneFilter = section.querySelector(
                `.${componentType}-zone-filter`,
            );
            const departmentFilter = section.querySelector(
                `.${componentType}-department-filter`,
            );
            const noResultsEl = section.querySelector(
                `.${componentType}-no-results`,
            );

            const departmentsByZone = {
                Occidental: ["Ahuachapán", "Santa Ana", "Sonsonate"],
                Paracentral: [
                    "Chalatenango",
                    "Cuscatlán",
                    "La Paz",
                    "Cabañas",
                    "San Vicente",
                ],
                Central: ["La Libertad", "San Salvador"],
                Oriental: ["Usulután", "San Miguel", "Morazán", "La Unión"],
            };

            const updateDepartmentFilter = () => {
                if (!zoneFilter || !departmentFilter) return;

                const selectedZone = zoneFilter.value;
                const currentDepartment = departmentFilter.value;

                if (!selectedZone) {
                    departmentFilter.innerHTML =
                        '<option value="">Todos los Departamentos</option>';

                    const allDepartments = [
                        ...new Set(
                            items.map((i) => i.department).filter(Boolean),
                        ),
                    ].sort();
                    allDepartments.forEach((dept) => {
                        const option = document.createElement("option");
                        option.value = dept;
                        option.textContent = dept;
                        departmentFilter.appendChild(option);
                    });

                    if (currentDepartment) {
                        departmentFilter.value = currentDepartment;
                    }
                } else {
                    const zoneDepartments =
                        departmentsByZone[selectedZone] || [];
                    departmentFilter.innerHTML =
                        '<option value="">Todos los Departamentos</option>';

                    zoneDepartments.forEach((dept) => {
                        const option = document.createElement("option");
                        option.value = dept;
                        option.textContent = dept;
                        departmentFilter.appendChild(option);
                    });

                    if (zoneDepartments.includes(currentDepartment)) {
                        departmentFilter.value = currentDepartment;
                    }
                }
            };

            const applyFilters = () => {
                const searchTerm = searchInput
                    ? searchInput.value.toLowerCase().trim()
                    : "";
                const selectedZone = zoneFilter ? zoneFilter.value : "";
                const selectedDepartment = departmentFilter
                    ? departmentFilter.value
                    : "";

                filteredItems = items.filter((item) => {
                    let matchesSearch = true;
                    let matchesZone = true;
                    let matchesDepartment = true;

                    if (searchTerm) {
                        matchesSearch = Object.values(item).some((value) =>
                            String(value).toLowerCase().includes(searchTerm),
                        );
                    }

                    if (selectedZone) {
                        matchesZone = item.zone === selectedZone;
                    }

                    if (selectedDepartment) {
                        matchesDepartment =
                            item.department === selectedDepartment;
                    }

                    return matchesSearch && matchesZone && matchesDepartment;
                });

                renderItemsList();
                updateMapMarkers();

                if (noResultsEl) {
                    noResultsEl.classList.toggle(
                        "hidden",
                        filteredItems.length > 0,
                    );
                }
            };

            if (searchInput) {
                searchInput.addEventListener("input", applyFilters);
            }

            if (zoneFilter) {
                zoneFilter.addEventListener("change", () => {
                    updateDepartmentFilter();
                    applyFilters();
                });
            }

            if (departmentFilter) {
                departmentFilter.addEventListener("change", applyFilters);
            }
        }

        function updateTexts() {
            const titleElement = section.querySelector("[data-title]");
            if (titleElement) {
                const title =
                    getComponentAttribute("map-title") || "Nuestras Agencias";
                titleElement.textContent = title;
            }

            const searchInput = section.querySelector(
                `.${componentType}-search-input`,
            );
            if (searchInput) {
                const placeholder =
                    getComponentAttribute("search-placeholder") || "Buscar...";
                searchInput.setAttribute("placeholder", placeholder);
            }

            const noResultsEl = section.querySelector(
                `.${componentType}-no-results`,
            );
            if (noResultsEl) {
                const noResults =
                    getComponentAttribute("no-results-text") ||
                    "No se encontraron agencias";
                noResultsEl.textContent = noResults;
            }
        }

        function getComponentAttribute(attributeName) {
            return section
                .closest(`[data-gjs-type="${componentType}"]`)
                ?.getAttribute(attributeName);
        }

        function showError(message) {
            const itemsList = section.querySelector(`.${componentType}-list`);
            if (itemsList) {
                itemsList.innerHTML = `
                    <div class="flex flex-col items-center justify-center p-12 text-center">
                        <div class="w-20 h-20 mb-4 rounded-full bg-red-500 bg-opacity-20 flex items-center justify-center">
                            <i class="ri-error-warning-line text-4xl text-red-300"></i>
                        </div>
                        <p class="text-white font-medium text-lg">${message}</p>
                        <p class="text-gray-300 text-sm mt-2">Por favor, intenta nuevamente más tarde</p>
                    </div>
                `;
            }
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initMap);
        } else {
            initMap();
        }
    };
}

export const mapBlocks = [
    {
        id: "agencies-map",
        label: "Mapa de Agencias",
        category: "Interactivos",
        media: agenciesMapIcon,
        content: {
            type: "agencies-map-component",
        },
    },
];

export function initializeMapBlocks(editor) {
    const componentType = "agencies-map-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) => {
            if (
                el.getAttribute &&
                el.getAttribute("data-gjs-type") === componentType
            ) {
                return { type: componentType };
            }
            return false;
        },
        model: {
            defaults: {
                name: "Mapa de Agencias",
                tagName: "section",
                draggable: true,
                droppable: false,
                editable: false,
                stylable: false,
                resizable: false,
                selectable: true,
                hoverable: true,
                layerable: true,
                highlightable: false,
                copyable: false,
                removable: true,
                attributes: {
                    class: "py-12 bg-secondary",
                    "data-gjs-type": componentType,
                },
                components: `
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-droppable="false">
                        <div class="mb-8">
                            <h2 class="text-4xl md:text-5xl font-bold text-white" contenteditable="true" data-gjs-editable="true" data-gjs-selectable="true" data-gjs-type="text">Nuestras Agencias</h2>
                        </div>
                        <div class="mb-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl border border-white border-opacity-20 p-6" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-droppable="false">
                            <div class="flex flex-col gap-4" data-gjs-editable="false" data-gjs-selectable="false">
                                <div class="flex-1" data-gjs-editable="false" data-gjs-selectable="false">
                                    <div class="relative" data-gjs-editable="false" data-gjs-selectable="false">
                                        <input type="text" class="${componentType}-search-input w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200" placeholder="Buscar..." data-gjs-editable="false">
                                        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" data-gjs-editable="false" data-gjs-selectable="false">
                                            <i class="ri-search-line text-lg"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col sm:flex-row gap-4 ${componentType}-filters-container" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-droppable="false"></div>
                            </div>
                            <div class="${componentType}-no-results hidden mt-6 p-4 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl text-center" data-gjs-editable="false" data-gjs-selectable="false">
                                <p class="text-white font-medium">No se encontraron agencias</p>
                            </div>
                        </div>
                        <div class="flex flex-col lg:flex-row gap-6" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-droppable="false">
                            <div class="lg:w-1/3 order-2 lg:order-1" data-gjs-editable="false" data-gjs-selectable="false">
                                <div class="${componentType}-list space-y-3" style="max-height: 650px; overflow-y: auto; padding-right: 8px; scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.05);" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-droppable="false">
                                </div>
                            </div>
                            <div class="lg:w-2/3 order-1 lg:order-2" data-gjs-editable="false" data-gjs-selectable="false">
                                <div class="${componentType}-map-container rounded-2xl overflow-hidden border border-white border-opacity-20" style="height: 650px;" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-droppable="false">
                                    <div class="${componentType}-map w-full h-full" data-gjs-editable="false" data-gjs-selectable="false"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `,
                script: createAgenciesMapScript(),
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    setupEditorEvents(editor, componentType);
    injectMapStyles(editor, componentType);
}

function setupEditorEvents(editor, componentType) {
    editor.on("component:selected", (component) => {
        if (component.get("type") === componentType) {
            const el = component.getEl();
            if (el) {
                const mapContainer = el.querySelector(`.${componentType}-map`);
                if (mapContainer && mapContainer._map) {
                    setTimeout(() => {
                        mapContainer._map.invalidateSize();
                    }, 100);
                }
            }
        }
    });

    editor.on("storage:end:load", () => {
        setTimeout(() => {
            reinitializeComponents(editor, componentType);
        }, 1000);
    });

    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (
            el &&
            el.getAttribute &&
            el.getAttribute("data-gjs-type") === componentType
        ) {
            component.set("type", componentType);
            setTimeout(() => {
                const script = component.get("script");
                if (script && typeof script === "function" && el) {
                    script.call(el);
                }
            }, 500);
        }
    });

    editor.on("component:clone", (component) => {
        if (component.get("type") === componentType) {
            const el = component.getEl();
            if (el) {
                const mapContainer = el.querySelector(`.${componentType}-map`);
                if (mapContainer && mapContainer._map) {
                    mapContainer._map.remove();
                    delete mapContainer._map;
                }

                setTimeout(() => {
                    const script = component.get("script");
                    if (script && typeof script === "function") {
                        script.call(el);
                    }
                }, 500);
            }
        }
    });

    editor.on("canvas:render", () => {
        setTimeout(() => {
            reinitializeComponents(editor, componentType);
        }, 800);
    });

    editor.on("storage:start:store", () => {
        const wrapper = editor.getWrapper();
        const mapComponents = wrapper.find(
            `[data-gjs-type="${componentType}"]`,
        );

        mapComponents.forEach((comp) => {
            comp.set("type", componentType);
            comp.addAttributes({ "data-gjs-type": componentType });
        });
    });
}

function reinitializeComponents(editor, componentType) {
    const wrapper = editor.getWrapper();
    const mapComponents = wrapper.find(`[data-gjs-type="${componentType}"]`);

    mapComponents.forEach((comp) => {
        comp.set("type", componentType);
        const el = comp.getEl();

        if (el && el.isConnected) {
            const script = comp.get("script");
            if (script && typeof script === "function") {
                script.call(el);
            }
        }
    });
}

function injectMapStyles(editor, componentType) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;

        const head = iframe.contentDocument.head;

        if (!head.querySelector("#leaflet-css")) {
            const leafletCSS = document.createElement("link");
            leafletCSS.id = "leaflet-css";
            leafletCSS.rel = "stylesheet";
            leafletCSS.href =
                "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            head.appendChild(leafletCSS);
        }

        if (!head.querySelector(`#${componentType}-css`)) {
            const customCSS = document.createElement("style");
            customCSS.id = `${componentType}-css`;
            customCSS.innerHTML = `
                .leaflet-container {
                    height: 100%;
                    width: 100%;
                    border-radius: inherit;
                    z-index: 0;
                }
                
                .${componentType}-item:hover {
                    background-color: rgba(255, 255, 255, 0.15);
                    border-color: rgba(240, 135, 42, 0.6);
                }
                
                .${componentType}-item:hover .agency-title {
                    color: #f0872a;
                }
                
                .agency-phone-link {
                    transition: all 0.2s ease;
                }

                .agency-phone-link:hover {
                    color: #f0872a;
                    text-decoration: underline;
                }

                .${componentType}-item.selected-agency .agency-phone-link:hover {
                    color: #f0872a !important;
                }
                
                .${componentType}-list::-webkit-scrollbar {
                    width: 4px !important;
                }

                .${componentType}-list::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }

                .${componentType}-list::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }

                .${componentType}-list::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
                
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .animate-spin {
                    animation: spin 1s linear infinite;
                }

                .${componentType}-item.selected-agency {
                    background-color: white !important;
                    border-color: #0d3f6a !important;
                }

                .${componentType}-item.selected-agency .agency-title,
                .${componentType}-item.selected-agency i,
                .${componentType}-item.selected-agency p,
                .${componentType}-item.selected-agency span,
                .${componentType}-item.selected-agency a {
                    color: #0d3f6a !important;
                }

                .agency-maps-btn {
                    transition: all 0.2s ease;
                }

                .agency-maps-btn:hover {
                    background-color: rgba(240, 135, 42, 0.9);
                }

                .${componentType}-item.selected-agency .agency-maps-btn {
                    background-color: #f0872a;
                    color: white;
                }

                .${componentType}-item.selected-agency .agency-maps-btn:hover {
                    background-color: rgba(240, 135, 42, 0.9);
                }
            `;
            head.appendChild(customCSS);
        }
    });
}
