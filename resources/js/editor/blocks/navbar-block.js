import { openMediaPicker } from "@/editor/media-picker";

export const NAVBAR_RUNTIME_SCRIPT = `(function(){
function initNavbar(root){
    if(!root||root.__nbInit)return;
    root.__nbInit=true;
    var id=root.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");
    if(!id)return;
    function pad(){document.body.style.paddingTop=root.offsetHeight+"px";}
    pad();
    window.addEventListener("resize",pad);
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
})();`;

const NAVBAR_STYLES = `
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
</style>`;

function buildNavbarHTML(data, uid) {
    uid = uid || "nb" + Math.random().toString(36).slice(2, 7);

    const logoHtml = data.logo_url
        ? `<img src="${data.logo_url}" alt="${data.logo_alt || "Logo"}">`
        : `<span class="nb-logo-text">${data.logo_text || "Logo"}</span>`;

    const linksHtml = (data.links || [])
        .map((item) => {
            if (item.type === "submenu" && item.children?.length) {
                const childrenHtml = item.children
                    .map((child) => {
                        const icon = child.icon
                            ? `<i class="${child.icon}"></i>`
                            : "";
                        return `<li><a href="${child.href || "#"}" class="nb-submenu-link">${icon}${child.label}</a></li>`;
                    })
                    .join("");
                return `<li class="nb-item nb-has-submenu"><button class="nb-link nb-submenu-trigger" type="button">${item.label}<i class="ri-arrow-down-s-line nb-chevron"></i></button><ul class="nb-submenu">${childrenHtml}</ul></li>`;
            }
            return `<li class="nb-item"><a href="${item.href || "#"}" class="nb-link">${item.label}</a></li>`;
        })
        .join("");

    const actionsHtml = (data.actions || [])
        .map((btn) => {
            const icon = btn.icon ? `<i class="${btn.icon}"></i>` : "";
            return `<a href="${btn.href || "#"}" class="nb-btn nb-btn-${btn.style || "primary"}">${icon}${btn.label}</a>`;
        })
        .join("");

    const mobileLinksHtml = (data.links || [])
        .map((item) => {
            if (item.type === "submenu" && item.children?.length) {
                const childrenHtml = item.children
                    .map((child) => {
                        const icon = child.icon
                            ? `<i class="${child.icon}"></i>`
                            : "";
                        return `<a href="${child.href || "#"}" class="nb-mobile-submenu-link">${icon}${child.label}</a>`;
                    })
                    .join("");
                return `<div class="nb-mobile-item"><button class="nb-mobile-link" type="button">${item.label}<i class="ri-arrow-down-s-line"></i></button><div class="nb-mobile-submenu">${childrenHtml}</div></div>`;
            }
            return `<a href="${item.href || "#"}" class="nb-mobile-link">${item.label}</a>`;
        })
        .join("");

    const mobileActionsHtml = (data.actions || [])
        .map((btn) => {
            const icon = btn.icon ? `<i class="${btn.icon}"></i>` : "";
            return `<a href="${btn.href || "#"}" class="nb-btn nb-btn-${btn.style || "primary"}">${icon}${btn.label}</a>`;
        })
        .join("");

    return `<div id="nb-root-${uid}" class="nb-inner" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"><div class="nb-logo" data-gjs-editable="false" data-gjs-selectable="false">${logoHtml}</div><ul class="nb-links" data-gjs-editable="false" data-gjs-selectable="false">${linksHtml}</ul><div class="nb-actions" data-gjs-editable="false" data-gjs-selectable="false">${actionsHtml}</div><button class="nb-hamburger" type="button" id="nb-toggle-${uid}" aria-label="Menú" data-gjs-editable="false" data-gjs-selectable="false"><span></span><span></span><span></span></button></div><div class="nb-mobile-menu" id="nb-mobile-${uid}" data-gjs-editable="false" data-gjs-selectable="false">${mobileLinksHtml}${mobileActionsHtml ? `<div class="nb-mobile-actions">${mobileActionsHtml}</div>` : ""}</div>`;
}

