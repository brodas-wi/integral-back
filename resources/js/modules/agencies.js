import { showNotification } from "../utils/notifications.js";
import { updateMapCoordinates } from "./agency-form-map.js";

const DEPARTMENTS_BY_ZONE = {
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

let isLoadingMunicipalities = false;

/**
 * Get departments by zone
 */
function getDepartmentsByZone(zone) {
    return DEPARTMENTS_BY_ZONE[zone] || [];
}

/**
 * Filter departments by zone
 */
export function filterDepartmentsByZone() {
    const zoneSelect = document.getElementById("zone");
    const departmentSelect = document.getElementById("department");
    const municipalitySelect = document.getElementById("municipality");

    if (!zoneSelect || !departmentSelect || !municipalitySelect) return;

    const zone = zoneSelect.value;
    const savedDepartment = departmentSelect.dataset.savedValue;

    departmentSelect.innerHTML =
        '<option value="">Seleccionar departamento</option>';
    municipalitySelect.innerHTML =
        '<option value="">Seleccionar municipio</option>';
    departmentSelect.disabled = true;
    municipalitySelect.disabled = true;

    if (!zone) return;

    const departments = getDepartmentsByZone(zone);
    const fragment = document.createDocumentFragment();

    departments.forEach((dept) => {
        const option = document.createElement("option");
        option.value = dept;
        option.textContent = dept;
        fragment.appendChild(option);
    });

    departmentSelect.appendChild(fragment);
    departmentSelect.disabled = false;

    if (savedDepartment && departments.includes(savedDepartment)) {
        departmentSelect.value = savedDepartment;
        delete departmentSelect.dataset.savedValue;

        requestAnimationFrame(() => {
            loadMunicipalities();
        });
    }
}

/**
 * Load municipalities by department
 */
export function loadMunicipalities() {
    if (isLoadingMunicipalities) {
        console.log("Already loading municipalities, skipping...");
        return;
    }

    const departmentSelect = document.getElementById("department");
    const municipalitySelect = document.getElementById("municipality");

    if (!departmentSelect || !municipalitySelect) return;

    const department = departmentSelect.value;
    if (!department) {
        municipalitySelect.innerHTML =
            '<option value="">Seleccionar municipio</option>';
        municipalitySelect.disabled = true;
        return;
    }

    const savedMunicipality = municipalitySelect.dataset.savedValue;

    isLoadingMunicipalities = true;
    municipalitySelect.innerHTML = '<option value="">Cargando...</option>';
    municipalitySelect.disabled = true;

    const municipalitiesRoute = "/agencies/municipalities";

    fetch(`${municipalitiesRoute}?department=${encodeURIComponent(department)}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.success && data.municipalities) {
                municipalitySelect.innerHTML =
                    '<option value="">Seleccionar municipio</option>';

                const fragment = document.createDocumentFragment();
                const addedMunicipalities = new Set();

                data.municipalities.forEach((municipality) => {
                    if (!addedMunicipalities.has(municipality)) {
                        const option = document.createElement("option");
                        option.value = municipality;
                        option.textContent = municipality;
                        fragment.appendChild(option);
                        addedMunicipalities.add(municipality);
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
            municipalitySelect.innerHTML =
                '<option value="">Error al cargar</option>';
            showNotification("Error al cargar municipios", "error");
        })
        .finally(() => {
            isLoadingMunicipalities = false;
        });
}

/**
 * Add phone input
 */
export function addPhone() {
    const container = document.getElementById("phones-container");
    if (!container) return;

    const phoneDiv = document.createElement("div");
    phoneDiv.className = "flex gap-2 mb-2";
    phoneDiv.innerHTML = `
        <input type="text" name="phones[]" class="input-field flex-1" placeholder="Ej: 2222-2222">
        <button type="button" onclick="removePhone(this)" class="btn-danger">
            <i class="ri-delete-bin-line"></i>
        </button>
    `;
    container.appendChild(phoneDiv);
}

/**
 * Remove phone input
 */
export function removePhone(button) {
    const container = document.getElementById("phones-container");
    if (container && container.children.length > 1) {
        button.closest(".flex").remove();
    }
}

/**
 * Geocode address using Nominatim API
 */
export function geocodeAddress() {
    const addressInput = document.getElementById("address");
    const departmentSelect = document.getElementById("department");
    const municipalitySelect = document.getElementById("municipality");
    const latitudeInput = document.getElementById("latitude");
    const longitudeInput = document.getElementById("longitude");
    const geocodeBtn = document.getElementById("geocode-btn");

    if (!addressInput || !departmentSelect || !municipalitySelect) {
        console.error("Required form elements not found");
        return;
    }

    const address = addressInput.value;
    const department = departmentSelect.value;
    const municipality = municipalitySelect.value;

    if (!address || !department || !municipality) {
        showNotification(
            "Completa dirección, departamento y municipio",
            "warning",
        );
        return;
    }

    if (geocodeBtn) {
        geocodeBtn.disabled = true;
        geocodeBtn.classList.add("opacity-50");
        geocodeBtn.innerHTML =
            '<i class="ri-loader-4-line mr-1 animate-spin"></i> Analizando ubicación...';
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]');
    const geocodeRoute = "/agencies/geocode";

    if (!csrfToken) {
        console.error("CSRF token not found");
        return;
    }

    fetch(geocodeRoute, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken.getAttribute("content"),
            Accept: "application/json",
        },
        body: JSON.stringify({ address, department, municipality }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                if (latitudeInput) latitudeInput.value = data.latitude;
                if (longitudeInput) longitudeInput.value = data.longitude;

                if (typeof updateMapCoordinates === "function") {
                    updateMapCoordinates(data.latitude, data.longitude);
                }

                const messages = {
                    exact: {
                        text: "Ubicación exacta encontrada (punto de referencia identificado)",
                        type: "success",
                    },
                    street: {
                        text: "Ubicación de calle encontrada con buena precisión",
                        type: "success",
                    },
                    neighborhood: {
                        text: "Ubicación de colonia/barrio encontrada",
                        type: "success",
                    },
                    address: {
                        text: "Ubicación aproximada encontrada. Verifica en el mapa.",
                        type: "warning",
                    },
                    municipality: {
                        text: "Ubicación del municipio. Ajusta en el mapa si es necesario.",
                        type: "warning",
                    },
                    department: {
                        text: "Solo se encontró el departamento. Ajusta en el mapa manualmente.",
                        type: "warning",
                    },
                    fallback: {
                        text:
                            data.message ||
                            "Usando coordenadas aproximadas. Ajusta en el mapa.",
                        type: "error",
                    },
                };

                const accuracy = data.accuracy || "municipality";
                const messageInfo = messages[accuracy] || messages.address;

                showNotification(messageInfo.text, messageInfo.type);
            } else {
                showNotification(
                    data.message || "No se encontró la ubicación",
                    "error",
                );
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
                geocodeBtn.innerHTML =
                    '<i class="ri-map-pin-line mr-1"></i> Obtener Coordenadas';
            }
        });
}

/**
 * Confirm agency deletion
 */
export function confirmDeleteAgency(agencyId, agencyName) {
    if (typeof window.showConfirmModal !== "function") {
        if (
            confirm(
                `¿Eliminar "${agencyName}"? Esta acción no se puede deshacer.`,
            )
        ) {
            deleteAgency(agencyId, agencyName);
        }
        return;
    }

    window.showConfirmModal({
        title: "¿Eliminar agencia?",
        message: `¿Estás seguro de que deseas eliminar "${agencyName}"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deleteAgency(agencyId, agencyName),
    });
}

