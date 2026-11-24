import { showNotification } from "@/utils/notifications.js";
import { copyText } from "@/utils/clipboard.js";
import { createJsonEditor } from "./json-editor.js";
import { createFieldBuilder } from "./field-builder.js";

const CSRF = document.querySelector('meta[name="csrf-token"]')?.content;
const root = document.getElementById("form-editor");

const RESERVED_VARIABLES = ["form_title", "submission_id", "date", "correlative"];

const $ = (id) => document.getElementById(id);

let initialConfirmField = null;
let mode = "simple";
let fieldsData = [];
let builder = null;
let editor = null;
let routingGroups = [];
let routeFieldKey = null;
const DEFAULT_NOTIFY_BODY =
    "Se recibió una nueva respuesta en {{form_title}}.\n\nCorrelativo: {{correlative}}\nFecha: {{date}}\n\n{{answers}}\n\nVer respuesta en el CMS:\n{{admin_url}}";

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
    syncActiveUi();
    $("f-title").value = initial.title ?? "";
    $("f-description").value = initial.description ?? "";
    $("f-submit-label").value = initial.submit_label ?? "";
    fieldsData = Array.isArray(initial.fields) ? initial.fields : [];
    builder?.setFields(fieldsData);
    editor?.setValue(JSON.stringify(fieldsData, null, 2));

    const correlative = initial.settings?.correlative ?? {};
    $("k-enabled").checked = Boolean(correlative.enabled);
    document.querySelector(
        `input[name="k-mode"][value="${correlative.mode === "custom" ? "custom" : "default"}"]`,
    ).checked = true;
    $("k-prefix").value = correlative.prefix ?? "SOL";
    $("k-pattern").value = correlative.pattern ?? "SOL-{MM}{YYYY}-{N:5}";
    syncCorrelativeUi();

    $("t-title").value = thanks.title ?? "";
    $("t-subtitle").value = thanks.subtitle ?? "";
    $("t-seconds").value = thanks.seconds ?? "";
    $("t-redirect").value = thanks.redirect_url ?? "";

    $("n-enabled").checked = Boolean(notify.enabled);
    $("n-recipients").value = (notify.recipients ?? []).join("\n");
    $("n-subject").value = notify.subject ?? "";
    $("n-body").value = notify.body ?? DEFAULT_NOTIFY_BODY;

    const routing = notify.routing ?? {};
    document.querySelector(
        `input[name="n-mode"][value="${notify.mode === "routed" ? "routed" : "all"}"]`,
    ).checked = true;
    routeFieldKey = routing.field_key ?? null;
    routingGroups = (routing.groups ?? []).map((group) => ({
        values: group.values ?? [],
        primary: group.primary ?? "",
        cc: (group.cc ?? []).join("\n"),
    }));
    $("n-route-field").innerHTML = "";
    delete $("n-groups").dataset.ready;
    syncNotifyUi();

    $("c-enabled").checked = Boolean(confirmation.enabled);
    $("c-subject").value = confirmation.subject ?? "";
    $("c-body").value = confirmation.body ?? "";
    initialConfirmField = confirmation.field_key ?? null;
}

