const svg = (body) =>
    `<svg viewBox="0 0 32 32" width="32" height="32"><rect width="32" height="32" fill="#f8f9fa" rx="2"/>${body}</svg>`;

export const ICONS = {
    twoColumns: svg(`
<rect x="2" y="4" width="6.5" height="2" rx="1" fill="#E97300"/>
<rect x="2" y="8.5" width="7" height="0.9" rx="0.45" fill="#003B71" fill-opacity="0.5"/>
<rect x="2" y="10.7" width="5.8" height="0.9" rx="0.45" fill="#003B71" fill-opacity="0.5"/>
<rect x="2" y="12.9" width="6.5" height="0.9" rx="0.45" fill="#003B71" fill-opacity="0.5"/>
<rect x="2" y="15.1" width="5" height="0.9" rx="0.45" fill="#003B71" fill-opacity="0.5"/>
<rect x="21" y="13" width="9" height="3.2" rx="1.6" fill="#E97300"/>
<rect x="21" y="18.2" width="9" height="0.9" rx="0.45" fill="#9ca3af"/>
<rect x="21" y="20.4" width="7" height="0.9" rx="0.45" fill="#9ca3af"/>`),

    twoLineSection: svg(`
<rect x="3" y="5" width="12" height="1.2" rx="0.6" fill="#003B71"/>
<rect x="3" y="7" width="9.5" height="1.2" rx="0.6" fill="#E97300"/>
<rect x="3" y="10.5" width="12" height="0.5" rx="0.25" fill="#003B71" fill-opacity="0.5"/>
<rect x="3" y="12.2" width="10" height="0.5" rx="0.25" fill="#003B71" fill-opacity="0.5"/>
<rect x="3" y="13.9" width="11" height="0.5" rx="0.25" fill="#003B71" fill-opacity="0.5"/>
<rect x="3" y="15.6" width="9" height="0.5" rx="0.25" fill="#003B71" fill-opacity="0.5"/>
<rect x="20.5" y="5" width="8" height="3" rx="1.5" fill="#E97300"/>
<rect x="20.5" y="10.5" width="8" height="0.7" rx="0.35" fill="#9ca3af"/>
<rect x="20.5" y="12" width="6" height="0.7" rx="0.35" fill="#9ca3af"/>`),

    withPriceBox: svg(`
<rect x="2" y="3" width="14" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
<rect x="4" y="5" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
<rect x="4" y="9" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
<rect x="4" y="11" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
<rect x="4" y="13" width="9" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
<rect x="4" y="16" width="3" height="1" rx="0.5" fill="#E97300" fill-opacity="0.8"/>
<circle cx="5" cy="20" r="1" fill="#003B71" fill-opacity="0.5"/>
<rect x="7" y="19.3" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
<rect x="18" y="3" width="12" height="13" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
<rect x="20" y="6" width="8" height="3" rx="1" fill="#E97300" fill-opacity="0.3"/>
<rect x="20" y="11" width="8" height="3" rx="1.5" fill="#E97300" fill-opacity="0.8"/>
<rect x="18" y="18" width="12" height="11" fill="none" stroke="#003B71" stroke-width="1" rx="1.5"/>
<rect x="20" y="20.5" width="8" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.7"/>
<rect x="20" y="23.5" width="8" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.8"/>`),

    withPriceDouble: svg(`
<rect x="2" y="6" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.5"/>
<rect x="2" y="8.5" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.5"/>
<rect x="2" y="11.5" width="7" height="0.9" rx="0.45" fill="#E97300"/>
<rect x="2" y="14.5" width="9" height="0.7" rx="0.35" fill="#003B71" fill-opacity="0.35"/>
<rect x="2" y="16.5" width="7.5" height="0.7" rx="0.35" fill="#003B71" fill-opacity="0.35"/>
<rect x="20" y="6" width="10" height="2.2" rx="0.5" fill="#E97300"/>
<rect x="20" y="15" width="10" height="10" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.9"/>
<line x1="20" y1="20" x2="30" y2="20" stroke="#E97300" stroke-width="1"/>`),

    statsColumns: svg(`
<rect x="2" y="5" width="14" height="1.6" rx="0.8" fill="#003B71"/>
<rect x="2" y="8" width="11" height="1.6" rx="0.8" fill="#E97300"/>
<rect x="2" y="13" width="14" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.45"/>
<rect x="2" y="15" width="12" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.45"/>
<rect x="2" y="17" width="13" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.45"/>
<rect x="19" y="4" width="11" height="9" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.9"/>
<rect x="21" y="7.2" width="3" height="2.6" rx="0.6" fill="#E97300"/>
<rect x="25" y="7.6" width="3.5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.6"/>
<rect x="19" y="16" width="11" height="9" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.9"/>
<rect x="21" y="19.2" width="3" height="2.6" rx="0.6" fill="#E97300"/>
<rect x="25" y="19.6" width="3.5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.6"/>`),

    threeCol: svg(`
<rect x="2" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
<rect x="4" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
<rect x="12" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
<rect x="14" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
<rect x="22" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
<rect x="23" y="11" width="6" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>`),

    headerGrid: svg(`
<rect x="2" y="2" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.5"/>
<rect x="2" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
<rect x="13" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
<rect x="24" y="2" width="6" height="6" rx="1" fill="none" stroke="#E97300" stroke-width="0.8" stroke-opacity="0.5"/>
<rect x="24" y="11" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>`),

    cardsGrid: svg(`
<rect x="2" y="2" width="13" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
<rect x="2" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
<circle cx="5" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
<rect x="9" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
<circle cx="12" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
<rect x="18" y="2" width="12" height="3" rx="1" fill="#E97300" fill-opacity="0.7"/>
<rect x="18" y="7" width="12" height="2" rx="1" fill="#E97300" fill-opacity="0.4"/>
<rect x="18" y="12" width="12" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.85"/>`),

    cardsRow: svg(`
<rect x="2" y="4" width="27" height="2" rx="1" fill="#003B71" fill-opacity="0.4"/>
<rect x="2" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
<circle cx="5" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
<rect x="9" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
<circle cx="12" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
<rect x="16" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
<circle cx="19" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
<rect x="23" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
<circle cx="26" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>`),

    repeatBlocks: svg(`
<rect x="2" y="5.5" width="6" height="0.9" rx="0.45" fill="#003B71"/>
<rect x="2" y="7.4" width="10.5" height="0.6" rx="0.3" fill="#003B71" fill-opacity="0.4"/>
<rect x="2" y="11.5" width="6" height="0.9" rx="0.45" fill="#003B71"/>
<rect x="2" y="13.4" width="10.5" height="0.6" rx="0.3" fill="#003B71" fill-opacity="0.4"/>
<rect x="2" y="17.5" width="6" height="0.9" rx="0.45" fill="#003B71"/>
<rect x="2" y="19.4" width="10.5" height="0.6" rx="0.3" fill="#003B71" fill-opacity="0.4"/>
<rect x="20" y="5.5" width="9" height="2.8" rx="0.7" fill="#E97300"/>
<rect x="20" y="10.5" width="9" height="2.8" rx="1.4" fill="#E97300"/>
<rect x="20" y="15.5" width="9" height="4.5" rx="1" fill="none" stroke="#003B71" stroke-width="0.7"/>`),

    iconsCta: svg(`
<circle cx="5" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
<circle cx="13" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
<circle cx="21" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
<rect x="24" y="17" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>`),

    table: svg(`
<rect x="2" y="4" width="20" height="4" fill="#E97300" fill-opacity="0.8" rx="1"/>
<rect x="2" y="10" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
<rect x="2" y="14" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
<rect x="2" y="18" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
<rect x="24" y="4" width="6" height="4" rx="1" fill="none" stroke="#E97300" stroke-width="0.8" stroke-opacity="0.5"/>
<rect x="24" y="11" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>`),

    bulletItem: svg(`
<circle cx="6" cy="10" r="2" fill="#003B71" fill-opacity="0.6"/>
<rect x="10" y="9" width="18" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
<circle cx="6" cy="17" r="2" fill="#003B71" fill-opacity="0.6"/>
<rect x="10" y="16" width="16" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
<circle cx="6" cy="24" r="2" fill="#003B71" fill-opacity="0.6"/>
<rect x="10" y="23" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>`),

    footnote: svg(`
<rect x="3" y="5" width="26" height="1.5" rx="0.75" fill="#9ca3af" fill-opacity="0.5"/>
<rect x="3" y="9" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
<rect x="3" y="11.5" width="20" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
<rect x="3" y="16" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>`),

    cta: svg(`<rect x="6" y="13" width="20" height="7" rx="3.5" fill="#E97300" fill-opacity="0.85"/>`),

    title: svg(`
<rect x="4" y="12" width="24" height="5" rx="1" fill="#E97300" fill-opacity="0.8"/>
<rect x="8" y="19" width="16" height="2" rx="1" fill="#E97300" fill-opacity="0.4"/>`),

    twoLineTitle: svg(`
<rect x="5" y="11" width="22" height="4.5" rx="1.5" fill="#003B71"/>
<rect x="5" y="17.5" width="18" height="4.5" rx="1.5" fill="#E97300"/>`),

    priceBox: svg(`
<rect x="4" y="10" width="24" height="12" rx="3" fill="none" stroke="#003B71" stroke-width="1.4"/>
<rect x="8" y="13.5" width="16" height="1.6" rx="0.8" fill="#003B71"/>
<rect x="10" y="17" width="12" height="2.4" rx="1.2" fill="#E97300"/>`),

    priceBoxDouble: svg(`
<rect x="5" y="4" width="22" height="24" rx="3" fill="none" stroke="#003B71" stroke-width="1.3"/>
<rect x="9" y="8" width="14" height="1.6" rx="0.8" fill="#003B71"/>
<rect x="11" y="11.5" width="10" height="2.2" rx="1.1" fill="#E97300"/>
<line x1="5" y1="16" x2="27" y2="16" stroke="#E97300" stroke-width="1"/>
<rect x="9" y="19" width="14" height="1.6" rx="0.8" fill="#003B71"/>
<rect x="11" y="22.5" width="10" height="2.2" rx="1.1" fill="#E97300"/>`),

    iconCard: svg(`
<rect x="9" y="4" width="14" height="24" rx="2" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.7"/>
<circle cx="16" cy="9.5" r="2.6" fill="#E97300"/>
<rect x="11.5" y="14.5" width="9" height="1.1" rx="0.55" fill="#E97300"/>
<circle cx="12.2" cy="19" r="0.6" fill="#003B71" fill-opacity="0.6"/>
<rect x="13.5" y="18.6" width="7" height="0.7" rx="0.35" fill="#003B71" fill-opacity="0.5"/>
<circle cx="12.2" cy="21.5" r="0.6" fill="#003B71" fill-opacity="0.6"/>
<rect x="13.5" y="21.1" width="6" height="0.7" rx="0.35" fill="#003B71" fill-opacity="0.5"/>
<circle cx="12.2" cy="24" r="0.6" fill="#003B71" fill-opacity="0.6"/>
<rect x="13.5" y="23.6" width="6.5" height="0.7" rx="0.35" fill="#003B71" fill-opacity="0.5"/>`),
};