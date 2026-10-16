import { openMediaPicker } from "@/editor/media-picker";
import { assetUrl } from "@/utils/url.js";

const B = {
    section: "block box-border w-full max-w-[1600px] mx-auto p-[clamp(1rem,4vw,3.5rem)] overflow-hidden",
    wrapper: "relative box-border w-full max-w-full bg-[#E97300] rounded-[clamp(24px,4vw,40px)] p-[clamp(1rem,3.5vw,2.75rem)]",
    header: "box-border flex flex-wrap items-start justify-between gap-6 mb-[clamp(1.25rem,3vw,2.25rem)] max-sm:justify-center",
    headerText: "box-border flex flex-col gap-3 flex-1 basis-60 min-w-0 max-sm:basis-full max-sm:items-center max-sm:text-center",
    title: "m-0 text-white font-extrabold text-[length:clamp(1.25rem,2.6vw,1.875rem)] leading-[1.15] break-words",
    subtitle: "m-0 text-white font-medium text-[length:clamp(1rem,1.8vw,1.25rem)] leading-[1.35] break-words",
    button: "box-border inline-flex items-center justify-center self-start w-fit max-w-full px-[clamp(1.125rem,3vw,1.75rem)] py-[clamp(0.5rem,1.5vw,0.75rem)] rounded-full bg-[#14243D] text-white font-semibold text-[length:clamp(0.75rem,1.6vw,0.9375rem)] no-underline transition-colors duration-200 hover:bg-white hover:text-[#14243D] max-sm:w-full max-sm:text-center",
    icon: "w-[clamp(48px,6vw,72px)] h-[clamp(48px,6vw,72px)] object-contain shrink-0",
    grid: "box-border grid w-full gap-[clamp(0.875rem,2vw,1.5rem)] grid-cols-[repeat(auto-fit,minmax(min(100%,22rem),1fr))] max-sm:grid-cols-[minmax(0,1fr)]",
    card: "box-border grid grid-cols-[clamp(90px,25%,140px)_minmax(0,1fr)] min-w-0 max-w-full p-[clamp(0.875rem,2vw,1.25rem)] bg-white rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.22)] overflow-hidden max-sm:grid-cols-[minmax(0,1fr)] max-sm:justify-items-center max-sm:text-center",
    cardImgCol: "box-border flex items-center min-w-0 max-sm:w-full max-sm:max-w-[140px] max-sm:justify-center",
    cardImgWrap: "relative w-full aspect-square rounded-xl overflow-hidden",
    cardImg: "absolute inset-0 w-full h-full object-cover block",
    cardBody: "box-border flex flex-col justify-center gap-2.5 min-w-0 pl-[clamp(0.875rem,2vw,1.25rem)] max-sm:items-center max-sm:pl-0 max-sm:pt-3.5",
    badge: "box-border inline-flex items-center w-fit max-w-full px-3.5 py-1.5 rounded-full bg-[#14243D] text-white font-semibold text-xs break-words",
    desc: "m-0 text-slate-800 text-[0.8125rem] leading-[1.45] break-words",
};

