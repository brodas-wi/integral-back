/* empty css                   *//* empty css                    *//* empty css                          *//* empty css                           */import{M as Te,E as ze,i as Ie,t as _e,d as Ae,f as Me,e as De,s as qe,g as He,c as Ne,b as Pe,a as Oe}from"./editor-commands-CDeyLZrS.js";import{a as Z}from"./url-DaqOO3yL.js";import"./_commonjsHelpers-CqkleIqs.js";class Re{constructor(){this.pageId=this.getElementValue("page-id"),this.pageSlug=this.getElementValue("page-slug"),this.pageTitle=this.getPageTitle(),this.loadUrl=this.getElementValue("page-load-url"),this.storeUrl=this.getElementValue("page-store-url"),this.isPublished=this.getElementValue("page-is-published")==="1",this.isEditMode=!!this.pageId}getElementValue(e,t=""){const r=document.getElementById(e);return r?r.value.trim():t}getPageTitle(){const e=document.getElementById("editor-title");if(!e)return"";const r=e.textContent.match(/(?:Editando:|Nueva Página)\s*(.+)?/);return r&&r[1]?r[1].trim():""}updatePageInfo(e){if(e.page){this.pageId=e.page.id,this.pageSlug=e.page.slug,this.pageTitle=e.page.title,this.isEditMode=!0,document.getElementById("page-id").value=this.pageId,document.getElementById("page-slug").value=this.pageSlug;const t=this.storeUrl.replace("/pages",`/pages/${this.pageSlug}`);this.storeUrl=t,document.getElementById("page-store-url").value=t,this.loadUrl=`/pages/${this.pageSlug}/load`,document.getElementById("page-load-url").value=this.loadUrl}}updateTitle(e){this.pageTitle=e;const t=document.getElementById("editor-title");t&&(t.textContent=`Editando: ${e}`)}getHttpMethod(){return this.isEditMode?"PUT":"POST"}needsTitle(){return!this.isEditMode}}class Ue{constructor(e){this.editorService=e,this.setupBackButton(),this.setupBeforeUnload()}setupBackButton(){const e=document.querySelector("#editor-navbar a[href]");e&&e.addEventListener("click",t=>{this.editorService.shouldPreventUnload()&&(t.preventDefault(),this.showUnsavedChangesModal(()=>{this.editorService.startNavigation(),window.location.href=e.href}))})}setupBeforeUnload(){window.addEventListener("beforeunload",e=>{if(this.editorService.shouldPreventUnload())return e.preventDefault(),e.returnValue="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?",e.returnValue})}showUnsavedChangesModal(e){const t=document.createElement("div");t.style.cssText=`
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
        `;const l=document.createElement("div");l.style.cssText=`
            padding: 1rem 1.5rem;
            background: #f9fafb;
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
            margin-top: 1.5rem;
        `;const g=document.createElement("button");g.textContent="Cancelar",g.style.cssText=`
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            background: #ffffff;
            color: #374151;
            border: 2px solid #d1d5db;
            font-family: inherit;
        `;const d=document.createElement("button");d.textContent="Salir sin guardar",d.style.cssText=`
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            background: #dc2626;
            color: #ffffff;
            border: 2px solid #dc2626;
            font-family: inherit;
        `,[g,d].forEach(f=>{f.addEventListener("mouseenter",()=>{f.style.opacity="0.85"}),f.addEventListener("mouseleave",()=>{f.style.opacity="1"})});const c=()=>t.remove();g.addEventListener("click",c),d.addEventListener("click",()=>{c(),e()}),t.addEventListener("click",f=>{f.target===t&&c()}),l.appendChild(g),l.appendChild(d),r.appendChild(a),r.appendChild(l),t.appendChild(r),document.body.appendChild(t)}}const Fe="Básico";class We{constructor(){this.blocks=new Map}registerBlock(e,t){this.blocks.has(t.category)||this.blocks.set(t.category,[]),this.blocks.get(t.category).push({id:e,...t})}registerBlocks(e){e.forEach(t=>{this.registerBlock(t.id,t)})}applyToEditor(e){this.blocks.forEach(t=>{t.forEach(r=>{const{id:a,...l}=r;e.BlockManager.add(a,l)})}),this.applyCollapseSettings(e),this.hideDefaultCategories(e)}applyCollapseSettings(e){setTimeout(()=>{e.BlockManager.getCategories().each(t=>{t.set("open",t.get("label")===Fe)})},500)}hideDefaultCategories(e){setTimeout(()=>{const t=["Basic","Extra"];document.querySelectorAll(".gjs-block-category").forEach(r=>{const a=r.querySelector(".gjs-title");a&&t.includes(a.textContent.trim())&&(r.style.display="none")})},100)}}const I=new We,Ve=[{id:"heading1",label:"Título H1",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:{type:"image",attributes:{src:Z("images/placeholder.svg"),alt:"Imagen"},classes:["max-w-full","h-auto","block"],activeOnRender:1}},{id:"unordered-list",label:"Lista no ordenada",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:'<div class="h-12 w-full"></div>'}],Ye=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Ge=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Ze=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="12" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="22" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Xe=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="9" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="25" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Qe=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="13" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Je=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="21" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,Ke=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="14" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="23" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,et=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="11" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="20" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,j='<div class="flex flex-col gap-4 py-1" style="min-height:60px;"></div>',V="<style>@media(max-width:768px){.col-grid{grid-template-columns:1fr !important;}}</style>",tt=[{id:"columns-1",label:"1 Columna",category:"Columnas",media:Ye,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto flex flex-col gap-4 py-1" style="min-height:60px;">
    </div>
</div>
        `},{id:"columns-2",label:"2 Columnas",category:"Columnas",media:Ge,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid grid-cols-2 gap-6">
            ${j}
            ${j}
        </div>
    </div>
</div>
${V}
        `},{id:"columns-3",label:"3 Columnas",category:"Columnas",media:Ze,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid grid-cols-3 gap-6">
            ${j}
            ${j}
            ${j}
        </div>
    </div>
</div>
${V}
        `},{id:"columns-4",label:"4 Columnas",category:"Columnas",media:Xe,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid grid-cols-4 gap-6">
            ${j}
            ${j}
            ${j}
            ${j}
        </div>
    </div>
</div>
${V}
        `},{id:"columns-1-3",label:"1/3 — 2/3",category:"Columnas",media:Qe,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:1fr 2fr;">
            ${j}
            ${j}
        </div>
    </div>
</div>
${V}
        `},{id:"columns-3-1",label:"2/3 — 1/3",category:"Columnas",media:Je,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:2fr 1fr;">
            ${j}
            ${j}
        </div>
    </div>
</div>
${V}
        `},{id:"columns-1-2",label:"1/4 — 1/4 — 1/2",category:"Columnas",media:Ke,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:1fr 1fr 2fr;">
            ${j}
            ${j}
            ${j}
        </div>
    </div>
</div>
${V}
        `},{id:"columns-2-1",label:"1/2 — 1/4 — 1/4",category:"Columnas",media:et,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:2fr 1fr 1fr;">
            ${j}
            ${j}
            ${j}
        </div>
    </div>
</div>
${V}
        `}],it=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="3" width="14" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.3" rx="1.5"/>
    <rect x="4" y="5" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="9" width="10" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="4" y="11" width="8" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="4" y="13" width="9" height="1" rx="0.5" fill="#003B71" fill-opacity="0.3"/>
    <rect x="4" y="17" width="10" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <rect x="4" y="21" width="3" height="5" rx="1" fill="#E97300"/>
    <rect x="8" y="21" width="3" height="5" rx="1" fill="#E97300"/>
    <rect x="12" y="21" width="3" height="5" rx="1" fill="#E97300"/>
    <rect x="18" y="3" width="12" height="26" fill="#E97300" fill-opacity="0.15" rx="2"/>
    <rect x="20" y="5" width="8" height="22" fill="#E97300" fill-opacity="0.3" rx="1.5"/>
</svg>`,at=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#E97300" rx="2"/>
    <rect x="8" y="9" width="16" height="2" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="8" y="14" width="14" height="1.2" rx="0.6" fill="white" fill-opacity="0.6"/>
    <rect x="8" y="17" width="12" height="1.2" rx="0.6" fill="white" fill-opacity="0.6"/>
</svg>`,rt=`
<div class="flex flex-col gap-3 rounded-2xl p-5 text-center bg-[#E97300]">
    <h3 class="text-base font-bold text-white">Lorem ipsum</h3>
    <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</div>`,ge=`
<style>
.ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;}
.ab-mvv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1.5rem;}
.ab-image{width:100%;border-radius:1.5rem;overflow:hidden;}
.ab-image img{width:100%;height:100%;object-fit:cover;display:block;}
@media(max-width:768px){
    .ab-grid{grid-template-columns:1fr;gap:2rem;}
    .ab-content-col{order:1;}
    .ab-image-col{order:2;}
    .ab-mvv-grid{grid-template-columns:1fr;}
}
</style>`,lt=[{id:"about-section",label:"Sección Nosotros",category:"Contenido",media:it,content:`
<section class="w-full bg-white py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="ab-grid">
            <div class="ab-content-col flex flex-col gap-4">
                <h2 class="text-4xl font-bold text-[#003B71]">Lorem ipsum dolor sit amet</h2>
                <p class="text-base text-[#003B71] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <h2 class="text-2xl font-bold text-[#003B71] mt-4">Lorem ipsum dolor</h2>
                <div class="ab-mvv-grid">
                    <div class="flex flex-col gap-3 rounded-2xl p-5 text-center bg-[#E97300]">
                        <h3 class="text-base font-bold text-white">Lorem ipsum</h3>
                        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                    <div class="flex flex-col gap-3 rounded-2xl p-5 text-center bg-[#E97300]">
                        <h3 class="text-base font-bold text-white">Lorem ipsum</h3>
                        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                    <div class="flex flex-col gap-3 rounded-2xl p-5 text-center bg-[#E97300]">
                        <h3 class="text-base font-bold text-white">Lorem ipsum</h3>
                        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet consectetur.</p>
                    </div>
                </div>
            </div>
            <div class="ab-image-col">
                <div class="ab-image">
                    <img src="${Z("images/placeholder.svg")}" alt="Imagen de sección">
                </div>
            </div>
        </div>
    </div>
</section>
${ge}`},{id:"about-mvv-card",label:"Tarjeta Misión/Visión/Valores",category:"Contenido",media:at,content:`${rt}${ge}`}],ot=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,nt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
    <a href="#" class="pc-btn w-full py-2 px-4 rounded-lg bg-[#003B71] text-white text-base font-semibold text-center">Solicitar</a>
</div>`,fe=`
<style>
.pc-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}
.pc-btn {
    display: block;
    transition: background 0.2s, color 0.2s;
}
.pc-btn:hover {
    background-color: #002a52;
}
@media (max-width: 900px) {
    .pc-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
    .pc-grid { grid-template-columns: 1fr; }
}
</style>`,st=[{id:"product-cards-section",label:"Sección de productos",category:"Productos y Servicios",media:ot,content:`
<section class="w-full bg-white py-12 px-6">
    <div class="max-w-6xl mx-auto">
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
    </div>
</section>
${fe}`},{id:"product-card",label:"Tarjeta de producto",category:"Productos y Servicios",media:nt,content:`${X}${fe}`}],dt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,he=`
<div class="flex flex-col gap-5 rounded-2xl p-8 dc-bg-primary">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold text-white">Lorem ipsum dolor</h3>
        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-outline w-full py-3 px-4 rounded-lg bg-white dc-text-primary text-base font-semibold text-center">Lorem ipsum</a>
