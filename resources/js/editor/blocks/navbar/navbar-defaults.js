import { clone } from "./navbar-utils";

export const COMPONENT_TYPE = "navbar-component";
export const NAVBAR_VERSION = "10";
export const MAX_SUBMENU_COLUMNS = 3;
export const MAX_CTA_BUTTONS = 2;
export const MAX_BOTTOM_BUTTONS = 3;
const BUTTON_COLORS = ["blue", "white", "orange"];

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
    bottom_buttons: [{ label: "Mi Banca Integral", href: "#", color: "orange" }],
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
    top_button: { label: "Programa Surge", sublabel: "", href: "#", color: "white" },
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
            icon_position: button.icon_position === "right" ? "right" : "left",
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

const pickColor = (color, fallback) => (BUTTON_COLORS.includes(color) ? color : fallback);

function migrateLegacy(source) {
    const data = { ...source };
    if (!data.top_button && data.bottom_cta) {
        data.top_button = {
            ...data.bottom_cta,
            color: data.bottom_cta.color === "orange" ? "orange" : "white",
        };
    }
    if (!Array.isArray(data.bottom_buttons) && data.banking_btn) {
        data.bottom_buttons = [{ ...data.banking_btn, color: "orange" }];
    }
    delete data.bottom_cta;
    delete data.banking_btn;
    return data;
}

export function mergeNavbarData(input) {
    const base = clone(DEFAULT_DATA);
    const source = migrateLegacy(clone(input || {}));

    const bottomButtons = asArray(source.bottom_buttons, base.bottom_buttons)
        .slice(0, MAX_BOTTOM_BUTTONS)
        .map((button) => ({
            label: button.label || "",
            href: button.href || "#",
            color: pickColor(button.color, "orange"),
        }));

    const topButton = { ...base.top_button, ...source.top_button };
    topButton.color = pickColor(topButton.color, "white");

    return {
        ...base,
        ...source,
        top_actions: asArray(source.top_actions, base.top_actions),
        nav_links: normalizeNavLinks(asArray(source.nav_links, base.nav_links)),
        bottom_buttons: bottomButtons,
        top_button: topButton,
        icon_btn: { ...base.icon_btn, ...source.icon_btn },
        menu_btn: { ...base.menu_btn, ...source.menu_btn },
    };
}