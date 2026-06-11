import{i as F,I as G,t as V,d as W,f as X,e as Y,s as K,g as Q,c as Z,E as ee,j as ne,h as te}from"./editor-commands-C7f79RQP.js";import{o as oe}from"./media-picker-CiKJ1Agb.js";import"./_commonjsHelpers-CqkleIqs.js";function ae(){return F()}const re=`(function(){
function initNavbar(root){
    if(!root||root.__nbInit)return;
    root.__nbInit=true;
    var id=root.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");
    if(!id)return;
    function pad(){document.body.style.paddingTop=root.offsetHeight+"px";}
    pad();
    window.addEventListener("resize",function(){
        pad();
        if(window.innerWidth>992){
            var mob=document.getElementById("nb-mobile-"+id);
            if(mob&&mob.classList.contains("nb-open"))mob.classList.remove("nb-open");
        }
    });
    var toggle=document.getElementById("nb-toggle-"+id);
    var mobile=document.getElementById("nb-mobile-"+id);
    if(toggle&&mobile){
        toggle.addEventListener("click",function(){mobile.classList.toggle("nb-open");pad();});
    }
    root.querySelectorAll(".nb-nav-trigger").forEach(function(btn){
        btn.addEventListener("click",function(e){
            e.stopPropagation();
            var item=btn.closest(".nb-nav-item");
            var open=item.classList.contains("nb-open");
            root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
            if(!open)item.classList.add("nb-open");
            pad();
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
            root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
        }
    });
}
document.querySelectorAll("nav[data-gjs-type='navbar-component'], nav.nb-wrapper").forEach(function(el){initNavbar(el);});
if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",function(){
        document.querySelectorAll("nav[data-gjs-type='navbar-component'], nav.nb-wrapper").forEach(function(el){initNavbar(el);});
    });
}
})();`,R=`
<style>
.nb-wrapper{background:#fff;width:100%;box-shadow:0 2px 8px rgba(0,0,0,0.08);position:fixed;top:0;left:0;right:0;z-index:1000;font-family:'Poppins',sans-serif;}
.nb-top{display:flex;align-items:center;justify-content:space-between;padding:0.75rem 4rem;border-bottom:1px solid #f1f5f9;gap:1.5rem;}
.nb-logo-link{display:flex;align-items:center;text-decoration:none;flex-shrink:0;}
.nb-logo-link img{height:40px;width:auto;display:block;}
.nb-logo-text{font-size:1.125rem;font-weight:800;color:#003B71;}
.nb-top-actions{display:flex;align-items:center;gap:1.5rem;flex:1;justify-content:center;}
.nb-top-action{display:flex;align-items:center;gap:0.5rem;text-decoration:none;color:#003B71;font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.04em;transition:color 0.15s;white-space:nowrap;}
.nb-top-action i{font-size:1.5rem;color:#E97300;}
.nb-top-action:hover{color:#E97300;}
.nb-banking-btn{display:inline-flex;align-items:center;justify-content:center;padding:0.625rem 1.5rem;border-radius:9999px;font-size:0.9375rem;font-weight:600;text-decoration:none;cursor:pointer;border:none;transition:opacity 0.15s;white-space:nowrap;font-family:inherit;flex-shrink:0;}
.nb-banking-btn:hover{opacity:0.88;}
.nb-banking-blue{background:#003B71;color:#fff;}
.nb-banking-orange{background:#E97300;color:#fff;}
.nb-bottom{display:flex;align-items:stretch;padding:0 4rem;gap:0;position:relative;border-bottom:3px solid #E97300;}
.nb-nav-list{display:flex;align-items:center;justify-content:space-between;gap:0;list-style:none;margin:0;padding:0;flex:1;}
.nb-nav-item{position:static;}
.nb-nav-link{display:inline-flex;align-items:center;gap:0;padding:0.875rem 1.125rem;color:#E97300;text-decoration:none;font-size:0.9375rem;font-weight:600;transition:color 0.15s;white-space:nowrap;cursor:pointer;background:none;border:none;font-family:inherit;}
.nb-nav-link:hover,.nb-nav-item.nb-open>.nb-nav-link{color:#003B71;}
.nb-mega{display:none;position:absolute;top:calc(100% + 3px);left:0;right:0;background:#fff;border-top:2px solid #E97300;box-shadow:0 8px 32px rgba(0,0,0,0.1);z-index:200;padding:1rem 4rem;}
.nb-nav-item.nb-open>.nb-mega{display:block;}
.nb-mega-grid{display:grid;gap:2rem;grid-template-columns:1fr 1fr 1fr minmax(200px,260px);}
.nb-mega-col{display:flex;flex-direction:column;gap:0.5rem;min-width:0;}
.nb-mega-badge{display:inline-flex;align-items:center;justify-content:center;padding:0.5rem 1.25rem;border-radius:9999px;font-size:0.875rem;font-weight:700;text-align:center;margin-bottom:0;cursor:default;}
.nb-badge-blue{background:#003B71;color:#fff;}
.nb-badge-orange{background:#E97300;color:#fff;}
.nb-mega-item{display:flex;flex-direction:column;gap:0.125rem;text-decoration:none;padding:0.375rem 0;border-bottom:1px solid transparent;transition:border-color 0.15s;}
.nb-mega-item:hover{border-bottom-color:#e2e8f0;}
.nb-mega-item-title{font-size:0.8125rem;font-weight:700;color:#003B71;text-transform:uppercase;letter-spacing:0.03em;line-height:1.3;}
.nb-mega-item-desc{font-size:0.8125rem;font-weight:400;color:#E97300;line-height:1.4;}
.nb-mega-cta-col{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.25rem;padding:1rem;border-left:1px solid #f1f5f9;}
.nb-mega-cta-text{font-size:1.125rem;font-weight:800;text-align:center;line-height:1.3;text-transform:uppercase;}
.nb-mega-cta-btn{display:inline-flex;align-items:center;justify-content:center;padding:0.625rem 1.75rem;border-radius:9999px;font-size:0.875rem;font-weight:700;text-decoration:none;cursor:pointer;border:none;font-family:inherit;transition:opacity 0.15s;}
.nb-mega-cta-btn:hover{opacity:0.88;}
.nb-bottom-cta{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;padding:0.5rem 1.25rem;border-radius:9999px;font-size:0.8125rem;font-weight:700;text-decoration:none;cursor:pointer;border:none;font-family:inherit;transition:opacity 0.15s;text-align:center;word-break:break-word;white-space:normal;min-width:120px;max-width:180px;line-height:1.25;margin-left:1.25rem;flex-shrink:0;align-self:center;margin-top:0.375rem;margin-bottom:0.375rem;}
.nb-bottom-cta:hover{opacity:0.88;}
.nb-bottom-cta-line1{text-transform:uppercase;letter-spacing:0.04em;}
.nb-bottom-cta-line2{font-size:0.6875rem;font-weight:500;text-transform:uppercase;letter-spacing:0.06em;opacity:0.85;}
.nb-cta-blue{background:#003B71;color:#fff;}
.nb-cta-orange{background:#E97300;color:#fff;}
.nb-hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:0.5rem;border-radius:0.375rem;transition:background 0.15s;flex-shrink:0;}
.nb-hamburger:hover{background:rgba(0,59,113,0.06);}
.nb-hamburger span{display:block;width:24px;height:2px;background:#003B71;border-radius:2px;transition:all 0.25s;}
.nb-mobile-bar{display:none;align-items:center;justify-content:space-between;padding:0.625rem 1.25rem;border-bottom:3px solid #E97300;}
.nb-mobile-menu{display:none;flex-direction:column;background:#fff;border-top:1px solid #f1f5f9;padding:0.75rem 1.25rem;gap:0;}
.nb-mobile-menu.nb-open{display:flex;}
.nb-mobile-top-actions{display:flex;flex-direction:row;flex-wrap:wrap;justify-content:center;gap:0.25rem 1rem;border-bottom:1px solid #f1f5f9;padding:0.25rem 0.75rem;}
.nb-mobile-top-action{display:flex;align-items:center;gap:0.5rem;padding:0.375rem 0.5rem;color:#E97300;text-decoration:none;font-size:0.8125rem;font-weight:600;white-space:nowrap;text-transform:uppercase;letter-spacing:0.04em;}
.nb-mobile-top-action i{font-size:1.125rem;color:#E97300;flex-shrink:0;}
.nb-mobile-banking{display:flex;flex-direction:row;flex-wrap:wrap;align-items:center;justify-content:center;gap:0.625rem;padding:0.625rem 0.5rem;border-bottom:1px solid #f1f5f9;}
.nb-mobile-banking .nb-banking-btn{width:auto;justify-content:center;}
.nb-mobile-banking .nb-bottom-cta{margin-left:0;margin-top:0;margin-bottom:0;align-self:auto;}
.nb-mobile-link{display:flex;align-items:center;justify-content:space-between;padding:0.75rem 0.5rem;color:#E97300;text-decoration:none;font-size:0.9375rem;font-weight:600;border-bottom:1px solid #f1f5f9;cursor:pointer;background:none;border-left:none;border-right:none;border-top:none;width:100%;text-align:left;font-family:inherit;transition:color 0.15s;}
.nb-mobile-link:hover,.nb-mobile-item.nb-open>.nb-mobile-link{color:#003B71;}
.nb-mobile-link i{color:#94a3b8;font-size:0.875rem;transition:transform 0.2s;}
.nb-mobile-item.nb-open>.nb-mobile-link i{transform:rotate(180deg);}
.nb-mobile-submenu{display:none;flex-direction:column;padding:0.25rem 0 0.5rem 1rem;gap:0.125rem;}
.nb-mobile-item.nb-open>.nb-mobile-submenu{display:flex;}
.nb-mobile-sub-link{display:flex;flex-direction:column;gap:0.125rem;padding:0.5rem;text-decoration:none;border-radius:0.375rem;transition:background 0.15s;}
.nb-mobile-sub-link:hover{background:rgba(0,59,113,0.04);}
.nb-mobile-sub-title{font-size:0.8125rem;font-weight:700;color:#003B71;text-transform:uppercase;}
.nb-mobile-sub-desc{font-size:0.75rem;color:#E97300;}
@media(max-width:1280px){
    .nb-top{padding:0.75rem 2.5rem;}
    .nb-bottom{padding:0 2.5rem;}
    .nb-mega{padding:2rem 2.5rem;}
}
@media(max-width:992px){
    .nb-top{display:none;}
    .nb-bottom{display:none;}
    .nb-mobile-bar{display:flex;}
    .nb-hamburger{display:flex;}
}
</style>`;function le(r){return r?r.split(" ").filter(t=>t.length>0).map((t,a)=>`<span style="color:${a%2===0?"#E97300":"#003B71"};">${t}</span>`).join(" "):""}function O(r,t){t=t||"nb"+Math.random().toString(36).slice(2,7);const a=r.logo_href||"/",s=r.logo_url?`<img src="${r.logo_url}" alt="${r.logo_alt||"Logo"}">`:`<span class="nb-logo-text">${r.logo_text||"Logo"}</span>`,x=`<a href="${a}" class="nb-logo-link">${s}</a>`,B=(r.top_actions||[]).map(c=>{const q=c.icon?`<i class="${c.icon}"></i>`:"";return`<a href="${c.href||"#"}" class="nb-top-action">${q}${c.label||""}</a>`}).join(""),C=r.banking_btn||{},k=C.color==="orange"?"nb-banking-orange":"nb-banking-blue",w=`<a href="${C.href||"#"}" class="nb-banking-btn ${k}">${C.label||"Banca en Línea"}</a>`,b=(r.nav_links||[]).map(c=>{if(c.type==="submenu"&&c.columns?.length){const q=!!(c.cta_column&&(c.cta_column.text||c.cta_column.btn_label)),S=c.columns.slice(0,3),$=S.map(_=>{const j=_.badge_color==="orange"?"nb-badge-orange":"nb-badge-blue",n=_.badge?`<span class="nb-mega-badge ${j}">${_.badge}</span>`:"",e=(_.items||[]).map(d=>{const l=d.desc?`<span class="nb-mega-item-desc">${d.desc}</span>`:"";return`<a href="${d.href||"#"}" class="nb-mega-item"><span class="nb-mega-item-title">${d.label||""}</span>${l}</a>`}).join("");return`<div class="nb-mega-col">${n}${e}</div>`}).join("");let I="";if(q){const _=c.cta_column,j=_.btn_color==="blue"?"nb-badge-blue":"nb-badge-orange";I=`<div class="nb-mega-cta-col">
                        <p class="nb-mega-cta-text">${le(_.text||"")}</p>
                        <a href="${_.btn_href||"#"}" class="nb-mega-cta-btn ${j}">${_.btn_label||"Ver más"}</a>
                    </div>`}const T=q?"grid-template-columns:1fr 1fr 1fr minmax(200px,260px);":`grid-template-columns:repeat(${S.length},minmax(0,280px));justify-content:start;`;return`<li class="nb-nav-item nb-has-submenu">
                    <button class="nb-nav-link nb-nav-trigger" type="button">${c.label||"Menú"}</button>
                    <div class="nb-mega"><div class="nb-mega-grid" style="${T}">${$}${I}</div></div>
                </li>`}return`<li class="nb-nav-item"><a href="${c.href||"#"}" class="nb-nav-link">${c.label||""}</a></li>`}).join(""),p=r.bottom_cta||{},h=p.color==="blue"?"nb-cta-blue":"nb-cta-orange",E=p.sublabel?`<span class="nb-bottom-cta-line2">${p.sublabel}</span>`:"",o=p.label?`<a href="${p.href||"#"}" class="nb-bottom-cta ${h}"><span class="nb-bottom-cta-line1">${p.label}</span>${E}</a>`:"",z=(r.top_actions||[]).map(c=>{const q=c.icon?`<i class="${c.icon}"></i>`:"";return`<a href="${c.href||"#"}" class="nb-mobile-top-action">${q}${c.label||""}</a>`}).join(""),D=(r.nav_links||[]).map(c=>{if(c.type==="submenu"&&c.columns?.length){const q=c.columns.flatMap(S=>S.items||[]).map(S=>{const $=S.desc?`<span class="nb-mobile-sub-desc">${S.desc}</span>`:"";return`<a href="${S.href||"#"}" class="nb-mobile-sub-link"><span class="nb-mobile-sub-title">${S.label||""}</span>${$}</a>`}).join("");return`<div class="nb-mobile-item">
                    <button class="nb-mobile-link" type="button">${c.label||"Menú"}<i class="ri-arrow-down-s-line"></i></button>
                    <div class="nb-mobile-submenu">${q}</div>
                </div>`}return`<a href="${c.href||"#"}" class="nb-mobile-link">${c.label||""}</a>`}).join(""),H=[w,p.label?`<a href="${p.href||"#"}" class="nb-bottom-cta ${h}"><span class="nb-bottom-cta-line1">${p.label}</span>${E}</a>`:""].filter(Boolean).join("");return`<div id="nb-root-${t}" data-gjs-editable="false" data-gjs-selectable="false" data-gjs-hoverable="false">
        <div class="nb-top">
            <div class="nb-logo">${x}</div>
            <div class="nb-top-actions">${B}</div>
            ${w}
        </div>
        <div class="nb-bottom">
            <ul class="nb-nav-list">${b}</ul>
            ${o}
        </div>
        <div class="nb-mobile-bar">
            ${x}
            <button class="nb-hamburger" type="button" id="nb-toggle-${t}" aria-label="Menú"><span></span><span></span><span></span></button>
        </div>
        <div class="nb-mobile-menu" id="nb-mobile-${t}">
            <div class="nb-mobile-top-actions">${z}</div>
            <div class="nb-mobile-banking">${H}</div>
            ${D}
        </div>
    </div>`}const U={logo_url:"",logo_alt:"Logo",logo_text:"Logo",logo_href:"/",top_actions:[{label:"Contáctanos",href:"#",icon:"ri-phone-line"},{label:"Sucursales",href:"#",icon:"ri-building-line"},{label:"Preguntas Frecuentes",href:"#",icon:"ri-question-answer-line"}],banking_btn:{label:"Mi Banca Integral",href:"#",color:"blue"},nav_links:[{type:"link",label:"Inicio",href:"/"},{type:"submenu",label:"Créditos",columns:[{badge:"Tus créditos",badge_color:"blue",items:[{label:"Microcrédito",desc:"Financiamiento para tu negocio",href:"#"},{label:"Crédito Personal",desc:"Para tus necesidades personales",href:"#"}]}],cta_column:{text:"Solicita tu Crédito Online",btn_label:"Solicitar",btn_href:"#",btn_color:"orange"}},{type:"link",label:"Ahorros e Inversión",href:"#"},{type:"link",label:"Servicios y seguro",href:"#"}],bottom_cta:{label:"Programa Surge",sublabel:"Formación Empresarial",href:"#",color:"orange"}};function ie(r,t){const a=document.getElementById("navbar-config-modal");if(a&&a.remove(),!document.getElementById("nb-modal-styles")){const n=document.createElement("style");n.id="nb-modal-styles",n.textContent=`
            .nb-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(15,23,42,0.45);backdrop-filter:blur(3px);padding:1rem;}
            .nb-modal{background:#fff;border-radius:0.75rem;width:100%;max-width:860px;max-height:92vh;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(15,23,42,0.15),0 4px 16px rgba(15,23,42,0.08);font-family:'Inter',sans-serif;color:#1e293b;border:1px solid #e2e8f0;}
            .nb-modal-header{padding:1rem 1.25rem;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;justify-content:space-between;background:#fff;flex-shrink:0;}
            .nb-modal-header-left{display:flex;align-items:center;gap:0.5rem;}
            .nb-modal-header-left i{font-size:1.125rem;color:#3b82f6;}
            .nb-modal-header-left h2{margin:0;font-size:0.9375rem;font-weight:600;color:#0f172a;}
            .nb-modal-close{display:flex;align-items:center;justify-content:center;width:2rem;height:2rem;border-radius:0.375rem;border:none;background:transparent;color:#94a3b8;cursor:pointer;transition:background 0.15s;}
            .nb-modal-close:hover{background:#f1f5f9;color:#475569;}
            .nb-modal-tabs{display:flex;border-bottom:1px solid #e2e8f0;background:#fff;flex-shrink:0;overflow-x:auto;}
            .nb-tab-btn{padding:0.75rem 1rem;background:transparent;border:none;border-bottom:2px solid transparent;color:#94a3b8;font-size:0.8125rem;font-weight:500;cursor:pointer;font-family:inherit;transition:color 0.15s;display:flex;align-items:center;gap:0.375rem;margin-bottom:-1px;white-space:nowrap;flex-shrink:0;}
            .nb-tab-btn.active{color:#003B71;border-bottom-color:#003B71;}
            .nb-tab-btn i{font-size:1rem;}
            .nb-modal-body{flex:1;overflow-y:auto;padding:1.25rem;display:flex;flex-direction:column;gap:1rem;background:#f8fafc;}
            .nb-modal-body::-webkit-scrollbar{width:5px;}
            .nb-modal-body::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:3px;}
            .nb-tab-panel{display:none;flex-direction:column;gap:1rem;}
            .nb-tab-panel.active{display:flex;}
            .nb-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.625rem;padding:1rem;}
            .nb-label{display:block;font-size:0.75rem;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:0.625rem;}
            .nb-row{display:flex;gap:0.75rem;align-items:center;}
            .nb-input{flex:1;padding:0.5rem 0.75rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;color:#1e293b;font-size:0.875rem;outline:none;font-family:inherit;transition:border-color 0.15s;width:100%;box-sizing:border-box;}
            .nb-input:focus{border-color:#3b82f6;}
            .nb-input-sm{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;transition:border-color 0.15s;box-sizing:border-box;}
            .nb-input-sm:focus{border-color:#3b82f6;}
            .nb-select{padding:0.375rem 0.625rem;background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.375rem;color:#1e293b;font-size:0.8rem;outline:none;font-family:inherit;}
            .nb-list{display:flex;flex-direction:column;gap:0.625rem;}
            .nb-action-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-action-card.nb-dragging{opacity:0.4;}
            .nb-action-card.nb-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
            .nb-link-card{background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;overflow:visible;}
            .nb-link-card.nb-dragging{opacity:0.4;}
            .nb-link-card.nb-drag-over{border-color:#003B71;box-shadow:0 0 0 2px rgba(0,59,113,0.15);}
            .nb-link-card-header{padding:0.625rem 0.875rem;background:#f8fafc;border-bottom:1px solid #f1f5f9;display:flex;align-items:center;gap:0.5rem;border-radius:0.5rem 0.5rem 0 0;}
            .nb-link-card-body{padding:0.75rem 0.875rem;display:flex;flex-direction:column;gap:0.75rem;}
            .nb-drag-handle{cursor:grab;color:#94a3b8;display:flex;align-items:center;padding:0 0.125rem;flex-shrink:0;}
            .nb-drag-handle:hover{color:#475569;}
            .nb-drag-handle:active{cursor:grabbing;}
            .nb-type-badge{font-size:0.65rem;font-weight:700;padding:2px 6px;border-radius:4px;text-transform:uppercase;letter-spacing:0.05em;cursor:pointer;transition:opacity 0.15s;user-select:none;}
            .nb-type-badge:hover{opacity:0.75;}
            .nb-type-link{background:#dbeafe;color:#1d4ed8;}
            .nb-type-submenu{background:#fef3c7;color:#b45309;}
            .nb-btn-remove{background:none;border:none;cursor:pointer;color:#ef4444;padding:0.25rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;border-radius:0.25rem;transition:background 0.15s;}
            .nb-btn-remove:hover{background:#fef2f2;}
            .nb-btn-sm-add{padding:0.25rem 0.625rem;background:#e8f0f8;border:none;border-radius:0.375rem;color:#003B71;font-size:0.7rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;}
            .nb-btn-sm-add:hover{background:#d1e3f5;}
            .nb-add-row{display:flex;gap:0.5rem;padding-top:0.25rem;flex-wrap:wrap;}
            .nb-btn-add{padding:0.375rem 0.75rem;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.375rem;font-family:inherit;transition:background 0.15s;}
            .nb-btn-add-link{background:#003B71;}
            .nb-btn-add-link:hover{background:#002a52;}
            .nb-btn-add-submenu{background:#b45309;}
            .nb-btn-add-submenu:hover{background:#92400e;}
            .nb-btn-add-action{background:#003B71;}
            .nb-btn-add-action:hover{background:#002a52;}
            .nb-btn-add-col{background:#0d9488;}
            .nb-btn-add-col:hover{background:#0f766e;}
            .nb-btn-add-item{background:#64748b;}
            .nb-btn-add-item:hover{background:#475569;}
            .nb-pick-btn{flex-shrink:0;padding:0.4rem 0.75rem;background:#003B71;border:none;border-radius:0.5rem;color:#fff;font-size:0.75rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.25rem;font-family:inherit;white-space:nowrap;transition:background 0.15s;}
            .nb-pick-btn:hover{background:#002a52;}
            .nb-icon-preview{display:inline-flex;align-items:center;justify-content:center;width:2rem;height:2rem;background:#f1f5f9;border-radius:0.375rem;flex-shrink:0;}
            .nb-icon-preview i{font-size:1.125rem;color:#003B71;}
            .nb-col-card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.5rem;padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-col-card-header{display:flex;align-items:center;gap:0.5rem;margin-bottom:0.25rem;}
            .nb-col-items{display:flex;flex-direction:column;gap:0.375rem;padding-left:0.5rem;border-left:2px solid #e2e8f0;}
            .nb-col-item{display:flex;flex-direction:column;gap:0.25rem;padding:0.375rem;background:#fff;border:1px solid #f1f5f9;border-radius:0.375rem;}
            .nb-col-item-row{display:flex;gap:0.375rem;align-items:center;}
            .nb-section-title{font-size:0.75rem;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em;padding:0.25rem 0;border-bottom:1px solid #e2e8f0;margin-bottom:0.25rem;}
            .nb-cta-section{background:#fff3e0;border:1px solid #fed7aa;border-radius:0.5rem;padding:0.75rem;display:flex;flex-direction:column;gap:0.5rem;}
            .nb-modal-footer{padding:1rem 1.25rem;border-top:1px solid #f1f5f9;display:flex;gap:0.75rem;justify-content:flex-end;background:#fff;flex-shrink:0;}
            .nb-btn-cancel{padding:0.5rem 1.25rem;background:#fff;border:2px solid #e2e8f0;border-radius:0.5rem;color:#475569;font-size:0.875rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-btn-cancel:hover{background:#f8fafc;border-color:#cbd5e1;}
            .nb-btn-save{padding:0.5rem 1.25rem;background:#f0872a;border:none;border-radius:0.5rem;color:#fff;font-size:0.875rem;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.15s;}
            .nb-btn-save:hover{background:#d97821;}
            .nb-color-toggle{display:flex;gap:0.375rem;}
            .nb-color-opt{padding:0.375rem 0.875rem;border-radius:9999px;font-size:0.75rem;font-weight:700;cursor:pointer;border:2px solid transparent;transition:all 0.15s;font-family:inherit;}
            .nb-color-opt-blue{background:#003B71;color:#fff;}
            .nb-color-opt-orange{background:#E97300;color:#fff;}
            .nb-color-opt.nb-color-inactive{opacity:0.35;border-color:#e2e8f0;}
            .nb-color-opt.nb-color-inactive:hover{opacity:0.6;}
        `,document.head.appendChild(n)}const s=(()=>{try{return JSON.parse(t.getAttributes()["data-navbar-config"]||"{}")}catch{return{}}})(),x=s.logo_url||"",B=s.logo_alt||"",C=s.logo_text||"Logo",k=s.logo_href||"/",w=JSON.parse(JSON.stringify(s.top_actions||U.top_actions)),b=JSON.parse(JSON.stringify(s.banking_btn||U.banking_btn)),p=JSON.parse(JSON.stringify(s.nav_links||U.nav_links)),h=JSON.parse(JSON.stringify(s.bottom_cta||U.bottom_cta)),E=document.createElement("div");E.id="navbar-config-modal",E.className="nb-overlay";const o=document.createElement("div");o.className="nb-modal",o.innerHTML=`
        <div class="nb-modal-header">
            <div class="nb-modal-header-left"><i class="ri-layout-top-line"></i><h2>Configurar Navbar</h2></div>
            <button id="nb-modal-close" class="nb-modal-close"><i class="ri-close-line" style="font-size:1.125rem;"></i></button>
        </div>
        <div class="nb-modal-tabs">
            <button class="nb-tab-btn active" data-tab="logo"><i class="ri-image-line"></i> Logo</button>
            <button class="nb-tab-btn" data-tab="top-actions"><i class="ri-links-line"></i> Acciones superiores</button>
            <button class="nb-tab-btn" data-tab="banking"><i class="ri-bank-card-line"></i> Banca en línea</button>
            <button class="nb-tab-btn" data-tab="nav"><i class="ri-menu-line"></i> Navegación</button>
            <button class="nb-tab-btn" data-tab="bottom-cta"><i class="ri-cursor-line"></i> CTA inferior</button>
        </div>
        <div class="nb-modal-body">
            <div class="nb-tab-panel active" id="nb-panel-logo">
                <div class="nb-card">
                    <label class="nb-label">Imagen del logo</label>
                    <div class="nb-row" style="align-items:flex-start;flex-wrap:wrap;gap:0.75rem;">
                        <div style="flex:1;min-width:200px;display:flex;flex-direction:column;gap:0.5rem;">
                            ${x?`<img id="nb-logo-preview" src="${x}" style="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;">`:'<div id="nb-logo-preview" style="display:none;"></div>'}
                            <input id="nb-logo-url" type="text" placeholder="URL del logo" value="${x}" class="nb-input">
                        </div>
                        <button id="nb-logo-pick" class="nb-pick-btn"><i class="ri-image-line"></i> Seleccionar</button>
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Enlace del logo</label>
                    <div style="position:relative;">
                        <input id="nb-logo-href" type="text" placeholder="Ej: / o https://..." value="${k}" class="nb-input">
                    </div>
                </div>
                <div class="nb-card">
                    <label class="nb-label">Texto alternativo / Logo de texto</label>
                    <div class="nb-row">
                        <input id="nb-logo-alt"  type="text" placeholder="Texto alternativo"      value="${B}"  class="nb-input">
                        <input id="nb-logo-text" type="text" placeholder="Texto si no hay imagen" value="${C}" class="nb-input">
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-top-actions">
                <div class="nb-card" style="padding:0.75rem;">
                    <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem;">Botones de acción de la barra superior (Contáctanos, Sucursales, etc.). Puedes reordenarlos arrastrando.</p>
                    <div id="nb-top-actions-list" class="nb-list"></div>
                    <div class="nb-add-row" style="margin-top:0.75rem;">
                        <button id="nb-add-top-action" class="nb-btn-add nb-btn-add-action"><i class="ri-add-line"></i> Agregar acción</button>
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-banking">
                <div class="nb-card">
                    <label class="nb-label">Botón de Banca en Línea</label>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Texto del botón</label>
                            <input id="nb-banking-label" type="text" placeholder="Mi Banca Integral" value="${b.label||""}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-banking-href" type="text" placeholder="URL o buscar página..." value="${b.href||"#"}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="nb-color-toggle">
                                <button class="nb-color-opt nb-color-opt-blue ${b.color!=="orange"?"":"nb-color-inactive"}" data-color="blue" id="nb-banking-blue">Azul</button>
                                <button class="nb-color-opt nb-color-opt-orange ${b.color==="orange"?"":"nb-color-inactive"}" data-color="orange" id="nb-banking-orange">Naranja</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-nav">
                <div class="nb-card" style="padding:0.75rem;">
                    <p style="font-size:0.8rem;color:#64748b;margin:0 0 0.75rem;">Links de la barra inferior. Los submenús generan mega-menús con columnas.</p>
                    <div id="nb-nav-list" class="nb-list"></div>
                    <div class="nb-add-row" style="margin-top:0.75rem;">
                        <button id="nb-add-nav-link"    class="nb-btn-add nb-btn-add-link"><i class="ri-link"></i> Agregar link</button>
                        <button id="nb-add-nav-submenu" class="nb-btn-add nb-btn-add-submenu"><i class="ri-layout-grid-line"></i> Agregar submenú</button>
                    </div>
                </div>
            </div>
            <div class="nb-tab-panel" id="nb-panel-bottom-cta">
                <div class="nb-card">
                    <label class="nb-label">Botón CTA de la barra inferior</label>
                    <div style="display:flex;flex-direction:column;gap:0.75rem;">
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Texto principal</label>
                            <input id="nb-bcta-label" type="text" placeholder="Programa Surge" value="${h.label||""}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Subtexto (opcional)</label>
                            <input id="nb-bcta-sublabel" type="text" placeholder="Formación Empresarial" value="${h.sublabel||""}" class="nb-input">
                        </div>
                        <div style="position:relative;">
                            <label class="nb-label" style="margin-bottom:0.375rem;">URL</label>
                            <input id="nb-bcta-href" type="text" placeholder="URL o buscar página..." value="${h.href||"#"}" class="nb-input">
                        </div>
                        <div>
                            <label class="nb-label" style="margin-bottom:0.375rem;">Color</label>
                            <div class="nb-color-toggle">
                                <button class="nb-color-opt nb-color-opt-blue ${h.color==="blue"?"":"nb-color-inactive"}" data-color="blue" id="nb-bcta-blue">Azul</button>
                                <button class="nb-color-opt nb-color-opt-orange ${h.color!=="blue"?"":"nb-color-inactive"}" data-color="orange" id="nb-bcta-orange">Naranja</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nb-modal-footer">
            <button id="nb-modal-cancel" class="nb-btn-cancel">Cancelar</button>
            <button id="nb-modal-save"   class="nb-btn-save"><i class="ri-check-line"></i> Aplicar cambios</button>
        </div>`,E.appendChild(o),document.body.appendChild(E);const z=new G;o.querySelectorAll(".nb-tab-btn").forEach(n=>{n.addEventListener("click",()=>{o.querySelectorAll(".nb-tab-btn").forEach(e=>e.classList.remove("active")),o.querySelectorAll(".nb-tab-panel").forEach(e=>e.classList.remove("active")),n.classList.add("active"),o.querySelector(`#nb-panel-${n.dataset.tab}`).classList.add("active")})}),o.querySelector("#nb-logo-pick").addEventListener("click",()=>{oe({type:"image",title:"Seleccionar logo",onSelect:n=>{o.querySelector("#nb-logo-url").value=n;let e=o.querySelector("#nb-logo-preview");if(!e||e.tagName==="DIV"){const d=document.createElement("img");d.id="nb-logo-preview",d.style.cssText="height:48px;max-width:160px;object-fit:contain;border-radius:0.375rem;border:1px solid #e2e8f0;padding:4px;background:#f8fafc;display:block;",e?.replaceWith(d)??o.querySelector("#nb-logo-url").before(d),e=d}e.src=n,e.style.display="block"}})});const H=`${document.querySelector('meta[name="app-url"]')?.content?.replace(/\/$/,"")??""}/api/pages/search`;function c(n){if(n.dataset.autocompleteAttached)return;n.dataset.autocompleteAttached="true";const e=n.parentNode;(!e.style.position||e.style.position==="static")&&(e.style.position="relative");const d=document.createElement("ul");d.style.cssText="position:absolute;top:calc(100% + 2px);left:0;right:0;z-index:999999;background:#fff;border:1px solid #e2e8f0;border-radius:0.5rem;box-shadow:0 8px 24px rgba(0,0,0,0.1);list-style:none;margin:0;padding:0.25rem;max-height:200px;overflow-y:auto;display:none;",e.appendChild(d);let l=null;async function y(g){if(g.length<1){d.style.display="none";return}try{const L=await(await fetch(`${H}?q=${encodeURIComponent(g)}`,{headers:{Accept:"application/json","X-Requested-With":"XMLHttpRequest"}})).json();u(L,g)}catch{d.style.display="none"}}function m(g,i){return i?g.replace(new RegExp(`(${i.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"gi"),'<mark style="background:#fef3c7;color:#92400e;border-radius:2px;padding:0 1px;">$1</mark>'):g}function u(g,i){if(d.innerHTML="",!g.length){d.style.display="none";return}g.forEach(L=>{const v=document.createElement("li");v.style.cssText="padding:0.375rem 0.625rem;border-radius:0.375rem;cursor:pointer;display:flex;flex-direction:column;gap:0.125rem;",v.innerHTML=`<span style="font-size:0.8rem;font-weight:600;color:#1e293b;">${m(L.title,i)}</span><span style="font-size:0.7rem;color:#64748b;">/${L.slug}</span>`,v.addEventListener("mouseenter",()=>v.style.background="#f1f5f9"),v.addEventListener("mouseleave",()=>v.style.background=""),v.addEventListener("mousedown",N=>{N.preventDefault(),n.value="/"+L.slug,n.dispatchEvent(new Event("input")),d.style.display="none"}),d.appendChild(v)}),d.style.display="block"}n.addEventListener("input",()=>{clearTimeout(l),l=setTimeout(()=>y(n.value.trim()),220)}),n.addEventListener("focus",()=>{n.select(),n.value.trim()&&y(n.value.trim())}),n.addEventListener("blur",()=>{setTimeout(()=>{d.style.display="none"},150)}),n.addEventListener("keydown",g=>{if(d.style.display==="none")return;const i=d.querySelectorAll("li"),L=d.querySelector("li.nb-ac-active");let v=Array.from(i).indexOf(L);if(g.key==="ArrowDown"){g.preventDefault(),L?.classList.remove("nb-ac-active");const N=i[v+1]||i[0];N?.classList.add("nb-ac-active"),N&&(N.style.background="#f1f5f9")}else if(g.key==="ArrowUp"){g.preventDefault(),L?.classList.remove("nb-ac-active");const N=i[v-1]||i[i.length-1];N?.classList.add("nb-ac-active"),N&&(N.style.background="#f1f5f9")}else g.key==="Enter"&&L?(g.preventDefault(),L.dispatchEvent(new MouseEvent("mousedown"))):g.key==="Escape"&&(d.style.display="none")})}function q(n,e,d){let l=null;n.querySelectorAll("[data-drag-idx]").forEach(y=>{y.setAttribute("draggable","true"),y.addEventListener("dragstart",m=>{l=parseInt(y.dataset.dragIdx),setTimeout(()=>y.classList.add("nb-dragging"),0),m.dataTransfer.effectAllowed="move"}),y.addEventListener("dragend",()=>{y.classList.remove("nb-dragging"),n.querySelectorAll(".nb-drag-over").forEach(m=>m.classList.remove("nb-drag-over"))}),y.addEventListener("dragover",m=>{m.preventDefault(),m.dataTransfer.dropEffect="move",parseInt(y.dataset.dragIdx)!==l&&y.classList.add("nb-drag-over")}),y.addEventListener("dragleave",()=>y.classList.remove("nb-drag-over")),y.addEventListener("drop",m=>{m.preventDefault();const u=parseInt(y.dataset.dragIdx);if(l!==null&&u!==l){const[g]=e.splice(l,1);e.splice(u,0,g),d()}l=null})})}function S(){const n=o.querySelector("#nb-top-actions-list");n.innerHTML="",w.forEach((e,d)=>{const l=document.createElement("div");l.className="nb-action-card",l.dataset.dragIdx=d;const y=e.icon||"";l.innerHTML=`
                <div class="nb-row">
                    <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                    <div class="nb-icon-preview"><i class="${y||"ri-star-line"}"></i></div>
                    <input class="nb-input-sm" style="width:130px;flex-shrink:0;" placeholder="Clase del icono" value="${y}" data-field="icon" readonly>
                    <button class="nb-pick-btn nb-pick-icon-btn" type="button"><i class="ri-emotion-happy-line"></i> Icono</button>
                    <button class="nb-btn-remove nb-remove-action"><i class="ri-delete-bin-line"></i></button>
                </div>
                <div class="nb-row">
                    <input class="nb-input-sm" style="flex:1;" placeholder="Texto del botón" value="${e.label||""}" data-field="label">
                </div>
                <div style="position:relative;">
                    <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${e.href||"#"}" data-field="href">
                </div>`,l.querySelector(".nb-pick-icon-btn").addEventListener("click",()=>{z.open(u=>{e.icon=u,l.querySelector("[data-field='icon']").value=u,l.querySelector(".nb-icon-preview i").className=u})}),l.querySelector(".nb-remove-action").onclick=()=>{w.splice(d,1),S()},l.querySelectorAll("[data-field]").forEach(u=>{u.addEventListener("input",()=>{e[u.dataset.field]=u.value})});const m=l.querySelector(".nb-url-input");if(m){const u=document.createElement("div");u.style.position="relative",m.parentNode.insertBefore(u,m),u.appendChild(m),c(m)}n.appendChild(l)}),q(n,w,S)}function $(){const n=o.querySelector("#nb-nav-list");n.innerHTML="",p.forEach((e,d)=>{const l=document.createElement("div");l.className="nb-link-card",l.dataset.dragIdx=d;const y=`<span class="nb-type-badge ${e.type==="submenu"?"nb-type-submenu":"nb-type-link"}" data-toggle-type title="Clic para cambiar tipo">${e.type==="submenu"?"Submenú":"Link"} ↕</span>`;if(e.type==="submenu"){let g=function(){u.innerHTML="",(e.columns||[]).forEach((i,L)=>{const v=document.createElement("div");v.className="nb-col-card";const N=(i.items||[]).map((f,A)=>`
                            <div class="nb-col-item" data-item-idx="${A}">
                                <div class="nb-col-item-row">
                                    <input class="nb-input-sm" style="flex:1;" placeholder="Título del item" value="${f.label||""}" data-item-field="label">
                                    <button class="nb-btn-remove nb-remove-item" style="padding:0.2rem;"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                <input class="nb-input-sm" style="width:100%;box-sizing:border-box;" placeholder="Descripción (opcional)" value="${f.desc||""}" data-item-field="desc">
                                <div style="position:relative;">
                                    <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL" value="${f.href||"#"}" data-item-field="href">
                                </div>
                            </div>`).join("");v.innerHTML=`
                            <div class="nb-col-card-header">
                                <span style="font-size:0.75rem;font-weight:700;color:#475569;">Columna ${L+1}</span>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Badge (ej: Tus ahorros)" value="${i.badge||""}" data-col-field="badge">
                                <div class="nb-color-toggle" style="gap:0.25rem;">
                                    <button class="nb-color-opt nb-color-opt-blue ${(i.badge_color||"blue")==="blue"?"":"nb-color-inactive"}" data-col-color="blue" style="padding:0.2rem 0.5rem;font-size:0.65rem;">Azul</button>
                                    <button class="nb-color-opt nb-color-opt-orange ${(i.badge_color||"blue")==="orange"?"":"nb-color-inactive"}" data-col-color="orange" style="padding:0.2rem 0.5rem;font-size:0.65rem;">Naranja</button>
                                </div>
                                <button class="nb-btn-remove nb-remove-col"><i class="ri-delete-bin-line"></i></button>
                            </div>
                            <div class="nb-col-items">${N}</div>
                            <div class="nb-add-row" style="margin-top:0.375rem;">
                                <button class="nb-btn-add nb-btn-add-item nb-add-item-btn" style="font-size:0.7rem;padding:0.25rem 0.5rem;"><i class="ri-add-line"></i> Agregar item</button>
                            </div>`,v.querySelector("[data-col-field='badge']").addEventListener("input",f=>{i.badge=f.target.value}),v.querySelectorAll("[data-col-color]").forEach(f=>{f.addEventListener("click",()=>{i.badge_color=f.dataset.colColor,v.querySelectorAll("[data-col-color]").forEach(A=>{A.classList.toggle("nb-color-inactive",A.dataset.colColor!==f.dataset.colColor)})})}),v.querySelector(".nb-remove-col").onclick=()=>{e.columns.splice(L,1),g();const f=l.querySelector(".nb-add-col-btn");f&&(f.disabled=!1,f.style.opacity="",f.style.cursor="")},v.querySelectorAll("[data-item-field]").forEach(f=>{const A=parseInt(f.closest("[data-item-idx]").dataset.itemIdx);f.addEventListener("input",()=>{i.items[A][f.dataset.itemField]=f.value})}),v.querySelectorAll(".nb-url-input").forEach(f=>{const A=document.createElement("div");A.style.position="relative",f.parentNode.insertBefore(A,f),A.appendChild(f),c(f)}),v.querySelectorAll(".nb-remove-item").forEach(f=>{f.onclick=()=>{const A=parseInt(f.closest("[data-item-idx]").dataset.itemIdx);i.items.splice(A,1),g()}}),v.querySelector(".nb-add-item-btn").onclick=()=>{i.items=i.items||[],i.items.push({label:"Nuevo item",desc:"",href:"#"}),g()},u.appendChild(v)})};l.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${y}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Título del menú" value="${e.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div class="nb-section-title">Columnas del mega-menú (máx. 3)</div>
                        <div class="nb-columns-list" style="display:flex;flex-direction:column;gap:0.625rem;"></div>
                        <div class="nb-add-row">
                            <button class="nb-btn-add nb-btn-add-col nb-add-col-btn" ${(e.columns||[]).length>=3?"disabled style='opacity:0.4;cursor:not-allowed;'":""}><i class="ri-add-line"></i> Agregar columna</button>
                        </div>
                        <div class="nb-section-title" style="margin-top:0.5rem;">Columna CTA (opcional)</div>
                        <div class="nb-cta-section">
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;width:80px;">Texto CTA</label>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Texto alternado naranja/azul" value="${e.cta_column?.text||""}" data-cta-field="text">
                            </div>
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;width:80px;">Btn texto</label>
                                <input class="nb-input-sm" style="flex:1;" placeholder="Solicitar" value="${e.cta_column?.btn_label||""}" data-cta-field="btn_label">
                            </div>
                            <div style="position:relative;">
                                <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL del botón CTA" value="${e.cta_column?.btn_href||"#"}" data-cta-field="btn_href">
                            </div>
                            <div class="nb-row">
                                <label style="font-size:0.75rem;color:#92400e;font-weight:600;flex-shrink:0;width:80px;">Color btn</label>
                                <div class="nb-color-toggle">
                                    <button class="nb-color-opt nb-color-opt-blue ${(e.cta_column?.btn_color||"orange")==="blue"?"":"nb-color-inactive"}" data-cta-color="blue">Azul</button>
                                    <button class="nb-color-opt nb-color-opt-orange ${(e.cta_column?.btn_color||"orange")==="orange"?"":"nb-color-inactive"}" data-cta-color="orange">Naranja</button>
                                </div>
                            </div>
                        </div>
                    </div>`,l.querySelector("[data-toggle-type]").onclick=()=>{e.type="link",e.href="#",delete e.columns,delete e.cta_column,$()},l.querySelector(".nb-remove-link").onclick=()=>{p.splice(d,1),$()},l.querySelector("[data-field='label']").addEventListener("input",i=>{e.label=i.target.value}),l.querySelectorAll("[data-cta-field]").forEach(i=>{i.addEventListener("input",()=>{e.cta_column||(e.cta_column={}),e.cta_column[i.dataset.ctaField]=i.value})});const m=l.querySelector("[data-cta-field='btn_href']");if(m){const i=document.createElement("div");i.style.position="relative",m.parentNode.insertBefore(i,m),i.appendChild(m),c(m)}l.querySelectorAll("[data-cta-color]").forEach(i=>{i.addEventListener("click",()=>{e.cta_column||(e.cta_column={}),e.cta_column.btn_color=i.dataset.ctaColor,l.querySelectorAll("[data-cta-color]").forEach(L=>{L.classList.toggle("nb-color-inactive",L.dataset.ctaColor!==i.dataset.ctaColor)})})});const u=l.querySelector(".nb-columns-list");g(),l.querySelector(".nb-add-col-btn").onclick=()=>{if(!((e.columns||[]).length>=3)&&(e.columns=e.columns||[],e.columns.push({badge:"Nueva columna",badge_color:"blue",items:[{label:"Nuevo item",desc:"",href:"#"}]}),g(),e.columns.length>=3)){const i=l.querySelector(".nb-add-col-btn");i.disabled=!0,i.style.opacity="0.4",i.style.cursor="not-allowed"}}}else{l.innerHTML=`
                    <div class="nb-link-card-header">
                        <span class="nb-drag-handle"><i class="ri-draggable"></i></span>
                        ${y}
                        <input class="nb-input-sm" style="flex:1;" placeholder="Texto del enlace" value="${e.label||""}" data-field="label">
                        <button class="nb-btn-remove nb-remove-link"><i class="ri-delete-bin-line"></i></button>
                    </div>
                    <div class="nb-link-card-body">
                        <div style="position:relative;">
                            <input class="nb-input-sm nb-url-input" style="width:100%;box-sizing:border-box;" placeholder="URL o buscar página..." value="${e.href||""}" data-field="href">
                        </div>
                    </div>`,l.querySelector("[data-toggle-type]").onclick=()=>{e.type="submenu",e.columns=[{badge:"Columna 1",badge_color:"blue",items:[{label:"Enlace",desc:"",href:"#"}]}],e.cta_column={text:"",btn_label:"Ver más",btn_href:"#",btn_color:"orange"},delete e.href,$()},l.querySelector(".nb-remove-link").onclick=()=>{p.splice(d,1),$()},l.querySelectorAll("[data-field]").forEach(u=>{u.addEventListener("input",()=>{e[u.dataset.field]=u.value})});const m=l.querySelector(".nb-url-input");if(m){const u=document.createElement("div");u.style.position="relative",m.parentNode.insertBefore(u,m),u.appendChild(m),c(m)}}n.appendChild(l)}),q(n,p,$)}o.querySelectorAll("#nb-banking-blue, #nb-banking-orange").forEach(n=>{n.addEventListener("click",()=>{b.color=n.dataset.color,o.querySelector("#nb-banking-blue").classList.toggle("nb-color-inactive",b.color!=="blue"),o.querySelector("#nb-banking-orange").classList.toggle("nb-color-inactive",b.color!=="orange")})}),o.querySelectorAll("#nb-bcta-blue, #nb-bcta-orange").forEach(n=>{n.addEventListener("click",()=>{h.color=n.dataset.color,o.querySelector("#nb-bcta-blue").classList.toggle("nb-color-inactive",h.color!=="blue"),o.querySelector("#nb-bcta-orange").classList.toggle("nb-color-inactive",h.color!=="orange")})});const I=o.querySelector("#nb-banking-href");if(I){const n=document.createElement("div");n.style.position="relative",I.parentNode.insertBefore(n,I),n.appendChild(I),c(I)}const T=o.querySelector("#nb-bcta-href");if(T){const n=document.createElement("div");n.style.position="relative",T.parentNode.insertBefore(n,T),n.appendChild(T),c(T)}const _=o.querySelector("#nb-logo-href");if(_){const n=document.createElement("div");n.style.position="relative",_.parentNode.insertBefore(n,_),n.appendChild(_),c(_)}o.querySelector("#nb-add-top-action").onclick=()=>{w.push({label:"Nueva acción",href:"#",icon:"ri-star-line"}),S(),o.querySelector("#nb-top-actions-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},o.querySelector("#nb-add-nav-link").onclick=()=>{p.push({type:"link",label:"Nuevo enlace",href:"#"}),$(),o.querySelector("#nb-nav-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},o.querySelector("#nb-add-nav-submenu").onclick=()=>{p.push({type:"submenu",label:"Nuevo menú",columns:[{badge:"Columna 1",badge_color:"blue",items:[{label:"Enlace",desc:"",href:"#"}]}],cta_column:{text:"",btn_label:"Ver más",btn_href:"#",btn_color:"orange"}}),$(),o.querySelector("#nb-nav-list").lastElementChild?.scrollIntoView({behavior:"smooth",block:"nearest"})},S(),$();const j=()=>{z.close(),E.remove()};o.querySelector("#nb-modal-close").onclick=j,o.querySelector("#nb-modal-cancel").onclick=j,E.onclick=n=>{n.target===E&&j()},o.querySelector("#nb-modal-save").onclick=()=>{const n={logo_url:o.querySelector("#nb-logo-url").value.trim(),logo_alt:o.querySelector("#nb-logo-alt").value.trim(),logo_text:o.querySelector("#nb-logo-text").value.trim(),logo_href:o.querySelector("#nb-logo-href").value.trim()||"/",top_actions:w,banking_btn:{label:o.querySelector("#nb-banking-label").value.trim(),href:o.querySelector("#nb-banking-href").value.trim()||"#",color:b.color||"blue"},nav_links:p,bottom_cta:{label:o.querySelector("#nb-bcta-label").value.trim(),sublabel:o.querySelector("#nb-bcta-sublabel").value.trim(),href:o.querySelector("#nb-bcta-href").value.trim()||"#",color:h.color||"orange"}},d=t.getEl()?.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","")||"nb"+Math.random().toString(36).slice(2,7);t.addAttributes({"data-navbar-config":JSON.stringify(n)}),t.components(O(n,d)+R),j()}}function se(r){const t="navbar-component";r.DomComponents.addType(t,{isComponent:a=>a.getAttribute?.("data-gjs-type")===t?{type:t}:!1,model:{defaults:{name:"Navbar",tagName:"nav",draggable:!0,droppable:!1,removable:!0,copyable:!1,selectable:!0,hoverable:!0,editable:!1,highlightable:!1,attributes:{"data-gjs-type":t,class:"nb-wrapper","data-navbar-config":JSON.stringify(U)},components:O(U)+R,script:function(){(function(a){if(!a||typeof a.querySelector!="function"||a.__nbInit)return;a.__nbInit=!0;var s=a.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");if(!s)return;var x=!!window.__gjseditor||document.documentElement.hasAttribute("data-gjs-canvas");function B(){x||(document.body.style.paddingTop=a.offsetHeight+"px")}B(),window.addEventListener("resize",B);var C=document.getElementById("nb-toggle-"+s),k=document.getElementById("nb-mobile-"+s);C&&k&&C.addEventListener("click",function(){k.classList.toggle("nb-open"),B()}),a.querySelectorAll(".nb-nav-trigger").forEach(function(w){w.addEventListener("click",function(b){b.stopPropagation();var p=w.closest(".nb-nav-item"),h=p.classList.contains("nb-open");a.querySelectorAll(".nb-nav-item.nb-open").forEach(function(E){E.classList.remove("nb-open")}),h||p.classList.add("nb-open"),B()})}),a.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(w){w.addEventListener("click",function(){w.closest(".nb-mobile-item").classList.toggle("nb-open"),B()})}),document.addEventListener("click",function(w){a.contains(w.target)||a.querySelectorAll(".nb-nav-item.nb-open").forEach(function(b){b.classList.remove("nb-open")})})})(this)},"script-props":[],toolbar:[],traits:[{type:"button",label:"Navbar",text:"Administrar Navbar",full:!0,command:"open-navbar-config"}]},init(){this.set("type",t),this.addAttributes({"data-gjs-type":t})}}}),r.Commands.add("open-navbar-config",{run(a){const s=a.getSelected();s&&ie(a,s)}}),r.BlockManager.add("navbar-block",{label:"Navbar",category:"Navbar",media:`<svg viewBox="0 0 32 32" width="32" height="32">
            <rect width="32" height="32" fill="#003B71" rx="2"/>
            <rect x="2" y="4" width="8" height="8" fill="rgba(255,255,255,0.3)" rx="1"/>
            <rect x="12" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
            <rect x="17" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
            <rect x="22" y="5" width="4" height="1.5" rx="0.75" fill="rgba(255,255,255,0.6)"/>
            <rect x="24" y="3" width="6" height="5" rx="2.5" fill="#E97300"/>
            <rect x="2" y="15" width="4" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="8" y="15" width="4" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="14" y="15" width="5" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="21" y="15" width="5" height="1.5" rx="0.75" fill="#E97300"/>
            <rect x="24" y="13" width="6" height="5" rx="2.5" fill="#E97300"/>
        </svg>`,activate:!0,content:{type:t,attributes:{"data-gjs-type":t}}}),ce(r,t),de(r)}function ce(r,t){r.on("storage:end:load",()=>{setTimeout(()=>P(r,t),800)}),r.on("component:mount",a=>{const s=a.getEl();s?.getAttribute?.("data-gjs-type")===t&&(a.set("type",t),setTimeout(()=>J(r,s),400))}),r.on("canvas:render",()=>{setTimeout(()=>P(r,t),600)})}function J(r,t){if(t?.isConnected)try{const a=r.Canvas.getFrameEl()?.contentDocument;if(!a)return;t.__nbInit&&delete t.__nbInit;const s=a.createElement("script");s.textContent=`(function(){
            function initNavbar(root){
                if(!root||root.__nbInit)return;
                root.__nbInit=true;
                var id=root.querySelector("[id^='nb-root-']")?.id?.replace("nb-root-","");
                if(!id)return;
                function pad(){document.body.style.paddingTop=root.offsetHeight+"px";}
                pad();
                window.addEventListener("resize",function(){pad();});
                var toggle=document.getElementById("nb-toggle-"+id);
                var mobile=document.getElementById("nb-mobile-"+id);
                if(toggle&&mobile){toggle.addEventListener("click",function(){mobile.classList.toggle("nb-open");pad();});}
                root.querySelectorAll(".nb-nav-trigger").forEach(function(btn){
                    btn.addEventListener("click",function(e){
                        e.stopPropagation();
                        var item=btn.closest(".nb-nav-item");
                        var open=item.classList.contains("nb-open");
                        root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});
                        if(!open)item.classList.add("nb-open");
                        pad();
                    });
                });
                root.querySelectorAll(".nb-mobile-item>.nb-mobile-link").forEach(function(btn){
                    btn.addEventListener("click",function(){btn.closest(".nb-mobile-item").classList.toggle("nb-open");pad();});
                });
                document.addEventListener("click",function(e){
                    if(!root.contains(e.target)){root.querySelectorAll(".nb-nav-item.nb-open").forEach(function(el){el.classList.remove("nb-open");});}
                });
            }
            document.querySelectorAll("nav[data-gjs-type='navbar-component']").forEach(function(nav){initNavbar(nav);});
        })();`,a.head.appendChild(s),s.remove()}catch(a){console.warn("[Navbar] Error inyectando script en canvas:",a)}}function P(r,t){r.getWrapper().find(`[data-gjs-type="${t}"]`).forEach(a=>{a.set("type",t);const s=a.getEl();s?.isConnected&&J(r,s)})}function de(r){r.on("load",()=>{const t=r.Canvas.getFrameEl();if(!t)return;const a=t.contentDocument,s=a?.head;if(s&&(a.documentElement?.setAttribute("data-gjs-canvas","true"),!s.querySelector("#navbar-component-css"))){const x=document.createElement("style");x.id="navbar-component-css",x.textContent=`
                [data-gjs-type="navbar-component"] {
                    outline: 2px dashed rgba(240,135,42,0.4);
                    outline-offset: 2px;
                    position: relative !important;
                    top: auto !important;
                }
                body { padding-top: 0 !important; }
            `,s.appendChild(x)}})}document.addEventListener("DOMContentLoaded",async()=>{const r=new ee;let t=document.getElementById("navbar-id")?.value||"",a=document.getElementById("navbar-name")?.value||"",s=document.getElementById("navbar-load-url")?.value||"",x=document.getElementById("navbar-store-url")?.value||"";const B=document.getElementById("navbar-is-active")?.value==="1";let C=!!t;const k=ae();if(se(k),k.on("load",()=>{V(k),W(),X(),Y(k),K(k),Q(k),Z(k),be(k),setTimeout(()=>{k.runCommand("sw-visibility"),k.Panels.getButton("options","sw-visibility")?.set("active",!0)},100)}),C&&s)try{await r.loadPageContent(k,s),M("Navbar cargado correctamente","success")}catch{M("Error al cargar el navbar","error")}document.getElementById("save-button")?.addEventListener("click",async()=>{const b=document.getElementById("save-button");b.disabled=!0,b.innerHTML='<i class="ri-loader-4-line animate-spin"></i><span>Guardando...</span>';try{!C&&!a?ne({title:"Nombre del Navbar",description:"Ingresa un nombre descriptivo para identificar este navbar.",placeholder:"Ej: Navbar Principal",icon:"ri-file-text-line",iconBg:"#dbeafe",iconColor:"#2563eb",confirmLabel:"Guardar",onConfirm:async p=>{if(!p?.trim()){M("El nombre es obligatorio","error"),b.disabled=!1,b.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>';return}try{await w(p)}catch(h){M(h.message,"error")}finally{b.disabled=!1,b.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}},onCancel:()=>{b.disabled=!1,b.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}}):(await w(a),b.disabled=!1,b.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>')}catch(p){M(p.message,"error"),b.disabled=!1,b.innerHTML='<i class="ri-save-line"></i><span>Guardar</span>'}});async function w(b){const p=C?"PUT":"POST",h=r.getEditorContent(k);(!h.js_content||h.js_content.trim()==="")&&(h.js_content=re);const E=await r.savePage(k,{...h,name:b,is_active:B},x,p);if(E.success){if(r.markAsClean(),M(E.message,"success"),!C&&E.navbar){t=E.navbar.id,a=E.navbar.name,C=!0;const o=document.getElementById("navbar-id");o&&(o.value=t);const z=document.getElementById("navbar-name");z&&(z.value=a);const D=document.querySelector('meta[name="app-url"]'),H=D?D.content:"";x=x.endsWith("/navbars")?`${x}/${t}`:`${x.replace(/\/navbars\/?$/,"")}/navbars/${t}`;const q=document.getElementById("navbar-store-url");q&&(q.value=x),s=`${x}/load`;const S=document.getElementById("navbar-load-url");S&&(S.value=s);const $=document.getElementById("editor-title");$&&($.textContent=`Editando Navbar: ${a}`);const I=`/navbars/edit/${t}/edit`,T=H?`${H}${I}`:I;window.history.replaceState({path:T},"",T)}else if(b){a=b;const o=document.getElementById("navbar-name");o&&(o.value=a);const z=document.getElementById("editor-title");z&&(z.textContent=`Editando Navbar: ${a}`)}}}});function be(r){r.Commands.add("canvas-clear",{run:t=>{te({title:"Limpiar canvas",description:"¿Estás seguro de que quieres eliminar todo el contenido del canvas? Esta acción no se puede deshacer.",icon:"ri-delete-bin-line",iconBg:"#fef2f2",iconColor:"#dc2626",confirmLabel:"Limpiar todo",confirmColor:"#dc2626",onConfirm:()=>{t.DomComponents.clear(),t.CssComposer.clear()}})}})}function M(r,t="info"){typeof window.showNotification=="function"&&window.showNotification(r,t)}
