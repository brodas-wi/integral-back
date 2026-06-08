/**
 * Payment Points Form View (shared by create.blade.php & edit.blade.php)
 *
 * Handles:
 *  - Zone → Department → Municipality cascading selects
 *  - Geocode address button
 *  - Interactive Leaflet map (agency-form-map)
 *
 * Data passed from blade via data-* attributes and <meta> tags:
 *  - <meta name="payment-points-geocode-url">        → geocode endpoint
 *  - <meta name="payment-points-municipalities-url"> → municipalities endpoint
 *  - #department[data-saved-value]                   → pre-selected department (edit mode)
 *  - #municipality[data-saved-value]                 → pre-selected municipality (edit mode)
 */

import { showNotification } from "@/utils/notifications.js";
import { initAgencyFormMap, updateMapCoordinates } from "@/modules/agency-form-map.js";

const CSRF               = document.querySelector('meta[name="csrf-token"]')?.content;
const GEOCODE_URL        = document.querySelector('meta[name="payment-points-geocode-url"]')?.content;
const MUNICIPALITIES_URL = document.querySelector('meta[name="payment-points-municipalities-url"]')?.content;

const DEPARTMENTS_BY_ZONE = {
    Occidental:  ["Ahuachapán", "Santa Ana", "Sonsonate"],
    Paracentral: ["Chalatenango", "Cuscatlán", "La Paz", "Cabañas", "San Vicente"],
    Central:     ["La Libertad", "San Salvador"],
    Oriental:    ["Usulután", "San Miguel", "Morazán", "La Unión"],
};

let isLoadingMunicipalities = false;

document.addEventListener("DOMContentLoaded", function () {
    const paymentPointForm   = document.getElementById("paymentPointForm");
    if (!paymentPointForm) return;

    const zoneSelect         = document.getElementById("zone");
    const departmentSelect   = document.getElementById("department");
    const geocodeBtn         = document.getElementById("geocode-btn");

    // ── Cascading selects ───────────────────────────────────────────────────
    zoneSelect?.addEventListener("change", () => {
        isLoadingMunicipalities = false;
        filterDepartmentsByZone();
    });

    departmentSelect?.addEventListener("change", () => {
        isLoadingMunicipalities = false;
        loadMunicipalities();
    });

    // ── Geocode button ──────────────────────────────────────────────────────
    geocodeBtn?.addEventListener("click", geocodeAddress);

    // ── Map ─────────────────────────────────────────────────────────────────
    if (document.getElementById("agency-form-map")) {
        initAgencyFormMap();
    }

    // ── Restore saved values on edit mode ───────────────────────────────────
    const isEditMode = paymentPointForm.querySelector('input[name="_method"]')?.value === "PUT";
    if (isEditMode && zoneSelect?.value) {
        filterDepartmentsByZone();
    }
});

// ── Zone → Department ───────────────────────────────────────────────────────

function filterDepartmentsByZone() {
    const zoneSelect         = document.getElementById("zone");
    const departmentSelect   = document.getElementById("department");
    const municipalitySelect = document.getElementById("municipality");

    if (!zoneSelect || !departmentSelect || !municipalitySelect) return;

    const zone            = zoneSelect.value;
    const savedDepartment = departmentSelect.dataset.savedValue;

    departmentSelect.innerHTML   = '<option value="">Seleccionar distrito</option>';
    municipalitySelect.innerHTML = '<option value="">Seleccionar municipio</option>';
    departmentSelect.disabled    = true;
    municipalitySelect.disabled  = true;

    if (!zone) return;

    const departments = DEPARTMENTS_BY_ZONE[zone] || [];
    const fragment    = document.createDocumentFragment();

    departments.forEach((dept) => {
        const option       = document.createElement("option");
        option.value       = dept;
        option.textContent = dept;
        fragment.appendChild(option);
    });

    departmentSelect.appendChild(fragment);
    departmentSelect.disabled = false;

    if (savedDepartment && departments.includes(savedDepartment)) {
        departmentSelect.value = savedDepartment;
        delete departmentSelect.dataset.savedValue;
        requestAnimationFrame(() => loadMunicipalities());
    }
}

// ── Department → Municipality ───────────────────────────────────────────────

