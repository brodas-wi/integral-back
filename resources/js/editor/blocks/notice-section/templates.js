export const SECTION_TYPE = "sa-section";
export const PARA_TYPE = "sa-para";
export const LIST_TYPE = "sa-list";
export const ITEM_TYPE = "sa-item";
export const NOTICE_TYPE = "sa-notice";
export const ICON_TYPE = "sa-icon";

const DEFAULT_ICON = "ri-chat-4-line";

export const ICON_OPTIONS = [
    { value: "ri-chat-4-line", label: "Mensaje" },
    { value: "ri-message-2-line", label: "Mensaje de texto" },
    { value: "ri-notification-3-line", label: "Notificación" },
    { value: "ri-information-line", label: "Información" },
    { value: "ri-error-warning-line", label: "Advertencia" },
    { value: "ri-shield-check-line", label: "Escudo" },
    { value: "ri-phone-line", label: "Teléfono" },
    { value: "ri-whatsapp-line", label: "WhatsApp" },
    { value: "ri-mail-line", label: "Correo" },
    { value: "ri-customer-service-2-line", label: "Servicio al cliente" },
    { value: "ri-time-line", label: "Horario" },
    { value: "ri-lock-line", label: "Candado" },
];

const DEFAULT_DATA = {
    title: "Administración de Mensajería SMS",
    subtitle: "(Short Message Service o Servicio de Mensajes Cortos)",
    intro: "La comunicación generada y recolectada por SMS está relacionada a:",
    items: [
        "La atención de consultas y solicitudes de información realizadas por los usuarios a través de los medios oficiales del Banco.",
        "Identificar los mejores productos y servicios financieros para satisfacer las necesidades de los clientes y usuarios.",
        "Notificar gestiones y transacciones que el cliente realice por medio de los canales digitales.",
    ],
    outro: "La información es de uso exclusivo del Banco y se utiliza únicamente para fines internos orientados a la mejora de sus productos y servicios; únicamente podrá ser compartida con terceros previa autorización del cliente.",
};

const NOTICE_LEAD =
    "Si un cliente o usuario desea dar de baja las notificaciones realizadas por SMS, debe comunicarse al 2250-6090 ya sea por llamada telefónica o WhatsApp y también por medio del correo electrónico ";
const NOTICE_EMAIL = "servicio.cliente@integral.com.sv";

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const HIDDEN = 'data-gjs-selectable="false" data-gjs-hoverable="false"';
const CONTAINER = `${FIXED} data-gjs-droppable=".sa-para,.sa-list,.sa-notice" ${HIDDEN}`;
const HEAD = `${FIXED} data-gjs-droppable=".sa-title,.sa-subtitle,.sa-line" ${HIDDEN}`;
const IN_HEAD = 'data-gjs-draggable=".sa-head"';
const IN_NOTICE = 'data-gjs-draggable=".sa-notice"';

const SA_CSS = `
.sa-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.sa-container{display:flex;flex-direction:column;gap:1.25rem;width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.sa-head{margin-bottom:0.25rem;}
.sa-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.25rem,2.2vw,1.5rem);line-height:1.3;}
.sa-subtitle{margin:0.5rem 0 0;color:#003B71;font-weight:400;font-size:clamp(0.9375rem,1.4vw,1rem);line-height:1.5;}
.sa-line{height:1rem;margin-top:0.5rem;background-image:linear-gradient(#E97300,#E97300);background-repeat:no-repeat;background-position:center;background-size:100% 2px;}
.sa-para{margin:0;color:#003B71;font-weight:400;font-size:0.875rem;line-height:1.6;}
.sa-list{margin:0;padding-top:0;padding-right:0;padding-bottom:0;padding-left:1.5rem;list-style-type:decimal;list-style-position:outside;min-height:1.5rem;}
.sa-item{margin:0 0 0.125rem;color:#003B71;font-weight:400;font-size:0.875rem;line-height:1.6;}
.sa-notice{display:flex;align-items:center;gap:1rem;box-sizing:border-box;padding-top:1.25rem;padding-right:1.5rem;padding-bottom:1.25rem;padding-left:1.5rem;border-radius:1rem;background-color:#FDF1E5;}
.sa-notice-glyph{display:block;flex-shrink:0;color:#E97300;font-size:1.5rem;line-height:1;}
.sa-notice-text{flex:1;min-width:0;margin:0;color:#003B71;font-weight:400;font-size:0.875rem;line-height:1.6;}
.sa-notice-text a{color:#E97300;text-decoration:none;overflow-wrap:anywhere;}
.sa-notice-text a:hover{color:#C96200;text-decoration:underline;}
`;

