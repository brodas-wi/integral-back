import{i as M,t as F,d as D,f as H,e as U,s as N,g as _,c as P,E as G,j as O,h as R}from"./editor-commands-5w86-EOS.js";import{o as J}from"./media-picker-CiKJ1Agb.js";import"./_commonjsHelpers-CqkleIqs.js";function W(){return M()}const I=`
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
</style>`;function A(o){const e=o.logo_url?`<img src="${o.logo_url}" alt="${o.logo_alt||"Logo"}">`:'<span class="ft-logo-text">Logo</span>',i=(o.sections||[]).map((r,c)=>{const k=(r.links||[]).map(g=>{const n=g.icon?`<i class="${g.icon}"></i>`:"";return g.isText?`<li><span class="ft-text">${n}${g.label}</span></li>`:`<li><a href="${g.href||"#"}">${n}${g.label}</a></li>`}).join("");return`<div class="ft-section" data-section-index="${c}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><p class="ft-section-title">${r.title}</p><ul class="ft-links">${k}</ul></div>`}).join("");return`<div class="ft-inner" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div class="ft-logo-col" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">${e}</div>${i}</div><div class="ft-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>`}function V(){return function(){}}function X(o,e){const i=document.getElementById("footer-config-modal");if(i&&i.remove(),!document.getElementById("ft-modal-styles")){const t=document.createElement("style");t.id="ft-modal-styles",t.textContent=`
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
        `,document.head.appendChild(t)}const r=(()=>{try{return JSON.parse(e.getAttributes()["data-footer-config"]||"{}")}catch{return{}}})(),c=r.sections||[{title:"Sección",links:[{label:"Enlace",href:"#",icon:""}]}],k=r.logo_url||"",g=r.logo_alt||"",n=document.createElement("div");n.id="footer-config-modal",n.className="ft-overlay";const p=document.createElement("div");p.className="ft-modal",p.innerHTML=`
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
                        ${k?`<img id="ft-logo-preview" src="${k}" alt="Logo preview" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;">`:'<div id="ft-logo-preview" style="display:none;"></div>'}
                        <input id="ft-logo-url" type="text" placeholder="URL del logo" value="${k}" class="ft-modal-input" style="width:100%;">
                    </div>
                    <button id="ft-logo-pick" type="button" style="flex-shrink:0;padding:0.5rem 0.875rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.8rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;">
                        <i class="ri-image-line"></i> Seleccionar
                    </button>
                    <input id="ft-logo-alt" type="text" placeholder="Texto alternativo" value="${g}" class="ft-modal-input">
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
    `,n.appendChild(p),document.body.appendChild(n);const d=p.querySelector("#ft-sections-container"),j=`${document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??""}/api/pages/search`;function E(t){if(t.dataset.autocompleteAttached)return;t.dataset.autocompleteAttached="true";const m=t.parentNode,a=m.style.position;(!a||a==="static")&&(m.style.position="relative");const s=document.createElement("ul");s.style.cssText=`
            position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;
            background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;
            box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;
            max-height:200px;overflow-y:auto;display:none;
        `,m.appendChild(s);let l=null,f="";async function $(u){if(u.length<1){s.style.display="none";return}try{const b=await(await fetch(`${j}?q=${encodeURIComponent(u)}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json();B(b,u)}catch{s.style.display="none"}}function B(u,y){if(s.innerHTML="",!u.length){s.style.display="none";return}u.forEach(b=>{const v=document.createElement("li");v.style.cssText="padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;",v.innerHTML=`
                    <span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${z(b.title,y)}</span>
                    <span style="font-size:0.7rem;color:#64748b;">/${b.slug}</span>`,v.addEventListener("mouseenter",()=>v.style.background="#f1f5f9"),v.addEventListener("mouseleave",()=>v.style.background=""),v.addEventListener("mousedown",x=>{x.preventDefault(),t.value="/"+b.slug,t.dispatchEvent(new Event("input")),s.style.display="none"}),s.appendChild(v)}),s.style.display="block"}function z(u,y){return y?u.replace(new RegExp(`(${y.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi"),'<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>'):u}t.addEventListener("input",()=>{clearTimeout(l),f=t.value.trim(),l=setTimeout(()=>$(f),220)}),t.addEventListener("focus",()=>{t.select(),f=t.value.trim(),f&&$(f)}),t.addEventListener("blur",()=>{setTimeout(()=>{s.style.display="none"},150)}),t.addEventListener("keydown",u=>{if(s.style.display==="none")return;const y=s.querySelectorAll("li"),b=s.querySelector("li.ft-ac-active");let v=Array.from(y).indexOf(b);if(u.key==="ArrowDown"){u.preventDefault(),b&&b.classList.remove("ft-ac-active");const x=y[v+1]||y[0];x?.classList.add("ft-ac-active"),x&&(x.style.background="#f1f5f9")}else if(u.key==="ArrowUp"){u.preventDefault(),b&&b.classList.remove("ft-ac-active");const x=y[v-1]||y[y.length-1];x?.classList.add("ft-ac-active"),x&&(x.style.background="#f1f5f9")}else u.key==="Enter"&&b?(u.preventDefault(),b.dispatchEvent(new MouseEvent("mousedown"))):u.key==="Escape"&&(s.style.display="none")})}function S(t,m){const a=document.createElement("div");a.className="ft-section-card",a.dataset.sectionIndex=m;const s=(t.links||[]).map((l,f)=>`
            <div class="ft-link-row" data-link-index="${f}" style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;">
                <input class="ft-modal-input-sm ft-link-icon-input ft-link-icon" type="text"
                    placeholder="ri-phone-line (opcional)" value="${l.icon||""}">
                <input class="ft-modal-input-sm ft-link-label" type="text"
                    placeholder="Texto" value="${l.label||""}">
                <div style="flex:1;position:relative;">
                    <input class="ft-modal-input-sm ft-link-href" type="text"
                        placeholder="URL o buscar página..." value="${l.href||""}"
                        style="width:100%;box-sizing:border-box;${l.isText?"opacity:0.4;pointer-events:none;":""}">
                </div>
                <label style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:#64748b;white-space:nowrap;cursor:pointer;">
                    <input type="checkbox" class="ft-link-istext" ${l.isText?"checked":""}
                        style="accent-color:#003B71;cursor:pointer;">
                    Solo texto
                </label>
                <button class="ft-btn-remove ft-remove-link">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `).join("");return a.innerHTML=`
            <div class="ft-section-card-header">
                <input class="ft-section-title-input" type="text"
                    placeholder="Título de la sección" value="${t.title||""}">
                <button class="ft-btn-remove ft-remove-section" title="Eliminar sección">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
            <div class="ft-section-card-body">
                <div class="ft-links-container">${s}</div>
                <button class="ft-btn-add-link">
                    <i class="ri-add-line"></i> Agregar enlace
                </button>
            </div>
        `,a.querySelector(".ft-remove-section").onclick=()=>{c.splice(m,1),h()},a.querySelector(".ft-btn-add-link").onclick=()=>{t.links=t.links||[],t.links.push({label:"Nuevo enlace",href:"#",icon:""}),h()},a.querySelectorAll(".ft-remove-link").forEach(l=>{l.onclick=()=>{const f=parseInt(l.closest(".ft-link-row").dataset.linkIndex);t.links.splice(f,1),h()}}),a.querySelectorAll(".ft-link-href").forEach(l=>{l.closest("[style*='pointer-events:none']")||E(l)}),a.querySelectorAll(".ft-link-istext").forEach(l=>{l.addEventListener("change",()=>{const f=l.closest(".ft-link-row").querySelector(".ft-link-href");l.checked?(f.style.opacity="0.4",f.style.pointerEvents="none",f.value=""):(f.style.opacity="1",f.style.pointerEvents="auto")})}),a}function h(){d.innerHTML="",c.forEach((t,m)=>d.appendChild(S(t,m)))}h(),p.querySelector("#ft-logo-pick").addEventListener("click",()=>{J({type:"image",title:"Seleccionar logo",onSelect:t=>{p.querySelector("#ft-logo-url").value=t;let m=p.querySelector("#ft-logo-preview");if(!m||m.tagName==="DIV"){const a=document.createElement("img");a.id="ft-logo-preview",a.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;",m?.replaceWith(a)??p.querySelector("#ft-logo-url").before(a),m=a}m.src=t,m.style.display="block"}})}),p.querySelector("#ft-add-section").onclick=()=>{c.push({title:"Nueva Sección",links:[]}),h()};function T(){const t=p.querySelector("#ft-logo-url").value.trim(),m=p.querySelector("#ft-logo-alt").value.trim(),a=[];return d.querySelectorAll("[data-section-index]").forEach(s=>{const l=s.querySelector(".ft-section-title-input").value.trim(),f=[];s.querySelectorAll(".ft-link-row").forEach($=>{const B=$.querySelector(".ft-link-istext")?.checked??!1;f.push({icon:$.querySelector(".ft-link-icon").value.trim(),label:$.querySelector(".ft-link-label").value.trim(),href:B?"":$.querySelector(".ft-link-href").value.trim(),isText:B})}),a.push({title:l,links:f})}),{logo_url:t,logo_alt:m,sections:a}}const C=()=>n.remove();p.querySelector("#ft-modal-close").onclick=C,p.querySelector("#ft-modal-cancel").onclick=C,n.onclick=t=>{t.target===n&&C()},p.querySelector("#ft-modal-save").onclick=()=>{const t=T();e.addAttributes({"data-footer-config":JSON.stringify(t)}),e.components(A(t)+I),C()}}function Q(o){const e="footer-component";o.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Footer",tagName:"footer",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,class:"ft-wrapper","data-footer-config":JSON.stringify({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""},{label:"Otros Servicios",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""},{label:"Red de Agencias",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000 - 0000",href:"tel:0000-0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:info@banco.com",icon:"ri-mail-line"},{label:"Dirección",href:"#",icon:"ri-map-pin-line"}]}]})},components:A({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000-0000",href:"tel:0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:",icon:"ri-mail-line"}]}]})+I,script:V(),toolbar:[],traits:[{type:"button",label:"Footer",text:"Administrar Footer",full:!0,command:"open-footer-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),o.Commands.add("open-footer-config",{run(i){const r=i.getSelected();r&&X(i,r)}}),o.Commands.add("insert-default-footer",{run(i){i.DomComponents.clear(),i.addComponents({type:e})}}),o.BlockManager.add("footer-block",{label:"Footer",category:"Footer",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="6" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="12" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="12" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="19" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="0" y="26" width="32" height="6" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),Y(o,e),K(o)}function Y(o,e){o.on("storage:end:load",()=>{setTimeout(()=>q(o,e),800)}),o.on("component:mount",i=>{const r=i.getEl();r?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const c=i.get("script");c&&typeof c=="function"&&c.call(r)},400))}),o.on("canvas:render",()=>{setTimeout(()=>q(o,e),600)})}function q(o,e){o.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const r=i.getEl();if(r?.isConnected){const c=i.get("script");c&&typeof c=="function"&&c.call(r)}})}function K(o){o.on("load",()=>{const e=o.Canvas.getFrameEl();if(!e)return;const i=e.contentDocument?.head;if(i&&!i.querySelector("#footer-component-css")){const r=document.createElement("style");r.id="footer-component-css",r.textContent=`
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
            `,i.appendChild(r)}})}document.addEventListener("DOMContentLoaded",async()=>{const o=new G;let e=document.getElementById("footer-id")?.value||"",i=document.getElementById("footer-name")?.value||"",r=document.getElementById("footer-load-url")?.value||"",c=document.getElementById("footer-store-url")?.value||"";const k=document.getElementById("footer-is-active")?.value==="1";let g=!!e;const n=W();if(Q(n),n.on("load",()=>{F(n),D(),H(),U(n),N(n),_(n),P(n),Z(n),setTimeout(()=>{n.runCommand("sw-visibility"),n.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),g&&r)try{await o.loadPageContent(n,r),L("Footer cargado correctamente","success")}catch{L("Error al cargar el footer","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const d=document.getElementById("save-button");d.disabled=!0,d.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!g&&!i?O({title:"Nombre del Footer",description:"Ingresa un nombre descriptivo para identificar este footer.",placeholder:"Ej: Footer Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async w=>{if(!w?.trim()){L("El nombre es obligatorio","error"),d.disabled=!1,d.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await p(w)}catch(j){L(j.message,"error")}finally{d.disabled=!1,d.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{d.disabled=!1,d.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await p(i),d.disabled=!1,d.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(w){L(w.message,"error"),d.disabled=!1,d.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function p(d){const w=g?"PUT":"POST",j=o.getEditorContent(n),E=await o.savePage(n,{...j,name:d,is_active:k},c,w);if(E.success){if(o.markAsClean(),L(E.message,"success"),!g&&E.footer){e=E.footer.id,i=E.footer.name,g=!0;const S=document.getElementById("footer-id");S&&(S.value=e);const h=document.getElementById("footer-name");h&&(h.value=i);const T=document.querySelector('meta[name="app-url"]'),C=T?T.content:"";c=c.endsWith("/footers")?`${c}/${e}`:`${c.replace(/\/footers\/?$/,"")}/footers/${e}`;const m=document.getElementById("footer-store-url");m&&(m.value=c),r=`${c}/load`;const a=document.getElementById("footer-load-url");a&&(a.value=r);const s=document.getElementById("editor-title");s&&(s.textContent=`Editando Footer: ${i}`);const l=`/footers/${e}/edit`,f=C?`${C}${l}`:l;window.history.replaceState({path:f},"",f)}else if(d){i=d;const S=document.getElementById("footer-name");S&&(S.value=i);const h=document.getElementById("editor-title");h&&(h.textContent=`Editando Footer: ${i}`)}}}});function Z(o){o.Commands.add("canvas-clear",{run:e=>{R({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{e.DomComponents.clear(),e.CssComposer.clear()}})}})}function L(o,e="info"){typeof window.showNotification=="function"&&window.showNotification(o,e)}
