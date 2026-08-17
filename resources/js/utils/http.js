import axios from "axios";

function getCsrfToken() {
    return document.querySelector('meta[name="csrf-token"]')?.content;
}

export const http = axios.create({
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Accept": "application/json",
    },
});

http.interceptors.request.use((config) => {
    config.headers["X-CSRF-TOKEN"] = getCsrfToken();
    return config;
});

export function extractErrorMessage(err, fallback = "Ocurrió un error inesperado.") {
    if (!err.response) {
        return "No se pudo conectar con el servidor. Verifica tu conexión.";
    }

    const { status, data } = err.response;

    if (status === 419) {
        return "Tu sesión expiró. Recarga la página e intenta de nuevo.";
    }

    if (status === 403) {
        return (data && typeof data === "object" && data.message) || "No tienes permisos para realizar esta acción.";
    }

    if (status === 404) {
        return "El registro no existe o fue eliminado.";
    }

    if (status === 422) {
        if (data && typeof data === "object" && data.errors) {
            const first = Object.values(data.errors)[0];
            if (Array.isArray(first) && first[0]) return first[0];
        }
        return (data && data.message) || "Los datos enviados no son válidos.";
    }

    if (data && typeof data === "object" && data.message) {
        return data.message;
    }

    if (status >= 500) {
        return "Error del servidor. Intenta de nuevo en unos momentos.";
    }

    return fallback;
}