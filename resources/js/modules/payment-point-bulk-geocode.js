import { showNotification } from "../utils/notifications.js";

const MAX_SELECTION = 20;

export function initBulkGeocode() {
    window.updateBulkActions = updateBulkActions;
    window.selectAllVisible = selectAllVisible;
    window.deselectAll = deselectAll;
    window.geocodeSelected = geocodeSelected;

    clearSelectionsOnLoad();
}

function clearSelectionsOnLoad() {
    document.querySelectorAll(".point-checkbox").forEach((checkbox) => {
        checkbox.checked = false;
    });
}

function updateBulkActions() {
    const checkboxes = document.querySelectorAll(".point-checkbox:checked");
    const count = checkboxes.length;
    const bulkBar = document.getElementById("bulk-actions-bar");
    const selectedCount = document.getElementById("selected-count");

    if (count > 0) {
        bulkBar.classList.remove("hidden");
        selectedCount.textContent = count;

        if (count > MAX_SELECTION) {
            document.getElementById("geocode-selected-btn").disabled = true;
            showNotification(
                `Solo puedes geolocalizar hasta ${MAX_SELECTION} puntos a la vez`,
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
    const checkboxes = document.querySelectorAll(".point-checkbox");
    const toSelect = Math.min(checkboxes.length, MAX_SELECTION);

    checkboxes.forEach((checkbox, index) => {
        if (index < toSelect) {
            checkbox.checked = true;
        }
    });

    updateBulkActions();

    if (checkboxes.length > MAX_SELECTION) {
        showNotification(
            `Se seleccionaron los primeros ${MAX_SELECTION} puntos (límite máximo)`,
            "info",
        );
    }
}

function deselectAll() {
    document.querySelectorAll(".point-checkbox:checked").forEach((checkbox) => {
        checkbox.checked = false;
    });
    updateBulkActions();
}

async function geocodeSelected() {
    const checkboxes = document.querySelectorAll(".point-checkbox:checked");

    if (checkboxes.length === 0) {
        showNotification("Selecciona al menos un punto", "warning");
        return;
    }

    if (checkboxes.length > MAX_SELECTION) {
        showNotification(
            `Solo puedes geolocalizar hasta ${MAX_SELECTION} puntos a la vez`,
            "error",
        );
        return;
    }

    const points = Array.from(checkboxes).map((cb) => {
        const item = cb.closest(".payment-point-item");
        return {
            id: parseInt(item.dataset.pointId),
            address: item.dataset.address,
            municipality: item.dataset.municipality,
            department: item.dataset.department,
            affiliate: item.dataset.affiliate,
            branch: item.dataset.branch,
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

    for (const point of points) {
        try {
            progressDetails.textContent = `Geocodificando: ${point.affiliate} - ${point.branch}`;

            const result = await geocodePoint(point);

            if (result.success) {
                successful++;
                updatePointBadge(point.id, true);
            } else {
                failed++;
            }
        } catch (error) {
            console.error(`Error geocoding point ${point.id}:`, error);
            failed++;
        }

        completed++;
        const progress = (completed / points.length) * 100;
        progressBar.style.width = `${progress}%`;
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
                `Se geolocalizaron ${successful} puntos exitosamente`,
                "success",
            );
        }

        if (failed > 0) {
            showNotification(
                `${failed} puntos no pudieron ser geolocalizados`,
                "warning",
            );
        }
    }, 2000);
}

async function geocodePoint(point) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    const response = await fetch("/payment-points/geocode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Accept: "application/json",
        },
        body: JSON.stringify({
            address: point.address,
            department: point.department,
            municipality: point.municipality,
        }),
    });

    const data = await response.json();

    if (data.success) {
        await updatePointCoordinates(point.id, data.latitude, data.longitude);
        return { success: true };
    }

    return { success: false };
}

async function updatePointCoordinates(pointId, latitude, longitude) {
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        .getAttribute("content");

    await fetch(`/payment-points/${pointId}/update-coordinates`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
            Accept: "application/json",
        },
        body: JSON.stringify({ latitude, longitude }),
    });
}

function updatePointBadge(pointId, hasCoordinates) {
    const item = document.getElementById(`payment-point-item-${pointId}`);
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