export const STYLES = `<style>${SA_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

export const ICONS = {
    section: svg(`
<rect x="3" y="3" width="17" height="2.2" rx="1.1" fill="#003B71" fill-opacity="0.75"/>
<rect x="3" y="6.5" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.45"/>
<rect x="3" y="9" width="26" height="1" fill="#E97300"/>
<rect x="3" y="12" width="20" height="1.1" rx="0.55" fill="#003B71" fill-opacity="0.45"/>
<rect x="5" y="15.2" width="22" height="1.1" rx="0.55" fill="#003B71" fill-opacity="0.45"/>
<rect x="5" y="17.8" width="20" height="1.1" rx="0.55" fill="#003B71" fill-opacity="0.45"/>
<rect x="3" y="21.5" width="24" height="1.1" rx="0.55" fill="#003B71" fill-opacity="0.45"/>
<rect x="3" y="24.5" width="26" height="5" rx="1.8" fill="#FDF1E5"/>
<rect x="5" y="26.1" width="2" height="1.8" rx="0.6" fill="#E97300"/>
<rect x="9" y="26.2" width="16" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.6"/>`),
    para: svg(`
<rect x="5" y="11" width="22" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.55"/>
<rect x="5" y="15" width="22" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.55"/>
<rect x="5" y="19" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.55"/>`),
    list: svg(`
<rect x="5" y="9" width="2" height="1.6" rx="0.5" fill="#003B71" fill-opacity="0.75"/>
<rect x="10" y="9" width="17" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.5"/>
<rect x="5" y="15.2" width="2" height="1.6" rx="0.5" fill="#003B71" fill-opacity="0.75"/>
<rect x="10" y="15.2" width="17" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.5"/>
<rect x="5" y="21.4" width="2" height="1.6" rx="0.5" fill="#003B71" fill-opacity="0.75"/>
<rect x="10" y="21.4" width="12" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.5"/>`),
    item: svg(`
<rect x="6" y="14.6" width="2.4" height="2.4" rx="0.6" fill="#003B71" fill-opacity="0.75"/>
<rect x="11" y="14.6" width="16" height="2.4" rx="1.2" fill="#003B71" fill-opacity="0.5"/>`),
    notice: svg(`
<rect x="2.5" y="10" width="27" height="12" rx="3" fill="#FDF1E5"/>
<rect x="5.5" y="13.4" width="5" height="5" rx="1.4" fill="none" stroke="#E97300" stroke-width="0.9"/>
<rect x="13" y="13.4" width="14" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.6"/>
<rect x="13" y="16.6" width="9" height="1.3" rx="0.65" fill="#E97300"/>`),
};

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const glyph = (icon) => {
    const name = escapeHtml(icon || DEFAULT_ICON);
    return `<i class="sa-notice-glyph ${name}" data-gjs-type="${ICON_TYPE}" data-sa-icon="${name}" ${FIXED}></i>`;
};

export function buildPara(text = "Escribe aquí el texto.") {
    return `<p class="sa-para" data-gjs-type="${PARA_TYPE}">${escapeHtml(text)}</p>`;
}

export function buildItem(text = "Escribe aquí el texto.") {
    return `<li class="sa-item" data-gjs-type="${ITEM_TYPE}">${escapeHtml(text)}</li>`;
}

export function buildList(items = DEFAULT_DATA.items) {
    return `<ol class="sa-list" data-gjs-type="${LIST_TYPE}">${items.map((text) => buildItem(text)).join("")}</ol>`;
}

export function buildNotice() {
    return `<div class="sa-notice" data-gjs-type="${NOTICE_TYPE}">${glyph(DEFAULT_ICON)}<p class="sa-notice-text" data-gjs-type="text" ${IN_NOTICE}>${escapeHtml(NOTICE_LEAD)}<a class="sa-link" href="mailto:${escapeHtml(NOTICE_EMAIL)}">${escapeHtml(NOTICE_EMAIL)}</a></p></div>`;
}

export function buildSection(data = DEFAULT_DATA) {
    return `<section class="sa-section" data-gjs-type="${SECTION_TYPE}"><div class="sa-container" ${CONTAINER}><div class="sa-head" ${HEAD}><h2 class="sa-title" data-gjs-type="text" ${IN_HEAD}>${escapeHtml(data.title)}</h2><p class="sa-subtitle" data-gjs-type="text" ${IN_HEAD}>${escapeHtml(data.subtitle)}</p><div class="sa-line" ${IN_HEAD}></div></div>${buildPara(data.intro)}${buildList(data.items)}${buildPara(data.outro)}${buildNotice()}</div></section>`;
}