function loadMunicipalities() {
    if (isLoadingMunicipalities) return;

    const departmentSelect   = document.getElementById("department");
    const municipalitySelect = document.getElementById("municipality");

    if (!departmentSelect || !municipalitySelect) return;

    const department = departmentSelect.value;
    if (!department) {
        municipalitySelect.innerHTML = '<option value="">Seleccionar municipio</option>';
        municipalitySelect.disabled  = true;
        return;
    }

    const savedMunicipality = municipalitySelect.dataset.savedValue;

    isLoadingMunicipalities      = true;
    municipalitySelect.innerHTML = '<option value="">Cargando...</option>';
    municipalitySelect.disabled  = true;

    const url = MUNICIPALITIES_URL || "/payment-points/municipalities";

    fetch(`${url}?department=${encodeURIComponent(department)}`)
        .then((r) => r.json())
        .then((data) => {
            if (data.success && data.municipalities) {
                municipalitySelect.innerHTML = '<option value="">Seleccionar municipio</option>';

                const fragment = document.createDocumentFragment();
                const added    = new Set();

                data.municipalities.forEach((m) => {
                    if (!added.has(m)) {
                        const option       = document.createElement("option");
                        option.value       = m;
                        option.textContent = m;
                        fragment.appendChild(option);
                        added.add(m);
                    }
                });

                municipalitySelect.appendChild(fragment);
                municipalitySelect.disabled = false;

                if (savedMunicipality) {
                    municipalitySelect.value = savedMunicipality;
                    delete municipalitySelect.dataset.savedValue;
                }
            }
        })
        .catch((error) => {
            console.error("Error loading municipalities:", error);
            municipalitySelect.innerHTML = '<option value="">Error al cargar</option>';
            showNotification("Error al cargar municipios", "error");
        })
        .finally(() => {
            isLoadingMunicipalities = false;
        });
}

// ── Geocode address ─────────────────────────────────────────────────────────

function geocodeAddress() {
    const addressInput       = document.getElementById("address");
    const departmentSelect   = document.getElementById("department");
    const municipalitySelect = document.getElementById("municipality");
    const latitudeInput      = document.getElementById("latitude");
    const longitudeInput     = document.getElementById("longitude");
    const geocodeBtn         = document.getElementById("geocode-btn");

    if (!addressInput || !departmentSelect || !municipalitySelect) {
        console.error("Required form elements not found");
        return;
    }

    const address      = addressInput.value;
    const department   = departmentSelect.value;
    const municipality = municipalitySelect.value;

    if (!address || !department || !municipality) {
        showNotification("Completa dirección, distrito y municipio", "warning");
        return;
    }

    if (geocodeBtn) {
        geocodeBtn.disabled = true;
        geocodeBtn.classList.add("opacity-50");
        geocodeBtn.innerHTML = '<i class="ri-loader-4-line mr-1 animate-spin"></i> Analizando ubicación...';
    }

    const url = GEOCODE_URL || "/payment-points/geocode";

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": CSRF,
            Accept: "application/json",
        },
        body: JSON.stringify({ address, department, municipality }),
    })
        .then((r) => r.json())
        .then((data) => {
            if (data.success) {
                if (latitudeInput)  latitudeInput.value  = data.latitude;
                if (longitudeInput) longitudeInput.value = data.longitude;

                if (typeof updateMapCoordinates === "function") {
                    updateMapCoordinates(data.latitude, data.longitude);
                }

                const messages = {
                    exact:        { text: "Ubicación exacta encontrada (punto de referencia identificado)", type: "success" },
                    street:       { text: "Ubicación de calle encontrada con buena precisión", type: "success" },
                    neighborhood: { text: "Ubicación de colonia/barrio encontrada", type: "success" },
                    address:      { text: "Ubicación aproximada encontrada. Verifica en el mapa.", type: "warning" },
                    municipality: { text: "Ubicación del municipio. Ajusta en el mapa si es necesario.", type: "warning" },
                    department:   { text: "Solo se encontró el distrito. Ajusta en el mapa manualmente.", type: "warning" },
                    fallback:     { text: data.message || "Usando coordenadas aproximadas. Ajusta en el mapa.", type: "error" },
                };

                const accuracy    = data.accuracy || "municipality";
                const messageInfo = messages[accuracy] || messages.address;
                showNotification(messageInfo.text, messageInfo.type);
            } else {
                showNotification(data.message || "No se encontró la ubicación", "error");
            }
        })
        .catch((error) => {
            console.error("Geocoding error:", error);
            showNotification("Error de conexión. Intenta nuevamente.", "error");
        })
        .finally(() => {
            if (geocodeBtn) {
                geocodeBtn.disabled = false;
                geocodeBtn.classList.remove("opacity-50");
                geocodeBtn.innerHTML = '<i class="ri-map-pin-line mr-1"></i> Obtener Coordenadas';
            }
        });
}
