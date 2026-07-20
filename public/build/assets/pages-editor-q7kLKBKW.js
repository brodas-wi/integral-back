/* empty css                   *//* empty css                    *//* empty css                          *//* empty css                           */import{o as Le,M as qt,j as Dt,E as Mt,i as Nt,t as Pt,d as Rt,f as Ot,e as Ht,s as Ft,g as Ut,c as Vt,b as Yt,a as Xt,h as Gt}from"./editor-commands-DULPa6UC.js";import{a as _}from"./url-DaqOO3yL.js";import"./_commonjsHelpers-CqkleIqs.js";class Wt{constructor(){this.pageId=this.getElementValue("page-id"),this.pageSlug=this.getElementValue("page-slug"),this.pageTitle=this.getPageTitle(),this.loadUrl=this.getElementValue("page-load-url"),this.storeUrl=this.getElementValue("page-store-url"),this.isPublished=this.getElementValue("page-is-published")==="1",this.isEditMode=!!this.pageId,this.appUrl=(document.querySelector('meta[name="app-url"]')?.content??"").replace(/\/$/,"")}getElementValue(e,i=""){const a=document.getElementById(e);return a?a.value.trim():i}getPageTitle(){const e=document.getElementById("editor-title");if(!e)return"";const a=e.textContent.match(/(?:Editando:|Nueva Página)\s*(.+)?/);return a&&a[1]?a[1].trim():""}updatePageInfo(e){if(e.page)if(this.pageId=e.page.id,this.pageSlug=e.page.slug,this.pageTitle=e.page.title,this.isEditMode=!0,document.getElementById("page-id").value=this.pageId,document.getElementById("page-slug").value=this.pageSlug,e.page.update_url?this.storeUrl=e.page.update_url:this.storeUrl=`${this.appUrl}/pages/${this.pageSlug}`,document.getElementById("page-store-url").value=this.storeUrl,e.page.load_url?this.loadUrl=e.page.load_url:this.loadUrl=`${this.appUrl}/pages/${this.pageSlug}/load`,document.getElementById("page-load-url").value=this.loadUrl,e.page.edit_url)window.history.replaceState(null,"",e.page.edit_url);else try{const i=new URL(window.location.href);i.pathname=i.pathname.replace(/\/pages\/create\/?$/,`/pages/${this.pageSlug}/edit`),window.history.replaceState(null,"",i.toString())}catch(i){console.error("Error updating browser URL:",i)}}updateTitle(e){this.pageTitle=e;const i=document.getElementById("editor-title");i&&(i.textContent=`Editando: ${e}`),document.title=`Editar: ${e} - Editor`}getHttpMethod(){return this.isEditMode?"PUT":"POST"}needsTitle(){return!this.isEditMode}}class Jt{constructor(e){this.editorService=e,this.setupBackButton(),this.setupBeforeUnload()}setupBackButton(){const e=document.querySelector("#editor-navbar a[href]");e&&e.addEventListener("click",i=>{this.editorService.shouldPreventUnload()&&(i.preventDefault(),this.showUnsavedChangesModal(()=>{this.editorService.startNavigation(),window.location.href=e.href}))})}setupBeforeUnload(){window.addEventListener("beforeunload",e=>{if(this.editorService.shouldPreventUnload())return e.preventDefault(),e.returnValue="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?",e.returnValue})}showUnsavedChangesModal(e){const i=document.createElement("div");i.style.cssText=`
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.5);
        `;const a=document.createElement("div");a.style.cssText=`
            background: #ffffff;
            border-radius: 0.75rem;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 28rem;
            width: 100%;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
        `;const r=document.createElement("div");r.style.cssText="padding: 1.5rem 1.5rem 0;",r.innerHTML=`
            <div style="display:flex;align-items:flex-start;gap:1rem;">
                <div style="flex-shrink:0;width:3rem;height:3rem;border-radius:50%;background:#fef3c7;color:#d97706;display:flex;align-items:center;justify-content:center;">
                    <i class="ri-alert-line" style="font-size:1.5rem;"></i>
                </div>
                <div style="flex:1;">
                    <h3 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 0.5rem;">Cambios sin guardar</h3>
                    <p style="font-size:0.875rem;color:#6b7280;margin:0;">Tienes cambios sin guardar. ¿Estás seguro de que quieres salir sin guardar?</p>
                </div>
            </div>
        `;const l=document.createElement("div");l.style.cssText=`
            padding: 1rem 1.5rem;
            background: #f9fafb;
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
            margin-top: 1.5rem;
        `;const o=document.createElement("button");o.textContent="Cancelar",o.style.cssText=`
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            background: #ffffff;
            color: #374151;
            border: 2px solid #d1d5db;
            font-family: inherit;
        `;const g=document.createElement("button");g.textContent="Salir sin guardar",g.style.cssText=`
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            background: #dc2626;
            color: #ffffff;
            border: 2px solid #dc2626;
            font-family: inherit;
        `,[o,g].forEach(d=>{d.addEventListener("mouseenter",()=>{d.style.opacity="0.85"}),d.addEventListener("mouseleave",()=>{d.style.opacity="1"})});const f=()=>i.remove();o.addEventListener("click",f),g.addEventListener("click",()=>{f(),e()}),i.addEventListener("click",d=>{d.target===i&&f()}),l.appendChild(o),l.appendChild(g),a.appendChild(r),a.appendChild(l),i.appendChild(a),document.body.appendChild(i)}}const Kt="Básico";class Zt{constructor(){this.blocks=new Map}registerBlock(e,i){this.blocks.has(i.category)||this.blocks.set(i.category,[]),this.blocks.get(i.category).push({id:e,...i})}registerBlocks(e){e.forEach(i=>{this.registerBlock(i.id,i)})}applyToEditor(e){this.blocks.forEach(i=>{i.forEach(a=>{const{id:r,...l}=a;e.BlockManager.add(r,l)})}),this.applyCollapseSettings(e),this.hideDefaultCategories(e)}applyCollapseSettings(e){setTimeout(()=>{e.BlockManager.getCategories().each(i=>{i.set("open",i.get("label")===Kt)})},500)}hideDefaultCategories(e){setTimeout(()=>{const i=["Basic","Extra"];document.querySelectorAll(".gjs-block-category").forEach(a=>{const r=a.querySelector(".gjs-title");r&&i.includes(r.textContent.trim())&&(a.style.display="none")})},100)}}const L=new Zt,Qt=[{id:"heading1",label:"Título H1",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:{type:"image",attributes:{src:_("images/placeholder.svg"),alt:"Imagen"},classes:["max-w-full","h-auto","block"],activeOnRender:1}},{id:"unordered-list",label:"Lista no ordenada",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:'<div class="h-12 w-full"></div>'}],ei=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,ti=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,ii=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="12" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="22" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,ai=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="9" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="25" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,ri=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="13" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,li=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="21" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,oi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="14" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="23" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,ni=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="11" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="20" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,I='<div class="col-cell"></div>',G=`
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
</style>`,si=[{id:"columns-1",label:"1 Columna",category:"Columnas",media:ei,content:`
<div class="col-section">
    <div class="col-cell"></div>
</div>
${G}`},{id:"columns-2",label:"2 Columnas",category:"Columnas",media:ti,content:`
<div class="col-section">
    <div class="col-grid col-grid--2">
        ${I}
        ${I}
    </div>
</div>
${G}`},{id:"columns-3",label:"3 Columnas",category:"Columnas",media:ii,content:`
<div class="col-section">
    <div class="col-grid col-grid--3">
        ${I}
        ${I}
        ${I}
    </div>
</div>
${G}`},{id:"columns-4",label:"4 Columnas",category:"Columnas",media:ai,content:`
<div class="col-section">
    <div class="col-grid col-grid--4">
        ${I}
        ${I}
        ${I}
        ${I}
    </div>
</div>
${G}`},{id:"columns-1-3",label:"1/3 — 2/3",category:"Columnas",media:ri,content:`
<div class="col-section">
    <div class="col-grid col-grid--1-2">
        ${I}
        ${I}
    </div>
</div>
${G}`},{id:"columns-3-1",label:"2/3 — 1/3",category:"Columnas",media:li,content:`
<div class="col-section">
    <div class="col-grid col-grid--2-1">
        ${I}
        ${I}
    </div>
</div>
${G}`},{id:"columns-1-2",label:"1/4 — 1/4 — 1/2",category:"Columnas",media:oi,content:`
<div class="col-section">
    <div class="col-grid col-grid--1-1-2">
        ${I}
        ${I}
        ${I}
    </div>
</div>
${G}`},{id:"columns-2-1",label:"1/2 — 1/4 — 1/4",category:"Columnas",media:ni,content:`
<div class="col-section">
    <div class="col-grid col-grid--2-1-1">
        ${I}
        ${I}
        ${I}
    </div>
</div>
${G}`}],ci=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,di=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,fi=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Misión</h3>
    <p class="mvv-card-text">Proveemos la mejor experiencia a los empresarios de la micro y pequeña empresa, sus familiares y sus empleados, acompañándolos en su desarrollo con productos y servicios financieros especializados e innovadores adaptados a sus necesidades</p>
</div>`,pi=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Visión</h3>
    <p class="mvv-card-text">Ser el banco pionero de la revolución financiera digital para los empresarios de la micro y pequeña empresa; y que mejor comprende y sirve sus necesidades de desarrollo a través de un ecosistema de productos y servicios integrales e innovadores.".</p>
</div>`,gi=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Valores</h3>
    <p class="mvv-card-text">Cada día la cultura Integral se está fortaleciendo, todos los que pertenecemos a esta organización compartimos y vivimos los valores</p>
    <ul class="mvv-bullet-list">
        <li>Responsabilidad</li>
        <li>Compromiso social</li>
        <li>Integridad</li>
        <li>Excelencia</li>
    </ul>
