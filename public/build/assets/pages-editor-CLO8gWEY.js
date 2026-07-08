/* empty css                   *//* empty css                    *//* empty css                          *//* empty css                           */import{o as we,M as mt,j as bt,E as ut,i as xt,t as yt,d as vt,f as wt,e as kt,s as Bt,g as Et,c as $t,b as St,a as Ct,h as Lt}from"./editor-commands-DULPa6UC.js";import{a as I}from"./url-DaqOO3yL.js";import"./_commonjsHelpers-CqkleIqs.js";class jt{constructor(){this.pageId=this.getElementValue("page-id"),this.pageSlug=this.getElementValue("page-slug"),this.pageTitle=this.getPageTitle(),this.loadUrl=this.getElementValue("page-load-url"),this.storeUrl=this.getElementValue("page-store-url"),this.isPublished=this.getElementValue("page-is-published")==="1",this.isEditMode=!!this.pageId,this.appUrl=(document.querySelector('meta[name="app-url"]')?.content??"").replace(/\/$/,"")}getElementValue(e,t=""){const a=document.getElementById(e);return a?a.value.trim():t}getPageTitle(){const e=document.getElementById("editor-title");if(!e)return"";const a=e.textContent.match(/(?:Editando:|Nueva Página)\s*(.+)?/);return a&&a[1]?a[1].trim():""}updatePageInfo(e){if(e.page)if(this.pageId=e.page.id,this.pageSlug=e.page.slug,this.pageTitle=e.page.title,this.isEditMode=!0,document.getElementById("page-id").value=this.pageId,document.getElementById("page-slug").value=this.pageSlug,e.page.update_url?this.storeUrl=e.page.update_url:this.storeUrl=`${this.appUrl}/pages/${this.pageSlug}`,document.getElementById("page-store-url").value=this.storeUrl,e.page.load_url?this.loadUrl=e.page.load_url:this.loadUrl=`${this.appUrl}/pages/${this.pageSlug}/load`,document.getElementById("page-load-url").value=this.loadUrl,e.page.edit_url)window.history.replaceState(null,"",e.page.edit_url);else try{const t=new URL(window.location.href);t.pathname=t.pathname.replace(/\/pages\/create\/?$/,`/pages/${this.pageSlug}/edit`),window.history.replaceState(null,"",t.toString())}catch(t){console.error("Error updating browser URL:",t)}}updateTitle(e){this.pageTitle=e;const t=document.getElementById("editor-title");t&&(t.textContent=`Editando: ${e}`),document.title=`Editar: ${e} - Editor`}getHttpMethod(){return this.isEditMode?"PUT":"POST"}needsTitle(){return!this.isEditMode}}class Tt{constructor(e){this.editorService=e,this.setupBackButton(),this.setupBeforeUnload()}setupBackButton(){const e=document.querySelector("#editor-navbar a[href]");e&&e.addEventListener("click",t=>{this.editorService.shouldPreventUnload()&&(t.preventDefault(),this.showUnsavedChangesModal(()=>{this.editorService.startNavigation(),window.location.href=e.href}))})}setupBeforeUnload(){window.addEventListener("beforeunload",e=>{if(this.editorService.shouldPreventUnload())return e.preventDefault(),e.returnValue="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?",e.returnValue})}showUnsavedChangesModal(e){const t=document.createElement("div");t.style.cssText=`
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
        `,[o,p].forEach(s=>{s.addEventListener("mouseenter",()=>{s.style.opacity="0.85"}),s.addEventListener("mouseleave",()=>{s.style.opacity="1"})});const d=()=>t.remove();o.addEventListener("click",d),p.addEventListener("click",()=>{d(),e()}),t.addEventListener("click",s=>{s.target===t&&d()}),l.appendChild(o),l.appendChild(p),a.appendChild(r),a.appendChild(l),t.appendChild(a),document.body.appendChild(t)}}const _t="Básico";class zt{constructor(){this.blocks=new Map}registerBlock(e,t){this.blocks.has(t.category)||this.blocks.set(t.category,[]),this.blocks.get(t.category).push({id:e,...t})}registerBlocks(e){e.forEach(t=>{this.registerBlock(t.id,t)})}applyToEditor(e){this.blocks.forEach(t=>{t.forEach(a=>{const{id:r,...l}=a;e.BlockManager.add(r,l)})}),this.applyCollapseSettings(e),this.hideDefaultCategories(e)}applyCollapseSettings(e){setTimeout(()=>{e.BlockManager.getCategories().each(t=>{t.set("open",t.get("label")===_t)})},500)}hideDefaultCategories(e){setTimeout(()=>{const t=["Basic","Extra"];document.querySelectorAll(".gjs-block-category").forEach(a=>{const r=a.querySelector(".gjs-title");r&&t.includes(r.textContent.trim())&&(a.style.display="none")})},100)}}const j=new zt,At=[{id:"heading1",label:"Título H1",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:{type:"image",attributes:{src:I("images/placeholder.svg"),alt:"Imagen"},classes:["max-w-full","h-auto","block"],activeOnRender:1}},{id:"unordered-list",label:"Lista no ordenada",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:'<div class="h-12 w-full"></div>'}],It=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Dt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,qt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="12" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="22" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Mt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="9" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="25" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Nt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="13" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Ot=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="21" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Pt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="14" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="23" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Rt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="11" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="20" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,q='<div class="col-cell"></div>',X=`
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
</style>`,Ht=[{id:"columns-1",label:"1 Columna",category:"Columnas",media:It,content:`
<div class="col-section">
    <div class="col-cell"></div>
</div>
${X}`},{id:"columns-2",label:"2 Columnas",category:"Columnas",media:Dt,content:`
<div class="col-section">
    <div class="col-grid col-grid--2">
        ${q}
        ${q}
    </div>
</div>
${X}`},{id:"columns-3",label:"3 Columnas",category:"Columnas",media:qt,content:`
<div class="col-section">
    <div class="col-grid col-grid--3">
        ${q}
        ${q}
        ${q}
    </div>
</div>
${X}`},{id:"columns-4",label:"4 Columnas",category:"Columnas",media:Mt,content:`
<div class="col-section">
    <div class="col-grid col-grid--4">
        ${q}
        ${q}
        ${q}
        ${q}
    </div>
</div>
${X}`},{id:"columns-1-3",label:"1/3 — 2/3",category:"Columnas",media:Nt,content:`
<div class="col-section">
    <div class="col-grid col-grid--1-2">
        ${q}
        ${q}
    </div>
</div>
${X}`},{id:"columns-3-1",label:"2/3 — 1/3",category:"Columnas",media:Ot,content:`
<div class="col-section">
    <div class="col-grid col-grid--2-1">
        ${q}
        ${q}
    </div>
</div>
${X}`},{id:"columns-1-2",label:"1/4 — 1/4 — 1/2",category:"Columnas",media:Pt,content:`
<div class="col-section">
    <div class="col-grid col-grid--1-1-2">
        ${q}
        ${q}
        ${q}
    </div>
</div>
${X}`},{id:"columns-2-1",label:"1/2 — 1/4 — 1/4",category:"Columnas",media:Rt,content:`
<div class="col-section">
    <div class="col-grid col-grid--2-1-1">
        ${q}
        ${q}
        ${q}
    </div>
</div>
${X}`}],Ft=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ut=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Vt=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Misión</h3>
    <p class="mvv-card-text">Proveemos la mejor experiencia a los empresarios de la micro y pequeña empresa, sus familiares y sus empleados, acompañándolos en su desarrollo con productos y servicios financieros especializados e innovadores adaptados a sus necesidades</p>
</div>`,Xt=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Visión</h3>
    <p class="mvv-card-text">Ser el banco pionero de la revolución financiera digital para los empresarios de la micro y pequeña empresa; y que mejor comprende y sirve sus necesidades de desarrollo a través de un ecosistema de productos y servicios integrales e innovadores.".</p>
</div>`,Yt=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Valores</h3>
    <p class="mvv-card-text">Cada día la cultura Integral se está fortaleciendo, todos los que pertenecemos a esta organización compartimos y vivimos los valores</p>
    <ul class="mvv-bullet-list">
        <li>Responsabilidad</li>
        <li>Compromiso social</li>
        <li>Integridad</li>
        <li>Excelencia</li>
    </ul>
</div>`,ze=`
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
</style>`,Wt=[{id:"about-section",label:"Nuestra Historia",category:"Contenido",media:Ft,content:`
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
                <img src="${I("images/placeholder.svg")}" alt="Imagen de sección">
            </div>
        </div>
    </div>
</section>
${ze}`},{id:"about-mvv-section",label:"Misión, Visión y Valores",category:"Contenido",media:Ut,content:`
<section class="mvv-section">
    <h2 class="mvv-section-title">Misión, Visión y Valores</h2>
    <div class="mvv-grid">
        ${Vt}
        ${Xt}
        ${Yt}
    </div>