const M = {
    overlay: "fixed inset-0 z-[99999] flex items-center justify-center bg-slate-900/45 backdrop-blur-[3px] p-4",
    modal: "bg-white rounded-xl w-full max-w-[720px] max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200 text-slate-800",
    header: "px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0",
    close: "flex items-center justify-center w-8 h-8 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors",
    tabs: "flex border-b border-slate-200 bg-white shrink-0 overflow-x-auto",
    tab: "flex items-center gap-1.5 px-4 py-3 -mb-px border-b-2 text-[0.8125rem] font-medium whitespace-nowrap transition-colors",
    tabOn: "border-[#003B71] text-[#003B71]",
    tabOff: "border-transparent text-slate-400 hover:text-slate-600",
    body: "flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-slate-50",
    panel: "flex flex-col gap-4",
    card: "bg-white border border-slate-200 rounded-[0.625rem] p-4 flex flex-col gap-3",
    cardHeader: "flex items-center gap-2",
    cardNum: "inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#003B71] text-white text-[0.7rem] font-bold shrink-0",
    label: "block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5",
    input: "box-border w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm outline-none transition-colors focus:border-[#003B71]",
    inputSm: "box-border w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-slate-800 text-[0.8rem] outline-none transition-colors focus:border-[#003B71]",
    row: "flex gap-3 items-start",
    col: "flex-1 min-w-0 flex flex-col gap-2",
    imgPreview: "w-16 h-16 rounded-lg object-cover border border-slate-200 bg-slate-100 shrink-0",
    imgPlaceholder: "w-16 h-16 rounded-lg bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center shrink-0",
    pick: "shrink-0 self-start flex items-center gap-1 px-3 py-1.5 bg-[#003B71] hover:bg-[#002a52] text-white text-xs font-semibold rounded-full whitespace-nowrap transition-colors",
    remove: "flex items-center justify-center p-1.5 rounded-full text-red-500 hover:bg-red-50 transition-colors",
    add: "self-start flex items-center gap-1.5 px-5 py-2 bg-[#003B71] hover:bg-[#002a52] text-white text-[0.8125rem] font-semibold rounded-full transition-colors",
    footer: "px-5 py-4 border-t border-slate-100 flex flex-wrap items-center gap-3 bg-white shrink-0",
    footerGroup: "flex flex-wrap gap-2 mr-auto",
    cancel: "px-5 py-2 bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium rounded-full transition-colors",
    save: "flex items-center gap-1.5 px-5 py-2 bg-[#E97300] hover:bg-[#c96200] text-white text-sm font-semibold rounded-full transition-colors",
    backup: "inline-flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-[#003B71] text-[#003B71] hover:bg-[#003B71] hover:text-white text-[0.8125rem] font-semibold rounded-full transition-colors cursor-pointer",
    restore: "inline-flex items-center gap-1.5 px-4 py-2 bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white text-[0.8125rem] font-semibold rounded-full transition-colors cursor-pointer select-none",
    confirmOverlay: "fixed inset-0 z-[999999] flex items-center justify-center bg-slate-900/55 backdrop-blur-sm p-4",
    confirmModal: "bg-white rounded-xl w-full max-w-[420px] shadow-2xl overflow-hidden border border-slate-200 text-slate-800",
    confirmHeader: "px-5 pt-4 pb-3 flex items-center gap-2.5 border-b border-slate-100",
    confirmTitle: "m-0 text-[0.9375rem] font-bold text-slate-900",
    confirmBody: "px-5 py-4 flex flex-col gap-2 text-sm text-slate-600 leading-normal",
    confirmFile: "inline-flex items-center gap-1.5 self-start px-3 py-1.5 bg-slate-100 rounded-md text-[0.8rem] font-semibold text-[#003B71]",
    confirmFooter: "px-5 pt-3 pb-4 flex gap-2.5 justify-end bg-slate-50 border-t border-slate-100",
    confirmOk: "flex items-center gap-1.5 px-4 py-2 bg-[#E97300] hover:bg-[#c96200] text-white text-sm font-semibold rounded-full transition-colors",
    confirmOkDanger: "flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-full transition-colors",
};

const LOCK = `data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"`;

