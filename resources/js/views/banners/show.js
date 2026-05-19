const BUTTON_STYLES = {
    "fill-blue": {
        bg: "#003B71",
        color: "#ffffff",
        border: "#003B71",
        hoverBg: "#002a52",
        hoverColor: "#ffffff",
    },
    "outline-blue": {
        bg: "transparent",
        color: "#003B71",
        border: "#003B71",
        hoverBg: "#003B71",
        hoverColor: "#ffffff",
    },
    "fill-orange": {
        bg: "#E97300",
        color: "#ffffff",
        border: "#E97300",
        hoverBg: "#c96200",
        hoverColor: "#ffffff",
    },
    "outline-orange": {
        bg: "transparent",
        color: "#E97300",
        border: "#E97300",
        hoverBg: "#E97300",
        hoverColor: "#ffffff",
    },
    "fill-white": {
        bg: "#ffffff",
        color: "#003B71",
        border: "#ffffff",
        hoverBg: "#dce8f5",
        hoverColor: "#003B71",
    },
    "outline-white": {
        bg: "transparent",
        color: "#ffffff",
        border: "#ffffff",
        hoverBg: "#ffffff",
        hoverColor: "#003B71",
    },
};

function renderButton(text, style) {
    if (!text) return null;
    const s = BUTTON_STYLES[style] ?? BUTTON_STYLES["fill-blue"];
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = text;
    btn.style.cssText = `
        background:${s.bg};color:${s.color};border:2px solid ${s.border};
        padding:10px 28px;border-radius:999px;font-size:14px;font-weight:600;
        cursor:pointer;transition:background .2s,color .2s,border-color .2s;
        display:inline-block;text-decoration:none;white-space:nowrap;
    `;
    btn.addEventListener("mouseenter", () => {
        btn.style.background = s.hoverBg;
        btn.style.color = s.hoverColor;
        btn.style.borderColor = s.hoverBg;
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.background = s.bg;
        btn.style.color = s.color;
        btn.style.borderColor = s.border;
    });
    return btn;
}

const container = document.getElementById("show-btn-primary");
if (container) {
    const { primaryText, primaryStyle, secondaryText, secondaryStyle } =
        container.dataset;
    const primary = renderButton(primaryText, primaryStyle);
    const secondary = renderButton(secondaryText, secondaryStyle);
    if (primary) container.appendChild(primary);
    if (secondary) container.appendChild(secondary);
}
