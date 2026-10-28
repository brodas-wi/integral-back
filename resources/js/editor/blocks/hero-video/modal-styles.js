const MODAL_CSS = `
.hvm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);}
.hvm-modal{display:flex;flex-direction:column;width:100%;max-width:700px;max-height:92vh;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);color:#1e293b;font-family:'Inter',sans-serif;}
.hvm-modal *{box-sizing:border-box;}
.hvm-modal,.hvm-modal *{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
@supports not (scrollbar-color:auto){
.hvm-modal *::-webkit-scrollbar{width:6px;height:6px;}
.hvm-modal *::-webkit-scrollbar-track{background:transparent;}
.hvm-modal *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
}
.hvm-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;}
.hvm-header-left{display:flex;align-items:center;gap:0.5rem;}
.hvm-header-left i{font-size:1.125rem;color:#3b82f6;}
.hvm-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.hvm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-size:1.125rem;cursor:pointer;transition:background 0.15s,color 0.15s;}
.hvm-close:hover{background:#f1f5f9;color:#475569;}
.hvm-tabs{display:flex;flex-wrap:wrap;gap:0.25rem;flex-shrink:0;padding:0.5rem 1rem;border-bottom:1px solid #e2e8f0;}
.hvm-tab{display:flex;align-items:center;gap:0.375rem;padding:0.4375rem 0.75rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-family:inherit;font-size:0.8125rem;font-weight:500;white-space:nowrap;cursor:pointer;transition:background 0.15s,color 0.15s;}
.hvm-tab i{font-size:1rem;}
.hvm-tab:hover{background:#f1f5f9;}
.hvm-tab.active{background:#e8f0f8;color:#003B71;}
.hvm-body{flex:1;padding:1.25rem;overflow-y:auto;background:#f8fafc;}
.hvm-panel{display:none;flex-direction:column;gap:1rem;}
.hvm-panel.active{display:flex;}
.hvm-card{display:flex;flex-direction:column;gap:0.625rem;padding:1rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;}
.hvm-label{display:block;font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;}
.hvm-hint{margin:0;font-size:0.8rem;line-height:1.5;color:#64748b;}
.hvm-row{display:flex;align-items:center;gap:0.625rem;}
.hvm-grow{flex:1;min-width:0;}
.hvm-input{width:100%;min-width:0;padding:0.5rem 1rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:9999px;color:#1e293b;font-family:inherit;font-size:0.875rem;outline:none;transition:border-color 0.15s;}
.hvm-input:focus{border-color:#3b82f6;}
.hvm-pick{display:flex;align-items:center;gap:0.25rem;flex-shrink:0;padding:0.4375rem 1rem;border:0;border-radius:9999px;background:#003B71;color:#fff;font-family:inherit;font-size:0.75rem;font-weight:600;white-space:nowrap;cursor:pointer;transition:background 0.15s;}
.hvm-pick:hover{background:#002a52;}
.hvm-video-preview{display:block;width:100%;height:140px;object-fit:cover;background:#0a0a0a;border:1px solid #e2e8f0;border-radius:0.5rem;}
.hvm-image-preview{display:block;width:100%;height:100px;object-fit:cover;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:0.5rem;}
.hvm-footer{display:flex;align-items:center;justify-content:flex-end;gap:0.75rem;flex-shrink:0;padding:1rem 1.25rem;background:#fff;border-top:1px solid #f1f5f9;}
.hvm-footer-group{display:flex;gap:0.5rem;margin-right:auto;}
.hvm-btn-cancel{padding:0.5rem 1.25rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;transition:background 0.15s;}
.hvm-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
.hvm-btn-save{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1.25rem;border:0;border-radius:9999px;background:#f0872a;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;transition:background 0.15s;}
.hvm-btn-save:hover{background:#d97821;}
.hvm-btn-backup,.hvm-btn-restore{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;border:2px solid #003B71;border-radius:9999px;background:#fff;color:#003B71;font-family:inherit;font-size:0.8125rem;font-weight:600;cursor:pointer;user-select:none;transition:background 0.15s,color 0.15s;}
.hvm-btn-backup:hover{background:#003B71;color:#fff;}
.hvm-btn-restore{border-color:#0d9488;color:#0d9488;}
.hvm-btn-restore:hover{background:#0d9488;color:#fff;}
.hvm-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);}
.hvm-confirm-modal{width:100%;max-width:420px;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;}
.hvm-confirm-header{display:flex;align-items:center;gap:0.625rem;padding:1rem 1.25rem 0.75rem;border-bottom:1px solid #f1f5f9;}
.hvm-confirm-header i{font-size:1.25rem;}
.hvm-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
.hvm-confirm-body{padding:1rem 1.25rem;}
.hvm-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;line-height:1.5;color:#475569;}
.hvm-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;border-radius:9999px;background:#f1f5f9;font-size:0.8rem;font-weight:600;color:#003B71;}
.hvm-confirm-footer{display:flex;justify-content:flex-end;gap:0.625rem;padding:0.75rem 1.25rem 1rem;background:#f8fafc;border-top:1px solid #f1f5f9;}
.hvm-confirm-cancel{padding:0.5rem 1.125rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;}
.hvm-confirm-cancel:hover{background:#f1f5f9;}
.hvm-confirm-ok{padding:0.5rem 1.125rem;border:0;border-radius:9999px;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;}
`;

export function ensureModalStyles() {
    if (document.getElementById("hvm-modal-styles")) return;
    const style = document.createElement("style");
    style.id = "hvm-modal-styles";
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}