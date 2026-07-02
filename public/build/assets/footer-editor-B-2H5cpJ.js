import{i as F,o as U,t as H,d as O,f as R,e as _,s as P,g as J,c as G,E as V,j as W,h as X}from"./editor-commands-Bq37dEX4.js";import"./_commonjsHelpers-CqkleIqs.js";function Q(){return F()}const Y="/bancaintegral",A=`
<style>
.ft-wrapper {
    background-color: #003B71;
    width: 100%;
    font-family: 'Poppins', sans-serif;
}
.ft-inner {
    padding: 3rem 4rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 2.5rem 2rem;
    align-items: flex-start;
}
.ft-logo-col {
    min-width: 0;
}
.ft-logo-col img {
    max-width: 160px;
    width: 100%;
    height: auto;
    display: block;
}
.ft-logo-col .ft-logo-text {
    color: #ffffff;
    font-weight: 800;
    font-size: 1.25rem;
}
.ft-section {
    min-width: 0;
}
.ft-section-title {
    color: #ffffff;
    font-weight: 700;
    font-size: 0.9375rem;
    margin: 0 0 0.875rem;
    padding: 0;
}
.ft-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
.ft-links li a {
    color: #ffffff;
    text-decoration: none;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s;
}
.ft-links li a:hover {
    color: #E97300;
}
.ft-links li span.ft-text {
    color: #ffffff;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.ft-links li a i,
.ft-links li span.ft-text i {
    font-size: 1rem;
    flex-shrink: 0;
    color: #ffffff;
    transition: color 0.2s;
}
.ft-links li a:hover i {
    color: #E97300;
}
.ft-stripe {
    width: 100%;
    height: 40px;
    background: #E97300;
}
@media (max-width: 1280px) {
    .ft-inner { padding: 3rem 2.5rem 2rem; }
}
@media (max-width: 992px) {
    .ft-inner {
        padding: 2.5rem 1.5rem 1.5rem;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 2rem 1.5rem;
    }
}
@media (max-width: 480px) {
    .ft-inner {
        grid-template-columns: 1fr 1fr;
        gap: 1.75rem 1.25rem;
    }
    .ft-logo-col {
        grid-column: 1 / -1;
    }
}
@media (max-width: 320px) {
    .ft-inner { grid-template-columns: 1fr; }
    .ft-logo-col { grid-column: auto; }
}
</style>`;function z(a){const o=a.logo_url?`<img src="${a.logo_url}" alt="${a.logo_alt||"Logo"}">`:'<span class="ft-logo-text">Logo</span>',l=(a.sections||[]).map((c,m)=>{const S=(c.links||[]).map(b=>{const d=b.icon?`<i class="${b.icon}"></i>`:"";return b.isText?`<li><span class="ft-text">${d}${b.label}</span></li>`:`<li><a href="${b.href||"#"}">${d}${b.label}</a></li>`}).join("");return`<div class="ft-section" data-section-index="${m}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><p class="ft-section-title">${c.title}</p><ul class="ft-links">${S}</ul></div>`}).join("");return`<div class="ft-inner" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div class="ft-logo-col" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">${o}</div>${l}</div><div class="ft-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>`}function K(){return function(){}}function N(a,o){const l=document.getElementById("footer-config-modal");if(l&&l.remove(),!document.getElementById("ft-modal-styles")){const e=document.createElement("style");e.id="ft-modal-styles",e.textContent=`
            .ft-overlay {
                position: fixed;
                inset: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(15, 23, 42, 0.45);
                backdrop-filter: blur(3px);
                padding: 1rem;
            }
            .ft-modal {
                background: #ffffff;
                border-radius: 0.75rem;
                width: 100%;
                max-width: 700px;
                max-height: 90vh;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                box-shadow: 0 20px 60px rgba(15,23,42,0.15), 0 4px 16px rgba(15,23,42,0.08);
                font-family: 'Inter', sans-serif;
                color: #1e293b;
                border: 1px solid #e2e8f0;
            }
            .ft-modal-header {
                padding: 1rem 1.25rem;
                border-bottom: 1px solid #f1f5f9;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #ffffff;
                flex-shrink: 0;
            }
            .ft-modal-header-left {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .ft-modal-header-left i {
                font-size: 1.125rem;
                color: #3b82f6;
            }
            .ft-modal-header-left h2 {
                margin: 0;
                font-size: 0.9375rem;
                font-weight: 600;
                color: #0f172a;
            }
            .ft-modal-close {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 2rem;
                height: 2rem;
                border-radius: 0.375rem;
                border: none;
                background: transparent;
                color: #94a3b8;
                cursor: pointer;
                transition: background 0.15s, color 0.15s;
            }
            .ft-modal-close:hover {
                background: #f1f5f9;
                color: #475569;
            }
            .ft-modal-close i {
                font-size: 1.125rem;
            }
            .ft-modal-body {
                flex: 1;
                overflow-y: auto;
                padding: 1.25rem;
                display: flex;
                flex-direction: column;
                gap: 1.25rem;
                background: #f8fafc;
            }
            .ft-modal-body::-webkit-scrollbar { width: 5px; }
            .ft-modal-body::-webkit-scrollbar-track { background: transparent; }
            .ft-modal-body::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 3px; }
            .ft-modal-section-box {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 0.625rem;
                padding: 1rem;
            }
            .ft-modal-label {
                display: block;
                font-size: 0.75rem;
                font-weight: 600;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 0.625rem;
            }
            .ft-modal-row {
                display: flex;
                gap: 0.75rem;
            }
            .ft-modal-sections-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.75rem;
            }
            .ft-modal-input {
                flex: 1;
                padding: 0.5rem 0.75rem;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 0.5rem;
                color: #1e293b;
                font-size: 0.875rem;
                outline: none;
                font-family: inherit;
                transition: border-color 0.15s;
            }
            .ft-modal-input:focus {
                border-color: #3b82f6;
            }
            .ft-modal-input-sm {
                padding: 0.375rem 0.625rem;
                background: #f8fafc;
                border: 1px solid #e2e8f0;
                border-radius: 0.375rem;
                color: #1e293b;
                font-size: 0.8rem;
                outline: none;
                font-family: inherit;
                transition: border-color 0.15s;
            }
            .ft-modal-input-sm:focus {
                border-color: #3b82f6;
            }
            .ft-drag-handle{cursor:grab;color:#94a3b8;display:flex;align-items:center;padding:0 0.125rem;flex-shrink:0;}
            .ft-drag-handle:hover{color:#475569;}
            .ft-drag-handle:active{cursor:grabbing;}
            .ft-section-card.ft-dragging{opacity:0.4;}
            .ft-section-card.ft-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
            .ft-btn-add-section {
                padding: 0.375rem 0.75rem;
                background: #003B71;
                border: none;
                border-radius: 0.5rem;
                color: #fff;
                font-size: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.375rem;
                font-family: inherit;
                transition: background 0.15s;
            }
            .ft-btn-add-section:hover { background: #002a52; }
            .ft-sections-container {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }
            .ft-section-card {
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 0.625rem;
                overflow: visible;
            }
            .ft-section-card-header {
                padding: 0.75rem 1rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                border-bottom: 1px solid #f1f5f9;
                background: #f8fafc;
                border-radius: 0.625rem 0.625rem 0 0;
            }
            .ft-section-title-input {
                flex: 1;
                padding: 0.375rem 0.625rem;
                background: #ffffff;
                border: 1px solid #e2e8f0;
                border-radius: 0.375rem;
                color: #1e293b;
                font-size: 0.875rem;
                font-weight: 600;
                outline: none;
                font-family: inherit;
                transition: border-color 0.15s;
            }
            .ft-section-title-input:focus { border-color: #3b82f6; }
            .ft-section-card-body { padding: 0.75rem 1rem; }
            .ft-link-row {
                display: flex;
                gap: 0.5rem;
                align-items: center;
                margin-bottom: 0.5rem;
            }
            .ft-link-icon-input {
                width: 150px;
                flex-shrink: 0;
            }
            .ft-link-row {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding-bottom: 0.75rem;
                margin-bottom: 0.75rem;
                border-bottom: 1px solid #f1f5f9;
            }
            .ft-link-row:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
            .ft-link-row-top {
                display: flex;
                gap: 0.5rem;
                align-items: center;
            }
            .ft-link-row-top .ft-link-label {
                flex: 1;
                min-width: 0;
            }
            .ft-link-row-bottom {
                display: flex;
                gap: 0.625rem;
                align-items: center;
                flex-wrap: wrap;
            }
            .ft-link-href-wrap {
                flex: 1;
                min-width: 160px;
                position: relative;
            }
            .ft-link-istext-label {
                display: flex;
                align-items: center;
                gap: 0.25rem;
                font-size: 0.75rem;
                color: #64748b;
                white-space: nowrap;
                cursor: pointer;
                flex-shrink: 0;
            }
            .ft-btn-remove {
                background: none;
                border: none;
                cursor: pointer;
                color: #ef4444;
                padding: 0.25rem;
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 0.25rem;
                transition: background 0.15s;
            }
            .ft-btn-remove:hover { background: #fef2f2; }
            .ft-btn-add-link {
                margin-top: 0.5rem;
                padding: 0.375rem 0.75rem;
                background: #0d3f6a;
                border: none;
                border-radius: 0.375rem;
                color: #fff;
                font-size: 0.75rem;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 0.375rem;
                font-family: inherit;
                transition: background 0.15s;
            }
            .ft-btn-add-link:hover { background: #003B71; }
            .ft-modal-footer {
                padding: 1rem 1.25rem;
                border-top: 1px solid #f1f5f9;
                display: flex;
                gap: 0.75rem;
                justify-content: flex-end;
                background: #ffffff;
                flex-shrink: 0;
            }
            .ft-btn-cancel {
                padding: 0.5rem 1.25rem;
                background: #ffffff;
                border: 2px solid #e2e8f0;
                border-radius: 0.5rem;
                color: #475569;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                font-family: inherit;
                transition: background 0.15s, border-color 0.15s;
            }
            .ft-btn-cancel:hover { background: #f8fafc; border-color: #cbd5e1; }
            .ft-btn-save {
                padding: 0.5rem 1.25rem;
                background: #f0872a;
                border: none;
                border-radius: 0.5rem;
                color: #fff;
                font-size: 0.875rem;
                font-weight: 600;
                cursor: pointer;
                font-family: inherit;
                transition: background 0.15s;
            }
            .ft-btn-save:hover { background: #d97821; }
            .ft-btn-backup {
                padding: 0.5rem 1rem;
                background: #ffffff;
                border: 2px solid #003B71;
                border-radius: 0.5rem;
                color: #003B71;
                font-size: 0.8125rem;
                font-weight: 600;
                cursor: pointer;
                font-family: inherit;
                display: inline-flex;
                align-items: center;
                gap: 0.375rem;
                transition: background 0.15s, color 0.15s;
            }
            .ft-btn-backup:hover { background: #003B71; color: #fff; }
            .ft-btn-restore {
                padding: 0.5rem 1rem;
                background: #ffffff;
                border: 2px solid #0d9488;
                border-radius: 0.5rem;
                color: #0d9488;
                font-size: 0.8125rem;
                font-weight: 600;
                font-family: inherit;
                display: inline-flex;
                align-items: center;
                gap: 0.375rem;
                transition: background 0.15s, color 0.15s;
                user-select: none;
            }
            .ft-btn-restore:hover { background: #0d9488; color: #fff; }
            .ft-confirm-overlay {
                position: fixed; inset: 0; z-index: 999999;
                display: flex; align-items: center; justify-content: center;
                background: rgba(15,23,42,0.55); backdrop-filter: blur(4px); padding: 1rem;
            }
            .ft-confirm-modal {
                background: #fff; border-radius: 0.75rem; width: 100%; max-width: 420px;
                box-shadow: 0 20px 60px rgba(15,23,42,0.18); font-family: 'Inter', sans-serif;
                overflow: hidden; border: 1px solid #e2e8f0;
            }
            .ft-confirm-header { padding: 1rem 1.25rem 0.75rem; display: flex; align-items: center; gap: 0.625rem; border-bottom: 1px solid #f1f5f9; }
            .ft-confirm-header i { font-size: 1.25rem; color: #E97300; }
            .ft-confirm-header h3 { margin: 0; font-size: 0.9375rem; font-weight: 700; color: #0f172a; }
            .ft-confirm-body { padding: 1rem 1.25rem; }
            .ft-confirm-body p { margin: 0 0 0.5rem; font-size: 0.875rem; color: #475569; line-height: 1.5; }
            .ft-confirm-filename {
                display: inline-flex; align-items: center; gap: 0.375rem;
                padding: 0.375rem 0.75rem; background: #f1f5f9; border-radius: 0.375rem;
                font-size: 0.8rem; font-weight: 600; color: #003B71; margin-top: 0.25rem;
            }
            .ft-confirm-footer { padding: 0.75rem 1.25rem 1rem; display: flex; gap: 0.625rem; justify-content: flex-end; background: #f8fafc; border-top: 1px solid #f1f5f9; }
            .ft-confirm-cancel {
                padding: 0.5rem 1.125rem; background: #fff; border: 2px solid #e2e8f0; border-radius: 0.5rem;
                color: #475569; font-size: 0.875rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: background 0.15s;
            }
            .ft-confirm-cancel:hover { background: #f1f5f9; }
            .ft-confirm-ok {
                padding: 0.5rem 1.125rem; background: #E97300; border: none; border-radius: 0.5rem;
                color: #fff; font-size: 0.875rem; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s;
            }
            .ft-confirm-ok:hover { background: #d97821; }
        `,document.head.appendChild(e)}const c=(()=>{try{return JSON.parse(o.getAttributes()["data-footer-config"]||"{}")}catch{return{}}})(),m=c.sections||[{title:"Sección",links:[{label:"Enlace",href:"#",icon:""}]}],S=c.logo_url||"",b=c.logo_alt||"",d=document.createElement("div");d.id="footer-config-modal",d.className="ft-overlay";const u=document.createElement("div");u.className="ft-modal",u.innerHTML=`
        <div class="ft-modal-header">
            <div class="ft-modal-header-left">
                <i class="ri-layout-bottom-line"></i>
                <h2>Configurar Footer</h2>
            </div>
            <button id="ft-modal-close" class="ft-modal-close">
                <i class="ri-close-line"></i>
            </button>
        </div>

        <div class="ft-modal-body">
            <div class="ft-modal-section-box">
                <label class="ft-modal-label">Logo</label>
                <div class="ft-modal-row" style="align-items:center;">
                    <div style="flex:1;position:relative;">
                        ${S?`<img id="ft-logo-preview" src="${S}" alt="Logo preview" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;">`:'<div id="ft-logo-preview" style="display:none;"></div>'}
                        <input id="ft-logo-url" type="text" placeholder="URL del logo" value="${S}" class="ft-modal-input" style="width:100%;">
                    </div>
                    <button id="ft-logo-pick" type="button" style="flex-shrink:0;padding:0.5rem 0.875rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.8rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;">
                        <i class="ri-image-line"></i> Seleccionar
                    </button>
                    <input id="ft-logo-alt" type="text" placeholder="Texto alternativo" value="${b}" class="ft-modal-input">
                </div>
            </div>

            <div>
                <label class="ft-modal-label">Secciones</label>
                <div id="ft-sections-container" class="ft-sections-container"></div>
                <div style="padding-top:0.5rem;">
                    <button id="ft-add-section" class="ft-btn-add-section">
                        <i class="ri-add-line"></i> Agregar sección
                    </button>
                </div>
            </div>
        </div>

        <div class="ft-modal-footer">
            <button id="ft-modal-cancel" class="ft-btn-cancel">Cancelar</button>
            <div style="display:flex;gap:0.5rem;margin-right:auto;">
                <button id="ft-modal-backup" class="ft-btn-backup" title="Descargar configuración como JSON"><i class="ri-download-2-line"></i> Respaldar</button>
                <label id="ft-modal-restore-label" class="ft-btn-restore" title="Restaurar configuración desde JSON" style="cursor:pointer;"><i class="ri-upload-2-line"></i> Restaurar<input id="ft-modal-restore-input" type="file" accept=".json,application/json" style="display:none;"></label>
            </div>
            <button id="ft-modal-save" class="ft-btn-save">Aplicar cambios</button>
        </div>
    `,d.appendChild(u),document.body.appendChild(d);const f=u.querySelector("#ft-sections-container"),I=`${document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??""}/api/pages/search`;function C(e){if(e.dataset.autocompleteAttached)return;e.dataset.autocompleteAttached="true";const s=e.parentNode,i=s.style.position;(!i||i==="static")&&(s.style.position="relative");const n=document.createElement("ul");n.style.cssText=`
            position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;
            background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;
            box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;
            max-height:200px;overflow-y:auto;display:none;
        `,s.appendChild(n);let t=null,r="";async function p(g){if(g.length<1){n.style.display="none";return}try{const h=await(await fetch(`${I}?q=${encodeURIComponent(g)}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json();q(h,g)}catch{n.style.display="none"}}function q(g,v){if(n.innerHTML="",!g.length){n.style.display="none";return}g.forEach(h=>{const x=document.createElement("li");x.style.cssText="padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;",x.innerHTML=`
                    <span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${D(h.title,v)}</span>
                    <span style="font-size:0.7rem;color:#64748b;">/${h.slug}</span>`,x.addEventListener("mouseenter",()=>x.style.background="#f1f5f9"),x.addEventListener("mouseleave",()=>x.style.background=""),x.addEventListener("mousedown",w=>{w.preventDefault(),e.value=`${Y}/${h.slug}`,e.dispatchEvent(new Event("input")),n.style.display="none"}),n.appendChild(x)}),n.style.display="block"}function D(g,v){return v?g.replace(new RegExp(`(${v.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi"),'<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>'):g}e.addEventListener("input",()=>{clearTimeout(t),r=e.value.trim(),t=setTimeout(()=>p(r),220)}),e.addEventListener("focus",()=>{e.select(),r=e.value.trim(),r&&p(r)}),e.addEventListener("blur",()=>{setTimeout(()=>{n.style.display="none"},150)}),e.addEventListener("keydown",g=>{if(n.style.display==="none")return;const v=n.querySelectorAll("li"),h=n.querySelector("li.ft-ac-active");let x=Array.from(v).indexOf(h);if(g.key==="ArrowDown"){g.preventDefault(),h&&h.classList.remove("ft-ac-active");const w=v[x+1]||v[0];w?.classList.add("ft-ac-active"),w&&(w.style.background="#f1f5f9")}else if(g.key==="ArrowUp"){g.preventDefault(),h&&h.classList.remove("ft-ac-active");const w=v[x-1]||v[v.length-1];w?.classList.add("ft-ac-active"),w&&(w.style.background="#f1f5f9")}else g.key==="Enter"&&h?(g.preventDefault(),h.dispatchEvent(new MouseEvent("mousedown"))):g.key==="Escape"&&(n.style.display="none")})}function $(e,s,i){let n=null;e.querySelectorAll("[data-drag-idx]").forEach(t=>{t.setAttribute("draggable","true"),t.addEventListener("dragstart",r=>{n=parseInt(t.dataset.dragIdx),setTimeout(()=>t.classList.add("ft-dragging"),0),r.dataTransfer.effectAllowed="move"}),t.addEventListener("dragend",()=>{t.classList.remove("ft-dragging"),e.querySelectorAll(".ft-drag-over").forEach(r=>r.classList.remove("ft-drag-over"))}),t.addEventListener("dragover",r=>{r.preventDefault(),r.dataTransfer.dropEffect="move",parseInt(t.dataset.dragIdx)!==n&&t.classList.add("ft-drag-over")}),t.addEventListener("dragleave",()=>t.classList.remove("ft-drag-over")),t.addEventListener("drop",r=>{r.preventDefault();const p=parseInt(t.dataset.dragIdx);if(n!==null&&p!==n){y();const[q]=s.splice(n,1);s.splice(p,0,q),i()}n=null})})}function y(){f.querySelectorAll("[data-section-index]").forEach((e,s)=>{const i=m[s];if(!i)return;const n=e.querySelector(".ft-section-title-input");n&&(i.title=n.value);const t=[];e.querySelectorAll(".ft-link-row").forEach(r=>{const p=r.querySelector(".ft-link-istext")?.checked??!1;t.push({icon:r.querySelector(".ft-link-icon")?.value??"",label:r.querySelector(".ft-link-label")?.value??"",href:p?"":r.querySelector(".ft-link-href")?.value??"",isText:p})}),i.links=t})}function T(e,s){const i=document.createElement("div");i.className="ft-section-card",i.dataset.sectionIndex=s,i.dataset.dragIdx=s;const n=(e.links||[]).map((t,r)=>`
        <div class="ft-link-row" data-link-index="${r}">
            <div class="ft-link-row-top">
                <input class="ft-modal-input-sm ft-link-icon-input ft-link-icon" type="text"
                    placeholder="ri-phone-line (opcional)" value="${t.icon||""}">
                <input class="ft-modal-input-sm ft-link-label" type="text"
                    placeholder="Texto del enlace" value="${t.label||""}">
                <button class="ft-btn-remove ft-remove-link" title="Eliminar enlace">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="ft-link-row-bottom">
                <div class="ft-link-href-wrap">
                    <input class="ft-modal-input-sm ft-link-href" type="text"
                        placeholder="URL o buscar página..." value="${t.href||""}"
                        style="width:100%;box-sizing:border-box;${t.isText?"opacity:0.4;pointer-events:none;":""}">
                </div>
                <label class="ft-link-istext-label">
                    <input type="checkbox" class="ft-link-istext" ${t.isText?"checked":""}
                        style="accent-color:#003B71;cursor:pointer;">
                    Solo texto
                </label>
            </div>
        </div>
    `).join("");return i.innerHTML=`
            <div class="ft-section-card-header">
                <span class="ft-drag-handle"><i class="ri-draggable"></i></span>
                <input class="ft-section-title-input" type="text"
                    placeholder="Título de la sección" value="${e.title||""}">
                <button class="ft-btn-remove ft-remove-section" title="Eliminar sección">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="ft-section-card-body">
                <div class="ft-links-container">${n}</div>
                <button class="ft-btn-add-link">
                    <i class="ri-add-line"></i> Agregar enlace
                </button>
            </div>
        `,i.querySelector(".ft-remove-section").onclick=()=>{y(),m.splice(s,1),k()},i.querySelector(".ft-btn-add-link").onclick=()=>{y(),e.links=e.links||[],e.links.push({label:"Nuevo enlace",href:"#",icon:""}),k()},i.querySelectorAll(".ft-remove-link").forEach(t=>{t.onclick=()=>{y();const r=parseInt(t.closest(".ft-link-row").dataset.linkIndex);e.links.splice(r,1),k()}}),i.querySelectorAll(".ft-link-href").forEach(t=>{t.closest("[style*='pointer-events:none']")||C(t)}),i.querySelectorAll(".ft-link-istext").forEach(t=>{t.addEventListener("change",()=>{const r=t.closest(".ft-link-row").querySelector(".ft-link-href");t.checked?(r.style.opacity="0.4",r.style.pointerEvents="none",r.value=""):(r.style.opacity="1",r.style.pointerEvents="auto")})}),i}function k(){f.innerHTML="",m.forEach((e,s)=>f.appendChild(T(e,s))),$(f,m,k)}k(),u.querySelector("#ft-logo-pick").addEventListener("click",()=>{U({type:"image",title:"Seleccionar logo",onSelect:e=>{u.querySelector("#ft-logo-url").value=e;let s=u.querySelector("#ft-logo-preview");if(!s||s.tagName==="DIV"){const i=document.createElement("img");i.id="ft-logo-preview",i.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;",s?.replaceWith(i)??u.querySelector("#ft-logo-url").before(i),s=i}s.src=e,s.style.display="block"}})}),u.querySelector("#ft-add-section").onclick=()=>{y(),m.push({title:"Nueva Sección",links:[]}),k(),f.lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})};function B(){const e=u.querySelector("#ft-logo-url").value.trim(),s=u.querySelector("#ft-logo-alt").value.trim(),i=[];return f.querySelectorAll("[data-section-index]").forEach(n=>{const t=n.querySelector(".ft-section-title-input").value.trim(),r=[];n.querySelectorAll(".ft-link-row").forEach(p=>{const q=p.querySelector(".ft-link-istext")?.checked??!1;r.push({icon:p.querySelector(".ft-link-icon").value.trim(),label:p.querySelector(".ft-link-label").value.trim(),href:q?"":p.querySelector(".ft-link-href").value.trim(),isText:q})}),i.push({title:t,links:r})}),{logo_url:e,logo_alt:s,sections:i}}u.querySelector("#ft-modal-backup").onclick=()=>{y();const e=B(),s=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}),i=URL.createObjectURL(s),n=new Date().toISOString().replace(/[:.]/g,"-").slice(0,19),t=document.createElement("a");t.href=i,t.download=`footer-backup-${n}.json`,document.body.appendChild(t),t.click(),t.remove(),URL.revokeObjectURL(i)},u.querySelector("#ft-modal-restore-input").onchange=e=>{const s=e.target.files?.[0];if(!s)return;const i=new FileReader;i.onload=n=>{let t;try{t=JSON.parse(n.target.result)}catch{const p=document.createElement("div");p.className="ft-confirm-overlay",p.innerHTML='<div class="ft-confirm-modal"><div class="ft-confirm-header"><i class="ri-error-warning-line" style="color:#ef4444;"></i><h3>Archivo inválido</h3></div><div class="ft-confirm-body"><p>El archivo seleccionado no es un JSON válido.</p></div><div class="ft-confirm-footer"><button class="ft-confirm-ok" style="background:#ef4444;">Cerrar</button></div></div>',document.body.appendChild(p),p.querySelector(".ft-confirm-ok").onclick=()=>p.remove(),e.target.value="";return}const r=document.createElement("div");r.className="ft-confirm-overlay",r.innerHTML=`
                <div class="ft-confirm-modal">
                    <div class="ft-confirm-header">
                        <i class="ri-refresh-line"></i>
                        <h3>Restaurar configuración</h3>
                    </div>
                    <div class="ft-confirm-body">
                        <p>¿Deseas restaurar la configuración del footer desde el archivo de respaldo?</p>
                        <p>Esta acción reemplazará la configuración actual del formulario.</p>
                        <span class="ft-confirm-filename"><i class="ri-file-code-line"></i>${s.name}</span>
                    </div>
                    <div class="ft-confirm-footer">
                        <button class="ft-confirm-cancel">Cancelar</button>
                        <button class="ft-confirm-ok"><i class="ri-check-line"></i> Sí, restaurar</button>
                    </div>
                </div>`,document.body.appendChild(r),r.querySelector(".ft-confirm-cancel").onclick=()=>{r.remove(),e.target.value=""},r.querySelector(".ft-confirm-ok").onclick=()=>{r.remove(),e.target.value="",o.addAttributes({"data-footer-config":JSON.stringify(t)}),o.components(z(t)+A),E(),N(a,o)}},i.readAsText(s)};const E=()=>d.remove();u.querySelector("#ft-modal-close").onclick=E,u.querySelector("#ft-modal-cancel").onclick=E,d.onclick=e=>{e.target===d&&E()},u.querySelector("#ft-modal-save").onclick=()=>{const e=B();o.addAttributes({"data-footer-config":JSON.stringify(e)}),o.components(z(e)+A),E()}}function Z(a){const o="footer-component";a.DomComponents.addType(o,{isComponent:l=>l.getAttribute?.("data-gjs-type")===o?{type:o}:!1,model:{defaults:{name:"Footer",tagName:"footer",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":o,class:"ft-wrapper","data-footer-config":JSON.stringify({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""},{label:"Otros Servicios",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""},{label:"Red de Agencias",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000 - 0000",href:"tel:0000-0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:info@banco.com",icon:"ri-mail-line"},{label:"Dirección",href:"#",icon:"ri-map-pin-line"}]}]})},components:z({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000-0000",href:"tel:0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:",icon:"ri-mail-line"}]}]})+A,script:K(),toolbar:[],traits:[{type:"button",label:"Footer",text:"Administrar Footer",full:!0,command:"open-footer-config"}]},init(){this.set("type",o),this.addAttributes({"data-gjs-type":o})}}}),a.Commands.add("open-footer-config",{run(l){const c=l.getSelected();c&&N(l,c)}}),a.Commands.add("insert-default-footer",{run(l){l.DomComponents.clear(),l.addComponents({type:o})}}),a.BlockManager.add("footer-block",{label:"Footer",category:"Footer",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="6" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="12" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="12" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="19" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="0" y="26" width="32" height="6" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:o,attributes:{"data-gjs-type":o}}}),ee(a,o),te(a)}function ee(a,o){a.on("storage:end:load",()=>{setTimeout(()=>M(a,o),800)}),a.on("component:mount",l=>{const c=l.getEl();c?.getAttribute?.("data-gjs-type")===o&&(l.set("type",o),setTimeout(()=>{const m=l.get("script");m&&typeof m=="function"&&m.call(c)},400))}),a.on("canvas:render",()=>{setTimeout(()=>M(a,o),600)})}function M(a,o){a.getWrapper().find(`[data-gjs-type="${o}"]`).forEach(l=>{l.set("type",o);const c=l.getEl();if(c?.isConnected){const m=l.get("script");m&&typeof m=="function"&&m.call(c)}})}function te(a){a.on("load",()=>{const o=a.Canvas.getFrameEl();if(!o)return;const l=o.contentDocument?.head;if(l&&!l.querySelector("#footer-component-css")){const c=document.createElement("style");c.id="footer-component-css",c.textContent=`
                [data-gjs-type="footer-component"] {
                    outline: 2px dashed rgba(240,135,42,0.4);
                    outline-offset: 2px;
                }
                .ft-links {
                    display: flex !important;
                    padding: 0 !important;
                }
                .ft-section-toggle {
                    display: none !important;
                }
                .ft-section-title {
                    display: block !important;
                }
            `,l.appendChild(c)}})}document.addEventListener("DOMContentLoaded",async()=>{const a=new V;let o=document.getElementById("footer-id")?.value||"",l=document.getElementById("footer-name")?.value||"",c=document.getElementById("footer-load-url")?.value||"",m=document.getElementById("footer-store-url")?.value||"";const S=document.getElementById("footer-is-active")?.value==="1";let b=!!o;const d=Q();if(Z(d),d.on("load",()=>{H(d),O(),R(),_(d),P(d),J(d),G(d),oe(d),setTimeout(()=>{d.runCommand("sw-visibility"),d.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),b&&c)try{await a.loadPageContent(d,c),j("Footer cargado correctamente","success")}catch{j("Error al cargar el footer","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const f=document.getElementById("save-button");f.disabled=!0,f.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!b&&!l?W({title:"Nombre del Footer",description:"Ingresa un nombre descriptivo para identificar este footer.",placeholder:"Ej: Footer Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async L=>{if(!L?.trim()){j("El nombre es obligatorio","error"),f.disabled=!1,f.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await u(L)}catch(I){j(I.message,"error")}finally{f.disabled=!1,f.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{f.disabled=!1,f.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await u(l),f.disabled=!1,f.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(L){j(L.message,"error"),f.disabled=!1,f.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function u(f){const L=b?"PUT":"POST",I=a.getEditorContent(d),C=await a.savePage(d,{...I,name:f,is_active:S},m,L);if(C.success){if(a.markAsClean(),j(C.message,"success"),!b&&C.footer){o=C.footer.id,l=C.footer.name,b=!0;const $=document.getElementById("footer-id");$&&($.value=o);const y=document.getElementById("footer-name");y&&(y.value=l);const T=document.querySelector('meta[name="app-url"]'),k=T?T.content:"";m=m.endsWith("/footers")?`${m}/${o}`:`${m.replace(/\/footers\/?$/,"")}/footers/${o}`;const E=document.getElementById("footer-store-url");E&&(E.value=m),c=`${m}/load`;const e=document.getElementById("footer-load-url");e&&(e.value=c);const s=document.getElementById("editor-title");s&&(s.textContent=`Editando Footer: ${l}`);const i=`/footers/${o}/edit`,n=k?`${k}${i}`:i;window.history.replaceState({path:n},"",n)}else if(f){l=f;const $=document.getElementById("footer-name");$&&($.value=l);const y=document.getElementById("editor-title");y&&(y.textContent=`Editando Footer: ${l}`)}}}});function oe(a){a.Commands.add("canvas-clear",{run:o=>{X({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{o.DomComponents.clear(),o.CssComposer.clear()}})}})}function j(a,o="info"){typeof window.showNotification=="function"&&window.showNotification(a,o)}
