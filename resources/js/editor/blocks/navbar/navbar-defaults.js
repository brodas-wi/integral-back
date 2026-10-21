import { clone } from "./navbar-utils";

export const COMPONENT_TYPE = "navbar-component";
export const NAVBAR_VERSION = "6";
export const MAX_SUBMENU_COLUMNS = 3;
export const MAX_CTA_BUTTONS = 2;

export const DEFAULT_DATA = {
    logo_url: "",
    logo_alt: "Logo",
    logo_text: "Logo",
    logo_href: "/",
    top_actions: [
        { label: "Contáctanos", href: "#", icon: "ri-phone-line", show_icon: false },
        { label: "Agencias y corresponsales", href: "#", icon: "ri-building-line", show_icon: false },
        { label: "Preguntas frecuentes", href: "#", icon: "ri-question-answer-line", show_icon: false },
    ],
    banking_btn: { label: "Mi Banca Integral", href: "#" },
    nav_links: [
        { type: "link", label: "Inicio", href: "/", icon: "" },
        {
            type: "submenu",
            label: "Créditos",
            columns: [
                {
                    badge: "Tus créditos",
                    badge_color: "blue",
                    items: [
                        { label: "Microcrédito", desc: "Financiamiento para tu negocio", href: "#" },
                        { label: "Crédito Personal", desc: "Para tus necesidades personales", href: "#" },
                    ],
                },
            ],
            cta_column: {
                text: "Solicita tu Crédito Online",
                buttons: [{ label: "Solicitar", href: "#", color: "orange", icon: "" }],
            },
        },
        { type: "link", label: "Ahorro y depósitos", href: "#", icon: "" },
        { type: "link", label: "Remesas", href: "#", icon: "" },
        { type: "link", label: "Seguros y otros servicios", href: "#", icon: "" },
    ],
    bottom_cta: { label: "Programa Surge", sublabel: "", href: "#", color: "blue" },
    icon_btn: { enabled: true, icon: "ri-search-line", image_url: "", href: "#", label: "Buscar" },
    menu_btn: { image_url: "", icon: "" },
};

const asArray = (value, fallback) => (Array.isArray(value) ? value : fallback);

export function normalizeCtaColumn(cta) {
    if (!cta) return { text: "", buttons: [] };

    let buttons = [];
    if (Array.isArray(cta.buttons)) {
        buttons = cta.buttons;
    } else if (cta.btn_label || cta.btn_href || cta.btn_color) {
        buttons = [{ label: cta.btn_label, href: cta.btn_href, color: cta.btn_color, icon: "" }];
    }

    return {
        text: cta.text || "",
        buttons: buttons.slice(0, MAX_CTA_BUTTONS).map((button) => ({
            label: button.label || "",
            href: button.href || "#",
            color: button.color === "blue" ? "blue" : "orange",
            icon: button.icon || "",
        })),
    };
}

export function normalizeNavLinks(links) {
    return links.map((item) =>
        item.type === "submenu"
            ? {
                ...item,
                columns: asArray(item.columns, []),
                cta_column: normalizeCtaColumn(item.cta_column),
            }
            : item,
    );
}

export function mergeNavbarData(input) {
    const base = clone(DEFAULT_DATA);
    const source = clone(input || {});

    return {
        ...base,
        ...source,
        top_actions: asArray(source.top_actions, base.top_actions),
        nav_links: normalizeNavLinks(asArray(source.nav_links, base.nav_links)),
        banking_btn: { ...base.banking_btn, ...source.banking_btn },
        bottom_cta: { ...base.bottom_cta, ...source.bottom_cta },
        icon_btn: { ...base.icon_btn, ...source.icon_btn },
        menu_btn: { ...base.menu_btn, ...source.menu_btn },
    };
}