</div>`,Fe=`
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
.mvv-bullet-list li{color:#ffffff;font-size:0.9rem;line-height:1.5;text-align:center;}
.mvv-bullet-list li::before{content:"• ";color:#ffffff;}
@media(max-width:1280px){.ab-section{padding:3rem 2.5rem;}.mvv-section{padding:3rem 2.5rem;}}
@media(max-width:992px){
    .ab-section{padding:2.5rem 1.5rem;}
    .ab-grid{grid-template-columns:1fr;gap:2rem;}
    .mvv-section{padding:2.5rem 1.5rem;}
    .mvv-grid{grid-template-columns:1fr;}
}
@media(max-width:580px){.ab-section{padding:2rem 1rem;}.mvv-section{padding:2rem 1rem;}}
</style>`,hi=[{id:"about-section",label:"Nuestra Historia",category:"Contenido",media:ci,content:`
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
                <img src="${_("images/placeholder.svg")}" alt="Imagen de sección">
            </div>
        </div>
    </div>
</section>
${Fe}`},{id:"about-mvv-section",label:"Misión, Visión y Valores",category:"Contenido",media:di,content:`
<section class="mvv-section">
    <h2 class="mvv-section-title">Misión, Visión y Valores</h2>
    <div class="mvv-grid">
        ${fi}
        ${pi}
        ${gi}
    </div>
</section>
${Fe}`}],mi=`
<style>
.mv-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;}
@media(max-width:992px){.mv-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`,bi=`
<li class="flex items-start gap-2 text-base font-bold text-[#E97300] leading-relaxed">
    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#E97300] shrink-0"></span>
    <span>Responsabilidad</span>
</li>`,ui=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="14" height="4" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="9" width="14" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="2" y="11" width="12" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="2" y="15" width="14" height="4" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="21" width="14" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="2" y="23" width="11" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="3.5" cy="27.5" r="1" fill="#E97300" fill-opacity="0.8"/>
    <rect x="6" y="27" width="9" height="1" rx="0.5" fill="#E97300" fill-opacity="0.6"/>
    <rect x="19" y="3" width="11" height="22" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="20.5" y="4.5" width="8" height="8" rx="1" fill="#E97300" fill-opacity="0.6"/>
    <circle cx="24.5" cy="8.5" r="2" fill="#f8e7d8"/>
</svg>`,xi=[{id:"mission-vision-values",label:"Misión, Visión y Valores",category:"Institucional",media:ui,content:`
<section class="w-full bg-white px-6 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-12">
    <div class="mv-grid">
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
                <h2 class="text-4xl font-extrabold text-[#003B71]">Misión</h2>
                <p class="text-base text-[#003B71] leading-relaxed text-justify">"Proveemos la mejor experiencia a los empresarios de la micro y pequeña empresa, sus familiares y sus empleados, acompañándolos en su desarrollo con productos y servicios financieros especializados e innovadores adaptados a sus necesidades".</p>
            </div>
            <div class="flex flex-col gap-2">
                <h2 class="text-4xl font-extrabold text-[#003B71]">Visión</h2>
                <p class="text-base text-[#003B71] leading-relaxed text-justify">"Ser el banco pionero de la revolución financiera digital para los empresarios de la micro y pequeña empresa; y que mejor comprende y sirve sus necesidades de desarrollo a través de un ecosistema de productos y servicios integrales e innovadores.".</p>
            </div>
            <div class="flex flex-col gap-2">
                <h2 class="text-4xl font-extrabold text-[#003B71]">Valores</h2>
                <p class="text-base text-[#003B71] leading-relaxed text-justify">"Cada día la cultura Integral se está fortaleciendo, todos los que pertenecemos a esta organización compartimos y vivimos los valores"</p>
                <ul class="list-none p-0 mt-2 flex flex-col gap-2">
                    ${bi}
                    <li class="flex items-start gap-2 text-base font-bold text-[#E97300] leading-relaxed">
                        <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#E97300] shrink-0"></span>
                        <span>Compromiso social</span>
                    </li>
                    <li class="flex items-start gap-2 text-base font-bold text-[#E97300] leading-relaxed">
                        <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#E97300] shrink-0"></span>
                        <span>Integridad</span>
                    </li>
                    <li class="flex items-start gap-2 text-base font-bold text-[#E97300] leading-relaxed">
                        <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#E97300] shrink-0"></span>
                        <span>Excelencia</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="w-full h-full flex items-stretch">
            <img src="${_("images/placeholder.svg")}" alt="Misión, Visión y Valores" class="w-full h-full object-cover rounded-xl">
        </div>
    </div>
</section>
${mi}`}],wt=function(){(function(){function t(i){if(!i||i.__pcInit)return;i.__pcInit=!0;var a=i.querySelector(".pc-carousel-wrap");if(!a)return;var r=!1,l=0,o=0,g=!1,f=0,d=0,c=0,s=null;a.querySelectorAll("img").forEach(function(h){h.setAttribute("draggable","false")}),setTimeout(function(){var h=a.scrollWidth-a.clientWidth;if(h<=0)return;var $=Math.min(60,h),B=null;function C(E){B||(B=E);var j=(E-B)/400;if(j<.5)a.scrollLeft=$*(j*2);else if(j<1)a.scrollLeft=$*(1-(j-.5)*2);else{a.scrollLeft=0;return}requestAnimationFrame(C)}requestAnimationFrame(C)},400),a.scrollLeft=0;function u(){return a.scrollWidth-a.clientWidth}function m(h){return Math.max(0,Math.min(h,u()))}function p(){Math.abs(f)<.5||(f*=.92,a.scrollLeft=m(a.scrollLeft+f),s=requestAnimationFrame(p))}a.addEventListener("mousedown",function(h){h.button===0&&(s&&(cancelAnimationFrame(s),s=null),r=!0,g=!1,f=0,l=h.clientX,d=h.clientX,c=Date.now(),o=a.scrollLeft,a.style.cursor="grabbing",h.preventDefault())}),document.addEventListener("mousemove",function(h){if(r){var $=l-h.clientX;Math.abs($)>3&&(g=!0);var B=Date.now(),C=B-c||1;f=(h.clientX-d)/C*16*-1,d=h.clientX,c=B,a.scrollLeft=m(o+$)}}),document.addEventListener("mouseup",function(h){r&&(r=!1,a.style.cursor="grab",g&&(h.stopPropagation(),s=requestAnimationFrame(p)))}),a.addEventListener("click",function(h){g&&(h.preventDefault(),h.stopPropagation(),g=!1)},!0);var w=0,k=0,b=0,y=0,x=0;a.addEventListener("touchstart",function(h){s&&(cancelAnimationFrame(s),s=null),w=h.touches[0].clientX,b=h.touches[0].clientX,y=Date.now(),k=a.scrollLeft,x=0},{passive:!0}),a.addEventListener("touchmove",function(h){var $=Date.now(),B=$-y||1,C=h.touches[0].clientX;x=(C-b)/B*16*-1,b=C,y=$;var E=w-C;a.scrollLeft=m(k+E)},{passive:!0}),a.addEventListener("touchend",function(){s=requestAnimationFrame(function h(){Math.abs(x)<.5||(x*=.92,a.scrollLeft=m(a.scrollLeft+x),s=requestAnimationFrame(h))})},{passive:!0})}function e(){document.querySelectorAll(".pc-section").forEach(function(i){delete i.__pcInit,t(i)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()},yi=`(${wt.toString()})();`,vi=`
.pc-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.pc-carousel-wrap{overflow-x:scroll;width:100%;cursor:grab;scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}
.pc-carousel-wrap::-webkit-scrollbar{display:none;}
.pc-track{display:flex;gap:1.5rem;user-select:none;}
.pc-card{flex:0 0 260px;display:flex;flex-direction:column;align-items:center;gap:1rem;background:#ffffff;border:2px solid #003B71;border-radius:1rem;padding:1.25rem;box-sizing:border-box;}
.pc-card-img-wrap{width:100%;aspect-ratio:1/1;border-radius:0.75rem;overflow:hidden;background:#dce8f5;}
.pc-card-img{width:100%;height:100%;object-fit:cover;display:block;}
.pc-card-body{display:flex;flex-direction:column;align-items:center;gap:0.4rem;text-align:center;flex:1;}
.pc-card-title{font-size:0.95rem;font-weight:700;color:#003B71;text-transform:uppercase;}
.pc-card-desc{font-size:0.9rem;color:#003B71;line-height:1.5;text-align:center;}
.pc-btn{display:block;width:100%;padding:0.5rem 1rem;border-radius:9999px;background:#003B71;color:#ffffff;font-size:0.95rem;font-weight:600;text-align:center;text-decoration:none;transition:background .2s;}
.pc-btn:hover{background:#002a52;}
.pc-more-wrap{display:flex;justify-content:center;margin-top:2rem;}
.pc-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:9999px;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background .2s;}
.pc-more-btn:hover{background:#c96200;}
.pc-section-heading{font-size:2.25rem;font-weight:800;color:#003B71;margin:0 0 0.75rem;text-align:center;}
.pc-section-subheading{font-size:1rem;color:#003B71;margin:0;text-align:center;}
@media(max-width:1280px){.pc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.pc-section{padding:2.5rem 1.5rem;}.pc-card{flex:0 0 220px;}}
@media(max-width:480px){.pc-card{flex:0 0 80vw;}}`;function wi(t){const e=t.img||_("images/placeholder.svg"),i=t.title||"TÍTULO DEL PRODUCTO",a=t.desc||"Descripción breve del producto financiero.",r=t.href||"#",l=t.btn_label||"Solicitar";return`<div class="pc-card"><div class="pc-card-img-wrap"><img src="${e}" alt="${i}" class="pc-card-img"></div><div class="pc-card-body"><h3 class="pc-card-title">${i}</h3><p class="pc-card-desc">${a}</p></div><a href="${r}" class="pc-btn">${l}</a></div>`}function kt(t){const e=t.heading||"Créditos",i=t.subheading||"Opciones de financiamiento diseñadas para hacer realidad tus proyectos.",a=t.more_href||"#",r=t.more_label||"Ver más",l=t.show_more!==!1,g=(t.cards||[]).map(wi).join(""),f=l?`<div class="pc-more-wrap"><a href="${a}" class="pc-more-btn">${r}</a></div>`:"";return`<section class="pc-section"><style>${vi}</style><div style="text-align:center;margin-bottom:2rem;"><h2 class="pc-section-heading">${e}</h2><p class="pc-section-subheading">${i}</p></div><div class="pc-carousel-wrap"><div class="pc-track">${g}</div></div>${f}</section>`}const H={heading:"Créditos",subheading:"Opciones de financiamiento diseñadas para hacer realidad tus proyectos.",more_href:"#",more_label:"Ver más",cards:[{img:"",title:"CREDINVIERTE",desc:"Adquiere activos fijos",href:"#",btn_label:"Solicitar"},{img:"",title:"SOLUCIONES INTEGRALES",desc:"Financiamiento PYME",href:"#",btn_label:"Solicitar"},{img:"",title:"CREDI-CONFIAMOS",desc:"Rápido y sin fiador",href:"#",btn_label:"Solicitar"},{img:"",title:"CREDILÍNEA",desc:"Línea rotativa",href:"#",btn_label:"Solicitar"}]};function ki(t,e){const i=document.getElementById("pc-config-modal");if(i&&i.remove(),!document.getElementById("pc-modal-styles")){const d=document.createElement("style");d.id="pc-modal-styles",d.textContent=`
            .pc-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .pc-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .pc-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .pc-modal-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
            .pc-modal-header h2 i{color:#003B71;}
            .pc-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
            .pc-modal-close:hover{background:#f1f5f9;color:#475569;}
            .pc-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
            .pc-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
            .pc-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .pc-tab-btn i{font-size:1rem;}
            .pc-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .pc-modal-body::-webkit-scrollbar{width:5px;}
            .pc-modal-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
            .pc-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .pc-tab-panel.active{display:flex;}
            .pc-card-config{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .pc-card-config-header{display:flex;align-items:center;gap:0.5rem;}
            .pc-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
            .pc-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .pc-input:focus{border-color:#003B71;}
            .pc-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;box-sizing:border-box;width:100%;}
            .pc-row{display:flex;gap:0.75rem;align-items:flex-start;}
            .pc-img-preview{width:64px;height:64px;border-radius:0.5rem;object-fit:cover;border:1px solid #e2e8f0;background:#f1f5f9;flex-shrink:0;}
            .pc-img-placeholder{width:64px;height:64px;border-radius:0.5rem;background:#f1f5f9;border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
            .pc-img-placeholder i{font-size:1.5rem;color:#94a3b8;}
            .pc-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:9999px;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .pc-pick-btn:hover{background:#002a52;}
            .pc-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;display:flex;align-items:center;border-radius:0.25rem;transition:background 0.15s;}
            .pc-btn-remove:hover{background:#fef2f2;}
            .pc-btn-add{padding:0.5rem 1.25rem;border:none;border-radius:9999px;color:#fff;font-size:0.8125rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;background:#003B71;}
            .pc-btn-add:hover{background:#002a52;}
            .pc-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .pc-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;}
            .pc-btn-cancel:hover{background:#f8fafc;}
            .pc-btn-save{padding:0.5rem 1.25rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .pc-btn-save:hover{background:#c96200;}
            .pc-toggle-wrap{display:flex;align-items:center;gap:0.75rem;}
            .pc-toggle{position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;}
            .pc-toggle input{opacity:0;width:0;height:0;}
            .pc-toggle-slider{position:absolute;inset:0;background:#cbd5e1;border-radius:9999px;transition:background 0.2s;cursor:pointer;}
            .pc-toggle-slider:before{content:'';position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:transform 0.2s;}
            .pc-toggle input:checked+.pc-toggle-slider{background:#003B71;}
            .pc-toggle input:checked+.pc-toggle-slider:before{transform:translateX(18px);}
            .pc-section-title{font-size:0.75rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0;border-bottom:1px solid #e2e8f0;margin-bottom:0.75rem;}
            .pc-card-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
            .pc-config-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .pc-toggle-wrap{display:flex;align-items:center;gap:0.75rem;}
            .pc-toggle{position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;}
            .pc-toggle input{opacity:0;width:0;height:0;}
            .pc-toggle-slider{position:absolute;inset:0;background:#cbd5e1;border-radius:9999px;transition:background 0.2s;cursor:pointer;}
            .pc-toggle-slider:before{content:'';position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:transform 0.2s;}
            .pc-toggle input:checked+.pc-toggle-slider{background:#003B71;}
            .pc-toggle input:checked+.pc-toggle-slider:before{transform:translateX(18px);}
        `,document.head.appendChild(d)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-product-cards-config"]||"{}")}catch{return{}}})(),r={heading:a.heading??H.heading,subheading:a.subheading??H.subheading,more_href:a.more_href??H.more_href,more_label:a.more_label??H.more_label,show_more:a.show_more??!0,cards:JSON.parse(JSON.stringify(a.cards??H.cards))},l=document.createElement("div");l.id="pc-config-modal",l.className="pc-overlay";const o=document.createElement("div");o.className="pc-modal",o.innerHTML=`
        <div class="pc-modal-header">
            <h2><i class="ri-layout-grid-line"></i> Configurar Sección de Productos</h2>
            <button id="pc-modal-close" class="pc-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="pc-modal-tabs">
            <button class="pc-tab-btn active" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
            <button class="pc-tab-btn" data-tab="cards"><i class="ri-bank-card-line"></i> Tarjetas</button>
        </div>
        <div class="pc-modal-body">
            <div class="pc-tab-panel active" id="pc-panel-general">
                <div class="pc-config-card">
                    <div class="pc-section-title">Encabezado</div>
                    <div>
                        <label class="pc-label">Título principal</label>
                        <input id="pc-heading" type="text" class="pc-input" value="${r.heading}">
                    </div>
                    <div>
                        <label class="pc-label">Subtítulo</label>
                        <input id="pc-subheading" type="text" class="pc-input" value="${r.subheading}">
                    </div>
                </div>
                <div class="pc-config-card">
                    <div class="pc-section-title">Botón Ver más</div>
                    <div class="pc-toggle-wrap">
                        <label class="pc-toggle">
                            <input type="checkbox" id="pc-show-more" ${r.show_more?"checked":""}>
                            <span class="pc-toggle-slider"></span>
                        </label>
                        <span style="font-size:0.875rem;color:#475569;">Mostrar botón Ver más</span>
                    </div>
                    <div id="pc-more-fields" style="${r.show_more?"":"display:none;"}display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="pc-label">Texto del botón</label>
                            <input id="pc-more-label" type="text" class="pc-input" value="${r.more_label}">
                        </div>
                        <div>
                            <label class="pc-label">URL</label>
                            <input id="pc-more-href" type="text" class="pc-input" value="${r.more_href}">
                        </div>
                    </div>
                </div>
            </div>
            <div class="pc-tab-panel" id="pc-panel-cards">
                <div id="pc-cards-list" style="display:flex;flex-direction:column;gap:0.75rem;"></div>
                <button id="pc-add-card" class="pc-btn-add" style="align-self:flex-start;margin-top:0.25rem;">
                    <i class="ri-add-line"></i> Agregar tarjeta
                </button>
            </div>
        </div>
        <div class="pc-modal-footer">
            <button id="pc-modal-cancel" class="pc-btn-cancel">Cancelar</button>
            <button id="pc-modal-save" class="pc-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`,l.appendChild(o),document.body.appendChild(l),o.querySelectorAll(".pc-tab-btn").forEach(d=>{d.addEventListener("click",()=>{o.querySelectorAll(".pc-tab-btn").forEach(c=>c.classList.remove("active")),o.querySelectorAll(".pc-tab-panel").forEach(c=>c.classList.remove("active")),d.classList.add("active"),o.querySelector(`#pc-panel-${d.dataset.tab}`).classList.add("active")})}),o.querySelector("#pc-show-more").addEventListener("change",function(){r.show_more=this.checked,o.querySelector("#pc-more-fields").style.display=this.checked?"flex":"none"});function g(){const d=o.querySelector("#pc-cards-list");d.innerHTML="",r.cards.forEach((c,s)=>{const u=document.createElement("div");u.className="pc-card-config";const m=c.img?`<img class="pc-img-preview" src="${c.img}" alt="">`:'<div class="pc-img-placeholder"><i class="ri-image-line"></i></div>';u.innerHTML=`
                <div class="pc-card-config-header">
                    <span class="pc-card-num">${s+1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${s+1}</span>
                    <button class="pc-btn-remove pc-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="pc-row">
                    <div id="pc-img-wrap-${s}">${m}</div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                        <input class="pc-input-sm" placeholder="URL de la imagen" value="${c.img||""}" data-field="img">
                        <button class="pc-pick-btn pc-pick-img"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="pc-label">Título</label>
                    <input class="pc-input" placeholder="TÍTULO DEL PRODUCTO" value="${c.title||""}" data-field="title">
                </div>
                <div>
                    <label class="pc-label">Descripción</label>
                    <input class="pc-input" placeholder="Descripción breve" value="${c.desc||""}" data-field="desc">
                </div>
                <div class="pc-row">
                    <div style="flex:1;">
                        <label class="pc-label">URL del botón</label>
                        <input class="pc-input" placeholder="#" value="${c.href||"#"}" data-field="href">
                    </div>
                    <div style="flex:1;">
                        <label class="pc-label">Texto del botón</label>
                        <input class="pc-input" placeholder="Solicitar" value="${c.btn_label||"Solicitar"}" data-field="btn_label">
                    </div>
                </div>`,u.querySelectorAll("[data-field]").forEach(p=>{p.addEventListener("input",()=>{if(c[p.dataset.field]=p.value,p.dataset.field==="img"){const w=u.querySelector(`#pc-img-wrap-${s}`);w.innerHTML=p.value?`<img class="pc-img-preview" src="${p.value}" alt="">`:'<div class="pc-img-placeholder"><i class="ri-image-line"></i></div>'}})}),u.querySelector(".pc-pick-img").addEventListener("click",()=>{Le({type:"image",title:"Seleccionar imagen de tarjeta",onSelect:p=>{c.img=p,u.querySelector("[data-field='img']").value=p,u.querySelector(`#pc-img-wrap-${s}`).innerHTML=`<img class="pc-img-preview" src="${p}" alt="">`}})}),u.querySelector(".pc-remove-card").addEventListener("click",()=>{r.cards.splice(s,1),g()}),d.appendChild(u)})}g(),o.querySelector("#pc-add-card").addEventListener("click",()=>{r.cards.push({img:"",title:"NUEVO PRODUCTO",desc:"Descripción del producto.",href:"#",btn_label:"Solicitar"}),g(),o.querySelector("#pc-cards-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})});const f=()=>l.remove();o.querySelector("#pc-modal-close").addEventListener("click",f),o.querySelector("#pc-modal-cancel").addEventListener("click",f),l.addEventListener("click",d=>{d.target===l&&f()}),o.querySelector("#pc-modal-save").addEventListener("click",()=>{r.heading=o.querySelector("#pc-heading").value.trim()||H.heading,r.subheading=o.querySelector("#pc-subheading").value.trim()||H.subheading,r.show_more=o.querySelector("#pc-show-more").checked,r.more_label=o.querySelector("#pc-more-label").value.trim()||H.more_label,r.more_href=o.querySelector("#pc-more-href").value.trim()||"#",e.addAttributes({"data-product-cards-config":JSON.stringify(r)}),e.components(kt(r)),setTimeout(()=>we(t),300),f()})}function we(t){try{const e=t.Canvas.getFrameEl()?.contentDocument;if(!e)return;const i=e.getElementById("pc-runtime-script");i&&i.remove(),e.querySelectorAll(".pc-section").forEach(r=>{delete r.__pcInit});const a=e.createElement("script");a.id="pc-runtime-script",a.textContent=yi,e.head.appendChild(a)}catch(e){console.warn("[ProductCards] Error reiniciando carrusel:",e)}}const Bi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;function Ei(t){const e="product-cards-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección de Productos",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-product-cards-config":JSON.stringify(H)},components:kt(H),script:wt,"script-props":["data-product-cards-config"],traits:[{type:"button",label:"Productos",text:"Administrar Sección",full:!0,command:"open-product-cards-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-product-cards-config",{run(i){const a=i.getSelected();a&&ki(i,a)}}),t.BlockManager.add("product-cards-block",{label:"Sección de productos",category:"Productos y Servicios",media:Bi,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),t.on("component:mount",i=>{i.getEl()?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>we(t),400))}),t.on("component:selected",i=>{const a=i.getEl();if(!a)return;const r=a.closest(`[data-gjs-type="${e}"]`);if(r&&!a.hasAttribute("data-gjs-type")){const o=t.getWrapper().find(`[data-gjs-type="${e}"]`).find(g=>g.getEl()===r);o&&setTimeout(()=>t.select(o),0)}}),t.on("canvas:render",()=>{setTimeout(()=>we(t),600)}),t.on("storage:end:load",()=>{setTimeout(()=>we(t),800)})}const $i=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ue=`
<div class="flex flex-col gap-5 rounded-2xl p-8 dc-bg-primary">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold text-white">Lorem ipsum dolor</h3>
        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-outline w-full py-2 px-8 rounded-lg bg-white dc-text-primary text-base font-semibold text-center">Lorem ipsum</a>
</div>`,Ve=`
<div class="flex flex-col gap-5 rounded-2xl p-8 bg-white border border-gray-200">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center dc-bg-light">
        <i class="ri-bank-line text-2xl dc-text-primary"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold dc-text-primary">Lorem ipsum dolor</h3>
        <p class="text-base dc-text-primary leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-solid w-full py-2 px-8 rounded-lg dc-bg-primary text-white text-base font-semibold text-center">Lorem ipsum</a>
</div>`,_e=`
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
</style>`,Si=[{id:"dual-card-section",label:"Sección dos tarjetas",category:"Productos y Servicios",media:$i,content:`
<section class="dc-section">
    <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-[#003B71] mb-3">Lorem ipsum dolor sit amet</h2>
        <p class="text-base text-[#003B71]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="dc-grid">
        ${Ue}
        ${Ve}
    </div>
</section>
${_e}`},{id:"dual-card-dark",label:"Tarjeta azul oscuro",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="#003B71" rx="2"/>
            <rect x="5" y="5" width="6" height="6" fill="rgba(255,255,255,0.2)" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="white" fill-opacity="0.9"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="white"/>
        </svg>`,content:`${Ue}${_e}`},{id:"dual-card-light",label:"Tarjeta blanca",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="white" rx="2" stroke="#003B71" stroke-width="0.5" stroke-opacity="0.3"/>
            <rect x="5" y="5" width="6" height="6" fill="#dce8f5" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.8"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="#003B71"/>
        </svg>`,content:`${Ve}${_e}`}],Ci=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="white" rx="2" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="8" y="7" width="16" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="11" width="12" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="11" y="13.5" width="10" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="6" y="18" width="9" height="5" rx="1.5" fill="#E97300"/>
    <rect x="17" y="18" width="9" height="5" rx="1.5" fill="white" stroke="#e5e7eb" stroke-width="0.8"/>
</svg>`,Li=`
<style>
.cta-section{width:100%;background:#ffffff;padding:3rem 4rem;display:flex;flex-direction:column;align-items:center;gap:2rem;}
.cta-img-wrap{width:100%;max-width:600px;border-radius:1rem;overflow:hidden;aspect-ratio:16/9;}
.cta-img-wrap img{width:100%;height:100%;display:block;object-fit:cover;}
.cta-content{display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.25rem;width:100%;max-width:640px;}
.cta-btn-primary{display:inline-block;padding:0.75rem 2.5rem;border-radius:9999px;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background .2s;}
.cta-btn-primary:hover{background:#c96200;}
.cta-btn-secondary{display:inline-block;padding:0.75rem 2.5rem;border-radius:9999px;background:#ffffff;color:#E97300;font-size:1rem;font-weight:600;text-decoration:none;border:2px solid #e5e7eb;transition:background .2s,color .2s,border-color .2s;}
.cta-btn-secondary:hover{background:#E97300;color:#ffffff;border-color:#E97300;}
@media(max-width:1280px){.cta-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.cta-section{padding:2.5rem 1.5rem;}}
@media(max-width:580px){
    .cta-section{padding:2rem 1rem;}
    .cta-btn-primary,.cta-btn-secondary{width:100%;text-align:center;box-sizing:border-box;}
}
</style>`,ji=[{id:"cta-section",label:"Llamada a la acción",category:"Llamadas a la acción",media:Ci,content:`
<section class="cta-section">
    <div class="cta-img-wrap">
        <img src="${_("images/placeholder.svg")}" alt="Imagen CTA">
    </div>
    <div class="cta-content">
        <h2 class="text-4xl font-bold text-[#E97300] leading-tight">Únete a la Familia Banco Integral</h2>
        <p class="text-base text-[#003B71] leading-relaxed">Miles de clientes confían en nosotros. Descubre cómo podemos ayudarte a alcanzar tus metas financieras.</p>
        <div class="flex flex-wrap gap-4 justify-center w-full">
            <a href="#" class="cta-btn-primary">Abrir Cuenta Hoy</a>
            <a href="#" class="cta-btn-secondary">Solicitar Información</a>
        </div>
    </div>
</section>
${Li}`}],he=`
<style>
.dd-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.dd-stripe{width:100%;height:3px;background:#E97300;margin:1.25rem 0 1.5rem;}
.dd-list{display:flex;flex-direction:column;gap:1rem;}
.dd-btn{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;background:#ffffff;border-radius:0.75rem;box-shadow:0 4px 16px rgba(0,0,0,0.08);padding:1rem 1.5rem;text-decoration:none;box-sizing:border-box;transition:box-shadow 0.2s ease;}
.dd-btn:hover{box-shadow:0 6px 22px rgba(0,0,0,0.14);}
.dd-btn-left{display:flex;align-items:center;gap:0.75rem;min-width:0;flex:1;}
.dd-btn-icon-file{font-size:1.5rem;color:#E97300;flex-shrink:0;}
.dd-btn-label{font-size:0.9375rem;font-weight:600;color:#E97300;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;outline:none;}
.dd-btn-download{display:flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border-radius:9999px;background:#E97300;color:#ffffff;flex-shrink:0;}
.dd-btn-download i{font-size:1.25rem;}
.dd-acc-list{display:flex;flex-direction:column;gap:1rem;}
.dd-acc-item{width:100%;}
.dd-acc-header{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;cursor:pointer;box-sizing:border-box;}
.dd-acc-title{font-size:1.125rem;font-weight:700;color:#003B71;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;outline:none;flex:1;min-width:0;}
.dd-acc-arrow{font-size:1.5rem;color:#003B71;flex-shrink:0;}
.dd-acc-stripe{width:100%;height:3px;background:#E97300;margin-top:1rem;}
.dd-acc-body{display:none;flex-direction:column;gap:1rem;padding-top:1rem;}
.dd-acc-item.dd-acc-open .dd-acc-body{display:flex;}
@media(max-width:1280px){.dd-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.dd-section{padding:2.5rem 1.5rem;}.dd-btn{padding:0.875rem 1.125rem;}.dd-acc-title{font-size:1rem;}}
@media(max-width:640px){.dd-btn-label{white-space:normal;}.dd-acc-title{white-space:normal;}}
</style>`,Ti=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="9" width="28" height="1.5" rx="0.75" fill="#E97300"/>
    <rect x="2" y="13" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
    <rect x="4.5" y="15" width="3" height="4" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.7"/>
    <rect x="9.5" y="15.5" width="10" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="27" cy="16" r="2" fill="#E97300"/>
    <rect x="2" y="21" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.6"/>
    <rect x="4.5" y="23" width="3" height="4" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.7"/>
    <rect x="9.5" y="23.5" width="10" height="1" rx="0.5" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="27" cy="24" r="2" fill="#E97300"/>
</svg>`,_i=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="12" width="28" height="8" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.7"/>
    <rect x="5" y="14.5" width="3.5" height="4.5" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.8"/>
    <rect x="11" y="15" width="12" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.75"/>
    <circle cx="26.5" cy="16" r="2.2" fill="#E97300"/>
</svg>`,Ai=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="9" width="28" height="1.5" rx="0.75" fill="#E97300"/>
    <rect x="2" y="13" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.7"/>
    <rect x="4.5" y="14.7" width="3" height="3.6" rx="0.4" fill="none" stroke="#003B71" stroke-width="0.7"/>
    <rect x="9.5" y="15.4" width="12" height="1" rx="0.5" fill="#003B71" fill-opacity="0.7"/>
    <path d="M26 15l1.5 1.5L26 18" fill="none" stroke="#003B71" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="2" y="21" width="28" height="6" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.7"/>
    <rect x="4.5" y="22.7" width="3" height="3.6" rx="0.4" fill="none" stroke="#003B71" stroke-width="0.7"/>
    <rect x="9.5" y="23.4" width="12" height="1" rx="0.5" fill="#003B71" fill-opacity="0.7"/>
    <path d="M25.2 22.7l1.6 1.3-1.6 1.3" fill="none" stroke="#003B71" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,zi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="12" width="28" height="8" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.8"/>
    <rect x="5" y="14.3" width="3.5" height="4.4" rx="0.5" fill="none" stroke="#003B71" stroke-width="0.8"/>
    <rect x="11" y="15.2" width="13" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.8"/>
    <path d="M25 15l1.8 1.8L25 18.6" fill="none" stroke="#003B71" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;function ke(t){return`<a href="#" class="dd-btn" data-gjs-type="doc-download-button">
        <span class="dd-btn-left" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <i class="ri-article-line dd-btn-icon-file" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
            <span class="dd-btn-label" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">${t}</span>
        </span>
        <span class="dd-btn-download" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <i class="ri-download-fill"></i>
        </span>
    </a>`}function Ae(t,e){return`<div class="dd-acc-item${e?" dd-acc-open":""}" data-gjs-type="doc-accordion-item">
        <div class="dd-acc-header" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <span class="dd-acc-title" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">${t}</span>
            <i class="${e?"ri-arrow-down-s-line":"ri-arrow-right-s-line"} dd-acc-arrow" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
        </div>
        <div class="dd-acc-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
        <div class="dd-acc-body" data-gjs-droppable="true">
            ${ke("Nombre_del_documento.pdf")}
        </div>
    </div>`}function Ii(){return function(){const t=this;if(t.__ddAccBound)return;t.__ddAccBound=!0;const e=t.querySelector(".dd-acc-header"),i=t.querySelector(".dd-acc-arrow");!e||!i||e.addEventListener("click",a=>{if(a.target.closest("a"))return;const r=t.classList.toggle("dd-acc-open");i.classList.toggle("ri-arrow-down-s-line",r),i.classList.toggle("ri-arrow-right-s-line",!r)})}}const qi=[{id:"document-download-section",label:"Sección de Documentos Descargables",category:"Documentos",media:Ti,content:`
<section class="dd-section">
    <h2 class="text-4xl font-extrabold text-[#003B71]" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Titulo principal</h2>
    <div class="dd-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
    <div class="dd-list" data-gjs-droppable="true">
        ${ke("Nombre_del_documento.pdf")}
        ${ke("Nombre_del_documento.pdf")}
    </div>
</section>
${he}`},{id:"document-download-button",label:"Botón de Documento",category:"Documentos",media:_i,content:`${ke("Nombre_del_documento.pdf")}${he}`},{id:"document-accordion-section",label:"Sección de Documentos con Acordeón",category:"Documentos",media:Ai,content:`
<section class="dd-section">
    <h2 class="text-4xl font-extrabold text-[#003B71]" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Titulo principal</h2>
    <div class="dd-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
    <div class="dd-acc-list" data-gjs-droppable="true">
        ${Ae("Nombre de la sección",!0)}
        ${Ae("Nombre de la sección",!1)}
    </div>
</section>
${he}`},{id:"document-accordion-item",label:"Ítem de Acordeón",category:"Documentos",media:zi,content:`${Ae("Nombre de la sección",!1)}${he}`}];function Di(t){const e="doc-download-button",i="doc-accordion-item";t.DomComponents.addType(e,{isComponent:a=>a.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Botón de Documento",tagName:"a",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,class:"dd-btn",href:"#"},components:`
                    <span class="dd-btn-left" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                        <i class="ri-article-line dd-btn-icon-file" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
                        <span class="dd-btn-label" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Nombre_del_documento.pdf</span>
                    </span>
                    <span class="dd-btn-download" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                        <i class="ri-download-fill"></i>
                    </span>
                `,traits:[{type:"text",name:"href",label:"Enlace (URL)"},{type:"checkbox",name:"target",label:"Abrir en nueva pestaña",valueTrue:"_blank",valueFalse:""},{type:"button",label:"Documento",text:"Seleccionar documento",full:!0,command:"select-doc-download-file"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.DomComponents.addType(i,{isComponent:a=>a.getAttribute?.("data-gjs-type")===i?{type:i}:!1,model:{defaults:{name:"Ítem de Acordeón",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":i,class:"dd-acc-item"},components:`
                    <div class="dd-acc-header" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                        <span class="dd-acc-title" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Nombre de la sección</span>
                        <i class="ri-arrow-right-s-line dd-acc-arrow" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
                    </div>
                    <div class="dd-acc-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div class="dd-acc-body" data-gjs-droppable="true">
                        <a href="#" class="dd-btn" data-gjs-type="doc-download-button">
                            <span class="dd-btn-left" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                                <i class="ri-article-line dd-btn-icon-file" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
                                <span class="dd-btn-label" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Nombre_del_documento.pdf</span>
                            </span>
                            <span class="dd-btn-download" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                                <i class="ri-download-fill"></i>
                            </span>
                        </a>
                    </div>
                `,script:Ii()},init(){this.set("type",i),this.addAttributes({"data-gjs-type":i})}}}),t.Commands.add("select-doc-download-file",{run(a){const r=a.getSelected();!r||r.get("type")!==e||Le({type:"document",title:"Seleccionar documento",onSelect:(l,o)=>{r.addAttributes({href:l});const g=r.find(".dd-btn-label")[0],f=o?.name||l.split("/").pop();g&&g.components(f)}})}}),Mi(t,i)}function Mi(t,e){t.on("storage:end:load",()=>{setTimeout(()=>Ye(t,e),800)}),t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},400))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();a&&(delete a.__ddAccBound,setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},400))}}),t.on("canvas:render",()=>{setTimeout(()=>Ye(t,e),600)})}function Ye(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})}const Bt=function(){(function(){function t(i){if(!i||i.__savInit)return;i.__savInit=!0;var a=i.querySelector(".sav-carousel-wrap");if(!a)return;a.scrollLeft=0;var r=!1,l=0,o=0,g=!1,f=0,d=0,c=0,s=null;a.querySelectorAll("img").forEach(function(h){h.setAttribute("draggable","false")}),setTimeout(function(){var h=a.scrollWidth-a.clientWidth;if(h<=0)return;var $=Math.min(60,h),B=null;function C(E){B||(B=E);var j=(E-B)/400;if(j<.5)a.scrollLeft=$*(j*2);else if(j<1)a.scrollLeft=$*(1-(j-.5)*2);else{a.scrollLeft=0;return}requestAnimationFrame(C)}requestAnimationFrame(C)},400);function u(){return a.scrollWidth-a.clientWidth}function m(h){return Math.max(0,Math.min(h,u()))}function p(){Math.abs(f)<.5||(f*=.92,a.scrollLeft=m(a.scrollLeft+f),s=requestAnimationFrame(p))}a.addEventListener("mousedown",function(h){h.button===0&&(s&&(cancelAnimationFrame(s),s=null),r=!0,g=!1,f=0,l=h.clientX,d=h.clientX,c=Date.now(),o=a.scrollLeft,a.style.cursor="grabbing",h.preventDefault())}),document.addEventListener("mousemove",function(h){if(r){var $=l-h.clientX;Math.abs($)>3&&(g=!0);var B=Date.now(),C=B-c||1;f=(h.clientX-d)/C*16*-1,d=h.clientX,c=B,a.scrollLeft=m(o+$)}}),document.addEventListener("mouseup",function(h){r&&(r=!1,a.style.cursor="grab",g&&(h.stopPropagation(),s=requestAnimationFrame(p)))}),a.addEventListener("click",function(h){g&&(h.preventDefault(),h.stopPropagation(),g=!1)},!0);var w=0,k=0,b=0,y=0,x=0;a.addEventListener("touchstart",function(h){s&&(cancelAnimationFrame(s),s=null),w=h.touches[0].clientX,b=h.touches[0].clientX,y=Date.now(),k=a.scrollLeft,x=0},{passive:!0}),a.addEventListener("touchmove",function(h){var $=Date.now(),B=$-y||1,C=h.touches[0].clientX;x=(C-b)/B*16*-1,b=C,y=$;var E=w-C;a.scrollLeft=m(k+E)},{passive:!0}),a.addEventListener("touchend",function(){s=requestAnimationFrame(function h(){Math.abs(x)<.5||(x*=.92,a.scrollLeft=m(a.scrollLeft+x),s=requestAnimationFrame(h))})},{passive:!0})}function e(){document.querySelectorAll(".sav-section").forEach(function(i){delete i.__savInit,t(i)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()},Ni=`(${Bt.toString()})();`,Pi=`
.sav-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.sav-heading{font-size:2.25rem;font-weight:800;color:#ffffff;margin:0;text-align:center;}
.sav-subheading{font-size:1rem;color:rgba(255,255,255,0.85);margin:0;text-align:center;}
.sav-blue-box{background:#003B71;border-radius:0.75rem;padding:2.5rem;position:relative;overflow:hidden;display:flex;flex-direction:column;gap:2rem;}
.sav-watermark{position:absolute;bottom:-32px;right:-32px;width:280px;height:280px;opacity:0.07;pointer-events:none;user-select:none;}
.sav-watermark img{width:100%;height:100%;object-fit:contain;}
.sav-carousel-wrap{overflow-x:scroll;width:100%;cursor:grab;scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;position:relative;z-index:1;}
.sav-carousel-wrap::-webkit-scrollbar{display:none;}
.sav-track{display:flex;gap:1.5rem;user-select:none;}
.sav-card{flex:0 0 240px;display:flex;flex-direction:column;align-items:center;gap:1rem;background:transparent;border:2px solid #ffffff;border-radius:1rem;padding:1.25rem;box-sizing:border-box;}
.sav-card-img-wrap{width:100%;aspect-ratio:1/1;border-radius:0.75rem;overflow:hidden;background:rgba(255,255,255,0.15);}
.sav-card-img{width:100%;height:100%;object-fit:cover;display:block;}
.sav-card-title{font-size:0.95rem;font-weight:700;color:#ffffff;text-transform:uppercase;text-align:center;}
.sav-card-desc{font-size:0.85rem;color:rgba(255,255,255,0.85);text-align:center;line-height:1.5;margin:0;}
.sav-btn{display:block;width:100%;padding:0.5rem 1rem;border-radius:9999px;background:#ffffff;color:#003B71;font-size:0.95rem;font-weight:600;text-align:center;text-decoration:none;transition:background .2s;margin-top:auto;}
.sav-btn:hover{background:#dce8f5;}
.sav-more-wrap{display:flex;justify-content:center;position:relative;z-index:1;}
.sav-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:9999px;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background .2s;}
.sav-more-btn:hover{background:#c96200;}
@media(max-width:1280px){.sav-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.sav-section{padding:2.5rem 1.5rem;}.sav-card{flex:0 0 200px;}.sav-blue-box{padding:1.5rem;}}
@media(max-width:480px){.sav-card{flex:0 0 75vw;}}`;function Ri(t){const e=t.img||_("images/placeholder.svg"),i=t.title||"TÍTULO DEL PRODUCTO",a=t.desc?`<p class="sav-card-desc">${t.desc}</p>`:"",r=t.href||"#",l=t.btn_label||"Solicitar";return`<div class="sav-card"><div class="sav-card-img-wrap"><img src="${e}" alt="${i}" class="sav-card-img"></div><h3 class="sav-card-title">${i}</h3>${a}<a href="${r}" class="sav-btn">${l}</a></div>`}function Et(t){const e=t.heading||"Depósitos y Cuentas de Ahorro",i=t.subheading||"Productos diseñados para hacer crecer tu dinero de forma segura.",a=t.more_href||"#",r=t.more_label||"Ver más",l=t.show_more!==!1,g=(t.cards||[]).map(Ri).join(""),f=_("images/brand-watermark.png"),d=l?`<div class="sav-more-wrap"><a href="${a}" class="sav-more-btn">${r}</a></div>`:"";return`<section class="sav-section"><style>${Pi}</style><div class="sav-blue-box"><div class="sav-watermark"><img src="${f}" alt=""></div><div style="display:flex;flex-direction:column;gap:0.5rem;text-align:center;position:relative;z-index:1;"><h2 class="sav-heading">${e}</h2><p class="sav-subheading">${i}</p></div><div class="sav-carousel-wrap"><div class="sav-track">${g}</div></div>${d}</div></section>`}const F={heading:"Depósitos y Cuentas de Ahorro",subheading:"Productos diseñados para hacer crecer tu dinero de forma segura.",more_href:"#",more_label:"Ver más",cards:[{img:"",title:"CUENTA DE AHORRO ESTÁNDAR",href:"#",btn_label:"Solicitar"},{img:"",title:"AHORRO RENTABLE",href:"#",btn_label:"Solicitar"},{img:"",title:"CUENTA DE AHORRO MÁS",href:"#",btn_label:"Solicitar"},{img:"",title:"DEPÓSITO DE PLAZO FIJO",href:"#",btn_label:"Solicitar"}]};function Oi(t,e){const i=document.getElementById("sav-config-modal");if(i&&i.remove(),!document.getElementById("sav-modal-styles")){const d=document.createElement("style");d.id="sav-modal-styles",d.textContent=`
            .sav-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .sav-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .sav-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .sav-modal-header h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;display:flex;align-items:center;gap:0.5rem;}
            .sav-modal-header h2 i{color:#003B71;}
            .sav-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;}
            .sav-modal-close:hover{background:#f1f5f9;color:#475569;}
            .sav-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;}
            .sav-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;}
            .sav-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .sav-tab-btn i{font-size:1rem;}
            .sav-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .sav-modal-body::-webkit-scrollbar{width:5px;}
            .sav-modal-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
            .sav-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .sav-tab-panel.active{display:flex;}
            .sav-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.375rem;}
            .sav-input{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .sav-input:focus{border-color:#003B71;}
            .sav-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;box-sizing:border-box;width:100%;}
            .sav-row{display:flex;gap:0.75rem;align-items:flex-start;}
            .sav-img-preview{width:64px;height:64px;border-radius:0.5rem;object-fit:cover;border:1px solid #e2e8f0;background:#f1f5f9;flex-shrink:0;}
            .sav-img-placeholder{width:64px;height:64px;border-radius:0.5rem;background:#f1f5f9;border:1px dashed #cbd5e1;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
            .sav-img-placeholder i{font-size:1.5rem;color:#94a3b8;}
            .sav-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:9999px;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .sav-pick-btn:hover{background:#002a52;}
            .sav-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;display:flex;align-items:center;border-radius:0.25rem;transition:background 0.15s;}
            .sav-btn-remove:hover{background:#fef2f2;}
            .sav-btn-add{padding:0.5rem 1.25rem;border:none;border-radius:9999px;color:#fff;font-size:0.8125rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;background:#003B71;}
            .sav-btn-add:hover{background:#002a52;}
            .sav-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .sav-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:9999px;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;}
            .sav-btn-cancel:hover{background:#f8fafc;}
            .sav-btn-save{padding:0.5rem 1.25rem;background:#E97300;border:none;border-radius:9999px;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .sav-btn-save:hover{background:#c96200;}
            .sav-section-title{font-size:0.75rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0;border-bottom:1px solid #e2e8f0;margin-bottom:0.75rem;}
            .sav-card-num{display:inline-flex;align-items:center;justify-content:center;width:1.5rem;height:1.5rem;border-radius:50%;background:#003B71;color:#fff;font-size:0.7rem;font-weight:700;flex-shrink:0;}
            .sav-config-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .sav-card-config{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;display:flex;flex-direction:column;gap:0.75rem;}
            .sav-card-config-header{display:flex;align-items:center;gap:0.5rem;}
            .sav-toggle-wrap{display:flex;align-items:center;gap:0.75rem;}
            .sav-toggle{position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;}
            .sav-toggle input{opacity:0;width:0;height:0;}
            .sav-toggle-slider{position:absolute;inset:0;background:#cbd5e1;border-radius:9999px;transition:background 0.2s;cursor:pointer;}
            .sav-toggle-slider:before{content:'';position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:transform 0.2s;}
            .sav-toggle input:checked+.sav-toggle-slider{background:#003B71;}
            .sav-toggle input:checked+.sav-toggle-slider:before{transform:translateX(18px);}
        `,document.head.appendChild(d)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-savings-config"]||"{}")}catch{return{}}})(),r={heading:a.heading??F.heading,subheading:a.subheading??F.subheading,more_href:a.more_href??F.more_href,more_label:a.more_label??F.more_label,show_more:a.show_more??!0,cards:JSON.parse(JSON.stringify(a.cards??F.cards))},l=document.createElement("div");l.id="sav-config-modal",l.className="sav-overlay";const o=document.createElement("div");o.className="sav-modal",o.innerHTML=`
        <div class="sav-modal-header">
            <h2><i class="ri-bank-line"></i> Configurar Sección de Productos</h2>
            <button id="sav-modal-close" class="sav-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="sav-modal-tabs">
            <button class="sav-tab-btn active" data-tab="general"><i class="ri-settings-3-line"></i> General</button>
            <button class="sav-tab-btn" data-tab="cards"><i class="ri-bank-card-line"></i> Tarjetas</button>
        </div>
        <div class="sav-modal-body">
            <div class="sav-tab-panel active" id="sav-panel-general">
                <div class="sav-config-card">
                    <div class="sav-section-title">Encabezado</div>
                    <div>
                        <label class="sav-label">Título principal</label>
                        <input id="sav-heading" type="text" class="sav-input" value="${r.heading}">
                    </div>
                    <div>
                        <label class="sav-label">Subtítulo</label>
                        <input id="sav-subheading" type="text" class="sav-input" value="${r.subheading}">
                    </div>
                </div>
                <div class="sav-config-card">
                    <div class="sav-section-title">Botón Ver más</div>
                    <div class="sav-toggle-wrap">
                        <label class="sav-toggle">
                            <input type="checkbox" id="sav-show-more" ${r.show_more?"checked":""}>
                            <span class="sav-toggle-slider"></span>
                        </label>
                        <span style="font-size:0.875rem;color:#475569;">Mostrar botón Ver más</span>
                    </div>
                    <div id="sav-more-fields" style="${r.show_more?"":"display:none;"}display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="sav-label">Texto del botón</label>
                            <input id="sav-more-label" type="text" class="sav-input" value="${r.more_label}">
                        </div>
                        <div>
                            <label class="sav-label">URL</label>
                            <input id="sav-more-href" type="text" class="sav-input" value="${r.more_href}">
                        </div>
                    </div>
                </div>
            </div>
            <div class="sav-tab-panel" id="sav-panel-cards">
                <div id="sav-cards-list" style="display:flex;flex-direction:column;gap:0.75rem;"></div>
                <button id="sav-add-card" class="sav-btn-add" style="align-self:flex-start;margin-top:0.25rem;">
                    <i class="ri-add-line"></i> Agregar tarjeta
                </button>
            </div>
        </div>
        <div class="sav-modal-footer">
            <button id="sav-modal-cancel" class="sav-btn-cancel">Cancelar</button>
            <button id="sav-modal-save" class="sav-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`,l.appendChild(o),document.body.appendChild(l),l.addEventListener("click",d=>{d.target===l&&f()}),o.querySelectorAll(".sav-tab-btn").forEach(d=>{d.addEventListener("click",()=>{o.querySelectorAll(".sav-tab-btn").forEach(c=>c.classList.remove("active")),o.querySelectorAll(".sav-tab-panel").forEach(c=>c.classList.remove("active")),d.classList.add("active"),o.querySelector(`#sav-panel-${d.dataset.tab}`).classList.add("active")})}),o.querySelector("#sav-show-more").addEventListener("change",function(){r.show_more=this.checked,o.querySelector("#sav-more-fields").style.display=this.checked?"flex":"none"});function g(){const d=o.querySelector("#sav-cards-list");d.innerHTML="",r.cards.forEach((c,s)=>{const u=document.createElement("div");u.className="sav-card-config";const m=c.img?`<img class="sav-img-preview" src="${c.img}" alt="">`:'<div class="sav-img-placeholder"><i class="ri-image-line"></i></div>';u.innerHTML=`
                <div class="sav-card-config-header">
                    <span class="sav-card-num">${s+1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${s+1}</span>
                    <button class="sav-btn-remove sav-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="sav-row">
                    <div id="sav-img-wrap-${s}">${m}</div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                        <input class="sav-input-sm" placeholder="URL de la imagen" value="${c.img||""}" data-field="img">
                        <button class="sav-pick-btn sav-pick-img"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="sav-label">Título</label>
                    <input class="sav-input" placeholder="TÍTULO DEL PRODUCTO" value="${c.title||""}" data-field="title">
                </div>
                <div>
                    <label class="sav-label">Descripción <span style="font-weight:400;text-transform:none;color:#94a3b8;">(opcional)</span></label>
                    <input class="sav-input" placeholder="Descripción breve del producto" value="${c.desc||""}" data-field="desc">
                </div>
                <div class="sav-row">
                    <div style="flex:1;">
                        <label class="sav-label">URL del botón</label>
                        <input class="sav-input" placeholder="#" value="${c.href||"#"}" data-field="href">
                    </div>
                    <div style="flex:1;">
                        <label class="sav-label">Texto del botón</label>
                        <input class="sav-input" placeholder="Solicitar" value="${c.btn_label||"Solicitar"}" data-field="btn_label">
                    </div>
                </div>`,u.querySelectorAll("[data-field]").forEach(p=>{p.addEventListener("input",()=>{if(c[p.dataset.field]=p.value,p.dataset.field==="img"){const w=u.querySelector(`#sav-img-wrap-${s}`);w.innerHTML=p.value?`<img class="sav-img-preview" src="${p.value}" alt="">`:'<div class="sav-img-placeholder"><i class="ri-image-line"></i></div>'}})}),u.querySelector(".sav-pick-img").addEventListener("click",()=>{Le({type:"image",title:"Seleccionar imagen de tarjeta",onSelect:p=>{c.img=p,u.querySelector("[data-field='img']").value=p,u.querySelector(`#sav-img-wrap-${s}`).innerHTML=`<img class="sav-img-preview" src="${p}" alt="">`}})}),u.querySelector(".sav-remove-card").addEventListener("click",()=>{r.cards.splice(s,1),g()}),d.appendChild(u)})}g(),o.querySelector("#sav-add-card").addEventListener("click",()=>{r.cards.push({img:"",title:"NUEVO PRODUCTO",desc:"",href:"#",btn_label:"Solicitar"}),g(),o.querySelector("#sav-cards-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})});const f=()=>l.remove();o.querySelector("#sav-modal-close").addEventListener("click",f),o.querySelector("#sav-modal-cancel").addEventListener("click",f),o.querySelector("#sav-modal-save").addEventListener("click",()=>{r.heading=o.querySelector("#sav-heading").value.trim()||F.heading,r.subheading=o.querySelector("#sav-subheading").value.trim()||F.subheading,r.show_more=o.querySelector("#sav-show-more").checked,r.more_label=o.querySelector("#sav-more-label").value.trim()||F.more_label,r.more_href=o.querySelector("#sav-more-href").value.trim()||"#",e.addAttributes({"data-savings-config":JSON.stringify(r)}),e.components(Et(r)),setTimeout(()=>Be(t),300),f()})}function Be(t){try{const e=t.Canvas.getFrameEl()?.contentDocument;if(!e)return;const i=e.getElementById("sav-runtime-script");i&&i.remove(),e.querySelectorAll(".sav-section").forEach(r=>{delete r.__savInit});const a=e.createElement("script");a.id="sav-runtime-script",a.textContent=Ni,e.head.appendChild(a)}catch(e){console.warn("[Savings] Error reiniciando carrusel:",e)}}const Hi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="5" width="28" height="22" fill="rgba(255,255,255,0.08)" rx="2"/>
    <rect x="4" y="8" width="6" height="6" fill="rgba(255,255,255,0.25)" rx="1"/>
    <rect x="12" y="8" width="6" height="6" fill="rgba(255,255,255,0.25)" rx="1"/>
    <rect x="20" y="8" width="6" height="6" fill="rgba(255,255,255,0.25)" rx="1"/>
    <rect x="4" y="16" width="6" height="1.5" fill="white" rx="0.75"/>
    <rect x="12" y="16" width="6" height="1.5" fill="white" rx="0.75"/>
    <rect x="20" y="16" width="6" height="1.5" fill="white" rx="0.75"/>
    <rect x="4" y="19" width="6" height="4" fill="#E97300" rx="1"/>
    <rect x="12" y="19" width="6" height="4" fill="#E97300" rx="1"/>
    <rect x="20" y="19" width="6" height="4" fill="#E97300" rx="1"/>
</svg>`;function Fi(t){const e="savings-section-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección Fondo Azul",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-savings-config":JSON.stringify(F)},components:Et(F),script:Bt,"script-props":["data-savings-config"],traits:[{type:"button",label:"Sección",text:"Administrar Sección",full:!0,command:"open-savings-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-savings-config",{run(i){const a=i.getSelected();a&&Oi(i,a)}}),t.BlockManager.add("savings-section-block",{label:"Sección Fondo Azul",category:"Productos y Servicios",media:Hi,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),t.on("component:mount",i=>{i.getEl()?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>Be(t),400))}),t.on("component:selected",i=>{const a=i.getEl();if(!a)return;const r=a.closest(`[data-gjs-type="${e}"]`);if(r&&!a.hasAttribute("data-gjs-type")){const l=t.getWrapper().find(`[data-gjs-type="${e}"]`).find(o=>o.getEl()===r);l&&setTimeout(()=>t.select(l),0)}}),t.on("canvas:render",()=>setTimeout(()=>Be(t),600)),t.on("storage:end:load",()=>setTimeout(()=>Be(t),800))}const Xe=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="2" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="2" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="2" y="12" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="17" y="12" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="2" y="22" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="22" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
</svg>`,Ui=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#F07C28" rx="2"/>
    <rect x="4" y="10" width="14" height="2.5" fill="white" rx="1"/>
    <rect x="4" y="15" width="10" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
    <ellipse cx="24" cy="20" rx="7" ry="9" fill="rgba(255,255,255,0.18)"/>
    <circle cx="22" cy="10" r="3.5" fill="rgba(255,255,255,0.25)"/>
</svg>`,Vi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="4" y="10" width="14" height="2.5" fill="white" rx="1"/>
    <rect x="4" y="15" width="10" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
    <ellipse cx="24" cy="20" rx="7" ry="9" fill="rgba(255,255,255,0.18)"/>
    <circle cx="22" cy="10" r="3.5" fill="rgba(255,255,255,0.25)"/>
</svg>`,te=`
<a href="#" class="plc-card plc-card--orange">
    <span class="plc-card__title">NOMBRE DEL PRODUCTO</span>
    <div class="plc-card__watermark">
        <img src="${_("images/brand-watermark.png")}" alt="">
    </div>
</a>`,ie=`
<a href="#" class="plc-card plc-card--blue">
    <span class="plc-card__title">NOMBRE DEL PRODUCTO</span>
    <div class="plc-card__watermark">
        <img src="${_("images/brand-watermark.png")}" alt="">
    </div>
</a>`,ze=`
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
</style>`,Yi=[{id:"product-link-cards",label:"Tarjetas de productos con enlace",category:"Productos y Servicios",media:Xe,content:`
<section class="plc-section">
    <div class="plc-header">
        <h2 class="plc-header__title">Nuestros Productos</h2>
        <p class="plc-header__subtitle">Encuentra el producto financiero ideal para ti.</p>
    </div>
    <div class="plc-grid">
        ${te}
        ${ie}
        ${te}
        ${ie}
        ${ie}
        ${te}
        ${ie}
        ${te}
    </div>
</section>
${ze}`},{id:"product-link-card-orange",label:"Tarjeta producto naranja",category:"Productos y Servicios",media:Xe,media:Ui,content:`${te}${ze}`},{id:"product-link-card-blue",label:"Tarjeta producto azul",category:"Productos y Servicios",media:Vi,content:`${ie}${ze}`}],Xi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="6" cy="11" r="4" fill="#E97300" fill-opacity="0.85"/>
    <circle cx="16" cy="11" r="4" fill="#E97300" fill-opacity="0.85"/>
    <circle cx="26" cy="11" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="4" y="10" width="4" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="14" y="10" width="4" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="24" y="10" width="4" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="3" y="18" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="13" y="18" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="23" y="18" width="6" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="21" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="21" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="24" y="21" width="4" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`,Gi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#E97300" fill-opacity="0.85"/>
    <rect x="13" y="10" width="6" height="4" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="10" y="21" width="12" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="11" y="24" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`,ae=`
<a href="#" class="flex flex-col items-center text-center gap-4 no-underline il-link-item">
    <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0 il-icon-badge">
        <img src="${_("images/placeholder.svg")}" alt="" class="w-8 h-8 object-contain">
    </div>
    <span class="text-base font-semibold leading-snug il-link-label transition-colors duration-200">Nombre del servicio</span>
</a>`,Ge=`
<style>
.il-section{width:100%;background:#ffffff;padding:3.5rem 4rem;}
.il-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
.il-icon-badge{background-color:#E97300;}
.il-link-label{color:#003B71;}
.il-link-item:hover .il-link-label{color:#E97300;}
@media(max-width:1280px){.il-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.il-section{padding:2.5rem 1.5rem;}.il-grid{grid-template-columns:repeat(2,1fr);gap:2rem;}}
@media(max-width:480px){.il-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem;}}
</style>`,Wi=[{id:"icon-links-strip",label:"Iconos con enlace",category:"Productos y Servicios",media:Xi,content:`
<section class="il-section">
    <div class="il-grid">
        ${ae}
        ${ae}
        ${ae}
        ${ae}
    </div>
</section>
${Ge}`},{id:"icon-link-item",label:"Icono con enlace",category:"Productos y Servicios",media:Gi,content:`${ae}${Ge}`}],Ji=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="28" height="8" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="7" cy="7" r="2.6" fill="#E97300"/>
    <rect x="12" y="5.2" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
    <rect x="12" y="8" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.35"/>
    <rect x="2" y="12" width="28" height="8" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="7" cy="16" r="2.6" fill="#E97300"/>
    <rect x="12" y="14.2" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
    <rect x="12" y="17" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.35"/>
    <rect x="2" y="21" width="28" height="8" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="7" cy="25" r="2.6" fill="#E97300"/>
    <rect x="12" y="23.2" width="14" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
    <rect x="12" y="26" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.35"/>
</svg>`,Ki=`
<style>
.ic-title{color:#003B71;}
.ic-text{color:#003B71;}
</style>`,Ie=(t,e)=>`
<div class="ic-card flex items-center gap-4 sm:gap-5 md:gap-7 bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8">
    <img src="${_("images/placeholder.svg")}" alt="Icono" class="ic-icon w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 object-contain">
    <div class="flex flex-col gap-1.5 md:gap-2">
        <h3 class="ic-title text-2xl font-bold leading-snug">${t}</h3>
        <p class="ic-text text-base leading-relaxed">${e}</p>
    </div>
</div>`,Zi=()=>`
<section class="ic-section w-full bg-white flex flex-col gap-4 md:gap-6 p-6 sm:p-8 md:p-12 lg:px-16">
    ${Ie("Título de la sección","Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.")}
    ${Ie("Título de la sección","Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.")}
    ${Ie("Título de la sección","Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.")}
</section>
${Ki}`,Qi=[{id:"icon-cards-block",label:"Tarjetas con ícono",category:"Contenido",media:Ji,content:Zi()}],ea=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="12" height="2" rx="1" fill="#E97300"/>
    <rect x="1" y="9" width="6" height="18" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="4" cy="14" r="2" fill="#E97300"/>
    <rect x="1.5" y="19" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="1.5" y="21.2" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="9" y="9" width="6" height="18" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="12" cy="14" r="2" fill="#E97300"/>
    <rect x="9.5" y="19" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="9.5" y="21.2" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="17" y="9" width="6" height="18" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="20" cy="14" r="2" fill="#E97300"/>
    <rect x="17.5" y="19" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="17.5" y="21.2" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="25" y="9" width="6" height="18" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4"/>
    <circle cx="28" cy="14" r="2" fill="#E97300"/>
    <rect x="25.5" y="19" width="5" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.5"/>
    <rect x="25.5" y="21.2" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`,ta=`
<style>
.asc-heading{color:#E97300;}
.asc-badge{background:#E97300;}
.asc-title{color:#003B71;}
.asc-text{color:#003B71;}
</style>`,re=(t,e)=>`
<div class="asc-card flex flex-col items-center text-center gap-3 bg-white rounded-2xl shadow-md p-6">
    <div class="asc-badge w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
        <img src="${_("images/placeholder.svg")}" alt="Icono" class="asc-icon w-8 h-8 object-contain">
    </div>
    <h3 class="asc-title text-base font-bold leading-snug">${t}</h3>
    <p class="asc-text text-base leading-relaxed">${e}</p>
</div>`,ia=()=>`
<section class="asc-section w-full bg-white flex flex-col gap-6 p-6 sm:p-8 md:p-12 lg:px-16">
    <p class="asc-heading text-base font-bold">Cuentas con asistencias de:</p>
    <div class="asc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        ${re("Título de la asistencia","Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.")}
        ${re("Título de la asistencia","Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.")}
        ${re("Título de la asistencia","Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.")}
        ${re("Título de la asistencia","Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.")}
        ${re("Título de la asistencia","Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.")}
    </div>
</section>
${ta}`,aa=[{id:"assistance-cards-block",label:"Tarjetas de asistencias",category:"Contenido",media:ea,content:ia()}],ra=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,la=`
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
</style>`,oa=[{id:"promo-cta",label:"Promo con CTA y precio",category:"Llamadas a la acción",media:ra,content:`
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
${la}`}],na=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="8" width="32" height="24" fill="#E97300" rx="0"/>
    <rect x="0" y="8" width="32" height="24" fill="#E97300"/>
    <path d="M0 8 Q0 2 8 2 L32 2 L32 8 Z" fill="#E97300"/>
    <rect x="2" y="10" width="12" height="18" fill="#003B71" fill-opacity="0.55" rx="1"/>
    <circle cx="8" cy="17" r="3" fill="#003B71" fill-opacity="0.8"/>
    <path d="M2 26 L6 21 L9 24 L11 22 L14 26 Z" fill="#003B71" fill-opacity="0.65"/>
    <rect x="16" y="10" width="14" height="3" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="16" y="15" width="14" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <rect x="16" y="17.5" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <circle cx="17.5" cy="22" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="20" y="21.3" width="8" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
    <circle cx="17.5" cy="25" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="20" y="24.3" width="6" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
</svg>`,sa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="8" width="32" height="24" fill="#E97300"/>
    <path d="M0 8 L24 8 Q32 8 32 2 L32 2 L0 2 Z" fill="#E97300"/>
    <rect x="18" y="10" width="12" height="18" fill="#003B71" fill-opacity="0.55" rx="1"/>
    <circle cx="24" cy="17" r="3" fill="#003B71" fill-opacity="0.8"/>
    <path d="M18 26 L22 21 L25 24 L27 22 L30 26 Z" fill="#003B71" fill-opacity="0.65"/>
    <rect x="2" y="10" width="14" height="3" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="2" y="15" width="14" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <rect x="2" y="17.5" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <circle cx="3.5" cy="22" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="6" y="21.3" width="8" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
    <circle cx="3.5" cy="25" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="6" y="24.3" width="6" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
</svg>`,me=`
<div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white">
        <i class="ri-shield-check-line text-lg text-[#E97300]"></i>
    </div>
    <p class="text-white text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`,We=`
<div class="flex flex-col gap-4">
    <h2 class="text-4xl font-bold leading-tight flex flex-wrap items-center gap-2">
        <span class="bg-[#003B71] text-white text-3xl font-bold px-3 py-1 rounded-lg leading-tight">Mi</span>
        <span class="text-[#003B71]">Banca</span>
        <span class="text-white font-bold">Integral</span>
    </h2>
    <p class="text-white text-base leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="fb-list-wrap flex flex-col gap-3">
        ${me}
        ${me}
        ${me}
        ${me}
    </div>
</div>`,Je=`
<div class="fb-col-image">
    <div class="fb-img-wrap">
        <img src="${_("images/placeholder.svg")}" alt="Imagen" class="fb-img">
    </div>
</div>`,ca=`
<style>
.fb-section-right{width:100%;background:#E97300;padding:3rem 4rem 3rem 4rem;border-radius:200px 0 0 0;}
.fb-section-left{width:100%;background:#E97300;padding:3rem 4rem 3rem 4rem;border-radius:0 200px 0 0;}
.fb-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.fb-col-image,.fb-col-content{min-width:0;}
.fb-img-wrap{width:100%;height:400px;border-radius:0.75rem;overflow:hidden;}
.fb-img{width:100%;height:100%;object-fit:cover;object-position:center center;display:block;}
@media(max-width:992px){
    .fb-section-right{padding:2.5rem 1.5rem;border-radius:110px 0 0 0;}
    .fb-section-left{padding:2.5rem 1.5rem;border-radius:0 110px 0 0;}
    .fb-grid{grid-template-columns:1fr;gap:2rem;}
    .fb-col-image{order:-1;}
    .fb-img-wrap{max-width:600px;height:280px;margin:0 auto;}
    .fb-col-content{align-items:center;text-align:center;}
    .fb-col-content h2{justify-content:center;}
    .fb-list-wrap{align-items:center;}
}
@media(max-width:580px){
    .fb-section-right{padding:2rem 1rem;border-radius:60px 0 0 0;}
    .fb-section-left{padding:2rem 1rem;border-radius:0 60px 0 0;}
    .fb-img-wrap{height:220px;}
}
</style>`,Ke=t=>{const e=t?"fb-section-right":"fb-section-left",i=t?`<div class="fb-col-content">${We}</div>${Je}`:`${Je}<div class="fb-col-content">${We}</div>`;return`
<section class="${e}">
    <div class="fb-grid">
        ${i}
    </div>
</section>
${ca}`},da=[{id:"feature-orange-img-right",label:"Sección naranja - imagen derecha",category:"Banners",media:sa,content:Ke(!0)},{id:"feature-orange-img-left",label:"Sección naranja - imagen izquierda",category:"Banners",media:na,content:Ke(!1)}],fa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="5" rx="1" fill="#003B71"/>
    <rect x="12" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="22" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="11" width="28" height="17" rx="2" fill="#003B71" fill-opacity="0.08" stroke="#003B71" stroke-width="1"/>
    <rect x="5" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="14" width="4" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`,Re=`
.tabs-btn{transition:background 0.2s,color 0.2s;}
.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}
.tabs-panel{display:none;}
.tabs-panel.active{display:grid;}
.tab-card:hover{background:#003B71;}
.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}
.tab-card:hover .tab-card-title{color:#ffffff;}
.tab-card:hover .tab-card-text{color:#ffffff;}`;function pa(){return function(){const t=this,e=".tabs-btn{transition:background 0.2s,color 0.2s;}.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}.tabs-panel{display:none;}.tabs-panel.active{display:grid;}.tab-card:hover{background:#003B71;}.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}.tab-card:hover .tab-card-title{color:#ffffff;}.tab-card:hover .tab-card-text{color:#ffffff;}";(function(){const r=t.ownerDocument??document;if(!r.getElementById("tabs-section-styles")){const l=r.createElement("style");l.id="tabs-section-styles",l.textContent=e,r.head.appendChild(l)}})();function i(a){t.querySelectorAll(".tabs-btn").forEach((r,l)=>{r.classList.toggle("active",l===a)}),t.querySelectorAll(".tabs-panel").forEach((r,l)=>{r.classList.toggle("active",l===a)})}t.querySelectorAll(".tabs-btn").forEach((a,r)=>{a.addEventListener("click",()=>i(r))}),i(0)}}const N=()=>`
<div class="tab-card flex flex-col items-center text-center p-8 border-2 border-[#003B71] rounded-2xl gap-4 cursor-pointer transition-all duration-200">
    <div class="tab-card-icon w-14 h-14 rounded-full border-2 border-[#003B71] flex items-center justify-center text-2xl text-[#003B71] shrink-0 transition-all duration-200">
        <i class="ri-lightbulb-line"></i>
    </div>
    <h3 class="tab-card-title text-lg font-bold text-[#003B71] transition-colors duration-200">Lorem ipsum</h3>
    <p class="tab-card-text text-base font-normal leading-relaxed text-[#003B71] transition-colors duration-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>`,le=t=>`
<div class="tabs-panel${t===0?" active":""} grid-cols-3 gap-5">
    ${N()}
    ${N()}
    ${N()}
    ${N()}
    ${N()}
    ${N()}
</div>`,ga=`
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
        ${le(0)}
        ${le(1)}
        ${le(2)}
        ${le(3)}
        ${le(4)}
    </div>
</div>
<style>${Re}</style>`,ha=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="none" stroke="#003B71" stroke-width="2"/>
    <circle cx="16" cy="10" r="4" fill="none" stroke="#003B71" stroke-width="1.5"/>
    <rect x="8" y="17" width="16" height="2" rx="1" fill="#003B71"/>
    <rect x="6" y="22" width="20" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,ma=[{id:"tabs-cards",label:"Sección con tabs",category:"Contenido",media:fa,content:{type:"tabs-cards-component"}},{id:"tab-card-single",label:"Tarjeta de tab",category:"Contenido",media:ha,content:`${N()}`}];function ba(t){const e="tabs-cards-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección con tabs",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,attributes:{"data-gjs-type":e,"data-tab-count":"5"},components:ga,script:pa(),traits:[{type:"number",name:"data-tab-count",label:"Número de tabs (2-10)",min:2,max:10,changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",(i,a)=>{const r=parseInt(a["data-tab-count"]);isNaN(r)||this.updateTabCount(r)})},updateTabCount(i){const a=Math.min(10,Math.max(2,i)),r=l=>{const o=Array.from({length:l},()=>'<button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>').join(`
`),g=Array.from({length:l},(f,d)=>`<div class="tabs-panel${d===0?" active":""} grid-cols-3 gap-5">
                            ${N()}
                            ${N()}
                            ${N()}
                            ${N()}
                            ${N()}
                            ${N()}
                        </div>`).join(`
`);return`
                    <div class="max-w-6xl mx-auto px-6 flex flex-col gap-8 py-16">
                        <div class="text-center flex flex-col gap-4 max-w-2xl mx-auto">
                            <h2 class="text-4xl font-bold leading-tight text-[#003B71]">Lorem ipsum dolor sit amet consectetur</h2>
                            <p class="text-base font-normal leading-relaxed text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <nav class="flex flex-wrap justify-center gap-2">${o}</nav>
                        <div class="tabs-body">${g}</div>
                    </div>
                    <style>${Re}</style>`};this.components(r(a)),setTimeout(()=>{const l=this.get("script"),o=this.getEl();l&&typeof l=="function"&&o&&l.call(o)},200)}}}),ua(t,e),xa(t,e)}function ua(t,e){t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},300))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();a&&setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},300)}}),t.on("storage:end:load",()=>{setTimeout(()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})},800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function xa(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#tabs-section-styles")){const r=document.createElement("style");r.id="tabs-section-styles",r.textContent=Re,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,a.appendChild(r)}}})}const ya=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,va=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,wa=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ka=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ze=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="7" cy="10" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="8.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <circle cx="7" cy="22" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="20.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
</svg>`,W=t=>`
<div class="split-list-item flex items-center gap-3">
    <div class="bg-[#E97300] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
        <i class="ri-shield-check-line text-lg text-white"></i>
    </div>
    <p class="${t==="light"?"text-[#003B71]":"text-white"} text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`,Ba=t=>{const e=t==="light";return`
<div class="flex flex-col gap-4">
    <h2 class="text-4xl font-bold leading-tight flex flex-wrap items-center gap-2">
        <span class="${e?"bg-[#003B71]":"bg-white"} ${e?"text-white":"text-[#003B71]"} text-3xl font-bold px-3 py-1 rounded-lg leading-tight">Mi</span>
        <span class="${e?"text-[#003B71]":"text-white"}">Banca</span>
        <span class="text-[#E97300]">Integral</span>
    </h2>
    <p class="${e?"text-[#003B71]":"text-white"} text-base leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-3">
        ${W(t)}
        ${W(t)}
        ${W(t)}
        ${W(t)}
    </div>
</div>`},Ea=()=>`
<div class="w-full rounded-2xl overflow-hidden">
    <img src="${_("images/placeholder.svg")}"
         alt="Imagen de sección"
         class="w-full object-cover block rounded-2xl"
         style="min-height:320px;max-height:480px;">
</div>`,$a=`
<style>
.split-section{width:100%;padding:3rem 4rem;}
.split-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.split-list-item{min-height:44px;}
@media(max-width:1280px){.split-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.split-section{padding:2.5rem 1.5rem;}.split-grid{grid-template-columns:1fr;gap:2rem;}}
</style>`,be=(t,e)=>{const i=Ba(e),a=Ea(),r=e==="dark"?"bg-[#003B71]":"bg-white",l=t?`<div>${i}</div><div>${a}</div>`:`<div class="split-img-mobile-first">${a}</div><div>${i}</div>`;return`
<section class="split-section ${r}">
    <div class="split-grid">
        ${l}
    </div>
</section>
${$a}`},Sa=[{id:"split-content-light-img-right",label:"Contenido claro - imagen derecha",category:"Contenido",media:ya,content:be(!0,"light")},{id:"split-content-light-img-left",label:"Contenido claro - imagen izquierda",category:"Contenido",media:va,content:be(!1,"light")},{id:"split-content-dark-img-right",label:"Contenido azul - imagen derecha",category:"Contenido",media:wa,content:be(!0,"dark")},{id:"split-content-dark-img-left",label:"Contenido azul - imagen izquierda",category:"Contenido",media:ka,content:be(!1,"dark")},{id:"split-list-item",label:"Item de lista con badge",category:"Contenido",media:Ze,content:W("light")},{id:"split-list-group",label:"Lista con badges",category:"Contenido",media:Ze,content:`
<div class="flex flex-col gap-4">
    ${W("light")}
    ${W("light")}
    ${W("light")}
</div>`}],Ca=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="0" y="6" width="10" height="22" fill="white"/>
    <path d="M10 6 Q10 6 16 6 L16 28 Q10 28 10 22 Z" fill="#E97300"/>
    <circle cx="22" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="22" cy="14" r="1.5" fill="white"/>
    <rect x="18" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,La=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="22" y="6" width="10" height="22" fill="white"/>
    <path d="M22 6 Q16 6 16 6 L16 28 Q22 28 22 22 Z" fill="#E97300"/>
    <circle cx="10" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="10" cy="14" r="1.5" fill="white"/>
    <rect x="6" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="7" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,ue=`
<div class="flex flex-col items-center gap-3 text-center">
    <div class="w-14 h-14 rounded-full flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-1">
        <p class="text-lg font-bold text-white">Lorem ipsum</p>
        <p class="text-base text-white">Lorem ipsum dolor sit amet</p>
    </div>
</div>`,ja=`
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
</style>`,Qe=t=>`
<div class="ss-section">
    <div class="ss-curve-${t?"left":"right"}">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-white mb-3 leading-tight">Lorem ipsum dolor sit amet</h2>
            <p class="text-base text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="ss-grid">
            ${ue}
            ${ue}
            ${ue}
            ${ue}
        </div>
    </div>
</div>
${ja}`,Ta=[{id:"stats-strip-left",label:"Franja estadísticas - izquierda",category:"Heroes",media:Ca,content:Qe(!0)},{id:"stats-strip-right",label:"Franja estadísticas - derecha",category:"Heroes",media:La,content:Qe(!1)}],_a=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="6" cy="16" r="4" fill="#166EBE"/>
    <circle cx="16" cy="16" r="4" fill="#166EBE"/>
    <circle cx="26" cy="16" r="4" fill="#166EBE"/>
    <rect x="3" y="22" width="6" height="1.5" rx="0.75" fill="white" fill-opacity="0.7"/>
    <rect x="13" y="22" width="6" height="1.5" rx="0.75" fill="white" fill-opacity="0.7"/>
    <rect x="23" y="22" width="6" height="1.5" rx="0.75" fill="white" fill-opacity="0.7"/>
    <rect x="3" y="24.5" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.4"/>
    <rect x="13" y="24.5" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.4"/>
    <rect x="23" y="24.5" width="5" height="1" rx="0.5" fill="white" fill-opacity="0.4"/>
</svg>`,Aa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#166EBE"/>
    <rect x="8" y="21" width="16" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="10" y="24.5" width="12" height="1.5" rx="0.75" fill="white" fill-opacity="0.5"/>
</svg>`,oe=`
<div class="flex flex-col items-center gap-4 text-center">
    <div class="w-20 h-20 rounded-full flex items-center justify-center shrink-0" style="background:#166EBE;">
        <img src="${_("images/placeholder.svg")}" alt="Icono" class="w-10 h-10 object-contain">
    </div>
    <h3 class="text-sm font-bold text-white uppercase leading-snug tracking-wide">Lorem ipsum dolor sit amet</h3>
</div>`,et=`
<style>
.svc-section{width:100%;background:#003B71;padding:3rem 4rem;}
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;margin-top:3rem;}
.svc-more-wrap{display:flex;justify-content:center;margin-top:3rem;}
.svc-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:9999px;background:#ffffff;color:#003B71;font-size:1rem;font-weight:600;text-decoration:none;transition:background 0.2s,color 0.2s;}
.svc-more-btn:hover{background:#dce8f5;}
@media(max-width:1280px){.svc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.svc-section{padding:2.5rem 1.5rem;}.svc-grid{grid-template-columns:repeat(2,1fr);gap:2rem;}}
@media(max-width:480px){.svc-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem;}}
</style>`,za=[{id:"service-cards-section",label:"Sección de servicios con iconos",category:"Productos y Servicios",media:_a,content:`
<section class="svc-section">
    <div class="text-center">
        <h2 class="text-4xl font-bold text-white mb-4">Nos importa tu bienestar</h2>
        <p class="text-base text-white leading-relaxed">por eso este beneficio está disponible exclusivamente para quienes<br>mantienen su crédito al día con Banco Integral.</p>
    </div>
    <div class="svc-grid">
        ${oe}
        ${oe}
        ${oe}
        ${oe}
    </div>
    <div class="svc-more-wrap">
        <a href="#" class="svc-more-btn">Ver más</a>
    </div>
</section>
${et}`},{id:"service-card-item",label:"Ítem de servicio con icono",category:"Productos y Servicios",media:Aa,content:`${oe}${et}`}],Ia=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="9" width="30" height="14" fill="white" rx="7" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="4" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="13" width="6" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="10" y="16" width="5" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="17.5" y="12" width="0.8" height="8" rx="0.4" fill="#e5e7eb"/>
    <rect x="20" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="25.5" y="13" width="0" height="0" rx="0"/>
</svg>`,qa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="2" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="5.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="5.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="8.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="3" y="18" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="21.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="21.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="24.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
</svg>`,Da=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="9" width="30" height="14" fill="white" rx="7" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="5" y="12" width="5" height="8" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="13" y="12" width="12" height="2.5" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="13" y="16" width="9" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.8"/>
</svg>`,ne=(t,e,i,a)=>`
<div class="ci-item">
    <i class="${t} ci-icon"></i>
    <div class="flex flex-col gap-0.5">
        <span class="text-sm font-bold uppercase tracking-wide text-[#003B71]">${e}</span>
        <a href="${a}" class="text-sm font-semibold text-[#E97300] no-underline hover:opacity-75 transition-opacity">${i}</a>
    </div>
</div>`,qe=`
<style>
.ci-section{width:100%;padding:2rem 4rem;background:#ffffff;box-sizing:border-box;}
.ci-pill-row{display:inline-flex;flex-direction:row;align-items:center;background:#ffffff;border-radius:9999px;padding:1rem 2rem;box-shadow:0 2px 20px rgba(0,59,113,0.12);border:1px solid #f1f5f9;gap:2rem;}
.ci-pill-col{display:inline-flex;flex-direction:column;background:#ffffff;border-radius:2rem;padding:1.5rem 2rem;box-shadow:0 2px 20px rgba(0,59,113,0.12);border:1px solid #f1f5f9;gap:1.5rem;}
.ci-divider-h{width:100%;height:3px;background:#E97300;border-radius:9999px;flex-shrink:0;}
.ci-item{display:flex;flex-direction:row;align-items:center;gap:1rem;}
.ci-icon{font-size:2.1rem;color:#E97300;flex-shrink:0;}
.ci-divider{width:3px;align-self:stretch;background:#E97300;flex-shrink:0;}
.ci-row-wrap{display:flex;justify-content:center;}
.ci-col-wrap{display:flex;justify-content:center;}
@media(max-width:1280px){.ci-section{padding:2rem 2.5rem;}}
@media(max-width:992px){
    .ci-section{padding:2rem 1.5rem;}
    .ci-pill-row{flex-direction:column;border-radius:2rem;padding:1.5rem 2rem;gap:1.25rem;}
    .ci-divider{width:100%;height:1px;align-self:auto;}
}
@media(max-width:480px){
    .ci-pill-row,.ci-pill-col{width:100%;box-sizing:border-box;}
}
</style>`,Ma=[{id:"contact-info-row",label:"Contacto en fila",category:"Contacto",media:Ia,content:`
<section class="ci-section">
    <div class="ci-row-wrap">
        <div class="ci-pill-row">
            ${ne("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
            <div class="ci-divider"></div>
            ${ne("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com")}
        </div>
    </div>
</section>
${qe}`},{id:"contact-info-col",label:"Contacto en columna",category:"Contacto",media:qa,content:`
<section class="ci-section">
    <div class="ci-col-wrap">
        <div class="ci-pill-col">
            ${ne("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
            <div class="ci-divider-h"></div>
            ${ne("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com")}
        </div>
    </div>
</section>
${qe}`},{id:"contact-info-item",label:"Ítem de contacto",category:"Contacto",media:Da,content:`
<section class="ci-section">
    <div class="ci-row-wrap">
        <div class="ci-pill-row">
            ${ne("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
        </div>
    </div>
</section>
${qe}`}],Na=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="6" cy="8" r="2" fill="#F07C28"/>
    <rect x="10" y="7" width="16" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="10" y="11" width="14" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="10" y="13.5" width="12" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <circle cx="6" cy="19" r="2" fill="#F07C28"/>
    <rect x="10" y="18" width="16" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="10" y="22" width="14" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="10" y="24.5" width="12" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
</svg>`,Pa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="6" cy="14" r="2.5" fill="#F07C28"/>
    <rect x="11" y="12" width="15" height="2.5" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="11" y="17" width="13" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="11" y="20" width="10" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
</svg>`,se=`
<div class="rl-item">
    <div class="flex items-center gap-2 mb-1">
        <span class="rl-bullet">•</span>
        <span class="rl-item__title text-base font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
    </div>
    <p class="rl-item__body text-base leading-relaxed">Nulla tincidunt nisi eu pellentesque fringilla. Proin tincidunt, dolor vitae pellentesque scelerisque, sapien augue lobortis orci, quis blandit magna enim a magna.</p>
</div>`,tt=`
<style>
.rl-section{width:100%;padding:3rem 4rem;background:#ffffff;box-sizing:border-box;}
.rl-list{display:flex;flex-direction:column;gap:1.75rem;}
.rl-item__title{color:#F07C28;}
.rl-bullet{color:#F07C28;font-size:1.25rem;line-height:1;}
.rl-item__body{color:#003B71;}
@media(max-width:1280px){.rl-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.rl-section{padding:2.5rem 1.5rem;}}
</style>`,Ra=[{id:"rich-list",label:"Lista con título y descripción",category:"Contenido",media:Na,content:`
<section class="rl-section">
    <div class="rl-list">
        ${se}
        ${se}
        ${se}
        ${se}
    </div>
</section>
${tt}`},{id:"rich-list-item",label:"Ítem de lista con descripción",category:"Contenido",media:Pa,content:`
<section class="rl-section">
    <div class="rl-list">
        ${se}
    </div>
</section>
${tt}`}],Z=`
<style>
.pd-asymmetric-grid{display:grid;grid-template-columns:3fr 2fr;gap:2rem;align-items:start;}
@media(max-width:992px){.pd-asymmetric-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`,Oa=`
<style>
.pd-three-col-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem;align-items:start;}
.pd-three-col-grid>div:last-child:nth-child(3n+1){grid-column:1/-1;max-width:33%;margin:0 auto;}
@media(max-width:992px){.pd-three-col-grid{gap:1.5rem;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:50%;}}
@media(max-width:640px){.pd-three-col-grid{grid-template-columns:1fr;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:none;}}
</style>`,Ha=`
<style>
.pd-icons-cta-grid{display:grid;grid-template-columns:3fr 2fr;gap:2rem;align-items:center;}
@media(max-width:992px){.pd-icons-cta-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`,it=`
<style>
.pd-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
.pd-card{background:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;gap:0.75rem;}
@media(max-width:640px){.pd-cards-grid{grid-template-columns:1fr;}}
</style>`,at=`
<style>
.pd-cards-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;}
.pd-card-simple{background:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;align-items:center;gap:0.75rem;text-align:center;}
@media(max-width:640px){.pd-cards-row{grid-template-columns:1fr 1fr;}}
</style>`,Fa=`
<style>
.pd-header-grid{
    display:grid;
    grid-template-columns:1fr 1fr minmax(220px,0.8fr);
    grid-template-areas:"intro intro action" "col1 col2 action";
    gap:2rem 3rem;
    align-items:start;
}
.pd-header-grid>.pd-hg-intro{grid-area:intro;}
.pd-header-grid>.pd-hg-col1{grid-area:col1;}
.pd-header-grid>.pd-hg-col2{grid-area:col2;}
.pd-header-grid>.pd-hg-action{grid-area:action;}
@media(max-width:992px){
    .pd-header-grid{
        grid-template-columns:1fr 1fr;
        grid-template-areas:"intro intro" "col1 col2" "action action";
        gap:2rem;
    }
}
@media(max-width:640px){
    .pd-header-grid{
        grid-template-columns:1fr;
        grid-template-areas:"intro" "col1" "col2" "action";
        gap:1.5rem;
    }
}
</style>`,Ua=`
<style>
.pd-coverage-table{width:100%;border-collapse:collapse;border-radius:0.5rem;overflow:hidden;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);}
.pd-coverage-table thead th{background-color:#E97300;color:#fff;text-align:left;padding:0.75rem 1rem;font-size:0.95rem;letter-spacing:0.02em;}
.pd-coverage-table thead th:not(:first-child){text-align:center;}
.pd-coverage-table tbody td{padding:0.65rem 1rem;font-size:0.9rem;color:#003B71;border-bottom:1px solid #e5e7eb;}
.pd-coverage-table tbody td:not(:first-child){text-align:center;font-weight:700;}
.pd-coverage-table tbody tr:last-child td{border-bottom:none;}
.pd-coverage-table tbody td:first-child{font-weight:700;}
@media(max-width:640px){.pd-coverage-table{font-size:0.8rem;}.pd-coverage-table thead th,.pd-coverage-table tbody td{padding:0.5rem 0.6rem;}}
</style>`,q=`
<style>
.pd-text-muted{color:#6b7280;}
.pd-dot-muted{background-color:#6b7280;}
.pd-btn-orange{background-color:#E97300;}
.pd-btn-orange:hover{background-color:#c96200;}
.pd-box-border{border-color:#003B71;}
.pd-text-primary{color:#003B71;}
.pd-text-orange{color:#E97300;}
.pd-box-divider{background-color:#E97300;}
</style>`,Oe=()=>`
<li class="flex items-start gap-2 text-base text-[#003B71]">
    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#003B71] shrink-0"></span>
    <span>Lorem ipsum dolor sit amet consectetur adipiscing elit.</span>
</li>`,P=(t=3,e=null)=>`
<div class="flex flex-col gap-3">
    ${e?`<span class="text-base font-bold text-[#E97300] tracking-wide">${e}</span>`:""}
    <ul class="list-none p-0 m-0 flex flex-col gap-3">
        ${Array.from({length:t},Oe).join("")}
    </ul>
</div>`,Va=()=>`
<p class="text-sm pd-text-muted leading-relaxed text-justify m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,U=(t=1)=>`
<div class="w-full flex flex-col gap-2">
    ${Array.from({length:t},Va).join("")}
</div>`,xe=()=>`
<div class="w-full rounded-xl border-2 pd-box-border px-6 py-4 flex flex-col items-center justify-center gap-1 text-center">
    <span class="text-2xl font-bold pd-text-primary tracking-wide">Invierte desde:</span>
    <span class="text-2xl font-black pd-text-orange">$00.00</span>
</div>`,rt=()=>`
<div class="flex flex-col items-center justify-center gap-1 py-4 px-6">
    <span class="text-lg font-bold pd-text-primary tracking-wide leading-snug">Invierte desde:</span>
    <span class="text-lg font-bold pd-text-primary">Hasta: <span class="pd-text-orange">$00.00</span></span>
</div>`,lt=()=>`
<div class="w-full rounded-xl border-2 pd-box-border flex flex-col">
    ${rt()}
    <div class="px-6">
        <div class="w-full h-0.5 pd-box-divider"></div>
    </div>
    ${rt()}
</div>`,ce=(t="Lorem ipsum",e=3)=>`
<div class="pd-card items-center">
    <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${_("images/placeholder.svg")}" alt="" class="w-6 h-6 object-contain">
    </div>
    <span class="text-base font-bold text-[#E97300] tracking-wide leading-snug w-full">${t}</span>
    <ul class="list-none p-0 m-0 flex flex-col gap-2 w-full">
        ${Array.from({length:e},Oe).join("")}
    </ul>
</div>`,$t=(t="Lorem ipsum")=>`
<div class="pd-card-simple">
    <div class="w-14 h-14 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${_("images/placeholder.svg")}" alt="" class="w-7 h-7 object-contain">
    </div>
    <span class="text-base font-bold text-[#003B71] tracking-wide">${t}</span>
    <p class="text-base text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
</div>`,Ya=(t=4)=>`
<div class="pd-cards-row">
    ${Array.from({length:t},()=>$t()).join("")}
</div>`,R=(t="Adquiere tu servicio")=>`
<a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center tracking-wide max-w-full transition-colors no-underline">${t}</a>`,O=(t="Nombre del Producto")=>`
<h2 class="text-4xl font-black text-[#E97300] break-words leading-tight text-center w-full">${t}</h2>`,Xa={title:"Coberturas",cols:3,headers:[{text:"Coberturas",align:"left"},{text:"Cantidad",align:"center"},{text:"Límite (US$)",align:"center"}],rows:Array.from({length:5},()=>[{text:"",align:"left",isHeader:!1,colspan:1,rowspan:1,image:null},{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null},{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null}])},ot=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="14" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="4" y="5" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="9" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="11" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="13" width="9" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="16" width="3" height="1" rx="0.5" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="5" cy="20" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="7" y="19.3" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="5" cy="23" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="7" y="22.3" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="18" y="3" width="12" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="20" y="6" width="8" height="4" rx="1" fill="#E97300" fill-opacity="0.3"/>
    <rect x="20" y="13" width="8" height="4" rx="2" fill="#E97300" fill-opacity="0.8"/>
    <rect x="20" y="20" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.2"/>
    <rect x="20" y="22" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.2"/>
    <rect x="20" y="24" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.2"/>
</svg>`,ye=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="14" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="4" y="5" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="9" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="11" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="13" width="9" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="16" width="3" height="1" rx="0.5" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="5" cy="20" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="7" y="19.3" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="18" y="3" width="12" height="13" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="20" y="6" width="8" height="3" rx="1" fill="#E97300" fill-opacity="0.3"/>
    <rect x="20" y="11" width="8" height="3" rx="1.5" fill="#E97300" fill-opacity="0.8"/>
    <rect x="18" y="18" width="12" height="11" fill="none" stroke="#003B71" stroke-width="1" rx="1.5"/>
    <rect x="20" y="20.5" width="8" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.7"/>
    <rect x="20" y="23.5" width="8" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.8"/>
</svg>`,nt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="13" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="5" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="9" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="12" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="18" y="2" width="12" height="3" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="18" y="7" width="12" height="2" rx="1" fill="#E97300" fill-opacity="0.4"/>
    <rect x="18" y="12" width="12" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.85"/>
</svg>`,st=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="5" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="9" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="12" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="16" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="19" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="23" y="14" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="26" cy="17" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="2" y="4" width="27" height="2" rx="1" fill="#003B71" fill-opacity="0.4"/>
</svg>`,Ga=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="4" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
    <rect x="12" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="14" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
    <rect x="22" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="23" y="11" width="6" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
</svg>`,Wa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="13" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="24" y="2" width="6" height="6" rx="1" fill="none" stroke="#E97300" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="24" y="11" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`,Ja=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="5" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="13" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="21" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <rect x="24" y="17" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`,ct=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="20" height="4" fill="#E97300" fill-opacity="0.8" rx="1"/>
    <rect x="2" y="10" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
    <rect x="2" y="14" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
    <rect x="2" y="18" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
    <rect x="24" y="4" width="6" height="4" rx="1" fill="none" stroke="#E97300" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="24" y="11" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`,dt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="6" cy="10" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="9" width="18" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <circle cx="6" cy="17" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="16" width="16" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <circle cx="6" cy="24" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="23" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,Ka=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="5" width="26" height="1.5" rx="0.75" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="3" y="9" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="11.5" width="20" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="16" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
</svg>`,Za=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="6" y="13" width="20" height="7" rx="3.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`,Qa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="12" width="24" height="5" rx="1" fill="#E97300" fill-opacity="0.8"/>
    <rect x="8" y="19" width="16" height="2" rx="1" fill="#E97300" fill-opacity="0.4"/>
</svg>`,A="Detalle de Producto",er=[{id:"product-detail-section",label:"Sección: 2 columnas (texto + acción)",category:A,media:ot,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            ${P(5,"Ventajas:")}
        </div>
        <div class="flex flex-col items-center gap-4">
            ${O("Nombre del Producto")}
            ${R("Adquiere tu servicio")}
            ${U(3)}
        </div>
    </div>
</section>
${Z}
${q}`},{id:"product-detail-box",label:"Sección: 2 columnas + cuadro de precio",category:A,media:ye,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            ${P(4,"Ventajas:")}
        </div>
        <div class="flex flex-col items-center gap-4">
            ${O("Nombre del Producto")}
            ${R("Adquiere tu servicio")}
            ${xe()}
            ${U(3)}
        </div>
    </div>
</section>
${Z}
${q}`},{id:"product-detail-box-double",label:"Sección: 2 columnas + cuadro de precio doble",category:A,media:ye,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p class="text-base font-bold text-[#E97300] leading-snug">Lorem ipsum dolor sit amet, subtítulo destacado de la sección.</p>
            ${P(6,"Ventajas")}
        </div>
        <div class="flex flex-col items-center gap-4">
            ${O("Nombre del Producto")}
            ${R("Solicita tu crédito")}
            ${lt()}
            ${U(2)}
        </div>
    </div>
</section>
${Z}
${q}`},{id:"product-detail-three-col",label:"Sección: 3 columnas (2 listas + acción)",category:A,media:Ga,content:`
<section class="w-full bg-white px-16 py-12 flex flex-col gap-6">
    <p class="text-lg font-bold text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <div class="pd-three-col-grid">
        ${P(3,"Ventajas:")}
        ${P(3,"Beneficios:")}
        <div class="flex flex-col items-center gap-4">
            ${O("Nombre del Producto")}
            ${R("Adquiere tu servicio")}
            ${U(3)}
        </div>
    </div>
</section>
${Oa}
${q}`},{id:"product-detail-header-grid",label:"Sección: encabezado + 2 listas + acción",category:A,media:Wa,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-header-grid">
        <div class="pd-hg-intro">
            <p class="text-lg font-bold text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div class="pd-hg-col1">
            ${P(4,"Ventajas")}
        </div>
        <div class="pd-hg-col2">
            ${P(2,"Requisitos")}
        </div>
        <div class="pd-hg-action flex flex-col items-center gap-4">
            ${O("Nombre del Producto")}
            ${R("Adquiere tu servicio")}
            ${U(3)}
        </div>
    </div>
</section>
${Fa}
${q}`},{id:"product-detail-cards-grid",label:"Sección: tarjetas con lista + acción",category:A,media:nt,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
            <div class="pd-cards-grid">
                ${ce("Lorem ipsum uno",3)}
                ${ce("Lorem ipsum dos",3)}
                ${ce("Lorem ipsum tres",3)}
                ${ce("Lorem ipsum cuatro",3)}
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            ${O("Nombre del Producto")}
            ${R("Adquiere tu servicio")}
            ${U(2)}
            ${P(4,"Ventajas:")}
            ${P(2,"Condiciones:")}
        </div>
    </div>
</section>
${Z}
${it}
${q}`},{id:"product-detail-cards-row",label:"Sección: fila de tarjetas simples (sin acción lateral)",category:A,media:st,content:`
<section class="w-full bg-white px-16 py-12 flex flex-col gap-5">
    <p class="text-base font-bold text-[#E97300] m-0">Subtítulo destacado</p>
    <p class="text-base font-semibold text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    ${Ya(4)}
</section>
${at}
${q}`},{id:"product-detail-repeat-blocks",label:"Sección: bloques título+párrafo repetidos + acción",category:A,media:ot,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-1">
                <p class="text-lg font-bold text-[#003B71] m-0">Lorem ipsum dolor sit amet</p>
                <p class="text-base font-normal text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet, estamos listos para ayudarte con <span class="text-[#E97300] font-semibold">soluciones rápidas y efectivas</span>.</p>
            </div>
            <div class="flex flex-col gap-1">
                <p class="text-lg font-bold text-[#003B71] m-0">Lorem ipsum dolor sit amet</p>
                <p class="text-base font-normal text-[#003B71] leading-relaxed m-0">Porque lo importante es <span class="text-[#E97300] font-semibold">nuestra prioridad</span>, recuerda que cuentas con <span class="text-[#E97300] font-semibold">servicios listos</span> para ayudarte en cualquier momento.</p>
            </div>
            <div class="flex flex-col gap-1">
                <p class="text-lg font-bold text-[#003B71] m-0">Lorem ipsum dolor sit amet</p>
                <p class="text-base font-normal text-[#003B71] leading-relaxed m-0">No importa si es de día o de noche, tienes <span class="text-[#E97300] font-semibold">apoyo para seguir tu camino</span> sin preocupaciones.</p>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            ${O("Nombre del Producto")}
            ${R("Adquiere tu servicio")}
            ${xe()}
            ${U(2)}
        </div>
    </div>
</section>
${Z}
${q}`},{id:"product-detail-icons-cta",label:"Sección: imagen/íconos + acción",category:A,media:Ja,content:`
<section class="w-full bg-white px-16 py-12 flex flex-col gap-8">
    <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
    <div class="pd-icons-cta-grid">
        <div class="w-full">
            <img src="${_("images/placeholder.svg")}" alt="Servicios disponibles" class="w-full h-auto object-contain">
        </div>
        <div class="flex flex-col items-center gap-4">
            ${O("Nombre del Producto")}
            ${R("Adquiere tu servicio")}
        </div>
    </div>
    <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet, texto adicional de cierre de la sección.</p>
</section>
${Ha}
${q}`},{id:"product-detail-table",label:"Sección: tabla de coberturas + acción",category:A,media:ct,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <div data-gjs-type="table-component" data-table-theme="blue" data-coverage-table-init="1"></div>
            <div class="flex flex-col gap-2">
                <p class="text-base font-bold text-[#003B71] m-0">Subtítulo de la sección</p>
                <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.</p>
                <p class="text-base font-bold text-[#E97300] m-0">Qué puede incluir:</p>
                ${P(4)}
            </div>
            <div class="flex flex-col gap-2">
                <p class="text-base font-bold text-[#003B71] m-0">Subtítulo secundario</p>
                <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            ${O("Nombre del Producto")}
            ${R("Adquiere tu servicio")}
            ${xe()}
            ${U(2)}
        </div>
    </div>
</section>
${Z}
${Ua}
${q}`},{id:"product-detail-bullet-item",label:"Ítem: bullet individual",category:A,media:dt,content:`
<ul class="list-none p-0 m-0 flex flex-col gap-3">
    ${Oe()}
</ul>
${q}`},{id:"product-detail-bullet-list",label:"Ítem: lista de ventajas (con título)",category:A,media:dt,content:`
${P(4,"Ventajas:")}
${q}`},{id:"product-detail-footnote",label:"Ítem: nota al pie",category:A,media:Ka,content:`
${U(1)}
${q}`},{id:"product-detail-cta-button",label:"Ítem: botón CTA",category:A,media:Za,content:`
${R("Adquiere tu servicio")}
${q}`},{id:"product-detail-title",label:"Ítem: título de producto",category:A,media:Qa,content:`
${O("Nombre del Producto")}
${q}`},{id:"product-detail-price-box",label:"Ítem: cuadro de precio simple",category:A,media:ye,content:`
${xe()}
${q}`},{id:"product-detail-price-box-double",label:"Ítem: cuadro de precio doble",category:A,media:ye,content:`
${lt()}
${q}`},{id:"product-detail-icon-card",label:"Ítem: tarjeta con ícono + lista",category:A,media:nt,content:`
<div class="pd-cards-grid" style="grid-template-columns:1fr;max-width:320px;">
    ${ce("Lorem ipsum",3)}
</div>
${it}
${q}`},{id:"product-detail-icon-card-simple",label:"Ítem: tarjeta simple (ícono + texto)",category:A,media:st,content:`
<div class="pd-cards-row" style="grid-template-columns:1fr;max-width:260px;">
    ${$t("Lorem ipsum")}
</div>
${at}
${q}`},{id:"product-detail-coverage-table",label:"Ítem: tabla de coberturas",category:A,media:ct,content:'<div data-gjs-type="table-component" data-table-theme="orange" data-coverage-table-init="1"></div>'}];typeof window<"u"&&(window.__coverageTableInitialData=Xa);const ft=`
<style>
.fc-cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;}
.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){grid-column:1/-1;max-width:25%;margin:0 auto;}
@media(max-width:992px){.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){max-width:50%;}}
@media(max-width:640px){.fc-cards-grid{grid-template-columns:1fr;}.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){max-width:none;}}
</style>`,tr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#E97300" fill-opacity="0.8"/>
    <path d="M13 12a3 3 0 1 1 4 2.8V16h-2v-1.2a3 3 0 0 1-2-2.8z" fill="#ffffff"/>
    <rect x="14.5" y="17" width="3" height="1" fill="#ffffff"/>
    <rect x="6" y="22" width="20" height="4" rx="1" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="8" y="23.5" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
</svg>`,ir=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="6" cy="6" r="1.5" fill="#E97300"/>
    <rect x="9" y="5" width="18" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="3" y="10" width="22" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="3" y="16" width="8" height="10" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="12" y="16" width="8" height="10" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="21" y="16" width="8" height="10" rx="1.5" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <circle cx="7" cy="20" r="2" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="16" cy="20" r="2" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="25" cy="20" r="2" fill="#E97300" fill-opacity="0.7"/>
</svg>`,de=t=>`
<div class="fc-card flex flex-col items-center gap-4 bg-white rounded-xl shadow-lg p-6">
    <div class="w-16 h-16 rounded-full bg-[#E97300] flex items-center justify-center shrink-0 overflow-hidden">
        <img src="${_("images/placeholder.svg")}" alt="icono" class="w-10 h-10 object-contain" />
    </div>
    <p class="text-base text-[#003B71] text-center leading-relaxed m-0">${t}</p>
</div>`,ar=[{id:"financing-section",label:"Sección de financiamiento",category:"Productos y Servicios",media:ir,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#E97300] shrink-0"></span>
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Subtitulo</span>
        </div>
        <p class="text-base text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div class="fc-cards-grid">
            ${de("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${de("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${de("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${de("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
        </div>
    </div>
</section>
${ft}`},{id:"financing-card",label:"Tarjeta de financiamiento",category:"Productos y Servicios",media:tr,content:`
<div class="fc-cards-grid">
    ${de("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
</div>
${ft}`}],rr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="13" height="13" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="17" y="2" width="13" height="13" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="2" y="17" width="13" height="13" fill="#003B71" fill-opacity="0.15" rx="1.5"/>
    <rect x="17" y="17" width="13" height="13" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="1.5"/>
    <rect x="4" y="5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="4" y="8" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="4" y="10" width="8" height="2.5" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="19" y="5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="19" y="8" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="19" y="10" width="8" height="2.5" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="4" y="20" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="23" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="4" y="25" width="8" height="2.5" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="20" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="19" y="23" width="7" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="19" y="25" width="8" height="2.5" rx="1" fill="#E97300" fill-opacity="0.7"/>
</svg>`,lr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="2"/>
    <rect x="7" y="7" width="18" height="5" fill="#003B71" fill-opacity="0.1" rx="1"/>
    <rect x="7" y="14" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
    <rect x="7" y="17" width="18" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="7" y="19" width="14" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="7" y="23" width="18" height="3.5" rx="1.75" fill="#E97300" fill-opacity="0.8"/>
</svg>`,pt=`
<style>
.ng-section{width:100%;background:#ffffff;padding:3rem 4rem;}
.ng-section-heading{font-size:2.25rem;font-weight:800;color:#003B71;text-align:center;margin:0 0 2rem;}
.ng-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(400px,1fr));gap:1.5rem;}
.ng-card{background:#ffffff;border-radius:1rem;padding:1.75rem;display:flex;flex-direction:column;gap:1rem;box-shadow:0 2px 12px rgba(0,59,113,0.08);transition:background 0.25s,box-shadow 0.25s;align-items:center;}
.ng-card:hover{background:#003B71;box-shadow:0 4px 24px rgba(0,59,113,0.22);}
.ng-card-logo{display:flex;justify-content:center;align-items:center;min-height:80px;}
.ng-logo-img{max-height:80px;width:auto;max-width:100%;object-fit:contain;display:block;}
.ng-card-body{display:flex;flex-direction:column;gap:0.5rem;flex:1;}
.ng-card{background:#ffffff;border-radius:1rem;padding:1.75rem;display:flex;flex-direction:column;gap:1rem;box-shadow:0 2px 12px rgba(0,59,113,0.08);transition:background 0.25s,box-shadow 0.25s;align-items:stretch;}
.ng-card-title{font-size:1rem;font-weight:700;color:#003B71;line-height:1.4;margin:0;transition:color 0.25s;}
.ng-card-desc{font-size:0.875rem;color:#003B71;line-height:1.6;margin:0;transition:color 0.25s;text-align:justify;}
.ng-btn{display:inline-block;padding:0.6rem 1.75rem;border-radius:9999px;background:#E97300;color:#ffffff;font-size:0.875rem;font-weight:700;text-align:center;text-decoration:none;letter-spacing:0.04em;max-width:100%;transition:background 0.25s,color 0.25s;}
.ng-card:hover .ng-card-title{color:#ffffff;}
.ng-card:hover .ng-card-desc{color:rgba(255,255,255,0.85);}
.ng-card:hover .ng-btn{background:#ffffff;color:#003B71;}
.ng-more-wrap{display:flex;justify-content:center;margin-top:2rem;}
.ng-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:9999px;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background 0.2s;}
.ng-more-btn:hover{background:#c96200;}
@media(max-width:1280px){.ng-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.ng-section{padding:2.5rem 1.5rem;}.ng-grid{grid-template-columns:1fr;}}
@media(max-width:480px){.ng-grid{grid-template-columns:1fr;}}
</style>`,fe=`
<div class="ng-card">
    <div class="ng-card-logo">
        <img src="${_("images/placeholder.svg")}" alt="Logo" class="ng-logo-img">
    </div>
    <div class="ng-card-body">
        <h3 class="ng-card-title">Título de la noticia o publicación</h3>
        <p class="ng-card-desc">Descripción breve del contenido de la noticia o publicación disponible para los usuarios.</p>
    </div>
    <a href="#" class="ng-btn" style="align-self:center;">LEER NOTICIA</a>
</div>`,or=[{id:"news-grid-section",label:"Noticias y Publicaciones",category:"Contenido",media:rr,content:`
<section class="ng-section">
    <h2 class="ng-section-heading">Noticias y Publicaciones</h2>
    <div class="ng-grid">
        ${fe}
        ${fe}
        ${fe}
        ${fe}
    </div>
    <div class="ng-more-wrap">
        <a href="#" class="ng-more-btn">Ver más</a>
    </div>
</section>
${pt}`},{id:"news-card",label:"Tarjeta de noticia",category:"Contenido",media:lr,content:`${fe}${pt}`}],Ee=5,$e=[{label:"Azul",value:"#003B71"},{label:"Azul claro",value:"#5C88B3"},{label:"Naranja",value:"#E97300"},{label:"Naranja claro",value:"#F2A566"},{label:"Azul transparente",value:"rgba(0,59,113,0.55)"}],St=`
<style>
.bc-section{width:100%;font-family:'Poppins',sans-serif;}
.bc-title{font-size:1.25rem;font-weight:700;color:#003B71;margin:0 0 1.5rem;}
.bc-plot{position:relative;width:100%;height:280px;display:flex;align-items:flex-end;justify-content:space-around;gap:1.5rem;padding:0 0.5rem;box-sizing:border-box;border-bottom:2px solid rgba(0,59,113,0.25);}
.bc-bar-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%;flex:1;max-width:120px;}
.bc-bar-value{font-size:0.85rem;font-weight:600;color:#003B71;margin-bottom:0.4rem;white-space:nowrap;}
.bc-bar{width:100%;max-width:56px;transition:height 0.3s ease;}
.bc-legend{display:flex;flex-wrap:wrap;gap:1rem 1.5rem;justify-content:center;padding-top:1.25rem;}
.bc-legend-item{display:flex;align-items:center;gap:0.5rem;font-size:0.85rem;color:#003B71;}
.bc-legend-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;}
@media(max-width:640px){
.bc-plot{height:220px;gap:0.75rem;}
}
</style>`;function je(t){const e=parseFloat(t);if(Number.isNaN(e))return 0;const i=Math.min(100,Math.max(0,e));return Math.round(i*100)/100}function nr(t){return`${je(t).toFixed(2)}%`}function De(t){const e=t&&typeof t=="object"?t:{},i=Array.isArray(e.bars)&&e.bars.length?e.bars:Se.bars;return{title:typeof e.title=="string"&&e.title.trim()?e.title:Se.title,showLegend:e.showLegend!==!1,bars:i.slice(0,Ee).map((a,r)=>({label:typeof a?.label=="string"&&a.label.trim()?a.label:`Lorem ipsum ${r+1}`,value:je(a?.value),color:typeof a?.color=="string"&&a.color.trim()?a.color:$e[r%$e.length].value}))}}const Se={title:"Título del gráfico",showLegend:!0,bars:[{label:"Lorem ipsum",value:0,color:"#003B71"},{label:"Lorem ipsum",value:0,color:"#5C88B3"},{label:"Lorem ipsum",value:0,color:"#E97300"}]};function Ct(t){const e=De(t),i=e.bars.map(r=>`
        <div class="bc-bar-col">
            <span class="bc-bar-value">${nr(r.value)}</span>
            <div class="bc-bar" style="height:${je(r.value)}%;background-color:${r.color};"></div>
        </div>`).join(""),a=e.showLegend?`<div class="bc-legend">${e.bars.map(r=>`
            <div class="bc-legend-item">
                <span class="bc-legend-dot" style="background-color:${r.color};"></span>
                <span>${r.label}</span>
            </div>`).join("")}</div>`:"";return`<h3 class="bc-title">${e.title}</h3>
        <div class="bc-plot">${i}</div>
        ${a}`}function sr(t,e){const i=document.getElementById("bar-chart-config-modal");if(i&&i.remove(),!document.getElementById("bc-modal-styles")){const c=document.createElement("style");c.id="bc-modal-styles",c.textContent=`
            .bc-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .bc-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:640px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .bc-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .bc-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .bc-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .bc-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .bc-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .bc-modal-close:hover{background:#f1f5f9;color:#475569;}
            .bc-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .bc-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .bc-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .bc-row{display:flex;gap:0.75rem;align-items:center;}
            .bc-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .bc-input:focus{border-color:#3b82f6;}
            .bc-error-text{font-size:0.7rem;color:#dc2626;margin-top:0.375rem;min-height:1em;}
            .bc-toggle-row{display:flex;align-items:center;justify-content:space-between;gap:1rem;}
            .bc-bar-row{border:1px solid #e2e8f0;border-radius:0.625rem;padding:0.875rem;display:flex;flex-direction:column;gap:0.625rem;background:#f8fafc;}
            .bc-bar-row-header{display:flex;align-items:center;justify-content:space-between;}
            .bc-bar-row-title{font-size:0.8125rem;font-weight:700;color:#003B71;}
            .bc-remove-bar{background:none;border:none;color:#dc2626;font-size:0.75rem;font-weight:600;cursor:pointer;padding:0.2rem 0.5rem;font-family:inherit;}
            .bc-remove-bar:disabled{opacity:0.35;cursor:not-allowed;}
            .bc-bar-fields{display:grid;grid-template-columns:2fr 1fr 1fr;gap:0.625rem;}
            .bc-color-input{border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.15rem;width:100%;height:2.25rem;box-sizing:border-box;cursor:pointer;background:#fff;}
            .bc-add-bar-btn{align-self:flex-start;padding:0.5rem 0.9rem;border-radius:0.5rem;border:1px dashed #003B71;background:#fff;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .bc-add-bar-btn:hover{background:#f0f4f8;}
            .bc-add-bar-btn:disabled{opacity:0.4;cursor:not-allowed;}
            .bc-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .bc-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .bc-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .bc-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .bc-btn-save:hover{background:#d97821;}
        `,document.head.appendChild(c)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-bar-chart-config"]||"{}")}catch{return{}}})(),r=De(a);let l=r.bars.map(c=>({...c}));const o=document.createElement("div");o.id="bar-chart-config-modal",o.className="bc-overlay";const g=(c,s)=>`
        <div class="bc-bar-row" data-bar-row="${s}">
            <div class="bc-bar-row-header">
                <span class="bc-bar-row-title">Barra ${s+1}</span>
                <button type="button" class="bc-remove-bar" data-remove-bar="${s}" ${l.length<=1?"disabled":""}>Eliminar</button>
            </div>
            <div class="bc-bar-fields">
                <div>
                    <label class="bc-label">Nombre</label>
                    <input type="text" class="bc-input" data-bar-field="label" data-bar-index="${s}" value="${c.label}" maxlength="60">
                </div>
                <div>
                    <label class="bc-label">Valor (0-100)</label>
                    <input type="number" class="bc-input" data-bar-field="value" data-bar-index="${s}" value="${c.value}" min="0" max="100" step="0.01">
                </div>
                <div>
                    <label class="bc-label">Color</label>
                    <input type="color" class="bc-color-input" data-bar-field="color" data-bar-index="${s}" value="${/^#[0-9a-fA-F]{6}$/.test(c.color)?c.color:"#003B71"}">
                </div>
            </div>
            <div class="bc-error-text" data-bar-error="${s}"></div>
        </div>`,f=()=>{o.innerHTML=`
            <div class="bc-modal">
                <div class="bc-modal-header">
                    <div class="bc-modal-header-left"><i class="ri-bar-chart-2-line"></i><h2>Configurar Gráfico de Barras</h2></div>
                    <button id="bc-modal-close" class="bc-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
                </div>
                <div class="bc-modal-body">
                    <div class="bc-card">
                        <label class="bc-label">Título del gráfico</label>
                        <input id="bc-title" type="text" class="bc-input" value="${r.title}" maxlength="80">
                    </div>
                    <div class="bc-card">
                        <div class="bc-toggle-row">
                            <label class="bc-label" style="margin-bottom:0;">Mostrar leyenda</label>
                            <input id="bc-show-legend" type="checkbox" ${r.showLegend?"checked":""}>
                        </div>
                    </div>
                    <div class="bc-card">
                        <label class="bc-label">Barras (máx. ${Ee})</label>
                        <div id="bc-bars-list" style="display:flex;flex-direction:column;gap:0.75rem;">
                            ${l.map(g).join("")}
                        </div>
                        <button type="button" id="bc-add-bar" class="bc-add-bar-btn" style="margin-top:0.75rem;" ${l.length>=Ee?"disabled":""}>
                            <i class="ri-add-line"></i> Agregar barra
                        </button>
                    </div>
                </div>
                <div class="bc-modal-footer">
                    <button id="bc-modal-cancel" class="bc-btn-cancel">Cancelar</button>
                    <button id="bc-modal-save" class="bc-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
                </div>
            </div>`,o.querySelector("#bc-modal-close").onclick=d,o.querySelector("#bc-modal-cancel").onclick=d,o.querySelector("#bc-add-bar").onclick=()=>{l.length>=Ee||(l.push({label:`Lorem ipsum ${l.length+1}`,value:0,color:$e[l.length%$e.length].value}),r.title=o.querySelector("#bc-title").value,r.showLegend=o.querySelector("#bc-show-legend").checked,f())},o.querySelectorAll("[data-remove-bar]").forEach(c=>{c.onclick=()=>{if(l.length<=1)return;const s=parseInt(c.dataset.removeBar,10);l.splice(s,1),r.title=o.querySelector("#bc-title").value,r.showLegend=o.querySelector("#bc-show-legend").checked,f()}}),o.querySelectorAll("[data-bar-field]").forEach(c=>{c.addEventListener("input",()=>{const s=parseInt(c.dataset.barIndex,10),u=c.dataset.barField;if(u==="value"){const m=o.querySelector(`[data-bar-error="${s}"]`),p=c.value,w=parseFloat(p);if(p===""||Number.isNaN(w)||w<0||w>100){m.textContent="Ingresa un valor entre 0 y 100";return}m.textContent="",l[s].value=je(w)}else l[s][u]=c.value})})},d=()=>o.remove();o.onclick=c=>{c.target===o&&d()},o.appendChild(document.createElement("div")),f(),o.addEventListener("click",c=>{if(c.target.id==="bc-modal-save"){if(o.querySelector(".bc-error-text:not(:empty)"))return;const u=De({title:o.querySelector("#bc-title").value.trim(),showLegend:o.querySelector("#bc-show-legend").checked,bars:l});e.addAttributes({"data-bar-chart-config":JSON.stringify(u)}),e.components(Ct(u)+St),d()}}),document.body.appendChild(o)}function cr(t){const e="bar-chart-component";t.BlockManager.add("bar-chart-section-block",{label:"Sección: Gráfico de Barras",category:"Gráficos",media:`<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="none" stroke="#003B71" stroke-width="0.6" stroke-opacity="0.3" rx="1"/>
            <rect x="5" y="6" width="15" height="1.6" rx="0.8" fill="#003B71" fill-opacity="0.6"/>
            <rect x="7" y="19" width="3.5" height="6" fill="#003B71"/>
            <rect x="13" y="15" width="3.5" height="10" fill="#5C88B3"/>
            <rect x="19" y="11" width="3.5" height="14" fill="#E97300"/>
            <rect x="5" y="25" width="17" height="1.2" fill="#003B71" fill-opacity="0.4"/>
        </svg>`,activate:!0,content:{type:e,attributes:{"data-gjs-type":e},classes:["bc-section","w-full","bg-white","px-16","py-12"]}})}function dr(t){const e="bar-chart-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Gráfico de Barras",tagName:"div",classes:["bc-section"],draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-bar-chart-config":JSON.stringify(Se)},components:Ct(Se)+St,traits:[{type:"button",label:"Gráfico",text:"Administrar Barras",full:!0,command:"open-bar-chart-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-bar-chart-config",{run(i){const a=i.getSelected();a&&sr(i,a)}}),t.BlockManager.add("bar-chart-block",{label:"Gráfico de Barras",category:"Gráficos",media:`<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="3" y="4" width="15" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
            <rect x="5" y="20" width="4" height="7" fill="#003B71"/>
            <rect x="11" y="15" width="4" height="12" fill="#5C88B3"/>
            <rect x="17" y="10" width="4" height="17" fill="#E97300"/>
            <rect x="3" y="27" width="20" height="1.5" fill="#003B71" fill-opacity="0.4"/>
            <circle cx="25" cy="6" r="1.5" fill="#003B71"/>
            <rect x="27.5" y="5.3" width="3" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.4"/>
            <circle cx="25" cy="10" r="1.5" fill="#5C88B3"/>
            <rect x="27.5" y="9.3" width="3" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.4"/>
            <circle cx="25" cy="14" r="1.5" fill="#E97300"/>
            <rect x="27.5" y="13.3" width="3" height="1.4" rx="0.7" fill="#003B71" fill-opacity="0.4"/>
        </svg>`,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}})}const fr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="3" y="4" width="26" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="10" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="10" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="16" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="16" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="22" width="26" height="5" fill="#F07C28" rx="1"/>
</svg>`,pr=`
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
`,gr=[{id:"contact-form",label:"Formulario de contacto",category:"Formularios",media:fr,content:`
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
${pr}
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
<\/script>`}],hr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="6" rx="1" fill="#003B71"/>
    <rect x="2" y="10" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="17" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <rect x="2" y="24" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <line x1="11" y1="2" x2="11" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
    <line x1="21" y1="2" x2="21" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
</svg>`,Ce={blue:{headerBg:"bg-[#003B71]",headerText:"text-white",subheaderBg:"bg-[#003B71]",subheaderText:"text-white",borderColor:"#003B71",rowText:"text-[#003B71]",labelText:"text-[#003B71]"},orange:{headerBg:"bg-[#E97300]",headerText:"text-white",subheaderBg:"bg-[#E97300]",subheaderText:"text-white",borderColor:"#E97300",rowText:"text-[#003B71]",labelText:"text-[#003B71]"}};function Lt(t,e){const i=Ce[e]||Ce.blue,a=t.showTitleRow!==!1&&!!t.title,r=t.showHeaderRow!==!1;let l='<table class="w-full border-collapse font-[Poppins,sans-serif] table-fixed">';if(a||r){if(l+="<thead>",a&&(l+=`<tr>
                <th colspan="${t.cols}" class="p-3 align-middle text-center text-base font-bold ${i.headerBg} ${i.headerText}">
                    ${t.title}
                </th>
            </tr>`),r&&t.headers?.length){const f=a?i.subheaderBg:i.headerBg,d=a?i.subheaderText:i.headerText;l+="<tr>",t.headers.forEach((c,s)=>{const u=s<t.headers.length-1?`border-r border-[${i.borderColor}]`:"";l+=`<th class="p-3 align-middle text-sm font-semibold ${f} ${d} ${u} border-b border-[${i.borderColor}] text-${c.align||"center"}">${c.text||""}</th>`}),l+="</tr>"}l+="</thead>"}l+="<tbody>";const o=t.rows.length,g={};return t.rows.forEach((f,d)=>{l+="<tr>";let c=0;f.forEach(s=>{for(;g[`${d}-${c}`];)c++;const u=s.colspan||1,m=s.rowspan||1;for(let j=d;j<d+m;j++)for(let z=c;z<c+u;z++)(j!==d||z!==c)&&(g[`${j}-${z}`]=!0);const p=u>1?`colspan="${u}"`:"",w=m>1?`rowspan="${m}"`:"",k=s.isHeader?`tbl-cell-highlight-${e}`:`tbl-cell-normal-${e}`,b="font-semibold",y=s.isHeader?i.labelText:i.rowText,x=`text-${s.align||"center"}`,h=d+m>=o,B=c+u>=t.cols?"":`border-r border-[${i.borderColor}]`,C=h?"":`border-b border-[${i.borderColor}]`,E=`${B} ${C} p-3 align-middle text-sm ${k} ${b} ${y} ${x}`;s.image?l+=`<td ${p} ${w} class="${E}">
                    <img src="${s.image}" alt="${s.text||""}" class="max-w-full max-h-20 h-auto object-contain block mx-auto">
                    ${s.text?`<span class="block mt-1 text-xs ${y}">${s.text}</span>`:""}
                </td>`:l+=`<td ${p} ${w} class="${E}">${s.text||""}</td>`,c+=u}),l+="</tr>"}),l+="</tbody></table>",l}function Q(t,e){return{title:"Título de la tabla",showTitleRow:!0,showHeaderRow:!0,cols:t,headers:Array.from({length:t},(i,a)=>({text:`Columna ${a+1}`,align:"center"})),rows:Array.from({length:e},()=>Array.from({length:t},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})))}}function mr(t){return`<style>
.tbl-cell-normal-${t}{background-color:#ffffff;}
.tbl-cell-highlight-${t}{background-color:#e2e8f0;}
</style>`}function jt(t,e){return`<div class="w-full overflow-x-auto rounded-2xl border-2 border-[${(Ce[e]||Ce.blue).borderColor}]">${mr(e)}${t}</div>`}function gt(t,e){const i={};return t.forEach((a,r)=>{let l=0;a.forEach(o=>{for(;i[`${r}-${l}`];)l++;const g=Math.min(o.colspan||1,e-l),f=o.rowspan||1;for(let d=r;d<r+f;d++)for(let c=l;c<l+g;c++)(d!==r||c!==l)&&(i[`${d}-${c}`]=`${r}-${l}`);l+=g})}),i}const br=`
.tam-overlay{position:fixed;inset:0;z-index:999999;display:none;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
.tam-overlay.open{display:flex;}
.tam-modal{background:#ffffff;border-radius:0.75rem;width:100%;max-width:1040px;max-height:90vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
.tam-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#ffffff;flex-shrink:0;}
.tam-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
.tam-modal-header-left i{font-size:1.125rem;color:#003B71;}
.tam-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
.tam-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s,color 0.15s;}
.tam-modal-close:hover{background:#f1f5f9;color:#475569;}
.tam-modal-close i{font-size:1.125rem;}
.tam-toolbar{display:flex;flex-wrap:wrap;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;background:#f8fafc;flex-shrink:0;align-items:flex-end;}
.tam-toolbar-group{display:flex;flex-direction:column;gap:0.375rem;}
.tam-toolbar-label{font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;}
.tam-modal-input,.tam-modal-select{padding:0.5rem 0.75rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;}
.tam-modal-input:focus,.tam-modal-select:focus{border-color:#003B71;}
.tam-toolbar-checkbox{display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;font-weight:500;color:#334155;cursor:pointer;user-select:none;padding:0.5rem 0.75rem;background:#ffffff;border:1px solid #e2e8f0;border-radius:0.5rem;}
.tam-toolbar-checkbox input{accent-color:#003B71;cursor:pointer;width:1rem;height:1rem;}
.tam-btn-rebuild{padding:0.5rem 1rem;background:#ffffff;border:2px solid #003B71;border-radius:0.5rem;color:#003B71;font-size:0.8125rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s,color 0.15s;}
.tam-btn-rebuild:hover{background:#003B71;color:#fff;}
.tam-rebuild-notice{background:#fef9c3;border:1.5px solid #ca8a04;border-radius:0.5rem;padding:0.625rem 1rem;font-size:0.8125rem;color:#92400e;display:flex;align-items:center;gap:0.5rem;margin:0 1.25rem;flex-shrink:0;}
.tam-body{flex:1;overflow-y:auto;padding:1.25rem;background:#f8fafc;}
.tam-body::-webkit-scrollbar{width:5px;}
.tam-body::-webkit-scrollbar-track{background:transparent;}
.tam-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
.tam-table-wrap{overflow-x:auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
.tam-table{width:100%;border-collapse:collapse;font-size:0.8rem;table-layout:fixed;}
.tam-table th,.tam-table td{border:1.5px solid #e2e8f0;padding:0.5rem;vertical-align:top;min-width:80px;}
.tam-table th{background:#f8fafc;font-weight:600;color:#334155;text-align:center;}
.tam-cell-input{width:100%;border:none;outline:none;font-size:0.8rem;background:transparent;resize:vertical;min-height:36px;font-family:inherit;color:#1e293b;box-sizing:border-box;}
.tam-cell-actions{display:flex;gap:4px;margin-top:6px;flex-wrap:wrap;align-items:center;}
.tam-cell-btn{padding:3px 8px;border-radius:0.375rem;font-size:0.65rem;font-weight:600;cursor:pointer;border:1.5px solid;transition:all 0.15s;line-height:1.4;font-family:inherit;}
.tam-cell-btn:hover{opacity:0.8;}
.tam-cell-btn-header{background:transparent;color:#003B71;border-color:#003B71;}
.tam-cell-btn-header.active{background:#003B71;color:#fff;border-color:#003B71;}
.tam-cell-btn-img{background:#E97300;color:#fff;border-color:#E97300;}
.tam-cell-btn-clear{background:#fff;color:#ef4444;border-color:#ef4444;}
.tam-cell{position:relative;}
.tam-cell.is-header-cell{background:#e2e8f0 !important;}
.tam-cell.has-image{background:#fef9ee !important;}
.tam-cell.is-spanned{background:#f1f5f9 !important;pointer-events:none;opacity:0.5;}
.tam-cell.has-span{background:#f0fdf4 !important;outline:1.5px dashed #16a34a;}
.tam-cell-img-preview{width:70px;height:44px;object-fit:contain;border-radius:0.375rem;margin-bottom:4px;border:1px solid #e2e8f0;}
.tam-cell-span-group{display:flex;gap:4px;align-items:center;}
.tam-cell-span-group label{font-size:0.6rem;color:#64748b;font-weight:600;}
.tam-cell-span-input{width:40px;font-size:0.7rem;padding:2px 4px;border:1.5px solid #e2e8f0;border-radius:0.375rem;text-align:center;}
.tam-spanned-label{font-size:0.6rem;color:#94a3b8;text-align:center;padding-top:4px;font-style:italic;}
.tam-modal-footer{display:flex;align-items:center;justify-content:flex-end;padding:1rem 1.25rem;border-top:1px solid #f1f5f9;background:#ffffff;flex-shrink:0;gap:0.75rem;}
.tam-btn{padding:0.5rem 1.25rem;border-radius:0.5rem;font-size:0.875rem;font-weight:600;cursor:pointer;border:2px solid transparent;transition:opacity 0.15s,background 0.15s,border-color 0.15s;display:inline-flex;align-items:center;gap:0.375rem;font-family:inherit;}
.tam-btn-cancel{background:#ffffff;border-color:#e2e8f0;color:#475569;}
.tam-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
.tam-btn-primary{background:#003B71;color:#fff;border-color:#003B71;}
.tam-btn-primary:hover{background:#002a52;}
.tam-img-overlay{position:fixed;inset:0;z-index:9999999;display:none;align-items:center;justify-content:center;padding:1rem;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);}
.tam-img-overlay.open{display:flex;}
.tam-img-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:85vh;display:flex;flex-direction:column;overflow:hidden;font-family:'Inter',sans-serif;box-shadow:0 20px 60px rgba(15,23,42,0.18);border:1px solid #e2e8f0;}
.tam-img-header{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;flex-shrink:0;}
.tam-img-header h3{font-size:0.9375rem;font-weight:700;color:#0f172a;margin:0;display:flex;align-items:center;gap:0.5rem;}
.tam-img-search{padding:0.75rem 1.25rem;border-bottom:1px solid #f1f5f9;flex-shrink:0;}
.tam-img-search input{width:100%;padding:0.5rem 0.75rem;border:1px solid #e2e8f0;border-radius:0.5rem;font-size:0.875rem;outline:none;box-sizing:border-box;font-family:inherit;}
.tam-img-search input:focus{border-color:#003B71;}
.tam-img-grid{flex:1;overflow-y:auto;padding:1rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:0.75rem;}
.tam-img-card{cursor:pointer;border-radius:0.5rem;border:2px solid #e2e8f0;overflow:hidden;background:#fff;transition:border-color 0.15s;}
.tam-img-card:hover{border-color:#94a3b8;}
.tam-img-card.selected{border-color:#003B71;box-shadow:0 0 0 3px rgba(0,59,113,0.15);}
.tam-img-card img{width:100%;aspect-ratio:16/10;object-fit:cover;display:block;}
.tam-img-card p{font-size:0.65rem;padding:4px 6px;color:#334155;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin:0;}
.tam-img-loading{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem;gap:1rem;color:#64748b;font-size:0.875rem;}
.tam-img-spinner{width:2rem;height:2rem;border:3px solid #e2e8f0;border-top-color:#003B71;border-radius:50%;animation:tam-spin 0.8s linear infinite;}
@keyframes tam-spin{to{transform:rotate(360deg);}}
.tam-img-footer{display:flex;align-items:center;justify-content:space-between;padding:1rem 1.25rem;border-top:1px solid #f1f5f9;background:#f8fafc;flex-shrink:0;}
.tam-img-selected-info{font-size:0.8125rem;color:#64748b;}`;function ur(){if(document.getElementById("tam-img-modal"))return;const t=document.createElement("div");t.id="tam-img-modal",t.className="tam-img-overlay",t.innerHTML=`
        <div class="tam-img-modal">
            <div class="tam-img-header">
                <h3><i class="ri-image-line"></i>Seleccionar imagen</h3>
                <button class="tam-modal-close" id="tam-img-close"><i class="ri-close-line"></i></button>
            </div>
            <div class="tam-img-search">
                <input type="text" id="tam-img-search-input" placeholder="Buscar imagen por nombre...">
            </div>
            <div class="tam-img-grid" id="tam-img-grid"></div>
            <div class="tam-img-footer">
                <span class="tam-img-selected-info" id="tam-img-selected-info">Ninguna imagen seleccionada</span>
                <div style="display:flex;gap:0.5rem;">
                    <button class="tam-btn tam-btn-cancel" id="tam-img-cancel">Cancelar</button>
                    <button class="tam-btn tam-btn-primary" id="tam-img-confirm" disabled><i class="ri-check-line"></i> Usar imagen</button>
                </div>
            </div>
        </div>`,document.body.appendChild(t);let e=null,i=null;async function a(g=""){const f=document.getElementById("tam-img-grid");f.innerHTML='<div class="tam-img-loading"><div class="tam-img-spinner"></div><span>Cargando...</span></div>';try{const d=new URLSearchParams({type:"image",per_page:50});g&&d.append("search",g);const c=document.querySelector('meta[name="media-api-url"]')?.content??"/media/api",m=(await(await fetch(`${c}?${d}`,{headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}})).json()).items||[];if(!m.length){f.innerHTML='<div class="tam-img-loading"><i class="ri-image-line" style="font-size:2rem;"></i><span>No se encontraron imágenes</span></div>';return}f.innerHTML="",m.forEach(p=>{const w=document.createElement("div");w.className="tam-img-card",w.innerHTML=`<img src="${p.url}" alt="${p.filename}"><p title="${p.filename}">${p.filename}</p>`,w.addEventListener("click",()=>{f.querySelectorAll(".tam-img-card").forEach(k=>k.classList.remove("selected")),w.classList.add("selected"),e=p.url,document.getElementById("tam-img-selected-info").textContent=`Seleccionada: ${p.filename}`,document.getElementById("tam-img-confirm").disabled=!1}),f.appendChild(w)})}catch{f.innerHTML='<div class="tam-img-loading"><i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i><span style="color:#dc2626;">Error al cargar imágenes</span></div>'}}function r(g){i=g,e=null,document.getElementById("tam-img-selected-info").textContent="Ninguna imagen seleccionada",document.getElementById("tam-img-confirm").disabled=!0,document.getElementById("tam-img-search-input").value="",t.classList.add("open"),a()}function l(){t.classList.remove("open"),e=null,i=null}document.getElementById("tam-img-close").addEventListener("click",l),document.getElementById("tam-img-cancel").addEventListener("click",l),document.getElementById("tam-img-confirm").addEventListener("click",()=>{e&&i&&(i(e),l())});let o;document.getElementById("tam-img-search-input").addEventListener("input",g=>{clearTimeout(o),o=setTimeout(()=>a(g.target.value),300)}),t.addEventListener("click",g=>{g.target===t&&l()}),window.__openTableImagePicker=r}function xr(t,e){if(document.getElementById("table-admin-modal"))return;const i=document.createElement("style");i.id="table-admin-modal-styles",i.textContent=br,document.head.appendChild(i),ur();const a=document.createElement("div");a.id="table-admin-modal",a.className="tam-overlay",a.innerHTML=`
        <div class="tam-modal">
            <div class="tam-modal-header">
                <div class="tam-modal-header-left">
                    <i class="ri-table-line"></i>
                    <h2>Administrar tabla</h2>
                </div>
                <button class="tam-modal-close" id="tam-close"><i class="ri-close-line"></i></button>
            </div>
            <div class="tam-toolbar">
                <div class="tam-toolbar-group">
                    <label class="tam-toolbar-label">Título de tabla</label>
                    <input type="text" id="tam-title" placeholder="Texto del título" class="tam-modal-input" style="width:220px;">
                </div>
                <div class="tam-toolbar-group">
                    <label class="tam-toolbar-label">Color</label>
                    <select id="tam-theme" class="tam-modal-select">
                        <option value="blue">Azul</option>
                        <option value="orange">Naranja</option>
                    </select>
                </div>
                <div class="tam-toolbar-group">
                    <label class="tam-toolbar-label">Columnas</label>
                    <input type="number" id="tam-cols" min="1" max="10" value="3" class="tam-modal-input" style="width:70px;">
                </div>
                <div class="tam-toolbar-group">
                    <label class="tam-toolbar-label">Filas</label>
                    <input type="number" id="tam-rows" min="1" max="30" value="3" class="tam-modal-input" style="width:70px;">
                </div>
                <label class="tam-toolbar-checkbox">
                    <input type="checkbox" id="tam-show-title-row" checked>
                    Mostrar fila de título
                </label>
                <label class="tam-toolbar-checkbox">
                    <input type="checkbox" id="tam-show-header-row" checked>
                    Mostrar fila de encabezados
                </label>
                <button class="tam-btn-rebuild" id="tam-rebuild">
                    <i class="ri-refresh-line"></i> Reconstruir
                </button>
            </div>
            <div class="tam-body">
                <div class="tam-table-wrap">
                    <table class="tam-table"><thead id="tam-thead"></thead><tbody id="tam-tbody"></tbody></table>
                </div>
            </div>
            <div class="tam-modal-footer">
                <button class="tam-btn tam-btn-cancel" id="tam-cancel">Cancelar</button>
                <button class="tam-btn tam-btn-primary" id="tam-apply"><i class="ri-check-line"></i> Aplicar cambios</button>
            </div>
        </div>`,document.body.appendChild(a);let r=null,l=null;function o(){const m=document.getElementById("tam-show-title-row").checked,p=document.getElementById("tam-title");p.disabled=!m,p.style.opacity=m?"1":"0.5"}function g(m){r=m;const p=m.get("tableData");l=p?JSON.parse(JSON.stringify(p)):Q(3,3);const w=l.cols||3;l.rows=l.rows.map(k=>Array.from({length:w},(b,y)=>k[y]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})),document.getElementById("tam-title").value=l.title||"",document.getElementById("tam-theme").value=m.get("tableTheme")||"blue",document.getElementById("tam-cols").value=l.cols||3,document.getElementById("tam-rows").value=l.rows.length||3,document.getElementById("tam-show-title-row").checked=l.showTitleRow!==!1,document.getElementById("tam-show-header-row").checked=l.showHeaderRow!==!1,o(),s(),u(),a.classList.add("open"),document.body.style.overflow="hidden"}function f(){a.classList.remove("open"),document.body.style.overflow="",r=null}function d(){l.title=document.getElementById("tam-title").value.trim(),l.showTitleRow=document.getElementById("tam-show-title-row").checked,l.showHeaderRow=document.getElementById("tam-show-header-row").checked,l.cols=parseInt(document.getElementById("tam-cols").value)||3,l.headers=Array.from(document.querySelectorAll(".tam-header-input")).map(p=>({text:p.value,align:p.closest("th")?.querySelector(".tam-align-select")?.value||"center"})),document.querySelectorAll("#tam-tbody td.tam-cell:not(.is-spanned)").forEach(p=>{const w=parseInt(p.dataset.row),k=parseInt(p.dataset.col);l.rows[w]?.[k]&&(l.rows[w][k].text=p.querySelector(".tam-cell-input")?.value||"",l.rows[w][k].align=p.querySelector(".tam-align-select")?.value||"center",l.rows[w][k].isHeader=p.dataset.isheader==="1",l.rows[w][k].image=p.dataset.image||null)});const m=gt(l.rows,l.cols);l.rows=l.rows.map((p,w)=>p.filter((k,b)=>!m[`${w}-${b}`]))}function c(){if(a.querySelector("#tam-rebuild-notice"))return;const p=document.createElement("div");p.id="tam-rebuild-notice",p.className="tam-rebuild-notice",p.style.margin="1rem 1.25rem 0",p.innerHTML='<i class="ri-error-warning-line"></i> Has modificado el colspan/rowspan. Haz clic en <strong style="margin:0 4px;">Reconstruir</strong> para aplicar los cambios de fusión.',a.querySelector(".tam-toolbar").after(p)}function s(){a.querySelector("#tam-rebuild-notice")?.remove()}function u(){const m=document.getElementById("tam-thead"),p=document.getElementById("tam-tbody"),w=l.cols,k=l.rows.length,b=gt(l.rows,w);m.innerHTML=`<tr>${l.headers.map((y,x)=>`
            <th>
                <input class="tam-cell-input tam-header-input" value="${y.text||""}" placeholder="Col ${x+1}" style="font-weight:600;">
                <select class="tam-align-select" style="margin-top:4px;width:100%;font-size:0.7rem;padding:2px;">
                    <option value="left" ${y.align==="left"?"selected":""}>Izquierda</option>
                    <option value="center" ${y.align==="center"?"selected":""}>Centro</option>
                    <option value="right" ${y.align==="right"?"selected":""}>Derecha</option>
                </select>
            </th>`).join("")}</tr>`,p.innerHTML=l.rows.map((y,x)=>`<tr>${Array.from({length:w},($,B)=>{const C=b[`${x}-${B}`];if(C)return`<td class="tam-cell is-spanned" data-row="${x}" data-col="${B}">
                        <div class="tam-spanned-label">Combinada con [${C}]</div>
                    </td>`;const E=y[B]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null},j=E.colspan||1,z=E.rowspan||1,D=j>1||z>1;return`<td class="tam-cell ${E.isHeader?"is-header-cell":""} ${E.image?"has-image":""} ${D?"has-span":""}"
                    data-row="${x}" data-col="${B}"
                    data-isheader="${E.isHeader?"1":"0"}"
                    data-colspan="${j}"
                    data-rowspan="${z}"
                    data-image="${E.image||""}">
                    ${E.image?`<img class="tam-cell-img-preview" src="${E.image}" alt="">`:""}
                    <textarea class="tam-cell-input" placeholder="Texto...">${E.text||""}</textarea>
                    <select class="tam-align-select" style="width:100%;font-size:0.7rem;padding:2px;margin-top:4px;">
                        <option value="left" ${E.align==="left"?"selected":""}>Izquierda</option>
                        <option value="center" ${E.align==="center"?"selected":""}>Centro</option>
                        <option value="right" ${E.align==="right"?"selected":""}>Derecha</option>
                    </select>
                    <div class="tam-cell-actions">
                        <button type="button" class="tam-cell-btn tam-cell-btn-header ${E.isHeader?"active":""}"
                            data-action="header" data-row="${x}" data-col="${B}">
                            ${E.isHeader?"✓ Resaltar":"Resaltar"}
                        </button>
                        <button type="button" class="tam-cell-btn tam-cell-btn-img"
                            data-action="image" data-row="${x}" data-col="${B}">
                            <i class="ri-image-line"></i> ${E.image?"Cambiar":"Imagen"}
                        </button>
                        ${E.image?`<button type="button" class="tam-cell-btn tam-cell-btn-clear" data-action="clear-image" data-row="${x}" data-col="${B}">✕ Quitar</button>`:""}
                        <div class="tam-cell-span-group">
                            <label title="Columnas que ocupa">CS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${w-B}"
                                value="${j}" data-action="colspan" data-row="${x}" data-col="${B}">
                            <label title="Filas que ocupa">RS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${k-x}"
                                value="${z}" data-action="rowspan" data-row="${x}" data-col="${B}">
                        </div>
                    </div>
                </td>`}).join("")}</tr>`).join(""),p.querySelectorAll("input[data-action=colspan], input[data-action=rowspan]").forEach(y=>{y.addEventListener("change",()=>{const x=parseInt(y.dataset.row),h=parseInt(y.dataset.col),$=Math.max(1,parseInt(y.value)||1);l.rows[x]?.[h]&&(y.dataset.action==="colspan"?l.rows[x][h].colspan=Math.min($,w-h):l.rows[x][h].rowspan=Math.min($,k-x),c())})}),p.querySelectorAll("button[data-action]").forEach(y=>{y.addEventListener("click",x=>{x.preventDefault(),x.stopPropagation();const h=y.dataset.action,$=parseInt(y.dataset.row),B=parseInt(y.dataset.col);if(!(isNaN($)||isNaN(B)||!l.rows[$]?.[B])){if(h==="header"){l.rows[$][B].isHeader=!l.rows[$][B].isHeader;const C=p.querySelector(`td[data-row="${$}"][data-col="${B}"]`);C&&(C.dataset.isheader=l.rows[$][B].isHeader?"1":"0",C.classList.toggle("is-header-cell",l.rows[$][B].isHeader)),y.classList.toggle("active",l.rows[$][B].isHeader),y.textContent=l.rows[$][B].isHeader?"✓ Resaltar":"Resaltar";return}if(h==="image"){window.__openTableImagePicker&&window.__openTableImagePicker(C=>{l.rows[$][B].image=C;const E=p.querySelector(`td[data-row="${$}"][data-col="${B}"]`);if(E){E.dataset.image=C,E.classList.add("has-image");let j=E.querySelector(".tam-cell-img-preview");j||(j=document.createElement("img"),j.className="tam-cell-img-preview",E.insertBefore(j,E.firstChild)),j.src=C;const z=E.querySelector("[data-action=image]");if(z&&(z.innerHTML='<i class="ri-image-line"></i> Cambiar'),!E.querySelector("[data-action=clear-image]")){const D=document.createElement("button");D.type="button",D.className="tam-cell-btn tam-cell-btn-clear",D.dataset.action="clear-image",D.dataset.row=$,D.dataset.col=B,D.textContent="✕ Quitar",D.addEventListener("click",Y=>{Y.preventDefault(),Y.stopPropagation(),l.rows[$][B].image=null,E.dataset.image="",E.classList.remove("has-image"),j.remove(),D.remove();const J=E.querySelector("[data-action=image]");J&&(J.innerHTML='<i class="ri-image-line"></i> Imagen')}),E.querySelector(".tam-cell-actions").appendChild(D)}}});return}h==="clear-image"&&(l.rows[$][B].image=null,u())}})})}document.getElementById("tam-close").addEventListener("click",f),document.getElementById("tam-cancel").addEventListener("click",f),a.addEventListener("click",m=>{m.target===a&&f()}),document.getElementById("tam-show-title-row").addEventListener("change",o),document.getElementById("tam-rebuild").addEventListener("click",()=>{const m=parseInt(document.getElementById("tam-cols").value)||3,p=parseInt(document.getElementById("tam-rows").value)||3;for(s(),d();l.headers.length<m;)l.headers.push({text:`Col ${l.headers.length+1}`,align:"center"});for(l.headers=l.headers.slice(0,m),l.cols=m;l.rows.length<p;)l.rows.push(Array.from({length:m},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})));l.rows=l.rows.slice(0,p).map(w=>{for(;w.length<m;)w.push({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null});return w.slice(0,m)}),u()}),document.getElementById("tam-apply").addEventListener("click",()=>{d();const m=document.getElementById("tam-theme").value;r&&(r.set("tableData",JSON.parse(JSON.stringify(l))),r.set("tableTheme",m),r.addAttributes({"data-table-theme":m}),Me(r)),f()}),window.__openTableAdminModal=g}function Me(t){const e=t.get("tableData"),i=t.get("tableTheme")||"blue";e&&t.components(jt(Lt(e,i),i))}function yr(){return function(){}}const vr=[{id:"table-blue",label:"Tabla azul",category:"Interactivos",media:hr,content:{type:"table-component",attributes:{"data-table-theme":"blue"}}},{id:"table-orange",label:"Tabla naranja",category:"Interactivos",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="6" rx="1" fill="#E97300"/>
            <rect x="2" y="10" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.3"/>
            <rect x="2" y="17" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
            <rect x="2" y="24" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
        </svg>`,content:{type:"table-component",attributes:{"data-table-theme":"orange"}}}];function wr(t){const e="table-component";xr(),t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Tabla",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,propagate:["editable","selectable","hoverable","droppable","highlightable"],tableData:null,tableTheme:"blue",attributes:{"data-gjs-type":e,"data-table-theme":"blue"},components:jt(Lt(Q(3,3),"blue"),"blue"),script:yr(),traits:[{type:"button",name:"edit-table",label:"Editar tabla",text:"Abrir editor de tabla",command(i){const a=i.getSelected();a&&window.__openTableAdminModal&&(a.get("tableData")||a.set("tableData",Q(3,3)),window.__openTableAdminModal(a))}},{type:"select",name:"data-table-theme",label:"Color del tema",options:[{id:"blue",name:"Azul"},{id:"orange",name:"Naranja"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e});const i=this.getAttributes()["data-table-theme"]||"blue";this.set("tableTheme",i),this.get("tableData")||(this.set("tableData",Q(3,3)),Me(this)),this.on("change:attributes",(a,r)=>{const l=r["data-table-theme"];l&&l!==this.get("tableTheme")&&(this.set("tableTheme",l),Me(this))})}}}),kr(t,e),Br(t,e)}function kr(t,e){t.on("component:mount",i=>{const a=i.getEl();if(a?.getAttribute?.("data-gjs-type")===e){i.set("type",e);const r=a.getAttribute("data-table-theme")||"blue";i.set("tableTheme",r),i.get("tableData")||i.set("tableData",Q(3,3))}}),t.on("storage:end:load",()=>{setTimeout(()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getAttributes()["data-table-theme"]||"blue";i.set("tableTheme",a),i.get("tableData")||i.set("tableData",Q(3,3))})},800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function Br(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a&&!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,a.appendChild(r)}})}const Er=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#003B71"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#003B71"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#003B71" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,$r=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#E97300"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#E97300"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#E97300" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Sr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#003B71"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Cr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#E97300"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Lr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#003B71"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,jr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#E97300"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,Tr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,_r=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,Ar=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#ffffff"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.5"/>
</svg>`,zr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,ht=t=>{const e=t==="#003B71"?"blue":"orange";return`
<div class="dld-full-wrap-${e}" style="display:inline-block;max-width:480px;width:100%;">
<style>
.dld-full-${e}{display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:12px;border:2px solid ${t};background:transparent;text-decoration:none;cursor:pointer;box-sizing:border-box;width:100%;transition:background 0.2s,border-color 0.2s;}
.dld-full-${e}:hover{background:${t} !important;border-color:${t} !important;}
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
         style="width:48px;height:48px;border-radius:12px;background:${t};display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background 0.2s;">
        <i class="ri-file-line" style="font-size:1.5rem;color:#ffffff;transition:color 0.2s;"></i>
    </div>
    <div style="display:flex;flex-direction:column;gap:2px;flex:1;min-width:0;">
        <span class="dld-full-${e}-filename" style="font-size:1rem;font-weight:700;color:${t};line-height:1.3;transition:color 0.2s;">Nombre del archivo</span>
        <span class="dld-full-${e}-label" style="font-size:0.875rem;font-weight:400;color:${t};opacity:0.7;transition:color 0.2s;">Haz clic para descargar</span>
    </div>
    <i class="dld-full-${e}-arrow ri-download-2-line" style="font-size:1.25rem;color:${t};flex-shrink:0;margin-left:8px;transition:color 0.2s;"></i>
</a>
</div>`},mt=t=>{const e=t==="#003B71"?"blue":"orange";return`
<div class="dld-simple-wrap-${e}" style="display:inline-block;max-width:480px;width:100%;">
<style>
.dld-simple-${e}{display:flex;align-items:center;gap:16px;padding:16px 20px;border-radius:12px;border:2px solid ${t};background:transparent;text-decoration:none;cursor:pointer;box-sizing:border-box;width:100%;transition:background 0.2s,border-color 0.2s;}
.dld-simple-${e}:hover{background:${t} !important;border-color:${t} !important;}
.dld-simple-${e}:hover .dld-simple-${e}-filename,
.dld-simple-${e}:hover .dld-simple-${e}-arrow{color:#ffffff !important;}
</style>
<a href="#"
   target="_self"
   class="dld-simple-${e}">
    <span class="dld-simple-${e}-filename" style="font-size:1rem;font-weight:700;color:${t};flex:1;transition:color 0.2s;">Nombre del archivo</span>
    <i class="dld-simple-${e}-arrow ri-download-2-line" style="font-size:1.25rem;color:${t};flex-shrink:0;transition:color 0.2s;"></i>
</a>
</div>`},bt={"button-fill-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-[#003B71] text-white transition-all duration-200 hover:bg-[#002a52] hover:border-[#002a52]","button-fill-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-[#E97300] text-white transition-all duration-200 hover:bg-[#c96200] hover:border-[#c96200]","button-outline-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-transparent text-[#003B71] transition-all duration-200 hover:bg-[#003B71] hover:text-white","button-outline-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-transparent text-[#E97300] transition-all duration-200 hover:bg-[#E97300] hover:text-white","button-fill-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-white text-[#003B71] transition-all duration-200 hover:bg-[#dce8f5] hover:border-[#dce8f5]","button-outline-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-transparent text-white transition-all duration-200 hover:bg-white hover:text-[#003B71]"},Ir=[{id:"button-fill-blue",label:"Botón azul sólido",category:"Botones",media:Lr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-blue"}}},{id:"button-fill-orange",label:"Botón naranja sólido",category:"Botones",media:jr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-orange"}}},{id:"button-outline-blue",label:"Botón azul outline",category:"Botones",media:Tr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-blue"}}},{id:"button-outline-orange",label:"Botón naranja outline",category:"Botones",media:_r,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-orange"}}},{id:"button-fill-white",label:"Botón blanco sólido",category:"Botones",media:Ar,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-white"}}},{id:"button-outline-white",label:"Botón blanco outline",category:"Botones",media:zr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-white"}}},{id:"button-download-full-blue",label:"Descarga completa azul",category:"Botones",media:Er,content:ht("#003B71")},{id:"button-download-full-orange",label:"Descarga completa naranja",category:"Botones",media:$r,content:ht("#E97300")},{id:"button-download-simple-blue",label:"Descarga simple azul",category:"Botones",media:Sr,content:mt("#003B71")},{id:"button-download-simple-orange",label:"Descarga simple naranja",category:"Botones",media:Cr,content:mt("#E97300")}];function qr(t){const e=[{type:"button",label:"Documento",name:"select-document",text:"Seleccionar documento",full:!0,command:"open-document-picker"},{type:"text",name:"href",label:"URL / Enlace",placeholder:"https://..."},{type:"select",name:"target",label:"Abrir en",options:[{id:"_self",name:"Misma ventana"},{id:"_blank",name:"Nueva ventana"}]}];t.DomComponents.addType("link",{model:{defaults:{traits:e}}}),t.DomComponents.addType("integral-button",{isComponent:r=>r.tagName==="A"&&r.hasAttribute("data-btn-variant"),model:{defaults:{tagName:"a",draggable:!0,droppable:!1,editable:!0,attributes:{href:"#",target:"_self","data-btn-variant":"button-fill-blue"},components:"Texto del botón",traits:e},init(){const r=this.getAttributes()["data-btn-variant"]??"button-fill-blue",l=bt[r]??bt["button-fill-blue"];this.setClass(l.split(" "))}}});function i(r,l){if(r.getEl()?.matches?.(l))return r;let g=null;const f=r.components?.();return f?(f.each(d=>{g||(g=i(d,l))}),g):null}function a(r,l){const g={pdf:"ri-file-pdf-line",xlsx:"ri-file-excel-line",xls:"ri-file-excel-line",doc:"ri-file-word-line",docx:"ri-file-word-line"}[l]??"ri-file-line";function f(c){const s=c.getEl?.();if(s?.tagName==="I"){const p=s.parentElement;if(p&&[...p.classList].some(w=>w.includes("-icon")))return c}let u=null;const m=c.components?.();return m?(m.each(p=>{u||(u=f(p))}),u):null}const d=f(r);if(d){const c=d.getClasses().find(s=>s.startsWith("ri-"));c&&d.removeClass(c),d.addClass(g)}else{const s=r.getEl()?.querySelector("[class*='-icon'] i");if(s){const u=[...s.classList].filter(m=>!m.startsWith("ri-"));s.className=[...u,g].join(" ")}}}t.Commands.add("open-document-picker",{run(r){const l=r.getSelected();if(l){if(r._documentPicker)try{r._documentPicker.destroy()}catch{}r._documentPicker=new qt,r._documentPicker.open(o=>{const g=o.filename.split(".").pop().toLowerCase();l.addAttributes({href:o.url});const f=l.getTrait("href");f&&f.set("value",o.url);const d=i(l,"[class*='-filename']");d&&d.components(o.filename),a(l,g)},{filters:{type:"document"}})}}})}const Dr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,Mr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,Nr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,Pr=[{id:"badge-outline-blue",label:"Badge azul outline",category:"Badges",media:Dr,content:'<span class="inline-block border border-[#003B71] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#003B71]">Etiqueta</span>'},{id:"badge-outline-orange",label:"Badge naranja outline",category:"Badges",media:Mr,content:'<span class="inline-block border border-[#E97300] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#E97300]">Etiqueta</span>'},{id:"badge-outline-white",label:"Badge blanco outline",category:"Badges",media:Nr,content:'<span class="inline-block border border-white rounded-full px-4 py-1 text-base font-medium bg-transparent text-white">Etiqueta</span>'}],Rr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <path d="M16 4c-4.4 0-8 3.6-8 8 0 6 8 16 8 16s8-10 8-16c0-4.4-3.6-8-8-8z" fill="#E97300"/>
    <circle cx="16" cy="12" r="3.2" fill="#ffffff"/>
    <rect x="3" y="26" width="26" height="2" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`,He=`
.mp-section{width:100%;background:#ffffff;padding:3.5rem 4rem;font-family:'Poppins',sans-serif;}
.mp-stats{font-size:1.125rem;font-weight:700;color:#003B71;margin:0 0 1.75rem;line-height:1.5;}
.mp-stats .mp-num{color:#E97300;}
.mp-title{font-size:1.75rem;font-weight:800;color:#E97300;margin:0 0 1.5rem;}
.mp-filters{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;margin-bottom:2rem;position:relative;z-index:30;}
.mp-filter{position:relative;}
.mp-filter-btn{display:flex;align-items:center;justify-content:space-between;width:100%;background:none;border:none;border-bottom:2px solid #E97300;padding:0.5rem 0.25rem 0.625rem;cursor:pointer;font-family:inherit;}
.mp-filter-label{font-size:0.9375rem;font-weight:700;color:#003B71;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.mp-filter-arrow{color:#003B71;font-size:0.75rem;transition:transform 0.2s ease;flex-shrink:0;margin-left:0.75rem;}
.mp-filter.mp-filter-open .mp-filter-arrow{transform:rotate(180deg);}
.mp-filter-dropdown{display:none;position:absolute;top:calc(100% + 0.625rem);left:0;right:0;background:#ffffff;border-radius:0.5rem;box-shadow:0 14px 36px rgba(0,0,0,0.2);overflow:hidden;max-height:260px;overflow-y:auto;}
.mp-filter.mp-filter-open .mp-filter-dropdown{display:block;}
.mp-filter-option{display:block;width:100%;text-align:center;padding:0.75rem 1rem;background:none;border:none;border-bottom:2px solid #E97300;font-size:0.875rem;font-weight:700;color:#003B71;cursor:pointer;font-family:inherit;transition:background 0.15s;}
.mp-filter-option:last-child{border-bottom:none;}
.mp-filter-option:hover{background:#f8fafc;}
.mp-filter-option:disabled{opacity:0.5;cursor:default;pointer-events:none;}
.mp-map-wrapper{position:relative;width:100%;height:440px;border-radius:0.5rem;overflow:hidden;}
.mp-map{width:100%;height:100%;z-index:1;}
.mp-map-overlay{position:absolute;inset:0;background:rgba(0,59,113,0.4);opacity:0;pointer-events:none;transition:opacity 0.2s ease;z-index:20;}
.mp-map-overlay.mp-overlay-active{opacity:1;}
.mp-pin{background:transparent!important;border:none!important;}
.mp-popup{font-family:'Poppins',sans-serif;min-width:180px;}
.mp-popup-name{margin:0 0 0.375rem;font-size:0.875rem;font-weight:700;color:#003B71;}
.mp-popup-line{margin:0 0 0.25rem;font-size:0.8125rem;color:#475569;display:flex;align-items:flex-start;gap:0.375rem;line-height:1.4;}
.mp-popup-line i{color:#E97300;margin-top:0.125rem;}
.mp-popup-line:last-child{margin-bottom:0;}
@media(max-width:1280px){.mp-section{padding:3rem 2.5rem;}}
@media(max-width:992px){
.mp-section{padding:2.5rem 1.5rem;}
.mp-filters{grid-template-columns:1fr;gap:1.25rem;}
.mp-map-wrapper{height:320px;}
}`;function Or(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const ve='data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"';function Tt(t,e){return e=e||"mp"+Math.random().toString(36).slice(2,7),`<section id="mp-root-${e}" class="mp-section" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <p class="mp-stats" data-mp-stats ${ve}>Cargando disponibilidad de agencias y puntos de pago...</p>
        <h2 class="mp-title" ${ve}>${Or(t.title||"Horarios y Agencias:")}</h2>
        <div class="mp-filters" data-mp-filters ${ve}>
            <div class="mp-filter" data-filter-index="0">
                <button type="button" class="mp-filter-btn" data-filter-toggle="0">
                    <span class="mp-filter-label" data-filter-label="0">Agencias / Puntos de pago</span>
                    <i class="ri-arrow-down-s-line mp-filter-arrow"></i>
                </button>
                <div class="mp-filter-dropdown">
                    <button type="button" class="mp-filter-option" data-type="">Todos</button>
                    <button type="button" class="mp-filter-option" data-type="agency">Agencias</button>
                    <button type="button" class="mp-filter-option" data-type="payment_point">Puntos de pago</button>
                </div>
            </div>
            <div class="mp-filter" data-filter-index="1">
                <button type="button" class="mp-filter-btn" data-filter-toggle="1">
                    <span class="mp-filter-label" data-filter-label="1">Departamento</span>
                    <i class="ri-arrow-down-s-line mp-filter-arrow"></i>
                </button>
                <div class="mp-filter-dropdown">
                    <button type="button" class="mp-filter-option" disabled>Cargando...</button>
                </div>
            </div>
            <div class="mp-filter" data-filter-index="2">
                <button type="button" class="mp-filter-btn" data-filter-toggle="2">
                    <span class="mp-filter-label" data-filter-label="2">Seleccione una ubicación</span>
                    <i class="ri-arrow-down-s-line mp-filter-arrow"></i>
                </button>
                <div class="mp-filter-dropdown">
                    <button type="button" class="mp-filter-option" disabled>Cargando...</button>
                </div>
            </div>
        </div>
        <div class="mp-map-wrapper" data-mp-map-wrapper ${ve}>
            <div class="mp-map" data-mp-map></div>
            <div class="mp-map-overlay" data-mp-overlay></div>
        </div>
    </section>`}const Ne={title:"Horarios y Agencias:"};function Hr(){return function(){const t=this,e=t.ownerDocument??document,i=".mp-section{width:100%;background:#ffffff;padding:3.5rem 4rem;font-family:'Poppins',sans-serif;}.mp-stats{font-size:1.125rem;font-weight:700;color:#003B71;margin:0 0 1.75rem;line-height:1.5;}.mp-stats .mp-num{color:#E97300;}.mp-title{font-size:1.75rem;font-weight:800;color:#E97300;margin:0 0 1.5rem;}.mp-filters{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;margin-bottom:2rem;position:relative;z-index:30;}.mp-filter{position:relative;}.mp-filter-btn{display:flex;align-items:center;justify-content:space-between;width:100%;background:none;border:none;border-bottom:2px solid #E97300;padding:0.5rem 0.25rem 0.625rem;cursor:pointer;font-family:inherit;}.mp-filter-label{font-size:0.9375rem;font-weight:700;color:#003B71;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.mp-filter-arrow{color:#003B71;font-size:0.75rem;transition:transform 0.2s ease;flex-shrink:0;margin-left:0.75rem;}.mp-filter.mp-filter-open .mp-filter-arrow{transform:rotate(180deg);}.mp-filter-dropdown{display:none;position:absolute;top:calc(100% + 0.625rem);left:0;right:0;background:#ffffff;border-radius:0.5rem;box-shadow:0 14px 36px rgba(0,0,0,0.2);overflow:hidden;max-height:260px;overflow-y:auto;}.mp-filter.mp-filter-open .mp-filter-dropdown{display:block;}.mp-filter-option{display:block;width:100%;text-align:center;padding:0.75rem 1rem;background:none;border:none;border-bottom:2px solid #E97300;font-size:0.875rem;font-weight:700;color:#003B71;cursor:pointer;font-family:inherit;transition:background 0.15s;}.mp-filter-option:last-child{border-bottom:none;}.mp-filter-option:hover{background:#f8fafc;}.mp-filter-option:disabled{opacity:0.5;cursor:default;pointer-events:none;}.mp-map-wrapper{position:relative;width:100%;height:440px;border-radius:0.5rem;overflow:hidden;}.mp-map{width:100%;height:100%;z-index:1;}.mp-map-overlay{position:absolute;inset:0;background:rgba(0,59,113,0.4);opacity:0;pointer-events:none;transition:opacity 0.2s ease;z-index:20;}.mp-map-overlay.mp-overlay-active{opacity:1;}.mp-pin{background:transparent!important;border:none!important;}.mp-popup{font-family:'Poppins',sans-serif;min-width:180px;}.mp-popup-name{margin:0 0 0.375rem;font-size:0.875rem;font-weight:700;color:#003B71;}.mp-popup-line{margin:0 0 0.25rem;font-size:0.8125rem;color:#475569;display:flex;align-items:flex-start;gap:0.375rem;line-height:1.4;}.mp-popup-line i{color:#E97300;margin-top:0.125rem;}.mp-popup-line:last-child{margin-bottom:0;}@media(max-width:1280px){.mp-section{padding:3rem 2.5rem;}}@media(max-width:992px){.mp-section{padding:2.5rem 1.5rem;}.mp-filters{grid-template-columns:1fr;gap:1.25rem;}.mp-map-wrapper{height:320px;}}";if(!e.getElementById("mp-filter-styles")){const n=e.createElement("style");n.id="mp-filter-styles",n.textContent=i,e.head.appendChild(n)}const a=t.querySelector("[data-mp-filters]"),r=t.querySelector("[data-mp-overlay]"),l=t.querySelector("[data-mp-map]"),o=t.querySelector("[data-mp-stats]");if(!a||!l)return;const g=[13.7942,-88.8965],f=8,d={departments:[],agencies:[],paymentPoints:[],type:null,department:null,pointKey:null};let c=null,s=null,u=null;function m(){a.querySelectorAll(".mp-filter.mp-filter-open").forEach(n=>n.classList.remove("mp-filter-open")),r&&r.classList.remove("mp-overlay-active")}function p(n){return String(n??"").replace(/[&<>"']/g,v=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[v])}function w(n){return p(n).replace(/\*\*(.+?)\*\*/g,'<span class="mp-num">$1</span>')}function k(n){if(!o)return;if(!n){o.textContent="No fue posible cargar la disponibilidad de agencias y puntos de pago.";return}const v=d.agencies.length,S=d.paymentPoints.length,T=`**${v}** agencias y **${S}** puntos de pago activos distribuidos en todo el país.`;o.innerHTML=w(T)}function b(n){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 42" width="30" height="42"><path d="M15 0C6.7 0 0 6.7 0 15c0 11.3 15 27 15 27s15-15.7 15-27C30 6.7 23.3 0 15 0z" fill="${n}"/><circle cx="15" cy="14" r="5.5" fill="#ffffff"/></svg>`}function y(n){return u.divIcon({className:"mp-pin",html:b(n),iconSize:[30,42],iconAnchor:[15,42],popupAnchor:[0,-38]})}function x(n){const v=[`<div class="mp-popup"><p class="mp-popup-name">${p(n.name)}</p>`];return n.address&&v.push(`<p class="mp-popup-line"><i class="ri-map-pin-2-line"></i> ${p(n.address)}</p>`),n.type==="agency"&&n.schedule&&v.push(`<p class="mp-popup-line"><i class="ri-time-line"></i> ${p(n.schedule)}</p>`),n.type==="payment_point"&&n.correspondent&&v.push(`<p class="mp-popup-line"><i class="ri-store-2-line"></i> ${p(n.correspondent)}</p>`),v.push("</div>"),v.join("")}function h(){return[...d.agencies,...d.paymentPoints]}function $(){return h().filter(n=>!(d.type&&n.type!==d.type||d.department&&n.department!==d.department))}function B(){!s||!u||(s.clearLayers(),$().forEach(n=>{const v=n.type==="agency"?"#E97300":"#003B71",S=u.marker([n.lat,n.lng],{icon:y(v)});S.bindPopup(x(n)),S.__mpKey=`${n.type}-${n.id}`,s.addLayer(S)}))}function C(){c&&c.flyTo(g,f)}function E(){const n=d.departments.find(v=>v.name===d.department);c&&n&&n.lat&&n.lng&&c.flyTo([n.lat,n.lng],n.zoom||11)}function j(){if(!c||!s)return;let n=null;s.eachLayer(v=>{v.__mpKey===d.pointKey&&(n=v)}),n&&(c.flyTo(n.getLatLng(),17),setTimeout(()=>n.openPopup(),350))}function z(){B(),d.pointKey?j():d.department?E():C()}function D(){const n=a.querySelector('[data-filter-index="2"] .mp-filter-dropdown'),v=a.querySelector('[data-filter-label="2"]');if(!n)return;const S=$(),T=['<button type="button" class="mp-filter-option" data-point-key="">Todas</button>'].concat(S.map(M=>`<button type="button" class="mp-filter-option" data-point-key="${M.type}-${M.id}">${p(M.name)}</button>`)).join("");n.innerHTML=T,d.pointKey=null,v&&(v.textContent="Seleccione una ubicación"),n.querySelectorAll(".mp-filter-option").forEach(M=>{M.addEventListener("click",()=>{const X=M.dataset.pointKey||"";d.pointKey=X||null,v&&(v.textContent=M.textContent),m(),z()})})}function Y(){const n=a.querySelector('[data-filter-index="1"] .mp-filter-dropdown');if(!n)return;const v=['<button type="button" class="mp-filter-option" data-dept="">Todos los departamentos</button>'].concat(d.departments.map(S=>`<button type="button" class="mp-filter-option" data-dept="${p(S.name)}">${p(S.name)}</button>`)).join("");n.innerHTML=v,n.querySelectorAll(".mp-filter-option").forEach(S=>{S.addEventListener("click",()=>{d.department=S.dataset.dept||null;const T=a.querySelector('[data-filter-label="1"]');T&&(T.textContent=S.textContent),m(),D(),z()})})}function J(){const n=a.querySelector('[data-filter-index="0"] .mp-filter-dropdown');n&&n.querySelectorAll(".mp-filter-option").forEach(v=>{v.addEventListener("click",()=>{d.type=v.dataset.type||null;const S=a.querySelector('[data-filter-label="0"]');S&&(S.textContent=v.textContent),m(),D(),z()})})}a.__mpBound||(a.__mpBound=!0,a.querySelectorAll("[data-filter-toggle]").forEach(n=>{n.addEventListener("click",v=>{v.stopPropagation();const S=n.closest(".mp-filter"),T=S.classList.contains("mp-filter-open");m(),T||(S.classList.add("mp-filter-open"),r&&r.classList.add("mp-overlay-active"))})}),e.addEventListener("click",n=>{t.contains(n.target)&&(n.target.closest(".mp-filter")||m())}));async function K(){if(!e.getElementById("leaflet-css")){const v=e.createElement("link");v.id="leaflet-css",v.rel="stylesheet",v.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",e.head.appendChild(v)}const n=e.defaultView??window;return typeof n.L>"u"&&await new Promise((v,S)=>{const T=e.createElement("script");T.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",T.onload=v,T.onerror=S,e.head.appendChild(T)}),n.L}function pe(){const n=e.querySelector('meta[name="map-locations-url"]')?.content;if(n)return n;try{const S=window.top?.document?.querySelector('meta[name="map-locations-url"]')?.content;if(S)return S}catch{}return"/api/map-locations"}async function ge(){try{const n=pe(),v=await fetch(n,{headers:{Accept:"application/json"}});if(!v.ok)throw new Error("No se pudo cargar la información del mapa");const S=await v.json();return d.departments=S.departments||[],d.agencies=S.agencies||[],d.paymentPoints=S.payment_points||[],!0}catch(n){return console.warn("[MapFilter] Error al cargar datos:",n),!1}}async function ee(){if(!(!l||l.__mpMapInit))try{if(u=await K(),!u||l.__mpMapInit)return;l.__mpMapInit=!0,c=u.map(l,{zoomControl:!0}).setView(g,f),l._map=c,u.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(c),s=u.layerGroup().addTo(c),c.whenReady(function(){setTimeout(()=>{c&&c.invalidateSize&&c.invalidateSize()},300)});const n=await ge();k(n),J(),Y(),D(),z()}catch(n){console.warn("No se pudo inicializar el mapa:",n)}}ee()}}function Fr(t,e){const i=document.getElementById("map-filter-config-modal");if(i&&i.remove(),!document.getElementById("mp-modal-styles")){const f=document.createElement("style");f.id="mp-modal-styles",f.textContent=`
            .mp-overlay-modal{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .mp-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:520px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .mp-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .mp-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .mp-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .mp-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .mp-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .mp-modal-close:hover{background:#f1f5f9;color:#475569;}
            .mp-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .mp-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .mp-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .mp-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .mp-input:focus{border-color:#3b82f6;}
            .mp-hint{font-size:0.75rem;color:#94a3b8;margin:0.375rem 0 0;}
            .mp-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .mp-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .mp-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .mp-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .mp-btn-save:hover{background:#d97821;}
        `,document.head.appendChild(f)}const r=(()=>{try{return JSON.parse(e.getAttributes()["data-map-config"]||"{}")}catch{return{}}})().title||Ne.title,l=document.createElement("div");l.id="map-filter-config-modal",l.className="mp-overlay-modal";const o=document.createElement("div");o.className="mp-modal",o.innerHTML=`
        <div class="mp-modal-header">
            <div class="mp-modal-header-left"><i class="ri-map-2-line"></i><h2>Configurar Mapa y Filtros</h2></div>
            <button id="mp-modal-close" class="mp-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="mp-modal-body">
            <div class="mp-card">
                <label class="mp-label">Título</label>
                <input id="mp-title" type="text" value="${r}" class="mp-input">
            </div>
            <p class="mp-hint">El texto de estadísticas, los filtros y las ubicaciones del mapa se generan automáticamente a partir de las agencias y puntos de pago activos con coordenadas registrados en el sistema. Este bloque no admite edición de contenido interno.</p>
        </div>
        <div class="mp-modal-footer">
            <button id="mp-modal-cancel" class="mp-btn-cancel">Cancelar</button>
            <button id="mp-modal-save" class="mp-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`,l.appendChild(o),document.body.appendChild(l);const g=()=>l.remove();o.querySelector("#mp-modal-close").onclick=g,o.querySelector("#mp-modal-cancel").onclick=g,l.onclick=f=>{f.target===l&&g()},o.querySelector("#mp-modal-save").onclick=()=>{const f={title:o.querySelector("#mp-title").value.trim()},c=e.getEl()?.querySelector("[id^='mp-root-']")?.id?.replace("mp-root-","")||"mp"+Math.random().toString(36).slice(2,7);e.addAttributes({"data-map-config":JSON.stringify(f)}),e.components(Tt(f,c)+`<style>${He}</style>`),g()}}const Ur=[{id:"map-filter-block",label:"Mapa con Filtros",category:"Interactivos",media:Rr,content:{type:"map-filter-component"}}];function Vr(t){const e="map-filter-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Mapa con Filtros",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,stylable:!1,resizable:!1,layerable:!0,highlightable:!1,attributes:{"data-gjs-type":e,"data-map-config":JSON.stringify(Ne)},components:Tt(Ne)+`<style>${He}</style>`,script:Hr(),traits:[{type:"button",label:"Mapa con Filtros",text:"Administrar Mapa y Filtros",full:!0,command:"open-map-filter-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-map-filter-config",{run(i){const a=i.getSelected();a&&Fr(i,a)}}),Yr(t,e),Xr(t,e)}function Yr(t,e){t.on("storage:end:load",()=>{setTimeout(()=>ut(t,e),1e3)}),t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();if(a){const r=a.querySelector("[data-mp-map]");r&&r._map&&(r._map.remove(),delete r._map,delete r.__mpMapInit),setTimeout(()=>{const l=i.get("script");l&&typeof l=="function"&&l.call(a)},500)}}}),t.on("canvas:render",()=>{setTimeout(()=>ut(t,e),800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function ut(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})}function Xr(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#leaflet-css")){const r=document.createElement("link");r.id="leaflet-css",r.rel="stylesheet",r.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",a.appendChild(r)}if(!a.querySelector("#mp-filter-styles")){const r=document.createElement("style");r.id="mp-filter-styles",r.textContent=He,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=".leaflet-container{height:100%;width:100%;border-radius:inherit;z-index:0;}",a.appendChild(r)}}})}const Gr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <circle cx="23" cy="14" r="5" fill="#E97300"/>
    <circle cx="23" cy="14" r="4" fill="#f8e7d8"/>
</svg>`,Wr=`
.banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}
.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;display:grid;}
.banner-slide-container:active{cursor:grabbing;}
.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}
.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}
.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}
.banner-bg{position:absolute;inset:0;z-index:0;}
.banner-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.banner-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}
.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}
.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}
.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}
.banner-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}
.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}
.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}
.banner-btn--fill-blue{background:#003B71;color:#ffffff;border:2px solid #003B71;}
.banner-btn--fill-blue:hover{background:#002a52;border-color:#002a52;color:#ffffff;}
.banner-btn--outline-blue{background:transparent;color:#003B71;border:2px solid #003B71;}
.banner-btn--outline-blue:hover{background:#003B71;border-color:#003B71;color:#ffffff;}
.banner-btn--fill-orange{background:#E97300;color:#ffffff;border:2px solid #E97300;}
.banner-btn--fill-orange:hover{background:#c96200;border-color:#c96200;color:#ffffff;}
.banner-btn--outline-orange{background:transparent;color:#E97300;border:2px solid #E97300;}
.banner-btn--outline-orange:hover{background:#E97300;border-color:#E97300;color:#ffffff;}
.banner-btn--fill-white{background:#ffffff;color:#003B71;border:2px solid #ffffff;}
.banner-btn--fill-white:hover{background:#dce8f5;border-color:#dce8f5;color:#003B71;}
.banner-btn--outline-white{background:transparent;color:#ffffff;border:2px solid #ffffff;}
.banner-btn--outline-white:hover{background:#ffffff;border-color:#ffffff;color:#003B71;}
.banner-dots-wrapper{display:none;}
.banner-stripe{position:relative;width:100%;height:26px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}
.banner-dots{display:flex;gap:8px;align-items:center;}
.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}
.banner-dot--active{width:28px;background:#ffffff;}
.banner-empty{display:flex;align-items:center;justify-content:center;min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;}
@media(max-width:768px){
    .banner-slide-inner{min-height:340px;}
    .banner-bg img{object-position:right center;}
    .banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}
    .banner-buttons{flex-wrap:wrap;gap:12px;}
    .banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}
}
@media(max-width:480px){
    .banner-btn{flex:1 1 100%;min-width:0;}
}`,Jr=`
@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}
.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-title--short{width:60%;}
.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-line--short{width:55%;}
.bsk-buttons{display:flex;gap:16px;margin-top:36px;}
.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
@media(max-width:768px){.bsk-buttons{flex-direction:column;}}`;function Kr(){return function(){const t=this,e=t.ownerDocument??document,i="/adminintegral",a=(e.defaultView??window).location.origin,r=e.querySelector('meta[name="api-banners-url"]')?.content||`${a}${i}/api/banners/active`,l=["fill-blue","outline-blue","fill-orange","outline-orange","fill-white","outline-white"],o=".banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;display:grid;}.banner-slide-container:active{cursor:grabbing;}.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}.banner-bg{position:absolute;inset:0;z-index:0;}.banner-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.banner-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.banner-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.banner-btn--fill-blue{background:#003B71;color:#ffffff;border:2px solid #003B71;}.banner-btn--fill-blue:hover{background:#002a52;border-color:#002a52;color:#ffffff;}.banner-btn--outline-blue{background:transparent;color:#003B71;border:2px solid #003B71;}.banner-btn--outline-blue:hover{background:#003B71;border-color:#003B71;color:#ffffff;}.banner-btn--fill-orange{background:#E97300;color:#ffffff;border:2px solid #E97300;}.banner-btn--fill-orange:hover{background:#c96200;border-color:#c96200;color:#ffffff;}.banner-btn--outline-orange{background:transparent;color:#E97300;border:2px solid #E97300;}.banner-btn--outline-orange:hover{background:#E97300;border-color:#E97300;color:#ffffff;}.banner-btn--fill-white{background:#ffffff;color:#003B71;border:2px solid #ffffff;}.banner-btn--fill-white:hover{background:#dce8f5;border-color:#dce8f5;color:#003B71;}.banner-btn--outline-white{background:transparent;color:#ffffff;border:2px solid #ffffff;}.banner-btn--outline-white:hover{background:#ffffff;border-color:#ffffff;color:#003B71;}.banner-dots-wrapper{display:none;}.banner-stripe{position:relative;width:100%;height:26px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}.banner-dots{display:flex;gap:8px;align-items:center;}.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}.banner-dot--active{width:28px;background:#ffffff;}.banner-empty{display:flex;align-items:center;justify-content:center;min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;}@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}",g="@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title--short{width:60%;}.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-line--short{width:55%;}.bsk-buttons{display:flex;gap:16px;margin-top:36px;}.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}@media(max-width:768px){.bsk-buttons{flex-direction:column;}}";(function(){if(!e.getElementById("banner-hero-styles")){const v=e.createElement("style");v.id="banner-hero-styles",v.textContent=o,e.head.appendChild(v)}if(!e.getElementById("banner-skeleton-styles")){const v=e.createElement("style");v.id="banner-skeleton-styles",v.textContent=g,e.head.appendChild(v)}})();let f=[],d=0,c=null,s=!1,u=0,m=0;const p=50,w=t.dataset.autoplay!=="false",k=t.dataset.category??"",b=t.querySelector(".banner-slide-container"),y=t.querySelector(".banner-stripe");if(!b||!y)return;function x(n){return l.indexOf(n)!==-1?n:n==="outline-blue"||n==="outline-orange"?"outline-white":"fill-white"}function h(n,v,S,T){const M=x(S),X=v?"a":"span",Te=v?`href="${v}"${T?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${X} ${Te} class="banner-btn banner-btn--${M}">${n}</${X}>`}async function $(){if(!t.__bannerLoading){t.__bannerLoading=!0,B();try{const n=await fetch(r,{headers:{Accept:"application/json"}});if(!n.ok){ee();return}const v=await n.json();if(f=Array.isArray(v)?k?v.filter(S=>S.category===k):v:[],f.length===0){ee();return}C(),J(),K(0,!1),w&&pe()}catch{ee()}finally{t.__bannerLoading=!1}}}function B(){b.innerHTML=`
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
                </div>`,y.innerHTML=""}function C(){b.innerHTML=f.map((n,v)=>`
                <div class="banner-slide" data-index="${v}">
                    <div class="banner-slide-inner">
                        <div class="banner-bg">
                            <img src="${n.image_url}"
                                 alt="${n.image_alt??n.title}"
                                 loading="${v===0?"eager":"lazy"}"
                                 decoding="async"
                                 fetchpriority="${v===0?"high":"low"}"
                                 draggable="false">
                        </div>
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            ${n.category?`<span class="banner-category-badge">${n.category}</span>`:""}
                            <h2 class="banner-title">${n.title}</h2>
                            <p class="banner-description">${n.description}</p>
                            ${n.btn_primary_text||n.btn_secondary_text?`<div class="banner-buttons">
                                    ${n.btn_primary_text?h(n.btn_primary_text,n.btn_primary_url,n.btn_primary_style,n.btn_primary_external):""}
                                    ${n.btn_secondary_text?h(n.btn_secondary_text,n.btn_secondary_url,n.btn_secondary_style,n.btn_secondary_external):""}
                                </div>`:""}
                        </div>
                    </div>
                </div>`).join(""),E(),j()}function E(){b.addEventListener("mousedown",z),b.addEventListener("touchstart",z,{passive:!0}),b.addEventListener("mousemove",D),b.addEventListener("touchmove",D,{passive:!0}),b.addEventListener("mouseup",Y),b.addEventListener("touchend",Y),b.addEventListener("mouseleave",Y)}function j(){f.forEach(n=>{const v=new Image;v.src=n.image_url})}function z(n){s=!0,u=n.touches?n.touches[0].clientX:n.clientX,m=0}function D(n){s&&(m=(n.touches?n.touches[0].clientX:n.clientX)-u)}function Y(){s&&(s=!1,Math.abs(m)>=p&&(K(m<0?(d+1)%f.length:(d-1+f.length)%f.length),ge()),m=0)}function J(){if(f.length<=1){y.innerHTML="";return}const n=e.createElement("div");n.className="banner-dots",f.forEach((v,S)=>{const T=e.createElement("button");T.className="banner-dot",T.type="button",T.dataset.index=String(S),T.setAttribute("aria-label",`Banner ${S+1}`),T.addEventListener("click",()=>{K(S),ge()}),n.appendChild(T)}),y.innerHTML="",y.appendChild(n)}function K(n,v=!0){const S=b.querySelectorAll(".banner-slide"),T=t.querySelectorAll(".banner-dot");S.forEach((M,X)=>{const Te=X===n;v||(M.style.transition="none"),M.classList.toggle("banner-slide--active",Te),v||requestAnimationFrame(()=>{M.style.transition=""})}),T.forEach((M,X)=>M.classList.toggle("banner-dot--active",X===n)),d=n}function pe(){f.length<=1||!w||(c=setInterval(()=>K((d+1)%f.length),5e3))}function ge(){w&&(clearInterval(c),pe())}function ee(){clearInterval(c),b.innerHTML=`
                <div class="banner-slide banner-slide--active">
                    <div class="banner-empty">Sin contenido.</div>
                </div>`,y.innerHTML=""}e.readyState==="loading"?e.addEventListener("DOMContentLoaded",$):$()}}function Zr(t,e){const i=document.getElementById("banner-hero-config-modal");if(i&&i.remove(),!document.getElementById("bnr-modal-styles")){const p=document.createElement("style");p.id="bnr-modal-styles",p.textContent=`
            .bnr-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .bnr-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:480px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .bnr-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .bnr-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .bnr-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .bnr-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .bnr-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .bnr-modal-close:hover{background:#f1f5f9;color:#475569;}
            .bnr-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .bnr-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .bnr-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .bnr-row{display:flex;gap:0.75rem;align-items:center;justify-content:space-between;}
            .bnr-select{width:100%;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;box-sizing:border-box;}
            .bnr-select:focus{border-color:#3b82f6;}
            .bnr-switch{position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;}
            .bnr-switch input{opacity:0;width:0;height:0;}
            .bnr-switch-slider{position:absolute;inset:0;background:#cbd5e1;border-radius:9999px;transition:background 0.2s;cursor:pointer;}
            .bnr-switch-knob{position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:left 0.2s;pointer-events:none;}
            .bnr-hint{font-size:0.75rem;color:#94a3b8;margin:0;}
            .bnr-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .bnr-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .bnr-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .bnr-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .bnr-btn-save:hover{background:#d97821;}
        `,document.head.appendChild(p)}const a=e.getAttributes(),r=a["data-autoplay"]!=="false",l=a["data-category"]||"",o=document.createElement("div");o.id="banner-hero-config-modal",o.className="bnr-overlay";const g=document.createElement("div");g.className="bnr-modal",g.innerHTML=`
        <div class="bnr-modal-header">
            <div class="bnr-modal-header-left"><i class="ri-slideshow-line"></i><h2>Configurar Banner Slider</h2></div>
            <button id="bnr-modal-close" class="bnr-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="bnr-modal-body">
            <div class="bnr-card">
                <div class="bnr-row">
                    <label class="bnr-label" style="margin:0;">Avance automático</label>
                    <label class="bnr-switch">
                        <input type="checkbox" id="bnr-autoplay" ${r?"checked":""}>
                        <span class="bnr-switch-slider" id="bnr-autoplay-slider"></span>
                        <span class="bnr-switch-knob" id="bnr-autoplay-knob"></span>
                    </label>
                </div>
            </div>
            <div class="bnr-card">
                <label class="bnr-label">Filtrar por categoría</label>
                <select id="bnr-category" class="bnr-select">
                    <option value="">Todas las categorías</option>
                </select>
                <p class="bnr-hint" style="margin-top:0.5rem;">Solo se mostrarán banners activos que pertenezcan a la categoría seleccionada.</p>
            </div>
        </div>
        <div class="bnr-modal-footer">
            <button id="bnr-modal-cancel" class="bnr-btn-cancel">Cancelar</button>
            <button id="bnr-modal-save" class="bnr-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`,o.appendChild(g),document.body.appendChild(o);const f=g.querySelector("#bnr-autoplay"),d=g.querySelector("#bnr-autoplay-slider"),c=g.querySelector("#bnr-autoplay-knob"),s=()=>{d.style.background=f.checked?"#003B71":"#cbd5e1",c.style.left=f.checked?"21px":"3px"};s(),f.addEventListener("change",s);const u=g.querySelector("#bnr-category");(async()=>{try{const w=document.querySelector('meta[name="api-banners-url"]')?.content||`${window.location.origin}/adminintegral/api/banners/active`,k=await fetch(w,{headers:{Accept:"application/json"}});if(!k.ok)return;const b=await k.json();if(!Array.isArray(b))return;[...new Set(b.map(x=>x.category).filter(Boolean))].sort().forEach(x=>{const h=document.createElement("option");h.value=x,h.textContent=x,u.appendChild(h)}),u.value=l}catch{}})();const m=()=>o.remove();g.querySelector("#bnr-modal-close").onclick=m,g.querySelector("#bnr-modal-cancel").onclick=m,o.onclick=p=>{p.target===o&&m()},g.querySelector("#bnr-modal-save").onclick=()=>{e.addAttributes({"data-autoplay":f.checked?"true":"false","data-category":u.value||""}),m()}}const Qr=[{id:"banner-hero",label:"Banner Slider",category:"Banners",media:Gr,content:{type:"banner-hero-component"}}];function el(t){const e="banner-hero-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Slider",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-autoplay":"true","data-category":""},components:`
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
                `,script:Kr(),traits:[{type:"button",label:"Banner Slider",text:"Administrar Banner Slider",full:!0,command:"open-banner-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const i=this.getEl();if(!i)return;const a=this.get("script");a&&typeof a=="function"&&setTimeout(()=>a.call(i),100)})}}}),t.Commands.add("open-banner-config",{run(i){const a=i.getSelected();a&&Zr(i,a)}}),tl(t,e),il(t,e)}function tl(t,e){t.on("storage:end:load",()=>{setTimeout(()=>xt(t,e),1e3)}),t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();a&&setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500)}}),t.on("canvas:render",()=>{setTimeout(()=>xt(t,e),800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function xt(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})}function il(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#banner-hero-styles")){const r=document.createElement("style");r.id="banner-hero-styles",r.textContent=Wr,a.appendChild(r)}if(!a.querySelector("#banner-skeleton-styles")){const r=document.createElement("style");r.id="banner-skeleton-styles",r.textContent=Jr,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`[data-gjs-type="${e}"] * { pointer-events: none !important; } [data-gjs-type="${e}"].gjs-selected, [data-gjs-type="${e}"].gjs-hovered { outline: 2px dashed rgba(240,135,42,0.6) !important; outline-offset: 2px; }`,a.appendChild(r)}}})}const al=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="10" width="12" height="19" fill="none" stroke="#003B71" stroke-width="1" rx="1"/>
    <rect x="5.5" y="13" width="2.5" height="2.5" fill="#003B71" fill-opacity="0.5"/>
    <rect x="10" y="13" width="2.5" height="2.5" fill="#003B71" fill-opacity="0.5"/>
    <rect x="5.5" y="17.5" width="2.5" height="2.5" fill="#003B71" fill-opacity="0.5"/>
    <rect x="10" y="17.5" width="2.5" height="2.5" fill="#003B71" fill-opacity="0.5"/>
    <rect x="7" y="23" width="4" height="6" fill="#003B71" fill-opacity="0.7"/>
    <rect x="2" y="26" width="28" height="1.5" rx="0.75" fill="#E97300"/>
    <path d="M17 24c0-1.5 1-2.5 2.5-2.5h6c1.5 0 2.5 1 2.5 2.5v1.5h-11V24z" fill="#E97300" fill-opacity="0.85"/>
    <rect x="16.5" y="25" width="12" height="2.5" rx="1" fill="#E97300"/>
    <circle cx="19" cy="27.8" r="1.3" fill="#003B71"/>
    <circle cx="26" cy="27.8" r="1.3" fill="#003B71"/>
</svg>`,rl=`
.ast-section {
    width: 100%;
    background: #ffffff;
    padding: 3rem 4rem;
    font-family: 'Poppins', sans-serif;
}

.ast-header {
    font-size: 1.125rem;
    font-weight: 700;
    color: #003B71;
    margin: 0 0 1.25rem;
}

.ast-stripe {
    width: 100%;
    height: 3px;
    background: #E97300;
    margin-bottom: 1.5rem;
}

.ast-tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 2px solid #E97300;
    margin-bottom: 1.25rem;
}

.ast-tab {
    padding: 1rem 1.5rem;
    background: #ffffff;
    border: none;
    font-size: 1.0625rem;
    font-weight: 700;
    color: #003B71;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, color 0.15s;
}

.ast-tab--active {
    background: #E97300;
    color: #ffffff;
}

.ast-group {
    margin-bottom: 2.5rem;
}

.ast-group:last-child {
    margin-bottom: 0;
}

.ast-subtitle {
    font-size: 1.0625rem;
    font-weight: 700;
    color: #003B71;
    margin: 0 0 0.5rem;
}

.ast-subtitle-stripe {
    width: 120px;
    height: 2px;
    background: #E97300;
    margin-bottom: 1.5rem;
}

.ast-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

.ast-card {
    display: block;
    background: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-decoration: none;
    transition: box-shadow 0.2s ease;
}

.ast-card:hover {
    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.16);
}

.ast-card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.ast-card-body {
    padding: 0.75rem 0.875rem;
}

.ast-card-name {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #003B71;
    line-height: 1.4;
    margin: 0 0 0.25rem;
}

.ast-card-desc {
    font-size: 0.75rem;
    color: #003B71;
    line-height: 1.4;
    margin: 0;
}

.ast-empty {
    padding: 3rem 1rem;
    text-align: center;
    color: #94a3b8;
    font-size: 0.875rem;
}

.ast-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 4rem 1rem;
    color: #94a3b8;
    font-size: 0.875rem;
}

.ast-spinner {
    width: 2.25rem;
    height: 2.25rem;
    border: 3px solid #e5e7eb;
    border-top-color: #E97300;
    border-radius: 50%;
    animation: ast-spin 0.8s linear infinite;
}

@keyframes ast-spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 1280px) {
    .ast-section {
        padding: 3rem 2.5rem;
    }
    .ast-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 992px) {
    .ast-section {
        padding: 2.5rem 1.5rem;
    }
    .ast-tab {
        padding: 0.75rem 1.125rem;
        font-size: 0.9375rem;
    }
    .ast-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .ast-grid {
        grid-template-columns: 1fr;
    }
}
`;function ll(){return function(){const t=this,e=t.ownerDocument??document;e.defaultView;const i=e.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??"",a=e.querySelector('meta[name="api-assets-url"]')?.content||(i?`${i}/api/assets/active`:""),r=`
.ast-section {
    width: 100%;
    background: #ffffff;
    padding: 3rem 4rem;
    font-family: 'Poppins', sans-serif;
}

.ast-header {
    font-size: 1.125rem;
    font-weight: 700;
    color: #003B71;
    margin: 0 0 1.25rem;
}

.ast-stripe {
    width: 100%;
    height: 3px;
    background: #E97300;
    margin-bottom: 1.5rem;
}

.ast-tabs {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    border-bottom: 2px solid #E97300;
    margin-bottom: 1.25rem;
}

.ast-tab {
    padding: 1rem 1.5rem;
    background: #ffffff;
    border: none;
    font-size: 1.0625rem;
    font-weight: 700;
    color: #003B71;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s, color 0.15s;
}

.ast-tab--active {
    background: #E97300;
    color: #ffffff;
}

.ast-group {
    margin-bottom: 2.5rem;
}

.ast-group:last-child {
    margin-bottom: 0;
}

.ast-subtitle {
    font-size: 1.0625rem;
    font-weight: 700;
    color: #003B71;
    margin: 0 0 0.5rem;
}

.ast-subtitle-stripe {
    width: 120px;
    height: 2px;
    background: #E97300;
    margin-bottom: 1.5rem;
}

.ast-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

.ast-card {
    display: block;
    background: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-decoration: none;
    transition: box-shadow 0.2s ease;
}

.ast-card:hover {
    box-shadow: 0 8px 26px rgba(0, 0, 0, 0.16);
}

.ast-card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    display: block;
}

.ast-card-body {
    padding: 0.75rem 0.875rem;
}

.ast-card-name {
    font-size: 0.8125rem;
    font-weight: 700;
    color: #003B71;
    line-height: 1.4;
    margin: 0 0 0.25rem;
}

.ast-card-desc {
    font-size: 0.75rem;
    color: #003B71;
    line-height: 1.4;
    margin: 0;
}

.ast-empty {
    padding: 3rem 1rem;
    text-align: center;
    color: #94a3b8;
    font-size: 0.875rem;
}

.ast-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 4rem 1rem;
    color: #94a3b8;
    font-size: 0.875rem;
}

.ast-spinner {
    width: 2.25rem;
    height: 2.25rem;
    border: 3px solid #e5e7eb;
    border-top-color: #E97300;
    border-radius: 50%;
    animation: ast-spin 0.8s linear infinite;
}

@keyframes ast-spin {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 1280px) {
    .ast-section {
        padding: 3rem 2.5rem;
    }
    .ast-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 992px) {
    .ast-section {
        padding: 2.5rem 1.5rem;
    }
    .ast-tab {
        padding: 0.75rem 1.125rem;
        font-size: 0.9375rem;
    }
    .ast-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 640px) {
    .ast-grid {
        grid-template-columns: 1fr;
    }
}
`;if(!e.getElementById("assets-block-styles")){const b=e.createElement("style");b.id="assets-block-styles",b.textContent=r,e.head.appendChild(b)}const l=t.querySelector("[data-ast-tabs]"),o=t.querySelector("[data-ast-content]");if(!l||!o)return;const g=t.dataset.defaultCategory||"";let f=[],d="";function c(b,y){return b?b.length>y?`${b.slice(0,y).trim()}...`:b:""}function s(b){const y=b.link_is_external?' target="_blank" rel="noopener noreferrer"':"",x=b.name||c(b.short_description,60),h=b.name||b.short_description||"Activo extraordinario";return`<a href="${b.link_url}"${y} class="ast-card">
                <img src="${b.image_url}" alt="${h}" class="ast-card-img" loading="lazy">
                <div class="ast-card-body">
                    <p class="ast-card-name">${x}</p>
                    ${b.name&&b.short_description?`<p class="ast-card-desc">${b.short_description}</p>`:""}
                </div>
            </a>`}function u(){const b=[],y=new Set;return f.forEach(x=>{y.has(x.category_slug)||(y.add(x.category_slug),b.push({slug:x.category_slug,name:x.category}))}),b.sort((x,h)=>x.name.localeCompare(h,"es",{sensitivity:"base"}))}function m(b,y){const x=y.length?y.map(s).join(""):'<div class="ast-empty">No hay activos extraordinarios disponibles en esta categoría.</div>';return`<div class="ast-group">
                <p class="ast-subtitle">${b}</p>
                <div class="ast-subtitle-stripe"></div>
                <div class="ast-grid">${x}</div>
            </div>`}function p(){if(d){const y=f.filter(h=>h.category_slug===d),x=y[0]?.category||u().find(h=>h.slug===d)?.name||"";o.innerHTML=m(x,y);return}const b=u();o.innerHTML=b.map(y=>m(y.name,f.filter(x=>x.category_slug===y.slug))).join("")}function w(){const y=['<button type="button" class="ast-tab ast-tab--active" data-tab-slug="">Todos</button>',...u().map(x=>`<button type="button" class="ast-tab" data-tab-slug="${x.slug}">${x.name}</button>`)].join("");if(l.innerHTML=y,l.querySelectorAll("[data-tab-slug]").forEach(x=>{x.addEventListener("click",()=>{l.querySelectorAll(".ast-tab").forEach(h=>h.classList.remove("ast-tab--active")),x.classList.add("ast-tab--active"),d=x.dataset.tabSlug,p()})}),g){const x=l.querySelector(`[data-tab-slug="${g}"]`);x&&x.click()}}async function k(){if(!a){l.innerHTML='<button type="button" class="ast-tab ast-tab--active">Todos</button>',o.innerHTML='<div class="ast-empty">Vista previa del catálogo (los datos reales se cargan en el sitio publicado).</div>';return}o.innerHTML=`
                <div class="ast-loading">
                    <div class="ast-spinner"></div>
                    <span>Cargando activos extraordinarios...</span>
                </div>`;try{const b=await fetch(a,{headers:{Accept:"application/json"}});if(!b.ok){o.innerHTML='<div class="ast-empty">No se pudieron cargar los activos extraordinarios.</div>';return}if(f=await b.json(),!Array.isArray(f)||f.length===0){l.innerHTML='<button type="button" class="ast-tab ast-tab--active">Todos</button>',o.innerHTML='<div class="ast-empty">No hay activos extraordinarios disponibles.</div>';return}w(),p()}catch{o.innerHTML='<div class="ast-empty">No se pudieron cargar los activos extraordinarios.</div>'}}e.readyState==="loading"?e.addEventListener("DOMContentLoaded",k):k()}}const ol=[{id:"assets-catalog",label:"Catálogo de Activos Extraordinarios",category:"Interactivos",media:al,content:{type:"assets-catalog-component"}}];function nl(t){const e="assets-catalog-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Catálogo de Activos Extraordinarios",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-default-category":"",class:"ast-section"},components:`
                    <p class="ast-header" contenteditable="true" data-gjs-type="text" data-gjs-editable="true" data-gjs-selectable="false" data-gjs-hoverable="false">Mayor información a: 0000-0000</p>
                    <div class="ast-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div class="ast-tabs" data-ast-tabs data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div data-ast-content data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                `,script:ll(),traits:[{type:"select",name:"data-default-category",label:"Categoría inicial",options:[{id:"",name:"Todas (mostrar 'Todos')"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const i=this.getEl();if(!i)return;const a=this.get("script");a&&typeof a=="function"&&setTimeout(()=>a.call(i),100)})}}}),cl(t,e),dl(t,e),sl(t,e)}async function sl(t,e){try{const i=document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??"",a=await fetch(`${i}/api/asset-categories/all`,{headers:{Accept:"application/json"}});if(!a.ok)return;const r=await a.json();if(!Array.isArray(r)||r.length===0)return;const l=t.DomComponents.getType(e);if(!l)return;const g=l.model.prototype.defaults.traits.find(f=>f.name==="data-default-category");if(!g)return;g.options=[{id:"",name:"Todas (mostrar 'Todos')"},...r.map(f=>({id:f.slug,name:f.name}))]}catch{}}function cl(t,e){t.on("storage:end:load",()=>{setTimeout(()=>yt(t,e),1e3)}),t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500))}),t.on("canvas:render",()=>{setTimeout(()=>yt(t,e),800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function yt(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})}function dl(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#assets-block-styles")){const r=document.createElement("style");r.id="assets-block-styles",r.textContent=rl,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`[data-gjs-type="${e}"] * { pointer-events: none !important; } [data-gjs-type="${e}"].gjs-selected, [data-gjs-type="${e}"].gjs-hovered { outline: 2px dashed rgba(240,135,42,0.6) !important; outline-offset: 2px; }`,a.appendChild(r)}}})}const Pe={blue:{curve:"#003B71",curveLine:"#E97300",badge:"#E97300",badgeText:"#ffffff"},orange:{curve:"#E97300",curveLine:"#003B71",badge:"#003B71",badgeText:"#ffffff"},transparent:{curve:"rgba(0,59,113,0.55)",curveLine:"#E97300",badge:"#E97300",badgeText:"#ffffff"}},_t=`
<style>
.hb-section{position:relative;width:100%;min-height:460px;display:flex;align-items:center;overflow:hidden;font-family:'Poppins',sans-serif;background:#0a0a0a;}
.hb-bg{position:absolute;inset:0;z-index:0;}
.hb-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.hb-bg img.hb-pos-left-top{object-position:left top;}
.hb-bg img.hb-pos-left-center{object-position:left center;}
.hb-bg img.hb-pos-left-bottom{object-position:left bottom;}
.hb-bg img.hb-pos-center-top{object-position:center top;}
.hb-bg img.hb-pos-center-center{object-position:center center;}
.hb-bg img.hb-pos-center-bottom{object-position:center bottom;}
.hb-bg img.hb-pos-right-top{object-position:right top;}
.hb-bg img.hb-pos-right-center{object-position:right center;}
.hb-bg img.hb-pos-right-bottom{object-position:right bottom;}
.hb-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.15) 55%,rgba(0,0,0,0) 100%);}
.hb-content{position:relative;z-index:10;padding:3.5rem 4rem;max-width:600px;}
.hb-box{position:relative;border-radius:1.125rem;padding:1.5rem 2rem;}
.hb-box::before{content:"";position:absolute;inset:0;border-radius:1.125rem;border:2px solid #E97300;-webkit-mask-image:linear-gradient(90deg,#000 0%,#000 45%,transparent 90%);mask-image:linear-gradient(90deg,#000 0%,#000 45%,transparent 90%);pointer-events:none;}
.hb-box-inner{position:relative;z-index:2;display:flex;flex-direction:column;gap:0.25rem;}
.hb-badge{display:inline-block;align-self:flex-start;padding:0.75rem 1.75rem;border-radius:1rem;font-size:2.25rem;line-height:1.25;font-weight:800;margin-bottom:0.75rem;margin-left:-3.5rem;}
.hb-subtitle{margin:0;font-size:1.0625rem;font-weight:500;color:#fff;line-height:1.4;background:transparent;}
.hb-curve{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:auto;line-height:0;z-index:5;pointer-events:none;}
.hb-curve svg{display:block;width:100%;height:150px;}
@media(max-width:992px){
.hb-content{padding:3rem 2.5rem;max-width:100%;}
.hb-badge{font-size:1.875rem;}
}
@media(max-width:640px){
.hb-content{padding:3rem 1.5rem;}
.hb-box{padding:1.125rem 1.25rem;}
.hb-badge{font-size:1.5rem;padding:0.6rem 1.35rem;margin-left:-2.25rem;border-radius:0.875rem;}
.hb-subtitle{font-size:0.9375rem;}
.hb-curve svg{height:85px;}
}
</style>`;function At(t,e){e=e||"hb"+Math.random().toString(36).slice(2,7);const i=t.bg_image||_("images/placeholder.svg"),a=Pe[t.theme]?t.theme:"blue",r=Pe[a],l=t.bg_position_x||"center",o=t.bg_position_y||"center",g=`hb-pos-${l}-${o}`,f=t.subtitle?`<p class="hb-subtitle">${t.subtitle}</p>`:"";return`<section id="hb-root-${e}" class="hb-section" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="hb-bg" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <img src="${i}" alt="${t.title||"Banner"}" class="${g}" loading="eager" decoding="async" fetchpriority="high" draggable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false">
        </div>
        <div class="hb-content">
            <div class="hb-box">
                <div class="hb-box-inner">
                    <span class="hb-badge" style="background:${r.badge};color:${r.badgeText};">${t.title||"Título del banner"}</span>
                    ${f}
                </div>
            </div>
        </div>
        <div class="hb-curve" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <svg viewBox="0 0 1366 230" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1366 0C1073.5 102.496 725.5 165.891 0 165.891V230H1366V0Z" fill="${r.curve}"></path>
                <path d="M1366 0C1073.5 102.496 725.5 165.891 -20 165.891" fill="none" stroke="${r.curveLine}" stroke-width="4" vector-effect="non-scaling-stroke"></path>
            </svg>
        </div>
    </section>`}const V={bg_image:_("images/placeholder.svg"),bg_position_x:"center",bg_position_y:"center",theme:"blue",title:"Cuenta de Ahorro Electrónico",subtitle:"Recupera el control de tus finanzas. Fácil de usar, práctica para tu día a día y disponible cuando la necesites."};function fl(t,e){const i=document.getElementById("hero-banner-config-modal");if(i&&i.remove(),!document.getElementById("hb-modal-styles")){const k=document.createElement("style");k.id="hb-modal-styles",k.textContent=`
            .hb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .hb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .hb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .hb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .hb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .hb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .hb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .hb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .hb-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;overflow-x:auto;}
            .hb-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
            .hb-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .hb-tab-btn i{font-size:1rem;}
            .hb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .hb-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .hb-tab-panel.active{display:flex;}
            .hb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .hb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .hb-row{display:flex;gap:0.75rem;align-items:center;}
            .hb-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .hb-input:focus{border-color:#3b82f6;}
            textarea.hb-input{resize:vertical;min-height:80px;font-family:inherit;}
            .hb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .hb-pick-btn:hover{background:#002a52;}
            .hb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .hb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .hb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hb-btn-save:hover{background:#d97821;}
            .hb-theme-toggle{display:flex;gap:0.5rem;}
            .hb-theme-opt{flex:1;padding:0.625rem 0.5rem;border-radius:0.5rem;font-size:0.8125rem;font-weight:700;cursor:pointer;border:2px solid #e2e8f0;transition:all 0.15s;font-family:inherit;text-align:center;}
            .hb-theme-opt-blue{background:#003B71;color:#fff;}
            .hb-theme-opt-orange{background:#E97300;color:#fff;}
            .hb-theme-opt-transparent{background:rgba(0,59,113,0.55);color:#ffffff;border-color:#cbd5e1;}
            .hb-theme-opt.hb-theme-inactive{opacity:0.35;}
            .hb-theme-opt.hb-theme-inactive:hover{opacity:0.65;}
        `,document.head.appendChild(k)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-hero-banner-config"]||"{}")}catch{return{}}})(),r=a.bg_image||V.bg_image,l=a.bg_position_x||V.bg_position_x,o=a.bg_position_y||V.bg_position_y,g=a.theme||V.theme,f=a.title||V.title,d=a.subtitle??V.subtitle,c=document.createElement("div");c.id="hero-banner-config-modal",c.className="hb-overlay";const s=document.createElement("div");s.className="hb-modal",s.innerHTML=`
        <div class="hb-modal-header">
            <div class="hb-modal-header-left"><i class="ri-image-2-line"></i><h2>Configurar Banner</h2></div>
            <button id="hb-modal-close" class="hb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="hb-modal-tabs">
            <button class="hb-tab-btn active" data-tab="bg"><i class="ri-image-line"></i> Fondo</button>
            <button class="hb-tab-btn" data-tab="content"><i class="ri-text"></i> Contenido</button>
            <button class="hb-tab-btn" data-tab="theme"><i class="ri-palette-line"></i> Tema</button>
        </div>
        <div class="hb-modal-body">
            <div class="hb-tab-panel active" id="hb-panel-bg">
                <div class="hb-card">
                    <label class="hb-label">Imagen de fondo</label>
                    <div class="hb-row" style="align-items:flex-start;flex-wrap:wrap;gap:0.75rem;">
                        <div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:0.5rem;">
                            <img id="hb-bg-preview" src="${r}" style="height:90px;width:100%;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;">
                            <input id="hb-bg-url" type="text" placeholder="URL de la imagen" value="${r}" class="hb-input">
                        </div>
                        <button id="hb-bg-pick" class="hb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
                <div class="hb-card">
                    <label class="hb-label">Posición de la imagen</label>
                    <p style="font-size:0.75rem;color:#94a3b8;margin:0 0 0.75rem;">Controla qué parte de la imagen se prioriza al recortarse para adaptarse al banner.</p>
                    <div class="hb-row" style="gap:1rem;">
                        <div style="flex:1;">
                            <label class="hb-label" style="margin-bottom:0.375rem;">Horizontal</label>
                            <select id="hb-bg-pos-x" class="hb-input">
                                <option value="left" ${l==="left"?"selected":""}>Izquierda</option>
                                <option value="center" ${l==="center"?"selected":""}>Centro</option>
                                <option value="right" ${l==="right"?"selected":""}>Derecha</option>
                            </select>
                        </div>
                        <div style="flex:1;">
                            <label class="hb-label" style="margin-bottom:0.375rem;">Vertical</label>
                            <select id="hb-bg-pos-y" class="hb-input">
                                <option value="top" ${o==="top"?"selected":""}>Arriba</option>
                                <option value="center" ${o==="center"?"selected":""}>Centro</option>
                                <option value="bottom" ${o==="bottom"?"selected":""}>Abajo</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hb-tab-panel" id="hb-panel-content">
                <div class="hb-card">
                    <label class="hb-label">Título (requerido)</label>
                    <input id="hb-title" type="text" placeholder="Título del banner" value="${f}" class="hb-input">
                </div>
                <div class="hb-card">
                    <label class="hb-label">Subtítulo (opcional)</label>
                    <textarea id="hb-subtitle" placeholder="Déjalo vacío si no quieres subtítulo" class="hb-input">${d}</textarea>
                </div>
            </div>
            <div class="hb-tab-panel" id="hb-panel-theme">
                <div class="hb-card">
                    <label class="hb-label">Color de tema</label>
                    <div class="hb-theme-toggle" id="hb-theme-colors">
                        <button type="button" class="hb-theme-opt hb-theme-opt-blue" data-theme="blue">Azul</button>
                        <button type="button" class="hb-theme-opt hb-theme-opt-orange" data-theme="orange">Naranja</button>
                        <button type="button" class="hb-theme-opt hb-theme-opt-transparent" data-theme="transparent">Azul Transparente</button>
                    </div>
                    <p style="font-size:0.75rem;color:#94a3b8;margin:0.75rem 0 0;">El marco con borde siempre es naranja. El tema controla el color de la curva inferior, la línea superior de la curva y el badge del título.</p>
                </div>
            </div>
        </div>
        <div class="hb-modal-footer">
            <button id="hb-modal-cancel" class="hb-btn-cancel">Cancelar</button>
            <button id="hb-modal-save" class="hb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`,c.appendChild(s),document.body.appendChild(c);let u=Pe[g]?g:"blue";function m(){const k=s.querySelector("#hb-theme-colors");k.querySelectorAll("[data-theme]").forEach(b=>{b.classList.toggle("hb-theme-inactive",b.dataset.theme!==u),b.addEventListener("click",()=>{u=b.dataset.theme,k.querySelectorAll("[data-theme]").forEach(y=>y.classList.toggle("hb-theme-inactive",y.dataset.theme!==u))})})}m(),s.querySelectorAll(".hb-tab-btn").forEach(k=>{k.addEventListener("click",()=>{s.querySelectorAll(".hb-tab-btn").forEach(b=>b.classList.remove("active")),s.querySelectorAll(".hb-tab-panel").forEach(b=>b.classList.remove("active")),k.classList.add("active"),s.querySelector(`#hb-panel-${k.dataset.tab}`).classList.add("active")})}),s.querySelector("#hb-bg-pick").addEventListener("click",()=>{Le({type:"image",title:"Seleccionar imagen de fondo",onSelect:k=>{s.querySelector("#hb-bg-url").value=k,s.querySelector("#hb-bg-preview").src=k}})}),s.querySelector("#hb-bg-url").addEventListener("input",k=>{s.querySelector("#hb-bg-preview").src=k.target.value});function p(){const k=s.querySelector("#hb-bg-pos-x").value,b=s.querySelector("#hb-bg-pos-y").value;s.querySelector("#hb-bg-preview").style.objectPosition=`${k} ${b}`}s.querySelector("#hb-bg-pos-x").addEventListener("change",p),s.querySelector("#hb-bg-pos-y").addEventListener("change",p),p();const w=()=>c.remove();s.querySelector("#hb-modal-close").onclick=w,s.querySelector("#hb-modal-cancel").onclick=w,c.onclick=k=>{k.target===c&&w()},s.querySelector("#hb-modal-save").onclick=()=>{const k={bg_image:s.querySelector("#hb-bg-url").value.trim()||V.bg_image,bg_position_x:s.querySelector("#hb-bg-pos-x").value,bg_position_y:s.querySelector("#hb-bg-pos-y").value,theme:u,title:s.querySelector("#hb-title").value.trim(),subtitle:s.querySelector("#hb-subtitle").value.trim()},y=e.getEl()?.querySelector("[id^='hb-root-']")?.id?.replace("hb-root-","")||"hb"+Math.random().toString(36).slice(2,7);e.addAttributes({"data-hero-banner-config":JSON.stringify(k)}),e.components(At(k,y)+_t),w()}}function pl(t){const e="hero-banner-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-hero-banner-config":JSON.stringify(V)},components:At(V)+_t,traits:[{type:"button",label:"Banner",text:"Administrar Banner",full:!0,command:"open-hero-banner-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-hero-banner-config",{run(i){const a=i.getSelected();a&&fl(i,a)}}),t.BlockManager.add("hero-banner-block",{label:"Banner",category:"Banners",media:`<svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" fill="#4a4a4a" rx="2"/>
            <path d="M4 8 h16 v11 h-16 z" fill="none" stroke="#E97300" stroke-width="1"/>
            <rect x="5.5" y="10.5" width="9" height="4" rx="1" fill="#E97300"/>
            <rect x="5.5" y="16" width="11" height="1.4" rx="0.7" fill="#ffffff" fill-opacity="0.85"/>
            <path d="M2 24 C10 20 22 28 30 22 L30 30 L2 30 Z" fill="#003B71"/>
        </svg>`,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}})}function gl(t){L.registerBlocks(Qt),L.registerBlocks(si),L.registerBlocks(Qr),L.registerBlocks(Ta),L.registerBlocks(ma),L.registerBlocks(hi),L.registerBlocks(xi),L.registerBlocks(Yi),L.registerBlocks(Wi),L.registerBlocks(Qi),L.registerBlocks(aa),L.registerBlocks(Si),L.registerBlocks(Sa),L.registerBlocks(er),L.registerBlocks(ji),L.registerBlocks(qi),L.registerBlocks(oa),L.registerBlocks(da),L.registerBlocks(za),L.registerBlocks(Ma),L.registerBlocks(Ra),L.registerBlocks(or),L.registerBlocks(gr),L.registerBlocks(vr),L.registerBlocks(Ir),L.registerBlocks(Pr),L.registerBlocks(ar),L.registerBlocks(Ur),L.registerBlocks(ol),L.applyToEditor(t),Vr(t),el(t),pl(t),cr(t),dr(t),Fi(t),Ei(t),qr(t),ba(t),wr(t),Di(t),nl(t)}function hl(t,e,i){t.on("component:add",()=>e.markAsDirty()),t.on("component:remove",()=>e.markAsDirty()),t.on("component:update",()=>e.markAsDirty()),t.on("style:update",()=>e.markAsDirty());const a=document.getElementById("save-button");a&&a.addEventListener("click",async()=>{await ml(t,e,i,a)}),document.addEventListener("keydown",r=>{(r.ctrlKey||r.metaKey)&&r.key==="s"&&(r.preventDefault(),a&&!a.disabled&&a.click())})}async function ml(t,e,i,a){a.disabled=!0,a.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{i.needsTitle()?await bl(t,e,i):await zt(t,e,i)}catch(r){It(r.message,"error")}finally{a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}async function bl(t,e,i){return new Promise((a,r)=>{Dt({title:"Título de la Página",description:"Ingresa un título descriptivo para identificar esta página",placeholder:"Ej: Acerca de Nosotros",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async l=>{if(!l?.trim()){r(new Error("El título es obligatorio"));return}try{await zt(t,e,i,l),a()}catch(o){r(o)}},onCancel:()=>{r(new Error("Guardado cancelado"))}})})}async function zt(t,e,i,a=null){const l={...e.getEditorContent(t),is_published:i.isPublished};a&&(l.title=a);const o=await e.savePage(t,l,i.storeUrl,i.getHttpMethod());o.success&&(e.markAsClean(),It(o.message,"success"),!i.isEditMode&&o.page?(i.updatePageInfo(o),i.updateTitle(o.page.title)):a&&i.updateTitle(a))}function It(t,e){typeof window.showNotification=="function"&&window.showNotification(t,e)}document.addEventListener("DOMContentLoaded",async()=>{const t=new Mt,e=new Wt;new Jt(t);const i=Nt(),a=new Promise(r=>{i.on("load",()=>{gl(i),Pt(i),Rt(),Ot(),Ht(i),Ft(i),Ut(i),Vt(i),Yt(i),Xt(i),ul(i),xl(i),vl(i),setTimeout(()=>{i.runCommand("sw-visibility"),i.Panels.getButton("options","sw-visibility")?.set("active",!0)},100),r()})});if(await Promise.all([a,yl(i)]),e.isEditMode)try{await t.loadPageContent(i,e.loadUrl),vt("Contenido cargado correctamente","success")}catch(r){vt("Error al cargar el contenido","error"),console.error(r)}hl(i,t,e)});function ul(t){const e=[{cmd:"set-device-desktop",device:"Desktop"},{cmd:"set-device-tablet",device:"Tablet"},{cmd:"set-device-mobile",device:"Mobile"}];e.forEach(({cmd:i,device:a})=>{t.Commands.add(i,{run:r=>{r.setDevice(a),e.forEach(({cmd:l})=>{r.Panels.getButton("devices-c",l)?.set("active",l===i)})}})})}function xl(t){t.Commands.add("canvas-clear",{run:e=>{Gt({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{e.DomComponents.clear(),e.CssComposer.clear()}})}})}function yl(t){return new Promise(e=>{const i=t.Canvas.getFrameEl();if(i?.contentDocument?.readyState==="complete"&&i.contentDocument.head?.childElementCount>0){e();return}const r=()=>{t.off("canvas:frame:load",r),e()};t.on("canvas:frame:load",r),setTimeout(()=>{t.off("canvas:frame:load",r),e()},3e3)})}function vl(t){const e=t.Canvas.getFrameEl();if(!e?.contentDocument?.head)return;const i=e.contentDocument.createElement("style");i.id="gjs-dashed-fix",i.textContent="body,body.gjs-dashed{margin:0!important;padding:0 0 160px 0!important;}",e.contentDocument.head.appendChild(i)}function vt(t,e="info"){typeof window.showNotification=="function"&&window.showNotification(t,e)}
