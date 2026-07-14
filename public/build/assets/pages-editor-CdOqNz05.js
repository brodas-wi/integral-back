/* empty css                   *//* empty css                    *//* empty css                          *//* empty css                           */import{o as $e,M as Lt,j as jt,E as Tt,i as _t,t as zt,d as At,f as It,e as Dt,s as qt,g as Mt,c as Nt,b as Pt,a as Ot,h as Rt}from"./editor-commands-DULPa6UC.js";import{a as _}from"./url-DaqOO3yL.js";import"./_commonjsHelpers-CqkleIqs.js";class Ht{constructor(){this.pageId=this.getElementValue("page-id"),this.pageSlug=this.getElementValue("page-slug"),this.pageTitle=this.getPageTitle(),this.loadUrl=this.getElementValue("page-load-url"),this.storeUrl=this.getElementValue("page-store-url"),this.isPublished=this.getElementValue("page-is-published")==="1",this.isEditMode=!!this.pageId,this.appUrl=(document.querySelector('meta[name="app-url"]')?.content??"").replace(/\/$/,"")}getElementValue(e,i=""){const a=document.getElementById(e);return a?a.value.trim():i}getPageTitle(){const e=document.getElementById("editor-title");if(!e)return"";const a=e.textContent.match(/(?:Editando:|Nueva Página)\s*(.+)?/);return a&&a[1]?a[1].trim():""}updatePageInfo(e){if(e.page)if(this.pageId=e.page.id,this.pageSlug=e.page.slug,this.pageTitle=e.page.title,this.isEditMode=!0,document.getElementById("page-id").value=this.pageId,document.getElementById("page-slug").value=this.pageSlug,e.page.update_url?this.storeUrl=e.page.update_url:this.storeUrl=`${this.appUrl}/pages/${this.pageSlug}`,document.getElementById("page-store-url").value=this.storeUrl,e.page.load_url?this.loadUrl=e.page.load_url:this.loadUrl=`${this.appUrl}/pages/${this.pageSlug}/load`,document.getElementById("page-load-url").value=this.loadUrl,e.page.edit_url)window.history.replaceState(null,"",e.page.edit_url);else try{const i=new URL(window.location.href);i.pathname=i.pathname.replace(/\/pages\/create\/?$/,`/pages/${this.pageSlug}/edit`),window.history.replaceState(null,"",i.toString())}catch(i){console.error("Error updating browser URL:",i)}}updateTitle(e){this.pageTitle=e;const i=document.getElementById("editor-title");i&&(i.textContent=`Editando: ${e}`),document.title=`Editar: ${e} - Editor`}getHttpMethod(){return this.isEditMode?"PUT":"POST"}needsTitle(){return!this.isEditMode}}class Ft{constructor(e){this.editorService=e,this.setupBackButton(),this.setupBeforeUnload()}setupBackButton(){const e=document.querySelector("#editor-navbar a[href]");e&&e.addEventListener("click",i=>{this.editorService.shouldPreventUnload()&&(i.preventDefault(),this.showUnsavedChangesModal(()=>{this.editorService.startNavigation(),window.location.href=e.href}))})}setupBeforeUnload(){window.addEventListener("beforeunload",e=>{if(this.editorService.shouldPreventUnload())return e.preventDefault(),e.returnValue="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?",e.returnValue})}showUnsavedChangesModal(e){const i=document.createElement("div");i.style.cssText=`
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
        `;const p=document.createElement("button");p.textContent="Salir sin guardar",p.style.cssText=`
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            background: #dc2626;
            color: #ffffff;
            border: 2px solid #dc2626;
            font-family: inherit;
        `,[o,p].forEach(n=>{n.addEventListener("mouseenter",()=>{n.style.opacity="0.85"}),n.addEventListener("mouseleave",()=>{n.style.opacity="1"})});const c=()=>i.remove();o.addEventListener("click",c),p.addEventListener("click",()=>{c(),e()}),i.addEventListener("click",n=>{n.target===i&&c()}),l.appendChild(o),l.appendChild(p),a.appendChild(r),a.appendChild(l),i.appendChild(a),document.body.appendChild(i)}}const Ut="Básico";class Vt{constructor(){this.blocks=new Map}registerBlock(e,i){this.blocks.has(i.category)||this.blocks.set(i.category,[]),this.blocks.get(i.category).push({id:e,...i})}registerBlocks(e){e.forEach(i=>{this.registerBlock(i.id,i)})}applyToEditor(e){this.blocks.forEach(i=>{i.forEach(a=>{const{id:r,...l}=a;e.BlockManager.add(r,l)})}),this.applyCollapseSettings(e),this.hideDefaultCategories(e)}applyCollapseSettings(e){setTimeout(()=>{e.BlockManager.getCategories().each(i=>{i.set("open",i.get("label")===Ut)})},500)}hideDefaultCategories(e){setTimeout(()=>{const i=["Basic","Extra"];document.querySelectorAll(".gjs-block-category").forEach(a=>{const r=a.querySelector(".gjs-title");r&&i.includes(r.textContent.trim())&&(a.style.display="none")})},100)}}const L=new Vt,Yt=[{id:"heading1",label:"Título H1",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:'<div class="h-12 w-full"></div>'}],Xt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Wt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Gt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="12" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="22" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Jt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="9" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="25" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Kt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="13" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Zt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="21" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Qt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="14" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="23" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,ei=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="11" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="20" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,I='<div class="col-cell"></div>',X=`
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
</style>`,ti=[{id:"columns-1",label:"1 Columna",category:"Columnas",media:Xt,content:`
<div class="col-section">
    <div class="col-cell"></div>
</div>
${X}`},{id:"columns-2",label:"2 Columnas",category:"Columnas",media:Wt,content:`
<div class="col-section">
    <div class="col-grid col-grid--2">
        ${I}
        ${I}
    </div>
</div>
${X}`},{id:"columns-3",label:"3 Columnas",category:"Columnas",media:Gt,content:`
<div class="col-section">
    <div class="col-grid col-grid--3">
        ${I}
        ${I}
        ${I}
    </div>
</div>
${X}`},{id:"columns-4",label:"4 Columnas",category:"Columnas",media:Jt,content:`
<div class="col-section">
    <div class="col-grid col-grid--4">
        ${I}
        ${I}
        ${I}
        ${I}
    </div>
</div>
${X}`},{id:"columns-1-3",label:"1/3 — 2/3",category:"Columnas",media:Kt,content:`
<div class="col-section">
    <div class="col-grid col-grid--1-2">
        ${I}
        ${I}
    </div>
</div>
${X}`},{id:"columns-3-1",label:"2/3 — 1/3",category:"Columnas",media:Zt,content:`
<div class="col-section">
    <div class="col-grid col-grid--2-1">
        ${I}
        ${I}
    </div>
</div>
${X}`},{id:"columns-1-2",label:"1/4 — 1/4 — 1/2",category:"Columnas",media:Qt,content:`
<div class="col-section">
    <div class="col-grid col-grid--1-1-2">
        ${I}
        ${I}
        ${I}
    </div>
</div>
${X}`},{id:"columns-2-1",label:"1/2 — 1/4 — 1/4",category:"Columnas",media:ei,content:`
<div class="col-section">
    <div class="col-grid col-grid--2-1-1">
        ${I}
        ${I}
        ${I}
    </div>
</div>
${X}`}],ii=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ai=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ri=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Misión</h3>
    <p class="mvv-card-text">Proveemos la mejor experiencia a los empresarios de la micro y pequeña empresa, sus familiares y sus empleados, acompañándolos en su desarrollo con productos y servicios financieros especializados e innovadores adaptados a sus necesidades</p>
</div>`,li=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Visión</h3>
    <p class="mvv-card-text">Ser el banco pionero de la revolución financiera digital para los empresarios de la micro y pequeña empresa; y que mejor comprende y sirve sus necesidades de desarrollo a través de un ecosistema de productos y servicios integrales e innovadores.".</p>
</div>`,oi=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Valores</h3>
    <p class="mvv-card-text">Cada día la cultura Integral se está fortaleciendo, todos los que pertenecemos a esta organización compartimos y vivimos los valores</p>
    <ul class="mvv-bullet-list">
        <li>Responsabilidad</li>
        <li>Compromiso social</li>
        <li>Integridad</li>
        <li>Excelencia</li>
    </ul>
</div>`,Ne=`
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
</style>`,ni=[{id:"about-section",label:"Nuestra Historia",category:"Contenido",media:ii,content:`
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
${Ne}`},{id:"about-mvv-section",label:"Misión, Visión y Valores",category:"Contenido",media:ai,content:`
<section class="mvv-section">
    <h2 class="mvv-section-title">Misión, Visión y Valores</h2>
    <div class="mvv-grid">
        ${ri}
        ${li}
        ${oi}
    </div>
