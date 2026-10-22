const MODAL_CSS = `
.ctm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);}
.ctm-modal{display:flex;flex-direction:column;width:100%;max-width:1040px;max-height:92vh;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);color:#1e293b;font-family:'Inter',sans-serif;}
.ctm-modal *{box-sizing:border-box;}
.ctm-modal,.ctm-modal *{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
@supports not (scrollbar-color:auto){
.ctm-modal *::-webkit-scrollbar{width:6px;height:6px;}
.ctm-modal *::-webkit-scrollbar-track{background:transparent;}
.ctm-modal *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
}
.ctm-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;}
.ctm-header-left{display:flex;align-items:center;gap:0.5rem;}
.ctm-header-left i{font-size:1.125rem;color:#3b82f6;}
.ctm-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.ctm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-size:1.125rem;cursor:pointer;transition:background 0.15s,color 0.15s;}
.ctm-close:hover{background:#f1f5f9;color:#475569;}
.ctm-tabs{display:flex;flex-wrap:wrap;gap:0.25rem;flex-shrink:0;padding:0.5rem 1rem;border-bottom:1px solid #e2e8f0;}
.ctm-tab{display:flex;align-items:center;gap:0.375rem;padding:0.4375rem 0.75rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-family:inherit;font-size:0.8125rem;font-weight:500;white-space:nowrap;cursor:pointer;transition:background 0.15s,color 0.15s;}
.ctm-tab i{font-size:1rem;}
.ctm-tab:hover{background:#f1f5f9;}
.ctm-tab.active{background:#e8f0f8;color:#003B71;}
.ctm-body{flex:1;padding:1.25rem;overflow-y:auto;background:#f8fafc;}
.ctm-panel{display:none;flex-direction:column;gap:1rem;}
.ctm-panel.active{display:flex;}
.ctm-card{padding:1rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;}
.ctm-label{display:block;margin-bottom:0.625rem;font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;}
.ctm-field .ctm-label{margin-bottom:0.375rem;}
.ctm-hint{margin:0;font-size:0.8rem;line-height:1.5;color:#64748b;}
.ctm-hint code{padding:1px 5px;border-radius:4px;background:#e2e8f0;font-size:0.75rem;color:#334155;}
.ctm-row{display:flex;align-items:center;gap:0.75rem;}
.ctm-grow{flex:1;min-width:0;}
.ctm-input,.ctm-textarea{width:100%;min-width:0;background:#f8fafc;border:1px solid #e2e8f0;color:#1e293b;font-family:inherit;outline:none;transition:border-color 0.15s;}
.ctm-input{padding:0.5rem 1rem;border-radius:9999px;font-size:0.875rem;}
.ctm-textarea{min-height:3.25rem;padding:0.5rem 0.75rem;border-radius:0.5rem;font-size:0.8125rem;resize:vertical;}
.ctm-input:focus,.ctm-textarea:focus{border-color:#3b82f6;}
.ctm-seg{display:inline-flex;gap:0.25rem;padding:0.1875rem;background:#f1f5f9;border-radius:9999px;}
.ctm-seg-btn{padding:0.3125rem 0.75rem;border:0;border-radius:9999px;background:transparent;color:#64748b;font-family:inherit;font-size:0.75rem;font-weight:600;white-space:nowrap;cursor:pointer;transition:background 0.15s,color 0.15s;}
.ctm-seg-btn:hover{color:#1e293b;}
.ctm-seg-btn.active{background:#003B71;color:#fff;}
.ctm-seg-btn.ctm-seg-orange.active{background:#E97300;}
.ctm-switch{position:relative;flex-shrink:0;width:44px;height:24px;}
.ctm-switch input{width:0;height:0;opacity:0;}
.ctm-switch-track{position:absolute;inset:0;border-radius:9999px;background:#cbd5e1;cursor:pointer;transition:background 0.2s;}
.ctm-switch-track::before{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);transition:transform 0.2s;}
.ctm-switch input:checked+.ctm-switch-track{background:#003B71;}
.ctm-switch input:checked+.ctm-switch-track::before{transform:translateX(20px);}
.ctm-switch-label{font-size:0.8125rem;font-weight:500;color:#475569;}
.ctm-list{display:flex;flex-direction:column;gap:0.75rem;}
.ctm-item{overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;}
.ctm-item-head{display:flex;align-items:center;gap:0.5rem;padding:0.625rem 0.875rem;background:#f8fafc;border-bottom:1px solid #f1f5f9;}
.ctm-num{flex-shrink:0;padding:2px 10px;border-radius:9999px;background:#e8f0f8;font-size:0.6875rem;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:#003B71;}
.ctm-icon-btn{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:1.75rem;height:1.75rem;padding:0;border:0;border-radius:9999px;background:transparent;color:#64748b;font-size:1rem;cursor:pointer;transition:background 0.15s,color 0.15s;}
.ctm-icon-btn:hover:not(:disabled){background:#e2e8f0;color:#1e293b;}
.ctm-icon-btn.ctm-danger{color:#ef4444;}
.ctm-icon-btn.ctm-danger:hover:not(:disabled){background:#fef2f2;color:#dc2626;}
.ctm-icon-btn:disabled{opacity:0.35;cursor:not-allowed;}
.ctm-opts{display:flex;flex-wrap:wrap;gap:1rem 1.5rem;padding:0.875rem;}
.ctm-cells{display:grid;gap:0.75rem;padding:0.875rem;overflow-x:auto;}
.ctm-cell{display:flex;flex-direction:column;gap:0.5rem;min-width:0;padding:0.625rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;}
.ctm-cell-label{display:flex;align-items:center;gap:0.375rem;overflow:hidden;font-size:0.6875rem;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;text-overflow:ellipsis;white-space:nowrap;color:#64748b;}
.ctm-cell-label::before{content:"";flex-shrink:0;width:8px;height:8px;border-radius:50%;background:#003B71;}
.ctm-cell[data-color="orange"] .ctm-cell-label::before{background:#E97300;}
.ctm-check-preview{display:none;align-items:center;justify-content:center;gap:0.375rem;min-height:3.25rem;border:1px dashed #cbd5e1;border-radius:0.5rem;color:#003B71;font-size:0.8125rem;font-weight:600;}
.ctm-check-preview i{font-size:1.5rem;}
.ctm-cell[data-color="orange"] .ctm-check-preview{color:#E97300;}
.ctm-cell-check .ctm-textarea{display:none;}
.ctm-cell-check .ctm-check-preview{display:flex;}
.ctm-btn-add{display:inline-flex;align-items:center;gap:0.375rem;align-self:flex-start;padding:0.4375rem 1rem;border:0;border-radius:9999px;background:#003B71;color:#fff;font-family:inherit;font-size:0.75rem;font-weight:600;cursor:pointer;transition:background 0.15s;}
.ctm-btn-add:hover:not(:disabled){background:#002a52;}
.ctm-btn-add:disabled{opacity:0.4;cursor:not-allowed;}
.ctm-preview{padding:1.25rem;overflow-x:auto;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.75rem;}
.ctm-footer{display:flex;align-items:center;justify-content:flex-end;gap:0.75rem;flex-shrink:0;padding:1rem 1.25rem;background:#fff;border-top:1px solid #f1f5f9;}
.ctm-btn-cancel{padding:0.5rem 1.25rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;transition:background 0.15s;}
.ctm-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
.ctm-btn-save{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1.25rem;border:0;border-radius:9999px;background:#f0872a;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;transition:background 0.15s;}
.ctm-btn-save:hover{background:#d97821;}
`;

export function ensureModalStyles() {
    if (document.getElementById("ctm-modal-styles")) return;
    const style = document.createElement("style");
    style.id = "ctm-modal-styles";
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}