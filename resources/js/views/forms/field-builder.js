const MAX_FIELDS = 40;
const MAX_OPTIONS = 50;
const MAX_LINKS = 5;
const FULL_WIDTH = ["textarea", "checkbox_group", "consent", "location", "note"];
const NO_PLACEHOLDER = ["consent", "note", "checkbox_group", "location"];
const LENGTHS = { text: [255, 500], proper_name: [150, 300], textarea: [1000, 5000] };
const INPUT = "input-field";
const LABEL = "block text-xs font-medium text-gray-700 mb-1";
const LINK_PATTERN = /\[([^\]]*)\]\(([^)]*)\)/g;
const SAFE_LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;

function h(tag, attrs = {}, ...children) {
    const element = document.createElement(tag);
    for (const [name, value] of Object.entries(attrs)) {
        if (value == null || value === false) continue;
        if (name === "text") element.textContent = value;
        else if (name === "class") element.className = value;
        else if (name === "value") element.value = value;
        else if (name === "checked") element.checked = Boolean(value);
        else element.setAttribute(name, value === true ? "" : value);
    }
    element.append(...children.filter(Boolean));
    return element;
}

function isValidUrl(url) {
    const value = url.trim();
    return (
        value.length <= 2048 &&
        !/\s/.test(value) &&
        (/^\/(?!\/)/.test(value) || /^https?:\/\/\S+$/i.test(value))
    );
}

function labeled(label, control, hint) {
    return h(
        "div",
        {},
        h("label", { class: LABEL, text: label }),
        control,
        hint ? h("p", { class: "text-xs text-gray-500 mt-1", text: hint }) : null,
    );
}

function inputFor(field, prop, label, notify, opts = {}) {
    const input = h("input", {
        type: opts.type ?? "text",
        class: INPUT,
        maxlength: opts.maxlength,
        placeholder: opts.placeholder,
        min: opts.min,
        max: opts.max,
        step: opts.step,
        value: field[prop] ?? "",
    });

    input.addEventListener("input", () => {
        if (input.value === "") delete field[prop];
        else field[prop] = opts.type === "number" ? Number(input.value) : input.value;
        notify();
    });

    return labeled(label, input, opts.hint);
}

function checkFor(field, prop, label, notify) {
    const input = h("input", {
        type: "checkbox",
        class: "w-4 h-4 accent-primary",
        checked: Boolean(field[prop]),
    });
    input.addEventListener("change", () => {
        field[prop] = input.checked;
        notify();
    });
    return h("label", { class: "flex items-center gap-2 text-sm text-gray-700 cursor-pointer" }, input, label);
}

function iconButton(icon, title, onClick, disabled = false) {
    const button = h("button", {
        type: "button",
        class: "btn-outline btn-sm !px-2",
        title,
        "aria-label": title,
        disabled,
    });
    button.append(h("i", { class: icon }));
    button.addEventListener("click", onClick);
    return button;
}

function convertField(field, type) {
    const next = {
        type,
        label: field.label ?? "",
        required: Boolean(field.required),
        width: field.width ?? "full",
    };

    if (field.placeholder) next.placeholder = field.placeholder;
    if (field.help) next.help = field.help;

    if (type === "select" || type === "checkbox_group") {
        next.options = field.options?.length ? field.options.map((option) => ({ label: option.label })) : [{ label: "" }];
    }

    if (type === "consent" || type === "note") next.text = field.text ?? "";

    return next;
}

function renderConsent(text) {
    const nodes = [];
    let last = 0;

    for (const match of text.matchAll(SAFE_LINK_PATTERN)) {
        const [full, label, url] = match;
        if (match.index > last) nodes.push(text.slice(last, match.index));
        nodes.push(
            isValidUrl(url)
                ? h("a", {
                      href: url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      class: "text-primary font-semibold underline",
                      text: label,
                  })
                : label,
        );
        last = match.index + full.length;
    }

    if (last < text.length) nodes.push(text.slice(last));
    return nodes;
}

function consentIssues(text) {
    const issues = [];
    const links = [...text.matchAll(LINK_PATTERN)];

    if (text.length > 1000) issues.push("El texto admite como máximo 1000 caracteres.");
    if (links.length > MAX_LINKS) issues.push(`El texto admite como máximo ${MAX_LINKS} enlaces.`);

    links.forEach(([full, label, url]) => {
        if (!label.trim()) issues.push(`El enlace ${full} no tiene texto.`);
        if (!isValidUrl(url)) {
            issues.push(`La dirección de «${label || full}» debe empezar con / o https:// y no llevar espacios.`);
        }
    });

    return issues;
}

