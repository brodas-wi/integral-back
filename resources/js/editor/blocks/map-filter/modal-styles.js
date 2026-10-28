const MODAL_CSS = `
.mpm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);}
.mpm-modal{display:flex;flex-direction:column;width:100%;max-width:560px;max-height:92vh;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);color:#1e293b;font-family:'Inter',sans-serif;}
.mpm-modal *{box-sizing:border-box;}
.mpm-modal,.mpm-modal *{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
@supports not (scrollbar-color:auto){
.mpm-modal *::-webkit-scrollbar{width:6px;height:6px;}
.mpm-modal *::-webkit-scrollbar-track{background:transparent;}
.mpm-modal *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
}
.mpm-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;}
.mpm-header-left{display:flex;align-items:center;gap:0.5rem;}
.mpm-header-left i{font-size:1.125rem;color:#3b82f6;}
.mpm-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.mpm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-size:1.125rem;cursor:pointer;transition:background 0.15s,color 0.15s;}
.mpm-close:hover{background:#f1f5f9;color:#475569;}
.mpm-body{flex:1;display:flex;flex-direction:column;gap:1rem;padding:1.25rem;overflow-y:auto;background:#f8fafc;}
.mpm-card{padding:1rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;}
.mpm-label{display:block;margin-bottom:0.625rem;font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;}
.mpm-hint{margin:0.625rem 0 0;font-size:0.8rem;line-height:1.5;color:#64748b;}
.mpm-input,.mpm-textarea{width:100%;min-width:0;background:#f8fafc;border:1px solid #e2e8f0;color:#1e293b;font-family:inherit;outline:none;transition:border-color 0.15s;}
.mpm-input{padding:0.5rem 1rem;border-radius:9999px;font-size:0.875rem;}
.mpm-textarea{min-height:5rem;padding:0.625rem 0.875rem;border-radius:0.75rem;font-size:0.875rem;resize:vertical;}
.mpm-input:focus,.mpm-textarea:focus{border-color:#3b82f6;}
.mpm-tokens{display:flex;flex-wrap:wrap;gap:0.375rem;margin-top:0.625rem;}
.mpm-token{display:inline-flex;align-items:center;gap:0.25rem;padding:0.3125rem 0.75rem;border:0;border-radius:9999px;background:#e8f0f8;color:#003B71;font-family:inherit;font-size:0.75rem;font-weight:600;cursor:pointer;transition:background 0.15s,color 0.15s;}
.mpm-token:hover{background:#003B71;color:#fff;}
.mpm-footer{display:flex;align-items:center;justify-content:flex-end;gap:0.75rem;flex-shrink:0;padding:1rem 1.25rem;background:#fff;border-top:1px solid #f1f5f9;}
.mpm-btn-cancel{padding:0.5rem 1.25rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;transition:background 0.15s;}
.mpm-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
.mpm-btn-save{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1.25rem;border:0;border-radius:9999px;background:#f0872a;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;transition:background 0.15s;}
.mpm-btn-save:hover{background:#d97821;}
`;

export function ensureModalStyles() {
    if (document.getElementById("mpm-modal-styles")) return;
    const style = document.createElement("style");
    style.id = "mpm-modal-styles";
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}