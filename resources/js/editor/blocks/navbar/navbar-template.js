import { createUid, escapeHtml as esc } from "./navbar-utils";
import {
    MAX_CTA_BUTTONS,
    MAX_SUBMENU_COLUMNS,
    NAVBAR_VERSION,
    mergeNavbarData,
} from "./navbar-defaults";
import { NAVBAR_STYLES } from "./navbar-styles";

const iconTag = (iconClass) => (iconClass ? `<i class="${esc(iconClass)}"></i>` : "");

const isSubmenu = (item) => item.type === "submenu" && item.columns && item.columns.length > 0;

const badgeClass = (color) => (color === "orange" ? "nb-badge-orange" : "nb-badge-blue");

const alternatingText = (text) =>
    String(text || "")
        .split(" ")
        .filter(Boolean)
        .map(
            (word, index) =>
                `<span style="color:${index % 2 === 0 ? "#E97300" : "#003B71"};">${esc(word)}</span>`,
        )
        .join(" ");

const logoHtml = (data) => {
    const inner = data.logo_url
        ? `<img src="${esc(data.logo_url)}" alt="${esc(data.logo_alt || "Logo")}">`
        : `<span class="nb-logo-text">${esc(data.logo_text || "Logo")}</span>`;
    return `<a href="${esc(data.logo_href || "/")}" class="nb-logo-link">${inner}</a>`;
};

const actionHtml = (action, className) => {
    const icon = action.show_icon ? iconTag(action.icon) : "";
    return `<a href="${esc(action.href || "#")}" class="${className}">${icon}${esc(action.label)}</a>`;
};

const BUTTON_CLASSES = { blue: "nb-btn-blue", white: "nb-btn-white", orange: "nb-btn-orange" };

const buttonClass = (color) => BUTTON_CLASSES[color] || BUTTON_CLASSES.orange;

const bottomButtonsHtml = (data) =>
    data.bottom_buttons
        .filter((button) => button.label)
        .map(
            (button) =>
                `<a href="${esc(button.href || "#")}" class="nb-btn ${buttonClass(button.color)}">${esc(button.label)}</a>`,
        )
        .join("");

const topButtonHtml = (data) => {
    const button = data.top_button;
    if (!button.label) return "";
    const sublabel = button.sublabel ? `<span class="nb-cta-line2">${esc(button.sublabel)}</span>` : "";
    return `<a href="${esc(button.href || "#")}" class="nb-btn nb-cta ${buttonClass(button.color)}"><span>${esc(button.label)}</span>${sublabel}</a>`;
};

const searchBtnHtml = (data) => {
    const button = data.icon_btn;
    if (!button.enabled) return "";
    const inner = button.image_url
        ? `<img src="${esc(button.image_url)}" alt="${esc(button.label)}">`
        : `<i class="${esc(button.icon || "ri-search-line")}"></i>`;
    return `<a href="${esc(button.href || "#")}" class="nb-icon-btn" title="${esc(button.label)}" aria-label="${esc(button.label || "Buscar")}">${inner}</a>`;
};

const hamburgerHtml = (data) => {
    const { image_url: imageUrl, icon } = data.menu_btn;
    let inner = "<span></span><span></span><span></span>";
    if (imageUrl) inner = `<img src="${esc(imageUrl)}" alt="Menú">`;
    else if (icon) inner = `<i class="${esc(icon)}"></i>`;
    return `<button class="nb-hamburger" type="button" aria-label="Menú" aria-expanded="false">${inner}</button>`;
};

const desktopColumn = (column) => {
    const badge = column.badge
        ? `<span class="nb-badge ${badgeClass(column.badge_color)}">${esc(column.badge)}</span>`
        : "";
    const items = (column.items || [])
        .map((item) => {
            const desc = item.desc ? `<span class="nb-mega-item-desc">${esc(item.desc)}</span>` : "";
            return `<a href="${esc(item.href || "#")}" class="nb-mega-item"><span class="nb-mega-item-title">${esc(item.label)}</span>${desc}</a>`;
        })
        .join("");
    return `<div class="nb-mega-col">${badge}${items}</div>`;
};

const desktopCtaColumn = (cta) => {
    if (!cta.text && !cta.buttons.length) return "";
    const buttons = cta.buttons
        .slice(0, MAX_CTA_BUTTONS)
        .map(
            (button) =>
                `<a href="${esc(button.href || "#")}" class="nb-btn nb-btn-${button.color === "blue" ? "blue" : "orange"}">${button.icon_position === "right" ? `${esc(button.label || "Ver más")}${iconTag(button.icon)}` : `${iconTag(button.icon)}${esc(button.label || "Ver más")}`}</a>`,
        )
        .join("");
    return `<div class="nb-mega-cta-col"><p class="nb-mega-cta-text">${alternatingText(cta.text)}</p><div class="nb-mega-cta-buttons">${buttons}</div></div>`;
};

