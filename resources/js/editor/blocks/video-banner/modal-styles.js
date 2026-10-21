const MODAL_CSS = `
.vb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);}
.vb-modal{display:flex;flex-direction:column;width:100%;max-width:640px;max-height:92vh;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);color:#1e293b;font-family:'Inter',sans-serif;}
.vb-modal *{box-sizing:border-box;}
.vb-modal,.vb-modal *{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
@supports not (scrollbar-color:auto){
.vb-modal *::-webkit-scrollbar{width:6px;height:6px;}
.vb-modal *::-webkit-scrollbar-track{background:transparent;}
.vb-modal *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
}
.vb-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;}
.vb-header-left{display:flex;align-items:center;gap:0.5rem;}
.vb-header-left i{font-size:1.125rem;color:#3b82f6;}
.vb-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.vb-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-size:1.125rem;cursor:pointer;transition:background 0.15s,color 0.15s;}
.vb-close:hover{background:#f1f5f9;color:#475569;}
.vb-body{display:flex;flex:1;flex-direction:column;gap:1rem;padding:1.25rem;overflow-y:auto;background:#f8fafc;}
.vb-card{padding:1rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;}
.vb-label{display:block;margin-bottom:0.625rem;font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;}
.vb-hint{margin:0 0 0.75rem;font-size:0.75rem;color:#94a3b8;}
.vb-stack{display:flex;flex-direction:column;gap:0.5rem;}
.vb-row{display:flex;align-items:center;gap:0.75rem;}
.vb-input{flex:1;width:100%;min-width:0;padding:0.5rem 1rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:9999px;color:#1e293b;font-family:inherit;font-size:0.875rem;outline:none;transition:border-color 0.15s;}
.vb-input:focus{border-color:#3b82f6;}
.vb-pick{display:flex;align-items:center;gap:0.25rem;flex-shrink:0;padding:0.5rem 1rem;border:0;border-radius:9999px;background:#003B71;color:#fff;font-family:inherit;font-size:0.75rem;font-weight:600;white-space:nowrap;cursor:pointer;transition:background 0.15s;}
.vb-pick:hover{background:#002a52;}
.vb-preview{display:block;width:100%;height:110px;object-fit:cover;background:#0a0a0a;border:1px solid #e2e8f0;border-radius:0.375rem;}
.vb-info{display:flex;align-items:flex-start;gap:0.625rem;padding:0.75rem 1rem;background:#eff6ff;border:1px solid #bfdbfe;border-radius:0.5rem;}
.vb-info i{flex-shrink:0;margin-top:0.125rem;font-size:1.125rem;color:#3b82f6;}
.vb-info p{margin:0;font-size:0.8125rem;line-height:1.5;color:#1e40af;}
.vb-toggle-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;}
.vb-toggle-text{display:flex;flex-direction:column;gap:0.125rem;}
.vb-toggle-title{font-size:0.875rem;font-weight:600;color:#1e293b;}
.vb-toggle-desc{font-size:0.75rem;color:#94a3b8;}
.vb-switch{position:relative;flex-shrink:0;width:44px;height:24px;}
.vb-switch input{width:0;height:0;opacity:0;}
.vb-switch-track{position:absolute;inset:0;border-radius:9999px;background:#cbd5e1;cursor:pointer;transition:background 0.2s;}
.vb-switch-track::before{content:"";position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.2);transition:transform 0.2s;}
.vb-switch input:checked+.vb-switch-track{background:#003B71;}
.vb-switch input:checked+.vb-switch-track::before{transform:translateX(20px);}
.vb-footer{display:flex;justify-content:flex-end;gap:0.75rem;flex-shrink:0;padding:1rem 1.25rem;background:#fff;border-top:1px solid #f1f5f9;}
.vb-btn-cancel{padding:0.5rem 1.25rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;transition:background 0.15s;}
.vb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
.vb-btn-save{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1.25rem;border:0;border-radius:9999px;background:#f0872a;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;transition:background 0.15s;}
.vb-btn-save:hover{background:#d97821;}
`;

export function ensureModalStyles() {
    if (document.getElementById("vb-modal-styles")) return;
    const style = document.createElement("style");
    style.id = "vb-modal-styles";
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}