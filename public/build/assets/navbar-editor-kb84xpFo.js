import{i as C,t as B,d as N,f as q,e as I,s as A,g as _,c as z,E as T,j as M,h as H}from"./editor-commands-5w86-EOS.js";import{o as U}from"./media-picker-CiKJ1Agb.js";import"./_commonjsHelpers-CqkleIqs.js";function D(){return C()}const P=`(function(){
function initNavbar(root){
    if(!root||root.__nbInit)return;
    root.__nbInit=true;
    var id=root.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");
    if(!id)return;
    function pad(){document.body.style.paddingTop=root.offsetHeight+"px";}
    pad();
    window.addEventListener("resize",function(){
        pad();
        if(window.innerWidth>992&&mobile&&mobile.classList.contains("nb-open")){
            mobile.classList.remove("nb-open");
        }
    });
    var toggle=document.getElementById("nb-toggle-"+id);
    var mobile=document.getElementById("nb-mobile-"+id);
    if(toggle&&mobile){
        toggle.addEventListener("click",function(){
            mobile.classList.toggle("nb-open");
            pad();
        });
    }
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
        btn.addEventListener("click",function(){
            btn.closest(".nb-mobile-item").classList.toggle("nb-open");
            pad();
        });
    });
    document.addEventListener("click",function(e){
        if(!root.contains(e.target)){
            root.querySelectorAll(".nb-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
        }
    });
}
document.querySelectorAll("nav[data-gjs-type='navbar-component'], nav.nb-wrapper").forEach(function(el){
    initNavbar(el);
});
if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",function(){
        document.querySelectorAll("nav[data-gjs-type='navbar-component'], nav.nb-wrapper").forEach(function(el){
            initNavbar(el);
        });
    });
}
})();`,S=`
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
    padding: 0 4rem;
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
    background: #E97300;
    color: #ffffff;
}
.nb-item.nb-open > .nb-link {
    background: #E97300;
    color: #ffffff;
}
.nb-link i {
    font-size: 0.875rem;
    transition: transform 0.2s;
}
.nb-item.nb-open > .nb-link i.nb-chevron,
.nb-link:hover i.nb-chevron {
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
    padding: 1rem 4rem;
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
@media (max-width: 1280px) {
    .nb-inner { padding: 0 2.5rem; }
    .nb-mobile-menu { padding: 1rem 2.5rem; }
}
@media (max-width: 992px) {
    .nb-mobile-menu { padding: 1rem 1.5rem; }
    .nb-inner { padding: 0 1.5rem; }
    .nb-links, .nb-actions { display: none; }
    .nb-hamburger { display: flex; }
}
</style>`;function $(o,n){n=n||"nb"+Math.random().toString(36).slice(2,7);const t=o.logo_url?`<img src="${o.logo_url}" alt="${o.logo_alt||"Logo"}">`:`<span class="nb-logo-text">${o.logo_text||"Logo"}</span>`,l=(o.links||[]).map(e=>{if(e.type==="submenu"&&e.children?.length){const d=e.children.map(a=>{const i=a.icon?`<i class="${a.icon}"></i>`:"";return`<li><a href="${a.href||"#"}" class="nb-submenu-link">${i}${a.label}</a></li>`}).join("");return`<li class="nb-item nb-has-submenu"><button class="nb-link nb-submenu-trigger" type="button">${e.label}<i class="ri-arrow-down-s-line nb-chevron"></i></button><ul class="nb-submenu">${d}</ul></li>`}return`<li class="nb-item"><a href="${e.href||"#"}" class="nb-link">${e.label}</a></li>`}).join(""),b=(o.actions||[]).map(e=>{const d=e.icon?`<i class="${e.icon}"></i>`:"";return`<a href="${e.href||"#"}" class="nb-btn nb-btn-${e.style||"primary"}">${d}${e.label}</a>`}).join(""),v=(o.links||[]).map(e=>{if(e.type==="submenu"&&e.children?.length){const d=e.children.map(a=>{const i=a.icon?`<i class="${a.icon}"></i>`:"";return`<a href="${a.href||"#"}" class="nb-mobile-submenu-link">${i}${a.label}</a>`}).join("");return`<div class="nb-mobile-item"><button class="nb-mobile-link" type="button">${e.label}<i class="ri-arrow-down-s-line"></i></button><div class="nb-mobile-submenu">${d}</div></div>`}return`<a href="${e.href||"#"}" class="nb-mobile-link">${e.label}</a>`}).join(""),p=(o.actions||[]).map(e=>{const d=e.icon?`<i class="${e.icon}"></i>`:"";return`<a href="${e.href||"#"}" class="nb-btn nb-btn-${e.style||"primary"}">${d}${e.label}</a>`}).join("");return`<div id="nb-root-${n}" class="nb-inner" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div class="nb-logo" data-gjs-editable="false" data-gjs-selectable="false">${t}</div><ul class="nb-links" data-gjs-editable="false" data-gjs-selectable="false">${l}</ul><div class="nb-actions" data-gjs-editable="false" data-gjs-selectable="false">${b}</div><button class="nb-hamburger" type="button" id="nb-toggle-${n}" aria-label="Menú" data-gjs-editable="false" data-gjs-selectable="false"><span></span><span></span><span></span></button></div><div class="nb-mobile-menu" id="nb-mobile-${n}" data-gjs-editable="false" data-gjs-selectable="false">${v}${p?`<div class="nb-mobile-actions">${p}</div>`:""}</div>`}function O(o,n){const t=document.getElementById("navbar-config-modal");if(t&&t.remove(),!document.getElementById("nb-modal-styles")){const s=document.createElement("style");s.id="nb-modal-styles",s.textContent=`
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
        `,document.head.appendChild(s)}const l=(()=>{try{return JSON.parse(n.getAttributes()["data-navbar-config"]||"{}")}catch{return{}}})(),b=l.logo_url||"",v=l.logo_alt||"",p=l.logo_text||"Logo",e=JSON.parse(JSON.stringify(l.links||[{type:"link",label:"Inicio",href:"/"},{type:"link",label:"Nosotros",href:"#"}])),d=JSON.parse(JSON.stringify(l.actions||[{label:"Ingresar",href:"#",style:"primary",icon:""}])),a=document.createElement("div");a.id="navbar-config-modal",a.className="nb-overlay";const i=document.createElement("div");i.className="nb-modal",i.innerHTML=`
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
                            ${b?`<img id="nb-logo-preview" src="${b}" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;">`:'<div id="nb-logo-preview" style="display:none;"></div>'}
                            <input id="nb-logo-url" type="text" placeholder="URL del logo" value="${b}" class="nb-input" style="width:100%;">
                        </div>
                        <button id="nb-logo-pick" class="nb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Texto alternativo / Logo de texto</label>
                    <div class="nb-row">
                        <input id="nb-logo-alt" type="text" placeholder="Texto alternativo" value="${v}" class="nb-input">
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
    `,a.appendChild(i),document.body.appendChild(a),i.querySelectorAll(".nb-tab-btn").forEach(s=>{s.addEventListener("click",()=>{i.querySelectorAll(".nb-tab-btn").forEach(r=>r.classList.remove("active")),i.querySelectorAll(".nb-tab-panel").forEach(r=>r.classList.remove("active")),s.classList.add("active"),i.querySelector(`#nb-panel-${s.dataset.tab}`).classList.add("active")})}),i.querySelector("#nb-logo-pick").addEventListener("click",()=>{U({type:"image",title:"Seleccionar logo",onSelect:s=>{i.querySelector("#nb-logo-url").value=s;let r=i.querySelector("#nb-logo-preview");if(!r||r.tagName==="DIV"){const u=document.createElement("img");u.id="nb-logo-preview",u.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;",r?.replaceWith(u)??i.querySelector("#nb-logo-url").before(u),r=u}r.src=s,r.style.display="block"}})});function f(){const s=i.querySelector("#nb-links-list");s.innerHTML="",e.forEach((r,u)=>{const m=document.createElement("div");if(m.className="nb-link-card",m.dataset.index=u,r.type==="submenu"){const c=(r.children||[]).map((h,k)=>`
                    <div class="nb-submenu-item" data-child="${k}">
                        <input class="nb-input-sm" style="width:120px;" placeholder="ri-icon (opcional)" value="${h.icon||""}" data-field="icon">
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto" value="${h.label||""}" data-field="label">
                        <input class="nb-input-sm" style="flex:1;" placeholder="URL" value="${h.href||""}" data-field="href">
                        <button class="nb-btn-remove nb-remove-child"><i class="ri-delete-bin-line"></i></button>
                    </div>`).join("");m.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-type-badge nb-type-submenu">Submenú</span>
                        <input class="nb-input-sm" style="flex:1;" placeholder="Título del submenú" value="${r.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-list nb-children-list" style="gap:0.375rem;">${c}</div>
                        <button class="nb-btn-sm-add nb-add-child"><i class="ri-add-line"></i> Agregar sub-enlace</button>
                    </div>`}else m.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-type-badge nb-type-link">Link</span>
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${r.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-link-row">
                            <input class="nb-input-sm" style="flex:1;" placeholder="URL del enlace" value="${r.href||""}" data-field="href">
                        </div>
                    </div>`;m.querySelector(".nb-remove-link").onclick=()=>{e.splice(u,1),f()},m.querySelectorAll("[data-field]").forEach(c=>{c.addEventListener("input",()=>{r[c.dataset.field]=c.value})}),r.type==="submenu"&&(m.querySelector(".nb-add-child").onclick=()=>{r.children=r.children||[],r.children.push({label:"Nuevo enlace",href:"#",icon:""}),f()},m.querySelectorAll(".nb-remove-child").forEach(c=>{c.onclick=()=>{const h=parseInt(c.closest("[data-child]").dataset.child);r.children.splice(h,1),f()}}),m.querySelectorAll(".nb-submenu-item [data-field]").forEach(c=>{const h=parseInt(c.closest("[data-child]").dataset.child);c.addEventListener("input",()=>{r.children[h][c.dataset.field]=c.value})})),s.appendChild(m)})}function g(){const s=i.querySelector("#nb-actions-list");s.innerHTML="",d.forEach((r,u)=>{const m=document.createElement("div");m.className="nb-action-card",m.innerHTML=`
                <div class="nb-row">
                    <input class="nb-input-sm" style="width:120px;flex-shrink:0;" placeholder="ri-icon (opcional)" value="${r.icon||""}" data-field="icon">
                    <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${r.label||""}" data-field="label">
                    <button class="nb-btn-remove nb-remove-action"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="nb-row">
                    <input class="nb-input-sm" style="flex:1;" placeholder="URL" value="${r.href||""}" data-field="href">
                    <select class="nb-select" data-field="style">
                        <option value="primary" ${r.style==="primary"?"selected":""}>Azul sólido</option>
                        <option value="outline" ${r.style==="outline"?"selected":""}>Azul outline</option>
                        <option value="orange" ${r.style==="orange"?"selected":""}>Naranja</option>
                    </select>
                </div>`,m.querySelector(".nb-remove-action").onclick=()=>{d.splice(u,1),g()},m.querySelectorAll("[data-field]").forEach(c=>{c.addEventListener("input",()=>{r[c.dataset.field]=c.value}),c.addEventListener("change",()=>{r[c.dataset.field]=c.value})}),s.appendChild(m)})}f(),g(),i.querySelector("#nb-add-link").onclick=()=>{e.push({type:"link",label:"Nuevo enlace",href:"#"}),f()},i.querySelector("#nb-add-submenu").onclick=()=>{e.push({type:"submenu",label:"Menú",children:[{label:"Enlace",href:"#",icon:""}]}),f()},i.querySelector("#nb-add-action").onclick=()=>{d.push({label:"Botón",href:"#",style:"primary",icon:""}),g()};const y=()=>a.remove();i.querySelector("#nb-modal-close").onclick=y,i.querySelector("#nb-modal-cancel").onclick=y,a.onclick=s=>{s.target===a&&y()},i.querySelector("#nb-modal-save").onclick=()=>{const s={logo_url:i.querySelector("#nb-logo-url").value.trim(),logo_alt:i.querySelector("#nb-logo-alt").value.trim(),logo_text:i.querySelector("#nb-logo-text").value.trim(),links:e,actions:d},m=n.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||null||"nb"+Math.random().toString(36).slice(2,7);n.addAttributes({"data-navbar-config":JSON.stringify(s)}),n.components($(s,m)+S),y()}}function G(o){const n="navbar-component";o.DomComponents.addType(n,{isComponent:t=>t.getAttribute?.("data-gjs-type")===n?{type:n}:!1,model:{defaults:{name:"Navbar",tagName:"nav",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":n,class:"nb-wrapper","data-navbar-config":JSON.stringify({logo_url:"",logo_alt:"Logo",logo_text:"Logo",links:[{type:"link",label:"Sobre nosotros",href:"#"},{type:"link",label:"Créditos",href:"#"},{type:"link",label:"Depósitos",href:"#"},{type:"submenu",label:"Otros servicios",children:[{label:"Servicio 1",href:"#",icon:""},{label:"Servicio 2",href:"#",icon:""}]},{type:"link",label:"Contáctanos",href:"#"}],actions:[{label:"Ingresar",href:"#",style:"primary",icon:""}]})},components:$({logo_url:"",logo_alt:"Logo",logo_text:"Logo",links:[{type:"link",label:"Sobre nosotros",href:"#"},{type:"link",label:"Créditos",href:"#"},{type:"link",label:"Depósitos",href:"#"},{type:"submenu",label:"Otros servicios",children:[{label:"Servicio 1",href:"#",icon:""},{label:"Servicio 2",href:"#",icon:""}]},{type:"link",label:"Contáctanos",href:"#"}],actions:[{label:"Ingresar",href:"#",style:"primary",icon:""}]})+S,script:function(){(function(t){if(!t||typeof t.querySelector!="function"||t.__nbInit)return;t.__nbInit=!0;var l=t.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");if(!l)return;var b=!!window.__gjseditor||document.documentElement.hasAttribute("data-gjs-canvas");function v(){b||(document.body.style.paddingTop=t.offsetHeight+"px")}v(),window.addEventListener("resize",v);var p=document.getElementById("nb-toggle-"+l),e=document.getElementById("nb-mobile-"+l);p&&e&&p.addEventListener("click",function(){e.classList.toggle("nb-open"),v()}),t.querySelectorAll(".nb-submenu-trigger").forEach(function(d){d.addEventListener("click",function(a){a.stopPropagation();var i=d.closest(".nb-item"),f=i.classList.contains("nb-open");t.querySelectorAll(".nb-item.nb-open").forEach(function(g){g.classList.remove("nb-open")}),f||i.classList.add("nb-open")})}),t.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(d){d.addEventListener("click",function(){d.closest(".nb-mobile-item").classList.toggle("nb-open"),v()})}),document.addEventListener("click",function(d){t.contains(d.target)||t.querySelectorAll(".nb-item.nb-open").forEach(function(a){a.classList.remove("nb-open")})})})(this)},"script-props":[],toolbar:[],traits:[{type:"button",label:"Navbar",text:"Administrar Navbar",full:!0,command:"open-navbar-config"}]},init(){this.set("type",n),this.addAttributes({"data-gjs-type":n})}}}),o.Commands.add("open-navbar-config",{run(t){const l=t.getSelected();l&&O(t,l)}}),o.BlockManager.add("navbar-block",{label:"Navbar",category:"Navbar",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="12" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="17" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="22" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="24" y="11" width="6" height="10" rx="2" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:n,attributes:{"data-gjs-type":n}}}),J(o,n),R(o)}function J(o,n){o.on("storage:end:load",()=>{setTimeout(()=>L(o,n),800)}),o.on("component:mount",t=>{const l=t.getEl();l?.getAttribute?.("data-gjs-type")===n&&(t.set("type",n),setTimeout(()=>j(o,l),400))}),o.on("canvas:render",()=>{setTimeout(()=>L(o,n),600)})}function j(o,n){if(n?.isConnected)try{const t=o.Canvas.getFrameEl()?.contentDocument;if(!t)return;n.__nbInit&&delete n.__nbInit;const l=t.createElement("script");l.textContent=`(function(){
            function initNavbar(root){
                if(!root||root.__nbInit)return;
                root.__nbInit=true;
                var id=root.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");
                if(!id)return;
                function pad(){document.body.style.paddingTop=root.offsetHeight+"px";}
                pad();
                window.addEventListener("resize", function () {
                    pad();
                    if (window.innerWidth > 992 && mobile && mobile.classList.contains("nb-open")) {
                        mobile.classList.remove("nb-open");
                    }
                });
                var toggle=document.getElementById("nb-toggle-"+id);
                var mobile=document.getElementById("nb-mobile-"+id);
                if(toggle&&mobile){
                    toggle.addEventListener("click",function(){mobile.classList.toggle("nb-open");pad();});
                }
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
                    if(!root.contains(e.target)){root.querySelectorAll(".nb-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});}
                });
            }
            document.querySelectorAll("nav[data-gjs-type='navbar-component']").forEach(function(nav){
                initNavbar(nav);
            });
        })();`,t.head.appendChild(l),l.remove()}catch(t){console.warn("[Navbar] Error inyectando script en canvas:",t)}}function L(o,n){o.getWrapper().find(`[data-gjs-type="${n}"]`).forEach(t=>{t.set("type",n);const l=t.getEl();l?.isConnected&&j(o,l)})}function R(o){o.on("load",()=>{const n=o.Canvas.getFrameEl();if(!n)return;const t=n.contentDocument,l=t?.head;if(l&&(t.documentElement?.setAttribute("data-gjs-canvas","true"),!l.querySelector("#navbar-component-css"))){const b=document.createElement("style");b.id="navbar-component-css",b.textContent=`
                [data-gjs-type="navbar-component"] {
                    outline: 2px dashed rgba(240,135,42,0.4);
                    outline-offset: 2px;
                    position: relative !important;
                    top: auto !important;
                }
                body {
                    padding-top: 0 !important;
                }
            `,l.appendChild(b)}})}document.addEventListener("DOMContentLoaded",async()=>{const o=new T;let n=document.getElementById("navbar-id")?.value||"",t=document.getElementById("navbar-name")?.value||"",l=document.getElementById("navbar-load-url")?.value||"",b=document.getElementById("navbar-store-url")?.value||"";const v=document.getElementById("navbar-is-active")?.value==="1";let p=!!n;const e=D();if(G(e),e.on("load",()=>{B(e),N(),q(),I(e),A(e),_(e),z(e),W(e),setTimeout(()=>{e.runCommand("sw-visibility"),e.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),p&&l)try{await o.loadPageContent(e,l),x("Navbar cargado correctamente","success")}catch{x("Error al cargar el navbar","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const a=document.getElementById("save-button");a.disabled=!0,a.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!p&&!t?M({title:"Nombre del Navbar",description:"Ingresa un nombre descriptivo para identificar este navbar.",placeholder:"Ej: Navbar Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async i=>{if(!i?.trim()){x("El nombre es obligatorio","error"),a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await d(i)}catch(f){x(f.message,"error")}finally{a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await d(t),a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(i){x(i.message,"error"),a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function d(a){const i=p?"PUT":"POST",f=o.getEditorContent(e);(!f.js_content||f.js_content.trim()==="")&&(f.js_content=P);const g=await o.savePage(e,{...f,name:a,is_active:v},b,i);if(g.success){if(o.markAsClean(),x(g.message,"success"),!p&&g.navbar){n=g.navbar.id,t=g.navbar.name,p=!0;const y=document.getElementById("navbar-id");y&&(y.value=n);const s=document.getElementById("navbar-name");s&&(s.value=t);const r=document.querySelector('meta[name="app-url"]'),u=r?r.content:"";b=b.endsWith("/navbars")?`${b}/${n}`:`${b.replace(/\/navbars\/?$/,"")}/navbars/${n}`;const c=document.getElementById("navbar-store-url");c&&(c.value=b),l=`${b}/load`;const h=document.getElementById("navbar-load-url");h&&(h.value=l);const k=document.getElementById("editor-title");k&&(k.textContent=`Editando Navbar: ${t}`);const E=`/navbars/edit/${n}/edit`,w=u?`${u}${E}`:E;window.history.replaceState({path:w},"",w)}else if(a){t=a;const y=document.getElementById("navbar-name");y&&(y.value=t);const s=document.getElementById("editor-title");s&&(s.textContent=`Editando Navbar: ${t}`)}}}});function W(o){o.Commands.add("canvas-clear",{run:n=>{H({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{n.DomComponents.clear(),n.CssComposer.clear()}})}})}function x(o,n="info"){typeof window.showNotification=="function"&&window.showNotification(o,n)}
