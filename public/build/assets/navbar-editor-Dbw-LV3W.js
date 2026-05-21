import{i as _,t as B,d as I,f as q,e as A,s as T,g as z,c as M,E as P,j as H,h as U}from"./editor-commands-5w86-EOS.js";import{o as R}from"./media-picker-CiKJ1Agb.js";import"./_commonjsHelpers-CqkleIqs.js";const O="modulepreload",D=function(a){return"/adminintegral/public/build/"+a},S={},G=function(t,o,l){let b=Promise.resolve();if(o&&o.length>0){let c=function(n){return Promise.all(n.map(i=>Promise.resolve(i).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};document.getElementsByTagName("link");const m=document.querySelector("meta[property=csp-nonce]"),e=m?.nonce||m?.getAttribute("nonce");b=c(o.map(n=>{if(n=D(n),n in S)return;S[n]=!0;const i=n.endsWith(".css"),f=i?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${f}`))return;const u=document.createElement("link");if(u.rel=i?"stylesheet":O,i||(u.as="script"),u.crossOrigin="",u.href=n,e&&u.setAttribute("nonce",e),document.head.appendChild(u),i)return new Promise((g,s)=>{u.addEventListener("load",g),u.addEventListener("error",()=>s(new Error(`Unable to preload CSS for ${n}`)))})}))}function y(m){const e=new Event("vite:preloadError",{cancelable:!0});if(e.payload=m,window.dispatchEvent(e),!e.defaultPrevented)throw m}return b.then(m=>{for(const e of m||[])e.status==="rejected"&&y(e.reason);return t().catch(y)})};function J(){return _()}const V=`(function(){
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
})();`,$=`
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
@media (max-width: 992px) {
    .nb-links, .nb-actions { display: none; }
    .nb-hamburger { display: flex; }
}
</style>`;function N(a,t){t=t||"nb"+Math.random().toString(36).slice(2,7);const o=a.logo_url?`<img src="${a.logo_url}" alt="${a.logo_alt||"Logo"}">`:`<span class="nb-logo-text">${a.logo_text||"Logo"}</span>`,l=(a.links||[]).map(e=>{if(e.type==="submenu"&&e.children?.length){const c=e.children.map(n=>{const i=n.icon?`<i class="${n.icon}"></i>`:"";return`<li><a href="${n.href||"#"}" class="nb-submenu-link">${i}${n.label}</a></li>`}).join("");return`<li class="nb-item nb-has-submenu"><button class="nb-link nb-submenu-trigger" type="button">${e.label}<i class="ri-arrow-down-s-line nb-chevron"></i></button><ul class="nb-submenu">${c}</ul></li>`}return`<li class="nb-item"><a href="${e.href||"#"}" class="nb-link">${e.label}</a></li>`}).join(""),b=(a.actions||[]).map(e=>{const c=e.icon?`<i class="${e.icon}"></i>`:"";return`<a href="${e.href||"#"}" class="nb-btn nb-btn-${e.style||"primary"}">${c}${e.label}</a>`}).join(""),y=(a.links||[]).map(e=>{if(e.type==="submenu"&&e.children?.length){const c=e.children.map(n=>{const i=n.icon?`<i class="${n.icon}"></i>`:"";return`<a href="${n.href||"#"}" class="nb-mobile-submenu-link">${i}${n.label}</a>`}).join("");return`<div class="nb-mobile-item"><button class="nb-mobile-link" type="button">${e.label}<i class="ri-arrow-down-s-line"></i></button><div class="nb-mobile-submenu">${c}</div></div>`}return`<a href="${e.href||"#"}" class="nb-mobile-link">${e.label}</a>`}).join(""),m=(a.actions||[]).map(e=>{const c=e.icon?`<i class="${e.icon}"></i>`:"";return`<a href="${e.href||"#"}" class="nb-btn nb-btn-${e.style||"primary"}">${c}${e.label}</a>`}).join("");return`<div id="nb-root-${t}" class="nb-inner" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div class="nb-logo" data-gjs-editable="false" data-gjs-selectable="false">${o}</div><ul class="nb-links" data-gjs-editable="false" data-gjs-selectable="false">${l}</ul><div class="nb-actions" data-gjs-editable="false" data-gjs-selectable="false">${b}</div><button class="nb-hamburger" type="button" id="nb-toggle-${t}" aria-label="Menú" data-gjs-editable="false" data-gjs-selectable="false"><span></span><span></span><span></span></button></div><div class="nb-mobile-menu" id="nb-mobile-${t}" data-gjs-editable="false" data-gjs-selectable="false">${y}${m?`<div class="nb-mobile-actions">${m}</div>`:""}</div>`}function W(a,t){const o=document.getElementById("navbar-config-modal");if(o&&o.remove(),!document.getElementById("nb-modal-styles")){const s=document.createElement("style");s.id="nb-modal-styles",s.textContent=`
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
        `,document.head.appendChild(s)}const l=(()=>{try{return JSON.parse(t.getAttributes()["data-navbar-config"]||"{}")}catch{return{}}})(),b=l.logo_url||"",y=l.logo_alt||"",m=l.logo_text||"Logo",e=JSON.parse(JSON.stringify(l.links||[{type:"link",label:"Inicio",href:"/"},{type:"link",label:"Nosotros",href:"#"}])),c=JSON.parse(JSON.stringify(l.actions||[{label:"Ingresar",href:"#",style:"primary",icon:""}])),n=document.createElement("div");n.id="navbar-config-modal",n.className="nb-overlay";const i=document.createElement("div");i.className="nb-modal",i.innerHTML=`
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
                        <input id="nb-logo-alt" type="text" placeholder="Texto alternativo" value="${y}" class="nb-input">
                        <input id="nb-logo-text" type="text" placeholder="Texto si no hay imagen" value="${m}" class="nb-input">
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
    `,n.appendChild(i),document.body.appendChild(n),i.querySelectorAll(".nb-tab-btn").forEach(s=>{s.addEventListener("click",()=>{i.querySelectorAll(".nb-tab-btn").forEach(r=>r.classList.remove("active")),i.querySelectorAll(".nb-tab-panel").forEach(r=>r.classList.remove("active")),s.classList.add("active"),i.querySelector(`#nb-panel-${s.dataset.tab}`).classList.add("active")})}),i.querySelector("#nb-logo-pick").addEventListener("click",()=>{R({type:"image",title:"Seleccionar logo",onSelect:s=>{i.querySelector("#nb-logo-url").value=s;let r=i.querySelector("#nb-logo-preview");if(!r||r.tagName==="DIV"){const v=document.createElement("img");v.id="nb-logo-preview",v.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;",r?.replaceWith(v)??i.querySelector("#nb-logo-url").before(v),r=v}r.src=s,r.style.display="block"}})});function f(){const s=i.querySelector("#nb-links-list");s.innerHTML="",e.forEach((r,v)=>{const p=document.createElement("div");if(p.className="nb-link-card",p.dataset.index=v,r.type==="submenu"){const d=(r.children||[]).map((h,k)=>`
                    <div class="nb-submenu-item" data-child="${k}">
                        <input class="nb-input-sm" style="width:120px;" placeholder="ri-icon (opcional)" value="${h.icon||""}" data-field="icon">
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto" value="${h.label||""}" data-field="label">
                        <input class="nb-input-sm" style="flex:1;" placeholder="URL" value="${h.href||""}" data-field="href">
                        <button class="nb-btn-remove nb-remove-child"><i class="ri-delete-bin-line"></i></button>
                    </div>`).join("");p.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-type-badge nb-type-submenu">Submenú</span>
                        <input class="nb-input-sm" style="flex:1;" placeholder="Título del submenú" value="${r.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-list nb-children-list" style="gap:0.375rem;">${d}</div>
                        <button class="nb-btn-sm-add nb-add-child"><i class="ri-add-line"></i> Agregar sub-enlace</button>
                    </div>`}else p.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-type-badge nb-type-link">Link</span>
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${r.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-link-row">
                            <input class="nb-input-sm" style="flex:1;" placeholder="URL del enlace" value="${r.href||""}" data-field="href">
                        </div>
                    </div>`;p.querySelector(".nb-remove-link").onclick=()=>{e.splice(v,1),f()},p.querySelectorAll("[data-field]").forEach(d=>{d.addEventListener("input",()=>{r[d.dataset.field]=d.value})}),r.type==="submenu"&&(p.querySelector(".nb-add-child").onclick=()=>{r.children=r.children||[],r.children.push({label:"Nuevo enlace",href:"#",icon:""}),f()},p.querySelectorAll(".nb-remove-child").forEach(d=>{d.onclick=()=>{const h=parseInt(d.closest("[data-child]").dataset.child);r.children.splice(h,1),f()}}),p.querySelectorAll(".nb-submenu-item [data-field]").forEach(d=>{const h=parseInt(d.closest("[data-child]").dataset.child);d.addEventListener("input",()=>{r.children[h][d.dataset.field]=d.value})})),s.appendChild(p)})}function u(){const s=i.querySelector("#nb-actions-list");s.innerHTML="",c.forEach((r,v)=>{const p=document.createElement("div");p.className="nb-action-card",p.innerHTML=`
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
                </div>`,p.querySelector(".nb-remove-action").onclick=()=>{c.splice(v,1),u()},p.querySelectorAll("[data-field]").forEach(d=>{d.addEventListener("input",()=>{r[d.dataset.field]=d.value}),d.addEventListener("change",()=>{r[d.dataset.field]=d.value})}),s.appendChild(p)})}f(),u(),i.querySelector("#nb-add-link").onclick=()=>{e.push({type:"link",label:"Nuevo enlace",href:"#"}),f()},i.querySelector("#nb-add-submenu").onclick=()=>{e.push({type:"submenu",label:"Menú",children:[{label:"Enlace",href:"#",icon:""}]}),f()},i.querySelector("#nb-add-action").onclick=()=>{c.push({label:"Botón",href:"#",style:"primary",icon:""}),u()};const g=()=>n.remove();i.querySelector("#nb-modal-close").onclick=g,i.querySelector("#nb-modal-cancel").onclick=g,n.onclick=s=>{s.target===n&&g()},i.querySelector("#nb-modal-save").onclick=()=>{const s={logo_url:i.querySelector("#nb-logo-url").value.trim(),logo_alt:i.querySelector("#nb-logo-alt").value.trim(),logo_text:i.querySelector("#nb-logo-text").value.trim(),links:e,actions:c},p=t.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||null||"nb"+Math.random().toString(36).slice(2,7);t.addAttributes({"data-navbar-config":JSON.stringify(s)}),t.components(N(s,p)+$),g()}}function j(a){const t="navbar-component";a.DomComponents.addType(t,{isComponent:o=>o.getAttribute?.("data-gjs-type")===t?{type:t}:!1,model:{defaults:{name:"Navbar",tagName:"nav",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":t,class:"nb-wrapper","data-navbar-config":JSON.stringify({logo_url:"",logo_alt:"Logo",logo_text:"Logo",links:[{type:"link",label:"Sobre nosotros",href:"#"},{type:"link",label:"Créditos",href:"#"},{type:"link",label:"Depósitos",href:"#"},{type:"submenu",label:"Otros servicios",children:[{label:"Servicio 1",href:"#",icon:""},{label:"Servicio 2",href:"#",icon:""}]},{type:"link",label:"Contáctanos",href:"#"}],actions:[{label:"Ingresar",href:"#",style:"primary",icon:""}]})},components:N({logo_url:"",logo_alt:"Logo",logo_text:"Logo",links:[{type:"link",label:"Sobre nosotros",href:"#"},{type:"link",label:"Créditos",href:"#"},{type:"link",label:"Depósitos",href:"#"},{type:"submenu",label:"Otros servicios",children:[{label:"Servicio 1",href:"#",icon:""},{label:"Servicio 2",href:"#",icon:""}]},{type:"link",label:"Contáctanos",href:"#"}],actions:[{label:"Ingresar",href:"#",style:"primary",icon:""}]})+$,script:function(){(function(o){if(!o||typeof o.querySelector!="function"||o.__nbInit)return;o.__nbInit=!0;var l=o.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");if(!l)return;var b=!!window.__gjseditor||document.documentElement.hasAttribute("data-gjs-canvas");function y(){b||(document.body.style.paddingTop=o.offsetHeight+"px")}y(),window.addEventListener("resize",y);var m=document.getElementById("nb-toggle-"+l),e=document.getElementById("nb-mobile-"+l);m&&e&&m.addEventListener("click",function(){e.classList.toggle("nb-open"),y()}),o.querySelectorAll(".nb-submenu-trigger").forEach(function(c){c.addEventListener("click",function(n){n.stopPropagation();var i=c.closest(".nb-item"),f=i.classList.contains("nb-open");o.querySelectorAll(".nb-item.nb-open").forEach(function(u){u.classList.remove("nb-open")}),f||i.classList.add("nb-open")})}),o.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(c){c.addEventListener("click",function(){c.closest(".nb-mobile-item").classList.toggle("nb-open"),y()})}),document.addEventListener("click",function(c){o.contains(c.target)||o.querySelectorAll(".nb-item.nb-open").forEach(function(n){n.classList.remove("nb-open")})})})(this)},"script-props":[],toolbar:[],traits:[{type:"button",label:"Navbar",text:"Administrar Navbar",full:!0,command:"open-navbar-config"}]},init(){this.set("type",t),this.addAttributes({"data-gjs-type":t})}}}),a.Commands.add("open-navbar-config",{run(o){const l=o.getSelected();l&&W(o,l)}}),a.BlockManager.add("navbar-block",{label:"Navbar",category:"Navbar",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="12" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="17" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="22" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="24" y="11" width="6" height="10" rx="2" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:t,attributes:{"data-gjs-type":t}}}),F(a,t),Y(a)}function F(a,t){a.on("storage:end:load",()=>{setTimeout(()=>L(a,t),800)}),a.on("component:mount",o=>{const l=o.getEl();l?.getAttribute?.("data-gjs-type")===t&&(o.set("type",t),setTimeout(()=>C(a,l),400))}),a.on("canvas:render",()=>{setTimeout(()=>L(a,t),600)})}function C(a,t){if(t?.isConnected)try{const o=a.Canvas.getFrameEl()?.contentDocument;if(!o)return;t.__nbInit&&delete t.__nbInit;const l=o.createElement("script");l.textContent=`(function(){
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
        })();`,o.head.appendChild(l),l.remove()}catch(o){console.warn("[Navbar] Error inyectando script en canvas:",o)}}function L(a,t){a.getWrapper().find(`[data-gjs-type="${t}"]`).forEach(o=>{o.set("type",t);const l=o.getEl();l?.isConnected&&C(a,l)})}function Y(a){a.on("load",()=>{const t=a.Canvas.getFrameEl();if(!t)return;const o=t.contentDocument,l=o?.head;if(l&&(o.documentElement?.setAttribute("data-gjs-canvas","true"),!l.querySelector("#navbar-component-css"))){const b=document.createElement("style");b.id="navbar-component-css",b.textContent=`
                [data-gjs-type="navbar-component"] {
                    outline: 2px dashed rgba(240,135,42,0.4);
                    outline-offset: 2px;
                    position: relative !important;
                    top: auto !important;
                }
                body {
                    padding-top: 0 !important;
                }
            `,l.appendChild(b)}})}const K=Object.freeze(Object.defineProperty({__proto__:null,NAVBAR_RUNTIME_SCRIPT:V,initializeNavbarBlock:j},Symbol.toStringTag,{value:"Module"}));document.addEventListener("DOMContentLoaded",async()=>{const a=new P;let t=document.getElementById("navbar-id")?.value||"",o=document.getElementById("navbar-name")?.value||"",l=document.getElementById("navbar-load-url")?.value||"",b=document.getElementById("navbar-store-url")?.value||"";const y=document.getElementById("navbar-is-active")?.value==="1";let m=!!t;const e=J();if(j(e),e.on("load",()=>{B(e),I(),q(),A(e),T(e),z(e),M(e),Q(e),setTimeout(()=>{e.runCommand("sw-visibility"),e.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),m&&l)try{await a.loadPageContent(e,l),x("Navbar cargado correctamente","success")}catch{x("Error al cargar el navbar","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const n=document.getElementById("save-button");n.disabled=!0,n.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!m&&!o?H({title:"Nombre del Navbar",description:"Ingresa un nombre descriptivo para identificar este navbar.",placeholder:"Ej: Navbar Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async i=>{if(!i?.trim()){x("El nombre es obligatorio","error"),n.disabled=!1,n.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await c(i)}catch(f){x(f.message,"error")}finally{n.disabled=!1,n.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{n.disabled=!1,n.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await c(o),n.disabled=!1,n.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(i){x(i.message,"error"),n.disabled=!1,n.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function c(n){const i=m?"PUT":"POST",f=a.getEditorContent(e);if(!f.js_content||f.js_content.trim()===""){const{NAVBAR_RUNTIME_SCRIPT:g}=await G(async()=>{const{NAVBAR_RUNTIME_SCRIPT:s}=await Promise.resolve().then(()=>K);return{NAVBAR_RUNTIME_SCRIPT:s}},void 0);f.js_content=g}const u=await a.savePage(e,{...f,name:n,is_active:y},b,i);if(u.success){if(a.markAsClean(),x(u.message,"success"),!m&&u.navbar){t=u.navbar.id,o=u.navbar.name,m=!0;const g=document.getElementById("navbar-id");g&&(g.value=t);const s=document.getElementById("navbar-name");s&&(s.value=o);const r=document.querySelector('meta[name="app-url"]'),v=r?r.content:"";b=b.endsWith("/navbars")?`${b}/${t}`:`${b.replace(/\/navbars\/?$/,"")}/navbars/${t}`;const d=document.getElementById("navbar-store-url");d&&(d.value=b),l=`${b}/load`;const h=document.getElementById("navbar-load-url");h&&(h.value=l);const k=document.getElementById("editor-title");k&&(k.textContent=`Editando Navbar: ${o}`);const E=`/navbars/edit/${t}/edit`,w=v?`${v}${E}`:E;window.history.replaceState({path:w},"",w)}else if(n){o=n;const g=document.getElementById("navbar-name");g&&(g.value=o);const s=document.getElementById("editor-title");s&&(s.textContent=`Editando Navbar: ${o}`)}}}});function Q(a){a.Commands.add("canvas-clear",{run:t=>{U({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{t.DomComponents.clear(),t.CssComposer.clear()}})}})}function x(a,t="info"){typeof window.showNotification=="function"&&window.showNotification(a,t)}
