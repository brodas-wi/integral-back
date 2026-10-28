export const COMPONENT_TYPE = "hero-pages-component";
export const HERO_PAGES_VERSION = "2";
export const MAX_CARDS = 12;
export const MAX_HEADING = 120;
export const MAX_TITLE = 80;
export const MAX_DESC = 160;
export const DEFAULT_ICON = "ri-shield-check-line";

export const createCard = () => ({
    image: "",
    title: "Nueva tarjeta",
    desc: "Descripción de la tarjeta.",
    icon: DEFAULT_ICON,
    href: "",
});

export const DEFAULT_DATA = {
    heading: "Título",
    subheading: "Subtítulo descriptivo",
    cards: [
        { image: "", title: "Capital de trabajo", desc: "Respaldo financiero para tu negocio.", icon: "ri-briefcase-line", href: "" },
        { image: "", title: "Inversión", desc: "La oportunidad que tu negocio necesita para crecer.", icon: "ri-line-chart-line", href: "" },
        { image: "", title: "Vivienda", desc: "Realiza tu sueño de comprar o remodelar tu casa.", icon: "ri-home-4-line", href: "" },
        { image: "", title: "Ahorros", desc: "Haz crecer tu dinero con seguridad.", icon: "ri-safe-2-line", href: "" },
        { image: "", title: "Seguros", desc: "Protección para ti y tu familia.", icon: "ri-shield-check-line", href: "" },
        { image: "", title: "Remesas", desc: "Recibe dinero con confianza.", icon: "ri-exchange-dollar-line", href: "" },
    ],
};

const text = (value, fallback, max) =>
    typeof value === "string" ? value.trim().slice(0, max) : fallback;

function normalizeCard(card) {
    const source = card && typeof card === "object" ? card : {};
    return {
        image: text(source.image, "", 2000),
        title: text(source.title, "", MAX_TITLE),
        desc: text(source.desc, "", MAX_DESC),
        icon: text(source.icon, DEFAULT_ICON, 60),
        href: text(source.href, "", 2000),
    };
}

export function mergeData(input) {
    const source =
        input && typeof input === "object" && !Array.isArray(input) ? input : {};
    const cards = Array.isArray(source.cards) ? source.cards : DEFAULT_DATA.cards;

    return {
        heading: text(source.heading, DEFAULT_DATA.heading, MAX_HEADING),
        subheading: text(source.subheading, DEFAULT_DATA.subheading, MAX_HEADING),
        cards: cards.slice(0, MAX_CARDS).map(normalizeCard),
    };
}