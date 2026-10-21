import { styleTag } from "./styles";
import { ctaButton, footnoteGroup, productTitle } from "./parts";

export const MAIN_CLASS = "flex flex-col gap-5";
export const ASIDE_CLASS = "flex flex-col items-center gap-4";

export const section = ({ body, styles = [], containerClass = "" }) => {
    const classes = ["pd-container", containerClass].filter(Boolean).join(" ");
    return `<section class="pd-section"><div class="${classes}">${body}</div></section>\n${styleTag("section", ...styles)}`;
};

export const split = ({
    main,
    aside,
    gridClass = "pd-asymmetric-grid",
    mainClass = MAIN_CLASS,
    asideClass = ASIDE_CLASS,
}) =>
    `<div class="${gridClass}"><div class="${mainClass}">${main}</div><div class="${asideClass}">${aside}</div></div>`;

export const actionPanel = ({
    title = "Nombre del Producto",
    cta = "Adquiere tu servicio",
    price = "",
    notes = 0,
    after = "",
} = {}) => `${productTitle(title)}${ctaButton(cta)}${price}${footnoteGroup(notes)}${after}`;