const DEFAULT_DATA = {
    title: "Protege lo que más importa.",
    subtitle: "Conoce tus opciones",
    button_label: "Solicitar información",
    button_href: "#",
    icon_url: "",
    cards: [
        {
            image: "",
            badge: "Seguro de Salud",
            desc: "Una opción con tu crédito para cuidar de tu salud.",
        },
        {
            image: "",
            badge: "Seguro de Vida",
            desc: "Tu esfuerzo, tus sueños y el bienestar de quienes más quieres merecen un respaldo.",
        },
        {
            image: "",
            badge: "Multiasistencias",
            desc: "Médica, hogar y vial carro o moto.",
        },
    ],
};

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function normalizeData(source = {}) {
    return {
        title: source.title ?? DEFAULT_DATA.title,
        subtitle: source.subtitle ?? DEFAULT_DATA.subtitle,
        button_label: source.button_label ?? DEFAULT_DATA.button_label,
        button_href: source.button_href ?? DEFAULT_DATA.button_href,
        icon_url: source.icon_url ?? DEFAULT_DATA.icon_url,
        cards: JSON.parse(JSON.stringify(source.cards ?? DEFAULT_DATA.cards)),
    };
}

function readConfig(component) {
    try {
        return JSON.parse(
            component.getAttributes()["data-options-banner-config"] || "{}",
        );
    } catch {
        return {};
    }
}

function randomUid() {
    return "ob" + Math.random().toString(36).slice(2, 7);
}

function currentUid(component) {
    const root = component.getEl()?.querySelector("[id^='ob-root-']");
    return root?.id?.replace("ob-root-", "") || randomUid();
}

function buildOptionCardHTML(card) {
    const image = escapeHtml(card.image || assetUrl("images/placeholder.svg"));
    const badge = escapeHtml(card.badge || "Etiqueta");
    const desc = escapeHtml(card.desc || "Descripción breve.");

    return `<div class="${B.card}"><div class="${B.cardImgCol}"><div class="${B.cardImgWrap}"><img class="${B.cardImg}" src="${image}" alt="${badge}" loading="lazy"></div></div><div class="${B.cardBody}"><span class="${B.badge}">${badge}</span><p class="${B.desc}">${desc}</p></div></div>`;
}

function buildOptionsBannerHTML(data, uid) {
    uid = uid || randomUid();

    const title = escapeHtml(data.title || "Título");
    const subtitle = escapeHtml(data.subtitle || "Subtítulo");
    const buttonHtml = data.button_label
        ? `<a class="${B.button}" href="${escapeHtml(data.button_href || "#")}">${escapeHtml(data.button_label)}</a>`
        : "";
    const iconHtml = data.icon_url
        ? `<img class="${B.icon}" src="${escapeHtml(data.icon_url)}" alt="">`
        : "";
    const cardsHtml = (data.cards || []).map(buildOptionCardHTML).join("");

    return `<section id="ob-root-${uid}" class="${B.section}" ${LOCK}><div class="${B.wrapper}" ${LOCK}><div class="${B.header}" ${LOCK}><div class="${B.headerText}" ${LOCK}><h2 class="${B.title}">${title}</h2><p class="${B.subtitle}">${subtitle}</p>${buttonHtml}</div>${iconHtml}</div><div class="${B.grid}" ${LOCK}>${cardsHtml}</div></div></section>`;
}

function imagePreviewHTML(url) {
    return url
        ? `<img class="${M.imgPreview}" src="${escapeHtml(url)}" alt="">`
        : `<div class="${M.imgPlaceholder}"><i class="ri-image-line text-2xl text-slate-400"></i></div>`;
}

function showConfirm({ icon, iconClass, title, lines, filename, okLabel, okClass, onOk, cancellable = true }) {
    const overlay = document.createElement("div");
    overlay.className = M.confirmOverlay;
    overlay.innerHTML = `<div class="${M.confirmModal}"><div class="${M.confirmHeader}"><i class="${icon} text-xl ${iconClass}"></i><h3 class="${M.confirmTitle}">${escapeHtml(title)}</h3></div><div class="${M.confirmBody}">${lines.map((l) => `<p class="m-0">${escapeHtml(l)}</p>`).join("")}${filename ? `<span class="${M.confirmFile}"><i class="ri-file-code-line"></i>${escapeHtml(filename)}</span>` : ""}</div><div class="${M.confirmFooter}">${cancellable ? `<button type="button" data-action="cancel" class="${M.cancel}">Cancelar</button>` : ""}<button type="button" data-action="ok" class="${okClass}">${okLabel}</button></div></div>`;
    document.body.appendChild(overlay);
    overlay.querySelector("[data-action='cancel']")?.addEventListener("click", () => overlay.remove());
    overlay.querySelector("[data-action='ok']").addEventListener("click", () => {
        overlay.remove();
        onOk?.();
    });
}

