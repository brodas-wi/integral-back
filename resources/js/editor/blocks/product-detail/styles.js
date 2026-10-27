export const COLORS = {
    blue: "#003B71",
    orange: "#E97300",
    orangeDark: "#C96200",
    muted: "#6B7280",
};

export const LAYOUT = {
    maxWidth: "1600px",
    padding: "clamp(1.5rem,4vw,3.5rem)",
    tablet: 992,
    mobile: 640,
};

const { blue, orange, orangeDark, muted } = COLORS;
const { maxWidth, padding, tablet, mobile } = LAYOUT;

export const STYLES = {
    colors: `.pd-text-muted{color:${muted};}.pd-text-primary{color:${blue};}.pd-text-orange{color:${orange};}.pd-dot-primary{background-color:${blue};}.pd-btn-orange{background-color:${orange};}.pd-btn-orange:hover{background-color:${orangeDark};}.pd-box-border{border-color:${blue};}.pd-box-divider{background-color:${orange};}`,

    section: `.pd-section{width:100%;background-color:#fff;box-sizing:border-box;}.pd-container{width:100%;max-width:${maxWidth};margin:0 auto;padding-top:${padding};padding-bottom:${padding};padding-left:${padding};padding-right:${padding};box-sizing:border-box;}.pd-aside{display:flex;flex-direction:column;align-items:stretch;gap:1rem;width:100%;max-width:28rem;min-width:0;justify-self:end;box-sizing:border-box;}.pd-aside .pd-cta{display:block;width:100%;box-sizing:border-box;}@media(max-width:${tablet}px){.pd-aside{max-width:none;justify-self:stretch;}}`,

    asymmetric: `.pd-asymmetric-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:2rem;align-items:start;}@media(max-width:${tablet}px){.pd-asymmetric-grid{grid-template-columns:1fr;gap:1.5rem;}}`,

    nested: `.pd-nested-two-col{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;}.pd-nested-two-col-full{grid-column:1/-1;}@media(max-width:${mobile}px){.pd-nested-two-col{grid-template-columns:1fr;}}`,

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

    threeCol: `.pd-three-col-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem;align-items:start;}.pd-three-col-grid>div:last-child:nth-child(3n+1){grid-column:1/-1;max-width:33%;margin:0 auto;}@media(max-width:${tablet}px){.pd-three-col-grid{gap:1.5rem;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:50%;}}@media(max-width:${mobile}px){.pd-three-col-grid{grid-template-columns:1fr;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:none;}}`,

    iconsCta: `.pd-icons-cta-grid{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:2rem;align-items:center;}@media(max-width:${tablet}px){.pd-icons-cta-grid{grid-template-columns:1fr;gap:1.5rem;}}`,

    cardsGrid: `.pd-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}.pd-card{background-color:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;gap:0.75rem;}@media(max-width:${mobile}px){.pd-cards-grid{grid-template-columns:1fr;}}`,

    cardsRow: `.pd-cards-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;}.pd-card-simple{background-color:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;align-items:center;gap:0.75rem;text-align:center;}@media(max-width:${mobile}px){.pd-cards-row{grid-template-columns:1fr 1fr;}}`,

    headerGrid: `.pd-header-grid{display:grid;grid-template-columns:1fr 1fr minmax(220px,0.8fr);grid-template-areas:"intro intro action" "col1 col2 action";gap:2rem 3rem;align-items:start;}.pd-header-grid>.pd-hg-intro{grid-area:intro;}.pd-header-grid>.pd-hg-col1{grid-area:col1;}.pd-header-grid>.pd-hg-col2{grid-area:col2;}.pd-header-grid>.pd-hg-action{grid-area:action;}@media(max-width:${tablet}px){.pd-header-grid{grid-template-columns:1fr 1fr;grid-template-areas:"intro intro" "col1 col2" "action action";gap:2rem;}}@media(max-width:${mobile}px){.pd-header-grid{grid-template-columns:1fr;grid-template-areas:"intro" "col1" "col2" "action";gap:1.5rem;}}`,

    stats: `.pd-stat{display:flex;align-items:center;gap:1rem;width:100%;box-sizing:border-box;background-color:#fff;border:2px solid ${blue};border-radius:0.75rem;padding-top:1.25rem;padding-right:1.5rem;padding-bottom:1.25rem;padding-left:1.5rem;}.pd-stat-value{flex-shrink:0;color:${orange};font-size:2rem;font-weight:800;line-height:1;}.pd-stat-label{color:${blue};font-size:0.875rem;font-weight:700;line-height:1.3;}@media(max-width:${mobile}px){.pd-stat{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;}.pd-stat-value{font-size:1.75rem;}}`,

    table: `.pd-coverage-table{width:100%;border-collapse:collapse;border-radius:0.5rem;overflow:hidden;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);}.pd-coverage-table thead th{background-color:${orange};color:#fff;text-align:left;padding:0.75rem 1rem;font-size:0.95rem;letter-spacing:0.02em;}.pd-coverage-table thead th:not(:first-child){text-align:center;}.pd-coverage-table tbody td{padding:0.65rem 1rem;font-size:0.9rem;color:${blue};border-bottom:1px solid #e5e7eb;}.pd-coverage-table tbody td:not(:first-child){text-align:center;font-weight:700;}.pd-coverage-table tbody tr:last-child td{border-bottom:none;}.pd-coverage-table tbody td:first-child{font-weight:700;}@media(max-width:${mobile}px){.pd-coverage-table{font-size:0.8rem;}.pd-coverage-table thead th,.pd-coverage-table tbody td{padding:0.5rem 0.6rem;}}`,
};

export const styleTag = (...keys) => {
    const unique = [...new Set(keys)];
    return `<style>${[STYLES.colors, ...unique.map((key) => STYLES[key])].join("\n")}</style>`;
};