/**
 * Delete agency via AJAX
 */
export function deleteAgency(agencyId, agencyName) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]');

    if (!csrfToken) {
        console.error("CSRF token not found");
        showNotification(
            "Error de configuración. Por favor recarga la página.",
            "error",
        );
        return;
    }

    const url = `/agencies/${agencyId}`;
    showNotification("Eliminando agencia...", "info");

    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken.getAttribute("content"),
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        },
        credentials: "same-origin",
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error del servidor: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            if (data.success) {
                showNotification(
                    data.message || "Agencia eliminada exitosamente",
                    "success",
                );

                const agencyItem = document.getElementById(
                    `agency-item-${agencyId}`,
                );
                const isShowPage = !document.querySelector(
                    '[id^="agency-item-"]',
                );

                if (agencyItem) {
                    agencyItem.style.transition =
                        "opacity 0.3s, transform 0.3s";
                    agencyItem.style.opacity = "0";
                    agencyItem.style.transform = "scale(0.9)";

                    setTimeout(() => {
                        agencyItem.remove();
                        const remaining = document.querySelectorAll(
                            '[id^="agency-item-"]',
                        );
                        if (remaining.length === 0) {
                            window.location.reload();
                        }
                    }, 300);
                } else if (isShowPage) {
                    setTimeout(() => {
                        window.location.href = "/agencies";
                    }, 1500);
                }
            } else {
                throw new Error(data.message || "Error al eliminar");
            }
        })
        .catch((error) => {
            console.error("Error deleting agency:", error);
            showNotification(
                "Error al eliminar la agencia. " + error.message,
                "error",
            );
        });
}

/**
 * Confirm deletion from show page
 */
export function confirmDeleteAgencyShow() {
    const deleteForm = document.getElementById("delete-form");

    if (!deleteForm) {
        console.error("Delete form not found");
        return;
    }

    const agencyName = deleteForm.dataset.agencyName || "esta agencia";

    if (typeof window.showConfirmModal !== "function") {
        if (
            confirm(
                `¿Eliminar ${agencyName}? Esta acción no se puede deshacer.`,
            )
        ) {
            deleteForm.submit();
        }
        return;
    }

    window.showConfirmModal({
        title: "¿Eliminar agencia?",
        message: `¿Estás seguro de que deseas eliminar ${agencyName}? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deleteForm.submit(),
    });
}

/**
 * Initialize agency form
 */
function initAgencyForm() {
    const agencyForm = document.getElementById("agencyForm");
    if (!agencyForm) return;

    const zoneSelect = document.getElementById("zone");
    const departmentSelect = document.getElementById("department");

    const zoneHandler = () => {
        isLoadingMunicipalities = false;
        filterDepartmentsByZone();
    };

    const deptHandler = () => {
        isLoadingMunicipalities = false;
        loadMunicipalities();
    };

    if (zoneSelect) {
        zoneSelect.removeEventListener("change", zoneHandler);
        zoneSelect.addEventListener("change", zoneHandler);
    }

    if (departmentSelect) {
        departmentSelect.removeEventListener("change", deptHandler);
        departmentSelect.addEventListener("change", deptHandler);
    }

    const isEditMode =
        agencyForm.querySelector('input[name="_method"]')?.value === "PUT";

    if (isEditMode && zoneSelect?.value && departmentSelect) {
        requestAnimationFrame(() => {
            filterDepartmentsByZone();
        });
    }
}

/**
 * Initialize agency show page
 */
function initAgencyShow() {
    const deleteForm = document.getElementById("delete-form");
    if (!deleteForm) return;

    const agencyNameElement = document.querySelector("h2");
    if (agencyNameElement) {
        deleteForm.dataset.agencyName = agencyNameElement.textContent.trim();
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initAgencyForm();
        initAgencyShow();
    });
} else {
    initAgencyForm();
    initAgencyShow();
}
