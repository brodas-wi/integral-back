import{i as j,t as B,d as I,f as L,e as q,s as T,g as z,c as F,E as M,j as A,h as N}from"./editor-commands-5w86-EOS.js";import{o as H}from"./media-picker-CiKJ1Agb.js";import"./_commonjsHelpers-CqkleIqs.js";function U(){return j()}const C=`
<style>
.ft-wrapper {
    background-color: #003B71;
    width: 100%;
    font-family: 'Poppins', sans-serif;
}
.ft-inner {
    max-width: 1152px;
    margin: 0 auto;
    padding: 3rem 1.5rem 2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 2.5rem;
    align-items: flex-start;
}
.ft-logo-col {
    flex: 0 0 auto;
    min-width: 140px;
    max-width: 200px;
}
.ft-logo-col img {
    max-width: 100%;
    height: auto;
    display: block;
}
.ft-sections {
    flex: 1 1 0;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    align-items: flex-start;
}
.ft-section {
    min-width: 120px;
    flex: 1 1 120px;
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
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.2s;
}
.ft-links li a:hover {
    color: #ffffff;
    text-decoration: none;
}
.ft-links li span.ft-text {
    color: rgba(255,255,255,0.85);
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}
.ft-links li a i,
.ft-links li span.ft-text i {
    font-size: 1rem;
    flex-shrink: 0;
    color: #E97300;
}
.ft-stripe {
    width: 100%;
    height: 40px;
    background: #E97300;
}
@media (max-width: 768px) {
    .ft-inner {
        gap: 1.5rem;
    }
    .ft-logo-col {
        flex: 0 0 100%;
        max-width: 160px;
    }
}
</style>`;function $(t){const e=t.logo_url?`<img src="${t.logo_url}" alt="${t.logo_alt||"Logo"}">`:'<div style="color:#fff;font-weight:800;font-size:1.25rem;">Logo</div>',o=(t.sections||[]).map((n,l)=>{const h=(n.links||[]).map(u=>{const r=u.icon?`<i class="${u.icon}"></i>`:"",c=u.href||"#";return u.isText?`<li><span class="ft-text">${r}${u.label}</span></li>`:`<li><a href="${c}">${r}${u.label}</a></li>`}).join("");return`
<div class="ft-section" data-section-index="${l}">
    <p class="ft-section-title">${n.title}</p>
    <ul class="ft-links">${h}</ul>
</div>`}).join("");return`
<div class="ft-inner"
    data-gjs-editable="false"
    data-gjs-selectable="false"
    data-gjs-hoverable="false">
    <div class="ft-logo-col"
        data-gjs-editable="false"
        data-gjs-selectable="false">${e}</div>
    <div class="ft-sections"
        data-gjs-editable="false"
        data-gjs-selectable="false">${o}</div>
</div>
<div class="ft-stripe"
    data-gjs-editable="false"
    data-gjs-selectable="false"></div>`}function D(){return function(){}}function _(t,e){const o=document.getElementById("footer-config-modal");if(o&&o.remove(),!document.getElementById("ft-modal-styles")){const i=document.createElement("style");i.id="ft-modal-styles",i.textContent=`
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
                overflow: hidden;
            }
            .ft-section-card-header {
                padding: 0.75rem 1rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                border-bottom: 1px solid #f1f5f9;
                background: #f8fafc;
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
        `,document.head.appendChild(i)}const n=(()=>{try{return JSON.parse(e.getAttributes()["data-footer-config"]||"{}")}catch{return{}}})(),l=n.sections||[{title:"Sección",links:[{label:"Enlace",href:"#",icon:""}]}],h=n.logo_url||"",u=n.logo_alt||"",r=document.createElement("div");r.id="footer-config-modal",r.className="ft-overlay";const c=document.createElement("div");c.className="ft-modal",c.innerHTML=`
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
                        ${h?`<img id="ft-logo-preview" src="${h}" alt="Logo preview" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;">`:'<div id="ft-logo-preview" style="display:none;"></div>'}
                        <input id="ft-logo-url" type="text" placeholder="URL del logo" value="${h}" class="ft-modal-input" style="width:100%;">
                    </div>
                    <button id="ft-logo-pick" type="button" style="flex-shrink:0;padding:0.5rem 0.875rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.8rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;">
                        <i class="ri-image-line"></i> Seleccionar
                    </button>
                    <input id="ft-logo-alt" type="text" placeholder="Texto alternativo" value="${u}" class="ft-modal-input">
                </div>
            </div>

            <div>
                <div class="ft-modal-sections-header">
                    <label class="ft-modal-label" style="margin-bottom:0;">Secciones</label>
                    <button id="ft-add-section" class="ft-btn-add-section">
                        <i class="ri-add-line"></i> Agregar sección
                    </button>
                </div>
                <div id="ft-sections-container" class="ft-sections-container"></div>
            </div>
        </div>

        <div class="ft-modal-footer">
            <button id="ft-modal-cancel" class="ft-btn-cancel">Cancelar</button>
            <button id="ft-modal-save" class="ft-btn-save">Aplicar cambios</button>
        </div>
    `,r.appendChild(c),document.body.appendChild(r);const a=c.querySelector("#ft-sections-container");function b(i,f){const s=document.createElement("div");s.className="ft-section-card",s.dataset.sectionIndex=f;const k=(i.links||[]).map((d,m)=>`
            <div class="ft-link-row" data-link-index="${m}" style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;">
                <input class="ft-modal-input-sm ft-link-icon-input ft-link-icon" type="text"
                    placeholder="ri-phone-line (opcional)" value="${d.icon||""}">
                <input class="ft-modal-input-sm ft-link-label" type="text"
                    placeholder="Texto" value="${d.label||""}">
                <input class="ft-modal-input-sm ft-link-href" type="text"
                    placeholder="URL o tel:0000-0000" value="${d.href||""}"
                    style="${d.isText?"opacity:0.4;pointer-events:none;":""}">
                <label style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:#64748b;white-space:nowrap;cursor:pointer;">
                    <input type="checkbox" class="ft-link-istext" ${d.isText?"checked":""}
                        style="accent-color:#003B71;cursor:pointer;">
                    Solo texto
                </label>
                <button class="ft-btn-remove ft-remove-link">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `).join("");return s.innerHTML=`
            <div class="ft-section-card-header">
                <input class="ft-section-title-input" type="text"
                    placeholder="Título de la sección" value="${i.title||""}">
                <button class="ft-btn-remove ft-remove-section" title="Eliminar sección">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="ft-section-card-body">
                <div class="ft-links-container">${k}</div>
                <button class="ft-btn-add-link">
                    <i class="ri-add-line"></i> Agregar enlace
                </button>
            </div>
        `,s.querySelector(".ft-remove-section").onclick=()=>{l.splice(f,1),g()},s.querySelector(".ft-btn-add-link").onclick=()=>{i.links=i.links||[],i.links.push({label:"Nuevo enlace",href:"#",icon:""}),g()},s.querySelectorAll(".ft-remove-link").forEach(d=>{d.onclick=()=>{const m=parseInt(d.closest(".ft-link-row").dataset.linkIndex);i.links.splice(m,1),g()}}),s.querySelectorAll(".ft-link-istext").forEach(d=>{d.addEventListener("change",()=>{const m=d.closest(".ft-link-row").querySelector(".ft-link-href");d.checked?(m.style.opacity="0.4",m.style.pointerEvents="none",m.value=""):(m.style.opacity="1",m.style.pointerEvents="auto")})}),s}function g(){a.innerHTML="",l.forEach((i,f)=>a.appendChild(b(i,f)))}g(),c.querySelector("#ft-logo-pick").addEventListener("click",()=>{H({type:"image",title:"Seleccionar logo",onSelect:i=>{c.querySelector("#ft-logo-url").value=i;let f=c.querySelector("#ft-logo-preview");if(!f||f.tagName==="DIV"){const s=document.createElement("img");s.id="ft-logo-preview",s.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;",f?.replaceWith(s)??c.querySelector("#ft-logo-url").before(s),f=s}f.src=i,f.style.display="block"}})}),c.querySelector("#ft-add-section").onclick=()=>{l.push({title:"Nueva Sección",links:[]}),g()};function y(){const i=c.querySelector("#ft-logo-url").value.trim(),f=c.querySelector("#ft-logo-alt").value.trim(),s=[];return a.querySelectorAll("[data-section-index]").forEach(k=>{const d=k.querySelector(".ft-section-title-input").value.trim(),m=[];k.querySelectorAll(".ft-link-row").forEach(x=>{const w=x.querySelector(".ft-link-istext")?.checked??!1;m.push({icon:x.querySelector(".ft-link-icon").value.trim(),label:x.querySelector(".ft-link-label").value.trim(),href:w?"":x.querySelector(".ft-link-href").value.trim(),isText:w})}),s.push({title:d,links:m})}),{logo_url:i,logo_alt:f,sections:s}}const p=()=>r.remove();c.querySelector("#ft-modal-close").onclick=p,c.querySelector("#ft-modal-cancel").onclick=p,r.onclick=i=>{i.target===r&&p()},c.querySelector("#ft-modal-save").onclick=()=>{const i=y();e.addAttributes({"data-footer-config":JSON.stringify(i)}),e.components($(i)+C),p()}}function P(t){const e="footer-component";t.DomComponents.addType(e,{isComponent:o=>o.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Footer",tagName:"footer",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,class:"ft-wrapper","data-footer-config":JSON.stringify({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""},{label:"Otros Servicios",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""},{label:"Red de Agencias",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000 - 0000",href:"tel:0000-0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:info@banco.com",icon:"ri-mail-line"},{label:"Dirección",href:"#",icon:"ri-map-pin-line"}]}]})},components:$({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000-0000",href:"tel:0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:",icon:"ri-mail-line"}]}]})+C,script:D(),toolbar:[],traits:[{type:"button",label:"Footer",text:"Administrar Footer",full:!0,command:"open-footer-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-footer-config",{run(o){const n=o.getSelected();n&&_(o,n)}}),t.Commands.add("insert-default-footer",{run(o){o.DomComponents.clear(),o.addComponents({type:e})}}),t.BlockManager.add("footer-block",{label:"Footer",category:"Footer",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="6" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="12" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="12" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="19" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="0" y="26" width="32" height="6" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),G(t,e),O(t)}function G(t,e){t.on("storage:end:load",()=>{setTimeout(()=>S(t,e),800)}),t.on("component:mount",o=>{const n=o.getEl();n?.getAttribute?.("data-gjs-type")===e&&(o.set("type",e),setTimeout(()=>{const l=o.get("script");l&&typeof l=="function"&&l.call(n)},400))}),t.on("canvas:render",()=>{setTimeout(()=>S(t,e),600)})}function S(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(o=>{o.set("type",e);const n=o.getEl();if(n?.isConnected){const l=o.get("script");l&&typeof l=="function"&&l.call(n)}})}function O(t){t.on("load",()=>{const e=t.Canvas.getFrameEl();if(!e)return;const o=e.contentDocument?.head;if(o&&!o.querySelector("#footer-component-css")){const n=document.createElement("style");n.id="footer-component-css",n.textContent=`
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
            `,o.appendChild(n)}})}document.addEventListener("DOMContentLoaded",async()=>{const t=new M;let e=document.getElementById("footer-id")?.value||"",o=document.getElementById("footer-name")?.value||"",n=document.getElementById("footer-load-url")?.value||"",l=document.getElementById("footer-store-url")?.value||"";const h=document.getElementById("footer-is-active")?.value==="1";let u=!!e;const r=U();if(P(r),r.on("load",()=>{B(r),I(),L(),q(r),T(r),z(r),F(r),J(r),setTimeout(()=>{r.runCommand("sw-visibility"),r.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),u&&n)try{await t.loadPageContent(r,n),v("Footer cargado correctamente","success")}catch{v("Error al cargar el footer","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const a=document.getElementById("save-button");a.disabled=!0,a.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!u&&!o?A({title:"Nombre del Footer",description:"Ingresa un nombre descriptivo para identificar este footer.",placeholder:"Ej: Footer Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async b=>{if(!b?.trim()){v("El nombre es obligatorio","error"),a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await c(b)}catch(g){v(g.message,"error")}finally{a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await c(o),a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(b){v(b.message,"error"),a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function c(a){const b=u?"PUT":"POST",g=t.getEditorContent(r),y=await t.savePage(r,{...g,name:a,is_active:h},l,b);if(y.success){if(t.markAsClean(),v(y.message,"success"),!u&&y.footer){e=y.footer.id,o=y.footer.name,u=!0;const p=document.getElementById("footer-id");p&&(p.value=e);const i=document.getElementById("footer-name");i&&(i.value=o);const f=document.querySelector('meta[name="app-url"]'),s=f?f.content:"";l=l.endsWith("/footers")?`${l}/${e}`:`${l.replace(/\/footers\/?$/,"")}/footers/${e}`;const d=document.getElementById("footer-store-url");d&&(d.value=l),n=`${l}/load`;const m=document.getElementById("footer-load-url");m&&(m.value=n);const x=document.getElementById("editor-title");x&&(x.textContent=`Editando Footer: ${o}`);const w=`/footers/${e}/edit`,E=s?`${s}${w}`:w;window.history.replaceState({path:E},"",E)}else if(a){o=a;const p=document.getElementById("footer-name");p&&(p.value=o);const i=document.getElementById("editor-title");i&&(i.textContent=`Editando Footer: ${o}`)}}}});function J(t){t.Commands.add("canvas-clear",{run:e=>{N({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{e.DomComponents.clear(),e.CssComposer.clear()}})}})}function v(t,e="info"){typeof window.showNotification=="function"&&window.showNotification(t,e)}
