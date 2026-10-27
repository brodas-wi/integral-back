export const SECTION_TYPE = "tb-section";
export const BUTTON_TYPE = "tb-button";
export const STAT_SECTION_TYPE = "tb-stat-section";

const CATEGORY = "Llamadas a la acción";
const SCHEME = /^[a-z][a-z0-9+.-]*:/i;
const SAFE_SCHEME = /^(https?:|mailto:|tel:)/i;

const ICON_OPTIONS = [
    { id: "", label: "Sin icono" },
    { id: "ri-whatsapp-line", label: "WhatsApp" },
    { id: "ri-phone-line", label: "Teléfono" },
    { id: "ri-mail-line", label: "Correo" },
    { id: "ri-arrow-right-line", label: "Flecha" },
    { id: "ri-download-line", label: "Descarga" },
    { id: "ri-external-link-line", label: "Enlace externo" },
];
const ICON_CLASSES = ICON_OPTIONS.map((option) => option.id).filter(Boolean);

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" data-gjs-selectable="false" data-gjs-hoverable="false"`;
const LOCKED = `${FIXED} data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-editable="false"`;
const TEXT = `${FIXED} data-gjs-type="text"`;

const TB_CSS = `
.tb-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.tb-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;column-gap:clamp(1.5rem,4vw,3rem);row-gap:1.5rem;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.tb-text{flex:1 1 20rem;min-width:0;max-width:36rem;display:flex;flex-direction:column;gap:0.5rem;}
.tb-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.25rem,2.2vw,1.5rem);line-height:1.3;}
.tb-desc{margin:0;color:#003B71;font-weight:400;font-size:clamp(0.875rem,1.3vw,0.9375rem);line-height:1.6;}
.tb-action{display:flex;flex-shrink:0;}
.tb-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding-top:0.75rem;padding-right:1.75rem;padding-bottom:0.75rem;padding-left:1.75rem;border-radius:9999px;background-color:#E97300;color:#fff;font-size:0.8125rem;font-weight:700;letter-spacing:0.03em;text-transform:uppercase;text-decoration:none;white-space:nowrap;transition:background-color 0.2s ease;}
.tb-btn:hover,.tb-btn:focus-visible{background-color:#C96200;}
.tb-btn:focus-visible{outline:2px solid #14243D;outline-offset:2px;}
.tb-btn-icon{font-size:1.25rem;line-height:1;}
.tb-stat{display:flex;flex-direction:column;align-items:center;gap:0.25rem;text-align:center;}
.tb-stat-value{margin:0;color:#E97300;font-weight:700;font-size:clamp(1.75rem,3.2vw,2.25rem);line-height:1.1;white-space:nowrap;}
.tb-stat-label{margin:0;color:#003B71;font-weight:600;font-size:clamp(0.875rem,1.3vw,0.9375rem);line-height:1.4;}
.tb-stat-note{margin:0;color:#6B7280;font-weight:400;font-size:clamp(0.875rem,1.3vw,0.9375rem);line-height:1.4;}
@media(max-width:640px){
.tb-text{flex-basis:100%;max-width:100%;}
.tb-stat{align-items:flex-start;text-align:left;}
}
@media(prefers-reduced-motion:reduce){
.tb-btn{transition:none;}
}
`;

const BLOCK_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="10" width="14" height="2.4" rx="1.2" fill="#003B71" fill-opacity="0.75"/>
    <rect x="3" y="15" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.45"/>
    <rect x="3" y="18" width="9" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.45"/>
    <rect x="19" y="12" width="10" height="7" rx="3.5" fill="#E97300"/>
</svg>`;

const STAT_ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="10" width="14" height="2.4" rx="1.2" fill="#003B71" fill-opacity="0.75"/>
    <rect x="3" y="15" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.45"/>
    <rect x="3" y="18" width="9" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.45"/>
    <rect x="20" y="9" width="9" height="3.4" rx="1.2" fill="#E97300"/>
    <rect x="21" y="15" width="7" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.75"/>
    <rect x="21.5" y="18" width="6" height="1.1" rx="0.55" fill="#9ca3af"/>
</svg>`;

function isSafeHref(value) {
    const url = String(value ?? "").trim();
    return !SCHEME.test(url) || SAFE_SCHEME.test(url);
}

function buildIcon(icon) {
    return `<i class="${icon} tb-btn-icon" ${LOCKED}></i>`;
}

