/* empty css                   *//* empty css                    *//* empty css                          *//* empty css                           */import{o as Le,M as ft,j as ht,E as gt,i as pt,t as mt,d as bt,f as ut,e as xt,s as yt,g as vt,c as wt,b as kt,a as Bt,h as Et}from"./editor-commands-Bq37dEX4.js";import{a as O}from"./url-DaqOO3yL.js";import"./_commonjsHelpers-CqkleIqs.js";class $t{constructor(){this.pageId=this.getElementValue("page-id"),this.pageSlug=this.getElementValue("page-slug"),this.pageTitle=this.getPageTitle(),this.loadUrl=this.getElementValue("page-load-url"),this.storeUrl=this.getElementValue("page-store-url"),this.isPublished=this.getElementValue("page-is-published")==="1",this.isEditMode=!!this.pageId,this.appUrl=(document.querySelector('meta[name="app-url"]')?.content??"").replace(/\/$/,"")}getElementValue(e,i=""){const a=document.getElementById(e);return a?a.value.trim():i}getPageTitle(){const e=document.getElementById("editor-title");if(!e)return"";const a=e.textContent.match(/(?:Editando:|Nueva Página)\s*(.+)?/);return a&&a[1]?a[1].trim():""}updatePageInfo(e){if(e.page)if(this.pageId=e.page.id,this.pageSlug=e.page.slug,this.pageTitle=e.page.title,this.isEditMode=!0,document.getElementById("page-id").value=this.pageId,document.getElementById("page-slug").value=this.pageSlug,e.page.update_url?this.storeUrl=e.page.update_url:this.storeUrl=`${this.appUrl}/pages/${this.pageSlug}`,document.getElementById("page-store-url").value=this.storeUrl,e.page.load_url?this.loadUrl=e.page.load_url:this.loadUrl=`${this.appUrl}/pages/${this.pageSlug}/load`,document.getElementById("page-load-url").value=this.loadUrl,e.page.edit_url)window.history.replaceState(null,"",e.page.edit_url);else try{const i=new URL(window.location.href);i.pathname=i.pathname.replace(/\/pages\/create\/?$/,`/pages/${this.pageSlug}/edit`),window.history.replaceState(null,"",i.toString())}catch(i){console.error("Error updating browser URL:",i)}}updateTitle(e){this.pageTitle=e;const i=document.getElementById("editor-title");i&&(i.textContent=`Editando: ${e}`),document.title=`Editar: ${e} - Editor`}getHttpMethod(){return this.isEditMode?"PUT":"POST"}needsTitle(){return!this.isEditMode}}class St{constructor(e){this.editorService=e,this.setupBackButton(),this.setupBeforeUnload()}setupBackButton(){const e=document.querySelector("#editor-navbar a[href]");e&&e.addEventListener("click",i=>{this.editorService.shouldPreventUnload()&&(i.preventDefault(),this.showUnsavedChangesModal(()=>{this.editorService.startNavigation(),window.location.href=e.href}))})}setupBeforeUnload(){window.addEventListener("beforeunload",e=>{if(this.editorService.shouldPreventUnload())return e.preventDefault(),e.returnValue="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?",e.returnValue})}showUnsavedChangesModal(e){const i=document.createElement("div");i.style.cssText=`
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
        `;const n=document.createElement("button");n.textContent="Cancelar",n.style.cssText=`
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
        `,[n,c].forEach(d=>{d.addEventListener("mouseenter",()=>{d.style.opacity="0.85"}),d.addEventListener("mouseleave",()=>{d.style.opacity="1"})});const g=()=>i.remove();n.addEventListener("click",g),c.addEventListener("click",()=>{g(),e()}),i.addEventListener("click",d=>{d.target===i&&g()}),l.appendChild(n),l.appendChild(c),a.appendChild(r),a.appendChild(l),i.appendChild(a),document.body.appendChild(i)}}const Ct="Básico";class Lt{constructor(){this.blocks=new Map}registerBlock(e,i){this.blocks.has(i.category)||this.blocks.set(i.category,[]),this.blocks.get(i.category).push({id:e,...i})}registerBlocks(e){e.forEach(i=>{this.registerBlock(i.id,i)})}applyToEditor(e){this.blocks.forEach(i=>{i.forEach(a=>{const{id:r,...l}=a;e.BlockManager.add(r,l)})}),this.applyCollapseSettings(e),this.hideDefaultCategories(e)}applyCollapseSettings(e){setTimeout(()=>{e.BlockManager.getCategories().each(i=>{i.set("open",i.get("label")===Ct)})},500)}hideDefaultCategories(e){setTimeout(()=>{const i=["Basic","Extra"];document.querySelectorAll(".gjs-block-category").forEach(a=>{const r=a.querySelector(".gjs-title");r&&i.includes(r.textContent.trim())&&(a.style.display="none")})},100)}}const I=new Lt,jt=[{id:"heading1",label:"Título H1",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:{type:"image",attributes:{src:O("images/placeholder.svg"),alt:"Imagen"},classes:["max-w-full","h-auto","block"],activeOnRender:1}},{id:"unordered-list",label:"Lista no ordenada",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:'<div class="h-12 w-full"></div>'}],_t=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Tt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,zt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="12" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="22" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,It=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="9" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="25" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,At=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="13" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,qt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="21" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Dt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="14" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="23" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Mt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="11" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="20" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,M='<div class="col-cell"></div>',Z=`
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
</style>`,Nt=[{id:"columns-1",label:"1 Columna",category:"Columnas",media:_t,content:`
<div class="col-section">
    <div class="col-cell"></div>
</div>
${Z}`},{id:"columns-2",label:"2 Columnas",category:"Columnas",media:Tt,content:`
<div class="col-section">
    <div class="col-grid col-grid--2">
        ${M}
        ${M}
    </div>
</div>
${Z}`},{id:"columns-3",label:"3 Columnas",category:"Columnas",media:zt,content:`
<div class="col-section">
    <div class="col-grid col-grid--3">
        ${M}
        ${M}
        ${M}
    </div>
</div>
${Z}`},{id:"columns-4",label:"4 Columnas",category:"Columnas",media:It,content:`
<div class="col-section">
    <div class="col-grid col-grid--4">
        ${M}
        ${M}
        ${M}
        ${M}
    </div>
</div>
${Z}`},{id:"columns-1-3",label:"1/3 — 2/3",category:"Columnas",media:At,content:`
<div class="col-section">
    <div class="col-grid col-grid--1-2">
        ${M}
        ${M}
    </div>
</div>
${Z}`},{id:"columns-3-1",label:"2/3 — 1/3",category:"Columnas",media:qt,content:`
<div class="col-section">
    <div class="col-grid col-grid--2-1">
        ${M}
        ${M}
    </div>
</div>
${Z}`},{id:"columns-1-2",label:"1/4 — 1/4 — 1/2",category:"Columnas",media:Dt,content:`
<div class="col-section">
    <div class="col-grid col-grid--1-1-2">
        ${M}
        ${M}
        ${M}
    </div>
</div>
${Z}`},{id:"columns-2-1",label:"1/2 — 1/4 — 1/4",category:"Columnas",media:Mt,content:`
<div class="col-section">
    <div class="col-grid col-grid--2-1-1">
        ${M}
        ${M}
        ${M}
    </div>
</div>
${Z}`}],Ot=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Pt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Rt=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Misión</h3>
    <p class="mvv-card-text">Proveemos la mejor experiencia a los empresarios de la micro y pequeña empresa, sus familiares y sus empleados, acompañándolos en su desarrollo con productos y servicios financieros especializados e innovadores adaptados a sus necesidades</p>