function showOptionsBannerModal(editor, component) {
    document.getElementById("ob-config-modal")?.remove();

    const data = normalizeData(readConfig(component));

    const overlay = document.createElement("div");
    overlay.id = "ob-config-modal";
    overlay.className = M.overlay;

    const modal = document.createElement("div");
    modal.className = M.modal;
    modal.innerHTML = `
        <div class="${M.header}">
            <div class="flex items-center gap-2"><i class="ri-shield-check-line text-lg text-blue-500"></i><h2 class="m-0 text-[0.9375rem] font-semibold text-slate-900">Configurar Banner de Opciones</h2></div>
            <button type="button" id="ob-modal-close" class="${M.close}"><i class="ri-close-line text-lg"></i></button>
        </div>
        <div class="${M.tabs}">
            <button type="button" data-tab="general" class="${M.tab}"><i class="ri-settings-3-line text-base"></i> General</button>
            <button type="button" data-tab="cards" class="${M.tab}"><i class="ri-layout-grid-line text-base"></i> Tarjetas</button>
        </div>
        <div class="${M.body}">
            <div data-panel="general" class="${M.panel}">
                <div class="${M.card}">
                    <label class="${M.label}" for="ob-title">Título</label>
                    <input id="ob-title" type="text" class="${M.input}" value="${escapeHtml(data.title)}">
                </div>
                <div class="${M.card}">
                    <label class="${M.label}" for="ob-subtitle">Subtítulo</label>
                    <input id="ob-subtitle" type="text" class="${M.input}" value="${escapeHtml(data.subtitle)}">
                </div>
                <div class="${M.card}">
                    <label class="${M.label}">Botón CTA</label>
                    <div class="flex flex-col gap-2.5">
                        <input id="ob-button-label" type="text" placeholder="Solicitar información" value="${escapeHtml(data.button_label)}" class="${M.input}">
                        <input id="ob-button-href" type="text" placeholder="URL o #" value="${escapeHtml(data.button_href)}" class="${M.input}">
                    </div>
                </div>
                <div class="${M.card}">
                    <label class="${M.label}">Ícono/imagen esquina superior derecha (opcional)</label>
                    <div class="${M.row}">
                        <div id="ob-icon-wrap">${imagePreviewHTML(data.icon_url)}</div>
                        <div class="${M.col}">
                            <input id="ob-icon-url" class="${M.inputSm}" placeholder="URL de la imagen" value="${escapeHtml(data.icon_url)}">
                            <button type="button" id="ob-icon-pick" class="${M.pick}"><i class="ri-image-line"></i> Seleccionar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div data-panel="cards" class="${M.panel}">
                <div id="ob-cards-list" class="flex flex-col gap-3"></div>
                <button type="button" id="ob-add-card" class="${M.add}"><i class="ri-add-line"></i> Agregar tarjeta</button>
            </div>
        </div>
        <div class="${M.footer}">
            <div class="${M.footerGroup}">
                <button type="button" id="ob-modal-backup" class="${M.backup}" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <label class="${M.restore}" title="Restaurar configuración desde JSON"><i class="ri-upload-2-line"></i> Restaurar<input id="ob-modal-restore-input" type="file" accept=".json,application/json" class="hidden"></label>
            </div>
            <button type="button" id="ob-modal-cancel" class="${M.cancel}">Cancelar</button>
            <button type="button" id="ob-modal-save" class="${M.save}"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const $ = (selector) => modal.querySelector(selector);

    const setTab = (name) => {
        modal.querySelectorAll("[data-tab]").forEach((btn) => {
            btn.className = `${M.tab} ${btn.dataset.tab === name ? M.tabOn : M.tabOff}`;
        });
        modal.querySelectorAll("[data-panel]").forEach((panel) => {
            panel.classList.toggle("hidden", panel.dataset.panel !== name);
        });
    };

    modal.querySelectorAll("[data-tab]").forEach((btn) => {
        btn.addEventListener("click", () => setTab(btn.dataset.tab));
    });
    setTab("general");

    const readForm = () => {
        data.title = $("#ob-title").value.trim() || DEFAULT_DATA.title;
        data.subtitle = $("#ob-subtitle").value.trim() || DEFAULT_DATA.subtitle;
        data.button_label = $("#ob-button-label").value.trim();
        data.button_href = $("#ob-button-href").value.trim() || "#";
        data.icon_url = $("#ob-icon-url").value.trim();
        return normalizeData(data);
    };

    $("#ob-icon-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar ícono",
            onSelect: (url) => {
                $("#ob-icon-url").value = url;
                $("#ob-icon-wrap").innerHTML = imagePreviewHTML(url);
            },
        });
    });

    $("#ob-icon-url").addEventListener("input", (e) => {
        $("#ob-icon-wrap").innerHTML = imagePreviewHTML(e.target.value);
    });

    const renderCards = () => {
        const list = $("#ob-cards-list");
        list.innerHTML = "";

        data.cards.forEach((card, idx) => {
            const item = document.createElement("div");
            item.className = M.card;
            item.innerHTML = `
                <div class="${M.cardHeader}">
                    <span class="${M.cardNum}">${idx + 1}</span>
                    <span class="flex-1 text-sm font-semibold text-slate-800">Tarjeta ${idx + 1}</span>
                    <button type="button" data-action="remove" class="${M.remove}"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="${M.row}">
                    <div data-preview>${imagePreviewHTML(card.image)}</div>
                    <div class="${M.col}">
                        <label class="${M.label}">Imagen</label>
                        <input class="${M.inputSm}" placeholder="URL de la imagen" value="${escapeHtml(card.image || "")}" data-field="image">
                        <button type="button" data-action="pick" class="${M.pick}"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="${M.label}">Etiqueta (badge)</label>
                    <input class="${M.input}" placeholder="Seguro de Salud" value="${escapeHtml(card.badge || "")}" data-field="badge">
                </div>
                <div>
                    <label class="${M.label}">Descripción</label>
                    <input class="${M.input}" placeholder="Descripción breve" value="${escapeHtml(card.desc || "")}" data-field="desc">
                </div>`;

            const preview = item.querySelector("[data-preview]");
            const imageInput = item.querySelector("[data-field='image']");

            item.querySelectorAll("[data-field]").forEach((input) => {
                input.addEventListener("input", () => {
                    card[input.dataset.field] = input.value;
                    if (input.dataset.field === "image") {
                        preview.innerHTML = imagePreviewHTML(input.value);
                    }
                });
            });

            item.querySelector("[data-action='pick']").addEventListener("click", () => {
                openMediaPicker({
                    type: "image",
                    title: "Seleccionar imagen de tarjeta",
                    onSelect: (url) => {
                        card.image = url;
                        imageInput.value = url;
                        preview.innerHTML = imagePreviewHTML(url);
                    },
                });
            });

            item.querySelector("[data-action='remove']").addEventListener("click", () => {
                data.cards.splice(idx, 1);
                renderCards();
            });

            list.appendChild(item);
        });
    };

    renderCards();

    $("#ob-add-card").addEventListener("click", () => {
        data.cards.push({
            image: "",
            badge: "Nueva opción",
            desc: "Descripción breve.",
        });
        renderCards();
        $("#ob-cards-list").lastElementChild?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
        });
    });

    $("#ob-modal-backup").addEventListener("click", () => {
        const snapshot = readForm();
        const blob = new Blob([JSON.stringify(snapshot, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
        const link = document.createElement("a");
        link.href = url;
        link.download = `options-banner-backup-${ts}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    });

    $("#ob-modal-restore-input").addEventListener("change", (e) => {
        const input = e.target;
        const file = input.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            let parsed;
            try {
                parsed = JSON.parse(ev.target.result);
            } catch {
                input.value = "";
                showConfirm({
                    icon: "ri-error-warning-line",
                    iconClass: "text-red-500",
                    title: "Archivo inválido",
                    lines: ["El archivo seleccionado no es un JSON válido."],
                    okLabel: "Cerrar",
                    okClass: M.confirmOkDanger,
                    cancellable: false,
                });
                return;
            }

            showConfirm({
                icon: "ri-refresh-line",
                iconClass: "text-[#E97300]",
                title: "Restaurar configuración",
                lines: [
                    "¿Deseas restaurar la configuración de esta sección desde el archivo de respaldo?",
                    "Esta acción reemplazará la configuración actual del formulario.",
                ],
                filename: file.name,
                okLabel: `<i class="ri-check-line"></i> Sí, restaurar`,
                okClass: M.confirmOk,
                onOk: () => {
                    input.value = "";
                    const restored = normalizeData(parsed);
                    component.addAttributes({
                        "data-options-banner-config": JSON.stringify(restored),
                    });
                    component.components(
                        buildOptionsBannerHTML(restored, currentUid(component)),
                    );
                    overlay.remove();
                    showOptionsBannerModal(editor, component);
                },
            });
            input.value = "";
        };
        reader.readAsText(file);
    });

    const close = () => overlay.remove();
    $("#ob-modal-close").addEventListener("click", close);
    $("#ob-modal-cancel").addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });

    $("#ob-modal-save").addEventListener("click", () => {
        const finalData = readForm();
        const uid = currentUid(component);

        component.addAttributes({
            "data-options-banner-config": JSON.stringify(finalData),
        });
        component.components(buildOptionsBannerHTML(finalData, uid));
        close();
    });
}

