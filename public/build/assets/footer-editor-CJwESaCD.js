import{i as L,t as $,d as j,f as T,e as z,s as q,g as M,c as H,E as A,j as N,h as F}from"./editor-commands-DIM4nSZH.js";import"./_commonjsHelpers-CqkleIqs.js";function _(){return L()}const E="gjs-media-picker-modal";function U(){if(document.getElementById("gjs-media-picker-styles"))return;const e=document.createElement("style");e.id="gjs-media-picker-styles",e.textContent=`
        .mp-overlay {
            display: none;
            position: fixed;
            inset: 0;
            z-index: 9999999;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: rgba(15, 23, 42, 0.45);
            backdrop-filter: blur(3px);
        }
        .mp-overlay.open { display: flex; }

        .mp-modal {
            background: #ffffff;
            border-radius: 0.75rem;
            width: 100%;
            max-width: 780px;
            max-height: 88vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
            box-shadow: 0 20px 60px rgba(15,23,42,0.18), 0 4px 16px rgba(15,23,42,0.08);
            border: 1px solid #e2e8f0;
        }

        .mp-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.25rem;
            border-bottom: 1px solid #f1f5f9;
            background: #ffffff;
            flex-shrink: 0;
        }
        .mp-header-left {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #0f172a;
            font-size: 0.9375rem;
            font-weight: 600;
        }
        .mp-header-left i { font-size: 1.125rem; color: #3b82f6; }

        .mp-close {
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
        .mp-close:hover { background: #f1f5f9; color: #475569; }
        .mp-close i { font-size: 1.125rem; }

        .mp-search {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            padding: 0.75rem 1.25rem;
            border-bottom: 1px solid #f1f5f9;
            background: #f8fafc;
            flex-shrink: 0;
        }
        .mp-search i { color: #94a3b8; font-size: 1rem; flex-shrink: 0; }
        .mp-search input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: #1e293b;
            font-size: 0.875rem;
            font-family: inherit;
        }
        .mp-search input::placeholder { color: #b0bec5; }

        .mp-grid-wrap {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
            background: #f8fafc;
            scrollbar-width: thin;
            scrollbar-color: #e2e8f0 transparent;
        }
        .mp-grid-wrap::-webkit-scrollbar { width: 5px; }
        .mp-grid-wrap::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 3px; }

        .mp-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 0.75rem;
        }

        .mp-card {
            cursor: pointer;
            border-radius: 0.5rem;
            border: 2px solid #e2e8f0;
            overflow: hidden;
            background: #ffffff;
            transition: border-color 0.15s, box-shadow 0.15s;
        }
        .mp-card:hover { border-color: #94a3b8; }
        .mp-card.selected {
            border-color: #003B71;
            box-shadow: 0 0 0 3px rgba(0,59,113,0.15);
        }
        .mp-card img {
            width: 100%;
            aspect-ratio: 16/10;
            object-fit: cover;
            display: block;
        }
        .mp-card p {
            font-size: 0.65rem;
            padding: 4px 6px;
            color: #374151;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 0;
        }

        .mp-loading {
            grid-column: 1 / -1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 3rem 1rem;
            gap: 1rem;
            color: #6b7280;
            font-size: 0.875rem;
        }
        .mp-spinner {
            width: 2rem;
            height: 2rem;
            border: 3px solid #e5e7eb;
            border-top-color: #003B71;
            border-radius: 50%;
            animation: mp-spin 0.8s linear infinite;
        }
        @keyframes mp-spin { to { transform: rotate(360deg); } }

        .mp-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1rem 1.25rem;
            border-top: 1px solid #f1f5f9;
            background: #ffffff;
            flex-shrink: 0;
        }
        .mp-footer-info { font-size: 0.8rem; color: #6b7280; }

        .mp-btn {
            padding: 0.5rem 1.25rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            font-family: inherit;
            transition: opacity 0.15s, background 0.15s;
            display: inline-flex;
            align-items: center;
            gap: 0.375rem;
        }
        .mp-btn:hover { opacity: 0.88; }
        .mp-btn-cancel {
            background: #ffffff;
            border: 2px solid #e2e8f0;
            color: #475569;
        }
        .mp-btn-confirm {
            background: #003B71;
            border: 2px solid #003B71;
            color: #ffffff;
        }
        .mp-btn-confirm:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
    `,document.head.appendChild(e)}function D(){if(document.getElementById(E))return;U();const e=document.createElement("div");e.id=E,e.className="mp-overlay",e.innerHTML=`
        <div class="mp-modal">
            <div class="mp-header">
                <div class="mp-header-left">
                    <i class="ri-image-line"></i>
                    <span id="mp-title">Seleccionar imagen</span>
                </div>
                <button class="mp-close" id="mp-close">
                    <i class="ri-close-line"></i>
                </button>
            </div>
            <div class="mp-search">
                <i class="ri-search-line"></i>
                <input type="text" id="mp-search-input" placeholder="Buscar por nombre...">
            </div>
            <div class="mp-grid-wrap">
                <div class="mp-grid" id="mp-grid"></div>
            </div>
            <div class="mp-footer">
                <span class="mp-footer-info" id="mp-footer-info">Ningún archivo seleccionado</span>
                <div style="display:flex;gap:0.5rem;">
                    <button class="mp-btn mp-btn-cancel" id="mp-cancel">Cancelar</button>
                    <button class="mp-btn mp-btn-confirm" id="mp-confirm" disabled>
                        <i class="ri-check-line"></i> Usar archivo
                    </button>
                </div>
            </div>
        </div>
    `,document.body.appendChild(e);let t=null,o=null,n=null;const r=()=>document.getElementById("mp-grid"),v=()=>document.getElementById("mp-confirm"),m=()=>document.getElementById("mp-footer-info"),a=()=>document.getElementById("mp-search-input");async function d(f="",g="image"){r().innerHTML=`
            <div class="mp-loading">
                <div class="mp-spinner"></div>
                <span>Cargando...</span>
            </div>`;try{const y=document.querySelector('meta[name="media-api-url"]')?.content??"/media/api",b=new URLSearchParams({per_page:60});g&&b.append("type",g),f&&b.append("search",f);const s=(await(await fetch(`${y}?${b}`,{headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}})).json()).items||[];if(!s.length){r().innerHTML=`
                    <div class="mp-loading">
                        <i class="ri-image-line" style="font-size:2rem;color:#cbd5e1;"></i>
                        <span>No se encontraron archivos</span>
                    </div>`;return}r().innerHTML="",s.forEach(h=>{const c=document.createElement("div");c.className="mp-card",c.innerHTML=`
                    <img src="${h.url}" alt="${h.filename}" loading="lazy">
                    <p title="${h.filename}">${h.filename}</p>
                `,c.addEventListener("click",()=>{r().querySelectorAll(".mp-card").forEach(u=>u.classList.remove("selected")),c.classList.add("selected"),t=h.url,m().textContent=`Seleccionado: ${h.filename}`,v().disabled=!1}),r().appendChild(c)})}catch{r().innerHTML=`
                <div class="mp-loading">
                    <i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i>
                    <span style="color:#dc2626;">Error al cargar archivos</span>
                </div>`}}function l(){e.classList.remove("open"),t=null,o=null,document.body.style.overflow=""}document.getElementById("mp-close").addEventListener("click",l),document.getElementById("mp-cancel").addEventListener("click",l),document.getElementById("mp-confirm").addEventListener("click",()=>{t&&o&&o(t),l()}),e.addEventListener("click",f=>{f.target===e&&l()}),document.getElementById("mp-search-input").addEventListener("input",f=>{clearTimeout(n),n=setTimeout(()=>{e._currentType&&d(f.target.value,e._currentType)},300)}),e._open=({type:f="image",title:g,onSelect:y})=>{o=y,t=null,e._currentType=f,document.getElementById("mp-title").textContent=g||(f==="image"?"Seleccionar imagen":"Seleccionar archivo"),a().value="",m().textContent="Ningún archivo seleccionado",v().disabled=!0,e.classList.add("open"),document.body.style.overflow="hidden",d("",f)}}function P({type:e="image",title:t,onSelect:o}={}){D(),document.getElementById(E)._open({type:e,title:t,onSelect:o})}const B=`
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
</style>`;function I(e){const t=e.logo_url?`<img src="${e.logo_url}" alt="${e.logo_alt||"Logo"}">`:'<div style="color:#fff;font-weight:800;font-size:1.25rem;">Logo</div>',o=(e.sections||[]).map((n,r)=>{const v=(n.links||[]).map(m=>{const a=m.icon?`<i class="${m.icon}"></i>`:"",d=m.href||"#";return m.isText?`<li><span class="ft-text">${a}${m.label}</span></li>`:`<li><a href="${d}">${a}${m.label}</a></li>`}).join("");return`
<div class="ft-section" data-section-index="${r}">
    <p class="ft-section-title">${n.title}</p>
    <ul class="ft-links">${v}</ul>
</div>`}).join("");return`
<div class="ft-inner"
    data-gjs-editable="false"
    data-gjs-selectable="false"
    data-gjs-hoverable="false">
    <div class="ft-logo-col"
        data-gjs-editable="false"
        data-gjs-selectable="false">${t}</div>
    <div class="ft-sections"
        data-gjs-editable="false"
        data-gjs-selectable="false">${o}</div>
</div>
<div class="ft-stripe"
    data-gjs-editable="false"
    data-gjs-selectable="false"></div>`}function G(){return function(){}}function O(e,t){const o=document.getElementById("footer-config-modal");if(o&&o.remove(),!document.getElementById("ft-modal-styles")){const i=document.createElement("style");i.id="ft-modal-styles",i.textContent=`
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
        `,document.head.appendChild(i)}const n=(()=>{try{return JSON.parse(t.getAttributes()["data-footer-config"]||"{}")}catch{return{}}})(),r=n.sections||[{title:"Sección",links:[{label:"Enlace",href:"#",icon:""}]}],v=n.logo_url||"",m=n.logo_alt||"",a=document.createElement("div");a.id="footer-config-modal",a.className="ft-overlay";const d=document.createElement("div");d.className="ft-modal",d.innerHTML=`
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
                        ${v?`<img id="ft-logo-preview" src="${v}" alt="Logo preview" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;">`:'<div id="ft-logo-preview" style="display:none;"></div>'}
                        <input id="ft-logo-url" type="text" placeholder="URL del logo" value="${v}" class="ft-modal-input" style="width:100%;">
                    </div>
                    <button id="ft-logo-pick" type="button" style="flex-shrink:0;padding:0.5rem 0.875rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.8rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;">
                        <i class="ri-image-line"></i> Seleccionar
                    </button>
                    <input id="ft-logo-alt" type="text" placeholder="Texto alternativo" value="${m}" class="ft-modal-input">
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
    `,a.appendChild(d),document.body.appendChild(a);const l=d.querySelector("#ft-sections-container");function f(i,p){const s=document.createElement("div");s.className="ft-section-card",s.dataset.sectionIndex=p;const h=(i.links||[]).map((c,u)=>`
            <div class="ft-link-row" data-link-index="${u}" style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap;">
                <input class="ft-modal-input-sm ft-link-icon-input ft-link-icon" type="text"
                    placeholder="ri-phone-line (opcional)" value="${c.icon||""}">
                <input class="ft-modal-input-sm ft-link-label" type="text"
                    placeholder="Texto" value="${c.label||""}">
                <input class="ft-modal-input-sm ft-link-href" type="text"
                    placeholder="URL o tel:0000-0000" value="${c.href||""}"
                    style="${c.isText?"opacity:0.4;pointer-events:none;":""}">
                <label style="display:flex;align-items:center;gap:0.25rem;font-size:0.75rem;color:#64748b;white-space:nowrap;cursor:pointer;">
                    <input type="checkbox" class="ft-link-istext" ${c.isText?"checked":""}
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
                <div class="ft-links-container">${h}</div>
                <button class="ft-btn-add-link">
                    <i class="ri-add-line"></i> Agregar enlace
                </button>
            </div>
        `,s.querySelector(".ft-remove-section").onclick=()=>{r.splice(p,1),g()},s.querySelector(".ft-btn-add-link").onclick=()=>{i.links=i.links||[],i.links.push({label:"Nuevo enlace",href:"#",icon:""}),g()},s.querySelectorAll(".ft-remove-link").forEach(c=>{c.onclick=()=>{const u=parseInt(c.closest(".ft-link-row").dataset.linkIndex);i.links.splice(u,1),g()}}),s.querySelectorAll(".ft-link-istext").forEach(c=>{c.addEventListener("change",()=>{const u=c.closest(".ft-link-row").querySelector(".ft-link-href");c.checked?(u.style.opacity="0.4",u.style.pointerEvents="none",u.value=""):(u.style.opacity="1",u.style.pointerEvents="auto")})}),s}function g(){l.innerHTML="",r.forEach((i,p)=>l.appendChild(f(i,p)))}g(),d.querySelector("#ft-logo-pick").addEventListener("click",()=>{P({type:"image",title:"Seleccionar logo",onSelect:i=>{d.querySelector("#ft-logo-url").value=i;let p=d.querySelector("#ft-logo-preview");if(!p||p.tagName==="DIV"){const s=document.createElement("img");s.id="ft-logo-preview",s.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;margin-bottom:0.5rem;",p?.replaceWith(s)??d.querySelector("#ft-logo-url").before(s),p=s}p.src=i,p.style.display="block"}})}),d.querySelector("#ft-add-section").onclick=()=>{r.push({title:"Nueva Sección",links:[]}),g()};function y(){const i=d.querySelector("#ft-logo-url").value.trim(),p=d.querySelector("#ft-logo-alt").value.trim(),s=[];return l.querySelectorAll("[data-section-index]").forEach(h=>{const c=h.querySelector(".ft-section-title-input").value.trim(),u=[];h.querySelectorAll(".ft-link-row").forEach(x=>{const w=x.querySelector(".ft-link-istext")?.checked??!1;u.push({icon:x.querySelector(".ft-link-icon").value.trim(),label:x.querySelector(".ft-link-label").value.trim(),href:w?"":x.querySelector(".ft-link-href").value.trim(),isText:w})}),s.push({title:c,links:u})}),{logo_url:i,logo_alt:p,sections:s}}const b=()=>a.remove();d.querySelector("#ft-modal-close").onclick=b,d.querySelector("#ft-modal-cancel").onclick=b,a.onclick=i=>{i.target===a&&b()},d.querySelector("#ft-modal-save").onclick=()=>{const i=y();t.addAttributes({"data-footer-config":JSON.stringify(i)}),t.components(I(i)+B),b()}}function R(e){const t="footer-component";e.DomComponents.addType(t,{isComponent:o=>o.getAttribute?.("data-gjs-type")===t?{type:t}:!1,model:{defaults:{name:"Footer",tagName:"footer",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":t,class:"ft-wrapper","data-footer-config":JSON.stringify({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""},{label:"Otros Servicios",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""},{label:"Red de Agencias",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000 - 0000",href:"tel:0000-0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:info@banco.com",icon:"ri-mail-line"},{label:"Dirección",href:"#",icon:"ri-map-pin-line"}]}]})},components:I({logo_url:"",logo_alt:"Logo",sections:[{title:"Productos",links:[{label:"Créditos",href:"#",icon:""},{label:"Depósitos",href:"#",icon:""}]},{title:"Sobre Nosotros",links:[{label:"Historial",href:"#",icon:""},{label:"Misión y Visión",href:"#",icon:""}]},{title:"Contáctanos",links:[{label:"0000-0000",href:"tel:0000",icon:"ri-phone-line"},{label:"Correo",href:"mailto:",icon:"ri-mail-line"}]}]})+B,script:G(),toolbar:[],traits:[{type:"button",label:"Footer",text:"Administrar Footer",full:!0,command:"open-footer-config"}]},init(){this.set("type",t),this.addAttributes({"data-gjs-type":t})}}}),e.Commands.add("open-footer-config",{run(o){const n=o.getSelected();n&&O(o,n)}}),e.Commands.add("insert-default-footer",{run(o){o.DomComponents.clear(),o.addComponents({type:t})}}),e.BlockManager.add("footer-block",{label:"Footer",category:"Footer",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="6" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="12" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="12" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="6" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.8)"/>
            <rect x="19" y="9" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="19" y="11" width="4" height="1" rx="0.5" fill="rgba(255,255,255,0.5)"/>
            <rect x="0" y="26" width="32" height="6" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:t,attributes:{"data-gjs-type":t}}}),J(e,t),W(e)}function J(e,t){e.on("storage:end:load",()=>{setTimeout(()=>C(e,t),800)}),e.on("component:mount",o=>{const n=o.getEl();n?.getAttribute?.("data-gjs-type")===t&&(o.set("type",t),setTimeout(()=>{const r=o.get("script");r&&typeof r=="function"&&r.call(n)},400))}),e.on("canvas:render",()=>{setTimeout(()=>C(e,t),600)})}function C(e,t){e.getWrapper().find(`[data-gjs-type="${t}"]`).forEach(o=>{o.set("type",t);const n=o.getEl();if(n?.isConnected){const r=o.get("script");r&&typeof r=="function"&&r.call(n)}})}function W(e){e.on("load",()=>{const t=e.Canvas.getFrameEl();if(!t)return;const o=t.contentDocument?.head;if(o&&!o.querySelector("#footer-component-css")){const n=document.createElement("style");n.id="footer-component-css",n.textContent=`
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
            `,o.appendChild(n)}})}document.addEventListener("DOMContentLoaded",async()=>{const e=new A;let t=document.getElementById("footer-id")?.value||"",o=document.getElementById("footer-name")?.value||"",n=document.getElementById("footer-load-url")?.value||"",r=document.getElementById("footer-store-url")?.value||"";const v=document.getElementById("footer-is-active")?.value==="1";let m=!!t;const a=_();if(R(a),a.on("load",()=>{$(a),j(),T(),z(a),q(a),M(a),H(a),V(a),setTimeout(()=>{a.runCommand("sw-visibility"),a.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),m&&n)try{await e.loadPageContent(a,n),k("Footer cargado correctamente","success")}catch{k("Error al cargar el footer","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const l=document.getElementById("save-button");l.disabled=!0,l.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!m&&!o?N({title:"Nombre del Footer",description:"Ingresa un nombre descriptivo para identificar este footer.",placeholder:"Ej: Footer Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async f=>{if(!f?.trim()){k("El nombre es obligatorio","error"),l.disabled=!1,l.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await d(f)}catch(g){k(g.message,"error")}finally{l.disabled=!1,l.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{l.disabled=!1,l.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await d(o),l.disabled=!1,l.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(f){k(f.message,"error"),l.disabled=!1,l.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function d(l){const f=m?"PUT":"POST",g=e.getEditorContent(a),y=await e.savePage(a,{...g,name:l,is_active:v},r,f);if(y.success){if(e.markAsClean(),k(y.message,"success"),!m&&y.footer){t=y.footer.id,o=y.footer.name,m=!0;const b=document.getElementById("footer-id");b&&(b.value=t);const i=document.getElementById("footer-name");i&&(i.value=o);const p=document.querySelector('meta[name="app-url"]'),s=p?p.content:"";r=r.endsWith("/footers")?`${r}/${t}`:`${r.replace(/\/footers\/?$/,"")}/footers/${t}`;const c=document.getElementById("footer-store-url");c&&(c.value=r),n=`${r}/load`;const u=document.getElementById("footer-load-url");u&&(u.value=n);const x=document.getElementById("editor-title");x&&(x.textContent=`Editando Footer: ${o}`);const w=`/footers/${t}/edit`,S=s?`${s}${w}`:w;window.history.replaceState({path:S},"",S)}else if(l){o=l;const b=document.getElementById("footer-name");b&&(b.value=o);const i=document.getElementById("editor-title");i&&(i.textContent=`Editando Footer: ${o}`)}}}});function V(e){e.Commands.add("canvas-clear",{run:t=>{F({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{t.DomComponents.clear(),t.CssComposer.clear()}})}})}function k(e,t="info"){typeof window.showNotification=="function"&&window.showNotification(e,t)}
