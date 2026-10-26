export const SECTION_TYPE = "ct-section";
export const BUTTON_TYPE = "ct-whatsapp";

const CATEGORY = "Contenido";
const DEFAULT_PHONE = "50322506090";

const FIXED = 'data-gjs-removable="false" data-gjs-draggable="false" data-gjs-copyable="false"';
const SHELL = `${FIXED} data-gjs-droppable="false" data-gjs-selectable="false" data-gjs-hoverable="false"`;
const LOCKED = `${FIXED} data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-editable="false"`;
const TEXT = `${FIXED} data-gjs-type="text"`;

const CT_CSS = `
.ct-section{width:100%;box-sizing:border-box;font-family:'Poppins',sans-serif;}
.ct-container{width:100%;max-width:1600px;margin:0 auto;box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;column-gap:clamp(1.5rem,4vw,3rem);row-gap:1.5rem;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);}
.ct-text{flex:1 1 20rem;min-width:0;max-width:40rem;display:flex;flex-direction:column;gap:0.5rem;}
.ct-title{margin:0;color:#003B71;font-weight:700;font-size:clamp(1.375rem,2.4vw,1.75rem);line-height:1.25;}
.ct-desc{margin:0;color:#003B71;font-weight:400;font-size:clamp(0.9375rem,1.3vw,1rem);line-height:1.6;}
.ct-action{display:flex;flex-shrink:0;}
.ct-btn{display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;padding-top:0.75rem;padding-right:1.75rem;padding-bottom:0.75rem;padding-left:1.75rem;border-radius:9999px;background-color:#E97300;color:#fff;font-size:0.8125rem;font-weight:700;letter-spacing:0.03em;text-transform:uppercase;text-decoration:none;white-space:nowrap;transition:background-color 0.2s ease;}
.ct-btn:hover,.ct-btn:focus-visible{background-color:#C96200;}
.ct-btn:focus-visible{outline:2px solid #14243D;outline-offset:2px;}
.ct-btn-icon{font-size:1.25rem;line-height:1;}
@media(max-width:640px){
.ct-text{flex-basis:100%;max-width:100%;}
}
@media(prefers-reduced-motion:reduce){
.ct-btn{transition:none;}
}
`;

const ICON = `<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="10" width="14" height="2.4" rx="1.2" fill="#003B71" fill-opacity="0.75"/>
    <rect x="3" y="15" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.45"/>
    <rect x="3" y="18" width="9" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.45"/>
    <rect x="20" y="11" width="9" height="9" rx="4.5" fill="#E97300"/>
</svg>`;

function buildHref(phone, message) {
    const digits = String(phone ?? "").replace(/\D/g, "");
    if (!digits) return "#";
    const text = String(message ?? "").trim();
    return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

function buildButton() {
    return `<a class="ct-btn" href="${buildHref(DEFAULT_PHONE)}" target="_blank" rel="noopener noreferrer" data-wa-phone="${DEFAULT_PHONE}" data-wa-message="" data-gjs-type="${BUTTON_TYPE}" ${FIXED}><i class="ri-whatsapp-line ct-btn-icon" ${LOCKED}></i><span class="ct-btn-label" ${TEXT}>WhatsApp</span></a>`;
}

function buildSection() {
    return `<section class="ct-section" data-gjs-type="${SECTION_TYPE}"><div class="ct-container" ${SHELL}><div class="ct-text" ${SHELL}><h2 class="ct-title" ${TEXT}>¿No encontraste lo que buscabas?</h2><p class="ct-desc" ${TEXT}>Escríbenos por WhatsApp o llámanos al 2250-6090.<br>Con gusto te atenderemos.</p></div><div class="ct-action" ${SHELL}>${buildButton()}</div></div></section><style>${CT_CSS}</style>`;
}

function registerTypes(editor) {
    editor.DomComponents.addType(SECTION_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === SECTION_TYPE ? { type: SECTION_TYPE } : false,
        model: {
            defaults: {
                name: "Contacto por WhatsApp",
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

    editor.DomComponents.addType(BUTTON_TYPE, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === BUTTON_TYPE ? { type: BUTTON_TYPE } : false,
        model: {
            defaults: {
                name: "Botón de WhatsApp",
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
                    {
                        type: "text",
                        name: "data-wa-phone",
                        label: "Número de WhatsApp",
                        placeholder: "50322506090",
                    },
                    {
                        type: "text",
                        name: "data-wa-message",
                        label: "Mensaje inicial (opcional)",
                    },
                    {
                        type: "checkbox",
                        name: "target",
                        label: "Abrir en nueva pestaña",
                        valueTrue: "_blank",
                        valueFalse: "",
                    },
                ],
            },
            init() {
                this.on("change:attributes:data-wa-phone change:attributes:data-wa-message", this.syncHref);
                this.on("change:attributes:target", this.syncRel);
            },
            syncHref() {
                const attrs = this.getAttributes();
                const phone = attrs["data-wa-phone"];
                const digits = String(phone ?? "").replace(/\D/g, "");
                const updates = { href: buildHref(digits, attrs["data-wa-message"]) };
                if (digits !== phone) updates["data-wa-phone"] = digits;
                this.addAttributes(updates);
            },
            syncRel() {
                if (this.getAttributes().target === "_blank") {
                    this.addAttributes({ rel: "noopener noreferrer" });
                } else {
                    this.removeAttributes("rel");
                }
            },
        },
    });
}

export function registerContactCore(editor) {
    registerTypes(editor);

    editor.BlockManager.add("contact-whatsapp-block", {
        label: "Contacto por WhatsApp",
        category: CATEGORY,
        media: ICON,
        activate: true,
        content: buildSection(),
    });
}