const EXCLUDED_TYPES = [
    "map-component",
    "banner-component",
    "banner-single-component",
];

const NAMED_THEME = new Set([
    "white",
    "black",
    "transparent",
    "inherit",
    "current",
    "primary",
    "primary-dark",
    "secondary",
    "light",
]);

const VALID_SHADES = new Set([
    "50",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
    "950",
]);

const RADIUS_CLASSES = new Set([
    "rounded-none",
    "rounded-sm",
    "rounded",
    "rounded-md",
    "rounded-lg",
    "rounded-xl",
    "rounded-2xl",
    "rounded-3xl",
    "rounded-full",
]);

const FONT_SIZE_CLASSES = new Set([
    "text-xs",
    "text-sm",
    "text-base",
    "text-lg",
    "text-xl",
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "text-7xl",
    "text-8xl",
    "text-9xl",
]);

const FONT_WEIGHT_CLASSES = new Set([
    "font-thin",
    "font-extralight",
    "font-light",
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
    "font-extrabold",
    "font-black",
]);

const CSS_PROP_MAP = {
    "text-": "color",
    "bg-": "background-color",
    "border-": "border-color",
    "rounded-": "border-radius",
    "text-size": "font-size",
    "font-": "font-weight",
};

const BREAKPOINT_RE = /^(?:(?:sm|md|lg|xl|2xl):)?(.+)$/;
const ARBITRARY_COLOR_RE = /^\[(?:#|rgb|hsl)/i;
const ESCAPED_ARBITRARY_RE = /^-[0-9a-f]{3,8}-?$/i;

function _baseOf(cls) {
    return cls.match(BREAKPOINT_RE)[1];
}

function _isColorClass(base, prefix) {
    if (!base.startsWith(prefix)) return false;
    const rest = base.slice(prefix.length).split("/")[0];
    if (rest.startsWith("opacity-")) return false;
    if (ARBITRARY_COLOR_RE.test(rest)) return true;
    if (ESCAPED_ARBITRARY_RE.test(rest)) return true;
    if (NAMED_THEME.has(rest) || rest.startsWith("brand-")) return true;
    return VALID_SHADES.has(rest.split("-").pop());
}

function _matches(base, prefix) {
    if (prefix === "rounded-") {
        return RADIUS_CLASSES.has(base) || /^rounded-\[/.test(base);
    }
    if (prefix === "text-size") {
        return (
            FONT_SIZE_CLASSES.has(base) ||
            /^text-\[[\d.]+(px|rem|em)\]$/.test(base)
        );
    }
    if (prefix === "font-") {
        return FONT_WEIGHT_CLASSES.has(base) || /^font-\[\d+\]$/.test(base);
    }
    return _isColorClass(base, prefix);
}

function _stripConflicts(classes, prefix) {
    return classes.filter((cls) => !_matches(_baseOf(cls), prefix));
}

function _ensureOwnId(editor, component) {
    const doc = editor.Canvas.getDocument();
    const id = component.getId();
    if (!doc || !id) return;
    if (doc.querySelectorAll(`[id="${id}"]`).length < 2) return;

    const oldRule = editor.Css.getIdRule(id);
    const baseStyle = oldRule ? { ...oldRule.getStyle() } : {};
    const newId = `${id}-${Date.now().toString(36)}`;
    component.addAttributes({ id: newId });
    editor.Css.setIdRule(newId, baseStyle);
}

function _notify(msg, type) {
    if (typeof window.showNotification === "function") {
        window.showNotification(msg, type);
    }
}

export function isExcludedFromColorPicker(component) {
    return EXCLUDED_TYPES.includes(component.get("type"));
}

export function applyColorToComponent(editor, component, changes) {
    const target = editor.getSelected() || component;
    if (!target || !changes || changes.length === 0) return;

    _ensureOwnId(editor, target);

    let classes = target.getClasses();
    const style = { ...(target.getStyle() || {}) };

    changes.forEach(({ action, cls, value, prefix }) => {
        const cssProp = CSS_PROP_MAP[prefix];
        classes = _stripConflicts(classes, prefix);

        if (prefix === "border-") {
            classes = classes.filter((c) => c !== "border");
        }

        if (action === "remove") {
            delete style[cssProp];
            return;
        }

        style[cssProp] = value;
        if (cls) classes.push(cls);
        if (prefix === "border-") classes.unshift("border");
    });

    target.setClass(classes);
    target.setStyle(style);

    _notify("Estilos aplicados correctamente", "success");
}