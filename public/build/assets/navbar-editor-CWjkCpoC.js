import{i as B,t as C,d as j,f as N,e as I,s as q,g as z,c as T,E as A,j as M,h as H}from"./editor-commands-DIM4nSZH.js";import{o as _}from"./media-picker-CiKJ1Agb.js";import"./_commonjsHelpers-CqkleIqs.js";function U(){return B()}const S=`
<style>
.nb-wrapper {
    background-color: #ffffff;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    font-family: 'Poppins', sans-serif;
}
.nb-inner {
    max-width: 1152px;
    margin: 0 auto;
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
    gap: 2rem;
}
.nb-logo {
    flex-shrink: 0;
    display: flex;
    align-items: center;
}
.nb-logo img {
    height: 48px;
    width: auto;
    display: block;
}
.nb-logo-text {
    font-size: 1.25rem;
    font-weight: 800;
    color: #003B71;
}
.nb-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex: 1;
    justify-content: center;
    list-style: none;
    margin: 0;
    padding: 0;
}
.nb-item {
    position: relative;
}
.nb-link {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem 0.875rem;
    color: #003B71;
    text-decoration: none;
    font-size: 0.9375rem;
    font-weight: 500;
    border-radius: 0.5rem;
    transition: background 0.15s, color 0.15s;
    white-space: nowrap;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
}
.nb-link:hover {
    background: rgba(0,59,113,0.06);
    color: #002a52;
}
.nb-link i {
    font-size: 0.875rem;
    transition: transform 0.2s;
}
.nb-item.nb-open > .nb-link i.nb-chevron {
    transform: rotate(180deg);
}
.nb-submenu {
    display: none;
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 0.625rem;
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    min-width: 200px;
    padding: 0.375rem;
    list-style: none;
    margin: 0;
    z-index: 200;
}
.nb-item.nb-open > .nb-submenu {
    display: block;
}
.nb-submenu-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    color: #003B71;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 400;
    border-radius: 0.375rem;
    transition: background 0.15s;
    white-space: nowrap;
}
.nb-submenu-link:hover {
    background: rgba(0,59,113,0.06);
}
.nb-submenu-link i {
    color: #E97300;
    font-size: 1rem;
    flex-shrink: 0;
}
.nb-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-shrink: 0;
}
.nb-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1.25rem;
    border-radius: 2rem;
    font-size: 0.9375rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    border: 2px solid transparent;
    transition: opacity 0.15s, background 0.15s;
    white-space: nowrap;
    font-family: inherit;
}
.nb-btn:hover { opacity: 0.88; }
.nb-btn-primary {
    background: #003B71;
    color: #ffffff;
    border-color: #003B71;
}
.nb-btn-outline {
    background: transparent;
    color: #003B71;
    border-color: #003B71;
}
.nb-btn-orange {
    background: #E97300;
    color: #ffffff;
    border-color: #E97300;
}
.nb-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.375rem;
    transition: background 0.15s;
}
.nb-hamburger:hover { background: rgba(0,59,113,0.06); }
.nb-hamburger span {
    display: block;
    width: 24px;
    height: 2px;
    background: #003B71;
    border-radius: 2px;
    transition: all 0.25s;
}
.nb-mobile-menu {
    display: none;
    flex-direction: column;
    background: #ffffff;
    border-top: 1px solid #f1f5f9;
    padding: 1rem 1.5rem;
    gap: 0.25rem;
}
.nb-mobile-menu.nb-open { display: flex; }
.nb-mobile-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 0.5rem;
    color: #003B71;
    text-decoration: none;
    font-size: 0.9375rem;
    font-weight: 500;
    border-bottom: 1px solid #f1f5f9;
    cursor: pointer;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    width: 100%;
    text-align: left;
    font-family: inherit;
}
.nb-mobile-link:last-child { border-bottom: none; }
.nb-mobile-link i { color: #94a3b8; font-size: 0.875rem; transition: transform 0.2s; }
.nb-mobile-item.nb-open > .nb-mobile-link i { transform: rotate(180deg); }
.nb-mobile-submenu {
    display: none;
    flex-direction: column;
    padding: 0.25rem 0 0.5rem 1rem;
    gap: 0.125rem;
}
.nb-mobile-item.nb-open > .nb-mobile-submenu { display: flex; }
.nb-mobile-submenu-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.5rem;
    color: #475569;
    text-decoration: none;
    font-size: 0.875rem;
    border-radius: 0.375rem;
    transition: background 0.15s;
}
.nb-mobile-submenu-link:hover { background: rgba(0,59,113,0.04); }
.nb-mobile-submenu-link i { color: #E97300; font-size: 0.875rem; flex-shrink: 0; }
.nb-mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 0.75rem;
    margin-top: 0.25rem;
    border-top: 1px solid #f1f5f9;
}
.nb-mobile-actions .nb-btn { justify-content: center; border-radius: 0.625rem; }
@media (max-width: 768px) {
    .nb-links, .nb-actions { display: none; }
    .nb-hamburger { display: flex; }
}
</style>`;function L(t,e){e=e||"nb"+Math.random().toString(36).slice(2,7);const r=t.logo_url?`<img src="${t.logo_url}" alt="${t.logo_alt||"Logo"}">`:`<span class="nb-logo-text">${t.logo_text||"Logo"}</span>`,s=(t.links||[]).map(o=>{if(o.type==="submenu"&&o.children?.length){const i=o.children.map(n=>{const u=n.icon?`<i class="${n.icon}"></i>`:"";return`<li><a href="${n.href||"#"}" class="nb-submenu-link">${u}${n.label}</a></li>`}).join("");return`<li class="nb-item nb-has-submenu"><button class="nb-link nb-submenu-trigger" type="button">${o.label}<i class="ri-arrow-down-s-line nb-chevron"></i></button><ul class="nb-submenu">${i}</ul></li>`}return`<li class="nb-item"><a href="${o.href||"#"}" class="nb-link">${o.label}</a></li>`}).join(""),c=(t.actions||[]).map(o=>{const i=o.icon?`<i class="${o.icon}"></i>`:"";return`<a href="${o.href||"#"}" class="nb-btn nb-btn-${o.style||"primary"}">${i}${o.label}</a>`}).join(""),x=(t.links||[]).map(o=>{if(o.type==="submenu"&&o.children?.length){const i=o.children.map(n=>{const u=n.icon?`<i class="${n.icon}"></i>`:"";return`<a href="${n.href||"#"}" class="nb-mobile-submenu-link">${u}${n.label}</a>`}).join("");return`<div class="nb-mobile-item"><button class="nb-mobile-link" type="button">${o.label}<i class="ri-arrow-down-s-line"></i></button><div class="nb-mobile-submenu">${i}</div></div>`}return`<a href="${o.href||"#"}" class="nb-mobile-link">${o.label}</a>`}).join(""),p=(t.actions||[]).map(o=>{const i=o.icon?`<i class="${o.icon}"></i>`:"";return`<a href="${o.href||"#"}" class="nb-btn nb-btn-${o.style||"primary"}">${i}${o.label}</a>`}).join(""),b=`(function(){
var id="${e}";
function init(){
    var inner=document.getElementById("nb-root-"+id);
    if(!inner)return;
    var root=inner.closest("nav")||inner.parentElement;
    function pad(){if(root)document.body.style.paddingTop=root.offsetHeight+"px";}
    pad();
    window.addEventListener("resize",pad);
    var toggle=document.getElementById("nb-toggle-"+id);
    var mobile=document.getElementById("nb-mobile-"+id);
    if(toggle&&mobile){toggle.addEventListener("click",function(){mobile.classList.toggle("nb-open");pad();});}
    root.querySelectorAll(".nb-submenu-trigger").forEach(function(btn){
        btn.addEventListener("click",function(e){
            e.stopPropagation();
            var item=btn.closest(".nb-item");
            var open=item.classList.contains("nb-open");
            root.querySelectorAll(".nb-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
            if(!open)item.classList.add("nb-open");
        });
    });
    root.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(btn){
        btn.addEventListener("click",function(){btn.closest(".nb-mobile-item").classList.toggle("nb-open");pad();});
    });
    document.addEventListener("click",function(e){
        if(!root.contains(e.target))root.querySelectorAll(".nb-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
    });
}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",init);}else{init();}
})();`;return`<div id="nb-root-${e}" class="nb-inner" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div class="nb-logo" data-gjs-editable="false" data-gjs-selectable="false">${r}</div><ul class="nb-links" data-gjs-editable="false" data-gjs-selectable="false">${s}</ul><div class="nb-actions" data-gjs-editable="false" data-gjs-selectable="false">${c}</div><button class="nb-hamburger" type="button" id="nb-toggle-${e}" aria-label="Menú" data-gjs-editable="false" data-gjs-selectable="false"><span></span><span></span><span></span></button></div><div class="nb-mobile-menu" id="nb-mobile-${e}" data-gjs-editable="false" data-gjs-selectable="false">${x}${p?`<div class="nb-mobile-actions">${p}</div>`:""}</div><script>${b}<\/script>`}function O(){return function(){}}function D(t,e){const r=document.getElementById("navbar-config-modal");if(r&&r.remove(),!document.getElementById("nb-modal-styles")){const l=document.createElement("style");l.id="nb-modal-styles",l.textContent=`
            .nb-overlay {
                position: fixed; inset: 0; z-index: 99999;
                display: flex; align-items: center; justify-content: center;
                background: rgba(15,23,42,0.45); backdrop-filter: blur(3px); padding: 1rem;
            }
            .nb-modal {
                background: #fff; border-radius: 0.75rem; width: 100%; max-width: 780px;
                max-height: 92vh; overflow: hidden; display: flex; flex-direction: column;
                box-shadow: 0 20px 60px rgba(15,23,42,0.15), 0 4px 16px rgba(15,23,42,0.08);
                font-family: 'Inter', sans-serif; color: #1e293b; border: 1px solid #e2e8f0;
            }
            .nb-modal-header {
                padding: 1rem 1.25rem; border-bottom: 1px solid #f1f5f9;
                display: flex; align-items: center; justify-content: space-between;
                background: #fff; flex-shrink: 0;
            }
            .nb-modal-header-left { display: flex; align-items: center; gap: 0.5rem; }
            .nb-modal-header-left i { font-size: 1.125rem; color: #3b82f6; }
            .nb-modal-header-left h2 { margin: 0; font-size: 0.9375rem; font-weight: 600; color: #0f172a; }
            .nb-modal-close {
                display: flex; align-items: center; justify-content: center;
                width: 2rem; height: 2rem; border-radius: 0.375rem; border: none;
                background: transparent; color: #94a3b8; cursor: pointer; transition: background 0.15s;
            }
            .nb-modal-close:hover { background: #f1f5f9; color: #475569; }
            .nb-modal-tabs {
                display: flex; border-bottom: 1px solid #e2e8f0; background: #fff; flex-shrink: 0;
            }
            .nb-tab-btn {
                padding: 0.75rem 1.25rem; background: transparent; border: none;
                border-bottom: 2px solid transparent; color: #94a3b8; font-size: 0.875rem;
                font-weight: 500; cursor: pointer; font-family: inherit; transition: color 0.15s;
                display: flex; align-items: center; gap: 0.375rem; margin-bottom: -1px;
            }
            .nb-tab-btn.active { color: #003B71; border-bottom-color: #003B71; }
            .nb-tab-btn i { font-size: 1rem; }
            .nb-modal-body {
                flex: 1; overflow-y: auto; padding: 1.25rem;
                display: flex; flex-direction: column; gap: 1rem; background: #f8fafc;
            }
            .nb-modal-body::-webkit-scrollbar { width: 5px; }
            .nb-modal-body::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 3px; }
            .nb-tab-panel { display: none; flex-direction: column; gap: 1rem; }
            .nb-tab-panel.active { display: flex; }
            .nb-card {
                background: #fff; border: 1px solid #e2e8f0; border-radius: 0.625rem; padding: 1rem;
            }
            .nb-label {
                display: block; font-size: 0.75rem; font-weight: 600; color: #64748b;
                text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.625rem;
            }
            .nb-row { display: flex; gap: 0.75rem; align-items: center; }
            .nb-input {
                flex: 1; padding: 0.5rem 0.75rem; background: #f8fafc;
                border: 1px solid #e2e8f0; border-radius: 0.5rem; color: #1e293b;
                font-size: 0.875rem; outline: none; font-family: inherit; transition: border-color 0.15s;
            }
            .nb-input:focus { border-color: #3b82f6; }
            .nb-input-sm {
                padding: 0.375rem 0.625rem; background: #f8fafc; border: 1px solid #e2e8f0;
                border-radius: 0.375rem; color: #1e293b; font-size: 0.8rem;
                outline: none; font-family: inherit; transition: border-color 0.15s;
            }
            .nb-input-sm:focus { border-color: #3b82f6; }
            .nb-section-header {
                display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.75rem;
            }
            .nb-btn-add {
                padding: 0.375rem 0.75rem; background: #003B71; border: none; border-radius: 0.5rem;
                color: #fff; font-size: 0.75rem; font-weight: 600; cursor: pointer;
                display: flex; align-items: center; gap: 0.375rem; font-family: inherit; transition: background 0.15s;
            }
            .nb-btn-add:hover { background: #002a52; }
            .nb-list { display: flex; flex-direction: column; gap: 0.625rem; }
            .nb-link-card {
                background: #fff; border: 1px solid #e2e8f0; border-radius: 0.5rem; overflow: hidden;
            }
            .nb-link-card-header {
                padding: 0.625rem 0.875rem; background: #f8fafc; border-bottom: 1px solid #f1f5f9;
                display: flex; align-items: center; gap: 0.5rem;
            }
            .nb-link-card-body { padding: 0.75rem 0.875rem; display: flex; flex-direction: column; gap: 0.5rem; }
            .nb-link-row { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
            .nb-type-badge {
                font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 4px;
                text-transform: uppercase; letter-spacing: 0.05em;
            }
            .nb-type-link { background: #dbeafe; color: #1d4ed8; }
            .nb-type-submenu { background: #fef3c7; color: #b45309; }
            .nb-btn-remove {
                background: none; border: none; cursor: pointer; color: #ef4444; padding: 0.25rem;
                flex-shrink: 0; display: flex; align-items: center; justify-content: center;
                border-radius: 0.25rem; transition: background 0.15s;
            }
            .nb-btn-remove:hover { background: #fef2f2; }
            .nb-btn-sm-add {
                margin-top: 0.25rem; padding: 0.25rem 0.625rem; background: #e8f0f8; border: none;
                border-radius: 0.375rem; color: #003B71; font-size: 0.7rem; font-weight: 600;
                cursor: pointer; display: flex; align-items: center; gap: 0.25rem; font-family: inherit;
            }
            .nb-btn-sm-add:hover { background: #d1e3f5; }
            .nb-submenu-item { display: flex; gap: 0.5rem; align-items: center; }
            .nb-action-card {
                background: #fff; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 0.75rem;
                display: flex; flex-direction: column; gap: 0.5rem;
            }
            .nb-select {
                padding: 0.375rem 0.625rem; background: #f8fafc; border: 1px solid #e2e8f0;
                border-radius: 0.375rem; color: #1e293b; font-size: 0.8rem;
                outline: none; font-family: inherit;
            }
            .nb-modal-footer {
                padding: 1rem 1.25rem; border-top: 1px solid #f1f5f9;
                display: flex; gap: 0.75rem; justify-content: flex-end;
                background: #fff; flex-shrink: 0;
            }
            .nb-btn-cancel {
                padding: 0.5rem 1.25rem; background: #fff; border: 2px solid #e2e8f0;
                border-radius: 0.5rem; color: #475569; font-size: 0.875rem; font-weight: 500;
                cursor: pointer; font-family: inherit; transition: background 0.15s;
            }
            .nb-btn-cancel:hover { background: #f8fafc; border-color: #cbd5e1; }
            .nb-btn-save {
                padding: 0.5rem 1.25rem; background: #f0872a; border: none;
                border-radius: 0.5rem; color: #fff; font-size: 0.875rem; font-weight: 600;
                cursor: pointer; font-family: inherit; transition: background 0.15s;
            }
            .nb-btn-save:hover { background: #d97821; }
            .nb-pick-btn {
                flex-shrink: 0; padding: 0.5rem 0.875rem; background: #003B71; border: none;
                border-radius: 0.5rem; color: #fff; font-size: 0.8rem; font-weight: 600;
                cursor: pointer; display: flex; align-items: center; gap: 0.375rem;
                font-family: inherit; white-space: nowrap; transition: background 0.15s;
            }
            .nb-pick-btn:hover { background: #002a52; }
        `,document.head.appendChild(l)}const s=(()=>{try{return JSON.parse(e.getAttributes()["data-navbar-config"]||"{}")}catch{return{}}})(),c=s.logo_url||"",x=s.logo_alt||"",p=s.logo_text||"Logo",b=JSON.parse(JSON.stringify(s.links||[{type:"link",label:"Inicio",href:"/"},{type:"link",label:"Nosotros",href:"#"}])),o=JSON.parse(JSON.stringify(s.actions||[{label:"Ingresar",href:"#",style:"primary",icon:""}])),i=document.createElement("div");i.id="navbar-config-modal",i.className="nb-overlay";const n=document.createElement("div");n.className="nb-modal",n.innerHTML=`
        <div class="nb-modal-header">
            <div class="nb-modal-header-left">
                <i class="ri-layout-top-line"></i>
                <h2>Configurar Navbar</h2>
            </div>
            <button id="nb-modal-close" class="nb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="nb-modal-tabs">
            <button class="nb-tab-btn active" data-tab="logo"><i class="ri-image-line"></i> Logo</button>
            <button class="nb-tab-btn" data-tab="links"><i class="ri-menu-line"></i> Navegación</button>
            <button class="nb-tab-btn" data-tab="actions"><i class="ri-cursor-line"></i> Botones</button>
        </div>
        <div class="nb-modal-body">
            <div class="nb-tab-panel active" id="nb-panel-logo">
                <div class="nb-card">
                    <label class="nb-label">Imagen del logo</label>
                    <div class="nb-row" style="align-items:flex-start;flex-wrap:wrap;">
                        <div style="flex:1;min-width:200px;">
                            ${c?`<img id="nb-logo-preview" src="${c}" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;">`:'<div id="nb-logo-preview" style="display:none;"></div>'}
                            <input id="nb-logo-url" type="text" placeholder="URL del logo" value="${c}" class="nb-input" style="width:100%;">
                        </div>
                        <button id="nb-logo-pick" class="nb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Texto alternativo / Logo de texto</label>
                    <div class="nb-row">
                        <input id="nb-logo-alt" type="text" placeholder="Texto alternativo" value="${x}" class="nb-input">
                        <input id="nb-logo-text" type="text" placeholder="Texto si no hay imagen" value="${p}" class="nb-input">
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-links">
                <div class="nb-section-header">
                    <label class="nb-label" style="margin-bottom:0;">Elementos de navegación</label>
                    <div style="display:flex;gap:0.5rem;">
                        <button id="nb-add-link" class="nb-btn-add"><i class="ri-link"></i> Link</button>
                        <button id="nb-add-submenu" class="nb-btn-add" style="background:#b45309;"><i class="ri-arrow-down-s-line"></i> Submenú</button>
                    </div>
                </div>
                <div id="nb-links-list" class="nb-list"></div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-actions">
                <div class="nb-section-header">
                    <label class="nb-label" style="margin-bottom:0;">Botones de acción</label>
                    <button id="nb-add-action" class="nb-btn-add"><i class="ri-add-line"></i> Agregar botón</button>
                </div>
                <div id="nb-actions-list" class="nb-list"></div>
            </div>
        </div>
        <div class="nb-modal-footer">
            <button id="nb-modal-cancel" class="nb-btn-cancel">Cancelar</button>
            <button id="nb-modal-save" class="nb-btn-save">Aplicar cambios</button>
        </div>
    `,i.appendChild(n),document.body.appendChild(i),n.querySelectorAll(".nb-tab-btn").forEach(l=>{l.addEventListener("click",()=>{n.querySelectorAll(".nb-tab-btn").forEach(a=>a.classList.remove("active")),n.querySelectorAll(".nb-tab-panel").forEach(a=>a.classList.remove("active")),l.classList.add("active"),n.querySelector(`#nb-panel-${l.dataset.tab}`).classList.add("active")})}),n.querySelector("#nb-logo-pick").addEventListener("click",()=>{_({type:"image",title:"Seleccionar logo",onSelect:l=>{n.querySelector("#nb-logo-url").value=l;let a=n.querySelector("#nb-logo-preview");if(!a||a.tagName==="DIV"){const f=document.createElement("img");f.id="nb-logo-preview",f.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;",a?.replaceWith(f)??n.querySelector("#nb-logo-url").before(f),a=f}a.src=l,a.style.display="block"}})});function u(){const l=n.querySelector("#nb-links-list");l.innerHTML="",b.forEach((a,f)=>{const m=document.createElement("div");if(m.className="nb-link-card",m.dataset.index=f,a.type==="submenu"){const d=(a.children||[]).map((v,k)=>`
                    <div class="nb-submenu-item" data-child="${k}">
                        <input class="nb-input-sm" style="width:120px;" placeholder="ri-icon (opcional)" value="${v.icon||""}" data-field="icon">
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto" value="${v.label||""}" data-field="label">
                        <input class="nb-input-sm" style="flex:1;" placeholder="URL" value="${v.href||""}" data-field="href">
                        <button class="nb-btn-remove nb-remove-child"><i class="ri-delete-bin-line"></i></button>
                    </div>`).join("");m.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-type-badge nb-type-submenu">Submenú</span>
                        <input class="nb-input-sm" style="flex:1;" placeholder="Título del submenú" value="${a.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-list nb-children-list" style="gap:0.375rem;">${d}</div>
                        <button class="nb-btn-sm-add nb-add-child"><i class="ri-add-line"></i> Agregar sub-enlace</button>
                    </div>`}else m.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-type-badge nb-type-link">Link</span>
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${a.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-link-row">
                            <input class="nb-input-sm" style="flex:1;" placeholder="URL del enlace" value="${a.href||""}" data-field="href">
                        </div>
                    </div>`;m.querySelector(".nb-remove-link").onclick=()=>{b.splice(f,1),u()},m.querySelectorAll("[data-field]").forEach(d=>{d.addEventListener("input",()=>{a[d.dataset.field]=d.value})}),a.type==="submenu"&&(m.querySelector(".nb-add-child").onclick=()=>{a.children=a.children||[],a.children.push({label:"Nuevo enlace",href:"#",icon:""}),u()},m.querySelectorAll(".nb-remove-child").forEach(d=>{d.onclick=()=>{const v=parseInt(d.closest("[data-child]").dataset.child);a.children.splice(v,1),u()}}),m.querySelectorAll(".nb-submenu-item [data-field]").forEach(d=>{const v=parseInt(d.closest("[data-child]").dataset.child);d.addEventListener("input",()=>{a.children[v][d.dataset.field]=d.value})})),l.appendChild(m)})}function y(){const l=n.querySelector("#nb-actions-list");l.innerHTML="",o.forEach((a,f)=>{const m=document.createElement("div");m.className="nb-action-card",m.innerHTML=`
                <div class="nb-row">
                    <input class="nb-input-sm" style="width:120px;flex-shrink:0;" placeholder="ri-icon (opcional)" value="${a.icon||""}" data-field="icon">
                    <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${a.label||""}" data-field="label">
                    <button class="nb-btn-remove nb-remove-action"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="nb-row">
                    <input class="nb-input-sm" style="flex:1;" placeholder="URL" value="${a.href||""}" data-field="href">
                    <select class="nb-select" data-field="style">
                        <option value="primary" ${a.style==="primary"?"selected":""}>Azul sólido</option>
                        <option value="outline" ${a.style==="outline"?"selected":""}>Azul outline</option>
                        <option value="orange" ${a.style==="orange"?"selected":""}>Naranja</option>
                    </select>
                </div>`,m.querySelector(".nb-remove-action").onclick=()=>{o.splice(f,1),y()},m.querySelectorAll("[data-field]").forEach(d=>{d.addEventListener("input",()=>{a[d.dataset.field]=d.value}),d.addEventListener("change",()=>{a[d.dataset.field]=d.value})}),l.appendChild(m)})}u(),y(),n.querySelector("#nb-add-link").onclick=()=>{b.push({type:"link",label:"Nuevo enlace",href:"#"}),u()},n.querySelector("#nb-add-submenu").onclick=()=>{b.push({type:"submenu",label:"Menú",children:[{label:"Enlace",href:"#",icon:""}]}),u()},n.querySelector("#nb-add-action").onclick=()=>{o.push({label:"Botón",href:"#",style:"primary",icon:""}),y()};const g=()=>i.remove();n.querySelector("#nb-modal-close").onclick=g,n.querySelector("#nb-modal-cancel").onclick=g,i.onclick=l=>{l.target===i&&g()},n.querySelector("#nb-modal-save").onclick=()=>{const l={logo_url:n.querySelector("#nb-logo-url").value.trim(),logo_alt:n.querySelector("#nb-logo-alt").value.trim(),logo_text:n.querySelector("#nb-logo-text").value.trim(),links:b,actions:o},f=e.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||null;e.addAttributes({"data-navbar-config":JSON.stringify(l)}),e.components(L(l,f)+S),g()}}function P(t){const e="navbar-component";t.DomComponents.addType(e,{isComponent:r=>r.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Navbar",tagName:"nav",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,class:"nb-wrapper","data-navbar-config":JSON.stringify({logo_url:"",logo_alt:"Logo",logo_text:"Logo",links:[{type:"link",label:"Sobre nosotros",href:"#"},{type:"link",label:"Créditos",href:"#"},{type:"link",label:"Depósitos",href:"#"},{type:"submenu",label:"Otros servicios",children:[{label:"Servicio 1",href:"#",icon:""},{label:"Servicio 2",href:"#",icon:""}]},{type:"link",label:"Contáctanos",href:"#"}],actions:[{label:"Ingresar",href:"#",style:"primary",icon:""}]})},components:L({logo_url:"",logo_alt:"Logo",logo_text:"Logo",links:[{type:"link",label:"Sobre nosotros",href:"#"},{type:"link",label:"Créditos",href:"#"},{type:"link",label:"Depósitos",href:"#"},{type:"submenu",label:"Otros servicios",children:[{label:"Servicio 1",href:"#",icon:""},{label:"Servicio 2",href:"#",icon:""}]},{type:"link",label:"Contáctanos",href:"#"}],actions:[{label:"Ingresar",href:"#",style:"primary",icon:""}]})+S,script:O(),toolbar:[],traits:[{type:"button",label:"Navbar",text:"Administrar Navbar",full:!0,command:"open-navbar-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-navbar-config",{run(r){const s=r.getSelected();s&&D(r,s)}}),t.BlockManager.add("navbar-block",{label:"Navbar",category:"Navbar",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="12" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="17" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="22" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="24" y="11" width="6" height="10" rx="2" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),G(t,e),J(t)}function G(t,e){t.on("storage:end:load",()=>{setTimeout(()=>$(t,e),800)}),t.on("component:mount",r=>{const s=r.getEl();s?.getAttribute?.("data-gjs-type")===e&&(r.set("type",e),setTimeout(()=>{const c=r.get("script");c&&typeof c=="function"&&c.call(s)},400))}),t.on("canvas:render",()=>{setTimeout(()=>$(t,e),600)})}function $(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(r=>{r.set("type",e);const s=r.getEl();if(s?.isConnected){const c=r.get("script");c&&typeof c=="function"&&c.call(s)}})}function J(t){t.on("load",()=>{const e=t.Canvas.getFrameEl();if(!e)return;const r=e.contentDocument?.head;if(r&&!r.querySelector("#navbar-component-css")){const s=document.createElement("style");s.id="navbar-component-css",s.textContent=`
                [data-gjs-type="navbar-component"] {
                    outline: 2px dashed rgba(240,135,42,0.4);
                    outline-offset: 2px;
                    /* Override fixed en el editor para visibilidad */
                    position: relative !important;
                    top: auto !important;
                }
                body {
                    padding-top: 0 !important;
                }
            `,r.appendChild(s)}})}document.addEventListener("DOMContentLoaded",async()=>{const t=new A;let e=document.getElementById("navbar-id")?.value||"",r=document.getElementById("navbar-name")?.value||"",s=document.getElementById("navbar-load-url")?.value||"",c=document.getElementById("navbar-store-url")?.value||"";const x=document.getElementById("navbar-is-active")?.value==="1";let p=!!e;const b=U();if(P(b),b.on("load",()=>{C(b),j(),N(),I(b),q(b),z(b),T(b),R(b),setTimeout(()=>{b.runCommand("sw-visibility"),b.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),p&&s)try{await t.loadPageContent(b,s),h("Navbar cargado correctamente","success")}catch{h("Error al cargar el navbar","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const i=document.getElementById("save-button");i.disabled=!0,i.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!p&&!r?M({title:"Nombre del Navbar",description:"Ingresa un nombre descriptivo para identificar este navbar.",placeholder:"Ej: Navbar Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async n=>{if(!n?.trim()){h("El nombre es obligatorio","error"),i.disabled=!1,i.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await o(n)}catch(u){h(u.message,"error")}finally{i.disabled=!1,i.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{i.disabled=!1,i.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await o(r),i.disabled=!1,i.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(n){h(n.message,"error"),i.disabled=!1,i.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function o(i){const n=p?"PUT":"POST",u=t.getEditorContent(b),y=await t.savePage(b,{...u,name:i,is_active:x},c,n);if(y.success){if(t.markAsClean(),h(y.message,"success"),!p&&y.navbar){e=y.navbar.id,r=y.navbar.name,p=!0;const g=document.getElementById("navbar-id");g&&(g.value=e);const l=document.getElementById("navbar-name");l&&(l.value=r);const a=document.querySelector('meta[name="app-url"]'),f=a?a.content:"";c=c.endsWith("/navbars")?`${c}/${e}`:`${c.replace(/\/navbars\/?$/,"")}/navbars/${e}`;const d=document.getElementById("navbar-store-url");d&&(d.value=c),s=`${c}/load`;const v=document.getElementById("navbar-load-url");v&&(v.value=s);const k=document.getElementById("editor-title");k&&(k.textContent=`Editando Navbar: ${r}`);const w=`/navbars/edit/${e}/edit`,E=f?`${f}${w}`:w;window.history.replaceState({path:E},"",E)}else if(i){r=i;const g=document.getElementById("navbar-name");g&&(g.value=r);const l=document.getElementById("editor-title");l&&(l.textContent=`Editando Navbar: ${r}`)}}}});function R(t){t.Commands.add("canvas-clear",{run:e=>{H({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{e.DomComponents.clear(),e.CssComposer.clear()}})}})}function h(t,e="info"){typeof window.showNotification=="function"&&window.showNotification(t,e)}
