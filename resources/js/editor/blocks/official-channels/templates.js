import { assetUrl } from "@/utils/url.js";

export const SECTION_TYPE = "oc-section";
export const CARD_TYPE = "oc-card";
export const TEXT_TYPE = "oc-text";
export const LINK_TYPE = "oc-link";
export const NOTICE_TYPE = "oc-notice";

export const DEFAULT_DATA = {
    title: "Canales oficiales",
    description:
        "El Banco podrá recopilar información de sus clientes y usuarios solamente a través de sus canales oficiales:",
    cards: [
        {
            title: "Correo electrónico",
            items: [
                { kind: "link", text: "servicio.cliente@integral.com.sv", href: "mailto:servicio.cliente@integral.com.sv" },
            ],
        },
        {
            title: "Teléfono / WhatsApp",
            items: [{ kind: "link", text: "2250-6090", href: "tel:+50322506090" }],
        },
        {
            title: "Formularios y chatbot",
            items: [
                { kind: "link", text: "www.bancointegral.com", href: "https://www.bancointegral.com", newTab: true },
            ],
        },
        {
            title: "Redes sociales",
            items: [
                { kind: "text", text: "Facebook: facebook.com/IntegralElSalvador" },
                { kind: "text", text: "Instagram: @integral.sv" },
            ],
        },
        {
            title: "Red de Agencias",
            items: [{ kind: "text", text: "Red de Agencias de Banco Integral" }],
        },
        {
            title: "Contacto directo",
            items: [
                {
                    kind: "text",
                    text: "Asesor de negocios, ejecutivo de negocio, gestor de cobros, servicio al cliente y demás personal que da seguimiento de cuentas.",
                },
            ],
        },
        {
            title: "Medios digitales",
            items: [
                {
                    kind: "text",
                    text: "Todos los medios digitales que el Banco ponga a la disposición del cliente o usuario.",
                },
            ],
        },
    ],
    notice:
        "El personal del Banco no solicitará información relacionada a usuarios y claves de acceso de los servicios financieros de sus clientes.",
};

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const HIDDEN = 'data-gjs-selectable="false" data-gjs-hoverable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" ${HIDDEN}`;
const CONTAINER = `${FIXED} data-gjs-droppable=".oc-notice" ${HIDDEN}`;
const HEAD = `${FIXED} data-gjs-droppable=".oc-title,.oc-desc,.oc-sep" ${HIDDEN}`;
const GRID = `${FIXED} data-gjs-droppable=".oc-card" ${HIDDEN}`;
const BODY = `${FIXED} data-gjs-droppable=".oc-card-title,.oc-text,.oc-link" ${HIDDEN}`;
const IN_HEAD = 'data-gjs-draggable=".oc-head"';
const IN_BODY = 'data-gjs-draggable=".oc-body"';
const IN_NOTICE = 'data-gjs-draggable=".oc-notice"';

const OC_CSS = `
.oc-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.oc-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.oc-head{margin-bottom:clamp(1.25rem,2.5vw,1.75rem);}
.oc-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.25rem,2.2vw,1.5rem);line-height:1.3;}
.oc-desc{margin:0.5rem 0 0;color:#003B71;font-weight:400;font-size:clamp(0.875rem,1.3vw,0.9375rem);line-height:1.6;}
.oc-sep{height:1rem;margin-top:0.5rem;background-image:linear-gradient(#E97300,#E97300);background-repeat:no-repeat;background-position:center;background-size:100% 2px;}
.oc-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(1rem,2vw,1.5rem);min-height:3rem;}
.oc-card{display:flex;align-items:flex-start;gap:0.875rem;box-sizing:border-box;padding-top:1rem;padding-right:1.125rem;padding-bottom:1rem;padding-left:1.125rem;border:1px solid #E2E8F0;border-radius:0.875rem;background-color:#fff;transition:transform 0.25s ease,box-shadow 0.25s ease,border-color 0.25s ease;}
.oc-card:hover{transform:translateY(-4px);border-color:#F2A65A;box-shadow:0 12px 28px rgba(0,59,113,0.12);}
.oc-card-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:2.75rem;height:2.75rem;border-radius:0.75rem;background-color:#FCEAD9;}
.oc-card-img{display:block;width:1.375rem;height:1.375rem;object-fit:contain;}
.oc-body{display:flex;flex-direction:column;gap:0.125rem;flex:1;min-width:0;min-height:1.5rem;}
.oc-card-title{margin:0 0 0.25rem;color:#003B71;font-weight:700;font-size:0.8125rem;line-height:1.4;}
.oc-text{margin:0;color:#003B71;font-weight:400;font-size:0.75rem;line-height:1.55;overflow-wrap:anywhere;}
.oc-text a{color:#E97300;text-decoration:none;}
.oc-text a:hover{color:#C96200;text-decoration:underline;}
.oc-link{display:block;align-self:flex-start;color:#E97300;font-weight:400;font-size:0.75rem;line-height:1.55;text-decoration:none;overflow-wrap:anywhere;transition:color 0.2s ease;}
.oc-link:hover{color:#C96200;text-decoration:underline;}
.oc-link:focus-visible{outline:2px solid #E97300;outline-offset:2px;border-radius:0.125rem;}
.oc-notice{display:flex;align-items:center;gap:0.875rem;margin-top:clamp(1.25rem,2.5vw,1.75rem);box-sizing:border-box;padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;border-radius:1rem;background-color:#FDF1E5;}
.oc-notice-img{display:block;flex-shrink:0;width:1.5rem;height:1.5rem;object-fit:contain;}
.oc-notice-text{margin:0;color:#003B71;font-weight:700;font-size:0.875rem;line-height:1.5;}
@media(max-width:992px){
.oc-grid{grid-template-columns:repeat(2,minmax(0,1fr));}
}
@media(max-width:640px){
.oc-grid{grid-template-columns:minmax(0,1fr);}
}
@media(prefers-reduced-motion:reduce){
.oc-card,.oc-link{transition:none;}
.oc-card:hover{transform:none;}
}
`;

