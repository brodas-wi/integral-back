import{i as z,t as T,d as q,f as L,e as F,s as $,g as A,c as B,E as I}from"./editor-commands-DS9nLj-b.js";import"./_commonjsHelpers-CqkleIqs.js";function H(){return z()}const S=`
<style>
.ft-wrapper {
    background-color: #003B71;
    width: 100%;
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
    justify-content: flex-end;
}
.ft-section {
    min-width: 120px;
    max-width: 200px;
    flex: 1 1 120px;
}
.ft-section-title {
    color: #ffffff;
    font-weight: 700;
    font-size: 0.9375rem;
    margin: 0 0 0.875rem;
    padding: 0;
}
.ft-section-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    width: 100%;
    text-align: left;
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
.ft-links li a,
.ft-links li span {
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
.ft-links li a i,
.ft-links li span i {
    font-size: 1rem;
    flex-shrink: 0;
    color: #E97300;
}
.ft-stripe {
    width: 100%;
    height: 20px;
    background: #E97300;
}
@media (max-width: 768px) {
    .ft-inner {
        flex-direction: column;
        gap: 1.5rem;
    }
    .ft-logo-col {
        max-width: 160px;
    }
    .ft-sections {
        flex-direction: column;
        gap: 0;
        width: 100%;
        justify-content: flex-start;
    }
    .ft-section {
        max-width: 100%;
        width: 100%;
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 0.75rem;
    }
    .ft-section-title {
        display: none;
    }
    .ft-section-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ffffff;
        font-weight: 700;
        font-size: 0.9375rem;
        margin-bottom: 0;
    }
    .ft-section-toggle i {
        color: rgba(255,255,255,0.6);
        transition: transform 0.2s;
    }
    .ft-section.ft-open .ft-section-toggle i {
        transform: rotate(180deg);
    }
    .ft-links {
        display: none;
        padding: 0.75rem 0;
    }
    .ft-section.ft-open .ft-links {
        display: flex;
    }
}
</style>`;function E(o){const e=o.logo_url?`<img src="${o.logo_url}" alt="${o.logo_alt||"Logo"}">`:'<div style="color:#fff;font-weight:800;font-size:1.25rem;">Logo</div>',t=(o.sections||[]).map((i,l)=>{const d=(i.links||[]).map(s=>{const n=s.icon?`<i class="${s.icon}"></i>`:"";return`<li><a href="${s.href||"#"}">${n}${s.label}</a></li>`}).join("");return`
<div class="ft-section" data-section-index="${l}">
    <p class="ft-section-title">${i.title}</p>
    <button class="ft-section-toggle" type="button" aria-expanded="false">
        <span>${i.title}</span>
        <i class="ri-arrow-down-s-line"></i>
    </button>
    <ul class="ft-links">${d}</ul>
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
        data-gjs-selectable="false">${t}</div>
</div>
<div class="ft-stripe"
    data-gjs-editable="false"
    data-gjs-selectable="false"></div>`}function M(){return function(){this.querySelectorAll(".ft-section-toggle").forEach(e=>{e.addEventListener("click",()=>{const t=e.closest(".ft-section");t.classList.toggle("ft-open"),e.setAttribute("aria-expanded",t.classList.contains("ft-open"))})})}}function N(o,e){const t=document.getElementById("footer-config-modal");t&&t.remove();const i=(()=>{try{return JSON.parse(e.getAttributes()["data-footer-config"]||"{}")}catch{return{}}})(),l=i.sections||[{title:"Sección",links:[{label:"Enlace",href:"#",icon:""}]}],d=i.logo_url||"",s=i.logo_alt||"",n=document.createElement("div");n.id="footer-config-modal",n.style.cssText=`
        position:fixed;inset:0;z-index:99999;
        display:flex;align-items:center;justify-content:center;
        background:rgba(0,0,0,0.6);padding:1rem;
    `;const r=document.createElement("div");r.style.cssText=`
        background:#ffffff;border-radius:0.75rem;
        width:100%;max-width:700px;max-height:90vh;
        overflow:hidden;display:flex;flex-direction:column;
        box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);
        font-family:'Inter',sans-serif;color:#1e293b;
        border:1px solid #e2e8f0;
    `,r.innerHTML=`
        <div style="padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#ffffff;">
            <div style="display:flex;align-items:center;gap:0.5rem;">
                <i class="ri-layout-bottom-line" style="font-size:1.125rem;color:#3b82f6;"></i>
                <h2 style="margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;">Configurar Footer</h2>
            </div>
            <button id="ft-modal-close" style="display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;">
                <i class="ri-close-line" style="font-size:1.125rem;"></i>
            </button>
        </div>

        <div style="flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1.25rem;background:#f8fafc;">
            <!-- Logo -->
            <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;">
                <label style="display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;">Logo</label>
                <div style="display:flex;gap:0.75rem;">
                    <input id="ft-logo-url" type="text" placeholder="URL del logo" value="${d}"
                        style="flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;">
                    <input id="ft-logo-alt" type="text" placeholder="Texto alternativo" value="${s}"
                        style="flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;">
                </div>
            </div>

            <!-- Secciones -->
            <div>
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;">
                    <label style="font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Secciones</label>
                    <button id="ft-add-section" style="padding:0.375rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;">
                        <i class="ri-add-line"></i> Agregar sección
                    </button>
                </div>
                <div id="ft-sections-container" style="display:flex;flex-direction:column;gap:0.75rem;"></div>
            </div>
        </div>

        <div style="padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#ffffff;">
            <button id="ft-modal-cancel" style="padding:0.5rem 1.25rem;background:#ffffff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;">
                Cancelar
            </button>
            <button id="ft-modal-save" style="padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;">
                Aplicar cambios
            </button>
        </div>
    `,n.appendChild(r),document.body.appendChild(n);const f=r.querySelector("#ft-sections-container");function C(a,m){const c=document.createElement("div");c.style.cssText="background:#ffffff;border:1px solid #e2e8f0;border-radius:0.625rem;overflow:hidden;",c.dataset.sectionIndex=m;const y=(a.links||[]).map((u,g)=>`
            <div class="ft-link-row" data-link-index="${g}" style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;">
                <input class="ft-link-icon" type="text" placeholder="ri-phone-line (opcional)" value="${u.icon||""}"
                    style="width:150px;flex-shrink:0;padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;">
                <input class="ft-link-label" type="text" placeholder="Texto del enlace" value="${u.label||""}"
                    style="flex:1;padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;">
                <input class="ft-link-href" type="text" placeholder="URL o tel:0000-0000" value="${u.href||""}"
                    style="flex:1;padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;">
                <button class="ft-remove-link" style="background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;flex-shrink:0;">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `).join("");return c.innerHTML=`
            <div style="padding:0.75rem 1rem;display:flex;align-items:center;gap:0.75rem;border-bottom:1px solid #f1f5f9;background:#f8fafc;">
                <input class="ft-section-title-input" type="text" placeholder="Título de la sección" value="${a.title||""}"
                    style="flex:1;padding:0.375rem 0.625rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.875rem;font-weight:600;outline:none;font-family:inherit;">
                <button class="ft-remove-section" style="background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;" title="Eliminar sección">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div style="padding:0.75rem 1rem;">
                <div class="ft-links-container">${y}</div>
                <button class="ft-add-link" style="margin-top:0.5rem;padding:0.375rem 0.75rem;background:#0d3f6a;border:none;border-radius:0.375rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;">
                    <i class="ri-add-line"></i> Agregar enlace
                </button>
            </div>
        `,c.querySelector(".ft-remove-section").onclick=()=>{l.splice(m,1),p()},c.querySelector(".ft-add-link").onclick=()=>{a.links=a.links||[],a.links.push({label:"Nuevo enlace",href:"#",icon:""}),p()},c.querySelectorAll(".ft-remove-link").forEach(u=>{u.onclick=()=>{const g=parseInt(u.closest(".ft-link-row").dataset.linkIndex);a.links.splice(g,1),p()}}),c}function p(){f.innerHTML="",l.forEach((a,m)=>{f.appendChild(C(a,m))})}p(),r.querySelector("#ft-add-section").onclick=()=>{l.push({title:"Nueva Sección",links:[]}),p()};function j(){const a=r.querySelector("#ft-logo-url").value.trim(),m=r.querySelector("#ft-logo-alt").value.trim(),c=[];return f.querySelectorAll("[data-section-index]").forEach((y,u)=>{const g=y.querySelector(".ft-section-title-input").value.trim(),v=[];y.querySelectorAll(".ft-link-row").forEach(x=>{v.push({icon:x.querySelector(".ft-link-icon").value.trim(),label:x.querySelector(".ft-link-label").value.trim(),href:x.querySelector(".ft-link-href").value.trim()})}),c.push({title:g,links:v})}),{logo_url:a,logo_alt:m,sections:c}}const b=()=>n.remove();r.querySelector("#ft-modal-close").onclick=b,r.querySelector("#ft-modal-cancel").onclick=b,n.onclick=a=>{a.target===n&&b()},r.querySelector("#ft-modal-save").onclick=()=>{const a=j();e.addAttributes({"data-footer-config":JSON.stringify(a)});const m=E(a);e.components(m+S),b()}}function _(o){const e="footer-component";o.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Footer",tagName:"footer",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,class:"ft-wrapper","data-footer-config":JSON.stringify({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""},{label:"Otros Servicios",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""},{label:"Red de Agencias",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000 - 0000",href:"tel:0000-0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:info@banco.com",icon:"ri-mail-line"},{label:"Dirección",href:"#",icon:"ri-map-pin-line"}]}]})},components:E({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000-0000",href:"tel:0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:",icon:"ri-mail-line"}]}]})+S,script:M(),toolbar:[],traits:[{type:"button",label:"Footer",text:"Administrar Footer",full:!0,command:"open-footer-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),o.Commands.add("open-footer-config",{run(t){const i=t.getSelected();i&&N(t,i)}}),o.Commands.add("insert-default-footer",{run(t){t.DomComponents.clear(),t.addComponents({type:e})}}),o.BlockManager.add("footer-block",{label:"Footer",category:"Footer",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="6" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="12" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="12" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="19" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="0" y="26" width="32" height="6" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),D(o,e),P(o)}function D(o,e){o.on("storage:end:load",()=>{setTimeout(()=>k(o,e),800)}),o.on("component:mount",t=>{const i=t.getEl();i?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const l=t.get("script");l&&typeof l=="function"&&l.call(i)},400))}),o.on("canvas:render",()=>{setTimeout(()=>k(o,e),600)})}function k(o,e){o.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const i=t.getEl();if(i?.isConnected){const l=t.get("script");l&&typeof l=="function"&&l.call(i)}})}function P(o){o.on("load",()=>{const e=o.Canvas.getFrameEl();if(!e)return;const t=e.contentDocument?.head;if(t&&!t.querySelector("#footer-component-css")){const i=document.createElement("style");i.id="footer-component-css",i.textContent=`
                [data-gjs-type="footer-component"] {
                    outline: 2px dashed rgba(240,135,42,0.4);
                    outline-offset: 2px;
                }
            `,t.appendChild(i)}})}document.addEventListener("DOMContentLoaded",async()=>{const o=new I,e=document.getElementById("footer-id")?.value||"",t=document.getElementById("footer-name")?.value||"",i=document.getElementById("footer-load-url")?.value||"",l=document.getElementById("footer-store-url")?.value||"",d=document.getElementById("footer-is-active")?.value==="1",s=!!e,n=H();if(_(n),n.on("load",()=>{T(n),q(),L(),F(n),$(n),A(n),B(n),setTimeout(()=>{n.runCommand("sw-visibility"),n.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),s&&i)try{await o.loadPageContent(n,i),h("Footer cargado correctamente","success")}catch{h("Error al cargar el footer","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const r=document.getElementById("save-button");r.disabled=!0,r.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{if(!s&&!t){const f=await O();if(!f){r.disabled=!1,r.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}await w(n,o,l,"POST",f,d)}else await w(n,o,l,s?"PUT":"POST",t,d)}catch(f){h(f.message,"error")}finally{r.disabled=!1,r.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}})});async function w(o,e,t,i,l,d){const s=e.getEditorContent(o),n=await e.savePage(o,{...s,name:l,is_active:d},t,i);n.success&&h(n.message,"success")}function O(){return new Promise(o=>{const e=document.createElement("div");e.style.cssText="position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);";const t=document.createElement("div");t.style.cssText="background:#fff;border-radius:0.75rem;padding:1.5rem;max-width:24rem;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.3);",t.innerHTML=`
            <h3 style="margin:0 0 1rem;font-size:1.1rem;font-weight:700;color:#111827;">Nombre del Footer</h3>
            <input id="footer-name-input" type="text" placeholder="Ej: Footer Principal"
                style="width:100%;padding:0.5rem 1rem;border:2px solid #d1d5db;border-radius:0.5rem;font-size:0.875rem;box-sizing:border-box;outline:none;">
            <div style="display:flex;gap:0.75rem;justify-content:flex-end;margin-top:1rem;">
                <button id="fn-cancel" style="padding:0.5rem 1rem;border-radius:0.5rem;border:2px solid #d1d5db;background:#fff;cursor:pointer;font-weight:500;">Cancelar</button>
                <button id="fn-confirm" style="padding:0.5rem 1rem;border-radius:0.5rem;border:none;background:#f0872a;color:#fff;cursor:pointer;font-weight:500;">Guardar</button>
            </div>
        `,e.appendChild(t),document.body.appendChild(e),setTimeout(()=>t.querySelector("#footer-name-input").focus(),100),t.querySelector("#fn-cancel").onclick=()=>{e.remove(),o(null)},t.querySelector("#fn-confirm").onclick=()=>{const i=t.querySelector("#footer-name-input").value.trim();e.remove(),o(i||null)},t.querySelector("#footer-name-input").onkeypress=i=>{i.key==="Enter"&&t.querySelector("#fn-confirm").click()}})}function h(o,e="info"){typeof window.showNotification=="function"&&window.showNotification(o,e)}