</div>`,pe=`
<div class="flex flex-col gap-5 rounded-2xl p-8 bg-white border border-gray-200">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center dc-bg-light">
        <i class="ri-bank-line text-2xl dc-text-primary"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold dc-text-primary">Lorem ipsum dolor</h3>
        <p class="text-base dc-text-primary leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-solid w-full py-3 px-4 rounded-lg dc-bg-primary text-white text-base font-semibold text-center">Lorem ipsum</a>
</div>`,ne=`
<style>
.dc-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;align-items:stretch;}
.dc-btn-outline{display:block;transition:background .2s,color .2s;}
.dc-btn-outline:hover{background:#dce8f5;color:#003B71;}
.dc-btn-solid{display:block;transition:background .2s,color .2s;}
.dc-btn-solid:hover{background:#002a52;}
.dc-text-primary{color:#003B71;}
.dc-bg-primary{background-color:#003B71;}
.dc-bg-light{background-color:#dce8f5;}
@media(max-width:640px){.dc-grid{grid-template-columns:1fr;}}
</style>`,ct=[{id:"dual-card-section",label:"Sección dos tarjetas",category:"Productos y Servicios",media:dt,content:`
<section class="w-full bg-white py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-[#003B71] mb-3">Lorem ipsum dolor sit amet</h2>
            <p class="text-base text-[#003B71]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="dc-grid">
            ${he}
            ${pe}
        </div>
    </div>
</section>
${ne}`},{id:"dual-card-dark",label:"Tarjeta azul oscuro",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="#003B71" rx="2"/>
            <rect x="5" y="5" width="6" height="6" fill="rgba(255,255,255,0.2)" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="white" fill-opacity="0.9"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="white"/>
        </svg>`,content:`${he}${ne}`},{id:"dual-card-light",label:"Tarjeta blanca",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="white" rx="2" stroke="#003B71" stroke-width="0.5" stroke-opacity="0.3"/>
            <rect x="5" y="5" width="6" height="6" fill="#dce8f5" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.8"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="#003B71"/>
        </svg>`,content:`${pe}${ne}`}],gt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="white" rx="2" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="8" y="7" width="16" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="11" width="12" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="11" y="13.5" width="10" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="6" y="18" width="9" height="5" rx="1.5" fill="#E97300"/>
    <rect x="17" y="18" width="9" height="5" rx="1.5" fill="white" stroke="#e5e7eb" stroke-width="0.8"/>
</svg>`,ft=`
<style>
.cta-watermark-left{position:absolute;bottom:-16px;left:-16px;width:220px;height:220px;opacity:0.2;pointer-events:none;user-select:none;transform:scaleX(-1);}
.cta-watermark-right{position:absolute;bottom:-16px;right:-16px;width:220px;height:220px;opacity:0.2;pointer-events:none;user-select:none;}
.cta-watermark-left img,.cta-watermark-right img{width:100%;height:100%;object-fit:contain;}
.cta-btn-primary{display:inline-block;padding:14px 36px;border-radius:8px;background:#E97300;color:#ffffff;font-size:1rem;font-weight:600;text-decoration:none;transition:background .2s;}
.cta-btn-primary:hover{background:#c96200;}
.cta-btn-secondary{display:inline-block;padding:14px 36px;border-radius:8px;background:#ffffff;color:#E97300;font-size:1rem;font-weight:600;text-decoration:none;box-shadow:0 2px 12px rgba(0,0,0,0.12);transition:background .2s,box-shadow .2s,color .2s;}
.cta-btn-secondary:hover{background:#E97300;color:#ffffff;}
@media(max-width:480px){
    .cta-btn-primary,.cta-btn-secondary{width:100%;text-align:center;}
}
</style>`,ht=[{id:"cta-section",label:"Llamada a la acción",category:"Contenido",media:gt,content:`
<section class="relative overflow-hidden w-full bg-white py-20 px-6">
    <div class="cta-watermark-left">
        <img src="${Z("images/brand-logo.png")}" alt="">
    </div>
    <div class="cta-watermark-right">
        <img src="${Z("images/brand-logo.png")}" alt="">
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
${ft}`}],pt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,mt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="none" stroke="rgba(255,255,255,0.9)" stroke-width="0.8" rx="2"/>
    <rect x="7" y="7" width="6" height="6" fill="white" rx="1.2"/>
    <rect x="7" y="15" width="14" height="1.2" fill="rgba(255,255,255,0.7)" rx="0.5"/>
    <rect x="7" y="17.5" width="10" height="1.2" fill="rgba(255,255,255,0.5)" rx="0.5"/>
    <rect x="7" y="22" width="18" height="3" fill="white" rx="1"/>
</svg>`,Y=`
<div class="flex flex-col gap-3 border-2 border-white rounded-2xl p-6 bg-transparent">
    <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0">
        <i class="ri-safe-line text-2xl text-[#003B71]"></i>
    </div>
    <h3 class="text-base font-bold text-white">Título del producto</h3>
    <p class="text-base text-white leading-relaxed">Descripción breve del producto o servicio financiero disponible para ti.</p>
    <a href="#" class="mt-auto w-full text-center py-2 px-4 rounded-lg bg-white text-[#003B71] text-base font-semibold transition-all duration-200 hover:bg-[#dce8f5] hover:text-[#003B71]">Más información</a>
</div>`,bt=`
<style>
.ig-watermark {
    position: absolute;
    bottom: -32px;
    right: -32px;
    width: 320px;
    height: 320px;
    opacity: 0.07;
    pointer-events: none;
    user-select: none;
}
.ig-watermark img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.ig-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
@media (max-width: 900px) {
    .ig-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 560px) {
    .ig-grid {
        grid-template-columns: 1fr;
    }
}
</style>`,ut=[{id:"icon-grid-hero",label:"Sección de características",category:"Productos y Servicios",media:pt,content:`
<section class="relative overflow-hidden w-full bg-[#003B71] py-12 px-6">
    <div class="ig-watermark">
        <img src="${Z("images/brand-watermark.png")}" alt="">
    </div>
    <div class="relative z-10 max-w-6xl mx-auto flex flex-col gap-12">
        <div class="flex flex-col items-center text-center gap-3">
            <h2 class="text-4xl font-bold text-white">Depósitos y Cuentas de Ahorro</h2>
            <p class="text-base text-white">Productos diseñados para hacer crecer tu dinero de forma segura.</p>
        </div>
        <div class="ig-grid">
            ${Y}
            ${Y}
            ${Y}
            ${Y}
            ${Y}
            ${Y}
        </div>
    </div>
</section>
${bt}`},{id:"icon-card",label:"Tarjeta con icono",category:"Productos y Servicios",media:mt,content:`${Y}`}],xt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="5" rx="1" fill="#003B71"/>
    <rect x="12" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="22" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="11" width="28" height="17" rx="2" fill="#003B71" fill-opacity="0.08" stroke="#003B71" stroke-width="1"/>
    <rect x="5" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="14" width="4" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`,ce=`
.tabs-btn{transition:background 0.2s,color 0.2s;}
.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}
.tabs-panel{display:none;}
.tabs-panel.active{display:grid;}
.tab-card:hover{background:#003B71;}
.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}
.tab-card:hover .tab-card-title{color:#ffffff;}
.tab-card:hover .tab-card-text{color:#ffffff;}`;function yt(){return function(){const i=this,e=".tabs-btn{transition:background 0.2s,color 0.2s;}.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}.tabs-panel{display:none;}.tabs-panel.active{display:grid;}.tab-card:hover{background:#003B71;}.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}.tab-card:hover .tab-card-title{color:#ffffff;}.tab-card:hover .tab-card-text{color:#ffffff;}";(function(){const a=i.ownerDocument??document;if(!a.getElementById("tabs-section-styles")){const l=a.createElement("style");l.id="tabs-section-styles",l.textContent=e,a.head.appendChild(l)}})();function t(r){i.querySelectorAll(".tabs-btn").forEach((a,l)=>{a.classList.toggle("active",l===r)}),i.querySelectorAll(".tabs-panel").forEach((a,l)=>{a.classList.toggle("active",l===r)})}i.querySelectorAll(".tabs-btn").forEach((r,a)=>{r.addEventListener("click",()=>t(a))}),t(0)}}const M=()=>`
<div class="tab-card flex flex-col items-center text-center p-8 border-2 border-[#003B71] rounded-2xl gap-4 cursor-pointer transition-all duration-200">
    <div class="tab-card-icon w-14 h-14 rounded-full border-2 border-[#003B71] flex items-center justify-center text-2xl text-[#003B71] shrink-0 transition-all duration-200">
        <i class="ri-lightbulb-line"></i>
    </div>
    <h3 class="tab-card-title text-lg font-bold text-[#003B71] transition-colors duration-200">Lorem ipsum</h3>
    <p class="tab-card-text text-base font-normal leading-relaxed text-[#003B71] transition-colors duration-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>`,Q=i=>`
<div class="tabs-panel${i===0?" active":""} grid-cols-3 gap-5">
    ${M()}
    ${M()}
    ${M()}
    ${M()}
    ${M()}
    ${M()}
</div>`,wt=`
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
        ${Q(0)}
        ${Q(1)}
        ${Q(2)}
        ${Q(3)}
        ${Q(4)}
    </div>
</div>
<style>${ce}</style>`,vt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="none" stroke="#003B71" stroke-width="2"/>
    <circle cx="16" cy="10" r="4" fill="none" stroke="#003B71" stroke-width="1.5"/>
    <rect x="8" y="17" width="16" height="2" rx="1" fill="#003B71"/>
    <rect x="6" y="22" width="20" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,Bt=[{id:"tabs-cards",label:"Sección con tabs",category:"Contenido",media:xt,content:{type:"tabs-cards-component"}},{id:"tab-card-single",label:"Tarjeta de tab",category:"Contenido",media:vt,content:`${M()}`}];function kt(i){const e="tabs-cards-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección con tabs",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,attributes:{"data-gjs-type":e,"data-tab-count":"5"},components:wt,script:yt(),traits:[{type:"number",name:"data-tab-count",label:"Número de tabs (2-10)",min:2,max:10,changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",(t,r)=>{const a=parseInt(r["data-tab-count"]);isNaN(a)||this.updateTabCount(a)})},updateTabCount(t){const r=Math.min(10,Math.max(2,t)),a=l=>{const g=Array.from({length:l},()=>'<button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>').join(`
`),d=Array.from({length:l},(c,f)=>`<div class="tabs-panel${f===0?" active":""} grid-cols-3 gap-5">
                            ${M()}
                            ${M()}
                            ${M()}
                            ${M()}
                            ${M()}
                            ${M()}
                        </div>`).join(`
`);return`
                    <div class="max-w-6xl mx-auto px-6 flex flex-col gap-8 py-16">
                        <div class="text-center flex flex-col gap-4 max-w-2xl mx-auto">
                            <h2 class="text-4xl font-bold leading-tight text-[#003B71]">Lorem ipsum dolor sit amet consectetur</h2>
                            <p class="text-base font-normal leading-relaxed text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <nav class="flex flex-wrap justify-center gap-2">${g}</nav>
                        <div class="tabs-body">${d}</div>
                    </div>
                    <style>${ce}</style>`};this.components(a(r)),setTimeout(()=>{const l=this.get("script"),g=this.getEl();l&&typeof l=="function"&&g&&l.call(g)},200)}}}),Et(i,e),$t(i,e)}function Et(i,e){i.on("component:mount",t=>{const r=t.getEl();r?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},300))}),i.on("component:clone",t=>{if(t.get("type")===e){const r=t.getEl();r&&setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},300)}}),i.on("storage:end:load",()=>{setTimeout(()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const r=t.getEl();if(r?.isConnected){const a=t.get("script");a&&typeof a=="function"&&a.call(r)}})},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function $t(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const r=t.contentDocument?.head;if(r){if(!r.querySelector("#tabs-section-styles")){const a=document.createElement("style");a.id="tabs-section-styles",a.textContent=ce,r.appendChild(a)}if(!r.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,r.appendChild(a)}}})}const Ct=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Lt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,St=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,jt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,me=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="7" cy="10" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="8.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <circle cx="7" cy="22" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="20.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
</svg>`,U=i=>{const e=i==="light";return`
<div class="split-list-item flex items-center gap-4">
    <div class="bg-[#E97300] w-11 h-11 rounded-full flex items-center justify-center shrink-0">
        <i class="ri-shield-check-line text-xl ${e?"text-[#003B71]":"text-white"}"></i>
    </div>
    <p class="${e?"text-[#003B71]":"text-white"} text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`},Tt=i=>{const e=i==="light";return`
<div class="flex flex-col gap-4">
    <h2 class="${e?"text-[#003B71]":"text-white"} text-4xl font-bold leading-tight">Lorem ipsum dolor sit amet</h2>
    <p class="${e?"text-[#003B71]":"text-white"} text-base leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-4">
        ${U(i)}
        ${U(i)}
        ${U(i)}
        ${U(i)}
    </div>
</div>`},zt=()=>`
<div class="split-img-col w-full rounded-2xl overflow-hidden">
    <img src="${Z("images/placeholder.svg")}"
         alt="Imagen de sección"
         class="w-full h-full object-cover block"
         style="min-height:320px;">
</div>`,se=`
<style>
.split-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.split-list-item{min-height:44px;}
@media(max-width:768px){
    .split-grid{grid-template-columns:1fr;gap:2rem;}
    .split-img-first{order:-1;}
}
</style>`,te=(i,e)=>{const t=Tt(e),r=zt();return`
<section class="w-full ${e==="dark"?"bg-[#003B71]":"bg-white"} py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="split-grid">
            ${i?`<div>${t}</div><div class="split-img-first">${r}</div>`:`<div class="split-img-first">${r}</div><div>${t}</div>`}
        </div>
    </div>
</section>
${se}`},It=[{id:"split-content-light-img-right",label:"Contenido claro - imagen derecha",category:"Contenido",media:Ct,content:te(!0,"light")},{id:"split-content-light-img-left",label:"Contenido claro - imagen izquierda",category:"Contenido",media:Lt,content:te(!1,"light")},{id:"split-content-dark-img-right",label:"Contenido azul - imagen derecha",category:"Contenido",media:St,content:te(!0,"dark")},{id:"split-content-dark-img-left",label:"Contenido azul - imagen izquierda",category:"Contenido",media:jt,content:te(!1,"dark")},{id:"split-list-item",label:"Item de lista con badge",category:"Contenido",media:me,content:`${U("light")}${se}`},{id:"split-list-group",label:"Lista con badges",category:"Contenido",media:me,content:`
<div class="flex flex-col gap-4">
    ${U("light")}
    ${U("light")}
    ${U("light")}
</div>
${se}`}],_t=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="0" y="6" width="10" height="22" fill="white"/>
    <path d="M10 6 Q10 6 16 6 L16 28 Q10 28 10 22 Z" fill="#E97300"/>
    <circle cx="22" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="22" cy="14" r="1.5" fill="white"/>
    <rect x="18" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,At=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="22" y="6" width="10" height="22" fill="white"/>
    <path d="M22 6 Q16 6 16 6 L16 28 Q22 28 22 22 Z" fill="#E97300"/>
    <circle cx="10" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="10" cy="14" r="1.5" fill="white"/>
    <rect x="6" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="7" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,ie=`
<div class="flex flex-col items-center gap-3 text-center">
    <div class="w-14 h-14 rounded-full flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-1">
        <p class="text-lg font-bold text-white">Lorem ipsum</p>
        <p class="text-base text-white">Lorem ipsum dolor sit amet</p>
    </div>
</div>`,Mt=`
<style>
.ss-section{position:relative;width:100%;background:#ffffff;}
.ss-curve-left{background:#E97300;border-radius:200px 0 0 0;}
.ss-curve-right{background:#E97300;border-radius:0 200px 0 0;}
.ss-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2rem;}
@media(max-width:900px){
    .ss-curve-left{border-radius:110px 0 0 0;}
    .ss-curve-right{border-radius:0 110px 0 0;}
    .ss-grid{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:480px){.ss-grid{grid-template-columns:1fr;}}
</style>`,be=i=>`
<div class="ss-section">
    <div class="ss-curve-${i?"left":"right"}">
        <div class="max-w-6xl mx-auto px-8 py-16">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-bold text-white mb-3 leading-tight">Lorem ipsum dolor sit amet</h2>
                <p class="text-base text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div class="ss-grid">
                ${ie}
                ${ie}
                ${ie}
                ${ie}
            </div>
        </div>
    </div>
</div>
${Mt}`,Dt=[{id:"stats-strip-left",label:"Franja estadísticas - izquierda",category:"Heroes",media:_t,content:be(!0)},{id:"stats-strip-right",label:"Franja estadísticas - derecha",category:"Heroes",media:At,content:be(!1)}],qt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Ht=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#003B71" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="white" rx="2"/>
    <rect x="8" y="9" width="16" height="2" rx="1" fill="#003B71" fill-opacity="0.6"/>
    <rect x="8" y="13" width="14" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="8" y="15.5" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="8" y="20" width="16" height="4" rx="1.5" fill="#003B71" fill-opacity="0.5"/>
</svg>`,ae=`
<div class="flex flex-col gap-4 bg-white rounded-2xl p-6 text-center">
    <h3 class="text-lg font-bold text-[#003B71]">Lorem ipsum dolor</h3>
    <p class="text-base text-[#003B71] leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod.</p>
    <a href="#" class="srv-btn w-full py-2 px-4 rounded-lg bg-[#003B71] text-white text-base font-semibold text-center mt-auto">Lorem ipsum</a>
</div>`,ue=`
<style>
.srv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.srv-btn{display:block;transition:background .2s,color .2s;}
.srv-btn:hover{background:#002a52!important;}
@media(max-width:768px){.srv-grid{grid-template-columns:1fr;}}
</style>`,Nt=[{id:"service-cards-section",label:"Sección de servicios",category:"Productos y Servicios",media:qt,content:`
<section class="w-full bg-[#003B71] py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-white mb-3">Lorem ipsum dolor sit amet</h2>
            <p class="text-base text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="srv-grid">
            ${ae}
            ${ae}
            ${ae}
        </div>
    </div>
</section>
${ue}`},{id:"service-card",label:"Tarjeta de servicio",category:"Productos y Servicios",media:Ht,content:`${ae}${ue}`}],Pt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="6" rx="1" fill="#003B71"/>
    <rect x="2" y="10" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="17" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <rect x="2" y="24" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <line x1="11" y1="2" x2="11" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
    <line x1="21" y1="2" x2="21" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
</svg>`,re={blue:{headerBg:"bg-[#003B71]",headerText:"text-white",subheaderBg:"bg-[#e8f0f8]",subheaderText:"text-[#003B71]",borderColor:"#003B71",rowEvenBg:"bg-[#f4f7fb]",rowOddBg:"bg-white",rowText:"text-[#003B71]",labelBg:"bg-[#e8f0f8]",labelText:"text-[#003B71]"},orange:{headerBg:"bg-[#E97300]",headerText:"text-white",subheaderBg:"bg-[#fef3e8]",subheaderText:"text-[#E97300]",borderColor:"#E97300",rowEvenBg:"bg-[#fff8f2]",rowOddBg:"bg-white",rowText:"text-[#003B71]",labelBg:"bg-[#fef3e8]",labelText:"text-[#E97300]"}};function Ce(i,e){const t=re[e]||re.blue;let r='<table class="w-full border-collapse font-[Poppins,sans-serif] table-fixed">';i.title?(r+=`<thead><tr>
            <th colspan="${i.cols}" class="p-3 align-middle text-center text-base font-bold ${t.headerBg} ${t.headerText}">
                ${i.title}
            </th>
        </tr>`,i.headers?.length&&(r+="<tr>",i.headers.forEach((g,d)=>{const c=d<i.headers.length-1?`border-r border-[${t.borderColor}]`:"";r+=`<th class="p-3 align-middle text-sm font-semibold ${t.subheaderBg} ${t.subheaderText} ${c} border-b border-[${t.borderColor}] text-${g.align||"center"}">${g.text||""}</th>`}),r+="</tr>"),r+="</thead>"):i.headers?.length&&(r+="<thead><tr>",i.headers.forEach((g,d)=>{const c=d<i.headers.length-1?`border-r border-[${t.borderColor}]`:"";r+=`<th class="p-3 align-middle text-sm font-semibold ${t.headerBg} ${t.headerText} ${c} border-b border-[${t.borderColor}] text-${g.align||"center"}">${g.text||""}</th>`}),r+="</tr></thead>"),r+="<tbody>";const a=i.rows.length,l={};return i.rows.forEach((g,d)=>{r+="<tr>";let c=0;g.forEach(f=>{for(;l[`${d}-${c}`];)c++;const v=f.colspan||1,B=f.rowspan||1;for(let u=d;u<d+B;u++)for(let L=c;L<c+v;L++)(u!==d||L!==c)&&(l[`${u}-${L}`]=!0);const m=v>1?`colspan="${v}"`:"",n=B>1?`rowspan="${B}"`:"",h=f.isHeader?t.labelBg:d%2===0?t.rowEvenBg:t.rowOddBg,b=f.isHeader?"font-semibold":"font-normal",_=f.isHeader?t.labelText:t.rowText,y=`text-${f.align||"center"}`,$=d+B>=a,C=c+v>=i.cols?"":`border-r border-[${t.borderColor}]`,k=$?"":`border-b border-[${t.borderColor}]`,S=`${C} ${k} p-3 align-middle text-sm ${h} ${b} ${_} ${y}`;f.image?r+=`<td ${m} ${n} class="${S}">
                    <img src="${f.image}" alt="${f.text||""}" class="max-w-full max-h-20 h-auto object-contain block mx-auto">
                    ${f.text?`<span class="block mt-1 text-xs ${_}">${f.text}</span>`:""}
                </td>`:r+=`<td ${m} ${n} class="${S}">${f.text||""}</td>`,c+=v}),r+="</tr>"}),r+="</tbody></table>",r}function G(i,e){return{title:"Título de la tabla",cols:i,headers:Array.from({length:i},(t,r)=>({text:`Columna ${r+1}`,align:"center"})),rows:Array.from({length:e},()=>Array.from({length:i},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})))}}function Le(i,e){return`<div class="w-full overflow-x-auto rounded-2xl border-2 border-[${(re[e]||re.blue).borderColor}]">${i}</div>`}function xe(i,e){const t={};return i.forEach((r,a)=>{let l=0;r.forEach(g=>{for(;t[`${a}-${l}`];)l++;const d=Math.min(g.colspan||1,e-l),c=g.rowspan||1;for(let f=a;f<a+c;f++)for(let v=l;v<l+d;v++)(f!==a||v!==l)&&(t[`${f}-${v}`]=`${a}-${l}`);l+=d})}),t}const Ot=`
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
.tam-img-selected-info{font-size:0.8rem;color:#6b7280;}`;function Rt(){if(document.getElementById("tam-img-modal"))return;const i=document.createElement("div");i.id="tam-img-modal",i.innerHTML=`
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
        </div>`,document.body.appendChild(i);let e=null,t=null;async function r(d=""){const c=document.getElementById("tam-img-grid");c.innerHTML='<div class="tam-img-loading"><div class="tam-img-spinner"></div><span>Cargando...</span></div>';try{const f=new URLSearchParams({type:"image",per_page:50});d&&f.append("search",d);const v=document.querySelector('meta[name="media-api-url"]')?.content??"/media/api",n=(await(await fetch(`${v}?${f}`,{headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}})).json()).items||[];if(!n.length){c.innerHTML='<div class="tam-img-loading"><i class="ri-image-line" style="font-size:2rem;"></i><span>No se encontraron imágenes</span></div>';return}c.innerHTML="",n.forEach(h=>{const b=document.createElement("div");b.className="tam-img-card",b.innerHTML=`<img src="${h.url}" alt="${h.filename}"><p title="${h.filename}">${h.filename}</p>`,b.addEventListener("click",()=>{c.querySelectorAll(".tam-img-card").forEach(_=>_.classList.remove("selected")),b.classList.add("selected"),e=h.url,document.getElementById("tam-img-selected-info").textContent=`Seleccionada: ${h.filename}`,document.getElementById("tam-img-confirm").disabled=!1}),c.appendChild(b)})}catch{c.innerHTML='<div class="tam-img-loading"><i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i><span style="color:#dc2626;">Error al cargar imágenes</span></div>'}}function a(d){t=d,e=null,document.getElementById("tam-img-selected-info").textContent="Ninguna imagen seleccionada",document.getElementById("tam-img-confirm").disabled=!0,document.getElementById("tam-img-search-input").value="",i.classList.add("open"),r()}function l(){i.classList.remove("open"),e=null,t=null}document.getElementById("tam-img-close").addEventListener("click",l),document.getElementById("tam-img-cancel").addEventListener("click",l),document.getElementById("tam-img-confirm").addEventListener("click",()=>{e&&t&&(t(e),l())});let g;document.getElementById("tam-img-search-input").addEventListener("input",d=>{clearTimeout(g),g=setTimeout(()=>r(d.target.value),300)}),i.addEventListener("click",d=>{d.target===i&&l()}),window.__openTableImagePicker=a}function Ut(i,e){if(document.getElementById("table-admin-modal"))return;const t=document.createElement("style");t.id="table-admin-modal-styles",t.textContent=Ot,document.head.appendChild(t),Rt();const r=document.createElement("div");r.id="table-admin-modal",r.innerHTML=`
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
        </div>`,document.body.appendChild(r);let a=null,l=null;function g(m){a=m;const n=m.get("tableData");l=n?JSON.parse(JSON.stringify(n)):G(3,3);const h=l.cols||3;l.rows=l.rows.map((b,_)=>Array.from({length:h},($,T)=>b[T]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})),document.getElementById("tam-title").value=l.title||"",document.getElementById("tam-theme").value=m.get("tableTheme")||"blue",document.getElementById("tam-cols").value=l.cols||3,document.getElementById("tam-rows").value=l.rows.length||3,v(),B(),r.classList.add("open"),document.body.style.overflow="hidden"}function d(){r.classList.remove("open"),document.body.style.overflow="",a=null}function c(){l.title=document.getElementById("tam-title").value.trim(),l.cols=parseInt(document.getElementById("tam-cols").value)||3,l.headers=Array.from(document.querySelectorAll(".tam-header-input")).map(n=>({text:n.value,align:n.closest("th")?.querySelector(".tam-align-select")?.value||"center"})),document.querySelectorAll("#tam-tbody td.tam-cell:not(.is-spanned)").forEach(n=>{const h=parseInt(n.dataset.row),b=parseInt(n.dataset.col);l.rows[h]?.[b]&&(l.rows[h][b].text=n.querySelector(".tam-cell-input")?.value||"",l.rows[h][b].align=n.querySelector(".tam-align-select")?.value||"center",l.rows[h][b].isHeader=n.dataset.isheader==="1",l.rows[h][b].image=n.dataset.image||null)});const m=xe(l.rows,l.cols);l.rows=l.rows.map((n,h)=>n.filter((b,_)=>!m[`${h}-${_}`]))}function f(){if(r.querySelector("#tam-rebuild-notice"))return;const n=document.createElement("div");n.id="tam-rebuild-notice",n.style.cssText="background:#fef9c3;border:1.5px solid #ca8a04;border-radius:0.5rem;padding:0.5rem 1rem;font-size:0.8rem;color:#92400e;display:flex;align-items:center;gap:0.5rem;margin:0 1.5rem 0;flex-shrink:0;",n.innerHTML='<i class="ri-error-warning-line"></i> Has modificado el colspan/rowspan. Haz clic en <strong style="margin:0 4px;">Reconstruir</strong> para aplicar los cambios de fusión.',r.querySelector(".tam-toolbar").after(n)}function v(){r.querySelector("#tam-rebuild-notice")?.remove()}function B(){const m=document.getElementById("tam-thead"),n=document.getElementById("tam-tbody"),h=l.cols,b=l.rows.length,_=xe(l.rows,h);m.innerHTML=`<tr>${l.headers.map((y,$)=>`
            <th>
                <input class="tam-cell-input tam-header-input" value="${y.text||""}" placeholder="Col ${$+1}" style="font-weight:600;">
                <select class="tam-align-select" style="margin-top:4px;width:100%;font-size:0.7rem;padding:2px;">
                    <option value="left" ${y.align==="left"?"selected":""}>Izquierda</option>
                    <option value="center" ${y.align==="center"?"selected":""}>Centro</option>
                    <option value="right" ${y.align==="right"?"selected":""}>Derecha</option>
                </select>
            </th>`).join("")}</tr>`,n.innerHTML=l.rows.map((y,$)=>`<tr>${Array.from({length:h},(C,k)=>{const S=_[`${$}-${k}`];if(S)return`<td class="tam-cell is-spanned" data-row="${$}" data-col="${k}">
                        <div class="tam-spanned-label">Combinada con [${S}]</div>
                    </td>`;const u=y[k]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null},L=u.colspan||1,q=u.rowspan||1,z=L>1||q>1;return`<td class="tam-cell ${u.isHeader?"is-header-cell":""} ${u.image?"has-image":""} ${z?"has-span":""}"
                    data-row="${$}" data-col="${k}"
                    data-isheader="${u.isHeader?"1":"0"}"
                    data-colspan="${L}"
                    data-rowspan="${q}"
                    data-image="${u.image||""}">
                    ${u.image?`<img class="tam-cell-img-preview" src="${u.image}" alt="">`:""}
                    <textarea class="tam-cell-input" placeholder="Texto...">${u.text||""}</textarea>
                    <select class="tam-align-select" style="width:100%;font-size:0.7rem;padding:2px;margin-top:4px;">
                        <option value="left" ${u.align==="left"?"selected":""}>Izquierda</option>
                        <option value="center" ${u.align==="center"?"selected":""}>Centro</option>
                        <option value="right" ${u.align==="right"?"selected":""}>Derecha</option>
                    </select>
                    <div class="tam-cell-actions">
                        <button type="button" class="tam-cell-btn tam-cell-btn-header ${u.isHeader?"active":""}"
                            data-action="header" data-row="${$}" data-col="${k}">
                            ${u.isHeader?"✓ Etiqueta":"Etiqueta"}
                        </button>
                        <button type="button" class="tam-cell-btn tam-cell-btn-img"
                            data-action="image" data-row="${$}" data-col="${k}">
                            <i class="ri-image-line"></i> ${u.image?"Cambiar":"Imagen"}
                        </button>
                        ${u.image?`<button type="button" class="tam-cell-btn tam-cell-btn-clear" data-action="clear-image" data-row="${$}" data-col="${k}">✕ Quitar</button>`:""}
                        <div class="tam-cell-span-group">
                            <label title="Columnas que ocupa">CS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${h-k}"
                                value="${L}" data-action="colspan" data-row="${$}" data-col="${k}">
                            <label title="Filas que ocupa">RS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${b-$}"
                                value="${q}" data-action="rowspan" data-row="${$}" data-col="${k}">
                        </div>
                    </div>
                </td>`}).join("")}</tr>`).join(""),n.querySelectorAll("input[data-action=colspan], input[data-action=rowspan]").forEach(y=>{y.addEventListener("change",()=>{const $=parseInt(y.dataset.row),T=parseInt(y.dataset.col),C=Math.max(1,parseInt(y.value)||1);l.rows[$]?.[T]&&(y.dataset.action==="colspan"?l.rows[$][T].colspan=Math.min(C,h-T):l.rows[$][T].rowspan=Math.min(C,b-$),f())})}),n.querySelectorAll("button[data-action]").forEach(y=>{y.addEventListener("click",$=>{$.preventDefault(),$.stopPropagation();const T=y.dataset.action,C=parseInt(y.dataset.row),k=parseInt(y.dataset.col);if(!(isNaN(C)||isNaN(k)||!l.rows[C]?.[k])){if(T==="header"){l.rows[C][k].isHeader=!l.rows[C][k].isHeader;const S=n.querySelector(`td[data-row="${C}"][data-col="${k}"]`);S&&(S.dataset.isheader=l.rows[C][k].isHeader?"1":"0",S.classList.toggle("is-header-cell",l.rows[C][k].isHeader)),y.classList.toggle("active",l.rows[C][k].isHeader),y.textContent=l.rows[C][k].isHeader?"✓ Etiqueta":"Etiqueta";return}if(T==="image"){window.__openTableImagePicker&&window.__openTableImagePicker(S=>{l.rows[C][k].image=S;const u=n.querySelector(`td[data-row="${C}"][data-col="${k}"]`);if(u){u.dataset.image=S,u.classList.add("has-image");let L=u.querySelector(".tam-cell-img-preview");L||(L=document.createElement("img"),L.className="tam-cell-img-preview",u.insertBefore(L,u.firstChild)),L.src=S;const q=u.querySelector("[data-action=image]");if(q&&(q.innerHTML='<i class="ri-image-line"></i> Cambiar'),!u.querySelector("[data-action=clear-image]")){const z=document.createElement("button");z.type="button",z.className="tam-cell-btn tam-cell-btn-clear",z.dataset.action="clear-image",z.dataset.row=C,z.dataset.col=k,z.textContent="✕ Quitar",z.addEventListener("click",F=>{F.preventDefault(),F.stopPropagation(),l.rows[C][k].image=null,u.dataset.image="",u.classList.remove("has-image"),L.remove(),z.remove();const N=u.querySelector("[data-action=image]");N&&(N.innerHTML='<i class="ri-image-line"></i> Imagen')}),u.querySelector(".tam-cell-actions").appendChild(z)}}});return}T==="clear-image"&&(l.rows[C][k].image=null,B())}})})}document.getElementById("tam-close").addEventListener("click",d),document.getElementById("tam-cancel").addEventListener("click",d),r.addEventListener("click",m=>{m.target===r&&d()}),document.getElementById("tam-rebuild").addEventListener("click",()=>{const m=parseInt(document.getElementById("tam-cols").value)||3,n=parseInt(document.getElementById("tam-rows").value)||3;for(v(),c();l.headers.length<m;)l.headers.push({text:`Col ${l.headers.length+1}`,align:"center"});for(l.headers=l.headers.slice(0,m),l.cols=m;l.rows.length<n;)l.rows.push(Array.from({length:m},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})));l.rows=l.rows.slice(0,n).map(h=>{for(;h.length<m;)h.push({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null});return h.slice(0,m)}),B()}),document.getElementById("tam-apply").addEventListener("click",()=>{c();const m=document.getElementById("tam-theme").value;a&&(a.set("tableData",JSON.parse(JSON.stringify(l))),a.set("tableTheme",m),a.addAttributes({"data-table-theme":m}),de(a)),d()}),window.__openTableAdminModal=g}function de(i){const e=i.get("tableData"),t=i.get("tableTheme")||"blue";e&&i.components(Le(Ce(e,t),t))}function Ft(){return function(){}}const Wt=[{id:"table-blue",label:"Tabla azul",category:"Interactivos",media:Pt,content:{type:"table-component",attributes:{"data-table-theme":"blue"}}},{id:"table-orange",label:"Tabla naranja",category:"Interactivos",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="6" rx="1" fill="#E97300"/>
            <rect x="2" y="10" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.3"/>
            <rect x="2" y="17" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
            <rect x="2" y="24" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
        </svg>`,content:{type:"table-component",attributes:{"data-table-theme":"orange"}}}];function Vt(i){const e="table-component";Ut(),i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Tabla",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,propagate:["editable","selectable","hoverable","droppable","highlightable"],tableData:null,tableTheme:"blue",attributes:{"data-gjs-type":e,"data-table-theme":"blue"},components:Le(Ce(G(3,3),"blue"),"blue"),script:Ft(),traits:[{type:"button",name:"edit-table",label:"Editar tabla",text:"Abrir editor de tabla",command(t){const r=t.getSelected();r&&window.__openTableAdminModal&&(r.get("tableData")||r.set("tableData",G(3,3)),window.__openTableAdminModal(r))}},{type:"select",name:"data-table-theme",label:"Color del tema",options:[{id:"blue",name:"Azul"},{id:"orange",name:"Naranja"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e});const t=this.getAttributes()["data-table-theme"]||"blue";this.set("tableTheme",t),this.get("tableData")||(this.set("tableData",G(3,3)),de(this)),this.on("change:attributes",(r,a)=>{const l=a["data-table-theme"];l&&l!==this.get("tableTheme")&&(this.set("tableTheme",l),de(this))})}}}),Yt(i,e),Gt(i,e)}function Yt(i,e){i.on("component:mount",t=>{const r=t.getEl();if(r?.getAttribute?.("data-gjs-type")===e){t.set("type",e);const a=r.getAttribute("data-table-theme")||"blue";t.set("tableTheme",a),t.get("tableData")||t.set("tableData",G(3,3))}}),i.on("storage:end:load",()=>{setTimeout(()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const r=t.getAttributes()["data-table-theme"]||"blue";t.set("tableTheme",r),t.get("tableData")||t.set("tableData",G(3,3))})},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function Gt(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const r=t.contentDocument?.head;if(r&&!r.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,r.appendChild(a)}})}const Zt=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#003B71"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#003B71"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#003B71" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Xt=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#E97300"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#E97300"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#E97300" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Qt=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#003B71"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Jt=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#E97300"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,Kt=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#003B71"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,ei=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#E97300"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,ti=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,ii=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,ai=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#ffffff"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.5"/>
</svg>`,ri=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,ye=i=>{const e=i==="#003B71"?"blue":"orange";return`
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
</div>`},we=i=>{const e=i==="#003B71"?"blue":"orange";return`
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
</div>`},ve={"button-fill-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-[#003B71] text-white transition-all duration-200 hover:bg-[#002a52] hover:border-[#002a52]","button-fill-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-[#E97300] text-white transition-all duration-200 hover:bg-[#c96200] hover:border-[#c96200]","button-outline-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-transparent text-[#003B71] transition-all duration-200 hover:bg-[#003B71] hover:text-white","button-outline-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-transparent text-[#E97300] transition-all duration-200 hover:bg-[#E97300] hover:text-white","button-fill-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-white text-[#003B71] transition-all duration-200 hover:bg-[#dce8f5] hover:border-[#dce8f5]","button-outline-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-transparent text-white transition-all duration-200 hover:bg-white hover:text-[#003B71]"},li=[{id:"button-fill-blue",label:"Botón azul sólido",category:"Botones",media:Kt,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-blue"}}},{id:"button-fill-orange",label:"Botón naranja sólido",category:"Botones",media:ei,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-orange"}}},{id:"button-outline-blue",label:"Botón azul outline",category:"Botones",media:ti,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-blue"}}},{id:"button-outline-orange",label:"Botón naranja outline",category:"Botones",media:ii,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-orange"}}},{id:"button-fill-white",label:"Botón blanco sólido",category:"Botones",media:ai,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-white"}}},{id:"button-outline-white",label:"Botón blanco outline",category:"Botones",media:ri,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-white"}}},{id:"button-download-full-blue",label:"Descarga completa azul",category:"Botones",media:Zt,content:ye("#003B71")},{id:"button-download-full-orange",label:"Descarga completa naranja",category:"Botones",media:Xt,content:ye("#E97300")},{id:"button-download-simple-blue",label:"Descarga simple azul",category:"Botones",media:Qt,content:we("#003B71")},{id:"button-download-simple-orange",label:"Descarga simple naranja",category:"Botones",media:Jt,content:we("#E97300")}];function oi(i){const e=[{type:"button",label:"Documento",name:"select-document",text:"Seleccionar documento",full:!0,command:"open-document-picker"},{type:"text",name:"href",label:"URL / Enlace",placeholder:"https://..."},{type:"select",name:"target",label:"Abrir en",options:[{id:"_self",name:"Misma ventana"},{id:"_blank",name:"Nueva ventana"}]}];i.DomComponents.addType("link",{model:{defaults:{traits:e}}}),i.DomComponents.addType("integral-button",{isComponent:a=>a.tagName==="A"&&a.hasAttribute("data-btn-variant"),model:{defaults:{tagName:"a",draggable:!0,droppable:!1,editable:!0,attributes:{href:"#",target:"_self","data-btn-variant":"button-fill-blue"},components:"Texto del botón",traits:e},init(){const a=this.getAttributes()["data-btn-variant"]??"button-fill-blue",l=ve[a]??ve["button-fill-blue"];this.setClass(l.split(" "))}}});function t(a,l){if(a.getEl()?.matches?.(l))return a;let d=null;const c=a.components?.();return c?(c.each(f=>{d||(d=t(f,l))}),d):null}function r(a,l){const d={pdf:"ri-file-pdf-line",xlsx:"ri-file-excel-line",xls:"ri-file-excel-line",doc:"ri-file-word-line",docx:"ri-file-word-line"}[l]??"ri-file-line";function c(v){const B=v.getEl?.();if(B?.tagName==="I"){const h=B.parentElement;if(h&&[...h.classList].some(b=>b.includes("-icon")))return v}let m=null;const n=v.components?.();return n?(n.each(h=>{m||(m=c(h))}),m):null}const f=c(a);if(f){const v=f.getClasses().find(B=>B.startsWith("ri-"));v&&f.removeClass(v),f.addClass(d)}else{const B=a.getEl()?.querySelector("[class*='-icon'] i");if(B){const m=[...B.classList].filter(n=>!n.startsWith("ri-"));B.className=[...m,d].join(" ")}}}i.Commands.add("open-document-picker",{run(a){const l=a.getSelected();if(l){if(a._documentPicker)try{a._documentPicker.destroy()}catch{}a._documentPicker=new Te,a._documentPicker.open(g=>{const d=g.filename.split(".").pop().toLowerCase();l.addAttributes({href:g.url});const c=l.getTrait("href");c&&c.set("value",g.url);const f=t(l,"[class*='-filename']");f&&f.components(g.filename),r(l,d)},{filters:{type:"document"}})}}})}const ni=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,si=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,di=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,ci=[{id:"badge-outline-blue",label:"Badge azul outline",category:"Badges",media:ni,content:'<span class="inline-block border border-[#003B71] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#003B71]">Etiqueta</span>'},{id:"badge-outline-orange",label:"Badge naranja outline",category:"Badges",media:si,content:'<span class="inline-block border border-[#E97300] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#E97300]">Etiqueta</span>'},{id:"badge-outline-white",label:"Badge blanco outline",category:"Badges",media:di,content:'<span class="inline-block border border-white rounded-full px-4 py-1 text-base font-medium bg-transparent text-white">Etiqueta</span>'}],gi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;function fi(){return function(){const i=this,e="agencies-map-component",t="/api/agencies/active",r="agencies";let a=[],l=[],g={},d=null,c=[];const f=async()=>{try{v(),await m(),await b(),_(),S(),z(),F(),B()}catch(o){console.error("Error initializing map:",o),J("Error al cargar las agencias"),B()}};function v(){const o=i.querySelector(`.${e}-list`);o&&(o.innerHTML=`
                    <div class="flex flex-col items-center justify-center p-12 space-y-4">
                        <div class="relative w-16 h-16">
                            <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                            <div class="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                        </div>
                        <p class="text-white font-medium">Cargando agencias...</p>
                    </div>
                `);const s=i.querySelector(`.${e}-map-container`);s&&(s.style.opacity="0.5")}function B(){const o=i.querySelector(`.${e}-map-container`);o&&(o.style.transition="opacity 0.3s ease",o.style.opacity="1")}async function m(){try{const s=await(await fetch(t)).json(),p=r?s[r]:s;Array.isArray(p)?(a=p.filter(x=>x.latitude&&x.longitude&&!isNaN(x.latitude)&&!isNaN(x.longitude)),l=[...a],n()):(a=[],l=[])}catch(o){console.error("Error loading items:",o),a=[],l=[]}}function n(){const o=[...new Set(a.map(p=>p.zone).filter(Boolean))].sort(),s=[...new Set(a.map(p=>p.department).filter(Boolean))].sort();g={zone:o,department:s},setTimeout(()=>{const p=i.querySelector(`.${e}-filters-container`);p&&!p.hasChildNodes()&&(p.innerHTML=`
                        <select class="${e}-zone-filter flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                            <option value="">Todas las Zonas</option>
                        </select>
                        <select class="${e}-department-filter flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                            <option value="">Todos los Departamentos</option>
                        </select>
                    `,h())},100)}function h(){const o=i.querySelector(`.${e}-zone-filter`),s=i.querySelector(`.${e}-department-filter`);o&&g.zone&&g.zone.forEach(p=>{const x=document.createElement("option");x.value=p,x.textContent=p,o.appendChild(x)}),s&&g.department&&g.department.forEach(p=>{const x=document.createElement("option");x.value=p,x.textContent=p,s.appendChild(x)})}async function b(){if(!document.getElementById("leaflet-css")){const o=document.createElement("link");o.id="leaflet-css",o.rel="stylesheet",o.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(o)}if(typeof window.L>"u"&&await new Promise((o,s)=>{const p=document.createElement("script");p.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",p.onload=o,p.onerror=s,document.head.appendChild(p)}),typeof window.L<"u"&&window.L.Icon&&window.L.Icon.Default){const o=window.L.icon({iconUrl:"data:image/svg+xml;base64,"+btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
                            <path fill="#f0872a" d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z"/>
                            <circle cx="12" cy="8" r="3" fill="#fff"/>
                        </svg>
                    `),iconSize:[30,45],iconAnchor:[15,45],popupAnchor:[0,-45]});window.customOrangeIcon=o}}function _(){const o=i.querySelector(`.${e}-map`);if(!o||!window.L)return;o._leaflet_id&&o._map&&(o._map.remove(),delete o._map),d=window.L.map(o).setView([13.7942,-88.8965],8),window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(d),o._map=d,d.whenReady(function(){y(),setTimeout(()=>{d&&d.invalidateSize&&d.invalidateSize()},300)})}function y(){$(),T(),k()}function $(){c.forEach(o=>{o.marker&&d.removeLayer(o.marker)}),c=[]}function T(){l.forEach((o,s)=>{if(o.latitude&&o.longitude){const p=C(o),x=window.L.marker([o.latitude,o.longitude],{icon:window.customOrangeIcon||new window.L.Icon.Default}).addTo(d).bindPopup(p);c.push({marker:x,item:o,index:s})}})}function C(o){let s=`<div style="min-width: 200px;"><h4 style="font-weight: 700; margin-bottom: 12px; color: #0d3f6a; font-size: 16px; border-bottom: 2px solid #f0872a; padding-bottom: 8px;">${o.name}</h4>`;if(o.address&&(s+=`<p style="margin: 8px 0 0 0; font-size: 14px; display: flex; align-items: start; gap: 8px;"><i class="ri-map-pin-line" style="color: #f0872a; font-size: 16px; margin-top: 2px;"></i><span style="color: #4b5563;">${o.address}</span></p>`),o.municipality||o.department){const p=[o.municipality,o.department].filter(Boolean).join(", ");s+=`<p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280; padding-left: 24px;">${p}</p>`}return o.schedule&&(s+=`<p style="margin: 8px 0; font-size: 14px; display: flex; align-items: start; gap: 8px;"><i class="ri-time-line" style="color: #f0872a; font-size: 16px; margin-top: 2px;"></i><span style="color: #4b5563;">${o.schedule}</span></p>`),s+="</div>",s}function k(){if(l.length>0){const o=l.filter(s=>s.latitude&&s.longitude).map(s=>[s.latitude,s.longitude]);o.length>1?d.once("moveend",function(){setTimeout(()=>{try{d&&d._loaded&&typeof d.fitBounds=="function"&&d.fitBounds(o,{padding:[50,50],maxZoom:12,animate:!1})}catch(s){console.warn("Error fitting bounds:",s)}},100)}):o.length===1&&d.setView(o[0],14)}}function S(){const o=i.querySelector(`.${e}-list`);if(!o)return;if(l.length===0){L(o);return}const s=l.map((p,x)=>u(p,x)).join("");o.innerHTML=s,q()}function u(o,s){const p=o.phones&&o.phones.length>0?o.phones.map(E=>`
                        <p class="text-gray-200 flex items-center gap-2 mt-2">
                            <i class="ri-phone-line text-primary text-lg"></i>
                            <a href="tel:${E.replace(/\s+/g,"")}" class="agency-phone-link text-white font-medium hover:underline">${E}</a>
                        </p>
                    `).join(""):"",x=`https://www.google.com/maps/search/?api=1&query=${o.latitude},${o.longitude}`;return`
                <div class="${e}-item p-5 bg-white/10 border border-white/20 rounded-2xl cursor-pointer transition-all duration-200" data-item-index="${s}">
                    <h3 class="agency-title text-lg font-bold text-white mb-3">${o.name}</h3>
                    ${o.address?`<p class="text-gray-200 flex items-start gap-2 mt-2"><i class="ri-map-pin-line text-primary text-lg mt-0.5"></i><span class="flex-1">${o.address}</span></p>`:""}
                    ${o.municipality||o.department?`<p class="text-sm text-gray-300 mt-1 ml-6">${[o.municipality,o.department].filter(Boolean).join(", ")}</p>`:""}
                    ${o.schedule?`<p class="text-gray-200 flex items-start gap-2 mt-2"><i class="ri-time-line text-primary text-lg mt-0.5"></i><span class="flex-1">${o.schedule}</span></p>`:""}
                    ${p}
                    <div class="mt-3">
                        <a href="${x}" target="_blank" rel="noopener noreferrer" class="agency-maps-btn block w-full text-center px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200" onclick="event.stopPropagation();">
                            Ver ubicación
                        </a>
                    </div>
                </div>
            `}function L(o){o.innerHTML=`
                <div class="flex flex-col items-center justify-center p-12 text-center">
                    <div class="w-20 h-20 mb-4 rounded-full bg-white/10 flex items-center justify-center">
                        <i class="ri-map-pin-line text-4xl text-white"></i>
                    </div>
                    <p class="text-white font-medium text-lg">No hay agencias disponibles</p>
                    <p class="text-gray-300 text-sm mt-2">Intenta ajustar los filtros de búsqueda</p>
                </div>
            `}function q(){const o=i.querySelectorAll(`.${e}-item`);o.forEach(s=>{s.addEventListener("click",p=>{if(p.target.closest(".agency-maps-btn"))return;p.preventDefault();const x=parseInt(s.dataset.itemIndex),E=l[x];if(!E)return;o.forEach(w=>{w.classList.remove("bg-white","border-secondary","selected-agency"),w.classList.add("bg-white/10","border-white/20");const A=w.querySelector(".agency-title"),K=w.querySelectorAll("i"),ee=w.querySelectorAll(".agency-phone-link"),le=w.querySelectorAll("p:not(:has(.agency-phone-link))"),oe=w.querySelector(".agency-maps-btn");A&&(A.classList.remove("text-secondary"),A.classList.add("text-white")),K.forEach(R=>{R.classList.remove("text-secondary","text-gray-300","text-white"),R.classList.add("text-primary")}),ee.forEach(R=>{R.classList.remove("text-secondary"),R.classList.add("text-white")}),le.forEach(R=>{R.classList.remove("text-secondary"),R.classList.add("text-gray-200")}),oe&&(oe.classList.remove("bg-secondary"),oe.classList.add("bg-primary"))}),s.classList.remove("bg-white/10","border-white/20"),s.classList.add("bg-white","border-secondary","selected-agency");const D=s.querySelector(".agency-title"),P=s.querySelectorAll("i"),W=s.querySelectorAll(".agency-phone-link"),O=s.querySelectorAll("p:not(:has(.agency-phone-link))"),H=s.querySelector(".agency-maps-btn");if(D&&(D.classList.remove("text-white"),D.classList.add("text-secondary")),P.forEach(w=>{w.classList.remove("text-secondary","text-gray-300","text-white"),w.classList.add("text-primary")}),W.forEach(w=>{w.classList.remove("text-white"),w.classList.add("text-secondary")}),O.forEach(w=>{w.classList.remove("text-gray-200"),w.classList.add("text-secondary")}),H&&(H.classList.remove("bg-primary"),H.classList.add("bg-secondary")),d&&E&&d._loaded)try{d.flyTo([E.latitude,E.longitude],14,{animate:!0,duration:1});const w=c.find(A=>A.item.id===E.id);w&&w.marker&&w.marker.openPopup()}catch(w){console.warn("Error updating map view:",w)}})})}function z(){const o=i.querySelector(`.${e}-search-input`),s=i.querySelector(`.${e}-zone-filter`),p=i.querySelector(`.${e}-department-filter`),x=i.querySelector(`.${e}-no-results`),E={Occidental:["Ahuachapán","Santa Ana","Sonsonate"],Paracentral:["Chalatenango","Cuscatlán","La Paz","Cabañas","San Vicente"],Central:["La Libertad","San Salvador"],Oriental:["Usulután","San Miguel","Morazán","La Unión"]},D=()=>{if(!s||!p)return;const W=s.value,O=p.value;if(!W)p.innerHTML='<option value="">Todos los Departamentos</option>',[...new Set(a.map(w=>w.department).filter(Boolean))].sort().forEach(w=>{const A=document.createElement("option");A.value=w,A.textContent=w,p.appendChild(A)}),O&&(p.value=O);else{const H=E[W]||[];p.innerHTML='<option value="">Todos los Departamentos</option>',H.forEach(w=>{const A=document.createElement("option");A.value=w,A.textContent=w,p.appendChild(A)}),H.includes(O)&&(p.value=O)}},P=()=>{const W=o?o.value.toLowerCase().trim():"",O=s?s.value:"",H=p?p.value:"";l=a.filter(w=>{let A=!0,K=!0,ee=!0;return W&&(A=Object.values(w).some(le=>String(le).toLowerCase().includes(W))),O&&(K=w.zone===O),H&&(ee=w.department===H),A&&K&&ee}),S(),y(),x&&x.classList.toggle("hidden",l.length>0)};o&&o.addEventListener("input",P),s&&s.addEventListener("change",()=>{D(),P()}),p&&p.addEventListener("change",P)}function F(){const o=i.querySelector("[data-title]");if(o){const x=N("map-title")||"Nuestras Agencias";o.textContent=x}const s=i.querySelector(`.${e}-search-input`);if(s){const x=N("search-placeholder")||"Buscar...";s.setAttribute("placeholder",x)}const p=i.querySelector(`.${e}-no-results`);if(p){const x=N("no-results-text")||"No se encontraron agencias";p.textContent=x}}function N(o){return i.closest(`[data-gjs-type="${e}"]`)?.getAttribute(o)}function J(o){const s=i.querySelector(`.${e}-list`);s&&(s.innerHTML=`
                    <div class="flex flex-col items-center justify-center p-12 text-center">
                        <div class="w-20 h-20 mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                            <i class="ri-error-warning-line text-4xl text-red-300"></i>
                        </div>
                        <p class="text-white font-medium text-lg">${o}</p>
                        <p class="text-gray-300 text-sm mt-2">Por favor, intenta nuevamente más tarde</p>
                    </div>
                `)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",f):f()}}const hi=[{id:"agencies-map",label:"Mapa de Agencias",category:"Interactivos",media:gi,content:{type:"agencies-map-component"}}];function pi(i){const e="agencies-map-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute&&t.getAttribute("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Mapa de Agencias",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{class:"py-12 bg-secondary","data-gjs-type":e},components:`
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
                `,script:fi()},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),mi(i,e),bi(i,e)}function mi(i,e){i.on("component:selected",t=>{if(t.get("type")===e){const r=t.getEl();if(r){const a=r.querySelector(`.${e}-map`);a&&a._map&&setTimeout(()=>{a._map.invalidateSize()},100)}}}),i.on("storage:end:load",()=>{setTimeout(()=>{Be(i,e)},1e3)}),i.on("component:mount",t=>{const r=t.getEl();r&&r.getAttribute&&r.getAttribute("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&r&&a.call(r)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const r=t.getEl();if(r){const a=r.querySelector(`.${e}-map`);a&&a._map&&(a._map.remove(),delete a._map),setTimeout(()=>{const l=t.get("script");l&&typeof l=="function"&&l.call(r)},500)}}}),i.on("canvas:render",()=>{setTimeout(()=>{Be(i,e)},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(a=>{a.set("type",e),a.addAttributes({"data-gjs-type":e})})})}function Be(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(a=>{a.set("type",e);const l=a.getEl();if(l&&l.isConnected){const g=a.get("script");g&&typeof g=="function"&&g.call(l)}})}function bi(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const r=t.contentDocument.head;if(!r.querySelector("#leaflet-css")){const a=document.createElement("link");a.id="leaflet-css",a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",r.appendChild(a)}if(!r.querySelector(`#${e}-css`)){const a=document.createElement("style");a.id=`${e}-css`,a.innerHTML=`
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
            `,r.appendChild(a)}})}const ui=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <circle cx="23" cy="14" r="5" fill="#E97300"/>
    <circle cx="23" cy="14" r="4" fill="#f8e7d8"/>
</svg>`,xi=`
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
}`;function yi(){return function(){const i=this,e=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",t={"fill-blue":{bg:"#003B71",color:"#ffffff",border:"#003B71",hoverBg:"#002a52",hoverColor:"#ffffff"},"outline-blue":{bg:"transparent",color:"#003B71",border:"#003B71",hoverBg:"#003B71",hoverColor:"#ffffff"},"fill-orange":{bg:"#E97300",color:"#ffffff",border:"#E97300",hoverBg:"#c96200",hoverColor:"#ffffff"},"outline-orange":{bg:"transparent",color:"#E97300",border:"#E97300",hoverBg:"#E97300",hoverColor:"#ffffff"},"fill-white":{bg:"#ffffff",color:"#003B71",border:"#ffffff",hoverBg:"#dce8f5",hoverColor:"#003B71"},"outline-white":{bg:"transparent",color:"#ffffff",border:"#ffffff",hoverBg:"#ffffff",hoverColor:"#003B71"}},r=".banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;}.banner-slide-container:active{cursor:grabbing;}.banner-slide-container{display:grid;}.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}.banner-bg{position:absolute;inset:0;z-index:0;}.banner-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.banner-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.banner-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.banner-dots-wrapper{display:none;}.banner-stripe{position:relative;width:100%;height:48px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}.banner-dots{display:flex;gap:8px;align-items:center;}.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}.banner-dot--active{width:28px;background:#ffffff;}@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}";(function(){const s=i.ownerDocument??document;if(!s.getElementById("banner-hero-styles")){const p=s.createElement("style");p.id="banner-hero-styles",p.textContent=r,s.head.appendChild(p)}})();let a=[],l=0,g=null,d=!1,c=0,f=0;const v=50,B=i.dataset.autoplay!=="false",m=i.dataset.category??"",n=i.querySelector(".banner-slide-container");i.querySelector(".banner-dots");async function h(){b();try{const s=await(await fetch(e)).json();if(a=Array.isArray(s)?m?s.filter(p=>p.category===m):s:[],a.length===0){J();return}$(),q(),z(0,!1),B&&F()}catch{J()}}function b(){n.innerHTML=`
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
            `;const o=i.ownerDocument??document;if(!o.getElementById("banner-skeleton-styles")){const s=o.createElement("style");s.id="banner-skeleton-styles",s.textContent=`
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
                `,o.head.appendChild(s)}}function _(o){return t[o]?t[o]:o==="outline-blue"||o==="outline-orange"?t["outline-white"]:t["fill-white"]}function y(o,s,p,x){const E=_(p),D=s?"a":"span",P=s?`href="${s}"${x?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${D} ${P}
                class="banner-btn"
                data-bg="${E.bg}"
                data-color="${E.color}"
                data-hover-bg="${E.hoverBg}"
                data-hover-color="${E.hoverColor}"
                style="background:${E.bg};color:${E.color};border:2px solid ${E.border};">
                ${o}
            </${D}>`}function $(){n.innerHTML=a.map((o,s)=>`
                <div class="banner-slide" data-index="${s}">
                    <div class="banner-slide-inner">
                        <div class="banner-bg">
                            <img src="${o.image_url}"
                                 alt="${o.image_alt??o.title}"
                                 loading="${s===0?"eager":"lazy"}"
                                 decoding="async"
                                 fetchpriority="${s===0?"high":"low"}"
                                 draggable="false">
                        </div>
                        <div class="banner-overlay"></div>
                        <div class="banner-content">
                            ${o.category?`<span class="banner-category-badge">${o.category}</span>`:""}
                            <h2 class="banner-title">${o.title}</h2>
                            <p class="banner-description">${o.description}</p>
                            ${o.btn_primary_text||o.btn_secondary_text?`
                                <div class="banner-buttons">
                                    ${o.btn_primary_text?y(o.btn_primary_text,o.btn_primary_url,o.btn_primary_style,o.btn_primary_external):""}
                                    ${o.btn_secondary_text?y(o.btn_secondary_text,o.btn_secondary_url,o.btn_secondary_style,o.btn_secondary_external):""}
                                </div>`:""}
                        </div>
                    </div>
                </div>
            `).join(""),T(),C(),k()}function T(){i.querySelectorAll(".banner-btn").forEach(o=>{const s=o.style.borderColor;o.addEventListener("mouseenter",()=>{o.style.background=o.dataset.hoverBg,o.style.color=o.dataset.hoverColor,o.style.borderColor=o.dataset.hoverBg}),o.addEventListener("mouseleave",()=>{o.style.background=o.dataset.bg,o.style.color=o.dataset.color,o.style.borderColor=s})})}function C(){n.addEventListener("mousedown",S),n.addEventListener("touchstart",S,{passive:!0}),n.addEventListener("mousemove",u),n.addEventListener("touchmove",u,{passive:!0}),n.addEventListener("mouseup",L),n.addEventListener("touchend",L),n.addEventListener("mouseleave",L)}function k(){a.forEach(o=>{const s=new Image;s.src=o.image_url})}function S(o){d=!0,c=o.touches?o.touches[0].clientX:o.clientX,f=0}function u(o){d&&(f=(o.touches?o.touches[0].clientX:o.clientX)-c)}function L(){d&&(d=!1,Math.abs(f)>=v&&(z(f<0?(l+1)%a.length:(l-1+a.length)%a.length),N()),f=0)}function q(){const o=i.querySelector(".banner-stripe");if(!o||a.length<=1)return;const s=document.createElement("div");s.className="banner-dots",a.forEach((p,x)=>{const E=document.createElement("button");E.className="banner-dot",E.dataset.index=String(x),E.setAttribute("aria-label",`Banner ${x+1}`),E.addEventListener("click",()=>{z(x),N()}),s.appendChild(E)}),o.innerHTML="",o.appendChild(s)}function z(o,s=!0){const p=n.querySelectorAll(".banner-slide"),x=i.querySelectorAll(".banner-dot");p.forEach((E,D)=>{const P=D===o;s||(E.style.transition="none"),E.classList.toggle("banner-slide--active",P),s||requestAnimationFrame(()=>{E.style.transition=""})}),x.forEach((E,D)=>{E.classList.toggle("banner-dot--active",D===o)}),l=o}function F(){a.length<=1||!B||(g=setInterval(()=>{z((l+1)%a.length)},5e3))}function N(){B&&(clearInterval(g),F())}function J(){const o=i.querySelector(".banner-wrapper");o&&(o.innerHTML=`
                    <div style="display:flex;align-items:center;justify-content:center;
                                min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;">
                        Sin contenido.
                    </div>`)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",h):h()}}const wi=[{id:"banner-hero",label:"Banner Slider",category:"Banners",media:ui,content:{type:"banner-hero-component"}}];function vi(i){const e="banner-hero-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Slider",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-autoplay":"true","data-category":""},components:`
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
                `,script:yi(),traits:[{type:"select",name:"data-autoplay",label:"Avance automático",options:[{id:"true",name:"Activado"},{id:"false",name:"Desactivado"}],changeProp:!1},{type:"select",name:"data-category",label:"Filtrar por categoría",options:[{id:"",name:"Todas las categorías"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const t=this.getEl();if(!t)return;const r=this.get("script");r&&typeof r=="function"&&setTimeout(()=>r.call(t),100)})}}}),ki(i,e),Ei(i,e),Bi(i,e)}async function Bi(i,e){try{const t=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",a=await(await fetch(t)).json();if(!Array.isArray(a))return;const l=[...new Set(a.map(f=>f.category).filter(Boolean))].sort();if(l.length===0)return;const g=i.DomComponents.getType(e);if(!g)return;const c=g.model.prototype.defaults.traits.find(f=>f.name==="data-category");if(!c)return;c.options=[{id:"",name:"Todas las categorías"},...l.map(f=>({id:f,name:f}))]}catch{}}function ki(i,e){i.on("storage:end:load",()=>{setTimeout(()=>ke(i,e),1e3)}),i.on("component:mount",t=>{const r=t.getEl();r?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const r=t.getEl();r&&setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},500)}}),i.on("canvas:render",()=>{setTimeout(()=>ke(i,e),800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function ke(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const r=t.getEl();if(r?.isConnected){const a=t.get("script");a&&typeof a=="function"&&a.call(r)}})}function Ei(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const r=t.contentDocument?.head;if(r){if(!r.querySelector("#banner-hero-styles")){const a=document.createElement("style");a.id="banner-hero-styles",a.textContent=xi,r.appendChild(a)}if(!r.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(240,135,42,0.6) !important;
                    outline-offset: 2px;
                }
            `,r.appendChild(a)}}})}const $i=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="17" y="8" width="12" height="14" fill="#E97300" rx="2"/>
    <rect x="19" y="10" width="8" height="10" fill="#f8e7d8" rx="1"/>
</svg>`,Ci=`
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
}`;function Li(){return function(){const i=this,e=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",t={"fill-blue":{bg:"#003B71",color:"#ffffff",border:"#003B71",hoverBg:"#002a52",hoverColor:"#ffffff"},"outline-blue":{bg:"transparent",color:"#003B71",border:"#003B71",hoverBg:"#003B71",hoverColor:"#ffffff"},"fill-orange":{bg:"#E97300",color:"#ffffff",border:"#E97300",hoverBg:"#c96200",hoverColor:"#ffffff"},"outline-orange":{bg:"transparent",color:"#E97300",border:"#E97300",hoverBg:"#E97300",hoverColor:"#ffffff"},"fill-white":{bg:"#ffffff",color:"#003B71",border:"#ffffff",hoverBg:"#dce8f5",hoverColor:"#003B71"},"outline-white":{bg:"transparent",color:"#ffffff",border:"#ffffff",hoverBg:"#ffffff",hoverColor:"#003B71"}},r=".bsingle-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.bsingle-inner{position:relative;width:100%;min-height:480px;display:flex;align-items:center;}.bsingle-bg{position:absolute;inset:0;z-index:0;}.bsingle-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.bsingle-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.bsingle-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.bsingle-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.bsingle-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.bsingle-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.bsingle-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.bsingle-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.bsingle-stripe{position:relative;width:100%;height:40px;background:#E97300;z-index:20;}@media(max-width:768px){.bsingle-inner{min-height:340px;}.bsingle-bg img{object-position:right center;}.bsingle-content{max-width:100%;width:100%;padding:32px 24px 80px;}.bsingle-buttons{flex-wrap:wrap;gap:12px;}.bsingle-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.bsingle-btn{flex:1 1 100%;min-width:0;}}";(function(){const h=i.ownerDocument??document;if(!h.getElementById("banner-single-styles")){const b=h.createElement("style");b.id="banner-single-styles",b.textContent=r,h.head.appendChild(b)}})();const a=i.dataset.bannerId??"",l=i.querySelector(".bsingle-content-wrapper");async function g(){d();try{const h=await(await fetch(e)).json();if(!Array.isArray(h)||h.length===0){m();return}const b=a?h.find(_=>String(_.id)===String(a)):h[0];if(!b){m();return}v(b)}catch{m()}}function d(){l.innerHTML=`
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
                </div>`;const n=i.ownerDocument??document;if(!n.getElementById("banner-skeleton-styles")){const h=n.createElement("style");h.id="banner-skeleton-styles",h.textContent="@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title--short{width:60%;}.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-line--short{width:55%;}.bsk-buttons{display:flex;gap:16px;margin-top:36px;}.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}@media(max-width:768px){.bsk-buttons{flex-direction:column;}}",n.head.appendChild(h)}}function c(n){return t[n]??t["fill-white"]}function f(n,h,b,_){const y=c(b),$=h?"a":"span",T=h?`href="${h}"${_?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${$} ${T}
                class="bsingle-btn"
                data-bg="${y.bg}"
                data-color="${y.color}"
                data-border="${y.border}"
                data-hover-bg="${y.hoverBg}"
                data-hover-color="${y.hoverColor}"
                style="background:${y.bg};color:${y.color};border:2px solid ${y.border};">
                ${n}
            </${$}>`}function v(n){l.innerHTML=`
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
                                ${n.btn_primary_text?f(n.btn_primary_text,n.btn_primary_url,n.btn_primary_style,n.btn_primary_external):""}
                                ${n.btn_secondary_text?f(n.btn_secondary_text,n.btn_secondary_url,n.btn_secondary_style,n.btn_secondary_external):""}
                            </div>`:""}
                    </div>
                </div>`,B()}function B(){i.querySelectorAll(".bsingle-btn").forEach(n=>{const h=n.style.borderColor;n.addEventListener("mouseenter",()=>{n.style.background=n.dataset.hoverBg,n.style.color=n.dataset.hoverColor,n.style.borderColor=n.dataset.hoverBg}),n.addEventListener("mouseleave",()=>{n.style.background=n.dataset.bg,n.style.color=n.dataset.color,n.style.borderColor=h})})}function m(){l.innerHTML=`
                <div style="display:flex;align-items:center;justify-content:center;
                            min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;">
                    No hay banner seleccionado o no está activo.
                </div>`}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g):g()}}const Si=[{id:"banner-single",label:"Banner Individual",category:"Banners",media:$i,content:{type:"banner-single-component"}}];function ji(i){const e="banner-single-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Individual",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-banner-id":""},components:`
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
                `,script:Li(),traits:[{type:"select",name:"data-banner-id",label:"Banner a mostrar",options:[{id:"",name:"Cargando banners..."}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const t=this.getEl();if(!t)return;const r=this.get("script");r&&typeof r=="function"&&setTimeout(()=>r.call(t),100)})}}}),zi(i,e),Ii(i,e),Ti(i,e)}async function Ti(i,e){try{const t=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",a=await(await fetch(t)).json();if(!Array.isArray(a)||a.length===0)return;const l=i.DomComponents.getType(e);if(!l)return;const d=l.model.prototype.defaults.traits.find(c=>c.name==="data-banner-id");if(!d)return;d.options=[{id:"",name:"— Seleccionar banner —"},...a.map(c=>({id:String(c.id),name:c.category?`[${c.category}] ${c.title}`:c.title}))]}catch{}}function zi(i,e){i.on("storage:end:load",()=>{setTimeout(()=>Ee(i,e),1e3)}),i.on("component:mount",t=>{const r=t.getEl();r?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const r=t.getEl();r&&setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(r)},500)}}),i.on("canvas:render",()=>{setTimeout(()=>Ee(i,e),800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function Ee(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const r=t.getEl();if(r?.isConnected){const a=t.get("script");a&&typeof a=="function"&&a.call(r)}})}function Ii(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const r=t.contentDocument?.head;if(r){if(!r.querySelector("#banner-single-styles")){const a=document.createElement("style");a.id="banner-single-styles",a.textContent=Ci,r.appendChild(a)}if(!r.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(240,135,42,0.6) !important;
                    outline-offset: 2px;
                }
            `,r.appendChild(a)}}})}function _i(i){I.registerBlocks(Ve),I.registerBlocks(tt),I.registerBlocks(wi),I.registerBlocks(Si),I.registerBlocks(Dt),I.registerBlocks(Bt),I.registerBlocks(lt),I.registerBlocks(st),I.registerBlocks(ut),I.registerBlocks(ct),I.registerBlocks(It),I.registerBlocks(ht),I.registerBlocks(Nt),I.registerBlocks(Wt),I.registerBlocks(li),I.registerBlocks(ci),I.registerBlocks(hi),I.applyToEditor(i),pi(i),vi(i),ji(i),oi(i),kt(i),Vt(i)}function Ai(i,e,t){i.on("component:add",()=>e.markAsDirty()),i.on("component:remove",()=>e.markAsDirty()),i.on("component:update",()=>e.markAsDirty()),i.on("style:update",()=>e.markAsDirty());const r=document.getElementById("save-button");r&&r.addEventListener("click",async()=>{await Mi(i,e,t,r)}),document.addEventListener("keydown",a=>{(a.ctrlKey||a.metaKey)&&a.key==="s"&&(a.preventDefault(),r&&!r.disabled&&r.click())})}async function Mi(i,e,t,r){r.disabled=!0,r.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{t.needsTitle()?await Di(i,e,t):await Se(i,e,t)}catch(a){je(a.message,"error")}finally{r.disabled=!1,r.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}async function Di(i,e,t){return new Promise((r,a)=>{Oi(async l=>{if(!l?.trim()){a(new Error("El título es obligatorio"));return}try{await Se(i,e,t,l),r()}catch(g){a(g)}})})}async function Se(i,e,t,r=null){const l={...e.getEditorContent(i),is_published:t.isPublished};r&&(l.title=r);const g=await e.savePage(i,l,t.storeUrl,t.getHttpMethod());g.success&&(e.markAsClean(),je(g.message,"success"),!t.isEditMode&&g.page?(t.updatePageInfo(g),t.updateTitle(g.page.title)):r&&t.updateTitle(r))}function qi(){const i=document.createElement("div");return i.style.cssText=`
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.5);
    `,i}function Hi(){const i=document.createElement("div");return i.style.cssText=`
        background: #ffffff;
        border-radius: 0.75rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 28rem;
        width: 100%;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
    `,i}function Ni(i,e,t,r,a){const l=document.createElement("div");return l.style.cssText="padding: 1.5rem 1.5rem 0;",l.innerHTML=`
        <div style="display:flex;align-items:flex-start;gap:1rem;">
            <div style="flex-shrink:0;width:3rem;height:3rem;border-radius:50%;background:${i};color:${e};display:flex;align-items:center;justify-content:center;">
                <i class="${t}" style="font-size:1.5rem;"></i>
            </div>
            <div style="flex:1;">
                <h3 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 0.5rem;">${r}</h3>
                <p style="font-size:0.875rem;color:#6b7280;margin:0;">${a}</p>
            </div>
        </div>
    `,l}function Pi(i){const e=document.createElement("div");return e.style.cssText=`
        padding: 1rem 1.5rem;
        background: #f9fafb;
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        margin-top: 1.5rem;
    `,i.forEach(({label:t,style:r,id:a})=>{const l=document.createElement("button");l.id=a,l.style.cssText=`
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            transition: opacity 0.2s;
            ${r}
        `,l.textContent=t,l.addEventListener("mouseenter",()=>{l.style.opacity="0.85"}),l.addEventListener("mouseleave",()=>{l.style.opacity="1"}),e.appendChild(l)}),e}function Oi(i){const e=qi(),t=Hi(),r=Ni("#dbeafe","#2563eb","ri-file-text-line","Título de la Página","Ingresa un título descriptivo para identificar esta página"),a=document.createElement("div");a.style.cssText="padding: 1rem 1.5rem 0;";const l=document.createElement("input");l.type="text",l.id="page-title-input",l.placeholder="Ej: Acerca de Nosotros",l.style.cssText=`
        width: 100%;
        padding: 0.5rem 1rem;
        border: 2px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
        font-family: inherit;
    `,l.addEventListener("focus",()=>{l.style.borderColor="#f0872a"}),l.addEventListener("blur",()=>{l.style.borderColor="#d1d5db"}),a.appendChild(l);const g=Pi([{id:"modal-cancel",label:"Cancelar",style:"background:#ffffff;color:#374151;border:2px solid #d1d5db;"},{id:"modal-confirm",label:"Guardar",style:"background:#f0872a;color:#ffffff;border:2px solid #f0872a;"}]);t.appendChild(r),t.appendChild(a),t.appendChild(g),e.appendChild(t),document.body.appendChild(e);const d=()=>e.remove();g.querySelector("#modal-cancel").addEventListener("click",d),g.querySelector("#modal-confirm").addEventListener("click",()=>{const c=l.value.trim();d(),i(c)}),e.addEventListener("click",c=>{c.target===e&&d()}),l.addEventListener("keypress",c=>{c.key==="Enter"&&g.querySelector("#modal-confirm").click()}),setTimeout(()=>l.focus(),100)}function je(i,e){typeof window.showNotification=="function"&&window.showNotification(i,e)}document.addEventListener("DOMContentLoaded",async()=>{const i=new ze,e=new Re;new Ue(i);const t=Ie();if(t.on("load",()=>{_i(t),_e(t),Ae(),Me(),De(t),qe(t),He(t),Ne(t),Pe(t),Oe(t),Ri(t),Ui(t),Wi(t),setTimeout(()=>{t.runCommand("sw-visibility"),t.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),e.isEditMode)try{await i.loadPageContent(t,e.loadUrl),$e("Contenido cargado correctamente","success")}catch(r){$e("Error al cargar el contenido","error"),console.error(r)}Ai(t,i,e)});function Ri(i){const e=[{cmd:"set-device-desktop",device:"Desktop"},{cmd:"set-device-tablet",device:"Tablet"},{cmd:"set-device-mobile",device:"Mobile"}];e.forEach(({cmd:t,device:r})=>{i.Commands.add(t,{run:a=>{a.setDevice(r),e.forEach(({cmd:l})=>{a.Panels.getButton("devices-c",l)?.set("active",l===t)})}})})}function Ui(i){i.Commands.add("canvas-clear",{run:e=>{Fi("Limpiar canvas","¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.","ri-delete-bin-line","#fef2f2","#dc2626","Limpiar todo","#dc2626",()=>{e.DomComponents.clear(),e.CssComposer.clear()})}})}function Fi(i,e,t,r,a,l,g,d){const c=document.createElement("div");c.style.cssText=`
        position:fixed;inset:0;z-index:9999;
        display:flex;align-items:center;justify-content:center;
        padding:1rem;background:rgba(0,0,0,0.5);
    `;const f=document.createElement("div");f.style.cssText=`
        background:#ffffff;border-radius:0.75rem;
        box-shadow:0 20px 60px rgba(0,0,0,0.3);
        max-width:28rem;width:100%;overflow:hidden;
        font-family:'Inter',sans-serif;
    `;const v=document.createElement("div");v.style.cssText="padding:1.5rem 1.5rem 0;",v.innerHTML=`
        <div style="display:flex;align-items:flex-start;gap:1rem;">
            <div style="flex-shrink:0;width:3rem;height:3rem;border-radius:50%;
                        background:${r};color:${a};
                        display:flex;align-items:center;justify-content:center;">
                <i class="${t}" style="font-size:1.5rem;"></i>
            </div>
            <div style="flex:1;">
                <h3 style="font-size:1.125rem;font-weight:700;color:#111827;margin:0 0 0.5rem;">${i}</h3>
                <p style="font-size:0.875rem;color:#6b7280;margin:0;line-height:1.5;">${e}</p>
            </div>
        </div>
    `;const B=document.createElement("div");B.style.cssText=`
        padding:1rem 1.5rem;background:#f9fafb;
        display:flex;gap:0.75rem;justify-content:flex-end;margin-top:1.5rem;
    `;const m=document.createElement("button");m.textContent="Cancelar",m.style.cssText=`
        padding:0.5rem 1rem;border-radius:0.5rem;font-weight:500;
        font-size:0.875rem;cursor:pointer;background:#ffffff;
        color:#374151;border:2px solid #d1d5db;font-family:inherit;
    `;const n=document.createElement("button");n.textContent=l,n.style.cssText=`
        padding:0.5rem 1rem;border-radius:0.5rem;font-weight:500;
        font-size:0.875rem;cursor:pointer;background:${g};
        color:#ffffff;border:2px solid ${g};font-family:inherit;
    `,[m,n].forEach(b=>{b.addEventListener("mouseenter",()=>{b.style.opacity="0.85"}),b.addEventListener("mouseleave",()=>{b.style.opacity="1"})});const h=()=>c.remove();m.addEventListener("click",h),n.addEventListener("click",()=>{h(),d()}),c.addEventListener("click",b=>{b.target===c&&h()}),B.appendChild(m),B.appendChild(n),f.appendChild(v),f.appendChild(B),c.appendChild(f),document.body.appendChild(c)}function Wi(i){const e=i.Canvas.getFrameEl();if(!e?.contentDocument?.head)return;const t=e.contentDocument.createElement("style");t.id="gjs-dashed-fix",t.textContent="body,body.gjs-dashed{margin:0!important;padding:0 0 160px 0!important;}",e.contentDocument.head.appendChild(t)}function $e(i,e="info"){typeof window.showNotification=="function"&&window.showNotification(i,e)}
