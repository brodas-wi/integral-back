import { showNotification } from "../utils/notifications.js";

const MAX_SELECTION = 20;

export function initAgencyBulkGeocode() {
    window.updateBulkActions = updateBulkActions;
    window.selectAllVisible = selectAllVisible;
    window.deselectAll = deselectAll;
    window.geocodeSelected = geocodeSelected;

    clearSelectionsOnLoad();
}

function clearSelectionsOnLoad() {
    document.querySelectorAll(".agency-checkbox").forEach((checkbox) => {
        checkbox.checked = false;
    });
}

function updateBulkActions() {
    const checkboxes = document.querySelectorAll(".agency-checkbox:checked");
    const count = checkboxes.length;
    const bulkBar = document.getElementById("bulk-actions-bar");
    const selectedCount = document.getElementById("selected-count");

    if (count > 0) {
        bulkBar.classList.remove("hidden");
        selectedCount.textContent = count;

        if (count > MAX_SELECTION) {
            document.getElementById("geocode-selected-btn").disabled = true;
            showNotification(
                `Solo puedes geolocalizar hasta ${MAX_SELECTION} agencias a la vez`,
                "warning",
            );
        } else {
            document.getElementById("geocode-selected-btn").disabled = false;
        }
    } else {
        bulkBar.classList.add("hidden");
    }
}

function selectAllVisible() {
    const checkboxes = document.querySelectorAll(".agency-checkbox");
    const toSelect = Math.min(checkboxes.length, MAX_SELECTION);

    checkboxes.forEach((checkbox, index) => {
        if (index < toSelect) {
            checkbox.checked = true;
        }
    });

    updateBulkActions();

    if (checkboxes.length > MAX_SELECTION) {
        showNotification(
            `Se seleccionaron las primeras ${MAX_SELECTION} agencias (límite máximo)`,
            "info",
        );
    }
}

function deselectAll() {
    document
        .querySelectorAll(".agency-checkbox:checked")
        .forEach((checkbox) => {
            checkbox.checked = false;
        });
    updateBulkActions();
}

async function geocodeSelected() {
    const checkboxes = document.querySelectorAll(".agency-checkbox:checked");

    if (checkboxes.length === 0) {
        showNotification("Selecciona al menos una agencia", "warning");
        return;
    }

    if (checkboxes.length > MAX_SELECTION) {
        showNotification(
            `Solo puedes geolocalizar hasta ${MAX_SELECTION} agencias a la vez`,
            "error",
        );
        return;
    }

    const agencies = Array.from(checkboxes).map((cb) => {
        const item = cb.closest(".agency-item");
        return {
            id: parseInt(item.dataset.agencyId),
            address: item.dataset.address,
            municipality: item.dataset.municipality,
            department: item.dataset.department,
            name: item.dataset.name,
        };
    });

    const progressContainer = document.getElementById("geocoding-progress");
    const progressBar = document.getElementById("geocoding-progress-bar");
    const progressText = document.getElementById("geocoding-progress-text");
    const progressDetails = document.getElementById("geocoding-details");
    const geocodeBtn = document.getElementById("geocode-selected-btn");

    progressContainer.classList.remove("hidden");
    geocodeBtn.disabled = true;
    geocodeBtn.innerHTML =
        '<i class="ri-loader-4-line mr-2 animate-spin"></i> Procesando...';

    let completed = 0;
    let successful = 0;
    let failed = 0;

    for (const agency of agencies) {
        try {
            progressDetails.textContent = `Geocodificando: ${agency.name}`;

            const result = await geocodeAgency(agency);

            if (result.success) {
                successful++;
                updateAgencyBadge(agency.id, true);
            } else {
                failed++;
            }
        } catch (error) {
            console.error(`Error geocoding agency ${agency.id}:`, error);
            failed++;
        }

        completed++;
        const progress = (completed / agencies.length) * 100;
        progressBar.style.setProperty('--progress', `${progress}%`);
        progressText.textContent = `${Math.round(progress)}%`;

        await sleep(1000);
    }

    progressDetails.textContent = `Completado: ${successful} exitosos, ${failed} fallidos`;

    setTimeout(() => {
        progressContainer.classList.add("hidden");
        geocodeBtn.disabled = false;
        geocodeBtn.innerHTML =
            '<i class="ri-map-pin-line mr-2"></i> Obtener Coordenadas';
        deselectAll();

        if (successful > 0) {
            showNotification(
                `Se geolocalizaron ${successful} agencias exitosamente`,
                "success",
            );
        }

        if (failed > 0) {
            showNotification(
                `${failed} agencias no pudieron ser geocodificadas`,
                "warning",
            );
        }
    }, 2000);
}

async function geocodeAgency(agency) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    const response = await fetch("/agencies/geocode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Accept: "application/json",
        },
        body: JSON.stringify({
            address: agency.address,
            department: agency.department,
            municipality: agency.municipality,
        }),
    });

    const data = await response.json();

    if (data.success) {
        await updateAgencyCoordinates(agency.id, data.latitude, data.longitude);
        return { success: true };
    }

    return { success: false };
}

async function updateAgencyCoordinates(agencyId, latitude, longitude) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    await fetch(`/agencies/${agencyId}/update-coordinates`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Accept: "application/json",
        },
        body: JSON.stringify({
            latitude,
            longitude,
        }),
    });
}

function updateAgencyBadge(agencyId, hasCoordinates) {
    const item = document.getElementById(`agency-item-${agencyId}`);
    if (!item) return;

    const badges = item.querySelectorAll(".badge");
    let coordinateBadge = null;

    badges.forEach((badge) => {
        if (
            badge.classList.contains("badge-warning") ||
            badge.classList.contains("badge-success")
        ) {
            const text = badge.textContent.trim();
            if (text.includes("ubicación")) {
                coordinateBadge = badge;
            }
        }
    });

    if (!coordinateBadge) return;

    if (hasCoordinates) {
        coordinateBadge.classList.remove("badge-warning");
        coordinateBadge.classList.add("badge-success");
        coordinateBadge.title = "Tiene coordenadas";
        coordinateBadge.innerHTML =
            '<i class="ri-map-pin-line mr-1"></i> Con ubicación';
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