const desktopItem = (item) => {
    if (!isSubmenu(item)) {
        return `<li class="nb-nav-item"><a href="${esc(item.href || "#")}" class="nb-nav-link">${iconTag(item.icon)}${esc(item.label)}</a></li>`;
    }
    const columns = item.columns.slice(0, MAX_SUBMENU_COLUMNS);
    const cta = desktopCtaColumn(item.cta_column);
    const grid = cta
        ? `grid-template-columns:repeat(${columns.length},minmax(0,1fr)) minmax(200px,260px);`
        : `grid-template-columns:repeat(${columns.length},minmax(0,280px));justify-content:start;`;
    return `<li class="nb-nav-item"><button class="nb-nav-link nb-nav-trigger" type="button" aria-expanded="false">${esc(item.label || "Menú")}</button><div class="nb-mega"><div class="nb-mega-grid" style="${grid}">${columns.map(desktopColumn).join("")}${cta}</div></div></li>`;
};

const mobileColumn = (column) => {
    const badge = column.badge ? `<span class="nb-mobile-sub-badge">${esc(column.badge)}</span>` : "";
    const items = (column.items || [])
        .map((item) => {
            const desc = item.desc ? `<span class="nb-mobile-sub-desc">${esc(item.desc)}</span>` : "";
            return `<a href="${esc(item.href || "#")}" class="nb-mobile-sub-link"><span class="nb-mobile-sub-title">${esc(item.label)}</span>${desc}</a>`;
        })
        .join("");
    return `<div class="nb-mobile-sub-col">${badge}${items}</div>`;
};

const mobileItem = (item) => {
    if (!isSubmenu(item)) {
        return `<a href="${esc(item.href || "#")}" class="nb-mobile-link"><span class="nb-mobile-link-content">${iconTag(item.icon)}${esc(item.label)}</span></a>`;
    }
    const columns = item.columns.slice(0, MAX_SUBMENU_COLUMNS).map(mobileColumn).join("");
    return `<div class="nb-mobile-item"><button class="nb-mobile-link" type="button" aria-expanded="false"><span class="nb-mobile-link-content">${esc(item.label || "Menú")}</span><i class="ri-arrow-down-s-line"></i></button><div class="nb-mobile-submenu">${columns}</div></div>`;
};

export function buildNavbarHTML(input, uid = createUid()) {
    const data = mergeNavbarData(input);
    const logo = logoHtml(data);
    const bottomButtons = bottomButtonsHtml(data);
    const topButton = topButtonHtml(data);
    const search = searchBtnHtml(data);

    return `<div id="nb-root-${uid}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
<div class="nb-top"><div class="nb-top-inner">
<div class="nb-top-left">${logo}</div>
<div class="nb-top-right">
<div class="nb-top-actions">${data.top_actions.map((action) => actionHtml(action, "nb-top-action")).join("")}</div>
<div class="nb-top-extra">${topButton}${search}</div>
</div>
</div></div>
<div class="nb-bottom"><div class="nb-bottom-inner">
<ul class="nb-nav-list">${data.nav_links.map(desktopItem).join("")}</ul>
${bottomButtons ? `<div class="nb-bottom-buttons">${bottomButtons}</div>` : ""}
</div></div>
<div class="nb-mobile-bar"><div class="nb-mobile-bar-inner">
${logo}
<div class="nb-mobile-bar-actions">${search}${hamburgerHtml(data)}</div>
</div></div>
<div class="nb-mobile-menu">
${data.nav_links.map(mobileItem).join("")}
<div class="nb-mobile-actions">${bottomButtons}${topButton}</div>
<div class="nb-mobile-contact">${data.top_actions.map((action) => actionHtml(action, "nb-mobile-contact-link")).join("")}</div>
</div>
</div>`;
}

export function readNavbarConfig(component) {
    const raw = component.getAttributes()["data-navbar-config"];
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function purgeNavbarRules(editor) {
    const rules = editor.Css.getAll();
    rules
        .filter((rule) => rule.selectorsToString().includes(".nb-"))
        .forEach((rule) => rules.remove(rule));
}

export function applyNavbarConfig(editor, component, rawData) {
    const data = mergeNavbarData(rawData);
    const existing = component.getEl()?.querySelector("[id^='nb-root-']");
    const uid = existing?.id.replace("nb-root-", "") || createUid();

    purgeNavbarRules(editor);
    component.addAttributes({
        "data-navbar-config": JSON.stringify(data),
        "data-navbar-version": NAVBAR_VERSION,
    });
    component.components(buildNavbarHTML(data, uid) + NAVBAR_STYLES);

    return data;
}