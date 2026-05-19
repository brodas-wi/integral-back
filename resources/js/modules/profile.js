export function initProfileEdit() {
    const toggleBtn = document.getElementById("toggleEditMode");
    const cancelBtn = document.getElementById("cancelEdit");
    const editModeText = document.getElementById("editModeText");
    const actionButtons = document.getElementById("actionButtons");
    const passwordSection = document.getElementById("passwordSection");
    const confirmSection = document.getElementById("confirmSection");

    const usernameInput = document.getElementById("username");
    const nameInput = document.getElementById("name");
    const newPasswordInput = document.getElementById("new_password");
    const currentPasswordInput = document.getElementById("current_password");

    let isEditMode = false;

    const originalValues = {
        username: usernameInput.value,
        name: nameInput.value,
    };

    function setEditMode(enabled) {
        isEditMode = enabled;

        usernameInput.disabled = !enabled;
        nameInput.disabled = !enabled;
        newPasswordInput.disabled = !enabled;
        currentPasswordInput.disabled = !enabled;

        actionButtons.style.display = enabled ? "flex" : "none";
        passwordSection.style.display = enabled ? "block" : "none";
        confirmSection.style.display = enabled ? "block" : "none";

        if (enabled) {
            editModeText.textContent = "Modo Edición";
            toggleBtn.classList.remove("btn-outline");
            toggleBtn.classList.add("btn-primary");
            currentPasswordInput.required = true;
        } else {
            editModeText.textContent = "Editar Perfil";
            toggleBtn.classList.remove("btn-primary");
            toggleBtn.classList.add("btn-outline");
            currentPasswordInput.required = false;

            usernameInput.value = originalValues.username;
            nameInput.value = originalValues.name;
            newPasswordInput.value = "";
            currentPasswordInput.value = "";
        }
    }

    toggleBtn.addEventListener("click", () => {
        setEditMode(!isEditMode);
    });

    cancelBtn.addEventListener("click", () => {
        setEditMode(false);
    });
}

window.validateUsername = function (input) {
    const regex = /^[a-zA-Z0-9_-]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-Z0-9_-]/g, "");
    }
};

window.validateName = function (input) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, "");
    }
};

window.validatePassword = function (input) {
    const regex = /^[A-Za-z\d@$!%*?&]*$/;
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^A-Za-z\d@$!%*?&]/g, "");
    }
};

window.togglePasswordVisibility = function (inputId, button) {
    const input = document.getElementById(inputId);
    const icon = button.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("ri-eye-line");
        icon.classList.add("ri-eye-off-line");
    } else {
        input.type = "password";
        icon.classList.remove("ri-eye-off-line");
        icon.classList.add("ri-eye-line");
    }
};

window.generateSecurePassword = function (inputId) {
    const length = 16;
    const charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$!%*?&";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const special = "@$!%*?&";

    let password = "";
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];

    for (let i = password.length; i < length; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }

    password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");

    const input = document.getElementById(inputId);
    input.type = "text";
    input.value = password;

    const button = input.parentElement.querySelector(
        'button[title*="Mostrar"]',
    );
    if (button) {
        const icon = button.querySelector("i");
        icon.classList.remove("ri-eye-line");
        icon.classList.add("ri-eye-off-line");
    }

    if (typeof window.showNotification === "function") {
        window.showNotification(
            "Contraseña segura generada. Asegúrate de guardarla.",
            "success",
        );
    }
};
