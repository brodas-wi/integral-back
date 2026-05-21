import{i as B,t as C,d as N,f as j,e as q,s as z,g as I,c as T,E as A,j as M,h as H}from"./editor-commands-DIM4nSZH.js";import{o as _}from"./media-picker-CiKJ1Agb.js";import"./_commonjsHelpers-CqkleIqs.js";function U(){return B()}const $=`
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
</style>`;function L(t){const n=t.logo_url?`<img src="${t.logo_url}" alt="${t.logo_alt||"Logo"}">`:`<span class="nb-logo-text">${t.logo_text||"Logo"}</span>`,r=(t.links||[]).map(e=>{if(e.type==="submenu"&&e.children?.length){const m=e.children.map(a=>{const i=a.icon?`<i class="${a.icon}"></i>`:"";return`<li><a href="${a.href||"#"}" class="nb-submenu-link">${i}${a.label}</a></li>`}).join("");return`
<li class="nb-item nb-has-submenu">
    <button class="nb-link nb-submenu-trigger" type="button">
        ${e.label}<i class="ri-arrow-down-s-line nb-chevron"></i>
    </button>
    <ul class="nb-submenu">${m}</ul>
</li>`}return`<li class="nb-item"><a href="${e.href||"#"}" class="nb-link">${e.label}</a></li>`}).join(""),s=(t.actions||[]).map(e=>{const m=e.icon?`<i class="${e.icon}"></i>`:"";return`<a href="${e.href||"#"}" class="nb-btn nb-btn-${e.style||"primary"}">${m}${e.label}</a>`}).join(""),c=(t.links||[]).map(e=>{if(e.type==="submenu"&&e.children?.length){const m=e.children.map(a=>{const i=a.icon?`<i class="${a.icon}"></i>`:"";return`<a href="${a.href||"#"}" class="nb-mobile-submenu-link">${i}${a.label}</a>`}).join("");return`
<div class="nb-mobile-item">
    <button class="nb-mobile-link" type="button">
        ${e.label}<i class="ri-arrow-down-s-line"></i>
    </button>
    <div class="nb-mobile-submenu">${m}</div>
</div>`}return`<a href="${e.href||"#"}" class="nb-mobile-link">${e.label}</a>`}).join(""),h=(t.actions||[]).map(e=>{const m=e.icon?`<i class="${e.icon}"></i>`:"";return`<a href="${e.href||"#"}" class="nb-btn nb-btn-${e.style||"primary"}">${m}${e.label}</a>`}).join(""),u="nb"+Math.random().toString(36).slice(2,7);return`
<div class="nb-inner" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
    <div class="nb-logo" data-gjs-editable="false" data-gjs-selectable="false">${n}</div>
    <ul class="nb-links" data-gjs-editable="false" data-gjs-selectable="false">${r}</ul>
    <div class="nb-actions" data-gjs-editable="false" data-gjs-selectable="false">${s}</div>
    <button class="nb-hamburger" type="button" id="nb-toggle-${u}" aria-label="Menú" data-gjs-editable="false" data-gjs-selectable="false">
        <span></span><span></span><span></span>
    </button>
</div>
<div class="nb-mobile-menu" id="nb-mobile-${u}" data-gjs-editable="false" data-gjs-selectable="false">
    ${c}
    ${h?`<div class="nb-mobile-actions">${h}</div>`:""}
</div>
<script>
(function() {
    function initNavbar() {
        var root = document.currentScript ? document.currentScript.closest('nav') : document.querySelector('[data-gjs-type="navbar-component"]');
        if (!root) return;

        function updatePadding() {
            document.body.style.paddingTop = root.offsetHeight + 'px';
        }
        updatePadding();
        window.addEventListener('resize', updatePadding);

        var toggle = document.getElementById('nb-toggle-${u}');
        var mobile = document.getElementById('nb-mobile-${u}');
        if (toggle && mobile) {
            toggle.addEventListener('click', function() {
                mobile.classList.toggle('nb-open');
                updatePadding();
            });
        }

        root.querySelectorAll('.nb-submenu-trigger').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                var item = btn.closest('.nb-item');
                var isOpen = item.classList.contains('nb-open');
                root.querySelectorAll('.nb-item.nb-open').forEach(function(el) { el.classList.remove('nb-open'); });
                if (!isOpen) item.classList.add('nb-open');
            });
        });

        root.querySelectorAll('.nb-mobile-item > .nb-mobile-link').forEach(function(btn) {
            btn.addEventListener('click', function() {
                btn.closest('.nb-mobile-item').classList.toggle('nb-open');
                updatePadding();
            });
        });

        document.addEventListener('click', function(e) {
            if (!root.contains(e.target)) {
                root.querySelectorAll('.nb-item.nb-open').forEach(function(el) { el.classList.remove('nb-open'); });
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();
<\/script>`}function O(){return function(){}}function P(t,n){const r=document.getElementById("navbar-config-modal");if(r&&r.remove(),!document.getElementById("nb-modal-styles")){const l=document.createElement("style");l.id="nb-modal-styles",l.textContent=`
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
        `,document.head.appendChild(l)}const s=(()=>{try{return JSON.parse(n.getAttributes()["data-navbar-config"]||"{}")}catch{return{}}})(),c=s.logo_url||"",h=s.logo_alt||"",u=s.logo_text||"Logo",e=JSON.parse(JSON.stringify(s.links||[{type:"link",label:"Inicio",href:"/"},{type:"link",label:"Nosotros",href:"#"}])),m=JSON.parse(JSON.stringify(s.actions||[{label:"Ingresar",href:"#",style:"primary",icon:""}])),a=document.createElement("div");a.id="navbar-config-modal",a.className="nb-overlay";const i=document.createElement("div");i.className="nb-modal",i.innerHTML=`
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
                        <input id="nb-logo-alt" type="text" placeholder="Texto alternativo" value="${h}" class="nb-input">
                        <input id="nb-logo-text" type="text" placeholder="Texto si no hay imagen" value="${u}" class="nb-input">
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
    `,a.appendChild(i),document.body.appendChild(a),i.querySelectorAll(".nb-tab-btn").forEach(l=>{l.addEventListener("click",()=>{i.querySelectorAll(".nb-tab-btn").forEach(o=>o.classList.remove("active")),i.querySelectorAll(".nb-tab-panel").forEach(o=>o.classList.remove("active")),l.classList.add("active"),i.querySelector(`#nb-panel-${l.dataset.tab}`).classList.add("active")})}),i.querySelector("#nb-logo-pick").addEventListener("click",()=>{_({type:"image",title:"Seleccionar logo",onSelect:l=>{i.querySelector("#nb-logo-url").value=l;let o=i.querySelector("#nb-logo-preview");if(!o||o.tagName==="DIV"){const f=document.createElement("img");f.id="nb-logo-preview",f.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;",o?.replaceWith(f)??i.querySelector("#nb-logo-url").before(f),o=f}o.src=l,o.style.display="block"}})});function p(){const l=i.querySelector("#nb-links-list");l.innerHTML="",e.forEach((o,f)=>{const b=document.createElement("div");if(b.className="nb-link-card",b.dataset.index=f,o.type==="submenu"){const d=(o.children||[]).map((v,k)=>`
                    <div class="nb-submenu-item" data-child="${k}">
                        <input class="nb-input-sm" style="width:120px;" placeholder="ri-icon (opcional)" value="${v.icon||""}" data-field="icon">
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto" value="${v.label||""}" data-field="label">
                        <input class="nb-input-sm" style="flex:1;" placeholder="URL" value="${v.href||""}" data-field="href">
                        <button class="nb-btn-remove nb-remove-child"><i class="ri-delete-bin-line"></i></button>
                    </div>`).join("");b.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-type-badge nb-type-submenu">Submenú</span>
                        <input class="nb-input-sm" style="flex:1;" placeholder="Título del submenú" value="${o.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-list nb-children-list" style="gap:0.375rem;">${d}</div>
                        <button class="nb-btn-sm-add nb-add-child"><i class="ri-add-line"></i> Agregar sub-enlace</button>
                    </div>`}else b.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-type-badge nb-type-link">Link</span>
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${o.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-link-row">
                            <input class="nb-input-sm" style="flex:1;" placeholder="URL del enlace" value="${o.href||""}" data-field="href">
                        </div>
                    </div>`;b.querySelector(".nb-remove-link").onclick=()=>{e.splice(f,1),p()},b.querySelectorAll("[data-field]").forEach(d=>{d.addEventListener("input",()=>{o[d.dataset.field]=d.value})}),o.type==="submenu"&&(b.querySelector(".nb-add-child").onclick=()=>{o.children=o.children||[],o.children.push({label:"Nuevo enlace",href:"#",icon:""}),p()},b.querySelectorAll(".nb-remove-child").forEach(d=>{d.onclick=()=>{const v=parseInt(d.closest("[data-child]").dataset.child);o.children.splice(v,1),p()}}),b.querySelectorAll(".nb-submenu-item [data-field]").forEach(d=>{const v=parseInt(d.closest("[data-child]").dataset.child);d.addEventListener("input",()=>{o.children[v][d.dataset.field]=d.value})})),l.appendChild(b)})}function y(){const l=i.querySelector("#nb-actions-list");l.innerHTML="",m.forEach((o,f)=>{const b=document.createElement("div");b.className="nb-action-card",b.innerHTML=`
                <div class="nb-row">
                    <input class="nb-input-sm" style="width:120px;flex-shrink:0;" placeholder="ri-icon (opcional)" value="${o.icon||""}" data-field="icon">
                    <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${o.label||""}" data-field="label">
                    <button class="nb-btn-remove nb-remove-action"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="nb-row">
                    <input class="nb-input-sm" style="flex:1;" placeholder="URL" value="${o.href||""}" data-field="href">
                    <select class="nb-select" data-field="style">
                        <option value="primary" ${o.style==="primary"?"selected":""}>Azul sólido</option>
                        <option value="outline" ${o.style==="outline"?"selected":""}>Azul outline</option>
                        <option value="orange" ${o.style==="orange"?"selected":""}>Naranja</option>
                    </select>
                </div>`,b.querySelector(".nb-remove-action").onclick=()=>{m.splice(f,1),y()},b.querySelectorAll("[data-field]").forEach(d=>{d.addEventListener("input",()=>{o[d.dataset.field]=d.value}),d.addEventListener("change",()=>{o[d.dataset.field]=d.value})}),l.appendChild(b)})}p(),y(),i.querySelector("#nb-add-link").onclick=()=>{e.push({type:"link",label:"Nuevo enlace",href:"#"}),p()},i.querySelector("#nb-add-submenu").onclick=()=>{e.push({type:"submenu",label:"Menú",children:[{label:"Enlace",href:"#",icon:""}]}),p()},i.querySelector("#nb-add-action").onclick=()=>{m.push({label:"Botón",href:"#",style:"primary",icon:""}),y()};const g=()=>a.remove();i.querySelector("#nb-modal-close").onclick=g,i.querySelector("#nb-modal-cancel").onclick=g,a.onclick=l=>{l.target===a&&g()},i.querySelector("#nb-modal-save").onclick=()=>{const l={logo_url:i.querySelector("#nb-logo-url").value.trim(),logo_alt:i.querySelector("#nb-logo-alt").value.trim(),logo_text:i.querySelector("#nb-logo-text").value.trim(),links:e,actions:m};n.addAttributes({"data-navbar-config":JSON.stringify(l)}),n.components(L(l)+$),g()}}function D(t){const n="navbar-component";t.DomComponents.addType(n,{isComponent:r=>r.getAttribute?.("data-gjs-type")===n?{type:n}:!1,model:{defaults:{name:"Navbar",tagName:"nav",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":n,class:"nb-wrapper","data-navbar-config":JSON.stringify({logo_url:"",logo_alt:"Logo",logo_text:"Logo",links:[{type:"link",label:"Sobre nosotros",href:"#"},{type:"link",label:"Créditos",href:"#"},{type:"link",label:"Depósitos",href:"#"},{type:"submenu",label:"Otros servicios",children:[{label:"Servicio 1",href:"#",icon:""},{label:"Servicio 2",href:"#",icon:""}]},{type:"link",label:"Contáctanos",href:"#"}],actions:[{label:"Ingresar",href:"#",style:"primary",icon:""}]})},components:L({logo_url:"",logo_alt:"Logo",logo_text:"Logo",links:[{type:"link",label:"Sobre nosotros",href:"#"},{type:"link",label:"Créditos",href:"#"},{type:"link",label:"Depósitos",href:"#"},{type:"submenu",label:"Otros servicios",children:[{label:"Servicio 1",href:"#",icon:""},{label:"Servicio 2",href:"#",icon:""}]},{type:"link",label:"Contáctanos",href:"#"}],actions:[{label:"Ingresar",href:"#",style:"primary",icon:""}]})+$,script:O(),toolbar:[],traits:[{type:"button",label:"Navbar",text:"Administrar Navbar",full:!0,command:"open-navbar-config"}]},init(){this.set("type",n),this.addAttributes({"data-gjs-type":n})}}}),t.Commands.add("open-navbar-config",{run(r){const s=r.getSelected();s&&P(r,s)}}),t.BlockManager.add("navbar-block",{label:"Navbar",category:"Navbar",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="12" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="17" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="22" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="24" y="11" width="6" height="10" rx="2" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:n,attributes:{"data-gjs-type":n}}}),G(t,n),J(t)}function G(t,n){t.on("storage:end:load",()=>{setTimeout(()=>S(t,n),800)}),t.on("component:mount",r=>{const s=r.getEl();s?.getAttribute?.("data-gjs-type")===n&&(r.set("type",n),setTimeout(()=>{const c=r.get("script");c&&typeof c=="function"&&c.call(s)},400))}),t.on("canvas:render",()=>{setTimeout(()=>S(t,n),600)})}function S(t,n){t.getWrapper().find(`[data-gjs-type="${n}"]`).forEach(r=>{r.set("type",n);const s=r.getEl();if(s?.isConnected){const c=r.get("script");c&&typeof c=="function"&&c.call(s)}})}function J(t){t.on("load",()=>{const n=t.Canvas.getFrameEl();if(!n)return;const r=n.contentDocument?.head;if(r&&!r.querySelector("#navbar-component-css")){const s=document.createElement("style");s.id="navbar-component-css",s.textContent=`
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
            `,r.appendChild(s)}})}document.addEventListener("DOMContentLoaded",async()=>{const t=new A;let n=document.getElementById("navbar-id")?.value||"",r=document.getElementById("navbar-name")?.value||"",s=document.getElementById("navbar-load-url")?.value||"",c=document.getElementById("navbar-store-url")?.value||"";const h=document.getElementById("navbar-is-active")?.value==="1";let u=!!n;const e=U();if(D(e),e.on("load",()=>{C(e),N(),j(),q(e),z(e),I(e),T(e),R(e),setTimeout(()=>{e.runCommand("sw-visibility"),e.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),u&&s)try{await t.loadPageContent(e,s),x("Navbar cargado correctamente","success")}catch{x("Error al cargar el navbar","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const a=document.getElementById("save-button");a.disabled=!0,a.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!u&&!r?M({title:"Nombre del Navbar",description:"Ingresa un nombre descriptivo para identificar este navbar.",placeholder:"Ej: Navbar Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async i=>{if(!i?.trim()){x("El nombre es obligatorio","error"),a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await m(i)}catch(p){x(p.message,"error")}finally{a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await m(r),a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(i){x(i.message,"error"),a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function m(a){const i=u?"PUT":"POST",p=t.getEditorContent(e),y=await t.savePage(e,{...p,name:a,is_active:h},c,i);if(y.success){if(t.markAsClean(),x(y.message,"success"),!u&&y.navbar){n=y.navbar.id,r=y.navbar.name,u=!0;const g=document.getElementById("navbar-id");g&&(g.value=n);const l=document.getElementById("navbar-name");l&&(l.value=r);const o=document.querySelector('meta[name="app-url"]'),f=o?o.content:"";c=c.endsWith("/navbars")?`${c}/${n}`:`${c.replace(/\/navbars\/?$/,"")}/navbars/${n}`;const d=document.getElementById("navbar-store-url");d&&(d.value=c),s=`${c}/load`;const v=document.getElementById("navbar-load-url");v&&(v.value=s);const k=document.getElementById("editor-title");k&&(k.textContent=`Editando Navbar: ${r}`);const w=`/navbars/edit/${n}/edit`,E=f?`${f}${w}`:w;window.history.replaceState({path:E},"",E)}else if(a){r=a;const g=document.getElementById("navbar-name");g&&(g.value=r);const l=document.getElementById("editor-title");l&&(l.textContent=`Editando Navbar: ${r}`)}}}});function R(t){t.Commands.add("canvas-clear",{run:n=>{H({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{n.DomComponents.clear(),n.CssComposer.clear()}})}})}function x(t,n="info"){typeof window.showNotification=="function"&&window.showNotification(t,n)}