</section>
${ze}`}],Gt=`
<style>
.mv-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;}
@media(max-width:992px){.mv-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`,Jt=`
<li class="flex items-start gap-2 text-base font-bold text-[#E97300] leading-relaxed">
    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#E97300] shrink-0"></span>
    <span>Responsabilidad</span>
</li>`,Kt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Qt=[{id:"mission-vision-values",label:"Misión, Visión y Valores",category:"Institucional",media:Kt,content:`
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
                    ${Jt}
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
            <img src="${I("images/placeholder.svg")}" alt="Misión, Visión y Valores" class="w-full h-full object-cover rounded-xl">
        </div>
    </div>
</section>
${Gt}`}],rt=function(){(function(){function i(t){if(!t||t.__pcInit)return;t.__pcInit=!0;var a=t.querySelector(".pc-carousel-wrap");if(!a)return;var r=!1,l=0,o=0,p=!1,d=0,s=0,c=0,x=null;a.querySelectorAll("img").forEach(function(f){f.setAttribute("draggable","false")}),setTimeout(function(){var f=a.scrollWidth-a.clientWidth;if(f<=0)return;var y=Math.min(60,f),E=null;function v(L){E||(E=L);var _=(L-E)/400;if(_<.5)a.scrollLeft=y*(_*2);else if(_<1)a.scrollLeft=y*(1-(_-.5)*2);else{a.scrollLeft=0;return}requestAnimationFrame(v)}requestAnimationFrame(v)},400),a.scrollLeft=0;function b(){return a.scrollWidth-a.clientWidth}function u(f){return Math.max(0,Math.min(f,b()))}function g(){Math.abs(d)<.5||(d*=.92,a.scrollLeft=u(a.scrollLeft+d),x=requestAnimationFrame(g))}a.addEventListener("mousedown",function(f){f.button===0&&(x&&(cancelAnimationFrame(x),x=null),r=!0,p=!1,d=0,l=f.clientX,s=f.clientX,c=Date.now(),o=a.scrollLeft,a.style.cursor="grabbing",f.preventDefault())}),document.addEventListener("mousemove",function(f){if(r){var y=l-f.clientX;Math.abs(y)>3&&(p=!0);var E=Date.now(),v=E-c||1;d=(f.clientX-s)/v*16*-1,s=f.clientX,c=E,a.scrollLeft=u(o+y)}}),document.addEventListener("mouseup",function(f){r&&(r=!1,a.style.cursor="grab",p&&(f.stopPropagation(),x=requestAnimationFrame(g)))}),a.addEventListener("click",function(f){p&&(f.preventDefault(),f.stopPropagation(),p=!1)},!0);var B=0,T=0,m=0,k=0,h=0;a.addEventListener("touchstart",function(f){x&&(cancelAnimationFrame(x),x=null),B=f.touches[0].clientX,m=f.touches[0].clientX,k=Date.now(),T=a.scrollLeft,h=0},{passive:!0}),a.addEventListener("touchmove",function(f){var y=Date.now(),E=y-k||1,v=f.touches[0].clientX;h=(v-m)/E*16*-1,m=v,k=y;var L=B-v;a.scrollLeft=u(T+L)},{passive:!0}),a.addEventListener("touchend",function(){x=requestAnimationFrame(function f(){Math.abs(h)<.5||(h*=.92,a.scrollLeft=u(a.scrollLeft+h),x=requestAnimationFrame(f))})},{passive:!0})}function e(){document.querySelectorAll(".pc-section").forEach(function(t){delete t.__pcInit,i(t)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()},Zt=`(${rt.toString()})();`,ei=`
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
@media(max-width:480px){.pc-card{flex:0 0 80vw;}}`;function ti(i){const e=i.img||I("images/placeholder.svg"),t=i.title||"TÍTULO DEL PRODUCTO",a=i.desc||"Descripción breve del producto financiero.",r=i.href||"#",l=i.btn_label||"Solicitar";return`<div class="pc-card"><div class="pc-card-img-wrap"><img src="${e}" alt="${t}" class="pc-card-img"></div><div class="pc-card-body"><h3 class="pc-card-title">${t}</h3><p class="pc-card-desc">${a}</p></div><a href="${r}" class="pc-btn">${l}</a></div>`}function lt(i){const e=i.heading||"Créditos",t=i.subheading||"Opciones de financiamiento diseñadas para hacer realidad tus proyectos.",a=i.more_href||"#",r=i.more_label||"Ver más",l=i.show_more!==!1,p=(i.cards||[]).map(ti).join(""),d=l?`<div class="pc-more-wrap"><a href="${a}" class="pc-more-btn">${r}</a></div>`:"";return`<section class="pc-section"><style>${ei}</style><div style="text-align:center;margin-bottom:2rem;"><h2 class="pc-section-heading">${e}</h2><p class="pc-section-subheading">${t}</p></div><div class="pc-carousel-wrap"><div class="pc-track">${p}</div></div>${d}</section>`}const F={heading:"Créditos",subheading:"Opciones de financiamiento diseñadas para hacer realidad tus proyectos.",more_href:"#",more_label:"Ver más",cards:[{img:"",title:"CREDINVIERTE",desc:"Adquiere activos fijos",href:"#",btn_label:"Solicitar"},{img:"",title:"SOLUCIONES INTEGRALES",desc:"Financiamiento PYME",href:"#",btn_label:"Solicitar"},{img:"",title:"CREDI-CONFIAMOS",desc:"Rápido y sin fiador",href:"#",btn_label:"Solicitar"},{img:"",title:"CREDILÍNEA",desc:"Línea rotativa",href:"#",btn_label:"Solicitar"}]};function ii(i,e){const t=document.getElementById("pc-config-modal");if(t&&t.remove(),!document.getElementById("pc-modal-styles")){const s=document.createElement("style");s.id="pc-modal-styles",s.textContent=`
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
        `,document.head.appendChild(s)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-product-cards-config"]||"{}")}catch{return{}}})(),r={heading:a.heading??F.heading,subheading:a.subheading??F.subheading,more_href:a.more_href??F.more_href,more_label:a.more_label??F.more_label,show_more:a.show_more??!0,cards:JSON.parse(JSON.stringify(a.cards??F.cards))},l=document.createElement("div");l.id="pc-config-modal",l.className="pc-overlay";const o=document.createElement("div");o.className="pc-modal",o.innerHTML=`
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
        </div>`,l.appendChild(o),document.body.appendChild(l),o.querySelectorAll(".pc-tab-btn").forEach(s=>{s.addEventListener("click",()=>{o.querySelectorAll(".pc-tab-btn").forEach(c=>c.classList.remove("active")),o.querySelectorAll(".pc-tab-panel").forEach(c=>c.classList.remove("active")),s.classList.add("active"),o.querySelector(`#pc-panel-${s.dataset.tab}`).classList.add("active")})}),o.querySelector("#pc-show-more").addEventListener("change",function(){r.show_more=this.checked,o.querySelector("#pc-more-fields").style.display=this.checked?"flex":"none"});function p(){const s=o.querySelector("#pc-cards-list");s.innerHTML="",r.cards.forEach((c,x)=>{const b=document.createElement("div");b.className="pc-card-config";const u=c.img?`<img class="pc-img-preview" src="${c.img}" alt="">`:'<div class="pc-img-placeholder"><i class="ri-image-line"></i></div>';b.innerHTML=`
                <div class="pc-card-config-header">
                    <span class="pc-card-num">${x+1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${x+1}</span>
                    <button class="pc-btn-remove pc-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="pc-row">
                    <div id="pc-img-wrap-${x}">${u}</div>
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
                </div>`,b.querySelectorAll("[data-field]").forEach(g=>{g.addEventListener("input",()=>{if(c[g.dataset.field]=g.value,g.dataset.field==="img"){const B=b.querySelector(`#pc-img-wrap-${x}`);B.innerHTML=g.value?`<img class="pc-img-preview" src="${g.value}" alt="">`:'<div class="pc-img-placeholder"><i class="ri-image-line"></i></div>'}})}),b.querySelector(".pc-pick-img").addEventListener("click",()=>{we({type:"image",title:"Seleccionar imagen de tarjeta",onSelect:g=>{c.img=g,b.querySelector("[data-field='img']").value=g,b.querySelector(`#pc-img-wrap-${x}`).innerHTML=`<img class="pc-img-preview" src="${g}" alt="">`}})}),b.querySelector(".pc-remove-card").addEventListener("click",()=>{r.cards.splice(x,1),p()}),s.appendChild(b)})}p(),o.querySelector("#pc-add-card").addEventListener("click",()=>{r.cards.push({img:"",title:"NUEVO PRODUCTO",desc:"Descripción del producto.",href:"#",btn_label:"Solicitar"}),p(),o.querySelector("#pc-cards-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})});const d=()=>l.remove();o.querySelector("#pc-modal-close").addEventListener("click",d),o.querySelector("#pc-modal-cancel").addEventListener("click",d),l.addEventListener("click",s=>{s.target===l&&d()}),o.querySelector("#pc-modal-save").addEventListener("click",()=>{r.heading=o.querySelector("#pc-heading").value.trim()||F.heading,r.subheading=o.querySelector("#pc-subheading").value.trim()||F.subheading,r.show_more=o.querySelector("#pc-show-more").checked,r.more_label=o.querySelector("#pc-more-label").value.trim()||F.more_label,r.more_href=o.querySelector("#pc-more-href").value.trim()||"#",e.addAttributes({"data-product-cards-config":JSON.stringify(r)}),e.components(lt(r)),setTimeout(()=>ue(i),300),d()})}function ue(i){try{const e=i.Canvas.getFrameEl()?.contentDocument;if(!e)return;const t=e.getElementById("pc-runtime-script");t&&t.remove(),e.querySelectorAll(".pc-section").forEach(r=>{delete r.__pcInit});const a=e.createElement("script");a.id="pc-runtime-script",a.textContent=Zt,e.head.appendChild(a)}catch(e){console.warn("[ProductCards] Error reiniciando carrusel:",e)}}const ai=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;function ri(i){const e="product-cards-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección de Productos",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-product-cards-config":JSON.stringify(F)},components:lt(F),script:rt,"script-props":["data-product-cards-config"],traits:[{type:"button",label:"Productos",text:"Administrar Sección",full:!0,command:"open-product-cards-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),i.Commands.add("open-product-cards-config",{run(t){const a=t.getSelected();a&&ii(t,a)}}),i.BlockManager.add("product-cards-block",{label:"Sección de productos",category:"Productos y Servicios",media:ai,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),i.on("component:mount",t=>{t.getEl()?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>ue(i),400))}),i.on("component:selected",t=>{const a=t.getEl();if(!a)return;const r=a.closest(`[data-gjs-type="${e}"]`);if(r&&!a.hasAttribute("data-gjs-type")){const o=i.getWrapper().find(`[data-gjs-type="${e}"]`).find(p=>p.getEl()===r);o&&setTimeout(()=>i.select(o),0)}}),i.on("canvas:render",()=>{setTimeout(()=>ue(i),600)}),i.on("storage:end:load",()=>{setTimeout(()=>ue(i),800)})}const li=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ae=`
<div class="flex flex-col gap-5 rounded-2xl p-8 dc-bg-primary">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold text-white">Lorem ipsum dolor</h3>
        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-outline w-full py-2 px-8 rounded-lg bg-white dc-text-primary text-base font-semibold text-center">Lorem ipsum</a>
</div>`,Ie=`
<div class="flex flex-col gap-5 rounded-2xl p-8 bg-white border border-gray-200">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center dc-bg-light">
        <i class="ri-bank-line text-2xl dc-text-primary"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold dc-text-primary">Lorem ipsum dolor</h3>
        <p class="text-base dc-text-primary leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-solid w-full py-2 px-8 rounded-lg dc-bg-primary text-white text-base font-semibold text-center">Lorem ipsum</a>
</div>`,Be=`
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
</style>`,oi=[{id:"dual-card-section",label:"Sección dos tarjetas",category:"Productos y Servicios",media:li,content:`
<section class="dc-section">
    <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-[#003B71] mb-3">Lorem ipsum dolor sit amet</h2>
        <p class="text-base text-[#003B71]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="dc-grid">
        ${Ae}
        ${Ie}
    </div>
</section>
${Be}`},{id:"dual-card-dark",label:"Tarjeta azul oscuro",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="#003B71" rx="2"/>
            <rect x="5" y="5" width="6" height="6" fill="rgba(255,255,255,0.2)" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="white" fill-opacity="0.9"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="white"/>
        </svg>`,content:`${Ae}${Be}`},{id:"dual-card-light",label:"Tarjeta blanca",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="white" rx="2" stroke="#003B71" stroke-width="0.5" stroke-opacity="0.3"/>
            <rect x="5" y="5" width="6" height="6" fill="#dce8f5" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.8"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="#003B71"/>
        </svg>`,content:`${Ie}${Be}`}],ni=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="white" rx="2" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="8" y="7" width="16" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="11" width="12" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="11" y="13.5" width="10" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="6" y="18" width="9" height="5" rx="1.5" fill="#E97300"/>
    <rect x="17" y="18" width="9" height="5" rx="1.5" fill="white" stroke="#e5e7eb" stroke-width="0.8"/>
</svg>`,si=`
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
</style>`,ci=[{id:"cta-section",label:"Llamada a la acción",category:"Llamadas a la acción",media:ni,content:`
<section class="cta-section">
    <div class="cta-img-wrap">
        <img src="${I("images/placeholder.svg")}" alt="Imagen CTA">
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
${si}`}],ce=`
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
</style>`,di=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,fi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="12" width="28" height="8" rx="1.5" fill="#ffffff" stroke="#e5e7eb" stroke-width="0.7"/>
    <rect x="5" y="14.5" width="3.5" height="4.5" rx="0.5" fill="none" stroke="#E97300" stroke-width="0.8"/>
    <rect x="11" y="15" width="12" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.75"/>
    <circle cx="26.5" cy="16" r="2.2" fill="#E97300"/>
</svg>`,pi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,hi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="12" width="28" height="8" rx="1.5" fill="#ffffff" stroke="#003B71" stroke-width="0.8"/>
    <rect x="5" y="14.3" width="3.5" height="4.4" rx="0.5" fill="none" stroke="#003B71" stroke-width="0.8"/>
    <rect x="11" y="15.2" width="13" height="1.3" rx="0.65" fill="#003B71" fill-opacity="0.8"/>
    <path d="M25 15l1.8 1.8L25 18.6" fill="none" stroke="#003B71" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;function xe(i){return`<a href="#" class="dd-btn" data-gjs-type="doc-download-button">
        <span class="dd-btn-left" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <i class="ri-article-line dd-btn-icon-file" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
            <span class="dd-btn-label" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">${i}</span>
        </span>
        <span class="dd-btn-download" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <i class="ri-download-fill"></i>
        </span>
    </a>`}function Ee(i,e){return`<div class="dd-acc-item${e?" dd-acc-open":""}" data-gjs-type="doc-accordion-item">
        <div class="dd-acc-header" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <span class="dd-acc-title" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">${i}</span>
            <i class="${e?"ri-arrow-down-s-line":"ri-arrow-right-s-line"} dd-acc-arrow" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
        </div>
        <div class="dd-acc-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
        <div class="dd-acc-body" data-gjs-droppable="true">
            ${xe("Nombre_del_documento.pdf")}
        </div>
    </div>`}function gi(){return function(){const i=this;if(i.__ddAccBound)return;i.__ddAccBound=!0;const e=i.querySelector(".dd-acc-header"),t=i.querySelector(".dd-acc-arrow");!e||!t||e.addEventListener("click",a=>{if(a.target.closest("a"))return;const r=i.classList.toggle("dd-acc-open");t.classList.toggle("ri-arrow-down-s-line",r),t.classList.toggle("ri-arrow-right-s-line",!r)})}}const mi=[{id:"document-download-section",label:"Sección de Documentos Descargables",category:"Documentos",media:di,content:`
<section class="dd-section">
    <h2 class="text-4xl font-extrabold text-[#003B71]" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Titulo principal</h2>
    <div class="dd-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
    <div class="dd-list" data-gjs-droppable="true">
        ${xe("Nombre_del_documento.pdf")}
        ${xe("Nombre_del_documento.pdf")}
    </div>
</section>
${ce}`},{id:"document-download-button",label:"Botón de Documento",category:"Documentos",media:fi,content:`${xe("Nombre_del_documento.pdf")}${ce}`},{id:"document-accordion-section",label:"Sección de Documentos con Acordeón",category:"Documentos",media:pi,content:`
<section class="dd-section">
    <h2 class="text-4xl font-extrabold text-[#003B71]" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Titulo principal</h2>
    <div class="dd-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
    <div class="dd-acc-list" data-gjs-droppable="true">
        ${Ee("Nombre de la sección",!0)}
        ${Ee("Nombre de la sección",!1)}
    </div>
</section>
${ce}`},{id:"document-accordion-item",label:"Ítem de Acordeón",category:"Documentos",media:hi,content:`${Ee("Nombre de la sección",!1)}${ce}`}];function bi(i){const e="doc-download-button",t="doc-accordion-item";i.DomComponents.addType(e,{isComponent:a=>a.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Botón de Documento",tagName:"a",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,class:"dd-btn",href:"#"},components:`
                    <span class="dd-btn-left" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                        <i class="ri-article-line dd-btn-icon-file" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></i>
                        <span class="dd-btn-label" contenteditable="true" data-gjs-type="text" data-gjs-editable="true">Nombre_del_documento.pdf</span>
                    </span>
                    <span class="dd-btn-download" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
                        <i class="ri-download-fill"></i>
                    </span>
                `,traits:[{type:"text",name:"href",label:"Enlace (URL)"},{type:"checkbox",name:"target",label:"Abrir en nueva pestaña",valueTrue:"_blank",valueFalse:""},{type:"button",label:"Documento",text:"Seleccionar documento",full:!0,command:"select-doc-download-file"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),i.DomComponents.addType(t,{isComponent:a=>a.getAttribute?.("data-gjs-type")===t?{type:t}:!1,model:{defaults:{name:"Ítem de Acordeón",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":t,class:"dd-acc-item"},components:`
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
                `,script:gi()},init(){this.set("type",t),this.addAttributes({"data-gjs-type":t})}}}),i.Commands.add("select-doc-download-file",{run(a){const r=a.getSelected();!r||r.get("type")!==e||we({type:"document",title:"Seleccionar documento",onSelect:(l,o)=>{r.addAttributes({href:l});const p=r.find(".dd-btn-label")[0],d=o?.name||l.split("/").pop();p&&p.components(d)}})}}),ui(i,t)}function ui(i,e){i.on("storage:end:load",()=>{setTimeout(()=>De(i,e),800)}),i.on("component:mount",t=>{const a=t.getEl();a?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const r=t.get("script");r&&typeof r=="function"&&r.call(a)},400))}),i.on("component:clone",t=>{if(t.get("type")===e){const a=t.getEl();a&&(delete a.__ddAccBound,setTimeout(()=>{const r=t.get("script");r&&typeof r=="function"&&r.call(a)},400))}}),i.on("canvas:render",()=>{setTimeout(()=>De(i,e),600)})}function De(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const a=t.getEl();if(a?.isConnected){const r=t.get("script");r&&typeof r=="function"&&r.call(a)}})}const ot=function(){(function(){function i(t){if(!t||t.__savInit)return;t.__savInit=!0;var a=t.querySelector(".sav-carousel-wrap");if(!a)return;a.scrollLeft=0;var r=!1,l=0,o=0,p=!1,d=0,s=0,c=0,x=null;a.querySelectorAll("img").forEach(function(f){f.setAttribute("draggable","false")}),setTimeout(function(){var f=a.scrollWidth-a.clientWidth;if(f<=0)return;var y=Math.min(60,f),E=null;function v(L){E||(E=L);var _=(L-E)/400;if(_<.5)a.scrollLeft=y*(_*2);else if(_<1)a.scrollLeft=y*(1-(_-.5)*2);else{a.scrollLeft=0;return}requestAnimationFrame(v)}requestAnimationFrame(v)},400);function b(){return a.scrollWidth-a.clientWidth}function u(f){return Math.max(0,Math.min(f,b()))}function g(){Math.abs(d)<.5||(d*=.92,a.scrollLeft=u(a.scrollLeft+d),x=requestAnimationFrame(g))}a.addEventListener("mousedown",function(f){f.button===0&&(x&&(cancelAnimationFrame(x),x=null),r=!0,p=!1,d=0,l=f.clientX,s=f.clientX,c=Date.now(),o=a.scrollLeft,a.style.cursor="grabbing",f.preventDefault())}),document.addEventListener("mousemove",function(f){if(r){var y=l-f.clientX;Math.abs(y)>3&&(p=!0);var E=Date.now(),v=E-c||1;d=(f.clientX-s)/v*16*-1,s=f.clientX,c=E,a.scrollLeft=u(o+y)}}),document.addEventListener("mouseup",function(f){r&&(r=!1,a.style.cursor="grab",p&&(f.stopPropagation(),x=requestAnimationFrame(g)))}),a.addEventListener("click",function(f){p&&(f.preventDefault(),f.stopPropagation(),p=!1)},!0);var B=0,T=0,m=0,k=0,h=0;a.addEventListener("touchstart",function(f){x&&(cancelAnimationFrame(x),x=null),B=f.touches[0].clientX,m=f.touches[0].clientX,k=Date.now(),T=a.scrollLeft,h=0},{passive:!0}),a.addEventListener("touchmove",function(f){var y=Date.now(),E=y-k||1,v=f.touches[0].clientX;h=(v-m)/E*16*-1,m=v,k=y;var L=B-v;a.scrollLeft=u(T+L)},{passive:!0}),a.addEventListener("touchend",function(){x=requestAnimationFrame(function f(){Math.abs(h)<.5||(h*=.92,a.scrollLeft=u(a.scrollLeft+h),x=requestAnimationFrame(f))})},{passive:!0})}function e(){document.querySelectorAll(".sav-section").forEach(function(t){delete t.__savInit,i(t)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()},xi=`(${ot.toString()})();`,yi=`
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
@media(max-width:480px){.sav-card{flex:0 0 75vw;}}`;function vi(i){const e=i.img||I("images/placeholder.svg"),t=i.title||"TÍTULO DEL PRODUCTO",a=i.desc?`<p class="sav-card-desc">${i.desc}</p>`:"",r=i.href||"#",l=i.btn_label||"Solicitar";return`<div class="sav-card"><div class="sav-card-img-wrap"><img src="${e}" alt="${t}" class="sav-card-img"></div><h3 class="sav-card-title">${t}</h3>${a}<a href="${r}" class="sav-btn">${l}</a></div>`}function nt(i){const e=i.heading||"Depósitos y Cuentas de Ahorro",t=i.subheading||"Productos diseñados para hacer crecer tu dinero de forma segura.",a=i.more_href||"#",r=i.more_label||"Ver más",l=i.show_more!==!1,p=(i.cards||[]).map(vi).join(""),d=I("images/brand-watermark.png"),s=l?`<div class="sav-more-wrap"><a href="${a}" class="sav-more-btn">${r}</a></div>`:"";return`<section class="sav-section"><style>${yi}</style><div class="sav-blue-box"><div class="sav-watermark"><img src="${d}" alt=""></div><div style="display:flex;flex-direction:column;gap:0.5rem;text-align:center;position:relative;z-index:1;"><h2 class="sav-heading">${e}</h2><p class="sav-subheading">${t}</p></div><div class="sav-carousel-wrap"><div class="sav-track">${p}</div></div>${s}</div></section>`}const U={heading:"Depósitos y Cuentas de Ahorro",subheading:"Productos diseñados para hacer crecer tu dinero de forma segura.",more_href:"#",more_label:"Ver más",cards:[{img:"",title:"CUENTA DE AHORRO ESTÁNDAR",href:"#",btn_label:"Solicitar"},{img:"",title:"AHORRO RENTABLE",href:"#",btn_label:"Solicitar"},{img:"",title:"CUENTA DE AHORRO MÁS",href:"#",btn_label:"Solicitar"},{img:"",title:"DEPÓSITO DE PLAZO FIJO",href:"#",btn_label:"Solicitar"}]};function wi(i,e){const t=document.getElementById("sav-config-modal");if(t&&t.remove(),!document.getElementById("sav-modal-styles")){const s=document.createElement("style");s.id="sav-modal-styles",s.textContent=`
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
        `,document.head.appendChild(s)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-savings-config"]||"{}")}catch{return{}}})(),r={heading:a.heading??U.heading,subheading:a.subheading??U.subheading,more_href:a.more_href??U.more_href,more_label:a.more_label??U.more_label,show_more:a.show_more??!0,cards:JSON.parse(JSON.stringify(a.cards??U.cards))},l=document.createElement("div");l.id="sav-config-modal",l.className="sav-overlay";const o=document.createElement("div");o.className="sav-modal",o.innerHTML=`
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
        </div>`,l.appendChild(o),document.body.appendChild(l),l.addEventListener("click",s=>{s.target===l&&d()}),o.querySelectorAll(".sav-tab-btn").forEach(s=>{s.addEventListener("click",()=>{o.querySelectorAll(".sav-tab-btn").forEach(c=>c.classList.remove("active")),o.querySelectorAll(".sav-tab-panel").forEach(c=>c.classList.remove("active")),s.classList.add("active"),o.querySelector(`#sav-panel-${s.dataset.tab}`).classList.add("active")})}),o.querySelector("#sav-show-more").addEventListener("change",function(){r.show_more=this.checked,o.querySelector("#sav-more-fields").style.display=this.checked?"flex":"none"});function p(){const s=o.querySelector("#sav-cards-list");s.innerHTML="",r.cards.forEach((c,x)=>{const b=document.createElement("div");b.className="sav-card-config";const u=c.img?`<img class="sav-img-preview" src="${c.img}" alt="">`:'<div class="sav-img-placeholder"><i class="ri-image-line"></i></div>';b.innerHTML=`
                <div class="sav-card-config-header">
                    <span class="sav-card-num">${x+1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${x+1}</span>
                    <button class="sav-btn-remove sav-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="sav-row">
                    <div id="sav-img-wrap-${x}">${u}</div>
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
                </div>`,b.querySelectorAll("[data-field]").forEach(g=>{g.addEventListener("input",()=>{if(c[g.dataset.field]=g.value,g.dataset.field==="img"){const B=b.querySelector(`#sav-img-wrap-${x}`);B.innerHTML=g.value?`<img class="sav-img-preview" src="${g.value}" alt="">`:'<div class="sav-img-placeholder"><i class="ri-image-line"></i></div>'}})}),b.querySelector(".sav-pick-img").addEventListener("click",()=>{we({type:"image",title:"Seleccionar imagen de tarjeta",onSelect:g=>{c.img=g,b.querySelector("[data-field='img']").value=g,b.querySelector(`#sav-img-wrap-${x}`).innerHTML=`<img class="sav-img-preview" src="${g}" alt="">`}})}),b.querySelector(".sav-remove-card").addEventListener("click",()=>{r.cards.splice(x,1),p()}),s.appendChild(b)})}p(),o.querySelector("#sav-add-card").addEventListener("click",()=>{r.cards.push({img:"",title:"NUEVO PRODUCTO",desc:"",href:"#",btn_label:"Solicitar"}),p(),o.querySelector("#sav-cards-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})});const d=()=>l.remove();o.querySelector("#sav-modal-close").addEventListener("click",d),o.querySelector("#sav-modal-cancel").addEventListener("click",d),o.querySelector("#sav-modal-save").addEventListener("click",()=>{r.heading=o.querySelector("#sav-heading").value.trim()||U.heading,r.subheading=o.querySelector("#sav-subheading").value.trim()||U.subheading,r.show_more=o.querySelector("#sav-show-more").checked,r.more_label=o.querySelector("#sav-more-label").value.trim()||U.more_label,r.more_href=o.querySelector("#sav-more-href").value.trim()||"#",e.addAttributes({"data-savings-config":JSON.stringify(r)}),e.components(nt(r)),setTimeout(()=>ye(i),300),d()})}function ye(i){try{const e=i.Canvas.getFrameEl()?.contentDocument;if(!e)return;const t=e.getElementById("sav-runtime-script");t&&t.remove(),e.querySelectorAll(".sav-section").forEach(r=>{delete r.__savInit});const a=e.createElement("script");a.id="sav-runtime-script",a.textContent=xi,e.head.appendChild(a)}catch(e){console.warn("[Savings] Error reiniciando carrusel:",e)}}const ki=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;function Bi(i){const e="savings-section-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección Fondo Azul",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-savings-config":JSON.stringify(U)},components:nt(U),script:ot,"script-props":["data-savings-config"],traits:[{type:"button",label:"Sección",text:"Administrar Sección",full:!0,command:"open-savings-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),i.Commands.add("open-savings-config",{run(t){const a=t.getSelected();a&&wi(t,a)}}),i.BlockManager.add("savings-section-block",{label:"Sección Fondo Azul",category:"Productos y Servicios",media:ki,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),i.on("component:mount",t=>{t.getEl()?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>ye(i),400))}),i.on("component:selected",t=>{const a=t.getEl();if(!a)return;const r=a.closest(`[data-gjs-type="${e}"]`);if(r&&!a.hasAttribute("data-gjs-type")){const l=i.getWrapper().find(`[data-gjs-type="${e}"]`).find(o=>o.getEl()===r);l&&setTimeout(()=>i.select(l),0)}}),i.on("canvas:render",()=>setTimeout(()=>ye(i),600)),i.on("storage:end:load",()=>setTimeout(()=>ye(i),800))}const qe=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="2" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="2" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="2" y="12" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="17" y="12" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="2" y="22" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="22" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
</svg>`,Ei=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#F07C28" rx="2"/>
    <rect x="4" y="10" width="14" height="2.5" fill="white" rx="1"/>
    <rect x="4" y="15" width="10" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
    <ellipse cx="24" cy="20" rx="7" ry="9" fill="rgba(255,255,255,0.18)"/>
    <circle cx="22" cy="10" r="3.5" fill="rgba(255,255,255,0.25)"/>
</svg>`,$i=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="4" y="10" width="14" height="2.5" fill="white" rx="1"/>
    <rect x="4" y="15" width="10" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
    <ellipse cx="24" cy="20" rx="7" ry="9" fill="rgba(255,255,255,0.18)"/>
    <circle cx="22" cy="10" r="3.5" fill="rgba(255,255,255,0.25)"/>
</svg>`,K=`
<a href="#" class="plc-card plc-card--orange">
    <span class="plc-card__title">NOMBRE DEL PRODUCTO</span>
    <div class="plc-card__watermark">
        <img src="${I("images/brand-watermark.png")}" alt="">
    </div>
</a>`,Q=`
<a href="#" class="plc-card plc-card--blue">
    <span class="plc-card__title">NOMBRE DEL PRODUCTO</span>
    <div class="plc-card__watermark">
        <img src="${I("images/brand-watermark.png")}" alt="">
    </div>
</a>`,$e=`
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
</style>`,Si=[{id:"product-link-cards",label:"Tarjetas de productos con enlace",category:"Productos y Servicios",media:qe,content:`
<section class="plc-section">
    <div class="plc-header">
        <h2 class="plc-header__title">Nuestros Productos</h2>
        <p class="plc-header__subtitle">Encuentra el producto financiero ideal para ti.</p>
    </div>
    <div class="plc-grid">
        ${K}
        ${Q}
        ${K}
        ${Q}
        ${Q}
        ${K}
        ${Q}
        ${K}
    </div>
</section>
${$e}`},{id:"product-link-card-orange",label:"Tarjeta producto naranja",category:"Productos y Servicios",media:qe,media:Ei,content:`${K}${$e}`},{id:"product-link-card-blue",label:"Tarjeta producto azul",category:"Productos y Servicios",media:$i,content:`${Q}${$e}`}],Ci=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Li=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#E97300" fill-opacity="0.85"/>
    <rect x="13" y="10" width="6" height="4" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="10" y="21" width="12" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="11" y="24" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`,Z=`
<a href="#" class="flex flex-col items-center text-center gap-4 no-underline il-link-item">
    <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0 il-icon-badge">
        <img src="${I("images/placeholder.svg")}" alt="" class="w-8 h-8 object-contain">
    </div>
    <span class="text-base font-semibold leading-snug il-link-label transition-colors duration-200">Nombre del servicio</span>
</a>`,Me=`
<style>
.il-section{width:100%;background:#ffffff;padding:3.5rem 4rem;}
.il-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
.il-icon-badge{background-color:#E97300;}
.il-link-label{color:#003B71;}
.il-link-item:hover .il-link-label{color:#E97300;}
@media(max-width:1280px){.il-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.il-section{padding:2.5rem 1.5rem;}.il-grid{grid-template-columns:repeat(2,1fr);gap:2rem;}}
@media(max-width:480px){.il-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem;}}
</style>`,ji=[{id:"icon-links-strip",label:"Iconos con enlace",category:"Productos y Servicios",media:Ci,content:`
<section class="il-section">
    <div class="il-grid">
        ${Z}
        ${Z}
        ${Z}
        ${Z}
    </div>
</section>
${Me}`},{id:"icon-link-item",label:"Icono con enlace",category:"Productos y Servicios",media:Li,content:`${Z}${Me}`}],Ti=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,_i=`
<style>
.ic-title{color:#003B71;}
.ic-text{color:#003B71;}
</style>`,Se=(i,e)=>`
<div class="ic-card flex items-center gap-4 sm:gap-5 md:gap-7 bg-white rounded-2xl shadow-md p-5 sm:p-6 md:p-8">
    <img src="${I("images/placeholder.svg")}" alt="Icono" class="ic-icon w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0 object-contain">
    <div class="flex flex-col gap-1.5 md:gap-2">
        <h3 class="ic-title text-2xl font-bold leading-snug">${i}</h3>
        <p class="ic-text text-base leading-relaxed">${e}</p>
    </div>
</div>`,zi=()=>`
<section class="ic-section w-full bg-white flex flex-col gap-4 md:gap-6 p-6 sm:p-8 md:p-12 lg:px-16">
    ${Se("Título de la sección","Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.")}
    ${Se("Título de la sección","Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.")}
    ${Se("Título de la sección","Descripción breve del contenido asociado a este ícono, edítala directamente desde el lienzo.")}
</section>
${_i}`,Ai=[{id:"icon-cards-block",label:"Tarjetas con ícono",category:"Contenido",media:Ti,content:zi()}],Ii=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Di=`
<style>
.asc-heading{color:#E97300;}
.asc-badge{background:#E97300;}
.asc-title{color:#003B71;}
.asc-text{color:#003B71;}
</style>`,ee=(i,e)=>`
<div class="asc-card flex flex-col items-center text-center gap-3 bg-white rounded-2xl shadow-md p-6">
    <div class="asc-badge w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
        <img src="${I("images/placeholder.svg")}" alt="Icono" class="asc-icon w-8 h-8 object-contain">
    </div>
    <h3 class="asc-title text-base font-bold leading-snug">${i}</h3>
    <p class="asc-text text-base leading-relaxed">${e}</p>
</div>`,qi=()=>`
<section class="asc-section w-full bg-white flex flex-col gap-6 p-6 sm:p-8 md:p-12 lg:px-16">
    <p class="asc-heading text-base font-bold">Cuentas con asistencias de:</p>
    <div class="asc-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        ${ee("Título de la asistencia","Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.")}
        ${ee("Título de la asistencia","Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.")}
        ${ee("Título de la asistencia","Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.")}
        ${ee("Título de la asistencia","Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.")}
        ${ee("Título de la asistencia","Descripción breve del servicio de asistencia, edítala directamente desde el lienzo.")}
    </div>
</section>
${Di}`,Mi=[{id:"assistance-cards-block",label:"Tarjetas de asistencias",category:"Contenido",media:Ii,content:qi()}],Ni=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Oi=`
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
</style>`,Pi=[{id:"promo-cta",label:"Promo con CTA y precio",category:"Llamadas a la acción",media:Ni,content:`
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
${Oi}`}],Ri=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Hi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,de=`
<div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white">
        <i class="ri-shield-check-line text-lg text-[#E97300]"></i>
    </div>
    <p class="text-white text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`,Ne=`
<div class="flex flex-col gap-4">
    <h2 class="text-4xl font-bold leading-tight flex flex-wrap items-center gap-2">
        <span class="bg-[#003B71] text-white text-3xl font-bold px-3 py-1 rounded-lg leading-tight">Mi</span>
        <span class="text-[#003B71]">Banca</span>
        <span class="text-white font-bold">Integral</span>
    </h2>
    <p class="text-white text-base leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="fb-list-wrap flex flex-col gap-3">
        ${de}
        ${de}
        ${de}
        ${de}
    </div>
</div>`,Oe=`
<div class="fb-col-image">
    <div class="fb-img-wrap">
        <img src="${I("images/placeholder.svg")}" alt="Imagen" class="fb-img">
    </div>
</div>`,Fi=`
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
</style>`,Pe=i=>{const e=i?"fb-section-right":"fb-section-left",t=i?`<div class="fb-col-content">${Ne}</div>${Oe}`:`${Oe}<div class="fb-col-content">${Ne}</div>`;return`
<section class="${e}">
    <div class="fb-grid">
        ${t}
    </div>
</section>
${Fi}`},Ui=[{id:"feature-orange-img-right",label:"Sección naranja - imagen derecha",category:"Banners",media:Hi,content:Pe(!0)},{id:"feature-orange-img-left",label:"Sección naranja - imagen izquierda",category:"Banners",media:Ri,content:Pe(!1)}],Vi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="5" rx="1" fill="#003B71"/>
    <rect x="12" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="22" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="11" width="28" height="17" rx="2" fill="#003B71" fill-opacity="0.08" stroke="#003B71" stroke-width="1"/>
    <rect x="5" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="14" width="4" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`,Te=`
.tabs-btn{transition:background 0.2s,color 0.2s;}
.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}
.tabs-panel{display:none;}
.tabs-panel.active{display:grid;}
.tab-card:hover{background:#003B71;}
.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}
.tab-card:hover .tab-card-title{color:#ffffff;}
.tab-card:hover .tab-card-text{color:#ffffff;}`;function Xi(){return function(){const i=this,e=".tabs-btn{transition:background 0.2s,color 0.2s;}.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}.tabs-panel{display:none;}.tabs-panel.active{display:grid;}.tab-card:hover{background:#003B71;}.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}.tab-card:hover .tab-card-title{color:#ffffff;}.tab-card:hover .tab-card-text{color:#ffffff;}";(function(){const r=i.ownerDocument??document;if(!r.getElementById("tabs-section-styles")){const l=r.createElement("style");l.id="tabs-section-styles",l.textContent=e,r.head.appendChild(l)}})();function t(a){i.querySelectorAll(".tabs-btn").forEach((r,l)=>{r.classList.toggle("active",l===a)}),i.querySelectorAll(".tabs-panel").forEach((r,l)=>{r.classList.toggle("active",l===a)})}i.querySelectorAll(".tabs-btn").forEach((a,r)=>{a.addEventListener("click",()=>t(r))}),t(0)}}const R=()=>`
<div class="tab-card flex flex-col items-center text-center p-8 border-2 border-[#003B71] rounded-2xl gap-4 cursor-pointer transition-all duration-200">
    <div class="tab-card-icon w-14 h-14 rounded-full border-2 border-[#003B71] flex items-center justify-center text-2xl text-[#003B71] shrink-0 transition-all duration-200">
        <i class="ri-lightbulb-line"></i>
    </div>
    <h3 class="tab-card-title text-lg font-bold text-[#003B71] transition-colors duration-200">Lorem ipsum</h3>
    <p class="tab-card-text text-base font-normal leading-relaxed text-[#003B71] transition-colors duration-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>`,te=i=>`
<div class="tabs-panel${i===0?" active":""} grid-cols-3 gap-5">
    ${R()}
    ${R()}
    ${R()}
    ${R()}
    ${R()}
    ${R()}
</div>`,Yi=`
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
<style>${Te}</style>`,Wi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="none" stroke="#003B71" stroke-width="2"/>
    <circle cx="16" cy="10" r="4" fill="none" stroke="#003B71" stroke-width="1.5"/>
    <rect x="8" y="17" width="16" height="2" rx="1" fill="#003B71"/>
    <rect x="6" y="22" width="20" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,Gi=[{id:"tabs-cards",label:"Sección con tabs",category:"Contenido",media:Vi,content:{type:"tabs-cards-component"}},{id:"tab-card-single",label:"Tarjeta de tab",category:"Contenido",media:Wi,content:`${R()}`}];function Ji(i){const e="tabs-cards-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección con tabs",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,attributes:{"data-gjs-type":e,"data-tab-count":"5"},components:Yi,script:Xi(),traits:[{type:"number",name:"data-tab-count",label:"Número de tabs (2-10)",min:2,max:10,changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",(t,a)=>{const r=parseInt(a["data-tab-count"]);isNaN(r)||this.updateTabCount(r)})},updateTabCount(t){const a=Math.min(10,Math.max(2,t)),r=l=>{const o=Array.from({length:l},()=>'<button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>').join(`
`),p=Array.from({length:l},(d,s)=>`<div class="tabs-panel${s===0?" active":""} grid-cols-3 gap-5">
                            ${R()}
                            ${R()}
                            ${R()}
                            ${R()}
                            ${R()}
                            ${R()}
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
                    <style>${Te}</style>`};this.components(r(a)),setTimeout(()=>{const l=this.get("script"),o=this.getEl();l&&typeof l=="function"&&o&&l.call(o)},200)}}}),Ki(i,e),Qi(i,e)}function Ki(i,e){i.on("component:mount",t=>{const a=t.getEl();a?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const r=t.get("script");r&&typeof r=="function"&&r.call(a)},300))}),i.on("component:clone",t=>{if(t.get("type")===e){const a=t.getEl();a&&setTimeout(()=>{const r=t.get("script");r&&typeof r=="function"&&r.call(a)},300)}}),i.on("storage:end:load",()=>{setTimeout(()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const a=t.getEl();if(a?.isConnected){const r=t.get("script");r&&typeof r=="function"&&r.call(a)}})},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function Qi(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const a=t.contentDocument?.head;if(a){if(!a.querySelector("#tabs-section-styles")){const r=document.createElement("style");r.id="tabs-section-styles",r.textContent=Te,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,a.appendChild(r)}}})}const Zi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ea=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ta=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ia=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Re=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="7" cy="10" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="8.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <circle cx="7" cy="22" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="20.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
</svg>`,W=i=>`
<div class="split-list-item flex items-center gap-3">
    <div class="bg-[#E97300] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
        <i class="ri-shield-check-line text-lg text-white"></i>
    </div>
    <p class="${i==="light"?"text-[#003B71]":"text-white"} text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`,aa=i=>{const e=i==="light";return`
<div class="flex flex-col gap-4">
    <h2 class="text-4xl font-bold leading-tight flex flex-wrap items-center gap-2">
        <span class="${e?"bg-[#003B71]":"bg-white"} ${e?"text-white":"text-[#003B71]"} text-3xl font-bold px-3 py-1 rounded-lg leading-tight">Mi</span>
        <span class="${e?"text-[#003B71]":"text-white"}">Banca</span>
        <span class="text-[#E97300]">Integral</span>
    </h2>
    <p class="${e?"text-[#003B71]":"text-white"} text-base leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-3">
        ${W(i)}
        ${W(i)}
        ${W(i)}
        ${W(i)}
    </div>
</div>`},ra=()=>`
<div class="w-full rounded-2xl overflow-hidden">
    <img src="${I("images/placeholder.svg")}"
         alt="Imagen de sección"
         class="w-full object-cover block rounded-2xl"
         style="min-height:320px;max-height:480px;">
</div>`,la=`
<style>
.split-section{width:100%;padding:3rem 4rem;}
.split-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.split-list-item{min-height:44px;}
@media(max-width:1280px){.split-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.split-section{padding:2.5rem 1.5rem;}.split-grid{grid-template-columns:1fr;gap:2rem;}}
</style>`,fe=(i,e)=>{const t=aa(e),a=ra(),r=e==="dark"?"bg-[#003B71]":"bg-white",l=i?`<div>${t}</div><div>${a}</div>`:`<div class="split-img-mobile-first">${a}</div><div>${t}</div>`;return`
<section class="split-section ${r}">
    <div class="split-grid">
        ${l}
    </div>
</section>
${la}`},oa=[{id:"split-content-light-img-right",label:"Contenido claro - imagen derecha",category:"Contenido",media:Zi,content:fe(!0,"light")},{id:"split-content-light-img-left",label:"Contenido claro - imagen izquierda",category:"Contenido",media:ea,content:fe(!1,"light")},{id:"split-content-dark-img-right",label:"Contenido azul - imagen derecha",category:"Contenido",media:ta,content:fe(!0,"dark")},{id:"split-content-dark-img-left",label:"Contenido azul - imagen izquierda",category:"Contenido",media:ia,content:fe(!1,"dark")},{id:"split-list-item",label:"Item de lista con badge",category:"Contenido",media:Re,content:W("light")},{id:"split-list-group",label:"Lista con badges",category:"Contenido",media:Re,content:`
<div class="flex flex-col gap-4">
    ${W("light")}
    ${W("light")}
    ${W("light")}
</div>`}],na=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="0" y="6" width="10" height="22" fill="white"/>
    <path d="M10 6 Q10 6 16 6 L16 28 Q10 28 10 22 Z" fill="#E97300"/>
    <circle cx="22" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="22" cy="14" r="1.5" fill="white"/>
    <rect x="18" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,sa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="22" y="6" width="10" height="22" fill="white"/>
    <path d="M22 6 Q16 6 16 6 L16 28 Q22 28 22 22 Z" fill="#E97300"/>
    <circle cx="10" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="10" cy="14" r="1.5" fill="white"/>
    <rect x="6" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="7" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,pe=`
<div class="flex flex-col items-center gap-3 text-center">
    <div class="w-14 h-14 rounded-full flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-1">
        <p class="text-lg font-bold text-white">Lorem ipsum</p>
        <p class="text-base text-white">Lorem ipsum dolor sit amet</p>
    </div>
</div>`,ca=`
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
</style>`,He=i=>`
<div class="ss-section">
    <div class="ss-curve-${i?"left":"right"}">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-white mb-3 leading-tight">Lorem ipsum dolor sit amet</h2>
            <p class="text-base text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="ss-grid">
            ${pe}
            ${pe}
            ${pe}
            ${pe}
        </div>
    </div>
</div>
${ca}`,da=[{id:"stats-strip-left",label:"Franja estadísticas - izquierda",category:"Heroes",media:na,content:He(!0)},{id:"stats-strip-right",label:"Franja estadísticas - derecha",category:"Heroes",media:sa,content:He(!1)}],fa=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,pa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#166EBE"/>
    <rect x="8" y="21" width="16" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="10" y="24.5" width="12" height="1.5" rx="0.75" fill="white" fill-opacity="0.5"/>
</svg>`,ie=`
<div class="flex flex-col items-center gap-4 text-center">
    <div class="w-20 h-20 rounded-full flex items-center justify-center shrink-0" style="background:#166EBE;">
        <img src="${I("images/placeholder.svg")}" alt="Icono" class="w-10 h-10 object-contain">
    </div>
    <h3 class="text-sm font-bold text-white uppercase leading-snug tracking-wide">Lorem ipsum dolor sit amet</h3>
</div>`,Fe=`
<style>
.svc-section{width:100%;background:#003B71;padding:3rem 4rem;}
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;margin-top:3rem;}
.svc-more-wrap{display:flex;justify-content:center;margin-top:3rem;}
.svc-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:9999px;background:#ffffff;color:#003B71;font-size:1rem;font-weight:600;text-decoration:none;transition:background 0.2s,color 0.2s;}
.svc-more-btn:hover{background:#dce8f5;}
@media(max-width:1280px){.svc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.svc-section{padding:2.5rem 1.5rem;}.svc-grid{grid-template-columns:repeat(2,1fr);gap:2rem;}}
@media(max-width:480px){.svc-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem;}}
</style>`,ha=[{id:"service-cards-section",label:"Sección de servicios con iconos",category:"Productos y Servicios",media:fa,content:`
<section class="svc-section">
    <div class="text-center">
        <h2 class="text-4xl font-bold text-white mb-4">Nos importa tu bienestar</h2>
        <p class="text-base text-white leading-relaxed">por eso este beneficio está disponible exclusivamente para quienes<br>mantienen su crédito al día con Banco Integral.</p>
    </div>
    <div class="svc-grid">
        ${ie}
        ${ie}
        ${ie}
        ${ie}
    </div>
    <div class="svc-more-wrap">
        <a href="#" class="svc-more-btn">Ver más</a>
    </div>
</section>
${Fe}`},{id:"service-card-item",label:"Ítem de servicio con icono",category:"Productos y Servicios",media:pa,content:`${ie}${Fe}`}],ga=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="9" width="30" height="14" fill="white" rx="7" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="4" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="13" width="6" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="10" y="16" width="5" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="17.5" y="12" width="0.8" height="8" rx="0.4" fill="#e5e7eb"/>
    <rect x="20" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="25.5" y="13" width="0" height="0" rx="0"/>
</svg>`,ma=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="2" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="5.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="5.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="8.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="3" y="18" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="21.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="21.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="24.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
</svg>`,ba=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="9" width="30" height="14" fill="white" rx="7" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="5" y="12" width="5" height="8" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="13" y="12" width="12" height="2.5" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="13" y="16" width="9" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.8"/>
</svg>`,ae=(i,e,t,a)=>`
<div class="ci-item">
    <i class="${i} ci-icon"></i>
    <div class="flex flex-col gap-0.5">
        <span class="text-sm font-bold uppercase tracking-wide text-[#003B71]">${e}</span>
        <a href="${a}" class="text-sm font-semibold text-[#E97300] no-underline hover:opacity-75 transition-opacity">${t}</a>
    </div>
</div>`,Ce=`
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
</style>`,ua=[{id:"contact-info-row",label:"Contacto en fila",category:"Contacto",media:ga,content:`
<section class="ci-section">
    <div class="ci-row-wrap">
        <div class="ci-pill-row">
            ${ae("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
            <div class="ci-divider"></div>
            ${ae("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com")}
        </div>
    </div>
</section>
${Ce}`},{id:"contact-info-col",label:"Contacto en columna",category:"Contacto",media:ma,content:`
<section class="ci-section">
    <div class="ci-col-wrap">
        <div class="ci-pill-col">
            ${ae("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
            <div class="ci-divider-h"></div>
            ${ae("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com")}
        </div>
    </div>
</section>
${Ce}`},{id:"contact-info-item",label:"Ítem de contacto",category:"Contacto",media:ba,content:`
<section class="ci-section">
    <div class="ci-row-wrap">
        <div class="ci-pill-row">
            ${ae("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
        </div>
    </div>
</section>
${Ce}`}],xa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="6" cy="8" r="2" fill="#F07C28"/>
    <rect x="10" y="7" width="16" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="10" y="11" width="14" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="10" y="13.5" width="12" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <circle cx="6" cy="19" r="2" fill="#F07C28"/>
    <rect x="10" y="18" width="16" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="10" y="22" width="14" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="10" y="24.5" width="12" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
</svg>`,ya=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="6" cy="14" r="2.5" fill="#F07C28"/>
    <rect x="11" y="12" width="15" height="2.5" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="11" y="17" width="13" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="11" y="20" width="10" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
</svg>`,re=`
<div class="rl-item">
    <div class="flex items-center gap-2 mb-1">
        <span class="rl-bullet">•</span>
        <span class="rl-item__title text-base font-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
    </div>
    <p class="rl-item__body text-base leading-relaxed">Nulla tincidunt nisi eu pellentesque fringilla. Proin tincidunt, dolor vitae pellentesque scelerisque, sapien augue lobortis orci, quis blandit magna enim a magna.</p>
</div>`,Ue=`
<style>
.rl-section{width:100%;padding:3rem 4rem;background:#ffffff;box-sizing:border-box;}
.rl-list{display:flex;flex-direction:column;gap:1.75rem;}
.rl-item__title{color:#F07C28;}
.rl-bullet{color:#F07C28;font-size:1.25rem;line-height:1;}
.rl-item__body{color:#003B71;}
@media(max-width:1280px){.rl-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.rl-section{padding:2.5rem 1.5rem;}}
</style>`,va=[{id:"rich-list",label:"Lista con título y descripción",category:"Contenido",media:xa,content:`
<section class="rl-section">
    <div class="rl-list">
        ${re}
        ${re}
        ${re}
        ${re}
    </div>
</section>
${Ue}`},{id:"rich-list-item",label:"Ítem de lista con descripción",category:"Contenido",media:ya,content:`
<section class="rl-section">
    <div class="rl-list">
        ${re}
    </div>
</section>
${Ue}`}],he=`
<style>
.pd-asymmetric-grid{display:grid;grid-template-columns:3fr 2fr;gap:2rem;align-items:start;}
@media(max-width:992px){.pd-asymmetric-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`,wa=`
<style>
.pd-three-col-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem;align-items:start;}
.pd-three-col-grid>div:last-child:nth-child(3n+1){grid-column:1/-1;max-width:33%;margin:0 auto;}
@media(max-width:992px){.pd-three-col-grid{gap:1.5rem;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:50%;}}
@media(max-width:640px){.pd-three-col-grid{grid-template-columns:1fr;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:none;}}
</style>`,ka=`
<style>
.pd-icons-cta-grid{display:grid;grid-template-columns:3fr 2fr;gap:2rem;align-items:center;}
@media(max-width:992px){.pd-icons-cta-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`,H=`
<style>
.pd-text-muted{color:#6b7280;}
.pd-dot-muted{background-color:#6b7280;}
.pd-btn-orange{background-color:#E97300;}
.pd-btn-orange:hover{background-color:#c96200;}
.pd-box-border{border-color:#003B71;}
.pd-text-primary{color:#003B71;}
.pd-text-orange{color:#E97300;}
.pd-box-divider{background-color:#E97300;}
</style>`,Ba=`
<style>
.pd-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
.pd-card{background:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;gap:0.75rem;}
@media(max-width:640px){.pd-cards-grid{grid-template-columns:1fr;}}
</style>`,Ea=`
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
</style>`,$a=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
    <rect x="2" y="4.5" width="20" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <circle cx="5" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="13" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <circle cx="21" cy="14" r="3.2" fill="#E97300" fill-opacity="0.8"/>
    <rect x="24" y="10" width="6" height="3" rx="1" fill="#E97300" fill-opacity="0.3"/>
    <rect x="24" y="15" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="24" y="17" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
    <rect x="2" y="26" width="28" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
    <rect x="2" y="28.5" width="18" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`,Sa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="13" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="5" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="3" y="14" width="4" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="3" y="15.5" width="3" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="9" y="9" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="12" cy="11.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="10" y="14" width="4" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="10" y="15.5" width="3" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="20" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="5" cy="22.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="3" y="25" width="4" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="3" y="26.5" width="3" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="9" y="20" width="6" height="9" rx="1" fill="none" stroke="#003B71" stroke-width="0.7" stroke-opacity="0.3"/>
    <circle cx="12" cy="22.5" r="1.5" fill="#E97300" fill-opacity="0.7"/>
    <rect x="10" y="25" width="4" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="10" y="26.5" width="3" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <rect x="18" y="2" width="12" height="3" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="18" y="7" width="12" height="2" rx="1" fill="#E97300" fill-opacity="0.4"/>
    <rect x="18" y="12" width="12" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.85"/>
    <rect x="18" y="17" width="12" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="18" y="19" width="10" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="18" y="22" width="12" height="1" rx="0.5" fill="#E97300" fill-opacity="0.6"/>
    <circle cx="19.5" cy="25.5" r="0.8" fill="#003B71" fill-opacity="0.4"/>
    <rect x="21" y="25" width="8" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
    <circle cx="19.5" cy="27.5" r="0.8" fill="#003B71" fill-opacity="0.4"/>
    <rect x="21" y="27" width="6" height="0.8" rx="0.4" fill="#003B71" fill-opacity="0.3"/>
</svg>`,Ca=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="20" height="3" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="2" y="6.5" width="14" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="3.5" cy="16" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="5.5" y="15.3" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="3.5" cy="19" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="5.5" y="18.3" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="13" y="11" width="9" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <circle cx="14.5" cy="16" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="16.5" y="15.3" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <circle cx="14.5" cy="19" r="1" fill="#003B71" fill-opacity="0.5"/>
    <rect x="16.5" y="18.3" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="24" y="2" width="6" height="6" rx="1" fill="none" stroke="#E97300" stroke-width="0.8" stroke-opacity="0.5"/>
    <rect x="24" y="11" width="6" height="3" rx="1.5" fill="#E97300" fill-opacity="0.85"/>
    <rect x="24" y="17" width="6" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="24" y="19" width="6" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
</svg>`,La=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="4" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
    <rect x="3" y="11" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="3" y="13" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="12" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="14" y="5" width="4" height="4" rx="2" fill="#E97300" fill-opacity="0.6"/>
    <rect x="13" y="11" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="13" y="13" width="5" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
    <rect x="22" y="3" width="8" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1"/>
    <rect x="23" y="6" width="6" height="1" rx="0.5" fill="#003B71" fill-opacity="0.5"/>
    <rect x="23" y="11" width="6" height="2" rx="1" fill="#E97300" fill-opacity="0.7"/>
    <rect x="23" y="16" width="6" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="23" y="18" width="5" height="0.8" rx="0.4" fill="#9ca3af" fill-opacity="0.5"/>
</svg>`,ge=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ja=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ta=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="6" cy="10" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="9" width="18" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <circle cx="6" cy="17" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="16" width="16" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <circle cx="6" cy="24" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="23" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,_a=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="5" width="26" height="1.5" rx="0.75" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="3" y="9" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="11.5" width="20" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="16" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="18.5" width="22" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="23" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="25.5" width="18" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
</svg>`,C=`
<li class="flex items-start gap-2 text-base text-[#003B71]">
    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#003B71] shrink-0"></span>
    <span>Lorem ipsum dolor sit amet consectetur adipiscing elit.</span>
</li>`,M=`
<p class="text-sm pd-text-muted leading-relaxed text-justify m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,Ve=`
<div class="w-full rounded-xl border-2 pd-box-border px-6 py-4 flex flex-col items-center justify-center gap-1 text-center">
    <span class="text-2xl font-bold pd-text-primary uppercase tracking-wide">Invierte desde:</span>
    <span class="text-2xl font-black pd-text-orange">$00.00</span>
</div>`,Xe=`
<div class="flex flex-col items-center justify-center gap-1 py-4 px-6">
    <span class="text-lg font-bold pd-text-primary uppercase tracking-wide leading-snug">Invierte desde:</span>
    <span class="text-lg font-bold pd-text-primary">Hasta: <span class="pd-text-orange">$00.00</span></span>
</div>`,Ye=`
<div class="w-full rounded-xl border-2 pd-box-border flex flex-col">
    ${Xe}
    <div class="px-6">
        <div class="w-full h-0.5 pd-box-divider"></div>
    </div>
    ${Xe}
</div>`,me=i=>`
<div class="pd-card items-center">
    <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${I("images/placeholder.svg")}" alt="" class="w-6 h-6 object-contain">
    </div>
    <span class="text-sm font-bold text-[#E97300] uppercase tracking-wide leading-snug w-full">  ${i}</span>
    <ul class="list-none p-0 m-0 flex flex-col gap-2 w-full">
        ${C}
        ${C}
        ${C}
    </ul>
</div>`,za=[{id:"product-detail-section",label:"Detalle de producto",category:"Productos y Servicios",media:ja,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Diseñado para empresarios que desean maximizar la rentabilidad de sus ahorros. Tasa de interés preferencial, con intereses capitalizados mensualmente.</p>
            <div class="flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-3">
                    ${C}
                    ${C}
                    ${C}
                    ${C}
                    ${C}
                </ul>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] break-words uppercase leading-tight text-center w-full">Ahorro Rentable</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            <div class="w-full flex flex-col gap-2 pt-3">
                ${M}
                ${M}
                ${M}
            </div>
        </div>
    </div>
</section>
${he}
${H}`},{id:"product-detail-cards-grid",label:"Detalle de producto con tarjetas",category:"Productos y Servicios",media:Sa,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg text-[#003B71] leading-snug m-0">Nos interesa la salud y bienestar de nuestros clientes, por eso te ofrecemos este servicio, disponible y exclusivo al contratar y mantener al día tu crédito.</p>
            <div class="pd-cards-grid">
                ${me("Cobertura para accidente")}
                ${me("Exámenes de laboratorio")}
                ${me("Medicamentos")}
                ${me("Consultas médicas")}
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] uppercase leading-tight text-center w-full break-words">Microseguro de Salud</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu servicio</a>
            <div class="w-full flex flex-col gap-2 pt-1">
                ${M}
                ${M}
            </div>
            <div class="w-full flex flex-col gap-3 pt-2">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-2">
                    ${C}
                    ${C}
                    ${C}
                    ${C}
                </ul>
            </div>
            <div class="w-full flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Condiciones:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-2">
                    ${C}
                    ${C}
                </ul>
            </div>
        </div>
    </div>
</section>
${he}
${Ba}
${H}`},{id:"product-detail-box",label:"Detalle de producto con cuadro de precio",category:"Productos y Servicios",media:ge,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Diseñado para empresarios que desean maximizar la rentabilidad de sus ahorros. Tasa de interés preferencial, con intereses capitalizados mensualmente.</p>
            <div class="flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-3">
                    ${C}
                    ${C}
                    ${C}
                    ${C}
                </ul>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] break-words uppercase leading-tight text-center w-full">Ahorro Rentable</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            ${Ve}
            <div class="w-full flex flex-col gap-2 pt-3">
                ${M}
                ${M}
                ${M}
            </div>
        </div>
    </div>
</section>
${he}
${H}`},{id:"product-detail-three-col",label:"Detalle de producto (3 columnas)",category:"Productos y Servicios",media:La,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-three-col-grid">
        <div class="flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${C}
                ${C}
                ${C}
            </ul>
        </div>
        <div class="flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Beneficios:</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${C}
                ${C}
                ${C}
            </ul>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] break-words uppercase leading-tight text-center w-full">Ahorro Rentable</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            <div class="w-full flex flex-col gap-2 pt-3">
                ${M}
                ${M}
                ${M}
            </div>
        </div>
    </div>
</section>
${wa}
${H}`},{id:"product-detail-header-grid",label:"Detalle de producto (encabezado + 2 columnas)",category:"Productos y Servicios",media:Ca,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-header-grid">
        <div class="pd-hg-intro">
            <p class="text-lg font-bold text-[#003B71] leading-snug m-0">Invierte en el futuro de tu negocio con financiamiento flexible, atención personalizada y el respaldo necesario para seguir creciendo.</p>
        </div>
        <div class="pd-hg-col1 flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${C}
                ${C}
                ${C}
                ${C}
            </ul>
        </div>
        <div class="pd-hg-col2 flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Requisitos</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${C}
                ${C}
            </ul>
        </div>
        <div class="pd-hg-action flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] break-words uppercase leading-tight text-center w-full">Credinvierte</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            <div class="w-full flex flex-col gap-2 pt-3">
                ${M}
                ${M}
                ${M}
            </div>
        </div>
    </div>
</section>
${Ea}
${H}`},{id:"product-detail-box-double",label:"Detalle de producto con cuadro de precio doble",category:"Productos y Servicios",media:ge,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Impulsa tu negocio con financiamiento ágil y flexible, diseñado para ayudarte a crecer, invertir y aprovechar nuevas oportunidades.</p>
            <p class="text-base font-bold text-[#E97300] uppercase leading-snug">Créditos para tu negocio, créditos sin garantía, crédito para cliente nuevo o recurrente; con experiencia crediticia.</p>
            <div class="flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-3">
                    ${C}
                    ${C}
                    ${C}
                    ${C}
                    ${C}
                    ${C}
                </ul>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] break-words uppercase leading-tight text-center w-full">Soluciones Integrales</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Solicita tu crédito</a>
            ${Ye}
            <div class="w-full flex flex-col gap-2 pt-3">
                ${M}
                ${M}
            </div>
        </div>
    </div>
</section>
${he}
${H}`},{id:"product-detail-bullet",label:"Ítem de ventaja",category:"Productos y Servicios",media:Ta,content:`
<ul class="list-none p-0 m-0 flex flex-col gap-3">
    ${C}
</ul>`},{id:"product-detail-footnote",label:"Nota al pie",category:"Productos y Servicios",media:_a,content:`
<div class="w-full flex flex-col gap-2">
    ${M}
</div>
${H}`},{id:"product-detail-price-box",label:"Cuadro de precio",category:"Productos y Servicios",media:ge,content:`
${Ve}
${H}`},{id:"product-detail-price-box-double",label:"Cuadro de precio doble",category:"Productos y Servicios",media:ge,content:`
${Ye}
${H}`},{id:"product-detail-icons-cta",label:"Detalle de producto con íconos y CTA",category:"Productos y Servicios",media:$a,content:`
<section class="w-full bg-white px-16 py-12 flex flex-col gap-8">
    <p class="text-base text-[#003B71] leading-relaxed m-0">Puedes pagar tus facturas, recibos y recargas de celular, en nuestras 27 agencias y más de 1000 puntos de pago distribuidos en todo el país, gracias a nuestro eficiente servicio de colecturía.</p>
    <div class="pd-icons-cta-grid">
        <div class="w-full">
            <img src="${I("images/placeholder.svg")}" alt="Servicios disponibles" class="w-full h-auto object-contain">
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] uppercase leading-tight text-center w-full break-words">Colecturía y Pagos</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu servicio</a>
        </div>
    </div>
    <p class="text-base text-[#003B71] leading-relaxed m-0">Para tu comodidad, también puedes realizar los pagos de tus créditos en la red Puntoxpress y Akí Pago, abierto en horarios extendidos, los 7 días de la semana.</p>
</section>
${ka}
${H}`}],We=`
<style>
.fc-cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;}
.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){grid-column:1/-1;max-width:25%;margin:0 auto;}
@media(max-width:992px){.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){max-width:50%;}}
@media(max-width:640px){.fc-cards-grid{grid-template-columns:1fr;}.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){max-width:none;}}
</style>`,Aa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#E97300" fill-opacity="0.8"/>
    <path d="M13 12a3 3 0 1 1 4 2.8V16h-2v-1.2a3 3 0 0 1-2-2.8z" fill="#ffffff"/>
    <rect x="14.5" y="17" width="3" height="1" fill="#ffffff"/>
    <rect x="6" y="22" width="20" height="4" rx="1" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="8" y="23.5" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
</svg>`,Ia=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,le=i=>`
<div class="fc-card flex flex-col items-center gap-4 bg-white rounded-xl shadow-lg p-6">
    <div class="w-16 h-16 rounded-full bg-[#E97300] flex items-center justify-center shrink-0 overflow-hidden">
        <img src="${I("images/placeholder.svg")}" alt="icono" class="w-10 h-10 object-contain" />
    </div>
    <p class="text-base text-[#003B71] text-center leading-relaxed m-0">${i}</p>
</div>`,Da=[{id:"financing-section",label:"Sección de financiamiento",category:"Productos y Servicios",media:Ia,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#E97300] shrink-0"></span>
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Subtitulo</span>
        </div>
        <p class="text-base text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div class="fc-cards-grid">
            ${le("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${le("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${le("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${le("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
        </div>
    </div>
</section>
${We}`},{id:"financing-card",label:"Tarjeta de financiamiento",category:"Productos y Servicios",media:Aa,content:`
<div class="fc-cards-grid">
    ${le("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
</div>
${We}`}],qa=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ma=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="2"/>
    <rect x="7" y="7" width="18" height="5" fill="#003B71" fill-opacity="0.1" rx="1"/>
    <rect x="7" y="14" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
    <rect x="7" y="17" width="18" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="7" y="19" width="14" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="7" y="23" width="18" height="3.5" rx="1.75" fill="#E97300" fill-opacity="0.8"/>
</svg>`,Ge=`
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
</style>`,oe=`
<div class="ng-card">
    <div class="ng-card-logo">
        <img src="${I("images/placeholder.svg")}" alt="Logo" class="ng-logo-img">
    </div>
    <div class="ng-card-body">
        <h3 class="ng-card-title">Título de la noticia o publicación</h3>
        <p class="ng-card-desc">Descripción breve del contenido de la noticia o publicación disponible para los usuarios.</p>
    </div>
    <a href="#" class="ng-btn" style="align-self:center;">LEER NOTICIA</a>
</div>`,Na=[{id:"news-grid-section",label:"Noticias y Publicaciones",category:"Contenido",media:qa,content:`
<section class="ng-section">
    <h2 class="ng-section-heading">Noticias y Publicaciones</h2>
    <div class="ng-grid">
        ${oe}
        ${oe}
        ${oe}
        ${oe}
    </div>
    <div class="ng-more-wrap">
        <a href="#" class="ng-more-btn">Ver más</a>
    </div>
</section>
${Ge}`},{id:"news-card",label:"Tarjeta de noticia",category:"Contenido",media:Ma,content:`${oe}${Ge}`}],Oa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="3" y="4" width="26" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="10" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="10" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="16" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="16" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="22" width="26" height="5" fill="#F07C28" rx="1"/>
</svg>`,Pa=`
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
`,Ra=[{id:"contact-form",label:"Formulario de contacto",category:"Formularios",media:Oa,content:`
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
${Pa}
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
<\/script>`}],Ha=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="6" rx="1" fill="#003B71"/>
    <rect x="2" y="10" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="17" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <rect x="2" y="24" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <line x1="11" y1="2" x2="11" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
    <line x1="21" y1="2" x2="21" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
</svg>`,ve={blue:{headerBg:"bg-[#003B71]",headerText:"text-white",subheaderBg:"bg-[#e8f0f8]",subheaderText:"text-[#003B71]",borderColor:"#003B71",rowEvenBg:"bg-[#f4f7fb]",rowOddBg:"bg-white",rowText:"text-[#003B71]",labelBg:"bg-[#e8f0f8]",labelText:"text-[#003B71]"},orange:{headerBg:"bg-[#E97300]",headerText:"text-white",subheaderBg:"bg-[#fef3e8]",subheaderText:"text-[#E97300]",borderColor:"#E97300",rowEvenBg:"bg-[#fff8f2]",rowOddBg:"bg-white",rowText:"text-[#003B71]",labelBg:"bg-[#fef3e8]",labelText:"text-[#E97300]"}};function st(i,e){const t=ve[e]||ve.blue;let a='<table class="w-full border-collapse font-[Poppins,sans-serif] table-fixed">';i.title?(a+=`<thead><tr>
            <th colspan="${i.cols}" class="p-3 align-middle text-center text-base font-bold ${t.headerBg} ${t.headerText}">
                ${i.title}
            </th>
        </tr>`,i.headers?.length&&(a+="<tr>",i.headers.forEach((o,p)=>{const d=p<i.headers.length-1?`border-r border-[${t.borderColor}]`:"";a+=`<th class="p-3 align-middle text-sm font-semibold ${t.subheaderBg} ${t.subheaderText} ${d} border-b border-[${t.borderColor}] text-${o.align||"center"}">${o.text||""}</th>`}),a+="</tr>"),a+="</thead>"):i.headers?.length&&(a+="<thead><tr>",i.headers.forEach((o,p)=>{const d=p<i.headers.length-1?`border-r border-[${t.borderColor}]`:"";a+=`<th class="p-3 align-middle text-sm font-semibold ${t.headerBg} ${t.headerText} ${d} border-b border-[${t.borderColor}] text-${o.align||"center"}">${o.text||""}</th>`}),a+="</tr></thead>"),a+="<tbody>";const r=i.rows.length,l={};return i.rows.forEach((o,p)=>{a+="<tr>";let d=0;o.forEach(s=>{for(;l[`${p}-${d}`];)d++;const c=s.colspan||1,x=s.rowspan||1;for(let v=p;v<p+x;v++)for(let L=d;L<d+c;L++)(v!==p||L!==d)&&(l[`${v}-${L}`]=!0);const b=c>1?`colspan="${c}"`:"",u=x>1?`rowspan="${x}"`:"",g=s.isHeader?t.labelBg:p%2===0?t.rowEvenBg:t.rowOddBg,B=s.isHeader?"font-semibold":"font-normal",T=s.isHeader?t.labelText:t.rowText,m=`text-${s.align||"center"}`,k=p+x>=r,f=d+c>=i.cols?"":`border-r border-[${t.borderColor}]`,y=k?"":`border-b border-[${t.borderColor}]`,E=`${f} ${y} p-3 align-middle text-sm ${g} ${B} ${T} ${m}`;s.image?a+=`<td ${b} ${u} class="${E}">
                    <img src="${s.image}" alt="${s.text||""}" class="max-w-full max-h-20 h-auto object-contain block mx-auto">
                    ${s.text?`<span class="block mt-1 text-xs ${T}">${s.text}</span>`:""}
                </td>`:a+=`<td ${b} ${u} class="${E}">${s.text||""}</td>`,d+=c}),a+="</tr>"}),a+="</tbody></table>",a}function G(i,e){return{title:"Título de la tabla",cols:i,headers:Array.from({length:i},(t,a)=>({text:`Columna ${a+1}`,align:"center"})),rows:Array.from({length:e},()=>Array.from({length:i},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})))}}function ct(i,e){return`<div class="w-full overflow-x-auto rounded-2xl border-2 border-[${(ve[e]||ve.blue).borderColor}]">${i}</div>`}function Je(i,e){const t={};return i.forEach((a,r)=>{let l=0;a.forEach(o=>{for(;t[`${r}-${l}`];)l++;const p=Math.min(o.colspan||1,e-l),d=o.rowspan||1;for(let s=r;s<r+d;s++)for(let c=l;c<l+p;c++)(s!==r||c!==l)&&(t[`${s}-${c}`]=`${r}-${l}`);l+=p})}),t}const Fa=`
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
.tam-img-selected-info{font-size:0.8rem;color:#6b7280;}`;function Ua(){if(document.getElementById("tam-img-modal"))return;const i=document.createElement("div");i.id="tam-img-modal",i.innerHTML=`
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
        </div>`,document.body.appendChild(i);let e=null,t=null;async function a(p=""){const d=document.getElementById("tam-img-grid");d.innerHTML='<div class="tam-img-loading"><div class="tam-img-spinner"></div><span>Cargando...</span></div>';try{const s=new URLSearchParams({type:"image",per_page:50});p&&s.append("search",p);const c=document.querySelector('meta[name="media-api-url"]')?.content??"/media/api",u=(await(await fetch(`${c}?${s}`,{headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}})).json()).items||[];if(!u.length){d.innerHTML='<div class="tam-img-loading"><i class="ri-image-line" style="font-size:2rem;"></i><span>No se encontraron imágenes</span></div>';return}d.innerHTML="",u.forEach(g=>{const B=document.createElement("div");B.className="tam-img-card",B.innerHTML=`<img src="${g.url}" alt="${g.filename}"><p title="${g.filename}">${g.filename}</p>`,B.addEventListener("click",()=>{d.querySelectorAll(".tam-img-card").forEach(T=>T.classList.remove("selected")),B.classList.add("selected"),e=g.url,document.getElementById("tam-img-selected-info").textContent=`Seleccionada: ${g.filename}`,document.getElementById("tam-img-confirm").disabled=!1}),d.appendChild(B)})}catch{d.innerHTML='<div class="tam-img-loading"><i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i><span style="color:#dc2626;">Error al cargar imágenes</span></div>'}}function r(p){t=p,e=null,document.getElementById("tam-img-selected-info").textContent="Ninguna imagen seleccionada",document.getElementById("tam-img-confirm").disabled=!0,document.getElementById("tam-img-search-input").value="",i.classList.add("open"),a()}function l(){i.classList.remove("open"),e=null,t=null}document.getElementById("tam-img-close").addEventListener("click",l),document.getElementById("tam-img-cancel").addEventListener("click",l),document.getElementById("tam-img-confirm").addEventListener("click",()=>{e&&t&&(t(e),l())});let o;document.getElementById("tam-img-search-input").addEventListener("input",p=>{clearTimeout(o),o=setTimeout(()=>a(p.target.value),300)}),i.addEventListener("click",p=>{p.target===i&&l()}),window.__openTableImagePicker=r}function Va(i,e){if(document.getElementById("table-admin-modal"))return;const t=document.createElement("style");t.id="table-admin-modal-styles",t.textContent=Fa,document.head.appendChild(t),Ua();const a=document.createElement("div");a.id="table-admin-modal",a.innerHTML=`
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
        </div>`,document.body.appendChild(a);let r=null,l=null;function o(b){r=b;const u=b.get("tableData");l=u?JSON.parse(JSON.stringify(u)):G(3,3);const g=l.cols||3;l.rows=l.rows.map((B,T)=>Array.from({length:g},(k,h)=>B[h]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})),document.getElementById("tam-title").value=l.title||"",document.getElementById("tam-theme").value=b.get("tableTheme")||"blue",document.getElementById("tam-cols").value=l.cols||3,document.getElementById("tam-rows").value=l.rows.length||3,c(),x(),a.classList.add("open"),document.body.style.overflow="hidden"}function p(){a.classList.remove("open"),document.body.style.overflow="",r=null}function d(){l.title=document.getElementById("tam-title").value.trim(),l.cols=parseInt(document.getElementById("tam-cols").value)||3,l.headers=Array.from(document.querySelectorAll(".tam-header-input")).map(u=>({text:u.value,align:u.closest("th")?.querySelector(".tam-align-select")?.value||"center"})),document.querySelectorAll("#tam-tbody td.tam-cell:not(.is-spanned)").forEach(u=>{const g=parseInt(u.dataset.row),B=parseInt(u.dataset.col);l.rows[g]?.[B]&&(l.rows[g][B].text=u.querySelector(".tam-cell-input")?.value||"",l.rows[g][B].align=u.querySelector(".tam-align-select")?.value||"center",l.rows[g][B].isHeader=u.dataset.isheader==="1",l.rows[g][B].image=u.dataset.image||null)});const b=Je(l.rows,l.cols);l.rows=l.rows.map((u,g)=>u.filter((B,T)=>!b[`${g}-${T}`]))}function s(){if(a.querySelector("#tam-rebuild-notice"))return;const u=document.createElement("div");u.id="tam-rebuild-notice",u.style.cssText="background:#fef9c3;border:1.5px solid #ca8a04;border-radius:0.5rem;padding:0.5rem 1rem;font-size:0.8rem;color:#92400e;display:flex;align-items:center;gap:0.5rem;margin:0 1.5rem 0;flex-shrink:0;",u.innerHTML='<i class="ri-error-warning-line"></i> Has modificado el colspan/rowspan. Haz clic en <strong style="margin:0 4px;">Reconstruir</strong> para aplicar los cambios de fusión.',a.querySelector(".tam-toolbar").after(u)}function c(){a.querySelector("#tam-rebuild-notice")?.remove()}function x(){const b=document.getElementById("tam-thead"),u=document.getElementById("tam-tbody"),g=l.cols,B=l.rows.length,T=Je(l.rows,g);b.innerHTML=`<tr>${l.headers.map((m,k)=>`
            <th>
                <input class="tam-cell-input tam-header-input" value="${m.text||""}" placeholder="Col ${k+1}" style="font-weight:600;">
                <select class="tam-align-select" style="margin-top:4px;width:100%;font-size:0.7rem;padding:2px;">
                    <option value="left" ${m.align==="left"?"selected":""}>Izquierda</option>
                    <option value="center" ${m.align==="center"?"selected":""}>Centro</option>
                    <option value="right" ${m.align==="right"?"selected":""}>Derecha</option>
                </select>
            </th>`).join("")}</tr>`,u.innerHTML=l.rows.map((m,k)=>`<tr>${Array.from({length:g},(f,y)=>{const E=T[`${k}-${y}`];if(E)return`<td class="tam-cell is-spanned" data-row="${k}" data-col="${y}">
                        <div class="tam-spanned-label">Combinada con [${E}]</div>
                    </td>`;const v=m[y]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null},L=v.colspan||1,_=v.rowspan||1,S=L>1||_>1;return`<td class="tam-cell ${v.isHeader?"is-header-cell":""} ${v.image?"has-image":""} ${S?"has-span":""}"
                    data-row="${k}" data-col="${y}"
                    data-isheader="${v.isHeader?"1":"0"}"
                    data-colspan="${L}"
                    data-rowspan="${_}"
                    data-image="${v.image||""}">
                    ${v.image?`<img class="tam-cell-img-preview" src="${v.image}" alt="">`:""}
                    <textarea class="tam-cell-input" placeholder="Texto...">${v.text||""}</textarea>
                    <select class="tam-align-select" style="width:100%;font-size:0.7rem;padding:2px;margin-top:4px;">
                        <option value="left" ${v.align==="left"?"selected":""}>Izquierda</option>
                        <option value="center" ${v.align==="center"?"selected":""}>Centro</option>
                        <option value="right" ${v.align==="right"?"selected":""}>Derecha</option>
                    </select>
                    <div class="tam-cell-actions">
                        <button type="button" class="tam-cell-btn tam-cell-btn-header ${v.isHeader?"active":""}"
                            data-action="header" data-row="${k}" data-col="${y}">
                            ${v.isHeader?"✓ Etiqueta":"Etiqueta"}
                        </button>
                        <button type="button" class="tam-cell-btn tam-cell-btn-img"
                            data-action="image" data-row="${k}" data-col="${y}">
                            <i class="ri-image-line"></i> ${v.image?"Cambiar":"Imagen"}
                        </button>
                        ${v.image?`<button type="button" class="tam-cell-btn tam-cell-btn-clear" data-action="clear-image" data-row="${k}" data-col="${y}">✕ Quitar</button>`:""}
                        <div class="tam-cell-span-group">
                            <label title="Columnas que ocupa">CS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${g-y}"
                                value="${L}" data-action="colspan" data-row="${k}" data-col="${y}">
                            <label title="Filas que ocupa">RS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${B-k}"
                                value="${_}" data-action="rowspan" data-row="${k}" data-col="${y}">
                        </div>
                    </div>
                </td>`}).join("")}</tr>`).join(""),u.querySelectorAll("input[data-action=colspan], input[data-action=rowspan]").forEach(m=>{m.addEventListener("change",()=>{const k=parseInt(m.dataset.row),h=parseInt(m.dataset.col),f=Math.max(1,parseInt(m.value)||1);l.rows[k]?.[h]&&(m.dataset.action==="colspan"?l.rows[k][h].colspan=Math.min(f,g-h):l.rows[k][h].rowspan=Math.min(f,B-k),s())})}),u.querySelectorAll("button[data-action]").forEach(m=>{m.addEventListener("click",k=>{k.preventDefault(),k.stopPropagation();const h=m.dataset.action,f=parseInt(m.dataset.row),y=parseInt(m.dataset.col);if(!(isNaN(f)||isNaN(y)||!l.rows[f]?.[y])){if(h==="header"){l.rows[f][y].isHeader=!l.rows[f][y].isHeader;const E=u.querySelector(`td[data-row="${f}"][data-col="${y}"]`);E&&(E.dataset.isheader=l.rows[f][y].isHeader?"1":"0",E.classList.toggle("is-header-cell",l.rows[f][y].isHeader)),m.classList.toggle("active",l.rows[f][y].isHeader),m.textContent=l.rows[f][y].isHeader?"✓ Etiqueta":"Etiqueta";return}if(h==="image"){window.__openTableImagePicker&&window.__openTableImagePicker(E=>{l.rows[f][y].image=E;const v=u.querySelector(`td[data-row="${f}"][data-col="${y}"]`);if(v){v.dataset.image=E,v.classList.add("has-image");let L=v.querySelector(".tam-cell-img-preview");L||(L=document.createElement("img"),L.className="tam-cell-img-preview",v.insertBefore(L,v.firstChild)),L.src=E;const _=v.querySelector("[data-action=image]");if(_&&(_.innerHTML='<i class="ri-image-line"></i> Cambiar'),!v.querySelector("[data-action=clear-image]")){const S=document.createElement("button");S.type="button",S.className="tam-cell-btn tam-cell-btn-clear",S.dataset.action="clear-image",S.dataset.row=f,S.dataset.col=y,S.textContent="✕ Quitar",S.addEventListener("click",A=>{A.preventDefault(),A.stopPropagation(),l.rows[f][y].image=null,v.dataset.image="",v.classList.remove("has-image"),L.remove(),S.remove();const D=v.querySelector("[data-action=image]");D&&(D.innerHTML='<i class="ri-image-line"></i> Imagen')}),v.querySelector(".tam-cell-actions").appendChild(S)}}});return}h==="clear-image"&&(l.rows[f][y].image=null,x())}})})}document.getElementById("tam-close").addEventListener("click",p),document.getElementById("tam-cancel").addEventListener("click",p),a.addEventListener("click",b=>{b.target===a&&p()}),document.getElementById("tam-rebuild").addEventListener("click",()=>{const b=parseInt(document.getElementById("tam-cols").value)||3,u=parseInt(document.getElementById("tam-rows").value)||3;for(c(),d();l.headers.length<b;)l.headers.push({text:`Col ${l.headers.length+1}`,align:"center"});for(l.headers=l.headers.slice(0,b),l.cols=b;l.rows.length<u;)l.rows.push(Array.from({length:b},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})));l.rows=l.rows.slice(0,u).map(g=>{for(;g.length<b;)g.push({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null});return g.slice(0,b)}),x()}),document.getElementById("tam-apply").addEventListener("click",()=>{d();const b=document.getElementById("tam-theme").value;r&&(r.set("tableData",JSON.parse(JSON.stringify(l))),r.set("tableTheme",b),r.addAttributes({"data-table-theme":b}),Le(r)),p()}),window.__openTableAdminModal=o}function Le(i){const e=i.get("tableData"),t=i.get("tableTheme")||"blue";e&&i.components(ct(st(e,t),t))}function Xa(){return function(){}}const Ya=[{id:"table-blue",label:"Tabla azul",category:"Interactivos",media:Ha,content:{type:"table-component",attributes:{"data-table-theme":"blue"}}},{id:"table-orange",label:"Tabla naranja",category:"Interactivos",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="6" rx="1" fill="#E97300"/>
            <rect x="2" y="10" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.3"/>
            <rect x="2" y="17" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
            <rect x="2" y="24" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
        </svg>`,content:{type:"table-component",attributes:{"data-table-theme":"orange"}}}];function Wa(i){const e="table-component";Va(),i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Tabla",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,propagate:["editable","selectable","hoverable","droppable","highlightable"],tableData:null,tableTheme:"blue",attributes:{"data-gjs-type":e,"data-table-theme":"blue"},components:ct(st(G(3,3),"blue"),"blue"),script:Xa(),traits:[{type:"button",name:"edit-table",label:"Editar tabla",text:"Abrir editor de tabla",command(t){const a=t.getSelected();a&&window.__openTableAdminModal&&(a.get("tableData")||a.set("tableData",G(3,3)),window.__openTableAdminModal(a))}},{type:"select",name:"data-table-theme",label:"Color del tema",options:[{id:"blue",name:"Azul"},{id:"orange",name:"Naranja"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e});const t=this.getAttributes()["data-table-theme"]||"blue";this.set("tableTheme",t),this.get("tableData")||(this.set("tableData",G(3,3)),Le(this)),this.on("change:attributes",(a,r)=>{const l=r["data-table-theme"];l&&l!==this.get("tableTheme")&&(this.set("tableTheme",l),Le(this))})}}}),Ga(i,e),Ja(i,e)}function Ga(i,e){i.on("component:mount",t=>{const a=t.getEl();if(a?.getAttribute?.("data-gjs-type")===e){t.set("type",e);const r=a.getAttribute("data-table-theme")||"blue";t.set("tableTheme",r),t.get("tableData")||t.set("tableData",G(3,3))}}),i.on("storage:end:load",()=>{setTimeout(()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const a=t.getAttributes()["data-table-theme"]||"blue";t.set("tableTheme",a),t.get("tableData")||t.set("tableData",G(3,3))})},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function Ja(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const a=t.contentDocument?.head;if(a&&!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,a.appendChild(r)}})}const Ka=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#003B71"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#003B71"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#003B71" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Qa=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#E97300"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#E97300"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#E97300" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Za=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#003B71"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,er=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#E97300"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,tr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#003B71"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,ir=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#E97300"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,ar=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,rr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,lr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#ffffff"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.5"/>
</svg>`,or=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,Ke=i=>{const e=i==="#003B71"?"blue":"orange";return`
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
</div>`},Qe=i=>{const e=i==="#003B71"?"blue":"orange";return`
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
</div>`},Ze={"button-fill-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-[#003B71] text-white transition-all duration-200 hover:bg-[#002a52] hover:border-[#002a52]","button-fill-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-[#E97300] text-white transition-all duration-200 hover:bg-[#c96200] hover:border-[#c96200]","button-outline-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-transparent text-[#003B71] transition-all duration-200 hover:bg-[#003B71] hover:text-white","button-outline-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-transparent text-[#E97300] transition-all duration-200 hover:bg-[#E97300] hover:text-white","button-fill-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-white text-[#003B71] transition-all duration-200 hover:bg-[#dce8f5] hover:border-[#dce8f5]","button-outline-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-transparent text-white transition-all duration-200 hover:bg-white hover:text-[#003B71]"},nr=[{id:"button-fill-blue",label:"Botón azul sólido",category:"Botones",media:tr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-blue"}}},{id:"button-fill-orange",label:"Botón naranja sólido",category:"Botones",media:ir,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-orange"}}},{id:"button-outline-blue",label:"Botón azul outline",category:"Botones",media:ar,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-blue"}}},{id:"button-outline-orange",label:"Botón naranja outline",category:"Botones",media:rr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-orange"}}},{id:"button-fill-white",label:"Botón blanco sólido",category:"Botones",media:lr,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-white"}}},{id:"button-outline-white",label:"Botón blanco outline",category:"Botones",media:or,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-white"}}},{id:"button-download-full-blue",label:"Descarga completa azul",category:"Botones",media:Ka,content:Ke("#003B71")},{id:"button-download-full-orange",label:"Descarga completa naranja",category:"Botones",media:Qa,content:Ke("#E97300")},{id:"button-download-simple-blue",label:"Descarga simple azul",category:"Botones",media:Za,content:Qe("#003B71")},{id:"button-download-simple-orange",label:"Descarga simple naranja",category:"Botones",media:er,content:Qe("#E97300")}];function sr(i){const e=[{type:"button",label:"Documento",name:"select-document",text:"Seleccionar documento",full:!0,command:"open-document-picker"},{type:"text",name:"href",label:"URL / Enlace",placeholder:"https://..."},{type:"select",name:"target",label:"Abrir en",options:[{id:"_self",name:"Misma ventana"},{id:"_blank",name:"Nueva ventana"}]}];i.DomComponents.addType("link",{model:{defaults:{traits:e}}}),i.DomComponents.addType("integral-button",{isComponent:r=>r.tagName==="A"&&r.hasAttribute("data-btn-variant"),model:{defaults:{tagName:"a",draggable:!0,droppable:!1,editable:!0,attributes:{href:"#",target:"_self","data-btn-variant":"button-fill-blue"},components:"Texto del botón",traits:e},init(){const r=this.getAttributes()["data-btn-variant"]??"button-fill-blue",l=Ze[r]??Ze["button-fill-blue"];this.setClass(l.split(" "))}}});function t(r,l){if(r.getEl()?.matches?.(l))return r;let p=null;const d=r.components?.();return d?(d.each(s=>{p||(p=t(s,l))}),p):null}function a(r,l){const p={pdf:"ri-file-pdf-line",xlsx:"ri-file-excel-line",xls:"ri-file-excel-line",doc:"ri-file-word-line",docx:"ri-file-word-line"}[l]??"ri-file-line";function d(c){const x=c.getEl?.();if(x?.tagName==="I"){const g=x.parentElement;if(g&&[...g.classList].some(B=>B.includes("-icon")))return c}let b=null;const u=c.components?.();return u?(u.each(g=>{b||(b=d(g))}),b):null}const s=d(r);if(s){const c=s.getClasses().find(x=>x.startsWith("ri-"));c&&s.removeClass(c),s.addClass(p)}else{const x=r.getEl()?.querySelector("[class*='-icon'] i");if(x){const b=[...x.classList].filter(u=>!u.startsWith("ri-"));x.className=[...b,p].join(" ")}}}i.Commands.add("open-document-picker",{run(r){const l=r.getSelected();if(l){if(r._documentPicker)try{r._documentPicker.destroy()}catch{}r._documentPicker=new mt,r._documentPicker.open(o=>{const p=o.filename.split(".").pop().toLowerCase();l.addAttributes({href:o.url});const d=l.getTrait("href");d&&d.set("value",o.url);const s=t(l,"[class*='-filename']");s&&s.components(o.filename),a(l,p)},{filters:{type:"document"}})}}})}const cr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,dr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,fr=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,pr=[{id:"badge-outline-blue",label:"Badge azul outline",category:"Badges",media:cr,content:'<span class="inline-block border border-[#003B71] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#003B71]">Etiqueta</span>'},{id:"badge-outline-orange",label:"Badge naranja outline",category:"Badges",media:dr,content:'<span class="inline-block border border-[#E97300] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#E97300]">Etiqueta</span>'},{id:"badge-outline-white",label:"Badge blanco outline",category:"Badges",media:fr,content:'<span class="inline-block border border-white rounded-full px-4 py-1 text-base font-medium bg-transparent text-white">Etiqueta</span>'}],hr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <path d="M16 4c-4.4 0-8 3.6-8 8 0 6 8 16 8 16s8-10 8-16c0-4.4-3.6-8-8-8z" fill="#E97300"/>
    <circle cx="16" cy="12" r="3.2" fill="#ffffff"/>
    <rect x="3" y="26" width="26" height="2" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`,_e=`
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
}`;function gr(i){return String(i??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}const be='data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"';function dt(i,e){return e=e||"mp"+Math.random().toString(36).slice(2,7),`<section id="mp-root-${e}" class="mp-section" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <p class="mp-stats" data-mp-stats ${be}>Cargando disponibilidad de agencias y puntos de pago...</p>
        <h2 class="mp-title" ${be}>${gr(i.title||"Horarios y Agencias:")}</h2>
        <div class="mp-filters" data-mp-filters ${be}>
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
        <div class="mp-map-wrapper" data-mp-map-wrapper ${be}>
            <div class="mp-map" data-mp-map></div>
            <div class="mp-map-overlay" data-mp-overlay></div>
        </div>
    </section>`}const je={title:"Horarios y Agencias:"};function mr(){return function(){const i=this,e=i.ownerDocument??document,t=".mp-section{width:100%;background:#ffffff;padding:3.5rem 4rem;font-family:'Poppins',sans-serif;}.mp-stats{font-size:1.125rem;font-weight:700;color:#003B71;margin:0 0 1.75rem;line-height:1.5;}.mp-stats .mp-num{color:#E97300;}.mp-title{font-size:1.75rem;font-weight:800;color:#E97300;margin:0 0 1.5rem;}.mp-filters{display:grid;grid-template-columns:repeat(3,1fr);gap:2.5rem;margin-bottom:2rem;position:relative;z-index:30;}.mp-filter{position:relative;}.mp-filter-btn{display:flex;align-items:center;justify-content:space-between;width:100%;background:none;border:none;border-bottom:2px solid #E97300;padding:0.5rem 0.25rem 0.625rem;cursor:pointer;font-family:inherit;}.mp-filter-label{font-size:0.9375rem;font-weight:700;color:#003B71;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.mp-filter-arrow{color:#003B71;font-size:0.75rem;transition:transform 0.2s ease;flex-shrink:0;margin-left:0.75rem;}.mp-filter.mp-filter-open .mp-filter-arrow{transform:rotate(180deg);}.mp-filter-dropdown{display:none;position:absolute;top:calc(100% + 0.625rem);left:0;right:0;background:#ffffff;border-radius:0.5rem;box-shadow:0 14px 36px rgba(0,0,0,0.2);overflow:hidden;max-height:260px;overflow-y:auto;}.mp-filter.mp-filter-open .mp-filter-dropdown{display:block;}.mp-filter-option{display:block;width:100%;text-align:center;padding:0.75rem 1rem;background:none;border:none;border-bottom:2px solid #E97300;font-size:0.875rem;font-weight:700;color:#003B71;cursor:pointer;font-family:inherit;transition:background 0.15s;}.mp-filter-option:last-child{border-bottom:none;}.mp-filter-option:hover{background:#f8fafc;}.mp-filter-option:disabled{opacity:0.5;cursor:default;pointer-events:none;}.mp-map-wrapper{position:relative;width:100%;height:440px;border-radius:0.5rem;overflow:hidden;}.mp-map{width:100%;height:100%;z-index:1;}.mp-map-overlay{position:absolute;inset:0;background:rgba(0,59,113,0.4);opacity:0;pointer-events:none;transition:opacity 0.2s ease;z-index:20;}.mp-map-overlay.mp-overlay-active{opacity:1;}.mp-pin{background:transparent!important;border:none!important;}.mp-popup{font-family:'Poppins',sans-serif;min-width:180px;}.mp-popup-name{margin:0 0 0.375rem;font-size:0.875rem;font-weight:700;color:#003B71;}.mp-popup-line{margin:0 0 0.25rem;font-size:0.8125rem;color:#475569;display:flex;align-items:flex-start;gap:0.375rem;line-height:1.4;}.mp-popup-line i{color:#E97300;margin-top:0.125rem;}.mp-popup-line:last-child{margin-bottom:0;}@media(max-width:1280px){.mp-section{padding:3rem 2.5rem;}}@media(max-width:992px){.mp-section{padding:2.5rem 1.5rem;}.mp-filters{grid-template-columns:1fr;gap:1.25rem;}.mp-map-wrapper{height:320px;}}";if(!e.getElementById("mp-filter-styles")){const n=e.createElement("style");n.id="mp-filter-styles",n.textContent=t,e.head.appendChild(n)}const a=i.querySelector("[data-mp-filters]"),r=i.querySelector("[data-mp-overlay]"),l=i.querySelector("[data-mp-map]"),o=i.querySelector("[data-mp-stats]");if(!a||!l)return;const p=[13.7942,-88.8965],d=8,s={departments:[],agencies:[],paymentPoints:[],type:null,department:null,pointKey:null};let c=null,x=null,b=null;function u(){a.querySelectorAll(".mp-filter.mp-filter-open").forEach(n=>n.classList.remove("mp-filter-open")),r&&r.classList.remove("mp-overlay-active")}function g(n){return String(n??"").replace(/[&<>"']/g,w=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[w])}function B(n){return g(n).replace(/\*\*(.+?)\*\*/g,'<span class="mp-num">$1</span>')}function T(n){if(!o)return;if(!n){o.textContent="No fue posible cargar la disponibilidad de agencias y puntos de pago.";return}const w=s.agencies.length,$=s.paymentPoints.length,z=`**${w}** agencias y **${$}** puntos de pago activos distribuidos en todo el país.`;o.innerHTML=B(z)}function m(n){return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 42" width="30" height="42"><path d="M15 0C6.7 0 0 6.7 0 15c0 11.3 15 27 15 27s15-15.7 15-27C30 6.7 23.3 0 15 0z" fill="${n}"/><circle cx="15" cy="14" r="5.5" fill="#ffffff"/></svg>`}function k(n){return b.divIcon({className:"mp-pin",html:m(n),iconSize:[30,42],iconAnchor:[15,42],popupAnchor:[0,-38]})}function h(n){const w=[`<div class="mp-popup"><p class="mp-popup-name">${g(n.name)}</p>`];return n.address&&w.push(`<p class="mp-popup-line"><i class="ri-map-pin-2-line"></i> ${g(n.address)}</p>`),n.type==="agency"&&n.schedule&&w.push(`<p class="mp-popup-line"><i class="ri-time-line"></i> ${g(n.schedule)}</p>`),n.type==="payment_point"&&n.correspondent&&w.push(`<p class="mp-popup-line"><i class="ri-store-2-line"></i> ${g(n.correspondent)}</p>`),w.push("</div>"),w.join("")}function f(){return[...s.agencies,...s.paymentPoints]}function y(){return f().filter(n=>!(s.type&&n.type!==s.type||s.department&&n.department!==s.department))}function E(){!x||!b||(x.clearLayers(),y().forEach(n=>{const w=n.type==="agency"?"#E97300":"#003B71",$=b.marker([n.lat,n.lng],{icon:k(w)});$.bindPopup(h(n)),$.__mpKey=`${n.type}-${n.id}`,x.addLayer($)}))}function v(){c&&c.flyTo(p,d)}function L(){const n=s.departments.find(w=>w.name===s.department);c&&n&&n.lat&&n.lng&&c.flyTo([n.lat,n.lng],n.zoom||11)}function _(){if(!c||!x)return;let n=null;x.eachLayer(w=>{w.__mpKey===s.pointKey&&(n=w)}),n&&(c.flyTo(n.getLatLng(),17),setTimeout(()=>n.openPopup(),350))}function S(){E(),s.pointKey?_():s.department?L():v()}function A(){const n=a.querySelector('[data-filter-index="2"] .mp-filter-dropdown'),w=a.querySelector('[data-filter-label="2"]');if(!n)return;const $=y(),z=['<button type="button" class="mp-filter-option" data-point-key="">Todas</button>'].concat($.map(P=>`<button type="button" class="mp-filter-option" data-point-key="${P.type}-${P.id}">${g(P.name)}</button>`)).join("");n.innerHTML=z,s.pointKey=null,w&&(w.textContent="Seleccione una ubicación"),n.querySelectorAll(".mp-filter-option").forEach(P=>{P.addEventListener("click",()=>{const V=P.dataset.pointKey||"";s.pointKey=V||null,w&&(w.textContent=P.textContent),u(),S()})})}function D(){const n=a.querySelector('[data-filter-index="1"] .mp-filter-dropdown');if(!n)return;const w=['<button type="button" class="mp-filter-option" data-dept="">Todos los departamentos</button>'].concat(s.departments.map($=>`<button type="button" class="mp-filter-option" data-dept="${g($.name)}">${g($.name)}</button>`)).join("");n.innerHTML=w,n.querySelectorAll(".mp-filter-option").forEach($=>{$.addEventListener("click",()=>{s.department=$.dataset.dept||null;const z=a.querySelector('[data-filter-label="1"]');z&&(z.textContent=$.textContent),u(),A(),S()})})}function O(){const n=a.querySelector('[data-filter-index="0"] .mp-filter-dropdown');n&&n.querySelectorAll(".mp-filter-option").forEach(w=>{w.addEventListener("click",()=>{s.type=w.dataset.type||null;const $=a.querySelector('[data-filter-label="0"]');$&&($.textContent=w.textContent),u(),A(),S()})})}a.__mpBound||(a.__mpBound=!0,a.querySelectorAll("[data-filter-toggle]").forEach(n=>{n.addEventListener("click",w=>{w.stopPropagation();const $=n.closest(".mp-filter"),z=$.classList.contains("mp-filter-open");u(),z||($.classList.add("mp-filter-open"),r&&r.classList.add("mp-overlay-active"))})}),e.addEventListener("click",n=>{i.contains(n.target)&&(n.target.closest(".mp-filter")||u())}));async function N(){if(!e.getElementById("leaflet-css")){const w=e.createElement("link");w.id="leaflet-css",w.rel="stylesheet",w.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",e.head.appendChild(w)}const n=e.defaultView??window;return typeof n.L>"u"&&await new Promise((w,$)=>{const z=e.createElement("script");z.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",z.onload=w,z.onerror=$,e.head.appendChild(z)}),n.L}function ne(){const n=e.querySelector('meta[name="map-locations-url"]')?.content;if(n)return n;try{const $=window.top?.document?.querySelector('meta[name="map-locations-url"]')?.content;if($)return $}catch{}return"/api/map-locations"}async function se(){try{const n=ne(),w=await fetch(n,{headers:{Accept:"application/json"}});if(!w.ok)throw new Error("No se pudo cargar la información del mapa");const $=await w.json();return s.departments=$.departments||[],s.agencies=$.agencies||[],s.paymentPoints=$.payment_points||[],!0}catch(n){return console.warn("[MapFilter] Error al cargar datos:",n),!1}}async function J(){if(!(!l||l.__mpMapInit))try{if(b=await N(),!b||l.__mpMapInit)return;l.__mpMapInit=!0,c=b.map(l,{zoomControl:!0}).setView(p,d),l._map=c,b.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(c),x=b.layerGroup().addTo(c),c.whenReady(function(){setTimeout(()=>{c&&c.invalidateSize&&c.invalidateSize()},300)});const n=await se();T(n),O(),D(),A(),S()}catch(n){console.warn("No se pudo inicializar el mapa:",n)}}J()}}function br(i,e){const t=document.getElementById("map-filter-config-modal");if(t&&t.remove(),!document.getElementById("mp-modal-styles")){const d=document.createElement("style");d.id="mp-modal-styles",d.textContent=`
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
        `,document.head.appendChild(d)}const r=(()=>{try{return JSON.parse(e.getAttributes()["data-map-config"]||"{}")}catch{return{}}})().title||je.title,l=document.createElement("div");l.id="map-filter-config-modal",l.className="mp-overlay-modal";const o=document.createElement("div");o.className="mp-modal",o.innerHTML=`
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
        </div>`,l.appendChild(o),document.body.appendChild(l);const p=()=>l.remove();o.querySelector("#mp-modal-close").onclick=p,o.querySelector("#mp-modal-cancel").onclick=p,l.onclick=d=>{d.target===l&&p()},o.querySelector("#mp-modal-save").onclick=()=>{const d={title:o.querySelector("#mp-title").value.trim()},c=e.getEl()?.querySelector("[id^='mp-root-']")?.id?.replace("mp-root-","")||"mp"+Math.random().toString(36).slice(2,7);e.addAttributes({"data-map-config":JSON.stringify(d)}),e.components(dt(d,c)+`<style>${_e}</style>`),p()}}const ur=[{id:"map-filter-block",label:"Mapa con Filtros",category:"Interactivos",media:hr,content:{type:"map-filter-component"}}];function xr(i){const e="map-filter-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Mapa con Filtros",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,stylable:!1,resizable:!1,layerable:!0,highlightable:!1,attributes:{"data-gjs-type":e,"data-map-config":JSON.stringify(je)},components:dt(je)+`<style>${_e}</style>`,script:mr(),traits:[{type:"button",label:"Mapa con Filtros",text:"Administrar Mapa y Filtros",full:!0,command:"open-map-filter-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),i.Commands.add("open-map-filter-config",{run(t){const a=t.getSelected();a&&br(t,a)}}),yr(i,e),vr(i,e)}function yr(i,e){i.on("storage:end:load",()=>{setTimeout(()=>et(i,e),1e3)}),i.on("component:mount",t=>{const a=t.getEl();a?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const r=t.get("script");r&&typeof r=="function"&&r.call(a)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const a=t.getEl();if(a){const r=a.querySelector("[data-mp-map]");r&&r._map&&(r._map.remove(),delete r._map,delete r.__mpMapInit),setTimeout(()=>{const l=t.get("script");l&&typeof l=="function"&&l.call(a)},500)}}}),i.on("canvas:render",()=>{setTimeout(()=>et(i,e),800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function et(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const a=t.getEl();if(a?.isConnected){const r=t.get("script");r&&typeof r=="function"&&r.call(a)}})}function vr(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const a=t.contentDocument?.head;if(a){if(!a.querySelector("#leaflet-css")){const r=document.createElement("link");r.id="leaflet-css",r.rel="stylesheet",r.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",a.appendChild(r)}if(!a.querySelector("#mp-filter-styles")){const r=document.createElement("style");r.id="mp-filter-styles",r.textContent=_e,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=".leaflet-container{height:100%;width:100%;border-radius:inherit;z-index:0;}",a.appendChild(r)}}})}const wr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <circle cx="23" cy="14" r="5" fill="#E97300"/>
    <circle cx="23" cy="14" r="4" fill="#f8e7d8"/>
</svg>`,kr=`
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
}`,Br=`
@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}
.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-title--short{width:60%;}
.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-line--short{width:55%;}
.bsk-buttons{display:flex;gap:16px;margin-top:36px;}
.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}
@media(max-width:768px){.bsk-buttons{flex-direction:column;}}`;function Er(){return function(){const i=this,e=i.ownerDocument??document,t="/adminintegral",a=(e.defaultView??window).location.origin,r=e.querySelector('meta[name="api-banners-url"]')?.content||`${a}${t}/api/banners/active`,l=["fill-blue","outline-blue","fill-orange","outline-orange","fill-white","outline-white"],o=".banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;display:grid;}.banner-slide-container:active{cursor:grabbing;}.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}.banner-bg{position:absolute;inset:0;z-index:0;}.banner-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.banner-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.banner-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.banner-btn--fill-blue{background:#003B71;color:#ffffff;border:2px solid #003B71;}.banner-btn--fill-blue:hover{background:#002a52;border-color:#002a52;color:#ffffff;}.banner-btn--outline-blue{background:transparent;color:#003B71;border:2px solid #003B71;}.banner-btn--outline-blue:hover{background:#003B71;border-color:#003B71;color:#ffffff;}.banner-btn--fill-orange{background:#E97300;color:#ffffff;border:2px solid #E97300;}.banner-btn--fill-orange:hover{background:#c96200;border-color:#c96200;color:#ffffff;}.banner-btn--outline-orange{background:transparent;color:#E97300;border:2px solid #E97300;}.banner-btn--outline-orange:hover{background:#E97300;border-color:#E97300;color:#ffffff;}.banner-btn--fill-white{background:#ffffff;color:#003B71;border:2px solid #ffffff;}.banner-btn--fill-white:hover{background:#dce8f5;border-color:#dce8f5;color:#003B71;}.banner-btn--outline-white{background:transparent;color:#ffffff;border:2px solid #ffffff;}.banner-btn--outline-white:hover{background:#ffffff;border-color:#ffffff;color:#003B71;}.banner-dots-wrapper{display:none;}.banner-stripe{position:relative;width:100%;height:26px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}.banner-dots{display:flex;gap:8px;align-items:center;}.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}.banner-dot--active{width:28px;background:#ffffff;}.banner-empty{display:flex;align-items:center;justify-content:center;min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;}@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}",p="@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title--short{width:60%;}.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-line--short{width:55%;}.bsk-buttons{display:flex;gap:16px;margin-top:36px;}.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}@media(max-width:768px){.bsk-buttons{flex-direction:column;}}";(function(){if(!e.getElementById("banner-hero-styles")){const w=e.createElement("style");w.id="banner-hero-styles",w.textContent=o,e.head.appendChild(w)}if(!e.getElementById("banner-skeleton-styles")){const w=e.createElement("style");w.id="banner-skeleton-styles",w.textContent=p,e.head.appendChild(w)}})();let d=[],s=0,c=null,x=!1,b=0,u=0;const g=50,B=i.dataset.autoplay!=="false",T=i.dataset.category??"",m=i.querySelector(".banner-slide-container"),k=i.querySelector(".banner-stripe");if(!m||!k)return;function h(n){return l.indexOf(n)!==-1?n:n==="outline-blue"||n==="outline-orange"?"outline-white":"fill-white"}function f(n,w,$,z){const P=h($),V=w?"a":"span",ke=w?`href="${w}"${z?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${V} ${ke} class="banner-btn banner-btn--${P}">${n}</${V}>`}async function y(){if(!i.__bannerLoading){i.__bannerLoading=!0,E();try{const n=await fetch(r,{headers:{Accept:"application/json"}});if(!n.ok){J();return}const w=await n.json();if(d=Array.isArray(w)?T?w.filter($=>$.category===T):w:[],d.length===0){J();return}v(),O(),N(0,!1),B&&ne()}catch{J()}finally{i.__bannerLoading=!1}}}function E(){m.innerHTML=`
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
                </div>`,k.innerHTML=""}function v(){m.innerHTML=d.map((n,w)=>`
                <div class="banner-slide" data-index="${w}">
                    <div class="banner-slide-inner">
                        <div class="banner-bg">
                            <img src="${n.image_url}"
                                 alt="${n.image_alt??n.title}"
                                 loading="${w===0?"eager":"lazy"}"
                                 decoding="async"
                                 fetchpriority="${w===0?"high":"low"}"
                                 draggable="false">
                        </div>
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            ${n.category?`<span class="banner-category-badge">${n.category}</span>`:""}
                            <h2 class="banner-title">${n.title}</h2>
                            <p class="banner-description">${n.description}</p>
                            ${n.btn_primary_text||n.btn_secondary_text?`<div class="banner-buttons">
                                    ${n.btn_primary_text?f(n.btn_primary_text,n.btn_primary_url,n.btn_primary_style,n.btn_primary_external):""}
                                    ${n.btn_secondary_text?f(n.btn_secondary_text,n.btn_secondary_url,n.btn_secondary_style,n.btn_secondary_external):""}
                                </div>`:""}
                        </div>
                    </div>
                </div>`).join(""),L(),_()}function L(){m.addEventListener("mousedown",S),m.addEventListener("touchstart",S,{passive:!0}),m.addEventListener("mousemove",A),m.addEventListener("touchmove",A,{passive:!0}),m.addEventListener("mouseup",D),m.addEventListener("touchend",D),m.addEventListener("mouseleave",D)}function _(){d.forEach(n=>{const w=new Image;w.src=n.image_url})}function S(n){x=!0,b=n.touches?n.touches[0].clientX:n.clientX,u=0}function A(n){x&&(u=(n.touches?n.touches[0].clientX:n.clientX)-b)}function D(){x&&(x=!1,Math.abs(u)>=g&&(N(u<0?(s+1)%d.length:(s-1+d.length)%d.length),se()),u=0)}function O(){if(d.length<=1){k.innerHTML="";return}const n=e.createElement("div");n.className="banner-dots",d.forEach((w,$)=>{const z=e.createElement("button");z.className="banner-dot",z.type="button",z.dataset.index=String($),z.setAttribute("aria-label",`Banner ${$+1}`),z.addEventListener("click",()=>{N($),se()}),n.appendChild(z)}),k.innerHTML="",k.appendChild(n)}function N(n,w=!0){const $=m.querySelectorAll(".banner-slide"),z=i.querySelectorAll(".banner-dot");$.forEach((P,V)=>{const ke=V===n;w||(P.style.transition="none"),P.classList.toggle("banner-slide--active",ke),w||requestAnimationFrame(()=>{P.style.transition=""})}),z.forEach((P,V)=>P.classList.toggle("banner-dot--active",V===n)),s=n}function ne(){d.length<=1||!B||(c=setInterval(()=>N((s+1)%d.length),5e3))}function se(){B&&(clearInterval(c),ne())}function J(){clearInterval(c),m.innerHTML=`
                <div class="banner-slide banner-slide--active">
                    <div class="banner-empty">Sin contenido.</div>
                </div>`,k.innerHTML=""}e.readyState==="loading"?e.addEventListener("DOMContentLoaded",y):y()}}function $r(i,e){const t=document.getElementById("banner-hero-config-modal");if(t&&t.remove(),!document.getElementById("bnr-modal-styles")){const g=document.createElement("style");g.id="bnr-modal-styles",g.textContent=`
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
        `,document.head.appendChild(g)}const a=e.getAttributes(),r=a["data-autoplay"]!=="false",l=a["data-category"]||"",o=document.createElement("div");o.id="banner-hero-config-modal",o.className="bnr-overlay";const p=document.createElement("div");p.className="bnr-modal",p.innerHTML=`
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
        </div>`,o.appendChild(p),document.body.appendChild(o);const d=p.querySelector("#bnr-autoplay"),s=p.querySelector("#bnr-autoplay-slider"),c=p.querySelector("#bnr-autoplay-knob"),x=()=>{s.style.background=d.checked?"#003B71":"#cbd5e1",c.style.left=d.checked?"21px":"3px"};x(),d.addEventListener("change",x);const b=p.querySelector("#bnr-category");(async()=>{try{const B=document.querySelector('meta[name="api-banners-url"]')?.content||`${window.location.origin}/adminintegral/api/banners/active`,T=await fetch(B,{headers:{Accept:"application/json"}});if(!T.ok)return;const m=await T.json();if(!Array.isArray(m))return;[...new Set(m.map(h=>h.category).filter(Boolean))].sort().forEach(h=>{const f=document.createElement("option");f.value=h,f.textContent=h,b.appendChild(f)}),b.value=l}catch{}})();const u=()=>o.remove();p.querySelector("#bnr-modal-close").onclick=u,p.querySelector("#bnr-modal-cancel").onclick=u,o.onclick=g=>{g.target===o&&u()},p.querySelector("#bnr-modal-save").onclick=()=>{e.addAttributes({"data-autoplay":d.checked?"true":"false","data-category":b.value||""}),u()}}const Sr=[{id:"banner-hero",label:"Banner Slider",category:"Banners",media:wr,content:{type:"banner-hero-component"}}];function Cr(i){const e="banner-hero-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Slider",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-autoplay":"true","data-category":""},components:`
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
                `,script:Er(),traits:[{type:"button",label:"Banner Slider",text:"Administrar Banner Slider",full:!0,command:"open-banner-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const t=this.getEl();if(!t)return;const a=this.get("script");a&&typeof a=="function"&&setTimeout(()=>a.call(t),100)})}}}),i.Commands.add("open-banner-config",{run(t){const a=t.getSelected();a&&$r(t,a)}}),Lr(i,e),jr(i,e)}function Lr(i,e){i.on("storage:end:load",()=>{setTimeout(()=>tt(i,e),1e3)}),i.on("component:mount",t=>{const a=t.getEl();a?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const r=t.get("script");r&&typeof r=="function"&&r.call(a)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const a=t.getEl();a&&setTimeout(()=>{const r=t.get("script");r&&typeof r=="function"&&r.call(a)},500)}}),i.on("canvas:render",()=>{setTimeout(()=>tt(i,e),800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function tt(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const a=t.getEl();if(a?.isConnected){const r=t.get("script");r&&typeof r=="function"&&r.call(a)}})}function jr(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const a=t.contentDocument?.head;if(a){if(!a.querySelector("#banner-hero-styles")){const r=document.createElement("style");r.id="banner-hero-styles",r.textContent=kr,a.appendChild(r)}if(!a.querySelector("#banner-skeleton-styles")){const r=document.createElement("style");r.id="banner-skeleton-styles",r.textContent=Br,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`[data-gjs-type="${e}"] * { pointer-events: none !important; } [data-gjs-type="${e}"].gjs-selected, [data-gjs-type="${e}"].gjs-hovered { outline: 2px dashed rgba(240,135,42,0.6) !important; outline-offset: 2px; }`,a.appendChild(r)}}})}const Tr=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,_r=`
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
`;function zr(){return function(){const i=this,e=i.ownerDocument??document;e.defaultView;const t=e.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??"",a=e.querySelector('meta[name="api-assets-url"]')?.content||(t?`${t}/api/assets/active`:""),r=`
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
`;if(!e.getElementById("assets-block-styles")){const m=e.createElement("style");m.id="assets-block-styles",m.textContent=r,e.head.appendChild(m)}const l=i.querySelector("[data-ast-tabs]"),o=i.querySelector("[data-ast-content]");if(!l||!o)return;const p=i.dataset.defaultCategory||"";let d=[],s="";function c(m,k){return m?m.length>k?`${m.slice(0,k).trim()}...`:m:""}function x(m){const k=m.link_is_external?' target="_blank" rel="noopener noreferrer"':"",h=m.name||c(m.short_description,60),f=m.name||m.short_description||"Activo extraordinario";return`<a href="${m.link_url}"${k} class="ast-card">
                <img src="${m.image_url}" alt="${f}" class="ast-card-img" loading="lazy">
                <div class="ast-card-body">
                    <p class="ast-card-name">${h}</p>
                    ${m.name&&m.short_description?`<p class="ast-card-desc">${m.short_description}</p>`:""}
                </div>
            </a>`}function b(){const m=[],k=new Set;return d.forEach(h=>{k.has(h.category_slug)||(k.add(h.category_slug),m.push({slug:h.category_slug,name:h.category}))}),m.sort((h,f)=>h.name.localeCompare(f,"es",{sensitivity:"base"}))}function u(m,k){const h=k.length?k.map(x).join(""):'<div class="ast-empty">No hay activos extraordinarios disponibles en esta categoría.</div>';return`<div class="ast-group">
                <p class="ast-subtitle">${m}</p>
                <div class="ast-subtitle-stripe"></div>
                <div class="ast-grid">${h}</div>
            </div>`}function g(){if(s){const k=d.filter(f=>f.category_slug===s),h=k[0]?.category||b().find(f=>f.slug===s)?.name||"";o.innerHTML=u(h,k);return}const m=b();o.innerHTML=m.map(k=>u(k.name,d.filter(h=>h.category_slug===k.slug))).join("")}function B(){const k=['<button type="button" class="ast-tab ast-tab--active" data-tab-slug="">Todos</button>',...b().map(h=>`<button type="button" class="ast-tab" data-tab-slug="${h.slug}">${h.name}</button>`)].join("");if(l.innerHTML=k,l.querySelectorAll("[data-tab-slug]").forEach(h=>{h.addEventListener("click",()=>{l.querySelectorAll(".ast-tab").forEach(f=>f.classList.remove("ast-tab--active")),h.classList.add("ast-tab--active"),s=h.dataset.tabSlug,g()})}),p){const h=l.querySelector(`[data-tab-slug="${p}"]`);h&&h.click()}}async function T(){if(!a){l.innerHTML='<button type="button" class="ast-tab ast-tab--active">Todos</button>',o.innerHTML='<div class="ast-empty">Vista previa del catálogo (los datos reales se cargan en el sitio publicado).</div>';return}o.innerHTML=`
                <div class="ast-loading">
                    <div class="ast-spinner"></div>
                    <span>Cargando activos extraordinarios...</span>
                </div>`;try{const m=await fetch(a,{headers:{Accept:"application/json"}});if(!m.ok){o.innerHTML='<div class="ast-empty">No se pudieron cargar los activos extraordinarios.</div>';return}if(d=await m.json(),!Array.isArray(d)||d.length===0){l.innerHTML='<button type="button" class="ast-tab ast-tab--active">Todos</button>',o.innerHTML='<div class="ast-empty">No hay activos extraordinarios disponibles.</div>';return}B(),g()}catch{o.innerHTML='<div class="ast-empty">No se pudieron cargar los activos extraordinarios.</div>'}}e.readyState==="loading"?e.addEventListener("DOMContentLoaded",T):T()}}const Ar=[{id:"assets-catalog",label:"Catálogo de Activos Extraordinarios",category:"Interactivos",media:Tr,content:{type:"assets-catalog-component"}}];function Ir(i){const e="assets-catalog-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Catálogo de Activos Extraordinarios",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-default-category":"",class:"ast-section"},components:`
                    <p class="ast-header" contenteditable="true" data-gjs-type="text" data-gjs-editable="true" data-gjs-selectable="false" data-gjs-hoverable="false">Mayor información a: 0000-0000</p>
                    <div class="ast-stripe" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div class="ast-tabs" data-ast-tabs data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                    <div data-ast-content data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false"></div>
                `,script:zr(),traits:[{type:"select",name:"data-default-category",label:"Categoría inicial",options:[{id:"",name:"Todas (mostrar 'Todos')"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const t=this.getEl();if(!t)return;const a=this.get("script");a&&typeof a=="function"&&setTimeout(()=>a.call(t),100)})}}}),qr(i,e),Mr(i,e),Dr(i,e)}async function Dr(i,e){try{const t=document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??"",a=await fetch(`${t}/api/asset-categories/all`,{headers:{Accept:"application/json"}});if(!a.ok)return;const r=await a.json();if(!Array.isArray(r)||r.length===0)return;const l=i.DomComponents.getType(e);if(!l)return;const p=l.model.prototype.defaults.traits.find(d=>d.name==="data-default-category");if(!p)return;p.options=[{id:"",name:"Todas (mostrar 'Todos')"},...r.map(d=>({id:d.slug,name:d.name}))]}catch{}}function qr(i,e){i.on("storage:end:load",()=>{setTimeout(()=>it(i,e),1e3)}),i.on("component:mount",t=>{const a=t.getEl();a?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const r=t.get("script");r&&typeof r=="function"&&r.call(a)},500))}),i.on("canvas:render",()=>{setTimeout(()=>it(i,e),800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function it(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const a=t.getEl();if(a?.isConnected){const r=t.get("script");r&&typeof r=="function"&&r.call(a)}})}function Mr(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const a=t.contentDocument?.head;if(a){if(!a.querySelector("#assets-block-styles")){const r=document.createElement("style");r.id="assets-block-styles",r.textContent=_r,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`[data-gjs-type="${e}"] * { pointer-events: none !important; } [data-gjs-type="${e}"].gjs-selected, [data-gjs-type="${e}"].gjs-hovered { outline: 2px dashed rgba(240,135,42,0.6) !important; outline-offset: 2px; }`,a.appendChild(r)}}})}const Nr="/bancaintegral",ft=`
<style>
.hb-section{position:relative;width:100%;padding:5rem 4rem;display:flex;align-items:center;min-height:420px;box-sizing:border-box;font-family:'Poppins',sans-serif;overflow:hidden;background:#003B71;}
.hb-bg{position:absolute;inset:0;z-index:0;}
.hb-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}
.hb-content{position:relative;z-index:10;max-width:560px;display:flex;flex-direction:column;gap:0.75rem;}
.hb-title{font-size:2.75rem;font-weight:800;color:#fff;line-height:1.15;margin:0;}
.hb-subtitle{font-size:1.125rem;font-weight:700;color:#fff;margin:0;}
.hb-buttons{display:flex;gap:1rem;margin-top:1.25rem;flex-wrap:wrap;}
.hb-btn{display:inline-flex;align-items:center;justify-content:center;padding:0.75rem 1.75rem;border-radius:9999px;font-size:0.9375rem;font-weight:700;text-decoration:none;cursor:pointer;border:2px solid transparent;font-family:inherit;transition:opacity 0.15s,background 0.15s,color 0.15s;white-space:nowrap;}
.hb-btn:hover{opacity:0.85;}
.hb-btn-white-solid{background:#fff;color:#003B71;border-color:#fff;}
.hb-btn-white-outline{background:transparent;color:#fff;border-color:#fff;}
.hb-btn-blue-solid{background:#003B71;color:#fff;border-color:#003B71;}
.hb-btn-blue-outline{background:transparent;color:#003B71;border-color:#003B71;}
.hb-btn-orange-solid{background:#E97300;color:#fff;border-color:#E97300;}
.hb-btn-orange-outline{background:transparent;color:#E97300;border-color:#E97300;}
@media(max-width:992px){
.hb-section{padding:3.5rem 2.5rem;}
.hb-content{max-width:100%;}
.hb-title{font-size:2.125rem;}
}
@media(max-width:640px){
.hb-section{padding:2.5rem 1.5rem;min-height:360px;}
.hb-title{font-size:1.75rem;}
.hb-subtitle{font-size:1rem;}
.hb-buttons{flex-direction:column;align-items:flex-start;}
.hb-btn{width:100%;text-align:center;}
}
</style>`;function pt(i,e){e=e||"hb"+Math.random().toString(36).slice(2,7);const t=i.bg_image||I("images/placeholder.svg"),a=i.btn_primary||{},r=i.btn_secondary||{},l=a.color||"white",o=r.color||"white",p=a.enabled?`<a href="${a.href||"#"}" class="hb-btn hb-btn-${l}-solid">${a.label||"Conoce más"}</a>`:"",d=r.enabled?`<a href="${r.href||"#"}" class="hb-btn hb-btn-${o}-outline">${r.label||"Solicitar"}</a>`:"",s=i.subtitle?`<p class="hb-subtitle">${i.subtitle}</p>`:"";return`<section id="hb-root-${e}" class="hb-section" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="hb-bg" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <img src="${t}" alt="${i.title||"Banner"}" loading="eager" decoding="async" fetchpriority="high" draggable="false">
        </div>
        <div class="hb-content">
            <h2 class="hb-title">${i.title||"Título del banner"}</h2>
            ${s}
            <div class="hb-buttons">${p}${d}</div>
        </div>
    </section>`}const Y={bg_image:I("images/placeholder.svg"),title:"Cuenta de Ahorro Electrónica",subtitle:"Dale un giro digital a tus ahorros",btn_primary:{enabled:!0,label:"Abre tu cuenta",href:"#",color:"white"},btn_secondary:{enabled:!0,label:"Conoce más",href:"#",color:"white"}};function Or(i,e){const t=document.getElementById("hero-banner-config-modal");if(t&&t.remove(),!document.getElementById("hb-modal-styles")){const h=document.createElement("style");h.id="hb-modal-styles",h.textContent=`
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
            .hb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .hb-pick-btn:hover{background:#002a52;}
            .hb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .hb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .hb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .hb-btn-save:hover{background:#d97821;}
            .hb-section-title{font-size:0.75rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0;border-bottom:1px solid #e2e8f0;margin-bottom:0.25rem;}
            .hb-color-toggle{display:flex;gap:0.375rem;}
            .hb-color-opt{padding:0.375rem 0.875rem;border-radius:9999px;font-size:0.75rem;font-weight:700;cursor:pointer;border:2px solid #e2e8f0;transition:all 0.15s;font-family:inherit;}
            .hb-color-opt-white{background:#fff;color:#003B71;}
            .hb-color-opt-blue{background:#003B71;color:#fff;border-color:#003B71;}
            .hb-color-opt-orange{background:#E97300;color:#fff;border-color:#E97300;}
            .hb-color-opt.hb-color-inactive{opacity:0.35;}
            .hb-color-opt.hb-color-inactive:hover{opacity:0.6;}
            .hb-switch{position:relative;display:inline-block;width:40px;height:22px;flex-shrink:0;}
            .hb-switch input{opacity:0;width:0;height:0;}
            .hb-switch-slider{position:absolute;inset:0;background:#cbd5e1;border-radius:9999px;transition:background 0.2s;cursor:pointer;}
            .hb-switch-knob{position:absolute;width:16px;height:16px;left:3px;top:3px;background:#fff;border-radius:50%;transition:left 0.2s;pointer-events:none;}
        `,document.head.appendChild(h)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-hero-banner-config"]||"{}")}catch{return{}}})(),r=a.bg_image||Y.bg_image,l=a.title||Y.title,o=a.subtitle||Y.subtitle,p=JSON.parse(JSON.stringify(a.btn_primary||Y.btn_primary)),d=JSON.parse(JSON.stringify(a.btn_secondary||Y.btn_secondary)),s=document.createElement("div");s.id="hero-banner-config-modal",s.className="hb-overlay";const c=document.createElement("div");c.className="hb-modal",c.innerHTML=`
        <div class="hb-modal-header">
            <div class="hb-modal-header-left"><i class="ri-image-2-line"></i><h2>Configurar Banner</h2></div>
            <button id="hb-modal-close" class="hb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="hb-modal-tabs">
            <button class="hb-tab-btn active" data-tab="bg"><i class="ri-image-line"></i> Fondo</button>
            <button class="hb-tab-btn" data-tab="content"><i class="ri-text"></i> Contenido</button>
            <button class="hb-tab-btn" data-tab="buttons"><i class="ri-cursor-line"></i> Botones</button>
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
            </div>
            <div class="hb-tab-panel" id="hb-panel-content">
                <div class="hb-card">
                    <label class="hb-label">Título</label>
                    <input id="hb-title" type="text" placeholder="Título del banner" value="${l}" class="hb-input">
                </div>
                <div class="hb-card">
                    <label class="hb-label">Subtítulo (opcional)</label>
                    <input id="hb-subtitle" type="text" placeholder="Déjalo vacío si no quieres subtítulo" value="${o}" class="hb-input">
                </div>
            </div>
            <div class="hb-tab-panel" id="hb-panel-buttons">
                <div class="hb-card">
                    <div class="hb-row" style="justify-content:space-between;margin-bottom:0.5rem;">
                        <div class="hb-section-title" style="border:none;margin:0;padding:0;">Botón primario</div>
                        <label class="hb-switch">
                            <input type="checkbox" id="hb-btn1-enabled" ${p.enabled!==!1?"checked":""}>
                            <span class="hb-switch-slider" id="hb-btn1-slider"></span>
                            <span class="hb-switch-knob" id="hb-btn1-knob"></span>
                        </label>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="hb-label" style="margin-bottom:0.375rem;">Texto</label>
                            <input id="hb-btn1-label" type="text" placeholder="Abre tu cuenta" value="${p.label||""}" class="hb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="hb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="hb-btn1-href" type="text" placeholder="URL o buscar página..." value="${p.href||"#"}" class="hb-input">
                        </div>
                        <div>
                            <label class="hb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="hb-color-toggle" id="hb-btn1-colors">
                                <button type="button" class="hb-color-opt hb-color-opt-white" data-color="white">Blanco</button>
                                <button type="button" class="hb-color-opt hb-color-opt-blue" data-color="blue">Azul</button>
                                <button type="button" class="hb-color-opt hb-color-opt-orange" data-color="orange">Naranja</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hb-card">
                    <div class="hb-row" style="justify-content:space-between;margin-bottom:0.5rem;">
                        <div class="hb-section-title" style="border:none;margin:0;padding:0;">Botón secundario</div>
                        <label class="hb-switch">
                            <input type="checkbox" id="hb-btn2-enabled" ${d.enabled!==!1?"checked":""}>
                            <span class="hb-switch-slider" id="hb-btn2-slider"></span>
                            <span class="hb-switch-knob" id="hb-btn2-knob"></span>
                        </label>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="hb-label" style="margin-bottom:0.375rem;">Texto</label>
                            <input id="hb-btn2-label" type="text" placeholder="Conoce más" value="${d.label||""}" class="hb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="hb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="hb-btn2-href" type="text" placeholder="URL o buscar página..." value="${d.href||"#"}" class="hb-input">
                        </div>
                        <div>
                            <label class="hb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="hb-color-toggle" id="hb-btn2-colors">
                                <button type="button" class="hb-color-opt hb-color-opt-white" data-color="white">Blanco</button>
                                <button type="button" class="hb-color-opt hb-color-opt-blue" data-color="blue">Azul</button>
                                <button type="button" class="hb-color-opt hb-color-opt-orange" data-color="orange">Naranja</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="hb-modal-footer">
            <button id="hb-modal-cancel" class="hb-btn-cancel">Cancelar</button>
            <button id="hb-modal-save" class="hb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`,s.appendChild(c),document.body.appendChild(s);const b=`${document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??""}/api/pages/search`;function u(h){if(h.dataset.autocompleteAttached)return;h.dataset.autocompleteAttached="true";const f=h.parentNode;(!f.style.position||f.style.position==="static")&&(f.style.position="relative");const y=document.createElement("ul");y.style.cssText="position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;max-height:200px;overflow-y:auto;display:none;",f.appendChild(y);let E=null;async function v(S){if(S.length<1){y.style.display="none";return}try{const D=await(await fetch(`${b}?q=${encodeURIComponent(S)}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json();_(D,S)}catch{y.style.display="none"}}function L(S,A){return A?S.replace(new RegExp(`(${A.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi"),'<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>'):S}function _(S,A){if(y.innerHTML="",!S.length){y.style.display="none";return}S.forEach(D=>{const O=document.createElement("li");O.style.cssText="padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;",O.innerHTML=`<span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${L(D.title,A)}</span><span style="font-size:0.7rem;color:#64748b;">/${D.slug}</span>`,O.addEventListener("mouseenter",()=>O.style.background="#f1f5f9"),O.addEventListener("mouseleave",()=>O.style.background=""),O.addEventListener("mousedown",N=>{N.preventDefault(),h.value=`${Nr}/${D.slug}`,h.dispatchEvent(new Event("input")),y.style.display="none"}),y.appendChild(O)}),y.style.display="block"}h.addEventListener("input",()=>{clearTimeout(E),E=setTimeout(()=>v(h.value.trim()),220)}),h.addEventListener("focus",()=>{h.select(),h.value.trim()&&v(h.value.trim())}),h.addEventListener("blur",()=>{setTimeout(()=>{y.style.display="none"},150)}),h.addEventListener("keydown",S=>{if(y.style.display==="none")return;const A=y.querySelectorAll("li"),D=y.querySelector("li.hb-ac-active");let O=Array.from(A).indexOf(D);if(S.key==="ArrowDown"){S.preventDefault(),D?.classList.remove("hb-ac-active");const N=A[O+1]||A[0];N?.classList.add("hb-ac-active"),N&&(N.style.background="#f1f5f9")}else if(S.key==="ArrowUp"){S.preventDefault(),D?.classList.remove("hb-ac-active");const N=A[O-1]||A[A.length-1];N?.classList.add("hb-ac-active"),N&&(N.style.background="#f1f5f9")}else S.key==="Enter"&&D?(S.preventDefault(),D.dispatchEvent(new MouseEvent("mousedown"))):S.key==="Escape"&&(y.style.display="none")})}u(c.querySelector("#hb-btn1-href")),u(c.querySelector("#hb-btn2-href"));let g=p.color||"white",B=d.color||"white";function T(h,f,y){const E=c.querySelector(`#${h}`);E.querySelectorAll("[data-color]").forEach(v=>{v.classList.toggle("hb-color-inactive",v.dataset.color!==f),v.addEventListener("click",()=>{E.querySelectorAll("[data-color]").forEach(L=>L.classList.toggle("hb-color-inactive",L.dataset.color!==v.dataset.color)),y(v.dataset.color)})})}T("hb-btn1-colors",g,h=>g=h),T("hb-btn2-colors",B,h=>B=h);function m(h,f,y){const E=c.querySelector(`#${h}`),v=c.querySelector(`#${f}`),L=c.querySelector(`#${y}`),_=()=>{v.style.background=E.checked?"#003B71":"#cbd5e1",L.style.left=E.checked?"21px":"3px"};_(),E.addEventListener("change",_)}m("hb-btn1-enabled","hb-btn1-slider","hb-btn1-knob"),m("hb-btn2-enabled","hb-btn2-slider","hb-btn2-knob"),c.querySelectorAll(".hb-tab-btn").forEach(h=>{h.addEventListener("click",()=>{c.querySelectorAll(".hb-tab-btn").forEach(f=>f.classList.remove("active")),c.querySelectorAll(".hb-tab-panel").forEach(f=>f.classList.remove("active")),h.classList.add("active"),c.querySelector(`#hb-panel-${h.dataset.tab}`).classList.add("active")})}),c.querySelector("#hb-bg-pick").addEventListener("click",()=>{we({type:"image",title:"Seleccionar imagen de fondo",onSelect:h=>{c.querySelector("#hb-bg-url").value=h,c.querySelector("#hb-bg-preview").src=h}})}),c.querySelector("#hb-bg-url").addEventListener("input",h=>{c.querySelector("#hb-bg-preview").src=h.target.value});const k=()=>s.remove();c.querySelector("#hb-modal-close").onclick=k,c.querySelector("#hb-modal-cancel").onclick=k,s.onclick=h=>{h.target===s&&k()},c.querySelector("#hb-modal-save").onclick=()=>{const h={bg_image:c.querySelector("#hb-bg-url").value.trim()||Y.bg_image,title:c.querySelector("#hb-title").value.trim(),subtitle:c.querySelector("#hb-subtitle").value.trim(),btn_primary:{enabled:c.querySelector("#hb-btn1-enabled").checked,label:c.querySelector("#hb-btn1-label").value.trim(),href:c.querySelector("#hb-btn1-href").value.trim()||"#",color:g},btn_secondary:{enabled:c.querySelector("#hb-btn2-enabled").checked,label:c.querySelector("#hb-btn2-label").value.trim(),href:c.querySelector("#hb-btn2-href").value.trim()||"#",color:B}},y=e.getEl()?.querySelector("[id^='hb-root-']")?.id?.replace("hb-root-","")||"hb"+Math.random().toString(36).slice(2,7);e.addAttributes({"data-hero-banner-config":JSON.stringify(h)}),e.components(pt(h,y)+ft),k()}}function Pr(i){const e="hero-banner-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-hero-banner-config":JSON.stringify(Y)},components:pt(Y)+ft,traits:[{type:"button",label:"Banner",text:"Administrar Banner",full:!0,command:"open-hero-banner-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),i.Commands.add("open-hero-banner-config",{run(t){const a=t.getSelected();a&&Or(t,a)}}),i.BlockManager.add("hero-banner-block",{label:"Banner",category:"Banners",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#E97300" rx="2"/>
            <rect x="2" y="6" width="16" height="3" rx="1.5" fill="#fff" fill-opacity="0.9"/>
            <rect x="2" y="11" width="12" height="2" rx="1" fill="#fff" fill-opacity="0.7"/>
            <rect x="2" y="16" width="9" height="4" rx="2" fill="#fff"/>
            <rect x="13" y="16" width="9" height="4" rx="2" fill="none" stroke="#fff" stroke-width="1"/>
        </svg>`,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}})}function Rr(i){j.registerBlocks(At),j.registerBlocks(Ht),j.registerBlocks(Sr),j.registerBlocks(da),j.registerBlocks(Gi),j.registerBlocks(Wt),j.registerBlocks(Qt),j.registerBlocks(Si),j.registerBlocks(ji),j.registerBlocks(Ai),j.registerBlocks(Mi),j.registerBlocks(oi),j.registerBlocks(oa),j.registerBlocks(ci),j.registerBlocks(mi),j.registerBlocks(Pi),j.registerBlocks(Ui),j.registerBlocks(ha),j.registerBlocks(ua),j.registerBlocks(va),j.registerBlocks(Na),j.registerBlocks(Ra),j.registerBlocks(Ya),j.registerBlocks(nr),j.registerBlocks(pr),j.registerBlocks(za),j.registerBlocks(Da),j.registerBlocks(ur),j.registerBlocks(Ar),j.applyToEditor(i),xr(i),Cr(i),Pr(i),Bi(i),ri(i),sr(i),Ji(i),Wa(i),bi(i),Ir(i)}function Hr(i,e,t){i.on("component:add",()=>e.markAsDirty()),i.on("component:remove",()=>e.markAsDirty()),i.on("component:update",()=>e.markAsDirty()),i.on("style:update",()=>e.markAsDirty());const a=document.getElementById("save-button");a&&a.addEventListener("click",async()=>{await Fr(i,e,t,a)}),document.addEventListener("keydown",r=>{(r.ctrlKey||r.metaKey)&&r.key==="s"&&(r.preventDefault(),a&&!a.disabled&&a.click())})}async function Fr(i,e,t,a){a.disabled=!0,a.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{t.needsTitle()?await Ur(i,e,t):await ht(i,e,t)}catch(r){gt(r.message,"error")}finally{a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}async function Ur(i,e,t){return new Promise((a,r)=>{bt({title:"Título de la Página",description:"Ingresa un título descriptivo para identificar esta página",placeholder:"Ej: Acerca de Nosotros",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async l=>{if(!l?.trim()){r(new Error("El título es obligatorio"));return}try{await ht(i,e,t,l),a()}catch(o){r(o)}},onCancel:()=>{r(new Error("Guardado cancelado"))}})})}async function ht(i,e,t,a=null){const l={...e.getEditorContent(i),is_published:t.isPublished};a&&(l.title=a);const o=await e.savePage(i,l,t.storeUrl,t.getHttpMethod());o.success&&(e.markAsClean(),gt(o.message,"success"),!t.isEditMode&&o.page?(t.updatePageInfo(o),t.updateTitle(o.page.title)):a&&t.updateTitle(a))}function gt(i,e){typeof window.showNotification=="function"&&window.showNotification(i,e)}document.addEventListener("DOMContentLoaded",async()=>{const i=new ut,e=new jt;new Tt(i);const t=xt();if(t.on("load",()=>{Rr(t),yt(t),vt(),wt(),kt(t),Bt(t),Et(t),$t(t),St(t),Ct(t),Vr(t),Xr(t),Yr(t),setTimeout(()=>{t.runCommand("sw-visibility"),t.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),e.isEditMode)try{await i.loadPageContent(t,e.loadUrl),at("Contenido cargado correctamente","success")}catch(a){at("Error al cargar el contenido","error"),console.error(a)}Hr(t,i,e)});function Vr(i){const e=[{cmd:"set-device-desktop",device:"Desktop"},{cmd:"set-device-tablet",device:"Tablet"},{cmd:"set-device-mobile",device:"Mobile"}];e.forEach(({cmd:t,device:a})=>{i.Commands.add(t,{run:r=>{r.setDevice(a),e.forEach(({cmd:l})=>{r.Panels.getButton("devices-c",l)?.set("active",l===t)})}})})}function Xr(i){i.Commands.add("canvas-clear",{run:e=>{Lt({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{e.DomComponents.clear(),e.CssComposer.clear()}})}})}function Yr(i){const e=i.Canvas.getFrameEl();if(!e?.contentDocument?.head)return;const t=e.contentDocument.createElement("style");t.id="gjs-dashed-fix",t.textContent="body,body.gjs-dashed{margin:0!important;padding:0 0 160px 0!important;}",e.contentDocument.head.appendChild(t)}function at(i,e="info"){typeof window.showNotification=="function"&&window.showNotification(i,e)}
