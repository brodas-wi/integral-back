import{i as D,t as F,d as H,f as U,e as N,s as _,g as P,c as G,E as O,j as R,h as J}from"./editor-commands-BCLnuKp4.js";import{o as V}from"./media-picker-CiKJ1Agb.js";import"./_commonjsHelpers-CqkleIqs.js";function W(){return D()}const A=`
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
</style>`;function z(r){const t=r.logo_url?`<img src="${r.logo_url}" alt="${r.logo_alt||"Logo"}">`:'<span class="ft-logo-text">Logo</span>',i=(r.sections||[]).map((s,m)=>{const w=(s.links||[]).map(g=>{const d=g.icon?`<i class="${g.icon}"></i>`:"";return g.isText?`<li><span class="ft-text">${d}${g.label}</span></li>`:`<li><a href="${g.href||"#"}">${d}${g.label}</a></li>`}).join("");return`<div class="ft-section" data-section-index="${m}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><p class="ft-section-title">${s.title}</p><ul class="ft-links">${w}</ul></div>`}).join("");return`<div class="ft-inner" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div class="ft-logo-col" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">${t}</div>${i}</div><div class="ft-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>`}function X(){return function(){}}function Q(r,t){const i=document.getElementById("footer-config-modal");if(i&&i.remove(),!document.getElementById("ft-modal-styles")){const e=document.createElement("style");e.id="ft-modal-styles",e.textContent=`
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
        `,document.head.appendChild(e)}const s=(()=>{try{return JSON.parse(t.getAttributes()["data-footer-config"]||"{}")}catch{return{}}})(),m=s.sections||[{title:"Sección",links:[{label:"Enlace",href:"#",icon:""}]}],w=s.logo_url||"",g=s.logo_alt||"",d=document.createElement("div");d.id="footer-config-modal",d.className="ft-overlay";const p=document.createElement("div");p.className="ft-modal",p.innerHTML=`
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
                        ${w?`<img id="ft-logo-preview" src="${w}" alt="Logo preview" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;">`:'<div id="ft-logo-preview" style="display:none;"></div>'}
                        <input id="ft-logo-url" type="text" placeholder="URL del logo" value="${w}" class="ft-modal-input" style="width:100%;">
                    </div>
                    <button id="ft-logo-pick" type="button" style="flex-shrink:0;padding:0.5rem 0.875rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.8rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;">
                        <i class="ri-image-line"></i> Seleccionar
                    </button>
                    <input id="ft-logo-alt" type="text" placeholder="Texto alternativo" value="${g}" class="ft-modal-input">
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
            <button id="ft-modal-save" class="ft-btn-save">Aplicar cambios</button>
        </div>
    `,d.appendChild(p),document.body.appendChild(d);const f=p.querySelector("#ft-sections-container"),T=`${document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??""}/api/pages/search`;function S(e){if(e.dataset.autocompleteAttached)return;e.dataset.autocompleteAttached="true";const c=e.parentNode,a=c.style.position;(!a||a==="static")&&(c.style.position="relative");const n=document.createElement("ul");n.style.cssText=`
            position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;
            background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;
            box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;
            max-height:200px;overflow-y:auto;display:none;
        `,c.appendChild(n);let o=null,l="";async function v(u){if(u.length<1){n.style.display="none";return}try{const b=await(await fetch(`${T}?q=${encodeURIComponent(u)}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json();$(b,u)}catch{n.style.display="none"}}function $(u,h){if(n.innerHTML="",!u.length){n.style.display="none";return}u.forEach(b=>{const y=document.createElement("li");y.style.cssText="padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;",y.innerHTML=`
                    <span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${M(b.title,h)}</span>
                    <span style="font-size:0.7rem;color:#64748b;">/${b.slug}</span>`,y.addEventListener("mouseenter",()=>y.style.background="#f1f5f9"),y.addEventListener("mouseleave",()=>y.style.background=""),y.addEventListener("mousedown",k=>{k.preventDefault(),e.value="/"+b.slug,e.dispatchEvent(new Event("input")),n.style.display="none"}),n.appendChild(y)}),n.style.display="block"}function M(u,h){return h?u.replace(new RegExp(`(${h.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi"),'<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>'):u}e.addEventListener("input",()=>{clearTimeout(o),l=e.value.trim(),o=setTimeout(()=>v(l),220)}),e.addEventListener("focus",()=>{e.select(),l=e.value.trim(),l&&v(l)}),e.addEventListener("blur",()=>{setTimeout(()=>{n.style.display="none"},150)}),e.addEventListener("keydown",u=>{if(n.style.display==="none")return;const h=n.querySelectorAll("li"),b=n.querySelector("li.ft-ac-active");let y=Array.from(h).indexOf(b);if(u.key==="ArrowDown"){u.preventDefault(),b&&b.classList.remove("ft-ac-active");const k=h[y+1]||h[0];k?.classList.add("ft-ac-active"),k&&(k.style.background="#f1f5f9")}else if(u.key==="ArrowUp"){u.preventDefault(),b&&b.classList.remove("ft-ac-active");const k=h[y-1]||h[h.length-1];k?.classList.add("ft-ac-active"),k&&(k.style.background="#f1f5f9")}else u.key==="Enter"&&b?(u.preventDefault(),b.dispatchEvent(new MouseEvent("mousedown"))):u.key==="Escape"&&(n.style.display="none")})}function C(e,c,a){let n=null;e.querySelectorAll("[data-drag-idx]").forEach(o=>{o.setAttribute("draggable","true"),o.addEventListener("dragstart",l=>{n=parseInt(o.dataset.dragIdx),setTimeout(()=>o.classList.add("ft-dragging"),0),l.dataTransfer.effectAllowed="move"}),o.addEventListener("dragend",()=>{o.classList.remove("ft-dragging"),e.querySelectorAll(".ft-drag-over").forEach(l=>l.classList.remove("ft-drag-over"))}),o.addEventListener("dragover",l=>{l.preventDefault(),l.dataTransfer.dropEffect="move",parseInt(o.dataset.dragIdx)!==n&&o.classList.add("ft-drag-over")}),o.addEventListener("dragleave",()=>o.classList.remove("ft-drag-over")),o.addEventListener("drop",l=>{l.preventDefault();const v=parseInt(o.dataset.dragIdx);if(n!==null&&v!==n){const[$]=c.splice(n,1);c.splice(v,0,$),a()}n=null})})}function L(e,c){const a=document.createElement("div");a.className="ft-section-card",a.dataset.sectionIndex=c,a.dataset.dragIdx=c;const n=(e.links||[]).map((o,l)=>`
            <div class="ft-link-row" data-link-index="${l}" style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;">
                <input class="ft-modal-input-sm ft-link-icon-input ft-link-icon" type="text"
                    placeholder="ri-phone-line (opcional)" value="${o.icon||""}">
                <input class="ft-modal-input-sm ft-link-label" type="text"
                    placeholder="Texto" value="${o.label||""}">
                <div style="flex:1;position:relative;">
                    <input class="ft-modal-input-sm ft-link-href" type="text"
                        placeholder="URL o buscar página..." value="${o.href||""}"
                        style="width:100%;box-sizing:border-box;${o.isText?"opacity:0.4;pointer-events:none;":""}">
                </div>
                <label style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:#64748b;white-space:nowrap;cursor:pointer;">
                    <input type="checkbox" class="ft-link-istext" ${o.isText?"checked":""}
                        style="accent-color:#003B71;cursor:pointer;">
                    Solo texto
                </label>
                <button class="ft-btn-remove ft-remove-link">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `).join("");return a.innerHTML=`
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
        `,a.querySelector(".ft-remove-section").onclick=()=>{m.splice(c,1),x()},a.querySelector(".ft-btn-add-link").onclick=()=>{e.links=e.links||[],e.links.push({label:"Nuevo enlace",href:"#",icon:""}),x()},a.querySelectorAll(".ft-remove-link").forEach(o=>{o.onclick=()=>{const l=parseInt(o.closest(".ft-link-row").dataset.linkIndex);e.links.splice(l,1),x()}}),a.querySelectorAll(".ft-link-href").forEach(o=>{o.closest("[style*='pointer-events:none']")||S(o)}),a.querySelectorAll(".ft-link-istext").forEach(o=>{o.addEventListener("change",()=>{const l=o.closest(".ft-link-row").querySelector(".ft-link-href");o.checked?(l.style.opacity="0.4",l.style.pointerEvents="none",l.value=""):(l.style.opacity="1",l.style.pointerEvents="auto")})}),a}function x(){f.innerHTML="",m.forEach((e,c)=>f.appendChild(L(e,c))),C(f,m,x)}x(),p.querySelector("#ft-logo-pick").addEventListener("click",()=>{V({type:"image",title:"Seleccionar logo",onSelect:e=>{p.querySelector("#ft-logo-url").value=e;let c=p.querySelector("#ft-logo-preview");if(!c||c.tagName==="DIV"){const a=document.createElement("img");a.id="ft-logo-preview",a.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;",c?.replaceWith(a)??p.querySelector("#ft-logo-url").before(a),c=a}c.src=e,c.style.display="block"}})}),p.querySelector("#ft-add-section").onclick=()=>{m.push({title:"Nueva Sección",links:[]}),x(),f.lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})};function B(){const e=p.querySelector("#ft-logo-url").value.trim(),c=p.querySelector("#ft-logo-alt").value.trim(),a=[];return f.querySelectorAll("[data-section-index]").forEach(n=>{const o=n.querySelector(".ft-section-title-input").value.trim(),l=[];n.querySelectorAll(".ft-link-row").forEach(v=>{const $=v.querySelector(".ft-link-istext")?.checked??!1;l.push({icon:v.querySelector(".ft-link-icon").value.trim(),label:v.querySelector(".ft-link-label").value.trim(),href:$?"":v.querySelector(".ft-link-href").value.trim(),isText:$})}),a.push({title:o,links:l})}),{logo_url:e,logo_alt:c,sections:a}}const j=()=>d.remove();p.querySelector("#ft-modal-close").onclick=j,p.querySelector("#ft-modal-cancel").onclick=j,d.onclick=e=>{e.target===d&&j()},p.querySelector("#ft-modal-save").onclick=()=>{const e=B();t.addAttributes({"data-footer-config":JSON.stringify(e)}),t.components(z(e)+A),j()}}function Y(r){const t="footer-component";r.DomComponents.addType(t,{isComponent:i=>i.getAttribute?.("data-gjs-type")===t?{type:t}:!1,model:{defaults:{name:"Footer",tagName:"footer",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":t,class:"ft-wrapper","data-footer-config":JSON.stringify({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""},{label:"Otros Servicios",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""},{label:"Red de Agencias",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000 - 0000",href:"tel:0000-0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:info@banco.com",icon:"ri-mail-line"},{label:"Dirección",href:"#",icon:"ri-map-pin-line"}]}]})},components:z({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000-0000",href:"tel:0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:",icon:"ri-mail-line"}]}]})+A,script:X(),toolbar:[],traits:[{type:"button",label:"Footer",text:"Administrar Footer",full:!0,command:"open-footer-config"}]},init(){this.set("type",t),this.addAttributes({"data-gjs-type":t})}}}),r.Commands.add("open-footer-config",{run(i){const s=i.getSelected();s&&Q(i,s)}}),r.Commands.add("insert-default-footer",{run(i){i.DomComponents.clear(),i.addComponents({type:t})}}),r.BlockManager.add("footer-block",{label:"Footer",category:"Footer",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="6" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="12" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="12" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="19" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="0" y="26" width="32" height="6" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:t,attributes:{"data-gjs-type":t}}}),K(r,t),Z(r)}function K(r,t){r.on("storage:end:load",()=>{setTimeout(()=>q(r,t),800)}),r.on("component:mount",i=>{const s=i.getEl();s?.getAttribute?.("data-gjs-type")===t&&(i.set("type",t),setTimeout(()=>{const m=i.get("script");m&&typeof m=="function"&&m.call(s)},400))}),r.on("canvas:render",()=>{setTimeout(()=>q(r,t),600)})}function q(r,t){r.getWrapper().find(`[data-gjs-type="${t}"]`).forEach(i=>{i.set("type",t);const s=i.getEl();if(s?.isConnected){const m=i.get("script");m&&typeof m=="function"&&m.call(s)}})}function Z(r){r.on("load",()=>{const t=r.Canvas.getFrameEl();if(!t)return;const i=t.contentDocument?.head;if(i&&!i.querySelector("#footer-component-css")){const s=document.createElement("style");s.id="footer-component-css",s.textContent=`
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
            `,i.appendChild(s)}})}document.addEventListener("DOMContentLoaded",async()=>{const r=new O;let t=document.getElementById("footer-id")?.value||"",i=document.getElementById("footer-name")?.value||"",s=document.getElementById("footer-load-url")?.value||"",m=document.getElementById("footer-store-url")?.value||"";const w=document.getElementById("footer-is-active")?.value==="1";let g=!!t;const d=W();if(Y(d),d.on("load",()=>{F(d),H(),U(),N(d),_(d),P(d),G(d),ee(d),setTimeout(()=>{d.runCommand("sw-visibility"),d.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),g&&s)try{await r.loadPageContent(d,s),I("Footer cargado correctamente","success")}catch{I("Error al cargar el footer","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const f=document.getElementById("save-button");f.disabled=!0,f.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!g&&!i?R({title:"Nombre del Footer",description:"Ingresa un nombre descriptivo para identificar este footer.",placeholder:"Ej: Footer Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async E=>{if(!E?.trim()){I("El nombre es obligatorio","error"),f.disabled=!1,f.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await p(E)}catch(T){I(T.message,"error")}finally{f.disabled=!1,f.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{f.disabled=!1,f.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await p(i),f.disabled=!1,f.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(E){I(E.message,"error"),f.disabled=!1,f.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function p(f){const E=g?"PUT":"POST",T=r.getEditorContent(d),S=await r.savePage(d,{...T,name:f,is_active:w},m,E);if(S.success){if(r.markAsClean(),I(S.message,"success"),!g&&S.footer){t=S.footer.id,i=S.footer.name,g=!0;const C=document.getElementById("footer-id");C&&(C.value=t);const L=document.getElementById("footer-name");L&&(L.value=i);const x=document.querySelector('meta[name="app-url"]'),B=x?x.content:"";m=m.endsWith("/footers")?`${m}/${t}`:`${m.replace(/\/footers\/?$/,"")}/footers/${t}`;const e=document.getElementById("footer-store-url");e&&(e.value=m),s=`${m}/load`;const c=document.getElementById("footer-load-url");c&&(c.value=s);const a=document.getElementById("editor-title");a&&(a.textContent=`Editando Footer: ${i}`);const n=`/footers/${t}/edit`,o=B?`${B}${n}`:n;window.history.replaceState({path:o},"",o)}else if(f){i=f;const C=document.getElementById("footer-name");C&&(C.value=i);const L=document.getElementById("editor-title");L&&(L.textContent=`Editando Footer: ${i}`)}}}});function ee(r){r.Commands.add("canvas-clear",{run:t=>{J({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{t.DomComponents.clear(),t.CssComposer.clear()}})}})}function I(r,t="info"){typeof window.showNotification=="function"&&window.showNotification(r,t)}