function buildButton() {
    return `<a class="tb-btn" href="#" data-gjs-type="${BUTTON_TYPE}" ${FIXED}><span class="tb-btn-label" ${TEXT}>Ir a sugerencias</span></a>`;
}

function buildSection({ type, title, desc, action }) {
    return `<section class="tb-section" data-gjs-type="${type}"><div class="tb-container" ${SHELL}><div class="tb-text" ${SHELL}><h2 class="tb-title" ${TEXT}>${title}</h2><p class="tb-desc" ${TEXT}>${desc}</p></div><div class="tb-action" ${SHELL}>${action}</div></div></section><style>${TB_CSS}</style>`;
}

function buildStat() {
    return `<div class="tb-stat" ${SHELL}><p class="tb-stat-value" ${TEXT}>7 días</p><p class="tb-stat-label" ${TEXT}>de la semana</p><p class="tb-stat-note" ${TEXT}>Horarios extendidos</p></div>`;
}

const buildButtonSection = () =>
    buildSection({
        type: SECTION_TYPE,
        title: "¿Tienes una queja, reclamo o sugerencia?",
        desc: "Tu opinión nos ayuda a mejorar. Escríbenos a través de nuestro buzón en línea y con gusto te contactaremos.",
        action: buildButton(),
    });

const buildStatSection = () =>
    buildSection({
        type: STAT_SECTION_TYPE,
        title: "Paga tu crédito también en Puntoxpress y Akí Pago",
        desc: "Para tu comodidad, también puedes realizar los pagos de tus créditos en la red Puntoxpress y Akí Pago, abierto en horarios extendidos, los 7 días de la semana.",
        action: buildStat(),
    });

function registerTypes(editor) {
    [
        [SECTION_TYPE, "Texto con Botón"],
        [STAT_SECTION_TYPE, "Texto con Contador"],
    ].forEach(([type, name]) => {
        editor.DomComponents.addType(type, {
            isComponent: (el) =>
                el.getAttribute?.("data-gjs-type") === type ? { type } : false,
            model: {
                defaults: {
                    name,
                    tagName: "section",
                    draggable: true,
                    droppable: false,
                    removable: true,
                    copyable: true,
                    selectable: true,
                    hoverable: true,
                    editable: false,
                    highlightable: false,
                },
            },
        });
    });

    editor.DomComponents.addType(BUTTON_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === BUTTON_TYPE ? { type: BUTTON_TYPE } : false,
        model: {
            defaults: {
                name: "Botón",
                tagName: "a",
                draggable: false,
                droppable: false,
                removable: false,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                traits: [
                    "id",
                    { type: "text", name: "href", label: "Enlace (URL)", placeholder: "/pagina o https://..." },
                    {
                        type: "checkbox",
                        name: "target",
                        label: "Abrir en nueva pestaña",
                        valueTrue: "_blank",
                        valueFalse: "",
                    },
                    {
                        type: "select",
                        name: "data-tb-icon",
                        label: "Icono",
                        options: ICON_OPTIONS,
                    },
                ],
            },
            init() {
                this.on("change:attributes:href", this.sanitizeHref);
                this.on("change:attributes:target", this.syncRel);
                this.on("change:attributes:data-tb-icon", this.syncIcon);
            },
            sanitizeHref() {
                if (!isSafeHref(this.getAttributes().href)) this.addAttributes({ href: "#" });
            },
            syncRel() {
                if (this.getAttributes().target === "_blank") {
                    this.addAttributes({ rel: "noopener noreferrer" });
                } else {
                    this.removeAttributes("rel");
                }
            },
            syncIcon() {
                const value = this.getAttributes()["data-tb-icon"];
                const icon = ICON_CLASSES.includes(value) ? value : "";
                const first = this.components().at(0);
                const current = first?.getClasses().includes("tb-btn-icon") ? first : null;
                if (!icon) {
                    current?.remove();
                    return;
                }
                if (current) current.setClass([icon, "tb-btn-icon"]);
                else this.components().add(buildIcon(icon), { at: 0 });
            },
        },
    });
}

export function registerTextButtonCore(editor) {
    registerTypes(editor);

    editor.BlockManager.add("text-button-block", {
        label: "Texto con Botón",
        category: CATEGORY,
        media: BLOCK_ICON,
        activate: true,
        content: buildButtonSection(),
    });

    editor.BlockManager.add("text-stat-block", {
        label: "Texto con Contador",
        category: CATEGORY,
        media: STAT_ICON,
        activate: true,
        content: buildStatSection(),
    });
}