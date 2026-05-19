import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map = null;
let marker = null;

export function initAgencyFormMap() {
    const mapContainer = document.getElementById("agency-form-map");
    if (!mapContainer) return;

    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");

    if (!latitudeInput || !longitudeInput) {
        console.error("Latitude or longitude input not found");
        return;
    }

    const initialLat = parseFloat(latitudeInput.value) || 13.7;
    const initialLng = parseFloat(longitudeInput.value) || -89.2;
    const hasCoordinates = latitudeInput.value && longitudeInput.value;

    if (!map) {
        map = L.map("agency-form-map").setView(
            [initialLat, initialLng],
            hasCoordinates ? 16 : 8,
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        }).addTo(map);
    }

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

    if (hasCoordinates) {
        marker = L.marker([initialLat, initialLng], {
            icon: orangeIcon,
            draggable: true,
        }).addTo(map);

        marker.on("dragend", function (e) {
            const position = e.target.getLatLng();
            updateCoordinates(position.lat, position.lng);
        });

        marker
            .bindPopup("Arrastra el marcador para ajustar la ubicación")
            .openPopup();
    }

    map.on("click", function (e) {
        const { lat, lng } = e.latlng;
        updateCoordinates(lat, lng);

        if (marker) {
            marker.setLatLng([lat, lng]);
        } else {
            marker = L.marker([lat, lng], {
                icon: orangeIcon,
                draggable: true,
            }).addTo(map);

            marker.on("dragend", function (e) {
                const position = e.target.getLatLng();
                updateCoordinates(position.lat, position.lng);
            });

            marker
                .bindPopup("Arrastra el marcador para ajustar la ubicación")
                .openPopup();
        }

        map.setView([lat, lng], 16);
    });

    latitudeInput.addEventListener("change", function () {
        const lat = parseFloat(this.value);
        const lng = parseFloat(longitudeInput.value);

        if (lat && lng) {
            updateMapFromInputs(lat, lng);
        }
    });

    longitudeInput.addEventListener("change", function () {
        const lat = parseFloat(latitudeInput.value);
        const lng = parseFloat(this.value);

        if (lat && lng) {
            updateMapFromInputs(lat, lng);
        }
    });

    setTimeout(() => {
        map.invalidateSize();
    }, 100);
}

function updateCoordinates(lat, lng) {
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");

    if (latitudeInput) latitudeInput.value = lat.toFixed(7);
    if (longitudeInput) longitudeInput.value = lng.toFixed(7);
}

function updateMapFromInputs(lat, lng) {
    if (!map) return;

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

    if (marker) {
        marker.setLatLng([lat, lng]);
    } else {
        marker = L.marker([lat, lng], {
            icon: orangeIcon,
            draggable: true,
        }).addTo(map);

        marker.on("dragend", function (e) {
            const position = e.target.getLatLng();
            updateCoordinates(position.lat, position.lng);
        });

        marker.bindPopup("Arrastra el marcador para ajustar la ubicación");
    }

    map.setView([lat, lng], 16);
}

export function updateMapCoordinates(lat, lng) {
    updateMapFromInputs(lat, lng);
}
