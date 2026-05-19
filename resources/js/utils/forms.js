import { showNotification } from "./notifications.js";

// Toggle password field visibility
export function togglePasswordVisibility(inputId, iconElement) {
    const input = document.getElementById(inputId);
    const icon = iconElement.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("ri-eye-line");
        icon.classList.add("ri-eye-off-line");
    } else {
        input.type = "password";
        icon.classList.remove("ri-eye-off-line");
        icon.classList.add("ri-eye-line");
    }
}

// Generate random secure password
export function generateSecurePassword(inputId) {
    const length = 12;
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "@$!%*?&";
    const all = uppercase + lowercase + numbers + special;

    let password = "";
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    for (let i = password.length; i < length; i++) {
        password += all[Math.floor(Math.random() * all.length)];
    }

    password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    const input = document.getElementById(inputId);
    input.type = "text";
    input.value = password;

    showNotification("Contraseña generada exitosamente", "success");
}

// Validate username format
export function validateUsername(input) {
    const regex = /^[a-zA-Z0-9_-]+$/;
    const value = input.value;

    if (value && !regex.test(value)) {
        showFieldError(
            input,
            "Solo se permiten letras, números, guiones y guiones bajos",
        );
        return false;
    }

    clearFieldError(input);
    return true;
}

// Validate name format
export function validateName(input) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    const value = input.value;

    if (value && !regex.test(value)) {
        showFieldError(input, "Solo se permiten letras, espacios y acentos");
        return false;
    }

    clearFieldError(input);
    return true;
}

// Validate password strength
export function validatePassword(input) {
    const value = input.value;

    if (!value) {
        clearFieldError(input);
        return true;
    }

    const requirements = [];

    if (value.length < 8) {
        requirements.push("al menos 8 caracteres");
    }
    if (!/[a-z]/.test(value)) {
        requirements.push("una letra minúscula");
    }
    if (!/[A-Z]/.test(value)) {
        requirements.push("una letra mayúscula");
    }
    if (!/\d/.test(value)) {
        requirements.push("un número");
    }
    if (!/[@$!%*?&]/.test(value)) {
        requirements.push("un carácter especial (@$!%*?&)");
    }

    if (requirements.length > 0) {
        showFieldError(
            input,
            "La contraseña debe contener " + requirements.join(", "),
        );
        return false;
    }

    clearFieldError(input);
    return true;
}

// Show error message below field
export function showFieldError(input, message) {
    clearFieldError(input);

    input.classList.add("border-red-500");

    const wrapper = input.closest(".input-wrapper") || input.parentElement;

    const error = document.createElement("p");
    error.className = "text-red-500 text-sm mt-1 field-error";
    error.textContent = message;

    wrapper.appendChild(error);
}

// Clear field error message
export function clearFieldError(input) {
    input.classList.remove("border-red-500");

    const wrapper = input.closest(".input-wrapper") || input.parentElement;
    const existingError = wrapper.querySelector(".field-error");
    if (existingError) {
        existingError.remove();
    }
}
