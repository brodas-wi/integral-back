const RICH_LIST_ICON = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    ${[8, 19]
        .map(
            (y) => `<circle cx="6" cy="${y}" r="2" fill="#E97300"/>
    <rect x="10" y="${y - 1}" width="16" height="2" fill="#fff" fill-opacity="0.9" rx="1"/>
    <rect x="10" y="${y + 3}" width="14" height="1.2" fill="#fff" fill-opacity="0.4" rx="0.6"/>
    <rect x="10" y="${y + 5.5}" width="12" height="1.2" fill="#fff" fill-opacity="0.4" rx="0.6"/>`,
        )
        .join("\n    ")}
</svg>`;

const ITEM_COUNT = 4;
const ITEM_TITLE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const ITEM_BODY =
    "Nulla tincidunt nisi eu pellentesque fringilla. Proin tincidunt, dolor vitae pellentesque scelerisque, sapien augue lobortis orci, quis blandit magna enim a magna.";

const richListItem = () => `
<div class="rl-item">
    <div class="rl-item-head">
        <span class="rl-dot"></span>
        <span class="rl-item-title text-base font-bold leading-snug">${ITEM_TITLE}</span>
    </div>
    <p class="rl-item-body text-base leading-relaxed m-0">${ITEM_BODY}</p>
</div>`;

const RICH_LIST_STYLES = `
<style>
.rl-section{width:100%;background-color:#fff;box-sizing:border-box;}
.rl-container{width:100%;max-width:1600px;margin:0 auto;padding-top:clamp(1.5rem,4vw,3.5rem);padding-right:clamp(1.5rem,4vw,3.5rem);padding-bottom:clamp(1.5rem,4vw,3.5rem);padding-left:clamp(1.5rem,4vw,3.5rem);box-sizing:border-box;display:flex;flex-direction:column;gap:1.75rem;}
.rl-item{display:flex;flex-direction:column;gap:0.5rem;min-width:0;}
.rl-item-head{display:flex;align-items:flex-start;gap:0.5rem;}
.rl-dot{flex-shrink:0;width:0.5rem;height:0.5rem;margin-top:0.5rem;border-radius:9999px;background-color:#E97300;}
.rl-item-title{color:#E97300;overflow-wrap:anywhere;}
.rl-item-body{color:#003B71;overflow-wrap:anywhere;}
</style>`;

const buildRichList = () => `<section class="rl-section">
    <div class="rl-container">${richListItem().repeat(ITEM_COUNT)}</div>
</section>
${RICH_LIST_STYLES}`;

export const richListBlocks = [
    {
        id: "rich-list",
        label: "Sección: lista con título y descripción",
        category: "Contenido",
        media: RICH_LIST_ICON,
        content: buildRichList(),
    },
];