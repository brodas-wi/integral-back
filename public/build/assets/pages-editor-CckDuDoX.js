/* empty css                   *//* empty css                    *//* empty css                          *//* empty css                           */import{_ as Te,M as Ie,E as Ae,t as _e,d as De,f as qe,i as Ve,s as Pe,e as Ne,c as Oe,b as Re,a as Ue}from"./editor-commands-NxX2QgS9.js";import{g as Fe}from"./_commonjsHelpers-CqkleIqs.js";import{a as X}from"./url-DaqOO3yL.js";class Ze{constructor(){this.pageId=this.getElementValue("page-id"),this.pageSlug=this.getElementValue("page-slug"),this.pageTitle=this.getPageTitle(),this.loadUrl=this.getElementValue("page-load-url"),this.storeUrl=this.getElementValue("page-store-url"),this.isPublished=this.getElementValue("page-is-published")==="1",this.isEditMode=!!this.pageId}getElementValue(e,t=""){const l=document.getElementById(e);return l?l.value.trim():t}getPageTitle(){const e=document.getElementById("editor-title");if(!e)return"";const l=e.textContent.match(/(?:Editando:|Nueva Página)\s*(.+)?/);return l&&l[1]?l[1].trim():""}updatePageInfo(e){if(e.page){this.pageId=e.page.id,this.pageSlug=e.page.slug,this.pageTitle=e.page.title,this.isEditMode=!0,document.getElementById("page-id").value=this.pageId,document.getElementById("page-slug").value=this.pageSlug;const t=this.storeUrl.replace("/pages",`/pages/${this.pageSlug}`);this.storeUrl=t,document.getElementById("page-store-url").value=t,this.loadUrl=`/pages/${this.pageSlug}/load`,document.getElementById("page-load-url").value=this.loadUrl}}updateTitle(e){this.pageTitle=e;const t=document.getElementById("editor-title");t&&(t.textContent=`Editando: ${e}`)}getHttpMethod(){return this.isEditMode?"PUT":"POST"}needsTitle(){return!this.isEditMode}}class We{constructor(e){this.editorService=e,this.setupBackButton(),this.setupBeforeUnload()}setupBackButton(){const e=document.querySelector("#editor-navbar a[href]");e&&e.addEventListener("click",t=>{this.editorService.shouldPreventUnload()&&(t.preventDefault(),this.showUnsavedChangesModal(()=>{this.editorService.startNavigation(),window.location.href=e.href}))})}setupBeforeUnload(){window.addEventListener("beforeunload",e=>{if(this.editorService.shouldPreventUnload())return e.preventDefault(),e.returnValue="Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?",e.returnValue})}showUnsavedChangesModal(e){const t=document.createElement("div");t.style.cssText=`
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            background: rgba(0, 0, 0, 0.5);
        `;const l=document.createElement("div");l.style.cssText=`
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
        `;const r=document.createElement("div");r.style.cssText=`
            padding: 1rem 1.5rem;
            background: #f9fafb;
            display: flex;
            gap: 0.75rem;
            justify-content: flex-end;
            margin-top: 1.5rem;
        `;const h=document.createElement("button");h.textContent="Cancelar",h.style.cssText=`
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
        `,[h,d].forEach(p=>{p.addEventListener("mouseenter",()=>{p.style.opacity="0.85"}),p.addEventListener("mouseleave",()=>{p.style.opacity="1"})});const g=()=>t.remove();h.addEventListener("click",g),d.addEventListener("click",()=>{g(),e()}),t.addEventListener("click",p=>{p.target===t&&g()}),r.appendChild(h),r.appendChild(d),l.appendChild(a),l.appendChild(r),t.appendChild(l),document.body.appendChild(t)}}var le={exports:{}};var Ye=le.exports,he;function Ge(){return he||(he=1,(function(i,e){(function(t,l){i.exports=l()})(typeof globalThis<"u"?globalThis:typeof window<"u"?window:Ye,(()=>(()=>{var t={d:(c,m)=>{for(var w in m)t.o(m,w)&&!t.o(c,w)&&Object.defineProperty(c,w,{enumerable:!0,get:m[w]})},o:(c,m)=>Object.prototype.hasOwnProperty.call(c,m),r:c=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(c,"__esModule",{value:!0})}},l={};t.r(l),t.d(l,{default:()=>n});var a=function(){return a=Object.assign||function(c){for(var m,w=1,y=arguments.length;w<y;w++)for(var u in m=arguments[w])Object.prototype.hasOwnProperty.call(m,u)&&(c[u]=m[u]);return c},a.apply(this,arguments)},r="gjs-open-import-webpage",h="set-device-desktop",d="set-device-tablet",g="set-device-mobile",p="canvas-clear",E=function(){return E=Object.assign||function(c){for(var m,w=1,y=arguments.length;w<y;w++)for(var u in m=arguments[w])Object.prototype.hasOwnProperty.call(m,u)&&(c[u]=m[u]);return c},E.apply(this,arguments)};const C=function(c,m){var w=c.Commands,y=m.textCleanCanvas;(function(u,M){var v=u.getConfig("stylePrefix"),B=M.modalImportLabel,$=M.modalImportContent;u.Commands.add(r,{codeViewer:null,container:null,run:function(b){var L=typeof $=="function"?$(b):$,H=this.getCodeViewer();b.Modal.open({title:M.modalImportTitle,content:this.getContainer()}).onceClose((function(){return b.stopCommand(r)})),H.setContent(L??""),H.refresh(),setTimeout((function(){return H.focus()}),0)},stop:function(){u.Modal.close()},getContainer:function(){if(!this.container){var b=this.getCodeViewer(),L=document.createElement("div");if(L.className="".concat(v,"import-container"),B){var H=document.createElement("div");H.className="".concat(v,"import-label"),H.innerHTML=B,L.appendChild(H)}L.appendChild(b.getElement());var z=document.createElement("button");z.type="button",z.innerHTML=M.modalImportButton,z.className="".concat(v,"btn-prim ").concat(v,"btn-import"),z.onclick=function(){u.Css.clear(),u.setComponents(b.getContent().trim()),u.Modal.close()},L.appendChild(z),this.container=L}return this.container},getCodeViewer:function(){return this.codeViewer||(this.codeViewer=u.CodeManager.createViewer(E({codeName:"htmlmixed",theme:"hopscotch",readOnly:!1},M.importViewerOptions))),this.codeViewer}})})(c,m),w.add(h,{run:function(u){return u.setDevice("Desktop")},stop:function(){}}),w.add(d,{run:function(u){return u.setDevice("Tablet")},stop:function(){}}),w.add(g,{run:function(u){return u.setDevice("Mobile portrait")},stop:function(){}}),w.add(p,(function(u){return confirm(y)&&u.runCommand("core:canvas-clear")}))};var x=function(){return x=Object.assign||function(c){for(var m,w=1,y=arguments.length;w<y;w++)for(var u in m=arguments[w])Object.prototype.hasOwnProperty.call(m,u)&&(c[u]=m[u]);return c},x.apply(this,arguments)};const n=function(c,m){m===void 0&&(m={});var w=x({blocks:["link-block","quote","text-basic"],block:function(){return{}},modalImportTitle:"Import",modalImportButton:"Import",modalImportLabel:"",modalImportContent:"",importViewerOptions:{},textCleanCanvas:"Are you sure you want to clear the canvas?",showStylesOnChange:!0,useCustomTheme:!0},m);if(w.useCustomTheme&&typeof window<"u"){var y="gjs-",u="";[["one","#463a3c"],["two","#b9a5a6"],["three","#804f7b"],["four","#d97aa6"]].forEach((function(v){var B=v[0],$=v[1];u+=`
        .`.concat(y).concat(B,`-bg {
          background-color: `).concat($,`;
        }

        .`).concat(y).concat(B,`-color {
          color: `).concat($,`;
        }

        .`).concat(y).concat(B,`-color-h:hover {
          color: `).concat($,`;
        }
      `)}));var M=document.createElement("style");M.innerText=u,document.head.appendChild(M)}(function(v,B){var $=function(b,L){B.blocks.indexOf(b)>=0&&v.Blocks.add(b,a(a({select:!0,category:"Basic"},L),B.block(b)))};$("link-block",{label:"Link Block",media:`<svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z"></path>
    </svg>`,content:{type:"link",editable:!1,droppable:!0,style:{display:"inline-block",padding:"5px","min-height":"50px","min-width":"50px"}}}),$("quote",{label:"Quote",media:`<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
    </svg>`,content:`<blockquote class="quote">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
      </blockquote>`}),$("text-basic",{label:"Text section",media:`<svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,6V8H3V6H21M3,18H12V16H3V18M3,13H21V11H3V13Z" />
    </svg>`,content:`<section class="bdg-sect">
      <h1 class="heading">Insert title here</h1>
      <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </section>`})})(c,w),C(c,w),(function(v,B){var $=v.Panels,b=v.getConfig(),L="sw-visibility",H="export-template",z="open-sm",V="open-tm",D="open-layers",R="open-blocks",o="fullscreen",s="preview",f='style="display: block; max-width:22px"';b.showDevices=!1,$.getPanels().reset([{id:"commands",buttons:[{}]},{id:"devices-c",buttons:[{id:h,command:h,active:!0,label:"<svg ".concat(f,` viewBox="0 0 24 24">
            <path fill="currentColor" d="M21,16H3V4H21M21,2H3C1.89,2 1,2.89 1,4V16A2,2 0 0,0 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4C23,2.89 22.1,2 21,2Z" />
        </svg>`)},{id:d,command:d,label:"<svg ".concat(f,` viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,18H5V6H19M21,4H3C1.89,4 1,4.89 1,6V18A2,2 0 0,0 3,20H21A2,2 0 0,0 23,18V6C23,4.89 22.1,4 21,4Z" />
        </svg>`)},{id:g,command:g,label:"<svg ".concat(f,` viewBox="0 0 24 24">
            <path fill="currentColor" d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" />
        </svg>`)}]},{id:"options",buttons:[{id:L,command:L,context:L,label:"<svg ".concat(f,` viewBox="0 0 24 24">
        <path fill="currentColor" d="M15,5H17V3H15M15,21H17V19H15M11,5H13V3H11M19,5H21V3H19M19,9H21V7H19M19,21H21V19H19M19,13H21V11H19M19,17H21V15H19M3,5H5V3H3M3,9H5V7H3M3,13H5V11H3M3,17H5V15H3M3,21H5V19H3M11,21H13V19H11M7,21H9V19H7M7,5H9V3H7V5Z" />
    </svg>`)},{id:s,context:s,command:function(){return v.runCommand(s)},label:"<svg ".concat(f,' viewBox="0 0 24 24"><path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"></path></svg>')},{id:o,command:o,context:o,label:"<svg ".concat(f,` viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z" />
        </svg>`)},{id:H,command:function(){return v.runCommand(H)},label:"<svg ".concat(f,` viewBox="0 0 24 24">
            <path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" />
        </svg>`)},{id:"undo",command:function(){return v.runCommand("core:undo")},label:"<svg ".concat(f,` viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 13.5C20 17.09 17.09 20 13.5 20H6V18H13.5C16 18 18 16 18 13.5S16 9 13.5 9H7.83L10.91 12.09L9.5 13.5L4 8L9.5 2.5L10.92 3.91L7.83 7H13.5C17.09 7 20 9.91 20 13.5Z" />
        </svg>`)},{id:"redo",command:function(){return v.runCommand("core:redo")},label:"<svg ".concat(f,` viewBox="0 0 24 24">
            <path fill="currentColor" d="M10.5 18H18V20H10.5C6.91 20 4 17.09 4 13.5S6.91 7 10.5 7H16.17L13.08 3.91L14.5 2.5L20 8L14.5 13.5L13.09 12.09L16.17 9H10.5C8 9 6 11 6 13.5S8 18 10.5 18Z" />
        </svg>`)},{id:r,command:function(){return v.runCommand(r)},label:"<svg ".concat(f,` viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
        </svg>`)},{id:p,command:function(){return v.runCommand(p)},label:"<svg ".concat(f,` viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
          </svg>`)}]},{id:"views",buttons:[{id:z,command:z,active:!0,label:"<svg ".concat(f,` viewBox="0 0 24 24">
            <path fill="currentColor" d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" />
        </svg>`)},{id:V,command:V,label:"<svg ".concat(f,` viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
      </svg>`)},{id:D,command:D,label:"<svg ".concat(f,` viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" />
      </svg>`)},{id:R,command:R,label:"<svg ".concat(f,` viewBox="0 0 24 24">
          <path fill="currentColor" d="M17,13H13V17H11V13H7V11H11V7H13V11H17M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" />
      </svg>`)}]}]);var k=$.getButton("views",R);v.on("load",(function(){return k?.set("active",!0)})),B.showStylesOnChange&&v.on("component:selected",(function(){var j=$.getButton("views",z),_=$.getButton("views",D);_&&_.get("active")||!v.getSelected()||j==null||j.set("active",!0)}))})(c,w)};return l})()))})(le)),le.exports}var Xe=Ge();const fe=Fe(Xe);function Qe(){const i=p=>{const E=document.querySelectorAll("script[src]");for(const C of E)if(C.src.includes(p))return C.src;return null},e=document.querySelector('meta[name="canvas-css-url"]')?.content??null,t=document.querySelector('meta[name="canvas-app-css-url"]')?.content??null,l=document.querySelector('meta[name="canvas-poppins-url"]')?.content??null,a=document.querySelector('meta[name="canvas-remixicons-url"]')?.content??null,r="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",h=i("map-loader"),d=[l,a,e,t,r].filter(Boolean),g=[h].filter(Boolean);return Te.init({container:"#gjs",fromElement:!1,height:"calc(100vh - 50px)",width:"auto",storageManager:!1,canvas:{styles:d,scripts:g},deviceManager:{devices:[{id:"desktop",name:"Desktop",width:"",widthMedia:""},{id:"tablet",name:"Tablet",width:"768px",widthMedia:"992px"},{id:"mobile",name:"Mobile",width:"375px",widthMedia:"575px"}]},panels:{defaults:[{id:"devices-c",buttons:[{id:"set-device-desktop",command:"set-device-desktop",className:"fa fa-desktop",active:!0,togglable:!1,label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M21 2H3a2 2 0 00-2 2v12a2 2 0 002 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 002-2V4a2 2 0 00-2-2zm0 14H3V4h18v12z"/></svg>',attributes:{title:"Escritorio"}},{id:"set-device-tablet",command:"set-device-tablet",className:"fa fa-tablet",togglable:!1,label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.5 0h-14C3.1 0 2 1.1 2 2.5v19C2 22.9 3.1 24 4.5 24h14c1.4 0 2.5-1.1 2.5-2.5v-19C21 1.1 19.9 0 18.5 0zm-7 23c-.8 0-1.5-.7-1.5-1.5S10.7 20 11.5 20s1.5.7 1.5 1.5S12.3 23 11.5 23zm7.5-4H4V3h15v16z"/></svg>',attributes:{title:"Tablet"}},{id:"set-device-mobile",command:"set-device-mobile",className:"fa fa-mobile",togglable:!1,label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M15.5 1h-8C6.1 1 5 2.1 5 3.5v17C5 21.9 6.1 23 7.5 23h8c1.4 0 2.5-1.1 2.5-2.5v-17C18 2.1 16.9 1 15.5 1zm-4 21c-.8 0-1.5-.7-1.5-1.5S10.7 19 11.5 19s1.5.7 1.5 1.5S12.3 22 11.5 22zm4.5-4H7V4h9v15z"/></svg>',attributes:{title:"Móvil"}}]},{id:"options",buttons:[{id:"sw-visibility",command:"sw-visibility",label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z"/></svg>',context:"sw-visibility",attributes:{title:"Contornos"}},{id:"preview",command:"preview",label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>',context:"preview",attributes:{title:"Vista previa"}},{id:"fullscreen",command:"fullscreen",label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>',context:"fullscreen",attributes:{title:"Pantalla completa"}},{id:"export-template",command:"export-template",label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',context:"export-template",attributes:{title:"Ver código"}},{id:"undo",command:"core:undo",label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>',attributes:{title:"Deshacer"}},{id:"redo",command:"core:redo",label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>',attributes:{title:"Rehacer"}},{id:"gjs-open-import-webpage",command:"gjs-open-import-webpage",label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>',attributes:{title:"Importar"}},{id:"canvas-clear",command:"canvas-clear",label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>',attributes:{title:"Limpiar canvas"}}]},{id:"views",buttons:[{id:"open-sm",command:"open-sm",active:!1,togglable:!1,label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M2.5 4v3h5V4h-5zm6.5 0v3h6V4H9zm7 0v3h5.5V4H16zM2.5 10.5v3h5v-3h-5zm6.5 0v3h6v-3H9zm7 0v3h5.5v-3H16zM2.5 17v3h5v-3h-5zm6.5 0v3h6v-3H9zm7 0v3h5.5v-3H16z"/></svg>',attributes:{title:"Panel de Estilos"}},{id:"open-tm",command:"open-tm",togglable:!1,label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',attributes:{title:"Configuraciones"}},{id:"open-layers",command:"open-layers",togglable:!1,label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27-7.38 5.74zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg>',attributes:{title:"Panel de Capas"}},{id:"open-blocks",command:"open-blocks",togglable:!1,label:'<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z"/></svg>',attributes:{title:"Panel de Bloques"}}]}]},styleManager:{sectors:[{name:"Dimensiones",open:!1,buildProps:["width","height","max-width","min-height","margin","padding"]},{name:"Tipografía",open:!1,buildProps:["font-family","font-size","font-weight","color","text-align","line-height"]},{name:"Decoración",open:!1,buildProps:["background-color","border","border-radius","box-shadow"]},{name:"Extra",open:!1,buildProps:["opacity","transition","transform","cursor"]}]},i18n:{locale:"es",detectLocale:!1,messages:{es:{styleManager:{properties:"Propiedades",empty:"Selecciona un elemento para usar el Panel de Estilos"},traitManager:{empty:"Selecciona un elemento para editarlo",label:"Configuraciones del componente"},deviceManager:{device:"Dispositivo",devices:{desktop:"Escritorio",tablet:"Tablet",mobile:"Móvil"}}}}},plugins:[fe],pluginsOpts:{[fe]:{blocks:[],modalImportTitle:"Importar",modalImportLabel:"",modalImportContent:""}}})}const Je="Básico";class Ke{constructor(){this.blocks=new Map}registerBlock(e,t){this.blocks.has(t.category)||this.blocks.set(t.category,[]),this.blocks.get(t.category).push({id:e,...t})}registerBlocks(e){e.forEach(t=>{this.registerBlock(t.id,t)})}applyToEditor(e){this.blocks.forEach(t=>{t.forEach(l=>{const{id:a,...r}=l;e.BlockManager.add(a,r)})}),this.applyCollapseSettings(e),this.hideDefaultCategories(e)}applyCollapseSettings(e){setTimeout(()=>{e.BlockManager.getCategories().each(t=>{t.set("open",t.get("label")===Je)})},500)}hideDefaultCategories(e){setTimeout(()=>{const t=["Basic","Extra"];document.querySelectorAll(".gjs-block-category").forEach(l=>{const a=l.querySelector(".gjs-title");a&&t.includes(a.textContent.trim())&&(l.style.display="none")})},100)}}const I=new Ke,et=[{id:"heading1",label:"Título H1",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:{type:"image",attributes:{src:X("images/placeholder.svg"),alt:"Imagen"},classes:["max-w-full","h-auto","block"],activeOnRender:1}},{id:"unordered-list",label:"Lista no ordenada",category:"Básico",media:`<svg viewBox="0 0 32 32" width="32" height="32">
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
        </svg>`,content:'<div class="h-12 w-full"></div>'}],tt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,it=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="13" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,at=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="12" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="22" y="4" width="8" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,lt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="9" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="17" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="25" y="4" width="6" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,rt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="13" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,ot=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="17" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="21" y="4" width="9" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,nt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="14" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="23" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,st=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="11" y="4" width="7" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
    <rect x="20" y="4" width="10" height="24" fill="#003B71" rx="2" fill-opacity="0.5"/>
</svg>`,T='<div class="flex flex-col gap-4 py-1" style="min-height:60px;"></div>',W="<style>@media(max-width:768px){.col-grid{grid-template-columns:1fr !important;}}</style>",dt=[{id:"columns-1",label:"1 Columna",category:"Columnas",media:tt,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto flex flex-col gap-4 py-1" style="min-height:60px;">
    </div>
</div>
        `},{id:"columns-2",label:"2 Columnas",category:"Columnas",media:it,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid grid-cols-2 gap-6">
            ${T}
            ${T}
        </div>
    </div>
</div>
${W}
        `},{id:"columns-3",label:"3 Columnas",category:"Columnas",media:at,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid grid-cols-3 gap-6">
            ${T}
            ${T}
            ${T}
        </div>
    </div>
</div>
${W}
        `},{id:"columns-4",label:"4 Columnas",category:"Columnas",media:lt,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid grid-cols-4 gap-6">
            ${T}
            ${T}
            ${T}
            ${T}
        </div>
    </div>
</div>
${W}
        `},{id:"columns-1-3",label:"1/3 — 2/3",category:"Columnas",media:rt,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:1fr 2fr;">
            ${T}
            ${T}
        </div>
    </div>
</div>
${W}
        `},{id:"columns-3-1",label:"2/3 — 1/3",category:"Columnas",media:ot,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:2fr 1fr;">
            ${T}
            ${T}
        </div>
    </div>
</div>
${W}
        `},{id:"columns-1-2",label:"1/4 — 1/4 — 1/2",category:"Columnas",media:nt,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:1fr 1fr 2fr;">
            ${T}
            ${T}
            ${T}
        </div>
    </div>
</div>
${W}
        `},{id:"columns-2-1",label:"1/2 — 1/4 — 1/4",category:"Columnas",media:st,content:`
<div class="w-full py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="col-grid grid gap-6" style="grid-template-columns:2fr 1fr 1fr;">
            ${T}
            ${T}
            ${T}
        </div>
    </div>
</div>
${W}
        `}],ct=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,gt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="4" y="4" width="24" height="24" fill="#E97300" rx="2"/>
    <rect x="8" y="9" width="16" height="2" rx="1" fill="white" fill-opacity="0.9"/>
    <rect x="8" y="14" width="14" height="1.2" rx="0.6" fill="white" fill-opacity="0.6"/>
    <rect x="8" y="17" width="12" height="1.2" rx="0.6" fill="white" fill-opacity="0.6"/>
</svg>`,ht=`
<div class="flex flex-col gap-3 rounded-2xl p-5 text-center bg-[#E97300]">
    <h3 class="text-base font-bold text-white">Lorem ipsum</h3>
    <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
</div>`,pe=`
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
</style>`,ft=[{id:"about-section",label:"Sección Nosotros",category:"Contenido",media:ct,content:`
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
                    <img src="${X("images/placeholder.svg")}" alt="Imagen de sección">
                </div>
            </div>
        </div>
    </div>
</section>
${pe}`},{id:"about-mvv-card",label:"Tarjeta Misión/Visión/Valores",category:"Contenido",media:gt,content:`${ht}${pe}`}],pt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,mt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="none" stroke="#003B71" stroke-width="0.8" stroke-opacity="0.4" rx="2"/>
    <rect x="6" y="6" width="7" height="7" fill="#003B71" fill-opacity="0.12" rx="1.5"/>
    <rect x="6" y="16" width="14" height="1.5" rx="0.75" fill="#003B71" fill-opacity="0.6"/>
    <rect x="6" y="19" width="11" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.3"/>
    <rect x="6" y="22" width="20" height="4" rx="1.5" fill="#003B71" fill-opacity="0.5"/>
</svg>`,Q=`
<div class="flex flex-col gap-4 bg-white border-2 border-[#003B71] rounded-2xl p-5">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-[#dce8f5]">
        <i class="ri-bank-card-line text-2xl text-[#003B71]"></i>
    </div>
    <div class="flex flex-col gap-2 flex-1">
        <h3 class="text-base font-bold text-[#003B71]">Título del producto</h3>
        <p class="text-base text-[#003B71] leading-relaxed">Descripción breve del producto financiero disponible para ti.</p>
    </div>
    <a href="#" class="pc-btn w-full py-2 px-4 rounded-lg bg-[#003B71] text-white text-base font-semibold text-center">Solicitar</a>
</div>`,me=`
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
</style>`,ut=[{id:"product-cards-section",label:"Sección de productos",category:"Productos y Servicios",media:pt,content:`
<section class="w-full bg-white py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-[#003B71] mb-3">Créditos</h2>
            <p class="text-base text-[#003B71]">Opciones de financiamiento diseñadas para hacer realidad tus proyectos.</p>
        </div>
        <div class="pc-grid">
            ${Q}
            ${Q}
            ${Q}
            ${Q}
        </div>
    </div>
</section>
${me}`},{id:"product-card",label:"Tarjeta de producto",category:"Productos y Servicios",media:mt,content:`${Q}${me}`}],bt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,ue=`
<div class="flex flex-col gap-5 rounded-2xl p-8 dc-bg-primary">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
        <i class="ri-map-pin-line text-2xl text-white"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold text-white">Lorem ipsum dolor</h3>
        <p class="text-base text-white leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-outline w-full py-3 px-4 rounded-lg bg-white dc-text-primary text-base font-semibold text-center">Lorem ipsum</a>
</div>`,be=`
<div class="flex flex-col gap-5 rounded-2xl p-8 bg-white border border-gray-200">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center dc-bg-light">
        <i class="ri-bank-line text-2xl dc-text-primary"></i>
    </div>
    <div class="flex flex-col gap-3 flex-1">
        <h3 class="text-xl font-bold dc-text-primary">Lorem ipsum dolor</h3>
        <p class="text-base dc-text-primary leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </div>
    <a href="#" class="dc-btn-solid w-full py-3 px-4 rounded-lg dc-bg-primary text-white text-base font-semibold text-center">Lorem ipsum</a>
</div>`,se=`
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
</style>`,xt=[{id:"dual-card-section",label:"Sección dos tarjetas",category:"Productos y Servicios",media:bt,content:`
<section class="w-full bg-white py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-[#003B71] mb-3">Lorem ipsum dolor sit amet</h2>
            <p class="text-base text-[#003B71]">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="dc-grid">
            ${ue}
            ${be}
        </div>
    </div>
</section>
${se}`},{id:"dual-card-dark",label:"Tarjeta azul oscuro",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="#003B71" rx="2"/>
            <rect x="5" y="5" width="6" height="6" fill="rgba(255,255,255,0.2)" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="white" fill-opacity="0.9"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="white"/>
        </svg>`,content:`${ue}${se}`},{id:"dual-card-light",label:"Tarjeta blanca",category:"Productos y Servicios",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="28" fill="white" rx="2" stroke="#003B71" stroke-width="0.5" stroke-opacity="0.3"/>
            <rect x="5" y="5" width="6" height="6" fill="#dce8f5" rx="1.2"/>
            <rect x="5" y="13" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.8"/>
            <rect x="5" y="17" width="12" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="20" width="10" height="1.2" rx="0.6" fill="#003B71" fill-opacity="0.4"/>
            <rect x="5" y="24" width="22" height="3.5" rx="1" fill="#003B71"/>
        </svg>`,content:`${be}${se}`}],yt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="3" y="3" width="26" height="26" fill="white" rx="2" stroke="#e5e7eb" stroke-width="0.8"/>
    <rect x="8" y="7" width="16" height="2.5" rx="1.25" fill="#E97300" fill-opacity="0.9"/>
    <rect x="10" y="11" width="12" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="11" y="13.5" width="10" height="1.5" rx="0.75" fill="#E97300" fill-opacity="0.5"/>
    <rect x="6" y="18" width="9" height="5" rx="1.5" fill="#E97300"/>
    <rect x="17" y="18" width="9" height="5" rx="1.5" fill="white" stroke="#e5e7eb" stroke-width="0.8"/>
</svg>`,vt=`
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
</style>`,wt=[{id:"cta-section",label:"Llamada a la acción",category:"Contenido",media:yt,content:`
<section class="relative overflow-hidden w-full bg-white py-20 px-6">
    <div class="cta-watermark-left">
        <img src="${X("images/brand-logo.png")}" alt="">
    </div>
    <div class="cta-watermark-right">
        <img src="${X("images/brand-logo.png")}" alt="">
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
${vt}`}],Bt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,kt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</div>`,Et=`
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
</style>`,Ct=[{id:"icon-grid-hero",label:"Sección de características",category:"Productos y Servicios",media:Bt,content:`
<section class="relative overflow-hidden w-full bg-[#003B71] py-12 px-6">
    <div class="ig-watermark">
        <img src="${X("images/brand-watermark.png")}" alt="">
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
${Et}`},{id:"icon-card",label:"Tarjeta con icono",category:"Productos y Servicios",media:kt,content:`${Y}`}],$t=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="8" height="5" rx="1" fill="#003B71"/>
    <rect x="12" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="22" y="4" width="8" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="11" width="28" height="17" rx="2" fill="#003B71" fill-opacity="0.08" stroke="#003B71" stroke-width="1"/>
    <rect x="5" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="14" y="14" width="7" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="23" y="14" width="4" height="7" rx="1" fill="#003B71" fill-opacity="0.3"/>
</svg>`,ge=`
.tabs-btn{transition:background 0.2s,color 0.2s;}
.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}
.tabs-panel{display:none;}
.tabs-panel.active{display:grid;}
.tab-card:hover{background:#003B71;}
.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}
.tab-card:hover .tab-card-title{color:#ffffff;}
.tab-card:hover .tab-card-text{color:#ffffff;}`;function Lt(){return function(){const i=this,e=".tabs-btn{transition:background 0.2s,color 0.2s;}.tabs-btn.active,.tabs-btn:hover{background:#003B71 !important;color:#ffffff !important;}.tabs-panel{display:none;}.tabs-panel.active{display:grid;}.tab-card:hover{background:#003B71;}.tab-card:hover .tab-card-icon{color:#ffffff;border-color:rgba(255,255,255,0.6);}.tab-card:hover .tab-card-title{color:#ffffff;}.tab-card:hover .tab-card-text{color:#ffffff;}";(function(){const a=i.ownerDocument??document;if(!a.getElementById("tabs-section-styles")){const r=a.createElement("style");r.id="tabs-section-styles",r.textContent=e,a.head.appendChild(r)}})();function t(l){i.querySelectorAll(".tabs-btn").forEach((a,r)=>{a.classList.toggle("active",r===l)}),i.querySelectorAll(".tabs-panel").forEach((a,r)=>{a.classList.toggle("active",r===l)})}i.querySelectorAll(".tabs-btn").forEach((l,a)=>{l.addEventListener("click",()=>t(a))}),t(0)}}const q=()=>`
<div class="tab-card flex flex-col items-center text-center p-8 border-2 border-[#003B71] rounded-2xl gap-4 cursor-pointer transition-all duration-200">
    <div class="tab-card-icon w-14 h-14 rounded-full border-2 border-[#003B71] flex items-center justify-center text-2xl text-[#003B71] shrink-0 transition-all duration-200">
        <i class="ri-lightbulb-line"></i>
    </div>
    <h3 class="tab-card-title text-lg font-bold text-[#003B71] transition-colors duration-200">Lorem ipsum</h3>
    <p class="tab-card-text text-base font-normal leading-relaxed text-[#003B71] transition-colors duration-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
</div>`,J=i=>`
<div class="tabs-panel${i===0?" active":""} grid-cols-3 gap-5">
    ${q()}
    ${q()}
    ${q()}
    ${q()}
    ${q()}
    ${q()}
</div>`,St=`
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
        ${J(0)}
        ${J(1)}
        ${J(2)}
        ${J(3)}
        ${J(4)}
    </div>
</div>
<style>${ge}</style>`,jt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="28" rx="3" fill="none" stroke="#003B71" stroke-width="2"/>
    <circle cx="16" cy="10" r="4" fill="none" stroke="#003B71" stroke-width="1.5"/>
    <rect x="8" y="17" width="16" height="2" rx="1" fill="#003B71"/>
    <rect x="6" y="22" width="20" height="2" rx="1" fill="#003B71" fill-opacity="0.5"/>
</svg>`,zt=[{id:"tabs-cards",label:"Sección con tabs",category:"Contenido",media:$t,content:{type:"tabs-cards-component"}},{id:"tab-card-single",label:"Tarjeta de tab",category:"Contenido",media:jt,content:`${q()}`}];function Mt(i){const e="tabs-cards-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Sección con tabs",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,attributes:{"data-gjs-type":e,"data-tab-count":"5"},components:St,script:Lt(),traits:[{type:"number",name:"data-tab-count",label:"Número de tabs (2-10)",min:2,max:10,changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",(t,l)=>{const a=parseInt(l["data-tab-count"]);isNaN(a)||this.updateTabCount(a)})},updateTabCount(t){const l=Math.min(10,Math.max(2,t)),a=r=>{const h=Array.from({length:r},()=>'<button class="tabs-btn inline-block px-6 py-2 rounded-full border-2 border-[#003B71] bg-transparent text-[#003B71] text-sm font-medium">Lorem Ipsum</button>').join(`
`),d=Array.from({length:r},(g,p)=>`<div class="tabs-panel${p===0?" active":""} grid-cols-3 gap-5">
                            ${q()}
                            ${q()}
                            ${q()}
                            ${q()}
                            ${q()}
                            ${q()}
                        </div>`).join(`
`);return`
                    <div class="max-w-6xl mx-auto px-6 flex flex-col gap-8 py-16">
                        <div class="text-center flex flex-col gap-4 max-w-2xl mx-auto">
                            <h2 class="text-4xl font-bold leading-tight text-[#003B71]">Lorem ipsum dolor sit amet consectetur</h2>
                            <p class="text-base font-normal leading-relaxed text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <nav class="flex flex-wrap justify-center gap-2">${h}</nav>
                        <div class="tabs-body">${d}</div>
                    </div>
                    <style>${ge}</style>`};this.components(a(l)),setTimeout(()=>{const r=this.get("script"),h=this.getEl();r&&typeof r=="function"&&h&&r.call(h)},200)}}}),Ht(i,e),Tt(i,e)}function Ht(i,e){i.on("component:mount",t=>{const l=t.getEl();l?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(l)},300))}),i.on("component:clone",t=>{if(t.get("type")===e){const l=t.getEl();l&&setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(l)},300)}}),i.on("storage:end:load",()=>{setTimeout(()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const l=t.getEl();if(l?.isConnected){const a=t.get("script");a&&typeof a=="function"&&a.call(l)}})},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function Tt(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const l=t.contentDocument?.head;if(l){if(!l.querySelector("#tabs-section-styles")){const a=document.createElement("style");a.id="tabs-section-styles",a.textContent=ge,l.appendChild(a)}if(!l.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,l.appendChild(a)}}})}const It=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,At=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,_t=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Dt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,xe=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <circle cx="7" cy="10" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="8.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
    <circle cx="7" cy="22" r="4" fill="#E97300" fill-opacity="0.85"/>
    <rect x="14" y="20.5" width="14" height="2" rx="1" fill="#003B71" fill-opacity="0.7"/>
</svg>`,F=i=>{const e=i==="light";return`
<div class="sc-list-item flex items-center gap-4">
    <div class="bg-[#E97300] w-11 h-11 rounded-full flex items-center justify-center shrink-0">
        <i class="ri-shield-check-line text-xl ${e?"text-[#003B71]":"text-white"}"></i>
    </div>
    <p class="${e?"text-[#003B71]":"text-white"} text-base font-bold leading-snug">Lorem ipsum dolor sit amet consectetur</p>
</div>`},qt=i=>{const e=i==="light";return`
<div class="flex flex-col gap-4">
    <h2 class="${e?"text-[#003B71]":"text-white"} text-4xl font-bold leading-tight">Lorem ipsum dolor sit amet</h2>
    <p class="${e?"text-[#003B71]":"text-white"} text-base leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud.</p>
    <div class="flex flex-col gap-4">
        ${F(i)}
        ${F(i)}
        ${F(i)}
        ${F(i)}
    </div>
</div>`},Vt=()=>`
<div class="sc-img-col w-full rounded-2xl overflow-hidden">
    <img src="${X("images/placeholder.svg")}"
         alt="Imagen de sección"
         class="w-full h-full object-cover block"
         style="min-height:320px;">
</div>`,de=`
<style>
.sc-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;}
.sc-list-item{min-height:44px;}
@media(max-width:768px){
    .sc-grid{grid-template-columns:1fr;gap:2rem;}
    .sc-img-first{order:-1;}
}
</style>`,te=(i,e)=>{const t=qt(e),l=Vt();return`
<section class="w-full ${e==="dark"?"bg-[#003B71]":"bg-white"} py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="sc-grid">
            ${i?`<div>${t}</div><div class="sc-img-first">${l}</div>`:`<div class="sc-img-first">${l}</div><div>${t}</div>`}
        </div>
    </div>
</section>
${de}`},Pt=[{id:"split-content-light-img-right",label:"Contenido claro - imagen derecha",category:"Contenido",media:It,content:te(!0,"light")},{id:"split-content-light-img-left",label:"Contenido claro - imagen izquierda",category:"Contenido",media:At,content:te(!1,"light")},{id:"split-content-dark-img-right",label:"Contenido azul - imagen derecha",category:"Contenido",media:_t,content:te(!0,"dark")},{id:"split-content-dark-img-left",label:"Contenido azul - imagen izquierda",category:"Contenido",media:Dt,content:te(!1,"dark")},{id:"split-list-item",label:"Item de lista con badge",category:"Contenido",media:xe,content:`${F("light")}${de}`},{id:"split-list-group",label:"Lista con badges",category:"Contenido",media:xe,content:`
<div class="flex flex-col gap-4">
    ${F("light")}
    ${F("light")}
    ${F("light")}
</div>
${de}`}],Nt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="0" y="6" width="32" height="22" fill="#E97300"/>
    <rect x="0" y="6" width="10" height="22" fill="white"/>
    <path d="M10 6 Q10 6 16 6 L16 28 Q10 28 10 22 Z" fill="#E97300"/>
    <circle cx="22" cy="14" r="3" fill="white" fill-opacity="0.35"/>
    <circle cx="22" cy="14" r="1.5" fill="white"/>
    <rect x="18" y="20" width="8" height="1.5" rx="0.75" fill="white" fill-opacity="0.8"/>
    <rect x="19" y="22.5" width="6" height="1.2" rx="0.6" fill="white" fill-opacity="0.5"/>
</svg>`,Ot=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</div>`,Rt=`
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
</style>`,ye=i=>`
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
${Rt}`,Ut=[{id:"stats-strip-left",label:"Franja estadísticas - izquierda",category:"Heroes",media:Nt,content:ye(!0)},{id:"stats-strip-right",label:"Franja estadísticas - derecha",category:"Heroes",media:Ot,content:ye(!1)}],Ft=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`,Zt=`<svg viewBox="0 0 32 32" width="32" height="32">
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
    <a href="#" class="sc-btn w-full py-2 px-4 rounded-lg bg-[#003B71] text-white text-base font-semibold text-center mt-auto">Lorem ipsum</a>
</div>`,ve=`
<style>
.sc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.sc-btn{display:block;transition:background .2s,color .2s;}
.sc-btn:hover{background:#002a52!important;}
@media(max-width:768px){.sc-grid{grid-template-columns:1fr;}}
</style>`,Wt=[{id:"service-cards-section",label:"Sección de servicios",category:"Productos y Servicios",media:Ft,content:`
<section class="w-full bg-[#003B71] py-12 px-6">
    <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-white mb-3">Lorem ipsum dolor sit amet</h2>
            <p class="text-base text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="sc-grid">
            ${ae}
            ${ae}
            ${ae}
        </div>
    </div>
</section>
${ve}`},{id:"service-card",label:"Tarjeta de servicio",category:"Productos y Servicios",media:Zt,content:`${ae}${ve}`}],Yt=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="2" width="28" height="6" rx="1" fill="#003B71"/>
    <rect x="2" y="10" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.3"/>
    <rect x="2" y="17" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <rect x="2" y="24" width="28" height="5" rx="1" fill="#003B71" fill-opacity="0.15"/>
    <line x1="11" y1="2" x2="11" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
    <line x1="21" y1="2" x2="21" y2="29" stroke="#003B71" stroke-width="1" stroke-opacity="0.3"/>
</svg>`,re={blue:{headerBg:"bg-[#003B71]",headerText:"text-white",subheaderBg:"bg-[#e8f0f8]",subheaderText:"text-[#003B71]",borderColor:"#003B71",rowEvenBg:"bg-[#f4f7fb]",rowOddBg:"bg-white",rowText:"text-[#003B71]",labelBg:"bg-[#e8f0f8]",labelText:"text-[#003B71]"},orange:{headerBg:"bg-[#E97300]",headerText:"text-white",subheaderBg:"bg-[#fef3e8]",subheaderText:"text-[#E97300]",borderColor:"#E97300",rowEvenBg:"bg-[#fff8f2]",rowOddBg:"bg-white",rowText:"text-[#003B71]",labelBg:"bg-[#fef3e8]",labelText:"text-[#E97300]"}};function je(i,e){const t=re[e]||re.blue;let l='<table class="w-full border-collapse font-[Poppins,sans-serif] table-fixed">';i.title?(l+=`<thead><tr>
            <th colspan="${i.cols}" class="p-3 align-middle text-center text-base font-bold ${t.headerBg} ${t.headerText}">
                ${i.title}
            </th>
        </tr>`,i.headers?.length&&(l+="<tr>",i.headers.forEach((h,d)=>{const g=d<i.headers.length-1?`border-r border-[${t.borderColor}]`:"";l+=`<th class="p-3 align-middle text-sm font-semibold ${t.subheaderBg} ${t.subheaderText} ${g} border-b border-[${t.borderColor}] text-${h.align||"center"}">${h.text||""}</th>`}),l+="</tr>"),l+="</thead>"):i.headers?.length&&(l+="<thead><tr>",i.headers.forEach((h,d)=>{const g=d<i.headers.length-1?`border-r border-[${t.borderColor}]`:"";l+=`<th class="p-3 align-middle text-sm font-semibold ${t.headerBg} ${t.headerText} ${g} border-b border-[${t.borderColor}] text-${h.align||"center"}">${h.text||""}</th>`}),l+="</tr></thead>"),l+="<tbody>";const a=i.rows.length,r={};return i.rows.forEach((h,d)=>{l+="<tr>";let g=0;h.forEach(p=>{for(;r[`${d}-${g}`];)g++;const E=p.colspan||1,C=p.rowspan||1;for(let b=d;b<d+C;b++)for(let L=g;L<g+E;L++)(b!==d||L!==g)&&(r[`${b}-${L}`]=!0);const x=E>1?`colspan="${E}"`:"",n=C>1?`rowspan="${C}"`:"",c=p.isHeader?t.labelBg:d%2===0?t.rowEvenBg:t.rowOddBg,m=p.isHeader?"font-semibold":"font-normal",w=p.isHeader?t.labelText:t.rowText,y=`text-${p.align||"center"}`,u=d+C>=a,v=g+E>=i.cols?"":`border-r border-[${t.borderColor}]`,B=u?"":`border-b border-[${t.borderColor}]`,$=`${v} ${B} p-3 align-middle text-sm ${c} ${m} ${w} ${y}`;p.image?l+=`<td ${x} ${n} class="${$}">
                    <img src="${p.image}" alt="${p.text||""}" class="max-w-full max-h-20 h-auto object-contain block mx-auto">
                    ${p.text?`<span class="block mt-1 text-xs ${w}">${p.text}</span>`:""}
                </td>`:l+=`<td ${x} ${n} class="${$}">${p.text||""}</td>`,g+=E}),l+="</tr>"}),l+="</tbody></table>",l}function G(i,e){return{title:"Título de la tabla",cols:i,headers:Array.from({length:i},(t,l)=>({text:`Columna ${l+1}`,align:"center"})),rows:Array.from({length:e},()=>Array.from({length:i},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})))}}function ze(i,e){return`<div class="w-full overflow-x-auto rounded-2xl border-2 border-[${(re[e]||re.blue).borderColor}]">${i}</div>`}function we(i,e){const t={};return i.forEach((l,a)=>{let r=0;l.forEach(h=>{for(;t[`${a}-${r}`];)r++;const d=Math.min(h.colspan||1,e-r),g=h.rowspan||1;for(let p=a;p<a+g;p++)for(let E=r;E<r+d;E++)(p!==a||E!==r)&&(t[`${p}-${E}`]=`${a}-${r}`);r+=d})}),t}const Gt=`
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
.tam-img-selected-info{font-size:0.8rem;color:#6b7280;}`;function Xt(){if(document.getElementById("tam-img-modal"))return;const i=document.createElement("div");i.id="tam-img-modal",i.innerHTML=`
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
        </div>`,document.body.appendChild(i);let e=null,t=null;async function l(d=""){const g=document.getElementById("tam-img-grid");g.innerHTML='<div class="tam-img-loading"><div class="tam-img-spinner"></div><span>Cargando...</span></div>';try{const p=new URLSearchParams({type:"image",per_page:50});d&&p.append("search",d);const E=document.querySelector('meta[name="media-api-url"]')?.content??"/media/api",n=(await(await fetch(`${E}?${p}`,{headers:{"X-Requested-With":"XMLHttpRequest",Accept:"application/json"}})).json()).items||[];if(!n.length){g.innerHTML='<div class="tam-img-loading"><i class="ri-image-line" style="font-size:2rem;"></i><span>No se encontraron imágenes</span></div>';return}g.innerHTML="",n.forEach(c=>{const m=document.createElement("div");m.className="tam-img-card",m.innerHTML=`<img src="${c.url}" alt="${c.filename}"><p title="${c.filename}">${c.filename}</p>`,m.addEventListener("click",()=>{g.querySelectorAll(".tam-img-card").forEach(w=>w.classList.remove("selected")),m.classList.add("selected"),e=c.url,document.getElementById("tam-img-selected-info").textContent=`Seleccionada: ${c.filename}`,document.getElementById("tam-img-confirm").disabled=!1}),g.appendChild(m)})}catch{g.innerHTML='<div class="tam-img-loading"><i class="ri-error-warning-line" style="font-size:2rem;color:#f87171;"></i><span style="color:#dc2626;">Error al cargar imágenes</span></div>'}}function a(d){t=d,e=null,document.getElementById("tam-img-selected-info").textContent="Ninguna imagen seleccionada",document.getElementById("tam-img-confirm").disabled=!0,document.getElementById("tam-img-search-input").value="",i.classList.add("open"),l()}function r(){i.classList.remove("open"),e=null,t=null}document.getElementById("tam-img-close").addEventListener("click",r),document.getElementById("tam-img-cancel").addEventListener("click",r),document.getElementById("tam-img-confirm").addEventListener("click",()=>{e&&t&&(t(e),r())});let h;document.getElementById("tam-img-search-input").addEventListener("input",d=>{clearTimeout(h),h=setTimeout(()=>l(d.target.value),300)}),i.addEventListener("click",d=>{d.target===i&&r()}),window.__openTableImagePicker=a}function Qt(i,e){if(document.getElementById("table-admin-modal"))return;const t=document.createElement("style");t.id="table-admin-modal-styles",t.textContent=Gt,document.head.appendChild(t),Xt();const l=document.createElement("div");l.id="table-admin-modal",l.innerHTML=`
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
        </div>`,document.body.appendChild(l);let a=null,r=null;function h(x){a=x;const n=x.get("tableData");r=n?JSON.parse(JSON.stringify(n)):G(3,3);const c=r.cols||3;r.rows=r.rows.map((m,w)=>Array.from({length:c},(u,M)=>m[M]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})),document.getElementById("tam-title").value=r.title||"",document.getElementById("tam-theme").value=x.get("tableTheme")||"blue",document.getElementById("tam-cols").value=r.cols||3,document.getElementById("tam-rows").value=r.rows.length||3,E(),C(),l.classList.add("open"),document.body.style.overflow="hidden"}function d(){l.classList.remove("open"),document.body.style.overflow="",a=null}function g(){r.title=document.getElementById("tam-title").value.trim(),r.cols=parseInt(document.getElementById("tam-cols").value)||3,r.headers=Array.from(document.querySelectorAll(".tam-header-input")).map(n=>({text:n.value,align:n.closest("th")?.querySelector(".tam-align-select")?.value||"center"})),document.querySelectorAll("#tam-tbody td.tam-cell:not(.is-spanned)").forEach(n=>{const c=parseInt(n.dataset.row),m=parseInt(n.dataset.col);r.rows[c]?.[m]&&(r.rows[c][m].text=n.querySelector(".tam-cell-input")?.value||"",r.rows[c][m].align=n.querySelector(".tam-align-select")?.value||"center",r.rows[c][m].isHeader=n.dataset.isheader==="1",r.rows[c][m].image=n.dataset.image||null)});const x=we(r.rows,r.cols);r.rows=r.rows.map((n,c)=>n.filter((m,w)=>!x[`${c}-${w}`]))}function p(){if(l.querySelector("#tam-rebuild-notice"))return;const n=document.createElement("div");n.id="tam-rebuild-notice",n.style.cssText="background:#fef9c3;border:1.5px solid #ca8a04;border-radius:0.5rem;padding:0.5rem 1rem;font-size:0.8rem;color:#92400e;display:flex;align-items:center;gap:0.5rem;margin:0 1.5rem 0;flex-shrink:0;",n.innerHTML='<i class="ri-error-warning-line"></i> Has modificado el colspan/rowspan. Haz clic en <strong style="margin:0 4px;">Reconstruir</strong> para aplicar los cambios de fusión.',l.querySelector(".tam-toolbar").after(n)}function E(){l.querySelector("#tam-rebuild-notice")?.remove()}function C(){const x=document.getElementById("tam-thead"),n=document.getElementById("tam-tbody"),c=r.cols,m=r.rows.length,w=we(r.rows,c);x.innerHTML=`<tr>${r.headers.map((y,u)=>`
            <th>
                <input class="tam-cell-input tam-header-input" value="${y.text||""}" placeholder="Col ${u+1}" style="font-weight:600;">
                <select class="tam-align-select" style="margin-top:4px;width:100%;font-size:0.7rem;padding:2px;">
                    <option value="left" ${y.align==="left"?"selected":""}>Izquierda</option>
                    <option value="center" ${y.align==="center"?"selected":""}>Centro</option>
                    <option value="right" ${y.align==="right"?"selected":""}>Derecha</option>
                </select>
            </th>`).join("")}</tr>`,n.innerHTML=r.rows.map((y,u)=>`<tr>${Array.from({length:c},(v,B)=>{const $=w[`${u}-${B}`];if($)return`<td class="tam-cell is-spanned" data-row="${u}" data-col="${B}">
                        <div class="tam-spanned-label">Combinada con [${$}]</div>
                    </td>`;const b=y[B]||{text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null},L=b.colspan||1,H=b.rowspan||1,z=L>1||H>1;return`<td class="tam-cell ${b.isHeader?"is-header-cell":""} ${b.image?"has-image":""} ${z?"has-span":""}"
                    data-row="${u}" data-col="${B}"
                    data-isheader="${b.isHeader?"1":"0"}"
                    data-colspan="${L}"
                    data-rowspan="${H}"
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
                            data-action="header" data-row="${u}" data-col="${B}">
                            ${b.isHeader?"✓ Etiqueta":"Etiqueta"}
                        </button>
                        <button type="button" class="tam-cell-btn tam-cell-btn-img"
                            data-action="image" data-row="${u}" data-col="${B}">
                            <i class="ri-image-line"></i> ${b.image?"Cambiar":"Imagen"}
                        </button>
                        ${b.image?`<button type="button" class="tam-cell-btn tam-cell-btn-clear" data-action="clear-image" data-row="${u}" data-col="${B}">✕ Quitar</button>`:""}
                        <div class="tam-cell-span-group">
                            <label title="Columnas que ocupa">CS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${c-B}"
                                value="${L}" data-action="colspan" data-row="${u}" data-col="${B}">
                            <label title="Filas que ocupa">RS</label>
                            <input type="number" class="tam-cell-span-input" min="1" max="${m-u}"
                                value="${H}" data-action="rowspan" data-row="${u}" data-col="${B}">
                        </div>
                    </div>
                </td>`}).join("")}</tr>`).join(""),n.querySelectorAll("input[data-action=colspan], input[data-action=rowspan]").forEach(y=>{y.addEventListener("change",()=>{const u=parseInt(y.dataset.row),M=parseInt(y.dataset.col),v=Math.max(1,parseInt(y.value)||1);r.rows[u]?.[M]&&(y.dataset.action==="colspan"?r.rows[u][M].colspan=Math.min(v,c-M):r.rows[u][M].rowspan=Math.min(v,m-u),p())})}),n.querySelectorAll("button[data-action]").forEach(y=>{y.addEventListener("click",u=>{u.preventDefault(),u.stopPropagation();const M=y.dataset.action,v=parseInt(y.dataset.row),B=parseInt(y.dataset.col);if(!(isNaN(v)||isNaN(B)||!r.rows[v]?.[B])){if(M==="header"){r.rows[v][B].isHeader=!r.rows[v][B].isHeader;const $=n.querySelector(`td[data-row="${v}"][data-col="${B}"]`);$&&($.dataset.isheader=r.rows[v][B].isHeader?"1":"0",$.classList.toggle("is-header-cell",r.rows[v][B].isHeader)),y.classList.toggle("active",r.rows[v][B].isHeader),y.textContent=r.rows[v][B].isHeader?"✓ Etiqueta":"Etiqueta";return}if(M==="image"){window.__openTableImagePicker&&window.__openTableImagePicker($=>{r.rows[v][B].image=$;const b=n.querySelector(`td[data-row="${v}"][data-col="${B}"]`);if(b){b.dataset.image=$,b.classList.add("has-image");let L=b.querySelector(".tam-cell-img-preview");L||(L=document.createElement("img"),L.className="tam-cell-img-preview",b.insertBefore(L,b.firstChild)),L.src=$;const H=b.querySelector("[data-action=image]");if(H&&(H.innerHTML='<i class="ri-image-line"></i> Cambiar'),!b.querySelector("[data-action=clear-image]")){const z=document.createElement("button");z.type="button",z.className="tam-cell-btn tam-cell-btn-clear",z.dataset.action="clear-image",z.dataset.row=v,z.dataset.col=B,z.textContent="✕ Quitar",z.addEventListener("click",V=>{V.preventDefault(),V.stopPropagation(),r.rows[v][B].image=null,b.dataset.image="",b.classList.remove("has-image"),L.remove(),z.remove();const D=b.querySelector("[data-action=image]");D&&(D.innerHTML='<i class="ri-image-line"></i> Imagen')}),b.querySelector(".tam-cell-actions").appendChild(z)}}});return}M==="clear-image"&&(r.rows[v][B].image=null,C())}})})}document.getElementById("tam-close").addEventListener("click",d),document.getElementById("tam-cancel").addEventListener("click",d),l.addEventListener("click",x=>{x.target===l&&d()}),document.getElementById("tam-rebuild").addEventListener("click",()=>{const x=parseInt(document.getElementById("tam-cols").value)||3,n=parseInt(document.getElementById("tam-rows").value)||3;for(E(),g();r.headers.length<x;)r.headers.push({text:`Col ${r.headers.length+1}`,align:"center"});for(r.headers=r.headers.slice(0,x),r.cols=x;r.rows.length<n;)r.rows.push(Array.from({length:x},()=>({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null})));r.rows=r.rows.slice(0,n).map(c=>{for(;c.length<x;)c.push({text:"",align:"center",isHeader:!1,colspan:1,rowspan:1,image:null});return c.slice(0,x)}),C()}),document.getElementById("tam-apply").addEventListener("click",()=>{g();const x=document.getElementById("tam-theme").value;a&&(a.set("tableData",JSON.parse(JSON.stringify(r))),a.set("tableTheme",x),a.addAttributes({"data-table-theme":x}),ce(a)),d()}),window.__openTableAdminModal=h}function ce(i){const e=i.get("tableData"),t=i.get("tableTheme")||"blue";e&&i.components(ze(je(e,t),t))}function Jt(){return function(){}}const Kt=[{id:"table-blue",label:"Tabla azul",category:"Interactivos",media:Yt,content:{type:"table-component",attributes:{"data-table-theme":"blue"}}},{id:"table-orange",label:"Tabla naranja",category:"Interactivos",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
            <rect x="2" y="2" width="28" height="6" rx="1" fill="#E97300"/>
            <rect x="2" y="10" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.3"/>
            <rect x="2" y="17" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
            <rect x="2" y="24" width="28" height="5" rx="1" fill="#E97300" fill-opacity="0.15"/>
        </svg>`,content:{type:"table-component",attributes:{"data-table-theme":"orange"}}}];function ei(i){const e="table-component";Qt(),i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Tabla",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!0,removable:!0,propagate:["editable","selectable","hoverable","droppable","highlightable"],tableData:null,tableTheme:"blue",attributes:{"data-gjs-type":e,"data-table-theme":"blue"},components:ze(je(G(3,3),"blue"),"blue"),script:Jt(),traits:[{type:"button",name:"edit-table",label:"Editar tabla",text:"Abrir editor de tabla",command(t){const l=t.getSelected();l&&window.__openTableAdminModal&&(l.get("tableData")||l.set("tableData",G(3,3)),window.__openTableAdminModal(l))}},{type:"select",name:"data-table-theme",label:"Color del tema",options:[{id:"blue",name:"Azul"},{id:"orange",name:"Naranja"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e});const t=this.getAttributes()["data-table-theme"]||"blue";this.set("tableTheme",t),this.get("tableData")||(this.set("tableData",G(3,3)),ce(this)),this.on("change:attributes",(l,a)=>{const r=a["data-table-theme"];r&&r!==this.get("tableTheme")&&(this.set("tableTheme",r),ce(this))})}}}),ti(i,e),ii(i,e)}function ti(i,e){i.on("component:mount",t=>{const l=t.getEl();if(l?.getAttribute?.("data-gjs-type")===e){t.set("type",e);const a=l.getAttribute("data-table-theme")||"blue";t.set("tableTheme",a),t.get("tableData")||t.set("tableData",G(3,3))}}),i.on("storage:end:load",()=>{setTimeout(()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const l=t.getAttributes()["data-table-theme"]||"blue";t.set("tableTheme",l),t.get("tableData")||t.set("tableData",G(3,3))})},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function ii(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const l=t.contentDocument?.head;if(l&&!l.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(0,59,113,0.5) !important;
                    outline-offset: 2px;
                }
            `,l.appendChild(a)}})}const ai=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#003B71"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#003B71"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#003B71" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,li=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="6" y="8" width="16" height="16" rx="4" fill="#E97300"/>
    <rect x="27" y="10" width="28" height="4" rx="2" fill="#E97300"/>
    <rect x="27" y="18" width="20" height="2.5" rx="1.2" fill="#E97300" fill-opacity="0.4"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,ri=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#003B71"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#003B71" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#003B71" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,oi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="2" y="4" width="76" height="24" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="10" y="12" width="44" height="4" rx="2" fill="#E97300"/>
    <rect x="62" y="10" width="12" height="12" rx="3" fill="#E97300" fill-opacity="0.15"/>
    <path d="M68 13v5m0 0l-2-2m2 2l2-2" stroke="#E97300" stroke-width="1.5" stroke-linecap="round"/>
</svg>`,ni=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#003B71"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,si=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#E97300"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.85)"/>
</svg>`,di=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,ci=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,gi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="#ffffff"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="#003B71" fill-opacity="0.5"/>
</svg>`,hi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="8" y="6" width="64" height="20" rx="10" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="18" y="13" width="44" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,Be=i=>{const e=i==="#003B71"?"blue":"orange";return`
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
</div>`},ke=i=>{const e=i==="#003B71"?"blue":"orange";return`
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
</div>`},Ee={"button-fill-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-[#003B71] text-white transition-all duration-200 hover:bg-[#002a52] hover:border-[#002a52]","button-fill-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-[#E97300] text-white transition-all duration-200 hover:bg-[#c96200] hover:border-[#c96200]","button-outline-blue":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#003B71] bg-transparent text-[#003B71] transition-all duration-200 hover:bg-[#003B71] hover:text-white","button-outline-orange":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-[#E97300] bg-transparent text-[#E97300] transition-all duration-200 hover:bg-[#E97300] hover:text-white","button-fill-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-white text-[#003B71] transition-all duration-200 hover:bg-[#dce8f5] hover:border-[#dce8f5]","button-outline-white":"inline-block px-8 py-3 rounded-full text-base font-semibold leading-snug no-underline whitespace-nowrap border-2 border-white bg-transparent text-white transition-all duration-200 hover:bg-white hover:text-[#003B71]"},fi=[{id:"button-fill-blue",label:"Botón azul sólido",category:"Botones",media:ni,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-blue"}}},{id:"button-fill-orange",label:"Botón naranja sólido",category:"Botones",media:si,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-orange"}}},{id:"button-outline-blue",label:"Botón azul outline",category:"Botones",media:di,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-blue"}}},{id:"button-outline-orange",label:"Botón naranja outline",category:"Botones",media:ci,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-orange"}}},{id:"button-fill-white",label:"Botón blanco sólido",category:"Botones",media:gi,content:{type:"integral-button",attributes:{"data-btn-variant":"button-fill-white"}}},{id:"button-outline-white",label:"Botón blanco outline",category:"Botones",media:hi,content:{type:"integral-button",attributes:{"data-btn-variant":"button-outline-white"}}},{id:"button-download-full-blue",label:"Descarga completa azul",category:"Botones",media:ai,content:Be("#003B71")},{id:"button-download-full-orange",label:"Descarga completa naranja",category:"Botones",media:li,content:Be("#E97300")},{id:"button-download-simple-blue",label:"Descarga simple azul",category:"Botones",media:ri,content:ke("#003B71")},{id:"button-download-simple-orange",label:"Descarga simple naranja",category:"Botones",media:oi,content:ke("#E97300")}];function pi(i){const e=[{type:"button",label:"Documento",name:"select-document",text:"Seleccionar documento",full:!0,command:"open-document-picker"},{type:"text",name:"href",label:"URL / Enlace",placeholder:"https://..."},{type:"select",name:"target",label:"Abrir en",options:[{id:"_self",name:"Misma ventana"},{id:"_blank",name:"Nueva ventana"}]}];i.DomComponents.addType("link",{model:{defaults:{traits:e}}}),i.DomComponents.addType("integral-button",{isComponent:a=>a.tagName==="A"&&a.hasAttribute("data-btn-variant"),model:{defaults:{tagName:"a",draggable:!0,droppable:!1,editable:!0,attributes:{href:"#",target:"_self","data-btn-variant":"button-fill-blue"},components:"Texto del botón",traits:e},init(){const a=this.getAttributes()["data-btn-variant"]??"button-fill-blue",r=Ee[a]??Ee["button-fill-blue"];this.setClass(r.split(" "))}}});function t(a,r){if(a.getEl()?.matches?.(r))return a;let d=null;const g=a.components?.();return g?(g.each(p=>{d||(d=t(p,r))}),d):null}function l(a,r){const d={pdf:"ri-file-pdf-line",xlsx:"ri-file-excel-line",xls:"ri-file-excel-line",doc:"ri-file-word-line",docx:"ri-file-word-line"}[r]??"ri-file-line";function g(E){const C=E.getEl?.();if(C?.tagName==="I"){const c=C.parentElement;if(c&&[...c.classList].some(m=>m.includes("-icon")))return E}let x=null;const n=E.components?.();return n?(n.each(c=>{x||(x=g(c))}),x):null}const p=g(a);if(p){const E=p.getClasses().find(C=>C.startsWith("ri-"));E&&p.removeClass(E),p.addClass(d)}else{const C=a.getEl()?.querySelector("[class*='-icon'] i");if(C){const x=[...C.classList].filter(n=>!n.startsWith("ri-"));C.className=[...x,d].join(" ")}}}i.Commands.add("open-document-picker",{run(a){const r=a.getSelected();if(r){if(a._documentPicker)try{a._documentPicker.destroy()}catch{}a._documentPicker=new Ie,a._documentPicker.open(h=>{const d=h.filename.split(".").pop().toLowerCase();r.addAttributes({href:h.url});const g=r.getTrait("href");g&&g.set("value",h.url);const p=t(r,"[class*='-filename']");p&&p.components(h.filename),l(r,d)},{filters:{type:"document"}})}}})}const mi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#003B71" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#003B71" fill-opacity="0.7"/>
</svg>`,ui=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#E97300" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="#E97300" fill-opacity="0.7"/>
</svg>`,bi=`<svg viewBox="0 0 80 32" width="80" height="32">
    <rect width="80" height="32" fill="#003B71" rx="2"/>
    <rect x="16" y="8" width="48" height="16" rx="8" fill="none" stroke="#ffffff" stroke-width="2"/>
    <rect x="24" y="13" width="32" height="6" rx="3" fill="rgba(255,255,255,0.7)"/>
</svg>`,xi=[{id:"badge-outline-blue",label:"Badge azul outline",category:"Badges",media:mi,content:'<span class="inline-block border border-[#003B71] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#003B71]">Etiqueta</span>'},{id:"badge-outline-orange",label:"Badge naranja outline",category:"Badges",media:ui,content:'<span class="inline-block border border-[#E97300] rounded-full px-4 py-1 text-base font-medium bg-transparent text-[#E97300]">Etiqueta</span>'},{id:"badge-outline-white",label:"Badge blanco outline",category:"Badges",media:bi,content:'<span class="inline-block border border-white rounded-full px-4 py-1 text-base font-medium bg-transparent text-white">Etiqueta</span>'}],yi=`<svg viewBox="0 0 32 32" width="32" height="32">
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
</svg>`;function vi(){return function(){const i=this,e="agencies-map-component",t="/api/agencies/active",l="agencies";let a=[],r=[],h={},d=null,g=[];const p=async()=>{try{E(),await x(),await m(),w(),$(),z(),V(),C()}catch(o){console.error("Error initializing map:",o),R("Error al cargar las agencias"),C()}};function E(){const o=i.querySelector(`.${e}-list`);o&&(o.innerHTML=`
                    <div class="flex flex-col items-center justify-center p-12 space-y-4">
                        <div class="relative w-16 h-16">
                            <div class="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                            <div class="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-white rounded-full animate-spin"></div>
                        </div>
                        <p class="text-white font-medium">Cargando agencias...</p>
                    </div>
                `);const s=i.querySelector(`.${e}-map-container`);s&&(s.style.opacity="0.5")}function C(){const o=i.querySelector(`.${e}-map-container`);o&&(o.style.transition="opacity 0.3s ease",o.style.opacity="1")}async function x(){try{const s=await(await fetch(t)).json(),f=l?s[l]:s;Array.isArray(f)?(a=f.filter(k=>k.latitude&&k.longitude&&!isNaN(k.latitude)&&!isNaN(k.longitude)),r=[...a],n()):(a=[],r=[])}catch(o){console.error("Error loading items:",o),a=[],r=[]}}function n(){const o=[...new Set(a.map(f=>f.zone).filter(Boolean))].sort(),s=[...new Set(a.map(f=>f.department).filter(Boolean))].sort();h={zone:o,department:s},setTimeout(()=>{const f=i.querySelector(`.${e}-filters-container`);f&&!f.hasChildNodes()&&(f.innerHTML=`
                        <select class="${e}-zone-filter flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                            <option value="">Todas las Zonas</option>
                        </select>
                        <select class="${e}-department-filter flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200">
                            <option value="">Todos los Departamentos</option>
                        </select>
                    `,c())},100)}function c(){const o=i.querySelector(`.${e}-zone-filter`),s=i.querySelector(`.${e}-department-filter`);o&&h.zone&&h.zone.forEach(f=>{const k=document.createElement("option");k.value=f,k.textContent=f,o.appendChild(k)}),s&&h.department&&h.department.forEach(f=>{const k=document.createElement("option");k.value=f,k.textContent=f,s.appendChild(k)})}async function m(){if(!document.getElementById("leaflet-css")){const o=document.createElement("link");o.id="leaflet-css",o.rel="stylesheet",o.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",document.head.appendChild(o)}if(typeof window.L>"u"&&await new Promise((o,s)=>{const f=document.createElement("script");f.src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",f.onload=o,f.onerror=s,document.head.appendChild(f)}),typeof window.L<"u"&&window.L.Icon&&window.L.Icon.Default){const o=window.L.icon({iconUrl:"data:image/svg+xml;base64,"+btoa(`
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
                            <path fill="#f0872a" d="M12 0C7.6 0 4 3.6 4 8c0 5.4 8 16 8 16s8-10.6 8-16c0-4.4-3.6-8-8-8z"/>
                            <circle cx="12" cy="8" r="3" fill="#fff"/>
                        </svg>
                    `),iconSize:[30,45],iconAnchor:[15,45],popupAnchor:[0,-45]});window.customOrangeIcon=o}}function w(){const o=i.querySelector(`.${e}-map`);if(!o||!window.L)return;o._leaflet_id&&o._map&&(o._map.remove(),delete o._map),d=window.L.map(o).setView([13.7942,-88.8965],8),window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(d),o._map=d,d.whenReady(function(){y(),setTimeout(()=>{d&&d.invalidateSize&&d.invalidateSize()},300)})}function y(){u(),M(),B()}function u(){g.forEach(o=>{o.marker&&d.removeLayer(o.marker)}),g=[]}function M(){r.forEach((o,s)=>{if(o.latitude&&o.longitude){const f=v(o),k=window.L.marker([o.latitude,o.longitude],{icon:window.customOrangeIcon||new window.L.Icon.Default}).addTo(d).bindPopup(f);g.push({marker:k,item:o,index:s})}})}function v(o){let s=`<div style="min-width: 200px;"><h4 style="font-weight: 700; margin-bottom: 12px; color: #0d3f6a; font-size: 16px; border-bottom: 2px solid #f0872a; padding-bottom: 8px;">${o.name}</h4>`;if(o.address&&(s+=`<p style="margin: 8px 0 0 0; font-size: 14px; display: flex; align-items: start; gap: 8px;"><i class="ri-map-pin-line" style="color: #f0872a; font-size: 16px; margin-top: 2px;"></i><span style="color: #4b5563;">${o.address}</span></p>`),o.municipality||o.department){const f=[o.municipality,o.department].filter(Boolean).join(", ");s+=`<p style="margin: 0 0 8px 0; font-size: 13px; color: #6b7280; padding-left: 24px;">${f}</p>`}return o.schedule&&(s+=`<p style="margin: 8px 0; font-size: 14px; display: flex; align-items: start; gap: 8px;"><i class="ri-time-line" style="color: #f0872a; font-size: 16px; margin-top: 2px;"></i><span style="color: #4b5563;">${o.schedule}</span></p>`),s+="</div>",s}function B(){if(r.length>0){const o=r.filter(s=>s.latitude&&s.longitude).map(s=>[s.latitude,s.longitude]);o.length>1?d.once("moveend",function(){setTimeout(()=>{try{d&&d._loaded&&typeof d.fitBounds=="function"&&d.fitBounds(o,{padding:[50,50],maxZoom:12,animate:!1})}catch(s){console.warn("Error fitting bounds:",s)}},100)}):o.length===1&&d.setView(o[0],14)}}function $(){const o=i.querySelector(`.${e}-list`);if(!o)return;if(r.length===0){L(o);return}const s=r.map((f,k)=>b(f,k)).join("");o.innerHTML=s,H()}function b(o,s){const f=o.phones&&o.phones.length>0?o.phones.map(j=>`
                        <p class="text-gray-200 flex items-center gap-2 mt-2">
                            <i class="ri-phone-line text-primary text-lg"></i>
                            <a href="tel:${j.replace(/\s+/g,"")}" class="agency-phone-link text-white font-medium hover:underline">${j}</a>
                        </p>
                    `).join(""):"",k=`https://www.google.com/maps/search/?api=1&query=${o.latitude},${o.longitude}`;return`
                <div class="${e}-item p-5 bg-white/10 border border-white/20 rounded-2xl cursor-pointer transition-all duration-200" data-item-index="${s}">
                    <h3 class="agency-title text-lg font-bold text-white mb-3">${o.name}</h3>
                    ${o.address?`<p class="text-gray-200 flex items-start gap-2 mt-2"><i class="ri-map-pin-line text-primary text-lg mt-0.5"></i><span class="flex-1">${o.address}</span></p>`:""}
                    ${o.municipality||o.department?`<p class="text-sm text-gray-300 mt-1 ml-6">${[o.municipality,o.department].filter(Boolean).join(", ")}</p>`:""}
                    ${o.schedule?`<p class="text-gray-200 flex items-start gap-2 mt-2"><i class="ri-time-line text-primary text-lg mt-0.5"></i><span class="flex-1">${o.schedule}</span></p>`:""}
                    ${f}
                    <div class="mt-3">
                        <a href="${k}" target="_blank" rel="noopener noreferrer" class="agency-maps-btn block w-full text-center px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-200" onclick="event.stopPropagation();">
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
            `}function H(){const o=i.querySelectorAll(`.${e}-item`);o.forEach(s=>{s.addEventListener("click",f=>{if(f.target.closest(".agency-maps-btn"))return;f.preventDefault();const k=parseInt(s.dataset.itemIndex),j=r[k];if(!j)return;o.forEach(S=>{S.classList.remove("bg-white","border-secondary","selected-agency"),S.classList.add("bg-white/10","border-white/20");const A=S.querySelector(".agency-title"),K=S.querySelectorAll("i"),ee=S.querySelectorAll(".agency-phone-link"),oe=S.querySelectorAll("p:not(:has(.agency-phone-link))"),ne=S.querySelector(".agency-maps-btn");A&&(A.classList.remove("text-secondary"),A.classList.add("text-white")),K.forEach(U=>{U.classList.remove("text-secondary","text-gray-300","text-white"),U.classList.add("text-primary")}),ee.forEach(U=>{U.classList.remove("text-secondary"),U.classList.add("text-white")}),oe.forEach(U=>{U.classList.remove("text-secondary"),U.classList.add("text-gray-200")}),ne&&(ne.classList.remove("bg-secondary"),ne.classList.add("bg-primary"))}),s.classList.remove("bg-white/10","border-white/20"),s.classList.add("bg-white","border-secondary","selected-agency");const _=s.querySelector(".agency-title"),N=s.querySelectorAll("i"),Z=s.querySelectorAll(".agency-phone-link"),O=s.querySelectorAll("p:not(:has(.agency-phone-link))"),P=s.querySelector(".agency-maps-btn");if(_&&(_.classList.remove("text-white"),_.classList.add("text-secondary")),N.forEach(S=>{S.classList.remove("text-secondary","text-gray-300","text-white"),S.classList.add("text-primary")}),Z.forEach(S=>{S.classList.remove("text-white"),S.classList.add("text-secondary")}),O.forEach(S=>{S.classList.remove("text-gray-200"),S.classList.add("text-secondary")}),P&&(P.classList.remove("bg-primary"),P.classList.add("bg-secondary")),d&&j&&d._loaded)try{d.flyTo([j.latitude,j.longitude],14,{animate:!0,duration:1});const S=g.find(A=>A.item.id===j.id);S&&S.marker&&S.marker.openPopup()}catch(S){console.warn("Error updating map view:",S)}})})}function z(){const o=i.querySelector(`.${e}-search-input`),s=i.querySelector(`.${e}-zone-filter`),f=i.querySelector(`.${e}-department-filter`),k=i.querySelector(`.${e}-no-results`),j={Occidental:["Ahuachapán","Santa Ana","Sonsonate"],Paracentral:["Chalatenango","Cuscatlán","La Paz","Cabañas","San Vicente"],Central:["La Libertad","San Salvador"],Oriental:["Usulután","San Miguel","Morazán","La Unión"]},_=()=>{if(!s||!f)return;const Z=s.value,O=f.value;if(!Z)f.innerHTML='<option value="">Todos los Departamentos</option>',[...new Set(a.map(S=>S.department).filter(Boolean))].sort().forEach(S=>{const A=document.createElement("option");A.value=S,A.textContent=S,f.appendChild(A)}),O&&(f.value=O);else{const P=j[Z]||[];f.innerHTML='<option value="">Todos los Departamentos</option>',P.forEach(S=>{const A=document.createElement("option");A.value=S,A.textContent=S,f.appendChild(A)}),P.includes(O)&&(f.value=O)}},N=()=>{const Z=o?o.value.toLowerCase().trim():"",O=s?s.value:"",P=f?f.value:"";r=a.filter(S=>{let A=!0,K=!0,ee=!0;return Z&&(A=Object.values(S).some(oe=>String(oe).toLowerCase().includes(Z))),O&&(K=S.zone===O),P&&(ee=S.department===P),A&&K&&ee}),$(),y(),k&&k.classList.toggle("hidden",r.length>0)};o&&o.addEventListener("input",N),s&&s.addEventListener("change",()=>{_(),N()}),f&&f.addEventListener("change",N)}function V(){const o=i.querySelector("[data-title]");if(o){const k=D("map-title")||"Nuestras Agencias";o.textContent=k}const s=i.querySelector(`.${e}-search-input`);if(s){const k=D("search-placeholder")||"Buscar...";s.setAttribute("placeholder",k)}const f=i.querySelector(`.${e}-no-results`);if(f){const k=D("no-results-text")||"No se encontraron agencias";f.textContent=k}}function D(o){return i.closest(`[data-gjs-type="${e}"]`)?.getAttribute(o)}function R(o){const s=i.querySelector(`.${e}-list`);s&&(s.innerHTML=`
                    <div class="flex flex-col items-center justify-center p-12 text-center">
                        <div class="w-20 h-20 mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                            <i class="ri-error-warning-line text-4xl text-red-300"></i>
                        </div>
                        <p class="text-white font-medium text-lg">${o}</p>
                        <p class="text-gray-300 text-sm mt-2">Por favor, intenta nuevamente más tarde</p>
                    </div>
                `)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",p):p()}}const wi=[{id:"agencies-map",label:"Mapa de Agencias",category:"Interactivos",media:yi,content:{type:"agencies-map-component"}}];function Bi(i){const e="agencies-map-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute&&t.getAttribute("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Mapa de Agencias",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{class:"py-12 bg-secondary","data-gjs-type":e},components:`
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
                `,script:vi()},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e})}}}),ki(i,e),Ei(i,e)}function ki(i,e){i.on("component:selected",t=>{if(t.get("type")===e){const l=t.getEl();if(l){const a=l.querySelector(`.${e}-map`);a&&a._map&&setTimeout(()=>{a._map.invalidateSize()},100)}}}),i.on("storage:end:load",()=>{setTimeout(()=>{Ce(i,e)},1e3)}),i.on("component:mount",t=>{const l=t.getEl();l&&l.getAttribute&&l.getAttribute("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&l&&a.call(l)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const l=t.getEl();if(l){const a=l.querySelector(`.${e}-map`);a&&a._map&&(a._map.remove(),delete a._map),setTimeout(()=>{const r=t.get("script");r&&typeof r=="function"&&r.call(l)},500)}}}),i.on("canvas:render",()=>{setTimeout(()=>{Ce(i,e)},800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(a=>{a.set("type",e),a.addAttributes({"data-gjs-type":e})})})}function Ce(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(a=>{a.set("type",e);const r=a.getEl();if(r&&r.isConnected){const h=a.get("script");h&&typeof h=="function"&&h.call(r)}})}function Ei(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const l=t.contentDocument.head;if(!l.querySelector("#leaflet-css")){const a=document.createElement("link");a.id="leaflet-css",a.rel="stylesheet",a.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",l.appendChild(a)}if(!l.querySelector(`#${e}-css`)){const a=document.createElement("style");a.id=`${e}-css`,a.innerHTML=`
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
            `,l.appendChild(a)}})}const Ci=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <circle cx="23" cy="14" r="5" fill="#E97300"/>
    <circle cx="23" cy="14" r="4" fill="#f8e7d8"/>
</svg>`,$i=`
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
}`;function Li(){return function(){const i=this,e=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",t={"fill-blue":{bg:"#003B71",color:"#ffffff",border:"#003B71",hoverBg:"#002a52",hoverColor:"#ffffff"},"outline-blue":{bg:"transparent",color:"#003B71",border:"#003B71",hoverBg:"#003B71",hoverColor:"#ffffff"},"fill-orange":{bg:"#E97300",color:"#ffffff",border:"#E97300",hoverBg:"#c96200",hoverColor:"#ffffff"},"outline-orange":{bg:"transparent",color:"#E97300",border:"#E97300",hoverBg:"#E97300",hoverColor:"#ffffff"},"fill-white":{bg:"#ffffff",color:"#003B71",border:"#ffffff",hoverBg:"#dce8f5",hoverColor:"#003B71"},"outline-white":{bg:"transparent",color:"#ffffff",border:"#ffffff",hoverBg:"#ffffff",hoverColor:"#003B71"}},l=".banner-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.banner-slide-container{position:relative;width:100%;user-select:none;cursor:grab;}.banner-slide-container:active{cursor:grabbing;}.banner-slide-container{display:grid;}.banner-slide{grid-area:1/1;opacity:0;pointer-events:none;transition:opacity 0.7s ease;visibility:hidden;display:flex;flex-direction:column;}.banner-slide.banner-slide--active{opacity:1;pointer-events:auto;visibility:visible;}.banner-slide-inner{position:relative;width:100%;flex:1;min-height:480px;display:flex;align-items:center;}.banner-bg{position:absolute;inset:0;z-index:0;}.banner-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.banner-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.banner-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.banner-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.banner-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.banner-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.banner-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.banner-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.banner-dots-wrapper{display:none;}.banner-stripe{position:relative;width:100%;height:48px;background:#E97300;z-index:20;display:flex;align-items:center;justify-content:center;}.banner-dots{display:flex;gap:8px;align-items:center;}.banner-dot{width:10px;height:10px;border-radius:999px;border:none;cursor:pointer;background:rgba(255,255,255,0.5);transition:all 0.3s ease;padding:0;flex-shrink:0;}.banner-dot--active{width:28px;background:#ffffff;}@media(max-width:768px){.banner-slide-inner{min-height:340px;}.banner-bg img{object-position:right center;}.banner-content{max-width:100%;width:100%;padding:32px 24px 80px;}.banner-buttons{flex-wrap:wrap;gap:12px;}.banner-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.banner-btn{flex:1 1 100%;min-width:0;}}";(function(){const s=i.ownerDocument??document;if(!s.getElementById("banner-hero-styles")){const f=s.createElement("style");f.id="banner-hero-styles",f.textContent=l,s.head.appendChild(f)}})();let a=[],r=0,h=null,d=!1,g=0,p=0;const E=50,C=i.dataset.autoplay!=="false",x=i.dataset.category??"",n=i.querySelector(".banner-slide-container");i.querySelector(".banner-dots");async function c(){m();try{const s=await(await fetch(e)).json();if(a=Array.isArray(s)?x?s.filter(f=>f.category===x):s:[],a.length===0){R();return}u(),H(),z(0,!1),C&&V()}catch{R()}}function m(){n.innerHTML=`
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
                `,o.head.appendChild(s)}}function w(o){return t[o]?t[o]:o==="outline-blue"||o==="outline-orange"?t["outline-white"]:t["fill-white"]}function y(o,s,f,k){const j=w(f),_=s?"a":"span",N=s?`href="${s}"${k?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${_} ${N}
                class="banner-btn"
                data-bg="${j.bg}"
                data-color="${j.color}"
                data-hover-bg="${j.hoverBg}"
                data-hover-color="${j.hoverColor}"
                style="background:${j.bg};color:${j.color};border:2px solid ${j.border};">
                ${o}
            </${_}>`}function u(){n.innerHTML=a.map((o,s)=>`
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
            `).join(""),M(),v(),B()}function M(){i.querySelectorAll(".banner-btn").forEach(o=>{const s=o.style.borderColor;o.addEventListener("mouseenter",()=>{o.style.background=o.dataset.hoverBg,o.style.color=o.dataset.hoverColor,o.style.borderColor=o.dataset.hoverBg}),o.addEventListener("mouseleave",()=>{o.style.background=o.dataset.bg,o.style.color=o.dataset.color,o.style.borderColor=s})})}function v(){n.addEventListener("mousedown",$),n.addEventListener("touchstart",$,{passive:!0}),n.addEventListener("mousemove",b),n.addEventListener("touchmove",b,{passive:!0}),n.addEventListener("mouseup",L),n.addEventListener("touchend",L),n.addEventListener("mouseleave",L)}function B(){a.forEach(o=>{const s=new Image;s.src=o.image_url})}function $(o){d=!0,g=o.touches?o.touches[0].clientX:o.clientX,p=0}function b(o){d&&(p=(o.touches?o.touches[0].clientX:o.clientX)-g)}function L(){d&&(d=!1,Math.abs(p)>=E&&(z(p<0?(r+1)%a.length:(r-1+a.length)%a.length),D()),p=0)}function H(){const o=i.querySelector(".banner-stripe");if(!o||a.length<=1)return;const s=document.createElement("div");s.className="banner-dots",a.forEach((f,k)=>{const j=document.createElement("button");j.className="banner-dot",j.dataset.index=String(k),j.setAttribute("aria-label",`Banner ${k+1}`),j.addEventListener("click",()=>{z(k),D()}),s.appendChild(j)}),o.innerHTML="",o.appendChild(s)}function z(o,s=!0){const f=n.querySelectorAll(".banner-slide"),k=i.querySelectorAll(".banner-dot");f.forEach((j,_)=>{const N=_===o;s||(j.style.transition="none"),j.classList.toggle("banner-slide--active",N),s||requestAnimationFrame(()=>{j.style.transition=""})}),k.forEach((j,_)=>{j.classList.toggle("banner-dot--active",_===o)}),r=o}function V(){a.length<=1||!C||(h=setInterval(()=>{z((r+1)%a.length)},5e3))}function D(){C&&(clearInterval(h),V())}function R(){const o=i.querySelector(".banner-wrapper");o&&(o.innerHTML=`
                    <div style="display:flex;align-items:center;justify-content:center;
                                min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;">
                        Sin contenido.
                    </div>`)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",c):c()}}const Si=[{id:"banner-hero",label:"Banner Slider",category:"Banners",media:Ci,content:{type:"banner-hero-component"}}];function ji(i){const e="banner-hero-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Slider",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-autoplay":"true","data-category":""},components:`
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
                `,script:Li(),traits:[{type:"select",name:"data-autoplay",label:"Avance automático",options:[{id:"true",name:"Activado"},{id:"false",name:"Desactivado"}],changeProp:!1},{type:"select",name:"data-category",label:"Filtrar por categoría",options:[{id:"",name:"Todas las categorías"}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const t=this.getEl();if(!t)return;const l=this.get("script");l&&typeof l=="function"&&setTimeout(()=>l.call(t),100)})}}}),Mi(i,e),Hi(i,e),zi(i,e)}async function zi(i,e){try{const t=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",a=await(await fetch(t)).json();if(!Array.isArray(a))return;const r=[...new Set(a.map(p=>p.category).filter(Boolean))].sort();if(r.length===0)return;const h=i.DomComponents.getType(e);if(!h)return;const g=h.model.prototype.defaults.traits.find(p=>p.name==="data-category");if(!g)return;g.options=[{id:"",name:"Todas las categorías"},...r.map(p=>({id:p,name:p}))]}catch{}}function Mi(i,e){i.on("storage:end:load",()=>{setTimeout(()=>$e(i,e),1e3)}),i.on("component:mount",t=>{const l=t.getEl();l?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(l)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const l=t.getEl();l&&setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(l)},500)}}),i.on("canvas:render",()=>{setTimeout(()=>$e(i,e),800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function $e(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const l=t.getEl();if(l?.isConnected){const a=t.get("script");a&&typeof a=="function"&&a.call(l)}})}function Hi(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const l=t.contentDocument?.head;if(l){if(!l.querySelector("#banner-hero-styles")){const a=document.createElement("style");a.id="banner-hero-styles",a.textContent=$i,l.appendChild(a)}if(!l.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(240,135,42,0.6) !important;
                    outline-offset: 2px;
                }
            `,l.appendChild(a)}}})}const Ti=`<svg viewBox="0 0 32 32" width="32" height="32">
    <rect width="32" height="32" fill="#f8f9fa" rx="2"/>
    <rect x="1" y="6" width="30" height="20" fill="#003B71" rx="2"/>
    <rect x="1" y="22" width="30" height="4" fill="#E97300" rx="0"/>
    <rect x="3" y="9" width="12" height="2" fill="rgba(255,255,255,0.9)" rx="1"/>
    <rect x="3" y="13" width="10" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="3" y="16" width="8" height="1.2" fill="rgba(255,255,255,0.6)" rx="0.6"/>
    <rect x="17" y="8" width="12" height="14" fill="#E97300" rx="2"/>
    <rect x="19" y="10" width="8" height="10" fill="#f8e7d8" rx="1"/>
</svg>`,Ii=`
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
.bsingle-stripe{position:relative;width:100%;height:24px;background:#E97300;z-index:20;}
@media(max-width:768px){
    .bsingle-inner{min-height:340px;}
    .bsingle-bg img{object-position:right center;}
    .bsingle-content{max-width:100%;width:100%;padding:32px 24px 80px;}
    .bsingle-buttons{flex-wrap:wrap;gap:12px;}
    .bsingle-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}
}
@media(max-width:480px){
    .bsingle-btn{flex:1 1 100%;min-width:0;}
}`;function Ai(){return function(){const i=this,e=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",t={"fill-blue":{bg:"#003B71",color:"#ffffff",border:"#003B71",hoverBg:"#002a52",hoverColor:"#ffffff"},"outline-blue":{bg:"transparent",color:"#003B71",border:"#003B71",hoverBg:"#003B71",hoverColor:"#ffffff"},"fill-orange":{bg:"#E97300",color:"#ffffff",border:"#E97300",hoverBg:"#c96200",hoverColor:"#ffffff"},"outline-orange":{bg:"transparent",color:"#E97300",border:"#E97300",hoverBg:"#E97300",hoverColor:"#ffffff"},"fill-white":{bg:"#ffffff",color:"#003B71",border:"#ffffff",hoverBg:"#dce8f5",hoverColor:"#003B71"},"outline-white":{bg:"transparent",color:"#ffffff",border:"#ffffff",hoverBg:"#ffffff",hoverColor:"#003B71"}},l=".bsingle-wrapper{position:relative;width:100%;background:#003B71;overflow:hidden;}.bsingle-inner{position:relative;width:100%;min-height:480px;display:flex;align-items:center;}.bsingle-bg{position:absolute;inset:0;z-index:0;}.bsingle-bg img{width:100%;height:100%;object-fit:cover;object-position:center;display:block;}.bsingle-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,59,113,0.85) 0%,rgba(0,59,113,0.65) 50%,rgba(0,59,113,0.2) 100%);z-index:1;}.bsingle-content{position:relative;z-index:10;display:flex;flex-direction:column;justify-content:center;padding:64px 64px 96px;max-width:60%;}.bsingle-category-badge{display:inline-block;margin-bottom:18px;padding:7px 20px;border-radius:999px;border:2px solid rgba(255,255,255,0.65);color:#fff;font-size:13px;font-weight:500;letter-spacing:0.04em;align-self:flex-start;}.bsingle-title{font-size:clamp(1.8rem,3.2vw,3rem);font-weight:800;color:#fff;line-height:1.15;margin:0 0 20px;}.bsingle-description{color:rgba(255,255,255,0.9);font-size:clamp(0.95rem,1.4vw,1.1rem);line-height:1.7;margin:0 0 36px;max-width:520px;}.bsingle-buttons{display:flex;flex-wrap:wrap;gap:16px;align-items:center;}.bsingle-btn{display:inline-block;padding:12px 32px;border-radius:999px;font-size:15px;font-weight:600;cursor:pointer;transition:background .2s,color .2s,border-color .2s;text-decoration:none;white-space:nowrap;line-height:1.4;box-sizing:border-box;}.bsingle-stripe{position:relative;width:100%;height:24px;background:#E97300;z-index:20;}@media(max-width:768px){.bsingle-inner{min-height:340px;}.bsingle-bg img{object-position:right center;}.bsingle-content{max-width:100%;width:100%;padding:32px 24px 80px;}.bsingle-buttons{flex-wrap:wrap;gap:12px;}.bsingle-btn{flex:1 1 45%;min-width:140px;text-align:center;white-space:normal;word-break:break-word;}}@media(max-width:480px){.bsingle-btn{flex:1 1 100%;min-width:0;}}";(function(){const c=i.ownerDocument??document;if(!c.getElementById("banner-single-styles")){const m=c.createElement("style");m.id="banner-single-styles",m.textContent=l,c.head.appendChild(m)}})();const a=i.dataset.bannerId??"",r=i.querySelector(".bsingle-content-wrapper");async function h(){d();try{const c=await(await fetch(e)).json();if(!Array.isArray(c)||c.length===0){x();return}const m=a?c.find(w=>String(w.id)===String(a)):c[0];if(!m){x();return}E(m)}catch{x()}}function d(){r.innerHTML=`
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
                </div>`;const n=i.ownerDocument??document;if(!n.getElementById("banner-skeleton-styles")){const c=n.createElement("style");c.id="banner-skeleton-styles",c.textContent="@keyframes bsk-shimmer{0%{background-position:-600px 0}100%{background-position:600px 0}}.bsk-badge{width:120px;height:32px;margin-bottom:20px;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title{height:40px;margin-bottom:12px;border-radius:8px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-title--short{width:60%;}.bsk-line{height:16px;margin-bottom:10px;border-radius:6px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-line--short{width:55%;}.bsk-buttons{display:flex;gap:16px;margin-top:36px;}.bsk-btn{height:48px;flex:1;border-radius:999px;background:linear-gradient(90deg,rgba(255,255,255,0.06) 25%,rgba(255,255,255,0.14) 50%,rgba(255,255,255,0.06) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}.bsk-bg-img{background:linear-gradient(90deg,rgba(255,255,255,0.04) 25%,rgba(255,255,255,0.09) 50%,rgba(255,255,255,0.04) 75%);background-size:600px 100%;animation:bsk-shimmer 1.6s infinite linear;}@media(max-width:768px){.bsk-buttons{flex-direction:column;}}",n.head.appendChild(c)}}function g(n){return t[n]??t["fill-white"]}function p(n,c,m,w){const y=g(m),u=c?"a":"span",M=c?`href="${c}"${w?' target="_blank" rel="noopener noreferrer"':""}`:"";return`<${u} ${M}
                class="bsingle-btn"
                data-bg="${y.bg}"
                data-color="${y.color}"
                data-border="${y.border}"
                data-hover-bg="${y.hoverBg}"
                data-hover-color="${y.hoverColor}"
                style="background:${y.bg};color:${y.color};border:2px solid ${y.border};">
                ${n}
            </${u}>`}function E(n){r.innerHTML=`
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
                                ${n.btn_primary_text?p(n.btn_primary_text,n.btn_primary_url,n.btn_primary_style,n.btn_primary_external):""}
                                ${n.btn_secondary_text?p(n.btn_secondary_text,n.btn_secondary_url,n.btn_secondary_style,n.btn_secondary_external):""}
                            </div>`:""}
                    </div>
                </div>`,C()}function C(){i.querySelectorAll(".bsingle-btn").forEach(n=>{const c=n.style.borderColor;n.addEventListener("mouseenter",()=>{n.style.background=n.dataset.hoverBg,n.style.color=n.dataset.hoverColor,n.style.borderColor=n.dataset.hoverBg}),n.addEventListener("mouseleave",()=>{n.style.background=n.dataset.bg,n.style.color=n.dataset.color,n.style.borderColor=c})})}function x(){r.innerHTML=`
                <div style="display:flex;align-items:center;justify-content:center;
                            min-height:480px;color:rgba(255,255,255,0.5);font-size:14px;padding:40px;">
                    No hay banner seleccionado o no está activo.
                </div>`}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",h):h()}}const _i=[{id:"banner-single",label:"Banner Individual",category:"Banners",media:Ti,content:{type:"banner-single-component"}}];function Di(i){const e="banner-single-component";i.DomComponents.addType(e,{isComponent:t=>t.getAttribute?.("data-gjs-type")===e?{type:e}:!1,model:{defaults:{name:"Banner Individual",tagName:"section",draggable:!0,droppable:!1,editable:!1,stylable:!1,resizable:!1,selectable:!0,hoverable:!0,layerable:!0,highlightable:!1,copyable:!1,removable:!0,attributes:{"data-gjs-type":e,"data-banner-id":""},components:`
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
                `,script:Ai(),traits:[{type:"select",name:"data-banner-id",label:"Banner a mostrar",options:[{id:"",name:"Cargando banners..."}],changeProp:!1}]},init(){this.set("type",e),this.addAttributes({"data-gjs-type":e}),this.on("change:attributes",()=>{const t=this.getEl();if(!t)return;const l=this.get("script");l&&typeof l=="function"&&setTimeout(()=>l.call(t),100)})}}}),Vi(i,e),Pi(i,e),qi(i,e)}async function qi(i,e){try{const t=document.querySelector('meta[name="api-banners-url"]')?.content??"/api/banners/active",a=await(await fetch(t)).json();if(!Array.isArray(a)||a.length===0)return;const r=i.DomComponents.getType(e);if(!r)return;const d=r.model.prototype.defaults.traits.find(g=>g.name==="data-banner-id");if(!d)return;d.options=[{id:"",name:"— Seleccionar banner —"},...a.map(g=>({id:String(g.id),name:g.category?`[${g.category}] ${g.title}`:g.title}))]}catch{}}function Vi(i,e){i.on("storage:end:load",()=>{setTimeout(()=>Le(i,e),1e3)}),i.on("component:mount",t=>{const l=t.getEl();l?.getAttribute?.("data-gjs-type")===e&&(t.set("type",e),setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(l)},500))}),i.on("component:clone",t=>{if(t.get("type")===e){const l=t.getEl();l&&setTimeout(()=>{const a=t.get("script");a&&typeof a=="function"&&a.call(l)},500)}}),i.on("canvas:render",()=>{setTimeout(()=>Le(i,e),800)}),i.on("storage:start:store",()=>{i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e),t.addAttributes({"data-gjs-type":e})})})}function Le(i,e){i.getWrapper().find(`[data-gjs-type="${e}"]`).forEach(t=>{t.set("type",e);const l=t.getEl();if(l?.isConnected){const a=t.get("script");a&&typeof a=="function"&&a.call(l)}})}function Pi(i,e){i.on("load",()=>{const t=i.Canvas.getFrameEl();if(!t)return;const l=t.contentDocument?.head;if(l){if(!l.querySelector("#banner-single-styles")){const a=document.createElement("style");a.id="banner-single-styles",a.textContent=Ii,l.appendChild(a)}if(!l.querySelector(`#${e}-editor-css`)){const a=document.createElement("style");a.id=`${e}-editor-css`,a.textContent=`
                [data-gjs-type="${e}"] * { pointer-events: none !important; }
                [data-gjs-type="${e}"].gjs-selected,
                [data-gjs-type="${e}"].gjs-hovered {
                    outline: 2px dashed rgba(240,135,42,0.6) !important;
                    outline-offset: 2px;
                }
            `,l.appendChild(a)}}})}function Ni(i){I.registerBlocks(et),I.registerBlocks(dt),I.registerBlocks(Si),I.registerBlocks(_i),I.registerBlocks(Ut),I.registerBlocks(zt),I.registerBlocks(ft),I.registerBlocks(ut),I.registerBlocks(Ct),I.registerBlocks(xt),I.registerBlocks(Pt),I.registerBlocks(wt),I.registerBlocks(Wt),I.registerBlocks(Kt),I.registerBlocks(fi),I.registerBlocks(xi),I.registerBlocks(wi),I.applyToEditor(i),Bi(i),ji(i),Di(i),pi(i),Mt(i),ei(i)}function Oi(i,e,t){i.on("component:add",()=>e.markAsDirty()),i.on("component:remove",()=>e.markAsDirty()),i.on("component:update",()=>e.markAsDirty()),i.on("style:update",()=>e.markAsDirty());const l=document.getElementById("save-button");l&&l.addEventListener("click",async()=>{await Ri(i,e,t,l)}),document.addEventListener("keydown",a=>{(a.ctrlKey||a.metaKey)&&a.key==="s"&&(a.preventDefault(),l&&!l.disabled&&l.click())})}async function Ri(i,e,t,l){l.disabled=!0,l.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{t.needsTitle()?await Ui(i,e,t):await Me(i,e,t)}catch(a){He(a.message,"error")}finally{l.disabled=!1,l.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}async function Ui(i,e,t){return new Promise((l,a)=>{Gi(async r=>{if(!r?.trim()){a(new Error("El título es obligatorio"));return}try{await Me(i,e,t,r),l()}catch(h){a(h)}})})}async function Me(i,e,t,l=null){const r={...e.getEditorContent(i),is_published:t.isPublished};l&&(r.title=l);const h=await e.savePage(i,r,t.storeUrl,t.getHttpMethod());h.success&&(e.markAsClean(),He(h.message,"success"),!t.isEditMode&&h.page?(t.updatePageInfo(h),t.updateTitle(h.page.title)):l&&t.updateTitle(l))}function Fi(){const i=document.createElement("div");return i.style.cssText=`
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.5);
    `,i}function Zi(){const i=document.createElement("div");return i.style.cssText=`
        background: #ffffff;
        border-radius: 0.75rem;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 28rem;
        width: 100%;
        overflow: hidden;
        font-family: 'Inter', sans-serif;
    `,i}function Wi(i,e,t,l,a){const r=document.createElement("div");return r.style.cssText="padding: 1.5rem 1.5rem 0;",r.innerHTML=`
        <div style="display:flex;align-items:flex-start;gap:1rem;">
            <div style="flex-shrink:0;width:3rem;height:3rem;border-radius:50%;background:${i};color:${e};display:flex;align-items:center;justify-content:center;">
                <i class="${t}" style="font-size:1.5rem;"></i>
            </div>
            <div style="flex:1;">
                <h3 style="font-size:1.25rem;font-weight:700;color:#111827;margin:0 0 0.5rem;">${l}</h3>
                <p style="font-size:0.875rem;color:#6b7280;margin:0;">${a}</p>
            </div>
        </div>
    `,r}function Yi(i){const e=document.createElement("div");return e.style.cssText=`
        padding: 1rem 1.5rem;
        background: #f9fafb;
        display: flex;
        gap: 0.75rem;
        justify-content: flex-end;
        margin-top: 1.5rem;
    `,i.forEach(({label:t,style:l,id:a})=>{const r=document.createElement("button");r.id=a,r.style.cssText=`
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            font-size: 0.875rem;
            cursor: pointer;
            transition: opacity 0.2s;
            ${l}
        `,r.textContent=t,r.addEventListener("mouseenter",()=>{r.style.opacity="0.85"}),r.addEventListener("mouseleave",()=>{r.style.opacity="1"}),e.appendChild(r)}),e}function Gi(i){const e=Fi(),t=Zi(),l=Wi("#dbeafe","#2563eb","ri-file-text-line","Título de la Página","Ingresa un título descriptivo para identificar esta página"),a=document.createElement("div");a.style.cssText="padding: 1rem 1.5rem 0;";const r=document.createElement("input");r.type="text",r.id="page-title-input",r.placeholder="Ej: Acerca de Nosotros",r.style.cssText=`
        width: 100%;
        padding: 0.5rem 1rem;
        border: 2px solid #d1d5db;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        outline: none;
        transition: border-color 0.2s;
        box-sizing: border-box;
        font-family: inherit;
    `,r.addEventListener("focus",()=>{r.style.borderColor="#f0872a"}),r.addEventListener("blur",()=>{r.style.borderColor="#d1d5db"}),a.appendChild(r);const h=Yi([{id:"modal-cancel",label:"Cancelar",style:"background:#ffffff;color:#374151;border:2px solid #d1d5db;"},{id:"modal-confirm",label:"Guardar",style:"background:#f0872a;color:#ffffff;border:2px solid #f0872a;"}]);t.appendChild(l),t.appendChild(a),t.appendChild(h),e.appendChild(t),document.body.appendChild(e);const d=()=>e.remove();h.querySelector("#modal-cancel").addEventListener("click",d),h.querySelector("#modal-confirm").addEventListener("click",()=>{const g=r.value.trim();d(),i(g)}),e.addEventListener("click",g=>{g.target===e&&d()}),r.addEventListener("keypress",g=>{g.key==="Enter"&&h.querySelector("#modal-confirm").click()}),setTimeout(()=>r.focus(),100)}function He(i,e){typeof window.showNotification=="function"&&window.showNotification(i,e)}document.addEventListener("DOMContentLoaded",async()=>{const i=new Ae,e=new Ze;new We(i);const t=Qe();if(t.on("load",()=>{Ni(t),_e(t),De(),qe(),Ve(t),Pe(t),Ne(t),Oe(t),Re(t),Ue(t),Xi(t),Qi(t),Ki(t),setTimeout(()=>{t.runCommand("sw-visibility"),t.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),e.isEditMode)try{await i.loadPageContent(t,e.loadUrl),Se("Contenido cargado correctamente","success")}catch(l){Se("Error al cargar el contenido","error"),console.error(l)}Oi(t,i,e)});function Xi(i){const e=[{cmd:"set-device-desktop",device:"Desktop"},{cmd:"set-device-tablet",device:"Tablet"},{cmd:"set-device-mobile",device:"Mobile"}];e.forEach(({cmd:t,device:l})=>{i.Commands.add(t,{run:a=>{a.setDevice(l),e.forEach(({cmd:r})=>{a.Panels.getButton("devices-c",r)?.set("active",r===t)})}})})}function Qi(i){i.Commands.add("canvas-clear",{run:e=>{Ji("Limpiar canvas","¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.","ri-delete-bin-line","#fef2f2","#dc2626","Limpiar todo","#dc2626",()=>{e.DomComponents.clear(),e.CssComposer.clear()})}})}function Ji(i,e,t,l,a,r,h,d){const g=document.createElement("div");g.style.cssText=`
        position:fixed;inset:0;z-index:9999;
        display:flex;align-items:center;justify-content:center;
        padding:1rem;background:rgba(0,0,0,0.5);
    `;const p=document.createElement("div");p.style.cssText=`
        background:#ffffff;border-radius:0.75rem;
        box-shadow:0 20px 60px rgba(0,0,0,0.3);
        max-width:28rem;width:100%;overflow:hidden;
        font-family:'Inter',sans-serif;
    `;const E=document.createElement("div");E.style.cssText="padding:1.5rem 1.5rem 0;",E.innerHTML=`
        <div style="display:flex;align-items:flex-start;gap:1rem;">
            <div style="flex-shrink:0;width:3rem;height:3rem;border-radius:50%;
                        background:${l};color:${a};
                        display:flex;align-items:center;justify-content:center;">
                <i class="${t}" style="font-size:1.5rem;"></i>
            </div>
            <div style="flex:1;">
                <h3 style="font-size:1.125rem;font-weight:700;color:#111827;margin:0 0 0.5rem;">${i}</h3>
                <p style="font-size:0.875rem;color:#6b7280;margin:0;line-height:1.5;">${e}</p>
            </div>
        </div>
    `;const C=document.createElement("div");C.style.cssText=`
        padding:1rem 1.5rem;background:#f9fafb;
        display:flex;gap:0.75rem;justify-content:flex-end;margin-top:1.5rem;
    `;const x=document.createElement("button");x.textContent="Cancelar",x.style.cssText=`
        padding:0.5rem 1rem;border-radius:0.5rem;font-weight:500;
        font-size:0.875rem;cursor:pointer;background:#ffffff;
        color:#374151;border:2px solid #d1d5db;font-family:inherit;
    `;const n=document.createElement("button");n.textContent=r,n.style.cssText=`
        padding:0.5rem 1rem;border-radius:0.5rem;font-weight:500;
        font-size:0.875rem;cursor:pointer;background:${h};
        color:#ffffff;border:2px solid ${h};font-family:inherit;
    `,[x,n].forEach(m=>{m.addEventListener("mouseenter",()=>{m.style.opacity="0.85"}),m.addEventListener("mouseleave",()=>{m.style.opacity="1"})});const c=()=>g.remove();x.addEventListener("click",c),n.addEventListener("click",()=>{c(),d()}),g.addEventListener("click",m=>{m.target===g&&c()}),C.appendChild(x),C.appendChild(n),p.appendChild(E),p.appendChild(C),g.appendChild(p),document.body.appendChild(g)}function Ki(i){const e=i.Canvas.getFrameEl();if(!e?.contentDocument?.head)return;const t=e.contentDocument.createElement("style");t.id="gjs-dashed-fix",t.textContent="body,body.gjs-dashed{margin:0!important;padding:0 0 160px 0!important;}",e.contentDocument.head.appendChild(t)}function Se(i,e="info"){typeof window.showNotification=="function"&&window.showNotification(i,e)}
