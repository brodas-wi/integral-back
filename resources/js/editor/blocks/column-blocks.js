const columnsIcon1 = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`;

const columnsIcon2 = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`;

const columnsIcon3 = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="12" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="22" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`;

const columnsIcon4 = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="9" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="25" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`;

const columnsIcon13 = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="13" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`;

const columnsIcon31 = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="21" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`;

const columnsIcon12 = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="14" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="23" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`;

const columnsIcon21 = `<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="11" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="20" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`;

const COL = `<div class="flex flex-col gap-4 py-1" style="min-height:60px;"></div>`;

const RESPONSIVE_STYLES = `<style>@media(max-width:768px){.col-grid{grid-template-columns:1fr !important;}}</style>`;

export const columnBlocks = [
    {
        id: "columns-1",
        label: "1 Columna",
        category: "Columnas",
        media: columnsIcon1,
        content: `
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto flex flex-col gap-4 py-1" style="min-height:60px;">
    </div>
</div>
        `,
    },
    {
        id: "columns-2",
        label: "2 Columnas",
        category: "Columnas",
        media: columnsIcon2,
        content: `
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid grid-cols-2 gap-6">
            ${COL}
            ${COL}
        </div>
    </div>
</div>
${RESPONSIVE_STYLES}
        `,
    },
    {
        id: "columns-3",
        label: "3 Columnas",
        category: "Columnas",
        media: columnsIcon3,
        content: `
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid grid-cols-3 gap-6">
            ${COL}
            ${COL}
            ${COL}
        </div>
    </div>
</div>
${RESPONSIVE_STYLES}
        `,
    },
    {
        id: "columns-4",
        label: "4 Columnas",
        category: "Columnas",
        media: columnsIcon4,
        content: `
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid grid-cols-4 gap-6">
            ${COL}
            ${COL}
            ${COL}
            ${COL}
        </div>
    </div>
</div>
${RESPONSIVE_STYLES}
        `,
    },
    {
        id: "columns-1-3",
        label: "1/3 — 2/3",
        category: "Columnas",
        media: columnsIcon13,
        content: `
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:1fr 2fr;">
            ${COL}
            ${COL}
        </div>
    </div>
</div>
${RESPONSIVE_STYLES}
        `,
    },
    {
        id: "columns-3-1",
        label: "2/3 — 1/3",
        category: "Columnas",
        media: columnsIcon31,
        content: `
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:2fr 1fr;">
            ${COL}
            ${COL}
        </div>
    </div>
</div>
${RESPONSIVE_STYLES}
        `,
    },
    {
        id: "columns-1-2",
        label: "1/4 — 1/4 — 1/2",
        category: "Columnas",
        media: columnsIcon12,
        content: `
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:1fr 1fr 2fr;">
            ${COL}
            ${COL}
            ${COL}
        </div>
    </div>
</div>
${RESPONSIVE_STYLES}
        `,
    },
    {
        id: "columns-2-1",
        label: "1/2 — 1/4 — 1/4",
        category: "Columnas",
        media: columnsIcon21,
        content: `
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:2fr 1fr 1fr;">
            ${COL}
            ${COL}
            ${COL}
        </div>
    </div>
</div>
${RESPONSIVE_STYLES}
        `,
    },
];
