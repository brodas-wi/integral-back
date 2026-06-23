/* empty css                   *//* empty css                    *//* empty css                          *//* empty css                           */import{M as He,j as Fe,E as Oe,i as Re,t as Ue,d as Ve,f as Ye,e as We,s as Ge,g as Ze,c as Ke,b as Xe,a as Qe,h as Je}from"./editor-commands-C7f79RQP.js";import{a as P}from"./url-DaqOO3yL.js";import"./_commonjsHelpers-CqkleIqs.js";class et{constructor(){this.pageId=this.getElementValue("page-id"),this.pageSlug=this.getElementValue("page-slug"),this.pageTitle=this.getPageTitle(),this.loadUrl=this.getElementValue("page-load-url"),this.storeUrl=this.getElementValue("page-store-url"),this.isPublished=this.getElementValue("page-is-published")==="1",this.isEditMode=!!this.pageId,this.appUrl=(document.querySelector('meta[name="app-url"]')?.content??"").replace(/\/$/,"")}getElementValue(e,t=""){const r=document.getElementById(e);return r?r.value.trim():t}getPageTitle(){const e=document.getElementById("editor-title");if(!e)return"";const r=e.textContent.match(/(?:Editando:|Nueva Página)\s*(.+)?/);return r&&r[1]?r[1].trim():""}updatePageInfo(e){if(e.page)if(this.pageId=e.page.id,this.pageSlug=e.page.slug,this.pageTitle=e.page.title,this.isEditMode=!0,document.getElementById("page-id").value=this.pageId,document.getElementById("page-slug").value=this.pageSlug,e.page.update_url?this.storeUrl=e.page.update_url:this.storeUrl=`${this.appUrl}/pages/${this.pageSlug}`,document.getElementById("page-store-url").value=this.storeUrl,e.page.load_url?this.loadUrl=e.page.load_url:this.loadUrl=`${this.appUrl}/pages/${this.pageSlug}/load`,document.getElementById("page-load-url").value=this.loadUrl,e.page.edit_url)window.history.replaceState(null,"",e.page.edit_url);else try{const t=new URL(window.location.href);t.pathname=t.pathname.replace(/\/pages\/create\/?$/,`/pages/${this.pageSlug}/edit`),window.history.replaceState(null,"",t.toString())}catch(t){console.error("Error updating browser URL:",t)}}updateTitle(e){this.pageTitle=e;const t=document.getElementById("editor-title");t&&(t.textContent=`Editando: ${e}`),document.title=`Editar: ${e} - Editor`}getHttpMethod(){return this.isEditMode?"PUT":"POST"}needsTitle(){return!this.isEditMode}}class tt{constructor(e){this.editorService=e,this.setupBackButton(),this.setupBeforeUnload()}setupBackButton(){const e=document.querySelector("#editor-navbar a[href]");e&&e.addEventListener("click",t=>{this.editorService.shouldPreventUnload()&&(t.preventDefault(),this.showUnsavedChangesModal(()=>{this.editorService.startNavigation(),window.location.href=e.href}))})}setupBeforeUnload(){window.addEventListener("beforeunload",e=>{if(this.editorService.shouldPreventUnload())return e.preventDefault(),e.returnValue="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?",e.returnValue})}showUnsavedChangesModal(e){const t=document.createElement("div");t.style.cssText=`
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.5);
        `;const r=document.createElement("div");r.style.cssText=`
            background: #ffffff;
            border-radius: 0.75rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 28rem;
            width: 100%;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
        `;const a=document.createElement("div");a.style.cssText="padding: 1.5rem 1.5rem 0;",a.innerHTML=`
            <div style="display:flex;align-items:flex-start;gap:1rem;">
                <div style="flex-shrink:0;width:3rem;height:3rem;border-radius:50%;background:#fef3c7;color:#d97706;display:flex;align-items:center;justify-content:center;">
                    <i class="ri-alert-line" style="font-size:1.5rem;"></i>
                </div>
                <div style="flex:1;">
                    <h3 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 0.5rem;">Cambios sin guardar</h3>
                    <p style="font-size:0.875rem;color:#6b7280;margin:0;">Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin guardar?</p>
                </div>
            </div>
        `;const o=document.createElement("div");o.style.cssText=`
            padding: 1rem 1.5rem;
            background: #f9fafb;
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
            margin-top: 1.5rem;
        `;const d=document.createElement("button");d.textContent="Cancelar",d.style.cssText=`
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            background: #ffffff;
            color: #374151;
            border: 2px solid #d1d5db;
            font-family: inherit;
        `;const c=document.createElement("button");c.textContent="Salir sin guardar",c.style.cssText=`
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            background: #dc2626;
            color: #ffffff;
            border: 2px solid #dc2626;
            font-family: inherit;
        `,[d,c].forEach(g=>{g.addEventListener("mouseenter",()=>{g.style.opacity="0.85"}),g.addEventListener("mouseleave",()=>{g.style.opacity="1"})});const f=()=>t.remove();d.addEventListener("click",f),c.addEventListener("click",()=>{f(),e()}),t.addEventListener("click",g=>{g.target===t&&f()}),o.appendChild(d),o.appendChild(c),r.appendChild(a),r.appendChild(o),t.appendChild(r),document.body.appendChild(t)}}const it="Básico";class at{constructor(){this.blocks=new Map}registerBlock(e,t){this.blocks.has(t.category)||this.blocks.set(t.category,[]),this.blocks.get(t.category).push({id:e,...t})}registerBlocks(e){e.forEach(t=>{this.registerBlock(t.id,t)})}applyToEditor(e){this.blocks.forEach(t=>{t.forEach(r=>{const{id:a,...o}=r;e.BlockManager.add(a,o)})}),this.applyCollapseSettings(e),this.hideDefaultCategories(e)}applyCollapseSettings(e){setTimeout(()=>{e.BlockManager.getCategories().each(t=>{t.set("open",t.get("label")===it)})},500)}hideDefaultCategories(e){setTimeout(()=>{const t=["Basic","Extra"];document.querySelectorAll(".gjs-block-category").forEach(r=>{const a=r.querySelector(".gjs-title");a&&t.includes(a.textContent.trim())&&(r.style.display="none")})},100)}}const S=new at,rt=[{id:"heading1",label:"Título H1",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <text x="16" y="22" text-anchor="middle" font-size="18" font-weight="800" fill="#003B71">H1</text>
        </svg>`,content:'<h1 class="text-4xl font-bold leading-tight text-[#003B71]">Título Principal</h1>'},{id:"heading2",label:"Título H2",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <text x="16" y="22" text-anchor="middle" font-size="16" font-weight="700" fill="#003B71">H2</text>
        </svg>`,content:'<h2 class="text-3xl font-bold leading-snug text-[#003B71]">Subtítulo</h2>'},{id:"heading3",label:"Título H3",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <text x="16" y="22" text-anchor="middle" font-size="14" font-weight="700" fill="#003B71">H3</text>
        </svg>`,content:'<h3 class="text-2xl font-bold leading-snug text-[#003B71]">Título de Sección</h3>'},{id:"heading4",label:"Título H4",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <text x="16" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="#003B71">H4</text>
        </svg>`,content:'<h4 class="text-xl font-bold leading-snug text-[#003B71]">Título de Subsección</h4>'},{id:"paragraph",label:"Párrafo",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="4" y="8" width="24" height="2" rx="1" fill="#003B71"/>
            <rect x="4" y="13" width="24" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
            <rect x="4" y="18" width="18" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
        </svg>`,content:'<p class="text-base font-normal leading-relaxed text-gray-800">Este es un párrafo de ejemplo. Puedes editar este texto y agregar tu propio contenido aquí.</p>'},{id:"link",label:"Enlace",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <path fill="#003B71" d="M13 10H10a6 6 0 000 12h3v-2h-3a4 4 0 010-8h3v-2zm6 0h-3v2h3a4 4 0 010 8h-3v2h3a6 6 0 000-12zm-8 7h6v-2h-6v2z"/>
        </svg>`,content:'<a href="#" class="text-base font-medium underline text-[#003B71]">Texto del enlace</a>'},{id:"image",label:"Imagen",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="3" y="6" width="26" height="20" rx="2" fill="#003B71" fill-opacity="0.15" stroke="#003B71" stroke-width="1.5"/>
            <circle cx="10" cy="13" r="2.5" fill="#003B71" fill-opacity="0.5"/>
            <path d="M3 22l7-7 5 5 3-3 9 9" stroke="#003B71" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
        </svg>`,content:{type:"image",attributes:{src:P("images/placeholder.svg"),alt:"Imagen"},classes:["max-w-full","h-auto","block"],activeOnRender:1}},{id:"unordered-list",label:"Lista no ordenada",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <circle cx="7" cy="10" r="2" fill="#003B71"/>
            <rect x="12" y="9" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
            <circle cx="7" cy="17" r="2" fill="#003B71"/>
            <rect x="12" y="16" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
            <circle cx="7" cy="24" r="2" fill="#003B71"/>
            <rect x="12" y="23" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
        </svg>`,content:`<ul class="list-disc list-inside flex flex-col gap-1 text-base font-normal leading-relaxed text-gray-800">
            <li>Elemento de lista</li>
            <li>Elemento de lista</li>
            <li>Elemento de lista</li>
        </ul>`},{id:"ordered-list",label:"Lista ordenada",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <text x="5" y="12" font-size="7" font-weight="700" fill="#003B71">1.</text>
            <rect x="12" y="9" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
            <text x="5" y="19" font-size="7" font-weight="700" fill="#003B71">2.</text>
            <rect x="12" y="16" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
            <text x="5" y="26" font-size="7" font-weight="700" fill="#003B71">3.</text>
            <rect x="12" y="23" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
        </svg>`,content:`<ol class="list-decimal list-inside flex flex-col gap-1 text-base font-normal leading-relaxed text-gray-800">
            <li>Elemento de lista</li>
            <li>Elemento de lista</li>
            <li>Elemento de lista</li>
        </ol>`},{id:"divider-blue",label:"Divisor azul",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="4" y="15" width="24" height="2" rx="1" fill="#003B71"/>
        </svg>`,content:'<hr class="border-none h-0.5 bg-[#003B71] my-8">'},{id:"divider-orange",label:"Divisor naranja",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="4" y="15" width="24" height="2" rx="1" fill="#E97300"/>
        </svg>`,content:'<hr class="border-none h-0.5 bg-[#E97300] my-8">'},{id:"divider-white",label:"Divisor blanco",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="4" y="15" width="24" height="2" rx="1" fill="#ffffff"/>
        </svg>`,content:'<hr class="border-none h-0.5 bg-white my-8">'},{id:"spacer",label:"Espaciado",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="14" y="4" width="4" height="24" rx="2" fill="#003B71" fill-opacity="0.2"/>
            <rect x="4" y="4" width="24" height="2" rx="1" fill="#003B71" fill-opacity="0.4"/>
            <rect x="4" y="26" width="24" height="2" rx="1" fill="#003B71" fill-opacity="0.4"/>
        </svg>`,content:'<div class="h-12 w-full"></div>'}],lt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,ot=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,nt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="12" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="22" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,st=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="9" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="25" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,ct=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="13" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,dt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="21" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,gt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="14" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="23" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,ht=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="11" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="20" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,_='<div class="col-cell"></div>',U=`
<style>
.col-section{width:100%;padding:3.5rem 4rem;box-sizing:border-box;}
.col-grid{display:grid;gap:1.5rem;}
.col-grid--2{grid-template-columns:repeat(2,1fr);}
.col-grid--3{grid-template-columns:repeat(3,1fr);}
.col-grid--4{grid-template-columns:repeat(4,1fr);}
.col-grid--1-2{grid-template-columns:1fr 2fr;}
.col-grid--2-1{grid-template-columns:2fr 1fr;}
.col-grid--1-1-2{grid-template-columns:1fr 1fr 2fr;}
.col-grid--2-1-1{grid-template-columns:2fr 1fr 1fr;}
.col-cell{min-height:60px;display:flex;flex-direction:column;gap:1rem;}
@media(max-width:1280px){.col-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.col-section{padding:2.5rem 1.5rem;}.col-grid{grid-template-columns:1fr !important;}}
</style>`,ft=[{id:"columns-1",label:"1 Columna",category:"Columnas",media:lt,content:`
<div class="col-section">
    <div class="col-cell"></div>
</div>
${U}`},{id:"columns-2",label:"2 Columnas",category:"Columnas",media:ot,content:`
<div class="col-section">
    <div class="col-grid col-grid--2">
        ${_}
        ${_}
    </div>
</div>
${U}`},{id:"columns-3",label:"3 Columnas",category:"Columnas",media:nt,content:`
<div class="col-section">
    <div class="col-grid col-grid--3">
        ${_}
        ${_}
        ${_}
    </div>
</div>
${U}`},{id:"columns-4",label:"4 Columnas",category:"Columnas",media:st,content:`
<div class="col-section">
    <div class="col-grid col-grid--4">
        ${_}
        ${_}
        ${_}
        ${_}
    </div>
</div>
${U}`},{id:"columns-1-3",label:"1/3 — 2/3",category:"Columnas",media:ct,content:`
<div class="col-section">
    <div class="col-grid col-grid--1-2">
        ${_}
        ${_}
    </div>
</div>
${U}`},{id:"columns-3-1",label:"2/3 — 1/3",category:"Columnas",media:dt,content:`
<div class="col-section">
    <div class="col-grid col-grid--2-1">
        ${_}
        ${_}
    </div>
</div>
${U}`},{id:"columns-1-2",label:"1/4 — 1/4 — 1/2",category:"Columnas",media:gt,content:`
<div class="col-section">
    <div class="col-grid col-grid--1-1-2">
        ${_}
        ${_}
        ${_}
    </div>
</div>
${U}`},{id:"columns-2-1",label:"1/2 — 1/4 — 1/4",category:"Columnas",media:ht,content:`
<div class="col-section">
    <div class="col-grid col-grid--2-1-1">
        ${_}
        ${_}
        ${_}
    </div>
</div>
${U}`}],pt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="4" width="11" height="24" fill="none" stroke="#003B71" stroke-width="1" rx="1"/>
    <rect x="5" y="7" width="7" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.8"/>
    <rect x="5" y="10" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="5" y="12" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="5" y="14" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="5" y="17" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="5" y="19" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="5" y="21" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="17" y="4" width="12" height="24" fill="#E97300" rx="1"/>
    <rect x="19" y="7" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.9"/>
    <rect x="19" y="10" width="8" height="1" rx="0.5" fill="white" fill-opacity="0.5"/>
    <rect x="19" y="12" width="6" height="1" rx="0.5" fill="white" fill-opacity="0.5"/>
    <rect x="19" y="14" width="7" height="1" rx="0.5" fill="white" fill-opacity="0.5"/>
    <circle cx="20" cy="20" r="1" fill="white" fill-opacity="0.8"/>
    <circle cx="20" cy="23" r="1" fill="white" fill-opacity="0.8"/>
    <rect x="22" y="19.3" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="22" y="22.3" width="4" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
</svg>`,mt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="6" width="8" height="20" fill="#E97300" rx="1.5"/>
    <rect x="3.5" y="8" width="5" height="1.5" rx="0.75" fill="white" fill-opacity="0.9"/>
    <rect x="3.5" y="11" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="3.5" y="13" width="4" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="3.5" y="15" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="12" y="6" width="8" height="20" fill="#E97300" rx="1.5"/>
    <rect x="13.5" y="8" width="5" height="1.5" rx="0.75" fill="white" fill-opacity="0.9"/>
    <rect x="13.5" y="11" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="13.5" y="13" width="4" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="13.5" y="15" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="22" y="6" width="8" height="20" fill="#E97300" rx="1.5"/>
    <rect x="23.5" y="8" width="5" height="1.5" rx="0.75" fill="white" fill-opacity="0.9"/>
    <rect x="23.5" y="11" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="23.5" y="13" width="4" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="23.5" y="15" width="3" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <circle cx="24.5" cy="19" r="0.8" fill="white" fill-opacity="0.8"/>
    <circle cx="24.5" cy="21.5" r="0.8" fill="white" fill-opacity="0.8"/>
    <circle cx="24.5" cy="24" r="0.8" fill="white" fill-opacity="0.8"/>
    <rect x="26" y="18.4" width="3" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="26" y="20.9" width="3" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
    <rect x="26" y="23.4" width="3" height="1" rx="0.5" fill="white" fill-opacity="0.6"/>
</svg>`,bt=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Misión</h3>
    <p class="mvv-card-text">Proveemos la mejor experiencia a los empresarios de la micro y pequeña empresa, sus familiares y sus empleados, acompañándolos en su desarrollo con productos y servicios financieros especializados e innovadores adaptados a sus necesidades</p>
</div>`,xt=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Visión</h3>
    <p class="mvv-card-text">Ser el banco pionero de la revolución financiera digital para los empresarios de la micro y pequeña empresa; y que mejor comprende y sirve sus necesidades de desarrollo a través de un ecosistema de productos y servicios integrales e innovadores.".</p>
</div>`,ut=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Valores</h3>
    <p class="mvv-card-text">Cada día la cultura Integral se está fortaleciendo, todos los que pertenecemos a esta organización compartimos y vivimos los valores</p>
    <ul class="mvv-bullet-list">
        <li>Responsabilidad</li>
        <li>Compromiso social</li>
        <li>Integridad</li>
        <li>Excelencia</li>
    </ul>
</div>`,xe=`
<style>
.ab-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.ab-image-wrap{width:100%;border-radius:1rem;overflow:hidden;}
.ab-image-wrap img{width:100%;height:100%;object-fit:cover;display:block;}
.ab-bullet-list{list-style:none;padding:0;margin:0.75rem 0 0 0;display:flex;flex-direction:column;gap:0.4rem;}
.ab-bullet-list li{position:relative;padding-left:1.25rem;color:#E97300;font-weight:600;font-size:0.95rem;line-height:1.5;}
.ab-bullet-list li::before{content:"•";position:absolute;left:0;color:#E97300;font-size:1.1rem;line-height:1.4;}
.ab-highlight{color:#E97300;}
.mvv-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.mvv-section-title{text-align:center;font-size:2rem;font-weight:800;color:#003B71;margin-bottom:2rem;}
.mvv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.mvv-card{background:#E97300;border-radius:1rem;padding:1.75rem 1.5rem;display:flex;flex-direction:column;gap:1rem;text-align:center;}
.mvv-card-title{font-size:1.1rem;font-weight:700;color:#ffffff;}
.mvv-card-text{font-size:0.9rem;color:#ffffff;line-height:1.6;}
.mvv-bullet-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.3rem;}
.mvv-bullet-list li{position:relative;padding-left:1.1rem;color:#ffffff;font-size:0.9rem;line-height:1.5;text-align:center;}
.mvv-bullet-list li::before{content:"•";position:absolute;left:0;color:#ffffff;}
@media(max-width:1280px){.ab-section{padding:3rem 2.5rem;}.mvv-section{padding:3rem 2.5rem;}}
@media(max-width:992px){
    .ab-section{padding:2.5rem 1.5rem;}
    .ab-grid{grid-template-columns:1fr;gap:2rem;}
    .mvv-section{padding:2.5rem 1.5rem;}
    .mvv-grid{grid-template-columns:1fr;}
}
@media(max-width:580px){.ab-section{padding:2rem 1rem;}.mvv-section{padding:2rem 1rem;}}
</style>`,yt=[{id:"about-section",label:"Nuestra Historia",category:"Contenido",media:pt,content:`
<section class="ab-section">
    <div class="ab-grid">
        <div class="ab-content-col flex flex-col gap-4">
            <h2 class="text-4xl font-bold text-[#003B71]">Nuestra Historia</h2>
            <p class="text-base text-[#003B71] leading-relaxed text-justify">Banco Integral nació en <span class="ab-highlight font-bold">1990</span> como un proyecto de créditos de la Fundación Salvadoreña de Apoyo Integral FUSAI, apoyado por naciones Unidas, evoluciono a través de los años hasta convertirse en Banco Integral, S.A.</p>
            <p class="text-base text-[#003B71] leading-relaxed text-justify">Nuestra Institución está enfocada en acompañar el desarrollo de los empresarios de la micro y pequeña empresa de El Salvador con productos y servicios financieros especializados e innovadores adaptados a sus necesidades, teniendo al cliente como eje central de todas operaciones.</p>
            <p class="text-base text-[#003B71] leading-relaxed text-justify">Contamos con <span class="ab-highlight font-bold">27</span> agencias y más de <span class="ab-highlight font-bold">1000</span> puntos de pago distribuidos en El Salvador, acompañando a miles de salvadoreños para impulsar el crecimiento de sus negocios por medio de productos y servicios financieros, que incluyen valores agregados como:</p>
            <ul class="ab-bullet-list">
                <li>Educación financiera</li>
                <li>Programas de formación empresarial</li>
                <li>Asistencia técnica constructiva gratuita para créditos de mejora de viviendas</li>
                <li>Asimismo ofrecemos otros servicios como: Microseguros de salud, vida y pago de remesas.</li>
            </ul>
        </div>
        <div class="ab-image-col">
            <div class="ab-image-wrap">
                <img src="${P("images/placeholder.svg")}" alt="Imagen de sección">
            </div>
        </div>
    </div>
</section>
${xe}`},{id:"about-mvv-section",label:"Misión, Visión y Valores",category:"Contenido",media:mt,content:`
<section class="mvv-section">
    <h2 class="mvv-section-title">Misión, Visión y Valores</h2>
    <div class="mvv-grid">
        ${bt}
        ${xt}
        ${ut}
    </div>
</section>
${xe}`}],wt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="2.5" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="2.5" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2.5" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2.5" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="9.5" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="11" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="11" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="11" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="11" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="18" y="6" width="7" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="19.5" y="8" width="4" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="19.5" y="13" width="4" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="19.5" y="15" width="3" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="19.5" y="20" width="4" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="26.5" y="6" width="4.5" height="20" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="27.5" y="8" width="2.5" height="3" fill="#003B71" fill-opacity="0.15" rx="0.8"/>
    <rect x="27.5" y="20" width="2.5" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,vt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="2"/>
    <rect x="6" y="6" width="7" height="7" fill="#003B71" fill-opacity="0.12" rx="1.5"/>
    <rect x="6" y="16" width="14" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.6"/>
    <rect x="6" y="19" width="11" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="6" y="22" width="20" height="4" rx="1.5" fill="#003B71" fill-opacity="0.5"/>
</svg>`,X=`
<div class="flex flex-col gap-4 bg-white border-2 border-[#003B71] rounded-2xl p-5">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#dce8f5]">
        <i class="ri-bank-card-line text-2xl text-[#003B71]"></i>
    </div>
    <div class="flex flex-col gap-2 flex-1">
        <h3 class="text-base font-bold text-[#003B71]">Título del producto</h3>
        <p class="text-base text-[#003B71] leading-relaxed">Descripción breve del producto financiero disponible para ti.</p>
    </div>
    <a href="#" class="pc-btn w-full py-2 px-8 rounded-lg bg-[#003B71] text-white text-base font-semibold text-center">Solicitar</a>
</div>`,ue=`
<style>
.pc-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.pc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;}
.pc-btn{display:block;transition:background .2s;}
.pc-btn:hover{background-color:#002a52;}
@media(max-width:1280px){.pc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.pc-section{padding:2.5rem 1.5rem;}.pc-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.pc-grid{grid-template-columns:1fr;}}
</style>`,Bt=[{id:"product-cards-section",label:"Sección de productos",category:"Productos y Servicios",media:wt,content:`
<section class="pc-section">
    <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-[#003B71] mb-3">Créditos</h2>
        <p class="text-base text-[#003B71]">Opciones de financiamiento diseñadas para hacer realidad tus proyectos.</p>
    </div>
    <div class="pc-grid">
        ${X}
        ${X}
        ${X}
        ${X}
    </div>
</section>
${ue}`},{id:"product-card",label:"Tarjeta de producto",category:"Productos y Servicios",media:vt,content:`${X}${ue}`}],kt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="5" width="14" height="22" fill="#003B71" rx="2"/>
    <rect x="3" y="7" width="5" height="5" fill="rgba(255,255,255,0.2)" rx="1.2"/>
    <rect x="3" y="14" width="10" height="1.5" rx="0.75" fill="white" fill-opacity="0.9"/>
    <rect x="3" y="17" width="8" height="1" rx="0.5" fill="white" fill-opacity="0.5"/>
    <rect x="3" y="19" width="9" height="1" rx="0.5" fill="white" fill-opacity="0.5"/>
    <rect x="3" y="23" width="10" height="2.5" rx="1" fill="white" fill-opacity="0.3" stroke="white" stroke-width="0.5"/>
    <rect x="17" y="5" width="14" height="22" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="2"/>
    <rect x="19" y="7" width="5" height="5" fill="#dce8f5" rx="1.2"/>
    <rect x="19" y="14" width="10" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.8"/>
    <rect x="19" y="17" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="19" y="19" width="9" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="19" y="23" width="10" height="2.5" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,ye=`
<div class="flex flex-col gap-5 rounded-2xl p-8 dc-bg-primary">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold text-white">Lorem ipsum dolor</h3>
        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-outline w-full py-2 px-8 rounded-lg bg-white dc-text-primary text-base font-semibold text-center">Lorem ipsum</a>
</div>`,we=`
<div class="flex flex-col gap-5 rounded-2xl p-8 bg-white border border-gray-200">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center dc-bg-light">
        <i class="ri-bank-line text-2xl dc-text-primary"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold dc-text-primary">Lorem ipsum dolor</h3>
        <p class="text-base dc-text-primary leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-solid w-full py-2 px-8 rounded-lg dc-bg-primary text-white text-base font-semibold text-center">Lorem ipsum</a>
</div>`,fe=`
<style>
.dc-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.dc-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:stretch;}
.dc-btn-outline{display:block;transition:background .2s,color .2s;}
.dc-btn-outline:hover{background:#dce8f5;color:#003B71;}
.dc-btn-solid{display:block;transition:background .2s,color .2s;}
.dc-btn-solid:hover{background:#002a52;}
.dc-text-primary{color:#003B71;}
.dc-bg-primary{background-color:#003B71;}
.dc-bg-light{background-color:#dce8f5;}
@media(max-width:1280px){.dc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.dc-section{padding:2.5rem 1.5rem;}}
@media(max-width:640px){.dc-grid{grid-template-columns:1fr;}}
</style>`,$t=[{id:"dual-card-section",label:"Sección dos tarjetas",category:"Productos y Servicios",media:kt,content:`
<section class="dc-section">
    <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-[#003B71] mb-3">Lorem ipsum dolor sit amet</h2>
        <p class="text-base text-[#003B71]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="dc-grid">
        ${ye}
        ${we}
    </div>
</section>
${fe}`},{id:"dual-card-dark",label:"Tarjeta azul oscuro",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="#003B71" rx="2"/>
            <rect x="5" y="5" width="6" height="6" fill="rgba(255,255,255,0.2)" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="white" fill-opacity="0.9"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="white"/>
        </svg>`,content:`${ye}${fe}`},{id:"dual-card-light",label:"Tarjeta blanca",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="white" rx="2" stroke="#003B71" stroke-width="0.5" stroke-opacity="0.3"/>
            <rect x="5" y="5" width="6" height="6" fill="#dce8f5" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.8"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="#003B71"/>
        </svg>`,content:`${we}${fe}`}],Et=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="white" rx="2" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="8" y="7" width="16" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="11" width="12" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="11" y="13.5" width="10" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="6" y="18" width="9" height="5" rx="1.5" fill="#E97300"/>
    <rect x="17" y="18" width="9" height="5" rx="1.5" fill="white" stroke="#e5e7eb" stroke-width="0.8"/>
</svg>`,Ct=`
<style>
.cta-watermark-left{position:absolute;bottom:-16px;left:-16px;width:220px;height:220px;opacity:0.2;pointer-events:none;user-select:none;transform:scaleX(-1);}
.cta-watermark-right{position:absolute;bottom:-16px;right:-16px;width:220px;height:220px;opacity:0.2;pointer-events:none;user-select:none;}
.cta-watermark-left img,.cta-watermark-right img{width:100%;height:100%;object-fit:contain;}
.cta-btn-primary{display:inline-block;padding:0.625rem 2rem;border-radius:0.5rem;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background .2s;}
.cta-btn-primary:hover{background:#c96200;}
.cta-btn-secondary{display:inline-block;padding:0.625rem 2rem;border-radius:0.5rem;background:#ffffff;color:#E97300;font-size:1rem;font-weight:600;text-decoration:none;box-shadow:0 2px 12px rgba(0,0,0,0.12);transition:background .2s,color .2s;}
.cta-btn-secondary:hover{background:#E97300;color:#ffffff;}
@media(max-width:992px){
    .cta-watermark-left,.cta-watermark-right{width:140px;height:140px;}
}
@media(max-width:580px){
    .cta-watermark-left,.cta-watermark-right{width:90px;height:90px;}
    .cta-btn-primary,.cta-btn-secondary{width:100%;text-align:center;box-sizing:border-box;}
}
</style>`,St=[{id:"cta-section",label:"Llamada a la acción",category:"Llamadas a la acción",media:Et,content:`
<section class="relative overflow-hidden w-full bg-white py-16 px-6 md:px-16">
    <div class="cta-watermark-left">
        <img src="${P("images/brand-logo.png")}" alt="">
    </div>
    <div class="cta-watermark-right">
        <img src="${P("images/brand-logo.png")}" alt="">
    </div>
    <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center text-center gap-6">
        <h2 class="text-4xl font-bold text-[#E97300] leading-tight">Lorem ipsum dolor sit amet consectetur</h2>
        <p class="text-base text-[#E97300]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Descubre cómo podemos ayudarte a alcanzar tus metas.</p>
        <div class="flex flex-wrap gap-4 justify-center">
            <a href="#" class="cta-btn-primary">Lorem ipsum</a>
            <a href="#" class="cta-btn-secondary">Lorem ipsum</a>
        </div>
    </div>
</section>
${Ct}`}],Lt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="2" width="13" height="13" fill="rgba(255,255,255,0.15)" rx="2"/>
    <rect x="17" y="2" width="13" height="13" fill="rgba(255,255,255,0.15)" rx="2"/>
    <rect x="2" y="17" width="13" height="13" fill="rgba(255,255,255,0.15)" rx="2"/>
    <rect x="17" y="17" width="13" height="13" fill="rgba(255,255,255,0.15)" rx="2"/>
    <rect x="4" y="4" width="4" height="4" fill="white" rx="1"/>
    <rect x="19" y="4" width="4" height="4" fill="white" rx="1"/>
    <rect x="4" y="19" width="4" height="4" fill="white" rx="1"/>
    <rect x="19" y="19" width="4" height="4" fill="white" rx="1"/>
    <rect x="4" y="10" width="9" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="19" y="10" width="9" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="4" y="25" width="9" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="19" y="25" width="9" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
</svg>`,jt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="0.8" rx="2"/>
    <rect x="7" y="7" width="6" height="6" fill="white" rx="1.2"/>
    <rect x="7" y="15" width="14" height="1.2" fill="rgba(255,255,255,0.7)" rx="0.5"/>
    <rect x="7" y="17.5" width="10" height="1.2" fill="rgba(255,255,255,0.5)" rx="0.5"/>
    <rect x="7" y="22" width="18" height="3" fill="white" rx="1"/>
</svg>`,G=`
<div class="flex flex-col gap-3 border-2 border-white rounded-2xl p-6 bg-transparent">
    <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
        <i class="ri-safe-line text-2xl text-[#003B71]"></i>
    </div>
    <h3 class="text-base font-bold text-white">Título del producto</h3>
    <p class="text-base text-white leading-relaxed">Descripción breve del producto o servicio financiero disponible para ti.</p>
    <a href="#" class="ig-btn mt-auto">Más información</a>
</div>`,_t=`
<style>
.ig-section{width:100%;background:#003B71;padding:3rem 4rem;}
.ig-watermark{position:absolute;bottom:-32px;right:-32px;width:320px;height:320px;opacity:0.07;pointer-events:none;user-select:none;}
.ig-watermark img{width:100%;height:100%;object-fit:contain;}
.ig-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.ig-btn{display:block;width:100%;text-align:center;padding:0.5rem 1rem;border-radius:0.5rem;background:#ffffff;color:#003B71;font-size:1rem;font-weight:600;text-decoration:none;margin-top:auto;transition:background .2s;}
.ig-btn:hover{background:#dce8f5;}
@media(max-width:1280px){.ig-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.ig-section{padding:2.5rem 1.5rem;}.ig-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:580px){.ig-grid{grid-template-columns:1fr;}}
</style>`,It=[{id:"icon-grid-hero",label:"Sección de características",category:"Productos y Servicios",media:Lt,content:`
<section class="ig-section relative overflow-hidden">
    <div class="ig-watermark">
        <img src="${P("images/brand-watermark.png")}" alt="">
    </div>
    <div class="relative z-10 flex flex-col gap-12">
        <div class="flex flex-col items-center text-center gap-3">
            <h2 class="text-4xl font-bold text-white">Depósitos y Cuentas de Ahorro</h2>
            <p class="text-base text-white">Productos diseñados para hacer crecer tu dinero de forma segura.</p>
        </div>
        <div class="ig-grid">
            ${G}
            ${G}
            ${G}
            ${G}
            ${G}
            ${G}
        </div>
    </div>
</section>
${_t}`},{id:"icon-card",label:"Tarjeta con icono",category:"Productos y Servicios",media:jt,content:`${G}`}],ve=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="2" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="2" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="2" y="12" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="17" y="12" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="2" y="22" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="22" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
</svg>`,zt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#F07C28" rx="2"/>
    <rect x="4" y="10" width="14" height="2.5" fill="white" rx="1"/>
    <rect x="4" y="15" width="10" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
    <ellipse cx="24" cy="20" rx="7" ry="9" fill="rgba(255,255,255,0.18)"/>
    <circle cx="22" cy="10" r="3.5" fill="rgba(255,255,255,0.25)"/>
</svg>`,Tt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="4" y="10" width="14" height="2.5" fill="white" rx="1"/>
    <rect x="4" y="15" width="10" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
    <ellipse cx="24" cy="20" rx="7" ry="9" fill="rgba(255,255,255,0.18)"/>
    <circle cx="22" cy="10" r="3.5" fill="rgba(255,255,255,0.25)"/>
</svg>`,Q=`
<a href="#" class="plc-card plc-card--orange">
    <span class="plc-card__title">NOMBRE DEL PRODUCTO</span>
    <div class="plc-card__watermark">
        <img src="${P("images/brand-watermark.png")}" alt="">
    </div>
</a>`,J=`
<a href="#" class="plc-card plc-card--blue">
    <span class="plc-card__title">NOMBRE DEL PRODUCTO</span>
    <div class="plc-card__watermark">
        <img src="${P("images/brand-watermark.png")}" alt="">
    </div>
</a>`,pe=`
<style>
.plc-section{width:100%;padding:3rem 4rem;background:#ffffff;}
.plc-header{display:flex;flex-direction:column;align-items:center;text-align:center;gap:0.75rem;margin-bottom:2.5rem;}
.plc-header__title{font-size:2.25rem;font-weight:700;color:#003B71;line-height:1.2;}
.plc-header__subtitle{font-size:1rem;color:#003B71;}
.plc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;}
.plc-card{position:relative;display:flex;align-items:flex-end;padding:1.5rem;border-radius:1rem;overflow:hidden;min-height:140px;text-decoration:none;transition:transform .2s,box-shadow .2s;}
.plc-card{transition:box-shadow .25s ease,filter .25s ease;}
.plc-card--orange:hover{filter:brightness(1.08);box-shadow:0 6px 20px rgba(240,124,40,0.35);}
.plc-card--blue:hover{filter:brightness(1.12);box-shadow:0 6px 20px rgba(0,59,113,0.4);}
.plc-card--orange{background:#F07C28;}
.plc-card--blue{background:#003B71;}
.plc-card__title{position:relative;z-index:2;font-size:1rem;font-weight:800;color:#ffffff;text-transform:uppercase;line-height:1.3;max-width:70%;}
.plc-card__watermark{position:absolute;bottom:-12px;right:-12px;width:110px;height:110px;opacity:0.25;pointer-events:none;user-select:none;}
.plc-card__watermark img{width:100%;height:100%;object-fit:contain;}
@media(max-width:1280px){.plc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.plc-section{padding:2.5rem 1.5rem;}.plc-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.plc-grid{grid-template-columns:1fr;}.plc-header__title{font-size:1.75rem;}}
</style>`,At=[{id:"product-link-cards",label:"Tarjetas de productos con enlace",category:"Productos y Servicios",media:ve,content:`
<section class="plc-section">
    <div class="plc-header">
        <h2 class="plc-header__title">Nuestros Productos</h2>
        <p class="plc-header__subtitle">Encuentra el producto financiero ideal para ti.</p>
    </div>
    <div class="plc-grid">
        ${Q}
        ${J}
        ${Q}
        ${J}
        ${J}
        ${Q}
        ${J}
        ${Q}
    </div>
</section>
${pe}`},{id:"product-link-card-orange",label:"Tarjeta producto naranja",category:"Productos y Servicios",media:ve,media:zt,content:`${Q}${pe}`},{id:"product-link-card-blue",label:"Tarjeta producto azul",category:"Productos y Servicios",media:Tt,content:`${J}${pe}`}],Be=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="8" cy="12" r="4" fill="none" stroke="#F07C28" stroke-width="1.5"/>
    <circle cx="16" cy="12" r="4" fill="none" stroke="#F07C28" stroke-width="1.5"/>
    <circle cx="24" cy="12" r="4" fill="none" stroke="#F07C28" stroke-width="1.5"/>
    <rect x="4" y="19" width="8" height="1.5" fill="rgba(255,255,255,0.7)" rx="0.75"/>
    <rect x="12" y="19" width="8" height="1.5" fill="rgba(255,255,255,0.7)" rx="0.75"/>
    <rect x="20" y="19" width="8" height="1.5" fill="rgba(255,255,255,0.7)" rx="0.75"/>
    <rect x="5" y="22" width="6" height="1" fill="rgba(255,255,255,0.4)" rx="0.5"/>
    <rect x="13" y="22" width="6" height="1" fill="rgba(255,255,255,0.4)" rx="0.5"/>
    <rect x="21" y="22" width="6" height="1" fill="rgba(255,255,255,0.4)" rx="0.5"/>
</svg>`,ee=`
<a href="#" class="il-item flex flex-col items-center text-center gap-4 no-underline">
    <div class="w-14 h-14 flex items-center justify-center">
        <img src="${P("images/placeholder.svg")}" alt="" class="w-full h-full object-contain">
    </div>
    <span class="il-item__label text-lg font-semibold leading-snug">Nombre del servicio</span>
</a>`,ke=`
<style>
.il-section{position:relative;overflow:hidden;}
.il-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:flex-end;pointer-events:none;user-select:none;}
.il-bg img{height:100%;width:auto;object-fit:contain;opacity:0.2;}
.il-grid{grid-template-columns:repeat(4,1fr);}
.il-item__label{color:#003B71;}
.il-item:hover .il-item__label{color:#F07C28;transition:color .2s ease;}
@media(max-width:992px){.il-grid{grid-template-columns:repeat(2,1fr);}}
</style>`,Dt=[{id:"icon-links-strip",label:"Tira de iconos con enlace",category:"Productos y Servicios",media:Be,content:`
<section class="il-section w-full px-16 py-14 bg-white">
    <div class="il-bg">
        <img src="${P("images/brand-logo.png")}" alt="">
    </div>
    <div class="il-grid relative z-10 grid gap-8">
        ${ee}
        ${ee}
        ${ee}
        ${ee}
    </div>
</section>
${ke}`},{id:"icon-link-item",label:"Ítem icono con enlace",category:"Productos y Servicios",media:Be,content:`${ee}${ke}`}],Mt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="6" width="14" height="2" fill="rgba(255,255,255,0.5)" rx="1"/>
    <rect x="2" y="10" width="14" height="1.5" fill="rgba(255,255,255,0.3)" rx="1"/>
    <rect x="2" y="13" width="14" height="1.5" fill="rgba(255,255,255,0.3)" rx="1"/>
    <rect x="2" y="16" width="14" height="1.5" fill="rgba(255,255,255,0.3)" rx="1"/>
    <rect x="2" y="19" width="10" height="1.5" fill="rgba(255,255,255,0.3)" rx="1"/>
    <rect x="18" y="6" width="12" height="2" fill="#F07C28" rx="1"/>
    <rect x="18" y="10" width="12" height="4" fill="rgba(255,255,255,0.8)" rx="1"/>
    <rect x="18" y="16" width="12" height="6" fill="#F07C28" rx="1"/>
    <rect x="18" y="24" width="12" height="4" fill="#F07C28" rx="1"/>
</svg>`,qt=`
<style>
.pc-section{width:100%;padding:4rem;background:#ffffff;box-sizing:border-box;}
.pc-inner{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.pc-description{color:#003B71;}
.pc-eyebrow{color:#F07C28;}
.pc-title{color:#003B71;}
.pc-price{font-size:5rem;line-height:1;color:#F07C28;}
.pc-btn{background:#F07C28;transition:background .2s ease;}
.pc-btn:hover{background:#d96a1a;}
@media(max-width:1280px){.pc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.pc-section{padding:2.5rem 1.5rem;}.pc-inner{grid-template-columns:1fr;gap:2.5rem;}}
@media(max-width:480px){.pc-price{font-size:3rem;}}
</style>`,Nt=[{id:"promo-cta",label:"Promo con CTA y precio",category:"Llamadas a la acción",media:Mt,content:`
<section class="pc-section">
    <div class="pc-inner">
        <p class="pc-description text-base leading-loose">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tincidunt nisi eu pellentesque fringilla. Proin tincidunt, dolor vitae pellentesque scelerisque, sapien augue lobortis orci, quis blandit magna enim a magna. Duis feugiat eros magna, at fermentum velit interdum non. Vestibulum rhoncus sagittis lorem, eu placerat sem pellentesque et. Phasellus ac mauris pulvinar, fringilla neque quis, mollis sapien.</p>
        <div class="flex flex-col items-center text-center gap-4">
            <span class="pc-eyebrow text-base font-bold uppercase tracking-wide">¡Invierte con propósito!</span>
            <h2 class="pc-title text-4xl font-bold leading-tight">Invierte desde</h2>
            <span class="pc-price font-extrabold">$150.00</span>
            <a href="#" class="pc-btn inline-block px-10 py-4 text-white text-base font-bold uppercase tracking-wider no-underline rounded-lg">Adquiere tu cuenta</a>
        </div>
    </div>
</section>
${qt}`}],Pt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="5" rx="1" fill="#003B71"/>
    <rect x="12" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="22" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="11" width="28" height="17" rx="2" fill="#003B71" fill-opacity="0.08" stroke="#003B71" stroke-width="1"/>
    <rect x="5" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="14" width="4" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`,be=`
.tabs-btn{transition:background 0.2s,color 0.2s;}
.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}
.tabs-panel{display:none;}
.tabs-panel.active{display:grid;}
.tab-card:hover{background:#003B71;}
.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}
.tab-card:hover .tab-card-title{color:#ffffff;}
.tab-card:hover .tab-card-text{color:#ffffff;}`;function Ht(){return function(){const i=this,e=".tabs-btn{transition:background 0.2s,color 0.2s;}.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}.tabs-panel{display:none;}.tabs-panel.active{display:grid;}.tab-card:hover{background:#003B71;}.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}.tab-card:hover .tab-card-title{color:#ffffff;}.tab-card:hover .tab-card-text{color:#ffffff;}";(function(){const a=i.ownerDocument??document;if(!a.getElementById("tabs-section-styles")){const o=a.createElement("style");o.id="tabs-section-styles",o.textContent=e,a.head.appendChild(o)}})();function t(r){i.querySelectorAll(".tabs-btn").forEach((a,o)=>{a.classList.toggle("active",o===r)}),i.querySelectorAll(".tabs-panel").forEach((a,o)=>{a.classList.toggle("active",o===r)})}i.querySelectorAll(".tabs-btn").forEach((r,a)=>{r.addEventListener("click",()=>t(a))}),t(0)}}const D=()=>`
<div class="tab-card flex flex-col items-center text-center p-8 border-2 border-[#003B71] rounded-2xl gap-4 cursor-pointer transition-all duration-200">
    <div class="tab-card-icon w-14 h-14 rounded-full border-2 border-[#003B71] flex items-center justify-center text-2xl text-[#003B71] shrink-0 transition-all duration-200">
        <i class="ri-lightbulb-line"></i>
    </div>
    <h3 class="tab-card-title text-lg font-bold text-[#003B71] transition-colors duration-200">Lorem ipsum</h3>
    <p class="tab-card-text text-base font-normal leading-relaxed text-[#003B71] transition-colors duration-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>`,te=i=>`
<div class="tabs-panel${i===0?" active":""} grid-cols-3 gap-5">
    ${D()}
    ${D()}
    ${D()}
    ${D()}
    ${D()}
    ${D()}
</div>`,Ft=`
<div class="max-w-6xl mx-auto px-6 flex flex-col gap-8 py-16">
    <div class="text-center flex flex-col gap-4 max-w-2xl mx-auto">
        <h2 class="text-4xl font-bold leading-tight text-[#003B71]">Lorem ipsum dolor sit amet consectetur</h2>
        <p class="text-base font-normal leading-relaxed text-[#003B71]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <nav class="flex flex-wrap justify-center gap-2">
        <button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>
        <button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>
        <button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>
        <button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>
        <button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>
    </nav>
    <div class="tabs-body">
        ${te(0)}
        ${te(1)}
        ${te(2)}
        ${te(3)}
        ${te(4)}
    </div>
</div>
<style>${be}</style>`,Ot=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="none" stroke="#003B71" stroke-width="2"/>
    <circle cx="16" cy="10" r="4" fill="none" stroke="#003B71" stroke-width="1.5"/>
    <rect x="8" y="17" width="16" height="2" rx="1" fill="#003B71"/>
    <rect x="6" y="22" width="20" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,Rt=[{id:"tabs-cards",label:"Sección con tabs",category:"Contenido",media:Pt,content:{type:"tabs-cards-component"}},{id:"tab-card-single",label:"Tarjeta de tab",category:"Contenido",media:Ot,content:`${D()}`}];function Ut(i){const e="tabs-cards-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección con tabs",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,attributes:{"data-gjs-type":e,"data-tab-count":"5"},components:Ft,script:Ht(),traits:[{type:"number",name:"data-tab-count",label:"Número de tabs (2-10)",min:2,max:10,changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",(t,r)=>{const a=parseInt(r["data-tab-count"]);isNaN(a)||this.updateTabCount(a)})},updateTabCount(t){const r=Math.min(10,Math.max(2,t)),a=o=>{const d=Array.from({length:o},()=>'<button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>').join(`
`),c=Array.from({length:o},(f,g)=>`<div class="tabs-panel${g===0?" active":""} grid-cols-3 gap-5">
                            ${D()}
                            ${D()}
                            ${D()}
                            ${D()}
                            ${D()}
                            ${D()}
                        </div>`).join(`
`);return`
                    <div class="max-w-6xl mx-auto px-6 flex flex-col gap-8 py-16">
                        <div class="text-center flex flex-col gap-4 max-w-2xl mx-auto">
                            <h2 class="text-4xl font-bold leading-tight text-[#003B71]">Lorem ipsum dolor sit amet consectetur</h2>
                            <p class="text-base font-normal leading-relaxed text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <nav class="flex flex-wrap justify-center gap-2">${d}</nav>
                        <div class="tabs-body">${c}</div>
                    </div>
                    <style>${be}</style>`};this.components(a(r)),setTimeout(()=>{const o=this.get("script"),d=this.getEl();o&&typeof o=="function"&&d&&o.call(d)},200)}}}),Vt(i,e),Yt(i,e)}function Vt(i,e){i.on("component:mount",t=>{const r=t.getEl();r?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},300))}),i.on("component:clone",t=>{if(t.get("type")===e){const r=t.getEl();r&&setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},300)}}),i.on("storage:end:load",()=>{setTimeout(()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const r=t.getEl();if(r?.isConnected){const a=t.get("script");a&&typeof a=="function"&&a.call(r)}})},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function Yt(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const r=t.contentDocument?.head;if(r){if(!r.querySelector("#tabs-section-styles")){const a=document.createElement("style");a.id="tabs-section-styles",a.textContent=be,r.appendChild(a)}if(!r.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,r.appendChild(a)}}})}const Wt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="13" height="24" rx="2" fill="#e0e7ef"/>
    <rect x="17" y="4" width="13" height="24" rx="2" fill="#003B71" fill-opacity="0.15"/>
    <rect x="19" y="8" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="19" y="12" width="7" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.4"/>
    <rect x="19" y="15" width="8" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="20" cy="20" r="1.5" fill="#E97300"/>
    <rect x="23" y="19.2" width="7" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <circle cx="20" cy="23" r="1.5" fill="#E97300"/>
    <rect x="23" y="22.2" width="5" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
</svg>`,Gt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="17" y="4" width="13" height="24" rx="2" fill="#e0e7ef"/>
    <rect x="2" y="4" width="13" height="24" rx="2" fill="#003B71" fill-opacity="0.15"/>
    <rect x="4" y="8" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="12" width="7" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="15" width="8" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="5" cy="20" r="1.5" fill="#E97300"/>
    <rect x="8" y="19.2" width="7" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <circle cx="5" cy="23" r="1.5" fill="#E97300"/>
    <rect x="8" y="22.2" width="5" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
</svg>`,Zt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="4" width="13" height="24" rx="2" fill="rgba(255,255,255,0.1)"/>
    <rect x="17" y="4" width="13" height="24" rx="2" fill="rgba(255,255,255,0.18)"/>
    <rect x="19" y="8" width="9" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="12" width="7" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <rect x="19" y="15" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <circle cx="20" cy="20" r="1.5" fill="#E97300"/>
    <rect x="23" y="19.2" width="7" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <circle cx="20" cy="23" r="1.5" fill="#E97300"/>
    <rect x="23" y="22.2" width="5" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
</svg>`,Kt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="17" y="4" width="13" height="24" rx="2" fill="rgba(255,255,255,0.1)"/>
    <rect x="2" y="4" width="13" height="24" rx="2" fill="rgba(255,255,255,0.18)"/>
    <rect x="4" y="8" width="9" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="4" y="12" width="7" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <rect x="4" y="15" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <circle cx="5" cy="20" r="1.5" fill="#E97300"/>
    <rect x="8" y="19.2" width="7" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
    <circle cx="5" cy="23" r="1.5" fill="#E97300"/>
    <rect x="8" y="22.2" width="5" height="1.5" rx="0.75" fill="white" fill-opacity="0.4"/>
</svg>`,$e=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="7" cy="10" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="8.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <circle cx="7" cy="22" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="20.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
</svg>`,V=i=>{const e=i==="light";return`
<div class="split-list-item flex items-center gap-4">
    <div class="bg-[#E97300] w-11 h-11 rounded-full flex items-center justify-center shrink-0">
        <i class="ri-shield-check-line text-xl ${e?"text-[#003B71]":"text-white"}"></i>
    </div>
    <p class="${e?"text-[#003B71]":"text-white"} text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`},Xt=i=>{const e=i==="light";return`
<div class="flex flex-col gap-4">
    <h2 class="${e?"text-[#003B71]":"text-white"} text-4xl font-bold leading-tight">Lorem ipsum dolor sit amet</h2>
    <p class="${e?"text-[#003B71]":"text-white"} text-base leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-4">
        ${V(i)}
        ${V(i)}
        ${V(i)}
        ${V(i)}
    </div>
</div>`},Qt=()=>`
<div class="w-full rounded-2xl overflow-hidden">
    <img src="${P("images/placeholder.svg")}"
         alt="Imagen de sección"
         class="w-full object-cover block rounded-2xl"
         style="min-height:320px;max-height:480px;">
</div>`,Jt=`
<style>
.split-section{width:100%;padding:3rem 4rem;}
.split-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.split-list-item{min-height:44px;}
@media(max-width:1280px){.split-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.split-section{padding:2.5rem 1.5rem;}.split-grid{grid-template-columns:1fr;gap:2rem;}}
</style>`,oe=(i,e)=>{const t=Xt(e),r=Qt(),a=e==="dark"?"bg-[#003B71]":"bg-white",o=i?`<div>${t}</div><div>${r}</div>`:`<div class="split-img-mobile-first">${r}</div><div>${t}</div>`;return`
<section class="split-section ${a}">
    <div class="split-grid">
        ${o}
    </div>
</section>
${Jt}`},ei=[{id:"split-content-light-img-right",label:"Contenido claro - imagen derecha",category:"Contenido",media:Wt,content:oe(!0,"light")},{id:"split-content-light-img-left",label:"Contenido claro - imagen izquierda",category:"Contenido",media:Gt,content:oe(!1,"light")},{id:"split-content-dark-img-right",label:"Contenido azul - imagen derecha",category:"Contenido",media:Zt,content:oe(!0,"dark")},{id:"split-content-dark-img-left",label:"Contenido azul - imagen izquierda",category:"Contenido",media:Kt,content:oe(!1,"dark")},{id:"split-list-item",label:"Item de lista con badge",category:"Contenido",media:$e,content:V("light")},{id:"split-list-group",label:"Lista con badges",category:"Contenido",media:$e,content:`
<div class="flex flex-col gap-4">
    ${V("light")}
    ${V("light")}
    ${V("light")}
</div>`}],ti=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="0" y="6" width="10" height="22" fill="white"/>
    <path d="M10 6 Q10 6 16 6 L16 28 Q10 28 10 22 Z" fill="#E97300"/>
    <circle cx="22" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="22" cy="14" r="1.5" fill="white"/>
    <rect x="18" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,ii=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="22" y="6" width="10" height="22" fill="white"/>
    <path d="M22 6 Q16 6 16 6 L16 28 Q22 28 22 22 Z" fill="#E97300"/>
    <circle cx="10" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="10" cy="14" r="1.5" fill="white"/>
    <rect x="6" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="7" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,ne=`
<div class="flex flex-col items-center gap-3 text-center">
    <div class="w-14 h-14 rounded-full flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-1">
        <p class="text-lg font-bold text-white">Lorem ipsum</p>
        <p class="text-base text-white">Lorem ipsum dolor sit amet</p>
    </div>
</div>`,ai=`
<style>
.ss-section{position:relative;width:100%;}
.ss-curve-left{background:#E97300;border-radius:200px 0 0 0;padding:3rem 4rem;}
.ss-curve-right{background:#E97300;border-radius:0 200px 0 0;padding:3rem 4rem;}
.ss-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
@media(max-width:1280px){
    .ss-curve-left,.ss-curve-right{padding:3rem 2.5rem;}
}
@media(max-width:992px){
    .ss-curve-left{border-radius:110px 0 0 0;}
    .ss-curve-right{border-radius:0 110px 0 0;}
    .ss-curve-left,.ss-curve-right{padding:2.5rem 1.5rem;}
    .ss-grid{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:480px){
    .ss-curve-left{border-radius:60px 0 0 0;}
    .ss-curve-right{border-radius:0 60px 0 0;}
    .ss-grid{grid-template-columns:1fr 1fr;}
}
</style>`,Ee=i=>`
<div class="ss-section">
    <div class="ss-curve-${i?"left":"right"}">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-white mb-3 leading-tight">Lorem ipsum dolor sit amet</h2>
            <p class="text-base text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="ss-grid">
            ${ne}
            ${ne}
            ${ne}
            ${ne}
        </div>
    </div>
</div>
${ai}`,ri=[{id:"stats-strip-left",label:"Franja estadísticas - izquierda",category:"Heroes",media:ti,content:Ee(!0)},{id:"stats-strip-right",label:"Franja estadísticas - derecha",category:"Heroes",media:ii,content:Ee(!1)}],li=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="8" width="8" height="16" fill="white" rx="2"/>
    <rect x="12" y="8" width="8" height="16" fill="white" rx="2"/>
    <rect x="22" y="8" width="8" height="16" fill="white" rx="2"/>
    <rect x="3" y="10" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.5"/>
    <rect x="3" y="13" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="3" y="15" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="3" y="19" width="6" height="2.5" rx="1" fill="#003B71" fill-opacity="0.4"/>
    <rect x="13" y="10" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.5"/>
    <rect x="13" y="13" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="13" y="15" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="13" y="19" width="6" height="2.5" rx="1" fill="#003B71" fill-opacity="0.4"/>
    <rect x="23" y="10" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.5"/>
    <rect x="23" y="13" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="15" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="19" width="6" height="2.5" rx="1" fill="#003B71" fill-opacity="0.4"/>
</svg>`,oi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="white" rx="2"/>
    <rect x="8" y="9" width="16" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
    <rect x="8" y="13" width="14" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="8" y="15.5" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="8" y="20" width="16" height="4" rx="1.5" fill="#003B71" fill-opacity="0.5"/>
</svg>`,se=`
<div class="svc-card flex flex-col gap-4 bg-white rounded-2xl p-6 text-center">
    <h3 class="text-lg font-bold text-[#003B71]">Lorem ipsum dolor</h3>
    <p class="text-base leading-relaxed text-[#003B71] flex-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.</p>
    <a href="#" class="svc-btn mt-auto">Lorem ipsum</a>
</div>`,Ce=`
<style>
.svc-section{width:100%;background:#003B71;padding:3rem 4rem;}
.svc-header{text-align:center;margin-bottom:3rem;}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.svc-btn{display:block;width:100%;padding:0.625rem 1rem;border-radius:0.5rem;background:#003B71;color:#ffffff;font-size:1rem;font-weight:600;text-align:center;text-decoration:none;transition:background 0.2s;}
.svc-btn:hover{background:#002a52;}
@media(max-width:1280px){.svc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.svc-section{padding:2.5rem 1.5rem;}.svc-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:580px){.svc-grid{grid-template-columns:1fr;}}
</style>`,ni=[{id:"service-cards-section",label:"Sección de servicios",category:"Productos y Servicios",media:li,content:`
<section class="svc-section">
    <div class="svc-header">
        <h2 class="text-4xl font-bold text-white mb-3">Lorem ipsum dolor sit amet</h2>
        <p class="text-base text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="svc-grid">
        ${se}
        ${se}
        ${se}
    </div>
</section>
${Ce}`},{id:"service-card",label:"Tarjeta de servicio",category:"Productos y Servicios",media:oi,content:`${se}${Ce}`}],si=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <circle cx="8" cy="11" r="3.5" fill="#F07C28"/>
    <rect x="14" y="9" width="12" height="2" fill="#003B71" rx="1"/>
    <rect x="14" y="12.5" width="8" height="1.2" fill="#F07C28" rx="1"/>
    <circle cx="8" cy="23" r="3.5" fill="#F07C28"/>
    <rect x="14" y="21" width="12" height="2" fill="#003B71" rx="1"/>
    <rect x="14" y="24.5" width="8" height="1.2" fill="#F07C28" rx="1"/>
</svg>`,ci=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <circle cx="24" cy="11" r="3.5" fill="#F07C28"/>
    <rect x="6" y="9" width="12" height="2" fill="#003B71" rx="1"/>
    <rect x="10" y="12.5" width="8" height="1.2" fill="#F07C28" rx="1"/>
    <circle cx="24" cy="23" r="3.5" fill="#F07C28"/>
    <rect x="6" y="21" width="12" height="2" fill="#003B71" rx="1"/>
    <rect x="10" y="24.5" width="8" height="1.2" fill="#F07C28" rx="1"/>
</svg>`,di=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <circle cx="9" cy="16" r="3.5" fill="#F07C28"/>
    <rect x="14" y="14" width="7" height="2" fill="#003B71" rx="1"/>
    <rect x="14" y="17.5" width="5" height="1.2" fill="#F07C28" rx="1"/>
    <circle cx="24" cy="16" r="3.5" fill="#F07C28"/>
    <rect x="3" y="14" width="4" height="1" fill="#e5e7eb" rx="0.5"/>
</svg>`,gi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <circle cx="8" cy="16" r="3.5" fill="#F07C28"/>
    <rect x="14" y="14" width="12" height="2" fill="#003B71" rx="1"/>
    <rect x="14" y="17.5" width="8" height="1.2" fill="#F07C28" rx="1"/>
</svg>`,Z=(i,e,t,r,a=!1)=>`
<div class="ci-item${a?" ci-item--right":""}">
    <div class="ci-item__icon w-14 h-14 shrink-0 flex items-center justify-center">
        <i class="${i} ci-item__icon-i"></i>
    </div>
    <div class="flex flex-col gap-1">
        <span class="ci-item__label text-base font-bold uppercase tracking-wide">${e}</span>
        <a href="${r}" class="ci-item__value text-base no-underline transition-opacity duration-200 hover:opacity-75">${t}</a>
    </div>
</div>`,ce=`
<style>
.ci-section{width:100%;padding:3rem 4rem;background:#ffffff;box-sizing:border-box;}
.ci-list{display:flex;flex-direction:column;gap:1.5rem;}
.ci-list--right{align-items:flex-end;text-align:right;}
.ci-row{display:flex;flex-direction:row;gap:3rem;flex-wrap:wrap;}
.ci-item{display:flex;align-items:center;gap:1.25rem;}
.ci-item--right{flex-direction:row-reverse;}
.ci-item__label{color:#003B71;}
.ci-item__value{color:#F07C28;}
.ci-item__icon-i{font-size:2.5rem;color:#F07C28;}
@media(max-width:1280px){.ci-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.ci-section{padding:2.5rem 1.5rem;}}
</style>`,hi=[{id:"contact-info-row",label:"Información de contacto (fila)",category:"Contacto",media:di,content:`
<section class="ci-section">
    <div class="ci-row">
        ${Z("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
        ${Z("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com")}
    </div>
</section>
${ce}`},{id:"contact-info-left",label:"Info de contacto (izquierda)",category:"Contacto",media:si,content:`
<section class="ci-section">
    <div class="ci-list">
        ${Z("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
        ${Z("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com")}
    </div>
</section>
${ce}`},{id:"contact-info-right",label:"Info de contacto (derecha)",category:"Contacto",media:ci,content:`
<section class="ci-section">
    <div class="ci-list ci-list--right">
        ${Z("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090",!0)}
        ${Z("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com",!0)}
    </div>
</section>
${ce}`},{id:"contact-info-item",label:"Ítem de contacto",category:"Contacto",media:gi,content:`
<section class="ci-section">
    <div class="ci-list">
        ${Z("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
    </div>
</section>
${ce}`}],fi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="6" cy="8" r="2" fill="#F07C28"/>
    <rect x="10" y="7" width="16" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="10" y="11" width="14" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="10" y="13.5" width="12" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <circle cx="6" cy="19" r="2" fill="#F07C28"/>
    <rect x="10" y="18" width="16" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="10" y="22" width="14" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="10" y="24.5" width="12" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
</svg>`,pi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="6" cy="14" r="2.5" fill="#F07C28"/>
    <rect x="11" y="12" width="15" height="2.5" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="11" y="17" width="13" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="11" y="20" width="10" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
</svg>`,ie=`
<div class="rl-item">
    <div class="flex items-center gap-2 mb-1">
        <span class="rl-bullet">•</span>
        <span class="rl-item__title text-base font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
    </div>
    <p class="rl-item__body text-base leading-relaxed">Nulla tincidunt nisi eu pellentesque fringilla. Proin tincidunt, dolor vitae pellentesque scelerisque, sapien augue lobortis orci, quis blandit magna enim a magna.</p>
</div>`,Se=`
<style>
.rl-section{width:100%;padding:3rem 4rem;background:#ffffff;box-sizing:border-box;}
.rl-list{display:flex;flex-direction:column;gap:1.75rem;}
.rl-item__title{color:#F07C28;}
.rl-bullet{color:#F07C28;font-size:1.25rem;line-height:1;}
.rl-item__body{color:#003B71;}
@media(max-width:1280px){.rl-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.rl-section{padding:2.5rem 1.5rem;}}
</style>`,mi=[{id:"rich-list",label:"Lista con título y descripción",category:"Contenido",media:fi,content:`
<section class="rl-section">
    <div class="rl-list">
        ${ie}
        ${ie}
        ${ie}
        ${ie}
    </div>
</section>
${Se}`},{id:"rich-list-item",label:"Ítem de lista con descripción",category:"Contenido",media:pi,content:`
<section class="rl-section">
    <div class="rl-list">
        ${ie}
    </div>
</section>
${Se}`}],bi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="3" y="4" width="26" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="10" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="10" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="16" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="16" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="22" width="26" height="5" fill="#F07C28" rx="1"/>
</svg>`,xi=`
<style>
.fm-section{width:100%;padding:3.5rem 4rem;background:#ffffff;box-sizing:border-box;}
.fm-form{display:flex;flex-direction:column;gap:1.25rem;max-width:680px;margin:0 auto;}
.fm-row{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
.fm-field{display:flex;flex-direction:column;gap:0.4rem;}
.fm-label{font-size:0.9rem;font-weight:500;color:#F07C28;}
.fm-input{width:100%;padding:0.65rem 0.85rem;border:2px solid #F07C28;border-radius:0.4rem;font-size:0.95rem;color:#003B71;background:#ffffff;box-sizing:border-box;outline:none;transition:border-color .2s ease;}
.fm-input:focus{border-color:#003B71;}
.fm-select-wrapper{position:relative;display:flex;align-items:stretch;}
.fm-select{width:100%;padding:0.65rem 0.85rem;border:2px solid #F07C28;border-right:none;border-radius:0.4rem 0 0 0.4rem;font-size:0.95rem;color:#003B71;background:#ffffff;box-sizing:border-box;outline:none;cursor:pointer;appearance:none;}
.fm-select:focus{border-color:#003B71;}
.fm-select-btn{display:flex;align-items:center;justify-content:center;width:44px;flex-shrink:0;background:#003B71;border:2px solid #003B71;border-radius:0 0.4rem 0.4rem 0;cursor:pointer;}
.fm-select-btn svg{pointer-events:none;}
.fm-textarea{width:100%;padding:0.65rem 0.85rem;border:2px solid #F07C28;border-radius:0.4rem;font-size:0.95rem;color:#003B71;background:#ffffff;box-sizing:border-box;outline:none;resize:vertical;min-height:120px;transition:border-color .2s ease;}
.fm-textarea:focus{border-color:#003B71;}
.fm-btn{width:100%;padding:1rem;background:#F07C28;color:#ffffff;font-size:0.95rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;border:none;border-radius:0.4rem;cursor:pointer;transition:background .2s ease;}
.fm-btn:hover{background:#d96a1a;}
@media(max-width:1280px){.fm-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.fm-section{padding:2.5rem 1.5rem;}.fm-row{grid-template-columns:1fr;}}
</style>
`,ui=[{id:"contact-form",label:"Formulario de contacto",category:"Formularios",media:bi,content:`
<section class="fm-section">
    <div class="fm-form">
        <div class="fm-field">
            <label class="fm-label">Nombre *</label>
            <input type="text" class="fm-input" placeholder="">
        </div>
        <div class="fm-row">
            <div class="fm-field">
                <label class="fm-label">Correo electrónico *</label>
                <input type="email" class="fm-input" placeholder="">
            </div>
            <div class="fm-field">
                <label class="fm-label">Teléfono *</label>
                <input type="tel" class="fm-input" placeholder="">
            </div>
        </div>
        <div class="fm-row">
            <div class="fm-field">
                <label class="fm-label">DUI *</label>
                <input type="text" class="fm-input" placeholder="">
            </div>
            <div class="fm-field">
                <label class="fm-label">Tipo de solicitud *</label>
                <div class="fm-select-wrapper">
                    <select class="fm-select">
                        <option value="" disabled selected>Seleccione</option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                    </select>
                    <button type="button" class="fm-select-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="fm-row">
            <div class="fm-field">
                <label class="fm-label">Selecciona tu agencia más cercana *</label>
                <div class="fm-select-wrapper">
                    <select class="fm-select">
                        <option value="" disabled selected>Seleccione</option>
                        <option>Agencia 1</option>
                        <option>Agencia 2</option>
                    </select>
                    <button type="button" class="fm-select-btn" onclick="this.previousElementSibling.size=this.previousElementSibling.size==1?5:1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                </div>
            </div>
            <div class="fm-field">
                <label class="fm-label">¿Por qué medio se enteró de Integral? *</label>
                <div class="fm-select-wrapper">
                    <select class="fm-select">
                        <option value="" disabled selected>Seleccione</option>
                        <option>Redes sociales</option>
                        <option>Recomendación</option>
                    </select>
                    <button type="button" class="fm-select-btn" onclick="this.previousElementSibling.size=this.previousElementSibling.size==1?5:1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M7 10l5 5 5-5z"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="fm-field">
            <label class="fm-label">Comentario *</label>
            <textarea class="fm-textarea"></textarea>
        </div>
        <button type="button" class="fm-btn">Enviar</button>
    </div>
</section>
${xi}
<script>
(function(){
    function initFormSelects(root){
        root.querySelectorAll('.fm-select-btn').forEach(function(btn){
            btn.addEventListener('click', function(){
                var select = btn.previousElementSibling;
                select.click();
            });
        });
    }
    if(document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', function(){ initFormSelects(document); });
    } else {
        initFormSelects(document);
    }
})();
<\/script>`}],yi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="6" rx="1" fill="#003B71"/>
    <rect x="2" y="10" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="17" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <rect x="2" y="24" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <line x1="11" y1="2" x2="11" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
    <line x1="21" y1="2" x2="21" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
</svg>`,de={blue:{headerBg:"bg-[#003B71]",headerText:"text-white",subheaderBg:"bg-[#e8f0f8]",subheaderText:"text-[#003B71]",borderColor:"#003B71",rowEvenBg:"bg-[#f4f7fb]",rowOddBg:"bg-white",rowText:"text-[#003B71]",labelBg:"bg-[#e8f0f8]",labelText:"text-[#003B71]"},orange:{headerBg:"bg-[#E97300]",headerText:"text-white",subheaderBg:"bg-[#fef3e8]",subheaderText:"text-[#E97300]",borderColor:"#E97300",rowEvenBg:"bg-[#fff8f2]",rowOddBg:"bg-white",rowText:"text-[#003B71]",labelBg:"bg-[#fef3e8]",labelText:"text-[#E97300]"}};function Me(i,e){const t=de[e]||de.blue;let r='<table class="w-full border-collapse font-[Poppins,sans-serif] table-fixed">';i.title?(r+=`<thead><tr>
            <th colspan="${i.cols}" class="p-3 align-middle text-center text-base font-bold ${t.headerBg} ${t.headerText}">
                ${i.title}
            </th>
        </tr>`,i.headers?.length&&(r+="<tr>",i.headers.forEach((d,c)=>{const f=c<i.headers.length-1?`border-r border-[${t.borderColor}]`:"";r+=`<th class="p-3 align-middle text-sm font-semibold ${t.subheaderBg} ${t.subheaderText} ${f} border-b border-[${t.borderColor}] text-${d.align||"center"}">${d.text||""}</th>`}),r+="</tr>"),r+="</thead>"):i.headers?.length&&(r+="<thead><tr>",i.headers.forEach((d,c)=>{const f=c<i.headers.length-1?`border-r border-[${t.borderColor}]`:"";r+=`<th class="p-3 align-middle text-sm font-semibold ${t.headerBg} ${t.headerText} ${f} border-b border-[${t.borderColor}] text-${d.align||"center"}">${d.text||""}</th>`}),r+="</tr></thead>"),r+="<tbody>";const a=i.rows.length,o={};return i.rows.forEach((d,c)=>{r+="<tr>";let f=0;d.forEach(g=>{for(;o[`${c}-${f}`];)f++;const k=g.colspan||1,E=g.rowspan||1;for(let b=c;b<c+E;b++)for(let L=f;L<f+k;L++)(b!==c||L!==f)&&(o[`${b}-${L}`]=!0);const m=k>1?`colspan="${k}"`:"",n=E>1?`rowspan="${E}"`:"",p=g.isHeader?t.labelBg:c%2===0?t.rowEvenBg:t.rowOddBg,y=g.isHeader?"font-semibold":"font-normal",T=g.isHeader?t.labelText:t.rowText,u=`text-${g.align||"center"}`,$=c+E>=a,C=f+k>=i.cols?"":`border-r border-[${t.borderColor}]`,v=$?"":`border-b border-[${t.borderColor}]`,j=`${C} ${v} p-3 align-middle text-sm ${p} ${y} ${T} ${u}`;g.image?r+=`<td ${m} ${n} class="${j}">
                    <img src="${g.image}" alt="${g.text||""}" class="max-w-full max-h-20 h-auto object-contain block mx-auto">
                    ${g.text?`<span class="block mt-1 text-xs ${T}">${g.text}</span>`:""}
                </td>`:r+=`<td ${m} ${n} class="${j}">${g.text||""}</td>`,f+=k}),r+="</tr>"}),r+="</tbody></table>",r}function K(i,e){return{title:"Título de la tabla",cols:i,headers:Array.from({length:i},(t,r)=>({text:`Columna ${r+1}`,align:"center"})),rows:Array.from({length:e},()=>Array.from({length:i},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})))}}function qe(i,e){return`<div class="w-full overflow-x-auto rounded-2xl border-2 border-[${(de[e]||de.blue).borderColor}]">${i}</div>`}function Le(i,e){const t={};return i.forEach((r,a)=>{let o=0;r.forEach(d=>{for(;t[`${a}-${o}`];)o++;const c=Math.min(d.colspan||1,e-o),f=d.rowspan||1;for(let g=a;g<a+f;g++)for(let k=o;k<o+c;k++)(g!==a||k!==o)&&(t[`${g}-${k}`]=`${a}-${o}`);o+=c})}),t}const wi=`
#table-admin-modal{display:none;position:fixed;inset:0;z-index:999999;align-items:center;justify-content:center;padding:1rem;background:rgba(0,0,0,0.5);}
#table-admin-modal.open{display:flex;}
.tam-container{background:#fff;border-radius:0.75rem;box-shadow:0 20px 60px rgba(0,0,0,0.3);width:100%;max-width:960px;max-height:90vh;display:flex;flex-direction:column;overflow:hidden;font-family:'Poppins',sans-serif;}
.tam-header{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid #e5e7eb;flex-shrink:0;}
.tam-header h2{font-size:1.125rem;font-weight:700;color:#111827;margin:0;}
.tam-close{background:none;border:none;cursor:pointer;padding:0.5rem;border-radius:0.5rem;color:#9ca3af;font-size:1.5rem;line-height:1;transition:background 0.15s;}
.tam-close:hover{background:#f3f4f6;color:#374151;}
.tam-toolbar{display:flex;flex-wrap:wrap;gap:0.75rem;padding:1rem 1.5rem;border-bottom:1px solid #e5e7eb;background:#f9fafb;flex-shrink:0;align-items:center;}
.tam-toolbar label{font-size:0.8rem;font-weight:600;color:#374151;}
.tam-toolbar input[type=text],.tam-toolbar select,.tam-toolbar input[type=number]{padding:0.375rem 0.625rem;border:1.5px solid #d1d5db;border-radius:0.5rem;font-size:0.8rem;color:#111827;outline:none;transition:border-color 0.15s;background:#fff;}
.tam-toolbar input[type=text]:focus,.tam-toolbar select:focus,.tam-toolbar input[type=number]:focus{border-color:#003B71;}
.tam-toolbar-group{display:flex;flex-direction:column;gap:0.25rem;}
.tam-body{flex:1;overflow-y:auto;padding:1.5rem;}
.tam-table-wrap{overflow-x:auto;}
.tam-table{width:100%;border-collapse:collapse;font-size:0.8rem;table-layout:fixed;}
.tam-table th,.tam-table td{border:1.5px solid #d1d5db;padding:0.5rem;vertical-align:top;min-width:80px;}
.tam-table th{background:#f3f4f6;font-weight:600;color:#374151;text-align:center;}
.tam-cell-input{width:100%;border:none;outline:none;font-size:0.8rem;background:transparent;resize:vertical;min-height:36px;font-family:inherit;color:#111827;box-sizing:border-box;}
.tam-cell-actions{display:flex;gap:4px;margin-top:6px;flex-wrap:wrap;align-items:center;}
.tam-cell-btn{padding:3px 8px;border-radius:4px;font-size:0.65rem;font-weight:600;cursor:pointer;border:1.5px solid;transition:all 0.15s;line-height:1.4;}
.tam-cell-btn:hover{opacity:0.8;}
.tam-cell-btn-header{background:transparent;color:#003B71;border-color:#003B71;}
.tam-cell-btn-header.active{background:#003B71;color:#fff;border-color:#003B71;}
.tam-cell-btn-img{background:#E97300;color:#fff;border-color:#E97300;}
.tam-cell-btn-clear{background:#fff;color:#dc2626;border-color:#dc2626;}
.tam-cell{position:relative;}
.tam-cell.is-header-cell{background:#dbeafe !important;}
.tam-cell.has-image{background:#fef9ee !important;}
.tam-cell.is-spanned{background:#f3f4f6 !important;pointer-events:none;opacity:0.5;}
.tam-cell.has-span{background:#f0fdf4 !important;outline:1.5px dashed #16a34a;}
.tam-cell-img-preview{width:70px;height:44px;object-fit:contain;border-radius:4px;margin-bottom:4px;border:1px solid #e5e7eb;}
.tam-cell-span-group{display:flex;gap:4px;align-items:center;}
.tam-cell-span-group label{font-size:0.6rem;color:#6b7280;font-weight:600;}
.tam-cell-span-input{width:40px;font-size:0.7rem;padding:2px 4px;border:1.5px solid #d1d5db;border-radius:4px;text-align:center;}
.tam-spanned-label{font-size:0.6rem;color:#9ca3af;text-align:center;padding-top:4px;font-style:italic;}
.tam-footer{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.5rem;border-top:1px solid #e5e7eb;background:#f9fafb;flex-shrink:0;gap:0.75rem;}
.tam-btn{padding:0.5rem 1.25rem;border-radius:0.5rem;font-size:0.875rem;font-weight:600;cursor:pointer;border:2px solid transparent;transition:opacity 0.15s;display:inline-flex;align-items:center;gap:0.375rem;font-family:inherit;}
.tam-btn:hover{opacity:0.85;}
.tam-btn-ghost{background:#fff;color:#374151;border-color:#d1d5db;}
.tam-btn-primary{background:#003B71;color:#fff;border-color:#003B71;}
#tam-img-modal{display:none;position:fixed;inset:0;z-index:9999999;align-items:center;justify-content:center;padding:1rem;background:rgba(0,0,0,0.6);}
#tam-img-modal.open{display:flex;}
.tam-img-container{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;font-family:'Poppins',sans-serif;box-shadow:0 20px 60px rgba(0,0,0,0.4);}
.tam-img-header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.5rem;border-bottom:1px solid #e5e7eb;flex-shrink:0;}
.tam-img-header h3{font-size:1rem;font-weight:700;color:#111827;margin:0;}
.tam-img-search{padding:0.75rem 1.5rem;border-bottom:1px solid #e5e7eb;flex-shrink:0;}
.tam-img-search input{width:100%;padding:0.5rem 0.75rem;border:1.5px solid #d1d5db;border-radius:0.5rem;font-size:0.875rem;outline:none;box-sizing:border-box;}
.tam-img-search input:focus{border-color:#003B71;}
.tam-img-grid{flex:1;overflow-y:auto;padding:1rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:0.75rem;}
.tam-img-card{cursor:pointer;border-radius:0.5rem;border:2px solid #e5e7eb;overflow:hidden;background:#fff;transition:border-color 0.15s;}
.tam-img-card:hover{border-color:#9ca3af;}
.tam-img-card.selected{border-color:#003B71;box-shadow:0 0 0 3px rgba(0,59,113,0.2);}
.tam-img-card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;}
.tam-img-card p{font-size:0.65rem;padding:4px 6px;color:#374151;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;}
.tam-img-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem;gap:1rem;color:#6b7280;font-size:0.875rem;}
.tam-img-spinner{width:2rem;height:2rem;border:3px solid #e5e7eb;border-top-color:#003B71;border-radius:50%;animation:tam-spin 0.8s linear infinite;}
@keyframes tam-spin{to{transform:rotate(360deg);}}
.tam-img-footer{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.5rem;border-top:1px solid #e5e7eb;background:#f9fafb;flex-shrink:0;}
.tam-img-selected-info{font-size:0.8rem;color:#6b7280;}`;function vi(){if(document.getElementById("tam-img-modal"))return;const i=document.createElement("div");i.id="tam-img-modal",i.innerHTML=`
        <div class="tam-img-container">
            <div class="tam-img-header">
                <h3><i class="ri-image-line" style="margin-right:6px;"></i>Seleccionar imagen</h3>
                <button class="tam-close" id="tam-img-close"><i class="ri-close-line"></i></button>
            </div>
            <div class="tam-img-search">
                <input type="text" id="tam-img-search-input" placeholder="Buscar imagen por nombre...">
            </div>
            <div class="tam-img-grid" id="tam-img-grid"></div>
            <div class="tam-img-footer">
                <span class="tam-img-selected-info" id="tam-img-selected-info">Ninguna imagen seleccionada</span>
                <div style="display:flex;gap:0.5rem;">
                    <button class="tam-btn tam-btn-ghost" id="tam-img-cancel">Cancelar</button>
                    <button class="tam-btn tam-btn-primary" id="tam-img-confirm" disabled><i class="ri-check-line"></i> Usar imagen</button>
                </div>
            </div>
        </div>`,document.body.appendChild(i);let e=null,t=null;async function r(c=""){const f=document.getElementById("tam-img-grid");f.innerHTML='<div class="tam-img-loading"><div class="tam-img-spinner"></div><span>Cargando...</span></div>';try{const g=new URLSearchParams({type:"image",per_page:50});c&&g.append("search",c);const k=document.querySelector('meta[name="media-api-url"]')?.content??"/media/api",n=(await(await fetch(`${k}?${g}`,{headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}})).json()).items||[];if(!n.length){f.innerHTML='<div class="tam-img-loading"><i class="ri-image-line" style="font-size:2rem;"></i><span>No se encontraron imágenes</span></div>';return}f.innerHTML="",n.forEach(p=>{const y=document.createElement("div");y.className="tam-img-card",y.innerHTML=`<img src="${p.url}" alt="${p.filename}"><p title="${p.filename}">${p.filename}</p>`,y.addEventListener("click",()=>{f.querySelectorAll(".tam-img-card").forEach(T=>T.classList.remove("selected")),y.classList.add("selected"),e=p.url,document.getElementById("tam-img-selected-info").textContent=`Seleccionada: ${p.filename}`,document.getElementById("tam-img-confirm").disabled=!1}),f.appendChild(y)})}catch{f.innerHTML='<div class="tam-img-loading"><i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i><span style="color:#dc2626;">Error al cargar imágenes</span></div>'}}function a(c){t=c,e=null,document.getElementById("tam-img-selected-info").textContent="Ninguna imagen seleccionada",document.getElementById("tam-img-confirm").disabled=!0,document.getElementById("tam-img-search-input").value="",i.classList.add("open"),r()}function o(){i.classList.remove("open"),e=null,t=null}document.getElementById("tam-img-close").addEventListener("click",o),document.getElementById("tam-img-cancel").addEventListener("click",o),document.getElementById("tam-img-confirm").addEventListener("click",()=>{e&&t&&(t(e),o())});let d;document.getElementById("tam-img-search-input").addEventListener("input",c=>{clearTimeout(d),d=setTimeout(()=>r(c.target.value),300)}),i.addEventListener("click",c=>{c.target===i&&o()}),window.__openTableImagePicker=a}function Bi(i,e){if(document.getElementById("table-admin-modal"))return;const t=document.createElement("style");t.id="table-admin-modal-styles",t.textContent=wi,document.head.appendChild(t),vi();const r=document.createElement("div");r.id="table-admin-modal",r.innerHTML=`
        <div class="tam-container">
            <div class="tam-header">
                <h2><i class="ri-table-line" style="margin-right:8px;"></i>Administrar tabla</h2>
                <button class="tam-close" id="tam-close"><i class="ri-close-line"></i></button>
            </div>
            <div class="tam-toolbar">
                <div class="tam-toolbar-group">
                    <label>Título de tabla</label>
                    <input type="text" id="tam-title" placeholder="Dejar vacío para ocultar" style="width:220px;">
                </div>
                <div class="tam-toolbar-group">
                    <label>Color</label>
                    <select id="tam-theme">
                        <option value="blue">Azul</option>
                        <option value="orange">Naranja</option>
                    </select>
                </div>
                <div class="tam-toolbar-group">
                    <label>Columnas</label>
                    <input type="number" id="tam-cols" min="1" max="10" value="3" style="width:60px;">
                </div>
                <div class="tam-toolbar-group">
                    <label>Filas</label>
                    <input type="number" id="tam-rows" min="1" max="30" value="3" style="width:60px;">
                </div>
                <button class="tam-btn tam-btn-ghost" id="tam-rebuild" style="align-self:flex-end;">
                    <i class="ri-refresh-line"></i> Reconstruir
                </button>
            </div>
            <div class="tam-body">
                <div class="tam-table-wrap">
                    <table class="tam-table"><thead id="tam-thead"></thead><tbody id="tam-tbody"></tbody></table>
                </div>
            </div>
            <div class="tam-footer">
                <button class="tam-btn tam-btn-ghost" id="tam-cancel">Cancelar</button>
                <button class="tam-btn tam-btn-primary" id="tam-apply"><i class="ri-check-line"></i> Aplicar cambios</button>
            </div>
        </div>`,document.body.appendChild(r);let a=null,o=null;function d(m){a=m;const n=m.get("tableData");o=n?JSON.parse(JSON.stringify(n)):K(3,3);const p=o.cols||3;o.rows=o.rows.map((y,T)=>Array.from({length:p},($,I)=>y[I]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})),document.getElementById("tam-title").value=o.title||"",document.getElementById("tam-theme").value=m.get("tableTheme")||"blue",document.getElementById("tam-cols").value=o.cols||3,document.getElementById("tam-rows").value=o.rows.length||3,k(),E(),r.classList.add("open"),document.body.style.overflow="hidden"}function c(){r.classList.remove("open"),document.body.style.overflow="",a=null}function f(){o.title=document.getElementById("tam-title").value.trim(),o.cols=parseInt(document.getElementById("tam-cols").value)||3,o.headers=Array.from(document.querySelectorAll(".tam-header-input")).map(n=>({text:n.value,align:n.closest("th")?.querySelector(".tam-align-select")?.value||"center"})),document.querySelectorAll("#tam-tbody td.tam-cell:not(.is-spanned)").forEach(n=>{const p=parseInt(n.dataset.row),y=parseInt(n.dataset.col);o.rows[p]?.[y]&&(o.rows[p][y].text=n.querySelector(".tam-cell-input")?.value||"",o.rows[p][y].align=n.querySelector(".tam-align-select")?.value||"center",o.rows[p][y].isHeader=n.dataset.isheader==="1",o.rows[p][y].image=n.dataset.image||null)});const m=Le(o.rows,o.cols);o.rows=o.rows.map((n,p)=>n.filter((y,T)=>!m[`${p}-${T}`]))}function g(){if(r.querySelector("#tam-rebuild-notice"))return;const n=document.createElement("div");n.id="tam-rebuild-notice",n.style.cssText="background:#fef9c3;border:1.5px solid #ca8a04;border-radius:0.5rem;padding:0.5rem 1rem;font-size:0.8rem;color:#92400e;display:flex;align-items:center;gap:0.5rem;margin:0 1.5rem 0;flex-shrink:0;",n.innerHTML='<i class="ri-error-warning-line"></i> Has modificado el colspan/rowspan. Haz clic en <strong style="margin:0 4px;">Reconstruir</strong> para aplicar los cambios de fusión.',r.querySelector(".tam-toolbar").after(n)}function k(){r.querySelector("#tam-rebuild-notice")?.remove()}function E(){const m=document.getElementById("tam-thead"),n=document.getElementById("tam-tbody"),p=o.cols,y=o.rows.length,T=Le(o.rows,p);m.innerHTML=`<tr>${o.headers.map((u,$)=>`
            <th>
                <input class="tam-cell-input tam-header-input" value="${u.text||""}" placeholder="Col ${$+1}" style="font-weight:600;">
                <select class="tam-align-select" style="margin-top:4px;width:100%;font-size:0.7rem;padding:2px;">
                    <option value="left" ${u.align==="left"?"selected":""}>Izquierda</option>
                    <option value="center" ${u.align==="center"?"selected":""}>Centro</option>
                    <option value="right" ${u.align==="right"?"selected":""}>Derecha</option>
                </select>
            </th>`).join("")}</tr>`,n.innerHTML=o.rows.map((u,$)=>`<tr>${Array.from({length:p},(C,v)=>{const j=T[`${$}-${v}`];if(j)return`<td class="tam-cell is-spanned" data-row="${$}" data-col="${v}">
                        <div class="tam-spanned-label">Combinada con [${j}]</div>
                    </td>`;const b=u[v]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null},L=b.colspan||1,q=b.rowspan||1,z=L>1||q>1;return`<td class="tam-cell ${b.isHeader?"is-header-cell":""} ${b.image?"has-image":""} ${z?"has-span":""}"
                    data-row="${$}" data-col="${v}"
                    data-isheader="${b.isHeader?"1":"0"}"
                    data-colspan="${L}"
                    data-rowspan="${q}"
                    data-image="${b.image||""}">
                    ${b.image?`<img class="tam-cell-img-preview" src="${b.image}" alt="">`:""}
                    <textarea class="tam-cell-input" placeholder="Texto...">${b.text||""}</textarea>
                    <select class="tam-align-select" style="width:100%;font-size:0.7rem;padding:2px;margin-top:4px;">
                        <option value="left" ${b.align==="left"?"selected":""}>Izquierda</option>
                        <option value="center" ${b.align==="center"?"selected":""}>Centro</option>
                        <option value="right" ${b.align==="right"?"selected":""}>Derecha</option>
                    </select>
                    <div class="tam-cell-actions">
                        <button type="button" class="tam-cell-btn tam-cell-btn-header ${b.isHeader?"active":""}"
                            data-action="header" data-row="${$}" data-col="${v}">
                            ${b.isHeader?"✓ Etiqueta":"Etiqueta"}
                        </button>
                        <button type="button" class="tam-cell-btn tam-cell-btn-img"
                            data-action="image" data-row="${$}" data-col="${v}">
                            <i class="ri-image-line"></i> ${b.image?"Cambiar":"Imagen"}
                        </button>
                        ${b.image?`<button type="button" class="tam-cell-btn tam-cell-btn-clear" data-action="clear-image" data-row="${$}" data-col="${v}">✕ Quitar</button>`:""}
                        <div class="tam-cell-span-group">
                            <label title="Columnas que ocupa">CS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${p-v}"
                                value="${L}" data-action="colspan" data-row="${$}" data-col="${v}">
                            <label title="Filas que ocupa">RS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${y-$}"
                                value="${q}" data-action="rowspan" data-row="${$}" data-col="${v}">
                        </div>
                    </div>
                </td>`}).join("")}</tr>`).join(""),n.querySelectorAll("input[data-action=colspan], input[data-action=rowspan]").forEach(u=>{u.addEventListener("change",()=>{const $=parseInt(u.dataset.row),I=parseInt(u.dataset.col),C=Math.max(1,parseInt(u.value)||1);o.rows[$]?.[I]&&(u.dataset.action==="colspan"?o.rows[$][I].colspan=Math.min(C,p-I):o.rows[$][I].rowspan=Math.min(C,y-$),g())})}),n.querySelectorAll("button[data-action]").forEach(u=>{u.addEventListener("click",$=>{$.preventDefault(),$.stopPropagation();const I=u.dataset.action,C=parseInt(u.dataset.row),v=parseInt(u.dataset.col);if(!(isNaN(C)||isNaN(v)||!o.rows[C]?.[v])){if(I==="header"){o.rows[C][v].isHeader=!o.rows[C][v].isHeader;const j=n.querySelector(`td[data-row="${C}"][data-col="${v}"]`);j&&(j.dataset.isheader=o.rows[C][v].isHeader?"1":"0",j.classList.toggle("is-header-cell",o.rows[C][v].isHeader)),u.classList.toggle("active",o.rows[C][v].isHeader),u.textContent=o.rows[C][v].isHeader?"✓ Etiqueta":"Etiqueta";return}if(I==="image"){window.__openTableImagePicker&&window.__openTableImagePicker(j=>{o.rows[C][v].image=j;const b=n.querySelector(`td[data-row="${C}"][data-col="${v}"]`);if(b){b.dataset.image=j,b.classList.add("has-image");let L=b.querySelector(".tam-cell-img-preview");L||(L=document.createElement("img"),L.className="tam-cell-img-preview",b.insertBefore(L,b.firstChild)),L.src=j;const q=b.querySelector("[data-action=image]");if(q&&(q.innerHTML='<i class="ri-image-line"></i> Cambiar'),!b.querySelector("[data-action=clear-image]")){const z=document.createElement("button");z.type="button",z.className="tam-cell-btn tam-cell-btn-clear",z.dataset.action="clear-image",z.dataset.row=C,z.dataset.col=v,z.textContent="✕ Quitar",z.addEventListener("click",Y=>{Y.preventDefault(),Y.stopPropagation(),o.rows[C][v].image=null,b.dataset.image="",b.classList.remove("has-image"),L.remove(),z.remove();const H=b.querySelector("[data-action=image]");H&&(H.innerHTML='<i class="ri-image-line"></i> Imagen')}),b.querySelector(".tam-cell-actions").appendChild(z)}}});return}I==="clear-image"&&(o.rows[C][v].image=null,E())}})})}document.getElementById("tam-close").addEventListener("click",c),document.getElementById("tam-cancel").addEventListener("click",c),r.addEventListener("click",m=>{m.target===r&&c()}),document.getElementById("tam-rebuild").addEventListener("click",()=>{const m=parseInt(document.getElementById("tam-cols").value)||3,n=parseInt(document.getElementById("tam-rows").value)||3;for(k(),f();o.headers.length<m;)o.headers.push({text:`Col ${o.headers.length+1}`,align:"center"});for(o.headers=o.headers.slice(0,m),o.cols=m;o.rows.length<n;)o.rows.push(Array.from({length:m},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})));o.rows=o.rows.slice(0,n).map(p=>{for(;p.length<m;)p.push({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null});return p.slice(0,m)}),E()}),document.getElementById("tam-apply").addEventListener("click",()=>{f();const m=document.getElementById("tam-theme").value;a&&(a.set("tableData",JSON.parse(JSON.stringify(o))),a.set("tableTheme",m),a.addAttributes({"data-table-theme":m}),me(a)),c()}),window.__openTableAdminModal=d}function me(i){const e=i.get("tableData"),t=i.get("tableTheme")||"blue";e&&i.components(qe(Me(e,t),t))}function ki(){return function(){}}const $i=[{id:"table-blue",label:"Tabla azul",category:"Interactivos",media:yi,content:{type:"table-component",attributes:{"data-table-theme":"blue"}}},{id:"table-orange",label:"Tabla naranja",category:"Interactivos",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="6" rx="1" fill="#E97300"/>
            <rect x="2" y="10" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.3"/>
            <rect x="2" y="17" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
            <rect x="2" y="24" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
        </svg>`,content:{type:"table-component",attributes:{"data-table-theme":"orange"}}}];function Ei(i){const e="table-component";Bi(),i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Tabla",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,propagate:["editable","selectable","hoverable","droppable","highlightable"],tableData:null,tableTheme:"blue",attributes:{"data-gjs-type":e,"data-table-theme":"blue"},components:qe(Me(K(3,3),"blue"),"blue"),script:ki(),traits:[{type:"button",name:"edit-table",label:"Editar tabla",text:"Abrir editor de tabla",command(t){const r=t.getSelected();r&&window.__openTableAdminModal&&(r.get("tableData")||r.set("tableData",K(3,3)),window.__openTableAdminModal(r))}},{type:"select",name:"data-table-theme",label:"Color del tema",options:[{id:"blue",name:"Azul"},{id:"orange",name:"Naranja"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e});const t=this.getAttributes()["data-table-theme"]||"blue";this.set("tableTheme",t),this.get("tableData")||(this.set("tableData",K(3,3)),me(this)),this.on("change:attributes",(r,a)=>{const o=a["data-table-theme"];o&&o!==this.get("tableTheme")&&(this.set("tableTheme",o),me(this))})}}}),Ci(i,e),Si(i,e)}function Ci(i,e){i.on("component:mount",t=>{const r=t.getEl();if(r?.getAttribute?.("data-gjs-type")===e){t.set("type",e);const a=r.getAttribute("data-table-theme")||"blue";t.set("tableTheme",a),t.get("tableData")||t.set("tableData",K(3,3))}}),i.on("storage:end:load",()=>{setTimeout(()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const r=t.getAttributes()["data-table-theme"]||"blue";t.set("tableTheme",r),t.get("tableData")||t.set("tableData",K(3,3))})},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function Si(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const r=t.contentDocument?.head;if(r&&!r.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,r.appendChild(a)}})}const Li=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#003B71"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#003B71"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#003B71" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,ji=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#E97300"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#E97300"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#E97300" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,_i=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#003B71"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Ii=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#E97300"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,zi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#003B71"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,Ti=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#E97300"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,Ai=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,Di=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,Mi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#ffffff"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.5"/>
</svg>`,qi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,je=i=>{const e=i==="#003B71"?"blue":"orange";return`
<div class="dld-full-wrap-${e}" style="display:inline-block;max-width:480px;width:100%;">
<style>
.dld-full-${e}{display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:12px;border:2px solid ${i};background:transparent;text-decoration:none;cursor:pointer;box-sizing:border-box;width:100%;transition:background 0.2s,border-color 0.2s;}
.dld-full-${e}:hover{background:${i} !important;border-color:${i} !important;}
.dld-full-${e}:hover .dld-full-${e}-filename,
.dld-full-${e}:hover .dld-full-${e}-label,
.dld-full-${e}:hover .dld-full-${e}-arrow{color:#ffffff !important;opacity:1 !important;}
.dld-full-${e}:hover .dld-full-${e}-icon{background:rgba(255,255,255,0.2) !important;}
.dld-full-${e}:hover .dld-full-${e}-icon i{color:#ffffff !important;}
</style>
<a href="#"
   target="_self"
   class="dld-full-${e}">
    <div class="dld-full-${e}-icon"
         style="width:48px;height:48px;border-radius:12px;background:${i};display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s;">
        <i class="ri-file-line" style="font-size:1.5rem;color:#ffffff;transition:color 0.2s;"></i>
    </div>
    <div style="display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;">
        <span class="dld-full-${e}-filename" style="font-size:1rem;font-weight:700;color:${i};line-height:1.3;transition:color 0.2s;">Nombre del archivo</span>
        <span class="dld-full-${e}-label" style="font-size:0.875rem;font-weight:400;color:${i};opacity:0.7;transition:color 0.2s;">Haz clic para descargar</span>
    </div>
    <i class="dld-full-${e}-arrow ri-download-2-line" style="font-size:1.25rem;color:${i};flex-shrink:0;margin-left:8px;transition:color 0.2s;"></i>
</a>
</div>`},_e=i=>{const e=i==="#003B71"?"blue":"orange";return`
<div class="dld-simple-wrap-${e}" style="display:inline-block;max-width:480px;width:100%;">
<style>
.dld-simple-${e}{display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:12px;border:2px solid ${i};background:transparent;text-decoration:none;cursor:pointer;box-sizing:border-box;width:100%;transition:background 0.2s,border-color 0.2s;}
.dld-simple-${e}:hover{background:${i} !important;border-color:${i} !important;}
.dld-simple-${e}:hover .dld-simple-${e}-filename,
.dld-simple-${e}:hover .dld-simple-${e}-arrow{color:#ffffff !important;}
</style>
<a href="#"
   target="_self"
   class="dld-simple-${e}">
    <span class="dld-simple-${e}-filename" style="font-size:1rem;font-weight:700;color:${i};flex:1;transition:color 0.2s;">Nombre del archivo</span>
    <i class="dld-simple-${e}-arrow ri-download-2-line" style="font-size:1.25rem;color:${i};flex-shrink:0;transition:color 0.2s;"></i>
</a>
</div>`},Ie={"button-fill-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-[#003B71] text-white transition-all duration-200 hover:bg-[#002a52] hover:border-[#002a52]","button-fill-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-[#E97300] text-white transition-all duration-200 hover:bg-[#c96200] hover:border-[#c96200]","button-outline-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-transparent text-[#003B71] transition-all duration-200 hover:bg-[#003B71] hover:text-white","button-outline-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-transparent text-[#E97300] transition-all duration-200 hover:bg-[#E97300] hover:text-white","button-fill-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-white text-[#003B71] transition-all duration-200 hover:bg-[#dce8f5] hover:border-[#dce8f5]","button-outline-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-transparent text-white transition-all duration-200 hover:bg-white hover:text-[#003B71]"},Ni=[{id:"button-fill-blue",label:"Botón azul sólido",category:"Botones",media:zi,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-blue"}}},{id:"button-fill-orange",label:"Botón naranja sólido",category:"Botones",media:Ti,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-orange"}}},{id:"button-outline-blue",label:"Botón azul outline",category:"Botones",media:Ai,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-blue"}}},{id:"button-outline-orange",label:"Botón naranja outline",category:"Botones",media:Di,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-orange"}}},{id:"button-fill-white",label:"Botón blanco sólido",category:"Botones",media:Mi,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-white"}}},{id:"button-outline-white",label:"Botón blanco outline",category:"Botones",media:qi,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-white"}}},{id:"button-download-full-blue",label:"Descarga completa azul",category:"Botones",media:Li,content:je("#003B71")},{id:"button-download-full-orange",label:"Descarga completa naranja",category:"Botones",media:ji,content:je("#E97300")},{id:"button-download-simple-blue",label:"Descarga simple azul",category:"Botones",media:_i,content:_e("#003B71")},{id:"button-download-simple-orange",label:"Descarga simple naranja",category:"Botones",media:Ii,content:_e("#E97300")}];function Pi(i){const e=[{type:"button",label:"Documento",name:"select-document",text:"Seleccionar documento",full:!0,command:"open-document-picker"},{type:"text",name:"href",label:"URL / Enlace",placeholder:"https://..."},{type:"select",name:"target",label:"Abrir en",options:[{id:"_self",name:"Misma ventana"},{id:"_blank",name:"Nueva ventana"}]}];i.DomComponents.addType("link",{model:{defaults:{traits:e}}}),i.DomComponents.addType("integral-button",{isComponent:a=>a.tagName==="A"&&a.hasAttribute("data-btn-variant"),model:{defaults:{tagName:"a",draggable:!0,droppable:!1,editable:!0,attributes:{href:"#",target:"_self","data-btn-variant":"button-fill-blue"},components:"Texto del botón",traits:e},init(){const a=this.getAttributes()["data-btn-variant"]??"button-fill-blue",o=Ie[a]??Ie["button-fill-blue"];this.setClass(o.split(" "))}}});function t(a,o){if(a.getEl()?.matches?.(o))return a;let c=null;const f=a.components?.();return f?(f.each(g=>{c||(c=t(g,o))}),c):null}function r(a,o){const c={pdf:"ri-file-pdf-line",xlsx:"ri-file-excel-line",xls:"ri-file-excel-line",doc:"ri-file-word-line",docx:"ri-file-word-line"}[o]??"ri-file-line";function f(k){const E=k.getEl?.();if(E?.tagName==="I"){const p=E.parentElement;if(p&&[...p.classList].some(y=>y.includes("-icon")))return k}let m=null;const n=k.components?.();return n?(n.each(p=>{m||(m=f(p))}),m):null}const g=f(a);if(g){const k=g.getClasses().find(E=>E.startsWith("ri-"));k&&g.removeClass(k),g.addClass(c)}else{const E=a.getEl()?.querySelector("[class*='-icon'] i");if(E){const m=[...E.classList].filter(n=>!n.startsWith("ri-"));E.className=[...m,c].join(" ")}}}i.Commands.add("open-document-picker",{run(a){const o=a.getSelected();if(o){if(a._documentPicker)try{a._documentPicker.destroy()}catch{}a._documentPicker=new He,a._documentPicker.open(d=>{const c=d.filename.split(".").pop().toLowerCase();o.addAttributes({href:d.url});const f=o.getTrait("href");f&&f.set("value",d.url);const g=t(o,"[class*='-filename']");g&&g.components(d.filename),r(o,c)},{filters:{type:"document"}})}}})}const Hi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,Fi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,Oi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,Ri=[{id:"badge-outline-blue",label:"Badge azul outline",category:"Badges",media:Hi,content:'<span class="inline-block border border-[#003B71] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#003B71]">Etiqueta</span>'},{id:"badge-outline-orange",label:"Badge naranja outline",category:"Badges",media:Fi,content:'<span class="inline-block border border-[#E97300] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#E97300]">Etiqueta</span>'},{id:"badge-outline-white",label:"Badge blanco outline",category:"Badges",media:Oi,content:'<span class="inline-block border border-white rounded-full px-4 py-1 text-base font-medium bg-transparent text-white">Etiqueta</span>'}],Ui=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="9" height="28" fill="#e9ecef" rx="1"/>
    <rect x="3" y="3" width="7" height="3" fill="#dee2e6" rx="0.5"/>
    <rect x="13" y="2" width="17" height="28" fill="#a8dadc" rx="1"/>
    <rect x="14" y="3" width="15" height="26" fill="#ebf4fa" rx="1"/>
    <circle cx="18" cy="12" r="2.5" fill="#f8e7d8" stroke="#f0872a" stroke-width="0.7"/>
    <circle cx="23" cy="18" r="2.5" fill="#f8e7d8" stroke="#f0872a" stroke-width="0.7"/>
    <circle cx="26" cy="8" r="2" fill="#f8e7d8" stroke="#f0872a" stroke-width="0.5"/>
    <circle cx="18" cy="12" r="0.7" fill="#f0872a"/>
    <circle cx="23" cy="18" r="0.7" fill="#f0872a"/>
    <circle cx="26" cy="8" r="0.5" fill="#f0872a"/>
    <line x1="3" y1="9" x2="10" y2="9" stroke="#0d3f6a" stroke-width="0.8"/>
    <line x1="3" y1="13" x2="10" y2="13" stroke="#0d3f6a" stroke-width="0.8"/>
    <line x1="3" y1="17" x2="10" y2="17" stroke="#0d3f6a" stroke-width="0.8"/>
    <line x1="3" y1="21" x2="10" y2="21" stroke="#0d3f6a" stroke-width="0.8"/>
    <rect x="3" y="25" width="7" height="2.5" fill="#dee2e6" rx="0.5"/>
</svg>`;function Vi(){return function(){const i=this,e="agencies-map-component",t="/api/agencies/active",r="agencies";let a=[],o=[],d={},c=null,f=[];const g=async()=>{try{k(),await m(),await y(),T(),j(),z(),Y(),E()}catch(l){console.error("Error initializing map:",l),ae("Error al cargar las agencias"),E()}};function k(){const l=i.querySelector(`.${e}-list`);l&&(l.innerHTML=`
                    <div class="flex flex-col items-center justify-center p-12 space-y-4">
                        <div class="relative w-16 h-16">
                            <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                            <div class="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                        </div>
                        <p class="text-white font-medium">Cargando agencias...</p>
                    </div>
                `);const s=i.querySelector(`.${e}-map-container`);s&&(s.style.opacity="0.5")}function E(){const l=i.querySelector(`.${e}-map-container`);l&&(l.style.transition="opacity 0.3s ease",l.style.opacity="1")}async function m(){try{const s=await(await fetch(t)).json(),h=r?s[r]:s;Array.isArray(h)?(a=h.filter(x=>x.latitude&&x.longitude&&!isNaN(x.latitude)&&!isNaN(x.longitude)),o=[...a],n()):(a=[],o=[])}catch(l){console.error("Error loading items:",l),a=[],o=[]}}function n(){const l=[...new Set(a.map(h=>h.zone).filter(Boolean))].sort(),s=[...new Set(a.map(h=>h.department).filter(Boolean))].sort();d={zone:l,department:s},setTimeout(()=>{const h=i.querySelector(`.${e}-filters-container`);h&&!h.hasChildNodes()&&(h.innerHTML=`
                        <select class="${e}-zone-filter flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                            <option value="">Todas las Zonas</option>
                        </select>
                        <select class="${e}-department-filter flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                            <option value="">Todos los Departamentos</option>
                        </select>
                    `,p())},100)}function p(){const l=i.querySelector(`.${e}-zone-filter`),s=i.querySelector(`.${e}-department-filter`);l&&d.zone&&d.zone.forEach(h=>{const x=document.createElement("option");x.value=h,x.textContent=h,l.appendChild(x)}),s&&d.department&&d.department.forEach(h=>{const x=document.createElement("option");x.value=h,x.textContent=h,s.appendChild(x)})}async function y(){if(!document.getElementById("leaflet-css")){const l=document.createElement("link");l.id="leaflet-css",l.rel="stylesheet",l.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(l)}if(typeof window.L>"u"&&await new Promise((l,s)=>{const h=document.createElement("script");h.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",h.onload=l,h.onerror=s,document.head.appendChild(h)}),typeof window.L<"u"&&window.L.Icon&&window.L.Icon.Default){const l=window.L.icon({iconUrl:"data:image/svg+xml;base64,"+btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
                            <path fill="#f0872a" d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z"/>
                            <circle cx="12" cy="8" r="3" fill="#fff"/>
                        </svg>
                    `),iconSize:[30,45],iconAnchor:[15,45],popupAnchor:[0,-45]});window.customOrangeIcon=l}}function T(){const l=i.querySelector(`.${e}-map`);if(!l||!window.L)return;l._leaflet_id&&l._map&&(l._map.remove(),delete l._map),c=window.L.map(l).setView([13.7942,-88.8965],8),window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(c),l._map=c,c.whenReady(function(){u(),setTimeout(()=>{c&&c.invalidateSize&&c.invalidateSize()},300)})}function u(){$(),I(),v()}function $(){f.forEach(l=>{l.marker&&c.removeLayer(l.marker)}),f=[]}function I(){o.forEach((l,s)=>{if(l.latitude&&l.longitude){const h=C(l),x=window.L.marker([l.latitude,l.longitude],{icon:window.customOrangeIcon||new window.L.Icon.Default}).addTo(c).bindPopup(h);f.push({marker:x,item:l,index:s})}})}function C(l){let s=`<div style="min-width: 200px;"><h4 style="font-weight: 700; margin-bottom: 12px; color: #0d3f6a; font-size: 16px; border-bottom: 2px solid #f0872a; padding-bottom: 8px;">${l.name}</h4>`;if(l.address&&(s+=`<p style="margin: 8px 0 0 0; font-size: 14px; display: flex; align-items: start; gap: 8px;"><i class="ri-map-pin-line" style="color: #f0872a; font-size: 16px; margin-top: 2px;"></i><span style="color: #4b5563;">${l.address}</span></p>`),l.municipality||l.department){const h=[l.municipality,l.department].filter(Boolean).join(", ");s+=`<p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280; padding-left: 24px;">${h}</p>`}return l.schedule&&(s+=`<p style="margin: 8px 0; font-size: 14px; display: flex; align-items: start; gap: 8px;"><i class="ri-time-line" style="color: #f0872a; font-size: 16px; margin-top: 2px;"></i><span style="color: #4b5563;">${l.schedule}</span></p>`),s+="</div>",s}function v(){if(o.length>0){const l=o.filter(s=>s.latitude&&s.longitude).map(s=>[s.latitude,s.longitude]);l.length>1?c.once("moveend",function(){setTimeout(()=>{try{c&&c._loaded&&typeof c.fitBounds=="function"&&c.fitBounds(l,{padding:[50,50],maxZoom:12,animate:!1})}catch(s){console.warn("Error fitting bounds:",s)}},100)}):l.length===1&&c.setView(l[0],14)}}function j(){const l=i.querySelector(`.${e}-list`);if(!l)return;if(o.length===0){L(l);return}const s=o.map((h,x)=>b(h,x)).join("");l.innerHTML=s,q()}function b(l,s){const h=l.phones&&l.phones.length>0?l.phones.map(B=>`
                        <p class="text-gray-200 flex items-center gap-2 mt-2">
                            <i class="ri-phone-line text-primary text-lg"></i>
                            <a href="tel:${B.replace(/\s+/g,"")}" class="agency-phone-link text-white font-medium hover:underline">${B}</a>
                        </p>
                    `).join(""):"",x=`https://www.google.com/maps/search/?api=1&query=${l.latitude},${l.longitude}`;return`
                <div class="${e}-item p-5 bg-white/10 border border-white/20 rounded-2xl cursor-pointer transition-all duration-200" data-item-index="${s}">
                    <h3 class="agency-title text-lg font-bold text-white mb-3">${l.name}</h3>
                    ${l.address?`<p class="text-gray-200 flex items-start gap-2 mt-2"><i class="ri-map-pin-line text-primary text-lg mt-0.5"></i><span class="flex-1">${l.address}</span></p>`:""}
                    ${l.municipality||l.department?`<p class="text-sm text-gray-300 mt-1 ml-6">${[l.municipality,l.department].filter(Boolean).join(", ")}</p>`:""}
                    ${l.schedule?`<p class="text-gray-200 flex items-start gap-2 mt-2"><i class="ri-time-line text-primary text-lg mt-0.5"></i><span class="flex-1">${l.schedule}</span></p>`:""}
                    ${h}
                    <div class="mt-3">
                        <a href="${x}" target="_blank" rel="noopener noreferrer" class="agency-maps-btn block w-full text-center px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200" onclick="event.stopPropagation();">
                            Ver ubicación
                        </a>
                    </div>
                </div>
            `}function L(l){l.innerHTML=`
                <div class="flex flex-col items-center justify-center p-12 text-center">
                    <div class="w-20 h-20 mb-4 rounded-full bg-white/10 flex items-center justify-center">
                        <i class="ri-map-pin-line text-4xl text-white"></i>
                    </div>
                    <p class="text-white font-medium text-lg">No hay agencias disponibles</p>
                    <p class="text-gray-300 text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
                </div>
            `}function q(){const l=i.querySelectorAll(`.${e}-item`);l.forEach(s=>{s.addEventListener("click",h=>{if(h.target.closest(".agency-maps-btn"))return;h.preventDefault();const x=parseInt(s.dataset.itemIndex),B=o[x];if(!B)return;l.forEach(w=>{w.classList.remove("bg-white","border-secondary","selected-agency"),w.classList.add("bg-white/10","border-white/20");const A=w.querySelector(".agency-title"),re=w.querySelectorAll("i"),le=w.querySelectorAll(".agency-phone-link"),ge=w.querySelectorAll("p:not(:has(.agency-phone-link))"),he=w.querySelector(".agency-maps-btn");A&&(A.classList.remove("text-secondary"),A.classList.add("text-white")),re.forEach(R=>{R.classList.remove("text-secondary","text-gray-300","text-white"),R.classList.add("text-primary")}),le.forEach(R=>{R.classList.remove("text-secondary"),R.classList.add("text-white")}),ge.forEach(R=>{R.classList.remove("text-secondary"),R.classList.add("text-gray-200")}),he&&(he.classList.remove("bg-secondary"),he.classList.add("bg-primary"))}),s.classList.remove("bg-white/10","border-white/20"),s.classList.add("bg-white","border-secondary","selected-agency");const M=s.querySelector(".agency-title"),F=s.querySelectorAll("i"),W=s.querySelectorAll(".agency-phone-link"),O=s.querySelectorAll("p:not(:has(.agency-phone-link))"),N=s.querySelector(".agency-maps-btn");if(M&&(M.classList.remove("text-white"),M.classList.add("text-secondary")),F.forEach(w=>{w.classList.remove("text-secondary","text-gray-300","text-white"),w.classList.add("text-primary")}),W.forEach(w=>{w.classList.remove("text-white"),w.classList.add("text-secondary")}),O.forEach(w=>{w.classList.remove("text-gray-200"),w.classList.add("text-secondary")}),N&&(N.classList.remove("bg-primary"),N.classList.add("bg-secondary")),c&&B&&c._loaded)try{c.flyTo([B.latitude,B.longitude],14,{animate:!0,duration:1});const w=f.find(A=>A.item.id===B.id);w&&w.marker&&w.marker.openPopup()}catch(w){console.warn("Error updating map view:",w)}})})}function z(){const l=i.querySelector(`.${e}-search-input`),s=i.querySelector(`.${e}-zone-filter`),h=i.querySelector(`.${e}-department-filter`),x=i.querySelector(`.${e}-no-results`),B={Occidental:["Ahuachapán","Santa Ana","Sonsonate"],Paracentral:["Chalatenango","Cuscatlán","La Paz","Cabañas","San Vicente"],Central:["La Libertad","San Salvador"],Oriental:["Usulután","San Miguel","Morazán","La Unión"]},M=()=>{if(!s||!h)return;const W=s.value,O=h.value;if(!W)h.innerHTML='<option value="">Todos los Departamentos</option>',[...new Set(a.map(w=>w.department).filter(Boolean))].sort().forEach(w=>{const A=document.createElement("option");A.value=w,A.textContent=w,h.appendChild(A)}),O&&(h.value=O);else{const N=B[W]||[];h.innerHTML='<option value="">Todos los Departamentos</option>',N.forEach(w=>{const A=document.createElement("option");A.value=w,A.textContent=w,h.appendChild(A)}),N.includes(O)&&(h.value=O)}},F=()=>{const W=l?l.value.toLowerCase().trim():"",O=s?s.value:"",N=h?h.value:"";o=a.filter(w=>{let A=!0,re=!0,le=!0;return W&&(A=Object.values(w).some(ge=>String(ge).toLowerCase().includes(W))),O&&(re=w.zone===O),N&&(le=w.department===N),A&&re&&le}),j(),u(),x&&x.classList.toggle("hidden",o.length>0)};l&&l.addEventListener("input",F),s&&s.addEventListener("change",()=>{M(),F()}),h&&h.addEventListener("change",F)}function Y(){const l=i.querySelector("[data-title]");if(l){const x=H("map-title")||"Nuestras Agencias";l.textContent=x}const s=i.querySelector(`.${e}-search-input`);if(s){const x=H("search-placeholder")||"Buscar...";s.setAttribute("placeholder",x)}const h=i.querySelector(`.${e}-no-results`);if(h){const x=H("no-results-text")||"No se encontraron agencias";h.textContent=x}}function H(l){return i.closest(`[data-gjs-type="${e}"]`)?.getAttribute(l)}function ae(l){const s=i.querySelector(`.${e}-list`);s&&(s.innerHTML=`
                    <div class="flex flex-col items-center justify-center p-12 text-center">
                        <div class="w-20 h-20 mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                            <i class="ri-error-warning-line text-4xl text-red-300"></i>
                        </div>
                        <p class="text-white font-medium text-lg">${l}</p>
                        <p class="text-gray-300 text-sm mt-2">Por favor, intenta nuevamente más tarde</p>
                    </div>
                `)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g()}}const Yi=[{id:"agencies-map",label:"Mapa de Agencias",category:"Interactivos",media:Ui,content:{type:"agencies-map-component"}}];function Wi(i){const e="agencies-map-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute&&t.getAttribute("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Mapa de Agencias",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{class:"py-12 bg-secondary","data-gjs-type":e},components:`
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-layerable="false" data-gjs-droppable="false">
                        <div class="mb-8">
                            <h2 class="text-4xl md:text-5xl font-bold text-white" contenteditable="true" data-gjs-editable="true" data-gjs-selectable="true" data-gjs-type="text">Nuestras Agencias</h2>
                        </div>
                        <div class="mb-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-droppable="false">
                            <div class="flex flex-col gap-4" data-gjs-editable="false" data-gjs-selectable="false">
                                <div class="flex-1" data-gjs-editable="false" data-gjs-selectable="false">
                                    <div class="relative" data-gjs-editable="false" data-gjs-selectable="false">
                                        <input type="text" class="${e}-search-input w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200" placeholder="Buscar..." data-gjs-editable="false">
                                        <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" data-gjs-editable="false" data-gjs-selectable="false">
                                            <i class="ri-search-line text-lg"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col sm:flex-row gap-4 ${e}-filters-container" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-droppable="false"></div>
                            </div>
                            <div class="${e}-no-results hidden mt-6 p-4 bg-white/10 border border-white/20 rounded-2xl text-center" data-gjs-editable="false" data-gjs-selectable="false">
                                <p class="text-white font-medium">No se encontraron agencias</p>
                            </div>
                        </div>
                        <div class="flex flex-col lg:flex-row gap-6" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-droppable="false">
                            <div class="lg:w-1/3 order-2 lg:order-1" data-gjs-editable="false" data-gjs-selectable="false">
                                <div class="${e}-list space-y-3" style="max-height: 650px; overflow-y: auto; padding-right: 8px; scrollbar-width: thin; scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.05);" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-droppable="false">
                                </div>
                            </div>
                            <div class="lg:w-2/3 order-1 lg:order-2" data-gjs-editable="false" data-gjs-selectable="false">
                                <div class="${e}-map-container rounded-2xl overflow-hidden border border-white/20" style="height: 650px;" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-droppable="false">
                                    <div class="${e}-map w-full h-full" data-gjs-editable="false" data-gjs-selectable="false"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `,script:Vi()},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),Gi(i,e),Zi(i,e)}function Gi(i,e){i.on("component:selected",t=>{if(t.get("type")===e){const r=t.getEl();if(r){const a=r.querySelector(`.${e}-map`);a&&a._map&&setTimeout(()=>{a._map.invalidateSize()},100)}}}),i.on("storage:end:load",()=>{setTimeout(()=>{ze(i,e)},1e3)}),i.on("component:mount",t=>{const r=t.getEl();r&&r.getAttribute&&r.getAttribute("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&r&&a.call(r)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const r=t.getEl();if(r){const a=r.querySelector(`.${e}-map`);a&&a._map&&(a._map.remove(),delete a._map),setTimeout(()=>{const o=t.get("script");o&&typeof o=="function"&&o.call(r)},500)}}}),i.on("canvas:render",()=>{setTimeout(()=>{ze(i,e)},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(a=>{a.set("type",e),a.addAttributes({"data-gjs-type":e})})})}function ze(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(a=>{a.set("type",e);const o=a.getEl();if(o&&o.isConnected){const d=a.get("script");d&&typeof d=="function"&&d.call(o)}})}function Zi(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const r=t.contentDocument.head;if(!r.querySelector("#leaflet-css")){const a=document.createElement("link");a.id="leaflet-css",a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",r.appendChild(a)}if(!r.querySelector(`#${e}-css`)){const a=document.createElement("style");a.id=`${e}-css`,a.innerHTML=`
                .leaflet-container {
                    height: 100%;
                    width: 100%;
                    border-radius: inherit;
                    z-index: 0;
                }

                .${e}-item:hover {
                    background-color: rgba(255, 255, 255, 0.15);
                    border-color: rgba(240, 135, 42, 0.6);
                }

                .${e}-item:hover .agency-title {
                    color: #f0872a;
                }

                .agency-phone-link {
                    transition: all 0.2s ease;
                }

                .agency-phone-link:hover {
                    color: #f0872a;
                    text-decoration: underline;
                }

                .${e}-item.selected-agency .agency-phone-link:hover {
                    color: #f0872a !important;
                }

                .${e}-list::-webkit-scrollbar {
                    width: 4px !important;
                }

                .${e}-list::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }

                .${e}-list::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }

                .${e}-list::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .animate-spin {
                    animation: spin 1s linear infinite;
                }

                .${e}-item.selected-agency {
                    background-color: white !important;
                    border-color: #0d3f6a !important;
                }

                .${e}-item.selected-agency .agency-title,
                .${e}-item.selected-agency i,
                .${e}-item.selected-agency p,
                .${e}-item.selected-agency span,
                .${e}-item.selected-agency a {
                    color: #0d3f6a !important;
                }

                .agency-maps-btn {
                    transition: all 0.2s ease;
                }

                .agency-maps-btn:hover {
                    background-color: rgba(240, 135, 42, 0.9);
                }

                .${e}-item.selected-agency .agency-maps-btn {
                    background-color: #f0872a;
                    color: white;
                }

                .${e}-item.selected-agency .agency-maps-btn:hover {
                    background-color: rgba(240, 135, 42, 0.9);
                }
            `,r.appendChild(a)}})}const Ki=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <circle cx="23" cy="14" r="5" fill="#E97300"/>
    <circle cx="23" cy="14" r="4" fill="#f8e7d8"/>
</svg>`,Xi=`
.banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}
.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;}
.banner-slide-container:active{cursor:grabbing;}
.banner-slide-container{display:grid;}
.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}
.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}
.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}
.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;flex:1;padding:64px 64px 96px;max-width:54%;}
.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}
.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}
.banner-description{color:rgba(255,255,255,0.82);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:480px;}
.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}
.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}
.banner-image-col{position:relative;width:46%;display:flex;align-items:center;justify-content:center;padding:48px 48px 96px 0;flex-shrink:0;}
.banner-image-glow{position:absolute;inset:-24px;border-radius:50%;background:radial-gradient(circle,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.2) 55%,transparent 75%);filter:blur(16px);z-index:0;}
.banner-image{position:relative;z-index:1;max-height:380px;max-width:100%;width:auto;object-fit:contain;filter:drop-shadow(0 12px 40px rgba(0,0,0,0.4));}
.banner-dots-wrapper{display:none;}
.banner-stripe{position:relative;width:100%;height:48px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}
.banner-dots{display:flex;gap:8px;align-items:center;}
.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}
.banner-dot--active{width:28px;background:#ffffff;}
@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}
@media(max-width:480px){
    .banner-btn{flex:1 1 100%;min-width:0;}
}`;function Qi(){return function(){const i=this,e=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",t={"fill-blue":{bg:"#003B71",color:"#ffffff",border:"#003B71",hoverBg:"#002a52",hoverColor:"#ffffff"},"outline-blue":{bg:"transparent",color:"#003B71",border:"#003B71",hoverBg:"#003B71",hoverColor:"#ffffff"},"fill-orange":{bg:"#E97300",color:"#ffffff",border:"#E97300",hoverBg:"#c96200",hoverColor:"#ffffff"},"outline-orange":{bg:"transparent",color:"#E97300",border:"#E97300",hoverBg:"#E97300",hoverColor:"#ffffff"},"fill-white":{bg:"#ffffff",color:"#003B71",border:"#ffffff",hoverBg:"#dce8f5",hoverColor:"#003B71"},"outline-white":{bg:"transparent",color:"#ffffff",border:"#ffffff",hoverBg:"#ffffff",hoverColor:"#003B71"}},r=".banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;}.banner-slide-container:active{cursor:grabbing;}.banner-slide-container{display:grid;}.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}.banner-bg{position:absolute;inset:0;z-index:0;}.banner-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.banner-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.banner-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.banner-dots-wrapper{display:none;}.banner-stripe{position:relative;width:100%;height:48px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}.banner-dots{display:flex;gap:8px;align-items:center;}.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}.banner-dot--active{width:28px;background:#ffffff;}@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}";(function(){const s=i.ownerDocument??document;if(!s.getElementById("banner-hero-styles")){const h=s.createElement("style");h.id="banner-hero-styles",h.textContent=r,s.head.appendChild(h)}})();let a=[],o=0,d=null,c=!1,f=0,g=0;const k=50,E=i.dataset.autoplay!=="false",m=i.dataset.category??"",n=i.querySelector(".banner-slide-container");i.querySelector(".banner-dots");async function p(){y();try{const s=await(await fetch(e)).json();if(a=Array.isArray(s)?m?s.filter(h=>h.category===m):s:[],a.length===0){ae();return}$(),q(),z(0,!1),E&&Y()}catch{ae()}}function y(){n.innerHTML=`
                <div class="banner-slide banner-slide--active">
                    <div class="banner-slide-inner">
                        <div class="banner-bg bsk-bg-img"></div>
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            <div class="bsk-badge"></div>
                            <div class="bsk-title"></div>
                            <div class="bsk-title bsk-title--short"></div>
                            <div class="bsk-line"></div>
                            <div class="bsk-line"></div>
                            <div class="bsk-line bsk-line--short"></div>
                            <div class="bsk-buttons">
                                <div class="bsk-btn"></div>
                                <div class="bsk-btn"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;const l=i.ownerDocument??document;if(!l.getElementById("banner-skeleton-styles")){const s=l.createElement("style");s.id="banner-skeleton-styles",s.textContent=`
                    @keyframes bsk-shimmer {
                        0%   { background-position: -600px 0; }
                        100% { background-position:  600px 0; }
                    }
                    .bsk-base {
                        background: linear-gradient(90deg,
                            rgba(255,255,255,0.06) 25%,
                            rgba(255,255,255,0.14) 50%,
                            rgba(255,255,255,0.06) 75%);
                        background-size: 600px 100%;
                        animation: bsk-shimmer 1.6s infinite linear;
                        border-radius: 8px;
                    }
                    .bsk-badge{
                        width:120px;height:32px;margin-bottom:20px;border-radius:999px;
                        background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);
                        background-size:600px 100%;
                        animation:bsk-shimmer 1.6s infinite linear;
                    }
                    .bsk-title{
                        height:40px;margin-bottom:12px;border-radius:8px;
                        background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);
                        background-size:600px 100%;
                        animation:bsk-shimmer 1.6s infinite linear;
                    }
                    .bsk-title--short{width:60%;height:40px;}
                    .bsk-line{
                        height:16px;margin-bottom:10px;border-radius:6px;
                        background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);
                        background-size:600px 100%;
                        animation:bsk-shimmer 1.6s infinite linear;
                    }
                    .bsk-line--short{width:55%;}
                    .bsk-buttons{display:flex;gap:16px;margin-top:36px;}
                    .bsk-btn{
                        height:48px;flex:1;border-radius:999px;
                        background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);
                        background-size:600px 100%;
                        animation:bsk-shimmer 1.6s infinite linear;
                    }
                    .bsk-bg-img{
                        background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);
                        background-size:600px 100%;
                        animation:bsk-shimmer 1.6s infinite linear;
                    }
                    @media(max-width:768px){
                        .bsk-buttons{flex-direction:column;}
                    }
                `,l.head.appendChild(s)}}function T(l){return t[l]?t[l]:l==="outline-blue"||l==="outline-orange"?t["outline-white"]:t["fill-white"]}function u(l,s,h,x){const B=T(h),M=s?"a":"span",F=s?`href="${s}"${x?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${M} ${F}
                class="banner-btn"
                data-bg="${B.bg}"
                data-color="${B.color}"
                data-hover-bg="${B.hoverBg}"
                data-hover-color="${B.hoverColor}"
                style="background:${B.bg};color:${B.color};border:2px solid ${B.border};">
                ${l}
            </${M}>`}function $(){n.innerHTML=a.map((l,s)=>`
                <div class="banner-slide" data-index="${s}">
                    <div class="banner-slide-inner">
                        <div class="banner-bg">
                            <img src="${l.image_url}"
                                 alt="${l.image_alt??l.title}"
                                 loading="${s===0?"eager":"lazy"}"
                                 decoding="async"
                                 fetchpriority="${s===0?"high":"low"}"
                                 draggable="false">
                        </div>
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            ${l.category?`<span class="banner-category-badge">${l.category}</span>`:""}
                            <h2 class="banner-title">${l.title}</h2>
                            <p class="banner-description">${l.description}</p>
                            ${l.btn_primary_text||l.btn_secondary_text?`
                                <div class="banner-buttons">
                                    ${l.btn_primary_text?u(l.btn_primary_text,l.btn_primary_url,l.btn_primary_style,l.btn_primary_external):""}
                                    ${l.btn_secondary_text?u(l.btn_secondary_text,l.btn_secondary_url,l.btn_secondary_style,l.btn_secondary_external):""}
                                </div>`:""}
                        </div>
                    </div>
                </div>
            `).join(""),I(),C(),v()}function I(){i.querySelectorAll(".banner-btn").forEach(l=>{const s=l.style.borderColor;l.addEventListener("mouseenter",()=>{l.style.background=l.dataset.hoverBg,l.style.color=l.dataset.hoverColor,l.style.borderColor=l.dataset.hoverBg}),l.addEventListener("mouseleave",()=>{l.style.background=l.dataset.bg,l.style.color=l.dataset.color,l.style.borderColor=s})})}function C(){n.addEventListener("mousedown",j),n.addEventListener("touchstart",j,{passive:!0}),n.addEventListener("mousemove",b),n.addEventListener("touchmove",b,{passive:!0}),n.addEventListener("mouseup",L),n.addEventListener("touchend",L),n.addEventListener("mouseleave",L)}function v(){a.forEach(l=>{const s=new Image;s.src=l.image_url})}function j(l){c=!0,f=l.touches?l.touches[0].clientX:l.clientX,g=0}function b(l){c&&(g=(l.touches?l.touches[0].clientX:l.clientX)-f)}function L(){c&&(c=!1,Math.abs(g)>=k&&(z(g<0?(o+1)%a.length:(o-1+a.length)%a.length),H()),g=0)}function q(){const l=i.querySelector(".banner-stripe");if(!l||a.length<=1)return;const s=document.createElement("div");s.className="banner-dots",a.forEach((h,x)=>{const B=document.createElement("button");B.className="banner-dot",B.dataset.index=String(x),B.setAttribute("aria-label",`Banner ${x+1}`),B.addEventListener("click",()=>{z(x),H()}),s.appendChild(B)}),l.innerHTML="",l.appendChild(s)}function z(l,s=!0){const h=n.querySelectorAll(".banner-slide"),x=i.querySelectorAll(".banner-dot");h.forEach((B,M)=>{const F=M===l;s||(B.style.transition="none"),B.classList.toggle("banner-slide--active",F),s||requestAnimationFrame(()=>{B.style.transition=""})}),x.forEach((B,M)=>{B.classList.toggle("banner-dot--active",M===l)}),o=l}function Y(){a.length<=1||!E||(d=setInterval(()=>{z((o+1)%a.length)},5e3))}function H(){E&&(clearInterval(d),Y())}function ae(){const l=i.querySelector(".banner-wrapper");l&&(l.innerHTML=`
                    <div style="display:flex;align-items:center;justify-content:center;
                                min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;">
                        Sin contenido.
                    </div>`)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",p):p()}}const Ji=[{id:"banner-hero",label:"Banner Slider",category:"Banners",media:Ki,content:{type:"banner-hero-component"}}];function ea(i){const e="banner-hero-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Slider",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-autoplay":"true","data-category":""},components:`
                    <div class="banner-wrapper"
                         data-gjs-editable="false" data-gjs-selectable="false"
                         data-gjs-hoverable="false" data-gjs-droppable="false"
                         data-gjs-highlightable="false">
                        <div class="banner-slide-container"
                             data-gjs-editable="false" data-gjs-selectable="false"
                             data-gjs-hoverable="false" data-gjs-droppable="false"
                             data-gjs-highlightable="false">
                        </div>
                        <div class="banner-dots-wrapper"
                             data-gjs-editable="false" data-gjs-selectable="false"
                             data-gjs-hoverable="false" data-gjs-droppable="false"
                             data-gjs-highlightable="false">
                            <div class="banner-dots"></div>
                        </div>
                        <div class="banner-stripe"
                             data-gjs-editable="false" data-gjs-selectable="false"
                             data-gjs-hoverable="false" data-gjs-droppable="false"
                             data-gjs-highlightable="false">
                        </div>
                    </div>
                `,script:Qi(),traits:[{type:"select",name:"data-autoplay",label:"Avance automático",options:[{id:"true",name:"Activado"},{id:"false",name:"Desactivado"}],changeProp:!1},{type:"select",name:"data-category",label:"Filtrar por categoría",options:[{id:"",name:"Todas las categorías"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const t=this.getEl();if(!t)return;const r=this.get("script");r&&typeof r=="function"&&setTimeout(()=>r.call(t),100)})}}}),ia(i,e),aa(i,e),ta(i,e)}async function ta(i,e){try{const t=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",a=await(await fetch(t)).json();if(!Array.isArray(a))return;const o=[...new Set(a.map(g=>g.category).filter(Boolean))].sort();if(o.length===0)return;const d=i.DomComponents.getType(e);if(!d)return;const f=d.model.prototype.defaults.traits.find(g=>g.name==="data-category");if(!f)return;f.options=[{id:"",name:"Todas las categorías"},...o.map(g=>({id:g,name:g}))]}catch{}}function ia(i,e){i.on("storage:end:load",()=>{setTimeout(()=>Te(i,e),1e3)}),i.on("component:mount",t=>{const r=t.getEl();r?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const r=t.getEl();r&&setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},500)}}),i.on("canvas:render",()=>{setTimeout(()=>Te(i,e),800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function Te(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const r=t.getEl();if(r?.isConnected){const a=t.get("script");a&&typeof a=="function"&&a.call(r)}})}function aa(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const r=t.contentDocument?.head;if(r){if(!r.querySelector("#banner-hero-styles")){const a=document.createElement("style");a.id="banner-hero-styles",a.textContent=Xi,r.appendChild(a)}if(!r.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(240,135,42,0.6) !important;
                    outline-offset: 2px;
                }
            `,r.appendChild(a)}}})}const ra=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="17" y="8" width="12" height="14" fill="#E97300" rx="2"/>
    <rect x="19" y="10" width="8" height="10" fill="#f8e7d8" rx="1"/>
</svg>`,la=`
.bsingle-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}
.bsingle-inner{position:relative;width:100%;min-height:480px;display:flex;align-items:center;}
.bsingle-bg{position:absolute;inset:0;z-index:0;}
.bsingle-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.bsingle-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}
.bsingle-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}
.bsingle-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}
.bsingle-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}
.bsingle-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}
.bsingle-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}
.bsingle-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}
.bsingle-stripe{position:relative;width:100%;height:40px;background:#E97300;z-index:20;}
@media(max-width:768px){
    .bsingle-inner{min-height:340px;}
    .bsingle-bg img{object-position:right center;}
    .bsingle-content{max-width:100%;width:100%;padding:32px 24px 80px;}
    .bsingle-buttons{flex-wrap:wrap;gap:12px;}
    .bsingle-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}
}
@media(max-width:480px){
    .bsingle-btn{flex:1 1 100%;min-width:0;}
}`;function oa(){return function(){const i=this,e=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",t={"fill-blue":{bg:"#003B71",color:"#ffffff",border:"#003B71",hoverBg:"#002a52",hoverColor:"#ffffff"},"outline-blue":{bg:"transparent",color:"#003B71",border:"#003B71",hoverBg:"#003B71",hoverColor:"#ffffff"},"fill-orange":{bg:"#E97300",color:"#ffffff",border:"#E97300",hoverBg:"#c96200",hoverColor:"#ffffff"},"outline-orange":{bg:"transparent",color:"#E97300",border:"#E97300",hoverBg:"#E97300",hoverColor:"#ffffff"},"fill-white":{bg:"#ffffff",color:"#003B71",border:"#ffffff",hoverBg:"#dce8f5",hoverColor:"#003B71"},"outline-white":{bg:"transparent",color:"#ffffff",border:"#ffffff",hoverBg:"#ffffff",hoverColor:"#003B71"}},r=".bsingle-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.bsingle-inner{position:relative;width:100%;min-height:480px;display:flex;align-items:center;}.bsingle-bg{position:absolute;inset:0;z-index:0;}.bsingle-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.bsingle-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.bsingle-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.bsingle-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.bsingle-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.bsingle-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.bsingle-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.bsingle-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.bsingle-stripe{position:relative;width:100%;height:40px;background:#E97300;z-index:20;}@media(max-width:768px){.bsingle-inner{min-height:340px;}.bsingle-bg img{object-position:right center;}.bsingle-content{max-width:100%;width:100%;padding:32px 24px 80px;}.bsingle-buttons{flex-wrap:wrap;gap:12px;}.bsingle-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.bsingle-btn{flex:1 1 100%;min-width:0;}}";(function(){const p=i.ownerDocument??document;if(!p.getElementById("banner-single-styles")){const y=p.createElement("style");y.id="banner-single-styles",y.textContent=r,p.head.appendChild(y)}})();const a=i.dataset.bannerId??"",o=i.querySelector(".bsingle-content-wrapper");async function d(){c();try{const p=await(await fetch(e)).json();if(!Array.isArray(p)||p.length===0){m();return}const y=a?p.find(T=>String(T.id)===String(a)):p[0];if(!y){m();return}k(y)}catch{m()}}function c(){o.innerHTML=`
                <div class="bsingle-inner">
                    <div class="bsingle-bg bsk-bg-img"></div>
                    <div class="bsingle-overlay"></div>
                    <div class="bsingle-content">
                        <div class="bsk-badge"></div>
                        <div class="bsk-title"></div>
                        <div class="bsk-title bsk-title--short"></div>
                        <div class="bsk-line"></div>
                        <div class="bsk-line"></div>
                        <div class="bsk-line bsk-line--short"></div>
                        <div class="bsk-buttons">
                            <div class="bsk-btn"></div>
                            <div class="bsk-btn"></div>
                        </div>
                    </div>
                </div>`;const n=i.ownerDocument??document;if(!n.getElementById("banner-skeleton-styles")){const p=n.createElement("style");p.id="banner-skeleton-styles",p.textContent="@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title--short{width:60%;}.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-line--short{width:55%;}.bsk-buttons{display:flex;gap:16px;margin-top:36px;}.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}@media(max-width:768px){.bsk-buttons{flex-direction:column;}}",n.head.appendChild(p)}}function f(n){return t[n]??t["fill-white"]}function g(n,p,y,T){const u=f(y),$=p?"a":"span",I=p?`href="${p}"${T?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${$} ${I}
                class="bsingle-btn"
                data-bg="${u.bg}"
                data-color="${u.color}"
                data-border="${u.border}"
                data-hover-bg="${u.hoverBg}"
                data-hover-color="${u.hoverColor}"
                style="background:${u.bg};color:${u.color};border:2px solid ${u.border};">
                ${n}
            </${$}>`}function k(n){o.innerHTML=`
                <div class="bsingle-inner">
                    <div class="bsingle-bg">
                        <img src="${n.image_url}"
                             alt="${n.image_alt??n.title}"
                             loading="eager"
                             decoding="async"
                             fetchpriority="high"
                             draggable="false">
                    </div>
                    <div class="bsingle-overlay"></div>
                    <div class="bsingle-content">
                        ${n.category?`<span class="bsingle-category-badge">${n.category}</span>`:""}
                        <h2 class="bsingle-title">${n.title}</h2>
                        <p class="bsingle-description">${n.description}</p>
                        ${n.btn_primary_text||n.btn_secondary_text?`
                            <div class="bsingle-buttons">
                                ${n.btn_primary_text?g(n.btn_primary_text,n.btn_primary_url,n.btn_primary_style,n.btn_primary_external):""}
                                ${n.btn_secondary_text?g(n.btn_secondary_text,n.btn_secondary_url,n.btn_secondary_style,n.btn_secondary_external):""}
                            </div>`:""}
                    </div>
                </div>`,E()}function E(){i.querySelectorAll(".bsingle-btn").forEach(n=>{const p=n.style.borderColor;n.addEventListener("mouseenter",()=>{n.style.background=n.dataset.hoverBg,n.style.color=n.dataset.hoverColor,n.style.borderColor=n.dataset.hoverBg}),n.addEventListener("mouseleave",()=>{n.style.background=n.dataset.bg,n.style.color=n.dataset.color,n.style.borderColor=p})})}function m(){o.innerHTML=`
                <div style="display:flex;align-items:center;justify-content:center;
                            min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;">
                    No hay banner seleccionado o no está activo.
                </div>`}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d()}}const na=[{id:"banner-single",label:"Banner Individual",category:"Banners",media:ra,content:{type:"banner-single-component"}}];function sa(i){const e="banner-single-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Individual",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-banner-id":""},components:`
                    <div class="bsingle-wrapper"
                         data-gjs-editable="false" data-gjs-selectable="false"
                         data-gjs-hoverable="false" data-gjs-droppable="false"
                         data-gjs-highlightable="false">
                        <div class="bsingle-content-wrapper"
                             data-gjs-editable="false" data-gjs-selectable="false"
                             data-gjs-hoverable="false" data-gjs-droppable="false"
                             data-gjs-highlightable="false">
                        </div>
                        <div class="bsingle-stripe"
                             data-gjs-editable="false" data-gjs-selectable="false"
                             data-gjs-hoverable="false" data-gjs-droppable="false"
                             data-gjs-highlightable="false">
                        </div>
                    </div>
                `,script:oa(),traits:[{type:"select",name:"data-banner-id",label:"Banner a mostrar",options:[{id:"",name:"Cargando banners..."}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const t=this.getEl();if(!t)return;const r=this.get("script");r&&typeof r=="function"&&setTimeout(()=>r.call(t),100)})}}}),da(i,e),ga(i,e),ca(i,e)}async function ca(i,e){try{const t=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",a=await(await fetch(t)).json();if(!Array.isArray(a)||a.length===0)return;const o=i.DomComponents.getType(e);if(!o)return;const c=o.model.prototype.defaults.traits.find(f=>f.name==="data-banner-id");if(!c)return;c.options=[{id:"",name:"— Seleccionar banner —"},...a.map(f=>({id:String(f.id),name:f.category?`[${f.category}] ${f.title}`:f.title}))]}catch{}}function da(i,e){i.on("storage:end:load",()=>{setTimeout(()=>Ae(i,e),1e3)}),i.on("component:mount",t=>{const r=t.getEl();r?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const r=t.getEl();r&&setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},500)}}),i.on("canvas:render",()=>{setTimeout(()=>Ae(i,e),800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function Ae(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const r=t.getEl();if(r?.isConnected){const a=t.get("script");a&&typeof a=="function"&&a.call(r)}})}function ga(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const r=t.contentDocument?.head;if(r){if(!r.querySelector("#banner-single-styles")){const a=document.createElement("style");a.id="banner-single-styles",a.textContent=la,r.appendChild(a)}if(!r.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(240,135,42,0.6) !important;
                    outline-offset: 2px;
                }
            `,r.appendChild(a)}}})}function ha(i){S.registerBlocks(rt),S.registerBlocks(ft),S.registerBlocks(Ji),S.registerBlocks(na),S.registerBlocks(ri),S.registerBlocks(Rt),S.registerBlocks(yt),S.registerBlocks(Bt),S.registerBlocks(It),S.registerBlocks(At),S.registerBlocks(Dt),S.registerBlocks($t),S.registerBlocks(ei),S.registerBlocks(St),S.registerBlocks(Nt),S.registerBlocks(ni),S.registerBlocks(hi),S.registerBlocks(mi),S.registerBlocks(ui),S.registerBlocks($i),S.registerBlocks(Ni),S.registerBlocks(Ri),S.registerBlocks(Yi),S.applyToEditor(i),Wi(i),ea(i),sa(i),Pi(i),Ut(i),Ei(i)}function fa(i,e,t){i.on("component:add",()=>e.markAsDirty()),i.on("component:remove",()=>e.markAsDirty()),i.on("component:update",()=>e.markAsDirty()),i.on("style:update",()=>e.markAsDirty());const r=document.getElementById("save-button");r&&r.addEventListener("click",async()=>{await pa(i,e,t,r)}),document.addEventListener("keydown",a=>{(a.ctrlKey||a.metaKey)&&a.key==="s"&&(a.preventDefault(),r&&!r.disabled&&r.click())})}async function pa(i,e,t,r){r.disabled=!0,r.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{t.needsTitle()?await ma(i,e,t):await Ne(i,e,t)}catch(a){Pe(a.message,"error")}finally{r.disabled=!1,r.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}async function ma(i,e,t){return new Promise((r,a)=>{Fe({title:"Título de la Página",description:"Ingresa un título descriptivo para identificar esta página",placeholder:"Ej: Acerca de Nosotros",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async o=>{if(!o?.trim()){a(new Error("El título es obligatorio"));return}try{await Ne(i,e,t,o),r()}catch(d){a(d)}},onCancel:()=>{a(new Error("Guardado cancelado"))}})})}async function Ne(i,e,t,r=null){const o={...e.getEditorContent(i),is_published:t.isPublished};r&&(o.title=r);const d=await e.savePage(i,o,t.storeUrl,t.getHttpMethod());d.success&&(e.markAsClean(),Pe(d.message,"success"),!t.isEditMode&&d.page?(t.updatePageInfo(d),t.updateTitle(d.page.title)):r&&t.updateTitle(r))}function Pe(i,e){typeof window.showNotification=="function"&&window.showNotification(i,e)}document.addEventListener("DOMContentLoaded",async()=>{const i=new Oe,e=new et;new tt(i);const t=Re();if(t.on("load",()=>{ha(t),Ue(t),Ve(),Ye(),We(t),Ge(t),Ze(t),Ke(t),Xe(t),Qe(t),ba(t),xa(t),ua(t),setTimeout(()=>{t.runCommand("sw-visibility"),t.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),e.isEditMode)try{await i.loadPageContent(t,e.loadUrl),De("Contenido cargado correctamente","success")}catch(r){De("Error al cargar el contenido","error"),console.error(r)}fa(t,i,e)});function ba(i){const e=[{cmd:"set-device-desktop",device:"Desktop"},{cmd:"set-device-tablet",device:"Tablet"},{cmd:"set-device-mobile",device:"Mobile"}];e.forEach(({cmd:t,device:r})=>{i.Commands.add(t,{run:a=>{a.setDevice(r),e.forEach(({cmd:o})=>{a.Panels.getButton("devices-c",o)?.set("active",o===t)})}})})}function xa(i){i.Commands.add("canvas-clear",{run:e=>{Je({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{e.DomComponents.clear(),e.CssComposer.clear()}})}})}function ua(i){const e=i.Canvas.getFrameEl();if(!e?.contentDocument?.head)return;const t=e.contentDocument.createElement("style");t.id="gjs-dashed-fix",t.textContent="body,body.gjs-dashed{margin:0!important;padding:0 0 160px 0!important;}",e.contentDocument.head.appendChild(t)}function De(i,e="info"){typeof window.showNotification=="function"&&window.showNotification(i,e)}