export const STYLES = `<style>${OC_CSS}</style>`;

const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

const miniCard = (x, y) => `
<rect x="${x}" y="${y}" width="8.5" height="6" rx="1.2" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.6"/>
<rect x="${x + 1}" y="${y + 1.2}" width="2.2" height="2.2" rx="0.6" fill="#FCEAD9"/>
<rect x="${x + 4}" y="${y + 1.5}" width="3.5" height="0.9" rx="0.45" fill="#003B71" fill-opacity="0.7"/>
<rect x="${x + 4}" y="${y + 3.3}" width="3" height="0.8" rx="0.4" fill="#E97300" fill-opacity="0.8"/>`;

export const ICONS = {
    section: svg(`
<rect x="3" y="3" width="14" height="2.2" rx="1.1" fill="#003B71" fill-opacity="0.75"/>
<rect x="3" y="6.5" width="26" height="1.2" rx="0.6" fill="#E97300"/>
${miniCard(3, 10)}${miniCard(11.75, 10)}${miniCard(20.5, 10)}
${miniCard(3, 17.5)}${miniCard(11.75, 17.5)}${miniCard(20.5, 17.5)}
<rect x="3" y="25" width="26" height="4.5" rx="1.5" fill="#FDF1E5"/>
<rect x="8" y="26.9" width="18" height="1" rx="0.5" fill="#003B71" fill-opacity="0.7"/>`),
    card: svg(`
<rect x="3" y="9" width="26" height="14" rx="2.5" fill="#ffffff" stroke="#e2e8f0" stroke-width="0.8"/>
<rect x="6" y="12" width="6" height="6" rx="1.5" fill="#FCEAD9"/>
<rect x="14.5" y="13" width="10" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.75"/>
<rect x="14.5" y="16.5" width="8" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>`),
    text: svg(`
<rect x="6" y="13" width="20" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
<rect x="6" y="17" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.4"/>`),
    link: svg(`
<rect x="6" y="14.2" width="18" height="1.8" rx="0.9" fill="#E97300"/>
<rect x="6" y="17.6" width="18" height="0.8" rx="0.4" fill="#E97300" fill-opacity="0.6"/>`),
    notice: svg(`
<rect x="2.5" y="10" width="27" height="12" rx="3" fill="#FDF1E5"/>
<rect x="5.5" y="13.2" width="4.5" height="5.6" rx="1.2" fill="none" stroke="#E97300" stroke-width="0.9"/>
<rect x="12.5" y="13.6" width="14" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.75"/>
<rect x="12.5" y="16.8" width="9" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.75"/>`),
};

export function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const placeholder = () => escapeHtml(assetUrl("images/placeholder.svg"));

export function buildText(text = "Escribe aquí el texto.") {
    return `<p class="oc-text" data-gjs-type="${TEXT_TYPE}" ${IN_BODY}>${escapeHtml(text)}</p>`;
}

export function buildLink({ text = "Enlace", href = "#", newTab = false } = {}) {
    const target = newTab ? ` target="_blank" rel="noopener noreferrer"` : "";
    return `<a class="oc-link" href="${escapeHtml(href)}"${target} data-gjs-type="${LINK_TYPE}" ${IN_BODY}>${escapeHtml(text)}</a>`;
}

const buildItem = (item) => (item.kind === "link" ? buildLink(item) : buildText(item.text));

export function buildCard(card = { title: "Nuevo canal", items: [{ kind: "text", text: "Escribe aquí el texto." }] }) {
    return `<div class="oc-card" data-gjs-type="${CARD_TYPE}"><div class="oc-card-icon" ${SHELL}><img class="oc-card-img" src="${placeholder()}" alt="" ${FIXED}></div><div class="oc-body" ${BODY}><h3 class="oc-card-title" data-gjs-type="text" ${IN_BODY}>${escapeHtml(card.title)}</h3>${card.items.map(buildItem).join("")}</div></div>`;
}

export function buildNotice(text = DEFAULT_DATA.notice) {
    return `<div class="oc-notice" data-gjs-type="${NOTICE_TYPE}"><img class="oc-notice-img" src="${placeholder()}" alt="" ${FIXED}><p class="oc-notice-text" data-gjs-type="text" ${IN_NOTICE}>${escapeHtml(text)}</p></div>`;
}

export function buildSection(data = DEFAULT_DATA) {
    return `<section class="oc-section" data-gjs-type="${SECTION_TYPE}"><div class="oc-container" ${CONTAINER}><div class="oc-head" ${HEAD}><h2 class="oc-title" data-gjs-type="text" ${IN_HEAD}>${escapeHtml(data.title)}</h2><p class="oc-desc" data-gjs-type="text" ${IN_HEAD}>${escapeHtml(data.description)}</p><div class="oc-sep" ${IN_HEAD}></div></div><div class="oc-grid" ${GRID}>${data.cards.map((card) => buildCard(card)).join("")}</div>${buildNotice(data.notice)}</div></section>`;
}