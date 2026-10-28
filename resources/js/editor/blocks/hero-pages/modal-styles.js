const MODAL_CSS = `
.hpm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);}
.hpm-modal{display:flex;flex-direction:column;width:100%;max-width:700px;max-height:92vh;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);color:#1e293b;font-family:'Inter',sans-serif;}
.hpm-modal *{box-sizing:border-box;}
.hpm-modal,.hpm-modal *{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
@supports not (scrollbar-color:auto){
.hpm-modal *::-webkit-scrollbar{width:6px;height:6px;}
.hpm-modal *::-webkit-scrollbar-track{background:transparent;}
.hpm-modal *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
}
.hpm-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;}
.hpm-header-left{display:flex;align-items:center;gap:0.5rem;}
.hpm-header-left i{font-size:1.125rem;color:#3b82f6;}
.hpm-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.hpm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-size:1.125rem;cursor:pointer;transition:background 0.15s,color 0.15s;}
.hpm-close:hover{background:#f1f5f9;color:#475569;}
.hpm-body{flex:1;display:flex;flex-direction:column;gap:0.75rem;padding:1.25rem;overflow-y:auto;background:#f8fafc;}
.hpm-card{display:flex;flex-direction:column;gap:0.75rem;padding:1rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;transition:box-shadow 0.2s ease,border-color 0.2s ease;}
.hpm-flash{animation:hpm-flash 1.2s ease-out;}
@keyframes hpm-flash{0%{box-shadow:0 0 0 3px rgba(233,115,0,0.55);}100%{box-shadow:0 0 0 3px rgba(233,115,0,0);}}
.hpm-card-head{display:flex;align-items:center;gap:0.5rem;}
.hpm-num{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:1.5rem;height:1.5rem;border-radius:9999px;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;}
.hpm-card-name{flex:1;font-size:0.875rem;font-weight:600;color:#1e293b;}
.hpm-icon-btn{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:1.75rem;height:1.75rem;padding:0;border:0;border-radius:9999px;background:transparent;color:#64748b;font-size:1rem;cursor:pointer;transition:background 0.15s,color 0.15s;}
.hpm-icon-btn:hover:not(:disabled){background:#e2e8f0;color:#1e293b;}
.hpm-icon-btn.hpm-danger{color:#ef4444;}
.hpm-icon-btn.hpm-danger:hover:not(:disabled){background:#fef2f2;color:#dc2626;}
.hpm-icon-btn:disabled{opacity:0.3;cursor:not-allowed;}
.hpm-label{display:block;margin-bottom:0.375rem;font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;}
.hpm-row{display:flex;align-items:center;gap:0.625rem;}
.hpm-row-top{align-items:flex-start;}
.hpm-grow{flex:1;min-width:0;}
.hpm-col{display:flex;flex-direction:column;gap:0.5rem;flex:1;min-width:0;}
.hpm-input,.hpm-input-sm{width:100%;min-width:0;background:#f8fafc;border:1px solid #e2e8f0;border-radius:9999px;color:#1e293b;font-family:inherit;outline:none;transition:border-color 0.15s;}
.hpm-input{padding:0.5rem 1rem;font-size:0.875rem;}
.hpm-input-sm{padding:0.375rem 0.875rem;font-size:0.8rem;}
.hpm-input:focus,.hpm-input-sm:focus{border-color:#003B71;}
.hpm-preview{display:block;flex-shrink:0;width:64px;height:64px;object-fit:cover;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:0.5rem;}
.hpm-icon-preview{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:2rem;height:2rem;border:1px solid #e2e8f0;border-radius:9999px;background:#f8fafc;}
.hpm-icon-preview i{font-size:1.0625rem;color:#003B71;}
.hpm-pick{display:inline-flex;align-items:center;gap:0.25rem;flex-shrink:0;align-self:flex-start;padding:0.4375rem 1rem;border:0;border-radius:9999px;background:#003B71;color:#fff;font-family:inherit;font-size:0.75rem;font-weight:600;white-space:nowrap;cursor:pointer;transition:background 0.15s;}
.hpm-pick:hover:not(:disabled){background:#002a52;}
.hpm-pick:disabled{opacity:0.4;cursor:not-allowed;}
.hpm-footer{display:flex;align-items:center;justify-content:flex-end;gap:0.75rem;flex-shrink:0;padding:1rem 1.25rem;background:#fff;border-top:1px solid #f1f5f9;}
.hpm-footer-group{display:flex;gap:0.5rem;margin-right:auto;}
.hpm-btn-cancel{padding:0.5rem 1.25rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;transition:background 0.15s;}
.hpm-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
.hpm-btn-save{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1.25rem;border:0;border-radius:9999px;background:#E97300;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;transition:background 0.15s;}
.hpm-btn-save:hover{background:#c96200;}
.hpm-btn-backup,.hpm-btn-restore{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;border:2px solid #003B71;border-radius:9999px;background:#fff;color:#003B71;font-family:inherit;font-size:0.8125rem;font-weight:600;cursor:pointer;user-select:none;transition:background 0.15s,color 0.15s;}
.hpm-btn-backup:hover{background:#003B71;color:#fff;}
.hpm-btn-restore{border-color:#0d9488;color:#0d9488;}
.hpm-btn-restore:hover{background:#0d9488;color:#fff;}
.hpm-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);}
.hpm-confirm-modal{width:100%;max-width:420px;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;}
.hpm-confirm-header{display:flex;align-items:center;gap:0.625rem;padding:1rem 1.25rem 0.75rem;border-bottom:1px solid #f1f5f9;}
.hpm-confirm-header i{font-size:1.25rem;}
.hpm-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
.hpm-confirm-body{padding:1rem 1.25rem;}
.hpm-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;line-height:1.5;color:#475569;}
.hpm-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;border-radius:9999px;background:#f1f5f9;font-size:0.8rem;font-weight:600;color:#003B71;}
.hpm-confirm-footer{display:flex;justify-content:flex-end;gap:0.625rem;padding:0.75rem 1.25rem 1rem;background:#f8fafc;border-top:1px solid #f1f5f9;}
.hpm-confirm-cancel{padding:0.5rem 1.125rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;}
.hpm-confirm-cancel:hover{background:#f1f5f9;}
.hpm-confirm-ok{padding:0.5rem 1.125rem;border:0;border-radius:9999px;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;}
.icon-picker-overlay{z-index:1000000 !important;}
`;

export function ensureModalStyles() {
    if (document.getElementById("hpm-modal-styles")) return;
    const style = document.createElement("style");
    style.id = "hpm-modal-styles";
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}