function optionsEditor(field, notify, rerender) {
    field.options ??= [];

    const list = h("div", { class: "space-y-2" });

    field.options.forEach((option, index) => {
        const input = h("input", {
            type: "text",
            class: INPUT,
            maxlength: 150,
            placeholder: `Opción ${index + 1}`,
            value: option.label ?? "",
        });
        input.addEventListener("input", () => {
            option.label = input.value;
            notify();
        });

        list.append(
            h(
                "div",
                { class: "flex items-center gap-2" },
                input,
                iconButton("ri-delete-bin-line", "Quitar opción", () => {
                    field.options.splice(index, 1);
                    notify();
                    rerender();
                }),
            ),
        );
    });

    const add = h("button", { type: "button", class: "btn-outline btn-sm mt-2" }, h("i", { class: "ri-add-line mr-1" }), "Agregar opción");
    add.disabled = field.options.length >= MAX_OPTIONS;
    add.addEventListener("click", () => {
        field.options.push({ label: "" });
        notify();
        rerender();
    });

    return h("div", {}, h("span", { class: LABEL, text: "Opciones" }), list, add);
}

function consentEditor(field, searchUrl, notify) {
    const textarea = h("textarea", {
        rows: 4,
        maxlength: 1000,
        class: `${INPUT} !rounded-2xl`,
        placeholder: "Acepto el [Aviso de Privacidad](/aviso-de-privacidad) y los términos del servicio",
        value: field.text ?? "",
    });
    const status = h("div", { class: "text-xs space-y-1" });
    const preview = h("p", { class: "text-xs text-gray-600 leading-relaxed" });

    const refresh = () => {
        const text = field.text ?? "";
        const issues = consentIssues(text);
        const count = [...text.matchAll(LINK_PATTERN)].length;

        status.replaceChildren(
            ...(issues.length
                ? issues.map((issue) => h("p", { class: "text-red-600", text: issue }))
                : [h("p", { class: "text-gray-500", text: `${count} de ${MAX_LINKS} enlaces · ${text.length}/1000 caracteres` })]),
        );
        preview.replaceChildren(...renderConsent(text));
    };

    textarea.addEventListener("input", () => {
        field.text = textarea.value;
        notify();
        refresh();
    });

    const labelInput = h("input", { type: "text", class: INPUT, maxlength: 120, placeholder: "Ej: Aviso de Privacidad" });
    const urlInput = h("input", { type: "text", class: INPUT, maxlength: 2048, placeholder: "/aviso-de-privacidad o https://sitio.com/pagina" });
    const results = h("div", { class: "flex flex-wrap gap-2" });
    const panelError = h("p", { class: "text-xs text-red-600 hidden" });
    const apply = h("button", { type: "button", class: "btn-primary btn-sm", text: "Insertar" });
    const cancel = h("button", { type: "button", class: "btn-outline btn-sm", text: "Cancelar" });

    const panel = h(
        "div",
        { class: "hidden rounded-2xl bg-gray-50 border border-gray-200 p-4 space-y-3" },
        labeled("Texto del enlace", labelInput, "Si seleccionaste una frase en el texto, se usa aquí."),
        labeled("Destino", urlInput, "Escribe para buscar una página publicada, o pega una dirección /ruta o https://..."),
        results,
        panelError,
        h("div", { class: "flex items-center gap-2" }, apply, cancel),
    );

    let range = { start: 0, end: 0 };
    let timer = null;

    const toggle = h("button", { type: "button", class: "btn-outline btn-sm" }, h("i", { class: "ri-link mr-2" }), "Insertar enlace");

    toggle.addEventListener("click", () => {
        range = { start: textarea.selectionStart, end: textarea.selectionEnd };
        labelInput.value = textarea.value.slice(range.start, range.end).replace(/[\[\]()]/g, "").trim();
        urlInput.value = "";
        results.replaceChildren();
        panelError.classList.add("hidden");
        panel.classList.remove("hidden");
        (labelInput.value ? urlInput : labelInput).focus();
    });

    cancel.addEventListener("click", () => panel.classList.add("hidden"));

    urlInput.addEventListener("input", () => {
        clearTimeout(timer);
        const query = urlInput.value.trim().replace(/^\//, "");

        if (!query || /^https?:/i.test(query) || !searchUrl) {
            results.replaceChildren();
            return;
        }

        timer = setTimeout(async () => {
            try {
                const response = await fetch(`${searchUrl}?q=${encodeURIComponent(query)}`, {
                    headers: { Accept: "application/json", "X-Requested-With": "XMLHttpRequest" },
                    credentials: "same-origin",
                });
                if (!response.ok) return;

                const pages = await response.json();
                results.replaceChildren(
                    ...pages.map((page) => {
                        const button = h("button", {
                            type: "button",
                            class: "badge badge-gray cursor-pointer",
                            title: `/${page.slug}`,
                            text: page.title,
                        });
                        button.addEventListener("click", () => {
                            urlInput.value = `/${page.slug}`;
                            if (!labelInput.value.trim()) labelInput.value = page.title;
                            results.replaceChildren();
                        });
                        return button;
                    }),
                );
            } catch {
                results.replaceChildren();
            }
        }, 250);
    });

    apply.addEventListener("click", () => {
        const label = labelInput.value.replace(/[\[\]()]/g, "").trim();
        const url = urlInput.value.trim();

        if (!label || !isValidUrl(url)) {
            panelError.textContent = "Escribe el texto del enlace y un destino que empiece con / o https:// y no lleve espacios.";
            panelError.classList.remove("hidden");
            return;
        }

        const link = `[${label}](${url})`;
        textarea.value = textarea.value.slice(0, range.start) + link + textarea.value.slice(range.end);
        field.text = textarea.value;
        panel.classList.add("hidden");
        notify();
        refresh();
        textarea.focus();
        textarea.setSelectionRange(range.start + link.length, range.start + link.length);
    });

    refresh();

    return h(
        "div",
        { class: "space-y-3" },
        labeled("Texto del consentimiento", textarea),
        h("div", { class: "flex flex-wrap items-center gap-2" }, toggle),
        panel,
        status,
        h(
            "div",
            { class: "rounded-2xl border border-gray-200 bg-white p-3" },
            h("span", { class: "block text-xs font-medium text-gray-500 mb-2", text: "Vista previa" }),
            h("label", { class: "flex items-start gap-2" }, h("input", { type: "checkbox", disabled: true, class: "mt-0.5" }), preview),
        ),
    );
}

function noteEditor(field, notify) {
    const textarea = h("textarea", { rows: 3, maxlength: 2000, class: `${INPUT} !rounded-2xl`, value: field.text ?? "" });
    textarea.addEventListener("input", () => {
        field.text = textarea.value;
        notify();
    });
    return labeled("Texto de la nota", textarea, "Se muestra en gris y no captura datos.");
}

function typeSettings(field, ctx) {
    const { notify, rerender, searchUrl } = ctx;

    switch (field.type) {
        case "text":
        case "proper_name":
        case "textarea": {
            const [fallback, limit] = LENGTHS[field.type];
            return [
                inputFor(field, "max_length", "Máximo de caracteres", notify, {
                    type: "number",
                    min: 1,
                    max: limit,
                    placeholder: String(fallback),
                }),
            ];
        }
        case "dui":
            return [checkFor(field, "verify_check_digit", "Verificar el dígito verificador del DUI", notify)];
        case "integer":
            return [
                h(
                    "div",
                    { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                    inputFor(field, "min", "Mínimo", notify, { type: "number", step: 1 }),
                    inputFor(field, "max", "Máximo", notify, { type: "number", step: 1 }),
                ),
            ];
        case "decimal":
            return [
                h(
                    "div",
                    { class: "grid grid-cols-1 sm:grid-cols-3 gap-4" },
                    inputFor(field, "decimals", "Decimales (1 a 6)", notify, { type: "number", min: 1, max: 6, placeholder: "2" }),
                    inputFor(field, "min", "Mínimo", notify, { type: "number", step: "any" }),
                    inputFor(field, "max", "Máximo", notify, { type: "number", step: "any" }),
                ),
            ];
        case "select":
        case "checkbox_group":
            return [optionsEditor(field, notify, rerender)];
        case "agency":
            return [h("p", { class: "text-xs text-gray-500", text: "Muestra las agencias activas y se actualiza sola." })];
        case "consent":
            return [consentEditor(field, searchUrl, notify)];
        case "note":
            return [noteEditor(field, notify)];
        case "location":
            return [
                h(
                    "div",
                    { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" },
                    inputFor(field, "department_label", "Etiqueta de departamento", notify, { maxlength: 60, placeholder: "Departamento" }),
                    inputFor(field, "municipality_label", "Etiqueta de municipio", notify, { maxlength: 60, placeholder: "Municipio" }),
                ),
            ];
        default:
            return [];
    }
}

function buildCard(field, index, ctx) {
    const { fields, types, notify, rerender } = ctx;
    const isNote = field.type === "note";
    const isConsent = field.type === "consent";
    const full = (node) => {
        node.classList.add("sm:col-span-2");
        return node;
    };

    const typeSelect = h(
        "select",
        { class: `${INPUT} !w-auto`, "aria-label": "Tipo de campo" },
        ...types.map((type) => h("option", { value: type.value, text: type.label })),
    );
    typeSelect.value = field.type;
    typeSelect.addEventListener("change", () => {
        fields[index] = convertField(field, typeSelect.value);
        notify();
        rerender();
    });

    const move = (direction) => {
        fields.splice(index + direction, 0, fields.splice(index, 1)[0]);
        notify();
        rerender();
    };

    const duplicate = () => {
        const copy = JSON.parse(JSON.stringify(field));
        delete copy.key;
        fields.splice(index + 1, 0, copy);
        notify();
        rerender();
    };

    const remove = () => {
        fields.splice(index, 1);
        notify();
        rerender();
    };

    const keyChip = field.key
        ? h("button", {
              type: "button",
              "data-copy": field.key,
              title: "Copiar clave",
              class: "font-mono text-xs bg-gray-50 border border-gray-200 rounded-full px-2 py-1 hover:border-primary",
              text: field.key,
          })
        : h("span", { class: "text-xs text-gray-400", text: "La clave se asigna al guardar" });

    const header = h(
        "div",
        { class: "flex flex-wrap items-center gap-2" },
        h("span", { class: "badge badge-info", text: `#${index + 1}` }),
        typeSelect,
        keyChip,
        h(
            "div",
            { class: "ml-auto flex items-center gap-1" },
            iconButton("ri-arrow-up-line", "Subir", () => move(-1), index === 0),
            iconButton("ri-arrow-down-line", "Bajar", () => move(1), index === fields.length - 1),
            iconButton("ri-file-copy-2-line", "Duplicar", duplicate, fields.length >= MAX_FIELDS),
            iconButton("ri-delete-bin-line", "Eliminar", remove),
        ),
    );

    const grid = h("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" });

    if (!isNote) {
        grid.append(
            full(
                inputFor(field, "label", isConsent ? "Etiqueta (opcional)" : "Etiqueta", notify, {
                    maxlength: 200,
                    placeholder: "Lo que verá el usuario",
                }),
            ),
        );
    }

    if (!isNote && !isConsent) grid.append(checkFor(field, "required", "Campo obligatorio", notify));

    if (!FULL_WIDTH.includes(field.type)) {
        const width = h(
            "select",
            { class: INPUT },
            h("option", { value: "full", text: "Fila completa" }),
            h("option", { value: "half", text: "Media fila" }),
        );
        width.value = field.width === "half" ? "half" : "full";
        width.addEventListener("change", () => {
            field.width = width.value;
            notify();
        });
        grid.append(labeled("Ancho", width));
    }

    if (!NO_PLACEHOLDER.includes(field.type)) {
        grid.append(inputFor(field, "placeholder", "Texto de ejemplo (opcional)", notify, { maxlength: 150 }));
    }

    if (!isNote) grid.append(inputFor(field, "help", "Texto de ayuda (opcional)", notify, { maxlength: 200 }));

    typeSettings(field, ctx).forEach((node) => grid.append(full(node)));

    return h("div", { class: "rounded-2xl border border-gray-200 p-4 space-y-4" }, header, grid);
}

export function createFieldBuilder(container, { types, searchUrl, onChange }) {
    let fields = [];

    const ctx = {
        types,
        searchUrl,
        notify: () => onChange?.(),
        rerender: () => render(),
    };

    function buildAddRow() {
        const select = h(
            "select",
            { class: `${INPUT} !w-auto`, "aria-label": "Tipo del nuevo campo" },
            ...types.map((type) => h("option", { value: type.value, text: type.label })),
        );
        const add = h("button", { type: "button", class: "btn-secondary btn-sm" }, h("i", { class: "ri-add-line mr-2" }), "Agregar campo");
        add.disabled = fields.length >= MAX_FIELDS;
        add.addEventListener("click", () => {
            fields.push(convertField({}, select.value));
            onChange?.();
            render();
        });

        return h(
            "div",
            { class: "flex flex-wrap items-center gap-2" },
            select,
            add,
            h("span", { class: "text-xs text-gray-500", text: `${fields.length} de ${MAX_FIELDS} campos` }),
        );
    }

    function render() {
        const cards = fields.map((field, index) => buildCard(field, index, { ...ctx, fields }));
        const empty = fields.length ? null : h("p", { class: "text-sm text-gray-500", text: "Aún no hay campos. Agrega el primero." });

        container.replaceChildren(...[...cards, empty, buildAddRow()].filter(Boolean));
    }

    return {
        setFields(list) {
            fields = list;
            render();
        },
    };
}