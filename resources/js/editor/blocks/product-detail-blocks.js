import { ICONS } from "./product-detail/icons";
import { styleTag } from "./product-detail/styles";
import { ASIDE_CLASS, actionPanel, section, split } from "./product-detail/layouts";
import {
    COVERAGE_TABLE_DATA,
    bulletList,
    coverageTable,
    ctaButton,
    footnoteGroup,
    highlight,
    iconCard,
    iconCardRow,
    iconCardSimple,
    priceBox,
    priceBoxDouble,
    productTitle,
    statBoxes,
    text,
    twoLineTitle,
} from "./product-detail/parts";

const CATEGORY = "Detalle de Producto";

const sectionBlock = ({ id, label, media, body, styles = [], containerClass = "" }) => ({
    id,
    label,
    category: CATEGORY,
    media,
    content: section({ body, styles, containerClass }),
});

const itemBlock = ({ id, label, media, body, styles = [] }) => ({
    id,
    label,
    category: CATEGORY,
    media,
    content: `${body}\n${styleTag(...styles)}`,
});

const paragraphGroup = (title, html) =>
    `<div class="flex flex-col gap-1">${text("lead", title)}${text("body", html)}</div>`;

const CARD_TITLES = ["uno", "dos", "tres", "cuatro"];

export const productDetailBlocks = [
    sectionBlock({
        id: "product-detail-section",
        label: "Sección: 2 columnas (texto + acción)",
        media: ICONS.twoColumns,
        styles: ["asymmetric"],
        body: split({
            main: `${text("lead")}${bulletList(5, "VENTAJAS")}`,
            aside: actionPanel({ notes: 3 }),
        }),
    }),

    sectionBlock({
        id: "product-detail-two-line-title",
        label: "Sección: 2 columnas (título doble + cta)",
        media: ICONS.twoLineSection,
        styles: ["asymmetric"],
        body: split({
            main: `${twoLineTitle("¡Adquiere", "tu producto nuevo!")}${bulletList(5, "CONDICIONES")}`,
            aside: actionPanel({ cta: "Solicita tu crédito", notes: 2 }),
        }),
    }),

    sectionBlock({
        id: "product-detail-stats",
        label: "Sección: 2 columnas (título + párrafo + contadores)",
        media: ICONS.statsColumns,
        styles: ["asymmetric", "stats"],
        body: split({
            main: `${twoLineTitle("¡Adquiere", "tu producto nuevo!")}${text("body")}`,
            aside: statBoxes(),
        }),
    }),

    sectionBlock({
        id: "product-detail-box",
        label: "Sección: 2 columnas + cuadro de precio",
        media: ICONS.withPriceBox,
        styles: ["asymmetric"],
        body: split({
            main: `${twoLineTitle("¡Adquiere", "tu producto nuevo!")}${bulletList(4, "VENTAJAS")}`,
            aside: actionPanel({ price: priceBox(), notes: 3 }),
        }),
    }),

    sectionBlock({
        id: "product-detail-box-double",
        label: "Sección: 2 columnas + precio doble",
        media: ICONS.withPriceDouble,
        styles: ["asymmetric"],
        body: split({
            main: `${text("lead")}${text("accentLead", "Lorem ipsum dolor sit amet, subtítulo destacado de la sección.")}${bulletList(6, "VENTAJAS")}`,
            aside: actionPanel({ cta: "Solicita tu crédito", price: priceBoxDouble(), notes: 2 }),
        }),
    }),

    sectionBlock({
        id: "product-detail-box-double-nested-cols",
        label: "Sección: 2 columnas internas + precio doble",
        media: ICONS.withPriceDouble,
        styles: ["asymmetric", "nested"],
        body: split({
            mainClass: "pd-nested-two-col",
            main: `<div class="pd-nested-two-col-full">${twoLineTitle("¡Adquiere", "tu producto nuevo!")}</div>${bulletList(4, "VENTAJAS")}${bulletList(4, "REQUISITOS")}`,
            aside: actionPanel({ cta: "Solicita tu crédito", price: priceBoxDouble(), notes: 2 }),
        }),
    }),

    sectionBlock({
        id: "product-detail-three-col",
        label: "Sección: 3 columnas (2 listas + acción)",
        media: ICONS.threeCol,
        styles: ["threeCol"],
        containerClass: "flex flex-col gap-6",
        body: `${text("lead")}
<div class="pd-three-col-grid">
    ${bulletList(3, "VENTAJAS")}
    ${bulletList(3, "BENEFICIOS")}
    <div class="${ASIDE_CLASS}">${actionPanel({ notes: 3 })}</div>
</div>`,
    }),

    sectionBlock({
        id: "product-detail-header-grid",
        label: "Sección: encabezado + 2 listas + acción",
        media: ICONS.headerGrid,
        styles: ["headerGrid"],
        body: `<div class="pd-header-grid">
    <div class="pd-hg-intro">${text("lead")}</div>
    <div class="pd-hg-col1">${bulletList(4, "VENTAJAS")}</div>
    <div class="pd-hg-col2">${bulletList(2, "REQUISITOS")}</div>
    <div class="pd-hg-action ${ASIDE_CLASS}">${actionPanel({ notes: 3 })}</div>
</div>`,
    }),

    sectionBlock({
        id: "product-detail-cards-grid",
        label: "Sección: tarjetas con lista + acción",
        media: ICONS.cardsGrid,
        styles: ["asymmetric", "cardsGrid"],
        body: split({
            main: `${text("leadPlain", "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt.")}
<div class="pd-cards-grid">${CARD_TITLES.map((name) => iconCard(`Lorem ipsum ${name}`, 3)).join("")}</div>`,
            aside: actionPanel({
                notes: 2,
                after: `${bulletList(4, "VENTAJAS")}${bulletList(2, "CONDICIONES")}`,
            }),
        }),
    }),

    sectionBlock({
        id: "product-detail-cards-row",
        label: "Sección: fila de tarjetas simples (sin acción lateral)",
        media: ICONS.cardsRow,
        styles: ["cardsRow"],
        containerClass: "flex flex-col gap-5",
        body: `${text("accentLg", "Subtítulo destacado")}${text("bodyStrong")}${iconCardRow(5)}`,
    }),

    sectionBlock({
        id: "product-detail-repeat-blocks",
        label: "Sección: parrafos + cta + precio",
        media: ICONS.repeatBlocks,
        styles: ["asymmetric"],
        body: split({
            mainClass: "flex flex-col gap-6",
            main: [
                paragraphGroup(
                    "Lorem ipsum dolor sit amet",
                    `Lorem ipsum dolor sit amet, estamos listos para ayudarte con ${highlight("soluciones rápidas y efectivas")}.`,
                ),
                paragraphGroup(
                    "Lorem ipsum dolor sit amet",
                    `Porque lo importante es ${highlight("nuestra prioridad")}, recuerda que cuentas con ${highlight("servicios listos")} para ayudarte en cualquier momento.`,
                ),
                paragraphGroup(
                    "Lorem ipsum dolor sit amet",
                    `No importa si es de día o de noche, tienes ${highlight("apoyo para seguir tu camino")} sin preocupaciones.`,
                ),
            ].join(""),
            aside: actionPanel({ price: priceBox(), notes: 2 }),
        }),
    }),

    sectionBlock({
        id: "product-detail-text-sections",
        label: "Sección: textos + lista + acción",
        media: ICONS.twoColumns,
        styles: ["asymmetric"],
        body: split({
            main: `${text("body")}
<div class="flex flex-col gap-2">
    ${text("heading", "Subtítulo de la sección")}
    ${text("body", "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.")}
    ${text("accent", "Qué puede incluir:")}
    ${bulletList(4)}
</div>
<div class="flex flex-col gap-2">
    ${text("heading", "Subtítulo secundario")}
    ${text("body", "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.")}
</div>`,
            aside: actionPanel({ price: priceBox(), notes: 2 }),
        }),
    }),

    itemBlock({
        id: "product-detail-bullet-list",
        label: "Ítem: Titulo + lista",
        media: ICONS.bulletItem,
        body: bulletList(4, "VENTAJAS"),
    }),

    itemBlock({
        id: "product-detail-footnote",
        label: "Ítem: nota al pie",
        media: ICONS.footnote,
        body: footnoteGroup(1),
    }),

    itemBlock({
        id: "product-detail-cta-button",
        label: "Ítem: botón CTA",
        media: ICONS.cta,
        body: ctaButton("Adquiere tu servicio"),
    }),

    itemBlock({
        id: "product-detail-title",
        label: "Ítem: título de producto",
        media: ICONS.title,
        body: productTitle("Nombre del Producto"),
    }),

    itemBlock({
        id: "product-detail-two-line-title-item",
        label: "Ítem: título doble (azul + naranja)",
        media: ICONS.twoLineTitle,
        body: twoLineTitle("¡Adquiere", "tu producto nuevo!"),
    }),

    itemBlock({
        id: "product-detail-price-box",
        label: "Ítem: cuadro de precio",
        media: ICONS.priceBox,
        body: priceBox(),
    }),

    itemBlock({
        id: "product-detail-price-box-double",
        label: "Ítem: cuadro de precio doble",
        media: ICONS.priceBoxDouble,
        body: priceBoxDouble(),
    }),

    itemBlock({
        id: "product-detail-icon-card",
        label: "Ítem: tarjeta con ícono + lista",
        media: ICONS.iconCard,
        styles: ["cardsGrid"],
        body: `<div class="pd-cards-grid" style="grid-template-columns:1fr;max-width:320px;">${iconCard("Lorem ipsum", 3)}</div>`,
    }),

    itemBlock({
        id: "product-detail-icon-card-simple",
        label: "Ítem: tarjeta simple (ícono + texto)",
        media: ICONS.cardsRow,
        styles: ["cardsRow"],
        body: `<div class="pd-cards-row" style="grid-template-columns:1fr;max-width:260px;">${iconCardSimple("Lorem ipsum")}</div>`,
    }),

    {
        id: "product-detail-coverage-table",
        label: "Ítem: tabla de coberturas",
        category: CATEGORY,
        media: ICONS.table,
        content: coverageTable("orange"),
    },
];

if (typeof window !== "undefined") {
    window.__coverageTableInitialData = COVERAGE_TABLE_DATA;
}