const f="gjs-media-picker-modal";function v(){if(document.getElementById("gjs-media-picker-styles"))return;const e=document.createElement("style");e.id="gjs-media-picker-styles",e.textContent=`
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
        .mp-card-icon-thumb {
            width: 100%;
            aspect-ratio: 16/10;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .mp-card-icon-thumb i {
            font-size: 2.25rem;
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
    `,document.head.appendChild(e)}function w(e){const r=(e.split(".").pop()||"").toLowerCase();return{pdf:{icon:"ri-file-pdf-2-fill",color:"#dc2626",bg:"#fef2f2"},xls:{icon:"ri-file-excel-2-fill",color:"#16a34a",bg:"#f0fdf4"},xlsx:{icon:"ri-file-excel-2-fill",color:"#16a34a",bg:"#f0fdf4"},doc:{icon:"ri-file-word-2-fill",color:"#2563eb",bg:"#eff6ff"},docx:{icon:"ri-file-word-2-fill",color:"#2563eb",bg:"#eff6ff"}}[r]||{icon:"ri-file-text-fill",color:"#6b7280",bg:"#f3f4f6"}}function k(){if(document.getElementById(f))return;v();const e=document.createElement("div");e.id=f,e.className="mp-overlay",e.innerHTML=`
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
    `,document.body.appendChild(e);let r=null,o=null,m=null;const t=()=>document.getElementById("mp-grid"),g=()=>document.getElementById("mp-confirm"),u=()=>document.getElementById("mp-footer-info"),y=()=>document.getElementById("mp-search-input");async function b(i="",s="image"){t().innerHTML=`
            <div class="mp-loading">
                <div class="mp-spinner"></div>
                <span>Cargando...</span>
            </div>`;try{const p=document.querySelector('meta[name="media-api-url"]')?.content??"/media/api",a=new URLSearchParams({per_page:60});s&&a.append("type",s),i&&a.append("search",i);const h=(await(await fetch(`${p}?${a}`,{headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}})).json()).items||[];if(!h.length){t().innerHTML=`
                    <div class="mp-loading">
                        <i class="ri-image-line" style="font-size:2rem;color:#cbd5e1;"></i>
                        <span>No se encontraron archivos</span>
                    </div>`;return}t().innerHTML="",h.forEach(n=>{const l=document.createElement("div");l.className="mp-card";const x=n.type==="image"?`<img src="${n.url}" alt="${n.filename}" loading="lazy">`:(()=>{const c=w(n.filename);return`<div class="mp-card-icon-thumb" style="background:${c.bg};">
                                <i class="${c.icon}" style="color:${c.color};"></i>
                            </div>`})();l.innerHTML=`
                    ${x}
                    <p title="${n.filename}">${n.filename}</p>
                `,l.addEventListener("click",()=>{t().querySelectorAll(".mp-card").forEach(c=>c.classList.remove("selected")),l.classList.add("selected"),r=n.url,u().textContent=`Seleccionado: ${n.filename}`,g().disabled=!1}),t().appendChild(l)})}catch{t().innerHTML=`
                <div class="mp-loading">
                    <i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i>
                    <span style="color:#dc2626;">Error al cargar archivos</span>
                </div>`}}function d(){e.classList.remove("open"),r=null,o=null,document.body.style.overflow=""}document.getElementById("mp-close").addEventListener("click",d),document.getElementById("mp-cancel").addEventListener("click",d),document.getElementById("mp-confirm").addEventListener("click",()=>{r&&o&&o(r),d()}),e.addEventListener("click",i=>{i.target===e&&d()}),document.getElementById("mp-search-input").addEventListener("input",i=>{clearTimeout(m),m=setTimeout(()=>{e._currentType&&b(i.target.value,e._currentType)},300)}),e._open=({type:i="image",title:s,onSelect:p})=>{o=p,r=null,e._currentType=i,document.getElementById("mp-title").textContent=s||(i==="image"?"Seleccionar imagen":"Seleccionar archivo");const a=document.querySelector("#gjs-media-picker-modal .mp-header-left i");a&&(a.className=i==="image"?"ri-image-line":"ri-file-line"),y().value="",u().textContent="Ningún archivo seleccionado",g().disabled=!0,e.classList.add("open"),document.body.style.overflow="hidden",b("",i)}}function B({type:e="image",title:r,onSelect:o}={}){k(),document.getElementById(f)._open({type:e,title:r,onSelect:o})}export{B as o};