function showNavbarModal(editor, component) {
    const existing = document.getElementById("navbar-config-modal");
    if (existing) existing.remove();

    if (!document.getElementById("nb-modal-styles")) {
        const style = document.createElement("style");
        style.id = "nb-modal-styles";
        style.textContent = `
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
        `;
        document.head.appendChild(style);
    }

    const currentData = (() => {
        try {
            return JSON.parse(
                component.getAttributes()["data-navbar-config"] || "{}",
            );
        } catch {
            return {};
        }
    })();

    const logoUrl = currentData.logo_url || "";
    const logoAlt = currentData.logo_alt || "";
    const logoText = currentData.logo_text || "Logo";
    const links = JSON.parse(
        JSON.stringify(
            currentData.links || [
                { type: "link", label: "Inicio", href: "/" },
                { type: "link", label: "Nosotros", href: "#" },
            ],
        ),
    );
    const actions = JSON.parse(
        JSON.stringify(
            currentData.actions || [
                { label: "Ingresar", href: "#", style: "primary", icon: "" },
            ],
        ),
    );

    const overlay = document.createElement("div");
    overlay.id = "navbar-config-modal";
    overlay.className = "nb-overlay";

    const modal = document.createElement("div");
    modal.className = "nb-modal";

    modal.innerHTML = `
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
                            ${logoUrl ? `<img id="nb-logo-preview" src="${logoUrl}" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;">` : `<div id="nb-logo-preview" style="display:none;"></div>`}
                            <input id="nb-logo-url" type="text" placeholder="URL del logo" value="${logoUrl}" class="nb-input" style="width:100%;">
                        </div>
                        <button id="nb-logo-pick" class="nb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Texto alternativo / Logo de texto</label>
                    <div class="nb-row">
                        <input id="nb-logo-alt" type="text" placeholder="Texto alternativo" value="${logoAlt}" class="nb-input">
                        <input id="nb-logo-text" type="text" placeholder="Texto si no hay imagen" value="${logoText}" class="nb-input">
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
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    modal.querySelectorAll(".nb-tab-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            modal
                .querySelectorAll(".nb-tab-btn")
                .forEach((b) => b.classList.remove("active"));
            modal
                .querySelectorAll(".nb-tab-panel")
                .forEach((p) => p.classList.remove("active"));
            btn.classList.add("active");
            modal
                .querySelector(`#nb-panel-${btn.dataset.tab}`)
                .classList.add("active");
        });
    });

    modal.querySelector("#nb-logo-pick").addEventListener("click", () => {
        openMediaPicker({
            type: "image",
            title: "Seleccionar logo",
            onSelect: (url) => {
                modal.querySelector("#nb-logo-url").value = url;
                let preview = modal.querySelector("#nb-logo-preview");
                if (!preview || preview.tagName === "DIV") {
                    const img = document.createElement("img");
                    img.id = "nb-logo-preview";
                    img.style.cssText =
                        "height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;";
                    preview?.replaceWith(img) ??
                        modal.querySelector("#nb-logo-url").before(img);
                    preview = img;
                }
                preview.src = url;
                preview.style.display = "block";
            },
        });
    });

    function renderLinks() {
        const list = modal.querySelector("#nb-links-list");
        list.innerHTML = "";
        links.forEach((item, idx) => {
            const card = document.createElement("div");
            card.className = "nb-link-card";
            card.dataset.index = idx;

            if (item.type === "submenu") {
                const childrenHtml = (item.children || [])
                    .map(
                        (child, ci) => `
                    <div class="nb-submenu-item" data-child="${ci}">
                        <input class="nb-input-sm" style="width:120px;" placeholder="ri-icon (opcional)" value="${child.icon || ""}" data-field="icon">
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto" value="${child.label || ""}" data-field="label">
                        <input class="nb-input-sm" style="flex:1;" placeholder="URL" value="${child.href || ""}" data-field="href">
                        <button class="nb-btn-remove nb-remove-child"><i class="ri-delete-bin-line"></i></button>
                    </div>`,
                    )
                    .join("");

                card.innerHTML = `
                    <div class="nb-link-card-header">
                        <span class="nb-type-badge nb-type-submenu">Submenú</span>
                        <input class="nb-input-sm" style="flex:1;" placeholder="Título del submenú" value="${item.label || ""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-list nb-children-list" style="gap:0.375rem;">${childrenHtml}</div>
                        <button class="nb-btn-sm-add nb-add-child"><i class="ri-add-line"></i> Agregar sub-enlace</button>
                    </div>`;
            } else {
                card.innerHTML = `
                    <div class="nb-link-card-header">
                        <span class="nb-type-badge nb-type-link">Link</span>
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${item.label || ""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-link-row">
                            <input class="nb-input-sm" style="flex:1;" placeholder="URL del enlace" value="${item.href || ""}" data-field="href">
                        </div>
                    </div>`;
            }

            card.querySelector(".nb-remove-link").onclick = () => {
                links.splice(idx, 1);
                renderLinks();
            };

            card.querySelectorAll("[data-field]").forEach((input) => {
                input.addEventListener("input", () => {
                    item[input.dataset.field] = input.value;
                });
            });

            if (item.type === "submenu") {
                card.querySelector(".nb-add-child").onclick = () => {
                    item.children = item.children || [];
                    item.children.push({
                        label: "Nuevo enlace",
                        href: "#",
                        icon: "",
                    });
                    renderLinks();
                };
                card.querySelectorAll(".nb-remove-child").forEach((btn) => {
                    btn.onclick = () => {
                        const ci = parseInt(
                            btn.closest("[data-child]").dataset.child,
                        );
                        item.children.splice(ci, 1);
                        renderLinks();
                    };
                });
                card.querySelectorAll(".nb-submenu-item [data-field]").forEach(
                    (input) => {
                        const ci = parseInt(
                            input.closest("[data-child]").dataset.child,
                        );
                        input.addEventListener("input", () => {
                            item.children[ci][input.dataset.field] =
                                input.value;
                        });
                    },
                );
            }

            list.appendChild(card);
        });
    }

    function renderActions() {
        const list = modal.querySelector("#nb-actions-list");
        list.innerHTML = "";
        actions.forEach((btn, idx) => {
            const card = document.createElement("div");
            card.className = "nb-action-card";
            card.innerHTML = `
                <div class="nb-row">
                    <input class="nb-input-sm" style="width:120px;flex-shrink:0;" placeholder="ri-icon (opcional)" value="${btn.icon || ""}" data-field="icon">
                    <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${btn.label || ""}" data-field="label">
                    <button class="nb-btn-remove nb-remove-action"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="nb-row">
                    <input class="nb-input-sm" style="flex:1;" placeholder="URL" value="${btn.href || ""}" data-field="href">
                    <select class="nb-select" data-field="style">
                        <option value="primary" ${btn.style === "primary" ? "selected" : ""}>Azul sólido</option>
                        <option value="outline" ${btn.style === "outline" ? "selected" : ""}>Azul outline</option>
                        <option value="orange" ${btn.style === "orange" ? "selected" : ""}>Naranja</option>
                    </select>
                </div>`;

            card.querySelector(".nb-remove-action").onclick = () => {
                actions.splice(idx, 1);
                renderActions();
            };
            card.querySelectorAll("[data-field]").forEach((input) => {
                input.addEventListener("input", () => {
                    btn[input.dataset.field] = input.value;
                });
                input.addEventListener("change", () => {
                    btn[input.dataset.field] = input.value;
                });
            });

            list.appendChild(card);
        });
    }

    renderLinks();
    renderActions();

    modal.querySelector("#nb-add-link").onclick = () => {
        links.push({ type: "link", label: "Nuevo enlace", href: "#" });
        renderLinks();
    };
    modal.querySelector("#nb-add-submenu").onclick = () => {
        links.push({
            type: "submenu",
            label: "Menú",
            children: [{ label: "Enlace", href: "#", icon: "" }],
        });
        renderLinks();
    };
    modal.querySelector("#nb-add-action").onclick = () => {
        actions.push({ label: "Botón", href: "#", style: "primary", icon: "" });
        renderActions();
    };

    const close = () => overlay.remove();
    modal.querySelector("#nb-modal-close").onclick = close;
    modal.querySelector("#nb-modal-cancel").onclick = close;
    overlay.onclick = (e) => {
        if (e.target === overlay) close();
    };

    modal.querySelector("#nb-modal-save").onclick = () => {
        const data = {
            logo_url: modal.querySelector("#nb-logo-url").value.trim(),
            logo_alt: modal.querySelector("#nb-logo-alt").value.trim(),
            logo_text: modal.querySelector("#nb-logo-text").value.trim(),
            links,
            actions,
        };
        const existingInner = component
            .getEl()
            ?.querySelector("[id^='nb-root-']");
        const existingUid = existingInner?.id?.replace("nb-root-", "") || null;
        const uid =
            existingUid || "nb" + Math.random().toString(36).slice(2, 7);

        component.addAttributes({ "data-navbar-config": JSON.stringify(data) });
        component.components(buildNavbarHTML(data, uid) + NAVBAR_STYLES);
        close();
    };
}

