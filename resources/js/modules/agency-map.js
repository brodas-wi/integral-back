import L from "leaflet";
import "leaflet/dist/leaflet.css";

export function initAgencyMap() {
    const mapContainer = document.getElementById("agency-map");
    if (!mapContainer) return;

    const latitude = parseFloat(mapContainer.dataset.latitude);
    const longitude = parseFloat(mapContainer.dataset.longitude);
    const agencyName = mapContainer.dataset.name;
    const municipality = mapContainer.dataset.municipality;
    const department = mapContainer.dataset.department;

    if (!latitude || !longitude) {
        console.error("Invalid coordinates for map");
        return;
    }

    const map = L.map("agency-map").setView([latitude, longitude], 16);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
    }).addTo(map);

    const orangeIcon = L.divIcon({
        className: "custom-marker",
        html: `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="36" height="36">
                <path fill="#f0872a" stroke="#fff" stroke-width="1.5" d="M12 0C7.58 0 4 3.58 4 8c0 5.5 8 16 8 16s8-10.5 8-16c0-4.42-3.58-8-8-8z"/>
                <circle cx="12" cy="8" r="3" fill="#fff"/>
            </svg>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
    });

    L.marker([latitude, longitude], { icon: orangeIcon })
        .addTo(map)
        .bindPopup(
            `
            <div class="text-center p-2">
                <strong class="block mb-1 text-secondary">${agencyName}</strong>
                <span class="text-xs text-gray-600">${municipality}, ${department}</span>
            </div>
        `,
        )
        .openPopup();

    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}
