const MODAL_CSS = `
.nb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);}
.nb-modal{display:flex;flex-direction:column;width:100%;max-width:860px;max-height:92vh;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);color:#1e293b;font-family:'Inter',sans-serif;}
.nb-modal *{box-sizing:border-box;}
.nb-modal-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;}
.nb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
.nb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
.nb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.nb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-size:1.125rem;cursor:pointer;}
.nb-modal-close:hover{background:#f1f5f9;color:#475569;}
.nb-modal-tabs{display:flex;flex-wrap:wrap;gap:0.25rem;flex-shrink:0;padding:0.5rem 1rem;border-bottom:1px solid #e2e8f0;}
.nb-tab-btn{display:flex;align-items:center;gap:0.375rem;flex-shrink:0;padding:0.4375rem 0.75rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-family:inherit;font-size:0.8125rem;font-weight:500;white-space:nowrap;cursor:pointer;transition:color 0.15s;}
.nb-tab-btn i{font-size:1rem;}
.nb-tab-btn:hover{background:#f1f5f9;}
.nb-tab-btn.active{background:#e8f0f8;color:#003B71;}
.nb-modal-body{display:flex;flex:1;flex-direction:column;gap:1rem;padding:1.25rem;overflow-y:auto;background:#f8fafc;}
.nb-modal,.nb-modal *{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
@supports not (scrollbar-color:auto){
.nb-modal *::-webkit-scrollbar{width:6px;height:6px;}
.nb-modal *::-webkit-scrollbar-track{background:transparent;}
.nb-modal *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
.nb-modal *::-webkit-scrollbar-thumb:hover{background:#b6c2d1;}
}
.nb-tab-panel{display:none;flex-direction:column;gap:1rem;}
.nb-tab-panel.active{display:flex;}
.nb-card{padding:1rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;}
.nb-label{display:block;margin-bottom:0.625rem;font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;}
.nb-field .nb-label{margin-bottom:0.375rem;}
.nb-hint{margin:0 0 0.75rem;font-size:0.8rem;color:#64748b;}
.nb-row{display:flex;align-items:center;gap:0.75rem;}
.nb-stack{display:flex;flex-direction:column;gap:0.75rem;}
.nb-list{display:flex;flex-direction:column;gap:0.625rem;}
.nb-grow{flex:1;min-width:0;}
.nb-input,.nb-input-sm{width:100%;min-width:0;background:#f8fafc;border:1px solid #e2e8f0;color:#1e293b;font-family:inherit;outline:none;transition:border-color 0.15s;}
.nb-input{flex:1;padding:0.5rem 0.75rem;border-radius:0.5rem;font-size:0.875rem;}
.nb-input-sm{padding:0.375rem 0.625rem;border-radius:0.375rem;font-size:0.8rem;}
.nb-input:focus,.nb-input-sm:focus{border-color:#3b82f6;}
.nb-check{display:flex;align-items:center;gap:0.375rem;font-size:0.75rem;color:#475569;cursor:pointer;}
.nb-action-card{display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;}
.nb-link-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;}
.nb-link-card-header{display:flex;align-items:center;gap:0.5rem;padding:0.625rem 0.875rem;background:#f8fafc;border-bottom:1px solid #f1f5f9;border-radius:0.5rem 0.5rem 0 0;}
.nb-link-card-body{display:flex;flex-direction:column;gap:0.75rem;padding:0.75rem 0.875rem;}
.nb-action-card.nb-dragging,.nb-link-card.nb-dragging{opacity:0.4;}
.nb-action-card.nb-drag-over,.nb-link-card.nb-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
.nb-drag-handle{display:flex;align-items:center;flex-shrink:0;padding:0 0.125rem;color:#94a3b8;cursor:grab;}
.nb-drag-handle:hover{color:#475569;}
.nb-drag-handle:active{cursor:grabbing;}
.nb-type-badge{flex-shrink:0;padding:2px 10px;border-radius:9999px;font-size:0.65rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;cursor:pointer;user-select:none;transition:opacity 0.15s;}
.nb-type-badge:hover{opacity:0.75;}
.nb-type-link{background:#dbeafe;color:#1d4ed8;}
.nb-type-submenu{background:#fef3c7;color:#b45309;}
.nb-btn-remove{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:1.75rem;height:1.75rem;padding:0;border:0;border-radius:9999px;background:none;color:#ef4444;cursor:pointer;transition:background 0.15s;}
.nb-btn-remove:hover{background:#fef2f2;}
.nb-add-row{display:flex;flex-wrap:wrap;gap:0.5rem;padding-top:0.25rem;}
.nb-btn-add{display:flex;align-items:center;gap:0.375rem;padding:0.375rem 1rem;border:0;border-radius:9999px;color:#fff;font-family:inherit;font-size:0.75rem;font-weight:600;cursor:pointer;transition:background 0.15s;}
.nb-btn-add:disabled{opacity:0.4;cursor:not-allowed;}
.nb-btn-add-link,.nb-btn-add-action{background:#003B71;}
.nb-btn-add-link:hover:not(:disabled),.nb-btn-add-action:hover:not(:disabled){background:#002a52;}
.nb-btn-add-submenu{background:#b45309;}
.nb-btn-add-submenu:hover:not(:disabled){background:#92400e;}
.nb-btn-add-col{background:#0d9488;}
.nb-btn-add-col:hover:not(:disabled){background:#0f766e;}
.nb-btn-add-item{padding:0.25rem 0.5rem;background:#64748b;font-size:0.7rem;}
.nb-btn-add-item:hover:not(:disabled){background:#475569;}
.nb-pick-btn{display:flex;align-items:center;gap:0.25rem;flex-shrink:0;padding:0.4rem 1rem;border:0;border-radius:9999px;background:#003B71;color:#fff;font-family:inherit;font-size:0.75rem;font-weight:600;white-space:nowrap;cursor:pointer;transition:background 0.15s;}
.nb-pick-btn:hover{background:#002a52;}
.nb-icon-preview{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:2rem;height:2rem;border-radius:0.375rem;background:#f1f5f9;}
.nb-icon-preview i{font-size:1.125rem;color:#003B71;}
.nb-img-preview{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:64px;height:48px;padding:4px;border:1px solid #e2e8f0;border-radius:0.375rem;background:#f8fafc;color:#94a3b8;}
.nb-img-preview img{max-width:100%;max-height:100%;object-fit:contain;}
.nb-col-card{display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;}
.nb-col-title{flex-shrink:0;font-size:0.75rem;font-weight:700;color:#475569;}
.nb-cta-title{color:#92400e;}
.nb-col-items{display:flex;flex-direction:column;gap:0.375rem;padding-left:0.5rem;border-left:2px solid #e2e8f0;}
.nb-col-item{display:flex;flex-direction:column;gap:0.25rem;padding:0.375rem;background:#fff;border:1px solid #f1f5f9;border-radius:0.375rem;}
.nb-section-title{margin-top:0.25rem;padding:0.25rem 0;border-bottom:1px solid #e2e8f0;font-size:0.75rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;color:#475569;}
.nb-cta-section{display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem;background:#fff3e0;border:1px solid #fed7aa;border-radius:0.5rem;}
.nb-color-toggle{display:flex;align-items:center;flex-wrap:wrap;gap:0.5rem;}
.nb-color-opt{padding:0.375rem 0.875rem;border:2px solid transparent;border-radius:9999px;font-family:inherit;font-size:0.75rem;font-weight:700;color:#fff;cursor:pointer;transition:opacity 0.15s;}
.nb-color-opt-blue{background:#003B71;}
.nb-color-opt-orange{background:#E97300;}
.nb-color-opt-white{background:#fff;color:#003B71;border-color:#cbd5e1;}
.nb-color-opt.nb-color-inactive{opacity:0.35;border-color:#e2e8f0;}
.nb-color-opt.nb-color-inactive:hover{opacity:0.6;}
.nb-color-toggle.nb-small{gap:0.25rem;}
.nb-color-toggle.nb-small .nb-color-opt{padding:0.2rem 0.5rem;font-size:0.65rem;}
.nb-toggle-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;}
.nb-toggle-text{display:flex;flex-direction:column;gap:0.125rem;}
.nb-toggle-title{font-size:0.875rem;font-weight:600;color:#1e293b;}
.nb-toggle-desc{font-size:0.75rem;color:#94a3b8;}
.nb-switch{position:relative;flex-shrink:0;width:44px;height:24px;}
.nb-switch input{width:0;height:0;opacity:0;}
.nb-switch-track{position:absolute;inset:0;border-radius:9999px;background:#cbd5e1;cursor:pointer;transition:background 0.2s;}
.nb-switch-track::before{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);transition:transform 0.2s;}
.nb-switch input:checked+.nb-switch-track{background:#003B71;}
.nb-switch input:checked+.nb-switch-track::before{transform:translateX(20px);}
.nb-modal-footer{display:flex;align-items:center;justify-content:flex-end;gap:0.75rem;flex-shrink:0;padding:1rem 1.25rem;background:#fff;border-top:1px solid #f1f5f9;}
.nb-footer-group{display:flex;gap:0.5rem;margin-right:auto;}
.nb-btn-cancel{padding:0.5rem 1.25rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;transition:background 0.15s;}
.nb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
.nb-btn-save{padding:0.5rem 1.25rem;border:0;border-radius:9999px;background:#f0872a;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;transition:background 0.15s;}
.nb-btn-save:hover{background:#d97821;}
.nb-btn-backup,.nb-btn-restore{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;border:2px solid #003B71;border-radius:9999px;background:#fff;color:#003B71;font-family:inherit;font-size:0.8125rem;font-weight:600;cursor:pointer;user-select:none;transition:background 0.15s,color 0.15s;}
.nb-btn-backup:hover{background:#003B71;color:#fff;}
.nb-btn-restore{border-color:#0d9488;color:#0d9488;}
.nb-btn-restore:hover{background:#0d9488;color:#fff;}
.nb-ac-wrap{position:relative;flex:1;min-width:0;width:100%;}
.nb-ac-list{display:none;position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;max-height:200px;margin:0;padding:0.25rem;overflow-y:auto;list-style:none;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);}
.nb-ac-list.nb-show{display:block;}
.nb-ac-item{display:flex;flex-direction:column;gap:0.125rem;padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;}
.nb-ac-item:hover,.nb-ac-item.nb-ac-active{background:#f1f5f9;}
.nb-ac-title{font-size:0.8rem;font-weight:600;color:#1e293b;}
.nb-ac-slug{font-size:0.7rem;color:#64748b;}
.nb-ac-list mark{padding:0 1px;border-radius:2px;background:#fef3c7;color:#92400e;}
.nb-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);}
.nb-confirm-modal{width:100%;max-width:420px;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;}
.nb-confirm-header{display:flex;align-items:center;gap:0.625rem;padding:1rem 1.25rem 0.75rem;border-bottom:1px solid #f1f5f9;}
.nb-confirm-header i{font-size:1.25rem;}
.nb-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
.nb-confirm-body{padding:1rem 1.25rem;}
.nb-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;line-height:1.5;color:#475569;}
.nb-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;border-radius:0.375rem;background:#f1f5f9;font-size:0.8rem;font-weight:600;color:#003B71;}
.nb-confirm-footer{display:flex;justify-content:flex-end;gap:0.625rem;padding:0.75rem 1.25rem 1rem;background:#f8fafc;border-top:1px solid #f1f5f9;}
.nb-confirm-cancel{padding:0.5rem 1.125rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;}
.nb-confirm-cancel:hover{background:#f1f5f9;}
.nb-confirm-ok{padding:0.5rem 1.125rem;border:0;border-radius:9999px;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;}
.icon-picker-overlay{z-index:1000000 !important;}
`;

export function ensureModalStyles() {
    if (document.getElementById("nb-modal-styles")) return;
    const style = document.createElement("style");
    style.id = "nb-modal-styles";
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}