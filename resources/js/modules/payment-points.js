import { showNotification } from "../utils/notifications.js";
import { updateMapCoordinates } from "./agency-form-map.js";

const DEPARTMENTS_BY_ZONE = {
    Occidental: ["Ahuachapán", "Santa Ana", "Sonsonate"],
    Central: [
        "La Libertad",
        "San Salvador",
        "Chalatenango",
        "Cuscatlán",
        "La Paz",
        "Cabañas",
        "San Vicente",
    ],
    Oriental: ["Usulután", "San Miguel", "Morazán", "La Unión"],
};

let isLoadingMunicipalities = false;

function getDepartmentsByZone(zone) {
    return DEPARTMENTS_BY_ZONE[zone] || [];
}

export function filterDepartmentsByZone() {
    const zoneSelect = document.getElementById("zone");
    const departmentSelect = document.getElementById("department");
    const municipalitySelect = document.getElementById("municipality");

    if (!zoneSelect || !departmentSelect || !municipalitySelect) return;

    const zone = zoneSelect.value;
    const savedDepartment = departmentSelect.dataset.savedValue;

    departmentSelect.innerHTML =
        '<option value="">Seleccionar distrito</option>';
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

    const municipalitiesRoute = "/payment-points/municipalities";

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
        showNotification("Completa dirección, distrito y municipio", "warning");
        return;
    }

    if (geocodeBtn) {
        geocodeBtn.disabled = true;
        geocodeBtn.classList.add("opacity-50");
        geocodeBtn.innerHTML =
            '<i class="ri-loader-4-line mr-1 animate-spin"></i> Analizando ubicación...';
    }

    const csrfToken = document.querySelector('meta[name="csrf-token"]');
    const geocodeRoute = "/payment-points/geocode";

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
                        text: "Solo se encontró el distrito. Ajusta en el mapa manualmente.",
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

export function confirmDeletePaymentPoint(pointId, pointName) {
    if (typeof window.showConfirmModal !== "function") {
        if (
            confirm(
                `¿Eliminar "${pointName}"? Esta acción no se puede deshacer.`,
            )
        ) {
            deletePaymentPoint(pointId, pointName);
        }
        return;
    }

    window.showConfirmModal({
        title: "¿Eliminar punto de pago?",
        message: `¿Estás seguro de que deseas eliminar "${pointName}"? Esta acción no se puede deshacer.`,
        confirmText: "Eliminar",
        cancelText: "Cancelar",
        type: "danger",
        onConfirm: () => deletePaymentPoint(pointId, pointName),
    });
}

export function deletePaymentPoint(pointId, pointName) {
    const csrfToken = document.querySelector('meta[name="csrf-token"]');

    if (!csrfToken) {
        console.error("CSRF token not found");
        showNotification(
            "Error de configuración. Por favor recarga la página.",
            "error",
        );
        return;
    }

    const url = `/payment-points/${pointId}`;
    showNotification("Eliminando punto de pago...", "info");

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
                    data.message || "Punto de pago eliminado exitosamente",
                    "success",
                );

                const pointItem = document.getElementById(
                    `payment-point-item-${pointId}`,
                );
                const isShowPage = !document.querySelector(
                    '[id^="payment-point-item-"]',
                );

                if (pointItem) {
                    pointItem.style.transition = "opacity 0.3s, transform 0.3s";
                    pointItem.style.opacity = "0";
                    pointItem.style.transform = "scale(0.9)";

                    setTimeout(() => {
                        pointItem.remove();
                        const remaining = document.querySelectorAll(
                            '[id^="payment-point-item-"]',
                        );
                        if (remaining.length === 0) {
                            window.location.reload();
                        }
                    }, 300);
                } else if (isShowPage) {
                    setTimeout(() => {
                        window.location.href = "/payment-points";
                    }, 1500);
                }
            } else {
                throw new Error(data.message || "Error al eliminar");
            }
        })
        .catch((error) => {
            console.error("Error deleting payment point:", error);
            showNotification(
                "Error al eliminar el punto de pago. " + error.message,
                "error",
            );
        });
}

function initPaymentPointForm() {
    const paymentPointForm = document.getElementById("paymentPointForm");
    if (!paymentPointForm) return;

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
        paymentPointForm.querySelector('input[name="_method"]')?.value ===
        "PUT";

    if (isEditMode && zoneSelect?.value && departmentSelect) {
        requestAnimationFrame(() => {
            filterDepartmentsByZone();
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        initPaymentPointForm();
    });
} else {
    initPaymentPointForm();
}