export function initializeNavbarBlock(editor) {
    const componentType = "navbar-component";

    editor.DomComponents.addType(componentType, {
        isComponent: (el) =>
            el.getAttribute?.("data-gjs-type") === componentType
                ? { type: componentType }
                : false,

        model: {
            defaults: {
                name: "Navbar",
                tagName: "nav",
                draggable: true,
                droppable: false,
                removable: true,
                copyable: false,
                selectable: true,
                hoverable: true,
                editable: false,
                highlightable: false,
                attributes: {
                    "data-gjs-type": componentType,
                    class: "nb-wrapper",
                    "data-navbar-config": JSON.stringify({
                        logo_url: "",
                        logo_alt: "Logo",
                        logo_text: "Logo",
                        links: [
                            {
                                type: "link",
                                label: "Sobre nosotros",
                                href: "#",
                            },
                            { type: "link", label: "Créditos", href: "#" },
                            { type: "link", label: "Depósitos", href: "#" },
                            {
                                type: "submenu",
                                label: "Otros servicios",
                                children: [
                                    {
                                        label: "Servicio 1",
                                        href: "#",
                                        icon: "",
                                    },
                                    {
                                        label: "Servicio 2",
                                        href: "#",
                                        icon: "",
                                    },
                                ],
                            },
                            { type: "link", label: "Contáctanos", href: "#" },
                        ],
                        actions: [
                            {
                                label: "Ingresar",
                                href: "#",
                                style: "primary",
                                icon: "",
                            },
                        ],
                    }),
                },
                components:
                    buildNavbarHTML({
                        logo_url: "",
                        logo_alt: "Logo",
                        logo_text: "Logo",
                        links: [
                            {
                                type: "link",
                                label: "Sobre nosotros",
                                href: "#",
                            },
                            { type: "link", label: "Créditos", href: "#" },
                            { type: "link", label: "Depósitos", href: "#" },
                            {
                                type: "submenu",
                                label: "Otros servicios",
                                children: [
                                    {
                                        label: "Servicio 1",
                                        href: "#",
                                        icon: "",
                                    },
                                    {
                                        label: "Servicio 2",
                                        href: "#",
                                        icon: "",
                                    },
                                ],
                            },
                            { type: "link", label: "Contáctanos", href: "#" },
                        ],
                        actions: [
                            {
                                label: "Ingresar",
                                href: "#",
                                style: "primary",
                                icon: "",
                            },
                        ],
                    }) + NAVBAR_STYLES,
                script: function () {
                    (function (root) {
                        if (!root || typeof root.querySelector !== "function")
                            return;
                        if (root.__nbInit) return;
                        root.__nbInit = true;
                        var id = root
                            .querySelector("[id^='nb-root-']")
                            ?.id?.replace("nb-root-", "");
                        if (!id) return;
                        var inEditor =
                            !!window.__gjseditor ||
                            document.documentElement.hasAttribute(
                                "data-gjs-canvas",
                            );
                        function pad() {
                            if (!inEditor) {
                                document.body.style.paddingTop =
                                    root.offsetHeight + "px";
                            }
                        }
                        pad();
                        window.addEventListener("resize", pad);
                        var toggle = document.getElementById("nb-toggle-" + id);
                        var mobile = document.getElementById("nb-mobile-" + id);
                        if (toggle && mobile) {
                            toggle.addEventListener("click", function () {
                                mobile.classList.toggle("nb-open");
                                pad();
                            });
                        }
                        root.querySelectorAll(".nb-submenu-trigger").forEach(
                            function (btn) {
                                btn.addEventListener("click", function (e) {
                                    e.stopPropagation();
                                    var item = btn.closest(".nb-item");
                                    var open =
                                        item.classList.contains("nb-open");
                                    root.querySelectorAll(
                                        ".nb-item.nb-open",
                                    ).forEach(function (el) {
                                        el.classList.remove("nb-open");
                                    });
                                    if (!open) item.classList.add("nb-open");
                                });
                            },
                        );
                        root.querySelectorAll(
                            ".nb-mobile-item>.nb-mobile-link",
                        ).forEach(function (btn) {
                            btn.addEventListener("click", function () {
                                btn.closest(".nb-mobile-item").classList.toggle(
                                    "nb-open",
                                );
                                pad();
                            });
                        });
                        document.addEventListener("click", function (e) {
                            if (!root.contains(e.target)) {
                                root.querySelectorAll(
                                    ".nb-item.nb-open",
                                ).forEach(function (el) {
                                    el.classList.remove("nb-open");
                                });
                            }
                        });
                    })(this);
                },
                "script-props": [],
                toolbar: [],
                traits: [
                    {
                        type: "button",
                        label: "Navbar",
                        text: "Administrar Navbar",
                        full: true,
                        command: "open-navbar-config",
                    },
                ],
            },

            init() {
                this.set("type", componentType);
                this.addAttributes({ "data-gjs-type": componentType });
            },
        },
    });

    editor.Commands.add("open-navbar-config", {
        run(ed) {
            const selected = ed.getSelected();
            if (selected) showNavbarModal(ed, selected);
        },
    });

    editor.BlockManager.add("navbar-block", {
        label: "Navbar",
        category: "Navbar",
        media: `<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="12" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="17" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="22" y="14" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.7)"/>
            <rect x="24" y="11" width="6" height="10" rx="2" fill="#E97300"/>
        </svg>`,
        activate: true,
        content: {
            type: componentType,
            attributes: { "data-gjs-type": componentType },
        },
    });

    setupNavbarEditorEvents(editor, componentType);
    injectNavbarCanvasStyles(editor);
}