</section>
${Ne}`}],si=`
<style>
.mv-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;}
@media(max-width:992px){.mv-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`,ci=`
<li class="flex items-start gap-2 text-base font-bold text-[#E97300] leading-relaxed">
    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#E97300] shrink-0"></span>
    <span>Responsabilidad</span>
</li>`,di=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,fi=[{id:"mission-vision-values",label:"Misión, Visión y Valores",category:"Institucional",media:di,content:`
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
                    ${ci}
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
${si}`}],bt=function(){(function(){function t(i){if(!i||i.__pcInit)return;i.__pcInit=!0;var a=i.querySelector(".pc-carousel-wrap");if(!a)return;var r=!1,l=0,o=0,p=!1,c=0,n=0,f=0,h=null;a.querySelectorAll("img").forEach(function(m){m.setAttribute("draggable","false")}),setTimeout(function(){var m=a.scrollWidth-a.clientWidth;if(m<=0)return;var E=Math.min(60,m),k=null;function S(B){k||(k=B);var j=(B-k)/400;if(j<.5)a.scrollLeft=E*(j*2);else if(j<1)a.scrollLeft=E*(1-(j-.5)*2);else{a.scrollLeft=0;return}requestAnimationFrame(S)}requestAnimationFrame(S)},400),a.scrollLeft=0;function b(){return a.scrollWidth-a.clientWidth}function g(m){return Math.max(0,Math.min(m,b()))}function d(){Math.abs(c)<.5||(c*=.92,a.scrollLeft=g(a.scrollLeft+c),h=requestAnimationFrame(d))}a.addEventListener("mousedown",function(m){m.button===0&&(h&&(cancelAnimationFrame(h),h=null),r=!0,p=!1,c=0,l=m.clientX,n=m.clientX,f=Date.now(),o=a.scrollLeft,a.style.cursor="grabbing",m.preventDefault())}),document.addEventListener("mousemove",function(m){if(r){var E=l-m.clientX;Math.abs(E)>3&&(p=!0);var k=Date.now(),S=k-f||1;c=(m.clientX-n)/S*16*-1,n=m.clientX,f=k,a.scrollLeft=g(o+E)}}),document.addEventListener("mouseup",function(m){r&&(r=!1,a.style.cursor="grab",p&&(m.stopPropagation(),h=requestAnimationFrame(d)))}),a.addEventListener("click",function(m){p&&(m.preventDefault(),m.stopPropagation(),p=!1)},!0);var w=0,C=0,y=0,v=0,u=0;a.addEventListener("touchstart",function(m){h&&(cancelAnimationFrame(h),h=null),w=m.touches[0].clientX,y=m.touches[0].clientX,v=Date.now(),C=a.scrollLeft,u=0},{passive:!0}),a.addEventListener("touchmove",function(m){var E=Date.now(),k=E-v||1,S=m.touches[0].clientX;u=(S-y)/k*16*-1,y=S,v=E;var B=w-S;a.scrollLeft=g(C+B)},{passive:!0}),a.addEventListener("touchend",function(){h=requestAnimationFrame(function m(){Math.abs(u)<.5||(u*=.92,a.scrollLeft=g(a.scrollLeft+u),h=requestAnimationFrame(m))})},{passive:!0})}function e(){document.querySelectorAll(".pc-section").forEach(function(i){delete i.__pcInit,t(i)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()},pi=`(${bt.toString()})();`,gi=`
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
@media(max-width:480px){.pc-card{flex:0 0 80vw;}}`;function mi(t){const e=t.img||_("images/placeholder.svg"),i=t.title||"TÍTULO DEL PRODUCTO",a=t.desc||"Descripción breve del producto financiero.",r=t.href||"#",l=t.btn_label||"Solicitar";return`<div class="pc-card"><div class="pc-card-img-wrap"><img src="${e}" alt="${i}" class="pc-card-img"></div><div class="pc-card-body"><h3 class="pc-card-title">${i}</h3><p class="pc-card-desc">${a}</p></div><a href="${r}" class="pc-btn">${l}</a></div>`}function ut(t){const e=t.heading||"Créditos",i=t.subheading||"Opciones de financiamiento diseñadas para hacer realidad tus proyectos.",a=t.more_href||"#",r=t.more_label||"Ver más",l=t.show_more!==!1,p=(t.cards||[]).map(mi).join(""),c=l?`<div class="pc-more-wrap"><a href="${a}" class="pc-more-btn">${r}</a></div>`:"";return`<section class="pc-section"><style>${gi}</style><div style="text-align:center;margin-bottom:2rem;"><h2 class="pc-section-heading">${e}</h2><p class="pc-section-subheading">${i}</p></div><div class="pc-carousel-wrap"><div class="pc-track">${p}</div></div>${c}</section>`}const H={heading:"Créditos",subheading:"Opciones de financiamiento diseñadas para hacer realidad tus proyectos.",more_href:"#",more_label:"Ver más",cards:[{img:"",title:"CREDINVIERTE",desc:"Adquiere activos fijos",href:"#",btn_label:"Solicitar"},{img:"",title:"SOLUCIONES INTEGRALES",desc:"Financiamiento PYME",href:"#",btn_label:"Solicitar"},{img:"",title:"CREDI-CONFIAMOS",desc:"Rápido y sin fiador",href:"#",btn_label:"Solicitar"},{img:"",title:"CREDILÍNEA",desc:"Línea rotativa",href:"#",btn_label:"Solicitar"}]};function hi(t,e){const i=document.getElementById("pc-config-modal");if(i&&i.remove(),!document.getElementById("pc-modal-styles")){const n=document.createElement("style");n.id="pc-modal-styles",n.textContent=`
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
        `,document.head.appendChild(n)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-product-cards-config"]||"{}")}catch{return{}}})(),r={heading:a.heading??H.heading,subheading:a.subheading??H.subheading,more_href:a.more_href??H.more_href,more_label:a.more_label??H.more_label,show_more:a.show_more??!0,cards:JSON.parse(JSON.stringify(a.cards??H.cards))},l=document.createElement("div");l.id="pc-config-modal",l.className="pc-overlay";const o=document.createElement("div");o.className="pc-modal",o.innerHTML=`
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
        </div>`,l.appendChild(o),document.body.appendChild(l),o.querySelectorAll(".pc-tab-btn").forEach(n=>{n.addEventListener("click",()=>{o.querySelectorAll(".pc-tab-btn").forEach(f=>f.classList.remove("active")),o.querySelectorAll(".pc-tab-panel").forEach(f=>f.classList.remove("active")),n.classList.add("active"),o.querySelector(`#pc-panel-${n.dataset.tab}`).classList.add("active")})}),o.querySelector("#pc-show-more").addEventListener("change",function(){r.show_more=this.checked,o.querySelector("#pc-more-fields").style.display=this.checked?"flex":"none"});function p(){const n=o.querySelector("#pc-cards-list");n.innerHTML="",r.cards.forEach((f,h)=>{const b=document.createElement("div");b.className="pc-card-config";const g=f.img?`<img class="pc-img-preview" src="${f.img}" alt="">`:'<div class="pc-img-placeholder"><i class="ri-image-line"></i></div>';b.innerHTML=`
                <div class="pc-card-config-header">
                    <span class="pc-card-num">${h+1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${h+1}</span>
                    <button class="pc-btn-remove pc-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="pc-row">
                    <div id="pc-img-wrap-${h}">${g}</div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                        <input class="pc-input-sm" placeholder="URL de la imagen" value="${f.img||""}" data-field="img">
                        <button class="pc-pick-btn pc-pick-img"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="pc-label">Título</label>
                    <input class="pc-input" placeholder="TÍTULO DEL PRODUCTO" value="${f.title||""}" data-field="title">
                </div>
                <div>
                    <label class="pc-label">Descripción</label>
                    <input class="pc-input" placeholder="Descripción breve" value="${f.desc||""}" data-field="desc">
                </div>
                <div class="pc-row">
                    <div style="flex:1;">
                        <label class="pc-label">URL del botón</label>
                        <input class="pc-input" placeholder="#" value="${f.href||"#"}" data-field="href">
                    </div>
                    <div style="flex:1;">
                        <label class="pc-label">Texto del botón</label>
                        <input class="pc-input" placeholder="Solicitar" value="${f.btn_label||"Solicitar"}" data-field="btn_label">
                    </div>
                </div>`,b.querySelectorAll("[data-field]").forEach(d=>{d.addEventListener("input",()=>{if(f[d.dataset.field]=d.value,d.dataset.field==="img"){const w=b.querySelector(`#pc-img-wrap-${h}`);w.innerHTML=d.value?`<img class="pc-img-preview" src="${d.value}" alt="">`:'<div class="pc-img-placeholder"><i class="ri-image-line"></i></div>'}})}),b.querySelector(".pc-pick-img").addEventListener("click",()=>{$e({type:"image",title:"Seleccionar imagen de tarjeta",onSelect:d=>{f.img=d,b.querySelector("[data-field='img']").value=d,b.querySelector(`#pc-img-wrap-${h}`).innerHTML=`<img class="pc-img-preview" src="${d}" alt="">`}})}),b.querySelector(".pc-remove-card").addEventListener("click",()=>{r.cards.splice(h,1),p()}),n.appendChild(b)})}p(),o.querySelector("#pc-add-card").addEventListener("click",()=>{r.cards.push({img:"",title:"NUEVO PRODUCTO",desc:"Descripción del producto.",href:"#",btn_label:"Solicitar"}),p(),o.querySelector("#pc-cards-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})});const c=()=>l.remove();o.querySelector("#pc-modal-close").addEventListener("click",c),o.querySelector("#pc-modal-cancel").addEventListener("click",c),l.addEventListener("click",n=>{n.target===l&&c()}),o.querySelector("#pc-modal-save").addEventListener("click",()=>{r.heading=o.querySelector("#pc-heading").value.trim()||H.heading,r.subheading=o.querySelector("#pc-subheading").value.trim()||H.subheading,r.show_more=o.querySelector("#pc-show-more").checked,r.more_label=o.querySelector("#pc-more-label").value.trim()||H.more_label,r.more_href=o.querySelector("#pc-more-href").value.trim()||"#",e.addAttributes({"data-product-cards-config":JSON.stringify(r)}),e.components(ut(r)),setTimeout(()=>we(t),300),c()})}function we(t){try{const e=t.Canvas.getFrameEl()?.contentDocument;if(!e)return;const i=e.getElementById("pc-runtime-script");i&&i.remove(),e.querySelectorAll(".pc-section").forEach(r=>{delete r.__pcInit});const a=e.createElement("script");a.id="pc-runtime-script",a.textContent=pi,e.head.appendChild(a)}catch(e){console.warn("[ProductCards] Error reiniciando carrusel:",e)}}const bi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;function ui(t){const e="product-cards-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección de Productos",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-product-cards-config":JSON.stringify(H)},components:ut(H),script:bt,"script-props":["data-product-cards-config"],traits:[{type:"button",label:"Productos",text:"Administrar Sección",full:!0,command:"open-product-cards-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-product-cards-config",{run(i){const a=i.getSelected();a&&hi(i,a)}}),t.BlockManager.add("product-cards-block",{label:"Sección de productos",category:"Productos y Servicios",media:bi,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),t.on("component:mount",i=>{i.getEl()?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>we(t),400))}),t.on("component:selected",i=>{const a=i.getEl();if(!a)return;const r=a.closest(`[data-gjs-type="${e}"]`);if(r&&!a.hasAttribute("data-gjs-type")){const o=t.getWrapper().find(`[data-gjs-type="${e}"]`).find(p=>p.getEl()===r);o&&setTimeout(()=>t.select(o),0)}}),t.on("canvas:render",()=>{setTimeout(()=>we(t),600)}),t.on("storage:end:load",()=>{setTimeout(()=>we(t),800)})}const xi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Pe=`
<div class="flex flex-col gap-5 rounded-2xl p-8 dc-bg-primary">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold text-white">Lorem ipsum dolor</h3>
        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-outline w-full py-2 px-8 rounded-lg bg-white dc-text-primary text-base font-semibold text-center">Lorem ipsum</a>
</div>`,Oe=`
<div class="flex flex-col gap-5 rounded-2xl p-8 bg-white border border-gray-200">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center dc-bg-light">
        <i class="ri-bank-line text-2xl dc-text-primary"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold dc-text-primary">Lorem ipsum dolor</h3>
        <p class="text-base dc-text-primary leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-solid w-full py-2 px-8 rounded-lg dc-bg-primary text-white text-base font-semibold text-center">Lorem ipsum</a>
</div>`,Ce=`
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
</style>`,yi=[{id:"dual-card-section",label:"Sección dos tarjetas",category:"Productos y Servicios",media:xi,content:`
<section class="dc-section">
    <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-[#003B71] mb-3">Lorem ipsum dolor sit amet</h2>
        <p class="text-base text-[#003B71]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="dc-grid">
        ${Pe}
        ${Oe}
    </div>
</section>
${Ce}`},{id:"dual-card-dark",label:"Tarjeta azul oscuro",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="#003B71" rx="2"/>
            <rect x="5" y="5" width="6" height="6" fill="rgba(255,255,255,0.2)" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="white" fill-opacity="0.9"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="white"/>
        </svg>`,content:`${Pe}${Ce}`},{id:"dual-card-light",label:"Tarjeta blanca",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="white" rx="2" stroke="#003B71" stroke-width="0.5" stroke-opacity="0.3"/>
            <rect x="5" y="5" width="6" height="6" fill="#dce8f5" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.8"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="#003B71"/>
        </svg>`,content:`${Oe}${Ce}`}],vi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="white" rx="2" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="8" y="7" width="16" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="11" width="12" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="11" y="13.5" width="10" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="6" y="18" width="9" height="5" rx="1.5" fill="#E97300"/>
    <rect x="17" y="18" width="9" height="5" rx="1.5" fill="white" stroke="#e5e7eb" stroke-width="0.8"/>
</svg>`,wi=`
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
</style>`,ki=[{id:"cta-section",label:"Llamada a la acción",category:"Llamadas a la acción",media:vi,content:`
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
${wi}`}],me=`
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
</style>`,Bi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ei=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="12" width="28" height="8" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.7"/>
    <rect x="5" y="14.5" width="3.5" height="4.5" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.8"/>
    <rect x="11" y="15" width="12" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.75"/>
    <circle cx="26.5" cy="16" r="2.2" fill="#E97300"/>
</svg>`,$i=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Si=`<svg viewBox="0 0 32 32" width="32" height="32">
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
    </a>`}function Le(t,e){return`<div class="dd-acc-item${e?" dd-acc-open":""}" data-gjs-type="doc-accordion-item">
        <div class="dd-acc-header" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <span class="dd-acc-title" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">${t}</span>
            <i class="${e?"ri-arrow-down-s-line":"ri-arrow-right-s-line"} dd-acc-arrow" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
        </div>
        <div class="dd-acc-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
        <div class="dd-acc-body" data-gjs-droppable="true">
            ${ke("Nombre_del_documento.pdf")}
        </div>
    </div>`}function Ci(){return function(){const t=this;if(t.__ddAccBound)return;t.__ddAccBound=!0;const e=t.querySelector(".dd-acc-header"),i=t.querySelector(".dd-acc-arrow");!e||!i||e.addEventListener("click",a=>{if(a.target.closest("a"))return;const r=t.classList.toggle("dd-acc-open");i.classList.toggle("ri-arrow-down-s-line",r),i.classList.toggle("ri-arrow-right-s-line",!r)})}}const Li=[{id:"document-download-section",label:"Sección de Documentos Descargables",category:"Documentos",media:Bi,content:`
<section class="dd-section">
    <h2 class="text-4xl font-extrabold text-[#003B71]" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Titulo principal</h2>
    <div class="dd-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
    <div class="dd-list" data-gjs-droppable="true">
        ${ke("Nombre_del_documento.pdf")}
        ${ke("Nombre_del_documento.pdf")}
    </div>
</section>
${me}`},{id:"document-download-button",label:"Botón de Documento",category:"Documentos",media:Ei,content:`${ke("Nombre_del_documento.pdf")}${me}`},{id:"document-accordion-section",label:"Sección de Documentos con Acordeón",category:"Documentos",media:$i,content:`
<section class="dd-section">
    <h2 class="text-4xl font-extrabold text-[#003B71]" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Titulo principal</h2>
    <div class="dd-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
    <div class="dd-acc-list" data-gjs-droppable="true">
        ${Le("Nombre de la sección",!0)}
        ${Le("Nombre de la sección",!1)}
    </div>
</section>
${me}`},{id:"document-accordion-item",label:"Ítem de Acordeón",category:"Documentos",media:Si,content:`${Le("Nombre de la sección",!1)}${me}`}];function ji(t){const e="doc-download-button",i="doc-accordion-item";t.DomComponents.addType(e,{isComponent:a=>a.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Botón de Documento",tagName:"a",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,class:"dd-btn",href:"#"},components:`
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
                `,script:Ci()},init(){this.set("type",i),this.addAttributes({"data-gjs-type":i})}}}),t.Commands.add("select-doc-download-file",{run(a){const r=a.getSelected();!r||r.get("type")!==e||$e({type:"document",title:"Seleccionar documento",onSelect:(l,o)=>{r.addAttributes({href:l});const p=r.find(".dd-btn-label")[0],c=o?.name||l.split("/").pop();p&&p.components(c)}})}}),Ti(t,i)}function Ti(t,e){t.on("storage:end:load",()=>{setTimeout(()=>Re(t,e),800)}),t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},400))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();a&&(delete a.__ddAccBound,setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},400))}}),t.on("canvas:render",()=>{setTimeout(()=>Re(t,e),600)})}function Re(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})}const xt=function(){(function(){function t(i){if(!i||i.__savInit)return;i.__savInit=!0;var a=i.querySelector(".sav-carousel-wrap");if(!a)return;a.scrollLeft=0;var r=!1,l=0,o=0,p=!1,c=0,n=0,f=0,h=null;a.querySelectorAll("img").forEach(function(m){m.setAttribute("draggable","false")}),setTimeout(function(){var m=a.scrollWidth-a.clientWidth;if(m<=0)return;var E=Math.min(60,m),k=null;function S(B){k||(k=B);var j=(B-k)/400;if(j<.5)a.scrollLeft=E*(j*2);else if(j<1)a.scrollLeft=E*(1-(j-.5)*2);else{a.scrollLeft=0;return}requestAnimationFrame(S)}requestAnimationFrame(S)},400);function b(){return a.scrollWidth-a.clientWidth}function g(m){return Math.max(0,Math.min(m,b()))}function d(){Math.abs(c)<.5||(c*=.92,a.scrollLeft=g(a.scrollLeft+c),h=requestAnimationFrame(d))}a.addEventListener("mousedown",function(m){m.button===0&&(h&&(cancelAnimationFrame(h),h=null),r=!0,p=!1,c=0,l=m.clientX,n=m.clientX,f=Date.now(),o=a.scrollLeft,a.style.cursor="grabbing",m.preventDefault())}),document.addEventListener("mousemove",function(m){if(r){var E=l-m.clientX;Math.abs(E)>3&&(p=!0);var k=Date.now(),S=k-f||1;c=(m.clientX-n)/S*16*-1,n=m.clientX,f=k,a.scrollLeft=g(o+E)}}),document.addEventListener("mouseup",function(m){r&&(r=!1,a.style.cursor="grab",p&&(m.stopPropagation(),h=requestAnimationFrame(d)))}),a.addEventListener("click",function(m){p&&(m.preventDefault(),m.stopPropagation(),p=!1)},!0);var w=0,C=0,y=0,v=0,u=0;a.addEventListener("touchstart",function(m){h&&(cancelAnimationFrame(h),h=null),w=m.touches[0].clientX,y=m.touches[0].clientX,v=Date.now(),C=a.scrollLeft,u=0},{passive:!0}),a.addEventListener("touchmove",function(m){var E=Date.now(),k=E-v||1,S=m.touches[0].clientX;u=(S-y)/k*16*-1,y=S,v=E;var B=w-S;a.scrollLeft=g(C+B)},{passive:!0}),a.addEventListener("touchend",function(){h=requestAnimationFrame(function m(){Math.abs(u)<.5||(u*=.92,a.scrollLeft=g(a.scrollLeft+u),h=requestAnimationFrame(m))})},{passive:!0})}function e(){document.querySelectorAll(".sav-section").forEach(function(i){delete i.__savInit,t(i)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()},_i=`(${xt.toString()})();`,zi=`
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
@media(max-width:480px){.sav-card{flex:0 0 75vw;}}`;function Ai(t){const e=t.img||_("images/placeholder.svg"),i=t.title||"TÍTULO DEL PRODUCTO",a=t.desc?`<p class="sav-card-desc">${t.desc}</p>`:"",r=t.href||"#",l=t.btn_label||"Solicitar";return`<div class="sav-card"><div class="sav-card-img-wrap"><img src="${e}" alt="${i}" class="sav-card-img"></div><h3 class="sav-card-title">${i}</h3>${a}<a href="${r}" class="sav-btn">${l}</a></div>`}function yt(t){const e=t.heading||"Depósitos y Cuentas de Ahorro",i=t.subheading||"Productos diseñados para hacer crecer tu dinero de forma segura.",a=t.more_href||"#",r=t.more_label||"Ver más",l=t.show_more!==!1,p=(t.cards||[]).map(Ai).join(""),c=_("images/brand-watermark.png"),n=l?`<div class="sav-more-wrap"><a href="${a}" class="sav-more-btn">${r}</a></div>`:"";return`<section class="sav-section"><style>${zi}</style><div class="sav-blue-box"><div class="sav-watermark"><img src="${c}" alt=""></div><div style="display:flex;flex-direction:column;gap:0.5rem;text-align:center;position:relative;z-index:1;"><h2 class="sav-heading">${e}</h2><p class="sav-subheading">${i}</p></div><div class="sav-carousel-wrap"><div class="sav-track">${p}</div></div>${n}</div></section>`}const F={heading:"Depósitos y Cuentas de Ahorro",subheading:"Productos diseñados para hacer crecer tu dinero de forma segura.",more_href:"#",more_label:"Ver más",cards:[{img:"",title:"CUENTA DE AHORRO ESTÁNDAR",href:"#",btn_label:"Solicitar"},{img:"",title:"AHORRO RENTABLE",href:"#",btn_label:"Solicitar"},{img:"",title:"CUENTA DE AHORRO MÁS",href:"#",btn_label:"Solicitar"},{img:"",title:"DEPÓSITO DE PLAZO FIJO",href:"#",btn_label:"Solicitar"}]};function Ii(t,e){const i=document.getElementById("sav-config-modal");if(i&&i.remove(),!document.getElementById("sav-modal-styles")){const n=document.createElement("style");n.id="sav-modal-styles",n.textContent=`
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
        `,document.head.appendChild(n)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-savings-config"]||"{}")}catch{return{}}})(),r={heading:a.heading??F.heading,subheading:a.subheading??F.subheading,more_href:a.more_href??F.more_href,more_label:a.more_label??F.more_label,show_more:a.show_more??!0,cards:JSON.parse(JSON.stringify(a.cards??F.cards))},l=document.createElement("div");l.id="sav-config-modal",l.className="sav-overlay";const o=document.createElement("div");o.className="sav-modal",o.innerHTML=`
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
        </div>`,l.appendChild(o),document.body.appendChild(l),l.addEventListener("click",n=>{n.target===l&&c()}),o.querySelectorAll(".sav-tab-btn").forEach(n=>{n.addEventListener("click",()=>{o.querySelectorAll(".sav-tab-btn").forEach(f=>f.classList.remove("active")),o.querySelectorAll(".sav-tab-panel").forEach(f=>f.classList.remove("active")),n.classList.add("active"),o.querySelector(`#sav-panel-${n.dataset.tab}`).classList.add("active")})}),o.querySelector("#sav-show-more").addEventListener("change",function(){r.show_more=this.checked,o.querySelector("#sav-more-fields").style.display=this.checked?"flex":"none"});function p(){const n=o.querySelector("#sav-cards-list");n.innerHTML="",r.cards.forEach((f,h)=>{const b=document.createElement("div");b.className="sav-card-config";const g=f.img?`<img class="sav-img-preview" src="${f.img}" alt="">`:'<div class="sav-img-placeholder"><i class="ri-image-line"></i></div>';b.innerHTML=`
                <div class="sav-card-config-header">
                    <span class="sav-card-num">${h+1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${h+1}</span>
                    <button class="sav-btn-remove sav-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="sav-row">
                    <div id="sav-img-wrap-${h}">${g}</div>
                    <div style="flex:1;display:flex;flex-direction:column;gap:0.5rem;">
                        <input class="sav-input-sm" placeholder="URL de la imagen" value="${f.img||""}" data-field="img">
                        <button class="sav-pick-btn sav-pick-img"><i class="ri-image-line"></i> Seleccionar imagen</button>
                    </div>
                </div>
                <div>
                    <label class="sav-label">Título</label>
                    <input class="sav-input" placeholder="TÍTULO DEL PRODUCTO" value="${f.title||""}" data-field="title">
                </div>
                <div>
                    <label class="sav-label">Descripción <span style="font-weight:400;text-transform:none;color:#94a3b8;">(opcional)</span></label>
                    <input class="sav-input" placeholder="Descripción breve del producto" value="${f.desc||""}" data-field="desc">
                </div>
                <div class="sav-row">
                    <div style="flex:1;">
                        <label class="sav-label">URL del botón</label>
                        <input class="sav-input" placeholder="#" value="${f.href||"#"}" data-field="href">
                    </div>
                    <div style="flex:1;">
                        <label class="sav-label">Texto del botón</label>
                        <input class="sav-input" placeholder="Solicitar" value="${f.btn_label||"Solicitar"}" data-field="btn_label">
                    </div>
                </div>`,b.querySelectorAll("[data-field]").forEach(d=>{d.addEventListener("input",()=>{if(f[d.dataset.field]=d.value,d.dataset.field==="img"){const w=b.querySelector(`#sav-img-wrap-${h}`);w.innerHTML=d.value?`<img class="sav-img-preview" src="${d.value}" alt="">`:'<div class="sav-img-placeholder"><i class="ri-image-line"></i></div>'}})}),b.querySelector(".sav-pick-img").addEventListener("click",()=>{$e({type:"image",title:"Seleccionar imagen de tarjeta",onSelect:d=>{f.img=d,b.querySelector("[data-field='img']").value=d,b.querySelector(`#sav-img-wrap-${h}`).innerHTML=`<img class="sav-img-preview" src="${d}" alt="">`}})}),b.querySelector(".sav-remove-card").addEventListener("click",()=>{r.cards.splice(h,1),p()}),n.appendChild(b)})}p(),o.querySelector("#sav-add-card").addEventListener("click",()=>{r.cards.push({img:"",title:"NUEVO PRODUCTO",desc:"",href:"#",btn_label:"Solicitar"}),p(),o.querySelector("#sav-cards-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})});const c=()=>l.remove();o.querySelector("#sav-modal-close").addEventListener("click",c),o.querySelector("#sav-modal-cancel").addEventListener("click",c),o.querySelector("#sav-modal-save").addEventListener("click",()=>{r.heading=o.querySelector("#sav-heading").value.trim()||F.heading,r.subheading=o.querySelector("#sav-subheading").value.trim()||F.subheading,r.show_more=o.querySelector("#sav-show-more").checked,r.more_label=o.querySelector("#sav-more-label").value.trim()||F.more_label,r.more_href=o.querySelector("#sav-more-href").value.trim()||"#",e.addAttributes({"data-savings-config":JSON.stringify(r)}),e.components(yt(r)),setTimeout(()=>Be(t),300),c()})}function Be(t){try{const e=t.Canvas.getFrameEl()?.contentDocument;if(!e)return;const i=e.getElementById("sav-runtime-script");i&&i.remove(),e.querySelectorAll(".sav-section").forEach(r=>{delete r.__savInit});const a=e.createElement("script");a.id="sav-runtime-script",a.textContent=_i,e.head.appendChild(a)}catch(e){console.warn("[Savings] Error reiniciando carrusel:",e)}}const Di=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;function qi(t){const e="savings-section-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección Fondo Azul",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-savings-config":JSON.stringify(F)},components:yt(F),script:xt,"script-props":["data-savings-config"],traits:[{type:"button",label:"Sección",text:"Administrar Sección",full:!0,command:"open-savings-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-savings-config",{run(i){const a=i.getSelected();a&&Ii(i,a)}}),t.BlockManager.add("savings-section-block",{label:"Sección Fondo Azul",category:"Productos y Servicios",media:Di,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),t.on("component:mount",i=>{i.getEl()?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>Be(t),400))}),t.on("component:selected",i=>{const a=i.getEl();if(!a)return;const r=a.closest(`[data-gjs-type="${e}"]`);if(r&&!a.hasAttribute("data-gjs-type")){const l=t.getWrapper().find(`[data-gjs-type="${e}"]`).find(o=>o.getEl()===r);l&&setTimeout(()=>t.select(l),0)}}),t.on("canvas:render",()=>setTimeout(()=>Be(t),600)),t.on("storage:end:load",()=>setTimeout(()=>Be(t),800))}const He=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="2" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="2" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="2" y="12" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="17" y="12" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="2" y="22" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="22" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
</svg>`,Mi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#F07C28" rx="2"/>
    <rect x="4" y="10" width="14" height="2.5" fill="white" rx="1"/>
    <rect x="4" y="15" width="10" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
    <ellipse cx="24" cy="20" rx="7" ry="9" fill="rgba(255,255,255,0.18)"/>
    <circle cx="22" cy="10" r="3.5" fill="rgba(255,255,255,0.25)"/>
</svg>`,Ni=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</a>`,je=`
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
</style>`,Pi=[{id:"product-link-cards",label:"Tarjetas de productos con enlace",category:"Productos y Servicios",media:He,content:`
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
${je}`},{id:"product-link-card-orange",label:"Tarjeta producto naranja",category:"Productos y Servicios",media:He,media:Mi,content:`${te}${je}`},{id:"product-link-card-blue",label:"Tarjeta producto azul",category:"Productos y Servicios",media:Ni,content:`${ie}${je}`}],Oi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ri=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</a>`,Fe=`
<style>
.il-section{width:100%;background:#ffffff;padding:3.5rem 4rem;}
.il-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
.il-icon-badge{background-color:#E97300;}
.il-link-label{color:#003B71;}
.il-link-item:hover .il-link-label{color:#E97300;}
@media(max-width:1280px){.il-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.il-section{padding:2.5rem 1.5rem;}.il-grid{grid-template-columns:repeat(2,1fr);gap:2rem;}}
@media(max-width:480px){.il-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem;}}
</style>`,Hi=[{id:"icon-links-strip",label:"Iconos con enlace",category:"Productos y Servicios",media:Oi,content:`
<section class="il-section">
    <div class="il-grid">
        ${ae}
        ${ae}
        ${ae}
        ${ae}
    </div>
</section>
${Fe}`},{id:"icon-link-item",label:"Icono con enlace",category:"Productos y Servicios",media:Ri,content:`${ae}${Fe}`}],Fi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ui=`
<style>
.ic-title{color:#003B71;}
.ic-text{color:#003B71;}
</style>`,Te=(t,e)=>`
<div class="ic-card flex items-center gap-4 sm:gap-5 md:gap-7 bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8">
    <img src="${_("images/placeholder.svg")}" alt="Icono" class="ic-icon w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 object-contain">
    <div class="flex flex-col gap-1.5 md:gap-2">
        <h3 class="ic-title text-2xl font-bold leading-snug">${t}</h3>
        <p class="ic-text text-base leading-relaxed">${e}</p>
    </div>
</div>`,Vi=()=>`
<section class="ic-section w-full bg-white flex flex-col gap-4 md:gap-6 p-6 sm:p-8 md:p-12 lg:px-16">
    ${Te("Título de la sección","Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.")}
    ${Te("Título de la sección","Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.")}
    ${Te("Título de la sección","Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.")}
</section>
${Ui}`,Yi=[{id:"icon-cards-block",label:"Tarjetas con ícono",category:"Contenido",media:Fi,content:Vi()}],Xi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Wi=`
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
</div>`,Gi=()=>`
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
${Wi}`,Ji=[{id:"assistance-cards-block",label:"Tarjetas de asistencias",category:"Contenido",media:Xi,content:Gi()}],Ki=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Zi=`
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
</style>`,Qi=[{id:"promo-cta",label:"Promo con CTA y precio",category:"Llamadas a la acción",media:Ki,content:`
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
${Zi}`}],ea=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ta=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,he=`
<div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white">
        <i class="ri-shield-check-line text-lg text-[#E97300]"></i>
    </div>
    <p class="text-white text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`,Ue=`
<div class="flex flex-col gap-4">
    <h2 class="text-4xl font-bold leading-tight flex flex-wrap items-center gap-2">
        <span class="bg-[#003B71] text-white text-3xl font-bold px-3 py-1 rounded-lg leading-tight">Mi</span>
        <span class="text-[#003B71]">Banca</span>
        <span class="text-white font-bold">Integral</span>
    </h2>
    <p class="text-white text-base leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="fb-list-wrap flex flex-col gap-3">
        ${he}
        ${he}
        ${he}
        ${he}
    </div>
</div>`,Ve=`
<div class="fb-col-image">
    <div class="fb-img-wrap">
        <img src="${_("images/placeholder.svg")}" alt="Imagen" class="fb-img">
    </div>
</div>`,ia=`
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
</style>`,Ye=t=>{const e=t?"fb-section-right":"fb-section-left",i=t?`<div class="fb-col-content">${Ue}</div>${Ve}`:`${Ve}<div class="fb-col-content">${Ue}</div>`;return`
<section class="${e}">
    <div class="fb-grid">
        ${i}
    </div>
</section>
${ia}`},aa=[{id:"feature-orange-img-right",label:"Sección naranja - imagen derecha",category:"Banners",media:ta,content:Ye(!0)},{id:"feature-orange-img-left",label:"Sección naranja - imagen izquierda",category:"Banners",media:ea,content:Ye(!1)}],ra=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="5" rx="1" fill="#003B71"/>
    <rect x="12" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="22" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="11" width="28" height="17" rx="2" fill="#003B71" fill-opacity="0.08" stroke="#003B71" stroke-width="1"/>
    <rect x="5" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="14" width="4" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`,De=`
.tabs-btn{transition:background 0.2s,color 0.2s;}
.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}
.tabs-panel{display:none;}
.tabs-panel.active{display:grid;}
.tab-card:hover{background:#003B71;}
.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}
.tab-card:hover .tab-card-title{color:#ffffff;}
.tab-card:hover .tab-card-text{color:#ffffff;}`;function la(){return function(){const t=this,e=".tabs-btn{transition:background 0.2s,color 0.2s;}.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}.tabs-panel{display:none;}.tabs-panel.active{display:grid;}.tab-card:hover{background:#003B71;}.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}.tab-card:hover .tab-card-title{color:#ffffff;}.tab-card:hover .tab-card-text{color:#ffffff;}";(function(){const r=t.ownerDocument??document;if(!r.getElementById("tabs-section-styles")){const l=r.createElement("style");l.id="tabs-section-styles",l.textContent=e,r.head.appendChild(l)}})();function i(a){t.querySelectorAll(".tabs-btn").forEach((r,l)=>{r.classList.toggle("active",l===a)}),t.querySelectorAll(".tabs-panel").forEach((r,l)=>{r.classList.toggle("active",l===a)})}t.querySelectorAll(".tabs-btn").forEach((a,r)=>{a.addEventListener("click",()=>i(r))}),i(0)}}const N=()=>`
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
</div>`,oa=`
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
<style>${De}</style>`,na=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="none" stroke="#003B71" stroke-width="2"/>
    <circle cx="16" cy="10" r="4" fill="none" stroke="#003B71" stroke-width="1.5"/>
    <rect x="8" y="17" width="16" height="2" rx="1" fill="#003B71"/>
    <rect x="6" y="22" width="20" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,sa=[{id:"tabs-cards",label:"Sección con tabs",category:"Contenido",media:ra,content:{type:"tabs-cards-component"}},{id:"tab-card-single",label:"Tarjeta de tab",category:"Contenido",media:na,content:`${N()}`}];function ca(t){const e="tabs-cards-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección con tabs",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,attributes:{"data-gjs-type":e,"data-tab-count":"5"},components:oa,script:la(),traits:[{type:"number",name:"data-tab-count",label:"Número de tabs (2-10)",min:2,max:10,changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",(i,a)=>{const r=parseInt(a["data-tab-count"]);isNaN(r)||this.updateTabCount(r)})},updateTabCount(i){const a=Math.min(10,Math.max(2,i)),r=l=>{const o=Array.from({length:l},()=>'<button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>').join(`
`),p=Array.from({length:l},(c,n)=>`<div class="tabs-panel${n===0?" active":""} grid-cols-3 gap-5">
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
                        <div class="tabs-body">${p}</div>
                    </div>
                    <style>${De}</style>`};this.components(r(a)),setTimeout(()=>{const l=this.get("script"),o=this.getEl();l&&typeof l=="function"&&o&&l.call(o)},200)}}}),da(t,e),fa(t,e)}function da(t,e){t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},300))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();a&&setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},300)}}),t.on("storage:end:load",()=>{setTimeout(()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})},800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function fa(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#tabs-section-styles")){const r=document.createElement("style");r.id="tabs-section-styles",r.textContent=De,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,a.appendChild(r)}}})}const pa=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ga=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ma=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ha=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Xe=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</div>`,ba=t=>{const e=t==="light";return`
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
</div>`},ua=()=>`
<div class="w-full rounded-2xl overflow-hidden">
    <img src="${_("images/placeholder.svg")}"
         alt="Imagen de sección"
         class="w-full object-cover block rounded-2xl"
         style="min-height:320px;max-height:480px;">
</div>`,xa=`
<style>
.split-section{width:100%;padding:3rem 4rem;}
.split-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.split-list-item{min-height:44px;}
@media(max-width:1280px){.split-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.split-section{padding:2.5rem 1.5rem;}.split-grid{grid-template-columns:1fr;gap:2rem;}}
</style>`,be=(t,e)=>{const i=ba(e),a=ua(),r=e==="dark"?"bg-[#003B71]":"bg-white",l=t?`<div>${i}</div><div>${a}</div>`:`<div class="split-img-mobile-first">${a}</div><div>${i}</div>`;return`
<section class="split-section ${r}">
    <div class="split-grid">
        ${l}
    </div>
</section>
${xa}`},ya=[{id:"split-content-light-img-right",label:"Contenido claro - imagen derecha",category:"Contenido",media:pa,content:be(!0,"light")},{id:"split-content-light-img-left",label:"Contenido claro - imagen izquierda",category:"Contenido",media:ga,content:be(!1,"light")},{id:"split-content-dark-img-right",label:"Contenido azul - imagen derecha",category:"Contenido",media:ma,content:be(!0,"dark")},{id:"split-content-dark-img-left",label:"Contenido azul - imagen izquierda",category:"Contenido",media:ha,content:be(!1,"dark")},{id:"split-list-item",label:"Item de lista con badge",category:"Contenido",media:Xe,content:W("light")},{id:"split-list-group",label:"Lista con badges",category:"Contenido",media:Xe,content:`
<div class="flex flex-col gap-4">
    ${W("light")}
    ${W("light")}
    ${W("light")}
</div>`}],va=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="0" y="6" width="10" height="22" fill="white"/>
    <path d="M10 6 Q10 6 16 6 L16 28 Q10 28 10 22 Z" fill="#E97300"/>
    <circle cx="22" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="22" cy="14" r="1.5" fill="white"/>
    <rect x="18" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,wa=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</div>`,ka=`
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
</style>`,We=t=>`
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
${ka}`,Ba=[{id:"stats-strip-left",label:"Franja estadísticas - izquierda",category:"Heroes",media:va,content:We(!0)},{id:"stats-strip-right",label:"Franja estadísticas - derecha",category:"Heroes",media:wa,content:We(!1)}],Ea=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,$a=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</div>`,Ge=`
<style>
.svc-section{width:100%;background:#003B71;padding:3rem 4rem;}
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;margin-top:3rem;}
.svc-more-wrap{display:flex;justify-content:center;margin-top:3rem;}
.svc-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:9999px;background:#ffffff;color:#003B71;font-size:1rem;font-weight:600;text-decoration:none;transition:background 0.2s,color 0.2s;}
.svc-more-btn:hover{background:#dce8f5;}
@media(max-width:1280px){.svc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.svc-section{padding:2.5rem 1.5rem;}.svc-grid{grid-template-columns:repeat(2,1fr);gap:2rem;}}
@media(max-width:480px){.svc-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem;}}
</style>`,Sa=[{id:"service-cards-section",label:"Sección de servicios con iconos",category:"Productos y Servicios",media:Ea,content:`
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
${Ge}`},{id:"service-card-item",label:"Ítem de servicio con icono",category:"Productos y Servicios",media:$a,content:`${oe}${Ge}`}],Ca=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="9" width="30" height="14" fill="white" rx="7" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="4" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="13" width="6" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="10" y="16" width="5" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="17.5" y="12" width="0.8" height="8" rx="0.4" fill="#e5e7eb"/>
    <rect x="20" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="25.5" y="13" width="0" height="0" rx="0"/>
</svg>`,La=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="2" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="5.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="5.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="8.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="3" y="18" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="21.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="21.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="24.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
</svg>`,ja=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</div>`,_e=`
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
</style>`,Ta=[{id:"contact-info-row",label:"Contacto en fila",category:"Contacto",media:Ca,content:`
<section class="ci-section">
    <div class="ci-row-wrap">
        <div class="ci-pill-row">
            ${ne("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
            <div class="ci-divider"></div>
            ${ne("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com")}
        </div>
    </div>
</section>
${_e}`},{id:"contact-info-col",label:"Contacto en columna",category:"Contacto",media:La,content:`
<section class="ci-section">
    <div class="ci-col-wrap">
        <div class="ci-pill-col">
            ${ne("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
            <div class="ci-divider-h"></div>
            ${ne("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com")}
        </div>
    </div>
</section>
${_e}`},{id:"contact-info-item",label:"Ítem de contacto",category:"Contacto",media:ja,content:`
<section class="ci-section">
    <div class="ci-row-wrap">
        <div class="ci-pill-row">
            ${ne("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
        </div>
    </div>
</section>
${_e}`}],_a=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="6" cy="8" r="2" fill="#F07C28"/>
    <rect x="10" y="7" width="16" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="10" y="11" width="14" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="10" y="13.5" width="12" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <circle cx="6" cy="19" r="2" fill="#F07C28"/>
    <rect x="10" y="18" width="16" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="10" y="22" width="14" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="10" y="24.5" width="12" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
</svg>`,za=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</div>`,Je=`
<style>
.rl-section{width:100%;padding:3rem 4rem;background:#ffffff;box-sizing:border-box;}
.rl-list{display:flex;flex-direction:column;gap:1.75rem;}
.rl-item__title{color:#F07C28;}
.rl-bullet{color:#F07C28;font-size:1.25rem;line-height:1;}
.rl-item__body{color:#003B71;}
@media(max-width:1280px){.rl-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.rl-section{padding:2.5rem 1.5rem;}}
</style>`,Aa=[{id:"rich-list",label:"Lista con título y descripción",category:"Contenido",media:_a,content:`
<section class="rl-section">
    <div class="rl-list">
        ${se}
        ${se}
        ${se}
        ${se}
    </div>
</section>
${Je}`},{id:"rich-list-item",label:"Ítem de lista con descripción",category:"Contenido",media:za,content:`
<section class="rl-section">
    <div class="rl-list">
        ${se}
    </div>
</section>
${Je}`}],Z=`
<style>
.pd-asymmetric-grid{display:grid;grid-template-columns:3fr 2fr;gap:2rem;align-items:start;}
@media(max-width:992px){.pd-asymmetric-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`,Ia=`
<style>
.pd-three-col-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem;align-items:start;}
.pd-three-col-grid>div:last-child:nth-child(3n+1){grid-column:1/-1;max-width:33%;margin:0 auto;}
@media(max-width:992px){.pd-three-col-grid{gap:1.5rem;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:50%;}}
@media(max-width:640px){.pd-three-col-grid{grid-template-columns:1fr;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:none;}}
</style>`,Da=`
<style>
.pd-icons-cta-grid{display:grid;grid-template-columns:3fr 2fr;gap:2rem;align-items:center;}
@media(max-width:992px){.pd-icons-cta-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`,Ke=`
<style>
.pd-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
.pd-card{background:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;gap:0.75rem;}
@media(max-width:640px){.pd-cards-grid{grid-template-columns:1fr;}}
</style>`,Ze=`
<style>
.pd-cards-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;}
.pd-card-simple{background:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;align-items:center;gap:0.75rem;text-align:center;}
@media(max-width:640px){.pd-cards-row{grid-template-columns:1fr 1fr;}}
</style>`,qa=`
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
</style>`,Ma=`
<style>
.pd-coverage-table{width:100%;border-collapse:collapse;border-radius:0.5rem;overflow:hidden;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);}
.pd-coverage-table thead th{background-color:#E97300;color:#fff;text-align:left;padding:0.75rem 1rem;font-size:0.95rem;letter-spacing:0.02em;}
.pd-coverage-table thead th:not(:first-child){text-align:center;}
.pd-coverage-table tbody td{padding:0.65rem 1rem;font-size:0.9rem;color:#003B71;border-bottom:1px solid #e5e7eb;}
.pd-coverage-table tbody td:not(:first-child){text-align:center;font-weight:700;}
.pd-coverage-table tbody tr:last-child td{border-bottom:none;}
.pd-coverage-table tbody td:first-child{font-weight:700;}
@media(max-width:640px){.pd-coverage-table{font-size:0.8rem;}.pd-coverage-table thead th,.pd-coverage-table tbody td{padding:0.5rem 0.6rem;}}
</style>`,D=`
<style>
.pd-text-muted{color:#6b7280;}
.pd-dot-muted{background-color:#6b7280;}
.pd-btn-orange{background-color:#E97300;}
.pd-btn-orange:hover{background-color:#c96200;}
.pd-box-border{border-color:#003B71;}
.pd-text-primary{color:#003B71;}
.pd-text-orange{color:#E97300;}
.pd-box-divider{background-color:#E97300;}
</style>`,qe=()=>`
<li class="flex items-start gap-2 text-base text-[#003B71]">
    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#003B71] shrink-0"></span>
    <span>Lorem ipsum dolor sit amet consectetur adipiscing elit.</span>
</li>`,P=(t=3,e=null)=>`
<div class="flex flex-col gap-3">
    ${e?`<span class="text-base font-bold text-[#E97300] tracking-wide">${e}</span>`:""}
    <ul class="list-none p-0 m-0 flex flex-col gap-3">
        ${Array.from({length:t},qe).join("")}
    </ul>
</div>`,Na=()=>`
<p class="text-sm pd-text-muted leading-relaxed text-justify m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,U=(t=1)=>`
<div class="w-full flex flex-col gap-2">
    ${Array.from({length:t},Na).join("")}
</div>`,xe=()=>`
<div class="w-full rounded-xl border-2 pd-box-border px-6 py-4 flex flex-col items-center justify-center gap-1 text-center">
    <span class="text-2xl font-bold pd-text-primary tracking-wide">Invierte desde:</span>
    <span class="text-2xl font-black pd-text-orange">$00.00</span>
</div>`,Qe=()=>`
<div class="flex flex-col items-center justify-center gap-1 py-4 px-6">
    <span class="text-lg font-bold pd-text-primary tracking-wide leading-snug">Invierte desde:</span>
    <span class="text-lg font-bold pd-text-primary">Hasta: <span class="pd-text-orange">$00.00</span></span>
</div>`,et=()=>`
<div class="w-full rounded-xl border-2 pd-box-border flex flex-col">
    ${Qe()}
    <div class="px-6">
        <div class="w-full h-0.5 pd-box-divider"></div>
    </div>
    ${Qe()}
</div>`,ce=(t="Lorem ipsum",e=3)=>`
<div class="pd-card items-center">
    <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${_("images/placeholder.svg")}" alt="" class="w-6 h-6 object-contain">
    </div>
    <span class="text-base font-bold text-[#E97300] tracking-wide leading-snug w-full">${t}</span>
    <ul class="list-none p-0 m-0 flex flex-col gap-2 w-full">
        ${Array.from({length:e},qe).join("")}
    </ul>
</div>`,vt=(t="Lorem ipsum")=>`
<div class="pd-card-simple">
    <div class="w-14 h-14 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${_("images/placeholder.svg")}" alt="" class="w-7 h-7 object-contain">
    </div>
    <span class="text-base font-bold text-[#003B71] tracking-wide">${t}</span>
    <p class="text-base text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
</div>`,Pa=(t=4)=>`
<div class="pd-cards-row">
    ${Array.from({length:t},()=>vt()).join("")}
</div>`,O=(t="Adquiere tu servicio")=>`
<a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center tracking-wide max-w-full transition-colors no-underline">${t}</a>`,R=(t="Nombre del Producto")=>`
<h2 class="text-4xl font-black text-[#E97300] break-words leading-tight text-center w-full">${t}</h2>`,Oa={title:"Coberturas",cols:3,headers:[{text:"Coberturas",align:"left"},{text:"Cantidad",align:"center"},{text:"Límite (US$)",align:"center"}],rows:Array.from({length:5},()=>[{text:"",align:"left",isHeader:!1,colspan:1,rowspan:1,image:null},{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null},{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null}])},tt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,it=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="13" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="5" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="9" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="12" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="18" y="2" width="12" height="3" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="18" y="7" width="12" height="2" rx="1" fill="#E97300" fill-opacity="0.4"/>
    <rect x="18" y="12" width="12" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.85"/>
</svg>`,at=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ra=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="4" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
    <rect x="12" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="14" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
    <rect x="22" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="23" y="11" width="6" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
</svg>`,Ha=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="13" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="24" y="2" width="6" height="6" rx="1" fill="none" stroke="#E97300" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="24" y="11" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`,Fa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="5" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="13" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="21" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <rect x="24" y="17" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`,rt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="20" height="4" fill="#E97300" fill-opacity="0.8" rx="1"/>
    <rect x="2" y="10" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
    <rect x="2" y="14" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
    <rect x="2" y="18" width="20" height="3" fill="none" stroke="#003B71" stroke-opacity="0.3" stroke-width="0.6"/>
    <rect x="24" y="4" width="6" height="4" rx="1" fill="none" stroke="#E97300" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="24" y="11" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`,lt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="6" cy="10" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="9" width="18" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <circle cx="6" cy="17" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="16" width="16" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <circle cx="6" cy="24" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="23" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,Ua=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="5" width="26" height="1.5" rx="0.75" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="3" y="9" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="11.5" width="20" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="16" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
</svg>`,Va=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="6" y="13" width="20" height="7" rx="3.5" fill="#E97300" fill-opacity="0.85"/>
</svg>`,Ya=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="12" width="24" height="5" rx="1" fill="#E97300" fill-opacity="0.8"/>
    <rect x="8" y="19" width="16" height="2" rx="1" fill="#E97300" fill-opacity="0.4"/>
</svg>`,z="Detalle de Producto",Xa=[{id:"product-detail-section",label:"Sección: 2 columnas (texto + acción)",category:z,media:tt,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            ${P(5,"Ventajas:")}
        </div>
        <div class="flex flex-col items-center gap-4">
            ${R("Nombre del Producto")}
            ${O("Adquiere tu servicio")}
            ${U(3)}
        </div>
    </div>
</section>
${Z}
${D}`},{id:"product-detail-box",label:"Sección: 2 columnas + cuadro de precio",category:z,media:ye,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            ${P(4,"Ventajas:")}
        </div>
        <div class="flex flex-col items-center gap-4">
            ${R("Nombre del Producto")}
            ${O("Adquiere tu servicio")}
            ${xe()}
            ${U(3)}
        </div>
    </div>
</section>
${Z}
${D}`},{id:"product-detail-box-double",label:"Sección: 2 columnas + cuadro de precio doble",category:z,media:ye,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p class="text-base font-bold text-[#E97300] leading-snug">Lorem ipsum dolor sit amet, subtítulo destacado de la sección.</p>
            ${P(6,"Ventajas")}
        </div>
        <div class="flex flex-col items-center gap-4">
            ${R("Nombre del Producto")}
            ${O("Solicita tu crédito")}
            ${et()}
            ${U(2)}
        </div>
    </div>
</section>
${Z}
${D}`},{id:"product-detail-three-col",label:"Sección: 3 columnas (2 listas + acción)",category:z,media:Ra,content:`
<section class="w-full bg-white px-16 py-12 flex flex-col gap-6">
    <p class="text-lg font-bold text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <div class="pd-three-col-grid">
        ${P(3,"Ventajas:")}
        ${P(3,"Beneficios:")}
        <div class="flex flex-col items-center gap-4">
            ${R("Nombre del Producto")}
            ${O("Adquiere tu servicio")}
            ${U(3)}
        </div>
    </div>
</section>
${Ia}
${D}`},{id:"product-detail-header-grid",label:"Sección: encabezado + 2 listas + acción",category:z,media:Ha,content:`
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
            ${R("Nombre del Producto")}
            ${O("Adquiere tu servicio")}
            ${U(3)}
        </div>
    </div>
</section>
${qa}
${D}`},{id:"product-detail-cards-grid",label:"Sección: tarjetas con lista + acción",category:z,media:it,content:`
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
            ${R("Nombre del Producto")}
            ${O("Adquiere tu servicio")}
            ${U(2)}
            ${P(4,"Ventajas:")}
            ${P(2,"Condiciones:")}
        </div>
    </div>
</section>
${Z}
${Ke}
${D}`},{id:"product-detail-cards-row",label:"Sección: fila de tarjetas simples (sin acción lateral)",category:z,media:at,content:`
<section class="w-full bg-white px-16 py-12 flex flex-col gap-5">
    <p class="text-base font-bold text-[#E97300] m-0">Subtítulo destacado</p>
    <p class="text-base font-semibold text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    ${Pa(4)}
</section>
${Ze}
${D}`},{id:"product-detail-repeat-blocks",label:"Sección: bloques título+párrafo repetidos + acción",category:z,media:tt,content:`
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
            ${R("Nombre del Producto")}
            ${O("Adquiere tu servicio")}
            ${xe()}
            ${U(2)}
        </div>
    </div>
</section>
${Z}
${D}`},{id:"product-detail-icons-cta",label:"Sección: imagen/íconos + acción",category:z,media:Fa,content:`
<section class="w-full bg-white px-16 py-12 flex flex-col gap-8">
    <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
    <div class="pd-icons-cta-grid">
        <div class="w-full">
            <img src="${_("images/placeholder.svg")}" alt="Servicios disponibles" class="w-full h-auto object-contain">
        </div>
        <div class="flex flex-col items-center gap-4">
            ${R("Nombre del Producto")}
            ${O("Adquiere tu servicio")}
        </div>
    </div>
    <p class="text-base text-[#003B71] leading-relaxed m-0">Lorem ipsum dolor sit amet, texto adicional de cierre de la sección.</p>
</section>
${Da}
${D}`},{id:"product-detail-table",label:"Sección: tabla de coberturas + acción",category:z,media:rt,content:`
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
            ${R("Nombre del Producto")}
            ${O("Adquiere tu servicio")}
            ${xe()}
            ${U(2)}
        </div>
    </div>
</section>
${Z}
${Ma}
${D}`},{id:"product-detail-bullet-item",label:"Ítem: bullet individual",category:z,media:lt,content:`
<ul class="list-none p-0 m-0 flex flex-col gap-3">
    ${qe()}
</ul>
${D}`},{id:"product-detail-bullet-list",label:"Ítem: lista de ventajas (con título)",category:z,media:lt,content:`
${P(4,"Ventajas:")}
${D}`},{id:"product-detail-footnote",label:"Ítem: nota al pie",category:z,media:Ua,content:`
${U(1)}
${D}`},{id:"product-detail-cta-button",label:"Ítem: botón CTA",category:z,media:Va,content:`
${O("Adquiere tu servicio")}
${D}`},{id:"product-detail-title",label:"Ítem: título de producto",category:z,media:Ya,content:`
${R("Nombre del Producto")}
${D}`},{id:"product-detail-price-box",label:"Ítem: cuadro de precio simple",category:z,media:ye,content:`
${xe()}
${D}`},{id:"product-detail-price-box-double",label:"Ítem: cuadro de precio doble",category:z,media:ye,content:`
${et()}
${D}`},{id:"product-detail-icon-card",label:"Ítem: tarjeta con ícono + lista",category:z,media:it,content:`
<div class="pd-cards-grid" style="grid-template-columns:1fr;max-width:320px;">
    ${ce("Lorem ipsum",3)}
</div>
${Ke}
${D}`},{id:"product-detail-icon-card-simple",label:"Ítem: tarjeta simple (ícono + texto)",category:z,media:at,content:`
<div class="pd-cards-row" style="grid-template-columns:1fr;max-width:260px;">
    ${vt("Lorem ipsum")}
</div>
${Ze}
${D}`},{id:"product-detail-coverage-table",label:"Ítem: tabla de coberturas",category:z,media:rt,content:'<div data-gjs-type="table-component" data-table-theme="orange" data-coverage-table-init="1"></div>'}];typeof window<"u"&&(window.__coverageTableInitialData=Oa);const ot=`
<style>
.fc-cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;}
.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){grid-column:1/-1;max-width:25%;margin:0 auto;}
@media(max-width:992px){.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){max-width:50%;}}
@media(max-width:640px){.fc-cards-grid{grid-template-columns:1fr;}.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){max-width:none;}}
</style>`,Wa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#E97300" fill-opacity="0.8"/>
    <path d="M13 12a3 3 0 1 1 4 2.8V16h-2v-1.2a3 3 0 0 1-2-2.8z" fill="#ffffff"/>
    <rect x="14.5" y="17" width="3" height="1" fill="#ffffff"/>
    <rect x="6" y="22" width="20" height="4" rx="1" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="8" y="23.5" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
</svg>`,Ga=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</div>`,Ja=[{id:"financing-section",label:"Sección de financiamiento",category:"Productos y Servicios",media:Ga,content:`
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
${ot}`},{id:"financing-card",label:"Tarjeta de financiamiento",category:"Productos y Servicios",media:Wa,content:`
<div class="fc-cards-grid">
    ${de("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
</div>
${ot}`}],Ka=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Za=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="2"/>
    <rect x="7" y="7" width="18" height="5" fill="#003B71" fill-opacity="0.1" rx="1"/>
    <rect x="7" y="14" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
    <rect x="7" y="17" width="18" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="7" y="19" width="14" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="7" y="23" width="18" height="3.5" rx="1.75" fill="#E97300" fill-opacity="0.8"/>
</svg>`,nt=`
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
</div>`,Qa=[{id:"news-grid-section",label:"Noticias y Publicaciones",category:"Contenido",media:Ka,content:`
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
${nt}`},{id:"news-card",label:"Tarjeta de noticia",category:"Contenido",media:Za,content:`${fe}${nt}`}],er=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="3" y="4" width="26" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="10" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="10" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="16" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="16" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="22" width="26" height="5" fill="#F07C28" rx="1"/>
</svg>`,tr=`
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
`,ir=[{id:"contact-form",label:"Formulario de contacto",category:"Formularios",media:er,content:`
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
${tr}
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
<\/script>`}],ar=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="6" rx="1" fill="#003B71"/>
    <rect x="2" y="10" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="17" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <rect x="2" y="24" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <line x1="11" y1="2" x2="11" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
    <line x1="21" y1="2" x2="21" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
</svg>`,Ee={blue:{headerBg:"bg-[#003B71]",headerText:"text-white",subheaderBg:"bg-[#003B71]",subheaderText:"text-white",borderColor:"#003B71",rowText:"text-[#003B71]",labelText:"text-[#003B71]"},orange:{headerBg:"bg-[#E97300]",headerText:"text-white",subheaderBg:"bg-[#E97300]",subheaderText:"text-white",borderColor:"#E97300",rowText:"text-[#003B71]",labelText:"text-[#003B71]"}};function wt(t,e){const i=Ee[e]||Ee.blue,a=t.showTitleRow!==!1&&!!t.title,r=t.showHeaderRow!==!1;let l='<table class="w-full border-collapse font-[Poppins,sans-serif] table-fixed">';if(a||r){if(l+="<thead>",a&&(l+=`<tr>
                <th colspan="${t.cols}" class="p-3 align-middle text-center text-base font-bold ${i.headerBg} ${i.headerText}">
                    ${t.title}
                </th>
            </tr>`),r&&t.headers?.length){const c=a?i.subheaderBg:i.headerBg,n=a?i.subheaderText:i.headerText;l+="<tr>",t.headers.forEach((f,h)=>{const b=h<t.headers.length-1?`border-r border-[${i.borderColor}]`:"";l+=`<th class="p-3 align-middle text-sm font-semibold ${c} ${n} ${b} border-b border-[${i.borderColor}] text-${f.align||"center"}">${f.text||""}</th>`}),l+="</tr>"}l+="</thead>"}l+="<tbody>";const o=t.rows.length,p={};return t.rows.forEach((c,n)=>{l+="<tr>";let f=0;c.forEach(h=>{for(;p[`${n}-${f}`];)f++;const b=h.colspan||1,g=h.rowspan||1;for(let j=n;j<n+g;j++)for(let A=f;A<f+b;A++)(j!==n||A!==f)&&(p[`${j}-${A}`]=!0);const d=b>1?`colspan="${b}"`:"",w=g>1?`rowspan="${g}"`:"",C=h.isHeader?`tbl-cell-highlight-${e}`:`tbl-cell-normal-${e}`,y="font-semibold",v=h.isHeader?i.labelText:i.rowText,u=`text-${h.align||"center"}`,m=n+g>=o,k=f+b>=t.cols?"":`border-r border-[${i.borderColor}]`,S=m?"":`border-b border-[${i.borderColor}]`,B=`${k} ${S} p-3 align-middle text-sm ${C} ${y} ${v} ${u}`;h.image?l+=`<td ${d} ${w} class="${B}">
                    <img src="${h.image}" alt="${h.text||""}" class="max-w-full max-h-20 h-auto object-contain block mx-auto">
                    ${h.text?`<span class="block mt-1 text-xs ${v}">${h.text}</span>`:""}
                </td>`:l+=`<td ${d} ${w} class="${B}">${h.text||""}</td>`,f+=b}),l+="</tr>"}),l+="</tbody></table>",l}function Q(t,e){return{title:"Título de la tabla",showTitleRow:!0,showHeaderRow:!0,cols:t,headers:Array.from({length:t},(i,a)=>({text:`Columna ${a+1}`,align:"center"})),rows:Array.from({length:e},()=>Array.from({length:t},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})))}}function rr(t){return`<style>
.tbl-cell-normal-${t}{background-color:#ffffff;}
.tbl-cell-highlight-${t}{background-color:#e2e8f0;}
</style>`}function kt(t,e){return`<div class="w-full overflow-x-auto rounded-2xl border-2 border-[${(Ee[e]||Ee.blue).borderColor}]">${rr(e)}${t}</div>`}function st(t,e){const i={};return t.forEach((a,r)=>{let l=0;a.forEach(o=>{for(;i[`${r}-${l}`];)l++;const p=Math.min(o.colspan||1,e-l),c=o.rowspan||1;for(let n=r;n<r+c;n++)for(let f=l;f<l+p;f++)(n!==r||f!==l)&&(i[`${n}-${f}`]=`${r}-${l}`);l+=p})}),i}const lr=`
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
.tam-img-selected-info{font-size:0.8125rem;color:#64748b;}`;function or(){if(document.getElementById("tam-img-modal"))return;const t=document.createElement("div");t.id="tam-img-modal",t.className="tam-img-overlay",t.innerHTML=`
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
        </div>`,document.body.appendChild(t);let e=null,i=null;async function a(p=""){const c=document.getElementById("tam-img-grid");c.innerHTML='<div class="tam-img-loading"><div class="tam-img-spinner"></div><span>Cargando...</span></div>';try{const n=new URLSearchParams({type:"image",per_page:50});p&&n.append("search",p);const f=document.querySelector('meta[name="media-api-url"]')?.content??"/media/api",g=(await(await fetch(`${f}?${n}`,{headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}})).json()).items||[];if(!g.length){c.innerHTML='<div class="tam-img-loading"><i class="ri-image-line" style="font-size:2rem;"></i><span>No se encontraron imágenes</span></div>';return}c.innerHTML="",g.forEach(d=>{const w=document.createElement("div");w.className="tam-img-card",w.innerHTML=`<img src="${d.url}" alt="${d.filename}"><p title="${d.filename}">${d.filename}</p>`,w.addEventListener("click",()=>{c.querySelectorAll(".tam-img-card").forEach(C=>C.classList.remove("selected")),w.classList.add("selected"),e=d.url,document.getElementById("tam-img-selected-info").textContent=`Seleccionada: ${d.filename}`,document.getElementById("tam-img-confirm").disabled=!1}),c.appendChild(w)})}catch{c.innerHTML='<div class="tam-img-loading"><i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i><span style="color:#dc2626;">Error al cargar imágenes</span></div>'}}function r(p){i=p,e=null,document.getElementById("tam-img-selected-info").textContent="Ninguna imagen seleccionada",document.getElementById("tam-img-confirm").disabled=!0,document.getElementById("tam-img-search-input").value="",t.classList.add("open"),a()}function l(){t.classList.remove("open"),e=null,i=null}document.getElementById("tam-img-close").addEventListener("click",l),document.getElementById("tam-img-cancel").addEventListener("click",l),document.getElementById("tam-img-confirm").addEventListener("click",()=>{e&&i&&(i(e),l())});let o;document.getElementById("tam-img-search-input").addEventListener("input",p=>{clearTimeout(o),o=setTimeout(()=>a(p.target.value),300)}),t.addEventListener("click",p=>{p.target===t&&l()}),window.__openTableImagePicker=r}function nr(t,e){if(document.getElementById("table-admin-modal"))return;const i=document.createElement("style");i.id="table-admin-modal-styles",i.textContent=lr,document.head.appendChild(i),or();const a=document.createElement("div");a.id="table-admin-modal",a.className="tam-overlay",a.innerHTML=`
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
        </div>`,document.body.appendChild(a);let r=null,l=null;function o(){const g=document.getElementById("tam-show-title-row").checked,d=document.getElementById("tam-title");d.disabled=!g,d.style.opacity=g?"1":"0.5"}function p(g){r=g;const d=g.get("tableData");l=d?JSON.parse(JSON.stringify(d)):Q(3,3);const w=l.cols||3;l.rows=l.rows.map(C=>Array.from({length:w},(y,v)=>C[v]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})),document.getElementById("tam-title").value=l.title||"",document.getElementById("tam-theme").value=g.get("tableTheme")||"blue",document.getElementById("tam-cols").value=l.cols||3,document.getElementById("tam-rows").value=l.rows.length||3,document.getElementById("tam-show-title-row").checked=l.showTitleRow!==!1,document.getElementById("tam-show-header-row").checked=l.showHeaderRow!==!1,o(),h(),b(),a.classList.add("open"),document.body.style.overflow="hidden"}function c(){a.classList.remove("open"),document.body.style.overflow="",r=null}function n(){l.title=document.getElementById("tam-title").value.trim(),l.showTitleRow=document.getElementById("tam-show-title-row").checked,l.showHeaderRow=document.getElementById("tam-show-header-row").checked,l.cols=parseInt(document.getElementById("tam-cols").value)||3,l.headers=Array.from(document.querySelectorAll(".tam-header-input")).map(d=>({text:d.value,align:d.closest("th")?.querySelector(".tam-align-select")?.value||"center"})),document.querySelectorAll("#tam-tbody td.tam-cell:not(.is-spanned)").forEach(d=>{const w=parseInt(d.dataset.row),C=parseInt(d.dataset.col);l.rows[w]?.[C]&&(l.rows[w][C].text=d.querySelector(".tam-cell-input")?.value||"",l.rows[w][C].align=d.querySelector(".tam-align-select")?.value||"center",l.rows[w][C].isHeader=d.dataset.isheader==="1",l.rows[w][C].image=d.dataset.image||null)});const g=st(l.rows,l.cols);l.rows=l.rows.map((d,w)=>d.filter((C,y)=>!g[`${w}-${y}`]))}function f(){if(a.querySelector("#tam-rebuild-notice"))return;const d=document.createElement("div");d.id="tam-rebuild-notice",d.className="tam-rebuild-notice",d.style.margin="1rem 1.25rem 0",d.innerHTML='<i class="ri-error-warning-line"></i> Has modificado el colspan/rowspan. Haz clic en <strong style="margin:0 4px;">Reconstruir</strong> para aplicar los cambios de fusión.',a.querySelector(".tam-toolbar").after(d)}function h(){a.querySelector("#tam-rebuild-notice")?.remove()}function b(){const g=document.getElementById("tam-thead"),d=document.getElementById("tam-tbody"),w=l.cols,C=l.rows.length,y=st(l.rows,w);g.innerHTML=`<tr>${l.headers.map((v,u)=>`
            <th>
                <input class="tam-cell-input tam-header-input" value="${v.text||""}" placeholder="Col ${u+1}" style="font-weight:600;">
                <select class="tam-align-select" style="margin-top:4px;width:100%;font-size:0.7rem;padding:2px;">
                    <option value="left" ${v.align==="left"?"selected":""}>Izquierda</option>
                    <option value="center" ${v.align==="center"?"selected":""}>Centro</option>
                    <option value="right" ${v.align==="right"?"selected":""}>Derecha</option>
                </select>
            </th>`).join("")}</tr>`,d.innerHTML=l.rows.map((v,u)=>`<tr>${Array.from({length:w},(E,k)=>{const S=y[`${u}-${k}`];if(S)return`<td class="tam-cell is-spanned" data-row="${u}" data-col="${k}">
                        <div class="tam-spanned-label">Combinada con [${S}]</div>
                    </td>`;const B=v[k]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null},j=B.colspan||1,A=B.rowspan||1,q=j>1||A>1;return`<td class="tam-cell ${B.isHeader?"is-header-cell":""} ${B.image?"has-image":""} ${q?"has-span":""}"
                    data-row="${u}" data-col="${k}"
                    data-isheader="${B.isHeader?"1":"0"}"
                    data-colspan="${j}"
                    data-rowspan="${A}"
                    data-image="${B.image||""}">
                    ${B.image?`<img class="tam-cell-img-preview" src="${B.image}" alt="">`:""}
                    <textarea class="tam-cell-input" placeholder="Texto...">${B.text||""}</textarea>
                    <select class="tam-align-select" style="width:100%;font-size:0.7rem;padding:2px;margin-top:4px;">
                        <option value="left" ${B.align==="left"?"selected":""}>Izquierda</option>
                        <option value="center" ${B.align==="center"?"selected":""}>Centro</option>
                        <option value="right" ${B.align==="right"?"selected":""}>Derecha</option>
                    </select>
                    <div class="tam-cell-actions">
                        <button type="button" class="tam-cell-btn tam-cell-btn-header ${B.isHeader?"active":""}"
                            data-action="header" data-row="${u}" data-col="${k}">
                            ${B.isHeader?"✓ Resaltar":"Resaltar"}
                        </button>
                        <button type="button" class="tam-cell-btn tam-cell-btn-img"
                            data-action="image" data-row="${u}" data-col="${k}">
                            <i class="ri-image-line"></i> ${B.image?"Cambiar":"Imagen"}
                        </button>
                        ${B.image?`<button type="button" class="tam-cell-btn tam-cell-btn-clear" data-action="clear-image" data-row="${u}" data-col="${k}">✕ Quitar</button>`:""}
                        <div class="tam-cell-span-group">
                            <label title="Columnas que ocupa">CS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${w-k}"
                                value="${j}" data-action="colspan" data-row="${u}" data-col="${k}">
                            <label title="Filas que ocupa">RS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${C-u}"
                                value="${A}" data-action="rowspan" data-row="${u}" data-col="${k}">
                        </div>
                    </div>
                </td>`}).join("")}</tr>`).join(""),d.querySelectorAll("input[data-action=colspan], input[data-action=rowspan]").forEach(v=>{v.addEventListener("change",()=>{const u=parseInt(v.dataset.row),m=parseInt(v.dataset.col),E=Math.max(1,parseInt(v.value)||1);l.rows[u]?.[m]&&(v.dataset.action==="colspan"?l.rows[u][m].colspan=Math.min(E,w-m):l.rows[u][m].rowspan=Math.min(E,C-u),f())})}),d.querySelectorAll("button[data-action]").forEach(v=>{v.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation();const m=v.dataset.action,E=parseInt(v.dataset.row),k=parseInt(v.dataset.col);if(!(isNaN(E)||isNaN(k)||!l.rows[E]?.[k])){if(m==="header"){l.rows[E][k].isHeader=!l.rows[E][k].isHeader;const S=d.querySelector(`td[data-row="${E}"][data-col="${k}"]`);S&&(S.dataset.isheader=l.rows[E][k].isHeader?"1":"0",S.classList.toggle("is-header-cell",l.rows[E][k].isHeader)),v.classList.toggle("active",l.rows[E][k].isHeader),v.textContent=l.rows[E][k].isHeader?"✓ Resaltar":"Resaltar";return}if(m==="image"){window.__openTableImagePicker&&window.__openTableImagePicker(S=>{l.rows[E][k].image=S;const B=d.querySelector(`td[data-row="${E}"][data-col="${k}"]`);if(B){B.dataset.image=S,B.classList.add("has-image");let j=B.querySelector(".tam-cell-img-preview");j||(j=document.createElement("img"),j.className="tam-cell-img-preview",B.insertBefore(j,B.firstChild)),j.src=S;const A=B.querySelector("[data-action=image]");if(A&&(A.innerHTML='<i class="ri-image-line"></i> Cambiar'),!B.querySelector("[data-action=clear-image]")){const q=document.createElement("button");q.type="button",q.className="tam-cell-btn tam-cell-btn-clear",q.dataset.action="clear-image",q.dataset.row=E,q.dataset.col=k,q.textContent="✕ Quitar",q.addEventListener("click",V=>{V.preventDefault(),V.stopPropagation(),l.rows[E][k].image=null,B.dataset.image="",B.classList.remove("has-image"),j.remove(),q.remove();const J=B.querySelector("[data-action=image]");J&&(J.innerHTML='<i class="ri-image-line"></i> Imagen')}),B.querySelector(".tam-cell-actions").appendChild(q)}}});return}m==="clear-image"&&(l.rows[E][k].image=null,b())}})})}document.getElementById("tam-close").addEventListener("click",c),document.getElementById("tam-cancel").addEventListener("click",c),a.addEventListener("click",g=>{g.target===a&&c()}),document.getElementById("tam-show-title-row").addEventListener("change",o),document.getElementById("tam-rebuild").addEventListener("click",()=>{const g=parseInt(document.getElementById("tam-cols").value)||3,d=parseInt(document.getElementById("tam-rows").value)||3;for(h(),n();l.headers.length<g;)l.headers.push({text:`Col ${l.headers.length+1}`,align:"center"});for(l.headers=l.headers.slice(0,g),l.cols=g;l.rows.length<d;)l.rows.push(Array.from({length:g},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})));l.rows=l.rows.slice(0,d).map(w=>{for(;w.length<g;)w.push({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null});return w.slice(0,g)}),b()}),document.getElementById("tam-apply").addEventListener("click",()=>{n();const g=document.getElementById("tam-theme").value;r&&(r.set("tableData",JSON.parse(JSON.stringify(l))),r.set("tableTheme",g),r.addAttributes({"data-table-theme":g}),ze(r)),c()}),window.__openTableAdminModal=p}function ze(t){const e=t.get("tableData"),i=t.get("tableTheme")||"blue";e&&t.components(kt(wt(e,i),i))}function sr(){return function(){}}const cr=[{id:"table-blue",label:"Tabla azul",category:"Interactivos",media:ar,content:{type:"table-component",attributes:{"data-table-theme":"blue"}}},{id:"table-orange",label:"Tabla naranja",category:"Interactivos",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="6" rx="1" fill="#E97300"/>
            <rect x="2" y="10" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.3"/>
            <rect x="2" y="17" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
            <rect x="2" y="24" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
        </svg>`,content:{type:"table-component",attributes:{"data-table-theme":"orange"}}}];function dr(t){const e="table-component";nr(),t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Tabla",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,propagate:["editable","selectable","hoverable","droppable","highlightable"],tableData:null,tableTheme:"blue",attributes:{"data-gjs-type":e,"data-table-theme":"blue"},components:kt(wt(Q(3,3),"blue"),"blue"),script:sr(),traits:[{type:"button",name:"edit-table",label:"Editar tabla",text:"Abrir editor de tabla",command(i){const a=i.getSelected();a&&window.__openTableAdminModal&&(a.get("tableData")||a.set("tableData",Q(3,3)),window.__openTableAdminModal(a))}},{type:"select",name:"data-table-theme",label:"Color del tema",options:[{id:"blue",name:"Azul"},{id:"orange",name:"Naranja"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e});const i=this.getAttributes()["data-table-theme"]||"blue";this.set("tableTheme",i),this.get("tableData")||(this.set("tableData",Q(3,3)),ze(this)),this.on("change:attributes",(a,r)=>{const l=r["data-table-theme"];l&&l!==this.get("tableTheme")&&(this.set("tableTheme",l),ze(this))})}}}),fr(t,e),pr(t,e)}function fr(t,e){t.on("component:mount",i=>{const a=i.getEl();if(a?.getAttribute?.("data-gjs-type")===e){i.set("type",e);const r=a.getAttribute("data-table-theme")||"blue";i.set("tableTheme",r),i.get("tableData")||i.set("tableData",Q(3,3))}}),t.on("storage:end:load",()=>{setTimeout(()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getAttributes()["data-table-theme"]||"blue";i.set("tableTheme",a),i.get("tableData")||i.set("tableData",Q(3,3))})},800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function pr(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a&&!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,a.appendChild(r)}})}const gr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#003B71"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#003B71"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#003B71" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,mr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#E97300"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#E97300"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#E97300" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,hr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#003B71"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,br=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#E97300"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,ur=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#003B71"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,xr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#E97300"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,yr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,vr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,wr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#ffffff"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.5"/>
</svg>`,kr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,ct=t=>{const e=t==="#003B71"?"blue":"orange";return`
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
</div>`},dt=t=>{const e=t==="#003B71"?"blue":"orange";return`
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
</div>`},ft={"button-fill-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-[#003B71] text-white transition-all duration-200 hover:bg-[#002a52] hover:border-[#002a52]","button-fill-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-[#E97300] text-white transition-all duration-200 hover:bg-[#c96200] hover:border-[#c96200]","button-outline-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-transparent text-[#003B71] transition-all duration-200 hover:bg-[#003B71] hover:text-white","button-outline-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-transparent text-[#E97300] transition-all duration-200 hover:bg-[#E97300] hover:text-white","button-fill-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-white text-[#003B71] transition-all duration-200 hover:bg-[#dce8f5] hover:border-[#dce8f5]","button-outline-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-transparent text-white transition-all duration-200 hover:bg-white hover:text-[#003B71]"},Br=[{id:"button-fill-blue",label:"Botón azul sólido",category:"Botones",media:ur,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-blue"}}},{id:"button-fill-orange",label:"Botón naranja sólido",category:"Botones",media:xr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-orange"}}},{id:"button-outline-blue",label:"Botón azul outline",category:"Botones",media:yr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-blue"}}},{id:"button-outline-orange",label:"Botón naranja outline",category:"Botones",media:vr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-orange"}}},{id:"button-fill-white",label:"Botón blanco sólido",category:"Botones",media:wr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-white"}}},{id:"button-outline-white",label:"Botón blanco outline",category:"Botones",media:kr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-white"}}},{id:"button-download-full-blue",label:"Descarga completa azul",category:"Botones",media:gr,content:ct("#003B71")},{id:"button-download-full-orange",label:"Descarga completa naranja",category:"Botones",media:mr,content:ct("#E97300")},{id:"button-download-simple-blue",label:"Descarga simple azul",category:"Botones",media:hr,content:dt("#003B71")},{id:"button-download-simple-orange",label:"Descarga simple naranja",category:"Botones",media:br,content:dt("#E97300")}];function Er(t){const e=[{type:"button",label:"Documento",name:"select-document",text:"Seleccionar documento",full:!0,command:"open-document-picker"},{type:"text",name:"href",label:"URL / Enlace",placeholder:"https://..."},{type:"select",name:"target",label:"Abrir en",options:[{id:"_self",name:"Misma ventana"},{id:"_blank",name:"Nueva ventana"}]}];t.DomComponents.addType("link",{model:{defaults:{traits:e}}}),t.DomComponents.addType("integral-button",{isComponent:r=>r.tagName==="A"&&r.hasAttribute("data-btn-variant"),model:{defaults:{tagName:"a",draggable:!0,droppable:!1,editable:!0,attributes:{href:"#",target:"_self","data-btn-variant":"button-fill-blue"},components:"Texto del botón",traits:e},init(){const r=this.getAttributes()["data-btn-variant"]??"button-fill-blue",l=ft[r]??ft["button-fill-blue"];this.setClass(l.split(" "))}}});function i(r,l){if(r.getEl()?.matches?.(l))return r;let p=null;const c=r.components?.();return c?(c.each(n=>{p||(p=i(n,l))}),p):null}function a(r,l){const p={pdf:"ri-file-pdf-line",xlsx:"ri-file-excel-line",xls:"ri-file-excel-line",doc:"ri-file-word-line",docx:"ri-file-word-line"}[l]??"ri-file-line";function c(f){const h=f.getEl?.();if(h?.tagName==="I"){const d=h.parentElement;if(d&&[...d.classList].some(w=>w.includes("-icon")))return f}let b=null;const g=f.components?.();return g?(g.each(d=>{b||(b=c(d))}),b):null}const n=c(r);if(n){const f=n.getClasses().find(h=>h.startsWith("ri-"));f&&n.removeClass(f),n.addClass(p)}else{const h=r.getEl()?.querySelector("[class*='-icon'] i");if(h){const b=[...h.classList].filter(g=>!g.startsWith("ri-"));h.className=[...b,p].join(" ")}}}t.Commands.add("open-document-picker",{run(r){const l=r.getSelected();if(l){if(r._documentPicker)try{r._documentPicker.destroy()}catch{}r._documentPicker=new Lt,r._documentPicker.open(o=>{const p=o.filename.split(".").pop().toLowerCase();l.addAttributes({href:o.url});const c=l.getTrait("href");c&&c.set("value",o.url);const n=i(l,"[class*='-filename']");n&&n.components(o.filename),a(l,p)},{filters:{type:"document"}})}}})}const $r=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,Sr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,Cr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,Lr=[{id:"badge-outline-blue",label:"Badge azul outline",category:"Badges",media:$r,content:'<span class="inline-block border border-[#003B71] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#003B71]">Etiqueta</span>'},{id:"badge-outline-orange",label:"Badge naranja outline",category:"Badges",media:Sr,content:'<span class="inline-block border border-[#E97300] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#E97300]">Etiqueta</span>'},{id:"badge-outline-white",label:"Badge blanco outline",category:"Badges",media:Cr,content:'<span class="inline-block border border-white rounded-full px-4 py-1 text-base font-medium bg-transparent text-white">Etiqueta</span>'}],jr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <path d="M16 4c-4.4 0-8 3.6-8 8 0 6 8 16 8 16s8-10 8-16c0-4.4-3.6-8-8-8z" fill="#E97300"/>
    <circle cx="16" cy="12" r="3.2" fill="#ffffff"/>
    <rect x="3" y="26" width="26" height="2" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`,Me=`
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
}`;function Tr(t){return String(t??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const ve='data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"';function Bt(t,e){return e=e||"mp"+Math.random().toString(36).slice(2,7),`<section id="mp-root-${e}" class="mp-section" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <p class="mp-stats" data-mp-stats ${ve}>Cargando disponibilidad de agencias y puntos de pago...</p>
        <h2 class="mp-title" ${ve}>${Tr(t.title||"Horarios y Agencias:")}</h2>
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
    </section>`}const Ae={title:"Horarios y Agencias:"};function _r(){return function(){const t=this,e=t.ownerDocument??document,i=".mp-section{width:100%;background:#ffffff;padding:3.5rem 4rem;font-family:'Poppins',sans-serif;}.mp-stats{font-size:1.125rem;font-weight:700;color:#003B71;margin:0 0 1.75rem;line-height:1.5;}.mp-stats .mp-num{color:#E97300;}.mp-title{font-size:1.75rem;font-weight:800;color:#E97300;margin:0 0 1.5rem;}.mp-filters{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;margin-bottom:2rem;position:relative;z-index:30;}.mp-filter{position:relative;}.mp-filter-btn{display:flex;align-items:center;justify-content:space-between;width:100%;background:none;border:none;border-bottom:2px solid #E97300;padding:0.5rem 0.25rem 0.625rem;cursor:pointer;font-family:inherit;}.mp-filter-label{font-size:0.9375rem;font-weight:700;color:#003B71;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.mp-filter-arrow{color:#003B71;font-size:0.75rem;transition:transform 0.2s ease;flex-shrink:0;margin-left:0.75rem;}.mp-filter.mp-filter-open .mp-filter-arrow{transform:rotate(180deg);}.mp-filter-dropdown{display:none;position:absolute;top:calc(100% + 0.625rem);left:0;right:0;background:#ffffff;border-radius:0.5rem;box-shadow:0 14px 36px rgba(0,0,0,0.2);overflow:hidden;max-height:260px;overflow-y:auto;}.mp-filter.mp-filter-open .mp-filter-dropdown{display:block;}.mp-filter-option{display:block;width:100%;text-align:center;padding:0.75rem 1rem;background:none;border:none;border-bottom:2px solid #E97300;font-size:0.875rem;font-weight:700;color:#003B71;cursor:pointer;font-family:inherit;transition:background 0.15s;}.mp-filter-option:last-child{border-bottom:none;}.mp-filter-option:hover{background:#f8fafc;}.mp-filter-option:disabled{opacity:0.5;cursor:default;pointer-events:none;}.mp-map-wrapper{position:relative;width:100%;height:440px;border-radius:0.5rem;overflow:hidden;}.mp-map{width:100%;height:100%;z-index:1;}.mp-map-overlay{position:absolute;inset:0;background:rgba(0,59,113,0.4);opacity:0;pointer-events:none;transition:opacity 0.2s ease;z-index:20;}.mp-map-overlay.mp-overlay-active{opacity:1;}.mp-pin{background:transparent!important;border:none!important;}.mp-popup{font-family:'Poppins',sans-serif;min-width:180px;}.mp-popup-name{margin:0 0 0.375rem;font-size:0.875rem;font-weight:700;color:#003B71;}.mp-popup-line{margin:0 0 0.25rem;font-size:0.8125rem;color:#475569;display:flex;align-items:flex-start;gap:0.375rem;line-height:1.4;}.mp-popup-line i{color:#E97300;margin-top:0.125rem;}.mp-popup-line:last-child{margin-bottom:0;}@media(max-width:1280px){.mp-section{padding:3rem 2.5rem;}}@media(max-width:992px){.mp-section{padding:2.5rem 1.5rem;}.mp-filters{grid-template-columns:1fr;gap:1.25rem;}.mp-map-wrapper{height:320px;}}";if(!e.getElementById("mp-filter-styles")){const s=e.createElement("style");s.id="mp-filter-styles",s.textContent=i,e.head.appendChild(s)}const a=t.querySelector("[data-mp-filters]"),r=t.querySelector("[data-mp-overlay]"),l=t.querySelector("[data-mp-map]"),o=t.querySelector("[data-mp-stats]");if(!a||!l)return;const p=[13.7942,-88.8965],c=8,n={departments:[],agencies:[],paymentPoints:[],type:null,department:null,pointKey:null};let f=null,h=null,b=null;function g(){a.querySelectorAll(".mp-filter.mp-filter-open").forEach(s=>s.classList.remove("mp-filter-open")),r&&r.classList.remove("mp-overlay-active")}function d(s){return String(s??"").replace(/[&<>"']/g,x=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[x])}function w(s){return d(s).replace(/\*\*(.+?)\*\*/g,'<span class="mp-num">$1</span>')}function C(s){if(!o)return;if(!s){o.textContent="No fue posible cargar la disponibilidad de agencias y puntos de pago.";return}const x=n.agencies.length,$=n.paymentPoints.length,T=`**${x}** agencias y **${$}** puntos de pago activos distribuidos en todo el país.`;o.innerHTML=w(T)}function y(s){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 42" width="30" height="42"><path d="M15 0C6.7 0 0 6.7 0 15c0 11.3 15 27 15 27s15-15.7 15-27C30 6.7 23.3 0 15 0z" fill="${s}"/><circle cx="15" cy="14" r="5.5" fill="#ffffff"/></svg>`}function v(s){return b.divIcon({className:"mp-pin",html:y(s),iconSize:[30,42],iconAnchor:[15,42],popupAnchor:[0,-38]})}function u(s){const x=[`<div class="mp-popup"><p class="mp-popup-name">${d(s.name)}</p>`];return s.address&&x.push(`<p class="mp-popup-line"><i class="ri-map-pin-2-line"></i> ${d(s.address)}</p>`),s.type==="agency"&&s.schedule&&x.push(`<p class="mp-popup-line"><i class="ri-time-line"></i> ${d(s.schedule)}</p>`),s.type==="payment_point"&&s.correspondent&&x.push(`<p class="mp-popup-line"><i class="ri-store-2-line"></i> ${d(s.correspondent)}</p>`),x.push("</div>"),x.join("")}function m(){return[...n.agencies,...n.paymentPoints]}function E(){return m().filter(s=>!(n.type&&s.type!==n.type||n.department&&s.department!==n.department))}function k(){!h||!b||(h.clearLayers(),E().forEach(s=>{const x=s.type==="agency"?"#E97300":"#003B71",$=b.marker([s.lat,s.lng],{icon:v(x)});$.bindPopup(u(s)),$.__mpKey=`${s.type}-${s.id}`,h.addLayer($)}))}function S(){f&&f.flyTo(p,c)}function B(){const s=n.departments.find(x=>x.name===n.department);f&&s&&s.lat&&s.lng&&f.flyTo([s.lat,s.lng],s.zoom||11)}function j(){if(!f||!h)return;let s=null;h.eachLayer(x=>{x.__mpKey===n.pointKey&&(s=x)}),s&&(f.flyTo(s.getLatLng(),17),setTimeout(()=>s.openPopup(),350))}function A(){k(),n.pointKey?j():n.department?B():S()}function q(){const s=a.querySelector('[data-filter-index="2"] .mp-filter-dropdown'),x=a.querySelector('[data-filter-label="2"]');if(!s)return;const $=E(),T=['<button type="button" class="mp-filter-option" data-point-key="">Todas</button>'].concat($.map(M=>`<button type="button" class="mp-filter-option" data-point-key="${M.type}-${M.id}">${d(M.name)}</button>`)).join("");s.innerHTML=T,n.pointKey=null,x&&(x.textContent="Seleccione una ubicación"),s.querySelectorAll(".mp-filter-option").forEach(M=>{M.addEventListener("click",()=>{const Y=M.dataset.pointKey||"";n.pointKey=Y||null,x&&(x.textContent=M.textContent),g(),A()})})}function V(){const s=a.querySelector('[data-filter-index="1"] .mp-filter-dropdown');if(!s)return;const x=['<button type="button" class="mp-filter-option" data-dept="">Todos los departamentos</button>'].concat(n.departments.map($=>`<button type="button" class="mp-filter-option" data-dept="${d($.name)}">${d($.name)}</button>`)).join("");s.innerHTML=x,s.querySelectorAll(".mp-filter-option").forEach($=>{$.addEventListener("click",()=>{n.department=$.dataset.dept||null;const T=a.querySelector('[data-filter-label="1"]');T&&(T.textContent=$.textContent),g(),q(),A()})})}function J(){const s=a.querySelector('[data-filter-index="0"] .mp-filter-dropdown');s&&s.querySelectorAll(".mp-filter-option").forEach(x=>{x.addEventListener("click",()=>{n.type=x.dataset.type||null;const $=a.querySelector('[data-filter-label="0"]');$&&($.textContent=x.textContent),g(),q(),A()})})}a.__mpBound||(a.__mpBound=!0,a.querySelectorAll("[data-filter-toggle]").forEach(s=>{s.addEventListener("click",x=>{x.stopPropagation();const $=s.closest(".mp-filter"),T=$.classList.contains("mp-filter-open");g(),T||($.classList.add("mp-filter-open"),r&&r.classList.add("mp-overlay-active"))})}),e.addEventListener("click",s=>{t.contains(s.target)&&(s.target.closest(".mp-filter")||g())}));async function K(){if(!e.getElementById("leaflet-css")){const x=e.createElement("link");x.id="leaflet-css",x.rel="stylesheet",x.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",e.head.appendChild(x)}const s=e.defaultView??window;return typeof s.L>"u"&&await new Promise((x,$)=>{const T=e.createElement("script");T.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",T.onload=x,T.onerror=$,e.head.appendChild(T)}),s.L}function pe(){const s=e.querySelector('meta[name="map-locations-url"]')?.content;if(s)return s;try{const $=window.top?.document?.querySelector('meta[name="map-locations-url"]')?.content;if($)return $}catch{}return"/api/map-locations"}async function ge(){try{const s=pe(),x=await fetch(s,{headers:{Accept:"application/json"}});if(!x.ok)throw new Error("No se pudo cargar la información del mapa");const $=await x.json();return n.departments=$.departments||[],n.agencies=$.agencies||[],n.paymentPoints=$.payment_points||[],!0}catch(s){return console.warn("[MapFilter] Error al cargar datos:",s),!1}}async function ee(){if(!(!l||l.__mpMapInit))try{if(b=await K(),!b||l.__mpMapInit)return;l.__mpMapInit=!0,f=b.map(l,{zoomControl:!0}).setView(p,c),l._map=f,b.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(f),h=b.layerGroup().addTo(f),f.whenReady(function(){setTimeout(()=>{f&&f.invalidateSize&&f.invalidateSize()},300)});const s=await ge();C(s),J(),V(),q(),A()}catch(s){console.warn("No se pudo inicializar el mapa:",s)}}ee()}}function zr(t,e){const i=document.getElementById("map-filter-config-modal");if(i&&i.remove(),!document.getElementById("mp-modal-styles")){const c=document.createElement("style");c.id="mp-modal-styles",c.textContent=`
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
        `,document.head.appendChild(c)}const r=(()=>{try{return JSON.parse(e.getAttributes()["data-map-config"]||"{}")}catch{return{}}})().title||Ae.title,l=document.createElement("div");l.id="map-filter-config-modal",l.className="mp-overlay-modal";const o=document.createElement("div");o.className="mp-modal",o.innerHTML=`
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
        </div>`,l.appendChild(o),document.body.appendChild(l);const p=()=>l.remove();o.querySelector("#mp-modal-close").onclick=p,o.querySelector("#mp-modal-cancel").onclick=p,l.onclick=c=>{c.target===l&&p()},o.querySelector("#mp-modal-save").onclick=()=>{const c={title:o.querySelector("#mp-title").value.trim()},f=e.getEl()?.querySelector("[id^='mp-root-']")?.id?.replace("mp-root-","")||"mp"+Math.random().toString(36).slice(2,7);e.addAttributes({"data-map-config":JSON.stringify(c)}),e.components(Bt(c,f)+`<style>${Me}</style>`),p()}}const Ar=[{id:"map-filter-block",label:"Mapa con Filtros",category:"Interactivos",media:jr,content:{type:"map-filter-component"}}];function Ir(t){const e="map-filter-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Mapa con Filtros",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,stylable:!1,resizable:!1,layerable:!0,highlightable:!1,attributes:{"data-gjs-type":e,"data-map-config":JSON.stringify(Ae)},components:Bt(Ae)+`<style>${Me}</style>`,script:_r(),traits:[{type:"button",label:"Mapa con Filtros",text:"Administrar Mapa y Filtros",full:!0,command:"open-map-filter-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-map-filter-config",{run(i){const a=i.getSelected();a&&zr(i,a)}}),Dr(t,e),qr(t,e)}function Dr(t,e){t.on("storage:end:load",()=>{setTimeout(()=>pt(t,e),1e3)}),t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();if(a){const r=a.querySelector("[data-mp-map]");r&&r._map&&(r._map.remove(),delete r._map,delete r.__mpMapInit),setTimeout(()=>{const l=i.get("script");l&&typeof l=="function"&&l.call(a)},500)}}}),t.on("canvas:render",()=>{setTimeout(()=>pt(t,e),800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function pt(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})}function qr(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#leaflet-css")){const r=document.createElement("link");r.id="leaflet-css",r.rel="stylesheet",r.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",a.appendChild(r)}if(!a.querySelector("#mp-filter-styles")){const r=document.createElement("style");r.id="mp-filter-styles",r.textContent=Me,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=".leaflet-container{height:100%;width:100%;border-radius:inherit;z-index:0;}",a.appendChild(r)}}})}const Mr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <circle cx="23" cy="14" r="5" fill="#E97300"/>
    <circle cx="23" cy="14" r="4" fill="#f8e7d8"/>
</svg>`,Nr=`
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
}`,Pr=`
@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}
.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-title--short{width:60%;}
.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-line--short{width:55%;}
.bsk-buttons{display:flex;gap:16px;margin-top:36px;}
.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
@media(max-width:768px){.bsk-buttons{flex-direction:column;}}`;function Or(){return function(){const t=this,e=t.ownerDocument??document,i="/adminintegral",a=(e.defaultView??window).location.origin,r=e.querySelector('meta[name="api-banners-url"]')?.content||`${a}${i}/api/banners/active`,l=["fill-blue","outline-blue","fill-orange","outline-orange","fill-white","outline-white"],o=".banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;display:grid;}.banner-slide-container:active{cursor:grabbing;}.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}.banner-bg{position:absolute;inset:0;z-index:0;}.banner-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.banner-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.banner-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.banner-btn--fill-blue{background:#003B71;color:#ffffff;border:2px solid #003B71;}.banner-btn--fill-blue:hover{background:#002a52;border-color:#002a52;color:#ffffff;}.banner-btn--outline-blue{background:transparent;color:#003B71;border:2px solid #003B71;}.banner-btn--outline-blue:hover{background:#003B71;border-color:#003B71;color:#ffffff;}.banner-btn--fill-orange{background:#E97300;color:#ffffff;border:2px solid #E97300;}.banner-btn--fill-orange:hover{background:#c96200;border-color:#c96200;color:#ffffff;}.banner-btn--outline-orange{background:transparent;color:#E97300;border:2px solid #E97300;}.banner-btn--outline-orange:hover{background:#E97300;border-color:#E97300;color:#ffffff;}.banner-btn--fill-white{background:#ffffff;color:#003B71;border:2px solid #ffffff;}.banner-btn--fill-white:hover{background:#dce8f5;border-color:#dce8f5;color:#003B71;}.banner-btn--outline-white{background:transparent;color:#ffffff;border:2px solid #ffffff;}.banner-btn--outline-white:hover{background:#ffffff;border-color:#ffffff;color:#003B71;}.banner-dots-wrapper{display:none;}.banner-stripe{position:relative;width:100%;height:26px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}.banner-dots{display:flex;gap:8px;align-items:center;}.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}.banner-dot--active{width:28px;background:#ffffff;}.banner-empty{display:flex;align-items:center;justify-content:center;min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;}@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}",p="@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title--short{width:60%;}.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-line--short{width:55%;}.bsk-buttons{display:flex;gap:16px;margin-top:36px;}.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}@media(max-width:768px){.bsk-buttons{flex-direction:column;}}";(function(){if(!e.getElementById("banner-hero-styles")){const x=e.createElement("style");x.id="banner-hero-styles",x.textContent=o,e.head.appendChild(x)}if(!e.getElementById("banner-skeleton-styles")){const x=e.createElement("style");x.id="banner-skeleton-styles",x.textContent=p,e.head.appendChild(x)}})();let c=[],n=0,f=null,h=!1,b=0,g=0;const d=50,w=t.dataset.autoplay!=="false",C=t.dataset.category??"",y=t.querySelector(".banner-slide-container"),v=t.querySelector(".banner-stripe");if(!y||!v)return;function u(s){return l.indexOf(s)!==-1?s:s==="outline-blue"||s==="outline-orange"?"outline-white":"fill-white"}function m(s,x,$,T){const M=u($),Y=x?"a":"span",Se=x?`href="${x}"${T?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${Y} ${Se} class="banner-btn banner-btn--${M}">${s}</${Y}>`}async function E(){if(!t.__bannerLoading){t.__bannerLoading=!0,k();try{const s=await fetch(r,{headers:{Accept:"application/json"}});if(!s.ok){ee();return}const x=await s.json();if(c=Array.isArray(x)?C?x.filter($=>$.category===C):x:[],c.length===0){ee();return}S(),J(),K(0,!1),w&&pe()}catch{ee()}finally{t.__bannerLoading=!1}}}function k(){y.innerHTML=`
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
                </div>`,v.innerHTML=""}function S(){y.innerHTML=c.map((s,x)=>`
                <div class="banner-slide" data-index="${x}">
                    <div class="banner-slide-inner">
                        <div class="banner-bg">
                            <img src="${s.image_url}"
                                 alt="${s.image_alt??s.title}"
                                 loading="${x===0?"eager":"lazy"}"
                                 decoding="async"
                                 fetchpriority="${x===0?"high":"low"}"
                                 draggable="false">
                        </div>
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            ${s.category?`<span class="banner-category-badge">${s.category}</span>`:""}
                            <h2 class="banner-title">${s.title}</h2>
                            <p class="banner-description">${s.description}</p>
                            ${s.btn_primary_text||s.btn_secondary_text?`<div class="banner-buttons">
                                    ${s.btn_primary_text?m(s.btn_primary_text,s.btn_primary_url,s.btn_primary_style,s.btn_primary_external):""}
                                    ${s.btn_secondary_text?m(s.btn_secondary_text,s.btn_secondary_url,s.btn_secondary_style,s.btn_secondary_external):""}
                                </div>`:""}
                        </div>
                    </div>
                </div>`).join(""),B(),j()}function B(){y.addEventListener("mousedown",A),y.addEventListener("touchstart",A,{passive:!0}),y.addEventListener("mousemove",q),y.addEventListener("touchmove",q,{passive:!0}),y.addEventListener("mouseup",V),y.addEventListener("touchend",V),y.addEventListener("mouseleave",V)}function j(){c.forEach(s=>{const x=new Image;x.src=s.image_url})}function A(s){h=!0,b=s.touches?s.touches[0].clientX:s.clientX,g=0}function q(s){h&&(g=(s.touches?s.touches[0].clientX:s.clientX)-b)}function V(){h&&(h=!1,Math.abs(g)>=d&&(K(g<0?(n+1)%c.length:(n-1+c.length)%c.length),ge()),g=0)}function J(){if(c.length<=1){v.innerHTML="";return}const s=e.createElement("div");s.className="banner-dots",c.forEach((x,$)=>{const T=e.createElement("button");T.className="banner-dot",T.type="button",T.dataset.index=String($),T.setAttribute("aria-label",`Banner ${$+1}`),T.addEventListener("click",()=>{K($),ge()}),s.appendChild(T)}),v.innerHTML="",v.appendChild(s)}function K(s,x=!0){const $=y.querySelectorAll(".banner-slide"),T=t.querySelectorAll(".banner-dot");$.forEach((M,Y)=>{const Se=Y===s;x||(M.style.transition="none"),M.classList.toggle("banner-slide--active",Se),x||requestAnimationFrame(()=>{M.style.transition=""})}),T.forEach((M,Y)=>M.classList.toggle("banner-dot--active",Y===s)),n=s}function pe(){c.length<=1||!w||(f=setInterval(()=>K((n+1)%c.length),5e3))}function ge(){w&&(clearInterval(f),pe())}function ee(){clearInterval(f),y.innerHTML=`
                <div class="banner-slide banner-slide--active">
                    <div class="banner-empty">Sin contenido.</div>
                </div>`,v.innerHTML=""}e.readyState==="loading"?e.addEventListener("DOMContentLoaded",E):E()}}function Rr(t,e){const i=document.getElementById("banner-hero-config-modal");if(i&&i.remove(),!document.getElementById("bnr-modal-styles")){const d=document.createElement("style");d.id="bnr-modal-styles",d.textContent=`
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
        `,document.head.appendChild(d)}const a=e.getAttributes(),r=a["data-autoplay"]!=="false",l=a["data-category"]||"",o=document.createElement("div");o.id="banner-hero-config-modal",o.className="bnr-overlay";const p=document.createElement("div");p.className="bnr-modal",p.innerHTML=`
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
        </div>`,o.appendChild(p),document.body.appendChild(o);const c=p.querySelector("#bnr-autoplay"),n=p.querySelector("#bnr-autoplay-slider"),f=p.querySelector("#bnr-autoplay-knob"),h=()=>{n.style.background=c.checked?"#003B71":"#cbd5e1",f.style.left=c.checked?"21px":"3px"};h(),c.addEventListener("change",h);const b=p.querySelector("#bnr-category");(async()=>{try{const w=document.querySelector('meta[name="api-banners-url"]')?.content||`${window.location.origin}/adminintegral/api/banners/active`,C=await fetch(w,{headers:{Accept:"application/json"}});if(!C.ok)return;const y=await C.json();if(!Array.isArray(y))return;[...new Set(y.map(u=>u.category).filter(Boolean))].sort().forEach(u=>{const m=document.createElement("option");m.value=u,m.textContent=u,b.appendChild(m)}),b.value=l}catch{}})();const g=()=>o.remove();p.querySelector("#bnr-modal-close").onclick=g,p.querySelector("#bnr-modal-cancel").onclick=g,o.onclick=d=>{d.target===o&&g()},p.querySelector("#bnr-modal-save").onclick=()=>{e.addAttributes({"data-autoplay":c.checked?"true":"false","data-category":b.value||""}),g()}}const Hr=[{id:"banner-hero",label:"Banner Slider",category:"Banners",media:Mr,content:{type:"banner-hero-component"}}];function Fr(t){const e="banner-hero-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Slider",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-autoplay":"true","data-category":""},components:`
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
                `,script:Or(),traits:[{type:"button",label:"Banner Slider",text:"Administrar Banner Slider",full:!0,command:"open-banner-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const i=this.getEl();if(!i)return;const a=this.get("script");a&&typeof a=="function"&&setTimeout(()=>a.call(i),100)})}}}),t.Commands.add("open-banner-config",{run(i){const a=i.getSelected();a&&Rr(i,a)}}),Ur(t,e),Vr(t,e)}function Ur(t,e){t.on("storage:end:load",()=>{setTimeout(()=>gt(t,e),1e3)}),t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();a&&setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500)}}),t.on("canvas:render",()=>{setTimeout(()=>gt(t,e),800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function gt(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})}function Vr(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#banner-hero-styles")){const r=document.createElement("style");r.id="banner-hero-styles",r.textContent=Nr,a.appendChild(r)}if(!a.querySelector("#banner-skeleton-styles")){const r=document.createElement("style");r.id="banner-skeleton-styles",r.textContent=Pr,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`[data-gjs-type="${e}"] * { pointer-events: none !important; } [data-gjs-type="${e}"].gjs-selected, [data-gjs-type="${e}"].gjs-hovered { outline: 2px dashed rgba(240,135,42,0.6) !important; outline-offset: 2px; }`,a.appendChild(r)}}})}const Yr=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Xr=`
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
`;function Wr(){return function(){const t=this,e=t.ownerDocument??document;e.defaultView;const i=e.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??"",a=e.querySelector('meta[name="api-assets-url"]')?.content||(i?`${i}/api/assets/active`:""),r=`
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
`;if(!e.getElementById("assets-block-styles")){const y=e.createElement("style");y.id="assets-block-styles",y.textContent=r,e.head.appendChild(y)}const l=t.querySelector("[data-ast-tabs]"),o=t.querySelector("[data-ast-content]");if(!l||!o)return;const p=t.dataset.defaultCategory||"";let c=[],n="";function f(y,v){return y?y.length>v?`${y.slice(0,v).trim()}...`:y:""}function h(y){const v=y.link_is_external?' target="_blank" rel="noopener noreferrer"':"",u=y.name||f(y.short_description,60),m=y.name||y.short_description||"Activo extraordinario";return`<a href="${y.link_url}"${v} class="ast-card">
                <img src="${y.image_url}" alt="${m}" class="ast-card-img" loading="lazy">
                <div class="ast-card-body">
                    <p class="ast-card-name">${u}</p>
                    ${y.name&&y.short_description?`<p class="ast-card-desc">${y.short_description}</p>`:""}
                </div>
            </a>`}function b(){const y=[],v=new Set;return c.forEach(u=>{v.has(u.category_slug)||(v.add(u.category_slug),y.push({slug:u.category_slug,name:u.category}))}),y.sort((u,m)=>u.name.localeCompare(m,"es",{sensitivity:"base"}))}function g(y,v){const u=v.length?v.map(h).join(""):'<div class="ast-empty">No hay activos extraordinarios disponibles en esta categoría.</div>';return`<div class="ast-group">
                <p class="ast-subtitle">${y}</p>
                <div class="ast-subtitle-stripe"></div>
                <div class="ast-grid">${u}</div>
            </div>`}function d(){if(n){const v=c.filter(m=>m.category_slug===n),u=v[0]?.category||b().find(m=>m.slug===n)?.name||"";o.innerHTML=g(u,v);return}const y=b();o.innerHTML=y.map(v=>g(v.name,c.filter(u=>u.category_slug===v.slug))).join("")}function w(){const v=['<button type="button" class="ast-tab ast-tab--active" data-tab-slug="">Todos</button>',...b().map(u=>`<button type="button" class="ast-tab" data-tab-slug="${u.slug}">${u.name}</button>`)].join("");if(l.innerHTML=v,l.querySelectorAll("[data-tab-slug]").forEach(u=>{u.addEventListener("click",()=>{l.querySelectorAll(".ast-tab").forEach(m=>m.classList.remove("ast-tab--active")),u.classList.add("ast-tab--active"),n=u.dataset.tabSlug,d()})}),p){const u=l.querySelector(`[data-tab-slug="${p}"]`);u&&u.click()}}async function C(){if(!a){l.innerHTML='<button type="button" class="ast-tab ast-tab--active">Todos</button>',o.innerHTML='<div class="ast-empty">Vista previa del catálogo (los datos reales se cargan en el sitio publicado).</div>';return}o.innerHTML=`
                <div class="ast-loading">
                    <div class="ast-spinner"></div>
                    <span>Cargando activos extraordinarios...</span>
                </div>`;try{const y=await fetch(a,{headers:{Accept:"application/json"}});if(!y.ok){o.innerHTML='<div class="ast-empty">No se pudieron cargar los activos extraordinarios.</div>';return}if(c=await y.json(),!Array.isArray(c)||c.length===0){l.innerHTML='<button type="button" class="ast-tab ast-tab--active">Todos</button>',o.innerHTML='<div class="ast-empty">No hay activos extraordinarios disponibles.</div>';return}w(),d()}catch{o.innerHTML='<div class="ast-empty">No se pudieron cargar los activos extraordinarios.</div>'}}e.readyState==="loading"?e.addEventListener("DOMContentLoaded",C):C()}}const Gr=[{id:"assets-catalog",label:"Catálogo de Activos Extraordinarios",category:"Interactivos",media:Yr,content:{type:"assets-catalog-component"}}];function Jr(t){const e="assets-catalog-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Catálogo de Activos Extraordinarios",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-default-category":"",class:"ast-section"},components:`
                    <p class="ast-header" contenteditable="true" data-gjs-type="text" data-gjs-editable="true" data-gjs-selectable="false" data-gjs-hoverable="false">Mayor información a: 0000-0000</p>
                    <div class="ast-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div class="ast-tabs" data-ast-tabs data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div data-ast-content data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                `,script:Wr(),traits:[{type:"select",name:"data-default-category",label:"Categoría inicial",options:[{id:"",name:"Todas (mostrar 'Todos')"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const i=this.getEl();if(!i)return;const a=this.get("script");a&&typeof a=="function"&&setTimeout(()=>a.call(i),100)})}}}),Zr(t,e),Qr(t,e),Kr(t,e)}async function Kr(t,e){try{const i=document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??"",a=await fetch(`${i}/api/asset-categories/all`,{headers:{Accept:"application/json"}});if(!a.ok)return;const r=await a.json();if(!Array.isArray(r)||r.length===0)return;const l=t.DomComponents.getType(e);if(!l)return;const p=l.model.prototype.defaults.traits.find(c=>c.name==="data-default-category");if(!p)return;p.options=[{id:"",name:"Todas (mostrar 'Todos')"},...r.map(c=>({id:c.slug,name:c.name}))]}catch{}}function Zr(t,e){t.on("storage:end:load",()=>{setTimeout(()=>mt(t,e),1e3)}),t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500))}),t.on("canvas:render",()=>{setTimeout(()=>mt(t,e),800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function mt(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})}function Qr(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#assets-block-styles")){const r=document.createElement("style");r.id="assets-block-styles",r.textContent=Xr,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`[data-gjs-type="${e}"] * { pointer-events: none !important; } [data-gjs-type="${e}"].gjs-selected, [data-gjs-type="${e}"].gjs-hovered { outline: 2px dashed rgba(240,135,42,0.6) !important; outline-offset: 2px; }`,a.appendChild(r)}}})}const Ie={blue:{bg:"#003B71",text:"#ffffff"},orange:{bg:"#E97300",text:"#ffffff"},white:{bg:"#ffffff",text:"#003B71"}},Et=`
<style>
.pb-section{position:relative;width:100%;min-height:460px;display:flex;align-items:center;overflow:hidden;font-family:'Poppins',sans-serif;background:#0a0a0a;}
.pb-bg{position:absolute;inset:0;z-index:0;}
.pb-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.pb-bg::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.15) 55%,rgba(0,0,0,0) 100%);}
.pb-content{position:relative;z-index:10;padding:3.5rem 4rem;max-width:600px;}
.pb-box{position:relative;border-radius:0.75rem;padding:1.5rem 2rem;}
.pb-box::before,.pb-box::after{content:"";position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,#E97300 0%,#E97300 30%,rgba(233,115,0,0) 85%);}
.pb-box::before{top:0;border-top-left-radius:0.75rem;}
.pb-box::after{bottom:0;border-bottom-left-radius:0.75rem;}
.pb-box-left{position:absolute;top:0;left:0;bottom:0;width:2px;background:#E97300;border-top-left-radius:0.75rem;border-bottom-left-radius:0.75rem;}
.pb-box-inner{position:relative;z-index:2;display:flex;flex-direction:column;gap:0.75rem;}
.pb-badge{display:inline-block;align-self:flex-start;padding:0.6rem 1.25rem;border-radius:0.5rem;font-size:1.375rem;line-height:1.25;font-weight:800;background:var(--pb-theme-bg,#003B71);color:var(--pb-theme-text,#fff);}
.pb-subtitle{margin:0;font-size:1.0625rem;font-weight:500;color:#fff;line-height:1.4;}
.pb-curve{position:absolute;left:0;right:0;bottom:-1px;width:100%;height:auto;line-height:0;z-index:5;pointer-events:none;}
.pb-curve svg{display:block;width:100%;height:110px;}
.pb-curve path{fill:var(--pb-theme-bg,#003B71);}
@media(max-width:992px){
.pb-content{padding:3rem 2.5rem;max-width:100%;}
.pb-badge{font-size:1.1875rem;}
}
@media(max-width:640px){
.pb-content{padding:3rem 1.5rem;}
.pb-box{padding:1.125rem 1.25rem;}
.pb-badge{font-size:1.0625rem;padding:0.5rem 1rem;}
.pb-subtitle{font-size:0.9375rem;}
.pb-curve svg{height:60px;}
}
</style>`;function $t(t,e){e=e||"pb"+Math.random().toString(36).slice(2,7);const i=t.bg_image||_("images/placeholder.svg"),a=Ie[t.theme]?t.theme:"blue",r=Ie[a],l=t.subtitle?`<p class="pb-subtitle">${t.subtitle}</p>`:"";return`<section id="pb-root-${e}" class="pb-section" style="--pb-theme-bg:${r.bg};--pb-theme-text:${r.text};" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="pb-bg" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <img src="${i}" alt="${t.title||"Banner"}" loading="eager" decoding="async" fetchpriority="high" draggable="false" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false" data-gjs-highlightable="false">
        </div>
        <div class="pb-content">
            <div class="pb-box">
                <div class="pb-box-left"></div>
                <div class="pb-box-inner">
                    <span class="pb-badge">${t.title||"Título del banner"}</span>
                    ${l}
                </div>
            </div>
        </div>
        <div class="pb-curve" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <svg viewBox="0 0 1200 110" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0,110 L0,100 C400,100 800,20 1200,10 L1200,110 Z"></path>
            </svg>
        </div>
    </section>`}const G={bg_image:_("images/placeholder.svg"),theme:"blue",title:"Cuenta de Ahorro Electrónico",subtitle:"Recupera el control de tus finanzas. Fácil de usar, práctica para tu día a día y disponible cuando la necesites."};function el(t,e){const i=document.getElementById("banner-config-modal");if(i&&i.remove(),!document.getElementById("pb-modal-styles")){const g=document.createElement("style");g.id="pb-modal-styles",g.textContent=`
            .pb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .pb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:700px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .pb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .pb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .pb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .pb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .pb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .pb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .pb-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;overflow-x:auto;}
            .pb-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
            .pb-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .pb-tab-btn i{font-size:1rem;}
            .pb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .pb-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .pb-tab-panel.active{display:flex;}
            .pb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .pb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .pb-row{display:flex;gap:0.75rem;align-items:center;}
            .pb-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .pb-input:focus{border-color:#3b82f6;}
            textarea.pb-input{resize:vertical;min-height:80px;font-family:inherit;}
            .pb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .pb-pick-btn:hover{background:#002a52;}
            .pb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .pb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .pb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .pb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .pb-btn-save:hover{background:#d97821;}
            .pb-theme-toggle{display:flex;gap:0.5rem;}
            .pb-theme-opt{flex:1;padding:0.625rem 0.5rem;border-radius:0.5rem;font-size:0.8125rem;font-weight:700;cursor:pointer;border:2px solid #e2e8f0;transition:all 0.15s;font-family:inherit;text-align:center;}
            .pb-theme-opt-blue{background:#003B71;color:#fff;}
            .pb-theme-opt-orange{background:#E97300;color:#fff;}
            .pb-theme-opt-white{background:#ffffff;color:#003B71;border-color:#cbd5e1;}
            .pb-theme-opt.pb-theme-inactive{opacity:0.35;}
            .pb-theme-opt.pb-theme-inactive:hover{opacity:0.65;}
        `,document.head.appendChild(g)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-banner-config"]||"{}")}catch{return{}}})(),r=a.bg_image||G.bg_image,l=a.theme||G.theme,o=a.title||G.title,p=a.subtitle??G.subtitle,c=document.createElement("div");c.id="banner-config-modal",c.className="pb-overlay";const n=document.createElement("div");n.className="pb-modal",n.innerHTML=`
        <div class="pb-modal-header">
            <div class="pb-modal-header-left"><i class="ri-image-2-line"></i><h2>Configurar Banner</h2></div>
            <button id="pb-modal-close" class="pb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="pb-modal-tabs">
            <button class="pb-tab-btn active" data-tab="bg"><i class="ri-image-line"></i> Fondo</button>
            <button class="pb-tab-btn" data-tab="content"><i class="ri-text"></i> Contenido</button>
            <button class="pb-tab-btn" data-tab="theme"><i class="ri-palette-line"></i> Tema</button>
        </div>
        <div class="pb-modal-body">
            <div class="pb-tab-panel active" id="pb-panel-bg">
                <div class="pb-card">
                    <label class="pb-label">Imagen de fondo</label>
                    <div class="pb-row" style="align-items:flex-start;flex-wrap:wrap;gap:0.75rem;">
                        <div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:0.5rem;">
                            <img id="pb-bg-preview" src="${r}" style="height:90px;width:100%;object-fit:cover;border-radius:0.375rem;border:1px solid #e2e8f0;display:block;">
                            <input id="pb-bg-url" type="text" placeholder="URL de la imagen" value="${r}" class="pb-input">
                        </div>
                        <button id="pb-bg-pick" class="pb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
            </div>
            <div class="pb-tab-panel" id="pb-panel-content">
                <div class="pb-card">
                    <label class="pb-label">Título (requerido)</label>
                    <input id="pb-title" type="text" placeholder="Título del banner" value="${o}" class="pb-input">
                </div>
                <div class="pb-card">
                    <label class="pb-label">Subtítulo (opcional)</label>
                    <textarea id="pb-subtitle" placeholder="Déjalo vacío si no quieres subtítulo" class="pb-input">${p}</textarea>
                </div>
            </div>
            <div class="pb-tab-panel" id="pb-panel-theme">
                <div class="pb-card">
                    <label class="pb-label">Color de tema (aplica al título y a la curva)</label>
                    <div class="pb-theme-toggle" id="pb-theme-colors">
                        <button type="button" class="pb-theme-opt pb-theme-opt-blue" data-theme="blue">Azul</button>
                        <button type="button" class="pb-theme-opt pb-theme-opt-orange" data-theme="orange">Naranja</button>
                        <button type="button" class="pb-theme-opt pb-theme-opt-white" data-theme="white">Blanco</button>
                    </div>
                    <p style="font-size:0.75rem;color:#94a3b8;margin:0.75rem 0 0;">El marco lateral izquierdo y las líneas superior/inferior siempre son naranja, independientemente del tema elegido.</p>
                </div>
            </div>
        </div>
        <div class="pb-modal-footer">
            <button id="pb-modal-cancel" class="pb-btn-cancel">Cancelar</button>
            <button id="pb-modal-save" class="pb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`,c.appendChild(n),document.body.appendChild(c);let f=Ie[l]?l:"blue";function h(){const g=n.querySelector("#pb-theme-colors");g.querySelectorAll("[data-theme]").forEach(d=>{d.classList.toggle("pb-theme-inactive",d.dataset.theme!==f),d.addEventListener("click",()=>{f=d.dataset.theme,g.querySelectorAll("[data-theme]").forEach(w=>w.classList.toggle("pb-theme-inactive",w.dataset.theme!==f))})})}h(),n.querySelectorAll(".pb-tab-btn").forEach(g=>{g.addEventListener("click",()=>{n.querySelectorAll(".pb-tab-btn").forEach(d=>d.classList.remove("active")),n.querySelectorAll(".pb-tab-panel").forEach(d=>d.classList.remove("active")),g.classList.add("active"),n.querySelector(`#pb-panel-${g.dataset.tab}`).classList.add("active")})}),n.querySelector("#pb-bg-pick").addEventListener("click",()=>{$e({type:"image",title:"Seleccionar imagen de fondo",onSelect:g=>{n.querySelector("#pb-bg-url").value=g,n.querySelector("#pb-bg-preview").src=g}})}),n.querySelector("#pb-bg-url").addEventListener("input",g=>{n.querySelector("#pb-bg-preview").src=g.target.value});const b=()=>c.remove();n.querySelector("#pb-modal-close").onclick=b,n.querySelector("#pb-modal-cancel").onclick=b,c.onclick=g=>{g.target===c&&b()},n.querySelector("#pb-modal-save").onclick=()=>{const g={bg_image:n.querySelector("#pb-bg-url").value.trim()||G.bg_image,theme:f,title:n.querySelector("#pb-title").value.trim(),subtitle:n.querySelector("#pb-subtitle").value.trim()},w=e.getEl()?.querySelector("[id^='pb-root-']")?.id?.replace("pb-root-","")||"pb"+Math.random().toString(36).slice(2,7);e.addAttributes({"data-banner-config":JSON.stringify(g)}),e.components($t(g,w)+Et),b()}}function tl(t){const e="banner-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-banner-config":JSON.stringify(G)},components:$t(G)+Et,traits:[{type:"button",label:"Banner",text:"Administrar Banner",full:!0,command:"open-banner-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-banner-config",{run(i){const a=i.getSelected();a&&el(i,a)}}),t.BlockManager.add("banner-block",{label:"Banner",category:"Banners",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="4" y="6" width="18" height="8" rx="1" fill="none" stroke="#E97300" stroke-width="1"/>
            <rect x="6" y="8" width="10" height="4" rx="1" fill="#E97300"/>
            <path d="M2 26 C10 18 22 30 30 22 L30 30 L2 30 Z" fill="#003B71"/>
        </svg>`,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}})}function il(t){L.registerBlocks(Yt),L.registerBlocks(ti),L.registerBlocks(Hr),L.registerBlocks(Ba),L.registerBlocks(sa),L.registerBlocks(ni),L.registerBlocks(fi),L.registerBlocks(Pi),L.registerBlocks(Hi),L.registerBlocks(Yi),L.registerBlocks(Ji),L.registerBlocks(yi),L.registerBlocks(ya),L.registerBlocks(Xa),L.registerBlocks(ki),L.registerBlocks(Li),L.registerBlocks(Qi),L.registerBlocks(aa),L.registerBlocks(Sa),L.registerBlocks(Ta),L.registerBlocks(Aa),L.registerBlocks(Qa),L.registerBlocks(ir),L.registerBlocks(cr),L.registerBlocks(Br),L.registerBlocks(Lr),L.registerBlocks(Ja),L.registerBlocks(Ar),L.registerBlocks(Gr),L.applyToEditor(t),Ir(t),Fr(t),tl(t),qi(t),ui(t),Er(t),ca(t),dr(t),ji(t),Jr(t)}function al(t,e,i){t.on("component:add",()=>e.markAsDirty()),t.on("component:remove",()=>e.markAsDirty()),t.on("component:update",()=>e.markAsDirty()),t.on("style:update",()=>e.markAsDirty());const a=document.getElementById("save-button");a&&a.addEventListener("click",async()=>{await rl(t,e,i,a)}),document.addEventListener("keydown",r=>{(r.ctrlKey||r.metaKey)&&r.key==="s"&&(r.preventDefault(),a&&!a.disabled&&a.click())})}async function rl(t,e,i,a){a.disabled=!0,a.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{i.needsTitle()?await ll(t,e,i):await St(t,e,i)}catch(r){Ct(r.message,"error")}finally{a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}async function ll(t,e,i){return new Promise((a,r)=>{jt({title:"Título de la Página",description:"Ingresa un título descriptivo para identificar esta página",placeholder:"Ej: Acerca de Nosotros",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async l=>{if(!l?.trim()){r(new Error("El título es obligatorio"));return}try{await St(t,e,i,l),a()}catch(o){r(o)}},onCancel:()=>{r(new Error("Guardado cancelado"))}})})}async function St(t,e,i,a=null){const l={...e.getEditorContent(t),is_published:i.isPublished};a&&(l.title=a);const o=await e.savePage(t,l,i.storeUrl,i.getHttpMethod());o.success&&(e.markAsClean(),Ct(o.message,"success"),!i.isEditMode&&o.page?(i.updatePageInfo(o),i.updateTitle(o.page.title)):a&&i.updateTitle(a))}function Ct(t,e){typeof window.showNotification=="function"&&window.showNotification(t,e)}document.addEventListener("DOMContentLoaded",async()=>{const t=new Tt,e=new Ht;new Ft(t);const i=_t(),a=new Promise(r=>{i.on("load",()=>{il(i),zt(i),At(),It(),Dt(i),qt(i),Mt(i),Nt(i),Pt(i),Ot(i),ol(i),nl(i),cl(i),setTimeout(()=>{i.runCommand("sw-visibility"),i.Panels.getButton("options","sw-visibility")?.set("active",!0)},100),r()})});if(await Promise.all([a,sl(i)]),e.isEditMode)try{await t.loadPageContent(i,e.loadUrl),ht("Contenido cargado correctamente","success")}catch(r){ht("Error al cargar el contenido","error"),console.error(r)}al(i,t,e)});function ol(t){const e=[{cmd:"set-device-desktop",device:"Desktop"},{cmd:"set-device-tablet",device:"Tablet"},{cmd:"set-device-mobile",device:"Mobile"}];e.forEach(({cmd:i,device:a})=>{t.Commands.add(i,{run:r=>{r.setDevice(a),e.forEach(({cmd:l})=>{r.Panels.getButton("devices-c",l)?.set("active",l===i)})}})})}function nl(t){t.Commands.add("canvas-clear",{run:e=>{Rt({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{e.DomComponents.clear(),e.CssComposer.clear()}})}})}function sl(t){return new Promise(e=>{const i=t.Canvas.getFrameEl();if(i?.contentDocument?.readyState==="complete"&&i.contentDocument.head?.childElementCount>0){e();return}const r=()=>{t.off("canvas:frame:load",r),e()};t.on("canvas:frame:load",r),setTimeout(()=>{t.off("canvas:frame:load",r),e()},3e3)})}function cl(t){const e=t.Canvas.getFrameEl();if(!e?.contentDocument?.head)return;const i=e.contentDocument.createElement("style");i.id="gjs-dashed-fix",i.textContent="body,body.gjs-dashed{margin:0!important;padding:0 0 160px 0!important;}",e.contentDocument.head.appendChild(i)}function ht(t,e="info"){typeof window.showNotification=="function"&&window.showNotification(t,e)}