</div>`,Ht=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Visión</h3>
    <p class="mvv-card-text">Ser el banco pionero de la revolución financiera digital para los empresarios de la micro y pequeña empresa; y que mejor comprende y sirve sus necesidades de desarrollo a través de un ecosistema de productos y servicios integrales e innovadores.".</p>
</div>`,Ut=`
<div class="mvv-card">
    <h3 class="mvv-card-title">Valores</h3>
    <p class="mvv-card-text">Cada día la cultura Integral se está fortaleciendo, todos los que pertenecemos a esta organización compartimos y vivimos los valores</p>
    <ul class="mvv-bullet-list">
        <li>Responsabilidad</li>
        <li>Compromiso social</li>
        <li>Integridad</li>
        <li>Excelencia</li>
    </ul>
</div>`,_e=`
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
</style>`,Ft=[{id:"about-section",label:"Nuestra Historia",category:"Contenido",media:Ot,content:`
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
                <img src="${O("images/placeholder.svg")}" alt="Imagen de sección">
            </div>
        </div>
    </div>
</section>
${_e}`},{id:"about-mvv-section",label:"Misión, Visión y Valores",category:"Contenido",media:Pt,content:`
<section class="mvv-section">
    <h2 class="mvv-section-title">Misión, Visión y Valores</h2>
    <div class="mvv-grid">
        ${Rt}
        ${Ht}
        ${Ut}
    </div>
</section>
${_e}`}],tt=function(){(function(){function t(i){if(!i||i.__pcInit)return;i.__pcInit=!0;var a=i.querySelector(".pc-carousel-wrap");if(!a)return;var r=!1,l=0,n=0,c=!1,g=0,d=0,f=0,v=null;a.querySelectorAll("img").forEach(function(h){h.setAttribute("draggable","false")}),setTimeout(function(){var h=a.scrollWidth-a.clientWidth;if(h<=0)return;var u=Math.min(60,h),E=null;function x(S){E||(E=S);var A=(S-E)/400;if(A<.5)a.scrollLeft=u*(A*2);else if(A<1)a.scrollLeft=u*(1-(A-.5)*2);else{a.scrollLeft=0;return}requestAnimationFrame(x)}requestAnimationFrame(x)},400),a.scrollLeft=0;function y(){return a.scrollWidth-a.clientWidth}function s(h){return Math.max(0,Math.min(h,y()))}function p(){Math.abs(g)<.5||(g*=.92,a.scrollLeft=s(a.scrollLeft+g),v=requestAnimationFrame(p))}a.addEventListener("mousedown",function(h){h.button===0&&(v&&(cancelAnimationFrame(v),v=null),r=!0,c=!1,g=0,l=h.clientX,d=h.clientX,f=Date.now(),n=a.scrollLeft,a.style.cursor="grabbing",h.preventDefault())}),document.addEventListener("mousemove",function(h){if(r){var u=l-h.clientX;Math.abs(u)>3&&(c=!0);var E=Date.now(),x=E-f||1;g=(h.clientX-d)/x*16*-1,d=h.clientX,f=E,a.scrollLeft=s(n+u)}}),document.addEventListener("mouseup",function(h){r&&(r=!1,a.style.cursor="grab",c&&(h.stopPropagation(),v=requestAnimationFrame(p)))}),a.addEventListener("click",function(h){c&&(h.preventDefault(),h.stopPropagation(),c=!1)},!0);var k=0,z=0,B=0,$=0,b=0;a.addEventListener("touchstart",function(h){v&&(cancelAnimationFrame(v),v=null),k=h.touches[0].clientX,B=h.touches[0].clientX,$=Date.now(),z=a.scrollLeft,b=0},{passive:!0}),a.addEventListener("touchmove",function(h){var u=Date.now(),E=u-$||1,x=h.touches[0].clientX;b=(x-B)/E*16*-1,B=x,$=u;var S=k-x;a.scrollLeft=s(z+S)},{passive:!0}),a.addEventListener("touchend",function(){v=requestAnimationFrame(function h(){Math.abs(b)<.5||(b*=.92,a.scrollLeft=s(a.scrollLeft+b),v=requestAnimationFrame(h))})},{passive:!0})}function e(){document.querySelectorAll(".pc-section").forEach(function(i){delete i.__pcInit,t(i)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()},Vt=`(${tt.toString()})();`,Xt=`
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
@media(max-width:480px){.pc-card{flex:0 0 80vw;}}`;function Wt(t){const e=t.img||O("images/placeholder.svg"),i=t.title||"TÍTULO DEL PRODUCTO",a=t.desc||"Descripción breve del producto financiero.",r=t.href||"#",l=t.btn_label||"Solicitar";return`<div class="pc-card"><div class="pc-card-img-wrap"><img src="${e}" alt="${i}" class="pc-card-img"></div><div class="pc-card-body"><h3 class="pc-card-title">${i}</h3><p class="pc-card-desc">${a}</p></div><a href="${r}" class="pc-btn">${l}</a></div>`}function it(t){const e=t.heading||"Créditos",i=t.subheading||"Opciones de financiamiento diseñadas para hacer realidad tus proyectos.",a=t.more_href||"#",r=t.more_label||"Ver más",l=t.show_more!==!1,c=(t.cards||[]).map(Wt).join(""),g=l?`<div class="pc-more-wrap"><a href="${a}" class="pc-more-btn">${r}</a></div>`:"";return`<section class="pc-section"><style>${Xt}</style><div style="text-align:center;margin-bottom:2rem;"><h2 class="pc-section-heading">${e}</h2><p class="pc-section-subheading">${i}</p></div><div class="pc-carousel-wrap"><div class="pc-track">${c}</div></div>${g}</section>`}const V={heading:"Créditos",subheading:"Opciones de financiamiento diseñadas para hacer realidad tus proyectos.",more_href:"#",more_label:"Ver más",cards:[{img:"",title:"CREDINVIERTE",desc:"Adquiere activos fijos",href:"#",btn_label:"Solicitar"},{img:"",title:"SOLUCIONES INTEGRALES",desc:"Financiamiento PYME",href:"#",btn_label:"Solicitar"},{img:"",title:"CREDI-CONFIAMOS",desc:"Rápido y sin fiador",href:"#",btn_label:"Solicitar"},{img:"",title:"CREDILÍNEA",desc:"Línea rotativa",href:"#",btn_label:"Solicitar"}]};function Yt(t,e){const i=document.getElementById("pc-config-modal");if(i&&i.remove(),!document.getElementById("pc-modal-styles")){const d=document.createElement("style");d.id="pc-modal-styles",d.textContent=`
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
        `,document.head.appendChild(d)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-product-cards-config"]||"{}")}catch{return{}}})(),r={heading:a.heading??V.heading,subheading:a.subheading??V.subheading,more_href:a.more_href??V.more_href,more_label:a.more_label??V.more_label,show_more:a.show_more??!0,cards:JSON.parse(JSON.stringify(a.cards??V.cards))},l=document.createElement("div");l.id="pc-config-modal",l.className="pc-overlay";const n=document.createElement("div");n.className="pc-modal",n.innerHTML=`
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
        </div>`,l.appendChild(n),document.body.appendChild(l),n.querySelectorAll(".pc-tab-btn").forEach(d=>{d.addEventListener("click",()=>{n.querySelectorAll(".pc-tab-btn").forEach(f=>f.classList.remove("active")),n.querySelectorAll(".pc-tab-panel").forEach(f=>f.classList.remove("active")),d.classList.add("active"),n.querySelector(`#pc-panel-${d.dataset.tab}`).classList.add("active")})}),n.querySelector("#pc-show-more").addEventListener("change",function(){r.show_more=this.checked,n.querySelector("#pc-more-fields").style.display=this.checked?"flex":"none"});function c(){const d=n.querySelector("#pc-cards-list");d.innerHTML="",r.cards.forEach((f,v)=>{const y=document.createElement("div");y.className="pc-card-config";const s=f.img?`<img class="pc-img-preview" src="${f.img}" alt="">`:'<div class="pc-img-placeholder"><i class="ri-image-line"></i></div>';y.innerHTML=`
                <div class="pc-card-config-header">
                    <span class="pc-card-num">${v+1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${v+1}</span>
                    <button class="pc-btn-remove pc-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="pc-row">
                    <div id="pc-img-wrap-${v}">${s}</div>
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
                </div>`,y.querySelectorAll("[data-field]").forEach(p=>{p.addEventListener("input",()=>{if(f[p.dataset.field]=p.value,p.dataset.field==="img"){const k=y.querySelector(`#pc-img-wrap-${v}`);k.innerHTML=p.value?`<img class="pc-img-preview" src="${p.value}" alt="">`:'<div class="pc-img-placeholder"><i class="ri-image-line"></i></div>'}})}),y.querySelector(".pc-pick-img").addEventListener("click",()=>{Le({type:"image",title:"Seleccionar imagen de tarjeta",onSelect:p=>{f.img=p,y.querySelector("[data-field='img']").value=p,y.querySelector(`#pc-img-wrap-${v}`).innerHTML=`<img class="pc-img-preview" src="${p}" alt="">`}})}),y.querySelector(".pc-remove-card").addEventListener("click",()=>{r.cards.splice(v,1),c()}),d.appendChild(y)})}c(),n.querySelector("#pc-add-card").addEventListener("click",()=>{r.cards.push({img:"",title:"NUEVO PRODUCTO",desc:"Descripción del producto.",href:"#",btn_label:"Solicitar"}),c(),n.querySelector("#pc-cards-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})});const g=()=>l.remove();n.querySelector("#pc-modal-close").addEventListener("click",g),n.querySelector("#pc-modal-cancel").addEventListener("click",g),l.addEventListener("click",d=>{d.target===l&&g()}),n.querySelector("#pc-modal-save").addEventListener("click",()=>{r.heading=n.querySelector("#pc-heading").value.trim()||V.heading,r.subheading=n.querySelector("#pc-subheading").value.trim()||V.subheading,r.show_more=n.querySelector("#pc-show-more").checked,r.more_label=n.querySelector("#pc-more-label").value.trim()||V.more_label,r.more_href=n.querySelector("#pc-more-href").value.trim()||"#",e.addAttributes({"data-product-cards-config":JSON.stringify(r)}),e.components(it(r)),setTimeout(()=>ye(t),300),g()})}function ye(t){try{const e=t.Canvas.getFrameEl()?.contentDocument;if(!e)return;const i=e.getElementById("pc-runtime-script");i&&i.remove(),e.querySelectorAll(".pc-section").forEach(r=>{delete r.__pcInit});const a=e.createElement("script");a.id="pc-runtime-script",a.textContent=Vt,e.head.appendChild(a)}catch(e){console.warn("[ProductCards] Error reiniciando carrusel:",e)}}const Gt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;function Jt(t){const e="product-cards-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección de Productos",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-product-cards-config":JSON.stringify(V)},components:it(V),script:tt,"script-props":["data-product-cards-config"],traits:[{type:"button",label:"Productos",text:"Administrar Sección",full:!0,command:"open-product-cards-config"}],toolbar:[]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-product-cards-config",{run(i){const a=i.getSelected();a&&Yt(i,a)}}),t.BlockManager.add("product-cards-block",{label:"Sección de productos",category:"Productos y Servicios",media:Gt,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),t.on("component:mount",i=>{i.getEl()?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>ye(t),400))}),t.on("component:selected",i=>{const a=i.getEl();if(!a)return;const r=a.closest(`[data-gjs-type="${e}"]`);if(r&&!a.hasAttribute("data-gjs-type")){const n=t.getWrapper().find(`[data-gjs-type="${e}"]`).find(c=>c.getEl()===r);n&&setTimeout(()=>t.select(n),0)}}),t.on("canvas:render",()=>{setTimeout(()=>ye(t),600)}),t.on("storage:end:load",()=>{setTimeout(()=>ye(t),800)})}const Zt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Te=`
<div class="flex flex-col gap-5 rounded-2xl p-8 dc-bg-primary">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold text-white">Lorem ipsum dolor</h3>
        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-outline w-full py-2 px-8 rounded-lg bg-white dc-text-primary text-base font-semibold text-center">Lorem ipsum</a>
</div>`,ze=`
<div class="flex flex-col gap-5 rounded-2xl p-8 bg-white border border-gray-200">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center dc-bg-light">
        <i class="ri-bank-line text-2xl dc-text-primary"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold dc-text-primary">Lorem ipsum dolor</h3>
        <p class="text-base dc-text-primary leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-solid w-full py-2 px-8 rounded-lg dc-bg-primary text-white text-base font-semibold text-center">Lorem ipsum</a>
</div>`,Ee=`
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
</style>`,Kt=[{id:"dual-card-section",label:"Sección dos tarjetas",category:"Productos y Servicios",media:Zt,content:`
<section class="dc-section">
    <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-[#003B71] mb-3">Lorem ipsum dolor sit amet</h2>
        <p class="text-base text-[#003B71]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <div class="dc-grid">
        ${Te}
        ${ze}
    </div>
</section>
${Ee}`},{id:"dual-card-dark",label:"Tarjeta azul oscuro",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="#003B71" rx="2"/>
            <rect x="5" y="5" width="6" height="6" fill="rgba(255,255,255,0.2)" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="white" fill-opacity="0.9"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="white"/>
        </svg>`,content:`${Te}${Ee}`},{id:"dual-card-light",label:"Tarjeta blanca",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="white" rx="2" stroke="#003B71" stroke-width="0.5" stroke-opacity="0.3"/>
            <rect x="5" y="5" width="6" height="6" fill="#dce8f5" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.8"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="#003B71"/>
        </svg>`,content:`${ze}${Ee}`}],Qt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="white" rx="2" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="8" y="7" width="16" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="11" width="12" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="11" y="13.5" width="10" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="6" y="18" width="9" height="5" rx="1.5" fill="#E97300"/>
    <rect x="17" y="18" width="9" height="5" rx="1.5" fill="white" stroke="#e5e7eb" stroke-width="0.8"/>
</svg>`,ei=`
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
</style>`,ti=[{id:"cta-section",label:"Llamada a la acción",category:"Llamadas a la acción",media:Qt,content:`
<section class="cta-section">
    <div class="cta-img-wrap">
        <img src="${O("images/placeholder.svg")}" alt="Imagen CTA">
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
${ei}`}],at=function(){(function(){function t(i){if(!i||i.__savInit)return;i.__savInit=!0;var a=i.querySelector(".sav-carousel-wrap");if(!a)return;a.scrollLeft=0;var r=!1,l=0,n=0,c=!1,g=0,d=0,f=0,v=null;a.querySelectorAll("img").forEach(function(h){h.setAttribute("draggable","false")}),setTimeout(function(){var h=a.scrollWidth-a.clientWidth;if(h<=0)return;var u=Math.min(60,h),E=null;function x(S){E||(E=S);var A=(S-E)/400;if(A<.5)a.scrollLeft=u*(A*2);else if(A<1)a.scrollLeft=u*(1-(A-.5)*2);else{a.scrollLeft=0;return}requestAnimationFrame(x)}requestAnimationFrame(x)},400);function y(){return a.scrollWidth-a.clientWidth}function s(h){return Math.max(0,Math.min(h,y()))}function p(){Math.abs(g)<.5||(g*=.92,a.scrollLeft=s(a.scrollLeft+g),v=requestAnimationFrame(p))}a.addEventListener("mousedown",function(h){h.button===0&&(v&&(cancelAnimationFrame(v),v=null),r=!0,c=!1,g=0,l=h.clientX,d=h.clientX,f=Date.now(),n=a.scrollLeft,a.style.cursor="grabbing",h.preventDefault())}),document.addEventListener("mousemove",function(h){if(r){var u=l-h.clientX;Math.abs(u)>3&&(c=!0);var E=Date.now(),x=E-f||1;g=(h.clientX-d)/x*16*-1,d=h.clientX,f=E,a.scrollLeft=s(n+u)}}),document.addEventListener("mouseup",function(h){r&&(r=!1,a.style.cursor="grab",c&&(h.stopPropagation(),v=requestAnimationFrame(p)))}),a.addEventListener("click",function(h){c&&(h.preventDefault(),h.stopPropagation(),c=!1)},!0);var k=0,z=0,B=0,$=0,b=0;a.addEventListener("touchstart",function(h){v&&(cancelAnimationFrame(v),v=null),k=h.touches[0].clientX,B=h.touches[0].clientX,$=Date.now(),z=a.scrollLeft,b=0},{passive:!0}),a.addEventListener("touchmove",function(h){var u=Date.now(),E=u-$||1,x=h.touches[0].clientX;b=(x-B)/E*16*-1,B=x,$=u;var S=k-x;a.scrollLeft=s(z+S)},{passive:!0}),a.addEventListener("touchend",function(){v=requestAnimationFrame(function h(){Math.abs(b)<.5||(b*=.92,a.scrollLeft=s(a.scrollLeft+b),v=requestAnimationFrame(h))})},{passive:!0})}function e(){document.querySelectorAll(".sav-section").forEach(function(i){delete i.__savInit,t(i)})}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",e):e()})()},ii=`(${at.toString()})();`,ai=`
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
@media(max-width:480px){.sav-card{flex:0 0 75vw;}}`;function ri(t){const e=t.img||O("images/placeholder.svg"),i=t.title||"TÍTULO DEL PRODUCTO",a=t.desc?`<p class="sav-card-desc">${t.desc}</p>`:"",r=t.href||"#",l=t.btn_label||"Solicitar";return`<div class="sav-card"><div class="sav-card-img-wrap"><img src="${e}" alt="${i}" class="sav-card-img"></div><h3 class="sav-card-title">${i}</h3>${a}<a href="${r}" class="sav-btn">${l}</a></div>`}function rt(t){const e=t.heading||"Depósitos y Cuentas de Ahorro",i=t.subheading||"Productos diseñados para hacer crecer tu dinero de forma segura.",a=t.more_href||"#",r=t.more_label||"Ver más",l=t.show_more!==!1,c=(t.cards||[]).map(ri).join(""),g=O("images/brand-watermark.png"),d=l?`<div class="sav-more-wrap"><a href="${a}" class="sav-more-btn">${r}</a></div>`:"";return`<section class="sav-section"><style>${ai}</style><div class="sav-blue-box"><div class="sav-watermark"><img src="${g}" alt=""></div><div style="display:flex;flex-direction:column;gap:0.5rem;text-align:center;position:relative;z-index:1;"><h2 class="sav-heading">${e}</h2><p class="sav-subheading">${i}</p></div><div class="sav-carousel-wrap"><div class="sav-track">${c}</div></div>${d}</div></section>`}const X={heading:"Depósitos y Cuentas de Ahorro",subheading:"Productos diseñados para hacer crecer tu dinero de forma segura.",more_href:"#",more_label:"Ver más",cards:[{img:"",title:"CUENTA DE AHORRO ESTÁNDAR",href:"#",btn_label:"Solicitar"},{img:"",title:"AHORRO RENTABLE",href:"#",btn_label:"Solicitar"},{img:"",title:"CUENTA DE AHORRO MÁS",href:"#",btn_label:"Solicitar"},{img:"",title:"DEPÓSITO DE PLAZO FIJO",href:"#",btn_label:"Solicitar"}]};function li(t,e){const i=document.getElementById("sav-config-modal");if(i&&i.remove(),!document.getElementById("sav-modal-styles")){const d=document.createElement("style");d.id="sav-modal-styles",d.textContent=`
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
        `,document.head.appendChild(d)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-savings-config"]||"{}")}catch{return{}}})(),r={heading:a.heading??X.heading,subheading:a.subheading??X.subheading,more_href:a.more_href??X.more_href,more_label:a.more_label??X.more_label,show_more:a.show_more??!0,cards:JSON.parse(JSON.stringify(a.cards??X.cards))},l=document.createElement("div");l.id="sav-config-modal",l.className="sav-overlay";const n=document.createElement("div");n.className="sav-modal",n.innerHTML=`
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
        </div>`,l.appendChild(n),document.body.appendChild(l),l.addEventListener("click",d=>{d.target===l&&g()}),n.querySelectorAll(".sav-tab-btn").forEach(d=>{d.addEventListener("click",()=>{n.querySelectorAll(".sav-tab-btn").forEach(f=>f.classList.remove("active")),n.querySelectorAll(".sav-tab-panel").forEach(f=>f.classList.remove("active")),d.classList.add("active"),n.querySelector(`#sav-panel-${d.dataset.tab}`).classList.add("active")})}),n.querySelector("#sav-show-more").addEventListener("change",function(){r.show_more=this.checked,n.querySelector("#sav-more-fields").style.display=this.checked?"flex":"none"});function c(){const d=n.querySelector("#sav-cards-list");d.innerHTML="",r.cards.forEach((f,v)=>{const y=document.createElement("div");y.className="sav-card-config";const s=f.img?`<img class="sav-img-preview" src="${f.img}" alt="">`:'<div class="sav-img-placeholder"><i class="ri-image-line"></i></div>';y.innerHTML=`
                <div class="sav-card-config-header">
                    <span class="sav-card-num">${v+1}</span>
                    <span style="font-size:0.875rem;font-weight:600;color:#1e293b;flex:1;">Tarjeta ${v+1}</span>
                    <button class="sav-btn-remove sav-remove-card"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="sav-row">
                    <div id="sav-img-wrap-${v}">${s}</div>
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
                </div>`,y.querySelectorAll("[data-field]").forEach(p=>{p.addEventListener("input",()=>{if(f[p.dataset.field]=p.value,p.dataset.field==="img"){const k=y.querySelector(`#sav-img-wrap-${v}`);k.innerHTML=p.value?`<img class="sav-img-preview" src="${p.value}" alt="">`:'<div class="sav-img-placeholder"><i class="ri-image-line"></i></div>'}})}),y.querySelector(".sav-pick-img").addEventListener("click",()=>{Le({type:"image",title:"Seleccionar imagen de tarjeta",onSelect:p=>{f.img=p,y.querySelector("[data-field='img']").value=p,y.querySelector(`#sav-img-wrap-${v}`).innerHTML=`<img class="sav-img-preview" src="${p}" alt="">`}})}),y.querySelector(".sav-remove-card").addEventListener("click",()=>{r.cards.splice(v,1),c()}),d.appendChild(y)})}c(),n.querySelector("#sav-add-card").addEventListener("click",()=>{r.cards.push({img:"",title:"NUEVO PRODUCTO",desc:"",href:"#",btn_label:"Solicitar"}),c(),n.querySelector("#sav-cards-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})});const g=()=>l.remove();n.querySelector("#sav-modal-close").addEventListener("click",g),n.querySelector("#sav-modal-cancel").addEventListener("click",g),n.querySelector("#sav-modal-save").addEventListener("click",()=>{r.heading=n.querySelector("#sav-heading").value.trim()||X.heading,r.subheading=n.querySelector("#sav-subheading").value.trim()||X.subheading,r.show_more=n.querySelector("#sav-show-more").checked,r.more_label=n.querySelector("#sav-more-label").value.trim()||X.more_label,r.more_href=n.querySelector("#sav-more-href").value.trim()||"#",e.addAttributes({"data-savings-config":JSON.stringify(r)}),e.components(rt(r)),setTimeout(()=>ve(t),300),g()})}function ve(t){try{const e=t.Canvas.getFrameEl()?.contentDocument;if(!e)return;const i=e.getElementById("sav-runtime-script");i&&i.remove(),e.querySelectorAll(".sav-section").forEach(r=>{delete r.__savInit});const a=e.createElement("script");a.id="sav-runtime-script",a.textContent=ii,e.head.appendChild(a)}catch(e){console.warn("[Savings] Error reiniciando carrusel:",e)}}const oi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;function ni(t){const e="savings-section-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección Fondo Azul",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!0,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-savings-config":JSON.stringify(X)},components:rt(X),script:at,"script-props":["data-savings-config"],traits:[{type:"button",label:"Sección",text:"Administrar Sección",full:!0,command:"open-savings-config"}],toolbar:[]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-savings-config",{run(i){const a=i.getSelected();a&&li(i,a)}}),t.BlockManager.add("savings-section-block",{label:"Sección Fondo Azul",category:"Productos y Servicios",media:oi,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}}),t.on("component:mount",i=>{i.getEl()?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>ve(t),400))}),t.on("component:selected",i=>{const a=i.getEl();if(!a)return;const r=a.closest(`[data-gjs-type="${e}"]`);if(r&&!a.hasAttribute("data-gjs-type")){const l=t.getWrapper().find(`[data-gjs-type="${e}"]`).find(n=>n.getEl()===r);l&&setTimeout(()=>t.select(l),0)}}),t.on("canvas:render",()=>setTimeout(()=>ve(t),600)),t.on("storage:end:load",()=>setTimeout(()=>ve(t),800))}const Ie=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="2" y="2" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="2" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="2" y="12" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
    <rect x="17" y="12" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="2" y="22" width="13" height="8" fill="#F07C28" rx="1.5"/>
    <rect x="17" y="22" width="13" height="8" fill="rgba(255,255,255,0.2)" rx="1.5"/>
</svg>`,si=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#F07C28" rx="2"/>
    <rect x="4" y="10" width="14" height="2.5" fill="white" rx="1"/>
    <rect x="4" y="15" width="10" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
    <ellipse cx="24" cy="20" rx="7" ry="9" fill="rgba(255,255,255,0.18)"/>
    <circle cx="22" cy="10" r="3.5" fill="rgba(255,255,255,0.25)"/>
</svg>`,ci=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="4" y="10" width="14" height="2.5" fill="white" rx="1"/>
    <rect x="4" y="15" width="10" height="2" fill="rgba(255,255,255,0.6)" rx="1"/>
    <ellipse cx="24" cy="20" rx="7" ry="9" fill="rgba(255,255,255,0.18)"/>
    <circle cx="22" cy="10" r="3.5" fill="rgba(255,255,255,0.25)"/>
</svg>`,ie=`
<a href="#" class="plc-card plc-card--orange">
    <span class="plc-card__title">NOMBRE DEL PRODUCTO</span>
    <div class="plc-card__watermark">
        <img src="${O("images/brand-watermark.png")}" alt="">
    </div>
</a>`,ae=`
<a href="#" class="plc-card plc-card--blue">
    <span class="plc-card__title">NOMBRE DEL PRODUCTO</span>
    <div class="plc-card__watermark">
        <img src="${O("images/brand-watermark.png")}" alt="">
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
</style>`,di=[{id:"product-link-cards",label:"Tarjetas de productos con enlace",category:"Productos y Servicios",media:Ie,content:`
<section class="plc-section">
    <div class="plc-header">
        <h2 class="plc-header__title">Nuestros Productos</h2>
        <p class="plc-header__subtitle">Encuentra el producto financiero ideal para ti.</p>
    </div>
    <div class="plc-grid">
        ${ie}
        ${ae}
        ${ie}
        ${ae}
        ${ae}
        ${ie}
        ${ae}
        ${ie}
    </div>
</section>
${$e}`},{id:"product-link-card-orange",label:"Tarjeta producto naranja",category:"Productos y Servicios",media:Ie,media:si,content:`${ie}${$e}`},{id:"product-link-card-blue",label:"Tarjeta producto azul",category:"Productos y Servicios",media:ci,content:`${ae}${$e}`}],fi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,hi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#E97300" fill-opacity="0.85"/>
    <rect x="13" y="10" width="6" height="4" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="10" y="21" width="12" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.7"/>
    <rect x="11" y="24" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
</svg>`,re=`
<a href="#" class="flex flex-col items-center text-center gap-4 no-underline il-link-item">
    <div class="w-16 h-16 rounded-full flex items-center justify-center shrink-0 il-icon-badge">
        <img src="${O("images/placeholder.svg")}" alt="" class="w-8 h-8 object-contain">
    </div>
    <span class="text-base font-semibold leading-snug il-link-label transition-colors duration-200">Nombre del servicio</span>
</a>`,Ae=`
<style>
.il-section{width:100%;background:#ffffff;padding:3.5rem 4rem;}
.il-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
.il-icon-badge{background-color:#E97300;}
.il-link-label{color:#003B71;}
.il-link-item:hover .il-link-label{color:#E97300;}
@media(max-width:1280px){.il-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.il-section{padding:2.5rem 1.5rem;}.il-grid{grid-template-columns:repeat(2,1fr);gap:2rem;}}
@media(max-width:480px){.il-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem;}}
</style>`,gi=[{id:"icon-links-strip",label:"Iconos con enlace",category:"Productos y Servicios",media:fi,content:`
<section class="il-section">
    <div class="il-grid">
        ${re}
        ${re}
        ${re}
        ${re}
    </div>
</section>
${Ae}`},{id:"icon-link-item",label:"Icono con enlace",category:"Productos y Servicios",media:hi,content:`${re}${Ae}`}],pi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,mi=`
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
</style>`,bi=[{id:"promo-cta",label:"Promo con CTA y precio",category:"Llamadas a la acción",media:pi,content:`
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
${mi}`}],ui=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="8" width="32" height="24" fill="#E97300" rx="0"/>
    <rect x="0" y="8" width="32" height="24" fill="#E97300"/>
    <path d="M0 8 Q0 2 8 2 L32 2 L32 8 Z" fill="#E97300"/>
    <rect x="2" y="10" width="12" height="18" fill="rgba(255,255,255,0.15)" rx="1"/>
    <circle cx="8" cy="17" r="3" fill="rgba(255,255,255,0.3)"/>
    <path d="M2 26 L6 21 L9 24 L11 22 L14 26 Z" fill="rgba(255,255,255,0.2)"/>
    <rect x="16" y="10" width="14" height="3" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="16" y="15" width="14" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <rect x="16" y="17.5" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <circle cx="17.5" cy="22" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="20" y="21.3" width="8" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
    <circle cx="17.5" cy="25" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="20" y="24.3" width="6" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
</svg>`,xi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="8" width="32" height="24" fill="#E97300"/>
    <path d="M0 8 L24 8 Q32 8 32 2 L32 2 L0 2 Z" fill="#E97300"/>
    <rect x="18" y="10" width="12" height="18" fill="rgba(255,255,255,0.15)" rx="1"/>
    <circle cx="24" cy="17" r="3" fill="rgba(255,255,255,0.3)"/>
    <path d="M18 26 L22 21 L25 24 L27 22 L30 26 Z" fill="rgba(255,255,255,0.2)"/>
    <rect x="2" y="10" width="14" height="3" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="2" y="15" width="14" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <rect x="2" y="17.5" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
    <circle cx="3.5" cy="22" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="6" y="21.3" width="8" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
    <circle cx="3.5" cy="25" r="1.2" fill="white" fill-opacity="0.9"/>
    <rect x="6" y="24.3" width="6" height="1" rx="0.5" fill="white" fill-opacity="0.7"/>
</svg>`,ge=`
<div class="flex items-center gap-3">
    <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white">
        <i class="ri-shield-check-line text-lg text-[#E97300]"></i>
    </div>
    <p class="text-white text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`,qe=`
<div class="flex flex-col gap-4">
    <h2 class="text-4xl font-bold leading-tight flex flex-wrap items-center gap-2">
        <span class="bg-[#003B71] text-white text-3xl font-bold px-3 py-1 rounded-lg leading-tight">Mi</span>
        <span class="text-[#003B71]">Banca</span>
        <span class="text-white font-bold">Integral</span>
    </h2>
    <p class="text-white text-base leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-3">
        ${ge}
        ${ge}
        ${ge}
        ${ge}
    </div>
</div>`,De=`
<div class="fb-img-wrap">
    <img src="${O("images/placeholder.svg")}" alt="Imagen" class="fb-img">
</div>`,yi=`
<style>
.fb-section-right{width:100%;background:#E97300;padding:3rem 4rem 3rem 4rem;border-radius:200px 0 0 0;}
.fb-section-left{width:100%;background:#E97300;padding:3rem 4rem 3rem 4rem;border-radius:0 200px 0 0;}
.fb-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.fb-img-wrap{width:100%;border-radius:0.75rem;overflow:hidden;}
.fb-img{width:100%;height:100%;object-fit:cover;display:block;min-height:320px;max-height:480px;}
@media(max-width:992px){
    .fb-section-right{padding:2.5rem 1.5rem;border-radius:110px 0 0 0;}
    .fb-section-left{padding:2.5rem 1.5rem;border-radius:0 110px 0 0;}
    .fb-grid{grid-template-columns:1fr;gap:2rem;}
}
@media(max-width:580px){
    .fb-section-right{padding:2rem 1rem;border-radius:60px 0 0 0;}
    .fb-section-left{padding:2rem 1rem;border-radius:0 60px 0 0;}
}
</style>`,Me=t=>{const e=t?"fb-section-right":"fb-section-left",i=t?`<div>${qe}</div><div>${De}</div>`:`<div>${De}</div><div>${qe}</div>`;return`
<section class="${e}">
    <div class="fb-grid">
        ${i}
    </div>
</section>
${yi}`},vi=[{id:"feature-orange-img-right",label:"Sección naranja - imagen derecha",category:"Banners",media:ui,content:Me(!0)},{id:"feature-orange-img-left",label:"Sección naranja - imagen izquierda",category:"Banners",media:xi,content:Me(!1)}],wi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="5" rx="1" fill="#003B71"/>
    <rect x="12" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="22" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="11" width="28" height="17" rx="2" fill="#003B71" fill-opacity="0.08" stroke="#003B71" stroke-width="1"/>
    <rect x="5" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="14" width="4" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`,je=`
.tabs-btn{transition:background 0.2s,color 0.2s;}
.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}
.tabs-panel{display:none;}
.tabs-panel.active{display:grid;}
.tab-card:hover{background:#003B71;}
.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}
.tab-card:hover .tab-card-title{color:#ffffff;}
.tab-card:hover .tab-card-text{color:#ffffff;}`;function ki(){return function(){const t=this,e=".tabs-btn{transition:background 0.2s,color 0.2s;}.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}.tabs-panel{display:none;}.tabs-panel.active{display:grid;}.tab-card:hover{background:#003B71;}.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}.tab-card:hover .tab-card-title{color:#ffffff;}.tab-card:hover .tab-card-text{color:#ffffff;}";(function(){const r=t.ownerDocument??document;if(!r.getElementById("tabs-section-styles")){const l=r.createElement("style");l.id="tabs-section-styles",l.textContent=e,r.head.appendChild(l)}})();function i(a){t.querySelectorAll(".tabs-btn").forEach((r,l)=>{r.classList.toggle("active",l===a)}),t.querySelectorAll(".tabs-panel").forEach((r,l)=>{r.classList.toggle("active",l===a)})}t.querySelectorAll(".tabs-btn").forEach((a,r)=>{a.addEventListener("click",()=>i(r))}),i(0)}}const H=()=>`
<div class="tab-card flex flex-col items-center text-center p-8 border-2 border-[#003B71] rounded-2xl gap-4 cursor-pointer transition-all duration-200">
    <div class="tab-card-icon w-14 h-14 rounded-full border-2 border-[#003B71] flex items-center justify-center text-2xl text-[#003B71] shrink-0 transition-all duration-200">
        <i class="ri-lightbulb-line"></i>
    </div>
    <h3 class="tab-card-title text-lg font-bold text-[#003B71] transition-colors duration-200">Lorem ipsum</h3>
    <p class="tab-card-text text-base font-normal leading-relaxed text-[#003B71] transition-colors duration-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>`,le=t=>`
<div class="tabs-panel${t===0?" active":""} grid-cols-3 gap-5">
    ${H()}
    ${H()}
    ${H()}
    ${H()}
    ${H()}
    ${H()}
</div>`,Bi=`
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
<style>${je}</style>`,Ei=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="none" stroke="#003B71" stroke-width="2"/>
    <circle cx="16" cy="10" r="4" fill="none" stroke="#003B71" stroke-width="1.5"/>
    <rect x="8" y="17" width="16" height="2" rx="1" fill="#003B71"/>
    <rect x="6" y="22" width="20" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,$i=[{id:"tabs-cards",label:"Sección con tabs",category:"Contenido",media:wi,content:{type:"tabs-cards-component"}},{id:"tab-card-single",label:"Tarjeta de tab",category:"Contenido",media:Ei,content:`${H()}`}];function Si(t){const e="tabs-cards-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección con tabs",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,attributes:{"data-gjs-type":e,"data-tab-count":"5"},components:Bi,script:ki(),traits:[{type:"number",name:"data-tab-count",label:"Número de tabs (2-10)",min:2,max:10,changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",(i,a)=>{const r=parseInt(a["data-tab-count"]);isNaN(r)||this.updateTabCount(r)})},updateTabCount(i){const a=Math.min(10,Math.max(2,i)),r=l=>{const n=Array.from({length:l},()=>'<button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>').join(`
`),c=Array.from({length:l},(g,d)=>`<div class="tabs-panel${d===0?" active":""} grid-cols-3 gap-5">
                            ${H()}
                            ${H()}
                            ${H()}
                            ${H()}
                            ${H()}
                            ${H()}
                        </div>`).join(`
`);return`
                    <div class="max-w-6xl mx-auto px-6 flex flex-col gap-8 py-16">
                        <div class="text-center flex flex-col gap-4 max-w-2xl mx-auto">
                            <h2 class="text-4xl font-bold leading-tight text-[#003B71]">Lorem ipsum dolor sit amet consectetur</h2>
                            <p class="text-base font-normal leading-relaxed text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <nav class="flex flex-wrap justify-center gap-2">${n}</nav>
                        <div class="tabs-body">${c}</div>
                    </div>
                    <style>${je}</style>`};this.components(r(a)),setTimeout(()=>{const l=this.get("script"),n=this.getEl();l&&typeof l=="function"&&n&&l.call(n)},200)}}}),Ci(t,e),Li(t,e)}function Ci(t,e){t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},300))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();a&&setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},300)}}),t.on("storage:end:load",()=>{setTimeout(()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})},800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function Li(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#tabs-section-styles")){const r=document.createElement("style");r.id="tabs-section-styles",r.textContent=je,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,a.appendChild(r)}}})}const ji=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,_i=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ti=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,zi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ne=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="7" cy="10" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="8.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <circle cx="7" cy="22" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="20.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
</svg>`,Q=t=>`
<div class="split-list-item flex items-center gap-3">
    <div class="bg-[#E97300] w-10 h-10 rounded-full flex items-center justify-center shrink-0">
        <i class="ri-shield-check-line text-lg text-white"></i>
    </div>
    <p class="${t==="light"?"text-[#003B71]":"text-white"} text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`,Ii=t=>{const e=t==="light";return`
<div class="flex flex-col gap-4">
    <h2 class="text-4xl font-bold leading-tight flex flex-wrap items-center gap-2">
        <span class="${e?"bg-[#003B71]":"bg-white"} ${e?"text-white":"text-[#003B71]"} text-3xl font-bold px-3 py-1 rounded-lg leading-tight">Mi</span>
        <span class="${e?"text-[#003B71]":"text-white"}">Banca</span>
        <span class="text-[#E97300]">Integral</span>
    </h2>
    <p class="${e?"text-[#003B71]":"text-white"} text-base leading-relaxed text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-3">
        ${Q(t)}
        ${Q(t)}
        ${Q(t)}
        ${Q(t)}
    </div>
</div>`},Ai=()=>`
<div class="w-full rounded-2xl overflow-hidden">
    <img src="${O("images/placeholder.svg")}"
         alt="Imagen de sección"
         class="w-full object-cover block rounded-2xl"
         style="min-height:320px;max-height:480px;">
</div>`,qi=`
<style>
.split-section{width:100%;padding:3rem 4rem;}
.split-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.split-list-item{min-height:44px;}
@media(max-width:1280px){.split-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.split-section{padding:2.5rem 1.5rem;}.split-grid{grid-template-columns:1fr;gap:2rem;}}
</style>`,pe=(t,e)=>{const i=Ii(e),a=Ai(),r=e==="dark"?"bg-[#003B71]":"bg-white",l=t?`<div>${i}</div><div>${a}</div>`:`<div class="split-img-mobile-first">${a}</div><div>${i}</div>`;return`
<section class="split-section ${r}">
    <div class="split-grid">
        ${l}
    </div>
</section>
${qi}`},Di=[{id:"split-content-light-img-right",label:"Contenido claro - imagen derecha",category:"Contenido",media:ji,content:pe(!0,"light")},{id:"split-content-light-img-left",label:"Contenido claro - imagen izquierda",category:"Contenido",media:_i,content:pe(!1,"light")},{id:"split-content-dark-img-right",label:"Contenido azul - imagen derecha",category:"Contenido",media:Ti,content:pe(!0,"dark")},{id:"split-content-dark-img-left",label:"Contenido azul - imagen izquierda",category:"Contenido",media:zi,content:pe(!1,"dark")},{id:"split-list-item",label:"Item de lista con badge",category:"Contenido",media:Ne,content:Q("light")},{id:"split-list-group",label:"Lista con badges",category:"Contenido",media:Ne,content:`
<div class="flex flex-col gap-4">
    ${Q("light")}
    ${Q("light")}
    ${Q("light")}
</div>`}],Mi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="0" y="6" width="10" height="22" fill="white"/>
    <path d="M10 6 Q10 6 16 6 L16 28 Q10 28 10 22 Z" fill="#E97300"/>
    <circle cx="22" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="22" cy="14" r="1.5" fill="white"/>
    <rect x="18" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,Ni=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="22" y="6" width="10" height="22" fill="white"/>
    <path d="M22 6 Q16 6 16 6 L16 28 Q22 28 22 22 Z" fill="#E97300"/>
    <circle cx="10" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="10" cy="14" r="1.5" fill="white"/>
    <rect x="6" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="7" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,me=`
<div class="flex flex-col items-center gap-3 text-center">
    <div class="w-14 h-14 rounded-full flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-1">
        <p class="text-lg font-bold text-white">Lorem ipsum</p>
        <p class="text-base text-white">Lorem ipsum dolor sit amet</p>
    </div>
</div>`,Oi=`
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
</style>`,Oe=t=>`
<div class="ss-section">
    <div class="ss-curve-${t?"left":"right"}">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-white mb-3 leading-tight">Lorem ipsum dolor sit amet</h2>
            <p class="text-base text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="ss-grid">
            ${me}
            ${me}
            ${me}
            ${me}
        </div>
    </div>
</div>
${Oi}`,Pi=[{id:"stats-strip-left",label:"Franja estadísticas - izquierda",category:"Heroes",media:Mi,content:Oe(!0)},{id:"stats-strip-right",label:"Franja estadísticas - derecha",category:"Heroes",media:Ni,content:Oe(!1)}],Ri=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Hi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#166EBE"/>
    <rect x="8" y="21" width="16" height="2" rx="1" fill="white" fill-opacity="0.8"/>
    <rect x="10" y="24.5" width="12" height="1.5" rx="0.75" fill="white" fill-opacity="0.5"/>
</svg>`,oe=`
<div class="flex flex-col items-center gap-4 text-center">
    <div class="w-20 h-20 rounded-full flex items-center justify-center shrink-0" style="background:#166EBE;">
        <img src="${O("images/placeholder.svg")}" alt="Icono" class="w-10 h-10 object-contain">
    </div>
    <h3 class="text-sm font-bold text-white uppercase leading-snug tracking-wide">Lorem ipsum dolor sit amet</h3>
</div>`,Pe=`
<style>
.svc-section{width:100%;background:#003B71;padding:3rem 4rem;}
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;margin-top:3rem;}
.svc-more-wrap{display:flex;justify-content:center;margin-top:3rem;}
.svc-more-btn{display:inline-block;padding:0.6rem 2.5rem;border-radius:9999px;background:#ffffff;color:#003B71;font-size:1rem;font-weight:600;text-decoration:none;transition:background 0.2s,color 0.2s;}
.svc-more-btn:hover{background:#dce8f5;}
@media(max-width:1280px){.svc-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.svc-section{padding:2.5rem 1.5rem;}.svc-grid{grid-template-columns:repeat(2,1fr);gap:2rem;}}
@media(max-width:480px){.svc-grid{grid-template-columns:repeat(2,1fr);gap:1.5rem;}}
</style>`,Ui=[{id:"service-cards-section",label:"Sección de servicios con iconos",category:"Productos y Servicios",media:Ri,content:`
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
${Pe}`},{id:"service-card-item",label:"Ítem de servicio con icono",category:"Productos y Servicios",media:Hi,content:`${oe}${Pe}`}],Fi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="9" width="30" height="14" fill="white" rx="7" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="4" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="13" width="6" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="10" y="16" width="5" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="17.5" y="12" width="0.8" height="8" rx="0.4" fill="#e5e7eb"/>
    <rect x="20" y="13" width="4" height="6" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="25.5" y="13" width="0" height="0" rx="0"/>
</svg>`,Vi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="2" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="5.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="5.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="8.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
    <rect x="3" y="18" width="26" height="12" fill="white" rx="6" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="6" y="21.5" width="4" height="5" rx="1" fill="#E97300" fill-opacity="0.9"/>
    <rect x="12" y="21.5" width="9" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="12" y="24.5" width="7" height="1.2" rx="0.6" fill="#E97300" fill-opacity="0.8"/>
</svg>`,Xi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</div>`,Se=`
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
</style>`,Wi=[{id:"contact-info-row",label:"Contacto en fila",category:"Contacto",media:Fi,content:`
<section class="ci-section">
    <div class="ci-row-wrap">
        <div class="ci-pill-row">
            ${ne("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
            <div class="ci-divider"></div>
            ${ne("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com")}
        </div>
    </div>
</section>
${Se}`},{id:"contact-info-col",label:"Contacto en columna",category:"Contacto",media:Vi,content:`
<section class="ci-section">
    <div class="ci-col-wrap">
        <div class="ci-pill-col">
            ${ne("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
            <div class="ci-divider-h"></div>
            ${ne("ri-mail-fill","Correo","servicio.cliente@bancointegral.com","mailto:servicio.cliente@bancointegral.com")}
        </div>
    </div>
</section>
${Se}`},{id:"contact-info-item",label:"Ítem de contacto",category:"Contacto",media:Xi,content:`
<section class="ci-section">
    <div class="ci-row-wrap">
        <div class="ci-pill-row">
            ${ne("ri-phone-fill","Contáctenos","(503)-2250-6090","tel:+50322506090")}
        </div>
    </div>
</section>
${Se}`}],Yi=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <circle cx="6" cy="8" r="2" fill="#F07C28"/>
    <rect x="10" y="7" width="16" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="10" y="11" width="14" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="10" y="13.5" width="12" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <circle cx="6" cy="19" r="2" fill="#F07C28"/>
    <rect x="10" y="18" width="16" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="10" y="22" width="14" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
    <rect x="10" y="24.5" width="12" height="1.2" fill="rgba(255,255,255,0.4)" rx="1"/>
</svg>`,Gi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</div>`,Re=`
<style>
.rl-section{width:100%;padding:3rem 4rem;background:#ffffff;box-sizing:border-box;}
.rl-list{display:flex;flex-direction:column;gap:1.75rem;}
.rl-item__title{color:#F07C28;}
.rl-bullet{color:#F07C28;font-size:1.25rem;line-height:1;}
.rl-item__body{color:#003B71;}
@media(max-width:1280px){.rl-section{padding:3rem 2.5rem;}}
@media(max-width:992px){.rl-section{padding:2.5rem 1.5rem;}}
</style>`,Ji=[{id:"rich-list",label:"Lista con título y descripción",category:"Contenido",media:Yi,content:`
<section class="rl-section">
    <div class="rl-list">
        ${se}
        ${se}
        ${se}
        ${se}
    </div>
</section>
${Re}`},{id:"rich-list-item",label:"Ítem de lista con descripción",category:"Contenido",media:Gi,content:`
<section class="rl-section">
    <div class="rl-list">
        ${se}
    </div>
</section>
${Re}`}],be=`
<style>
.pd-asymmetric-grid{display:grid;grid-template-columns:3fr 2fr;gap:2rem;align-items:start;}
@media(max-width:992px){.pd-asymmetric-grid{grid-template-columns:1fr;gap:1.5rem;}}
</style>`,Zi=`
<style>
.pd-three-col-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem;align-items:start;}
.pd-three-col-grid>div:last-child:nth-child(3n+1){grid-column:1/-1;max-width:33%;margin:0 auto;}
@media(max-width:992px){.pd-three-col-grid{gap:1.5rem;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:50%;}}
@media(max-width:640px){.pd-three-col-grid{grid-template-columns:1fr;}.pd-three-col-grid>div:last-child:nth-child(3n+1){max-width:none;}}
</style>`,G=`
<style>
.pd-text-muted{color:#6b7280;}
.pd-dot-muted{background-color:#6b7280;}
.pd-btn-orange{background-color:#E97300;}
.pd-btn-orange:hover{background-color:#c96200;}
.pd-box-border{border-color:#003B71;}
.pd-text-primary{color:#003B71;}
.pd-text-orange{color:#E97300;}
.pd-box-divider{background-color:#E97300;}
</style>`,Ki=`
<style>
.pd-cards-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;}
.pd-card{background:#fff;border-radius:0.75rem;box-shadow:0 2px 12px 0 rgba(0,0,0,0.08);padding:1.5rem;display:flex;flex-direction:column;gap:0.75rem;}
@media(max-width:640px){.pd-cards-grid{grid-template-columns:1fr;}}
</style>`,Qi=`
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
</style>`,ea=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ta=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ia=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ue=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,aa=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ra=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="6" cy="10" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="9" width="18" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <circle cx="6" cy="17" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="16" width="16" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
    <circle cx="6" cy="24" r="2" fill="#003B71" fill-opacity="0.6"/>
    <rect x="10" y="23" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,la=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="5" width="26" height="1.5" rx="0.75" fill="#9ca3af" fill-opacity="0.5"/>
    <rect x="3" y="9" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="11.5" width="20" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="16" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="18.5" width="22" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="23" width="26" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
    <rect x="3" y="25.5" width="18" height="1" rx="0.5" fill="#9ca3af" fill-opacity="0.4"/>
</svg>`,L=`
<li class="flex items-start gap-2 text-base text-[#003B71]">
    <span class="mt-2 w-1.5 h-1.5 rounded-full bg-[#003B71] shrink-0"></span>
    <span>Lorem ipsum dolor sit amet consectetur adipiscing elit.</span>
</li>`,N=`
<p class="text-sm pd-text-muted leading-relaxed text-justify m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,He=`
<div class="w-full rounded-xl border-2 pd-box-border px-6 py-4 flex flex-col items-center justify-center gap-1 text-center">
    <span class="text-2xl font-bold pd-text-primary uppercase tracking-wide">Invierte desde:</span>
    <span class="text-2xl font-black pd-text-orange">$00.00</span>
</div>`,Ue=`
<div class="flex flex-col items-center justify-center gap-1 py-4 px-6">
    <span class="text-lg font-bold pd-text-primary uppercase tracking-wide leading-snug">Invierte desde:</span>
    <span class="text-lg font-bold pd-text-primary">Hasta: <span class="pd-text-orange">$00.00</span></span>
</div>`,Fe=`
<div class="w-full rounded-xl border-2 pd-box-border flex flex-col">
    ${Ue}
    <div class="px-6">
        <div class="w-full h-0.5 pd-box-divider"></div>
    </div>
    ${Ue}
</div>`,xe=t=>`
<div class="pd-card items-center">
    <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0 pd-btn-orange">
        <img src="${O("images/placeholder.svg")}" alt="" class="w-6 h-6 object-contain">
    </div>
    <span class="text-sm font-bold text-[#E97300] uppercase tracking-wide leading-snug w-full">  ${t}</span>
    <ul class="list-none p-0 m-0 flex flex-col gap-2 w-full">
        ${L}
        ${L}
        ${L}
    </ul>
</div>`,oa=[{id:"product-detail-section",label:"Detalle de producto",category:"Productos y Servicios",media:aa,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Diseñado para empresarios que desean maximizar la rentabilidad de sus ahorros. Tasa de interés preferencial, con intereses capitalizados mensualmente.</p>
            <div class="flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-3">
                    ${L}
                    ${L}
                    ${L}
                    ${L}
                    ${L}
                </ul>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] break-words uppercase leading-tight text-center w-full">Ahorro Rentable</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            <div class="w-full flex flex-col gap-2 pt-3">
                ${N}
                ${N}
                ${N}
            </div>
        </div>
    </div>
</section>
${be}
${G}`},{id:"product-detail-cards-grid",label:"Detalle de producto con tarjetas",category:"Productos y Servicios",media:ea,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg text-[#003B71] leading-snug m-0">Nos interesa la salud y bienestar de nuestros clientes, por eso te ofrecemos este servicio, disponible y exclusivo al contratar y mantener al día tu crédito.</p>
            <div class="pd-cards-grid">
                ${xe("Cobertura para accidente")}
                ${xe("Exámenes de laboratorio")}
                ${xe("Medicamentos")}
                ${xe("Consultas médicas")}
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] uppercase leading-tight text-center w-full break-words">Microseguro de Salud</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu servicio</a>
            <div class="w-full flex flex-col gap-2 pt-1">
                ${N}
                ${N}
            </div>
            <div class="w-full flex flex-col gap-3 pt-2">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-2">
                    ${L}
                    ${L}
                    ${L}
                    ${L}
                </ul>
            </div>
            <div class="w-full flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Condiciones:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-2">
                    ${L}
                    ${L}
                </ul>
            </div>
        </div>
    </div>
</section>
${be}
${Ki}
${G}`},{id:"product-detail-box",label:"Detalle de producto con cuadro de precio",category:"Productos y Servicios",media:ue,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Diseñado para empresarios que desean maximizar la rentabilidad de sus ahorros. Tasa de interés preferencial, con intereses capitalizados mensualmente.</p>
            <div class="flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-3">
                    ${L}
                    ${L}
                    ${L}
                    ${L}
                </ul>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] break-words uppercase leading-tight text-center w-full">Ahorro Rentable</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            ${He}
            <div class="w-full flex flex-col gap-2 pt-3">
                ${N}
                ${N}
                ${N}
            </div>
        </div>
    </div>
</section>
${be}
${G}`},{id:"product-detail-three-col",label:"Detalle de producto (3 columnas)",category:"Productos y Servicios",media:ia,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-three-col-grid">
        <div class="flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas:</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${L}
                ${L}
                ${L}
            </ul>
        </div>
        <div class="flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Beneficios:</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${L}
                ${L}
                ${L}
            </ul>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] break-words uppercase leading-tight text-center w-full">Ahorro Rentable</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            <div class="w-full flex flex-col gap-2 pt-3">
                ${N}
                ${N}
                ${N}
            </div>
        </div>
    </div>
</section>
${Zi}
${G}`},{id:"product-detail-header-grid",label:"Detalle de producto (encabezado + 2 columnas)",category:"Productos y Servicios",media:ta,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-header-grid">
        <div class="pd-hg-intro">
            <p class="text-lg font-bold text-[#003B71] leading-snug m-0">Invierte en el futuro de tu negocio con financiamiento flexible, atención personalizada y el respaldo necesario para seguir creciendo.</p>
        </div>
        <div class="pd-hg-col1 flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${L}
                ${L}
                ${L}
                ${L}
            </ul>
        </div>
        <div class="pd-hg-col2 flex flex-col gap-3">
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Requisitos</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-3">
                ${L}
                ${L}
            </ul>
        </div>
        <div class="pd-hg-action flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] break-words uppercase leading-tight text-center w-full">Credinvierte</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Adquiere tu cuenta</a>
            <div class="w-full flex flex-col gap-2 pt-3">
                ${N}
                ${N}
                ${N}
            </div>
        </div>
    </div>
</section>
${Qi}
${G}`},{id:"product-detail-box-double",label:"Detalle de producto con cuadro de precio doble",category:"Productos y Servicios",media:ue,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="pd-asymmetric-grid">
        <div class="flex flex-col gap-5">
            <p class="text-lg font-bold text-[#003B71] leading-snug">Impulsa tu negocio con financiamiento ágil y flexible, diseñado para ayudarte a crecer, invertir y aprovechar nuevas oportunidades.</p>
            <p class="text-base font-bold text-[#E97300] uppercase leading-snug">Créditos para tu negocio, créditos sin garantía, crédito para cliente nuevo o recurrente; con experiencia crediticia.</p>
            <div class="flex flex-col gap-3">
                <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Ventajas</span>
                <ul class="list-none p-0 m-0 flex flex-col gap-3">
                    ${L}
                    ${L}
                    ${L}
                    ${L}
                    ${L}
                    ${L}
                </ul>
            </div>
        </div>
        <div class="flex flex-col items-center gap-4">
            <h2 class="text-4xl font-black text-[#E97300] break-words uppercase leading-tight text-center w-full">Soluciones Integrales</h2>
            <a href="#" class="inline-block py-3 px-8 rounded-full pd-btn-orange text-white text-base font-bold text-center uppercase tracking-wide max-w-full transition-colors no-underline">Solicita tu crédito</a>
            ${Fe}
            <div class="w-full flex flex-col gap-2 pt-3">
                ${N}
                ${N}
            </div>
        </div>
    </div>
</section>
${be}
${G}`},{id:"product-detail-bullet",label:"Ítem de ventaja",category:"Productos y Servicios",media:ra,content:`
<ul class="list-none p-0 m-0 flex flex-col gap-3">
    ${L}
</ul>`},{id:"product-detail-footnote",label:"Nota al pie",category:"Productos y Servicios",media:la,content:`
<div class="w-full flex flex-col gap-2">
    ${N}
</div>
${G}`},{id:"product-detail-price-box",label:"Cuadro de precio",category:"Productos y Servicios",media:ue,content:`
${He}
${G}`},{id:"product-detail-price-box-double",label:"Cuadro de precio doble",category:"Productos y Servicios",media:ue,content:`
${Fe}
${G}`}],Ve=`
<style>
.fc-cards-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;}
.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){grid-column:1/-1;max-width:25%;margin:0 auto;}
@media(max-width:992px){.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){max-width:50%;}}
@media(max-width:640px){.fc-cards-grid{grid-template-columns:1fr;}.fc-cards-grid>.fc-card:last-child:nth-child(4n+1){max-width:none;}}
</style>`,na=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="16" cy="12" r="6" fill="#E97300" fill-opacity="0.8"/>
    <path d="M13 12a3 3 0 1 1 4 2.8V16h-2v-1.2a3 3 0 0 1-2-2.8z" fill="#ffffff"/>
    <rect x="14.5" y="17" width="3" height="1" fill="#ffffff"/>
    <rect x="6" y="22" width="20" height="4" rx="1" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3"/>
    <rect x="8" y="23.5" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.4"/>
</svg>`,sa=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ce=t=>`
<div class="fc-card flex flex-col items-center gap-4 bg-white rounded-xl shadow-lg p-6">
    <div class="w-16 h-16 rounded-full bg-[#E97300] flex items-center justify-center shrink-0 overflow-hidden">
        <img src="${O("images/placeholder.svg")}" alt="icono" class="w-10 h-10 object-contain" />
    </div>
    <p class="text-base text-[#003B71] text-center leading-relaxed m-0">${t}</p>
</div>`,ca=[{id:"financing-section",label:"Sección de financiamiento",category:"Productos y Servicios",media:sa,content:`
<section class="w-full bg-white px-16 py-12">
    <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#E97300] shrink-0"></span>
            <span class="text-base font-bold text-[#E97300] uppercase tracking-wide">Subtitulo</span>
        </div>
        <p class="text-base text-[#003B71] leading-snug m-0">Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <div class="fc-cards-grid">
            ${ce("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${ce("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${ce("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
            ${ce("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
        </div>
    </div>
</section>
${Ve}`},{id:"financing-card",label:"Tarjeta de financiamiento",category:"Productos y Servicios",media:na,content:`
<div class="fc-cards-grid">
    ${ce("Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod")}
</div>
${Ve}`}],da=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,fa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="2"/>
    <rect x="7" y="7" width="18" height="5" fill="#003B71" fill-opacity="0.1" rx="1"/>
    <rect x="7" y="14" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
    <rect x="7" y="17" width="18" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="7" y="19" width="14" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="7" y="23" width="18" height="3.5" rx="1.75" fill="#E97300" fill-opacity="0.8"/>
</svg>`,Xe=`
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
</style>`,de=`
<div class="ng-card">
    <div class="ng-card-logo">
        <img src="${O("images/placeholder.svg")}" alt="Logo" class="ng-logo-img">
    </div>
    <div class="ng-card-body">
        <h3 class="ng-card-title">Título de la noticia o publicación</h3>
        <p class="ng-card-desc">Descripción breve del contenido de la noticia o publicación disponible para los usuarios.</p>
    </div>
    <a href="#" class="ng-btn" style="align-self:center;">LEER NOTICIA</a>
</div>`,ha=[{id:"news-grid-section",label:"Noticias y Publicaciones",category:"Contenido",media:da,content:`
<section class="ng-section">
    <h2 class="ng-section-heading">Noticias y Publicaciones</h2>
    <div class="ng-grid">
        ${de}
        ${de}
        ${de}
        ${de}
    </div>
    <div class="ng-more-wrap">
        <a href="#" class="ng-more-btn">Ver más</a>
    </div>
</section>
${Xe}`},{id:"news-card",label:"Tarjeta de noticia",category:"Contenido",media:fa,content:`${de}${Xe}`}],ga=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#ffffff" rx="2" stroke="#e5e7eb" stroke-width="1"/>
    <rect x="3" y="4" width="26" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="10" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="10" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="16" width="11" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="17" y="16" width="12" height="3.5" fill="none" stroke="#F07C28" stroke-width="1" rx="1"/>
    <rect x="3" y="22" width="26" height="5" fill="#F07C28" rx="1"/>
</svg>`,pa=`
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
`,ma=[{id:"contact-form",label:"Formulario de contacto",category:"Formularios",media:ga,content:`
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
${pa}
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
<\/script>`}],ba=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="6" rx="1" fill="#003B71"/>
    <rect x="2" y="10" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="17" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <rect x="2" y="24" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <line x1="11" y1="2" x2="11" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
    <line x1="21" y1="2" x2="21" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
</svg>`,we={blue:{headerBg:"bg-[#003B71]",headerText:"text-white",subheaderBg:"bg-[#e8f0f8]",subheaderText:"text-[#003B71]",borderColor:"#003B71",rowEvenBg:"bg-[#f4f7fb]",rowOddBg:"bg-white",rowText:"text-[#003B71]",labelBg:"bg-[#e8f0f8]",labelText:"text-[#003B71]"},orange:{headerBg:"bg-[#E97300]",headerText:"text-white",subheaderBg:"bg-[#fef3e8]",subheaderText:"text-[#E97300]",borderColor:"#E97300",rowEvenBg:"bg-[#fff8f2]",rowOddBg:"bg-white",rowText:"text-[#003B71]",labelBg:"bg-[#fef3e8]",labelText:"text-[#E97300]"}};function lt(t,e){const i=we[e]||we.blue;let a='<table class="w-full border-collapse font-[Poppins,sans-serif] table-fixed">';t.title?(a+=`<thead><tr>
            <th colspan="${t.cols}" class="p-3 align-middle text-center text-base font-bold ${i.headerBg} ${i.headerText}">
                ${t.title}
            </th>
        </tr>`,t.headers?.length&&(a+="<tr>",t.headers.forEach((n,c)=>{const g=c<t.headers.length-1?`border-r border-[${i.borderColor}]`:"";a+=`<th class="p-3 align-middle text-sm font-semibold ${i.subheaderBg} ${i.subheaderText} ${g} border-b border-[${i.borderColor}] text-${n.align||"center"}">${n.text||""}</th>`}),a+="</tr>"),a+="</thead>"):t.headers?.length&&(a+="<thead><tr>",t.headers.forEach((n,c)=>{const g=c<t.headers.length-1?`border-r border-[${i.borderColor}]`:"";a+=`<th class="p-3 align-middle text-sm font-semibold ${i.headerBg} ${i.headerText} ${g} border-b border-[${i.borderColor}] text-${n.align||"center"}">${n.text||""}</th>`}),a+="</tr></thead>"),a+="<tbody>";const r=t.rows.length,l={};return t.rows.forEach((n,c)=>{a+="<tr>";let g=0;n.forEach(d=>{for(;l[`${c}-${g}`];)g++;const f=d.colspan||1,v=d.rowspan||1;for(let x=c;x<c+v;x++)for(let S=g;S<g+f;S++)(x!==c||S!==g)&&(l[`${x}-${S}`]=!0);const y=f>1?`colspan="${f}"`:"",s=v>1?`rowspan="${v}"`:"",p=d.isHeader?i.labelBg:c%2===0?i.rowEvenBg:i.rowOddBg,k=d.isHeader?"font-semibold":"font-normal",z=d.isHeader?i.labelText:i.rowText,B=`text-${d.align||"center"}`,$=c+v>=r,h=g+f>=t.cols?"":`border-r border-[${i.borderColor}]`,u=$?"":`border-b border-[${i.borderColor}]`,E=`${h} ${u} p-3 align-middle text-sm ${p} ${k} ${z} ${B}`;d.image?a+=`<td ${y} ${s} class="${E}">
                    <img src="${d.image}" alt="${d.text||""}" class="max-w-full max-h-20 h-auto object-contain block mx-auto">
                    ${d.text?`<span class="block mt-1 text-xs ${z}">${d.text}</span>`:""}
                </td>`:a+=`<td ${y} ${s} class="${E}">${d.text||""}</td>`,g+=f}),a+="</tr>"}),a+="</tbody></table>",a}function te(t,e){return{title:"Título de la tabla",cols:t,headers:Array.from({length:t},(i,a)=>({text:`Columna ${a+1}`,align:"center"})),rows:Array.from({length:e},()=>Array.from({length:t},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})))}}function ot(t,e){return`<div class="w-full overflow-x-auto rounded-2xl border-2 border-[${(we[e]||we.blue).borderColor}]">${t}</div>`}function We(t,e){const i={};return t.forEach((a,r)=>{let l=0;a.forEach(n=>{for(;i[`${r}-${l}`];)l++;const c=Math.min(n.colspan||1,e-l),g=n.rowspan||1;for(let d=r;d<r+g;d++)for(let f=l;f<l+c;f++)(d!==r||f!==l)&&(i[`${d}-${f}`]=`${r}-${l}`);l+=c})}),i}const ua=`
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
.tam-img-selected-info{font-size:0.8rem;color:#6b7280;}`;function xa(){if(document.getElementById("tam-img-modal"))return;const t=document.createElement("div");t.id="tam-img-modal",t.innerHTML=`
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
        </div>`,document.body.appendChild(t);let e=null,i=null;async function a(c=""){const g=document.getElementById("tam-img-grid");g.innerHTML='<div class="tam-img-loading"><div class="tam-img-spinner"></div><span>Cargando...</span></div>';try{const d=new URLSearchParams({type:"image",per_page:50});c&&d.append("search",c);const f=document.querySelector('meta[name="media-api-url"]')?.content??"/media/api",s=(await(await fetch(`${f}?${d}`,{headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}})).json()).items||[];if(!s.length){g.innerHTML='<div class="tam-img-loading"><i class="ri-image-line" style="font-size:2rem;"></i><span>No se encontraron imágenes</span></div>';return}g.innerHTML="",s.forEach(p=>{const k=document.createElement("div");k.className="tam-img-card",k.innerHTML=`<img src="${p.url}" alt="${p.filename}"><p title="${p.filename}">${p.filename}</p>`,k.addEventListener("click",()=>{g.querySelectorAll(".tam-img-card").forEach(z=>z.classList.remove("selected")),k.classList.add("selected"),e=p.url,document.getElementById("tam-img-selected-info").textContent=`Seleccionada: ${p.filename}`,document.getElementById("tam-img-confirm").disabled=!1}),g.appendChild(k)})}catch{g.innerHTML='<div class="tam-img-loading"><i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i><span style="color:#dc2626;">Error al cargar imágenes</span></div>'}}function r(c){i=c,e=null,document.getElementById("tam-img-selected-info").textContent="Ninguna imagen seleccionada",document.getElementById("tam-img-confirm").disabled=!0,document.getElementById("tam-img-search-input").value="",t.classList.add("open"),a()}function l(){t.classList.remove("open"),e=null,i=null}document.getElementById("tam-img-close").addEventListener("click",l),document.getElementById("tam-img-cancel").addEventListener("click",l),document.getElementById("tam-img-confirm").addEventListener("click",()=>{e&&i&&(i(e),l())});let n;document.getElementById("tam-img-search-input").addEventListener("input",c=>{clearTimeout(n),n=setTimeout(()=>a(c.target.value),300)}),t.addEventListener("click",c=>{c.target===t&&l()}),window.__openTableImagePicker=r}function ya(t,e){if(document.getElementById("table-admin-modal"))return;const i=document.createElement("style");i.id="table-admin-modal-styles",i.textContent=ua,document.head.appendChild(i),xa();const a=document.createElement("div");a.id="table-admin-modal",a.innerHTML=`
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
        </div>`,document.body.appendChild(a);let r=null,l=null;function n(y){r=y;const s=y.get("tableData");l=s?JSON.parse(JSON.stringify(s)):te(3,3);const p=l.cols||3;l.rows=l.rows.map((k,z)=>Array.from({length:p},($,b)=>k[b]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})),document.getElementById("tam-title").value=l.title||"",document.getElementById("tam-theme").value=y.get("tableTheme")||"blue",document.getElementById("tam-cols").value=l.cols||3,document.getElementById("tam-rows").value=l.rows.length||3,f(),v(),a.classList.add("open"),document.body.style.overflow="hidden"}function c(){a.classList.remove("open"),document.body.style.overflow="",r=null}function g(){l.title=document.getElementById("tam-title").value.trim(),l.cols=parseInt(document.getElementById("tam-cols").value)||3,l.headers=Array.from(document.querySelectorAll(".tam-header-input")).map(s=>({text:s.value,align:s.closest("th")?.querySelector(".tam-align-select")?.value||"center"})),document.querySelectorAll("#tam-tbody td.tam-cell:not(.is-spanned)").forEach(s=>{const p=parseInt(s.dataset.row),k=parseInt(s.dataset.col);l.rows[p]?.[k]&&(l.rows[p][k].text=s.querySelector(".tam-cell-input")?.value||"",l.rows[p][k].align=s.querySelector(".tam-align-select")?.value||"center",l.rows[p][k].isHeader=s.dataset.isheader==="1",l.rows[p][k].image=s.dataset.image||null)});const y=We(l.rows,l.cols);l.rows=l.rows.map((s,p)=>s.filter((k,z)=>!y[`${p}-${z}`]))}function d(){if(a.querySelector("#tam-rebuild-notice"))return;const s=document.createElement("div");s.id="tam-rebuild-notice",s.style.cssText="background:#fef9c3;border:1.5px solid #ca8a04;border-radius:0.5rem;padding:0.5rem 1rem;font-size:0.8rem;color:#92400e;display:flex;align-items:center;gap:0.5rem;margin:0 1.5rem 0;flex-shrink:0;",s.innerHTML='<i class="ri-error-warning-line"></i> Has modificado el colspan/rowspan. Haz clic en <strong style="margin:0 4px;">Reconstruir</strong> para aplicar los cambios de fusión.',a.querySelector(".tam-toolbar").after(s)}function f(){a.querySelector("#tam-rebuild-notice")?.remove()}function v(){const y=document.getElementById("tam-thead"),s=document.getElementById("tam-tbody"),p=l.cols,k=l.rows.length,z=We(l.rows,p);y.innerHTML=`<tr>${l.headers.map((B,$)=>`
            <th>
                <input class="tam-cell-input tam-header-input" value="${B.text||""}" placeholder="Col ${$+1}" style="font-weight:600;">
                <select class="tam-align-select" style="margin-top:4px;width:100%;font-size:0.7rem;padding:2px;">
                    <option value="left" ${B.align==="left"?"selected":""}>Izquierda</option>
                    <option value="center" ${B.align==="center"?"selected":""}>Centro</option>
                    <option value="right" ${B.align==="right"?"selected":""}>Derecha</option>
                </select>
            </th>`).join("")}</tr>`,s.innerHTML=l.rows.map((B,$)=>`<tr>${Array.from({length:p},(h,u)=>{const E=z[`${$}-${u}`];if(E)return`<td class="tam-cell is-spanned" data-row="${$}" data-col="${u}">
                        <div class="tam-spanned-label">Combinada con [${E}]</div>
                    </td>`;const x=B[u]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null},S=x.colspan||1,A=x.rowspan||1,j=S>1||A>1;return`<td class="tam-cell ${x.isHeader?"is-header-cell":""} ${x.image?"has-image":""} ${j?"has-span":""}"
                    data-row="${$}" data-col="${u}"
                    data-isheader="${x.isHeader?"1":"0"}"
                    data-colspan="${S}"
                    data-rowspan="${A}"
                    data-image="${x.image||""}">
                    ${x.image?`<img class="tam-cell-img-preview" src="${x.image}" alt="">`:""}
                    <textarea class="tam-cell-input" placeholder="Texto...">${x.text||""}</textarea>
                    <select class="tam-align-select" style="width:100%;font-size:0.7rem;padding:2px;margin-top:4px;">
                        <option value="left" ${x.align==="left"?"selected":""}>Izquierda</option>
                        <option value="center" ${x.align==="center"?"selected":""}>Centro</option>
                        <option value="right" ${x.align==="right"?"selected":""}>Derecha</option>
                    </select>
                    <div class="tam-cell-actions">
                        <button type="button" class="tam-cell-btn tam-cell-btn-header ${x.isHeader?"active":""}"
                            data-action="header" data-row="${$}" data-col="${u}">
                            ${x.isHeader?"✓ Etiqueta":"Etiqueta"}
                        </button>
                        <button type="button" class="tam-cell-btn tam-cell-btn-img"
                            data-action="image" data-row="${$}" data-col="${u}">
                            <i class="ri-image-line"></i> ${x.image?"Cambiar":"Imagen"}
                        </button>
                        ${x.image?`<button type="button" class="tam-cell-btn tam-cell-btn-clear" data-action="clear-image" data-row="${$}" data-col="${u}">✕ Quitar</button>`:""}
                        <div class="tam-cell-span-group">
                            <label title="Columnas que ocupa">CS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${p-u}"
                                value="${S}" data-action="colspan" data-row="${$}" data-col="${u}">
                            <label title="Filas que ocupa">RS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${k-$}"
                                value="${A}" data-action="rowspan" data-row="${$}" data-col="${u}">
                        </div>
                    </div>
                </td>`}).join("")}</tr>`).join(""),s.querySelectorAll("input[data-action=colspan], input[data-action=rowspan]").forEach(B=>{B.addEventListener("change",()=>{const $=parseInt(B.dataset.row),b=parseInt(B.dataset.col),h=Math.max(1,parseInt(B.value)||1);l.rows[$]?.[b]&&(B.dataset.action==="colspan"?l.rows[$][b].colspan=Math.min(h,p-b):l.rows[$][b].rowspan=Math.min(h,k-$),d())})}),s.querySelectorAll("button[data-action]").forEach(B=>{B.addEventListener("click",$=>{$.preventDefault(),$.stopPropagation();const b=B.dataset.action,h=parseInt(B.dataset.row),u=parseInt(B.dataset.col);if(!(isNaN(h)||isNaN(u)||!l.rows[h]?.[u])){if(b==="header"){l.rows[h][u].isHeader=!l.rows[h][u].isHeader;const E=s.querySelector(`td[data-row="${h}"][data-col="${u}"]`);E&&(E.dataset.isheader=l.rows[h][u].isHeader?"1":"0",E.classList.toggle("is-header-cell",l.rows[h][u].isHeader)),B.classList.toggle("active",l.rows[h][u].isHeader),B.textContent=l.rows[h][u].isHeader?"✓ Etiqueta":"Etiqueta";return}if(b==="image"){window.__openTableImagePicker&&window.__openTableImagePicker(E=>{l.rows[h][u].image=E;const x=s.querySelector(`td[data-row="${h}"][data-col="${u}"]`);if(x){x.dataset.image=E,x.classList.add("has-image");let S=x.querySelector(".tam-cell-img-preview");S||(S=document.createElement("img"),S.className="tam-cell-img-preview",x.insertBefore(S,x.firstChild)),S.src=E;const A=x.querySelector("[data-action=image]");if(A&&(A.innerHTML='<i class="ri-image-line"></i> Cambiar'),!x.querySelector("[data-action=clear-image]")){const j=document.createElement("button");j.type="button",j.className="tam-cell-btn tam-cell-btn-clear",j.dataset.action="clear-image",j.dataset.row=h,j.dataset.col=u,j.textContent="✕ Quitar",j.addEventListener("click",D=>{D.preventDefault(),D.stopPropagation(),l.rows[h][u].image=null,x.dataset.image="",x.classList.remove("has-image"),S.remove(),j.remove();const q=x.querySelector("[data-action=image]");q&&(q.innerHTML='<i class="ri-image-line"></i> Imagen')}),x.querySelector(".tam-cell-actions").appendChild(j)}}});return}b==="clear-image"&&(l.rows[h][u].image=null,v())}})})}document.getElementById("tam-close").addEventListener("click",c),document.getElementById("tam-cancel").addEventListener("click",c),a.addEventListener("click",y=>{y.target===a&&c()}),document.getElementById("tam-rebuild").addEventListener("click",()=>{const y=parseInt(document.getElementById("tam-cols").value)||3,s=parseInt(document.getElementById("tam-rows").value)||3;for(f(),g();l.headers.length<y;)l.headers.push({text:`Col ${l.headers.length+1}`,align:"center"});for(l.headers=l.headers.slice(0,y),l.cols=y;l.rows.length<s;)l.rows.push(Array.from({length:y},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})));l.rows=l.rows.slice(0,s).map(p=>{for(;p.length<y;)p.push({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null});return p.slice(0,y)}),v()}),document.getElementById("tam-apply").addEventListener("click",()=>{g();const y=document.getElementById("tam-theme").value;r&&(r.set("tableData",JSON.parse(JSON.stringify(l))),r.set("tableTheme",y),r.addAttributes({"data-table-theme":y}),Ce(r)),c()}),window.__openTableAdminModal=n}function Ce(t){const e=t.get("tableData"),i=t.get("tableTheme")||"blue";e&&t.components(ot(lt(e,i),i))}function va(){return function(){}}const wa=[{id:"table-blue",label:"Tabla azul",category:"Interactivos",media:ba,content:{type:"table-component",attributes:{"data-table-theme":"blue"}}},{id:"table-orange",label:"Tabla naranja",category:"Interactivos",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="6" rx="1" fill="#E97300"/>
            <rect x="2" y="10" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.3"/>
            <rect x="2" y="17" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
            <rect x="2" y="24" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
        </svg>`,content:{type:"table-component",attributes:{"data-table-theme":"orange"}}}];function ka(t){const e="table-component";ya(),t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Tabla",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,propagate:["editable","selectable","hoverable","droppable","highlightable"],tableData:null,tableTheme:"blue",attributes:{"data-gjs-type":e,"data-table-theme":"blue"},components:ot(lt(te(3,3),"blue"),"blue"),script:va(),traits:[{type:"button",name:"edit-table",label:"Editar tabla",text:"Abrir editor de tabla",command(i){const a=i.getSelected();a&&window.__openTableAdminModal&&(a.get("tableData")||a.set("tableData",te(3,3)),window.__openTableAdminModal(a))}},{type:"select",name:"data-table-theme",label:"Color del tema",options:[{id:"blue",name:"Azul"},{id:"orange",name:"Naranja"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e});const i=this.getAttributes()["data-table-theme"]||"blue";this.set("tableTheme",i),this.get("tableData")||(this.set("tableData",te(3,3)),Ce(this)),this.on("change:attributes",(a,r)=>{const l=r["data-table-theme"];l&&l!==this.get("tableTheme")&&(this.set("tableTheme",l),Ce(this))})}}}),Ba(t,e),Ea(t,e)}function Ba(t,e){t.on("component:mount",i=>{const a=i.getEl();if(a?.getAttribute?.("data-gjs-type")===e){i.set("type",e);const r=a.getAttribute("data-table-theme")||"blue";i.set("tableTheme",r),i.get("tableData")||i.set("tableData",te(3,3))}}),t.on("storage:end:load",()=>{setTimeout(()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getAttributes()["data-table-theme"]||"blue";i.set("tableTheme",a),i.get("tableData")||i.set("tableData",te(3,3))})},800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function Ea(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a&&!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,a.appendChild(r)}})}const $a=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#003B71"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#003B71"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#003B71" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Sa=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#E97300"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#E97300"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#E97300" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Ca=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#003B71"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,La=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#E97300"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,ja=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#003B71"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,_a=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#E97300"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,Ta=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,za=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,Ia=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#ffffff"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.5"/>
</svg>`,Aa=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,Ye=t=>{const e=t==="#003B71"?"blue":"orange";return`
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
</div>`},Ge=t=>{const e=t==="#003B71"?"blue":"orange";return`
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
</div>`},Je={"button-fill-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-[#003B71] text-white transition-all duration-200 hover:bg-[#002a52] hover:border-[#002a52]","button-fill-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-[#E97300] text-white transition-all duration-200 hover:bg-[#c96200] hover:border-[#c96200]","button-outline-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-transparent text-[#003B71] transition-all duration-200 hover:bg-[#003B71] hover:text-white","button-outline-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-transparent text-[#E97300] transition-all duration-200 hover:bg-[#E97300] hover:text-white","button-fill-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-white text-[#003B71] transition-all duration-200 hover:bg-[#dce8f5] hover:border-[#dce8f5]","button-outline-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-transparent text-white transition-all duration-200 hover:bg-white hover:text-[#003B71]"},qa=[{id:"button-fill-blue",label:"Botón azul sólido",category:"Botones",media:ja,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-blue"}}},{id:"button-fill-orange",label:"Botón naranja sólido",category:"Botones",media:_a,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-orange"}}},{id:"button-outline-blue",label:"Botón azul outline",category:"Botones",media:Ta,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-blue"}}},{id:"button-outline-orange",label:"Botón naranja outline",category:"Botones",media:za,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-orange"}}},{id:"button-fill-white",label:"Botón blanco sólido",category:"Botones",media:Ia,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-white"}}},{id:"button-outline-white",label:"Botón blanco outline",category:"Botones",media:Aa,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-white"}}},{id:"button-download-full-blue",label:"Descarga completa azul",category:"Botones",media:$a,content:Ye("#003B71")},{id:"button-download-full-orange",label:"Descarga completa naranja",category:"Botones",media:Sa,content:Ye("#E97300")},{id:"button-download-simple-blue",label:"Descarga simple azul",category:"Botones",media:Ca,content:Ge("#003B71")},{id:"button-download-simple-orange",label:"Descarga simple naranja",category:"Botones",media:La,content:Ge("#E97300")}];function Da(t){const e=[{type:"button",label:"Documento",name:"select-document",text:"Seleccionar documento",full:!0,command:"open-document-picker"},{type:"text",name:"href",label:"URL / Enlace",placeholder:"https://..."},{type:"select",name:"target",label:"Abrir en",options:[{id:"_self",name:"Misma ventana"},{id:"_blank",name:"Nueva ventana"}]}];t.DomComponents.addType("link",{model:{defaults:{traits:e}}}),t.DomComponents.addType("integral-button",{isComponent:r=>r.tagName==="A"&&r.hasAttribute("data-btn-variant"),model:{defaults:{tagName:"a",draggable:!0,droppable:!1,editable:!0,attributes:{href:"#",target:"_self","data-btn-variant":"button-fill-blue"},components:"Texto del botón",traits:e},init(){const r=this.getAttributes()["data-btn-variant"]??"button-fill-blue",l=Je[r]??Je["button-fill-blue"];this.setClass(l.split(" "))}}});function i(r,l){if(r.getEl()?.matches?.(l))return r;let c=null;const g=r.components?.();return g?(g.each(d=>{c||(c=i(d,l))}),c):null}function a(r,l){const c={pdf:"ri-file-pdf-line",xlsx:"ri-file-excel-line",xls:"ri-file-excel-line",doc:"ri-file-word-line",docx:"ri-file-word-line"}[l]??"ri-file-line";function g(f){const v=f.getEl?.();if(v?.tagName==="I"){const p=v.parentElement;if(p&&[...p.classList].some(k=>k.includes("-icon")))return f}let y=null;const s=f.components?.();return s?(s.each(p=>{y||(y=g(p))}),y):null}const d=g(r);if(d){const f=d.getClasses().find(v=>v.startsWith("ri-"));f&&d.removeClass(f),d.addClass(c)}else{const v=r.getEl()?.querySelector("[class*='-icon'] i");if(v){const y=[...v.classList].filter(s=>!s.startsWith("ri-"));v.className=[...y,c].join(" ")}}}t.Commands.add("open-document-picker",{run(r){const l=r.getSelected();if(l){if(r._documentPicker)try{r._documentPicker.destroy()}catch{}r._documentPicker=new ft,r._documentPicker.open(n=>{const c=n.filename.split(".").pop().toLowerCase();l.addAttributes({href:n.url});const g=l.getTrait("href");g&&g.set("value",n.url);const d=i(l,"[class*='-filename']");d&&d.components(n.filename),a(l,c)},{filters:{type:"document"}})}}})}const Ma=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,Na=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,Oa=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,Pa=[{id:"badge-outline-blue",label:"Badge azul outline",category:"Badges",media:Ma,content:'<span class="inline-block border border-[#003B71] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#003B71]">Etiqueta</span>'},{id:"badge-outline-orange",label:"Badge naranja outline",category:"Badges",media:Na,content:'<span class="inline-block border border-[#E97300] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#E97300]">Etiqueta</span>'},{id:"badge-outline-white",label:"Badge blanco outline",category:"Badges",media:Oa,content:'<span class="inline-block border border-white rounded-full px-4 py-1 text-base font-medium bg-transparent text-white">Etiqueta</span>'}],Ra=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;function Ha(){return function(){const t=this,e="agencies-map-component",i="/api/agencies/active",a="agencies";let r=[],l=[],n={},c=null,g=[];const d=async()=>{try{f(),await y(),await k(),z(),E(),j(),D(),v()}catch(o){console.error("Error initializing map:",o),P("Error al cargar las agencias"),v()}};function f(){const o=t.querySelector(`.${e}-list`);o&&(o.innerHTML=`
                    <div class="flex flex-col items-center justify-center p-12 space-y-4">
                        <div class="relative w-16 h-16">
                            <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                            <div class="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                        </div>
                        <p class="text-white font-medium">Cargando agencias...</p>
                    </div>
                `);const m=t.querySelector(`.${e}-map-container`);m&&(m.style.opacity="0.5")}function v(){const o=t.querySelector(`.${e}-map-container`);o&&(o.style.transition="opacity 0.3s ease",o.style.opacity="1")}async function y(){try{const m=await(await fetch(i)).json(),w=a?m[a]:m;Array.isArray(w)?(r=w.filter(C=>C.latitude&&C.longitude&&!isNaN(C.latitude)&&!isNaN(C.longitude)),l=[...r],s()):(r=[],l=[])}catch(o){console.error("Error loading items:",o),r=[],l=[]}}function s(){const o=[...new Set(r.map(w=>w.zone).filter(Boolean))].sort(),m=[...new Set(r.map(w=>w.department).filter(Boolean))].sort();n={zone:o,department:m},setTimeout(()=>{const w=t.querySelector(`.${e}-filters-container`);w&&!w.hasChildNodes()&&(w.innerHTML=`
                        <select class="${e}-zone-filter flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                            <option value="">Todas las Zonas</option>
                        </select>
                        <select class="${e}-department-filter flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                            <option value="">Todos los Departamentos</option>
                        </select>
                    `,p())},100)}function p(){const o=t.querySelector(`.${e}-zone-filter`),m=t.querySelector(`.${e}-department-filter`);o&&n.zone&&n.zone.forEach(w=>{const C=document.createElement("option");C.value=w,C.textContent=w,o.appendChild(C)}),m&&n.department&&n.department.forEach(w=>{const C=document.createElement("option");C.value=w,C.textContent=w,m.appendChild(C)})}async function k(){if(!document.getElementById("leaflet-css")){const o=document.createElement("link");o.id="leaflet-css",o.rel="stylesheet",o.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(o)}if(typeof window.L>"u"&&await new Promise((o,m)=>{const w=document.createElement("script");w.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",w.onload=o,w.onerror=m,document.head.appendChild(w)}),typeof window.L<"u"&&window.L.Icon&&window.L.Icon.Default){const o=window.L.icon({iconUrl:"data:image/svg+xml;base64,"+btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
                            <path fill="#f0872a" d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z"/>
                            <circle cx="12" cy="8" r="3" fill="#fff"/>
                        </svg>
                    `),iconSize:[30,45],iconAnchor:[15,45],popupAnchor:[0,-45]});window.customOrangeIcon=o}}function z(){const o=t.querySelector(`.${e}-map`);if(!o||!window.L)return;o._leaflet_id&&o._map&&(o._map.remove(),delete o._map),c=window.L.map(o).setView([13.7942,-88.8965],8),window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(c),o._map=c,c.whenReady(function(){B(),setTimeout(()=>{c&&c.invalidateSize&&c.invalidateSize()},300)})}function B(){$(),b(),u()}function $(){g.forEach(o=>{o.marker&&c.removeLayer(o.marker)}),g=[]}function b(){l.forEach((o,m)=>{if(o.latitude&&o.longitude){const w=h(o),C=window.L.marker([o.latitude,o.longitude],{icon:window.customOrangeIcon||new window.L.Icon.Default}).addTo(c).bindPopup(w);g.push({marker:C,item:o,index:m})}})}function h(o){let m=`<div style="min-width: 200px;"><h4 style="font-weight: 700; margin-bottom: 12px; color: #0d3f6a; font-size: 16px; border-bottom: 2px solid #f0872a; padding-bottom: 8px;">${o.name}</h4>`;if(o.address&&(m+=`<p style="margin: 8px 0 0 0; font-size: 14px; display: flex; align-items: start; gap: 8px;"><i class="ri-map-pin-line" style="color: #f0872a; font-size: 16px; margin-top: 2px;"></i><span style="color: #4b5563;">${o.address}</span></p>`),o.municipality||o.department){const w=[o.municipality,o.department].filter(Boolean).join(", ");m+=`<p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280; padding-left: 24px;">${w}</p>`}return o.schedule&&(m+=`<p style="margin: 8px 0; font-size: 14px; display: flex; align-items: start; gap: 8px;"><i class="ri-time-line" style="color: #f0872a; font-size: 16px; margin-top: 2px;"></i><span style="color: #4b5563;">${o.schedule}</span></p>`),m+="</div>",m}function u(){if(l.length>0){const o=l.filter(m=>m.latitude&&m.longitude).map(m=>[m.latitude,m.longitude]);o.length>1?c.once("moveend",function(){setTimeout(()=>{try{c&&c._loaded&&typeof c.fitBounds=="function"&&c.fitBounds(o,{padding:[50,50],maxZoom:12,animate:!1})}catch(m){console.warn("Error fitting bounds:",m)}},100)}):o.length===1&&c.setView(o[0],14)}}function E(){const o=t.querySelector(`.${e}-list`);if(!o)return;if(l.length===0){S(o);return}const m=l.map((w,C)=>x(w,C)).join("");o.innerHTML=m,A()}function x(o,m){const w=o.phones&&o.phones.length>0?o.phones.map(T=>`
                        <p class="text-gray-200 flex items-center gap-2 mt-2">
                            <i class="ri-phone-line text-primary text-lg"></i>
                            <a href="tel:${T.replace(/\s+/g,"")}" class="agency-phone-link text-white font-medium hover:underline">${T}</a>
                        </p>
                    `).join(""):"",C=`https://www.google.com/maps/search/?api=1&query=${o.latitude},${o.longitude}`;return`
                <div class="${e}-item p-5 bg-white/10 border border-white/20 rounded-2xl cursor-pointer transition-all duration-200" data-item-index="${m}">
                    <h3 class="agency-title text-lg font-bold text-white mb-3">${o.name}</h3>
                    ${o.address?`<p class="text-gray-200 flex items-start gap-2 mt-2"><i class="ri-map-pin-line text-primary text-lg mt-0.5"></i><span class="flex-1">${o.address}</span></p>`:""}
                    ${o.municipality||o.department?`<p class="text-sm text-gray-300 mt-1 ml-6">${[o.municipality,o.department].filter(Boolean).join(", ")}</p>`:""}
                    ${o.schedule?`<p class="text-gray-200 flex items-start gap-2 mt-2"><i class="ri-time-line text-primary text-lg mt-0.5"></i><span class="flex-1">${o.schedule}</span></p>`:""}
                    ${w}
                    <div class="mt-3">
                        <a href="${C}" target="_blank" rel="noopener noreferrer" class="agency-maps-btn block w-full text-center px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200" onclick="event.stopPropagation();">
                            Ver ubicación
                        </a>
                    </div>
                </div>
            `}function S(o){o.innerHTML=`
                <div class="flex flex-col items-center justify-center p-12 text-center">
                    <div class="w-20 h-20 mb-4 rounded-full bg-white/10 flex items-center justify-center">
                        <i class="ri-map-pin-line text-4xl text-white"></i>
                    </div>
                    <p class="text-white font-medium text-lg">No hay agencias disponibles</p>
                    <p class="text-gray-300 text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
                </div>
            `}function A(){const o=t.querySelectorAll(`.${e}-item`);o.forEach(m=>{m.addEventListener("click",w=>{if(w.target.closest(".agency-maps-btn"))return;w.preventDefault();const C=parseInt(m.dataset.itemIndex),T=l[C];if(!T)return;o.forEach(_=>{_.classList.remove("bg-white","border-secondary","selected-agency"),_.classList.add("bg-white/10","border-white/20");const R=_.querySelector(".agency-title"),fe=_.querySelectorAll("i"),he=_.querySelectorAll(".agency-phone-link"),ke=_.querySelectorAll("p:not(:has(.agency-phone-link))"),Be=_.querySelector(".agency-maps-btn");R&&(R.classList.remove("text-secondary"),R.classList.add("text-white")),fe.forEach(J=>{J.classList.remove("text-secondary","text-gray-300","text-white"),J.classList.add("text-primary")}),he.forEach(J=>{J.classList.remove("text-secondary"),J.classList.add("text-white")}),ke.forEach(J=>{J.classList.remove("text-secondary"),J.classList.add("text-gray-200")}),Be&&(Be.classList.remove("bg-secondary"),Be.classList.add("bg-primary"))}),m.classList.remove("bg-white/10","border-white/20"),m.classList.add("bg-white","border-secondary","selected-agency");const U=m.querySelector(".agency-title"),W=m.querySelectorAll("i"),ee=m.querySelectorAll(".agency-phone-link"),Y=m.querySelectorAll("p:not(:has(.agency-phone-link))"),F=m.querySelector(".agency-maps-btn");if(U&&(U.classList.remove("text-white"),U.classList.add("text-secondary")),W.forEach(_=>{_.classList.remove("text-secondary","text-gray-300","text-white"),_.classList.add("text-primary")}),ee.forEach(_=>{_.classList.remove("text-white"),_.classList.add("text-secondary")}),Y.forEach(_=>{_.classList.remove("text-gray-200"),_.classList.add("text-secondary")}),F&&(F.classList.remove("bg-primary"),F.classList.add("bg-secondary")),c&&T&&c._loaded)try{c.flyTo([T.latitude,T.longitude],14,{animate:!0,duration:1});const _=g.find(R=>R.item.id===T.id);_&&_.marker&&_.marker.openPopup()}catch(_){console.warn("Error updating map view:",_)}})})}function j(){const o=t.querySelector(`.${e}-search-input`),m=t.querySelector(`.${e}-zone-filter`),w=t.querySelector(`.${e}-department-filter`),C=t.querySelector(`.${e}-no-results`),T={Occidental:["Ahuachapán","Santa Ana","Sonsonate"],Paracentral:["Chalatenango","Cuscatlán","La Paz","Cabañas","San Vicente"],Central:["La Libertad","San Salvador"],Oriental:["Usulután","San Miguel","Morazán","La Unión"]},U=()=>{if(!m||!w)return;const ee=m.value,Y=w.value;if(!ee)w.innerHTML='<option value="">Todos los Departamentos</option>',[...new Set(r.map(_=>_.department).filter(Boolean))].sort().forEach(_=>{const R=document.createElement("option");R.value=_,R.textContent=_,w.appendChild(R)}),Y&&(w.value=Y);else{const F=T[ee]||[];w.innerHTML='<option value="">Todos los Departamentos</option>',F.forEach(_=>{const R=document.createElement("option");R.value=_,R.textContent=_,w.appendChild(R)}),F.includes(Y)&&(w.value=Y)}},W=()=>{const ee=o?o.value.toLowerCase().trim():"",Y=m?m.value:"",F=w?w.value:"";l=r.filter(_=>{let R=!0,fe=!0,he=!0;return ee&&(R=Object.values(_).some(ke=>String(ke).toLowerCase().includes(ee))),Y&&(fe=_.zone===Y),F&&(he=_.department===F),R&&fe&&he}),E(),B(),C&&C.classList.toggle("hidden",l.length>0)};o&&o.addEventListener("input",W),m&&m.addEventListener("change",()=>{U(),W()}),w&&w.addEventListener("change",W)}function D(){const o=t.querySelector("[data-title]");if(o){const C=q("map-title")||"Nuestras Agencias";o.textContent=C}const m=t.querySelector(`.${e}-search-input`);if(m){const C=q("search-placeholder")||"Buscar...";m.setAttribute("placeholder",C)}const w=t.querySelector(`.${e}-no-results`);if(w){const C=q("no-results-text")||"No se encontraron agencias";w.textContent=C}}function q(o){return t.closest(`[data-gjs-type="${e}"]`)?.getAttribute(o)}function P(o){const m=t.querySelector(`.${e}-list`);m&&(m.innerHTML=`
                    <div class="flex flex-col items-center justify-center p-12 text-center">
                        <div class="w-20 h-20 mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                            <i class="ri-error-warning-line text-4xl text-red-300"></i>
                        </div>
                        <p class="text-white font-medium text-lg">${o}</p>
                        <p class="text-gray-300 text-sm mt-2">Por favor, intenta nuevamente más tarde</p>
                    </div>
                `)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",d):d()}}const Ua=[{id:"agencies-map",label:"Mapa de Agencias",category:"Interactivos",media:Ra,content:{type:"agencies-map-component"}}];function Fa(t){const e="agencies-map-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute&&i.getAttribute("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Mapa de Agencias",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{class:"py-12 bg-secondary","data-gjs-type":e},components:`
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
                `,script:Ha()},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),Va(t,e),Xa(t,e)}function Va(t,e){t.on("component:selected",i=>{if(i.get("type")===e){const a=i.getEl();if(a){const r=a.querySelector(`.${e}-map`);r&&r._map&&setTimeout(()=>{r._map.invalidateSize()},100)}}}),t.on("storage:end:load",()=>{setTimeout(()=>{Ze(t,e)},1e3)}),t.on("component:mount",i=>{const a=i.getEl();a&&a.getAttribute&&a.getAttribute("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&a&&r.call(a)},500))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();if(a){const r=a.querySelector(`.${e}-map`);r&&r._map&&(r._map.remove(),delete r._map),setTimeout(()=>{const l=i.get("script");l&&typeof l=="function"&&l.call(a)},500)}}}),t.on("canvas:render",()=>{setTimeout(()=>{Ze(t,e)},800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(r=>{r.set("type",e),r.addAttributes({"data-gjs-type":e})})})}function Ze(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(r=>{r.set("type",e);const l=r.getEl();if(l&&l.isConnected){const n=r.get("script");n&&typeof n=="function"&&n.call(l)}})}function Xa(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument.head;if(!a.querySelector("#leaflet-css")){const r=document.createElement("link");r.id="leaflet-css",r.rel="stylesheet",r.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",a.appendChild(r)}if(!a.querySelector(`#${e}-css`)){const r=document.createElement("style");r.id=`${e}-css`,r.innerHTML=`
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
            `,a.appendChild(r)}})}const Wa=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <circle cx="23" cy="14" r="5" fill="#E97300"/>
    <circle cx="23" cy="14" r="4" fill="#f8e7d8"/>
</svg>`,Ya=`
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
}`;function Ga(){return function(){const t=this,e=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",i={"fill-blue":{bg:"#003B71",color:"#ffffff",border:"#003B71",hoverBg:"#002a52",hoverColor:"#ffffff"},"outline-blue":{bg:"transparent",color:"#003B71",border:"#003B71",hoverBg:"#003B71",hoverColor:"#ffffff"},"fill-orange":{bg:"#E97300",color:"#ffffff",border:"#E97300",hoverBg:"#c96200",hoverColor:"#ffffff"},"outline-orange":{bg:"transparent",color:"#E97300",border:"#E97300",hoverBg:"#E97300",hoverColor:"#ffffff"},"fill-white":{bg:"#ffffff",color:"#003B71",border:"#ffffff",hoverBg:"#dce8f5",hoverColor:"#003B71"},"outline-white":{bg:"transparent",color:"#ffffff",border:"#ffffff",hoverBg:"#ffffff",hoverColor:"#003B71"}},a=".banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;}.banner-slide-container:active{cursor:grabbing;}.banner-slide-container{display:grid;}.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}.banner-bg{position:absolute;inset:0;z-index:0;}.banner-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.banner-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.banner-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.banner-dots-wrapper{display:none;}.banner-stripe{position:relative;width:100%;height:48px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}.banner-dots{display:flex;gap:8px;align-items:center;}.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}.banner-dot--active{width:28px;background:#ffffff;}@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}";(function(){const m=t.ownerDocument??document;if(!m.getElementById("banner-hero-styles")){const w=m.createElement("style");w.id="banner-hero-styles",w.textContent=a,m.head.appendChild(w)}})();let r=[],l=0,n=null,c=!1,g=0,d=0;const f=50,v=t.dataset.autoplay!=="false",y=t.dataset.category??"",s=t.querySelector(".banner-slide-container");t.querySelector(".banner-dots");async function p(){k();try{const m=await(await fetch(e)).json();if(r=Array.isArray(m)?y?m.filter(w=>w.category===y):m:[],r.length===0){P();return}$(),A(),j(0,!1),v&&D()}catch{P()}}function k(){s.innerHTML=`
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
            `;const o=t.ownerDocument??document;if(!o.getElementById("banner-skeleton-styles")){const m=o.createElement("style");m.id="banner-skeleton-styles",m.textContent=`
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
                `,o.head.appendChild(m)}}function z(o){return i[o]?i[o]:o==="outline-blue"||o==="outline-orange"?i["outline-white"]:i["fill-white"]}function B(o,m,w,C){const T=z(w),U=m?"a":"span",W=m?`href="${m}"${C?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${U} ${W}
                class="banner-btn"
                data-bg="${T.bg}"
                data-color="${T.color}"
                data-hover-bg="${T.hoverBg}"
                data-hover-color="${T.hoverColor}"
                style="background:${T.bg};color:${T.color};border:2px solid ${T.border};">
                ${o}
            </${U}>`}function $(){s.innerHTML=r.map((o,m)=>`
                <div class="banner-slide" data-index="${m}">
                    <div class="banner-slide-inner">
                        <div class="banner-bg">
                            <img src="${o.image_url}"
                                 alt="${o.image_alt??o.title}"
                                 loading="${m===0?"eager":"lazy"}"
                                 decoding="async"
                                 fetchpriority="${m===0?"high":"low"}"
                                 draggable="false">
                        </div>
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            ${o.category?`<span class="banner-category-badge">${o.category}</span>`:""}
                            <h2 class="banner-title">${o.title}</h2>
                            <p class="banner-description">${o.description}</p>
                            ${o.btn_primary_text||o.btn_secondary_text?`
                                <div class="banner-buttons">
                                    ${o.btn_primary_text?B(o.btn_primary_text,o.btn_primary_url,o.btn_primary_style,o.btn_primary_external):""}
                                    ${o.btn_secondary_text?B(o.btn_secondary_text,o.btn_secondary_url,o.btn_secondary_style,o.btn_secondary_external):""}
                                </div>`:""}
                        </div>
                    </div>
                </div>
            `).join(""),b(),h(),u()}function b(){t.querySelectorAll(".banner-btn").forEach(o=>{const m=o.style.borderColor;o.addEventListener("mouseenter",()=>{o.style.background=o.dataset.hoverBg,o.style.color=o.dataset.hoverColor,o.style.borderColor=o.dataset.hoverBg}),o.addEventListener("mouseleave",()=>{o.style.background=o.dataset.bg,o.style.color=o.dataset.color,o.style.borderColor=m})})}function h(){s.addEventListener("mousedown",E),s.addEventListener("touchstart",E,{passive:!0}),s.addEventListener("mousemove",x),s.addEventListener("touchmove",x,{passive:!0}),s.addEventListener("mouseup",S),s.addEventListener("touchend",S),s.addEventListener("mouseleave",S)}function u(){r.forEach(o=>{const m=new Image;m.src=o.image_url})}function E(o){c=!0,g=o.touches?o.touches[0].clientX:o.clientX,d=0}function x(o){c&&(d=(o.touches?o.touches[0].clientX:o.clientX)-g)}function S(){c&&(c=!1,Math.abs(d)>=f&&(j(d<0?(l+1)%r.length:(l-1+r.length)%r.length),q()),d=0)}function A(){const o=t.querySelector(".banner-stripe");if(!o||r.length<=1)return;const m=document.createElement("div");m.className="banner-dots",r.forEach((w,C)=>{const T=document.createElement("button");T.className="banner-dot",T.dataset.index=String(C),T.setAttribute("aria-label",`Banner ${C+1}`),T.addEventListener("click",()=>{j(C),q()}),m.appendChild(T)}),o.innerHTML="",o.appendChild(m)}function j(o,m=!0){const w=s.querySelectorAll(".banner-slide"),C=t.querySelectorAll(".banner-dot");w.forEach((T,U)=>{const W=U===o;m||(T.style.transition="none"),T.classList.toggle("banner-slide--active",W),m||requestAnimationFrame(()=>{T.style.transition=""})}),C.forEach((T,U)=>{T.classList.toggle("banner-dot--active",U===o)}),l=o}function D(){r.length<=1||!v||(n=setInterval(()=>{j((l+1)%r.length)},5e3))}function q(){v&&(clearInterval(n),D())}function P(){const o=t.querySelector(".banner-wrapper");o&&(o.innerHTML=`
                    <div style="display:flex;align-items:center;justify-content:center;
                                min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;">
                        Sin contenido.
                    </div>`)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",p):p()}}const Ja=[{id:"banner-hero",label:"Banner Slider",category:"Banners",media:Wa,content:{type:"banner-hero-component"}}];function Za(t){const e="banner-hero-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Slider",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-autoplay":"true","data-category":""},components:`
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
                `,script:Ga(),traits:[{type:"select",name:"data-autoplay",label:"Avance automático",options:[{id:"true",name:"Activado"},{id:"false",name:"Desactivado"}],changeProp:!1},{type:"select",name:"data-category",label:"Filtrar por categoría",options:[{id:"",name:"Todas las categorías"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const i=this.getEl();if(!i)return;const a=this.get("script");a&&typeof a=="function"&&setTimeout(()=>a.call(i),100)})}}}),Qa(t,e),er(t,e),Ka(t,e)}async function Ka(t,e){try{const i=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",r=await(await fetch(i)).json();if(!Array.isArray(r))return;const l=[...new Set(r.map(d=>d.category).filter(Boolean))].sort();if(l.length===0)return;const n=t.DomComponents.getType(e);if(!n)return;const g=n.model.prototype.defaults.traits.find(d=>d.name==="data-category");if(!g)return;g.options=[{id:"",name:"Todas las categorías"},...l.map(d=>({id:d,name:d}))]}catch{}}function Qa(t,e){t.on("storage:end:load",()=>{setTimeout(()=>Ke(t,e),1e3)}),t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();a&&setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500)}}),t.on("canvas:render",()=>{setTimeout(()=>Ke(t,e),800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function Ke(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})}function er(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#banner-hero-styles")){const r=document.createElement("style");r.id="banner-hero-styles",r.textContent=Ya,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(240,135,42,0.6) !important;
                    outline-offset: 2px;
                }
            `,a.appendChild(r)}}})}const tr=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="17" y="8" width="12" height="14" fill="#E97300" rx="2"/>
    <rect x="19" y="10" width="8" height="10" fill="#f8e7d8" rx="1"/>
</svg>`,ir=`
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
}`;function ar(){return function(){const t=this,e=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",i={"fill-blue":{bg:"#003B71",color:"#ffffff",border:"#003B71",hoverBg:"#002a52",hoverColor:"#ffffff"},"outline-blue":{bg:"transparent",color:"#003B71",border:"#003B71",hoverBg:"#003B71",hoverColor:"#ffffff"},"fill-orange":{bg:"#E97300",color:"#ffffff",border:"#E97300",hoverBg:"#c96200",hoverColor:"#ffffff"},"outline-orange":{bg:"transparent",color:"#E97300",border:"#E97300",hoverBg:"#E97300",hoverColor:"#ffffff"},"fill-white":{bg:"#ffffff",color:"#003B71",border:"#ffffff",hoverBg:"#dce8f5",hoverColor:"#003B71"},"outline-white":{bg:"transparent",color:"#ffffff",border:"#ffffff",hoverBg:"#ffffff",hoverColor:"#003B71"}},a=".bsingle-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.bsingle-inner{position:relative;width:100%;min-height:480px;display:flex;align-items:center;}.bsingle-bg{position:absolute;inset:0;z-index:0;}.bsingle-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.bsingle-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.bsingle-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.bsingle-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.bsingle-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.bsingle-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.bsingle-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.bsingle-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.bsingle-stripe{position:relative;width:100%;height:40px;background:#E97300;z-index:20;}@media(max-width:768px){.bsingle-inner{min-height:340px;}.bsingle-bg img{object-position:right center;}.bsingle-content{max-width:100%;width:100%;padding:32px 24px 80px;}.bsingle-buttons{flex-wrap:wrap;gap:12px;}.bsingle-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.bsingle-btn{flex:1 1 100%;min-width:0;}}";(function(){const p=t.ownerDocument??document;if(!p.getElementById("banner-single-styles")){const k=p.createElement("style");k.id="banner-single-styles",k.textContent=a,p.head.appendChild(k)}})();const r=t.dataset.bannerId??"",l=t.querySelector(".bsingle-content-wrapper");async function n(){c();try{const p=await(await fetch(e)).json();if(!Array.isArray(p)||p.length===0){y();return}const k=r?p.find(z=>String(z.id)===String(r)):p[0];if(!k){y();return}f(k)}catch{y()}}function c(){l.innerHTML=`
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
                </div>`;const s=t.ownerDocument??document;if(!s.getElementById("banner-skeleton-styles")){const p=s.createElement("style");p.id="banner-skeleton-styles",p.textContent="@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title--short{width:60%;}.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-line--short{width:55%;}.bsk-buttons{display:flex;gap:16px;margin-top:36px;}.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}@media(max-width:768px){.bsk-buttons{flex-direction:column;}}",s.head.appendChild(p)}}function g(s){return i[s]??i["fill-white"]}function d(s,p,k,z){const B=g(k),$=p?"a":"span",b=p?`href="${p}"${z?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${$} ${b}
                class="bsingle-btn"
                data-bg="${B.bg}"
                data-color="${B.color}"
                data-border="${B.border}"
                data-hover-bg="${B.hoverBg}"
                data-hover-color="${B.hoverColor}"
                style="background:${B.bg};color:${B.color};border:2px solid ${B.border};">
                ${s}
            </${$}>`}function f(s){l.innerHTML=`
                <div class="bsingle-inner">
                    <div class="bsingle-bg">
                        <img src="${s.image_url}"
                             alt="${s.image_alt??s.title}"
                             loading="eager"
                             decoding="async"
                             fetchpriority="high"
                             draggable="false">
                    </div>
                    <div class="bsingle-overlay"></div>
                    <div class="bsingle-content">
                        ${s.category?`<span class="bsingle-category-badge">${s.category}</span>`:""}
                        <h2 class="bsingle-title">${s.title}</h2>
                        <p class="bsingle-description">${s.description}</p>
                        ${s.btn_primary_text||s.btn_secondary_text?`
                            <div class="bsingle-buttons">
                                ${s.btn_primary_text?d(s.btn_primary_text,s.btn_primary_url,s.btn_primary_style,s.btn_primary_external):""}
                                ${s.btn_secondary_text?d(s.btn_secondary_text,s.btn_secondary_url,s.btn_secondary_style,s.btn_secondary_external):""}
                            </div>`:""}
                    </div>
                </div>`,v()}function v(){t.querySelectorAll(".bsingle-btn").forEach(s=>{const p=s.style.borderColor;s.addEventListener("mouseenter",()=>{s.style.background=s.dataset.hoverBg,s.style.color=s.dataset.hoverColor,s.style.borderColor=s.dataset.hoverBg}),s.addEventListener("mouseleave",()=>{s.style.background=s.dataset.bg,s.style.color=s.dataset.color,s.style.borderColor=p})})}function y(){l.innerHTML=`
                <div style="display:flex;align-items:center;justify-content:center;
                            min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;">
                    No hay banner seleccionado o no está activo.
                </div>`}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",n):n()}}const rr=[{id:"banner-single",label:"Banner Individual",category:"Banners",media:tr,content:{type:"banner-single-component"}}];function lr(t){const e="banner-single-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Individual",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-banner-id":""},components:`
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
                `,script:ar(),traits:[{type:"select",name:"data-banner-id",label:"Banner a mostrar",options:[{id:"",name:"Cargando banners..."}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const i=this.getEl();if(!i)return;const a=this.get("script");a&&typeof a=="function"&&setTimeout(()=>a.call(i),100)})}}}),nr(t,e),sr(t,e),or(t,e)}async function or(t,e){try{const i=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",r=await(await fetch(i)).json();if(!Array.isArray(r)||r.length===0)return;const l=t.DomComponents.getType(e);if(!l)return;const c=l.model.prototype.defaults.traits.find(g=>g.name==="data-banner-id");if(!c)return;c.options=[{id:"",name:"— Seleccionar banner —"},...r.map(g=>({id:String(g.id),name:g.category?`[${g.category}] ${g.title}`:g.title}))]}catch{}}function nr(t,e){t.on("storage:end:load",()=>{setTimeout(()=>Qe(t,e),1e3)}),t.on("component:mount",i=>{const a=i.getEl();a?.getAttribute?.("data-gjs-type")===e&&(i.set("type",e),setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500))}),t.on("component:clone",i=>{if(i.get("type")===e){const a=i.getEl();a&&setTimeout(()=>{const r=i.get("script");r&&typeof r=="function"&&r.call(a)},500)}}),t.on("canvas:render",()=>{setTimeout(()=>Qe(t,e),800)}),t.on("storage:start:store",()=>{t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e),i.addAttributes({"data-gjs-type":e})})})}function Qe(t,e){t.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(i=>{i.set("type",e);const a=i.getEl();if(a?.isConnected){const r=i.get("script");r&&typeof r=="function"&&r.call(a)}})}function sr(t,e){t.on("load",()=>{const i=t.Canvas.getFrameEl();if(!i)return;const a=i.contentDocument?.head;if(a){if(!a.querySelector("#banner-single-styles")){const r=document.createElement("style");r.id="banner-single-styles",r.textContent=ir,a.appendChild(r)}if(!a.querySelector(`#${e}-editor-css`)){const r=document.createElement("style");r.id=`${e}-editor-css`,r.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(240,135,42,0.6) !important;
                    outline-offset: 2px;
                }
            `,a.appendChild(r)}}})}const cr="/bancaintegral",nt=`
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
</style>`;function st(t,e){e=e||"hb"+Math.random().toString(36).slice(2,7);const i=t.bg_image||O("images/placeholder.svg"),a=t.btn_primary||{},r=t.btn_secondary||{},l=a.color||"white",n=r.color||"white",c=a.enabled?`<a href="${a.href||"#"}" class="hb-btn hb-btn-${l}-solid">${a.label||"Conoce más"}</a>`:"",g=r.enabled?`<a href="${r.href||"#"}" class="hb-btn hb-btn-${n}-outline">${r.label||"Solicitar"}</a>`:"";return`<section id="hb-root-${e}" class="hb-section" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="hb-bg" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
            <img src="${i}" alt="${t.title||"Banner"}" loading="eager" decoding="async" fetchpriority="high" draggable="false">
        </div>
        <div class="hb-content">
            <h2 class="hb-title">${t.title||"Título del banner"}</h2>
            <p class="hb-subtitle">${t.subtitle||"Subtítulo del banner"}</p>
            <div class="hb-buttons">${c}${g}</div>
        </div>
    </section>`}const K={bg_image:O("images/placeholder.svg"),title:"Cuenta de Ahorro Electrónica",subtitle:"Dale un giro digital a tus ahorros",btn_primary:{enabled:!0,label:"Abre tu cuenta",href:"#",color:"white"},btn_secondary:{enabled:!0,label:"Conoce más",href:"#",color:"white"}};function dr(t,e){const i=document.getElementById("hero-banner-config-modal");if(i&&i.remove(),!document.getElementById("hb-modal-styles")){const b=document.createElement("style");b.id="hb-modal-styles",b.textContent=`
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
        `,document.head.appendChild(b)}const a=(()=>{try{return JSON.parse(e.getAttributes()["data-hero-banner-config"]||"{}")}catch{return{}}})(),r=a.bg_image||K.bg_image,l=a.title||K.title,n=a.subtitle||K.subtitle,c=JSON.parse(JSON.stringify(a.btn_primary||K.btn_primary)),g=JSON.parse(JSON.stringify(a.btn_secondary||K.btn_secondary)),d=document.createElement("div");d.id="hero-banner-config-modal",d.className="hb-overlay";const f=document.createElement("div");f.className="hb-modal",f.innerHTML=`
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
                    <label class="hb-label">Subtítulo</label>
                    <input id="hb-subtitle" type="text" placeholder="Subtítulo del banner" value="${n}" class="hb-input">
                </div>
            </div>
            <div class="hb-tab-panel" id="hb-panel-buttons">
                <div class="hb-card">
                    <div class="hb-row" style="justify-content:space-between;margin-bottom:0.5rem;">
                        <div class="hb-section-title" style="border:none;margin:0;padding:0;">Botón primario</div>
                        <label class="hb-switch">
                            <input type="checkbox" id="hb-btn1-enabled" ${c.enabled!==!1?"checked":""}>
                            <span class="hb-switch-slider" id="hb-btn1-slider"></span>
                            <span class="hb-switch-knob" id="hb-btn1-knob"></span>
                        </label>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="hb-label" style="margin-bottom:0.375rem;">Texto</label>
                            <input id="hb-btn1-label" type="text" placeholder="Abre tu cuenta" value="${c.label||""}" class="hb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="hb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="hb-btn1-href" type="text" placeholder="URL o buscar página..." value="${c.href||"#"}" class="hb-input">
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
                            <input type="checkbox" id="hb-btn2-enabled" ${g.enabled!==!1?"checked":""}>
                            <span class="hb-switch-slider" id="hb-btn2-slider"></span>
                            <span class="hb-switch-knob" id="hb-btn2-knob"></span>
                        </label>
                    </div>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="hb-label" style="margin-bottom:0.375rem;">Texto</label>
                            <input id="hb-btn2-label" type="text" placeholder="Conoce más" value="${g.label||""}" class="hb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="hb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="hb-btn2-href" type="text" placeholder="URL o buscar página..." value="${g.href||"#"}" class="hb-input">
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
        </div>`,d.appendChild(f),document.body.appendChild(d);const y=`${document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??""}/api/pages/search`;function s(b){if(b.dataset.autocompleteAttached)return;b.dataset.autocompleteAttached="true";const h=b.parentNode;(!h.style.position||h.style.position==="static")&&(h.style.position="relative");const u=document.createElement("ul");u.style.cssText="position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;max-height:200px;overflow-y:auto;display:none;",h.appendChild(u);let E=null;async function x(j){if(j.length<1){u.style.display="none";return}try{const q=await(await fetch(`${y}?q=${encodeURIComponent(j)}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json();A(q,j)}catch{u.style.display="none"}}function S(j,D){return D?j.replace(new RegExp(`(${D.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi"),'<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>'):j}function A(j,D){if(u.innerHTML="",!j.length){u.style.display="none";return}j.forEach(q=>{const P=document.createElement("li");P.style.cssText="padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;",P.innerHTML=`<span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${S(q.title,D)}</span><span style="font-size:0.7rem;color:#64748b;">/${q.slug}</span>`,P.addEventListener("mouseenter",()=>P.style.background="#f1f5f9"),P.addEventListener("mouseleave",()=>P.style.background=""),P.addEventListener("mousedown",o=>{o.preventDefault(),b.value=`${cr}/${q.slug}`,b.dispatchEvent(new Event("input")),u.style.display="none"}),u.appendChild(P)}),u.style.display="block"}b.addEventListener("input",()=>{clearTimeout(E),E=setTimeout(()=>x(b.value.trim()),220)}),b.addEventListener("focus",()=>{b.select(),b.value.trim()&&x(b.value.trim())}),b.addEventListener("blur",()=>{setTimeout(()=>{u.style.display="none"},150)}),b.addEventListener("keydown",j=>{if(u.style.display==="none")return;const D=u.querySelectorAll("li"),q=u.querySelector("li.hb-ac-active");let P=Array.from(D).indexOf(q);if(j.key==="ArrowDown"){j.preventDefault(),q?.classList.remove("hb-ac-active");const o=D[P+1]||D[0];o?.classList.add("hb-ac-active"),o&&(o.style.background="#f1f5f9")}else if(j.key==="ArrowUp"){j.preventDefault(),q?.classList.remove("hb-ac-active");const o=D[P-1]||D[D.length-1];o?.classList.add("hb-ac-active"),o&&(o.style.background="#f1f5f9")}else j.key==="Enter"&&q?(j.preventDefault(),q.dispatchEvent(new MouseEvent("mousedown"))):j.key==="Escape"&&(u.style.display="none")})}s(f.querySelector("#hb-btn1-href")),s(f.querySelector("#hb-btn2-href"));let p=c.color||"white",k=g.color||"white";function z(b,h,u){const E=f.querySelector(`#${b}`);E.querySelectorAll("[data-color]").forEach(x=>{x.classList.toggle("hb-color-inactive",x.dataset.color!==h),x.addEventListener("click",()=>{E.querySelectorAll("[data-color]").forEach(S=>S.classList.toggle("hb-color-inactive",S.dataset.color!==x.dataset.color)),u(x.dataset.color)})})}z("hb-btn1-colors",p,b=>p=b),z("hb-btn2-colors",k,b=>k=b);function B(b,h,u){const E=f.querySelector(`#${b}`),x=f.querySelector(`#${h}`),S=f.querySelector(`#${u}`),A=()=>{x.style.background=E.checked?"#003B71":"#cbd5e1",S.style.left=E.checked?"21px":"3px"};A(),E.addEventListener("change",A)}B("hb-btn1-enabled","hb-btn1-slider","hb-btn1-knob"),B("hb-btn2-enabled","hb-btn2-slider","hb-btn2-knob"),f.querySelectorAll(".hb-tab-btn").forEach(b=>{b.addEventListener("click",()=>{f.querySelectorAll(".hb-tab-btn").forEach(h=>h.classList.remove("active")),f.querySelectorAll(".hb-tab-panel").forEach(h=>h.classList.remove("active")),b.classList.add("active"),f.querySelector(`#hb-panel-${b.dataset.tab}`).classList.add("active")})}),f.querySelector("#hb-bg-pick").addEventListener("click",()=>{Le({type:"image",title:"Seleccionar imagen de fondo",onSelect:b=>{f.querySelector("#hb-bg-url").value=b,f.querySelector("#hb-bg-preview").src=b}})}),f.querySelector("#hb-bg-url").addEventListener("input",b=>{f.querySelector("#hb-bg-preview").src=b.target.value});const $=()=>d.remove();f.querySelector("#hb-modal-close").onclick=$,f.querySelector("#hb-modal-cancel").onclick=$,d.onclick=b=>{b.target===d&&$()},f.querySelector("#hb-modal-save").onclick=()=>{const b={bg_image:f.querySelector("#hb-bg-url").value.trim()||K.bg_image,title:f.querySelector("#hb-title").value.trim(),subtitle:f.querySelector("#hb-subtitle").value.trim(),btn_primary:{enabled:f.querySelector("#hb-btn1-enabled").checked,label:f.querySelector("#hb-btn1-label").value.trim(),href:f.querySelector("#hb-btn1-href").value.trim()||"#",color:p},btn_secondary:{enabled:f.querySelector("#hb-btn2-enabled").checked,label:f.querySelector("#hb-btn2-label").value.trim(),href:f.querySelector("#hb-btn2-href").value.trim()||"#",color:k}},u=e.getEl()?.querySelector("[id^='hb-root-']")?.id?.replace("hb-root-","")||"hb"+Math.random().toString(36).slice(2,7);e.addAttributes({"data-hero-banner-config":JSON.stringify(b)}),e.components(st(b,u)+nt),$()}}function fr(t){const e="hero-banner-component";t.DomComponents.addType(e,{isComponent:i=>i.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner",tagName:"div",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":e,"data-hero-banner-config":JSON.stringify(K)},components:st(K)+nt,toolbar:[],traits:[{type:"button",label:"Banner",text:"Administrar Banner",full:!0,command:"open-hero-banner-config"}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),t.Commands.add("open-hero-banner-config",{run(i){const a=i.getSelected();a&&dr(i,a)}}),t.BlockManager.add("hero-banner-block",{label:"Banner",category:"Banners",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#E97300" rx="2"/>
            <rect x="2" y="6" width="16" height="3" rx="1.5" fill="#fff" fill-opacity="0.9"/>
            <rect x="2" y="11" width="12" height="2" rx="1" fill="#fff" fill-opacity="0.7"/>
            <rect x="2" y="16" width="9" height="4" rx="2" fill="#fff"/>
            <rect x="13" y="16" width="9" height="4" rx="2" fill="none" stroke="#fff" stroke-width="1"/>
        </svg>`,activate:!0,content:{type:e,attributes:{"data-gjs-type":e}}})}function hr(t){I.registerBlocks(jt),I.registerBlocks(Nt),I.registerBlocks(Ja),I.registerBlocks(rr),I.registerBlocks(Pi),I.registerBlocks($i),I.registerBlocks(Ft),I.registerBlocks(di),I.registerBlocks(gi),I.registerBlocks(Kt),I.registerBlocks(Di),I.registerBlocks(ti),I.registerBlocks(bi),I.registerBlocks(vi),I.registerBlocks(Ui),I.registerBlocks(Wi),I.registerBlocks(Ji),I.registerBlocks(ha),I.registerBlocks(ma),I.registerBlocks(wa),I.registerBlocks(qa),I.registerBlocks(Pa),I.registerBlocks(oa),I.registerBlocks(ca),I.registerBlocks(Ua),I.applyToEditor(t),Fa(t),Za(t),lr(t),fr(t),ni(t),Jt(t),Da(t),Si(t),ka(t)}function gr(t,e,i){t.on("component:add",()=>e.markAsDirty()),t.on("component:remove",()=>e.markAsDirty()),t.on("component:update",()=>e.markAsDirty()),t.on("style:update",()=>e.markAsDirty());const a=document.getElementById("save-button");a&&a.addEventListener("click",async()=>{await pr(t,e,i,a)}),document.addEventListener("keydown",r=>{(r.ctrlKey||r.metaKey)&&r.key==="s"&&(r.preventDefault(),a&&!a.disabled&&a.click())})}async function pr(t,e,i,a){a.disabled=!0,a.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{i.needsTitle()?await mr(t,e,i):await ct(t,e,i)}catch(r){dt(r.message,"error")}finally{a.disabled=!1,a.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}async function mr(t,e,i){return new Promise((a,r)=>{ht({title:"Título de la Página",description:"Ingresa un título descriptivo para identificar esta página",placeholder:"Ej: Acerca de Nosotros",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async l=>{if(!l?.trim()){r(new Error("El título es obligatorio"));return}try{await ct(t,e,i,l),a()}catch(n){r(n)}},onCancel:()=>{r(new Error("Guardado cancelado"))}})})}async function ct(t,e,i,a=null){const l={...e.getEditorContent(t),is_published:i.isPublished};a&&(l.title=a);const n=await e.savePage(t,l,i.storeUrl,i.getHttpMethod());n.success&&(e.markAsClean(),dt(n.message,"success"),!i.isEditMode&&n.page?(i.updatePageInfo(n),i.updateTitle(n.page.title)):a&&i.updateTitle(a))}function dt(t,e){typeof window.showNotification=="function"&&window.showNotification(t,e)}document.addEventListener("DOMContentLoaded",async()=>{const t=new gt,e=new $t;new St(t);const i=pt();if(i.on("load",()=>{hr(i),mt(i),bt(),ut(),xt(i),yt(i),vt(i),wt(i),kt(i),Bt(i),br(i),ur(i),xr(i),setTimeout(()=>{i.runCommand("sw-visibility"),i.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),e.isEditMode)try{await t.loadPageContent(i,e.loadUrl),et("Contenido cargado correctamente","success")}catch(a){et("Error al cargar el contenido","error"),console.error(a)}gr(i,t,e)});function br(t){const e=[{cmd:"set-device-desktop",device:"Desktop"},{cmd:"set-device-tablet",device:"Tablet"},{cmd:"set-device-mobile",device:"Mobile"}];e.forEach(({cmd:i,device:a})=>{t.Commands.add(i,{run:r=>{r.setDevice(a),e.forEach(({cmd:l})=>{r.Panels.getButton("devices-c",l)?.set("active",l===i)})}})})}function ur(t){t.Commands.add("canvas-clear",{run:e=>{Et({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{e.DomComponents.clear(),e.CssComposer.clear()}})}})}function xr(t){const e=t.Canvas.getFrameEl();if(!e?.contentDocument?.head)return;const i=e.contentDocument.createElement("style");i.id="gjs-dashed-fix",i.textContent="body,body.gjs-dashed{margin:0!important;padding:0 0 160px 0!important;}",e.contentDocument.head.appendChild(i)}function et(t,e="info"){typeof window.showNotification=="function"&&window.showNotification(t,e)}