function parseFields() {
    if (mode === "simple") return fieldsData;

    try {
        const parsed = JSON.parse(editor.getValue());
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
    [
        ...RESERVED_VARIABLES,
        "answers",
        "admin_url",
        ...fields.filter((field) => field.type !== "note").map((field) => field.key),
    ]
        .filter(Boolean)
        .forEach((name) => {
            const chip = document.createElement("code");
            chip.className = "text-xs bg-white border border-gray-200 rounded-full px-2 py-1";
            chip.textContent = `{{${name}}}`;
            hint.appendChild(chip);
        });

    syncRouting(fields);
}

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function splitEmails(value) {
    return value
        .split(/[\s,;]+/)
        .map((item) => item.trim())
        .filter(Boolean);
}

function notifyMode() {
    return document.querySelector('input[name="n-mode"]:checked')?.value ?? "all";
}

function syncNotifyUi() {
    const routed = notifyMode() === "routed";
    $("n-routing").classList.toggle("hidden", !routed);
    $("n-recipients-label").textContent = routed
        ? "Correos generales (uno por línea, máximo 10)"
        : "Destinatarios (uno por línea, máximo 10)";
    $("n-recipients-help").textContent = routed
        ? "Reciben copia de todas las respuestas y son el destino de las que no tengan grupo. Son obligatorios si el campo es opcional o hay opciones sin grupo."
        : "Reciben todas las respuestas.";
}

function readGroups() {
    return [...$("n-groups").children].map((card) => ({
        values: [...card.querySelectorAll("[data-g-value]:checked")].map((input) => input.value),
        primary: card.querySelector("[data-g-primary]").value,
        cc: card.querySelector("[data-g-cc]").value,
    }));
}

function currentRouteField() {
    const key = $("n-route-field").value;
    return (parseFields() ?? []).find((field) => field.type === "select" && field.key === key) ?? null;
}

function groupCard(group, index, options) {
    const card = el("div", "rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-3");
    const head = el("div", "flex items-center justify-between gap-2");
    head.append(el("p", "text-sm font-semibold text-secondary", `Grupo ${index + 1}`));

    const remove = el("button", "btn-outline btn-sm");
    remove.type = "button";
    remove.title = "Quitar grupo";
    remove.innerHTML = '<i class="ri-delete-bin-line"></i>';
    remove.addEventListener("click", () => {
        card.remove();
        renderGroups(readGroups());
    });
    head.append(remove);

    const optionsBox = el("div", "flex flex-wrap gap-x-4 gap-y-2");
    options.forEach((option) => {
        const label = el("label", "flex items-center gap-2 text-sm text-gray-700 cursor-pointer");
        const input = el("input", "w-4 h-4 accent-primary");
        input.type = "checkbox";
        input.value = option.value;
        input.dataset.gValue = "";
        input.checked = (group.values ?? []).includes(option.value);
        label.append(input, el("span", "", option.label || option.value));
        optionsBox.append(label);
    });

    if (!options.length) {
        optionsBox.append(el("p", "text-xs text-gray-500", "Este campo aún no tiene opciones guardadas."));
    }

    const primary = el("input", "input-field");
    primary.type = "text";
    primary.maxLength = 190;
    primary.placeholder = "correo.principal@empresa.com";
    primary.value = group.primary ?? "";
    primary.dataset.gPrimary = "";

    const cc = el("textarea", "input-field !rounded-2xl");
    cc.rows = 2;
    cc.placeholder = "uno por línea, máximo 5";
    cc.value = group.cc ?? "";
    cc.dataset.gCc = "";

    const primaryWrap = el("div");
    primaryWrap.append(el("label", "block text-xs font-medium text-gray-700 mb-1", "Correo principal"), primary);

    const ccWrap = el("div");
    ccWrap.append(el("label", "block text-xs font-medium text-gray-700 mb-1", "Con copia (opcional)"), cc);

    card.append(
        head,
        el("p", "text-xs font-medium text-gray-700", "Opciones de este grupo"),
        optionsBox,
        primaryWrap,
        ccWrap,
    );

    return card;
}

function renderGroups(groups) {
    const options = (currentRouteField()?.options ?? []).filter((option) => option.value);
    const list = $("n-groups");
    list.innerHTML = "";
    groups.forEach((group, index) => list.appendChild(groupCard(group, index, options)));
    list.dataset.ready = "1";
    routingGroups = groups;
    $("n-groups-empty").classList.toggle("hidden", groups.length > 0);
}

function syncRouting(fields) {
    const select = $("n-route-field");
    const previous = select.value || routeFieldKey || "";
    const listFields = fields.filter((field) => field.type === "select" && field.key);

    select.innerHTML = "";

    if (!listFields.length) {
        select.append(new Option("No hay campos de lista guardados en el formulario", ""));
    } else {
        listFields.forEach((field) => {
            select.append(new Option(`${field.label || "Lista"} (${field.key})`, field.key));
        });
        select.value = listFields.some((field) => field.key === previous) ? previous : listFields[0].key;
    }

    renderGroups($("n-groups").dataset.ready ? readGroups() : routingGroups);
}

function syncActiveUi() {
    const active = $("f-active").checked;
    $("f-active-title").textContent = active ? "Formulario activo" : "Formulario inactivo";
    $("f-active-help").textContent = active
        ? "Visible en la página pública."
        : "Oculto en la página pública.";
}

function correlativeMode() {
    return document.querySelector('input[name="k-mode"]:checked')?.value ?? "default";
}

function correlativePreview() {
    const now = new Date();
    const year = String(now.getFullYear());
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const prefix = ($("k-prefix").value.trim() || "SOL").toUpperCase();
    const pattern = correlativeMode() === "default" ? `${prefix}-{MM}{YYYY}-{N:5}` : $("k-pattern").value;

    return pattern.replace(/\{(YYYY|YY|MM|DD|N)(?::(\d{1,2}))?\}/g, (_, token, pad) => {
        if (token === "YYYY") return year;
        if (token === "YY") return year.slice(2);
        if (token === "MM") return month;
        if (token === "DD") return day;
        return "1".padStart(Number(pad) || 1, "0");
    });
}

function syncCorrelativeUi() {
    const mode = correlativeMode();
    $("k-options").classList.toggle("hidden", !$("k-enabled").checked);
    $("k-default").classList.toggle("hidden", mode !== "default");
    $("k-custom").classList.toggle("hidden", mode !== "custom");
    $("k-preview").textContent = correlativePreview();
}

function collect(fields) {
    const recipients = splitEmails($("n-recipients").value);

    return {
        base_version: root.dataset.baseVersion ? Number(root.dataset.baseVersion) : null,
        name: $("f-name").value,
        is_active: $("f-active").checked,
        title: $("f-title").value,
        description: $("f-description").value,
        submit_label: $("f-submit-label").value,
        fields,
        settings: {
            correlative: {
                enabled: $("k-enabled").checked,
                mode: correlativeMode(),
                prefix: $("k-prefix").value,
                pattern: $("k-pattern").value,
            },
            thanks: {
                title: $("t-title").value,
                subtitle: $("t-subtitle").value,
                seconds: $("t-seconds").value,
                redirect_url: $("t-redirect").value,
            },
            emails: {
                notify: {
                    enabled: $("n-enabled").checked,
                    mode: notifyMode(),
                    recipients,
                    routing: {
                        field_key: $("n-route-field").value || null,
                        groups: readGroups().map((group) => ({
                            values: group.values,
                            primary: group.primary,
                            cc: splitEmails(group.cc),
                        })),
                    },
                    subject: $("n-subject").value,
                    body: $("n-body").value,
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

function setMode(next) {
    if (next === mode) return;

    if (next === "simple") {
        let parsed = null;
        try {
            parsed = JSON.parse(editor.getValue());
        } catch {
            parsed = null;
        }

        const valid =
            Array.isArray(parsed) &&
            parsed.every((item) => item !== null && typeof item === "object" && !Array.isArray(item));

        if (!valid) {
            showErrors(["El JSON de los campos no es válido. Corrígelo antes de volver al modo sencillo."]);
            return;
        }

        clearErrors();
        fieldsData = parsed;
        builder.setFields(fieldsData);
    } else {
        editor.setValue(JSON.stringify(fieldsData, null, 2));
    }

    mode = next;
    $("fields-simple").classList.toggle("hidden", next !== "simple");
    $("fields-json").classList.toggle("hidden", next !== "json");

    document.querySelectorAll("[data-fields-mode]").forEach((button) => {
        const active = button.dataset.fieldsMode === next;
        button.classList.toggle("btn-primary", active);
        button.classList.toggle("btn-outline", !active);
    });

    if (next === "json") editor.refresh();
    refreshDependentUi();
}

function describe(path, message) {
    const option = path.match(/^fields\.(\d+)\.options\.(\d+)/);
    if (option) return `Campo ${Number(option[1]) + 1}, opción ${Number(option[2]) + 1}: ${message}`;

    const field = path.match(/^fields\.(\d+)/);
    if (field) return `Campo ${Number(field[1]) + 1}: ${message}`;

    const group = path.match(/^settings\.emails\.notify\.routing\.groups\.(\d+)/);
    if (group) return `Grupo ${Number(group[1]) + 1}: ${message}`;

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

        if (response.status === 409) {
            showErrors([data.message || "El formulario cambió mientras lo editabas. Recarga la página."]);
            return;
        }

        if (!response.ok || !data.success) {
            throw new Error(data.message || `Error del servidor: ${response.status}`);
        }

        if (data.redirect) {
            window.location.href = data.redirect;
            return;
        }

        if (data.initial) {
            fill(data.initial);
            refreshDependentUi();
        }
        root.dataset.baseVersion = data.version;
        const badge = $("version-badge");
        if (badge) badge.textContent = `v${data.version}`;
        showNotification(data.message, "success");
    } catch (error) {
        showNotification(error.message || "Ocurrió un error al guardar", "error");
    } finally {
        button.disabled = false;
        label.textContent = original;
    }
}

if (root) {
    editor = createJsonEditor($("f-fields-json"), {
        onChange: () => {
            if (mode === "json") refreshDependentUi();
        },
    });

    builder = createFieldBuilder($("fields-builder"), {
        types: JSON.parse(root.dataset.fieldTypes || "[]"),
        searchUrl: root.dataset.pagesSearchUrl,
        onChange: refreshDependentUi,
    });

    fill(readInitial());
    refreshDependentUi();

    document.querySelectorAll("[data-fields-mode]").forEach((button) => {
        button.addEventListener("click", () => setMode(button.dataset.fieldsMode));
    });

    $("copy-json").addEventListener("click", async () => {
        const copied = await copyText(editor.getValue());
        showNotification(copied ? "JSON copiado al portapapeles" : "No se pudo copiar", copied ? "success" : "error");
    });

    $("format-json").addEventListener("click", () => {
        try {
            editor.setValue(JSON.stringify(JSON.parse(editor.getValue()), null, 2));
        } catch {
            showNotification("El JSON no es válido, no se puede formatear", "error");
        }
    });

    $("save-form").addEventListener("click", save);
    $("f-active").addEventListener("change", syncActiveUi);

    document.querySelectorAll('input[name="n-mode"]').forEach((radio) => radio.addEventListener("change", syncNotifyUi));
    $("n-route-field").addEventListener("change", () => renderGroups(readGroups()));
    $("n-add-group").addEventListener("click", () => {
        renderGroups([...readGroups(), { values: [], primary: "", cc: "" }]);
    });

    ["k-enabled", "k-prefix", "k-pattern"].forEach((id) => $(id).addEventListener("input", syncCorrelativeUi));
    document.querySelectorAll('input[name="k-mode"]').forEach((radio) => radio.addEventListener("change", syncCorrelativeUi));
    document.querySelectorAll("[data-k-token]").forEach((button) => {
        button.addEventListener("click", () => {
            const input = $("k-pattern");
            const token = button.dataset.kToken;
            const start = input.selectionStart ?? input.value.length;
            const end = input.selectionEnd ?? input.value.length;
            input.value = input.value.slice(0, start) + token + input.value.slice(end);
            input.focus();
            input.setSelectionRange(start + token.length, start + token.length);
            syncCorrelativeUi();
        });
    });

    document.addEventListener("click", async (event) => {
        const copy = event.target.closest("[data-copy]");
        if (!copy) return;
        const copied = await copyText(copy.dataset.copy);
        showNotification(copied ? "Copiado al portapapeles" : "No se pudo copiar", copied ? "success" : "error");
    });
}