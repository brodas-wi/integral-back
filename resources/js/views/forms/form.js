import { showNotification } from "@/utils/notifications.js";
import { copyText } from "@/utils/clipboard.js";

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;
const root = document.getElementById("form-editor");

const RESERVED_VARIABLES = ["form_title", "submission_id", "date"];

const $ = (id) => document.getElementById(id);

let initialConfirmField = null;

function readInitial() {
    try {
        return JSON.parse($("form-initial").textContent);
    } catch {
        return {};
    }
}

function fill(initial) {
    const thanks = initial.settings?.thanks ?? {};
    const notify = initial.settings?.emails?.notify ?? {};
    const confirmation = initial.settings?.emails?.confirmation ?? {};

    $("f-name").value = initial.name ?? "";
    $("f-active").checked = initial.is_active !== false;
    $("f-title").value = initial.title ?? "";
    $("f-description").value = initial.description ?? "";
    $("f-submit-label").value = initial.submit_label ?? "";
    $("f-fields-json").value = JSON.stringify(initial.fields ?? [], null, 2);

    $("t-title").value = thanks.title ?? "";
    $("t-subtitle").value = thanks.subtitle ?? "";
    $("t-seconds").value = thanks.seconds ?? "";
    $("t-redirect").value = thanks.redirect_url ?? "";

    $("n-enabled").checked = Boolean(notify.enabled);
    $("n-recipients").value = (notify.recipients ?? []).join("\n");
    $("n-subject").value = notify.subject ?? "";

    $("c-enabled").checked = Boolean(confirmation.enabled);
    $("c-subject").value = confirmation.subject ?? "";
    $("c-body").value = confirmation.body ?? "";
    initialConfirmField = confirmation.field_key ?? null;
}

function parseFields() {
    try {
        const parsed = JSON.parse($("f-fields-json").value);
        if (!Array.isArray(parsed)) throw new Error("not-array");
        return parsed;
    } catch {
        return null;
    }
}

function refreshDependentUi() {
    const fields = parseFields() ?? [];
    const select = $("c-field");
    const previous = select.value || initialConfirmField || "";

    const emailFields = fields.filter((field) => field.type === "email" && field.key);
    select.innerHTML = "";

    const pendingEmail = fields.some((field) => field.type === "email" && !field.key);

    if (!emailFields.length) {
        select.append(
            new Option(
                pendingEmail
                    ? "Se asignará automáticamente al guardar"
                    : "No hay campos de correo en el formulario",
                "",
            ),
        );
    } else {
        emailFields.forEach((field) => {
            select.append(new Option(`${field.label || "Correo"} (${field.key})`, field.key));
        });
        select.value = emailFields.some((field) => field.key === previous)
            ? previous
            : emailFields[0].key;
    }

    const hint = $("variables-hint");
    hint.innerHTML = "";
    [...RESERVED_VARIABLES, ...fields.map((field) => field.key).filter(Boolean)].forEach((name) => {
        const chip = document.createElement("code");
        chip.className = "text-xs bg-white border border-gray-200 rounded-full px-2 py-1";
        chip.textContent = `{{${name}}}`;
        hint.appendChild(chip);
    });
}

function collect(fields) {
    const recipients = $("n-recipients")
        .value.split(/[\s,;]+/)
        .map((value) => value.trim())
        .filter(Boolean);

    return {
        name: $("f-name").value,
        is_active: $("f-active").checked,
        title: $("f-title").value,
        description: $("f-description").value,
        submit_label: $("f-submit-label").value,
        fields,
        settings: {
            thanks: {
                title: $("t-title").value,
                subtitle: $("t-subtitle").value,
                seconds: $("t-seconds").value,
                redirect_url: $("t-redirect").value,
            },
            emails: {
                notify: {
                    enabled: $("n-enabled").checked,
                    recipients,
                    subject: $("n-subject").value,
                },
                confirmation: {
                    enabled: $("c-enabled").checked,
                    field_key: $("c-field").value || null,
                    subject: $("c-subject").value,
                    body: $("c-body").value,
                },
            },
        },
    };
}

function describe(path, message) {
    const option = path.match(/^fields\.(\d+)\.options\.(\d+)/);
    if (option) return `Campo ${Number(option[1]) + 1}, opción ${Number(option[2]) + 1}: ${message}`;

    const field = path.match(/^fields\.(\d+)/);
    if (field) return `Campo ${Number(field[1]) + 1}: ${message}`;

    return message;
}

function showErrors(messages) {
    const list = $("form-errors-list");
    list.innerHTML = "";
    messages.forEach((message) => {
        const item = document.createElement("li");
        item.textContent = message;
        list.appendChild(item);
    });
    $("form-errors").classList.remove("hidden");
    $("form-errors").scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearErrors() {
    $("form-errors").classList.add("hidden");
    $("form-errors-list").innerHTML = "";
}

async function save() {
    clearErrors();

    const fields = parseFields();
    if (!fields) {
        showErrors(["El JSON de los campos no es válido. Debe ser una lista entre corchetes []."]);
        return;
    }

    const button = $("save-form");
    const label = button.querySelector("span");
    const original = label.textContent;
    button.disabled = true;
    label.textContent = "Guardando...";

    try {
        const response = await fetch(root.dataset.submitUrl, {
            method: root.dataset.method,
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": CSRF,
                Accept: "application/json",
                "X-Requested-With": "XMLHttpRequest",
            },
            credentials: "same-origin",
            body: JSON.stringify(collect(fields)),
        });

        if (response.status === 401 || response.status === 419) {
            throw new Error("Tu sesión ha expirado. Recarga la página.");
        }

        const data = await response.json().catch(() => ({}));

        if (response.status === 422) {
            const messages = Object.entries(data.errors ?? {}).flatMap(([path, list]) =>
                list.map((message) => describe(path, message)),
            );
            showErrors(messages.length ? messages : [data.message || "Los datos no son válidos."]);
            return;
        }

        if (!response.ok || !data.success) {
            throw new Error(data.message || `Error del servidor: ${response.status}`);
        }

        if (data.redirect) {
            window.location.href = data.redirect;
            return;
        }

        if (Array.isArray(data.fields)) {
            $("f-fields-json").value = JSON.stringify(data.fields, null, 2);
        }
        initialConfirmField = $("c-field").value || initialConfirmField;
        refreshDependentUi();
        showNotification(data.message, "success");
    } catch (error) {
        showNotification(error.message || "Ocurrió un error al guardar", "error");
    } finally {
        button.disabled = false;
        label.textContent = original;
    }
}

if (root) {
    fill(readInitial());
    refreshDependentUi();

    $("f-fields-json").addEventListener("input", refreshDependentUi);
    $("save-form").addEventListener("click", save);

    document.addEventListener("click", async (event) => {
        const copy = event.target.closest("[data-copy]");
        if (!copy) return;
        const copied = await copyText(copy.dataset.copy);
        showNotification(copied ? "Copiado al portapapeles" : "No se pudo copiar", copied ? "success" : "error");
    });
}