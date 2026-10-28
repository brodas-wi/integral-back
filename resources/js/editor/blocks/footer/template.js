import { FOOTER_VERSION, mergeData } from "./defaults";
import { FOOTER_STYLES } from "./styles";
import { esc } from "./utils";

const LOCKED =
    'data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false"';

const iconTag = (icon) => (icon ? `<i class="${esc(icon)}"></i>` : "");

const linkHtml = (link) => {
    const icon = iconTag(link.icon);
    if (link.isText) {
        return `<li><span class="ft-text">${icon}${esc(link.label)}</span></li>`;
    }
    return `<li><a href="${esc(link.href || "#")}" class="ft-link">${icon}${esc(link.label)}</a></li>`;
};

const sectionHtml = (section) =>
    `<div class="ft-section"><p class="ft-section-title">${esc(section.title)}</p><ul class="ft-links">${section.links.map(linkHtml).join("")}</ul></div>`;

const logoHtml = (data) =>
    data.logo_url
        ? `<img src="${esc(data.logo_url)}" alt="${esc(data.logo_alt || "Logo")}">`
        : `<span class="ft-logo-text">${esc(data.logo_alt || "Logo")}</span>`;

const TITLE_WEIGHT = 1.5;

function columnCount(sections) {
    if (!sections.length) return 1;

    const heights = sections.map((section) => TITLE_WEIGHT + section.links.length);
    const capacity = Math.max(...heights);

    let columns = 1;
    let used = 0;
    heights.forEach((height) => {
        if (used + height > capacity && used > 0) {
            columns += 1;
            used = 0;
        }
        used += height;
    });

    return columns;
}

export function buildFooterHTML(input) {
    const data = mergeData(input);
    const columns = columnCount(data.sections);
    return `<div class="ft-inner" ${LOCKED}><div class="ft-logo-col">${logoHtml(data)}</div><div class="ft-sections ft-cols-${columns}" ${LOCKED}>${data.sections.map(sectionHtml).join("")}</div></div><div class="ft-stripe" ${LOCKED}></div>`;
}

export const buildFooterContent = (input) => buildFooterHTML(input) + FOOTER_STYLES;

export function readFooterConfig(component) {
    const raw = component.getAttributes()["data-footer-config"];
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function purgeFooterRules(editor) {
    const rules = editor.Css.getAll();
    rules
        .filter((rule) => rule.selectorsToString().includes(".ft-"))
        .forEach((rule) => rules.remove(rule));
}

export function applyFooterConfig(editor, component, rawData) {
    const data = mergeData(rawData);

    purgeFooterRules(editor);
    component.addAttributes({
        "data-footer-config": JSON.stringify(data),
        "data-footer-version": FOOTER_VERSION,
    });
    component.components(buildFooterContent(data));

    return data;
}