function setupNavbarEditorEvents(editor, componentType) {
    editor.on("storage:end:load", () => {
        setTimeout(() => reinitNavbar(editor, componentType), 800);
    });

    editor.on("component:mount", (component) => {
        const el = component.getEl();
        if (el?.getAttribute?.("data-gjs-type") === componentType) {
            component.set("type", componentType);
            setTimeout(() => runNavbarScriptInCanvas(editor, el), 400);
        }
    });

    editor.on("canvas:render", () => {
        setTimeout(() => reinitNavbar(editor, componentType), 600);
    });
}

function runNavbarScriptInCanvas(editor, el) {
    if (!el?.isConnected) return;
    try {
        const iframeDoc = editor.Canvas.getFrameEl()?.contentDocument;
        if (!iframeDoc) return;
        if (el.__nbInit) delete el.__nbInit;
        const scriptEl = iframeDoc.createElement("script");
        scriptEl.textContent = `(function(){
            function initNavbar(root){
                if(!root||root.__nbInit)return;
                root.__nbInit=true;
                var id=root.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");
                if(!id)return;
                function pad(){document.body.style.paddingTop=root.offsetHeight+"px";}
                pad();
                window.addEventListener("resize",pad);
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
        })();`;
        iframeDoc.head.appendChild(scriptEl);
        scriptEl.remove();
    } catch (e) {
        console.warn("[Navbar] Error inyectando script en canvas:", e);
    }
}

function reinitNavbar(editor, componentType) {
    editor
        .getWrapper()
        .find(`[data-gjs-type="${componentType}"]`)
        .forEach((comp) => {
            comp.set("type", componentType);
            const el = comp.getEl();
            if (el?.isConnected) {
                runNavbarScriptInCanvas(editor, el);
            }
        });
}

function injectNavbarCanvasStyles(editor) {
    editor.on("load", () => {
        const iframe = editor.Canvas.getFrameEl();
        if (!iframe) return;
        const iframeDoc = iframe.contentDocument;
        const head = iframeDoc?.head;
        if (!head) return;
        iframeDoc.documentElement?.setAttribute("data-gjs-canvas", "true");
        if (!head.querySelector("#navbar-component-css")) {
            const style = document.createElement("style");
            style.id = "navbar-component-css";
            style.textContent = `
                [data-gjs-type="navbar-component"] {
                    outline: 2px dashed rgba(240,135,42,0.4);
                    outline-offset: 2px;
                    position: relative !important;
                    top: auto !important;
                }
                body {
                    padding-top: 0 !important;
                }
            `;
            head.appendChild(style);
        }
    });
}