const iconOptionsBanner = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#E97300" rx="2"/>
    <rect x="3" y="4" width="12" height="8" rx="1.5" fill="#fff"/>
    <rect x="17" y="4" width="12" height="8" rx="1.5" fill="#fff" fill-opacity="0.7"/>
    <rect x="3" y="14" width="12" height="8" rx="1.5" fill="#fff" fill-opacity="0.7"/>
    <rect x="17" y="14" width="12" height="8" rx="1.5" fill="#fff" fill-opacity="0.4"/>
</svg>`;

export function initializeOptionsBannerBlock(editor) {
    const componentType = "options-banner-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Banner de Opciones",
                tagName: "div",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                stylable: false,
                resizable: false,
                layerable: true,
                propagate: [
                    "editable",
                    "selectable",
                    "hoverable",
                    "droppable",
                    "highlightable",
                    "stylable",
                    "resizable",
                ],
                attributes: {
                    "data-gjs-type": componentType,
                    "data-options-banner-config": JSON.stringify(DEFAULT_DATA),
                },
                components: buildOptionsBannerHTML(DEFAULT_DATA),
                traits: [
                    {
                        type: "button",
                        label: false,
                        text: "Administrar Banner",
                        full: true,
                        command: "open-options-banner-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-options-banner-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showOptionsBannerModal(ed, selected);
        },
    });

    editor.BlockManager.add("options-banner-block", {
        label: "Banner de Opciones",
        category: "Banners",
        media: iconOptionsBanner,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        const doc = iframe?.contentDocument;
        if (!doc?.head || doc.getElementById(`${componentType}-editor-css`)) return;
        const style = doc.createElement("style");
        style.id = `${componentType}-editor-css`;
        style.textContent = `[data-gjs-type="${componentType}"] * { pointer-events: none !important; }`;
        doc.head.appendChild(style);
    });
}