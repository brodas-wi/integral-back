import { clone } from "./utils";

export const COMPONENT_TYPE = "footer-component";
export const FOOTER_VERSION = "5";
export const MAX_SECTIONS = 8;

export const DEFAULT_DATA = {
    logo_url: "",
    logo_alt: "Logo",
    sections: [
        {
            title: "Productos",
            links: [
                { label: "Créditos", href: "#", icon: "", isText: false },
                { label: "Depósitos", href: "#", icon: "", isText: false },
                { label: "Otros Servicios", href: "#", icon: "", isText: false },
            ],
        },
        {
            title: "Sobre Nosotros",
            links: [
                { label: "Historial", href: "#", icon: "", isText: false },
                { label: "Misión y Visión", href: "#", icon: "", isText: false },
                { label: "Red de Agencias", href: "#", icon: "", isText: false },
            ],
        },
        {
            title: "Contáctanos",
            links: [
                { label: "0000 - 0000", href: "tel:0000-0000", icon: "ri-phone-line", isText: false },
                { label: "Correo", href: "mailto:info@banco.com", icon: "ri-mail-line", isText: false },
                { label: "Dirección", href: "#", icon: "ri-map-pin-line", isText: true },
            ],
        },
    ],
};

const text = (value, fallback = "") =>
    typeof value === "string" ? value.trim() : fallback;

function normalizeLink(link) {
    const source = link && typeof link === "object" ? link : {};
    const isText = Boolean(source.isText);
    return {
        label: text(source.label),
        icon: text(source.icon),
        isText,
        href: isText ? "" : text(source.href) || "#",
    };
}

function normalizeSection(section) {
    const source = section && typeof section === "object" ? section : {};
    return {
        title: text(source.title),
        links: (Array.isArray(source.links) ? source.links : []).map(normalizeLink),
    };
}

export function mergeData(input) {
    const source =
        input && typeof input === "object" && !Array.isArray(input) ? input : {};
    const sections = Array.isArray(source.sections)
        ? source.sections
        : clone(DEFAULT_DATA.sections);

    return {
        logo_url: text(source.logo_url),
        logo_alt: text(source.logo_alt, DEFAULT_DATA.logo_alt),
        sections: sections.slice(0, MAX_SECTIONS).map(normalizeSection),
    };
}