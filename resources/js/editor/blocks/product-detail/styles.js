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

    threeCol: `.pd-three-col-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem;align-items:start;}.pd-three-col-grid>div:last-child:nth-child(3n+1){grid-column:1/-1;max-width:33%;margin:0 auto;}@media(max-width:${tablet}px){.pd-three-col-grid{gap:1.5rem;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:50%;}}@media(max-width:${mobile}px){.pd-three-col-grid{grid-template-columns:1fr;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:none;}}`,

    cardsGrid: `.pd-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}.pd-card{background-color:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;gap:0.75rem;}@media(max-width:${mobile}px){.pd-cards-grid{grid-template-columns:1fr;}}`,

    cardsRow: `.pd-cards-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(max(12rem,calc((100% - 6rem) / 5)),1fr));gap:1.5rem;}.pd-card-simple{display:flex;flex-direction:column;align-items:center;gap:0;min-width:0;box-sizing:border-box;background-color:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding-top:1.5rem;padding-right:1.5rem;padding-bottom:1.5rem;padding-left:1.5rem;text-align:center;overflow-wrap:anywhere;}.pd-card-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:4.5rem;height:4.5rem;border-radius:9999px;background-color:${orange};margin-bottom:0.75rem;}.pd-card-icon-img{display:block;width:2.25rem;height:2.25rem;object-fit:contain;}.pd-card-title{display:block;max-width:100%;margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;color:${blue};font-size:1rem;font-weight:700;line-height:1.3;letter-spacing:0.025em;}.pd-card-simple>p{margin-top:0.25rem;margin-right:0;margin-bottom:0;margin-left:0;}@media(max-width:${mobile}px){.pd-cards-row{grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;}.pd-card-simple{padding-top:1rem;padding-right:1rem;padding-bottom:1rem;padding-left:1rem;}.pd-card-icon{width:3.75rem;height:3.75rem;}.pd-card-icon-img{width:1.875rem;height:1.875rem;}}`,

    headerGrid: `.pd-header-grid{display:grid;grid-template-columns:1fr 1fr minmax(220px,0.8fr);grid-template-areas:"intro intro action" "col1 col2 action";gap:2rem 3rem;align-items:start;}.pd-header-grid>.pd-hg-intro{grid-area:intro;}.pd-header-grid>.pd-hg-col1{grid-area:col1;}.pd-header-grid>.pd-hg-col2{grid-area:col2;}.pd-header-grid>.pd-hg-action{grid-area:action;}@media(max-width:${tablet}px){.pd-header-grid{grid-template-columns:1fr 1fr;grid-template-areas:"intro intro" "col1 col2" "action action";gap:2rem;}}@media(max-width:${mobile}px){.pd-header-grid{grid-template-columns:1fr;grid-template-areas:"intro" "col1" "col2" "action";gap:1.5rem;}}`,

    stats: `.pd-stat{display:flex;align-items:center;gap:1rem;width:100%;box-sizing:border-box;background-color:#fff;border:2px solid ${blue};border-radius:0.75rem;padding-top:1.25rem;padding-right:1.5rem;padding-bottom:1.25rem;padding-left:1.5rem;}.pd-stat-value{flex-shrink:0;color:${orange};font-size:2rem;font-weight:800;line-height:1;}.pd-stat-label{color:${blue};font-size:0.875rem;font-weight:700;line-height:1.3;}@media(max-width:${mobile}px){.pd-stat{padding-top:1rem;padding-right:1.25rem;padding-bottom:1rem;padding-left:1.25rem;}.pd-stat-value{font-size:1.75rem;}}`,

    table: `.pd-coverage-table{width:100%;border-collapse:collapse;border-radius:0.5rem;overflow:hidden;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);}.pd-coverage-table thead th{background-color:${orange};color:#fff;text-align:left;padding:0.75rem 1rem;font-size:0.95rem;letter-spacing:0.02em;}.pd-coverage-table thead th:not(:first-child){text-align:center;}.pd-coverage-table tbody td{padding:0.65rem 1rem;font-size:0.9rem;color:${blue};border-bottom:1px solid #e5e7eb;}.pd-coverage-table tbody td:not(:first-child){text-align:center;font-weight:700;}.pd-coverage-table tbody tr:last-child td{border-bottom:none;}.pd-coverage-table tbody td:first-child{font-weight:700;}@media(max-width:${mobile}px){.pd-coverage-table{font-size:0.8rem;}.pd-coverage-table thead th,.pd-coverage-table tbody td{padding:0.5rem 0.6rem;}}`,
};

export const styleTag = (...keys) => {
    const unique = [...new Set(keys)];
    return `<style>${[STYLES.colors, ...unique.map((key) => STYLES[key])].join("\n")}</style>`;
};