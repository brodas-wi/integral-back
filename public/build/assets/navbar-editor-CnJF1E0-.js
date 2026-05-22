import{i as D,t as U,d as P,f as O,e as R,s as G,g as J,c as V,E as W,j as F,h as X}from"./editor-commands-5w86-EOS.js";import{o as Q}from"./media-picker-CiKJ1Agb.js";import"./_commonjsHelpers-CqkleIqs.js";function Y(){return D()}const K=`(function(){
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
})();`,z=`
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
.nb-logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
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
</style>`;function M(l,t){t=t||"nb"+Math.random().toString(36).slice(2,7);const a=l.logo_href||"/",s=l.logo_url?`<img src="${l.logo_url}" alt="${l.logo_alt||"Logo"}">`:`<span class="nb-logo-text">${l.logo_text||"Logo"}</span>`,g=`<a href="${a}" class="nb-logo-link">${s}</a>`,S=(l.links||[]).map(n=>{if(n.type==="submenu"&&n.children?.length){const d=n.children.map(o=>{const y=o.icon?`<i class="${o.icon}"></i>`:"";return`<li><a href="${o.href||"#"}" class="nb-submenu-link">${y}${o.label}</a></li>`}).join("");return`<li class="nb-item nb-has-submenu"><button class="nb-link nb-submenu-trigger" type="button">${n.label}<i class="ri-arrow-down-s-line nb-chevron"></i></button><ul class="nb-submenu">${d}</ul></li>`}return`<li class="nb-item"><a href="${n.href||"#"}" class="nb-link">${n.label}</a></li>`}).join(""),x=(l.actions||[]).map(n=>{const d=n.icon?`<i class="${n.icon}"></i>`:"";return`<a href="${n.href||"#"}" class="nb-btn nb-btn-${n.style||"primary"}">${d}${n.label}</a>`}).join(""),m=(l.links||[]).map(n=>{if(n.type==="submenu"&&n.children?.length){const d=n.children.map(o=>{const y=o.icon?`<i class="${o.icon}"></i>`:"";return`<a href="${o.href||"#"}" class="nb-mobile-submenu-link">${y}${o.label}</a>`}).join("");return`<div class="nb-mobile-item"><button class="nb-mobile-link" type="button">${n.label}<i class="ri-arrow-down-s-line"></i></button><div class="nb-mobile-submenu">${d}</div></div>`}return`<a href="${n.href||"#"}" class="nb-mobile-link">${n.label}</a>`}).join(""),p=(l.actions||[]).map(n=>{const d=n.icon?`<i class="${n.icon}"></i>`:"";return`<a href="${n.href||"#"}" class="nb-btn nb-btn-${n.style||"primary"}">${d}${n.label}</a>`}).join("");return`<div id="nb-root-${t}" class="nb-inner" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div class="nb-logo" data-gjs-editable="false" data-gjs-selectable="false">${g}</div><ul class="nb-links" data-gjs-editable="false" data-gjs-selectable="false">${S}</ul><div class="nb-actions" data-gjs-editable="false" data-gjs-selectable="false">${x}</div><button class="nb-hamburger" type="button" id="nb-toggle-${t}" aria-label="Menú" data-gjs-editable="false" data-gjs-selectable="false"><span></span><span></span><span></span></button></div><div class="nb-mobile-menu" id="nb-mobile-${t}" data-gjs-editable="false" data-gjs-selectable="false">${m}${p?`<div class="nb-mobile-actions">${p}</div>`:""}</div>`}function Z(l,t){const a=document.getElementById("navbar-config-modal");if(a&&a.remove(),!document.getElementById("nb-modal-styles")){const r=document.createElement("style");r.id="nb-modal-styles",r.textContent=`
            .nb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .nb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:780px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .nb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .nb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .nb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .nb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .nb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .nb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .nb-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
            .nb-tab-btn{padding:0.75rem 1.25rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;}
            .nb-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .nb-tab-btn i{font-size:1rem;}
            .nb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .nb-modal-body::-webkit-scrollbar{width:5px;}
            .nb-modal-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
            .nb-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .nb-tab-panel.active{display:flex;}
            .nb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .nb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .nb-row{display:flex;gap:0.75rem;align-items:center;}
            .nb-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;}
            .nb-input:focus{border-color:#3b82f6;}
            .nb-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;transition:border-color 0.15s;}
            .nb-input-sm:focus{border-color:#3b82f6;}
            .nb-list{display:flex;flex-direction:column;gap:0.625rem;}
            .nb-link-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;overflow:visible;cursor:default;}
            .nb-link-card.nb-dragging{opacity:0.4;}
            .nb-link-card.nb-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
            .nb-link-card-header{padding:0.625rem 0.875rem;background:#f8fafc;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:0.5rem;border-radius:0.5rem 0.5rem 0 0;}
            .nb-link-card-body{padding:0.75rem 0.875rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-link-row{display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;}
            .nb-drag-handle{cursor:grab;color:#94a3b8;display:flex;align-items:center;padding:0 0.125rem;flex-shrink:0;}
            .nb-drag-handle:hover{color:#475569;}
            .nb-drag-handle:active{cursor:grabbing;}
            .nb-type-badge{font-size:0.65rem;font-weight:700;padding:2px 6px;border-radius:4px;text-transform:uppercase;letter-spacing:0.05em;cursor:pointer;transition:opacity 0.15s;user-select:none;}
            .nb-type-badge:hover{opacity:0.75;}
            .nb-type-link{background:#dbeafe;color:#1d4ed8;}
            .nb-type-submenu{background:#fef3c7;color:#b45309;}
            .nb-type-badge-hint{font-size:0.6rem;color:#94a3b8;margin-left:0.125rem;}
            .nb-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:0.25rem;transition:background 0.15s;}
            .nb-btn-remove:hover{background:#fef2f2;}
            .nb-btn-sm-add{padding:0.25rem 0.625rem;background:#e8f0f8;border:none;border-radius:0.375rem;color:#003B71;font-size:0.7rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;}
            .nb-btn-sm-add:hover{background:#d1e3f5;}
            .nb-submenu-item{display:flex;gap:0.5rem;align-items:center;}
            .nb-action-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-action-card.nb-dragging{opacity:0.4;}
            .nb-action-card.nb-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
            .nb-select{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;}
            .nb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .nb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .nb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-btn-save:hover{background:#d97821;}
            .nb-pick-btn{flex-shrink:0;padding:0.5rem 0.875rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.8rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .nb-pick-btn:hover{background:#002a52;}
            .nb-add-row{display:flex;gap:0.5rem;padding-top:0.25rem;}
            .nb-btn-add{padding:0.375rem 0.75rem;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;}
            .nb-btn-add-link{background:#003B71;}
            .nb-btn-add-link:hover{background:#002a52;}
            .nb-btn-add-submenu{background:#b45309;}
            .nb-btn-add-submenu:hover{background:#92400e;}
            .nb-btn-add-action{background:#003B71;}
            .nb-btn-add-action:hover{background:#002a52;}
        `,document.head.appendChild(r)}const s=(()=>{try{return JSON.parse(t.getAttributes()["data-navbar-config"]||"{}")}catch{return{}}})(),g=s.logo_url||"",S=s.logo_alt||"",x=s.logo_text||"Logo",m=s.logo_href||"/",p=JSON.parse(JSON.stringify(s.links||[{type:"link",label:"Inicio",href:"/"},{type:"link",label:"Nosotros",href:"#"}])),n=JSON.parse(JSON.stringify(s.actions||[{label:"Ingresar",href:"#",style:"primary",icon:""}])),d=document.createElement("div");d.id="navbar-config-modal",d.className="nb-overlay";const o=document.createElement("div");o.className="nb-modal",o.innerHTML=`
        <div class="nb-modal-header">
            <div class="nb-modal-header-left"><i class="ri-layout-top-line"></i><h2>Configurar Navbar</h2></div>
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
                            ${g?`<img id="nb-logo-preview" src="${g}" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;">`:'<div id="nb-logo-preview" style="display:none;"></div>'}
                            <input id="nb-logo-url" type="text" placeholder="URL del logo" value="${g}" class="nb-input" style="width:100%;">
                        </div>
                        <button id="nb-logo-pick" class="nb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Enlace del logo</label>
                    <input id="nb-logo-href" type="text" placeholder="Ej: / o https://..." value="${m}" class="nb-input" style="width:100%;">
                </div>
                <div class="nb-card">
                    <label class="nb-label">Texto alternativo / Logo de texto</label>
                    <div class="nb-row">
                        <input id="nb-logo-alt"  type="text" placeholder="Texto alternativo"      value="${S}"  class="nb-input">
                        <input id="nb-logo-text" type="text" placeholder="Texto si no hay imagen" value="${x}" class="nb-input">
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-links">
                <div id="nb-links-list" class="nb-list"></div>
                <div class="nb-add-row">
                    <button id="nb-add-link"    class="nb-btn-add nb-btn-add-link"><i class="ri-link"></i> Agregar link</button>
                    <button id="nb-add-submenu" class="nb-btn-add nb-btn-add-submenu"><i class="ri-arrow-down-s-line"></i> Agregar submenú</button>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-actions">
                <div id="nb-actions-list" class="nb-list"></div>
                <div class="nb-add-row">
                    <button id="nb-add-action" class="nb-btn-add nb-btn-add-action"><i class="ri-add-line"></i> Agregar botón</button>
                </div>
            </div>
        </div>
        <div class="nb-modal-footer">
            <button id="nb-modal-cancel" class="nb-btn-cancel">Cancelar</button>
            <button id="nb-modal-save"   class="nb-btn-save">Aplicar cambios</button>
        </div>`,d.appendChild(o),document.body.appendChild(d),o.querySelectorAll(".nb-tab-btn").forEach(r=>{r.addEventListener("click",()=>{o.querySelectorAll(".nb-tab-btn").forEach(e=>e.classList.remove("active")),o.querySelectorAll(".nb-tab-panel").forEach(e=>e.classList.remove("active")),r.classList.add("active"),o.querySelector(`#nb-panel-${r.dataset.tab}`).classList.add("active")})}),o.querySelector("#nb-logo-pick").addEventListener("click",()=>{Q({type:"image",title:"Seleccionar logo",onSelect:r=>{o.querySelector("#nb-logo-url").value=r;let e=o.querySelector("#nb-logo-preview");if(!e||e.tagName==="DIV"){const f=document.createElement("img");f.id="nb-logo-preview",f.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;",e?.replaceWith(f)??o.querySelector("#nb-logo-url").before(f),e=f}e.src=r,e.style.display="block"}})});function y(r,e,f){let i=null;r.querySelectorAll("[data-drag-idx]").forEach(b=>{b.setAttribute("draggable","true"),b.addEventListener("dragstart",c=>{i=parseInt(b.dataset.dragIdx),setTimeout(()=>b.classList.add("nb-dragging"),0),c.dataTransfer.effectAllowed="move"}),b.addEventListener("dragend",()=>{b.classList.remove("nb-dragging"),r.querySelectorAll(".nb-drag-over").forEach(c=>c.classList.remove("nb-drag-over"))}),b.addEventListener("dragover",c=>{c.preventDefault(),c.dataTransfer.dropEffect="move",parseInt(b.dataset.dragIdx)!==i&&b.classList.add("nb-drag-over")}),b.addEventListener("dragleave",()=>b.classList.remove("nb-drag-over")),b.addEventListener("drop",c=>{c.preventDefault();const u=parseInt(b.dataset.dragIdx);if(i!==null&&u!==i){const[w]=e.splice(i,1);e.splice(u,0,w),f()}i=null})})}const $=`${document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??""}/api/pages/search`;function I(r){if(r.dataset.autocompleteAttached)return;r.dataset.autocompleteAttached="true";const e=r.parentNode,f=e.style.position;(!f||f==="static")&&(e.style.position="relative");const i=document.createElement("ul");i.style.cssText=`
            position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;
            background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;
            box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;
            max-height:200px;overflow-y:auto;display:none;
        `,e.appendChild(i);let b=null,c="";async function u(v){if(v.length<1){i.style.display="none";return}try{const h=await(await fetch(`${$}?q=${encodeURIComponent(v)}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json();w(h,v)}catch{i.style.display="none"}}function w(v,k){if(i.innerHTML="",!v.length){i.style.display="none";return}v.forEach(h=>{const L=document.createElement("li");L.style.cssText="padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;",L.innerHTML=`
                    <span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${T(h.title,k)}</span>
                    <span style="font-size:0.7rem;color:#64748b;">/${h.slug}</span>`,L.addEventListener("mouseenter",()=>L.style.background="#f1f5f9"),L.addEventListener("mouseleave",()=>L.style.background=""),L.addEventListener("mousedown",C=>{C.preventDefault(),r.value="/"+h.slug,r.dispatchEvent(new Event("input")),i.style.display="none"}),i.appendChild(L)}),i.style.display="block"}function T(v,k){return k?v.replace(new RegExp(`(${k.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi"),'<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>'):v}r.addEventListener("input",()=>{clearTimeout(b),c=r.value.trim(),b=setTimeout(()=>u(c),220)}),r.addEventListener("focus",()=>{r.select(),c=r.value.trim(),c&&u(c)}),r.addEventListener("blur",()=>{setTimeout(()=>{i.style.display="none"},150)}),r.addEventListener("keydown",v=>{if(i.style.display==="none")return;const k=i.querySelectorAll("li"),h=i.querySelector("li.nb-ac-active");let L=Array.from(k).indexOf(h);if(v.key==="ArrowDown"){v.preventDefault(),h&&h.classList.remove("nb-ac-active");const C=k[L+1]||k[0];C?.classList.add("nb-ac-active"),C.style.background="#f1f5f9"}else if(v.key==="ArrowUp"){v.preventDefault(),h&&h.classList.remove("nb-ac-active");const C=k[L-1]||k[k.length-1];C?.classList.add("nb-ac-active"),C.style.background="#f1f5f9"}else v.key==="Enter"&&h?(v.preventDefault(),h.dispatchEvent(new MouseEvent("mousedown"))):v.key==="Escape"&&(i.style.display="none")})}function E(){const r=o.querySelector("#nb-links-list");r.innerHTML="",p.forEach((e,f)=>{const i=document.createElement("div");i.className="nb-link-card",i.dataset.dragIdx=f;const b=`<span class="nb-type-badge ${e.type==="submenu"?"nb-type-submenu":"nb-type-link"}" data-toggle-type title="Clic para cambiar tipo">${e.type==="submenu"?"Submenú":"Link"}<span class="nb-type-badge-hint">↕</span></span>`;if(e.type==="submenu"){const u=(e.children||[]).map((w,T)=>`
                    <div class="nb-submenu-item" data-child="${T}">
                        <input class="nb-input-sm" style="width:110px;" placeholder="ri-icon (opcional)" value="${w.icon||""}" data-field="icon">
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto" value="${w.label||""}" data-field="label">
                        <div style="flex:1;position:relative;">
                            <input class="nb-input-sm" style="width:100%;box-sizing:border-box;" placeholder="URL" value="${w.href||""}" data-field="href">
                        </div>
                        <button class="nb-btn-remove nb-remove-child"><i class="ri-delete-bin-line"></i></button>
                    </div>`).join("");i.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${b}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Título del submenú" value="${e.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-list nb-children-list" style="gap:0.375rem;">${u}</div>
                        <button class="nb-btn-sm-add nb-add-child" style="margin-top:0.25rem;"><i class="ri-add-line"></i> Agregar sub-enlace</button>
                    </div>`}else i.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${b}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${e.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${e.href||""}" data-field="href">
                    </div>`;i.querySelector("[data-toggle-type]").onclick=()=>{e.type==="link"?(e.type="submenu",e.children=e.children?.length?e.children:[{label:"Enlace",href:"#",icon:""}],delete e.href):(e.type="link",e.href="#",delete e.children),E()},i.querySelector(".nb-remove-link").onclick=()=>{p.splice(f,1),E()},i.querySelectorAll("[data-field]").forEach(u=>{u.addEventListener("input",()=>{e[u.dataset.field]=u.value})});const c=i.querySelector(".nb-url-input");c&&I(c),e.type==="submenu"&&(i.querySelector(".nb-add-child").onclick=()=>{e.children=e.children||[],e.children.push({label:"Nuevo enlace",href:"#",icon:""}),E()},i.querySelectorAll(".nb-remove-child").forEach(u=>{u.onclick=()=>{const w=parseInt(u.closest("[data-child]").dataset.child);e.children.splice(w,1),E()}}),i.querySelectorAll(".nb-submenu-item [data-field]").forEach(u=>{const w=parseInt(u.closest("[data-child]").dataset.child);u.addEventListener("input",()=>{e.children[w][u.dataset.field]=u.value}),u.dataset.field==="href"&&I(u)})),r.appendChild(i)}),y(r,p,E)}function j(){const r=o.querySelector("#nb-actions-list");r.innerHTML="",n.forEach((e,f)=>{const i=document.createElement("div");i.className="nb-action-card",i.dataset.dragIdx=f,i.innerHTML=`
                <div class="nb-row">
                    <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                    <input class="nb-input-sm" style="width:110px;flex-shrink:0;" placeholder="ri-icon (opcional)" value="${e.icon||""}" data-field="icon">
                    <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${e.label||""}" data-field="label">
                    <button class="nb-btn-remove nb-remove-action"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="nb-row">
                    <input class="nb-input-sm nb-url-input" style="flex:1;" placeholder="URL o buscar página..." value="${e.href||""}" data-field="href">
                    <select class="nb-select" data-field="style">
                        <option value="primary" ${e.style==="primary"?"selected":""}>Azul sólido</option>
                        <option value="outline" ${e.style==="outline"?"selected":""}>Azul outline</option>
                        <option value="orange"  ${e.style==="orange"?"selected":""}>Naranja</option>
                    </select>
                </div>`,i.querySelector(".nb-remove-action").onclick=()=>{n.splice(f,1),j()},i.querySelectorAll("[data-field]").forEach(c=>{c.addEventListener("input",()=>{e[c.dataset.field]=c.value}),c.addEventListener("change",()=>{e[c.dataset.field]=c.value})});const b=i.querySelector(".nb-url-input");b&&I(b),r.appendChild(i)}),y(r,n,j)}E(),j();const N=o.querySelector("#nb-logo-href");N&&I(N),o.querySelector("#nb-add-link").onclick=()=>{p.push({type:"link",label:"Nuevo enlace",href:"#"}),E(),o.querySelector("#nb-links-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},o.querySelector("#nb-add-submenu").onclick=()=>{p.push({type:"submenu",label:"Menú",children:[{label:"Enlace",href:"#",icon:""}]}),E(),o.querySelector("#nb-links-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},o.querySelector("#nb-add-action").onclick=()=>{n.push({label:"Botón",href:"#",style:"primary",icon:""}),j(),o.querySelector("#nb-actions-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})};const q=()=>d.remove();o.querySelector("#nb-modal-close").onclick=q,o.querySelector("#nb-modal-cancel").onclick=q,d.onclick=r=>{r.target===d&&q()},o.querySelector("#nb-modal-save").onclick=()=>{const r={logo_url:o.querySelector("#nb-logo-url").value.trim(),logo_alt:o.querySelector("#nb-logo-alt").value.trim(),logo_text:o.querySelector("#nb-logo-text").value.trim(),logo_href:o.querySelector("#nb-logo-href").value.trim()||"/",links:p,actions:n},f=t.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||"nb"+Math.random().toString(36).slice(2,7);t.addAttributes({"data-navbar-config":JSON.stringify(r)}),t.components(M(r,f)+z),q()}}function ee(l){const t="navbar-component";l.DomComponents.addType(t,{isComponent:a=>a.getAttribute?.("data-gjs-type")===t?{type:t}:!1,model:{defaults:{name:"Navbar",tagName:"nav",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":t,class:"nb-wrapper","data-navbar-config":JSON.stringify({logo_url:"",logo_alt:"Logo",logo_text:"Logo",logo_href:"/",links:[{type:"link",label:"Sobre nosotros",href:"#"},{type:"link",label:"Créditos",href:"#"},{type:"link",label:"Depósitos",href:"#"},{type:"submenu",label:"Otros servicios",children:[{label:"Servicio 1",href:"#",icon:""},{label:"Servicio 2",href:"#",icon:""}]},{type:"link",label:"Contáctanos",href:"#"}],actions:[{label:"Ingresar",href:"#",style:"primary",icon:""}]})},components:M({logo_url:"",logo_alt:"Logo",logo_text:"Logo",links:[{type:"link",label:"Sobre nosotros",href:"#"},{type:"link",label:"Créditos",href:"#"},{type:"link",label:"Depósitos",href:"#"},{type:"submenu",label:"Otros servicios",children:[{label:"Servicio 1",href:"#",icon:""},{label:"Servicio 2",href:"#",icon:""}]},{type:"link",label:"Contáctanos",href:"#"}],actions:[{label:"Ingresar",href:"#",style:"primary",icon:""}]})+z,script:function(){(function(a){if(!a||typeof a.querySelector!="function"||a.__nbInit)return;a.__nbInit=!0;var s=a.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");if(!s)return;var g=!!window.__gjseditor||document.documentElement.hasAttribute("data-gjs-canvas");function S(){g||(document.body.style.paddingTop=a.offsetHeight+"px")}S(),window.addEventListener("resize",S);var x=document.getElementById("nb-toggle-"+s),m=document.getElementById("nb-mobile-"+s);x&&m&&x.addEventListener("click",function(){m.classList.toggle("nb-open"),S()}),a.querySelectorAll(".nb-submenu-trigger").forEach(function(p){p.addEventListener("click",function(n){n.stopPropagation();var d=p.closest(".nb-item"),o=d.classList.contains("nb-open");a.querySelectorAll(".nb-item.nb-open").forEach(function(y){y.classList.remove("nb-open")}),o||d.classList.add("nb-open")})}),a.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(p){p.addEventListener("click",function(){p.closest(".nb-mobile-item").classList.toggle("nb-open"),S()})}),document.addEventListener("click",function(p){a.contains(p.target)||a.querySelectorAll(".nb-item.nb-open").forEach(function(n){n.classList.remove("nb-open")})})})(this)},"script-props":[],toolbar:[],traits:[{type:"button",label:"Navbar",text:"Administrar Navbar",full:!0,command:"open-navbar-config"}]},init(){this.set("type",t),this.addAttributes({"data-gjs-type":t})}}}),l.Commands.add("open-navbar-config",{run(a){const s=a.getSelected();s&&Z(a,s)}}),l.BlockManager.add("navbar-block",{label:"Navbar",category:"Navbar",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="12" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="17" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="22" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="24" y="11" width="6" height="10" rx="2" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:t,attributes:{"data-gjs-type":t}}}),ne(l,t),te(l)}function ne(l,t){l.on("storage:end:load",()=>{setTimeout(()=>_(l,t),800)}),l.on("component:mount",a=>{const s=a.getEl();s?.getAttribute?.("data-gjs-type")===t&&(a.set("type",t),setTimeout(()=>H(l,s),400))}),l.on("canvas:render",()=>{setTimeout(()=>_(l,t),600)})}function H(l,t){if(t?.isConnected)try{const a=l.Canvas.getFrameEl()?.contentDocument;if(!a)return;t.__nbInit&&delete t.__nbInit;const s=a.createElement("script");s.textContent=`(function(){
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
        })();`,a.head.appendChild(s),s.remove()}catch(a){console.warn("[Navbar] Error inyectando script en canvas:",a)}}function _(l,t){l.getWrapper().find(`[data-gjs-type="${t}"]`).forEach(a=>{a.set("type",t);const s=a.getEl();s?.isConnected&&H(l,s)})}function te(l){l.on("load",()=>{const t=l.Canvas.getFrameEl();if(!t)return;const a=t.contentDocument,s=a?.head;if(s&&(a.documentElement?.setAttribute("data-gjs-canvas","true"),!s.querySelector("#navbar-component-css"))){const g=document.createElement("style");g.id="navbar-component-css",g.textContent=`
                [data-gjs-type="navbar-component"] {
                    outline: 2px dashed rgba(240,135,42,0.4);
                    outline-offset: 2px;
                    position: relative !important;
                    top: auto !important;
                }
                body {
                    padding-top: 0 !important;
                }
            `,s.appendChild(g)}})}document.addEventListener("DOMContentLoaded",async()=>{const l=new W;let t=document.getElementById("navbar-id")?.value||"",a=document.getElementById("navbar-name")?.value||"",s=document.getElementById("navbar-load-url")?.value||"",g=document.getElementById("navbar-store-url")?.value||"";const S=document.getElementById("navbar-is-active")?.value==="1";let x=!!t;const m=Y();if(ee(m),m.on("load",()=>{U(m),P(),O(),R(m),G(m),J(m),V(m),oe(m),setTimeout(()=>{m.runCommand("sw-visibility"),m.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),x&&s)try{await l.loadPageContent(m,s),B("Navbar cargado correctamente","success")}catch{B("Error al cargar el navbar","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const n=document.getElementById("save-button");n.disabled=!0,n.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!x&&!a?F({title:"Nombre del Navbar",description:"Ingresa un nombre descriptivo para identificar este navbar.",placeholder:"Ej: Navbar Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async d=>{if(!d?.trim()){B("El nombre es obligatorio","error"),n.disabled=!1,n.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await p(d)}catch(o){B(o.message,"error")}finally{n.disabled=!1,n.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{n.disabled=!1,n.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await p(a),n.disabled=!1,n.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(d){B(d.message,"error"),n.disabled=!1,n.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function p(n){const d=x?"PUT":"POST",o=l.getEditorContent(m);(!o.js_content||o.js_content.trim()==="")&&(o.js_content=K);const y=await l.savePage(m,{...o,name:n,is_active:S},g,d);if(y.success){if(l.markAsClean(),B(y.message,"success"),!x&&y.navbar){t=y.navbar.id,a=y.navbar.name,x=!0;const A=document.getElementById("navbar-id");A&&(A.value=t);const $=document.getElementById("navbar-name");$&&($.value=a);const I=document.querySelector('meta[name="app-url"]'),E=I?I.content:"";g=g.endsWith("/navbars")?`${g}/${t}`:`${g.replace(/\/navbars\/?$/,"")}/navbars/${t}`;const N=document.getElementById("navbar-store-url");N&&(N.value=g),s=`${g}/load`;const q=document.getElementById("navbar-load-url");q&&(q.value=s);const r=document.getElementById("editor-title");r&&(r.textContent=`Editando Navbar: ${a}`);const e=`/navbars/edit/${t}/edit`,f=E?`${E}${e}`:e;window.history.replaceState({path:f},"",f)}else if(n){a=n;const A=document.getElementById("navbar-name");A&&(A.value=a);const $=document.getElementById("editor-title");$&&($.textContent=`Editando Navbar: ${a}`)}}}});function oe(l){l.Commands.add("canvas-clear",{run:t=>{X({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{t.DomComponents.clear(),t.CssComposer.clear()}})}})}function B(l,t="info"){typeof window.showNotification=="function"&&window.showNotification(l,t)}
