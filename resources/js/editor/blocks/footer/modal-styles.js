const MODAL_CSS = `
.ftm-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);}
.ftm-modal{display:flex;flex-direction:column;width:100%;max-width:760px;max-height:92vh;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);color:#1e293b;font-family:'Inter',sans-serif;}
.ftm-modal *{box-sizing:border-box;}
.ftm-modal,.ftm-modal *{scrollbar-width:thin;scrollbar-color:#cbd5e1 transparent;}
@supports not (scrollbar-color:auto){
.ftm-modal *::-webkit-scrollbar{width:6px;height:6px;}
.ftm-modal *::-webkit-scrollbar-track{background:transparent;}
.ftm-modal *::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:9999px;}
}
.ftm-header{display:flex;align-items:center;justify-content:space-between;flex-shrink:0;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;}
.ftm-header-left{display:flex;align-items:center;gap:0.5rem;}
.ftm-header-left i{font-size:1.125rem;color:#3b82f6;}
.ftm-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.ftm-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-size:1.125rem;cursor:pointer;transition:background 0.15s,color 0.15s;}
.ftm-close:hover{background:#f1f5f9;color:#475569;}
.ftm-tabs{display:flex;flex-wrap:wrap;gap:0.25rem;flex-shrink:0;padding:0.5rem 1rem;border-bottom:1px solid #e2e8f0;}
.ftm-tab{display:flex;align-items:center;gap:0.375rem;padding:0.4375rem 0.75rem;border:0;border-radius:9999px;background:transparent;color:#94a3b8;font-family:inherit;font-size:0.8125rem;font-weight:500;white-space:nowrap;cursor:pointer;transition:background 0.15s,color 0.15s;}
.ftm-tab i{font-size:1rem;}
.ftm-tab:hover{background:#f1f5f9;}
.ftm-tab.active{background:#e8f0f8;color:#003B71;}
.ftm-body{flex:1;padding:1.25rem;overflow-y:auto;background:#f8fafc;}
.ftm-panel{display:none;flex-direction:column;gap:1rem;}
.ftm-panel.active{display:flex;}
.ftm-card{padding:1rem;background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;}
.ftm-label{display:block;margin-bottom:0.625rem;font-size:0.75rem;font-weight:600;letter-spacing:0.05em;text-transform:uppercase;color:#64748b;}
.ftm-hint{margin:0.625rem 0 0;font-size:0.8rem;line-height:1.5;color:#64748b;}
.ftm-hint-top{margin:0;}
.ftm-row{display:flex;align-items:center;gap:0.625rem;}
.ftm-grow{flex:1;min-width:0;}
.ftm-input,.ftm-input-sm{width:100%;min-width:0;background:#f8fafc;border:1px solid #e2e8f0;color:#1e293b;font-family:inherit;outline:none;transition:border-color 0.15s;}
.ftm-input{padding:0.5rem 1rem;border-radius:9999px;font-size:0.875rem;}
.ftm-input-sm{padding:0.375rem 0.875rem;border-radius:9999px;font-size:0.8rem;}
.ftm-input:focus,.ftm-input-sm:focus{border-color:#3b82f6;}
.ftm-input-sm:disabled{opacity:0.4;cursor:not-allowed;}
.ftm-check{display:flex;align-items:center;gap:0.375rem;flex-shrink:0;font-size:0.75rem;color:#475569;white-space:nowrap;cursor:pointer;}
.ftm-check input{width:1rem;height:1rem;accent-color:#003B71;cursor:pointer;}
.ftm-pick{display:flex;align-items:center;gap:0.25rem;flex-shrink:0;padding:0.4375rem 1rem;border:0;border-radius:9999px;background:#003B71;color:#fff;font-family:inherit;font-size:0.75rem;font-weight:600;white-space:nowrap;cursor:pointer;transition:background 0.15s;}
.ftm-pick:hover{background:#002a52;}
.ftm-img-preview,.ftm-icon-preview{display:flex;align-items:center;justify-content:center;flex-shrink:0;border:1px solid #e2e8f0;background:#f8fafc;color:#94a3b8;}
.ftm-img-preview{width:72px;height:48px;padding:4px;border-radius:0.375rem;}
.ftm-img-preview img{max-width:100%;max-height:100%;object-fit:contain;}
.ftm-icon-preview{width:2rem;height:2rem;border-radius:9999px;}
.ftm-icon-preview i{font-size:1.0625rem;color:#003B71;}
.ftm-list{display:flex;flex-direction:column;gap:0.75rem;}
.ftm-section{background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;}
.ftm-section-head{display:flex;align-items:center;gap:0.5rem;padding:0.625rem 0.875rem;background:#f8fafc;border-bottom:1px solid #f1f5f9;border-radius:0.75rem 0.75rem 0 0;}
.ftm-section-body{display:flex;flex-direction:column;gap:0.75rem;padding:0.875rem;}
.ftm-links{display:flex;flex-direction:column;gap:0.625rem;}
.ftm-link{display:flex;flex-direction:column;gap:0.5rem;padding:0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.625rem;}
.ftm-icon-btn:not(.ftm-danger):hover:not(:disabled){background:#e2e8f0;color:#1e293b;}
.ftm-icon-btn:disabled{opacity:0.3;cursor:not-allowed;}
@keyframes ftm-flash{0%{box-shadow:0 0 0 3px rgba(233,115,0,0.55);}100%{box-shadow:0 0 0 3px rgba(233,115,0,0);}}
.ftm-flash{animation:ftm-flash 1.2s ease-out;}
.ftm-icon-btn{display:flex;align-items:center;justify-content:center;flex-shrink:0;width:1.75rem;height:1.75rem;padding:0;border:0;border-radius:9999px;background:transparent;color:#64748b;font-size:1rem;cursor:pointer;transition:background 0.15s,color 0.15s;}
.ftm-icon-btn.ftm-danger{color:#ef4444;}
.ftm-icon-btn.ftm-danger:hover{background:#fef2f2;color:#dc2626;}
.ftm-btn-add{display:inline-flex;align-items:center;gap:0.375rem;align-self:flex-start;padding:0.4375rem 1rem;border:0;border-radius:9999px;background:#003B71;color:#fff;font-family:inherit;font-size:0.75rem;font-weight:600;cursor:pointer;transition:background 0.15s;}
.ftm-btn-add:hover:not(:disabled){background:#002a52;}
.ftm-btn-add:disabled{opacity:0.4;cursor:not-allowed;}
.ftm-footer{display:flex;align-items:center;justify-content:flex-end;gap:0.75rem;flex-shrink:0;padding:1rem 1.25rem;background:#fff;border-top:1px solid #f1f5f9;}
.ftm-footer-group{display:flex;gap:0.5rem;margin-right:auto;}
.ftm-btn-cancel{padding:0.5rem 1.25rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;transition:background 0.15s;}
.ftm-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
.ftm-btn-save{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1.25rem;border:0;border-radius:9999px;background:#f0872a;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;transition:background 0.15s;}
.ftm-btn-save:hover{background:#d97821;}
.ftm-btn-backup,.ftm-btn-restore{display:inline-flex;align-items:center;gap:0.375rem;padding:0.5rem 1rem;border:2px solid #003B71;border-radius:9999px;background:#fff;color:#003B71;font-family:inherit;font-size:0.8125rem;font-weight:600;cursor:pointer;user-select:none;transition:background 0.15s,color 0.15s;}
.ftm-btn-backup:hover{background:#003B71;color:#fff;}
.ftm-btn-restore{border-color:#0d9488;color:#0d9488;}
.ftm-btn-restore:hover{background:#0d9488;color:#fff;}
.ftm-ac-wrap{position:relative;flex:1;min-width:0;width:100%;}
.ftm-ac-list{display:none;position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;max-height:200px;margin:0;padding:0.25rem;overflow-y:auto;list-style:none;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);}
.ftm-ac-list.ftm-show{display:block;}
.ftm-ac-item{display:flex;flex-direction:column;gap:0.125rem;padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;}
.ftm-ac-item:hover,.ftm-ac-item.ftm-ac-active{background:#f1f5f9;}
.ftm-ac-title{font-size:0.8rem;font-weight:600;color:#1e293b;}
.ftm-ac-slug{font-size:0.7rem;color:#64748b;}
.ftm-ac-list mark{padding:0 1px;border-radius:2px;background:#fef3c7;color:#92400e;}
.ftm-confirm-overlay{position:fixed;inset:0;z-index:999999;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);}
.ftm-confirm-modal{width:100%;max-width:420px;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:0.75rem;box-shadow:0 20px 60px rgba(15,23,42,0.18);font-family:'Inter',sans-serif;}
.ftm-confirm-header{display:flex;align-items:center;gap:0.625rem;padding:1rem 1.25rem 0.75rem;border-bottom:1px solid #f1f5f9;}
.ftm-confirm-header i{font-size:1.25rem;}
.ftm-confirm-header h3{margin:0;font-size:0.9375rem;font-weight:700;color:#0f172a;}
.ftm-confirm-body{padding:1rem 1.25rem;}
.ftm-confirm-body p{margin:0 0 0.5rem;font-size:0.875rem;line-height:1.5;color:#475569;}
.ftm-confirm-filename{display:inline-flex;align-items:center;gap:0.375rem;padding:0.375rem 0.75rem;border-radius:9999px;background:#f1f5f9;font-size:0.8rem;font-weight:600;color:#003B71;}
.ftm-confirm-footer{display:flex;justify-content:flex-end;gap:0.625rem;padding:0.75rem 1.25rem 1rem;background:#f8fafc;border-top:1px solid #f1f5f9;}
.ftm-confirm-cancel{padding:0.5rem 1.125rem;border:2px solid #e2e8f0;border-radius:9999px;background:#fff;color:#475569;font-family:inherit;font-size:0.875rem;font-weight:500;cursor:pointer;}
.ftm-confirm-cancel:hover{background:#f1f5f9;}
.ftm-confirm-ok{padding:0.5rem 1.125rem;border:0;border-radius:9999px;color:#fff;font-family:inherit;font-size:0.875rem;font-weight:600;cursor:pointer;}
.icon-picker-overlay{z-index:1000000 !important;}
`;

export function ensureModalStyles() {
    if (document.getElementById("ftm-modal-styles")) return;
    const style = document.createElement("style");
    style.id = "ftm-modal-styles";
    style.textContent = MODAL_CSS;
    document.head.appendChild(style);
}